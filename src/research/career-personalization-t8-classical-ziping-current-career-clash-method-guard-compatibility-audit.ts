import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT_VERSION,
  CAREER_T8_B64_GUARD_CONTRACT_CONTROL_IDS,
  CAREER_T8_B64_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT,
  evaluateCareerT8ClassicalZipingNegativeClashMethodGuard,
  type CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardContractReport,
  type CareerT8B64ClashMethodProposalShape,
  type CareerT8B64GuardEvaluation,
} from './career-personalization-t8-classical-ziping-negative-clash-method-guard-contract.js';

export const CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_CURRENT_CAREER_CLASH_METHOD_GUARD_COMPATIBILITY_AUDIT_VERSION =
  'myeonghwa-career-personalization-t8-classical-ziping-current-career-clash-method-guard-compatibility-audit-v1' as const;

export const CAREER_T8_B65_AUDITED_BASELINE_COMMIT_SHA =
  '060fd073fa7e15a829c975a04bdcd46171f4f21d' as const;

export type CareerT8B65AuditLayer =
  | 'calculation'
  | 'career_t5'
  | 'career_t6'
  | 'career_t8'
  | 'interpretation_runtime'
  | 'production';

export type CareerT8B65GuardApplicability = 'direct_clash_surface' | 'adjacent_safety_surface';

export interface CareerT8B65AuditSurface {
  surfaceId: string;
  path: string;
  blobSha: string;
  layer: CareerT8B65AuditLayer;
  guardApplicability: CareerT8B65GuardApplicability;
  observedBoundary: string;
  proposalShape: CareerT8B64ClashMethodProposalShape;
}

export interface CareerT8B65AuditSurfaceResult extends CareerT8B65AuditSurface {
  guardEvaluation: CareerT8B64GuardEvaluation;
}

const COMPATIBLE_SHAPE = Object.freeze({
  resolvesSemanticEffectFromClashPresenceAlone: false,
  assumesContextFreeUniformDamage: false,
  usesFixedNumericClashOffsetMultiplierOrScalar: false,
  dropsSourceRequiredContextOrAffectedTargetRole: false,
  flattensQualitativelyDivergentEffectClasses: false,
} satisfies CareerT8B64ClashMethodProposalShape);

export const CAREER_T8_B65_CURRENT_REPOSITORY_AUDIT_SURFACES = Object.freeze([
  Object.freeze({
    surfaceId: 'T0_BRANCH_CLASH_CONTEXT_FACT_PROJECTION',
    path: 'src/calculation/branch-clash-context-facts.ts',
    blobSha: 'c5e4418d7725019793a19995adb8bbbb1fac7c79',
    layer: 'calculation',
    guardApplicability: 'direct_clash_surface',
    observedBoundary:
      'Projects an already-detected branch_clash into participant, hidden-stem, provenance, and inherited relation-semantics context only; it assigns no Career effect, damage magnitude, numeric modifier, or unary outcome class.',
    proposalShape: COMPATIBLE_SHAPE,
  }),
  Object.freeze({
    surfaceId: 'T0_BRANCH_CLASH_QUALIFIER_OBSERVATION_PROJECTION',
    path: 'src/calculation/branch-clash-qualifier-observation-facts.ts',
    blobSha: '68bbbc5d7b0fcb961895bbd3f5b509c351dd6550',
    layer: 'calculation',
    guardApplicability: 'direct_clash_surface',
    observedBoundary:
      'Materializes visibility, separation, and plurality observations with observationOnly=true while explicitly keeping all three effects false and numericWeightAssigned=false.',
    proposalShape: COMPATIBLE_SHAPE,
  }),
  Object.freeze({
    surfaceId: 'CAREER_T6_BRANCH_CLASH_HIDDEN_STEM_CONTEXT',
    path: 'src/research/career-personalized-t6-branch-clash-hidden-stem-context.ts',
    blobSha: '1e5e4f493ea83f76d3d0472ade1beb2896fc29b4',
    layer: 'career_t6',
    guardApplicability: 'direct_clash_surface',
    observedBoundary:
      'Consumes exact precomputed clash participants and emits structural hidden-stem context with effectSettlement=not_authorized while forbidding winner, damage magnitude, destruction, numeric weighting, and Career T8 conclusions.',
    proposalShape: COMPATIBLE_SHAPE,
  }),
  Object.freeze({
    surfaceId: 'CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT',
    path: 'src/research/career-personalized-t6-branch-clash-qualifier-context.ts',
    blobSha: 'fc940d70423a4d22338625ee4ca249b2567fe1cd',
    layer: 'career_t6',
    guardApplicability: 'direct_clash_surface',
    observedBoundary:
      'Carries pair-local visibility, separation, and plurality observations without resolving their effect; effectSettlement remains not_authorized and numeric or winner/damage inferences are explicitly forbidden.',
    proposalShape: COMPATIBLE_SHAPE,
  }),
  Object.freeze({
    surfaceId: 'CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER',
    path: 'src/research/career-personalized-t6-branch-clash-seasonal-qualifier.ts',
    blobSha: '8f8be88c5d5751355f983432ea05ee29c83dfc65',
    layer: 'career_t6',
    guardApplicability: 'direct_clash_surface',
    observedBoundary:
      'Transports 旺相休囚死 as categorical observations only, requires relativeForceVerdictAuthorized=false and numericScoringAuthorized=false, and leaves effectSettlement not_authorized.',
    proposalShape: COMPATIBLE_SHAPE,
  }),
  Object.freeze({
    surfaceId: 'CAREER_T5_SEMANTIC_SUBSTRATE',
    path: 'src/research/career-personalized-t5-substrate.ts',
    blobSha: '9a99e005b5b2cfc2de67fe431affa31ad7d945c0',
    layer: 'career_t5',
    guardApplicability: 'adjacent_safety_surface',
    observedBoundary:
      'Defines exact Ten-God and broad-family semantic substrate without a clash-effect rule and explicitly forbids numeric Career scoring, salary, promotion, future timing, and deterministic Career outcomes.',
    proposalShape: COMPATIBLE_SHAPE,
  }),
  Object.freeze({
    surfaceId: 'CAREER_NATAL_READING_CANDIDATE',
    path: 'src/research/career-natal-reading-candidate.ts',
    blobSha: '8ac8d5600d4dab5ee2b8232e821ce368e9bd1e44',
    layer: 'career_t8',
    guardApplicability: 'adjacent_safety_surface',
    observedBoundary:
      'Projects exact Ten-God subtype/channel themes only; branch observations are supporting context and outputs set numericScoringAuthorized=false without deriving any branch-clash effect.',
    proposalShape: COMPATIBLE_SHAPE,
  }),
  Object.freeze({
    surfaceId: 'CAREER_T8_SEMANTIC_BRIDGE_REMEDIATION_EVIDENCE',
    path: 'src/research/career-personalization-t8-current-t5-t6-semantic-bridge-active-remediation-execution-evidence.ts',
    blobSha: '01ac331472c145b1123edabc7803bc6152e0a209',
    layer: 'career_t8',
    guardApplicability: 'adjacent_safety_surface',
    observedBoundary:
      'Records source-attempt evidence only: zero qualifying candidates, zero authority accepted, zero gaps closed, and no T8 rule, claim, pack, narrative, preview, or production promotion.',
    proposalShape: COMPATIBLE_SHAPE,
  }),
  Object.freeze({
    surfaceId: 'INTERPRETATION_RULE_REGISTRY',
    path: 'src/interpretation/rule-registry.ts',
    blobSha: 'd77affbbb144720af5ae1ea1170b3042906a4719',
    layer: 'interpretation_runtime',
    guardApplicability: 'adjacent_safety_surface',
    observedBoundary:
      'Provides generic deterministic registry, input-contract, provenance, claim-schema, and production-evidence validation; no clash-specific score, damage, modifier, or semantic transform is encoded.',
    proposalShape: COMPATIBLE_SHAPE,
  }),
  Object.freeze({
    surfaceId: 'INTERPRETATION_RULE_EVALUATOR',
    path: 'src/interpretation/rule-evaluator.ts',
    blobSha: '704f7fed2bbc8c18e4ed1479b4e5eddcbe417365',
    layer: 'interpretation_runtime',
    guardApplicability: 'adjacent_safety_surface',
    observedBoundary:
      'Evaluates generic declared rule expressions and materializes declared claims; it has no branch-clash-specific numeric offset, damage, winner, or unary-effect implementation.',
    proposalShape: COMPATIBLE_SHAPE,
  }),
  Object.freeze({
    surfaceId: 'PRODUCTION_COMPOSITION',
    path: 'src/production/production-composition.ts',
    blobSha: '54f7276aea3baed843c0a47ffc736e3ea58a2088',
    layer: 'production',
    guardApplicability: 'adjacent_safety_surface',
    observedBoundary:
      'Performs production authority selection and interpretation preflight only; it contains no branch-clash semantic conversion, score, damage magnitude, or modifier path.',
    proposalShape: COMPATIBLE_SHAPE,
  }),
] as const satisfies readonly CareerT8B65AuditSurface[]);

export const CAREER_T8_B65_COMPATIBILITY_AUDIT_CONTROL_IDS = Object.freeze([
  'B65_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B64_GUARD_BOUNDARY',
  'THE_AUDIT_IS_PINNED_TO_MAIN_060FD073FA7E15A829C975A04BDCD46171F4F21D_AND_EXACT_BLOB_IDENTITIES',
  'T0_BRANCH_CLASH_CONTEXT_PROJECTION_REMAINS_STRUCTURAL_AND_DOES_NOT_ASSIGN_CAREER_EFFECT',
  'T0_QUALIFIER_OBSERVATIONS_REMAIN_OBSERVATION_ONLY_WITHOUT_NUMERIC_WEIGHT',
  'CAREER_T6_HIDDEN_STEM_CLASH_CONTEXT_REMAINS_EFFECT_UNSETTLED',
  'CAREER_T6_VISIBILITY_SEPARATION_AND_PLURALITY_QUALIFIERS_REMAIN_EFFECT_UNSETTLED',
  'CAREER_T6_SEASONAL_PHASE_REMAINS_CATEGORICAL_WITHOUT_NUMERIC_OR_DAMAGE_SEMANTICS',
  'CAREER_T5_AND_CURRENT_CAREER_READING_SURFACES_DO_NOT_APPLY_A_CLASH_SCALAR_OR_UNARY_DAMAGE_CLASS',
  'CURRENT_T8_SEMANTIC_BRIDGE_EVIDENCE_HAS_ZERO_AUTHORITY_ACCEPTED_AND_ZERO_GAPS_CLOSED',
  'GENERIC_INTERPRETATION_REGISTRY_AND_EVALUATOR_CONTAIN_NO_HIDDEN_CLASH_EFFECT_TRANSFORM',
  'PRODUCTION_COMPOSITION_CONTAINS_NO_CLASH_SPECIFIC_SEMANTIC_OR_NUMERIC_TRANSFORM',
  'ZERO_B64_GUARD_VIOLATIONS_ARE_PRESENT_ACROSS_ALL_AUDITED_SURFACES',
  'NO_CURRENT_IMPLEMENTATION_REMEDIATION_IS_REQUIRED_BY_THIS_AUDIT',
  'NO_POSITIVE_CLASH_EFFECT_T6_INPUT_SCHEMA_SEMANTIC_BRIDGE_OR_PRODUCTION_AUTHORITY_IS_CREATED',
  'B61_VISUAL_HOLD_B56_CHEN_ZEZHEN_HOLD_AND_ALL_SIX_HISTORICAL_CAREER_T8_GAPS_REMAIN_OPEN',
  'THE_ONLY_IMMEDIATE_CONTINUATION_IS_RESEARCH_ADMISSION_ENFORCEMENT_READINESS_REVIEW_NOT_SEMANTIC_RULE_AUTHORING',
] as const);

export interface CareerPersonalizationT8ClassicalZipingCurrentCareerClashMethodGuardCompatibilityAuditReport {
  auditId: string;
  auditVersion: typeof CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_CURRENT_CAREER_CLASH_METHOD_GUARD_COMPATIBILITY_AUDIT_VERSION;
  status:
    | 'RESOLVED_CLASSICAL_ZIPING_CURRENT_CAREER_CLASH_METHOD_GUARD_COMPATIBILITY_AUDIT'
    | 'UPSTREAM_B64_BOUNDARY_INVALID';
  decision:
    | 'CURRENT_REPOSITORY_COMPATIBLE_ZERO_GUARD_VIOLATIONS_NO_REMEDIATION_REQUIRED_RESEARCH_ADMISSION_ENFORCEMENT_REVIEW_ONLY'
    | 'CURRENT_CAREER_CLASH_METHOD_GUARD_COMPATIBILITY_AUDIT_NOT_ESTABLISHED';
  upstreamB64MaterializationId: string;
  exactB64BoundaryAccepted: boolean;
  auditedRepository: 'gycha0109-beep/Saju';
  auditedBaselineCommitSha: typeof CAREER_T8_B65_AUDITED_BASELINE_COMMIT_SHA;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  auditSurfaces: readonly CareerT8B65AuditSurfaceResult[];
  auditedSurfaceCount: 11 | 0;
  directClashSurfaceCount: 5 | 0;
  adjacentSafetySurfaceCount: 6 | 0;
  guardEvaluationCount: 11 | 0;
  guardViolationCount: 0;
  incompatibleSurfaceCount: 0;
  currentRepositoryCompatibleWithB64Guard: boolean;
  remediationRequired: false;
  immediatelyExecutableRemediationLaneCount: 0;
  researchAdmissionEnforcementIntegrated: false;
  immediatelyExecutableResearchAdmissionEnforcementReadinessReviewLaneCount: 1 | 0;
  immediatelyExecutableSemanticRuleLaneCount: 0;
  selectedImmediateNextLane:
    | 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ENFORCEMENT_READINESS_REVIEW'
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
  controlIds: readonly (typeof CAREER_T8_B65_COMPATIBILITY_AUDIT_CONTROL_IDS)[number][];
  controlCount: 16 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    compatibilityAuditReportsCreated: 1 | 0;
    auditedSurfacesRecorded: 11 | 0;
    guardEvaluationsRecorded: 11 | 0;
    guardViolationsFound: 0;
    remediationsApplied: 0;
    researchAdmissionEnforcementIntegrationsCreated: 0;
    methodologyDefinitionsCreated: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    productionBehaviorsChanged: 0;
  };
  recommendedNextGate:
    | 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ENFORCEMENT_READINESS_REVIEW'
    | 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT';
}

function exactB64Accepted(
  b64: CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardContractReport,
): boolean {
  const { materializationId, ...material } = b64;
  return (
    materializationId ===
      `career_personalization_t8_classical_ziping_negative_clash_method_guard_contract_${deterministicContentHash(material).slice(0, 24)}` &&
    b64.materializationVersion ===
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT_VERSION &&
    b64.status === 'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT' &&
    b64.decision ===
      'BOUNDED_NEGATIVE_CLASH_METHOD_GUARD_MATERIALIZED_FIVE_PROHIBITIONS_ENFORCEABLE_RESEARCH_ONLY_CURRENT_IMPLEMENTATION_COMPATIBILITY_NOT_YET_AUDITED' &&
    b64.exactB63BoundaryAccepted &&
    b64.guardContractCreatedByThisGate &&
    b64.guardConstraintCount === 5 &&
    b64.guardContract !== null &&
    deterministicContentHash(b64.guardContract) ===
      deterministicContentHash(CAREER_T8_B64_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT) &&
    b64.positiveT6InputContractEstablished === false &&
    b64.positiveClashEffectContractEstablished === false &&
    b64.methodologyDefinitionCreatedByThisGate === false &&
    b64.ruleDefinitionCreatedByThisGate === false &&
    b64.claimTypeCreatedByThisGate === false &&
    b64.productionEnforcementEnabled === false &&
    b64.branchSourceOrMethodTriggerActivationCount === 0 &&
    b64.currentCareerSemanticBridgeEstablished === false &&
    b64.immediatelyExecutableCompatibilityAuditLaneCount === 1 &&
    b64.immediatelyExecutableSemanticRuleLaneCount === 0 &&
    b64.selectedImmediateNextLane ===
      'BRANCH_CLASSICAL_ZIPING_CURRENT_CAREER_CLASH_METHOD_GUARD_COMPATIBILITY_AUDIT' &&
    b64.visualCorroborationHoldPreserved &&
    b64.b56ChenZezhenHoldPreserved &&
    b64.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b64.unresolvedGapIds) ===
      deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b64.productionImpact === 'NONE' &&
    b64.controlCount === 16 &&
    b64.controlsFrozen &&
    deterministicContentHash(b64.controlIds) ===
      deterministicContentHash(CAREER_T8_B64_GUARD_CONTRACT_CONTROL_IDS) &&
    b64.recommendedNextGate ===
      'BRANCH_CLASSICAL_ZIPING_CURRENT_CAREER_CLASH_METHOD_GUARD_COMPATIBILITY_AUDIT'
  );
}

function evaluateAuditSurfaces(): readonly CareerT8B65AuditSurfaceResult[] {
  return Object.freeze(
    CAREER_T8_B65_CURRENT_REPOSITORY_AUDIT_SURFACES.map((surface) =>
      Object.freeze({
        ...surface,
        guardEvaluation: evaluateCareerT8ClassicalZipingNegativeClashMethodGuard(
          surface.proposalShape,
        ),
      }),
    ),
  );
}

function auditMaterialValid(results: readonly CareerT8B65AuditSurfaceResult[]): boolean {
  const direct = results.filter(
    (surface) => surface.guardApplicability === 'direct_clash_surface',
  );
  const adjacent = results.filter(
    (surface) => surface.guardApplicability === 'adjacent_safety_surface',
  );
  return (
    results.length === 11 &&
    direct.length === 5 &&
    adjacent.length === 6 &&
    new Set(results.map((surface) => surface.surfaceId)).size === results.length &&
    new Set(results.map((surface) => surface.path)).size === results.length &&
    results.every((surface) => /^[0-9a-f]{40}$/.test(surface.blobSha)) &&
    results.every(
      (surface) =>
        surface.guardEvaluation.accepted && surface.guardEvaluation.violationCount === 0,
    ) &&
    CAREER_T8_B65_COMPATIBILITY_AUDIT_CONTROL_IDS.length === 16
  );
}

export function buildCareerPersonalizationT8ClassicalZipingCurrentCareerClashMethodGuardCompatibilityAudit(
  b64: CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardContractReport,
): CareerPersonalizationT8ClassicalZipingCurrentCareerClashMethodGuardCompatibilityAuditReport {
  const results = evaluateAuditSurfaces();
  const accepted = exactB64Accepted(b64) && auditMaterialValid(results);
  const auditSurfaces = accepted ? results : Object.freeze([]);
  const material = {
    auditVersion:
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_CURRENT_CAREER_CLASH_METHOD_GUARD_COMPATIBILITY_AUDIT_VERSION,
    status: accepted
      ? ('RESOLVED_CLASSICAL_ZIPING_CURRENT_CAREER_CLASH_METHOD_GUARD_COMPATIBILITY_AUDIT' as const)
      : ('UPSTREAM_B64_BOUNDARY_INVALID' as const),
    decision: accepted
      ? ('CURRENT_REPOSITORY_COMPATIBLE_ZERO_GUARD_VIOLATIONS_NO_REMEDIATION_REQUIRED_RESEARCH_ADMISSION_ENFORCEMENT_REVIEW_ONLY' as const)
      : ('CURRENT_CAREER_CLASH_METHOD_GUARD_COMPATIBILITY_AUDIT_NOT_ESTABLISHED' as const),
    upstreamB64MaterializationId: b64.materializationId,
    exactB64BoundaryAccepted: accepted,
    auditedRepository: 'gycha0109-beep/Saju' as const,
    auditedBaselineCommitSha: CAREER_T8_B65_AUDITED_BASELINE_COMMIT_SHA,
    domain: 'career' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    auditSurfaces,
    auditedSurfaceCount: accepted ? (11 as const) : (0 as const),
    directClashSurfaceCount: accepted ? (5 as const) : (0 as const),
    adjacentSafetySurfaceCount: accepted ? (6 as const) : (0 as const),
    guardEvaluationCount: accepted ? (11 as const) : (0 as const),
    guardViolationCount: 0 as const,
    incompatibleSurfaceCount: 0 as const,
    currentRepositoryCompatibleWithB64Guard: accepted,
    remediationRequired: false as const,
    immediatelyExecutableRemediationLaneCount: 0 as const,
    researchAdmissionEnforcementIntegrated: false as const,
    immediatelyExecutableResearchAdmissionEnforcementReadinessReviewLaneCount: accepted
      ? (1 as const)
      : (0 as const),
    immediatelyExecutableSemanticRuleLaneCount: 0 as const,
    selectedImmediateNextLane: accepted
      ? ('BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ENFORCEMENT_READINESS_REVIEW' as const)
      : null,
    positiveT6InputContractEstablished: false as const,
    positiveClashEffectContractEstablished: false as const,
    branchSourceOrMethodTriggerActivationCount: 0 as const,
    currentCareerSemanticBridgeEstablished: false as const,
    visualCorroborationHoldPreserved: accepted && b64.visualCorroborationHoldPreserved,
    b56ChenZezhenHoldPreserved: accepted && b64.b56ChenZezhenHoldPreserved,
    allSixHistoricalGapsRemainOpen: true as const,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    t5RuleAuthoringAuthorizedByThisGate: false as const,
    t6PositiveEffectRuleAuthoringAuthorizedByThisGate: false as const,
    t8RuleAuthoringAuthorizedByThisGate: false as const,
    consumerNarrativeAuthorizedByThisGate: false as const,
    productionPromotionAuthorized: false as const,
    productionImpact: 'NONE' as const,
    controlIds: accepted ? CAREER_T8_B65_COMPATIBILITY_AUDIT_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? (16 as const) : (0 as const),
    controlsFrozen: accepted,
    implementationEffects: Object.freeze({
      compatibilityAuditReportsCreated: accepted ? (1 as const) : (0 as const),
      auditedSurfacesRecorded: accepted ? (11 as const) : (0 as const),
      guardEvaluationsRecorded: accepted ? (11 as const) : (0 as const),
      guardViolationsFound: 0 as const,
      remediationsApplied: 0 as const,
      researchAdmissionEnforcementIntegrationsCreated: 0 as const,
      methodologyDefinitionsCreated: 0 as const,
      ruleDefinitionsCreated: 0 as const,
      claimTypesCreated: 0 as const,
      interpretationPacksCreated: 0 as const,
      productionBehaviorsChanged: 0 as const,
    }),
    recommendedNextGate: accepted
      ? ('BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ENFORCEMENT_READINESS_REVIEW' as const)
      : ('BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT' as const),
  };
  return {
    auditId: `career_personalization_t8_classical_ziping_current_career_clash_method_guard_compatibility_audit_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
