export const R061_YEAR_PILLAR_DOMAIN_VERSION = '0.1.0-research' as const;

export const R061_YEAR_DOMAIN_CLAIMS = Object.freeze([
  {
    id: 'SANMING_V7_ANCESTRAL_ESTATE',
    sourceStratum: 'SANMING_TONGHUI_VOLUME_7',
    sourceSurface: '以年為祖業',
    domain: 'ANCESTRAL_ESTATE',
    sexScope: 'UNSPECIFIED',
    executable: false,
  },
  {
    id: 'SANMING_V2_DINGZHEN_ANCESTRAL_LINEAGE',
    sourceStratum: 'SANMING_TONGHUI_SIKU_VOLUME_2_DINGZHENLUN',
    sourceSurface: '四柱以年為祖上則知世代宗派盛衰之理',
    domain: 'ANCESTRAL_LINEAGE',
    sexScope: 'UNSPECIFIED',
    executable: false,
  },
  {
    id: 'SANMING_V7_MALE_FATHER',
    sourceStratum: 'SANMING_TONGHUI_VOLUME_7_LIUQIN',
    sourceSurface: '男命以年為父',
    domain: 'FATHER',
    sexScope: 'MALE_CHART',
    executable: false,
  },
] as const);

export const R061_REJECTED_EXTENSIONS = Object.freeze([
  'UNIVERSAL_YEAR_EQUALS_FATHER',
  'UNIVERSAL_YEAR_EQUALS_ANCESTORS_ONLY',
  'YEAR_EQUALS_CHILDHOOD',
  'YEAR_EQUALS_PUBLIC_IMAGE',
  'YEAR_EQUALS_SOCIAL_ENVIRONMENT',
  'DOMAIN_ASSOCIATION_IMPLIES_EVENT_PREDICTION',
] as const);

export const R061_EXECUTION_GAPS = Object.freeze([
  'SOURCE_STRATUM_SELECTION',
  'SEX_SPECIFIC_KINSHIP_SCOPE',
  'MULTI_DOMAIN_RECONCILIATION',
  'DOMAIN_TO_EVENT_SEMANTICS',
  'MODERN_INTERPRETIVE_EXTENSION',
] as const);

export const R061_AUTHORITY = Object.freeze({
  status: 'VERIFIED_SOURCE_STRATUM_VARIANCE' as const,
  directClaimCount: 3,
  universalSingleYearDomainAuthorized: false,
  modernPsychologicalExtensionsAuthorized: false,
  deterministicEventSemanticsAuthorized: false,
  executableResolverAuthorized: false,
  productionAuthorityPromoted: false,
});
