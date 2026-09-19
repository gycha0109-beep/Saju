export const R069_SPOUSE_CLAIM_CORPUS_VERSION = '0.1.0-research' as const;

export const R069_DIRECT_CLAIMS = Object.freeze([
  {
    id: 'MALE-DAY-SELF-WIFE',
    sourceSurface: '日為己身妻妾',
    historicalSexScope: 'MALE_CHART',
    claimType: 'DAY_DOMAIN',
    executable: false,
  },
  {
    id: 'MALE-I-CONTROL-WIFE',
    sourceSurface: '四柱內有我克者為妻',
    historicalSexScope: 'MALE_CHART',
    claimType: 'SPOUSE_STAR_RELATION',
    executable: false,
  },
  {
    id: 'FEMALE-CONTROLS-ME-HUSBAND',
    sourceSurface: '克我者為夫',
    historicalSexScope: 'FEMALE_CHART',
    claimType: 'SPOUSE_STAR_RELATION',
    executable: false,
  },
  {
    id: 'DAY-WEALTH-CONFIGURATION-WIFE-CLAIMS',
    sourceSurface: 'bounded 日坐財 / 財旺 spouse claims',
    historicalSexScope: 'MALE_CHART',
    claimType: 'CONFIGURATION_LEVEL',
    executable: false,
  },
] as const);

export const R069_MODERN_TRANSLATION_BOUNDARY = Object.freeze({
  wealthEqualsSpouseUniversally: false,
  officerKillEqualsSpouseUniversally: false,
  historicalGenderRulesAutoConvertedToUniversalPartnerOntology: false,
  dayBranchSpousePalaceEstablishedBySelectedPassages: false,
  pairwiseCompatibilityAuthorized: false,
});

export const R069_REJECTED_SHORTCUTS = Object.freeze([
  'SPOUSE_STAR_PRESENT_GUARANTEES_MARRIAGE',
  'SPOUSE_STAR_ABSENT_IMPLIES_NO_MARRIAGE',
  'ONE_STAR_OR_BRANCH_DETERMINES_SPOUSE_TRAITS',
  'DAY_BRANCH_EQUALS_SPOUSE_PALACE_WITHOUT_DIRECT_SOURCE',
  'NATAL_SPOUSE_CLAIM_IMPLIES_PAIRWISE_COMPATIBILITY',
] as const);

export const R069_EXECUTION_GAPS = Object.freeze([
  'HISTORICAL_GENDER_SCOPE',
  'MODERN_PARTNER_TRANSLATION',
  'SPOUSE_PALACE_DIRECT_SOURCE',
  'SPOUSE_STAR_CONTEXT_SETTLEMENT',
  'MARRIAGE_EVENT_SEMANTICS',
  'PAIRWISE_COMPATIBILITY_BRIDGE',
] as const);

export const R069_AUTHORITY = Object.freeze({
  status: 'VERIFIED_HISTORICALLY_GENDERED_SPOUSE_CORPUS_ONLY' as const,
  directClaimCount: 4,
  universalModernPartnerOntologyAuthorized: false,
  deterministicMarriageSemanticsAuthorized: false,
  executableSpouseClassifierAuthorized: false,
  productionAuthorityPromoted: false,
});
