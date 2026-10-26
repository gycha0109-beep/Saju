import type { CanonicalSajuSnapshot, TenGod } from '../contracts/calculation.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import type { ResolvedRuleRegistrySnapshot } from '../interpretation/rule-registry.js';

const FAMILY_MEMBERS: Readonly<Record<string,readonly TenGod[]>> = {
  peer:['비견','겁재'],resource:['편인','정인'],
  output:['식신','상관'],wealth:['편재','정재'],officer:['편관','정관'],
};

export interface GeneralRelationshipDirectT8Evidence {
  claimId:string;
  claimType:string;
  ruleId:string;
  sourceIds:readonly string[];
  families:readonly string[];
  observedPositions:readonly string[];
  observedFactPaths:readonly string[];
  paragraph:string;
  generalInterpersonalScopeOnly:true;
  authorizesSpouseOrCompatibilityOutcome:false;
  replacesMultifactorCore:false;
}
function assert(v:unknown,msg:string):asserts v{
  if(!v)throw new TypeError('Direct general relationship research: '+msg);
}
export function selectSourceBoundedGeneralRelationshipT8(
  snapshot:CanonicalSajuSnapshot,
  execution:InterpretationExecutionResult,
  registry:ResolvedRuleRegistrySnapshot,
  selected:ReadonlySet<string>,
):readonly GeneralRelationshipDirectT8Evidence[]{
  const tenGods=snapshot.derivedFacts.tenGods;
  if(!snapshot.completeness.birthTimeKnown || tenGods.status!=='resolved')return [];
  return execution.claims.filter(claim=>
    claim.state==='active' && claim.snapshotId===snapshot.snapshotId &&
    claim.scenarioRef===undefined && selected.has(claim.claimId) &&
    claim.taxonomy.tier==='T8' &&
    claim.taxonomy.category==='relationship' &&
    claim.predicate==='relationship_conclusion' &&
    claim.methodologyRef.id==='M-RELATIONSHIP-NATAL-READING-TEN-GOD-SYNTHESIS-V1'
  ).map(claim=>{
    const value=claim.value as Record<string,unknown>;
    const families=value.families as string[];
    assert(Array.isArray(families)&&families.length>=1&&
      families.every(x=>FAMILY_MEMBERS[x]!==undefined) &&
      new Set(families).size===families.length &&
      value.specificPartnerAuthorized===false &&
      value.partnerAttributePredictionAuthorized===false &&
      value.marriageOutcomeAuthorized===false &&
      value.breakupOutcomeAuthorized===false &&
      value.infidelityInferenceAuthorized===false &&
      value.futureTimingAuthorized===false &&
      value.compatibilityAuthorized===false &&
      value.numericScoringAuthorized===false,
    'rule exceeded general interpersonal authority');
    const ref=claim.ruleRefs[0];
    const rule=registry.rules.find(x=>x.ruleId===ref?.ruleId &&
      x.version===ref.version &&
      x.output.claimType===claim.claimType &&
      x.methodologyRef.id===claim.methodologyRef.id&&x.status==='research');
    const evalRef=execution.evaluations.find(x=>x.evaluationId===ref?.evaluationId);
    const upstream=claim.upstreamClaimRefs.map(id=>
      execution.claims.find(c=>c.claimId===id));
    assert(rule&&claim.ruleRefs.length===1&&evalRef?.status==='matched'&&
      evalRef.emittedClaimIds.includes(claim.claimId)&&
      upstream.length===families.length&&
      upstream.every(x=>x&&x.state==='active'&&x.snapshotId===snapshot.snapshotId &&
        x.taxonomy.tier==='T5'&&x.claimType.startsWith('TEN_GOD_FAMILY_'))&&
      rule.inputs.length===families.length &&
      claim.sourceRefs.length>0 &&
      claim.sourceRefs.every(x=>registry.sources.some(src=>src.sourceId===x)),
    'original selected relationship T8 Rule/Evaluation/Source chain missing');
    const positions=(['year','month','day','hour'] as const)
      .flatMap(slot=>(['stem','branch'] as const).flatMap(channel=>{
        if(slot==='day'&&channel==='stem')return [];
        const observed=tenGods.value[slot][channel];
        if(observed?.status!=='resolved')return [];
        const family=families.find(name=>FAMILY_MEMBERS[name]!.some(god=>god===observed.value));
        return family?[{family,display:slot+' '+channel+' '+observed.value,
          factPath:'derivedFacts.tenGods.value.'+slot+'.'+channel+'.value'}]:[];
      }));
    assert(families.every(x=>positions.some(pos=>pos.family===x)),
      'active source-owned relationship family not observed in this chart');
    return {
      claimId:claim.claimId,claimType:claim.claimType,ruleId:rule.ruleId,
      sourceIds:[...claim.sourceRefs],families:[...families],
      observedPositions:positions.map(x=>x.display),
      observedFactPaths:positions.map(x=>x.factPath),
      paragraph:'명식에서 '+positions.map(x=>x.display).join(' · ')+
        '에 관한 고전 기반 일반 대인관계 연구 관점을 확인했습니다. '+
        '의사소통·관계의 경계·상호성에 관한 제한적 관점이며 '+
        '배우자 특성·궁합·결혼·이별·상대방 행동의 결과를 판정하지 않습니다.',
      generalInterpersonalScopeOnly:true as const,
      authorizesSpouseOrCompatibilityOutcome:false as const,
      replacesMultifactorCore:false as const,
    };
  });
}
