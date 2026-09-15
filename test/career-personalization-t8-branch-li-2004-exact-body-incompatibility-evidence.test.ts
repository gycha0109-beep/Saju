import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_BRANCH_LI_2004_EXACT_BODY_INCOMPATIBILITY_EVIDENCE_VERSION,
  CAREER_T8_LI_2004_EXACT_BODY_EVIDENCE,
  CAREER_T8_LI_2004_INCOMPATIBILITY_CONTROL_IDS,
  CAREER_T8_LI_2004_MANDATORY_DEPENDENCY_IDS,
  CAREER_T8_LI_2004_SOURCE_IDENTITY,
  buildCareerPersonalizationT8BranchLi2004ExactBodyIncompatibilityEvidence,
} from '../src/research/career-personalization-t8-branch-li-2004-exact-body-incompatibility-evidence.js';
import {
  buildCareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidence,
  type CareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidenceReport,
} from '../src/research/career-personalization-t8-branch-source-or-method-authority-trigger-activation-evidence.js';
import {
  CAREER_PERSONALIZATION_T8_BRANCH_TRIGGER_GATED_POST_P0_REMEDIATION_REVIEW_VERSION,
  CAREER_T8_B47_AUDITED_BASE_MAIN_COMMIT,
  CAREER_T8_B47_CONTROL_IDS,
  CAREER_T8_B47_REMEDIATION_TRIGGER_RECORDS,
  CAREER_T8_B47_TARGETED_SOURCE_RECHECK,
  type CareerPersonalizationT8BranchTriggerGatedPostP0RemediationReviewReport,
} from '../src/research/career-personalization-t8-branch-trigger-gated-post-p0-remediation-review.js';

function acceptedB47(): CareerPersonalizationT8BranchTriggerGatedPostP0RemediationReviewReport {
  const material: Omit<
    CareerPersonalizationT8BranchTriggerGatedPostP0RemediationReviewReport,
    'reviewId'
  > = {
    reviewVersion: CAREER_PERSONALIZATION_T8_BRANCH_TRIGGER_GATED_POST_P0_REMEDIATION_REVIEW_VERSION,
    status: 'RESOLVED_BRANCH_TRIGGER_GATED_POST_P0_REMEDIATION_REVIEW',
    decision: 'ONE_INFRASTRUCTURE_TRIGGER_CLOSED_TWO_AUTHORITY_TRIGGERS_OPEN_ZERO_SEMANTIC_LANES',
    upstreamB46ReviewId: 'b46_fixture_for_li_2004_post_b48',
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

function acceptedB48(): CareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidenceReport {
  return buildCareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidence(acceptedB47());
}

describe('Career T8 Branch Li 2004 exact-body incompatibility evidence', () => {
  test('accepts the exact content-addressed B48 hold and records a real post-B48 source evidence change', () => {
    const report = buildCareerPersonalizationT8BranchLi2004ExactBodyIncompatibilityEvidence(acceptedB48());

    expect(report.evidenceVersion).toBe(
      CAREER_PERSONALIZATION_T8_BRANCH_LI_2004_EXACT_BODY_INCOMPATIBILITY_EVIDENCE_VERSION,
    );
    expect(report.status).toBe('RESOLVED_BRANCH_LI_2004_EXACT_BODY_INCOMPATIBILITY_EVIDENCE');
    expect(report.decision).toBe(
      'LI_2004_EXACT_EDITION_INDEXED_BODY_ACQUIRED_DEPENDENCIES_NOT_SEPARABLE_CURRENT_METHOD_INDEPENDENT_COMPLETE_PATH_REJECTED_BRANCH_AUTHORITY_HOLD_PRESERVED',
    );
    expect(report.exactB48BoundaryAccepted).toBe(true);
    expect(report.sourceEvidenceStateChangedSinceB48).toBe(true);
    expect(report.sourceAcquisitionCount).toBe(1);
  });

  test('pins the exact Li 2004 bibliographic identity without pretending indexed text is a facsimile inspection', () => {
    const report = buildCareerPersonalizationT8BranchLi2004ExactBodyIncompatibilityEvidence(acceptedB48());

    expect(CAREER_T8_LI_2004_SOURCE_IDENTITY).toContain('ISBN 9787228087822');
    expect(CAREER_T8_LI_2004_SOURCE_IDENTITY).toContain('342 pages');
    expect(report.sourceEvidence).toEqual(CAREER_T8_LI_2004_EXACT_BODY_EVIDENCE);
    expect(report.exactEditionBibliographicIdentityCorroborated).toBe(true);
    expect(report.exactEditionIndexedBodySurfaceInspected).toBe(true);
    expect(report.facsimileScanDirectlyInspected).toBe(false);
  });

  test('preserves the source mandatory dependency inventory instead of flattening branch clash', () => {
    const report = buildCareerPersonalizationT8BranchLi2004ExactBodyIncompatibilityEvidence(acceptedB48());

    expect(report.natalBranchClashMethodBodyInspected).toBe(true);
    expect(report.tenGodAndCareerMethodMaterialInspected).toBe(true);
    expect(report.mandatoryDependencyIds).toEqual(CAREER_T8_LI_2004_MANDATORY_DEPENDENCY_IDS);
    expect(report.mandatoryDependencyIds).toEqual([
      'seasonal_command_context',
      'whole_chart_structural_composition',
      'day_master_strength',
      'xiji_or_yongshen_context',
    ]);
    expect(report.sourceSupportedDependencySeparabilityEstablished).toBe(false);
    expect(report.currentCareerMethodConsumesAllMandatoryDependencies).toBe(false);
  });

  test('classifies Li 2004 as incompatible for the current-method independent complete-path purpose only', () => {
    const report = buildCareerPersonalizationT8BranchLi2004ExactBodyIncompatibilityEvidence(acceptedB48());

    expect(report.singlePassageExactZhengguanToNatalClashBridgeEstablished).toBe(false);
    expect(report.currentMethodCompatibleIndependentCompletePathEstablished).toBe(false);
    expect(report.currentMethodIncompatibilityForIndependentCompletePathEstablished).toBe(true);
    expect(report.li2004IndependentCompletePathCandidateExcludedUnderCurrentMethod).toBe(true);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.sourceMandatoryDependencyDroppingAuthorized).toBe(false);
  });

  test('does not turn a negative source-state change into a frozen Branch trigger activation', () => {
    const report = buildCareerPersonalizationT8BranchLi2004ExactBodyIncompatibilityEvidence(acceptedB48());

    expect(report.exact2015PrintedTargetPassageBindingEstablished).toBe(false);
    expect(report.methodSpecificUpstreamAuthorityEstablished).toBe(false);
    expect(report.sourceSpecificDependencySeparabilityOrCompletePathTriggerActivated).toBe(false);
    expect(report.methodSpecificInputContractAndUpstreamAuthorityTriggerActivated).toBe(false);
    expect(report.qualifyingAuthorityTriggerActivationCount).toBe(0);
    expect(report.authorityResearchLaneReopenedCount).toBe(0);
    expect(report.selectedImmediateNextLane).toBeNull();
  });

  test('preserves all semantic gap preview and production boundaries', () => {
    const report = buildCareerPersonalizationT8BranchLi2004ExactBodyIncompatibilityEvidence(acceptedB48());

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

  test('records exactly one source acquisition and zero implementation-side semantic effects', () => {
    const report = buildCareerPersonalizationT8BranchLi2004ExactBodyIncompatibilityEvidence(acceptedB48());

    expect(report.controlIds).toEqual(CAREER_T8_LI_2004_INCOMPATIBILITY_CONTROL_IDS);
    expect(report.controlCount).toBe(14);
    expect(report.controlsFrozen).toBe(true);
    expect(report.implementationEffects).toEqual({
      sourceAcquisitionsPerformed: 1,
      sourcePathsExcludedAsCurrentMethodCompletePath: 1,
      authorityTriggersActivated: 0,
      authorityResearchLanesReopened: 0,
      authorityCandidatesAdmitted: 0,
      authorityGapsClosed: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    });
    expect(report.recommendedNextGate).toBe('BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE');
  });

  test('is deterministic and fails closed on a tampered B48 identity', () => {
    const first = buildCareerPersonalizationT8BranchLi2004ExactBodyIncompatibilityEvidence(acceptedB48());
    const second = buildCareerPersonalizationT8BranchLi2004ExactBodyIncompatibilityEvidence(acceptedB48());
    expect(first.evidenceId).toBe(second.evidenceId);
    expect(first).toEqual(second);

    const b48 = acceptedB48();
    const tampered: CareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidenceReport = {
      ...b48,
      evidenceId: `${b48.evidenceId}_tampered`,
    };
    const invalid = buildCareerPersonalizationT8BranchLi2004ExactBodyIncompatibilityEvidence(tampered);
    expect(invalid.status).toBe('UPSTREAM_B48_BOUNDARY_INVALID');
    expect(invalid.decision).toBe('LI_2004_EXACT_BODY_INCOMPATIBILITY_EVIDENCE_NOT_ESTABLISHED');
    expect(invalid.exactB48BoundaryAccepted).toBe(false);
    expect(invalid.sourceEvidenceStateChangedSinceB48).toBe(false);
    expect(invalid.sourceEvidence).toBeNull();
    expect(invalid.sourceAcquisitionCount).toBe(0);
    expect(invalid.currentMethodIncompatibilityForIndependentCompletePathEstablished).toBe(false);
    expect(invalid.controlCount).toBe(0);
    expect(invalid.controlsFrozen).toBe(false);
    expect(invalid.recommendedNextGate).toBe('BRANCH_LI_2004_EXACT_BODY_INCOMPATIBILITY_EVIDENCE');
  });
});
