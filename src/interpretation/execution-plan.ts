import type { ContentAddressedVersionedRef, VersionedRef } from '../contracts/common.js';
import type {
  InterpretationPack,
  MethodologyDefinition,
  RuleDefinition,
} from '../contracts/interpretation.js';
import {
  deterministicContentHash,
  type ResolvedRuleRegistrySnapshot,
} from './rule-registry.js';

export type ExecutionPlanErrorCode =
  | 'PACK_NOT_EXECUTABLE'
  | 'METHODOLOGY_NOT_EXECUTABLE_FOR_PACK'
  | 'RULE_NOT_EXECUTABLE_FOR_PACK'
  | 'RULE_QUALITY_NOT_AUTHORIZED_FOR_PACK'
  | 'RULE_METHODOLOGY_NOT_ENABLED'
  | 'RULE_VERSION_SELECTION_AMBIGUOUS'
  | 'RULE_DEPENDENCY_MISSING'
  | 'CLAIM_DEPENDENCY_MISSING'
  | 'EXECUTION_PLAN_INVALID_CYCLE';

export class ExecutionPlanError extends Error {
  readonly code: ExecutionPlanErrorCode;

  constructor(code: ExecutionPlanErrorCode, message: string) {
    super(message);
    this.name = 'ExecutionPlanError';
    this.code = code;
  }
}

export interface RuleDependencyEdge {
  fromRuleRef: VersionedRef;
  toRuleRef: VersionedRef;
  reason: 'explicit_rule_requirement' | 'interpretation_claim_requirement';
  claimType?: string;
}

export interface ExecutionPlanStage {
  stageIndex: number;
  ruleRefs: readonly ContentAddressedVersionedRef[];
}

export interface InterpretationExecutionPlan {
  executionPlanId: string;
  registrySnapshotId: string;
  packRef: ContentAddressedVersionedRef;
  orderedRuleRefs: readonly ContentAddressedVersionedRef[];
  dependencyEdges: readonly RuleDependencyEdge[];
  stages: readonly ExecutionPlanStage[];
  planHash: string;
}

function ref(rule: RuleDefinition): VersionedRef {
  return { id: rule.ruleId, version: rule.version };
}

function refKey(value: VersionedRef): string {
  return `${value.id}@${value.version}`;
}

function sortRules(rules: readonly RuleDefinition[]): RuleDefinition[] {
  return [...rules].sort((left, right) => {
    const idOrder = left.ruleId.localeCompare(right.ruleId);
    return idOrder === 0 ? left.version.localeCompare(right.version) : idOrder;
  });
}

function allowedStatus(rule: RuleDefinition, pack: InterpretationPack): boolean {
  if (rule.status === 'rejected' || rule.status === 'deprecated') return false;
  if (pack.status === 'production') return rule.status === 'active';
  if (pack.status === 'staging') return rule.status === 'active' || rule.status === 'reviewed';
  return rule.status === 'active' || rule.status === 'reviewed' || rule.status === 'research';
}

function methodologyStatusAllowed(
  methodology: MethodologyDefinition,
  pack: InterpretationPack,
): boolean {
  if (methodology.status === 'deprecated') return false;
  if (pack.status === 'production') return methodology.status === 'active';
  if (pack.status === 'staging') {
    return methodology.status === 'active' || methodology.status === 'reviewed';
  }
  return (
    methodology.status === 'active' ||
    methodology.status === 'reviewed' ||
    methodology.status === 'research'
  );
}

const PRODUCTION_TEST_COVERAGE = new Set<RuleDefinition['quality']['testCoverage']>([
  'fixture_matrix',
  'regression_suite',
]);
const STAGING_TEST_COVERAGE = new Set<RuleDefinition['quality']['testCoverage']>([
  'unit',
  'fixture_matrix',
  'regression_suite',
]);
const PRODUCTION_PROVENANCE = new Set<RuleDefinition['quality']['provenanceQuality']>([
  'primary_supported',
  'multi_source_supported',
]);
const STAGING_PROVENANCE = new Set<RuleDefinition['quality']['provenanceQuality']>([
  'primary_supported',
  'multi_source_supported',
  'secondary_only',
  'single_practitioner',
]);

function assertMethodologyAuthorization(registry: ResolvedRuleRegistrySnapshot): void {
  for (const methodology of registry.methodologies) {
    if (!methodologyStatusAllowed(methodology, registry.pack)) {
      throw new ExecutionPlanError(
        'METHODOLOGY_NOT_EXECUTABLE_FOR_PACK',
        `${methodology.methodologyId}@${methodology.version} (${methodology.status}) is not executable in ${registry.pack.status} pack ${registry.pack.packId}@${registry.pack.version}`,
      );
    }
    if (
      (registry.pack.status === 'staging' || registry.pack.status === 'production') &&
      methodology.sourceIds.length === 0
    ) {
      throw new ExecutionPlanError(
        'METHODOLOGY_NOT_EXECUTABLE_FOR_PACK',
        `${methodology.methodologyId}@${methodology.version} has no source references and cannot enter ${registry.pack.status}.`,
      );
    }
  }
}

function assertRuleQualityAuthorization(rule: RuleDefinition, pack: InterpretationPack): void {
  if (pack.status === 'research') return;

  if (pack.status === 'staging') {
    const reviewerAllowed =
      rule.quality.reviewerStatus === 'internal_reviewed' ||
      rule.quality.reviewerStatus === 'domain_reviewed';
    if (
      !reviewerAllowed ||
      !STAGING_TEST_COVERAGE.has(rule.quality.testCoverage) ||
      !STAGING_PROVENANCE.has(rule.quality.provenanceQuality)
    ) {
      throw new ExecutionPlanError(
        'RULE_QUALITY_NOT_AUTHORIZED_FOR_PACK',
        `${rule.ruleId}@${rule.version} quality is not staging-authorized: reviewer=${rule.quality.reviewerStatus}, tests=${rule.quality.testCoverage}, provenance=${rule.quality.provenanceQuality}`,
      );
    }
    return;
  }

  if (
    rule.quality.reviewerStatus !== 'domain_reviewed' ||
    !PRODUCTION_TEST_COVERAGE.has(rule.quality.testCoverage) ||
    !PRODUCTION_PROVENANCE.has(rule.quality.provenanceQuality)
  ) {
    throw new ExecutionPlanError(
      'RULE_QUALITY_NOT_AUTHORIZED_FOR_PACK',
      `${rule.ruleId}@${rule.version} quality is not production-authorized: reviewer=${rule.quality.reviewerStatus}, tests=${rule.quality.testCoverage}, provenance=${rule.quality.provenanceQuality}`,
    );
  }
}

function assertSingleSelectedVersion(rules: readonly RuleDefinition[]): void {
  const versionsByRuleId = new Map<string, Set<string>>();
  for (const rule of rules) {
    const versions = versionsByRuleId.get(rule.ruleId) ?? new Set<string>();
    versions.add(rule.version);
    versionsByRuleId.set(rule.ruleId, versions);
  }

  for (const [ruleId, versions] of versionsByRuleId) {
    if (versions.size <= 1) continue;
    throw new ExecutionPlanError(
      'RULE_VERSION_SELECTION_AMBIGUOUS',
      `Pack selection resolves multiple versions for ${ruleId}: ${[...versions].sort().join(', ')}`,
    );
  }
}

function selectRules(
  registry: ResolvedRuleRegistrySnapshot,
): readonly RuleDefinition[] {
  if (registry.pack.status === 'deprecated') {
    throw new ExecutionPlanError(
      'PACK_NOT_EXECUTABLE',
      `Deprecated pack ${registry.pack.packId}@${registry.pack.version} cannot be executed.`,
    );
  }

  assertMethodologyAuthorization(registry);

  const enabledSets = new Set(registry.pack.enabledRuleSets);
  const disabled = new Set(registry.pack.disabledRuleIds ?? []);
  const enabledMethodologies = new Set(
    registry.pack.methodologyRefs.map((methodology) => `${methodology.id}@${methodology.version}`),
  );

  const selected = registry.rules.filter(
    (rule) => enabledSets.has(rule.ruleSetId) && !disabled.has(rule.ruleId),
  );

  assertSingleSelectedVersion(selected);

  for (const rule of selected) {
    if (!allowedStatus(rule, registry.pack)) {
      throw new ExecutionPlanError(
        'RULE_NOT_EXECUTABLE_FOR_PACK',
        `${rule.ruleId}@${rule.version} (${rule.status}) is not executable in ${registry.pack.status} pack ${registry.pack.packId}@${registry.pack.version}`,
      );
    }

    if (!enabledMethodologies.has(`${rule.methodologyRef.id}@${rule.methodologyRef.version}`)) {
      throw new ExecutionPlanError(
        'RULE_METHODOLOGY_NOT_ENABLED',
        `${rule.ruleId}@${rule.version} requires methodology ${rule.methodologyRef.id}@${rule.methodologyRef.version} outside the pack`,
      );
    }

    assertRuleQualityAuthorization(rule, registry.pack);
  }

  return sortRules(selected);
}

function explicitDependencies(
  rules: readonly RuleDefinition[],
): readonly RuleDependencyEdge[] {
  const byId = new Map<string, RuleDefinition[]>();
  for (const rule of rules) {
    const values = byId.get(rule.ruleId) ?? [];
    values.push(rule);
    byId.set(rule.ruleId, values);
  }

  const edges: RuleDependencyEdge[] = [];
  for (const rule of rules) {
    for (const dependencyId of rule.relations?.requires ?? []) {
      const candidates = byId.get(dependencyId);
      if (candidates === undefined || candidates.length === 0) {
        throw new ExecutionPlanError(
          'RULE_DEPENDENCY_MISSING',
          `${rule.ruleId}@${rule.version} requires missing selected rule ${dependencyId}`,
        );
      }
      for (const dependency of sortRules(candidates)) {
        edges.push({
          fromRuleRef: ref(dependency),
          toRuleRef: ref(rule),
          reason: 'explicit_rule_requirement',
        });
      }
    }
  }
  return edges;
}

function claimDependencies(
  rules: readonly RuleDefinition[],
): readonly RuleDependencyEdge[] {
  const producersByClaim = new Map<string, RuleDefinition[]>();
  for (const rule of rules) {
    const producers = producersByClaim.get(rule.output.claimType) ?? [];
    producers.push(rule);
    producersByClaim.set(rule.output.claimType, producers);
  }

  const edges: RuleDependencyEdge[] = [];
  for (const rule of rules) {
    for (const input of rule.inputs) {
      if (input.source !== 'interpretation_claim' || !input.required) continue;
      const producers = (producersByClaim.get(input.pathOrClaimType) ?? []).filter(
        (producer) => producer.ruleId !== rule.ruleId || producer.version !== rule.version,
      );
      if (producers.length === 0) {
        throw new ExecutionPlanError(
          'CLAIM_DEPENDENCY_MISSING',
          `${rule.ruleId}@${rule.version} requires claim type ${input.pathOrClaimType} but no selected rule produces it`,
        );
      }
      for (const producer of sortRules(producers)) {
        edges.push({
          fromRuleRef: ref(producer),
          toRuleRef: ref(rule),
          reason: 'interpretation_claim_requirement',
          claimType: input.pathOrClaimType,
        });
      }
    }
  }
  return edges;
}

function uniqueEdges(edges: readonly RuleDependencyEdge[]): readonly RuleDependencyEdge[] {
  const byKey = new Map<string, RuleDependencyEdge>();
  for (const edge of edges) {
    const key = `${refKey(edge.fromRuleRef)}>${refKey(edge.toRuleRef)}:${edge.reason}:${edge.claimType ?? ''}`;
    byKey.set(key, edge);
  }
  return [...byKey.values()].sort((left, right) => {
    const leftKey = `${refKey(left.fromRuleRef)}>${refKey(left.toRuleRef)}:${left.reason}:${left.claimType ?? ''}`;
    const rightKey = `${refKey(right.fromRuleRef)}>${refKey(right.toRuleRef)}:${right.reason}:${right.claimType ?? ''}`;
    return leftKey.localeCompare(rightKey);
  });
}

function buildStages(
  rules: readonly RuleDefinition[],
  edges: readonly RuleDependencyEdge[],
): readonly { rules: readonly RuleDefinition[]; refs: readonly VersionedRef[] }[] {
  const ruleByKey = new Map(rules.map((rule) => [refKey(ref(rule)), rule]));
  const incoming = new Map<string, Set<string>>();
  const outgoing = new Map<string, Set<string>>();

  for (const key of ruleByKey.keys()) {
    incoming.set(key, new Set());
    outgoing.set(key, new Set());
  }
  for (const edge of edges) {
    const from = refKey(edge.fromRuleRef);
    const to = refKey(edge.toRuleRef);
    incoming.get(to)?.add(from);
    outgoing.get(from)?.add(to);
  }

  const remaining = new Set(ruleByKey.keys());
  const stages: { rules: readonly RuleDefinition[]; refs: readonly VersionedRef[] }[] = [];

  while (remaining.size > 0) {
    const ready = [...remaining]
      .filter((key) => [...(incoming.get(key) ?? [])].every((dependency) => !remaining.has(dependency)))
      .sort();

    if (ready.length === 0) {
      const cycleMembers = [...remaining].sort().join(', ');
      throw new ExecutionPlanError(
        'EXECUTION_PLAN_INVALID_CYCLE',
        `Interpretation rule dependency cycle detected among: ${cycleMembers}`,
      );
    }

    const stageRules = ready.map((key) => {
      const rule = ruleByKey.get(key);
      if (rule === undefined) throw new Error(`Internal planner error for ${key}`);
      return rule;
    });
    stages.push({ rules: stageRules, refs: stageRules.map(ref) });
    for (const key of ready) remaining.delete(key);
  }

  return stages;
}

function contentRefFor(
  registry: ResolvedRuleRegistrySnapshot,
  versioned: VersionedRef,
): ContentAddressedVersionedRef {
  const found = registry.snapshot.rules.find(
    (candidate) => candidate.id === versioned.id && candidate.version === versioned.version,
  );
  if (found === undefined) {
    throw new Error(`Registry snapshot missing content ref ${refKey(versioned)}`);
  }
  return found;
}

export function buildInterpretationExecutionPlan(
  registry: ResolvedRuleRegistrySnapshot,
): InterpretationExecutionPlan {
  const rules = selectRules(registry);
  const edges = uniqueEdges([
    ...explicitDependencies(rules),
    ...claimDependencies(rules),
  ]);
  const staged = buildStages(rules, edges);
  const stages: ExecutionPlanStage[] = staged.map((stage, stageIndex) => ({
    stageIndex,
    ruleRefs: stage.refs.map((value) => contentRefFor(registry, value)),
  }));
  const orderedRuleRefs = stages.flatMap((stage) => stage.ruleRefs);

  const planMaterial = {
    registrySnapshotId: registry.snapshot.registrySnapshotId,
    packRef: registry.snapshot.packRef,
    orderedRuleRefs,
    dependencyEdges: edges,
    stages,
  };
  const planHash = deterministicContentHash(planMaterial);

  return {
    executionPlanId: `plan_${planHash.slice(0, 24)}`,
    registrySnapshotId: registry.snapshot.registrySnapshotId,
    packRef: registry.snapshot.packRef,
    orderedRuleRefs,
    dependencyEdges: edges,
    stages,
    planHash,
  };
}
