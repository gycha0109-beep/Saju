export const R087_BIRTH_TIME_PERTURBATION_VERSION = '0.1.0-research' as const;

export const R087_PRECONDITIONS = Object.freeze([
  'EXACT_TIMESTAMP_PRECISION',
  'PLACE_LONGITUDE_AUTHORITY',
  'TIMEZONE_LOCAL_TIME_AUTHORITY',
  'SOLAR_TIME_POLICY',
  'DAY_BOUNDARY_POLICY',
  'SOLAR_TERM_BOUNDARY_POLICY',
  'CALCULATOR_EPHEMERIS_VERSION',
] as const);

export const R087_PERTURBATION_FAMILIES = Object.freeze([
  { id:'HOUR_BRANCH_BOUNDARY', deltasMinutes:[-30,-15,-1,1,15,30] as const },
  { id:'DAY_BOUNDARY', deltasMinutes:[-1,1] as const, boundaryPolicyMustBePinned:true },
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
  status: 'TEST_MANIFEST_READY_EXECUTION_PENDING' as const,
  executionPending: true,
  robustnessClaimAuthorized: false,
  calculatorAuthorityPromoted: false,
  productionAuthorityPromoted: false,
});
