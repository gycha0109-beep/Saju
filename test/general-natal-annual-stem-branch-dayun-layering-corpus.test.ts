import { describe, expect, it } from 'vitest';

import {
  R153_ANNUAL_PROPOSITION_ROWS,
  R153_ANNUAL_STEM_BRANCH_DAYUN_LAYERING_VERSION,
  R153_AUTHORITY,
  R153_GOVERNANCE_GUARDS,
  R153_LAYER_REQUIREMENT_ROWS,
  R153_REJECTED_COLLAPSES,
  R153_SUMMARY,
  R153_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-annual-stem-branch-dayun-layering-corpus.js';

describe('R153 annual stem/branch and Dayun layering corpus', () => {
  it('pins the 4 proposition + 6 layer requirement corpus', () => {
    expect(R153_ANNUAL_STEM_BRANCH_DAYUN_LAYERING_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R153_ANNUAL_PROPOSITION_ROWS).toHaveLength(4);
    expect(R153_LAYER_REQUIREMENT_ROWS).toHaveLength(6);
    expect(R153_SUMMARY).toEqual({
      annualPropositionReplayCount: 4,
      layerRequirementCount: 6,
      totalCorpusRowCount: 10,
      annualStemEmphasisObservedCount: 1,
      annualBranchParticipationObservedCount: 3,
      natalCompositionObservedCount: 1,
      dayunCompositionObservedCount: 1,
      intraAnnualComponentRequirementCount: 2,
      natalCompositionRequirementCount: 1,
      dayunCompositionRequirementCount: 1,
      crossLayerRelationCheckRequirementCount: 2,
      dayunMethodVariancePreservedRequirementCount: 3,
      governanceGuardCount: 4,
      executableCompositionAuthorizedCount: 0,
      interpretationClaimEmissionAuthorizedCount: 0,
      productionAuthorityPromotedCount: 0,
    });
  });

  it('preserves annual stem emphasis without dropping annual branch participation', () => {
    const stem = R153_ANNUAL_PROPOSITION_ROWS.find(
      (item) => item.proposition === 'ANNUAL_STEM_EMPHASIS',
    );
    const branch = R153_ANNUAL_PROPOSITION_ROWS.filter(
      (item) => item.annualBranchParticipationObserved,
    );

    expect(stem).toMatchObject({
      annualStemEmphasisObserved: true,
      annualStemOnlyAuthorized: false,
      annualBranchIgnoredAuthorized: false,
      fixedStemBranchPrecedenceAuthorized: false,
      numericWeightAuthorized: false,
    });
    expect(branch).toHaveLength(3);
  });

  it('requires natal, Dayun, meeting/combination, and punishment/clash composition layers', () => {
    expect(R153_LAYER_REQUIREMENT_ROWS.map((item) => item.requirementId)).toEqual([
      'ANNUAL_STEM_COMPONENT_RETAINED',
      'ANNUAL_BRANCH_COMPONENT_RETAINED',
      'NATAL_DAY_STEM_CONTEXT_REQUIRED',
      'DAYUN_CONTEXT_REQUIRED',
      'MEETING_COMBINATION_CHECK_REQUIRED',
      'PUNISHMENT_CLASH_CHECK_REQUIRED',
    ]);

    expect(
      R153_LAYER_REQUIREMENT_ROWS.every(
        (item) =>
          item.requiredForFaithfulR074Composition === true &&
          item.annualFactRemainsInputEvidence === true &&
          item.crossLayerWinnerAuthorized === false &&
          item.executableCompositionAuthorized === false,
      ),
    ).toBe(true);
  });

  it('propagates unresolved R152 Dayun methodology into annual composition', () => {
    const dayunSensitive = R153_LAYER_REQUIREMENT_ROWS.filter(
      (item) => item.dayunMethodVariancePreserved,
    );
    expect(dayunSensitive).toHaveLength(3);

    expect(R153_UPSTREAM_BINDINGS.r152).toMatchObject({
      methodologyFormulationVarianceObserved: true,
      fiveYearStemBranchAssignmentAuthorized: false,
      methodWinnerResolverAuthorized: false,
      executableDayunWeightingResolverAuthorized: false,
    });
  });

  it('keeps annual temporal facts as input evidence rather than semantic authority', () => {
    expect(R153_UPSTREAM_BINDINGS.generalAnnualBridge).toMatchObject({
      disposition: 'RETURN_TO_RESEARCH',
      annualPillarIsInputFactNotInterpretationAuthority: true,
      annualStemTenGodIsInputFactNotThemeAuthority: true,
      annualBranchRelationIsInputFactNotEventAuthority: true,
      annualSpecificSourceAuthorityEstablished: false,
      engineAuthorityPromotionAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      productionAdmissionAuthority: false,
    });
  });

  it('pins all governance guards satisfied and authority closed', () => {
    expect(R153_GOVERNANCE_GUARDS).toHaveLength(4);
    expect(
      R153_GOVERNANCE_GUARDS.every(
        (item) =>
          item.satisfied === true &&
          item.executableCompositionAuthorized === false &&
          item.interpretationClaimEmissionAuthorized === false &&
          item.productionAuthorityPromoted === false,
      ),
    ).toBe(true);
  });

  it('rejects fixed weights, layer winners, event bridges, and authority inheritance', () => {
    expect(R153_REJECTED_COLLAPSES).toEqual(
      expect.arrayContaining([
        'ANNUAL_STEM_ONLY',
        'ANNUAL_BRANCH_IGNORED',
        'ANNUAL_STEM_ALWAYS_WINS_BRANCH',
        'ANNUAL_STEM_70_BRANCH_30',
        'ANNUAL_BRANCH_30_STEM_70',
        'ANNUAL_ROOT_SUPPORT_AS_NUMERIC_MULTIPLIER',
        'DAYUN_METHOD_AUTO_SELECTED_DURING_ANNUAL_COMPOSITION',
        'R152_SOURCE_COUNT_AS_DAYUN_METHOD_WINNER',
        'R152_FIRST_MATCH_AS_DAYUN_METHOD_SELECTION',
        'ANNUAL_OVER_DAYUN_GLOBAL_PRECEDENCE',
        'DAYUN_OVER_ANNUAL_GLOBAL_PRECEDENCE',
        'NATAL_DAY_STEM_COMPARISON_AS_EVENT_PREDICTION',
        'MEETING_COMBINATION_CHECK_AS_EVENT_GUARANTEE',
        'PUNISHMENT_CLASH_CHECK_AS_EVENT_GUARANTEE',
        'CROSS_LAYER_RELATION_COUNT_AS_SEVERITY',
        'ANNUAL_PILLAR_AS_INTERPRETATION_AUTHORITY',
        'ANNUAL_STEM_TEN_GOD_AS_THEME_AUTHORITY',
        'ANNUAL_BRANCH_RELATION_AS_EVENT_AUTHORITY',
        'EXECUTABLE_RESEARCH_CANDIDATE_AS_ENGINE_AUTHORITY',
      ]),
    );
  });

  it('keeps annual composition and production promotion closed', () => {
    expect(R153_UPSTREAM_BINDINGS.r074).toMatchObject({
      propositionCount: 4,
      annualStemOnlyAuthorized: false,
      universalNumericWeightAuthorized: false,
      executableAnnualPrecedenceResolverAuthorized: false,
    });
    expect(R153_UPSTREAM_BINDINGS.r151).toMatchObject({
      natalBaselineDistinctFromTemporalOverlayObserved: true,
      dayunMeaningDependsOnNatalContextObserved: true,
      generalTemporalTransitionResolverAuthorized: false,
      permanentNatalMutationAuthorized: false,
    });

    expect(R153_AUTHORITY).toMatchObject({
      researchOnly: true,
      annualStemEmphasisWithBranchParticipationPreserved: true,
      annualStemBranchRootSupportDependencyObserved: true,
      natalAnnualCompositionRequirementObserved: true,
      dayunAnnualCompositionRequirementObserved: true,
      crossLayerMeetingCombinationCheckObserved: true,
      crossLayerPunishmentClashCheckObserved: true,
      unresolvedDayunMethodologyPropagatedObserved: true,
      annualFactsDistinctFromInterpretationAuthorityObserved: true,
      annualSpecificAuthorityReturnToResearchObserved: true,
      annualStemOnlyAuthorized: false,
      annualBranchIgnoringAuthorized: false,
      fixedAnnualStemBranchPrecedenceAuthorized: false,
      numericAnnualWeightAuthorized: false,
      automaticDayunMethodSelectionAuthorized: false,
      crossLayerPrecedenceResolverAuthorized: false,
      deterministicAnnualEventAuthorized: false,
      executableAnnualCompositionResolverAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
