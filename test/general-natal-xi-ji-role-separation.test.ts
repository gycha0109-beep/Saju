import{describe,expect,it}from'vitest';
import{R032_DIRECT_ROLE_EXAMPLE,R032_R033_ROLE_SEPARATION_VERSION,R032_R033_SEMANTIC_BOUNDARY,R032_SECONDARY_DIRECT_EXAMPLE,R033_CONTEXTUAL_ROLE_CHANGE}
from'../src/research/general-natal-xi-ji-role-separation.js';

describe('R032/R033 Xi/Yong/Ji role separation',()=>{
 it('preserves explicit same-context role separation',()=>{
  expect(R032_R033_ROLE_SEPARATION_VERSION).toBe('0.1.0-research');
  expect(R032_DIRECT_ROLE_EXAMPLE).toEqual({
   context:'官用財生',yongshen:'正官',xishen:'財',jishen:'傷官',
   sourcePhrase:'官用財生，正官，用神也；財，喜神也；傷官，忌神也',
  });
 });
 it('does not equate month-order category with yongshen',()=>{
  expect(R032_SECONDARY_DIRECT_EXAMPLE.yongshenIsWealth).toBe(false);
  expect(R032_SECONDARY_DIRECT_EXAMPLE.xishen).toBe('財');
 });
 it('keeps Ji-Shen contextual rather than fixed-element opposition',()=>{
  expect(R033_CONTEXTUAL_ROLE_CHANGE.initialRole).toBe('忌神');
  expect(R033_CONTEXTUAL_ROLE_CHANGE.transformedRole).toBe('喜神');
  expect(R033_CONTEXTUAL_ROLE_CHANGE.fixedGlobalElementRoleSupported).toBe(false);
  expect(R032_R033_SEMANTIC_BOUNDARY).toEqual({
   xishenEqualsYongshen:false,monthOrderCategoryEqualsYongshen:false,
   jishenEqualsFixedOpposingElement:false,roleMayDependOnConfiguration:true,
   roleMayChangeThroughGovernedRelation:true,genericXiShenResolverAuthorized:false,
   genericJiShenResolverAuthorized:false,productionAuthorityPromoted:false,
  });
 });
});
