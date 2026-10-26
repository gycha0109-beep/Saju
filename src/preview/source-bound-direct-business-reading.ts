import type { CanonicalSajuSnapshot, TenGod } from '../contracts/calculation.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import type { ResolvedRuleRegistrySnapshot } from '../interpretation/rule-registry.js';

const FAMILIES:Readonly<Record<string,readonly TenGod[]>>={
  peer:['비견','겁재'],resource:['편인','정인'],output:['식신','상관'],
  wealth:['편재','정재'],officer:['편관','정관'],
};
export interface SourceBoundedBusinessDirectT8 {
  claimId:string;claimType:string;ruleId:string;sourceIds:readonly string[];
  families:readonly string[];
  sharedChannel:'visible_stems'|'branches';
  observedPositions:readonly string[];
  observedFactPaths:readonly string[];
  paragraph:string;
  replacesMultifactorCore:false;
  authorizesFounderOrRevenueOutcome:false;
}
function assert(x:unknown,msg:string):asserts x{
  if(!x)throw new TypeError('Direct business T8 source: '+msg);
}
export function selectSourceBoundedDirectBusinessT8(
  snapshot:CanonicalSajuSnapshot,
  execution:InterpretationExecutionResult,
  registry:ResolvedRuleRegistrySnapshot,
  selected:ReadonlySet<string>,
):readonly SourceBoundedBusinessDirectT8[]{
  const tenGods=snapshot.derivedFacts.tenGods;
  if(!snapshot.completeness.birthTimeKnown||tenGods.status!=='resolved')return [];
  return execution.claims.filter(c=>c.state==='active'&&
    c.snapshotId===snapshot.snapshotId&&c.scenarioRef===undefined&&
    selected.has(c.claimId)&&c.taxonomy.category==='business'&&
    c.taxonomy.tier==='T8'&&c.predicate==='business_conclusion'&&
    c.methodologyRef.id==='M-BUSINESS-NATAL-READING-TEN-GOD-SYNTHESIS-V1'
  ).map(claim=>{
    const v=claim.value as Record<string,unknown>;
    const family=v.families as string[];
    assert(Array.isArray(family)&&family.length>=1&&
      family.every(x=>FAMILIES[x]!==undefined)&&
      new Set(family).size===family.length&&
      v.entrepreneurSuitabilityAuthorized===false&&
      v.specificIndustryAuthorized===false&&
      v.businessSuccessAuthorized===false&&
      v.revenueOutcomeAuthorized===false&&
      v.fundingOutcomeAuthorized===false&&
      v.failureOutcomeAuthorized===false&&
      v.futureTimingAuthorized===false&&
      v.financialAdviceAuthorized===false&&
      v.numericScoringAuthorized===false,
    'business conclusion exceeded source method authority');
    const ref=claim.ruleRefs[0];
    const rule=registry.rules.find(r=>r.ruleId===ref?.ruleId&&
      r.version===ref.version&&r.status==='research'&&
      r.output.claimType===claim.claimType&&
      r.methodologyRef.id===claim.methodologyRef.id);
    const evaluation=execution.evaluations.find(x=>x.evaluationId===ref?.evaluationId);
    const upstream=claim.upstreamClaimRefs.map(id=>execution.claims.find(x=>x.claimId===id));
    assert(rule&&claim.ruleRefs.length===1&&evaluation?.status==='matched'&&
      evaluation.emittedClaimIds.includes(claim.claimId)&&
      rule.output.tags?.includes('shared-channel-gated')&&
      rule.inputs.some(input=>input.key==='tenGodsLayout'&&
        input.source==='derived_fact'&&input.pathOrClaimType==='derivedFacts.tenGods')&&
      upstream.length>=family.length&&
      upstream.filter(x=>x?.taxonomy.tier==='T5').length===family.length&&
      claim.sourceRefs.length>0&&claim.sourceRefs.every(id=>
        registry.sources.some(src=>src.sourceId===id)),
    'selected business T8 did not match original same-channel rule/Claim/source');
    const channels=['visible_stems','branches'] as const;
    const eligible=channels.flatMap(channel=>{
      const slots=channel==='visible_stems'?['year','month','hour'] as const:
        ['year','month','day','hour'] as const;
      const key=channel==='visible_stems'?'stem':'branch';
      const observations=slots.flatMap(slot=>{
        const observed=tenGods.value[slot][key];
        if(observed?.status!=='resolved')return [];
        const label=family.find(f=>FAMILIES[f]!.some(g=>g===observed.value));
        return label?[{family:label,position:slot+' '+key+' '+observed.value,
          path:'derivedFacts.tenGods.value.'+slot+'.'+key+'.value'}]:[];
      });
      return family.every(f=>observations.some(x=>x.family===f))
        ? [{channel,observations}]:[];
    });
    assert(eligible.length>0,'original shared-channel condition was not observed');
    const chosen=eligible[0]!;
    return {
      claimId:claim.claimId,claimType:claim.claimType,ruleId:rule.ruleId,
      sourceIds:[...claim.sourceRefs],families:[...family],
      sharedChannel:chosen.channel,
      observedPositions:chosen.observations.map(x=>x.position),
      observedFactPaths:chosen.observations.map(x=>x.path),
      paragraph:'이 명식의 '+(chosen.channel==='visible_stems'?'천간':'지지')+
        '에서 '+chosen.observations.map(x=>x.position).join(' · ')+
        '의 출처 한정 사업 운영 관점 T8이 실제 선택됐습니다. '+
        '동일 채널 조건을 만족한 연구 관측이며 창업 적성·매출·성공·실패·투자 결과를 판단하지 않습니다.',
      replacesMultifactorCore:false as const,
      authorizesFounderOrRevenueOutcome:false as const,
    };
  });
}
