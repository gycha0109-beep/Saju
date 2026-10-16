import {writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import process from 'node:process';
import {calculateCanonicalSajuSnapshot} from '../dist/calculation/calculation-engine.js';
import {PRODUCTION_DEFAULT_CALCULATION_POLICY} from '../dist/production/production-calculation-policy.js';
import {runInterpretation} from '../dist/interpretation/interpretation-engine.js';
import {createGeneralNatalConclusionCandidateRegistry} from '../dist/research/general-natal-conclusion-synthesis-candidate.js';
import {createGeneralNatalSourceBoundedRegistry} from '../dist/research/general-natal-conclusion-source-bounded-candidate.js';
import {buildGeneralNatalN15FilteredResearchReading} from '../dist/research/general-natal-n15-structural-only-conclusion-filter.js';

const NOW=new Date('2026-10-16T00:00:00.000Z');
const originalRegistry=createGeneralNatalConclusionCandidateRegistry(NOW.toISOString());
const boundedRegistry=createGeneralNatalSourceBoundedRegistry(NOW.toISOString());
const cases=[
 ['1984-06-14','05:30'],['1984-06-14','12:30'],
 ['1984-01-07','00:30'],['1984-01-07','12:30'],
 ['1989-09-08','05:30'],['1989-09-08','12:30'],
 ['1992-01-12','00:30'],['1992-01-12','19:30'],
];
const records=cases.map(([date,time])=>{
 const [year,month,day]=date.split('-').map(Number);
 const [hour,minute]=time.split(':').map(Number);
 const snapshot=calculateCanonicalSajuSnapshot({
  calendarType:'solar',date:{year,month,day},time:{known:true,hour,minute},
  sexForTraditionalCalculation:'unspecified',
 },PRODUCTION_DEFAULT_CALCULATION_POLICY,{now:NOW});
 const original=runInterpretation(snapshot,originalRegistry,{now:NOW,requestId:'n15-original-'+date+'-'+time});
 const bounded=runInterpretation(snapshot,boundedRegistry,{now:NOW,requestId:'n15-bounded-'+date+'-'+time});
 const result=buildGeneralNatalN15FilteredResearchReading(
  snapshot,original,originalRegistry,bounded,boundedRegistry,
 );
 return {caseId:'solar-'+date+'-'+time,...result};
});
const output={
 version:'saju-n15-eight-real-chart-narrowed-research-packet-v1',
 lifecycle:'internal_research_only',
 consumerAuthorized:false,productionAuthorized:false,maySell:false,
 sampleCount:records.length,
 originalCandidateCount:records.reduce((n,r)=>n+r.originalT8CandidateCount,0),
 structuralObservationCount:records.reduce((n,r)=>n+r.structuralObservationCount,0),
 overreachBlockCount:records.reduce((n,r)=>n+r.blockedOverreachCount,0),
 missingRelationBlockCount:records.reduce((n,r)=>n+r.missingRelationEvidenceCount,0),
 unsupportedConsumerConclusionsEmitted:0,
 cases:records,
};
if(output.sampleCount!==8 || output.originalCandidateCount<8 ||
   output.structuralObservationCount<1 ||
   !records.every(r=>r.originalConsumerConclusionCount===0 &&
     !r.originalConsumerConclusionsPublished && !r.modernConsumerSemanticsApproved &&
     r.decisions.every(d=>!d.originalConsumerConclusionAllowed && !d.modernBehaviorInferenceAllowed &&
       (d.decision==='structural_observation_only')===(typeof d.researchStructuralText==='string')))){
  throw new TypeError('N15 unapproved interpretation leaked into bounded research inspection');
}
const e=s=>String(s).replace(/[&<>"']/gu,
 c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
const html='<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>N15 T8 과장 결론 차단 실측</title>'+
 '<style>body{max-width:980px;margin:36px auto;padding:16px;font:16px/1.65 system-ui}article{padding:18px;margin:18px 0;border:1px solid #bbb;border-radius:8px}li{margin:8px 0}small{color:#555}</style></head><body>'+
 '<h1>N15 근거가 확인된 구조만 남긴 연구용 읽기 자료</h1>'+
 '<p><strong>Research/HOLD — 소비자용 인물·재물·직업·관계 해석 아님. 의미 승인·판매 금지.</strong></p>'+
 records.map(r=>'<article><h2>'+e(r.caseId)+'</h2><p>기존 연구용 결론 '+r.originalT8CandidateCount+
 '건 중 좁은 구조 관측 '+r.structuralObservationCount+'건, 과잉 결론 차단 '+r.blockedOverreachCount+
 '건, 관계 증거 부족 '+r.missingRelationEvidenceCount+'건</p>'+
 '<ol>'+r.decisions.map(d=>'<li><strong>'+e(d.originalClaimType)+'</strong> — '+e(d.decision)+
 (d.researchStructuralText===undefined?
   '<p><small>원문 결론은 표시하지 않음: '+e(d.reason)+'</small></p>':
   '<p>'+e(d.researchStructuralText)+'</p><p><small>T8: '+
    e(d.supportingT8ClaimId)+' / T5: '+e(d.supportingT5ClaimIds.join(', '))+
    ' / 출처: '+e(d.supportingSourceLocators.map(s=>s.sourceId+': '+s.locator).join('; '))+
    '</small></p>')+'</li>').join('')+'</ol></article>').join('')+
 '</body></html>\n';
const json=resolve(process.argv[2]??'natal-n15-filtered.json');
const webpage=resolve(process.argv[3]??'natal-n15-filtered.html');
writeFileSync(json,JSON.stringify(output,null,2)+'\n','utf8');
writeFileSync(webpage,html,'utf8');
process.stdout.write('N15 eight real charts: '+output.originalCandidateCount+
 ' original research candidates, '+output.structuralObservationCount+
 ' structural-only, '+output.overreachBlockCount+' personal overreach blocked, '+
 output.missingRelationBlockCount+' missing evidence, 0 consumer conclusions\n');
