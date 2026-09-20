export const R038_BINGYAO_VERSION = '0.1.0-research' as const;

export type R038BaselineDirection = 'SUPPORT_DESIRED' | 'SUPPRESSION_DESIRED';

export interface R038BingYaoFramingProposition {
  id: string;
  baselineDirection: R038BaselineDirection;
  diseaseRelation: string;
  remedyRelation: string;
  executable: false;
}

export const R038_BINGYAO_PROPOSITIONS: readonly R038BingYaoFramingProposition[] = Object.freeze([
  {
    id: 'support-desired-harm-to-support-is-disease',
    baselineDirection: 'SUPPORT_DESIRED',
    diseaseRelation: '傷其扶者為病',
    remedyRelation: '除其病神即謂之藥',
    executable: false,
  },
  {
    id: 'suppression-desired-removal-of-suppression-is-disease',
    baselineDirection: 'SUPPRESSION_DESIRED',
    diseaseRelation: '去其抑者為病',
    remedyRelation: '除其病神即謂之藥',
    executable: false,
  },
]);

export const R038_DIRECT_SOURCE_PHRASE =
  '以扶為喜，則以傷其扶者為病；以抑為喜，則以去其抑者為病。除其病神，即謂之藥。此以病藥取用神也' as const;

export const R038_EXECUTION_GAPS = Object.freeze([
  'BASELINE_REQUIREMENT_DIRECTION',
  'HARM_TO_SUPPORT_EFFECT',
  'REMOVAL_OF_SUPPRESSION_EFFECT',
  'DISEASE_IDENTITY_SELECTION',
  'REMEDY_EFFECTIVENESS',
  'BINGYAO_APPLICABILITY',
  'CROSS_METHOD_RECONCILIATION',
] as const);

export const R038_FORBIDDEN_SHORTCUTS = Object.freeze([
  'FIXED_ELEMENT_DISEASE_TABLE',
  'FIXED_ELEMENT_REMEDY_TABLE',
  'ELEMENT_PRESENCE_AS_DISEASE',
  'OPPOSING_ELEMENT_AS_REMEDY',
  'CROSS_METHOD_FORCE_SINGLE_WINNER',
] as const);

export const R038_AUTHORITY = Object.freeze({
  sourceFamily: 'XU_COMMENTARY_BINGYAO' as const,
  status: 'VERIFIED_BOUNDED_SEMANTIC_BOUNDARY' as const,
  relationalDiseaseRemedyFramingVerified: true,
  executableBingYaoResolverAuthorized: false,
  productionAuthorityPromoted: false,
});
