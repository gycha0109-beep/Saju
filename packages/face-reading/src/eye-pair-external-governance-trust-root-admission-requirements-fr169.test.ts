import { describe, expect, it } from 'vitest';
import {
  FR169_NEXT_FRONTIER,
  assertIssuedEyePairExternalGovernanceTrustRootAdmissionRequirementsFR169,
  getEyePairExternalGovernanceTrustRootAdmissionRequirementsContractFR169,
  issueEyePairExternalGovernanceTrustRootAdmissionRequirementsFR169,
} from './eye-pair-external-governance-trust-root-admission-requirements-fr169.js';
import {
  computeEyePairExternalTrustRootArtifactDigestFR168,
  materializeEyePairExternalTrustRootCandidateMaterialIntakeFR168,
  type EyePairExternalTrustRootCandidateMaterialIntakeFR168V1,
} from './eye-pair-external-trust-root-candidate-material-intake-fr168.js';
import { issueEyePairExternalSessionProvenanceTrustRequirementsFR167 } from './eye-pair-external-session-provenance-trust-requirements-fr167.js';

function makeFR168(): EyePairExternalTrustRootCandidateMaterialIntakeFR168V1 {
  const bytes = Uint8Array.from([70, 82, 49, 54, 57, 2, 3, 5, 7, 11]);
  return materializeEyePairExternalTrustRootCandidateMaterialIntakeFR168({
    schemaVersion: 'fr168-eye-pair-external-trust-root-candidate-material-intake-request-v1',
    fr167Requirements: issueEyePairExternalSessionProvenanceTrustRequirementsFR167(),
    candidate: {
      trustRootCandidateRef: 'trust-root-candidate:fr169:synthetic:001',
      trustRootAuthorityRef: 'trust-root-authority:fr169:synthetic:001',
      trustRootArtifactRef: 'trust-root-artifact:fr169:synthetic:001',
      trustRootClassClaim:
        'eye_pair_external_governance_trust_root_artifact_candidate_not_semantically_verified',
      declaredTrustRootArtifactDigest: computeEyePairExternalTrustRootArtifactDigestFR168(bytes),
      trustRootArtifactBytes: bytes,
      trustRootPolicyRef: 'trust-root-policy:fr169:synthetic:001',
      trustRootValidityPolicyRef: 'trust-root-validity-policy:fr169:synthetic:001',
      trustRootRevocationStatusPolicyRef: 'trust-root-revocation-policy:fr169:synthetic:001',
      signerChainPolicyRef: 'signer-chain-policy:fr169:synthetic:001',
      semanticTrustEvidenceVerifierRef: 'semantic-trust-verifier:fr169:synthetic:001',
      authorityIdentityEvidenceRef: 'authority-identity-evidence:fr169:synthetic:001',
      externalKeyPinningEvidenceRef: 'external-key-pinning-evidence:fr169:synthetic:001',
      eyePairCriterionScopeEvidenceRef: 'eye-pair-scope-evidence:fr169:synthetic:001',
      witnessAuthorityScopeEvidenceRef: 'witness-authority-scope-evidence:fr169:synthetic:001',
      prospectiveValidityBindingEvidenceRef: 'prospective-validity-binding:fr169:synthetic:001',
      captureToWitnessBindingPolicyRef: 'capture-witness-binding-policy:fr169:synthetic:001',
    },
  });
}

describe('FR169 eye-pair external governance trust-root admission requirements', () => {
  it('freezes every external governance admission requirement without inventing authority', () => {
    const output = issueEyePairExternalGovernanceTrustRootAdmissionRequirementsFR169(makeFR168());
    assertIssuedEyePairExternalGovernanceTrustRootAdmissionRequirementsFR169(output);

    expect(Object.values(output.requirementsBoundary).every((value) => value === true)).toBe(true);
    expect(Object.values(output.insufficiencyBoundary).every((value) => value === false)).toBe(true);
    expect(output.authorityBoundary.externalGovernanceAdmissionRequirementsFrozen).toBe(true);
    expect(output.nextFrontier).toBe(FR169_NEXT_FRONTIER);
  });

  it('binds the requirements to the exact issued FR168 candidate coordinates and digests', () => {
    const fr168 = makeFR168();
    const output = issueEyePairExternalGovernanceTrustRootAdmissionRequirementsFR169(fr168);

    expect(output.predecessor.fr168CandidateMaterialDigest).toBe(fr168.candidateMaterialDigest);
    expect(output.predecessor.fr168TrustRootCandidateRef).toBe(fr168.candidateMaterial.trustRootCandidateRef);
    expect(output.predecessor.fr168TrustRootAuthorityRef).toBe(fr168.candidateMaterial.trustRootAuthorityRef);
    expect(output.predecessor.fr168TrustRootArtifactRef).toBe(fr168.candidateMaterial.trustRootArtifactRef);
    expect(output.predecessor.fr168TrustRootArtifactDigest).toBe(fr168.candidateMaterial.trustRootArtifactDigest);
    expect(output.predecessor.fr168TrustRootArtifactByteIdentityVerified).toBe(true);
  });

  it('keeps provisioning, governance verification, witness trust, and independent-session admission fail-closed', () => {
    const output = issueEyePairExternalGovernanceTrustRootAdmissionRequirementsFR169(makeFR168());

    expect(output.availabilityBoundary.independentlyGovernedVerifierProvisionedByThisArtifact).toBe(false);
    expect(output.availabilityBoundary.authoritativeExternalRootAnchorProvisionedByThisArtifact).toBe(false);
    expect(output.availabilityBoundary.actualExternalGovernanceVerificationPerformed).toBe(false);
    expect(output.availabilityBoundary.admissionExecutionSucceeded).toBe(false);
    expect(output.availabilityBoundary.productionWitnessVerificationAlgorithm).toBeNull();
    expect(output.availabilityBoundary.pinnedWitnessTrustRootRef).toBeNull();
    expect(output.availabilityBoundary.admissionCanSucceedWithoutExternalProvisioning).toBe(false);

    expect(Object.values(output.trustBoundary).every((value) => value === false)).toBe(true);
    expect(output.authorityBoundary.actualExternalGovernanceVerificationPerformed).toBe(false);
    expect(output.authorityBoundary.actualTrustRootProvisioned).toBe(false);
    expect(output.authorityBoundary.actualWitnessCredentialAdmitted).toBe(false);
    expect(output.authorityBoundary.externalWitnessAuthorityEstablished).toBe(false);
    expect(output.authorityBoundary.independentSessionEvidenceAdmitted).toBe(false);
    expect(output.authorityBoundary.multiSessionIndependenceVerified).toBe(false);
    expect(output.authorityBoundary.empiricalRepeatabilityEstablished).toBe(false);
    expect(output.authorityBoundary.captureQualityValidated).toBe(false);
    expect(output.authorityBoundary.thresholdsIssued).toBe(false);
    expect(output.authorityBoundary.identityMatchingPerformed).toBe(false);
    expect(output.authorityBoundary.biometricTemplateIssued).toBe(false);
    expect(output.authorityBoundary.constructValidity).toBe('unresolved');
    expect(output.authorityBoundary.traditionalBinding).toBe('unresolved');
    expect(output.authorityBoundary.traditionalSemanticAuthority).toBe(false);
  });

  it('requires no new participant material and preserves the non-retroactive session boundary', () => {
    const output = issueEyePairExternalGovernanceTrustRootAdmissionRequirementsFR169(makeFR168());

    expect(output.prospectiveCollectionBoundary.existingFR163ToFR165SessionsRetrospectivelyPromotable).toBe(false);
    expect(output.prospectiveCollectionBoundary.newParticipantCaptureRequiredToFreezeAdmissionRequirements).toBe(false);
    expect(
      output.prospectiveCollectionBoundary.authorityPromotableCaptureAllowedBeforeExternalProvisioningAndSuccessfulAdmission,
    ).toBe(false);
    expect(output.prospectiveCollectionBoundary.descriptiveCaptureMayContinueWithoutCreatingIndependentSessionAuthority).toBe(true);

    expect(output.privacyBoundary.rawImageAccepted).toBe(false);
    expect(output.privacyBoundary.participantDerivedNumericMetricInputAccepted).toBe(false);
    expect(output.privacyBoundary.trustRootArtifactBytesAcceptedByThisArtifact).toBe(false);
    expect(output.privacyBoundary.sourceDigestAccepted).toBe(false);
    expect(output.privacyBoundary.faceEmbeddingPersisted).toBe(false);
    expect(output.privacyBoundary.identityTemplatePersisted).toBe(false);
  });

  it('rejects cloned or caller-fabricated FR168 predecessor artifacts', () => {
    const fr168 = makeFR168();
    const clone = { ...fr168 } as EyePairExternalTrustRootCandidateMaterialIntakeFR168V1;

    expect(() => issueEyePairExternalGovernanceTrustRootAdmissionRequirementsFR169(clone)).toThrow(
      /FR-168 candidate material intake artifact was not issued by the active FR-168 boundary/u,
    );
  });

  it('publishes the fail-closed contract for the next externally provisioned verifier stage', () => {
    const contract = getEyePairExternalGovernanceTrustRootAdmissionRequirementsContractFR169();

    expect(contract.issuedFR168CandidateIntakeRequired).toBe(true);
    expect(contract.exactFR168CandidateMaterialDigestBindingRequired).toBe(true);
    expect(contract.independentlyProvisionedExternalGovernanceVerifierRequired).toBe(true);
    expect(contract.externalGovernanceAuthorityIdentityVerificationRequired).toBe(true);
    expect(contract.semanticTrustRootParsingAndVerificationRequired).toBe(true);
    expect(contract.externallyGovernedKeyPinningRequired).toBe(true);
    expect(contract.callerOrProjectGeneratedAuthoritySufficient).toBe(false);
    expect(contract.syntheticAuthoritySufficient).toBe(false);
    expect(contract.actualExternalGovernanceVerificationPerformedByThisArtifact).toBe(false);
    expect(contract.actualTrustRootProvisionedByThisArtifact).toBe(false);
    expect(contract.authorityPromotableCaptureAllowedByThisArtifact).toBe(false);
    expect(contract.nextFrontier).toBe(FR169_NEXT_FRONTIER);
  });
});
