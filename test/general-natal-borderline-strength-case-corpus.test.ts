import { describe, expect, it } from 'vitest';
import {
  R019_BORDERLINE_CASE_CORPUS_VERSION,
  R019_BORDERLINE_CASES,
  R019_CORPUS_BOUNDARY,
} from '../src/research/general-natal-borderline-strength-case-corpus.js';

describe('R019 source-bounded borderline case corpus', () => {
  it('contains the four seed cases with explicit completeness', () => {
    expect(R019_BORDERLINE_CASE_CORPUS_VERSION).toBe('0.1.0-research');
    expect(R019_BORDERLINE_CASES).toHaveLength(4);
    expect(R019_BORDERLINE_CASES.filter((c) => c.completeness === 'PARTIAL_CONFIGURATION')).toHaveLength(2);
    expect(R019_BORDERLINE_CASES.filter((c) => c.completeness === 'EXACT_FOUR_PILLAR_PATTERN')).toHaveLength(2);
  });

  it('preserves season/support counterexamples instead of normalizing them', () => {
    expect(R019_BORDERLINE_CASES).toContainEqual(
      expect.objectContaining({
        id: 'spring-wood-heavy-metal',
        sourceLabel: 'DE_SHI_ER_BU_WANG',
      }),
    );
    expect(R019_BORDERLINE_CASES).toContainEqual(
      expect.objectContaining({
        id: 'autumn-wood-deep-root',
        sourceLabel: 'SHI_SHI_BU_RUO',
      }),
    );
  });

  it('keeps source labels non-executable and missing facts unsynthesized', () => {
    expect(R019_CORPUS_BOUNDARY).toEqual({
      sourceLabelsAreClassifierOutputs: false,
      missingFactsMayBeSynthesized: false,
      wangShuaiAndQiangRuoCollapsed: false,
      corpusAuthorizesFinalStrengthClassifier: false,
      corpusAuthorizesProductionFacts: false,
    });
  });
});
