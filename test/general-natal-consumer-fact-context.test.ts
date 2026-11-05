import { describe, expect, it } from 'vitest';
import { createGeneralNatalIntegratedPreviewProductHost } from '../src/host/general-natal-integrated-preview-host.js';
import {
  attachGeneralNatalCalculatedContext,
} from '../src/preview/general-natal-consumer-fact-context.js';
import type { ProductReadingResponse } from '../src/reading/product-reading-response.js';

function contextTexts(response: ProductReadingResponse): readonly string[] {
  return response.reading?.sections.flatMap((section) =>
    section.blocks.flatMap((block) =>
      block.type === 'paragraph' && block.text.startsWith('이 사주풀이가 실제로 참조한 명식은 ')
        ? [block.text]
        : [],
    ),
  ) ?? [];
}

describe('N5 General Natal consumer body: real resolved chart facts', () => {
  const host = createGeneralNatalIntegratedPreviewProductHost({
    requestNowFactory: () => new Date('2026-10-15T00:00:00.000Z'),
  });
  async function read(date: string, time: string | null) {
    return host.requestReading({
      birth: { calendarType: 'solar', date, time, sex: 'unspecified' },
      reading: { text: '사주' },
    });
  }

  it('shows true hour-pillar differences inside the *actual* consumer reading, without replacing the approved text', async () => {
    const [early, later, same] = await Promise.all([
      read('1984-01-07', '00:30'),
      read('1984-01-07', '19:30'),
      read('1984-01-07', '00:30'),
    ]);
    expect(early.state).toBe('delivered');
    expect(later.state).toBe('delivered');
    const [earlyText] = contextTexts(early);
    const [laterText] = contextTexts(later);
    expect(earlyText).toContain(early.reading?.calculationSummary.pillars.hour.value);
    expect(laterText).toContain(later.reading?.calculationSummary.pillars.hour.value);
    expect(earlyText).not.toEqual(laterText);
    expect(contextTexts(same)).toEqual(contextTexts(early));
    expect(earlyText).toContain('계산 사실만으로 성격·길흉·미래 결과를 단정하지 않습니다');
    expect(early.reading?.sections.some((section) =>
      section.title === '해석 범위')).toBe(true);
    expect(early.reading?.sections.flatMap((section) => section.blocks).length)
      .toBeGreaterThan(2);
    expect(early.reading?.sections.flatMap((section) => section.blocks).some((block) =>
      block.type === 'paragraph' && !block.text.startsWith('이 사주풀이가 실제로 참조한 명식은 ')
    )).toBe(true);
  });

  it('does not turn missing hours or insufficient evidence into fabricated meaning', async () => {
    const unknown = await read('2024-03-10', null);
    expect(unknown.state).not.toBe('delivered');
    expect(contextTexts(unknown)).toEqual([]);
    expect(attachGeneralNatalCalculatedContext(unknown)).toBe(unknown);

    const known = await read('2024-03-10', '12:00');
    const incomplete: ProductReadingResponse = {
      ...known,
      reading: {
        ...known.reading!,
        calculationSummary: {
          ...known.reading!.calculationSummary,
          pillars: {
            ...known.reading!.calculationSummary.pillars,
            hour: { label: '시주', status: 'unavailable' },
          },
        },
      },
    };
    expect(attachGeneralNatalCalculatedContext(incomplete)).toBe(incomplete);
  });

  it('does not append the fact passage twice or alter request status for already-bound prose', async () => {
    const reading = await read('1992-01-12', '12:30');
    expect(contextTexts(reading)).toHaveLength(1);
    // Formatter is intended for one host response; reapplication is a no-op
    // once the same calculated context is already present.
    expect(contextTexts(attachGeneralNatalCalculatedContext(reading))).toHaveLength(1);
    expect(reading.requiredAction).toBe('none');
  });
});
