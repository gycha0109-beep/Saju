import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type {
  ClaimRelation,
  EvidenceIndexEntry,
  InterpretationClaim,
  RuleDefinition,
  RuleEvaluation,
} from '../contracts/interpretation.js';
import type { ResolvedRuleRegistrySnapshot } from './rule-registry.js';

const FORBIDDEN_PATH_SEGMENTS = new Set(['__proto__', 'prototype', 'constructor']);

export interface ClaimGraphIntegrityResult {
  valid: boolean;
  errors: readonly string[];
  evidenceIndex: Readonly<Record<string, EvidenceIndexEntry>>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function pathExists(root: unknown, path: string): boolean {
  const segments = path.split('.').filter((segment) => segment.length > 0);
  if (segments.length === 0 || segments.some((segment) => FORBIDDEN_PATH_SEGMENTS.has(segment))) {
    return false;
  }

  let cursor: unknown = root;
  for (const segment of segments) {
    if (!isRecord(cursor) || !Object.prototype.hasOwnProperty.call(cursor, segment)) return false;
    cursor = cursor[segment];
  }
  return true;
}

function primaryRuleId(claim: InterpretationClaim): string | undefined {
  return claim.ruleRefs[0]?.ruleId;
}

function scenarioCompatible(left: InterpretationClaim, right: InterpretationClaim): boolean {
  return (
    left.scenarioRef === undefined ||
    right.scenarioRef === undefined ||
    left.scenarioRef === right.scenarioRef
  );
}

function relationKey(relation: ClaimRelation): string {
  return `${relation.fromClaimId}>${relation.toClaimId}:${relation.relation}:${relation.reason ?? ''}`;
}

function addRelation(
  relations: Map<string, ClaimRelation>,
  relation: ClaimRelation,
): void {
  if (relation.fromClaimId === relation.toClaimId) return;
  relations.set(relationKey(relation), relation);
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

function rulesById(rules: readonly RuleDefinition[]): ReadonlyMap<string, RuleDefinition[]> {
  const result = new Map<string, RuleDefinition[]>();
  for (const rule of rules) {
    const values = result.get(rule.ruleId) ?? [];
    values.push(rule);
    result.set(rule.ruleId, values);
  }
  return result;
}

export function buildClaimRelations(
  claims: readonly InterpretationClaim[],
  rules: readonly RuleDefinition[],
): readonly ClaimRelation[] {
  const relations = new Map<string, ClaimRelation>();
  const claimById = new Map(claims.map((claim) => [claim.claimId, claim]));
  const byRule = claimsByRule(claims);
  const ruleIndex = rulesById(rules);

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

    const ruleId = primaryRuleId(claim);
    if (ruleId === undefined) continue;
    for (const rule of ruleIndex.get(ruleId) ?? []) {
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

      for (const targetRuleId of [
        ...(rule.relations?.conflictsWith ?? []),
        ...(rule.relations?.mutuallyExclusiveWith ?? []),
      ]) {
        for (const target of byRule.get(targetRuleId) ?? []) {
          if (!scenarioCompatible(claim, target)) continue;
          addSymmetricContradiction(relations, claim, target, `rule_conflict:${targetRuleId}`);
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
  }

  return [...relations.values()].sort((left, right) => relationKey(left).localeCompare(relationKey(right)));
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
): ClaimGraphIntegrityResult {
  const errors: string[] = [];
  const evaluationById = new Map(evaluations.map((evaluation) => [evaluation.evaluationId, evaluation]));
  const claimById = new Map(claims.map((claim) => [claim.claimId, claim]));
  const sourceIds = new Set(registry.sources.map((source) => source.sourceId));
  const methodologyRefs = new Set(
    registry.methodologies.map((methodology) => `${methodology.methodologyId}@${methodology.version}`),
  );
  const ruleRefs = new Set(registry.rules.map((rule) => `${rule.ruleId}@${rule.version}`));
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

    for (const factRef of claim.factRefs) {
      if (!pathExists(snapshot, factRef)) errors.push(`claim ${claim.claimId} references missing fact ${factRef}`);
    }
    for (const upstreamClaimRef of claim.upstreamClaimRefs) {
      if (upstreamClaimRef === claim.claimId) {
        errors.push(`claim ${claim.claimId} self-references upstream claim`);
      } else if (!claimById.has(upstreamClaimRef)) {
        errors.push(`claim ${claim.claimId} references missing upstream claim ${upstreamClaimRef}`);
      }
    }
    for (const sourceRef of claim.sourceRefs) {
      if (!sourceIds.has(sourceRef)) errors.push(`claim ${claim.claimId} references missing source ${sourceRef}`);
    }

    evidenceIndex[claim.claimId] = {
      claimId: claim.claimId,
      factRefs: [...claim.factRefs],
      upstreamClaimRefs: [...claim.upstreamClaimRefs],
      sourceRefs: [...claim.sourceRefs],
      ruleRefs: claim.ruleRefs.map((ruleRef) => ({ id: ruleRef.ruleId, version: ruleRef.version })),
      methodologyRef: claim.methodologyRef,
    };
  }

  return { valid: errors.length === 0, errors: errors.sort(), evidenceIndex };
}
