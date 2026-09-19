export const R080_HISTORICAL_CHRONOLOGY_BACKTEST_VERSION = '0.1.0-research' as const;

export const R080_CASES = Object.freeze([
  {
    id: 'YUAN-SHIKAI-MAO-LUCK',
    person: '袁世凱',
    interpretiveClaim: '至卯運...眾叛親離',
    sourceChart: ['己未', '癸酉', '丁巳', '丁未'] as const,
    independentlyVerifiedBirthDate: '1859-09-16',
    historicalEventWindow: '1915-1916',
    derivedDayunBranchWindow: 'APPROX_1912_1922_DING_MAO',
    classification: 'RETROSPECTIVE_CHRONOLOGY_ALIGNMENT',
    prospectivePredictiveEvidence: false,
    executable: false,
  },
  {
    id: 'LI-GUOJIE-WEI-JIAXU',
    person: '李國傑',
    interpretiveClaim: '幼行未運，加以甲戌流年...受牢獄之災',
    independentlyVerifiedBirthDate: null,
    historicalEventWindow: 'EARLY_1930S',
    derivedDayunBranchWindow: null,
    classification: 'REJECTED_FOR_CLEAN_BACKTEST_PENDING_BIRTH_AND_EVENT_CHRONOLOGY',
    prospectivePredictiveEvidence: false,
    executable: false,
  },
] as const);

export const R080_YUAN_DERIVATION = Object.freeze({
  directionRule: 'YIN_MALE_REVERSE',
  startAgeRule: 'APPROX_THREE_DAYS_PER_YEAR',
  monthPillar: '癸酉',
  reverseSequence: ['壬申', '辛未', '庚午', '己巳', '戊辰', '丁卯'] as const,
  birthAfterPreviousJieDaysApprox: '7_TO_8',
  startAgeYearsApprox: '2.3_TO_2.7',
  dingMaoWindowApprox: '1912_TO_1922',
  exactBoundaryAuthorized: false,
});

export const R080_REJECTED_SHORTCUTS = Object.freeze([
  'ONE_RETROSPECTIVE_MATCH_PROVES_PREDICTIVE_ACCURACY',
  'SOURCE_CASE_NARRATIVE_COUNTS_AS_INDEPENDENT_HISTORY',
  'APPROXIMATE_DECADE_MATCH_EQUALS_EVENT_PREDICTION',
  'FAILED_OR_AMBIGUOUS_CASES_ARE_DROPPED_SILENTLY',
  'HISTORICAL_ALIGNMENT_PROMOTES_PRODUCTION_TIMING_AUTHORITY',
] as const);

export const R080_EXECUTION_GAPS = Object.freeze([
  'PROSPECTIVE_OR_PRE_EVENT_SOURCE_CASES',
  'INDEPENDENT_EXACT_BIRTH_TIMESTAMPS',
  'REPRODUCIBLE_DAYUN_START_CALCULATION',
  'PRE_REGISTERED_EVENT_LABELS',
  'NEGATIVE_CASE_CORPUS',
  'SAMPLE_SIZE',
  'CALIBRATION_METRIC',
] as const);

export const R080_AUTHORITY = Object.freeze({
  status: 'ONE_RETROSPECTIVE_ALIGNMENT_ONE_REJECTED_CANDIDATE' as const,
  acceptedChronologyAlignmentCount: 1,
  rejectedBacktestCandidateCount: 1,
  predictiveValidationEstablished: false,
  accuracyMetricAuthorized: false,
  executableTemporalPredictionAuthorized: false,
  productionAuthorityPromoted: false,
});
