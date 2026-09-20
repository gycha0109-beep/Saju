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
  assertPinnedKeyWitnessSignatureVerificationFR228,
  buildWitnessSignatureEnvelopeBytesFR228,
  verifyPinnedKeyWitnessSignaturesFR228,
  type FR228DetachedWitnessSignature,
} from './observable-morphology-pinned-key-witness-signatures-fr228.js';

const GATE_HEX = 'b'.repeat(64);
const STUDY_GATE_REF =
  `evidence.fr224.observable_morphology_study_readiness:${GATE_HEX}`;
const STUDY_GATE_DIGEST = `sha256:${GATE_HEX}`;

function persisted<T>(value: T): unknown {
  return JSON.parse(JSON.stringify(value));
}

function bytes(text: string): Uint8Array {
  return new TextEncoder().encode(text);
}

function sha256Hex(bytesValue: Uint8Array): string {
  return `sha256:${createHash('sha256').update(bytesValue).digest('hex')}`;
}

function fixture() {
  const evidenceA = bytes('FR228 synthetic evidence A');
  const evidenceB = bytes('FR228 synthetic evidence B');
  const records: FR225ExternalWitnessRecordInput[] = [
    {
      witnessRef: 'witness:fr228:a',
      verifierRef: 'verifier:fr228:alpha',
      claimType: 'capture_freshness_observed',
      scopeRef: 'capture-admission:fr228:a',
      verificationMethod: 'supervised_capture_observation',
      observedAt: '2026-09-21T08:45:00.000Z',
      externalEvidenceRef: 'external-evidence:fr228:a',
      externalEvidenceDigest: sha256Hex(evidenceA),
      claimAttested: true,
    },
    {
      witnessRef: 'witness:fr228:b',
      verifierRef: 'verifier:fr228:alpha',
      claimType: 'capture_family_same_participant_observed',
      scopeRef: 'capture-family:fr228:b',
      verificationMethod: 'supervised_capture_observation',
      observedAt: '2026-09-21T08:46:00.000Z',
      externalEvidenceRef: 'external-evidence:fr228:b',
      externalEvidenceDigest: sha256Hex(evidenceB),
      claimAttested: true,
    },
  ];
  const witnessEvidence = verifyPersistedExternalWitnessEvidenceFR225(
    persisted(materializeExternalWitnessEvidenceFR225({
      studyGateRef: STUDY_GATE_REF,
      studyGateDigest: STUDY_GATE_DIGEST,
      records,
    })),
  );
  const inspection = inspectExternalEvidenceBytesFR227({
    witnessEvidence,
    payloads: [
      {
        externalEvidenceRef: 'external-evidence:fr228:a',
        mediaType: 'text/plain',
        bytes: evidenceA,
      },
      {
        externalEvidenceRef: 'external-evidence:fr228:b',
        mediaType: 'text/plain',
        bytes: evidenceB,
      },
    ],
  });
  const keyPair = generateKeyPairSync('ed25519');
  const publicKeySpkiDerBase64 = (
    keyPair.publicKey.export({ format: 'der', type: 'spki' }) as Buffer
  ).toString('base64');

  const signatures = witnessEvidence.records.map((record, index) => {
    const envelope = buildWitnessSignatureEnvelopeBytesFR228({
      witnessEvidence,
      inspection,
      witnessRef: record.witnessRef,
    });
    return {
      witnessRef: record.witnessRef,
      signatureRef: `signature:fr228:${index + 1}`,
      signatureBase64: sign(null, envelope, keyPair.privateKey).toString('base64'),
    } satisfies FR228DetachedWitnessSignature;
  });

  return {
    witnessEvidence,
    inspection,
    keyPair,
    publicKeySpkiDerBase64,
    signatures,
  };
}

describe('FR228 pinned-key witness signatures', () => {
  it('verifies canonical Ed25519 envelopes while preserving identity and claim authority blocks', () => {
    const value = fixture();
    const result = verifyPinnedKeyWitnessSignaturesFR228({
      witnessEvidence: value.witnessEvidence,
      inspection: value.inspection,
      pinnedKeys: [{
        verifierRef: 'verifier:fr228:alpha',
        keyRef: 'key:fr228:alpha:1',
        publicKeySpkiDerBase64: value.publicKeySpkiDerBase64,
      }],
      signatures: value.signatures,
    });

    expect(result.witnessRecordCount).toBe(2);
    expect(result.signedWitnessCount).toBe(2);
    expect(result.pinnedVerifierKeyCount).toBe(1);
    expect(result.receipts.every((receipt) => receipt.signatureValid)).toBe(true);
    expect(result.receipts.every((receipt) => receipt.signedEnvelopeBoundToPinnedKey)).toBe(true);
    expect(result.receipts.every((receipt) => receipt.signingKeyPossessionDemonstrated)).toBe(true);

    expect(result.authorityBoundary.validSignatureMeansVerifierIdentityVerified).toBe(false);
    expect(result.authorityBoundary.validSignatureMeansVerifierIndependent).toBe(false);
    expect(result.authorityBoundary.validSignatureMeansKeyOwnershipVerified).toBe(false);
    expect(result.authorityBoundary.validSignatureMeansClaimTrue).toBe(false);
    expect(result.authorityBoundary.signingKeyOwnershipIndependentlyVerified).toBe(false);
    expect(result.authorityBoundary.publicKeyProvenanceAuthenticated).toBe(false);
    expect(result.authorityBoundary.witnessClaimIndependentlyEstablished).toBe(false);
    expect(result.authorityBoundary.externalEvidenceProvenanceAuthenticated).toBe(false);
    expect(result.authorityBoundary.empiricalSufficiencyEstablished).toBe(false);
    expect(result.authorityBoundary.calibrationAuthorized).toBe(false);
    expect(() => assertPinnedKeyWitnessSignatureVerificationFR228(result)).not.toThrow();
  });

  it('rejects a detached signature produced by a different private key', () => {
    const value = fixture();
    const attacker = generateKeyPairSync('ed25519');
    const firstRecord = value.witnessEvidence.records[0]!;
    const wrongSignature = sign(null, buildWitnessSignatureEnvelopeBytesFR228({
      witnessEvidence: value.witnessEvidence,
      inspection: value.inspection,
      witnessRef: firstRecord.witnessRef,
    }), attacker.privateKey).toString('base64');

    expect(() => verifyPinnedKeyWitnessSignaturesFR228({
      witnessEvidence: value.witnessEvidence,
      inspection: value.inspection,
      pinnedKeys: [{
        verifierRef: 'verifier:fr228:alpha',
        keyRef: 'key:fr228:alpha:1',
        publicKeySpkiDerBase64: value.publicKeySpkiDerBase64,
      }],
      signatures: [
        { ...value.signatures[0]!, signatureBase64: wrongSignature },
        value.signatures[1]!,
      ],
    })).toThrow(/invalid Ed25519 signature/u);
  });

  it('rejects missing signatures', () => {
    const value = fixture();
    expect(() => verifyPinnedKeyWitnessSignaturesFR228({
      witnessEvidence: value.witnessEvidence,
      inspection: value.inspection,
      pinnedKeys: [{
        verifierRef: 'verifier:fr228:alpha',
        keyRef: 'key:fr228:alpha:1',
        publicKeySpkiDerBase64: value.publicKeySpkiDerBase64,
      }],
      signatures: [value.signatures[0]!],
    })).toThrow(/missing detached signature/u);
  });

  it('rejects extra signatures for unknown witnesses', () => {
    const value = fixture();
    expect(() => verifyPinnedKeyWitnessSignaturesFR228({
      witnessEvidence: value.witnessEvidence,
      inspection: value.inspection,
      pinnedKeys: [{
        verifierRef: 'verifier:fr228:alpha',
        keyRef: 'key:fr228:alpha:1',
        publicKeySpkiDerBase64: value.publicKeySpkiDerBase64,
      }],
      signatures: [
        ...value.signatures,
        {
          witnessRef: 'witness:fr228:outside',
          signatureRef: 'signature:fr228:outside',
          signatureBase64: value.signatures[0]!.signatureBase64,
        },
      ],
    })).toThrow(/extra signature for unknown witness/u);
  });

  it('rejects duplicate verifier-key mappings', () => {
    const value = fixture();
    expect(() => verifyPinnedKeyWitnessSignaturesFR228({
      witnessEvidence: value.witnessEvidence,
      inspection: value.inspection,
      pinnedKeys: [
        {
          verifierRef: 'verifier:fr228:alpha',
          keyRef: 'key:fr228:alpha:1',
          publicKeySpkiDerBase64: value.publicKeySpkiDerBase64,
        },
        {
          verifierRef: 'verifier:fr228:alpha',
          keyRef: 'key:fr228:alpha:2',
          publicKeySpkiDerBase64: value.publicKeySpkiDerBase64,
        },
      ],
      signatures: value.signatures,
    })).toThrow(/duplicate pinned verifier mapping/u);
  });

  it('rejects a verifier with no pinned key', () => {
    const value = fixture();
    expect(() => verifyPinnedKeyWitnessSignaturesFR228({
      witnessEvidence: value.witnessEvidence,
      inspection: value.inspection,
      pinnedKeys: [],
      signatures: value.signatures,
    })).toThrow(/no pinned Ed25519 key/u);
  });

  it('requires active-runtime FR227 inspection', () => {
    const value = fixture();
    const clonedInspection = persisted(value.inspection) as typeof value.inspection;
    expect(() => verifyPinnedKeyWitnessSignaturesFR228({
      witnessEvidence: value.witnessEvidence,
      inspection: clonedInspection,
      pinnedKeys: [{
        verifierRef: 'verifier:fr228:alpha',
        keyRef: 'key:fr228:alpha:1',
        publicKeySpkiDerBase64: value.publicKeySpkiDerBase64,
      }],
      signatures: value.signatures,
    })).toThrow(/not issued by active FR227 runtime/u);
  });
});
