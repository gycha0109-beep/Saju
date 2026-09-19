import{describe,expect,it}from'vitest';
import{R030_AUTHORITY,R030_CONFLICT_SCENARIOS,R030_FORBIDDEN_SHORTCUTS,R030_GEJU_CONFLICT_MATRIX_VERSION,R030_REQUIRED_FUTURE_PREDICATES}
from'../src/research/general-natal-geju-conflict-resolution-matrix.js';

describe('R030 Gyeokguk conflict-resolution matrix',()=>{
 it('represents zero, one, and multiple candidates without forcing a winner',()=>{
  expect(R030_GEJU_CONFLICT_MATRIX_VERSION).toBe('0.1.0-research');
  expect(new Set(R030_CONFLICT_SCENARIOS.map(x=>x.cardinality))).toEqual(new Set(['ZERO','ONE','MULTIPLE']));
  expect(R030_CONFLICT_SCENARIOS.every(x=>x.mayChooseSingleWinner===false&&x.executable===false)).toBe(true);
 });
 it('preserves coexistence, conflict, transition, broken, and indeterminate states',()=>{
  const states=new Set(R030_CONFLICT_SCENARIOS.map(x=>x.state));
  for(const state of ['MULTIPLE_COEXISTING','MULTIPLE_CONFLICT_UNRESOLVED','SPECIAL_TRANSITION_REQUIRED','BROKEN_ORDINARY_PATTERN','INDETERMINATE']){
   expect(states.has(state as never)).toBe(true);
  }
 });
 it('forbids ranking shortcuts and keeps future predicates explicit',()=>{
  expect(R030_FORBIDDEN_SHORTCUTS).toContain('HIDDEN_STEM_ARRAY_ORDER_AS_RANK');
  expect(R030_FORBIDDEN_SHORTCUTS).toContain('FORCE_SINGLE_WINNER');
  expect(R030_FORBIDDEN_SHORTCUTS).toContain('BROKEN_PATTERN_AUTO_FOLLOW');
  expect(R030_REQUIRED_FUTURE_PREDICATES).toContain('CANDIDATE_COMPATIBILITY');
  expect(R030_AUTHORITY).toEqual({
   status:'research',multiCandidateRepresentationBoundaryVerified:true,conflictStatesRepresentable:true,
   conflictWinnerResolverAuthorized:false,establishmentResolverAuthorized:false,productionAuthorityPromoted:false,
  });
 });
});
