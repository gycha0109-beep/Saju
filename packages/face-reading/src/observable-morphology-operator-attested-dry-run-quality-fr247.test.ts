import { describe, expect, it, vi } from 'vitest';
import {
  FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER,
  FR24_EYE_TOPOLOGY_WITNESS_EDGES,
} from './face-eye-pair-research-bridge-fr24.js';
import {
  prepareOperatorAttestedDryRunQualityBindingFR247,
  type FR247OperatorQualityObservation,
} from './observable-morphology-operator-attested-dry-run-quality-fr247.js';

function observation(
  overrides: Partial<FR247OperatorQualityObservation> = {},
): FR247OperatorQualityObservation {
  return {
    schemaVersion: 'fr247-operator-quality-observation-v1',
    operatorRef: 'operator:fr247:o001',
    providerRunRef: 'provider:fr247:run001',
    captureTriggerTimestampMs: 1234,
    recordedAt: '2026-09-22T22:10:00.000Z',
    frontalNeutralPoseObserved: true,
    bilateralEyeContoursVisuallyResolvable: true,
    bilateralEyeRegionsFullyVisible: true,
    majorEyeRegionOcclusionAbsent: true,
    observationMadeBeforeExplicitCaptureTrigger: true,
    observationIsIndependentQualityVerification: false,
    ...overrides,
  };
}

function faceLandmarks() {
  const landmarks = Array.from({ length: 478 }, () => ({
    x: 0.5,
    y: 0.5,
    z: 0,
  }));
  for (const symbol of FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER) {
    for (const edge of FR24_EYE_TOPOLOGY_WITNESS_EDGES[symbol]) {
      landmarks[edge.start] = { x: 0.4, y: 0.4, z: 0 };
      landmarks[edge.end] = { x: 0.6, y: 0.4, z: 0 };
    }
  }
  return landmarks;
}

function factory(faceCount = 1, mutate?: (landmarks: ReturnType<typeof faceLandmarks>) => void) {
  const close = vi.fn();
  return {
    close,
    value: {
      async create() {
        return {
          detect() {
            const faces = Array.from({ length: faceCount }, () => {
              const landmarks = faceLandmarks();
              mutate?.(landmarks);
              return landmarks;
            });
            return {
              faceLandmarks: faces,
              faceBlendshapes: [],
              facialTransformationMatrixes: [],
            };
          },
          close,
        };
      },
    },
  };
}

describe('FR247 operator-attested dry-run quality operationalization', () => {
  it('combines provider mechanics with four explicit operator observations without thresholds', async () => {
    const jpeg = new Uint8Array([0xff, 0xd8, 1, 2, 0xff, 0xd9]);
    const runtime = factory();
    const binding = await prepareOperatorAttestedDryRunQualityBindingFR247({
      image: Object.freeze({ frame: true }),
      providerRunRef: 'provider:fr247:run001',
      triggerTimestampMs: 1234,
      jpegBytes: jpeg,
      operatorObservation: observation(),
      factory: runtime.value,
    });

    expect(binding.mechanics.faceCountDetectionMaxFaces).toBe(2);
    expect(binding.mechanics.exactlyOneFaceObserved).toBe(true);
    expect(binding.mechanics.bilateralEyeLandmarkCoverageObserved).toBe(true);
    expect(binding.authorityBoundary.captureQualityConstructValidated).toBe(false);
    expect(binding.authorityBoundary.numericCaptureQualityThresholdIssued).toBe(false);
    expect(binding.authorityBoundary.automaticProductQualityGateAuthorized).toBe(false);

    expect(binding.qualityEvaluator(Uint8Array.from(jpeg))).toEqual({
      schemaVersion: 'fr242-capture-quality-assessment-v1',
      singleFace: true,
      frontalPose: true,
      sharpness: true,
      bilateralEyeRegionVisibility: true,
      bilateralEyeLandmarkCoverage: true,
      majorEyeRegionOcclusionAbsent: true,
    });
    expect(runtime.close).toHaveBeenCalledTimes(1);
  });

  it('does not let operator observation override provider multi-face mechanics', async () => {
    const jpeg = new Uint8Array([0xff, 0xd8, 3, 0xff, 0xd9]);
    const runtime = factory(2);
    const binding = await prepareOperatorAttestedDryRunQualityBindingFR247({
      image: Object.freeze({ frame: true }),
      providerRunRef: 'provider:fr247:run001',
      triggerTimestampMs: 1234,
      jpegBytes: jpeg,
      operatorObservation: observation(),
      factory: runtime.value,
    });

    const assessment = binding.qualityEvaluator(Uint8Array.from(jpeg));
    expect(assessment.singleFace).toBe(false);
    expect(assessment.bilateralEyeLandmarkCoverage).toBe(false);
  });

  it('fails bilateral eye landmark coverage when a pinned FR24 eye landmark is non-finite', async () => {
    const jpeg = new Uint8Array([0xff, 0xd8, 4, 0xff, 0xd9]);
    const firstSymbol = FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER[0]!;
    const firstIndex = FR24_EYE_TOPOLOGY_WITNESS_EDGES[firstSymbol][0]!.start;
    const runtime = factory(1, (landmarks) => {
      landmarks[firstIndex] = { x: Number.NaN, y: 0.4, z: 0 };
    });
    const binding = await prepareOperatorAttestedDryRunQualityBindingFR247({
      image: Object.freeze({ frame: true }),
      providerRunRef: 'provider:fr247:run001',
      triggerTimestampMs: 1234,
      jpegBytes: jpeg,
      operatorObservation: observation(),
      factory: runtime.value,
    });

    expect(binding.qualityEvaluator(Uint8Array.from(jpeg)).bilateralEyeLandmarkCoverage)
      .toBe(false);
  });

  it('maps explicit operator failures to the four non-provider quality fields', async () => {
    const jpeg = new Uint8Array([0xff, 0xd8, 5, 0xff, 0xd9]);
    const runtime = factory();
    const binding = await prepareOperatorAttestedDryRunQualityBindingFR247({
      image: Object.freeze({ frame: true }),
      providerRunRef: 'provider:fr247:run001',
      triggerTimestampMs: 1234,
      jpegBytes: jpeg,
      operatorObservation: observation({
        frontalNeutralPoseObserved: false,
        bilateralEyeContoursVisuallyResolvable: false,
        bilateralEyeRegionsFullyVisible: false,
        majorEyeRegionOcclusionAbsent: false,
      }),
      factory: runtime.value,
    });

    expect(binding.qualityEvaluator(Uint8Array.from(jpeg))).toEqual({
      schemaVersion: 'fr242-capture-quality-assessment-v1',
      singleFace: true,
      frontalPose: false,
      sharpness: false,
      bilateralEyeRegionVisibility: false,
      bilateralEyeLandmarkCoverage: true,
      majorEyeRegionOcclusionAbsent: false,
    });
  });

  it('fails closed on observation/frame binding or exact JPEG mismatch', async () => {
    const jpeg = new Uint8Array([0xff, 0xd8, 6, 0xff, 0xd9]);
    const runtime = factory();
    await expect(prepareOperatorAttestedDryRunQualityBindingFR247({
      image: Object.freeze({ frame: true }),
      providerRunRef: 'provider:fr247:run001',
      triggerTimestampMs: 1234,
      jpegBytes: jpeg,
      operatorObservation: observation({ captureTriggerTimestampMs: 999 }),
      factory: runtime.value,
    })).rejects.toThrow(/frame binding mismatch/u);

    const secondRuntime = factory();
    const binding = await prepareOperatorAttestedDryRunQualityBindingFR247({
      image: Object.freeze({ frame: true }),
      providerRunRef: 'provider:fr247:run001',
      triggerTimestampMs: 1234,
      jpegBytes: jpeg,
      operatorObservation: observation(),
      factory: secondRuntime.value,
    });
    expect(() => binding.qualityEvaluator(
      new Uint8Array([0xff, 0xd8, 9, 0xff, 0xd9]),
    )).toThrow(/do not match the exact FR244 JPEG/u);
    binding.dispose();
  });
});
