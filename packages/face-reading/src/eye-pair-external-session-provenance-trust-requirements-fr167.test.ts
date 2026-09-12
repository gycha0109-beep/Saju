import { describe, expect, it } from 'vitest';
import {
  assertIssuedEyePairExternalSessionProvenanceTrustRequirementsFR167,
  FR167_NEXT_FRONTIER,
  FR167_RESEARCH_NOTE_REF,
  issueEyePairExternalSessionProvenanceTrustRequirementsFR167,
  type EyePairExternalSessionProvenanceTrustRequirementsFR167V1,
} from './eye-pair-external-session-provenance-trust-requirements-fr167.js';

describe('FR167 eye-pair external session provenance trust requirements', () => {
  it('freezes prospective external witness and trust-root requirements without asking for participant capture', () => {
    const result = issueEyePairExternalSessionProvenanceTrustRequirementsFR167();

    expect(result.authorityState).toBe('eye_pair_external_session_provenance_trust_requirements_frozen_only');
    expect(Object.values(result.requirementsBoundary).every((value) => value === true)).toBe(true);
    expect(result.prospectiveCollectionBoundary.newParticipantCaptureRequiredToFreezeTheseRequirements).toBe(false);
    expect(result.prospectiveCollectionBoundary.authorityPromotableCaptureAllowedBeforeTrustPathProvisionedAndReviewed).toBe(false);
    expect(result.prospectiveCollectionBoundary.ordinaryFR165CaptureMayContinueForDescriptionOnly).toBe(true);
    expect(result.prospectiveCollectionBoundary.ordinaryFR165CaptureCreatesIndependentSessionAuthority).toBe(false);
    expect(() => assertIssuedEyePairExternalSessionProvenanceTrustRequirementsFR167(result)).not.toThrow();
  });

  it('freezes common lookalikes as insufficient evidence rather than authority', () => {
    const result = issueEyePairExternalSessionProvenanceTrustRequirementsFR167();

    expect(Object.values(result.insufficiencyBoundary).every((value) => value === false)).toBe(true);
    expect(result.insufficiencyBoundary.byteDistinctCaptureAloneSufficient).toBe(false);
    expect(result.insufficiencyBoundary.metadataTimestampAloneSufficient).toBe(false);
    expect(result.insufficiencyBoundary.uploadSeparationAloneSufficient).toBe(false);
    expect(result.insufficiencyBoundary.callerSelfAttestationAloneSufficient).toBe(false);
    expect(result.insufficiencyBoundary.digestEqualityAloneSufficient).toBe(false);
    expect(result.insufficiencyBoundary.mathematicalSignatureValidityAloneSufficient).toBe(false);
    expect(result.insufficiencyBoundary.selfSignedCredentialAloneSufficient).toBe(false);
    expect(result.insufficiencyBoundary.syntheticCredentialAloneSufficient).toBe(false);
  });

  it('does not inherit square-broad-fang criterion authority', () => {
    const result = issueEyePairExternalSessionProvenanceTrustRequirementsFR167();

    expect(result.precedentBoundary.refs).toHaveLength(3);
    expect(result.precedentBoundary.squareBroadFangArtifactsAreDesignPrecedentOnly).toBe(true);
    expect(result.precedentBoundary.squareBroadFangAuthorityInheritedByEyePair).toBe(false);
    expect(result.precedentBoundary.crossCriterionTrustRootReuseWithoutExplicitEyePairAdmissionAllowed).toBe(false);
  });

  it('keeps actual trust, independence, repeatability, identity, and semantic authority closed', () => {
    const result = issueEyePairExternalSessionProvenanceTrustRequirementsFR167();

    expect(result.authorityBoundary).toMatchObject({
      requirementsFrozen: true,
      actualTrustRootProvisioned: false,
      actualWitnessCredentialAdmitted: false,
      externalWitnessAuthorityEstablished: false,
      independentSessionEvidenceAdmitted: false,
      multiSessionIndependenceVerified: false,
      empiricalRepeatabilityEstablished: false,
      captureQualityValidated: false,
      inferentialStatisticIssued: false,
      repeatabilityPassFailIssued: false,
      captureSensitivityPassFailIssued: false,
      calibrationIssued: false,
      thresholdsIssued: false,
      identityMatchingPerformed: false,
      biometricTemplateIssued: false,
      constructValidity: 'unresolved',
      traditionalBinding: 'unresolved',
      traditionalSemanticAuthority: false,
    });
    expect(result.prospectiveCollectionBoundary.existingFR163ToFR165SessionsRetrospectivelyPromotable).toBe(false);
  });

  it('accepts and persists no participant or biometric material', () => {
    const result = issueEyePairExternalSessionProvenanceTrustRequirementsFR167();

    expect(Object.values(result.privacyBoundary).every((value) => value === false)).toBe(true);
    expect(Object.keys(result)).not.toContain('participantMetricValues');
    expect(Object.keys(result)).not.toContain('capture');
  });

  it('rejects forged lookalikes and freezes the intended next frontier', () => {
    const forged = Object.freeze({}) as unknown as EyePairExternalSessionProvenanceTrustRequirementsFR167V1;
    expect(() => assertIssuedEyePairExternalSessionProvenanceTrustRequirementsFR167(forged)).toThrow(/not issued/u);
    expect(FR167_RESEARCH_NOTE_REF).toBe(
      'repo:research/face-reading/fr167-eye-pair-external-session-provenance-trust-requirements.md',
    );
    expect(FR167_NEXT_FRONTIER).toBe(
      'provision_and_review_eye_pair_external_witness_trust_root_before_collecting_authority_promotable_sessions',
    );
  });
});
