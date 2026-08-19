import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type {
  ClaimRelation,
  EvidenceIndexEntry,
  ExecutionCompleteness,
  InterpretationClaim,
  InterpretationRun,
  RuleDefinition,
  RuleEvaluation,
} from '../contracts/interpretation.js';
import {
  buildClaimRelations,
  validateClaimGraphIntegrity,
} from './claim-graph.js';
import {
  buildInterpretationExecutionPlan,
  type InterpretationExecutionPlan,
} from './execution-plan.js';
import { evaluateRule } from './rule-evaluator.js';
import {
  deterministicContentHash,
  type ResolvedRuleRegistrySnapshot,
} from './rule-registry.js';

const INTERPRETATION_ENGINE_VERSION = '0.1.0';
const DERIVED_FACT_SET_VERSION = 'myeonghwa-derived-facts-v1';

export interface InterpretationRunOptions {
  requestId?: string;
  now?: Date;
}

export interface InterpretationExecutionResult {
  run: InterpretationRun;
  executionPlan: InterpretationExecutionPlan;
  evaluations: readonly RuleEvaluation[];
  claims: readonly InterpretationClaim[];
  claimRelations: readonly ClaimRelation[];
  integrity: {
    valid: boolean;
    errors: readonly string[];
  };
  evidenceIndex: Readonly<Record<string, EvidenceIndexEntry>>;
}

function ruleKey(ruleId: string, version: string): string {
  return `${ruleId}@${version}`;
}

function ruleIndex(registry: ResolvedRuleRegistrySnapshot): ReadonlyMap<string, RuleDefinition> {
  return new Map(
    registry.rules.map((rule) => [ruleKey(rule.ruleId, rule.version), rule]),
  );
}

function scenarioOverrides(
  scenario: CanonicalSajuSnapshot['scenarios'][number],
): Readonly<Record<string, unknown>> {
  return Object.fromEntries(scenario.factOverrides.map((override) => [override.path, override.value]));
}

function scenarioSensitive(rule: RuleDefinition): boolean {
  return rule.inputs.some((input) => input.ambiguityBehavior === 'scenario_preserving');
}

function evaluatePlannedRule(
  rule: RuleDefinition,
  snapshot: CanonicalSajuSnapshot,
  registry: ResolvedRuleRegistrySnapshot,
  existingClaims: readonly InterpretationClaim[],
  now: Date,
): readonly { evaluation: RuleEvaluation; claims: readonly InterpretationClaim[] }[] {
  if (!scenarioSensitive(rule) || snapshot.scenarios.length === 0) {
    return [
      evaluateRule(rule, {
        snapshot,
        pack: registry.pack,
        existingClaims,
        now,
      }),
    ];
  }

  return snapshot.scenarios.map((scenario) =>
    evaluateRule(rule, {
      snapshot,
      pack: registry.pack,
      existingClaims,
      scenarioRef: scenario.scenarioId,
      factOverrides: scenarioOverrides(scenario),
      now,
    }),
  );
}

function relationIntegrityErrors(
  claims: readonly InterpretationClaim[],
  relations: readonly ClaimRelation[],
): readonly string[] {
  const errors: string[] = [];
  const claimIds = new Set(claims.map((claim) => claim.claimId));
  const relationIds = new Set<string>();

  for (const relation of relations) {
    if (relationIds.has(relation.relationId)) {
      errors.push(`duplicate relationId: ${relation.relationId}`);
    }
    relationIds.add(relation.relationId);
    if (!claimIds.has(relation.fromClaimId)) {
      errors.push(`relation ${relation.relationId} references missing from-claim ${relation.fromClaimId}`);
    }
    if (!claimIds.has(relation.toClaimId)) {
      errors.push(`relation ${relation.relationId} references missing to-claim ${relation.toClaimId}`);
    }
    if (relation.fromClaimId === relation.toClaimId) {
      errors.push(`relation ${relation.relationId} self-references claim ${relation.fromClaimId}`);
    }
  }

  return errors.sort();
}

function executionCompleteness(
  registry: ResolvedRuleRegistrySnapshot,
  evaluations: readonly RuleEvaluation[],
  integrityValid: boolean,
): ExecutionCompleteness {
  const selectedRuleSets = [...new Set(registry.pack.enabledRuleSets)].sort();
  const blocked = new Set<string>();
  const reasons = new Set<string>();
  const ruleSetByRuleId = new Map(registry.rules.map((rule) => [rule.ruleId, rule.ruleSetId]));

  for (const evaluation of evaluations) {
    if (evaluation.status === 'matched' || evaluation.status === 'not_matched') continue;
    const ruleSetId = ruleSetByRuleId.get(evaluation.ruleRef.id);
    if (ruleSetId !== undefined) blocked.add(ruleSetId);
    reasons.add(`${evaluation.ruleRef.id}:${evaluation.status}`);
  }

  if (!integrityValid) reasons.add('claim_graph_integrity_failed');

  const blockedCoreGroups = [...blocked].sort();
  const completedCoreGroups = selectedRuleSets.filter((group) => !blocked.has(group));
  const state: ExecutionCompleteness['state'] = !integrityValid
    ? 'failed'
    : blockedCoreGroups.length > 0
      ? 'partial'
      : 'complete';

  return {
    state,
    completedCoreGroups,
    blockedCoreGroups,
    skippedOptionalGroups: [],
    reasons: [...reasons].sort(),
  };
}

function stableEvaluationRecord(evaluation: RuleEvaluation) {
  return {
    evaluationId: evaluation.evaluationId,
    ruleRef: evaluation.ruleRef,
    snapshotId: evaluation.snapshotId,
    interpretationPackRef: evaluation.interpretationPackRef,
    status: evaluation.status,
    inputRefs: evaluation.inputRefs,
    emittedClaimIds: evaluation.emittedClaimIds,
  };
}

function makeRunHash(
  snapshot: CanonicalSajuSnapshot,
  registry: ResolvedRuleRegistrySnapshot,
  plan: InterpretationExecutionPlan,
  evaluations: readonly RuleEvaluation[],
  claims: readonly InterpretationClaim[],
  relations: readonly ClaimRelation[],
): string {
  return deterministicContentHash({
    snapshotHash: snapshot.calculationHash,
    registrySnapshotId: registry.snapshot.registrySnapshotId,
    executionPlanId: plan.executionPlanId,
    packRef: { id: registry.pack.packId, version: registry.pack.version },
    compositionPolicyRef: registry.pack.compositionPolicyRef,
    derivedFactSetVersion: DERIVED_FACT_SET_VERSION,
    interpretationEngineVersion: INTERPRETATION_ENGINE_VERSION,
    evaluations: evaluations.map(stableEvaluationRecord),
    claims,
    relations,
  });
}

export function runInterpretation(
  snapshot: CanonicalSajuSnapshot,
  registry: ResolvedRuleRegistrySnapshot,
  options: InterpretationRunOptions = {},
): InterpretationExecutionResult {
  const now = options.now ?? new Date();
  const plan = buildInterpretationExecutionPlan(registry);
  const rules = ruleIndex(registry);
  const evaluations: RuleEvaluation[] = [];
  const claims: InterpretationClaim[] = [];

  for (const stage of plan.stages) {
    const priorStageClaims = [...claims];
    const stageEvaluations: RuleEvaluation[] = [];
    const stageClaims: InterpretationClaim[] = [];

    for (const ruleRef of stage.ruleRefs) {
      const rule = rules.get(ruleKey(ruleRef.id, ruleRef.version));
      if (rule === undefined) {
        throw new Error(`Execution plan references missing resolved rule ${ruleRef.id}@${ruleRef.version}`);
      }
      for (const result of evaluatePlannedRule(rule, snapshot, registry, priorStageClaims, now)) {
        stageEvaluations.push(result.evaluation);
        stageClaims.push(...result.claims);
      }
    }

    evaluations.push(...stageEvaluations);
    claims.push(...stageClaims);
  }

  const sortedEvaluations = [...evaluations].sort((left, right) =>
    left.evaluationId.localeCompare(right.evaluationId),
  );
  const sortedClaims = [...claims].sort((left, right) => left.claimId.localeCompare(right.claimId));
  const claimRelations = buildClaimRelations(sortedClaims, registry.rules);
  const graphIntegrity = validateClaimGraphIntegrity(
    snapshot,
    registry,
    sortedEvaluations,
    sortedClaims,
  );
  const relationErrors = relationIntegrityErrors(sortedClaims, claimRelations);
  const integrityErrors = [...graphIntegrity.errors, ...relationErrors].sort();
  const integrityValid = integrityErrors.length === 0;
  const completeness = executionCompleteness(registry, sortedEvaluations, integrityValid);
  const runHash = makeRunHash(
    snapshot,
    registry,
    plan,
    sortedEvaluations,
    sortedClaims,
    claimRelations,
  );
  const interpretationRunId = `interpretation_${runHash.slice(0, 24)}`;
  const status: InterpretationRun['status'] = completeness.state === 'complete'
    ? 'completed'
    : completeness.state === 'partial'
      ? 'partial'
      : 'failed';
  const timestamp = now.toISOString();
  const run: InterpretationRun = {
    interpretationRunId,
    requestId: options.requestId ?? `request_${interpretationRunId}`,
    snapshotId: snapshot.snapshotId,
    snapshotHash: snapshot.calculationHash,
    registrySnapshotId: registry.snapshot.registrySnapshotId,
    packRef: { id: registry.pack.packId, version: registry.pack.version },
    compositionPolicyRef: registry.pack.compositionPolicyRef,
    derivedFactSetVersion: DERIVED_FACT_SET_VERSION,
    interpretationEngineVersion: INTERPRETATION_ENGINE_VERSION,
    startedAt: timestamp,
    completedAt: timestamp,
    status,
    completeness,
    evaluationIds: sortedEvaluations.map((evaluation) => evaluation.evaluationId),
    claimIds: sortedClaims.map((claim) => claim.claimId),
    claimRelationIds: claimRelations.map((relation) => relation.relationId),
    runHash,
  };

  return {
    run,
    executionPlan: plan,
    evaluations: sortedEvaluations,
    claims: sortedClaims,
    claimRelations,
    integrity: { valid: integrityValid, errors: integrityErrors },
    evidenceIndex: graphIntegrity.evidenceIndex,
  };
}
