import { describe, expect, test } from 'vitest';
import * as authorityModule from '../src/research/general-natal-bounded-sizhu-yang-changsheng-root-presence-authority.js';
import {
  evaluateBoundedSizhuYangChangshengRootPresenceEvidence,
  GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_AUTHORITY,
  GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_CANONICAL_REPRESENTABILITY,
  GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_DECISION,
  GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_SOURCE_OBSERVATIONS,
  GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_UNAUTHORIZED_DERIVATIONS,
} from '../src/research/general-natal-bounded-sizhu-yang-changsheng-root-presence-authority.js';
import {
  GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_DEFINITION_HASH,
  GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_VERSION,
} from '../src/research/general-natal-bounded-sizhu-root-presence-evidence-authority.js';
import {
  GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_DEFINITION_HASH,
  GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_VERSION,
} from '../src/research/general-natal-changsheng-root-weight-binding-authority.js';

describe('bounded 四柱 Yang 長生 root-presence evidence authority', () => {
  test('pins the selected-source 長生 heavy-root semantic and Yin exception', () => {
    expect(GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_DECISION).toBe(
      'AUTHORIZED_RESEARCH_ONLY',
    );
    expect(
      GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_SOURCE_OBSERVATIONS,
    ).toEqual([
      {
        id: 'changsheng_heavy_root_semantic',
        observation: '長生祿旺，根之重者也；墓庫餘氣，根之輕者也。',
        authority: 'direct_selected_source_semantic',
      },
      {
        id: 'yin_changsheng_exception',
        observation: '陰長生不作此論，如乙逢午、丁逢酉之類，然亦為明根，比得一餘氣。',
        authority: 'direct_selected_source_exception',
      },
    ]);
  });

  test('preserves inherited 旺 / 墓庫 / 餘氣 observations and adds provenance-preserving Yang 長生 evidence', () => {
    const evaluation = evaluateBoundedSizhuYangChangshengRootPresenceEvidence(
      { value: '갑', yinYang: '양', element: '목' },
      { year: '묘', month: '해', day: '진', hour: '미' },
    );

    expect(evaluation.state).toBe(
      'bounded_positive_root_presence_for_sizhu_context_observed',
    );
    expect(evaluation.rootPresenceObserved).toBe(true);
    expect(evaluation.yangChangshengEvidenceObserved).toBe(true);
    expect(evaluation.sizhuHasRootSettled).toBe(false);
    expect(evaluation.absenceMeansNoRoot).toBe(false);
    expect(evaluation.observationCountSemanticsAssigned).toBe(false);
    expect(evaluation.positionWeightAssigned).toBe(false);
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
        branch: '진',
        sourceRootKind: '餘氣',
        upstreamState: 'yuqi_light_root_established',
        authority: 'research_only',
      },
      {
        pillarSlot: 'hour',
        branch: '미',
        sourceRootKind: '墓庫',
        upstreamState: 'muku_light_root_established',
        authority: 'research_only',
      },
    ]);
    expect(Object.isFrozen(evaluation)).toBe(true);
    expect(Object.isFrozen(evaluation.observations)).toBe(true);
    expect(evaluation.observations.every((observation) => Object.isFrozen(observation))).toBe(true);
  });

  test('does not promote canonical Yin 長生 excluded_by_yin_exception to positive root evidence', () => {
    const evaluation = evaluateBoundedSizhuYangChangshengRootPresenceEvidence(
      { value: '을', yinYang: '음', element: '목' },
      { month: '오' },
    );

    expect(evaluation).toMatchObject({
      state: 'no_bounded_root_presence_evidence',
      dayMasterValue: '을',
      dayMasterYinYang: '음',
      element: '목',
      observations: [],
      rootPresenceObserved: false,
      yangChangshengEvidenceObserved: false,
      sizhuHasRootSettled: false,
      absenceMeansNoRoot: false,
      observationCountSemanticsAssigned: false,
      positionWeightAssigned: false,
      authority: 'research_only',
    });
  });

  test('allows a partial pillar map to contribute a governed Yang 長生 observation', () => {
    const evaluation = evaluateBoundedSizhuYangChangshengRootPresenceEvidence(
      { value: '병', yinYang: '양', element: '화' },
      { month: '인' },
    );

    expect(evaluation.observations).toEqual([
      {
        pillarSlot: 'month',
        branch: '인',
        sourceRootKind: '長生',
        upstreamState: 'established',
        authority: 'research_only',
      },
    ]);
    expect(evaluation.rootPresenceObserved).toBe(true);
    expect(evaluation.yangChangshengEvidenceObserved).toBe(true);
    expect(evaluation.sizhuHasRootSettled).toBe(false);
    expect(evaluation.absenceMeansNoRoot).toBe(false);
  });

  test('no inherited or Yang 長生 positive remains bounded unresolved evidence, never 四柱無根', () => {
    const evaluation = evaluateBoundedSizhuYangChangshengRootPresenceEvidence(
      { value: '갑', yinYang: '양', element: '목' },
      { year: '축' },
    );

    expect(evaluation).toMatchObject({
      state: 'no_bounded_root_presence_evidence',
      observations: [],
      rootPresenceObserved: false,
      yangChangshengEvidenceObserved: false,
      sizhuHasRootSettled: false,
      absenceMeansNoRoot: false,
      observationCountSemanticsAssigned: false,
      positionWeightAssigned: false,
    });
  });

  test('accepts only canonical day-master fields plus explicit pillar-slot branches, not precomputed Changsheng evaluations', () => {
    const exportedFunctions = Object.entries(authorityModule)
      .filter(([, value]) => typeof value === 'function')
      .map(([name]) => name);

    expect(exportedFunctions).toEqual([
      'evaluateBoundedSizhuYangChangshengRootPresenceEvidence',
    ]);
    expect(evaluateBoundedSizhuYangChangshengRootPresenceEvidence.length).toBe(2);
    expect(
      GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_CANONICAL_REPRESENTABILITY,
    ).toEqual({
      canonicalDayMasterValueAvailable: true,
      canonicalDayMasterYinYangAvailable: true,
      canonicalDayMasterElementAvailable: true,
      canonicalPillarSlotAvailable: true,
      canonicalResolvedPillarBranchAvailable: true,
      partialResolvedPillarInputAllowed: true,
      arbitraryPrecomputedChangshengEvaluationAccepted: false,
      baseBoundedRootPresenceEvaluationReused: true,
      genericTwelveGrowthStageInputAccepted: false,
      luEvaluationConsumed: false,
      status: 'REPRESENTABLE_AS_BOUNDED_POSITIVE_EVIDENCE_ONLY',
    });
  });

  test('pins both upstream authority definitions exactly', () => {
    const authority = GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_AUTHORITY;
    expect(authority.upstreamBoundedRootPresenceVersion).toBe(
      GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_VERSION,
    );
    expect(authority.upstreamBoundedRootPresenceDefinitionHash).toBe(
      GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_DEFINITION_HASH,
    );
    expect(authority.upstreamChangshengVersion).toBe(
      GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_VERSION,
    );
    expect(authority.upstreamChangshengDefinitionHash).toBe(
      GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_DEFINITION_HASH,
    );
  });

  test('keeps Yin 長生, Lu, resolver, weighting, strength, Gyeokguk, and production fail-closed', () => {
    const authority = GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_AUTHORITY;
    expect(
      authority.governedYangChangshengToBoundedRootPresenceEvidenceAuthorizedResearchOnly,
    ).toBe(true);
    expect(authority.yinChangshengToPositiveRootPresenceAuthorized).toBe(false);
    expect(authority.yinChangshengMinggenClassifierAuthorized).toBe(false);
    expect(authority.yinChangshengToYuqiAuthorized).toBe(false);
    expect(authority.genericTwelveGrowthStageToRootPresenceAuthorized).toBe(false);
    expect(authority.luToSizhuRootPresenceAuthorizedInThisScope).toBe(false);
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

    expect(
      GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_UNAUTHORIZED_DERIVATIONS,
    ).toContain('yin_changsheng_exclusion_to_positive_root_presence');
    expect(
      GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_UNAUTHORIZED_DERIVATIONS,
    ).toContain('lu_to_sizhu_root_presence_in_this_scope');
    expect(
      GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_UNAUTHORIZED_DERIVATIONS,
    ).toContain('root_evidence_to_sizhu_has_root_settlement');
  });
});
