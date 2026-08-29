import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_SCOPE_AUTHORITY_REVIEW_VERSION,
  CAREER_T8_B63_AUTHORIZED_NEGATIVE_METHOD_CONSTRAINT_IDS,
  CAREER_T8_B63_SCOPE_CONTROL_IDS,
  type CareerPersonalizationT8ClassicalZipingNegativeClashMethodScopeAuthorityReviewReport,
} from './career-personalization-t8-classical-ziping-negative-clash-method-scope-authority-review.js';

export const CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT_VERSION =
  'myeonghwa-career-personalization-t8-classical-ziping-negative-clash-method-guard-contract-v1' as const;

export type CareerT8B64NegativeConstraintId =
  (typeof CAREER_T8_B63_AUTHORIZED_NEGATIVE_METHOD_CONSTRAINT_IDS)[number];

export interface CareerT8B64ClashMethodProposalShape {
  resolvesSemanticEffectFromClashPresenceAlone: boolean;
  assumesContextFreeUniformDamage: boolean;
  usesFixedNumericClashOffsetMultiplierOrScalar: boolean;
  dropsSourceRequiredContextOrAffectedTargetRole: boolean;
  flattensQualitativelyDivergentEffectClasses: boolean;
}

export interface CareerT8B64GuardEvaluation {
  accepted: boolean;
  violationIds: readonly CareerT8B64NegativeConstraintId[];
  violationCount: number;
}

const GUARD_MATERIAL = Object.freeze({
  contractVersion: CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT_VERSION,
  guardKind: 'PROHIBITIVE_RESEARCH_METHOD_GUARD' as const,
  domain: 'career' as const,
  temporalScope: 'natal' as const,
  appliesTo: 'CLASSICAL_ZIPING_BRANCH_CLASH_METHOD_PROPOSALS' as const,
  authorizedConstraintIds: CAREER_T8_B63_AUTHORIZED_NEGATIVE_METHOD_CONSTRAINT_IDS,
  positiveEffectSemanticsAuthorized: false as const,
  numericEffectSemanticsAuthorized: false as const,
  productionEnforcementEnabled: false as const,
});

export const CAREER_T8_B64_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT = Object.freeze({
  contractId: `career_t8_classical_ziping_negative_clash_method_guard_${deterministicContentHash(GUARD_MATERIAL).slice(0, 24)}`,
  ...GUARD_MATERIAL,
});

export function evaluateCareerT8ClassicalZipingNegativeClashMethodGuard(
  proposal: CareerT8B64ClashMethodProposalShape,
): CareerT8B64GuardEvaluation {
  const violations: CareerT8B64NegativeConstraintId[] = [];
  if (proposal.resolvesSemanticEffectFromClashPresenceAlone) {
    violations.push('CLASH_PRESENCE_ALONE_MAY_NOT_RESOLVE_SEMANTIC_EFFECT');
  }
  if (proposal.assumesContextFreeUniformDamage) {
    violations.push('CONTEXT_FREE_UNIFORM_DAMAGE_MAY_NOT_BE_ASSUMED');
  }
  if (proposal.usesFixedNumericClashOffsetMultiplierOrScalar) {
    violations.push('FIXED_NUMERIC_CLASH_OFFSET_MULTIPLIER_OR_SCALAR_MAY_NOT_BE_INFERRED');
  }
  if (proposal.dropsSourceRequiredContextOrAffectedTargetRole) {
    violations.push('SOURCE_REQUIRED_CONTEXT_OR_AFFECTED_TARGET_ROLE_MAY_NOT_BE_DROPPED_FOR_CURRENT_METHOD_COMPATIBILITY');
  }
  if (proposal.flattensQualitativelyDivergentEffectClasses) {
    violations.push('QUALITATIVELY_DIVERGENT_SOURCE_OUTCOMES_MAY_NOT_BE_FLATTENED_TO_ONE_UNARY_EFFECT_CLASS');
  }
  return Object.freeze({
    accepted: violations.length === 0,
    violationIds: Object.freeze(violations),
    violationCount: violations.length,
  });
}

export const CAREER_T8_B64_GUARD_CONTRACT_CONTROL_IDS = Object.freeze([
  'B64_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B63_SCOPE_AUTHORITY_BOUNDARY',
  'THE_B63_FIVE_CONSTRAINTS_ARE_MATERIALIZED_WITHOUT_WIDENING_OR_REINTERPRETATION',
  'THE_GUARD_IS_PROHIBITIVE_RESEARCH_METHOD_INFRASTRUCTURE_NOT_A_POSITIVE_CLASH_EFFECT_RULE',
  'THE_GUARD_DETERMINISTICALLY_REPORTS_EACH_AUTHORIZED_CONSTRAINT_VIOLATION',
  'A_PROPOSAL_PASSES_ONLY_WHEN_NONE_OF_THE_FIVE_PROHIBITED_SHORTCUTS_IS_PRESENT',
  'NO_POSITIVE_T6_INPUT_SCHEMA_IS_CREATED_BY_THE_GUARD',
  'NO_NUMERIC_CLASH_EFFECT_OR_DAMAGE_MAGNITUDE_IS_CREATED_BY_THE_GUARD',
  'NO_METHODOLOGY_DEFINITION_RULE_CLAIM_TYPE_OR_PACK_IS_CREATED_BY_THIS_GATE',
  'THE_GUARD_IS_NOT_WIRED_TO_PRODUCTION_OR_CONSUMER_NARRATIVE_BY_THIS_GATE',
  'B48_STYLE_SOURCE_OR_METHOD_TRIGGER_REMAINS_UNSATISFIED',
  'MODERN_CAREER_SEMANTIC_BRIDGE_REMAINS_UNESTABLISHED',
  'B61_VISUAL_CORROBORATION_HOLD_REMAINS_IN_FORCE',
  'B56_CHEN_ZEZHEN_EXACT_TARGET_BODY_HOLD_REMAINS_IN_FORCE',
  'ALL_SIX_HISTORICAL_CAREER_T8_SYNTHESIS_AUTHORITY_GAPS_REMAIN_OPEN',
  'CURRENT_REPOSITORY_COMPATIBILITY_HAS_NOT_YET_BEEN_AUDITED_AGAINST_THIS_NEW_GUARD',
  'THE_ONLY_IMMEDIATE_CONTINUATION_IS_A_CURRENT_CAREER_CLASH_METHOD_GUARD_COMPATIBILITY_AUDIT',
] as const);

export interface CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardContractReport {
  materializationId: string;
  materializationVersion: typeof CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT_VERSION;
  status: 'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT' | 'UPSTREAM_B63_BOUNDARY_INVALID';
  decision:
    | 'BOUNDED_NEGATIVE_CLASH_METHOD_GUARD_MATERIALIZED_FIVE_PROHIBITIONS_ENFORCEABLE_RESEARCH_ONLY_CURRENT_IMPLEMENTATION_COMPATIBILITY_NOT_YET_AUDITED'
    | 'NEGATIVE_CLASH_METHOD_GUARD_CONTRACT_NOT_MATERIALIZED';
  upstreamB63ReviewId: string;
  exactB63BoundaryAccepted: boolean;
  guardContract: typeof CAREER_T8_B64_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT | null;
  guardContractCreatedByThisGate: boolean;
  guardConstraintCount: 5 | 0;
  positiveT6InputContractEstablished: false;
  positiveClashEffectContractEstablished: false;
  methodologyDefinitionCreatedByThisGate: false;
  ruleDefinitionCreatedByThisGate: false;
  claimTypeCreatedByThisGate: false;
  productionEnforcementEnabled: false;
  branchSourceOrMethodTriggerActivationCount: 0;
  currentCareerSemanticBridgeEstablished: false;
  immediatelyExecutableCompatibilityAuditLaneCount: 1 | 0;
  immediatelyExecutableSemanticRuleLaneCount: 0;
  selectedImmediateNextLane: 'BRANCH_CLASSICAL_ZIPING_CURRENT_CAREER_CLASH_METHOD_GUARD_COMPATIBILITY_AUDIT' | null;
  visualCorroborationHoldPreserved: boolean;
  b56ChenZezhenHoldPreserved: boolean;
  allSixHistoricalGapsRemainOpen: true;
  unresolvedGapIds: typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS;
  productionImpact: 'NONE';
  controlIds: readonly (typeof CAREER_T8_B64_GUARD_CONTRACT_CONTROL_IDS)[number][];
  controlCount: 16 | 0;
  controlsFrozen: boolean;
  recommendedNextGate:
    | 'BRANCH_CLASSICAL_ZIPING_CURRENT_CAREER_CLASH_METHOD_GUARD_COMPATIBILITY_AUDIT'
    | 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT';
}

function exactB63Accepted(
  b63: CareerPersonalizationT8ClassicalZipingNegativeClashMethodScopeAuthorityReviewReport,
): boolean {
  const { reviewId, ...material } = b63;
  return (
    reviewId ===
      `career_personalization_t8_classical_ziping_negative_clash_method_scope_authority_review_${deterministicContentHash(material).slice(0, 24)}` &&
    b63.reviewVersion === CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_SCOPE_AUTHORITY_REVIEW_VERSION &&
    b63.status === 'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_SCOPE_AUTHORITY_REVIEW' &&
    b63.decision ===
      'FIVE_NEGATIVE_CLASH_METHOD_CONSTRAINTS_AUTHORIZED_AS_BOUNDED_RESEARCH_SCOPE_NO_POSITIVE_EFFECT_INPUT_CONTRACT_SEMANTIC_RULE_OR_PRODUCTION_AUTHORITY' &&
    b63.exactB62BoundaryAccepted &&
    b63.boundedNegativeMethodScopeAuthorityEstablished &&
    b63.boundedMethodScopeAuthorityChangeCount === 1 &&
    b63.authorizedNegativeConstraintCount === 5 &&
    deterministicContentHash(b63.authorizedNegativeConstraintIds) ===
      deterministicContentHash(CAREER_T8_B63_AUTHORIZED_NEGATIVE_METHOD_CONSTRAINT_IDS) &&
    b63.negativeMethodGuardContractAuthoringAuthorized &&
    b63.positiveT6InputContractEstablished === false &&
    b63.positiveClashEffectContractEstablished === false &&
    b63.branchSourceOrMethodTriggerActivationCount === 0 &&
    b63.currentCareerSemanticBridgeEstablished === false &&
    b63.careerT8SemanticAuthorityAdmittedByThisGate === false &&
    b63.careerT8AuthorityGapClosedByThisGate === false &&
    b63.visualCorroborationHoldPreserved &&
    b63.b56ChenZezhenHoldPreserved &&
    b63.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b63.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b63.controlCount === 16 &&
    b63.controlsFrozen &&
    deterministicContentHash(b63.controlIds) === deterministicContentHash(CAREER_T8_B63_SCOPE_CONTROL_IDS) &&
    b63.productionImpact === 'NONE' &&
    b63.recommendedNextGate === 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT'
  );
}

function guardMaterialValid(): boolean {
  return (
    CAREER_T8_B64_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT.authorizedConstraintIds.length === 5 &&
    CAREER_T8_B64_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT.positiveEffectSemanticsAuthorized === false &&
    CAREER_T8_B64_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT.numericEffectSemanticsAuthorized === false &&
    CAREER_T8_B64_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT.productionEnforcementEnabled === false &&
    CAREER_T8_B64_GUARD_CONTRACT_CONTROL_IDS.length === 16
  );
}

export function buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardContract(
  b63: CareerPersonalizationT8ClassicalZipingNegativeClashMethodScopeAuthorityReviewReport,
): CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardContractReport {
  const accepted = exactB63Accepted(b63) && guardMaterialValid();
  const material = {
    materializationVersion: CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT_VERSION,
    status: accepted
      ? ('RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT' as const)
      : ('UPSTREAM_B63_BOUNDARY_INVALID' as const),
    decision: accepted
      ? ('BOUNDED_NEGATIVE_CLASH_METHOD_GUARD_MATERIALIZED_FIVE_PROHIBITIONS_ENFORCEABLE_RESEARCH_ONLY_CURRENT_IMPLEMENTATION_COMPATIBILITY_NOT_YET_AUDITED' as const)
      : ('NEGATIVE_CLASH_METHOD_GUARD_CONTRACT_NOT_MATERIALIZED' as const),
    upstreamB63ReviewId: b63.reviewId,
    exactB63BoundaryAccepted: accepted,
    guardContract: accepted ? CAREER_T8_B64_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT : null,
    guardContractCreatedByThisGate: accepted,
    guardConstraintCount: accepted ? (5 as const) : (0 as const),
    positiveT6InputContractEstablished: false as const,
    positiveClashEffectContractEstablished: false as const,
    methodologyDefinitionCreatedByThisGate: false as const,
    ruleDefinitionCreatedByThisGate: false as const,
    claimTypeCreatedByThisGate: false as const,
    productionEnforcementEnabled: false as const,
    branchSourceOrMethodTriggerActivationCount: 0 as const,
    currentCareerSemanticBridgeEstablished: false as const,
    immediatelyExecutableCompatibilityAuditLaneCount: accepted ? (1 as const) : (0 as const),
    immediatelyExecutableSemanticRuleLaneCount: 0 as const,
    selectedImmediateNextLane: accepted
      ? ('BRANCH_CLASSICAL_ZIPING_CURRENT_CAREER_CLASH_METHOD_GUARD_COMPATIBILITY_AUDIT' as const)
      : null,
    visualCorroborationHoldPreserved: accepted && b63.visualCorroborationHoldPreserved,
    b56ChenZezhenHoldPreserved: accepted && b63.b56ChenZezhenHoldPreserved,
    allSixHistoricalGapsRemainOpen: true as const,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    productionImpact: 'NONE' as const,
    controlIds: accepted ? CAREER_T8_B64_GUARD_CONTRACT_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? (16 as const) : (0 as const),
    controlsFrozen: accepted,
    recommendedNextGate: accepted
      ? ('BRANCH_CLASSICAL_ZIPING_CURRENT_CAREER_CLASH_METHOD_GUARD_COMPATIBILITY_AUDIT' as const)
      : ('BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT' as const),
  };
  return {
    materializationId: `career_personalization_t8_classical_ziping_negative_clash_method_guard_contract_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
