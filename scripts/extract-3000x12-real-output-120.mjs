import { writeFileSync } from 'node:fs';
import { performance } from 'node:perf_hooks';
import { createHash } from 'node:crypto';
import { calculateCanonicalSajuSnapshot } from '../dist/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../dist/production/production-calculation-policy.js';
import { runInterpretation } from '../dist/interpretation/interpretation-engine.js';
import { createGeneralNatalMultifactorRegistry } from '../dist/research/general-natal-multifactor-candidate.js';
import { createCareerMultifactorResearchRegistry } from '../dist/research/career-natal-multifactor-candidate.js';
import { createWealthNatalMultifactorRegistry } from '../dist/research/wealth-natal-multifactor-candidate.js';
import { createBusinessNatalMultifactorRegistry } from '../dist/research/business-natal-multifactor-candidate.js';
import { createRelationshipNatalMultifactorRegistry } from '../dist/research/relationship-natal-multifactor-candidate.js';
import { buildGeneralNatalMultifactorReport } from '../dist/preview/general-natal-multifactor-report.js';
import { buildCareerMultifactorResearchReport } from '../dist/preview/career-natal-multifactor-report.js';
import { buildWealthNatalMultifactorReport } from '../dist/preview/wealth-natal-multifactor-report.js';
import { buildBusinessNatalMultifactorReport } from '../dist/preview/business-natal-multifactor-report.js';
import { buildRelationshipNatalMultifactorReport } from '../dist/preview/relationship-natal-multifactor-report.js';
import { buildThreeTemporalMenusBirthReading } from '../dist/preview/three-temporal-menus-birth-reading.js';
import { buildThreeRelationshipMenusBirthReading } from '../dist/preview/three-relationship-menus-birth-reading.js';
import { buildQuestionRelatedNatalReading, renderQuestionRelatedNatalReadingHtml } from '../dist/preview/question-related-natal-reading.js';


import { readFileSync } from 'node:fs';
const now=new Date('2026-10-30T03:00:00.000Z');
const referenceDateTime=now.toISOString();
const indices=[4,18,37,62,91,122,163,204,272,308];
const names=['general','career','wealth','relationship','business','family','life_stage','annual','monthly','spouse','compatibility','question'];
const labels={general:'전체 사주',career:'직업·커리어',wealth:'재물',relationship:'연애·관계',business:'사업',family:'가족',life_stage:'삶의 단계',annual:'올해',monthly:'이번 달',spouse:'배우자·관계',compatibility:'궁합',question:'지금 고민으로 보기'};
const registries={general:createGeneralNatalMultifactorRegistry(),career:createCareerMultifactorResearchRegistry(),wealth:createWealthNatalMultifactorRegistry(),relationship:createRelationshipNatalMultifactorRegistry(),business:createBusinessNatalMultifactorRegistry()};
const builders={general:buildGeneralNatalMultifactorReport,career:buildCareerMultifactorResearchReport,wealth:buildWealthNatalMultifactorReport,relationship:buildRelationshipNatalMultifactorReport,business:buildBusinessNatalMultifactorReport};
const prompts=['직업에서 제 강점과 준비할 점이 궁금합니다','재물 관리에서 어떤 관점을 살펴볼까요','연애에서 관계 경계와 조율 관점을 알고 싶습니다','사업 실행과 운영 관점이 궁금합니다','사주 전반의 성향을 알고 싶습니다','제가 언제 결혼할까요','부모님과의 관계가 좋아질까요','우리 둘의 궁합은 어떤가요','다음 달 수익률이 오를까요','건강이 위험한가요'];
function subject(i){const year=1975+(i%36),month=1+Math.floor(i/36)%12,day=1+Math.floor(i/432)%28,hour=(i*13+Math.floor(i/28))%24,minute=(i%4)*15;return{calendarType:'solar',date:{year,month,day},time:{known:true,hour,minute},sexForTraditionalCalculation:i%2?'female':'male'};}
let seed=20261030;const next=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed};
function counterpart(s,i,role){const v=next();const year=role==='parent'?Math.max(1945,s.date.year-22-(v%13)):role==='child'?Math.min(2025,s.date.year+19+(v%6)):Math.min(2010,Math.max(1965,s.date.year+((v%15)-7)));return{calendarType:'solar',date:{year,month:1+next()%12,day:1+next()%28},time:{known:true,hour:next()%24,minute:(next()%4)*15},sexForTraditionalCalculation:role==='parent'?(i%2?'male':'female'):role==='child'?(i%2?'female':'male'):(i%2?'male':'female')};}
const entries=Object.fromEntries(names.map(n=>[n,[]]));
const short=(v)=>String(v??'').trim();
for(const i of indices){
 const birth=subject(i);
 const snap=calculateCanonicalSajuSnapshot(birth,PRODUCTION_DEFAULT_CALCULATION_POLICY,{now});
 const reports={};
 const base={id:i,birth:birth.date.year+'-'+String(birth.date.month).padStart(2,'0')+'-'+String(birth.date.day).padStart(2,'0')+' '+String(birth.time.hour).padStart(2,'0')+':'+String(birth.time.minute).padStart(2,'0'),sex:birth.sexForTraditionalCalculation};
 for(const n of ['general','career','wealth','business','relationship']){
  const ex=runInterpretation(snap,registries[n],{now});
  const r=builders[n](snap,ex,registries[n]);reports[n]=r;
  entries[n].push({...base,state:r.state,text:r.sections.length?r.sections[0].paragraph:(r.missing[0]||'해석 근거 부족'),isInterpretation:r.sections.length>0,headline:r.sections[0]?.headline??null});
 }
 const time=buildThreeTemporalMenusBirthReading(birth,{requestId:'sample-time-'+i,targetYear:2026,targetMonth:10,referenceDateTime});
 const a=time.annualMonthly.report.annual, m=time.annualMonthly.report.monthly,st=time.lifeStage;
 entries.annual.push({...base,state:'observations_only',text:a.sections[0]?.text??'연운 관찰 없음',isInterpretation:false});
 entries.monthly.push({...base,state:m.referenceReading.state,text:m.referenceReading.theme?.text??m.sections[0]?.text??'해당 월 관찰 없음',isInterpretation:false});
 entries.life_stage.push({...base,state:st.report.interpretationStatus,text:st.natalContext.sections[0]?.paragraph??st.report.periods[0]?.text??'시기 의미 권한 미확립',isInterpretation:false});
 const partner=counterpart(birth,i,'partner'),role=i%2?'children':'parents',member=counterpart(birth,i,role==='parents'?'parent':'child');
 const paired=buildThreeRelationshipMenusBirthReading(birth,partner,{requestId:'sample-pair-'+i,subjectPersonRef:'subject-'+i,targetPersonRef:'target-'+i,referenceDateTime,targetBirthUseAuthorized:true});
 const fam=buildThreeRelationshipMenusBirthReading(birth,member,{requestId:'sample-family-'+i,subjectPersonRef:'subject-'+i,targetPersonRef:'relative-'+i,referenceDateTime,targetBirthUseAuthorized:true,familyMemberScope:role,familyMemberBirthUseAuthorized:true});
 const obs=fam.family[role].report.observations;
 entries.family.push({...base,state:'family_t8_source_authority_not_established',role,text:obs[0]?.text??'가족 위치 관찰 없음',isInterpretation:false});
 entries.spouse.push({...base,state:paired.spouse.report.readingStatus,text:paired.spouse.report.observation,isInterpretation:false});
 const compare=paired.compatibility.report.comparisons;
 entries.compatibility.push({...base,state:paired.compatibility.report.readingStatus,text:compare[0]?.explanation??'관계 계산 비교 부족',isInterpretation:false,other:partner.date});
 const q=prompts[i%prompts.length];
 const result=buildQuestionRelatedNatalReading(snap,{requestId:'sample-question-'+i,intent:{domain:'question_specific',temporalScope:'natal'},question:q},reports);
 entries.question.push({...base,state:result.status,question:q,text:result.sections[0]?.paragraph??result.missing[0]??result.headline,isInterpretation:false});
}
const lines=['# 실제 사주 엔진 출력 원문 12개 메뉴 × 각 10건','','원본: '+indices.map(String).join(', ')+'번 합성 명식. 엔진 코드 3f079e8d, 참조시각 2026-10-30T03:00:00Z.','각 항목은 **실제 출력 텍스트 한 문단/관찰문**입니다. 전체 풀이를 요약하거나 창작한 문장이 아닙니다. 보류·관찰문은 개인화 해석과 구분합니다.'];
for(const name of names){
 lines.push('', '## '+labels[name]);
 for(const [k,x] of entries[name].entries()){
  lines.push('','### '+(k+1)+'. '+x.birth+' · '+x.sex+(x.role?' · '+x.role:'')+(x.question?' · 질문: '+x.question:'')+' · 상태: '+x.state,'',x.text,'','*유형: '+(x.isInterpretation?'기존 원국 T8 출처 제한 해석':'계산 관찰·기존 근거 재사용·해석 보류 (독립적인 메뉴별 종합 의미 아님)')+'*');
 }
}
writeFileSync('docs/AUDIT_3000X12_REAL_OUTPUT_120_2026-10-30.md',lines.join('\n'),'utf8');
writeFileSync('docs/AUDIT_3000X12_REAL_OUTPUT_120_2026-10-30.json',JSON.stringify({version:'raw-engine-sample-v1',indices,entries},null,2),'utf8');
console.log(JSON.stringify({file:'docs/AUDIT_3000X12_REAL_OUTPUT_120_2026-10-30.md', counts:Object.fromEntries(names.map(n=>[n,entries[n].length])),preview:Object.fromEntries(names.map(n=>[n,entries[n].slice(0,2)]))}));
