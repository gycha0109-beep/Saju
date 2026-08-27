import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_BRANCH_CLASH_REMEDIATION_TRIGGER_READINESS_REVIEW_VERSION,
  CAREER_T8_B41_BRANCH_REMEDIATION_TRIGGER_CONTRACTS,
  CAREER_T8_B41_BRANCH_REMEDIATION_TRIGGER_CONTROL_IDS,
  type CareerPersonalizationT8BranchClashRemediationTriggerReadinessReviewReport,
} from '../src/research/career-personalization-t8-branch-clash-remediation-trigger-readiness-review.js';
import {
  CAREER_PERSONALIZATION_T8_POST_B41_RESEARCH_FRONTIER_HOLD_REVIEW_VERSION,
  CAREER_T8_B42_POST_B41_FRONTIER_CONTROL_IDS,
  CAREER_T8_B42_POST_B41_FRONTIER_RECORDS,
  buildCareerPersonalizationT8PostB41ResearchFrontierHoldReview,
} from '../src/research/career-personalization-t8-post-b41-research-frontier-hold-review.js';
import { CAREER_T8_B40_BRANCH_REMEDIATION_REQUIREMENT_IDS } from '../src/research/career-personalization-t8-branch-clash-current-t5-published-evidence-adequacy-compatibility-review.js';

function acceptedB41(): CareerPersonalizationT8BranchClashRemediationTriggerReadinessReviewReport {
  const material: Omit<CareerPersonalizationT8BranchClashRemediationTriggerReadinessReviewReport, 'reviewId'> = {
    reviewVersion: CAREER_PERSONALIZATION_T8_BRANCH_CLASH_REMEDIATION_TRIGGER_READINESS_REVIEW_VERSION,
    status: 'RESOLVED_BRANCH_CLASH_EXACT_EDITION_AND_METHOD_DEPENDENCY_REMEDIATION_TRIGGER_READINESS_REVIEW',
    decision:
      'TWO_BRANCH_REMEDIATION_TRIGGER_CONTRACTS_FROZEN_ZERO_SATISFIED_RESUME_ONLY_ON_PATH_COMPLETE_EVIDENCE_CHANGE_NO_AUTHORITY_ADMISSION',
    upstreamB40ReviewId: 'b40_fixture_for_b42',
    exactB40BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    remediationRequirementIds: CAREER_T8_B40_BRANCH_REMEDIATION_REQUIREMENT_IDS,
    remediationRequirementCount: 2,
    triggerContracts: CAREER_T8_B41_BRANCH_REMEDIATION_TRIGGER_CONTRACTS,
    triggerContractCount: 2,
    currentlySatisfiedTriggerCount: 0,
    currentlyExecutableBranchLaneCount: 0,
    exact2015PathTriggerSatisfied: false,
    independentCompletePathTriggerSatisfied: false,
    exact2015PrintedPassageBindingEstablished: false,
    currentMethodCompatibilityEstablished: false,
    currentMethodIncompatibleIfMandatoryDependencyConfirmed: true,
    broadSearchRestartAuthorized: false,
    repeatedUnchangedSurfaceSearchAuthorized: false,
    crossSourceRequirementStitchingAuthorized: false,
    activationAutomaticallyAdmitsAuthority: false,
    activationAutomaticallyClosesGap: false,
    activationAlwaysRequiresAdequacyReview: true,
    branchAuthorityAdmissionReady: false,
    branchAuthorityAdmittedByThisGate: false,
    branchGapClosureReady: false,
    positionBoundedAuthorityComponentCountPreserved: 1,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityGapClosedByThisGate: false,
    numericWeightingIntroduced: false,
    t5BaseSemanticMutated: false,
    occupationModernizationUsed: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: CAREER_T8_B41_BRANCH_REMEDIATION_TRIGGER_CONTROL_IDS,
    controlCount: 12,
    controlsFrozen: true,
    recommendedNextGate: 'CAREER_PERSONALIZATION_T8_POST_B41_RESEARCH_FRONTIER_HOLD_REVIEW',
  };
  return {
    reviewId: `career_personalization_t8_branch_clash_remediation_trigger_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career post-B41 research frontier hold review', () => {
  test('accepts the exact content-addressed B41 boundary', () => {
    const report = buildCareerPersonalizationT8PostB41ResearchFrontierHoldReview(acceptedB41());
    expect(report.reviewVersion).toBe(CAREER_PERSONALIZATION_T8_POST_B41_RESEARCH_FRONTIER_HOLD_REVIEW_VERSION);
    expect(report.status).toBe('RESOLVED_CAREER_PERSONALIZATION_T8_POST_B41_RESEARCH_FRONTIER_HOLD_REVIEW');
    expect(report.exactB41BoundaryAccepted).toBe(true);
  });

  test('freezes nine frontier records', () => {
    const report = buildCareerPersonalizationT8PostB41ResearchFrontierHoldReview(acceptedB41());
    expect(report.frontierRecords).toEqual(CAREER_T8_B42_POST_B41_FRONTIER_RECORDS);
    expect(report.frontierRecordCount).toBe(9);
  });

  test('preserves exactly one admitted bounded Position component', () => {
    const report = buildCareerPersonalizationT8PostB41ResearchFrontierHoldReview(acceptedB41());
    expect(report.admittedBoundedAuthorityComponentCount).toBe(1);
  });

  test('finds zero executable authority admission or unchanged-surface research lanes', () => {
    const report = buildCareerPersonalizationT8PostB41ResearchFrontierHoldReview(acceptedB41());
    expect(report.immediatelyExecutableAuthorityAdmissionLaneCount).toBe(0);
    expect(report.immediatelyExecutableExistingSurfaceResearchLaneCount).toBe(0);
    expect(report.broadSearchRestartAuthorized).toBe(false);
  });

  test('preserves Branch trigger hold with zero satisfied triggers', () => {
    const report = buildCareerPersonalizationT8PostB41ResearchFrontierHoldReview(acceptedB41());
    expect(report.branchSatisfiedTriggerCount).toBe(0);
    expect(report.branchExecutableLaneCount).toBe(0);
  });

  test('preserves Family material-partial state with zero compatible or admission-ready paths', () => {
    const report = buildCareerPersonalizationT8PostB41ResearchFrontierHoldReview(acceptedB41());
    expect(report.familyCoverageClass).toBe('MATERIAL_PARTIAL_REQUIREMENT_COVERAGE');
    expect(report.familyCurrentMethodCompatibleAlternatePathCount).toBe(0);
    expect(report.familyAdmissionReadyCandidateCount).toBe(0);
  });

  test('selects only the Family remediation-readiness governance gate', () => {
    const report = buildCareerPersonalizationT8PostB41ResearchFrontierHoldReview(acceptedB41());
    expect(report.boundedGovernanceGateExecutableCount).toBe(1);
    expect(report.selectedBoundedGovernanceLane).toBe('FAMILY_RELATION_CURRENT_METHOD_COMPATIBLE_REMEDIATION_READINESS');
    expect(report.recommendedNextGate).toBe(
      'FAMILY_RELATION_CURRENT_METHOD_COMPATIBLE_PUBLISHED_SOURCE_REMEDIATION_READINESS_REVIEW',
    );
  });

  test('keeps Qin and Qianli on external evidence surface holds', () => {
    const report = buildCareerPersonalizationT8PostB41ResearchFrontierHoldReview(acceptedB41());
    expect(report.qinP464DirectBodyAcquired).toBe(false);
    expect(report.qianli1936P50ToP53ExactPagesBound).toBe(false);
  });

  test('keeps visibility plurality and seasonal unconsumed with I254 preserved', () => {
    const report = buildCareerPersonalizationT8PostB41ResearchFrontierHoldReview(acceptedB41());
    expect(report.visibilityConsumedByCurrentContinuation).toBe(false);
    expect(report.pluralityConsumedByCurrentContinuation).toBe(false);
    expect(report.pluralityHeldUnderI254).toBe(true);
    expect(report.seasonalConsumedByCurrentContinuation).toBe(false);
  });

  test('keeps conflict composition pack-level deferred', () => {
    const report = buildCareerPersonalizationT8PostB41ResearchFrontierHoldReview(acceptedB41());
    expect(report.conflictPolicyDisposition).toBe('PACK_LEVEL_DEFERRED');
  });

  test('keeps all six historical gaps open and runtime untouched', () => {
    const report = buildCareerPersonalizationT8PostB41ResearchFrontierHoldReview(acceptedB41());
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.authorityGapClosedByThisGate).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
  });

  test('freezes 12 frontier controls', () => {
    const report = buildCareerPersonalizationT8PostB41ResearchFrontierHoldReview(acceptedB41());
    expect(report.controlIds).toEqual(CAREER_T8_B42_POST_B41_FRONTIER_CONTROL_IDS);
    expect(report.controlCount).toBe(12);
    expect(report.controlsFrozen).toBe(true);
  });

  test('fails closed when B41 content-addressed identity is tampered', () => {
    const b41 = acceptedB41();
    const tampered: CareerPersonalizationT8BranchClashRemediationTriggerReadinessReviewReport = {
      ...b41,
      reviewId: `${b41.reviewId}_tampered`,
    };
    const report = buildCareerPersonalizationT8PostB41ResearchFrontierHoldReview(tampered);
    expect(report.status).toBe('UPSTREAM_B41_BOUNDARY_INVALID');
    expect(report.decision).toBe('POST_B41_RESEARCH_FRONTIER_HOLD_NOT_ESTABLISHED');
    expect(report.frontierRecordCount).toBe(0);
    expect(report.boundedGovernanceGateExecutableCount).toBe(0);
    expect(report.selectedBoundedGovernanceLane).toBeNull();
    expect(report.controlCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
  });
});
