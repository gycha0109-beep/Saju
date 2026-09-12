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
import { issueEyePairC2paProductionVerifierRuntimeIntegrationFR172 } from './eye-pair-c2pa-production-verifier-runtime-integration-fr172.js';
import {
  FR173_MAX_PARTICIPANT_MEDIA_BYTES,
  FR173_NEXT_FRONTIER,
  FR173_REQUIRED_MEDIA_OBJECT_COUNT,
  FR173_REQUIRED_MEDIA_TYPE,
  FR173_REQUIRED_TRANSPORT_ENCODING,
  assessParticipantMediaIngressMetadataFR173,
  assertIssuedEyePairGovernedParticipantMediaIngressPolicyFR173,
  getEyePairGovernedParticipantMediaIngressPolicyContractFR173,
  issueEyePairGovernedParticipantMediaIngressPolicyFR173,
  type ParticipantMediaIngressMetadataFR173V1,
} from './eye-pair-governed-participant-media-ingress-policy-fr173.js';

function liveBytes(): { trustList: Uint8Array; products: Uint8Array } | null {
  const trustListPath = process.env.FR170_C2PA_TRUST_LIST_JSON_PATH;
  const productsPath = process.env.FR170_C2PA_CONFORMING_PRODUCTS_JSON_PATH;
  if (!trustListPath || !productsPath) return null;
  return {
    trustList: readFileSync(trustListPath),
    products: readFileSync(productsPath),
  };
}

function issueFR172(trustList: Uint8Array, products: Uint8Array) {
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
  const fr171 = issueEyePairC2paWitnessCredentialAdmissionReadinessFR171(fr170);
  return issueEyePairC2paProductionVerifierRuntimeIntegrationFR172(fr171);
}

function validMetadata(
  overrides: Partial<ParticipantMediaIngressMetadataFR173V1> = {},
): ParticipantMediaIngressMetadataFR173V1 {
  return {
    schemaVersion: 'fr173-participant-media-ingress-metadata-v1',
    mediaObjectCount: 1,
    contentType: 'image/jpeg',
    transportEncoding: 'raw-binary',
    observedByteLength: 1_024,
    ...overrides,
  };
}

describe('FR173 eye-pair governed participant media ingress resource policy', () => {
  it('freezes 32 MiB as an application operational ceiling rather than biometric or C2PA authority', () => {
    const contract = getEyePairGovernedParticipantMediaIngressPolicyContractFR173();
    expect(contract.maximumParticipantMediaBytes).toBe(33_554_432);
    expect(contract.maximumParticipantMediaBytes).toBe(FR173_MAX_PARTICIPANT_MEDIA_BYTES);
    expect(contract.maximumParticipantMediaMiB).toBe(32);
    expect(contract.requiredMediaType).toBe(FR173_REQUIRED_MEDIA_TYPE);
    expect(contract.requiredMediaObjectCount).toBe(FR173_REQUIRED_MEDIA_OBJECT_COUNT);
    expect(contract.requiredTransportEncoding).toBe(FR173_REQUIRED_TRANSPORT_ENCODING);
    expect(contract.preVerificationMutationAllowed).toBe(false);
    expect(contract.sanitizedDerivativeAllowedOnlyAfterExactByteVerification).toBe(true);
    expect(contract.participantWitnessAuthorityEstablishedByThisArtifact).toBe(false);
    expect(contract.issue492AuthorityClosureAllowedByThisArtifact).toBe(false);
    expect(contract.nextFrontier).toBe(FR173_NEXT_FRONTIER);
  });

  it('issues only from the active FR172 runtime integration and keeps participant authority false', () => {
    const live = liveBytes();
    if (live === null) return;
    const fr173 = issueEyePairGovernedParticipantMediaIngressPolicyFR173(
      issueFR172(live.trustList, live.products),
    );
    assertIssuedEyePairGovernedParticipantMediaIngressPolicyFR173(fr173);

    expect(fr173.resourcePolicy.productionIngressByteLimitResolved).toBe(true);
    expect(fr173.resourcePolicy.maximumParticipantMediaBytes).toBe(33_554_432);
    expect(fr173.resourcePolicy.inheritedFromCalculationJsonLimit).toBe(false);
    expect(fr173.resourcePolicy.derivedFromC2paSpecification).toBe(false);
    expect(fr173.resourcePolicy.derivedFromProofmodeSpecification).toBe(false);
    expect(fr173.resourcePolicy.derivedFromParticipantEmpiricalData).toBe(false);
    expect(fr173.resourcePolicy.biometricThreshold).toBe(false);
    expect(fr173.exactByteVerificationOrdering.exifStripBeforeC2paVerificationAllowed).toBe(false);
    expect(fr173.exactByteVerificationOrdering.recompressionBeforeC2paVerificationAllowed).toBe(false);
    expect(fr173.temporaryResourceBoundary.temporaryFileCleanupRequiredOnSuccess).toBe(true);
    expect(fr173.temporaryResourceBoundary.temporaryFileCleanupRequiredOnFailure).toBe(true);
    expect(fr173.implementationReadiness.genuineParticipantCredentialSupplied).toBe(false);
    expect(fr173.implementationReadiness.participantVerifierExecutionAttempted).toBe(false);
    expect(fr173.authorityBoundary.actualWitnessCredentialAdmitted).toBe(false);
    expect(fr173.authorityBoundary.independentSessionEvidenceAdmitted).toBe(false);
    expect(fr173.authorityBoundary.identityMatchingPerformed).toBe(false);
    expect(fr173.authorityBoundary.biometricTemplateIssued).toBe(false);
    expect(fr173.authorityBoundary.traditionalSemanticAuthority).toBe(false);
  });

  it('rejects a cloned FR172 predecessor', () => {
    const live = liveBytes();
    if (live === null) return;
    const issued = issueFR172(live.trustList, live.products);
    const clone = { ...issued };
    expect(() => issueEyePairGovernedParticipantMediaIngressPolicyFR173(clone)).toThrow(
      /FR-172 runtime integration artifact was not issued by the active FR-172 boundary/u,
    );
  });

  it('accepts raw JPEG metadata up to and including the 32 MiB ceiling without granting authority', () => {
    const live = liveBytes();
    if (live === null) return;
    const policy = issueEyePairGovernedParticipantMediaIngressPolicyFR173(
      issueFR172(live.trustList, live.products),
    );

    const withoutDeclared = assessParticipantMediaIngressMetadataFR173(policy, validMetadata());
    expect(withoutDeclared.acceptedByResourcePolicy).toBe(true);
    expect(withoutDeclared.declaredContentLengthPresent).toBe(false);
    expect(withoutDeclared.declaredContentLengthMatchedObservedBytes).toBeNull();
    expect(withoutDeclared.participantWitnessAuthorityEstablished).toBe(false);

    const atLimit = assessParticipantMediaIngressMetadataFR173(
      policy,
      validMetadata({
        declaredContentLength: FR173_MAX_PARTICIPANT_MEDIA_BYTES,
        observedByteLength: FR173_MAX_PARTICIPANT_MEDIA_BYTES,
      }),
    );
    expect(atLimit.acceptedByResourcePolicy).toBe(true);
    expect(atLimit.observedByteLength).toBe(33_554_432);
    expect(atLimit.declaredContentLengthMatchedObservedBytes).toBe(true);
    expect(atLimit.exactBytesMayProceedToPinnedVerifierWithoutMutation).toBe(true);
  });

  it.each([
    ['zero observed bytes', validMetadata({ observedByteLength: 0 }), /must be non-empty/u],
    [
      'oversized observed bytes',
      validMetadata({ observedByteLength: FR173_MAX_PARTICIPANT_MEDIA_BYTES + 1 }),
      /exceeds the governed 32 MiB/u,
    ],
    ['wrong media type', validMetadata({ contentType: 'image/png' }), /contentType must be image\/jpeg/u],
    [
      'base64 JSON transport',
      validMetadata({ transportEncoding: 'base64-json' }),
      /transportEncoding must be raw-binary/u,
    ],
    ['multiple media objects', validMetadata({ mediaObjectCount: 2 }), /exactly 1 media object/u],
    [
      'negative declared length',
      validMetadata({ declaredContentLength: -1 }),
      /declaredContentLength must be non-negative/u,
    ],
    [
      'fractional declared length',
      validMetadata({ declaredContentLength: 1.5 }),
      /declaredContentLength must be a safe integer/u,
    ],
    [
      'unsafe declared length',
      validMetadata({ declaredContentLength: Number.MAX_SAFE_INTEGER + 1 }),
      /declaredContentLength must be a safe integer/u,
    ],
    [
      'oversized declared length',
      validMetadata({
        declaredContentLength: FR173_MAX_PARTICIPANT_MEDIA_BYTES + 1,
        observedByteLength: 1_024,
      }),
      /declared participant media exceeds the governed 32 MiB/u,
    ],
    [
      'declared and observed mismatch',
      validMetadata({ declaredContentLength: 1_023, observedByteLength: 1_024 }),
      /must match the actually observed participant media bytes/u,
    ],
    [
      'fractional observed length',
      validMetadata({ observedByteLength: 1.5 }),
      /observedByteLength must be a safe integer/u,
    ],
  ])('fails closed for %s', (_label, input, expected) => {
    const live = liveBytes();
    if (live === null) return;
    const policy = issueEyePairGovernedParticipantMediaIngressPolicyFR173(
      issueFR172(live.trustList, live.products),
    );
    expect(() => assessParticipantMediaIngressMetadataFR173(policy, input)).toThrow(expected);
  });
});
