import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import type { CareerT8B67ResearchAdmissionCandidate } from './career-personalization-t8-classical-ziping-negative-clash-method-guard-explicit-applicability-admission-adapter-contract.js';
import {
  runCareerT8ClassicalZipingClashMethodResearchProposalAdmissionWorkflow,
  type CareerT8B71ResearchProposalAdmissionWorkflowResult,
} from './career-personalization-t8-classical-ziping-negative-clash-method-guard-standalone-research-proposal-admission-workflow-contract.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ONLY_PROPOSAL_AUTHORING_ENTRYPOINT_READINESS_REVIEW_VERSION,
  CAREER_T8_B73_ENTRYPOINT_FINDINGS,
  CAREER_T8_B73_ENTRYPOINT_READINESS_CONTROL_IDS,
  CAREER_T8_B73_REVIEWED_REPOSITORY_COMMIT_SHA,
  type CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchOnlyProposalAuthoringEntrypointReadinessReviewReport,
} from './career-personalization-t8-classical-ziping-negative-clash-method-guard-research-only-proposal-authoring-entrypoint-readiness-review.js';

export const CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_CONTRACT_VERSION =
  'myeonghwa-career-personalization-t8-classical-ziping-negative-clash-method-guard-dedicated-internal-research-proposal-authoring-entrypoint-contract-v1' as const;

export const CAREER_T8_B74_ENTRYPOINT_VERSION =
  'myeonghwa-career-t8-classical-ziping-clash-method-internal-research-authoring-entrypoint-v1' as const;

export type CareerT8B74AuthoringDecision =
  | 'REJECTED_STRUCTURALLY'
  | 'REJECTED_BY_NEGATIVE_METHOD_GUARD'
  | 'ELIGIBLE_FOR_RESEARCH_AUTHORING';

export interface CareerT8B74ResearchProposalAuthoringEntrypointResult {
  entrypointExecutionId: string;
  entrypointVersion: typeof CAREER_T8_B74_ENTRYPOINT_VERSION;
  workflowId: string;
  workflowStatus: CareerT8B71ResearchProposalAdmissionWorkflowResult['status'];
  authoringDecision: CareerT8B74AuthoringDecision;
  researchAuthoringEligible: boolean;
  proposalEnvelopeId: string | null;
  admissionRecordId: string | null;
  structuralRejectionReasonIds: readonly string[];
  admissionRejectionReasonIds: readonly string[];
  persistenceApplied: false;
  registrationApplied: false;
  promotionApplied: false;
  rootExported: false;
  researchBarrelExported: false;
  packageExported: false;
  coreRegistryIntegrated: false;
  productionAuthorized: false;
}

function assertWorkflowInvariant(
  workflow: CareerT8B71ResearchProposalAdmissionWorkflowResult,
): void {
  if (workflow.status === 'STRUCTURALLY_REJECTED') {
    if (
      workflow.proposalEnvelope !== null ||
      workflow.admissionRecord !== null ||
      workflow.researchAuthoringEligible
    ) {
      throw new Error('B74 entrypoint invariant violation: malformed structural rejection');
    }
    return;
  }

  if (workflow.proposalEnvelope === null || workflow.admissionRecord === null) {
    throw new Error('B74 entrypoint invariant violation: non-structural outcome lacks governance records');
  }

  if (workflow.status === 'GUARD_REJECTED') {
    if (workflow.researchAuthoringEligible || workflow.admissionRecord.authoringAdmissionAuthorized) {
      throw new Error('B74 entrypoint invariant violation: guard rejection carries authoring authority');
    }
    return;
  }

  if (!workflow.researchAuthoringEligible || !workflow.admissionRecord.authoringAdmissionAuthorized) {
    throw new Error('B74 entrypoint invariant violation: admitted workflow lacks authoring authority');
  }
}

function authoringDecision(
  workflow: CareerT8B71ResearchProposalAdmissionWorkflowResult,
): CareerT8B74AuthoringDecision {
  if (workflow.status === 'STRUCTURALLY_REJECTED') return 'REJECTED_STRUCTURALLY';
  if (workflow.status === 'GUARD_REJECTED') return 'REJECTED_BY_NEGATIVE_METHOD_GUARD';
  return 'ELIGIBLE_FOR_RESEARCH_AUTHORING';
}

export function submitCareerT8ClassicalZipingClashMethodResearchProposalForAuthoring(
  candidate: CareerT8B67ResearchAdmissionCandidate,
): CareerT8B74ResearchProposalAuthoringEntrypointResult {
  const workflow = runCareerT8ClassicalZipingClashMethodResearchProposalAdmissionWorkflow(candidate);
  assertWorkflowInvariant(workflow);

  const material = {
    entrypointVersion: CAREER_T8_B74_ENTRYPOINT_VERSION,
    workflowId: workflow.workflowId,
    workflowStatus: workflow.status,
    authoringDecision: authoringDecision(workflow),
    researchAuthoringEligible: workflow.researchAuthoringEligible,
    proposalEnvelopeId: workflow.proposalEnvelope?.envelopeId ?? null,
    admissionRecordId: workflow.admissionRecord?.recordId ?? null,
    structuralRejectionReasonIds: workflow.structuralRejectionReasonIds,
    admissionRejectionReasonIds: workflow.admissionRecord?.rejectionReasonIds ?? Object.freeze([]),
    persistenceApplied: false as const,
    registrationApplied: false as const,
    promotionApplied: false as const,
    rootExported: false as const,
    researchBarrelExported: false as const,
    packageExported: false as const,
    coreRegistryIntegrated: false as const,
    productionAuthorized: false as const,
  };

  return Object.freeze({
    entrypointExecutionId: `career_t8_classical_ziping_clash_method_internal_research_authoring_entrypoint_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  });
}

export const CAREER_T8_B74_INTERNAL_AUTHORING_ENTRYPOINT_CONTROL_IDS = Object.freeze([
  'B74_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B73_ENTRYPOINT_READINESS_BOUNDARY',
  'THE_ENTRYPOINT_ACCEPTS_ONLY_THE_EXISTING_B67_RESEARCH_ADMISSION_CANDIDATE_SHAPE',
  'THE_ENTRYPOINT_DELEGATES_ALL_ADMISSION_LOGIC_TO_THE_EXISTING_B71_WORKFLOW',
  'THE_ENTRYPOINT_MAY_NOT_REIMPLEMENT_OR_OVERRIDE_B64_B67_B69_OR_B71_DECISIONS',
  'STRUCTURAL_REJECTION_REMAINS_STRUCTURAL_REJECTION_WITH_NO_AUTHORING_ELIGIBILITY',
  'GUARD_REJECTION_REMAINS_GUARD_REJECTION_WITH_AUDIT_RECORDS_AND_NO_AUTHORING_ELIGIBILITY',
  'ONLY_B71_ADMISSION_MAY_MAP_TO_RESEARCH_AUTHORING_ELIGIBILITY',
  'THE_ENTRYPOINT_FAILS_ON_INTERNALLY_INCONSISTENT_B71_OUTCOMES',
  'THE_ENTRYPOINT_RESULT_IS_DETERMINISTIC_AND_CONTENT_ADDRESSED',
  'THE_ENTRYPOINT_DOES_NOT_PERSIST_REGISTER_PROMOTE_OR_MUTATE_CANDIDATES',
  'THE_ENTRYPOINT_IS_NOT_EXPORTED_FROM_ROOT_RESEARCH_BARREL_OR_PACKAGE_BY_THIS_GATE',
  'THE_ENTRYPOINT_IS_NOT_BOUND_TO_THE_DEVELOPER_HARNESS_OR_RESEARCH_UX_PREVIEW',
  'NO_CORE_RULE_REGISTRY_INTEGRATION_OR_PRODUCTION_ENFORCEMENT_IS_AUTHORIZED',
  'NO_POSITIVE_CLASH_EFFECT_T6_INPUT_CONTRACT_OR_CURRENT_CAREER_SEMANTIC_BRIDGE_IS_CREATED',
  'B61_VISUAL_HOLD_B56_CHEN_ZEZHEN_HOLD_AND_ALL_SIX_HISTORICAL_CAREER_T8_GAPS_REMAIN_OPEN',
  'THE_ONLY_IMMEDIATE_CONTINUATION_IS_THE_INTERNAL_AUTHORING_ENTRYPOINT_COMPATIBILITY_AUDIT',
] as const);

export interface CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardDedicatedInternalResearchProposalAuthoringEntrypointContractReport {
  materializationId: string;
  materializationVersion: typeof CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_CONTRACT_VERSION;
  status:
    | 'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_CONTRACT'
    | 'UPSTREAM_B73_BOUNDARY_INVALID';
  decision:
    | 'DEDICATED_INTERNAL_RESEARCH_AUTHORING_ENTRYPOINT_MATERIALIZED_B71_DELEGATED_NO_PUBLIC_CORE_PRODUCTION_INTEGRATION'
    | 'DEDICATED_INTERNAL_RESEARCH_AUTHORING_ENTRYPOINT_NOT_MATERIALIZED';
  upstreamB73ReviewId: string;
  exactB73BoundaryAccepted: boolean;
  dedicatedInternalEntrypointCreatedByThisGate: boolean;
  executableEntrypointCreatedByThisGate: boolean;
  delegatesToB71: boolean;
  preservesThreeB71Outcomes: boolean;
  authoringEligibilityMayBypassB71Admission: false;
  persistenceEnabled: false;
  registrationEnabled: false;
  promotionEnabled: false;
  rootExportEnabled: false;
  researchBarrelExportEnabled: false;
  packageExportEnabled: false;
  developerHarnessIntegrationEnabled: false;
  researchUxPreviewIntegrationEnabled: false;
  coreRuleRegistryIntegrationEnabled: false;
  productionEnforcementAuthorized: false;
  immediatelyExecutableCompatibilityAuditLaneCount: 1 | 0;
  immediatelyExecutablePublicExportLaneCount: 0;
  immediatelyExecutableCoreRegistryIntegrationLaneCount: 0;
  immediatelyExecutableSemanticRuleLaneCount: 0;
  selectedImmediateNextLane:
    | 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_COMPATIBILITY_AUDIT'
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
  controlIds: readonly (typeof CAREER_T8_B74_INTERNAL_AUTHORING_ENTRYPOINT_CONTROL_IDS)[number][];
  controlCount: 16 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    internalAuthoringEntrypointsCreated: 1 | 0;
    executableEntrypointsCreated: 1 | 0;
    publicExportsChanged: 0;
    packageExportsChanged: 0;
    packageScriptsChanged: 0;
    persistenceBehaviorsCreated: 0;
    coreRegistryBehaviorsChanged: 0;
    productionBehaviorsChanged: 0;
  };
  recommendedNextGate:
    | 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_COMPATIBILITY_AUDIT'
    | 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ONLY_PROPOSAL_AUTHORING_ENTRYPOINT_READINESS_REVIEW';
}

function exactB73Accepted(
  b73: CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchOnlyProposalAuthoringEntrypointReadinessReviewReport,
): boolean {
  const { reviewId, ...material } = b73;
  return (
    reviewId ===
      `career_personalization_t8_classical_ziping_negative_clash_method_guard_research_only_proposal_authoring_entrypoint_readiness_review_${deterministicContentHash(material).slice(0, 24)}` &&
    b73.reviewVersion ===
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ONLY_PROPOSAL_AUTHORING_ENTRYPOINT_READINESS_REVIEW_VERSION &&
    b73.status ===
      'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ONLY_PROPOSAL_AUTHORING_ENTRYPOINT_READINESS_REVIEW' &&
    b73.decision ===
      'EXISTING_PUBLIC_DEV_AND_UX_ENTRYPOINTS_NOT_REUSABLE_DEDICATED_INTERNAL_RESEARCH_AUTHORING_ENTRYPOINT_CONTRACT_READY' &&
    b73.exactB72BoundaryAccepted &&
    b73.reviewedRepository === 'gycha0109-beep/Saju' &&
    b73.reviewedRepositoryCommitSha === CAREER_T8_B73_REVIEWED_REPOSITORY_COMMIT_SHA &&
    b73.entrypointFindingCount === 6 &&
    b73.existingReusableEntrypointCount === 0 &&
    deterministicContentHash(b73.entrypointFindings) ===
      deterministicContentHash(CAREER_T8_B73_ENTRYPOINT_FINDINGS) &&
    b73.b71InternalWorkflowPrimitiveAvailable &&
    b73.developerHarnessReuseAuthorized === false &&
    b73.researchUxPreviewReuseAuthorized === false &&
    b73.rootOrResearchBarrelExportAuthorized === false &&
    b73.packageExportOrScriptMutationAuthorized === false &&
    b73.dedicatedInternalResearchAuthoringEntrypointContractAuthoringReady &&
    b73.entrypointMustDelegateToB71 &&
    b73.entrypointPersistenceAuthorized === false &&
    b73.coreRuleRegistryIntegrationAuthorized === false &&
    b73.productionEnforcementAuthorized === false &&
    b73.immediatelyExecutableDedicatedEntrypointContractLaneCount === 1 &&
    b73.immediatelyExecutablePublicExportLaneCount === 0 &&
    b73.immediatelyExecutableCoreRegistryIntegrationLaneCount === 0 &&
    b73.immediatelyExecutableSemanticRuleLaneCount === 0 &&
    b73.selectedImmediateNextLane ===
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_CONTRACT' &&
    b73.positiveT6InputContractEstablished === false &&
    b73.positiveClashEffectContractEstablished === false &&
    b73.branchSourceOrMethodTriggerActivationCount === 0 &&
    b73.currentCareerSemanticBridgeEstablished === false &&
    b73.visualCorroborationHoldPreserved &&
    b73.b56ChenZezhenHoldPreserved &&
    b73.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b73.unresolvedGapIds) ===
      deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b73.productionPromotionAuthorized === false &&
    b73.productionImpact === 'NONE' &&
    b73.controlCount === 16 &&
    b73.controlsFrozen &&
    deterministicContentHash(b73.controlIds) ===
      deterministicContentHash(CAREER_T8_B73_ENTRYPOINT_READINESS_CONTROL_IDS) &&
    b73.implementationEffects.authoringEntrypointsCreated === 0 &&
    b73.implementationEffects.publicExportsChanged === 0 &&
    b73.implementationEffects.packageScriptsChanged === 0 &&
    b73.implementationEffects.persistenceBehaviorsCreated === 0 &&
    b73.implementationEffects.coreRegistryBehaviorsChanged === 0 &&
    b73.implementationEffects.productionBehaviorsChanged === 0 &&
    b73.recommendedNextGate ===
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_CONTRACT'
  );
}

export function buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardDedicatedInternalResearchProposalAuthoringEntrypointContract(
  b73: CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchOnlyProposalAuthoringEntrypointReadinessReviewReport,
): CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardDedicatedInternalResearchProposalAuthoringEntrypointContractReport {
  const accepted = exactB73Accepted(b73);
  const material = {
    materializationVersion:
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_CONTRACT_VERSION,
    status: accepted
      ? ('RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_CONTRACT' as const)
      : ('UPSTREAM_B73_BOUNDARY_INVALID' as const),
    decision: accepted
      ? ('DEDICATED_INTERNAL_RESEARCH_AUTHORING_ENTRYPOINT_MATERIALIZED_B71_DELEGATED_NO_PUBLIC_CORE_PRODUCTION_INTEGRATION' as const)
      : ('DEDICATED_INTERNAL_RESEARCH_AUTHORING_ENTRYPOINT_NOT_MATERIALIZED' as const),
    upstreamB73ReviewId: b73.reviewId,
    exactB73BoundaryAccepted: accepted,
    dedicatedInternalEntrypointCreatedByThisGate: accepted,
    executableEntrypointCreatedByThisGate: accepted,
    delegatesToB71: accepted,
    preservesThreeB71Outcomes: accepted,
    authoringEligibilityMayBypassB71Admission: false as const,
    persistenceEnabled: false as const,
    registrationEnabled: false as const,
    promotionEnabled: false as const,
    rootExportEnabled: false as const,
    researchBarrelExportEnabled: false as const,
    packageExportEnabled: false as const,
    developerHarnessIntegrationEnabled: false as const,
    researchUxPreviewIntegrationEnabled: false as const,
    coreRuleRegistryIntegrationEnabled: false as const,
    productionEnforcementAuthorized: false as const,
    immediatelyExecutableCompatibilityAuditLaneCount: accepted ? (1 as const) : (0 as const),
    immediatelyExecutablePublicExportLaneCount: 0 as const,
    immediatelyExecutableCoreRegistryIntegrationLaneCount: 0 as const,
    immediatelyExecutableSemanticRuleLaneCount: 0 as const,
    selectedImmediateNextLane: accepted
      ? ('BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_COMPATIBILITY_AUDIT' as const)
      : null,
    positiveT6InputContractEstablished: false as const,
    positiveClashEffectContractEstablished: false as const,
    branchSourceOrMethodTriggerActivationCount: 0 as const,
    currentCareerSemanticBridgeEstablished: false as const,
    visualCorroborationHoldPreserved: accepted && b73.visualCorroborationHoldPreserved,
    b56ChenZezhenHoldPreserved: accepted && b73.b56ChenZezhenHoldPreserved,
    allSixHistoricalGapsRemainOpen: true as const,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    productionPromotionAuthorized: false as const,
    productionImpact: 'NONE' as const,
    controlIds: accepted ? CAREER_T8_B74_INTERNAL_AUTHORING_ENTRYPOINT_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? (16 as const) : (0 as const),
    controlsFrozen: accepted,
    implementationEffects: Object.freeze({
      internalAuthoringEntrypointsCreated: accepted ? (1 as const) : (0 as const),
      executableEntrypointsCreated: accepted ? (1 as const) : (0 as const),
      publicExportsChanged: 0 as const,
      packageExportsChanged: 0 as const,
      packageScriptsChanged: 0 as const,
      persistenceBehaviorsCreated: 0 as const,
      coreRegistryBehaviorsChanged: 0 as const,
      productionBehaviorsChanged: 0 as const,
    }),
    recommendedNextGate: accepted
      ? ('BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_COMPATIBILITY_AUDIT' as const)
      : ('BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ONLY_PROPOSAL_AUTHORING_ENTRYPOINT_READINESS_REVIEW' as const),
  };

  return {
    materializationId: `career_personalization_t8_classical_ziping_negative_clash_method_guard_dedicated_internal_research_proposal_authoring_entrypoint_contract_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
