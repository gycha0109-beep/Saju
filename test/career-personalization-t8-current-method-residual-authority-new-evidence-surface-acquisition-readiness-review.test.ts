import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_POST_I255_FRONTIER_RECONCILIATION_REVIEW_VERSION,
  CAREER_T8_B26_POST_I255_FRONTIER_RECONCILIATION_CONTROL_IDS,
  CAREER_T8_B26_POST_I255_FRONTIER_TASKS,
  type CareerPersonalizationT8CurrentMethodResidualAuthorityPostI255FrontierReconciliationReviewReport,
} from '../src/research/career-personalization-t8-current-method-residual-authority-post-i255-frontier-reconciliation-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_READINESS_REVIEW_VERSION,
  CAREER_T8_B27_NEW_SURFACE_ACQUISITION_CONTRACTS,
  CAREER_T8_B27_NEW_SURFACE_ACQUISITION_READINESS_CONTROL_IDS,
  buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionReadinessReview,
} from '../src/research/career-personalization-t8-current-method-residual-authority-new-evidence-surface-acquisition-readiness-review.js';

function acceptedB26(): CareerPersonalizationT8CurrentMethodResidualAuthorityPostI255FrontierReconciliationReviewReport {
  const material: Omit<
    CareerPersonalizationT8CurrentMethodResidualAuthorityPostI255FrontierReconciliationReviewReport,
    'reviewId'
  > = {
    reviewVersion:
      CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_POST_I255_FRONTIER_RECONCILIATION_REVIEW_VERSION,
    status: 'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_POST_I255_FRONTIER_RECONCILIATION',
    decision:
      'FOUR_ACTIVE_PATHS_RECONCILED_ZERO_IMMEDIATE_FOUR_WAIT_FOR_NEW_EVIDENCE_SURFACES_UNCONSUMED_DIMENSIONS_PRESERVED_NO_AUTHORITY_ADMISSION',
    upstreamI256ReviewId: 'i256_b27_fixture',
    exactI256BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    tasks: CAREER_T8_B26_POST_I255_FRONTIER_TASKS,
    taskCount: 4,
    immediatelyExecutableTaskCount: 0,
    waitingForNewEvidenceSurfaceTaskCount: 4,
    allHistoricallyActivePathsRepresentedExactlyOnce: true,
    qinWaitingForNewBodySurface: true,
    familyWaitingForNewLimitsOrCompatibilitySurface: true,
    branchClashWaitingForNewSingleSourceT5Bridge: true,
    positionWaitingForNewSpecificT5Bridge: true,
    visibilityConsumedByCurrentContinuation: false,
    pluralityConsumedByCurrentContinuation: false,
    pluralityHeldUnderI254: true,
    seasonalConsumedByCurrentContinuation: false,
    seasonalConditionalRemediationActivated: false,
    conflictPolicyRemediationActivated: false,
    broadDiscoveryRestartAuthorizedByThisGate: false,
    repeatedPriorSurfaceSearchAuthorized: false,
    crossSourceRequirementStitchingAuthorized: false,
    newEvidenceSurfaceAcquisitionPerformedByThisGate: false,
    newEvidenceSurfaceAcquisitionNeedsReadinessReview: true,
    successfulNewSurfaceAcquisitionAutomaticallyAdmitsAuthority: false,
    successfulNewSurfaceAcquisitionAutomaticallyClosesGap: false,
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
    controlIds: CAREER_T8_B26_POST_I255_FRONTIER_RECONCILIATION_CONTROL_IDS,
    controlCount: 12,
    controlsFrozen: true,
    implementationEffects: {
      frontierTasksReconciled: 4,
      immediatelyExecutableTasks: 0,
      tasksWaitingForNewEvidenceSurface: 4,
      newSourceAcquisitionsPerformed: 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate:
      'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_READINESS_REVIEW',
  };

  return {
    reviewId: `career_t8_current_method_residual_authority_post_i255_frontier_reconciliation_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career T8 B27 new evidence surface acquisition readiness', () => {
  test('accepts exact B26 and resolves four bounded acquisition lanes', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionReadinessReview(
      acceptedB26(),
    );
    expect(report.reviewVersion).toBe(
      CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_READINESS_REVIEW_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_READINESS',
    );
    expect(report.decision).toBe('FOUR_BOUNDED_NEW_SURFACE_ACQUISITION_LANES_READY_NO_BROAD_RESTART_NO_AUTHORITY_ADMISSION');
    expect(report.exactB26BoundaryAccepted).toBe(true);
  });

  test('represents all four B26 waiting paths exactly once', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionReadinessReview(
      acceptedB26(),
    );
    expect(report.contracts).toEqual(CAREER_T8_B27_NEW_SURFACE_ACQUISITION_CONTRACTS);
    expect(report.contractCount).toBe(4);
    expect(report.executableNewSurfaceAcquisitionLaneCount).toBe(4);
    expect(report.allB26WaitingPathsRepresentedExactlyOnce).toBe(true);
  });

  test('authorizes targeted new-surface acquisition without broad restart', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionReadinessReview(
      acceptedB26(),
    );
    expect(report.targetedNewSurfaceAcquisitionAuthorizedForNextGate).toBe(true);
    expect(report.broadDiscoveryRestartAuthorized).toBe(false);
    expect(report.repeatedPriorSurfaceSearchAuthorized).toBe(false);
    expect(report.crossSourceRequirementStitchingAuthorized).toBe(false);
  });

  test('freezes Qin to direct p464 body and rejects repeated TOC metadata', () => {
    const contract = CAREER_T8_B27_NEW_SURFACE_ACQUISITION_CONTRACTS.find(
      (item) => item.laneId === 'QIN_P464_DIRECT_BODY_NEW_SURFACE_ACQUISITION',
    );
    expect(contract?.exactEvidenceObjective).toContain('9787204098774');
    expect(contract?.exactEvidenceObjective).toContain('p.464');
    expect(contract?.rejectedAsNoProgress).toContain('REPEATED_TOC_HEADING');
    expect(contract?.rejectedAsNoProgress).toContain('REPEATED_ISBN_OR_CATALOG_METADATA');
  });

  test('freezes family to limits and compatibility rather than repeated p49 inspection', () => {
    const contract = CAREER_T8_B27_NEW_SURFACE_ACQUISITION_CONTRACTS.find(
      (item) => item.laneId === 'FAMILY_RELATION_LIMITS_COMPATIBILITY_NEW_SURFACE_ACQUISITION',
    );
    expect(contract?.requiredChecks).toContain('RELATION_SPECIFIC_CAREER_LIMIT_OR_EXCEPTION');
    expect(contract?.requiredChecks).toContain('CURRENT_METHOD_COMPATIBILITY');
    expect(contract?.rejectedAsNoProgress).toContain('REPEATED_QIANLI_P49_SAME_PAGE_INSPECTION');
  });

  test('requires one natal single-source branch-clash to current-T5 bridge', () => {
    const contract = CAREER_T8_B27_NEW_SURFACE_ACQUISITION_CONTRACTS.find(
      (item) => item.laneId === 'BRANCH_CLASH_SINGLE_SOURCE_CURRENT_T5_NEW_SURFACE_ACQUISITION',
    );
    expect(contract?.requiredChecks).toContain('NATAL_SCOPE');
    expect(contract?.requiredChecks).toContain('SPECIFIC_CURRENT_T5_CAREER_SEMANTIC_MODIFIER_BINDING');
    expect(contract?.rejectedAsNoProgress).toContain('QIANLI_XU_CROSS_SOURCE_STITCHING');
    expect(contract?.rejectedAsNoProgress).toContain('TEMPORAL_LUCK_CYCLE_ONLY_EXAMPLE_OUTSIDE_NATAL_SCOPE');
  });

  test('keeps the position lane separate from visibility plurality and seasonal', () => {
    const contract = CAREER_T8_B27_NEW_SURFACE_ACQUISITION_CONTRACTS.find(
      (item) => item.laneId === 'POSITION_SPECIFIC_CURRENT_T5_NEW_SURFACE_ACQUISITION',
    );
    expect(contract?.requiredChecks).toContain('POSITION_CAREER_BINDING');
    expect(contract?.requiredChecks).toContain('VISIBILITY_PLURALITY_SEASONAL_NOT_CONSUMED');
    expect(contract?.rejectedAsNoProgress).toContain('POSITION_VISIBILITY_OR_PLURALITY_SUBSTITUTION');
  });

  test('keeps snippets as discovery leads only', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionReadinessReview(
      acceptedB26(),
    );
    expect(report.searchSnippetMayCountAsAuthorityEvidence).toBe(false);
    for (const contract of report.contracts) {
      expect(contract.searchSnippetMayCountAsAuthorityEvidence).toBe(false);
    }
  });

  test('does not consume held or conditional dimensions', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionReadinessReview(
      acceptedB26(),
    );
    expect(report.visibilityConsumedByPositionLane).toBe(false);
    expect(report.pluralityConsumedByPositionLane).toBe(false);
    expect(report.seasonalConsumedByPositionLane).toBe(false);
    expect(report.pluralityHoldReclassified).toBe(false);
    expect(report.seasonalConditionalRemediationActivated).toBe(false);
    expect(report.conflictPolicyRemediationActivated).toBe(false);
  });

  test('requires later adequacy and admission review after any acquisition', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionReadinessReview(
      acceptedB26(),
    );
    expect(report.successfulAcquisitionRequiresLaterAdequacyReview).toBe(true);
    expect(report.successfulAcquisitionRequiresLaterAuthorityAdmissionReview).toBe(true);
    expect(report.newSurfaceAcquisitionPerformedByThisGate).toBe(false);
    for (const contract of report.contracts) {
      expect(contract.successfulAcquisitionAutomaticallyAdmitsAuthority).toBe(false);
      expect(contract.successfulAcquisitionAutomaticallyClosesGap).toBe(false);
      expect(contract.successfulAcquisitionAutomaticallyAuthorsT8).toBe(false);
    }
  });

  test('keeps all six gaps open and creates no T8 or production artifacts', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionReadinessReview(
      acceptedB26(),
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

  test('freezes controls and routes to new-surface acquisition evidence', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionReadinessReview(
      acceptedB26(),
    );
    expect(report.controlIds).toEqual(CAREER_T8_B27_NEW_SURFACE_ACQUISITION_READINESS_CONTROL_IDS);
    expect(report.controlCount).toBe(12);
    expect(report.controlsFrozen).toBe(true);
    expect(report.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_EVIDENCE',
    );
  });

  test('fails closed when B26 content-addressed identity is tampered', () => {
    const b26 = acceptedB26();
    const tampered: CareerPersonalizationT8CurrentMethodResidualAuthorityPostI255FrontierReconciliationReviewReport = {
      ...b26,
      reviewId: `${b26.reviewId}_tampered`,
    };
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionReadinessReview(
      tampered,
    );
    expect(report.status).toBe('UPSTREAM_B26_BOUNDARY_INVALID');
    expect(report.decision).toBe('NEW_EVIDENCE_SURFACE_ACQUISITION_NOT_READY');
    expect(report.contracts).toEqual([]);
    expect(report.contractCount).toBe(0);
    expect(report.executableNewSurfaceAcquisitionLaneCount).toBe(0);
    expect(report.targetedNewSurfaceAcquisitionAuthorizedForNextGate).toBe(false);
    expect(report.controlCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
  });
});
