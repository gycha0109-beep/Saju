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
import { issueEyePairC2paWitnessCredentialAdmissionReadinessFR171 } from './eye-pair-c2pa-witness-credential-admission-readiness-fr171.js';
import {
  FR172_C2PATOOL_LINUX_ARCHIVE_SHA256,
  FR172_C2PATOOL_TAG,
  FR172_C2PATOOL_TARGET_COMMIT,
  FR172_C2PATOOL_VERSION,
  FR172_C2PA_TRUST_LIST_PEM_BLOB_SHA,
  FR172_NEXT_FRONTIER,
  FR172_OFFICIAL_MECHANICS_FIXTURE_BLOB_SHA,
  assessOfficialPublicC2paToolMechanicsFR172,
  assertIssuedEyePairC2paProductionVerifierRuntimeIntegrationFR172,
  getEyePairC2paProductionVerifierRuntimeIntegrationContractFR172,
  issueEyePairC2paProductionVerifierRuntimeIntegrationFR172,
} from './eye-pair-c2pa-production-verifier-runtime-integration-fr172.js';

function liveBytes(): { trustList: Uint8Array; products: Uint8Array } | null {
  const trustListPath = process.env.FR170_C2PA_TRUST_LIST_JSON_PATH;
  const productsPath = process.env.FR170_C2PA_CONFORMING_PRODUCTS_JSON_PATH;
  if (!trustListPath || !productsPath) return null;
  return {
    trustList: readFileSync(trustListPath),
    products: readFileSync(productsPath),
  };
}

function liveMechanicsJson(): unknown | null {
  const path = process.env.FR172_C2PATOOL_OUTPUT_JSON_PATH;
  if (!path) return null;
  return JSON.parse(readFileSync(path, 'utf8')) as unknown;
}

function issueFR171(trustList: Uint8Array, products: Uint8Array) {
  const fr167 = issueEyePairExternalSessionProvenanceTrustRequirementsFR167();
  const fr168 = materializeEyePairExternalTrustRootCandidateMaterialIntakeFR168({
    schemaVersion: 'fr168-eye-pair-external-trust-root-candidate-material-intake-request-v1',
    fr167Requirements: fr167,
    candidate: {
      trustRootCandidateRef: FR170_C2PA_TRUST_ROOT_CANDIDATE_REF,
      trustRootAuthorityRef: FR170_C2PA_AUTHORITY_REF,
      trustRootArtifactRef: FR170_C2PA_TRUST_LIST_ARTIFACT_REF,
      trustRootClassClaim: 'eye_pair_external_governance_trust_root_artifact_candidate_not_semantically_verified',
      declaredTrustRootArtifactDigest: computeEyePairExternalTrustRootArtifactDigestFR168(trustList),
      trustRootArtifactBytes: trustList,
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
  const fr170 = issueEyePairC2paExternalTrustRootProvisioningFR170({
    schemaVersion: 'fr170-eye-pair-c2pa-external-trust-root-provisioning-request-v1',
    fr169Requirements: fr169,
    c2paTrustListJsonBytes: trustList,
    c2paConformingProductsJsonBytes: products,
  });
  return issueEyePairC2paWitnessCredentialAdmissionReadinessFR171(fr170);
}

function mechanicsJson() {
  return {
    active_manifest: 'urn:c2pa:test:active',
    manifests: { 'urn:c2pa:test:active': { title: 'non-participant parser fixture' } },
    validation_state: 'Valid',
    validation_results: {
      activeManifest: {
        success: [{ code: 'claimSignature.validated' }, { code: 'assertion.dataHash.match' }],
        failure: [{ code: 'signingCredential.untrusted' }],
      },
    },
  };
}

describe('FR172 eye-pair C2PA production verifier runtime integration', () => {
  it('pins the official c2patool release and refuses to convert runtime readiness into participant authority', () => {
    const contract = getEyePairC2paProductionVerifierRuntimeIntegrationContractFR172();
    expect(contract.officialVerifierTag).toBe(FR172_C2PATOOL_TAG);
    expect(contract.officialVerifierTargetCommit).toBe(FR172_C2PATOOL_TARGET_COMMIT);
    expect(contract.officialVerifierArchiveSha256).toBe(FR172_C2PATOOL_LINUX_ARCHIVE_SHA256);
    expect(contract.pinnedTrustListPemBlobSha).toBe(FR172_C2PA_TRUST_LIST_PEM_BLOB_SHA);
    expect(contract.callerSuppliedVerifierJsonSufficientForParticipantAuthority).toBe(false);
    expect(contract.publicOrSyntheticMechanicsFixtureSufficientForParticipantAuthority).toBe(false);
    expect(contract.productionIngressByteLimitResolved).toBe(false);
    expect(contract.participantAuthorityExecutionAllowedBeforeGovernedIngressPolicy).toBe(false);
    expect(contract.participantWitnessAuthorityEstablishedByThisArtifact).toBe(false);
    expect(contract.issue492AuthorityClosureAllowedByThisArtifact).toBe(false);
    expect(contract.nextFrontier).toBe(FR172_NEXT_FRONTIER);
  });

  it('issues runtime integration only from the live FR170 -> FR171 chain supplied by dedicated CI', () => {
    const live = liveBytes();
    if (live === null) return;
    const fr172 = issueEyePairC2paProductionVerifierRuntimeIntegrationFR172(issueFR171(live.trustList, live.products));
    assertIssuedEyePairC2paProductionVerifierRuntimeIntegrationFR172(fr172);
    expect(fr172.externalRuntimePin.version).toBe(FR172_C2PATOOL_VERSION);
    expect(fr172.externalRuntimePin.linuxArchiveSha256).toBe(FR172_C2PATOOL_LINUX_ARCHIVE_SHA256);
    expect(fr172.governancePins.trustListPemBlobSha).toBe(FR172_C2PA_TRUST_LIST_PEM_BLOB_SHA);
    expect(fr172.runtimeCapabilities.c2paManifestParserAvailableThroughPinnedRuntime).toBe(true);
    expect(fr172.runtimeCapabilities.signerChainValidatorAvailableThroughPinnedRuntime).toBe(true);
    expect(fr172.runtimeCapabilities.assetContentBindingValidatorAvailableThroughPinnedRuntime).toBe(true);
    expect(fr172.resourceBoundary.productionIngressByteLimitResolved).toBe(false);
    expect(fr172.resourceBoundary.inheritedProductionMediaMaximumBytes).toBeNull();
    expect(fr172.implementationReadiness.productionVerifierRuntimeIntegrationCompleted).toBe(true);
    expect(fr172.implementationReadiness.genuineParticipantCredentialSupplied).toBe(false);
    expect(fr172.implementationReadiness.participantVerifierExecutionAttempted).toBe(false);
    expect(fr172.authorityBoundary.actualWitnessCredentialAdmitted).toBe(false);
    expect(fr172.authorityBoundary.independentSessionEvidenceAdmitted).toBe(false);
    expect(fr172.authorityBoundary.identityMatchingPerformed).toBe(false);
    expect(fr172.authorityBoundary.biometricTemplateIssued).toBe(false);
    expect(fr172.authorityBoundary.traditionalSemanticAuthority).toBe(false);
  });

  it('parses mechanics-shaped JSON without ever promoting it to participant authority', () => {
    const live = liveBytes();
    if (live === null) return;
    const fr172 = issueEyePairC2paProductionVerifierRuntimeIntegrationFR172(issueFR171(live.trustList, live.products));
    const assessment = assessOfficialPublicC2paToolMechanicsFR172(fr172, {
      schemaVersion: 'fr172-c2patool-public-mechanics-observation-v1',
      evidenceClass: 'official_public_c2pa_fixture_mechanics_only',
      c2patoolVersion: FR172_C2PATOOL_VERSION,
      fixtureBlobSha: FR172_OFFICIAL_MECHANICS_FIXTURE_BLOB_SHA,
      validationJson: mechanicsJson(),
    });
    expect(assessment.activeManifestPresent).toBe(true);
    expect(assessment.successStatusCodes).toContain('assertion.dataHash.match');
    expect(assessment.failureStatusCodes).toContain('signingCredential.untrusted');
    expect(assessment.participantAuthorityEstablished).toBe(false);
  });

  it('routes the exact live c2patool output from the official public fixture through the FR172 parser', () => {
    const live = liveBytes();
    const validationJson = liveMechanicsJson();
    if (live === null || validationJson === null) return;
    const fr172 = issueEyePairC2paProductionVerifierRuntimeIntegrationFR172(issueFR171(live.trustList, live.products));
    const assessment = assessOfficialPublicC2paToolMechanicsFR172(fr172, {
      schemaVersion: 'fr172-c2patool-public-mechanics-observation-v1',
      evidenceClass: 'official_public_c2pa_fixture_mechanics_only',
      c2patoolVersion: FR172_C2PATOOL_VERSION,
      fixtureBlobSha: FR172_OFFICIAL_MECHANICS_FIXTURE_BLOB_SHA,
      validationJson,
    });
    expect(assessment.officialRuntimeMechanicsObserved).toBe(true);
    expect(assessment.participantAuthorityEstablished).toBe(false);
  });

  it('rejects a cloned FR171 predecessor rather than accepting caller-fabricated readiness', () => {
    const live = liveBytes();
    if (live === null) return;
    const issued = issueFR171(live.trustList, live.products);
    const clone = { ...issued };
    expect(() => issueEyePairC2paProductionVerifierRuntimeIntegrationFR172(clone)).toThrow(
      /FR-171 admission readiness artifact was not issued by the active FR-171 boundary/u,
    );
  });
});
