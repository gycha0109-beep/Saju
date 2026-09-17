import { describe, expect, test } from 'vitest';
import * as authorityModule from '../src/research/general-natal-wang-changsheng-lu-tonggen-dang-zhong-support-constituent-authority.js';
import {
  bindGovernedWangChangshengLuTonggenToDangZhongSupportConstituent,
  GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_AUTHORITY,
  GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_DECISION,
  GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_SOURCE_OBSERVATIONS,
  GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_UNAUTHORIZED_DERIVATIONS,
} from '../src/research/general-natal-wang-changsheng-lu-tonggen-dang-zhong-support-constituent-authority.js';
import {
  bindGovernedWangChangshengLuRootToBoundedTonggen,
  GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_DEFINITION_HASH,
  GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_VERSION,
} from '../src/research/general-natal-wang-changsheng-lu-bounded-tonggen-authority.js';
import {
  GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY,
  GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_DEFINITION_HASH,
  GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_VERSION,
} from '../src/research/general-natal-tonggen-dang-zhong-support-constituent-authority.js';
import { evaluateCompleteWangHeavyRoot } from '../src/research/general-natal-earth-wang-heavy-root-completion-authority.js';
import { evaluateChangshengHeavyRootClause } from '../src/research/general-natal-changsheng-root-weight-binding-authority.js';
import { evaluateFourYangLuHeavyRoot } from '../src/research/general-natal-four-yang-lu-heavy-root-authority.js';

describe('governed Wang / Yang Changsheng / four-Yang Lu Tonggen support constituent authority', () => {
  test('records the existing selected-source Tonggen-to-Dang-Zhong association without establishing Dang-Zhong', () => {
    expect(GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_DECISION).toBe(
      'AUTHORIZED_RESEARCH_ONLY',
    );
    expect(
      GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_SOURCE_OBSERVATIONS,
    ).toEqual([
      {
        id: 'tonggen_named_as_dang_zhong_support_component',
        sourceText:
          GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY.sourceComponentText,
        observation: '通根扶助 is directly source-associated with 黨眾 composition',
      },
      {
        id: 'out_of_season_tonggen_bi_yin_party_context',
        sourceText:
          GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY.sourceOutOfSeasonText,
        observation:
          'the selected source gives an out-of-season context where 通根比印 appears inside 黨眾 and 不弱 language',
      },
    ]);
  });

  test('admits governed Wang Tonggen only as a Tonggen support constituent', () => {
    const root = evaluateCompleteWangHeavyRoot({ element: '목' }, '묘');
    const tonggen = bindGovernedWangChangshengLuRootToBoundedTonggen({
      rootKind: '旺',
      evaluation: root,
    });
    const result =
      bindGovernedWangChangshengLuTonggenToDangZhongSupportConstituent(tonggen);

    expect(result).toMatchObject({
      state: 'tonggen_support_constituent_observed',
      upstreamState: 'bounded_tonggen_observed',
      sourceRootKind: '旺',
      sourceConstituent: '通根',
      sourceSupportPhrase: '通根扶助',
      supportConstituentObserved: true,
      globalNotTonggenEstablished: false,
      sizhuHasRootSettled: false,
      dangZhongEstablished: false,
      zhuGuaEstablished: false,
      qiangRuoEstablished: false,
      authority: 'research_only',
    });
  });

  test('admits governed Yang Changsheng Tonggen only as a Tonggen support constituent', () => {
    const root = evaluateChangshengHeavyRootClause(
      { value: '갑', yinYang: '양' },
      '해',
    );
    const tonggen = bindGovernedWangChangshengLuRootToBoundedTonggen({
      rootKind: '長生',
      evaluation: root,
    });
    const result =
      bindGovernedWangChangshengLuTonggenToDangZhongSupportConstituent(tonggen);

    expect(tonggen.state).toBe('bounded_tonggen_observed');
    expect(result.state).toBe('tonggen_support_constituent_observed');
    expect(result.sourceRootKind).toBe('長生');
    expect(result.sourceConstituent).toBe('通根');
    expect(result.dangZhongEstablished).toBe(false);
  });

  test('admits each governed four-Yang Lu Tonggen only as Tonggen support constituent evidence', () => {
    const pairs = [
      [{ value: '갑' as const }, '인' as const],
      [{ value: '병' as const }, '사' as const],
      [{ value: '경' as const }, '신' as const],
      [{ value: '임' as const }, '해' as const],
    ] as const;

    for (const [dayMaster, branch] of pairs) {
      const root = evaluateFourYangLuHeavyRoot(dayMaster, branch);
      const tonggen = bindGovernedWangChangshengLuRootToBoundedTonggen({
        rootKind: '祿',
        evaluation: root,
      });
      const result =
        bindGovernedWangChangshengLuTonggenToDangZhongSupportConstituent(tonggen);

      expect(tonggen.state).toBe('bounded_tonggen_observed');
      expect(result.state).toBe('tonggen_support_constituent_observed');
      expect(result.sourceRootKind).toBe('祿');
      expect(result.sourceConstituent).toBe('通根');
      expect(result.supportConstituentObserved).toBe(true);
      expect(result.dangZhongEstablished).toBe(false);
    }
  });

  test('preserves governed no-evidence as non-negative and emits no support constituent', () => {
    const tonggen = bindGovernedWangChangshengLuRootToBoundedTonggen({
      rootKind: '旺',
      evaluation: evaluateCompleteWangHeavyRoot({ element: '목' }, '자'),
    });
    const result =
      bindGovernedWangChangshengLuTonggenToDangZhongSupportConstituent(tonggen);

    expect(tonggen.state).toBe('no_bounded_tonggen_evidence');
    expect(result).toMatchObject({
      state: 'no_bounded_tonggen_support_constituent_evidence',
      sourceRootKind: null,
      sourceConstituent: null,
      sourceSupportPhrase: null,
      supportConstituentObserved: false,
      globalNotTonggenEstablished: false,
      sizhuHasRootSettled: false,
      dangZhongEstablished: false,
      zhuGuaEstablished: false,
      qiangRuoEstablished: false,
    });
  });

  test('preserves Yin Changsheng outside scope as unresolved', () => {
    const tonggen = bindGovernedWangChangshengLuRootToBoundedTonggen({
      rootKind: '長生',
      evaluation: evaluateChangshengHeavyRootClause(
        { value: '을', yinYang: '음' },
        '오',
      ),
    });
    const result =
      bindGovernedWangChangshengLuTonggenToDangZhongSupportConstituent(tonggen);

    expect(tonggen.state).toBe('unresolved_outside_governed_tonggen_scope');
    expect(result.state).toBe('unresolved_outside_governed_tonggen_scope');
    expect(result.supportConstituentObserved).toBe(false);
    expect(result.sourceRootKind).toBeNull();
    expect(result.dangZhongEstablished).toBe(false);
  });

  test('preserves Yin Lu outside scope as unresolved and does not invent class-neutral Jia-Yi root classes', () => {
    const tonggen = bindGovernedWangChangshengLuRootToBoundedTonggen({
      rootKind: '祿',
      evaluation: evaluateFourYangLuHeavyRoot({ value: '을' }, '묘'),
    });
    const result =
      bindGovernedWangChangshengLuTonggenToDangZhongSupportConstituent(tonggen);

    expect(tonggen.state).toBe('unresolved_outside_governed_tonggen_scope');
    expect(result.state).toBe('unresolved_outside_governed_tonggen_scope');
    expect(result.supportConstituentObserved).toBe(false);
    expect(
      GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_AUTHORITY
        .classNeutralJiaYiWoodObservationConsumed,
    ).toBe(false);
    expect(
      GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_AUTHORITY
        .directRootClassToSupportConstituentAuthorized,
    ).toBe(false);
  });

  test('pins the exact #755 and #697 version/hash boundaries and keeps the existing Muku/Yuqi support path separate', () => {
    const authority =
      GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_AUTHORITY;

    expect(authority.upstreamWangChangshengLuTonggenVersion).toBe(
      GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_VERSION,
    );
    expect(authority.upstreamWangChangshengLuTonggenDefinitionHash).toBe(
      GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_DEFINITION_HASH,
    );
    expect(authority.upstreamExistingTonggenSupportVersion).toBe(
      GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_VERSION,
    );
    expect(authority.upstreamExistingTonggenSupportDefinitionHash).toBe(
      GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_DEFINITION_HASH,
    );
    expect(authority.existingMukuYuqiTonggenSupportPrecedentAvailableResearchOnly).toBe(true);
    expect(
      GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY
        .boundedTonggenToDangZhongSupportConstituentAuthorizedResearchOnly,
    ).toBe(true);
  });

  test('exports exactly one executable adapter and no raw-root shortcut', () => {
    const exportedFunctions = Object.entries(authorityModule)
      .filter(([, value]) => typeof value === 'function')
      .map(([name]) => name);

    expect(exportedFunctions).toEqual([
      'bindGovernedWangChangshengLuTonggenToDangZhongSupportConstituent',
    ]);
  });

  test('keeps counters, aggregation, settlement, strength, Gyeokguk and Production fail-closed', () => {
    const authority =
      GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_AUTHORITY;

    expect(authority.genericRootToSupportConstituentAuthorized).toBe(false);
    expect(authority.yinChangshengToTonggenSupportAuthorized).toBe(false);
    expect(authority.yinLuToTonggenSupportAuthorized).toBe(false);
    expect(authority.earthLuToTonggenSupportAuthorized).toBe(false);
    expect(authority.earthYuqiToTonggenSupportResolved).toBe(false);
    expect(authority.noEvidenceToGlobalNotTonggenAuthorized).toBe(false);
    expect(authority.noEvidenceToZhuGuaAuthorized).toBe(false);
    expect(authority.noEvidenceToWeakAuthorized).toBe(false);
    expect(authority.tonggenCountAuthorized).toBe(false);
    expect(authority.dangZhongCounterAuthorized).toBe(false);
    expect(authority.dangZhongThresholdAuthorized).toBe(false);
    expect(authority.dangZhongBooleanResolverAuthorized).toBe(false);
    expect(authority.zhuGuaCounterAuthorized).toBe(false);
    expect(authority.zhuGuaBooleanResolverAuthorized).toBe(false);
    expect(authority.tonggenBijianYinshouAggregationAuthorized).toBe(false);
    expect(authority.tonggenSupportToQiangAuthorized).toBe(false);
    expect(authority.tonggenSupportToBuRuoAuthorized).toBe(false);
    expect(authority.chartLevelQiangRuoClassifierAuthorized).toBe(false);
    expect(authority.chartLevelWangShuaiClassifierAuthorized).toBe(false);
    expect(authority.tonggenSupportToSizhuHasRootSettlementAuthorized).toBe(false);
    expect(authority.numericStrengthAuthorized).toBe(false);
    expect(authority.nonNumericStrengthScalarAuthorized).toBe(false);
    expect(authority.candidateDerivationAuthorized).toBe(false);
    expect(authority.establishmentPredicateAuthorized).toBe(false);
    expect(authority.candidateFactsEmitted).toBe(false);
    expect(authority.establishmentFactsEmitted).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);
  });

  test('preserves the production invariant exactly', () => {
    const authority =
      GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_AUTHORITY;

    expect(authority.gejuCandidate).toBe('NOT_EMITTED');
    expect(authority.gejuEstablishmentState).toBe('NOT_EMITTED');
    expect(authority.generalNatalProductionAuthority).toBe('BLOCKED');
    expect(authority.p0Cm03).toBe('OPEN');
    expect(authority.nextProductionSku).toBe('NONE');
    expect(authority.commerce).toBe('HOLD');
  });

  test('explicitly forbids direct root-class shortcuts and semantic escalation', () => {
    const forbidden =
      GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_UNAUTHORIZED_DERIVATIONS;

    expect(forbidden).toContain('direct_wang_root_to_support_constituent');
    expect(forbidden).toContain('direct_changsheng_root_to_support_constituent');
    expect(forbidden).toContain('direct_lu_root_to_support_constituent');
    expect(forbidden).toContain('class_neutral_jia_yi_wood_root_to_support_constituent');
    expect(forbidden).toContain('single_tonggen_support_constituent_to_dang_zhong');
    expect(forbidden).toContain('tonggen_plus_bijian_or_yinshou_aggregation');
    expect(forbidden).toContain('tonggen_support_constituent_to_sizhu_has_root_settlement');
    expect(forbidden).toContain('support_constituent_to_production_fact');
  });
});
