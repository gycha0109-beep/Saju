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
import { buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionEvidence } from '../src/research/career-personalization-t8-branch-2023-chen-zezhen-target-clash-body-acquisition-evidence.js';
import {
  CAREER_PERSONALIZATION_T8_BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_HOLD_REVIEW_VERSION,
  CAREER_T8_B56_CHEN_ZEZHEN_TARGET_BODY_REOPEN_TRIGGERS,
  CAREER_T8_B56_TARGET_BODY_HOLD_CONTROL_IDS,
  buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionHoldReview,
} from '../src/research/career-personalization-t8-branch-2023-chen-zezhen-target-clash-body-acquisition-hold-review.js';

function acceptedB47(): CareerPersonalizationT8BranchTriggerGatedPostP0RemediationReviewReport {
  const material: Omit<CareerPersonalizationT8BranchTriggerGatedPostP0RemediationReviewReport, 'reviewId'> = {
    reviewVersion: CAREER_PERSONALIZATION_T8_BRANCH_TRIGGER_GATED_POST_P0_REMEDIATION_REVIEW_VERSION,
    status: 'RESOLVED_BRANCH_TRIGGER_GATED_POST_P0_REMEDIATION_REVIEW',
    decision: 'ONE_INFRASTRUCTURE_TRIGGER_CLOSED_TWO_AUTHORITY_TRIGGERS_OPEN_ZERO_SEMANTIC_LANES',
    upstreamB46ReviewId: 'b46_fixture_for_b56',
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

function acceptedB55() {
  const b48 = buildCareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidence(acceptedB47());
  const b49 = buildCareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidence(b48);
  const b50 = buildCareerPersonalizationT8Branch2016LuExactEditionBodyCompatibilityClosureEvidence(b49);
  const b51 = buildCareerPersonalizationT8Branch2015ShishenChanweiPublicationLineageAndExactBodyAcquisitionRecheckEvidence(b50);
  const b52 = buildCareerPersonalizationT8Branch2009XuBingxinExactEditionBodyCompatibilityClosureEvidence(b51);
  const b53 = buildCareerPersonalizationT8PostB52GlobalResearchHoldReview(b52);
  const b54 = buildCareerPersonalizationT8PostB52ResearchReopenTriggerActivationEvidence(b53);
  return buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionEvidence(b54);
}

describe('Career T8 Branch Chen Zezhen 2023 target-body acquisition hold review', () => {
  test('accepts exact B55 and freezes a zero-trigger target-body hold', () => {
    const report = buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionHoldReview(acceptedB55());

    expect(report.reviewVersion).toBe(
      CAREER_PERSONALIZATION_T8_BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_HOLD_REVIEW_VERSION,
    );
    expect(report.status).toBe('RESOLVED_BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_HOLD_REVIEW');
    expect(report.decision).toBe(
      'CHEN_ZEZHEN_2023_TARGET_BODY_ACQUISITION_HOLD_ZERO_REOPEN_TRIGGERS_SATISFIED_RESUME_ONLY_ON_EXACT_TARGET_BODY_CHANGE',
    );
    expect(report.exactB55BoundaryAccepted).toBe(true);
    expect(report.targetBodyAcquisitionHoldActive).toBe(true);
    expect(report.b55TargetedAcquisitionCompleted).toBe(true);
    expect(report.b55TargetBodyAcquired).toBe(false);
  });

  test('freezes two explicit same-edition target-body reopen triggers', () => {
    const report = buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionHoldReview(acceptedB55());

    expect(report.reopenTriggers).toEqual(CAREER_T8_B56_CHEN_ZEZHEN_TARGET_BODY_REOPEN_TRIGGERS);
    expect(report.reopenTriggerCount).toBe(2);
    expect(report.satisfiedReopenTriggerCount).toBe(0);
    expect(report.reopenTriggers[0]?.triggerId).toBe('CHEN_ZEZHEN_2023_DIRECT_Q407_TO_Q422_BODY_AVAILABLE');
    expect(report.reopenTriggers[1]?.triggerId).toBe(
      'CHEN_ZEZHEN_2023_EQUIVALENT_EXACT_SAME_EDITION_TARGET_WITNESS_AVAILABLE',
    );
    expect(report.exactSameEditionTargetBodyChangeRequiredForReopen).toBe(true);
  });

  test('preserves the supporting preview and Q407-Q422 locator without upgrading either to target body', () => {
    const report = buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionHoldReview(acceptedB55());

    expect(report.supportingPreviewBodyPreserved).toBe(true);
    expect(report.targetQ407ToQ422LocatorPreserved).toBe(true);
    expect(report.immediatelyExecutableTargetAcquisitionLaneCount).toBe(0);
    expect(report.selectedImmediateNextLane).toBeNull();
  });

  test('prohibits repeated unchanged preview TOC catalog and search-index research', () => {
    const report = buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionHoldReview(acceptedB55());

    expect(report.repeatSamePreviewSearchAuthorized).toBe(false);
    expect(report.repeatTocSearchAuthorized).toBe(false);
    expect(report.repeatCatalogSearchAuthorized).toBe(false);
    expect(report.repeatSearchIndexSearchAuthorized).toBe(false);
    expect(report.broadBranchSourceSearchRestartAuthorized).toBe(false);
  });

  test('keeps trigger activation separate from later complete-path and authority adjudication', () => {
    const report = buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionHoldReview(acceptedB55());

    expect(report.triggerActivationAutomaticallyEstablishesCompletePath).toBe(false);
    expect(report.triggerActivationAutomaticallyAdmitsAuthority).toBe(false);
    expect(report.branchSourceSpecificDependencySeparabilityOrCompletePathAuthorityTriggerSatisfied).toBe(false);
    expect(report.branchMethodSpecificInputContractAndUpstreamAuthorityTriggerSatisfied).toBe(false);
    expect(report.branchAuthorityTriggerActivationCount).toBe(0);
    expect(report.immediatelyExecutableAuthorityResearchLaneCount).toBe(0);
    expect(report.immediatelyExecutableAuthorityAdmissionLaneCount).toBe(0);
    expect(report.immediatelyExecutableSemanticRuleLaneCount).toBe(0);
  });

  test('forbids stitching dependency dropping and effect flattening', () => {
    const report = buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionHoldReview(acceptedB55());

    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.sourceMandatoryDependencyDroppingAuthorized).toBe(false);
    expect(report.effectClassFlatteningAuthorized).toBe(false);
  });

  test('preserves all six historical gaps and production boundaries', () => {
    const report = buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionHoldReview(acceptedB55());

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

  test('records a hold-only implementation effect and the conditional next gate', () => {
    const report = buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionHoldReview(acceptedB55());

    expect(report.controlIds).toEqual(CAREER_T8_B56_TARGET_BODY_HOLD_CONTROL_IDS);
    expect(report.controlCount).toBe(12);
    expect(report.controlsFrozen).toBe(true);
    expect(report.implementationEffects).toEqual({
      holdReviewsCreated: 1,
      targetBodiesAcquired: 0,
      targetAcquisitionLanesOpened: 0,
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
    expect(report.recommendedNextGate).toBe('BRANCH_2023_CHEN_ZEZHEN_TARGET_BODY_REOPEN_TRIGGER_ACTIVATION_EVIDENCE');
  });

  test('is deterministic for the exact same B55 boundary', () => {
    const first = buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionHoldReview(acceptedB55());
    const second = buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionHoldReview(acceptedB55());

    expect(first.reviewId).toBe(second.reviewId);
    expect(first).toEqual(second);
  });

  test('fails closed when the B55 content-addressed identity is tampered', () => {
    const b55 = acceptedB55();
    const tampered = { ...b55, evidenceId: `${b55.evidenceId}_tampered` };
    const report = buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionHoldReview(tampered);

    expect(report.status).toBe('UPSTREAM_B55_BOUNDARY_INVALID');
    expect(report.decision).toBe('BRANCH_2023_CHEN_ZEZHEN_TARGET_BODY_HOLD_NOT_ESTABLISHED');
    expect(report.exactB55BoundaryAccepted).toBe(false);
    expect(report.targetBodyAcquisitionHoldActive).toBe(false);
    expect(report.reopenTriggerCount).toBe(0);
    expect(report.exactSameEditionTargetBodyChangeRequiredForReopen).toBe(false);
    expect(report.controlCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
    expect(report.implementationEffects.holdReviewsCreated).toBe(0);
    expect(report.recommendedNextGate).toBe('BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_HOLD_REVIEW');
  });
});
