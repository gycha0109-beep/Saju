import { describe, expect, test } from 'vitest';
import {
  getTenGod,
  getVoidBranches,
  type EarthlyBranch,
  type FiveElement,
  type HeavenlyStem,
  type TenGod,
  type YinYang,
} from 'manseryeok';

const STEMS = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'] as const satisfies readonly HeavenlyStem[];
const BRANCHES = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'] as const satisfies readonly EarthlyBranch[];

const STEM_META: Readonly<Record<HeavenlyStem, { element: FiveElement; yinYang: YinYang }>> = {
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
};

const GENERATES: Readonly<Record<FiveElement, FiveElement>> = {
  목: '화',
  화: '토',
  토: '금',
  금: '수',
  수: '목',
};

const CONTROLS: Readonly<Record<FiveElement, FiveElement>> = {
  목: '토',
  화: '금',
  토: '수',
  금: '목',
  수: '화',
};

function expectedTenGod(dayMaster: HeavenlyStem, target: HeavenlyStem): TenGod {
  const day = STEM_META[dayMaster];
  const other = STEM_META[target];
  const samePolarity = day.yinYang === other.yinYang;

  if (day.element === other.element) return samePolarity ? '비견' : '겁재';
  if (GENERATES[day.element] === other.element) return samePolarity ? '식신' : '상관';
  if (CONTROLS[day.element] === other.element) return samePolarity ? '편재' : '정재';
  if (CONTROLS[other.element] === day.element) return samePolarity ? '편관' : '정관';
  return samePolarity ? '편인' : '정인';
}

const VOID_BY_XUN = [
  ['술', '해'],
  ['신', '유'],
  ['오', '미'],
  ['진', '사'],
  ['인', '묘'],
  ['자', '축'],
] as const satisfies readonly (readonly [EarthlyBranch, EarthlyBranch])[];

describe('exhaustive deterministic structural lookups', () => {
  test('all 100 day-master × target-stem ten-god relations match independent five-element/polarity rules', () => {
    for (const dayMaster of STEMS) {
      for (const target of STEMS) {
        expect(getTenGod(dayMaster, target), `${dayMaster}/${target}`).toBe(
          expectedTenGod(dayMaster, target),
        );
      }
    }
  });

  test('all 60 sexagenary day pillars map to the expected two void branches', () => {
    for (let index = 0; index < 60; index += 1) {
      const stem = STEMS[index % 10];
      const branch = BRANCHES[index % 12];
      const expected = VOID_BY_XUN[Math.floor(index / 10)];
      if (stem === undefined || branch === undefined || expected === undefined) {
        throw new Error(`invalid sexagenary fixture index ${index}`);
      }
      expect(getVoidBranches(stem, branch), `${stem}${branch}`).toEqual([...expected]);
    }
  });
});
