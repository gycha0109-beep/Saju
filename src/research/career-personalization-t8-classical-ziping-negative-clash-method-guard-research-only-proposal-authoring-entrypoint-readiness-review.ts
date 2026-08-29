import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_COMPATIBILITY_AUDIT_VERSION,
  CAREER_T8_B72_COMPATIBILITY_AUDIT_CONTROL_IDS,
  CAREER_T8_B72_COMPATIBILITY_FINDINGS,
  CAREER_T8_B72_REVIEWED_REPOSITORY_COMMIT_SHA,
  type CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardStandaloneResearchProposalAdmissionWorkflowCompatibilityAuditReport,
} from './career-personalization-t8-classical-ziping-negative-clash-method-guard-standalone-research-proposal-admission-workflow-compatibility-audit.js';

export const CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ONLY_PROPOSAL_AUTHORING_ENTRYPOINT_READINESS_REVIEW_VERSION =
  'myeonghwa-career-personalization-t8-classical-ziping-negative-clash-method-guard-research-only-proposal-authoring-entrypoint-readiness-review-v1' as const;

export const CAREER_T8_B73_REVIEWED_REPOSITORY_COMMIT_SHA =
  '3387badd4b806ee4fd3ffda21c8435dfde774a28' as const;

export type CareerT8B73EntrypointFindingId =
  | 'B71_INTERNAL_WORKFLOW_PRIMITIVE_AVAILABLE'
  | 'DEVELOPER_HARNESS_IS_READING_RUNTIME_NOT_AUTHORING_GATE'
  | 'DEVELOPER_HARNESS_IS_ROOT_EXPORTED_PUBLIC_SURFACE'
  | 'RESEARCH_UX_PREVIEW_IS_CONSUMER_PREVIEW_NOT_AUTHORING_GATE'
  | 'PACKAGE_HAS_NO_RESEARCH_AUTHORING_ENTRYPOINT'
  | 'DEDICATED_INTERNAL_RESEARCH_AUTHORING_ENTRYPOINT_ABSENT';

export interface CareerT8B73EntrypointFinding {
  findingId: CareerT8B73EntrypointFindingId;
  path: string;
  blobSha: string;
  reusableAsResearchAuthoringEntrypoint: boolean;
  finding: string;
}

export const CAREER_T8_B73_ENTRYPOINT_FINDINGS = Object.freeze([
  Object.freeze({
    findingId: 'B71_INTERNAL_WORKFLOW_PRIMITIVE_AVAILABLE',
    path: 'src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-standalone-research-proposal-admission-workflow-contract.ts',
    blobSha: '0a904bca28a8ff0ba000316efa9de7c2aa78516e',
    reusableAsResearchAuthoringEntrypoint: false,
    finding:
      'B71 is the correct internal admission primitive, but it is a low-level workflow contract rather than a governed authoring entrypoint and remains intentionally unexported.',
  }),
  Object.freeze({
    findingId: 'DEVELOPER_HARNESS_IS_READING_RUNTIME_NOT_AUTHORING_GATE',
    path: 'src/harness/developer-harness.ts',
    blobSha: 'd4acc3631a5b7174898df7124544317de975bdaa',
    reusableAsResearchAuthoringEntrypoint: false,
    finding:
      'runDeveloperHarness executes birth calculation, interpretation, narrative generation, and reading assembly. Its contract is runtime reading execution, not repository method-authoring governance.',
  }),
  Object.freeze({
    findingId: 'DEVELOPER_HARNESS_IS_ROOT_EXPORTED_PUBLIC_SURFACE',
    path: 'src/index.ts',
    blobSha: '925d1e4cc799cdb350e8602e3a4095316de27fc4',
    reusableAsResearchAuthoringEntrypoint: false,
    finding:
      'The root barrel re-exports the harness barrel. Reusing that surface for B71 authoring admission would cross the B72 public-surface isolation boundary.',
  }),
  Object.freeze({
    findingId: 'RESEARCH_UX_PREVIEW_IS_CONSUMER_PREVIEW_NOT_AUTHORING_GATE',
    path: 'scripts/research-ux-preview.mjs',
    blobSha: '947399287831f9c6cfd3bfdd212d2025feaf96be',
    reusableAsResearchAuthoringEntrypoint: false,
    finding:
      'The only repository script is a research UX preview that imports product-host, interpretation, narrative profiles, and consumer copy. It is not a method-authoring governance surface.',
  }),
  Object.freeze({
    findingId: 'PACKAGE_HAS_NO_RESEARCH_AUTHORING_ENTRYPOINT',
    path: 'package.json',
    blobSha: '1cefcf12c6fa7d318c6d32ca05a3ea111924d8ef',
    reusableAsResearchAuthoringEntrypoint: false,
    finding:
      'Package exports and npm scripts expose no research method-authoring command or subpath. Adding one is not authorized by this readiness review.',
  }),
  Object.freeze({
    findingId: 'DEDICATED_INTERNAL_RESEARCH_AUTHORING_ENTRYPOINT_ABSENT',
    path: 'src/research/index.ts',
    blobSha: '2c4a790c88baf6ba940fed8882577f1552b1135a',
    reusableAsResearchAuthoringEntrypoint: false,
    finding:
      'The research barrel has no dedicated B71 proposal-authoring entrypoint. A new internal direct-path contract can be authored without exporting it from this barrel.',
  }),
] as const satisfies readonly CareerT8B73EntrypointFinding[]);

export const CAREER_T8_B73_ENTRYPOINT_READINESS_CONTROL_IDS = Object.freeze([
  'B73_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B72_COMPATIBILITY_BOUNDARY',
  'B71_IS_THE_ONLY_AUTHORIZED_PROPOSAL_ADMISSION_PRIMITIVE_FOR_THIS_SCOPE',
  'B71_LOW_LEVEL_WORKFLOW_EXISTENCE_DOES_NOT_ITSELF_DEFINE_AN_AUTHORING_ENTRYPOINT',
  'THE_EXISTING_DEVELOPER_HARNESS_MAY_NOT_BE_REPURPOSED_FOR_METHOD_AUTHORING_GOVERNANCE',
  'THE_ROOT_EXPORTED_HARNESS_SURFACE_MAY_NOT_BE_USED_TO_BYPASS_B72_ISOLATION',
  'THE_RESEARCH_UX_PREVIEW_MAY_NOT_BE_REPURPOSED_FOR_METHOD_AUTHORING_GOVERNANCE',
  'NO_PACKAGE_EXPORT_OR_NPM_SCRIPT_ENTRYPOINT_IS_AUTHORIZED_BY_THIS_GATE',
  'A_DEDICATED_INTERNAL_DIRECT_PATH_RESEARCH_AUTHORING_ENTRYPOINT_CONTRACT_IS_READY_TO_AUTHOR',
  'THE_DEDICATED_ENTRYPOINT_MUST_DELEGATE_TO_B71_AND_MAY_NOT_REIMPLEMENT_B64_B67_OR_B69_DECISIONS',
  'THE_DEDICATED_ENTRYPOINT_MUST_PRESERVE_ALL_THREE_B71_OUTCOMES_WITHOUT_COLLAPSING_REJECTIONS',
  'THE_DEDICATED_ENTRYPOINT_MUST_NOT_PERSIST_REGISTER_PROMOTE_OR_MUTATE_CANDIDATES',
  'THE_DEDICATED_ENTRYPOINT_MUST_NOT_BE_EXPORTED_FROM_ROOT_RESEARCH_BARREL_OR_PACKAGE_BY_ITS_CONTRACT_GATE',
  'NO_CORE_RULE_REGISTRY_INTEGRATION_OR_PRODUCTION_ENFORCEMENT_IS_AUTHORIZED',
  'NO_POSITIVE_CLASH_EFFECT_T6_INPUT_CONTRACT_OR_CURRENT_CAREER_SEMANTIC_BRIDGE_IS_CREATED',
  'B61_VISUAL_HOLD_B56_CHEN_ZEZHEN_HOLD_AND_ALL_SIX_HISTORICAL_CAREER_T8_GAPS_REMAIN_OPEN',
  'THE_ONLY_IMMEDIATE_CONTINUATION_IS_THE_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_CONTRACT',
] as const);

export interface CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchOnlyProposalAuthoringEntrypointReadinessReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ONLY_PROPOSAL_AUTHORING_ENTRYPOINT_READINESS_REVIEW_VERSION;
  status:
    | 'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ONLY_PROPOSAL_AUTHORING_ENTRYPOINT_READINESS_REVIEW'
    | 'UPSTREAM_B72_BOUNDARY_INVALID';
  decision:
    | 'EXISTING_PUBLIC_DEV_AND_UX_ENTRYPOINTS_NOT_REUSABLE_DEDICATED_INTERNAL_RESEARCH_AUTHORING_ENTRYPOINT_CONTRACT_READY'
    | 'RESEARCH_ONLY_PROPOSAL_AUTHORING_ENTRYPOINT_READINESS_NOT_ESTABLISHED';
  upstreamB72AuditId: string;
  exactB72BoundaryAccepted: boolean;
  reviewedRepository: 'gycha0109-beep/Saju';
  reviewedRepositoryCommitSha: typeof CAREER_T8_B73_REVIEWED_REPOSITORY_COMMIT_SHA;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  entrypointFindings: readonly CareerT8B73EntrypointFinding[];
  entrypointFindingCount: 6 | 0;
  existingReusableEntrypointCount: 0;
  b71InternalWorkflowPrimitiveAvailable: boolean;
  developerHarnessReuseAuthorized: false;
  researchUxPreviewReuseAuthorized: false;
  rootOrResearchBarrelExportAuthorized: false;
  packageExportOrScriptMutationAuthorized: false;
  dedicatedInternalResearchAuthoringEntrypointContractAuthoringReady: boolean;
  entrypointMustDelegateToB71: boolean;
  entrypointPersistenceAuthorized: false;
  coreRuleRegistryIntegrationAuthorized: false;
  productionEnforcementAuthorized: false;
  immediatelyExecutableDedicatedEntrypointContractLaneCount: 1 | 0;
  immediatelyExecutablePublicExportLaneCount: 0;
  immediatelyExecutableCoreRegistryIntegrationLaneCount: 0;
  immediatelyExecutableSemanticRuleLaneCount: 0;
  selectedImmediateNextLane:
    | 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_CONTRACT'
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
  controlIds: readonly (typeof CAREER_T8_B73_ENTRYPOINT_READINESS_CONTROL_IDS)[number][];
  controlCount: 16 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    readinessReviewsCreated: 1 | 0;
    entrypointFindingsRecorded: 6 | 0;
    authoringEntrypointsCreated: 0;
    publicExportsChanged: 0;
    packageScriptsChanged: 0;
    persistenceBehaviorsCreated: 0;
    coreRegistryBehaviorsChanged: 0;
    productionBehaviorsChanged: 0;
  };
  recommendedNextGate:
    | 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_CONTRACT'
    | 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ONLY_PROPOSAL_AUTHORING_ENTRYPOINT_READINESS_REVIEW';
}

function exactB72Accepted(
  b72: CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardStandaloneResearchProposalAdmissionWorkflowCompatibilityAuditReport,
): boolean {
  const { auditId, ...material } = b72;
  return (
    auditId ===
      `career_personalization_t8_classical_ziping_negative_clash_method_guard_standalone_research_proposal_admission_workflow_compatibility_audit_${deterministicContentHash(material).slice(0, 24)}` &&
    b72.auditVersion ===
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_COMPATIBILITY_AUDIT_VERSION &&
    b72.status ===
      'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_STANDALONE_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_COMPATIBILITY_AUDIT' &&
    b72.decision ===
      'B71_STANDALONE_WORKFLOW_COMPATIBLE_ZERO_PUBLIC_CORE_PRODUCTION_BYPASS_INTEGRATIONS_RESEARCH_ONLY_ENTRYPOINT_REVIEW_READY' &&
    b72.exactB71BoundaryAccepted &&
    b72.reviewedRepository === 'gycha0109-beep/Saju' &&
    b72.reviewedRepositoryCommitSha === CAREER_T8_B72_REVIEWED_REPOSITORY_COMMIT_SHA &&
    b72.compatibilityFindingCount === 6 &&
    b72.compatibilityViolationCount === 0 &&
    deterministicContentHash(b72.compatibilityFindings) ===
      deterministicContentHash(CAREER_T8_B72_COMPATIBILITY_FINDINGS) &&
    b72.standaloneWorkflowExecutable &&
    b72.researchBarrelExported === false &&
    b72.rootBarrelDirectExported === false &&
    b72.packageResearchSubpathExported === false &&
    b72.coreRuleRegistryIntegrated === false &&
    b72.productionRuntimeIntegrated === false &&
    b72.persistenceRegistrationOrPromotionPathPresent === false &&
    b72.publicCoreProductionBypassCount === 0 &&
    b72.researchOnlyProposalAuthoringEntrypointReadinessReviewReady &&
    b72.rootOrPackageExportAuthorizedByThisGate === false &&
    b72.coreRuleRegistryIntegrationAuthorizedByThisGate === false &&
    b72.productionEnforcementAuthorized === false &&
    b72.immediatelyExecutableResearchEntrypointReadinessReviewLaneCount === 1 &&
    b72.immediatelyExecutableCoreRegistryIntegrationLaneCount === 0 &&
    b72.immediatelyExecutableSemanticRuleLaneCount === 0 &&
    b72.positiveT6InputContractEstablished === false &&
    b72.positiveClashEffectContractEstablished === false &&
    b72.branchSourceOrMethodTriggerActivationCount === 0 &&
    b72.currentCareerSemanticBridgeEstablished === false &&
    b72.visualCorroborationHoldPreserved &&
    b72.b56ChenZezhenHoldPreserved &&
    b72.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b72.unresolvedGapIds) ===
      deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b72.productionPromotionAuthorized === false &&
    b72.productionImpact === 'NONE' &&
    b72.controlCount === 16 &&
    b72.controlsFrozen &&
    deterministicContentHash(b72.controlIds) ===
      deterministicContentHash(CAREER_T8_B72_COMPATIBILITY_AUDIT_CONTROL_IDS) &&
    b72.implementationEffects.publicExportsChanged === 0 &&
    b72.implementationEffects.persistenceBehaviorsCreated === 0 &&
    b72.implementationEffects.coreRegistryBehaviorsChanged === 0 &&
    b72.implementationEffects.productionBehaviorsChanged === 0 &&
    b72.recommendedNextGate ===
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ONLY_PROPOSAL_AUTHORING_ENTRYPOINT_READINESS_REVIEW'
  );
}

function repositoryEntrypointBoundaryValid(): boolean {
  return (
    CAREER_T8_B73_ENTRYPOINT_FINDINGS.length === 6 &&
    CAREER_T8_B73_ENTRYPOINT_FINDINGS.every(
      (finding) =>
        /^[0-9a-f]{40}$/.test(finding.blobSha) &&
        finding.finding.trim().length > 0 &&
        finding.reusableAsResearchAuthoringEntrypoint === false,
    ) &&
    CAREER_T8_B73_ENTRYPOINT_READINESS_CONTROL_IDS.length === 16
  );
}

export function buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchOnlyProposalAuthoringEntrypointReadinessReview(
  b72: CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardStandaloneResearchProposalAdmissionWorkflowCompatibilityAuditReport,
): CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchOnlyProposalAuthoringEntrypointReadinessReviewReport {
  const accepted = exactB72Accepted(b72) && repositoryEntrypointBoundaryValid();
  const material = {
    reviewVersion:
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ONLY_PROPOSAL_AUTHORING_ENTRYPOINT_READINESS_REVIEW_VERSION,
    status: accepted
      ? ('RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ONLY_PROPOSAL_AUTHORING_ENTRYPOINT_READINESS_REVIEW' as const)
      : ('UPSTREAM_B72_BOUNDARY_INVALID' as const),
    decision: accepted
      ? ('EXISTING_PUBLIC_DEV_AND_UX_ENTRYPOINTS_NOT_REUSABLE_DEDICATED_INTERNAL_RESEARCH_AUTHORING_ENTRYPOINT_CONTRACT_READY' as const)
      : ('RESEARCH_ONLY_PROPOSAL_AUTHORING_ENTRYPOINT_READINESS_NOT_ESTABLISHED' as const),
    upstreamB72AuditId: b72.auditId,
    exactB72BoundaryAccepted: accepted,
    reviewedRepository: 'gycha0109-beep/Saju' as const,
    reviewedRepositoryCommitSha: CAREER_T8_B73_REVIEWED_REPOSITORY_COMMIT_SHA,
    domain: 'career' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    entrypointFindings: accepted ? CAREER_T8_B73_ENTRYPOINT_FINDINGS : Object.freeze([]),
    entrypointFindingCount: accepted ? (6 as const) : (0 as const),
    existingReusableEntrypointCount: 0 as const,
    b71InternalWorkflowPrimitiveAvailable: accepted,
    developerHarnessReuseAuthorized: false as const,
    researchUxPreviewReuseAuthorized: false as const,
    rootOrResearchBarrelExportAuthorized: false as const,
    packageExportOrScriptMutationAuthorized: false as const,
    dedicatedInternalResearchAuthoringEntrypointContractAuthoringReady: accepted,
    entrypointMustDelegateToB71: accepted,
    entrypointPersistenceAuthorized: false as const,
    coreRuleRegistryIntegrationAuthorized: false as const,
    productionEnforcementAuthorized: false as const,
    immediatelyExecutableDedicatedEntrypointContractLaneCount: accepted ? (1 as const) : (0 as const),
    immediatelyExecutablePublicExportLaneCount: 0 as const,
    immediatelyExecutableCoreRegistryIntegrationLaneCount: 0 as const,
    immediatelyExecutableSemanticRuleLaneCount: 0 as const,
    selectedImmediateNextLane: accepted
      ? ('BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_CONTRACT' as const)
      : null,
    positiveT6InputContractEstablished: false as const,
    positiveClashEffectContractEstablished: false as const,
    branchSourceOrMethodTriggerActivationCount: 0 as const,
    currentCareerSemanticBridgeEstablished: false as const,
    visualCorroborationHoldPreserved: accepted && b72.visualCorroborationHoldPreserved,
    b56ChenZezhenHoldPreserved: accepted && b72.b56ChenZezhenHoldPreserved,
    allSixHistoricalGapsRemainOpen: true as const,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    productionPromotionAuthorized: false as const,
    productionImpact: 'NONE' as const,
    controlIds: accepted ? CAREER_T8_B73_ENTRYPOINT_READINESS_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? (16 as const) : (0 as const),
    controlsFrozen: accepted,
    implementationEffects: Object.freeze({
      readinessReviewsCreated: accepted ? (1 as const) : (0 as const),
      entrypointFindingsRecorded: accepted ? (6 as const) : (0 as const),
      authoringEntrypointsCreated: 0 as const,
      publicExportsChanged: 0 as const,
      packageScriptsChanged: 0 as const,
      persistenceBehaviorsCreated: 0 as const,
      coreRegistryBehaviorsChanged: 0 as const,
      productionBehaviorsChanged: 0 as const,
    }),
    recommendedNextGate: accepted
      ? ('BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_CONTRACT' as const)
      : ('BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ONLY_PROPOSAL_AUTHORING_ENTRYPOINT_READINESS_REVIEW' as const),
  };
  return {
    reviewId: `career_personalization_t8_classical_ziping_negative_clash_method_guard_research_only_proposal_authoring_entrypoint_readiness_review_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
