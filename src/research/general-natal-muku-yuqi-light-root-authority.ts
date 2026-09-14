import { createHash } from 'node:crypto';
import {
  HIDDEN_STEM_MEMBERSHIP_CONTENT_HASH,
  HIDDEN_STEM_MEMBERSHIP_VERSION,
} from '../calculation/hidden-stems.js';
import type { EarthlyBranch, FiveElement, StemFact } from '../contracts/calculation.js';
import {
  GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW,
  GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
} from './general-natal-geju-root-weight-classification-primitive-authority-review.js';

export const GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_VERSION = '0.1.0-research' as const;
export const GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_SCOPE =
  'muku_yuqi_four_element_light_root_mapping_with_earth_boundary' as const;
export const GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export const GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_SOURCES = Object.freeze([
  Object.freeze({
    title: '子平真詮 / 子平真詮評註',
    section: '論十干得時不旺失時不弱',
    url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
    accessedAt: '2026-09-14',
    sourceType: 'classical_transcription_with_commentary',
  }),
  Object.freeze({
    title: '子平真詮 / 子平真詮評註',
    section: '論陰陽生死',
    url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_03.htm',
    accessedAt: '2026-09-14',
    sourceType: 'classical_transcription_with_commentary',
  }),
] as const);

export const GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_SOURCE_OBSERVATIONS = Object.freeze([
  Object.freeze({
    observation: '墓庫餘氣，根之輕者也',
    authority: 'direct_source_light_root_semantic' as const,
  }),
  Object.freeze({
    observation: '未為木庫，戌為火庫，辰為水庫，丑為金庫',
    authority: 'direct_commentary_four_element_muku_mapping' as const,
  }),
  Object.freeze({
    observation: '辰為木之餘氣，未為火之餘氣，戌為金之餘氣，丑為水之餘氣',
    authority: 'direct_commentary_four_element_yuqi_mapping' as const,
  }),
  Object.freeze({
    observation: '不能通用，與長生祿旺同，餘氣亦然',
    authority: 'direct_commentary_non_interchangeability_semantic' as const,
  }),
  Object.freeze({
    observation: '墓本從五行論，不分陰陽',
    authority: 'direct_commentary_element_level_no_yinyang_split' as const,
  }),
  Object.freeze({
    observation: '土為本氣，無所謂庫',
    authority: 'direct_commentary_earth_muku_non_applicability' as const,
  }),
] as const);

export type NonEarthFiveElement = Exclude<FiveElement, '토'>;

export interface MukuYuqiLightRootMapping {
  readonly muku: EarthlyBranch;
  readonly yuqi: EarthlyBranch;
}

export const GENERAL_NATAL_MUKU_YUQI_FOUR_ELEMENT_MAPPING: Readonly<
  Record<NonEarthFiveElement, MukuYuqiLightRootMapping>
> = Object.freeze({
  목: Object.freeze({ muku: '미', yuqi: '진' }),
  화: Object.freeze({ muku: '술', yuqi: '미' }),
  금: Object.freeze({ muku: '축', yuqi: '술' }),
  수: Object.freeze({ muku: '진', yuqi: '축' }),
});

export type MukuYuqiLightRootState =
  | 'muku_light_root_established'
  | 'yuqi_light_root_established'
  | 'no_governed_light_root_match'
  | 'earth_boundary_unresolved';

export interface MukuYuqiLightRootEvaluation {
  readonly element: FiveElement;
  readonly branch: EarthlyBranch;
  readonly lightRootState: MukuYuqiLightRootState;
  readonly authority: 'research_only';
}

export function evaluateMukuYuqiLightRoot(
  dayMaster: Pick<StemFact, 'element'>,
  branch: EarthlyBranch,
): MukuYuqiLightRootEvaluation {
  if (dayMaster.element === '토') {
    return Object.freeze({
      element: dayMaster.element,
      branch,
      lightRootState: 'earth_boundary_unresolved',
      authority: 'research_only',
    });
  }

  const mapping = GENERAL_NATAL_MUKU_YUQI_FOUR_ELEMENT_MAPPING[dayMaster.element];
  if (branch === mapping.muku) {
    return Object.freeze({
      element: dayMaster.element,
      branch,
      lightRootState: 'muku_light_root_established',
      authority: 'research_only',
    });
  }
  if (branch === mapping.yuqi) {
    return Object.freeze({
      element: dayMaster.element,
      branch,
      lightRootState: 'yuqi_light_root_established',
      authority: 'research_only',
    });
  }

  return Object.freeze({
    element: dayMaster.element,
    branch,
    lightRootState: 'no_governed_light_root_match',
    authority: 'research_only',
  });
}

export const GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_UNAUTHORIZED_DERIVATIONS = Object.freeze([
  'hidden_stem_array_order_as_yuqi',
  'hidden_stem_membership_as_complete_root_class',
  'twelve_growth_mu_to_muku_equivalence',
  'earth_yuqi_mapping_invention',
  'muku_yuqi_to_numeric_weight',
  'light_root_to_ordinary_strength',
  'light_root_to_generalized_root_weight_classifier',
  'light_root_to_geju_candidate',
  'light_root_to_geju_establishment',
  'light_root_to_production_fact',
] as const);

export const GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_DEFINITION_HASH = createHash('sha256')
  .update(
    JSON.stringify({
      version: GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_VERSION,
      scope: GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_SCOPE,
      decision: GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_DECISION,
      sources: GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_SOURCES,
      sourceObservations: GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_SOURCE_OBSERVATIONS,
      mapping: GENERAL_NATAL_MUKU_YUQI_FOUR_ELEMENT_MAPPING,
      upstreamRootWeightReviewVersion:
        GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW.reviewVersion,
      upstreamRootWeightReviewDefinitionHash:
        GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
      hiddenStemMembershipVersion: HIDDEN_STEM_MEMBERSHIP_VERSION,
      hiddenStemMembershipContentHash: HIDDEN_STEM_MEMBERSHIP_CONTENT_HASH,
      earthYuqiMappingResolved: false,
      unauthorizedDerivations: GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_UNAUTHORIZED_DERIVATIONS,
    }),
  )
  .digest('hex');

export const GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_VERSION,
  definitionHash: GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_DEFINITION_HASH,
  decision: GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_DECISION,
  upstreamRootWeightReviewVersion:
    GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW.reviewVersion,
  upstreamRootWeightReviewDefinitionHash:
    GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
  hiddenStemMembershipVersion: HIDDEN_STEM_MEMBERSHIP_VERSION,
  hiddenStemMembershipContentHash: HIDDEN_STEM_MEMBERSHIP_CONTENT_HASH,
  canonicalInputUsesStemFactElement: true,
  canonicalInputUsesEarthlyBranch: true,
  hiddenStemMembershipConsumedByMatcher: false,
  hiddenStemArrayOrderConsumedByMatcher: false,
  directSourceMukuYuqiLightRootSemanticObserved: true,
  directSourceFourElementMukuMappingObserved: true,
  directSourceFourElementYuqiMappingObserved: true,
  directSourceElementLevelNoYinYangSplitObserved: true,
  directSourceEarthMukuNonApplicabilityObserved: true,
  earthYuqiMappingResolved: false,
  nonEarthMukuYuqiMatcherAuthorizedResearchOnly: true,
  completeFiveElementMukuYuqiMappingAuthorized: false,
  twelveGrowthMuToMukuEquivalenceAuthorized: false,
  generalizedRootWeightClassifierAuthorized: false,
  numericRootWeightAuthorized: false,
  ordinaryStrengthClassificationAuthorized: false,
  candidateDerivationAuthorized: false,
  establishmentPredicateAuthorized: false,
  candidateFactsEmitted: false,
  establishmentFactsEmitted: false,
  productionFactEmissionAuthorized: false,
  unauthorizedDerivations: GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'The selected 子平真詮 / 子平真詮評註 authority chain directly supplies light-root semantics plus four-element 墓庫 and 餘氣 mappings, and states that 墓 is treated at the element level without a Yin/Yang split. The matcher therefore consumes only canonical StemFact.element and EarthlyBranch. Earth remains fail-closed because the source rejects a 土 墓庫 in this framing while no complete 土 餘氣 mapping is directly governed. Hidden-stem membership/order, 十二長生 墓, numeric weight, ordinary strength, generalized root-weight classification, Gyeokguk candidate/establishment, and production emission remain unauthorized.',
});
