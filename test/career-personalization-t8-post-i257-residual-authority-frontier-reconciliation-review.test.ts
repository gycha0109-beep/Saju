import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_EVIDENCE_VERSION,
  CAREER_T8_B28_NEW_SURFACE_ACQUISITION_EVIDENCE_CONTROL_IDS,
  CAREER_T8_B28_NEW_SURFACE_ACQUISITION_RECORDS,
  type CareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionEvidenceReport,
} from '../src/research/career-personalization-t8-current-method-residual-authority-new-evidence-surface-acquisition-evidence.js';
import { buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionAdequacyReview } from '../src/research/career-personalization-t8-current-method-residual-authority-new-evidence-surface-acquisition-adequacy-review.js';
import { buildI257Qianli1936CareerDisclaimerCorrectedPrimaryPageBindingEvidence } from '../src/research/i257-qianli-1936-career-disclaimer-corrected-primary-page-binding-evidence.js';
import {
  buildI258Qianli1936CareerDisclaimerPrimaryAccessSurfaceHoldReview,
  type I258Qianli1936CareerDisclaimerPrimaryAccessSurfaceHoldReviewReport,
} from '../src/research/i258-qianli-1936-career-disclaimer-primary-access-surface-hold-review.js';
import {
  CAREER_PERSONALIZATION_T8_POST_I257_RESIDUAL_AUTHORITY_FRONTIER_RECONCILIATION_REVIEW_VERSION,
  CAREER_T8_B30_POST_I257_FRONTIER_CONTROL_IDS,
  CAREER_T8_B30_RESIDUAL_FRONTIER_LANES,
  buildCareerPersonalizationT8PostI257ResidualAuthorityFrontierReconciliationReview,
} from '../src/research/career-personalization-t8-post-i257-residual-authority-frontier-reconciliation-review.js';

function acceptedB28(): CareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionEvidenceReport {
  const material: Omit<
    CareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionEvidenceReport,
    'evidenceId'
  > = {
    evidenceVersion:
      CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_EVIDENCE_VERSION,
    status: 'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_EVIDENCE',
    decision:
      'FOUR_BOUNDED_LANES_EXECUTED_THREE_NEW_SURFACES_DISCOVERED_ZERO_FORMAL_COVERAGE_ADVANCEMENTS_PRIMARY_AND_PROVENANCE_GAPS_PRESERVED',
    upstreamB27ReviewId: 'b27_b30_fixture',
    exactB27BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    records: CAREER_T8_B28_NEW_SURFACE_ACQUISITION_RECORDS,
    recordCount: 4,
    acquisitionLaneExecutionCount: 4,
    genuinelyNewSurfaceDiscoveryCount: 3,
    targetBodyOrPassageDirectAcquisitionCount: 1,
    formalAuthorityCoverageAdvancementCount: 0,
    qinFullDocumentSurfaceDiscovered: true,
    qinP464BodyAcquired: false,
    familyCareerDisclaimerLeadDiscovered: true,
    familyCareerDisclaimerCorrectedPrimaryBound: false,
    familyLimitsRequirementSatisfied: false,
    familyCurrentMethodCompatibilitySatisfied: false,
    branchDirectTenGodClashCareerSemanticLeadDiscovered: true,
    branchIndependentNormativeProvenanceAdequate: false,
    branchCurrentMethodCompatibilitySatisfied: false,
    positionNewQualifyingSurfaceAcquired: false,
    crossSourceRequirementStitchingUsed: false,
    repeatedPriorSurfaceCountedAsProgress: false,
    visibilityConsumedByThisGate: false,
    pluralityConsumedByThisGate: false,
    seasonalConsumedByThisGate: false,
    pluralityHoldReclassified: false,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: CAREER_T8_B28_NEW_SURFACE_ACQUISITION_EVIDENCE_CONTROL_IDS,
    controlCount: 12,
    controlsFrozen: true,
    implementationEffects: {
      acquisitionExecutionsPerformed: 4,
      genuinelyNewSurfacesDiscovered: 3,
      targetPassagesDirectlyAcquired: 1,
      formalCoverageAdvancements: 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate:
      'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_ADEQUACY_REVIEW',
  };

  return {
    evidenceId: `career_t8_current_method_residual_authority_new_evidence_surface_acquisition_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function acceptedI258(): I258Qianli1936CareerDisclaimerPrimaryAccessSurfaceHoldReviewReport {
  const b29 = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionAdequacyReview(
    acceptedB28(),
  );
  const i257 = buildI257Qianli1936CareerDisclaimerCorrectedPrimaryPageBindingEvidence(b29);
  return buildI258Qianli1936CareerDisclaimerPrimaryAccessSurfaceHoldReview(i257);
}

describe('Career T8 B30 post-I257 residual authority frontier reconciliation', () => {
  test('accepts exact I258 and resolves the post-I257 frontier', () => {
    const report = buildCareerPersonalizationT8PostI257ResidualAuthorityFrontierReconciliationReview(acceptedI258());
    expect(report.reviewVersion).toBe(
      CAREER_PERSONALIZATION_T8_POST_I257_RESIDUAL_AUTHORITY_FRONTIER_RECONCILIATION_REVIEW_VERSION,
    );
    expect(report.status).toBe('RESOLVED_CAREER_T8_POST_I257_RESIDUAL_AUTHORITY_FRONTIER_RECONCILIATION_REVIEW');
    expect(report.decision).toBe(
      'FOUR_ACTIVE_PATHS_ALL_EVIDENCE_SURFACE_BLOCKED_ZERO_EXISTING_SURFACE_EXECUTIONS_REOPEN_ONLY_ON_EXPLICIT_NEW_EVIDENCE_TRIGGERS_NO_AUTHORITY_ADMISSION',
    );
    expect(report.exactI258BoundaryAccepted).toBe(true);
  });

  test('preserves exactly four historically active remediation lanes', () => {
    const report = buildCareerPersonalizationT8PostI257ResidualAuthorityFrontierReconciliationReview(acceptedI258());
    expect(report.lanes).toEqual(CAREER_T8_B30_RESIDUAL_FRONTIER_LANES);
    expect(report.laneCount).toBe(4);
    expect(report.activeRemediationPathCount).toBe(4);
    expect(new Set(report.lanes.map((lane) => lane.targetGapId)).size).toBe(4);
  });

  test('has zero immediately executable existing-surface lanes and four blocked lanes', () => {
    const report = buildCareerPersonalizationT8PostI257ResidualAuthorityFrontierReconciliationReview(acceptedI258());
    expect(report.immediatelyExecutableExistingSurfaceLaneCount).toBe(0);
    expect(report.evidenceSurfaceBlockedLaneCount).toBe(4);
    expect(report.lanes.every((lane) => lane.immediatelyExecutableOnExistingSurface === false)).toBe(true);
    expect(report.lanes.every((lane) => lane.evidenceSurfaceBlocked)).toBe(true);
  });

  test('keeps Qin blocked until direct p464 body access changes', () => {
    const report = buildCareerPersonalizationT8PostI257ResidualAuthorityFrontierReconciliationReview(acceptedI258());
    const lane = report.lanes.find(
      (item) => item.targetGapId === 'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING',
    );
    expect(report.qinExistingSurfaceExecutable).toBe(false);
    expect(lane?.disposition).toBe('WAIT_FOR_DIRECT_QIN_P464_BODY_ACCESS_STATE_CHANGE');
  });

  test('preserves the I258 family hold and separate compatibility requirement', () => {
    const report = buildCareerPersonalizationT8PostI257ResidualAuthorityFrontierReconciliationReview(acceptedI258());
    const lane = report.lanes.find(
      (item) => item.targetGapId === 'FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING',
    );
    expect(report.familyI258HoldPreserved).toBe(true);
    expect(report.familyExistingSurfaceExecutable).toBe(false);
    expect(lane?.disposition).toBe('WAIT_FOR_EXACT_QIANLI_1936_TARGET_PAGE_ACCESS_STATE_CHANGE');
    expect(report.familyLimitsRequirementSatisfied).toBe(false);
    expect(report.familyCurrentMethodCompatibilitySatisfied).toBe(false);
  });

  test('keeps branch clash waiting for a new normative natal bridge', () => {
    const report = buildCareerPersonalizationT8PostI257ResidualAuthorityFrontierReconciliationReview(acceptedI258());
    const lane = report.lanes.find(
      (item) => item.targetGapId === 'BRANCH_CLASH_TO_T5_CAREER_SEMANTIC_MODIFIER_MISSING',
    );
    expect(report.branchExistingSurfaceExecutable).toBe(false);
    expect(lane?.disposition).toBe('WAIT_FOR_NEW_INDEPENDENT_NORMATIVE_NATAL_BRANCH_CLASH_BRIDGE');
  });

  test('keeps position waiting for a genuinely new current-T5 bridge', () => {
    const report = buildCareerPersonalizationT8PostI257ResidualAuthorityFrontierReconciliationReview(acceptedI258());
    const lane = report.lanes.find(
      (item) => item.targetGapId === 'VISIBILITY_POSITION_PLURALITY_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
    );
    expect(report.positionExistingSurfaceExecutable).toBe(false);
    expect(lane?.disposition).toBe('WAIT_FOR_NEW_INDEPENDENT_POSITION_TO_CURRENT_T5_BRIDGE');
  });

  test('freezes one explicit reopen trigger for each active lane', () => {
    const report = buildCareerPersonalizationT8PostI257ResidualAuthorityFrontierReconciliationReview(acceptedI258());
    expect(report.reopenTriggerCount).toBe(4);
    expect(report.lanes.every((lane) => lane.reopenTrigger.length > 40)).toBe(true);
    expect(report.lanes.every((lane) => lane.repeatedExistingSurfaceSearchAuthorized === false)).toBe(true);
  });

  test('keeps visibility plurality and seasonal unconsumed with conflict deferred', () => {
    const report = buildCareerPersonalizationT8PostI257ResidualAuthorityFrontierReconciliationReview(acceptedI258());
    expect(report.visibilityConsumedByCurrentContinuation).toBe(false);
    expect(report.pluralityConsumedByCurrentContinuation).toBe(false);
    expect(report.pluralityHeldUnderI254).toBe(true);
    expect(report.seasonalConsumedByCurrentContinuation).toBe(false);
    expect(report.seasonalConditionalRemediationActivated).toBe(false);
    expect(report.conflictPolicyRemediationActivated).toBe(false);
    expect(report.conflictPolicyDisposition).toBe('PACK_LEVEL_DEFERRED');
  });

  test('blocks broad restart exhausted-surface repetition and cross-source stitching', () => {
    const report = buildCareerPersonalizationT8PostI257ResidualAuthorityFrontierReconciliationReview(acceptedI258());
    expect(report.broadSearchRestartAuthorized).toBe(false);
    expect(report.repeatedExhaustedSurfaceSearchAuthorized).toBe(false);
    expect(report.crossSourceRequirementStitchingAuthorized).toBe(false);
  });

  test('keeps zero admission-ready gaps and all six historical gaps open', () => {
    const report = buildCareerPersonalizationT8PostI257ResidualAuthorityFrontierReconciliationReview(acceptedI258());
    expect(report.authorityAdmissionReadyGapCount).toBe(0);
    expect(report.gapClosureReadyCount).toBe(0);
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
  });

  test('creates no T8 or production artifacts and routes to trigger readiness', () => {
    const report = buildCareerPersonalizationT8PostI257ResidualAuthorityFrontierReconciliationReview(acceptedI258());
    expect(report.authorityAdmittedByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
    expect(report.recommendedNextGate).toBe('CAREER_PERSONALIZATION_T8_POST_I257_NEW_EVIDENCE_TRIGGER_READINESS_REVIEW');
  });

  test('freezes controls deterministically and fails closed on tampered I258 identity', () => {
    const first = buildCareerPersonalizationT8PostI257ResidualAuthorityFrontierReconciliationReview(acceptedI258());
    const second = buildCareerPersonalizationT8PostI257ResidualAuthorityFrontierReconciliationReview(acceptedI258());
    expect(first.controlIds).toEqual(CAREER_T8_B30_POST_I257_FRONTIER_CONTROL_IDS);
    expect(first.controlCount).toBe(12);
    expect(first.controlsFrozen).toBe(true);
    expect(first.reviewId).toBe(second.reviewId);

    const i258 = acceptedI258();
    const tampered: I258Qianli1936CareerDisclaimerPrimaryAccessSurfaceHoldReviewReport = {
      ...i258,
      reviewId: `${i258.reviewId}_tampered`,
    };
    const invalid = buildCareerPersonalizationT8PostI257ResidualAuthorityFrontierReconciliationReview(tampered);
    expect(invalid.status).toBe('UPSTREAM_I258_BOUNDARY_INVALID');
    expect(invalid.decision).toBe('POST_I257_RESIDUAL_AUTHORITY_FRONTIER_NOT_ESTABLISHED');
    expect(invalid.lanes).toEqual([]);
    expect(invalid.laneCount).toBe(0);
    expect(invalid.evidenceSurfaceBlockedLaneCount).toBe(0);
    expect(invalid.reopenTriggerCount).toBe(0);
    expect(invalid.familyI258HoldPreserved).toBe(false);
    expect(invalid.controlCount).toBe(0);
    expect(invalid.controlsFrozen).toBe(false);
  });
});
