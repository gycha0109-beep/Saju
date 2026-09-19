export const R014_MUKU_ROOT_VERSION = '0.1.0-research' as const;

export type R014Element = 'WOOD' | 'FIRE' | 'EARTH' | 'METAL' | 'WATER';
export type R014Branch = 'CHEN' | 'XU' | 'CHOU' | 'WEI';

export interface R014MukuElementMapping {
  element: Exclude<R014Element, 'EARTH'>;
  branch: R014Branch;
  branchGlyph: '辰' | '戌' | '丑' | '未';
  role: 'MUKU_FOR_ELEMENT';
}

export const R014_MUKU_ELEMENT_MAP: readonly R014MukuElementMapping[] = Object.freeze([
  { element: 'WOOD', branch: 'WEI', branchGlyph: '未', role: 'MUKU_FOR_ELEMENT' },
  { element: 'FIRE', branch: 'XU', branchGlyph: '戌', role: 'MUKU_FOR_ELEMENT' },
  { element: 'METAL', branch: 'CHOU', branchGlyph: '丑', role: 'MUKU_FOR_ELEMENT' },
  { element: 'WATER', branch: 'CHEN', branchGlyph: '辰', role: 'MUKU_FOR_ELEMENT' },
]);

export const R014_SOURCE_STRATUM_TENSION = Object.freeze({
  baseTextSurface: {
    yangStemAtApplicableStorehouse: 'ROOT_SUPPORTED',
    yinStemAtStorehouse: 'DESCRIBED_AS_NO_USE',
  },
  laterCommentary: {
    critiqueOfYinYangSplit: true,
    fiveElementMukuFraming: true,
    arbitraryStorehouseReuseRejected: true,
  },
  resolution: 'PRESERVE_DISAGREEMENT' as const,
});

export const R014_SEASONALITY_BOUNDARY = Object.freeze({
  mukuSeasonalMultiplierEstablished: false,
  yuqiSeasonSensitivityObserved: true,
  sameBranchDoesNotCollapseMukuAndYuqi: true,
  note:
    'The selected commentary gives seasonal/司令 sensitivity for 餘氣; that does not authorize applying the same temporal rule to 墓庫 root status.',
});

export const R014_AUTHORITY = Object.freeze({
  status: 'research' as const,
  anyMukuRootsAnyStem: false,
  applicableElementMukuCanRoot: 'SUPPORTED_BOUNDED' as const,
  clashRequiredToOpenRoot: false,
  yinYangTreatmentResolved: false,
  numericMukuWeightAuthorized: false,
  finalStrengthClassifierAuthorized: false,
  productionAuthorityPromoted: false,
});
