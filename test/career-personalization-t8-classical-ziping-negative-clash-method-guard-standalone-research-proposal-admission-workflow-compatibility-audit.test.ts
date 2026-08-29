import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_CONTRACT_VERSION,
  CAREER_T8_B71_STANDALONE_WORKFLOW_CONTROL_IDS,
  type CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardStandaloneResearchProposalAdmissionWorkflowContractReport,
} from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-standalone-research-proposal-admission-workflow-contract.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_COMPATIBILITY_AUDIT_VERSION,
  CAREER_T8_B72_COMPATIBILITY_AUDIT_CONTROL_IDS,
  CAREER_T8_B72_COMPATIBILITY_FINDINGS,
  CAREER_T8_B72_REVIEWED_REPOSITORY_COMMIT_SHA,
  buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardStandaloneResearchProposalAdmissionWorkflowCompatibilityAudit,
} from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-standalone-research-proposal-admission-workflow-compatibility-audit.js';

function acceptedB71(): CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardStandaloneResearchProposalAdmissionWorkflowContractReport {
  const material: Omit<
    CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardStandaloneResearchProposalAdmissionWorkflowContractReport,
    'materializationId'
  > = {
    materializationVersion:
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_CONTRACT_VERSION,
    status:
      'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_CONTRACT',
    decision:
      'ATOMIC_RESEARCH_ONLY_PROPOSAL_ADMISSION_WORKFLOW_MATERIALIZED_THREE_OUTCOMES_CORE_INTEGRATION_DEFERRED',
    upstreamB70ReviewId: 'b70_fixture_for_b72',
    exactB70BoundaryAccepted: true,
    standaloneWorkflowCreatedByThisGate: true,
    executableWorkflowCreatedByThisGate: true,
    workflowOutcomeCount: 3,
    structuralRejectionAuthoringEligible: false,
    guardRejectionAuthoringEligible: false,
    admittedOutcomeRequiresAdmissionRecord: true,
    envelopeExistenceAloneAuthorizesResearchAuthoring: false,
    workflowPersistenceEnabled: false,
    coreRuleRegistryIntegrationEnabled: false,
    productionEnforcementAuthorized: false,
    immediatelyExecutableCompatibilityAuditLaneCount: 1,
    immediatelyExecutableCoreRegistryIntegrationLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane:
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_COMPATIBILITY_AUDIT',
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
    controlIds: CAREER_T8_B71_STANDALONE_WORKFLOW_CONTROL_IDS,
    controlCount: 16,
    controlsFrozen: true,
    implementationEffects: Object.freeze({
      standaloneWorkflowContractsCreated: 1,
      executableWorkflowsCreated: 1,
      persistenceBehaviorsCreated: 0,
      coreContractSchemasChanged: 0,
      coreRegistryBehaviorsChanged: 0,
      ruleDefinitionsCreated: 0,
      methodologyDefinitionsCreated: 0,
      productionBehaviorsChanged: 0,
    }),
    recommendedNextGate:
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_COMPATIBILITY_AUDIT',
  };
  return {
    materializationId: `career_personalization_t8_classical_ziping_negative_clash_method_guard_standalone_research_proposal_admission_workflow_contract_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career T8 classical Zi-Ping B72 standalone workflow compatibility audit', () => {
  test('records six repository findings with zero compatibility violations', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardStandaloneResearchProposalAdmissionWorkflowCompatibilityAudit(
        acceptedB71(),
      );

    expect(report.auditVersion).toBe(
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_COMPATIBILITY_AUDIT_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_COMPATIBILITY_AUDIT',
    );
    expect(report.reviewedRepositoryCommitSha).toBe(CAREER_T8_B72_REVIEWED_REPOSITORY_COMMIT_SHA);
    expect(report.compatibilityFindings).toEqual(CAREER_T8_B72_COMPATIBILITY_FINDINGS);
    expect(report.compatibilityFindingCount).toBe(6);
    expect(report.compatibilityViolationCount).toBe(0);
    expect(report.compatibilityFindings.every((finding) => !finding.compatibilityViolation)).toBe(true);
  });

  test('keeps the workflow isolated from public, core, production, persistence, and registration paths', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardStandaloneResearchProposalAdmissionWorkflowCompatibilityAudit(
        acceptedB71(),
      );

    expect(report.standaloneWorkflowExecutable).toBe(true);
    expect(report.researchBarrelExported).toBe(false);
    expect(report.rootBarrelDirectExported).toBe(false);
    expect(report.packageResearchSubpathExported).toBe(false);
    expect(report.coreRuleRegistryIntegrated).toBe(false);
    expect(report.productionRuntimeIntegrated).toBe(false);
    expect(report.persistenceRegistrationOrPromotionPathPresent).toBe(false);
    expect(report.publicCoreProductionBypassCount).toBe(0);
  });

  test('opens only research-only proposal authoring entrypoint readiness review', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardStandaloneResearchProposalAdmissionWorkflowCompatibilityAudit(
        acceptedB71(),
      );

    expect(report.researchOnlyProposalAuthoringEntrypointReadinessReviewReady).toBe(true);
    expect(report.rootOrPackageExportAuthorizedByThisGate).toBe(false);
    expect(report.coreRuleRegistryIntegrationAuthorizedByThisGate).toBe(false);
    expect(report.productionEnforcementAuthorized).toBe(false);
    expect(report.immediatelyExecutableResearchEntrypointReadinessReviewLaneCount).toBe(1);
    expect(report.immediatelyExecutableCoreRegistryIntegrationLaneCount).toBe(0);
    expect(report.immediatelyExecutableSemanticRuleLaneCount).toBe(0);
    expect(report.selectedImmediateNextLane).toBe(
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ONLY_PROPOSAL_AUTHORING_ENTRYPOINT_READINESS_REVIEW',
    );
    expect(report.controlIds).toEqual(CAREER_T8_B72_COMPATIBILITY_AUDIT_CONTROL_IDS);
    expect(report.controlCount).toBe(16);
    expect(report.controlsFrozen).toBe(true);
  });

  test('preserves all semantic, historical, and production holds', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardStandaloneResearchProposalAdmissionWorkflowCompatibilityAudit(
        acceptedB71(),
      );

    expect(report.positiveT6InputContractEstablished).toBe(false);
    expect(report.positiveClashEffectContractEstablished).toBe(false);
    expect(report.branchSourceOrMethodTriggerActivationCount).toBe(0);
    expect(report.currentCareerSemanticBridgeEstablished).toBe(false);
    expect(report.visualCorroborationHoldPreserved).toBe(true);
    expect(report.b56ChenZezhenHoldPreserved).toBe(true);
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
    expect(report.implementationEffects.publicExportsChanged).toBe(0);
    expect(report.implementationEffects.coreRegistryBehaviorsChanged).toBe(0);
    expect(report.implementationEffects.productionBehaviorsChanged).toBe(0);
  });

  test('fails closed on a tampered B71 materialization address', () => {
    const b71 = acceptedB71();
    const failed =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardStandaloneResearchProposalAdmissionWorkflowCompatibilityAudit({
        ...b71,
        materializationId: `${b71.materializationId}_tampered`,
      });

    expect(failed.status).toBe('UPSTREAM_B71_BOUNDARY_INVALID');
    expect(failed.exactB71BoundaryAccepted).toBe(false);
    expect(failed.compatibilityFindingCount).toBe(0);
    expect(failed.standaloneWorkflowExecutable).toBe(false);
    expect(failed.researchOnlyProposalAuthoringEntrypointReadinessReviewReady).toBe(false);
    expect(failed.immediatelyExecutableResearchEntrypointReadinessReviewLaneCount).toBe(0);
    expect(failed.selectedImmediateNextLane).toBeNull();
    expect(failed.controlCount).toBe(0);
  });
});
