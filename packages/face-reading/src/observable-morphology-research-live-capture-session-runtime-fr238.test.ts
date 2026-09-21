import { describe, expect, it } from 'vitest';
import { preregisterObservableMorphologyRepeatabilityStudyFR237 } from './observable-morphology-repeatability-study-preregistration-fr237.js';
import {
  assertMechanicsOnlyCaptureChallengeFR238,
  assertResearchLiveCaptureRuntimeFR238,
  issueMechanicsOnlyCaptureChallengeFR238,
  issueMechanicsOnlySessionFR238,
  materializeResearchLiveCaptureRuntimeFR238,
} from './observable-morphology-research-live-capture-session-runtime-fr238.js';

function persisted<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

describe('FR238 research live-capture session runtime', () => {
  it('binds live-capture mechanics to active FR237 while keeping real collection disabled', () => {
    const protocol = preregisterObservableMorphologyRepeatabilityStudyFR237();
    const runtime = materializeResearchLiveCaptureRuntimeFR238(protocol);

    expect(runtime.sourceFR237.protocolRef).toBe(protocol.protocolRef);
    expect(runtime.captureContract.liveCameraOnly).toBe(true);
    expect(runtime.captureContract.galleryUploadAllowed).toBe(false);
    expect(runtime.executionGate.mechanicsOnlySyntheticSessionIssuanceEnabled).toBe(true);
    expect(runtime.executionGate.realParticipantSessionIssuanceEnabled).toBe(false);
    expect(runtime.executionGate.realCaptureAdmissionEnabled).toBe(false);
    expect(() => assertResearchLiveCaptureRuntimeFR238(runtime)).not.toThrow();
  });

  it('issues server-randomized mechanics-only session and capture challenges', () => {
    const runtime = materializeResearchLiveCaptureRuntimeFR238(
      preregisterObservableMorphologyRepeatabilityStudyFR237(),
    );
    const session = issueMechanicsOnlySessionFR238(runtime, {
      syntheticParticipantRef: 'synthetic:fr238:p001',
      partition: 'selection',
      sessionOrdinal: 1,
      issuedAt: '2026-09-22T00:00:00.000Z',
    });
    const challenge = issueMechanicsOnlyCaptureChallengeFR238(runtime, session, {
      captureOrdinal: 1,
      issuedAt: '2026-09-22T00:01:00.000Z',
    });

    expect(session.sessionNonce).toMatch(/^[0-9a-f]{48}$/u);
    expect(challenge.captureNonce).toMatch(/^[0-9a-f]{48}$/u);
    expect(challenge.captureNonce).not.toBe(session.sessionNonce);
    expect(challenge.requiredSource).toBe('live_camera');
    expect(challenge.empiricalEvidenceEligible).toBe(false);
    expect(() => assertMechanicsOnlyCaptureChallengeFR238(challenge)).not.toThrow();
  });

  it('rejects non-synthetic participant refs before real collection is authorized', () => {
    const runtime = materializeResearchLiveCaptureRuntimeFR238(
      preregisterObservableMorphologyRepeatabilityStudyFR237(),
    );
    expect(() => issueMechanicsOnlySessionFR238(runtime, {
      syntheticParticipantRef: 'participant:p001',
      partition: 'selection',
      sessionOrdinal: 1,
      issuedAt: '2026-09-22T00:00:00.000Z',
    })).toThrow(/synthetic:fr238/u);
  });

  it('rejects reconstructed runtime and challenge objects as active authority', () => {
    const runtime = materializeResearchLiveCaptureRuntimeFR238(
      preregisterObservableMorphologyRepeatabilityStudyFR237(),
    );
    const session = issueMechanicsOnlySessionFR238(runtime, {
      syntheticParticipantRef: 'synthetic:fr238:p002',
      partition: 'holdout',
      sessionOrdinal: 2,
      issuedAt: '2026-09-22T01:00:00.000Z',
    });
    const challenge = issueMechanicsOnlyCaptureChallengeFR238(runtime, session, {
      captureOrdinal: 2,
      issuedAt: '2026-09-22T01:01:00.000Z',
    });

    expect(() => assertResearchLiveCaptureRuntimeFR238(persisted(runtime)))
      .toThrow(/active FR238 runtime/u);
    expect(() => assertMechanicsOnlyCaptureChallengeFR238(persisted(challenge)))
      .toThrow(/active FR238 runtime/u);
  });

  it('preserves the empirical and interpretation authority boundary', () => {
    const runtime = materializeResearchLiveCaptureRuntimeFR238(
      preregisterObservableMorphologyRepeatabilityStudyFR237(),
    );
    expect(runtime.authorityBoundary.realParticipantDataCollectedByThisArtifact).toBe(false);
    expect(runtime.authorityBoundary.captureFreshnessIndependentlyVerified).toBe(false);
    expect(runtime.authorityBoundary.sameParticipantIdentityIndependentlyVerified).toBe(false);
    expect(runtime.authorityBoundary.empiricalRepeatabilityEstablished).toBe(false);
    expect(runtime.authorityBoundary.empiricalSufficiencyEstablished).toBe(false);
    expect(runtime.authorityBoundary.interpretationValidityEstablished).toBe(false);
    expect(runtime.authorityBoundary.traditionalBindingIssued).toBe(false);
    expect(runtime.authorityBoundary.productionActivated).toBe(false);
  });
});
