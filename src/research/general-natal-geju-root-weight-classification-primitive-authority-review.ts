import { createHash } from 'node:crypto';
import {
  HIDDEN_STEM_MEMBERSHIP_CONTENT_HASH,
  HIDDEN_STEM_MEMBERSHIP_VERSION,
} from '../calculation/hidden-stems.js';
import { GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW } from './general-natal-geju-source-example-canonical-input-binding-review.js';

export const GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_SCOPE =
  'ziping_zhenquan_root_weight_classification_primitive_authority' as const;
export const GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_DECISION =
  'PARTIALLY_AUTHORIZED' as const;

const UPSTREAM_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW_DEFINITION_HASH = createHash('sha256')
  .update(JSON.stringify(GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW))
  .digest('hex');

export const GENERAL_NATAL_GEJU_ROOT_WEIGHT_SOURCE_OBSERVATIONS = Object.freeze([
  Object.freeze({
    source: '子平真詮 / 子平真詮評注 — 論十干得時不旺失時不弱',
    observation: '長生祿旺，根之重者也；墓庫餘氣，根之輕者也',
    authority: 'direct_source_semantic' as const,
  }),
  Object.freeze({
    source: '子平真詮 / 子平真詮評注 — 論十干得時不旺失時不弱',
    observation: '得一比肩，不如得支中一墓庫，如甲逢未、丙逢戌之類',
    authority: 'bounded_relative_example' as const,
  }),
  Object.freeze({
    source: '子平真詮 / 子平真詮評注 — 論十干得時不旺失時不弱',
    observation: '得二比肩，不如得一餘氣，如乙逢辰、丁逢未之類',
    authority: 'bounded_relative_example' as const,
  }),
  Object.freeze({
    source: '子平真詮 / 子平真詮評注 — 論十干得時不旺失時不弱',
    observation: '得三比肩，不如得一長生祿刃，如甲逢亥子寅卯之類',
    authority: 'bounded_relative_example' as const,
  }),
  Object.freeze({
    source: '子平真詮 / 子平真詮評注 — 論十干得時不旺失時不弱',
    observation: '陰長生不作此論，如乙逢午、丁逢酉之類，然亦為明根，比得一餘氣',
    authority: 'direct_exception_semantic' as const,
  }),
] as const);

export const GENERAL_NATAL_GEJU_ROOT_WEIGHT_CANONICAL_INPUTS = Object.freeze([
  'derivedFacts.dayMaster',
  'pillars.year.branch',
  'pillars.month.branch',
  'pillars.day.branch',
  'pillars.hour.branch',
  'derivedFacts.hiddenStems.*',
] as const);

export const GENERAL_NATAL_GEJU_ROOT_WEIGHT_MISSING_MAPPING_AUTHORITIES = Object.freeze([
  'complete_stem_branch_root_class_mapping',
  'changsheng_lu_wang_ren_term_binding',
  'yin_stem_growth_exception_generalization',
  'muku_yuqi_complete_stem_branch_mapping',
  'relative_comparison_to_non_numeric_weighting_rule',
] as const);

export const GENERAL_NATAL_GEJU_ROOT_WEIGHT_UNAUTHORIZED_DERIVATIONS = Object.freeze([
  'hidden_stem_array_position_as_root_weight',
  'hidden_stem_membership_as_complete_root_stage',
  'ungoverned_twelve_growth_table_import',
  'yin_yang_growth_symmetry_assumption',
  'bounded_example_to_all_stems_extrapolation',
  'comparative_phrase_to_numeric_score',
  'root_weight_to_ordinary_strength_equivalence',
] as const);

export interface GeneralNatalGejuRootWeightClassificationPrimitiveAuthorityReview {
  readonly reviewVersion: typeof GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_VERSION;
  readonly sourceScope: typeof GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_SCOPE;
  readonly decision: typeof GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_DECISION;
  readonly upstreamVersion: string;
  readonly upstreamDefinitionHash: string;
  readonly hiddenStemMembershipVersion: typeof HIDDEN_STEM_MEMBERSHIP_VERSION;
  readonly hiddenStemMembershipContentHash: string;
  readonly sourceObservations: typeof GENERAL_NATAL_GEJU_ROOT_WEIGHT_SOURCE_OBSERVATIONS;
  readonly canonicalInputPaths: typeof GENERAL_NATAL_GEJU_ROOT_WEIGHT_CANONICAL_INPUTS;
  readonly sourceNativeHeavyRootClassObserved: true;
  readonly sourceNativeLightRootClassObserved: true;
  readonly sourceNativeRelativeRootExamplesObserved: true;
  readonly sourceNativeYinGrowthExceptionObserved: true;
  readonly canonicalDayMasterInputAvailable: true;
  readonly canonicalBranchInputAvailable: true;
  readonly hiddenStemMembershipAvailable: true;
  readonly hiddenStemMembershipAuthorityLimitedToMembership: true;
  readonly completeStemBranchRootClassMappingAvailable: false;
  readonly generalizedRootWeightClassifierAuthorized: false;
  readonly boundedSourceExampleMatcherAuthorized: false;
  readonly ordinaryStrengthClassificationAuthorizedByThisReview: false;
  readonly candidateDerivationAuthorized: false;
  readonly establishmentPredicateAuthorized: false;
  readonly candidateFactsEmitted: false;
  readonly establishmentFactsEmitted: false;
  readonly missingMappingAuthorities: typeof GENERAL_NATAL_GEJU_ROOT_WEIGHT_MISSING_MAPPING_AUTHORITIES;
  readonly unauthorizedDerivations: typeof GENERAL_NATAL_GEJU_ROOT_WEIGHT_UNAUTHORIZED_DERIVATIONS;
  readonly authorityBoundary: string;
  readonly notes: readonly string[];
}

export const GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version: GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_VERSION,
        sourceScope: GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_SCOPE,
        decision: GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_DECISION,
        upstreamVersion: GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW.version,
        upstreamDefinitionHash:
          UPSTREAM_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW_DEFINITION_HASH,
        hiddenStemMembershipVersion: HIDDEN_STEM_MEMBERSHIP_VERSION,
        hiddenStemMembershipContentHash: HIDDEN_STEM_MEMBERSHIP_CONTENT_HASH,
        sourceObservations: GENERAL_NATAL_GEJU_ROOT_WEIGHT_SOURCE_OBSERVATIONS,
        canonicalInputPaths: GENERAL_NATAL_GEJU_ROOT_WEIGHT_CANONICAL_INPUTS,
        missingMappingAuthorities: GENERAL_NATAL_GEJU_ROOT_WEIGHT_MISSING_MAPPING_AUTHORITIES,
        unauthorizedDerivations: GENERAL_NATAL_GEJU_ROOT_WEIGHT_UNAUTHORIZED_DERIVATIONS,
        completeStemBranchRootClassMappingAvailable: false,
        generalizedRootWeightClassifierAuthorized: false,
        boundedSourceExampleMatcherAuthorized: false,
      }),
    )
    .digest('hex');

export const GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW: GeneralNatalGejuRootWeightClassificationPrimitiveAuthorityReview =
  Object.freeze({
    reviewVersion: GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_VERSION,
    sourceScope: GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_SCOPE,
    decision: GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_DECISION,
    upstreamVersion: GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW.version,
    upstreamDefinitionHash:
      UPSTREAM_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW_DEFINITION_HASH,
    hiddenStemMembershipVersion: HIDDEN_STEM_MEMBERSHIP_VERSION,
    hiddenStemMembershipContentHash: HIDDEN_STEM_MEMBERSHIP_CONTENT_HASH,
    sourceObservations: GENERAL_NATAL_GEJU_ROOT_WEIGHT_SOURCE_OBSERVATIONS,
    canonicalInputPaths: GENERAL_NATAL_GEJU_ROOT_WEIGHT_CANONICAL_INPUTS,
    sourceNativeHeavyRootClassObserved: true,
    sourceNativeLightRootClassObserved: true,
    sourceNativeRelativeRootExamplesObserved: true,
    sourceNativeYinGrowthExceptionObserved: true,
    canonicalDayMasterInputAvailable: true,
    canonicalBranchInputAvailable: true,
    hiddenStemMembershipAvailable: true,
    hiddenStemMembershipAuthorityLimitedToMembership: true,
    completeStemBranchRootClassMappingAvailable: false,
    generalizedRootWeightClassifierAuthorized: false,
    boundedSourceExampleMatcherAuthorized: false,
    ordinaryStrengthClassificationAuthorizedByThisReview: false,
    candidateDerivationAuthorized: false,
    establishmentPredicateAuthorized: false,
    candidateFactsEmitted: false,
    establishmentFactsEmitted: false,
    missingMappingAuthorities: GENERAL_NATAL_GEJU_ROOT_WEIGHT_MISSING_MAPPING_AUTHORITIES,
    unauthorizedDerivations: GENERAL_NATAL_GEJU_ROOT_WEIGHT_UNAUTHORIZED_DERIVATIONS,
    authorityBoundary:
      'The selected source directly distinguishes heavier roots (長生祿旺) from lighter roots (墓庫餘氣), supplies bounded relative examples, and states an explicit Yin-growth exception. Canonical day-master identity, branch identity, and hidden-stem membership provide factual substrate only. The repository does not yet govern a complete stem-branch root-class mapping, and hidden-stem storage order or membership cannot be promoted into that mapping. Therefore root-weight semantics are partially authorized while generalized executable classification remains fail-closed.',
    notes: Object.freeze([
      'The source-native heavy/light distinction is admitted as semantic authority, not as a completed classifier.',
      'The direct relative examples are bounded evidence and do not define numeric scores or an exhaustive cross-stem ranking table.',
      'The explicit 陰長生 exception prevents silent Yin/Yang symmetry assumptions.',
      'Hidden-stem membership remains membership-only; its canonical array order is not root weight, 本氣/中氣/餘氣 rank, or month-command duration authority.',
      'This review does not authorize ordinary-strength classification, GEJU_CANDIDATE, or GEJU_ESTABLISHMENT_STATE; General Natal production authority, P0-CM-03, NEXT_PRODUCTION_SKU, and Commerce remain blocked.',
    ]),
  });
