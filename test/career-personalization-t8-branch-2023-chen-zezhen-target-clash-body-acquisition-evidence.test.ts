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
import { buildCareerPersonalizationT8PostB52GlobalResearchHoldReview } from '../src/research/career-personalization-t8-post-b52-global-research-hold-review.js';
import { buildCareerPersonalizationT8PostB52ResearchReopenTriggerActivationEvidence } from '../src/research/career-personalization-t8-post-b52-research-reopen-trigger-activation-evidence.js';
import {
  CAREER_PERSONALIZATION_T8_BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_EVIDENCE_VERSION,
  CAREER_T8_B55_CHEN_ZEZHEN_2023_PREVIEW_INSPECTION_EVIDENCE,
  CAREER_T8_B55_TARGET_ACQUISITION_CONTROL_IDS,
  buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionEvidence,
} from '../src/research/career-personalization-t8-branch-2023-chen-zezhen-target-clash-body-acquisition-evidence.js';

function acceptedB47(): CareerPersonalizationT8BranchTriggerGatedPostP0RemediationReviewReport {
  const material: Omit<CareerPersonalizationT8BranchTriggerGatedPostP0RemediationReviewReport, 'reviewId'> = {
    reviewVersion: CAREER_PERSONALIZATION_T8_BRANCH_TRIGGER_GATED_POST_P0_REMEDIATION_REVIEW_VERSION,
    status: 'RESOLVED_BRANCH_TRIGGER_GATED_POST_P0_REMEDIATION_REVIEW',
    decision: 'ONE_INFRASTRUCTURE_TRIGGER_CLOSED_TWO_AUTHORITY_TRIGGERS_OPEN_ZERO_SEMANTIC_LANES',
    upstreamB46ReviewId: 'b46_fixture_for_b55',
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

function acceptedB54() {
  const b48 = buildCareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidence(acceptedB47());
  const b49 = buildCareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidence(b48);
  const b50 = buildCareerPersonalizationT8Branch2016LuExactEditionBodyCompatibilityClosureEvidence(b49);
  const b51 = buildCareerPersonalizationT8Branch2015ShishenChanweiPublicationLineageAndExactBodyAcquisitionRecheckEvidence(b50);
  const b52 = buildCareerPersonalizationT8Branch2009XuBingxinExactEditionBodyCompatibilityClosureEvidence(b51);
  const b53 = buildCareerPersonalizationT8PostB52GlobalResearchHoldReview(b52);
  return buildCareerPersonalizationT8PostB52ResearchReopenTriggerActivationEvidence(b53);
}

describe('Career T8 Branch Chen Zezhen 2023 target clash-body acquisition evidence', () => {
  test('accepts exact B54 and records a blocked target-body acquisition outcome', () => {
    const report = buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionEvidence(acceptedB54());

    expect(report.evidenceVersion).toBe(
      CAREER_PERSONALIZATION_T8_BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_EVIDENCE_VERSION,
    );
    expect(report.status).toBe('RESOLVED_BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_EVIDENCE');
    expect(report.decision).toBe(
      'OFFICIAL_2023_PREVIEW_DIRECTLY_INSPECTED_TARGET_Q407_TO_Q422_ANSWER_BODY_NOT_ACQUIRED_INDEPENDENT_COMPLETE_PATH_NOT_ESTABLISHED_ZERO_AUTHORITY_TRIGGER_ACTIVATIONS',
    );
    expect(report.exactB54BoundaryAccepted).toBe(true);
    expect(report.targetedAcquisitionPerformed).toBe(true);
    expect(report.targetedAcquisitionLaneCompleted).toBe(true);
    expect(report.targetedAcquisitionOutcome).toBe(
      'BLOCKED_TARGET_BODY_NOT_PRESENT_ON_INSPECTED_PUBLISHER_LINKED_PREVIEW',
    );
  });

  test('binds the inspected publisher-linked preview surface and exact coverage range', () => {
    const report = buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionEvidence(acceptedB54());
    const preview = report.previewInspectionEvidence;

    expect(preview).toEqual(CAREER_T8_B55_CHEN_ZEZHEN_2023_PREVIEW_INSPECTION_EVIDENCE);
    expect(preview?.sourceIdentity).toContain('9786263640641');
    expect(preview?.inspectedSurface).toContain('9786263640641.pdf');
    expect(preview?.inspectedSurfaceClass).toBe('PUBLISHER_LINKED_FREE_READING_PDF');
    expect(preview?.inspectedPdfPageCount).toBe(12);
    expect(preview?.inspectedPrintedPageRange).toEqual({ start: 156, end: 166 });
    expect(preview?.inspectedQuestionRange).toEqual({ start: 147, end: 168 });
    expect(report.inspectedPreviewPageCount).toBe(12);
    expect(report.inspectedQuestionRangeBound).toBe(true);
    expect(report.inspectedPrintedPageRangeBound).toBe(true);
  });

  test('preserves direct Zhengguan semantic support and records configuration-sensitive context', () => {
    const report = buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionEvidence(acceptedB54());
    const preview = report.previewInspectionEvidence;

    expect(preview?.directZhengguanSemanticBodyObserved).toBe(true);
    expect(preview?.normalizedZhengguanSemanticObservations).toContain(
      'Zhengguan in the day branch is associated with deep responsibility and leadership/social-position expression.',
    );
    expect(preview?.directTenGodContextDependencyBodyObserved).toBe(true);
    expect(report.directZhengguanSemanticBodyPreserved).toBe(true);
    expect(report.directTenGodContextDependencyBodyObserved).toBe(true);
  });

  test('proves the inspected preview does not contain the Q407-Q422 target answer body', () => {
    const report = buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionEvidence(acceptedB54());
    const preview = report.previewInspectionEvidence;

    expect(preview?.targetQuestionRange).toEqual({ start: 407, end: 422 });
    expect(preview?.targetQ407ToQ422AnswerBodyPresentInInspectedPdf).toBe(false);
    expect(preview?.targetQ407ToQ422AnswerBodyDirectlyInspected).toBe(false);
    expect(preview?.targetClashMethodBodyAcquired).toBe(false);
    expect(report.targetQ407ToQ422AnswerBodyPresentInInspectedPreview).toBe(false);
    expect(report.targetQ407ToQ422AnswerBodyDirectlyInspected).toBe(false);
    expect(report.targetClashMethodBodyAcquired).toBe(false);
  });

  test('does not promote TOC or search surfaces into normative clash authority', () => {
    const report = buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionEvidence(acceptedB54());

    expect(report.targetQ407ToQ422LocatorPreserved).toBe(true);
    expect(report.tableOfContentsAsNormativeBodyAuthorized).toBe(false);
    expect(report.searchIndexAsNormativeBodyAuthorized).toBe(false);
    expect(report.sameSourceQualitativeModificationModeEstablished).toBe(false);
    expect(report.sameSourceExplicitLimitsAndContextEstablished).toBe(false);
  });

  test('keeps both Branch authority triggers unsatisfied and opens no authority or semantic lane', () => {
    const report = buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionEvidence(acceptedB54());

    expect(report.independentCompleteSingleSourcePathEstablished).toBe(false);
    expect(report.sourceSpecificDependencySeparabilityEstablished).toBe(false);
    expect(report.currentMethodCompatibilityEstablished).toBe(false);
    expect(report.branchSourceSpecificDependencySeparabilityOrCompletePathAuthorityTriggerSatisfied).toBe(false);
    expect(report.branchMethodSpecificInputContractAndUpstreamAuthorityTriggerSatisfied).toBe(false);
    expect(report.branchAuthorityTriggerActivationCount).toBe(0);
    expect(report.authorityResearchLaneReopenedCount).toBe(0);
    expect(report.immediatelyExecutableAuthorityAdmissionLaneCount).toBe(0);
    expect(report.immediatelyExecutableSemanticRuleLaneCount).toBe(0);
    expect(report.selectedImmediateNextLane).toBeNull();
  });

  test('completes the narrow acquisition lane without reopening broad or repeated search', () => {
    const report = buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionEvidence(acceptedB54());

    expect(report.futureExactSameEditionTargetBodyAcquisitionRemainsEligible).toBe(true);
    expect(report.broadBranchSourceSearchRestartAuthorized).toBe(false);
    expect(report.repeatSupportingPreviewSearchAuthorized).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.sourceMandatoryDependencyDroppingAuthorized).toBe(false);
    expect(report.effectClassFlatteningAuthorized).toBe(false);
    expect(report.recommendedNextGate).toBe('BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_HOLD_REVIEW');
  });

  test('preserves all six historical gaps and all production boundaries', () => {
    const report = buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionEvidence(acceptedB54());

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

  test('freezes B55 controls and records only preview inspection as a research effect', () => {
    const report = buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionEvidence(acceptedB54());

    expect(report.controlIds).toEqual(CAREER_T8_B55_TARGET_ACQUISITION_CONTROL_IDS);
    expect(report.controlCount).toBe(14);
    expect(report.controlsFrozen).toBe(true);
    expect(report.implementationEffects).toEqual({
      targetedAcquisitionAttemptsCompleted: 1,
      supportingPreviewBodiesInspected: 1,
      targetClashBodiesAcquired: 0,
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
    });
  });

  test('is deterministic for the exact same B54 boundary', () => {
    const first = buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionEvidence(acceptedB54());
    const second = buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionEvidence(acceptedB54());

    expect(first.evidenceId).toBe(second.evidenceId);
    expect(first).toEqual(second);
  });

  test('fails closed when the B54 content-addressed identity is tampered', () => {
    const b54 = acceptedB54();
    const tampered = { ...b54, evidenceId: `${b54.evidenceId}_tampered` };
    const report = buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionEvidence(tampered);

    expect(report.status).toBe('UPSTREAM_B54_BOUNDARY_INVALID');
    expect(report.decision).toBe('BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_NOT_ESTABLISHED');
    expect(report.exactB54BoundaryAccepted).toBe(false);
    expect(report.previewInspectionEvidence).toBeNull();
    expect(report.targetedAcquisitionPerformed).toBe(false);
    expect(report.targetedAcquisitionLaneCompleted).toBe(false);
    expect(report.targetedAcquisitionOutcome).toBe('NOT_EXECUTED');
    expect(report.futureExactSameEditionTargetBodyAcquisitionRemainsEligible).toBe(false);
    expect(report.controlCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
    expect(report.implementationEffects.targetedAcquisitionAttemptsCompleted).toBe(0);
    expect(report.implementationEffects.supportingPreviewBodiesInspected).toBe(0);
    expect(report.recommendedNextGate).toBe('BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_EVIDENCE');
  });
});
