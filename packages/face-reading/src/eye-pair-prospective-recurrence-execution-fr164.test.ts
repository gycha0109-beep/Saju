import { describe, expect, it } from 'vitest';
import {
  assertIssuedEyePairProspectiveEphemeralRealCaptureSeriesFR161,
  type EyePairProspectiveEphemeralRealCaptureSeriesResultFR161V1,
} from './eye-pair-prospective-ephemeral-real-capture-series-fr161.js';
import {
  computeEyePairCrossSessionDescriptiveStatisticsFR164,
  executeEyePairProspectiveRecurrenceFR164,
  FR164_NEXT_FRONTIER,
  FR164_RESEARCH_NOTE_REF,
  type EyePairProspectiveRecurrenceExecutionRequestFR164V1,
} from './eye-pair-prospective-recurrence-execution-fr164.js';

function forgedSession(): EyePairProspectiveEphemeralRealCaptureSeriesResultFR161V1 {
  return Object.freeze({}) as unknown as EyePairProspectiveEphemeralRealCaptureSeriesResultFR161V1;
}

describe('FR164 eye-pair prospective recurrence execution', () => {
  it('computes only the frozen two-session descriptive convenience statistics', () => {
    const stats = computeEyePairCrossSessionDescriptiveStatisticsFR164([0.2, 0.18]);

    expect(stats.count).toBe(2);
    expect(stats.min).toBeCloseTo(0.18, 12);
    expect(stats.max).toBeCloseTo(0.2, 12);
    expect(stats.mean).toBeCloseTo(0.19, 12);
    expect(stats.range).toBeCloseTo(0.02, 12);
    expect(stats.rangeOverMean).toBeCloseTo(0.02 / 0.19, 12);
    expect(stats.absoluteMeanDifference).toBeCloseTo(0.02, 12);
    expect(stats.relativeMeanShiftFromFirstSession).toBeCloseTo(-0.1, 12);
  });

  it('rejects non-positive or non-finite values rather than deriving a convenience statistic outside the metric domain', () => {
    expect(() => computeEyePairCrossSessionDescriptiveStatisticsFR164([0, 0.2])).toThrow(/finite positive ratios/u);
    expect(() => computeEyePairCrossSessionDescriptiveStatisticsFR164([Number.NaN, 0.2])).toThrow(/finite positive ratios/u);
  });

  it('does not accept a structural lookalike as an issued FR161 real-capture series', () => {
    const forged = forgedSession();
    expect(() => assertIssuedEyePairProspectiveEphemeralRealCaptureSeriesFR161(forged)).toThrow(/not issued/u);

    const request: EyePairProspectiveRecurrenceExecutionRequestFR164V1 = {
      schemaVersion: 'fr164-eye-pair-prospective-recurrence-execution-request-v1',
      recurrenceRunRef: 'fr164:synthetic:forged-boundary',
      postFR163SessionCapturesAttested: true,
      sameParticipantAcrossSessionsAttested: true,
      sameCaptureSetupAttested: true,
      sessionSeparationIndependentProof: false,
      sessions: [
        { sessionRef: 'fr164:session:1', result: forged },
        { sessionRef: 'fr164:session:2', result: forged },
      ],
    };

    expect(() => executeEyePairProspectiveRecurrenceFR164(request)).toThrow(/not issued/u);
  });

  it('keeps the documented next frontier and research note refs stable', () => {
    expect(FR164_RESEARCH_NOTE_REF).toBe('repo:research/face-reading/fr164-eye-pair-prospective-recurrence-execution.md');
    expect(FR164_NEXT_FRONTIER).toBe(
      'collect_additional_post_fr163_governed_sessions_then_extend_descriptive_recurrence_without_independence_repeatability_threshold_quality_or_semantic_promotion',
    );
  });
});
