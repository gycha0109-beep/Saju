import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT_VERSION,
  CAREER_T8_B67_ADMISSION_ADAPTER_CONTROL_IDS,
  CAREER_T8_B67_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT,
  type CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardExplicitApplicabilityAdmissionAdapterContractReport,
} from './career-personalization-t8-classical-ziping-negative-clash-method-guard-explicit-applicability-admission-adapter-contract.js';

export const CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ADAPTER_INTEGRATION_READINESS_REVIEW_VERSION =
  'myeonghwa-career-personalization-t8-classical-ziping-negative-clash-method-guard-research-admission-adapter-integration-readiness-review-v1' as const;

export const CAREER_T8_B68_REVIEWED_REPOSITORY_COMMIT_SHA =
  '3d7d87145453b731fa44d113883b2723fcbb3ed8' as const;

export type CareerT8B68IntegrationFindingId =
  | 'B67_STANDALONE_ADAPTER_EXECUTABLE'
  | 'CORE_SUBJECT_APPLICABILITY_BINDING_ABSENT'
  | 'CORE_REGISTRY_ADMISSION_HOOK_ABSENT'
  | 'SNAPSHOT_RESEARCH_EVIDENCE_ENVELOPE_NOT_REUSABLE_FOR_METHOD_ADMISSION'
  | 'RESEARCH_METHOD_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_ABSENT';

export interface CareerT8B68IntegrationFinding {
  findingId: CareerT8B68IntegrationFindingId;
  path: string;
  blobSha: string;
  present: boolean;
  directCoreIntegrationBlocker: boolean;
  finding: string;
}

export const CAREER_T8_B68_INTEGRATION_FINDINGS = Object.freeze([
  Object.freeze({
    findingId: 'B67_STANDALONE_ADAPTER_EXECUTABLE',
    path: 'src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-explicit-applicability-admission-adapter-contract.ts',
    blobSha: 'aba1fc0f8c95b6cc7b37c428dc07920026a4fc91',
    present: true,
    directCoreIntegrationBlocker: false,
    finding:
      'B67 now provides an executable deterministic research-only adapter that requires explicit applicability, exact subject content binding, identity binding, a complete five-field B64 proposal shape, and zero guard violations.',
  }),
  Object.freeze({
    findingId: 'CORE_SUBJECT_APPLICABILITY_BINDING_ABSENT',
    path: 'src/contracts/interpretation.ts',
    blobSha: '6979d42e5a6d4a2e05d084f92f606c40a71848cd',
    present: false,
    directCoreIntegrationBlocker: true,
    finding:
      'RuleDefinition, MethodologyDefinition, and ReviewAttestation still have no governed field that declares B64 applicability or binds a B67 admission decision. Core objects therefore cannot safely trigger the adapter without an unauthorized scope inference.',
  }),
  Object.freeze({
    findingId: 'CORE_REGISTRY_ADMISSION_HOOK_ABSENT',
    path: 'src/interpretation/rule-registry.ts',
    blobSha: 'd77affbbb144720af5ae1ea1170b3042906a4719',
    present: false,
    directCoreIntegrationBlocker: true,
    finding:
      'createRuleRegistrySnapshot still exposes fixed generic validation only and no scoped external admission-policy hook. Wiring B67 directly here would require a separate governed core-contract change.',
  }),
  Object.freeze({
    findingId: 'SNAPSHOT_RESEARCH_EVIDENCE_ENVELOPE_NOT_REUSABLE_FOR_METHOD_ADMISSION',
    path: 'src/interpretation/research-evidence.ts',
    blobSha: '6d3e05cd08e129f12319a163880c6dd5d4df0fc1',
    present: true,
    directCoreIntegrationBlocker: false,
    finding:
      'ResearchEvidenceEnvelope is explicitly bound to a CanonicalSajuSnapshot by snapshotId and snapshotHash. A method-authoring admission record is repository-governance evidence, not chart evidence, so reusing this envelope would create a false snapshot dependency and is not authorized.',
  }),
  Object.freeze({
    findingId: 'RESEARCH_METHOD_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_ABSENT',
    path: 'src/research/career-personalization-methodology-gate.ts',
    blobSha: '53dc67b2b23064f67a2a883e54ffcbe9e0deb282',
    present: false,
    directCoreIntegrationBlocker: false,
    finding:
      'Current Career research methodology gates are static governed inventories, not a reusable proposal-submission pipeline. The repository has no content-addressed research method proposal envelope that carries explicit B67 applicability and no admission record contract that binds the B67 decision to that proposal.',
  }),
] as const satisfies readonly CareerT8B68IntegrationFinding[]);

export const CAREER_T8_B68_INTEGRATION_READINESS_CONTROL_IDS = Object.freeze([
  'B68_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B67_ADAPTER_BOUNDARY',
  'B67_STANDALONE_ADAPTER_IS_EXECUTABLE_AND_FAIL_CLOSED',
  'DIRECT_CORE_REGISTRY_INTEGRATION_REMAINS_BLOCKED_WITHOUT_EXPLICIT_CORE_APPLICABILITY_BINDING',
  'DIRECT_CORE_REGISTRY_INTEGRATION_REMAINS_BLOCKED_WITHOUT_A_SCOPED_ADMISSION_HOOK',
  'B67_APPLICABILITY_MAY_NOT_BE_INFERRED_FROM_TAXONOMY_FAMILY_RULE_SET_OR_INPUT_PATH',
  'SNAPSHOT_BOUND_RESEARCH_EVIDENCE_ENVELOPES_MAY_NOT_BE_REPURPOSED_AS_METHOD_AUTHORING_ADMISSION_RECORDS',
  'A_METHOD_PROPOSAL_ENVELOPE_MUST_BE_REPOSITORY_GOVERNANCE_BOUND_NOT_SAJU_SNAPSHOT_BOUND',
  'A_METHOD_PROPOSAL_ENVELOPE_MUST_BIND_EXPLICIT_B67_APPLICABILITY_SUBJECT_REF_SUBJECT_HASH_AND_FIVE_FIELD_PROPOSAL_SHAPE',
  'AN_ADMISSION_RECORD_MUST_BIND_THE_EXACT_B67_DECISION_ID_AND_PROPOSAL_ENVELOPE_CONTENT_ADDRESS',
  'REJECTED_B67_DECISIONS_MAY_BE_RECORDED_BUT_MAY_NOT_AUTHORIZE_RULE_OR_METHODOLOGY_ADMISSION',
  'NO_CORE_RULE_METHODOLOGY_REVIEW_ATTESTATION_OR_REGISTRY_SCHEMA_MUTATION_IS_AUTHORIZED_BY_THIS_GATE',
  'NO_CORE_REGISTRY_BEHAVIOR_OR_PRODUCTION_BEHAVIOR_IS_CHANGED_BY_THIS_GATE',
  'A_RESEARCH_ONLY_METHOD_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTRACT_IS_READY_TO_AUTHOR',
  'NO_POSITIVE_CLASH_EFFECT_T6_INPUT_CONTRACT_OR_CURRENT_CAREER_SEMANTIC_BRIDGE_IS_CREATED',
  'B61_VISUAL_HOLD_B56_CHEN_ZEZHEN_HOLD_AND_ALL_SIX_HISTORICAL_CAREER_T8_GAPS_REMAIN_OPEN',
  'THE_ONLY_IMMEDIATE_CONTINUATION_IS_THE_RESEARCH_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTRACT',
] as const);

export interface CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionAdapterIntegrationReadinessReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ADAPTER_INTEGRATION_READINESS_REVIEW_VERSION;
  status:
    | 'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ADAPTER_INTEGRATION_READINESS_REVIEW'
    | 'UPSTREAM_B67_BOUNDARY_INVALID';
  decision:
    | 'B67_STANDALONE_ADAPTER_VALID_DIRECT_CORE_INTEGRATION_NOT_READY_RESEARCH_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTRACT_READY'
    | 'RESEARCH_ADMISSION_ADAPTER_INTEGRATION_READINESS_NOT_ESTABLISHED';
  upstreamB67MaterializationId: string;
  exactB67BoundaryAccepted: boolean;
  reviewedRepository: 'gycha0109-beep/Saju';
  reviewedRepositoryCommitSha: typeof CAREER_T8_B68_REVIEWED_REPOSITORY_COMMIT_SHA;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  integrationFindings: readonly CareerT8B68IntegrationFinding[];
  integrationFindingCount: 5 | 0;
  standaloneB67AdapterExecutable: boolean;
  directCoreRegistryIntegrationReady: false;
  snapshotResearchEvidenceEnvelopeReusableForMethodAdmission: false;
  researchMethodProposalEnvelopePresent: false;
  researchAdmissionRecordPresent: false;
  researchMethodProposalEnvelopeContractAuthoringReady: boolean;
  researchAdmissionRecordContractAuthoringReady: boolean;
  coreContractSchemaMutationAuthorized: false;
  coreRuleRegistryMutationAuthorized: false;
  researchAdmissionAdapterIntegrated: false;
  immediatelyExecutableProposalEnvelopeAndAdmissionRecordContractLaneCount: 1 | 0;
  immediatelyExecutableCoreRegistryIntegrationLaneCount: 0;
  immediatelyExecutableSemanticRuleLaneCount: 0;
  selectedImmediateNextLane:
    | 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTRACT'
    | null;
  positiveT6InputContractEstablished: false;
  positiveClashEffectContractEstablished: false;
  branchSourceOrMethodTriggerActivationCount: 0;
  currentCareerSemanticBridgeEstablished: false;
  visualCorroborationHoldPreserved: boolean;
  b56ChenZezhenHoldPreserved: boolean;
  allSixHistoricalGapsRemainOpen: true;
  unresolvedGapIds: typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS;
  t5RuleAuthoringAuthorizedByThisGate: false;
  t6PositiveEffectRuleAuthoringAuthorizedByThisGate: false;
  t8RuleAuthoringAuthorizedByThisGate: false;
  consumerNarrativeAuthorizedByThisGate: false;
  productionEnforcementAuthorized: false;
  productionPromotionAuthorized: false;
  productionImpact: 'NONE';
  controlIds: readonly (typeof CAREER_T8_B68_INTEGRATION_READINESS_CONTROL_IDS)[number][];
  controlCount: 16 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    integrationReadinessReviewsCreated: 1 | 0;
    integrationFindingsRecorded: 5 | 0;
    proposalEnvelopeContractsCreated: 0;
    admissionRecordContractsCreated: 0;
    coreContractSchemasChanged: 0;
    coreRegistryBehaviorsChanged: 0;
    ruleDefinitionsCreated: 0;
    methodologyDefinitionsCreated: 0;
    productionBehaviorsChanged: 0;
  };
  recommendedNextGate:
    | 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTRACT'
    | 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ADAPTER_INTEGRATION_READINESS_REVIEW';
}

function exactB67Accepted(
  b67: CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardExplicitApplicabilityAdmissionAdapterContractReport,
): boolean {
  const { materializationId, ...material } = b67;
  return (
    materializationId ===
      `career_personalization_t8_classical_ziping_negative_clash_method_guard_explicit_applicability_admission_adapter_contract_${deterministicContentHash(material).slice(0, 24)}` &&
    b67.materializationVersion ===
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT_VERSION &&
    b67.status ===
      'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT' &&
    b67.decision ===
      'RESEARCH_ONLY_EXPLICIT_APPLICABILITY_CONTENT_ADDRESSED_ADMISSION_ADAPTER_MATERIALIZED_FAIL_CLOSED_CORE_REGISTRY_INTEGRATION_DEFERRED' &&
    b67.exactB66BoundaryAccepted &&
    b67.adapterContractCreatedByThisGate &&
    b67.executableAdmissionEvaluatorCreatedByThisGate &&
    b67.adapterContract !== null &&
    deterministicContentHash(b67.adapterContract) ===
      deterministicContentHash(CAREER_T8_B67_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT) &&
    b67.explicitApplicabilityRequired &&
    b67.contentAddressedSubjectBindingRequired &&
    b67.subjectIdentityBindingRequired &&
    b67.completeB64ProposalShapeRequired &&
    b67.deterministicB64GuardEvaluationRequired &&
    b67.failClosedAdmissionRequired &&
    b67.implicitApplicabilityInferenceAuthorized === false &&
    b67.coreRuleRegistryIntegrationEnabled === false &&
    b67.coreContractSchemaMutationAuthorized === false &&
    b67.productionEnforcementAuthorized === false &&
    b67.immediatelyExecutableIntegrationReadinessReviewLaneCount === 1 &&
    b67.immediatelyExecutableCoreRegistryMutationLaneCount === 0 &&
    b67.immediatelyExecutableSemanticRuleLaneCount === 0 &&
    b67.selectedImmediateNextLane ===
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ADAPTER_INTEGRATION_READINESS_REVIEW' &&
    b67.positiveT6InputContractEstablished === false &&
    b67.positiveClashEffectContractEstablished === false &&
    b67.branchSourceOrMethodTriggerActivationCount === 0 &&
    b67.currentCareerSemanticBridgeEstablished === false &&
    b67.visualCorroborationHoldPreserved &&
    b67.b56ChenZezhenHoldPreserved &&
    b67.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b67.unresolvedGapIds) ===
      deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b67.productionPromotionAuthorized === false &&
    b67.productionImpact === 'NONE' &&
    b67.controlCount === 16 &&
    b67.controlsFrozen &&
    deterministicContentHash(b67.controlIds) ===
      deterministicContentHash(CAREER_T8_B67_ADMISSION_ADAPTER_CONTROL_IDS) &&
    b67.implementationEffects.adapterContractsCreated === 1 &&
    b67.implementationEffects.executableAdmissionEvaluatorsCreated === 1 &&
    b67.implementationEffects.coreContractSchemasChanged === 0 &&
    b67.implementationEffects.coreRegistryBehaviorsChanged === 0 &&
    b67.implementationEffects.productionBehaviorsChanged === 0 &&
    b67.recommendedNextGate ===
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ADAPTER_INTEGRATION_READINESS_REVIEW'
  );
}

function repositoryIntegrationBoundaryValid(): boolean {
  return (
    CAREER_T8_B68_INTEGRATION_FINDINGS.length === 5 &&
    CAREER_T8_B68_INTEGRATION_FINDINGS.every(
      (finding) => /^[0-9a-f]{40}$/.test(finding.blobSha) && finding.finding.trim().length > 0,
    ) &&
    CAREER_T8_B68_INTEGRATION_FINDINGS.filter((finding) => finding.directCoreIntegrationBlocker)
      .length === 2 &&
    CAREER_T8_B68_INTEGRATION_READINESS_CONTROL_IDS.length === 16
  );
}

export function buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionAdapterIntegrationReadinessReview(
  b67: CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardExplicitApplicabilityAdmissionAdapterContractReport,
): CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionAdapterIntegrationReadinessReviewReport {
  const accepted = exactB67Accepted(b67) && repositoryIntegrationBoundaryValid();
  const material = {
    reviewVersion:
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ADAPTER_INTEGRATION_READINESS_REVIEW_VERSION,
    status: accepted
      ? ('RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ADAPTER_INTEGRATION_READINESS_REVIEW' as const)
      : ('UPSTREAM_B67_BOUNDARY_INVALID' as const),
    decision: accepted
      ? ('B67_STANDALONE_ADAPTER_VALID_DIRECT_CORE_INTEGRATION_NOT_READY_RESEARCH_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTRACT_READY' as const)
      : ('RESEARCH_ADMISSION_ADAPTER_INTEGRATION_READINESS_NOT_ESTABLISHED' as const),
    upstreamB67MaterializationId: b67.materializationId,
    exactB67BoundaryAccepted: accepted,
    reviewedRepository: 'gycha0109-beep/Saju' as const,
    reviewedRepositoryCommitSha: CAREER_T8_B68_REVIEWED_REPOSITORY_COMMIT_SHA,
    domain: 'career' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    integrationFindings: accepted ? CAREER_T8_B68_INTEGRATION_FINDINGS : Object.freeze([]),
    integrationFindingCount: accepted ? (5 as const) : (0 as const),
    standaloneB67AdapterExecutable: accepted,
    directCoreRegistryIntegrationReady: false as const,
    snapshotResearchEvidenceEnvelopeReusableForMethodAdmission: false as const,
    researchMethodProposalEnvelopePresent: false as const,
    researchAdmissionRecordPresent: false as const,
    researchMethodProposalEnvelopeContractAuthoringReady: accepted,
    researchAdmissionRecordContractAuthoringReady: accepted,
    coreContractSchemaMutationAuthorized: false as const,
    coreRuleRegistryMutationAuthorized: false as const,
    researchAdmissionAdapterIntegrated: false as const,
    immediatelyExecutableProposalEnvelopeAndAdmissionRecordContractLaneCount: accepted
      ? (1 as const)
      : (0 as const),
    immediatelyExecutableCoreRegistryIntegrationLaneCount: 0 as const,
    immediatelyExecutableSemanticRuleLaneCount: 0 as const,
    selectedImmediateNextLane: accepted
      ? ('BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTRACT' as const)
      : null,
    positiveT6InputContractEstablished: false as const,
    positiveClashEffectContractEstablished: false as const,
    branchSourceOrMethodTriggerActivationCount: 0 as const,
    currentCareerSemanticBridgeEstablished: false as const,
    visualCorroborationHoldPreserved: accepted && b67.visualCorroborationHoldPreserved,
    b56ChenZezhenHoldPreserved: accepted && b67.b56ChenZezhenHoldPreserved,
    allSixHistoricalGapsRemainOpen: true as const,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    t5RuleAuthoringAuthorizedByThisGate: false as const,
    t6PositiveEffectRuleAuthoringAuthorizedByThisGate: false as const,
    t8RuleAuthoringAuthorizedByThisGate: false as const,
    consumerNarrativeAuthorizedByThisGate: false as const,
    productionEnforcementAuthorized: false as const,
    productionPromotionAuthorized: false as const,
    productionImpact: 'NONE' as const,
    controlIds: accepted ? CAREER_T8_B68_INTEGRATION_READINESS_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? (16 as const) : (0 as const),
    controlsFrozen: accepted,
    implementationEffects: Object.freeze({
      integrationReadinessReviewsCreated: accepted ? (1 as const) : (0 as const),
      integrationFindingsRecorded: accepted ? (5 as const) : (0 as const),
      proposalEnvelopeContractsCreated: 0 as const,
      admissionRecordContractsCreated: 0 as const,
      coreContractSchemasChanged: 0 as const,
      coreRegistryBehaviorsChanged: 0 as const,
      ruleDefinitionsCreated: 0 as const,
      methodologyDefinitionsCreated: 0 as const,
      productionBehaviorsChanged: 0 as const,
    }),
    recommendedNextGate: accepted
      ? ('BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTRACT' as const)
      : ('BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ADAPTER_INTEGRATION_READINESS_REVIEW' as const),
  };
  return {
    reviewId: `career_personalization_t8_classical_ziping_negative_clash_method_guard_research_admission_adapter_integration_readiness_review_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
