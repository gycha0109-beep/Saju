import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { issueEyePairExternalSessionProvenanceTrustRequirementsFR167 } from './eye-pair-external-session-provenance-trust-requirements-fr167.js';
import {
  computeEyePairExternalTrustRootArtifactDigestFR168,
  materializeEyePairExternalTrustRootCandidateMaterialIntakeFR168,
} from './eye-pair-external-trust-root-candidate-material-intake-fr168.js';
import { issueEyePairExternalGovernanceTrustRootAdmissionRequirementsFR169 } from './eye-pair-external-governance-trust-root-admission-requirements-fr169.js';
import {
  FR170_C2PA_AUTHORITY_REF,
  FR170_C2PA_CONFORMING_PRODUCTS_BLOB_SHA,
  FR170_C2PA_EXTERNAL_COMMIT,
  FR170_C2PA_EXTERNAL_REPOSITORY,
  FR170_C2PA_TRUST_LIST_ARTIFACT_REF,
  FR170_C2PA_TRUST_LIST_JSON_BLOB_SHA,
  FR170_C2PA_TRUST_ROOT_CANDIDATE_REF,
  FR170_NEXT_FRONTIER,
  assertIssuedEyePairC2paExternalTrustRootProvisioningFR170,
  computeGitBlobShaFR170,
  getEyePairC2paExternalTrustRootProvisioningContractFR170,
  issueEyePairC2paExternalTrustRootProvisioningFR170,
} from './eye-pair-c2pa-external-trust-root-provisioning-fr170.js';

function makeFR169(trustListBytes: Uint8Array, usePinnedCoordinates = true) {
  const fr167 = issueEyePairExternalSessionProvenanceTrustRequirementsFR167();
  const fr168 = materializeEyePairExternalTrustRootCandidateMaterialIntakeFR168({
    schemaVersion: 'fr168-eye-pair-external-trust-root-candidate-material-intake-request-v1',
    fr167Requirements: fr167,
    candidate: {
      trustRootCandidateRef: usePinnedCoordinates
        ? FR170_C2PA_TRUST_ROOT_CANDIDATE_REF
        : 'caller:untrusted-root-candidate',
      trustRootAuthorityRef: usePinnedCoordinates ? FR170_C2PA_AUTHORITY_REF : 'caller:untrusted-authority',
      trustRootArtifactRef: usePinnedCoordinates
        ? FR170_C2PA_TRUST_LIST_ARTIFACT_REF
        : 'caller:untrusted-root-artifact',
      trustRootClassClaim:
        'eye_pair_external_governance_trust_root_artifact_candidate_not_semantically_verified',
      declaredTrustRootArtifactDigest: computeEyePairExternalTrustRootArtifactDigestFR168(trustListBytes),
      trustRootArtifactBytes: trustListBytes,
      trustRootPolicyRef: 'c2pa:conformance-program:trust-list-policy',
      trustRootValidityPolicyRef: 'c2pa:trust-list:issue-next-update-window',
      trustRootRevocationStatusPolicyRef: 'c2pa:trust-list:service-status',
      signerChainPolicyRef: 'c2pa:content-credentials:claim-signing-chain',
      semanticTrustEvidenceVerifierRef: 'c2pa:content-credentials:validator',
      authorityIdentityEvidenceRef: 'c2pa:official-conformance-program:public-repository',
      externalKeyPinningEvidenceRef: 'c2pa:official-trust-list:immutable-snapshot',
      eyePairCriterionScopeEvidenceRef: 'saju:face-reading:eye-pair:prospective-c2pa-path',
      witnessAuthorityScopeEvidenceRef: 'c2pa:conforming-generator:proofmode',
      prospectiveValidityBindingEvidenceRef: 'saju:fr170:prospective-only-after-governance-pin',
      captureToWitnessBindingPolicyRef: 'c2pa:content-credentials:asset-content-binding',
    },
  });
  return issueEyePairExternalGovernanceTrustRootAdmissionRequirementsFR169(fr168);
}

function liveBytes(): { trustList: Uint8Array; products: Uint8Array } | null {
  const trustListPath = process.env.FR170_C2PA_TRUST_LIST_JSON_PATH;
  const productsPath = process.env.FR170_C2PA_CONFORMING_PRODUCTS_JSON_PATH;
  if (!trustListPath || !productsPath) return null;
  return {
    trustList: readFileSync(trustListPath),
    products: readFileSync(productsPath),
  };
}

describe('FR170 eye-pair C2PA external trust-root provisioning', () => {
  it('pins immutable C2PA governance coordinates and keeps participant authority fail-closed by contract', () => {
    const contract = getEyePairC2paExternalTrustRootProvisioningContractFR170();
    expect(contract.externalRepository).toBe(FR170_C2PA_EXTERNAL_REPOSITORY);
    expect(contract.externalCommit).toBe(FR170_C2PA_EXTERNAL_COMMIT);
    expect(contract.trustListBlobSha).toBe(FR170_C2PA_TRUST_LIST_JSON_BLOB_SHA);
    expect(contract.conformingProductsBlobSha).toBe(FR170_C2PA_CONFORMING_PRODUCTS_BLOB_SHA);
    expect(contract.issuedFR169RequirementsRequired).toBe(true);
    expect(contract.exactImmutableExternalSnapshotRequired).toBe(true);
    expect(contract.semanticTrustRootVerificationRequired).toBe(true);
    expect(contract.proofmodeConformingGeneratorProfileRequired).toBe(true);
    expect(contract.actualTrustRootProvisioningAllowedAfterSuccessfulExternalChecks).toBe(true);
    expect(contract.participantWitnessCredentialAdmittedByThisArtifact).toBe(false);
    expect(contract.existingSessionsRetrospectivelyPromotable).toBe(false);
    expect(contract.newProspectiveContentCredentialCaptureRequiredNext).toBe(true);
    expect(contract.nextFrontier).toBe(FR170_NEXT_FRONTIER);
  });

  it('rejects caller-controlled predecessor coordinates before external bytes can bootstrap trust', () => {
    const synthetic = Uint8Array.from([123, 125]);
    const fr169 = makeFR169(synthetic, false);
    expect(() => issueEyePairC2paExternalTrustRootProvisioningFR170({
      schemaVersion: 'fr170-eye-pair-c2pa-external-trust-root-provisioning-request-v1',
      fr169Requirements: fr169,
      c2paTrustListJsonBytes: synthetic,
      c2paConformingProductsJsonBytes: synthetic,
    })).toThrow(/not bound to the pinned C2PA external-governance candidate coordinates/u);
  });

  it('rejects synthetic/project-generated bytes even when the predecessor uses pinned-looking refs', () => {
    const synthetic = Uint8Array.from([123, 34, 76, 111, 84, 69, 34, 58, 123, 125, 125]);
    const fr169 = makeFR169(synthetic);
    expect(() => issueEyePairC2paExternalTrustRootProvisioningFR170({
      schemaVersion: 'fr170-eye-pair-c2pa-external-trust-root-provisioning-request-v1',
      fr169Requirements: fr169,
      c2paTrustListJsonBytes: synthetic,
      c2paConformingProductsJsonBytes: synthetic,
    })).toThrow(/do not match the pinned immutable Git blob/u);
  });

  it('rejects a cloned FR169 artifact rather than trusting structurally valid caller data', () => {
    const synthetic = Uint8Array.from([123, 125]);
    const issued = makeFR169(synthetic);
    const clone = { ...issued };
    expect(() => issueEyePairC2paExternalTrustRootProvisioningFR170({
      schemaVersion: 'fr170-eye-pair-c2pa-external-trust-root-provisioning-request-v1',
      fr169Requirements: clone,
      c2paTrustListJsonBytes: synthetic,
      c2paConformingProductsJsonBytes: synthetic,
    })).toThrow(/FR-169 admission requirements artifact was not issued by the active FR-169 boundary/u);
  });

  it('provisions only from the exact live immutable C2PA snapshot when dedicated CI supplies it', () => {
    const live = liveBytes();
    if (live === null) return;

    expect(computeGitBlobShaFR170(live.trustList)).toBe(FR170_C2PA_TRUST_LIST_JSON_BLOB_SHA);
    expect(computeGitBlobShaFR170(live.products)).toBe(FR170_C2PA_CONFORMING_PRODUCTS_BLOB_SHA);

    const result = issueEyePairC2paExternalTrustRootProvisioningFR170({
      schemaVersion: 'fr170-eye-pair-c2pa-external-trust-root-provisioning-request-v1',
      fr169Requirements: makeFR169(live.trustList),
      c2paTrustListJsonBytes: live.trustList,
      c2paConformingProductsJsonBytes: live.products,
    });
    assertIssuedEyePairC2paExternalTrustRootProvisioningFR170(result);

    expect(result.externalGovernanceSnapshot.exactTrustListGitBlobIdentityVerified).toBe(true);
    expect(result.externalGovernanceSnapshot.exactConformingProductsGitBlobIdentityVerified).toBe(true);
    expect(result.semanticVerification.trustedServiceCount).toBeGreaterThan(0);
    expect(result.semanticVerification.parseableTrustedCertificateCount).toBeGreaterThan(0);
    expect(result.semanticVerification.caCertificateCount).toBeGreaterThan(0);
    expect(result.semanticVerification.supportedPublicKeyCertificateCount)
      .toBe(result.semanticVerification.parseableTrustedCertificateCount);
    expect(result.semanticVerification.proofmodeAndroidConformingGeneratorVerified).toBe(true);
    expect(result.semanticVerification.proofmodeIosConformingGeneratorVerified).toBe(true);
    expect(result.trustBoundary.actualExternalGovernanceVerificationPerformed).toBe(true);
    expect(result.trustBoundary.actualTrustRootProvisioned).toBe(true);
    expect(result.trustBoundary.governedWitnessTrustRootEstablished).toBe(true);
    expect(result.trustBoundary.pinnedWitnessTrustRootRef).toBe(FR170_C2PA_TRUST_LIST_ARTIFACT_REF);

    expect(result.trustBoundary.actualWitnessCredentialAdmitted).toBe(false);
    expect(result.trustBoundary.captureToWitnessBindingVerifiedForParticipantMedia).toBe(false);
    expect(result.trustBoundary.signerKeyTrustEstablishedForParticipantMedia).toBe(false);
    expect(result.trustBoundary.externalWitnessAuthorityEstablishedForParticipantMedia).toBe(false);
    expect(result.authorityBoundary.externalWitnessAuthorityEstablished).toBe(false);
    expect(result.authorityBoundary.independentSessionEvidenceAdmitted).toBe(false);
    expect(result.authorityBoundary.empiricalRepeatabilityEstablished).toBe(false);
    expect(result.authorityBoundary.identityMatchingPerformed).toBe(false);
    expect(result.authorityBoundary.biometricTemplateIssued).toBe(false);
    expect(result.authorityBoundary.traditionalSemanticAuthority).toBe(false);
    expect(result.prospectiveCollectionBoundary.existingFR163ToFR165SessionsRetrospectivelyPromotable).toBe(false);
    expect(result.prospectiveCollectionBoundary.newParticipantCaptureRequiredForNextAuthorityStep).toBe(true);
    expect(result.nextFrontier).toBe(FR170_NEXT_FRONTIER);
  });
});
