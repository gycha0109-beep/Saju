import {describe,expect,it} from 'vitest';
import {R025_AUTHORITY,R025_EXECUTION_GAPS,R025_FOOD_GOD_PATTERN_PROPOSITIONS,R025_FOOD_GOD_PATTERN_VERSION}
from '../src/research/general-natal-food-god-pattern-conditions.js';
describe('R025 Food-God pattern matrix',()=>{
 it('separates source roles',()=>{
  expect(R025_FOOD_GOD_PATTERN_VERSION).toBe('0.1.0-research');
  expect(new Set(R025_FOOD_GOD_PATTERN_PROPOSITIONS.map(p=>p.role)))
   .toEqual(new Set(['SUCCESS','FAILURE','CONTAMINATION','RESCUE']));
 });
 it('keeps switch/rescue operands fail-closed',()=>{
  expect(R025_FOOD_GOD_PATTERN_PROPOSITIONS.every(p=>p.executable===false)).toBe(true);
  expect(R025_EXECUTION_GAPS).toContain('ABANDON_FOOD_SWITCH_CONDITION');
  expect(R025_EXECUTION_GAPS).toContain('RESCUE_PRECEDENCE');
 });
 it('does not equate month Food-God with final Food-God pattern',()=>{
  expect(R025_AUTHORITY).toEqual({
   status:'research',propositionFamiliesVerified:true,ordinaryFoodGodVsAbandonFoodSeparated:true,
   executableFoodGodPatternResolverAuthorized:false,establishmentBooleanAuthorized:false,
   productionAuthorityPromoted:false,
  });
 });
});
