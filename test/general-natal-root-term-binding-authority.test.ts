import { describe, expect, test } from 'vitest';
import { GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_AUTHORITY as authority } from '../src/research/general-natal-root-term-binding-authority.js';

describe('General Natal root term binding authority', () => {
  test('keeps the governed boundary fail-closed', () => {
    expect(authority.decision).toBe('AUTHORIZED_RESEARCH_ONLY');
    expect(authority.directSourceLuLinguanTermEquivalenceObserved).toBe(true);
    expect(authority.directSourceBoundedJiaYiLuExamplesObserved).toBe(true);
    expect(authority.sourceInternalYinLuInterpretation).toBe('AMBIGUOUS');
    expect(authority.boundedJiaYiExamplesPromotedToGeneralMapping).toBe(false);
    expect(authority.foreignStageMappingConsumedAsLuInput).toBe(false);
    expect(authority.crossTraditionCompositionAuthorized).toBe(false);
    expect(authority.selectedSourceCompleteLuBranchMatcherAuthorized).toBe(false);
    expect(authority.generalizedRootWeightClassifierAuthorized).toBe(false);
    expect(authority.numericStrengthAuthorized).toBe(false);
    expect(authority.ordinaryStrengthClassificationAuthorized).toBe(false);
    expect(authority.candidateFactsEmitted).toBe(false);
    expect(authority.establishmentFactsEmitted).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);
  });
});
