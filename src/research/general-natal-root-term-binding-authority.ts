import { createHash } from 'node:crypto';
import {
  GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW,
  GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
} from './general-natal-geju-root-weight-classification-primitive-authority-review.js';

export const GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_VERSION = '0.1.0-research' as const;
export const GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_SCOPE =
  'ziping_zhenquan_selected_source_lu_linguan_term_binding' as const;
export const GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export const GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_SOURCE = Object.freeze({
  title: '子平真詮 / 子平真詮評註',
  sections: Object.freeze(['論十干十二支', '論陰陽生死']),
  url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_03.htm',
  accessedAt: '2026-09-14',
  sourceType: 'classical_transcription_with_commentary',
});

export const GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_SOURCE_OBSERVATIONS = Object.freeze([
  Object.freeze({
    observation: '祿臨官也',
    authority: 'direct_selected_source_term_identity' as const,
  }),
  Object.freeze({
    observation: '甲祿於寅，乙祿於卯',
    authority: 'bounded_selected_source_lu_examples' as const,
  }),
  Object.freeze({
    observation:
      'The same commentary frames the relevant growth/root doctrine at the five-element level and rejects silently treating a separate Yin-stem Lu doctrine as independently settled.',
    authority: 'direct_selected_source_yin_lu_boundary' as const,
  }),
  Object.freeze({
    observation:
      'The selected-source page also preserves a ten-stem forward/reverse growth-stage chart surface.',
    authority: 'direct_selected_source_surface_observation' as const,
  }),
] as const);

export const GENERAL_NATAL_LU_LINGUAN_CROSS_TRADITION_BOUNDARY = Object.freeze({
  foreignMappingArtifact: '#547/#548 general-natal-twelve-growth-stage-mapping-authority',
  foreignSelectedSource: '命理探源',
  foreignMappingConsumedAsLuInput: false,
  compositionAuthorized: false,
  reason:
    'The executable #548 stage table has a different selected source. Combining its cells with this selected-source terminology to produce a complete Lu matcher is not governed.',
});

export const GENERAL_NATAL_LU_LINGUAN_UNAUTHORIZED_DERIVATIONS = Object.freeze([
  'foreign_stage_cell_to_selected_source_lu',
  'bounded_jia_yi_examples_to_complete_ten_stem_lu_mapping',
  'yin_reverse_growth_table_to_heavy_root_lu',
  'linguan_to_lu_across_all_source_traditions',
  'lu_to_numeric_weight',
  'lu_to_ordinary_strength',
  'lu_to_geju_candidate',
  'lu_to_geju_establishment',
  'lu_to_production_fact',
] as const);

export const GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_DEFINITION_HASH = createHash('sha256')
  .update(
    JSON.stringify({
      version: GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_VERSION,
      scope: GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_SCOPE,
      decision: GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_DECISION,
      source: GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_SOURCE,
      sourceObservations: GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_SOURCE_OBSERVATIONS,
      upstreamRootWeightReviewVersion:
        GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW.reviewVersion,
      upstreamRootWeightReviewDefinitionHash:
        GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
      crossTraditionBoundary: GENERAL_NATAL_LU_LINGUAN_CROSS_TRADITION_BOUNDARY,
      sourceInternalYinLuInterpretation: 'AMBIGUOUS',
      completeLuBranchMatcherAuthorized: false,
      unauthorizedDerivations: GENERAL_NATAL_LU_LINGUAN_UNAUTHORIZED_DERIVATIONS,
    }),
  )
  .digest('hex');

export const GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_VERSION,
  definitionHash: GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_DEFINITION_HASH,
  decision: GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_DECISION,
  upstreamRootWeightReviewVersion:
    GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW.reviewVersion,
  upstreamRootWeightReviewDefinitionHash:
    GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
  directSourceLuLinguanTermEquivalenceObserved: true,
  directSourceBoundedJiaYiLuExamplesObserved: true,
  directSourceFiveElementNoSeparateYinLuDoctrineObserved: true,
  directSourceTenStemReverseTablePresent: true,
  sourceInternalYinLuInterpretation: 'AMBIGUOUS' as const,
  selectedSourceLuLinguanTermBindingAuthorizedResearchOnly: true,
  selectedSourceCompleteLuBranchMatcherAuthorized: false,
  canonicalStemBranchInputsAvailable: true,
  canonicalRepresentabilitySufficientForMatcher: false,
  foreignStageMappingConsumedAsLuInput: false,
  crossTraditionCompositionAuthorized: false,
  generalizedLinguanToLuAcrossTraditionsAuthorized: false,
  boundedJiaYiExamplesPromotedToGeneralMapping: false,
  yinStemReverseGrowthLuPromotedToHeavyRoot: false,
  luHeavyRootTermSemanticObservedUpstream:
    GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW.sourceNativeHeavyRootClassObserved,
  generalizedRootWeightClassifierAuthorized: false,
  numericStrengthAuthorized: false,
  ordinaryStrengthClassificationAuthorized: false,
  candidateDerivationAuthorized: false,
  establishmentPredicateAuthorized: false,
  candidateFactsEmitted: false,
  establishmentFactsEmitted: false,
  productionFactEmissionAuthorized: false,
  unauthorizedDerivations: GENERAL_NATAL_LU_LINGUAN_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'The selected source directly identifies Lu with Linguan and supplies bounded Jia/Yi Lu examples. The same commentary leaves a source-internal Yin-Lu interpretation boundary that this artifact preserves as ambiguous. No foreign stage table is consumed, no stem-branch Lu matcher is emitted, and no root-weight, strength, Gyeokguk, or production authority is generalized.',
});
