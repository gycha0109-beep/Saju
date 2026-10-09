import {
  FR293_PRODUCT_COLUMN_MAP,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FACE_DIRECT_RULE_EVIDENCE_FR311J,
} from './traditional-face-evidence-index-fr311j.js';
import {
  EAR_DIRECT_RULE_EVIDENCE_FR311O,
} from './traditional-face-ear-evidence-index-fr311o.js';
import {
  FR311P_EVIDENCE_INVENTORY,
} from './traditional-face-evidence-integrity-fr311p.js';
import {
  FR311Q_GAP_SUMMARY,
} from './traditional-face-lens-gap-adjudication-fr311q.js';
import {
  FR312A_BINDING_SUMMARY,
} from './traditional-observation-binding-authority-fr312a.js';
import {
  FR312B_SHORTLIST,
  FR312B_TRIAGE_SUMMARY,
} from './traditional-direct-rule-study-triage-fr312b.js';

export type DirectRuleConstructCompatibilityFR312C =
  | 'measurement_semantics_candidate'
  | 'threshold_definition_required'
  | 'multi_feature_construct_required'
  | 'construct_mismatch'
  | 'insufficient_observation_definition'
  | 'additional_extractor_required'
  | 'manual_only_after_review';

export type ThresholdRequirementFR312C =
  | 'required'
  | 'construct_definition_first'
  | 'not_applicable_manual';

export type SingleFrontalObservabilityFR312C =
  | 'usable_with_neutral_capture'
  | 'capture_state_sensitive'
  | 'lighting_or_depth_sensitive'
  | 'source_definition_insufficient'
  | 'manual_only';

export type ResearchReadinessFR312C =
  | 'empirical_protocol_candidate'
  | 'construct_definition_required'
  | 'additional_extractor_required'
  | 'source_definition_required'
  | 'manual_only';

export interface DirectRuleEquivalenceStudyFR312C {
  readonly ruleId: string;
  readonly evidenceId: string;
  readonly sourceExpression: string;
  readonly traditionalRegion: string;
  readonly traditionalObservationKind: 'morphology';
  readonly fr312bDisposition: 'single_region_surface_candidate';
  readonly fr312bMaterializedCandidateFeatureKeys: readonly string[];
  readonly comparableNeutralFeatureKeys: readonly string[];
  readonly currentNeutralFeatureStatus:
    | 'specific_comparator_selected'
    | 'current_none';
  readonly proposedMeasurementConstructs: readonly string[];
  readonly constructCompatibility: DirectRuleConstructCompatibilityFR312C;
  readonly thresholdRequirement: ThresholdRequirementFR312C;
  readonly thresholdValueAuthorized: false;
  readonly multiFeatureRequired: boolean;
  readonly multiFeatureSynthesisAuthorized: false;
  readonly additionalExtractorRequired: boolean;
  readonly additionalExtractorMutationAuthorized: false;
  readonly singleFrontalPhotoObservability:
    SingleFrontalObservabilityFR312C;
  readonly ambiguityReason: string;
  readonly researchReadiness: ResearchReadinessFR312C;
  readonly automaticTraditionalBindingAuthorized: false;
  readonly providerLandmarkDirectBindingAuthorized: false;
  readonly populationNormAuthorized: false;
  readonly scoreAuthorized: false;
  readonly rankAuthorized: false;
  readonly productInterpretationAuthorized: false;
  readonly modernScientificFactAuthorized: false;
}

const THRESHOLD_DEFINITION_REQUIRED = new Set<string>([
  'fr311i.philtrum.thin_narrow',
  'fr311i.mouth.small_short',
  'fr311i.mouth.corners_droop_bad_speech',
  'fr311i.lip.upper_thin',
  'fr311i.lip.lower_thin',
  'fr311i.lip.both_thick',
  'fr311i.lip.both_thin',
  'fr311i.lip.upper_thick_short_life',
  'fr311i.lip.lower_thin_gluttony',
  'fr311i.lip.thick_quiet_thin_litigious',
]);

const MULTI_FEATURE_CONSTRUCT_REQUIRED = new Set<string>([
  'fr311i.philtrum.straight_deep',
  'fr311i.philtrum.flat_shallow',
  'fr311i.philtrum.deep_long',
  'fr311i.philtrum.shallow_short',
  'fr311i.philtrum.upright_drooping',
  'fr311i.philtrum.bent_shrunken',
  'fr311i.philtrum.flat_long',
  'fr311i.philtrum.short_compact',
  'fr311i.philtrum.broad_flat',
  'fr311i.mouth.square_broad_ridged',
  'fr311i.mouth.horizontal_broad_thick',
  'fr311i.mouth.upright_thick',
  'fr311i.mouth.broad_full',
  'fr311i.philtrum.flat_shallow_short_no_trust_children',
  'fr311i.philtrum.straight_deep_long_children',
  'fr311i.mouth.biased_thin_edges_slander',
  'fr311i.philtrum.preferred_form',
  'fr311i.philtrum.broad_flat_child_crying',
]);

const ADDITIONAL_EXTRACTOR_REQUIRED = new Set<string>([
  'fr311i.philtrum.full_flat',
  'fr311i.philtrum.upper_narrow_lower_wide',
  'fr311i.philtrum.upper_wide_lower_narrow',
  'fr311i.philtrum.both_narrow_center_wide',
  'fr311i.philtrum.crooked',
  'fr311i.philtrum.upright',
  'fr311i.mouth.open_teeth_short_life',
  'fr311i.lip.shrunken',
  'fr311i.lip.upper_long',
  'fr311i.lip.lower_long',
  'fr311i.lip.not_overlapping',
  'fr311i.lip.drooping',
  'fr311i.philtrum.flat_absent_hollow',
  'fr311i.philtrum.flat_children_fail',
  'fr311i.philtrum.left_right_child_sex',
  'fr311i.lip.flat_not_raised_hunger',
  'fr311i.lip.missing_sunken_low_status',
  'fr311i.lip.not_upright_speech',
  'fr311i.mouth.pinched',
  'fr311i.lip.pointed_pursed',
  'fr311i.mouth.gathered_pursed_serving',
]);

const INSUFFICIENT_OBSERVATION_DEFINITION = new Set<string>([
  'fr311i.philtrum.clear_split_bamboo',
  'fr311i.philtrum.thin_hanging_needle',
  'fr311i.philtrum.high_thick',
  'fr311i.mouth.mouse_slander',
  'fr311i.mouth.shrunken_bag',
  'fr311i.mouth.blowing_fire',
  'fr311i.mouth.horse_greed',
  'fr311i.mouth.blowing_fire_few_children',
  'fr311i.lip.thin_weak',
  'fr311i.lip.matched',
  'fr311i.mouth.shrunken_snail_solitary_song',
  'fr311i.mouth.shrunken_bag_child_separate_house',
]);

const CONSTRUCT_MISMATCH = new Set<string>([
  'fr311i.mouth.angular_bow',
  'fr311i.mouth.contains_fist',
  'fr311i.mouth.corner_bow',
  'fr311i.mouth.four_character_trust',
]);

const MANUAL_ONLY_AFTER_REVIEW = new Set<string>([
  'fr311i.lip.dragon',
  'fr311i.lip.sheep',
  'fr311i.mouth.water_star_square',
]);

const MULTI_FEATURE_WITHOUT_NEW_EXTRACTOR = new Set<string>([
  'fr311i.mouth.horizontal_broad_thick',
  'fr311i.mouth.broad_full',
]);

const PHILTRUM_LENGTH_WIDTH_COMPARATOR = new Set<string>([
  'fr311i.philtrum.thin_narrow',
  'fr311i.philtrum.upper_narrow_lower_wide',
  'fr311i.philtrum.upper_wide_lower_narrow',
  'fr311i.philtrum.both_narrow_center_wide',
  'fr311i.philtrum.deep_long',
  'fr311i.philtrum.shallow_short',
  'fr311i.philtrum.bent_shrunken',
  'fr311i.philtrum.flat_long',
  'fr311i.philtrum.short_compact',
  'fr311i.philtrum.broad_flat',
  'fr311i.philtrum.flat_shallow_short_no_trust_children',
  'fr311i.philtrum.straight_deep_long_children',
  'fr311i.philtrum.preferred_form',
  'fr311i.philtrum.broad_flat_child_crying',
]);

const MOUTH_WIDTH_COMPARATOR = new Set<string>([
  'fr311i.mouth.square_broad_ridged',
  'fr311i.mouth.horizontal_broad_thick',
  'fr311i.mouth.pinched',
  'fr311i.mouth.contains_fist',
  'fr311i.mouth.broad_full',
  'fr311i.mouth.small_short',
  'fr311i.mouth.gathered_pursed_serving',
]);

const MOUTH_CORNER_COMPARATOR = new Set<string>([
  'fr311i.mouth.corner_bow',
  'fr311i.mouth.corners_droop_bad_speech',
]);

const MOUTH_OUTLINE_COMPARATOR = new Set<string>([
  'fr311i.mouth.square_broad_ridged',
  'fr311i.mouth.angular_bow',
  'fr311i.mouth.four_character_trust',
  'fr311i.mouth.biased_thin_edges_slander',
  'fr311i.lip.pointed_pursed',
]);

const LIP_FULLNESS_COMPARATOR = new Set<string>([
  'fr311i.mouth.horizontal_broad_thick',
  'fr311i.mouth.upright_thick',
  'fr311i.mouth.broad_full',
  'fr311i.lip.thin_weak',
  'fr311i.lip.upper_thin',
  'fr311i.lip.lower_thin',
  'fr311i.lip.both_thick',
  'fr311i.lip.both_thin',
  'fr311i.lip.not_overlapping',
  'fr311i.lip.matched',
  'fr311i.lip.pointed_pursed',
  'fr311i.lip.upper_thick_short_life',
  'fr311i.lip.lower_thin_gluttony',
  'fr311i.lip.thick_quiet_thin_litigious',
  'fr311i.mouth.biased_thin_edges_slander',
  'fr311i.lip.flat_not_raised_hunger',
  'fr311i.lip.missing_sunken_low_status',
]);

const SOURCE_BY_RULE = new Map(
  [
    ...FACE_DIRECT_RULE_EVIDENCE_FR311J,
    ...EAR_DIRECT_RULE_EVIDENCE_FR311O,
  ].map((item) => [item.ruleId, item] as const),
);

const FEATURE_CONSTRUCT = Object.freeze({
  'mouth.philtrum_length_width':
    'visible central-groove axis length / corridor width relative to visible mouth width',
  'mouth.width_and_relative_size':
    'visible mouth horizontal span and relative 2D mouth size',
  'mouth.corner_orientation':
    'visible mouth-corner vertical orientation relative to mouth center',
  'mouth.outline_angularity':
    'role-free visible mouth-outline angularity',
  'mouth.visible_lip_fullness':
    'visible upper/lower lip-band vertical span and combined area ratios',
} as const);

function comparableFeatureKeys(ruleId: string): readonly string[] {
  const keys: string[] = [];
  if (PHILTRUM_LENGTH_WIDTH_COMPARATOR.has(ruleId)) {
    keys.push('mouth.philtrum_length_width');
  }
  if (MOUTH_WIDTH_COMPARATOR.has(ruleId)) {
    keys.push('mouth.width_and_relative_size');
  }
  if (MOUTH_CORNER_COMPARATOR.has(ruleId)) {
    keys.push('mouth.corner_orientation');
  }
  if (MOUTH_OUTLINE_COMPARATOR.has(ruleId)) {
    keys.push('mouth.outline_angularity');
  }
  if (LIP_FULLNESS_COMPARATOR.has(ruleId)) {
    keys.push('mouth.visible_lip_fullness');
  }
  return Object.freeze(keys.sort());
}

function classifyConstruct(
  ruleId: string,
): DirectRuleConstructCompatibilityFR312C {
  if (THRESHOLD_DEFINITION_REQUIRED.has(ruleId)) {
    return 'threshold_definition_required';
  }
  if (MULTI_FEATURE_CONSTRUCT_REQUIRED.has(ruleId)) {
    return 'multi_feature_construct_required';
  }
  if (CONSTRUCT_MISMATCH.has(ruleId)) {
    return 'construct_mismatch';
  }
  if (INSUFFICIENT_OBSERVATION_DEFINITION.has(ruleId)) {
    return 'insufficient_observation_definition';
  }
  if (ADDITIONAL_EXTRACTOR_REQUIRED.has(ruleId)) {
    return 'additional_extractor_required';
  }
  if (MANUAL_ONLY_AFTER_REVIEW.has(ruleId)) {
    return 'manual_only_after_review';
  }
  throw new Error('fr312c_unclassified_rule:' + ruleId);
}

function additionalExtractorRequired(
  ruleId: string,
  compatibility: DirectRuleConstructCompatibilityFR312C,
): boolean {
  if (compatibility === 'additional_extractor_required') return true;
  if (compatibility !== 'multi_feature_construct_required') return false;
  return !MULTI_FEATURE_WITHOUT_NEW_EXTRACTOR.has(ruleId);
}

function thresholdRequirement(
  compatibility: DirectRuleConstructCompatibilityFR312C,
): ThresholdRequirementFR312C {
  if (
    compatibility === 'threshold_definition_required' ||
    compatibility === 'multi_feature_construct_required'
  ) return 'required';
  if (compatibility === 'manual_only_after_review') {
    return 'not_applicable_manual';
  }
  return 'construct_definition_first';
}

function missingConstructs(
  ruleId: string,
  sourceExpression: string,
): readonly string[] {
  const missing: string[] = [];
  if (ruleId.startsWith('fr311i.philtrum.')) {
    if (/直|斜|屈曲|偏/.test(sourceExpression)) {
      missing.push('visible central-groove centerline deviation / curvature');
    }
    if (/深|淺|平|陷|高|厚|滿|無/.test(sourceExpression)) {
      missing.push('visible central-groove relief / depth-or-flatness construct');
    }
    if (/上狹下廣|上廣下狹|上下俱狹而中心闊/.test(sourceExpression)) {
      missing.push('segment-wise upper / middle / lower central-groove width profile');
    }
    if (/垂/.test(sourceExpression)) {
      missing.push('central-groove lower-end direction / continuation construct');
    }
  } else {
    if (/開齒|齒出/.test(sourceExpression)) {
      missing.push('mouth opening state and visible-teeth exposure construct');
    }
    if (/上脣長|下脣長/.test(sourceExpression)) {
      missing.push('separate upper/lower lip longitudinal extent construct');
    }
    if (/不相覆/.test(sourceExpression)) {
      missing.push('upper/lower visible lip-band overlap relation');
    }
    if (/脣墜下|不正|各偏/.test(sourceExpression)) {
      missing.push('lip-body positional deviation / orientation construct');
    }
    if (/不起|陷|缺/.test(sourceExpression)) {
      missing.push('lip relief / depression / contour-defect construct');
    }
    if (/撮|縮/.test(sourceExpression)) {
      missing.push('pursing / contraction geometry construct');
    }
  }
  return Object.freeze([...new Set(missing)]);
}

function proposedConstructs(
  ruleId: string,
  sourceExpression: string,
  featureKeys: readonly string[],
): readonly string[] {
  const constructs: string[] = featureKeys.map((key) =>
    FEATURE_CONSTRUCT[key as keyof typeof FEATURE_CONSTRUCT]);
  constructs.push(...missingConstructs(ruleId, sourceExpression));

  if (constructs.length === 0) {
    return Object.freeze([
      'source phrase requires a separately reviewed observation construct before measurement semantics can be fixed',
    ]);
  }
  return Object.freeze([...new Set(constructs)]);
}

function observability(
  compatibility: DirectRuleConstructCompatibilityFR312C,
  sourceExpression: string,
): SingleFrontalObservabilityFR312C {
  if (compatibility === 'manual_only_after_review') return 'manual_only';
  if (compatibility === 'insufficient_observation_definition') {
    return 'source_definition_insufficient';
  }
  if (/深|淺|陷|不起|高厚|滿而平|平而無/.test(sourceExpression)) {
    return 'lighting_or_depth_sensitive';
  }
  if (/開齒|齒出|容拳|撮|縮|垂/.test(sourceExpression)) {
    return 'capture_state_sensitive';
  }
  return 'usable_with_neutral_capture';
}

function ambiguityReason(
  compatibility: DirectRuleConstructCompatibilityFR312C,
): string {
  switch (compatibility) {
    case 'measurement_semantics_candidate':
      return 'A source-bounded neutral measurement construct is comparable, but no traditional binding is authorized.';
    case 'threshold_definition_required':
      return 'A comparable neutral continuous axis exists, but the traditional relative descriptor has no source-backed cutoff.';
    case 'multi_feature_construct_required':
      return 'The source condition combines multiple morphology descriptors; their conjunction is not an authorized automatic synthesis.';
    case 'construct_mismatch':
      return 'The same-region neutral metric measures a different construct from the traditional source phrase.';
    case 'insufficient_observation_definition':
      return 'The source phrase is analogical or underdefined for a stable modern measurement construct.';
    case 'additional_extractor_required':
      return 'The source condition is legible enough to name a missing construct, but the current FR293 materialized surface does not measure it.';
    case 'manual_only_after_review':
      return 'The phrase depends on a traditional named or symbolic morphology and remains manual after review.';
  }
}

function readiness(
  compatibility: DirectRuleConstructCompatibilityFR312C,
): ResearchReadinessFR312C {
  switch (compatibility) {
    case 'measurement_semantics_candidate':
    case 'threshold_definition_required':
      return 'empirical_protocol_candidate';
    case 'multi_feature_construct_required':
      return 'construct_definition_required';
    case 'additional_extractor_required':
      return 'additional_extractor_required';
    case 'construct_mismatch':
    case 'insufficient_observation_definition':
      return 'source_definition_required';
    case 'manual_only_after_review':
      return 'manual_only';
  }
}

export const FR312C_DIRECT_RULE_EQUIVALENCE_STUDY:
readonly DirectRuleEquivalenceStudyFR312C[] = Object.freeze(
  FR312B_SHORTLIST.map((shortlisted) => {
    const source = SOURCE_BY_RULE.get(shortlisted.ruleId);
    if (source === undefined) {
      throw new Error(
        'fr312c_missing_source_rule:' + shortlisted.ruleId,
      );
    }
    if (source.observationKind !== 'morphology') {
      throw new Error(
        'fr312c_non_morphology_shortlist_rule:' + shortlisted.ruleId,
      );
    }

    const compatibility = classifyConstruct(shortlisted.ruleId);
    const selectedFeatures = comparableFeatureKeys(shortlisted.ruleId);
    const requiresAdditionalExtractor = additionalExtractorRequired(
      shortlisted.ruleId,
      compatibility,
    );

    return Object.freeze({
      ruleId: shortlisted.ruleId,
      evidenceId: shortlisted.evidenceId,
      sourceExpression: source.sourceExpression,
      traditionalRegion:
        'regionScope' in source ? source.regionScope : source.region,
      traditionalObservationKind: 'morphology' as const,
      fr312bDisposition: 'single_region_surface_candidate' as const,
      fr312bMaterializedCandidateFeatureKeys: Object.freeze([
        ...shortlisted.materializedCandidateFeatureKeys,
      ]),
      comparableNeutralFeatureKeys: selectedFeatures,
      currentNeutralFeatureStatus:
        selectedFeatures.length > 0
          ? 'specific_comparator_selected' as const
          : 'current_none' as const,
      proposedMeasurementConstructs: proposedConstructs(
        shortlisted.ruleId,
        source.sourceExpression,
        selectedFeatures,
      ),
      constructCompatibility: compatibility,
      thresholdRequirement: thresholdRequirement(compatibility),
      thresholdValueAuthorized: false as const,
      multiFeatureRequired:
        compatibility === 'multi_feature_construct_required',
      multiFeatureSynthesisAuthorized: false as const,
      additionalExtractorRequired: requiresAdditionalExtractor,
      additionalExtractorMutationAuthorized: false as const,
      singleFrontalPhotoObservability: observability(
        compatibility,
        source.sourceExpression,
      ),
      ambiguityReason: ambiguityReason(compatibility),
      researchReadiness: readiness(compatibility),
      automaticTraditionalBindingAuthorized: false as const,
      providerLandmarkDirectBindingAuthorized: false as const,
      populationNormAuthorized: false as const,
      scoreAuthorized: false as const,
      rankAuthorized: false as const,
      productInterpretationAuthorized: false as const,
      modernScientificFactAuthorized: false as const,
    });
  }),
);

function countCompatibility(
  compatibility: DirectRuleConstructCompatibilityFR312C,
): number {
  return FR312C_DIRECT_RULE_EQUIVALENCE_STUDY
    .filter((item) => item.constructCompatibility === compatibility)
    .length;
}

function countThreshold(
  requirement: ThresholdRequirementFR312C,
): number {
  return FR312C_DIRECT_RULE_EQUIVALENCE_STUDY
    .filter((item) => item.thresholdRequirement === requirement)
    .length;
}

export const FR312C_EQUIVALENCE_SUMMARY = Object.freeze({
  shortlistCount: FR312C_DIRECT_RULE_EQUIVALENCE_STUDY.length,
  measurementSemanticsCandidate:
    countCompatibility('measurement_semantics_candidate'),
  thresholdDefinitionRequired:
    countCompatibility('threshold_definition_required'),
  multiFeatureConstructRequired:
    countCompatibility('multi_feature_construct_required'),
  constructMismatch:
    countCompatibility('construct_mismatch'),
  insufficientObservationDefinition:
    countCompatibility('insufficient_observation_definition'),
  additionalExtractorRequired:
    countCompatibility('additional_extractor_required'),
  manualOnlyAfterReview:
    countCompatibility('manual_only_after_review'),
  thresholdRequirementRequired:
    countThreshold('required'),
  thresholdConstructDefinitionFirst:
    countThreshold('construct_definition_first'),
  thresholdNotApplicableManual:
    countThreshold('not_applicable_manual'),
  nextEmpiricalProtocolCandidates:
    FR312C_DIRECT_RULE_EQUIVALENCE_STUDY
      .filter((item) =>
        item.researchReadiness === 'empirical_protocol_candidate')
      .length,
  automaticTraditionalBindingsAuthorized: 0,
  thresholdValuesAuthorized: 0,
  populationNormsAuthorized: 0,
  multiFeatureSynthesesAuthorized: 0,
  providerLandmarkDirectBindingsAuthorized: 0,
  productInterpretationsAuthorized: 0,
});

export const FR312C_AUTHORITY_BOUNDARY = Object.freeze({
  automaticTraditionalBindingAuthorized: false as const,
  thresholdValueAuthorized: false as const,
  thresholdTuningAuthorized: false as const,
  populationNormAuthorized: false as const,
  providerLandmarkDirectBindingAuthorized: false as const,
  multiFeatureSynthesisAuthorized: false as const,
  additionalExtractorMutationAuthorized: false as const,
  traditionalRuleInferenceAuthorized: false as const,
  namedFormClassifierAuthorized: false as const,
  scoreAuthorized: false as const,
  rankAuthorized: false as const,
  productInterpretationAuthorized: false as const,
  modernScientificFactAuthorized: false as const,
});

export function assertDirectRuleEquivalenceStudyFR312C(): void {
  if (
    FR312B_TRIAGE_SUMMARY.shortlistCount !== 68 ||
    FR312C_DIRECT_RULE_EQUIVALENCE_STUDY.length !== 68
  ) {
    throw new Error('fr312c_shortlist_count_drift');
  }

  const fr312bIds = FR312B_SHORTLIST.map((item) => item.ruleId).sort();
  const fr312cIds =
    FR312C_DIRECT_RULE_EQUIVALENCE_STUDY.map((item) => item.ruleId).sort();
  if (
    new Set(fr312cIds).size !== 68 ||
    JSON.stringify(fr312bIds) !== JSON.stringify(fr312cIds)
  ) {
    throw new Error('fr312c_shortlist_bijection_drift');
  }

  if (
    FR312C_EQUIVALENCE_SUMMARY.measurementSemanticsCandidate !== 0 ||
    FR312C_EQUIVALENCE_SUMMARY.thresholdDefinitionRequired !== 10 ||
    FR312C_EQUIVALENCE_SUMMARY.multiFeatureConstructRequired !== 18 ||
    FR312C_EQUIVALENCE_SUMMARY.constructMismatch !== 4 ||
    FR312C_EQUIVALENCE_SUMMARY.insufficientObservationDefinition !== 12 ||
    FR312C_EQUIVALENCE_SUMMARY.additionalExtractorRequired !== 21 ||
    FR312C_EQUIVALENCE_SUMMARY.manualOnlyAfterReview !== 3 ||
    FR312C_EQUIVALENCE_SUMMARY.thresholdRequirementRequired !== 28 ||
    FR312C_EQUIVALENCE_SUMMARY.thresholdConstructDefinitionFirst !== 37 ||
    FR312C_EQUIVALENCE_SUMMARY.thresholdNotApplicableManual !== 3 ||
    FR312C_EQUIVALENCE_SUMMARY.nextEmpiricalProtocolCandidates !== 10
  ) {
    throw new Error('fr312c_summary_baseline_drift');
  }

  if (
    FR312A_BINDING_SUMMARY.directRules !== 230 ||
    FR312B_TRIAGE_SUMMARY.singleRegionSurfaceCandidates !== 68 ||
    FR311P_EVIDENCE_INVENTORY.canonicalEvidence !== 621 ||
    FR311Q_GAP_SUMMARY.totalGapEvidence !== 28
  ) {
    throw new Error('fr312c_upstream_baseline_drift');
  }

  const materializedFeatures = new Set(
    FR293_PRODUCT_COLUMN_MAP
      .filter((item) =>
        item.implementationState === 'canonical_extractor_materialized')
      .map((item) => item.featureKey),
  );

  for (const item of FR312C_DIRECT_RULE_EQUIVALENCE_STUDY) {
    if (
      item.sourceExpression.trim().length === 0 ||
      item.traditionalObservationKind !== 'morphology' ||
      item.fr312bDisposition !== 'single_region_surface_candidate' ||
      item.proposedMeasurementConstructs.length === 0
    ) {
      throw new Error('fr312c_incomplete_adjudication:' + item.ruleId);
    }

    for (const featureKey of item.comparableNeutralFeatureKeys) {
      if (
        !materializedFeatures.has(
          featureKey as (typeof FR293_PRODUCT_COLUMN_MAP)[number]['featureKey'],
        ) ||
        !item.fr312bMaterializedCandidateFeatureKeys.includes(featureKey)
      ) {
        throw new Error(
          'fr312c_unmaterialized_comparator:' +
          item.ruleId + ':' + featureKey,
        );
      }
    }

    if (
      item.thresholdValueAuthorized !== false ||
      item.multiFeatureSynthesisAuthorized !== false ||
      item.additionalExtractorMutationAuthorized !== false ||
      item.automaticTraditionalBindingAuthorized !== false ||
      item.providerLandmarkDirectBindingAuthorized !== false ||
      item.populationNormAuthorized !== false ||
      item.scoreAuthorized !== false ||
      item.rankAuthorized !== false ||
      item.productInterpretationAuthorized !== false ||
      item.modernScientificFactAuthorized !== false
    ) {
      throw new Error('fr312c_authority_widening:' + item.ruleId);
    }

    if (
      item.constructCompatibility ===
        'multi_feature_construct_required' &&
      item.multiFeatureRequired !== true
    ) {
      throw new Error('fr312c_multi_feature_flag_drift:' + item.ruleId);
    }

    if (
      item.constructCompatibility ===
        'additional_extractor_required' &&
      item.additionalExtractorRequired !== true
    ) {
      throw new Error(
        'fr312c_additional_extractor_flag_drift:' + item.ruleId,
      );
    }

    if (
      item.researchReadiness === 'empirical_protocol_candidate' &&
      (
        item.constructCompatibility !== 'threshold_definition_required' ||
        item.thresholdRequirement !== 'required' ||
        item.comparableNeutralFeatureKeys.length === 0 ||
        item.additionalExtractorRequired
      )
    ) {
      throw new Error(
        'fr312c_invalid_empirical_protocol_candidate:' + item.ruleId,
      );
    }
  }

  for (const [key, flag] of Object.entries(FR312C_AUTHORITY_BOUNDARY)) {
    if (flag !== false) {
      throw new Error('fr312c_global_authority_widening:' + key);
    }
  }
}
