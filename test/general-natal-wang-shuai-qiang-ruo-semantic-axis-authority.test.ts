import { describe, expect, test } from 'vitest';
import * as semanticAxisModule from '../src/research/general-natal-wang-shuai-qiang-ruo-semantic-axis-authority.js';
import {
  GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_AXIS_DISTINCTION,
  GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_CONTEXT_OBSERVATIONS,
  GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_AUTHORITY,
  GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_DEFINITION_HASH,
  GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SOURCE_OBSERVATIONS,
} from '../src/research/general-natal-wang-shuai-qiang-ruo-semantic-axis-authority.js';
import {
  GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW,
  GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
} from '../src/research/general-natal-geju-root-weight-classification-primitive-authority-review.js';

describe('General Natal Wang/Shuai vs Qiang/Ruo semantic-axis authority', () => {
  test('records the direct source distinction between 旺衰 and 強弱', () => {
    expect(GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_AXIS_DISTINCTION).toEqual({
      id: 'wang_shuai_and_qiang_ruo_must_be_distinguished',
      sourceText: '旺衰強弱四字，昔人論命，每籠統互用，不知須分別看也',
      authority: 'direct_source_semantic',
    });
    expect(
      GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_AUTHORITY.directSourceWangShuaiQiangRuoDistinctionObserved,
    ).toBe(true);
    expect(
      GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_AUTHORITY.semanticAxisRegistryAuthorizedObservationOnly,
    ).toBe(true);
  });

  test('preserves exactly six source-stated relation and coexistence observations', () => {
    expect(GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SOURCE_OBSERVATIONS).toHaveLength(6);
    expect(
      GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SOURCE_OBSERVATIONS.map((observation) => ({
        id: observation.id,
        subject: observation.subject,
        relation: observation.relation,
        object: observation.object,
      })),
    ).toEqual([
      {
        id: 'de_shi_to_wang_general_relation',
        subject: '得時',
        relation: 'source_stated_general_relation',
        object: '旺',
      },
      {
        id: 'shi_shi_to_shuai_general_relation',
        subject: '失時',
        relation: 'source_stated_general_relation',
        object: '衰',
      },
      {
        id: 'dang_zhong_to_qiang_general_relation',
        subject: '黨眾',
        relation: 'source_stated_general_relation',
        object: '強',
      },
      {
        id: 'zhu_gua_to_ruo_general_relation',
        subject: '助寡',
        relation: 'source_stated_general_relation',
        object: '弱',
      },
      {
        id: 'wang_but_ruo_possible',
        subject: '旺',
        relation: 'may_coexist_with',
        object: '弱',
      },
      {
        id: 'shuai_but_qiang_possible',
        subject: '衰',
        relation: 'may_coexist_with',
        object: '強',
      },
    ]);
    expect(GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_AUTHORITY.sourceObservationCount).toBe(
      6,
    );
  });

  test('records context sensitivity and pins the upstream root-weight authority identity', () => {
    expect(GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_CONTEXT_OBSERVATIONS).toHaveLength(2);
    expect(
      GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_AUTHORITY.directSourceContextSensitivityObserved,
    ).toBe(true);
    expect(
      GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_AUTHORITY.upstreamRootWeightReviewVersion,
    ).toBe(GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW.reviewVersion);
    expect(
      GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_AUTHORITY.upstreamRootWeightReviewDefinitionHash,
    ).toBe(GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH);
    expect(GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_DEFINITION_HASH).toMatch(
      /^[0-9a-f]{64}$/,
    );
  });

  test('exports no chart classifier, matcher, or source-term counter', () => {
    expect('classifyWangShuai' in semanticAxisModule).toBe(false);
    expect('classifyQiangRuo' in semanticAxisModule).toBe(false);
    expect('evaluateOrdinaryStrength' in semanticAxisModule).toBe(false);
    expect('matchOrdinaryStrength' in semanticAxisModule).toBe(false);
    expect('countDangZhong' in semanticAxisModule).toBe(false);
    expect('countZhuGua' in semanticAxisModule).toBe(false);
    expect(GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_AUTHORITY.chartFactsConsumed).toBe(
      false,
    );
    expect(
      GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_AUTHORITY.chartLevelWangShuaiClassifierAuthorized,
    ).toBe(false);
    expect(
      GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_AUTHORITY.chartLevelQiangRuoClassifierAuthorized,
    ).toBe(false);
    expect(GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_AUTHORITY.dangZhongCounterAuthorized).toBe(
      false,
    );
    expect(GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_AUTHORITY.zhuGuaCounterAuthorized).toBe(
      false,
    );
  });

  test('keeps root, Twelve-Growth, hidden-stem, and strength bridges fail-closed', () => {
    const authority = GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_AUTHORITY;
    expect(authority.rootClassToQiangRuoEquivalenceAuthorized).toBe(false);
    expect(authority.twelveGrowthStageToOrdinaryStrengthAuthorized).toBe(false);
    expect(authority.hiddenStemStorageOrderToStrengthAuthorized).toBe(false);
    expect(authority.boundedRootComparisonToOrdinaryStrengthAuthorized).toBe(false);
    expect(authority.numericStrengthAuthorized).toBe(false);
    expect(authority.nonNumericStrengthScalarAuthorized).toBe(false);
    expect(authority.generalizedRootWeightClassifierAuthorized).toBe(false);
    expect(authority.ordinaryStrengthClassificationAuthorized).toBe(false);
  });

  test('keeps Gyeokguk and production escalation closed', () => {
    const authority = GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_AUTHORITY;
    expect(authority.candidateDerivationAuthorized).toBe(false);
    expect(authority.establishmentPredicateAuthorized).toBe(false);
    expect(authority.candidateFactsEmitted).toBe(false);
    expect(authority.establishmentFactsEmitted).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);
  });
});
