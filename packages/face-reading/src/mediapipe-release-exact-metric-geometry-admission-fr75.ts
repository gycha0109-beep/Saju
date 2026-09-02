import {
  validateMediaPipeWebMetricGeometryGapFR69,
  type MediaPipeWebMetricGeometryGapFR69V1,
} from './mediapipe-web-metric-geometry-gap-fr69.js';
import { FaceAuthorityValidationError } from './validation.js';

export interface MediaPipeMetricGeometrySourceWitnessFR75V1 {
  readonly path: string;
  readonly blobSha: string;
  readonly evidenceRole:
    | 'face_landmarker_geometry_metadata_binding'
    | 'default_environment_and_landmark_slice'
    | 'canonical_metric_face_model'
    | 'procrustes_landmark_weights'
    | 'generated_metadata_binary_binding'
    | 'canonical_unit_and_input_depth_semantics'
    | 'perspective_environment_schema'
    | 'screen_to_metric_pipeline'
    | 'weighted_procrustes_solver';
}

export interface MediaPipeReleaseExactMetricGeometryAdmissionFR75V1 {
  readonly schemaVersion: 'fr75-mediapipe-release-exact-metric-geometry-admission-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'release_exact_screen_to_metric_source_admitted';
  readonly releaseWitness: {
    readonly repository: 'google-ai-edge/mediapipe';
    readonly releaseTag: 'v0.10.35';
    readonly releaseCommit: 'f8ef212d5c962c0e853db7e59d217056b187084b';
    readonly runtimePackageName: '@mediapipe/tasks-vision';
    readonly runtimePackageVersion: '0.10.35';
    readonly files: readonly MediaPipeMetricGeometrySourceWitnessFR75V1[];
  };
  readonly upstream: {
    readonly fr69SchemaVersion: 'fr69-mediapipe-web-metric-geometry-gap-v1';
    readonly fr69ArtifactVersion: '0.1.0';
    readonly fr69AuthorityState: 'release_exact_web_metric_geometry_surface_gap';
    readonly publicMetricGeometrySurfaceAvailable: false;
    readonly normalizedLandmarkZPromotionAuthorized: false;
    readonly screenToMetricReimplementationAuthorized: false;
    readonly metricLipsGeometryIssued: false;
    readonly poseNormalizedLipsGeometryIssued: false;
  };
  readonly sourceAdmission: {
    readonly canonicalMetricModelAdmitted: true;
    readonly defaultPerspectiveEnvironmentAdmitted: true;
    readonly screenToMetricAlgorithmSourceAdmitted: true;
    readonly procrustesAlgorithmSourceAdmitted: true;
    readonly releaseExactInputsAndAlgorithmsAdmitted: true;
  };
  readonly canonicalMetricModel: {
    readonly unit: 'centimeter';
    readonly canonicalModelPath: 'mediapipe/tasks/cc/vision/face_geometry/data/canonical_face_model.obj';
    readonly metadataInputSource: 'FACE_LANDMARK_PIPELINE';
    readonly metadataSourcePath: 'mediapipe/tasks/cc/vision/face_geometry/data/geometry_pipeline_metadata_landmarks.pbtxt';
    readonly metadataBinaryName: 'geometry_pipeline_metadata_landmarks.binarypb';
    readonly metadataBinaryCheckedIn: false;
    readonly metadataBinaryGeneratedFromPbtxt: true;
    readonly procrustesWeightsSourcePath: 'mediapipe/tasks/cc/vision/face_geometry/data/geometry_pipeline_metadata_landmarks.pbtxt';
    readonly procrustesWeightsNonNegative: true;
    readonly geometryLandmarkCount: 468;
    readonly irisLandmarksExcluded: true;
    readonly geometryConsumesFirst468Landmarks: true;
  };
  readonly defaultPerspectiveEnvironment: {
    readonly selectedWhenEnvironmentAbsent: true;
    readonly originPointLocation: 'TOP_LEFT_CORNER';
    readonly verticalFovDegrees: 63;
    readonly nearPlaneCentimeters: 1;
    readonly farPlaneCentimeters: 10000;
    readonly frameAspectRatioProvidedAtRuntime: true;
    readonly publicWebEnvironmentOptionExposed: false;
  };
  readonly screenToMetricAlgorithm: {
    readonly sourcePath: 'mediapipe/tasks/cc/vision/face_geometry/libs/geometry_pipeline.cc';
    readonly inputCoordinateDomain: 'normalized_screen_xyz_relative_z';
    readonly outputCoordinateDomain: 'right_handed_metric_3d';
    readonly relativeZDirectUnprojectionSafe: false;
    readonly twoPassScaleEstimationRequired: true;
    readonly inversePoseAlignmentRequired: true;
    readonly steps: readonly [
      'project_xy_at_near_plane',
      'change_handedness_for_first_scale_estimate',
      'first_weighted_procrustes_scale_estimate',
      'move_and_rescale_relative_z_with_first_scale',
      'unproject_xy_for_intermediate_metric_estimate',
      'change_handedness_for_second_scale_estimate',
      'second_weighted_procrustes_scale_estimate',
      'combine_first_and_second_scale',
      'move_and_rescale_relative_z_with_total_scale',
      'final_unproject_xy',
      'change_handedness_to_metric_space',
      'final_weighted_procrustes_pose_estimate',
      'inverse_pose_align_metric_landmarks_to_canonical',
    ];
  };
  readonly procrustesAlgorithm: {
    readonly sourcePath: 'mediapipe/tasks/cc/vision/face_geometry/libs/procrustes_solver.cc';
    readonly weightedOrthogonalProblem: true;
    readonly squareRootWeights: true;
    readonly weightedSourceCentering: true;
    readonly designMatrixConstruction: true;
    readonly jacobiSvdRotation: true;
    readonly reflectionPrevention: true;
    readonly scaleEstimation: true;
    readonly translationEstimation: true;
  };
  readonly runtimeAuthority: {
    readonly reimplementationParityValidated: false;
    readonly screenToMetricReimplementationAuthorized: false;
    readonly runtimeMetricGeometryOutputAuthorized: false;
    readonly metricLipsGeometryIssued: false;
    readonly poseNormalizedLipsGeometryIssued: false;
    readonly neutralMetricDefinitionsIssued: 0;
    readonly morphologyProduced: false;
    readonly criterionStatesIssued: 0;
    readonly claimsIssued: 0;
    readonly traditionalSemanticAuthority: false;
    readonly procrustesSourceExistenceCountsAsParityValidation: false;
  };
  readonly persistencePolicy: {
    readonly rawProviderResponsePersisted: false;
    readonly rawMetricMeshPersisted: false;
    readonly rawLandmarkDepthPersisted: false;
    readonly releaseWitnessMetadataOnly: true;
  };
  readonly remainingBlockers: readonly [
    'public_web_metric_face_mesh_not_exposed',
    'screen_to_metric_reimplementation_parity_not_validated',
    'runtime_metric_geometry_output_not_admitted',
    'fr61_provider_z_not_consumed_as_metric_geometry',
    'outer_inner_lip_roles_not_authorized',
    'mouth_metric_definitions_not_reviewed',
    'mouth_static_thresholds_not_calibrated',
    'five_officers_source_not_scan_checked',
  ];
  readonly prohibitedShortcuts: readonly [
    'provider_algorithm_source_to_reimplementation_correctness',
    'canonical_centimeter_model_to_runtime_normalized_metric_coordinates',
    'default_camera_to_arbitrary_web_input_pose_normalized',
    'procrustes_source_to_runtime_lips_metric_output',
    'first_468_geometry_to_iris_inclusive_478_geometry',
    'generated_binary_name_to_checked_in_binary_blob',
    'metric_geometry_to_traditional_mouth_criteria',
  ];
}

const SOURCE_FILES: readonly MediaPipeMetricGeometrySourceWitnessFR75V1[] = Object.freeze([
  Object.freeze({
    path: 'mediapipe/tasks/cc/vision/face_landmarker/face_landmarker_graph.cc',
    blobSha: 'c9a9a19326b4fc26d6be323b87a89d913eddea5b',
    evidenceRole: 'face_landmarker_geometry_metadata_binding' as const,
  }),
  Object.freeze({
    path: 'mediapipe/tasks/cc/vision/face_geometry/face_geometry_from_landmarks_graph.cc',
    blobSha: '2f854c2a2087bfacc97eacf11815fe06c79d1169',
    evidenceRole: 'default_environment_and_landmark_slice' as const,
  }),
  Object.freeze({
    path: 'mediapipe/tasks/cc/vision/face_geometry/data/canonical_face_model.obj',
    blobSha: '0e666d1c4e75949d1639c2bcf347a38da4834164',
    evidenceRole: 'canonical_metric_face_model' as const,
  }),
  Object.freeze({
    path: 'mediapipe/tasks/cc/vision/face_geometry/data/geometry_pipeline_metadata_landmarks.pbtxt',
    blobSha: '252a7b05b24c5c43c5b94179393639f7c9a2fe8f',
    evidenceRole: 'procrustes_landmark_weights' as const,
  }),
  Object.freeze({
    path: 'mediapipe/tasks/cc/vision/face_geometry/data/BUILD',
    blobSha: 'a7085f3dbecdf04ec3042855e20dfe52b417ab48',
    evidenceRole: 'generated_metadata_binary_binding' as const,
  }),
  Object.freeze({
    path: 'mediapipe/tasks/cc/vision/face_geometry/proto/geometry_pipeline_metadata.proto',
    blobSha: '53d1a1392e393d606ec6974e766647dc8d56f7da',
    evidenceRole: 'canonical_unit_and_input_depth_semantics' as const,
  }),
  Object.freeze({
    path: 'mediapipe/tasks/cc/vision/face_geometry/proto/environment.proto',
    blobSha: '9156f9ce73cd4196cd807c0d4f6d21962fa09fdc',
    evidenceRole: 'perspective_environment_schema' as const,
  }),
  Object.freeze({
    path: 'mediapipe/tasks/cc/vision/face_geometry/libs/geometry_pipeline.cc',
    blobSha: '53c880bd5da524749c755acf9fc69dafe9cc49ef',
    evidenceRole: 'screen_to_metric_pipeline' as const,
  }),
  Object.freeze({
    path: 'mediapipe/tasks/cc/vision/face_geometry/libs/procrustes_solver.cc',
    blobSha: '82ba4b8c5ea974e6e0510a6b8105ae54566722c0',
    evidenceRole: 'weighted_procrustes_solver' as const,
  }),
]);

const SCREEN_TO_METRIC_STEPS = Object.freeze([
  'project_xy_at_near_plane',
  'change_handedness_for_first_scale_estimate',
  'first_weighted_procrustes_scale_estimate',
  'move_and_rescale_relative_z_with_first_scale',
  'unproject_xy_for_intermediate_metric_estimate',
  'change_handedness_for_second_scale_estimate',
  'second_weighted_procrustes_scale_estimate',
  'combine_first_and_second_scale',
  'move_and_rescale_relative_z_with_total_scale',
  'final_unproject_xy',
  'change_handedness_to_metric_space',
  'final_weighted_procrustes_pose_estimate',
  'inverse_pose_align_metric_landmarks_to_canonical',
] as const);

const REMAINING_BLOCKERS = Object.freeze([
  'public_web_metric_face_mesh_not_exposed',
  'screen_to_metric_reimplementation_parity_not_validated',
  'runtime_metric_geometry_output_not_admitted',
  'fr61_provider_z_not_consumed_as_metric_geometry',
  'outer_inner_lip_roles_not_authorized',
  'mouth_metric_definitions_not_reviewed',
  'mouth_static_thresholds_not_calibrated',
  'five_officers_source_not_scan_checked',
] as const);

const PROHIBITED_SHORTCUTS = Object.freeze([
  'provider_algorithm_source_to_reimplementation_correctness',
  'canonical_centimeter_model_to_runtime_normalized_metric_coordinates',
  'default_camera_to_arbitrary_web_input_pose_normalized',
  'procrustes_source_to_runtime_lips_metric_output',
  'first_468_geometry_to_iris_inclusive_478_geometry',
  'generated_binary_name_to_checked_in_binary_blob',
  'metric_geometry_to_traditional_mouth_criteria',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-75 ${message}`);
}

function sameSequence<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function validateUpstream(gap: MediaPipeWebMetricGeometryGapFR69V1): void {
  validateMediaPipeWebMetricGeometryGapFR69(gap);
  if (
    gap.publicMetricGeometrySurfaceAvailable !== false ||
    gap.normalizedLandmarkZPromotionAuthorized !== false ||
    gap.screenToMetricReimplementationAuthorized !== false ||
    gap.metricLipsGeometryIssued !== false ||
    gap.poseNormalizedLipsGeometryIssued !== false ||
    gap.neutralMetricDefinitionsIssued !== 0 ||
    gap.morphologyProduced !== false ||
    gap.criterionStatesIssued !== 0 ||
    gap.claimsIssued !== 0 ||
    gap.traditionalSemanticAuthority !== false
  ) fail('cannot consume widened FR-69 runtime, metric, or semantic authority.');
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

export function admitMediaPipeReleaseExactMetricGeometryFR75(
  gap: MediaPipeWebMetricGeometryGapFR69V1,
): MediaPipeReleaseExactMetricGeometryAdmissionFR75V1 {
  validateUpstream(gap);

  return Object.freeze({
    schemaVersion: 'fr75-mediapipe-release-exact-metric-geometry-admission-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'release_exact_screen_to_metric_source_admitted' as const,
    releaseWitness: releaseWitness(),
    upstream: Object.freeze({
      fr69SchemaVersion: gap.schemaVersion,
      fr69ArtifactVersion: gap.artifactVersion,
      fr69AuthorityState: gap.authorityState,
      publicMetricGeometrySurfaceAvailable: gap.publicMetricGeometrySurfaceAvailable,
      normalizedLandmarkZPromotionAuthorized: gap.normalizedLandmarkZPromotionAuthorized,
      screenToMetricReimplementationAuthorized: gap.screenToMetricReimplementationAuthorized,
      metricLipsGeometryIssued: gap.metricLipsGeometryIssued,
      poseNormalizedLipsGeometryIssued: gap.poseNormalizedLipsGeometryIssued,
    }),
    sourceAdmission: Object.freeze({
      canonicalMetricModelAdmitted: true as const,
      defaultPerspectiveEnvironmentAdmitted: true as const,
      screenToMetricAlgorithmSourceAdmitted: true as const,
      procrustesAlgorithmSourceAdmitted: true as const,
      releaseExactInputsAndAlgorithmsAdmitted: true as const,
    }),
    canonicalMetricModel: Object.freeze({
      unit: 'centimeter' as const,
      canonicalModelPath: 'mediapipe/tasks/cc/vision/face_geometry/data/canonical_face_model.obj' as const,
      metadataInputSource: 'FACE_LANDMARK_PIPELINE' as const,
      metadataSourcePath: 'mediapipe/tasks/cc/vision/face_geometry/data/geometry_pipeline_metadata_landmarks.pbtxt' as const,
      metadataBinaryName: 'geometry_pipeline_metadata_landmarks.binarypb' as const,
      metadataBinaryCheckedIn: false as const,
      metadataBinaryGeneratedFromPbtxt: true as const,
      procrustesWeightsSourcePath: 'mediapipe/tasks/cc/vision/face_geometry/data/geometry_pipeline_metadata_landmarks.pbtxt' as const,
      procrustesWeightsNonNegative: true as const,
      geometryLandmarkCount: 468 as const,
      irisLandmarksExcluded: true as const,
      geometryConsumesFirst468Landmarks: true as const,
    }),
    defaultPerspectiveEnvironment: Object.freeze({
      selectedWhenEnvironmentAbsent: true as const,
      originPointLocation: 'TOP_LEFT_CORNER' as const,
      verticalFovDegrees: 63 as const,
      nearPlaneCentimeters: 1 as const,
      farPlaneCentimeters: 10000 as const,
      frameAspectRatioProvidedAtRuntime: true as const,
      publicWebEnvironmentOptionExposed: false as const,
    }),
    screenToMetricAlgorithm: Object.freeze({
      sourcePath: 'mediapipe/tasks/cc/vision/face_geometry/libs/geometry_pipeline.cc' as const,
      inputCoordinateDomain: 'normalized_screen_xyz_relative_z' as const,
      outputCoordinateDomain: 'right_handed_metric_3d' as const,
      relativeZDirectUnprojectionSafe: false as const,
      twoPassScaleEstimationRequired: true as const,
      inversePoseAlignmentRequired: true as const,
      steps: SCREEN_TO_METRIC_STEPS,
    }),
    procrustesAlgorithm: Object.freeze({
      sourcePath: 'mediapipe/tasks/cc/vision/face_geometry/libs/procrustes_solver.cc' as const,
      weightedOrthogonalProblem: true as const,
      squareRootWeights: true as const,
      weightedSourceCentering: true as const,
      designMatrixConstruction: true as const,
      jacobiSvdRotation: true as const,
      reflectionPrevention: true as const,
      scaleEstimation: true as const,
      translationEstimation: true as const,
    }),
    runtimeAuthority: Object.freeze({
      reimplementationParityValidated: false as const,
      screenToMetricReimplementationAuthorized: false as const,
      runtimeMetricGeometryOutputAuthorized: false as const,
      metricLipsGeometryIssued: false as const,
      poseNormalizedLipsGeometryIssued: false as const,
      neutralMetricDefinitionsIssued: 0 as const,
      morphologyProduced: false as const,
      criterionStatesIssued: 0 as const,
      claimsIssued: 0 as const,
      traditionalSemanticAuthority: false as const,
      procrustesSourceExistenceCountsAsParityValidation: false as const,
    }),
    persistencePolicy: Object.freeze({
      rawProviderResponsePersisted: false as const,
      rawMetricMeshPersisted: false as const,
      rawLandmarkDepthPersisted: false as const,
      releaseWitnessMetadataOnly: true as const,
    }),
    remainingBlockers: REMAINING_BLOCKERS,
    prohibitedShortcuts: PROHIBITED_SHORTCUTS,
  });
}

export function validateMediaPipeReleaseExactMetricGeometryFR75(
  admission: MediaPipeReleaseExactMetricGeometryAdmissionFR75V1,
): MediaPipeReleaseExactMetricGeometryAdmissionFR75V1 {
  if (
    admission.schemaVersion !== 'fr75-mediapipe-release-exact-metric-geometry-admission-v1' ||
    admission.artifactVersion !== '0.1.0' ||
    admission.authorityState !== 'release_exact_screen_to_metric_source_admitted'
  ) fail('identity/state drift.');

  const witness = admission.releaseWitness;
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
    admission.upstream.fr69SchemaVersion !== 'fr69-mediapipe-web-metric-geometry-gap-v1' ||
    admission.upstream.fr69ArtifactVersion !== '0.1.0' ||
    admission.upstream.fr69AuthorityState !== 'release_exact_web_metric_geometry_surface_gap' ||
    admission.upstream.publicMetricGeometrySurfaceAvailable !== false ||
    admission.upstream.normalizedLandmarkZPromotionAuthorized !== false ||
    admission.upstream.screenToMetricReimplementationAuthorized !== false ||
    admission.upstream.metricLipsGeometryIssued !== false ||
    admission.upstream.poseNormalizedLipsGeometryIssued !== false
  ) fail('upstream FR-69 boundary drift.');

  const source = admission.sourceAdmission;
  if (
    source.canonicalMetricModelAdmitted !== true ||
    source.defaultPerspectiveEnvironmentAdmitted !== true ||
    source.screenToMetricAlgorithmSourceAdmitted !== true ||
    source.procrustesAlgorithmSourceAdmitted !== true ||
    source.releaseExactInputsAndAlgorithmsAdmitted !== true
  ) fail('source admission drift.');

  const model = admission.canonicalMetricModel;
  if (
    model.unit !== 'centimeter' ||
    model.canonicalModelPath !== 'mediapipe/tasks/cc/vision/face_geometry/data/canonical_face_model.obj' ||
    model.metadataInputSource !== 'FACE_LANDMARK_PIPELINE' ||
    model.metadataSourcePath !== 'mediapipe/tasks/cc/vision/face_geometry/data/geometry_pipeline_metadata_landmarks.pbtxt' ||
    model.metadataBinaryName !== 'geometry_pipeline_metadata_landmarks.binarypb' ||
    model.metadataBinaryCheckedIn !== false ||
    model.metadataBinaryGeneratedFromPbtxt !== true ||
    model.procrustesWeightsSourcePath !== 'mediapipe/tasks/cc/vision/face_geometry/data/geometry_pipeline_metadata_landmarks.pbtxt' ||
    model.procrustesWeightsNonNegative !== true ||
    model.geometryLandmarkCount !== 468 ||
    model.irisLandmarksExcluded !== true ||
    model.geometryConsumesFirst468Landmarks !== true
  ) fail('canonical metric model drift.');

  const environment = admission.defaultPerspectiveEnvironment;
  if (
    environment.selectedWhenEnvironmentAbsent !== true ||
    environment.originPointLocation !== 'TOP_LEFT_CORNER' ||
    environment.verticalFovDegrees !== 63 ||
    environment.nearPlaneCentimeters !== 1 ||
    environment.farPlaneCentimeters !== 10000 ||
    environment.frameAspectRatioProvidedAtRuntime !== true ||
    environment.publicWebEnvironmentOptionExposed !== false
  ) fail('default perspective environment drift.');

  const conversion = admission.screenToMetricAlgorithm;
  if (
    conversion.sourcePath !== 'mediapipe/tasks/cc/vision/face_geometry/libs/geometry_pipeline.cc' ||
    conversion.inputCoordinateDomain !== 'normalized_screen_xyz_relative_z' ||
    conversion.outputCoordinateDomain !== 'right_handed_metric_3d' ||
    conversion.relativeZDirectUnprojectionSafe !== false ||
    conversion.twoPassScaleEstimationRequired !== true ||
    conversion.inversePoseAlignmentRequired !== true ||
    !sameSequence(conversion.steps, SCREEN_TO_METRIC_STEPS)
  ) fail('screen-to-metric source algorithm drift.');

  const procrustes = admission.procrustesAlgorithm;
  if (
    procrustes.sourcePath !== 'mediapipe/tasks/cc/vision/face_geometry/libs/procrustes_solver.cc' ||
    procrustes.weightedOrthogonalProblem !== true ||
    procrustes.squareRootWeights !== true ||
    procrustes.weightedSourceCentering !== true ||
    procrustes.designMatrixConstruction !== true ||
    procrustes.jacobiSvdRotation !== true ||
    procrustes.reflectionPrevention !== true ||
    procrustes.scaleEstimation !== true ||
    procrustes.translationEstimation !== true
  ) fail('Procrustes source algorithm drift.');

  const runtime = admission.runtimeAuthority;
  if (
    runtime.reimplementationParityValidated !== false ||
    runtime.screenToMetricReimplementationAuthorized !== false ||
    runtime.runtimeMetricGeometryOutputAuthorized !== false ||
    runtime.metricLipsGeometryIssued !== false ||
    runtime.poseNormalizedLipsGeometryIssued !== false ||
    runtime.neutralMetricDefinitionsIssued !== 0 ||
    runtime.morphologyProduced !== false ||
    runtime.criterionStatesIssued !== 0 ||
    runtime.claimsIssued !== 0 ||
    runtime.traditionalSemanticAuthority !== false ||
    runtime.procrustesSourceExistenceCountsAsParityValidation !== false
  ) fail('runtime or semantic authority widened.');

  const persistence = admission.persistencePolicy;
  if (
    persistence.rawProviderResponsePersisted !== false ||
    persistence.rawMetricMeshPersisted !== false ||
    persistence.rawLandmarkDepthPersisted !== false ||
    persistence.releaseWitnessMetadataOnly !== true
  ) fail('persistence boundary widened.');

  if (!sameSequence(admission.remainingBlockers, REMAINING_BLOCKERS)) fail('required blocker drift.');
  if (!sameSequence(admission.prohibitedShortcuts, PROHIBITED_SHORTCUTS)) fail('prohibited shortcut drift.');

  return admission;
}
