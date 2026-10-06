import { createHash } from 'node:crypto';

import type { FactState } from '../contracts/common.js';
import type { TenGod, TenGodChartFact } from '../contracts/calculation.js';
import {
  evaluateVisibleStemBijianSlotSupportConstituents,
  GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_AUTHORITY,
  type VisibleStemBijianSlotSupportEvaluation,
} from './general-natal-visible-stem-bijian-slot-support-constituent-authority.js';
import {
  evaluateVisibleStemBijieCategoryMemberUnion,
  GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_AUTHORITY,
  type VisibleStemBijieCategoryUnionSlotEvaluation,
} from './general-natal-visible-stem-bijie-category-member-union-authority.js';
import {
  evaluateVisibleStemCanonicalGyeopjaeCoverage,
  GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY,
  type VisibleStemCanonicalGyeopjaeSlotEvaluation,
} from './general-natal-visible-stem-canonical-gyeopjae-coverage-authority.js';
import {
  SAJU_R22_BIJIE_SUPPORT_UNION_READINESS_REAUDIT_AUTHORITY,
} from './saju-r22-bijie-support-union-readiness-reaudit.js';

export const GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_VERSION =
  '0.1.0-research' as const;

export const GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_SCOPE =
  'fixed_year_month_hour_visible_stem_bijian_gyeopjae_support_constituent_union' as const;

export const GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export const GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_SLOTS =
  Object.freeze(['year', 'month', 'hour'] as const);

export type VisibleStemBijieSupportUnionSlot =
  (typeof GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_SLOTS)[number];

export type VisibleStemBijieSupportUnionSourceFactRef =
  | 'derivedFacts.tenGods.year.stem'
  | 'derivedFacts.tenGods.month.stem'
  | 'derivedFacts.tenGods.hour.stem';

export type VisibleStemBijieSupportCanonicalMemberKind = '비견' | '겁재';

export interface VisibleStemBijieSupportUnionSlotEvaluation {
  readonly slot: VisibleStemBijieSupportUnionSlot;
  readonly sourceFactRef: VisibleStemBijieSupportUnionSourceFactRef;
  readonly canonicalTenGod: TenGod;
  readonly bijieMemberObserved: boolean;
  readonly canonicalMemberKind:
    | VisibleStemBijieSupportCanonicalMemberKind
    | null;
  readonly supportConstituentObserved: boolean;
  readonly sourceSupportCategory: '比劫' | null;
  readonly authority: 'research_only';
}

export type VisibleStemBijieSupportConstituentUnionState =
  | 'visible_stem_bijie_support_constituent_union_resolved'
  | 'ten_god_chart_unresolved'
  | 'visible_stem_facts_not_fully_resolved'
  | 'day_stem_semantic_mismatch'
  | 'bijian_support_surface_unresolved'
  | 'gyeopjae_support_surface_unresolved'
  | 'category_member_surface_unresolved'
  | 'slot_support_union_parity_unresolved';

export interface VisibleStemBijieSupportConstituentUnionEvaluation {
  readonly state: VisibleStemBijieSupportConstituentUnionState;
  readonly slots: Readonly<{
    year: VisibleStemBijieSupportUnionSlotEvaluation;
    month: VisibleStemBijieSupportUnionSlotEvaluation;
    hour: VisibleStemBijieSupportUnionSlotEvaluation;
  }> | null;
  readonly visibleStemBijieSupportObserved: boolean;
  readonly upstreamThreeWayParityVerified: boolean;
  readonly authority: 'research_only';
}

function classifySlot(
  slot: VisibleStemBijieSupportUnionSlot,
  bijian: VisibleStemBijianSlotSupportEvaluation,
  gyeopjae: VisibleStemCanonicalGyeopjaeSlotEvaluation,
  category: VisibleStemBijieCategoryUnionSlotEvaluation,
): VisibleStemBijieSupportUnionSlotEvaluation | null {
  const expectedSourceFactRef =
    `derivedFacts.tenGods.${slot}.stem` as VisibleStemBijieSupportUnionSourceFactRef;

  if (
    bijian.slot !== slot ||
    gyeopjae.slot !== slot ||
    category.slot !== slot ||
    bijian.sourceFactRef !== expectedSourceFactRef ||
    gyeopjae.sourceFactRef !== expectedSourceFactRef ||
    category.sourceFactRef !== expectedSourceFactRef ||
    bijian.sourceFactRef !== gyeopjae.sourceFactRef ||
    bijian.sourceFactRef !== category.sourceFactRef ||
    bijian.canonicalTenGod !== gyeopjae.canonicalTenGod ||
    bijian.canonicalTenGod !== category.canonicalTenGod
  ) {
    return null;
  }

  const canonicalTenGod = bijian.canonicalTenGod;
  const expectedBijian = canonicalTenGod === '비견';
  const expectedGyeopjae = canonicalTenGod === '겁재';

  const bijianPositive =
    bijian.exactBijianObserved === true &&
    bijian.supportConstituentObserved === true &&
    bijian.canonicalConstituent === '비견' &&
    bijian.sourceSupportCategory === '比劫';

  const bijianNegative =
    bijian.exactBijianObserved === false &&
    bijian.supportConstituentObserved === false &&
    bijian.canonicalConstituent === null &&
    bijian.sourceSupportCategory === null;

  const gyeopjaePositive =
    gyeopjae.membershipEvaluation.state ===
      'bijie_source_category_member_observed' &&
    gyeopjae.membershipEvaluation.canonicalLabel === '겁재' &&
    gyeopjae.membershipEvaluation.sourceLabel === '劫財' &&
    gyeopjae.membershipEvaluation.sourceCategory === '比劫' &&
    gyeopjae.membershipEvaluation.membershipObserved === true &&
    gyeopjae.supportEvaluation.state ===
      'gyeopjae_bijie_support_constituent_observed' &&
    gyeopjae.supportEvaluation.canonicalConstituent === '겁재' &&
    gyeopjae.supportEvaluation.sourceMemberLabel === '劫財' &&
    gyeopjae.supportEvaluation.sourceSupportCategory === '比劫' &&
    gyeopjae.supportEvaluation.supportConstituentObserved === true &&
    gyeopjae.supportConstituentObserved === true;

  const gyeopjaeNegative =
    gyeopjae.membershipEvaluation.state ===
      'resolved_outside_authorized_gyeopjae_label_scope' &&
    gyeopjae.membershipEvaluation.membershipObserved === false &&
    gyeopjae.supportEvaluation.state ===
      'no_gyeopjae_bijie_support_constituent_evidence' &&
    gyeopjae.supportEvaluation.supportConstituentObserved === false &&
    gyeopjae.supportConstituentObserved === false;

  const expectedCategoryMemberKind:
    | VisibleStemBijieSupportCanonicalMemberKind
    | null = expectedBijian ? '비견' : expectedGyeopjae ? '겁재' : null;

  const categoryParity =
    category.bijieMemberObserved === (expectedCategoryMemberKind !== null) &&
    category.canonicalMemberKind === expectedCategoryMemberKind &&
    category.sourceCategory ===
      (expectedCategoryMemberKind === null ? null : '比劫');

  if (
    (bijianPositive && gyeopjaePositive) ||
    (expectedBijian
      ? !bijianPositive || !gyeopjaeNegative
      : !bijianNegative) ||
    (expectedGyeopjae
      ? !gyeopjaePositive || !bijianNegative
      : !gyeopjaeNegative) ||
    !categoryParity
  ) {
    return null;
  }

  if (expectedBijian) {
    return Object.freeze({
      slot,
      sourceFactRef: expectedSourceFactRef,
      canonicalTenGod,
      bijieMemberObserved: true,
      canonicalMemberKind: '비견',
      supportConstituentObserved: true,
      sourceSupportCategory: '比劫',
      authority: 'research_only',
    });
  }

  if (expectedGyeopjae) {
    return Object.freeze({
      slot,
      sourceFactRef: expectedSourceFactRef,
      canonicalTenGod,
      bijieMemberObserved: true,
      canonicalMemberKind: '겁재',
      supportConstituentObserved: true,
      sourceSupportCategory: '比劫',
      authority: 'research_only',
    });
  }

  return Object.freeze({
    slot,
    sourceFactRef: expectedSourceFactRef,
    canonicalTenGod,
    bijieMemberObserved: false,
    canonicalMemberKind: null,
    supportConstituentObserved: false,
    sourceSupportCategory: null,
    authority: 'research_only',
  });
}

export function evaluateVisibleStemBijieSupportConstituentUnion(
  tenGods: FactState<TenGodChartFact>,
): VisibleStemBijieSupportConstituentUnionEvaluation {
  const bijian = evaluateVisibleStemBijianSlotSupportConstituents(tenGods);
  const gyeopjae = evaluateVisibleStemCanonicalGyeopjaeCoverage(tenGods);
  const category = evaluateVisibleStemBijieCategoryMemberUnion(tenGods);

  if (
    bijian.state === 'ten_god_chart_unresolved' ||
    gyeopjae.state === 'ten_god_chart_unresolved' ||
    category.state === 'ten_god_chart_unresolved'
  ) {
    return Object.freeze({
      state: 'ten_god_chart_unresolved',
      slots: null,
      visibleStemBijieSupportObserved: false,
      upstreamThreeWayParityVerified: false,
      authority: 'research_only',
    });
  }

  if (
    bijian.state === 'visible_stem_facts_not_fully_resolved' ||
    gyeopjae.state === 'visible_stem_facts_not_fully_resolved' ||
    category.state === 'visible_stem_facts_not_fully_resolved'
  ) {
    return Object.freeze({
      state: 'visible_stem_facts_not_fully_resolved',
      slots: null,
      visibleStemBijieSupportObserved: false,
      upstreamThreeWayParityVerified: false,
      authority: 'research_only',
    });
  }

  if (
    bijian.state === 'day_stem_semantic_mismatch' ||
    gyeopjae.state === 'day_stem_semantic_mismatch' ||
    category.state === 'day_stem_semantic_mismatch'
  ) {
    return Object.freeze({
      state: 'day_stem_semantic_mismatch',
      slots: null,
      visibleStemBijieSupportObserved: false,
      upstreamThreeWayParityVerified: false,
      authority: 'research_only',
    });
  }

  if (
    bijian.state !== 'visible_stem_bijian_slot_support_resolved' ||
    bijian.slots === null ||
    bijian.upstreamChartSupportParityVerified !== true
  ) {
    return Object.freeze({
      state: 'bijian_support_surface_unresolved',
      slots: null,
      visibleStemBijieSupportObserved: false,
      upstreamThreeWayParityVerified: false,
      authority: 'research_only',
    });
  }

  if (
    gyeopjae.state !== 'visible_stem_gyeopjae_coverage_resolved' ||
    gyeopjae.slots === null
  ) {
    return Object.freeze({
      state: 'gyeopjae_support_surface_unresolved',
      slots: null,
      visibleStemBijieSupportObserved: false,
      upstreamThreeWayParityVerified: false,
      authority: 'research_only',
    });
  }

  if (
    category.state !== 'visible_stem_bijie_category_member_union_resolved' ||
    category.slots === null
  ) {
    return Object.freeze({
      state: 'category_member_surface_unresolved',
      slots: null,
      visibleStemBijieSupportObserved: false,
      upstreamThreeWayParityVerified: false,
      authority: 'research_only',
    });
  }

  const year = classifySlot(
    'year',
    bijian.slots.year,
    gyeopjae.slots.year,
    category.slots.year,
  );
  const month = classifySlot(
    'month',
    bijian.slots.month,
    gyeopjae.slots.month,
    category.slots.month,
  );
  const hour = classifySlot(
    'hour',
    bijian.slots.hour,
    gyeopjae.slots.hour,
    category.slots.hour,
  );

  if (year === null || month === null || hour === null) {
    return Object.freeze({
      state: 'slot_support_union_parity_unresolved',
      slots: null,
      visibleStemBijieSupportObserved: false,
      upstreamThreeWayParityVerified: false,
      authority: 'research_only',
    });
  }

  const slots = Object.freeze({ year, month, hour });

  return Object.freeze({
    state: 'visible_stem_bijie_support_constituent_union_resolved',
    slots,
    visibleStemBijieSupportObserved:
      year.supportConstituentObserved ||
      month.supportConstituentObserved ||
      hour.supportConstituentObserved,
    upstreamThreeWayParityVerified: true,
    authority: 'research_only',
  });
}

export const GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_UNAUTHORIZED_DERIVATIONS =
  Object.freeze([
    'support_union_to_bijian_count',
    'support_union_to_gyeopjae_count',
    'support_union_to_unified_bijie_count',
    'support_union_to_support_count',
    'support_union_to_support_weight',
    'support_union_to_complete_bijie_collection',
    'branch_ten_god_scan',
    'hidden_stem_ten_god_scan',
    'outside_visible_union_scope_to_universal_non_bijie_verdict',
    'support_union_to_support_aggregation',
    'support_union_to_dang_zhong',
    'support_union_to_zhu_gua',
    'support_union_to_qiang_or_ruo',
    'support_union_to_final_qiang_ruo',
    'support_union_to_final_wang_shuai',
    'support_union_to_numeric_strength',
    'support_union_to_geju_candidate',
    'support_union_to_geju_establishment',
    'support_union_to_narrative_materiality',
    'support_union_to_production_fact',
  ] as const);

export const GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version:
          GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_VERSION,
        scope:
          GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_SCOPE,
        decision:
          GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_DECISION,
        slots:
          GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_SLOTS,
        upstreamR21Version:
          GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_AUTHORITY
            .version,
        upstreamR21DefinitionHash:
          GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_AUTHORITY
            .definitionHash,
        upstreamR15Version:
          GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY
            .version,
        upstreamR15DefinitionHash:
          GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY
            .definitionHash,
        upstreamR19Version:
          GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_AUTHORITY
            .version,
        upstreamR19DefinitionHash:
          GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_AUTHORITY
            .definitionHash,
        upstreamR22DefinitionHash:
          SAJU_R22_BIJIE_SUPPORT_UNION_READINESS_REAUDIT_AUTHORITY
            .definitionHash,
        sourceSlotIdentityPreserved: true,
        canonicalMemberKindPreserved: true,
        supportConstituentUnionAuthorizedResearchOnly: true,
        categoryUnionUsedOnlyAsParityGuard: true,
        countSemanticsAuthorized: false,
        completeBijieCollectionAuthorized: false,
        branchTenGodScanAuthorized: false,
        hiddenStemTenGodScanAuthorized: false,
        unauthorizedDerivations:
          GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_UNAUTHORIZED_DERIVATIONS,
        productionFactEmissionAuthorized: false,
      }),
    )
    .digest('hex');

export const GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_AUTHORITY =
  Object.freeze({
    version:
      GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_VERSION,
    definitionHash:
      GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_DEFINITION_HASH,
    decision:
      GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_DECISION,
    slots:
      GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_SLOTS,
    upstreamR21Version:
      GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_AUTHORITY
        .version,
    upstreamR21DefinitionHash:
      GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_AUTHORITY
        .definitionHash,
    upstreamR15Version:
      GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY.version,
    upstreamR15DefinitionHash:
      GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY
        .definitionHash,
    upstreamR19Version:
      GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_AUTHORITY.version,
    upstreamR19DefinitionHash:
      GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_AUTHORITY
        .definitionHash,
    upstreamR22DefinitionHash:
      SAJU_R22_BIJIE_SUPPORT_UNION_READINESS_REAUDIT_AUTHORITY.definitionHash,
    canonicalTenGodInputRequired: true as const,
    fixedVisibleStemDomainOnly: true as const,
    sourceSlotIdentityPreserved: true as const,
    canonicalMemberKindPreserved: true as const,
    upstreamThreeWayParityRequired: true as const,
    categoryUnionUsedOnlyAsParityGuard: true as const,
    supportConstituentUnionAuthorizedResearchOnly: true as const,
    supportPresenceAuthorized: true as const,
    bijianCountAuthorized: false as const,
    gyeopjaeCountAuthorized: false as const,
    unifiedBijieCountAuthorized: false as const,
    supportCountAuthorized: false as const,
    supportWeightAuthorized: false as const,
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
      GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_UNAUTHORIZED_DERIVATIONS,
    authorityBoundary:
      'This authority materializes only the fixed year/month/hour visible-stem support-constituent union for exact canonical 比肩 and 겁재. It independently re-evaluates R21 比肩 support, R15 겁재 support, and R19 category membership against the same canonical Ten-God facts, requiring slot/source/canonical/member-kind parity before emitting a research-only support surface. R19 is used only as a category-member parity guard and never as support authority. No count, support weight, complete 比劫 collection, branch/hidden coverage, support aggregation, 黨眾/助寡 settlement, 強弱/旺衰, 格局, narrative materiality, or Production authority is created.',
  });
