import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_COMPATIBILITY_AUDIT_VERSION,
  CAREER_T8_B75_COMPATIBILITY_AUDIT_CONTROL_IDS,
  CAREER_T8_B75_COMPATIBILITY_FINDINGS,
  CAREER_T8_B75_REVIEWED_REPOSITORY_COMMIT_SHA,
  type CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardDedicatedInternalResearchProposalAuthoringEntrypointCompatibilityAuditReport,
} from './career-personalization-t8-classical-ziping-negative-clash-method-guard-dedicated-internal-research-proposal-authoring-entrypoint-compatibility-audit.js';

export const CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_INTERNAL_RESEARCH_AUTHORING_INVOCATION_SURFACE_READINESS_REVIEW_VERSION =
  'myeonghwa-career-personalization-t8-classical-ziping-negative-clash-method-guard-internal-research-authoring-invocation-surface-readiness-review-v1' as const;

export const CAREER_T8_B76_REVIEWED_REPOSITORY_COMMIT_SHA =
  'f97511a8b589d925f30cc61b99e8bea8e1e59274' as const;

export type CareerT8B76InvocationFindingId =
  | 'B74_DIRECT_PATH_ENTRYPOINT_IS_ALREADY_AN_EXPLICIT_INTERNAL_PROGRAMMATIC_SURFACE'
  | 'BUILD_EMITS_ALL_SOURCE_MODULES_INCLUDING_THE_B74_RESEARCH_MODULE'
  | 'PACKAGE_SURFACE_INTENTIONALLY_OMITS_RESEARCH_AUTHORING_EXPORTS_AND_SCRIPTS'
  | 'DEVELOPER_HARNESS_IS_A_READING_RUNTIME_NOT_AN_AUTHORING_CALLER'
  | 'RESEARCH_UX_PREVIEW_IS_A_CONSUMER_PREVIEW_NOT_AN_AUTHORING_CALLER'
  | 'B75_CONFIRMS_ZERO_CURRENT_PUBLIC_HARNESS_CORE_OR_PRODUCTION_BINDINGS';

export interface CareerT8B76InvocationFinding {
  findingId: CareerT8B76InvocationFindingId;
  path: string;
  blobSha: string;
  observedState: string;
  additionalInvocationSurfaceRequired: boolean;
}

export const CAREER_T8_B76_INVOCATION_FINDINGS = Object.freeze([
  Object.freeze({
    findingId: 'B74_DIRECT_PATH_ENTRYPOINT_IS_ALREADY_AN_EXPLICIT_INTERNAL_PROGRAMMATIC_SURFACE',
    path: 'src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-dedicated-internal-research-proposal-authoring-entrypoint-contract.ts',
    blobSha: '38ee0da3aa44ed19f316540b75ea10c70d5b0656',
    observedState:
      'B74 exports one explicit source-module function accepting the existing B67 candidate shape and returning a deterministic B71-governed authoring decision.',
    additionalInvocationSurfaceRequired: false,
  }),
  Object.freeze({
    findingId: 'BUILD_EMITS_ALL_SOURCE_MODULES_INCLUDING_THE_B74_RESEARCH_MODULE',
    path: 'tsconfig.build.json',
    blobSha: 'fa2b2aaef6fc1d5b5a02f97022a7b56c169ef2b4',
    observedState:
      'The build includes src/**/*.ts with rootDir src and outDir dist, so the B74 module is emitted for repository-internal direct-path use without a package export.',
    additionalInvocationSurfaceRequired: false,
  }),
  Object.freeze({
    findingId: 'PACKAGE_SURFACE_INTENTIONALLY_OMITS_RESEARCH_AUTHORING_EXPORTS_AND_SCRIPTS',
    path: 'package.json',
    blobSha: '1cefcf12c6fa7d318c6d32ca05a3ea111924d8ef',
    observedState:
      'The package exposes only approved product/runtime entrypoints and has no research-authoring npm script, preserving the intended internal-only boundary.',
    additionalInvocationSurfaceRequired: false,
  }),
  Object.freeze({
    findingId: 'DEVELOPER_HARNESS_IS_A_READING_RUNTIME_NOT_AN_AUTHORING_CALLER',
    path: 'src/harness/developer-harness.ts',
    blobSha: 'd4acc3631a5b7174898df7124544317de975bdaa',
    observedState:
      'The developer harness orchestrates calculation, interpretation, narrative, and reading assembly; repurposing it for proposal authoring would conflate runtime and governance responsibilities.',
    additionalInvocationSurfaceRequired: false,
  }),
  Object.freeze({
    findingId: 'RESEARCH_UX_PREVIEW_IS_A_CONSUMER_PREVIEW_NOT_AN_AUTHORING_CALLER',
    path: 'scripts/research-ux-preview.mjs',
    blobSha: '947399287831f9c6cfd3bfdd212d2025feaf96be',
    observedState:
      'The existing script is a research UX/consumer preview and does not establish a need for a proposal-authoring CLI or script surface.',
    additionalInvocationSurfaceRequired: false,
  }),
  Object.freeze({
    findingId: 'B75_CONFIRMS_ZERO_CURRENT_PUBLIC_HARNESS_CORE_OR_PRODUCTION_BINDINGS',
    path: 'src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-dedicated-internal-research-proposal-authoring-entrypoint-compatibility-audit.ts',
    blobSha: '0638685aee2ab80f8e9d7d68f85a154fed3604dc',
    observedState:
      'B75 records eight exact compatibility findings with zero violations and no current caller or integration that requires a wider invocation surface.',
    additionalInvocationSurfaceRequired: false,
  }),
] as const satisfies readonly CareerT8B76InvocationFinding[]);

export const CAREER_T8_B76_INVOCATION_READINESS_CONTROL_IDS = Object.freeze([
  'B76_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B75_COMPATIBILITY_AUDIT_BOUNDARY',
  'THE_EXISTING_B74_DIRECT_PATH_FUNCTION_IS_SUFFICIENT_FOR_INTERNAL_PROGRAMMATIC_RESEARCH_AUTHORING',
  'THE_STANDARD_BUILD_ALREADY_EMITS_THE_B74_MODULE_WITHOUT_REQUIRING_A_PACKAGE_EXPORT',
  'NO_DEDICATED_CLI_IS_REQUIRED_WITHOUT_A_CONCRETE_HUMAN_OR_AUTOMATION_CALLER',
  'NO_PACKAGE_SCRIPT_IS_REQUIRED_WITHOUT_A_CONCRETE_CALLER',
  'NO_ROOT_RESEARCH_BARREL_OR_PACKAGE_EXPORT_IS_REQUIRED_OR_AUTHORIZED',
  'THE_DEVELOPER_HARNESS_MAY_NOT_BE_REPURPOSED_AS_A_RESEARCH_AUTHORING_SURFACE',
  'THE_RESEARCH_UX_PREVIEW_MAY_NOT_BE_REPURPOSED_AS_A_RESEARCH_AUTHORING_SURFACE',
  'NO_PERSISTENCE_REGISTRATION_PROMOTION_OR_CANDIDATE_MUTATION_PATH_IS_AUTHORIZED',
  'NO_CORE_RULE_REGISTRY_INTEGRATION_IS_AUTHORIZED',
  'NO_PRODUCTION_RUNTIME_INTEGRATION_OR_ENFORCEMENT_IS_AUTHORIZED',
  'NO_ADDITIONAL_INVOCATION_SURFACE_CONTRACT_IS_AUTHORIZED_BY_THIS_REVIEW',
  'NO_POSITIVE_CLASH_EFFECT_T6_INPUT_CONTRACT_OR_CURRENT_CAREER_SEMANTIC_BRIDGE_IS_CREATED',
  'B48_STYLE_SOURCE_OR_METHOD_TRIGGER_REMAINS_UNSATISFIED',
  'B61_VISUAL_HOLD_B56_CHEN_ZEZHEN_HOLD_AND_ALL_SIX_HISTORICAL_CAREER_T8_GAPS_REMAIN_OPEN',
  'THE_ONLY_IMMEDIATE_CONTINUATION_IS_RESEARCH_AUTHORING_GOVERNANCE_CLOSEOUT',
] as const);

export interface CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardInternalResearchAuthoringInvocationSurfaceReadinessReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_INTERNAL_RESEARCH_AUTHORING_INVOCATION_SURFACE_READINESS_REVIEW_VERSION;
  status:
    | 'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_INTERNAL_RESEARCH_AUTHORING_INVOCATION_SURFACE_READINESS_REVIEW'
    | 'UPSTREAM_B75_BOUNDARY_INVALID';
  decision:
    | 'B74_DIRECT_PATH_SUFFICIENT_NO_ADDITIONAL_INVOCATION_SURFACE_REQUIRED_RESEARCH_AUTHORING_GOVERNANCE_CLOSEOUT_READY'
    | 'INTERNAL_RESEARCH_AUTHORING_INVOCATION_SURFACE_READINESS_NOT_ESTABLISHED';
  upstreamB75AuditId: string;
  exactB75BoundaryAccepted: boolean;
  reviewedRepository: 'gycha0109-beep/Saju';
  reviewedRepositoryCommitSha: typeof CAREER_T8_B76_REVIEWED_REPOSITORY_COMMIT_SHA;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  invocationFindings: readonly CareerT8B76InvocationFinding[];
  invocationFindingCount: 6 | 0;
  b74DirectPathInvocationSufficient: boolean;
  compiledInternalModuleEmitted: boolean;
  dedicatedCliRequired: false;
  packageScriptRequired: false;
  publicExportRequired: false;
  additionalInvocationSurfaceContractAuthoringReady: false;
  researchAuthoringGovernanceCloseoutReady: boolean;
  persistenceRegistrationPromotionAuthorized: false;
  coreRuleRegistryIntegrationAuthorized: false;
  productionEnforcementAuthorized: false;
  immediatelyExecutableGovernanceCloseoutLaneCount: 1 | 0;
  immediatelyExecutableCliOrPackageSurfaceLaneCount: 0;
  immediatelyExecutableCoreRegistryIntegrationLaneCount: 0;
  immediatelyExecutableSemanticRuleLaneCount: 0;
  selectedImmediateNextLane:
    | 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_AUTHORING_GOVERNANCE_CLOSEOUT'
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
  controlIds: readonly (typeof CAREER_T8_B76_INVOCATION_READINESS_CONTROL_IDS)[number][];
  controlCount: 16 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    invocationReadinessReviewsCreated: 1 | 0;
    invocationFindingsRecorded: 6 | 0;
    invocationSurfacesCreated: 0;
    publicExportsChanged: 0;
    packageScriptsChanged: 0;
    persistenceBehaviorsCreated: 0;
    coreRegistryBehaviorsChanged: 0;
    productionBehaviorsChanged: 0;
  };
  recommendedNextGate:
    | 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_AUTHORING_GOVERNANCE_CLOSEOUT'
    | 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_INTERNAL_RESEARCH_AUTHORING_INVOCATION_SURFACE_READINESS_REVIEW';
}

function exactB75Accepted(
  b75: CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardDedicatedInternalResearchProposalAuthoringEntrypointCompatibilityAuditReport,
): boolean {
  const { auditId, ...material } = b75;
  return (
    auditId ===
      `career_personalization_t8_classical_ziping_negative_clash_method_guard_dedicated_internal_research_proposal_authoring_entrypoint_compatibility_audit_${deterministicContentHash(material).slice(0, 24)}` &&
    b75.auditVersion ===
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_COMPATIBILITY_AUDIT_VERSION &&
    b75.status ===
      'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_COMPATIBILITY_AUDIT' &&
    b75.decision ===
      'B74_INTERNAL_AUTHORING_ENTRYPOINT_COMPATIBLE_ZERO_PUBLIC_HARNESS_CORE_PRODUCTION_BINDINGS_INVOCATION_SURFACE_REVIEW_READY' &&
    b75.exactB74BoundaryAccepted &&
    b75.reviewedRepository === 'gycha0109-beep/Saju' &&
    b75.reviewedRepositoryCommitSha === CAREER_T8_B75_REVIEWED_REPOSITORY_COMMIT_SHA &&
    b75.compatibilityFindingCount === 8 &&
    b75.compatibilityViolationCount === 0 &&
    deterministicContentHash(b75.compatibilityFindings) ===
      deterministicContentHash(CAREER_T8_B75_COMPATIBILITY_FINDINGS) &&
    b75.internalAuthoringEntrypointExecutable &&
    b75.delegatesToB71 &&
    b75.researchBarrelExported === false &&
    b75.rootBarrelDirectExported === false &&
    b75.packageAuthoringSurfacePresent === false &&
    b75.developerHarnessIntegrated === false &&
    b75.researchUxPreviewIntegrated === false &&
    b75.coreRuleRegistryIntegrated === false &&
    b75.productionRuntimeIntegrated === false &&
    b75.persistenceRegistrationPromotionPathPresent === false &&
    b75.internalResearchAuthoringInvocationSurfaceReadinessReviewReady &&
    b75.publicOrPackageAdoptionAuthorizedByThisGate === false &&
    b75.coreRuleRegistryIntegrationAuthorizedByThisGate === false &&
    b75.productionEnforcementAuthorized === false &&
    b75.immediatelyExecutableInvocationSurfaceReadinessReviewLaneCount === 1 &&
    b75.immediatelyExecutablePublicExportLaneCount === 0 &&
    b75.immediatelyExecutableCoreRegistryIntegrationLaneCount === 0 &&
    b75.immediatelyExecutableSemanticRuleLaneCount === 0 &&
    b75.selectedImmediateNextLane ===
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_INTERNAL_RESEARCH_AUTHORING_INVOCATION_SURFACE_READINESS_REVIEW' &&
    b75.positiveT6InputContractEstablished === false &&
    b75.positiveClashEffectContractEstablished === false &&
    b75.branchSourceOrMethodTriggerActivationCount === 0 &&
    b75.currentCareerSemanticBridgeEstablished === false &&
    b75.visualCorroborationHoldPreserved &&
    b75.b56ChenZezhenHoldPreserved &&
    b75.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b75.unresolvedGapIds) ===
      deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b75.productionPromotionAuthorized === false &&
    b75.productionImpact === 'NONE' &&
    b75.controlCount === 16 &&
    b75.controlsFrozen &&
    deterministicContentHash(b75.controlIds) ===
      deterministicContentHash(CAREER_T8_B75_COMPATIBILITY_AUDIT_CONTROL_IDS) &&
    b75.implementationEffects.compatibilityAuditsCreated === 1 &&
    b75.implementationEffects.compatibilityFindingsRecorded === 8 &&
    b75.implementationEffects.publicExportsChanged === 0 &&
    b75.implementationEffects.packageScriptsChanged === 0 &&
    b75.implementationEffects.persistenceBehaviorsCreated === 0 &&
    b75.implementationEffects.coreRegistryBehaviorsChanged === 0 &&
    b75.implementationEffects.productionBehaviorsChanged === 0 &&
    b75.recommendedNextGate ===
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_INTERNAL_RESEARCH_AUTHORING_INVOCATION_SURFACE_READINESS_REVIEW'
  );
}

function repositoryInvocationBoundaryValid(): boolean {
  return (
    CAREER_T8_B76_INVOCATION_FINDINGS.length === 6 &&
    CAREER_T8_B76_INVOCATION_FINDINGS.every(
      (finding) =>
        /^[0-9a-f]{40}$/.test(finding.blobSha) &&
        finding.observedState.trim().length > 0 &&
        finding.additionalInvocationSurfaceRequired === false,
    ) &&
    CAREER_T8_B76_INVOCATION_READINESS_CONTROL_IDS.length === 16
  );
}

export function buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardInternalResearchAuthoringInvocationSurfaceReadinessReview(
  b75: CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardDedicatedInternalResearchProposalAuthoringEntrypointCompatibilityAuditReport,
): CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardInternalResearchAuthoringInvocationSurfaceReadinessReviewReport {
  const accepted = exactB75Accepted(b75) && repositoryInvocationBoundaryValid();
  const material = {
    reviewVersion:
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_INTERNAL_RESEARCH_AUTHORING_INVOCATION_SURFACE_READINESS_REVIEW_VERSION,
    status: accepted
      ? ('RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_INTERNAL_RESEARCH_AUTHORING_INVOCATION_SURFACE_READINESS_REVIEW' as const)
      : ('UPSTREAM_B75_BOUNDARY_INVALID' as const),
    decision: accepted
      ? ('B74_DIRECT_PATH_SUFFICIENT_NO_ADDITIONAL_INVOCATION_SURFACE_REQUIRED_RESEARCH_AUTHORING_GOVERNANCE_CLOSEOUT_READY' as const)
      : ('INTERNAL_RESEARCH_AUTHORING_INVOCATION_SURFACE_READINESS_NOT_ESTABLISHED' as const),
    upstreamB75AuditId: b75.auditId,
    exactB75BoundaryAccepted: accepted,
    reviewedRepository: 'gycha0109-beep/Saju' as const,
    reviewedRepositoryCommitSha: CAREER_T8_B76_REVIEWED_REPOSITORY_COMMIT_SHA,
    domain: 'career' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    invocationFindings: accepted ? CAREER_T8_B76_INVOCATION_FINDINGS : Object.freeze([]),
    invocationFindingCount: accepted ? (6 as const) : (0 as const),
    b74DirectPathInvocationSufficient: accepted,
    compiledInternalModuleEmitted: accepted,
    dedicatedCliRequired: false as const,
    packageScriptRequired: false as const,
    publicExportRequired: false as const,
    additionalInvocationSurfaceContractAuthoringReady: false as const,
    researchAuthoringGovernanceCloseoutReady: accepted,
    persistenceRegistrationPromotionAuthorized: false as const,
    coreRuleRegistryIntegrationAuthorized: false as const,
    productionEnforcementAuthorized: false as const,
    immediatelyExecutableGovernanceCloseoutLaneCount: accepted ? (1 as const) : (0 as const),
    immediatelyExecutableCliOrPackageSurfaceLaneCount: 0 as const,
    immediatelyExecutableCoreRegistryIntegrationLaneCount: 0 as const,
    immediatelyExecutableSemanticRuleLaneCount: 0 as const,
    selectedImmediateNextLane: accepted
      ? ('BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_AUTHORING_GOVERNANCE_CLOSEOUT' as const)
      : null,
    positiveT6InputContractEstablished: false as const,
    positiveClashEffectContractEstablished: false as const,
    branchSourceOrMethodTriggerActivationCount: 0 as const,
    currentCareerSemanticBridgeEstablished: false as const,
    visualCorroborationHoldPreserved: accepted && b75.visualCorroborationHoldPreserved,
    b56ChenZezhenHoldPreserved: accepted && b75.b56ChenZezhenHoldPreserved,
    allSixHistoricalGapsRemainOpen: true as const,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    productionPromotionAuthorized: false as const,
    productionImpact: 'NONE' as const,
    controlIds: accepted ? CAREER_T8_B76_INVOCATION_READINESS_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? (16 as const) : (0 as const),
    controlsFrozen: accepted,
    implementationEffects: Object.freeze({
      invocationReadinessReviewsCreated: accepted ? (1 as const) : (0 as const),
      invocationFindingsRecorded: accepted ? (6 as const) : (0 as const),
      invocationSurfacesCreated: 0 as const,
      publicExportsChanged: 0 as const,
      packageScriptsChanged: 0 as const,
      persistenceBehaviorsCreated: 0 as const,
      coreRegistryBehaviorsChanged: 0 as const,
      productionBehaviorsChanged: 0 as const,
    }),
    recommendedNextGate: accepted
      ? ('BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_AUTHORING_GOVERNANCE_CLOSEOUT' as const)
      : ('BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_INTERNAL_RESEARCH_AUTHORING_INVOCATION_SURFACE_READINESS_REVIEW' as const),
  };

  return {
    reviewId: `career_personalization_t8_classical_ziping_negative_clash_method_guard_internal_research_authoring_invocation_surface_readiness_review_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
