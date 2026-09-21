import { describe, expect, it } from 'vitest';
import { preregisterObservableMorphologyRepeatabilityStudyFR237 } from './observable-morphology-repeatability-study-preregistration-fr237.js';
import { materializeResearchLiveCaptureRuntimeFR238 } from './observable-morphology-research-live-capture-session-runtime-fr238.js';
import { issuePrecollectionRetentionPrivacyPolicyFR239 } from './observable-morphology-repeatability-retention-privacy-policy-fr239.js';
import {
  issueOnePersonDryRunAdmissionFR240,
  issueParticipantConsentProtocolFR240,
  recordParticipantConsentFR240,
} from './observable-morphology-participant-consent-dry-run-admission-fr240.js';
import {
  assertLiveCaptureChallengeFR241,
  assertOnePersonDryRunRuntimeFR241,
  assertOnePersonDryRunSessionFR241,
  issueLiveCaptureChallengeFR241,
  issueOnePersonDryRunSessionFR241,
  materializeOnePersonDryRunRuntimeFR241,
} from './observable-morphology-one-person-dry-run-runtime-fr241.js';

function setup() {
  const fr238 = materializeResearchLiveCaptureRuntimeFR238(
    preregisterObservableMorphologyRepeatabilityStudyFR237(),
  );
  const fr239 = issuePrecollectionRetentionPrivacyPolicyFR239(fr238);
  const protocol = issueParticipantConsentProtocolFR240({ runtime: fr238, policy: fr239 });
  const receipt = recordParticipantConsentFR240(protocol, {
    participantRef: 'participant:fr240:p001',
    operatorRef: 'operator:fr240:o001',
    consentRecordedAt: '2026-09-22T03:00:00.000Z',
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
  const runtime = materializeOnePersonDryRunRuntimeFR241({
    runtime: fr238,
    protocol,
    admission,
  });
  return { fr238, protocol, admission, runtime };
}

function persisted<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

describe('FR241 one-person dry-run execution runtime', () => {
  it('consumes the exact FR238 + FR240 chain while keeping raw media ingress disabled', () => {
    const { fr238, protocol, admission, runtime } = setup();

    expect(runtime.sourceFR238.runtimeRef).toBe(fr238.runtimeRef);
    expect(runtime.sourceFR240.protocolRef).toBe(protocol.protocolRef);
    expect(runtime.sourceFR240.admissionRef).toBe(admission.admissionRef);
    expect(runtime.dryRunScope.participantCount).toBe(1);
    expect(runtime.dryRunScope.partition).toBe('selection');
    expect(runtime.executionCapabilities.realParticipantSessionIssuanceEnabled).toBe(true);
    expect(runtime.executionCapabilities.liveCaptureChallengeIssuanceEnabled).toBe(true);
    expect(runtime.executionCapabilities.rawMediaByteIngressEnabled).toBe(false);
    expect(runtime.executionCapabilities.metricExtractionEnabled).toBe(false);
    expect(() => assertOnePersonDryRunRuntimeFR241(runtime)).not.toThrow();
  });

  it('issues session 1 before session 2 and rejects duplicate session ordinals', () => {
    const { admission, runtime } = setup();

    expect(() => issueOnePersonDryRunSessionFR241(runtime, admission, {
      sessionOrdinal: 2,
      issuedAt: '2026-09-22T03:10:00.000Z',
    })).toThrow(/session 2 cannot be issued before session 1/u);

    const session1 = issueOnePersonDryRunSessionFR241(runtime, admission, {
      sessionOrdinal: 1,
      issuedAt: '2026-09-22T03:11:00.000Z',
    });
    expect(session1.participantRef).toBe(admission.participantRef);
    expect(session1.partition).toBe('selection');
    expect(session1.sessionNonce).toMatch(/^[0-9a-f]{48}$/u);
    expect(session1.rawMediaByteIngressEnabled).toBe(false);
    expect(session1.temporalSeparationIndependentlyVerified).toBe(false);
    expect(() => assertOnePersonDryRunSessionFR241(session1)).not.toThrow();

    expect(() => issueOnePersonDryRunSessionFR241(runtime, admission, {
      sessionOrdinal: 1,
      issuedAt: '2026-09-22T03:12:00.000Z',
    })).toThrow(/session ordinal has already been issued/u);

    const session2 = issueOnePersonDryRunSessionFR241(runtime, admission, {
      sessionOrdinal: 2,
      issuedAt: '2026-09-22T03:13:00.000Z',
    });
    expect(session2.sessionOrdinal).toBe(2);
    expect(session2.sessionNonce).not.toBe(session1.sessionNonce);
  });

  it('issues capture 1 before capture 2 and keeps live-camera-only challenge semantics', () => {
    const { admission, runtime } = setup();
    const session = issueOnePersonDryRunSessionFR241(runtime, admission, {
      sessionOrdinal: 1,
      issuedAt: '2026-09-22T03:20:00.000Z',
    });

    expect(() => issueLiveCaptureChallengeFR241(runtime, session, {
      captureOrdinal: 2,
      issuedAt: '2026-09-22T03:21:00.000Z',
    })).toThrow(/capture 2 cannot be issued before capture 1/u);

    const capture1 = issueLiveCaptureChallengeFR241(runtime, session, {
      captureOrdinal: 1,
      issuedAt: '2026-09-22T03:22:00.000Z',
    });
    expect(capture1.requiredSource).toBe('live_camera');
    expect(capture1.galleryUploadAllowed).toBe(false);
    expect(capture1.retrospectiveCaptureAllowed).toBe(false);
    expect(capture1.captureNonce).toMatch(/^[0-9a-f]{48}$/u);
    expect(capture1.rawMediaByteIngressEnabled).toBe(false);
    expect(capture1.empiricalEvidenceEligible).toBe(false);
    expect(() => assertLiveCaptureChallengeFR241(capture1)).not.toThrow();

    expect(() => issueLiveCaptureChallengeFR241(runtime, session, {
      captureOrdinal: 1,
      issuedAt: '2026-09-22T03:23:00.000Z',
    })).toThrow(/capture ordinal has already been issued/u);

    const capture2 = issueLiveCaptureChallengeFR241(runtime, session, {
      captureOrdinal: 2,
      issuedAt: '2026-09-22T03:24:00.000Z',
    });
    expect(capture2.captureOrdinal).toBe(2);
    expect(capture2.captureNonce).not.toBe(capture1.captureNonce);
  });

  it('rejects reconstructed runtime, session, and challenge objects as active authority', () => {
    const { admission, runtime } = setup();
    const session = issueOnePersonDryRunSessionFR241(runtime, admission, {
      sessionOrdinal: 1,
      issuedAt: '2026-09-22T03:30:00.000Z',
    });
    const challenge = issueLiveCaptureChallengeFR241(runtime, session, {
      captureOrdinal: 1,
      issuedAt: '2026-09-22T03:31:00.000Z',
    });

    expect(() => assertOnePersonDryRunRuntimeFR241(persisted(runtime)))
      .toThrow(/active FR241 runtime/u);
    expect(() => assertOnePersonDryRunSessionFR241(persisted(session)))
      .toThrow(/active FR241 runtime/u);
    expect(() => assertLiveCaptureChallengeFR241(persisted(challenge)))
      .toThrow(/active FR241 runtime/u);
  });

  it('does not promote dry-run mechanics into empirical or interpretation authority', () => {
    const { runtime } = setup();

    expect(runtime.authorityBoundary.admissionConsumptionMechanicallyVerified).toBe(true);
    expect(runtime.authorityBoundary.consentIndependentlyVerified).toBe(false);
    expect(runtime.authorityBoundary.participantIdentityIndependentlyVerified).toBe(false);
    expect(runtime.authorityBoundary.participantCaptureExecutedByThisArtifact).toBe(false);
    expect(runtime.authorityBoundary.captureQualityValidated).toBe(false);
    expect(runtime.authorityBoundary.primaryMetricExtractedFromParticipantMedia).toBe(false);
    expect(runtime.authorityBoundary.empiricalRepeatabilityEstablished).toBe(false);
    expect(runtime.authorityBoundary.empiricalSufficiencyEstablished).toBe(false);
    expect(runtime.authorityBoundary.interpretationValidityEstablished).toBe(false);
    expect(runtime.authorityBoundary.traditionalBindingIssued).toBe(false);
    expect(runtime.authorityBoundary.productionActivated).toBe(false);
    expect(runtime.authorityBoundary.commerceActivated).toBe(false);
  });
});
