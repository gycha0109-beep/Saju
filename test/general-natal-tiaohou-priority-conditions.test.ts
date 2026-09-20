import{describe,expect,it}from'vitest';
import{R034_AUTHORITY,R034_DIRECT_BOUNDARIES,R034_EXECUTION_GAPS,R034_PRIORITY_MODEL,R034_SEASONAL_NON_EQUIVALENCE,R034_TIAOHOU_PRIORITY_VERSION}
from'../src/research/general-natal-tiaohou-priority-conditions.js';
describe('R034 Tiaohou priority boundaries',()=>{
 it('separates climate necessity from final yongshen identity',()=>{
  expect(R034_TIAOHOU_PRIORITY_VERSION).toBe('0.1.0-research');
  expect(R034_DIRECT_BOUNDARIES.map(x=>x.implication)).toContain('CLIMATE_REQUIRED_ELEMENT_NOT_AUTOMATIC_YONGSHEN');
  expect(R034_PRIORITY_MODEL.climateRequiredElementAlwaysFinalYongshen).toBe(false);
 });
 it('preserves seasonal non-equivalence and parallel strength needs',()=>{
  expect(R034_SEASONAL_NON_EQUIVALENCE).toEqual(['春木逢火 != 夏木逢火','秋金遇水 != 冬金遇水']);
  expect(R034_PRIORITY_MODEL.strengthAndClimateMayBothMatter).toBe(true);
  expect(R034_PRIORITY_MODEL.singleGlobalPriorityOrderAuthorized).toBe(false);
 });
 it('keeps execution fail-closed',()=>{
  expect(R034_EXECUTION_GAPS).toContain('MULTI_METHODOLOGY_RECONCILIATION');
  expect(R034_AUTHORITY).toEqual({
   status:'VERIFIED_BOUNDED_PRIORITY_SEMANTICS',
   executableTiaohouResolverAuthorized:false,globalPriorityResolverAuthorized:false,
   productionAuthorityPromoted:false,
  });
 });
});
