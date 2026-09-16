import { describe, expect, test } from 'vitest';
import * as authorityModule from '../src/research/general-natal-bijie-without-tonggen-weak-context-observation-authority.js';
import {
  GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_FLOATING_SOURCE_TEXT,
  GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_AUTHORITY,
  GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_CANONICAL_REPRESENTABILITY,
  GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_DECISION,
  GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_OBSERVATIONS,
  GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_UNAUTHORIZED_DERIVATIONS,
  GENERAL_NATAL_FOUR_XIN_MAO_FOUR_BING_SHEN_WEAK_SOURCE_TEXT,
} from '../src/research/general-natal-bijie-without-tonggen-weak-context-observation-authority.js';
import {
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_DEFINITION_HASH,
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_VERSION,
} from '../src/research/general-natal-muku-yuqi-bounded-tonggen-authority.js';
import {
  GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_DEFINITION_HASH,
  GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_VERSION,
} from '../src/research/general-natal-tonggen-dang-zhong-support-constituent-authority.js';

describe('Bi-Jie assistance without Tonggen weak-context observation authority', () => {
  test('preserves exactly four immutable source-side observations', () => {
    expect(GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_DECISION).toBe(
      'AUTHORIZED_OBSERVATION_ONLY',
    );
    expect(GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_OBSERVATIONS).toHaveLength(4);
    expect(Object.isFrozen(GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_OBSERVATIONS)).toBe(true);
    for (const observation of GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_OBSERVATIONS) {
      expect(Object.isFrozen(observation)).toBe(true);
      expect(observation.executablePredicateAuthorized).toBe(false);
    }
  });

  test('retains the exact floating and weak-example source anchors', () => {
    expect(GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_FLOATING_SOURCE_TEXT).toContain('有比劫之助而不通根');
    expect(GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_FLOATING_SOURCE_TEXT).toContain('浮而不實');
    expect(GENERAL_NATAL_FOUR_XIN_MAO_FOUR_BING_SHEN_WEAK_SOURCE_TEXT).toContain('四辛卯，金不通根');
    expect(GENERAL_NATAL_FOUR_XIN_MAO_FOUR_BING_SHEN_WEAK_SOURCE_TEXT).toContain('四丙申，火不通根');
    expect(GENERAL_NATAL_FOUR_XIN_MAO_FOUR_BING_SHEN_WEAK_SOURCE_TEXT).toContain('仍作弱論');
  });

  test('requires no canonical input and exports no matcher or evaluator function', () => {
    expect(GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_CANONICAL_REPRESENTABILITY).toEqual({
      canonicalInputRequired: false,
      chartFactsConsumed: false,
      tonggenEvaluationConsumed: false,
      tenGodFactsConsumed: false,
      stemFactsConsumed: false,
      branchFactsConsumed: false,
      hiddenStemFactsConsumed: false,
      status: 'NOT_REQUIRED_FOR_OBSERVATION_ONLY',
    });
    expect(Object.values(authorityModule).some((value) => typeof value === 'function')).toBe(false);
  });

  test('pins both Tonggen authorities without converting bounded no-evidence into a negative root verdict', () => {
    const authority = GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_AUTHORITY;
    expect(authority.upstreamBoundedTonggenVersion).toBe(
      GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_VERSION,
    );
    expect(authority.upstreamBoundedTonggenDefinitionHash).toBe(
      GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_DEFINITION_HASH,
    );
    expect(authority.upstreamTonggenSupportConstituentVersion).toBe(
      GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_VERSION,
    );
    expect(authority.upstreamTonggenSupportConstituentDefinitionHash).toBe(
      GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_DEFINITION_HASH,
    );
    expect(authority.canonicalNotTonggenResolverAuthorized).toBe(false);
    expect(authority.boundedNoEvidenceToNotTonggenAuthorized).toBe(false);
    expect(authority.absenceOfBoundedTonggenToWeakAuthorized).toBe(false);
    expect(GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_UNAUTHORIZED_DERIVATIONS).toContain(
      'bounded_no_tonggen_evidence_to_not_tonggen',
    );
    expect(GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_UNAUTHORIZED_DERIVATIONS).toContain(
      'bounded_no_tonggen_evidence_to_weak',
    );
  });

  test('keeps all strength, establishment, and production escalation closed', () => {
    const authority = GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_AUTHORITY;
    expect(authority.directSourceBijieWithoutTonggenFloatingContextObserved).toBe(true);
    expect(authority.directSourceFourXinMaoWeakExampleObserved).toBe(true);
    expect(authority.directSourceFourBingShenWeakExampleObserved).toBe(true);
    expect(authority.bijieCountToWeakAuthorized).toBe(false);
    expect(authority.exactFourXinMaoMatcherAuthorized).toBe(false);
    expect(authority.exactFourBingShenMatcherAuthorized).toBe(false);
    expect(authority.dangZhongCounterAuthorized).toBe(false);
    expect(authority.zhuGuaCounterAuthorized).toBe(false);
    expect(authority.tonggenToBuRuoAuthorized).toBe(false);
    expect(authority.chartLevelQiangRuoClassifierAuthorized).toBe(false);
    expect(authority.chartLevelWangShuaiClassifierAuthorized).toBe(false);
    expect(authority.numericStrengthAuthorized).toBe(false);
    expect(authority.nonNumericStrengthScalarAuthorized).toBe(false);
    expect(authority.ordinaryStrengthClassificationAuthorized).toBe(false);
    expect(authority.candidateDerivationAuthorized).toBe(false);
    expect(authority.establishmentPredicateAuthorized).toBe(false);
    expect(authority.candidateFactsEmitted).toBe(false);
    expect(authority.establishmentFactsEmitted).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);
  });
});
