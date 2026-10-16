import {writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import process from 'node:process';
import {calculateCanonicalSajuSnapshot} from '../dist/calculation/calculation-engine.js';
import {PRODUCTION_DEFAULT_CALCULATION_POLICY} from '../dist/production/production-calculation-policy.js';
import {runInterpretation} from '../dist/interpretation/interpretation-engine.js';
import {createGeneralNatalSourceBoundedRegistry} from '../dist/research/general-natal-conclusion-source-bounded-candidate.js';
import {buildNatalN14LinkedT8ResearchReport} from '../dist/research/general-natal-t8-linked-structure-draft.js';

const fixedCases=[
 ['1984-06-14','05:30'],['1984-06-14','12:30'],
 ['1984-01-07','00:30'],['1984-01-07','12:30'],
 ['1989-09-08','05:30'],['1989-09-08','12:30'],
 ['1992-01-12','00:30'],['1992-01-12','19:30'],
];
const now=new Date('2026-10-16T00:00:00.000Z');
const registry=createGeneralNatalSourceBoundedRegistry(now.toISOString());
const safe=(text)=>String(text).replace(/[&<>"']/gu,
 (p)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[p]);

const cases=fixedCases.map(([date,time])=>{
 const [year,month,day]=date.split('-').map(Number);
 const [hour,minute]=time.split(':').map(Number);
 const snapshot=calculateCanonicalSajuSnapshot({
  calendarType:'solar',date:{year,month,day},
  time:{known:true,hour,minute},sexForTraditionalCalculation:'unspecified',
 },PRODUCTION_DEFAULT_CALCULATION_POLICY,{now});
 const interpretation=runInterpretation(snapshot,registry,{now,requestId:'n14-'+date+'-'+time});
 const report=buildNatalN14LinkedT8ResearchReport(snapshot,interpretation,registry);
 return {caseId:'solar-'+date+'-'+time,...report};
});
const result={
 version:'saju-n14-linked-t8-real-chart-research-packet-v1',
 lifecycle:'research_only',consumerAuthorized:false,productionAuthorized:false,
 caseCount:cases.length,
 totalLinkedPairs:cases.reduce((sum,c)=>sum+c.linkedPairCount,0),
 casesWithLinks:cases.filter(c=>c.linkedPairCount>0).length,
 uniqueSignatures:new Set(cases.map(c=>c.linkedSemanticSignature)).size,
 cases,
};
if(result.caseCount!==8 || result.casesWithLinks<1 ||
 !cases.every(c=>c.mayExposeAsConsumerInterpretation===false &&
   c.linkedPairs.every(p=>!p.transitiveCausalInferenceAuthorized &&
      !p.publicationAuthorized && !p.modernConsumerInferenceAuthorized &&
      p.independentUpstreamT5ClaimRefs.length===3 &&
      p.firstT8ClaimId!==p.secondT8ClaimId))) {
 throw new TypeError('N14 linked T8 study violated fail-closed authority or actual evidence');
}
const html='<!doctype html><html lang="ko"><head><meta charset="utf-8">'+
 '<title>N14 T8 관계 연결 연구</title><style>body{font:16px/1.7 system-ui;max-width:950px;margin:30px auto;padding:20px}article{border:1px solid #ccc;padding:20px;margin:18px 0;border-radius:8px}small{color:#666}</style></head><body>'+
 '<h1>동일 명식 안에서 연결되는 T8 구조 관측</h1>'+
 '<p><b>연구 검토 전용: 소비자 해석·인과적 연결·직업/재물/운세 추론 미승인</b></p>'+
 cases.map(c=>'<article><h2>'+safe(c.caseId)+' — '+c.linkedPairCount+'쌍</h2>'+
 (c.linkedPairs.length?'<ol>'+c.linkedPairs.map(p=>'<li>'+safe(p.text)+
  '<p><small>T8: '+safe(p.firstT8ClaimId)+' / '+safe(p.secondT8ClaimId)+
  ' · 공통 '+safe(p.bridgeFamily)+' · T5: '+safe(p.independentUpstreamT5ClaimRefs.join(', '))+
  ' · 출처: '+safe(p.sourceLocators.map(s=>s.sourceId+' '+s.locator).join('; '))+
  ' · 판정: Research/HOLD</small></p></li>').join('')+'</ol>':
  '<p>검증된 두 개의 연속 구조 관계 조합 없음. 부재를 개인의 특징으로 해석하지 않습니다.</p>')+
 '</article>').join('')+'</body></html>\n';
const path=resolve(process.argv[2]??'natal-n14-linked.json');
const htmlPath=resolve(process.argv[3]??'natal-n14-linked.html');
writeFileSync(path,JSON.stringify(result,null,2)+'\n','utf8');
writeFileSync(htmlPath,html,'utf8');
process.stdout.write('N14 linked T8 research: '+result.casesWithLinks+'/'+result.caseCount+
 ' real charts with '+result.totalLinkedPairs+' linked co-observations; '+result.uniqueSignatures+
 ' signatures; all consumer authority HOLD\n');
