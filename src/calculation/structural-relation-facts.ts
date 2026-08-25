import { createHash } from 'node:crypto';
import { resolved, unavailable, type FactState } from '../contracts/common.js';
import type {
  CalculationScenario,
  CanonicalSajuSnapshot,
  PillarFact,
  StructuralRelationCandidate,
} from '../contracts/calculation.js';
import {
  STRUCTURAL_RELATION_DEFINITION_CONTENT_HASH,
  STRUCTURAL_RELATION_DERIVATION_VERSION,
  STRUCTURAL_RELATION_SOURCE_CATALOG,
  deriveStructuralRelationCandidates,
} from './structural-relations.js';

export const STRUCTURAL_RELATION_ENRICHED_CANONICAL_SCHEMA_VERSION = 'saju-canonical-v1.2' as const;
const STRUCTURAL_RELATION_INCOMPLETE_REASON = 'structural-relations-require-fully-resolved-four-pillars';

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

function resolvedPillar(state: CanonicalSajuSnapshot['pillars'][keyof CanonicalSajuSnapshot['pillars']]): PillarFact | undefined {
  return state.status === 'resolved' ? state.value : undefined;
}

function structuralRelationState(
  snapshot: CanonicalSajuSnapshot,
): FactState<readonly StructuralRelationCandidate[]> {
  const year = resolvedPillar(snapshot.pillars.year);
  const month = resolvedPillar(snapshot.pillars.month);
  const day = resolvedPillar(snapshot.pillars.day);
  const hour = resolvedPillar(snapshot.pillars.hour);

  if (year === undefined || month === undefined || day === undefined || hour === undefined) {
    return unavailable(STRUCTURAL_RELATION_INCOMPLETE_REASON);
  }

  return resolved(deriveStructuralRelationCandidates({ year, month, day, hour }));
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
  structuralRelations: FactState<readonly StructuralRelationCandidate[]>,
): CanonicalSajuSnapshot['completeness'] {
  const path = 'derivedFacts.structuralRelations';
  const resolvedPaths = new Set(snapshot.completeness.resolvedPaths);
  const ambiguousPaths = new Set(snapshot.completeness.ambiguousPaths);
  const unavailablePaths = new Set(snapshot.completeness.unavailablePaths);

  resolvedPaths.delete(path);
  ambiguousPaths.delete(path);
  unavailablePaths.delete(path);

  if (structuralRelations.status === 'resolved') resolvedPaths.add(path);
  else if (structuralRelations.status === 'ambiguous') ambiguousPaths.add(path);
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

export function enrichCanonicalStructuralRelations(
  snapshot: CanonicalSajuSnapshot,
): CanonicalSajuSnapshot {
  const structuralRelations = structuralRelationState(snapshot);
  const calculationHash = createHash('sha256')
    .update(
      stableSerialize({
        baseCalculationHash: snapshot.calculationHash,
        schemaVersion: STRUCTURAL_RELATION_ENRICHED_CANONICAL_SCHEMA_VERSION,
        structuralRelationDerivationVersion: STRUCTURAL_RELATION_DERIVATION_VERSION,
        structuralRelationDefinitionContentHash: STRUCTURAL_RELATION_DEFINITION_CONTENT_HASH,
      }),
    )
    .digest('hex');
  const snapshotId = `saju_${calculationHash.slice(0, 24)}`;
  const sourceIds = Object.values(STRUCTURAL_RELATION_SOURCE_CATALOG).map((source) => source.sourceId);
  const sourceUrls = Object.values(STRUCTURAL_RELATION_SOURCE_CATALOG).map((source) => source.url);
  const datasets = [
    ...(snapshot.provenance.datasets ?? []),
    {
      name: 'myeonghwa-structural-relation-candidates',
      version: STRUCTURAL_RELATION_DERIVATION_VERSION,
      source: STRUCTURAL_RELATION_SOURCE_CATALOG.yisiZhan.url,
      notes: `Structural matching only; no transformation or effect verdict. sourceIds=${sourceIds.join(',')} sourceUrls=${sourceUrls.join(',')} contentHash=${STRUCTURAL_RELATION_DEFINITION_CONTENT_HASH}`,
    },
  ];

  return {
    ...snapshot,
    snapshotId,
    schemaVersion: STRUCTURAL_RELATION_ENRICHED_CANONICAL_SCHEMA_VERSION,
    calculationHash,
    derivedFacts: { ...snapshot.derivedFacts, structuralRelations },
    scenarios: snapshot.scenarios.map((scenario, index) => rebindScenario(scenario, snapshotId, index)),
    completeness: enrichCompleteness(snapshot, structuralRelations),
    provenance: {
      ...snapshot.provenance,
      schema: {
        ...snapshot.provenance.schema,
        version: STRUCTURAL_RELATION_ENRICHED_CANONICAL_SCHEMA_VERSION,
      },
      datasets,
    },
  };
}
