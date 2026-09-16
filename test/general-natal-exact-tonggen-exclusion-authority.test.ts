import { describe, expect, test } from 'vitest';
import * as authorityModule from '../src/research/general-natal-exact-tonggen-exclusion-authority.js';
import {
  GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_AUTHORITY,
  GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_CANONICAL_REPRESENTABILITY,
  GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_DECISION,
  GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_REGISTRY,
  GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_SOURCE_TEXT,
  GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_UNAUTHORIZED_DERIVATIONS,
  evaluateSelectedSourceExactTonggenExclusion,
} from '../src/research/general-natal-exact-tonggen-exclusion-authority.js';
import {
  GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_DEFINITION_HASH,
  GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_VERSION,
  evaluateMukuYuqiLightRoot,
} from '../src/research/general-natal-muku-yuqi-light-root-authority.js';
import {
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_DEFINITION_HASH,
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_VERSION,
  bindGovernedMukuYuqiRootToBoundedTonggen,
} from '../src/research/general-natal-muku-yuqi-bounded-tonggen-authority.js';

describe('exact Yi-Xu / Ding-Chou selected-source Tonggen exclusions', () => {
  test('preserves the exact source sentence and two immutable exact-pair exclusions', () => {
    expect(GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_DECISION).toBe('AUTHORIZED_RESEARCH_ONLY');
    expect(GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_SOURCE_TEXT).toBe(
      '若乙逢戌、丁逢丑，非其本庫餘氣，自不作通根論。',
    );
    expect(GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_REGISTRY).toHaveLength(2);
    expect(Object.isFrozen(GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_REGISTRY)).toBe(true);
    expect(GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_REGISTRY.every(Object.isFrozen)).toBe(true);
  });

  test('admits only exact 을+술 and 정+축 selected-source exclusions', () => {
    expect(evaluateSelectedSourceExactTonggenExclusion({ stem: '을', branch: '술' })).toEqual({
      state: 'selected_source_tonggen_exclusion_observed',
      stem: '을',
      branch: '술',
      sourceStem: '乙',
      sourceBranch: '戌',
      sourceBoundary: '非其本庫餘氣',
      sourceDisposition: '自不作通根論',
      selectedSourceTonggenExcluded: true,
      globalNotTonggenEstablished: false,
      rootlessnessEstablished: false,
      zhuGuaEstablished: false,
      qiangRuoEstablished: false,
      authority: 'research_only',
    });

    expect(evaluateSelectedSourceExactTonggenExclusion({ stem: '정', branch: '축' })).toEqual({
      state: 'selected_source_tonggen_exclusion_observed',
      stem: '정',
      branch: '축',
      sourceStem: '丁',
      sourceBranch: '丑',
      sourceBoundary: '非其本庫餘氣',
      sourceDisposition: '自不作通根論',
      selectedSourceTonggenExcluded: true,
      globalNotTonggenEstablished: false,
      rootlessnessEstablished: false,
      zhuGuaEstablished: false,
      qiangRuoEstablished: false,
      authority: 'research_only',
    });
  });

  test('keeps nearby and same-element pairs outside the selected-source exact-pair scope', () => {
    for (const input of [
      { stem: '갑' as const, branch: '술' as const },
      { stem: '병' as const, branch: '축' as const },
      { stem: '을' as const, branch: '진' as const },
      { stem: '정' as const, branch: '미' as const },
      { stem: '을' as const, branch: '축' as const },
      { stem: '정' as const, branch: '술' as const },
    ]) {
      const result = evaluateSelectedSourceExactTonggenExclusion(input);
      expect(result.state).toBe('outside_selected_source_pair_scope');
      expect(result.selectedSourceTonggenExcluded).toBe(false);
      expect(result.globalNotTonggenEstablished).toBe(false);
      expect(result.rootlessnessEstablished).toBe(false);
    }
  });

  test('does not promote #558 nonmatch or #692 no-evidence states into generic not-Tonggen', () => {
    const woodXu = evaluateMukuYuqiLightRoot({ element: '목' }, '술');
    expect(woodXu.lightRootState).toBe('no_governed_light_root_match');
    const boundedWoodXu = bindGovernedMukuYuqiRootToBoundedTonggen(woodXu);
    expect(boundedWoodXu.state).toBe('no_bounded_tonggen_evidence');
    expect(boundedWoodXu.tonggenObserved).toBe(false);

    expect(evaluateSelectedSourceExactTonggenExclusion({ stem: '갑', branch: '술' }).state).toBe(
      'outside_selected_source_pair_scope',
    );
    expect(evaluateSelectedSourceExactTonggenExclusion({ stem: '을', branch: '술' }).state).toBe(
      'selected_source_tonggen_exclusion_observed',
    );

    const fireChou = evaluateMukuYuqiLightRoot({ element: '화' }, '축');
    expect(fireChou.lightRootState).toBe('no_governed_light_root_match');
    expect(bindGovernedMukuYuqiRootToBoundedTonggen(fireChou).state).toBe(
      'no_bounded_tonggen_evidence',
    );
    expect(evaluateSelectedSourceExactTonggenExclusion({ stem: '병', branch: '축' }).state).toBe(
      'outside_selected_source_pair_scope',
    );
    expect(evaluateSelectedSourceExactTonggenExclusion({ stem: '정', branch: '축' }).state).toBe(
      'selected_source_tonggen_exclusion_observed',
    );
  });

  test('pins upstream boundaries and exposes exactly one bounded executable function', () => {
    expect(GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_AUTHORITY.upstreamMukuYuqiLightRootVersion).toBe(
      GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_VERSION,
    );
    expect(
      GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_AUTHORITY.upstreamMukuYuqiLightRootDefinitionHash,
    ).toBe(GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_DEFINITION_HASH);
    expect(GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_AUTHORITY.upstreamBoundedTonggenVersion).toBe(
      GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_VERSION,
    );
    expect(GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_AUTHORITY.upstreamBoundedTonggenDefinitionHash).toBe(
      GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_DEFINITION_HASH,
    );
    expect(Object.values(authorityModule).filter((value) => typeof value === 'function')).toEqual([
      evaluateSelectedSourceExactTonggenExclusion,
    ]);
  });

  test('keeps generalized negative, strength, Gyeokguk, and production authority fail-closed', () => {
    expect(GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_CANONICAL_REPRESENTABILITY).toEqual({
      canonicalExactStemAvailable: true,
      canonicalExactBranchAvailable: true,
      exactYiXuPairRepresentable: true,
      exactDingChouPairRepresentable: true,
      wholeChartScanRequired: false,
      mukuYuqiNonmatchPromotedToNotTonggen: false,
      boundedTonggenNoEvidencePromotedToNotTonggen: false,
      status: 'EXACT_PAIR_REPRESENTABLE',
    });

    const authority = GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_AUTHORITY;
    expect(authority.wholeChartScanAuthorized).toBe(false);
    expect(authority.mukuYuqiNonmatchToNotTonggenAuthorized).toBe(false);
    expect(authority.boundedTonggenNoEvidenceToNotTonggenAuthorized).toBe(false);
    expect(authority.generalNotTonggenResolverAuthorized).toBe(false);
    expect(authority.wholeChartRootlessnessResolverAuthorized).toBe(false);
    expect(authority.absenceToZhuGuaAuthorized).toBe(false);
    expect(authority.absenceToWeakAuthorized).toBe(false);
    expect(authority.chartLevelQiangRuoClassifierAuthorized).toBe(false);
    expect(authority.chartLevelWangShuaiClassifierAuthorized).toBe(false);
    expect(authority.numericStrengthAuthorized).toBe(false);
    expect(authority.nonNumericStrengthScalarAuthorized).toBe(false);
    expect(authority.candidateDerivationAuthorized).toBe(false);
    expect(authority.establishmentPredicateAuthorized).toBe(false);
    expect(authority.candidateFactsEmitted).toBe(false);
    expect(authority.establishmentFactsEmitted).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);

    expect(GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_UNAUTHORIZED_DERIVATIONS).toContain(
      'muku_yuqi_nonmatch_to_global_not_tonggen',
    );
    expect(GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_UNAUTHORIZED_DERIVATIONS).toContain(
      'bounded_tonggen_no_evidence_to_global_not_tonggen',
    );
    expect(GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_UNAUTHORIZED_DERIVATIONS).toContain(
      'exact_pair_exclusion_to_production_fact',
    );
  });
});
