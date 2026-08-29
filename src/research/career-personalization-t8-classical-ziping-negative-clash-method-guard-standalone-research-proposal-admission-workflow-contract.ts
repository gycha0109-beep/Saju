import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import type { CareerT8B67ResearchAdmissionCandidate } from './career-personalization-t8-classical-ziping-negative-clash-method-guard-explicit-applicability-admission-adapter-contract.js';
import {
  createCareerT8ClassicalZipingClashMethodResearchAdmissionRecord,
  createCareerT8ClassicalZipingClashMethodResearchProposalEnvelope,
  type CareerT8B69ResearchAdmissionRecord,
  type CareerT8B69ResearchMethodProposalEnvelope,
} from './career-personalization-t8-classical-ziping-negative-clash-method-guard-research-proposal-envelope-and-admission-record-contract.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_INTEGRATION_READINESS_REVIEW_VERSION,
  CAREER_T8_B70_REVIEWED_REPOSITORY_COMMIT_SHA,
  CAREER_T8_B70_WORKFLOW_FINDINGS,
  CAREER_T8_B70_WORKFLOW_READINESS_CONTROL_IDS,
  type CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchProposalAdmissionWorkflowIntegrationReadinessReviewReport,
} from './career-personalization-t8-classical-ziping-negative-clash-method-guard-research-proposal-admission-workflow-integration-readiness-review.js';

export const CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_CONTRACT_VERSION =
  'myeonghwa-career-personalization-t8-classical-ziping-negative-clash-method-guard-standalone-research-proposal-admission-workflow-contract-v1' as const;

export const CAREER_T8_B71_WORKFLOW_VERSION =
  'myeonghwa-career-t8-classical-ziping-clash-method-research-proposal-admission-workflow-v1' as const;

export type CareerT8B71WorkflowStatus =
  | 'STRUCTURALLY_REJECTED'
  | 'GUARD_REJECTED'
  | 'ADMITTED';

export interface CareerT8B71ResearchProposalAdmissionWorkflowResult {
  workflowId: string;
  workflowVersion: typeof CAREER_T8_B71_WORKFLOW_VERSION;
  candidateContentHash: string;
  status: CareerT8B71WorkflowStatus;
  proposalEnvelope: CareerT8B69ResearchMethodProposalEnvelope | null;
  admissionRecord: CareerT8B69ResearchAdmissionRecord | null;
  structuralRejectionReasonIds: readonly string[];
  researchAuthoringEligible: boolean;
  persistenceApplied: false;
  coreRegistryIntegrated: false;
  productionAuthorized: false;
}

function workflowResultMaterial(
  candidateContentHash: string,
  status: CareerT8B71WorkflowStatus,
  proposalEnvelope: CareerT8B69ResearchMethodProposalEnvelope | null,
  admissionRecord: CareerT8B69ResearchAdmissionRecord | null,
  structuralRejectionReasonIds: readonly string[],
  researchAuthoringEligible: boolean,
) {
  return {
    workflowVersion: CAREER_T8_B71_WORKFLOW_VERSION,
    candidateContentHash,
    status,
    proposalEnvelope,
    admissionRecord,
    structuralRejectionReasonIds,
    researchAuthoringEligible,
    persistenceApplied: false as const,
    coreRegistryIntegrated: false as const,
    productionAuthorized: false as const,
  };
}

export function runCareerT8ClassicalZipingClashMethodResearchProposalAdmissionWorkflow(
  candidate: CareerT8B67ResearchAdmissionCandidate,
): CareerT8B71ResearchProposalAdmissionWorkflowResult {
  const candidateContentHash = deterministicContentHash(candidate);
  const envelopeResult = createCareerT8ClassicalZipingClashMethodResearchProposalEnvelope(candidate);

  if (!envelopeResult.created || envelopeResult.envelope === null) {
    const material = workflowResultMaterial(
      candidateContentHash,
      'STRUCTURALLY_REJECTED',
      null,
      null,
      envelopeResult.structuralRejectionReasonIds,
      false,
    );
    return Object.freeze({
      workflowId: `career_t8_classical_ziping_clash_method_research_proposal_admission_workflow_${deterministicContentHash(material).slice(0, 24)}`,
      ...material,
    });
  }

  const admissionRecord =
    createCareerT8ClassicalZipingClashMethodResearchAdmissionRecord(envelopeResult.envelope);
  if (admissionRecord === null) {
    throw new Error('B71 workflow invariant violation: B69-created envelope did not produce an admission record');
  }

  const admitted = admissionRecord.authoringAdmissionAuthorized;
  const material = workflowResultMaterial(
    candidateContentHash,
    admitted ? 'ADMITTED' : 'GUARD_REJECTED',
    envelopeResult.envelope,
    admissionRecord,
    Object.freeze([]),
    admitted,
  );
  return Object.freeze({
    workflowId: `career_t8_classical_ziping_clash_method_research_proposal_admission_workflow_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  });
}

export const CAREER_T8_B71_STANDALONE_WORKFLOW_CONTROL_IDS = Object.freeze([
  'B71_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B70_WORKFLOW_READINESS_BOUNDARY',
  'THE_WORKFLOW_COMPOSES_ONLY_THE_EXISTING_B69_ENVELOPE_AND_ADMISSION_RECORD_PRIMITIVES',
  'THE_WORKFLOW_RETURNS_EXACTLY_STRUCTURAL_REJECTION_GUARD_REJECTION_OR_ADMISSION',
  'STRUCTURAL_REJECTION_RETURNS_NO_ENVELOPE_NO_RECORD_AND_NO_RESEARCH_AUTHORING_ELIGIBILITY',
  'GUARD_REJECTION_RETURNS_AN_AUDITABLE_ENVELOPE_AND_RECORD_WITH_NO_RESEARCH_AUTHORING_ELIGIBILITY',
  'ADMISSION_REQUIRES_AN_ADMISSION_RECORD_WITH_AUTHORING_ADMISSION_AUTHORIZED_TRUE',
  'ENVELOPE_EXISTENCE_ALONE_NEVER_SETS_RESEARCH_AUTHORING_ELIGIBILITY',
  'THE_WORKFLOW_RESULT_IS_DETERMINISTIC_AND_CONTENT_ADDRESSED',
  'THE_WORKFLOW_IS_REPOSITORY_GOVERNANCE_BOUND_AND_HAS_NO_SAJU_SNAPSHOT_DEPENDENCY',
  'THE_WORKFLOW_DOES_NOT_PERSIST_REGISTER_OR_PROMOTE_THE_CANDIDATE',
  'THE_WORKFLOW_IS_NOT_INTEGRATED_INTO_THE_CORE_RULE_REGISTRY',
  'NO_CORE_RULE_METHODOLOGY_REVIEW_ATTESTATION_OR_REGISTRY_SCHEMA_MUTATION_IS_CREATED',
  'NO_POSITIVE_CLASH_EFFECT_T6_INPUT_CONTRACT_OR_CURRENT_CAREER_SEMANTIC_BRIDGE_IS_CREATED',
  'B48_STYLE_SOURCE_OR_METHOD_TRIGGER_REMAINS_UNSATISFIED',
  'B61_VISUAL_HOLD_B56_CHEN_ZEZHEN_HOLD_AND_ALL_SIX_HISTORICAL_CAREER_T8_GAPS_REMAIN_OPEN',
  'THE_ONLY_IMMEDIATE_CONTINUATION_IS_A_STANDALONE_WORKFLOW_COMPATIBILITY_AUDIT',
] as const);

export interface CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardStandaloneResearchProposalAdmissionWorkflowContractReport {
  materializationId: string;
  materializationVersion: typeof CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_CONTRACT_VERSION;
  status:
    | 'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_CONTRACT'
    | 'UPSTREAM_B70_BOUNDARY_INVALID';
  decision:
    | 'ATOMIC_RESEARCH_ONLY_PROPOSAL_ADMISSION_WORKFLOW_MATERIALIZED_THREE_OUTCOMES_CORE_INTEGRATION_DEFERRED'
    | 'STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_NOT_MATERIALIZED';
  upstreamB70ReviewId: string;
  exactB70BoundaryAccepted: boolean;
  standaloneWorkflowCreatedByThisGate: boolean;
  executableWorkflowCreatedByThisGate: boolean;
  workflowOutcomeCount: 3 | 0;
  structuralRejectionAuthoringEligible: false;
  guardRejectionAuthoringEligible: false;
  admittedOutcomeRequiresAdmissionRecord: boolean;
  envelopeExistenceAloneAuthorizesResearchAuthoring: false;
  workflowPersistenceEnabled: false;
  coreRuleRegistryIntegrationEnabled: false;
  productionEnforcementAuthorized: false;
  immediatelyExecutableCompatibilityAuditLaneCount: 1 | 0;
  immediatelyExecutableCoreRegistryIntegrationLaneCount: 0;
  immediatelyExecutableSemanticRuleLaneCount: 0;
  selectedImmediateNextLane:
    | 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_COMPATIBILITY_AUDIT'
    | null;
  positiveT6InputContractEstablished: false;
  positiveClashEffectContractEstablished: false;
  branchSourceOrMethodTriggerActivationCount: 0;
  currentCareerSemanticBridgeEstablished: false;
  visualCorroborationHoldPreserved: boolean;
  b56ChenZezhenHoldPreserved: boolean;
  allSixHistoricalGapsRemainOpen: true;
  unresolvedGapIds: typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS;
  productionPromotionAuthorized: false;
  productionImpact: 'NONE';
  controlIds: readonly (typeof CAREER_T8_B71_STANDALONE_WORKFLOW_CONTROL_IDS)[number][];
  controlCount: 16 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    standaloneWorkflowContractsCreated: 1 | 0;
    executableWorkflowsCreated: 1 | 0;
    persistenceBehaviorsCreated: 0;
    coreContractSchemasChanged: 0;
    coreRegistryBehaviorsChanged: 0;
    ruleDefinitionsCreated: 0;
    methodologyDefinitionsCreated: 0;
    productionBehaviorsChanged: 0;
  };
  recommendedNextGate:
    | 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_COMPATIBILITY_AUDIT'
    | 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_INTEGRATION_READINESS_REVIEW';
}

function exactB70Accepted(
  b70: CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchProposalAdmissionWorkflowIntegrationReadinessReviewReport,
): boolean {
  const { reviewId, ...material } = b70;
  return (
    reviewId ===
      `career_personalization_t8_classical_ziping_negative_clash_method_guard_research_proposal_admission_workflow_integration_readiness_review_${deterministicContentHash(material).slice(0, 24)}` &&
    b70.reviewVersion ===
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_INTEGRATION_READINESS_REVIEW_VERSION &&
    b70.status ===
      'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_INTEGRATION_READINESS_REVIEW' &&
    b70.decision ===
      'B69_GOVERNANCE_PRIMITIVES_VALID_ATOMIC_RESEARCH_ONLY_PROPOSAL_ADMISSION_WORKFLOW_CONTRACT_READY_CORE_INTEGRATION_DEFERRED' &&
    b70.exactB69BoundaryAccepted &&
    b70.reviewedRepository === 'gycha0109-beep/Saju' &&
    b70.reviewedRepositoryCommitSha === CAREER_T8_B70_REVIEWED_REPOSITORY_COMMIT_SHA &&
    b70.workflowFindingCount === 4 &&
    deterministicContentHash(b70.workflowFindings) === deterministicContentHash(CAREER_T8_B70_WORKFLOW_FINDINGS) &&
    b70.b69GovernancePrimitivesExecutable &&
    b70.atomicResearchProposalAdmissionWorkflowPresent === false &&
    b70.envelopeExistenceMayAuthorizeResearchAuthoring === false &&
    b70.admissionRecordRequiredForResearchAuthoringEligibility &&
    b70.standaloneWorkflowContractAuthoringReady &&
    b70.workflowPersistenceAuthorized === false &&
    b70.coreRuleRegistryIntegrationReady === false &&
    b70.coreContractSchemaMutationAuthorized === false &&
    b70.immediatelyExecutableStandaloneWorkflowContractLaneCount === 1 &&
    b70.immediatelyExecutableCoreRegistryIntegrationLaneCount === 0 &&
    b70.immediatelyExecutableSemanticRuleLaneCount === 0 &&
    b70.selectedImmediateNextLane ===
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_CONTRACT' &&
    b70.positiveT6InputContractEstablished === false &&
    b70.positiveClashEffectContractEstablished === false &&
    b70.branchSourceOrMethodTriggerActivationCount === 0 &&
    b70.currentCareerSemanticBridgeEstablished === false &&
    b70.visualCorroborationHoldPreserved &&
    b70.b56ChenZezhenHoldPreserved &&
    b70.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b70.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b70.productionEnforcementAuthorized === false &&
    b70.productionPromotionAuthorized === false &&
    b70.productionImpact === 'NONE' &&
    b70.controlCount === 16 &&
    b70.controlsFrozen &&
    deterministicContentHash(b70.controlIds) === deterministicContentHash(CAREER_T8_B70_WORKFLOW_READINESS_CONTROL_IDS) &&
    b70.implementationEffects.standaloneWorkflowsCreated === 0 &&
    b70.implementationEffects.persistenceBehaviorsCreated === 0 &&
    b70.implementationEffects.coreContractSchemasChanged === 0 &&
    b70.implementationEffects.coreRegistryBehaviorsChanged === 0 &&
    b70.implementationEffects.productionBehaviorsChanged === 0 &&
    b70.recommendedNextGate ===
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_CONTRACT'
  );
}

export function buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardStandaloneResearchProposalAdmissionWorkflowContract(
  b70: CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchProposalAdmissionWorkflowIntegrationReadinessReviewReport,
): CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardStandaloneResearchProposalAdmissionWorkflowContractReport {
  const accepted = exactB70Accepted(b70);
  const material = {
    materializationVersion:
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_CONTRACT_VERSION,
    status: accepted
      ? ('RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_CONTRACT' as const)
      : ('UPSTREAM_B70_BOUNDARY_INVALID' as const),
    decision: accepted
      ? ('ATOMIC_RESEARCH_ONLY_PROPOSAL_ADMISSION_WORKFLOW_MATERIALIZED_THREE_OUTCOMES_CORE_INTEGRATION_DEFERRED' as const)
      : ('STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_NOT_MATERIALIZED' as const),
    upstreamB70ReviewId: b70.reviewId,
    exactB70BoundaryAccepted: accepted,
    standaloneWorkflowCreatedByThisGate: accepted,
    executableWorkflowCreatedByThisGate: accepted,
    workflowOutcomeCount: accepted ? (3 as const) : (0 as const),
    structuralRejectionAuthoringEligible: false as const,
    guardRejectionAuthoringEligible: false as const,
    admittedOutcomeRequiresAdmissionRecord: accepted,
    envelopeExistenceAloneAuthorizesResearchAuthoring: false as const,
    workflowPersistenceEnabled: false as const,
    coreRuleRegistryIntegrationEnabled: false as const,
    productionEnforcementAuthorized: false as const,
    immediatelyExecutableCompatibilityAuditLaneCount: accepted ? (1 as const) : (0 as const),
    immediatelyExecutableCoreRegistryIntegrationLaneCount: 0 as const,
    immediatelyExecutableSemanticRuleLaneCount: 0 as const,
    selectedImmediateNextLane: accepted
      ? ('BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_COMPATIBILITY_AUDIT' as const)
      : null,
    positiveT6InputContractEstablished: false as const,
    positiveClashEffectContractEstablished: false as const,
    branchSourceOrMethodTriggerActivationCount: 0 as const,
    currentCareerSemanticBridgeEstablished: false as const,
    visualCorroborationHoldPreserved: accepted && b70.visualCorroborationHoldPreserved,
    b56ChenZezhenHoldPreserved: accepted && b70.b56ChenZezhenHoldPreserved,
    allSixHistoricalGapsRemainOpen: true as const,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    productionPromotionAuthorized: false as const,
    productionImpact: 'NONE' as const,
    controlIds: accepted ? CAREER_T8_B71_STANDALONE_WORKFLOW_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? (16 as const) : (0 as const),
    controlsFrozen: accepted,
    implementationEffects: Object.freeze({
      standaloneWorkflowContractsCreated: accepted ? (1 as const) : (0 as const),
      executableWorkflowsCreated: accepted ? (1 as const) : (0 as const),
      persistenceBehaviorsCreated: 0 as const,
      coreContractSchemasChanged: 0 as const,
      coreRegistryBehaviorsChanged: 0 as const,
      ruleDefinitionsCreated: 0 as const,
      methodologyDefinitionsCreated: 0 as const,
      productionBehaviorsChanged: 0 as const,
    }),
    recommendedNextGate: accepted
      ? ('BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_COMPATIBILITY_AUDIT' as const)
      : ('BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_INTEGRATION_READINESS_REVIEW' as const),
  };
  return {
    materializationId: `career_personalization_t8_classical_ziping_negative_clash_method_guard_standalone_research_proposal_admission_workflow_contract_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}