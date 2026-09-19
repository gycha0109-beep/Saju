export const R032_R033_ROLE_SEPARATION_VERSION='0.1.0-research' as const;

export const R032_DIRECT_ROLE_EXAMPLE=Object.freeze({
 context:'官用財生',
 yongshen:'正官',
 xishen:'財',
 jishen:'傷官',
 sourcePhrase:'官用財生，正官，用神也；財，喜神也；傷官，忌神也',
});

export const R032_SECONDARY_DIRECT_EXAMPLE=Object.freeze({
 context:'月垣財星秉令 / 財類',
 monthOrderCategory:'財',
 yongshenIsWealth:false,
 xishen:'財',
 sourcePhrase:'實非以財為用也，特財為喜神耳',
});

export const R033_CONTEXTUAL_ROLE_CHANGE=Object.freeze({
 context:'官格用印 / 財化為官',
 initialRole:'忌神',
 transformedRole:'喜神',
 sourcePhrase:'財化為官，忌神變為喜神',
 fixedGlobalElementRoleSupported:false,
});

export const R032_R033_SEMANTIC_BOUNDARY=Object.freeze({
 xishenEqualsYongshen:false,
 monthOrderCategoryEqualsYongshen:false,
 jishenEqualsFixedOpposingElement:false,
 roleMayDependOnConfiguration:true,
 roleMayChangeThroughGovernedRelation:true,
 genericXiShenResolverAuthorized:false,
 genericJiShenResolverAuthorized:false,
 productionAuthorityPromoted:false,
});
