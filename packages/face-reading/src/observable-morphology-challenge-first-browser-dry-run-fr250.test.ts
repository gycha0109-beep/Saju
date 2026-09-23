import { describe, expect, it } from 'vitest';
import {
  openMesh6HBrowserCamera,
  type Mesh6HBrowserEnvironmentV1,
  type Mesh6HVideoElementLikeV1,
} from './mesh6h-browser-camera-frame-source.js';
import { preregisterObservableMorphologyRepeatabilityStudyFR237 } from './observable-morphology-repeatability-study-preregistration-fr237.js';
import { materializeResearchLiveCaptureRuntimeFR238 } from './observable-morphology-research-live-capture-session-runtime-fr238.js';
import { issuePrecollectionRetentionPrivacyPolicyFR239 } from './observable-morphology-repeatability-retention-privacy-policy-fr239.js';
import {
  issueOnePersonDryRunAdmissionFR240,
  issueParticipantConsentProtocolFR240,
  recordParticipantConsentFR240,
} from './observable-morphology-participant-consent-dry-run-admission-fr240.js';
import {
  materializeOnePersonDryRunRuntimeFR241,
} from './observable-morphology-one-person-dry-run-runtime-fr241.js';
import {
  materializeEphemeralLiveCameraFrameIntakeRuntimeFR242,
} from './observable-morphology-ephemeral-live-camera-frame-intake-fr242.js';
import {
  materializeGovernedDryRunExecutionRuntimeFR243,
  type FR243OperatorExecutionAttestation,
} from './observable-morphology-governed-dry-run-execution-recorder-fr243.js';
import type {
  FR244CaptureQualityBindingPreparer,
  FR244PrimaryMetricBindingPreparer,
} from './observable-morphology-browser-live-camera-jpeg-bridge-fr244.js';
import type {
  FR247OperatorQualityObservation,
} from './observable-morphology-operator-attested-dry-run-quality-fr247.js';
import {
  materializeChallengeFirstBrowserDryRunCoordinatorFR250,
} from './observable-morphology-challenge-first-browser-dry-run-fr250.js';

function setup() {
  const fr238 = materializeResearchLiveCaptureRuntimeFR238(
    preregisterObservableMorphologyRepeatabilityStudyFR237(),
  );
  const fr239 = issuePrecollectionRetentionPrivacyPolicyFR239(fr238);
  const protocol = issueParticipantConsentProtocolFR240({ runtime: fr238, policy: fr239 });
  const receipt = recordParticipantConsentFR240(protocol, {
    participantRef: 'participant:fr240:p001',
    operatorRef: 'operator:fr240:o001',
    consentRecordedAt: '2026-09-22T22:20:00.000Z',
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
  const admission = issueOnePersonDryRunAdmissionFR240({ protocol, consentReceipt: receipt });
  const fr241 = materializeOnePersonDryRunRuntimeFR241({ runtime: fr238, protocol, admission });
  const fr242 = materializeEphemeralLiveCameraFrameIntakeRuntimeFR242({
    runtime: fr241,
    policy: fr239,
  });
  const fr243 = materializeGovernedDryRunExecutionRuntimeFR243({
    runtime: fr241,
    frameIntakeRuntime: fr242,
  });
  return { admission, fr241, fr242, fr243 };
}

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

const qualityPreparer: FR244CaptureQualityBindingPreparer = {
  async prepare(input) {
    const context = input.providerContext as {
      operatorObservation: FR247OperatorQualityObservation;
    };
    return {
      governedDryRunQualityBinding: true,
      rawImageDigestComputed: false,
      rawImageDigestPersisted: false,
      qualityEvaluator() {
        const o = context.operatorObservation;
        return {
          schemaVersion: 'fr242-capture-quality-assessment-v1',
          singleFace: true,
          frontalPose: o.frontalNeutralPoseObserved,
          sharpness: o.bilateralEyeContoursVisuallyResolvable,
          bilateralEyeRegionVisibility: o.bilateralEyeRegionsFullyVisible,
          bilateralEyeLandmarkCoverage: true,
          majorEyeRegionOcclusionAbsent: o.majorEyeRegionOcclusionAbsent,
        };
      },
      dispose() {},
    };
  },
};

const metricPreparer: FR244PrimaryMetricBindingPreparer = {
  async prepare(input) {
    return {
      providerBackedPrimaryMetricBinding: true,
      rawImageDigestComputed: false,
      rawImageDigestPersisted: false,
      primaryMetricExtractor() {
        return {
          metricRef: 'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0',
          unit: 'degree',
          value: input.providerRunRef.endsWith('2') ? 2 : 1,
        };
      },
      dispose() {},
    };
  },
};

function attestation(recordedAt: string): FR243OperatorExecutionAttestation {
  return {
    schemaVersion: 'fr243-operator-execution-attestation-v1',
    operatorRef: 'operator:fr240:o001',
    recordedAt,
    participantPresentObserved: true,
    liveCameraCaptureObserved: true,
    consentReconfirmedImmediatelyBeforeCapture: true,
    challengePresentedBeforeCapture: true,
  };
}

function observation(
  providerRunRef: string,
  timestampMs: number,
): FR247OperatorQualityObservation {
  return {
    schemaVersion: 'fr247-operator-quality-observation-v1',
    operatorRef: 'operator:fr240:o001',
    providerRunRef,
    captureTriggerTimestampMs: timestampMs,
    recordedAt: '2026-09-22T22:21:05.000Z',
    frontalNeutralPoseObserved: true,
    bilateralEyeContoursVisuallyResolvable: true,
    bilateralEyeRegionsFullyVisible: true,
    majorEyeRegionOcclusionAbsent: true,
    observationMadeBeforeExplicitCaptureTrigger: true,
    observationIsIndependentQualityVerification: false,
  };
}

async function coordinator() {
  const s = setup();
  const cam = await camera();
  const value = materializeChallengeFirstBrowserDryRunCoordinatorFR250({
    camera: cam,
    runtime: s.fr241,
    frameIntakeRuntime: s.fr242,
    executionRuntime: s.fr243,
    admission: s.admission,
    geometryMetadataPbtxt: 'synthetic-mechanics-only',
    parity: {} as never,
    qualityBindingPreparer: qualityPreparer,
    primaryMetricBindingPreparer: metricPreparer,
    jpegEncoder: {
      async encodeJpeg() {
        return new Uint8Array([0xff, 0xd8, 1, 2, 0xff, 0xd9]);
      },
    },
  });
  return { value, cam };
}

describe('FR250 challenge-first browser dry-run coordinator', () => {
  it('issues a presentable challenge before the trigger and completes the exact 2 x 2 review', async () => {
    const { value, cam } = await coordinator();
    value.beginSession({ sessionOrdinal: 1, issuedAt: '2026-09-22T22:21:00.000Z' });

    for (const captureOrdinal of [1, 2] as const) {
      const issuedAt = captureOrdinal === 1
        ? '2026-09-22T22:21:01.000Z'
        : '2026-09-22T22:21:11.000Z';
      const prepared = value.prepareCapture({ challengeIssuedAt: issuedAt });
      expect(prepared.challenge.captureOrdinal).toBe(captureOrdinal);
      expect(prepared.challenge.captureChallengeRef).toMatch(/^challenge\.fr241\.live_camera:/u);
      expect(prepared.challengeMustBePresentedBeforeTrigger).toBe(true);

      const timestampMs = 1000 + captureOrdinal;
      const providerRunRef = 'provider:fr250:s1:' + captureOrdinal;
      await value.capturePrepared({
        preparedSlot: prepared,
        trigger: { timestampMs, providerRunRef },
        operatorExecutionAttestation: attestation(
          captureOrdinal === 1
            ? '2026-09-22T22:21:02.000Z'
            : '2026-09-22T22:21:12.000Z',
        ),
        operatorQualityObservation: observation(providerRunRef, timestampMs),
      });
    }

    value.beginSession({ sessionOrdinal: 2, issuedAt: '2026-09-22T22:30:00.000Z' });
    for (const captureOrdinal of [1, 2] as const) {
      const issuedAt = captureOrdinal === 1
        ? '2026-09-22T22:30:01.000Z'
        : '2026-09-22T22:30:11.000Z';
      const prepared = value.prepareCapture({ challengeIssuedAt: issuedAt });
      const timestampMs = 2000 + captureOrdinal;
      const providerRunRef = 'provider:fr250:s2:' + captureOrdinal;
      await value.capturePrepared({
        preparedSlot: prepared,
        trigger: { timestampMs, providerRunRef },
        operatorExecutionAttestation: attestation(
          captureOrdinal === 1
            ? '2026-09-22T22:30:02.000Z'
            : '2026-09-22T22:30:12.000Z',
        ),
        operatorQualityObservation: observation(providerRunRef, timestampMs),
      });
    }

    const review = value.review();
    expect(review.recordedSlotCount).toBe(4);
    expect(review.acceptedCaptureCount).toBe(4);
    expect(value.getSanitizedRecords()).toHaveLength(4);
    expect(value.authorityBoundary.challengeIssuedBeforeTriggerByApiShape).toBe(true);
    expect(value.authorityBoundary.challengePresentationStillOperatorAttested).toBe(true);
    cam.close();
  });

  it('fails closed when a prepared slot is duplicated, skipped, or replaced', async () => {
    const { value, cam } = await coordinator();
    value.beginSession({ sessionOrdinal: 1, issuedAt: '2026-09-22T22:40:00.000Z' });
    const prepared = value.prepareCapture({
      challengeIssuedAt: '2026-09-22T22:40:01.000Z',
    });
    expect(() => value.prepareCapture({
      challengeIssuedAt: '2026-09-22T22:40:02.000Z',
    })).toThrow(/only one prepared capture/u);
    expect(() => value.beginSession({
      sessionOrdinal: 2,
      issuedAt: '2026-09-22T22:41:00.000Z',
    })).toThrow(/pending prepared capture/u);

    const timestampMs = 3001;
    const providerRunRef = 'provider:fr250:single:1';
    await value.capturePrepared({
      preparedSlot: prepared,
      trigger: { timestampMs, providerRunRef },
      operatorExecutionAttestation: attestation('2026-09-22T22:40:03.000Z'),
      operatorQualityObservation: observation(providerRunRef, timestampMs),
    });
    await expect(value.capturePrepared({
      preparedSlot: prepared,
      trigger: { timestampMs: 3002, providerRunRef: 'provider:fr250:single:2' },
      operatorExecutionAttestation: attestation('2026-09-22T22:40:04.000Z'),
      operatorQualityObservation: observation('provider:fr250:single:2', 3002),
    })).rejects.toThrow(/prepareCapture\(\) is required/u);
    cam.close();
  });
});
