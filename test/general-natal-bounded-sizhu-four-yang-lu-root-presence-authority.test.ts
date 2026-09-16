import { describe, expect, test } from 'vitest';
import * as authorityModule from '../src/research/general-natal-bounded-sizhu-four-yang-lu-root-presence-authority.js';
import {
  evaluateBoundedSizhuFourYangLuRootPresenceEvidence,
  GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_AUTHORITY,
  GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_CANONICAL_REPRESENTABILITY,
  GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_DECISION,
  GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_SOURCE_OBSERVATIONS,
  GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_UNAUTHORIZED_DERIVATIONS,
} from '../src/research/general-natal-bounded-sizhu-four-yang-lu-root-presence-authority.js';
import {
  GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_DEFINITION_HASH,
  GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_VERSION,
} from '../src/research/general-natal-bounded-sizhu-yang-changsheng-root-presence-authority.js';
import {
  GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_DEFINITION_HASH,
  GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_VERSION,
} from '../src/research/general-natal-four-yang-lu-heavy-root-authority.js';

describe('bounded 四柱 four-Yang 祿 root-presence evidence authority', () => {
  test('pins the selected-source 祿 heavy-root and bounded-comparison observations', () => {
    expect(GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_DECISION).toBe(
      'AUTHORIZED_RESEARCH_ONLY',
    );
    expect(GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_SOURCE_OBSERVATIONS).toEqual([
      {
        id: 'lu_heavy_root_semantic',
        observation: '長生祿旺，根之重者也；墓庫餘氣，根之輕者也。',
        authority: 'direct_selected_source_semantic',
      },
      {
        id: 'lu_in_bounded_changsheng_lu_ren_operand',
        observation: '得三比肩，不如得一長生祿刃，如甲逢亥子寅卯之類。',
        authority: 'direct_selected_source_bounded_comparison',
      },
    ]);
  });

  test('preserves #734 evidence and adds provenance-preserving 祿 evidence', () => {
    const evaluation = evaluateBoundedSizhuFourYangLuRootPresenceEvidence(
      { value: '갑', yinYang: '양', element: '목' },
      { year: '묘', month: '해', day: '인', hour: '진' },
    );

    expect(evaluation.state).toBe(
      'bounded_positive_root_presence_for_sizhu_context_observed',
    );
    expect(evaluation.rootPresenceObserved).toBe(true);
    expect(evaluation.yangChangshengEvidenceObserved).toBe(true);
    expect(evaluation.fourYangLuEvidenceObserved).toBe(true);
    expect(evaluation.observations).toEqual([
      {
        pillarSlot: 'year',
        branch: '묘',
        sourceRootKind: '旺',
        upstreamState: 'wang_heavy_root_established',
        authority: 'research_only',
      },
      {
        pillarSlot: 'month',
        branch: '해',
        sourceRootKind: '長生',
        upstreamState: 'established',
        authority: 'research_only',
      },
      {
        pillarSlot: 'day',
        branch: '인',
        sourceRootKind: '祿',
        upstreamState: 'lu_heavy_root_established',
        authority: 'research_only',
      },
      {
        pillarSlot: 'hour',
        branch: '진',
        sourceRootKind: '餘氣',
        upstreamState: 'yuqi_light_root_established',
        authority: 'research_only',
      },
    ]);
    expect(evaluation.sizhuHasRootSettled).toBe(false);
    expect(evaluation.absenceMeansNoRoot).toBe(false);
    expect(evaluation.observationCountSemanticsAssigned).toBe(false);
    expect(evaluation.positionWeightAssigned).toBe(false);
    expect(Object.isFrozen(evaluation)).toBe(true);
    expect(Object.isFrozen(evaluation.observations)).toBe(true);
  });

  test.each([
    ['갑', '양', '목', '인'],
    ['병', '양', '화', '사'],
    ['경', '양', '금', '신'],
    ['임', '양', '수', '해'],
  ] as const)('admits governed four-Yang 祿 positive %s-%s', (value, yinYang, element, branch) => {
    const evaluation = evaluateBoundedSizhuFourYangLuRootPresenceEvidence(
      { value, yinYang, element },
      { month: branch },
    );

    expect(evaluation.fourYangLuEvidenceObserved).toBe(true);
    expect(evaluation.observations).toContainEqual({
      pillarSlot: 'month',
      branch,
      sourceRootKind: '祿',
      upstreamState: 'lu_heavy_root_established',
      authority: 'research_only',
    });
    expect(evaluation.sizhuHasRootSettled).toBe(false);
  });

  test('governed Yang mismatch adds no 祿 positive and never means no-root', () => {
    const evaluation = evaluateBoundedSizhuFourYangLuRootPresenceEvidence(
      { value: '갑', yinYang: '양', element: '목' },
      { year: '축' },
    );

    expect(evaluation.fourYangLuEvidenceObserved).toBe(false);
    expect(evaluation.observations.some((observation) => observation.sourceRootKind === '祿')).toBe(
      false,
    );
    expect(evaluation.sizhuHasRootSettled).toBe(false);
    expect(evaluation.absenceMeansNoRoot).toBe(false);
  });

  test('Yin and Earth outside governed Lu scope add no 祿 positive and remain non-negative', () => {
    const yinEvaluation = evaluateBoundedSizhuFourYangLuRootPresenceEvidence(
      { value: '을', yinYang: '음', element: '목' },
      { year: '인' },
    );
    const earthEvaluation = evaluateBoundedSizhuFourYangLuRootPresenceEvidence(
      { value: '무', yinYang: '양', element: '토' },
      { year: '자' },
    );

    for (const evaluation of [yinEvaluation, earthEvaluation]) {
      expect(evaluation.fourYangLuEvidenceObserved).toBe(false);
      expect(evaluation.observations.some((observation) => observation.sourceRootKind === '祿')).toBe(
        false,
      );
      expect(evaluation.sizhuHasRootSettled).toBe(false);
      expect(evaluation.absenceMeansNoRoot).toBe(false);
    }
  });

  test('allows partial pillar input and accepts no arbitrary precomputed Lu evaluation API', () => {
    const evaluation = evaluateBoundedSizhuFourYangLuRootPresenceEvidence(
      { value: '경', yinYang: '양', element: '금' },
      { hour: '신' },
    );

    expect(evaluation.observations).toContainEqual({
      pillarSlot: 'hour',
      branch: '신',
      sourceRootKind: '祿',
      upstreamState: 'lu_heavy_root_established',
      authority: 'research_only',
    });

    const exportedFunctions = Object.entries(authorityModule)
      .filter(([, value]) => typeof value === 'function')
      .map(([name]) => name);
    expect(exportedFunctions).toEqual(['evaluateBoundedSizhuFourYangLuRootPresenceEvidence']);
    expect(evaluateBoundedSizhuFourYangLuRootPresenceEvidence.length).toBe(2);
    expect(GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_CANONICAL_REPRESENTABILITY).toEqual({
      canonicalDayMasterValueAvailable: true,
      canonicalDayMasterYinYangAvailable: true,
      canonicalDayMasterElementAvailable: true,
      canonicalPillarSlotAvailable: true,
      canonicalResolvedPillarBranchAvailable: true,
      partialResolvedPillarInputAllowed: true,
      arbitraryPrecomputedLuEvaluationAccepted: false,
      upstreamYangChangshengAggregateReused: true,
      upstreamFourYangLuEvaluationConsumed: true,
      localLuRediscoveryAuthorized: false,
      yinLuAmbiguityResolved: false,
      earthLuAttachmentSelected: false,
      genericTwelveGrowthStageInputAccepted: false,
      status: 'REPRESENTABLE_AS_BOUNDED_POSITIVE_EVIDENCE_ONLY',
    });
  });

  test('pins #734 and #590 upstream authority definitions exactly', () => {
    const authority = GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_AUTHORITY;
    expect(authority.upstreamBoundedYangChangshengVersion).toBe(
      GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_VERSION,
    );
    expect(authority.upstreamBoundedYangChangshengDefinitionHash).toBe(
      GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_DEFINITION_HASH,
    );
    expect(authority.upstreamFourYangLuVersion).toBe(GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_VERSION);
    expect(authority.upstreamFourYangLuDefinitionHash).toBe(
      GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_DEFINITION_HASH,
    );
  });

  test('keeps Lu ambiguity, resolver, weighting, strength, Gyeokguk, and production fail-closed', () => {
    const authority = GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_AUTHORITY;
    expect(authority.governedFourYangLuToBoundedRootPresenceEvidenceAuthorizedResearchOnly).toBe(
      true,
    );
    expect(authority.yinStemLuMatcherAuthorized).toBe(false);
    expect(authority.earthStemLuMatcherAuthorized).toBe(false);
    expect(authority.sourceInternalYinLuAmbiguityPreserved).toBe(true);
    expect(authority.earthLuAttachmentSelectionAuthorized).toBe(false);
    expect(authority.genericTwelveGrowthStageToLuAuthorized).toBe(false);
    expect(authority.canonicalSizhuHasRootResolverAuthorized).toBe(false);
    expect(authority.rootEvidenceToSizhuHasRootSettlementAuthorized).toBe(false);
    expect(authority.noBoundedEvidenceToSizhuNoRootAuthorized).toBe(false);
    expect(authority.rootObservationCountSemanticsAuthorized).toBe(false);
    expect(authority.rootPositionWeightingAuthorized).toBe(false);
    expect(authority.chartLevelQiangRuoClassifierAuthorized).toBe(false);
    expect(authority.chartLevelWangShuaiClassifierAuthorized).toBe(false);
    expect(authority.threePeerComparisonExecutionAuthorized).toBe(false);
    expect(authority.transitiveClosureAuthorized).toBe(false);
    expect(authority.generalizedGlobalRootRankingAuthorized).toBe(false);
    expect(authority.candidateDerivationAuthorized).toBe(false);
    expect(authority.establishmentPredicateAuthorized).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);

    expect(GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_UNAUTHORIZED_DERIVATIONS).toContain(
      'source_internal_yin_lu_ambiguity_resolution',
    );
    expect(GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_UNAUTHORIZED_DERIVATIONS).toContain(
      'root_evidence_to_sizhu_has_root_settlement',
    );
    expect(GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_UNAUTHORIZED_DERIVATIONS).toContain(
      'lu_evidence_to_three_peer_comparison_execution',
    );
  });
});
