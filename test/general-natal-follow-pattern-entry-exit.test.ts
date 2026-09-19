import{describe,expect,it}from'vitest';
import{R029_AUTHORITY,R029_ENTRY_PROPOSITIONS,R029_EXCLUSIONS,R029_EXECUTION_GAPS,R029_FOLLOW_PATTERN_VERSION,R029_GLOBAL_ENTRY_GATES}
from'../src/research/general-natal-follow-pattern-entry-exit.js';
describe('R029 follow-pattern entry/exit boundaries',()=>{
 it('requires one-sidedness and absence of ordinary support-control for every external entry',()=>{
  expect(R029_FOLLOW_PATTERN_VERSION).toBe('0.1.0-research');
  expect(R029_GLOBAL_ENTRY_GATES).toEqual(['四柱氣象偏於一方','四柱無可扶抑']);
  expect(R029_ENTRY_PROPOSITIONS.every(p=>
   R029_GLOBAL_ENTRY_GATES.every(g=>p.preconditions.includes(g))
  )).toBe(true);
  expect(R029_ENTRY_PROPOSITIONS.every(p=>p.executable===false)).toBe(true);
 });
 it('blocks follow-mode when ordinary authority remains available',()=>{
  expect(R029_EXCLUSIONS.every(x=>x.blocksFollow)).toBe(true);
  expect(R029_EXCLUSIONS.map(x=>x.id)).toContain('broken-ordinary-pattern-is-not-month-order-useless');
  expect(R029_EXECUTION_GAPS).toContain('RESCUE_AVAILABILITY');
 });
 it('does not turn broken ordinary patterns into follow patterns',()=>{
  expect(R029_AUTHORITY).toEqual({
   status:'research',entryAndExclusionFamiliesVerified:true,
   brokenOrdinaryPatternImpliesFollow:false,
   executableFollowPatternResolverAuthorized:false,
   productionAuthorityPromoted:false,
  });
 });
});
