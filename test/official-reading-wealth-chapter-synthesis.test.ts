import { describe, expect, it } from 'vitest';
import {
  composeOfficialWealthNatalChaptersV1,
  OFFICIAL_WEALTH_CHAPTER_SYNTHESIS_VERSION_V1,
} from '../src/reading/official-reading-wealth-chapter-synthesis.js';
import type {
  CanonicalReadingSemanticBundleV1,
  CanonicalReadingSemanticUnitV1,
} from '../src/reading/canonical-reading-semantics.js';
import type { ExplainabilityIndex, ReadingSectionView } from '../src/contracts/reading.js';

const kinds = ['value_creation','spending','management','friction'] as const;
function unit(kind: typeof kinds[number], index: number): CanonicalReadingSemanticUnitV1 {
  return {
    unitId: 'unit-'+index, role:'primary', claimId:'claim-'+index,
    taxonomy: { tier:'T8', category:'wealth', subcategory:kind },
    claimType:'WEALTH_NATAL_CONCLUSION_TEST_'+index,
    subject:'natal_chart',predicate:'wealth_conclusion',semanticKey:'wealth_'+kind,
    canonicalText:{headline:'실제 고객에게 보여 줄 관점 '+index,summary:'기존 승인 해석 문장 '+index},
    semanticPayload:{wealthKind:kind,families:['wealth','officer']},
    methodologyRef:{id:'method',version:'1'},ruleRefs:[],
    factRefs:['fact-'+index],upstreamClaimRefs:['upstream-'+index],
    researchEvidenceRefs:[],sourceRefs:['source-'+index],relationRefs:[],
    prohibitedExtensions:[],
  } as unknown as CanonicalReadingSemanticUnitV1;
}
function context(input: { kinds: readonly (typeof kinds[number])[]; domain?:string; contradict?:boolean; scenario?:boolean }) {
  const units = input.kinds.map((kind,i)=>unit(kind,i));
  if(input.scenario) units[0] = {...units[0]!,scenarioRef:'alternative'};
  const bundle = {
    intent:{domain:input.domain??'wealth',temporalScope:'natal'},
    targetClaimIds:units.map(u=>u.claimId),
    units,
    claimRelations:input.contradict&&units.length>=2
      ? [{relation:'contradicts',fromClaimId:units[0]!.claimId,toClaimId:units[1]!.claimId}]
      : [],
  } as unknown as CanonicalReadingSemanticBundleV1;
  const explainability:ExplainabilityIndex={entries:units.map((u,i)=>({
    explainabilityRef:'explain-'+i,
    primaryUnitRefs:[u.unitId],
    claimIds:[u.claimId],factRefs:u.factRefs,
    methodologyIds:['method@1'],sourceIds:u.sourceRefs,
  }))};
  const sections:ReadingSectionView[]=[{
    sectionId:'official-existing-section',sectionType:'wealth',
    title:'돈·자원',state:'complete',explainabilityRefs:units.map((_,i)=>'explain-'+i),
    blocks:[{type:'insights',items:units.map(u=>({headline:u.canonicalText?.headline,summary:u.canonicalText?.summary}))}],
  },{sectionId:'limits',sectionType:'structure',title:'해석 범위',state:'complete',
    blocks:[{type:'paragraph',text:'현재 근거 범위에서는 미래 재물 사건을 확정하지 않습니다.'}],
  }];
  return {bundle,explainability,sections};
}
describe('official Wealth natal chapter synthesis',()=>{
 it('composes grounded multi-claim opening and practical cross-reading questions',()=>{
  const input=context({kinds:['value_creation','management','friction']});
  const result=composeOfficialWealthNatalChaptersV1(input);
  expect(OFFICIAL_WEALTH_CHAPTER_SYNTHESIS_VERSION_V1).toContain('synthesis');
  expect(result).toHaveLength(input.sections.length+2);
  expect(result[0]?.title).toContain('재물운');
  expect(result[0]?.explainabilityRefs).toEqual(['explain-0','explain-1','explain-2']);
  expect(result[0]?.blocks[1]?.type).toBe('key_points');
  expect(result.at(-1)).toBe(input.sections.at(-1));
  const questions=result.at(-2)?.blocks.find(b=>b.type==='key_points');
  expect(questions?.type).toBe('key_points');
  if(questions?.type==='key_points') {
    expect(questions.items.length).toBeGreaterThanOrEqual(2);
    expect(questions.items.every(t=>t.includes('?')||t.includes('까요?'))).toBe(true);
    expect(questions.items.every(t=>!t.includes('예측'))).toBe(true);
  }
  expect(result[1]).toBe(input.sections[0]);
  expect(composeOfficialWealthNatalChaptersV1(input)).toEqual(result);
 });
 it('keeps actual meaning and provenance when only one kind is supported',()=>{
  const input=context({kinds:['management']});
  expect(composeOfficialWealthNatalChaptersV1(input)).toBe(input.sections);
 });
 it('does not turn unresolved or contradictory claims into a synthetic conclusion',()=>{
  const uncertain=context({kinds:['spending','management'],scenario:true});
  expect(composeOfficialWealthNatalChaptersV1(uncertain)).toBe(uncertain.sections);
  const contradictory=context({kinds:['value_creation','spending'],contradict:true});
  expect(composeOfficialWealthNatalChaptersV1(contradictory)).toBe(contradictory.sections);
 });
 it('does not affect another domain',()=>{
  const input=context({kinds:['spending','management'],domain:'career'});
  expect(composeOfficialWealthNatalChaptersV1(input)).toBe(input.sections);
 });
});
