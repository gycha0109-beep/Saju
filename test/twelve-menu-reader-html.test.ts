import { describe, expect, it } from 'vitest';
import type { TwelveMenuReaderCard } from '../src/reading/twelve-menu-reader-cards.js';
import { buildTwelveMenuReaderCards } from '../src/reading/twelve-menu-reader-cards.js';
import {
  renderExecutedTwelveMenuReaderHtml,
  renderTwelveMenuReaderHtml,
} from '../src/preview/twelve-menu-reader-html.js';

const empty = (): readonly TwelveMenuReaderCard[] => buildTwelveMenuReaderCards([]);

const reading = (text: string) => ({
  sections: [{
    sectionType: 'overview' as const,
    title: '허용된 기존 해석',
    state: 'complete' as const,
    blocks: [
      { type: 'paragraph' as const, text },
      { type: 'fact_table' as const, rows: [{ label: '일지', value: '자' }] },
    ],
  }],
  disclosures: [{ type: 'scope_limitation' as const, text: '공개할 권한은 별도입니다.' }],
});

function withOneReading(
  id: 'general' | 'career' = 'general',
  state: 'available' | 'partial' = 'partial',
  text = '실제 계산 근거가 연결된 한국어 풀이입니다.',
): readonly TwelveMenuReaderCard[] {
  return empty().map(card => card.menuId !== id ? card : {
    ...card,
    state,
    sections: card.sections.map(section => ({
      ...section,
      state,
      reading: reading(text),
      message: '승인된 근거가 허용하는 범위를 설명합니다.',
    })),
  });
}

describe('governed twelve-menu Korean HTML projection', () => {
  it('renders every one of 12 exact menu anchors and Korean input/evidence reasons', () => {
    const html = renderExecutedTwelveMenuReaderHtml([]);
    expect(html).toEqual(renderTwelveMenuReaderHtml(empty()));
    const ids = [
      'general', 'career', 'wealth', 'relationship', 'business', 'family',
      'life_stage', 'annual', 'monthly', 'spouse', 'compatibility', 'question',
    ];
    for (const id of ids) {
      expect(html).toContain('id="menu-' + id + '"');
      expect(html).toContain('href="#menu-' + id + '"');
    }
    expect((html.match(/<article class="menu"/gu) ?? [])).toHaveLength(12);
    expect(html).toContain('가족');
    expect(html).toContain('부모와의 관계');
    expect(html).toContain('자녀와의 관계');
    expect(html).toContain('이번 달');
    expect(html).toContain('입력');
    expect(html).toContain('근거 부족');
    expect(html).toContain('공식 공개·저장·판매 권한은 별도입니다');
    expect(html).not.toContain('<div class="reading-unit">');
  });

  it('shows the exact existing Korean paragraph and disclosures without creating extra meaning', () => {
    const cards = withOneReading();
    const html = renderTwelveMenuReaderHtml(cards);
    expect(html).toContain('실제 계산 근거가 연결된 한국어 풀이입니다.');
    expect(html).toContain('허용된 기존 해석');
    expect(html).toContain('일지');
    expect(html).toContain('공개할 권한은 별도입니다.');
    expect(html).toContain('부분 풀이');
    expect(html).not.toContain('검증되지 않은 길흉 결론');
  });

  it('keeps an engine-available card internal and displays legitimate content only', () => {
    const html = renderTwelveMenuReaderHtml(
      withOneReading('career', 'available', '해석 권한을 가진 직업 관련 기존 문장'),
    );
    expect(html).toContain('근거 확인 · 정식 서비스 공개 여부는 별개');
    expect(html).toContain('해석 권한을 가진 직업 관련 기존 문장');
    expect(html).toContain('내부 연구용 읽기 화면');
    expect(html).toContain('판매 승인 아님');
  });

  it('escapes all user-facing text and never turns source hints into unsupported meaning', () => {
    const cards = withOneReading('general', 'partial', '<img src=x onerror=alert(1)>');
    const html = renderTwelveMenuReaderHtml(cards);
    expect(html).not.toContain('<img src=x');
    expect(html).toContain('&lt;img src=x onerror=alert(1)&gt;');
    const sourceOnly = empty().map(card => card.menuId !== 'general' ? card : ({
      ...card,
      state: 'partial' as const,
      sections: card.sections.map(section => ({
        ...section,
        state: 'partial' as const,
        reading: {
          sections: [{
            sectionType: 'overview' as const,
            title: '명식 사실',
            state: 'complete' as const,
            blocks: [
              { type: 'source_hint' as const, text: '출처 참조' },
              { type: 'fact_table' as const, rows: [{ label: '일지', value: '미상' }] },
            ],
          }],
          disclosures: [],
        },
      })),
    }));
    expect(() => renderTwelveMenuReaderHtml(sourceOnly)).toThrow(
      'matching rendered interpretation',
    );
  });

  it('refuses cardinality changes, fake official permission and unavailable hidden content', () => {
    const cards = empty();
    expect(() => renderTwelveMenuReaderHtml(cards.slice(1))).toThrow('all 12');
    expect(() => renderTwelveMenuReaderHtml([
      ...cards.slice(1), cards[0]!,
    ])).toThrow('reordered');
    const unsafe = cards.map(card => card.menuId !== 'general' ? card : {
      ...card,
      constraints: { ...card.constraints, maySell: true as const },
    });
    expect(() => renderTwelveMenuReaderHtml(
      unsafe as unknown as readonly TwelveMenuReaderCard[],
    )).toThrow('public');
    const hidden = cards.map(card => card.menuId !== 'general' ? card : {
      ...card,
      sections: card.sections.map(section => ({
        ...section,
        state: 'unavailable' as const,
        reading: reading('보이면 안 되는 문장'),
      })),
    });
    expect(() => renderTwelveMenuReaderHtml(hidden)).toThrow('hidden');
  });

  it('keeps family as two separate input scopes and never copies parent meaning to children', () => {
    const cards = empty().map(card => card.menuId !== 'family' ? card : ({
      ...card,
      state: 'partial' as const,
      sections: card.sections.map((section, index) =>
        index === 0 ? {
          ...section, state: 'available' as const,
          reading: reading('허용된 부모 해석'),
        } : section),
    }));
    const html = renderTwelveMenuReaderHtml(cards);
    const family = html.split('<article class="menu" id="menu-family">')[1]
      ?.split('</article>')[0];
    expect(family).toContain('부모와의 관계');
    expect(family).toContain('자녀와의 관계');
    expect(family).toContain('허용된 부모 해석');
    expect((family?.match(/허용된 부모 해석/gu) ?? []).length).toBe(1);
    expect(family).toContain('근거 부족 또는 입력 필요');
  });
});
