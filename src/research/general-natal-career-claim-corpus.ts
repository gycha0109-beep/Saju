export const R065_CAREER_CLAIM_CORPUS_VERSION = '0.1.0-research' as const;

export const R065_CLAIMS = Object.freeze([
  {
    id: 'C1-CONFIGURATION-OFFICIAL-STATUS',
    evidenceClass: 'CONFIGURATION_LEVEL',
    subjectScope: 'NATIVE',
    sourceMeaning: '官格 / 財官 / 官印 configurations can carry official-status or 貴 interpretation',
    modernOccupationClassAuthorized: false,
    executable: false,
  },
  {
    id: 'C2-HISTORICAL-OFFICE-CASE',
    evidenceClass: 'CASE_LEVEL',
    subjectScope: 'NATIVE',
    sourceMeaning: 'complete-chart historical examples are linked to specific office/rank outcomes',
    modernOccupationClassAuthorized: false,
    executable: false,
  },
  {
    id: 'C3-EXISTING-OFFICIAL-ROLE',
    evidenceClass: 'ROLE_SCOPED',
    subjectScope: 'NATIVE_AS_OFFICIAL',
    sourceMeaning: '官員以月為僚友 / 官員以時為帝座禍福',
    modernOccupationClassAuthorized: false,
    executable: false,
  },
  {
    id: 'C4-KIN-OFFICIAL-STATUS',
    evidenceClass: 'KIN_STATUS',
    subjectScope: 'RELATIVE',
    sourceMeaning: '年上官星父祖為官 / 月上官星兄弟必貴',
    modernOccupationClassAuthorized: false,
    executable: false,
  },
] as const);

export const R065_REJECTED_JOB_MAPPINGS = Object.freeze([
  'ZHENGGUAN_EQUALS_CIVIL_SERVANT',
  'QISHA_EQUALS_MILITARY_POLICE_EXECUTIVE',
  'SHISHANG_EQUALS_CREATIVE_PROFESSION',
  'CAI_EQUALS_FINANCE_BUSINESS_PROFESSION',
  'YIN_EQUALS_EDUCATION_RESEARCH_PROFESSION',
  'BIJIE_EQUALS_ENTREPRENEURSHIP_SALES',
  'ONE_TEN_GOD_ONE_JOB_FAMILY',
  'PATTERN_SUCCESS_GUARANTEES_CAREER_SUCCESS',
] as const);

export const R065_EXECUTION_GAPS = Object.freeze([
  'SUBJECT_SCOPE_RESOLUTION',
  'CONFIGURATION_COMPLETENESS',
  'HISTORICAL_ROLE_TRANSLATION',
  'MODERN_OCCUPATION_TAXONOMY',
  'CAREER_OUTCOME_SETTLEMENT',
] as const);

export const R065_AUTHORITY = Object.freeze({
  status: 'VERIFIED_HISTORICAL_OFFICIAL_STATUS_CORPUS_ONLY' as const,
  claimCount: 4,
  oneTenGodOneJobAuthorized: false,
  modernOccupationMappingAuthorized: false,
  guaranteedCareerOutcomeAuthorized: false,
  executableCareerClassifierAuthorized: false,
  productionAuthorityPromoted: false,
});
