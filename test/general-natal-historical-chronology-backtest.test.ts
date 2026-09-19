import { describe, expect, it } from 'vitest';
import {
  R080_AUTHORITY,
  R080_CASES,
  R080_EXECUTION_GAPS,
  R080_HISTORICAL_CHRONOLOGY_BACKTEST_VERSION,
  R080_REJECTED_SHORTCUTS,
  R080_YUAN_DERIVATION,
} from '../src/research/general-natal-historical-chronology-backtest.js';

describe('R080 bounded historical chronology backtest', () => {
  it('preserves one retrospective alignment and one rejected candidate', () => {
    expect(R080_HISTORICAL_CHRONOLOGY_BACKTEST_VERSION).toBe('0.1.0-research');
    expect(R080_CASES).toEqual([
      expect.objectContaining({
        person: '袁世凱',
        classification: 'RETROSPECTIVE_CHRONOLOGY_ALIGNMENT',
        prospectivePredictiveEvidence: false,
      }),
      expect.objectContaining({
        person: '李國傑',
        classification: 'REJECTED_FOR_CLEAN_BACKTEST_PENDING_BIRTH_AND_EVENT_CHRONOLOGY',
        prospectivePredictiveEvidence: false,
      }),
    ]);
    expect(R080_CASES.every((x) => x.executable === false)).toBe(true);
  });

  it('records the Yuan reverse-Dayun derivation as approximate, not exact authority', () => {
    expect(R080_YUAN_DERIVATION).toEqual({
      directionRule: 'YIN_MALE_REVERSE',
      startAgeRule: 'APPROX_THREE_DAYS_PER_YEAR',
      monthPillar: '癸酉',
      reverseSequence: ['壬申', '辛未', '庚午', '己巳', '戊辰', '丁卯'],
      birthAfterPreviousJieDaysApprox: '7_TO_8',
      startAgeYearsApprox: '2.3_TO_2.7',
      dingMaoWindowApprox: '1912_TO_1922',
      exactBoundaryAuthorized: false,
    });
  });

  it('rejects retrospective-fit inflation and silent case dropping', () => {
    expect(R080_REJECTED_SHORTCUTS).toContain(
      'ONE_RETROSPECTIVE_MATCH_PROVES_PREDICTIVE_ACCURACY',
    );
    expect(R080_REJECTED_SHORTCUTS).toContain(
      'FAILED_OR_AMBIGUOUS_CASES_ARE_DROPPED_SILENTLY',
    );
  });

  it('keeps prospective cases, negatives, and calibration as open gaps', () => {
    expect(R080_EXECUTION_GAPS).toContain('PROSPECTIVE_OR_PRE_EVENT_SOURCE_CASES');
    expect(R080_EXECUTION_GAPS).toContain('NEGATIVE_CASE_CORPUS');
    expect(R080_EXECUTION_GAPS).toContain('CALIBRATION_METRIC');
  });

  it('does not authorize predictive or Production timing claims', () => {
    expect(R080_AUTHORITY).toEqual({
      status: 'ONE_RETROSPECTIVE_ALIGNMENT_ONE_REJECTED_CANDIDATE',
      acceptedChronologyAlignmentCount: 1,
      rejectedBacktestCandidateCount: 1,
      predictiveValidationEstablished: false,
      accuracyMetricAuthorized: false,
      executableTemporalPredictionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
