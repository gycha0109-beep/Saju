import { describe, expect, it } from 'vitest';
import {
  R050_AUTHORITY,
  R050_TEN_GOD_PAIR_MATRIX,
  R050_TEN_GODS,
  R050_TEN_GOD_PAIR_MATRIX_VERSION,
} from '../src/research/general-natal-ten-god-pair-matrix.js';

describe('R050 exhaustive Ten-God pair matrix', () => {
  it('enumerates exactly 10x10 ordered pairs once', () => {
    expect(R050_TEN_GOD_PAIR_MATRIX_VERSION).toBe('0.1.0-research');
    expect(R050_TEN_GODS).toHaveLength(10);
    expect(R050_TEN_GOD_PAIR_MATRIX).toHaveLength(100);
    expect(new Set(R050_TEN_GOD_PAIR_MATRIX.map((x) => `${x.from}->${x.to}`)).size).toBe(100);
  });

  it('keeps family-level evidence distinct from exact-member verification', () => {
    const counts = R050_TEN_GOD_PAIR_MATRIX.reduce(
      (acc, x) => {
        acc[x.evidenceStatus] += 1;
        return acc;
      },
      {
        FAMILY_LEVEL_EVIDENCE: 0,
        EXACT_MEMBER_INTERSECTION: 0,
        UNRESOLVED: 0,
      },
    );
    expect(counts).toEqual({
      FAMILY_LEVEL_EVIDENCE: 20,
      EXACT_MEMBER_INTERSECTION: 2,
      UNRESOLVED: 78,
    });

    const foodToProperWealth = R050_TEN_GOD_PAIR_MATRIX.find(
      (x) => x.from === '식신' && x.to === '정재',
    );
    expect(foodToProperWealth).toEqual(expect.objectContaining({
      evidenceStatus: 'FAMILY_LEVEL_EVIDENCE',
      relationKind: 'GENERATES',
      directionality: 'DIRECTED',
      executable: false,
    }));
    expect(foodToProperWealth?.prerequisites).toContain('MEMBER_LEVEL_SEMANTICS_NOT_ESTABLISHED');
  });

  it('preserves the exact Gyeopjae intersection and leaves Bijeon unresolved', () => {
    for (const wealth of ['편재', '정재'] as const) {
      expect(R050_TEN_GOD_PAIR_MATRIX.find((x) => x.from === '겁재' && x.to === wealth))
        .toEqual(expect.objectContaining({
          evidenceStatus: 'EXACT_MEMBER_INTERSECTION',
          relationKind: 'ADVERSE_TO',
          directionality: 'DIRECTED',
          executable: false,
        }));

      expect(R050_TEN_GOD_PAIR_MATRIX.find((x) => x.from === '비견' && x.to === wealth))
        .toEqual(expect.objectContaining({
          evidenceStatus: 'UNRESOLVED',
          relationKind: 'UNRESOLVED',
          executable: false,
        }));
    }
  });

  it('represents wealth/resource conflict as a symmetric family envelope', () => {
    const forward = R050_TEN_GOD_PAIR_MATRIX.find((x) => x.from === '정재' && x.to === '정인');
    const reverse = R050_TEN_GOD_PAIR_MATRIX.find((x) => x.from === '정인' && x.to === '정재');
    expect(forward).toEqual(expect.objectContaining({
      evidenceStatus: 'FAMILY_LEVEL_EVIDENCE',
      relationKind: 'CONFLICTS_WITH',
      directionality: 'SYMMETRIC',
    }));
    expect(reverse).toEqual(expect.objectContaining({
      evidenceStatus: 'FAMILY_LEVEL_EVIDENCE',
      relationKind: 'CONFLICTS_WITH',
      directionality: 'SYMMETRIC',
    }));
  });

  it('keeps every row non-executable and refuses semantic promotion', () => {
    expect(R050_TEN_GOD_PAIR_MATRIX.every((x) => x.executable === false)).toBe(true);
    expect(R050_AUTHORITY).toEqual({
      status: 'EXHAUSTIVE_INVENTORY_ONLY',
      orderedPairCount: 100,
      familyLevelEvidenceCount: 20,
      exactMemberIntersectionCount: 2,
      unresolvedCount: 78,
      missingEvidenceMeansNoRelation: false,
      familyEvidencePromotesExactMemberSemantics: false,
      presenceOnlyPolarityAuthorized: false,
      executableRelationResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
