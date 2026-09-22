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
  materializeEphemeralLiveCameraFrameIntakeRuntimeFR242,
  type FR242CaptureQualityAssessment,
} from './observable-morphology-ephemeral-live-camera-frame-intake-fr242.js';
import {
  assertDryRunCaptureExecutionRecordFR243,
  assertGovernedDryRunExecutionRuntimeFR243,
  executeGovernedDryRunCaptureFR243,
  materializeGovernedDryRunExecutionRuntimeFR243,
  reviewGovernedOnePersonDryRunMechanicsFR243,
  type FR243OperatorExecutionAttestation,
} from './observable-morphology-governed-dry-run-execution-recorder-fr243.js';

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
  const session1 = issueOnePersonDryRunSessionFR241(fr241, admission, {
    sessionOrdinal: 1,
    issuedAt: '2026-09-22T03:21:00.000Z',
  });
  const challenge11 = issueLiveCaptureChallengeFR241(fr241, session1, {
    captureOrdinal: 1,
    issuedAt: '2026-09-22T03:22:00.000Z',
  });
  const challenge12 = issueLiveCaptureChallengeFR241(fr241, session1, {
    captureOrdinal: 2,
    issuedAt: '2026-09-22T03:23:00.000Z',
  });
  const session2 = issueOnePersonDryRunSessionFR241(fr241, admission, {
    sessionOrdinal: 2,
    issuedAt: '2026-09-22T04:21:00.000Z',
  });
  const challenge21 = issueLiveCaptureChallengeFR241(fr241, session2, {
    captureOrdinal: 1,
    issuedAt: '2026-09-22T04:22:00.000Z',
  });
  const challenge22 = issueLiveCaptureChallengeFR241(fr241, session2, {
    captureOrdinal: 2,
    issuedAt: '2026-09-22T04:23:00.000Z',
  });
  const fr242 = materializeEphemeralLiveCameraFrameIntakeRuntimeFR242({
    runtime: fr241,
    policy: fr239,
  });
  const fr243 = materializeGovernedDryRunExecutionRuntimeFR243({
    runtime: fr241,
    frameIntakeRuntime: fr242,
  });
  return {
    fr242,
    fr243,
    session1,
    session2,
    challenge11,
    challenge12,
    challenge21,
    challenge22,
  };
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

function execute(
  setupResult: ReturnType<typeof setup>,
  session: ReturnType<typeof setup>['session1'],
  challenge: ReturnType<typeof setup>['challenge11'],
  recordedAt: string,
  value: number,
  quality: FR242CaptureQualityAssessment = passQuality(),
) {
  return executeGovernedDryRunCaptureFR243(
    setupResult.fr243,
    setupResult.fr242,
    session,
    challenge,
    {
      mediaBytes: jpegBytes(),
      qualityEvaluator: () => quality,
      primaryMetricExtractor: () => ({
        metricRef: 'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0',
        unit: 'degree',
        value,
      }),
      operatorAttestation: attestation(recordedAt),
    },
  );
}

describe('FR243 governed one-person dry-run execution recorder', () => {
  it('binds exact FR241/FR242 runtimes while preserving non-empirical authority', () => {
    const s = setup();

    expect(s.fr243.sourceFR241.runtimeRef).toBe(s.fr242.sourceFR241.runtimeRef);
    expect(s.fr243.sourceFR242.runtimeRef).toBe(s.fr242.runtimeRef);
    expect(s.fr243.executionContract.rawBytesPersisted).toBe(false);
    expect(s.fr243.authorityBoundary.operatorAttestationIsIndependentVerification).toBe(false);
    expect(s.fr243.authorityBoundary.empiricalRepeatabilityEstablished).toBe(false);
    expect(() => assertGovernedDryRunExecutionRuntimeFR243(s.fr243)).not.toThrow();
  });

  it('records only sanitized mechanics output after explicit operator attestation', () => {
    const s = setup();
    const record = execute(
      s,
      s.session1,
      s.challenge11,
      '2026-09-22T03:22:30.000Z',
      1.25,
    );

    expect(record.resultStatus).toBe('accepted_for_dry_run_mechanics_only');
    expect(record.primaryMetric?.value).toBe(1.25);
    expect(record.operatorAttestedRealParticipantExecution).toBe(true);
    expect(record.independentRealParticipantExecutionVerification).toBe(false);
    expect(record.rawBytesPersisted).toBe(false);
    expect(record.rawImageDigestPersisted).toBe(false);
    expect(record.empiricalEvidenceEligible).toBe(false);
    expect('mediaBytes' in record).toBe(false);
    expect(() => assertDryRunCaptureExecutionRecordFR243(record)).not.toThrow();
  });

  it('fails closed on invalid operator attestation before invoking frame evaluators', () => {
    const s = setup();
    const quality = vi.fn(passQuality);
    const metric = vi.fn(() => ({
      metricRef: 'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0' as const,
      unit: 'degree' as const,
      value: 1,
    }));

    expect(() => executeGovernedDryRunCaptureFR243(
      s.fr243,
      s.fr242,
      s.session1,
      s.challenge11,
      {
        mediaBytes: jpegBytes(),
        qualityEvaluator: quality,
        primaryMetricExtractor: metric,
        operatorAttestation: {
          ...attestation('2026-09-22T03:22:30.000Z'),
          liveCameraCaptureObserved: false,
        } as never,
      },
    )).toThrow(/every operator execution attestation must be explicitly true/u);

    expect(quality).not.toHaveBeenCalled();
    expect(metric).not.toHaveBeenCalled();
  });

  it('rejects duplicate execution of the same capture challenge', () => {
    const s = setup();
    execute(s, s.session1, s.challenge11, '2026-09-22T03:22:30.000Z', 1);

    expect(() => execute(
      s,
      s.session1,
      s.challenge11,
      '2026-09-22T03:22:40.000Z',
      2,
    )).toThrow(/already been executed/u);
  });

  it('reviews exactly four governed slots without promoting repeatability', () => {
    const s = setup();
    const records = [
      execute(s, s.session1, s.challenge11, '2026-09-22T03:22:30.000Z', 1),
      execute(s, s.session1, s.challenge12, '2026-09-22T03:23:30.000Z', 2),
      execute(s, s.session2, s.challenge21, '2026-09-22T04:22:30.000Z', 3),
      execute(s, s.session2, s.challenge22, '2026-09-22T04:23:30.000Z', 4),
    ];

    const review = reviewGovernedOnePersonDryRunMechanicsFR243(s.fr243, records);

    expect(review.recordedSlotCount).toBe(4);
    expect(review.acceptedCaptureCount).toBe(4);
    expect(review.rejectedCaptureCount).toBe(0);
    expect(review.acceptedPrimaryMetrics.map((entry) => entry.value)).toEqual([1, 2, 3, 4]);
    expect(review.actualRealParticipantDryRunOperatorAttested).toBe(true);
    expect(review.actualRealParticipantDryRunIndependentlyVerified).toBe(false);
    expect(review.empiricalEvidenceEligible).toBe(false);
    expect(review.confirmatoryEvidenceEligible).toBe(false);
    expect(review.empiricalRepeatabilityEstablished).toBe(false);
    expect(review.interpretationValidityEstablished).toBe(false);
  });

  it('keeps a four-slot review mechanics-only when quality rejects a capture', () => {
    const s = setup();
    const records = [
      execute(s, s.session1, s.challenge11, '2026-09-22T03:22:30.000Z', 1),
      execute(
        s,
        s.session1,
        s.challenge12,
        '2026-09-22T03:23:30.000Z',
        2,
        { ...passQuality(), sharpness: false },
      ),
      execute(s, s.session2, s.challenge21, '2026-09-22T04:22:30.000Z', 3),
      execute(s, s.session2, s.challenge22, '2026-09-22T04:23:30.000Z', 4),
    ];

    const review = reviewGovernedOnePersonDryRunMechanicsFR243(s.fr243, records);

    expect(review.acceptedCaptureCount).toBe(3);
    expect(review.rejectedCaptureCount).toBe(1);
    expect(review.mechanicsReviewState)
      .toBe('four_slot_operator_attested_mechanics_complete_with_rejections');
    expect(review.empiricalRepeatabilityEstablished).toBe(false);
  });
});
