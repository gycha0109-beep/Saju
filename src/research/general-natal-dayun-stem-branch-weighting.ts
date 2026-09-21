export const R071_DAYUN_STEM_BRANCH_WEIGHTING_VERSION = '0.1.0-research' as const;

export const R071_TRADITION_PROPOSITIONS = Object.freeze([
  {
    id: 'YUANHAI-DAYUN-BRANCH-EMPHASIS',
    sourceSurface: '子平之法，大運看支，歲君看干',
    proposition: 'DAYUN_BRANCH_EMPHASIS',
    numericWeightAuthorized: false,
    executable: false,
  },
  {
    id: 'SANMING-STEM-PERIOD-WITH-BRANCH',
    sourceSurface: '凡行運在干，兼用地支之神',
    proposition: 'STEM_PERIOD_WITH_BRANCH_PARTICIPATION',
    numericWeightAuthorized: false,
    executable: false,
  },
  {
    id: 'SANMING-BRANCH-PERIOD-DISCARD-STEM',
    sourceSurface: '在支則棄天干之物。蓋大運重地支',
    proposition: 'BRANCH_PERIOD_STEM_DISCARD_IN_ONE_FORMULATION',
    numericWeightAuthorized: false,
    executable: false,
  },
  {
    id: 'SANMING-V12-FIVE-YEAR-SPLIT',
    sourceSurface: '運行十載數，上下五年分',
    proposition: 'TEN_YEAR_UPPER_LOWER_FIVE_YEAR_SPLIT',
    numericWeightAuthorized: false,
    executable: false,
  },
] as const);

export const R071_REJECTED_WEIGHTING_SHORTCUTS = Object.freeze([
  'STEM_50_BRANCH_50',
  'STEM_30_BRANCH_70',
  'FIRST_FIVE_STEM_ONLY_SECOND_FIVE_BRANCH_ONLY_WITHOUT_DIRECT_MAPPING',
  'BRANCH_ALWAYS_OVERRIDES_STEM_UNIVERSALLY',
  'HIDDEN_NUMERIC_WEIGHT',
] as const);

export const R071_EXECUTION_GAPS = Object.freeze([
  'TRADITION_SELECTION',
  'FIVE_YEAR_SPLIT_OPERATIONAL_MAPPING',
  'STEM_BRANCH_CONFLICT_PRECEDENCE',
  'NATAL_CONTEXT_MODULATION',
  'SCHOOL_PROVENANCE_RECONCILIATION',
] as const);

export const R071_AUTHORITY = Object.freeze({
  status: 'VERIFIED_TRADITION_VARIANCE_NO_NUMERIC_WEIGHT' as const,
  propositionCount: 4,
  universalNumericWeightAuthorized: false,
  fiveYearStemBranchAssignmentAuthorized: false,
  executableDayunWeightingResolverAuthorized: false,
  productionAuthorityPromoted: false,
});
