import { describe, expect, test } from 'vitest';
import * as authorityModule from '../src/research/general-natal-wang-changsheng-lu-bounded-tonggen-authority.js';
import {
  bindGovernedWangChangshengLuRootToBoundedTonggen,
  GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_AUTHORITY,
  GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_DECISION,
  GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_SOURCE_OBSERVATIONS,
  GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_UNAUTHORIZED_DERIVATIONS,
} from '../src/research/general-natal-wang-changsheng-lu-bounded-tonggen-authority.js';
import {
  evaluateCompleteWangHeavyRoot,
  GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_DEFINITION_HASH,
  GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_VERSION,
} from '../src/research/general-natal-earth-wang-heavy-root-completion-authority.js';
import {
  evaluateChangshengHeavyRootClause,
  GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_DEFINITION_HASH,
  GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_VERSION,
} from '../src/research/general-natal-changsheng-root-weight-binding-authority.js';
import {
  evaluateFourYangLuHeavyRoot,
  GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_DEFINITION_HASH,
  GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_VERSION,
} from '../src/research/general-natal-four-yang-lu-heavy-root-authority.js';
import {
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_DEFINITION_HASH,
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_VERSION,
} from '../src/research/general-natal-muku-yuqi-bounded-tonggen-authority.js';

describe('governed Wang / Yang Changsheng / four-Yang Lu bounded Tonggen authority', () => {
  test('records the direct selected-source class-to-Tonggen statements', () => {
    expect(GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_DECISION).toBe(
      'AUTHORIZED_RESEARCH_ONLY',
    );
    expect(GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_SOURCE_OBSERVATIONS).toEqual([
      {
        id: 'root_classes_in_tonggen_context',
        observation: '天干通根，不僅祿旺為美，長生、餘氣、墓庫皆其根也。',
        authority: 'direct_selected_source_tonggen_root_context',
      },
      {
        id: 'sheng_lu_wang_yuqi_mu_all_tonggen',
        observation: '月令休囚，而年日時支中，得生祿旺餘氣墓，皆為通根也。',
        authority: 'direct_selected_source_class_to_tonggen_statement',
      },
    ]);
  });

  test('admits governed non-Earth Wang as bounded Tonggen', () => {
    const upstream = evaluateCompleteWangHeavyRoot({ element: '목' }, '묘');
    const result = bindGovernedWangChangshengLuRootToBoundedTonggen({
      rootKind: '旺',
      evaluation: upstream,
    });

    expect(result).toMatchObject({
      state: 'bounded_tonggen_observed',
      requestedRootKind: '旺',
      upstreamState: 'wang_heavy_root_established',
      branch: '묘',
      sourceRootKind: '旺',
      tonggenObserved: true,
      globalNotTonggenEstablished: false,
      sizhuHasRootSettled: false,
    });
  });

  test('admits governed Earth Wang as bounded Tonggen without completing Earth Yuqi', () => {
    const upstream = evaluateCompleteWangHeavyRoot({ element: '토' }, '진');
    const result = bindGovernedWangChangshengLuRootToBoundedTonggen({
      rootKind: '旺',
      evaluation: upstream,
    });

    expect(result.state).toBe('bounded_tonggen_observed');
    expect(result.sourceRootKind).toBe('旺');
    expect(result.tonggenObserved).toBe(true);
    expect(GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_AUTHORITY.earthYuqiMappingResolved).toBe(
      false,
    );
  });

  test('admits governed Yang Changsheng as bounded Tonggen', () => {
    const upstream = evaluateChangshengHeavyRootClause(
      { value: '갑', yinYang: '양' },
      '해',
    );
    const result = bindGovernedWangChangshengLuRootToBoundedTonggen({
      rootKind: '長生',
      evaluation: upstream,
    });

    expect(upstream.heavyRootByChangshengClause).toBe('established');
    expect(result.state).toBe('bounded_tonggen_observed');
    expect(result.sourceRootKind).toBe('長生');
    expect(result.tonggenObserved).toBe(true);
  });

  test('preserves Yin Changsheng exception as unresolved rather than negative Tonggen', () => {
    const upstream = evaluateChangshengHeavyRootClause(
      { value: '을', yinYang: '음' },
      '오',
    );
    const result = bindGovernedWangChangshengLuRootToBoundedTonggen({
      rootKind: '長生',
      evaluation: upstream,
    });

    expect(upstream.heavyRootByChangshengClause).toBe('excluded_by_yin_exception');
    expect(result.state).toBe('unresolved_outside_governed_tonggen_scope');
    expect(result.tonggenObserved).toBe(false);
    expect(result.globalNotTonggenEstablished).toBe(false);
    expect(GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_AUTHORITY.yinChangshengToTonggenAuthorized).toBe(
      false,
    );
  });

  test('admits each governed four-Yang Lu positive as bounded Tonggen', () => {
    const pairs = [
      [{ value: '갑' as const }, '인' as const],
      [{ value: '병' as const }, '사' as const],
      [{ value: '경' as const }, '신' as const],
      [{ value: '임' as const }, '해' as const],
    ] as const;

    for (const [dayMaster, branch] of pairs) {
      const upstream = evaluateFourYangLuHeavyRoot(dayMaster, branch);
      const result = bindGovernedWangChangshengLuRootToBoundedTonggen({
        rootKind: '祿',
        evaluation: upstream,
      });

      expect(upstream.heavyRootState).toBe('lu_heavy_root_established');
      expect(result.state).toBe('bounded_tonggen_observed');
      expect(result.sourceRootKind).toBe('祿');
      expect(result.tonggenObserved).toBe(true);
    }
  });

  test('preserves Yin Lu outside scope as unresolved and does not consume class-neutral 乙 positive evidence', () => {
    const upstream = evaluateFourYangLuHeavyRoot({ value: '을' }, '묘');
    const result = bindGovernedWangChangshengLuRootToBoundedTonggen({
      rootKind: '祿',
      evaluation: upstream,
    });

    expect(upstream.heavyRootState).toBe('outside_governed_yang_non_earth_scope');
    expect(result.state).toBe('unresolved_outside_governed_tonggen_scope');
    expect(result.tonggenObserved).toBe(false);
    expect(result.globalNotTonggenEstablished).toBe(false);
    expect(GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_AUTHORITY.yinLuToTonggenAuthorized).toBe(
      false,
    );
    expect(
      GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_AUTHORITY.classNeutralJiaYiWoodObservationConsumed,
    ).toBe(false);
  });

  test('governed mismatches emit no bounded evidence and never global negative Tonggen', () => {
    const wang = bindGovernedWangChangshengLuRootToBoundedTonggen({
      rootKind: '旺',
      evaluation: evaluateCompleteWangHeavyRoot({ element: '목' }, '자'),
    });
    const changsheng = bindGovernedWangChangshengLuRootToBoundedTonggen({
      rootKind: '長生',
      evaluation: evaluateChangshengHeavyRootClause({ value: '갑', yinYang: '양' }, '묘'),
    });
    const lu = bindGovernedWangChangshengLuRootToBoundedTonggen({
      rootKind: '祿',
      evaluation: evaluateFourYangLuHeavyRoot({ value: '갑' }, '묘'),
    });

    for (const result of [wang, changsheng, lu]) {
      expect(result.state).toBe('no_bounded_tonggen_evidence');
      expect(result.tonggenObserved).toBe(false);
      expect(result.globalNotTonggenEstablished).toBe(false);
      expect(result.sizhuHasRootSettled).toBe(false);
    }
  });

  test('pins exact upstream versions and definition hashes', () => {
    const authority = GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_AUTHORITY;

    expect(authority.upstreamWangVersion).toBe(
      GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_VERSION,
    );
    expect(authority.upstreamWangDefinitionHash).toBe(
      GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_DEFINITION_HASH,
    );
    expect(authority.upstreamChangshengVersion).toBe(
      GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_VERSION,
    );
    expect(authority.upstreamChangshengDefinitionHash).toBe(
      GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_DEFINITION_HASH,
    );
    expect(authority.upstreamFourYangLuVersion).toBe(
      GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_VERSION,
    );
    expect(authority.upstreamFourYangLuDefinitionHash).toBe(
      GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_DEFINITION_HASH,
    );
    expect(authority.upstreamMukuYuqiTonggenVersion).toBe(
      GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_VERSION,
    );
    expect(authority.upstreamMukuYuqiTonggenDefinitionHash).toBe(
      GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_DEFINITION_HASH,
    );
  });

  test('exports only one intended executable adapter', () => {
    const exportedFunctions = Object.entries(authorityModule)
      .filter(([, value]) => typeof value === 'function')
      .map(([name]) => name);

    expect(exportedFunctions).toEqual(['bindGovernedWangChangshengLuRootToBoundedTonggen']);
  });

  test('keeps generalized Tonggen, settlement, counters, strength, Gyeokguk and Production fail-closed', () => {
    const authority = GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_AUTHORITY;

    expect(authority.generalizedRootToTonggenEquivalenceAuthorized).toBe(false);
    expect(authority.yinChangshengToTonggenAuthorized).toBe(false);
    expect(authority.yinLuToTonggenAuthorized).toBe(false);
    expect(authority.earthLuToTonggenAuthorized).toBe(false);
    expect(authority.earthYuqiMappingResolved).toBe(false);
    expect(authority.noBoundedEvidenceToGlobalNotTonggenAuthorized).toBe(false);
    expect(authority.tonggenToSizhuHasRootSettlementAuthorized).toBe(false);
    expect(authority.tonggenCountAuthorized).toBe(false);
    expect(authority.dangZhongCounterAuthorized).toBe(false);
    expect(authority.dangZhongBooleanResolverAuthorized).toBe(false);
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
    expect(authority.nextProductionSku).toBe('NONE');
    expect(authority.commerce).toBe('HOLD');
  });

  test('explicitly forbids class invention and semantic escalation', () => {
    expect(GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_UNAUTHORIZED_DERIVATIONS).toContain(
      'class_neutral_jia_yi_wood_root_observation_to_tonggen',
    );
    expect(GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_UNAUTHORIZED_DERIVATIONS).toContain(
      'yin_changsheng_to_tonggen',
    );
    expect(GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_UNAUTHORIZED_DERIVATIONS).toContain(
      'bounded_no_evidence_to_global_not_tonggen',
    );
    expect(GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_UNAUTHORIZED_DERIVATIONS).toContain(
      'bounded_tonggen_to_sizhu_has_root_settlement',
    );
    expect(GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_UNAUTHORIZED_DERIVATIONS).toContain(
      'tonggen_to_production_fact',
    );
  });
});