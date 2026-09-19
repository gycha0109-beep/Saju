export const R073_TEMPORAL_LATENT_ACTIVATION_VERSION = '0.1.0-research' as const;

export const R073_STATE_MODEL = Object.freeze([
  {
    state: 'NATAL_LATENT',
    sourceMeaning: '原局支中所藏，靜而待用',
    eventAuthorized: false,
    executable: false,
  },
  {
    state: 'ACTIVATED_BY_TRANSPARENCY',
    sourceMeaning: '逢運引出 / 透清，其用方顯',
    eventAuthorized: false,
    executable: false,
  },
  {
    state: 'ACTIVATED_BY_NATAL_LUCK_MEETING',
    sourceMeaning: '命與運二支會局，亦作清論',
    eventAuthorized: false,
    executable: false,
  },
  {
    state: 'TEMPORARY_OPERATIVE_STATE',
    sourceMeaning: '運中透清或會合可僅限相關五年，過此則依然如故',
    eventAuthorized: false,
    executable: false,
  },
  {
    state: 'POSITION_CONTEXT_MODULATED',
    sourceMeaning: '在年則重，在日次之，時則緩而不急',
    eventAuthorized: false,
    executable: false,
  },
] as const);

export const R073_REJECTED_SHORTCUTS = Object.freeze([
  'LATENT_EQUALS_ACTIVE',
  'ACTIVATION_EQUALS_PERMANENT_NATAL_CHANGE',
  'HIDDEN_STEM_GUARANTEES_FUTURE_ACTIVATION',
  'ANY_LUCK_MATCH_IMPLIES_EVENT',
  'ACTIVATION_IMPLIES_FIXED_POLARITY',
] as const);

export const R073_EXECUTION_GAPS = Object.freeze([
  'ACTIVATION_TRIGGER_MATCHING',
  'ACTIVATION_DURATION',
  'POSITION_CONTEXT_MODULATION',
  'STRUCTURAL_CHANGE_THRESHOLD',
  'EVENT_BRIDGE',
  'POLARITY_SETTLEMENT',
] as const);

export const R073_AUTHORITY = Object.freeze({
  status: 'VERIFIED_LATENT_ACTIVATION_STATE_SEPARATION' as const,
  stateCount: 5,
  activationImpliesPermanentNatalChange: false,
  activationImpliesConcreteEvent: false,
  executableTimingResolverAuthorized: false,
  productionAuthorityPromoted: false,
});
