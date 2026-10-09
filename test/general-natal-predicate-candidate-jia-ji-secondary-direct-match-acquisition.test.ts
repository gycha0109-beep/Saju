import { describe, expect, it } from 'vitest';

import {
  R184_AUTHORITY,
  R184_DIRECT_MATCH_AUDIT,
  R184_JIA_JI_SECONDARY_DIRECT_MATCH_ACQUISITION_VERSION,
  R184_PROVENANCE_BOUNDARY,
  R184_REJECTED_SHORTCUTS,
  R184_REQUIRED_FOLLOW_UP,
  R184_R179_REQUIREMENT_REASSESSMENT,
  R184_SECONDARY_CANDIDATES,
  R184_SEMANTIC_BOUNDARY,
} from '../src/research/general-natal-predicate-candidate-jia-ji-secondary-direct-match-acquisition.js';

describe('R184 Jia-Ji secondary direct-match acquisition', () => {
  it('binds modern direct-match Jia-Ji candidates without primary authority', () => {
    expect(R184_JIA_JI_SECONDARY_DIRECT_MATCH_ACQUISITION_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R184_SECONDARY_CANDIDATES).toHaveLength(4);
    for (const candidate of R184_SECONDARY_CANDIDATES) {
      expect(candidate.exactPair).toEqual(['甲', '己']);
      expect(candidate.primaryOrCanonicalWitnessBound).toBe(false);
      expect(candidate.lineageIndependenceEstablished).toBe(false);
      expect(candidate.normativeAuthorityAcquired).toBe(false);
    }
  });

  it('captures one exact non-day-master same-pair coexistence case candidate', () => {
    const candidate = R184_SECONDARY_CANDIDATES.find(
      (item) =>
        item.candidateId === 'R184-C02-READ01-NON-DAY-MASTER-JIA-JI-CASE',
    );
    expect(candidate).toMatchObject({
      authorityClass: 'MODERN_SECONDARY_DIRECT_CASE',
      dayStem: '庚',
      bothJiaAndJiNonDayMaster: true,
      exactCombinationObserved: true,
      controllerRoleAssignedToJia: true,
      controlledRoleAssignedToJi: true,
      differentiatedFunctionalLossClaimObserved: true,
      exactSamePairCoexistenceTopologyObserved: true,
      normativeAuthorityAcquired: false,
    });
  });

  it('records a same-pair reduced-control candidate separately from the non-day-master case', () => {
    const candidate = R184_SECONDARY_CANDIDATES.find(
      (item) =>
        item.candidateId === 'R184-C03-READ01-HE-ZHONG-YOU-KE-CASE',
    );
    expect(candidate).toMatchObject({
      dayStem: '己',
      bothJiaAndJiNonDayMaster: false,
      exactCombinationObserved: true,
      exactControlInsideCombinationObserved: true,
      reducedControlStrengthClaimObserved: true,
      exactSamePairCoexistenceTopologyObserved: true,
    });
  });

  it('preserves a competing modern frame instead of collapsing modern sources into one rule', () => {
    const candidate = R184_SECONDARY_CANDIDATES.find(
      (item) =>
        item.candidateId === 'R184-C04-HEYIX-MINGLI-GUOSANGUAN-FRAME',
    );
    expect(candidate).toMatchObject({
      authorityClass: 'MODERN_SCHOOL_COMPETING_FRAME',
      multipleJiaJiRelationModesObserved: true,
      controlModeObserved: true,
      mutualBindingModeObserved: true,
      transformationModeObserved: true,
      singleDeterministicSettlementRejectedBySourceFrame: true,
      citedBookPrimaryTextAcquired: false,
    });
  });

  it('summarizes real direct-match progress with zero normative promotion', () => {
    expect(R184_DIRECT_MATCH_AUDIT).toEqual({
      candidateCount: 4,
      exactPairCandidateCount: 4,
      exactSamePairCoexistenceCandidateCount: 2,
      exactNonDayMasterDirectCaseCandidateCount: 1,
      modernRuleCandidateCount: 1,
      modernCaseCandidateCount: 2,
      competingModernFrameCount: 1,
      primaryOrCanonicalWitnessBoundCount: 0,
      lineageIndependentCandidateCount: 0,
      normativeAuthorityAcquiredCount: 0,
    });
  });

  it('narrows the R179 coexistence gap from candidate absence to provenance authority', () => {
    expect(R184_R179_REQUIREMENT_REASSESSMENT).toMatchObject({
      requirementId: 'CONTROL_AND_COMBINATION_COEXISTENCE_SEMANTICS',
      r183ExactPairTraditionalDualRelationDeclarationsObserved: true,
      r183ExactPairSameConfigurationSettlementObserved: false,
      r184SecondaryExactSamePairCoexistenceCandidateObserved: true,
      r184SecondaryExactNonDayMasterDirectCaseObserved: true,
      primaryOrCanonicalDirectMatchAuthorityObserved: false,
      currentlySatisfiedByNormativeAuthority: false,
    });
    expect(R184_R179_REQUIREMENT_REASSESSMENT.remainingGap.length).toBeGreaterThan(
      0,
    );
  });

  it('regression-locks provenance and semantic boundaries', () => {
    expect(R184_PROVENANCE_BOUNDARY).toEqual({
      directTopologyCandidateNowExists: true,
      exactNonDayMasterDirectCaseCandidateNowExists: true,
      modernSecondaryMayGuidePrimarySourceSearch: true,
      modernSecondaryMaySatisfyNormativeAuthorityByItself: false,
      repeatedWebTextMayBeAssumedIndependent: false,
      originalAuthorOrFirstPublicationEstablished: false,
      primaryPrintedWitnessEstablished: false,
      canonicalTraditionalLineageEstablished: false,
      competingModernOutcomeFramesObserved: true,
    });
    expect(R184_SEMANTIC_BOUNDARY).toEqual({
      secondaryControlInsideCombinationMayBeCandidate: true,
      secondaryReducedControlStrengthMayBeCandidate: true,
      secondaryDifferentiatedFunctionalLossMayBeCandidate: true,
      secondaryMutualBindingMayBeCandidate: true,
      anyCandidateIsEstablishedJiaJiOutcome: false,
      reducedControlStrengthMayBeNumericWeight: false,
      differentiatedFunctionalLossMayBeProductionClaim: false,
      mutualBindingMayBeGenericJiaJiVerdict: false,
      directMatchTopologyDoesNotCloseAuthorityGap: true,
    });
    expect(R184_REJECTED_SHORTCUTS).toContain(
      'DIRECT_MATCH_WEB_CASE_EQUALS_NORMATIVE_AUTHORITY',
    );
    expect(R184_REQUIRED_FOLLOW_UP).toContain(
      'TRACE_DIRECT_MATCH_SECONDARY_TEXT_TO_EARLIEST_ATTRIBUTABLE_SOURCE',
    );
  });

  it('leaves every executable and production authority closed', () => {
    expect(R184_AUTHORITY).toMatchObject({
      researchOnly: true,
      exactPairSecondaryDirectMatchCandidateObserved: true,
      exactNonDayMasterSecondaryDirectCaseObserved: true,
      primaryOrCanonicalDirectMatchAuthorityObserved: false,
      originalSourceLineageResolved: false,
      competingModernOutcomeFramesObserved: true,
      pairLocalNormativeAuthorityAcquired: false,
      pairLocalInteractionOutcomeEstablished: false,
      coexistenceSettlementEstablished: false,
      exactContextSettlementEstablished: false,
      crossRelationPrecedenceAuthorized: false,
      executableResolverAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
