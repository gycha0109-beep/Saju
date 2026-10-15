import { describe, expect, it } from 'vitest';
import { createGeneralNatalIntegratedPreviewProductHost } from '../src/host/general-natal-integrated-preview-host.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../src/production/production-calculation-runtime.js';
import { attachGeneralNatalCalculatedRoleObservation, GENERAL_NATAL_ROLE_OBSERVATION_PREFIX } from '../src/preview/general-natal-consumer-role-observation.js';
import { buildNatalMeaningQualityAudit } from '../src/preview/natal-meaning-quality-audit.js';
import type { ProductReadingResponse } from '../src/reading/product-reading-response.js';

const host = createGeneralNatalIntegratedPreviewProductHost({
  requestNowFactory: () => new Date('2026-10-15T00:00:00.000Z'),
});
function observe(response: ProductReadingResponse): string[] {
  return response.reading?.sections.flatMap((section) => section.blocks.flatMap((block) =>
    block.type === 'paragraph' && block.text.startsWith(GENERAL_NATAL_ROLE_OBSERVATION_PREFIX)
      ? [block.text] : [])) ?? [];
}
function read(date: string, time: string | null) {
  return host.requestReading({
    birth: { calendarType: 'solar', date, time, sex: 'unspecified' },
    reading: { text: '사주' },
  });
}

describe('N7 true calculated Ten-God role positions in actual Preview reading', () => {
  it('differentiates observed placements, never inferred outcomes, across different known hours', async () => {
    const [early, midday, evening, again] = await Promise.all([
      read('1984-01-07', '00:30'),
      read('1984-01-07', '12:30'),
      read('1984-01-07', '19:30'),
      read('1984-01-07', '00:30'),
    ]);
    for (const response of [early, midday, evening, again]) {
      expect(response.state).toBe('delivered');
      expect(observe(response)).toHaveLength(1);
      expect(observe(response)[0]).toMatch(/연주 천간|월주 천간|시주 천간/u);
      expect(observe(response)[0]).toContain('지지 대표');
      expect(observe(response)[0]).toContain('결과나 강약을 판단하지 않습니다');
    }
    expect(observe(early)).toEqual(observe(again));
    expect(observe(early)).not.toEqual(observe(midday));
    expect(observe(midday)).not.toEqual(observe(evening));
    const { quality } = buildNatalMeaningQualityAudit([
      { caseId: 'a', birthLabel: 'early', response: early },
      { caseId: 'b', birthLabel: 'later', response: evening },
    ]);
    expect(quality.repeatedMeaningPairs).toBe(1);
    expect(quality.actualRepeatedConsumerPairs).toBe(0);
    expect(quality.pairsSeparatedOnlyByCalculatedFacts).toBe(1);
  });

  it('remains request-local under concurrent reads for different birth dates', async () => {
    const [a,b,c] = await Promise.all([
      read('1992-01-12', '00:30'),
      read('2010-02-03', '19:30'),
      read('1996-01-09', '12:30'),
    ]);
    for (const item of [a,b,c]) {
      expect(item.state).toBe('delivered');
      expect(observe(item)).toHaveLength(1);
    }
    expect(observe(a)).not.toEqual(observe(b));
    expect(observe(a)).not.toEqual(observe(c));
  });

  it('is fail-closed for unknown hours, mismatched snapshots, and duplicated observation', async () => {
    const unknown = await read('2024-03-10', null);
    expect(observe(unknown)).toEqual([]);
    const known = await read('1984-01-07', '00:30');
    const knownAgain = await read('1984-01-07', '00:30');
    const wrong = calculateAuthorizedMyeonghwaProductionSnapshot({
      calendarType: 'solar',
      date: { year: 2010, month: 2, day: 3 },
      time: { known: true, hour: 19, minute: 30 },
      sexForTraditionalCalculation: 'unspecified',
    }).snapshot;
    expect(attachGeneralNatalCalculatedRoleObservation(known, wrong)).toBe(known);
    expect(attachGeneralNatalCalculatedRoleObservation(knownAgain, wrong)).toBe(knownAgain);
    const correct = calculateAuthorizedMyeonghwaProductionSnapshot({
      calendarType: 'solar',
      date: { year: 1984, month: 1, day: 7 },
      time: { known: true, hour: 0, minute: 30 },
      sexForTraditionalCalculation: 'unspecified',
    }).snapshot;
    expect(attachGeneralNatalCalculatedRoleObservation(known, correct)).toBe(known);
    const firstSection = known.reading!.sections[0]!;
    const paragraph = firstSection.blocks.find((block) =>
      block.type === 'paragraph' && block.text.startsWith(GENERAL_NATAL_ROLE_OBSERVATION_PREFIX));
    expect(paragraph).toBeDefined();
    const duplicated = {
      ...known,
      reading: {
        ...known.reading!,
        sections: [
          { ...firstSection, blocks: [...firstSection.blocks, paragraph!] },
          ...known.reading!.sections.slice(1),
        ],
      },
    };
    expect(() => buildNatalMeaningQualityAudit([
      { caseId: 'twice', birthLabel: 'same', response: duplicated },
    ])).toThrow(/Ten God context appears more than once/u);
  });
});
