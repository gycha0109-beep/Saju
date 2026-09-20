import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import type { FR210EyeNeutralAxisBundle } from './eye-neutral-axis-bundle-fr210.js';
import { admitEyePairProspectiveCaptureManifestFR159 } from './eye-pair-prospective-repeatability-protocol-fr159.js';
import {
  admitEyeCornerOrientationCandidateFR218,
  issueCaptureAdmissionFromFR159FR218,
  type FR218MetricCandidateRecord,
} from './observable-morphology-validation-fr218.js';
import {
  assertMaterializedCandidateProvenanceEvidenceFR221,
  assertVerifiedPersistedCandidateProvenanceEvidenceFR221,
  materializeCandidateProvenanceEvidenceFR221,
  verifyPersistedCandidateProvenanceEvidenceFR221,
} from './observable-morphology-persisted-candidate-provenance-fr221.js';

function axis(
  axisKey: 'relative_horizontal_span'
    | 'geometric_vertical_to_horizontal_ratio'
    | 'centroid_separation'
    | 'closed_cycle_turning_angle',
  value: number,
) {
  return {
    axisKey,
    value,
    unit: 'ratio' as const,
    sourceMetricRef: `neutral.test.${axisKey}@0.1.0`,
    semanticScope: 'closed_cycle_geometry_only' as const,
    classificationApplied: false as const,
    thresholdApplied: false as const,
    calibrationApplied: false as const,
    traditionalBindingApplied: false as const,
    anatomicalInterpretationAllowed: false as const,
  };
}

function bundle(tilt: number): FR210EyeNeutralAxisBundle {
  return {
    schemaVersion: 'fr210-eye-neutral-axis-bundle-v1',
    artifactVersion: '0.1.0',
    contractVersion: 'FR210-EYE-NEUTRAL-AXIS-BUNDLE-v1',
    authorityState: 'reused_neutral_eye_geometry_axes_research_only',
    source: {
      fr77ProviderRunRef: 'provider-run:fr221:test',
      fr77CanonicalAssetDigest: `sha256:${'a'.repeat(64)}`,
      fr158SchemaVersion: 'fr158-role-invariant-eye-pair-neutral-shape-metric-runtime-v1',
      fr178SchemaVersion: 'fr178-eye-pair-geometric-y-span-runtime-v1',
      fr209DerivationAttempted: true,
      fr207MayProceedWithoutNewAnatomicalResearch: true,
    },
    axes: {
      relativeHorizontalSpan: axis('relative_horizontal_span', 0.2),
      geometricVerticalToHorizontalRatio: axis('geometric_vertical_to_horizontal_ratio', 0.3),
      centroidSeparation: axis('centroid_separation', 0.4),
      closedCycleTurningAngle: axis('closed_cycle_turning_angle', 0.5),
      outerCornerTilt: {
        axisKey: 'outer_corner_tilt',
        value: tilt,
        unit: 'degree',
        sourceMetricRef: 'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0',
        semanticScope: 'bilateral_visible_corner_geometry_only',
        classificationApplied: false,
        thresholdApplied: false,
        calibrationApplied: false,
        traditionalBindingApplied: false,
        anatomicalInterpretationAllowed: false,
      },
    },
    unsupportedImageTraits: [
      'eyelid_crease_category',
      'hooded_eyelid_category',
      'ocular_radiance_or_visible_brightness_quality',
    ],
    unresolvedProductSurface: ['product_individual_eye_asymmetry_surface'],
    authorityBoundary: {
      newAnatomicalResearchRequired: false,
      providerIndexToAnatomyBindingIssued: false,
      anatomicalLateralityIssued: false,
      physiologicalEyeApertureIssued: false,
      almondRoundNarrowClassifierIssued: false,
      upturnedDownturnedClassifierIssued: false,
      eyelidCreaseClassifierIssued: false,
      hoodedEyelidClassifierIssued: false,
      thresholdIssued: false,
      calibrationIssued: false,
      traditionalBindingIssued: false,
      productionActivated: false,
      commerceActivated: false,
    },
  };
}

function candidate(
  metricValue: number,
  sampleRef: string,
  partition: 'selection' | 'holdout',
  participantKey = `participant:${sampleRef}`,
  captureFamilyKey = `family:${sampleRef}`,
): FR218MetricCandidateRecord {
  const manifest = admitEyePairProspectiveCaptureManifestFR159({
    prospectiveCollectionRef: 'fr221:test:collection',
    captureSeriesRef: `fr221:test:series:${sampleRef}`,
    captureRef: `fr221:test:capture:${sampleRef}`,
    captureConditionRef: 'fr221:test:condition:neutral',
    captureSequenceIndex: 1,
    postPreregistrationFreshCaptureAttested: true,
    sameParticipantSeriesAttested: true,
    usedForCandidateSelection: false,
    developmentCaptureReuse: false,
    identityMatchingPerformed: false,
  });
  const admitted = admitEyeCornerOrientationCandidateFR218(bundle(metricValue), {
    sampleRef,
    participantKey,
    captureFamilyKey,
    partition,
    reviewItemRef: `review-item:${sampleRef}`,
    reviewArtifactRef: `review-artifact:${sampleRef}`,
    captureAdmission: issueCaptureAdmissionFromFR159FR218(manifest),
    confounderTags: ['fr221_mechanics_only'],
  });
  if (admitted.status !== 'available') throw new Error('FR221 test candidate unexpectedly unavailable.');
  return admitted.candidate;
}

function evidence() {
  return materializeCandidateProvenanceEvidenceFR221([
    candidate(-4.5, 'sample:selection:a', 'selection'),
    candidate(0.25, 'sample:selection:b', 'selection'),
    candidate(5.25, 'sample:holdout:a', 'holdout'),
  ]);
}

function canonicalJson(value: unknown): string {
  if (value === null) return 'null';
  if (typeof value === 'string' || typeof value === 'boolean' || typeof value === 'number') {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(',')}]`;
  const record = value as Record<string, unknown>;
  return `{${Object.keys(record).sort().map((key) =>
    `${JSON.stringify(key)}:${canonicalJson(record[key])}`).join(',')}}`;
}

function sha256(value: string): string {
  return `sha256:${createHash('sha256').update(value, 'utf8').digest('hex')}`;
}

function redigestRecord(record: Record<string, unknown>): void {
  const { recordDigest: _ignored, ...payload } = record;
  record.recordDigest = sha256(canonicalJson(payload));
}

function redigestEvidence(value: Record<string, unknown>): void {
  const records = [...(value.records as Record<string, unknown>[])].sort((left, right) =>
    String(left.sampleRef).localeCompare(String(right.sampleRef)));
  const digest = sha256(canonicalJson({
    contractVersion: 'FR221-PERSISTED-CANDIDATE-PROVENANCE-v1',
    sourceContractVersion: 'FR218-OBSERVABLE-MORPHOLOGY-VALIDATION-v1',
    constructRef: 'observable.eye_pair.outer_corner_orientation@0.1.0',
    metricRef: 'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0',
    records,
  }));
  value.evidenceDigest = digest;
  value.evidenceRef =
    `evidence.fr221.observable_morphology_candidate:${digest.slice('sha256:'.length)}`;
  value.candidateCount = records.length;
  value.selectionCount = records.filter((record) => record.partition === 'selection').length;
  value.holdoutCount = records.filter((record) => record.partition === 'holdout').length;
}

describe('FR221 persisted candidate provenance', () => {
  it('materializes only active FR218-issued split-ready candidates and survives JSON round-trip', () => {
    const materialized = evidence();
    expect(() => assertMaterializedCandidateProvenanceEvidenceFR221(materialized)).not.toThrow();
    expect(materialized.selectionCount).toBe(2);
    expect(materialized.holdoutCount).toBe(1);
    expect(materialized.records.every((record) => record.reviewerExposureAllowed === false)).toBe(true);

    const reopened = JSON.parse(JSON.stringify(materialized)) as unknown;
    const verified = verifyPersistedCandidateProvenanceEvidenceFR221(reopened);
    expect(() => assertVerifiedPersistedCandidateProvenanceEvidenceFR221(verified)).not.toThrow();
    expect(verified.evidenceRef).toBe(materialized.evidenceRef);
    expect(Object.fromEntries(
      verified.records.map((record) => [record.sampleRef, record.metricValue]),
    )).toEqual({
      'sample:holdout:a': 5.25,
      'sample:selection:a': -4.5,
      'sample:selection:b': 0.25,
    });
    expect(verified.authorityBoundary.empiricalSufficiencyEstablished).toBe(false);
    expect(verified.authorityBoundary.thresholdIssued).toBe(false);
    expect(verified.authorityBoundary.traditionalBindingIssued).toBe(false);
  });

  it('rejects a metric value edited after materialization', () => {
    const reopened = JSON.parse(JSON.stringify(evidence())) as {
      records: Array<Record<string, unknown>>;
    };
    reopened.records[0]!.metricValue = 999;
    expect(() => verifyPersistedCandidateProvenanceEvidenceFR221(reopened))
      .toThrow(/record\[0\] digest mismatch/u);
  });

  it('rejects aggregate evidence count drift', () => {
    const reopened = JSON.parse(JSON.stringify(evidence())) as Record<string, unknown>;
    reopened.candidateCount = 99;
    expect(() => verifyPersistedCandidateProvenanceEvidenceFR221(reopened))
      .toThrow(/counts do not match/u);
  });

  it('rejects participant partition leakage even when a caller recomputes all digests', () => {
    const reopened = JSON.parse(JSON.stringify(evidence())) as Record<string, unknown>;
    const records = reopened.records as Record<string, unknown>[];
    records[2]!.participantKey = records[0]!.participantKey;
    redigestRecord(records[2]!);
    redigestEvidence(reopened);

    expect(() => verifyPersistedCandidateProvenanceEvidenceFR221(reopened))
      .toThrow(/participant leakage across selection\/holdout/u);
  });

  it('rejects capture-family ownership drift even with internally consistent recomputed digests', () => {
    const reopened = JSON.parse(JSON.stringify(evidence())) as Record<string, unknown>;
    const records = reopened.records as Record<string, unknown>[];
    records[2]!.captureFamilyKey = records[1]!.captureFamilyKey;
    redigestRecord(records[2]!);
    redigestEvidence(reopened);

    expect(() => verifyPersistedCandidateProvenanceEvidenceFR221(reopened))
      .toThrow(/capture family belongs to multiple participants/u);
  });

  it('rejects reviewer exposure or semantic-authority widening', () => {
    const reopened = JSON.parse(JSON.stringify(evidence())) as Record<string, unknown>;
    const records = reopened.records as Record<string, unknown>[];
    records[0]!.reviewerExposureAllowed = true;
    redigestRecord(records[0]!);
    redigestEvidence(reopened);
    expect(() => verifyPersistedCandidateProvenanceEvidenceFR221(reopened))
      .toThrow(/schema or authority boundary drift/u);

    const widened = JSON.parse(JSON.stringify(evidence())) as Record<string, unknown>;
    (widened.authorityBoundary as Record<string, unknown>).thresholdIssued = true;
    expect(() => verifyPersistedCandidateProvenanceEvidenceFR221(widened))
      .toThrow(/top-level authority boundary drift/u);
  });

  it('does not treat a JSON clone as active-runtime FR218 materialization authority', () => {
    const reopened = JSON.parse(JSON.stringify(evidence()));
    expect(() => assertMaterializedCandidateProvenanceEvidenceFR221(reopened))
      .toThrow(/not materialized from active FR218 issuance/u);

    const verified = verifyPersistedCandidateProvenanceEvidenceFR221(reopened);
    expect(verified.authorityBoundary
      .persistedDigestConsistencyMeansOriginalFR218IssuanceIndependentlyProven).toBe(false);
    expect(verified.authorityBoundary.freshnessIndependentlyVerified).toBe(false);
    expect(verified.authorityBoundary.sameParticipantIdentityIndependentlyVerified).toBe(false);
    expect(verified.authorityBoundary.repeatCaptureStabilityEstablished).toBe(false);
  });
});
