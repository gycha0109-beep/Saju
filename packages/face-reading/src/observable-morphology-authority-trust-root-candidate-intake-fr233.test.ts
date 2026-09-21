import {
  createHash,
  generateKeyPairSync,
  sign,
} from 'node:crypto';
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
  assertAuthorityTrustRootCandidateIntakeFR233,
  computeAuthorityTrustRootArtifactDigestFR233,
  intakeAuthorityTrustRootCandidateMaterialFR233,
  type FR233AuthorityTrustRootCandidateInput,
} from './observable-morphology-authority-trust-root-candidate-intake-fr233.js';

const GATE_HEX = 'e'.repeat(64);
const STUDY_GATE_REF =
  `evidence.fr224.observable_morphology_study_readiness:${GATE_HEX}`;
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
  return {
    publicBase64: publicDer.toString('base64'),
    privateKey: pair.privateKey,
  };
}

function authorityChainFixture(prefix: string) {
  const evidenceBytes = bytes(`FR233 synthetic witness evidence ${prefix}`);
  const records: FR225ExternalWitnessRecordInput[] = [{
    witnessRef: `witness:fr233:${prefix}`,
    verifierRef: `verifier:fr233:${prefix}`,
    claimType: 'capture_freshness_observed',
    scopeRef: `capture-admission:fr233:${prefix}`,
    verificationMethod: 'supervised_capture_observation',
    observedAt: '2026-09-21T10:30:00.000Z',
    externalEvidenceRef: `external-evidence:fr233:${prefix}`,
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
    keyRef: `verifier-key:fr233:${prefix}`,
    verifierPublicKeySpkiDerBase64: verifier.publicBase64,
    registrarRef: `registrar:fr233:${prefix}`,
    registrarKeyRef: `registrar-key:fr233:${prefix}`,
    certificateRef: `certificate:fr229-for-fr233:${prefix}`,
    enrolledAt: '2026-09-21T10:20:00.000Z',
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
    signatureRef: `signature:fr233:${prefix}`,
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
    authorityRef: `authority:fr233:${prefix}`,
    authorityKeyRef: `authority-key:fr233:${prefix}`,
    publicKeySpkiDerBase64: authority.publicBase64,
  };
  const registrarReceipt = registry229.receipts[0]!;
  const attestationBase = {
    registrarRef: registrarReceipt.registrarRef,
    registrarKeyRef: registrarReceipt.registrarKeyRef,
    registrarPublicKeyDigest: registrarReceipt.registrarPublicKeyDigest,
    authorityRef: authorityKey.authorityRef,
    authorityKeyRef: authorityKey.authorityKeyRef,
    certificateRef: `certificate:fr231-for-fr233:${prefix}`,
    attestedAt: '2026-09-21T10:25:00.000Z',
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

  return { chain232 };
}

function candidateFor(
  chain: ReturnType<typeof authorityChainFixture>['chain232'],
  prefix: string,
): FR233AuthorityTrustRootCandidateInput {
  const authority = chain.receipts[0]!;
  const artifactBytes = bytes(`FR233 synthetic candidate trust-root artifact ${prefix}`);
  return {
    authorityRef: authority.authorityRef,
    authorityKeyRef: authority.authorityKeyRef,
    authorityPublicKeyDigest: authority.authorityPublicKeyDigest,
    trustRootCandidateRef: `trust-root-candidate:fr233:${prefix}`,
    trustRootArtifactRef: `trust-root-artifact:fr233:${prefix}`,
    declaredTrustRootArtifactDigest:
      computeAuthorityTrustRootArtifactDigestFR233(artifactBytes),
    trustRootArtifactBytes: artifactBytes,
    authorityIdentityEvidenceRef: `authority-identity-evidence:fr233:${prefix}`,
    externalKeyPinningEvidenceRef: `external-key-pinning-evidence:fr233:${prefix}`,
    trustRootPolicyRef: `trust-root-policy:fr233:${prefix}`,
    validityPolicyRef: `validity-policy:fr233:${prefix}`,
    revocationStatusPolicyRef: `revocation-policy:fr233:${prefix}`,
    semanticVerifierRef: `semantic-verifier:fr233:${prefix}`,
  };
}

describe('FR233 authority trust-root candidate material intake', () => {
  it('binds exact candidate trust-root bytes to every distinct active FR232 authority key', () => {
    const value = authorityChainFixture('valid');
    const candidate = candidateFor(value.chain232, 'valid');
    const result = intakeAuthorityTrustRootCandidateMaterialFR233({
      authorityChain: value.chain232,
      candidates: [candidate],
    });

    expect(result.authorityCount).toBe(1);
    expect(result.sourceFR232VerificationRef).toBe(value.chain232.verificationRef);
    expect(result.sourceFR232VerificationDigest).toBe(value.chain232.verificationDigest);
    expect(result.receipts[0]!.authorityMappingMatchesFR232).toBe(true);
    expect(result.receipts[0]!.trustRootArtifactByteIdentityVerified).toBe(true);
    expect(result.receipts[0]!.trustRootArtifactBytesRetainedInOutput).toBe(false);
    expect('trustRootArtifactBytes' in result.receipts[0]!).toBe(false);

    expect(result.authorityBoundary.candidateByteIdentityMeansExternalTrust).toBe(false);
    expect(result.authorityBoundary.authorityIdentityIndependentlyVerified).toBe(false);
    expect(result.authorityBoundary.authorityKeyPinnedByExternalGovernance).toBe(false);
    expect(result.authorityBoundary.externalTrustRootProvisioned).toBe(false);
    expect(result.authorityBoundary.empiricalSufficiencyEstablished).toBe(false);
    expect(result.authorityBoundary.calibrationAuthorized).toBe(false);
    expect(result.authorityBoundary.productionActivated).toBe(false);
    expect(() => assertAuthorityTrustRootCandidateIntakeFR233(result)).not.toThrow();
  });

  it('rejects candidate authority key drift from active FR232', () => {
    const value = authorityChainFixture('drift');
    const candidate = candidateFor(value.chain232, 'drift');

    expect(() => intakeAuthorityTrustRootCandidateMaterialFR233({
      authorityChain: value.chain232,
      candidates: [{
        ...candidate,
        authorityKeyRef: 'authority-key:fr233:wrong',
      }],
    })).toThrow(/authority key binding drift/u);
  });

  it('rejects trust-root artifact byte digest mismatch', () => {
    const value = authorityChainFixture('digest');
    const candidate = candidateFor(value.chain232, 'digest');

    expect(() => intakeAuthorityTrustRootCandidateMaterialFR233({
      authorityChain: value.chain232,
      candidates: [{
        ...candidate,
        trustRootArtifactBytes: bytes('different candidate artifact bytes'),
      }],
    })).toThrow(/artifact byte digest mismatch/u);
  });

  it('rejects missing, extra, and duplicate authority candidate coverage', () => {
    const value = authorityChainFixture('coverage');
    const candidate = candidateFor(value.chain232, 'coverage');

    expect(() => intakeAuthorityTrustRootCandidateMaterialFR233({
      authorityChain: value.chain232,
      candidates: [],
    })).toThrow(/exactly cover/u);

    expect(() => intakeAuthorityTrustRootCandidateMaterialFR233({
      authorityChain: value.chain232,
      candidates: [candidate, candidate],
    })).toThrow(/exactly cover/u);

    expect(() => intakeAuthorityTrustRootCandidateMaterialFR233({
      authorityChain: value.chain232,
      candidates: [{
        ...candidate,
        authorityRef: 'authority:fr233:extra',
      }],
    })).toThrow(/not present in active FR232/u);
  });

  it('rejects reconstructed FR232 and FR233 artifacts as active authority', () => {
    const value = authorityChainFixture('clone');
    const candidate = candidateFor(value.chain232, 'clone');

    expect(() => intakeAuthorityTrustRootCandidateMaterialFR233({
      authorityChain: persisted(value.chain232),
      candidates: [candidate],
    })).toThrow(/active FR232 runtime/u);

    const result = intakeAuthorityTrustRootCandidateMaterialFR233({
      authorityChain: value.chain232,
      candidates: [candidate],
    });
    expect(() => assertAuthorityTrustRootCandidateIntakeFR233(
      persisted(result),
    )).toThrow(/active FR233 runtime/u);
  });

  it('rejects empty and oversized trust-root artifact bytes', () => {
    expect(() => computeAuthorityTrustRootArtifactDigestFR233(
      new Uint8Array(),
    )).toThrow(/between 1 and/u);
    expect(() => computeAuthorityTrustRootArtifactDigestFR233(
      new Uint8Array(1024 * 1024 + 1),
    )).toThrow(/between 1 and/u);
  });
});
