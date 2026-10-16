import { describe, expect, it } from 'vitest';
import type { CanonicalSajuSnapshot } from '../src/contracts/calculation.js';
import type { ProductReadingResponse } from '../src/reading/product-reading-response.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../src/production/production-calculation-runtime.js';
import { buildNatalStructuralEvidence } from '../src/preview/natal-structural-evidence.js';
import { buildNatalN16GroundedReaderBrief } from '../src/preview/natal-grounded-reader-brief.js';

const now = new Date('2026-10-16T00:00:00.000Z');
function actualSnapshot(known = true): CanonicalSajuSnapshot {
  return calculateAuthorizedMyeonghwaProductionSnapshot({
    calendarType: 'solar',
    date: {year:2024, month:3, day:10},
    time: known ? {known:true,hour:12,minute:30} : {known:false},
    sexForTraditionalCalculation: 'unspecified',
  },{now}).snapshot;
}
function delivered(
  snapshot:CanonicalSajuSnapshot, id:string, texts:readonly string[],
):ProductReadingResponse {
  const evidence=buildNatalStructuralEvidence(snapshot);
  return {
    responseId:id,responseVersion:'test-only',state:'delivered',
    messageCode:'READING_DELIVERED',requiredAction:'none',
    reading:{
      readingId:'reading-'+id,
      brand:{brandId:'myeonghwa',displayName:'명화'},
      subject:{
        birthInputDisplay:{calendarType:'solar',date:'2024-03-10',timeKnown:true,time:'12:30'},
        calculationState:'resolved',
      },
      calculationSummary:{
        pillars:Object.fromEntries(evidence.pillars.map(p=>[p.slot,
          {label:p.slot,value:p.label,status:p.state}])) as NonNullable<ProductReadingResponse['reading']>['calculationSummary']['pillars'],
      },
      sections:[
        {sectionType:'overview',title:'주요 해석',state:'complete',
          blocks:[...texts.map(text=>({type:'paragraph' as const,text})),
            {type:'fact_table' as const,rows:[{label:'일주',value:'계산 사실'}]}]},
        {sectionType:'custom',title:'해석 범위',state:'complete',blocks:[
          {type:'paragraph',text:'이 문장은 개인별 해석이 아닌 제한 안내입니다.'},
        ]},
      ],
      disclosures:[{type:'scope_limitation',text:'개인의 미래를 단정하지 않습니다.'}],
      generatedAt:now.toISOString(),
    },
  };
}
describe('N16 five-domain grounded reader brief',()=>{
  it('uses only real bounded responses, deduplicates exact repeated text and preserves every source',()=>{
    const snap=actualSnapshot();
    const a=delivered(snap,'general-a',['두 영역이 공유하는 실제 설명','일반 해석만의 설명']);
    const b=delivered(snap,'career-b',['두 영역이 공유하는 실제 설명','직업 해석만의 설명']);
    const result=buildNatalN16GroundedReaderBrief(snap,[
      {domain:'general',response:a},{domain:'career',response:b},
    ]);
    expect(result).toMatchObject({
      lifecycle:'internal_preview_only',
      snapshotId:snap.snapshotId,
      calculationHash:snap.calculationHash,
      mayPublish:false,maySell:false,mayGenerateInterpretation:false,
      totalOriginalTextUnitCount:4,
      exactRepeatedTextCount:1,
      crossDomainRepeatedUnitCount:1,
      uniqueTextUnitCount:3,
    });
    expect(result.context.some(s=>s.title==='명식의 기준' && s.factPaths.length>=2)).toBe(true);
    expect(result.context.some(s=>s.title==='명식에서 계산된 십신 위치')).toBe(true);
    const shared=result.readingUnits.find(x=>x.text==='두 영역이 공유하는 실제 설명');
    expect(shared?.sources.map(x=>x.domain)).toEqual(['general','career']);
    expect(shared?.appearingInDomains).toEqual(['general','career']);
    expect(shared?.crossDomainRepeated).toBe(true);
    expect(shared?.sources.every(x=>x.sectionTitle==='주요 해석')).toBe(true);
    expect(result.readingUnits.some(x=>x.text.includes('제한 안내'))).toBe(false);
    expect(result.domains.find(x=>x.domain==='general')?.disclosures)
      .toEqual(['개인의 미래를 단정하지 않습니다.']);
    expect(result.domains.find(x=>x.domain==='wealth')?.readingAvailable).toBe(false);
    expect(result.readingUnits.every(x=>x.newlyInferredMeaning===false)).toBe(true);
    expect(buildNatalN16GroundedReaderBrief(snap,[
      {domain:'general',response:a},{domain:'career',response:b},
    ])).toEqual(result);
  });

  it('rejects a wrong person even when the returned Four Pillars appear to match',()=>{
    const snap=actualSnapshot();
    const a=delivered(snap,'general-a',['정상 문장']);
    const wrong={
      ...a,
      reading:{
        ...a.reading!,
        subject:{
          ...a.reading!.subject,
          birthInputDisplay:{...a.reading!.subject.birthInputDisplay,date:'2024-03-11'},
        },
      },
    };
    expect(()=>buildNatalN16GroundedReaderBrief(snap,[
      {domain:'general',response:wrong},
    ])).toThrow(/subject differs/u);
    const wrongPillar={
      ...a,
      reading:{
        ...a.reading!,
        calculationSummary:{
          pillars:{
            ...a.reading!.calculationSummary.pillars,
            day:{label:'일주',value:'잘못 계산된 값',status:'resolved' as const},
          },
        },
      },
    };
    expect(()=>buildNatalN16GroundedReaderBrief(snap,[
      {domain:'general',response:wrongPillar},
    ])).toThrow(/chart mismatch/u);
  });

  it('preserves the unknown-hour partial response without manufacturing interpretations',()=>{
    const snap=actualSnapshot(false);
    const partial:ProductReadingResponse={
      responseId:'unknown-hour',responseVersion:'test-only',
      state:'partial_evidence',messageCode:'READING_EVIDENCE_PARTIAL',
      requiredAction:'provide_required_context',
      coverage:{state:'partial',hasAvailableEvidence:true,missingRequirementCount:1},
    };
    const result=buildNatalN16GroundedReaderBrief(snap,[
      {domain:'general',response:partial},
    ]);
    expect(result.birthTimeKnown).toBe(false);
    expect(result.uniqueTextUnitCount).toBe(0);
    expect(result.domains.find(d=>d.domain==='general'))
      .toMatchObject({responseState:'partial_evidence',readingAvailable:false,unitIds:[]});
    expect(result.context.map(x=>x.text).join(' ')).not.toContain('시주 ');
  });
});
