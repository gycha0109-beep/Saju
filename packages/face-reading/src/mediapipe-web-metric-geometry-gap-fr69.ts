import {
  validateMediaPipeFaceGeometryTransformSemanticsFR68,
  type MediaPipeFaceGeometryTransformSemanticsFR68V1,
} from './mediapipe-face-geometry-transform-semantics-fr68.js';
import { FaceAuthorityValidationError } from './validation.js';

export interface MediaPipeWebMetricGeometrySourceWitnessFR69V1 {
  readonly path: string;
  readonly blobSha: string;
  readonly evidenceRole:
    | 'public_web_result_surface'
    | 'web_face_geometry_stream_and_converter'
    | 'public_web_options_surface'
    | 'internal_metric_mesh_semantics'
    | 'metric_mesh_storage_shape'
    | 'normalized_landmark_depth_semantics'
    | 'screen_to_metric_algorithm_dependencies'
    | 'perspective_environment_semantics';
}

export interface MediaPipeWebMetricGeometryGapFR69V1 {
  readonly schemaVersion: 'fr69-mediapipe-web-metric-geometry-gap-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'release_exact_web_metric_geometry_surface_gap';
  readonly releaseWitness: {
    readonly repository: 'google-ai-edge/mediapipe';
    readonly releaseTag: 'v0.10.35';
    readonly releaseCommit: 'f8ef212d5c962c0e853db7e59d217056b187084b';
    readonly runtimePackageName: '@mediapipe/tasks-vision';
    readonly runtimePackageVersion: '0.10.35';
    readonly files: readonly MediaPipeWebMetricGeometrySourceWitnessFR69V1[];
  };
  readonly upstream: {
    readonly fr68SchemaVersion: 'fr68-mediapipe-face-geometry-transform-semantics-v1';
    readonly fr68ArtifactVersion: '0.1.0';
    readonly fr68AuthorityState: 'release_exact_transform_semantics_evidence_only';
    readonly runtimeOutputEnablementAuthorized: false;
    readonly transformationMatrixObservationAuthorized: false;
    readonly screenToMetricConversionImplementationAuthorized: false;
    readonly metricLipsGeometryIssued: false;
    readonly poseNormalizedLipsGeometryIssued: false;
  };
  readonly internalProviderGeometry: {
    readonly faceGeometryProtoContainsMesh: true;
    readonly meshVertexIdsMatchFaceLandmarkIds: true;
    readonly meshCoordinateDomain: 'right_handed_metric_3d';
    readonly meshVertexFormat: 'XYZUV';
    readonly faceGeometryStreamCarriesFaceGeometryProto: true;
    readonly faceGeometryStreamPubliclyEnabledOnlyWithTransformationMatrixOption: true;
  };
  readonly publicWebSurface: {
    readonly resultFields: readonly ['faceLandmarks', 'faceBlendshapes', 'facialTransformationMatrixes'];
    readonly metricFaceMeshFieldExposed: false;
    readonly metricLandmarksFieldExposed: false;
    readonly converterCopiesPoseMatrixOnlyFromFaceGeometryProto: true;
    readonly converterCopiesMeshFromFaceGeometryProto: false;
    readonly metricGeometryOutputOptionExposed: false;
    readonly perspectiveCameraEnvironmentOptionExposed: false;
  };
  readonly normalizedLandmarkBoundary: {
    readonly xYNormalizedByImageDimensions: true;
    readonly zRepresentsRelativeDepth: true;
    readonly zMagnitudeRoughlyMatchesXScale: true;
    readonly zIsMetricMeters: false;
    readonly normalizedXYZIsInternalMetricMeshXYZ: false;
    readonly providerPipelineWarnsRelativeZCannotBeDirectlyUnprojected: true;
  };
  readonly metricConversionRequirements: {
    readonly perspectiveCameraRequired: true;
    readonly frameDimensionsRequired: true;
    readonly canonicalMetricLandmarksRequired: true;
    readonly landmarkWeightsRequired: true;
    readonly procrustesScaleEstimationRequired: true;
    readonly repeatedUnprojectionRequired: true;
    readonly coordinateHandednessConversionRequired: true;
  };
  readonly evidenceResolved: readonly [
    'internal_metric_mesh_exists',
    'internal_metric_mesh_landmark_id_correspondence',
    'public_web_result_omits_metric_mesh',
    'web_converter_discards_metric_mesh',
    'normalized_landmark_z_is_not_metric_z',
    'screen_to_metric_requires_provider_geometry_environment',
  ];
  readonly publicMetricGeometrySurfaceAvailable: false;
  readonly privateFaceGeometryProtoInterceptionAuthorized: false;
  readonly customGraphRunnerPatchAuthorized: false;
  readonly normalizedLandmarkZPromotionAuthorized: false;
  readonly screenToMetricReimplementationAuthorized: false;
  readonly metricLipsGeometryIssued: false;
  readonly poseNormalizedLipsGeometryIssued: false;
  readonly neutralMetricDefinitionsIssued: 0;
  readonly morphologyProduced: false;
  readonly criterionStatesIssued: 0;
  readonly claimsIssued: 0;
  readonly traditionalSemanticAuthority: false;
  readonly remainingBlockers: readonly [
    'web_metric_face_mesh_not_publicly_exposed',
    'metric_mesh_extraction_path_not_admitted',
    'perspective_camera_environment_not_exposed_by_face_landmarker_options',
    'screen_to_metric_reimplementation_not_admitted',
    'normalized_landmark_z_is_relative_not_metric',
    'fr61_provider_z_not_consumed_as_metric_geometry',
    'private_face_geometry_proto_interception_not_admitted',
    'outer_inner_lip_roles_not_authorized',
    'mouth_metric_definitions_not_reviewed',
    'mouth_static_thresholds_not_calibrated',
    'five_officers_source_not_scan_checked',
  ];
  readonly prohibitedShortcuts: readonly [
    'internal_proto_mesh_to_public_web_surface',
    'face_geometry_binary_stream_to_private_proto_interception',
    'normalized_landmark_z_to_metric_z',
    'normalized_xyz_to_metric_mesh_xyz',
    'transform_matrix_output_to_metric_mesh_output',
    'metric_mesh_gap_evidence_to_pose_normalized_lips_geometry',
    'metric_geometry_gap_to_mouth_metric_or_criterion_state',
  ];
}

const SOURCE_FILES: readonly MediaPipeWebMetricGeometrySourceWitnessFR69V1[] = Object.freeze([
  Object.freeze({
    path: 'mediapipe/tasks/web/vision/face_landmarker/face_landmarker_result.d.ts',
    blobSha: '56001bc0779ae58daa1cfd8dca565332ae892027',
    evidenceRole: 'public_web_result_surface' as const,
  }),
  Object.freeze({
    path: 'mediapipe/tasks/web/vision/face_landmarker/face_landmarker.ts',
    blobSha: '6d9b2f713345fb576301f40c3d520829ab5f23be',
    evidenceRole: 'web_face_geometry_stream_and_converter' as const,
  }),
  Object.freeze({
    path: 'mediapipe/tasks/web/vision/face_landmarker/face_landmarker_options.d.ts',
    blobSha: '67739b895a2dfde35a591e08f6839ce85f881b80',
    evidenceRole: 'public_web_options_surface' as const,
  }),
  Object.freeze({
    path: 'mediapipe/tasks/cc/vision/face_geometry/proto/face_geometry.proto',
    blobSha: '149e10afde76072196243eb63d4f70693521e6a2',
    evidenceRole: 'internal_metric_mesh_semantics' as const,
  }),
  Object.freeze({
    path: 'mediapipe/tasks/cc/vision/face_geometry/proto/mesh_3d.proto',
    blobSha: 'bb21ee7d3865cd7b4bf7805905b9a29c71f00dfd',
    evidenceRole: 'metric_mesh_storage_shape' as const,
  }),
  Object.freeze({
    path: 'mediapipe/tasks/web/components/containers/landmark.d.ts',
    blobSha: '48cdab12bcaf3c88d95b18b7f9d5ce9731e1c9fe',
    evidenceRole: 'normalized_landmark_depth_semantics' as const,
  }),
  Object.freeze({
    path: 'mediapipe/tasks/cc/vision/face_geometry/libs/geometry_pipeline.cc',
    blobSha: '53c880bd5da524749c755acf9fc69dafe9cc49ef',
    evidenceRole: 'screen_to_metric_algorithm_dependencies' as const,
  }),
  Object.freeze({
    path: 'mediapipe/tasks/cc/vision/face_geometry/proto/environment.proto',
    blobSha: '9156f9ce73cd4196cd807c0d4f6d21962fa09fdc',
    evidenceRole: 'perspective_environment_semantics' as const,
  }),
]);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-69 ${message}`);
}

function sameSequence<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function validateUpstream(admission: MediaPipeFaceGeometryTransformSemanticsFR68V1): void {
  validateMediaPipeFaceGeometryTransformSemanticsFR68(admission);
  if (
    admission.runtimeOutputEnablementAuthorized !== false ||
    admission.transformationMatrixObservationAuthorized !== false ||
    admission.screenToMetricConversionImplementationAuthorized !== false ||
    admission.metricLipsGeometryIssued !== false ||
    admission.poseNormalizedLipsGeometryIssued !== false ||
    admission.neutralMetricDefinitionsIssued !== 0 ||
    admission.morphologyProduced !== false ||
    admission.criterionStatesIssued !== 0 ||
    admission.claimsIssued !== 0 ||
    admission.traditionalSemanticAuthority !== false
  ) fail('cannot consume widened FR-68 execution, geometry, metric, or semantic authority.');
}

function releaseWitness() {
  return Object.freeze({
    repository: 'google-ai-edge/mediapipe' as const,
    releaseTag: 'v0.10.35' as const,
    releaseCommit: 'f8ef212d5c962c0e853db7e59d217056b187084b' as const,
    runtimePackageName: '@mediapipe/tasks-vision' as const,
    runtimePackageVersion: '0.10.35' as const,
    files: SOURCE_FILES,
  });
}

export function admitMediaPipeWebMetricGeometryGapFR69(
  admission: MediaPipeFaceGeometryTransformSemanticsFR68V1,
): MediaPipeWebMetricGeometryGapFR69V1 {
  validateUpstream(admission);

  return Object.freeze({
    schemaVersion: 'fr69-mediapipe-web-metric-geometry-gap-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'release_exact_web_metric_geometry_surface_gap' as const,
    releaseWitness: releaseWitness(),
    upstream: Object.freeze({
      fr68SchemaVersion: admission.schemaVersion,
      fr68ArtifactVersion: admission.artifactVersion,
      fr68AuthorityState: admission.authorityState,
      runtimeOutputEnablementAuthorized: admission.runtimeOutputEnablementAuthorized,
      transformationMatrixObservationAuthorized: admission.transformationMatrixObservationAuthorized,
      screenToMetricConversionImplementationAuthorized: admission.screenToMetricConversionImplementationAuthorized,
      metricLipsGeometryIssued: admission.metricLipsGeometryIssued,
      poseNormalizedLipsGeometryIssued: admission.poseNormalizedLipsGeometryIssued,
    }),
    internalProviderGeometry: Object.freeze({
      faceGeometryProtoContainsMesh: true as const,
      meshVertexIdsMatchFaceLandmarkIds: true as const,
      meshCoordinateDomain: 'right_handed_metric_3d' as const,
      meshVertexFormat: 'XYZUV' as const,
      faceGeometryStreamCarriesFaceGeometryProto: true as const,
      faceGeometryStreamPubliclyEnabledOnlyWithTransformationMatrixOption: true as const,
    }),
    publicWebSurface: Object.freeze({
      resultFields: Object.freeze(['faceLandmarks', 'faceBlendshapes', 'facialTransformationMatrixes'] as const),
      metricFaceMeshFieldExposed: false as const,
      metricLandmarksFieldExposed: false as const,
      converterCopiesPoseMatrixOnlyFromFaceGeometryProto: true as const,
      converterCopiesMeshFromFaceGeometryProto: false as const,
      metricGeometryOutputOptionExposed: false as const,
      perspectiveCameraEnvironmentOptionExposed: false as const,
    }),
    normalizedLandmarkBoundary: Object.freeze({
      xYNormalizedByImageDimensions: true as const,
      zRepresentsRelativeDepth: true as const,
      zMagnitudeRoughlyMatchesXScale: true as const,
      zIsMetricMeters: false as const,
      normalizedXYZIsInternalMetricMeshXYZ: false as const,
      providerPipelineWarnsRelativeZCannotBeDirectlyUnprojected: true as const,
    }),
    metricConversionRequirements: Object.freeze({
      perspectiveCameraRequired: true as const,
      frameDimensionsRequired: true as const,
      canonicalMetricLandmarksRequired: true as const,
      landmarkWeightsRequired: true as const,
      procrustesScaleEstimationRequired: true as const,
      repeatedUnprojectionRequired: true as const,
      coordinateHandednessConversionRequired: true as const,
    }),
    evidenceResolved: Object.freeze([
      'internal_metric_mesh_exists',
      'internal_metric_mesh_landmark_id_correspondence',
      'public_web_result_omits_metric_mesh',
      'web_converter_discards_metric_mesh',
      'normalized_landmark_z_is_not_metric_z',
      'screen_to_metric_requires_provider_geometry_environment',
    ] as const),
    publicMetricGeometrySurfaceAvailable: false as const,
    privateFaceGeometryProtoInterceptionAuthorized: false as const,
    customGraphRunnerPatchAuthorized: false as const,
    normalizedLandmarkZPromotionAuthorized: false as const,
    screenToMetricReimplementationAuthorized: false as const,
    metricLipsGeometryIssued: false as const,
    poseNormalizedLipsGeometryIssued: false as const,
    neutralMetricDefinitionsIssued: 0 as const,
    morphologyProduced: false as const,
    criterionStatesIssued: 0 as const,
    claimsIssued: 0 as const,
    traditionalSemanticAuthority: false as const,
    remainingBlockers: Object.freeze([
      'web_metric_face_mesh_not_publicly_exposed',
      'metric_mesh_extraction_path_not_admitted',
      'perspective_camera_environment_not_exposed_by_face_landmarker_options',
      'screen_to_metric_reimplementation_not_admitted',
      'normalized_landmark_z_is_relative_not_metric',
      'fr61_provider_z_not_consumed_as_metric_geometry',
      'private_face_geometry_proto_interception_not_admitted',
      'outer_inner_lip_roles_not_authorized',
      'mouth_metric_definitions_not_reviewed',
      'mouth_static_thresholds_not_calibrated',
      'five_officers_source_not_scan_checked',
    ] as const),
    prohibitedShortcuts: Object.freeze([
      'internal_proto_mesh_to_public_web_surface',
      'face_geometry_binary_stream_to_private_proto_interception',
      'normalized_landmark_z_to_metric_z',
      'normalized_xyz_to_metric_mesh_xyz',
      'transform_matrix_output_to_metric_mesh_output',
      'metric_mesh_gap_evidence_to_pose_normalized_lips_geometry',
      'metric_geometry_gap_to_mouth_metric_or_criterion_state',
    ] as const),
  });
}

export function validateMediaPipeWebMetricGeometryGapFR69(
  gap: MediaPipeWebMetricGeometryGapFR69V1,
): MediaPipeWebMetricGeometryGapFR69V1 {
  if (
    gap.schemaVersion !== 'fr69-mediapipe-web-metric-geometry-gap-v1' ||
    gap.artifactVersion !== '0.1.0' ||
    gap.authorityState !== 'release_exact_web_metric_geometry_surface_gap'
  ) fail('identity/state drift.');
  const witness = gap.releaseWitness;
  if (
    witness.repository !== 'google-ai-edge/mediapipe' ||
    witness.releaseTag !== 'v0.10.35' ||
    witness.releaseCommit !== 'f8ef212d5c962c0e853db7e59d217056b187084b' ||
    witness.runtimePackageName !== '@mediapipe/tasks-vision' ||
    witness.runtimePackageVersion !== '0.10.35' ||
    witness.files.length !== SOURCE_FILES.length
  ) fail('release witness drift.');
  witness.files.forEach((file, index) => {
    const expected = SOURCE_FILES[index]!;
    if (file.path !== expected.path || file.blobSha !== expected.blobSha || file.evidenceRole !== expected.evidenceRole) {
      fail(`release witness file drift at index ${index}.`);
    }
  });
  if (
    gap.upstream.fr68SchemaVersion !== 'fr68-mediapipe-face-geometry-transform-semantics-v1' ||
    gap.upstream.fr68ArtifactVersion !== '0.1.0' ||
    gap.upstream.fr68AuthorityState !== 'release_exact_transform_semantics_evidence_only' ||
    Object.values(gap.upstream).slice(3).some((value) => value !== false)
  ) fail('FR-68 upstream boundary drift.');
  if (
    gap.internalProviderGeometry.faceGeometryProtoContainsMesh !== true ||
    gap.internalProviderGeometry.meshVertexIdsMatchFaceLandmarkIds !== true ||
    gap.internalProviderGeometry.meshCoordinateDomain !== 'right_handed_metric_3d' ||
    gap.internalProviderGeometry.meshVertexFormat !== 'XYZUV' ||
    gap.internalProviderGeometry.faceGeometryStreamCarriesFaceGeometryProto !== true ||
    gap.internalProviderGeometry.faceGeometryStreamPubliclyEnabledOnlyWithTransformationMatrixOption !== true
  ) fail('internal provider geometry evidence drift.');
  if (
    !sameSequence(gap.publicWebSurface.resultFields, ['faceLandmarks', 'faceBlendshapes', 'facialTransformationMatrixes'] as const) ||
    gap.publicWebSurface.metricFaceMeshFieldExposed !== false ||
    gap.publicWebSurface.metricLandmarksFieldExposed !== false ||
    gap.publicWebSurface.converterCopiesPoseMatrixOnlyFromFaceGeometryProto !== true ||
    gap.publicWebSurface.converterCopiesMeshFromFaceGeometryProto !== false ||
    gap.publicWebSurface.metricGeometryOutputOptionExposed !== false ||
    gap.publicWebSurface.perspectiveCameraEnvironmentOptionExposed !== false
  ) fail('public Web surface evidence drift.');
  if (
    gap.normalizedLandmarkBoundary.xYNormalizedByImageDimensions !== true ||
    gap.normalizedLandmarkBoundary.zRepresentsRelativeDepth !== true ||
    gap.normalizedLandmarkBoundary.zMagnitudeRoughlyMatchesXScale !== true ||
    gap.normalizedLandmarkBoundary.zIsMetricMeters !== false ||
    gap.normalizedLandmarkBoundary.normalizedXYZIsInternalMetricMeshXYZ !== false ||
    gap.normalizedLandmarkBoundary.providerPipelineWarnsRelativeZCannotBeDirectlyUnprojected !== true
  ) fail('normalized-landmark boundary drift.');
  if (Object.values(gap.metricConversionRequirements).some((value) => value !== true)) {
    fail('metric-conversion requirement drift.');
  }
  if (
    gap.publicMetricGeometrySurfaceAvailable !== false ||
    gap.privateFaceGeometryProtoInterceptionAuthorized !== false ||
    gap.customGraphRunnerPatchAuthorized !== false ||
    gap.normalizedLandmarkZPromotionAuthorized !== false ||
    gap.screenToMetricReimplementationAuthorized !== false ||
    gap.metricLipsGeometryIssued !== false ||
    gap.poseNormalizedLipsGeometryIssued !== false ||
    gap.neutralMetricDefinitionsIssued !== 0 ||
    gap.morphologyProduced !== false ||
    gap.criterionStatesIssued !== 0 ||
    gap.claimsIssued !== 0 ||
    gap.traditionalSemanticAuthority !== false
  ) fail('gap-evidence authority boundary widened.');
  if (!sameSequence(gap.evidenceResolved, [
    'internal_metric_mesh_exists',
    'internal_metric_mesh_landmark_id_correspondence',
    'public_web_result_omits_metric_mesh',
    'web_converter_discards_metric_mesh',
    'normalized_landmark_z_is_not_metric_z',
    'screen_to_metric_requires_provider_geometry_environment',
  ] as const)) fail('resolved-evidence set drift.');
  if (gap.remainingBlockers.length !== 11 || gap.prohibitedShortcuts.length !== 7) {
    fail('blocker/anti-shortcut cardinality drift.');
  }
  return gap;
}

export function assertPublicMetricGeometryAvailableFR69(
  gap: MediaPipeWebMetricGeometryGapFR69V1,
): never {
  validateMediaPipeWebMetricGeometryGapFR69(gap);
  throw new FaceAuthorityValidationError(
    'FR-69 confirms an internal metric face mesh but the current @mediapipe/tasks-vision Web FaceLandmarkerResult does not expose it; no metric geometry extraction path is authorized.',
  );
}
