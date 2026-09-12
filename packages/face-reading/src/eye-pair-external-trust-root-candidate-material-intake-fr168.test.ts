import { describe, expect, it } from 'vitest';
import {
  FR168_NEXT_FRONTIER,
  assertIssuedEyePairExternalTrustRootCandidateMaterialIntakeFR168,
  computeEyePairExternalTrustRootArtifactDigestFR168,
  getEyePairExternalTrustRootCandidateMaterialIntakeContractFR168,
  materializeEyePairExternalTrustRootCandidateMaterialIntakeFR168,
  type EyePairExternalTrustRootCandidateMaterialIntakeRequestFR168V1,
} from './eye-pair-external-trust-root-candidate-material-intake-fr168.js';
import {
  issueEyePairExternalSessionProvenanceTrustRequirementsFR167,
  type EyePairExternalSessionProvenanceTrustRequirementsFR167V1,
} from './eye-pair-external-session-provenance-trust-requirements-fr167.js';

function makeRequest(): EyePairExternalTrustRootCandidateMaterialIntakeRequestFR168V1 {
  const bytes = Uint8Array.from([70, 82, 49, 54, 56, 1, 3, 5, 8, 13]);
  return {
    schemaVersion: 'fr168-eye-pair-external-trust-root-candidate-material-intake-request-v1',
    fr167Requirements: issueEyePairExternalSessionProvenanceTrustRequirementsFR167(),
    candidate: {
      trustRootCandidateRef: 'trust-root-candidate:fr168:synthetic:001',
      trustRootAuthorityRef: 'trust-root-authority:fr168:synthetic:001',
      trustRootArtifactRef: 'trust-root-artifact:fr168:synthetic:001',
      trustRootClassClaim:
        'eye_pair_external_governance_trust_root_artifact_candidate_not_semantically_verified',
      declaredTrustRootArtifactDigest: computeEyePairExternalTrustRootArtifactDigestFR168(bytes),
      trustRootArtifactBytes: bytes,
      trustRootPolicyRef: 'trust-root-policy:fr168:synthetic:001',
      trustRootValidityPolicyRef: 'trust-root-validity-policy:fr168:synthetic:001',
      trustRootRevocationStatusPolicyRef: 'trust-root-revocation-policy:fr168:synthetic:001',
      signerChainPolicyRef: 'signer-chain-policy:fr168:synthetic:001',
      semanticTrustEvidenceVerifierRef: 'semantic-trust-verifier:fr168:synthetic:001',
      authorityIdentityEvidenceRef: 'authority-identity-evidence:fr168:synthetic:001',
      externalKeyPinningEvidenceRef: 'external-key-pinning-evidence:fr168:synthetic:001',
      eyePairCriterionScopeEvidenceRef: 'eye-pair-scope-evidence:fr168:synthetic:001',
      witnessAuthorityScopeEvidenceRef: 'witness-authority-scope-evidence:fr168:synthetic:001',
      prospectiveValidityBindingEvidenceRef: 'prospective-validity-binding:fr168:synthetic:001',
      captureToWitnessBindingPolicyRef: 'capture-witness-binding-policy:fr168:synthetic:001',
    },
  };
}

describe('FR168 eye-pair external trust-root candidate material intake', () => {
  it('defines candidate byte intake without claiming format, scope, governance, trust, or independent-session authority', () => {
    const contract = getEyePairExternalTrustRootCandidateMaterialIntakeContractFR168();

    expect(contract.issuedFR167RequirementsRequired).toBe(true);
    expect(contract.candidateMaterialPresentRequired).toBe(true);
    expect(contract.trustRootArtifactBytesRequiredAtIntake).toBe(true);
    expect(contract.trustRootArtifactDeclaredDigestExactMatchRequired).toBe(true);
    expect(contract.trustRootArtifactBytesRetainedInOutput).toBe(false);
    expect(contract.candidateTrustRootFormatSemanticallyParsedByThisArtifact).toBe(false);
    expect(contract.candidateKeyFormatSupportEstablishedByThisArtifact).toBe(false);
    expect(contract.candidateScopeCompatibilityVerifiedByThisArtifact).toBe(false);
    expect(contract.byteDigestMatchMeansSemanticContentVerified).toBe(false);
    expect(contract.byteDigestMatchMeansExternalTrustRootProvisioned).toBe(false);
    expect(contract.eyePairScopeEvidenceRefMeansScopeVerified).toBe(false);
    expect(contract.witnessAuthorityScopeEvidenceRefMeansScopeVerified).toBe(false);
    expect(contract.prospectiveValidityBindingEvidenceRefMeansBindingVerified).toBe(false);
    expect(contract.captureToWitnessBindingPolicyRefMeansBindingVerified).toBe(false);
    expect(contract.productionWitnessVerificationAlgorithm).toBeNull();
    expect(contract.pinnedWitnessTrustRootRef).toBeNull();
    expect(contract.actualTrustRootProvisionedByThisArtifact).toBe(false);
    expect(contract.externalWitnessAuthorityEstablishedByThisArtifact).toBe(false);
    expect(contract.independentSessionEvidenceAdmittedByThisArtifact).toBe(false);
    expect(contract.repeatabilityAuthorityEstablishedByThisArtifact).toBe(false);
    expect(contract.nextFrontier).toBe(FR168_NEXT_FRONTIER);
  });

  it('verifies synthetic candidate artifact byte identity while omitting candidate bytes from the issued output', () => {
    const output = materializeEyePairExternalTrustRootCandidateMaterialIntakeFR168(makeRequest());
    assertIssuedEyePairExternalTrustRootCandidateMaterialIntakeFR168(output);

    expect(output.candidateMaterial.trustRootArtifactBytesVerifiedAtIntake).toBe(true);
    expect(output.candidateMaterial.trustRootArtifactDigest).toMatch(/^sha256:[0-9a-f]{64}$/u);
    expect(output.candidateMaterialDigest).toMatch(/^sha256:[0-9a-f]{64}$/u);
    expect('trustRootArtifactBytes' in output.candidateMaterial).toBe(false);
    expect(output.intakeBoundary.candidateMaterialPresent).toBe(true);
    expect(output.intakeBoundary.trustRootArtifactByteIdentityVerified).toBe(true);
    expect(output.intakeBoundary.candidateMaterialCoordinateDigestMaterialized).toBe(true);
    expect(output.privacyBoundary.trustRootArtifactBytesPersistedInOutput).toBe(false);
    expect(output.privacyBoundary.trustRootArtifactDigestPersisted).toBe(true);
  });

  it('keeps candidate coordinates distinct from semantic scope, governance, key pinning, and trust', () => {
    const output = materializeEyePairExternalTrustRootCandidateMaterialIntakeFR168(makeRequest());

    expect(output.intakeBoundary.candidateTrustRootFormatSemanticallyParsed).toBe(false);
    expect(output.intakeBoundary.candidateKeyFormatSupportEstablished).toBe(false);
    expect(output.intakeBoundary.candidateScopeCompatibilityVerified).toBe(false);
    expect(output.candidateMaterial.trustRootAuthorityIdentityVerified).toBe(false);
    expect(output.candidateMaterial.trustRootArtifactSemanticContentVerified).toBe(false);
    expect(output.candidateMaterial.trustRootKeyPinnedByExternalGovernance).toBe(false);
    expect(output.candidateMaterial.eyePairCriterionScopeVerified).toBe(false);
    expect(output.candidateMaterial.witnessAuthorityScopeVerified).toBe(false);
    expect(output.candidateMaterial.prospectiveValidityBindingVerified).toBe(false);
    expect(output.candidateMaterial.captureToWitnessBindingVerified).toBe(false);
    expect(output.candidateMaterial.externalTrustRootProvisioned).toBe(false);

    expect(output.trustBoundary.actualTrustRootProvisioned).toBe(false);
    expect(output.trustBoundary.governedWitnessTrustRootEstablished).toBe(false);
    expect(output.trustBoundary.externalWitnessAuthorityEstablished).toBe(false);
    expect(output.trustBoundary.actualWitnessCredentialAdmitted).toBe(false);
    expect(output.trustBoundary.independentSessionEvidenceCanBeAdmittedByThisArtifact).toBe(false);
  });

  it('preserves prospective-only, empirical, identity, biometric, and traditional-semantic gates', () => {
    const output = materializeEyePairExternalTrustRootCandidateMaterialIntakeFR168(makeRequest());

    expect(output.prospectiveCollectionBoundary.existingFR163ToFR165SessionsRetrospectivelyPromotable).toBe(false);
    expect(output.prospectiveCollectionBoundary.newParticipantCaptureRequiredForCandidateMaterialIntake).toBe(false);
    expect(output.prospectiveCollectionBoundary.authorityPromotableCaptureAllowedAfterCandidateIntakeAlone).toBe(false);
    expect(output.prospectiveCollectionBoundary.candidateIntakeMayBeCompletedWithoutParticipantMaterial).toBe(true);

    expect(output.authorityBoundary.candidateExternalTrustRootMaterialIntakePerformed).toBe(true);
    expect(output.authorityBoundary.actualTrustRootProvisioned).toBe(false);
    expect(output.authorityBoundary.externalWitnessAuthorityEstablished).toBe(false);
    expect(output.authorityBoundary.independentSessionEvidenceAdmitted).toBe(false);
    expect(output.authorityBoundary.multiSessionIndependenceVerified).toBe(false);
    expect(output.authorityBoundary.empiricalRepeatabilityEstablished).toBe(false);
    expect(output.authorityBoundary.captureQualityValidated).toBe(false);
    expect(output.authorityBoundary.repeatabilityPassFailIssued).toBe(false);
    expect(output.authorityBoundary.thresholdsIssued).toBe(false);
    expect(output.authorityBoundary.identityMatchingPerformed).toBe(false);
    expect(output.authorityBoundary.biometricTemplateIssued).toBe(false);
    expect(output.authorityBoundary.constructValidity).toBe('unresolved');
    expect(output.authorityBoundary.traditionalBinding).toBe('unresolved');
    expect(output.authorityBoundary.traditionalSemanticAuthority).toBe(false);

    expect(output.privacyBoundary.rawImageAccepted).toBe(false);
    expect(output.privacyBoundary.participantDerivedNumericMetricInputAccepted).toBe(false);
    expect(output.privacyBoundary.sourceDigestAccepted).toBe(false);
    expect(output.privacyBoundary.faceEmbeddingPersisted).toBe(false);
    expect(output.privacyBoundary.identityTemplatePersisted).toBe(false);
  });

  it('rejects a mismatched declared artifact digest', () => {
    const request = makeRequest();
    const bad = {
      ...request,
      candidate: {
        ...request.candidate,
        declaredTrustRootArtifactDigest: `sha256:${'0'.repeat(64)}`,
      },
    } as EyePairExternalTrustRootCandidateMaterialIntakeRequestFR168V1;

    expect(() => materializeEyePairExternalTrustRootCandidateMaterialIntakeFR168(bad)).toThrow(
      /artifact byte digest mismatch/u,
    );
  });

  it('rejects copied FR167 predecessors, unknown fields, copied outputs, and malformed candidate material', () => {
    const request = makeRequest();
    const copiedRequirements = {
      ...request.fr167Requirements,
    } as EyePairExternalSessionProvenanceTrustRequirementsFR167V1;
    expect(() => materializeEyePairExternalTrustRootCandidateMaterialIntakeFR168({
      ...request,
      fr167Requirements: copiedRequirements,
    })).toThrow(/was not issued by the active FR-167 boundary/u);

    const unknownFieldRequest = {
      ...makeRequest(),
      surpriseAuthority: true,
    } as unknown as EyePairExternalTrustRootCandidateMaterialIntakeRequestFR168V1;
    expect(() => materializeEyePairExternalTrustRootCandidateMaterialIntakeFR168(unknownFieldRequest)).toThrow(
      /must contain exactly the declared fields/u,
    );

    const output = materializeEyePairExternalTrustRootCandidateMaterialIntakeFR168(makeRequest());
    const copiedOutput = { ...output } as typeof output;
    expect(() => assertIssuedEyePairExternalTrustRootCandidateMaterialIntakeFR168(copiedOutput)).toThrow(
      /was not issued by the active FR-168 boundary/u,
    );

    expect(() => computeEyePairExternalTrustRootArtifactDigestFR168(new Uint8Array())).toThrow(/between 1 and/u);
    expect(() => computeEyePairExternalTrustRootArtifactDigestFR168(new Uint8Array(1024 * 1024 + 1))).toThrow(
      /between 1 and/u,
    );

    const malformed = makeRequest();
    const malformedCandidate = {
      ...malformed,
      candidate: {
        ...malformed.candidate,
        eyePairCriterionScopeEvidenceRef: 'not allowed whitespace',
      },
    } as EyePairExternalTrustRootCandidateMaterialIntakeRequestFR168V1;
    expect(() => materializeEyePairExternalTrustRootCandidateMaterialIntakeFR168(malformedCandidate)).toThrow(
      /bounded opaque reference/u,
    );
  });
});
