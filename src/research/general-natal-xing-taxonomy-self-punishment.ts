export const R056_XING_TAXONOMY_VERSION = '0.1.0-research' as const;

export const R056_DIRECTED_XING_RELATIONS = Object.freeze([
  { from: '子', to: '卯', family: 'ZI_MAO_RECIPROCAL' },
  { from: '卯', to: '子', family: 'ZI_MAO_RECIPROCAL' },
  { from: '寅', to: '巳', family: 'YIN_SI_SHEN' },
  { from: '巳', to: '申', family: 'YIN_SI_SHEN' },
  { from: '申', to: '寅', family: 'YIN_SI_SHEN' },
  { from: '丑', to: '戌', family: 'CHOU_XU_WEI' },
  { from: '戌', to: '未', family: 'CHOU_XU_WEI' },
  { from: '未', to: '丑', family: 'CHOU_XU_WEI' },
] as const);

export const R056_SELF_XING_BRANCHES = Object.freeze([
  {
    branch: '辰',
    observedStructuralForm: 'SAME_BRANCH_REPETITION',
    automaticHarmAuthorized: false,
  },
  {
    branch: '午',
    observedStructuralForm: 'SAME_BRANCH_REPETITION',
    automaticHarmAuthorized: false,
  },
  {
    branch: '酉',
    observedStructuralForm: 'SAME_BRANCH_REPETITION',
    automaticHarmAuthorized: false,
  },
  {
    branch: '亥',
    observedStructuralForm: 'SAME_BRANCH_REPETITION',
    automaticHarmAuthorized: false,
  },
] as const);

export const R056_TAXONOMY_LABEL_BOUNDARY = Object.freeze({
  structuralMemberRelationsCrossSourceObserved: true,
  explanatoryClassLabelsCrossSourceUnified: false,
  unqualifiedWuenOrShishiCanonicalMappingAuthorized: false,
});

export const R056_EXECUTION_GAPS = Object.freeze([
  'XING_CONTEXT_EFFECT',
  'SELF_XING_MULTIPLICITY',
  'SOURCE_STRATUM_LABEL_RECONCILIATION',
  'RELATION_COMPETITION',
  'ROLE_CONTEXT',
  'TIME_LAYER_ACTIVATION',
] as const);

export const R056_AUTHORITY = Object.freeze({
  status: 'VERIFIED_STRUCTURAL_TAXONOMY_ONLY' as const,
  directedNonSelfRelationCount: 8,
  selfXingBranchCount: 4,
  structuralPresenceImpliesHarm: false,
  selfXingImpliesHarm: false,
  numericSeverityAuthorized: false,
  executableEffectResolverAuthorized: false,
  productionAuthorityPromoted: false,
});
