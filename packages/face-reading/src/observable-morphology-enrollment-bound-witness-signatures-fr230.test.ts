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
import {
  inspectExternalEvidenceBytesFR227,
} from './observable-morphology-external-evidence-byte-inspection-fr227.js';
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
  assertEnrollmentBoundWitnessSignatureVerificationFR230,
  verifyEnrollmentBoundWitnessSignaturesFR230,
} from './observable-morphology-enrollment-bound-witness-signatures-fr230.js';

const GATE_HEX = 'c'.repeat(64);
const STUDY_GATE_REF =
  `evidence.fr224.observable_morphology_study_readiness:${GATE_HEX}`;
const STUDY_GATE_DIGEST = `sha256:${GATE_HEX}`;

function persisted<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function bytes(text: string): Uint8Array {
  return new TextEncoder().encode(text);
}

function sha256Hex(bytesValue: Uint8Array): string {
  return `sha256:${createHash('sha256').update(bytesValue).digest('hex')}`;
}

function keyPair() {
  const pair = generateKeyPairSync('ed25519');
  const publicDer = pair.publicKey.export({ format: 'der', type: 'spki' }) as Buffer;
  return {
    publicDer,
    publicBase64: publicDer.toString('base64'),
    privateKey: pair.privateKey,
  };
}

function fixture() {
  const evidence = bytes('FR230 synthetic evidence A');
  const records: FR225ExternalWitnessRecordInput[] = [{
    witnessRef: 'witness:fr230:a',
    verifierRef: 'verifier:fr230:alpha',
    claimType: 'capture_freshness_observed',
    scopeRef: 'capture-admission:fr230:a',
    verificationMethod: 'supervised_capture_observation',
    observedAt: '2026-09-21T09:20:00.000Z',
    externalEvidenceRef: 'external-evidence:fr230:a',
    externalEvidenceDigest: sha256Hex(evidence),
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
      externalEvidenceRef: 'external-evidence:fr230:a',
      mediaType: 'text/plain',
      bytes: evidence,
    }],
  });

  const verifier = keyPair();
  const registrar = keyPair();
  const enrollmentBase = {
    verifierRef: 'verifier:fr230:alpha',
    keyRef: 'verifier-key:fr230:alpha',
    verifierPublicKeySpkiDerBase64: verifier.publicBase64,
    registrarRef: 'registrar:fr230:alpha',
    registrarKeyRef: 'registrar-key:fr230:alpha',
    certificateRef: 'certificate:fr230:alpha',
    enrolledAt: '2026-09-21T09:15:00.000Z',
    validFrom: '2026-09-21T00:00:00.000Z',
    validUntil: '2027-09-21T00:00:00.000Z',
  } as const;

  const possessionSignature = sign(
    null,
    buildVerifierKeyPossessionChallengeBytesFR229(enrollmentBase),
    verifier.privateKey,
  ).toString('base64');

  const certificateBytes = buildVerifierKeyEnrollmentCertificateBytesFR229({
    ...enrollmentBase,
    verifierPossessionSignatureBase64: possessionSignature,
  });
  const registrarSignature = sign(
    null,
    certificateBytes,
    registrar.privateKey,
  ).toString('base64');

  const registrarKey: FR229PinnedRegistrarKey = {
    registrarRef: enrollmentBase.registrarRef,
    registrarKeyRef: enrollmentBase.registrarKeyRef,
    publicKeySpkiDerBase64: registrar.publicBase64,
  };
  const enrollment: FR229VerifierKeyEnrollment = {
    ...enrollmentBase,
    verifierPossessionSignatureBase64: possessionSignature,
    registrarSignatureBase64: registrarSignature,
  };
  const registry = admitPinnedRegistrarVerifierKeyEnrollmentsFR229({
    registrarKeys: [registrarKey],
    enrollments: [enrollment],
  });

  const signatures = witnessEvidence.records.map((record, index) => ({
    witnessRef: record.witnessRef,
    signatureRef: `signature:fr230:${index + 1}`,
    signatureBase64: sign(
      null,
      buildWitnessSignatureEnvelopeBytesFR228({
        witnessEvidence,
        inspection,
        witnessRef: record.witnessRef,
      }),
      verifier.privateKey,
    ).toString('base64'),
  } satisfies FR228DetachedWitnessSignature));

  return {
    witnessEvidence,
    inspection,
    verifier,
    registrar,
    registry,
    signatures,
    verifierKeyMaterials: [{
      verifierRef: enrollment.verifierRef,
      keyRef: enrollment.keyRef,
      publicKeySpkiDerBase64: enrollment.verifierPublicKeySpkiDerBase64,
    }],
  };
}

describe('FR230 enrollment-bound witness signatures', () => {
  it('re-verifies FR228 signatures only against exact active FR229 enrolled verifier keys', () => {
    const value = fixture();
    const result = verifyEnrollmentBoundWitnessSignaturesFR230({
      witnessEvidence: value.witnessEvidence,
      inspection: value.inspection,
      verifierKeyRegistry: value.registry,
      verifierKeyMaterials: value.verifierKeyMaterials,
      signatures: value.signatures,
    });

    expect(result.witnessRecordCount).toBe(1);
    expect(result.signedWitnessCount).toBe(1);
    expect(result.enrolledVerifierKeyCount).toBe(1);
    expect(result.sourceVerifierKeyRegistryRef).toBe(value.registry.registryRef);
    expect(result.sourceVerifierKeyRegistryDigest).toBe(value.registry.registryDigest);

    const receipt = result.receipts[0]!;
    expect(receipt.verifierKeyExactMatchToActiveFR229Registry).toBe(true);
    expect(receipt.fr228SignatureValidAgainstExactEnrolledKey).toBe(true);
    expect(receipt.verifierKeyPossessionDemonstratedAtEnrollment).toBe(true);
    expect(receipt.enrollmentBoundToPinnedRegistrarKey).toBe(true);

    expect(result.integrityBoundary.fr228PinnedKeysDerivedInternally).toBe(true);
    expect(result.integrityBoundary.independentFR228PinnedKeyInputForbidden).toBe(true);
    expect(result.integrityBoundary.witnessSignatureReverifiedAgainstEnrolledKey).toBe(true);

    expect(result.authorityBoundary.enrollmentBindingMeansRegistrarIdentityVerified).toBe(false);
    expect(result.authorityBoundary.enrollmentBindingMeansVerifierIdentityVerified).toBe(false);
    expect(result.authorityBoundary.enrollmentBindingMeansRealWorldKeyOwnershipVerified).toBe(false);
    expect(result.authorityBoundary.enrollmentBindingMeansClaimTrue).toBe(false);
    expect(result.authorityBoundary.publicKeyProvenanceIndependentlyAuthenticated).toBe(false);
    expect(result.authorityBoundary.currentValidityIndependentlyChecked).toBe(false);
    expect(result.authorityBoundary.revocationStatusIndependentlyChecked).toBe(false);
    expect(result.authorityBoundary.witnessClaimIndependentlyEstablished).toBe(false);
    expect(result.authorityBoundary.empiricalSufficiencyEstablished).toBe(false);
    expect(result.authorityBoundary.calibrationAuthorized).toBe(false);
    expect(() => assertEnrollmentBoundWitnessSignatureVerificationFR230(result)).not.toThrow();
  });

  it('rejects public-key material drift even when verifierRef and keyRef are unchanged', () => {
    const value = fixture();
    const attacker = keyPair();

    expect(() => verifyEnrollmentBoundWitnessSignaturesFR230({
      witnessEvidence: value.witnessEvidence,
      inspection: value.inspection,
      verifierKeyRegistry: value.registry,
      verifierKeyMaterials: [{
        ...value.verifierKeyMaterials[0]!,
        publicKeySpkiDerBase64: attacker.publicBase64,
      }],
      signatures: value.signatures,
    })).toThrow(/public-key digest mismatch/u);
  });

  it('rejects keyRef drift from the active FR229 registry', () => {
    const value = fixture();

    expect(() => verifyEnrollmentBoundWitnessSignaturesFR230({
      witnessEvidence: value.witnessEvidence,
      inspection: value.inspection,
      verifierKeyRegistry: value.registry,
      verifierKeyMaterials: [{
        ...value.verifierKeyMaterials[0]!,
        keyRef: 'verifier-key:fr230:drift',
      }],
      signatures: value.signatures,
    })).toThrow(/keyRef mismatch/u);
  });

  it('rejects missing verifier key material for an FR229 enrollment', () => {
    const value = fixture();

    expect(() => verifyEnrollmentBoundWitnessSignaturesFR230({
      witnessEvidence: value.witnessEvidence,
      inspection: value.inspection,
      verifierKeyRegistry: value.registry,
      verifierKeyMaterials: [],
      signatures: value.signatures,
    })).toThrow(/missing verifier key material/u);
  });

  it('rejects extra verifier key material not admitted by FR229', () => {
    const value = fixture();
    const extra = keyPair();

    expect(() => verifyEnrollmentBoundWitnessSignaturesFR230({
      witnessEvidence: value.witnessEvidence,
      inspection: value.inspection,
      verifierKeyRegistry: value.registry,
      verifierKeyMaterials: [
        ...value.verifierKeyMaterials,
        {
          verifierRef: 'verifier:fr230:extra',
          keyRef: 'verifier-key:fr230:extra',
          publicKeySpkiDerBase64: extra.publicBase64,
        },
      ],
      signatures: value.signatures,
    })).toThrow(/extra verifier key material/u);
  });

  it('rejects a cloned FR229 registry as semantic authority', () => {
    const value = fixture();
    const cloned = persisted(value.registry);

    expect(() => verifyEnrollmentBoundWitnessSignaturesFR230({
      witnessEvidence: value.witnessEvidence,
      inspection: value.inspection,
      verifierKeyRegistry: cloned,
      verifierKeyMaterials: value.verifierKeyMaterials,
      signatures: value.signatures,
    })).toThrow(/not issued by active FR229 runtime/u);
  });

  it('still rejects a witness signature not produced by the exact enrolled private key', () => {
    const value = fixture();
    const attacker = keyPair();
    const record = value.witnessEvidence.records[0]!;
    const wrongSignature = sign(
      null,
      buildWitnessSignatureEnvelopeBytesFR228({
        witnessEvidence: value.witnessEvidence,
        inspection: value.inspection,
        witnessRef: record.witnessRef,
      }),
      attacker.privateKey,
    ).toString('base64');

    expect(() => verifyEnrollmentBoundWitnessSignaturesFR230({
      witnessEvidence: value.witnessEvidence,
      inspection: value.inspection,
      verifierKeyRegistry: value.registry,
      verifierKeyMaterials: value.verifierKeyMaterials,
      signatures: [{
        ...value.signatures[0]!,
        signatureBase64: wrongSignature,
      }],
    })).toThrow(/invalid Ed25519 signature/u);
  });

  it('rejects cloned FR230 results as active-runtime authority', () => {
    const value = fixture();
    const result = verifyEnrollmentBoundWitnessSignaturesFR230({
      witnessEvidence: value.witnessEvidence,
      inspection: value.inspection,
      verifierKeyRegistry: value.registry,
      verifierKeyMaterials: value.verifierKeyMaterials,
      signatures: value.signatures,
    });
    const cloned = persisted(result);

    expect(() => assertEnrollmentBoundWitnessSignatureVerificationFR230(cloned))
      .toThrow(/not issued by active FR230 runtime/u);
  });
});
