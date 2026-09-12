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
  FR170_C2PA_TRUST_LIST_ARTIFACT_REF,
  FR170_C2PA_TRUST_ROOT_CANDIDATE_REF,
  issueEyePairC2paExternalTrustRootProvisioningFR170,
} from './eye-pair-c2pa-external-trust-root-provisioning-fr170.js';
import {
  FR171_NEXT_FRONTIER,
  FR171_PROOFMODE_ANDROID_RECORD_ID,
  FR171_PROOFMODE_IOS_RECORD_ID,
  FR171_PROOFMODE_MIN_VERSION,
  assertIssuedEyePairC2paWitnessCredentialAdmissionReadinessFR171,
  getEyePairC2paWitnessCredentialAdmissionReadinessContractFR171,
  issueEyePairC2paWitnessCredentialAdmissionReadinessFR171,
} from './eye-pair-c2pa-witness-credential-admission-readiness-fr171.js';

function liveBytes(): { trustList: Uint8Array; products: Uint8Array } | null {
  const trustListPath = process.env.FR170_C2PA_TRUST_LIST_JSON_PATH;
  const productsPath = process.env.FR170_C2PA_CONFORMING_PRODUCTS_JSON_PATH;
  if (!trustListPath || !productsPath) return null;
  return {
    trustList: readFileSync(trustListPath),
    products: readFileSync(productsPath),
  };
}

function makeLiveFR170() {
  const live = liveBytes();
  if (live === null) return null;

  const fr167 = issueEyePairExternalSessionProvenanceTrustRequirementsFR167();
  const fr168 = materializeEyePairExternalTrustRootCandidateMaterialIntakeFR168({
    schemaVersion: 'fr168-eye-pair-external-trust-root-candidate-material-intake-request-v1',
    fr167Requirements: fr167,
    candidate: {
      trustRootCandidateRef: FR170_C2PA_TRUST_ROOT_CANDIDATE_REF,
      trustRootAuthorityRef: FR170_C2PA_AUTHORITY_REF,
      trustRootArtifactRef: FR170_C2PA_TRUST_LIST_ARTIFACT_REF,
      trustRootClassClaim:
        'eye_pair_external_governance_trust_root_artifact_candidate_not_semantically_verified',
      declaredTrustRootArtifactDigest: computeEyePairExternalTrustRootArtifactDigestFR168(live.trustList),
      trustRootArtifactBytes: live.trustList,
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
  const fr169 = issueEyePairExternalGovernanceTrustRootAdmissionRequirementsFR169(fr168);
  return issueEyePairC2paExternalTrustRootProvisioningFR170({
    schemaVersion: 'fr170-eye-pair-c2pa-external-trust-root-provisioning-request-v1',
    fr169Requirements: fr169,
    c2paTrustListJsonBytes: live.trustList,
    c2paConformingProductsJsonBytes: live.products,
  });
}

describe('FR171 eye-pair C2PA witness credential admission readiness', () => {
  it('freezes a real-evidence-only contract without admitting participant authority', () => {
    const contract = getEyePairC2paWitnessCredentialAdmissionReadinessContractFR171();
    expect(contract.issuedFR170ProvisioningRequired).toBe(true);
    expect(contract.genuinelyNewProspectiveCaptureRequired).toBe(true);
    expect(contract.originalContentCredentialBearingJpegRequired).toBe(true);
    expect(contract.proofmodeAndroidRecordId).toBe(FR171_PROOFMODE_ANDROID_RECORD_ID);
    expect(contract.proofmodeIosRecordId).toBe(FR171_PROOFMODE_IOS_RECORD_ID);
    expect(contract.proofmodeMinimumVersion).toBe(FR171_PROOFMODE_MIN_VERSION);
    expect(contract.embeddedCredentialManifestChainAndAssetBindingVerificationRequired).toBe(true);
    expect(contract.syntheticOrCallerControlledSuccessPathAllowed).toBe(false);
    expect(contract.participantMediaAcceptedByThisReadinessArtifact).toBe(false);
    expect(contract.participantWitnessAuthorityEstablishedByThisReadinessArtifact).toBe(false);
    expect(contract.independentSessionEvidenceAdmittedByThisReadinessArtifact).toBe(false);
    expect(contract.issue492AuthorityClosureAllowedByThisReadinessArtifact).toBe(false);
    expect(contract.nextFrontier).toBe(FR171_NEXT_FRONTIER);
  });

  it('issues readiness only from the actively issued live FR170 trust path and keeps every participant gate false', () => {
    const fr170 = makeLiveFR170();
    if (fr170 === null) return;

    const result = issueEyePairC2paWitnessCredentialAdmissionReadinessFR171(fr170);
    assertIssuedEyePairC2paWitnessCredentialAdmissionReadinessFR171(result);

    expect(result.predecessor.actualTrustRootProvisioned).toBe(true);
    expect(result.requiredRealEvidence.genuinelyNewProspectiveCaptureRequired).toBe(true);
    expect(result.requiredRealEvidence.originalContentCredentialBearingMediaRequired).toBe(true);
    expect(result.requiredRealEvidence.syntheticFixtureSufficient).toBe(false);
    expect(result.requiredRealEvidence.priorFR163ToFR165SessionMediaSufficient).toBe(false);
    expect(result.verificationRequirements.boundedMediaResourcePolicyRequiredBeforeRuntimeAdmission).toBe(true);
    expect(result.verificationRequirements.concreteMediaByteLimitIssuedByThisArtifact).toBe(false);
    expect(result.implementationReadiness.productionVerifierImplementationCompleted).toBe(false);
    expect(result.implementationReadiness.genuineParticipantCredentialSupplied).toBe(false);
    expect(result.implementationReadiness.realAdmissionExecutionAttempted).toBe(false);
    expect(result.implementationReadiness.realAdmissionExecutionSucceeded).toBe(false);
    expect(result.implementationReadiness.issue492AuthorityClosureAllowedByThisArtifact).toBe(false);
    expect(result.trustBoundary.actualWitnessCredentialAdmitted).toBe(false);
    expect(result.trustBoundary.captureToWitnessBindingVerifiedForParticipantMedia).toBe(false);
    expect(result.trustBoundary.signerKeyTrustEstablishedForParticipantMedia).toBe(false);
    expect(result.trustBoundary.externalWitnessAuthorityEstablishedForParticipantMedia).toBe(false);
    expect(result.authorityBoundary.independentSessionEvidenceAdmitted).toBe(false);
    expect(result.authorityBoundary.multiSessionIndependenceVerified).toBe(false);
    expect(result.authorityBoundary.empiricalRepeatabilityEstablished).toBe(false);
    expect(result.authorityBoundary.captureQualityValidated).toBe(false);
    expect(result.authorityBoundary.identityMatchingPerformed).toBe(false);
    expect(result.authorityBoundary.biometricTemplateIssued).toBe(false);
    expect(result.authorityBoundary.traditionalSemanticAuthority).toBe(false);
    expect(result.prospectiveCollectionBoundary.existingFR163ToFR165SessionsRetrospectivelyPromotable).toBe(false);
    expect(result.prospectiveCollectionBoundary.genuinelyNewParticipantCaptureRequiredForAuthorityAdvance).toBe(true);
    expect(result.privacyBoundary.rawParticipantImageAcceptedByThisArtifact).toBe(false);
    expect(result.privacyBoundary.rawContentCredentialAcceptedByThisArtifact).toBe(false);
    expect(result.nextFrontier).toBe(FR171_NEXT_FRONTIER);
  });

  it('rejects a structurally cloned FR170 predecessor even when all fields look valid', () => {
    const fr170 = makeLiveFR170();
    if (fr170 === null) return;

    const clone = { ...fr170 };
    expect(() => issueEyePairC2paWitnessCredentialAdmissionReadinessFR171(clone))
      .toThrow(/artifact was not issued by the active FR-170 boundary/u);
  });
});
