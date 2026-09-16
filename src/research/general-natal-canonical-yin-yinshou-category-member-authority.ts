import { createHash } from 'node:crypto';
import type { FactState } from '../contracts/common.js';
import type { TenGod } from '../contracts/calculation.js';
import { GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW } from './general-natal-geju-source-example-canonical-input-binding-review.js';
import {
  canonicalYinTenGodToHanjaLabel,
  GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_BRIDGE_DEFINITION_HASH,
  GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_BRIDGE_VERSION,
} from './general-natal-canonical-yin-hanja-label-bridge-authority.js';
import {
  GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_DEFINITION_HASH,
  GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_SOURCE,
  GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_VERSION,
  GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_TEXT,
} from './general-natal-yinshou-zheng-pian-source-category-authority.js';

export const GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_SCOPE =
  'resolved_canonical_jeongin_pyeonin_to_yinshou_source_category_member' as const;
export const GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export type CanonicalYinshouCategoryMemberState =
  | 'yinshou_source_category_member_observed'
  | 'resolved_outside_authorized_yin_label_scope'
  | 'canonical_ten_god_ambiguous'
  | 'canonical_ten_god_unavailable';

export interface CanonicalYinshouCategoryMemberEvaluation {
  readonly state: CanonicalYinshouCategoryMemberState;
  readonly inputStatus: FactState<TenGod>['status'];
  readonly canonicalLabel: TenGod | null;
  readonly sourceLabel: '正印' | '偏印' | null;
  readonly sourceCategory: '印綬' | null;
  readonly membershipObserved: boolean;
  readonly sourceText: typeof GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_TEXT | null;
  readonly authority: 'research_only';
}

export function admitResolvedCanonicalYinToYinshouCategory(
  fact: FactState<TenGod>,
): CanonicalYinshouCategoryMemberEvaluation {
  if (fact.status === 'ambiguous') {
    return Object.freeze({
      state: 'canonical_ten_god_ambiguous',
      inputStatus: fact.status,
      canonicalLabel: null,
      sourceLabel: null,
      sourceCategory: null,
      membershipObserved: false,
      sourceText: null,
      authority: 'research_only',
    });
  }

  if (fact.status === 'unavailable') {
    return Object.freeze({
      state: 'canonical_ten_god_unavailable',
      inputStatus: fact.status,
      canonicalLabel: null,
      sourceLabel: null,
      sourceCategory: null,
      membershipObserved: false,
      sourceText: null,
      authority: 'research_only',
    });
  }

  if (fact.value === '정인' || fact.value === '편인') {
    return Object.freeze({
      state: 'yinshou_source_category_member_observed',
      inputStatus: fact.status,
      canonicalLabel: fact.value,
      sourceLabel: canonicalYinTenGodToHanjaLabel(fact.value),
      sourceCategory: '印綬',
      membershipObserved: true,
      sourceText: GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_TEXT,
      authority: 'research_only',
    });
  }

  return Object.freeze({
    state: 'resolved_outside_authorized_yin_label_scope',
    inputStatus: fact.status,
    canonicalLabel: fact.value,
    sourceLabel: null,
    sourceCategory: null,
    membershipObserved: false,
    sourceText: null,
    authority: 'research_only',
  });
}

const canonicalTenGodRawPathGoverned =
  GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW.governedRawFactPaths.includes(
    'derivedFacts.tenGods',
  );

export const GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_UNAUTHORIZED_DERIVATIONS =
  Object.freeze([
    'resolved_non_yin_ten_god_to_universal_non_yinshou_verdict',
    'whole_chart_yin_scan',
    'whole_chart_yin_count',
    'pillar_position_selection',
    'branch_ten_god_scan',
    'hidden_stem_ten_god_scan',
    'canonical_ten_god_recomputation',
    'yinshou_category_member_to_dang_zhong_support_constituent',
    'single_yin_to_dang_zhong',
    'multiple_yin_to_dang_zhong',
    'yin_absence_to_zhu_gua',
    'yinshou_to_final_qiang',
    'yinshou_category_member_to_ordinary_strength',
    'yinshou_category_member_to_numeric_strength',
    'yinshou_category_member_to_nonnumeric_strength_scalar',
    'yinshou_category_member_to_geju_candidate',
    'yinshou_category_member_to_geju_establishment',
    'yinshou_category_member_to_production_fact',
  ] as const);

export const GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_DEFINITION_HASH = createHash(
  'sha256',
)
  .update(
    JSON.stringify({
      version: GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_VERSION,
      scope: GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_SCOPE,
      decision: GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_DECISION,
      source: GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_SOURCE,
      sourceText: GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_TEXT,
      sourceCategory: '印綬',
      canonicalTenGodRawPathGoverned,
      upstreamSourceCategoryVersion:
        GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_VERSION,
      upstreamSourceCategoryDefinitionHash:
        GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_DEFINITION_HASH,
      upstreamCanonicalYinHanjaBridgeVersion:
        GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_BRIDGE_VERSION,
      upstreamCanonicalYinHanjaBridgeDefinitionHash:
        GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_BRIDGE_DEFINITION_HASH,
      admittedCanonicalLabels: ['정인', '편인'],
      admittedSourceLabels: ['正印', '偏印'],
      singleFactOnly: true,
      ambiguousUnavailableFailClosed: true,
      chartScanAuthorized: false,
      yinCountAuthorized: false,
      yinshouToDangZhongSupportConstituentAuthorized: false,
      unauthorizedDerivations:
        GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_UNAUTHORIZED_DERIVATIONS,
      productionFactEmissionAuthorized: false,
    }),
  )
  .digest('hex');

export const GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_VERSION,
  definitionHash: GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_DEFINITION_HASH,
  decision: GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_DECISION,
  source: GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_SOURCE,
  sourceText: GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_TEXT,
  sourceCategory: '印綬' as const,
  upstreamSourceCategoryVersion:
    GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_VERSION,
  upstreamSourceCategoryDefinitionHash:
    GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_DEFINITION_HASH,
  upstreamCanonicalYinHanjaBridgeVersion:
    GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_BRIDGE_VERSION,
  upstreamCanonicalYinHanjaBridgeDefinitionHash:
    GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_BRIDGE_DEFINITION_HASH,
  canonicalTenGodRawPathGoverned,
  singleFactInputOnly: true,
  resolvedJeonginToYinshouCategoryMemberAuthorizedResearchOnly: true,
  resolvedPyeoninToYinshouCategoryMemberAuthorizedResearchOnly: true,
  ambiguousUnavailableFailClosed: true,
  resolvedOtherTenGodUniversalNonYinshouVerdictAuthorized: false,
  pillarPositionSelectionAuthorized: false,
  wholeChartYinScanAuthorized: false,
  wholeChartYinCountAuthorized: false,
  branchTenGodScanAuthorized: false,
  hiddenStemTenGodScanAuthorized: false,
  canonicalTenGodRecomputationAuthorized: false,
  yinshouToDangZhongSupportConstituentAuthorized: false,
  yinshouCounterAuthorized: false,
  dangZhongCounterAuthorized: false,
  dangZhongThresholdAuthorized: false,
  dangZhongBooleanResolverAuthorized: false,
  zhuGuaCounterAuthorized: false,
  zhuGuaBooleanResolverAuthorized: false,
  chartLevelQiangRuoClassifierAuthorized: false,
  chartLevelWangShuaiClassifierAuthorized: false,
  numericStrengthAuthorized: false,
  nonNumericStrengthScalarAuthorized: false,
  candidateDerivationAuthorized: false,
  establishmentPredicateAuthorized: false,
  candidateFactsEmitted: false,
  establishmentFactsEmitted: false,
  productionFactEmissionAuthorized: false,
  unauthorizedDerivations:
    GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'The selected source directly places the 正/偏 variants of 印 inside the 印綬 discussion, while the separately governed pinned-vocabulary bridge maps the already-canonical labels 정인 and 편인 to 正印 and 偏印. This authority therefore admits only one already-supplied resolved FactState<TenGod> whose value is 정인 or 편인 as a research-only 印綬 source-category member. Ambiguous and unavailable facts fail closed, and other resolved Ten-Gods remain merely outside this bounded authority rather than becoming generalized non-印綬 verdicts. No pillar selection, chart scan/count, Ten-God recomputation, 黨眾 support constituent, 助寡 decision, final 旺衰/強弱, strength scalar, Gyeokguk, or Production authority is created.',
});
