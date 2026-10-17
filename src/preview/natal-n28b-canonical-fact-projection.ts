import type { CanonicalSajuSnapshot, PillarSlot, TenGod } from '../contracts/calculation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { OfficialReadingSemanticProjectionInputV1, OfficialReadingSemanticProjectionV1 } from
  '../reading/official-reading-semantic-projection.js';
import type { CanonicalReadingSemanticQualifierBindingV1 } from
  '../reading/canonical-reading-semantics.js';
import { GENERAL_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1 } from
  '../reading/official-reading-detailed-presentation-general.js';
import { buildPreviewSemanticTextBindingsV1 } from './preview-semantic-text-projection.js';
import { buildPreviewSemanticQualifierBindingsV1 } from './preview-semantic-qualifier-projection.js';

export const NATAL_N28B_AUTONOMOUS_FACT_QUALIFIER_VERSION =
  'saju-natal-n28b-canonical-calculated-tengod-qualifier-v1' as const;

/** Explicit nonexpert, observation-only provenance; NEVER a Bridge TrustGrant. */
export const N28B_AUTONOMOUS_CALCULATED_FACT_SCOPE = Object.freeze({
  admissionId: 'auto-natal-n28b-calculated-fact-only-v1',
  admissionRegistryVersion: NATAL_N28B_AUTONOMOUS_FACT_QUALIFIER_VERSION,
  researchId: 'AUTO-NATAL-EXACT-TENGOD-OBSERVATION',
  researchVersion: '1.0.0',
  authorityState: 'automated_calculated_fact_preview_only_no_independent_review',
});
const SLOTS=['hour','month','year','day'] as const satisfies readonly PillarSlot[];
const LABELS:Readonly<Record<PillarSlot,string>>={hour:'시주',month:'월주',year:'연주',day:'일주'};
const FAMILIES:Readonly<Record<string,readonly TenGod[]>>={
  PEER:['비견','겁재'],RESOURCE:['편인','정인'],OUTPUT:['식신','상관'],
  WEALTH:['편재','정재'],OFFICER:['편관','정관'],
};
const THEME=/^GENERAL_NATAL_(PEER|RESOURCE|OUTPUT|WEALTH|OFFICER)_(VISIBLE_STEMS|BRANCHES)_THEME$/u;

export function buildNatalN28bCanonicalCalculatedFactProjection(
  input:OfficialReadingSemanticProjectionInputV1,
  snapshot:CanonicalSajuSnapshot,
):OfficialReadingSemanticProjectionV1 {
  const existing:OfficialReadingSemanticProjectionV1={
    semanticTextBindings:buildPreviewSemanticTextBindingsV1(input),
    semanticQualifierBindings:buildPreviewSemanticQualifierBindingsV1(input),
  };
  if(input.intent.domain!=='general'||input.intent.temporalScope!=='natal') return existing;
  if(snapshot.snapshotId!==input.evidence.snapshotId){
    throw new TypeError('N28b canonical fact qualifier received another chart.');
  }
  if(!snapshot.completeness.birthTimeKnown ||
    snapshot.derivedFacts.tenGods.status!=='resolved') return existing;
  if(input.registry.pack.status!=='research'){
    throw new TypeError('N28b autonomous qualifier is research-Preview-only.');
  }
  const facts=snapshot.derivedFacts.tenGods.value;
  const targetIds=new Set(input.targetClaimIds);
  const profiles=new Map(GENERAL_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1
    .filter(profile=>THEME.test(profile.claimType))
    .map(profile=>[profile.claimType,profile]));
  const autonomous:CanonicalReadingSemanticQualifierBindingV1[]=[];
  const seen=new Set<string>();
  for(const claim of input.evidence.claims){
    if(!targetIds.has(claim.claimId)||claim.taxonomy.tier!=='T8' ||
      claim.taxonomy.category!=='general') continue;
    const match=THEME.exec(claim.claimType);
    if(!match)continue;
    if(seen.has(claim.claimId))throw new TypeError('N28b duplicate target Claim.');
    seen.add(claim.claimId);
    const profile=profiles.get(claim.claimType),family=FAMILIES[match[1]!];
    if(!profile||!family||claim.methodologyRef.id!==profile.methodologyRef.id||
      claim.methodologyRef.version!==profile.methodologyRef.version||
      claim.sourceRefs.length===0||claim.ruleRefs.length===0){
      throw new TypeError('N28b source/method/Claim mismatch: '+claim.claimType);
    }
    const stem=match[2]==='VISIBLE_STEMS';
    const positions=SLOTS.flatMap(slot=>{
      const fact=facts[slot][stem?'stem':'branch'];
      return fact?.status==='resolved'&&family.includes(fact.value as TenGod)
        ? [`${LABELS[slot]} ${stem?'천간':'지지 대표 십신'} ${fact.value}`]
        : [];
    });
    if(positions.length===0)throw new TypeError('N28b active T8 without matching resolved position.');
    autonomous.push({
      targetClaimId:claim.claimId,
      qualifier:{
        qualifierId:'n28b_observation_'+deterministicContentHash({
          claimId:claim.claimId,chart:snapshot.calculationHash,
          positions,
        }).slice(0,24),
        kind:'qualifier',
        semanticScope:'general:natal:calculated_tengod_observation_only',
        semanticKeys:['observedTenGodPosition',claim.claimType],
        canonicalText:{
          summary:`이 원국에서 확인한 십신 위치: ${positions.join(' · ')}. 해당 위치는 계산 사실이며, 이것만으로 성격·직업·재물 결과를 예측하지 않습니다.`,
        },
        prohibitedExtensions:[
          'automaticHumanOutcomeInference','unreviewedWealthLossInference',
          'inventedCausalRelationship',
        ],
        provenance:{...N28B_AUTONOMOUS_CALCULATED_FACT_SCOPE},
      },
    });
  }
  return {
    semanticTextBindings:existing.semanticTextBindings,
    semanticQualifierBindings:[
      ...existing.semanticQualifierBindings,...autonomous,
    ].sort((a,b)=>a.targetClaimId.localeCompare(b.targetClaimId)||
      a.qualifier.qualifierId.localeCompare(b.qualifier.qualifierId)),
  };
}
