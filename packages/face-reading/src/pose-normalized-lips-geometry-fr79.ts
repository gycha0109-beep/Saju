import {
  assertIssuedGovernedMetricLipsSurfaceFR78,
  type GovernedMetricLipsSurfaceFR78V1,
} from './governed-metric-lips-surface-fr78.js';
import { FaceAuthorityValidationError } from './validation.js';

const MEDIAPIPE_RELEASE_COMMIT = 'f8ef212d5c962c0e853db7e59d217056b187084b' as const;
const GEOMETRY_PIPELINE_PATH = 'mediapipe/tasks/cc/vision/face_geometry/libs/geometry_pipeline.cc' as const;
const GEOMETRY_PIPELINE_BLOB_SHA = '53c880bd5da524749c755acf9fc69dafe9cc49ef' as const;
const PROJECTION_RULE_REF = 'fr79:canonical-metric-xy-orthographic@0.1.0' as const;

export interface PoseNormalizedLipsPointFR79V1 {
  readonly x: number;
  readonly y: number;
}

export interface PoseNormalizedLipsContourFR79V1 {
  readonly contourRef: string;
  readonly geometry: {
    readonly kind: 'region';
    readonly boundary: readonly PoseNormalizedLipsPointFR79V1[];
  };
  readonly sourceMetricContourRef: string;
  readonly sourceComponentAuthority: 'unordered_provider_graph_component_only';
  readonly anatomicalRole: null;
  readonly traditionalRole: null;
}

export interface PoseNormalizedLipsProjectionRuleFR79V1 {
  readonly schemaVersion: 'fr79-pose-normalized-lips-projection-rule-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'reviewed_neutral_orthographic_projection_rule';
  readonly projectionRuleRef: typeof PROJECTION_RULE_REF;
  readonly sourceCoordinateFrame: 'canonical_aligned_right_handed_metric_3d';
  readonly targetCoordinateFrame: 'pose_normalized_face_2d';
  readonly sourceUnit: 'centimeter';
  readonly targetCoordinateUnit: 'centimeter';
  readonly projectionKind: 'canonical_frontal_orthographic_xy';
  readonly formula: 'x2d=x3d;y2d=y3d';
  readonly depthTreatment: 'drop_z_only_after_canonical_inverse_pose_alignment';
  readonly axisConvention: 'retain_canonical_metric_x_right_y_up';
  readonly recenteringApplied: false;
  readonly rescalingApplied: false;
  readonly perspectiveReprojectionApplied: false;
  readonly screenCoordinateReconstructionApplied: false;
  readonly poseCompensated: true;
  readonly sourceAlignmentWitness: {
    readonly repository: 'google-ai-edge/mediapipe';
    readonly releaseCommit: typeof MEDIAPIPE_RELEASE_COMMIT;
    readonly path: typeof GEOMETRY_PIPELINE_PATH;
    readonly blobSha: typeof GEOMETRY_PIPELINE_BLOB_SHA;
    readonly witnessedOperation: 'inverse_pose_align_metric_landmarks_to_canonical';
  };
  readonly semanticAuthority: false;
}

export interface PoseNormalizedLipsGeometryFR79V1 {
  readonly schemaVersion: 'fr79-pose-normalized-lips-geometry-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'governed_pose_normalized_lips_geometry_candidate_only';
  readonly extensionMode: 'separate_contract_extension';
  readonly baseNeutralObservationContractRef: 'myeongha-neutral-observation-v1';
  readonly baseFR15ContractMutated: false;
  readonly surfaceKey: 'neutral.face.lips_contour_set';
  readonly neutralConceptKey: 'lips_contour_set';
  readonly observationClass: 'source_neutral_pose_normalized_geometry_extension';
  readonly coordinateFrame: 'pose_normalized_face_2d';
  readonly coordinateUnit: 'centimeter';
  readonly poseCompensated: true;
  readonly projectionRule: PoseNormalizedLipsProjectionRuleFR79V1;
  readonly contours: readonly PoseNormalizedLipsContourFR79V1[];
  readonly contourCount: 2;
  readonly contourPointCounts: readonly [20, 20];
  readonly contourConsumptionState: 'unordered_set_no_outer_inner_role';
  readonly metricLipsGeometryConsumed: true;
  readonly poseNormalizedLipsGeometryIssued: true;
  readonly reviewed2DProjectionRuleIssued: true;
  readonly depthOutputIssued: false;
  readonly fr15ConsumerSlotIssued: false;
  readonly neutralMetricDefinitionsIssued: 0;
  readonly neutralMetricValuesIssued: 0;
  readonly morphologyProduced: false;
  readonly criterionStatesIssued: 0;
  readonly claimsIssued: 0;
  readonly traditionalSemanticAuthority: false;
  readonly source: {
    readonly fr78SchemaVersion: 'fr78-governed-metric-lips-surface-v1';
    readonly fr78ArtifactVersion: '0.1.0';
    readonly sourceCoordinateFrame: 'canonical_aligned_right_handed_metric_3d';
    readonly sourceUnit: 'centimeter';
    readonly providerReleaseCommit: typeof MEDIAPIPE_RELEASE_COMMIT;
    readonly providerTopologySourceBlobSha: '644de9d8c7cd90880d92b2393b4913fa93ace927';
    readonly geometryMetadataBlobSha: '252a7b05b24c5c43c5b94179393639f7c9a2fe8f';
  };
  readonly authorityBoundary: {
    readonly governedResearchPoseNormalizedLipsGeometryAuthorized: true;
    readonly productionNeutralObservationIssued: false;
    readonly mutateFR15BaseContractAllowed: false;
    readonly fr15ConsumerSlotIssuanceAllowed: false;
    readonly outerInnerAnatomicalAssignmentAllowed: false;
    readonly providerComponentOrderSemanticUseAllowed: false;
    readonly providerVertexIndexOutputAllowed: false;
    readonly metricDefinitionIssuanceAllowed: false;
    readonly metricValueIssuanceAllowed: false;
    readonly traditionalOperationalizationAllowed: false;
    readonly morphologyClassificationAllowed: false;
    readonly criterionStateIssuanceAllowed: false;
    readonly claimIssuanceAllowed: false;
  };
  readonly blockers: readonly [
    'outer_inner_lip_roles_not_authorized',
    'mouth_metric_definitions_not_reviewed',
    'mouth_static_thresholds_not_calibrated',
    'five_officers_source_not_scan_checked',
  ];
  readonly prohibitedShortcuts: readonly [
    'pose_normalized_lips_geometry_to_mouth_width_height_aspect_or_thickness_without_metric_definition',
    'unordered_pose_normalized_contours_to_outer_inner_anatomy',
    'pose_normalized_lips_geometry_to_square_broad_classification',
    'pose_normalized_lips_geometry_to_lips_substantial_classification',
    'orthographic_projection_rule_to_metric_threshold',
    'centimeter_plane_coordinate_to_physical_anthropometric_measurement',
    'provider_component_order_to_semantic_role',
  ];
  readonly provenance: {
    readonly providerRunRef: string;
    readonly canonicalAssetDigest: string;
    readonly rawSourcePersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly rawProviderDepthPersisted: false;
    readonly derivedMetricLipsSurfacePersisted: false;
    readonly derivedPoseNormalizedLipsGeometryPersisted: false;
    readonly biometricEmbeddingPersisted: false;
  };
}

const GEOMETRY_ISSUED = new WeakSet<object>();
const POINT_KEYS = new Set(['x', 'y', 'z']);

const REQUIRED_FR78_BLOCKERS = Object.freeze([
  'reviewed_2d_projection_rule_not_admitted',
  'pose_normalized_lips_geometry_not_issued',
  'outer_inner_lip_roles_not_authorized',
  'mouth_metric_definitions_not_reviewed',
  'mouth_static_thresholds_not_calibrated',
  'five_officers_source_not_scan_checked',
] as const);

const REQUIRED_FR78_SHORTCUTS = Object.freeze([
  'metric_lips_3d_to_pose_normalized_2d_without_reviewed_projection',
  'unordered_metric_lips_contours_to_outer_inner_anatomy',
  'metric_lips_surface_to_mouth_width_height_aspect_or_thickness',
  'metric_lips_surface_to_square_broad_classification',
  'metric_lips_surface_to_lips_substantial_classification',
  'provider_component_order_to_semantic_role',
  'provider_vertex_index_to_neutral_surface_output',
  'fr76_parity_tolerance_to_product_calibration_threshold',
] as const);

const BLOCKERS = Object.freeze([
  'outer_inner_lip_roles_not_authorized',
  'mouth_metric_definitions_not_reviewed',
  'mouth_static_thresholds_not_calibrated',
  'five_officers_source_not_scan_checked',
] as const);

const PROHIBITED_SHORTCUTS = Object.freeze([
  'pose_normalized_lips_geometry_to_mouth_width_height_aspect_or_thickness_without_metric_definition',
  'unordered_pose_normalized_contours_to_outer_inner_anatomy',
  'pose_normalized_lips_geometry_to_square_broad_classification',
  'pose_normalized_lips_geometry_to_lips_substantial_classification',
  'orthographic_projection_rule_to_metric_threshold',
  'centimeter_plane_coordinate_to_physical_anthropometric_measurement',
  'provider_component_order_to_semantic_role',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-79 ${message}`);
}

export function getPoseNormalizedLipsProjectionRuleFR79(): PoseNormalizedLipsProjectionRuleFR79V1 {
  return Object.freeze({
    schemaVersion: 'fr79-pose-normalized-lips-projection-rule-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'reviewed_neutral_orthographic_projection_rule' as const,
    projectionRuleRef: PROJECTION_RULE_REF,
    sourceCoordinateFrame: 'canonical_aligned_right_handed_metric_3d' as const,
    targetCoordinateFrame: 'pose_normalized_face_2d' as const,
    sourceUnit: 'centimeter' as const,
    targetCoordinateUnit: 'centimeter' as const,
    projectionKind: 'canonical_frontal_orthographic_xy' as const,
    formula: 'x2d=x3d;y2d=y3d' as const,
    depthTreatment: 'drop_z_only_after_canonical_inverse_pose_alignment' as const,
    axisConvention: 'retain_canonical_metric_x_right_y_up' as const,
    recenteringApplied: false as const,
    rescalingApplied: false as const,
    perspectiveReprojectionApplied: false as const,
    screenCoordinateReconstructionApplied: false as const,
    poseCompensated: true as const,
    sourceAlignmentWitness: Object.freeze({
      repository: 'google-ai-edge/mediapipe' as const,
      releaseCommit: MEDIAPIPE_RELEASE_COMMIT,
      path: GEOMETRY_PIPELINE_PATH,
      blobSha: GEOMETRY_PIPELINE_BLOB_SHA,
      witnessedOperation: 'inverse_pose_align_metric_landmarks_to_canonical' as const,
    }),
    semanticAuthority: false as const,
  });
}

function validateFR78Source(source: GovernedMetricLipsSurfaceFR78V1): void {
  assertIssuedGovernedMetricLipsSurfaceFR78(source);
  if (
    source.schemaVersion !== 'fr78-governed-metric-lips-surface-v1' ||
    source.artifactVersion !== '0.1.0' ||
    source.authorityState !== 'governed_metric_lips_surface_candidate_only' ||
    source.coordinateFrame !== 'canonical_aligned_right_handed_metric_3d' ||
    source.unit !== 'centimeter' ||
    source.contourCount !== 2 ||
    source.contours.length !== 2 ||
    source.contourPointCounts[0] !== 20 ||
    source.contourPointCounts[1] !== 20 ||
    source.contourConsumptionState !== 'unordered_set_no_outer_inner_role' ||
    source.metricLipsGeometryIssued !== true ||
    source.canonicalAlignedMetric3DSurfaceIssued !== true
  ) fail('requires the exact issued FR-78 governed metric lips surface boundary.');
  if (
    source.source.providerReleaseCommit !== MEDIAPIPE_RELEASE_COMMIT ||
    source.source.providerTopologySourceBlobSha !== '644de9d8c7cd90880d92b2393b4913fa93ace927' ||
    source.source.geometryMetadataBlobSha !== '252a7b05b24c5c43c5b94179393639f7c9a2fe8f'
  ) fail('FR-78 release-exact provider/topology/geometry provenance drift.');
  for (let contourIndex = 0; contourIndex < source.contours.length; contourIndex += 1) {
    const contour = source.contours[contourIndex]!;
    if (
      contour.geometry.kind !== 'metric_region_3d' ||
      contour.geometry.boundary.length !== 20 ||
      contour.sourceComponentAuthority !== 'unordered_provider_graph_component_only' ||
      contour.anatomicalRole !== null ||
      contour.traditionalRole !== null
    ) fail(`FR-78 contour ${contourIndex} authority or geometry drift.`);
    for (let pointIndex = 0; pointIndex < contour.geometry.boundary.length; pointIndex += 1) {
      const point = contour.geometry.boundary[pointIndex]!;
      const unexpected = Object.keys(point).find((key) => !POINT_KEYS.has(key));
      if (unexpected !== undefined) fail(`FR-78 point exposes unauthorized field ${unexpected}.`);
      if (!Number.isFinite(point.x) || !Number.isFinite(point.y) || !Number.isFinite(point.z)) {
        fail(`FR-78 contour ${contourIndex} point ${pointIndex} must contain finite metric XYZ.`);
      }
    }
  }
  if (
    source.poseNormalizedLipsGeometryIssued !== false ||
    source.reviewed2DProjectionRuleIssued !== false ||
    source.fr15ConsumerSlotIssued !== false ||
    source.neutralMetricDefinitionsIssued !== 0 ||
    source.neutralMetricValuesIssued !== 0 ||
    source.morphologyProduced !== false ||
    source.criterionStatesIssued !== 0 ||
    source.claimsIssued !== 0 ||
    source.traditionalSemanticAuthority !== false
  ) fail('cannot consume widened FR-78 projection, metric, morphology, criterion, claim, or semantic authority.');
  if (
    source.authorityBoundary.governedResearchMetricLipsGeometryOutputAuthorized !== true ||
    source.authorityBoundary.productionNeutralObservationIssued !== false ||
    source.authorityBoundary.outerInnerAnatomicalAssignmentAllowed !== false ||
    source.authorityBoundary.poseNormalized2DIssuanceAllowed !== false ||
    source.authorityBoundary.neutralMetricIssuanceAllowed !== false ||
    source.authorityBoundary.traditionalOperationalizationAllowed !== false ||
    source.authorityBoundary.morphologyClassificationAllowed !== false ||
    source.authorityBoundary.criterionStateIssuanceAllowed !== false ||
    source.authorityBoundary.claimIssuanceAllowed !== false
  ) fail('FR-78 authority boundary drift.');
  if (REQUIRED_FR78_BLOCKERS.some((blocker) => !source.blockers.includes(blocker))) {
    fail('requires all FR-78 projection/mouth/source blockers before pose-normalized projection.');
  }
  if (REQUIRED_FR78_SHORTCUTS.some((shortcut) => !source.prohibitedShortcuts.includes(shortcut))) {
    fail('requires all FR-78 anti-shortcut restrictions before pose-normalized projection.');
  }
  if (
    source.provenance.rawSourcePersisted !== false ||
    source.provenance.rawProviderResponsePersisted !== false ||
    source.provenance.rawProviderDepthPersisted !== false ||
    source.provenance.derivedMetricLipsSurfacePersisted !== false ||
    source.provenance.biometricEmbeddingPersisted !== false
  ) fail('requires FR-78 non-persistence provenance to remain intact.');
}

export function projectMetricLipsSurfaceToPoseNormalized2DFR79(
  source: GovernedMetricLipsSurfaceFR78V1,
): PoseNormalizedLipsGeometryFR79V1 {
  validateFR78Source(source);
  const projectionRule = getPoseNormalizedLipsProjectionRuleFR79();
  const contours = Object.freeze(source.contours.map((contour, contourIndex) => Object.freeze({
    contourRef: `fr79:lips-pose-normalized-contour:${contourIndex + 1}`,
    geometry: Object.freeze({
      kind: 'region' as const,
      boundary: Object.freeze(contour.geometry.boundary.map((point) => Object.freeze({
        x: point.x,
        y: point.y,
      }))),
    }),
    sourceMetricContourRef: contour.contourRef,
    sourceComponentAuthority: contour.sourceComponentAuthority,
    anatomicalRole: null,
    traditionalRole: null,
  }))));

  const result: PoseNormalizedLipsGeometryFR79V1 = Object.freeze({
    schemaVersion: 'fr79-pose-normalized-lips-geometry-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'governed_pose_normalized_lips_geometry_candidate_only' as const,
    extensionMode: 'separate_contract_extension' as const,
    baseNeutralObservationContractRef: 'myeongha-neutral-observation-v1' as const,
    baseFR15ContractMutated: false as const,
    surfaceKey: 'neutral.face.lips_contour_set' as const,
    neutralConceptKey: 'lips_contour_set' as const,
    observationClass: 'source_neutral_pose_normalized_geometry_extension' as const,
    coordinateFrame: 'pose_normalized_face_2d' as const,
    coordinateUnit: 'centimeter' as const,
    poseCompensated: true as const,
    projectionRule,
    contours,
    contourCount: 2 as const,
    contourPointCounts: Object.freeze([20, 20] as const),
    contourConsumptionState: 'unordered_set_no_outer_inner_role' as const,
    metricLipsGeometryConsumed: true as const,
    poseNormalizedLipsGeometryIssued: true as const,
    reviewed2DProjectionRuleIssued: true as const,
    depthOutputIssued: false as const,
    fr15ConsumerSlotIssued: false as const,
    neutralMetricDefinitionsIssued: 0 as const,
    neutralMetricValuesIssued: 0 as const,
    morphologyProduced: false as const,
    criterionStatesIssued: 0 as const,
    claimsIssued: 0 as const,
    traditionalSemanticAuthority: false as const,
    source: Object.freeze({
      fr78SchemaVersion: source.schemaVersion,
      fr78ArtifactVersion: source.artifactVersion,
      sourceCoordinateFrame: source.coordinateFrame,
      sourceUnit: source.unit,
      providerReleaseCommit: source.source.providerReleaseCommit,
      providerTopologySourceBlobSha: source.source.providerTopologySourceBlobSha,
      geometryMetadataBlobSha: source.source.geometryMetadataBlobSha,
    }),
    authorityBoundary: Object.freeze({
      governedResearchPoseNormalizedLipsGeometryAuthorized: true as const,
      productionNeutralObservationIssued: false as const,
      mutateFR15BaseContractAllowed: false as const,
      fr15ConsumerSlotIssuanceAllowed: false as const,
      outerInnerAnatomicalAssignmentAllowed: false as const,
      providerComponentOrderSemanticUseAllowed: false as const,
      providerVertexIndexOutputAllowed: false as const,
      metricDefinitionIssuanceAllowed: false as const,
      metricValueIssuanceAllowed: false as const,
      traditionalOperationalizationAllowed: false as const,
      morphologyClassificationAllowed: false as const,
      criterionStateIssuanceAllowed: false as const,
      claimIssuanceAllowed: false as const,
    }),
    blockers: BLOCKERS,
    prohibitedShortcuts: PROHIBITED_SHORTCUTS,
    provenance: Object.freeze({
      providerRunRef: source.provenance.providerRunRef,
      canonicalAssetDigest: source.provenance.canonicalAssetDigest,
      rawSourcePersisted: false as const,
      rawProviderResponsePersisted: false as const,
      rawProviderDepthPersisted: false as const,
      derivedMetricLipsSurfacePersisted: false as const,
      derivedPoseNormalizedLipsGeometryPersisted: false as const,
      biometricEmbeddingPersisted: false as const,
    }),
  });
  GEOMETRY_ISSUED.add(result);
  return result;
}

export function assertIssuedPoseNormalizedLipsGeometryFR79(
  geometry: PoseNormalizedLipsGeometryFR79V1,
): void {
  if (!GEOMETRY_ISSUED.has(geometry)) fail('pose-normalized lips geometry was not issued by the active FR-79 projection boundary.');
  if (
    geometry.schemaVersion !== 'fr79-pose-normalized-lips-geometry-v1' ||
    geometry.authorityState !== 'governed_pose_normalized_lips_geometry_candidate_only' ||
    geometry.coordinateFrame !== 'pose_normalized_face_2d' ||
    geometry.coordinateUnit !== 'centimeter' ||
    geometry.poseCompensated !== true ||
    geometry.contours.length !== 2 ||
    geometry.poseNormalizedLipsGeometryIssued !== true ||
    geometry.reviewed2DProjectionRuleIssued !== true ||
    geometry.depthOutputIssued !== false ||
    geometry.neutralMetricDefinitionsIssued !== 0 ||
    geometry.neutralMetricValuesIssued !== 0 ||
    geometry.morphologyProduced !== false ||
    geometry.criterionStatesIssued !== 0 ||
    geometry.claimsIssued !== 0 ||
    geometry.traditionalSemanticAuthority !== false
  ) fail('issued pose-normalized lips geometry authority or identity drift.');
}
