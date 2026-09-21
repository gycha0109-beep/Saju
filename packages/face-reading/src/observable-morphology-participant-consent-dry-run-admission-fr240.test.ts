import { describe, expect, it } from 'vitest';
import { preregisterObservableMorphologyRepeatabilityStudyFR237 } from './observable-morphology-repeatability-study-preregistration-fr237.js';
import { materializeResearchLiveCaptureRuntimeFR238 } from './observable-morphology-research-live-capture-session-runtime-fr238.js';
import { issuePrecollectionRetentionPrivacyPolicyFR239 } from './observable-morphology-repeatability-retention-privacy-policy-fr239.js';
import {
  assertOnePersonDryRunAdmissionFR240,
  assertParticipantConsentProtocolFR240,
  assertParticipantConsentReceiptFR240,
  issueOnePersonDryRunAdmissionFR240,
  issueParticipantConsentProtocolFR240,
  recordParticipantConsentFR240,
} from './observable-morphology-participant-consent-dry-run-admission-fr240.js';

function setup() {
  const runtime = materializeResearchLiveCaptureRuntimeFR238(
    preregisterObservableMorphologyRepeatabilityStudyFR237(),
  );
  const policy = issuePrecollectionRetentionPrivacyPolicyFR239(runtime);
  const protocol = issueParticipantConsentProtocolFR240({ runtime, policy });
  return { runtime, policy, protocol };
}

function consentInput() {
  return {
    participantRef: 'participant:fr240:p001',
    operatorRef: 'operator:fr240:o001',
    consentRecordedAt: '2026-09-22T02:00:00.000Z',
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
  } as const;
}

function persisted<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

describe('FR240 participant consent and one-person dry-run admission', () => {
  it('binds the consent protocol to exact active FR238 and FR239 artifacts', () => {
    const { runtime, policy, protocol } = setup();

    expect(protocol.sourceFR238.runtimeRef).toBe(runtime.runtimeRef);
    expect(protocol.sourceFR239.policyRef).toBe(policy.policyRef);
    expect(protocol.dryRunLimits.maximumParticipants).toBe(1);
    expect(protocol.dryRunLimits.requiredPartition).toBe('selection');
    expect(protocol.dryRunLimits.empiricalEvidenceEligible).toBe(false);
    expect(() => assertParticipantConsentProtocolFR240(protocol)).not.toThrow();
  });

  it('records only explicit all-true consent confirmations and keeps identity/legal authority unresolved', () => {
    const { protocol } = setup();
    const receipt = recordParticipantConsentFR240(protocol, consentInput());

    expect(receipt.participantRef).toBe('participant:fr240:p001');
    expect(receipt.participantIdentityStored).toBe(false);
    expect(receipt.signatureImageStored).toBe(false);
    expect(receipt.consentIndependentlyVerified).toBe(false);
    expect(receipt.legalConsentSufficiencyEstablished).toBe(false);
    expect(Object.values(receipt.confirmations).every((value) => value === true)).toBe(true);
    expect(() => assertParticipantConsentReceiptFR240(receipt)).not.toThrow();
  });

  it('rejects a consent record with any missing or false confirmation', () => {
    const { protocol } = setup();
    const invalid = {
      ...consentInput(),
      voluntaryParticipationConfirmed: false,
    } as unknown as Parameters<typeof recordParticipantConsentFR240>[1];

    expect(() => recordParticipantConsentFR240(protocol, invalid))
      .toThrow(/every FR240 consent confirmation must be explicitly true/u);
  });

  it('issues only a one-person selection dry-run admission and does not enable FR238 real execution', () => {
    const { protocol } = setup();
    const receipt = recordParticipantConsentFR240(protocol, consentInput());
    const admission = issueOnePersonDryRunAdmissionFR240({
      protocol,
      consentReceipt: receipt,
    });

    expect(admission.scope.purpose).toBe('one_person_research_dry_run');
    expect(admission.scope.participantCount).toBe(1);
    expect(admission.scope.partition).toBe('selection');
    expect(admission.scope.maximumSessions).toBe(2);
    expect(admission.scope.maximumAcceptedCapturesPerSession).toBe(2);
    expect(admission.scope.requiredCaptureSource).toBe('live_camera');
    expect(admission.scope.empiricalEvidenceEligible).toBe(false);
    expect(admission.executionGate.currentFR238RealParticipantExecutionEnabled).toBe(false);
    expect(admission.executionGate.runtimeExtensionStillRequired).toBe(true);
    expect(admission.executionGate.actualCollectionExecutedByThisArtifact).toBe(false);
    expect(() => assertOnePersonDryRunAdmissionFR240(admission)).not.toThrow();
  });

  it('rejects reconstructed protocol, receipt, and admission objects as active authority', () => {
    const { protocol } = setup();
    const receipt = recordParticipantConsentFR240(protocol, consentInput());
    const admission = issueOnePersonDryRunAdmissionFR240({
      protocol,
      consentReceipt: receipt,
    });

    expect(() => assertParticipantConsentProtocolFR240(persisted(protocol)))
      .toThrow(/active FR240 runtime/u);
    expect(() => assertParticipantConsentReceiptFR240(persisted(receipt)))
      .toThrow(/active FR240 runtime/u);
    expect(() => assertOnePersonDryRunAdmissionFR240(persisted(admission)))
      .toThrow(/active FR240 runtime/u);
  });

  it('preserves empirical, interpretation, traditional, production, and commerce boundaries', () => {
    const { protocol } = setup();

    expect(protocol.authorityBoundary.consentIndependentlyVerified).toBe(false);
    expect(protocol.authorityBoundary.participantIdentityIndependentlyVerified).toBe(false);
    expect(protocol.authorityBoundary.legalConsentSufficiencyEstablished).toBe(false);
    expect(protocol.authorityBoundary.empiricalRepeatabilityEstablished).toBe(false);
    expect(protocol.authorityBoundary.empiricalSufficiencyEstablished).toBe(false);
    expect(protocol.authorityBoundary.interpretationValidityEstablished).toBe(false);
    expect(protocol.authorityBoundary.traditionalBindingIssued).toBe(false);
    expect(protocol.authorityBoundary.productionActivated).toBe(false);
    expect(protocol.authorityBoundary.commerceActivated).toBe(false);
  });
});
