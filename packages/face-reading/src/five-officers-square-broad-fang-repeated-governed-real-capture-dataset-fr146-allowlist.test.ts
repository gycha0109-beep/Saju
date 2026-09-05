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
import {
  DEFAULT_SQUARE_BROAD_FANG_REPEATED_GOVERNED_REAL_CAPTURE_DEPENDENCIES_FR146,
  runSquareBroadFangRepeatedGovernedRealCaptureFR146,
  type SquareBroadFangRepeatedCaptureInputFR146V1,
  type SquareBroadFangRepeatedGovernedRealCaptureRequestFR146V1,
} from './five-officers-square-broad-fang-repeated-governed-real-capture-dataset-fr146.js';

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
        detect() { return providerResult(); },
        close() {},
      };
    },
  };
}

async function parity(): Promise<MediaPipeScreenToMetricReimplementationParityFR76V1> {
  const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66({
    schemaVersion: 'fr61-production-neutral-observation-provider-request-v1',
    providerRunRef: 'fr146:allowlist-test-parity',
    canonicalAssetDigest: DIGEST,
    image: Object.freeze({ synthetic: true }),
  }, providerFactory());
  const fr67 = assessLipsPoseNormalizationRequirementsFR67(fr66);
  const fr68 = admitMediaPipeFaceGeometryTransformSemanticsFR68(fr67);
  const fr69 = admitMediaPipeWebMetricGeometryGapFR69(fr68);
  return admitMediaPipeScreenToMetricReimplementationParityFR76(
    admitMediaPipeReleaseExactMetricGeometryFR75(fr69),
  );
}

async function request(): Promise<SquareBroadFangRepeatedGovernedRealCaptureRequestFR146V1> {
  return {
    schemaVersion: 'fr146-square-broad-fang-repeated-governed-real-capture-request-v1',
    researchSubjectRef: 'study-subject:fr146:allowlist',
    captureSeriesRef: 'capture-series:fr146:allowlist',
    geometryMetadataPbtxt: 'release-exact-test-metadata',
    parity: await parity(),
    captures: [
      {
        acquisitionRunRef: 'acquisition:fr146:allowlist:A1',
        providerRunRef: 'provider:fr146:allowlist:A1',
        captureRef: 'capture:fr146:allowlist:A1',
        imageBlob: new Blob([new Uint8Array([1, 2, 3])], { type: 'image/jpeg' }),
      },
      {
        acquisitionRunRef: 'acquisition:fr146:allowlist:A2',
        providerRunRef: 'provider:fr146:allowlist:A2',
        captureRef: 'capture:fr146:allowlist:A2',
        imageBlob: new Blob([new Uint8Array([4, 5, 6])], { type: 'image/jpeg' }),
      },
    ],
  };
}

describe('FR146 strict request allowlists', () => {
  it('rejects unauthorized top-level request fields before capture execution', async () => {
    const value = await request();
    let calls = 0;
    const dependencies = {
      ...DEFAULT_SQUARE_BROAD_FANG_REPEATED_GOVERNED_REAL_CAPTURE_DEPENDENCIES_FR146,
      async runCapture(input: Parameters<
        typeof DEFAULT_SQUARE_BROAD_FANG_REPEATED_GOVERNED_REAL_CAPTURE_DEPENDENCIES_FR146.runCapture
      >[0]) {
        calls += 1;
        return DEFAULT_SQUARE_BROAD_FANG_REPEATED_GOVERNED_REAL_CAPTURE_DEPENDENCIES_FR146.runCapture(input);
      },
    };

    await expect(runSquareBroadFangRepeatedGovernedRealCaptureFR146({
      ...value,
      sourceDigest: 'forbidden',
    } as unknown as SquareBroadFangRepeatedGovernedRealCaptureRequestFR146V1, dependencies))
      .rejects.toThrow(/request contains unauthorized field: sourceDigest/u);
    expect(calls).toBe(0);
  });

  it('rejects unauthorized capture fields before any provider execution', async () => {
    const value = await request();
    let calls = 0;
    const dependencies = {
      ...DEFAULT_SQUARE_BROAD_FANG_REPEATED_GOVERNED_REAL_CAPTURE_DEPENDENCIES_FR146,
      async runCapture(input: Parameters<
        typeof DEFAULT_SQUARE_BROAD_FANG_REPEATED_GOVERNED_REAL_CAPTURE_DEPENDENCIES_FR146.runCapture
      >[0]) {
        calls += 1;
        return DEFAULT_SQUARE_BROAD_FANG_REPEATED_GOVERNED_REAL_CAPTURE_DEPENDENCIES_FR146.runCapture(input);
      },
    };
    const widenedCapture = {
      ...value.captures[0]!,
      sourceDigest: 'forbidden',
    } as unknown as SquareBroadFangRepeatedCaptureInputFR146V1;

    await expect(runSquareBroadFangRepeatedGovernedRealCaptureFR146({
      ...value,
      captures: [widenedCapture, value.captures[1]!],
    }, dependencies)).rejects.toThrow(/capture 0 contains unauthorized field: sourceDigest/u);
    expect(calls).toBe(0);
  });
});
