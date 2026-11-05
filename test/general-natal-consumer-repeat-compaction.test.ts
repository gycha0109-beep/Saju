import { describe, expect, it } from 'vitest';
import type { ProductReadingResponse } from '../src/reading/product-reading-response.js';
import { createGeneralNatalIntegratedPreviewProductHost } from '../src/host/general-natal-integrated-preview-host.js';
import { compactGeneralNatalConsumerRepeatedInsights } from '../src/preview/general-natal-consumer-repeat-compaction.js';

function sample(): ProductReadingResponse {
  return {
    responseId: 'preview-response-1',
    responseVersion: 'preview-response-test',
    state: 'delivered',
    messageCode: 'READING_DELIVERED',
    requiredAction: 'none',
    reading: {
      readingId: 'official-preview-1',
      brand: { brandId: 'myeonghwa', displayName: '명화' },
      subject: {
        birthInputDisplay: {
          calendarType: 'solar', date: '1984-01-07', time: '00:30', timeKnown: true,
        },
        calculationState: 'resolved',
      },
      calculationSummary: {
        pillars: {
          year: { label: '연주', status: 'resolved', value: '계해' },
          month: { label: '월주', status: 'resolved', value: '을축' },
          day: { label: '일주', status: 'resolved', value: '경자' },
          hour: { label: '시주', status: 'resolved', value: '병자' },
        },
      },
      sections: [
        {
          title: '주요 해석',
          sectionType: 'overview',
          state: 'complete',
          blocks: [
            { type: 'key_points', items: ['같은 문장', '같은 문장', '다른 의미', '같은 문장'] },
            { type: 'key_points', items: ['같은 문장', '별개의 관측 설명'] },
            { type: 'paragraph', text: '계산에서 확인한 십신 위치: 관측' },
            {
              type: 'comparison',
              title: '다른 해석 비교',
              perspectives: [
                { label: 'A', text: '같은 문장' },
                { label: 'B', text: '같은 문장' },
              ],
            },
            { type: 'ambiguity', summary: '미상 시나리오', scenarios: [{ label: 'A', text: '같은 문장' }] },
          ],
        },
        {
          title: '해석 범위',
          sectionType: 'custom',
          state: 'complete',
          blocks: [{ type: 'key_points', items: ['같은 문장', '같은 문장'] }],
        },
      ],
      disclosures: [{ type: 'scope_limitation', text: '변경해서는 안 되는 고지' }],
      generatedAt: '2026-10-15T00:00:00.000Z',
    },
  };
}

describe('N9 General Natal exact-repeat consumer presentation', () => {
  it('removes only exact same-block repeats, never inventing semantic context', () => {
    const input = sample();
    const compact = compactGeneralNatalConsumerRepeatedInsights(input);
    const main = compact.reading?.sections[0]?.blocks;
    expect(main?.[0]).toEqual({ type: 'key_points', items: ['같은 문장', '다른 의미'] });
    expect(main?.[1]).toEqual(input.reading?.sections[0]?.blocks[1]);
    expect(main?.slice(2)).toEqual(input.reading?.sections[0]?.blocks.slice(2));
    expect(compact.reading?.sections[1]).toEqual(input.reading?.sections[1]);
    expect(compact.reading?.disclosures).toEqual(input.reading?.disclosures);
    expect(compact.reading?.calculationSummary).toEqual(input.reading?.calculationSummary);
    expect(compact.responseId).toBe(input.responseId);
    expect(compact.reading?.readingId).toBe(input.reading?.readingId);
    expect(compactGeneralNatalConsumerRepeatedInsights(compact)).toBe(compact);
  });

  it('keeps meaningfully different qualifiers and blocked responses untouched', () => {
    const input = sample();
    const altered: ProductReadingResponse = {
      ...input, reading: {
        ...input.reading!,
        sections: [{
          ...input.reading!.sections[0]!,
          blocks: [{ type: 'key_points', items: ['같은 제목\\n조건 A', '같은 제목\\n조건 B'] }],
        }],
      },
    };
    expect(compactGeneralNatalConsumerRepeatedInsights(altered)).toBe(altered);
    const blocked: ProductReadingResponse = { ...input, state: 'partial_evidence' };
    expect(compactGeneralNatalConsumerRepeatedInsights(blocked)).toBe(blocked);
  });

  it('improves actual birth-input consumer copy without changing fact observations', async () => {
    const host = createGeneralNatalIntegratedPreviewProductHost({
      requestNowFactory: () => new Date('2026-10-15T00:00:00.000Z'),
    });
    const response = await host.requestReading({
      birth: {
        calendarType: 'solar', date: '1984-01-07', time: '00:30', sex: 'unspecified',
      },
      reading: { text: '사주' },
    });
    expect(response.state).toBe('delivered');
    const keypointBlocks = response.reading?.sections
      .filter((section) => section.title === '주요 해석')
      .flatMap((section) => section.blocks)
      .filter((block) => block.type === 'key_points') ?? [];
    expect(keypointBlocks.length).toBeGreaterThan(0);
    for (const block of keypointBlocks) {
      if (block.type === 'key_points') {
        expect(new Set(block.items).size).toBe(block.items.length);
      }
    }
    expect(JSON.stringify(response.reading)).toContain('계산에서 확인한 십신 위치');
    expect(JSON.stringify(response.reading)).toContain('이 사주풀이가 실제로 참조한 명식은');
  });
});
