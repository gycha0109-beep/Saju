import { describe, expect, it } from 'vitest';
import {
  CONSUMER_READING_REQUEST_ADAPTER_VERSION,
  normalizeConsumerReadingRequest,
} from '../src/index.js';

const SEOUL_YEAR_BOUNDARY_REFERENCE = '2026-12-31T15:30:00.000Z';

describe('consumer reading request adapter', () => {
  it('normalizes general natal requests through the authorized profile boundary', () => {
    const result = normalizeConsumerReadingRequest({
      requestId: 'general-1',
      text: '  일반   사주 봐주세요?  ',
    });

    expect(result.state).toBe('resolved');
    expect(result.adapterVersion).toBe(CONSUMER_READING_REQUEST_ADAPTER_VERSION);
    expect(result.normalizedText).toBe('일반 사주');
    expect(result.request?.intent).toEqual({ domain: 'general', temporalScope: 'natal' });
    expect(result.request?.targetPeriod).toBeUndefined();
    expect(result.profileRef?.id).toBe('myeonghwa-reading-profile-general-natal-v1');
    expect(result.profileAuthorizationRef).toBeDefined();
  });

  it('normalizes explicit parent, child, relationship and spouse consumer semantics without pillar heuristics', () => {
    const cases = [
      ['부모운', { domain: 'family', temporalScope: 'natal', relationshipScope: 'parents' }],
      ['자녀운', { domain: 'family', temporalScope: 'natal', relationshipScope: 'children' }],
      [
        '연애운',
        { domain: 'relationship', temporalScope: 'natal', relationshipScope: 'general' },
      ],
      [
        '배우자운',
        { domain: 'relationship', temporalScope: 'natal', relationshipScope: 'spouse' },
      ],
    ] as const;

    for (const [text, intent] of cases) {
      const result = normalizeConsumerReadingRequest({ requestId: `case-${text}`, text });
      expect(result.state).toBe('resolved');
      expect(result.request?.intent).toEqual(intent);
      expect(result.request?.targetPeriod).toBeUndefined();
      expect(result.profileAuthorizationRef).toBeDefined();
    }
  });

  it('binds annual and monthly relative periods to the Seoul calendar at the request reference instant', () => {
    const annualBusiness = normalizeConsumerReadingRequest({
      requestId: 'annual-business',
      text: '올해 사업운',
      referenceDateTime: SEOUL_YEAR_BOUNDARY_REFERENCE,
    });
    expect(annualBusiness.state).toBe('resolved');
    expect(annualBusiness.request?.intent).toEqual({
      domain: 'business',
      temporalScope: 'annual',
    });
    expect(annualBusiness.request?.targetPeriod).toEqual({
      scope: 'annual',
      year: 2027,
      timeZone: 'Asia/Seoul',
      referenceDateTime: SEOUL_YEAR_BOUNDARY_REFERENCE,
      resolution: 'relative_current',
    });

    const monthlyWealth = normalizeConsumerReadingRequest({
      requestId: 'monthly-wealth',
      text: '이번 달 재물운 알려줘',
      referenceDateTime: SEOUL_YEAR_BOUNDARY_REFERENCE,
    });
    expect(monthlyWealth.state).toBe('resolved');
    expect(monthlyWealth.request?.intent).toEqual({
      domain: 'wealth',
      temporalScope: 'monthly',
    });
    expect(monthlyWealth.request?.targetPeriod).toEqual({
      scope: 'monthly',
      year: 2027,
      month: 1,
      timeZone: 'Asia/Seoul',
      referenceDateTime: SEOUL_YEAR_BOUNDARY_REFERENCE,
      resolution: 'relative_current',
    });

    const annualGeneral = normalizeConsumerReadingRequest({
      requestId: 'annual',
      text: '연운',
      referenceDateTime: SEOUL_YEAR_BOUNDARY_REFERENCE,
    });
    const monthlyGeneral = normalizeConsumerReadingRequest({
      requestId: 'monthly',
      text: '월운',
      referenceDateTime: SEOUL_YEAR_BOUNDARY_REFERENCE,
    });
    expect(annualGeneral.request?.intent).toEqual({ domain: 'general', temporalScope: 'annual' });
    expect(annualGeneral.request?.targetPeriod?.scope).toBe('annual');
    expect(monthlyGeneral.request?.intent).toEqual({ domain: 'general', temporalScope: 'monthly' });
    expect(monthlyGeneral.request?.targetPeriod?.scope).toBe('monthly');
  });

  it('fails closed when a supported relative period has no valid request reference instant', () => {
    const missing = normalizeConsumerReadingRequest({
      requestId: 'annual-reference-missing',
      text: '올해 사업운',
    });
    expect(missing.state).toBe('invalid');
    expect(missing.reasonCodes).toEqual(['REFERENCE_DATETIME_REQUIRED_FOR_RELATIVE_PERIOD']);
    expect(missing.request).toBeUndefined();

    const invalid = normalizeConsumerReadingRequest({
      requestId: 'monthly-reference-invalid',
      text: '이번 달 재물운',
      referenceDateTime: 'not-a-date',
    });
    expect(invalid.state).toBe('invalid');
    expect(invalid.reasonCodes).toEqual(['REFERENCE_DATETIME_INVALID']);
    expect(invalid.request).toBeUndefined();
  });

  it('canonicalizes equivalent reference instants before target-period identity is built', () => {
    const first = normalizeConsumerReadingRequest({
      requestId: 'canonical-reference',
      text: '올해 사업운',
      referenceDateTime: '2026-09-03T21:00:00+09:00',
    });
    const second = normalizeConsumerReadingRequest({
      requestId: 'canonical-reference',
      text: '올해 사업운',
      referenceDateTime: '2026-09-03T12:00:00.000Z',
    });

    expect(first.state).toBe('resolved');
    expect(first.request?.targetPeriod).toEqual(second.request?.targetPeriod);
    expect(first.normalizationId).toBe(second.normalizationId);
  });

  it('changes the bound relative period when the Seoul calendar crosses the year boundary', () => {
    const before = normalizeConsumerReadingRequest({
      requestId: 'seoul-year-boundary',
      text: '올해 사업운',
      referenceDateTime: '2026-12-31T14:59:59.000Z',
    });
    const after = normalizeConsumerReadingRequest({
      requestId: 'seoul-year-boundary',
      text: '올해 사업운',
      referenceDateTime: '2026-12-31T15:00:00.000Z',
    });

    expect(before.request?.targetPeriod).toMatchObject({ scope: 'annual', year: 2026 });
    expect(after.request?.targetPeriod).toMatchObject({ scope: 'annual', year: 2027 });
    expect(before.normalizationId).not.toBe(after.normalizationId);
  });

  it('preserves ambiguity instead of choosing among multiple domains or temporal scopes', () => {
    const domains = normalizeConsumerReadingRequest({
      requestId: 'ambiguous-domains',
      text: '사업운 재물운',
    });
    expect(domains.state).toBe('ambiguous');
    expect(domains.reasonCodes).toEqual(['MULTIPLE_READING_DOMAINS_DETECTED']);
    expect(domains.request).toBeUndefined();
    expect(domains.candidateIntents).toHaveLength(2);

    const periods = normalizeConsumerReadingRequest({
      requestId: 'ambiguous-periods',
      text: '올해 이번 달 사업운',
    });
    expect(periods.state).toBe('ambiguous');
    expect(periods.reasonCodes).toEqual(['MULTIPLE_TEMPORAL_SCOPES_DETECTED']);
    expect(periods.request).toBeUndefined();
  });

  it('fails closed when a semantic combination has no authorized reading profile', () => {
    const result = normalizeConsumerReadingRequest({
      requestId: 'unsupported-period-spouse',
      text: '올해 배우자운',
    });

    expect(result.state).toBe('unsupported');
    expect(result.reasonCodes).toEqual(['READING_PROFILE_NOT_AVAILABLE_FOR_NORMALIZED_INTENT']);
    expect(result.request).toBeUndefined();
    expect(result.candidateIntents).toEqual([
      { domain: 'relationship', temporalScope: 'annual', relationshipScope: 'spouse' },
    ]);
  });

  it('requires explicit question mode and never promotes unknown free text to question-specific intent', () => {
    const question = normalizeConsumerReadingRequest({
      requestId: 'question-1',
      text: '질문: 지금 이직을 고민해도 될까?',
    });
    expect(question.state).toBe('resolved');
    expect(question.request?.intent).toEqual({
      domain: 'question_specific',
      temporalScope: 'natal',
    });
    expect(question.request?.targetPeriod).toBeUndefined();
    expect(question.request?.question).toBe('지금 이직을 고민해도 될까');

    const freeText = normalizeConsumerReadingRequest({
      requestId: 'free-text',
      text: '지금 이직을 고민해도 될까?',
    });
    expect(freeText.state).toBe('unsupported');
    expect(freeText.reasonCodes).toEqual(['CONSUMER_READING_PHRASE_NOT_IN_FROZEN_GRAMMAR']);
    expect(freeText.request).toBeUndefined();
  });

  it('requires compatibility target identity before producing a ReadingRequest', () => {
    const missing = normalizeConsumerReadingRequest({ requestId: 'compatibility-missing', text: '궁합' });
    expect(missing.state).toBe('invalid');
    expect(missing.reasonCodes).toEqual([
      'TARGET_PERSON_REFERENCE_REQUIRED_FOR_COMPATIBILITY_INTENT',
    ]);
    expect(missing.request).toBeUndefined();

    const resolved = normalizeConsumerReadingRequest({
      requestId: 'compatibility-resolved',
      text: '궁합 봐줘',
      targetPersonRef: 'person-2',
    });
    expect(resolved.state).toBe('resolved');
    expect(resolved.request?.intent).toEqual({ domain: 'compatibility', temporalScope: 'natal' });
    expect(resolved.request?.targetPersonRef).toBe('person-2');
  });

  it('is deterministic and cannot acquire interpretation, domain or research authority', () => {
    const input = {
      requestId: 'deterministic-business',
      text: '올해 사업운',
      referenceDateTime: '2026-09-03T12:00:00.000Z',
      outputPreferences: { preferredDetail: 'detailed' as const },
    };
    const first = normalizeConsumerReadingRequest(input);
    const second = normalizeConsumerReadingRequest(input);

    expect(first).toEqual(second);
    expect(first.normalizationId).toBe(second.normalizationId);
    expect(first.constraints).toEqual({
      mayUseLLMForIntentResolution: false,
      mayGenerateInterpretationClaims: false,
      mayAuthorizeDomainSemantics: false,
      mayPromoteResearchAuthority: false,
    });
  });
});
