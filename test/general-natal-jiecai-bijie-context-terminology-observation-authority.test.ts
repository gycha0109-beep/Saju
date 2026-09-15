import { describe, expect, test } from 'vitest';
import * as authorityModule from '../src/research/general-natal-jiecai-bijie-context-terminology-observation-authority.js';
import {
  GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_CANONICAL_REPRESENTABILITY,
  GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_SOURCE_TEXT,
  GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_AUTHORITY,
  GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_DECISION,
  GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_OBSERVATIONS,
  GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_SOURCE,
  GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_UNAUTHORIZED_DERIVATIONS,
} from '../src/research/general-natal-jiecai-bijie-context-terminology-observation-authority.js';
import {
  GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_DEFINITION_HASH,
  GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_VERSION,
} from '../src/research/general-natal-jia-yi-jiecai-exact-relation-authority.js';
import {
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH,
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION,
} from '../src/research/general-natal-dang-zhong-zhu-gua-context-observation-authority.js';

describe('Jie-Cai / Bi-Jie same-context terminology observation authority', () => {
  test('preserves exactly one immutable selected-source observation', () => {
    expect(GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_DECISION).toBe(
      'AUTHORIZED_OBSERVATION_ONLY',
    );
    expect(GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_SOURCE.section).toBe(
      '論十干合而不合',
    );
    expect(GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_OBSERVATIONS).toHaveLength(1);
    expect(Object.isFrozen(GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_OBSERVATIONS)).toBe(
      true,
    );
    expect(Object.isFrozen(GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_OBSERVATIONS[0])).toBe(
      true,
    );
  });

  test('retains 劫財重重 and the later 比劫 reference in the same source sentence', () => {
    const observation = GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_OBSERVATIONS[0];
    expect(GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_SOURCE_TEXT).toContain('劫財重重');
    expect(GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_SOURCE_TEXT).toContain('制住比劫');
    expect(observation.sourceContextLeadTerm).toBe('劫財重重');
    expect(observation.sourceContextLaterTerm).toBe('比劫');
    expect(observation.sameSentence).toBe(true);
    expect(observation.sameExample).toBe(true);
    expect(observation.contextualTerminologyRelationObserved).toBe(true);
    expect(observation.globalAliasAuthorized).toBe(false);
    expect(observation.subsetOntologyAuthorized).toBe(false);
    expect(observation.executableMappingAuthorized).toBe(false);
  });

  test('requires no canonical input and exports no executable chart matcher', () => {
    expect(GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_CANONICAL_REPRESENTABILITY).toEqual({
      canonicalInputRequired: false,
      chartFactsConsumed: false,
      tenGodFactsConsumed: false,
      stemFactsConsumed: false,
      branchFactsConsumed: false,
      hiddenStemFactsConsumed: false,
      status: 'NOT_REQUIRED_FOR_OBSERVATION_ONLY',
    });
    expect(Object.values(authorityModule).some((value) => typeof value === 'function')).toBe(false);
  });

  test('pins upstream authority and keeps all semantic escalation fail-closed', () => {
    const authority = GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_AUTHORITY;
    expect(authority.upstreamJiaYiJiecaiVersion).toBe(
      GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_VERSION,
    );
    expect(authority.upstreamJiaYiJiecaiDefinitionHash).toBe(
      GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_DEFINITION_HASH,
    );
    expect(authority.upstreamDangZhongContextVersion).toBe(
      GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION,
    );
    expect(authority.upstreamDangZhongContextDefinitionHash).toBe(
      GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH,
    );
    expect(authority.globalJiecaiBijieAliasAuthorized).toBe(false);
    expect(authority.jiecaiSubsetOfBijieOntologyAuthorized).toBe(false);
    expect(authority.canonicalGyeopjaeToBijieMappingAuthorized).toBe(false);
    expect(authority.jiecaiToDangZhongSupportConstituentAuthorized).toBe(false);
    expect(authority.jiecaiCounterAuthorized).toBe(false);
    expect(authority.dangZhongCounterAuthorized).toBe(false);
    expect(authority.dangZhongBooleanResolverAuthorized).toBe(false);
    expect(authority.zhuGuaCounterAuthorized).toBe(false);
    expect(authority.chartLevelQiangRuoClassifierAuthorized).toBe(false);
    expect(authority.chartLevelWangShuaiClassifierAuthorized).toBe(false);
    expect(authority.numericStrengthAuthorized).toBe(false);
    expect(authority.nonNumericStrengthScalarAuthorized).toBe(false);
    expect(authority.candidateDerivationAuthorized).toBe(false);
    expect(authority.establishmentPredicateAuthorized).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);
    expect(GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_UNAUTHORIZED_DERIVATIONS).toContain(
      'jiecai_equals_bijie_global_alias',
    );
    expect(GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_UNAUTHORIZED_DERIVATIONS).toContain(
      'canonical_gyeopjae_to_dang_zhong_support_constituent',
    );
  });
});
