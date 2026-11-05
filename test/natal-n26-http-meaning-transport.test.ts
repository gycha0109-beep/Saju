import { describe, expect, it } from 'vitest';
import type { ProductReadingResponse } from '../src/reading/product-reading-response.js';
import { auditNatalN26HttpMeaningTransport } from '../src/preview/natal-n26-http-meaning-transport.js';

function response(readingId: string, texts: string[]): ProductReadingResponse {
  return {
    responseId: 'response-' + readingId,
    responseVersion: 'test',
    state: 'delivered',
    messageCode: 'READING_DELIVERED',
    requiredAction: 'none',
    reading: {
      readingId,
      brand: {brandId: 'myeonghwa', displayName: '명화'},
      subject: {
        birthInputDisplay: {calendarType: 'solar', date: '1984-01-07', time: '12:30', timeKnown: true},
        calculationState: 'resolved',
      },
      calculationSummary: {pillars: {
        year: {label:'연주',status:'resolved',value:'계해'},
        month: {label:'월주',status:'resolved',value:'을축'},
        day: {label:'일주',status:'resolved',value:'경자'},
        hour: {label:'시주',status:'resolved',value:'임오'},
      }},
      sections: [{
        title:'주요 해석', sectionType:'overview', state:'complete',
        blocks:[{type:'key_points',items:texts}],
      }],
      disclosures:[], generatedAt:'2026-10-15T00:00:00.000Z',
    },
  };
}

describe('N26 same-birth independent internal-to-real-HTTP semantic copy transport', () => {
  it('accepts only the existing N9 exact same-block compaction and never requires matching IDs', () => {
    const internal = response('internal', ['동일 해석', '동일 해석', '별개 의미']);
    const http = response('http-different-id', ['동일 해석', '별개 의미']);
    const r=auditNatalN26HttpMeaningTransport({caseId:'c1',internalProduct:internal,realHttpProduct:http});
    expect(r).toMatchObject({
      exactAfterPermittedN9Compaction:true, compactedLiteralDuplicateCount:1,
      mismatchedSectionIndices:[], readingIdentityAssertedSame:false,
      semanticDifferentiationProven:false, mayPublish:false, maySell:false,
    });
  });
  it('detects unapproved interpretation mutation or loss, rather than declaring parity', () => {
    const a=response('internal',['근거 문장','서로 다른 의미']);
    const b=response('http',['근거 문장','변형된 의미']);
    expect(auditNatalN26HttpMeaningTransport({
      caseId:'mutation',internalProduct:a,realHttpProduct:b,
    })).toMatchObject({exactAfterPermittedN9Compaction:false,mismatchedSectionIndices:[0]});
  });
  it('fails closed for a different chart, uncertain time or malformed factual marker', () => {
    const a=response('a',['풀이']);
    const b=response('b',['풀이']);
    const moved: ProductReadingResponse={...b,reading:{
      ...b.reading!,subject:{...b.reading!.subject,
        birthInputDisplay:{...b.reading!.subject.birthInputDisplay,time:'19:30'}},
    }};
    expect(()=>auditNatalN26HttpMeaningTransport({
      caseId:'x',internalProduct:a,realHttpProduct:moved,
    })).toThrow(/birth charts/);
    const invalid: ProductReadingResponse={...b,reading:{...b.reading!,sections:[{
      ...b.reading!.sections[0]!,
      blocks:[{type:'paragraph',text:'계산에서 확인한 십신 위치: 임의로 만들어낸 결과'}],
    }]}};
    expect(()=>auditNatalN26HttpMeaningTransport({
      caseId:'x',internalProduct:a,realHttpProduct:invalid,
    })).toThrow(/unexpected semantic text/);
  });
});
