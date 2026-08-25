import { createHash } from 'node:crypto';
import { resolved, unavailable, type FactState } from '../contracts/common.js';
import type {
  BranchClashContextFact,
  BranchClashContextIndex,
  CalculationScenario,
  CanonicalSajuSnapshot,
  HiddenStemChartFact,
  PillarPairKey,
  PillarSlot,
  StructuralRelationCandidate,
} from '../contracts/calculation.js';

export const BRANCH_CLASH_CONTEXT_PROJECTION_VERSION =
  'myeonghwa-branch-clash-context-projection-v1' as const;
export const BRANCH_CLASH_CONTEXT_ENRICHED_CANONICAL_SCHEMA_VERSION =
  'saju-canonical-v1.3' as const;

const INCOMPLETE_RELATION_REASON = 'branch-clash-context-requires-resolved-structural-relations';
const INCOMPLETE_HIDDEN_STEM_REASON = 'branch-clash-context-requires-resolved-participant-hidden-stems';
const SLOT_ORDER = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value === null || typeof value !== 'object') return value;
  const record = value as Record<string, unknown>;
  return Object.fromEntries(
    Object.keys(record)
      .sort()
      .filter((key) => record[key] !== undefined)
      .map((key) => [key, canonicalize(record[key])]),
  );
}

function stableSerialize(value: unknown): string {
  return JSON.stringify(canonicalize(value)) ?? 'undefined';
}

function pairKey(left: PillarSlot, right: PillarSlot): PillarPairKey {
  const ordered = [left, right].sort(
    (a, b) => SLOT_ORDER.indexOf(a) - SLOT_ORDER.indexOf(b),
  );
  const first = ordered[0];
  const second = ordered[1];
  if (first === undefined || second === undefined) {
    throw new Error('branch clash pair requires two pillar slots');
  }
  return `${first}_${second}` as PillarPairKey;
}

function resolvedHiddenStems(
  hiddenStems: HiddenStemChartFact,
  pillar: PillarSlot,
): readonly import('../contracts/calculation.js').HeavenlyStem[] | undefined {
  const state = hiddenStems[pillar];
  return state.status === 'resolved' ? state.value : undefined;
}

function branchClashContext(
  relation: StructuralRelationCandidate,
  hiddenStems: HiddenStemChartFact,
): BranchClashContextFact | undefined {
  if (relation.kind !== 'branch_clash') return undefined;
  if (relation.participants.length !== 2) {
    throw new Error(`branch clash ${relation.relationId} must have exactly two participants`);
  }

  const left = relation.participants[0];
  const right = relation.participants[1];
  if (
    left === undefined ||
    right === undefined ||
    left.component !== 'branch' ||
    right.component !== 'branch'
  ) {
    throw new Error(`branch clash ${relation.relationId} must contain branch participants only`);
  }

  const leftHidden = resolvedHiddenStems(hiddenStems, left.pillar);
  const rightHidden = resolvedHiddenStems(hiddenStems, right.pillar);
  if (leftHidden === undefined || rightHidden === undefined) return undefined;

  const key = pairKey(left.pillar, right.pillar);
  return {
    relationId: relation.relationId,
    kind: 'branch_clash',
    pairKey: key,
    participants: [
      {
        pillar: left.pillar,
        branch: left.value as import('../contracts/calculation.js').EarthlyBranch,
        hiddenStems: leftHidden,
      },
      {
        pillar: right.pillar,
        branch: right.value as import('../contracts/calculation.js').EarthlyBranch,
        hiddenStems: rightHidden,
      },
    ],
    sourceIds: relation.sourceIds,
    sourceFactRefs: [
      'derivedFacts.structuralRelations',
      `derivedFacts.hiddenStems.${left.pillar}`,
      `derivedFacts.hiddenStems.${right.pillar}`,
    ],
    semantics: relation.semantics,
  };
}

function contextState(snapshot: CanonicalSajuSnapshot): FactState<BranchClashContextIndex> {
  const relations = snapshot.derivedFacts.structuralRelations;
  if (relations === undefined || relations.status !== 'resolved') {
    return unavailable(INCOMPLETE_RELATION_REASON);
  }
  const hiddenStems = snapshot.derivedFacts.hiddenStems;
  if (hiddenStems === undefined) return unavailable(INCOMPLETE_HIDDEN_STEM_REASON);

  const index: Partial<Record<PillarPairKey, BranchClashContextFact>> = {};
  for (const relation of relations.value) {
    if (relation.kind !== 'branch_clash') continue;
    const context = branchClashContext(relation, hiddenStems);
    if (context === undefined) return unavailable(INCOMPLETE_HIDDEN_STEM_REASON);
    if (index[context.pairKey] !== undefined) {
      throw new Error(`duplicate branch clash context for pillar pair ${context.pairKey}`);
    }
    index[context.pairKey] = context;
  }
  return resolved(Object.freeze(index));
}

function rebindScenario(
  scenario: CalculationScenario,
  newSnapshotId: string,
  scenarioIndex: number,
): CalculationScenario {
  return {
    ...scenario,
    scenarioId: `${newSnapshotId}:scenario:${scenarioIndex + 1}`,
    snapshotId: newSnapshotId,
  };
}

function enrichCompleteness(
  snapshot: CanonicalSajuSnapshot,
  branchClashContexts: FactState<BranchClashContextIndex>,
): CanonicalSajuSnapshot['completeness'] {
  const path = 'derivedFacts.branchClashContexts';
  const resolvedPaths = new Set(snapshot.completeness.resolvedPaths);
  const ambiguousPaths = new Set(snapshot.completeness.ambiguousPaths);
  const unavailablePaths = new Set(snapshot.completeness.unavailablePaths);

  resolvedPaths.delete(path);
  ambiguousPaths.delete(path);
  unavailablePaths.delete(path);

  if (branchClashContexts.status === 'resolved') resolvedPaths.add(path);
  else if (branchClashContexts.status === 'ambiguous') ambiguousPaths.add(path);
  else unavailablePaths.add(path);

  return {
    ...snapshot.completeness,
    fullyResolved:
      snapshot.completeness.fullyResolved && unavailablePaths.size === 0 && ambiguousPaths.size === 0,
    resolvedPaths: [...resolvedPaths].sort(),
    ambiguousPaths: [...ambiguousPaths].sort(),
    unavailablePaths: [...unavailablePaths].sort(),
  };
}

export function enrichCanonicalBranchClashContexts(
  snapshot: CanonicalSajuSnapshot,
): CanonicalSajuSnapshot {
  const branchClashContexts = contextState(snapshot);
  const calculationHash = createHash('sha256')
    .update(
      stableSerialize({
        baseCalculationHash: snapshot.calculationHash,
        schemaVersion: BRANCH_CLASH_CONTEXT_ENRICHED_CANONICAL_SCHEMA_VERSION,
        branchClashContextProjectionVersion: BRANCH_CLASH_CONTEXT_PROJECTION_VERSION,
      }),
    )
    .digest('hex');
  const snapshotId = `saju_${calculationHash.slice(0, 24)}`;

  return {
    ...snapshot,
    snapshotId,
    schemaVersion: BRANCH_CLASH_CONTEXT_ENRICHED_CANONICAL_SCHEMA_VERSION,
    calculationHash,
    derivedFacts: { ...snapshot.derivedFacts, branchClashContexts },
    scenarios: snapshot.scenarios.map((scenario, index) => rebindScenario(scenario, snapshotId, index)),
    completeness: enrichCompleteness(snapshot, branchClashContexts),
    provenance: {
      ...snapshot.provenance,
      schema: {
        ...snapshot.provenance.schema,
        version: BRANCH_CLASH_CONTEXT_ENRICHED_CANONICAL_SCHEMA_VERSION,
      },
    },
  };
}
