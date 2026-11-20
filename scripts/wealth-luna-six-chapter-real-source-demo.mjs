import {mkdirSync,writeFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {createHash} from 'node:crypto';
import {calculateCanonicalSajuSnapshot} from '../dist/calculation/calculation-engine.js';
import {PRODUCTION_DEFAULT_CALCULATION_POLICY} from '../dist/production/production-calculation-policy.js';
import {runInterpretation} from '../dist/interpretation/interpretation-engine.js';
import {createWealthNatalReadingCandidateRegistry} from '../dist/research/wealth-natal-reading-candidate.js';
import {buildReadingCompositionEvidence} from '../dist/reading/reading-profile-authorization.js';
import {buildPreviewSemanticTextBindingsV1} from '../dist/preview/preview-semantic-text-projection.js';
import {buildPreviewSemanticQualifierBindingsV1} from '../dist/preview/preview-semantic-qualifier-projection.js';
import {buildCanonicalReadingSemanticBundleV1} from '../dist/reading/canonical-reading-semantics.js';
import {buildOfficialReadingPlanV1} from '../dist/reading/official-reading-plan.js';
import {renderOfficialReadingV1} from '../dist/reading/official-reading-renderer.js';

/** Research evidence export ONLY; the signed purchaser/issue proof is created
 * by the existing production Saju issuer, not by this CLI. Never use this
 * script's results to open a paid Reading or bypass purchase policy.
 */
const intent={domain:'wealth',temporalScope:'natal'};
const now=new Date('2026-11-20T00:00:00.000Z');
const chapters=[
  {id:'wealth-01',title:'돈복을 타고났을까?',question:'명식에서 재물의 전체 구조는 무엇인가'},
  {id:'wealth-02',title:'돈은 어디에서 들어오는가',question:'가치를 만들어 자원으로 연결하는 축은 무엇인가'},
  {id:'wealth-03',title:'버는 돈과 남는 돈',question:'만든 결과와 자원 관리의 기준은 어떻게 다른가'},
  {id:'wealth-04',title:'돈이 새어나가는 곳',question:'실제 승인된 구조적 긴장과 선택 비용은 무엇인가'},
  {id:'wealth-05',title:'당신의 특별한 돈 이야기 — 특별 심층 장',question:'서로 다른 승인된 재물 근거가 함께 작용하는 개인의 복합 구조는 무엇인가'},
  {id:'wealth-06',title:'결국 돈을 남기는 사람은',question:'앞 장들의 검증된 결론을 함께 읽을 때 무엇을 구별해야 하는가'},
];
const samples=[
 {label:'case-a',date:{year:2001,month:11,day:30},time:{known:true,hour:15,minute:30}},
 {label:'case-b',date:{year:2003,month:7,day:17},time:{known:true,hour:8,minute:15}},
];
const outDir=resolve(process.argv[2]??'outputs/wealth-luna-sixchapter-source');
mkdirSync(outDir,{recursive:true});
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
function unitMeaning(unit){
 const headline=unit.canonicalText?.headline?.trim()??'';
 const summary=unit.canonicalText?.summary?.trim()??'';
 if(headline.length<8||summary.length<25 || !Array.isArray(unit.sourceRefs)||unit.sourceRefs.length===0
   || !unit.semanticPayload?.wealthKind || unit.taxonomy?.category!=='wealth') {
   throw Error('Approved wealth interpretation content/trace missing: '+unit.claimId);
 }
 return Object.freeze({
   unitId:unit.unitId,kind:unit.semanticPayload.wealthKind,
   canonicalMeaning:headline+' — '+summary,
   sourceRefs:[...unit.sourceRefs],claimRef:unit.claimId,
   methodologyRef:unit.methodologyRef?.id??null,
 });
}
function uniq(items){
 const seen=new Set();
 return items.filter(x=>x && (!seen.has(x.unitId)&&seen.add(x.unitId)));
}
function pick(all,kinds,max=4){
 const a=[];
 for(const kind of kinds)for(const x of all){
   if(x.kind===kind && !a.some(y=>y.unitId===x.unitId)){a.push(x);break;}
 }
 for(const x of all)if(a.length<max&&!a.some(y=>y.unitId===x.unitId))a.push(x);
 return uniq(a).slice(0,max);
}
for(const sample of samples){
 const registry=createWealthNatalReadingCandidateRegistry(now.toISOString());
 const snapshot=calculateCanonicalSajuSnapshot({
   calendarType:'solar',date:sample.date,time:sample.time,
   sexForTraditionalCalculation:'unspecified',
 },PRODUCTION_DEFAULT_CALCULATION_POLICY,{now});
 const execution=runInterpretation(snapshot,registry,{now});
 const composition=buildReadingCompositionEvidence(snapshot,execution,registry,{
   requestId:'wealth-luna-real-source-'+sample.label,intent,
 },{narrativePolicyVersion:'wealth-luna-real-source-v1'});
 if(!composition.evidence)throw Error('Missing governed interpretation evidence');
 const evidence=composition.evidence.bundle;
 const ids=composition.selection.targetClaimIds;
 const texts=buildPreviewSemanticTextBindingsV1({intent,registry,evidence,targetClaimIds:ids});
 const qualifiers=buildPreviewSemanticQualifierBindingsV1({intent,registry,evidence,targetClaimIds:ids});
 const semantic=buildCanonicalReadingSemanticBundleV1({
   intent,evidence,targetClaimIds:ids,
   semanticTextBindings:texts,semanticQualifierBindings:qualifiers,
 });
 const official=renderOfficialReadingV1(semantic,buildOfficialReadingPlanV1(semantic),{preferredDetail:'detailed'});
 const selected=new Set(ids);
 const units=semantic.units.filter(u=>selected.has(u.claimId)).map(unitMeaning);
 const creation=units.filter(u=>u.kind==='value_creation');
 const management=units.filter(u=>u.kind==='management');
 const friction=units.filter(u=>u.kind==='friction');
 const spending=units.filter(u=>u.kind==='spending');
 const complete=creation.length>0 && management.length>0 && friction.length>0;
 const sourceChapterUnits=[
   pick(units,['value_creation','management','friction']),
   uniq([...creation,...management]).slice(0,4),
   uniq([...management,...spending,...creation]).slice(0,4),
   uniq([...friction,...spending,...management]).slice(0,4),
   uniq([creation[creation.length-1],management[management.length-1],friction[0],
     spending[0],...units]).slice(0,5),
   uniq([creation[0],management[0],friction[0],spending[0]]).slice(0,4),
 ];
 const output={
   schemaVersion:'saju-wealth-real-source-sixchapter-demo-v1',
   status:complete?'SOURCE_COMPLETE_FOR_RESEARCH':'HELD_INSUFFICIENT_SOURCE',
   productionIssuance:false,customerPurchased:false,readerDraft:false,
   label:sample.label,birthInput:{calendarType:'solar',date:sample.date,time:sample.time},
   officialReportHash:official.reportHash,
   evidenceKindCounts:Object.fromEntries([...new Set(units.map(x=>x.kind))].map(k=>[
     k,units.filter(u=>u.kind===k).length,
   ])),
   sourceUnitCount:units.length,
   chapters:chapters.map((c,index)=>({
     chapterId:c.id,title:c.title,question:c.question,
     units:sourceChapterUnits[index],
   })),
 };
 const file=resolve(outDir,sample.label+'.json');
 writeFileSync(file,JSON.stringify({...output,sourceHash:hash(output)},null,2)+'\n','utf8');
 process.stdout.write(JSON.stringify({label:sample.label,status:output.status,
   sourceUnitCount:units.length,counts:output.evidenceKindCounts,
   chapterUnits:output.chapters.map(ch=>ch.units.length),file})+'\n');
}
