import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_INTERNAL_RESEARCH_AUTHORING_INVOCATION_SURFACE_READINESS_REVIEW_VERSION,
  CAREER_T8_B76_INVOCATION_FINDINGS,
  CAREER_T8_B76_INVOCATION_READINESS_CONTROL_IDS,
  CAREER_T8_B76_REVIEWED_REPOSITORY_COMMIT_SHA,
  type CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardInternalResearchAuthoringInvocationSurfaceReadinessReviewReport,
} from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-internal-research-authoring-invocation-surface-readiness-review.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_AUTHORING_GOVERNANCE_CLOSEOUT_VERSION,
  CAREER_T8_B77_CLOSED_CAPABILITY_IDS,
  CAREER_T8_B77_CLOSEOUT_CONTROL_IDS,
  CAREER_T8_B77_REOPEN_CONDITION_IDS,
  CAREER_T8_B77_REVIEWED_REPOSITORY_COMMIT_SHA,
  buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAuthoringGovernanceCloseout,
} from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-research-authoring-governance-closeout.js';

function acceptedB76(): CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardInternalResearchAuthoringInvocationSurfaceReadinessReviewReport {
  const material: Omit<
    CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardInternalResearchAuthoringInvocationSurfaceReadinessReviewReport,
    'reviewId'
  > = {
    reviewVersion:
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_INTERNAL_RESEARCH_AUTHORING_INVOCATION_SURFACE_READINESS_REVIEW_VERSION,
    status:
      'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_INTERNAL_RESEARCH_AUTHORING_INVOCATION_SURFACE_READINESS_REVIEW',
    decision:
      'B74_DIRECT_PATH_SUFFICIENT_NO_ADDITIONAL_INVOCATION_SURFACE_REQUIRED_RESEARCH_AUTHORING_GOVERNANCE_CLOSEOUT_READY',
    upstreamB75AuditId: 'b75_fixture_for_b77',
    exactB75BoundaryAccepted: true,
    reviewedRepository: 'gycha0109-beep/Saju',
    reviewedRepositoryCommitSha: CAREER_T8_B76_REVIEWED_REPOSITORY_COMMIT_SHA,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    invocationFindings: CAREER_T8_B76_INVOCATION_FINDINGS,
    invocationFindingCount: 6,
    b74DirectPathInvocationSufficient: true,
    compiledInternalModuleEmitted: true,
    dedicatedCliRequired: false,
    packageScriptRequired: false,
    publicExportRequired: false,
    additionalInvocationSurfaceContractAuthoringReady: false,
    researchAuthoringGovernanceCloseoutReady: true,
    persistenceRegistrationPromotionAuthorized: false,
    coreRuleRegistryIntegrationAuthorized: false,
    productionEnforcementAuthorized: false,
    immediatelyExecutableGovernanceCloseoutLaneCount: 1,
    immediatelyExecutableCliOrPackageSurfaceLaneCount: 0,
    immediatelyExecutableCoreRegistryIntegrationLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane:
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_AUTHORING_GOVERNANCE_CLOSEOUT',
    positiveT6InputContractEstablished: false,
    positiveClashEffectContractEstablished: false,
    branchSourceOrMethodTriggerActivationCount: 0,
    currentCareerSemanticBridgeEstablished: false,
    visualCorroborationHoldPreserved: true,
    b56ChenZezhenHoldPreserved: true,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: CAREER_T8_B76_INVOCATION_READINESS_CONTROL_IDS,
    controlCount: 16,
    controlsFrozen: true,
    implementationEffects: Object.freeze({
      invocationReadinessReviewsCreated: 1,
      invocationFindingsRecorded: 6,
      invocationSurfacesCreated: 0,
      publicExportsChanged: 0,
      packageScriptsChanged: 0,
      persistenceBehaviorsCreated: 0,
      coreRegistryBehaviorsChanged: 0,
      productionBehaviorsChanged: 0,
    }),
    recommendedNextGate:
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_AUTHORING_GOVERNANCE_CLOSEOUT',
  };

  return {
    reviewId: `career_personalization_t8_classical_ziping_negative_clash_method_guard_internal_research_authoring_invocation_surface_readiness_review_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career T8 B77 negative clash research authoring governance closeout', () => {
  test('closes the governance lane on the exact B76 boundary', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAuthoringGovernanceCloseout(acceptedB76());
    expect(report.closeoutVersion).toBe(CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_AUTHORING_GOVERNANCE_CLOSEOUT_VERSION);
    expect(report.status).toBe('CLOSED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_AUTHORING_GOVERNANCE');
    expect(report.decision).toBe('NEGATIVE_CLASH_RESEARCH_AUTHORING_GOVERNANCE_CLOSED_INTERNAL_DIRECT_PATH_READY_NO_PUBLIC_CORE_PRODUCTION_PROMOTION');
    expect(report.reviewedRepositoryCommitSha).toBe(CAREER_T8_B77_REVIEWED_REPOSITORY_COMMIT_SHA);
    expect(report.researchAuthoringGovernanceLaneClosed).toBe(true);
    expect(report.closedCapabilityIds).toEqual(CAREER_T8_B77_CLOSED_CAPABILITY_IDS);
    expect(report.closedCapabilityCount).toBe(6);
    expect(report.boundedNegativeGuardAvailable).toBe(true);
    expect(report.explicitApplicabilityAdmissionAvailable).toBe(true);
    expect(report.auditableEnvelopeAndAdmissionRecordAvailable).toBe(true);
    expect(report.standaloneThreeOutcomeWorkflowAvailable).toBe(true);
    expect(report.internalAuthoringEntrypointAvailable).toBe(true);
    expect(report.directPathInvocationSufficient).toBe(true);
  });

  test('opens no immediate continuation and preserves all fail-closed boundaries', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAuthoringGovernanceCloseout(acceptedB76());
    expect(report.reopenConditionIds).toEqual(CAREER_T8_B77_REOPEN_CONDITION_IDS);
    expect(report.reopenConditionCount).toBe(3);
    expect(report.additionalInvocationSurfaceRequired).toBe(false);
    expect(report.publicOrPackageAdoptionAuthorized).toBe(false);
    expect(report.persistenceRegistrationPromotionAuthorized).toBe(false);
    expect(report.coreRuleRegistryIntegrationAuthorized).toBe(false);
    expect(report.productionEnforcementAuthorized).toBe(false);
    expect(report.immediateContinuationLaneCount).toBe(0);
    expect(report.selectedImmediateNextLane).toBeNull();
    expect(report.recommendedNextGate).toBeNull();
    expect(report.controlIds).toEqual(CAREER_T8_B77_CLOSEOUT_CONTROL_IDS);
    expect(report.controlCount).toBe(16);
    expect(report.controlsFrozen).toBe(true);
    expect(report.positiveT6InputContractEstablished).toBe(false);
    expect(report.positiveClashEffectContractEstablished).toBe(false);
    expect(report.branchSourceOrMethodTriggerActivationCount).toBe(0);
    expect(report.currentCareerSemanticBridgeEstablished).toBe(false);
    expect(report.visualCorroborationHoldPreserved).toBe(true);
    expect(report.b56ChenZezhenHoldPreserved).toBe(true);
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
  });

  test('fails closed on a tampered B76 review address', () => {
    const b76 = acceptedB76();
    const report = buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAuthoringGovernanceCloseout({
      ...b76,
      reviewId: `${b76.reviewId}_tampered`,
    });
    expect(report.status).toBe('UPSTREAM_B76_BOUNDARY_INVALID');
    expect(report.exactB76BoundaryAccepted).toBe(false);
    expect(report.researchAuthoringGovernanceLaneClosed).toBe(false);
    expect(report.closedCapabilityCount).toBe(0);
    expect(report.immediateContinuationLaneCount).toBe(0);
    expect(report.controlCount).toBe(0);
  });
});
