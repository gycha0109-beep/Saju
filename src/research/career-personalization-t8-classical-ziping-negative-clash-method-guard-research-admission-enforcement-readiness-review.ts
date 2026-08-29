import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_CURRENT_CAREER_CLASH_METHOD_GUARD_COMPATIBILITY_AUDIT_VERSION,
  CAREER_T8_B65_AUDITED_BASELINE_COMMIT_SHA,
  CAREER_T8_B65_COMPATIBILITY_AUDIT_CONTROL_IDS,
  CAREER_T8_B65_CURRENT_REPOSITORY_AUDIT_SURFACES,
  type CareerPersonalizationT8ClassicalZipingCurrentCareerClashMethodGuardCompatibilityAuditReport,
} from './career-personalization-t8-classical-ziping-current-career-clash-method-guard-compatibility-audit.js';

export const CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ENFORCEMENT_READINESS_REVIEW_VERSION =
  'myeonghwa-career-personalization-t8-classical-ziping-negative-clash-method-guard-research-admission-enforcement-readiness-review-v1' as const;

export const CAREER_T8_B66_REVIEWED_REPOSITORY_COMMIT_SHA =
  'de22c689dec426fa9bcb169b6fd16e6a2864fbd1' as const;

export type CareerT8B66CapabilityId =
  | 'RULE_DEFINITION_EXPLICIT_GUARD_APPLICABILITY'
  | 'METHODOLOGY_DEFINITION_EXPLICIT_GUARD_APPLICABILITY'
  | 'REVIEW_ATTESTATION_GUARD_PROPOSAL_AND_EVALUATION_BINDING'
  | 'RULE_REGISTRY_ADMISSION_POLICY_EXTENSION_HOOK'
  | 'DEDICATED_B64_RESEARCH_ADMISSION_ADAPTER';

export interface CareerT8B66RepositoryCapabilityFinding {
  capabilityId: CareerT8B66CapabilityId;
  path: string;
  blobSha: string;
  present: false;
  blockingForDirectCoreRegistryEnforcement: boolean;
  finding: string;
}

export const CAREER_T8_B66_REPOSITORY_CAPABILITY_FINDINGS = Object.freeze([
  Object.freeze({
    capabilityId: 'RULE_DEFINITION_EXPLICIT_GUARD_APPLICABILITY',
    path: 'src/contracts/interpretation.ts',
    blobSha: '6979d42e5a6d4a2e05d084f92f606c40a71848cd',
    present: false,
    blockingForDirectCoreRegistryEnforcement: true,
    finding:
      'RuleDefinition has taxonomy, methodology, inputs, output, sources, quality, status, and relations but no governed declaration that the B64 CLASSICAL_ZIPING_BRANCH_CLASH_METHOD_PROPOSALS guard applies to the rule.',
  }),
  Object.freeze({
    capabilityId: 'METHODOLOGY_DEFINITION_EXPLICIT_GUARD_APPLICABILITY',
    path: 'src/contracts/interpretation.ts',
    blobSha: '6979d42e5a6d4a2e05d084f92f606c40a71848cd',
    present: false,
    blockingForDirectCoreRegistryEnforcement: true,
    finding:
      'MethodologyDefinition identifies family, assumptions, inputs, sources, and lifecycle status but has no explicit B64 applicability declaration or equivalent bounded method-guard scope marker.',
  }),
  Object.freeze({
    capabilityId: 'REVIEW_ATTESTATION_GUARD_PROPOSAL_AND_EVALUATION_BINDING',
    path: 'src/contracts/interpretation.ts',
    blobSha: '6979d42e5a6d4a2e05d084f92f606c40a71848cd',
    present: false,
    blockingForDirectCoreRegistryEnforcement: true,
    finding:
      'ReviewAttestation binds a reviewed rule or methodology and approval decision, but it does not bind the five-field B64 proposal shape, guard applicability, or deterministic guard evaluation result.',
  }),
  Object.freeze({
    capabilityId: 'RULE_REGISTRY_ADMISSION_POLICY_EXTENSION_HOOK',
    path: 'src/interpretation/rule-registry.ts',
    blobSha: 'd77affbbb144720af5ae1ea1170b3042906a4719',
    present: false,
    blockingForDirectCoreRegistryEnforcement: true,
    finding:
      'createRuleRegistrySnapshot runs fixed generic validations and exposes no policy callback or scoped admission hook through which B64 could be applied only to explicitly governed proposals.',
  }),
  Object.freeze({
    capabilityId: 'DEDICATED_B64_RESEARCH_ADMISSION_ADAPTER',
    path: 'src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-contract.ts',
    blobSha: '427e9ad83d2fe86aea09db9666d668c16f67d139',
    present: false,
    blockingForDirectCoreRegistryEnforcement: false,
    finding:
      'B64 exposes a deterministic guard evaluator but no admission adapter that content-addresses a candidate subject, requires explicit applicability, evaluates the five constraints, and emits a fail-closed research admission decision.',
  }),
] as const satisfies readonly CareerT8B66RepositoryCapabilityFinding[]);

export const CAREER_T8_B66_ADMISSION_READINESS_CONTROL_IDS = Object.freeze([
  'B66_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B65_COMPATIBILITY_AUDIT_BOUNDARY',
  'B65_ZERO_VIOLATIONS_REMOVE_ANY_IMMEDIATE_REMEDIATION_DEPENDENCY',
  'RULE_DEFINITION_HAS_NO_EXPLICIT_B64_GUARD_APPLICABILITY_DECLARATION',
  'METHODOLOGY_DEFINITION_HAS_NO_EXPLICIT_B64_GUARD_APPLICABILITY_DECLARATION',
  'REVIEW_ATTESTATION_CANNOT_BIND_THE_B64_PROPOSAL_SHAPE_OR_GUARD_EVALUATION',
  'CORE_RULE_REGISTRY_HAS_NO_SCOPED_ADMISSION_POLICY_EXTENSION_HOOK',
  'TAXONOMY_METHODOLOGY_FAMILY_RULE_SET_OR_INPUT_PATH_MAY_NOT_IMPLICITLY_INFER_B64_APPLICABILITY',
  'DIRECT_CORE_REGISTRY_ENFORCEMENT_IS_NOT_READY',
  'NO_CORE_RULE_METHODOLOGY_REVIEW_OR_REGISTRY_SCHEMA_MUTATION_IS_AUTHORIZED_BY_THIS_GATE',
  'A_RESEARCH_ADMISSION_ADAPTER_MUST_REQUIRE_EXPLICIT_GUARD_APPLICABILITY',
  'A_RESEARCH_ADMISSION_ADAPTER_MUST_BIND_THE_EXACT_CONTENT_ADDRESSED_SUBJECT',
  'A_RESEARCH_ADMISSION_ADAPTER_MUST_BIND_THE_DECLARED_FIVE_FIELD_B64_PROPOSAL_SHAPE_AND_EVALUATION',
  'MISSING_APPLICABILITY_SUBJECT_MISMATCH_OR_INCOMPLETE_GUARD_SHAPE_MUST_FAIL_CLOSED',
  'A_DEDICATED_RESEARCH_ONLY_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT_IS_READY_TO_AUTHOR',
  'NO_POSITIVE_CLASH_SEMANTICS_SEMANTIC_BRIDGE_HISTORICAL_GAP_CLOSURE_OR_PRODUCTION_AUTHORITY_IS_CREATED',
  'THE_ONLY_IMMEDIATE_CONTINUATION_IS_THE_EXPLICIT_APPLICABILITY_RESEARCH_ADMISSION_ADAPTER_CONTRACT',
] as const);

export interface CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionEnforcementReadinessReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ENFORCEMENT_READINESS_REVIEW_VERSION;
  status:
    | 'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ENFORCEMENT_READINESS_REVIEW'
    | 'UPSTREAM_B65_BOUNDARY_INVALID';
  decision:
    | 'DIRECT_CORE_REGISTRY_ENFORCEMENT_NOT_READY_EXPLICIT_APPLICABILITY_AND_CONTENT_ADDRESSED_RESEARCH_ADMISSION_ADAPTER_REQUIRED_ADAPTER_CONTRACT_AUTHORING_READY'
    | 'RESEARCH_ADMISSION_ENFORCEMENT_READINESS_NOT_ESTABLISHED';
  upstreamB65AuditId: string;
  exactB65BoundaryAccepted: boolean;
  reviewedRepository: 'gycha0109-beep/Saju';
  reviewedRepositoryCommitSha: typeof CAREER_T8_B66_REVIEWED_REPOSITORY_COMMIT_SHA;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  capabilityFindings: readonly CareerT8B66RepositoryCapabilityFinding[];
  capabilityFindingCount: 5 | 0;
  missingCapabilityCount: 5 | 0;
  directCoreRegistryEnforcementReady: false;
  implicitApplicabilityInferenceAuthorized: false;
  explicitApplicabilityDeclarationRequired: boolean;
  contentAddressedSubjectBindingRequired: boolean;
  declaredB64ProposalShapeBindingRequired: boolean;
  deterministicB64GuardEvaluationBindingRequired: boolean;
  failClosedOnMissingApplicability: boolean;
  failClosedOnSubjectContentMismatch: boolean;
  failClosedOnIncompleteGuardProposalShape: boolean;
  ruleDefinitionSchemaMutationAuthorized: false;
  methodologyDefinitionSchemaMutationAuthorized: false;
  reviewAttestationSchemaMutationAuthorized: false;
  coreRuleRegistryMutationAuthorized: false;
  dedicatedResearchAdmissionAdapterContractAuthoringReady: boolean;
  researchAdmissionEnforcementIntegrated: false;
  immediatelyExecutableAdapterContractLaneCount: 1 | 0;
  immediatelyExecutableCoreRegistryIntegrationLaneCount: 0;
  immediatelyExecutableSemanticRuleLaneCount: 0;
  selectedImmediateNextLane:
    | 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT'
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
  controlIds: readonly (typeof CAREER_T8_B66_ADMISSION_READINESS_CONTROL_IDS)[number][];
  controlCount: 16 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    readinessReviewsCreated: 1 | 0;
    repositoryCapabilityFindingsRecorded: 5 | 0;
    admissionAdaptersCreated: 0;
    coreContractSchemasChanged: 0;
    coreRegistryBehaviorsChanged: 0;
    methodologyDefinitionsCreated: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    productionBehaviorsChanged: 0;
  };
  recommendedNextGate:
    | 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT'
    | 'BRANCH_CLASSICAL_ZIPING_CURRENT_CAREER_CLASH_METHOD_GUARD_COMPATIBILITY_AUDIT';
}

function b65AuditSurfacesMatch(
  b65: CareerPersonalizationT8ClassicalZipingCurrentCareerClashMethodGuardCompatibilityAuditReport,
): boolean {
  if (b65.auditSurfaces.length !== CAREER_T8_B65_CURRENT_REPOSITORY_AUDIT_SURFACES.length) {
    return false;
  }
  const stripped = b65.auditSurfaces.map(({ guardEvaluation: _guardEvaluation, ...surface }) => surface);
  return (
    deterministicContentHash(stripped) ===
      deterministicContentHash(CAREER_T8_B65_CURRENT_REPOSITORY_AUDIT_SURFACES) &&
    b65.auditSurfaces.every(
      (surface) =>
        surface.guardEvaluation.accepted &&
        surface.guardEvaluation.violationCount === 0 &&
        surface.guardEvaluation.violationIds.length === 0,
    )
  );
}

function exactB65Accepted(
  b65: CareerPersonalizationT8ClassicalZipingCurrentCareerClashMethodGuardCompatibilityAuditReport,
): boolean {
  const { auditId, ...material } = b65;
  return (
    auditId ===
      `career_personalization_t8_classical_ziping_current_career_clash_method_guard_compatibility_audit_${deterministicContentHash(material).slice(0, 24)}` &&
    b65.auditVersion ===
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_CURRENT_CAREER_CLASH_METHOD_GUARD_COMPATIBILITY_AUDIT_VERSION &&
    b65.status ===
      'RESOLVED_CLASSICAL_ZIPING_CURRENT_CAREER_CLASH_METHOD_GUARD_COMPATIBILITY_AUDIT' &&
    b65.decision ===
      'CURRENT_REPOSITORY_COMPATIBLE_ZERO_GUARD_VIOLATIONS_NO_REMEDIATION_REQUIRED_RESEARCH_ADMISSION_ENFORCEMENT_REVIEW_ONLY' &&
    b65.exactB64BoundaryAccepted &&
    b65.auditedRepository === 'gycha0109-beep/Saju' &&
    b65.auditedBaselineCommitSha === CAREER_T8_B65_AUDITED_BASELINE_COMMIT_SHA &&
    b65.domain === 'career' &&
    b65.temporalScope === 'natal' &&
    b65.statusClass === 'research' &&
    b65.auditedSurfaceCount === 11 &&
    b65.directClashSurfaceCount === 5 &&
    b65.adjacentSafetySurfaceCount === 6 &&
    b65.guardEvaluationCount === 11 &&
    b65.guardViolationCount === 0 &&
    b65.incompatibleSurfaceCount === 0 &&
    b65.currentRepositoryCompatibleWithB64Guard &&
    b65.remediationRequired === false &&
    b65.immediatelyExecutableRemediationLaneCount === 0 &&
    b65.researchAdmissionEnforcementIntegrated === false &&
    b65.immediatelyExecutableResearchAdmissionEnforcementReadinessReviewLaneCount === 1 &&
    b65.immediatelyExecutableSemanticRuleLaneCount === 0 &&
    b65.selectedImmediateNextLane ===
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ENFORCEMENT_READINESS_REVIEW' &&
    b65.positiveT6InputContractEstablished === false &&
    b65.positiveClashEffectContractEstablished === false &&
    b65.branchSourceOrMethodTriggerActivationCount === 0 &&
    b65.currentCareerSemanticBridgeEstablished === false &&
    b65.visualCorroborationHoldPreserved &&
    b65.b56ChenZezhenHoldPreserved &&
    b65.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b65.unresolvedGapIds) ===
      deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b65.t5RuleAuthoringAuthorizedByThisGate === false &&
    b65.t6PositiveEffectRuleAuthoringAuthorizedByThisGate === false &&
    b65.t8RuleAuthoringAuthorizedByThisGate === false &&
    b65.consumerNarrativeAuthorizedByThisGate === false &&
    b65.productionPromotionAuthorized === false &&
    b65.productionImpact === 'NONE' &&
    b65.controlCount === 16 &&
    b65.controlsFrozen &&
    deterministicContentHash(b65.controlIds) ===
      deterministicContentHash(CAREER_T8_B65_COMPATIBILITY_AUDIT_CONTROL_IDS) &&
    b65.implementationEffects.guardViolationsFound === 0 &&
    b65.implementationEffects.remediationsApplied === 0 &&
    b65.implementationEffects.researchAdmissionEnforcementIntegrationsCreated === 0 &&
    b65.implementationEffects.productionBehaviorsChanged === 0 &&
    b65.recommendedNextGate ===
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ENFORCEMENT_READINESS_REVIEW' &&
    b65AuditSurfacesMatch(b65)
  );
}

function repositoryCapabilityBoundaryValid(): boolean {
  return (
    CAREER_T8_B66_REPOSITORY_CAPABILITY_FINDINGS.length === 5 &&
    CAREER_T8_B66_REPOSITORY_CAPABILITY_FINDINGS.every(
      (finding) =>
        finding.present === false &&
        /^[0-9a-f]{40}$/.test(finding.blobSha) &&
        finding.finding.trim().length > 0,
    ) &&
    CAREER_T8_B66_REPOSITORY_CAPABILITY_FINDINGS.filter(
      (finding) => finding.blockingForDirectCoreRegistryEnforcement,
    ).length === 4 &&
    CAREER_T8_B66_ADMISSION_READINESS_CONTROL_IDS.length === 16
  );
}

export function buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionEnforcementReadinessReview(
  b65: CareerPersonalizationT8ClassicalZipingCurrentCareerClashMethodGuardCompatibilityAuditReport,
): CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionEnforcementReadinessReviewReport {
  const accepted = exactB65Accepted(b65) && repositoryCapabilityBoundaryValid();
  const material = {
    reviewVersion:
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ENFORCEMENT_READINESS_REVIEW_VERSION,
    status: accepted
      ? ('RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ENFORCEMENT_READINESS_REVIEW' as const)
      : ('UPSTREAM_B65_BOUNDARY_INVALID' as const),
    decision: accepted
      ? ('DIRECT_CORE_REGISTRY_ENFORCEMENT_NOT_READY_EXPLICIT_APPLICABILITY_AND_CONTENT_ADDRESSED_RESEARCH_ADMISSION_ADAPTER_REQUIRED_ADAPTER_CONTRACT_AUTHORING_READY' as const)
      : ('RESEARCH_ADMISSION_ENFORCEMENT_READINESS_NOT_ESTABLISHED' as const),
    upstreamB65AuditId: b65.auditId,
    exactB65BoundaryAccepted: accepted,
    reviewedRepository: 'gycha0109-beep/Saju' as const,
    reviewedRepositoryCommitSha: CAREER_T8_B66_REVIEWED_REPOSITORY_COMMIT_SHA,
    domain: 'career' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    capabilityFindings: accepted ? CAREER_T8_B66_REPOSITORY_CAPABILITY_FINDINGS : Object.freeze([]),
    capabilityFindingCount: accepted ? (5 as const) : (0 as const),
    missingCapabilityCount: accepted ? (5 as const) : (0 as const),
    directCoreRegistryEnforcementReady: false as const,
    implicitApplicabilityInferenceAuthorized: false as const,
    explicitApplicabilityDeclarationRequired: accepted,
    contentAddressedSubjectBindingRequired: accepted,
    declaredB64ProposalShapeBindingRequired: accepted,
    deterministicB64GuardEvaluationBindingRequired: accepted,
    failClosedOnMissingApplicability: accepted,
    failClosedOnSubjectContentMismatch: accepted,
    failClosedOnIncompleteGuardProposalShape: accepted,
    ruleDefinitionSchemaMutationAuthorized: false as const,
    methodologyDefinitionSchemaMutationAuthorized: false as const,
    reviewAttestationSchemaMutationAuthorized: false as const,
    coreRuleRegistryMutationAuthorized: false as const,
    dedicatedResearchAdmissionAdapterContractAuthoringReady: accepted,
    researchAdmissionEnforcementIntegrated: false as const,
    immediatelyExecutableAdapterContractLaneCount: accepted ? (1 as const) : (0 as const),
    immediatelyExecutableCoreRegistryIntegrationLaneCount: 0 as const,
    immediatelyExecutableSemanticRuleLaneCount: 0 as const,
    selectedImmediateNextLane: accepted
      ? ('BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT' as const)
      : null,
    positiveT6InputContractEstablished: false as const,
    positiveClashEffectContractEstablished: false as const,
    branchSourceOrMethodTriggerActivationCount: 0 as const,
    currentCareerSemanticBridgeEstablished: false as const,
    visualCorroborationHoldPreserved: accepted && b65.visualCorroborationHoldPreserved,
    b56ChenZezhenHoldPreserved: accepted && b65.b56ChenZezhenHoldPreserved,
    allSixHistoricalGapsRemainOpen: true as const,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    t5RuleAuthoringAuthorizedByThisGate: false as const,
    t6PositiveEffectRuleAuthoringAuthorizedByThisGate: false as const,
    t8RuleAuthoringAuthorizedByThisGate: false as const,
    consumerNarrativeAuthorizedByThisGate: false as const,
    productionEnforcementAuthorized: false as const,
    productionPromotionAuthorized: false as const,
    productionImpact: 'NONE' as const,
    controlIds: accepted ? CAREER_T8_B66_ADMISSION_READINESS_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? (16 as const) : (0 as const),
    controlsFrozen: accepted,
    implementationEffects: Object.freeze({
      readinessReviewsCreated: accepted ? (1 as const) : (0 as const),
      repositoryCapabilityFindingsRecorded: accepted ? (5 as const) : (0 as const),
      admissionAdaptersCreated: 0 as const,
      coreContractSchemasChanged: 0 as const,
      coreRegistryBehaviorsChanged: 0 as const,
      methodologyDefinitionsCreated: 0 as const,
      ruleDefinitionsCreated: 0 as const,
      claimTypesCreated: 0 as const,
      interpretationPacksCreated: 0 as const,
      productionBehaviorsChanged: 0 as const,
    }),
    recommendedNextGate: accepted
      ? ('BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT' as const)
      : ('BRANCH_CLASSICAL_ZIPING_CURRENT_CAREER_CLASH_METHOD_GUARD_COMPATIBILITY_AUDIT' as const),
  };
  return {
    reviewId: `career_personalization_t8_classical_ziping_negative_clash_method_guard_research_admission_enforcement_readiness_review_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
