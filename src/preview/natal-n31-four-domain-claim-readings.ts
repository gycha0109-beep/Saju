import type { CanonicalSajuSnapshot, PillarSlot, TenGod } from '../contracts/calculation.js';
import type { InterpretationClaim, RuleDefinition } from '../contracts/interpretation.js';
import type { ClaimNarrativeProfile } from '../contracts/narrative.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import { deterministicContentHash, type ResolvedRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import { CAREER_NATAL_CLAIM_NARRATIVE_PROFILES } from '../research/career-natal-narrative-profiles.js';
import { WEALTH_NATAL_CLAIM_NARRATIVE_PROFILES } from '../research/wealth-natal-narrative-profiles.js';
import { BUSINESS_NATAL_CLAIM_NARRATIVE_PROFILES } from '../research/business-natal-narrative-profiles.js';
import { RELATIONSHIP_NATAL_CLAIM_NARRATIVE_PROFILES } from '../research/relationship-natal-narrative-profiles.js';

export const NATAL_N31_DOMAIN_CLAIM_READING_VERSION =
  'saju-n31-four-domain-real-t8-research-claims-v1' as const;

const DOMAINS = ['career','wealth','business','relationship'] as const;
export type NatalN31Domain = typeof DOMAINS[number];
const SLOT_ORDER=['year','month','day','hour'] as const satisfies readonly PillarSlot[];
const LABEL:Readonly<Record<PillarSlot,string>>={
  year:'연주',month:'월주',day:'일주',hour:'시주',
};
const FAMILY:Readonly<Record<string,readonly TenGod[]>>={
  peer:['비견','겁재'],resource:['편인','정인'],output:['식신','상관'],
  wealth:['편재','정재'],officer:['편관','정관'],
};
const PROFILE_MAP=new Map(
  [...CAREER_NATAL_CLAIM_NARRATIVE_PROFILES,
   ...WEALTH_NATAL_CLAIM_NARRATIVE_PROFILES,
   ...BUSINESS_NATAL_CLAIM_NARRATIVE_PROFILES,
   ...RELATIONSHIP_NATAL_CLAIM_NARRATIVE_PROFILES]
    .map(p=>[p.claimType,p]),
);

export interface NatalN31DomainClaim {
  claimId:string;
  claimType:string;
  headline:string;
  summary:string;
  /** Exact observed Ten-God subtype/position; observation, not causal proof. */
  calculatedPositions:readonly string[];
  claimRuleId:string;
  methodologyId:string;
  sourceIds:readonly string[];
  researchOnly:true;
  predictsOutcome:false;
}
export interface NatalN31DomainSection {
  domain:NatalN31Domain;
  state:'bounded_research_claims'|'no_qualified_research_claims'|'birth_time_unknown';
  visibleClaims:readonly NatalN31DomainClaim[];
  eligibleClaimCount:number;
  heldConflictingClaimCount:number;
  hiddenByLimitCount:number;
}
function guard(condition:unknown,reason:string):asserts condition {
  if(!condition)throw new TypeError('N31 source-locked domain reading: '+reason);
}
function sameList(a:readonly string[],b:readonly string[]):boolean {
  return JSON.stringify([...new Set(a)].sort())===JSON.stringify([...new Set(b)].sort());
}
function textOf(profile:ClaimNarrativeProfile,key:'headline'|'summary'):string {
  const matching=profile.templates?.filter(t=>t.templateKey===key&&t.language==='ko')??[];
  guard(matching.length===1 && matching[0]!.text.trim().length>0,
    'original narrative copy missing or ambiguous: '+profile.claimType);
  return matching[0]!.text;
}
function findPositions(snapshot:CanonicalSajuSnapshot,value:Record<string,unknown>):readonly string[] {
  const resolved=snapshot.derivedFacts.tenGods;
  guard(resolved.status==='resolved','canonical Ten-God evidence unavailable');
  const tenGod=value.tenGod;
  const channel=value.channel;
  if(typeof tenGod==='string' && (channel==='visible_stems'||channel==='branches')){
    return SLOT_ORDER.flatMap(slot=>{
      if(slot==='day'&&channel==='visible_stems')return [];
      const fact=resolved.value[slot][channel==='visible_stems'?'stem':'branch'];
      return fact?.status==='resolved'&&fact.value===tenGod
        ? [LABEL[slot]+' '+(channel==='visible_stems'?'천간 ':'지지 대표 십신 ')+tenGod]
        : [];
    });
  }
  const families=value.families;
  guard(Array.isArray(families) && families.length>0 &&
    families.every(f=>typeof f==='string'&&FAMILY[f]!==undefined),
    'domain Claim missing registered family operands');
  const positions= SLOT_ORDER.flatMap(slot=>
    (['stem','branch'] as const).flatMap(component=>{
      if(slot==='day'&&component==='stem')return [];
      const fact=resolved.value[slot][component];
      if(fact?.status!=='resolved')return [];
      return families.some(f=>(FAMILY[f as string]??[]).includes(fact.value as TenGod))
        ? [LABEL[slot]+' '+(component==='stem'?'천간 ':'지지 대표 십신 ')+fact.value] : [];
    }),
  );
  return positions;
}
function exactClaim(
  snapshot:CanonicalSajuSnapshot,
  claim:InterpretationClaim,
  rule:RuleDefinition,
  registry:ResolvedRuleRegistrySnapshot,
):NatalN31DomainClaim {
  guard(claim.ruleRefs.length===1 && claim.ruleRefs[0]?.ruleId===rule.ruleId &&
    claim.ruleRefs[0]?.version===rule.version &&
    claim.methodologyRef.id===rule.methodologyRef.id &&
    claim.methodologyRef.version===rule.methodologyRef.version &&
    claim.claimType===rule.output.claimType &&
    claim.taxonomy.tier==='T8' && claim.taxonomy.category===rule.taxonomy.category &&
    claim.subject===rule.output.subject && claim.predicate===rule.output.predicate &&
    deterministicContentHash(claim.value)===deterministicContentHash(rule.output.value),
    'Claim is not byte-equivalent to the original T8 semantic rule');
  const sourceIds=rule.sourceRefs.map(s=>s.sourceId);
  guard(sourceIds.length>0 && claim.sourceRefs.length>0 &&
    sameList(sourceIds,claim.sourceRefs) &&
    sourceIds.every(id=>registry.sources.some(source=>source.sourceId===id)) &&
    rule.status==='research' && rule.quality.methodologyStability==='contested',
    'missing, unregistered, or silently promoted source authority');
  const profile=PROFILE_MAP.get(claim.claimType);
  guard(profile!==undefined && profile.allowedEpistemicTypes.includes('interpretation') &&
    profile.requiredMethodAttribution && profile.profileId.length>0,
    'missing exact source-owned Korean narrative profile');
  const value=claim.value;
  guard(value!==null&&typeof value==='object'&&!Array.isArray(value),
    'unrecognized existing conclusion value');
  const positions=findPositions(snapshot,value as Record<string,unknown>);
  guard(positions.length>0,'matched domain interpretation has no calculated operands');
  return {
    claimId:claim.claimId,claimType:claim.claimType,
    headline:textOf(profile,'headline'),summary:textOf(profile,'summary'),
    calculatedPositions:positions,claimRuleId:rule.ruleId,
    methodologyId:claim.methodologyRef.id,
    sourceIds:[...new Set(sourceIds)].sort(),
    researchOnly:true,predictsOutcome:false,
  };
}
/**
 * Surface *existing* natal research T8 texts for four independent domains,
 * tied to the same canonical chart, exact emitted rule, registered sources,
 * matching subtype/family operands and unmodified Korean narrative profiles.
 * This is NOT an Official/ProductReading semantic projection.
 */
export function buildNatalN31FourDomainClaimReadings(
  snapshot:CanonicalSajuSnapshot,
  interpretation:InterpretationExecutionResult,
  registry:ResolvedRuleRegistrySnapshot,
) {
  guard(interpretation.run.snapshotId===snapshot.snapshotId &&
    interpretation.integrity.valid && interpretation.run.status!=='failed' &&
    registry.pack.status==='research','not a valid same-chart research execution');
  const eligible=snapshot.completeness.birthTimeKnown &&
    snapshot.derivedFacts.tenGods.status==='resolved';
  const conflictIds=new Set(
    interpretation.claimRelations.filter(rel=>rel.relation==='contradicts')
      .flatMap(rel=>[rel.fromClaimId,rel.toClaimId]),
  );
  const sections:NatalN31DomainSection[]=DOMAINS.map(domain=>{
    if(!eligible)return {
      domain,state:'birth_time_unknown',visibleClaims:[],eligibleClaimCount:0,
      heldConflictingClaimCount:0,hiddenByLimitCount:0,
    };
    const candidates=interpretation.claims.filter(c=>c.state==='active' &&
      c.taxonomy.tier==='T8' && c.taxonomy.category===domain &&
      (domain==='career'
        ? (c.predicate==='career_conclusion'||c.predicate==='career_context')
        : c.predicate===domain+'_conclusion'),
    );
    let heldConflictingClaimCount=0;
    const qualified=candidates.flatMap(claim=>{
      if(conflictIds.has(claim.claimId)){heldConflictingClaimCount++;return [];}
      const ref=claim.ruleRefs[0];
      const rule=registry.rules.find(r=>r.ruleId===ref?.ruleId&&r.version===ref?.version);
      guard(rule!==undefined && rule.taxonomy.category===domain &&
        rule.ruleSetId.startsWith(domain+'-natal-'),
        'domain research claim not backed by exact specialist rule');
      return [exactClaim(snapshot,claim,rule,registry)];
    });
    // Direct career visible-stem claims first; 2-family claims first in
    // other domains. Neither order is a ranking of strength or real outcomes.
    qualified.sort((a,b)=>{
      const aDirect=a.claimType.endsWith('_VISIBLE_STEMS')?1:0;
      const bDirect=b.claimType.endsWith('_VISIBLE_STEMS')?1:0;
      return bDirect-aDirect || a.claimType.localeCompare(b.claimType);
    });
    const bounded=qualified.slice(0,3);
    return {domain,state:bounded.length>0?'bounded_research_claims':'no_qualified_research_claims',
      visibleClaims:bounded,eligibleClaimCount:qualified.length,
      heldConflictingClaimCount,hiddenByLimitCount:qualified.length-bounded.length};
  });
  return {
    version:NATAL_N31_DOMAIN_CLAIM_READING_VERSION,
    lifecycle:'internal_research_preview_only' as const,
    snapshotId:snapshot.snapshotId,calculationHash:snapshot.calculationHash,
    sections,domainCountWithOriginalResearchInterpretation:sections.filter(
      s=>s.visibleClaims.length>0).length,
    semanticFingerprint:deterministicContentHash(sections.map(s=>
      s.visibleClaims.map(x=>({id:x.claimType,summary:x.summary,positions:x.calculatedPositions})))),
    newSemanticRulesAdded:false as const,
    originalResearchRuleAndCopyVerified:true as const,
    crossDomainOutcomeInference:false as const,
    mayPublish:false as const,maySell:false as const,
    usefulComplete:false as const,
    limitations:[
      '네 분야의 현재 연구용 T8 기존 원문만 보여줍니다. 검증된 소비자·Production 운세 승인과 다릅니다.',
      '동일한 명식의 원래 십신 자리/하위유형을 계산 사실로 함께 표시하며, 사실과 성격·성과의 인과관계가 입증되었다는 뜻은 아닙니다.',
      '서로 충돌하는 Claim은 각각 보류합니다. 분야 간 하나의 길흉 결론으로 합성하지 않습니다.',
      '출생시각 미상이나 미확정 십신은 억지로 채우지 않습니다.',
    ],
  };
}
