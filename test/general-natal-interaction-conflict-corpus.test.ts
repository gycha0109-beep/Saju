import { describe, expect, it } from 'vitest';
import {
  R059_AUTHORITY,
  R059_COVERAGE,
  R059_DIRECT_CASES,
  R059_EXECUTION_GAPS,
  R059_INTERACTION_CONFLICT_CORPUS_VERSION,
} from '../src/research/general-natal-interaction-conflict-corpus.js';

describe('R059 interaction conflict-case corpus', () => {
  it('preserves the direct bidirectional resolution counterexamples', () => {
    expect(R059_INTERACTION_CONFLICT_CORPUS_VERSION).toBe('0.1.0-research');
    expect(R059_DIRECT_CASES).toHaveLength(6);
    expect(R059_DIRECT_CASES).toEqual(expect.arrayContaining([
      expect.objectContaining({
        actor: 'MEETING',
        target: 'CLASH',
        boundedResult: 'RESOLVES',
      }),
      expect.objectContaining({
        actor: 'CLASH',
        target: 'MEETING',
        boundedResult: 'RESOLVES',
      }),
      expect.objectContaining({
        actor: 'COMBINATION',
        target: 'CLASH',
        boundedResult: 'RESOLVES',
      }),
    ]));
  });

  it('keeps reactivation and ineffective-match cases explicit', () => {
    expect(R059_DIRECT_CASES).toEqual(expect.arrayContaining([
      expect.objectContaining({
        boundedResult: 'CAN_REACTIVATE',
        generalizedPrecedenceAuthorized: false,
      }),
      expect.objectContaining({
        boundedResult: 'MAY_BE_INEFFECTIVE',
        generalizedPrecedenceAuthorized: false,
      }),
    ]));
    expect(R059_DIRECT_CASES.every((x) => x.executable === false)).toBe(true);
  });

  it('does not fabricate harm/break precedence coverage', () => {
    expect(R059_COVERAGE).toEqual({
      directConflictCaseCoverage: ['COMBINATION', 'MEETING', 'CLASH', 'PUNISHMENT'],
      harmConflictCaseCoverage: 'INSUFFICIENT',
      breakConflictCaseCoverage: 'INSUFFICIENT',
      totalOrderingAuthorized: false,
      firstMatchWinsAuthorized: false,
      numericWeightAuthorized: false,
    });
  });

  it('keeps settlement and missing conflict families unresolved', () => {
    expect(R059_EXECUTION_GAPS).toContain('MULTIPLE_RELATION_SETTLEMENT');
    expect(R059_EXECUTION_GAPS).toContain('HAI_CONFLICT_CASES');
    expect(R059_EXECUTION_GAPS).toContain('PO_CONFLICT_CASES');
    expect(R059_EXECUTION_GAPS).toContain('CROSS_RELATION_PRECEDENCE');
  });

  it('does not promote a universal or Production resolver', () => {
    expect(R059_AUTHORITY).toEqual({
      status: 'VERIFIED_NONUNIVERSAL_CONFLICT_CASE_CORPUS',
      directCaseCount: 6,
      universalPrecedenceAuthorized: false,
      totalOrderAuthorized: false,
      executableConflictResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
