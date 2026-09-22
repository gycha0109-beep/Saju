import { describe, expect, it } from 'vitest';
import {
  openMesh6HBrowserCamera,
  type Mesh6HBrowserEnvironmentV1,
  type Mesh6HVideoElementLikeV1,
} from './mesh6h-browser-camera-frame-source.js';
import type {
  FR243OperatorExecutionAttestation,
} from './observable-morphology-governed-dry-run-execution-recorder-fr243.js';
import type {
  FR244CaptureQualityBindingPreparer,
  FR244PrimaryMetricBindingPreparer,
} from './observable-morphology-browser-live-camera-jpeg-bridge-fr244.js';
import type {
  FR247OperatorQualityObservation,
} from './observable-morphology-operator-attested-dry-run-quality-fr247.js';
import {
  FR250_CONTRACT_VERSION,
  materializeLocalhostOnePersonDryRunOperatorRuntimeFR250,
  type FR250ConsentConfirmations,
} from './observable-morphology-localhost-dry-run-operator-surface-fr250.js';

const consent: FR250ConsentConfirmations = Object.freeze({
  studyNoticeRead: true,
  voluntaryParticipationConfirmed: true,
  liveCameraCaptureConsent: true,
  transientRawCaptureProcessingConsent: true,
  sanitizedReviewImageRetentionConsent: true,
  pseudonymousMetricStorageConsent: true,
  noTrainingReuseAcknowledged: true,
  noProductionReuseAcknowledged: true,
  noBiometricIdentityMatchingAcknowledged: true,
  withdrawalProcedureAcknowledged: true,
});

async function camera() {
  const video: Mesh6HVideoElementLikeV1 = {
    srcObject: null,
    videoWidth: 640,
    videoHeight: 480,
    readyState: 2,
    async play() {},
    pause() {},
  };
  const environment: Mesh6HBrowserEnvironmentV1 = {
    async getUserMedia() {
      return { getTracks: () => [{ stop() {} }] };
    },
    async createImageBitmap() {
      return { close() {} };
    },
  };
  return openMesh6HBrowserCamera({ video }, environment);
}

const qualityBindingPreparer: FR244CaptureQualityBindingPreparer = Object.freeze({
  async prepare(input) {
    const context = input.providerContext as {
      operatorObservation: FR247OperatorQualityObservation;
    };
    return Object.freeze({
      governedDryRunQualityBinding: true as const,
      rawImageDigestComputed: false as const,
      rawImageDigestPersisted: false as const,
      qualityEvaluator() {
        const o = context.operatorObservation;
        return Object.freeze({
          schemaVersion: 'fr242-capture-quality-assessment-v1' as const,
          singleFace: true,
          frontalPose: o.frontalNeutralPoseObserved,
          sharpness: o.bilateralEyeContoursVisuallyResolvable,
          bilateralEyeRegionVisibility: o.bilateralEyeRegionsFullyVisible,
          bilateralEyeLandmarkCoverage: true,
          majorEyeRegionOcclusionAbsent: o.majorEyeRegionOcclusionAbsent,
        });
      },
      dispose() {},
    });
  },
});

const primaryMetricBindingPreparer: FR244PrimaryMetricBindingPreparer = Object.freeze({
  async prepare(input) {
    return Object.freeze({
      providerBackedPrimaryMetricBinding: true as const,
      rawImageDigestComputed: false as const,
      rawImageDigestPersisted: false as const,
      primaryMetricExtractor() {
        return Object.freeze({
          metricRef: 'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0' as const,
          unit: 'degree' as const,
          value: input.providerRunRef.endsWith(':2') ? 2 : 1,
        });
      },
      dispose() {},
    });
  },
});

function attestation(recordedAt: string): FR243OperatorExecutionAttestation {
  return Object.freeze({
    schemaVersion: 'fr243-operator-execution-attestation-v1' as const,
    operatorRef: 'operator:fr240:fr250-test',
    recordedAt,
    participantPresentObserved: true as const,
    liveCameraCaptureObserved: true as const,
    consentReconfirmedImmediatelyBeforeCapture: true as const,
    challengePresentedBeforeCapture: true as const,
  });
}

function qualityObservation(
  providerRunRef: string,
  timestampMs: number,
  recordedAt: string,
): FR247OperatorQualityObservation {
  return Object.freeze({
    schemaVersion: 'fr247-operator-quality-observation-v1' as const,
    operatorRef: 'operator:fr240:fr250-test',
    providerRunRef,
    captureTriggerTimestampMs: timestampMs,
    recordedAt,
    frontalNeutralPoseObserved: true,
    bilateralEyeContoursVisuallyResolvable: true,
    bilateralEyeRegionsFullyVisible: true,
    majorEyeRegionOcclusionAbsent: true,
    observationMadeBeforeExplicitCaptureTrigger: true as const,
    observationIsIndependentQualityVerification: false as const,
  });
}

describe('FR250 localhost one-person dry-run operator runtime', () => {
  it('materializes the exact browser-portable authority chain without widening persistence or authority', async () => {
    const cam = await camera();
    const runtime = materializeLocalhostOnePersonDryRunOperatorRuntimeFR250({
      camera: cam,
      participantRef: 'participant:fr240:fr250-test',
      operatorRef: 'operator:fr240:fr250-test',
      consentRecordedAt: '2026-09-22T23:40:00.000Z',
      consent,
      geometryMetadataPbtxt: 'synthetic-mechanics-only',
      parity: {} as never,
      qualityBindingPreparer,
      primaryMetricBindingPreparer,
      jpegEncoder: {
        async encodeJpeg() {
          return new Uint8Array([0xff, 0xd8, 1, 0xff, 0xd9]);
        },
      },
    });

    expect(runtime.contractVersion).toBe(FR250_CONTRACT_VERSION);
    expect(runtime.participantRef).toBe('participant:fr240:fr250-test');
    expect(runtime.operatorRef).toBe('operator:fr240:fr250-test');
    expect(Object.values(runtime.persistence).every((value) => value === false)).toBe(true);
    expect(runtime.authorityBoundary.actualParticipantActionRequired).toBe(true);
    expect(runtime.authorityBoundary.actualLiveCameraInputRequired).toBe(true);
    expect(runtime.authorityBoundary.empiricalRepeatabilityEstablished).toBe(false);
    expect(runtime.coordinator.getSanitizedRecords()).toHaveLength(0);
    cam.close();
  });

  it('executes only the explicit two-session x two-capture mechanics path and returns four sanitized slots', async () => {
    const cam = await camera();
    const runtime = materializeLocalhostOnePersonDryRunOperatorRuntimeFR250({
      camera: cam,
      participantRef: 'participant:fr240:fr250-test',
      operatorRef: 'operator:fr240:fr250-test',
      consentRecordedAt: '2026-09-22T23:40:00.000Z',
      consent,
      geometryMetadataPbtxt: 'synthetic-mechanics-only',
      parity: {} as never,
      qualityBindingPreparer,
      primaryMetricBindingPreparer,
      jpegEncoder: {
        async encodeJpeg() {
          return new Uint8Array([0xff, 0xd8, 2, 0xff, 0xd9]);
        },
      },
    });

    for (const sessionOrdinal of [1, 2] as const) {
      runtime.coordinator.beginSession({
        sessionOrdinal,
        issuedAt:
          sessionOrdinal === 1
            ? '2026-09-22T23:41:00.000Z'
            : '2026-09-22T23:50:00.000Z',
      });
      for (const captureOrdinal of [1, 2] as const) {
        const timestampMs = sessionOrdinal * 1000 + captureOrdinal;
        const providerRunRef =
          'provider:fr250:s' + sessionOrdinal + ':' + captureOrdinal;
        const baseMinute = sessionOrdinal === 1 ? 41 : 50;
        const second = captureOrdinal * 10;
        const challengeIssuedAt =
          '2026-09-22T23:' + String(baseMinute).padStart(2, '0') + ':'
          + String(second).padStart(2, '0') + '.000Z';
        const recordedAt =
          '2026-09-22T23:' + String(baseMinute).padStart(2, '0') + ':'
          + String(second + 1).padStart(2, '0') + '.000Z';

        await runtime.coordinator.capture({
          challengeIssuedAt,
          trigger: { timestampMs, providerRunRef },
          operatorExecutionAttestation: attestation(recordedAt),
          operatorQualityObservation: qualityObservation(
            providerRunRef,
            timestampMs,
            challengeIssuedAt,
          ),
        });
      }
    }

    const review = runtime.coordinator.review();
    expect(review.requiredSlotCount).toBe(4);
    expect(review.recordedSlotCount).toBe(4);
    expect(review.acceptedCaptureCount).toBe(4);
    expect(review.rejectedCaptureCount).toBe(0);
    expect(review.empiricalEvidenceEligible).toBe(false);
    expect(runtime.coordinator.getSanitizedRecords()).toHaveLength(4);
    cam.close();
  });

  it('fails closed when explicit consent confirmations drift', async () => {
    const cam = await camera();
    expect(() => materializeLocalhostOnePersonDryRunOperatorRuntimeFR250({
      camera: cam,
      participantRef: 'participant:fr240:fr250-test',
      operatorRef: 'operator:fr240:fr250-test',
      consentRecordedAt: '2026-09-22T23:40:00.000Z',
      consent: {
        ...consent,
        liveCameraCaptureConsent: false,
      } as never,
      geometryMetadataPbtxt: 'synthetic-mechanics-only',
      parity: {} as never,
      qualityBindingPreparer,
      primaryMetricBindingPreparer,
    })).toThrow(/every FR240 consent confirmation/u);
    cam.close();
  });
});
