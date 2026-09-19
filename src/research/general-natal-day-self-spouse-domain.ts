export const R063_DAY_SELF_SPOUSE_DOMAIN_VERSION = '0.1.0-research' as const;

export const R063_DIRECT_CLAIMS = Object.freeze([
  {
    id: 'SANMING_V7_DAY_SELF_SPOUSE',
    sourceStratum: 'SANMING_TONGHUI_VOLUME_7',
    sourceSurface: '日為妻妾己身',
    domains: ['SELF', 'SPOUSE'] as const,
    branchSpecific: false,
    executable: false,
  },
  {
    id: 'SANMING_V7_LIUQIN_DAY_SELF_SPOUSE',
    sourceStratum: 'SANMING_TONGHUI_VOLUME_7_LIUQIN',
    sourceSurface: '日為己身妻妾',
    domains: ['SELF', 'SPOUSE'] as const,
    branchSpecific: false,
    executable: false,
  },
  {
    id: 'SANMING_V2_DINGZHEN_DAY_SELF',
    sourceStratum: 'SANMING_TONGHUI_SIKU_VOLUME_2_DINGZHENLUN',
    sourceSurface: '以日為己身',
    domains: ['SELF'] as const,
    branchSpecific: false,
    executable: false,
  },
] as const);

export const R063_NARROWER_CLAIM_BOUNDARY = Object.freeze({
  dayPillarSelfDomainDirectlySupported: true,
  dayPillarSpouseDomainDirectlySupported: true,
  dayBranchSpousePalaceDirectlyEstablishedBySelectedPassages: false,
  deterministicSpouseOutcomeAuthorized: false,
  deterministicMarriageEventAuthorized: false,
});

export const R063_REJECTED_SHORTCUTS = Object.freeze([
  'DAY_PILLAR_EQUALS_SPOUSE_ONLY',
  'DAY_BRANCH_EQUALS_SPOUSE_PALACE_WITHOUT_DIRECT_SOURCE',
  'DAY_PLACEMENT_IMPLIES_SPOUSE_QUALITY',
  'DAY_INTERACTION_IMPLIES_MARRIAGE_EVENT',
  'HISTORICAL_WIFE_LANGUAGE_AUTO_EQUALS_MODERN_PARTNER_ONTOLOGY',
] as const);

export const R063_EXECUTION_GAPS = Object.freeze([
  'DAY_STEM_VS_DAY_BRANCH_DOMAIN_SPLIT',
  'SPOUSE_PALACE_DIRECT_SOURCE',
  'HISTORICAL_TO_MODERN_RELATIONSHIP_MAPPING',
  'CONFIGURATION_EFFECT_SETTLEMENT',
  'DOMAIN_TO_EVENT_SEMANTICS',
] as const);

export const R063_AUTHORITY = Object.freeze({
  status: 'VERIFIED_DAY_SELF_SPOUSE_SURFACE_ONLY' as const,
  directClaimCount: 3,
  universalDayBranchSpousePalaceAuthorized: false,
  deterministicRelationshipSemanticsAuthorized: false,
  executableResolverAuthorized: false,
  productionAuthorityPromoted: false,
});
