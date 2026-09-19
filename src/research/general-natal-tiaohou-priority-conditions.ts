export const R034_TIAOHOU_PRIORITY_VERSION='0.1.0-research' as const;

export const R034_DIRECT_BOUNDARIES=Object.freeze([
 {
  id:'climate-must-be-considered-beyond-fuyi',
  sourcePhrase:'取用神，於扶抑之外，必須參合氣候，即調候之法也',
  implication:'CLIMATE_MUST_BE_COEVALUATED',
 },
 {
  id:'winter-metal-water-fire-required-not-necessarily-yongshen',
  sourcePhrase:'特冬令金水，不可缺火，非定以為用也',
  implication:'CLIMATE_REQUIRED_ELEMENT_NOT_AUTOMATIC_YONGSHEN',
 },
 {
  id:'weak-body-example-separate-support-use',
  sourcePhrase:'丁火雖通根，而日元洩氣重，須以酉金扶身為用',
  implication:'STRENGTH_SUPPORT_MAY_REMAIN_PRIMARY_USE',
 },
] as const);

export const R034_SEASONAL_NON_EQUIVALENCE=Object.freeze([
 '春木逢火 != 夏木逢火',
 '秋金遇水 != 冬金遇水',
] as const);

export const R034_PRIORITY_MODEL=Object.freeze({
 climateCanBeUrgent:true,
 climateCanBeRequiredCompatibilityCondition:true,
 climateRequiredElementAlwaysFinalYongshen:false,
 climateOverridesStrengthInAllCharts:false,
 strengthAndClimateMayBothMatter:true,
 singleGlobalPriorityOrderAuthorized:false,
});

export const R034_EXECUTION_GAPS=Object.freeze([
 'CLIMATE_STATE_CLASSIFICATION','DAY_STEM_MONTH_CLIMATE_REQUIREMENT',
 'CLIMATE_ELEMENT_AVAILABILITY_EFFECT','STRENGTH_REQUIREMENT',
 'MULTI_METHODOLOGY_RECONCILIATION'
] as const);

export const R034_AUTHORITY=Object.freeze({
 status:'VERIFIED_BOUNDED_PRIORITY_SEMANTICS' as const,
 executableTiaohouResolverAuthorized:false,
 globalPriorityResolverAuthorized:false,
 productionAuthorityPromoted:false,
});
