import {describe,expect,it} from 'vitest';
import type {TenGodChartFact} from '../src/contracts/calculation.js';
import {resolved} from '../src/contracts/common.js';
import {calculateCanonicalSajuSnapshot} from '../src/calculation/calculation-engine.js';
import {PRODUCTION_DEFAULT_CALCULATION_POLICY} from '../src/production/production-calculation-policy.js';
import {runInterpretation} from '../src/interpretation/interpretation-engine.js';
import {createGeneralNatalSourceBoundedRegistry} from '../src/research/general-natal-conclusion-source-bounded-candidate.js';
import {createGeneralNatalIntegratedReadingRegistry} from '../src/interpretation/general-natal-integrated-reading-registry.js';
import {buildNatalN14LinkedT8ResearchReport, GENERAL_NATAL_N19_POSITION_WITNESS_VERSION} from '../src/research/general-natal-t8-linked-structure-draft.js';

const now=new Date('2026-10-16T00:00:00.000Z');
const registry=createGeneralNatalSourceBoundedRegistry(now.toISOString());

const fiveFamilies:TenGodChartFact={
 year:{stem:resolved('겁재'),branch:resolved('정인')},
 month:{stem:resolved('편재'),branch:resolved('정재')},
 day:{stem:resolved('일간'),branch:resolved('상관')},
 hour:{stem:resolved('편관'),branch:resolved('식신')},
};
const noWealth:TenGodChartFact={
 year:{stem:resolved('겁재'),branch:resolved('정인')},
 month:{stem:resolved('상관'),branch:resolved('식신')},
 day:{stem:resolved('일간'),branch:resolved('편관')},
 hour:{stem:resolved('정관'),branch:resolved('편인')},
};
function chart(gods:TenGodChartFact) {
 const snapshot=calculateCanonicalSajuSnapshot({
   calendarType:'solar',date:{year:2024,month:3,day:10},
   time:{known:true,hour:12,minute:0},sexForTraditionalCalculation:'unspecified',
 },PRODUCTION_DEFAULT_CALCULATION_POLICY,{now});
 return {...snapshot,derivedFacts:{...snapshot.derivedFacts,tenGods:resolved(gods)}};
}
function result(gods:TenGodChartFact) {
 const snapshot=chart(gods);
 const execution=runInterpretation(snapshot,registry,{now});
 return {snapshot,execution,report:buildNatalN14LinkedT8ResearchReport(snapshot,execution,registry)};
}
describe('N14 source-bounded two-edge T8 research co-observation',()=>{
 it('finds two actual linked T8 pairs and three unique T5 endpoints without transitivity',()=>{
  const {execution,report}=result(fiveFamilies);
  expect(report).toMatchObject({
   status:'research_only',mayExposeAsConsumerInterpretation:false,
   mayApproveNewResearchRule:false,mayPromoteProduction:false,
   linkedPairCount:2,
   positionProjectionVersion: GENERAL_NATAL_N19_POSITION_WITNESS_VERSION,
  });
  expect(report.linkedPairs.map(p=>p.firstRelationId+'+'+p.secondRelationId)).toEqual([
    'OUTPUT-TO-WEALTH+WEALTH-TO-OFFICER',
    'WEALTH-TO-OFFICER+OFFICER-TO-RESOURCE',
  ]);
  const ids=new Set(execution.claims.map(c=>c.claimId));
  for(const p of report.linkedPairs){
   expect(p.firstT8ClaimId).not.toBe(p.secondT8ClaimId);
   expect(p.independentUpstreamT5ClaimRefs).toHaveLength(3);
   expect(new Set(p.independentUpstreamT5ClaimRefs).size).toBe(3);
   expect(p.independentUpstreamT5ClaimRefs.every(id=>ids.has(id))).toBe(true);
   expect(p.sourceLocators).toHaveLength(2);
   expect(p.factRefs.length).toBeGreaterThan(0);
   expect(p.observedPositionFacts.length).toBeGreaterThan(0);
   expect(p.positionWitnesses).toHaveLength(3);
   expect(new Set(p.positionWitnesses.map(w=>w.family)).size).toBe(3);
   for (const witness of p.positionWitnesses) {
     expect(witness.positions.length).toBeGreaterThan(0);
     for (const position of witness.positions) {
       expect(p.observedPositionFacts).toContain(position.factPath+':'+position.tenGod);
       expect(position.factPath).toMatch(/^derivedFacts\\.tenGods\\.(?:year|month|day|hour)\\.(?:stem|branch)$/u);
       expect(p.text).toContain(position.display);
     }
   }
   expect(p.positionEvidenceFingerprint.length).toBeGreaterThan(0);
   expect(report.linkedPositionSignature.length).toBeGreaterThan(0);
   expect(p.text).toContain('십신 위치');
   expect(p.text).toContain('인과 흐름');
   expect(p.transitiveCausalInferenceAuthorized).toBe(false);
   expect(p.modernConsumerInferenceAuthorized).toBe(false);
   expect(p.publicationAuthorized).toBe(false);
   expect(p.text).toContain('인과 흐름');
   expect(p.text).toContain('확정하지 않습니다');
  }
 });

 it('differentiates concrete T0 locations without inventing any different T8 meaning',()=>{
  const redistributed: TenGodChartFact = {
    ...fiveFamilies,
    year: {stem:resolved('편재'),branch:resolved('정인')},
    month: {stem:resolved('겁재'),branch:resolved('정재')},
  };
  const first=result(fiveFamilies).report;
  const second=result(redistributed).report;
  expect(first.linkedPairCount).toBe(2);
  expect(second.linkedPairCount).toBe(2);
  // Same actual rule-level T8 patterns; moving a fact never grants a novel meaning.
  expect(first.linkedSemanticSignature).toBe(second.linkedSemanticSignature);
  expect(first.linkedPositionSignature).not.toBe(second.linkedPositionSignature);
  expect(first.linkedPairs[0]?.text).not.toBe(second.linkedPairs[0]?.text);
  expect(second.linkedPairs.every(x=>x.publicationAuthorized===false &&
    !x.modernConsumerInferenceAuthorized && !x.transitiveCausalInferenceAuthorized)).toBe(true);
 });

 it('does not fabricate chains where the common middle family is missing',()=>{
  const {report}=result(noWealth);
  expect(report.linkedPairCount).toBe(0);
  expect(report.linkedPairs).toEqual([]);
  expect(report.status).toBe('research_only');
 });

 it('is deterministic on same snapshot and refuses an unauthorized Preview registry',()=>{
  const sample=result(fiveFamilies);
  expect(buildNatalN14LinkedT8ResearchReport(sample.snapshot,sample.execution,registry))
    .toEqual(sample.report);
  const preview=createGeneralNatalIntegratedReadingRegistry(now.toISOString());
  expect(()=>buildNatalN14LinkedT8ResearchReport(sample.snapshot,sample.execution,preview))
    .toThrow(/source-bounded research/u);
  expect(()=>buildNatalN14LinkedT8ResearchReport({...sample.snapshot,snapshotId:'tampered'},sample.execution,registry))
    .toThrow(/not bound/u);
 });
});
