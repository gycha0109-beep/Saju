export const R078_FUYIN_FANYIN_TEMPORAL_VERSION = '0.1.0-research' as const;

export const R078_SELECTED_SOURCE_DEFINITIONS = Object.freeze([
  {
    term: 'FANYIN',
    sourceSurface: '若歲運與日相對，謂之返吟',
    temporalActors: ['SUIYUN', 'DAY'] as const,
    universalModernAlgorithmAuthorized: false,
    executable: false,
  },
  {
    term: 'FUYIN',
    sourceSurface: '歲運壓日，謂之伏吟',
    temporalActors: ['SUIYUN', 'DAY'] as const,
    universalModernAlgorithmAuthorized: false,
    executable: false,
  },
] as const);

export const R078_EFFECT_BOUNDARY = Object.freeze({
  adverseFamilyLanguageObserved: true,
  adverseWealthLanguageObserved: true,
  guaranteedDisasterAuthorized: false,
  guaranteedDeathAuthorized: false,
  guaranteedFinancialLossAuthorized: false,
  fixedSeverityScoreAuthorized: false,
});

export const R078_REJECTED_SHORTCUTS = Object.freeze([
  'FUYIN_EQUALS_IDENTICAL_GANZHI_UNIVERSALLY_WITHOUT_SOURCE_MAPPING',
  'FANYIN_EQUALS_EXACT_OPPOSITE_GANZHI_UNIVERSALLY_WITHOUT_SOURCE_MAPPING',
  'FUYIN_FANYIN_AUTO_APPLY_TO_ALL_NATAL_PILLARS',
  'FUYIN_GUARANTEES_DISASTER',
  'FANYIN_GUARANTEES_DISASTER',
  'TEMPORAL_NAME_IMPLIES_CONCRETE_EVENT',
] as const);

export const R078_EXECUTION_GAPS = Object.freeze([
  'XIANGDUI_OPERATIONAL_MAPPING',
  'YARI_OPERATIONAL_MAPPING',
  'STEM_BRANCH_COMPONENT_REQUIREMENTS',
  'TARGET_PILLAR_SCOPE',
  'NATAL_DAYUN_ANNUAL_COMPOSITION',
  'RESCUE_AND_CONTEXT_SETTLEMENT',
  'EVENT_BRIDGE',
] as const);

export const R078_AUTHORITY = Object.freeze({
  status: 'VERIFIED_SELECTED_SOURCE_DEFINITIONS_ONLY' as const,
  definitionCount: 2,
  universalModernAlgorithmAuthorized: false,
  deterministicEventSemanticsAuthorized: false,
  executableTemporalResolverAuthorized: false,
  productionAuthorityPromoted: false,
});
