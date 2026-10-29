import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createMyeonghwaProductHostServer } from '../src/host/http-server.js';
import { createApprovedSourceProofPreviewDependenciesV1 } from '../src/preview/preview-product-host.js';
import type { ProductReadingResponse } from '../src/reading/product-reading-response.js';

// The same API -> governed engine -> public response path as the browser.
// These tests do not assert that missing semantics have become available.
describe('actual product host request-scoped missing evidence', () => {
  let server: Server;
  let base: string;
  beforeAll(async () => {
    const now = new Date('2026-10-29T00:00:00.000Z');
    server = createMyeonghwaProductHostServer({
      ...createApprovedSourceProofPreviewDependenciesV1(now),
      requestNowFactory: () => now,
    });
    await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve));
    base = 'http://127.0.0.1:' + (server.address() as AddressInfo).port;
  });
  afterAll(async () => {
    await new Promise<void>(resolve => server.close(() => resolve()));
  });
  async function request(text: string, date = '1990-05-15', time: string | null = '14:30') {
    const result = await fetch(base + '/api/readings', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ birth: { calendarType: 'solar', date, time, sex: 'unspecified' },
        reading: { text } }),
    });
    expect(result.status).toBe(200);
    return await result.json() as ProductReadingResponse;
  }

  it.each([
    ['부모운', '부모와의 관계를 직접 해석할 근거'],
    ['자녀운', '자녀와의 관계를 직접 해석할 근거'],
    ['올해', '해당 연도의 흐름을 해석할 근거'],
    ['이번 달', '해당 월의 흐름을 해석할 근거'],
    ['삶의 단계', '삶의 시기별 변화를 해석할 근거'],
  ])('keeps %s evidence separate in the real API', async (text, expected) => {
    for (const date of ['1990-05-15', '1998-08-18']) {
      const response = await request(text, date);
      expect(response.state).toBe('insufficient_evidence');
      expect(response.coverage?.explanation).toContain(expected);
      expect(response.coverage?.hasAvailableEvidence).toBe(false);
      expect(response.reading).toBeUndefined();
      expect(response.requestContext?.requestedText).toBe(text);
      expect(JSON.stringify(response)).not.toContain('_CLAIM_REQUIRED');
    }
  });

  it.each([
    ['질문: 지금 이직해야 할까요?', '현재 역할과 비교할 선택지'],
    ['질문: 내년 창업하면 성공할까요?', '조회할 연도·월'],
    ['질문: 어머니와 대화를 어떻게 해야 할까요?', '부모·자녀 중 누구와의 관계'],
    ['질문: 그 사람과 궁합이 좋을까요?', '상대방의 출생정보'],
  ])('preserves an open question without inheriting natal evidence: %s', async (text, expected) => {
    const response = await request(text, '1998-08-18', null);
    expect(response.state).toBe('insufficient_evidence');
    expect(response.requestContext?.intent.domain).toBe('question_specific');
    expect(response.requestContext?.requestedText).toBe(text);
    expect(response.coverage?.guidance?.join(' ')).toContain(expected);
    expect(response.reading).toBeUndefined();
    expect(JSON.stringify(response)).not.toContain('T11');
  });
});
