import { describe, expect, it } from 'vitest';
import type { MediaPipeFaceLandmarkerResultFR25V1 } from './mediapipe-eye-landmark-adapter-fr25.js';
import type { MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 } from './mediapipe-face-landmarker-runtime-fr26.js';
import { runPhotoToLipsContourNeutralSurfaceFR66 } from './lips-contour-neutral-surface-fr66.js';
import { assessLipsPoseNormalizationRequirementsFR67 } from './lips-pose-normalization-requirements-fr67.js';
import { admitMediaPipeFaceGeometryTransformSemanticsFR68 } from './mediapipe-face-geometry-transform-semantics-fr68.js';
import { admitMediaPipeWebMetricGeometryGapFR69 } from './mediapipe-web-metric-geometry-gap-fr69.js';
import {
  admitMediaPipeReleaseExactMetricGeometryFR75,
  validateMediaPipeReleaseExactMetricGeometryFR75,
  type MediaPipeReleaseExactMetricGeometryAdmissionFR75V1,
} from './mediapipe-release-exact-metric-geometry-admission-fr75.js';

const DIGEST = `sha256:${'7'.repeat(64)}`;

function request() {
  return {
    schemaVersion: 'fr61-production-neutral-observation-provider-request-v1' as const,
    providerRunRef: 'fr75:release-exact-metric-geometry-admission',
    canonicalAssetDigest: DIGEST,
    image: Object.freeze({ image: true }),
  };
}

function validResult(): MediaPipeFaceLandmarkerResultFR25V1 {
  return {
    faceLandmarks: [Array.from({ length: 478 }, (_, index) => Object.freeze({
      x: (index + 1) / 500,
      y: (478 - index) / 500,
      z: (index % 11) / 1000,
      visibility: 0.99,
    }))],
    faceBlendshapes: [],
    facialTransformationMatrixes: [],
  };
}

function factory(): MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 {
  return {
    async create() {
      return {
        detect() {
          return validResult();
        },
        close() {},
      };
    },
  };
}

async function admission(): Promise<MediaPipeReleaseExactMetricGeometryAdmissionFR75V1> {
  const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66(request(), factory());
  const fr67 = assessLipsPoseNormalizationRequirementsFR67(fr66);
  const fr68 = admitMediaPipeFaceGeometryTransformSemanticsFR68(fr67);
  const fr69 = admitMediaPipeWebMetricGeometryGapFR69(fr68);
  return admitMediaPipeReleaseExactMetricGeometryFR75(fr69);
}

function forged(
  source: MediaPipeReleaseExactMetricGeometryAdmissionFR75V1,
  patch: Record<string, unknown>,
): MediaPipeReleaseExactMetricGeometryAdmissionFR75V1 {
  return { ...source, ...patch } as unknown as MediaPipeReleaseExactMetricGeometryAdmissionFR75V1;
}

describe('FR75 MediaPipe release-exact screen-to-metric source admission', () => {
  it('pins the exact v0.10.35 FaceLandmarker metric-geometry source witness set', async () => {
    const result = await admission();

    expect(result.releaseWitness).toMatchObject({
      repository: 'google-ai-edge/mediapipe',
      releaseTag: 'v0.10.35',
      releaseCommit: 'f8ef212d5c962c0e853db7e59d217056b187084b',
      runtimePackageName: '@mediapipe/tasks-vision',
      runtimePackageVersion: '0.10.35',
    });
    expect(result.releaseWitness.files).toEqual([
      {
        path: 'mediapipe/tasks/cc/vision/face_landmarker/face_landmarker_graph.cc',
        blobSha: 'c9a9a19326b4fc26d6be323b87a89d913eddea5b',
        evidenceRole: 'face_landmarker_geometry_metadata_binding',
      },
      {
        path: 'mediapipe/tasks/cc/vision/face_geometry/face_geometry_from_landmarks_graph.cc',
        blobSha: '2f854c2a2087bfacc97eacf11815fe06c79d1169',
        evidenceRole: 'default_environment_and_landmark_slice',
      },
      {
        path: 'mediapipe/tasks/cc/vision/face_geometry/data/canonical_face_model.obj',
        blobSha: '0e666d1c4e75949d1639c2bcf347a38da4834164',
        evidenceRole: 'canonical_metric_face_model',
      },
      {
        path: 'mediapipe/tasks/cc/vision/face_geometry/data/geometry_pipeline_metadata_landmarks.pbtxt',
        blobSha: '252a7b05b24c5c43c5b94179393639f7c9a2fe8f',
        evidenceRole: 'procrustes_landmark_weights',
      },
      {
        path: 'mediapipe/tasks/cc/vision/face_geometry/data/BUILD',
        blobSha: 'a7085f3dbecdf04ec3042855e20dfe52b417ab48',
        evidenceRole: 'generated_metadata_binary_binding',
      },
      {
        path: 'mediapipe/tasks/cc/vision/face_geometry/proto/geometry_pipeline_metadata.proto',
        blobSha: '53d1a1392e393d606ec6974e766647dc8d56f7da',
        evidenceRole: 'canonical_unit_and_input_depth_semantics',
      },
      {
        path: 'mediapipe/tasks/cc/vision/face_geometry/proto/environment.proto',
        blobSha: '9156f9ce73cd4196cd807c0d4f6d21962fa09fdc',
        evidenceRole: 'perspective_environment_schema',
      },
      {
        path: 'mediapipe/tasks/cc/vision/face_geometry/libs/geometry_pipeline.cc',
        blobSha: '53c880bd5da524749c755acf9fc69dafe9cc49ef',
        evidenceRole: 'screen_to_metric_pipeline',
      },
      {
        path: 'mediapipe/tasks/cc/vision/face_geometry/libs/procrustes_solver.cc',
        blobSha: '82ba4b8c5ea974e6e0510a6b8105ae54566722c0',
        evidenceRole: 'weighted_procrustes_solver',
      },
    ]);
  });

  it('admits canonical centimeter metadata and the generated binary relationship without treating normalized landmarks as metric', async () => {
    const result = await admission();

    expect(result.canonicalMetricModel).toEqual({
      unit: 'centimeter',
      canonicalModelPath: 'mediapipe/tasks/cc/vision/face_geometry/data/canonical_face_model.obj',
      metadataInputSource: 'FACE_LANDMARK_PIPELINE',
      metadataSourcePath: 'mediapipe/tasks/cc/vision/face_geometry/data/geometry_pipeline_metadata_landmarks.pbtxt',
      metadataBinaryName: 'geometry_pipeline_metadata_landmarks.binarypb',
      metadataBinaryCheckedIn: false,
      metadataBinaryGeneratedFromPbtxt: true,
      procrustesWeightsSourcePath: 'mediapipe/tasks/cc/vision/face_geometry/data/geometry_pipeline_metadata_landmarks.pbtxt',
      procrustesWeightsNonNegative: true,
      geometryLandmarkCount: 468,
      irisLandmarksExcluded: true,
      geometryConsumesFirst468Landmarks: true,
    });
    expect(result.prohibitedShortcuts).toContain('canonical_centimeter_model_to_runtime_normalized_metric_coordinates');
    expect(result.prohibitedShortcuts).toContain('generated_binary_name_to_checked_in_binary_blob');
  });

  it('pins the provider default perspective environment and keeps the public Web environment surface closed', async () => {
    const result = await admission();

    expect(result.defaultPerspectiveEnvironment).toEqual({
      selectedWhenEnvironmentAbsent: true,
      originPointLocation: 'TOP_LEFT_CORNER',
      verticalFovDegrees: 63,
      nearPlaneCentimeters: 1,
      farPlaneCentimeters: 10000,
      frameAspectRatioProvidedAtRuntime: true,
      publicWebEnvironmentOptionExposed: false,
    });
    expect(result.prohibitedShortcuts).toContain('default_camera_to_arbitrary_web_input_pose_normalized');
  });

  it('admits the exact screen-to-metric and weighted Procrustes source algorithms only', async () => {
    const result = await admission();

    expect(result.sourceAdmission).toEqual({
      canonicalMetricModelAdmitted: true,
      defaultPerspectiveEnvironmentAdmitted: true,
      screenToMetricAlgorithmSourceAdmitted: true,
      procrustesAlgorithmSourceAdmitted: true,
      releaseExactInputsAndAlgorithmsAdmitted: true,
    });
    expect(result.screenToMetricAlgorithm).toMatchObject({
      inputCoordinateDomain: 'normalized_screen_xyz_relative_z',
      outputCoordinateDomain: 'right_handed_metric_3d',
      relativeZDirectUnprojectionSafe: false,
      twoPassScaleEstimationRequired: true,
      inversePoseAlignmentRequired: true,
    });
    expect(result.screenToMetricAlgorithm.steps).toEqual([
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
    ]);
    expect(result.procrustesAlgorithm).toMatchObject({
      weightedOrthogonalProblem: true,
      squareRootWeights: true,
      weightedSourceCentering: true,
      designMatrixConstruction: true,
      jacobiSvdRotation: true,
      reflectionPrevention: true,
      scaleEstimation: true,
      translationEstimation: true,
    });
  });

  it('does not promote source admission into parity, runtime metric output, morphology, criteria, claims, or traditional semantics', async () => {
    const result = await admission();

    expect(result.runtimeAuthority).toEqual({
      reimplementationParityValidated: false,
      screenToMetricReimplementationAuthorized: false,
      runtimeMetricGeometryOutputAuthorized: false,
      metricLipsGeometryIssued: false,
      poseNormalizedLipsGeometryIssued: false,
      neutralMetricDefinitionsIssued: 0,
      morphologyProduced: false,
      criterionStatesIssued: 0,
      claimsIssued: 0,
      traditionalSemanticAuthority: false,
      procrustesSourceExistenceCountsAsParityValidation: false,
    });
    expect(result.persistencePolicy).toEqual({
      rawProviderResponsePersisted: false,
      rawMetricMeshPersisted: false,
      rawLandmarkDepthPersisted: false,
      releaseWitnessMetadataOnly: true,
    });
  });

  it('rejects release, source, camera, landmark, unit, runtime, semantic, blocker, and shortcut widening', async () => {
    const source = await admission();
    const driftedFiles = source.releaseWitness.files.map((file, index) =>
      index === 7 ? { ...file, blobSha: 'forged' } : file,
    );

    const variants: readonly [MediaPipeReleaseExactMetricGeometryAdmissionFR75V1, RegExp][] = [
      [forged(source, { releaseWitness: { ...source.releaseWitness, releaseTag: 'v0.10.36' } }), /release witness drift/u],
      [forged(source, { releaseWitness: { ...source.releaseWitness, releaseCommit: 'forged' } }), /release witness drift/u],
      [forged(source, { releaseWitness: { ...source.releaseWitness, files: driftedFiles } }), /release witness file drift/u],
      [forged(source, { canonicalMetricModel: { ...source.canonicalMetricModel, unit: 'meter' } }), /canonical metric model drift/u],
      [forged(source, { canonicalMetricModel: { ...source.canonicalMetricModel, geometryLandmarkCount: 478 } }), /canonical metric model drift/u],
      [forged(source, { canonicalMetricModel: { ...source.canonicalMetricModel, irisLandmarksExcluded: false } }), /canonical metric model drift/u],
      [forged(source, { defaultPerspectiveEnvironment: { ...source.defaultPerspectiveEnvironment, verticalFovDegrees: 60 } }), /default perspective environment drift/u],
      [forged(source, { defaultPerspectiveEnvironment: { ...source.defaultPerspectiveEnvironment, nearPlaneCentimeters: 0.1 } }), /default perspective environment drift/u],
      [forged(source, { defaultPerspectiveEnvironment: { ...source.defaultPerspectiveEnvironment, farPlaneCentimeters: 1000 } }), /default perspective environment drift/u],
      [forged(source, { runtimeAuthority: { ...source.runtimeAuthority, reimplementationParityValidated: true } }), /runtime or semantic authority widened/u],
      [forged(source, { runtimeAuthority: { ...source.runtimeAuthority, screenToMetricReimplementationAuthorized: true } }), /runtime or semantic authority widened/u],
      [forged(source, { runtimeAuthority: { ...source.runtimeAuthority, runtimeMetricGeometryOutputAuthorized: true } }), /runtime or semantic authority widened/u],
      [forged(source, { runtimeAuthority: { ...source.runtimeAuthority, poseNormalizedLipsGeometryIssued: true } }), /runtime or semantic authority widened/u],
      [forged(source, { runtimeAuthority: { ...source.runtimeAuthority, morphologyProduced: true } }), /runtime or semantic authority widened/u],
      [forged(source, { runtimeAuthority: { ...source.runtimeAuthority, criterionStatesIssued: 1 } }), /runtime or semantic authority widened/u],
      [forged(source, { runtimeAuthority: { ...source.runtimeAuthority, claimsIssued: 1 } }), /runtime or semantic authority widened/u],
      [forged(source, { runtimeAuthority: { ...source.runtimeAuthority, traditionalSemanticAuthority: true } }), /runtime or semantic authority widened/u],
      [forged(source, { runtimeAuthority: { ...source.runtimeAuthority, procrustesSourceExistenceCountsAsParityValidation: true } }), /runtime or semantic authority widened/u],
      [forged(source, { remainingBlockers: source.remainingBlockers.slice(1) }), /required blocker drift/u],
      [forged(source, { prohibitedShortcuts: source.prohibitedShortcuts.slice(1) }), /prohibited shortcut drift/u],
    ];

    for (const [candidate, pattern] of variants) {
      expect(() => validateMediaPipeReleaseExactMetricGeometryFR75(candidate)).toThrow(pattern);
    }
  });

  it('keeps 478-landmark iris inclusion explicitly outside the 468-landmark geometry admission', async () => {
    const result = await admission();
    expect(result.canonicalMetricModel.geometryLandmarkCount).toBe(468);
    expect(result.canonicalMetricModel.irisLandmarksExcluded).toBe(true);
    expect(result.prohibitedShortcuts).toContain('first_468_geometry_to_iris_inclusive_478_geometry');
  });
});
