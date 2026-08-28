import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import { buildCareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidence } from '../src/research/career-personalization-t8-branch-2004-exact-edition-body-compatibility-closure-evidence.js';
import { buildCareerPersonalizationT8Branch2009XuBingxinExactEditionBodyCompatibilityClosureEvidence } from '../src/research/career-personalization-t8-branch-2009-xu-bingxin-exact-edition-body-compatibility-closure-evidence.js';
import { buildCareerPersonalizationT8Branch2015ShishenChanweiPublicationLineageAndExactBodyAcquisitionRecheckEvidence } from '../src/research/career-personalization-t8-branch-2015-shishen-chanwei-publication-lineage-and-exact-body-acquisition-recheck-evidence.js';
import { buildCareerPersonalizationT8Branch2016LuExactEditionBodyCompatibilityClosureEvidence } from '../src/research/career-personalization-t8-branch-2016-lu-exact-edition-body-compatibility-closure-evidence.js';
import { buildCareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidence } from '../src/research/career-personalization-t8-branch-source-or-method-authority-trigger-activation-evidence.js';
import {
  CAREER_PERSONALIZATION_T8_BRANCH_TRIGGER_GATED_POST_P0_REMEDIATION_REVIEW_VERSION,
  CAREER_T8_B47_AUDITED_BASE_MAIN_COMMIT,
  CAREER_T8_B47_CONTROL_IDS,
  CAREER_T8_B47_REMEDIATION_TRIGGER_RECORDS,
  CAREER_T8_B47_TARGETED_SOURCE_RECHECK,
  type CareerPersonalizationT8BranchTriggerGatedPostP0RemediationReviewReport,
} from '../src/research/career-personalization-t8-branch-trigger-gated-post-p0-remediation-review.js';
import {
  CAREER_PERSONALIZATION_T8_POST_B52_GLOBAL_RESEARCH_HOLD_REVIEW_VERSION,
  CAREER_T8_B53_GLOBAL_REOPEN_SIGNAL_CLASSES,
  CAREER_T8_B53_GLOBAL_RESEARCH_FRONTIER_RECORDS,
  CAREER_T8_B53_GLOBAL_RESEARCH_HOLD_CONTROL_IDS,
  buildCareerPersonalizationT8PostB52GlobalResearchHoldReview,
} from '../src/research/career-personalization-t8-post-b52-global-research-hold-review.js';

function acceptedB47(): CareerPersonalizationT8BranchTriggerGatedPostP0RemediationReviewReport {
  const material: Omit<CareerPersonalizationT8BranchTriggerGatedPostP0RemediationReviewReport, 'reviewId'> = {
    reviewVersion: CAREER_PERSONALIZATION_T8_BRANCH_TRIGGER_GATED_POST_P0_REMEDIATION_REVIEW_VERSION,
    status: 'RESOLVED_BRANCH_TRIGGER_GATED_POST_P0_REMEDIATION_REVIEW',
    decision: 'ONE_INFRASTRUCTURE_TRIGGER_CLOSED_TWO_AUTHORITY_TRIGGERS_OPEN_ZERO_SEMANTIC_LANES',
    upstreamB46ReviewId: 'b46_fixture_for_b53',
    exactB46BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    auditedBaseMainCommit: CAREER_T8_B47_AUDITED_BASE_MAIN_COMMIT,
    repositoryAuditAccepted: true,
    targetedSourceRecheckPerformed: true,
    targetedSourceRecheckDisposition: CAREER_T8_B47_TARGETED_SOURCE_RECHECK.disposition,
    remediationTriggerRecords: CAREER_T8_B47_REMEDIATION_TRIGGER_RECORDS,
    remediationTriggerCount: 3,
    satisfiedRemediationTriggerCount: 1,
    unsatisfiedRemediationTriggerCount: 2,
    sourceSpecificDependencySeparabilityOrCompletePathTriggerSatisfied: false,
    methodSpecificInputContractAndUpstreamAuthorityTriggerSatisfied: false,
    methodologyRequiredInputCoverageValidationTriggerSatisfied: true,
    exact2015PrintedTargetPassageBindingEstablished: false,
    independentSingleSourceCompletePathEstablished: false,
    sourceSpecificDependencySeparabilityEstablished: false,
    methodSpecificUpstreamAuthorityEstablished: false,
    branch2015TriggerSatisfied: false,
    branchIndependentCompletePathTriggerSatisfied: false,
    existingArchitectureCanHostMethodSpecificContracts: true,
    activeRuleSetRequiredInputCoverageValidationPresent: true,
    activeRuleSetRequiredInputCoverageValidationFailClosed: true,
    methodologyDefinitionCreatedByThisGate: false,
    methodSpecificContractAuthoringAuthorized: false,
    flatUnaryClashModifierAuthorized: false,
    crossSourceStitchingAuthorized: false,
    sourceMandatoryDependencyDroppingAuthorized: false,
    immediatelyExecutableAuthorityAdmissionLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane: null,
    broadUnchangedSurfaceSearchRestartAuthorized: false,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    t5RuleAuthoringAuthorized: false,
    t6RuleAuthoringAuthorized: false,
    t8RuleAuthoringAuthorized: false,
    claimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: CAREER_T8_B47_CONTROL_IDS,
    controlCount: 16,
    controlsFrozen: true,
    recommendedNextGate: 'BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE',
  };

  return {
    reviewId: `career_personalization_t8_branch_trigger_gated_post_p0_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function acceptedB52() {
  const b48 = buildCareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidence(acceptedB47());
  const b49 = buildCareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidence(b48);
  const b50 = buildCareerPersonalizationT8Branch2016LuExactEditionBodyCompatibilityClosureEvidence(b49);
  const b51 = buildCareerPersonalizationT8Branch2015ShishenChanweiPublicationLineageAndExactBodyAcquisitionRecheckEvidence(b50);
  return buildCareerPersonalizationT8Branch2009XuBingxinExactEditionBodyCompatibilityClosureEvidence(b51);
}

describe('Career T8 post-B52 global research hold review', () => {
  test('accepts exact B52 and closes the completed Branch reopen cycle into a global hold', () => {
    const report = buildCareerPersonalizationT8PostB52GlobalResearchHoldReview(acceptedB52());

    expect(report.reviewVersion).toBe(CAREER_PERSONALIZATION_T8_POST_B52_GLOBAL_RESEARCH_HOLD_REVIEW_VERSION);
    expect(report.status).toBe('RESOLVED_CAREER_PERSONALIZATION_T8_POST_B52_GLOBAL_RESEARCH_HOLD_REVIEW');
    expect(report.decision).toBe(
      'POST_REOPEN_GLOBAL_TRIGGER_GATED_RESEARCH_HOLD_BRANCH_CYCLE_EXHAUSTED_ZERO_EXECUTABLE_LANES_RESUME_ONLY_ON_EXPLICIT_FROZEN_SIGNAL_CHANGE',
    );
    expect(report.exactB52BoundaryAccepted).toBe(true);
    expect(report.globalResearchHoldActive).toBe(true);
    expect(report.branchReopenCycleCompleted).toBe(true);
  });

  test('freezes four material Branch state changes and three negative published compatibility paths', () => {
    const report = buildCareerPersonalizationT8PostB52GlobalResearchHoldReview(acceptedB52());

    expect(report.branchMaterialStateChangesAfterB48Reviewed).toBe(4);
    expect(report.branchNegativePublishedCompatibilityPathCount).toBe(3);
    expect(report.branch2015LineageRecheckCompleted).toBe(true);
    expect(report.branch2015ExactPrintedTargetBodyHoldPreserved).toBe(true);
    expect(report.branchCurrentMethodCompatibleCompletePathCount).toBe(0);
  });

  test('keeps both Branch authority triggers unsatisfied with zero activation', () => {
    const report = buildCareerPersonalizationT8PostB52GlobalResearchHoldReview(acceptedB52());

    expect(report.branchSourceSpecificDependencySeparabilityOrCompletePathTriggerSatisfied).toBe(false);
    expect(report.branchMethodSpecificInputContractAndUpstreamAuthorityTriggerSatisfied).toBe(false);
    expect(report.branchAuthorityTriggerActivationCount).toBe(0);
  });

  test('freezes the nine-lane frontier with Branch on post-reopen negative-path hold', () => {
    const report = buildCareerPersonalizationT8PostB52GlobalResearchHoldReview(acceptedB52());
    const branch = report.frontierRecords.find((record) => record.laneId === 'BRANCH_CLASH_CURRENT_T5_BRIDGE');

    expect(report.frontierRecords).toEqual(CAREER_T8_B53_GLOBAL_RESEARCH_FRONTIER_RECORDS);
    expect(report.frontierRecordCount).toBe(9);
    expect(branch?.state).toBe('POST_REOPEN_NEGATIVE_PATH_HOLD_ZERO_AUTHORITY_TRIGGERS');
    expect(branch?.existingSurfaceResearchExecutable).toBe(false);
    expect(branch?.authorityAdmissionExecutable).toBe(false);
    expect(branch?.boundedGovernanceGateExecutable).toBe(false);
    expect(report.nonBranchFrontierRemainsTriggerGated).toBe(true);
  });

  test('refines reopen policy to explicit evidence or governed method signals only', () => {
    const report = buildCareerPersonalizationT8PostB52GlobalResearchHoldReview(acceptedB52());

    expect(report.globalReopenSignalClasses).toEqual(CAREER_T8_B53_GLOBAL_REOPEN_SIGNAL_CLASSES);
    expect(report.globalReopenSignalClassCount).toBe(10);
    expect(report.globalReopenSignalClasses).toContain('BRANCH_2015_EXACT_PRINTED_TARGET_BODY_ACQUIRED');
    expect(report.globalReopenSignalClasses).toContain('BRANCH_DIFFERENT_QUALIFYING_SOURCE_COMPLETE_PATH_SIGNAL');
    expect(report.globalReopenSignalClasses).toContain('BRANCH_GOVERNED_METHOD_AUTHORITY_CHANGE');
  });

  test('opens zero immediate research admission semantic or governance lanes', () => {
    const report = buildCareerPersonalizationT8PostB52GlobalResearchHoldReview(acceptedB52());

    expect(report.immediatelyExecutableAuthorityResearchLaneCount).toBe(0);
    expect(report.immediatelyExecutableAuthorityAdmissionLaneCount).toBe(0);
    expect(report.immediatelyExecutableSemanticRuleLaneCount).toBe(0);
    expect(report.boundedGovernanceGateExecutableCount).toBe(0);
    expect(report.selectedImmediateNextLane).toBeNull();
  });

  test('forbids broad or repeated Branch search and preserves source semantics', () => {
    const report = buildCareerPersonalizationT8PostB52GlobalResearchHoldReview(acceptedB52());

    expect(report.broadBranchSourceSearchRestartAuthorized).toBe(false);
    expect(report.repeatedClosedBranchSurfaceSearchAuthorized).toBe(false);
    expect(report.exact2015LineageOnlyResearchRestartAuthorized).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.sourceMandatoryDependencyDroppingAuthorized).toBe(false);
    expect(report.effectClassFlatteningAuthorized).toBe(false);
  });

  test('preserves all six historical gaps and all production boundaries', () => {
    const report = buildCareerPersonalizationT8PostB52GlobalResearchHoldReview(acceptedB52());

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

  test('freezes B53 controls and records only a research-hold artifact effect', () => {
    const report = buildCareerPersonalizationT8PostB52GlobalResearchHoldReview(acceptedB52());

    expect(report.controlIds).toEqual(CAREER_T8_B53_GLOBAL_RESEARCH_HOLD_CONTROL_IDS);
    expect(report.controlCount).toBe(15);
    expect(report.controlsFrozen).toBe(true);
    expect(report.implementationEffects).toEqual({
      sourceBodiesAcquired: 0,
      sourcePathsNegativelyClosed: 0,
      authorityTriggersActivated: 0,
      authorityResearchLanesOpened: 0,
      authorityComponentsAdmitted: 0,
      authorityGapsClosed: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
      productionBehaviorsChanged: 0,
      researchHoldReviewsCreated: 1,
    });
    expect(report.recommendedNextGate).toBe('CAREER_PERSONALIZATION_T8_POST_B52_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE');
  });

  test('is deterministic for the exact same B52 boundary', () => {
    const first = buildCareerPersonalizationT8PostB52GlobalResearchHoldReview(acceptedB52());
    const second = buildCareerPersonalizationT8PostB52GlobalResearchHoldReview(acceptedB52());

    expect(first.reviewId).toBe(second.reviewId);
    expect(first).toEqual(second);
  });

  test('fails closed when the B52 content-addressed identity is tampered', () => {
    const b52 = acceptedB52();
    const tampered = { ...b52, evidenceId: `${b52.evidenceId}_tampered` };
    const report = buildCareerPersonalizationT8PostB52GlobalResearchHoldReview(tampered);

    expect(report.status).toBe('UPSTREAM_B52_BOUNDARY_INVALID');
    expect(report.decision).toBe('POST_B52_GLOBAL_RESEARCH_HOLD_NOT_ESTABLISHED');
    expect(report.exactB52BoundaryAccepted).toBe(false);
    expect(report.globalResearchHoldActive).toBe(false);
    expect(report.branchReopenCycleCompleted).toBe(false);
    expect(report.branchMaterialStateChangesAfterB48Reviewed).toBe(0);
    expect(report.branchNegativePublishedCompatibilityPathCount).toBe(0);
    expect(report.frontierRecordCount).toBe(0);
    expect(report.globalReopenSignalClassCount).toBe(0);
    expect(report.controlCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
    expect(report.implementationEffects.researchHoldReviewsCreated).toBe(0);
    expect(report.recommendedNextGate).toBe('CAREER_PERSONALIZATION_T8_POST_B52_GLOBAL_RESEARCH_HOLD_REVIEW');
  });
});
