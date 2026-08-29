import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_CONTRACT_VERSION,
  CAREER_T8_B74_INTERNAL_AUTHORING_ENTRYPOINT_CONTROL_IDS,
  type CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardDedicatedInternalResearchProposalAuthoringEntrypointContractReport,
} from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-dedicated-internal-research-proposal-authoring-entrypoint-contract.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_COMPATIBILITY_AUDIT_VERSION,
  CAREER_T8_B75_COMPATIBILITY_AUDIT_CONTROL_IDS,
  CAREER_T8_B75_COMPATIBILITY_FINDINGS,
  CAREER_T8_B75_REVIEWED_REPOSITORY_COMMIT_SHA,
  buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardDedicatedInternalResearchProposalAuthoringEntrypointCompatibilityAudit,
} from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-dedicated-internal-research-proposal-authoring-entrypoint-compatibility-audit.js';

function acceptedB74(): CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardDedicatedInternalResearchProposalAuthoringEntrypointContractReport {
  const material: Omit<
    CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardDedicatedInternalResearchProposalAuthoringEntrypointContractReport,
    'materializationId'
  > = {
    materializationVersion:
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_CONTRACT_VERSION,
    status:
      'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_CONTRACT',
    decision:
      'DEDICATED_INTERNAL_RESEARCH_AUTHORING_ENTRYPOINT_MATERIALIZED_B71_DELEGATED_NO_PUBLIC_CORE_PRODUCTION_INTEGRATION',
    upstreamB73ReviewId: 'b73_fixture_for_b75',
    exactB73BoundaryAccepted: true,
    dedicatedInternalEntrypointCreatedByThisGate: true,
    executableEntrypointCreatedByThisGate: true,
    delegatesToB71: true,
    preservesThreeB71Outcomes: true,
    authoringEligibilityMayBypassB71Admission: false,
    persistenceEnabled: false,
    registrationEnabled: false,
    promotionEnabled: false,
    rootExportEnabled: false,
    researchBarrelExportEnabled: false,
    packageExportEnabled: false,
    developerHarnessIntegrationEnabled: false,
    researchUxPreviewIntegrationEnabled: false,
    coreRuleRegistryIntegrationEnabled: false,
    productionEnforcementAuthorized: false,
    immediatelyExecutableCompatibilityAuditLaneCount: 1,
    immediatelyExecutablePublicExportLaneCount: 0,
    immediatelyExecutableCoreRegistryIntegrationLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane:
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_COMPATIBILITY_AUDIT',
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
    controlIds: CAREER_T8_B74_INTERNAL_AUTHORING_ENTRYPOINT_CONTROL_IDS,
    controlCount: 16,
    controlsFrozen: true,
    implementationEffects: Object.freeze({
      internalAuthoringEntrypointsCreated: 1,
      executableEntrypointsCreated: 1,
      publicExportsChanged: 0,
      packageExportsChanged: 0,
      packageScriptsChanged: 0,
      persistenceBehaviorsCreated: 0,
      coreRegistryBehaviorsChanged: 0,
      productionBehaviorsChanged: 0,
    }),
    recommendedNextGate:
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_COMPATIBILITY_AUDIT',
  };

  return {
    materializationId: `career_personalization_t8_classical_ziping_negative_clash_method_guard_dedicated_internal_research_proposal_authoring_entrypoint_contract_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career T8 B75 internal authoring entrypoint compatibility audit', () => {
  test('resolves the exact B74 boundary with eight repository findings and zero violations', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardDedicatedInternalResearchProposalAuthoringEntrypointCompatibilityAudit(
        acceptedB74(),
      );

    expect(report.auditVersion).toBe(
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_COMPATIBILITY_AUDIT_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_COMPATIBILITY_AUDIT',
    );
    expect(report.decision).toBe(
      'B74_INTERNAL_AUTHORING_ENTRYPOINT_COMPATIBLE_ZERO_PUBLIC_HARNESS_CORE_PRODUCTION_BINDINGS_INVOCATION_SURFACE_REVIEW_READY',
    );
    expect(report.reviewedRepositoryCommitSha).toBe(CAREER_T8_B75_REVIEWED_REPOSITORY_COMMIT_SHA);
    expect(report.compatibilityFindings).toEqual(CAREER_T8_B75_COMPATIBILITY_FINDINGS);
    expect(report.compatibilityFindingCount).toBe(8);
    expect(report.compatibilityViolationCount).toBe(0);
    expect(report.internalAuthoringEntrypointExecutable).toBe(true);
    expect(report.delegatesToB71).toBe(true);
    expect(report.researchBarrelExported).toBe(false);
    expect(report.rootBarrelDirectExported).toBe(false);
    expect(report.packageAuthoringSurfacePresent).toBe(false);
    expect(report.developerHarnessIntegrated).toBe(false);
    expect(report.researchUxPreviewIntegrated).toBe(false);
    expect(report.coreRuleRegistryIntegrated).toBe(false);
    expect(report.productionRuntimeIntegrated).toBe(false);
    expect(report.persistenceRegistrationPromotionPathPresent).toBe(false);
  });

  test('opens only invocation-surface readiness review and preserves every authority hold', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardDedicatedInternalResearchProposalAuthoringEntrypointCompatibilityAudit(
        acceptedB74(),
      );

    expect(report.internalResearchAuthoringInvocationSurfaceReadinessReviewReady).toBe(true);
    expect(report.immediatelyExecutableInvocationSurfaceReadinessReviewLaneCount).toBe(1);
    expect(report.immediatelyExecutablePublicExportLaneCount).toBe(0);
    expect(report.immediatelyExecutableCoreRegistryIntegrationLaneCount).toBe(0);
    expect(report.immediatelyExecutableSemanticRuleLaneCount).toBe(0);
    expect(report.selectedImmediateNextLane).toBe(
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_INTERNAL_RESEARCH_AUTHORING_INVOCATION_SURFACE_READINESS_REVIEW',
    );
    expect(report.controlIds).toEqual(CAREER_T8_B75_COMPATIBILITY_AUDIT_CONTROL_IDS);
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

  test('fails closed on a tampered B74 materialization address', () => {
    const b74 = acceptedB74();
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardDedicatedInternalResearchProposalAuthoringEntrypointCompatibilityAudit({
        ...b74,
        materializationId: `${b74.materializationId}_tampered`,
      });

    expect(report.status).toBe('UPSTREAM_B74_BOUNDARY_INVALID');
    expect(report.exactB74BoundaryAccepted).toBe(false);
    expect(report.compatibilityFindingCount).toBe(0);
    expect(report.internalAuthoringEntrypointExecutable).toBe(false);
    expect(report.internalResearchAuthoringInvocationSurfaceReadinessReviewReady).toBe(false);
    expect(report.immediatelyExecutableInvocationSurfaceReadinessReviewLaneCount).toBe(0);
    expect(report.selectedImmediateNextLane).toBeNull();
    expect(report.controlCount).toBe(0);
  });
});
