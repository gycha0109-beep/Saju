import { describe, expect, it } from 'vitest';

import {
  R142_AUTHORITY,
  R142_COMPETING_STEM_COMBINATION_TARGET_VERSION,
  R142_COMPETITION_CASES,
  R142_ORDER_VARIANTS,
  R142_REJECTED_TARGET_SELECTION_SHORTCUTS,
  R142_SUMMARY,
  R142_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-competing-heavenly-stem-combination-target-corpus.js';

describe('R142 competing heavenly-stem combination target corpus', () => {
  it('pins the deterministic corpus shape', () => {
    expect(R142_COMPETING_STEM_COMBINATION_TARGET_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R142_SUMMARY).toEqual({
      familyCount: 5,
      caseCount: 20,
      oneLeftTwoRightCaseCount: 5,
      twoLeftOneRightCaseCount: 5,
      twoLeftTwoRightCaseCount: 5,
      oneLeftThreeRightCaseCount: 5,
      candidateCount: 55,
      competingTargetCount: 35,
      degreeTwoCompetingTargetCount: 30,
      degreeThreeCompetingTargetCount: 5,
      orderVariantCount: 80,
      orderVariantsPerCase: 4,
      selectedCandidateCount: 0,
      orderVariantWinnerCount: 0,
      effectiveCombinationAuthorizedCount: 0,
      transformationAuthorizedCount: 0,
      executableCount: 0,
    });
  });

  it('covers all five R051 combination families with all four competition topologies', () => {
    expect(new Set(R142_COMPETITION_CASES.map((item) => item.familyPairId)).size).toBe(5);

    for (const familyPairId of new Set(
      R142_COMPETITION_CASES.map((item) => item.familyPairId),
    )) {
      const familyCases = R142_COMPETITION_CASES.filter(
        (item) => item.familyPairId === familyPairId,
      );
      expect(familyCases).toHaveLength(4);
      expect(new Set(familyCases.map((item) => item.topology)).size).toBe(4);
    }
  });

  it('preserves every structural pair candidate rather than selecting one target', () => {
    for (const item of R142_COMPETITION_CASES) {
      expect(item.competitionPresent).toBe(true);
      expect(item.competingTargetCount).toBeGreaterThan(0);
      expect(item.candidates.every((candidate) => candidate.pairIdentityVerified)).toBe(true);
      expect(
        item.candidates.every(
          (candidate) =>
            candidate.targetSelectionAuthorized === false &&
            candidate.effectiveCombinationAuthorized === false &&
            candidate.transformationAuthorized === false &&
            candidate.numericPriority === null,
        ),
      ).toBe(true);
      expect(
        item.targets.every(
          (target) =>
            target.selectedCandidateId === null &&
            target.selectionReason === null &&
            target.targetSelectionAuthorized === false,
        ),
      ).toBe(true);
    }
  });

  it('captures degree-two and degree-three competing targets', () => {
    const targets = R142_COMPETITION_CASES.flatMap((item) => item.targets);
    expect(targets.filter((item) => item.candidateDegree === 2)).toHaveLength(30);
    expect(targets.filter((item) => item.candidateDegree === 3)).toHaveLength(5);
    expect(
      targets
        .filter((item) => item.competing)
        .every((item) => item.candidateDegree >= 2),
    ).toBe(true);
  });

  it('keeps candidate and per-target candidate sets invariant across slot-order controls', () => {
    for (const competitionCase of R142_COMPETITION_CASES) {
      const variants = R142_ORDER_VARIANTS.filter(
        (item) => item.caseId === competitionCase.caseId,
      );
      expect(variants).toHaveLength(4);
      expect(new Set(variants.map((item) => item.inputSlotOrder.join('|'))).size).toBe(4);
      expect(new Set(variants.map((item) => item.candidateSetKey)).size).toBe(1);
      expect(new Set(variants.map((item) => item.targetCandidateSetKey)).size).toBe(1);
      expect(
        variants.every(
          (item) =>
            item.selectedCandidateId === null &&
            item.firstObservedCandidateWins === false &&
            item.nearestObservedCandidateWins === false &&
            item.adjacencyObservedCandidateWins === false &&
            item.dayStemPreferenceApplied === false &&
            item.monthStemPreferenceApplied === false &&
            item.numericWeightApplied === false &&
            item.executable === false,
        ),
      ).toBe(true);
    }
  });

  it('does not smuggle positional preferences into target selection', () => {
    expect(R142_REJECTED_TARGET_SELECTION_SHORTCUTS).toEqual(
      expect.arrayContaining([
        'NEAREST_SLOT_WINS',
        'ADJACENT_SLOT_WINS',
        'DAY_STEM_ALWAYS_WINS',
        'MONTH_STEM_ALWAYS_WINS',
        'EARLIEST_SLOT_WINS',
        'LATEST_SLOT_WINS',
        'ARRAY_ORDER_SELECTS_CANDIDATE',
        'FIRST_MATCH_SHORT_CIRCUIT',
        'RELATION_ID_LEXICAL_ORDER_SELECTS_CANDIDATE',
        'PAIR_COUNT_AS_CONFIDENCE',
        'NUMERIC_DISTANCE_SCORE',
        'MOST_SUPPORTED_CANDIDATE_WINS',
        'DUPLICATE_COUNTERPARTS_COLLAPSE_TO_ONE',
        'MULTIPLE_CANDIDATES_IMPLIES_EFFECTIVE_COMBINATION',
        'COMPETITION_IMPLIES_NO_COMBINATION',
        'PAIR_IDENTITY_IMPLIES_TRANSFORMATION',
      ]),
    );
  });

  it('pins R051 and R141 execution boundaries closed', () => {
    expect(R142_UPSTREAM_BINDINGS.r051).toMatchObject({
      pairFamilyCount: 5,
      effectiveCombinationResolverAuthorized: false,
      transformationResolverAuthorized: false,
      wholeChartHuacqiResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
    expect(R142_UPSTREAM_BINDINGS.r141).toMatchObject({
      inputEnumerationOrderInvariantRepresentationObserved: true,
      firstMatchWinsAuthorized: false,
      sequentialMutationResolverAuthorized: false,
      numericRelationWeightAuthorized: false,
    });
  });

  it('keeps all selection, transformation, and production authority closed', () => {
    expect(R142_AUTHORITY).toMatchObject({
      researchOnly: true,
      allFiveCombinationFamiliesCovered: true,
      repeatedCounterpartCompetitionRepresented: true,
      allStructuralCandidatesPreserved: true,
      perTargetCandidateDegreeObserved: true,
      inputSlotOrderInvariantCandidateRepresentationObserved: true,
      targetWinnerResolverAuthorized: false,
      nearestTargetSelectionAuthorized: false,
      adjacencyTargetSelectionAuthorized: false,
      dayStemPreferenceAuthorized: false,
      monthStemPreferenceAuthorized: false,
      arrayOrderTargetSelectionAuthorized: false,
      firstMatchSelectionAuthorized: false,
      numericDistanceWeightAuthorized: false,
      effectiveCombinationResolverAuthorized: false,
      transformationResolverAuthorized: false,
      transformationTargetElementEmissionAuthorized: false,
      chartRoleFactEmissionAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
