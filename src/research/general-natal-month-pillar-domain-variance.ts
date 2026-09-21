export const R062_MONTH_PILLAR_DOMAIN_VERSION = '0.1.0-research' as const;

export const R062_MONTH_DOMAIN_CLAIMS = Object.freeze([
  {
    id: 'SANMING_V7_PARENTS_SIBLINGS_GATEWAY',
    sourceStratum: 'SANMING_TONGHUI_VOLUME_7',
    sourceSurface: '月為父母兄弟門戶',
    domains: ['PARENTS', 'SIBLINGS', 'HOUSEHOLD_GATEWAY'] as const,
    roleScope: 'GENERAL',
    executable: false,
  },
  {
    id: 'SANMING_V7_LIUQIN_SIBLINGS',
    sourceStratum: 'SANMING_TONGHUI_VOLUME_7_LIUQIN',
    sourceSurface: '月為兄弟',
    domains: ['SIBLINGS'] as const,
    roleScope: 'GENERAL',
    executable: false,
  },
  {
    id: 'SANMING_V7_OFFICIAL_PEERS',
    sourceStratum: 'SANMING_TONGHUI_VOLUME_7_LIUQIN',
    sourceSurface: '官員以月為僚友',
    domains: ['OFFICIAL_PEERS'] as const,
    roleScope: 'OFFICIAL',
    executable: false,
  },
  {
    id: 'SANMING_V2_DINGZHEN_BOUNDED_SIBLING_EXAMPLE',
    sourceStratum: 'SANMING_TONGHUI_SIKU_VOLUME_2_DINGZHENLUN',
    sourceSurface: '以月為兄弟如火命生酉戌亥子月言兄弟不得力之斷',
    domains: ['SIBLINGS'] as const,
    roleScope: 'BOUNDED_EXAMPLE',
    executable: false,
  },
  {
    id: 'SANMING_V2_DINGZHEN_PARENTS',
    sourceStratum: 'SANMING_TONGHUI_SIKU_VOLUME_2_DINGZHENLUN',
    sourceSurface: '以月為父母則知親蔭名利有無之類',
    domains: ['PARENTS', 'PARENTAL_PROTECTION'] as const,
    roleScope: 'GENERAL',
    executable: false,
  },
] as const);

export const R062_REJECTED_EXTENSIONS = Object.freeze([
  'UNIVERSAL_MONTH_EQUALS_PARENTS_ONLY',
  'UNIVERSAL_MONTH_EQUALS_SIBLINGS_ONLY',
  'MONTH_EQUALS_CAREER',
  'MONTH_EQUALS_SOCIETY',
  'MONTH_EQUALS_ADOLESCENCE',
  'MONTH_EQUALS_WORKPLACE',
  'DOMAIN_ASSOCIATION_IMPLIES_EVENT_PREDICTION',
] as const);

export const R062_EXECUTION_GAPS = Object.freeze([
  'SOURCE_STRATUM_SELECTION',
  'ROLE_SPECIFIC_SCOPE',
  'MULTI_DOMAIN_RECONCILIATION',
  'DOMAIN_TO_EVENT_SEMANTICS',
  'MODERN_INTERPRETIVE_EXTENSION',
] as const);

export const R062_AUTHORITY = Object.freeze({
  status: 'VERIFIED_SOURCE_STRATUM_VARIANCE' as const,
  directClaimCount: 5,
  universalSingleMonthDomainAuthorized: false,
  modernCareerSocialExtensionsAuthorized: false,
  deterministicEventSemanticsAuthorized: false,
  executableResolverAuthorized: false,
  productionAuthorityPromoted: false,
});
