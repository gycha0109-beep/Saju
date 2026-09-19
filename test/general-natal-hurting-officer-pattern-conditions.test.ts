import{describe,expect,it}from'vitest';
import{R026_AUTHORITY,R026_EXECUTION_GAPS,R026_HURTING_OFFICER_PROPOSITIONS,R026_HURTING_OFFICER_PATTERN_VERSION}
from'../src/research/general-natal-hurting-officer-pattern-conditions.js';
describe('R026 Hurting-Officer pattern matrix',()=>{
 it('preserves four condition roles',()=>{
  expect(R026_HURTING_OFFICER_PATTERN_VERSION).toBe('0.1.0-research');
  expect(new Set(R026_HURTING_OFFICER_PROPOSITIONS.map(p=>p.role)))
   .toEqual(new Set(['SUCCESS','FAILURE','CONTAMINATION','RESCUE']));
 });
 it('keeps climate and relative-strength predicates unresolved',()=>{
  expect(R026_HURTING_OFFICER_PROPOSITIONS.every(p=>p.executable===false)).toBe(true);
  expect(R026_EXECUTION_GAPS).toContain('METAL_WATER_CLIMATE_EXCEPTION');
  expect(R026_EXECUTION_GAPS).toContain('HURTING_OFFICER_RELATIVE_STRENGTH');
 });
 it('does not promote establishment authority',()=>{
  expect(R026_AUTHORITY).toEqual({
   status:'research',propositionFamiliesVerified:true,metalWaterExceptionPreserved:true,
   executableHurtingOfficerResolverAuthorized:false,establishmentBooleanAuthorized:false,
   productionAuthorityPromoted:false,
  });
 });
});
