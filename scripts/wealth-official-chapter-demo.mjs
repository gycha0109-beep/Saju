import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import process from 'node:process';
import { calculateCanonicalSajuSnapshot } from '../dist/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../dist/production/production-calculation-policy.js';
import { runInterpretation } from '../dist/interpretation/interpretation-engine.js';
import { createWealthNatalReadingCandidateRegistry } from '../dist/research/wealth-natal-reading-candidate.js';
import { buildReadingCompositionEvidence } from '../dist/reading/reading-profile-authorization.js';
import { buildPreviewSemanticTextBindingsV1 } from '../dist/preview/preview-semantic-text-projection.js';
import { buildPreviewSemanticQualifierBindingsV1 } from '../dist/preview/preview-semantic-qualifier-projection.js';
import { buildCanonicalReadingSemanticBundleV1 } from '../dist/reading/canonical-reading-semantics.js';
import { buildOfficialReadingPlanV1 } from '../dist/reading/official-reading-plan.js';
import { renderOfficialReadingV1 } from '../dist/reading/official-reading-renderer.js';

const now=new Date('2026-11-19T00:00:00Z');
const intent={domain:'wealth',temporalScope:'natal'};
const cases=[
  {label:'case-a',date:{year:2001,month:11,day:30},time:{known:true,hour:15,minute:30}},
  {label:'case-b',date:{year:2003,month:7,day:17},time:{known:true,hour:8,minute:15}},
];
const escapeHtml=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
function blockHtml(b){
 if(b.type==='paragraph')return '<p>'+escapeHtml(b.text).replaceAll('\n','<br>')+'</p>';
 if(b.type==='key_points')return '<ul>'+b.items.map(x=>'<li>'+escapeHtml(x)+'</li>').join('')+'</ul>';
 if(b.type==='insights')return b.items.map(x=>'<div class="insight"><h3>'+escapeHtml(x.headline??'해석')+'</h3><p>'+escapeHtml(x.summary??'').replaceAll('\n','<br>')+'</p>'+ (x.qualifiers?.length?'<small>'+escapeHtml(x.qualifiers.join(' · '))+'</small>':'')+'</div>').join('');
 if(b.type==='comparison')return '<div class="insight">'+b.perspectives.map(x=>'<h3>'+escapeHtml(x.label)+'</h3><p>'+escapeHtml(x.text)+'</p>').join('')+'</div>';
 if(b.type==='ambiguity')return '<div class="insight">'+escapeHtml(b.summary)+b.scenarios.map(x=>'<p>'+escapeHtml(x.label)+': '+escapeHtml(x.text)+'</p>').join('')+'</div>';
 if(b.type==='source_hint')return '<small>'+escapeHtml(b.text)+'</small>';
 return '';
}
function htmlFor(input,report){
 const cover=`<section class="cover"><div class="brand">명하 · OFFICIAL READING SOURCE DEMO</div><p class="tag">재물운 · 근거 기반 자동생성</p><h1>돈을 대하는<br>나의 판단 기준</h1><p class="lead">${input.date.year}.${String(input.date.month).padStart(2,'0')}.${String(input.date.day).padStart(2,'0')} · ${String(input.time.hour).padStart(2,'0')}:${String(input.time.minute).padStart(2,'0')}</p><p class="notice">해석 엔진과 공식 Reader 렌더 경로를 실행한 개발 검토본입니다. 캐릭터·Luna 집필 및 판매 승인본이 아닙니다.</p></section>`;
 return '<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>명하 재물운 - '+input.label+'</title><style>:root{color-scheme:light}body{margin:0;background:#f6f5f1;color:#273b32;font-family:system-ui,\'Noto Sans KR\',sans-serif;line-height:1.85;word-break:keep-all}.wrap{max-width:740px;margin:auto;padding:32px 24px 90px}.cover{padding:66px 0;border-bottom:1px solid #d7dfd6}.brand{font-size:12px;letter-spacing:.18em;color:#69806c}.tag{margin-top:52px;color:#436851;font-weight:700}h1{font-size:clamp(40px,6vw,62px);letter-spacing:-.05em;line-height:1.35;font-family:serif;font-weight:600}h2{font-family:serif;font-weight:600;font-size:28px;margin:0 0 24px}.chapter{border-bottom:1px solid #d9ded7;padding:64px 0}.chapter>p,.chapter .insight p{font-size:15.5px}.insight{margin:20px 0 36px}.insight h3{font-size:17px;margin-bottom:4px}.insight p{white-space:normal;margin:0}.chapter ul{padding-left:23px}.chapter li{padding:4px 0}small{font-size:12px;color:#718276;display:block;margin-top:10px}.notice{font-size:13px;color:#5a6f60}.lead{font-size:17px}</style><main class="wrap">'+cover+report.sections.map((s,i)=>'<section class="chapter"><small>CHAPTER '+String(i+1).padStart(2,'0')+'</small><h2>'+escapeHtml(s.title)+'</h2>'+s.blocks.map(blockHtml).join('')+'</section>').join('')+'<footer class="notice">기록 버전: '+escapeHtml(report.reportHash.slice(0,16))+' · 범위 외 미래 금전사건 예측 금지</footer></main></html>';
}
for(const input of cases){
 const registry=createWealthNatalReadingCandidateRegistry(now.toISOString());
 const snapshot=calculateCanonicalSajuSnapshot({calendarType:'solar',date:input.date,time:input.time,sexForTraditionalCalculation:'unspecified'},PRODUCTION_DEFAULT_CALCULATION_POLICY,{now});
 const execution=runInterpretation(snapshot,registry,{now});
 const composition=buildReadingCompositionEvidence(snapshot,execution,registry,{requestId:'wealth-chapter-demo-'+input.label,intent},{narrativePolicyVersion:'wealth-chapter-source-demo-v1'});
 if(composition.evidence===undefined)throw new Error('No governed evidence for '+input.label);
 const source=composition.evidence.bundle;
 const selected=composition.selection.targetClaimIds;
 const semanticTextBindings=buildPreviewSemanticTextBindingsV1({intent,registry,evidence:source,targetClaimIds:selected});
 const semanticQualifierBindings=buildPreviewSemanticQualifierBindingsV1({intent,registry,evidence:source,targetClaimIds:selected});
 const bundle=buildCanonicalReadingSemanticBundleV1({intent,evidence:source,targetClaimIds:selected,semanticTextBindings,semanticQualifierBindings});
 const plan=buildOfficialReadingPlanV1(bundle);
 const result=renderOfficialReadingV1(bundle,plan,{preferredDetail:'detailed'});
 const dest=resolve(process.argv[2]??'outputs/wealth-official-chapters',input.label+'.html');
 mkdirSync(dirname(dest),{recursive:true});
 writeFileSync(dest,htmlFor(input,result),'utf8');
 const summary={label:input.label,birth:input.date,chapters:result.sections.map(x=>x.title),semanticUnitCount:bundle.targetClaimIds.length,evidenceCount:result.explainability.entries.length,reportHash:result.reportHash,output:dest};
 process.stdout.write(JSON.stringify(summary)+'\n');
}
