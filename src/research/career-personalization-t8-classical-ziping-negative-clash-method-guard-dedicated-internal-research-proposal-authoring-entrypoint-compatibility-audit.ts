import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_CONTRACT_VERSION,
  CAREER_T8_B74_INTERNAL_AUTHORING_ENTRYPOINT_CONTROL_IDS,
  type CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardDedicatedInternalResearchProposalAuthoringEntrypointContractReport,
} from './career-personalization-t8-classical-ziping-negative-clash-method-guard-dedicated-internal-research-proposal-authoring-entrypoint-contract.js';

export const CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_COMPATIBILITY_AUDIT_VERSION =
  'myeonghwa-career-personalization-t8-classical-ziping-negative-clash-method-guard-dedicated-internal-research-proposal-authoring-entrypoint-compatibility-audit-v1' as const;

export const CAREER_T8_B75_REVIEWED_REPOSITORY_COMMIT_SHA =
  '870f66a8ca4998b12b9b04f80ef629f5ba10f35b' as const;

export type CareerT8B75CompatibilityFindingId =
  | 'B74_INTERNAL_AUTHORING_ENTRYPOINT_IMPLEMENTED_AS_B71_DELEGATING_RESEARCH_ONLY_SURFACE'
  | 'RESEARCH_BARREL_DOES_NOT_EXPORT_B74_ENTRYPOINT'
  | 'ROOT_BARREL_DOES_NOT_EXPORT_B74_ENTRYPOINT_DIRECTLY'
  | 'PACKAGE_EXPORT_MAP_AND_SCRIPTS_HAVE_NO_B74_AUTHORING_SURFACE'
  | 'DEVELOPER_HARNESS_HAS_NO_B74_AUTHORING_BINDING'
  | 'RESEARCH_UX_PREVIEW_HAS_NO_B74_AUTHORING_BINDING'
  | 'CORE_RULE_REGISTRY_HAS_NO_B74_AUTHORING_BINDING'
  | 'PRODUCTION_RUNTIME_HAS_NO_B74_AUTHORING_BINDING';

export interface CareerT8B75CompatibilityFinding {
  findingId: CareerT8B75CompatibilityFindingId;
  path: string;
  blobSha: string;
  observedState: string;
  compatibilityViolation: boolean;
}

export const CAREER_T8_B75_COMPATIBILITY_FINDINGS = Object.freeze([
  Object.freeze({
    findingId:
      'B74_INTERNAL_AUTHORING_ENTRYPOINT_IMPLEMENTED_AS_B71_DELEGATING_RESEARCH_ONLY_SURFACE',
    path: 'src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-dedicated-internal-research-proposal-authoring-entrypoint-contract.ts',
    blobSha: '38ee0da3aa44ed19f316540b75ea10c70d5b0656',
    observedState:
      'B74 delegates admission to B71, preserves all three B71 outcomes, and fixes persistence, registration, promotion, public exports, core integration, and production authorization to false.',
    compatibilityViolation: false,
  }),
  Object.freeze({
    findingId: 'RESEARCH_BARREL_DOES_NOT_EXPORT_B74_ENTRYPOINT',
    path: 'src/research/index.ts',
    blobSha: '2c4a790c88baf6ba940fed8882577f1552b1135a',
    observedState:
      'The research barrel remains limited to the existing I-series surface and does not export the B74 authoring entrypoint module.',
    compatibilityViolation: false,
  }),
  Object.freeze({
    findingId: 'ROOT_BARREL_DOES_NOT_EXPORT_B74_ENTRYPOINT_DIRECTLY',
    path: 'src/index.ts',
    blobSha: '925d1e4cc799cdb350e8602e3a4095316de27fc4',
    observedState:
      'The root barrel does not directly export the B74 authoring entrypoint and cannot reach it through the unchanged research barrel.',
    compatibilityViolation: false,
  }),
  Object.freeze({
    findingId: 'PACKAGE_EXPORT_MAP_AND_SCRIPTS_HAVE_NO_B74_AUTHORING_SURFACE',
    path: 'package.json',
    blobSha: '1cefcf12c6fa7d318c6d32ca05a3ea111924d8ef',
    observedState:
      'Package exports remain root, product-reading, product-host, and production-runtime only, and package scripts contain no B74 research-authoring invocation surface.',
    compatibilityViolation: false,
  }),
  Object.freeze({
    findingId: 'DEVELOPER_HARNESS_HAS_NO_B74_AUTHORING_BINDING',
    path: 'src/harness/developer-harness.ts',
    blobSha: 'd4acc3631a5b7174898df7124544317de975bdaa',
    observedState:
      'The developer harness remains a calculation-to-reading runtime and has no import, invocation, or authority binding to B74.',
    compatibilityViolation: false,
  }),
  Object.freeze({
    findingId: 'RESEARCH_UX_PREVIEW_HAS_NO_B74_AUTHORING_BINDING',
    path: 'scripts/research-ux-preview.mjs',
    blobSha: '947399287831f9c6cfd3bfdd212d2025feaf96be',
    observedState:
      'The research UX preview remains a consumer preview surface and has no B74 proposal-authoring invocation or authority binding.',
    compatibilityViolation: false,
  }),
  Object.freeze({
    findingId: 'CORE_RULE_REGISTRY_HAS_NO_B74_AUTHORING_BINDING',
    path: 'src/interpretation/rule-registry.ts',
    blobSha: 'd77affbbb144720af5ae1ea1170b3042906a4719',
    observedState:
      'The core rule registry remains generic and contains no B74 entrypoint, authoring-decision, or admission-record integration.',
    compatibilityViolation: false,
  }),
  Object.freeze({
    findingId: 'PRODUCTION_RUNTIME_HAS_NO_B74_AUTHORING_BINDING',
    path: 'src/production-runtime.ts',
    blobSha: '2e497597f0fb4bef8899ace29b6249d1f1342fb8',
    observedState:
      'The production runtime continues to expose production-composition authority only and has no B74 authoring entrypoint binding.',
    compatibilityViolation: false,
  }),
] as const satisfies readonly CareerT8B75CompatibilityFinding[]);

export const CAREER_T8_B75_COMPATIBILITY_AUDIT_CONTROL_IDS = Object.freeze([
  'B75_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B74_INTERNAL_AUTHORING_ENTRYPOINT_BOUNDARY',
  'B74_IS_COMPATIBLE_ONLY_WHILE_ALL_AUTHORING_ADMISSION_DECISIONS_CONTINUE_TO_DELEGATE_TO_B71',
  'THE_B74_ENTRYPOINT_REMAINS_UNEXPORTED_FROM_THE_RESEARCH_BARREL',
  'THE_B74_ENTRYPOINT_REMAINS_UNEXPORTED_FROM_THE_ROOT_BARREL',
  'THE_PACKAGE_EXPORT_MAP_AND_PACKAGE_SCRIPTS_REMAIN_FREE_OF_B74_AUTHORING_SURFACES',
  'THE_DEVELOPER_HARNESS_REMAINS_UNBOUND_TO_B74_AUTHORING',
  'THE_RESEARCH_UX_PREVIEW_REMAINS_UNBOUND_TO_B74_AUTHORING',
  'THE_CORE_RULE_REGISTRY_REMAINS_UNBOUND_TO_B74_AUTHORING',
  'THE_PRODUCTION_RUNTIME_REMAINS_UNBOUND_TO_B74_AUTHORING',
  'NO_PERSISTENCE_REGISTRATION_PROMOTION_OR_CANDIDATE_MUTATION_PATH_IS_CREATED_BY_THIS_AUDIT',
  'THE_COMPATIBILITY_AUDIT_DOES_NOT_AUTHORIZE_PUBLIC_EXPORT_OR_PACKAGE_SCRIPT_ADOPTION',
  'THE_COMPATIBILITY_AUDIT_DOES_NOT_AUTHORIZE_CORE_RULE_REGISTRY_OR_PRODUCTION_INTEGRATION',
  'NO_POSITIVE_CLASH_EFFECT_T6_INPUT_CONTRACT_OR_CURRENT_CAREER_SEMANTIC_BRIDGE_IS_CREATED',
  'B48_STYLE_SOURCE_OR_METHOD_TRIGGER_REMAINS_UNSATISFIED',
  'B61_VISUAL_HOLD_B56_CHEN_ZEZHEN_HOLD_AND_ALL_SIX_HISTORICAL_CAREER_T8_GAPS_REMAIN_OPEN',
  'THE_ONLY_IMMEDIATE_CONTINUATION_IS_INTERNAL_RESEARCH_AUTHORING_INVOCATION_SURFACE_READINESS_REVIEW',
] as const);

export interface CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardDedicatedInternalResearchProposalAuthoringEntrypointCompatibilityAuditReport {
  auditId: string;
  auditVersion: typeof CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_COMPATIBILITY_AUDIT_VERSION;
  status:
    | 'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_COMPATIBILITY_AUDIT'
    | 'UPSTREAM_B74_BOUNDARY_INVALID';
  decision:
    | 'B74_INTERNAL_AUTHORING_ENTRYPOINT_COMPATIBLE_ZERO_PUBLIC_HARNESS_CORE_PRODUCTION_BINDINGS_INVOCATION_SURFACE_REVIEW_READY'
    | 'DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_COMPATIBILITY_NOT_ESTABLISHED';
  upstreamB74MaterializationId: string;
  exactB74BoundaryAccepted: boolean;
  reviewedRepository: 'gycha0109-beep/Saju';
  reviewedRepositoryCommitSha: typeof CAREER_T8_B75_REVIEWED_REPOSITORY_COMMIT_SHA;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  compatibilityFindings: readonly CareerT8B75CompatibilityFinding[];
  compatibilityFindingCount: 8 | 0;
  compatibilityViolationCount: 0;
  internalAuthoringEntrypointExecutable: boolean;
  delegatesToB71: boolean;
  researchBarrelExported: false;
  rootBarrelDirectExported: false;
  packageAuthoringSurfacePresent: false;
  developerHarnessIntegrated: false;
  researchUxPreviewIntegrated: false;
  coreRuleRegistryIntegrated: false;
  productionRuntimeIntegrated: false;
  persistenceRegistrationPromotionPathPresent: false;
  internalResearchAuthoringInvocationSurfaceReadinessReviewReady: boolean;
  publicOrPackageAdoptionAuthorizedByThisGate: false;
  coreRuleRegistryIntegrationAuthorizedByThisGate: false;
  productionEnforcementAuthorized: false;
  immediatelyExecutableInvocationSurfaceReadinessReviewLaneCount: 1 | 0;
  immediatelyExecutablePublicExportLaneCount: 0;
  immediatelyExecutableCoreRegistryIntegrationLaneCount: 0;
  immediatelyExecutableSemanticRuleLaneCount: 0;
  selectedImmediateNextLane:
    | 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_INTERNAL_RESEARCH_AUTHORING_INVOCATION_SURFACE_READINESS_REVIEW'
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
  controlIds: readonly (typeof CAREER_T8_B75_COMPATIBILITY_AUDIT_CONTROL_IDS)[number][];
  controlCount: 16 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    compatibilityAuditsCreated: 1 | 0;
    compatibilityFindingsRecorded: 8 | 0;
    publicExportsChanged: 0;
    packageScriptsChanged: 0;
    persistenceBehaviorsCreated: 0;
    coreRegistryBehaviorsChanged: 0;
    productionBehaviorsChanged: 0;
  };
  recommendedNextGate:
    | 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_INTERNAL_RESEARCH_AUTHORING_INVOCATION_SURFACE_READINESS_REVIEW'
    | 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_COMPATIBILITY_AUDIT';
}

function exactB74Accepted(
  b74: CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardDedicatedInternalResearchProposalAuthoringEntrypointContractReport,
): boolean {
  const { materializationId, ...material } = b74;
  return (
    materializationId ===
      `career_personalization_t8_classical_ziping_negative_clash_method_guard_dedicated_internal_research_proposal_authoring_entrypoint_contract_${deterministicContentHash(material).slice(0, 24)}` &&
    b74.materializationVersion ===
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_CONTRACT_VERSION &&
    b74.status ===
      'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_CONTRACT' &&
    b74.decision ===
      'DEDICATED_INTERNAL_RESEARCH_AUTHORING_ENTRYPOINT_MATERIALIZED_B71_DELEGATED_NO_PUBLIC_CORE_PRODUCTION_INTEGRATION' &&
    b74.exactB73BoundaryAccepted &&
    b74.dedicatedInternalEntrypointCreatedByThisGate &&
    b74.executableEntrypointCreatedByThisGate &&
    b74.delegatesToB71 &&
    b74.preservesThreeB71Outcomes &&
    b74.authoringEligibilityMayBypassB71Admission === false &&
    b74.persistenceEnabled === false &&
    b74.registrationEnabled === false &&
    b74.promotionEnabled === false &&
    b74.rootExportEnabled === false &&
    b74.researchBarrelExportEnabled === false &&
    b74.packageExportEnabled === false &&
    b74.developerHarnessIntegrationEnabled === false &&
    b74.researchUxPreviewIntegrationEnabled === false &&
    b74.coreRuleRegistryIntegrationEnabled === false &&
    b74.productionEnforcementAuthorized === false &&
    b74.immediatelyExecutableCompatibilityAuditLaneCount === 1 &&
    b74.immediatelyExecutablePublicExportLaneCount === 0 &&
    b74.immediatelyExecutableCoreRegistryIntegrationLaneCount === 0 &&
    b74.immediatelyExecutableSemanticRuleLaneCount === 0 &&
    b74.selectedImmediateNextLane ===
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_COMPATIBILITY_AUDIT' &&
    b74.positiveT6InputContractEstablished === false &&
    b74.positiveClashEffectContractEstablished === false &&
    b74.branchSourceOrMethodTriggerActivationCount === 0 &&
    b74.currentCareerSemanticBridgeEstablished === false &&
    b74.visualCorroborationHoldPreserved &&
    b74.b56ChenZezhenHoldPreserved &&
    b74.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b74.unresolvedGapIds) ===
      deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b74.productionPromotionAuthorized === false &&
    b74.productionImpact === 'NONE' &&
    b74.controlCount === 16 &&
    b74.controlsFrozen &&
    deterministicContentHash(b74.controlIds) ===
      deterministicContentHash(CAREER_T8_B74_INTERNAL_AUTHORING_ENTRYPOINT_CONTROL_IDS) &&
    b74.implementationEffects.internalAuthoringEntrypointsCreated === 1 &&
    b74.implementationEffects.executableEntrypointsCreated === 1 &&
    b74.implementationEffects.publicExportsChanged === 0 &&
    b74.implementationEffects.packageExportsChanged === 0 &&
    b74.implementationEffects.packageScriptsChanged === 0 &&
    b74.implementationEffects.persistenceBehaviorsCreated === 0 &&
    b74.implementationEffects.coreRegistryBehaviorsChanged === 0 &&
    b74.implementationEffects.productionBehaviorsChanged === 0 &&
    b74.recommendedNextGate ===
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_COMPATIBILITY_AUDIT'
  );
}

function repositoryCompatibilityBoundaryValid(): boolean {
  return (
    CAREER_T8_B75_COMPATIBILITY_FINDINGS.length === 8 &&
    CAREER_T8_B75_COMPATIBILITY_FINDINGS.every(
      (finding) =>
        /^[0-9a-f]{40}$/.test(finding.blobSha) &&
        finding.observedState.trim().length > 0 &&
        finding.compatibilityViolation === false,
    ) &&
    CAREER_T8_B75_COMPATIBILITY_AUDIT_CONTROL_IDS.length === 16
  );
}

export function buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardDedicatedInternalResearchProposalAuthoringEntrypointCompatibilityAudit(
  b74: CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardDedicatedInternalResearchProposalAuthoringEntrypointContractReport,
): CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardDedicatedInternalResearchProposalAuthoringEntrypointCompatibilityAuditReport {
  const accepted = exactB74Accepted(b74) && repositoryCompatibilityBoundaryValid();
  const material = {
    auditVersion:
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_COMPATIBILITY_AUDIT_VERSION,
    status: accepted
      ? ('RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_COMPATIBILITY_AUDIT' as const)
      : ('UPSTREAM_B74_BOUNDARY_INVALID' as const),
    decision: accepted
      ? ('B74_INTERNAL_AUTHORING_ENTRYPOINT_COMPATIBLE_ZERO_PUBLIC_HARNESS_CORE_PRODUCTION_BINDINGS_INVOCATION_SURFACE_REVIEW_READY' as const)
      : ('DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_COMPATIBILITY_NOT_ESTABLISHED' as const),
    upstreamB74MaterializationId: b74.materializationId,
    exactB74BoundaryAccepted: accepted,
    reviewedRepository: 'gycha0109-beep/Saju' as const,
    reviewedRepositoryCommitSha: CAREER_T8_B75_REVIEWED_REPOSITORY_COMMIT_SHA,
    domain: 'career' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    compatibilityFindings: accepted ? CAREER_T8_B75_COMPATIBILITY_FINDINGS : Object.freeze([]),
    compatibilityFindingCount: accepted ? (8 as const) : (0 as const),
    compatibilityViolationCount: 0 as const,
    internalAuthoringEntrypointExecutable: accepted,
    delegatesToB71: accepted,
    researchBarrelExported: false as const,
    rootBarrelDirectExported: false as const,
    packageAuthoringSurfacePresent: false as const,
    developerHarnessIntegrated: false as const,
    researchUxPreviewIntegrated: false as const,
    coreRuleRegistryIntegrated: false as const,
    productionRuntimeIntegrated: false as const,
    persistenceRegistrationPromotionPathPresent: false as const,
    internalResearchAuthoringInvocationSurfaceReadinessReviewReady: accepted,
    publicOrPackageAdoptionAuthorizedByThisGate: false as const,
    coreRuleRegistryIntegrationAuthorizedByThisGate: false as const,
    productionEnforcementAuthorized: false as const,
    immediatelyExecutableInvocationSurfaceReadinessReviewLaneCount: accepted ? (1 as const) : (0 as const),
    immediatelyExecutablePublicExportLaneCount: 0 as const,
    immediatelyExecutableCoreRegistryIntegrationLaneCount: 0 as const,
    immediatelyExecutableSemanticRuleLaneCount: 0 as const,
    selectedImmediateNextLane: accepted
      ? ('BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_INTERNAL_RESEARCH_AUTHORING_INVOCATION_SURFACE_READINESS_REVIEW' as const)
      : null,
    positiveT6InputContractEstablished: false as const,
    positiveClashEffectContractEstablished: false as const,
    branchSourceOrMethodTriggerActivationCount: 0 as const,
    currentCareerSemanticBridgeEstablished: false as const,
    visualCorroborationHoldPreserved: accepted && b74.visualCorroborationHoldPreserved,
    b56ChenZezhenHoldPreserved: accepted && b74.b56ChenZezhenHoldPreserved,
    allSixHistoricalGapsRemainOpen: true as const,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    productionPromotionAuthorized: false as const,
    productionImpact: 'NONE' as const,
    controlIds: accepted ? CAREER_T8_B75_COMPATIBILITY_AUDIT_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? (16 as const) : (0 as const),
    controlsFrozen: accepted,
    implementationEffects: Object.freeze({
      compatibilityAuditsCreated: accepted ? (1 as const) : (0 as const),
      compatibilityFindingsRecorded: accepted ? (8 as const) : (0 as const),
      publicExportsChanged: 0 as const,
      packageScriptsChanged: 0 as const,
      persistenceBehaviorsCreated: 0 as const,
      coreRegistryBehaviorsChanged: 0 as const,
      productionBehaviorsChanged: 0 as const,
    }),
    recommendedNextGate: accepted
      ? ('BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_INTERNAL_RESEARCH_AUTHORING_INVOCATION_SURFACE_READINESS_REVIEW' as const)
      : ('BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_COMPATIBILITY_AUDIT' as const),
  };

  return {
    auditId: `career_personalization_t8_classical_ziping_negative_clash_method_guard_dedicated_internal_research_proposal_authoring_entrypoint_compatibility_audit_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
