export const R075_MONTHLY_LUCK_BOUNDARY_VERSION = '0.1.0-research' as const;

export const R075_REQUIRED_CONTEXT_LAYERS = Object.freeze([
  'NATAL_CONTEXT',
  'DAYUN_CONTEXT',
  'ANNUAL_CONTEXT',
  'MONTHLY_STEM_BRANCH',
  'CROSS_LAYER_INTERACTIONS',
] as const);

export const R075_DIRECT_BOUNDARY = Object.freeze({
  sourceSurface: '至本年每月之吉凶，倣此推究',
  monthlyIsLowerTemporalLayer: true,
  monthlyStandaloneOracleAuthorized: false,
  monthlyPermanentNatalMutationAuthorized: false,
  executable: false,
});

export const R075_REJECTED_SHORTCUTS = Object.freeze([
  'MONTH_PILLAR_ALONE_IMPLIES_EVENT',
  'MONTH_OVERRIDES_NATAL_DAYUN_YEAR',
  'ONE_MONTH_RELATION_GUARANTEES_EVENT',
  'MONTHLY_RESULT_FROM_ZODIAC_RELATION_ONLY',
  'MONTHLY_LUCK_PERMANENTLY_CHANGES_NATAL_STRUCTURE',
  'MONTHLY_GOOD_BAD_SCORE_WITHOUT_UPSTREAM_CONTEXT',
] as const);

export const R075_EXECUTION_GAPS = Object.freeze([
  'DAYUN_CONTEXT_INPUT',
  'ANNUAL_CONTEXT_INPUT',
  'MONTHLY_STEM_BRANCH_INTERACTION',
  'CROSS_LAYER_PRECEDENCE',
  'EVENT_BRIDGE',
  'MONTH_BOUNDARY_CALENDAR_POLICY',
] as const);

export const R075_AUTHORITY = Object.freeze({
  status: 'VERIFIED_LOWER_TEMPORAL_LAYER_BOUNDARY' as const,
  requiredContextLayerCount: 5,
  standaloneMonthlyOracleAuthorized: false,
  deterministicMonthlyEventAuthorized: false,
  executableMonthlyResolverAuthorized: false,
  productionAuthorityPromoted: false,
});
