export const R070_FAMILY_DOMAIN_CLAIM_CORPUS_VERSION = '0.1.0-research' as const;

export const R070_CLAIM_LAYERS = Object.freeze([
  {
    id: 'PILLAR-DOMAIN-GENERAL',
    layer: 'PILLAR_DOMAIN',
    sourceSurfaces: ['月為父母兄弟門戶', '時為子息'] as const,
    sexScope: 'UNSPECIFIED',
    executable: false,
  },
  {
    id: 'PILLAR-DOMAIN-MALE-ALTERNATE',
    layer: 'PILLAR_DOMAIN',
    sourceSurfaces: ['年為父', '胎為母', '月為兄弟', '時為子孫'] as const,
    sexScope: 'MALE_CHART',
    executable: false,
  },
  {
    id: 'TEN-GOD-FAMILY-RELATIONS',
    layer: 'STAR_RELATION',
    sourceSurfaces: ['父以偏財論', '母以印綬論', '兄弟者即劫財比肩', '子嗣者即官星也'] as const,
    sexScope: 'SECTION_SCOPED',
    executable: false,
  },
  {
    id: 'FEMALE-CHILD-RELATION',
    layer: 'SEX_SCOPED_RELATION',
    sourceSurfaces: ['我生者為子'] as const,
    sexScope: 'FEMALE_CHART',
    executable: false,
  },
  {
    id: 'CONFIGURATION-OUTCOME',
    layer: 'CONFIGURATION',
    sourceSurfaces: ['旺衰', '生旺死絕', '刑沖破害', '官煞混雜', '財印'] as const,
    sexScope: 'CONTEXT_DEPENDENT',
    executable: false,
  },
] as const);

export const R070_REJECTED_SHORTCUTS = Object.freeze([
  'FATHER_ALWAYS_EQUALS_PIANCAI',
  'MOTHER_ALWAYS_EQUALS_ZHENGYIN_ONLY',
  'CHILD_ALWAYS_EQUALS_GUANSHA',
  'MONTH_PILLAR_ALONE_DETERMINES_PARENTS',
  'HOUR_PILLAR_ALONE_DETERMINES_CHILDREN',
  'FAMILY_STAR_ABSENCE_IMPLIES_RELATIVE_ABSENCE',
  'FAMILY_STAR_PRESENCE_IMPLIES_FIXED_RELATIVE_OUTCOME',
  'HISTORICAL_FAMILY_ROLE_AUTO_EQUALS_MODERN_FAMILY_PREDICTION',
] as const);

export const R070_EXECUTION_GAPS = Object.freeze([
  'FAMILY_METHOD_SELECTION',
  'SEX_SCOPE_SELECTION',
  'PILLAR_DOMAIN_VS_STAR_RELATION_RECONCILIATION',
  'HIDDEN_VS_VISIBLE_STAR_HANDLING',
  'CONFIGURATION_OUTCOME_SETTLEMENT',
  'HISTORICAL_TO_MODERN_FAMILY_TRANSLATION',
] as const);

export const R070_AUTHORITY = Object.freeze({
  status: 'VERIFIED_MULTI_LAYER_FAMILY_CLAIM_CORPUS' as const,
  claimLayerCount: 5,
  universalFamilyLookupTableAuthorized: false,
  starPresenceImpliesRelativeExistence: false,
  deterministicFamilyOutcomeAuthorized: false,
  executableFamilyClassifierAuthorized: false,
  productionAuthorityPromoted: false,
});
