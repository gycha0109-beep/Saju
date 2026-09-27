import { describe, expect, it } from 'vitest';

import {
  R144_AUTHORITY,
  R144_DIRECTED_REPETITION_CASES,
  R144_PUNISHMENT_REPETITION_SELF_VARIANT_VERSION,
  R144_REJECTED_MULTIPLICITY_COLLAPSES,
  R144_SELF_PUNISHMENT_VARIANTS,
  R144_SUMMARY,
  R144_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-punishment-repetition-self-punishment-variant-corpus.js';

describe('R144 punishment repetition and self-punishment variant replay', () => {
  it('pins the deterministic corpus shape', () => {
    expect(R144_PUNISHMENT_REPETITION_SELF_VARIANT_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R144_SUMMARY).toEqual({
      directedRelationCount: 8,
      directedTaxonomyFamilyCount: 3,
      selfXingBranchCount: 4,
      directedCaseCount: 24,
      selfCaseCount: 12,
      caseCount: 36,
      directedCandidateCount: 64,
      directedCompetingParticipantCount: 48,
      selfRepetitionTwoCount: 4,
      selfRepetitionThreeCount: 4,
      selfRepetitionFourCount: 4,
      selfPairTopologyCount: 40,
      automaticHarmAuthorizedCount: 0,
      numericSeverityAuthorizedCount: 0,
      executableCount: 0,
      productionAuthorityPromotedCount: 0,
    });
  });

  it('replays all eight directed R056 relations under all three repetition topologies', () => {
    expect(R144_DIRECTED_REPETITION_CASES).toHaveLength(24);

    for (const relationIndex of new Set(
      R144_DIRECTED_REPETITION_CASES.map((item) => item.relationIndex),
    )) {
      const cases = R144_DIRECTED_REPETITION_CASES.filter(
        (item) => item.relationIndex === relationIndex,
      );
      expect(cases).toHaveLength(3);
      expect(new Set(cases.map((item) => item.topology)).size).toBe(3);
    }
  });

  it('preserves every directed candidate without assigning severity or harm', () => {
    const candidates = R144_DIRECTED_REPETITION_CASES.flatMap(
      (item) => item.candidates,
    );
    expect(candidates).toHaveLength(64);
    expect(
      candidates.every(
        (item) =>
          item.directedIdentityPreserved === true &&
          item.structuralTaxonomyOnly === true &&
          item.automaticHarmAuthorized === false &&
          item.numericSeverity === null &&
          item.effectVerdict === null &&
          item.executable === false,
      ),
    ).toBe(true);
  });

  it('captures repetition competition without creating participant priority', () => {
    const competing = R144_DIRECTED_REPETITION_CASES.flatMap(
      (item) => item.participantDegrees,
    ).filter((item) => item.competing);
    expect(competing).toHaveLength(48);
    expect(
      competing.every(
        (item) =>
          item.totalCandidateDegree >= 2 &&
          item.priorityAuthorized === false &&
          item.severityAuthorized === false,
      ),
    ).toBe(true);
  });

  it('replays all four self-punishment branches at counts two, three, and four', () => {
    expect(R144_SELF_PUNISHMENT_VARIANTS).toHaveLength(12);
    expect(
      new Set(R144_SELF_PUNISHMENT_VARIANTS.map((item) => item.branch)).size,
    ).toBe(4);

    for (const branch of new Set(
      R144_SELF_PUNISHMENT_VARIANTS.map((item) => item.branch),
    )) {
      const cases = R144_SELF_PUNISHMENT_VARIANTS.filter(
        (item) => item.branch === branch,
      );
      expect(cases.map((item) => item.repetitionCount).sort()).toEqual([
        2,
        3,
        4,
      ]);
    }
  });

  it('keeps combinatorial same-branch pair topology separate from severity', () => {
    for (const item of R144_SELF_PUNISHMENT_VARIANTS) {
      const expectedPairs =
        (item.repetitionCount * (item.repetitionCount - 1)) / 2;
      expect(item.sameBranchPairTopologyCount).toBe(expectedPairs);
      expect(item.observedStructuralForm).toBe('SAME_BRANCH_REPETITION');
      expect(item.structuralRepetitionObserved).toBe(true);
      expect(item.selfPunishmentTaxonomyObserved).toBe(true);
      expect(item.pairTopologyIsSeverity).toBe(false);
      expect(item.repetitionCountIsSeverity).toBe(false);
      expect(item.automaticHarmAuthorized).toBe(false);
      expect(item.numericSeverityAuthorized).toBe(false);
      expect(item.effectVerdict).toBeNull();
      expect(item.executable).toBe(false);
    }
  });

  it('rejects multiplicity, pair-count, and repetition shortcuts', () => {
    expect(R144_REJECTED_MULTIPLICITY_COLLAPSES).toEqual(
      expect.arrayContaining([
        'MORE_DIRECTED_CANDIDATES_MEANS_MORE_SEVERE',
        'MORE_SELF_REPETITIONS_MEANS_MORE_SEVERE',
        'PAIR_TOPOLOGY_COUNT_AS_SEVERITY_SCORE',
        'REPEATED_SOURCE_BRANCH_WINS_PRIORITY',
        'REPEATED_TARGET_BRANCH_WINS_PRIORITY',
        'MULTIPLE_DIRECTED_RELATIONS_AUTO_AGGREGATE',
        'SELF_PUNISHMENT_REPETITION_IMPLIES_HARM',
        'DIRECTED_PUNISHMENT_PRESENCE_IMPLIES_HARM',
        'THREE_REPETITIONS_AUTO_STRONGER_THAN_TWO',
        'FOUR_REPETITIONS_AUTO_STRONGER_THAN_THREE',
        'DIRECTED_RELATION_COUNT_AS_NUMERIC_WEIGHT',
        'SAME_BRANCH_PAIR_COUNT_AS_NUMERIC_WEIGHT',
        'STRUCTURAL_TAXONOMY_AS_CONTEXT_EFFECT',
        'RESEARCH_FIXTURE_AS_CANONICAL_BRANCH_XING_INPUT',
        'ARRAY_ORDER_AS_PUNISHMENT_PRECEDENCE',
        'FIRST_MATCH_AS_PUNISHMENT_SETTLEMENT',
      ]),
    );
  });

  it('pins upstream R056 and canonical-input boundaries closed', () => {
    expect(R144_UPSTREAM_BINDINGS.r056).toMatchObject({
      directedNonSelfRelationCount: 8,
      selfXingBranchCount: 4,
      structuralPresenceImpliesHarm: false,
      selfXingImpliesHarm: false,
      numericSeverityAuthorized: false,
      executableEffectResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
    expect(R144_UPSTREAM_BINDINGS.r056.executionGaps).toEqual(
      expect.arrayContaining([
        'XING_CONTEXT_EFFECT',
        'SELF_XING_MULTIPLICITY',
        'RELATION_COMPETITION',
        'ROLE_CONTEXT',
        'TIME_LAYER_ACTIVATION',
      ]),
    );
    expect(R144_UPSTREAM_BINDINGS.gejuPrimitiveReview).toMatchObject({
      canonicalBranchXingInputAvailable: false,
      generalizedEffectPredicateAuthorized: false,
      productionFactEmissionAuthorized: false,
    });
    expect(R144_UPSTREAM_BINDINGS.r141).toMatchObject({
      inputEnumerationOrderInvariantRepresentationObserved: true,
      firstMatchWinsAuthorized: false,
      sequentialMutationResolverAuthorized: false,
      numericRelationWeightAuthorized: false,
    });
  });

  it('keeps harm, severity, resolver, and production authority closed', () => {
    expect(R144_AUTHORITY).toMatchObject({
      researchOnly: true,
      allDirectedR056RelationsReplayed: true,
      allSelfPunishmentBranchesReplayed: true,
      directedRepetitionTopologyObserved: true,
      selfRepetitionMultiplicityObserved: true,
      structuralMultiplicityDistinctFromSeverityObserved: true,
      structuralMultiplicityDistinctFromHarmObserved: true,
      multiplicityAsSeverityAuthorized: false,
      candidateCountAsSeverityAuthorized: false,
      selfRepetitionCountAsSeverityAuthorized: false,
      repeatedSourcePriorityAuthorized: false,
      repeatedTargetPriorityAuthorized: false,
      automaticDirectedPunishmentHarmAuthorized: false,
      automaticSelfPunishmentHarmAuthorized: false,
      numericSeverityAuthorized: false,
      relationEffectResolverAuthorized: false,
      canonicalBranchXingProductionInputAuthorized: false,
      chartRoleFactEmissionAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
