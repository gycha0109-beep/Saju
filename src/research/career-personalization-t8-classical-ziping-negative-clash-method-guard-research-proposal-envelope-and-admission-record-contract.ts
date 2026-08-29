import type { ContentAddressedVersionedRef } from '../contracts/common.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_T8_B67_GUARD_APPLICABILITY_SCOPE,
  evaluateCareerT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionCandidate,
  type CareerT8B67AdmissionSubjectType,
  type CareerT8B67ResearchAdmissionCandidate,
  type CareerT8B67ResearchAdmissionDecision,
  type CareerT8B67StructuralRejectionReasonId,
} from './career-personalization-t8-classical-ziping-negative-clash-method-guard-explicit-applicability-admission-adapter-contract.js';
import type { CareerT8B64ClashMethodProposalShape } from './career-personalization-t8-classical-ziping-negative-clash-method-guard-contract.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ADAPTER_INTEGRATION_READINESS_REVIEW_VERSION,
  CAREER_T8_B68_INTEGRATION_FINDINGS,
  CAREER_T8_B68_INTEGRATION_READINESS_CONTROL_IDS,
  CAREER_T8_B68_REVIEWED_REPOSITORY_COMMIT_SHA,
  type CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionAdapterIntegrationReadinessReviewReport,
} from './career-personalization-t8-classical-ziping-negative-clash-method-guard-research-admission-adapter-integration-readiness-review.js';

export const CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTRACT_VERSION =
  'myeonghwa-career-personalization-t8-classical-ziping-negative-clash-method-guard-research-proposal-envelope-and-admission-record-contract-v1' as const;

export const CAREER_T8_B69_PROPOSAL_ENVELOPE_VERSION =
  'myeonghwa-career-t8-classical-ziping-clash-method-proposal-envelope-v1' as const;
export const CAREER_T8_B69_ADMISSION_RECORD_VERSION =
  'myeonghwa-career-t8-classical-ziping-clash-method-admission-record-v1' as const;

const STRUCTURAL_REJECTION_REASON_IDS = Object.freeze([
  'EXPLICIT_B64_APPLICABILITY_DECLARATION_REQUIRED',
  'ADMISSION_SUBJECT_TYPE_REQUIRED',
  'CONTENT_ADDRESSED_SUBJECT_REFERENCE_REQUIRED',
  'SUBJECT_CONTENT_REQUIRED',
  'SUBJECT_CONTENT_HASH_MISMATCH',
  'SUBJECT_IDENTITY_MISMATCH',
  'COMPLETE_B64_PROPOSAL_SHAPE_REQUIRED',
] as const satisfies readonly CareerT8B67StructuralRejectionReasonId[]);

export interface CareerT8B69ResearchMethodProposalEnvelope {
  envelopeId: string;
  envelopeVersion: typeof CAREER_T8_B69_PROPOSAL_ENVELOPE_VERSION;
  envelopeContentHash: string;
  applicability: typeof CAREER_T8_B67_GUARD_APPLICABILITY_SCOPE;
  subjectType: CareerT8B67AdmissionSubjectType;
  subjectRef: ContentAddressedVersionedRef;
  subjectContentHash: string;
  subjectContent: unknown;
  proposalShape: CareerT8B64ClashMethodProposalShape;
  authority: 'research_only';
  governanceBinding: 'repository_method_authoring';
  snapshotBinding: 'none';
}

export interface CareerT8B69ProposalEnvelopeCreationResult {
  created: boolean;
  envelope: CareerT8B69ResearchMethodProposalEnvelope | null;
  structuralRejectionReasonIds: readonly CareerT8B67StructuralRejectionReasonId[];
}

export interface CareerT8B69ResearchAdmissionRecord {
  recordId: string;
  recordVersion: typeof CAREER_T8_B69_ADMISSION_RECORD_VERSION;
  proposalEnvelopeId: string;
  proposalEnvelopeContentHash: string;
  decisionId: string;
  decisionContentHash: string;
  decisionStatus: CareerT8B67ResearchAdmissionDecision['status'];
  rejectionReasonIds: CareerT8B67ResearchAdmissionDecision['rejectionReasonIds'];
  guardEvaluation: CareerT8B67ResearchAdmissionDecision['guardEvaluation'];
  authoringAdmissionAuthorized: boolean;
  researchOnly: true;
  coreRegistryIntegrated: false;
  productionAuthorized: false;
}

function structuralReasons(
  decision: CareerT8B67ResearchAdmissionDecision,
): readonly CareerT8B67StructuralRejectionReasonId[] {
  const structural = new Set<CareerT8B67StructuralRejectionReasonId>(STRUCTURAL_REJECTION_REASON_IDS);
  return Object.freeze(
    decision.rejectionReasonIds.filter(
      (reason): reason is CareerT8B67StructuralRejectionReasonId =>
        structural.has(reason as CareerT8B67StructuralRejectionReasonId),
    ),
  );
}

function envelopeMaterial(
  applicability: typeof CAREER_T8_B67_GUARD_APPLICABILITY_SCOPE,
  subjectType: CareerT8B67AdmissionSubjectType,
  subjectRef: ContentAddressedVersionedRef,
  subjectContent: unknown,
  proposalShape: CareerT8B64ClashMethodProposalShape,
) {
  return {
    envelopeVersion: CAREER_T8_B69_PROPOSAL_ENVELOPE_VERSION,
    applicability,
    subjectType,
    subjectRef,
    subjectContentHash: deterministicContentHash(subjectContent),
    subjectContent,
    proposalShape,
    authority: 'research_only' as const,
    governanceBinding: 'repository_method_authoring' as const,
    snapshotBinding: 'none' as const,
  };
}

export function createCareerT8ClassicalZipingClashMethodResearchProposalEnvelope(
  candidate: CareerT8B67ResearchAdmissionCandidate,
): CareerT8B69ProposalEnvelopeCreationResult {
  const decision =
    evaluateCareerT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionCandidate(candidate);
  const rejectedStructurally = structuralReasons(decision);
  if (
    rejectedStructurally.length > 0 ||
    decision.subjectType === null ||
    decision.subjectRef === null ||
    decision.proposalShape === null ||
    candidate.subjectContent === undefined
  ) {
    return Object.freeze({
      created: false,
      envelope: null,
      structuralRejectionReasonIds: rejectedStructurally,
    });
  }

  const material = envelopeMaterial(
    CAREER_T8_B67_GUARD_APPLICABILITY_SCOPE,
    decision.subjectType,
    decision.subjectRef,
    candidate.subjectContent,
    decision.proposalShape,
  );
  const envelopeContentHash = deterministicContentHash(material);
  return Object.freeze({
    created: true,
    envelope: Object.freeze({
      envelopeId: `career_t8_classical_ziping_clash_method_proposal_${envelopeContentHash.slice(0, 24)}`,
      envelopeContentHash,
      ...material,
    }),
    structuralRejectionReasonIds: Object.freeze([]),
  });
}

function exactEnvelopeAccepted(envelope: CareerT8B69ResearchMethodProposalEnvelope): boolean {
  const material = envelopeMaterial(
    envelope.applicability,
    envelope.subjectType,
    envelope.subjectRef,
    envelope.subjectContent,
    envelope.proposalShape,
  );
  const expectedHash = deterministicContentHash(material);
  return (
    envelope.envelopeVersion === CAREER_T8_B69_PROPOSAL_ENVELOPE_VERSION &&
    envelope.envelopeContentHash === expectedHash &&
    envelope.envelopeId ===
      `career_t8_classical_ziping_clash_method_proposal_${expectedHash.slice(0, 24)}` &&
    envelope.authority === 'research_only' &&
    envelope.governanceBinding === 'repository_method_authoring' &&
    envelope.snapshotBinding === 'none' &&
    envelope.subjectContentHash === deterministicContentHash(envelope.subjectContent)
  );
}

export function createCareerT8ClassicalZipingClashMethodResearchAdmissionRecord(
  envelope: CareerT8B69ResearchMethodProposalEnvelope,
): CareerT8B69ResearchAdmissionRecord | null {
  if (!exactEnvelopeAccepted(envelope)) return null;
  const decision =
    evaluateCareerT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionCandidate({
      applicability: envelope.applicability,
      subjectType: envelope.subjectType,
      subjectRef: envelope.subjectRef,
      subjectContent: envelope.subjectContent,
      proposalShape: envelope.proposalShape,
    });
  if (structuralReasons(decision).length > 0) return null;

  const material = {
    recordVersion: CAREER_T8_B69_ADMISSION_RECORD_VERSION,
    proposalEnvelopeId: envelope.envelopeId,
    proposalEnvelopeContentHash: envelope.envelopeContentHash,
    decisionId: decision.decisionId,
    decisionContentHash: deterministicContentHash(decision),
    decisionStatus: decision.status,
    rejectionReasonIds: decision.rejectionReasonIds,
    guardEvaluation: decision.guardEvaluation,
    authoringAdmissionAuthorized: decision.status === 'ADMITTED_RESEARCH_METHOD_PROPOSAL',
    researchOnly: true as const,
    coreRegistryIntegrated: false as const,
    productionAuthorized: false as const,
  };
  return Object.freeze({
    recordId: `career_t8_classical_ziping_clash_method_admission_record_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  });
}

export const CAREER_T8_B69_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTROL_IDS = Object.freeze([
  'B69_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B68_INTEGRATION_READINESS_BOUNDARY',
  'THE_PROPOSAL_ENVELOPE_IS_REPOSITORY_GOVERNANCE_BOUND_AND_HAS_NO_SAJU_SNAPSHOT_BINDING',
  'THE_PROPOSAL_ENVELOPE_REQUIRES_EXPLICIT_B67_APPLICABILITY',
  'THE_PROPOSAL_ENVELOPE_BINDS_THE_EXACT_CONTENT_ADDRESSED_RULE_OR_METHODOLOGY_SUBJECT',
  'THE_PROPOSAL_ENVELOPE_BINDS_THE_COMPLETE_FIVE_FIELD_B64_PROPOSAL_SHAPE',
  'STRUCTURALLY_INVALID_B67_CANDIDATES_CANNOT_CREATE_A_PROPOSAL_ENVELOPE',
  'B64_GUARD_VIOLATING_BUT_STRUCTURALLY_VALID_PROPOSALS_MAY_BE_ENVELOPED_FOR_AUDIT',
  'THE_ADMISSION_RECORD_RECOMPUTES_THE_EXACT_B67_DECISION_FROM_THE_ENVELOPE',
  'THE_ADMISSION_RECORD_BINDS_PROPOSAL_ENVELOPE_AND_B67_DECISION_CONTENT_ADDRESSES',
  'ONLY_AN_ADMITTED_B67_DECISION_SETS_AUTHORING_ADMISSION_AUTHORIZED_TRUE',
  'REJECTED_B67_DECISIONS_REMAIN_AUDITABLE_WITHOUT_AUTHORIZING_RULE_OR_METHODOLOGY_ADMISSION',
  'TAMPERED_PROPOSAL_ENVELOPES_CANNOT_CREATE_AN_ADMISSION_RECORD',
  'THE_CONTRACT_IS_RESEARCH_ONLY_AND_IS_NOT_INTEGRATED_INTO_THE_CORE_RULE_REGISTRY',
  'NO_POSITIVE_CLASH_EFFECT_T6_INPUT_CONTRACT_OR_CURRENT_CAREER_SEMANTIC_BRIDGE_IS_CREATED',
  'B61_VISUAL_HOLD_B56_CHEN_ZEZHEN_HOLD_AND_ALL_SIX_HISTORICAL_CAREER_T8_GAPS_REMAIN_OPEN',
  'THE_ONLY_IMMEDIATE_CONTINUATION_IS_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_INTEGRATION_READINESS_REVIEW',
] as const);

export interface CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchProposalEnvelopeAndAdmissionRecordContractReport {
  materializationId: string;
  materializationVersion: typeof CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTRACT_VERSION;
  status:
    | 'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTRACT'
    | 'UPSTREAM_B68_BOUNDARY_INVALID';
  decision:
    | 'RESEARCH_ONLY_CONTENT_ADDRESSED_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_MATERIALIZED_CORE_INTEGRATION_DEFERRED'
    | 'RESEARCH_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_NOT_MATERIALIZED';
  upstreamB68ReviewId: string;
  exactB68BoundaryAccepted: boolean;
  proposalEnvelopeContractCreatedByThisGate: boolean;
  admissionRecordContractCreatedByThisGate: boolean;
  executableProposalEnvelopeCreatorCreatedByThisGate: boolean;
  executableAdmissionRecordCreatorCreatedByThisGate: boolean;
  repositoryGovernanceBindingEstablished: boolean;
  sajuSnapshotBindingRequired: false;
  structurallyInvalidProposalEnvelopeCreationAuthorized: false;
  rejectedProposalAuditRecordAuthorized: boolean;
  rejectedProposalAuthoringAdmissionAuthorized: false;
  coreRuleRegistryIntegrationEnabled: false;
  coreContractSchemaMutationAuthorized: false;
  productionEnforcementAuthorized: false;
  immediatelyExecutableWorkflowIntegrationReadinessReviewLaneCount: 1 | 0;
  immediatelyExecutableCoreRegistryIntegrationLaneCount: 0;
  immediatelyExecutableSemanticRuleLaneCount: 0;
  selectedImmediateNextLane:
    | 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_INTEGRATION_READINESS_REVIEW'
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
  controlIds: readonly (typeof CAREER_T8_B69_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTROL_IDS)[number][];
  controlCount: 16 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    proposalEnvelopeContractsCreated: 1 | 0;
    admissionRecordContractsCreated: 1 | 0;
    executableProposalEnvelopeCreatorsCreated: 1 | 0;
    executableAdmissionRecordCreatorsCreated: 1 | 0;
    coreContractSchemasChanged: 0;
    coreRegistryBehaviorsChanged: 0;
    ruleDefinitionsCreated: 0;
    methodologyDefinitionsCreated: 0;
    productionBehaviorsChanged: 0;
  };
  recommendedNextGate:
    | 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_INTEGRATION_READINESS_REVIEW'
    | 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ADAPTER_INTEGRATION_READINESS_REVIEW';
}

function exactB68Accepted(
  b68: CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionAdapterIntegrationReadinessReviewReport,
): boolean {
  const { reviewId, ...material } = b68;
  return (
    reviewId ===
      `career_personalization_t8_classical_ziping_negative_clash_method_guard_research_admission_adapter_integration_readiness_review_${deterministicContentHash(material).slice(0, 24)}` &&
    b68.reviewVersion ===
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ADAPTER_INTEGRATION_READINESS_REVIEW_VERSION &&
    b68.status ===
      'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ADAPTER_INTEGRATION_READINESS_REVIEW' &&
    b68.decision ===
      'B67_STANDALONE_ADAPTER_VALID_DIRECT_CORE_INTEGRATION_NOT_READY_RESEARCH_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTRACT_READY' &&
    b68.exactB67BoundaryAccepted &&
    b68.reviewedRepository === 'gycha0109-beep/Saju' &&
    b68.reviewedRepositoryCommitSha === CAREER_T8_B68_REVIEWED_REPOSITORY_COMMIT_SHA &&
    b68.integrationFindingCount === 5 &&
    deterministicContentHash(b68.integrationFindings) ===
      deterministicContentHash(CAREER_T8_B68_INTEGRATION_FINDINGS) &&
    b68.standaloneB67AdapterExecutable &&
    b68.directCoreRegistryIntegrationReady === false &&
    b68.snapshotResearchEvidenceEnvelopeReusableForMethodAdmission === false &&
    b68.researchMethodProposalEnvelopePresent === false &&
    b68.researchAdmissionRecordPresent === false &&
    b68.researchMethodProposalEnvelopeContractAuthoringReady &&
    b68.researchAdmissionRecordContractAuthoringReady &&
    b68.coreContractSchemaMutationAuthorized === false &&
    b68.coreRuleRegistryMutationAuthorized === false &&
    b68.researchAdmissionAdapterIntegrated === false &&
    b68.immediatelyExecutableProposalEnvelopeAndAdmissionRecordContractLaneCount === 1 &&
    b68.immediatelyExecutableCoreRegistryIntegrationLaneCount === 0 &&
    b68.immediatelyExecutableSemanticRuleLaneCount === 0 &&
    b68.selectedImmediateNextLane ===
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTRACT' &&
    b68.positiveT6InputContractEstablished === false &&
    b68.positiveClashEffectContractEstablished === false &&
    b68.branchSourceOrMethodTriggerActivationCount === 0 &&
    b68.currentCareerSemanticBridgeEstablished === false &&
    b68.visualCorroborationHoldPreserved &&
    b68.b56ChenZezhenHoldPreserved &&
    b68.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b68.unresolvedGapIds) ===
      deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b68.productionEnforcementAuthorized === false &&
    b68.productionPromotionAuthorized === false &&
    b68.productionImpact === 'NONE' &&
    b68.controlCount === 16 &&
    b68.controlsFrozen &&
    deterministicContentHash(b68.controlIds) ===
      deterministicContentHash(CAREER_T8_B68_INTEGRATION_READINESS_CONTROL_IDS) &&
    b68.implementationEffects.proposalEnvelopeContractsCreated === 0 &&
    b68.implementationEffects.admissionRecordContractsCreated === 0 &&
    b68.implementationEffects.coreContractSchemasChanged === 0 &&
    b68.implementationEffects.coreRegistryBehaviorsChanged === 0 &&
    b68.implementationEffects.productionBehaviorsChanged === 0 &&
    b68.recommendedNextGate ===
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTRACT'
  );
}

export function buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchProposalEnvelopeAndAdmissionRecordContract(
  b68: CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionAdapterIntegrationReadinessReviewReport,
): CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchProposalEnvelopeAndAdmissionRecordContractReport {
  const accepted = exactB68Accepted(b68);
  const material = {
    materializationVersion:
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTRACT_VERSION,
    status: accepted
      ? ('RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTRACT' as const)
      : ('UPSTREAM_B68_BOUNDARY_INVALID' as const),
    decision: accepted
      ? ('RESEARCH_ONLY_CONTENT_ADDRESSED_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_MATERIALIZED_CORE_INTEGRATION_DEFERRED' as const)
      : ('RESEARCH_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_NOT_MATERIALIZED' as const),
    upstreamB68ReviewId: b68.reviewId,
    exactB68BoundaryAccepted: accepted,
    proposalEnvelopeContractCreatedByThisGate: accepted,
    admissionRecordContractCreatedByThisGate: accepted,
    executableProposalEnvelopeCreatorCreatedByThisGate: accepted,
    executableAdmissionRecordCreatorCreatedByThisGate: accepted,
    repositoryGovernanceBindingEstablished: accepted,
    sajuSnapshotBindingRequired: false as const,
    structurallyInvalidProposalEnvelopeCreationAuthorized: false as const,
    rejectedProposalAuditRecordAuthorized: accepted,
    rejectedProposalAuthoringAdmissionAuthorized: false as const,
    coreRuleRegistryIntegrationEnabled: false as const,
    coreContractSchemaMutationAuthorized: false as const,
    productionEnforcementAuthorized: false as const,
    immediatelyExecutableWorkflowIntegrationReadinessReviewLaneCount: accepted ? (1 as const) : (0 as const),
    immediatelyExecutableCoreRegistryIntegrationLaneCount: 0 as const,
    immediatelyExecutableSemanticRuleLaneCount: 0 as const,
    selectedImmediateNextLane: accepted
      ? ('BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_INTEGRATION_READINESS_REVIEW' as const)
      : null,
    positiveT6InputContractEstablished: false as const,
    positiveClashEffectContractEstablished: false as const,
    branchSourceOrMethodTriggerActivationCount: 0 as const,
    currentCareerSemanticBridgeEstablished: false as const,
    visualCorroborationHoldPreserved: accepted && b68.visualCorroborationHoldPreserved,
    b56ChenZezhenHoldPreserved: accepted && b68.b56ChenZezhenHoldPreserved,
    allSixHistoricalGapsRemainOpen: true as const,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    productionPromotionAuthorized: false as const,
    productionImpact: 'NONE' as const,
    controlIds: accepted
      ? CAREER_T8_B69_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted ? (16 as const) : (0 as const),
    controlsFrozen: accepted,
    implementationEffects: Object.freeze({
      proposalEnvelopeContractsCreated: accepted ? (1 as const) : (0 as const),
      admissionRecordContractsCreated: accepted ? (1 as const) : (0 as const),
      executableProposalEnvelopeCreatorsCreated: accepted ? (1 as const) : (0 as const),
      executableAdmissionRecordCreatorsCreated: accepted ? (1 as const) : (0 as const),
      coreContractSchemasChanged: 0 as const,
      coreRegistryBehaviorsChanged: 0 as const,
      ruleDefinitionsCreated: 0 as const,
      methodologyDefinitionsCreated: 0 as const,
      productionBehaviorsChanged: 0 as const,
    }),
    recommendedNextGate: accepted
      ? ('BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_INTEGRATION_READINESS_REVIEW' as const)
      : ('BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ADAPTER_INTEGRATION_READINESS_REVIEW' as const),
  };
  return {
    materializationId: `career_personalization_t8_classical_ziping_negative_clash_method_guard_research_proposal_envelope_and_admission_record_contract_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
