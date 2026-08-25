import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { FactState } from '../contracts/common.js';
import type {
  ClaimRelation,
  EvidenceIndexEntry,
  InterpretationClaim,
  RuleDefinition,
  RuleEvaluation,
} from '../contracts/interpretation.js';
import type { ValidatedResearchEvidence } from './research-evidence-runtime.js';
import { deterministicContentHash, type ResolvedRuleRegistrySnapshot } from './rule-registry.js';

const FORBIDDEN_PATH_SEGMENTS = new Set(['__proto__', 'prototype', 'constructor']);

type ClaimRelationDraft = Omit<ClaimRelation, 'relationId'>;

export interface ClaimGraphIntegrityResult {
  valid: boolean;
  errors: readonly string[];
  evidenceIndex: Readonly<Record<string, EvidenceIndexEntry>>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isFactState(value: unknown): value is FactState<unknown> {
  return (
    isRecord(value) &&
    (value.status === 'resolved' || value.status === 'ambiguous' || value.status === 'unavailable')
  );
}

function splitPath(path: string): readonly string[] | undefined {
  const segments = path.split('.').filter((segment) => segment.length > 0);
  if (segments.length === 0 || segments.some((segment) => FORBIDDEN_PATH_SEGMENTS.has(segment))) {
    return undefined;
  }
  return segments;
}

function matchingOverride(
  path: string,
  overrides: Readonly<Record<string, unknown>> | undefined,
): { value: unknown; remainingSegments: readonly string[] } | undefined {
  if (overrides === undefined) return undefined;
  const selected = Object.entries(overrides)
    .filter(([candidatePath]) => path === candidatePath || path.startsWith(`${candidatePath}.`))
    .sort(([left], [right]) => right.length - left.length)[0];
  if (selected === undefined) return undefined;

  const remainingPath = path === selected[0] ? '' : path.slice(selected[0].length + 1);
  const remainingSegments = remainingPath.length === 0 ? [] : splitPath(remainingPath);
  if (remainingSegments === undefined) return undefined;
  return { value: selected[1], remainingSegments };
}

function logicalPathExists(
  root: unknown,
  path: string,
  overrides?: Readonly<Record<string, unknown>>,
): boolean {
  const segments = splitPath(path);
  if (segments === undefined) return false;

  const selectedOverride = matchingOverride(path, overrides);
  let cursor: unknown = selectedOverride?.value ?? root;
  const remainingSegments = selectedOverride?.remainingSegments ?? segments;

  for (const segment of remainingSegments) {
    while (isFactState(cursor)) {
      if (cursor.status !== 'resolved') return false;
      cursor = cursor.value;
    }
    if (!isRecord(cursor) || !Object.prototype.hasOwnProperty.call(cursor, segment)) return false;
    cursor = cursor[segment];
  }
  return true;
}

function scenarioOverrideIndex(
  snapshot: CanonicalSajuSnapshot,
): ReadonlyMap<string, Readonly<Record<string, unknown>>> {
  return new Map(
    snapshot.scenarios.map((scenario) => [
      scenario.scenarioId,
      Object.fromEntries(scenario.factOverrides.map((override) => [override.path, override.value])),
    ]),
  );
}

function primaryRuleRef(
  claim: InterpretationClaim,
): { ruleId: string; version: string } | undefined {
  const ref = claim.ruleRefs[0];
  return ref === undefined ? undefined : { ruleId: ref.ruleId, version: ref.version };
}

function ruleRefKey(ruleId: string, version: string): string {
  return `${ruleId}@${version}`;
}

function scenarioCompatible(left: InterpretationClaim, right: InterpretationClaim): boolean {
  return (
    left.scenarioRef === undefined ||
    right.scenarioRef === undefined ||
    left.scenarioRef === right.scenarioRef
  );
}

function relationContentKey(relation: ClaimRelationDraft): string {
  return `${relation.fromClaimId}>${relation.toClaimId}:${relation.relation}:${relation.reason ?? ''}`;
}

function relationSortKey(relation: ClaimRelation): string {
  return `${relationContentKey(relation)}:${relation.relationId}`;
}

function addRelation(
  relations: Map<string, ClaimRelation>,
  draft: ClaimRelationDraft,
): void {
  if (draft.fromClaimId === draft.toClaimId) return;
  const key = relationContentKey(draft);
  const relation: ClaimRelation = {
    relationId: `relation_${deterministicContentHash(draft).slice(0, 24)}`,
    ...draft,
  };
  relations.set(key, relation);
}

function addSymmetricContradiction(
  relations: Map<string, ClaimRelation>,
  left: InterpretationClaim,
  right: InterpretationClaim,
  reason: string,
): void {
  const [fromClaimId, toClaimId] = [left.claimId, right.claimId].sort();
  if (fromClaimId === undefined || toClaimId === undefined) return;
  addRelation(relations, {
    fromClaimId,
    toClaimId,
    relation: 'contradicts',
    reason,
  });
}

function claimsByRule(claims: readonly InterpretationClaim[]): ReadonlyMap<string, InterpretationClaim[]> {
  const result = new Map<string, InterpretationClaim[]>();
  for (const claim of claims) {
    for (const ruleRef of claim.ruleRefs) {
      const values = result.get(ruleRef.ruleId) ?? [];
      values.push(claim);
      result.set(ruleRef.ruleId, values);
    }
  }
  return result;
}

function rulesByRef(rules: readonly RuleDefinition[]): ReadonlyMap<string, RuleDefinition> {
  return new Map(rules.map((rule) => [ruleRefKey(rule.ruleId, rule.version), rule]));
}

function canonicalConflictReason(leftRuleId: string, rightRuleId: string): string {
  return `rule_conflict:${[leftRuleId, rightRuleId].sort().join('<->')}`;
}

export function buildClaimRelations(
  claims: readonly InterpretationClaim[],
  rules: readonly RuleDefinition[],
): readonly ClaimRelation[] {
  const relations = new Map<string, ClaimRelation>();
  const claimById = new Map(claims.map((claim) => [claim.claimId, claim]));
  const byRule = claimsByRule(claims);
  const ruleIndex = rulesByRef(rules);

  for (const claim of claims) {
    for (const upstreamClaimId of claim.upstreamClaimRefs) {
      if (claimById.has(upstreamClaimId)) {
        addRelation(relations, {
          fromClaimId: claim.claimId,
          toClaimId: upstreamClaimId,
          relation: 'depends_on',
          reason: 'interpretation_claim_input',
        });
      }
    }

    const sourceRuleRef = primaryRuleRef(claim);
    if (sourceRuleRef === undefined) continue;
    const rule = ruleIndex.get(ruleRefKey(sourceRuleRef.ruleId, sourceRuleRef.version));
    if (rule === undefined) continue;

    for (const targetRuleId of rule.relations?.requires ?? []) {
      for (const target of byRule.get(targetRuleId) ?? []) {
        if (!scenarioCompatible(claim, target)) continue;
        addRelation(relations, {
          fromClaimId: claim.claimId,
          toClaimId: target.claimId,
          relation: 'depends_on',
          reason: `rule_requires:${targetRuleId}`,
        });
      }
    }

    const conflictTargetRuleIds = new Set([
      ...(rule.relations?.conflictsWith ?? []),
      ...(rule.relations?.mutuallyExclusiveWith ?? []),
    ]);
    for (const targetRuleId of conflictTargetRuleIds) {
      for (const target of byRule.get(targetRuleId) ?? []) {
        if (!scenarioCompatible(claim, target)) continue;
        addSymmetricContradiction(
          relations,
          claim,
          target,
          canonicalConflictReason(rule.ruleId, targetRuleId),
        );
      }
    }

    for (const targetRuleId of rule.relations?.supersedes ?? []) {
      for (const target of byRule.get(targetRuleId) ?? []) {
        if (!scenarioCompatible(claim, target)) continue;
        addRelation(relations, {
          fromClaimId: claim.claimId,
          toClaimId: target.claimId,
          relation: 'supersedes',
          reason: `rule_supersedes:${targetRuleId}`,
        });
      }
    }
  }

  return [...relations.values()].sort((left, right) => relationSortKey(left).localeCompare(relationSortKey(right)));
}

function duplicateIds(values: readonly string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return [...duplicates].sort();
}

export function validateClaimGraphIntegrity(
  snapshot: CanonicalSajuSnapshot,
  registry: ResolvedRuleRegistrySnapshot,
  evaluations: readonly RuleEvaluation[],
  claims: readonly InterpretationClaim[],
  validatedResearchEvidence: readonly ValidatedResearchEvidence[] = [],
): ClaimGraphIntegrityResult {
  const errors: string[] = [];
  const evaluationById = new Map(evaluations.map((evaluation) => [evaluation.evaluationId, evaluation]));
  const claimById = new Map(claims.map((claim) => [claim.claimId, claim]));
  const sourceIds = new Set(registry.sources.map((source) => source.sourceId));
  const methodologyRefs = new Set(
    registry.methodologies.map((methodology) => `${methodology.methodologyId}@${methodology.version}`),
  );
  const ruleRefs = new Set(registry.rules.map((rule) => `${rule.ruleId}@${rule.version}`));
  const researchEvidenceIds = new Set(
    validatedResearchEvidence.map((evidence) => evidence.envelope.envelopeId),
  );
  const scenarioOverrides = scenarioOverrideIndex(snapshot);
  const evidenceIndex: Record<string, EvidenceIndexEntry> = {};

  for (const duplicate of duplicateIds(evaluations.map((evaluation) => evaluation.evaluationId))) {
    errors.push(`duplicate evaluationId: ${duplicate}`);
  }
  for (const duplicate of duplicateIds(claims.map((claim) => claim.claimId))) {
    errors.push(`duplicate claimId: ${duplicate}`);
  }

  for (const evaluation of evaluations) {
    if (evaluation.snapshotId !== snapshot.snapshotId) {
      errors.push(`evaluation ${evaluation.evaluationId} references wrong snapshot ${evaluation.snapshotId}`);
    }
    if (!ruleRefs.has(`${evaluation.ruleRef.id}@${evaluation.ruleRef.version}`)) {
      errors.push(`evaluation ${evaluation.evaluationId} references unknown rule ${evaluation.ruleRef.id}@${evaluation.ruleRef.version}`);
    }
    for (const inputRef of evaluation.inputRefs) {
      if (
        inputRef.sourceType === 'research_evidence' &&
        inputRef.payloadHash !== undefined &&
        !researchEvidenceIds.has(inputRef.idOrPath)
      ) {
        errors.push(
          `evaluation ${evaluation.evaluationId} references missing research evidence ${inputRef.idOrPath}`,
        );
      }
    }
    for (const claimId of evaluation.emittedClaimIds) {
      if (!claimById.has(claimId)) {
        errors.push(`evaluation ${evaluation.evaluationId} emits missing claim ${claimId}`);
      }
    }
  }

  for (const claim of claims) {
    if (claim.snapshotId !== snapshot.snapshotId) {
      errors.push(`claim ${claim.claimId} references wrong snapshot ${claim.snapshotId}`);
    }

    const methodologyKey = `${claim.methodologyRef.id}@${claim.methodologyRef.version}`;
    if (!methodologyRefs.has(methodologyKey)) {
      errors.push(`claim ${claim.claimId} references unknown methodology ${methodologyKey}`);
    }

    for (const ruleRef of claim.ruleRefs) {
      const key = `${ruleRef.ruleId}@${ruleRef.version}`;
      if (!ruleRefs.has(key)) errors.push(`claim ${claim.claimId} references unknown rule ${key}`);
      const evaluation = evaluationById.get(ruleRef.evaluationId);
      if (evaluation === undefined) {
        errors.push(`claim ${claim.claimId} references missing evaluation ${ruleRef.evaluationId}`);
      } else {
        if (evaluation.ruleRef.id !== ruleRef.ruleId || evaluation.ruleRef.version !== ruleRef.version) {
          errors.push(`claim ${claim.claimId} evaluation/rule ref mismatch ${ruleRef.evaluationId}`);
        }
        if (!evaluation.emittedClaimIds.includes(claim.claimId)) {
          errors.push(`claim ${claim.claimId} not listed by evaluation ${ruleRef.evaluationId}`);
        }
      }
    }

    const claimScenarioOverrides =
      claim.scenarioRef === undefined ? undefined : scenarioOverrides.get(claim.scenarioRef);
    for (const factRef of claim.factRefs) {
      if (!logicalPathExists(snapshot, factRef, claimScenarioOverrides)) {
        errors.push(`claim ${claim.claimId} references missing fact ${factRef}`);
      }
    }
    for (const upstreamClaimRef of claim.upstreamClaimRefs) {
      if (upstreamClaimRef === claim.claimId) {
        errors.push(`claim ${claim.claimId} self-references upstream claim`);
      } else if (!claimById.has(upstreamClaimRef)) {
        errors.push(`claim ${claim.claimId} references missing upstream claim ${upstreamClaimRef}`);
      }
    }
    for (const researchEvidenceRef of claim.researchEvidenceRefs ?? []) {
      if (!researchEvidenceIds.has(researchEvidenceRef)) {
        errors.push(`claim ${claim.claimId} references missing research evidence ${researchEvidenceRef}`);
      }
    }
    for (const sourceRef of claim.sourceRefs) {
      if (!sourceIds.has(sourceRef)) errors.push(`claim ${claim.claimId} references missing source ${sourceRef}`);
    }

    evidenceIndex[claim.claimId] = {
      claimId: claim.claimId,
      factRefs: [...claim.factRefs],
      upstreamClaimRefs: [...claim.upstreamClaimRefs],
      ...((claim.researchEvidenceRefs?.length ?? 0) === 0
        ? {}
        : { researchEvidenceRefs: [...(claim.researchEvidenceRefs ?? [])] }),
      sourceRefs: [...claim.sourceRefs],
      ruleRefs: claim.ruleRefs.map((ruleRef) => ({ id: ruleRef.ruleId, version: ruleRef.version })),
      methodologyRef: claim.methodologyRef,
    };
  }

  return { valid: errors.length === 0, errors: errors.sort(), evidenceIndex };
}
