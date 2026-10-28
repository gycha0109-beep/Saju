import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { buildReadingArtifactShell } from '../src/reading/reading-artifact-shell.js';
import {
  NATAL_FIVE_DOMAIN_PRODUCT_ORDER,
  assembleNatalFiveDomainProductResponses,
} from '../src/reading/natal-five-domain-product-service.js';
import {
  PRODUCT_READING_RESPONSE_VERSION,
  type ProductReadingResponse,
} from '../src/reading/product-reading-response.js';

const NOW = new Date('2026-10-28T00:00:00.000Z');

function snapshot() {
  return calculateCanonicalSajuSnapshot({
    calendarType: 'solar',
    date: { year: 1990, month: 5, day: 15 },
    time: { known: true, hour: 14, minute: 30 },
    sexForTraditionalCalculation: 'unspecified',
  }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
}

type Subject = ReturnType<typeof snapshot>;
type Topic = typeof NATAL_FIVE_DOMAIN_PRODUCT_ORDER[number];

function delivered(chart: Subject, topic: Topic, index: number): ProductReadingResponse {
  return {
    responseId: 'reading-response-' + index,
    responseVersion: PRODUCT_READING_RESPONSE_VERSION,
    state: 'delivered',
    messageCode: 'READING_DELIVERED',
    requiredAction: 'none',
    requestContext: {
      requestedText: topic.requestText,
      intent: {
        domain: topic.domain,
        temporalScope: 'natal',
        ...(topic.domain === 'relationship' ? { relationshipScope: 'general' as const } : {}),
      },
      calculationSex: chart.input.sexForTraditionalCalculation ?? 'unspecified',
    },
    reading: {
      readingId: 'reading-' + index,
      ...buildReadingArtifactShell(chart),
      sections: [{
        sectionType: 'overview',
        title: '주제별 출처 기반 풀이',
        blocks: [{ type: 'paragraph', text: topic.title + '에 대한 기존 승인 문장' }],
        state: 'complete',
      }],
      disclosures: [],
      generatedAt: NOW.toISOString(),
    },
  };
}

function five(chart: Subject): ProductReadingResponse[] {
  return NATAL_FIVE_DOMAIN_PRODUCT_ORDER.map((topic, index) =>
    delivered(chart, topic, index));
}

describe('five-topic natal delivery remains subject- and intent-bound (all equal menus)', () => {
  it('groups five correctly identified source readings, without creating cross-domain interpretation', () => {
    const chart = snapshot();
    const result = assembleNatalFiveDomainProductResponses(chart, five(chart));
    expect(result.deliveryState).toBe('all_delivered');
    expect(result.deliveredDomainCount).toBe(5);
    expect(result.domains.map(domain => domain.domain))
      .toEqual(NATAL_FIVE_DOMAIN_PRODUCT_ORDER.map(topic => topic.domain));
    result.domains.forEach((item, index) => {
      expect(item.response.requestContext?.requestedText)
        .toBe(NATAL_FIVE_DOMAIN_PRODUCT_ORDER[index]!.requestText);
      expect(item.response.reading?.subject.birthInputDisplay.date).toBe('1990-05-15');
    });
  });

  it('rejects a swapped topic even if both have the same birth and delivery state', () => {
    const chart = snapshot();
    const rows = five(chart);
    [rows[0], rows[2]] = [rows[2]!, rows[0]!];
    expect(() => assembleNatalFiveDomainProductResponses(chart, rows))
      .toThrow('different requested reading intent');
  });

  it('rejects changed birth or changed calculation sex without guessing missing time', () => {
    const chart = snapshot();
    const wrongSex = five(chart);
    wrongSex[1] = {
      ...wrongSex[1]!,
      requestContext: { ...wrongSex[1]!.requestContext!, calculationSex: 'male' },
    };
    expect(() => assembleNatalFiveDomainProductResponses(chart, wrongSex))
      .toThrow('different requested reading intent');

    const wrongBirth = five(chart);
    wrongBirth[4] = {
      ...wrongBirth[4]!,
      reading: {
        ...wrongBirth[4]!.reading!,
        subject: {
          ...wrongBirth[4]!.reading!.subject,
          birthInputDisplay: {
            ...wrongBirth[4]!.reading!.subject.birthInputDisplay,
            date: '1991-05-15',
          },
        },
      },
    };
    expect(() => assembleNatalFiveDomainProductResponses(chart, wrongBirth))
      .toThrow('different birth input');
  });

  it('does not count a delivered reading without a resolved intent as valid', () => {
    const chart = snapshot();
    const missing = five(chart);
    const stripped = { ...missing[3]! };
    delete stripped.requestContext;
    missing[3] = stripped;
    expect(() => assembleNatalFiveDomainProductResponses(chart, missing))
      .toThrow('requires source-bound topic and person');
  });

  it('keeps an evidence-insufficient topic unavailable without inventing a response context', () => {
    const chart = snapshot();
    const responses = five(chart);
    responses[2] = {
      responseId: 'no-wealth-evidence',
      responseVersion: PRODUCT_READING_RESPONSE_VERSION,
      state: 'insufficient_evidence',
      messageCode: 'READING_EVIDENCE_INSUFFICIENT',
      requiredAction: 'none',
    };
    const result = assembleNatalFiveDomainProductResponses(chart, responses);
    expect(result.deliveryState).toBe('some_delivered');
    expect(result.deliveredDomainCount).toBe(4);
    expect(result.domains[2]?.response.reading).toBeUndefined();
  });

  it('does not allow a blocked response to carry a transported reading', () => {
    const chart = snapshot();
    const rows = five(chart);
    rows[0] = {
      ...rows[0]!,
      state: 'insufficient_evidence',
      messageCode: 'READING_EVIDENCE_INSUFFICIENT',
    };
    expect(() => assembleNatalFiveDomainProductResponses(chart, rows))
      .toThrow('cannot show a reading from a blocked response');
  });
});
