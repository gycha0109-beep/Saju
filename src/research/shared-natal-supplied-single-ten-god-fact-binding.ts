import { createHash } from 'node:crypto';
import type { FactState } from '../contracts/common.js';
import type {
  CanonicalSajuSnapshot,
  TenGod,
} from '../contracts/calculation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW } from './general-natal-geju-source-example-canonical-input-binding-review.js';

export const SHARED_NATAL_SUPPLIED_SINGLE_TEN_GOD_FACT_BINDING_VERSION =
  '0.1.0-research' as const;

export const SHARED_NATAL_SUPPLIED_SINGLE_TEN_GOD_SOURCE_FACT_REFS = Object.freeze([
  'derivedFacts.tenGods.year.stem',
  'derivedFacts.tenGods.month.stem',
  'derivedFacts.tenGods.hour.stem',
] as const);

export type SharedNatalSuppliedSingleTenGodSourceFactRef =
  (typeof SHARED_NATAL_SUPPLIED_SINGLE_TEN_GOD_SOURCE_FACT_REFS)[number];

export interface SharedNatalSuppliedSingleTenGodFactBindingInput {
  readonly sourceFactRef: SharedNatalSuppliedSingleTenGodSourceFactRef;
  readonly fact: FactState<TenGod>;
}

export interface SharedNatalSuppliedSingleTenGodFactBinding {
  readonly snapshotId: string;
  readonly sourceFactRef: SharedNatalSuppliedSingleTenGodSourceFactRef;
  readonly fact: FactState<TenGod>;
  readonly authority: 'structural_provenance_only';
}

export type SharedNatalSuppliedSingleTenGodFactBindingUnavailableReason =
  | 'single-canonical-ten-god-binding-ten-god-chart-unresolved'
  | 'single-canonical-ten-god-binding-source-fact-missing'
  | 'single-canonical-ten-god-binding-source-fact-not-ten-god'
  | 'single-canonical-ten-god-binding-supplied-fact-mismatch';

export type SharedNatalSuppliedSingleTenGodFactBindingResult =
  | {
      readonly status: 'resolved';
      readonly binding: SharedNatalSuppliedSingleTenGodFactBinding;
    }
  | {
      readonly status: 'unavailable';
      readonly reasonCode: SharedNatalSuppliedSingleTenGodFactBindingUnavailableReason;
    };

const TEN_GODS = Object.freeze([
  '비견',
  '겁재',
  '식신',
  '상관',
  '편재',
  '정재',
  '편관',
  '정관',
  '편인',
  '정인',
] as const satisfies readonly TenGod[]);

export function isSharedNatalSuppliedSingleTenGodSourceFactRef(
  value: unknown,
): value is SharedNatalSuppliedSingleTenGodSourceFactRef {
  return (
    value === 'derivedFacts.tenGods.year.stem' ||
    value === 'derivedFacts.tenGods.month.stem' ||
    value === 'derivedFacts.tenGods.hour.stem'
  );
}

function isTenGod(value: unknown): value is TenGod {
  return TEN_GODS.some((candidate) => candidate === value);
}

function exactFactFromSnapshot(
  snapshot: CanonicalSajuSnapshot,
  sourceFactRef: SharedNatalSuppliedSingleTenGodSourceFactRef,
): FactState<TenGod> | null | undefined {
  if (snapshot.derivedFacts.tenGods.status !== 'resolved') return null;

  const chart = snapshot.derivedFacts.tenGods.value;
  const rawFact =
    sourceFactRef === 'derivedFacts.tenGods.year.stem'
      ? chart.year.stem
      : sourceFactRef === 'derivedFacts.tenGods.month.stem'
        ? chart.month.stem
        : chart.hour.stem;

  if (rawFact === undefined) return undefined;

  if (rawFact.status === 'resolved') {
    return isTenGod(rawFact.value)
      ? (rawFact as FactState<TenGod>)
      : null;
  }

  if (rawFact.status === 'ambiguous') {
    return rawFact.candidates.every((candidate) => isTenGod(candidate.value))
      ? (rawFact as FactState<TenGod>)
      : null;
  }

  return rawFact;
}

export function bindSuppliedSingleCanonicalTenGodFactToSnapshot(
  snapshot: CanonicalSajuSnapshot,
  input: SharedNatalSuppliedSingleTenGodFactBindingInput,
): SharedNatalSuppliedSingleTenGodFactBindingResult {
  if (snapshot.derivedFacts.tenGods.status !== 'resolved') {
    return {
      status: 'unavailable',
      reasonCode: 'single-canonical-ten-god-binding-ten-god-chart-unresolved',
    };
  }

  const exactFact = exactFactFromSnapshot(snapshot, input.sourceFactRef);

  if (exactFact === undefined) {
    return {
      status: 'unavailable',
      reasonCode: 'single-canonical-ten-god-binding-source-fact-missing',
    };
  }

  if (exactFact === null) {
    return {
      status: 'unavailable',
      reasonCode: 'single-canonical-ten-god-binding-source-fact-not-ten-god',
    };
  }

  if (deterministicContentHash(exactFact) !== deterministicContentHash(input.fact)) {
    return {
      status: 'unavailable',
      reasonCode: 'single-canonical-ten-god-binding-supplied-fact-mismatch',
    };
  }

  return {
    status: 'resolved',
    binding: Object.freeze({
      snapshotId: snapshot.snapshotId,
      sourceFactRef: input.sourceFactRef,
      fact: exactFact,
      authority: 'structural_provenance_only',
    }),
  };
}

const canonicalTenGodRawPathGoverned =
  GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW.governedRawFactPaths.includes(
    'derivedFacts.tenGods',
  );

export const SHARED_NATAL_SUPPLIED_SINGLE_TEN_GOD_FACT_BINDING_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version: SHARED_NATAL_SUPPLIED_SINGLE_TEN_GOD_FACT_BINDING_VERSION,
        sourceFactRefs: SHARED_NATAL_SUPPLIED_SINGLE_TEN_GOD_SOURCE_FACT_REFS,
        canonicalTenGodRawPathGoverned,
        callerSuppliedFactRequired: true,
        callerSuppliedSourceFactRefRequired: true,
        sourceFactRefUsedForStructuralProvenanceOnly: true,
        sourceFactRefSelectionPolicyAuthorized: false,
        sourceFactRefSemanticWeightAuthorized: false,
        wholeChartTenGodScanAuthorized: false,
        tenGodRecomputationAuthorized: false,
        interpretationAuthorized: false,
        productionFactEmissionAuthorized: false,
      }),
    )
    .digest('hex');

export const SHARED_NATAL_SUPPLIED_SINGLE_TEN_GOD_FACT_BINDING_AUTHORITY =
  Object.freeze({
    version: SHARED_NATAL_SUPPLIED_SINGLE_TEN_GOD_FACT_BINDING_VERSION,
    definitionHash:
      SHARED_NATAL_SUPPLIED_SINGLE_TEN_GOD_FACT_BINDING_DEFINITION_HASH,
    canonicalTenGodRawPathGoverned,
    sourceFactRefs: SHARED_NATAL_SUPPLIED_SINGLE_TEN_GOD_SOURCE_FACT_REFS,
    callerSuppliedFactRequired: true as const,
    callerSuppliedSourceFactRefRequired: true as const,
    sourceFactRefUsedForStructuralProvenanceOnly: true as const,
    sourceFactRefSelectionPolicyAuthorized: false as const,
    sourceFactRefSemanticWeightAuthorized: false as const,
    wholeChartTenGodScanAuthorized: false as const,
    tenGodRecomputationAuthorized: false as const,
    interpretationAuthorized: false as const,
    productionFactEmissionAuthorized: false as const,
    authorityBoundary:
      'This prerequisite binds one already-supplied canonical FactState<TenGod> to one exact caller-supplied canonical source fact reference and verifies byte-equivalent structural provenance against the bound snapshot. It does not choose a pillar, search for a Ten-God, assign position meaning or weight, scan the chart, recompute Ten-Gods, interpret the fact, or create Production authority.',
  });

