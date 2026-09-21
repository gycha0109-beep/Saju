export const R058_PO_SOURCE_VARIANCE_VERSION = '0.1.0-research' as const;

export const R058_SELECTED_SOURCE_PAIRS = Object.freeze([
  ['卯', '午'],
  ['丑', '辰'],
  ['子', '酉'],
  ['未', '戌'],
] as const);

export const R058_SELECTED_SOURCE_EXCLUSIONS = Object.freeze([
  {
    sourcePhraseFamily: '寅申巳亥',
    excludedFromSelectedPoShaRule: true,
    laterCommonPoPairsAutoImported: false,
  },
] as const);

export const R058_LATER_COMMON_VARIANT = Object.freeze({
  pairsOftenAdded: [
    ['寅', '亥'],
    ['巳', '申'],
  ] as const,
  treatedAsSelectedSourceAuthority: false,
  crossSourceReconciliationRequired: true,
});

export const R058_EFFECT_BOUNDARY = Object.freeze({
  sourceWarningObserved: true,
  warningMeaning: 'CLASH_OR_BREAK_RELATION_DOES_NOT_IMPLY_ALWAYS_INAUSPICIOUS' as const,
  automaticHarmAuthorized: false,
  fixedSeverityAuthorized: false,
  numericWeightAuthorized: false,
});

export const R058_EXECUTION_GAPS = Object.freeze([
  'PO_CROSS_SOURCE_PAIR_RECONCILIATION',
  'PO_CONTEXT_EFFECT',
  'PO_DIRECTIONAL_EFFECT',
  'PO_SEVERITY_WEIGHT',
  'PO_ROLE_CONTEXT',
  'PO_TIME_LAYER_ACTIVATION',
  'CROSS_RELATION_PRECEDENCE',
] as const);

export const R058_AUTHORITY = Object.freeze({
  status: 'VERIFIED_SELECTED_SOURCE_VARIANT_ONLY' as const,
  selectedSourcePairCount: 4,
  universalPairRegistryAuthorized: false,
  automaticHarmAuthorized: false,
  numericWeightAuthorized: false,
  executableEffectResolverAuthorized: false,
  productionAuthorityPromoted: false,
});
