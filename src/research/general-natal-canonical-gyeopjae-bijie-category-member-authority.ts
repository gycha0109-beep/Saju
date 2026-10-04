import { createHash } from 'node:crypto';
import type { FactState } from '../contracts/common.js';
import type { TenGod } from '../contracts/calculation.js';
import { GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW } from './general-natal-geju-source-example-canonical-input-binding-review.js';
import {
  canonicalGyeopjaeTenGodToHanjaLabel,
  GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_BRIDGE_AUTHORITY,
  GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_BRIDGE_DEFINITION_HASH,
  GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_BRIDGE_VERSION,
} from './general-natal-canonical-gyeopjae-hanja-label-bridge-authority.js';

export const GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_SCOPE =
  'resolved_canonical_gyeopjae_to_bijie_source_category_member' as const;
export const GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export const GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_SOURCE =
  Object.freeze({
    title: '千里命稿',
    section: '比劫祿刃篇',
    url: 'https://libokang.com/zh-hant/guji/bazi/%E5%8D%83%E9%87%8C%E5%91%BD%E7%A8%BF/4/',
    accessedAt: '2026-10-04' as const,
    sourceType: 'traditional_text_transcription' as const,
  });

export const GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_SOURCE_TEXT =
  '茲再述比肩劫財之損益如後' as const;

export const GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_SOURCE_OBSERVATIONS =
  Object.freeze([
    Object.freeze({
      id: 'bijie_section_heading',
      observation:
        'the selected source section heading uses 比劫 as the governing category label' as const,
    }),
    Object.freeze({
      id: 'bijian_jiecai_body_members',
      sourceText:
        GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_SOURCE_TEXT,
      observation:
        'the same section body explicitly names 比肩 and 劫財 together as the members discussed under that heading' as const,
    }),
  ] as const);

export type CanonicalGyeopjaeBijieCategoryMemberState =
  | 'bijie_source_category_member_observed'
  | 'resolved_outside_authorized_gyeopjae_label_scope'
  | 'canonical_ten_god_ambiguous'
  | 'canonical_ten_god_unavailable';

export interface CanonicalGyeopjaeBijieCategoryMemberEvaluation {
  readonly state: CanonicalGyeopjaeBijieCategoryMemberState;
  readonly inputStatus: FactState<TenGod>['status'];
  readonly canonicalLabel: TenGod | null;
  readonly sourceLabel: '劫財' | null;
  readonly sourceCategory: '比劫' | null;
  readonly membershipObserved: boolean;
  readonly sourceText:
    | typeof GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_SOURCE_TEXT
    | null;
  readonly authority: 'research_only';
}

export function admitResolvedCanonicalGyeopjaeToBijieCategory(
  fact: FactState<TenGod>,
): CanonicalGyeopjaeBijieCategoryMemberEvaluation {
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

  if (fact.value === '겁재') {
    return Object.freeze({
      state: 'bijie_source_category_member_observed',
      inputStatus: fact.status,
      canonicalLabel: fact.value,
      sourceLabel: canonicalGyeopjaeTenGodToHanjaLabel(fact.value),
      sourceCategory: '比劫',
      membershipObserved: true,
      sourceText:
        GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_SOURCE_TEXT,
      authority: 'research_only',
    });
  }

  return Object.freeze({
    state: 'resolved_outside_authorized_gyeopjae_label_scope',
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

export const GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_UNAUTHORIZED_DERIVATIONS =
  Object.freeze([
    'global_jiecai_bijie_string_alias',
    'resolved_non_gyeopjae_to_universal_non_bijie_verdict',
    'pillar_position_selection',
    'whole_chart_jiecai_scan',
    'whole_chart_jiecai_count',
    'branch_ten_god_scan',
    'hidden_stem_ten_god_scan',
    'canonical_ten_god_recomputation',
    'bijie_category_member_to_dang_zhong_without_separate_bridge',
    'bijian_plus_jiecai_aggregation',
    'complete_bijie_collection',
    'single_bijie_member_to_dang_zhong',
    'multiple_bijie_members_to_dang_zhong',
    'jiecai_absence_to_zhu_gua',
    'bijie_member_to_final_qiang',
    'bijie_member_to_final_qiang_ruo',
    'bijie_member_to_final_wang_shuai',
    'bijie_member_to_numeric_strength',
    'bijie_member_to_geju_candidate',
    'bijie_member_to_geju_establishment',
    'bijie_member_to_production_fact',
  ] as const);

export const GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version:
          GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_VERSION,
        scope: GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_SCOPE,
        decision:
          GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_DECISION,
        source:
          GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_SOURCE,
        sourceText:
          GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_SOURCE_TEXT,
        sourceObservations:
          GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_SOURCE_OBSERVATIONS,
        canonicalTenGodRawPathGoverned,
        upstreamCanonicalGyeopjaeHanjaBridgeVersion:
          GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_BRIDGE_VERSION,
        upstreamCanonicalGyeopjaeHanjaBridgeDefinitionHash:
          GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_BRIDGE_DEFINITION_HASH,
        upstreamCanonicalGyeopjaeToJiecaiLabelAuthorized:
          GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_BRIDGE_AUTHORITY
            .canonicalGyeopjaeToJiecaiLabelAuthorizedResearchOnly,
        admittedCanonicalLabels: ['겁재'],
        admittedSourceLabels: ['劫財'],
        sourceCategory: '比劫',
        singleFactOnly: true,
        ambiguousUnavailableFailClosed: true,
        globalJiecaiBijieStringAliasAuthorized: false,
        wholeChartJiecaiScanAuthorized: false,
        jiecaiCountAuthorized: false,
        unauthorizedDerivations:
          GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_UNAUTHORIZED_DERIVATIONS,
        productionFactEmissionAuthorized: false,
      }),
    )
    .digest('hex');

export const GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_AUTHORITY =
  Object.freeze({
    version:
      GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_VERSION,
    definitionHash:
      GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_DEFINITION_HASH,
    decision:
      GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_DECISION,
    source: GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_SOURCE,
    sourceText:
      GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_SOURCE_TEXT,
    sourceCategory: '比劫' as const,
    upstreamCanonicalGyeopjaeHanjaBridgeVersion:
      GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_BRIDGE_VERSION,
    upstreamCanonicalGyeopjaeHanjaBridgeDefinitionHash:
      GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_BRIDGE_DEFINITION_HASH,
    canonicalTenGodRawPathGoverned,
    singleFactInputOnly: true,
    resolvedGyeopjaeToBijieCategoryMemberAuthorizedResearchOnly: true,
    ambiguousUnavailableFailClosed: true,
    globalJiecaiBijieStringAliasAuthorized: false,
    resolvedOtherTenGodUniversalNonBijieVerdictAuthorized: false,
    pillarPositionSelectionAuthorized: false,
    wholeChartJiecaiScanAuthorized: false,
    wholeChartJiecaiCountAuthorized: false,
    branchTenGodScanAuthorized: false,
    hiddenStemTenGodScanAuthorized: false,
    canonicalTenGodRecomputationAuthorized: false,
    bijianJiecaiAggregationAuthorized: false,
    completeBijieCollectionAuthorized: false,
    bijieToDangZhongSupportConstituentAuthorized: false,
    jiecaiCounterAuthorized: false,
    dangZhongCounterAuthorized: false,
    dangZhongThresholdAuthorized: false,
    dangZhongBooleanResolverAuthorized: false,
    zhuGuaCounterAuthorized: false,
    zhuGuaBooleanResolverAuthorized: false,
    chartLevelQiangRuoClassifierAuthorized: false,
    chartLevelWangShuaiClassifierAuthorized: false,
    numericStrengthAuthorized: false,
    candidateDerivationAuthorized: false,
    establishmentPredicateAuthorized: false,
    productionFactEmissionAuthorized: false,
    unauthorizedDerivations:
      GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_UNAUTHORIZED_DERIVATIONS,
    authorityBoundary:
      'The selected 千里命稿 section is titled 比劫祿刃篇 and explicitly says that it will discuss 比肩 and 劫財 together. Combined with the separately governed canonical 겁재 -> 劫財 lexical bridge, this authority admits exactly one already-supplied resolved canonical 겁재 fact as a research-only 比劫 source-category member. It does not create a global 劫財/比劫 string alias, select a pillar, scan or count a chart, aggregate 比肩+劫財, establish a complete 比劫 collection, settle 黨眾/助寡 or 強弱/旺衰, derive Gyeokguk, or emit Production facts.',
  });
