import { createHash } from 'node:crypto';
import type { FactState } from '../contracts/common.js';
import type { TenGod, TenGodChartFact } from '../contracts/calculation.js';
import {
  bindVisibleBijianCountToBoundedLeftOperand,
} from './general-natal-bijian-bounded-left-operand-authority.js';
import {
  bindGovernedVisibleBijianToDangZhongSupportConstituent,
  GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_AUTHORITY,
} from './general-natal-visible-bijian-dang-zhong-constituent-authority.js';
import {
  evaluateVisibleStemCanonicalBijianSlotCoverage,
  GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_AUTHORITY,
  type VisibleStemCanonicalBijianSlotEvaluation,
} from './general-natal-visible-stem-canonical-bijian-slot-coverage-authority.js';
import {
  SAJU_R20_BIJIE_SUPPORT_PARITY_REAUDIT_AUTHORITY,
} from './saju-r20-bijie-support-parity-reaudit.js';

export const GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_VERSION =
  '0.1.0-research' as const;

export const GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_SCOPE =
  'exact_visible_stem_bijian_slot_to_bijie_support_constituent_binding' as const;

export const GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export const GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_SLOTS =
  Object.freeze(['year', 'month', 'hour'] as const);

export type VisibleStemBijianSlotSupportSlot =
  (typeof GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_SLOTS)[number];

export type VisibleStemBijianSlotSupportSourceFactRef =
  | 'derivedFacts.tenGods.year.stem'
  | 'derivedFacts.tenGods.month.stem'
  | 'derivedFacts.tenGods.hour.stem';

export interface VisibleStemBijianSlotSupportEvaluation {
  readonly slot: VisibleStemBijianSlotSupportSlot;
  readonly sourceFactRef: VisibleStemBijianSlotSupportSourceFactRef;
  readonly canonicalTenGod: TenGod;
  readonly exactBijianObserved: boolean;
  readonly supportConstituentObserved: boolean;
  readonly canonicalConstituent: '비견' | null;
  readonly sourceSupportCategory: '比劫' | null;
  readonly authority: 'research_only';
}

export type VisibleStemBijianSlotSupportState =
  | 'visible_stem_bijian_slot_support_resolved'
  | 'ten_god_chart_unresolved'
  | 'visible_stem_facts_not_fully_resolved'
  | 'day_stem_semantic_mismatch'
  | 'r17_slot_coverage_parity_unresolved'
  | 'upstream_chart_support_parity_unresolved';

export interface VisibleStemBijianSlotSupportResult {
  readonly state: VisibleStemBijianSlotSupportState;
  readonly slots: Readonly<{
    year: VisibleStemBijianSlotSupportEvaluation;
    month: VisibleStemBijianSlotSupportEvaluation;
    hour: VisibleStemBijianSlotSupportEvaluation;
  }> | null;
  readonly visibleStemBijianSupportObserved: boolean;
  readonly upstreamChartSupportParityVerified: boolean;
  readonly authority: 'research_only';
}

function bindSlot(
  slot: VisibleStemBijianSlotSupportSlot,
  upstream: VisibleStemCanonicalBijianSlotEvaluation,
): VisibleStemBijianSlotSupportEvaluation | null {
  if (
    upstream.slot !== slot ||
    upstream.sourceFactRef !== `derivedFacts.tenGods.${slot}.stem` ||
    upstream.exactBijianObserved !== (upstream.canonicalTenGod === '비견')
  ) {
    return null;
  }

  if (upstream.exactBijianObserved) {
    return Object.freeze({
      slot,
      sourceFactRef: upstream.sourceFactRef,
      canonicalTenGod: upstream.canonicalTenGod,
      exactBijianObserved: true,
      supportConstituentObserved: true,
      canonicalConstituent: '비견',
      sourceSupportCategory: '比劫',
      authority: 'research_only',
    });
  }

  return Object.freeze({
    slot,
    sourceFactRef: upstream.sourceFactRef,
    canonicalTenGod: upstream.canonicalTenGod,
    exactBijianObserved: false,
    supportConstituentObserved: false,
    canonicalConstituent: null,
    sourceSupportCategory: null,
    authority: 'research_only',
  });
}

export function evaluateVisibleStemBijianSlotSupportConstituents(
  tenGods: FactState<TenGodChartFact>,
): VisibleStemBijianSlotSupportResult {
  const slotCoverage = evaluateVisibleStemCanonicalBijianSlotCoverage(tenGods);

  if (slotCoverage.state === 'ten_god_chart_unresolved') {
    return Object.freeze({
      state: 'ten_god_chart_unresolved',
      slots: null,
      visibleStemBijianSupportObserved: false,
      upstreamChartSupportParityVerified: false,
      authority: 'research_only',
    });
  }

  if (slotCoverage.state === 'visible_stem_facts_not_fully_resolved') {
    return Object.freeze({
      state: 'visible_stem_facts_not_fully_resolved',
      slots: null,
      visibleStemBijianSupportObserved: false,
      upstreamChartSupportParityVerified: false,
      authority: 'research_only',
    });
  }

  if (slotCoverage.state === 'day_stem_semantic_mismatch') {
    return Object.freeze({
      state: 'day_stem_semantic_mismatch',
      slots: null,
      visibleStemBijianSupportObserved: false,
      upstreamChartSupportParityVerified: false,
      authority: 'research_only',
    });
  }

  if (
    slotCoverage.state !== 'visible_stem_bijian_slot_coverage_resolved' ||
    slotCoverage.slots === null ||
    slotCoverage.r7BoundedCountParityVerified !== true
  ) {
    return Object.freeze({
      state: 'r17_slot_coverage_parity_unresolved',
      slots: null,
      visibleStemBijianSupportObserved: false,
      upstreamChartSupportParityVerified: false,
      authority: 'research_only',
    });
  }

  const chartSupport =
    bindGovernedVisibleBijianToDangZhongSupportConstituent(
      bindVisibleBijianCountToBoundedLeftOperand(tenGods),
    );

  const expectedPositive = slotCoverage.visibleStemBijianObserved;
  const chartSupportPositive =
    chartSupport.state === 'visible_bijian_support_constituent_observed' &&
    chartSupport.supportConstituentObserved === true &&
    chartSupport.canonicalConstituent === '비견' &&
    chartSupport.sourceSupportCategory === '比劫';

  const chartSupportNegative =
    chartSupport.state === 'no_visible_bijian_support_constituent' &&
    chartSupport.supportConstituentObserved === false &&
    chartSupport.canonicalConstituent === null &&
    chartSupport.sourceSupportCategory === null;

  if (
    (expectedPositive && !chartSupportPositive) ||
    (!expectedPositive && !chartSupportNegative)
  ) {
    return Object.freeze({
      state: 'upstream_chart_support_parity_unresolved',
      slots: null,
      visibleStemBijianSupportObserved: false,
      upstreamChartSupportParityVerified: false,
      authority: 'research_only',
    });
  }

  const year = bindSlot('year', slotCoverage.slots.year);
  const month = bindSlot('month', slotCoverage.slots.month);
  const hour = bindSlot('hour', slotCoverage.slots.hour);

  if (year === null || month === null || hour === null) {
    return Object.freeze({
      state: 'r17_slot_coverage_parity_unresolved',
      slots: null,
      visibleStemBijianSupportObserved: false,
      upstreamChartSupportParityVerified: false,
      authority: 'research_only',
    });
  }

  const slots = Object.freeze({ year, month, hour });

  return Object.freeze({
    state: 'visible_stem_bijian_slot_support_resolved',
    slots,
    visibleStemBijianSupportObserved:
      year.supportConstituentObserved ||
      month.supportConstituentObserved ||
      hour.supportConstituentObserved,
    upstreamChartSupportParityVerified: true,
    authority: 'research_only',
  });
}

export const GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_UNAUTHORIZED_DERIVATIONS =
  Object.freeze([
    'slot_support_to_new_bijian_count',
    'slot_support_to_gyeopjae_count',
    'slot_support_to_unified_bijie_count',
    'slot_support_to_visible_bijie_support_union',
    'slot_support_to_complete_bijie_collection',
    'branch_ten_god_scan',
    'hidden_stem_ten_god_scan',
    'absence_of_visible_bijian_support_to_universal_non_bijie_verdict',
    'slot_support_to_support_aggregation',
    'slot_support_to_dang_zhong',
    'slot_support_to_zhu_gua',
    'slot_support_to_qiang_or_ruo',
    'slot_support_to_final_qiang_ruo',
    'slot_support_to_final_wang_shuai',
    'slot_support_to_numeric_strength',
    'slot_support_to_geju_candidate',
    'slot_support_to_geju_establishment',
    'slot_support_to_narrative_materiality',
    'slot_support_to_production_fact',
  ] as const);

export const GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version:
          GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_VERSION,
        scope:
          GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_SCOPE,
        decision:
          GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_DECISION,
        slots:
          GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_SLOTS,
        upstreamR17Version:
          GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_AUTHORITY
            .version,
        upstreamR17DefinitionHash:
          GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_AUTHORITY
            .definitionHash,
        upstreamChartSupportVersion:
          GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_AUTHORITY.version,
        upstreamChartSupportDefinitionHash:
          GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_AUTHORITY
            .definitionHash,
        upstreamR20DefinitionHash:
          SAJU_R20_BIJIE_SUPPORT_PARITY_REAUDIT_AUTHORITY.definitionHash,
        exactBijianOnly: true,
        sourceSlotIdentityPreserved: true,
        chartSupportParityRequired: true,
        perSlotSupportConstituentAuthorizedResearchOnly: true,
        r7BoundedCountReinterpreted: false,
        newBijianCountAuthorized: false,
        visibleBijieSupportUnionAuthorized: false,
        unifiedBijieCountAuthorized: false,
        completeBijieCollectionAuthorized: false,
        branchTenGodScanAuthorized: false,
        hiddenStemTenGodScanAuthorized: false,
        unauthorizedDerivations:
          GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_UNAUTHORIZED_DERIVATIONS,
        productionFactEmissionAuthorized: false,
      }),
    )
    .digest('hex');

export const GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_AUTHORITY =
  Object.freeze({
    version:
      GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_VERSION,
    definitionHash:
      GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_DEFINITION_HASH,
    decision:
      GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_DECISION,
    slots:
      GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_SLOTS,
    upstreamR17Version:
      GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_AUTHORITY
        .version,
    upstreamR17DefinitionHash:
      GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_AUTHORITY
        .definitionHash,
    upstreamChartSupportVersion:
      GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_AUTHORITY.version,
    upstreamChartSupportDefinitionHash:
      GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_AUTHORITY
        .definitionHash,
    upstreamR20DefinitionHash:
      SAJU_R20_BIJIE_SUPPORT_PARITY_REAUDIT_AUTHORITY.definitionHash,
    canonicalTenGodInputRequired: true as const,
    fixedVisibleStemDomainOnly: true as const,
    sourceSlotIdentityPreserved: true as const,
    exactBijianOnly: true as const,
    r17BoundedCountParityRequired: true as const,
    upstreamChartSupportParityRequired: true as const,
    perSlotSupportConstituentAuthorizedResearchOnly: true as const,
    sourceSupportCategory: '比劫' as const,
    r7BoundedCountReinterpreted: false as const,
    newBijianCountAuthorized: false as const,
    gyeopjaeConsumed: false as const,
    gyeopjaeCountAuthorized: false as const,
    visibleBijieSupportUnionAuthorized: false as const,
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
      GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_UNAUTHORIZED_DERIVATIONS,
    authorityBoundary:
      'This authority binds only R17 exact canonical 比肩 observations on fixed year/month/hour visible-stem slots to the already-governed research-only 比劫 support meaning. It requires parity with both R17 slot coverage and the existing chart-level visible-比肩 support constituent authority. It emits no count and does not reinterpret R7 bounded count semantics. It consumes no 겁재, creates no visible 比劫 support union or complete collection, scans no branch/hidden Ten-Gods, settles no 黨眾/助寡, classifies no 強弱/旺衰 or 格局, grants no narrative materiality, and emits no Production facts.',
  });
