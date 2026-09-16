import { describe, expect, test } from 'vitest';
import * as authorityModule from '../src/research/general-natal-yin-changsheng-minggen-source-strata-conflict-authority.js';
import {
  GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA,
  GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_AUTHORITY,
  GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_DECISION,
  GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_UNAUTHORIZED_DERIVATIONS,
} from '../src/research/general-natal-yin-changsheng-minggen-source-strata-conflict-authority.js';
import {
  GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_DEFINITION_HASH,
  GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_VERSION,
} from '../src/research/general-natal-changsheng-root-weight-binding-authority.js';
import {
  GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_DEFINITION_HASH,
  GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_VERSION,
} from '../src/research/general-natal-bounded-sizhu-four-yang-lu-root-presence-authority.js';

describe('Yin 長生 明根 source-strata conflict authority review', () => {
  test('records the classical Minggen statement separately from the commentary objection', () => {
    expect(GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_DECISION).toBe(
      'UNRESOLVED',
    );
    expect(GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA).toEqual([
      {
        id: 'classical_yin_changsheng_minggen_statement',
        stratum: 'classical_root_clause',
        observation: '陰長生不作此論，如乙逢午、丁逢酉之類，然亦為明根，比得一餘氣。',
        semanticDisposition: 'asserts_minggen_while_excluding_heavy_changsheng_treatment',
      },
      {
        id: 'commentary_yin_changsheng_root_objection',
        stratum: 'commentary',
        observation:
          '至於陰長生，既雲不作此論，又雲亦為有根，可比一餘氣云云，實未明生旺墓絕之理，不免矛盾。木至午，火至酉，皆為死地，豈得為根？',
        semanticDisposition: 'explicitly_objects_to_the_preceding_root_claim',
      },
    ]);
  });

  test('makes the source-strata conflict explicit without assigning precedence', () => {
    const authority = GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_AUTHORITY;

    expect(authority.classicalYinChangshengMinggenStatementObserved).toBe(true);
    expect(authority.classicalYinChangshengYuqiComparisonObserved).toBe(true);
    expect(authority.commentaryYinChangshengRootObjectionObserved).toBe(true);
    expect(authority.sourceStrataConflictObserved).toBe(true);
    expect(authority.sourceStrataPrecedenceRuleAvailable).toBe(false);
    expect(authority.sourceStrataResolutionState).toBe('UNRESOLVED');
  });

  test('exports no executable classifier or chart evaluator', () => {
    const exportedFunctions = Object.entries(authorityModule)
      .filter(([, value]) => typeof value === 'function')
      .map(([name]) => name);

    expect(exportedFunctions).toEqual([]);
  });

  test('pins the exact upstream Changsheng and bounded Sizhu authority definitions', () => {
    const authority = GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_AUTHORITY;

    expect(authority.upstreamChangshengVersion).toBe(
      GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_VERSION,
    );
    expect(authority.upstreamChangshengDefinitionHash).toBe(
      GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_DEFINITION_HASH,
    );
    expect(authority.upstreamBoundedSizhuVersion).toBe(
      GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_VERSION,
    );
    expect(authority.upstreamBoundedSizhuDefinitionHash).toBe(
      GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_DEFINITION_HASH,
    );
  });

  test('preserves the upstream Yin Changsheng heavy-root exclusion only', () => {
    const authority = GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_AUTHORITY;

    expect(authority.upstreamYinChangshengHeavyRootExclusionAuthorizedResearchOnly).toBe(true);
    expect(authority.upstreamYinChangshengMinggenSemanticObserved).toBe(true);
    expect(authority.yinChangshengMinggenClassifierAuthorized).toBe(false);
    expect(authority.yinChangshengYuqiEquivalenceAuthorized).toBe(false);
    expect(authority.yinChangshengPositiveRootPresenceAuthorized).toBe(false);
    expect(authority.yinChangshengNoRootAuthorized).toBe(false);
    expect(authority.yinChangshengToBoundedSizhuRootPresenceAuthorized).toBe(false);
  });

  test('keeps Sizhu settlement, weighting, strength, Gyeokguk, and production fail-closed', () => {
    const authority = GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_AUTHORITY;

    expect(authority.canonicalSizhuHasRootResolverAuthorized).toBe(false);
    expect(authority.rootEvidenceToSizhuHasRootSettlementAuthorized).toBe(false);
    expect(authority.noBoundedEvidenceToSizhuNoRootAuthorized).toBe(false);
    expect(authority.rootObservationCountSemanticsAuthorized).toBe(false);
    expect(authority.rootPositionWeightingAuthorized).toBe(false);
    expect(authority.dangZhongCounterAuthorized).toBe(false);
    expect(authority.zhuGuaCounterAuthorized).toBe(false);
    expect(authority.chartLevelQiangRuoClassifierAuthorized).toBe(false);
    expect(authority.chartLevelWangShuaiClassifierAuthorized).toBe(false);
    expect(authority.numericStrengthAuthorized).toBe(false);
    expect(authority.nonNumericStrengthScalarAuthorized).toBe(false);
    expect(authority.generalizedRootWeightClassifierAuthorized).toBe(false);
    expect(authority.ordinaryStrengthClassificationAuthorized).toBe(false);
    expect(authority.candidateDerivationAuthorized).toBe(false);
    expect(authority.establishmentPredicateAuthorized).toBe(false);
    expect(authority.candidateFactsEmitted).toBe(false);
    expect(authority.establishmentFactsEmitted).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);
  });

  test('forbids collapsing either source stratum into an executable result', () => {
    expect(
      GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_UNAUTHORIZED_DERIVATIONS,
    ).toContain('classical_minggen_statement_to_executable_positive_root_presence');
    expect(
      GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_UNAUTHORIZED_DERIVATIONS,
    ).toContain('commentary_root_objection_to_executable_no_root');
    expect(
      GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_UNAUTHORIZED_DERIVATIONS,
    ).toContain('yin_changsheng_yuqi_comparison_to_yuqi_equivalence');
    expect(
      GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_UNAUTHORIZED_DERIVATIONS,
    ).toContain('source_stratum_precedence_by_editorial_preference');
    expect(
      GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_UNAUTHORIZED_DERIVATIONS,
    ).toContain('root_evidence_to_production_fact');
  });
});
