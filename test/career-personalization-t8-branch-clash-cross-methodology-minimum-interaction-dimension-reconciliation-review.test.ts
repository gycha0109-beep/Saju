import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_POST_B43_GLOBAL_RESEARCH_HOLD_REVIEW_VERSION,
  CAREER_T8_B44_GLOBAL_REOPEN_SIGNAL_CLASSES,
  CAREER_T8_B44_GLOBAL_RESEARCH_FRONTIER_RECORDS,
  CAREER_T8_B44_GLOBAL_RESEARCH_HOLD_CONTROL_IDS,
  type CareerPersonalizationT8PostB43GlobalResearchHoldReviewReport,
} from '../src/research/career-personalization-t8-post-b43-global-research-hold-review.js';
import {
  buildCareerPersonalizationT8ResearchReopenTriggerActivationEvidence,
  type CareerPersonalizationT8ResearchReopenTriggerActivationEvidenceReport,
} from '../src/research/career-personalization-t8-research-reopen-trigger-activation-evidence.js';
import {
  CAREER_PERSONALIZATION_T8_BRANCH_CLASH_CROSS_METHODOLOGY_MINIMUM_INTERACTION_DIMENSION_RECONCILIATION_REVIEW_VERSION,
  CAREER_T8_B46_AUDITED_BASE_MAIN_COMMIT,
  CAREER_T8_B46_INTERACTION_DIMENSION_RECORDS,
  CAREER_T8_B46_RECONCILIATION_CONTROL_IDS,
  CAREER_T8_B46_REMEDIATION_TRIGGER_IDS,
  CAREER_T8_B46_REPOSITORY_AUDIT_EVIDENCE,
  CAREER_T8_B46_SOURCE_PATH_RECORDS,
  buildCareerPersonalizationT8BranchClashCrossMethodologyMinimumInteractionDimensionReconciliationReview,
} from '../src/research/career-personalization-t8-branch-clash-cross-methodology-minimum-interaction-dimension-reconciliation-review.js';

function acceptedB44(): CareerPersonalizationT8PostB43GlobalResearchHoldReviewReport {
  const material: Omit<CareerPersonalizationT8PostB43GlobalResearchHoldReviewReport, 'reviewId'> = {
    reviewVersion: CAREER_PERSONALIZATION_T8_POST_B43_GLOBAL_RESEARCH_HOLD_REVIEW_VERSION,
    status: 'RESOLVED_CAREER_PERSONALIZATION_T8_POST_B43_GLOBAL_RESEARCH_HOLD_REVIEW',
    decision:
      'GLOBAL_TRIGGER_GATED_RESEARCH_HOLD_ZERO_EXECUTABLE_LANES_RESUME_ONLY_ON_EXPLICIT_EVIDENCE_OR_GOVERNED_METHOD_CHANGE',
    upstreamB43ReviewId: 'b43_fixture_for_b46',
    exactB43BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    globalResearchHoldActive: true,
    frontierRecords: CAREER_T8_B44_GLOBAL_RESEARCH_FRONTIER_RECORDS,
    frontierRecordCount: 9,
    globalReopenSignalClasses: CAREER_T8_B44_GLOBAL_REOPEN_SIGNAL_CLASSES,
    globalReopenSignalClassCount: 8,
    admittedBoundedAuthorityComponentCountPreserved: 1,
    branchTriggerContractCountPreserved: 2,
    branchSatisfiedTriggerCount: 0,
    familyTriggerContractCountPreserved: 3,
    familySatisfiedTriggerCount: 0,
    externalEvidenceSurfaceHoldCount: 2,
    unconsumedDimensionCount: 3,
    packLevelDeferredLaneCount: 1,
    immediatelyExecutableAuthorityAdmissionLaneCount: 0,
    immediatelyExecutableExistingSurfaceResearchLaneCount: 0,
    boundedGovernanceGateExecutableCount: 0,
    qinP464DirectBodyAcquired: false,
    qianli1936P50ToP53ExactPagesBound: false,
    visibilityConsumedByCurrentContinuation: false,
    pluralityConsumedByCurrentContinuation: false,
    pluralityHeldUnderI254: true,
    seasonalConsumedByCurrentContinuation: false,
    conflictPolicyDisposition: 'PACK_LEVEL_DEFERRED',
    resumeRequiresExplicitSignalChange: true,
    broadSearchRestartAuthorized: false,
    repeatedUnchangedSurfaceSearchAuthorized: false,
    crossSourceRequirementStitchingAuthorized: false,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: CAREER_T8_B44_GLOBAL_RESEARCH_HOLD_CONTROL_IDS,
    controlCount: 12,
    controlsFrozen: true,
    selectedImmediateNextLane: null,
    recommendedNextGate: 'CAREER_PERSONALIZATION_T8_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE',
  };

  return {
    reviewId: `career_personalization_t8_post_b43_global_research_hold_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function acceptedB45(): CareerPersonalizationT8ResearchReopenTriggerActivationEvidenceReport {
  return buildCareerPersonalizationT8ResearchReopenTriggerActivationEvidence(acceptedB44());
}

describe('Career T8 Branch clash cross-methodology minimum interaction dimension reconciliation', () => {
  test('accepts the exact content-addressed B45 boundary and resolves only the authorized reconciliation gate', () => {
    const report =
      buildCareerPersonalizationT8BranchClashCrossMethodologyMinimumInteractionDimensionReconciliationReview(
        acceptedB45(),
      );
    expect(report.reviewVersion).toBe(
      CAREER_PERSONALIZATION_T8_BRANCH_CLASH_CROSS_METHODOLOGY_MINIMUM_INTERACTION_DIMENSION_RECONCILIATION_REVIEW_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_BRANCH_CLASH_CROSS_METHODOLOGY_MINIMUM_INTERACTION_DIMENSION_RECONCILIATION_REVIEW',
    );
    expect(report.decision).toBe(
      'BRANCH_BOTTLENECK_DUAL_SOURCE_BINDING_AND_CURRENT_METHOD_INTERACTION_DIMENSION_INSUFFICIENCY_NO_FLAT_MODIFIER_NO_METHOD_STITCHING',
    );
    expect(report.exactB45BoundaryAccepted).toBe(true);
  });

  test('pins the audited repository baseline and implementation evidence', () => {
    expect(CAREER_T8_B46_AUDITED_BASE_MAIN_COMMIT).toBe(
      'ae466b0c5f57a1a91489af2a6213e90b340239ac',
    );
    expect(CAREER_T8_B46_REPOSITORY_AUDIT_EVIDENCE.blobs).toHaveLength(6);
    expect(CAREER_T8_B46_REPOSITORY_AUDIT_EVIDENCE.methodologyInputContractSchemaPresent).toBe(true);
    expect(CAREER_T8_B46_REPOSITORY_AUDIT_EVIDENCE.ruleInputSubsetValidationPresent).toBe(true);
    expect(CAREER_T8_B46_REPOSITORY_AUDIT_EVIDENCE.activeRuleSetRequiredInputCoverageValidationPresent).toBe(false);
  });

  test('keeps the two methodology inventories separate instead of manufacturing a universal profile', () => {
    const report =
      buildCareerPersonalizationT8BranchClashCrossMethodologyMinimumInteractionDimensionReconciliationReview(
        acceptedB45(),
      );
    const traditional = report.interactionDimensionRecords.filter(
      (record) => record.methodologyProfile === 'TRADITIONAL_ZIPING_RESEARCH_PROFILE',
    );
    const duan = report.interactionDimensionRecords.filter(
      (record) => record.methodologyProfile === 'DUAN_LIXIANG_RESEARCH_PROFILE',
    );
    expect(report.methodologyProfileCount).toBe(2);
    expect(traditional).toHaveLength(6);
    expect(duan).toHaveLength(6);
    expect(report.universalInteractionEvaluatorAuthorized).toBe(false);
    expect(report.crossMethodologyStitchingAuthorized).toBe(false);
  });

  test('records the current repository capability boundary without promoting T0 observations into semantic effects', () => {
    const report =
      buildCareerPersonalizationT8BranchClashCrossMethodologyMinimumInteractionDimensionReconciliationReview(
        acceptedB45(),
      );
    expect(report.interactionDimensionRecords).toEqual(CAREER_T8_B46_INTERACTION_DIMENSION_RECORDS);
    expect(report.interactionDimensionRecordCount).toBe(12);
    expect(report.structurallyAvailableDimensionRecordCount).toBe(2);
    expect(report.observationalButNoEffectDimensionRecordCount).toBe(2);
    expect(report.blockedOrMissingDimensionRecordCount).toBe(8);
    expect(report.interactionDimensionRecords.every((record) => !record.semanticEffectEstablished)).toBe(true);
    expect(report.interactionDimensionRecords.every((record) => !record.currentCareerMethodConsumesDimension)).toBe(true);
  });

  test('classifies Branch as a dual blocker rather than erasing the remaining source target-body gap', () => {
    const report =
      buildCareerPersonalizationT8BranchClashCrossMethodologyMinimumInteractionDimensionReconciliationReview(
        acceptedB45(),
      );
    expect(report.sourceScarcityRejectedAsSoleExplanation).toBe(true);
    expect(report.sourceTargetBindingBlockerStillPresent).toBe(true);
    expect(report.currentMethodInteractionDimensionsInsufficient).toBe(true);
    expect(report.branchHistoricalGapExclusivelyReclassifiedToMethodInsufficiency).toBe(false);
    expect(report.flatUnaryClashModifierAuthorized).toBe(false);
  });

  test('preserves all three source paths as partial or control evidence only', () => {
    const report =
      buildCareerPersonalizationT8BranchClashCrossMethodologyMinimumInteractionDimensionReconciliationReview(
        acceptedB45(),
      );
    expect(report.sourcePathRecords).toEqual(CAREER_T8_B46_SOURCE_PATH_RECORDS);
    expect(report.sourcePathRecordCount).toBe(3);
    expect(report.sourcePathRecords.every((record) => !record.admissionReady)).toBe(true);
    expect(report.sourcePathRecords.every((record) => !record.gapClosureReady)).toBe(true);
    expect(report.sourcePathRecords.every((record) => !record.crossSourceStitchingUsed)).toBe(true);
  });

  test('keeps B41 frozen triggers unsatisfied and defines remediation triggers without opening a semantic lane', () => {
    const report =
      buildCareerPersonalizationT8BranchClashCrossMethodologyMinimumInteractionDimensionReconciliationReview(
        acceptedB45(),
      );
    expect(report.branch2015TriggerSatisfied).toBe(false);
    expect(report.branchIndependentCompletePathTriggerSatisfied).toBe(false);
    expect(report.remediationTriggerIds).toEqual(CAREER_T8_B46_REMEDIATION_TRIGGER_IDS);
    expect(report.remediationTriggerCount).toBe(3);
    expect(report.immediatelyExecutableAuthorityAdmissionLaneCount).toBe(0);
    expect(report.immediatelyExecutableSemanticRuleLaneCount).toBe(0);
    expect(report.selectedImmediateNextLane).toBeNull();
  });

  test('uses the existing methodology contract architecture and does not introduce a parallel runtime', () => {
    const report =
      buildCareerPersonalizationT8BranchClashCrossMethodologyMinimumInteractionDimensionReconciliationReview(
        acceptedB45(),
      );
    expect(report.methodologyInputContractSchemaPresent).toBe(true);
    expect(report.ruleInputSubsetValidationPresent).toBe(true);
    expect(report.activeRuleSetRequiredInputCoverageValidationPresent).toBe(false);
    expect(report.existingArchitectureCanHostMethodSpecificContracts).toBe(true);
    expect(report.newParallelInterpretationRuntimeRequired).toBe(false);
  });

  test('preserves all six historical gaps and creates no interpretation or production authority', () => {
    const report =
      buildCareerPersonalizationT8BranchClashCrossMethodologyMinimumInteractionDimensionReconciliationReview(
        acceptedB45(),
      );
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.authorityAdmittedByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
    expect(report.methodologyDefinitionCreatedByThisGate).toBe(false);
    expect(report.t5RuleAuthoringAuthorized).toBe(false);
    expect(report.t6RuleAuthoringAuthorized).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.claimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
  });

  test('freezes B46 governance controls', () => {
    const report =
      buildCareerPersonalizationT8BranchClashCrossMethodologyMinimumInteractionDimensionReconciliationReview(
        acceptedB45(),
      );
    expect(report.controlIds).toEqual(CAREER_T8_B46_RECONCILIATION_CONTROL_IDS);
    expect(report.controlCount).toBe(16);
    expect(report.controlsFrozen).toBe(true);
    expect(report.recommendedNextGate).toBe(
      'TRIGGER_GATED_BRANCH_METHOD_SPECIFIC_INPUT_CONTRACT_OR_SOURCE_SEPARABILITY_REVIEW',
    );
  });

  test('fails closed when the B45 content-addressed identity is tampered', () => {
    const b45 = acceptedB45();
    const tampered: CareerPersonalizationT8ResearchReopenTriggerActivationEvidenceReport = {
      ...b45,
      evidenceId: `${b45.evidenceId}_tampered`,
    };
    const report =
      buildCareerPersonalizationT8BranchClashCrossMethodologyMinimumInteractionDimensionReconciliationReview(
        tampered,
      );
    expect(report.status).toBe('UPSTREAM_B45_BOUNDARY_INVALID');
    expect(report.decision).toBe('BRANCH_CROSS_METHODOLOGY_RECONCILIATION_NOT_ESTABLISHED');
    expect(report.exactB45BoundaryAccepted).toBe(false);
    expect(report.methodologyProfileCount).toBe(0);
    expect(report.sourcePathRecordCount).toBe(0);
    expect(report.interactionDimensionRecordCount).toBe(0);
    expect(report.currentMethodInteractionDimensionsInsufficient).toBe(false);
    expect(report.controlsFrozen).toBe(false);
    expect(report.controlCount).toBe(0);
    expect(report.selectedImmediateNextLane).toBeNull();
  });
});
