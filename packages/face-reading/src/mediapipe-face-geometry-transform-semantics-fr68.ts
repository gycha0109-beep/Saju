import { MEDIAPIPE_FACE_LANDMARKER_RUNTIME_EVIDENCE_FR26 } from './mediapipe-face-landmarker-runtime-fr26.js';
import type { LipsPoseNormalizationRequirementsFR67V1 } from './lips-pose-normalization-requirements-fr67.js';
import { FaceAuthorityValidationError } from './validation.js';

export interface MediaPipeTransformSourceFileWitnessFR68V1 {
  readonly path: string;
  readonly blobSha: string;
  readonly evidenceRole:
    | 'web_option_semantics'
    | 'web_output_gate_and_matrix_unpacking'
    | 'web_result_matrix_shape_surface'
    | 'web_matrix_container_surface'
    | 'face_geometry_transform_semantics'
    | 'screen_metric_conversion_and_inverse_use'
    | 'matrix_proto_layout_default'
    | 'matrix_serialization_layout_behavior';
}

export interface MediaPipeFaceGeometryTransformReleaseWitnessFR68V1 {
  readonly repository: 'google-ai-edge/mediapipe';
  readonly releaseTag: 'v0.10.35';
  readonly releaseCommit: 'f8ef212d5c962c0e853db7e59d217056b187084b';
  readonly runtimePackageName: '@mediapipe/tasks-vision';
  readonly runtimePackageVersion: '0.10.35';
  readonly releaseExactForInstalledPackage: true;
  readonly files: readonly MediaPipeTransformSourceFileWitnessFR68V1[];
}

export interface MediaPipeFaceGeometryTransformSemanticsFR68V1 {
  readonly schemaVersion: 'fr68-mediapipe-face-geometry-transform-semantics-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'release_exact_transform_semantics_evidence_only';
  readonly sourceWitness: MediaPipeFaceGeometryTransformReleaseWitnessFR68V1;
  readonly upstream: {
    readonly fr67SchemaVersion: 'fr67-lips-pose-normalization-requirements-v1';
    readonly fr67ArtifactVersion: '0.1.0';
    readonly fr67AuthorityState: 'blocked_no_authorized_pose_normalization_transform';
    readonly targetSurface: 'neutral.face.lips_contour_set';
    readonly sourceCoordinateFrame: 'canonical_image_normalized_2d';
    readonly requestedTargetCoordinateFrame: 'pose_normalized_face_2d';
    readonly fr26OutputFacialTransformationMatrixes: false;
    readonly fr61TransformationMatrixConsumptionState: 'disabled_and_ignored';
  };
  readonly providerMatrixSemantics: {
    readonly webResultField: 'facialTransformationMatrixes';
    readonly graphOutputTag: 'FACE_GEOMETRY';
    readonly protoField: 'pose_transform_matrix';
    readonly rows: 4;
    readonly columns: 4;
    readonly mappingDirection: 'static_canonical_metric_face_to_runtime_metric_face';
    readonly coordinateDomain: 'right_handed_metric_3d';
    readonly components: readonly ['uniform_scale', 'rotation', 'translation'];
    readonly lastRowGuaranteed: readonly [0, 0, 0, 1];
    readonly serializedPackedDataLayout: 'column_major_by_proto_default';
    readonly webMatrixLayoutFieldExposed: false;
    readonly providerPipelineInverseUse: 'runtime_metric_face_to_canonical_metric_face_alignment';
  };
  readonly semanticBarrier: {
    readonly normalizedImage2DIsMetric3D: false;
    readonly directApply4x4ToFR66Normalized2DAllowed: false;
    readonly screenToMetricConversionRequiredBeforeProviderInverseSemanticsApply: true;
    readonly perspectiveCameraEnvironmentParticipatesInScreenToMetricConversion: true;
    readonly reviewed2DProjectionRequiredAfterMetricNormalization: true;
  };
  readonly evidenceResolved: readonly [
    'release_exact_matrix_output_surface',
    'release_exact_matrix_direction_and_components',
    'release_exact_provider_inverse_use_semantics',
    'release_exact_serialized_matrix_layout',
  ];
  readonly runtimeOutputEnablementAuthorized: false;
  readonly transformationMatrixObservationAuthorized: false;
  readonly matrixInversionImplementationAuthorized: false;
  readonly screenToMetricConversionImplementationAuthorized: false;
  readonly metricLipsGeometryIssued: false;
  readonly perspectiveProjectionImplementationAuthorized: false;
  readonly poseNormalizedLipsGeometryIssued: false;
  readonly neutralMetricDefinitionsIssued: 0;
  readonly morphologyProduced: false;
  readonly criterionStatesIssued: 0;
  readonly claimsIssued: 0;
  readonly traditionalSemanticAuthority: false;
  readonly remainingBlockers: readonly [
    'fr26_transformation_matrix_output_disabled',
    'fr61_transformation_matrix_consumption_disabled',
    'normalized_image_to_metric_3d_conversion_not_admitted',
    'perspective_camera_environment_not_admitted',
    'metric_lips_landmark_surface_not_admitted',
    'reviewed_2d_projection_rule_not_admitted',
    'outer_inner_lip_roles_not_authorized',
    'mouth_metric_definitions_not_reviewed',
    'mouth_static_thresholds_not_calibrated',
    'five_officers_source_not_scan_checked',
  ];
  readonly prohibitedShortcuts: readonly [
    'matrix_semantics_evidence_to_runtime_output_enablement',
    'matrix_semantics_evidence_to_matrix_observation',
    'column_major_packed_data_to_unreviewed_matrix_execution',
    'fr66_normalized_image_2d_to_metric_3d_by_direct_4x4_application',
    'provider_inverse_semantics_to_pose_normalized_lips_2d_without_screen_metric_projection',
    'transform_semantics_to_mouth_metric_or_criterion_state',
  ];
}

const SOURCE_FILES: readonly MediaPipeTransformSourceFileWitnessFR68V1[] = Object.freeze([
  Object.freeze({
    path: 'mediapipe/tasks/web/vision/face_landmarker/face_landmarker_options.d.ts',
    blobSha: '67739b895a2dfde35a591e08f6839ce85f881b80',
    evidenceRole: 'web_option_semantics' as const,
  }),
  Object.freeze({
    path: 'mediapipe/tasks/web/vision/face_landmarker/face_landmarker.ts',
    blobSha: '6d9b2f713345fb576301f40c3d520829ab5f23be',
    evidenceRole: 'web_output_gate_and_matrix_unpacking' as const,
  }),
  Object.freeze({
    path: 'mediapipe/tasks/web/vision/face_landmarker/face_landmarker_result.d.ts',
    blobSha: '56001bc0779ae58daa1cfd8dca565332ae892027',
    evidenceRole: 'web_result_matrix_shape_surface' as const,
  }),
  Object.freeze({
    path: 'mediapipe/tasks/web/components/containers/matrix.d.ts',
    blobSha: '029ca73e715c9e15c774c6ec2a6aa8196181c466',
    evidenceRole: 'web_matrix_container_surface' as const,
  }),
  Object.freeze({
    path: 'mediapipe/tasks/cc/vision/face_geometry/proto/face_geometry.proto',
    blobSha: '149e10afde76072196243eb63d4f70693521e6a2',
    evidenceRole: 'face_geometry_transform_semantics' as const,
  }),
  Object.freeze({
    path: 'mediapipe/tasks/cc/vision/face_geometry/libs/geometry_pipeline.cc',
    blobSha: '53c880bd5da524749c755acf9fc69dafe9cc49ef',
    evidenceRole: 'screen_metric_conversion_and_inverse_use' as const,
  }),
  Object.freeze({
    path: 'mediapipe/framework/formats/matrix_data.proto',
    blobSha: 'd4aa457a5865b2789308764cc35ea0ff7ab22441',
    evidenceRole: 'matrix_proto_layout_default' as const,
  }),
  Object.freeze({
    path: 'mediapipe/framework/formats/matrix.cc',
    blobSha: '3254e7fc2a491cce501e6e05c3ec0b239337c506',
    evidenceRole: 'matrix_serialization_layout_behavior' as const,
  }),
]);

export const MEDIAPIPE_FACE_GEOMETRY_TRANSFORM_RELEASE_WITNESS_FR68:
MediaPipeFaceGeometryTransformReleaseWitnessFR68V1 = Object.freeze({
  repository: 'google-ai-edge/mediapipe' as const,
  releaseTag: 'v0.10.35' as const,
  releaseCommit: 'f8ef212d5c962c0e853db7e59d217056b187084b' as const,
  runtimePackageName: '@mediapipe/tasks-vision' as const,
  runtimePackageVersion: '0.10.35' as const,
  releaseExactForInstalledPackage: true as const,
  files: SOURCE_FILES,
});

const REQUIRED_FR67_BLOCKERS = Object.freeze([
  'fr26_transformation_matrix_output_disabled',
  'fr61_transformation_matrix_consumption_disabled',
  'no_reviewed_pose_normalization_transform',
  'no_reviewed_inverse_transform_semantics',
  'no_reviewed_2d_projection_rule',
  'outer_inner_lip_roles_not_authorized',
  'mouth_metric_definitions_not_reviewed',
  'mouth_static_thresholds_not_calibrated',
  'five_officers_source_not_scan_checked',
] as const);

const REQUIRED_FR67_SHORTCUTS = Object.freeze([
  'fr26_disabled_matrix_to_pose_normalized_geometry',
  'canonical_image_contours_to_pose_normalized_geometry_without_reviewed_transform',
  'provider_transform_matrix_to_inverse_normalization_without_reviewed_semantics',
  'pose_normalization_requirement_to_mouth_metric',
  'lips_contour_set_to_square_broad_state',
  'unordered_contours_to_lips_substantial_state',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-68 ${message}`);
}

function sameSequence<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length && actual.every((entry, index) => entry === expected[index]);
}

function validateFR67Boundary(requirements: LipsPoseNormalizationRequirementsFR67V1): void {
  if (
    requirements.schemaVersion !== 'fr67-lips-pose-normalization-requirements-v1' ||
    requirements.artifactVersion !== '0.1.0' ||
    requirements.authorityState !== 'blocked_no_authorized_pose_normalization_transform' ||
    requirements.targetSurface !== 'neutral.face.lips_contour_set' ||
    requirements.source.coordinateFrame !== 'canonical_image_normalized_2d' ||
    requirements.targetCoordinateFrame !== 'pose_normalized_face_2d'
  ) fail('requires the exact FR-67 pose-normalization requirements boundary.');
  if (
    requirements.providerRuntime.runtimePackageName !== '@mediapipe/tasks-vision' ||
    requirements.providerRuntime.runtimePackageVersion !== '0.10.35' ||
    requirements.providerRuntime.fr26OutputFacialTransformationMatrixes !== false ||
    requirements.providerRuntime.fr61TransformationMatrixConsumptionState !== 'disabled_and_ignored' ||
    requirements.providerRuntime.transformationMatrixObserved !== false ||
    requirements.providerRuntime.inverseTransformAuthorized !== false
  ) fail('cannot consume widened FR-67 provider transform authority.');
  if (
    requirements.normalizedGeometryIssued !== false ||
    requirements.neutralMetricDefinitionsIssued !== 0 ||
    requirements.neutralMetricValuesIssued !== 0 ||
    requirements.morphologyProduced !== false ||
    requirements.criterionStatesIssued !== 0 ||
    requirements.claimsIssued !== 0 ||
    requirements.traditionalSemanticAuthority !== false
  ) fail('cannot consume widened FR-67 geometry/metric/semantic authority.');
  if (REQUIRED_FR67_BLOCKERS.some((blocker) => !requirements.blockers.includes(blocker))) {
    fail('requires all FR-67 blockers to remain present before evidence admission.');
  }
  if (REQUIRED_FR67_SHORTCUTS.some((shortcut) => !requirements.prohibitedShortcuts.includes(shortcut))) {
    fail('requires all FR-67 anti-shortcut restrictions to remain present.');
  }
  if (
    requirements.provenance.rawSourcePersisted !== false ||
    requirements.provenance.rawProviderResponsePersisted !== false ||
    requirements.provenance.providerDepthPersisted !== false ||
    requirements.provenance.biometricEmbeddingPersisted !== false
  ) fail('requires FR-67 non-persistence provenance to remain intact.');
}

function validateReleaseWitness(): void {
  const witness = MEDIAPIPE_FACE_GEOMETRY_TRANSFORM_RELEASE_WITNESS_FR68;
  if (
    witness.repository !== 'google-ai-edge/mediapipe' ||
    witness.releaseTag !== 'v0.10.35' ||
    witness.releaseCommit !== 'f8ef212d5c962c0e853db7e59d217056b187084b' ||
    witness.runtimePackageName !== '@mediapipe/tasks-vision' ||
    witness.runtimePackageVersion !== '0.10.35' ||
    witness.releaseExactForInstalledPackage !== true
  ) fail('release witness identity drift.');
  if (
    MEDIAPIPE_FACE_LANDMARKER_RUNTIME_EVIDENCE_FR26.runtimePackageName !== witness.runtimePackageName ||
    MEDIAPIPE_FACE_LANDMARKER_RUNTIME_EVIDENCE_FR26.runtimePackageVersion !== witness.runtimePackageVersion ||
    MEDIAPIPE_FACE_LANDMARKER_RUNTIME_EVIDENCE_FR26.outputFacialTransformationMatrixes !== false
  ) fail('FR-26 runtime/package pin drift.');
  if (witness.files.length !== SOURCE_FILES.length) fail('release witness source-file count drift.');
  witness.files.forEach((file, index) => {
    const expected = SOURCE_FILES[index]!;
    if (file.path !== expected.path || file.blobSha !== expected.blobSha || file.evidenceRole !== expected.evidenceRole) {
      fail(`release witness source-file drift at index ${index}.`);
    }
  });
  if (new Set(witness.files.map((file) => file.path)).size !== witness.files.length) {
    fail('release witness source files must be unique.');
  }
}

export function admitMediaPipeFaceGeometryTransformSemanticsFR68(
  requirements: LipsPoseNormalizationRequirementsFR67V1,
): MediaPipeFaceGeometryTransformSemanticsFR68V1 {
  validateFR67Boundary(requirements);
  validateReleaseWitness();

  return Object.freeze({
    schemaVersion: 'fr68-mediapipe-face-geometry-transform-semantics-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'release_exact_transform_semantics_evidence_only' as const,
    sourceWitness: MEDIAPIPE_FACE_GEOMETRY_TRANSFORM_RELEASE_WITNESS_FR68,
    upstream: Object.freeze({
      fr67SchemaVersion: requirements.schemaVersion,
      fr67ArtifactVersion: requirements.artifactVersion,
      fr67AuthorityState: requirements.authorityState,
      targetSurface: requirements.targetSurface,
      sourceCoordinateFrame: requirements.source.coordinateFrame,
      requestedTargetCoordinateFrame: requirements.targetCoordinateFrame,
      fr26OutputFacialTransformationMatrixes: requirements.providerRuntime.fr26OutputFacialTransformationMatrixes,
      fr61TransformationMatrixConsumptionState: requirements.providerRuntime.fr61TransformationMatrixConsumptionState,
    }),
    providerMatrixSemantics: Object.freeze({
      webResultField: 'facialTransformationMatrixes' as const,
      graphOutputTag: 'FACE_GEOMETRY' as const,
      protoField: 'pose_transform_matrix' as const,
      rows: 4 as const,
      columns: 4 as const,
      mappingDirection: 'static_canonical_metric_face_to_runtime_metric_face' as const,
      coordinateDomain: 'right_handed_metric_3d' as const,
      components: Object.freeze(['uniform_scale', 'rotation', 'translation'] as const),
      lastRowGuaranteed: Object.freeze([0, 0, 0, 1] as const),
      serializedPackedDataLayout: 'column_major_by_proto_default' as const,
      webMatrixLayoutFieldExposed: false as const,
      providerPipelineInverseUse: 'runtime_metric_face_to_canonical_metric_face_alignment' as const,
    }),
    semanticBarrier: Object.freeze({
      normalizedImage2DIsMetric3D: false as const,
      directApply4x4ToFR66Normalized2DAllowed: false as const,
      screenToMetricConversionRequiredBeforeProviderInverseSemanticsApply: true as const,
      perspectiveCameraEnvironmentParticipatesInScreenToMetricConversion: true as const,
      reviewed2DProjectionRequiredAfterMetricNormalization: true as const,
    }),
    evidenceResolved: Object.freeze([
      'release_exact_matrix_output_surface',
      'release_exact_matrix_direction_and_components',
      'release_exact_provider_inverse_use_semantics',
      'release_exact_serialized_matrix_layout',
    ] as const),
    runtimeOutputEnablementAuthorized: false as const,
    transformationMatrixObservationAuthorized: false as const,
    matrixInversionImplementationAuthorized: false as const,
    screenToMetricConversionImplementationAuthorized: false as const,
    metricLipsGeometryIssued: false as const,
    perspectiveProjectionImplementationAuthorized: false as const,
    poseNormalizedLipsGeometryIssued: false as const,
    neutralMetricDefinitionsIssued: 0 as const,
    morphologyProduced: false as const,
    criterionStatesIssued: 0 as const,
    claimsIssued: 0 as const,
    traditionalSemanticAuthority: false as const,
    remainingBlockers: Object.freeze([
      'fr26_transformation_matrix_output_disabled',
      'fr61_transformation_matrix_consumption_disabled',
      'normalized_image_to_metric_3d_conversion_not_admitted',
      'perspective_camera_environment_not_admitted',
      'metric_lips_landmark_surface_not_admitted',
      'reviewed_2d_projection_rule_not_admitted',
      'outer_inner_lip_roles_not_authorized',
      'mouth_metric_definitions_not_reviewed',
      'mouth_static_thresholds_not_calibrated',
      'five_officers_source_not_scan_checked',
    ] as const),
    prohibitedShortcuts: Object.freeze([
      'matrix_semantics_evidence_to_runtime_output_enablement',
      'matrix_semantics_evidence_to_matrix_observation',
      'column_major_packed_data_to_unreviewed_matrix_execution',
      'fr66_normalized_image_2d_to_metric_3d_by_direct_4x4_application',
      'provider_inverse_semantics_to_pose_normalized_lips_2d_without_screen_metric_projection',
      'transform_semantics_to_mouth_metric_or_criterion_state',
    ] as const),
  });
}

export function validateMediaPipeFaceGeometryTransformSemanticsFR68(
  admission: MediaPipeFaceGeometryTransformSemanticsFR68V1,
): MediaPipeFaceGeometryTransformSemanticsFR68V1 {
  validateReleaseWitness();
  if (
    admission.schemaVersion !== 'fr68-mediapipe-face-geometry-transform-semantics-v1' ||
    admission.artifactVersion !== '0.1.0' ||
    admission.authorityState !== 'release_exact_transform_semantics_evidence_only' ||
    admission.sourceWitness !== MEDIAPIPE_FACE_GEOMETRY_TRANSFORM_RELEASE_WITNESS_FR68
  ) fail('admission identity/source-witness drift.');
  if (
    admission.upstream.fr67SchemaVersion !== 'fr67-lips-pose-normalization-requirements-v1' ||
    admission.upstream.fr67ArtifactVersion !== '0.1.0' ||
    admission.upstream.fr67AuthorityState !== 'blocked_no_authorized_pose_normalization_transform' ||
    admission.upstream.targetSurface !== 'neutral.face.lips_contour_set' ||
    admission.upstream.sourceCoordinateFrame !== 'canonical_image_normalized_2d' ||
    admission.upstream.requestedTargetCoordinateFrame !== 'pose_normalized_face_2d' ||
    admission.upstream.fr26OutputFacialTransformationMatrixes !== false ||
    admission.upstream.fr61TransformationMatrixConsumptionState !== 'disabled_and_ignored'
  ) fail('upstream boundary drift.');
  const semantics = admission.providerMatrixSemantics;
  if (
    semantics.webResultField !== 'facialTransformationMatrixes' ||
    semantics.graphOutputTag !== 'FACE_GEOMETRY' ||
    semantics.protoField !== 'pose_transform_matrix' ||
    semantics.rows !== 4 || semantics.columns !== 4 ||
    semantics.mappingDirection !== 'static_canonical_metric_face_to_runtime_metric_face' ||
    semantics.coordinateDomain !== 'right_handed_metric_3d' ||
    !sameSequence(semantics.components, ['uniform_scale', 'rotation', 'translation'] as const) ||
    !sameSequence(semantics.lastRowGuaranteed, [0, 0, 0, 1] as const) ||
    semantics.serializedPackedDataLayout !== 'column_major_by_proto_default' ||
    semantics.webMatrixLayoutFieldExposed !== false ||
    semantics.providerPipelineInverseUse !== 'runtime_metric_face_to_canonical_metric_face_alignment'
  ) fail('provider matrix semantics drift.');
  if (
    admission.semanticBarrier.normalizedImage2DIsMetric3D !== false ||
    admission.semanticBarrier.directApply4x4ToFR66Normalized2DAllowed !== false ||
    admission.semanticBarrier.screenToMetricConversionRequiredBeforeProviderInverseSemanticsApply !== true ||
    admission.semanticBarrier.perspectiveCameraEnvironmentParticipatesInScreenToMetricConversion !== true ||
    admission.semanticBarrier.reviewed2DProjectionRequiredAfterMetricNormalization !== true
  ) fail('screen/metric semantic barrier drift.');
  if (
    admission.runtimeOutputEnablementAuthorized !== false ||
    admission.transformationMatrixObservationAuthorized !== false ||
    admission.matrixInversionImplementationAuthorized !== false ||
    admission.screenToMetricConversionImplementationAuthorized !== false ||
    admission.metricLipsGeometryIssued !== false ||
    admission.perspectiveProjectionImplementationAuthorized !== false ||
    admission.poseNormalizedLipsGeometryIssued !== false ||
    admission.neutralMetricDefinitionsIssued !== 0 ||
    admission.morphologyProduced !== false ||
    admission.criterionStatesIssued !== 0 ||
    admission.claimsIssued !== 0 ||
    admission.traditionalSemanticAuthority !== false
  ) fail('evidence-only authority boundary widened.');
  const expectedResolved = [
    'release_exact_matrix_output_surface',
    'release_exact_matrix_direction_and_components',
    'release_exact_provider_inverse_use_semantics',
    'release_exact_serialized_matrix_layout',
  ] as const;
  if (!sameSequence(admission.evidenceResolved, expectedResolved)) fail('resolved-evidence set drift.');
  if (admission.remainingBlockers.length !== 10 || admission.prohibitedShortcuts.length !== 6) {
    fail('blocker/anti-shortcut cardinality drift.');
  }
  return admission;
}

export function assertMediaPipeTransformRuntimeReadyFR68(
  admission: MediaPipeFaceGeometryTransformSemanticsFR68V1,
): never {
  validateMediaPipeFaceGeometryTransformSemanticsFR68(admission);
  throw new FaceAuthorityValidationError(
    'FR-68 admits release-exact transform semantics evidence only; runtime matrix output, metric-space conversion, inverse execution, and 2D projection remain unauthorized.',
  );
}
