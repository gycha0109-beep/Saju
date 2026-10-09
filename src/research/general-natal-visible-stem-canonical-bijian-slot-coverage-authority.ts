import { createHash } from 'node:crypto';

import type { FactState, ResolvedFact } from '../contracts/common.js';
import type { TenGod, TenGodChartFact } from '../contracts/calculation.js';
import {
  bindVisibleBijianCountToBoundedLeftOperand,
  GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_AUTHORITY,
} from './general-natal-bijian-bounded-left-operand-authority.js';

export const GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_VERSION =
  '0.1.0-research' as const;

export const GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_SCOPE =
  'resolved_canonical_year_month_hour_stem_exact_bijian_slot_coverage' as const;

export const GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export const GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_SLOTS =
  Object.freeze(['year', 'month', 'hour'] as const);

export type VisibleStemCanonicalBijianCoverageSlot =
  (typeof GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_SLOTS)[number];

export type VisibleStemCanonicalBijianSourceFactRef =
  | 'derivedFacts.tenGods.year.stem'
  | 'derivedFacts.tenGods.month.stem'
  | 'derivedFacts.tenGods.hour.stem';

export interface VisibleStemCanonicalBijianSlotEvaluation {
  readonly slot: VisibleStemCanonicalBijianCoverageSlot;
  readonly sourceFactRef: VisibleStemCanonicalBijianSourceFactRef;
  readonly canonicalTenGod: TenGod;
  readonly exactBijianObserved: boolean;
  readonly authority: 'research_only';
}

export type VisibleStemCanonicalBijianSlotCoverageState =
  | 'visible_stem_bijian_slot_coverage_resolved'
  | 'ten_god_chart_unresolved'
  | 'visible_stem_facts_not_fully_resolved'
  | 'day_stem_semantic_mismatch'
  | 'r7_bounded_count_parity_unresolved';

export interface VisibleStemCanonicalBijianSlotCoverageEvaluation {
  readonly state: VisibleStemCanonicalBijianSlotCoverageState;
  readonly slots: Readonly<{
    year: VisibleStemCanonicalBijianSlotEvaluation;
    month: VisibleStemCanonicalBijianSlotEvaluation;
    hour: VisibleStemCanonicalBijianSlotEvaluation;
  }> | null;
  readonly visibleStemBijianObserved: boolean;
  readonly r7BoundedCountParityVerified: boolean;
  readonly authority: 'research_only';
}

function isResolvedCanonicalTenGodStem(
  fact: FactState<TenGod | '일간'> | undefined,
): fact is ResolvedFact<TenGod> {
  return fact?.status === 'resolved' && fact.value !== '일간';
}

function sourceFactRefForSlot(
  slot: VisibleStemCanonicalBijianCoverageSlot,
): VisibleStemCanonicalBijianSourceFactRef {
  if (slot === 'year') return 'derivedFacts.tenGods.year.stem';
  if (slot === 'month') return 'derivedFacts.tenGods.month.stem';
  return 'derivedFacts.tenGods.hour.stem';
}

function evaluateSlot(
  slot: VisibleStemCanonicalBijianCoverageSlot,
  fact: ResolvedFact<TenGod>,
): VisibleStemCanonicalBijianSlotEvaluation {
  return Object.freeze({
    slot,
    sourceFactRef: sourceFactRefForSlot(slot),
    canonicalTenGod: fact.value,
    exactBijianObserved: fact.value === '비견',
    authority: 'research_only',
  });
}

export function evaluateVisibleStemCanonicalBijianSlotCoverage(
  tenGods: FactState<TenGodChartFact>,
): VisibleStemCanonicalBijianSlotCoverageEvaluation {
  if (tenGods.status !== 'resolved') {
    return Object.freeze({
      state: 'ten_god_chart_unresolved',
      slots: null,
      visibleStemBijianObserved: false,
      r7BoundedCountParityVerified: false,
      authority: 'research_only',
    });
  }

  const { year, month, day, hour } = tenGods.value;

  if (
    !isResolvedCanonicalTenGodStem(year.stem) ||
    !isResolvedCanonicalTenGodStem(month.stem) ||
    day.stem?.status !== 'resolved' ||
    !isResolvedCanonicalTenGodStem(hour.stem)
  ) {
    return Object.freeze({
      state: 'visible_stem_facts_not_fully_resolved',
      slots: null,
      visibleStemBijianObserved: false,
      r7BoundedCountParityVerified: false,
      authority: 'research_only',
    });
  }

  if (day.stem.value !== '일간') {
    return Object.freeze({
      state: 'day_stem_semantic_mismatch',
      slots: null,
      visibleStemBijianObserved: false,
      r7BoundedCountParityVerified: false,
      authority: 'research_only',
    });
  }

  const slots = Object.freeze({
    year: evaluateSlot('year', year.stem),
    month: evaluateSlot('month', month.stem),
    hour: evaluateSlot('hour', hour.stem),
  });

  const observedCardinality = [
    slots.year,
    slots.month,
    slots.hour,
  ].filter((slot) => slot.exactBijianObserved).length;

  const r7 = bindVisibleBijianCountToBoundedLeftOperand(tenGods);
  const r7ParityVerified =
    (
      observedCardinality === 0 &&
      r7.state === 'no_bounded_peer_stem_operand' &&
      r7.peerStemCount === 0
    ) ||
    (
      observedCardinality > 0 &&
      r7.state === 'bounded_peer_stem_count_established' &&
      r7.peerStemCount === observedCardinality
    );

  if (!r7ParityVerified) {
    return Object.freeze({
      state: 'r7_bounded_count_parity_unresolved',
      slots: null,
      visibleStemBijianObserved: false,
      r7BoundedCountParityVerified: false,
      authority: 'research_only',
    });
  }

  return Object.freeze({
    state: 'visible_stem_bijian_slot_coverage_resolved',
    slots,
    visibleStemBijianObserved:
      slots.year.exactBijianObserved ||
      slots.month.exactBijianObserved ||
      slots.hour.exactBijianObserved,
    r7BoundedCountParityVerified: true,
    authority: 'research_only',
  });
}

export const GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_UNAUTHORIZED_DERIVATIONS =
  Object.freeze([
    'slot_coverage_to_new_bijian_count_semantics',
    'slot_coverage_to_per_slot_support_constituent',
    'slot_coverage_to_bijian_gyeopjae_union',
    'slot_coverage_to_unified_bijie_count',
    'slot_coverage_to_complete_bijie_collection',
    'branch_ten_god_scan',
    'hidden_stem_ten_god_scan',
    'absence_of_visible_bijian_to_universal_non_bijie_verdict',
    'visible_bijian_presence_to_dang_zhong',
    'visible_bijian_absence_to_zhu_gua',
    'support_constituent_to_qiang_or_ruo',
    'support_constituent_to_final_qiang_ruo',
    'support_constituent_to_final_wang_shuai',
    'support_constituent_to_numeric_strength',
    'support_constituent_to_geju_candidate',
    'support_constituent_to_geju_establishment',
    'support_constituent_to_narrative_materiality',
    'support_constituent_to_production_fact',
  ] as const);

export const GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version:
          GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_VERSION,
        scope:
          GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_SCOPE,
        decision:
          GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_DECISION,
        slots:
          GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_SLOTS,
        upstreamR7Version:
          GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_AUTHORITY.version,
        upstreamR7DefinitionHash:
          GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_AUTHORITY.definitionHash,
        exactBijianOnly: true,
        daySelfMarkerRequired: true,
        sourceSlotIdentityPreserved: true,
        r7BoundedCountParityRequired: true,
        newBijianCountSemanticsAuthorized: false,
        perSlotSupportConstituentAuthorized: false,
        bijianGyeopjaeUnionAuthorized: false,
        unifiedBijieCountAuthorized: false,
        completeBijieCollectionAuthorized: false,
        branchTenGodScanAuthorized: false,
        hiddenStemTenGodScanAuthorized: false,
        unauthorizedDerivations:
          GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_UNAUTHORIZED_DERIVATIONS,
        productionFactEmissionAuthorized: false,
      }),
    )
    .digest('hex');

export const GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_AUTHORITY =
  Object.freeze({
    version:
      GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_VERSION,
    definitionHash:
      GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_DEFINITION_HASH,
    decision:
      GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_DECISION,
    slots:
      GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_SLOTS,
    upstreamR7Version:
      GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_AUTHORITY.version,
    upstreamR7DefinitionHash:
      GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_AUTHORITY.definitionHash,
    canonicalTenGodInputRequired: true as const,
    allVisibleStemFactsMustResolve: true as const,
    daySelfMarkerRequired: true as const,
    fixedVisibleStemCoverageAuthorizedResearchOnly: true as const,
    sourceSlotIdentityPreserved: true as const,
    exactBijianOnly: true as const,
    visibleStemBijianPresenceAuthorized: true as const,
    r7BoundedCountParityRequired: true as const,
    r7BoundedCountReinterpreted: false as const,
    newBijianCountSemanticsAuthorized: false as const,
    perSlotSupportConstituentAuthorized: false as const,
    resolvedOtherTenGodUniversalNonBijieVerdictAuthorized: false as const,
    bijianGyeopjaeUnionAuthorized: false as const,
    unifiedBijieCountAuthorized: false as const,
    completeBijieCollectionAuthorized: false as const,
    branchTenGodScanAuthorized: false as const,
    hiddenStemTenGodScanAuthorized: false as const,
    supportAggregationAuthorized: false as const,
    dangZhongCounterAuthorized: false as const,
    dangZhongThresholdAuthorized: false as const,
    dangZhongBooleanResolverAuthorized: false as const,
    zhuGuaBooleanResolverAuthorized: false as const,
    chartLevelQiangRuoClassifierAuthorized: false as const,
    chartLevelWangShuaiClassifierAuthorized: false as const,
    numericStrengthAuthorized: false as const,
    gyeokgukDerivationAuthorized: false as const,
    narrativeMaterialityAuthorized: false as const,
    productionFactEmissionAuthorized: false as const,
    externalHumanDomainReviewRequired: false as const,
    unauthorizedDerivations:
      GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_UNAUTHORIZED_DERIVATIONS,
    authorityBoundary:
      'This authority materializes only fixed year/month/hour slot provenance for exact canonical 比肩 visible-stem facts. It uses the existing R7 bounded count only as a parity guard and does not reinterpret or replace that count. It creates no per-slot support-constituent meaning, no new count semantics, no 比肩+겁재 union, no complete 比劫 collection, no branch/hidden coverage, no 黨眾/助寡 settlement, no 強弱/旺衰 or 格局 classifier, no narrative materiality, and no Production authority.',
  });
