import { describe, expect, it } from 'vitest';
import type { ReadingIntent } from '../src/contracts/reading.js';
import type { ProductReadingInternals } from '../src/reading/product-reading-service.js';
import {
  buildTwelveMenuReaderCards,
} from '../src/reading/twelve-menu-reader-cards.js';
import { readingSectionForIntentV1 } from '../src/reading/consumer-reading-authority.js';
import type { TwelveMenuId } from '../src/reading/twelve-menu-engine-readiness.js';

function entry(
  menuId: TwelveMenuId,
  intent: ReadingIntent,
  options: {
    official?: boolean;
    responseState?: 'delivered' | 'delivered_with_fallback' | 'insufficient_evidence';
    text?: string;
    coverage?: string;
  } = {},
) {
  const responseState = options.responseState ?? 'delivered';
  const readingSection = readingSectionForIntentV1(intent);
  const internals = {
    response: {
      state: responseState,
      ...(responseState === 'insufficient_evidence'
        ? { coverage: { explanation: options.coverage ?? '기존 출처로는 확인할 수 없습니다.' } }
        : {
            reading: {
              sections: [{
                sectionType: 'overview',
                title: '실제 개인별 한국어 풀이',
                state: 'complete',
                blocks: [{ type: 'paragraph', text: options.text ?? '기존 근거에 따른 풀이' }],
              }],
              disclosures: [{ type: 'scope_limitation', text: '사용 범위가 제한됩니다.' }],
            },
          }),
    },
    execution: {
      state: 'completed',
      artifact: {},
      ...(options.official ? { officialReadingPlan: {}, officialReadingReport: {} } : {}),
      consumerReadingAuthority: {
        authority: options.official ? 'official_reading' : 'legacy_narrative',
        readingSection,
      },
      preparation: {
        normalization: { request: { intent } },
        composition: {
          selection: {
            coverageState: 'complete',
            profileAuthorization: { state: 'authorized' },
            selectedClaimIds: ['existing-authorized-claim'],
          },
          evidence: {},
        },
      },
    },
  } as unknown as ProductReadingInternals;
  return { menuId, internals };
}

describe('twelve menu reader content projection', () => {
  it('returns twelve distinct cards and explicit unexecuted Korean reasons, without content', () => {
    const cards = buildTwelveMenuReaderCards([]);
    expect(cards).toHaveLength(12);
    expect(cards.every(card => card.state === 'unavailable')).toBe(true);
    expect(cards[0]?.sections[0]?.message).toContain('실행되지 않았습니다');
    expect(cards.every(card => card.sections.every(section => section.reading === undefined)))
      .toBe(true);
    expect(cards.every(card =>
      card.constraints.previewOnly === true &&
      card.constraints.mayPublish === false &&
      card.constraints.maySell === false)).toBe(true);
  });

  it('preserves actual delivered Korean paragraphs while separating partial Preview from Official evidence', () => {
    const general: ReadingIntent = { domain: 'general', temporalScope: 'natal' };
    const cards = buildTwelveMenuReaderCards([
      entry('general', general, { text: '원국의 근거 문단입니다.' }),
      entry('career', { domain: 'career', temporalScope: 'natal' }, {
        official: true, text: '직업의 독립된 근거 문단입니다.',
      }),
    ]);
    expect(cards[0]?.state).toBe('partial');
    expect(cards[0]?.sections[0]?.reading?.sections[0]?.blocks[0])
      .toEqual({ type: 'paragraph', text: '원국의 근거 문단입니다.' });
    expect(cards[0]?.sections[0]?.message).toContain('종합해석');
    expect(cards[1]?.state).toBe('available');
    expect(cards[1]?.sections[0]?.reading?.sections[0]?.blocks[0])
      .toEqual({ type: 'paragraph', text: '직업의 독립된 근거 문단입니다.' });
    expect(cards[1]?.constraints.mayPublish).toBe(false);
    expect(JSON.stringify(cards)).not.toContain('existing-authorized-claim');
  });

  it('does not fill a missing children reading with parents content', () => {
    const cards = buildTwelveMenuReaderCards([entry('family', {
      domain: 'family', temporalScope: 'natal', relationshipScope: 'parents',
    }, { official: true, text: '부모와의 관계에 대한 허용된 근거입니다.' })]);
    const family = cards.find(card => card.menuId === 'family');
    expect(family?.state).toBe('partial');
    expect(family?.sections.map(section => section.title))
      .toEqual(['부모와의 관계', '자녀와의 관계']);
    expect(family?.sections[0]?.reading?.sections[0]?.blocks[0])
      .toEqual({ type: 'paragraph', text: '부모와의 관계에 대한 허용된 근거입니다.' });
    expect(family?.sections[1]?.state).toBe('unavailable');
    expect(family?.sections[1]?.reading).toBeUndefined();
  });

  it('surfaces insufficient evidence without manufacturing a ProductReading paragraph', () => {
    const cards = buildTwelveMenuReaderCards([entry('question', {
      domain: 'question_specific', temporalScope: 'natal',
    }, { responseState: 'insufficient_evidence', coverage: '질문에 필요한 근거가 부족합니다.' })]);
    const question = cards.find(card => card.menuId === 'question');
    expect(question?.state).toBe('unavailable');
    expect(question?.sections[0]?.message).toContain('질문에 필요한 근거가 부족합니다.');
    expect(question?.sections[0]?.reading).toBeUndefined();
  });

  it('does not allow a response from a different topic to populate a card', () => {
    expect(() => buildTwelveMenuReaderCards([entry('wealth', {
      domain: 'general', temporalScope: 'natal',
    })])).toThrow('different intent');
  });
});
