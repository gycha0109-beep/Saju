import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import type { CareerT8B64ClashMethodProposalShape } from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-contract.js';
import {
  CAREER_T8_B67_GUARD_APPLICABILITY_SCOPE,
  type CareerT8B67ResearchAdmissionCandidate,
} from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-explicit-applicability-admission-adapter-contract.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_INTEGRATION_READINESS_REVIEW_VERSION,
  CAREER_T8_B70_REVIEWED_REPOSITORY_COMMIT_SHA,
  CAREER_T8_B70_WORKFLOW_FINDINGS,
  CAREER_T8_B70_WORKFLOW_READINESS_CONTROL_IDS,
  type CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchProposalAdmissionWorkflowIntegrationReadinessReviewReport,
} from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-research-proposal-admission-workflow-integration-readiness-review.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_CONTRACT_VERSION,
  CAREER_T8_B71_STANDALONE_WORKFLOW_CONTROL_IDS,
  CAREER_T8_B71_WORKFLOW_VERSION,
  buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardStandaloneResearchProposalAdmissionWorkflowContract,
  runCareerT8ClassicalZipingClashMethodResearchProposalAdmissionWorkflow,
} from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-standalone-research-proposal-admission-workflow-contract.js';

const COMPLIANT_SHAPE = Object.freeze({
  resolvesSemanticEffectFromClashPresenceAlone: false,
  assumesContextFreeUniformDamage: false,
  usesFixedNumericClashOffsetMultiplierOrScalar: false,
  dropsSourceRequiredContextOrAffectedTargetRole: false,
  flattensQualitativelyDivergentEffectClasses: false,
} satisfies CareerT8B64ClashMethodProposalShape);

function subjectContent() {
  return Object.freeze({
    ruleId: 'RULE-B71-WORKFLOW-FIXTURE',
    version: '0.1.0-research',
    ruleSetId: 'b71-fixture',
  });
}

function candidate(
  proposalShape: CareerT8B64ClashMethodProposalShape = COMPLIANT_SHAPE,
): CareerT8B67ResearchAdmissionCandidate {
  const subject = subjectContent();
  return {
    applicability: CAREER_T8_B67_GUARD_APPLICABILITY_SCOPE,
    subjectType: 'rule',
    subjectRef: {
      id: subject.ruleId,
      version: subject.version,
      contentHash: deterministicContentHash(subject),
    },
    subjectContent: subject,
    proposalShape,
  };
}

function acceptedB70(): CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchProposalAdmissionWorkflowIntegrationReadinessReviewReport {
  const material: Omit<
    CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchProposalAdmissionWorkflowIntegrationReadinessReviewReport,
    'reviewId'
  > = {
    reviewVersion:
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_INTEGRATION_READINESS_REVIEW_VERSION,
    status:
      'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_INTEGRATION_READINESS_REVIEW',
    decision:
      'B69_GOVERNANCE_PRIMITIVES_VALID_ATOMIC_RESEARCH_ONLY_PROPOSAL_ADMISSION_WORKFLOW_CONTRACT_READY_CORE_INTEGRATION_DEFERRED',
    upstreamB69MaterializationId: 'b69_fixture_for_b71',
    exactB69BoundaryAccepted: true,
    reviewedRepository: 'gycha0109-beep/Saju',
    reviewedRepositoryCommitSha: CAREER_T8_B70_REVIEWED_REPOSITORY_COMMIT_SHA,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    workflowFindings: CAREER_T8_B70_WORKFLOW_FINDINGS,
    workflowFindingCount: 4,
    b69GovernancePrimitivesExecutable: true,
    atomicResearchProposalAdmissionWorkflowPresent: false,
    envelopeExistenceMayAuthorizeResearchAuthoring: false,
    admissionRecordRequiredForResearchAuthoringEligibility: true,
    standaloneWorkflowContractAuthoringReady: true,
    workflowPersistenceAuthorized: false,
    coreRuleRegistryIntegrationReady: false,
    coreContractSchemaMutationAuthorized: false,
    immediatelyExecutableStandaloneWorkflowContractLaneCount: 1,
    immediatelyExecutableCoreRegistryIntegrationLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane:
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_CONTRACT',
    positiveT6InputContractEstablished: false,
    positiveClashEffectContractEstablished: false,
    branchSourceOrMethodTriggerActivationCount: 0,
    currentCareerSemanticBridgeEstablished: false,
    visualCorroborationHoldPreserved: true,
    b56ChenZezhenHoldPreserved: true,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    productionEnforcementAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: CAREER_T8_B70_WORKFLOW_READINESS_CONTROL_IDS,
    controlCount: 16,
    controlsFrozen: true,
    implementationEffects: Object.freeze({
      workflowReadinessReviewsCreated: 1,
      workflowFindingsRecorded: 4,
      standaloneWorkflowsCreated: 0,
      persistenceBehaviorsCreated: 0,
      coreContractSchemasChanged: 0,
      coreRegistryBehaviorsChanged: 0,
      ruleDefinitionsCreated: 0,
      methodologyDefinitionsCreated: 0,
      productionBehaviorsChanged: 0,
    }),
    recommendedNextGate:
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_CONTRACT',
  };
  return {
    reviewId: `career_personalization_t8_classical_ziping_negative_clash_method_guard_research_proposal_admission_workflow_integration_readiness_review_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career T8 classical Zi-Ping B71 standalone proposal admission workflow', () => {
  test('returns ADMITTED only when the admission record authorizes research authoring', () => {
    const result = runCareerT8ClassicalZipingClashMethodResearchProposalAdmissionWorkflow(candidate());
    expect(result.workflowVersion).toBe(CAREER_T8_B71_WORKFLOW_VERSION);
    expect(result.status).toBe('ADMITTED');
    expect(result.proposalEnvelope).not.toBeNull();
    expect(result.admissionRecord?.decisionStatus).toBe('ADMITTED_RESEARCH_METHOD_PROPOSAL');
    expect(result.admissionRecord?.authoringAdmissionAuthorized).toBe(true);
    expect(result.researchAuthoringEligible).toBe(true);
    expect(result.persistenceApplied).toBe(false);
    expect(result.coreRegistryIntegrated).toBe(false);
    expect(result.productionAuthorized).toBe(false);
  });

  test('returns GUARD_REJECTED with auditable evidence but no authoring eligibility', () => {
    const result = runCareerT8ClassicalZipingClashMethodResearchProposalAdmissionWorkflow(
      candidate({ ...COMPLIANT_SHAPE, assumesContextFreeUniformDamage: true }),
    );
    expect(result.status).toBe('GUARD_REJECTED');
    expect(result.proposalEnvelope).not.toBeNull();
    expect(result.admissionRecord?.decisionStatus).toBe('REJECTED_RESEARCH_METHOD_PROPOSAL');
    expect(result.admissionRecord?.authoringAdmissionAuthorized).toBe(false);
    expect(result.researchAuthoringEligible).toBe(false);
  });

  test('returns STRUCTURALLY_REJECTED without envelope or admission record', () => {
    const subject = subjectContent();
    const result = runCareerT8ClassicalZipingClashMethodResearchProposalAdmissionWorkflow({
      subjectType: 'rule',
      subjectRef: {
        id: subject.ruleId,
        version: subject.version,
        contentHash: deterministicContentHash(subject),
      },
      subjectContent: subject,
      proposalShape: COMPLIANT_SHAPE,
    });
    expect(result.status).toBe('STRUCTURALLY_REJECTED');
    expect(result.proposalEnvelope).toBeNull();
    expect(result.admissionRecord).toBeNull();
    expect(result.structuralRejectionReasonIds).toContain(
      'EXPLICIT_B64_APPLICABILITY_DECLARATION_REQUIRED',
    );
    expect(result.researchAuthoringEligible).toBe(false);
  });

  test('is deterministic for all workflow inputs', () => {
    const first = runCareerT8ClassicalZipingClashMethodResearchProposalAdmissionWorkflow(candidate());
    const second = runCareerT8ClassicalZipingClashMethodResearchProposalAdmissionWorkflow(candidate());
    expect(first).toEqual(second);
    expect(first.workflowId).toBe(second.workflowId);
  });
});

describe('Career T8 classical Zi-Ping B71 workflow contract materialization', () => {
  test('materializes one executable three-outcome research-only workflow', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardStandaloneResearchProposalAdmissionWorkflowContract(
        acceptedB70(),
      );
    expect(report.materializationVersion).toBe(
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_CONTRACT_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_CONTRACT',
    );
    expect(report.standaloneWorkflowCreatedByThisGate).toBe(true);
    expect(report.executableWorkflowCreatedByThisGate).toBe(true);
    expect(report.workflowOutcomeCount).toBe(3);
    expect(report.structuralRejectionAuthoringEligible).toBe(false);
    expect(report.guardRejectionAuthoringEligible).toBe(false);
    expect(report.admittedOutcomeRequiresAdmissionRecord).toBe(true);
    expect(report.envelopeExistenceAloneAuthorizesResearchAuthoring).toBe(false);
    expect(report.workflowPersistenceEnabled).toBe(false);
    expect(report.coreRuleRegistryIntegrationEnabled).toBe(false);
    expect(report.productionImpact).toBe('NONE');
  });

  test('opens only a workflow compatibility audit and preserves all authority holds', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardStandaloneResearchProposalAdmissionWorkflowContract(
        acceptedB70(),
      );
    expect(report.immediatelyExecutableCompatibilityAuditLaneCount).toBe(1);
    expect(report.immediatelyExecutableCoreRegistryIntegrationLaneCount).toBe(0);
    expect(report.immediatelyExecutableSemanticRuleLaneCount).toBe(0);
    expect(report.selectedImmediateNextLane).toBe(
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_COMPATIBILITY_AUDIT',
    );
    expect(report.controlIds).toEqual(CAREER_T8_B71_STANDALONE_WORKFLOW_CONTROL_IDS);
    expect(report.controlCount).toBe(16);
    expect(report.controlsFrozen).toBe(true);
    expect(report.positiveT6InputContractEstablished).toBe(false);
    expect(report.positiveClashEffectContractEstablished).toBe(false);
    expect(report.currentCareerSemanticBridgeEstablished).toBe(false);
    expect(report.branchSourceOrMethodTriggerActivationCount).toBe(0);
    expect(report.visualCorroborationHoldPreserved).toBe(true);
    expect(report.b56ChenZezhenHoldPreserved).toBe(true);
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
  });

  test('fails closed on a tampered B70 review address', () => {
    const b70 = acceptedB70();
    const failed =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardStandaloneResearchProposalAdmissionWorkflowContract({
        ...b70,
        reviewId: `${b70.reviewId}_tampered`,
      });
    expect(failed.status).toBe('UPSTREAM_B70_BOUNDARY_INVALID');
    expect(failed.exactB70BoundaryAccepted).toBe(false);
    expect(failed.standaloneWorkflowCreatedByThisGate).toBe(false);
    expect(failed.executableWorkflowCreatedByThisGate).toBe(false);
    expect(failed.immediatelyExecutableCompatibilityAuditLaneCount).toBe(0);
    expect(failed.selectedImmediateNextLane).toBeNull();
    expect(failed.controlCount).toBe(0);
  });
});
