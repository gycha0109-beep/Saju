import { describe, expect, it } from 'vitest';
import { createGeneralNatalIntegratedPreviewProductHost } from '../src/host/general-natal-integrated-preview-host.js';
import type { ProductReadingResponse } from '../src/reading/product-reading-response.js';
import {
  buildNatalMeaningQualityAudit,
} from '../src/preview/natal-meaning-quality-audit.js';
import {
  GENERAL_NATAL_CALCULATED_CONTEXT_PREFIX,
} from '../src/preview/general-natal-consumer-fact-context.js';

const host = createGeneralNatalIntegratedPreviewProductHost({
  requestNowFactory: () => new Date('2026-10-15T00:00:00.000Z'),
});

async function realReading(date: string, time: string | null): Promise<ProductReadingResponse> {
  return host.requestReading({
    birth: { calendarType: 'solar', date, time, sex: 'unspecified' },
    reading: { text: '사주' },
  });
}

describe('N6 semantic differentiation separate from calculated fact fingerprints', () => {
  it('detects a genuine repeated interpretation even when the delivered consumer prose is unique', async () => {
    const [early, evening, repeated, unknown] = await Promise.all([
      realReading('1984-01-07', '00:30'),
      realReading('1984-01-07', '19:30'),
      realReading('1984-01-07', '00:30'),
      realReading('1984-01-07', null),
    ]);
    expect(early.state).toBe('delivered');
    expect(evening.state).toBe('delivered');
    const inputs = [
      { caseId: 'a', birthLabel: '1984-01-07 00:30', response: early },
      { caseId: 'b', birthLabel: '1984-01-07 19:30', response: evening },
      { caseId: 'duplicate', birthLabel: '1984-01-07 00:30 again', response: repeated },
      { caseId: 'unknown-hour', birthLabel: '1984-01-07 unknown', response: unknown },
    ];
    const { consumer, meaning, quality } = buildNatalMeaningQualityAudit(inputs);
    expect(quality).toMatchObject({
      realConsumerCaseCount: 4,
      distinctDisplayedCharts: 2,
      consumerTextUnique: 2,
      meaningTextUnique: 1,
      actualRepeatedConsumerPairs: 0,
      repeatedMeaningPairs: 2,
      pairsSeparatedOnlyByCalculatedFacts: 2,
      semanticCompletionGranted: false,
      mayPublish: false,
      maySell: false,
    });
    expect(quality.factOnlySeparatedCasePairs).toEqual([
      { left: 'a', right: 'b' },
      { left: 'b', right: 'duplicate' },
    ]);
    expect(meaning.cases.find((item) => item.caseId === 'unknown-hour')
      ?.interpretationFingerprint).toBeUndefined();
    expect(consumer.cases.find((item) => item.caseId === 'a')?.interpretationFingerprint)
      .not.toBe(consumer.cases.find((item) => item.caseId === 'b')?.interpretationFingerprint);
    expect(meaning.cases.find((item) => item.caseId === 'a')?.interpretationFingerprint)
      .toBe(meaning.cases.find((item) => item.caseId === 'b')?.interpretationFingerprint);
  });

  it('cannot hide arbitrary interpretation or duplicated factual context behind a marker', async () => {
    const reading = await realReading('1984-01-07', '00:30');
    const target = reading.reading!.sections.findIndex((section) =>
      section.blocks.some((block) =>
        block.type === 'paragraph' &&
        block.text.startsWith(GENERAL_NATAL_CALCULATED_CONTEXT_PREFIX)));
    expect(target).toBeGreaterThanOrEqual(0);
    const section = reading.reading!.sections[target]!;
    const actual = section.blocks.find((block) =>
      block.type === 'paragraph' &&
      block.text.startsWith(GENERAL_NATAL_CALCULATED_CONTEXT_PREFIX));
    expect(actual).toBeDefined();
    const mutate = (extra: readonly typeof section.blocks[number][]) => ({
      ...reading,
      reading: {
        ...reading.reading!,
        sections: reading.reading!.sections.map((entry, i) =>
          i === target ? { ...entry, blocks: [...entry.blocks, ...extra] } : entry),
      },
    });
    expect(() => buildNatalMeaningQualityAudit([{
      caseId: 'twice', birthLabel: 'same input', response: mutate([actual!]),
    }])).toThrow(/more than once/u);
    expect(() => buildNatalMeaningQualityAudit([{
      caseId: 'forged', birthLabel: 'same input', response: mutate([
        { type: 'paragraph', text: GENERAL_NATAL_CALCULATED_CONTEXT_PREFIX + '근거 없는 해석' },
      ]),
    }])).toThrow(/not a recognized N5 bounded fact passage/u);
  });
});
