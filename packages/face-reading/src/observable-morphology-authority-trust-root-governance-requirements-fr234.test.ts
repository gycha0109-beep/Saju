import { createHash, generateKeyPairSync, sign } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import {
  materializeExternalWitnessEvidenceFR225,
  verifyPersistedExternalWitnessEvidenceFR225,
  type FR225ExternalWitnessRecordInput,
} from './observable-morphology-external-witness-evidence-fr225.js';
import { inspectExternalEvidenceBytesFR227 } from './observable-morphology-external-evidence-byte-inspection-fr227.js';
import {
  buildWitnessSignatureEnvelopeBytesFR228,
  type FR228DetachedWitnessSignature,
} from './observable-morphology-pinned-key-witness-signatures-fr228.js';
import {
  admitPinnedRegistrarVerifierKeyEnrollmentsFR229,
  buildVerifierKeyEnrollmentCertificateBytesFR229,
  buildVerifierKeyPossessionChallengeBytesFR229,
  type FR229PinnedRegistrarKey,
  type FR229VerifierKeyEnrollment,
} from './observable-morphology-pinned-registrar-key-enrollment-fr229.js';
import { verifyEnrollmentBoundWitnessSignaturesFR230 } from './observable-morphology-enrollment-bound-witness-signatures-fr230.js';
import {
  bindRegistrarKeysToExternalAuthorityAttestationsFR231,
  buildRegistrarAuthorityAttestationBytesFR231,
  type FR231PinnedAuthorityKey,
  type FR231RegistrarAuthorityAttestation,
} from './observable-morphology-external-authority-registrar-attestations-fr231.js';
import { bindWitnessSignaturesToRegistrarAuthorityChainFR232 } from './observable-morphology-authority-chain-bound-witness-signatures-fr232.js';
import {
  computeAuthorityTrustRootArtifactDigestFR233,
  intakeAuthorityTrustRootCandidateMaterialFR233,
} from './observable-morphology-authority-trust-root-candidate-intake-fr233.js';
import {
  assertAuthorityTrustRootGovernanceAdmissionRequirementsFR234,
  issueAuthorityTrustRootGovernanceAdmissionRequirementsFR234,
} from './observable-morphology-authority-trust-root-governance-requirements-fr234.js';

const GATE_HEX = 'f'.repeat(64);
const STUDY_GATE_REF = `evidence.fr224.observable_morphology_study_readiness:${GATE_HEX}`;
const STUDY_GATE_DIGEST = `sha256:${GATE_HEX}`;

function persisted<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function bytes(text: string): Uint8Array {
  return new TextEncoder().encode(text);
}

function sha256(value: Uint8Array): string {
  return `sha256:${createHash('sha256').update(value).digest('hex')}`;
}

function keyPair() {
  const pair = generateKeyPairSync('ed25519');
  const publicDer = pair.publicKey.export({ format: 'der', type: 'spki' }) as Buffer;
  return { publicBase64: publicDer.toString('base64'), privateKey: pair.privateKey };
}

function activeFR233(prefix: string) {
  const evidenceBytes = bytes(`FR234 synthetic witness evidence ${prefix}`);
  const records: FR225ExternalWitnessRecordInput[] = [{
    witnessRef: `witness:fr234:${prefix}`,
    verifierRef: `verifier:fr234:${prefix}`,
    claimType: 'capture_freshness_observed',
    scopeRef: `capture-admission:fr234:${prefix}`,
    verificationMethod: 'supervised_capture_observation',
    observedAt: '2026-09-21T11:00:00.000Z',
    externalEvidenceRef: `external-evidence:fr234:${prefix}`,
    externalEvidenceDigest: sha256(evidenceBytes),
    claimAttested: true,
  }];

  const witnessEvidence = verifyPersistedExternalWitnessEvidenceFR225(
    persisted(materializeExternalWitnessEvidenceFR225({
      studyGateRef: STUDY_GATE_REF,
      studyGateDigest: STUDY_GATE_DIGEST,
      records,
    })),
  );
  const inspection = inspectExternalEvidenceBytesFR227({
    witnessEvidence,
    payloads: [{
      externalEvidenceRef: records[0]!.externalEvidenceRef,
      mediaType: 'text/plain',
      bytes: evidenceBytes,
    }],
  });

  const verifier = keyPair();
  const registrar = keyPair();
  const enrollmentBase = {
    verifierRef: records[0]!.verifierRef,
    keyRef: `verifier-key:fr234:${prefix}`,
    verifierPublicKeySpkiDerBase64: verifier.publicBase64,
    registrarRef: `registrar:fr234:${prefix}`,
    registrarKeyRef: `registrar-key:fr234:${prefix}`,
    certificateRef: `certificate:fr229-for-fr234:${prefix}`,
    enrolledAt: '2026-09-21T10:50:00.000Z',
    validFrom: '2026-09-21T00:00:00.000Z',
    validUntil: '2027-09-21T00:00:00.000Z',
  } as const;
  const verifierPossessionSignatureBase64 = sign(
    null,
    buildVerifierKeyPossessionChallengeBytesFR229(enrollmentBase),
    verifier.privateKey,
  ).toString('base64');
  const registrarSignatureBase64 = sign(
    null,
    buildVerifierKeyEnrollmentCertificateBytesFR229({
      ...enrollmentBase,
      verifierPossessionSignatureBase64,
    }),
    registrar.privateKey,
  ).toString('base64');
  const registrarKey: FR229PinnedRegistrarKey = {
    registrarRef: enrollmentBase.registrarRef,
    registrarKeyRef: enrollmentBase.registrarKeyRef,
    publicKeySpkiDerBase64: registrar.publicBase64,
  };
  const enrollment: FR229VerifierKeyEnrollment = {
    ...enrollmentBase,
    verifierPossessionSignatureBase64,
    registrarSignatureBase64,
  };
  const registry229 = admitPinnedRegistrarVerifierKeyEnrollmentsFR229({
    registrarKeys: [registrarKey],
    enrollments: [enrollment],
  });
  const signatures: FR228DetachedWitnessSignature[] = [{
    witnessRef: records[0]!.witnessRef,
    signatureRef: `signature:fr234:${prefix}`,
    signatureBase64: sign(
      null,
      buildWitnessSignatureEnvelopeBytesFR228({
        witnessEvidence,
        inspection,
        witnessRef: records[0]!.witnessRef,
      }),
      verifier.privateKey,
    ).toString('base64'),
  }];
  const verification230 = verifyEnrollmentBoundWitnessSignaturesFR230({
    witnessEvidence,
    inspection,
    verifierKeyRegistry: registry229,
    verifierKeyMaterials: [{
      verifierRef: enrollment.verifierRef,
      keyRef: enrollment.keyRef,
      publicKeySpkiDerBase64: enrollment.verifierPublicKeySpkiDerBase64,
    }],
    signatures,
  });

  const authority = keyPair();
  const authorityKey: FR231PinnedAuthorityKey = {
    authorityRef: `authority:fr234:${prefix}`,
    authorityKeyRef: `authority-key:fr234:${prefix}`,
    publicKeySpkiDerBase64: authority.publicBase64,
  };
  const registrarReceipt = registry229.receipts[0]!;
  const attestationBase = {
    registrarRef: registrarReceipt.registrarRef,
    registrarKeyRef: registrarReceipt.registrarKeyRef,
    registrarPublicKeyDigest: registrarReceipt.registrarPublicKeyDigest,
    authorityRef: authorityKey.authorityRef,
    authorityKeyRef: authorityKey.authorityKeyRef,
    certificateRef: `certificate:fr231-for-fr234:${prefix}`,
    attestedAt: '2026-09-21T10:55:00.000Z',
    validFrom: '2026-09-21T00:00:00.000Z',
    validUntil: '2027-09-21T00:00:00.000Z',
  } as const;
  const attestation: FR231RegistrarAuthorityAttestation = {
    ...attestationBase,
    authoritySignatureBase64: sign(
      null,
      buildRegistrarAuthorityAttestationBytesFR231(attestationBase),
      authority.privateKey,
    ).toString('base64'),
  };
  const registry231 = bindRegistrarKeysToExternalAuthorityAttestationsFR231({
    verifierKeyRegistry: registry229,
    authorityKeys: [authorityKey],
    attestations: [attestation],
  });
  const chain232 = bindWitnessSignaturesToRegistrarAuthorityChainFR232({
    witnessVerification: verification230,
    registrarAuthorityRegistry: registry231,
  });

  const authorityReceipt = chain232.receipts[0]!;
  const trustRootArtifactBytes = bytes(`FR234 synthetic trust-root candidate ${prefix}`);
  return intakeAuthorityTrustRootCandidateMaterialFR233({
    authorityChain: chain232,
    candidates: [{
      authorityRef: authorityReceipt.authorityRef,
      authorityKeyRef: authorityReceipt.authorityKeyRef,
      authorityPublicKeyDigest: authorityReceipt.authorityPublicKeyDigest,
      trustRootCandidateRef: `trust-root-candidate:fr234:${prefix}`,
      trustRootArtifactRef: `trust-root-artifact:fr234:${prefix}`,
      declaredTrustRootArtifactDigest:
        computeAuthorityTrustRootArtifactDigestFR233(trustRootArtifactBytes),
      trustRootArtifactBytes,
      authorityIdentityEvidenceRef: `authority-identity-evidence:fr234:${prefix}`,
      externalKeyPinningEvidenceRef: `external-key-pinning-evidence:fr234:${prefix}`,
      trustRootPolicyRef: `trust-root-policy:fr234:${prefix}`,
      validityPolicyRef: `validity-policy:fr234:${prefix}`,
      revocationStatusPolicyRef: `revocation-policy:fr234:${prefix}`,
      semanticVerifierRef: `semantic-verifier:fr234:${prefix}`,
    }],
  });
}

describe('FR234 authority trust-root governance admission requirements', () => {
  it('freezes exact governance checks for every active FR233 candidate without promoting trust', () => {
    const intake = activeFR233('valid');
    const result = issueAuthorityTrustRootGovernanceAdmissionRequirementsFR234(intake);

    expect(result.sourceFR233IntakeRef).toBe(intake.intakeRef);
    expect(result.sourceFR233IntakeDigest).toBe(intake.intakeDigest);
    expect(result.authorityCount).toBe(1);
    expect(result.candidateRequirements[0]!.trustRootArtifactDigest)
      .toBe(intake.receipts[0]!.trustRootArtifactDigest);
    expect(result.candidateRequirements[0]!.independentlyGovernedVerifierRequired).toBe(true);
    expect(result.candidateRequirements[0]!.authorityIdentityVerificationRequired).toBe(true);
    expect(result.candidateRequirements[0]!.externallyGovernedAuthorityKeyPinningRequired).toBe(true);
    expect(result.candidateRequirements[0]!.revocationStatusVerificationRequired).toBe(true);

    expect(Object.values(result.requirementsBoundary).every(Boolean)).toBe(true);
    expect(Object.values(result.insufficiencyBoundary).every((value) => value === false)).toBe(true);
    expect(result.availabilityBoundary.actualExternalGovernanceVerificationPerformed).toBe(false);
    expect(result.availabilityBoundary.externalTrustRootProvisioned).toBe(false);
    expect(result.authorityBoundary.authorityIdentityIndependentlyVerified).toBe(false);
    expect(result.authorityBoundary.authorityKeyPinnedByExternalGovernance).toBe(false);
    expect(result.authorityBoundary.currentValidityIndependentlyChecked).toBe(false);
    expect(result.authorityBoundary.revocationStatusIndependentlyChecked).toBe(false);
    expect(result.authorityBoundary.empiricalSufficiencyEstablished).toBe(false);
    expect(result.authorityBoundary.productionActivated).toBe(false);
    expect(() => assertAuthorityTrustRootGovernanceAdmissionRequirementsFR234(result)).not.toThrow();
  });

  it('rejects reconstructed FR233 intake before requirements issuance', () => {
    const intake = activeFR233('clone-233');
    expect(() => issueAuthorityTrustRootGovernanceAdmissionRequirementsFR234(
      persisted(intake),
    )).toThrow(/active FR233 runtime/u);
  });

  it('rejects reconstructed FR234 requirements as active authority', () => {
    const result = issueAuthorityTrustRootGovernanceAdmissionRequirementsFR234(
      activeFR233('clone-234'),
    );
    expect(() => assertAuthorityTrustRootGovernanceAdmissionRequirementsFR234(
      persisted(result),
    )).toThrow(/active FR234 runtime/u);
  });
});
