import { describe, expect, it } from 'vitest';
import {
  R066_AUTHORITY,
  R066_CONDITION_CLAIMS,
  R066_EXECUTION_GAPS,
  R066_REJECTED_SHORTCUTS,
  R066_SEMANTIC_CLASSES,
  R066_WEALTH_CLAIM_CORPUS_VERSION,
} from '../src/research/general-natal-wealth-claim-corpus.js';

describe('R066 wealth interpretation claim corpus', () => {
  it('preserves multiple direct semantic classes', () => {
    expect(R066_WEALTH_CLAIM_CORPUS_VERSION).toBe('0.1.0-research');
    expect(R066_SEMANTIC_CLASSES).toEqual([
      'MATERIAL_WEALTH',
      'SPOUSE_WIFE_CONCUBINE',
      'ABILITY_CAPABILITY',
      'TRAVEL_HORSE_ASSOCIATION',
    ]);
  });

  it('keeps beneficial wealth interpretation condition-bound', () => {
    expect(R066_CONDITION_CLAIMS).toHaveLength(3);
    expect(R066_CONDITION_CLAIMS.every(
      (x) => x.beneficialOutcomeAutomatic === false && x.executable === false,
    )).toBe(true);
  });

  it('rejects naive modern money/income mappings', () => {
    expect(R066_REJECTED_SHORTCUTS).toContain('WEALTH_PRESENT_IMPLIES_RICH');
    expect(R066_REJECTED_SHORTCUTS).toContain('ZHENGCAI_EQUALS_SALARY_STABLE_INCOME');
    expect(R066_REJECTED_SHORTCUTS).toContain('PIANCAI_EQUALS_INVESTING_SPECULATION_BUSINESS');
  });

  it('keeps semantic selection and modern outcome mapping unresolved', () => {
    expect(R066_EXECUTION_GAPS).toContain('WEALTH_SEMANTIC_SELECTION');
    expect(R066_EXECUTION_GAPS).toContain('MODERN_INCOME_MAPPING');
    expect(R066_EXECUTION_GAPS).toContain('OUTCOME_SETTLEMENT');
  });

  it('keeps the frontier research-only', () => {
    expect(R066_AUTHORITY).toEqual({
      status: 'VERIFIED_MULTI_SEMANTIC_CONDITION_BOUND_CORPUS',
      semanticClassCount: 4,
      conditionClaimCount: 3,
      presenceImpliesRich: false,
      modernIncomeMappingAuthorized: false,
      executableWealthClassifierAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
