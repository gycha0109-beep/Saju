export const R064_HOUR_PILLAR_DOMAIN_VERSION = '0.1.0-research' as const;

export const R064_HOUR_DOMAIN_CLAIMS = Object.freeze([
  {
    id: 'SANMING_V7_OFFSPRING',
    sourceStratum: 'SANMING_TONGHUI_VOLUME_7',
    sourceSurface: '時為子息',
    domains: ['OFFSPRING'] as const,
    roleScope: 'GENERAL',
    executable: false,
  },
  {
    id: 'SANMING_V7_DESCENDANTS',
    sourceStratum: 'SANMING_TONGHUI_VOLUME_7_LIUQIN',
    sourceSurface: '時為子孫',
    domains: ['DESCENDANTS'] as const,
    roleScope: 'GENERAL',
    executable: false,
  },
  {
    id: 'SANMING_V7_OFFICIAL_SEAT',
    sourceStratum: 'SANMING_TONGHUI_VOLUME_7_LIUQIN',
    sourceSurface: '官員以時為帝座禍福',
    domains: ['OFFICIAL_SEAT_FORTUNE'] as const,
    roleScope: 'OFFICIAL',
    executable: false,
  },
  {
    id: 'SANMING_V2_DINGZHEN_BOUNDED_CHILD_EXAMPLE',
    sourceStratum: 'SANMING_TONGHUI_SIKU_VOLUME_2_DINGZHENLUN',
    sourceSurface: '或時為子臨死絕傷煞之鄉言少子之斷',
    domains: ['OFFSPRING'] as const,
    roleScope: 'BOUNDED_EXAMPLE',
    executable: false,
  },
  {
    id: 'SANMING_V2_DINGZHEN_STATUS_FIELD',
    sourceStratum: 'SANMING_TONGHUI_SIKU_VOLUME_2_DINGZHENLUN',
    sourceSurface: '以時分野當推貴賤貧富之區',
    domains: ['STATUS_CONDITION_FIELD'] as const,
    roleScope: 'GENERAL',
    executable: false,
  },
] as const);

export const R064_REJECTED_EXTENSIONS = Object.freeze([
  'UNIVERSAL_HOUR_EQUALS_CHILDREN_ONLY',
  'HOUR_EQUALS_OLD_AGE',
  'HOUR_EQUALS_LEGACY',
  'HOUR_EQUALS_ASPIRATIONS',
  'HOUR_EQUALS_SUBORDINATES',
  'HOUR_EQUALS_FUTURE_SELF',
  'HOUR_EQUALS_CAREER_OUTCOME',
  'DOMAIN_ASSOCIATION_IMPLIES_EVENT_PREDICTION',
] as const);

export const R064_EXECUTION_GAPS = Object.freeze([
  'SOURCE_STRATUM_SELECTION',
  'ROLE_SPECIFIC_SCOPE',
  'MULTI_DOMAIN_RECONCILIATION',
  'DOMAIN_TO_EVENT_SEMANTICS',
  'MODERN_INTERPRETIVE_EXTENSION',
] as const);

export const R064_AUTHORITY = Object.freeze({
  status: 'VERIFIED_SOURCE_STRATUM_VARIANCE' as const,
  directClaimCount: 5,
  universalSingleHourDomainAuthorized: false,
  modernFutureLegacyExtensionsAuthorized: false,
  deterministicEventSemanticsAuthorized: false,
  executableResolverAuthorized: false,
  productionAuthorityPromoted: false,
});
