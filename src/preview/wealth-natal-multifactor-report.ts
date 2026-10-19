import type { CanonicalSajuSnapshot, PillarSlot } from '../contracts/calculation.js';
import type { InterpretationClaim } from '../contracts/interpretation.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import { deterministicContentHash, type ResolvedRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import { buildReadingCompositionEvidence } from '../reading/reading-intent-composition.js';
import {
  WEALTH_MULTIFACTOR_PACK, WEALTH_MULTIFACTOR_NARRATIVES,
} from '../research/wealth-natal-multifactor-candidate.js';

export const WEALTH_MULTIFACTOR_REPORT_VERSION = '0.1.0-internal-research' as const;
type Channel = 'visible_stems' | 'branches';
type Axis = 'core' | 'management' | 'tension';
export interface WealthMultifactorSection {
  claimType:string; pattern:string; axis:Axis; channel:Channel;
  headline:string; paragraph:string;
  observedPositions:readonly string[]; observedFactPaths:readonly string[];
  upstreamClaimIds:readonly string[];sourceIds:readonly string[];ruleId:string;
}
export interface WealthMultifactorReport {
  version:typeof WEALTH_MULTIFACTOR_REPORT_VERSION;
  snapshotId:string;calculationHash:string;
  state:'complete'|'partial'|'insufficient';
  title:string;introduction:string;
  sections:readonly WealthMultifactorSection[];
  missing:readonly string[];limitations:readonly string[];
  researchOnly:true;mayPublish:false;maySell:false;usefulComplete:false;
}
const AXES:readonly Axis[]=['core','management','tension'];
const FAMILIES:Readonly<Record<string,readonly string[]>>={
  output:['식신','상관'],wealth:['정재','편재'],
  officer:['정관','편관'],resource:['정인','편인'],
};
const SLOTS:Readonly<Record<PillarSlot,string>>={
  year:'연주',month:'월주',day:'일주',hour:'시주',
};
function guard(valid:unknown,description:string):asserts valid {
  if(!valid)throw new TypeError('Wealth multifactor report: '+description);
}
function profileText(type:string,key:'headline'|'summary') {
  const profile=WEALTH_MULTIFACTOR_NARRATIVES.find(p=>p.claimType===type);
  guard(profile!==undefined,'original source-owned Korean ClaimNarrativeProfile absent');
  const matches=profile.templates?.filter(x=>x.language==='ko'&&x.templateKey===key)??[];
  guard(matches.length===1&&matches[0]!.text.length>0,'Korean source text absent');
  return matches[0]!.text;
}
function chartPositions(snapshot:CanonicalSajuSnapshot,channel:Channel,families:readonly string[]) {
  const facts=snapshot.derivedFacts.tenGods;
  guard(facts.status==='resolved'&&families.length===2&&
    new Set(families).size===2&&families.every(x=>FAMILIES[x]!==undefined),
    'two actual recognized chart families required');
  const component=channel==='visible_stems'?'stem':'branch';
  const slots:readonly PillarSlot[]=channel==='visible_stems'
    ? ['year','month','hour']:['year','month','day','hour'];
  const observed=slots.flatMap(slot=>{
    const value=facts.value[slot][component];
    if(value?.status!=='resolved')return [];
    const family=families.find(x=>FAMILIES[x]!.includes(value.value));
    return family===undefined?[]:[{
      family,display:SLOTS[slot]+' '+(component==='stem'?'천간 ':'지지 대표 십신 ')+value.value,
      factPath:'derivedFacts.tenGods.value.'+slot+'.'+component+'.value',
    }];
  });
  guard(families.every(f=>observed.some(o=>o.family===f)),
    'one of the exact T5 upstream families is absent in Canonical chart');
  return observed;
}
function buildSection(claim:InterpretationClaim,snapshot:CanonicalSajuSnapshot,
  execution:InterpretationExecutionResult,registry:ResolvedRuleRegistrySnapshot
):WealthMultifactorSection {
  const value=claim.value as Record<string,unknown>;
  guard(value!==null&&typeof value==='object'&&!Array.isArray(value)&&
    typeof value.pattern==='string'&&AXES.includes(value.axis as Axis)&&
    (value.channel==='visible_stems'||value.channel==='branches')&&
    Array.isArray(value.families)&&value.financialOutcomeAuthorized===false&&
    value.investmentAdviceAuthorized===false&&value.futureTimingAuthorized===false&&
    value.causalLifeBehaviorAuthorized===false,
    'unsupported Wealth interpretation or outcome authority');
  const upstream=claim.upstreamClaimRefs.map(id=>execution.claims.find(c=>c.claimId===id));
  guard(claim.scenarioRef===undefined&&claim.upstreamClaimRefs.length===2&&
    new Set(claim.upstreamClaimRefs).size===2&&
    upstream.every(c=>c!==undefined&&c.state==='active'&&c.taxonomy.tier==='T5'&&
      c.snapshotId===snapshot.snapshotId&&c.scenarioRef===undefined),
    'two exact non-scenario same-chart T5 Claims required');
  const reference=claim.ruleRefs[0];
  const rule=registry.rules.find(x=>x.ruleId===reference?.ruleId&&x.version===reference?.version);
  const evaluation=execution.evaluations.find(x=>x.evaluationId===reference?.evaluationId);
  guard(claim.ruleRefs.length===1&&rule!==undefined&&
    rule.taxonomy.tier==='T8'&&rule.taxonomy.category==='wealth'&&
    rule.taxonomy.subcategory==='multifactor_structure'&&rule.status==='research'&&
    rule.output.claimType===claim.claimType&&rule.output.predicate===claim.predicate&&
    rule.methodologyRef.id===claim.methodologyRef.id&&
    rule.methodologyRef.version===claim.methodologyRef.version&&
    deterministicContentHash(rule.output.value)===deterministicContentHash(claim.value)&&
    evaluation?.status==='matched'&&evaluation.snapshotId===snapshot.snapshotId&&
    evaluation.scenarioRef===undefined&&evaluation.ruleRef.id===rule.ruleId&&
    evaluation.ruleRef.version===rule.version&&
    evaluation.interpretationPackRef.id===registry.pack.packId&&
    evaluation.interpretationPackRef.version===registry.pack.version&&
    evaluation.emittedClaimIds.includes(claim.claimId),
    'original source T8 value or evaluation is not exactly matched');
  const expected=rule.inputs.map(input=>{
    guard(input.source==='interpretation_claim'&&input.required&&
      input.cardinality==='exactly_one','original two-input Claim contract missing');
    return input.pathOrClaimType;
  }).sort();
  guard(expected.length===2&&
    JSON.stringify(expected)===JSON.stringify(upstream.map(c=>c!.claimType).sort())&&
    rule.sourceRefs.length===claim.sourceRefs.length&&
    rule.sourceRefs.every(r=>claim.sourceRefs.includes(r.sourceId))&&
    claim.sourceRefs.every(id=>registry.sources.some(s=>s.sourceId===id)),
    'two T5 types or original source provenance do not match rule');
  const locations=chartPositions(snapshot,value.channel as Channel,value.families as string[]);
  const paragraph='이 명식에서 확인한 계산 근거는 '+
    locations.map(p=>p.display).join(' · ')+'입니다. '+profileText(claim.claimType,'summary');
  return {
    claimType:claim.claimType,pattern:value.pattern,axis:value.axis as Axis,
    channel:value.channel as Channel,
    headline:profileText(claim.claimType,'headline'),paragraph,
    observedPositions:locations.map(p=>p.display),
    observedFactPaths:locations.map(p=>p.factPath),
    upstreamClaimIds:[...claim.upstreamClaimRefs],
    sourceIds:[...claim.sourceRefs],ruleId:rule.ruleId,
  };
}
export function buildWealthMultifactorResearchReport(
  snapshot:CanonicalSajuSnapshot,
  execution:InterpretationExecutionResult,
  registry:ResolvedRuleRegistrySnapshot,
):WealthMultifactorReport {
  guard(execution.run.snapshotId===snapshot.snapshotId&&
    execution.run.snapshotHash===snapshot.calculationHash&&
    execution.run.registrySnapshotId===registry.snapshot.registrySnapshotId&&
    execution.run.packRef.id===registry.pack.packId&&
    execution.run.packRef.version===registry.pack.version&&
    execution.integrity.valid&&execution.run.status!=='failed'&&
    registry.pack.packId===WEALTH_MULTIFACTOR_PACK.packId&&
    registry.pack.version===WEALTH_MULTIFACTOR_PACK.version&&
    registry.pack.status==='research','wrong Canonical chart, Registry or research authority');
  const evidence=buildReadingCompositionEvidence(snapshot,execution,registry,{
    requestId:'wealth-multifactor-internal-preview',
    intent:{domain:'wealth',temporalScope:'natal'},
  });
  const selected=new Set(evidence.evidence?.bundle.claims.map(c=>c.claimId)??[]);
  const matched=execution.claims.filter(c=>
    c.taxonomy.tier==='T8'&&c.taxonomy.category==='wealth'&&
    c.taxonomy.subcategory==='multifactor_structure'&&
    c.state==='active'&&c.snapshotId===snapshot.snapshotId);
  guard(matched.every(c=>selected.has(c.claimId)),
    'Claim not selected by original ReadingIntent and EvidenceSelector');
  const units=matched.map(c=>buildSection(c,snapshot,execution,registry))
    .sort((a,b)=>AXES.indexOf(a.axis)-AXES.indexOf(b.axis)||
      (a.channel===b.channel?0:a.channel==='visible_stems'?-1:1));
  const core=units.find(c=>c.axis==='core'&&c.channel==='visible_stems');
  const shown:WealthMultifactorSection[]=core?[core]:[];
  const axes=new Set<Axis>(core?['core']:[]);
  for(const unit of units){
    if(!core||axes.has(unit.axis))continue;
    axes.add(unit.axis);
    shown.push(unit);
    if(shown.length===3)break;
  }
  // A non-core research observation may be shown as partial, never a full
  // report and never disguised as a confirmed financial fact.
  if(!core&&units.length>0)shown.push(units[0]!);
  const missing:string[]=[];
  if(!core)missing.push('천간의 기존 두 T5 근거를 가진 중심 산출-자원 구조');
  if(shown.length<3)missing.push('중심 구조와 서로 다른 두 보조 해석 축');
  let state:WealthMultifactorReport['state']=shown.length===3?'complete':
    units.length>0?'partial':'insufficient';
  if(!snapshot.completeness.birthTimeKnown){
    state='insufficient';shown.length=0;
    missing.unshift('출생시각 미상: 네 기둥 전체의 재물운 종합 해석 보류');
  }
  return {
    version:WEALTH_MULTIFACTOR_REPORT_VERSION,
    snapshotId:snapshot.snapshotId,calculationHash:snapshot.calculationHash,
    state,title:'내 명식의 자원과 돈을 읽는 구조',
    introduction:'실제 명식의 서로 다른 십신 관계를 연결한 전통적 연구 해석입니다. 개인 재산이나 소비 성향을 확인한 정보가 아닙니다.',
    sections:shown,missing,
    limitations:[
      '논쟁 중인 문헌을 제한적으로 참고한 내부 연구입니다. 실제 소득·투자 성과·자산 수준·미래 사건을 예측하지 않습니다.',
      '다른 도메인의 해석을 자동으로 재물운 결과에 옮기지 않습니다.',
      '공식 공개·저장·판매할 수 없습니다.',
      ...(state==='complete'?[]:['현재 개인별 종합풀이에 필요한 독립 근거가 부족합니다.']),
    ],
    researchOnly:true,mayPublish:false,maySell:false,usefulComplete:false,
  };
}
function escapeHtml(input:string):string {
  return input.replace(/[&<>"']/gu,c=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;',
  })[c]!);
}
export function renderWealthMultifactorResearchHtml(report:WealthMultifactorReport):string {
  const e=escapeHtml;
  const sections=report.sections.map(s=>
    '<section><h2>'+e(s.headline)+'</h2><p>'+e(s.paragraph)+'</p>'+
    '<details><summary>실제 십신 위치·Claim·출처</summary><p>'+
    e(s.observedFactPaths.join(' · '))+'</p><p>'+
    e(s.upstreamClaimIds.join(' · '))+'</p><p>'+
    e(s.sourceIds.join(' · '))+'</p><p>'+e(s.ruleId)+
    '</p></details></section>').join('');
  return '<!doctype html><html lang="ko"><head><meta charset="utf-8">'+
    '<meta name="viewport" content="width=device-width,initial-scale=1">'+
    '<title>'+e(report.title)+'</title>'+
    '<style>body{max-width:780px;margin:auto;padding:32px 18px;'+
    'font:16px/1.8 system-ui,sans-serif}section{padding:16px 0;border-top:1px solid #ddd}'+
    'summary{cursor:pointer}</style></head><body>'+
    '<h1>'+e(report.title)+'</h1><p>'+e(report.introduction)+'</p>'+
    '<p>최소 유효 풀이: '+e(report.state)+'</p>'+
    (sections||'<p>현재 확인된 근거로 종합 풀이를 제공할 수 없습니다.</p>')+
    '<h2>해석 범위</h2>'+report.limitations.map(x=>'<p>'+e(x)+'</p>').join('')+
    '<p>내부 연구 전용 · 유료·공식 풀이 사용 불가</p></body></html>';
}
