import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import {
  materializeExternalWitnessEvidenceFR225,
  verifyPersistedExternalWitnessEvidenceFR225,
  type FR225ExternalWitnessRecordInput,
} from './observable-morphology-external-witness-evidence-fr225.js';
import {
  FR227_MAX_EXTERNAL_EVIDENCE_BYTES,
  assertExternalEvidenceByteInspectionFR227,
  inspectExternalEvidenceBytesFR227,
} from './observable-morphology-external-evidence-byte-inspection-fr227.js';

const GATE_HEX = 'a'.repeat(64);
const STUDY_GATE_REF =
  `evidence.fr224.observable_morphology_study_readiness:${GATE_HEX}`;
const STUDY_GATE_DIGEST = `sha256:${GATE_HEX}`;

function sha256(bytes: Uint8Array): string {
  return `sha256:${createHash('sha256').update(bytes).digest('hex')}`;
}

function persisted<T>(value: T): unknown {
  return JSON.parse(JSON.stringify(value));
}

function bytes(text: string): Uint8Array {
  return new TextEncoder().encode(text);
}

function witnessInput(
  suffix: string,
  evidenceBytes: Uint8Array,
  overrides: Partial<FR225ExternalWitnessRecordInput> = {},
): FR225ExternalWitnessRecordInput {
  return {
    witnessRef: `witness:fr227:${suffix}`,
    verifierRef: 'verifier:fr227:external-1',
    claimType: 'capture_freshness_observed',
    scopeRef: `capture-admission:fr227:${suffix}`,
    verificationMethod: 'supervised_capture_observation',
    observedAt: '2026-09-21T08:30:00.000Z',
    externalEvidenceRef: `external-evidence:fr227:${suffix}`,
    externalEvidenceDigest: sha256(evidenceBytes),
    claimAttested: true,
    ...overrides,
  };
}

function witnessEvidence() {
  const evidenceA = bytes('synthetic external evidence A');
  const evidenceB = bytes('synthetic external evidence B');
  const materialized = materializeExternalWitnessEvidenceFR225({
    studyGateRef: STUDY_GATE_REF,
    studyGateDigest: STUDY_GATE_DIGEST,
    records: [
      witnessInput('a', evidenceA),
      witnessInput('b', evidenceB, {
        claimType: 'capture_family_same_participant_observed',
        scopeRef: 'capture-family:fr227:b',
      }),
    ],
  });
  const verified = verifyPersistedExternalWitnessEvidenceFR225(persisted(materialized));
  return { verified, evidenceA, evidenceB };
}

describe('FR227 external evidence byte inspection', () => {
  it('recomputes actual byte digests and preserves no-authority semantics', () => {
    const fixture = witnessEvidence();
    const result = inspectExternalEvidenceBytesFR227({
      witnessEvidence: fixture.verified,
      payloads: [
        {
          externalEvidenceRef: 'external-evidence:fr227:a',
          mediaType: 'text/plain',
          bytes: fixture.evidenceA,
        },
        {
          externalEvidenceRef: 'external-evidence:fr227:b',
          mediaType: 'application/json',
          bytes: fixture.evidenceB,
        },
      ],
    });

    expect(result.witnessRecordCount).toBe(2);
    expect(result.inspectedEvidenceCount).toBe(2);
    expect(result.receipts).toHaveLength(2);
    expect(result.receipts.every((receipt) => receipt.externalEvidenceBytesPresent)).toBe(true);
    expect(result.receipts.every((receipt) => receipt.externalEvidenceDigestMatched)).toBe(true);
    expect(result.integrityBoundary.sha256RecomputedFromActualBytes).toBe(true);
    expect(result.integrityBoundary.declaredDigestMatchRequired).toBe(true);

    expect(result.authorityBoundary.evidenceBytesPresenceMeansEvidenceAuthentic).toBe(false);
    expect(result.authorityBoundary.digestMatchMeansEvidenceProvenanceAuthenticated).toBe(false);
    expect(result.authorityBoundary.digestMatchMeansEvidenceSubstanceAdjudicated).toBe(false);
    expect(result.authorityBoundary.externalEvidenceProvenanceAuthenticated).toBe(false);
    expect(result.authorityBoundary.externalEvidenceSubstanceIndependentlyAdjudicated).toBe(false);
    expect(result.authorityBoundary.underlyingFactIndependentlyEstablished).toBe(false);
    expect(result.authorityBoundary.captureFreshnessIndependentlyVerified).toBe(false);
    expect(result.authorityBoundary.sameParticipantIdentityIndependentlyVerified).toBe(false);
    expect(result.authorityBoundary.empiricalRepeatabilityEstablished).toBe(false);
    expect(result.authorityBoundary.empiricalSufficiencyEstablished).toBe(false);
    expect(result.authorityBoundary.calibrationAuthorized).toBe(false);
    expect(() => assertExternalEvidenceByteInspectionFR227(result)).not.toThrow();
  });

  it('rejects byte content that does not match the FR225 declared digest', () => {
    const fixture = witnessEvidence();
    expect(() => inspectExternalEvidenceBytesFR227({
      witnessEvidence: fixture.verified,
      payloads: [
        {
          externalEvidenceRef: 'external-evidence:fr227:a',
          mediaType: 'text/plain',
          bytes: bytes('tampered bytes'),
        },
        {
          externalEvidenceRef: 'external-evidence:fr227:b',
          mediaType: 'text/plain',
          bytes: fixture.evidenceB,
        },
      ],
    })).toThrow(/digest mismatch/u);
  });

  it('rejects missing evidence payloads', () => {
    const fixture = witnessEvidence();
    expect(() => inspectExternalEvidenceBytesFR227({
      witnessEvidence: fixture.verified,
      payloads: [{
        externalEvidenceRef: 'external-evidence:fr227:a',
        mediaType: 'text/plain',
        bytes: fixture.evidenceA,
      }],
    })).toThrow(/missing external evidence payload/u);
  });

  it('rejects extra evidence payloads outside FR225', () => {
    const fixture = witnessEvidence();
    expect(() => inspectExternalEvidenceBytesFR227({
      witnessEvidence: fixture.verified,
      payloads: [
        {
          externalEvidenceRef: 'external-evidence:fr227:a',
          mediaType: 'text/plain',
          bytes: fixture.evidenceA,
        },
        {
          externalEvidenceRef: 'external-evidence:fr227:b',
          mediaType: 'text/plain',
          bytes: fixture.evidenceB,
        },
        {
          externalEvidenceRef: 'external-evidence:fr227:extra',
          mediaType: 'text/plain',
          bytes: bytes('extra'),
        },
      ],
    })).toThrow(/extra external evidence payload/u);
  });

  it('rejects duplicate evidence refs', () => {
    const fixture = witnessEvidence();
    expect(() => inspectExternalEvidenceBytesFR227({
      witnessEvidence: fixture.verified,
      payloads: [
        {
          externalEvidenceRef: 'external-evidence:fr227:a',
          mediaType: 'text/plain',
          bytes: fixture.evidenceA,
        },
        {
          externalEvidenceRef: 'external-evidence:fr227:a',
          mediaType: 'text/plain',
          bytes: fixture.evidenceA,
        },
      ],
    })).toThrow(/duplicate payload externalEvidenceRef/u);
  });

  it('rejects empty and operationally oversized payloads', () => {
    const fixture = witnessEvidence();
    expect(() => inspectExternalEvidenceBytesFR227({
      witnessEvidence: fixture.verified,
      payloads: [
        {
          externalEvidenceRef: 'external-evidence:fr227:a',
          mediaType: 'text/plain',
          bytes: new Uint8Array(),
        },
        {
          externalEvidenceRef: 'external-evidence:fr227:b',
          mediaType: 'text/plain',
          bytes: fixture.evidenceB,
        },
      ],
    })).toThrow(/non-empty evidence bytes/u);

    expect(() => inspectExternalEvidenceBytesFR227({
      witnessEvidence: fixture.verified,
      payloads: [
        {
          externalEvidenceRef: 'external-evidence:fr227:a',
          mediaType: 'text/plain',
          bytes: new Uint8Array(FR227_MAX_EXTERNAL_EVIDENCE_BYTES + 1),
        },
        {
          externalEvidenceRef: 'external-evidence:fr227:b',
          mediaType: 'text/plain',
          bytes: fixture.evidenceB,
        },
      ],
    })).toThrow(/operational byte-size bound/u);
  });

  it('requires active-runtime FR225 verification', () => {
    const fixture = witnessEvidence();
    const cloned = persisted(fixture.verified) as typeof fixture.verified;
    expect(() => inspectExternalEvidenceBytesFR227({
      witnessEvidence: cloned,
      payloads: [
        {
          externalEvidenceRef: 'external-evidence:fr227:a',
          mediaType: 'text/plain',
          bytes: fixture.evidenceA,
        },
        {
          externalEvidenceRef: 'external-evidence:fr227:b',
          mediaType: 'text/plain',
          bytes: fixture.evidenceB,
        },
      ],
    })).toThrow(/not verified by the active FR225 runtime/u);
  });
});
