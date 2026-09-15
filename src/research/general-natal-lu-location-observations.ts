import { createHash } from 'node:crypto';
import type { EarthlyBranch, FiveElement } from '../contracts/calculation.js';
import {
  GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_AUTHORITY,
  GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_DEFINITION_HASH,
} from './general-natal-root-term-binding-authority.js';

export const GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_VERSION = '0.1.0-research' as const;
export const GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_SCOPE =
  'four_element_lu_location_observations_with_earth_attachment_boundary' as const;
export const GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_DECISION =
  'AUTHORIZED_OBSERVATION_ONLY' as const;

export const GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_SOURCE = Object.freeze({
  title: '子平真詮 / 子平真詮評註',
  sections: Object.freeze(['論十干十二支', '論陰陽生死', '論十干得時不旺失時不弱', '論刑沖會合解法']),
  urls: Object.freeze([
    'https://www.ncc.com.tw/fate/paleo/bg/bg_03.htm',
    'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
  ]),
  accessedAt: '2026-09-15',
  sourceType: 'classical_transcription_with_commentary',
});

export const GENERAL_NATAL_LU_LOCATION_SOURCE_OBSERVATIONS = Object.freeze([
  Object.freeze({
    id: 'lu_heavy_root_semantic',
    observation: '長生祿旺，根之重者也',
    authority: 'direct_selected_source_semantic' as const,
  }),
  Object.freeze({
    id: 'lu_linguan_term_identity',
    observation: '祿臨官也',
    authority: 'direct_selected_source_term_identity' as const,
  }),
  Object.freeze({
    id: 'four_lu_scope',
    observation: '寅申巳亥，稱為四生（亦是四祿）之地',
    authority: 'direct_selected_source_scope' as const,
  }),
  Object.freeze({
    id: 'fire_water_lu_and_metal_wood_analogy',
    observation: '巳為火之祿，亥為水之祿，與午子相去一間耳。金木可以類推。',
    authority: 'direct_selected_source_mapping_and_directed_analogy' as const,
  }),
  Object.freeze({
    id: 'bounded_wood_stem_anchor',
    observation: '甲祿於寅，乙祿於卯',
    authority: 'direct_selected_source_stem_level_tension_anchor' as const,
  }),
  Object.freeze({
    id: 'earth_attachment_boundary',
    observation: '土居中央，寄於四隅。附火而生，生於寅，祿於巳；附水而生，生於申，祿於亥。',
    authority: 'direct_selected_source_earth_multi_attachment_boundary' as const,
  }),
] as const);

type NonEarthFiveElement = Exclude<FiveElement, '토'>;

export const GENERAL_NATAL_FOUR_ELEMENT_DOCTRINAL_LU_LOCATION_MAPPING = Object.freeze({
  목: '인',
  화: '사',
  금: '신',
  수: '해',
} as const satisfies Readonly<Record<NonEarthFiveElement, EarthlyBranch>>);

export const GENERAL_NATAL_FOUR_ELEMENT_LU_LOCATION_EVIDENCE = Object.freeze({
  목: Object.freeze({
    branch: '인' as const,
    basis: 'bounded_甲祿於寅_anchor_plus_selected_source_five_element_four_lu_doctrine' as const,
  }),
  화: Object.freeze({
    branch: '사' as const,
    basis: 'direct_巳為火之祿' as const,
  }),
  금: Object.freeze({
    branch: '신' as const,
    basis: 'selected_source_金木可以類推_with_four_lu_scope_and_remaining_corner' as const,
  }),
  수: Object.freeze({
    branch: '해' as const,
    basis: 'direct_亥為水之祿' as const,
  }),
});

export const GENERAL_NATAL_EARTH_LU_ATTACHMENT_BOUNDARY = Object.freeze({
  fireAttachedLu: Object.freeze({
    branch: '사' as const,
    sourceAnchor: '附火而生，生於寅，祿於巳',
  }),
  waterAttachedLu: Object.freeze({
    branch: '해' as const,
    sourceAnchor: '附水而生，生於申，祿於亥',
  }),
  singleFixedLuLocationResolved: false,
  canonicalElementAndBranchSufficientToSelectAttachment: false,
  attachmentSelectionRuleAuthorized: false,
});

export const GENERAL_NATAL_LU_LOCATION_UNAUTHORIZED_DERIVATIONS = Object.freeze([
  'four_element_doctrinal_location_to_same_element_yin_yang_stem_matcher',
  'wood_doctrinal_location_to_yi_lu_override',
  'metal_doctrinal_location_to_xin_lu_override',
  'fire_doctrinal_location_to_ding_lu_override',
  'water_doctrinal_location_to_gui_lu_override',
  'earth_attachment_observation_to_single_fixed_lu_location',
  'earth_element_and_branch_to_attachment_selection_rule',
  'mingli_tanyuan_twelve_growth_stage_cell_to_selected_source_lu',
  'doctrinal_lu_location_to_heavy_root_stem_match',
  'lu_location_to_numeric_weight',
  'lu_location_to_ordinary_strength',
  'lu_location_to_geju_candidate',
  'lu_location_to_geju_establishment',
  'lu_location_to_production_fact',
] as const);

export const GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_DEFINITION_HASH = createHash('sha256')
  .update(
    JSON.stringify({
      version: GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_VERSION,
      scope: GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_SCOPE,
      decision: GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_DECISION,
      source: GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_SOURCE,
      observations: GENERAL_NATAL_LU_LOCATION_SOURCE_OBSERVATIONS,
      mapping: GENERAL_NATAL_FOUR_ELEMENT_DOCTRINAL_LU_LOCATION_MAPPING,
      mappingEvidence: GENERAL_NATAL_FOUR_ELEMENT_LU_LOCATION_EVIDENCE,
      earthBoundary: GENERAL_NATAL_EARTH_LU_ATTACHMENT_BOUNDARY,
      upstreamLuLinguanDefinitionHash: GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_DEFINITION_HASH,
      sourceInternalYinLuInterpretation:
        GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_AUTHORITY.sourceInternalYinLuInterpretation,
      unauthorizedDerivations: GENERAL_NATAL_LU_LOCATION_UNAUTHORIZED_DERIVATIONS,
      stemLevelLuBranchMatcherAuthorized: false,
      luHeavyRootStemMatcherAuthorized: false,
      foreignTwelveGrowthMappingConsumedAsLuInput: false,
    }),
  )
  .digest('hex');

export const GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_VERSION,
  definitionHash: GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_DEFINITION_HASH,
  decision: GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_DECISION,
  upstreamLuLinguanVersion: GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_AUTHORITY.version,
  upstreamLuLinguanDefinitionHash: GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_DEFINITION_HASH,
  directSourceLuHeavyRootSemanticObserved:
    GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_AUTHORITY.luHeavyRootTermSemanticObservedUpstream,
  directSourceLuLinguanTermEquivalenceObserved:
    GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_AUTHORITY.directSourceLuLinguanTermEquivalenceObserved,
  directSourceFourLuLocationScopeObserved: true,
  directSourceFireLuLocationObserved: true,
  directSourceWaterLuLocationObserved: true,
  directSourceMetalWoodAnalogyObserved: true,
  directSourceEarthMultiAttachmentBoundaryObserved: true,
  fourElementDoctrinalLuLocationRegistryAuthorizedObservationOnly: true,
  earthSingleLuLocationResolved: false,
  earthAttachmentSelectionRuleAuthorized: false,
  sourceInternalYinLuInterpretation:
    GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_AUTHORITY.sourceInternalYinLuInterpretation,
  sourceInternalYinLuAmbiguityPreserved: true,
  stemLevelLuBranchMatcherAuthorized: false,
  luHeavyRootStemMatcherAuthorized: false,
  foreignTwelveGrowthMappingConsumedAsLuInput: false,
  crossTraditionCompositionAuthorized: false,
  chartFactsConsumed: false,
  generalizedRootWeightClassifierAuthorized: false,
  numericRootWeightAuthorized: false,
  ordinaryStrengthClassificationAuthorized: false,
  candidateDerivationAuthorized: false,
  establishmentPredicateAuthorized: false,
  candidateFactsEmitted: false,
  establishmentFactsEmitted: false,
  productionFactEmissionAuthorized: false,
  unauthorizedDerivations: GENERAL_NATAL_LU_LOCATION_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'The selected source supports an observation-only five-element doctrinal Lu-location surface for Wood, Fire, Metal, and Water, plus two explicit Earth attachment observations. The same source also preserves a stem-level Yin-Lu tension already governed by #559/#560. Therefore this artifact records immutable doctrinal locations only: it emits no stem/day-master matcher, no heavy-root match, consumes no foreign Twelve-Growth table, chooses no single Earth Lu branch, and grants no strength, Gyeokguk, or production authority.',
});
