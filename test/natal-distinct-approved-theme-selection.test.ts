import { describe, expect, it } from 'vitest';
import {
  NATAL_APPROVED_THEME_READING_INTRO,
  selectDistinctNatalApprovedThemes,
} from '../src/preview/natal-distinct-approved-theme-selection.js';

const claim = (family: string, channel: string, order: number) => ({
  claimType: `GENERAL_NATAL_${family}_${channel}_THEME`,
  order,
});

describe('source-preserving natal topic selection', () => {
  it('places independently approved thematic families before a second channel of the same family', () => {
    const candidates = [
      claim('PEER', 'VISIBLE_STEMS', 0),
      claim('PEER', 'BRANCHES', 0),
      claim('WEALTH', 'VISIBLE_STEMS', 1),
      claim('WEALTH', 'BRANCHES', 1),
      claim('RESOURCE', 'VISIBLE_STEMS', 2),
      claim('OUTPUT', 'BRANCHES', 3),
      claim('OFFICER', 'BRANCHES', 3),
    ];
    const selected = selectDistinctNatalApprovedThemes(candidates);
    expect(selected.map((entry) =>
      entry.claimType.split('_')[2])).toEqual([
        'PEER', 'WEALTH', 'RESOURCE', 'OFFICER', 'OUTPUT',
      ]);
    expect(selected).toHaveLength(5);
    expect(selectDistinctNatalApprovedThemes(candidates)).toEqual(selected);
    expect(candidates).toHaveLength(7);
    expect(NATAL_APPROVED_THEME_READING_INTRO).toContain('결과나 미래 사건을 단정하지 않습니다');
  });

  it('preserves second-channel coverage if fewer than five distinct families exist', () => {
    const selected = selectDistinctNatalApprovedThemes([
      claim('PEER', 'BRANCHES', 2),
      claim('PEER', 'VISIBLE_STEMS', 0),
      claim('WEALTH', 'BRANCHES', 1),
      claim('RESOURCE', 'VISIBLE_STEMS', 3),
    ]);
    expect(selected.map((entry) => entry.claimType)).toEqual([
      'GENERAL_NATAL_PEER_VISIBLE_STEMS_THEME',
      'GENERAL_NATAL_WEALTH_BRANCHES_THEME',
      'GENERAL_NATAL_RESOURCE_VISIBLE_STEMS_THEME',
      'GENERAL_NATAL_PEER_BRANCHES_THEME',
    ]);
  });

  it('rejects duplicate, out-of-range and non-governed theme candidates', () => {
    const one = claim('WEALTH', 'VISIBLE_STEMS', 0);
    expect(() => selectDistinctNatalApprovedThemes([one, one])).toThrow(/unique source-bound/u);
    expect(() => selectDistinctNatalApprovedThemes([
      claim('WEALTH', 'VISIBLE_STEMS', Number.NaN),
    ])).toThrow(/unique source-bound/u);
    expect(() => selectDistinctNatalApprovedThemes([
      { claimType: 'NEW_LIFE_OUTCOME', order: 1 },
    ])).toThrow(/unique source-bound/u);
  });
});
