import { describe, expect, it } from 'vitest';
import { FR312G_RELIABILITY_FAMILIES } from './traditional-neutral-metric-reliability-study-fr312g.js';
import {
  evaluateSyntheticRepeatabilityFR312G9,
  type SyntheticMetricObservationFR312G9,
} from './traditional-neutral-metric-synthetic-repeatability-fr312g9.js';

const axes = FR312G_RELIABILITY_FAMILIES.flatMap((family) => family.metricAxes);

function fixture(): SyntheticMetricObservationFR312G9[] {
  const rows: SyntheticMetricObservationFR312G9[] = [];
  for (const axis of axes) {
    for (const participantRef of ['synth-p1', 'synth-p2']) {
      for (const session of ['A', 'B'] as const) {
        for (const capture of ['1', '2'] as const) {
          const position = (session === 'A' ? 0 : 2) + (capture === '1' ? 0 : 1);
          const ratioValue = participantRef === 'synth-p1'
            ? [0.2, 0.4, 0.6, 0.8][position]!
            : 0.1;
          rows.push({
            syntheticFixtureOnly: true,
            participantRef,
            session,
            capture,
            metricRef: axis.metricRef,
            partition: 'development',
            freshCapture: true,
            captureAdmitted: true,
            availability: 'available',
            ratioValue,
            unavailableReason: null,
          });
        }
      }
    }
  }
  return rows;
}

describe('FR312G9 synthetic-only descriptive calculator', () => {
  it('computes exact per-axis within-session and between-session differences by hypothetical participant', () => {
    const output = evaluateSyntheticRepeatabilityFR312G9(fixture());
    expect(output.syntheticParticipantCount).toBe(2);
    expect(output.participantCountIsHypothetical).toBe(true);
    expect(output.axisSummaries.map((item) => item.metricRef))
      .toEqual(axes.map((axis) => axis.metricRef));
    expect(output.axisSummaries).toHaveLength(8);
    for (const axis of output.axisSummaries) {
      expect(axis.captureCount).toBe(8);
      expect(axis.availableCount).toBe(8);
      expect(axis.unavailableCount).toBe(0);
      expect(axis.missingnessRate).toBe(0);
      expect(axis.participantSummaries).toHaveLength(2);
      const p1 = axis.participantSummaries[0]!;
      const p2 = axis.participantSummaries[1]!;
      expect(p1.withinSessionAbsolutePairDifference.A).toBeCloseTo(0.2);
      expect(p1.withinSessionAbsolutePairDifference.B).toBeCloseTo(0.2);
      expect(p1.betweenSessionAbsoluteSessionMeanDifference).toBeCloseTo(0.4);
      expect(p1.withinParticipantRange).toBeCloseTo(0.6);
      expect(p2.withinSessionAbsolutePairDifference.A).toBe(0);
      expect(p2.betweenSessionAbsoluteSessionMeanDifference).toBe(0);
      expect(axis.syntheticIllustrationOnly).toBe(true);
      expect(axis.empiricalEvidenceAdmitted).toBe(false);
    }
    expect(output.actualParticipantCollectionAuthorized).toBe(false);
    expect(output.numericParticipantCountApproved).toBe(false);
    expect(output.reliabilityAcceptanceDetermined).toBe(false);
    expect(output.fr312hEntryAuthorized).toBe(false);
    expect(output.traditionalMeaningValidationAuthorized).toBe(false);
    expect(output.productInterpretationAuthorized).toBe(false);
  });

  it('retains unavailable reasons, never imputes zero, and suppresses incomplete session comparison', () => {
    const rows = fixture();
    const index = rows.findIndex((item) =>
      item.metricRef === axes[0]!.metricRef
      && item.participantRef === 'synth-p1'
      && item.session === 'B' && item.capture === '2');
    rows[index] = {
      ...rows[index]!,
      availability: 'unavailable',
      ratioValue: null,
      unavailableReason: 'not_observable',
    };
    const axis = evaluateSyntheticRepeatabilityFR312G9(rows).axisSummaries[0]!;
    expect(axis.availableCount).toBe(7);
    expect(axis.unavailableCount).toBe(1);
    expect(axis.captureCount).toBe(8);
    expect(axis.missingnessRate).toBe(1 / 8);
    expect(axis.unavailableReasonCount['not_observable']).toBe(1);
    expect(axis.participantSummaries[0]!.withinSessionAbsolutePairDifference.B).toBeNull();
    expect(axis.participantSummaries[0]!.betweenSessionAbsoluteSessionMeanDifference).toBeNull();
    expect(axis.participantSummaries[0]!.withinParticipantRange).toBeCloseTo(0.4);
    expect(axis.participantSummaries[1]!.betweenSessionAbsoluteSessionMeanDifference).toBe(0);
  });

  it('rejects incomplete or duplicated capture slots instead of inventing participants', () => {
    const rows = fixture();
    expect(() => evaluateSyntheticRepeatabilityFR312G9(rows.slice(1)))
      .toThrow('fr312g9_missing_capture_slot_or_axis');
    expect(() => evaluateSyntheticRepeatabilityFR312G9([...rows, rows[0]!]))
      .toThrow('fr312g9_duplicate_capture_slot');
    expect(() => evaluateSyntheticRepeatabilityFR312G9([]))
      .toThrow('fr312g9_empty_or_invalid_fixture');
  });

  it('rejects non-synthetic, non-development, rejected and historical captures', () => {
    const rows = fixture();
    const original = rows[0]!;
    const invalid: Array<Record<string, unknown>> = [
      { ...original, syntheticFixtureOnly: false },
      { ...original, participantRef: 'real-person-12' },
      { ...original, partition: 'holdout' },
      { ...original, partition: 'calibration' },
      { ...original, freshCapture: false },
      { ...original, captureAdmitted: false },
      { ...original, session: 'C' },
      { ...original, imageUrl: 'https://example.com/face.jpg' },
      { ...original, morphologyLabel: 'present' },
      { ...original, directIdentity: 'not-permitted' },
    ];
    for (const item of invalid) {
      expect(() => evaluateSyntheticRepeatabilityFR312G9([
        item as unknown as SyntheticMetricObservationFR312G9,
        ...rows.slice(1),
      ])).toThrow();
    }
  });

  it('rejects invalid ratios, zero-filled missingness, unregistered axes and absent reasons', () => {
    const rows = fixture();
    const original = rows[0]!;
    const invalid: Array<Record<string, unknown>> = [
      { ...original, ratioValue: Number.NaN },
      { ...original, ratioValue: Number.POSITIVE_INFINITY },
      { ...original, ratioValue: -0.1 },
      { ...original, metricRef: 'unregistered-ratio@0.1.0' },
      { ...original, availability: 'unavailable', ratioValue: 0, unavailableReason: 'not_observable' },
      { ...original, availability: 'unavailable', ratioValue: null, unavailableReason: null },
      { ...original, availability: 'unavailable', ratioValue: null, unavailableReason: 'BAD PII' },
      { ...original, availability: 'available', ratioValue: 0.2, unavailableReason: 'not_observable' },
    ];
    for (const item of invalid) {
      expect(() => evaluateSyntheticRepeatabilityFR312G9([
        item as unknown as SyntheticMetricObservationFR312G9,
        ...rows.slice(1),
      ])).toThrow();
    }
    const signedIndex = rows.findIndex((item) => item.metricRef === axes[4]!.metricRef);
    rows[signedIndex] = { ...rows[signedIndex]!, ratioValue: -0.2 };
    expect(() => evaluateSyntheticRepeatabilityFR312G9(rows)).not.toThrow();
  });

  it('is order invariant and never estimates an empirical reliability cutoff', () => {
    const rows = fixture();
    expect(evaluateSyntheticRepeatabilityFR312G9([...rows].reverse()))
      .toEqual(evaluateSyntheticRepeatabilityFR312G9(rows));
    const output = evaluateSyntheticRepeatabilityFR312G9(rows);
    expect(Object.keys(output)).not.toContain('empiricalParticipantCount');
    expect(Object.keys(output)).not.toContain('reliabilityThreshold');
    expect(output.reliabilityAcceptanceDetermined).toBe(false);
  });
});
