import { describe, expect, it } from 'vitest';
import {
  FR157_NEXT_FRONTIER,
  assertIssuedSquareBroadFangExternalTrustRootMaterialIntakeFR157,
  computeSquareBroadFangExternalTrustRootArtifactDigestFR157,
  getSquareBroadFangExternalTrustRootMaterialIntakeContractFR157,
  materializeSquareBroadFangExternalTrustRootMaterialIntakeFR157,
  type SquareBroadFangExternalTrustRootMaterialIntakeRequestFR157V1,
} from './five-officers-square-broad-fang-external-trust-root-material-intake-fr157.js';
import {
  materializeSquareBroadFangExternalWitnessTrustRootProvisioningProtocolFR156,
  type SquareBroadFangExternalWitnessTrustRootProvisioningProtocolFR156V1,
} from './five-officers-square-broad-fang-external-witness-trust-root-provisioning-protocol-fr156.js';

function makeRequest(): SquareBroadFangExternalTrustRootMaterialIntakeRequestFR157V1 {
  const bytes = Uint8Array.from([70, 82, 49, 53, 55, 1, 2, 3, 5, 8]);
  return {
    schemaVersion: 'fr157-square-broad-fang-external-trust-root-material-intake-request-v1',
    fr156Protocol: materializeSquareBroadFangExternalWitnessTrustRootProvisioningProtocolFR156(),
    candidate: {
      trustRootCandidateRef: 'trust-root-candidate:fr157:synthetic:001',
      trustRootAuthorityRef: 'trust-root-authority:fr157:synthetic:001',
      trustRootArtifactRef: 'trust-root-artifact:fr157:synthetic:001',
      trustRootClassClaim:
        'external_governance_trust_root_artifact_candidate_not_semantically_verified',
      declaredTrustRootArtifactDigest:
        computeSquareBroadFangExternalTrustRootArtifactDigestFR157(bytes),
      trustRootArtifactBytes: bytes,
      trustRootPolicyRef: 'trust-root-policy:fr157:synthetic:001',
      trustRootValidityPolicyRef: 'trust-root-validity-policy:fr157:synthetic:001',
      trustRootRevocationStatusPolicyRef: 'trust-root-revocation-policy:fr157:synthetic:001',
      signerChainPolicyRef: 'signer-chain-policy:fr157:synthetic:001',
      semanticTrustEvidenceVerifierRef: 'semantic-trust-verifier:fr157:synthetic:001',
      authorityIdentityEvidenceRef: 'authority-identity-evidence:fr157:synthetic:001',
      externalKeyPinningEvidenceRef: 'external-key-pinning-evidence:fr157:synthetic:001',
    },
  };
}

describe('FR157 square broad Fang external trust-root material intake', () => {
  it('defines candidate material intake without external trust-root or independent-session authority', () => {
    const contract = getSquareBroadFangExternalTrustRootMaterialIntakeContractFR157();
    expect(contract.issuedFR156ProtocolRequired).toBe(true);
    expect(contract.trustRootArtifactBytesRequiredAtIntake).toBe(true);
    expect(contract.trustRootArtifactDeclaredDigestExactMatchRequired).toBe(true);
    expect(contract.trustRootArtifactBytesRetainedInOutput).toBe(false);
    expect(contract.callerSuppliedTrustRootAuthorityRefMeansAuthorityIdentityVerified).toBe(false);
    expect(contract.byteDigestMatchMeansSemanticContentVerified).toBe(false);
    expect(contract.byteDigestMatchMeansExternalTrustRootProvisioned).toBe(false);
    expect(contract.opaquePolicyRefMeansPolicyVerified).toBe(false);
    expect(contract.semanticVerifierRefMeansGovernedVerifier).toBe(false);
    expect(contract.externalKeyPinningEvidenceRefMeansKeyPinned).toBe(false);
    expect(contract.productionWitnessVerificationAlgorithm).toBeNull();
    expect(contract.pinnedWitnessTrustRootRef).toBeNull();
    expect(contract.externalTrustRootProvisionedByThisArtifact).toBe(false);
    expect(contract.semanticTrustEvidenceVerificationPerformedByThisArtifact).toBe(false);
    expect(contract.independentSessionEvidenceAdmittedByThisArtifact).toBe(false);
    expect(contract.constructValidationPerformedByThisArtifact).toBe(false);
    expect(contract.thresholdDefinitionPerformedByThisArtifact).toBe(false);
    expect(contract.repeatabilityInterpretationPerformedByThisArtifact).toBe(false);
    expect(contract.nextFrontier).toBe(FR157_NEXT_FRONTIER);
  });

  it('verifies synthetic candidate artifact byte identity while retaining only bounded coordinates and digests', () => {
    const output = materializeSquareBroadFangExternalTrustRootMaterialIntakeFR157(makeRequest());
    assertIssuedSquareBroadFangExternalTrustRootMaterialIntakeFR157(output);

    expect(output.candidateMaterial.trustRootArtifactBytesVerifiedAtIntake).toBe(true);
    expect(output.candidateMaterial.trustRootArtifactDigest).toMatch(/^sha256:[0-9a-f]{64}$/u);
    expect(output.candidateMaterialDigest).toMatch(/^sha256:[0-9a-f]{64}$/u);
    expect('trustRootArtifactBytes' in output.candidateMaterial).toBe(false);
    expect(output.intakeBoundary.trustRootArtifactByteIdentityVerified).toBe(true);
    expect(output.intakeBoundary.candidateMaterialCoordinateDigestMaterialized).toBe(true);
    expect(output.privacyBoundary.trustRootArtifactBytesPersistedInOutput).toBe(false);
    expect(output.privacyBoundary.trustRootArtifactDigestPersisted).toBe(true);
  });

  it('keeps byte identity and opaque references distinct from authority identity, semantic verification, key pinning, and trust', () => {
    const output = materializeSquareBroadFangExternalTrustRootMaterialIntakeFR157(makeRequest());

    expect(output.intakeBoundary.callerSuppliedTrustRootAuthorityRefMeansAuthorityIdentityVerified).toBe(false);
    expect(output.intakeBoundary.callerSuppliedAuthorityIdentityEvidenceRefMeansAuthorityIdentityVerified).toBe(false);
    expect(output.intakeBoundary.trustRootArtifactByteDigestMatchMeansSemanticContentVerified).toBe(false);
    expect(output.intakeBoundary.trustRootArtifactByteDigestMatchMeansExternalTrustRootProvisioned).toBe(false);
    expect(output.intakeBoundary.opaquePolicyRefMeansPolicyVerified).toBe(false);
    expect(output.intakeBoundary.semanticVerifierRefMeansGovernedVerifier).toBe(false);
    expect(output.intakeBoundary.externalKeyPinningEvidenceRefMeansKeyPinned).toBe(false);

    expect(output.candidateMaterial.trustRootAuthorityIdentityVerified).toBe(false);
    expect(output.candidateMaterial.trustRootArtifactSemanticContentVerified).toBe(false);
    expect(output.candidateMaterial.trustRootKeyPinnedByExternalGovernance).toBe(false);
    expect(output.candidateMaterial.trustRootValidityPolicyVerified).toBe(false);
    expect(output.candidateMaterial.trustRootRevocationStatusVerified).toBe(false);
    expect(output.candidateMaterial.signerChainPolicyVerified).toBe(false);
    expect(output.candidateMaterial.semanticTrustEvidenceVerifierGoverned).toBe(false);
    expect(output.candidateMaterial.externalTrustRootProvisioned).toBe(false);

    expect(output.trustBoundary.externalTrustRootProvisioned).toBe(false);
    expect(output.trustBoundary.governedWitnessTrustRootEstablished).toBe(false);
    expect(output.trustBoundary.trustRootAuthorityIdentityVerified).toBe(false);
    expect(output.trustBoundary.trustRootArtifactSemanticContentVerified).toBe(false);
    expect(output.trustBoundary.trustRootKeyPinnedByExternalGovernance).toBe(false);
    expect(output.trustBoundary.semanticTrustEvidenceVerificationPerformed).toBe(false);
    expect(output.trustBoundary.signerKeyTrustEstablished).toBe(false);
    expect(output.trustBoundary.witnessAuthorityTrustBound).toBe(false);
    expect(output.trustBoundary.externalWitnessIdentityVerified).toBe(false);
    expect(output.trustBoundary.independentSessionEvidenceCanBeAdmittedByThisArtifact).toBe(false);
  });

  it('preserves empirical, construct, threshold, repeatability, privacy, and traditional-semantic authority gates', () => {
    const output = materializeSquareBroadFangExternalTrustRootMaterialIntakeFR157(makeRequest());

    expect(output.authorityBoundary.candidateExternalTrustRootMaterialIntakePerformed).toBe(true);
    expect(output.authorityBoundary.externalTrustRootMaterializationPerformed).toBe(false);
    expect(output.authorityBoundary.semanticTrustEvidenceVerificationPerformed).toBe(false);
    expect(output.authorityBoundary.independentMultiSessionEvidenceAcquired).toBe(false);
    expect(output.authorityBoundary.independentMultiSessionEvidenceAdmitted).toBe(false);
    expect(output.authorityBoundary.multiSessionIndependenceVerified).toBe(false);
    expect(output.authorityBoundary.empiricalPerturbationValidationPerformed).toBe(false);
    expect(output.authorityBoundary.captureQualityMeasurementConstructValidated).toBe(false);
    expect(output.authorityBoundary.captureQualityThresholdsDefined).toBe(false);
    expect(output.authorityBoundary.captureQualityValidated).toBe(false);
    expect(output.authorityBoundary.repeatabilityInterpretationAllowed).toBe(false);
    expect(output.authorityBoundary.empiricalRepeatabilityEstablished).toBe(false);
    expect(output.authorityBoundary.repeatabilityClassificationIssued).toBe(false);
    expect(output.authorityBoundary.numericCaptureQualityThreshold).toBeNull();
    expect(output.authorityBoundary.numericRepeatabilityAcceptanceThreshold).toBeNull();

    expect(output.privacyBoundary.rawImageAcceptedByThisArtifact).toBe(false);
    expect(output.privacyBoundary.rawImagePersisted).toBe(false);
    expect(output.privacyBoundary.rawProviderResponsePersisted).toBe(false);
    expect(output.privacyBoundary.rawPixelRasterPersisted).toBe(false);
    expect(output.privacyBoundary.rawAggregatePersisted).toBe(false);
    expect(output.privacyBoundary.sourceDigestAcceptedByThisArtifact).toBe(false);
    expect(output.privacyBoundary.sourceDigestPersisted).toBe(false);
    expect(output.privacyBoundary.sourceDigestReturned).toBe(false);
    expect(output.privacyBoundary.signerPublicKeyPemAcceptedByThisArtifact).toBe(false);
    expect(output.privacyBoundary.signerPublicKeyPemPersisted).toBe(false);
    expect(output.privacyBoundary.detachedSignatureBytesPersisted).toBe(false);
    expect(output.privacyBoundary.embeddingPersisted).toBe(false);
    expect(output.privacyBoundary.identityTemplatePersisted).toBe(false);

    expect(output.semanticAuthority.constructValidity).toBe('unresolved');
    expect(output.semanticAuthority.traditionalBinding).toBe('unresolved');
    expect(output.semanticAuthority.criterionState).toBeNull();
    expect(output.semanticAuthority.structuredClaim).toBeNull();
    expect(output.semanticAuthority.boundedNarrative).toBeNull();
    expect(output.traditionalSemanticAuthority).toBe(false);
  });

  it('rejects a mismatched declared artifact digest', () => {
    const request = makeRequest();
    const bad = {
      ...request,
      candidate: {
        ...request.candidate,
        declaredTrustRootArtifactDigest: `sha256:${'0'.repeat(64)}`,
      },
    } as SquareBroadFangExternalTrustRootMaterialIntakeRequestFR157V1;
    expect(() => materializeSquareBroadFangExternalTrustRootMaterialIntakeFR157(bad)).toThrow(
      /artifact byte digest mismatch/u,
    );
  });

  it('rejects copied predecessors, unknown request fields, and copied outputs', () => {
    const request = makeRequest();
    const copiedProtocol = {
      ...request.fr156Protocol,
    } as SquareBroadFangExternalWitnessTrustRootProvisioningProtocolFR156V1;
    const copiedPredecessorRequest = {
      ...request,
      fr156Protocol: copiedProtocol,
    };
    expect(() => materializeSquareBroadFangExternalTrustRootMaterialIntakeFR157(copiedPredecessorRequest)).toThrow(
      /was not issued by the active FR-156 boundary/u,
    );

    const unknownFieldRequest = {
      ...makeRequest(),
      surpriseAuthority: true,
    } as unknown as SquareBroadFangExternalTrustRootMaterialIntakeRequestFR157V1;
    expect(() => materializeSquareBroadFangExternalTrustRootMaterialIntakeFR157(unknownFieldRequest)).toThrow(
      /must contain exactly the declared fields/u,
    );

    const output = materializeSquareBroadFangExternalTrustRootMaterialIntakeFR157(makeRequest());
    const copiedOutput = { ...output } as typeof output;
    expect(() => assertIssuedSquareBroadFangExternalTrustRootMaterialIntakeFR157(copiedOutput)).toThrow(
      /was not issued by the active FR-157 boundary/u,
    );
  });

  it('rejects empty, oversized, or malformed candidate material', () => {
    expect(() => computeSquareBroadFangExternalTrustRootArtifactDigestFR157(new Uint8Array())).toThrow(
      /between 1 and/u,
    );
    expect(() => computeSquareBroadFangExternalTrustRootArtifactDigestFR157(new Uint8Array(1024 * 1024 + 1))).toThrow(
      /between 1 and/u,
    );

    const request = makeRequest();
    const malformed = {
      ...request,
      candidate: {
        ...request.candidate,
        trustRootAuthorityRef: 'not allowed whitespace',
      },
    } as SquareBroadFangExternalTrustRootMaterialIntakeRequestFR157V1;
    expect(() => materializeSquareBroadFangExternalTrustRootMaterialIntakeFR157(malformed)).toThrow(
      /bounded opaque reference/u,
    );
  });
});
