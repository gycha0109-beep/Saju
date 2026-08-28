import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE_VERSION,
  CAREER_T8_B48_AUTHORITY_TRIGGER_ACTIVATION_CONTROL_IDS,
  CAREER_T8_B48_AUTHORITY_TRIGGER_ACTIVATION_RECORDS,
  buildCareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidence,
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
    upstreamB46ReviewId: 'b46_fixture_for_b48',
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

describe('Career T8 Branch source-or-method authority trigger activation evidence', () => {
  test('accepts the exact content-addressed B47 boundary and resolves a zero-activation evidence gate', () => {
    const report = buildCareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidence(
      acceptedB47(),
    );

    expect(report.evidenceVersion).toBe(
      CAREER_PERSONALIZATION_T8_BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE',
    );
    expect(report.decision).toBe(
      'ZERO_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATIONS_BRANCH_AUTHORITY_HOLD_PRESERVED',
    );
    expect(report.exactB47BoundaryAccepted).toBe(true);
    expect(report.branchAuthorityHoldActive).toBe(true);
  });

  test('evaluates exactly the two open B47 authority triggers and activates neither', () => {
    const report = buildCareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidence(
      acceptedB47(),
    );

    expect(report.activationRecords).toEqual(CAREER_T8_B48_AUTHORITY_TRIGGER_ACTIVATION_RECORDS);
    expect(report.activationRecordCount).toBe(2);
    expect(report.evidenceStateChangedTriggerCount).toBe(0);
    expect(report.qualifyingActivationCount).toBe(0);
    expect(report.satisfiedOpenAuthorityTriggerCount).toBe(0);
    expect(report.sourceSpecificDependencySeparabilityOrCompletePathTriggerActivated).toBe(false);
    expect(report.methodSpecificInputContractAndUpstreamAuthorityTriggerActivated).toBe(false);
    expect(report.authorityResearchLaneReopenedCount).toBe(0);
  });

  test('keeps the source-authority path blocked on exact-body or complete-path and dependency-separability evidence', () => {
    const report = buildCareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidence(
      acceptedB47(),
    );
    const source = report.activationRecords.find(
      (record) =>
        record.triggerId ===
        'BRANCH_SOURCE_SPECIFIC_DEPENDENCY_SEPARABILITY_OR_COMPLETE_PATH_TRIGGER',
    );

    expect(source?.upstreamState).toBe('OPEN_AUTHORITY_EVIDENCE');
    expect(source?.evidenceStateChangedSinceB47).toBe(false);
    expect(source?.triggerSatisfied).toBe(false);
    expect(source?.blockingConditions).toEqual([
      'DIRECT_EXACT_2015_PRINTED_TARGET_PASSAGE_OR_INDEPENDENT_COMPLETE_SINGLE_SOURCE_PATH',
      'SOURCE_SUPPORTED_DEPENDENCY_SEPARABILITY_OR_CURRENT_METHOD_COMPATIBILITY',
    ]);
    expect(report.exact2015PrintedTargetPassageBindingEstablished).toBe(false);
    expect(report.independentSingleSourceCompletePathEstablished).toBe(false);
    expect(report.sourceSpecificDependencySeparabilityEstablished).toBe(false);
  });

  test('keeps the method-authority path blocked even though P0 infrastructure can host fail-closed contracts', () => {
    const report = buildCareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidence(
      acceptedB47(),
    );
    const method = report.activationRecords.find(
      (record) =>
        record.triggerId === 'BRANCH_METHOD_SPECIFIC_INPUT_CONTRACT_AND_UPSTREAM_AUTHORITY_TRIGGER',
    );

    expect(method?.upstreamState).toBe('OPEN_METHOD_AUTHORITY');
    expect(method?.evidenceStateChangedSinceB47).toBe(false);
    expect(method?.triggerSatisfied).toBe(false);
    expect(report.methodologyRequiredInputCoverageValidationTriggerRemainsClosed).toBe(true);
    expect(report.existingArchitectureCanHostMethodSpecificContracts).toBe(true);
    expect(report.activeRuleSetRequiredInputCoverageValidationPresent).toBe(true);
    expect(report.activeRuleSetRequiredInputCoverageValidationFailClosed).toBe(true);
    expect(report.methodSpecificUpstreamAuthorityEstablished).toBe(false);
    expect(report.methodologyDefinitionCreatedByThisGate).toBe(false);
  });

  test('preserves every semantic, gap, preview and production boundary', () => {
    const report = buildCareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidence(
      acceptedB47(),
    );

    expect(report.immediatelyExecutableAuthorityAdmissionLaneCount).toBe(0);
    expect(report.immediatelyExecutableSemanticRuleLaneCount).toBe(0);
    expect(report.selectedImmediateNextLane).toBeNull();
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.sourceMandatoryDependencyDroppingAuthorized).toBe(false);
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

  test('records zero implementation-side semantic effects and self-holds until a frozen signal changes', () => {
    const report = buildCareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidence(
      acceptedB47(),
    );

    expect(report.controlIds).toEqual(CAREER_T8_B48_AUTHORITY_TRIGGER_ACTIVATION_CONTROL_IDS);
    expect(report.controlCount).toBe(14);
    expect(report.controlsFrozen).toBe(true);
    expect(report.broadUnchangedSurfaceSearchRestartAuthorized).toBe(false);
    expect(report.implementationEffects).toEqual({
      openAuthorityTriggersEvaluated: 2,
      authorityTriggersActivated: 0,
      authorityResearchLanesReopened: 0,
      sourceAcquisitionsPerformed: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    });
    expect(report.recommendedNextGate).toBe(
      'BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE',
    );
  });

  test('is deterministic for the same exact B47 boundary', () => {
    const first = buildCareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidence(
      acceptedB47(),
    );
    const second = buildCareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidence(
      acceptedB47(),
    );

    expect(first.evidenceId).toBe(second.evidenceId);
    expect(first).toEqual(second);
  });

  test('fails closed when the content-addressed B47 identity is tampered', () => {
    const b47 = acceptedB47();
    const tampered: CareerPersonalizationT8BranchTriggerGatedPostP0RemediationReviewReport = {
      ...b47,
      reviewId: `${b47.reviewId}_tampered`,
    };
    const report = buildCareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidence(
      tampered,
    );

    expect(report.status).toBe('UPSTREAM_B47_BOUNDARY_INVALID');
    expect(report.decision).toBe(
      'BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_NOT_ESTABLISHED',
    );
    expect(report.exactB47BoundaryAccepted).toBe(false);
    expect(report.activationRecordCount).toBe(0);
    expect(report.methodologyRequiredInputCoverageValidationTriggerRemainsClosed).toBe(false);
    expect(report.branchAuthorityHoldActive).toBe(false);
    expect(report.controlCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'BRANCH_TRIGGER_GATED_POST_P0_REMEDIATION_REVIEW',
    );
  });
});
