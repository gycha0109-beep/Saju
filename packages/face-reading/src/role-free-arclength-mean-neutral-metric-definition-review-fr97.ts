import {
  computeCertifiedRoleFreeSymmetricArclengthMeanFR96,
} from './certified-role-free-symmetric-arclength-mean-runtime-fr96.js';
import { FaceAuthorityValidationError } from './validation.js';

const FR96_FUNCTIONAL_REF = 'fr96:role-free-symmetric-arclength-mean-nearest-set-distance@0.1.0' as const;
const METRIC_KEY = 'neutral.mouth.contour_set.symmetric_arclength_mean_nearest_set_distance' as const;
const METRIC_VERSION = '0.1.0' as const;
const METRIC_REF = `${METRIC_KEY}@${METRIC_VERSION}` as const;

export interface RoleFreeArclengthMeanNeutralMetricDefinitionReviewFR97V1 {
  readonly schemaVersion: 'fr97-role-free-arclength-mean-neutral-metric-definition-review-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'role_free_arclength_mean_neutral_metric_definition_review_completed_definition_admitted_no_value_bound';
  readonly sourceFunctionalContract: {
    readonly fr96FunctionalRef: typeof FR96_FUNCTIONAL_REF;
    readonly functional: 'symmetric_arclength_mean_nearest_set_distance';
    readonly mathematicalDefinition: '0.5*((1/L_A)*integral_A d(x,B)ds+(1/L_B)*integral_B d(y,A)ds)';
    readonly certifiedIntervalRequired: true;
    readonly symmetricUnderContourSwap: true;
    readonly cycleStartIndexInvariant: true;
    readonly cycleOrientationInvariant: true;
    readonly explicitPointPairCorrespondenceRequired: false;
    readonly anatomicalRolesRequired: false;
    readonly empiricalToleranceApplied: false;
    readonly calibrationThresholdApplied: false;
    readonly sourceValueCoordinateUnit: 'source_coordinate_unit';
  };
  readonly contractValidationWitness: {
    readonly kind: 'synthetic_role_free_geometry_contract_fixture_only';
    readonly fixtureGeometry: 'two_parallel_closed_two_point_polylines_unit_separation';
    readonly exactTruthContainedInInterval: true;
    readonly fr91SymmetricBudgetCertified: true;
    readonly productionObservationIssuedByWitness: false;
    readonly metricValueIssuedByWitness: false;
  };
  readonly metricDefinition: {
    readonly schemaVersion: 'fr97-neutral-arclength-mean-separation-metric-definition-v1';
    readonly metricKey: typeof METRIC_KEY;
    readonly metricVersion: typeof METRIC_VERSION;
    readonly metricRef: typeof METRIC_REF;
    readonly region: 'mouth';
    readonly sourceFunctionalRef: typeof FR96_FUNCTIONAL_REF;
    readonly coordinateFrame: 'pose_normalized_face_2d';
    readonly unit: 'canonical_metric_plane_distance';
    readonly formula: 'certified symmetric arclength mean nearest-set distance between two unordered pose-normalized contour cycles';
    readonly valueRepresentationRequired: 'certified_interval_point_estimate_and_absolute_error_certificate';
    readonly contourRoleSemantics: 'unordered_role_free_contour_pair';
    readonly providerComponentOrderRequired: false;
    readonly outerInnerAnatomicalRoleRequired: false;
    readonly explicitPointPairCorrespondenceRequired: false;
    readonly physicalAnthropometricInterpretationAllowed: false;
    readonly thicknessInterpretationAllowed: false;
    readonly traditionalCriterionBindingRef: null;
    readonly calibrationRef: null;
    readonly thresholdRef: null;
    readonly interpretationBoundary: 'neutral_role_free_whole_contour_separation_metric_only_no_anatomy_thickness_or_physiognomy';
  };
  readonly reviewDecision: {
    readonly sourceGeometryFunctionalReviewed: true;
    readonly neutralMetricDefinitionAdmitted: true;
    readonly neutralMetricValueBindingAdmitted: false;
    readonly runtimeReimplementationRequiredForValueBinding: false;
    readonly certifiedFR96ValueMayBeWrappedNext: true;
    readonly anatomicalRoleAssignmentAuthorized: false;
    readonly correspondencePairIssuanceAuthorized: false;
    readonly thicknessSemanticAssignmentAuthorized: false;
    readonly physicalAnthropometricInterpretationAuthorized: false;
    readonly morphologyClassificationAuthorized: false;
    readonly traditionalSemanticAssignmentAuthorized: false;
  };
  readonly neutralMetricDefinitionsIssued: 1;
  readonly neutralMetricValuesIssued: 0;
  readonly anatomicalRolesIssued: 0;
  readonly crossContourCorrespondencePairsIssued: 0;
  readonly thicknessMetricIssued: false;
  readonly physicalAnthropometricInterpretationAuthorized: false;
  readonly morphologyProduced: false;
  readonly criterionStatesIssued: 0;
  readonly claimsIssued: 0;
  readonly traditionalSemanticAuthority: false;
  readonly resolvedProcessGap: 'role_free_arclength_mean_geometry_functional_neutral_metric_binding_not_reviewed';
  readonly newlyExposedPrerequisiteBlockers: readonly [
    'role_free_arclength_mean_neutral_metric_value_binding_not_issued',
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
    readonly neutralSeparationMetricMeansLipThickness: false;
    readonly canonicalMetricPlaneDistanceMeansPhysicalSoftTissueAnthropometry: false;
    readonly nearestSetDistanceMeansPointCorrespondence: false;
    readonly neutralMetricDefinitionMeansMetricValue: false;
    readonly neutralMetricDefinitionMeansMorphologyState: false;
    readonly neutralMetricDefinitionMeansTraditionalDuanHou: false;
    readonly numericalCertificateMeansCalibrationThreshold: false;
  };
  readonly prohibitedShortcuts: readonly [
    'neutral_arclength_mean_separation_to_lip_thickness',
    'canonical_metric_plane_distance_to_physical_soft_tissue_anthropometry',
    'nearest_set_distance_to_cross_contour_correspondence_pair',
    'metric_definition_to_metric_value_without_binding_runtime',
    'neutral_metric_definition_to_morphology_state',
    'neutral_metric_definition_to_traditional_duan_hou_semantics',
    'certified_numerical_error_to_calibration_threshold',
  ];
  readonly recommendedNextFrontier: {
    readonly frontierKey: 'role_free_arclength_mean_separation_neutral_metric_value_binding_runtime';
    readonly purpose: 'wrap an issued governed FR96 certified geometry functional value as the admitted FR97 neutral metric value while preserving its interval certificate and all role-free semantic boundaries';
    readonly reuseFR96RuntimeValueAllowed: true;
    readonly runtimeReimplementationRequired: false;
    readonly neutralMetricValueIssuanceMayBeImplementedNext: true;
    readonly anatomicalRoleAssignmentAllowed: false;
    readonly correspondencePairIssuanceAllowed: false;
    readonly thicknessSemanticAssignmentAllowed: false;
    readonly physicalAnthropometricInterpretationAllowed: false;
    readonly traditionalSemanticAssignmentAllowed: false;
  };
}

const ISSUED = new WeakSet<object>();
let CACHED: RoleFreeArclengthMeanNeutralMetricDefinitionReviewFR97V1 | null = null;

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
  'neutral_arclength_mean_separation_to_lip_thickness',
  'canonical_metric_plane_distance_to_physical_soft_tissue_anthropometry',
  'nearest_set_distance_to_cross_contour_correspondence_pair',
  'metric_definition_to_metric_value_without_binding_runtime',
  'neutral_metric_definition_to_morphology_state',
  'neutral_metric_definition_to_traditional_duan_hou_semantics',
  'certified_numerical_error_to_calibration_threshold',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-97 ${message}`);
}

function validateFR96FunctionalContract(): void {
  const witness = computeCertifiedRoleFreeSymmetricArclengthMeanFR96(
    Object.freeze({ contourRef: 'fr97-witness-a', points: Object.freeze([{ x: 0, y: 0 }, { x: 1, y: 0 }]) }),
    Object.freeze({ contourRef: 'fr97-witness-b', points: Object.freeze([{ x: 0, y: 1 }, { x: 1, y: 1 }]) }),
  );
  if (
    witness.schemaVersion !== 'fr96-certified-role-free-symmetric-arclength-mean-computation-v1' ||
    witness.authorityState !== 'certified_role_free_symmetric_arclength_mean_set_distance_geometry_only' ||
    witness.functionalRef !== FR96_FUNCTIONAL_REF ||
    witness.functional !== 'symmetric_arclength_mean_nearest_set_distance' ||
    witness.mathematicalDefinition !== '0.5*((1/L_A)*integral_A d(x,B)ds+(1/L_B)*integral_B d(y,A)ds)' ||
    witness.exactTruthContainedInInterval !== true ||
    witness.fr91SymmetricBudgetCertified !== true ||
    witness.symmetricUnderContourSwapByDefinition !== true ||
    witness.cycleStartIndexInvariantByDefinition !== true ||
    witness.cycleOrientationInvariantByDefinition !== true ||
    witness.explicitPointPairCorrespondenceRequired !== false ||
    witness.explicitPointPairCorrespondenceIssued !== false ||
    witness.anatomicalRolesRequired !== false ||
    witness.empiricalToleranceApplied !== false ||
    witness.calibrationThresholdApplied !== false ||
    witness.valueCoordinateUnit !== 'source_coordinate_unit' ||
    witness.thicknessMetricIssued !== false ||
    witness.traditionalSemanticAuthority !== false
  ) fail('FR-96 certified role-free geometry functional authority drift.');
}

export function reviewRoleFreeArclengthMeanNeutralMetricDefinitionFR97(): RoleFreeArclengthMeanNeutralMetricDefinitionReviewFR97V1 {
  if (CACHED !== null) return CACHED;
  validateFR96FunctionalContract();

  const result: RoleFreeArclengthMeanNeutralMetricDefinitionReviewFR97V1 = Object.freeze({
    schemaVersion: 'fr97-role-free-arclength-mean-neutral-metric-definition-review-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'role_free_arclength_mean_neutral_metric_definition_review_completed_definition_admitted_no_value_bound' as const,
    sourceFunctionalContract: Object.freeze({
      fr96FunctionalRef: FR96_FUNCTIONAL_REF,
      functional: 'symmetric_arclength_mean_nearest_set_distance' as const,
      mathematicalDefinition: '0.5*((1/L_A)*integral_A d(x,B)ds+(1/L_B)*integral_B d(y,A)ds)' as const,
      certifiedIntervalRequired: true as const,
      symmetricUnderContourSwap: true as const,
      cycleStartIndexInvariant: true as const,
      cycleOrientationInvariant: true as const,
      explicitPointPairCorrespondenceRequired: false as const,
      anatomicalRolesRequired: false as const,
      empiricalToleranceApplied: false as const,
      calibrationThresholdApplied: false as const,
      sourceValueCoordinateUnit: 'source_coordinate_unit' as const,
    }),
    contractValidationWitness: Object.freeze({
      kind: 'synthetic_role_free_geometry_contract_fixture_only' as const,
      fixtureGeometry: 'two_parallel_closed_two_point_polylines_unit_separation' as const,
      exactTruthContainedInInterval: true as const,
      fr91SymmetricBudgetCertified: true as const,
      productionObservationIssuedByWitness: false as const,
      metricValueIssuedByWitness: false as const,
    }),
    metricDefinition: Object.freeze({
      schemaVersion: 'fr97-neutral-arclength-mean-separation-metric-definition-v1' as const,
      metricKey: METRIC_KEY,
      metricVersion: METRIC_VERSION,
      metricRef: METRIC_REF,
      region: 'mouth' as const,
      sourceFunctionalRef: FR96_FUNCTIONAL_REF,
      coordinateFrame: 'pose_normalized_face_2d' as const,
      unit: 'canonical_metric_plane_distance' as const,
      formula: 'certified symmetric arclength mean nearest-set distance between two unordered pose-normalized contour cycles' as const,
      valueRepresentationRequired: 'certified_interval_point_estimate_and_absolute_error_certificate' as const,
      contourRoleSemantics: 'unordered_role_free_contour_pair' as const,
      providerComponentOrderRequired: false as const,
      outerInnerAnatomicalRoleRequired: false as const,
      explicitPointPairCorrespondenceRequired: false as const,
      physicalAnthropometricInterpretationAllowed: false as const,
      thicknessInterpretationAllowed: false as const,
      traditionalCriterionBindingRef: null,
      calibrationRef: null,
      thresholdRef: null,
      interpretationBoundary: 'neutral_role_free_whole_contour_separation_metric_only_no_anatomy_thickness_or_physiognomy' as const,
    }),
    reviewDecision: Object.freeze({
      sourceGeometryFunctionalReviewed: true as const,
      neutralMetricDefinitionAdmitted: true as const,
      neutralMetricValueBindingAdmitted: false as const,
      runtimeReimplementationRequiredForValueBinding: false as const,
      certifiedFR96ValueMayBeWrappedNext: true as const,
      anatomicalRoleAssignmentAuthorized: false as const,
      correspondencePairIssuanceAuthorized: false as const,
      thicknessSemanticAssignmentAuthorized: false as const,
      physicalAnthropometricInterpretationAuthorized: false as const,
      morphologyClassificationAuthorized: false as const,
      traditionalSemanticAssignmentAuthorized: false as const,
    }),
    neutralMetricDefinitionsIssued: 1 as const,
    neutralMetricValuesIssued: 0 as const,
    anatomicalRolesIssued: 0 as const,
    crossContourCorrespondencePairsIssued: 0 as const,
    thicknessMetricIssued: false as const,
    physicalAnthropometricInterpretationAuthorized: false as const,
    morphologyProduced: false as const,
    criterionStatesIssued: 0 as const,
    claimsIssued: 0 as const,
    traditionalSemanticAuthority: false as const,
    resolvedProcessGap: 'role_free_arclength_mean_geometry_functional_neutral_metric_binding_not_reviewed' as const,
    newlyExposedPrerequisiteBlockers: Object.freeze([
      'role_free_arclength_mean_neutral_metric_value_binding_not_issued',
    ]) as readonly ['role_free_arclength_mean_neutral_metric_value_binding_not_issued'],
    remainingBlockers: REMAINING,
    authorityBoundary: Object.freeze({
      neutralSeparationMetricMeansLipThickness: false as const,
      canonicalMetricPlaneDistanceMeansPhysicalSoftTissueAnthropometry: false as const,
      nearestSetDistanceMeansPointCorrespondence: false as const,
      neutralMetricDefinitionMeansMetricValue: false as const,
      neutralMetricDefinitionMeansMorphologyState: false as const,
      neutralMetricDefinitionMeansTraditionalDuanHou: false as const,
      numericalCertificateMeansCalibrationThreshold: false as const,
    }),
    prohibitedShortcuts: PROHIBITED,
    recommendedNextFrontier: Object.freeze({
      frontierKey: 'role_free_arclength_mean_separation_neutral_metric_value_binding_runtime' as const,
      purpose: 'wrap an issued governed FR96 certified geometry functional value as the admitted FR97 neutral metric value while preserving its interval certificate and all role-free semantic boundaries' as const,
      reuseFR96RuntimeValueAllowed: true as const,
      runtimeReimplementationRequired: false as const,
      neutralMetricValueIssuanceMayBeImplementedNext: true as const,
      anatomicalRoleAssignmentAllowed: false as const,
      correspondencePairIssuanceAllowed: false as const,
      thicknessSemanticAssignmentAllowed: false as const,
      physicalAnthropometricInterpretationAllowed: false as const,
      traditionalSemanticAssignmentAllowed: false as const,
    }),
  });
  ISSUED.add(result);
  CACHED = result;
  return result;
}

export function assertIssuedRoleFreeArclengthMeanNeutralMetricDefinitionReviewFR97(
  value: RoleFreeArclengthMeanNeutralMetricDefinitionReviewFR97V1,
): void {
  if (!ISSUED.has(value as object)) fail('value was not issued by the active FR-97 boundary.');
  if (
    value.schemaVersion !== 'fr97-role-free-arclength-mean-neutral-metric-definition-review-v1' ||
    value.reviewDecision.neutralMetricDefinitionAdmitted !== true ||
    value.reviewDecision.neutralMetricValueBindingAdmitted !== false ||
    value.neutralMetricDefinitionsIssued !== 1 ||
    value.neutralMetricValuesIssued !== 0 ||
    value.thicknessMetricIssued !== false ||
    value.traditionalSemanticAuthority !== false
  ) fail('issued FR-97 neutral metric definition review authority drift.');
}
