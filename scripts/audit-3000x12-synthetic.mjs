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

const N=Number(process.argv[2] || 3000);
const startIndex=Number(process.argv[4] || 0);
const output=process.argv[3] || 'saju-3000x12-audit-20261030.json';
const referenceDateTime='2026-10-30T03:00:00.000Z';
const now=new Date(referenceDateTime);
const names=['general','career','wealth','relationship','business','family','life_stage','annual','monthly','spouse','compatibility','question'];
const state=Object.fromEntries(names.map(name=>[name,{attempted:0,executed:0,exceptions:0,meaningBearing:0,zeroSections:0,sectionCount:0,states:{},uniqueParagraphs:new Set(),uniqueSignatures:new Set(),uniqueHeads:new Set()}]));
const registries={
 general:createGeneralNatalMultifactorRegistry(), career:createCareerMultifactorResearchRegistry(),
 wealth:createWealthNatalMultifactorRegistry(), business:createBusinessNatalMultifactorRegistry(),
 relationship:createRelationshipNatalMultifactorRegistry()
};
const builders={general:buildGeneralNatalMultifactorReport,career:buildCareerMultifactorResearchReport,
 wealth:buildWealthNatalMultifactorReport,business:buildBusinessNatalMultifactorReport,
 relationship:buildRelationshipNatalMultifactorReport};
const issues=[],samples=[],birthKeys=new Set(),metric={compatibilityT10Issued:0,familyOutcomeIssued:0,spouseTraitIssued:0,monthlyInPeriod:0,monthlyT9Theme:0,annualSectionCount:0,compatibilityPairDistinct:0,compatibilityPersonalTextsDiffer:0,questionSections:0,questionStatuses:{},familyContexts:{parents:0,children:0},badSourceProof:0};
const questions=['직업에서 제 강점과 준비할 점이 궁금합니다','재물 관리에서 어떤 관점을 살펴볼까요','연애에서 관계 경계와 조율 관점을 알고 싶습니다','사업 실행과 운영 관점이 궁금합니다','사주 전반의 성향을 알고 싶습니다','제가 언제 결혼할까요','부모님과의 관계가 좋아질까요','우리 둘의 궁합은 어떤가요','다음 달 수익률이 오를까요','건강이 위험한가요'];
let seed=20261030;const next=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed};
function birth(year,month,day,hour,minute,sex){return {calendarType:'solar',date:{year,month,day},time:{known:true,hour,minute},sexForTraditionalCalculation:sex};}
function subject(i){
 const year=1975+(i%36), month=1+Math.floor(i/36)%12,day=1+Math.floor(i/432)%28;
 const hour=(i*13+Math.floor(i/28))%24,minute=(i%4)*15;
 return birth(year,month,day,hour,minute,i%2?'female':'male');
}
function counterpart(s,i,role) {
 const v=next();
 const year=role==='parent' ? Math.max(1945,s.date.year-22-(v%13)):
   role==='child' ? Math.min(2025,s.date.year+19+(v%6)):
   Math.min(2010,Math.max(1965,s.date.year+((v%15)-7)));
 return birth(year,1+next()%12,1+next()%28,next()%24,(next()%4)*15,role==='parent'? (i%2?'male':'female') :role==='child' ?(i%2?'female':'male'):(i%2?'male':'female'));
}
function update(name,{mode,paragraphs=[],heads=[]}={}){
 const s=state[name];s.executed++;
 const p=paragraphs.filter(x=>typeof x==='string'&&x.trim());
 if(p.length) s.meaningBearing++; else s.zeroSections++;
 s.sectionCount+=p.length;
 s.states[mode??'n/a']=(s.states[mode??'n/a']??0)+1;
 for(const x of p) s.uniqueParagraphs.add(x);
 for(const x of heads) s.uniqueHeads.add(x);
 s.uniqueSignatures.add(JSON.stringify(p));
}
function fail(name,i,e){state[name].exceptions++;issues.push({id:i,menu:name,error:String(e).slice(0,500)});}
const start=performance.now();
for(let offset=0;offset<N;offset++){
 const i=startIndex+offset;
 const self=subject(i),key=JSON.stringify(self);birthKeys.add(key);
 let snapshot,reports,temporal,rel,kin;
 for(const name of names)state[name].attempted++;
 try{
 snapshot=calculateCanonicalSajuSnapshot(self,PRODUCTION_DEFAULT_CALCULATION_POLICY,{now});
 reports={};
 for(const name of ['general','career','wealth','business','relationship']){
  try{
   const ex=runInterpretation(snapshot,registries[name],{now});
   const report=builders[name](snapshot,ex,registries[name]);
   reports[name]=report;
   const secs=report.sections??[];
   if(secs.some(s=>!s.sourceIds?.length||s.upstreamClaimIds?.length<2||!s.paragraph?.trim()))metric.badSourceProof++;
   update(name,{mode:report.state,paragraphs:secs.map(s=>s.paragraph),heads:secs.map(s=>s.headline)});
  }catch(e){fail(name,i,e);}
 }
 }catch(e){for(const name of ['general','career','wealth','business','relationship'])if(!reports?.[name])fail(name,i,e);}
 try{
  temporal=buildThreeTemporalMenusBirthReading(self,{requestId:'audit-time-'+i,targetYear:2026,targetMonth:10,referenceDateTime});
  const annual=temporal.annualMonthly.report.annual;
  const month=temporal.annualMonthly.report.monthly;
  const stage=temporal.lifeStage;
  if(temporal.snapshotId!==snapshot?.snapshotId)metric.badSourceProof++;
  metric.annualSectionCount+=annual.sections.length;
  if(month.referenceReading.state==='in_period')metric.monthlyInPeriod++;
  if(month.referenceReading.theme)metric.monthlyT9Theme++;
  update('annual',{mode:annual.sections.length?'observations_only':'no_observation',paragraphs:annual.sections.map(s=>s.text),heads:annual.sections.map(s=>s.title)});
  update('monthly',{mode:month.referenceReading.state,paragraphs:month.sections.map(s=>s.text),heads:month.sections.map(s=>s.title)});
  update('life_stage',{mode:stage.report.interpretationStatus,paragraphs:stage.natalContext.sections.map(s=>s.paragraph),heads:stage.natalContext.sections.map(s=>s.title)});
 }catch(e){for(const name of ['annual','monthly','life_stage'])fail(name,i,e);}
 try{
  const partner=counterpart(self,i,'partner');
  rel=buildThreeRelationshipMenusBirthReading(self,partner,{requestId:'audit-partner-'+i,subjectPersonRef:'subject-'+i,targetPersonRef:'partner-'+i,referenceDateTime,targetBirthUseAuthorized:true});
  const fs=(i%2===0?'parents':'children'),familyBirth=counterpart(self,i,fs==='parents'?'parent':'child');
  kin=buildThreeRelationshipMenusBirthReading(self,familyBirth,{requestId:'audit-family-'+i,subjectPersonRef:'subject-'+i,targetPersonRef:'relative-'+i,referenceDateTime,targetBirthUseAuthorized:true,familyMemberScope:fs,familyMemberBirthUseAuthorized:true});
  metric.familyContexts[fs]++;
  const familyParagraphs=[...Object.values(kin.family).flatMap(x=>x.report.observations.map(y=>y.text))];
  const familyMeaning=kin.family.parents.mayClaimFamilyOutcome||kin.family.children.mayClaimFamilyOutcome||kin.familyMember?.mayInferFamilyDynamics;
  if(familyMeaning)metric.familyOutcomeIssued++;
  update('family',{mode:kin.familyMember?.familyMeaningStatus??'n/a',paragraphs:familyParagraphs});
  const spouseParagraphs=rel.spouse.report.observations?.map(x=>x.text)??[];
  if(rel.spouse.report.mayInferPartnerTraits)metric.spouseTraitIssued++;
  update('spouse',{mode:rel.spouse.report.readingStatus,paragraphs:spouseParagraphs});
  const compat=rel.compatibility;
  if(compat.report.readingStatus!=='insufficient_interpersonal_meaning_authority')metric.compatibilityT10Issued++;
  if(compat.report.subject.calculationHash!==compat.report.target.calculationHash)metric.compatibilityPairDistinct++;
  const a=compat.personalRelationship.subject.sections.map(x=>x.paragraph);
  const b=compat.personalRelationship.target.sections.map(x=>x.paragraph);
  if(JSON.stringify(a)!==JSON.stringify(b))metric.compatibilityPersonalTextsDiffer++;
  update('compatibility',{mode:compat.report.readingStatus,paragraphs:[...a,...b],heads:compat.personalRelationship.subject.sections.map(x=>x.title)});
 }catch(e){for(const name of ['family','spouse','compatibility'])fail(name,i,e);}
 try{
  if(!snapshot||!reports||Object.keys(reports).length!==5)throw new Error('Missing complete source reports');
  const q=questions[i%questions.length];
  const result=buildQuestionRelatedNatalReading(snapshot,{requestId:'audit-question-'+i,intent:{domain:'question_specific',temporalScope:'natal'},question:q},reports);
  const html=renderQuestionRelatedNatalReadingHtml(result);
  if(!html.includes('<html')||result.snapshotId!==snapshot.snapshotId)metric.badSourceProof++;
  const sections=result.sections??[];
  if(sections.some(s=>!s.sourceIds.length||!s.factPaths.length))metric.badSourceProof++;
  metric.questionSections+=sections.length;
  metric.questionStatuses[q]=metric.questionStatuses[q]??{};
  metric.questionStatuses[q][result.status]=(metric.questionStatuses[q][result.status]??0)+1;
  update('question',{mode:result.status,paragraphs:sections.map(s=>s.paragraph),heads:sections.map(s=>s.title)});
 }catch(e){fail('question',i,e);}
 if(i<3) samples.push({id:i,birth:self,domains:Object.fromEntries(Object.entries(reports??{}).map(([k,v])=>[k,{state:v.state,paragraphs:v.sections.map(s=>s.paragraph).slice(0,2)}])),temporal:temporal?{yearSections:temporal.annualMonthly.report.annual.sections.length,monthStatus:temporal.annualMonthly.report.monthly.referenceReading.state,stageStatus:temporal.lifeStage.report.interpretationStatus}:null,family:kin?{status:kin.familyMember?.familyMeaningStatus,scope:kin.familyMember?.scope}:null,compatibility:rel?.compatibility.report.readingStatus,question:questions[i%10]});
 if((offset+1)%250===0)console.log('PROGRESS '+(offset+1)+'/'+N+' OFFSET='+startIndex+' '+Math.round((performance.now()-start)/1000)+'s errors='+issues.length);
}
const summary=Object.fromEntries(Object.entries(state).map(([k,v])=>[k,{attempted:v.attempted,executed:v.executed,exceptions:v.exceptions,meaningBearing:v.meaningBearing,zeroSections:v.zeroSections,meanSections: v.executed?Math.round(v.sectionCount/v.executed*100)/100:0,states:v.states,distinctParagraphs:v.uniqueParagraphs.size,distinctFullReadings:v.uniqueSignatures.size,distinctHeads:v.uniqueHeads.size}]));
const hash=v=>createHash('sha256').update(v).digest('hex');
const hashPools=Object.fromEntries(Object.entries(state).map(([name,s])=>[name,{paragraphs:[...s.uniqueParagraphs].map(hash),readings:[...s.uniqueSignatures].map(hash),heads:[...s.uniqueHeads].map(hash)}]));
const result={audit:'saju-3000x12-real-engine-synthetic',referenceDateTime,requested:N,startIndex,uniqueInputCharts:birthKeys.size,engineRevision:'3f079e8d',elapsedSeconds:Math.round((performance.now()-start)/1000),menus:summary,metrics:metric,hashPools,issueCount:issues.length,issues:issues.slice(0,200),samples};
writeFileSync(output,JSON.stringify(result,null,2),'utf8');
console.log('RESULT '+JSON.stringify({output,elapsedSeconds:result.elapsedSeconds,uniqueInputCharts:birthKeys.size,issueCount:issues.length,menus:summary,metrics:{...metric,questionStatuses:metric.questionStatuses}}));
