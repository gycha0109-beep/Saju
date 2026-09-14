import { createHash } from 'node:crypto';
import type { EarthlyBranch, FiveElement, StemFact } from '../contracts/calculation.js';
import {
  GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW,
  GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
} from './general-natal-geju-root-weight-classification-primitive-authority-review.js';

export const GENERAL_NATAL_WANG_HEAVY_ROOT_VERSION = '0.1.0-research' as const;
export const GENERAL_NATAL_WANG_HEAVY_ROOT_SCOPE =
  'wang_four_element_heavy_root_mapping_with_earth_boundary' as const;
export const GENERAL_NATAL_WANG_HEAVY_ROOT_DECISION = 'AUTHORIZED_RESEARCH_ONLY' as const;

export const GENERAL_NATAL_WANG_HEAVY_ROOT_SOURCES = Object.freeze([
  Object.freeze({
    title: '子平真詮 / 子平真詮評註',
    section: '論十干得時不旺失時不弱',
    url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
    accessedAt: '2026-09-14',
    sourceType: 'classical_transcription_with_commentary',
  }),
  Object.freeze({
    title: '子平真詮 / 子平真詮評註',
    section: '論刑沖會合解法',
    url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
    accessedAt: '2026-09-14',
    sourceType: 'classical_transcription_with_commentary',
  }),
  Object.freeze({
    title: '子平真詮 / 子平真詮評註',
    section: '論陰陽生死 / 論十干十二支',
    url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_03.htm',
    accessedAt: '2026-09-14',
    sourceType: 'classical_transcription_with_commentary',
  }),
] as const);

export const GENERAL_NATAL_WANG_HEAVY_ROOT_SOURCE_OBSERVATIONS = Object.freeze([
  Object.freeze({
    observation: '長生祿旺，根之重者也',
    authority: 'direct_source_wang_heavy_root_semantic' as const,
  }),
  Object.freeze({
    observation: '木旺於卯；火旺於午；金旺於酉；水旺於子',
    authority: 'direct_source_four_element_wang_mapping' as const,
  }),
  Object.freeze({
    observation: '子午卯酉，為五行旺地',
    authority: 'direct_source_four_cardinal_wang_scope' as const,
  }),
  Object.freeze({
    observation:
      'The selected commentary treats this Wang discussion at the five-element level rather than requiring a separate Yin/Yang stem mapping.',
    authority: 'direct_source_element_level_scope' as const,
  }),
  Object.freeze({
    observation: '土寄旺於四時',
    authority: 'direct_source_earth_multi_season_boundary' as const,
  }),
] as const);

export type WangNonEarthFiveElement = Exclude<FiveElement, '토'>;

export const GENERAL_NATAL_WANG_FOUR_ELEMENT_MAPPING: Readonly<
  Record<WangNonEarthFiveElement, EarthlyBranch>
> = Object.freeze({
  목: '묘',
  화: '오',
  금: '유',
  수: '자',
});

export type WangHeavyRootState =
  | 'wang_heavy_root_established'
  | 'no_governed_heavy_root_match'
  | 'earth_boundary_unresolved';

export interface WangHeavyRootEvaluation {
  readonly element: FiveElement;
  readonly branch: EarthlyBranch;
  readonly heavyRootState: WangHeavyRootState;
  readonly authority: 'research_only';
}

export function evaluateWangHeavyRoot(
  dayMaster: Pick<StemFact, 'element'>,
  branch: EarthlyBranch,
): WangHeavyRootEvaluation {
  if (dayMaster.element === '토') {
    return Object.freeze({
      element: dayMaster.element,
      branch,
      heavyRootState: 'earth_boundary_unresolved',
      authority: 'research_only',
    });
  }

  if (branch === GENERAL_NATAL_WANG_FOUR_ELEMENT_MAPPING[dayMaster.element]) {
    return Object.freeze({
      element: dayMaster.element,
      branch,
      heavyRootState: 'wang_heavy_root_established',
      authority: 'research_only',
    });
  }

  return Object.freeze({
    element: dayMaster.element,
    branch,
    heavyRootState: 'no_governed_heavy_root_match',
    authority: 'research_only',
  });
}

export const GENERAL_NATAL_WANG_HEAVY_ROOT_UNAUTHORIZED_DERIVATIONS = Object.freeze([
  'twelve_growth_diwang_to_wang_root_class',
  'diwang_to_yangren_equivalence',
  'earth_fixed_wang_branch_invention',
  'hidden_stem_order_to_wang_root_class',
  'wang_to_numeric_weight',
  'wang_to_ordinary_strength',
  'wang_to_generalized_root_weight_classifier',
  'wang_to_geju_candidate',
  'wang_to_geju_establishment',
  'wang_to_production_fact',
] as const);

export const GENERAL_NATAL_WANG_HEAVY_ROOT_DEFINITION_HASH = createHash('sha256')
  .update(
    JSON.stringify({
      version: GENERAL_NATAL_WANG_HEAVY_ROOT_VERSION,
      scope: GENERAL_NATAL_WANG_HEAVY_ROOT_SCOPE,
      decision: GENERAL_NATAL_WANG_HEAVY_ROOT_DECISION,
      sources: GENERAL_NATAL_WANG_HEAVY_ROOT_SOURCES,
      sourceObservations: GENERAL_NATAL_WANG_HEAVY_ROOT_SOURCE_OBSERVATIONS,
      mapping: GENERAL_NATAL_WANG_FOUR_ELEMENT_MAPPING,
      upstreamRootWeightReviewVersion:
        GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW.reviewVersion,
      upstreamRootWeightReviewDefinitionHash:
        GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
      earthWangBranchMappingResolved: false,
      twelveGrowthStageMappingConsumedByMatcher: false,
      hiddenStemDataConsumedByMatcher: false,
      unauthorizedDerivations: GENERAL_NATAL_WANG_HEAVY_ROOT_UNAUTHORIZED_DERIVATIONS,
    }),
  )
  .digest('hex');

export const GENERAL_NATAL_WANG_HEAVY_ROOT_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_WANG_HEAVY_ROOT_VERSION,
  definitionHash: GENERAL_NATAL_WANG_HEAVY_ROOT_DEFINITION_HASH,
  decision: GENERAL_NATAL_WANG_HEAVY_ROOT_DECISION,
  upstreamRootWeightReviewVersion:
    GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW.reviewVersion,
  upstreamRootWeightReviewDefinitionHash:
    GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
  canonicalInputUsesStemFactElement: true,
  canonicalInputUsesEarthlyBranch: true,
  directSourceWangHeavyRootSemanticObserved: true,
  directSourceFourElementWangMappingObserved: true,
  directSourceFourCardinalWangScopeObserved: true,
  directSourceElementLevelNoYinYangSplitObserved: true,
  directSourceEarthJiwangMultiSeasonBoundaryObserved: true,
  earthWangBranchMappingResolved: false,
  nonEarthWangHeavyRootMatcherAuthorizedResearchOnly: true,
  completeFiveElementWangMappingAuthorized: false,
  twelveGrowthStageMappingConsumedByMatcher: false,
  twelveGrowthDiwangToWangEquivalenceAuthorized: false,
  diwangToYangrenEquivalenceAuthorized: false,
  hiddenStemDataConsumedByMatcher: false,
  generalizedRootWeightClassifierAuthorized: false,
  numericRootWeightAuthorized: false,
  ordinaryStrengthClassificationAuthorized: false,
  candidateDerivationAuthorized: false,
  establishmentPredicateAuthorized: false,
  candidateFactsEmitted: false,
  establishmentFactsEmitted: false,
  productionFactEmissionAuthorized: false,
  unauthorizedDerivations: GENERAL_NATAL_WANG_HEAVY_ROOT_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'The selected 子平真詮 / 子平真詮評註 authority chain directly supplies the Wang heavy-root semantic and a four-element Wang branch mapping: Wood-Mao, Fire-Wu, Metal-You, Water-Zi. The matcher consumes only canonical StemFact.element and EarthlyBranch. Earth remains fail-closed because the same source describes Earth as seasonally lodged rather than supplying one governed fixed Wang branch. The separate #548 Twelve-Growth stage table is not consumed, so 帝旺 is not converted to 旺 or 刃. Numeric weight, ordinary strength, generalized root-weight classification, Gyeokguk candidate/establishment, and production emission remain unauthorized.',
});
