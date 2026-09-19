import { describe, expect, it } from 'vitest';
import {
  R014_AUTHORITY,
  R014_MUKU_ELEMENT_MAP,
  R014_MUKU_ROOT_VERSION,
  R014_SEASONALITY_BOUNDARY,
  R014_SOURCE_STRATUM_TENSION,
} from '../src/research/general-natal-muku-root-treatment.js';

describe('R014 Muku root treatment workbench', () => {
  it('maps only the four bounded element storehouses and does not invent an Earth storehouse', () => {
    expect(R014_MUKU_ROOT_VERSION).toBe('0.1.0-research');
    expect(R014_MUKU_ELEMENT_MAP).toEqual([
      expect.objectContaining({ element: 'WOOD', branchGlyph: '未' }),
      expect.objectContaining({ element: 'FIRE', branchGlyph: '戌' }),
      expect.objectContaining({ element: 'METAL', branchGlyph: '丑' }),
      expect.objectContaining({ element: 'WATER', branchGlyph: '辰' }),
    ]);
    expect(R014_MUKU_ELEMENT_MAP.some((row) => row.element === ('EARTH' as never))).toBe(false);
  });

  it('preserves the base-text/commentary Yin-Yang disagreement', () => {
    expect(R014_SOURCE_STRATUM_TENSION).toEqual(
      expect.objectContaining({
        resolution: 'PRESERVE_DISAGREEMENT',
        laterCommentary: expect.objectContaining({
          critiqueOfYinYangSplit: true,
          fiveElementMukuFraming: true,
        }),
      }),
    );
    expect(R014_AUTHORITY.yinYangTreatmentResolved).toBe(false);
  });

  it('does not transfer Yuqi seasonality into a Muku multiplier', () => {
    expect(R014_SEASONALITY_BOUNDARY).toEqual(
      expect.objectContaining({
        mukuSeasonalMultiplierEstablished: false,
        yuqiSeasonSensitivityObserved: true,
        sameBranchDoesNotCollapseMukuAndYuqi: true,
      }),
    );
    expect(R014_AUTHORITY.numericMukuWeightAuthorized).toBe(false);
    expect(R014_AUTHORITY.finalStrengthClassifierAuthorized).toBe(false);
    expect(R014_AUTHORITY.productionAuthorityPromoted).toBe(false);
  });
});
