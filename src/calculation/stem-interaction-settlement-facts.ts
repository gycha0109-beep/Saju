import { createHash } from 'node:crypto';
import { resolved, unavailable, type FactState } from '../contracts/common.js';
import type {
  CalculationScenario,
  CanonicalSajuSnapshot,
  PillarSlot,
  StemInteractionSettlementFact,
} from '../contracts/calculation.js';
import {
  deriveAdoptedStemInteractionSettlements,
  STEM_FIVE_COMBINATION_SETTLEMENT_POLICY,
  STEM_FIVE_COMBINATION_SETTLEMENT_POLICY_CONTENT_HASH,
  STEM_THIRD_PARTY_INTERFERENCE_POLICY,
  STEM_THIRD_PARTY_INTERFERENCE_POLICY_CONTENT_HASH,
  type VisibleStemInteractionSubject,
} from './stem-interaction-settlement.js';

export const STEM_INTERACTION_SETTLEMENT_DERIVATION_VERSION =
  'myeongha-stem-interaction-settlement-v3' as const;
export const STEM_INTERACTION_SETTLEMENT_SCHEMA_VERSION =
  'saju-canonical-v1.7' as const;

const RELATIONS_UNRESOLVED_REASON =
  'stem-interaction-settlement-requires-resolved-structural-relations';
const TEN_GODS_UNRESOLVED_REASON =
  'stem-interaction-settlement-requires-resolved-ten-gods';
const DAY_MASTER_UNRESOLVED_REASON =
  'stem-interaction-settlement-requires-resolved-day-master';
const PILLARS_UNRESOLVED_REASON =
  'stem-interaction-settlement-requires-resolved-visible-stems';

const VISIBLE_NON_DAY_SLOTS = ['year', 'month', 'hour'] as const satisfies readonly PillarSlot[];

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

function visibleStemSubjects(
  snapshot: CanonicalSajuSnapshot,
): readonly VisibleStemInteractionSubject[] | undefined {
  const result: VisibleStemInteractionSubject[] = [];

  for (const slot of VISIBLE_NON_DAY_SLOTS) {
    const state = snapshot.pillars[slot];
    if (state.status !== 'resolved') return undefined;
    result.push({
      pillar: slot,
      stem: state.value.stem.value,
      element: state.value.stem.element,
    });
  }

  return result;
}

function settlementState(
  snapshot: CanonicalSajuSnapshot,
): FactState<readonly StemInteractionSettlementFact[]> {
  const relations = snapshot.derivedFacts.structuralRelations;
  if (relations === undefined || relations.status !== 'resolved') {
    return unavailable(RELATIONS_UNRESOLVED_REASON);
  }

  const tenGods = snapshot.derivedFacts.tenGods;
  if (tenGods.status !== 'resolved') {
    return unavailable(TEN_GODS_UNRESOLVED_REASON);
  }

  const dayMaster = snapshot.derivedFacts.dayMaster;
  if (dayMaster.status !== 'resolved') {
    return unavailable(DAY_MASTER_UNRESOLVED_REASON);
  }

  const visibleStems = visibleStemSubjects(snapshot);
  if (visibleStems === undefined) {
    return unavailable(PILLARS_UNRESOLVED_REASON);
  }

  return resolved(
    deriveAdoptedStemInteractionSettlements(
      relations.value,
      tenGods.value,
      dayMaster.value.value,
      visibleStems,
    ),
  );
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
  settlements: FactState<readonly StemInteractionSettlementFact[]>,
): CanonicalSajuSnapshot['completeness'] {
  const path = 'derivedFacts.stemInteractionSettlements';
  const resolvedPaths = new Set(snapshot.completeness.resolvedPaths);
  const ambiguousPaths = new Set(snapshot.completeness.ambiguousPaths);
  const unavailablePaths = new Set(snapshot.completeness.unavailablePaths);

  resolvedPaths.delete(path);
  ambiguousPaths.delete(path);
  unavailablePaths.delete(path);

  if (settlements.status === 'resolved') resolvedPaths.add(path);
  else if (settlements.status === 'ambiguous') ambiguousPaths.add(path);
  else unavailablePaths.add(path);

  return {
    ...snapshot.completeness,
    fullyResolved:
      snapshot.completeness.fullyResolved &&
      unavailablePaths.size === 0 &&
      ambiguousPaths.size === 0,
    resolvedPaths: [...resolvedPaths].sort(),
    ambiguousPaths: [...ambiguousPaths].sort(),
    unavailablePaths: [...unavailablePaths].sort(),
  };
}

export function enrichCanonicalStemInteractionSettlements(
  snapshot: CanonicalSajuSnapshot,
): CanonicalSajuSnapshot {
  const settlements = settlementState(snapshot);
  const calculationHash = createHash('sha256')
    .update(
      stableSerialize({
        baseCalculationHash: snapshot.calculationHash,
        schemaVersion: STEM_INTERACTION_SETTLEMENT_SCHEMA_VERSION,
        settlementDerivationVersion: STEM_INTERACTION_SETTLEMENT_DERIVATION_VERSION,
        pairPolicyContentHash: STEM_FIVE_COMBINATION_SETTLEMENT_POLICY_CONTENT_HASH,
        networkPolicyContentHash: STEM_THIRD_PARTY_INTERFERENCE_POLICY_CONTENT_HASH,
      }),
    )
    .digest('hex');
  const snapshotId = `saju_${calculationHash.slice(0, 24)}`;

  const datasets = [
    ...(snapshot.provenance.datasets ?? []),
    {
      name: 'myeongha-stem-five-combination-settlement-policy',
      version: STEM_FIVE_COMBINATION_SETTLEMENT_POLICY.policyVersion,
      source: 'docs/decisions/ADR-0008-stem-five-combination-settlement-v1.md',
      notes:
        `MyeongHa V1 product convention; policyId=${STEM_FIVE_COMBINATION_SETTLEMENT_POLICY.policyId} contentHash=${STEM_FIVE_COMBINATION_SETTLEMENT_POLICY_CONTENT_HASH}; extends=GH-2219`,
    },
    {
      name: 'myeongha-stem-third-party-interference-policy',
      version: STEM_THIRD_PARTY_INTERFERENCE_POLICY.policyVersion,
      source: 'docs/decisions/ADR-0009-stem-third-party-interference-v1.md',
      notes:
        `MyeongHa V1 product convention; policyId=${STEM_THIRD_PARTY_INTERFERENCE_POLICY.policyId} contentHash=${STEM_THIRD_PARTY_INTERFERENCE_POLICY_CONTENT_HASH}; extends=GH-2230`,
    },
  ];

  return {
    ...snapshot,
    snapshotId,
    schemaVersion: STEM_INTERACTION_SETTLEMENT_SCHEMA_VERSION,
    calculationHash,
    derivedFacts: {
      ...snapshot.derivedFacts,
      stemInteractionSettlements: settlements,
    },
    scenarios: snapshot.scenarios.map((scenario, index) =>
      rebindScenario(scenario, snapshotId, index),
    ),
    completeness: enrichCompleteness(snapshot, settlements),
    provenance: {
      ...snapshot.provenance,
      schema: {
        ...snapshot.provenance.schema,
        version: STEM_INTERACTION_SETTLEMENT_SCHEMA_VERSION,
      },
      datasets,
    },
  };
}
