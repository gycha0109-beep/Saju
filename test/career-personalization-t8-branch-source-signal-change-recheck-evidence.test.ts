import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  buildCareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidence,
} from '../src/research/career-personalization-t8-branch-source-or-method-authority-trigger-activation-evidence.js';
import {
  CAREER_PERSONALIZATION_T8_BRANCH_SOURCE_SIGNAL_CHANGE_RECHECK_EVIDENCE_VERSION,
  CAREER_T8_B49_LU_ZHIJI_BRANCH_NEGATIVE_COMPATIBILITY_EVIDENCE,
  CAREER_T8_B49_SOURCE_SIGNAL_RECHECK_CONTROL_IDS,
  buildCareerPersonalizationT8BranchSourceSignalChangeRecheckEvidence,
} from '../src/research/career-personalization-t8-branch-source-signal-change-recheck-evidence.js';
import {
  CAREER_PERSONALIZATION_T8_BRANCH_TRIGGER_GATED_POST_P0_REMEDIATION_REVIEW_VERSION,
  CAREER_T8_B47_AUDITED_BASE_MAIN_COMMIT,
  CAREER_T8_B47_CONTROL_IDS,
  CAREER_T8_B47_REMEDIATION_TRIGGER_RECORDS,
  CAREER_T8_B47_TARGETED_SOURCE_RECHECK,
  type CareerPersonalizationT8BranchTriggerGatedPostP0RemediationReviewReport,
} from '../src/research/career-personalization-t8-branch-trigger-gated-post-p0-remediation-review.js';

function acceptedB47(): CareerPersonalizationT8BranchTriggerGatedPostP0RemediationReviewReport {
  const material: Omit<CareerPersonalizationT8BranchTriggerGatedPostP0RemediationReviewReport, 'reviewId'> = {
    reviewVersion: CAREER_PERSONALIZATION_T8_BRANCH_TRIGGER_GATED_POST_P0_REMEDIATION_REVIEW_VERSION,
    status: 'RESOLVED_BRANCH_TRIGGER_GATED_POST_P0_REMEDIATION_REVIEW',
    decision: 'ONE_INFRASTRUCTURE_TRIGGER_CLOSED_TWO_AUTHORITY_TRIGGERS_OPEN_ZERO_SEMANTIC_LANES',
    upstreamB46ReviewId: 'b46_fixture_for_b49',
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

function acceptedB48() {
  return buildCareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidence(acceptedB47());
}

describe('Career T8 Branch source signal change recheck evidence', () => {
  test('accepts exact B48 and records one material source evidence change', () => {
    const report = buildCareerPersonalizationT8BranchSourceSignalChangeRecheckEvidence(acceptedB48());

    expect(report.evidenceVersion).toBe(
      CAREER_PERSONALIZATION_T8_BRANCH_SOURCE_SIGNAL_CHANGE_RECHECK_EVIDENCE_VERSION,
    );
    expect(report.status).toBe('RESOLVED_BRANCH_SOURCE_SIGNAL_CHANGE_RECHECK_EVIDENCE');
    expect(report.decision).toBe(
      'ONE_NEW_INDEPENDENT_PUBLISHED_SOURCE_BODY_ACQUIRED_ZERO_AUTHORITY_TRIGGER_ACTIVATIONS_CURRENT_METHOD_INCOMPATIBILITY_PRESERVED',
    );
    expect(report.exactB48BoundaryAccepted).toBe(true);
    expect(report.sourceEvidenceStateChangedSinceB48).toBe(true);
    expect(report.newPublishedSourceBodyCount).toBe(1);
  });

  test('pins the new published source identity and inspected local body', () => {
    const report = buildCareerPersonalizationT8BranchSourceSignalChangeRecheckEvidence(acceptedB48());
    const source = report.newSourceEvidence;

    expect(source).toEqual(CAREER_T8_B49_LU_ZHIJI_BRANCH_NEGATIVE_COMPATIBILITY_EVIDENCE);
    expect(source?.sourceIdentity).toContain('陸致極');
    expect(source?.sourceIdentity).toContain('9789621459978');
    expect(source?.sourceLocator).toContain('pp.147-149');
    expect(source?.sourceBodyDirectlyInspected).toBe(true);
    expect(source?.exactPublicationIdentityBoundFromInspectedSurface).toBe(true);
    expect(source?.independentPublishedSourcePath).toBe(true);
    expect(source?.natalScopeConfirmed).toBe(true);
  });

  test('preserves exact Zhengguan and current formal-responsibility correspondence as material only', () => {
    const report = buildCareerPersonalizationT8BranchSourceSignalChangeRecheckEvidence(acceptedB48());
    const source = report.newSourceEvidence;

    expect(source?.exactTenGod).toBe('정관');
    expect(source?.governedCurrentT5SemanticKey).toBe('TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY');
    expect(source?.governedCurrentT5Facet).toBe('formal_responsibility');
    expect(source?.currentT5SemanticCorrespondenceMaterial).toBe(true);
    expect(source?.semanticEvidence.join(' ')).toContain('discipline');
    expect(source?.semanticEvidence.join(' ')).toContain('rule-following');
  });

  test('records natal branch clash damage but does not translate pattern damage into a governed flat modifier', () => {
    const report = buildCareerPersonalizationT8BranchSourceSignalChangeRecheckEvidence(acceptedB48());
    const source = report.newSourceEvidence;

    expect(source?.natalBranchClashConditionObserved).toBe(true);
    expect(source?.qualitativeDamageObserved).toBe(true);
    expect(source?.sourceQualitativeEffectClass).toBe('PATTERN_ROOT_DAMAGED_OR_BROKEN');
    expect(source?.interactionEvidence.join(' ')).toContain('month-command branch');
    expect(report.t5RuleAuthoringAuthorized).toBe(false);
    expect(report.t6RuleAuthoringAuthorized).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
  });

  test('treats the same-source strength and pattern dependencies as mandatory blockers', () => {
    const report = buildCareerPersonalizationT8BranchSourceSignalChangeRecheckEvidence(acceptedB48());
    const source = report.newSourceEvidence;

    expect(source?.explicitDayMasterStrengthDependencyObserved).toBe(true);
    expect(source?.explicitPatternDependencyObserved).toBe(true);
    expect(source?.explicitMonthCommandRootDependencyObserved).toBe(true);
    expect(source?.sourceSpecificDependencySeparabilityEstablished).toBe(false);
    expect(source?.currentMethodCompatibilityEstablished).toBe(false);
    expect(source?.independentCompletePathEstablished).toBe(false);
    expect(source?.negativeCompatibilityControl).toBe(true);
    expect(report.sourceMandatoryDependencyDroppingAuthorized).toBe(false);
  });

  test('changes evidence state without activating either B48 authority trigger', () => {
    const report = buildCareerPersonalizationT8BranchSourceSignalChangeRecheckEvidence(acceptedB48());

    expect(report.sourceSpecificDependencySeparabilityOrCompletePathTriggerActivated).toBe(false);
    expect(report.methodSpecificInputContractAndUpstreamAuthorityTriggerActivated).toBe(false);
    expect(report.satisfiedOpenAuthorityTriggerCount).toBe(0);
    expect(report.qualifyingActivationCount).toBe(0);
    expect(report.authorityResearchLaneReopenedCount).toBe(0);
    expect(report.immediatelyExecutableAuthorityAdmissionLaneCount).toBe(0);
    expect(report.immediatelyExecutableSemanticRuleLaneCount).toBe(0);
    expect(report.selectedImmediateNextLane).toBeNull();
    expect(report.branchAuthorityHoldActive).toBe(true);
  });

  test('preserves all gaps preview and production boundaries', () => {
    const report = buildCareerPersonalizationT8BranchSourceSignalChangeRecheckEvidence(acceptedB48());

    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.authorityAdmittedByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
    expect(report.methodologyDefinitionCreatedByThisGate).toBe(false);
    expect(report.claimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
  });

  test('records one source acquisition and self-holds until another material signal change', () => {
    const report = buildCareerPersonalizationT8BranchSourceSignalChangeRecheckEvidence(acceptedB48());

    expect(report.controlIds).toEqual(CAREER_T8_B49_SOURCE_SIGNAL_RECHECK_CONTROL_IDS);
    expect(report.controlCount).toBe(13);
    expect(report.controlsFrozen).toBe(true);
    expect(report.implementationEffects).toEqual({
      sourceEvidenceChangesRecorded: 1,
      newPublishedSourceBodiesInspected: 1,
      authorityTriggersActivated: 0,
      authorityResearchLanesReopened: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    });
    expect(report.recommendedNextGate).toBe('BRANCH_SOURCE_SIGNAL_CHANGE_RECHECK_EVIDENCE');
  });

  test('is deterministic for the exact same B48 boundary', () => {
    const first = buildCareerPersonalizationT8BranchSourceSignalChangeRecheckEvidence(acceptedB48());
    const second = buildCareerPersonalizationT8BranchSourceSignalChangeRecheckEvidence(acceptedB48());

    expect(first.evidenceId).toBe(second.evidenceId);
    expect(first).toEqual(second);
  });

  test('fails closed when B48 content-addressed identity is tampered', () => {
    const b48 = acceptedB48();
    const tampered = { ...b48, evidenceId: `${b48.evidenceId}_tampered` };
    const report = buildCareerPersonalizationT8BranchSourceSignalChangeRecheckEvidence(tampered);

    expect(report.status).toBe('UPSTREAM_B48_BOUNDARY_INVALID');
    expect(report.decision).toBe('BRANCH_SOURCE_SIGNAL_CHANGE_RECHECK_NOT_ESTABLISHED');
    expect(report.exactB48BoundaryAccepted).toBe(false);
    expect(report.sourceEvidenceStateChangedSinceB48).toBe(false);
    expect(report.newPublishedSourceBodyCount).toBe(0);
    expect(report.newSourceEvidence).toBeNull();
    expect(report.branchAuthorityHoldActive).toBe(false);
    expect(report.controlCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE',
    );
  });
});
