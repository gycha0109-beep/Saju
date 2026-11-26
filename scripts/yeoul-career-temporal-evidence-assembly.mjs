import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {calculateCanonicalSajuSnapshot} from '../dist/calculation/calculation-engine.js';
import {PRODUCTION_DEFAULT_CALCULATION_POLICY} from '../dist/production/production-calculation-policy.js';
import {runInterpretation} from '../dist/interpretation/interpretation-engine.js';
import {createCareerNatalReadingCandidateRegistry} from '../dist/research/career-natal-reading-candidate.js';
import {buildReadingCompositionEvidence} from '../dist/reading/reading-profile-authorization.js';
import {buildPreviewSemanticTextBindingsV1} from '../dist/preview/preview-semantic-text-projection.js';
import {buildPreviewSemanticQualifierBindingsV1} from '../dist/preview/preview-semantic-qualifier-projection.js';
import {buildCanonicalReadingSemanticBundleV1} from '../dist/reading/canonical-reading-semantics.js';
import {buildOfficialReadingPlanV1} from '../dist/reading/official-reading-plan.js';
import {renderOfficialReadingV1} from '../dist/reading/official-reading-renderer.js';
import {CAREER_ANNUAL_CLAIM_NARRATIVE_PROFILES} from '../dist/research/career-annual-narrative-profiles.js';
import {CAREER_MONTHLY_CLAIM_NARRATIVE_PROFILES} from '../dist/research/career-monthly-narrative-profiles.js';
const dir=resolve(process.argv[2]),out=resolve(process.argv[3]);
const now=new Date('2026-11-21T03:00:00.000Z');
const birth={calendarType:'solar',date:{year:2001,month:11,day:30},time:{known:true,hour:15,minute:30},sexForTraditionalCalculation:'female'};
const snapshot=calculateCanonicalSajuSnapshot(birth,PRODUCTION_DEFAULT_CALCULATION_POLICY,{now});
const intent={domain:'career',temporalScope:'natal'},registry=createCareerNatalReadingCandidateRegistry(now.toISOString());
const execution=runInterpretation(snapshot,registry,{now});
const composition=buildReadingCompositionEvidence(snapshot,execution,registry,{requestId:'yeoul-career-complete-female',intent},{narrativePolicyVersion:'yeoul-career-complete-research-v1'});
if(!composition.evidence)throw Error('NATAL_COMPOSITION_MISSING');
const evidence=composition.evidence.bundle,ids=composition.selection.targetClaimIds;
const texts=buildPreviewSemanticTextBindingsV1({intent,registry,evidence,targetClaimIds:ids});
const quals=buildPreviewSemanticQualifierBindingsV1({intent,registry,evidence,targetClaimIds:ids});
const semantic=buildCanonicalReadingSemanticBundleV1({intent,evidence,targetClaimIds:ids,semanticTextBindings:texts,semanticQualifierBindings:quals});
const official=renderOfficialReadingV1(semantic,buildOfficialReadingPlanV1(semantic),{preferredDetail:'standard'});
const claims=[];
for(const u of semantic.units.filter(u=>ids.includes(u.claimId))){
 if(!u.canonicalText?.headline||!u.canonicalText?.summary||u.sourceRefs.length===0)throw Error('NATAL_UNTRACED');
 claims.push({id:'natal-'+String(claims.length+1).padStart(2,'0'),kind:'natal',text:u.canonicalText.headline+' — '+u.canonicalText.summary,origin:u.claimId+';'+u.unitId+';'+u.sourceRefs.join(',')});
}
const natalCount=claims.length;
const profiles={annual:CAREER_ANNUAL_CLAIM_NARRATIVE_PROFILES,monthly:CAREER_MONTHLY_CLAIM_NARRATIVE_PROFILES};
const records=[];
for(const scope of ['annual','monthly']){
 const names=scope==='annual'?[2026,2027,2028,2029,2030].map(y=>'annual-'+y+'.json'):['2026-11','2026-12','2027-01','2027-02','2027-03','2027-04'].map(x=>'monthly-'+x+'.json');
 for(const name of names){
  const d=JSON.parse(readFileSync(join(dir,name),'utf8'));
  if(d.snapshotId!==snapshot.snapshotId||d.calculationHash!==snapshot.calculationHash||d.scope!==scope||d.execution.run.status!=='completed')throw Error('TEMPORAL_SNAPSHOT_OR_EXECUTION_MISMATCH:'+name);
  const active=d.execution.claims.filter(c=>c.taxonomy?.tier==='T9'&&c.taxonomy?.category==='career'&&c.state==='active');
  const keys=[];
  for(const c of active){
   const profile=profiles[scope].find(p=>p.claimType===c.claimType&&p.semanticKeys.includes(c.value?.semanticKey));
   if(!profile)throw Error('CAREER_TEMPORAL_PROFILE_MISSING:'+c.claimType+' '+c.value?.semanticKey);
   const headline=profile.templates.find(t=>t.templateKey==='headline')?.text;
   const summary=profile.templates.find(t=>t.templateKey==='summary')?.text;
   if(!headline||!summary||!c.sourceRefs?.length)throw Error('TEMPORAL_PROFILE_INCOMPLETE');
   const period=scope==='annual'?String(d.year):d.year+'-'+String(d.month).padStart(2,'0');
   const segment=c.value?.segmentId??c.value?.segment??null;
   const id=(scope==='annual'?'year':'month')+'-'+period.replaceAll('-','')+'-'+String(keys.length+1).padStart(2,'0');
   claims.push({id,kind:scope,period,segment,text:period+(segment?' '+segment:'')+' — '+headline+' — '+summary,origin:c.claimId+';'+c.ruleRefs.map(x=>x.ruleId).join(',')+';'+c.sourceRefs.join(',')});
   keys.push(id);
  }
  records.push({scope,year:d.year,month:d.month??null,ids:keys,sourceClaimCount:active.length});
 }
}
const dayun=JSON.parse(readFileSync(join(dir,'dayun.json'),'utf8')).report;
if(dayun.snapshotId!==snapshot.snapshotId||dayun.calculationHash!==snapshot.calculationHash||dayun.coverage!=='calculated_only'||dayun.periods.length<1)throw Error('DAYUN_MISSING_OR_WRONG_CHART');
for(const p of dayun.periods){
 claims.push({id:'dayun-'+p.kind,kind:'dayun',period:p.startsAt.slice(0,10)+' ~ '+p.endsAtExclusive.slice(0,10),text:p.text,origin:dayun.policyId+';'+dayun.policyHash});
}
const input={sourceKind:'saju_engine_derived_research_only',productionIssuance:false,readingId:'research-'+official.reportHash.slice(0,16),state:'research_only',domain:'career',officialReportHash:official.reportHash,evidence:claims,limitations:['모든 해석은 연구용이며 판매·공식 발급 권한이 없습니다.','연운·월운은 2026~2030년·2026-11~2027-04의 직업 경향만 설명하며 취업·승진·퇴사 등 사건은 단정할 수 없습니다.','대운은 시기 경계 계산값이며 좋고 나쁨이나 그 시기 벌어질 일을 해석하는 근거가 아닙니다.','확인된 명식 이외의 개인 경험, 직장 이력, 특정 사건을 만들어내지 않습니다.']};
mkdirSync(resolve(out,'..'),{recursive:true});
writeFileSync(out,JSON.stringify(input,null,2)+'\n','utf8');
writeFileSync(out+'.manifest.json',JSON.stringify({birthSample:'synthetic-female-2001-11-30-1530',snapshotId:snapshot.snapshotId,calculationHash:snapshot.calculationHash,officialReportHash:official.reportHash,researchOnly:true,natalClaims:natalCount,annualClaims:claims.filter(x=>x.kind==='annual').length,monthlyClaims:claims.filter(x=>x.kind==='monthly').length,dayunPeriods:dayun.periods.length,records},null,2)+'\n','utf8');
console.log(JSON.stringify({result:'COMPLETE_SOURCE_ASSEMBLED',file:out,sourceHash:official.reportHash,snapshot:snapshot.snapshotId,total:claims.length,natal:natalCount,annual:claims.filter(x=>x.kind==='annual').length,monthly:claims.filter(x=>x.kind==='monthly').length,dayun:dayun.periods.length,years:records.filter(x=>x.scope==='annual').map(x=>[x.year,x.ids.length]),months:records.filter(x=>x.scope==='monthly').map(x=>[x.year+'-'+x.month,x.ids.length])}));
