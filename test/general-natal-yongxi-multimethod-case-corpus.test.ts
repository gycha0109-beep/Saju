import { describe, expect, it } from 'vitest';
import {
  R039_CORPUS_BOUNDARY,
  R039_YONGXI_CASES,
  R039_YONGXI_CASE_CORPUS_VERSION,
} from '../src/research/general-natal-yongxi-multimethod-case-corpus.js';

describe('R039 Yong/Xi multi-method case corpus', () => {
  it('preserves three direct-source seed cases', () => {
    expect(R039_YONGXI_CASE_CORPUS_VERSION).toBe('0.1.0-research');
    expect(R039_YONGXI_CASES).toHaveLength(3);
    expect(R039_YONGXI_CASES.map((c) => c.chart)).toEqual([
      '丁巳 壬子 辛巳 丁酉',
      '甲申 丙子 庚辰 甲申',
      '戊戌 甲子 己巳 戊辰',
    ]);
  });

  it('treats verified multi-method differences as coexisting roles rather than fabricated conflicts', () => {
    expect(R039_YONGXI_CASES.every((c) => c.relation === 'COEXISTING_DIFFERENT_ROLES')).toBe(true);
    expect(R039_YONGXI_CASES.every((c) => c.forceSingleWinner === false)).toBe(true);
    expect(R039_CORPUS_BOUNDARY.trueConflictCaseVerified).toBe(false);
    expect(R039_CORPUS_BOUNDARY.multiMethodDifferenceImpliesConflict).toBe(false);
  });

  it('keeps climate requirements distinct from primary-use roles', () => {
    const c1 = R039_YONGXI_CASES.find((c) => c.id === 'weak-winter-metal-climate-and-support');
    expect(c1?.needs).toEqual([
      expect.objectContaining({ role: 'PRIMARY_USE', value: '酉金扶身' }),
      expect.objectContaining({ role: 'CLIMATE_REQUIREMENT', value: '火不可缺' }),
    ]);
    expect(R039_CORPUS_BOUNDARY).toEqual({
      verifiedCaseCount: 3,
      trueConflictCaseVerified: false,
      multiMethodDifferenceImpliesConflict: false,
      forceSingleWinnerAuthorized: false,
      numericPriorityAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
