import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTRACT_VERSION,
  CAREER_T8_B69_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTROL_IDS,
  type CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchProposalEnvelopeAndAdmissionRecordContractReport,
} from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-research-proposal-envelope-and-admission-record-contract.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_INTEGRATION_READINESS_REVIEW_VERSION,
  CAREER_T8_B70_REVIEWED_REPOSITORY_COMMIT_SHA,
  CAREER_T8_B70_WORKFLOW_FINDINGS,
  CAREER_T8_B70_WORKFLOW_READINESS_CONTROL_IDS,
  buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchProposalAdmissionWorkflowIntegrationReadinessReview,
} from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-research-proposal-admission-workflow-integration-readiness-review.js';

function acceptedB69(): CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchProposalEnvelopeAndAdmissionRecordContractReport {
  const material: Omit<
    CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchProposalEnvelopeAndAdmissionRecordContractReport,
    'materializationId'
  > = {
    materializationVersion:
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTRACT_VERSION,
    status:
      'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTRACT',
    decision:
      'RESEARCH_ONLY_CONTENT_ADDRESSED_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_MATERIALIZED_CORE_INTEGRATION_DEFERRED',
    upstreamB68ReviewId: 'b68_fixture_for_b70',
    exactB68BoundaryAccepted: true,
    proposalEnvelopeContractCreatedByThisGate: true,
    admissionRecordContractCreatedByThisGate: true,
    executableProposalEnvelopeCreatorCreatedByThisGate: true,
    executableAdmissionRecordCreatorCreatedByThisGate: true,
    repositoryGovernanceBindingEstablished: true,
    sajuSnapshotBindingRequired: false,
    structurallyInvalidProposalEnvelopeCreationAuthorized: false,
    rejectedProposalAuditRecordAuthorized: true,
    rejectedProposalAuthoringAdmissionAuthorized: false,
    coreRuleRegistryIntegrationEnabled: false,
    coreContractSchemaMutationAuthorized: false,
    productionEnforcementAuthorized: false,
    immediatelyExecutableWorkflowIntegrationReadinessReviewLaneCount: 1,
    immediatelyExecutableCoreRegistryIntegrationLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane:
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_INTEGRATION_READINESS_REVIEW',
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
    controlIds: CAREER_T8_B69_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTROL_IDS,
    controlCount: 16,
    controlsFrozen: true,
    implementationEffects: Object.freeze({
      proposalEnvelopeContractsCreated: 1,
      admissionRecordContractsCreated: 1,
      executableProposalEnvelopeCreatorsCreated: 1,
      executableAdmissionRecordCreatorsCreated: 1,
      coreContractSchemasChanged: 0,
      coreRegistryBehaviorsChanged: 0,
      ruleDefinitionsCreated: 0,
      methodologyDefinitionsCreated: 0,
      productionBehaviorsChanged: 0,
    }),
    recommendedNextGate:
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_INTEGRATION_READINESS_REVIEW',
  };
  return {
    materializationId: `career_personalization_t8_classical_ziping_negative_clash_method_guard_research_proposal_envelope_and_admission_record_contract_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career T8 classical Zi-Ping B69 proposal-admission workflow integration readiness', () => {
  test('accepts the exact B69 boundary and records the current workflow gap', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchProposalAdmissionWorkflowIntegrationReadinessReview(
        acceptedB69(),
      );
    expect(report.reviewVersion).toBe(
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_INTEGRATION_READINESS_REVIEW_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_INTEGRATION_READINESS_REVIEW',
    );
    expect(report.decision).toBe(
      'B69_GOVERNANCE_PRIMITIVES_VALID_ATOMIC_RESEARCH_ONLY_PROPOSAL_ADMISSION_WORKFLOW_CONTRACT_READY_CORE_INTEGRATION_DEFERRED',
    );
    expect(report.reviewedRepositoryCommitSha).toBe(CAREER_T8_B70_REVIEWED_REPOSITORY_COMMIT_SHA);
    expect(report.workflowFindings).toEqual(CAREER_T8_B70_WORKFLOW_FINDINGS);
    expect(report.workflowFindingCount).toBe(4);
    expect(report.b69GovernancePrimitivesExecutable).toBe(true);
    expect(report.atomicResearchProposalAdmissionWorkflowPresent).toBe(false);
  });

  test('requires the admission record rather than envelope existence for authoring eligibility', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchProposalAdmissionWorkflowIntegrationReadinessReview(
        acceptedB69(),
      );
    expect(report.envelopeExistenceMayAuthorizeResearchAuthoring).toBe(false);
    expect(report.admissionRecordRequiredForResearchAuthoringEligibility).toBe(true);
    expect(report.standaloneWorkflowContractAuthoringReady).toBe(true);
    expect(report.workflowPersistenceAuthorized).toBe(false);
    expect(report.coreRuleRegistryIntegrationReady).toBe(false);
  });

  test('opens only the standalone workflow contract lane and preserves semantic boundaries', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchProposalAdmissionWorkflowIntegrationReadinessReview(
        acceptedB69(),
      );
    expect(report.immediatelyExecutableStandaloneWorkflowContractLaneCount).toBe(1);
    expect(report.immediatelyExecutableCoreRegistryIntegrationLaneCount).toBe(0);
    expect(report.immediatelyExecutableSemanticRuleLaneCount).toBe(0);
    expect(report.selectedImmediateNextLane).toBe(
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_CONTRACT',
    );
    expect(report.positiveT6InputContractEstablished).toBe(false);
    expect(report.positiveClashEffectContractEstablished).toBe(false);
    expect(report.currentCareerSemanticBridgeEstablished).toBe(false);
    expect(report.branchSourceOrMethodTriggerActivationCount).toBe(0);
    expect(report.productionImpact).toBe('NONE');
    expect(report.visualCorroborationHoldPreserved).toBe(true);
    expect(report.b56ChenZezhenHoldPreserved).toBe(true);
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
  });

  test('freezes sixteen workflow-readiness controls', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchProposalAdmissionWorkflowIntegrationReadinessReview(
        acceptedB69(),
      );
    expect(report.controlIds).toEqual(CAREER_T8_B70_WORKFLOW_READINESS_CONTROL_IDS);
    expect(report.controlCount).toBe(16);
    expect(report.controlsFrozen).toBe(true);
  });

  test('is deterministic and fails closed on a tampered B69 materialization address', () => {
    const b69 = acceptedB69();
    const first =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchProposalAdmissionWorkflowIntegrationReadinessReview(
        b69,
      );
    const second =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchProposalAdmissionWorkflowIntegrationReadinessReview(
        b69,
      );
    expect(first).toEqual(second);
    expect(first.reviewId).toBe(second.reviewId);

    const failed =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchProposalAdmissionWorkflowIntegrationReadinessReview({
        ...b69,
        materializationId: `${b69.materializationId}_tampered`,
      });
    expect(failed.status).toBe('UPSTREAM_B69_BOUNDARY_INVALID');
    expect(failed.exactB69BoundaryAccepted).toBe(false);
    expect(failed.workflowFindingCount).toBe(0);
    expect(failed.standaloneWorkflowContractAuthoringReady).toBe(false);
    expect(failed.immediatelyExecutableStandaloneWorkflowContractLaneCount).toBe(0);
    expect(failed.selectedImmediateNextLane).toBeNull();
    expect(failed.controlCount).toBe(0);
  });
});
