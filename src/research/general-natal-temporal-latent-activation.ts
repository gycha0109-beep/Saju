export const R073_TEMPORAL_LATENT_ACTIVATION_VERSION = '0.1.0-research' as const;

export const R073_STATE_MODEL = Object.freeze([
  {
    state: 'NATAL_LATENT',
    sourceRepresentation: '原局支中所藏之神不一，為喜為忌，靜而待用，逢運引出，其用方顯',
    provenanceKind: 'DIRECT_QUOTE',
    eventAuthorized: false,
    executable: false,
  },
  {
    state: 'ACTIVATED_BY_TRANSPARENCY',
    sourceRepresentation: '原局支中所藏之神不一，為喜為忌，靜而待用，逢運引出，其用方顯',
    provenanceKind: 'DIRECT_QUOTE',
    eventAuthorized: false,
    executable: false,
  },
  {
    state: 'ACTIVATED_BY_NATAL_LUCK_MEETING',
    sourceRepresentation: '命與運二支會局，亦作清論',
    provenanceKind: 'DIRECT_QUOTE',
    eventAuthorized: false,
    executable: false,
  },
  {
    state: 'TEMPORARY_OPERATIVE_STATE',
    sourceRepresentation: '運中透清或會合可僅限相關五年，過此則依然如故',
    provenanceKind: 'PARAPHRASED_SOURCE_CLASS',
    eventAuthorized: false,
    executable: false,
  },
  {
    state: 'POSITION_CONTEXT_MODULATED',
    sourceRepresentation: '在年則重，在日次之，時則緩而不急',
    provenanceKind: 'BOUNDED_QUOTED_EXCERPT',
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
