export const R068_RELATIONSHIP_CLAIM_CORPUS_VERSION = '0.1.0-research' as const;

export const R068_DIRECT_CLAIMS = Object.freeze([
  {
    id: 'SOCIAL-FRIENDLINESS-SANHE-LIUHE',
    sourceSurface: '三合六合相和，友善五湖四海',
    domain: 'SOCIAL_FRIENDSHIP',
    fixedPolarityAuthorized: false,
    executable: false,
  },
  {
    id: 'KIN-FRIEND-BOND-HARM-CONFIGURATION',
    sourceSurface: '羊刃逢傷官七煞，骨肉親友傷情',
    domain: 'KIN_FRIEND',
    fixedPolarityAuthorized: false,
    executable: false,
  },
  {
    id: 'COMBINATION-CONTEXT-VARIANCE',
    sourceSurface: '六合三合 effects vary by 相生/相剋 and attached 吉神/凶神',
    domain: 'SOCIAL_CHARACTER_CONTEXT',
    fixedPolarityAuthorized: false,
    executable: false,
  },
] as const);

export const R068_REJECTED_ROMANCE_MAPPINGS = Object.freeze([
  'LIUHE_EQUALS_SOULMATE',
  'SANHE_EQUALS_IDEAL_ROMANTIC_PARTNER',
  'LIUCHONG_EQUALS_BREAKUP',
  'XING_HAI_PO_EQUALS_TOXIC_RELATIONSHIP',
  'ONE_RELATION_EQUALS_COMPATIBILITY_SCORE',
  'KIN_OR_FRIEND_CLAIM_AUTO_EQUALS_SPOUSE_CLAIM',
] as const);

export const R068_EXECUTION_GAPS = Object.freeze([
  'RELATIONSHIP_DOMAIN_SELECTION',
  'SOCIAL_VS_KIN_SCOPE',
  'ROMANCE_TRANSFER_EVIDENCE',
  'CONTEXT_EFFECT_SETTLEMENT',
  'MULTI_RELATION_CONFLICT',
] as const);

export const R068_AUTHORITY = Object.freeze({
  status: 'VERIFIED_SOCIAL_KIN_CLAIM_CORPUS_ONLY' as const,
  directClaimCount: 3,
  romanceCompatibilityMappingAuthorized: false,
  universalRelationPolarityAuthorized: false,
  executableCompatibilityScorerAuthorized: false,
  productionAuthorityPromoted: false,
});
