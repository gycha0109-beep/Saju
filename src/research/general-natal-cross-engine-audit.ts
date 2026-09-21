export const R089_CROSS_ENGINE_AUDIT_VERSION = '0.2.0-research' as const;

export const R089_GOVERNED_BASELINE = Object.freeze({
  repositoryCommit: '86c043553430ed7fc9f6bd90e2e68953ad24d879',
  calculationPolicyId: 'myeonghwa-production-civil-midnight-v1',
  engine: 'manseryeok',
  engineVersion: '2.0.0',
  adapter: 'myeonghwa-manseryeok-adapter',
  adapterVersion: '0.1.0',
  timeZone: 'Asia/Seoul',
  dayBoundary: 'midnight',
  trueSolarCorrection: false,
  productionCalculationAuthorityPinned: true,
} as const);

export const R089_COMPARATOR_CANDIDATES = Object.freeze([
  {
    id:'K_SAJU',
    repository:'https://github.com/bunhine0452/k-saju',
    defaultBranch:'main',
    snapshotCommit:'7185fa5be80166d705e83741bf82b06fa98ce6e9',
    authority:'COMPARATOR_ONLY',
  },
  {
    id:'BAZI_CORE',
    repository:'https://github.com/Eastern-Sunrise/bazi-core',
    defaultBranch:'master',
    snapshotCommit:'ede8eb34620dbe31f072c34659be4077178e6cda',
    authority:'COMPARATOR_ONLY',
  },
  {
    id:'TYME_BAZI_MCP',
    repository:'https://github.com/Zojekin/tyme-bazi-mcp',
    defaultBranch:'main',
    snapshotCommit:'27ce0b997f4a1371cce419f311749bebbcb8b373',
    authority:'COMPARATOR_ONLY',
  },
] as const);

export const R089_REQUIRED_POLICY_AXES = Object.freeze([
  'CALENDAR_INPUT_SEMANTICS',
  'TIMEZONE_CIVIL_TIME_AUTHORITY',
  'DAY_BOUNDARY',
  'SOLAR_TERM_BOUNDARY',
  'TRUE_SOLAR_LONGITUDE_EQUATION_OF_TIME',
  'UNKNOWN_TIME_SEMANTICS',
  'LUCK_DIRECTION_INPUTS',
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
  'DATASET_DIFFERENCE_IS_AUTOMATIC_ENGINE_BUG',
  'UNPINNED_LATEST_ENGINE_VERSION',
  'INFER_VERSION_FROM_COMMIT_OR_DATE',
] as const);

export const R089_AUTHORITY = Object.freeze({
  status: 'COMPARATOR_MANIFEST_READY_COMMITS_SNAPSHOTTED_EXTERNAL_REPLAY_PENDING' as const,
  comparatorCandidateCount: 3,
  comparatorCommitsSnapshotted: true,
  externalReplayPending: true,
  majorityVoteAuthority: false,
  externalAgreementChangesProduction: false,
  productionCalculationAuthorityChanged: false,
} as const);
