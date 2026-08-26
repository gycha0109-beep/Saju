import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE_ADEQUACY_REVIEW_VERSION,
  CAREER_T8_B24_GAP_ASSESSMENTS,
  CAREER_T8_B24_TARGETED_EVIDENCE_ADEQUACY_CONTROL_IDS,
  type CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceAdequacyReviewReport,
} from '../src/research/career-personalization-t8-current-method-residual-authority-targeted-remediation-evidence-adequacy-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_CONTINUATION_READINESS_REVIEW_VERSION,
  CAREER_T8_B25_CONTINUATION_READINESS_CONTROL_IDS,
  CAREER_T8_B25_CONTINUATION_TASKS,
  buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationContinuationReadinessReview,
} from '../src/research/career-personalization-t8-current-method-residual-authority-targeted-remediation-continuation-readiness-review.js';

function acceptedB24(): CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceAdequacyReviewReport {
  const material: Omit<
    CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceAdequacyReviewReport,
    'reviewId'
  > = {
    reviewVersion:
      CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE_ADEQUACY_REVIEW_VERSION,
    status: 'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE_ADEQUACY_REVIEW',
    decision:
      'B23_FAMILY_RELATION_MATERIALLY_ADVANCED_BUT_ZERO_REQUIREMENTS_FULLY_SATISFIED_FOUR_ACTIVE_ONE_CONDITIONAL_ONE_DEFERRED_REMEDIATION_PATHS_REMAIN_NO_AUTHORITY_ADMISSION',
    upstreamB23EvidenceId: 'career_t8_b23_b25_fixture',
    exactB23BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    gapAssessments: CAREER_T8_B24_GAP_ASSESSMENTS,
    gapAssessmentCount: 6,
    gapsWithMaterialPartialCoverageCount: 3,
    gapsWithAnyLeadOrPartialCoverageCount: 5,
    fullySatisfiedGapCount: 0,
    allSixGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    familyRelationCoverageMateriallyAdvanced: true,
    familyRelationRemediationNarrowed: true,
    qinP464BodyAcquisitionStillRequired: true,
    branchClashSingleSourceT5BridgeStillRequired: true,
    positionVisibilityDimensionSpecificBridgeStillRequired: true,
    pluralityRemainsExcludedUnderI254: true,
    seasonalRemediationExecutableNow: false,
    conflictPolicyRemediationExecutableNow: false,
    activePrimaryRemediationPathCount: 4,
    conditionalRemediationPathCount: 1,
    packLevelDeferredRemediationPathCount: 1,
    b23EvidenceAdequateForContinuationPlanning: true,
    b23EvidenceAdequateForAuthorityAdmission: false,
    b23EvidenceAdequateForGapClosure: false,
    crossSourceRequirementStitchingAuthorized: false,
    relativeForceOrAutomaticPrecedenceAuthorized: false,
    methodologyChoiceMadeByThisGate: false,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: CAREER_T8_B24_TARGETED_EVIDENCE_ADEQUACY_CONTROL_IDS,
    controlCount: 12,
    controlsFrozen: true,
    implementationEffects: {
      adequacyAssessmentsCreated: 6,
      gapsMateriallyAdvancedSinceB21: 1,
      gapsFullySatisfied: 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      methodologyChoicesMade: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate:
      'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_CONTINUATION_READINESS_REVIEW',
  };

  return {
    reviewId: `career_t8_current_method_residual_authority_targeted_remediation_evidence_adequacy_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career T8 B25 targeted remediation continuation readiness', () => {
  test('accepts exact B24 and materializes exactly four continuation tasks', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationContinuationReadinessReview(
      acceptedB24(),
    );

    expect(report.reviewVersion).toBe(
      CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_CONTINUATION_READINESS_REVIEW_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_CONTINUATION_READINESS',
    );
    expect(report.decision).toBe(
      'FOUR_ACTIVE_PATHS_TRACKED_ONLY_QIANLI_P49_CONTEXT_EXECUTABLE_THREE_PATHS_WAIT_FOR_NEW_EVIDENCE_SURFACES_SEASON_VISIBILITY_PLURALITY_UNCONSUMED_CONFLICT_DEFERRED_NO_AUTHORITY_ADMISSION',
    );
    expect(report.tasks).toEqual(CAREER_T8_B25_CONTINUATION_TASKS);
    expect(report.taskCount).toBe(4);
  });

  test('marks only the Qianli p49 primary-context follow-up immediately executable', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationContinuationReadinessReview(
      acceptedB24(),
    );
    const executable = report.tasks.filter((task) => task.immediatelyExecutable);

    expect(report.immediatelyExecutableTaskCount).toBe(1);
    expect(report.evidenceSurfaceBlockedTaskCount).toBe(3);
    expect(report.onlyFamilyPrimaryContextExecutableNow).toBe(true);
    expect(executable).toHaveLength(1);
    expect(executable[0]?.taskId).toBe('QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_CONTINUATION');
    expect(executable[0]?.status).toBe('EXECUTABLE_NEXT_GATE_EXISTING_PRIMARY_CONTEXT');
  });

  test('requires a genuinely new Qin body-access surface rather than repeating TOC discovery', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationContinuationReadinessReview(
      acceptedB24(),
    );
    const qin = report.tasks.find((task) => task.taskId === 'QIN_P464_BODY_ACCESS_CONTINUATION');

    expect(qin?.status).toBe('WAITING_NEW_BODY_ACCESS_SURFACE');
    expect(qin?.currentEvidenceSurfaceSufficientToExecute).toBe(false);
    expect(qin?.executionTrigger).toContain('genuinely new body-access surface');
    expect(qin?.executionTrigger).toContain('TOC heading is not a trigger');
    expect(report.qinWaitingForNewBodyAccessSurface).toBe(true);
  });

  test('requires a genuinely new single-source branch-clash current-T5 bridge candidate', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationContinuationReadinessReview(
      acceptedB24(),
    );
    const clash = report.tasks.find(
      (task) => task.taskId === 'BRANCH_CLASH_SINGLE_SOURCE_CURRENT_T5_BRIDGE_CONTINUATION',
    );

    expect(clash?.status).toBe('WAITING_NEW_SINGLE_SOURCE_CANDIDATE');
    expect(clash?.currentEvidenceSurfaceSufficientToExecute).toBe(false);
    expect(clash?.executionTrigger).toContain('Xu plus Qianli may not be stitched');
    expect(report.branchClashWaitingForNewSingleSourceCandidate).toBe(true);
  });

  test('narrows the dimension path to position while visibility and plurality remain unconsumed', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationContinuationReadinessReview(
      acceptedB24(),
    );
    const position = report.tasks.find((task) => task.taskId === 'POSITION_CURRENT_T5_BRIDGE_CONTINUATION');

    expect(position?.status).toBe('WAITING_NEW_POSITION_T5_BRIDGE_VISIBILITY_PLURALITY_UNCONSUMED');
    expect(position?.objective).toContain('Visibility and plurality are not consumed');
    expect(report.positionWaitingForNewSpecificT5Bridge).toBe(true);
    expect(report.visibilityConsumedByCurrentContinuation).toBe(false);
    expect(report.pluralityConsumedByCurrentContinuation).toBe(false);
    expect(report.pluralityHeldUnderI254).toBe(true);
  });

  test('keeps seasonal unconsumed and conflict policy deferred', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationContinuationReadinessReview(
      acceptedB24(),
    );

    expect(report.seasonalConsumedByCurrentContinuation).toBe(false);
    expect(report.seasonalConditionalRemediationActivated).toBe(false);
    expect(report.conflictPolicyRemediationActivated).toBe(false);
  });

  test('forbids broad restart, repeated negative search, and cross-source stitching for every continuation task', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationContinuationReadinessReview(
      acceptedB24(),
    );

    expect(report.broadSearchRestartAuthorized).toBe(false);
    expect(report.repeatedNegativeSearchAuthorized).toBe(false);
    expect(report.crossSourceRequirementStitchingAuthorized).toBe(false);
    for (const task of report.tasks) {
      expect(task.broadSearchAuthorized).toBe(false);
      expect(task.repeatPreviouslyNegativeSearchWithoutNewSurfaceAuthorized).toBe(false);
      expect(task.crossSourceStitchingAuthorized).toBe(false);
    }
  });

  test('preserves four historical active paths while distinguishing executable readiness from tracking status', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationContinuationReadinessReview(
      acceptedB24(),
    );

    expect(report.activePrimaryRemediationPathCountPreserved).toBe(4);
    expect(report.immediatelyExecutableTaskCount).toBe(1);
    expect(report.evidenceSurfaceBlockedTaskCount).toBe(3);
  });

  test('keeps all six historical authority gaps open and creates no T8 or production artifacts', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationContinuationReadinessReview(
      acceptedB24(),
    );

    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.continuationExecutionAutomaticallyAdmitsAuthority).toBe(false);
    expect(report.continuationExecutionAutomaticallyClosesGap).toBe(false);
    expect(report.methodologyScopeExpandedByThisGate).toBe(false);
    expect(report.authorityAdmittedByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
  });

  test('records three dimensions as explicitly unconsumed for current continuation', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationContinuationReadinessReview(
      acceptedB24(),
    );

    expect(report.implementationEffects.dimensionsExplicitlyUnconsumedForCurrentContinuation).toBe(3);
    expect(report.visibilityConsumedByCurrentContinuation).toBe(false);
    expect(report.pluralityConsumedByCurrentContinuation).toBe(false);
    expect(report.seasonalConsumedByCurrentContinuation).toBe(false);
  });

  test('freezes controls and routes specifically to Qianli p49 primary-context evidence', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationContinuationReadinessReview(
      acceptedB24(),
    );

    expect(report.controlIds).toEqual(CAREER_T8_B25_CONTINUATION_READINESS_CONTROL_IDS);
    expect(report.controlCount).toBe(12);
    expect(report.controlsFrozen).toBe(true);
    expect(report.recommendedNextGate).toBe('QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_EVIDENCE');
  });

  test('is deterministic for the same exact B24 boundary', () => {
    const first = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationContinuationReadinessReview(
      acceptedB24(),
    );
    const second = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationContinuationReadinessReview(
      acceptedB24(),
    );

    expect(first.reviewId).toBe(second.reviewId);
    expect(first).toEqual(second);
  });

  test('fails closed when the B24 content-addressed identity is tampered', () => {
    const b24 = acceptedB24();
    const tampered: CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceAdequacyReviewReport = {
      ...b24,
      reviewId: `${b24.reviewId}_tampered`,
    };

    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationContinuationReadinessReview(
      tampered,
    );

    expect(report.status).toBe('UPSTREAM_B24_BOUNDARY_INVALID');
    expect(report.decision).toBe('TARGETED_REMEDIATION_CONTINUATION_READINESS_NOT_ESTABLISHED');
    expect(report.exactB24BoundaryAccepted).toBe(false);
    expect(report.taskCount).toBe(0);
    expect(report.tasks).toEqual([]);
    expect(report.immediatelyExecutableTaskCount).toBe(0);
    expect(report.evidenceSurfaceBlockedTaskCount).toBe(0);
    expect(report.activePrimaryRemediationPathCountPreserved).toBe(0);
    expect(report.onlyFamilyPrimaryContextExecutableNow).toBe(false);
    expect(report.qinWaitingForNewBodyAccessSurface).toBe(false);
    expect(report.branchClashWaitingForNewSingleSourceCandidate).toBe(false);
    expect(report.positionWaitingForNewSpecificT5Bridge).toBe(false);
    expect(report.pluralityHeldUnderI254).toBe(false);
    expect(report.controlCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_CONTINUATION_READINESS_REVIEW',
    );
  });
});
