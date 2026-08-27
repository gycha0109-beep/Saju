import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_POST_B41_RESEARCH_FRONTIER_HOLD_REVIEW_VERSION,
  CAREER_T8_B42_POST_B41_FRONTIER_CONTROL_IDS,
  CAREER_T8_B42_POST_B41_FRONTIER_RECORDS,
  type CareerPersonalizationT8PostB41ResearchFrontierHoldReviewReport,
} from '../src/research/career-personalization-t8-post-b41-research-frontier-hold-review.js';
import {
  CAREER_PERSONALIZATION_T8_FAMILY_REMEDIATION_TRIGGER_READINESS_REVIEW_VERSION,
  CAREER_T8_B43_FAMILY_REMEDIATION_TRIGGER_CONTRACTS,
  CAREER_T8_B43_FAMILY_REMEDIATION_TRIGGER_CONTROL_IDS,
  buildCareerPersonalizationT8FamilyRemediationTriggerReadinessReview,
} from '../src/research/career-personalization-t8-family-remediation-trigger-readiness-review.js';

function acceptedB42(): CareerPersonalizationT8PostB41ResearchFrontierHoldReviewReport {
  const material: Omit<CareerPersonalizationT8PostB41ResearchFrontierHoldReviewReport, 'reviewId'> = {
    reviewVersion: CAREER_PERSONALIZATION_T8_POST_B41_RESEARCH_FRONTIER_HOLD_REVIEW_VERSION,
    status: 'RESOLVED_CAREER_PERSONALIZATION_T8_POST_B41_RESEARCH_FRONTIER_HOLD_REVIEW',
    decision:
      'ZERO_EXECUTABLE_AUTHORITY_ADMISSION_LANES_ONE_FAMILY_REMEDIATION_GOVERNANCE_GATE_EXECUTABLE_NO_BROAD_RESEARCH_RESTART',
    upstreamB41ReviewId: 'b41_fixture_for_b43',
    exactB41BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    frontierRecords: CAREER_T8_B42_POST_B41_FRONTIER_RECORDS,
    frontierRecordCount: 9,
    admittedBoundedAuthorityComponentCount: 1,
    immediatelyExecutableAuthorityAdmissionLaneCount: 0,
    immediatelyExecutableExistingSurfaceResearchLaneCount: 0,
    boundedGovernanceGateExecutableCount: 1,
    selectedBoundedGovernanceLane: 'FAMILY_RELATION_CURRENT_METHOD_COMPATIBLE_REMEDIATION_READINESS',
    branchSatisfiedTriggerCount: 0,
    branchExecutableLaneCount: 0,
    familyCoverageClass: 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE',
    familyCurrentMethodCompatibleAlternatePathCount: 0,
    familyAdmissionReadyCandidateCount: 0,
    qinP464DirectBodyAcquired: false,
    qianli1936P50ToP53ExactPagesBound: false,
    visibilityConsumedByCurrentContinuation: false,
    pluralityConsumedByCurrentContinuation: false,
    pluralityHeldUnderI254: true,
    seasonalConsumedByCurrentContinuation: false,
    conflictPolicyDisposition: 'PACK_LEVEL_DEFERRED',
    broadSearchRestartAuthorized: false,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityGapClosedByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: CAREER_T8_B42_POST_B41_FRONTIER_CONTROL_IDS,
    controlCount: 12,
    controlsFrozen: true,
    recommendedNextGate: 'FAMILY_RELATION_CURRENT_METHOD_COMPATIBLE_PUBLISHED_SOURCE_REMEDIATION_READINESS_REVIEW',
  };

  return {
    reviewId: `career_personalization_t8_post_b41_research_frontier_hold_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career Family remediation trigger readiness', () => {
  test('accepts the exact content-addressed B42 frontier hold boundary', () => {
    const report = buildCareerPersonalizationT8FamilyRemediationTriggerReadinessReview(acceptedB42());
    expect(report.reviewVersion).toBe(CAREER_PERSONALIZATION_T8_FAMILY_REMEDIATION_TRIGGER_READINESS_REVIEW_VERSION);
    expect(report.status).toBe(
      'RESOLVED_FAMILY_RELATION_CURRENT_METHOD_COMPATIBLE_PUBLISHED_SOURCE_REMEDIATION_READINESS_REVIEW',
    );
    expect(report.exactB42BoundaryAccepted).toBe(true);
  });

  test('freezes exactly three Family remediation trigger contracts', () => {
    const report = buildCareerPersonalizationT8FamilyRemediationTriggerReadinessReview(acceptedB42());
    expect(report.triggerContracts).toEqual(CAREER_T8_B43_FAMILY_REMEDIATION_TRIGGER_CONTRACTS);
    expect(report.triggerContractCount).toBe(3);
  });

  test('requires the 2017 path to acquire target relation body limits and compatibility in the same path', () => {
    const contract = CAREER_T8_B43_FAMILY_REMEDIATION_TRIGGER_CONTRACTS[0];
    expect(contract.triggerId).toBe('FAMILY_2017_TARGET_BODY_COMPLETE_PATH_TRIGGER');
    expect(contract.requiredConditions).toHaveLength(4);
    expect(contract.requiredConditions.join(' ')).toContain('same 2017 source');
    expect(contract.prohibitedSubstitutes.join(' ')).toContain('2015');
  });

  test('requires the 2015 path to preserve mandatory strength and transformation dependencies', () => {
    const contract = CAREER_T8_B43_FAMILY_REMEDIATION_TRIGGER_CONTRACTS[1];
    expect(contract.triggerId).toBe('FAMILY_2015_REQUIRED_METHOD_DIMENSIONS_TRIGGER');
    expect(contract.requiredConditions.join(' ')).toContain('身旺身弱');
    expect(contract.requiredConditions.join(' ')).toContain('transformation');
    expect(contract.prohibitedSubstitutes.join(' ')).toContain('Dropping 身旺/身弱');
  });

  test('allows a new Family path only when one source independently completes the requirements', () => {
    const contract = CAREER_T8_B43_FAMILY_REMEDIATION_TRIGGER_CONTRACTS[2];
    expect(contract.triggerId).toBe('FAMILY_INDEPENDENT_COMPLETE_PATH_TRIGGER');
    expect(contract.requiredConditions.join(' ')).toContain('one source independently');
    expect(contract.prohibitedSubstitutes.join(' ')).toContain('One source for Career binding plus another source');
  });

  test('keeps all three triggers unsatisfied and Family research non-executable', () => {
    const report = buildCareerPersonalizationT8FamilyRemediationTriggerReadinessReview(acceptedB42());
    expect(report.currentlySatisfiedTriggerCount).toBe(0);
    expect(report.currentlyExecutableFamilyResearchLaneCount).toBe(0);
    expect(report.career2017TriggerSatisfied).toBe(false);
    expect(report.semantic2015TriggerSatisfied).toBe(false);
    expect(report.independentCompletePathTriggerSatisfied).toBe(false);
  });

  test('preserves the frozen 2017 and 2015 blockers', () => {
    const report = buildCareerPersonalizationT8FamilyRemediationTriggerReadinessReview(acceptedB42());
    expect(report.career2017TargetRelationBodyAcquired).toBe(false);
    expect(report.semantic2015ExactEditionBindingEstablished).toBe(false);
    expect(report.semantic2015MandatoryStrengthTransformationDependencyPreserved).toBe(true);
    expect(report.currentMethodConsumesRequired2015Dimensions).toBe(false);
  });

  test('preserves zero current-method-compatible and zero admission-ready Family paths', () => {
    const report = buildCareerPersonalizationT8FamilyRemediationTriggerReadinessReview(acceptedB42());
    expect(report.familyCurrentMethodCompatiblePathCount).toBe(0);
    expect(report.familyAdmissionReadyCandidateCount).toBe(0);
    expect(report.familyCoverageClass).toBe('MATERIAL_PARTIAL_REQUIREMENT_COVERAGE');
    expect(report.familyAuthorityAdmittedByThisGate).toBe(false);
    expect(report.familyGapClosureReady).toBe(false);
  });

  test('preserves Qianli historical Family path without replacing it', () => {
    const report = buildCareerPersonalizationT8FamilyRemediationTriggerReadinessReview(acceptedB42());
    expect(report.qianliHistoricalPathPreserved).toBe(true);
  });

  test('forbids broad search restart unchanged-surface repetition and source stitching', () => {
    const report = buildCareerPersonalizationT8FamilyRemediationTriggerReadinessReview(acceptedB42());
    expect(report.broadSearchRestartAuthorized).toBe(false);
    expect(report.repeatedUnchangedSurfaceSearchAuthorized).toBe(false);
    expect(report.crossSourceRequirementStitchingAuthorized).toBe(false);
  });

  test('activation never automatically admits authority or closes the gap', () => {
    const report = buildCareerPersonalizationT8FamilyRemediationTriggerReadinessReview(acceptedB42());
    expect(report.activationAutomaticallyAdmitsAuthority).toBe(false);
    expect(report.activationAutomaticallyClosesGap).toBe(false);
    expect(report.activationAlwaysRequiresAdequacyReview).toBe(true);
  });

  test('preserves Position and keeps all six historical gaps open with no runtime effects', () => {
    const report = buildCareerPersonalizationT8FamilyRemediationTriggerReadinessReview(acceptedB42());
    expect(report.positionBoundedAuthorityComponentCountPreserved).toBe(1);
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.authorityGapClosedByThisGate).toBe(false);
    expect(report.numericWeightingIntroduced).toBe(false);
    expect(report.occupationModernizationUsed).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
  });

  test('freezes controls and routes to a global research hold review', () => {
    const report = buildCareerPersonalizationT8FamilyRemediationTriggerReadinessReview(acceptedB42());
    expect(report.controlIds).toEqual(CAREER_T8_B43_FAMILY_REMEDIATION_TRIGGER_CONTROL_IDS);
    expect(report.controlCount).toBe(12);
    expect(report.controlsFrozen).toBe(true);
    expect(report.recommendedNextGate).toBe('CAREER_PERSONALIZATION_T8_POST_B43_GLOBAL_RESEARCH_HOLD_REVIEW');
  });

  test('fails closed when B42 content-addressed identity is tampered', () => {
    const b42 = acceptedB42();
    const tampered: CareerPersonalizationT8PostB41ResearchFrontierHoldReviewReport = {
      ...b42,
      reviewId: `${b42.reviewId}_tampered`,
    };
    const report = buildCareerPersonalizationT8FamilyRemediationTriggerReadinessReview(tampered);
    expect(report.status).toBe('UPSTREAM_B42_BOUNDARY_INVALID');
    expect(report.decision).toBe('FAMILY_REMEDIATION_TRIGGER_READINESS_NOT_ESTABLISHED');
    expect(report.triggerContractCount).toBe(0);
    expect(report.positionBoundedAuthorityComponentCountPreserved).toBe(0);
    expect(report.controlCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
  });
});
