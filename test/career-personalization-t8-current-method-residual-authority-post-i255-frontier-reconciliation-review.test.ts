import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  I256_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_REVIEW_CONTROL_IDS,
  I256_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_REVIEW_VERSION,
  I256_QIANLI_P49_FAMILY_RESIDUAL_CHECK_ASSESSMENTS,
  type I256QianliP49FamilyRelationPrimaryContextAdequacyReviewReport,
} from '../src/research/i256-qianli-p49-family-relation-primary-context-adequacy-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_POST_I255_FRONTIER_RECONCILIATION_REVIEW_VERSION,
  CAREER_T8_B26_POST_I255_FRONTIER_RECONCILIATION_CONTROL_IDS,
  CAREER_T8_B26_POST_I255_FRONTIER_TASKS,
  buildCareerPersonalizationT8CurrentMethodResidualAuthorityPostI255FrontierReconciliationReview,
} from '../src/research/career-personalization-t8-current-method-residual-authority-post-i255-frontier-reconciliation-review.js';

function acceptedI256(): I256QianliP49FamilyRelationPrimaryContextAdequacyReviewReport {
  const material: Omit<I256QianliP49FamilyRelationPrimaryContextAdequacyReviewReport, 'reviewId'> = {
    reviewVersion: I256_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_REVIEW_VERSION,
    status: 'RESOLVED_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_REVIEW',
    decision:
      'I255_SATISFIES_STRUCTURE_EFFECT_DISTINCTION_ONLY_TWO_FAMILY_REQUIREMENTS_REMAIN_NEW_EVIDENCE_SURFACE_REQUIRED_NO_AUTHORITY_ADMISSION',
    upstreamI255EvidenceId: 'i255_b26_fixture',
    exactI255BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    familyRelationCoverageClass: 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE',
    familyRequirementCheckCount: 3,
    satisfiedFamilyRequirementCheckCount: 1,
    remainingFamilyRequirementCheckCount: 2,
    structureVersusSemanticEffectDistinctionSatisfied: true,
    residualCheckAssessments: I256_QIANLI_P49_FAMILY_RESIDUAL_CHECK_ASSESSMENTS,
    residualCheckAssessmentCount: 2,
    explicitRelationSpecificLimitsOrExceptionsSatisfied: false,
    currentMethodCompatibilitySatisfied: false,
    p49SourceLocalInspectionAdequateForOneRequirement: true,
    p49SourceLocalInspectionAdequateForFullFamilyRequirement: false,
    sameP49ReinspectionWithoutNewContextAuthorized: false,
    familyPathImmediatelyExecutableNow: false,
    familyPathWaitingForNewEvidenceSurface: true,
    requiredNewEvidenceSurfaces: [
      'RELATION_SPECIFIC_LIMIT_OR_EXCEPTION_CONTEXT',
      'CURRENT_METHOD_COMPATIBILITY_CONTEXT_OR_INDEPENDENT_COMPATIBLE_SOURCE',
    ],
    accessMirrorProvenancePromoted: false,
    crossSectionDisclaimerTransferAuthorized: false,
    historicalOccupationModernizationAuthorized: false,
    authorityAdmissionReady: false,
    gapClosureReady: false,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    methodologyScopeExpandedByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: I256_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_REVIEW_CONTROL_IDS,
    controlCount: 12,
    controlsFrozen: true,
    implementationEffects: {
      adequacyReviewsCreated: 1,
      familyRequirementChecksSatisfied: 1,
      familyRequirementChecksRemaining: 2,
      immediatelyExecutableFamilyTasks: 0,
      familyTasksWaitingForNewEvidenceSurface: 1,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate:
      'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_POST_I255_FRONTIER_RECONCILIATION_REVIEW',
  };

  return {
    reviewId: `i256_qianli_p49_family_relation_primary_context_adequacy_review_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career T8 B26 post-I255 residual authority frontier reconciliation', () => {
  test('accepts exact I256 and resolves the frontier', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityPostI255FrontierReconciliationReview(
      acceptedI256(),
    );

    expect(report.reviewVersion).toBe(
      CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_POST_I255_FRONTIER_RECONCILIATION_REVIEW_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_POST_I255_FRONTIER_RECONCILIATION',
    );
    expect(report.decision).toBe(
      'FOUR_ACTIVE_PATHS_RECONCILED_ZERO_IMMEDIATE_FOUR_WAIT_FOR_NEW_EVIDENCE_SURFACES_UNCONSUMED_DIMENSIONS_PRESERVED_NO_AUTHORITY_ADMISSION',
    );
    expect(report.exactI256BoundaryAccepted).toBe(true);
  });

  test('represents the four historical active paths exactly once', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityPostI255FrontierReconciliationReview(
      acceptedI256(),
    );

    expect(report.tasks).toEqual(CAREER_T8_B26_POST_I255_FRONTIER_TASKS);
    expect(report.taskCount).toBe(4);
    expect(report.allHistoricallyActivePathsRepresentedExactlyOnce).toBe(true);
  });

  test('sets the active frontier to zero immediate and four waiting', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityPostI255FrontierReconciliationReview(
      acceptedI256(),
    );

    expect(report.immediatelyExecutableTaskCount).toBe(0);
    expect(report.waitingForNewEvidenceSurfaceTaskCount).toBe(4);
    expect(report.tasks.every((task) => task.immediatelyExecutable === false)).toBe(true);
  });

  test('freezes Qin to genuinely new p464 body access rather than repeated TOC discovery', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityPostI255FrontierReconciliationReview(
      acceptedI256(),
    );
    const task = report.tasks.find((item) => item.taskId === 'QIN_P464_BODY_SURFACE');

    expect(report.qinWaitingForNewBodySurface).toBe(true);
    expect(task?.requiredNewEvidenceSurface).toContain('p.464 section body');
    expect(task?.repeatedPriorSurfaceSearchAuthorized).toBe(false);
  });

  test('moves family into new-surface wait after I256 exhausts the same p49 surface', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityPostI255FrontierReconciliationReview(
      acceptedI256(),
    );
    const task = report.tasks.find((item) => item.taskId === 'FAMILY_RELATION_LIMITS_AND_COMPATIBILITY_SURFACE');

    expect(report.familyWaitingForNewLimitsOrCompatibilitySurface).toBe(true);
    expect(task?.requiredNewEvidenceSurface).toContain('limits/exceptions');
    expect(task?.requiredNewEvidenceSurface).toContain('current-method compatibility');
  });

  test('keeps branch clash and position waiting for genuinely new current-T5 bridges', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityPostI255FrontierReconciliationReview(
      acceptedI256(),
    );

    expect(report.branchClashWaitingForNewSingleSourceT5Bridge).toBe(true);
    expect(report.positionWaitingForNewSpecificT5Bridge).toBe(true);
  });

  test('keeps visibility plurality and seasonal dimensions unconsumed', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityPostI255FrontierReconciliationReview(
      acceptedI256(),
    );

    expect(report.visibilityConsumedByCurrentContinuation).toBe(false);
    expect(report.pluralityConsumedByCurrentContinuation).toBe(false);
    expect(report.pluralityHeldUnderI254).toBe(true);
    expect(report.seasonalConsumedByCurrentContinuation).toBe(false);
    expect(report.seasonalConditionalRemediationActivated).toBe(false);
  });

  test('keeps conflict policy deferred and blocks repeated prior-surface search or stitching', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityPostI255FrontierReconciliationReview(
      acceptedI256(),
    );

    expect(report.conflictPolicyRemediationActivated).toBe(false);
    expect(report.broadDiscoveryRestartAuthorizedByThisGate).toBe(false);
    expect(report.repeatedPriorSurfaceSearchAuthorized).toBe(false);
    expect(report.crossSourceRequirementStitchingAuthorized).toBe(false);
  });

  test('requires a later readiness review before acquiring new evidence surfaces', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityPostI255FrontierReconciliationReview(
      acceptedI256(),
    );

    expect(report.newEvidenceSurfaceAcquisitionPerformedByThisGate).toBe(false);
    expect(report.newEvidenceSurfaceAcquisitionNeedsReadinessReview).toBe(true);
    expect(report.successfulNewSurfaceAcquisitionAutomaticallyAdmitsAuthority).toBe(false);
    expect(report.successfulNewSurfaceAcquisitionAutomaticallyClosesGap).toBe(false);
  });

  test('keeps all six historical gaps open with no T8 or production artifacts', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityPostI255FrontierReconciliationReview(
      acceptedI256(),
    );

    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
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

  test('freezes controls and routes to new-evidence-surface acquisition readiness', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityPostI255FrontierReconciliationReview(
      acceptedI256(),
    );

    expect(report.controlIds).toEqual(CAREER_T8_B26_POST_I255_FRONTIER_RECONCILIATION_CONTROL_IDS);
    expect(report.controlCount).toBe(12);
    expect(report.controlsFrozen).toBe(true);
    expect(report.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_READINESS_REVIEW',
    );
  });

  test('is deterministic for the same exact I256 boundary', () => {
    const first = buildCareerPersonalizationT8CurrentMethodResidualAuthorityPostI255FrontierReconciliationReview(
      acceptedI256(),
    );
    const second = buildCareerPersonalizationT8CurrentMethodResidualAuthorityPostI255FrontierReconciliationReview(
      acceptedI256(),
    );

    expect(first.reviewId).toBe(second.reviewId);
    expect(first).toEqual(second);
  });

  test('fails closed when the I256 content-addressed identity is tampered', () => {
    const i256 = acceptedI256();
    const tampered: I256QianliP49FamilyRelationPrimaryContextAdequacyReviewReport = {
      ...i256,
      reviewId: `${i256.reviewId}_tampered`,
    };

    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityPostI255FrontierReconciliationReview(
      tampered,
    );

    expect(report.status).toBe('UPSTREAM_I256_BOUNDARY_INVALID');
    expect(report.decision).toBe('POST_I255_RESIDUAL_AUTHORITY_FRONTIER_NOT_RECONCILED');
    expect(report.exactI256BoundaryAccepted).toBe(false);
    expect(report.tasks).toEqual([]);
    expect(report.taskCount).toBe(0);
    expect(report.waitingForNewEvidenceSurfaceTaskCount).toBe(0);
    expect(report.newEvidenceSurfaceAcquisitionNeedsReadinessReview).toBe(false);
    expect(report.controlCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
  });
});
