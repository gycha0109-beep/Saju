import { describe, expect, test } from 'vitest';
import * as authorityModule from '../src/research/general-natal-xi-yong-ji-shen-scope-observation-authority.js';
import {
  GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_AUTHORITY,
  GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_CANONICAL_REPRESENTABILITY,
  GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_DECISION,
  GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_EXTENDED_TARGETS,
  GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_OBSERVATIONS,
  GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_SOURCE_TEXT,
  GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_UNAUTHORIZED_DERIVATIONS,
} from '../src/research/general-natal-xi-yong-ji-shen-scope-observation-authority.js';
import {
  GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_DEFINITION_HASH,
  GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_VERSION,
} from '../src/research/general-natal-wang-shuai-qiang-ruo-semantic-axis-authority.js';

describe('Xi/Yong/Ji-Shen semantic-axis scope observation authority', () => {
  test('preserves exactly one immutable direct-source scope statement', () => {
    expect(GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_DECISION).toBe(
      'AUTHORIZED_OBSERVATION_ONLY',
    );
    expect(GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_OBSERVATIONS).toHaveLength(1);
    expect(Object.isFrozen(GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_OBSERVATIONS)).toBe(true);
    expect(Object.isFrozen(GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_OBSERVATIONS[0])).toBe(true);
    expect(GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_SOURCE_TEXT).toBe(
      '不特日主如此，喜用忌神皆同此論。',
    );
  });

  test('retains the source-side baseline and extended targets without resolving chart roles', () => {
    const observation = GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_OBSERVATIONS[0];
    expect(observation.sourceSubjectBaseline).toBe('日主');
    expect(observation.sourceExtendedTargets).toBe(
      GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_EXTENDED_TARGETS,
    );
    expect([...observation.sourceExtendedTargets]).toEqual(['喜', '用', '忌神']);
    expect(observation.sourceScopePhrase).toBe('不特日主如此，喜用忌神皆同此論');
    expect(observation.scopeExtensionObserved).toBe(true);
    expect(observation.executableRoleResolverAuthorized).toBe(false);
  });

  test('requires no canonical input and exports no executable chart resolver', () => {
    expect(GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_CANONICAL_REPRESENTABILITY).toEqual({
      canonicalInputRequired: false,
      chartFactsConsumed: false,
      canonicalXiShenResolverAuthorized: false,
      canonicalYongShenResolverAuthorized: false,
      canonicalJiShenResolverAuthorized: false,
      status: 'NOT_REQUIRED_FOR_OBSERVATION_ONLY',
    });
    expect(Object.values(authorityModule).some((value) => typeof value === 'function')).toBe(false);
  });

  test('pins the governed semantic-axis authority without extending it', () => {
    expect(GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_AUTHORITY.upstreamSemanticAxisVersion).toBe(
      GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_VERSION,
    );
    expect(
      GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_AUTHORITY.upstreamSemanticAxisDefinitionHash,
    ).toBe(GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_DEFINITION_HASH);
  });

  test('keeps methodology selection, chart classification, and production fail-closed', () => {
    const authority = GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_AUTHORITY;
    expect(authority.canonicalXiShenResolverAuthorized).toBe(false);
    expect(authority.canonicalYongShenResolverAuthorized).toBe(false);
    expect(authority.canonicalJiShenResolverAuthorized).toBe(false);
    expect(authority.yongShenMethodologySelectionAuthorized).toBe(false);
    expect(authority.sourceScopeToChartRoleAssignmentAuthorized).toBe(false);
    expect(authority.chartLevelWangShuaiClassifierAuthorized).toBe(false);
    expect(authority.chartLevelQiangRuoClassifierAuthorized).toBe(false);
    expect(authority.numericStrengthAuthorized).toBe(false);
    expect(authority.nonNumericStrengthScalarAuthorized).toBe(false);
    expect(authority.generalizedRootWeightClassifierAuthorized).toBe(false);
    expect(authority.ordinaryStrengthClassificationAuthorized).toBe(false);
    expect(authority.candidateDerivationAuthorized).toBe(false);
    expect(authority.establishmentPredicateAuthorized).toBe(false);
    expect(authority.candidateFactsEmitted).toBe(false);
    expect(authority.establishmentFactsEmitted).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);

    expect(GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_UNAUTHORIZED_DERIVATIONS).toContain(
      'source_scope_to_yong_shen_methodology_selection',
    );
    expect(GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_UNAUTHORIZED_DERIVATIONS).toContain(
      'cross_source_yong_shen_methodology_stitching',
    );
    expect(GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_UNAUTHORIZED_DERIVATIONS).toContain(
      'source_scope_to_production_fact',
    );
  });
});
