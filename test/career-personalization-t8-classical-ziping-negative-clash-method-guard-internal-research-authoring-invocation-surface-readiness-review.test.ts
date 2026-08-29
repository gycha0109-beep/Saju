import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_COMPATIBILITY_AUDIT_VERSION,
  CAREER_T8_B75_COMPATIBILITY_AUDIT_CONTROL_IDS,
  CAREER_T8_B75_COMPATIBILITY_FINDINGS,
  CAREER_T8_B75_REVIEWED_REPOSITORY_COMMIT_SHA,
  type CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardDedicatedInternalResearchProposalAuthoringEntrypointCompatibilityAuditReport,
} from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-dedicated-internal-research-proposal-authoring-entrypoint-compatibility-audit.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_INTERNAL_RESEARCH_AUTHORING_INVOCATION_SURFACE_READINESS_REVIEW_VERSION,
  CAREER_T8_B76_INVOCATION_FINDINGS,
  CAREER_T8_B76_INVOCATION_READINESS_CONTROL_IDS,
  CAREER_T8_B76_REVIEWED_REPOSITORY_COMMIT_SHA,
  buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardInternalResearchAuthoringInvocationSurfaceReadinessReview,
} from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-internal-research-authoring-invocation-surface-readiness-review.js';

function acceptedB75(): CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardDedicatedInternalResearchProposalAuthoringEntrypointCompatibilityAuditReport {
  const material: Omit<
    CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardDedicatedInternalResearchProposalAuthoringEntrypointCompatibilityAuditReport,
    'auditId'
  > = {
    auditVersion:
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_COMPATIBILITY_AUDIT_VERSION,
    status:
      'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_COMPATIBILITY_AUDIT',
    decision:
      'B74_INTERNAL_AUTHORING_ENTRYPOINT_COMPATIBLE_ZERO_PUBLIC_HARNESS_CORE_PRODUCTION_BINDINGS_INVOCATION_SURFACE_REVIEW_READY',
    upstreamB74MaterializationId: 'b74_fixture_for_b76',
    exactB74BoundaryAccepted: true,
    reviewedRepository: 'gycha0109-beep/Saju',
    reviewedRepositoryCommitSha: CAREER_T8_B75_REVIEWED_REPOSITORY_COMMIT_SHA,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    compatibilityFindings: CAREER_T8_B75_COMPATIBILITY_FINDINGS,
    compatibilityFindingCount: 8,
    compatibilityViolationCount: 0,
    internalAuthoringEntrypointExecutable: true,
    delegatesToB71: true,
    researchBarrelExported: false,
    rootBarrelDirectExported: false,
    packageAuthoringSurfacePresent: false,
    developerHarnessIntegrated: false,
    researchUxPreviewIntegrated: false,
    coreRuleRegistryIntegrated: false,
    productionRuntimeIntegrated: false,
    persistenceRegistrationPromotionPathPresent: false,
    internalResearchAuthoringInvocationSurfaceReadinessReviewReady: true,
    publicOrPackageAdoptionAuthorizedByThisGate: false,
    coreRuleRegistryIntegrationAuthorizedByThisGate: false,
    productionEnforcementAuthorized: false,
    immediatelyExecutableInvocationSurfaceReadinessReviewLaneCount: 1,
    immediatelyExecutablePublicExportLaneCount: 0,
    immediatelyExecutableCoreRegistryIntegrationLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane:
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_INTERNAL_RESEARCH_AUTHORING_INVOCATION_SURFACE_READINESS_REVIEW',
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
    controlIds: CAREER_T8_B75_COMPATIBILITY_AUDIT_CONTROL_IDS,
    controlCount: 16,
    controlsFrozen: true,
    implementationEffects: Object.freeze({
      compatibilityAuditsCreated: 1,
      compatibilityFindingsRecorded: 8,
      publicExportsChanged: 0,
      packageScriptsChanged: 0,
      persistenceBehaviorsCreated: 0,
      coreRegistryBehaviorsChanged: 0,
      productionBehaviorsChanged: 0,
    }),
    recommendedNextGate:
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_INTERNAL_RESEARCH_AUTHORING_INVOCATION_SURFACE_READINESS_REVIEW',
  };

  return {
    auditId: `career_personalization_t8_classical_ziping_negative_clash_method_guard_dedicated_internal_research_proposal_authoring_entrypoint_compatibility_audit_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career T8 B76 internal research authoring invocation-surface readiness review', () => {
  test('accepts the exact B75 boundary and records six no-expansion findings', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardInternalResearchAuthoringInvocationSurfaceReadinessReview(
        acceptedB75(),
      );

    expect(report.reviewVersion).toBe(
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_INTERNAL_RESEARCH_AUTHORING_INVOCATION_SURFACE_READINESS_REVIEW_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_INTERNAL_RESEARCH_AUTHORING_INVOCATION_SURFACE_READINESS_REVIEW',
    );
    expect(report.decision).toBe(
      'B74_DIRECT_PATH_SUFFICIENT_NO_ADDITIONAL_INVOCATION_SURFACE_REQUIRED_RESEARCH_AUTHORING_GOVERNANCE_CLOSEOUT_READY',
    );
    expect(report.reviewedRepositoryCommitSha).toBe(CAREER_T8_B76_REVIEWED_REPOSITORY_COMMIT_SHA);
    expect(report.invocationFindings).toEqual(CAREER_T8_B76_INVOCATION_FINDINGS);
    expect(report.invocationFindingCount).toBe(6);
    expect(report.b74DirectPathInvocationSufficient).toBe(true);
    expect(report.compiledInternalModuleEmitted).toBe(true);
    expect(report.dedicatedCliRequired).toBe(false);
    expect(report.packageScriptRequired).toBe(false);
    expect(report.publicExportRequired).toBe(false);
    expect(report.additionalInvocationSurfaceContractAuthoringReady).toBe(false);
  });

  test('opens only governance closeout and preserves all authority holds', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardInternalResearchAuthoringInvocationSurfaceReadinessReview(
        acceptedB75(),
      );

    expect(report.researchAuthoringGovernanceCloseoutReady).toBe(true);
    expect(report.immediatelyExecutableGovernanceCloseoutLaneCount).toBe(1);
    expect(report.immediatelyExecutableCliOrPackageSurfaceLaneCount).toBe(0);
    expect(report.immediatelyExecutableCoreRegistryIntegrationLaneCount).toBe(0);
    expect(report.immediatelyExecutableSemanticRuleLaneCount).toBe(0);
    expect(report.selectedImmediateNextLane).toBe(
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_AUTHORING_GOVERNANCE_CLOSEOUT',
    );
    expect(report.controlIds).toEqual(CAREER_T8_B76_INVOCATION_READINESS_CONTROL_IDS);
    expect(report.controlCount).toBe(16);
    expect(report.controlsFrozen).toBe(true);
    expect(report.persistenceRegistrationPromotionAuthorized).toBe(false);
    expect(report.coreRuleRegistryIntegrationAuthorized).toBe(false);
    expect(report.productionEnforcementAuthorized).toBe(false);
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

  test('fails closed on a tampered B75 audit address', () => {
    const b75 = acceptedB75();
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardInternalResearchAuthoringInvocationSurfaceReadinessReview({
        ...b75,
        auditId: `${b75.auditId}_tampered`,
      });

    expect(report.status).toBe('UPSTREAM_B75_BOUNDARY_INVALID');
    expect(report.exactB75BoundaryAccepted).toBe(false);
    expect(report.invocationFindingCount).toBe(0);
    expect(report.b74DirectPathInvocationSufficient).toBe(false);
    expect(report.researchAuthoringGovernanceCloseoutReady).toBe(false);
    expect(report.immediatelyExecutableGovernanceCloseoutLaneCount).toBe(0);
    expect(report.selectedImmediateNextLane).toBeNull();
    expect(report.controlCount).toBe(0);
  });
});
