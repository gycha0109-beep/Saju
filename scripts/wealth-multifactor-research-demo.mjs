import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import { calculateCanonicalSajuSnapshot } from '../dist/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../dist/production/production-calculation-policy.js';
import { runInterpretation } from '../dist/interpretation/interpretation-engine.js';
import { createWealthMultifactorResearchRegistry } from '../dist/research/wealth-natal-multifactor-candidate.js';
import {
  buildWealthMultifactorResearchReport,
  renderWealthMultifactorResearchHtml,
} from '../dist/preview/wealth-natal-multifactor-report.js';

const now=new Date('2026-10-19T00:00:00.000Z');
const registry=createWealthMultifactorResearchRegistry(now.toISOString());
const cases=[];
for(const month of [2,3,4,5,6,7])for(const day of [3,7,11,17,23]){
  const input={
    calendarType:'solar',
    date:{year:2024,month,day},
    time:{known:true,hour:12,minute:0},
    sexForTraditionalCalculation:'unspecified',
  };
  const snapshot=calculateCanonicalSajuSnapshot(input,PRODUCTION_DEFAULT_CALCULATION_POLICY,{now});
  const execution=runInterpretation(snapshot,registry,{now});
  const report=buildWealthMultifactorResearchReport(snapshot,execution,registry);
  if(report.sections.length>0)cases.push({input,report,signature:
    report.sections.map(s=>s.pattern).join('|')});
}
const first=cases[0];
const second=cases.find(x=>x.signature!==first?.signature);
if(!first||!second)throw new Error('No different source-qualified Wealth meanings; cannot fabricate cases');
const sections=[first,second].map((c,i)=>{
  const content=renderWealthMultifactorResearchHtml(c.report);
  const body=content.match(/<body>([\s\S]*)<\/body>/u)?.[1];
  if(!body)throw new Error('Missing original research report HTML');
  return '<section class="case"><h2>실제 계산 명식 '+(i+1)+
    ': 2024-'+String(c.input.date.month).padStart(2,'0')+'-'+
    String(c.input.date.day).padStart(2,'0')+'</h2>'+body+'</section>';
}).join('');
const html='<!doctype html><html lang="ko"><head><meta charset="utf-8">'+
  '<meta name="viewport" content="width=device-width,initial-scale=1">'+
  '<title>명하 재물운 다중 근거 실제 명식 비교</title>'+
  '<style>body{max-width:900px;margin:auto;padding:24px;font:16px/1.8 system-ui}'+
  '.case{border-top:2px solid #bbb;padding:24px 0}</style></head><body>'+
  '<h1>두 실제 명식의 재물운 연구 풀이</h1>'+
  '<p>기존 출처에서 제한적으로 도출한 연구 후보이며 실제 자산·금전 결과를 예측하지 않습니다.</p>'+
  sections+'</body></html>';
const filename=resolve(process.argv[2]??'wealth-multifactor-research-comparison.html');
writeFileSync(filename,html,'utf8');
process.stdout.write(JSON.stringify({
  lifecycle:'internal_research_only',mayPublish:false,maySell:false,usefulComplete:false,
  outputHtml:filename,
  cases:[first,second].map(x=>({input:x.input,state:x.report.state,
    missing:x.report.missing,sections:x.report.sections})),
},null,2)+'\n');
