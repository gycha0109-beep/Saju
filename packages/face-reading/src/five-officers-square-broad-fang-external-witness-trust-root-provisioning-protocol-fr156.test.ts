import { describe, expect, it } from 'vitest';
import {
  FR156_NEXT_FRONTIER,
  assertIssuedSquareBroadFangExternalWitnessTrustRootProvisioningProtocolFR156,
  getSquareBroadFangExternalWitnessTrustRootProvisioningContractFR156,
  materializeSquareBroadFangExternalWitnessTrustRootProvisioningProtocolFR156,
} from './five-officers-square-broad-fang-external-witness-trust-root-provisioning-protocol-fr156.js';

describe('FR156 square broad Fang external witness trust-root provisioning protocol', () => {
  it('freezes external-governance trust-root requirements without provisioning a root', () => {
    const contract = getSquareBroadFangExternalWitnessTrustRootProvisioningContractFR156();
    expect(contract.protocolFrozenBeforeTrustedRootAdmission).toBe(true);
    expect(contract.externalGovernanceAuthorityRequired).toBe(true);
    expect(contract.trustRootArtifactBytesRequiredAtAdmission).toBe(true);
    expect(contract.trustRootAuthorityIdentityVerificationRequired).toBe(true);
    expect(contract.trustRootArtifactSemanticContentVerificationRequired).toBe(true);
    expect(contract.trustRootKeyPinningByExternalGovernanceRequired).toBe(true);
    expect(contract.validityAndRevocationPolicyRequired).toBe(true);
    expect(contract.signerChainVerificationPolicyRequired).toBe(true);
    expect(contract.semanticTrustEvidenceVerifierRequired).toBe(true);
    expect(contract.callerSuppliedTrustRootRefMeansGovernedTrustRoot).toBe(false);
    expect(contract.callerSuppliedPublicKeyMeansPinnedTrustRoot).toBe(false);
    expect(contract.byteDigestMatchMeansTrustedRoot).toBe(false);
    expect(contract.selfSignedOrSyntheticCredentialMeansExternalTrustRoot).toBe(false);
    expect(contract.productionWitnessVerificationAlgorithm).toBeNull();
    expect(contract.pinnedWitnessTrustRootRef).toBeNull();
    expect(contract.externalTrustRootProvisionedByThisArtifact).toBe(false);
    expect(contract.semanticTrustEvidenceVerificationPerformedByThisArtifact).toBe(false);
    expect(contract.independentSessionEvidenceAdmittedByThisArtifact).toBe(false);
    expect(contract.nextFrontier).toBe(FR156_NEXT_FRONTIER);
  });

  it('requires external authority identity, semantic verification, key pinning, policy, and signer-chain evidence', () => {
    const protocol = materializeSquareBroadFangExternalWitnessTrustRootProvisioningProtocolFR156();
    assertIssuedSquareBroadFangExternalWitnessTrustRootProvisioningProtocolFR156(protocol);
    expect(protocol.prospectiveTrustRoot.protocolFrozenBeforeTrustedRootAdmission).toBe(true);
    expect(protocol.prospectiveTrustRoot.externalGovernanceAuthorityRequired).toBe(true);
    expect(protocol.prospectiveTrustRoot.trustRootAuthorityRefRequired).toBe(true);
    expect(protocol.prospectiveTrustRoot.trustRootArtifactRefRequired).toBe(true);
    expect(protocol.prospectiveTrustRoot.trustRootArtifactBytesRequiredAtAdmission).toBe(true);
    expect(protocol.prospectiveTrustRoot.trustRootArtifactDeclaredDigestExactMatchRequired).toBe(true);
    expect(protocol.prospectiveTrustRoot.trustRootAuthorityIdentityVerificationRequired).toBe(true);
    expect(protocol.prospectiveTrustRoot.trustRootArtifactSemanticContentVerificationRequired).toBe(true);
    expect(protocol.prospectiveTrustRoot.trustRootKeyPinningByExternalGovernanceRequired).toBe(true);
    expect(protocol.prospectiveTrustRoot.trustRootPolicyRefRequired).toBe(true);
    expect(protocol.prospectiveTrustRoot.trustRootValidityPolicyRefRequired).toBe(true);
    expect(protocol.prospectiveTrustRoot.trustRootRevocationStatusPolicyRefRequired).toBe(true);
    expect(protocol.prospectiveTrustRoot.signerChainVerificationPolicyRequired).toBe(true);
    expect(protocol.prospectiveTrustRoot.semanticTrustEvidenceVerifierRequired).toBe(true);
    expect(protocol.evidenceRequirements).toHaveLength(6);
    expect(protocol.evidenceRequirements.every((entry) => entry.required)).toBe(true);
  });

  it('enumerates caller, byte, signature, self-signed, synthetic, and historical insufficiency rules', () => {
    const protocol = materializeSquareBroadFangExternalWitnessTrustRootProvisioningProtocolFR156();
    expect(protocol.insufficiencyRules.callerSuppliedTrustRootRefMeansGovernedTrustRoot).toBe(false);
    expect(protocol.insufficiencyRules.callerSuppliedPublicKeyMeansPinnedTrustRoot).toBe(false);
    expect(protocol.insufficiencyRules.trustRootArtifactByteDigestMatchMeansAuthorityIdentityVerified).toBe(false);
    expect(protocol.insufficiencyRules.trustRootArtifactByteDigestMatchMeansSemanticContentVerified).toBe(false);
    expect(protocol.insufficiencyRules.mathematicalSignatureValidityMeansTrustedRootOrWitness).toBe(false);
    expect(protocol.insufficiencyRules.selfSignedCredentialMeansExternalTrustRoot).toBe(false);
    expect(protocol.insufficiencyRules.syntheticCredentialMeansExternalTrustRoot).toBe(false);
    expect(protocol.insufficiencyRules.claimedIssuerRefMeansIssuerIdentityVerified).toBe(false);
    expect(protocol.insufficiencyRules.opaquePolicyRefMeansPolicyVerified).toBe(false);
    expect(protocol.insufficiencyRules.fr154MechanicalSignatureMeansTrustedWitness).toBe(false);
    expect(protocol.insufficiencyRules.fr155CandidateTrustEvidenceMeansSignerTrustEstablished).toBe(false);
    expect(protocol.insufficiencyRules.fr155CandidateBundleMeansGovernedTrustRootExists).toBe(false);
    expect(protocol.insufficiencyRules.historicalFR146OrFR147EvidenceEligibleForTrustRootSubstitution).toBe(false);
    for (const requirement of protocol.evidenceRequirements) {
      expect(requirement.satisfiedByCallerSuppliedReferenceAlone).toBe(false);
      expect(requirement.satisfiedByCallerSuppliedKeyAlone).toBe(false);
      expect(requirement.satisfiedByByteDigestMatchAlone).toBe(false);
      expect(requirement.satisfiedByMathematicalSignatureValidityAlone).toBe(false);
      expect(requirement.satisfiedBySelfSignedOrSyntheticCredentialAlone).toBe(false);
      expect(requirement.satisfiedByFR154OrFR155CandidateEvidenceAlone).toBe(false);
    }
  });

  it('keeps trust, empirical, construct, repeatability, privacy, and semantic authority closed', () => {
    const protocol = materializeSquareBroadFangExternalWitnessTrustRootProvisioningProtocolFR156();
    expect(protocol.trustBoundary.productionWitnessVerificationAlgorithm).toBeNull();
    expect(protocol.trustBoundary.pinnedWitnessTrustRootRef).toBeNull();
    expect(protocol.trustBoundary.externalTrustRootProvisioned).toBe(false);
    expect(protocol.trustBoundary.governedWitnessTrustRootEstablished).toBe(false);
    expect(protocol.trustBoundary.trustRootAuthorityIdentityVerified).toBe(false);
    expect(protocol.trustBoundary.trustRootArtifactSemanticContentVerified).toBe(false);
    expect(protocol.trustBoundary.trustRootKeyPinnedByExternalGovernance).toBe(false);
    expect(protocol.trustBoundary.semanticTrustEvidenceVerificationPerformed).toBe(false);
    expect(protocol.trustBoundary.trustEvidenceIssuerIdentityVerified).toBe(false);
    expect(protocol.trustBoundary.trustEvidenceIssuerTrusted).toBe(false);
    expect(protocol.trustBoundary.signerToWitnessAuthorityBindingVerified).toBe(false);
    expect(protocol.trustBoundary.signerKeyTrustEstablished).toBe(false);
    expect(protocol.trustBoundary.witnessAuthorityTrustBound).toBe(false);
    expect(protocol.trustBoundary.externalWitnessIdentityVerified).toBe(false);
    expect(protocol.trustBoundary.independentSessionEvidenceCanBeAdmittedByThisArtifact).toBe(false);

    expect(protocol.authorityBoundary.externalTrustRootProvisioningProtocolFrozen).toBe(true);
    expect(protocol.authorityBoundary.externalTrustRootMaterializationPerformed).toBe(false);
    expect(protocol.authorityBoundary.semanticTrustEvidenceVerificationPerformed).toBe(false);
    expect(protocol.authorityBoundary.independentMultiSessionEvidenceAcquired).toBe(false);
    expect(protocol.authorityBoundary.independentMultiSessionEvidenceAdmitted).toBe(false);
    expect(protocol.authorityBoundary.multiSessionIndependenceVerified).toBe(false);
    expect(protocol.authorityBoundary.captureQualityMeasurementConstructValidated).toBe(false);
    expect(protocol.authorityBoundary.captureQualityThresholdsDefined).toBe(false);
    expect(protocol.authorityBoundary.captureQualityValidated).toBe(false);
    expect(protocol.authorityBoundary.repeatabilityInterpretationAllowed).toBe(false);
    expect(protocol.authorityBoundary.empiricalRepeatabilityEstablished).toBe(false);
    expect(protocol.authorityBoundary.numericCaptureQualityThreshold).toBeNull();
    expect(protocol.authorityBoundary.numericRepeatabilityAcceptanceThreshold).toBeNull();

    expect(protocol.privacyBoundary.rawImageAcceptedByThisArtifact).toBe(false);
    expect(protocol.privacyBoundary.sourceDigestAcceptedByThisArtifact).toBe(false);
    expect(protocol.privacyBoundary.trustRootArtifactBytesAcceptedByThisProtocolArtifact).toBe(false);
    expect(protocol.privacyBoundary.trustRootArtifactBytesPersisted).toBe(false);
    expect(protocol.semanticAuthority.constructValidity).toBe('unresolved');
    expect(protocol.semanticAuthority.traditionalBinding).toBe('unresolved');
    expect(protocol.semanticAuthority.criterionState).toBeNull();
    expect(protocol.semanticAuthority.structuredClaim).toBeNull();
    expect(protocol.semanticAuthority.boundedNarrative).toBeNull();
    expect(protocol.traditionalSemanticAuthority).toBe(false);
  });

  it('rejects copied protocol objects at the issued-object boundary', () => {
    const issued = materializeSquareBroadFangExternalWitnessTrustRootProvisioningProtocolFR156();
    expect(() => assertIssuedSquareBroadFangExternalWitnessTrustRootProvisioningProtocolFR156({ ...issued })).toThrow(
      /not issued by the active FR-156 boundary/i,
    );
  });
});