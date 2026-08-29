import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTRACT_VERSION,
  CAREER_T8_B69_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTROL_IDS,
  type CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchProposalEnvelopeAndAdmissionRecordContractReport,
} from './career-personalization-t8-classical-ziping-negative-clash-method-guard-research-proposal-envelope-and-admission-record-contract.js';

export const CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_INTEGRATION_READINESS_REVIEW_VERSION =
  'myeonghwa-career-personalization-t8-classical-ziping-negative-clash-method-guard-research-proposal-admission-workflow-integration-readiness-review-v1' as const;

export const CAREER_T8_B70_REVIEWED_REPOSITORY_COMMIT_SHA =
  'e626340f067996d90430a9e2bd0f331845f1adf7' as const;

export type CareerT8B70WorkflowFindingId =
  | 'B69_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_EXECUTABLE'
  | 'ATOMIC_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_ABSENT'
  | 'ENVELOPE_CREATION_ALONE_NOT_AN_AUTHORIZATION_SIGNAL'
  | 'CORE_REGISTRY_INTEGRATION_STILL_UNAVAILABLE';

export interface CareerT8B70WorkflowFinding {
  findingId: CareerT8B70WorkflowFindingId;
  path: string;
  blobSha: string;
  present: boolean;
  finding: string;
}

export const CAREER_T8_B70_WORKFLOW_FINDINGS = Object.freeze([
  Object.freeze({
    findingId: 'B69_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_EXECUTABLE',
    path: 'src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-research-proposal-envelope-and-admission-record-contract.ts',
    blobSha: '5309651526453001f2b0c236a11e60f42334a5cc',
    present: true,
    finding:
      'B69 provides deterministic executable proposal-envelope and admission-record creators. The admission record recomputes B67 and sets authoringAdmissionAuthorized only for ADMITTED_RESEARCH_METHOD_PROPOSAL.',
  }),
  Object.freeze({
    findingId: 'ATOMIC_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_ABSENT',
    path: 'src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-research-proposal-envelope-and-admission-record-contract.ts',
    blobSha: '5309651526453001f2b0c236a11e60f42334a5cc',
    present: false,
    finding:
      'B69 intentionally exposes envelope creation and admission-record creation as separate primitives. No single research-only workflow currently returns one governed outcome across structural rejection, guard rejection, and admission.',
  }),
  Object.freeze({
    findingId: 'ENVELOPE_CREATION_ALONE_NOT_AN_AUTHORIZATION_SIGNAL',
    path: 'src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-research-proposal-envelope-and-admission-record-contract.ts',
    blobSha: '5309651526453001f2b0c236a11e60f42334a5cc',
    present: true,
    finding:
      'A structurally valid proposal that violates B64 may still receive an envelope for audit. Therefore envelope existence must never be interpreted as research-authoring authorization; the workflow must require an admission record with authoringAdmissionAuthorized=true.',
  }),
  Object.freeze({
    findingId: 'CORE_REGISTRY_INTEGRATION_STILL_UNAVAILABLE',
    path: 'src/interpretation/rule-registry.ts',
    blobSha: 'd77affbbb144720af5ae1ea1170b3042906a4719',
    present: false,
    finding:
      'The generic registry still has no scoped B64/B67 admission hook or explicit applicability binding. A workflow may orchestrate research governance only; it may not register rules or methodologies into the core registry.',
  }),
] as const satisfies readonly CareerT8B70WorkflowFinding[]);

export const CAREER_T8_B70_WORKFLOW_READINESS_CONTROL_IDS = Object.freeze([
  'B70_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B69_GOVERNANCE_CONTRACT_BOUNDARY',
  'B69_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_PRIMITIVES_ARE_EXECUTABLE',
  'A_STRUCTURALLY_VALID_B64_REJECTED_PROPOSAL_MAY_HAVE_AN_ENVELOPE_FOR_AUDIT',
  'PROPOSAL_ENVELOPE_EXISTENCE_MUST_NEVER_AUTHORIZE_RESEARCH_AUTHORING',
  'RESEARCH_AUTHORING_ELIGIBILITY_MUST_REQUIRE_AN_ADMISSION_RECORD_WITH_AUTHORING_ADMISSION_AUTHORIZED_TRUE',
  'AN_ATOMIC_WORKFLOW_MUST_DISTINGUISH_STRUCTURAL_REJECTION_GUARD_REJECTION_AND_ADMISSION',
  'STRUCTURAL_REJECTION_MUST_RETURN_NO_ENVELOPE_NO_RECORD_AND_NO_AUTHORING_AUTHORITY',
  'GUARD_REJECTION_MUST_RETURN_AN_AUDITABLE_ENVELOPE_AND_RECORD_WITH_NO_AUTHORING_AUTHORITY',
  'ADMISSION_MUST_RETURN_AN_ENVELOPE_AND_RECORD_WITH_RESEARCH_AUTHORING_ELIGIBILITY_TRUE',
  'THE_WORKFLOW_RESULT_MUST_BE_DETERMINISTIC_AND_CONTENT_ADDRESSED',
  'THE_WORKFLOW_MAY_NOT_PERSIST_REGISTER_OR_PROMOTE_THE_CANDIDATE',
  'NO_CORE_RULE_METHODOLOGY_REVIEW_ATTESTATION_OR_REGISTRY_SCHEMA_MUTATION_IS_AUTHORIZED',
  'A_STANDALONE_RESEARCH_ONLY_PROPOSAL_ADMISSION_WORKFLOW_CONTRACT_IS_READY_TO_AUTHOR',
  'NO_POSITIVE_CLASH_EFFECT_T6_INPUT_CONTRACT_OR_CURRENT_CAREER_SEMANTIC_BRIDGE_IS_CREATED',
  'B61_VISUAL_HOLD_B56_CHEN_ZEZHEN_HOLD_AND_ALL_SIX_HISTORICAL_CAREER_T8_GAPS_REMAIN_OPEN',
  'THE_ONLY_IMMEDIATE_CONTINUATION_IS_THE_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_CONTRACT',
] as const);

export interface CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchProposalAdmissionWorkflowIntegrationReadinessReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_INTEGRATION_READINESS_REVIEW_VERSION;
  status:
    | 'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_INTEGRATION_READINESS_REVIEW'
    | 'UPSTREAM_B69_BOUNDARY_INVALID';
  decision:
    | 'B69_GOVERNANCE_PRIMITIVES_VALID_ATOMIC_RESEARCH_ONLY_PROPOSAL_ADMISSION_WORKFLOW_CONTRACT_READY_CORE_INTEGRATION_DEFERRED'
    | 'RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_READINESS_NOT_ESTABLISHED';
  upstreamB69MaterializationId: string;
  exactB69BoundaryAccepted: boolean;
  reviewedRepository: 'gycha0109-beep/Saju';
  reviewedRepositoryCommitSha: typeof CAREER_T8_B70_REVIEWED_REPOSITORY_COMMIT_SHA;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  workflowFindings: readonly CareerT8B70WorkflowFinding[];
  workflowFindingCount: 4 | 0;
  b69GovernancePrimitivesExecutable: boolean;
  atomicResearchProposalAdmissionWorkflowPresent: false;
  envelopeExistenceMayAuthorizeResearchAuthoring: false;
  admissionRecordRequiredForResearchAuthoringEligibility: boolean;
  standaloneWorkflowContractAuthoringReady: boolean;
  workflowPersistenceAuthorized: false;
  coreRuleRegistryIntegrationReady: false;
  coreContractSchemaMutationAuthorized: false;
  immediatelyExecutableStandaloneWorkflowContractLaneCount: 1 | 0;
  immediatelyExecutableCoreRegistryIntegrationLaneCount: 0;
  immediatelyExecutableSemanticRuleLaneCount: 0;
  selectedImmediateNextLane:
    | 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_CONTRACT'
    | null;
  positiveT6InputContractEstablished: false;
  positiveClashEffectContractEstablished: false;
  branchSourceOrMethodTriggerActivationCount: 0;
  currentCareerSemanticBridgeEstablished: false;
  visualCorroborationHoldPreserved: boolean;
  b56ChenZezhenHoldPreserved: boolean;
  allSixHistoricalGapsRemainOpen: true;
  unresolvedGapIds: typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS;
  productionEnforcementAuthorized: false;
  productionPromotionAuthorized: false;
  productionImpact: 'NONE';
  controlIds: readonly (typeof CAREER_T8_B70_WORKFLOW_READINESS_CONTROL_IDS)[number][];
  controlCount: 16 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    workflowReadinessReviewsCreated: 1 | 0;
    workflowFindingsRecorded: 4 | 0;
    standaloneWorkflowsCreated: 0;
    persistenceBehaviorsCreated: 0;
    coreContractSchemasChanged: 0;
    coreRegistryBehaviorsChanged: 0;
    ruleDefinitionsCreated: 0;
    methodologyDefinitionsCreated: 0;
    productionBehaviorsChanged: 0;
  };
  recommendedNextGate:
    | 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_CONTRACT'
    | 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_INTEGRATION_READINESS_REVIEW';
}

function exactB69Accepted(
  b69: CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchProposalEnvelopeAndAdmissionRecordContractReport,
): boolean {
  const { materializationId, ...material } = b69;
  return (
    materializationId ===
      `career_personalization_t8_classical_ziping_negative_clash_method_guard_research_proposal_envelope_and_admission_record_contract_${deterministicContentHash(material).slice(0, 24)}` &&
    b69.materializationVersion ===
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTRACT_VERSION &&
    b69.status ===
      'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTRACT' &&
    b69.decision ===
      'RESEARCH_ONLY_CONTENT_ADDRESSED_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_MATERIALIZED_CORE_INTEGRATION_DEFERRED' &&
    b69.exactB68BoundaryAccepted &&
    b69.proposalEnvelopeContractCreatedByThisGate &&
    b69.admissionRecordContractCreatedByThisGate &&
    b69.executableProposalEnvelopeCreatorCreatedByThisGate &&
    b69.executableAdmissionRecordCreatorCreatedByThisGate &&
    b69.repositoryGovernanceBindingEstablished &&
    b69.sajuSnapshotBindingRequired === false &&
    b69.structurallyInvalidProposalEnvelopeCreationAuthorized === false &&
    b69.rejectedProposalAuditRecordAuthorized &&
    b69.rejectedProposalAuthoringAdmissionAuthorized === false &&
    b69.coreRuleRegistryIntegrationEnabled === false &&
    b69.coreContractSchemaMutationAuthorized === false &&
    b69.productionEnforcementAuthorized === false &&
    b69.immediatelyExecutableWorkflowIntegrationReadinessReviewLaneCount === 1 &&
    b69.immediatelyExecutableCoreRegistryIntegrationLaneCount === 0 &&
    b69.immediatelyExecutableSemanticRuleLaneCount === 0 &&
    b69.selectedImmediateNextLane ===
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_INTEGRATION_READINESS_REVIEW' &&
    b69.positiveT6InputContractEstablished === false &&
    b69.positiveClashEffectContractEstablished === false &&
    b69.branchSourceOrMethodTriggerActivationCount === 0 &&
    b69.currentCareerSemanticBridgeEstablished === false &&
    b69.visualCorroborationHoldPreserved &&
    b69.b56ChenZezhenHoldPreserved &&
    b69.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b69.unresolvedGapIds) ===
      deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b69.productionPromotionAuthorized === false &&
    b69.productionImpact === 'NONE' &&
    b69.controlCount === 16 &&
    b69.controlsFrozen &&
    deterministicContentHash(b69.controlIds) ===
      deterministicContentHash(CAREER_T8_B69_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTROL_IDS) &&
    b69.implementationEffects.proposalEnvelopeContractsCreated === 1 &&
    b69.implementationEffects.admissionRecordContractsCreated === 1 &&
    b69.implementationEffects.executableProposalEnvelopeCreatorsCreated === 1 &&
    b69.implementationEffects.executableAdmissionRecordCreatorsCreated === 1 &&
    b69.implementationEffects.coreContractSchemasChanged === 0 &&
    b69.implementationEffects.coreRegistryBehaviorsChanged === 0 &&
    b69.implementationEffects.productionBehaviorsChanged === 0 &&
    b69.recommendedNextGate ===
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_INTEGRATION_READINESS_REVIEW'
  );
}

function repositoryWorkflowBoundaryValid(): boolean {
  return (
    CAREER_T8_B70_WORKFLOW_FINDINGS.length === 4 &&
    CAREER_T8_B70_WORKFLOW_FINDINGS.every(
      (finding) => /^[0-9a-f]{40}$/.test(finding.blobSha) && finding.finding.trim().length > 0,
    ) &&
    CAREER_T8_B70_WORKFLOW_READINESS_CONTROL_IDS.length === 16
  );
}

export function buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchProposalAdmissionWorkflowIntegrationReadinessReview(
  b69: CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchProposalEnvelopeAndAdmissionRecordContractReport,
): CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchProposalAdmissionWorkflowIntegrationReadinessReviewReport {
  const accepted = exactB69Accepted(b69) && repositoryWorkflowBoundaryValid();
  const material = {
    reviewVersion:
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_INTEGRATION_READINESS_REVIEW_VERSION,
    status: accepted
      ? ('RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_INTEGRATION_READINESS_REVIEW' as const)
      : ('UPSTREAM_B69_BOUNDARY_INVALID' as const),
    decision: accepted
      ? ('B69_GOVERNANCE_PRIMITIVES_VALID_ATOMIC_RESEARCH_ONLY_PROPOSAL_ADMISSION_WORKFLOW_CONTRACT_READY_CORE_INTEGRATION_DEFERRED' as const)
      : ('RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_READINESS_NOT_ESTABLISHED' as const),
    upstreamB69MaterializationId: b69.materializationId,
    exactB69BoundaryAccepted: accepted,
    reviewedRepository: 'gycha0109-beep/Saju' as const,
    reviewedRepositoryCommitSha: CAREER_T8_B70_REVIEWED_REPOSITORY_COMMIT_SHA,
    domain: 'career' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    workflowFindings: accepted ? CAREER_T8_B70_WORKFLOW_FINDINGS : Object.freeze([]),
    workflowFindingCount: accepted ? (4 as const) : (0 as const),
    b69GovernancePrimitivesExecutable: accepted,
    atomicResearchProposalAdmissionWorkflowPresent: false as const,
    envelopeExistenceMayAuthorizeResearchAuthoring: false as const,
    admissionRecordRequiredForResearchAuthoringEligibility: accepted,
    standaloneWorkflowContractAuthoringReady: accepted,
    workflowPersistenceAuthorized: false as const,
    coreRuleRegistryIntegrationReady: false as const,
    coreContractSchemaMutationAuthorized: false as const,
    immediatelyExecutableStandaloneWorkflowContractLaneCount: accepted ? (1 as const) : (0 as const),
    immediatelyExecutableCoreRegistryIntegrationLaneCount: 0 as const,
    immediatelyExecutableSemanticRuleLaneCount: 0 as const,
    selectedImmediateNextLane: accepted
      ? ('BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_CONTRACT' as const)
      : null,
    positiveT6InputContractEstablished: false as const,
    positiveClashEffectContractEstablished: false as const,
    branchSourceOrMethodTriggerActivationCount: 0 as const,
    currentCareerSemanticBridgeEstablished: false as const,
    visualCorroborationHoldPreserved: accepted && b69.visualCorroborationHoldPreserved,
    b56ChenZezhenHoldPreserved: accepted && b69.b56ChenZezhenHoldPreserved,
    allSixHistoricalGapsRemainOpen: true as const,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    productionEnforcementAuthorized: false as const,
    productionPromotionAuthorized: false as const,
    productionImpact: 'NONE' as const,
    controlIds: accepted ? CAREER_T8_B70_WORKFLOW_READINESS_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? (16 as const) : (0 as const),
    controlsFrozen: accepted,
    implementationEffects: Object.freeze({
      workflowReadinessReviewsCreated: accepted ? (1 as const) : (0 as const),
      workflowFindingsRecorded: accepted ? (4 as const) : (0 as const),
      standaloneWorkflowsCreated: 0 as const,
      persistenceBehaviorsCreated: 0 as const,
      coreContractSchemasChanged: 0 as const,
      coreRegistryBehaviorsChanged: 0 as const,
      ruleDefinitionsCreated: 0 as const,
      methodologyDefinitionsCreated: 0 as const,
      productionBehaviorsChanged: 0 as const,
    }),
    recommendedNextGate: accepted
      ? ('BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_CONTRACT' as const)
      : ('BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_INTEGRATION_READINESS_REVIEW' as const),
  };
  return {
    reviewId: `career_personalization_t8_classical_ziping_negative_clash_method_guard_research_proposal_admission_workflow_integration_readiness_review_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
