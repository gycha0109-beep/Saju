import { describe, expect, it } from 'vitest';
import type {
  FiveElement,
  HeavenlyStem,
  TenGod,
  YinYang,
} from '../src/contracts/calculation.js';
import { deriveAnnualStemTenGod } from '../src/reading/annual-interpretation-facts.js';
import {
  GENERAL_ANNUAL_ACTIVATION_RULES,
  GENERAL_ANNUAL_POLICY_SOURCE,
  GENERAL_ANNUAL_TENSION_RULES,
} from '../src/research/general-annual-reading-candidate.js';
import { buildGeneralAnnualAuthorityBridgeReview } from '../src/research/general-annual-authority-bridge-review.js';

// Static, independent expected-output fixtures for the *existing* modern
// Ten-God classifier. They are not derived by calling the implementation.
// This is calculation classification coverage only, not historical source
// evidence or authority to interpret a person's annual fortunes.
const STEMS = [
  '갑', '을', '병', '정', '무', '기', '경', '신', '임', '계',
] as const satisfies readonly HeavenlyStem[];

const DAY_MASTER = {
  갑: { element: '목', yinYang: '양' },
  을: { element: '목', yinYang: '음' },
  병: { element: '화', yinYang: '양' },
  정: { element: '화', yinYang: '음' },
  무: { element: '토', yinYang: '양' },
  기: { element: '토', yinYang: '음' },
  경: { element: '금', yinYang: '양' },
  신: { element: '금', yinYang: '음' },
  임: { element: '수', yinYang: '양' },
  계: { element: '수', yinYang: '음' },
} as const satisfies Record<HeavenlyStem, { element: FiveElement; yinYang: YinYang }>;

// Each row is the natal day stem. Columns are the compared annual stems
// in STEMS order. Keep these literal expectations separate from the
// GENERATES/CONTROLS implementation under test.
const EXPECTED = {
  갑: ['비견', '겁재', '식신', '상관', '편재', '정재', '편관', '정관', '편인', '정인'],
  을: ['겁재', '비견', '상관', '식신', '정재', '편재', '정관', '편관', '정인', '편인'],
  병: ['편인', '정인', '비견', '겁재', '식신', '상관', '편재', '정재', '편관', '정관'],
  정: ['정인', '편인', '겁재', '비견', '상관', '식신', '정재', '편재', '정관', '편관'],
  무: ['편관', '정관', '편인', '정인', '비견', '겁재', '식신', '상관', '편재', '정재'],
  기: ['정관', '편관', '정인', '편인', '겁재', '비견', '상관', '식신', '정재', '편재'],
  경: ['편재', '정재', '편관', '정관', '편인', '정인', '비견', '겁재', '식신', '상관'],
  신: ['정재', '편재', '정관', '편관', '정인', '편인', '겁재', '비견', '상관', '식신'],
  임: ['식신', '상관', '편재', '정재', '편관', '정관', '편인', '정인', '비견', '겁재'],
  계: ['상관', '식신', '정재', '편재', '정관', '편관', '정인', '편인', '겁재', '비견'],
} as const satisfies Record<HeavenlyStem, readonly TenGod[]>;

describe('SA-7D T-COMP modern Ten-God computation: research-only 10×10 matrix', () => {
  for (const dayStem of STEMS) {
    it(`matches all ten annual stems for natal day stem ${dayStem}`, () => {
      expect(EXPECTED[dayStem]).toHaveLength(STEMS.length);
      expect(new Set(EXPECTED[dayStem]).size).toBe(10);

      for (const [index, annualStem] of STEMS.entries()) {
        expect(
          deriveAnnualStemTenGod(DAY_MASTER[dayStem], annualStem),
          `day=${dayStem} annual=${annualStem}`,
        ).toBe(EXPECTED[dayStem][index]);
      }
    });
  }

  it('does not turn 100 classification checks into Annual semantic authority', () => {
    const review = buildGeneralAnnualAuthorityBridgeReview();
    const rules = [...GENERAL_ANNUAL_ACTIVATION_RULES, ...GENERAL_ANNUAL_TENSION_RULES];

    expect(rules).toHaveLength(14);
    expect(GENERAL_ANNUAL_POLICY_SOURCE.sourceType).toBe('internal_research');
    for (const rule of rules) {
      expect(rule.status).toBe('research');
      expect(rule.quality.reviewerStatus).toBe('unreviewed');
      expect(rule.sourceRefs).toHaveLength(1);
      expect(rule.sourceRefs[0]?.sourceId).toBe(GENERAL_ANNUAL_POLICY_SOURCE.sourceId);
      expect(rule.sourceRefs[0]?.supportType).toBe('implementation_reference');
    }
    expect(review.decision.disposition).toBe('RETURN_TO_RESEARCH');
    expect(review.authorityState.annualSpecificSourceAuthorityEstablished).toBe(false);
    expect(review.authorityState.officialReadingAuthorityAuthorized).toBe(false);
    expect(review.authorityState.production).toBe('HOLD');
  });
});
