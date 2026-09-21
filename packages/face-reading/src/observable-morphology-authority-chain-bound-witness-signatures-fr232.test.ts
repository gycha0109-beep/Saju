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
import {
  verifyEnrollmentBoundWitnessSignaturesFR230,
} from './observable-morphology-enrollment-bound-witness-signatures-fr230.js';
import {
  bindRegistrarKeysToExternalAuthorityAttestationsFR231,
  buildRegistrarAuthorityAttestationBytesFR231,
  type FR231PinnedAuthorityKey,
  type FR231RegistrarAuthorityAttestation,
} from './observable-morphology-external-authority-registrar-attestations-fr231.js';
import {
  assertAuthorityChainBoundWitnessSignatureVerificationFR232,
  bindWitnessSignaturesToRegistrarAuthorityChainFR232,
} from './observable-morphology-authority-chain-bound-witness-signatures-fr232.js';

const GATE_HEX = 'd'.repeat(64);
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

function fixture(prefix: string) {
  const evidenceBytes = bytes(`FR232 synthetic evidence ${prefix}`);
  const records: FR225ExternalWitnessRecordInput[] = [{
    witnessRef: `witness:fr232:${prefix}`,
    verifierRef: `verifier:fr232:${prefix}`,
    claimType: 'capture_freshness_observed',
    scopeRef: `capture-admission:fr232:${prefix}`,
    verificationMethod: 'supervised_capture_observation',
    observedAt: '2026-09-21T10:00:00.000Z',
    externalEvidenceRef: `external-evidence:fr232:${prefix}`,
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
    keyRef: `verifier-key:fr232:${prefix}`,
    verifierPublicKeySpkiDerBase64: verifier.publicBase64,
    registrarRef: `registrar:fr232:${prefix}`,
    registrarKeyRef: `registrar-key:fr232:${prefix}`,
    certificateRef: `certificate:fr229-for-fr232:${prefix}`,
    enrolledAt: '2026-09-21T09:50:00.000Z',
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
    signatureRef: `signature:fr232:${prefix}`,
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
    authorityRef: `authority:fr232:${prefix}`,
    authorityKeyRef: `authority-key:fr232:${prefix}`,
    publicKeySpkiDerBase64: authority.publicBase64,
  };
  const registrarReceipt = registry229.receipts[0]!;
  const attestationBase = {
    registrarRef: registrarReceipt.registrarRef,
    registrarKeyRef: registrarReceipt.registrarKeyRef,
    registrarPublicKeyDigest: registrarReceipt.registrarPublicKeyDigest,
    authorityRef: authorityKey.authorityRef,
    authorityKeyRef: authorityKey.authorityKeyRef,
    certificateRef: `certificate:fr231-for-fr232:${prefix}`,
    attestedAt: '2026-09-21T10:05:00.000Z',
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

  return {
    registry229,
    verification230,
    registry231,
  };
}

describe('FR232 authority-chain-bound witness signatures', () => {
  it('binds active FR230 witness verification to exact active FR231 registrar authority provenance', () => {
    const value = fixture('valid');
    const result = bindWitnessSignaturesToRegistrarAuthorityChainFR232({
      witnessVerification: value.verification230,
      registrarAuthorityRegistry: value.registry231,
    });

    expect(result.witnessCount).toBe(1);
    expect(result.registrarCount).toBe(1);
    expect(result.authorityCount).toBe(1);
    expect(result.sourceFR229RegistryRef).toBe(value.registry229.registryRef);
    expect(result.sourceFR229RegistryDigest).toBe(value.registry229.registryDigest);
    expect(result.sourceFR230VerificationRef).toBe(value.verification230.verificationRef);
    expect(result.sourceFR231RegistryRef).toBe(value.registry231.registryRef);

    const receipt = result.receipts[0]!;
    expect(receipt.verifierEnrollmentMatchesFR230).toBe(true);
    expect(receipt.registrarAuthorityMappingMatchesFR231).toBe(true);
    expect(receipt.authoritySignaturePreviouslyVerifiedByActiveFR231).toBe(true);
    expect(receipt.witnessSignaturePreviouslyVerifiedByActiveFR230).toBe(true);

    expect(result.integrityBoundary.exactSharedFR229RegistryRefRequired).toBe(true);
    expect(result.integrityBoundary.exactSharedFR229RegistryDigestRequired).toBe(true);
    expect(result.integrityBoundary.exactRegistrarCoverageRequired).toBe(true);

    expect(result.authorityBoundary.authorityChainMeansAuthorityIdentityVerified).toBe(false);
    expect(result.authorityBoundary.authorityChainMeansRegistrarIdentityVerified).toBe(false);
    expect(result.authorityBoundary.authorityChainMeansVerifierIdentityVerified).toBe(false);
    expect(result.authorityBoundary.authorityChainMeansWitnessClaimTrue).toBe(false);
    expect(result.authorityBoundary.publicKeyProvenanceIndependentlyAuthenticated).toBe(false);
    expect(result.authorityBoundary.empiricalSufficiencyEstablished).toBe(false);
    expect(result.authorityBoundary.calibrationAuthorized).toBe(false);
    expect(result.authorityBoundary.productionActivated).toBe(false);
    expect(() => assertAuthorityChainBoundWitnessSignatureVerificationFR232(result)).not.toThrow();
  });

  it('rejects FR230 and FR231 artifacts derived from different FR229 registries', () => {
    const left = fixture('cross-left');
    const right = fixture('cross-right');

    expect(() => bindWitnessSignaturesToRegistrarAuthorityChainFR232({
      witnessVerification: left.verification230,
      registrarAuthorityRegistry: right.registry231,
    })).toThrow(/same FR229 registryRef/u);
  });

  it('rejects reconstructed FR230 artifacts before authority-chain binding', () => {
    const value = fixture('clone-230');

    expect(() => bindWitnessSignaturesToRegistrarAuthorityChainFR232({
      witnessVerification: persisted(value.verification230),
      registrarAuthorityRegistry: value.registry231,
    })).toThrow(/active FR230 runtime/u);
  });

  it('rejects reconstructed FR231 artifacts before authority-chain binding', () => {
    const value = fixture('clone-231');

    expect(() => bindWitnessSignaturesToRegistrarAuthorityChainFR232({
      witnessVerification: value.verification230,
      registrarAuthorityRegistry: persisted(value.registry231),
    })).toThrow(/active FR231 runtime/u);
  });

  it('rejects reconstructed FR232 verification as active authority', () => {
    const value = fixture('clone-232');
    const result = bindWitnessSignaturesToRegistrarAuthorityChainFR232({
      witnessVerification: value.verification230,
      registrarAuthorityRegistry: value.registry231,
    });

    expect(() => assertAuthorityChainBoundWitnessSignatureVerificationFR232(
      persisted(result),
    )).toThrow(/active FR232 runtime/u);
  });
});
