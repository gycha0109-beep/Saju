import { describe, expect, it } from 'vitest';
import type { CanonicalSajuSnapshot } from '../src/contracts/calculation.js';
import type { ProductReadingResponse } from '../src/reading/product-reading-response.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../src/production/production-calculation-runtime.js';
import { buildNatalStructuralEvidence } from '../src/preview/natal-structural-evidence.js';
import { buildNatalN21ReaderFirstStory } from '../src/preview/natal-reader-first-story.js';
import { attachGeneralNatalCalculatedContext } from '../src/preview/general-natal-consumer-fact-context.js';
import { attachGeneralNatalCalculatedRoleObservation } from '../src/preview/general-natal-consumer-role-observation.js';
import type { NatalSynthesisDomain } from '../src/preview/natal-synthesis-preview.js';

const now = new Date('2026-10-16T00:00:00.000Z');

function chart(day: number, timeKnown = true): CanonicalSajuSnapshot {
  return calculateAuthorizedMyeonghwaProductionSnapshot({
    calendarType: 'solar',
    date: {year:2024,month:3,day},
    time: timeKnown ? {known:true,hour:12,minute:30} : {known:false},
    sexForTraditionalCalculation:'unspecified',
  }, {now}).snapshot;
}

function boundedResponse(
  snapshot: CanonicalSajuSnapshot,
  id: string,
  texts: readonly string[],
): ProductReadingResponse {
  const facts = buildNatalStructuralEvidence(snapshot);
  const {year,month,day} = snapshot.input.date;
  return {
    responseId:id,responseVersion:'test-only',state:'delivered',
    messageCode:'READING_DELIVERED',requiredAction:'none',
    reading: {
      readingId:'reading-'+id,
      brand:{brandId:'myeonghwa',displayName:'명화'},
      subject: {
        birthInputDisplay: {
          calendarType:'solar',
          date:[year,String(month).padStart(2,'0'),String(day).padStart(2,'0')].join('-'),
          timeKnown:true,time:'12:30',
        },
        calculationState:'resolved',
      },
      calculationSummary: {
        pillars:Object.fromEntries(facts.pillars.map(p=>[
          p.slot,{label:p.slot,value:p.label,status:p.state},
        ])) as NonNullable<ProductReadingResponse['reading']>['calculationSummary']['pillars'],
      },
      sections: [
        {sectionType:'overview',title:'주요 해석',state:'complete',
          blocks:texts.map(text=>({type:'paragraph' as const,text}))},
        {sectionType:'custom',title:'해석 범위',state:'complete',
          blocks:[{type:'paragraph',text:'미래를 단정하지 않습니다.'}]},
      ],
      disclosures:[],
      generatedAt:now.toISOString(),
    },
  };
}

describe('N21 readable source-owned natal storyline',()=>{
  it('shows the existing bounded paragraphs exactly once across five domains, in reader order',()=>{
    const snapshot=chart(10);
    const same='여러 분야에서 실제로 전달한 같은 풀이';
    const sourceTexts: readonly [NatalSynthesisDomain,readonly string[]][]=[
      ['general',[same,'원래 전체 풀이','추가 전체 풀이','긴 전체 설명']],
      ['career',[same,'직업 분야 본문']],
      ['wealth',['재물 분야 본문']],
      ['business',['사업 분야 본문']],
      ['relationship',['관계 분야 본문']],
    ];
    const sources=sourceTexts.map(([domain,texts])=>({
      domain,response:boundedResponse(snapshot,domain,texts),
    }));
    const result=buildNatalN21ReaderFirstStory(snapshot,sources);
    expect(result).toMatchObject({
      lifecycle:'internal_preview_only',readingState:'has_bounded_reading',
      snapshotId:snapshot.snapshotId,mayPublish:false,maySell:false,
      meaningDifferentiationProven:false,createsNewInterpretation:false,
      hiddenDuplicateCount:1,displayedOriginalInterpretationCount:7,
    });
    expect(result.sections.map(s=>s.domain)).toEqual([
      'general','career','wealth','business','relationship',
    ]);
    expect(result.sections[0]?.excerpts.map(x=>x.text)).toEqual([
      same,'원래 전체 풀이','추가 전체 풀이',
    ]);
    expect(result.sections[0]?.remainingOriginalInterpretationCount).toBe(1);
    expect(result.sections[1]?.excerpts.map(x=>x.text)).toEqual(['직업 분야 본문']);
    expect(result.sections[1]?.sharedEarlier).toEqual([{
      unitId:result.sections[0]?.excerpts[0]?.unitId,
      alreadyShownIn:'general',
    }]);
    expect(result.sections.every(s=>s.excerpts.every(x=>
      x.interpretationNewlyInferred===false &&
      x.provenance.length>0 &&
      x.provenance.every(p=>p.domain===s.domain)
    ))).toBe(true);
    expect(result.sections.flatMap(s=>s.excerpts).map(x=>x.text)).not.toContain('미래를 단정하지 않습니다.');
    expect(buildNatalN21ReaderFirstStory(snapshot,[...sources].reverse())).toEqual(result);
  });

  it('separates actual N5/N7 calculated facts from the only interpretive text',()=>{
    const snapshot=chart(10);
    const plain=boundedResponse(snapshot,'general',['한정된 전체 풀이']);
    const full=attachGeneralNatalCalculatedRoleObservation(
      attachGeneralNatalCalculatedContext(plain),snapshot);
    const r=buildNatalN21ReaderFirstStory(snapshot,[{domain:'general',response:full}]);
    expect(r.calculationFactsExcludedFromInterpretation).toBe(2);
    expect(r.sections[0]?.excerpts.map(x=>x.text)).toEqual(['한정된 전체 풀이']);
    expect(r.sections[0]?.calculatedExplanationCount).toBe(2);
    expect(r.factualBasis.length).toBeGreaterThan(0);
    expect(r.factualBasis.every(x=>x.factPaths.length>0)).toBe(true);
    const other=chart(11);
    const r2=buildNatalN21ReaderFirstStory(other,[{
      domain:'general',
      response:attachGeneralNatalCalculatedRoleObservation(
        attachGeneralNatalCalculatedContext(boundedResponse(other,'general-other',['한정된 전체 풀이'])),
        other),
    }]);
    expect(r.previewMeaningFingerprint).toBe(r2.previewMeaningFingerprint);
    expect(r.calculationHash).not.toBe(r2.calculationHash);
    expect(r.meaningDifferentiationProven).toBe(false);
  });

  it('does not fill an unknown-hour partial response or repeat absent text',()=>{
    const snapshot=chart(10,false);
    const partial: ProductReadingResponse={
      responseId:'partial',responseVersion:'test-only',state:'partial_evidence',
      messageCode:'READING_EVIDENCE_PARTIAL',requiredAction:'provide_required_context',
      coverage:{state:'partial',hasAvailableEvidence:true,missingRequirementCount:1},
    };
    const result=buildNatalN21ReaderFirstStory(snapshot,[
      {domain:'general',response:partial},
    ]);
    expect(result.birthTimeKnown).toBe(false);
    expect(result.readingState).toBe('no_bounded_reading');
    expect(result.displayedOriginalInterpretationCount).toBe(0);
    expect(result.sections[0]).toMatchObject({
      responseState:'partial_evidence',hasInterpretation:false,excerpts:[],
    });
    expect(result.factualBasis.map(x=>x.text).join(' ')).not.toContain('시주 ');
  });

  it('fails closed for a mismatched chart and a forged N5 calculated passage',()=>{
    const snapshot=chart(10),other=chart(11);
    expect(()=>buildNatalN21ReaderFirstStory(other,[{
      domain:'general',response:boundedResponse(snapshot,'wrong',['기존 풀이']),
    }])).toThrow(/subject differs|chart mismatch/u);
    expect(()=>buildNatalN21ReaderFirstStory(snapshot,[{
      domain:'general',response:boundedResponse(snapshot,'spoof',[
        '이 사주풀이가 실제로 참조한 명식은 성공을 보장합니다.',
      ]),
    }])).toThrow(/unrecognized N5/u);
  });
});
