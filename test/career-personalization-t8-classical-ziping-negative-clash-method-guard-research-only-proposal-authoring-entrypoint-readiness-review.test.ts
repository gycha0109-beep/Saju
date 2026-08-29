import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_COMPATIBILITY_AUDIT_VERSION,
  CAREER_T8_B72_COMPATIBILITY_AUDIT_CONTROL_IDS,
  CAREER_T8_B72_COMPATIBILITY_FINDINGS,
  CAREER_T8_B72_REVIEWED_REPOSITORY_COMMIT_SHA,
  type CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardStandaloneResearchProposalAdmissionWorkflowCompatibilityAuditReport,
} from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-standalone-research-proposal-admission-workflow-compatibility-audit.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ONLY_PROPOSAL_AUTHORING_ENTRYPOINT_READINESS_REVIEW_VERSION,
  CAREER_T8_B73_ENTRYPOINT_FINDINGS,
  CAREER_T8_B73_ENTRYPOINT_READINESS_CONTROL_IDS,
  CAREER_T8_B73_REVIEWED_REPOSITORY_COMMIT_SHA,
  buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchOnlyProposalAuthoringEntrypointReadinessReview,
} from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-research-only-proposal-authoring-entrypoint-readiness-review.js';

function acceptedB72(): CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardStandaloneResearchProposalAdmissionWorkflowCompatibilityAuditReport {
  const material: Omit<
    CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardStandaloneResearchProposalAdmissionWorkflowCompatibilityAuditReport,
    'auditId'
  > = {
    auditVersion:
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_COMPATIBILITY_AUDIT_VERSION,
    status:
      'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_COMPATIBILITY_AUDIT',
    decision:
      'B71_STANDALONE_WORKFLOW_COMPATIBLE_ZERO_PUBLIC_CORE_PRODUCTION_BYPASS_INTEGRATIONS_RESEARCH_ONLY_ENTRYPOINT_REVIEW_READY',
    upstreamB71MaterializationId: 'b71_fixture_for_b73',
    exactB71BoundaryAccepted: true,
    reviewedRepository: 'gycha0109-beep/Saju',
    reviewedRepositoryCommitSha: CAREER_T8_B72_REVIEWED_REPOSITORY_COMMIT_SHA,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    compatibilityFindings: CAREER_T8_B72_COMPATIBILITY_FINDINGS,
    compatibilityFindingCount: 6,
    compatibilityViolationCount: 0,
    standaloneWorkflowExecutable: true,
    researchBarrelExported: false,
    rootBarrelDirectExported: false,
    packageResearchSubpathExported: false,
    coreRuleRegistryIntegrated: false,
    productionRuntimeIntegrated: false,
    persistenceRegistrationOrPromotionPathPresent: false,
    publicCoreProductionBypassCount: 0,
    researchOnlyProposalAuthoringEntrypointReadinessReviewReady: true,
    rootOrPackageExportAuthorizedByThisGate: false,
    coreRuleRegistryIntegrationAuthorizedByThisGate: false,
    productionEnforcementAuthorized: false,
    immediatelyExecutableResearchEntrypointReadinessReviewLaneCount: 1,
    immediatelyExecutableCoreRegistryIntegrationLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane:
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ONLY_PROPOSAL_AUTHORING_ENTRYPOINT_READINESS_REVIEW',
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
    controlIds: CAREER_T8_B72_COMPATIBILITY_AUDIT_CONTROL_IDS,
    controlCount: 16,
    controlsFrozen: true,
    implementationEffects: Object.freeze({
      compatibilityAuditsCreated: 1,
      compatibilityFindingsRecorded: 6,
      publicExportsChanged: 0,
      persistenceBehaviorsCreated: 0,
      coreRegistryBehaviorsChanged: 0,
      ruleDefinitionsCreated: 0,
      methodologyDefinitionsCreated: 0,
      productionBehaviorsChanged: 0,
    }),
    recommendedNextGate:
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ONLY_PROPOSAL_AUTHORING_ENTRYPOINT_READINESS_REVIEW',
  };
  return {
    auditId: `career_personalization_t8_classical_ziping_negative_clash_method_guard_standalone_research_proposal_admission_workflow_compatibility_audit_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career T8 classical Zi-Ping B73 research-only authoring entrypoint readiness', () => {
  test('records six exact entrypoint findings and rejects reuse of existing public/dev/UX surfaces', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchOnlyProposalAuthoringEntrypointReadinessReview(
        acceptedB72(),
      );

    expect(report.reviewVersion).toBe(
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ONLY_PROPOSAL_AUTHORING_ENTRYPOINT_READINESS_REVIEW_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ONLY_PROPOSAL_AUTHORING_ENTRYPOINT_READINESS_REVIEW',
    );
    expect(report.reviewedRepositoryCommitSha).toBe(CAREER_T8_B73_REVIEWED_REPOSITORY_COMMIT_SHA);
    expect(report.entrypointFindings).toEqual(CAREER_T8_B73_ENTRYPOINT_FINDINGS);
    expect(report.entrypointFindingCount).toBe(6);
    expect(report.existingReusableEntrypointCount).toBe(0);
    expect(report.developerHarnessReuseAuthorized).toBe(false);
    expect(report.researchUxPreviewReuseAuthorized).toBe(false);
  });

  test('authorizes only a dedicated internal direct-path entrypoint contract', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchOnlyProposalAuthoringEntrypointReadinessReview(
        acceptedB72(),
      );

    expect(report.b71InternalWorkflowPrimitiveAvailable).toBe(true);
    expect(report.dedicatedInternalResearchAuthoringEntrypointContractAuthoringReady).toBe(true);
    expect(report.entrypointMustDelegateToB71).toBe(true);
    expect(report.rootOrResearchBarrelExportAuthorized).toBe(false);
    expect(report.packageExportOrScriptMutationAuthorized).toBe(false);
    expect(report.entrypointPersistenceAuthorized).toBe(false);
    expect(report.coreRuleRegistryIntegrationAuthorized).toBe(false);
    expect(report.productionEnforcementAuthorized).toBe(false);
    expect(report.immediatelyExecutableDedicatedEntrypointContractLaneCount).toBe(1);
    expect(report.immediatelyExecutablePublicExportLaneCount).toBe(0);
    expect(report.immediatelyExecutableCoreRegistryIntegrationLaneCount).toBe(0);
    expect(report.immediatelyExecutableSemanticRuleLaneCount).toBe(0);
    expect(report.selectedImmediateNextLane).toBe(
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_CONTRACT',
    );
  });

  test('preserves authority holds and freezes sixteen readiness controls', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchOnlyProposalAuthoringEntrypointReadinessReview(
        acceptedB72(),
      );

    expect(report.controlIds).toEqual(CAREER_T8_B73_ENTRYPOINT_READINESS_CONTROL_IDS);
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
    expect(report.implementationEffects.authoringEntrypointsCreated).toBe(0);
    expect(report.implementationEffects.publicExportsChanged).toBe(0);
    expect(report.implementationEffects.packageScriptsChanged).toBe(0);
    expect(report.implementationEffects.coreRegistryBehaviorsChanged).toBe(0);
    expect(report.implementationEffects.productionBehaviorsChanged).toBe(0);
  });

  test('fails closed on a tampered B72 content address', () => {
    const b72 = acceptedB72();
    const failed =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchOnlyProposalAuthoringEntrypointReadinessReview({
        ...b72,
        auditId: `${b72.auditId}_tampered`,
      });

    expect(failed.status).toBe('UPSTREAM_B72_BOUNDARY_INVALID');
    expect(failed.exactB72BoundaryAccepted).toBe(false);
    expect(failed.entrypointFindingCount).toBe(0);
    expect(failed.dedicatedInternalResearchAuthoringEntrypointContractAuthoringReady).toBe(false);
    expect(failed.immediatelyExecutableDedicatedEntrypointContractLaneCount).toBe(0);
    expect(failed.selectedImmediateNextLane).toBeNull();
    expect(failed.controlCount).toBe(0);
  });
});
