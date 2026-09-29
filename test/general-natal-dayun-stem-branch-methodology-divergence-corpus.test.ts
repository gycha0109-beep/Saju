import { describe, expect, it } from 'vitest';

import {
  R152_AUTHORITY,
  R152_DAYUN_STEM_BRANCH_METHODOLOGY_DIVERGENCE_VERSION,
  R152_GOVERNANCE_GUARDS,
  R152_PAIRWISE_COMPARISONS,
  R152_REJECTED_COLLAPSES,
  R152_SOURCE_PROPOSITION_ROWS,
  R152_SUMMARY,
  R152_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-dayun-stem-branch-methodology-divergence-corpus.js';

describe('R152 Dayun stem/branch methodology divergence corpus', () => {
  it('pins the 4 source rows + 6 pairwise comparisons', () => {
    expect(R152_DAYUN_STEM_BRANCH_METHODOLOGY_DIVERGENCE_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R152_SOURCE_PROPOSITION_ROWS).toHaveLength(4);
    expect(R152_PAIRWISE_COMPARISONS).toHaveLength(6);
    expect(R152_SUMMARY).toEqual({
      sourcePropositionRowCount: 4,
      pairwiseComparisonCount: 6,
      totalCorpusRowCount: 10,
      sourceFamilyTagCount: 2,
      partialOverlapCount: 5,
      incomparableCount: 1,
      parallelPreservationOnlyCount: 1,
      conditionalComplementCandidateCount: 2,
      operationalMappingRequiredCount: 3,
      differentSourceFamilyPairCount: 3,
      schoolLineageDivergenceEstablishedCount: 0,
      methodWinnerAuthorizedCount: 0,
      numericPriorityAuthorizedCount: 0,
      executableResolutionAuthorizedCount: 0,
      productionAuthorityPromotedCount: 0,
      governanceGuardCount: 5,
    });
  });

  it('preserves all four R071 propositions without numeric or executable authority', () => {
    expect(R152_SOURCE_PROPOSITION_ROWS.map((item) => item.proposition)).toEqual([
      'DAYUN_BRANCH_EMPHASIS',
      'STEM_PERIOD_WITH_BRANCH_PARTICIPATION',
      'BRANCH_PERIOD_STEM_DISCARD_IN_ONE_FORMULATION',
      'TEN_YEAR_UPPER_LOWER_FIVE_YEAR_SPLIT',
    ]);

    expect(
      R152_SOURCE_PROPOSITION_ROWS.every(
        (item) =>
          item.sourceFamilyTagIsLineageAssertion === false &&
          item.schoolLineageAssertionState === 'INCONCLUSIVE' &&
          item.numericWeightAuthorized === false &&
          item.universalStemBranchPrecedenceAuthorized === false &&
          item.fiveYearOperationalMappingAuthorized === false &&
          item.executable === false &&
          item.productionAuthorityPromoted === false,
      ),
    ).toBe(true);
  });

  it('keeps source-family labels descriptive rather than treating them as school lineage', () => {
    expect(
      R152_PAIRWISE_COMPARISONS.filter(
        (item) => item.differentSourceFamilyTagsObserved,
      ),
    ).toHaveLength(3);

    expect(
      R152_PAIRWISE_COMPARISONS.every(
        (item) =>
          item.sourceFamilyDifferenceImpliesSchoolDivergence === false &&
          item.schoolLineageDivergenceEstablished === false,
      ),
    ).toBe(true);
  });

  it('preserves the Sanming period propositions as conditional candidates without inventing the five-year map', () => {
    const complement = R152_PAIRWISE_COMPARISONS.find(
      (item) =>
        item.leftUpstreamId === 'SANMING-STEM-PERIOD-WITH-BRANCH' &&
        item.rightUpstreamId === 'SANMING-BRANCH-PERIOD-DISCARD-STEM',
    );

    expect(complement).toMatchObject({
      propositionRelation: 'PARTIAL_OVERLAP',
      compositionDisposition: 'CONDITIONAL_COMPLEMENT_CANDIDATE',
      fiveYearOperationalMappingAuthorized: false,
      executableResolutionAuthorized: false,
    });

    const splitPairs = R152_PAIRWISE_COMPARISONS.filter(
      (item) =>
        item.leftUpstreamId === 'SANMING-V12-FIVE-YEAR-SPLIT' ||
        item.rightUpstreamId === 'SANMING-V12-FIVE-YEAR-SPLIT',
    );
    expect(splitPairs).toHaveLength(3);
    expect(
      splitPairs.every(
        (item) =>
          item.compositionDisposition === 'OPERATIONAL_MAPPING_REQUIRED' &&
          item.fiveYearOperationalMappingAuthorized === false,
      ),
    ).toBe(true);
  });

  it('does not manufacture semantic equivalence, method winners, or numeric priorities', () => {
    expect(
      R152_PAIRWISE_COMPARISONS.every(
        (item) =>
          item.semanticEquivalenceEstablished === false &&
          item.methodWinnerAuthorized === false &&
          item.numericPriorityAuthorized === false &&
          item.universalStemBranchPrecedenceAuthorized === false &&
          item.automaticCanonicalMethodSelectionAuthorized === false &&
          item.executableResolutionAuthorized === false,
      ),
    ).toBe(true);
  });

  it('pins five upstream governance guards', () => {
    expect(R152_GOVERNANCE_GUARDS).toHaveLength(5);
    expect(
      R152_GOVERNANCE_GUARDS.every(
        (item) =>
          item.satisfied === true &&
          item.executableResolutionAuthorized === false &&
          item.productionAuthorityPromoted === false,
      ),
    ).toBe(true);
  });

  it('pins upstream boundaries closed', () => {
    expect(R152_UPSTREAM_BINDINGS.r071).toMatchObject({
      propositionCount: 4,
      universalNumericWeightAuthorized: false,
      fiveYearStemBranchAssignmentAuthorized: false,
      executableDayunWeightingResolverAuthorized: false,
    });
    expect(R152_UPSTREAM_BINDINGS.r095).toMatchObject({
      lineageAndPropositionRelationsSeparated: true,
      propositionComparisonRequiredForDivergence: true,
      unknownLineagePreserved: true,
      crossSchoolBlendWithoutCompositionPolicyAuthorized: false,
    });
    expect(R152_UPSTREAM_BINDINGS.r139).toMatchObject({
      evidenceCoexistenceDistinctFromSemanticCompositionObserved: true,
      semanticCompositionDistinctFromExecutableResolutionObserved: true,
      globalCompositionAuthorized: false,
      methodWinnerResolverAuthorized: false,
      numericMethodPriorityAuthorized: false,
    });
    expect(R152_UPSTREAM_BINDINGS.r140).toMatchObject({
      adversarialOrderPreservationObserved: true,
      methodWinnerLeakObserved: false,
      numericPriorityLeakObserved: false,
      automaticTieBreakAuthorized: false,
    });
    expect(R152_UPSTREAM_BINDINGS.r151).toMatchObject({
      natalBaselineDistinctFromTemporalOverlayObserved: true,
      dayunMeaningDependsOnNatalContextObserved: true,
      generalTemporalTransitionResolverAuthorized: false,
      numericTemporalWeightAuthorized: false,
    });
  });

  it('rejects numeric, lineage, source-count, and automatic method-selection collapses', () => {
    expect(R152_REJECTED_COLLAPSES).toEqual(
      expect.arrayContaining([
        'STEM_50_BRANCH_50',
        'STEM_30_BRANCH_70',
        'BRANCH_ALWAYS_OVERRIDES_STEM_UNIVERSALLY',
        'YUANHAI_LABEL_AS_CANONICAL_METHOD',
        'SANMING_LABEL_AS_CANONICAL_METHOD',
        'SOURCE_FAMILY_TAG_EQUALS_SCHOOL_LINEAGE',
        'DIFFERENT_SOURCE_FAMILY_TAGS_IMPLY_SCHOOL_DIVERGENCE',
        'SAME_SOURCE_FAMILY_TAG_IMPLIES_SEMANTIC_EQUIVALENCE',
        'SOURCE_COUNT_AS_METHOD_WINNER',
        'POPULARITY_AS_METHOD_WINNER',
        'SENIORITY_AS_METHOD_WINNER',
        'ARRAY_ORDER_AS_METHOD_PRIORITY',
        'FIRST_MATCH_AS_METHOD_SELECTION',
        'FIVE_YEAR_SPLIT_EQUALS_FIRST_FIVE_STEM_SECOND_FIVE_BRANCH',
        'FIVE_YEAR_SPLIT_EQUALS_FIRST_FIVE_BRANCH_SECOND_FIVE_STEM',
        'BRANCH_PERIOD_DISCARD_STEM_AS_UNIVERSAL_STEM_IGNORING',
        'STEM_PERIOD_WITH_BRANCH_AS_UNIVERSAL_EQUAL_WEIGHT',
        'NUMERIC_WEIGHT_TO_RECONCILE_METHODS',
        'AUTO_SELECT_CANONICAL_DAYUN_METHOD',
        'METHOD_VARIANCE_AS_INTERPRETATION_CLAIM_AUTHORITY',
      ]),
    );
  });

  it('keeps all semantic and production promotion authority closed', () => {
    expect(R152_AUTHORITY).toMatchObject({
      researchOnly: true,
      r071SourcePropositionsPreserved: true,
      sourceFamilyTagsPreservedAsDescriptiveOnly: true,
      pairwisePropositionComparisonObserved: true,
      partialOverlapObserved: true,
      incomparableWithoutOperationalMappingObserved: true,
      conditionalComplementCandidateObserved: true,
      fiveYearSplitOperationalMappingGapPreserved: true,
      methodologyFormulationVarianceObserved: true,
      lineageAndPropositionRelationsSeparated: true,
      schoolLineageDivergenceEstablished: false,
      semanticEquivalenceEstablished: false,
      universalStemBranchPrecedenceAuthorized: false,
      universalNumericWeightAuthorized: false,
      fiveYearStemBranchAssignmentAuthorized: false,
      methodWinnerResolverAuthorized: false,
      numericMethodPriorityAuthorized: false,
      automaticCanonicalMethodSelectionAuthorized: false,
      executableDayunWeightingResolverAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
