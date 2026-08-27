import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_BRANCH_CLASH_CROSS_METHODOLOGY_MINIMUM_INTERACTION_DIMENSION_RECONCILIATION_REVIEW_VERSION,
  CAREER_T8_B46_INTERACTION_DIMENSION_RECORDS,
  CAREER_T8_B46_RECONCILIATION_CONTROL_IDS,
  CAREER_T8_B46_REMEDIATION_TRIGGER_IDS,
  CAREER_T8_B46_SOURCE_PATH_RECORDS,
  type CareerPersonalizationT8BranchClashCrossMethodologyMinimumInteractionDimensionReconciliationReviewReport,
} from '../src/research/career-personalization-t8-branch-clash-cross-methodology-minimum-interaction-dimension-reconciliation-review.js';
import {
  CAREER_PERSONALIZATION_T8_BRANCH_TRIGGER_GATED_POST_P0_REMEDIATION_REVIEW_VERSION,
  CAREER_T8_B47_AUDITED_BASE_MAIN_COMMIT,
  CAREER_T8_B47_CONTROL_IDS,
  CAREER_T8_B47_REMEDIATION_TRIGGER_RECORDS,
  CAREER_T8_B47_REPOSITORY_AUDIT_EVIDENCE,
  CAREER_T8_B47_TARGETED_SOURCE_RECHECK,
  buildCareerPersonalizationT8BranchTriggerGatedPostP0RemediationReview,
} from '../src/research/career-personalization-t8-branch-trigger-gated-post-p0-remediation-review.js';

function acceptedB46(): CareerPersonalizationT8BranchClashCrossMethodologyMinimumInteractionDimensionReconciliationReviewReport {
  const material: Omit<
    CareerPersonalizationT8BranchClashCrossMethodologyMinimumInteractionDimensionReconciliationReviewReport,
    'reviewId'
  > = {
    reviewVersion:
      CAREER_PERSONALIZATION_T8_BRANCH_CLASH_CROSS_METHODOLOGY_MINIMUM_INTERACTION_DIMENSION_RECONCILIATION_REVIEW_VERSION,
    status: 'RESOLVED_BRANCH_CLASH_CROSS_METHODOLOGY_MINIMUM_INTERACTION_DIMENSION_RECONCILIATION_REVIEW',
    decision:
      'BRANCH_BOTTLENECK_DUAL_SOURCE_BINDING_AND_CURRENT_METHOD_INTERACTION_DIMENSION_INSUFFICIENCY_NO_FLAT_MODIFIER_NO_METHOD_STITCHING',
    upstreamB45EvidenceId: 'b45_fixture_for_b47',
    exactB45BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    methodologyProfileCount: 2,
    sourcePathRecords: CAREER_T8_B46_SOURCE_PATH_RECORDS,
    sourcePathRecordCount: 3,
    interactionDimensionRecords: CAREER_T8_B46_INTERACTION_DIMENSION_RECORDS,
    interactionDimensionRecordCount: 12,
    structurallyAvailableDimensionRecordCount: 2,
    observationalButNoEffectDimensionRecordCount: 2,
    blockedOrMissingDimensionRecordCount: 8,
    sourceScarcityRejectedAsSoleExplanation: true,
    sourceTargetBindingBlockerStillPresent: true,
    currentMethodInteractionDimensionsInsufficient: true,
    branchHistoricalGapExclusivelyReclassifiedToMethodInsufficiency: false,
    flatUnaryClashModifierAuthorized: false,
    sourceMandatoryDependencyDroppingAuthorized: false,
    crossMethodologyStitchingAuthorized: false,
    universalInteractionEvaluatorAuthorized: false,
    methodologyInputContractSchemaPresent: true,
    ruleInputSubsetValidationPresent: true,
    activeRuleSetRequiredInputCoverageValidationPresent: false,
    existingArchitectureCanHostMethodSpecificContracts: true,
    newParallelInterpretationRuntimeRequired: false,
    branch2015TriggerSatisfied: false,
    branchIndependentCompletePathTriggerSatisfied: false,
    remediationTriggerIds: CAREER_T8_B46_REMEDIATION_TRIGGER_IDS,
    remediationTriggerCount: 3,
    immediatelyExecutableAuthorityAdmissionLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    methodologyDefinitionCreatedByThisGate: false,
    t5RuleAuthoringAuthorized: false,
    t6RuleAuthoringAuthorized: false,
    t8RuleAuthoringAuthorized: false,
    claimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: CAREER_T8_B46_RECONCILIATION_CONTROL_IDS,
    controlCount: 16,
    controlsFrozen: true,
    selectedImmediateNextLane: null,
    recommendedNextGate: 'TRIGGER_GATED_BRANCH_METHOD_SPECIFIC_INPUT_CONTRACT_OR_SOURCE_SEPARABILITY_REVIEW',
  };

  return {
    reviewId: `career_personalization_t8_branch_clash_cross_methodology_dimension_reconciliation_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career T8 Branch trigger-gated post-P0 remediation review', () => {
  test('accepts the exact content-addressed B46 boundary and records the post-P0 state only', () => {
    const report = buildCareerPersonalizationT8BranchTriggerGatedPostP0RemediationReview(acceptedB46());
    expect(report.reviewVersion).toBe(
      CAREER_PERSONALIZATION_T8_BRANCH_TRIGGER_GATED_POST_P0_REMEDIATION_REVIEW_VERSION,
    );
    expect(report.status).toBe('RESOLVED_BRANCH_TRIGGER_GATED_POST_P0_REMEDIATION_REVIEW');
    expect(report.decision).toBe(
      'ONE_INFRASTRUCTURE_TRIGGER_CLOSED_TWO_AUTHORITY_TRIGGERS_OPEN_ZERO_SEMANTIC_LANES',
    );
    expect(report.exactB46BoundaryAccepted).toBe(true);
  });

  test('pins the exact post-P0 main and current registry implementation blobs', () => {
    const report = buildCareerPersonalizationT8BranchTriggerGatedPostP0RemediationReview(acceptedB46());
    expect(CAREER_T8_B47_AUDITED_BASE_MAIN_COMMIT).toBe(
      '22d6c9065936ab1bfbcfe89bc5e94a6f28664153',
    );
    expect(report.auditedBaseMainCommit).toBe(CAREER_T8_B47_AUDITED_BASE_MAIN_COMMIT);
    expect(CAREER_T8_B47_REPOSITORY_AUDIT_EVIDENCE.blobs).toHaveLength(3);
    expect(report.repositoryAuditAccepted).toBe(true);
  });

  test('closes only the infrastructure coverage trigger', () => {
    const report = buildCareerPersonalizationT8BranchTriggerGatedPostP0RemediationReview(acceptedB46());
    expect(report.remediationTriggerRecords).toEqual(CAREER_T8_B47_REMEDIATION_TRIGGER_RECORDS);
    expect(report.remediationTriggerCount).toBe(3);
    expect(report.satisfiedRemediationTriggerCount).toBe(1);
    expect(report.unsatisfiedRemediationTriggerCount).toBe(2);
    expect(report.sourceSpecificDependencySeparabilityOrCompletePathTriggerSatisfied).toBe(false);
    expect(report.methodSpecificInputContractAndUpstreamAuthorityTriggerSatisfied).toBe(false);
    expect(report.methodologyRequiredInputCoverageValidationTriggerSatisfied).toBe(true);
    expect(report.remediationTriggerRecords.map((record) => record.state)).toEqual([
      'OPEN_AUTHORITY_EVIDENCE',
      'OPEN_METHOD_AUTHORITY',
      'CLOSED_INFRASTRUCTURE',
    ]);
  });

  test('proves current required-input completeness is fail-closed rather than a documentation assertion', () => {
    const report = buildCareerPersonalizationT8BranchTriggerGatedPostP0RemediationReview(acceptedB46());
    expect(report.activeRuleSetRequiredInputCoverageValidationPresent).toBe(true);
    expect(report.activeRuleSetRequiredInputCoverageValidationFailClosed).toBe(true);
    expect(report.existingArchitectureCanHostMethodSpecificContracts).toBe(true);
  });

  test('records the bounded targeted source recheck without pretending metadata or TOC is target body', () => {
    const report = buildCareerPersonalizationT8BranchTriggerGatedPostP0RemediationReview(acceptedB46());
    expect(CAREER_T8_B47_TARGETED_SOURCE_RECHECK.exact2015PrintedTargetPassageDirectlyAcquired).toBe(false);
    expect(CAREER_T8_B47_TARGETED_SOURCE_RECHECK.independentSingleSourceCompletePathAcquired).toBe(false);
    expect(CAREER_T8_B47_TARGETED_SOURCE_RECHECK.sourceSpecificDependencySeparabilityEstablished).toBe(false);
    expect(CAREER_T8_B47_TARGETED_SOURCE_RECHECK.qualifyingTriggerActivationObserved).toBe(false);
    expect(report.targetedSourceRecheckPerformed).toBe(true);
    expect(report.targetedSourceRecheckDisposition).toBe(
      'NO_QUALIFYING_BRANCH_AUTHORITY_TRIGGER_ACTIVATION',
    );
  });

  test('keeps both B41 authority triggers unsatisfied', () => {
    const report = buildCareerPersonalizationT8BranchTriggerGatedPostP0RemediationReview(acceptedB46());
    expect(report.exact2015PrintedTargetPassageBindingEstablished).toBe(false);
    expect(report.independentSingleSourceCompletePathEstablished).toBe(false);
    expect(report.sourceSpecificDependencySeparabilityEstablished).toBe(false);
    expect(report.methodSpecificUpstreamAuthorityEstablished).toBe(false);
    expect(report.branch2015TriggerSatisfied).toBe(false);
    expect(report.branchIndependentCompletePathTriggerSatisfied).toBe(false);
  });

  test('does not convert infrastructure readiness into methodology or semantic authoring authority', () => {
    const report = buildCareerPersonalizationT8BranchTriggerGatedPostP0RemediationReview(acceptedB46());
    expect(report.methodologyDefinitionCreatedByThisGate).toBe(false);
    expect(report.methodSpecificContractAuthoringAuthorized).toBe(false);
    expect(report.flatUnaryClashModifierAuthorized).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.sourceMandatoryDependencyDroppingAuthorized).toBe(false);
    expect(report.immediatelyExecutableAuthorityAdmissionLaneCount).toBe(0);
    expect(report.immediatelyExecutableSemanticRuleLaneCount).toBe(0);
    expect(report.selectedImmediateNextLane).toBeNull();
  });

  test('preserves all six historical gaps and production boundary', () => {
    const report = buildCareerPersonalizationT8BranchTriggerGatedPostP0RemediationReview(acceptedB46());
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.authorityAdmittedByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
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

  test('freezes the new hold controls and waits for a real source or method-authority change', () => {
    const report = buildCareerPersonalizationT8BranchTriggerGatedPostP0RemediationReview(acceptedB46());
    expect(report.controlIds).toEqual(CAREER_T8_B47_CONTROL_IDS);
    expect(report.controlCount).toBe(16);
    expect(report.controlsFrozen).toBe(true);
    expect(report.broadUnchangedSurfaceSearchRestartAuthorized).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE',
    );
  });

  test('fails closed when the content-addressed B46 identity is tampered', () => {
    const b46 = acceptedB46();
    const tampered: CareerPersonalizationT8BranchClashCrossMethodologyMinimumInteractionDimensionReconciliationReviewReport = {
      ...b46,
      reviewId: `${b46.reviewId}_tampered`,
    };
    const report = buildCareerPersonalizationT8BranchTriggerGatedPostP0RemediationReview(tampered);
    expect(report.status).toBe('UPSTREAM_B46_BOUNDARY_INVALID');
    expect(report.decision).toBe('BRANCH_POST_P0_REMEDIATION_STATE_NOT_ESTABLISHED');
    expect(report.exactB46BoundaryAccepted).toBe(false);
    expect(report.repositoryAuditAccepted).toBe(false);
    expect(report.remediationTriggerCount).toBe(0);
    expect(report.satisfiedRemediationTriggerCount).toBe(0);
    expect(report.unsatisfiedRemediationTriggerCount).toBe(0);
    expect(report.methodologyRequiredInputCoverageValidationTriggerSatisfied).toBe(false);
    expect(report.targetedSourceRecheckDisposition).toBe('NOT_EVALUATED');
    expect(report.controlCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
  });
});
