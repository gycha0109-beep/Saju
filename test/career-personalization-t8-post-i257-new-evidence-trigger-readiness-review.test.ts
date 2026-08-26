import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_POST_I257_RESIDUAL_AUTHORITY_FRONTIER_RECONCILIATION_REVIEW_VERSION,
  CAREER_T8_B30_POST_I257_FRONTIER_CONTROL_IDS,
  CAREER_T8_B30_RESIDUAL_FRONTIER_LANES,
  type CareerPersonalizationT8PostI257ResidualAuthorityFrontierReconciliationReviewReport,
} from '../src/research/career-personalization-t8-post-i257-residual-authority-frontier-reconciliation-review.js';
import {
  CAREER_PERSONALIZATION_T8_POST_I257_NEW_EVIDENCE_TRIGGER_READINESS_REVIEW_VERSION,
  CAREER_T8_B31_EVIDENCE_TRIGGER_CONTRACTS,
  CAREER_T8_B31_TRIGGER_READINESS_CONTROL_IDS,
  buildCareerPersonalizationT8PostI257NewEvidenceTriggerReadinessReview,
} from '../src/research/career-personalization-t8-post-i257-new-evidence-trigger-readiness-review.js';

function acceptedB30(): CareerPersonalizationT8PostI257ResidualAuthorityFrontierReconciliationReviewReport {
  const material: Omit<CareerPersonalizationT8PostI257ResidualAuthorityFrontierReconciliationReviewReport, 'reviewId'> = {
    reviewVersion: CAREER_PERSONALIZATION_T8_POST_I257_RESIDUAL_AUTHORITY_FRONTIER_RECONCILIATION_REVIEW_VERSION,
    status: 'RESOLVED_CAREER_T8_POST_I257_RESIDUAL_AUTHORITY_FRONTIER_RECONCILIATION_REVIEW',
    decision:
      'FOUR_ACTIVE_PATHS_ALL_EVIDENCE_SURFACE_BLOCKED_ZERO_EXISTING_SURFACE_EXECUTIONS_REOPEN_ONLY_ON_EXPLICIT_NEW_EVIDENCE_TRIGGERS_NO_AUTHORITY_ADMISSION',
    upstreamI258ReviewId: 'i258_b31_fixture',
    exactI258BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    lanes: CAREER_T8_B30_RESIDUAL_FRONTIER_LANES,
    laneCount: 4,
    activeRemediationPathCount: 4,
    immediatelyExecutableExistingSurfaceLaneCount: 0,
    evidenceSurfaceBlockedLaneCount: 4,
    reopenTriggerCount: 4,
    qinExistingSurfaceExecutable: false,
    familyExistingSurfaceExecutable: false,
    branchExistingSurfaceExecutable: false,
    positionExistingSurfaceExecutable: false,
    familyI258HoldPreserved: true,
    familyLimitsRequirementSatisfied: false,
    familyCurrentMethodCompatibilitySatisfied: false,
    visibilityConsumedByCurrentContinuation: false,
    pluralityConsumedByCurrentContinuation: false,
    pluralityHeldUnderI254: true,
    seasonalConsumedByCurrentContinuation: false,
    seasonalConditionalRemediationActivated: false,
    conflictPolicyRemediationActivated: false,
    conflictPolicyDisposition: 'PACK_LEVEL_DEFERRED',
    broadSearchRestartAuthorized: false,
    repeatedExhaustedSurfaceSearchAuthorized: false,
    crossSourceRequirementStitchingAuthorized: false,
    authorityAdmissionReadyGapCount: 0,
    gapClosureReadyCount: 0,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: CAREER_T8_B30_POST_I257_FRONTIER_CONTROL_IDS,
    controlCount: 12,
    controlsFrozen: true,
    implementationEffects: {
      frontierLanesReconciled: 4,
      existingSurfaceExecutionsAuthorized: 0,
      evidenceSurfaceBlockedLanes: 4,
      reopenTriggersFrozen: 4,
      sourceAcquisitionsPerformed: 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: 'CAREER_PERSONALIZATION_T8_POST_I257_NEW_EVIDENCE_TRIGGER_READINESS_REVIEW',
  };

  return {
    reviewId: `career_t8_post_i257_residual_authority_frontier_reconciliation_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career T8 B31 post-I257 new evidence trigger readiness review', () => {
  test('accepts exact B30 and resolves trigger readiness', () => {
    const report = buildCareerPersonalizationT8PostI257NewEvidenceTriggerReadinessReview(acceptedB30());
    expect(report.reviewVersion).toBe(CAREER_PERSONALIZATION_T8_POST_I257_NEW_EVIDENCE_TRIGGER_READINESS_REVIEW_VERSION);
    expect(report.status).toBe('RESOLVED_CAREER_T8_POST_I257_NEW_EVIDENCE_TRIGGER_READINESS_REVIEW');
    expect(report.decision).toBe(
      'FOUR_TRIGGER_CONTRACTS_FROZEN_ZERO_CURRENTLY_SATISFIED_RESUME_ONLY_ON_LANE_SPECIFIC_EVIDENCE_CHANGE_AND_LATER_ADEQUACY_REVIEW_NO_AUTHORITY_ADMISSION',
    );
    expect(report.exactB30BoundaryAccepted).toBe(true);
  });

  test('freezes exactly four unique trigger contracts for four unique gaps', () => {
    const report = buildCareerPersonalizationT8PostI257NewEvidenceTriggerReadinessReview(acceptedB30());
    expect(report.triggerContracts).toEqual(CAREER_T8_B31_EVIDENCE_TRIGGER_CONTRACTS);
    expect(report.triggerContractCount).toBe(4);
    expect(new Set(report.triggerContracts.map((contract) => contract.triggerId)).size).toBe(4);
    expect(new Set(report.triggerContracts.map((contract) => contract.targetGapId)).size).toBe(4);
  });

  test('has zero currently satisfied triggers and zero executable lanes', () => {
    const report = buildCareerPersonalizationT8PostI257NewEvidenceTriggerReadinessReview(acceptedB30());
    expect(report.currentlySatisfiedTriggerCount).toBe(0);
    expect(report.currentlyExecutableLaneCount).toBe(0);
    expect(report.triggerContracts.every((contract) => contract.currentlySatisfied === false)).toBe(true);
  });

  test('requires all lane-specific conditions and later adequacy review', () => {
    const report = buildCareerPersonalizationT8PostI257NewEvidenceTriggerReadinessReview(acceptedB30());
    expect(report.activationRequiresAllConditions).toBe(true);
    expect(report.activationAlwaysRequiresAdequacyReview).toBe(true);
    expect(report.triggerContracts.every((contract) => contract.laneReopensWhenAllConditionsSatisfied)).toBe(true);
    expect(report.triggerContracts.every((contract) => contract.activationRequiresFollowupAdequacyReview)).toBe(true);
  });

  test('Qin trigger requires direct p464 body and rejects TOC/snippet substitutes', () => {
    const report = buildCareerPersonalizationT8PostI257NewEvidenceTriggerReadinessReview(acceptedB30());
    const trigger = report.triggerContracts.find((contract) => contract.triggerId === 'QIN_P464_DIRECT_BODY_TRIGGER');
    expect(trigger?.requiredConditions.join(' ')).toContain('printed p.464 Career body');
    expect(trigger?.prohibitedSubstitutes.join(' ')).toContain('TOC/catalog');
  });

  test('family trigger requires exact 1936 witness target-page access', () => {
    const report = buildCareerPersonalizationT8PostI257NewEvidenceTriggerReadinessReview(acceptedB30());
    const trigger = report.triggerContracts.find(
      (contract) => contract.triggerId === 'QIANLI_EXACT_1936_TARGET_PAGE_ACCESS_TRIGGER',
    );
    expect(trigger?.requiredConditions.join(' ')).toContain('nlc:data_416,01jh000368,10155');
    expect(trigger?.requiredConditions.join(' ')).toContain('printed p.50-p.53');
    expect(trigger?.prohibitedSubstitutes.join(' ')).toContain('different 1934 NLC witness');
  });

  test('branch trigger requires one new normative natal current-T5 bridge with limits', () => {
    const report = buildCareerPersonalizationT8PostI257NewEvidenceTriggerReadinessReview(acceptedB30());
    const trigger = report.triggerContracts.find(
      (contract) => contract.triggerId === 'BRANCH_CLASH_NORMATIVE_NATAL_BRIDGE_TRIGGER',
    );
    const conditions = trigger?.requiredConditions.join(' ') ?? '';
    expect(conditions).toContain('normative source');
    expect(conditions).toContain('natal');
    expect(conditions).toContain('current-T5');
    expect(conditions).toContain('limits');
  });

  test('position trigger requires a new independent position-to-current-T5 bridge', () => {
    const report = buildCareerPersonalizationT8PostI257NewEvidenceTriggerReadinessReview(acceptedB30());
    const trigger = report.triggerContracts.find((contract) => contract.triggerId === 'POSITION_CURRENT_T5_BRIDGE_TRIGGER');
    const conditions = trigger?.requiredConditions.join(' ') ?? '';
    expect(conditions).toContain('position/separation-specific source');
    expect(conditions).toContain('current-T5 Career semantic');
    expect(trigger?.prohibitedSubstitutes.join(' ')).toContain('Qianli 明暗/地位');
  });

  test('trigger activation never admits authority or closes a gap automatically', () => {
    const report = buildCareerPersonalizationT8PostI257NewEvidenceTriggerReadinessReview(acceptedB30());
    expect(report.activationAutomaticallyAdmitsAuthority).toBe(false);
    expect(report.activationAutomaticallyClosesGap).toBe(false);
    expect(report.triggerContracts.every((contract) => contract.activationAutomaticallyAdmitsAuthority === false)).toBe(true);
    expect(report.triggerContracts.every((contract) => contract.activationAutomaticallyClosesGap === false)).toBe(true);
  });

  test('keeps broad search repetition and stitching prohibited', () => {
    const report = buildCareerPersonalizationT8PostI257NewEvidenceTriggerReadinessReview(acceptedB30());
    expect(report.broadSearchRestartAuthorized).toBe(false);
    expect(report.repeatedExhaustedSurfaceSearchAuthorized).toBe(false);
    expect(report.crossSourceRequirementStitchingAuthorized).toBe(false);
  });

  test('preserves unconsumed dimensions family residuals and deferred conflict', () => {
    const report = buildCareerPersonalizationT8PostI257NewEvidenceTriggerReadinessReview(acceptedB30());
    expect(report.visibilityConsumedByCurrentContinuation).toBe(false);
    expect(report.pluralityConsumedByCurrentContinuation).toBe(false);
    expect(report.pluralityHeldUnderI254).toBe(true);
    expect(report.seasonalConsumedByCurrentContinuation).toBe(false);
    expect(report.seasonalConditionalRemediationActivated).toBe(false);
    expect(report.conflictPolicyDisposition).toBe('PACK_LEVEL_DEFERRED');
    expect(report.familyLimitsRequirementSatisfied).toBe(false);
    expect(report.familyCurrentMethodCompatibilitySatisfied).toBe(false);
  });

  test('keeps all six gaps open and creates no T8 or production artifacts', () => {
    const report = buildCareerPersonalizationT8PostI257NewEvidenceTriggerReadinessReview(acceptedB30());
    expect(report.authorityAdmissionReadyGapCount).toBe(0);
    expect(report.gapClosureReadyCount).toBe(0);
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

  test('freezes controls deterministically and fails closed on tampered B30 identity', () => {
    const first = buildCareerPersonalizationT8PostI257NewEvidenceTriggerReadinessReview(acceptedB30());
    const second = buildCareerPersonalizationT8PostI257NewEvidenceTriggerReadinessReview(acceptedB30());
    expect(first.controlIds).toEqual(CAREER_T8_B31_TRIGGER_READINESS_CONTROL_IDS);
    expect(first.controlCount).toBe(12);
    expect(first.controlsFrozen).toBe(true);
    expect(first.reviewId).toBe(second.reviewId);
    expect(first.recommendedNextGate).toBe('CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_EVIDENCE');

    const b30 = acceptedB30();
    const tampered: CareerPersonalizationT8PostI257ResidualAuthorityFrontierReconciliationReviewReport = {
      ...b30,
      reviewId: `${b30.reviewId}_tampered`,
    };
    const invalid = buildCareerPersonalizationT8PostI257NewEvidenceTriggerReadinessReview(tampered);
    expect(invalid.status).toBe('UPSTREAM_B30_BOUNDARY_INVALID');
    expect(invalid.decision).toBe('POST_I257_NEW_EVIDENCE_TRIGGER_READINESS_NOT_ESTABLISHED');
    expect(invalid.triggerContracts).toEqual([]);
    expect(invalid.triggerContractCount).toBe(0);
    expect(invalid.controlCount).toBe(0);
    expect(invalid.controlsFrozen).toBe(false);
  });
});
