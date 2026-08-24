import { describe, expect, test } from 'vitest';
import {
  STRUCTURAL_RELATION_SOURCE_CATALOG,
  deriveStructuralRelationCandidates,
  type EarthlyBranch,
  type FiveElement,
  type HeavenlyStem,
  type PillarFact,
  type YinYang,
} from '../src/index.js';

const STEM_META: Readonly<Record<HeavenlyStem, { hanja: string; element: FiveElement; yinYang: YinYang }>> = {
  갑: { hanja: '甲', element: '목', yinYang: '양' },
  을: { hanja: '乙', element: '목', yinYang: '음' },
  병: { hanja: '丙', element: '화', yinYang: '양' },
  정: { hanja: '丁', element: '화', yinYang: '음' },
  무: { hanja: '戊', element: '토', yinYang: '양' },
  기: { hanja: '己', element: '토', yinYang: '음' },
  경: { hanja: '庚', element: '금', yinYang: '양' },
  신: { hanja: '辛', element: '금', yinYang: '음' },
  임: { hanja: '壬', element: '수', yinYang: '양' },
  계: { hanja: '癸', element: '수', yinYang: '음' },
};

const BRANCH_META: Readonly<Record<EarthlyBranch, { hanja: string; element: FiveElement; yinYang: YinYang }>> = {
  자: { hanja: '子', element: '수', yinYang: '양' },
  축: { hanja: '丑', element: '토', yinYang: '음' },
  인: { hanja: '寅', element: '목', yinYang: '양' },
  묘: { hanja: '卯', element: '목', yinYang: '음' },
  진: { hanja: '辰', element: '토', yinYang: '양' },
  사: { hanja: '巳', element: '화', yinYang: '음' },
  오: { hanja: '午', element: '화', yinYang: '양' },
  미: { hanja: '未', element: '토', yinYang: '음' },
  신: { hanja: '申', element: '금', yinYang: '양' },
  유: { hanja: '酉', element: '금', yinYang: '음' },
  술: { hanja: '戌', element: '토', yinYang: '양' },
  해: { hanja: '亥', element: '수', yinYang: '음' },
};

function pillar(stem: HeavenlyStem, branch: EarthlyBranch): PillarFact {
  return {
    stem: { value: stem, ...STEM_META[stem] },
    branch: { value: branch, ...BRANCH_META[branch] },
  };
}

describe('T0 structural relation candidates', () => {
  test('detects stem five-combination and branch six-combination independently', () => {
    const relations = deriveStructuralRelationCandidates({
      year: pillar('갑', '자'),
      month: pillar('기', '축'),
    });

    expect(relations.map((relation) => relation.kind)).toEqual([
      'branch_six_combination',
      'stem_five_combination',
    ]);
    expect(relations.every((relation) => relation.semantics.structuralMatchOnly)).toBe(true);
    expect(relations.every((relation) => relation.semantics.transformationEstablished === false)).toBe(true);
  });

  test('detects all six branch clash pairs symmetrically', () => {
    const pairs: readonly (readonly [EarthlyBranch, EarthlyBranch])[] = [
      ['자', '오'],
      ['축', '미'],
      ['인', '신'],
      ['묘', '유'],
      ['진', '술'],
      ['사', '해'],
    ];

    for (const [left, right] of pairs) {
      const forward = deriveStructuralRelationCandidates({
        year: pillar('갑', left),
        day: pillar('병', right),
      }).filter((relation) => relation.kind === 'branch_clash');
      const reverse = deriveStructuralRelationCandidates({
        year: pillar('갑', right),
        day: pillar('병', left),
      }).filter((relation) => relation.kind === 'branch_clash');

      expect(forward).toHaveLength(1);
      expect(reverse).toHaveLength(1);
    }
  });

  test('detects all four complete branch three-combination sets but not incomplete pairs', () => {
    const groups: readonly (readonly [EarthlyBranch, EarthlyBranch, EarthlyBranch])[] = [
      ['인', '오', '술'],
      ['사', '유', '축'],
      ['신', '자', '진'],
      ['해', '묘', '미'],
    ];

    for (const [first, second, third] of groups) {
      const complete = deriveStructuralRelationCandidates({
        year: pillar('갑', first),
        month: pillar('병', second),
        day: pillar('무', third),
      }).filter((relation) => relation.kind === 'branch_three_combination');
      const incomplete = deriveStructuralRelationCandidates({
        year: pillar('갑', first),
        month: pillar('병', second),
      }).filter((relation) => relation.kind === 'branch_three_combination');

      expect(complete).toHaveLength(1);
      expect(incomplete).toHaveLength(0);
    }
  });

  test('relation identity is position-specific and deterministic when the same branch repeats', () => {
    const first = deriveStructuralRelationCandidates({
      year: pillar('갑', '자'),
      month: pillar('병', '축'),
      day: pillar('무', '자'),
    }).filter((relation) => relation.kind === 'branch_six_combination');
    const second = deriveStructuralRelationCandidates({
      year: pillar('갑', '자'),
      month: pillar('병', '축'),
      day: pillar('무', '자'),
    }).filter((relation) => relation.kind === 'branch_six_combination');

    expect(first).toHaveLength(2);
    expect(new Set(first.map((relation) => relation.relationId)).size).toBe(2);
    expect(first).toEqual(second);
  });

  test('source catalog keeps structural matching separate from transformation conditions', () => {
    expect(STRUCTURAL_RELATION_SOURCE_CATALOG.sanmingTonghui.scope).toContain(
      'separate conditions',
    );
    const relations = deriveStructuralRelationCandidates({
      year: pillar('갑', '인'),
      month: pillar('기', '오'),
      day: pillar('병', '술'),
    });
    expect(relations.every((relation) => relation.semantics.transformationEstablished === false)).toBe(true);
  });
});
