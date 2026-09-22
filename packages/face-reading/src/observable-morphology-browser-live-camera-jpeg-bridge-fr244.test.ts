import { describe, expect, it, vi } from 'vitest';
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
  issueLiveCaptureChallengeFR241,
  issueOnePersonDryRunSessionFR241,
  materializeOnePersonDryRunRuntimeFR241,
} from './observable-morphology-one-person-dry-run-runtime-fr241.js';
import {
  materializeEphemeralLiveCameraFrameIntakeRuntimeFR242,
  type FR242CaptureQualityAssessment,
} from './observable-morphology-ephemeral-live-camera-frame-intake-fr242.js';
import {
  materializeGovernedDryRunExecutionRuntimeFR243,
  type FR243OperatorExecutionAttestation,
} from './observable-morphology-governed-dry-run-execution-recorder-fr243.js';
import {
  assertGovernedBrowserCaptureResultFR244,
  executeGovernedBrowserLiveCameraCaptureFR244,
  getGovernedBrowserLiveCameraJpegBridgeContractFR244,
} from './observable-morphology-browser-live-camera-jpeg-bridge-fr244.js';

function setupDryRun() {
  const fr238 = materializeResearchLiveCaptureRuntimeFR238(
    preregisterObservableMorphologyRepeatabilityStudyFR237(),
  );
  const fr239 = issuePrecollectionRetentionPrivacyPolicyFR239(fr238);
  const protocol = issueParticipantConsentProtocolFR240({ runtime: fr238, policy: fr239 });
  const receipt = recordParticipantConsentFR240(protocol, {
    participantRef: 'participant:fr240:p001',
    operatorRef: 'operator:fr240:o001',
    consentRecordedAt: '2026-09-22T03:20:00.000Z',
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
  const admission = issueOnePersonDryRunAdmissionFR240({
    protocol,
    consentReceipt: receipt,
  });
  const fr241 = materializeOnePersonDryRunRuntimeFR241({
    runtime: fr238,
    protocol,
    admission,
  });
  const session = issueOnePersonDryRunSessionFR241(fr241, admission, {
    sessionOrdinal: 1,
    issuedAt: '2026-09-22T03:21:00.000Z',
  });
  const challenge = issueLiveCaptureChallengeFR241(fr241, session, {
    captureOrdinal: 1,
    issuedAt: '2026-09-22T03:22:00.000Z',
  });
  const fr242 = materializeEphemeralLiveCameraFrameIntakeRuntimeFR242({
    runtime: fr241,
    policy: fr239,
  });
  const fr243 = materializeGovernedDryRunExecutionRuntimeFR243({
    runtime: fr241,
    frameIntakeRuntime: fr242,
  });
  return { fr242, fr243, session, challenge };
}

function makeCameraFixture() {
  const counters = {
    getUserMedia: 0,
    bitmapClose: 0,
    trackStop: 0,
    pause: 0,
  };
  const stream = {
    getTracks() {
      return [{
        stop() {
          counters.trackStop += 1;
        },
      }];
    },
  };
  const video: Mesh6HVideoElementLikeV1 = {
    srcObject: null,
    videoWidth: 640,
    videoHeight: 480,
    readyState: 2,
    async play() {},
    pause() {
      counters.pause += 1;
    },
  };
  const environment: Mesh6HBrowserEnvironmentV1 = {
    async getUserMedia() {
      counters.getUserMedia += 1;
      return stream;
    },
    async createImageBitmap() {
      return {
        close() {
          counters.bitmapClose += 1;
        },
      };
    },
  };
  return { counters, video, environment };
}

const passQuality = (): FR242CaptureQualityAssessment => ({
  schemaVersion: 'fr242-capture-quality-assessment-v1',
  singleFace: true,
  frontalPose: true,
  sharpness: true,
  bilateralEyeRegionVisibility: true,
  bilateralEyeLandmarkCoverage: true,
  majorEyeRegionOcclusionAbsent: true,
});

function attestation(): FR243OperatorExecutionAttestation {
  return {
    schemaVersion: 'fr243-operator-execution-attestation-v1',
    operatorRef: 'operator:fr240:o001',
    recordedAt: '2026-09-22T03:22:30.000Z',
    participantPresentObserved: true,
    liveCameraCaptureObserved: true,
    consentReconfirmedImmediatelyBeforeCapture: true,
    challengePresentedBeforeCapture: true,
  };
}

describe('FR244 governed browser live-camera JPEG bridge', () => {
  it('bridges one issued MESH6H frame into FR243 and zeroizes source JPEG bytes', async () => {
    const s = setupDryRun();
    const cameraFixture = makeCameraFixture();
    const camera = await openMesh6HBrowserCamera(
      { video: cameraFixture.video },
      cameraFixture.environment,
    );
    const jpeg = new Uint8Array([0xff, 0xd8, 0x11, 0x22, 0xff, 0xd9]);
    const encoder = {
      encodeJpeg: vi.fn(async () => jpeg),
    };

    const result = await executeGovernedBrowserLiveCameraCaptureFR244({
      camera,
      trigger: { timestampMs: 1000, providerRunRef: 'provider:fr244:001' },
      runtime: s.fr243,
      frameIntakeRuntime: s.fr242,
      session: s.session,
      challenge: s.challenge,
      qualityEvaluator: passQuality,
      primaryMetricExtractor: () => ({
        metricRef: 'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0',
        unit: 'degree',
        value: 1.5,
      }),
      operatorAttestation: attestation(),
      jpegEncoder: encoder,
    });

    expect(cameraFixture.counters.getUserMedia).toBe(1);
    expect(encoder.encodeJpeg).toHaveBeenCalledTimes(1);
    expect(result.frame).toEqual({
      timestampMs: 1000,
      providerRunRef: 'provider:fr244:001',
      width: 640,
      height: 480,
    });
    expect(result.transport.observedByteLength).toBe(6);
    expect(result.transport.sourceJpegZeroizedAfterFR243).toBe(true);
    expect(result.transport.cameraClosedByFR244).toBe(false);
    expect(result.fr243Record.resultStatus).toBe('accepted_for_dry_run_mechanics_only');
    expect(result.fr243Record.primaryMetric?.value).toBe(1.5);
    expect(result.fr243Record.empiricalEvidenceEligible).toBe(false);
    expect(result.authorityBoundary.empiricalRepeatabilityEstablished).toBe(false);
    expect(Array.from(jpeg)).toEqual([0, 0, 0, 0, 0, 0]);
    expect(cameraFixture.counters.bitmapClose).toBe(1);
    expect(cameraFixture.counters.trackStop).toBe(0);
    expect(cameraFixture.counters.pause).toBe(0);
    expect('mediaBytes' in result).toBe(false);
    expect(() => assertGovernedBrowserCaptureResultFR244(result)).not.toThrow();

    camera.close();
    expect(cameraFixture.counters.trackStop).toBe(1);
    expect(cameraFixture.counters.pause).toBe(1);
  });

  it('rejects malformed encoder output before FR243 evaluators and still zeroizes it', async () => {
    const s = setupDryRun();
    const cameraFixture = makeCameraFixture();
    const camera = await openMesh6HBrowserCamera(
      { video: cameraFixture.video },
      cameraFixture.environment,
    );
    const malformed = new Uint8Array([1, 2, 3, 4]);
    const quality = vi.fn(passQuality);
    const metric = vi.fn(() => ({
      metricRef: 'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0' as const,
      unit: 'degree' as const,
      value: 0,
    }));

    await expect(executeGovernedBrowserLiveCameraCaptureFR244({
      camera,
      trigger: { timestampMs: 2000, providerRunRef: 'provider:fr244:bad-jpeg' },
      runtime: s.fr243,
      frameIntakeRuntime: s.fr242,
      session: s.session,
      challenge: s.challenge,
      qualityEvaluator: quality,
      primaryMetricExtractor: metric,
      operatorAttestation: attestation(),
      jpegEncoder: {
        async encodeJpeg() {
          return malformed;
        },
      },
    })).rejects.toThrow(/JPEG SOI\/EOI/u);

    expect(quality).not.toHaveBeenCalled();
    expect(metric).not.toHaveBeenCalled();
    expect(Array.from(malformed)).toEqual([0, 0, 0, 0]);
    expect(cameraFixture.counters.bitmapClose).toBe(1);
    expect(cameraFixture.counters.trackStop).toBe(0);
    camera.close();
  });

  it('rejects a copied camera handle before any JPEG encoding', async () => {
    const s = setupDryRun();
    const cameraFixture = makeCameraFixture();
    const camera = await openMesh6HBrowserCamera(
      { video: cameraFixture.video },
      cameraFixture.environment,
    );
    const encoder = { encodeJpeg: vi.fn(async () => new Uint8Array([0xff, 0xd8, 0xff, 0xd9])) };

    await expect(executeGovernedBrowserLiveCameraCaptureFR244({
      camera: { ...camera },
      trigger: { timestampMs: 3000, providerRunRef: 'provider:fr244:forged' },
      runtime: s.fr243,
      frameIntakeRuntime: s.fr242,
      session: s.session,
      challenge: s.challenge,
      qualityEvaluator: passQuality,
      primaryMetricExtractor: () => ({
        metricRef: 'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0',
        unit: 'degree',
        value: 0,
      }),
      operatorAttestation: attestation(),
      jpegEncoder: encoder,
    })).rejects.toThrow(/not issued by the active MESH6H boundary/u);

    expect(encoder.encodeJpeg).not.toHaveBeenCalled();
    camera.close();
  });

  it('keeps synthetic browser mechanics separate from empirical authority', () => {
    const contract = getGovernedBrowserLiveCameraJpegBridgeContractFR244();

    expect(contract.predecessor.activeIssuedMesh6HHandleRequired).toBe(true);
    expect(contract.execution.framesConsumedPerInvocation).toBe(1);
    expect(contract.execution.galleryUploadFallbackAllowed).toBe(false);
    expect(contract.execution.sourceJpegZeroizedAfterFR243).toBe(true);
    expect(contract.persistence.rawJpegBytesPersisted).toBe(false);
    expect(contract.persistence.rawImageDigestComputed).toBe(false);
    expect(contract.authorityBoundary.independentFreshnessProofIssued).toBe(false);
    expect(contract.authorityBoundary.captureQualityValidated).toBe(false);
    expect(contract.authorityBoundary.primaryMetricValidated).toBe(false);
    expect(contract.authorityBoundary.empiricalRepeatabilityEstablished).toBe(false);
    expect(contract.authorityBoundary.productionActivated).toBe(false);
  });

  it('prepares and disposes an async provider-backed primary metric binding on the exact frame/JPEG pair', async () => {
    const s = setupDryRun();
    const cameraFixture = makeCameraFixture();
    const camera = await openMesh6HBrowserCamera(
      { video: cameraFixture.video },
      cameraFixture.environment,
    );
    const jpeg = new Uint8Array([0xff, 0xd8, 0x33, 0x44, 0xff, 0xd9]);
    const dispose = vi.fn();
    const prepare = vi.fn(async (input: {
      readonly image: unknown;
      readonly width: number;
      readonly height: number;
      readonly providerRunRef: string;
      readonly jpegBytes: Uint8Array;
    }) => ({
      providerBackedPrimaryMetricBinding: true as const,
      rawImageDigestComputed: false as const,
      rawImageDigestPersisted: false as const,
      primaryMetricExtractor(ephemeralBytes: Uint8Array) {
        expect(Array.from(ephemeralBytes)).toEqual(Array.from(input.jpegBytes));
        return {
          metricRef: 'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0' as const,
          unit: 'degree' as const,
          value: 2.25,
        };
      },
      dispose,
    }));

    const result = await executeGovernedBrowserLiveCameraCaptureFR244({
      camera,
      trigger: { timestampMs: 4000, providerRunRef: 'provider:fr244:prepared' },
      runtime: s.fr243,
      frameIntakeRuntime: s.fr242,
      session: s.session,
      challenge: s.challenge,
      qualityEvaluator: passQuality,
      primaryMetricBindingPreparer: { prepare },
      operatorAttestation: attestation(),
      jpegEncoder: {
        async encodeJpeg() {
          return jpeg;
        },
      },
    });

    expect(prepare).toHaveBeenCalledTimes(1);
    const preparedInput = prepare.mock.calls[0]![0];
    expect(preparedInput.width).toBe(640);
    expect(preparedInput.height).toBe(480);
    expect(preparedInput.providerRunRef).toBe('provider:fr244:prepared');
    expect(result.fr243Record.primaryMetric?.value).toBe(2.25);
    expect(dispose).toHaveBeenCalledTimes(1);
    expect(Array.from(jpeg)).toEqual([0, 0, 0, 0, 0, 0]);
    expect(cameraFixture.counters.bitmapClose).toBe(1);
    camera.close();
  });


  it('prepares and disposes an async governed capture-quality binding on the exact frame/JPEG pair', async () => {
    const s = setupDryRun();
    const cameraFixture = makeCameraFixture();
    const camera = await openMesh6HBrowserCamera(
      { video: cameraFixture.video },
      cameraFixture.environment,
    );
    const jpeg = new Uint8Array([0xff, 0xd8, 0x55, 0x66, 0xff, 0xd9]);
    const dispose = vi.fn();
    const prepare = vi.fn(async (input: {
      readonly image: unknown;
      readonly width: number;
      readonly height: number;
      readonly timestampMs: number;
      readonly triggerTimestampMs: number;
      readonly providerRunRef: string;
      readonly jpegBytes: Uint8Array;
    }) => ({
      governedDryRunQualityBinding: true as const,
      rawImageDigestComputed: false as const,
      rawImageDigestPersisted: false as const,
      qualityEvaluator(ephemeralBytes: Uint8Array) {
        expect(Array.from(ephemeralBytes)).toEqual(Array.from(input.jpegBytes));
        return passQuality();
      },
      dispose,
    }));

    const result = await executeGovernedBrowserLiveCameraCaptureFR244({
      camera,
      trigger: { timestampMs: 5000, providerRunRef: 'provider:fr244:quality' },
      runtime: s.fr243,
      frameIntakeRuntime: s.fr242,
      session: s.session,
      challenge: s.challenge,
      qualityBindingPreparer: { prepare },
      primaryMetricExtractor: () => ({
        metricRef: 'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0',
        unit: 'degree',
        value: 3.5,
      }),
      operatorAttestation: attestation(),
      jpegEncoder: {
        async encodeJpeg() {
          return jpeg;
        },
      },
    });

    expect(prepare).toHaveBeenCalledTimes(1);
    const preparedInput = prepare.mock.calls[0]![0];
    expect(preparedInput.timestampMs).toBe(5000);
    expect(preparedInput.triggerTimestampMs).toBe(5000);
    expect(preparedInput.providerRunRef).toBe('provider:fr244:quality');
    expect(result.fr243Record.resultStatus).toBe('accepted_for_dry_run_mechanics_only');
    expect(result.fr243Record.primaryMetric?.value).toBe(3.5);
    expect(dispose).toHaveBeenCalledTimes(1);
    expect(Array.from(jpeg)).toEqual([0, 0, 0, 0, 0, 0]);
    camera.close();
  });

  it('requires exactly one direct or prepared capture-quality source', async () => {
    const s = setupDryRun();
    const cameraFixture = makeCameraFixture();
    const camera = await openMesh6HBrowserCamera(
      { video: cameraFixture.video },
      cameraFixture.environment,
    );

    await expect(executeGovernedBrowserLiveCameraCaptureFR244({
      camera,
      trigger: { timestampMs: 6000, providerRunRef: 'provider:fr244:quality-conflict' },
      runtime: s.fr243,
      frameIntakeRuntime: s.fr242,
      session: s.session,
      challenge: s.challenge,
      qualityEvaluator: passQuality,
      qualityBindingPreparer: {
        async prepare() {
          throw new Error('must not execute');
        },
      },
      primaryMetricExtractor: () => ({
        metricRef: 'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0',
        unit: 'degree',
        value: 0,
      }),
      operatorAttestation: attestation(),
      jpegEncoder: {
        async encodeJpeg() {
          return new Uint8Array([0xff, 0xd8, 0xff, 0xd9]);
        },
      },
    })).rejects.toThrow(/exactly one capture-quality source/u);

    camera.close();
  });

});
