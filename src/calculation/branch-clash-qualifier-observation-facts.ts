import { createHash } from 'node:crypto';
import { resolved, unavailable, type FactState } from '../contracts/common.js';
import type {
  BranchClashContextFact,
  BranchClashHiddenStemObservation,
  BranchClashQualifierObservationFact,
  BranchClashQualifierObservationIndex,
  CalculationScenario,
  CanonicalSajuSnapshot,
  HeavenlyStem,
  HiddenStemChartFact,
  PillarPairKey,
  PillarSlot,
} from '../contracts/calculation.js';

export const BRANCH_CLASH_QUALIFIER_OBSERVATION_VERSION =
  'myeonghwa-branch-clash-qualifier-observation-v1' as const;
export const BRANCH_CLASH_QUALIFIER_OBSERVATION_SCHEMA_VERSION =
  'saju-canonical-v1.4' as const;

const SLOT_ORDER = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];
const CONTEXT_UNRESOLVED_REASON = 'branch-clash-qualifier-observation-requires-resolved-clash-contexts';
const PILLAR_UNRESOLVED_REASON = 'branch-clash-qualifier-observation-requires-resolved-four-pillars';
const HIDDEN_STEM_UNRESOLVED_REASON =
  'branch-clash-qualifier-observation-requires-resolved-hidden-stems';

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

function allPillarsResolved(snapshot: CanonicalSajuSnapshot): boolean {
  return SLOT_ORDER.every((slot) => snapshot.pillars[slot].status === 'resolved');
}

function allHiddenStemsResolved(hiddenStems: HiddenStemChartFact): boolean {
  return SLOT_ORDER.every((slot) => hiddenStems[slot].status === 'resolved');
}

function visibleExactStemPositions(
  snapshot: CanonicalSajuSnapshot,
  stem: HeavenlyStem,
): readonly PillarSlot[] {
  return SLOT_ORDER.filter((slot) => {
    const pillar = snapshot.pillars[slot];
    return pillar.status === 'resolved' && pillar.value.stem.value === stem;
  });
}

function hiddenOccurrenceBranchPositions(
  hiddenStems: HiddenStemChartFact,
  stem: HeavenlyStem,
): readonly PillarSlot[] {
  return SLOT_ORDER.filter((slot) => {
    const state = hiddenStems[slot];
    return state.status === 'resolved' && state.value.includes(stem);
  });
}

function interveningPillars(left: PillarSlot, right: PillarSlot): readonly PillarSlot[] {
  const leftIndex = SLOT_ORDER.indexOf(left);
  const rightIndex = SLOT_ORDER.indexOf(right);
  const start = Math.min(leftIndex, rightIndex);
  const end = Math.max(leftIndex, rightIndex);
  return SLOT_ORDER.slice(start + 1, end);
}

function hiddenStemObservation(
  snapshot: CanonicalSajuSnapshot,
  hiddenStems: HiddenStemChartFact,
  stem: HeavenlyStem,
): BranchClashHiddenStemObservation {
  return {
    stem,
    visibleExactStemPositions: visibleExactStemPositions(snapshot, stem),
    hiddenOccurrenceBranchPositions: hiddenOccurrenceBranchPositions(hiddenStems, stem),
  };
}

function observationForContext(
  snapshot: CanonicalSajuSnapshot,
  hiddenStems: HiddenStemChartFact,
  context: BranchClashContextFact,
): BranchClashQualifierObservationFact {
  const [first, second] = context.participants;
  return {
    relationId: context.relationId,
    pairKey: context.pairKey,
    interveningPillars: interveningPillars(first.pillar, second.pillar),
    participants: [
      {
        pillar: first.pillar,
        branch: first.branch,
        hiddenStemObservations: first.hiddenStems.map((stem) =>
          hiddenStemObservation(snapshot, hiddenStems, stem),
        ),
      },
      {
        pillar: second.pillar,
        branch: second.branch,
        hiddenStemObservations: second.hiddenStems.map((stem) =>
          hiddenStemObservation(snapshot, hiddenStems, stem),
        ),
      },
    ],
    sourceFactRefs: [
      `derivedFacts.branchClashContexts.${context.pairKey}`,
      'pillars.year.stem',
      'pillars.month.stem',
      'pillars.day.stem',
      'pillars.hour.stem',
      'derivedFacts.hiddenStems.year',
      'derivedFacts.hiddenStems.month',
      'derivedFacts.hiddenStems.day',
      'derivedFacts.hiddenStems.hour',
    ],
    semantics: {
      observationOnly: true,
      visibilityEffectEstablished: false,
      separationEffectEstablished: false,
      pluralityEffectEstablished: false,
      numericWeightAssigned: false,
    },
  };
}

function observationState(
  snapshot: CanonicalSajuSnapshot,
): FactState<BranchClashQualifierObservationIndex> {
  const contexts = snapshot.derivedFacts.branchClashContexts;
  if (contexts === undefined || contexts.status !== 'resolved') {
    return unavailable(CONTEXT_UNRESOLVED_REASON);
  }
  if (!allPillarsResolved(snapshot)) return unavailable(PILLAR_UNRESOLVED_REASON);

  const hiddenStems = snapshot.derivedFacts.hiddenStems;
  if (hiddenStems === undefined || !allHiddenStemsResolved(hiddenStems)) {
    return unavailable(HIDDEN_STEM_UNRESOLVED_REASON);
  }

  const index: Partial<Record<PillarPairKey, BranchClashQualifierObservationFact>> = {};
  for (const pairKey of Object.keys(contexts.value) as PillarPairKey[]) {
    const context = contexts.value[pairKey];
    if (context === undefined) continue;
    index[pairKey] = observationForContext(snapshot, hiddenStems, context);
  }
  return resolved(Object.freeze(index));
}

function rebindScenario(
  scenario: CalculationScenario,
  snapshotId: string,
  index: number,
): CalculationScenario {
  return {
    ...scenario,
    scenarioId: `${snapshotId}:scenario:${index + 1}`,
    snapshotId,
  };
}

function enrichCompleteness(
  snapshot: CanonicalSajuSnapshot,
  observations: FactState<BranchClashQualifierObservationIndex>,
): CanonicalSajuSnapshot['completeness'] {
  const path = 'derivedFacts.branchClashQualifierObservations';
  const resolvedPaths = new Set(snapshot.completeness.resolvedPaths);
  const ambiguousPaths = new Set(snapshot.completeness.ambiguousPaths);
  const unavailablePaths = new Set(snapshot.completeness.unavailablePaths);

  resolvedPaths.delete(path);
  ambiguousPaths.delete(path);
  unavailablePaths.delete(path);

  if (observations.status === 'resolved') resolvedPaths.add(path);
  else if (observations.status === 'ambiguous') ambiguousPaths.add(path);
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

export function enrichCanonicalBranchClashQualifierObservations(
  snapshot: CanonicalSajuSnapshot,
): CanonicalSajuSnapshot {
  const observations = observationState(snapshot);
  const calculationHash = createHash('sha256')
    .update(
      stableSerialize({
        baseCalculationHash: snapshot.calculationHash,
        schemaVersion: BRANCH_CLASH_QUALIFIER_OBSERVATION_SCHEMA_VERSION,
        observationVersion: BRANCH_CLASH_QUALIFIER_OBSERVATION_VERSION,
      }),
    )
    .digest('hex');
  const snapshotId = `saju_${calculationHash.slice(0, 24)}`;

  return {
    ...snapshot,
    snapshotId,
    schemaVersion: BRANCH_CLASH_QUALIFIER_OBSERVATION_SCHEMA_VERSION,
    calculationHash,
    derivedFacts: {
      ...snapshot.derivedFacts,
      branchClashQualifierObservations: observations,
    },
    scenarios: snapshot.scenarios.map((scenario, index) => rebindScenario(scenario, snapshotId, index)),
    completeness: enrichCompleteness(snapshot, observations),
    provenance: {
      ...snapshot.provenance,
      schema: {
        ...snapshot.provenance.schema,
        version: BRANCH_CLASH_QUALIFIER_OBSERVATION_SCHEMA_VERSION,
      },
    },
  };
}
