export const R067_BUSINESS_MERCHANT_CORPUS_VERSION = '0.1.0-research' as const;

export const R067_DIRECT_CLAIMS = Object.freeze([
  {
    id: 'SANMING_YIMA_CHIBAO_MERCHANT',
    sourceStratum: 'SANMING_TONGHUI_VOLUME_3_YIMA',
    sourceSurface: '商賈多愛馳寶',
    claimClass: 'HISTORICAL_MERCHANT_CONTEXT',
    modernEntrepreneurshipEquivalentAuthorized: false,
    executable: false,
  },
  {
    id: 'SANMING_YIMA_CHIBAO_WEALTH',
    sourceStratum: 'SANMING_TONGHUI_VOLUME_3_YIMA',
    sourceSurface: '馳寶則富',
    claimClass: 'HISTORICAL_WEALTH_OUTCOME_CLAIM',
    modernEntrepreneurshipEquivalentAuthorized: false,
    executable: false,
  },
] as const);

export const R067_REJECTED_MAPPINGS = Object.freeze([
  'PIANCAI_EQUALS_ENTREPRENEUR',
  'BIJIE_EQUALS_FOUNDER_OR_SALES',
  'SHISHANG_EQUALS_MARKETER_CREATOR_BUSINESS',
  'YIMA_EQUALS_ENTREPRENEUR',
  'CHIBAO_GUARANTEES_BUSINESS_SUCCESS',
  'TEN_GOD_PATTERN_EQUALS_STARTUP_SUITABILITY',
] as const);

export const R067_COVERAGE = Object.freeze({
  directHistoricalMerchantClaim: true,
  generalWealthClaimsBusinessSpecific: false,
  modernEntrepreneurshipOntologyEstablished: false,
});

export const R067_EXECUTION_GAPS = Object.freeze([
  'MERCHANT_CONTEXT_SCOPE',
  'YIMA_SUBTYPE_SETTLEMENT',
  'HISTORICAL_TO_MODERN_BUSINESS_TRANSLATION',
  'ENTREPRENEURSHIP_TRAIT_MODEL',
  'BUSINESS_OUTCOME_SETTLEMENT',
] as const);

export const R067_AUTHORITY = Object.freeze({
  status: 'VERIFIED_NARROW_HISTORICAL_MERCHANT_CLAIM' as const,
  directClaimCount: 2,
  modernEntrepreneurshipMappingAuthorized: false,
  startupSuitabilityScoringAuthorized: false,
  executableBusinessClassifierAuthorized: false,
  productionAuthorityPromoted: false,
});
