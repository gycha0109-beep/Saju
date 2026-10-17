import { describe, expect, it } from 'vitest';
import type { CanonicalSajuSnapshot } from '../src/contracts/calculation.js';
import type { ProductReadingResponse } from '../src/reading/product-reading-response.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../src/production/production-calculation-runtime.js';
import { buildNatalStructuralEvidence } from '../src/preview/natal-structural-evidence.js';
import { buildNatalN21ReaderFirstStory } from '../src/preview/natal-reader-first-story.js';
import { buildNatalN16GroundedReaderBrief } from '../src/preview/natal-grounded-reader-brief.js';
import { buildNatalN24ExpandedSourceReading } from '../src/preview/natal-expanded-source-reading.js';
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
      hiddenDuplicateCount:0,displayedOriginalInterpretationCount:8,
      displayedDomainDistinctiveCount:7,displayedCrossDomainSharedCount:1,
    });
    expect(result.sections.map(s=>s.domain)).toEqual([
      'general','career','wealth','business','relationship',
    ]);
    expect(result.sections[0]?.excerpts.map(x=>x.text)).toEqual([
      '원래 전체 풀이','추가 전체 풀이','긴 전체 설명',
    ]);
    expect(result.sections[0]?.remainingOriginalInterpretationCount).toBe(1);
    expect(result.sections[1]?.excerpts.map(x=>x.text)).toEqual(['직업 분야 본문',same]);
    expect(result.sections[1]?.excerpts.map(x=>x.selectionBasis))
      .toEqual(['domain_distinctive','cross_domain_shared']);
    expect(result.sections[1]?.sharedEarlier).toEqual([]);
    expect(result.sections.every(s=>s.excerpts.every(x=>
      x.interpretationNewlyInferred===false &&
      x.provenance.length>0 &&
      x.provenance.every(p=>p.domain===s.domain)
    ))).toBe(true);
    expect(result.sections.flatMap(s=>s.excerpts).map(x=>x.text)).not.toContain('미래를 단정하지 않습니다.');
    expect(buildNatalN21ReaderFirstStory(snapshot,[...sources].reverse())).toEqual(result);
  });

  it('prioritizes the actual unique career reading even if common copy fills the first slots',()=>{
    const snap=chart(10);
    const shared='여러 분야에서 공유한 원래 풀이';
    const sources=[
      {domain:'general' as const,response:boundedResponse(snap,'g',[
        shared,'일반만의 원래 풀이','일반 추가 해석',
      ])},
      {domain:'career' as const,response:boundedResponse(snap,'c',[
        shared,'직업만의 첫 번째 해석','직업만의 두 번째 해석','직업만의 세 번째 해석',
      ])},
      {domain:'wealth' as const,response:boundedResponse(snap,'w',[
        shared,'재물만의 실제 해석',
      ])},
    ];
    const first=buildNatalN21ReaderFirstStory(snap,sources);
    expect(first.sections[0]?.excerpts.map((x)=>x.text))
      .toEqual(['일반만의 원래 풀이','일반 추가 해석',shared]);
    expect(first.sections[1]?.excerpts.map((x)=>x.text)).toEqual([
      '직업만의 첫 번째 해석','직업만의 두 번째 해석','직업만의 세 번째 해석',
    ]);
    expect(first.sections[1]?.sharedEarlier).toEqual([{
      unitId:first.sections[0]?.excerpts[2]?.unitId,alreadyShownIn:'general',
    }]);
    expect(first.sections[1]?.displayedDomainDistinctiveCount).toBe(3);
    expect(first.sections[1]?.displayedCrossDomainSharedCount).toBe(0);
    expect(first.sections[2]?.excerpts.map(x=>x.text)).toEqual(['재물만의 실제 해석']);
    expect(first.hiddenDuplicateCount).toBe(2);
    expect(first.displayedDomainDistinctiveCount).toBe(6);
    expect(first.displayedCrossDomainSharedCount).toBe(1);
    expect(first.createsNewInterpretation).toBe(false);
    expect(first.meaningDifferentiationProven).toBe(false);
    expect(buildNatalN21ReaderFirstStory(snap,[...sources].reverse())).toEqual(first);
  });

  it('does not call an exclusive paragraph more important or generate missing meaning',()=>{
    const snap=chart(10);
    const source={domain:'general' as const,response:boundedResponse(snap,'g',[
      '기존 첫 번째 해석','기존 두 번째 해석','기존 세 번째 해석','기존 네 번째 해석',
    ])};
    const result=buildNatalN21ReaderFirstStory(snap,[source]);
    expect(result.sections[0]?.excerpts.map(x=>x.text)).toEqual([
      '기존 첫 번째 해석','기존 두 번째 해석','기존 세 번째 해석',
    ]);
    expect(result.sections[0]?.remainingOriginalInterpretationCount).toBe(1);
    expect(result.sections[0]?.excerpts.every(x=>x.selectionBasis==='domain_distinctive')).toBe(true);
    expect(result.sections[1]?.hasInterpretation).toBe(false);
    expect(result.displayedDomainDistinctiveCount).toBe(3);
    expect(result.displayedCrossDomainSharedCount).toBe(0);
    expect(result.previewMeaningFingerprint).toBe(buildNatalN21ReaderFirstStory(snap,[source]).previewMeaningFingerprint);
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

  it('N30a rejects a hidden canonical pillar or a delivered domain missing its reading',()=>{
    const snapshot=chart(10);
    const original=boundedResponse(snapshot,'career-parity',['실제 직업 영역 풀이']);
    const concealed=structuredClone(original);
    if (!concealed.reading) throw new Error('missing original');
    concealed.reading.calculationSummary.pillars.month={
      label:concealed.reading.calculationSummary.pillars.month.label,
      status:'unavailable',
    };
    expect(()=>buildNatalN21ReaderFirstStory(snapshot,[{
      domain:'career',response:concealed,
    }])).toThrow(/N30 resolved canonical pillar hidden or changed: month/u);

    const noReading=structuredClone(original);
    delete noReading.reading;
    expect(()=>buildNatalN21ReaderFirstStory(snapshot,[{
      domain:'career',response:noReading,
    }])).toThrow(/N30 delivered domain has no Product reading/u);
    expect(buildNatalN21ReaderFirstStory(snapshot,[{
      domain:'career',response:original,
    }]).sections[1]?.excerpts.map(x=>x.text)).toEqual(['실제 직업 영역 풀이']);
  });

  it('N30a rejects forged birth time on an unknown-hour reading',()=>{
    const snapshot=chart(10,false);
    const forged=boundedResponse(snapshot,'unknown-hour',['기존 제한 풀이']);
    if (!forged.reading) throw new Error('missing original');
    forged.reading.subject.birthInputDisplay.timeKnown=false;
    expect(()=>buildNatalN21ReaderFirstStory(snapshot,[{
      domain:'general',response:forged,
    }])).toThrow(/N30 unknown birth hour unexpectedly displayed/u);
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

describe('N24 complete source-owned domain reading', () => {
  it('keeps every actual bounded paragraph readable once, preserves source and N23 meaning fingerprint', () => {
    const snapshot = chart(10);
    const common = '명식에서 실제 전달된 공통 문구';
    const sources = [
      {domain:'general' as const,response:boundedResponse(snapshot,'general-deep',[
        common,'전체 사주 원문 1','전체 사주 원문 2','전체 사주 원문 3','전체 사주 원문 4',
      ])},
      {domain:'career' as const,response:boundedResponse(snapshot,'career-deep',[
        common,'직업 원문 1','직업 원문 2','직업 원문 3','직업 원문 4',
      ])},
      {domain:'wealth' as const,response:boundedResponse(snapshot,'wealth-deep',[
        common,'재물 원문 1','재물 원문 2',
      ])},
      {domain:'business' as const,response:boundedResponse(snapshot,'business-deep',['사업 원문'])},
      {domain:'relationship' as const,response:boundedResponse(snapshot,'relationship-deep',['관계 원문'])},
    ];
    const brief = buildNatalN16GroundedReaderBrief(snapshot,sources);
    const first = buildNatalN21ReaderFirstStory(snapshot,sources);
    const actual = buildNatalN24ExpandedSourceReading(brief,first);
    const combined = [
      ...first.sections.flatMap((d) => d.excerpts),
      ...actual.sections.flatMap((d) => d.additionalOriginalExcerpts),
    ];
    expect(combined.length).toBe(brief.interpretationTextUnitCount);
    expect(new Set(combined.map((p) => p.unitId)).size).toBe(combined.length);
    expect(new Set(combined.map((p) => p.text))).toEqual(new Set([
      common,'전체 사주 원문 1','전체 사주 원문 2','전체 사주 원문 3','전체 사주 원문 4',
      '직업 원문 1','직업 원문 2','직업 원문 3','직업 원문 4',
      '재물 원문 1','재물 원문 2','사업 원문','관계 원문',
    ]));
    expect(actual.additionalOriginalCount).toBeGreaterThan(0);
    expect(actual.originalLeftUnreadCount).toBe(0);
    expect(actual.previewMeaningFingerprint).toBe(first.previewMeaningFingerprint);
    expect(actual.sections.find((d) => d.domain === 'career')?.additionalOriginalExcerpts
      .some((p) => p.text === '직업 원문 4')).toBe(true);
    expect(combined.every((p) => p.provenance.length > 0 &&
      !p.interpretationNewlyInferred &&
      brief.readingUnits.some((u) => u.unitId === p.unitId &&
        u.text === p.text && u.kind === 'existing_preview_interpretation'))).toBe(true);
    expect(actual).toMatchObject({
      lifecycle:'internal_preview_only',createsNewInterpretation:false,
      meaningDifferentiationProven:false,mayPublish:false,maySell:false,
    });
    expect(buildNatalN24ExpandedSourceReading(
      buildNatalN16GroundedReaderBrief(snapshot,[...sources].reverse()),
      buildNatalN21ReaderFirstStory(snapshot,[...sources].reverse()),
    )).toEqual(actual);
  });

  it('does not count calculated N5/N7 prose or forge an interpretation for unknown-time readings', () => {
    const snapshot = chart(10);
    const source = {
      domain:'general' as const,
      response:attachGeneralNatalCalculatedRoleObservation(
        attachGeneralNatalCalculatedContext(
          boundedResponse(snapshot,'calculated-plus-original',[
            '실제로 허용된 기존 원문 1','실제로 허용된 기존 원문 2',
            '실제로 허용된 기존 원문 3','실제로 허용된 기존 원문 4',
          ])),
        snapshot),
    };
    const brief=buildNatalN16GroundedReaderBrief(snapshot,[source]);
    const first=buildNatalN21ReaderFirstStory(snapshot,[source]);
    const expanded=buildNatalN24ExpandedSourceReading(brief,first);
    expect(expanded.excludedCalculatedTextUnits).toBe(2);
    expect(expanded.firstScreenOriginalCount).toBe(3);
    expect(expanded.additionalOriginalCount).toBe(1);
    expect(expanded.sections[0]?.additionalOriginalExcerpts[0]?.text)
      .toBe('실제로 허용된 기존 원문 4');

    const unknown = chart(10,false);
    const partial: ProductReadingResponse={
      responseId:'missing-hour',responseVersion:'test-only',state:'partial_evidence',
      messageCode:'READING_EVIDENCE_PARTIAL',requiredAction:'provide_required_context',
      coverage:{state:'partial',hasAvailableEvidence:true,missingRequirementCount:1},
    };
    const unknownSources=[{domain:'general' as const,response:partial}];
    const result=buildNatalN24ExpandedSourceReading(
      buildNatalN16GroundedReaderBrief(unknown,unknownSources),
      buildNatalN21ReaderFirstStory(unknown,unknownSources),
    );
    expect(result.totalDistinctOriginalCount).toBe(0);
    expect(result.additionalOriginalCount).toBe(0);
    expect(result.originalLeftUnreadCount).toBe(0);
  });

  it('rejects mismatched source identity or tampered first-screen original text', () => {
    const snapshot=chart(10);
    const sources=[{domain:'general' as const,
      response:boundedResponse(snapshot,'auth',['원문 1','원문 2','원문 3','원문 4'])}];
    const brief=buildNatalN16GroundedReaderBrief(snapshot,sources);
    const story=buildNatalN21ReaderFirstStory(snapshot,sources);
    const badStory={...story,sections:story.sections.map((section,i)=>i===0
      ? {...section,excerpts:section.excerpts.map((x,j)=>j===0
        ? {...x,text:'변조된 문구'} : x)}
      : section)};
    expect(()=>buildNatalN24ExpandedSourceReading(brief,badStory)).toThrow(/unproven|repeated/u);
    const another=chart(11);
    expect(()=>buildNatalN24ExpandedSourceReading(
      buildNatalN16GroundedReaderBrief(another,[]),story)).toThrow(/exact internal canonical/u);
  });
});
