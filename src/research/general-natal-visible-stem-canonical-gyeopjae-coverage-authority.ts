import { createHash } from 'node:crypto';

import type { FactState, ResolvedFact } from '../contracts/common.js';
import type { TenGod, TenGodChartFact } from '../contracts/calculation.js';
import {
  admitResolvedCanonicalGyeopjaeToBijieCategory,
  GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_AUTHORITY,
  GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_DEFINITION_HASH,
  GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_VERSION,
  type CanonicalGyeopjaeBijieCategoryMemberEvaluation,
} from './general-natal-canonical-gyeopjae-bijie-category-member-authority.js';
import {
  bindGovernedGyeopjaeBijieMemberToDangZhongSupportConstituent,
  GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY,
  GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_DEFINITION_HASH,
  GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_VERSION,
  type GyeopjaeBijieDangZhongSupportConstituentEvaluation,
} from './general-natal-gyeopjae-bijie-dang-zhong-support-constituent-authority.js';

export const GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_VERSION =
  '0.1.0-research' as const;

export const GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_SCOPE =
  'resolved_canonical_year_month_hour_stem_gyeopjae_coverage' as const;

export const GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export const GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_SLOTS =
  Object.freeze(['year', 'month', 'hour'] as const);

export type VisibleStemCanonicalGyeopjaeCoverageSlot =
  (typeof GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_SLOTS)[number];

export type VisibleStemCanonicalGyeopjaeSourceFactRef =
  | 'derivedFacts.tenGods.year.stem'
  | 'derivedFacts.tenGods.month.stem'
  | 'derivedFacts.tenGods.hour.stem';

export interface VisibleStemCanonicalGyeopjaeSlotEvaluation {
  readonly slot: VisibleStemCanonicalGyeopjaeCoverageSlot;
  readonly sourceFactRef: VisibleStemCanonicalGyeopjaeSourceFactRef;
  readonly canonicalTenGod: TenGod;
  readonly membershipEvaluation: CanonicalGyeopjaeBijieCategoryMemberEvaluation;
  readonly supportEvaluation: GyeopjaeBijieDangZhongSupportConstituentEvaluation;
  readonly supportConstituentObserved: boolean;
}

export type VisibleStemCanonicalGyeopjaeCoverageState =
  | 'visible_stem_gyeopjae_coverage_resolved'
  | 'ten_god_chart_unresolved'
  | 'visible_stem_facts_not_fully_resolved'
  | 'day_stem_semantic_mismatch'
  | 'upstream_gyeopjae_support_parity_unresolved';

export interface VisibleStemCanonicalGyeopjaeCoverageEvaluation {
  readonly state: VisibleStemCanonicalGyeopjaeCoverageState;
  readonly slots: Readonly<{
    year: VisibleStemCanonicalGyeopjaeSlotEvaluation;
    month: VisibleStemCanonicalGyeopjaeSlotEvaluation;
    hour: VisibleStemCanonicalGyeopjaeSlotEvaluation;
  }> | null;
  readonly visibleStemGyeopjaeSupportObserved: boolean;
  readonly authority: 'research_only';
}

function isResolvedCanonicalTenGodStem(
  fact: FactState<TenGod | '일간'> | undefined,
): fact is ResolvedFact<TenGod> {
  return fact?.status === 'resolved' && fact.value !== '일간';
}

function sourceFactRefForSlot(
  slot: VisibleStemCanonicalGyeopjaeCoverageSlot,
): VisibleStemCanonicalGyeopjaeSourceFactRef {
  if (slot === 'year') return 'derivedFacts.tenGods.year.stem';
  if (slot === 'month') return 'derivedFacts.tenGods.month.stem';
  return 'derivedFacts.tenGods.hour.stem';
}

function evaluateSlot(
  slot: VisibleStemCanonicalGyeopjaeCoverageSlot,
  fact: ResolvedFact<TenGod>,
): VisibleStemCanonicalGyeopjaeSlotEvaluation | null {
  const membershipEvaluation =
    admitResolvedCanonicalGyeopjaeToBijieCategory(fact);
  const supportEvaluation =
    bindGovernedGyeopjaeBijieMemberToDangZhongSupportConstituent(
      membershipEvaluation,
    );

  const positive = membershipEvaluation.state ===
    'bijie_source_category_member_observed';

  if (
    positive &&
    (
      membershipEvaluation.canonicalLabel !== '겁재' ||
      membershipEvaluation.sourceLabel !== '劫財' ||
      membershipEvaluation.sourceCategory !== '比劫' ||
      membershipEvaluation.membershipObserved !== true ||
      supportEvaluation.state !==
        'gyeopjae_bijie_support_constituent_observed' ||
      supportEvaluation.canonicalConstituent !== '겁재' ||
      supportEvaluation.sourceMemberLabel !== '劫財' ||
      supportEvaluation.sourceSupportCategory !== '比劫' ||
      supportEvaluation.supportConstituentObserved !== true
    )
  ) {
    return null;
  }

  if (
    !positive &&
    (
      membershipEvaluation.state !==
        'resolved_outside_authorized_gyeopjae_label_scope' ||
      membershipEvaluation.membershipObserved !== false ||
      supportEvaluation.state !==
        'no_gyeopjae_bijie_support_constituent_evidence' ||
      supportEvaluation.supportConstituentObserved !== false
    )
  ) {
    return null;
  }

  return Object.freeze({
    slot,
    sourceFactRef: sourceFactRefForSlot(slot),
    canonicalTenGod: fact.value,
    membershipEvaluation,
    supportEvaluation,
    supportConstituentObserved: supportEvaluation.supportConstituentObserved,
  });
}

export function evaluateVisibleStemCanonicalGyeopjaeCoverage(
  tenGods: FactState<TenGodChartFact>,
): VisibleStemCanonicalGyeopjaeCoverageEvaluation {
  if (tenGods.status !== 'resolved') {
    return Object.freeze({
      state: 'ten_god_chart_unresolved',
      slots: null,
      visibleStemGyeopjaeSupportObserved: false,
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
      visibleStemGyeopjaeSupportObserved: false,
      authority: 'research_only',
    });
  }

  if (day.stem.value !== '일간') {
    return Object.freeze({
      state: 'day_stem_semantic_mismatch',
      slots: null,
      visibleStemGyeopjaeSupportObserved: false,
      authority: 'research_only',
    });
  }

  const yearEvaluation = evaluateSlot('year', year.stem);
  const monthEvaluation = evaluateSlot('month', month.stem);
  const hourEvaluation = evaluateSlot('hour', hour.stem);

  if (
    yearEvaluation === null ||
    monthEvaluation === null ||
    hourEvaluation === null
  ) {
    return Object.freeze({
      state: 'upstream_gyeopjae_support_parity_unresolved',
      slots: null,
      visibleStemGyeopjaeSupportObserved: false,
      authority: 'research_only',
    });
  }

  const slots = Object.freeze({
    year: yearEvaluation,
    month: monthEvaluation,
    hour: hourEvaluation,
  });

  return Object.freeze({
    state: 'visible_stem_gyeopjae_coverage_resolved',
    slots,
    visibleStemGyeopjaeSupportObserved:
      yearEvaluation.supportConstituentObserved ||
      monthEvaluation.supportConstituentObserved ||
      hourEvaluation.supportConstituentObserved,
    authority: 'research_only',
  });
}

export const GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_UNAUTHORIZED_DERIVATIONS =
  Object.freeze([
    'visible_stem_gyeopjae_presence_to_gyeopjae_count',
    'slot_evaluations_to_unified_bijie_count',
    'visible_bijian_plus_visible_gyeopjae_union',
    'visible_bijian_plus_visible_gyeopjae_aggregation',
    'visible_stem_coverage_to_complete_bijie_collection',
    'branch_ten_god_scan',
    'hidden_stem_ten_god_scan',
    'absence_of_visible_gyeopjae_to_universal_non_bijie_verdict',
    'single_or_multiple_gyeopjae_to_dang_zhong',
    'absence_of_visible_gyeopjae_to_zhu_gua',
    'support_constituent_to_qiang_or_ruo',
    'support_constituent_to_final_qiang_ruo',
    'support_constituent_to_final_wang_shuai',
    'support_constituent_to_numeric_strength',
    'support_constituent_to_geju_candidate',
    'support_constituent_to_geju_establishment',
    'support_constituent_to_narrative_materiality',
    'support_constituent_to_production_fact',
  ] as const);

export const GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version:
          GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_VERSION,
        scope: GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_SCOPE,
        decision:
          GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_DECISION,
        slots: GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_SLOTS,
        upstreamMembershipVersion:
          GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_VERSION,
        upstreamMembershipDefinitionHash:
          GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_DEFINITION_HASH,
        upstreamSupportVersion:
          GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_VERSION,
        upstreamSupportDefinitionHash:
          GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_DEFINITION_HASH,
        canonicalTenGodInputRequired: true,
        daySelfMarkerRequired: true,
        fixedVisibleStemCoverageAuthorizedResearchOnly: true,
        visibleStemGyeopjaeCountAuthorized: false,
        bijianGyeopjaeUnionAuthorized: false,
        completeBijieCollectionAuthorized: false,
        branchTenGodScanAuthorized: false,
        hiddenStemTenGodScanAuthorized: false,
        unauthorizedDerivations:
          GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_UNAUTHORIZED_DERIVATIONS,
        productionFactEmissionAuthorized: false,
      }),
    )
    .digest('hex');

export const GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY =
  Object.freeze({
    version:
      GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_VERSION,
    definitionHash:
      GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_DEFINITION_HASH,
    decision:
      GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_DECISION,
    slots: GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_SLOTS,
    upstreamMembershipVersion:
      GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_AUTHORITY.version,
    upstreamMembershipDefinitionHash:
      GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_AUTHORITY
        .definitionHash,
    upstreamSupportVersion:
      GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY
        .version,
    upstreamSupportDefinitionHash:
      GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY
        .definitionHash,
    canonicalTenGodInputRequired: true as const,
    allVisibleStemFactsMustResolve: true as const,
    daySelfMarkerRequired: true as const,
    fixedVisibleStemCoverageAuthorizedResearchOnly: true as const,
    sourceSlotIdentityPreserved: true as const,
    visibleStemGyeopjaePresenceAuthorized: true as const,
    visibleStemGyeopjaeCountAuthorized: false as const,
    resolvedOtherTenGodUniversalNonBijieVerdictAuthorized: false as const,
    bijianGyeopjaeUnionAuthorized: false as const,
    unifiedBijieCountAuthorized: false as const,
    completeBijieCollectionAuthorized: false as const,
    wholeChartJiecaiScanAuthorized: false as const,
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
      GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_UNAUTHORIZED_DERIVATIONS,
    authorityBoundary:
      'This authority opens only one fixed research-only coverage surface over canonical year/month/hour visible-stem Ten-God facts. It preserves slot identity, requires the canonical day-stem self marker, and reuses the already-governed R11 single-fact 겁재 -> 劫財 -> 比劫 membership/support semantics independently for each fixed visible slot. It authorizes only positive presence across that fixed surface. It does not authorize a 겁재 count, 比肩+겁재 union, complete 比劫 collection, branch/hidden scanning, 黨眾/助寡 settlement, 強弱/旺衰, 格局, narrative materiality, or Production.',
  });

