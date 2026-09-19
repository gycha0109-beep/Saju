export const R066_WEALTH_CLAIM_CORPUS_VERSION = '0.1.0-research' as const;

export const R066_SEMANTIC_CLASSES = Object.freeze([
  'MATERIAL_WEALTH',
  'SPOUSE_WIFE_CONCUBINE',
  'ABILITY_CAPABILITY',
  'TRAVEL_HORSE_ASSOCIATION',
] as const);

export const R066_CONDITION_CLAIMS = Object.freeze([
  {
    id: 'BODY_MUST_BEAR_WEALTH',
    sourceMeaning: '財為我剋，必須身強，方能剋制運用',
    beneficialOutcomeAutomatic: false,
    executable: false,
  },
  {
    id: 'WEAK_BODY_MUCH_WEALTH_CAN_REVERSE',
    sourceMeaning: '身弱而財多，可反為禍',
    beneficialOutcomeAutomatic: false,
    executable: false,
  },
  {
    id: 'WEALTH_PATTERN_IS_CONFIGURATION_BOUND',
    sourceMeaning: '財格成敗 depends on 財生官 / 食生財 / 財印 positioning and related conditions',
    beneficialOutcomeAutomatic: false,
    executable: false,
  },
] as const);

export const R066_REJECTED_SHORTCUTS = Object.freeze([
  'WEALTH_PRESENT_IMPLIES_RICH',
  'MORE_WEALTH_IMPLIES_MORE_RICH',
  'WEALTH_STRONG_IMPLIES_HIGH_INCOME',
  'ZHENGCAI_EQUALS_SALARY_STABLE_INCOME',
  'PIANCAI_EQUALS_INVESTING_SPECULATION_BUSINESS',
  'WEALTH_ALWAYS_MEANS_LITERAL_MONEY',
  'WEALTH_PATTERN_SUCCESS_GUARANTEES_MODERN_NET_WORTH',
] as const);

export const R066_EXECUTION_GAPS = Object.freeze([
  'WEALTH_SEMANTIC_SELECTION',
  'BODY_CAPACITY_CONTEXT',
  'CONFIGURATION_COMPLETENESS',
  'MODERN_INCOME_MAPPING',
  'MODERN_NET_WORTH_MAPPING',
  'OUTCOME_SETTLEMENT',
] as const);

export const R066_AUTHORITY = Object.freeze({
  status: 'VERIFIED_MULTI_SEMANTIC_CONDITION_BOUND_CORPUS' as const,
  semanticClassCount: 4,
  conditionClaimCount: 3,
  presenceImpliesRich: false,
  modernIncomeMappingAuthorized: false,
  executableWealthClassifierAuthorized: false,
  productionAuthorityPromoted: false,
});
