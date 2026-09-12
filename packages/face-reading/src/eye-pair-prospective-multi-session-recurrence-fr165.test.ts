import { describe, expect, it } from 'vitest';
import type { EyePairProspectiveRecurrenceExecutionResultFR164V1 } from './eye-pair-prospective-recurrence-execution-fr164.js';
import {
  assertIssuedEyePairProspectiveMultiSessionRecurrenceFR165,
  computeEyePairCrossSessionSeriesDescriptiveStatisticsFR165,
  executeEyePairProspectiveMultiSessionRecurrenceFR165,
  FR165_NEXT_FRONTIER,
  FR165_RESEARCH_NOTE_REF,
  type EyePairProspectiveMultiSessionRecurrenceRequestFR165V1,
  type EyePairProspectiveMultiSessionRecurrenceResultFR165V1,
} from './eye-pair-prospective-multi-session-recurrence-fr165.js';

function forgedFR164(): EyePairProspectiveRecurrenceExecutionResultFR164V1 {
  return Object.freeze({}) as unknown as EyePairProspectiveRecurrenceExecutionResultFR164V1;
}

function forgedFR165(): EyePairProspectiveMultiSessionRecurrenceResultFR165V1 {
  return Object.freeze({}) as unknown as EyePairProspectiveMultiSessionRecurrenceResultFR165V1;
}

describe('FR165 eye-pair prospective multi-session recurrence', () => {
  it('computes only the frozen descriptive series statistics for three or more session means', () => {
    const stats = computeEyePairCrossSessionSeriesDescriptiveStatisticsFR165([0.2, 0.18, 0.19]);

    expect(stats.count).toBe(3);
    expect(stats.min).toBeCloseTo(0.18, 12);
    expect(stats.max).toBeCloseTo(0.2, 12);
    expect(stats.mean).toBeCloseTo(0.19, 12);
    expect(stats.range).toBeCloseTo(0.02, 12);
    expect(stats.rangeOverMean).toBeCloseTo(0.02 / 0.19, 12);
    expect(Object.keys(stats).sort()).toEqual(['count', 'max', 'mean', 'min', 'range', 'rangeOverMean'].sort());
  });

  it('rejects fewer than three, non-positive, or non-finite means', () => {
    expect(() => computeEyePairCrossSessionSeriesDescriptiveStatisticsFR165([0.2, 0.18])).toThrow(/at least three finite positive ratios/u);
    expect(() => computeEyePairCrossSessionSeriesDescriptiveStatisticsFR165([0.2, 0.18, 0])).toThrow(/at least three finite positive ratios/u);
    expect(() => computeEyePairCrossSessionSeriesDescriptiveStatisticsFR165([0.2, 0.18, Number.NaN])).toThrow(/at least three finite positive ratios/u);
  });

  it('rejects a structural lookalike instead of accepting forged FR164 provenance', () => {
    const request: EyePairProspectiveMultiSessionRecurrenceRequestFR165V1 = {
      schemaVersion: 'fr165-eye-pair-prospective-multi-session-recurrence-request-v1',
      extensionRunRef: 'fr165:synthetic:forged-base',
      postFR163SessionCapturesAttested: true,
      sameParticipantAcrossSessionsAttested: true,
      sameCaptureSetupAttested: true,
      sessionSeparationIndependentProof: false,
      baseRecurrence: forgedFR164(),
      additionalSessions: [],
    };

    expect(() => executeEyePairProspectiveMultiSessionRecurrenceFR165(request)).toThrow(/not issued/u);
  });

  it('does not accept a structural lookalike as an issued FR165 result', () => {
    expect(() => assertIssuedEyePairProspectiveMultiSessionRecurrenceFR165(forgedFR165())).toThrow(/not issued/u);
  });

  it('keeps the documented next frontier and research note refs stable', () => {
    expect(FR165_RESEARCH_NOTE_REF).toBe('repo:research/face-reading/fr165-eye-pair-prospective-multi-session-recurrence.md');
    expect(FR165_NEXT_FRONTIER).toBe(
      'execute_fr165_when_additional_post_fr163_governed_sessions_are_available_then_continue_descriptive_series_without_independence_repeatability_threshold_quality_or_semantic_promotion',
    );
  });
});
