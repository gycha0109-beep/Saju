import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  NATAL_READER_REVIEW_CASES,
  renderNatalReaderReviewPacketV1,
} from './natal-reader-review-packet.mjs';

function corpus() {
  const entries = NATAL_READER_REVIEW_CASES.map(({caseId}) => {
    const missing = caseId.startsWith('unknown-time-');
    return {
      caseId,
      response: {
        state: missing ? 'partial_evidence' : 'delivered',
        ...(missing ? {} : {
          reading: {
            calculationSummary: {
              pillars: {
                year: {status:'resolved',value:'test <year>'},
                month: {status:'resolved',value:'test'},
                day: {status:'resolved',value:'test'},
                hour: {status:'resolved',value:'test'},
              },
            },
            sections: [{
              title: '주요 해석',
              state: 'complete',
              blocks: [{ type:'paragraph', text: '원본 HTTP 문장 <unsafe> & 결과' }],
            }],
            disclosures: [{type:'scope_limitation', text:'판단 <금지>'}],
          },
        }),
      },
    };
  });
  for (let i=0;i<25;i++) entries.push({caseId:'filler-'+i,response:{state:'delivered'}});
  return entries;
}

test('N11 reviewer HTML preserves exactly ten real case identities, safely escapes body, leaves evaluation blank', () => {
  const report = renderNatalReaderReviewPacketV1(corpus());
  assert.equal((report.match(/class="review-case"/gu) ?? []).length, 10);
  assert.equal((report.match(/사람 검수 기록 — 미완료/gu) ?? []).length, 10);
  assert.match(report, /원본 HTTP 문장 &lt;unsafe&gt; &amp; 결과/u);
  assert.match(report, /test &lt;year&gt;/u);
  assert.match(report, /판단 &lt;금지&gt;/u);
  assert.ok(!report.includes('<unsafe>'));
  assert.ok(!report.includes('<script'));
  assert.match(report, /출생시각 미상 및 부분 응답 A/u);
  assert.match(report, /사람 검수 미완료/u);
  assert.equal(renderNatalReaderReviewPacketV1(corpus()), report);
});

test('N11 fails closed on missing, duplicated or altered representative HTTP responses', () => {
  const first = corpus();
  assert.throws(() => renderNatalReaderReviewPacketV1(first.slice(1)), /missing actual consumer response/u);
  assert.throws(() => renderNatalReaderReviewPacketV1([...first, first[0]]), /duplicate audit case ID/u);
  const states = corpus();
  states[0].response.state = 'partial_evidence';
  assert.throws(() => renderNatalReaderReviewPacketV1(states), /response states changed/u);
  assert.throws(() => renderNatalReaderReviewPacketV1(corpus().slice(0,10)), /at least 30/u);
});
