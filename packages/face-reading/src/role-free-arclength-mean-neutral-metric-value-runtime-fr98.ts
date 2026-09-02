import {
  assertIssuedGovernedCertifiedRoleFreeSymmetricArclengthMeanFR96,
  type GovernedCertifiedRoleFreeSymmetricArclengthMeanFR96V1,
} from './certified-role-free-symmetric-arclength-mean-runtime-fr96.js';
import type { ExactRationalFR94V1 } from './exact-rational-distance-enclosure-primitives-runtime-fr94.js';
import {
  assertIssuedRoleFreeArclengthMeanNeutralMetricDefinitionReviewFR97,
  reviewRoleFreeArclengthMeanNeutralMetricDefinitionFR97,
} from './role-free-arclength-mean-neutral-metric-definition-review-fr97.js';
import { FaceAuthorityValidationError } from './validation.js';

const METRIC_KEY = 'neutral.mouth.contour_set.symmetric_arclength_mean_nearest_set_distance' as const;
const METRIC_VERSION = '0.1.0' as const;
const METRIC_REF = `${METRIC_KEY}@${METRIC_VERSION}` as const;
const FR96_FUNCTIONAL_REF = 'fr96:role-free-symmetric-arclength-mean-nearest-set-distance@0.1.0' as const;

export interface RoleFreeArclengthMeanNeutralMetricValueFR98V1 {
  readonly schemaVersion: 'fr98-role-free-arclength-mean-neutral-metric-value-v1';
  readonly metricKey: typeof METRIC_KEY;
  readonly metricVersion: typeof METRIC_VERSION;
  readonly metricRef: typeof METRIC_REF;
  readonly sourceFunctionalRef: typeof FR96_FUNCTIONAL_REF;
  readonly valueRepresentation: 'certified_interval_point_estimate_and_absolute_error_certificate';
  readonly lower: ExactRationalFR94V1;
  readonly upper: ExactRationalFR94V1;
  readonly pointEstimate: ExactRationalFR94V1;
  readonly absoluteErrorCertificate: ExactRationalFR94V1;
  readonly conservativeFR91SymmetricBudget: ExactRationalFR94V1;
  readonly unit: 'canonical_metric_plane_distance';
  readonly coordinateFrame: 'pose_normalized_face_2d';
  readonly sourceContourRefs: readonly [string, string];
  readonly exactTruthContainedInInterval: true;
  readonly fr91SymmetricBudgetCertified: true;
  readonly symmetricUnderContourSwapByDefinition: true;
  readonly cycleStartIndexInvariantByDefinition: true;
  readonly cycleOrientationInvariantByDefinition: true;
  readonly runtimeRecomputationPerformed: false;
  readonly explicitPointPairCorrespondenceApplied: false;
  readonly anatomicalRoleApplied: false;
  readonly physicalAnthropometricInterpretationApplied: false;
  readonly thicknessInterpretationApplied: false;
  readonly classificationApplied: false;
  readonly calibrationApplied: false;
  readonly traditionalBindingApplied: false;
}

export interface GovernedRoleFreeArclengthMeanNeutralMetricFR98V1 {
  readonly schemaVersion: 'fr98-governed-role-free-arclength-mean-neutral-metric-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'governed_role_free_arclength_mean_neutral_metric_value_only';
  readonly extensionMode: 'separate_contract_extension';
  readonly baseNeutralObservationContractRef: 'myeongha-neutral-observation-v1';
  readonly baseFR15ContractMutated: false;
  readonly sourceAuthority: {
    readonly fr96SchemaVersion: 'fr96-governed-certified-role-free-symmetric-arclength-mean-v1';
    readonly fr97SchemaVersion: 'fr97-role-free-arclength-mean-neutral-metric-definition-review-v1';
    readonly sourceFunctionalRef: typeof FR96_FUNCTIONAL_REF;
    readonly metricDefinitionRef: typeof METRIC_REF;
    readonly coordinateFrame: 'pose_normalized_face_2d';
    readonly sourceCoordinateUnit: 'centimeter';
    readonly metricUnit: 'canonical_metric_plane_distance';
    readonly contourRefs: readonly [string, string];
    readonly providerRunRef: string;
    readonly canonicalAssetDigest: string;
    readonly sourceRuntimeGeometryFunctionalDefinitionsIssued: 1;
    readonly sourceRuntimeGeometryValuesIssued: 1;
  };
  readonly metric: RoleFreeArclengthMeanNeutralMetricValueFR98V1;
  readonly neutralMetricDefinitionRefsConsumed: 1;
  readonly neutralMetricDefinitionsIssued: 0;
  readonly neutralMetricValuesIssued: 1;
  readonly runtimeGeometryRecomputationPerformed: false;
  readonly anatomicalRolesIssued: 0;
  readonly crossContourCorrespondencePairsIssued: 0;
  readonly thicknessMetricIssued: false;
  readonly physicalAnthropometricInterpretationAuthorized: false;
  readonly morphologyProduced: false;
  readonly criterionStatesIssued: 0;
  readonly claimsIssued: 0;
  readonly traditionalSemanticAuthority: false;
  readonly resolvedProcessGap: 'role_free_arclength_mean_neutral_metric_value_binding_not_issued';
  readonly newlyExposedPrerequisiteBlockers: readonly [
    'lips_substantial_role_free_separation_metric_traditional_binding_not_reviewed',
  ];
  readonly remainingBlockers: readonly [
    'fr15_mouth_consumer_slot_not_issued',
    'five_officers_source_not_scan_checked',
    'five_officers_methodology_research_only',
    'outer_inner_lip_roles_not_authorized',
    'role_free_cross_contour_correspondence_not_defined',
    'lips_substantial_thickness_metric_not_defined',
    'lips_substantial_calibration_evidence_absent',
    'lips_substantial_calibration_protocol_absent',
    'lips_substantial_threshold_not_calibrated',
    'continuous_polyline_hausdorff_runtime_algorithm_not_governed',
  ];
  readonly authorityBoundary: {
    readonly neutralMetricValueMeansLipThickness: false;
    readonly neutralMetricValueMeansPhysicalSoftTissueAnthropometry: false;
    readonly nearestSetMetricMeansPointCorrespondence: false;
    readonly metricValueBindingMeansMorphologyState: false;
    readonly metricValueBindingMeansCriterionState: false;
    readonly metricValueBindingMeansTraditionalDuanHou: false;
    readonly certifiedNumericalIntervalMeansCalibrationThreshold: false;
    readonly sourceRuntimeValueMayBeRecomputedDuringBinding: false;
  };
  readonly prohibitedShortcuts: readonly [
    'neutral_arclength_mean_metric_value_to_lip_thickness',
    'canonical_metric_plane_metric_value_to_physical_soft_tissue_anthropometry',
    'nearest_set_metric_value_to_cross_contour_correspondence_pair',
    'neutral_metric_value_to_morphology_state',
    'neutral_metric_value_to_criterion_state',
    'neutral_metric_value_to_traditional_duan_hou_semantics',
    'certified_numerical_interval_to_calibration_threshold',
    'metric_value_binding_to_geometry_recomputation',
  ];
  readonly recommendedNextFrontier: {
    readonly frontierKey: 'lips_substantial_role_free_separation_metric_traditional_binding_feasibility_review';
    readonly purpose: 'review whether the admitted role-free whole-contour separation metric has any authority-safe candidate relation to the traditional lips-substantial source concept while explicitly testing semantic mismatch, source verification, anatomy, and calibration blockers';
    readonly automaticTraditionalBindingAllowed: false;
    readonly anatomyCanBeInferredFromMetric: false;
    readonly thicknessCanBeInferredFromMetric: false;
    readonly correspondenceCanBeInferredFromMetric: false;
    readonly criterionStateIssuanceAllowed: false;
    readonly calibrationThresholdIssuanceAllowed: false;
    readonly traditionalSemanticAssignmentAllowed: false;
  };
  readonly provenance: {
    readonly providerRunRef: string;
    readonly canonicalAssetDigest: string;
    readonly rawSourcePersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly rawProviderDepthPersisted: false;
    readonly derivedPoseNormalizedLipsGeometryPersisted: false;
    readonly derivedArclengthMeanFunctionalPersisted: false;
    readonly derivedNeutralMetricPersisted: false;
    readonly biometricEmbeddingPersisted: false;
  };
}

const ISSUED = new WeakSet<object>();

const REMAINING = Object.freeze([
  'fr15_mouth_consumer_slot_not_issued',
  'five_officers_source_not_scan_checked',
  'five_officers_methodology_research_only',
  'outer_inner_lip_roles_not_authorized',
  'role_free_cross_contour_correspondence_not_defined',
  'lips_substantial_thickness_metric_not_defined',
  'lips_substantial_calibration_evidence_absent',
  'lips_substantial_calibration_protocol_absent',
  'lips_substantial_threshold_not_calibrated',
  'continuous_polyline_hausdorff_runtime_algorithm_not_governed',
] as const);

const PROHIBITED = Object.freeze([
  'neutral_arclength_mean_metric_value_to_lip_thickness',
  'canonical_metric_plane_metric_value_to_physical_soft_tissue_anthropometry',
  'nearest_set_metric_value_to_cross_contour_correspondence_pair',
  'neutral_metric_value_to_morphology_state',
  'neutral_metric_value_to_criterion_state',
  'neutral_metric_value_to_traditional_duan_hou_semantics',
  'certified_numerical_interval_to_calibration_threshold',
  'metric_value_binding_to_geometry_recomputation',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-98 ${message}`);
}

function validateFR97Definition(): ReturnType<typeof reviewRoleFreeArclengthMeanNeutralMetricDefinitionFR97> {
  const review = reviewRoleFreeArclengthMeanNeutralMetricDefinitionFR97();
  assertIssuedRoleFreeArclengthMeanNeutralMetricDefinitionReviewFR97(review);
  if (
    review.metricDefinition.metricRef !== METRIC_REF ||
    review.metricDefinition.sourceFunctionalRef !== FR96_FUNCTIONAL_REF ||
    review.metricDefinition.coordinateFrame !== 'pose_normalized_face_2d' ||
    review.metricDefinition.unit !== 'canonical_metric_plane_distance' ||
    review.metricDefinition.valueRepresentationRequired !== 'certified_interval_point_estimate_and_absolute_error_certificate' ||
    review.metricDefinition.contourRoleSemantics !== 'unordered_role_free_contour_pair' ||
    review.metricDefinition.providerComponentOrderRequired !== false ||
    review.metricDefinition.outerInnerAnatomicalRoleRequired !== false ||
    review.metricDefinition.explicitPointPairCorrespondenceRequired !== false ||
    review.metricDefinition.physicalAnthropometricInterpretationAllowed !== false ||
    review.metricDefinition.thicknessInterpretationAllowed !== false ||
    review.metricDefinition.traditionalCriterionBindingRef !== null ||
    review.metricDefinition.calibrationRef !== null ||
    review.metricDefinition.thresholdRef !== null ||
    review.reviewDecision.neutralMetricDefinitionAdmitted !== true ||
    review.reviewDecision.neutralMetricValueBindingAdmitted !== false ||
    review.reviewDecision.certifiedFR96ValueMayBeWrappedNext !== true ||
    review.recommendedNextFrontier.frontierKey !== 'role_free_arclength_mean_separation_neutral_metric_value_binding_runtime' ||
    review.recommendedNextFrontier.reuseFR96RuntimeValueAllowed !== true ||
    review.recommendedNextFrontier.runtimeReimplementationRequired !== false ||
    review.recommendedNextFrontier.neutralMetricValueIssuanceMayBeImplementedNext !== true ||
    review.thicknessMetricIssued !== false ||
    review.traditionalSemanticAuthority !== false
  ) fail('FR-97 neutral metric definition or value-binding gate authority drift.');
  return review;
}

function validateFR96Source(source: GovernedCertifiedRoleFreeSymmetricArclengthMeanFR96V1): void {
  assertIssuedGovernedCertifiedRoleFreeSymmetricArclengthMeanFR96(source);
  if (
    source.schemaVersion !== 'fr96-governed-certified-role-free-symmetric-arclength-mean-v1' ||
    source.authorityState !== 'governed_certified_role_free_symmetric_arclength_mean_geometry_functional_only' ||
    source.source.coordinateFrame !== 'pose_normalized_face_2d' ||
    source.source.coordinateUnit !== 'centimeter' ||
    source.source.contourCount !== 2 ||
    source.source.contourPointCounts[0] !== 20 ||
    source.source.contourPointCounts[1] !== 20 ||
    source.source.contourConsumptionState !== 'unordered_set_no_outer_inner_role' ||
    source.computation.functionalRef !== FR96_FUNCTIONAL_REF ||
    source.computation.functional !== 'symmetric_arclength_mean_nearest_set_distance' ||
    source.computation.exactTruthContainedInInterval !== true ||
    source.computation.fr91SymmetricBudgetCertified !== true ||
    source.computation.symmetricUnderContourSwapByDefinition !== true ||
    source.computation.cycleStartIndexInvariantByDefinition !== true ||
    source.computation.cycleOrientationInvariantByDefinition !== true ||
    source.computation.explicitPointPairCorrespondenceIssued !== false ||
    source.computation.anatomicalRolesRequired !== false ||
    source.computation.empiricalToleranceApplied !== false ||
    source.computation.calibrationThresholdApplied !== false ||
    source.runtimeGeometryFunctionalDefinitionsIssued !== 1 ||
    source.runtimeGeometryValuesIssued !== 1 ||
    source.neutralMetricDefinitionsIssued !== 0 ||
    source.neutralMetricValuesIssued !== 0 ||
    source.anatomicalRolesIssued !== 0 ||
    source.crossContourCorrespondencePairsIssued !== 0 ||
    source.thicknessMetricIssued !== false ||
    source.physicalAnthropometricInterpretationAuthorized !== false ||
    source.morphologyProduced !== false ||
    source.criterionStatesIssued !== 0 ||
    source.claimsIssued !== 0 ||
    source.traditionalSemanticAuthority !== false
  ) fail('requires the exact issued governed FR-96 role-free geometry functional boundary.');
}

export function bindIssuedFR96ToNeutralMetricValueFR98(
  source: GovernedCertifiedRoleFreeSymmetricArclengthMeanFR96V1,
): GovernedRoleFreeArclengthMeanNeutralMetricFR98V1 {
  validateFR97Definition();
  validateFR96Source(source);

  const computation = source.computation;
  const metric: RoleFreeArclengthMeanNeutralMetricValueFR98V1 = Object.freeze({
    schemaVersion: 'fr98-role-free-arclength-mean-neutral-metric-value-v1' as const,
    metricKey: METRIC_KEY,
    metricVersion: METRIC_VERSION,
    metricRef: METRIC_REF,
    sourceFunctionalRef: FR96_FUNCTIONAL_REF,
    valueRepresentation: 'certified_interval_point_estimate_and_absolute_error_certificate' as const,
    lower: computation.symmetricLower,
    upper: computation.symmetricUpper,
    pointEstimate: computation.symmetricPointEstimate,
    absoluteErrorCertificate: computation.symmetricAbsoluteErrorCertificate,
    conservativeFR91SymmetricBudget: computation.conservativeFR91SymmetricBudget,
    unit: 'canonical_metric_plane_distance' as const,
    coordinateFrame: source.source.coordinateFrame,
    sourceContourRefs: source.source.contourRefs,
    exactTruthContainedInInterval: true as const,
    fr91SymmetricBudgetCertified: true as const,
    symmetricUnderContourSwapByDefinition: true as const,
    cycleStartIndexInvariantByDefinition: true as const,
    cycleOrientationInvariantByDefinition: true as const,
    runtimeRecomputationPerformed: false as const,
    explicitPointPairCorrespondenceApplied: false as const,
    anatomicalRoleApplied: false as const,
    physicalAnthropometricInterpretationApplied: false as const,
    thicknessInterpretationApplied: false as const,
    classificationApplied: false as const,
    calibrationApplied: false as const,
    traditionalBindingApplied: false as const,
  });

  const result: GovernedRoleFreeArclengthMeanNeutralMetricFR98V1 = Object.freeze({
    schemaVersion: 'fr98-governed-role-free-arclength-mean-neutral-metric-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'governed_role_free_arclength_mean_neutral_metric_value_only' as const,
    extensionMode: 'separate_contract_extension' as const,
    baseNeutralObservationContractRef: 'myeongha-neutral-observation-v1' as const,
    baseFR15ContractMutated: false as const,
    sourceAuthority: Object.freeze({
      fr96SchemaVersion: source.schemaVersion,
      fr97SchemaVersion: 'fr97-role-free-arclength-mean-neutral-metric-definition-review-v1' as const,
      sourceFunctionalRef: FR96_FUNCTIONAL_REF,
      metricDefinitionRef: METRIC_REF,
      coordinateFrame: source.source.coordinateFrame,
      sourceCoordinateUnit: source.source.coordinateUnit,
      metricUnit: 'canonical_metric_plane_distance' as const,
      contourRefs: source.source.contourRefs,
      providerRunRef: source.source.providerRunRef,
      canonicalAssetDigest: source.source.canonicalAssetDigest,
      sourceRuntimeGeometryFunctionalDefinitionsIssued: 1 as const,
      sourceRuntimeGeometryValuesIssued: 1 as const,
    }),
    metric,
    neutralMetricDefinitionRefsConsumed: 1 as const,
    neutralMetricDefinitionsIssued: 0 as const,
    neutralMetricValuesIssued: 1 as const,
    runtimeGeometryRecomputationPerformed: false as const,
    anatomicalRolesIssued: 0 as const,
    crossContourCorrespondencePairsIssued: 0 as const,
    thicknessMetricIssued: false as const,
    physicalAnthropometricInterpretationAuthorized: false as const,
    morphologyProduced: false as const,
    criterionStatesIssued: 0 as const,
    claimsIssued: 0 as const,
    traditionalSemanticAuthority: false as const,
    resolvedProcessGap: 'role_free_arclength_mean_neutral_metric_value_binding_not_issued' as const,
    newlyExposedPrerequisiteBlockers: Object.freeze([
      'lips_substantial_role_free_separation_metric_traditional_binding_not_reviewed',
    ]) as readonly ['lips_substantial_role_free_separation_metric_traditional_binding_not_reviewed'],
    remainingBlockers: REMAINING,
    authorityBoundary: Object.freeze({
      neutralMetricValueMeansLipThickness: false as const,
      neutralMetricValueMeansPhysicalSoftTissueAnthropometry: false as const,
      nearestSetMetricMeansPointCorrespondence: false as const,
      metricValueBindingMeansMorphologyState: false as const,
      metricValueBindingMeansCriterionState: false as const,
      metricValueBindingMeansTraditionalDuanHou: false as const,
      certifiedNumericalIntervalMeansCalibrationThreshold: false as const,
      sourceRuntimeValueMayBeRecomputedDuringBinding: false as const,
    }),
    prohibitedShortcuts: PROHIBITED,
    recommendedNextFrontier: Object.freeze({
      frontierKey: 'lips_substantial_role_free_separation_metric_traditional_binding_feasibility_review' as const,
      purpose: 'review whether the admitted role-free whole-contour separation metric has any authority-safe candidate relation to the traditional lips-substantial source concept while explicitly testing semantic mismatch, source verification, anatomy, and calibration blockers' as const,
      automaticTraditionalBindingAllowed: false as const,
      anatomyCanBeInferredFromMetric: false as const,
      thicknessCanBeInferredFromMetric: false as const,
      correspondenceCanBeInferredFromMetric: false as const,
      criterionStateIssuanceAllowed: false as const,
      calibrationThresholdIssuanceAllowed: false as const,
      traditionalSemanticAssignmentAllowed: false as const,
    }),
    provenance: Object.freeze({
      providerRunRef: source.source.providerRunRef,
      canonicalAssetDigest: source.source.canonicalAssetDigest,
      rawSourcePersisted: false as const,
      rawProviderResponsePersisted: false as const,
      rawProviderDepthPersisted: false as const,
      derivedPoseNormalizedLipsGeometryPersisted: false as const,
      derivedArclengthMeanFunctionalPersisted: false as const,
      derivedNeutralMetricPersisted: false as const,
      biometricEmbeddingPersisted: false as const,
    }),
  });
  ISSUED.add(result);
  return result;
}

export function assertIssuedGovernedRoleFreeArclengthMeanNeutralMetricFR98(
  value: GovernedRoleFreeArclengthMeanNeutralMetricFR98V1,
): void {
  if (!ISSUED.has(value as object)) fail('value was not issued by the active FR-98 metric binding boundary.');
  if (
    value.schemaVersion !== 'fr98-governed-role-free-arclength-mean-neutral-metric-v1' ||
    value.authorityState !== 'governed_role_free_arclength_mean_neutral_metric_value_only' ||
    value.neutralMetricDefinitionRefsConsumed !== 1 ||
    value.neutralMetricDefinitionsIssued !== 0 ||
    value.neutralMetricValuesIssued !== 1 ||
    value.runtimeGeometryRecomputationPerformed !== false ||
    value.anatomicalRolesIssued !== 0 ||
    value.crossContourCorrespondencePairsIssued !== 0 ||
    value.thicknessMetricIssued !== false ||
    value.physicalAnthropometricInterpretationAuthorized !== false ||
    value.morphologyProduced !== false ||
    value.criterionStatesIssued !== 0 ||
    value.claimsIssued !== 0 ||
    value.traditionalSemanticAuthority !== false
  ) fail('issued FR-98 neutral metric value authority drift.');
}
