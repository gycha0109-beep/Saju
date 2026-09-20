export const R051_HEAVENLY_STEM_FIVE_COMBINATION_VERSION = '0.1.0-research' as const;

export type R051Stem = '甲' | '乙' | '丙' | '丁' | '戊' | '己' | '庚' | '辛' | '壬' | '癸';
export type R051Element = '木' | '火' | '土' | '金' | '水';

export interface R051FiveCombinationFamily {
  pairId: string;
  left: R051Stem;
  right: R051Stem;
  declaredTransformationFamily: R051Element;
  pairIdentityVerified: true;
  effectiveCombinationAuthorized: false;
  transformationAuthorized: false;
}

export const R051_FIVE_COMBINATION_FAMILIES: readonly R051FiveCombinationFamily[] = Object.freeze([
  {
    pairId: 'JIA-JI',
    left: '甲',
    right: '己',
    declaredTransformationFamily: '土',
    pairIdentityVerified: true,
    effectiveCombinationAuthorized: false,
    transformationAuthorized: false,
  },
  {
    pairId: 'YI-GENG',
    left: '乙',
    right: '庚',
    declaredTransformationFamily: '金',
    pairIdentityVerified: true,
    effectiveCombinationAuthorized: false,
    transformationAuthorized: false,
  },
  {
    pairId: 'BING-XIN',
    left: '丙',
    right: '辛',
    declaredTransformationFamily: '水',
    pairIdentityVerified: true,
    effectiveCombinationAuthorized: false,
    transformationAuthorized: false,
  },
  {
    pairId: 'DING-REN',
    left: '丁',
    right: '壬',
    declaredTransformationFamily: '木',
    pairIdentityVerified: true,
    effectiveCombinationAuthorized: false,
    transformationAuthorized: false,
  },
  {
    pairId: 'WU-GUI',
    left: '戊',
    right: '癸',
    declaredTransformationFamily: '火',
    pairIdentityVerified: true,
    effectiveCombinationAuthorized: false,
    transformationAuthorized: false,
  },
]);

export const R051_STAGE_MODEL = Object.freeze([
  {
    stage: 'PAIR_IDENTITY',
    verified: true,
    executable: false,
    note: 'Canonical pair membership only.',
  },
  {
    stage: 'EFFECTIVE_COMBINATION',
    verified: false,
    executable: false,
    note: 'Concrete arrangement and blocking/interposition conditions remain unresolved.',
  },
  {
    stage: 'TRANSFORMATION',
    verified: false,
    executable: false,
    note: 'Branch/season/root support and transformation sufficiency remain unresolved.',
  },
] as const);

export const R051_EXECUTION_GAPS = Object.freeze([
  'PAIR_POSITIONAL_ELIGIBILITY',
  'INTERVENING_STEM_EFFECT',
  'BRANCH_SUPPORT_FOR_TRANSFORMATION',
  'ROOT_PRESERVATION_EFFECT',
  'SEASONAL_TRANSFORMATION_SUPPORT',
  'TRANSFORMATION_SUFFICIENCY',
  'WHOLE_CHART_HUACQI_CLASSIFICATION',
  'DOWNSTREAM_ROLE_REASSIGNMENT',
] as const);

export const R051_REJECTED_SHORTCUTS = Object.freeze([
  'PAIR_PRESENT_IMPLIES_EFFECTIVE_COMBINATION',
  'EFFECTIVE_COMBINATION_IMPLIES_TRANSFORMATION',
  'PAIR_PRESENT_IMPLIES_TRANSFORMED_ELEMENT',
  'TRANSFORMED_PAIR_IMPLIES_WHOLE_CHART_TRANSFORMATION',
  'TRANSFORMATION_IMPLIES_FAVORABLE_POLARITY',
] as const);

export const R051_AUTHORITY = Object.freeze({
  status: 'VERIFIED_PAIR_FAMILIES_ONLY' as const,
  pairFamilyCount: 5,
  effectiveCombinationResolverAuthorized: false,
  transformationResolverAuthorized: false,
  wholeChartHuacqiResolverAuthorized: false,
  productionAuthorityPromoted: false,
});
