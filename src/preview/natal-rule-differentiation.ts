import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  NatalPersonalizationBaselineCase,
  NatalPersonalizationBaselineReport,
} from './natal-personalization-baseline.js';

export const NATAL_RULE_DIFFERENTIATION_VERSION = 'saju-natal-n3-rule-differentiation-audit-v1' as const;

export interface NatalRuleDifferentiationEvidence {
  caseId: string;
  snapshotId: string;
  interpretation: InterpretationExecutionResult;
}

export interface NatalRuleSignature {
  caseId: string;
  snapshotId: string;
  matchedRuleIds: readonly string[];
  emittedClaimTypes: readonly string[];
  claimSemanticSignature: string;
  matchedRuleSignature: string;
  matchedClaimCount: number;
  interpretationRunStatus: InterpretationExecutionResult['run']['status'];
}

export interface NatalRepeatedTextGroup {
  fingerprint: string;
  caseIds: readonly string[];
  differentDisplayedFactSets: number;
  differentRuleSignatures: number;
  differentClaimSemanticSignatures: number;
}

export type NatalDifferentiationDisposition =
  | 'SAME_COPY_DIFFERENT_RULES'
  | 'SAME_COPY_SAME_RULES_DIFFERENT_CHART'
  | 'DIFFERENT_COPY_SAME_RULES'
  | 'EXPECTED_DUPLICATE_OR_SAME_CHART'
  | 'MISSING_READING_OR_RULE_EVIDENCE'
  | 'DIFFERENT_COPY_DIFFERENT_RULES';

export interface NatalRuleDifferentiationPair {
  left: string;
  right: string;
  disposition: NatalDifferentiationDisposition;
  sameDisplayedFacts: boolean;
  sameConsumerText: boolean;
  sameMatchedRules: boolean;
  sameClaimSemantics: boolean;
  onlyLeftRuleIds: readonly string[];
  onlyRightRuleIds: readonly string[];
  onlyLeftClaimTypes: readonly string[];
  onlyRightClaimTypes: readonly string[];
}

export interface NatalRuleDifferentiationReport {
  version: typeof NATAL_RULE_DIFFERENTIATION_VERSION;
  lifecycle: 'internal_quality_audit';
  researchEvidenceIsNotProductionAuthority: true;
  mayPublish: false;
  maySell: false;
  numberOfCases: number;
  casesWithConsumerInterpretation: number;
  casesWithoutConsumerInterpretation: readonly string[];
  casesWithResearchClaimSignature: number;
  repeatedTextGroups: readonly NatalRepeatedTextGroup[];
  pairsWithSameCopyDifferentFacts: readonly NatalRuleDifferentiationPair[];
  warningCounts: {
    sameCopyDifferentRules: number;
    sameCopySameRulesDifferentChart: number;
    identicalRulesDifferentCopy: number;
  };
  ruleSignatures: readonly NatalRuleSignature[];
  limitations: readonly string[];
}

function onlyIn(left: readonly string[], right: readonly string[]): readonly string[] {
  const set = new Set(right);
  return left.filter((value) => !set.has(value));
}

/**
 * Stable signatures deliberately exclude claimId, evaluationId, run timestamps
 * and snapshot IDs. No new rule is executed or promoted here.
 */
export function inspectNatalRuleSignature(
  evidence: NatalRuleDifferentiationEvidence,
): NatalRuleSignature {
  if (evidence.interpretation.run.snapshotId !== evidence.snapshotId) {
    throw new TypeError(`Research comparison is not bound to the same snapshot: ${evidence.caseId}`);
  }
  const matchedRuleIds = [...new Set(evidence.interpretation.evaluations
    .filter((evaluation) => evaluation.status === 'matched')
    .map((evaluation) => `${evaluation.ruleRef.id}@${evaluation.ruleRef.version}`))].sort();

  const claims = evidence.interpretation.claims
    .filter((claim) => claim.state === 'active')
    .map((claim) => ({
      claimType: claim.claimType,
      predicate: claim.predicate,
      value: claim.value,
      methodology: `${claim.methodologyRef.id}@${claim.methodologyRef.version}`,
      rules: claim.ruleRefs.map((ref) => `${ref.ruleId}@${ref.version}`).sort(),
      // source references are stable; claimId and request data are not.
      sourceRefs: [...claim.sourceRefs].sort(),
    }));
  claims.sort((left, right) =>
    left.claimType.localeCompare(right.claimType) ||
    left.predicate.localeCompare(right.predicate) ||
    deterministicContentHash(left.value).localeCompare(deterministicContentHash(right.value)));

  return {
    caseId: evidence.caseId,
    snapshotId: evidence.snapshotId,
    matchedRuleIds,
    emittedClaimTypes: [...new Set(claims.map((claim) => claim.claimType))].sort(),
    claimSemanticSignature: deterministicContentHash(claims),
    matchedRuleSignature: deterministicContentHash(matchedRuleIds),
    matchedClaimCount: claims.length,
    interpretationRunStatus: evidence.interpretation.run.status,
  };
}

function comparePair(
  left: NatalPersonalizationBaselineCase,
  right: NatalPersonalizationBaselineCase,
  a: NatalRuleSignature | undefined,
  b: NatalRuleSignature | undefined,
): NatalRuleDifferentiationPair {
  const sameDisplayedFacts = left.factFingerprint === right.factFingerprint;
  const sameConsumerText = left.interpretationFingerprint === right.interpretationFingerprint;
  const sameMatchedRules = a?.matchedRuleSignature === b?.matchedRuleSignature;
  const sameClaimSemantics = a?.claimSemanticSignature === b?.claimSemanticSignature;

  let disposition: NatalDifferentiationDisposition;
  if (!left.interpretationFingerprint || !right.interpretationFingerprint || !a || !b) {
    disposition = 'MISSING_READING_OR_RULE_EVIDENCE';
  } else if (sameDisplayedFacts && sameConsumerText) {
    disposition = 'EXPECTED_DUPLICATE_OR_SAME_CHART';
  } else if (sameConsumerText && !sameMatchedRules) {
    disposition = 'SAME_COPY_DIFFERENT_RULES';
  } else if (sameConsumerText && !sameDisplayedFacts) {
    disposition = 'SAME_COPY_SAME_RULES_DIFFERENT_CHART';
  } else if (!sameConsumerText && sameMatchedRules) {
    disposition = 'DIFFERENT_COPY_SAME_RULES';
  } else {
    disposition = 'DIFFERENT_COPY_DIFFERENT_RULES';
  }
  return {
    left: left.caseId,
    right: right.caseId,
    disposition,
    sameDisplayedFacts,
    sameConsumerText,
    sameMatchedRules,
    sameClaimSemantics,
    onlyLeftRuleIds: a && b ? onlyIn(a.matchedRuleIds, b.matchedRuleIds) : [],
    onlyRightRuleIds: a && b ? onlyIn(b.matchedRuleIds, a.matchedRuleIds) : [],
    onlyLeftClaimTypes: a && b ? onlyIn(a.emittedClaimTypes, b.emittedClaimTypes) : [],
    onlyRightClaimTypes: a && b ? onlyIn(b.emittedClaimTypes, a.emittedClaimTypes) : [],
  };
}

/** N3 forensic view: which matched rules change without a matching consumer copy change? */
export function buildNatalRuleDifferentiationReport(
  baseline: NatalPersonalizationBaselineReport,
  evidence: readonly NatalRuleDifferentiationEvidence[],
): NatalRuleDifferentiationReport {
  const casesById = new Map(baseline.cases.map((item) => [item.caseId, item]));
  if (casesById.size !== baseline.cases.length) throw new TypeError('Duplicate baseline caseId');
  const byId = new Map<string, NatalRuleSignature>();
  for (const item of evidence) {
    if (!casesById.has(item.caseId)) throw new TypeError(`Unknown research caseId: ${item.caseId}`);
    if (byId.has(item.caseId)) throw new TypeError(`Duplicate research caseId: ${item.caseId}`);
    byId.set(item.caseId, inspectNatalRuleSignature(item));
  }
  // Require a complete aligned sample set, not cherry-picked rule subsets.
  if (byId.size !== baseline.cases.length) {
    throw new TypeError('Research comparison requires one same-policy interpretation per baseline case');
  }

  const repeated = new Map<string, NatalPersonalizationBaselineCase[]>();
  for (const entry of baseline.cases) {
    if (entry.interpretationFingerprint === undefined) continue;
    const group = repeated.get(entry.interpretationFingerprint) ?? [];
    group.push(entry);
    repeated.set(entry.interpretationFingerprint, group);
  }
  const repeatedTextGroups: NatalRepeatedTextGroup[] = [...repeated.entries()]
    .filter(([, cases]) => cases.length > 1)
    .map(([fingerprint, entries]) => ({
      fingerprint,
      caseIds: entries.map((entry) => entry.caseId).sort(),
      differentDisplayedFactSets: new Set(entries.map((entry) => entry.factFingerprint)).size,
      differentRuleSignatures: new Set(entries.map((entry) =>
        byId.get(entry.caseId)?.matchedRuleSignature)).size,
      differentClaimSemanticSignatures: new Set(entries.map((entry) =>
        byId.get(entry.caseId)?.claimSemanticSignature)).size,
    }))
    .sort((a, b) => b.caseIds.length - a.caseIds.length || a.fingerprint.localeCompare(b.fingerprint));

  const pairsWithSameCopyDifferentFacts: NatalRuleDifferentiationPair[] = [];
  let identicalRulesDifferentCopy = 0;
  for (let i = 0; i < baseline.cases.length; i += 1) {
    const left = baseline.cases[i]!;
    for (let j = i + 1; j < baseline.cases.length; j += 1) {
      const right = baseline.cases[j]!;
      if (!left.interpretationFingerprint || !right.interpretationFingerprint ||
          !left.factFingerprint || !right.factFingerprint) continue;
      const pair = comparePair(left, right, byId.get(left.caseId), byId.get(right.caseId));
      if (!pair.sameDisplayedFacts && pair.sameConsumerText) {
        pairsWithSameCopyDifferentFacts.push(pair);
      }
      if (!pair.sameConsumerText && pair.sameMatchedRules) identicalRulesDifferentCopy += 1;
    }
  }

  return {
    version: NATAL_RULE_DIFFERENTIATION_VERSION,
    lifecycle: 'internal_quality_audit',
    researchEvidenceIsNotProductionAuthority: true,
    mayPublish: false,
    maySell: false,
    numberOfCases: baseline.numberOfCases,
    casesWithConsumerInterpretation: baseline.cases.filter((c) =>
      c.interpretationFingerprint !== undefined).length,
    casesWithoutConsumerInterpretation: [...baseline.casesWithoutInterpretation],
    casesWithResearchClaimSignature: [...byId.values()].filter((x) =>
      x.matchedClaimCount > 0).length,
    repeatedTextGroups,
    pairsWithSameCopyDifferentFacts,
    warningCounts: {
      sameCopyDifferentRules: pairsWithSameCopyDifferentFacts.filter((p) =>
        p.disposition === 'SAME_COPY_DIFFERENT_RULES').length,
      sameCopySameRulesDifferentChart: pairsWithSameCopyDifferentFacts.filter((p) =>
        p.disposition === 'SAME_COPY_SAME_RULES_DIFFERENT_CHART').length,
      identicalRulesDifferentCopy,
    },
    ruleSignatures: [...byId.values()].sort((a, b) => a.caseId.localeCompare(b.caseId)),
    limitations: [
      'The integrated interpretation registry is research-lifecycle. Its claim/rule matches are diagnostic evidence, not Approved/Official/Production interpretation content.',
      'Matched rule signatures and claim semantics do not prove that consumer text is correct or sufficiently differentiated.',
      'Different displayed chart facts can legitimately share an interpretation. A warning is a review target, not automatically a bug.',
      'The consumer response has no direct claim-to-paragraph ID mapping; matched-rule comparisons describe the research chart run, not a proven cause of each consumer sentence.',
      'No new prediction/claim or authority promotion follows from this audit.',
    ],
  };
}
