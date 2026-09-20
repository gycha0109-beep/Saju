export const R053_SANHE_COMPLETENESS_VERSION = '0.1.0-research' as const;

export type R053Element = '木' | '火' | '金' | '水';

export interface R053CompleteFamily {
  id: string;
  members: readonly [string, string, string];
  declaredFamily: R053Element;
  completeFamilyIdentityVerified: true;
  automaticTransformationAuthorized: false;
}

export const R053_COMPLETE_FAMILIES: readonly R053CompleteFamily[] = Object.freeze([
  {
    id: 'SHEN-ZI-CHEN',
    members: ['申', '子', '辰'],
    declaredFamily: '水',
    completeFamilyIdentityVerified: true,
    automaticTransformationAuthorized: false,
  },
  {
    id: 'YIN-WU-XU',
    members: ['寅', '午', '戌'],
    declaredFamily: '火',
    completeFamilyIdentityVerified: true,
    automaticTransformationAuthorized: false,
  },
  {
    id: 'HAI-MAO-WEI',
    members: ['亥', '卯', '未'],
    declaredFamily: '木',
    completeFamilyIdentityVerified: true,
    automaticTransformationAuthorized: false,
  },
  {
    id: 'SI-YOU-CHOU',
    members: ['巳', '酉', '丑'],
    declaredFamily: '金',
    completeFamilyIdentityVerified: true,
    automaticTransformationAuthorized: false,
  },
]);

export interface R053PartialSubset {
  parentFamilyId: string;
  members: readonly [string, string];
  taxonomy: 'UNRESOLVED';
  effect: 'UNRESOLVED';
  executable: false;
}

export const R053_PARTIAL_SUBSETS: readonly R053PartialSubset[] = Object.freeze(
  R053_COMPLETE_FAMILIES.flatMap((family) => {
    const [a, b, c] = family.members;
    const subsets: R053PartialSubset[] = [
      { parentFamilyId: family.id, members: [a, b], taxonomy: 'UNRESOLVED', effect: 'UNRESOLVED', executable: false },
      { parentFamilyId: family.id, members: [b, c], taxonomy: 'UNRESOLVED', effect: 'UNRESOLVED', executable: false },
      { parentFamilyId: family.id, members: [a, c], taxonomy: 'UNRESOLVED', effect: 'UNRESOLVED', executable: false },
    ];
    return subsets;
  }),
);

export const R053_BOUNDED_COMPLETION_EXAMPLES = Object.freeze([
  {
    existingMonthBranch: '亥',
    arrivingBranches: ['卯', '未'] as const,
    completedFamilyId: 'HAI-MAO-WEI',
    generalizedPartialRuleAuthorized: false,
    executable: false,
  },
  {
    existingMonthBranch: '申',
    arrivingBranches: ['子', '辰'] as const,
    completedFamilyId: 'SHEN-ZI-CHEN',
    generalizedPartialRuleAuthorized: false,
    executable: false,
  },
] as const);

export const R053_EXECUTION_GAPS = Object.freeze([
  'PARTIAL_PAIR_TAXONOMY',
  'PARTIAL_PAIR_EFFECT',
  'SEASONAL_TRANSFORMATION_ELIGIBILITY',
  'POSITIONAL_ELIGIBILITY',
  'CONFLICT_OR_BREAKAGE_EFFECT',
  'TIME_LAYER_COMPLETION_SEMANTICS',
  'TRANSFORMATION_SUFFICIENCY',
] as const);

export const R053_AUTHORITY = Object.freeze({
  status: 'COMPLETE_FAMILIES_VERIFIED_PARTIAL_RULE_INCONCLUSIVE' as const,
  completeFamilyCount: 4,
  partialSubsetInventoryCount: 12,
  genericHalfCombinationTaxonomyAuthorized: false,
  twoOfThreeImpliesCompleteSanhe: false,
  completeSetImpliesTransformation: false,
  executableResolverAuthorized: false,
  productionAuthorityPromoted: false,
});
