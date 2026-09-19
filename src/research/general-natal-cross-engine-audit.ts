export const R089_CROSS_ENGINE_AUDIT_VERSION = '0.1.0-research' as const;

export const R089_CURRENT_ENGINE = Object.freeze({
  engine: 'manseryeok',
  engineVersion: '2.0.0',
  adapter: 'myeonghwa-manseryeok-adapter',
  adapterVersion: '0.1.0',
  currentTimeZoneScope: 'Asia/Seoul',
});

export const R089_COMPARATOR_CANDIDATES = Object.freeze([
  { id:'K_SAJU', repository:'https://github.com/bunhine0452/k-saju', authority:'COMPARATOR_ONLY' },
  { id:'BAZIFLOW_CORE', repository:'https://github.com/Eastern-Sunrise/bazi-core', authority:'COMPARATOR_ONLY' },
  { id:'TYME_BAZI_MCP', repository:'https://github.com/Zojekin/tyme-bazi-mcp', authority:'COMPARATOR_ONLY' },
] as const);

export const R089_DISAGREEMENT_CLASSES = Object.freeze([
  'INPUT_NORMALIZATION',
  'YEAR_BOUNDARY',
  'MONTH_SOLAR_TERM_BOUNDARY',
  'DAY_BOUNDARY',
  'HOUR_BRANCH',
  'TRUE_SOLAR_TIME',
  'LUNAR_SOLAR_CONVERSION',
  'LUCK_DIRECTION_OR_START',
  'TEN_GOD_DERIVATION',
  'UNKNOWN_TIME_HANDLING',
] as const);

export const R089_RESULT_CLASSES = Object.freeze([
  'AGREEMENT',
  'POLICY_DIFFERENCE',
  'DATASET_DIFFERENCE',
  'IMPLEMENTATION_DISAGREEMENT',
  'UNRESOLVED',
] as const);

export const R089_REJECTED_SHORTCUTS = Object.freeze([
  'MAJORITY_VOTE_IS_TRUTH',
  'EXTERNAL_ENGINE_AGREEMENT_AUTO_CHANGES_PRODUCTION',
  'MIX_INTERPRETATION_OUTPUT_INTO_CALCULATION_PARITY',
  'COMPARE_UNMATCHED_CONVENTIONS_AS_BUG',
  'UNPINNED_LATEST_ENGINE_VERSION',
] as const);

export const R089_AUTHORITY = Object.freeze({
  status: 'COMPARATOR_MANIFEST_READY_EXTERNAL_REPLAY_PENDING' as const,
  comparatorCandidateCount: 3,
  externalReplayPending: true,
  majorityVoteAuthority: false,
  productionCalculationAuthorityChanged: false,
});
