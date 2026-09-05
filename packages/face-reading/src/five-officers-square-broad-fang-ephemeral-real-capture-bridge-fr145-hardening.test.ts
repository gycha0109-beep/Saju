import { describe, expect, it } from 'vitest';
import type { MediaPipeFaceLandmarkerResultFR25V1 } from './mediapipe-eye-landmark-adapter-fr25.js';
import type { MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 } from './mediapipe-face-landmarker-runtime-fr26.js';
import { runPhotoToLipsContourNeutralSurfaceFR66 } from './lips-contour-neutral-surface-fr66.js';
import { assessLipsPoseNormalizationRequirementsFR67 } from './lips-pose-normalization-requirements-fr67.js';
import { admitMediaPipeFaceGeometryTransformSemanticsFR68 } from './mediapipe-face-geometry-transform-semantics-fr68.js';
import { admitMediaPipeWebMetricGeometryGapFR69 } from './mediapipe-web-metric-geometry-gap-fr69.js';
import { admitMediaPipeReleaseExactMetricGeometryFR75 } from './mediapipe-release-exact-metric-geometry-admission-fr75.js';
import { admitMediaPipeScreenToMetricReimplementationParityFR76 } from './mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import type { GovernedMetricGeometryCandidateFR77V1 } from './governed-metric-geometry-runtime-fr77.js';
import type { GovernedMetricLipsSurfaceFR78V1 } from './governed-metric-lips-surface-fr78.js';
import type { PoseNormalizedLipsGeometryFR79V1 } from './pose-normalized-lips-geometry-fr79.js';
import type { SquareBroadNeutralShapeMetricRuntimeFR134V1 } from './five-officers-square-broad-neutral-shape-metric-runtime-fr134.js';
import type { SquareBroadFangNeutralCandidateMetricRuntimeFR142V1 } from './five-officers-square-broad-fang-neutral-candidate-metric-runtime-fr142.js';
import type { SquareBroadFangNeutralCaptureRecordFR144V1 } from './five-officers-square-broad-fang-real-capture-acquisition-fr144.js';
import {
  runSquareBroadFangEphemeralRealCaptureFR145,
  type SquareBroadFangEphemeralRealCaptureDependenciesFR145V1,
} from './five-officers-square-broad-fang-ephemeral-real-capture-bridge-fr145.js';

function providerFactory(): MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 {
  const result: MediaPipeFaceLandmarkerResultFR25V1 = {
    faceLandmarks: [Array.from({ length: 478 }, (_, index) => ({
      x: (index + 1) / 500,
      y: (478 - index) / 500,
      z: (index % 11) / 1000,
    }))],
    faceBlendshapes: [],
    facialTransformationMatrixes: [],
  };
  return {
    async create() {
      return { detect: () => result, close() {} };
    },
  };
}

async function parity() {
  const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66({
    schemaVersion: 'fr61-production-neutral-observation-provider-request-v1',
    providerRunRef: 'fr145:hardening-parity',
    canonicalAssetDigest: `sha256:${'7'.repeat(64)}`,
    image: {},
  }, providerFactory());
  const fr67 = assessLipsPoseNormalizationRequirementsFR67(fr66);
  const fr68 = admitMediaPipeFaceGeometryTransformSemanticsFR68(fr67);
  const fr69 = admitMediaPipeWebMetricGeometryGapFR69(fr68);
  return admitMediaPipeScreenToMetricReimplementationParityFR76(admitMediaPipeReleaseExactMetricGeometryFR75(fr69));
}

function deps(release: () => void): SquareBroadFangEphemeralRealCaptureDependenciesFR145V1 {
  const contours = [0, 1].map((contourIndex) => ({
    geometry: {
      kind: 'region' as const,
      boundary: Array.from({ length: 20 }, (_, pointIndex) => ({ x: pointIndex, y: contourIndex + pointIndex / 10 })),
    },
    anatomicalRole: null,
    traditionalRole: null,
  }));
  return {
    decoder: { async decode() { return { image: { rawPixels: 'forbidden' }, width: 554, height: 554, release }; } },
    runtimeFactory: providerFactory(),
    async runMetricGeometry() {
      return {
        provider: { providerLandmarkCount: 478, rawProviderResponse: 'forbidden' },
        metricLandmarks: Array.from({ length: 468 }, () => ({ x: 1, y: 2, z: 3 })),
      } as unknown as GovernedMetricGeometryCandidateFR77V1;
    },
    projectLips() { return { transientMetricCoordinates: 'forbidden' } as unknown as GovernedMetricLipsSurfaceFR78V1; },
    projectPoseNormalized() {
      return {
        coordinateFrame: 'pose_normalized_face_2d',
        poseCompensated: true,
        depthOutputIssued: false,
        contourCount: 2,
        contours,
        contourPointCounts: [20, 20],
        contourConsumptionState: 'unordered_set_no_outer_inner_role',
        transientCoordinates: 'forbidden',
      } as unknown as PoseNormalizedLipsGeometryFR79V1;
    },
    computeFR134() {
      return { metricValues: [
        { metricRef: 'neutral.mouth.contour_set.closed_cycle_axis_alignment_mean@0.1.0', value: 0.8, unit: 'ratio' },
        { metricRef: 'neutral.mouth.contour_set.closed_cycle_mean_absolute_turning_angle@0.1.0', value: 0.3, unit: 'radian' },
      ] } as unknown as SquareBroadNeutralShapeMetricRuntimeFR134V1;
    },
    computeFR142() {
      return { metricValues: [
        { metricRef: 'neutral.mouth.contour_set.horizontal_reflection_nearest_set_residual_ratio@0.1.0', value: 0.1, unit: 'ratio' },
        { metricRef: 'neutral.mouth.contour_set.orthogonal_edge_orientation_concentration@0.1.0', value: 0.7, unit: 'ratio' },
        { metricRef: 'neutral.mouth.contour_set.turning_angle_concentration_index@0.1.0', value: 0.2, unit: 'ratio' },
      ] } as unknown as SquareBroadFangNeutralCandidateMetricRuntimeFR142V1;
    },
    recordFR144() {
      return {
        privacyBoundary: {
          rawImageStored: false,
          sourceImageContentStored: false,
          rawProviderResponseStored: false,
          faceEmbeddingStored: false,
          identityTemplateStored: false,
        },
        semanticBoundary: { humanSemanticLabel: null, traditionalClassLabel: null },
        traditionalSemanticAuthority: false,
      } as unknown as SquareBroadFangNeutralCaptureRecordFR144V1;
    },
    assertFR144Record() {},
  };
}

describe('FR145 hardening', () => {
  it('does not return raw image/provider/geometry payloads and keeps semantic authority unresolved', async () => {
    let releases = 0;
    const result = await runSquareBroadFangEphemeralRealCaptureFR145({
      schemaVersion: 'fr145-square-broad-fang-ephemeral-real-capture-request-v1',
      acquisitionRunRef: 'acquisition:hardening-1',
      providerRunRef: 'provider:hardening-1',
      identity: {
        researchSubjectRef: 'subject:hardening-1',
        captureSeriesRef: 'series:hardening-1',
        captureRef: 'capture:hardening-1',
      },
      imageBlob: new Blob([new Uint8Array([9, 8, 7])], { type: 'image/jpeg' }),
      geometryMetadataPbtxt: 'injected-test-metadata',
      parity: await parity(),
    }, deps(() => { releases += 1; }));

    const serialized = JSON.stringify(result);
    expect(releases).toBe(1);
    expect(serialized).not.toContain('rawPixels');
    expect(serialized).not.toContain('rawProviderResponse":"forbidden');
    expect(serialized).not.toContain('transientMetricCoordinates');
    expect(serialized).not.toContain('transientCoordinates');
    expect(result.semanticAuthority.constructValidity).toBe('unresolved');
    expect(result.semanticAuthority.traditionalBinding).toBe('unresolved');
    expect(result.semanticAuthority.criterionState).toBeNull();
    expect(result.semanticAuthority.structuredClaim).toBeNull();
    expect(result.semanticAuthority.boundedNarrative).toBeNull();
  });

  it('releases a decoded image when the decoder returns invalid dimensions', async () => {
    let releases = 0;
    const base = deps(() => { releases += 1; });
    const invalid: SquareBroadFangEphemeralRealCaptureDependenciesFR145V1 = {
      ...base,
      decoder: { async decode() { return { image: {}, width: 0, height: 554, release: () => { releases += 1; } }; } },
    };
    const parityValue = await parity();
    await expect(runSquareBroadFangEphemeralRealCaptureFR145({
      schemaVersion: 'fr145-square-broad-fang-ephemeral-real-capture-request-v1',
      acquisitionRunRef: 'acquisition:invalid-dimensions',
      providerRunRef: 'provider:invalid-dimensions',
      identity: { researchSubjectRef: 'subject:x', captureSeriesRef: 'series:x', captureRef: 'capture:x' },
      imageBlob: new Blob([new Uint8Array([1])]),
      geometryMetadataPbtxt: 'injected-test-metadata',
      parity: parityValue,
    }, invalid)).rejects.toThrow(/invalid natural dimensions/u);
    expect(releases).toBe(1);
  });
});
