import { describe, expect, it } from 'vitest';
import {
  portableSha256HexFR248,
  portableSha256RefFR248,
  secureRandomHexFR248,
} from './observable-morphology-browser-portable-crypto-fr248.js';
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
import { materializeEphemeralLiveCameraFrameIntakeRuntimeFR242 } from './observable-morphology-ephemeral-live-camera-frame-intake-fr242.js';
import { materializeGovernedDryRunExecutionRuntimeFR243 } from './observable-morphology-governed-dry-run-execution-recorder-fr243.js';

describe('FR248 browser-portable authority crypto boundary', () => {
  it('matches standard SHA-256 vectors and preserves the sha256 ref envelope', () => {
    expect(portableSha256HexFR248('')).toBe(
      'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    );
    expect(portableSha256HexFR248('abc')).toBe(
      'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
    );
    expect(portableSha256RefFR248('abc')).toBe(
      'sha256:ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
    );
  });

  it('issues secure-random nonce material in the existing 24-byte hex shape', () => {
    const first = secureRandomHexFR248(24);
    const second = secureRandomHexFR248(24);
    expect(first).toMatch(/^[0-9a-f]{48}$/u);
    expect(second).toMatch(/^[0-9a-f]{48}$/u);
    expect(first).not.toBe(second);
  });

  it('materializes the full FR237 through FR243 dry-run authority chain without Node crypto APIs', () => {
    const fr237 = preregisterObservableMorphologyRepeatabilityStudyFR237();
    const fr238 = materializeResearchLiveCaptureRuntimeFR238(fr237);
    const fr239 = issuePrecollectionRetentionPrivacyPolicyFR239(fr238);
    const protocol = issueParticipantConsentProtocolFR240({
      runtime: fr238,
      policy: fr239,
    });
    const receipt = recordParticipantConsentFR240(protocol, {
      participantRef: 'participant:fr248:p001',
      operatorRef: 'operator:fr248:o001',
      consentRecordedAt: '2026-09-22T22:40:00.000Z',
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
      issuedAt: '2026-09-22T22:41:00.000Z',
    });
    const challenge = issueLiveCaptureChallengeFR241(fr241, session, {
      captureOrdinal: 1,
      issuedAt: '2026-09-22T22:42:00.000Z',
    });
    const fr242 = materializeEphemeralLiveCameraFrameIntakeRuntimeFR242({
      runtime: fr241,
      policy: fr239,
    });
    const fr243 = materializeGovernedDryRunExecutionRuntimeFR243({
      runtime: fr241,
      frameIntakeRuntime: fr242,
    });

    expect(fr237.protocolDigest).toMatch(/^sha256:[0-9a-f]{64}$/u);
    expect(fr238.runtimeDigest).toMatch(/^sha256:[0-9a-f]{64}$/u);
    expect(fr239.policyDigest).toMatch(/^sha256:[0-9a-f]{64}$/u);
    expect(protocol.protocolDigest).toMatch(/^sha256:[0-9a-f]{64}$/u);
    expect(admission.admissionDigest).toMatch(/^sha256:[0-9a-f]{64}$/u);
    expect(fr241.runtimeDigest).toMatch(/^sha256:[0-9a-f]{64}$/u);
    expect(session.sessionNonce).toMatch(/^[0-9a-f]{48}$/u);
    expect(challenge.captureNonce).toMatch(/^[0-9a-f]{48}$/u);
    expect(fr242.sourceFR241.runtimeRef).toBe(fr241.runtimeRef);
    expect(fr243.sourceFR241.runtimeRef).toBe(fr241.runtimeRef);
  });
});
