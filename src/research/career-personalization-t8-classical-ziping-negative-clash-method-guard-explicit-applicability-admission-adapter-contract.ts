import type { ContentAddressedVersionedRef } from '../contracts/common.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_T8_B64_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT,
  evaluateCareerT8ClassicalZipingNegativeClashMethodGuard,
  type CareerT8B64ClashMethodProposalShape,
  type CareerT8B64GuardEvaluation,
  type CareerT8B64NegativeConstraintId,
} from './career-personalization-t8-classical-ziping-negative-clash-method-guard-contract.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ENFORCEMENT_READINESS_REVIEW_VERSION,
  CAREER_T8_B66_ADMISSION_READINESS_CONTROL_IDS,
  CAREER_T8_B66_REPOSITORY_CAPABILITY_FINDINGS,
  CAREER_T8_B66_REVIEWED_REPOSITORY_COMMIT_SHA,
  type CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionEnforcementReadinessReviewReport,
} from './career-personalization-t8-classical-ziping-negative-clash-method-guard-research-admission-enforcement-readiness-review.js';

export const CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT_VERSION =
  'myeonghwa-career-personalization-t8-classical-ziping-negative-clash-method-guard-explicit-applicability-admission-adapter-contract-v1' as const;

export const CAREER_T8_B67_GUARD_APPLICABILITY_SCOPE =
  'CLASSICAL_ZIPING_BRANCH_CLASH_METHOD_PROPOSALS' as const;

export type CareerT8B67AdmissionSubjectType = 'rule' | 'methodology';

export type CareerT8B67StructuralRejectionReasonId =
  | 'EXPLICIT_B64_APPLICABILITY_DECLARATION_REQUIRED'
  | 'ADMISSION_SUBJECT_TYPE_REQUIRED'
  | 'CONTENT_ADDRESSED_SUBJECT_REFERENCE_REQUIRED'
  | 'SUBJECT_CONTENT_REQUIRED'
  | 'SUBJECT_CONTENT_HASH_MISMATCH'
  | 'SUBJECT_IDENTITY_MISMATCH'
  | 'COMPLETE_B64_PROPOSAL_SHAPE_REQUIRED';

export type CareerT8B67AdmissionRejectionReasonId =
  | CareerT8B67StructuralRejectionReasonId
  | CareerT8B64NegativeConstraintId;

export interface CareerT8B67ResearchAdmissionCandidate {
  applicability?: string;
  subjectType?: CareerT8B67AdmissionSubjectType;
  subjectRef?: ContentAddressedVersionedRef;
  subjectContent?: unknown;
  proposalShape?: Partial<CareerT8B64ClashMethodProposalShape>;
}

export interface CareerT8B67ResearchAdmissionDecision {
  decisionId: string;
  adapterVersion: typeof CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT_VERSION;
  guardContractId: typeof CAREER_T8_B64_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT.contractId;
  admissionScope: typeof CAREER_T8_B67_GUARD_APPLICABILITY_SCOPE;
  status: 'ADMITTED_RESEARCH_METHOD_PROPOSAL' | 'REJECTED_RESEARCH_METHOD_PROPOSAL';
  explicitlyApplicable: boolean;
  subjectType: CareerT8B67AdmissionSubjectType | null;
  subjectRef: ContentAddressedVersionedRef | null;
  observedSubjectContentHash: string | null;
  subjectContentBound: boolean;
  subjectIdentityBound: boolean;
  proposalShape: CareerT8B64ClashMethodProposalShape | null;
  guardEvaluation: CareerT8B64GuardEvaluation | null;
  rejectionReasonIds: readonly CareerT8B67AdmissionRejectionReasonId[];
  rejectionReasonCount: number;
  researchOnly: true;
  coreRegistryIntegrated: false;
  productionAuthorized: false;
}

const ADAPTER_CONTRACT_MATERIAL = Object.freeze({
  contractVersion:
    CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT_VERSION,
  contractKind: 'EXPLICIT_APPLICABILITY_CONTENT_ADDRESSED_RESEARCH_ADMISSION_ADAPTER' as const,
  admissionScope: CAREER_T8_B67_GUARD_APPLICABILITY_SCOPE,
  guardContractId: CAREER_T8_B64_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT.contractId,
  allowedSubjectTypes: Object.freeze(['rule', 'methodology'] as const),
  explicitApplicabilityRequired: true as const,
  contentAddressedSubjectBindingRequired: true as const,
  subjectIdentityBindingRequired: true as const,
  completeB64ProposalShapeRequired: true as const,
  deterministicB64GuardEvaluationRequired: true as const,
  failClosed: true as const,
  researchOnly: true as const,
  coreRegistryIntegrated: false as const,
  productionAuthorized: false as const,
});

export const CAREER_T8_B67_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT = Object.freeze({
  contractId: `career_t8_classical_ziping_negative_clash_method_guard_explicit_admission_adapter_${deterministicContentHash(ADAPTER_CONTRACT_MATERIAL).slice(0, 24)}`,
  ...ADAPTER_CONTRACT_MATERIAL,
});

const PROPOSAL_SHAPE_KEYS = Object.freeze([
  'resolvesSemanticEffectFromClashPresenceAlone',
  'assumesContextFreeUniformDamage',
  'usesFixedNumericClashOffsetMultiplierOrScalar',
  'dropsSourceRequiredContextOrAffectedTargetRole',
  'flattensQualitativelyDivergentEffectClasses',
] as const satisfies readonly (keyof CareerT8B64ClashMethodProposalShape)[]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function validSubjectRef(value: ContentAddressedVersionedRef | undefined): value is ContentAddressedVersionedRef {
  return (
    value !== undefined &&
    typeof value.id === 'string' &&
    value.id.trim().length > 0 &&
    typeof value.version === 'string' &&
    value.version.trim().length > 0 &&
    typeof value.contentHash === 'string' &&
    /^[0-9a-f]{64}$/.test(value.contentHash)
  );
}

function completeProposalShape(
  value: Partial<CareerT8B64ClashMethodProposalShape> | undefined,
): CareerT8B64ClashMethodProposalShape | null {
  if (!isRecord(value)) return null;
  if (PROPOSAL_SHAPE_KEYS.some((key) => typeof value[key] !== 'boolean')) return null;
  return Object.freeze({
    resolvesSemanticEffectFromClashPresenceAlone:
      value.resolvesSemanticEffectFromClashPresenceAlone as boolean,
    assumesContextFreeUniformDamage: value.assumesContextFreeUniformDamage as boolean,
    usesFixedNumericClashOffsetMultiplierOrScalar:
      value.usesFixedNumericClashOffsetMultiplierOrScalar as boolean,
    dropsSourceRequiredContextOrAffectedTargetRole:
      value.dropsSourceRequiredContextOrAffectedTargetRole as boolean,
    flattensQualitativelyDivergentEffectClasses:
      value.flattensQualitativelyDivergentEffectClasses as boolean,
  });
}

function subjectIdentityMatches(
  subjectType: CareerT8B67AdmissionSubjectType,
  subjectRef: ContentAddressedVersionedRef,
  subjectContent: unknown,
): boolean {
  if (!isRecord(subjectContent)) return false;
  if (subjectType === 'rule') {
    return subjectContent.ruleId === subjectRef.id && subjectContent.version === subjectRef.version;
  }
  return (
    subjectContent.methodologyId === subjectRef.id && subjectContent.version === subjectRef.version
  );
}

function orderedUniqueReasons(
  reasons: readonly CareerT8B67AdmissionRejectionReasonId[],
): readonly CareerT8B67AdmissionRejectionReasonId[] {
  return Object.freeze([...new Set(reasons)]);
}

export function evaluateCareerT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionCandidate(
  candidate: CareerT8B67ResearchAdmissionCandidate,
): CareerT8B67ResearchAdmissionDecision {
  const reasons: CareerT8B67AdmissionRejectionReasonId[] = [];
  const explicitlyApplicable = candidate.applicability === CAREER_T8_B67_GUARD_APPLICABILITY_SCOPE;
  if (!explicitlyApplicable) reasons.push('EXPLICIT_B64_APPLICABILITY_DECLARATION_REQUIRED');

  const subjectType =
    candidate.subjectType === 'rule' || candidate.subjectType === 'methodology'
      ? candidate.subjectType
      : null;
  if (subjectType === null) reasons.push('ADMISSION_SUBJECT_TYPE_REQUIRED');

  const subjectRef = validSubjectRef(candidate.subjectRef) ? candidate.subjectRef : null;
  if (subjectRef === null) reasons.push('CONTENT_ADDRESSED_SUBJECT_REFERENCE_REQUIRED');

  const subjectContentPresent = candidate.subjectContent !== undefined;
  if (!subjectContentPresent) reasons.push('SUBJECT_CONTENT_REQUIRED');
  const observedSubjectContentHash = subjectContentPresent
    ? deterministicContentHash(candidate.subjectContent)
    : null;
  const subjectContentBound =
    subjectRef !== null &&
    observedSubjectContentHash !== null &&
    observedSubjectContentHash === subjectRef.contentHash;
  if (subjectRef !== null && subjectContentPresent && !subjectContentBound) {
    reasons.push('SUBJECT_CONTENT_HASH_MISMATCH');
  }

  const subjectIdentityBound =
    subjectType !== null &&
    subjectRef !== null &&
    subjectContentPresent &&
    subjectIdentityMatches(subjectType, subjectRef, candidate.subjectContent);
  if (subjectType !== null && subjectRef !== null && subjectContentPresent && !subjectIdentityBound) {
    reasons.push('SUBJECT_IDENTITY_MISMATCH');
  }

  const proposalShape = completeProposalShape(candidate.proposalShape);
  if (proposalShape === null) reasons.push('COMPLETE_B64_PROPOSAL_SHAPE_REQUIRED');
  const guardEvaluation =
    proposalShape === null
      ? null
      : evaluateCareerT8ClassicalZipingNegativeClashMethodGuard(proposalShape);
  if (guardEvaluation !== null) reasons.push(...guardEvaluation.violationIds);

  const rejectionReasonIds = orderedUniqueReasons(reasons);
  const admitted = rejectionReasonIds.length === 0;
  const material = {
    adapterVersion:
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT_VERSION,
    guardContractId: CAREER_T8_B64_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT.contractId,
    admissionScope: CAREER_T8_B67_GUARD_APPLICABILITY_SCOPE,
    status: admitted
      ? ('ADMITTED_RESEARCH_METHOD_PROPOSAL' as const)
      : ('REJECTED_RESEARCH_METHOD_PROPOSAL' as const),
    explicitlyApplicable,
    subjectType,
    subjectRef,
    observedSubjectContentHash,
    subjectContentBound,
    subjectIdentityBound,
    proposalShape,
    guardEvaluation,
    rejectionReasonIds,
    rejectionReasonCount: rejectionReasonIds.length,
    researchOnly: true as const,
    coreRegistryIntegrated: false as const,
    productionAuthorized: false as const,
  };
  return Object.freeze({
    decisionId: `career_t8_classical_ziping_negative_clash_method_guard_research_admission_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  });
}

export const CAREER_T8_B67_ADMISSION_ADAPTER_CONTROL_IDS = Object.freeze([
  'B67_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B66_ADMISSION_READINESS_BOUNDARY',
  'THE_ADAPTER_APPLIES_ONLY_TO_EXPLICIT_CLASSICAL_ZIPING_BRANCH_CLASH_METHOD_PROPOSAL_DECLARATIONS',
  'TAXONOMY_METHODOLOGY_FAMILY_RULE_SET_AND_INPUT_PATH_DO_NOT_IMPLICITLY_TRIGGER_THE_ADAPTER',
  'RULE_OR_METHODOLOGY_SUBJECT_TYPE_MUST_BE_EXPLICIT',
  'THE_SUBJECT_REFERENCE_MUST_BE_CONTENT_ADDRESSED',
  'THE_OBSERVED_SUBJECT_CONTENT_HASH_MUST_EQUAL_THE_DECLARED_CONTENT_HASH',
  'THE_SUBJECT_RULE_ID_OR_METHODOLOGY_ID_AND_VERSION_MUST_MATCH_THE_CONTENT_ADDRESSED_REFERENCE',
  'ALL_FIVE_B64_PROPOSAL_SHAPE_FIELDS_MUST_BE_PRESENT_AS_BOOLEANS',
  'THE_EXACT_B64_DETERMINISTIC_GUARD_EVALUATOR_DECIDES_NEGATIVE_METHOD_CONSTRAINT_COMPATIBILITY',
  'ANY_STRUCTURAL_BINDING_FAILURE_OR_B64_GUARD_VIOLATION_REJECTS_THE_RESEARCH_PROPOSAL',
  'AN_ADMISSION_DECISION_IS_CONTENT_ADDRESSED_AND_DETERMINISTIC',
  'THE_ADAPTER_IS_RESEARCH_ONLY_AND_IS_NOT_INTEGRATED_INTO_THE_CORE_RULE_REGISTRY_BY_THIS_GATE',
  'NO_CORE_CONTRACT_SCHEMA_RULE_REGISTRY_OR_PRODUCTION_BEHAVIOR_IS_CHANGED',
  'NO_POSITIVE_CLASH_EFFECT_T6_INPUT_CONTRACT_OR_CURRENT_CAREER_SEMANTIC_BRIDGE_IS_CREATED',
  'B61_VISUAL_HOLD_B56_CHEN_ZEZHEN_HOLD_AND_ALL_SIX_HISTORICAL_CAREER_T8_GAPS_REMAIN_OPEN',
  'THE_ONLY_IMMEDIATE_CONTINUATION_IS_RESEARCH_ADMISSION_ADAPTER_INTEGRATION_READINESS_REVIEW',
] as const);

export interface CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardExplicitApplicabilityAdmissionAdapterContractReport {
  materializationId: string;
  materializationVersion: typeof CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT_VERSION;
  status:
    | 'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT'
    | 'UPSTREAM_B66_BOUNDARY_INVALID';
  decision:
    | 'RESEARCH_ONLY_EXPLICIT_APPLICABILITY_CONTENT_ADDRESSED_ADMISSION_ADAPTER_MATERIALIZED_FAIL_CLOSED_CORE_REGISTRY_INTEGRATION_DEFERRED'
    | 'EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT_NOT_MATERIALIZED';
  upstreamB66ReviewId: string;
  exactB66BoundaryAccepted: boolean;
  adapterContract: typeof CAREER_T8_B67_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT | null;
  adapterContractCreatedByThisGate: boolean;
  executableAdmissionEvaluatorCreatedByThisGate: boolean;
  explicitApplicabilityRequired: boolean;
  contentAddressedSubjectBindingRequired: boolean;
  subjectIdentityBindingRequired: boolean;
  completeB64ProposalShapeRequired: boolean;
  deterministicB64GuardEvaluationRequired: boolean;
  failClosedAdmissionRequired: boolean;
  implicitApplicabilityInferenceAuthorized: false;
  coreRuleRegistryIntegrationEnabled: false;
  coreContractSchemaMutationAuthorized: false;
  productionEnforcementAuthorized: false;
  immediatelyExecutableIntegrationReadinessReviewLaneCount: 1 | 0;
  immediatelyExecutableCoreRegistryMutationLaneCount: 0;
  immediatelyExecutableSemanticRuleLaneCount: 0;
  selectedImmediateNextLane:
    | 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ADAPTER_INTEGRATION_READINESS_REVIEW'
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
  productionPromotionAuthorized: false;
  productionImpact: 'NONE';
  controlIds: readonly (typeof CAREER_T8_B67_ADMISSION_ADAPTER_CONTROL_IDS)[number][];
  controlCount: 16 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    adapterContractsCreated: 1 | 0;
    executableAdmissionEvaluatorsCreated: 1 | 0;
    coreContractSchemasChanged: 0;
    coreRegistryBehaviorsChanged: 0;
    methodologyDefinitionsCreated: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    productionBehaviorsChanged: 0;
  };
  recommendedNextGate:
    | 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ADAPTER_INTEGRATION_READINESS_REVIEW'
    | 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ENFORCEMENT_READINESS_REVIEW';
}

function exactB66Accepted(
  b66: CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionEnforcementReadinessReviewReport,
): boolean {
  const { reviewId, ...material } = b66;
  return (
    reviewId ===
      `career_personalization_t8_classical_ziping_negative_clash_method_guard_research_admission_enforcement_readiness_review_${deterministicContentHash(material).slice(0, 24)}` &&
    b66.reviewVersion ===
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ENFORCEMENT_READINESS_REVIEW_VERSION &&
    b66.status ===
      'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ENFORCEMENT_READINESS_REVIEW' &&
    b66.decision ===
      'DIRECT_CORE_REGISTRY_ENFORCEMENT_NOT_READY_EXPLICIT_APPLICABILITY_AND_CONTENT_ADDRESSED_RESEARCH_ADMISSION_ADAPTER_REQUIRED_ADAPTER_CONTRACT_AUTHORING_READY' &&
    b66.exactB65BoundaryAccepted &&
    b66.reviewedRepository === 'gycha0109-beep/Saju' &&
    b66.reviewedRepositoryCommitSha === CAREER_T8_B66_REVIEWED_REPOSITORY_COMMIT_SHA &&
    b66.domain === 'career' &&
    b66.temporalScope === 'natal' &&
    b66.statusClass === 'research' &&
    b66.capabilityFindingCount === 5 &&
    b66.missingCapabilityCount === 5 &&
    deterministicContentHash(b66.capabilityFindings) ===
      deterministicContentHash(CAREER_T8_B66_REPOSITORY_CAPABILITY_FINDINGS) &&
    b66.directCoreRegistryEnforcementReady === false &&
    b66.implicitApplicabilityInferenceAuthorized === false &&
    b66.explicitApplicabilityDeclarationRequired &&
    b66.contentAddressedSubjectBindingRequired &&
    b66.declaredB64ProposalShapeBindingRequired &&
    b66.deterministicB64GuardEvaluationBindingRequired &&
    b66.failClosedOnMissingApplicability &&
    b66.failClosedOnSubjectContentMismatch &&
    b66.failClosedOnIncompleteGuardProposalShape &&
    b66.ruleDefinitionSchemaMutationAuthorized === false &&
    b66.methodologyDefinitionSchemaMutationAuthorized === false &&
    b66.reviewAttestationSchemaMutationAuthorized === false &&
    b66.coreRuleRegistryMutationAuthorized === false &&
    b66.dedicatedResearchAdmissionAdapterContractAuthoringReady &&
    b66.researchAdmissionEnforcementIntegrated === false &&
    b66.immediatelyExecutableAdapterContractLaneCount === 1 &&
    b66.immediatelyExecutableCoreRegistryIntegrationLaneCount === 0 &&
    b66.immediatelyExecutableSemanticRuleLaneCount === 0 &&
    b66.selectedImmediateNextLane ===
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT' &&
    b66.positiveT6InputContractEstablished === false &&
    b66.positiveClashEffectContractEstablished === false &&
    b66.branchSourceOrMethodTriggerActivationCount === 0 &&
    b66.currentCareerSemanticBridgeEstablished === false &&
    b66.visualCorroborationHoldPreserved &&
    b66.b56ChenZezhenHoldPreserved &&
    b66.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b66.unresolvedGapIds) ===
      deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b66.productionEnforcementAuthorized === false &&
    b66.productionPromotionAuthorized === false &&
    b66.productionImpact === 'NONE' &&
    b66.controlCount === 16 &&
    b66.controlsFrozen &&
    deterministicContentHash(b66.controlIds) ===
      deterministicContentHash(CAREER_T8_B66_ADMISSION_READINESS_CONTROL_IDS) &&
    b66.implementationEffects.admissionAdaptersCreated === 0 &&
    b66.implementationEffects.coreContractSchemasChanged === 0 &&
    b66.implementationEffects.coreRegistryBehaviorsChanged === 0 &&
    b66.implementationEffects.productionBehaviorsChanged === 0 &&
    b66.recommendedNextGate ===
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT'
  );
}

export function buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardExplicitApplicabilityAdmissionAdapterContract(
  b66: CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionEnforcementReadinessReviewReport,
): CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardExplicitApplicabilityAdmissionAdapterContractReport {
  const accepted = exactB66Accepted(b66);
  const material = {
    materializationVersion:
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT_VERSION,
    status: accepted
      ? ('RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT' as const)
      : ('UPSTREAM_B66_BOUNDARY_INVALID' as const),
    decision: accepted
      ? ('RESEARCH_ONLY_EXPLICIT_APPLICABILITY_CONTENT_ADDRESSED_ADMISSION_ADAPTER_MATERIALIZED_FAIL_CLOSED_CORE_REGISTRY_INTEGRATION_DEFERRED' as const)
      : ('EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT_NOT_MATERIALIZED' as const),
    upstreamB66ReviewId: b66.reviewId,
    exactB66BoundaryAccepted: accepted,
    adapterContract: accepted ? CAREER_T8_B67_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT : null,
    adapterContractCreatedByThisGate: accepted,
    executableAdmissionEvaluatorCreatedByThisGate: accepted,
    explicitApplicabilityRequired: accepted,
    contentAddressedSubjectBindingRequired: accepted,
    subjectIdentityBindingRequired: accepted,
    completeB64ProposalShapeRequired: accepted,
    deterministicB64GuardEvaluationRequired: accepted,
    failClosedAdmissionRequired: accepted,
    implicitApplicabilityInferenceAuthorized: false as const,
    coreRuleRegistryIntegrationEnabled: false as const,
    coreContractSchemaMutationAuthorized: false as const,
    productionEnforcementAuthorized: false as const,
    immediatelyExecutableIntegrationReadinessReviewLaneCount: accepted ? (1 as const) : (0 as const),
    immediatelyExecutableCoreRegistryMutationLaneCount: 0 as const,
    immediatelyExecutableSemanticRuleLaneCount: 0 as const,
    selectedImmediateNextLane: accepted
      ? ('BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ADAPTER_INTEGRATION_READINESS_REVIEW' as const)
      : null,
    positiveT6InputContractEstablished: false as const,
    positiveClashEffectContractEstablished: false as const,
    branchSourceOrMethodTriggerActivationCount: 0 as const,
    currentCareerSemanticBridgeEstablished: false as const,
    visualCorroborationHoldPreserved: accepted && b66.visualCorroborationHoldPreserved,
    b56ChenZezhenHoldPreserved: accepted && b66.b56ChenZezhenHoldPreserved,
    allSixHistoricalGapsRemainOpen: true as const,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    t5RuleAuthoringAuthorizedByThisGate: false as const,
    t6PositiveEffectRuleAuthoringAuthorizedByThisGate: false as const,
    t8RuleAuthoringAuthorizedByThisGate: false as const,
    consumerNarrativeAuthorizedByThisGate: false as const,
    productionPromotionAuthorized: false as const,
    productionImpact: 'NONE' as const,
    controlIds: accepted ? CAREER_T8_B67_ADMISSION_ADAPTER_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? (16 as const) : (0 as const),
    controlsFrozen: accepted,
    implementationEffects: Object.freeze({
      adapterContractsCreated: accepted ? (1 as const) : (0 as const),
      executableAdmissionEvaluatorsCreated: accepted ? (1 as const) : (0 as const),
      coreContractSchemasChanged: 0 as const,
      coreRegistryBehaviorsChanged: 0 as const,
      methodologyDefinitionsCreated: 0 as const,
      ruleDefinitionsCreated: 0 as const,
      claimTypesCreated: 0 as const,
      interpretationPacksCreated: 0 as const,
      productionBehaviorsChanged: 0 as const,
    }),
    recommendedNextGate: accepted
      ? ('BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ADAPTER_INTEGRATION_READINESS_REVIEW' as const)
      : ('BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ENFORCEMENT_READINESS_REVIEW' as const),
  };
  return {
    materializationId: `career_personalization_t8_classical_ziping_negative_clash_method_guard_explicit_applicability_admission_adapter_contract_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
