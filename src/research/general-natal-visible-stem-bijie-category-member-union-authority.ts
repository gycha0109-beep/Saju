import { createHash } from 'node:crypto';
import type { FactState } from '../contracts/common.js';
import type { TenGod, TenGodChartFact } from '../contracts/calculation.js';
import {
  evaluateVisibleStemCanonicalBijianSlotCoverage,
  GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_AUTHORITY,
  type VisibleStemCanonicalBijianSlotEvaluation,
} from './general-natal-visible-stem-canonical-bijian-slot-coverage-authority.js';
import {
  evaluateVisibleStemCanonicalGyeopjaeCoverage,
  GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY,
  type VisibleStemCanonicalGyeopjaeSlotEvaluation,
} from './general-natal-visible-stem-canonical-gyeopjae-coverage-authority.js';
import {
  SAJU_R18_VISIBLE_BIJIE_UNION_READINESS_REAUDIT_AUTHORITY,
} from './saju-r18-visible-bijie-union-readiness-reaudit.js';

export const GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_VERSION =
  '0.1.0-research' as const;

export const GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_SCOPE =
  'fixed_year_month_hour_visible_stem_bijian_gyeopjae_category_member_union' as const;

export const GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export const GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_SLOTS =
  Object.freeze(['year', 'month', 'hour'] as const);

export type VisibleStemBijieCategoryUnionSlot =
  (typeof GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_SLOTS)[number];

export type VisibleStemBijieCategoryUnionSourceFactRef =
  | 'derivedFacts.tenGods.year.stem'
  | 'derivedFacts.tenGods.month.stem'
  | 'derivedFacts.tenGods.hour.stem';

export type VisibleStemBijieCanonicalMemberKind = '비견' | '겁재';

export interface VisibleStemBijieCategoryUnionSlotEvaluation {
  readonly slot: VisibleStemBijieCategoryUnionSlot;
  readonly sourceFactRef: VisibleStemBijieCategoryUnionSourceFactRef;
  readonly canonicalTenGod: TenGod;
  readonly bijieMemberObserved: boolean;
  readonly canonicalMemberKind: VisibleStemBijieCanonicalMemberKind | null;
  readonly sourceCategory: '比劫' | null;
  readonly authority: 'research_only';
}

export type VisibleStemBijieCategoryMemberUnionState =
  | 'visible_stem_bijie_category_member_union_resolved'
  | 'ten_god_chart_unresolved'
  | 'visible_stem_facts_not_fully_resolved'
  | 'day_stem_semantic_mismatch'
  | 'upstream_surface_parity_unresolved'
  | 'slot_category_union_parity_unresolved';

export interface VisibleStemBijieCategoryMemberUnionEvaluation {
  readonly state: VisibleStemBijieCategoryMemberUnionState;
  readonly slots: Readonly<{
    year: VisibleStemBijieCategoryUnionSlotEvaluation;
    month: VisibleStemBijieCategoryUnionSlotEvaluation;
    hour: VisibleStemBijieCategoryUnionSlotEvaluation;
  }> | null;
  readonly visibleStemBijieMemberObserved: boolean;
  readonly authority: 'research_only';
}

function classifySlot(
  slot: VisibleStemBijieCategoryUnionSlot,
  bijian: VisibleStemCanonicalBijianSlotEvaluation,
  gyeopjae: VisibleStemCanonicalGyeopjaeSlotEvaluation,
): VisibleStemBijieCategoryUnionSlotEvaluation | null {
  if (
    bijian.slot !== slot ||
    gyeopjae.slot !== slot ||
    bijian.sourceFactRef !== `derivedFacts.tenGods.${slot}.stem` ||
    gyeopjae.sourceFactRef !== `derivedFacts.tenGods.${slot}.stem` ||
    bijian.sourceFactRef !== gyeopjae.sourceFactRef ||
    bijian.canonicalTenGod !== gyeopjae.canonicalTenGod
  ) {
    return null;
  }

  const canonicalTenGod = bijian.canonicalTenGod;
  const exactBijianObserved = bijian.exactBijianObserved;
  const exactGyeopjaeMembershipObserved =
    gyeopjae.membershipEvaluation.state ===
      'bijie_source_category_member_observed' &&
    gyeopjae.membershipEvaluation.canonicalLabel === '겁재' &&
    gyeopjae.membershipEvaluation.sourceLabel === '劫財' &&
    gyeopjae.membershipEvaluation.sourceCategory === '比劫' &&
    gyeopjae.membershipEvaluation.membershipObserved === true;

  if (
    exactBijianObserved !== (canonicalTenGod === '비견') ||
    exactGyeopjaeMembershipObserved !== (canonicalTenGod === '겁재') ||
    (exactBijianObserved && exactGyeopjaeMembershipObserved)
  ) {
    return null;
  }

  if (exactBijianObserved) {
    return Object.freeze({
      slot,
      sourceFactRef: bijian.sourceFactRef,
      canonicalTenGod,
      bijieMemberObserved: true,
      canonicalMemberKind: '비견',
      sourceCategory: '比劫',
      authority: 'research_only',
    });
  }

  if (exactGyeopjaeMembershipObserved) {
    return Object.freeze({
      slot,
      sourceFactRef: bijian.sourceFactRef,
      canonicalTenGod,
      bijieMemberObserved: true,
      canonicalMemberKind: '겁재',
      sourceCategory: '比劫',
      authority: 'research_only',
    });
  }

  return Object.freeze({
    slot,
    sourceFactRef: bijian.sourceFactRef,
    canonicalTenGod,
    bijieMemberObserved: false,
    canonicalMemberKind: null,
    sourceCategory: null,
    authority: 'research_only',
  });
}

export function evaluateVisibleStemBijieCategoryMemberUnion(
  tenGods: FactState<TenGodChartFact>,
): VisibleStemBijieCategoryMemberUnionEvaluation {
  const bijian = evaluateVisibleStemCanonicalBijianSlotCoverage(tenGods);
  const gyeopjae = evaluateVisibleStemCanonicalGyeopjaeCoverage(tenGods);

  if (
    bijian.state === 'ten_god_chart_unresolved' ||
    gyeopjae.state === 'ten_god_chart_unresolved'
  ) {
    return Object.freeze({
      state: 'ten_god_chart_unresolved',
      slots: null,
      visibleStemBijieMemberObserved: false,
      authority: 'research_only',
    });
  }

  if (
    bijian.state === 'visible_stem_facts_not_fully_resolved' ||
    gyeopjae.state === 'visible_stem_facts_not_fully_resolved'
  ) {
    return Object.freeze({
      state: 'visible_stem_facts_not_fully_resolved',
      slots: null,
      visibleStemBijieMemberObserved: false,
      authority: 'research_only',
    });
  }

  if (
    bijian.state === 'day_stem_semantic_mismatch' ||
    gyeopjae.state === 'day_stem_semantic_mismatch'
  ) {
    return Object.freeze({
      state: 'day_stem_semantic_mismatch',
      slots: null,
      visibleStemBijieMemberObserved: false,
      authority: 'research_only',
    });
  }

  if (
    bijian.state !== 'visible_stem_bijian_slot_coverage_resolved' ||
    bijian.slots === null ||
    bijian.r7BoundedCountParityVerified !== true ||
    gyeopjae.state !== 'visible_stem_gyeopjae_coverage_resolved' ||
    gyeopjae.slots === null
  ) {
    return Object.freeze({
      state: 'upstream_surface_parity_unresolved',
      slots: null,
      visibleStemBijieMemberObserved: false,
      authority: 'research_only',
    });
  }

  const year = classifySlot('year', bijian.slots.year, gyeopjae.slots.year);
  const month = classifySlot('month', bijian.slots.month, gyeopjae.slots.month);
  const hour = classifySlot('hour', bijian.slots.hour, gyeopjae.slots.hour);

  if (year === null || month === null || hour === null) {
    return Object.freeze({
      state: 'slot_category_union_parity_unresolved',
      slots: null,
      visibleStemBijieMemberObserved: false,
      authority: 'research_only',
    });
  }

  const slots = Object.freeze({ year, month, hour });

  return Object.freeze({
    state: 'visible_stem_bijie_category_member_union_resolved',
    slots,
    visibleStemBijieMemberObserved:
      year.bijieMemberObserved ||
      month.bijieMemberObserved ||
      hour.bijieMemberObserved,
    authority: 'research_only',
  });
}

export const GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_UNAUTHORIZED_DERIVATIONS =
  Object.freeze([
    'category_union_to_unified_bijie_count',
    'category_union_to_bijian_count',
    'category_union_to_gyeopjae_count',
    'category_union_to_support_constituent_union',
    'category_union_to_per_slot_support_constituent',
    'category_union_to_complete_bijie_collection',
    'branch_ten_god_scan',
    'hidden_stem_ten_god_scan',
    'outside_visible_union_scope_to_universal_non_bijie_verdict',
    'visible_bijie_member_presence_to_dang_zhong',
    'visible_bijie_member_absence_to_zhu_gua',
    'category_union_to_support_aggregation',
    'category_union_to_qiang_or_ruo',
    'category_union_to_final_qiang_ruo',
    'category_union_to_final_wang_shuai',
    'category_union_to_numeric_strength',
    'category_union_to_geju_candidate',
    'category_union_to_geju_establishment',
    'category_union_to_narrative_materiality',
    'category_union_to_production_fact',
  ] as const);

export const GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version: GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_VERSION,
        scope: GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_SCOPE,
        decision: GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_DECISION,
        slots: GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_SLOTS,
        upstreamR17Version:
          GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_AUTHORITY
            .version,
        upstreamR17DefinitionHash:
          GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_AUTHORITY
            .definitionHash,
        upstreamR15Version:
          GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY
            .version,
        upstreamR15DefinitionHash:
          GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY
            .definitionHash,
        upstreamR18DefinitionHash:
          SAJU_R18_VISIBLE_BIJIE_UNION_READINESS_REAUDIT_AUTHORITY.definitionHash,
        exactBijianAndGyeopjaeCategoryUnionAuthorizedResearchOnly: true,
        sourceSlotIdentityPreserved: true,
        canonicalMemberKindPreserved: true,
        supportConstituentUnionAuthorized: false,
        unifiedBijieCountAuthorized: false,
        completeBijieCollectionAuthorized: false,
        branchTenGodScanAuthorized: false,
        hiddenStemTenGodScanAuthorized: false,
        unauthorizedDerivations:
          GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_UNAUTHORIZED_DERIVATIONS,
        productionFactEmissionAuthorized: false,
      }),
    )
    .digest('hex');

export const GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_AUTHORITY =
  Object.freeze({
    version: GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_VERSION,
    definitionHash:
      GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_DEFINITION_HASH,
    decision: GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_DECISION,
    slots: GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_SLOTS,
    upstreamR17Version:
      GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_AUTHORITY.version,
    upstreamR17DefinitionHash:
      GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_AUTHORITY
        .definitionHash,
    upstreamR15Version:
      GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY.version,
    upstreamR15DefinitionHash:
      GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY
        .definitionHash,
    upstreamR18DefinitionHash:
      SAJU_R18_VISIBLE_BIJIE_UNION_READINESS_REAUDIT_AUTHORITY.definitionHash,
    canonicalTenGodInputRequired: true as const,
    fixedVisibleStemDomainOnly: true as const,
    sourceSlotIdentityPreserved: true as const,
    canonicalMemberKindPreserved: true as const,
    exactBijianGyeopjaeCategoryUnionAuthorizedResearchOnly: true as const,
    visibleStemBijiePresenceAuthorized: true as const,
    upstreamSupportObjectsConsumedIntoUnion: false as const,
    perSlotSupportConstituentAuthorized: false as const,
    supportConstituentUnionAuthorized: false as const,
    unifiedBijieCountAuthorized: false as const,
    bijianCountAuthorizedByThisUnion: false as const,
    gyeopjaeCountAuthorizedByThisUnion: false as const,
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
      GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_UNAUTHORIZED_DERIVATIONS,
    authorityBoundary:
      'This authority combines only the already-governed R17 exact 比肩 slot observations and R15 canonical 겁재 -> 比劫 membership on the same fixed year/month/hour visible-stem domain. It preserves slot identity and canonical member kind, emits only category membership/presence, and intentionally discards upstream support objects from the union surface. It does not create a unified 比劫 count, per-slot support constituent, support union, complete 比劫 collection, branch/hidden coverage, 黨眾/助寡 settlement, 強弱/旺衰 or 格局 classification, narrative materiality, or Production authority.',
  });
