import { describe, expect, it } from 'vitest';
import {
  CONSUMER_READING_REQUEST_ADAPTER_VERSION,
  normalizeConsumerReadingRequest,
} from '../src/index.js';

const REFERENCE_DATE_TIME = '2026-09-19T00:00:00.000Z';

describe('MyeongHa product-button consumer grammar contract', () => {
  it.each([
    ['전체 사주', 'general', 'natal'],
    ['직업운', 'career', 'natal'],
    ['재물운', 'wealth', 'natal'],
    ['연애운', 'relationship', 'natal'],
    ['사업운', 'business', 'natal'],
    ['부모운', 'family', 'natal'],
    ['자녀운', 'family', 'natal'],
    ['인생 흐름', 'life_stage', 'life_stage'],
    ['배우자운', 'relationship', 'natal'],
  ] as const)(
    'keeps MyeongHa button phrase %s resolved by the frozen consumer adapter',
    (text, domain, temporalScope) => {
      const result = normalizeConsumerReadingRequest({
        requestId: `myeongha-button-${domain}-${temporalScope}-${text}`,
        text,
      });

      expect(result.adapterVersion).toBe(CONSUMER_READING_REQUEST_ADAPTER_VERSION);
      expect(result.state).toBe('resolved');
      expect(result.request?.intent.domain).toBe(domain);
      expect(result.request?.intent.temporalScope).toBe(temporalScope);
      expect(result.profileAuthorizationRef).toBeDefined();
    },
  );

  it.each([
    ['올해 운세', 'general', 'annual'],
    ['이번 달 운세', 'general', 'monthly'],
    ['올해 직업운', 'career', 'annual'],
    ['이번 달 재물운', 'wealth', 'monthly'],
    ['올해 사업운', 'business', 'annual'],
  ] as const)(
    'keeps temporal MyeongHa button phrase %s resolved at a server-owned reference instant',
    (text, domain, temporalScope) => {
      const result = normalizeConsumerReadingRequest({
        requestId: `myeongha-temporal-${domain}-${temporalScope}`,
        text,
        referenceDateTime: REFERENCE_DATE_TIME,
      });

      expect(result.state).toBe('resolved');
      expect(result.request?.intent.domain).toBe(domain);
      expect(result.request?.intent.temporalScope).toBe(temporalScope);
      expect(result.request?.targetPeriod?.scope).toBe(temporalScope);
      expect(result.profileAuthorizationRef).toBeDefined();
    },
  );

  it('keeps compatibility explicit and target-bound', () => {
    const result = normalizeConsumerReadingRequest({
      requestId: 'myeongha-compatibility',
      text: '궁합',
      targetPersonRef: 'target-person-ref-1',
    });

    expect(result.state).toBe('resolved');
    expect(result.request?.intent).toEqual({
      domain: 'compatibility',
      temporalScope: 'natal',
    });
    expect(result.request?.targetPersonRef).toBe('target-person-ref-1');
    expect(result.profileAuthorizationRef).toBeDefined();
  });

  it('keeps question-specific intent explicit instead of promoting arbitrary free text', () => {
    const result = normalizeConsumerReadingRequest({
      requestId: 'myeongha-question-specific',
      text: '질문: 이직해도 될까요?',
    });

    expect(result.state).toBe('resolved');
    expect(result.request?.intent).toEqual({
      domain: 'question_specific',
      temporalScope: 'natal',
    });
    expect(result.request?.question).toBe('이직해도 될까요');
    expect(result.profileAuthorizationRef).toBeDefined();
  });
});
