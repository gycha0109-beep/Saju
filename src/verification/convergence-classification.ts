import type { VersionedRef } from '../contracts/common.js';
import type { ConsumedInputFingerprint } from './consumed-input-fingerprint.js';
import type { DomainInterpretationSignature } from './domain-interpretation-signature.js';

export type ConvergenceClassification = 'intentional_convergence' | 'unexplained_collision';

export interface ConvergenceObservation {
  caseId: string;
  consumedInputFingerprint: string;
  interpretationSignature: string;
  producingT8RuleRefs: readonly VersionedRef[];
}

export interface ConvergenceGroup {
  interpretationSignature: string;
  caseIds: readonly string[];
  consumedInputFingerprints: readonly string[];
  producingT8RuleSets: readonly (readonly VersionedRef[])[];
  classification: ConvergenceClassification;
  basis:
    | 'same_exact_t8_producing_rule_set'
    | 'no_machine_verifiable_convergence_basis';
}

function versionKey(ref: VersionedRef): string {
  return `${ref.id}@${ref.version}`;
}

function normalizedRuleRefs(refs: readonly VersionedRef[]): readonly VersionedRef[] {
  const byKey = new Map<string, VersionedRef>();
  for (const ref of refs) byKey.set(versionKey(ref), { id: ref.id, version: ref.version });
  return [...byKey.values()].sort((left, right) => versionKey(left).localeCompare(versionKey(right)));
}

function ruleSetKey(refs: readonly VersionedRef[]): string {
  return normalizedRuleRefs(refs).map(versionKey).join('|');
}

export function buildConvergenceObservation(
  caseId: string,
  fingerprint: ConsumedInputFingerprint,
  signature: DomainInterpretationSignature,
): ConvergenceObservation {
  return {
    caseId,
    consumedInputFingerprint: fingerprint.fingerprint,
    interpretationSignature: signature.signature,
    producingT8RuleRefs: normalizedRuleRefs(fingerprint.trace.map((entry) => entry.ruleRef)),
  };
}

function classifyGroup(observations: readonly ConvergenceObservation[]): ConvergenceGroup {
  const caseIds = observations.map((observation) => observation.caseId).sort();
  const consumedInputFingerprints = [
    ...new Set(observations.map((observation) => observation.consumedInputFingerprint)),
  ].sort();
  const producingT8RuleSets = observations
    .map((observation) => normalizedRuleRefs(observation.producingT8RuleRefs))
    .sort((left, right) => ruleSetKey(left).localeCompare(ruleSetKey(right)));
  const distinctRuleSets = new Set(producingT8RuleSets.map(ruleSetKey));
  const hasNonEmptyRuleSet = producingT8RuleSets.every((refs) => refs.length > 0);
  const sameExactRuleSet = hasNonEmptyRuleSet && distinctRuleSets.size === 1;

  return {
    interpretationSignature: observations[0]?.interpretationSignature ?? '',
    caseIds,
    consumedInputFingerprints,
    producingT8RuleSets,
    classification: sameExactRuleSet ? 'intentional_convergence' : 'unexplained_collision',
    basis: sameExactRuleSet
      ? 'same_exact_t8_producing_rule_set'
      : 'no_machine_verifiable_convergence_basis',
  };
}

export function classifyManyToOneConvergences(
  observations: readonly ConvergenceObservation[],
): readonly ConvergenceGroup[] {
  const bySignature = new Map<string, ConvergenceObservation[]>();
  for (const observation of observations) {
    const group = bySignature.get(observation.interpretationSignature) ?? [];
    group.push({
      ...observation,
      producingT8RuleRefs: normalizedRuleRefs(observation.producingT8RuleRefs),
    });
    bySignature.set(observation.interpretationSignature, group);
  }

  return [...bySignature.values()]
    .filter(
      (group) => new Set(group.map((observation) => observation.consumedInputFingerprint)).size > 1,
    )
    .map((group) => classifyGroup(group))
    .sort((left, right) =>
      left.interpretationSignature.localeCompare(right.interpretationSignature),
    );
}
