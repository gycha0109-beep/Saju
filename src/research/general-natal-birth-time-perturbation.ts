export const R087_BIRTH_TIME_PERTURBATION_VERSION = '0.2.0-research' as const;

export const R087_PINNED_CALCULATION_BASELINE = Object.freeze({
  calculationPolicyId: 'myeonghwa-production-civil-midnight-v1',
  authorizationId: 'myeonghwa-production-calculation-default-authorization-v1',
  authorityRecordRef: 'docs/decisions/ADR-0006-production-calculation-default-v1.md',
  engineName: 'manseryeok',
  engineVersion: '2.0.0',
  adapterName: 'myeonghwa-manseryeok-adapter',
  adapterVersion: '0.1.0',
  timeZone: 'Asia/Seoul',
  dayBoundary: 'midnight',
  trueSolarCorrection: false,
  productionCalculationAuthorityPinned: true,
} as const);

export const R087_PRECONDITIONS = Object.freeze([
  'INDEPENDENTLY_REPRODUCIBLE_TIMESTAMP',
  'PLACE_LONGITUDE_AUTHORITY_WHEN_POLICY_REQUIRES',
  'TIMEZONE_LOCAL_TIME_AUTHORITY',
  'CALCULATION_POLICY_ID_VERSION',
  'CALCULATOR_ENGINE_ADAPTER_VERSION',
  'DAY_BOUNDARY_POLICY',
  'SOLAR_TERM_BOUNDARY_BEHAVIOR',
  'INTERPRETATION_COMPARISON_AUTHORITY',
] as const);

export const R087_PERTURBATION_FAMILIES = Object.freeze([
  { id:'HOUR_BRANCH_BOUNDARY', deltasMinutes:[-30,-15,-1,1,15,30] as const },
  { id:'DAY_BOUNDARY', deltasMinutes:[-1,1] as const, productionBaseline:'MIDNIGHT' as const, alternatePolicyMustRemainSeparate:true },
  { id:'SOLAR_TERM_BOUNDARY', deltasMinutes:[-1,1] as const, solarTermInstantMustBePinned:true },
  { id:'INTERIOR_CONTROL', deltasMinutes:[] as const, expectNoPillarChange:true },
] as const);

export const R087_REQUIRED_OUTPUTS = Object.freeze([
  'TIMESTAMP_DELTA',
  'FOUR_PILLAR_DELTA',
  'RESEARCH_CANDIDATE_STATE_DELTA',
  'INTERPRETATION_CLAIM_DELTA',
  'EXPECTED_UNDER_PINNED_POLICY',
] as const);

export const R087_AUTHORITY = Object.freeze({
  status: 'TEST_MANIFEST_READY_CALCULATION_AUTHORITY_PINNED_FULL_EXECUTION_PENDING' as const,
  executionPending: true,
  executionPendingReasons: Object.freeze([
    'GOVERNED_REPRODUCIBLE_INPUT_FIXTURES_NOT_PINNED',
    'INTERPRETATION_COMPARISON_AUTHORITY_NOT_PINNED',
  ] as const),
  calculationAuthorityPinned: true,
  robustnessClaimAuthorized: false,
  historicalInputImputationAuthorized: false,
  alternatePolicyPromotionAuthorized: false,
  productionInterpretationAuthorityPromoted: false,
} as const);
