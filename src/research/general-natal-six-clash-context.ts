export const R055_SIX_CLASH_CONTEXT_VERSION = '0.1.0-research' as const;

export const R055_SIX_CLASH_PAIRS = Object.freeze([
  ['子', '午'],
  ['丑', '未'],
  ['寅', '申'],
  ['卯', '酉'],
  ['辰', '戌'],
  ['巳', '亥'],
] as const);

export const R055_CONTEXT_AXES = Object.freeze([
  {
    axis: 'POSITION_DISTANCE',
    sourceMaterialityVerified: true,
    generalizedResolverAuthorized: false,
    numericWeightAuthorized: false,
  },
  {
    axis: 'COMPETING_COMBINATION_OR_MEETING',
    sourceMaterialityVerified: true,
    generalizedResolverAuthorized: false,
    numericWeightAuthorized: false,
  },
  {
    axis: 'USEFUL_OR_ADVERSE_ROLE_CONTEXT',
    sourceMaterialityVerified: true,
    generalizedResolverAuthorized: false,
    numericWeightAuthorized: false,
  },
  {
    axis: 'BRANCH_CATEGORY',
    sourceMaterialityVerified: true,
    generalizedResolverAuthorized: false,
    numericWeightAuthorized: false,
  },
  {
    axis: 'MULTIPLICITY_AND_REACTIVATION',
    sourceMaterialityVerified: true,
    generalizedResolverAuthorized: false,
    numericWeightAuthorized: false,
  },
] as const);

export const R055_QUALITATIVE_CATEGORY_BOUNDARY = Object.freeze([
  {
    branches: ['寅', '申', '巳', '亥'] as const,
    sourceDescription: '生地 clash can be especially material',
    fixedWeightAuthorized: false,
  },
  {
    branches: ['子', '午', '卯', '酉'] as const,
    sourceDescription: 'outcome can succeed or fail depending on configuration',
    fixedWeightAuthorized: false,
  },
  {
    branches: ['辰', '戌', '丑', '未'] as const,
    sourceDescription: 'same-Earth clash is treated differently and often with less direct damage',
    fixedWeightAuthorized: false,
  },
] as const);

export const R055_EXECUTION_GAPS = Object.freeze([
  'POSITIONAL_PROXIMITY_CLASSIFIER',
  'RELATION_COMPETITION_RESOLVER',
  'ROLE_CONTEXT_RESOLVER',
  'MULTIPLICITY_ACTIVATION_RULE',
  'TIME_LAYER_ACTIVATION_RULE',
  'CLASH_EFFECT_SETTLEMENT',
  'CROSS_RELATION_PRECEDENCE',
] as const);

export const R055_AUTHORITY = Object.freeze({
  status: 'VERIFIED_CONTEXT_AXES_ONLY' as const,
  structuralPairCount: 6,
  pairPresenceImpliesEffectiveClash: false,
  clashImpliesHarmful: false,
  numericClashStrengthAuthorized: false,
  universalMultiplicityRuleAuthorized: false,
  universalCrossRelationPrecedenceAuthorized: false,
  executableEffectResolverAuthorized: false,
  productionAuthorityPromoted: false,
});
