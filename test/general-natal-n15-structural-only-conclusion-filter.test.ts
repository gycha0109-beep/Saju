import {describe,expect,it} from 'vitest';
import type {TenGodChartFact} from '../src/contracts/calculation.js';
import {resolved} from '../src/contracts/common.js';
import {calculateCanonicalSajuSnapshot} from '../src/calculation/calculation-engine.js';
import {runInterpretation} from '../src/interpretation/interpretation-engine.js';
import {PRODUCTION_DEFAULT_CALCULATION_POLICY} from '../src/production/production-calculation-policy.js';
import {createGeneralNatalConclusionCandidateRegistry} from '../src/research/general-natal-conclusion-synthesis-candidate.js';
import {createGeneralNatalSourceBoundedRegistry} from '../src/research/general-natal-conclusion-source-bounded-candidate.js';
import {createGeneralNatalIntegratedReadingRegistry} from '../src/interpretation/general-natal-integrated-reading-registry.js';
import {buildGeneralNatalN15FilteredResearchReading} from '../src/research/general-natal-n15-structural-only-conclusion-filter.js';

const now=new Date('2026-10-16T00:00:00.000Z');
const originalRegistry=createGeneralNatalConclusionCandidateRegistry(now.toISOString());
const boundedRegistry=createGeneralNatalSourceBoundedRegistry(now.toISOString());
const allFamilies:TenGodChartFact={
 year:{stem:resolved('겁재'),branch:resolved('정인')},
 month:{stem:resolved('편재'),branch:resolved('정재')},
 day:{stem:resolved('일간'),branch:resolved('상관')},
 hour:{stem:resolved('편관'),branch:resolved('식신')},
};
const noExactGyeopjae:TenGodChartFact={
 ...allFamilies,year:{stem:resolved('비견'),branch:resolved('정인')},
};
const noWealth:TenGodChartFact={
 year:{stem:resolved('겁재'),branch:resolved('정인')},
 month:{stem:resolved('상관'),branch:resolved('식신')},
 day:{stem:resolved('일간'),branch:resolved('편관')},
 hour:{stem:resolved('정관'),branch:resolved('편인')},
};
function actualChart(facts:TenGodChartFact){
 const s=calculateCanonicalSajuSnapshot({
  calendarType:'solar',date:{year:2024,month:3,day:10},
  time:{known:true,hour:12,minute:0},sexForTraditionalCalculation:'unspecified',
 },PRODUCTION_DEFAULT_CALCULATION_POLICY,{now});
 return {...s,derivedFacts:{...s.derivedFacts,tenGods:resolved(facts)}};
}
function fixture(facts:TenGodChartFact){
 const snapshot=actualChart(facts);
 const original=runInterpretation(snapshot,originalRegistry,{now,requestId:'n15-original'});
 const bounded=runInterpretation(snapshot,boundedRegistry,{now,requestId:'n15-bounded'});
 expect(original.integrity.valid).toBe(true);
 expect(bounded.integrity.valid).toBe(true);
 return {snapshot,original,bounded};
}
function classify(facts:TenGodChartFact){
 const {snapshot,original,bounded}=fixture(facts);
 return buildGeneralNatalN15FilteredResearchReading(
  snapshot,original,originalRegistry,bounded,boundedRegistry,
 );
}
describe('N15 overly broad Ten-God consumer conclusion research reduction',()=>{
 it('suppresses all ten legacy personal claims while retaining five actual structural observations',()=>{
  const result=classify(allFamilies);
  expect(result).toMatchObject({
   lifecycle:'internal_research_only',originalT8CandidateCount:10,
   structuralObservationCount:5,blockedOverreachCount:5,
   missingRelationEvidenceCount:0,notEmittedCount:0,
   originalConsumerConclusionCount:0,originalConsumerConclusionsPublished:false,
   modernConsumerSemanticsApproved:false,productionAuthorized:false,maySell:false,
  });
  expect(result.decisions).toHaveLength(10);
  const allowed=result.decisions.filter(x=>x.decision==='structural_observation_only');
  expect(allowed.map(x=>x.originalClaimType)).toEqual([
   'GENERAL_NATAL_CONCLUSION_OUTPUT_TO_WEALTH',
   'GENERAL_NATAL_CONCLUSION_WEALTH_TO_OFFICER',
   'GENERAL_NATAL_CONCLUSION_OFFICER_TO_RESOURCE',
   'GENERAL_NATAL_CONCLUSION_PEER_WEALTH_TENSION',
   'GENERAL_NATAL_CONCLUSION_WEALTH_RESOURCE_TENSION',
  ]);
  for(const item of allowed){
    expect(item.originalConsumerConclusionAllowed).toBe(false);
    expect(item.modernBehaviorInferenceAllowed).toBe(false);
    expect(item.researchStructuralText).toContain('구조');
    expect(item.supportingT8ClaimId).toBeDefined();
    expect(item.supportingT5ClaimIds).toHaveLength(2);
    expect(new Set(item.supportingT5ClaimIds).size).toBe(2);
    expect(item.supportingSourceLocators).toHaveLength(2);
  }
  for(const item of result.decisions.filter(x=>x.decision==='blocked_personal_semantic_overreach')){
    expect(item.researchStructuralText).toBeUndefined();
    expect(item.supportingT8ClaimId).toBeUndefined();
  }
  expect(JSON.stringify(result)).not.toContain('압박을 공부와 체계화로 소화하는 축');
 });
 it('does not treat 비견 as 겁재 and never invents absent wealth',()=>{
  const weaker=classify(noExactGyeopjae);
  expect(weaker.originalT8CandidateCount).toBe(10);
  expect(weaker.structuralObservationCount).toBe(4);
  expect(weaker.missingRelationEvidenceCount).toBe(1);
  expect(weaker.decisions.find(x=>x.originalClaimType==='GENERAL_NATAL_CONCLUSION_PEER_WEALTH_TENSION')
    ?.decision).toBe('blocked_missing_structural_evidence');
  const without=classify(noWealth);
  expect(without.structuralObservationCount).toBeLessThan(4);
  expect(without.notEmittedCount).toBeGreaterThan(0);
  expect(without.originalConsumerConclusionCount).toBe(0);
 });
 it('is stable on identical executions and rejects a detached original T5',()=>{
  const a=fixture(allFamilies);
  const compute=(original=a.original,bounded=a.bounded,source=boundedRegistry)=>
    buildGeneralNatalN15FilteredResearchReading(
      a.snapshot,original,originalRegistry,bounded,source,
    );
  expect(compute()).toEqual(compute());
  const target=a.original.claims.find(x=>x.predicate==='consumer_conclusion');
  if(!target?.upstreamClaimRefs[0])throw new Error('Missing actual research consumer claim');
  const missing={...a.original,claims:a.original.claims.filter(x=>x.claimId!==target.upstreamClaimRefs[0])};
  expect(()=>compute(missing)).toThrow(/detached original T5/u);
 });
 it('refuses registry-substitution and another canonical snapshot',()=>{
  const a=fixture(allFamilies);
  const preview=createGeneralNatalIntegratedReadingRegistry(now.toISOString());
  expect(()=>buildGeneralNatalN15FilteredResearchReading(
    a.snapshot,a.original,originalRegistry,a.bounded,preview,
  )).toThrow(/research-bound canonical executions/u);
  expect(()=>buildGeneralNatalN15FilteredResearchReading(
    {...a.snapshot,snapshotId:'other'},a.original,originalRegistry,a.bounded,boundedRegistry,
  )).toThrow(/identical valid research-bound/u);
 });
});
