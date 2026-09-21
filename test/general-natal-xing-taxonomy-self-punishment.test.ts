import { describe, expect, it } from 'vitest';
import {
  R056_AUTHORITY,
  R056_DIRECTED_XING_RELATIONS,
  R056_EXECUTION_GAPS,
  R056_SELF_XING_BRANCHES,
  R056_TAXONOMY_LABEL_BOUNDARY,
  R056_XING_TAXONOMY_VERSION,
} from '../src/research/general-natal-xing-taxonomy-self-punishment.js';

describe('R056 Xing taxonomy and self-punishment', () => {
  it('preserves the directed non-self structural relations', () => {
    expect(R056_XING_TAXONOMY_VERSION).toBe('0.1.0-research');
    expect(R056_DIRECTED_XING_RELATIONS).toHaveLength(8);
    expect(R056_DIRECTED_XING_RELATIONS).toEqual(expect.arrayContaining([
      { from: '子', to: '卯', family: 'ZI_MAO_RECIPROCAL' },
      { from: '卯', to: '子', family: 'ZI_MAO_RECIPROCAL' },
      { from: '寅', to: '巳', family: 'YIN_SI_SHEN' },
      { from: '巳', to: '申', family: 'YIN_SI_SHEN' },
      { from: '申', to: '寅', family: 'YIN_SI_SHEN' },
      { from: '丑', to: '戌', family: 'CHOU_XU_WEI' },
      { from: '戌', to: '未', family: 'CHOU_XU_WEI' },
      { from: '未', to: '丑', family: 'CHOU_XU_WEI' },
    ]));
  });

  it('records exactly four same-branch self-punishment members without automatic harm', () => {
    expect(R056_SELF_XING_BRANCHES.map((x) => x.branch)).toEqual(['辰', '午', '酉', '亥']);
    expect(R056_SELF_XING_BRANCHES.every(
      (x) => x.observedStructuralForm === 'SAME_BRANCH_REPETITION' &&
        x.automaticHarmAuthorized === false,
    )).toBe(true);
  });

  it('keeps disputed explanatory labels source-stratified', () => {
    expect(R056_TAXONOMY_LABEL_BOUNDARY).toEqual({
      structuralMemberRelationsCrossSourceObserved: true,
      explanatoryClassLabelsCrossSourceUnified: false,
      unqualifiedWuenOrShishiCanonicalMappingAuthorized: false,
    });
  });

  it('keeps effect and activation semantics unresolved', () => {
    expect(R056_EXECUTION_GAPS).toContain('XING_CONTEXT_EFFECT');
    expect(R056_EXECUTION_GAPS).toContain('SELF_XING_MULTIPLICITY');
    expect(R056_EXECUTION_GAPS).toContain('SOURCE_STRATUM_LABEL_RECONCILIATION');
  });

  it('does not promote harm, severity, executable, or Production authority', () => {
    expect(R056_AUTHORITY).toEqual({
      status: 'VERIFIED_STRUCTURAL_TAXONOMY_ONLY',
      directedNonSelfRelationCount: 8,
      selfXingBranchCount: 4,
      structuralPresenceImpliesHarm: false,
      selfXingImpliesHarm: false,
      numericSeverityAuthorized: false,
      executableEffectResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
