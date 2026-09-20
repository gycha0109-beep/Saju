import { describe, expect, it } from 'vitest';
import {
  assertMaterializedExternalWitnessEvidenceFR225,
  assertVerifiedPersistedExternalWitnessEvidenceFR225,
  materializeExternalWitnessEvidenceFR225,
  verifyPersistedExternalWitnessEvidenceFR225,
  type FR225ExternalWitnessRecordInput,
} from './observable-morphology-external-witness-evidence-fr225.js';

const STUDY_DIGEST = `sha256:${'a'.repeat(64)}`;
const STUDY_REF = `evidence.fr224.observable_morphology_study_readiness:${'a'.repeat(64)}`;

function record(
  suffix: string,
  overrides: Partial<FR225ExternalWitnessRecordInput> = {},
): FR225ExternalWitnessRecordInput {
  return {
    witnessRef: `witness:fr225:${suffix}`,
    verifierRef: 'verifier:fr225:external-1',
    claimType: 'capture_freshness_observed',
    scopeRef: `capture:fr225:${suffix}`,
    verificationMethod: 'supervised_capture_observation',
    observedAt: '2026-09-21T05:00:00.000Z',
    externalEvidenceRef: `external-evidence:fr225:${suffix}`,
    externalEvidenceDigest: `sha256:${suffix.charCodeAt(0).toString(16).padStart(2, '0').repeat(32).slice(0, 64)}`,
    claimAttested: true,
    ...overrides,
  };
}

function fullInput() {
  return {
    studyGateRef: STUDY_REF,
    studyGateDigest: STUDY_DIGEST,
    records: [
      record('a', {
        claimType: 'reviewer_cohort_human_status_observed',
        scopeRef: 'reviewer-cohort:fr220-evidence',
        verificationMethod: 'in_person_observation',
      }),
      record('b', {
        claimType: 'reviewer_cohort_independence_observed',
        scopeRef: 'reviewer-cohort:fr220-evidence',
        verificationMethod: 'documented_process_review',
      }),
      record('c', {
        claimType: 'capture_freshness_observed',
        scopeRef: 'capture-admission:fr221:capture-1',
        verificationMethod: 'supervised_capture_observation',
      }),
      record('d', {
        claimType: 'capture_family_same_participant_observed',
        scopeRef: 'capture-family:fr221:family-1',
        verificationMethod: 'supervised_capture_observation',
      }),
    ],
  } as const;
}

function persisted<T>(value: T): unknown {
  return JSON.parse(JSON.stringify(value));
}

describe('FR225 persisted external witness evidence', () => {
  it('round-trips persisted witness records while keeping empirical authority blocked', () => {
    const materialized = materializeExternalWitnessEvidenceFR225(fullInput());
    expect(() => assertMaterializedExternalWitnessEvidenceFR225(materialized)).not.toThrow();

    const verified = verifyPersistedExternalWitnessEvidenceFR225(persisted(materialized));
    expect(verified.recordCount).toBe(4);
    expect(verified.verifierCount).toBe(1);
    expect(verified.claimCounts.reviewer_cohort_human_status_observed).toBe(1);
    expect(verified.claimCounts.reviewer_cohort_independence_observed).toBe(1);
    expect(verified.claimCounts.capture_freshness_observed).toBe(1);
    expect(verified.claimCounts.capture_family_same_participant_observed).toBe(1);
    expect(verified.integrityBoundary.recordDigestsRecomputed).toBe(true);
    expect(verified.integrityBoundary.aggregateDigestRecomputed).toBe(true);

    expect(verified.authorityBoundary.verifierIdentityIndependentlyVerified).toBe(false);
    expect(verified.authorityBoundary.verifierIndependenceIndependentlyVerified).toBe(false);
    expect(verified.authorityBoundary.externalEvidenceInspectedByRuntime).toBe(false);
    expect(verified.authorityBoundary.witnessClaimCryptographicallyAuthenticated).toBe(false);
    expect(verified.authorityBoundary.witnessRecordPresenceMeansUnderlyingFactEstablished).toBe(false);
    expect(verified.authorityBoundary.reviewerHumanStatusIndependentlyVerified).toBe(false);
    expect(verified.authorityBoundary.captureFreshnessIndependentlyVerified).toBe(false);
    expect(verified.authorityBoundary.sameParticipantIdentityIndependentlyVerified).toBe(false);
    expect(verified.authorityBoundary.empiricalRepeatabilityEstablished).toBe(false);
    expect(verified.authorityBoundary.empiricalSufficiencyEstablished).toBe(false);
    expect(verified.authorityBoundary.calibrationAuthorized).toBe(false);
    expect(verified.authorityBoundary.thresholdIssued).toBe(false);
    expect(verified.authorityBoundary.traditionalBindingIssued).toBe(false);
    expect(() => assertVerifiedPersistedExternalWitnessEvidenceFR225(verified)).not.toThrow();
  });

  it('rejects a persisted witness record edited after materialization', () => {
    const materialized = materializeExternalWitnessEvidenceFR225(fullInput());
    const clone = persisted(materialized) as {
      records: Array<Record<string, unknown>>;
    };
    clone.records[0]!.scopeRef = 'reviewer-cohort:tampered';
    expect(() => verifyPersistedExternalWitnessEvidenceFR225(clone))
      .toThrow(/recordDigest mismatch/u);
  });

  it('rejects duplicate witness refs', () => {
    expect(() => materializeExternalWitnessEvidenceFR225({
      studyGateRef: STUDY_REF,
      studyGateDigest: STUDY_DIGEST,
      records: [
        record('a'),
        record('b', { witnessRef: 'witness:fr225:a' }),
      ],
    })).toThrow(/duplicate witnessRef/u);
  });

  it('rejects duplicate verifier claim scope tuples even with different witness refs', () => {
    expect(() => materializeExternalWitnessEvidenceFR225({
      studyGateRef: STUDY_REF,
      studyGateDigest: STUDY_DIGEST,
      records: [
        record('a'),
        record('b', {
          verifierRef: 'verifier:fr225:external-1',
          claimType: 'capture_freshness_observed',
          scopeRef: 'capture:fr225:a',
        }),
      ],
    })).toThrow(/duplicate verifier\/claim\/scope witness tuple/u);
  });

  it('rejects FR224 gate ref/digest mismatch', () => {
    expect(() => materializeExternalWitnessEvidenceFR225({
      studyGateRef: STUDY_REF,
      studyGateDigest: `sha256:${'b'.repeat(64)}`,
      records: [record('a')],
    })).toThrow(/encode the same digest/u);
  });

  it('rejects aggregate count tampering after persistence', () => {
    const materialized = materializeExternalWitnessEvidenceFR225(fullInput());
    const clone = persisted(materialized) as Record<string, unknown>;
    clone.recordCount = 999;
    expect(() => verifyPersistedExternalWitnessEvidenceFR225(clone))
      .toThrow(/record\/verifier counts/u);
  });

  it('does not let a JSON clone inherit active-runtime verified authority', () => {
    const verified = verifyPersistedExternalWitnessEvidenceFR225(
      persisted(materializeExternalWitnessEvidenceFR225(fullInput())),
    );
    const clone = persisted(verified) as typeof verified;
    expect(() => assertVerifiedPersistedExternalWitnessEvidenceFR225(clone))
      .toThrow(/not verified by the active FR225 runtime/u);
  });
});
