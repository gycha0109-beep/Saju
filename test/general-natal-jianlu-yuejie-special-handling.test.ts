import{describe,expect,it}from'vitest';
import{R028_AUTHORITY,R028_EXECUTION_GAPS,R028_JIANLU_YUEJIE_VERSION,R028_SPECIAL_RULE,R028_SUCCESS_TRANSITIONS}
from'../src/research/general-natal-jianlu-yuejie-special-handling.js';
describe('R028 Jianlu/Yuejie special handling',()=>{
 it('requires transition instead of self-sufficient yongshen',()=>{
  expect(R028_JIANLU_YUEJIE_VERSION).toBe('0.1.0-research');
  expect(R028_SPECIAL_RULE).toEqual({
   sourcePhrase:'祿劫本身不能為用，而另取扶抑之神為用',
   selfSufficientOrdinaryYongshen:false,transitionRequired:true,
  });
 });
 it('preserves three distinct transition targets',()=>{
  expect(R028_SUCCESS_TRANSITIONS.map(x=>x.target))
   .toEqual(['OFFICER_LOGIC','WEALTH_LOGIC','SEVEN_KILL_LOGIC']);
  expect(R028_SUCCESS_TRANSITIONS.every(x=>x.executable===false)).toBe(true);
  expect(R028_EXECUTION_GAPS).toContain('SUPPRESSION_SUPPORT_TARGET_SELECTION');
 });
 it('does not authorize direct establishment',()=>{
  expect(R028_AUTHORITY).toEqual({
   status:'research',specialHandlingVerified:true,
   monthBranchToEstablishedPatternAuthorized:false,selfSufficientYongshenAuthorized:false,
   transitionResolverAuthorized:false,productionAuthorityPromoted:false,
  });
 });
});
