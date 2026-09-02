import {
  assertIssuedGovernedMetricGeometryFR77,
  type GovernedMetricGeometryCandidateFR77V1,
} from './governed-metric-geometry-runtime-fr77.js';
import {
  assertIssuedPoseNormalizedLipsGeometryFR79,
  type PoseNormalizedLipsGeometryFR79V1,
} from './pose-normalized-lips-geometry-fr79.js';
import { FaceAuthorityValidationError } from './validation.js';

const METRIC_KEY = 'neutral.mouth.contour_set.horizontal_span_to_full_mesh_horizontal_span_ratio' as const;
const METRIC_VERSION = '0.1.0' as const;
const METRIC_REF = `${METRIC_KEY}@${METRIC_VERSION}` as const;
const PROJECTION_RULE_REF = 'fr79:canonical-metric-xy-orthographic@0.1.0' as const;

export interface NeutralMouthRelativeSizeMetricDefinitionFR82V1 {
  readonly schemaVersion: 'fr82-neutral-mouth-relative-size-metric-definition-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'reviewed_neutral_relative_size_metric_definition_only';
  readonly metricKey: typeof METRIC_KEY;
  readonly metricVersion: typeof METRIC_VERSION;
  readonly metricRef: typeof METRIC_REF;
  readonly region: 'mouth';
  readonly numeratorSource: 'fr79_two_unordered_pose_normalized_lips_contours_horizontal_span';
  readonly denominatorSource: 'fr77_all_468_canonical_aligned_metric_landmarks_horizontal_span';
  readonly numeratorCoordinateFrame: 'pose_normalized_face_2d';
  readonly denominatorCoordinateFrame: 'canonical_aligned_right_handed_metric_3d';
  readonly comparisonAxis: 'shared_canonical_metric_x';
  readonly axisCompatibilityRule: 'fr79_x_equals_fr77_canonical_metric_x_without_recenter_or_rescale';
  readonly unit: 'ratio';
  readonly formula: '(max_lips_x-min_lips_x)/(max_mesh_x-min_mesh_x)';
  readonly sameProviderRunRequired: true;
  readonly sameCanonicalAssetDigestRequired: true;
  readonly fullMeshLandmarkCount: 468;
  readonly faceOvalTopologyRequired: false;
  readonly faceWidthAnatomicalRoleAssigned: false;
  readonly outerInnerAnatomicalRoleRequired: false;
  readonly absoluteSpanValuesIssued: false;
  readonly physicalAnthropometricInterpretationAllowed: false;
  readonly traditionalCriterionBindingRef: null;
  readonly calibrationRef: null;
  readonly interpretationBoundary: 'continuous_relative_mesh_span_metric_only_no_traditional_big_or_face_width_anatomy';
}

export interface NeutralMouthRelativeSizeMetricValueFR82V1 {
  readonly metricKey: typeof METRIC_KEY;
  readonly metricVersion: typeof METRIC_VERSION;
  readonly metricRef: typeof METRIC_REF;
  readonly value: number;
  readonly unit: 'ratio';
  readonly comparisonAxis: 'shared_canonical_metric_x';
  readonly poseCompensated: true;
  readonly sourceProjectionRuleRef: typeof PROJECTION_RULE_REF;
  readonly sourceMeshLandmarkCount: 468;
  readonly classificationApplied: false;
  readonly calibrationApplied: false;
  readonly traditionalBindingApplied: false;
}

export interface NeutralMouthRelativeSizeMetricFR82V1 {
  readonly schemaVersion: 'fr82-neutral-mouth-relative-size-metric-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'governed_neutral_mouth_relative_size_metric_only';
  readonly extensionMode: 'separate_contract_extension';
  readonly baseNeutralObservationContractRef: 'myeongha-neutral-observation-v1';
  readonly baseFR15ContractMutated: false;
  readonly source: {
    readonly fr77SchemaVersion: 'fr77-governed-metric-geometry-candidate-v1';
    readonly fr77ArtifactVersion: '0.1.0';
    readonly fr77CoordinateFrame: 'canonical_aligned_right_handed_metric_3d';
    readonly fr77Unit: 'centimeter';
    readonly fr77GeometryLandmarkCount: 468;
    readonly fr79SchemaVersion: 'fr79-pose-normalized-lips-geometry-v1';
    readonly fr79ArtifactVersion: '0.1.0';
    readonly fr79SurfaceKey: 'neutral.face.lips_contour_set';
    readonly fr79CoordinateFrame: 'pose_normalized_face_2d';
    readonly fr79CoordinateUnit: 'centimeter';
    readonly fr79PoseCompensated: true;
    readonly fr79ContourCount: 2;
    readonly fr79ContourPointCounts: readonly [20, 20];
    readonly fr79ContourConsumptionState: 'unordered_set_no_outer_inner_role';
    readonly projectionRuleRef: typeof PROJECTION_RULE_REF;
    readonly sameProviderRunVerified: true;
    readonly sameCanonicalAssetDigestVerified: true;
  };
  readonly metricDefinition: NeutralMouthRelativeSizeMetricDefinitionFR82V1;
  readonly metric: NeutralMouthRelativeSizeMetricValueFR82V1;
  readonly resolvedBlockers: readonly ['square_broad_relative_mouth_size_metric_not_defined'];
  readonly neutralMetricDefinitionsIssued: 1;
  readonly neutralMetricValuesIssued: 1;
  readonly relativeMouthSizeMetricIssued: true;
  readonly absoluteMouthDimensionsIssued: 0;
  readonly anatomicalFaceWidthIssued: false;
  readonly outerInnerLipRolesIssued: false;
  readonly morphologyProduced: false;
  readonly criterionStatesIssued: 0;
  readonly claimsIssued: 0;
  readonly traditionalMetricBindingReviewedForThisMetric: false;
  readonly traditionalSemanticAuthority: false;
  readonly authorityBoundary: {
    readonly governedResearchNeutralMetricOutputAuthorized: true;
    readonly productionNeutralObservationIssued: false;
    readonly mutateFR15BaseContractAllowed: false;
    readonly fr15ConsumerSlotIssuanceAllowed: false;
    readonly fullMeshSpanAsAnatomicalFaceWidthAllowed: false;
    readonly absoluteSpanIssuanceAllowed: false;
    readonly physicalAnthropometricInterpretationAllowed: false;
    readonly traditionalBigMeaningAssignmentAllowed: false;
    readonly traditionalCriterionMetricBindingAllowed: false;
    readonly calibrationApplicationAllowed: false;
    readonly morphologyClassificationAllowed: false;
    readonly criterionStateIssuanceAllowed: false;
    readonly claimIssuanceAllowed: false;
  };
  readonly blockers: readonly [
    'fr15_mouth_consumer_slot_not_issued',
    'five_officers_source_not_scan_checked',
    'five_officers_methodology_research_only',
    'square_broad_combined_metric_binding_not_reviewed',
    'square_broad_calibration_evidence_absent',
    'square_broad_calibration_protocol_absent',
    'square_broad_threshold_not_calibrated',
    'outer_inner_lip_roles_not_authorized',
    'lips_substantial_thickness_metric_not_defined',
    'lips_substantial_calibration_evidence_absent',
    'lips_substantial_calibration_protocol_absent',
    'lips_substantial_threshold_not_calibrated',
    'capture_sensitive_intake_criteria_not_authorized',
    'dynamic_lip_color_not_authorized',
  ];
  readonly prohibitedShortcuts: readonly [
    'neutral_relative_mesh_span_ratio_to_square_broad_state',
    'relative_mesh_span_ratio_to_traditional_big_meaning',
    'full_468_landmark_mesh_span_to_anatomical_face_width',
    'canonical_mesh_ratio_to_physical_anthropometry',
    'fr80_plus_fr82_to_square_broad_without_binding_review',
    'neutral_relative_metric_to_calibration_threshold',
    'mixed_provider_runs_to_relative_metric',
    'mixed_canonical_assets_to_relative_metric',
    'unordered_contours_to_outer_inner_anatomy',
  ];
  readonly provenance: {
    readonly providerRunRef: string;
    readonly canonicalAssetDigest: string;
    readonly sourceProjectionRuleRef: typeof PROJECTION_RULE_REF;
    readonly rawSourcePersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly rawProviderDepthPersisted: false;
    readonly derivedFullFaceMetricGeometryPersisted: false;
    readonly derivedPoseNormalizedLipsGeometryPersisted: false;
    readonly derivedNeutralMetricPersisted: false;
    readonly biometricEmbeddingPersisted: false;
  };
}

const METRIC_ISSUED = new WeakSet<object>();
const FR77_POINT_KEYS = new Set(['x', 'y', 'z']);
const FR79_POINT_KEYS = new Set(['x', 'y']);

const REQUIRED_FR77_BLOCKERS = Object.freeze([
  'metric_lips_geometry_not_issued',
  'reviewed_2d_projection_rule_not_admitted',
  'pose_normalized_lips_geometry_not_issued',
  'outer_inner_lip_roles_not_authorized',
  'mouth_metric_definitions_not_reviewed',
  'mouth_static_thresholds_not_calibrated',
  'five_officers_source_not_scan_checked',
] as const);

const REQUIRED_FR77_SHORTCUTS = Object.freeze([
  'full_face_metric_geometry_to_lips_semantic_role',
  'metric_xyz_to_pose_normalized_2d_without_reviewed_projection',
  'metric_geometry_to_morphology',
  'metric_geometry_to_mouth_criterion_state',
  'provider_component_order_to_outer_inner_lip_role',
  'provider_parity_tolerance_to_product_calibration_threshold',
] as const);

const REQUIRED_FR79_BLOCKERS = Object.freeze([
  'outer_inner_lip_roles_not_authorized',
  'mouth_metric_definitions_not_reviewed',
  'mouth_static_thresholds_not_calibrated',
  'five_officers_source_not_scan_checked',
] as const);

const REQUIRED_FR79_SHORTCUTS = Object.freeze([
  'pose_normalized_lips_geometry_to_mouth_width_height_aspect_or_thickness_without_metric_definition',
  'unordered_pose_normalized_contours_to_outer_inner_anatomy',
  'pose_normalized_lips_geometry_to_square_broad_classification',
  'pose_normalized_lips_geometry_to_lips_substantial_classification',
  'orthographic_projection_rule_to_metric_threshold',
  'centimeter_plane_coordinate_to_physical_anthropometric_measurement',
  'provider_component_order_to_semantic_role',
] as const);

const RESOLVED_BLOCKERS = Object.freeze([
  'square_broad_relative_mouth_size_metric_not_defined',
] as const);

const BLOCKERS = Object.freeze([
  'fr15_mouth_consumer_slot_not_issued',
  'five_officers_source_not_scan_checked',
  'five_officers_methodology_research_only',
  'square_broad_combined_metric_binding_not_reviewed',
  'square_broad_calibration_evidence_absent',
  'square_broad_calibration_protocol_absent',
  'square_broad_threshold_not_calibrated',
  'outer_inner_lip_roles_not_authorized',
  'lips_substantial_thickness_metric_not_defined',
  'lips_substantial_calibration_evidence_absent',
  'lips_substantial_calibration_protocol_absent',
  'lips_substantial_threshold_not_calibrated',
  'capture_sensitive_intake_criteria_not_authorized',
  'dynamic_lip_color_not_authorized',
] as const);

const PROHIBITED_SHORTCUTS = Object.freeze([
  'neutral_relative_mesh_span_ratio_to_square_broad_state',
  'relative_mesh_span_ratio_to_traditional_big_meaning',
  'full_468_landmark_mesh_span_to_anatomical_face_width',
  'canonical_mesh_ratio_to_physical_anthropometry',
  'fr80_plus_fr82_to_square_broad_without_binding_review',
  'neutral_relative_metric_to_calibration_threshold',
  'mixed_provider_runs_to_relative_metric',
  'mixed_canonical_assets_to_relative_metric',
  'unordered_contours_to_outer_inner_anatomy',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-82 ${message}`);
}

function sameSequence<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

export function getNeutralMouthRelativeSizeMetricDefinitionFR82(): NeutralMouthRelativeSizeMetricDefinitionFR82V1 {
  return Object.freeze({
    schemaVersion: 'fr82-neutral-mouth-relative-size-metric-definition-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'reviewed_neutral_relative_size_metric_definition_only' as const,
    metricKey: METRIC_KEY,
    metricVersion: METRIC_VERSION,
    metricRef: METRIC_REF,
    region: 'mouth' as const,
    numeratorSource: 'fr79_two_unordered_pose_normalized_lips_contours_horizontal_span' as const,
    denominatorSource: 'fr77_all_468_canonical_aligned_metric_landmarks_horizontal_span' as const,
    numeratorCoordinateFrame: 'pose_normalized_face_2d' as const,
    denominatorCoordinateFrame: 'canonical_aligned_right_handed_metric_3d' as const,
    comparisonAxis: 'shared_canonical_metric_x' as const,
    axisCompatibilityRule: 'fr79_x_equals_fr77_canonical_metric_x_without_recenter_or_rescale' as const,
    unit: 'ratio' as const,
    formula: '(max_lips_x-min_lips_x)/(max_mesh_x-min_mesh_x)' as const,
    sameProviderRunRequired: true as const,
    sameCanonicalAssetDigestRequired: true as const,
    fullMeshLandmarkCount: 468 as const,
    faceOvalTopologyRequired: false as const,
    faceWidthAnatomicalRoleAssigned: false as const,
    outerInnerAnatomicalRoleRequired: false as const,
    absoluteSpanValuesIssued: false as const,
    physicalAnthropometricInterpretationAllowed: false as const,
    traditionalCriterionBindingRef: null,
    calibrationRef: null,
    interpretationBoundary: 'continuous_relative_mesh_span_metric_only_no_traditional_big_or_face_width_anatomy' as const,
  });
}

function validateFR77Source(source: GovernedMetricGeometryCandidateFR77V1): void {
  assertIssuedGovernedMetricGeometryFR77(source);
  if (
    source.schemaVersion !== 'fr77-governed-metric-geometry-candidate-v1' ||
    source.artifactVersion !== '0.1.0' ||
    source.authorityState !== 'governed_metric_geometry_candidate_only' ||
    source.coordinateFrame !== 'canonical_aligned_right_handed_metric_3d' ||
    source.unit !== 'centimeter' ||
    source.provider.geometryLandmarkCount !== 468 ||
    source.metricLandmarks.length !== 468 ||
    source.geometryProfile.exactGitBlobVerified !== true
  ) fail('requires the exact issued FR-77 full-face metric geometry boundary.');
  for (let index = 0; index < source.metricLandmarks.length; index += 1) {
    const point = source.metricLandmarks[index]!;
    const unexpected = Object.keys(point).find((key) => !FR77_POINT_KEYS.has(key));
    if (unexpected !== undefined) fail(`FR-77 metric landmark ${index} exposes unauthorized field ${unexpected}.`);
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y) || !Number.isFinite(point.z)) {
      fail(`FR-77 metric landmark ${index} must contain finite XYZ.`);
    }
  }
  const authority = source.authorityBoundary;
  if (
    authority.governedResearchMetricGeometryOutputAuthorized !== true ||
    authority.productionNeutralObservationIssued !== false ||
    authority.metricLipsGeometryIssued !== false ||
    authority.poseNormalizedLipsGeometryIssued !== false ||
    authority.reviewed2DProjectionRuleIssued !== false ||
    authority.neutralMetricDefinitionsIssued !== 0 ||
    authority.neutralMetricValuesIssued !== 0 ||
    authority.morphologyProduced !== false ||
    authority.criterionStatesIssued !== 0 ||
    authority.claimsIssued !== 0 ||
    authority.traditionalSemanticAuthority !== false
  ) fail('cannot consume widened FR-77 metric, morphology, criterion, claim, or semantic authority.');
  if (REQUIRED_FR77_BLOCKERS.some((blocker) => !source.blockers.includes(blocker))) {
    fail('requires all FR-77 mouth/source blockers before relative metric review.');
  }
  if (REQUIRED_FR77_SHORTCUTS.some((shortcut) => !source.prohibitedShortcuts.includes(shortcut))) {
    fail('requires all FR-77 anti-shortcut restrictions before relative metric review.');
  }
  if (Object.values(source.persistencePolicy).some((value) => value !== false)) {
    fail('requires FR-77 non-persistence policy to remain intact.');
  }
}

function validateFR79Source(source: PoseNormalizedLipsGeometryFR79V1): void {
  assertIssuedPoseNormalizedLipsGeometryFR79(source);
  if (
    source.schemaVersion !== 'fr79-pose-normalized-lips-geometry-v1' ||
    source.artifactVersion !== '0.1.0' ||
    source.authorityState !== 'governed_pose_normalized_lips_geometry_candidate_only' ||
    source.baseFR15ContractMutated !== false ||
    source.surfaceKey !== 'neutral.face.lips_contour_set' ||
    source.coordinateFrame !== 'pose_normalized_face_2d' ||
    source.coordinateUnit !== 'centimeter' ||
    source.poseCompensated !== true ||
    source.projectionRule.projectionRuleRef !== PROJECTION_RULE_REF ||
    source.projectionRule.formula !== 'x2d=x3d;y2d=y3d' ||
    source.projectionRule.recenteringApplied !== false ||
    source.projectionRule.rescalingApplied !== false ||
    source.contourCount !== 2 ||
    source.contours.length !== 2 ||
    source.contourPointCounts[0] !== 20 ||
    source.contourPointCounts[1] !== 20 ||
    source.contourConsumptionState !== 'unordered_set_no_outer_inner_role'
  ) fail('requires the exact issued FR-79 pose-normalized lips geometry and shared canonical X axis.');
  for (let contourIndex = 0; contourIndex < source.contours.length; contourIndex += 1) {
    const contour = source.contours[contourIndex]!;
    if (
      contour.geometry.kind !== 'region' ||
      contour.geometry.boundary.length !== 20 ||
      contour.anatomicalRole !== null ||
      contour.traditionalRole !== null
    ) fail(`FR-79 contour ${contourIndex} geometry or semantic-role authority drift.`);
    for (let pointIndex = 0; pointIndex < contour.geometry.boundary.length; pointIndex += 1) {
      const point = contour.geometry.boundary[pointIndex]!;
      const unexpected = Object.keys(point).find((key) => !FR79_POINT_KEYS.has(key));
      if (unexpected !== undefined) fail(`FR-79 contour ${contourIndex} point ${pointIndex} exposes unauthorized field ${unexpected}.`);
      if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) {
        fail(`FR-79 contour ${contourIndex} point ${pointIndex} must contain finite XY.`);
      }
    }
  }
  if (
    source.neutralMetricDefinitionsIssued !== 0 ||
    source.neutralMetricValuesIssued !== 0 ||
    source.morphologyProduced !== false ||
    source.criterionStatesIssued !== 0 ||
    source.claimsIssued !== 0 ||
    source.traditionalSemanticAuthority !== false ||
    source.authorityBoundary.traditionalOperationalizationAllowed !== false
  ) fail('cannot consume widened FR-79 metric, morphology, criterion, claim, or semantic authority.');
  if (REQUIRED_FR79_BLOCKERS.some((blocker) => !source.blockers.includes(blocker))) {
    fail('requires all FR-79 mouth/source blockers before relative metric review.');
  }
  if (REQUIRED_FR79_SHORTCUTS.some((shortcut) => !source.prohibitedShortcuts.includes(shortcut))) {
    fail('requires all FR-79 anti-shortcut restrictions before relative metric review.');
  }
  if (
    source.provenance.rawSourcePersisted !== false ||
    source.provenance.rawProviderResponsePersisted !== false ||
    source.provenance.rawProviderDepthPersisted !== false ||
    source.provenance.derivedPoseNormalizedLipsGeometryPersisted !== false ||
    source.provenance.biometricEmbeddingPersisted !== false
  ) fail('requires FR-79 non-persistence provenance to remain intact.');
}

function validateSameProvenance(
  fullFace: GovernedMetricGeometryCandidateFR77V1,
  lips: PoseNormalizedLipsGeometryFR79V1,
): void {
  if (fullFace.provider.providerRunRef !== lips.provenance.providerRunRef) {
    fail('FR-77 full-face geometry and FR-79 lips geometry must come from the same providerRunRef.');
  }
  if (fullFace.provider.canonicalAssetDigest !== lips.provenance.canonicalAssetDigest) {
    fail('FR-77 full-face geometry and FR-79 lips geometry must use the same canonicalAssetDigest.');
  }
}

export function computeNeutralMouthRelativeSizeMetricFR82(
  fullFace: GovernedMetricGeometryCandidateFR77V1,
  lips: PoseNormalizedLipsGeometryFR79V1,
): NeutralMouthRelativeSizeMetricFR82V1 {
  validateFR77Source(fullFace);
  validateFR79Source(lips);
  validateSameProvenance(fullFace, lips);

  const lipsXs = lips.contours.flatMap((contour) => contour.geometry.boundary.map((point) => point.x));
  const meshXs = fullFace.metricLandmarks.map((point) => point.x);
  const mouthHorizontalSpan = Math.max(...lipsXs) - Math.min(...lipsXs);
  const fullMeshHorizontalSpan = Math.max(...meshXs) - Math.min(...meshXs);
  if (!Number.isFinite(mouthHorizontalSpan) || mouthHorizontalSpan <= 0) {
    fail(`mouth horizontal span must be finite and positive; actual=${mouthHorizontalSpan}.`);
  }
  if (!Number.isFinite(fullMeshHorizontalSpan) || fullMeshHorizontalSpan <= 0) {
    fail(`full mesh horizontal span must be finite and positive; actual=${fullMeshHorizontalSpan}.`);
  }
  if (mouthHorizontalSpan > fullMeshHorizontalSpan + 1e-12) {
    fail('mouth horizontal span cannot exceed the same-run full 468-landmark mesh horizontal span.');
  }
  const value = mouthHorizontalSpan / fullMeshHorizontalSpan;
  if (!Number.isFinite(value) || value <= 0 || value > 1 + 1e-12) {
    fail(`invalid neutral relative mouth-size ratio: ${value}.`);
  }

  const definition = getNeutralMouthRelativeSizeMetricDefinitionFR82();
  const result: NeutralMouthRelativeSizeMetricFR82V1 = Object.freeze({
    schemaVersion: 'fr82-neutral-mouth-relative-size-metric-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'governed_neutral_mouth_relative_size_metric_only' as const,
    extensionMode: 'separate_contract_extension' as const,
    baseNeutralObservationContractRef: 'myeongha-neutral-observation-v1' as const,
    baseFR15ContractMutated: false as const,
    source: Object.freeze({
      fr77SchemaVersion: fullFace.schemaVersion,
      fr77ArtifactVersion: fullFace.artifactVersion,
      fr77CoordinateFrame: fullFace.coordinateFrame,
      fr77Unit: fullFace.unit,
      fr77GeometryLandmarkCount: fullFace.provider.geometryLandmarkCount,
      fr79SchemaVersion: lips.schemaVersion,
      fr79ArtifactVersion: lips.artifactVersion,
      fr79SurfaceKey: lips.surfaceKey,
      fr79CoordinateFrame: lips.coordinateFrame,
      fr79CoordinateUnit: lips.coordinateUnit,
      fr79PoseCompensated: lips.poseCompensated,
      fr79ContourCount: lips.contourCount,
      fr79ContourPointCounts: lips.contourPointCounts,
      fr79ContourConsumptionState: lips.contourConsumptionState,
      projectionRuleRef: lips.projectionRule.projectionRuleRef,
      sameProviderRunVerified: true as const,
      sameCanonicalAssetDigestVerified: true as const,
    }),
    metricDefinition: definition,
    metric: Object.freeze({
      metricKey: definition.metricKey,
      metricVersion: definition.metricVersion,
      metricRef: definition.metricRef,
      value,
      unit: 'ratio' as const,
      comparisonAxis: 'shared_canonical_metric_x' as const,
      poseCompensated: true as const,
      sourceProjectionRuleRef: PROJECTION_RULE_REF,
      sourceMeshLandmarkCount: 468 as const,
      classificationApplied: false as const,
      calibrationApplied: false as const,
      traditionalBindingApplied: false as const,
    }),
    resolvedBlockers: RESOLVED_BLOCKERS,
    neutralMetricDefinitionsIssued: 1 as const,
    neutralMetricValuesIssued: 1 as const,
    relativeMouthSizeMetricIssued: true as const,
    absoluteMouthDimensionsIssued: 0 as const,
    anatomicalFaceWidthIssued: false as const,
    outerInnerLipRolesIssued: false as const,
    morphologyProduced: false as const,
    criterionStatesIssued: 0 as const,
    claimsIssued: 0 as const,
    traditionalMetricBindingReviewedForThisMetric: false as const,
    traditionalSemanticAuthority: false as const,
    authorityBoundary: Object.freeze({
      governedResearchNeutralMetricOutputAuthorized: true as const,
      productionNeutralObservationIssued: false as const,
      mutateFR15BaseContractAllowed: false as const,
      fr15ConsumerSlotIssuanceAllowed: false as const,
      fullMeshSpanAsAnatomicalFaceWidthAllowed: false as const,
      absoluteSpanIssuanceAllowed: false as const,
      physicalAnthropometricInterpretationAllowed: false as const,
      traditionalBigMeaningAssignmentAllowed: false as const,
      traditionalCriterionMetricBindingAllowed: false as const,
      calibrationApplicationAllowed: false as const,
      morphologyClassificationAllowed: false as const,
      criterionStateIssuanceAllowed: false as const,
      claimIssuanceAllowed: false as const,
    }),
    blockers: BLOCKERS,
    prohibitedShortcuts: PROHIBITED_SHORTCUTS,
    provenance: Object.freeze({
      providerRunRef: fullFace.provider.providerRunRef,
      canonicalAssetDigest: fullFace.provider.canonicalAssetDigest,
      sourceProjectionRuleRef: PROJECTION_RULE_REF,
      rawSourcePersisted: false as const,
      rawProviderResponsePersisted: false as const,
      rawProviderDepthPersisted: false as const,
      derivedFullFaceMetricGeometryPersisted: false as const,
      derivedPoseNormalizedLipsGeometryPersisted: false as const,
      derivedNeutralMetricPersisted: false as const,
      biometricEmbeddingPersisted: false as const,
    }),
  });
  METRIC_ISSUED.add(result);
  return result;
}

export function assertIssuedNeutralMouthRelativeSizeMetricFR82(
  candidate: NeutralMouthRelativeSizeMetricFR82V1,
): void {
  if (!METRIC_ISSUED.has(candidate)) fail('relative mouth-size metric was not issued by the active FR-82 metric boundary.');
  const definition = candidate.metricDefinition;
  if (
    candidate.schemaVersion !== 'fr82-neutral-mouth-relative-size-metric-v1' ||
    candidate.artifactVersion !== '0.1.0' ||
    candidate.authorityState !== 'governed_neutral_mouth_relative_size_metric_only' ||
    candidate.baseFR15ContractMutated !== false ||
    definition.metricRef !== METRIC_REF ||
    definition.formula !== '(max_lips_x-min_lips_x)/(max_mesh_x-min_mesh_x)' ||
    definition.comparisonAxis !== 'shared_canonical_metric_x' ||
    definition.sameProviderRunRequired !== true ||
    definition.sameCanonicalAssetDigestRequired !== true ||
    definition.fullMeshLandmarkCount !== 468 ||
    definition.faceOvalTopologyRequired !== false ||
    definition.faceWidthAnatomicalRoleAssigned !== false ||
    definition.absoluteSpanValuesIssued !== false ||
    definition.physicalAnthropometricInterpretationAllowed !== false ||
    definition.traditionalCriterionBindingRef !== null ||
    definition.calibrationRef !== null
  ) fail('issued FR-82 metric definition identity or authority drift.');
  if (
    candidate.metric.metricRef !== METRIC_REF ||
    !Number.isFinite(candidate.metric.value) ||
    candidate.metric.value <= 0 ||
    candidate.metric.value > 1 + 1e-12 ||
    candidate.metric.unit !== 'ratio' ||
    candidate.metric.comparisonAxis !== 'shared_canonical_metric_x' ||
    candidate.metric.poseCompensated !== true ||
    candidate.metric.sourceProjectionRuleRef !== PROJECTION_RULE_REF ||
    candidate.metric.sourceMeshLandmarkCount !== 468 ||
    candidate.metric.classificationApplied !== false ||
    candidate.metric.calibrationApplied !== false ||
    candidate.metric.traditionalBindingApplied !== false
  ) fail('issued FR-82 metric value identity or authority drift.');
  if (
    candidate.source.sameProviderRunVerified !== true ||
    candidate.source.sameCanonicalAssetDigestVerified !== true ||
    candidate.neutralMetricDefinitionsIssued !== 1 ||
    candidate.neutralMetricValuesIssued !== 1 ||
    candidate.relativeMouthSizeMetricIssued !== true ||
    candidate.absoluteMouthDimensionsIssued !== 0 ||
    candidate.anatomicalFaceWidthIssued !== false ||
    candidate.outerInnerLipRolesIssued !== false ||
    candidate.morphologyProduced !== false ||
    candidate.criterionStatesIssued !== 0 ||
    candidate.claimsIssued !== 0 ||
    candidate.traditionalMetricBindingReviewedForThisMetric !== false ||
    candidate.traditionalSemanticAuthority !== false
  ) fail('issued FR-82 output authority widened.');
  const authority = candidate.authorityBoundary;
  if (
    authority.governedResearchNeutralMetricOutputAuthorized !== true ||
    authority.productionNeutralObservationIssued !== false ||
    authority.mutateFR15BaseContractAllowed !== false ||
    authority.fr15ConsumerSlotIssuanceAllowed !== false ||
    authority.fullMeshSpanAsAnatomicalFaceWidthAllowed !== false ||
    authority.absoluteSpanIssuanceAllowed !== false ||
    authority.physicalAnthropometricInterpretationAllowed !== false ||
    authority.traditionalBigMeaningAssignmentAllowed !== false ||
    authority.traditionalCriterionMetricBindingAllowed !== false ||
    authority.calibrationApplicationAllowed !== false ||
    authority.morphologyClassificationAllowed !== false ||
    authority.criterionStateIssuanceAllowed !== false ||
    authority.claimIssuanceAllowed !== false
  ) fail('issued FR-82 authority boundary widened.');
  if (!sameSequence(candidate.resolvedBlockers, RESOLVED_BLOCKERS)) fail('issued FR-82 resolved blocker drift.');
  if (!sameSequence(candidate.blockers, BLOCKERS)) fail('issued FR-82 blocker drift.');
  if (!sameSequence(candidate.prohibitedShortcuts, PROHIBITED_SHORTCUTS)) fail('issued FR-82 prohibited-shortcut drift.');
  if (
    candidate.provenance.rawSourcePersisted !== false ||
    candidate.provenance.rawProviderResponsePersisted !== false ||
    candidate.provenance.rawProviderDepthPersisted !== false ||
    candidate.provenance.derivedFullFaceMetricGeometryPersisted !== false ||
    candidate.provenance.derivedPoseNormalizedLipsGeometryPersisted !== false ||
    candidate.provenance.derivedNeutralMetricPersisted !== false ||
    candidate.provenance.biometricEmbeddingPersisted !== false
  ) fail('issued FR-82 persistence boundary widened.');
}