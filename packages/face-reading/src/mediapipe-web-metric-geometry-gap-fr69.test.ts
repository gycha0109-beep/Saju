import { describe, expect, it } from 'vitest';
import type { MediaPipeFaceLandmarkerResultFR25V1 } from './mediapipe-eye-landmark-adapter-fr25.js';
import type { MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 } from './mediapipe-face-landmarker-runtime-fr26.js';
import { runPhotoToLipsContourNeutralSurfaceFR66 } from './lips-contour-neutral-surface-fr66.js';
import { assessLipsPoseNormalizationRequirementsFR67 } from './lips-pose-normalization-requirements-fr67.js';
import { admitMediaPipeFaceGeometryTransformSemanticsFR68 } from './mediapipe-face-geometry-transform-semantics-fr68.js';
import {
  admitMediaPipeWebMetricGeometryGapFR69,
  assertPublicMetricGeometryAvailableFR69,
  validateMediaPipeWebMetricGeometryGapFR69,
  type MediaPipeWebMetricGeometryGapFR69V1,
} from './mediapipe-web-metric-geometry-gap-fr69.js';

const DIGEST = `sha256:${'d'.repeat(64)}`;

function request() {
  return {
    schemaVersion: 'fr61-production-neutral-observation-provider-request-v1' as const,
    providerRunRef: 'fr69:web-metric-geometry-gap',
    canonicalAssetDigest: DIGEST,
    image: Object.freeze({ image: true }),
  };
}

function validResult(): MediaPipeFaceLandmarkerResultFR25V1 {
  return {
    faceLandmarks: [Array.from({ length: 478 }, (_, index) => Object.freeze({
      x: (index + 1) / 500,
      y: (478 - index) / 500,
      z: (index % 9) / 1000,
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

async function gap(): Promise<MediaPipeWebMetricGeometryGapFR69V1> {
  const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66(request(), factory());
  const fr67 = assessLipsPoseNormalizationRequirementsFR67(fr66);
  const fr68 = admitMediaPipeFaceGeometryTransformSemanticsFR68(fr67);
  return admitMediaPipeWebMetricGeometryGapFR69(fr68);
}

function forged(
  source: MediaPipeWebMetricGeometryGapFR69V1,
  patch: Record<string, unknown>,
): MediaPipeWebMetricGeometryGapFR69V1 {
  return { ...source, ...patch } as unknown as MediaPipeWebMetricGeometryGapFR69V1;
}

describe('FR69 MediaPipe Web metric geometry gap admission', () => {
  it('pins exact v0.10.35 source witnesses for the internal mesh and public Web surface', async () => {
    const result = await gap();

    expect(result.releaseWitness).toMatchObject({
      repository: 'google-ai-edge/mediapipe',
      releaseTag: 'v0.10.35',
      releaseCommit: 'f8ef212d5c962c0e853db7e59d217056b187084b',
      runtimePackageName: '@mediapipe/tasks-vision',
      runtimePackageVersion: '0.10.35',
    });
    expect(result.releaseWitness.files).toEqual([
      {
        path: 'mediapipe/tasks/web/vision/face_landmarker/face_landmarker_result.d.ts',
        blobSha: '56001bc0779ae58daa1cfd8dca565332ae892027',
        evidenceRole: 'public_web_result_surface',
      },
      {
        path: 'mediapipe/tasks/web/vision/face_landmarker/face_landmarker.ts',
        blobSha: '6d9b2f713345fb576301f40c3d520829ab5f23be',
        evidenceRole: 'web_face_geometry_stream_and_converter',
      },
      {
        path: 'mediapipe/tasks/web/vision/face_landmarker/face_landmarker_options.d.ts',
        blobSha: '67739b895a2dfde35a591e08f6839ce85f881b80',
        evidenceRole: 'public_web_options_surface',
      },
      {
        path: 'mediapipe/tasks/cc/vision/face_geometry/proto/face_geometry.proto',
        blobSha: '149e10afde76072196243eb63d4f70693521e6a2',
        evidenceRole: 'internal_metric_mesh_semantics',
      },
      {
        path: 'mediapipe/tasks/cc/vision/face_geometry/proto/mesh_3d.proto',
        blobSha: 'bb21ee7d3865cd7b4bf7805905b9a29c71f00dfd',
        evidenceRole: 'metric_mesh_storage_shape',
      },
      {
        path: 'mediapipe/tasks/web/components/containers/landmark.d.ts',
        blobSha: '48cdab12bcaf3c88d95b18b7f9d5ce9731e1c9fe',
        evidenceRole: 'normalized_landmark_depth_semantics',
      },
      {
        path: 'mediapipe/tasks/cc/vision/face_geometry/libs/geometry_pipeline.cc',
        blobSha: '53c880bd5da524749c755acf9fc69dafe9cc49ef',
        evidenceRole: 'screen_to_metric_algorithm_dependencies',
      },
      {
        path: 'mediapipe/tasks/cc/vision/face_geometry/proto/environment.proto',
        blobSha: '9156f9ce73cd4196cd807c0d4f6d21962fa09fdc',
        evidenceRole: 'perspective_environment_semantics',
      },
    ]);
  });

  it('separates the internal metric mesh from the public Web FaceLandmarkerResult surface', async () => {
    const result = await gap();

    expect(result.internalProviderGeometry).toEqual({
      faceGeometryProtoContainsMesh: true,
      meshVertexIdsMatchFaceLandmarkIds: true,
      meshCoordinateDomain: 'right_handed_metric_3d',
      meshVertexFormat: 'XYZUV',
      faceGeometryStreamCarriesFaceGeometryProto: true,
      faceGeometryStreamPubliclyEnabledOnlyWithTransformationMatrixOption: true,
    });
    expect(result.publicWebSurface).toEqual({
      resultFields: ['faceLandmarks', 'faceBlendshapes', 'facialTransformationMatrixes'],
      metricFaceMeshFieldExposed: false,
      metricLandmarksFieldExposed: false,
      converterCopiesPoseMatrixOnlyFromFaceGeometryProto: true,
      converterCopiesMeshFromFaceGeometryProto: false,
      metricGeometryOutputOptionExposed: false,
      perspectiveCameraEnvironmentOptionExposed: false,
    });
    expect(result.publicMetricGeometrySurfaceAvailable).toBe(false);
  });

  it('forbids treating normalized landmark z as provider metric-space z', async () => {
    const result = await gap();

    expect(result.normalizedLandmarkBoundary).toEqual({
      xYNormalizedByImageDimensions: true,
      zRepresentsRelativeDepth: true,
      zMagnitudeRoughlyMatchesXScale: true,
      zIsMetricMeters: false,
      normalizedXYZIsInternalMetricMeshXYZ: false,
      providerPipelineWarnsRelativeZCannotBeDirectlyUnprojected: true,
    });
    expect(result.prohibitedShortcuts).toContain('normalized_landmark_z_to_metric_z');
    expect(result.prohibitedShortcuts).toContain('normalized_xyz_to_metric_mesh_xyz');
  });

  it('records the provider screen-to-metric dependencies without authorizing a reimplementation', async () => {
    const result = await gap();

    expect(result.metricConversionRequirements).toEqual({
      perspectiveCameraRequired: true,
      frameDimensionsRequired: true,
      canonicalMetricLandmarksRequired: true,
      landmarkWeightsRequired: true,
      procrustesScaleEstimationRequired: true,
      repeatedUnprojectionRequired: true,
      coordinateHandednessConversionRequired: true,
    });
    expect(result.screenToMetricReimplementationAuthorized).toBe(false);
    expect(result.remainingBlockers).toContain('perspective_camera_environment_not_exposed_by_face_landmarker_options');
    expect(result.remainingBlockers).toContain('screen_to_metric_reimplementation_not_admitted');
  });

  it('keeps private proto interception, custom graph patches, metric geometry, metrics, criteria, and claims blocked', async () => {
    const result = await gap();

    expect(result.privateFaceGeometryProtoInterceptionAuthorized).toBe(false);
    expect(result.customGraphRunnerPatchAuthorized).toBe(false);
    expect(result.normalizedLandmarkZPromotionAuthorized).toBe(false);
    expect(result.metricLipsGeometryIssued).toBe(false);
    expect(result.poseNormalizedLipsGeometryIssued).toBe(false);
    expect(result.neutralMetricDefinitionsIssued).toBe(0);
    expect(result.morphologyProduced).toBe(false);
    expect(result.criterionStatesIssued).toBe(0);
    expect(result.claimsIssued).toBe(0);
    expect(result.traditionalSemanticAuthority).toBe(false);
  });

  it('rejects forged surface availability, metric substitution, or authority widening', async () => {
    const source = await gap();
    const variants: readonly [MediaPipeWebMetricGeometryGapFR69V1, RegExp][] = [
      [forged(source, { publicMetricGeometrySurfaceAvailable: true }), /authority boundary widened/u],
      [forged(source, { privateFaceGeometryProtoInterceptionAuthorized: true }), /authority boundary widened/u],
      [forged(source, { customGraphRunnerPatchAuthorized: true }), /authority boundary widened/u],
      [forged(source, { screenToMetricReimplementationAuthorized: true }), /authority boundary widened/u],
      [forged(source, { metricLipsGeometryIssued: true }), /authority boundary widened/u],
      [forged(source, {
        publicWebSurface: { ...source.publicWebSurface, metricFaceMeshFieldExposed: true },
      }), /public Web surface/u],
      [forged(source, {
        normalizedLandmarkBoundary: { ...source.normalizedLandmarkBoundary, zIsMetricMeters: true },
      }), /normalized-landmark boundary/u],
      [forged(source, {
        internalProviderGeometry: { ...source.internalProviderGeometry, meshCoordinateDomain: 'canonical_image_normalized_2d' },
      }), /internal provider geometry/u],
      [forged(source, {
        releaseWitness: { ...source.releaseWitness, releaseCommit: 'forged' },
      }), /release witness/u],
    ];

    for (const [candidate, pattern] of variants) {
      expect(() => validateMediaPipeWebMetricGeometryGapFR69(candidate)).toThrow(pattern);
    }
  });

  it('fails closed when a public metric-geometry surface is requested', async () => {
    const result = await gap();
    expect(() => assertPublicMetricGeometryAvailableFR69(result)).toThrow(/does not expose it/u);
  });
});
