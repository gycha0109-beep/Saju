export const R079_MULTICYCLE_CONFLICT_CORPUS_VERSION = '0.1.0-research' as const;

export const R079_CONFLICT_DIMENSIONS = Object.freeze([
  'NATAL_CONTEXT',
  'DAYUN_STATE',
  'ANNUAL_STATE',
  'STEM_BRANCH_ROOT_SUPPORT',
  'CLASH_CONTROL_COMBINATION',
  'RESCUE_BLOCKING',
  'DEVELOPED_STATE_TIMING_CONTEXT',
] as const);

export const R079_DIRECT_PROPOSITIONS = Object.freeze([
  {
    id: 'SUIYUN-MUTUAL-SURFACE',
    sourceMeaning: '運與流年二者相為表裡',
    fixedPrecedenceAuthorized: false,
    executable: false,
  },
  {
    id: 'DAYUN-ANNUAL-CONFLICT',
    sourceMeaning: '大運與太歲相剋相衝 requires specific judgment',
    fixedPrecedenceAuthorized: false,
    executable: false,
  },
  {
    id: 'NATAL-RESCUE',
    sourceMeaning: '有貴人祿馬解之稍吉，八字有救無虞',
    fixedPrecedenceAuthorized: false,
    executable: false,
  },
  {
    id: 'CONTEXTUAL-WINNER',
    sourceMeaning: '戰沖視其孰降，和好視其孰切',
    fixedPrecedenceAuthorized: false,
    executable: false,
  },
] as const);

export const R079_REJECTED_SHORTCUTS = Object.freeze([
  'ANNUAL_ALWAYS_BEATS_DAYUN',
  'DAYUN_ALWAYS_BEATS_ANNUAL',
  'NATAL_ALWAYS_OVERRIDES_TEMPORAL',
  'FIXED_LAYER_NUMERIC_WEIGHTS',
  'FIRST_MATCH_WINS',
  'ONE_RELATION_DECIDES_OUTCOME',
  'CONFLICT_NAME_IMPLIES_EVENT',
] as const);

export const R079_EXECUTION_GAPS = Object.freeze([
  'CROSS_LAYER_STATE_COMPOSITION',
  'ROOT_SUPPORT_SETTLEMENT',
  'CLASH_CONTROL_WINNER_SETTLEMENT',
  'COMBINATION_CLOSENESS_SETTLEMENT',
  'RESCUE_BLOCKING_PRECEDENCE',
  'DEVELOPED_STATE_CLASSIFICATION',
  'EVENT_BRIDGE',
] as const);

export const R079_AUTHORITY = Object.freeze({
  status: 'VERIFIED_MULTILAYER_CONFLICT_CORPUS' as const,
  dimensionCount: 7,
  propositionCount: 4,
  totalLayerOrderAuthorized: false,
  numericLayerWeightsAuthorized: false,
  executableMultiCycleResolverAuthorized: false,
  productionAuthorityPromoted: false,
});
