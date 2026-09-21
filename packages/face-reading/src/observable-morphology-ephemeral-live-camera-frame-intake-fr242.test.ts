import { describe, expect, it, vi } from 'vitest';
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
  assertEphemeralLiveCameraFrameIntakeRuntimeFR242,
  materializeEphemeralLiveCameraFrameIntakeRuntimeFR242,
  processEphemeralLiveCameraFrameFR242,
  type FR242CaptureQualityAssessment,
} from './observable-morphology-ephemeral-live-camera-frame-intake-fr242.js';

function setup() {
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
  return { fr239, fr241, challenge, fr242 };
}

const jpegBytes = () => new Uint8Array([0xff, 0xd8, 0x11, 0x22, 0xff, 0xd9]);

const passQuality = (): FR242CaptureQualityAssessment => ({
  schemaVersion: 'fr242-capture-quality-assessment-v1',
  singleFace: true,
  frontalPose: true,
  sharpness: true,
  bilateralEyeRegionVisibility: true,
  bilateralEyeLandmarkCoverage: true,
  majorEyeRegionOcclusionAbsent: true,
});

describe('FR242 ephemeral live-camera frame intake', () => {
  it('binds exact FR241/FR239 predecessors without inheriting FR173 witness authority', () => {
    const { fr239, fr241, fr242 } = setup();

    expect(fr242.sourceFR241.runtimeRef).toBe(fr241.runtimeRef);
    expect(fr242.sourceFR239.policyRef).toBe(fr239.policyRef);
    expect(fr242.intakeContract.maximumMediaMiB).toBe(32);
    expect(fr242.intakeContract.rawBytesPersisted).toBe(false);
    expect(fr242.intakeContract.rawImageDigestComputed).toBe(false);
    expect(fr242.authorityBoundary.fr173WitnessOrC2paAuthorityInherited).toBe(false);
    expect(() => assertEphemeralLiveCameraFrameIntakeRuntimeFR242(fr242)).not.toThrow();
  });

  it('rejects a failed quality gate before metric extraction and zeroizes the working copy', () => {
    const { challenge, fr242 } = setup();
    let retainedWorkingCopy: Uint8Array | undefined;
    const metricExtractor = vi.fn(() => ({
      metricRef: 'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0' as const,
      unit: 'degree' as const,
      value: 1.25,
    }));

    const result = processEphemeralLiveCameraFrameFR242(fr242, challenge, {
      source: 'live_camera',
      mediaType: 'image/jpeg',
      transportEncoding: 'raw-binary',
      mediaBytes: jpegBytes(),
      qualityEvaluator: (bytes) => {
        retainedWorkingCopy = bytes;
        return { ...passQuality(), sharpness: false };
      },
      primaryMetricExtractor: metricExtractor,
    });

    expect(result.status).toBe('rejected');
    expect(result.rejectionReasons).toEqual(['sharpness_failed']);
    expect(result.primaryMetric).toBeNull();
    expect(result.metricExtractorInvoked).toBe(false);
    expect(metricExtractor).not.toHaveBeenCalled();
    expect(retainedWorkingCopy).toBeDefined();
    expect(Array.from(retainedWorkingCopy!)).toEqual([0, 0, 0, 0, 0, 0]);
  });

  it('extracts only the frozen primary metric after every quality check passes', () => {
    const { challenge, fr242 } = setup();
    const order: string[] = [];

    const result = processEphemeralLiveCameraFrameFR242(fr242, challenge, {
      source: 'live_camera',
      mediaType: 'image/jpeg',
      transportEncoding: 'raw-binary',
      declaredContentLength: jpegBytes().byteLength,
      mediaBytes: jpegBytes(),
      qualityEvaluator: () => {
        order.push('quality');
        return passQuality();
      },
      primaryMetricExtractor: () => {
        order.push('metric');
        return {
          metricRef: 'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0',
          unit: 'degree',
          value: -2.5,
        };
      },
    });

    expect(order).toEqual(['quality', 'metric']);
    expect(result.status).toBe('accepted_for_dry_run_mechanics_only');
    if (result.status !== 'accepted_for_dry_run_mechanics_only') throw new Error('unexpected');
    expect(result.primaryMetric.metricRef)
      .toBe('neutral.eye.outer_corner_tilt.mean_degrees@0.1.0');
    expect(result.primaryMetric.value).toBe(-2.5);
    expect(result.empiricalEvidenceEligible).toBe(false);
    expect(result.confirmatoryEvidenceEligible).toBe(false);
    expect(result.rawBytesPersisted).toBe(false);
    expect(result.rawImageDigestComputed).toBe(false);
  });

  it('rejects non-live/non-JPEG/mismatched-length envelopes before evaluators execute', () => {
    const { challenge, fr242 } = setup();
    const quality = vi.fn(passQuality);
    const metric = vi.fn(() => ({
      metricRef: 'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0' as const,
      unit: 'degree' as const,
      value: 0,
    }));

    expect(() => processEphemeralLiveCameraFrameFR242(fr242, challenge, {
      source: 'live_camera',
      mediaType: 'image/jpeg',
      transportEncoding: 'raw-binary',
      declaredContentLength: 999,
      mediaBytes: jpegBytes(),
      qualityEvaluator: quality,
      primaryMetricExtractor: metric,
    })).toThrow(/declaredContentLength must match observed bytes/u);

    expect(quality).not.toHaveBeenCalled();
    expect(metric).not.toHaveBeenCalled();
  });

  it('rejects a metric extractor that drifts from the frozen primary endpoint', () => {
    const { challenge, fr242 } = setup();

    expect(() => processEphemeralLiveCameraFrameFR242(fr242, challenge, {
      source: 'live_camera',
      mediaType: 'image/jpeg',
      transportEncoding: 'raw-binary',
      mediaBytes: jpegBytes(),
      qualityEvaluator: passQuality,
      primaryMetricExtractor: () => ({
        metricRef: 'neutral.eye.other_metric@0.1.0',
        unit: 'degree',
        value: 1,
      }) as never,
    })).toThrow(/frozen FR237 primary metric/u);
  });
});
