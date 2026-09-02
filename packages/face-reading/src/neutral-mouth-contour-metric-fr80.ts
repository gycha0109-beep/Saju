import {
  assertIssuedPoseNormalizedLipsGeometryFR79,
  type PoseNormalizedLipsGeometryFR79V1,
} from './pose-normalized-lips-geometry-fr79.js';
import { FaceAuthorityValidationError } from './validation.js';

const METRIC_KEY = 'neutral.mouth.contour_set.bounding_box_aspect_ratio' as const;
const METRIC_VERSION = '0.1.0' as const;
const METRIC_REF = `${METRIC_KEY}@${METRIC_VERSION}` as const;

export interface NeutralMouthContourMetricDefinitionFR80V1 {
  readonly schemaVersion: 'fr80-neutral-mouth-contour-metric-definition-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'reviewed_neutral_geometry_metric_definition_only';
  readonly metricKey: typeof METRIC_KEY;
  readonly metricVersion: typeof METRIC_VERSION;
  readonly metricRef: typeof METRIC_REF;
  readonly region: 'mouth';
  readonly sourceSurfaceKey: 'neutral.face.lips_contour_set';
  readonly coordinateFrame: 'pose_normalized_face_2d';
  readonly unit: 'ratio';
  readonly requiredGeometry: 'two_unordered_pose_normalized_lips_contours';
  readonly formula: '(max_x-min_x)/(max_y-min_y) over the union of both contour point sets';
  readonly outerInnerAnatomicalRoleRequired: false;
  readonly providerComponentOrderRequired: false;
  readonly absoluteWidthHeightIssued: false;
  readonly physicalAnthropometricInterpretationAllowed: false;
  readonly traditionalCriterionBindingRef: null;
  readonly calibrationRef: null;
  readonly interpretationBoundary: 'continuous_unordered_contour_set_shape_metric_only_no_physiognomy_classification';
}

export interface NeutralMouthContourMetricValueFR80V1 {
  readonly metricKey: typeof METRIC_KEY;
  readonly metricVersion: typeof METRIC_VERSION;
  readonly metricRef: typeof METRIC_REF;
  readonly value: number;
  readonly unit: 'ratio';
  readonly coordinateFrame: 'pose_normalized_face_2d';
  readonly poseCompensated: true;
  readonly sourceContourRefs: readonly [string, string];
  readonly classificationApplied: false;
  readonly calibrationApplied: false;
  readonly traditionalBindingApplied: false;
}

export interface NeutralMouthContourMetricFR80V1 {
  readonly schemaVersion: 'fr80-neutral-mouth-contour-metric-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'governed_neutral_mouth_contour_metric_only';
  readonly extensionMode: 'separate_contract_extension';
  readonly baseNeutralObservationContractRef: 'myeongha-neutral-observation-v1';
  readonly baseFR15ContractMutated: false;
  readonly source: {
    readonly fr79SchemaVersion: 'fr79-pose-normalized-lips-geometry-v1';
    readonly fr79ArtifactVersion: '0.1.0';
    readonly surfaceKey: 'neutral.face.lips_contour_set';
    readonly coordinateFrame: 'pose_normalized_face_2d';
    readonly coordinateUnit: 'centimeter';
    readonly poseCompensated: true;
    readonly contourCount: 2;
    readonly contourPointCounts: readonly [20, 20];
    readonly contourConsumptionState: 'unordered_set_no_outer_inner_role';
    readonly projectionRuleRef: 'fr79:canonical-metric-xy-orthographic@0.1.0';
  };
  readonly metricDefinition: NeutralMouthContourMetricDefinitionFR80V1;
  readonly metric: NeutralMouthContourMetricValueFR80V1;
  readonly neutralMetricDefinitionsIssued: 1;
  readonly neutralMetricValuesIssued: 1;
  readonly absoluteMouthDimensionsIssued: 0;
  readonly outerInnerLipRolesIssued: false;
  readonly morphologyProduced: false;
  readonly criterionStatesIssued: 0;
  readonly claimsIssued: 0;
  readonly traditionalMetricBindingReviewed: false;
  readonly traditionalSemanticAuthority: false;
  readonly authorityBoundary: {
    readonly governedResearchNeutralMetricOutputAuthorized: true;
    readonly productionNeutralObservationIssued: false;
    readonly mutateFR15BaseContractAllowed: false;
    readonly fr15ConsumerSlotIssuanceAllowed: false;
    readonly outerInnerAnatomicalAssignmentAllowed: false;
    readonly absoluteMouthDimensionIssuanceAllowed: false;
    readonly physicalAnthropometricInterpretationAllowed: false;
    readonly traditionalCriterionMetricBindingAllowed: false;
    readonly calibrationApplicationAllowed: false;
    readonly morphologyClassificationAllowed: false;
    readonly criterionStateIssuanceAllowed: false;
    readonly claimIssuanceAllowed: false;
  };
  readonly blockers: readonly [
    'fr15_mouth_consumer_slot_not_issued',
    'outer_inner_lip_roles_not_authorized',
    'traditional_mouth_metric_binding_not_reviewed',
    'mouth_calibration_evidence_absent',
    'mouth_calibration_protocol_absent',
    'mouth_static_thresholds_not_calibrated',
    'five_officers_source_not_scan_checked',
  ];
  readonly prohibitedShortcuts: readonly [
    'neutral_bounding_box_aspect_ratio_to_square_broad_state',
    'neutral_bounding_box_aspect_ratio_to_lips_substantial_state',
    'neutral_metric_to_traditional_criterion_binding_without_review',
    'neutral_metric_to_calibration_threshold',
    'unordered_contours_to_outer_inner_anatomy',
    'canonical_metric_plane_coordinates_to_physical_anthropometry',
    'ratio_metric_to_absolute_mouth_width_or_height',
    'provider_component_order_to_semantic_role',
  ];
  readonly provenance: {
    readonly providerRunRef: string;
    readonly canonicalAssetDigest: string;
    readonly sourceProjectionRuleRef: 'fr79:canonical-metric-xy-orthographic@0.1.0';
    readonly rawSourcePersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly rawProviderDepthPersisted: false;
    readonly derivedPoseNormalizedLipsGeometryPersisted: false;
    readonly derivedNeutralMetricPersisted: false;
    readonly biometricEmbeddingPersisted: false;
  };
}

const METRIC_ISSUED = new WeakSet<object>();
const POINT_KEYS = new Set(['x', 'y']);

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

const BLOCKERS = Object.freeze([
  'fr15_mouth_consumer_slot_not_issued',
  'outer_inner_lip_roles_not_authorized',
  'traditional_mouth_metric_binding_not_reviewed',
  'mouth_calibration_evidence_absent',
  'mouth_calibration_protocol_absent',
  'mouth_static_thresholds_not_calibrated',
  'five_officers_source_not_scan_checked',
] as const);

const PROHIBITED_SHORTCUTS = Object.freeze([
  'neutral_bounding_box_aspect_ratio_to_square_broad_state',
  'neutral_bounding_box_aspect_ratio_to_lips_substantial_state',
  'neutral_metric_to_traditional_criterion_binding_without_review',
  'neutral_metric_to_calibration_threshold',
  'unordered_contours_to_outer_inner_anatomy',
  'canonical_metric_plane_coordinates_to_physical_anthropometry',
  'ratio_metric_to_absolute_mouth_width_or_height',
  'provider_component_order_to_semantic_role',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-80 ${message}`);
}

export function getNeutralMouthContourMetricDefinitionFR80(): NeutralMouthContourMetricDefinitionFR80V1 {
  return Object.freeze({
    schemaVersion: 'fr80-neutral-mouth-contour-metric-definition-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'reviewed_neutral_geometry_metric_definition_only' as const,
    metricKey: METRIC_KEY,
    metricVersion: METRIC_VERSION,
    metricRef: METRIC_REF,
    region: 'mouth' as const,
    sourceSurfaceKey: 'neutral.face.lips_contour_set' as const,
    coordinateFrame: 'pose_normalized_face_2d' as const,
    unit: 'ratio' as const,
    requiredGeometry: 'two_unordered_pose_normalized_lips_contours' as const,
    formula: '(max_x-min_x)/(max_y-min_y) over the union of both contour point sets' as const,
    outerInnerAnatomicalRoleRequired: false as const,
    providerComponentOrderRequired: false as const,
    absoluteWidthHeightIssued: false as const,
    physicalAnthropometricInterpretationAllowed: false as const,
    traditionalCriterionBindingRef: null,
    calibrationRef: null,
    interpretationBoundary: 'continuous_unordered_contour_set_shape_metric_only_no_physiognomy_classification' as const,
  });
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
    source.contourCount !== 2 ||
    source.contours.length !== 2 ||
    source.contourPointCounts[0] !== 20 ||
    source.contourPointCounts[1] !== 20 ||
    source.contourConsumptionState !== 'unordered_set_no_outer_inner_role' ||
    source.projectionRule.projectionRuleRef !== 'fr79:canonical-metric-xy-orthographic@0.1.0'
  ) fail('requires the exact issued FR-79 pose-normalized lips geometry boundary.');

  for (let contourIndex = 0; contourIndex < source.contours.length; contourIndex += 1) {
    const contour = source.contours[contourIndex]!;
    if (
      contour.geometry.kind !== 'region' ||
      contour.geometry.boundary.length !== 20 ||
      contour.sourceComponentAuthority !== 'unordered_provider_graph_component_only' ||
      contour.anatomicalRole !== null ||
      contour.traditionalRole !== null
    ) fail(`FR-79 contour ${contourIndex} geometry or semantic-role authority drift.`);
    for (let pointIndex = 0; pointIndex < contour.geometry.boundary.length; pointIndex += 1) {
      const point = contour.geometry.boundary[pointIndex]!;
      const unexpected = Object.keys(point).find((key) => !POINT_KEYS.has(key));
      if (unexpected !== undefined) fail(`FR-79 point exposes unauthorized field ${unexpected}.`);
      if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) {
        fail(`FR-79 contour ${contourIndex} point ${pointIndex} must contain finite X/Y.`);
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
    source.authorityBoundary.metricDefinitionIssuanceAllowed !== false ||
    source.authorityBoundary.metricValueIssuanceAllowed !== false ||
    source.authorityBoundary.outerInnerAnatomicalAssignmentAllowed !== false ||
    source.authorityBoundary.traditionalOperationalizationAllowed !== false
  ) fail('cannot consume widened FR-79 metric, morphology, criterion, claim, or semantic authority.');

  if (REQUIRED_FR79_BLOCKERS.some((blocker) => !source.blockers.includes(blocker))) {
    fail('requires all FR-79 mouth metric/source blockers before neutral metric review.');
  }
  if (REQUIRED_FR79_SHORTCUTS.some((shortcut) => !source.prohibitedShortcuts.includes(shortcut))) {
    fail('requires all FR-79 anti-shortcut restrictions before neutral metric review.');
  }
  if (
    source.provenance.rawSourcePersisted !== false ||
    source.provenance.rawProviderResponsePersisted !== false ||
    source.provenance.rawProviderDepthPersisted !== false ||
    source.provenance.derivedPoseNormalizedLipsGeometryPersisted !== false ||
    source.provenance.biometricEmbeddingPersisted !== false
  ) fail('requires FR-79 non-persistence provenance to remain intact.');
}

export function computeNeutralMouthContourMetricFR80(
  source: PoseNormalizedLipsGeometryFR79V1,
): NeutralMouthContourMetricFR80V1 {
  validateFR79Source(source);
  const points = source.contours.flatMap((contour) => contour.geometry.boundary);
  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);
  const width = Math.max(...xs) - Math.min(...xs);
  const height = Math.max(...ys) - Math.min(...ys);
  if (!Number.isFinite(width) || width <= 0 || !Number.isFinite(height) || height <= 0) {
    fail(`union contour bounding box must have finite positive spans; width=${width} height=${height}.`);
  }
  const value = width / height;
  if (!Number.isFinite(value) || value <= 0) fail(`invalid bounding-box aspect ratio: ${value}.`);

  const definition = getNeutralMouthContourMetricDefinitionFR80();
  const result: NeutralMouthContourMetricFR80V1 = Object.freeze({
    schemaVersion: 'fr80-neutral-mouth-contour-metric-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'governed_neutral_mouth_contour_metric_only' as const,
    extensionMode: 'separate_contract_extension' as const,
    baseNeutralObservationContractRef: 'myeongha-neutral-observation-v1' as const,
    baseFR15ContractMutated: false as const,
    source: Object.freeze({
      fr79SchemaVersion: source.schemaVersion,
      fr79ArtifactVersion: source.artifactVersion,
      surfaceKey: source.surfaceKey,
      coordinateFrame: source.coordinateFrame,
      coordinateUnit: source.coordinateUnit,
      poseCompensated: source.poseCompensated,
      contourCount: source.contourCount,
      contourPointCounts: source.contourPointCounts,
      contourConsumptionState: source.contourConsumptionState,
      projectionRuleRef: source.projectionRule.projectionRuleRef,
    }),
    metricDefinition: definition,
    metric: Object.freeze({
      metricKey: definition.metricKey,
      metricVersion: definition.metricVersion,
      metricRef: definition.metricRef,
      value,
      unit: 'ratio' as const,
      coordinateFrame: source.coordinateFrame,
      poseCompensated: true as const,
      sourceContourRefs: Object.freeze([
        source.contours[0]!.contourRef,
        source.contours[1]!.contourRef,
      ]) as readonly [string, string],
      classificationApplied: false as const,
      calibrationApplied: false as const,
      traditionalBindingApplied: false as const,
    }),
    neutralMetricDefinitionsIssued: 1 as const,
    neutralMetricValuesIssued: 1 as const,
    absoluteMouthDimensionsIssued: 0 as const,
    outerInnerLipRolesIssued: false as const,
    morphologyProduced: false as const,
    criterionStatesIssued: 0 as const,
    claimsIssued: 0 as const,
    traditionalMetricBindingReviewed: false as const,
    traditionalSemanticAuthority: false as const,
    authorityBoundary: Object.freeze({
      governedResearchNeutralMetricOutputAuthorized: true as const,
      productionNeutralObservationIssued: false as const,
      mutateFR15BaseContractAllowed: false as const,
      fr15ConsumerSlotIssuanceAllowed: false as const,
      outerInnerAnatomicalAssignmentAllowed: false as const,
      absoluteMouthDimensionIssuanceAllowed: false as const,
      physicalAnthropometricInterpretationAllowed: false as const,
      traditionalCriterionMetricBindingAllowed: false as const,
      calibrationApplicationAllowed: false as const,
      morphologyClassificationAllowed: false as const,
      criterionStateIssuanceAllowed: false as const,
      claimIssuanceAllowed: false as const,
    }),
    blockers: BLOCKERS,
    prohibitedShortcuts: PROHIBITED_SHORTCUTS,
    provenance: Object.freeze({
      providerRunRef: source.provenance.providerRunRef,
      canonicalAssetDigest: source.provenance.canonicalAssetDigest,
      sourceProjectionRuleRef: source.projectionRule.projectionRuleRef,
      rawSourcePersisted: false as const,
      rawProviderResponsePersisted: false as const,
      rawProviderDepthPersisted: false as const,
      derivedPoseNormalizedLipsGeometryPersisted: false as const,
      derivedNeutralMetricPersisted: false as const,
      biometricEmbeddingPersisted: false as const,
    }),
  });
  METRIC_ISSUED.add(result);
  return result;
}

export function assertIssuedNeutralMouthContourMetricFR80(
  metric: NeutralMouthContourMetricFR80V1,
): void {
  if (!METRIC_ISSUED.has(metric)) fail('neutral mouth contour metric was not issued by the active FR-80 metric boundary.');
  if (
    metric.schemaVersion !== 'fr80-neutral-mouth-contour-metric-v1' ||
    metric.authorityState !== 'governed_neutral_mouth_contour_metric_only' ||
    metric.metric.metricRef !== METRIC_REF ||
    metric.metric.unit !== 'ratio' ||
    !Number.isFinite(metric.metric.value) ||
    metric.metric.value <= 0 ||
    metric.neutralMetricDefinitionsIssued !== 1 ||
    metric.neutralMetricValuesIssued !== 1 ||
    metric.absoluteMouthDimensionsIssued !== 0 ||
    metric.outerInnerLipRolesIssued !== false ||
    metric.morphologyProduced !== false ||
    metric.criterionStatesIssued !== 0 ||
    metric.claimsIssued !== 0 ||
    metric.traditionalMetricBindingReviewed !== false ||
    metric.traditionalSemanticAuthority !== false
  ) fail('issued neutral mouth contour metric authority or identity drift.');
}
