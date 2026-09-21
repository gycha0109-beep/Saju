export const R057_LIUHAI_EVIDENCE_WEIGHT_VERSION = '0.1.0-research' as const;

export const R057_LIUHAI_PAIRS = Object.freeze([
  ['子', '未'],
  ['丑', '午'],
  ['寅', '巳'],
  ['卯', '辰'],
  ['申', '亥'],
  ['酉', '戌'],
] as const);

export const R057_DIRECT_MODIFIERS = Object.freeze([
  {
    pair: ['丑', '午'] as const,
    modifier: 'TRUE_GHOST_PRESENT',
    sourceSaysMayIntensify: true,
    executable: false,
  },
  {
    pair: ['寅', '巳'] as const,
    modifier: 'CONTEXTUAL_DISASTER_FORTUNE_ADJUSTMENT',
    sourceSaysMayIntensify: true,
    executable: false,
  },
  {
    pair: ['卯', '辰'] as const,
    modifier: 'TRUE_GHOST_PRESENT',
    sourceSaysMayIntensify: true,
    executable: false,
  },
  {
    pair: ['申', '亥'] as const,
    modifier: 'NAYIN_MUTUAL_CONTROL',
    sourceSaysMayIntensify: true,
    executable: false,
  },
  {
    pair: ['酉', '戌'] as const,
    modifier: 'DIRECTIONAL_ASYMMETRY_OBSERVED',
    sourceSaysMayIntensify: false,
    executable: false,
  },
] as const);

export const R057_CONTEXT_AXES = Object.freeze([
  'SHENGWANG_VS_SIJUE',
  'GUI_GE_VS_JIAN_GE',
  'YANGREN',
  'JIESHA',
  'GUANFU',
  'PALACE_POSITION',
] as const);

export const R057_WEIGHT_BOUNDARY = Object.freeze({
  sourceContext: 'SANMING_TONGHUI_VOLUME_11_YUN_SHENSHA_DISCUSSION' as const,
  boundedRelativePhraseObserved: true,
  phraseIncludesLiuHaiAsLight: true,
  universalNumericSeverityAuthorized: false,
  universalCrossRelationRankingAuthorized: false,
  sourceOrderAsPrecedenceAuthorized: false,
});

export const R057_EXECUTION_GAPS = Object.freeze([
  'LIUHAI_CONTEXT_EFFECT',
  'LIUHAI_DIRECTIONAL_EFFECT',
  'TRUE_GHOST_MODIFIER',
  'NAYIN_CONFLICT_MODIFIER',
  'SHENGWANG_SIJUE_CONTEXT',
  'GEJU_CONTEXT',
  'COFACTOR_INTENSIFICATION',
  'TIME_LAYER_CONTEXT',
  'CROSS_RELATION_PRECEDENCE',
] as const);

export const R057_AUTHORITY = Object.freeze({
  status: 'VERIFIED_STRUCTURAL_PAIRS_AND_CONTEXT_VARIANCE' as const,
  structuralPairCount: 6,
  pairPresenceImpliesFixedEffect: false,
  pairPresenceImpliesHarmfulPolarity: false,
  universalDirectionalEffectAuthorized: false,
  numericWeightAuthorized: false,
  executableEffectResolverAuthorized: false,
  productionAuthorityPromoted: false,
});
