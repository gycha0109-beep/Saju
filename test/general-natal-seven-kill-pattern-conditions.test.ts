import{describe,expect,it}from'vitest';
import{R027_AUTHORITY,R027_EXECUTION_GAPS,R027_EXPLICIT_REJECTIONS,R027_SEVEN_KILL_PROPOSITIONS,R027_SEVEN_KILL_PATTERN_VERSION}
from'../src/research/general-natal-seven-kill-pattern-conditions.js';
describe('R027 Seven-Kill pattern matrix',()=>{
 it('preserves success/failure/contamination/rescue',()=>{
  expect(R027_SEVEN_KILL_PATTERN_VERSION).toBe('0.1.0-research');
  expect(new Set(R027_SEVEN_KILL_PROPOSITIONS.map(p=>p.role)))
   .toEqual(new Set(['SUCCESS','FAILURE','CONTAMINATION','RESCUE']));
 });
 it('rejects naive control when body and kill are imbalanced',()=>{
  expect(R027_EXPLICIT_REJECTIONS).toEqual([
   {condition:'身強煞弱',simpleControlPathAuthorized:false},
   {condition:'煞強身弱',simpleControlPathAuthorized:false},
  ]);
  expect(R027_EXECUTION_GAPS).toContain('BODY_KILL_BALANCE');
 });
 it('does not promote final establishment',()=>{
  expect(R027_SEVEN_KILL_PROPOSITIONS.every(p=>p.executable===false)).toBe(true);
  expect(R027_AUTHORITY).toEqual({
   status:'research',propositionFamiliesVerified:true,bodyKillBalanceRequiredForControlPath:true,
   executableSevenKillResolverAuthorized:false,establishmentBooleanAuthorized:false,
   productionAuthorityPromoted:false,
  });
 });
});
