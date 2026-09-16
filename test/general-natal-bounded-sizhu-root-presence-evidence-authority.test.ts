import { describe, expect, test } from 'vitest';
import * as authorityModule from '../src/research/general-natal-bounded-sizhu-root-presence-evidence-authority.js';
import {
  evaluateBoundedSizhuRootPresenceEvidence,
  GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_AUTHORITY,
  GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_CANONICAL_REPRESENTABILITY,
  GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_CONSUMED_ROOT_CLASSES,
  GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_DECISION,
  GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_SOURCE_ROOT_CLASS_TEXT,
  GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_UNAUTHORIZED_DERIVATIONS,
  GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_UNCONSUMED_ROOT_CLASSES,
} from '../src/research/general-natal-bounded-sizhu-root-presence-evidence-authority.js';
import {
  GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_DEFINITION_HASH,
  GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_VERSION,
} from '../src/research/general-natal-earth-wang-heavy-root-completion-authority.js';
import {
  GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_DEFINITION_HASH,
  GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_VERSION,
} from '../src/research/general-natal-muku-yuqi-light-root-authority.js';
import {
  GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_DEFINITION_HASH,
  GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_VERSION,
} from '../src/research/general-natal-sizhu-has-root-capacity-observation-authority.js';

describe('bounded 四柱 root-presence evidence authority', () => {
  test('pins the direct source root-class language and consumes only 旺 / 墓庫 / 餘氣', () => {
    expect(GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_DECISION).toBe(
      'AUTHORIZED_RESEARCH_ONLY',
    );
    expect(GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_SOURCE_ROOT_CLASS_TEXT).toBe(
      '長生祿旺，根之重者也；墓庫餘氣，根之輕者也。',
    );
    expect(GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_CONSUMED_ROOT_CLASSES).toEqual([
      '旺',
      '墓庫',
      '餘氣',
    ]);
    expect(GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_UNCONSUMED_ROOT_CLASSES).toEqual([
      '長生',
      '祿',
    ]);
  });

  test('preserves pillar provenance for multiple bounded positive root observations without count semantics', () => {
    const evaluation = evaluateBoundedSizhuRootPresenceEvidence(
      { element: '목' },
      { year: '묘', month: '진', day: '자', hour: '미' },
    );

    expect(evaluation.state).toBe(
      'bounded_positive_root_presence_for_sizhu_context_observed',
    );
    expect(evaluation.rootPresenceObserved).toBe(true);
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

  test('allows partial resolved pillar input to produce positive evidence without inventing missing-slot negatives', () => {
    const evaluation = evaluateBoundedSizhuRootPresenceEvidence(
      { element: '화' },
      { month: '술' },
    );

    expect(evaluation.state).toBe(
      'bounded_positive_root_presence_for_sizhu_context_observed',
    );
    expect(evaluation.observations).toEqual([
      {
        pillarSlot: 'month',
        branch: '술',
        sourceRootKind: '墓庫',
        upstreamState: 'muku_light_root_established',
        authority: 'research_only',
      },
    ]);
    expect(evaluation.sizhuHasRootSettled).toBe(false);
    expect(evaluation.absenceMeansNoRoot).toBe(false);
  });

  test('admits Earth only through the governed 旺 completion while Earth light-root remains unresolved', () => {
    const positive = evaluateBoundedSizhuRootPresenceEvidence(
      { element: '토' },
      { month: '진' },
    );
    expect(positive.observations).toEqual([
      {
        pillarSlot: 'month',
        branch: '진',
        sourceRootKind: '旺',
        upstreamState: 'wang_heavy_root_established',
        authority: 'research_only',
      },
    ]);
    expect(positive.sizhuHasRootSettled).toBe(false);

    const unresolvedLightBoundary = evaluateBoundedSizhuRootPresenceEvidence(
      { element: '토' },
      { year: '자' },
    );
    expect(unresolvedLightBoundary.state).toBe('no_bounded_root_presence_evidence');
    expect(unresolvedLightBoundary.observations).toEqual([]);
    expect(unresolvedLightBoundary.rootPresenceObserved).toBe(false);
    expect(unresolvedLightBoundary.sizhuHasRootSettled).toBe(false);
    expect(unresolvedLightBoundary.absenceMeansNoRoot).toBe(false);
  });

  test('no governed positive is unresolved bounded evidence, never a 四柱無根 verdict', () => {
    const evaluation = evaluateBoundedSizhuRootPresenceEvidence(
      { element: '목' },
      { year: '자', month: '축', day: '사', hour: '유' },
    );

    expect(evaluation).toMatchObject({
      state: 'no_bounded_root_presence_evidence',
      observations: [],
      rootPresenceObserved: false,
      sizhuHasRootSettled: false,
      absenceMeansNoRoot: false,
      observationCountSemanticsAssigned: false,
      positionWeightAssigned: false,
      authority: 'research_only',
    });
  });

  test('accepts only day-master element plus explicit pillar-slot branch input, not arbitrary precomputed root evaluations', () => {
    const exportedFunctions = Object.entries(authorityModule)
      .filter(([, value]) => typeof value === 'function')
      .map(([name]) => name);

    expect(exportedFunctions).toEqual(['evaluateBoundedSizhuRootPresenceEvidence']);
    expect(evaluateBoundedSizhuRootPresenceEvidence.length).toBe(2);
    expect(GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_CANONICAL_REPRESENTABILITY).toEqual({
      canonicalDayMasterElementAvailable: true,
      canonicalPillarSlotAvailable: true,
      canonicalResolvedPillarBranchAvailable: true,
      partialResolvedPillarInputAllowed: true,
      arbitraryPrecomputedRootEvaluationAccepted: false,
      boundedTonggenEvaluationConsumed: false,
      hiddenStemFactsConsumed: false,
      twelveGrowthFactsConsumed: false,
      status: 'REPRESENTABLE_AS_BOUNDED_POSITIVE_EVIDENCE_ONLY',
    });
  });

  test('pins all three upstream authority definitions', () => {
    const authority = GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_AUTHORITY;
    expect(authority.upstreamWangVersion).toBe(
      GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_VERSION,
    );
    expect(authority.upstreamWangDefinitionHash).toBe(
      GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_DEFINITION_HASH,
    );
    expect(authority.upstreamLightRootVersion).toBe(GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_VERSION);
    expect(authority.upstreamLightRootDefinitionHash).toBe(
      GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_DEFINITION_HASH,
    );
    expect(authority.upstreamSizhuCapacityVersion).toBe(
      GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_VERSION,
    );
    expect(authority.upstreamSizhuCapacityDefinitionHash).toBe(
      GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_DEFINITION_HASH,
    );
  });

  test('keeps resolver, negative inference, weighting, strength, Gyeokguk, and production fail-closed', () => {
    const authority = GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_AUTHORITY;
    expect(authority.boundedPositiveRootPresenceEvidenceAuthorizedResearchOnly).toBe(true);
    expect(authority.canonicalSizhuHasRootResolverAuthorized).toBe(false);
    expect(authority.rootEvidenceToSizhuHasRootSettlementAuthorized).toBe(false);
    expect(authority.noBoundedEvidenceToSizhuNoRootAuthorized).toBe(false);
    expect(authority.boundedTonggenToSizhuHasRootAuthorized).toBe(false);
    expect(authority.hiddenStemToSizhuHasRootAuthorized).toBe(false);
    expect(authority.twelveGrowthStageToSizhuHasRootAuthorized).toBe(false);
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

    expect(GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_UNAUTHORIZED_DERIVATIONS).toContain(
      'root_evidence_to_sizhu_has_root_settlement',
    );
    expect(GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_UNAUTHORIZED_DERIVATIONS).toContain(
      'no_bounded_evidence_to_sizhu_no_root',
    );
    expect(GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_UNAUTHORIZED_DERIVATIONS).toContain(
      'root_observation_count_to_strength',
    );
  });
});
