import { describe, expect, it } from 'vitest';
import {
  R013_AUTHORITY,
  R013_FINDINGS,
  R013_RELATION_DEFINITIONS,
  R013_REPRESENTABILITY,
  R013_REJECTED_SHORTCUTS,
  R013_TOUGAN_TONGGEN_VERSION,
} from '../src/research/general-natal-tougan-tonggen-independence.js';

describe('R013 Tougan vs Tonggen bounded independence review', () => {
  it('keeps the later-commentary relations directionally distinct', () => {
    expect(R013_TOUGAN_TONGGEN_VERSION).toBe('0.2.0-research');
    expect(R013_RELATION_DEFINITIONS).toEqual([
      {
        relation: 'TOUGAN',
        direction: 'BRANCH_HIDDEN_STEM_TO_HEAVENLY_STEM',
        sourceStratum: 'XU_LEWU_LATER_COMMENTARY',
      },
      {
        relation: 'TONGGEN',
        direction: 'HEAVENLY_STEM_TO_BRANCH_ROOT',
        sourceStratum: 'XU_LEWU_LATER_COMMENTARY',
      },
    ]);
  });

  it('verifies BOTH with 甲+寅', () => {
    expect(R013_REPRESENTABILITY).toContainEqual(
      expect.objectContaining({
        state: 'BOTH',
        stem: '갑',
        branch: '인',
        tougan: true,
        tonggenDisposition: 'POSITIVE_ROOT_EVIDENCE',
        representability: 'VERIFIED',
      }),
    );
  });

  it('proves non-equivalence with a governed TONGGEN_ONLY 乙+寅 fixture', () => {
    expect(R013_REPRESENTABILITY).toContainEqual(
      expect.objectContaining({
        state: 'TONGGEN_ONLY',
        stem: '을',
        branch: '인',
        tougan: false,
        tonggenDisposition: 'POSITIVE_ROOT_EVIDENCE',
        representability: 'VERIFIED',
      }),
    );
    expect(R013_FINDINGS.touganEqualsTonggen).toBe(false);
    expect(R013_FINDINGS.nonEquivalenceEstablished).toBe(true);
  });

  it('verifies NEITHER only inside the governed exact 乙+戌 exclusion scope', () => {
    expect(R013_REPRESENTABILITY).toContainEqual(
      expect.objectContaining({
        state: 'NEITHER',
        stem: '을',
        branch: '술',
        tougan: false,
        tonggenDisposition: 'SELECTED_SOURCE_EXCLUDED',
        representability: 'VERIFIED_BOUNDED_EXACT_EXCLUSION',
      }),
    );
  });

  it('keeps TOUGAN_ONLY inconclusive instead of manufacturing a negative Tonggen result', () => {
    expect(R013_REPRESENTABILITY).toContainEqual(
      expect.objectContaining({
        state: 'TOUGAN_ONLY',
        representability: 'INCONCLUSIVE_UNDER_CURRENT_GOVERNED_SCOPE',
      }),
    );
    expect(R013_FINDINGS.touganOnlyRepresentable).toBe('INCONCLUSIVE');
    expect(R013_FINDINGS.fullBidirectionalIndependence).toBe('NOT_ESTABLISHED');
    expect(R013_REJECTED_SHORTCUTS).toContain(
      'NO_POSITIVE_TONGGEN_EVIDENCE_EQUALS_NOT_TONGGEN',
    );
  });

  it('does not turn the pair into strength, Gyeokguk, or Production authority', () => {
    expect(R013_AUTHORITY).toEqual({
      status: 'VERIFIED_NON_EQUIVALENCE_PARTIAL_REPRESENTABILITY',
      completeTonggenResolverCreated: false,
      globalTonggenNegativeResolverCreated: false,
      touganOnlyInvented: false,
      numericStrengthAuthorized: false,
      finalQiangRuoAuthorized: false,
      gyeokgukAuthorityPromoted: false,
      productionAuthorityPromoted: false,
    });
  });
});
