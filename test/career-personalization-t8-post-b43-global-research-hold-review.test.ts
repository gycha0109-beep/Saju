import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_FAMILY_REMEDIATION_TRIGGER_READINESS_REVIEW_VERSION,
  CAREER_T8_B43_FAMILY_REMEDIATION_TRIGGER_CONTRACTS,
  CAREER_T8_B43_FAMILY_REMEDIATION_TRIGGER_CONTROL_IDS,
  type CareerPersonalizationT8FamilyRemediationTriggerReadinessReviewReport,
} from '../src/research/career-personalization-t8-family-remediation-trigger-readiness-review.js';
import {
  CAREER_PERSONALIZATION_T8_POST_B43_GLOBAL_RESEARCH_HOLD_REVIEW_VERSION,
  CAREER_T8_B44_GLOBAL_REOPEN_SIGNAL_CLASSES,
  CAREER_T8_B44_GLOBAL_RESEARCH_FRONTIER_RECORDS,
  CAREER_T8_B44_GLOBAL_RESEARCH_HOLD_CONTROL_IDS,
  buildCareerPersonalizationT8PostB43GlobalResearchHoldReview,
} from '../src/research/career-personalization-t8-post-b43-global-research-hold-review.js';

function acceptedB43(): CareerPersonalizationT8FamilyRemediationTriggerReadinessReviewReport {
  const material: Omit<CareerPersonalizationT8FamilyRemediationTriggerReadinessReviewReport, 'reviewId'> = {
    reviewVersion: CAREER_PERSONALIZATION_T8_FAMILY_REMEDIATION_TRIGGER_READINESS_REVIEW_VERSION,
    status: 'RESOLVED_FAMILY_RELATION_CURRENT_METHOD_COMPATIBLE_PUBLISHED_SOURCE_REMEDIATION_READINESS_REVIEW',
    decision:
      'THREE_FAMILY_REMEDIATION_TRIGGER_CONTRACTS_FROZEN_ZERO_SATISFIED_RESUME_ONLY_ON_PATH_COMPLETE_EVIDENCE_OR_METHOD_CHANGE_NO_AUTHORITY_ADMISSION',
    upstreamB42ReviewId: 'b42_fixture_for_b44',
    exactB42BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    triggerContracts: CAREER_T8_B43_FAMILY_REMEDIATION_TRIGGER_CONTRACTS,
    triggerContractCount: 3,
    currentlySatisfiedTriggerCount: 0,
    currentlyExecutableFamilyResearchLaneCount: 0,
    career2017TriggerSatisfied: false,
    semantic2015TriggerSatisfied: false,
    independentCompletePathTriggerSatisfied: false,
    career2017TargetRelationBodyAcquired: false,
    semantic2015ExactEditionBindingEstablished: false,
    semantic2015MandatoryStrengthTransformationDependencyPreserved: true,
    currentMethodConsumesRequired2015Dimensions: false,
    familyCurrentMethodCompatiblePathCount: 0,
    familyAdmissionReadyCandidateCount: 0,
    familyCoverageClass: 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE',
    qianliHistoricalPathPreserved: true,
    broadSearchRestartAuthorized: false,
    repeatedUnchangedSurfaceSearchAuthorized: false,
    crossSourceRequirementStitchingAuthorized: false,
    activationAutomaticallyAdmitsAuthority: false,
    activationAutomaticallyClosesGap: false,
    activationAlwaysRequiresAdequacyReview: true,
    familyAuthorityAdmittedByThisGate: false,
    familyGapClosureReady: false,
    positionBoundedAuthorityComponentCountPreserved: 1,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityGapClosedByThisGate: false,
    numericWeightingIntroduced: false,
    occupationModernizationUsed: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: CAREER_T8_B43_FAMILY_REMEDIATION_TRIGGER_CONTROL_IDS,
    controlCount: 12,
    controlsFrozen: true,
    recommendedNextGate: 'CAREER_PERSONALIZATION_T8_POST_B43_GLOBAL_RESEARCH_HOLD_REVIEW',
  };

  return {
    reviewId: `career_personalization_t8_family_remediation_trigger_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career T8 post-B43 global research hold', () => {
  test('accepts the exact content-addressed B43 boundary', () => {
    const report = buildCareerPersonalizationT8PostB43GlobalResearchHoldReview(acceptedB43());
    expect(report.reviewVersion).toBe(CAREER_PERSONALIZATION_T8_POST_B43_GLOBAL_RESEARCH_HOLD_REVIEW_VERSION);
    expect(report.status).toBe('RESOLVED_CAREER_PERSONALIZATION_T8_POST_B43_GLOBAL_RESEARCH_HOLD_REVIEW');
    expect(report.decision).toBe(
      'GLOBAL_TRIGGER_GATED_RESEARCH_HOLD_ZERO_EXECUTABLE_LANES_RESUME_ONLY_ON_EXPLICIT_EVIDENCE_OR_GOVERNED_METHOD_CHANGE',
    );
    expect(report.exactB43BoundaryAccepted).toBe(true);
    expect(report.globalResearchHoldActive).toBe(true);
  });

  test('freezes the complete nine-lane global frontier', () => {
    const report = buildCareerPersonalizationT8PostB43GlobalResearchHoldReview(acceptedB43());
    expect(report.frontierRecords).toEqual(CAREER_T8_B44_GLOBAL_RESEARCH_FRONTIER_RECORDS);
    expect(report.frontierRecordCount).toBe(9);
  });

  test('preserves one admitted bounded Position component without composite gap closure', () => {
    const report = buildCareerPersonalizationT8PostB43GlobalResearchHoldReview(acceptedB43());
    const position = report.frontierRecords.find((record) => record.laneId === 'POSITION_CURRENT_T5_BRIDGE');
    expect(report.admittedBoundedAuthorityComponentCountPreserved).toBe(1);
    expect(position?.state).toBe('AUTHORITY_ADMITTED_BOUNDED_COMPONENT');
    expect(report.authorityGapClosedByThisGate).toBe(false);
  });

  test('preserves Branch on zero-of-two remediation trigger hold', () => {
    const report = buildCareerPersonalizationT8PostB43GlobalResearchHoldReview(acceptedB43());
    const branch = report.frontierRecords.find((record) => record.laneId === 'BRANCH_CLASH_CURRENT_T5_BRIDGE');
    expect(report.branchTriggerContractCountPreserved).toBe(2);
    expect(report.branchSatisfiedTriggerCount).toBe(0);
    expect(branch?.state).toBe('REMEDIATION_TRIGGER_HOLD_0_OF_2');
  });

  test('preserves Family on zero-of-three remediation trigger hold', () => {
    const report = buildCareerPersonalizationT8PostB43GlobalResearchHoldReview(acceptedB43());
    const family = report.frontierRecords.find((record) => record.laneId === 'FAMILY_RELATION_CURRENT_T5_BRIDGE');
    expect(report.familyTriggerContractCountPreserved).toBe(3);
    expect(report.familySatisfiedTriggerCount).toBe(0);
    expect(family?.state).toBe('REMEDIATION_TRIGGER_HOLD_0_OF_3');
  });

  test('preserves Qin and Qianli as external evidence surface holds', () => {
    const report = buildCareerPersonalizationT8PostB43GlobalResearchHoldReview(acceptedB43());
    expect(report.externalEvidenceSurfaceHoldCount).toBe(2);
    expect(report.qinP464DirectBodyAcquired).toBe(false);
    expect(report.qianli1936P50ToP53ExactPagesBound).toBe(false);
  });

  test('preserves visibility plurality and seasonal as unconsumed dimensions', () => {
    const report = buildCareerPersonalizationT8PostB43GlobalResearchHoldReview(acceptedB43());
    expect(report.unconsumedDimensionCount).toBe(3);
    expect(report.visibilityConsumedByCurrentContinuation).toBe(false);
    expect(report.pluralityConsumedByCurrentContinuation).toBe(false);
    expect(report.pluralityHeldUnderI254).toBe(true);
    expect(report.seasonalConsumedByCurrentContinuation).toBe(false);
  });

  test('keeps conflict composition pack-level deferred rather than opening a source lane', () => {
    const report = buildCareerPersonalizationT8PostB43GlobalResearchHoldReview(acceptedB43());
    const conflict = report.frontierRecords.find((record) => record.laneId === 'MULTI_PATTERN_CONFLICT_COMPOSITION');
    expect(report.packLevelDeferredLaneCount).toBe(1);
    expect(report.conflictPolicyDisposition).toBe('PACK_LEVEL_DEFERRED');
    expect(conflict?.existingSurfaceResearchExecutable).toBe(false);
  });

  test('has zero executable authority research and governance lanes', () => {
    const report = buildCareerPersonalizationT8PostB43GlobalResearchHoldReview(acceptedB43());
    expect(report.immediatelyExecutableAuthorityAdmissionLaneCount).toBe(0);
    expect(report.immediatelyExecutableExistingSurfaceResearchLaneCount).toBe(0);
    expect(report.boundedGovernanceGateExecutableCount).toBe(0);
    expect(report.selectedImmediateNextLane).toBeNull();
  });

  test('freezes explicit global reopen signal classes', () => {
    const report = buildCareerPersonalizationT8PostB43GlobalResearchHoldReview(acceptedB43());
    expect(report.globalReopenSignalClasses).toEqual(CAREER_T8_B44_GLOBAL_REOPEN_SIGNAL_CLASSES);
    expect(report.globalReopenSignalClassCount).toBe(8);
    expect(report.resumeRequiresExplicitSignalChange).toBe(true);
  });

  test('forbids blind research restart unchanged-surface repetition and source stitching', () => {
    const report = buildCareerPersonalizationT8PostB43GlobalResearchHoldReview(acceptedB43());
    expect(report.broadSearchRestartAuthorized).toBe(false);
    expect(report.repeatedUnchangedSurfaceSearchAuthorized).toBe(false);
    expect(report.crossSourceRequirementStitchingAuthorized).toBe(false);
  });

  test('keeps all six historical gaps open with no T8 or production effects', () => {
    const report = buildCareerPersonalizationT8PostB43GlobalResearchHoldReview(acceptedB43());
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.authorityAdmittedByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
  });

  test('freezes controls and routes only to trigger activation evidence after a real change', () => {
    const report = buildCareerPersonalizationT8PostB43GlobalResearchHoldReview(acceptedB43());
    expect(report.controlIds).toEqual(CAREER_T8_B44_GLOBAL_RESEARCH_HOLD_CONTROL_IDS);
    expect(report.controlCount).toBe(12);
    expect(report.controlsFrozen).toBe(true);
    expect(report.recommendedNextGate).toBe('CAREER_PERSONALIZATION_T8_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE');
  });

  test('fails closed when B43 content-addressed identity is tampered', () => {
    const b43 = acceptedB43();
    const tampered: CareerPersonalizationT8FamilyRemediationTriggerReadinessReviewReport = {
      ...b43,
      reviewId: `${b43.reviewId}_tampered`,
    };
    const report = buildCareerPersonalizationT8PostB43GlobalResearchHoldReview(tampered);
    expect(report.status).toBe('UPSTREAM_B43_BOUNDARY_INVALID');
    expect(report.decision).toBe('POST_B43_GLOBAL_RESEARCH_HOLD_NOT_ESTABLISHED');
    expect(report.globalResearchHoldActive).toBe(false);
    expect(report.frontierRecordCount).toBe(0);
    expect(report.globalReopenSignalClassCount).toBe(0);
    expect(report.admittedBoundedAuthorityComponentCountPreserved).toBe(0);
    expect(report.controlCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
  });
});
