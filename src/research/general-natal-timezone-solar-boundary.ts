export const R088_TIMEZONE_SOLAR_BOUNDARY_VERSION = '0.2.0-research' as const;

export const R088_PINNED_PRODUCTION_BASELINE = Object.freeze({
  calculationPolicyId: 'myeonghwa-production-civil-midnight-v1',
  engineName: 'manseryeok',
  engineVersion: '2.0.0',
  adapterName: 'myeonghwa-manseryeok-adapter',
  adapterVersion: '0.1.0',
  timeZone: 'Asia/Seoul',
  dayBoundary: 'midnight',
  trueSolarCorrection: false,
  productionCalculationAuthorityPinned: true,
} as const);

export const R088_TRANSFORMATION_LAYERS = Object.freeze([
  'SOURCE_LOCAL_WALL_CLOCK',
  'HISTORICAL_CIVIL_TIME_RESOLUTION',
  'OPTIONAL_GOVERNED_SOLAR_TIME_TRANSFORMATION',
  'CALENDAR_PILLAR_CALCULATION',
] as const);

export const R088_SENSITIVITY_DIMENSIONS = Object.freeze([
  'TIMEZONE_AUTHORITY_VARIANT',
  'HISTORICAL_CIVIL_TIME_REGIME',
  'LONGITUDE_CORRECTION_POLICY',
  'APPARENT_SOLAR_COMPONENT',
  'BOUNDARY_CROSSING',
] as const);

export const R088_REQUIRED_OUTPUTS = Object.freeze([
  'ORIGINAL_LOCAL_INPUT_PROVENANCE',
  'TIMEZONE_AUTHORITY_DATA_RUNTIME_VERSION',
  'RESOLVED_UTC_INSTANT',
  'CALCULATION_POLICY_ID_VERSION',
  'SOLAR_TIME_METHOD_AND_PARAMETERS',
  'CORRECTED_TIMESTAMP_IF_ANY',
  'FOUR_PILLAR_DELTA',
  'DOWNSTREAM_RESEARCH_STATE_DELTA',
  'BOUNDARY_AND_CAUSE',
] as const);

export const R088_REJECTED_SHORTCUTS = Object.freeze([
  'CURRENT_OFFSET_FOR_HISTORICAL_DATE',
  'COUNTRY_ONLY_TIMEZONE_INFERENCE',
  'SOLAR_CORRECTION_BY_DEFAULT',
  'DOUBLE_APPLY_SOLAR_CORRECTION',
  'COLLAPSE_TIME_UNCERTAINTY_TO_EXACT_INSTANT',
  'TREAT_SENSITIVITY_POLICY_AS_PRODUCTION_DEFAULT',
  'ROBUSTNESS_CLAIM_BEFORE_EXECUTION',
] as const);

export const R088_AUTHORITY = Object.freeze({
  status: 'TEST_MANIFEST_READY_PRODUCTION_BASELINE_PINNED_VARIANT_EXECUTION_PENDING' as const,
  executionPending: true,
  executionPendingReasons: Object.freeze([
    'HISTORICAL_TIMEZONE_DATA_RUNTIME_PROVENANCE_NOT_PINNED_FOR_VARIANTS',
    'SENSITIVITY_SOLAR_TIME_POLICY_NOT_PINNED',
    'GOVERNED_REPRODUCIBLE_INPUT_FIXTURES_NOT_PINNED',
    'INTERPRETATION_COMPARISON_AUTHORITY_NOT_PINNED',
  ] as const),
  productionCalculationBaselinePinned: true,
  defaultSolarCorrectionAuthorized: false,
  historicalTimezoneGuessAuthorized: false,
  alternatePolicyPromotionAuthorized: false,
  robustnessClaimAuthorized: false,
  productionInterpretationAuthorityPromoted: false,
} as const);
