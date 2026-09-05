import { describe, expect, it } from 'vitest';
import type { MediaPipeFaceLandmarkerResultFR25V1 } from './mediapipe-eye-landmark-adapter-fr25.js';
import type { MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 } from './mediapipe-face-landmarker-runtime-fr26.js';
import { runPhotoToLipsContourNeutralSurfaceFR66 } from './lips-contour-neutral-surface-fr66.js';
import { assessLipsPoseNormalizationRequirementsFR67 } from './lips-pose-normalization-requirements-fr67.js';
import { admitMediaPipeFaceGeometryTransformSemanticsFR68 } from './mediapipe-face-geometry-transform-semantics-fr68.js';
import { admitMediaPipeWebMetricGeometryGapFR69 } from './mediapipe-web-metric-geometry-gap-fr69.js';
import { admitMediaPipeReleaseExactMetricGeometryFR75 } from './mediapipe-release-exact-metric-geometry-admission-fr75.js';
import {
  admitMediaPipeScreenToMetricReimplementationParityFR76,
  type MediaPipeScreenToMetricReimplementationParityFR76V1,
} from './mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import type { GovernedMetricGeometryCandidateFR77V1 } from './governed-metric-geometry-runtime-fr77.js';
import type { GovernedMetricLipsSurfaceFR78V1 } from './governed-metric-lips-surface-fr78.js';
import type { PoseNormalizedLipsGeometryFR79V1 } from './pose-normalized-lips-geometry-fr79.js';
import type { SquareBroadNeutralShapeMetricRuntimeFR134V1 } from './five-officers-square-broad-neutral-shape-metric-runtime-fr134.js';
import type { SquareBroadFangNeutralCandidateMetricRuntimeFR142V1 } from './five-officers-square-broad-fang-neutral-candidate-metric-runtime-fr142.js';
import type { SquareBroadFangNeutralCaptureRecordFR144V1 } from './five-officers-square-broad-fang-real-capture-acquisition-fr144.js';
import {
  runSquareBroadFangEphemeralRealCaptureFR145,
  type SquareBroadFangEphemeralRealCaptureDependenciesFR145V1,
  type SquareBroadFangEphemeralRealCaptureRequestFR145V1,
} from './five-officers-square-broad-fang-ephemeral-real-capture-bridge-fr145.js';

const DIGEST = `sha256:${'8'.repeat(64)}`;

function providerResult(): MediaPipeFaceLandmarkerResultFR25V1 {
  return {
    faceLandmarks: [Array.from({ length: 478 }, (_, index) => Object.freeze({
      x: (index + 1) / 500,
      y: (478 - index) / 500,
      z: (index % 13) / 1000,
      visibility: 0.99,
    }))],
    faceBlendshapes: [],
    facialTransformationMatrixes: [],
  };
}

function providerFactory(): MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 {
  return {
    async create() {
      return {
        detect() {
          return providerResult();
        },
        close() {},
      };
    },
  };
}

async function parity(): Promise<MediaPipeScreenToMetricReimplementationParityFR76V1> {
  const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66({
    schemaVersion: 'fr61-production-neutral-observation-provider-request-v1',
    providerRunRef: 'fr145:test-parity',
    canonicalAssetDigest: DIGEST,
    image: Object.freeze({ image: true }),
  }, providerFactory());
  const fr67 = assessLipsPoseNormalizationRequirementsFR67(fr66);
  const fr68 = admitMediaPipeFaceGeometryTransformSemanticsFR68(fr67);
  const fr69 = admitMediaPipeWebMetricGeometryGapFR69(fr68);
  return admitMediaPipeScreenToMetricReimplementationParityFR76(
    admitMediaPipeReleaseExactMetricGeometryFR75(fr69),
  );
}

function geometry(): GovernedMetricGeometryCandidateFR77V1 {
  return {
    provider: { providerLandmarkCount: 478 },
    metricLandmarks: Array.from({ length: 468 }, () => ({ x: 0, y: 0, z: 0 })),
  } as unknown as GovernedMetricGeometryCandidateFR77V1;
}

function lips(): GovernedMetricLipsSurfaceFR78V1 {
  return {} as GovernedMetricLipsSurfaceFR78V1;
}

function poseNormalized(): PoseNormalizedLipsGeometryFR79V1 {
  const contour = () => ({
    geometry: { kind: 'region' as const, boundary: Array.from({ length: 20 }, (_, index) => ({ x: index, y: index + 1 })) },
    anatomicalRole: null,
    traditionalRole: null,
  });
  return {
    coordinateFrame: 'pose_normalized_face_2d',
    poseCompensated: true,
    depthOutputIssued: false,
    contourCount: 2,
    contours: [contour(), contour()],
    contourPointCounts: [20, 20],
    contourConsumptionState: 'unordered_set_no_outer_inner_role',
  } as unknown as PoseNormalizedLipsGeometryFR79V1;
}

function fr134(): SquareBroadNeutralShapeMetricRuntimeFR134V1 {
  return {
    metricValues: [
      {
        metricRef: 'neutral.mouth.contour_set.closed_cycle_axis_alignment_mean@0.1.0',
        value: 0.8125,
        unit: 'ratio',
      },
      {
        metricRef: 'neutral.mouth.contour_set.closed_cycle_mean_absolute_turning_angle@0.1.0',
        value: 0.314159,
        unit: 'radian',
      },
    ],
  } as unknown as SquareBroadNeutralShapeMetricRuntimeFR134V1;
}

function fr142(): SquareBroadFangNeutralCandidateMetricRuntimeFR142V1 {
  return {
    metricValues: [
      {
        metricRef: 'neutral.mouth.contour_set.horizontal_reflection_nearest_set_residual_ratio@0.1.0',
        value: 0.11,
        unit: 'ratio',
      },
      {
        metricRef: 'neutral.mouth.contour_set.orthogonal_edge_orientation_concentration@0.1.0',
        value: 0.72,
        unit: 'ratio',
      },
      {
        metricRef: 'neutral.mouth.contour_set.turning_angle_concentration_index@0.1.0',
        value: 0.28,
        unit: 'ratio',
      },
    ],
  } as unknown as SquareBroadFangNeutralCandidateMetricRuntimeFR142V1;
}

function fr144(): SquareBroadFangNeutralCaptureRecordFR144V1 {
  return {
    identity: {
      researchSubjectRef: 'subject:local-1',
      captureSeriesRef: 'series:local-1',
      captureRef: 'capture:local-1',
    },
    privacyBoundary: {
      rawImageStored: false,
      sourceImageContentStored: false,
      rawProviderResponseStored: false,
      faceEmbeddingStored: false,
      identityTemplateStored: false,
      researchSubjectRefClaimedAnonymous: false,
    },
    semanticBoundary: {
      humanSemanticLabel: null,
      traditionalClassLabel: null,
      semanticAnnotationRequiredToRecordNeutralMetrics: false,
      neutralCaptureRecordMeansConstructValidity: false,
      neutralCaptureRecordMeansTraditionalFang: false,
    },
    traditionalSemanticAuthority: false,
  } as unknown as SquareBroadFangNeutralCaptureRecordFR144V1;
}

function request(parityValue: MediaPipeScreenToMetricReimplementationParityFR76V1): SquareBroadFangEphemeralRealCaptureRequestFR145V1 {
  return {
    schemaVersion: 'fr145-square-broad-fang-ephemeral-real-capture-request-v1',
    acquisitionRunRef: 'acquisition:local-1',
    providerRunRef: 'provider:local-1',
    identity: {
      researchSubjectRef: 'subject:local-1',
      captureSeriesRef: 'series:local-1',
      captureRef: 'capture:local-1',
    },
    imageBlob: new Blob([new Uint8Array([1, 2, 3, 4])], { type: 'image/jpeg' }),
    geometryMetadataPbtxt: 'release-exact-metadata-placeholder-for-injected-runtime',
    parity: parityValue,
  };
}

function dependencies(release: () => void): SquareBroadFangEphemeralRealCaptureDependenciesFR145V1 {
  return {
    decoder: {
      async decode() {
        return { image: { inMemoryImage: true }, width: 554, height: 554, release };
      },
    },
    runtimeFactory: providerFactory(),
    async runMetricGeometry() {
      return geometry();
    },
    projectLips() {
      return lips();
    },
    projectPoseNormalized() {
      return poseNormalized();
    },
    computeFR134() {
      return fr134();
    },
    computeFR142() {
      return fr142();
    },
    recordFR144() {
      return fr144();
    },
    assertFR144Record() {},
  };
}

describe('FR145 ephemeral real-capture bridge', () => {
  it('runs the governed neutral chain and emits only bounded aggregate/acquisition output', async () => {
    const parityValue = await parity();
    let releases = 0;
    const result = await runSquareBroadFangEphemeralRealCaptureFR145(
      request(parityValue),
      dependencies(() => { releases += 1; }),
    );

    expect(releases).toBe(1);
    expect(result.faceDetected).toBe(true);
    expect(result.providerLandmarkCount).toBe(478);
    expect(result.governedMetricLandmarkCount).toBe(468);
    expect(result.frame).toEqual({ width: 554, height: 554 });
    expect(result.lipContours).toEqual({
      contourCount: 2,
      contourPointCounts: [20, 20],
      contourConsumptionState: 'unordered_set_no_outer_inner_role',
      anatomicalRoleAssigned: false,
      traditionalRoleAssigned: false,
    });
    expect(result.fr134.metricValues.map((metric) => metric.value)).toEqual([0.8125, 0.314159]);
    expect(result.fr142.metricValues.map((metric) => metric.value)).toEqual([0.11, 0.72, 0.28]);
    expect(result.fr144.acquisitionValidation).toBe('PASS');
    expect(result.persistencePolicy).toEqual({
      rawImagePersisted: false,
      rawProviderResponsePersisted: false,
      embeddingPersisted: false,
      identityTemplatePersisted: false,
      derivedFullFaceMetricGeometryPersisted: false,
      derivedPoseNormalizedLipsGeometryPersisted: false,
    });
    expect(result.semanticAuthority).toEqual({
      constructValidity: 'unresolved',
      traditionalBinding: 'unresolved',
      criterionState: null,
      structuredClaim: null,
      boundedNarrative: null,
    });
    expect(result.traditionalSemanticAuthority).toBe(false);
    expect(JSON.stringify(result)).not.toContain('inMemoryImage');
    expect(JSON.stringify(result)).not.toContain('objectURL');
  });

  it('releases the ephemeral decoded image even when a downstream governed stage fails', async () => {
    const parityValue = await parity();
    let releases = 0;
    const deps = dependencies(() => { releases += 1; });
    const failing: SquareBroadFangEphemeralRealCaptureDependenciesFR145V1 = {
      ...deps,
      computeFR142() {
        throw new Error('synthetic downstream failure');
      },
    };

    await expect(runSquareBroadFangEphemeralRealCaptureFR145(request(parityValue), failing))
      .rejects.toThrow(/synthetic downstream failure/u);
    expect(releases).toBe(1);
  });

  it('rejects request-level raw-provider/identity payload widening before decode', async () => {
    const parityValue = await parity();
    const widened = {
      ...request(parityValue),
      rawProviderResponse: { forbidden: true },
    } as unknown as SquareBroadFangEphemeralRealCaptureRequestFR145V1;
    let decoded = false;
    const deps = dependencies(() => {});
    const guarded: SquareBroadFangEphemeralRealCaptureDependenciesFR145V1 = {
      ...deps,
      decoder: {
        async decode() {
          decoded = true;
          return { image: {}, width: 1, height: 1, release() {} };
        },
      },
    };

    await expect(runSquareBroadFangEphemeralRealCaptureFR145(widened, guarded))
      .rejects.toThrow(/unauthorized field: rawProviderResponse/u);
    expect(decoded).toBe(false);
  });
});
