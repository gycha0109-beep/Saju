import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_SCOPE_AUTHORITY_REVIEW_VERSION,
  CAREER_T8_B63_AUTHORIZED_NEGATIVE_METHOD_CONSTRAINT_IDS,
  CAREER_T8_B63_SCOPE_CONTROL_IDS,
  type CareerPersonalizationT8ClassicalZipingNegativeClashMethodScopeAuthorityReviewReport,
} from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-scope-authority-review.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT_VERSION,
  CAREER_T8_B64_GUARD_CONTRACT_CONTROL_IDS,
  CAREER_T8_B64_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT,
  buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardContract,
  evaluateCareerT8ClassicalZipingNegativeClashMethodGuard,
} from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-contract.js';

function acceptedB63(): CareerPersonalizationT8ClassicalZipingNegativeClashMethodScopeAuthorityReviewReport {
  const material: Omit<CareerPersonalizationT8ClassicalZipingNegativeClashMethodScopeAuthorityReviewReport, 'reviewId'> = {
    reviewVersion: CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_SCOPE_AUTHORITY_REVIEW_VERSION,
    status: 'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_SCOPE_AUTHORITY_REVIEW',
    decision:
      'FIVE_NEGATIVE_CLASH_METHOD_CONSTRAINTS_AUTHORIZED_AS_BOUNDED_RESEARCH_SCOPE_NO_POSITIVE_EFFECT_INPUT_CONTRACT_SEMANTIC_RULE_OR_PRODUCTION_AUTHORITY',
    upstreamB62ReassessmentId: 'b62_fixture_for_b64',
    exactB62BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    boundedNegativeMethodScopeAuthorityEstablished: true,
    boundedMethodScopeAuthorityChangeCount: 1,
    authorizedNegativeConstraintIds: CAREER_T8_B63_AUTHORIZED_NEGATIVE_METHOD_CONSTRAINT_IDS,
    authorizedNegativeConstraintCount: 5,
    negativeMethodGuardContractAuthoringAuthorized: true,
    positiveT6InputContractEstablished: false,
    positiveClashEffectContractEstablished: false,
    positiveClashEffectAuthoringAuthorized: false,
    flatUnaryClashModifierAuthoringAuthorized: false,
    contextFreeUniformDamageAuthoringAuthorized: false,
    fixedNumericClashScalarAuthoringAuthorized: false,
    sourceRequiredContextDroppingAuthorized: false,
    effectClassFlatteningAuthorized: false,
    commonT6MethodContractEstablished: false,
    methodologyDefinitionCreatedByThisGate: false,
    ruleDefinitionCreatedByThisGate: false,
    claimTypeCreatedByThisGate: false,
    branchSourceOrMethodTriggerActivationCount: 0,
    currentCareerSemanticBridgeEstablished: false,
    careerT8SemanticAuthorityAdmittedByThisGate: false,
    careerT8AuthorityGapClosedByThisGate: false,
    immediatelyExecutableNegativeMethodGuardContractLaneCount: 1,
    immediatelyExecutablePositiveMethodContractLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane: 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT',
    visualCorroborationHoldPreserved: true,
    b56ChenZezhenHoldPreserved: true,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    t5RuleAuthoringAuthorized: false,
    t6PositiveEffectRuleAuthoringAuthorized: false,
    t8RuleAuthoringAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: CAREER_T8_B63_SCOPE_CONTROL_IDS,
    controlCount: 16,
    controlsFrozen: true,
    implementationEffects: Object.freeze({
      scopeAuthorityReviewsCreated: 1,
      boundedNegativeMethodScopesAuthorized: 1,
      negativeMethodGuardContractsCreated: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
      productionBehaviorsChanged: 0,
    }),
    recommendedNextGate: 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT',
  };
  return {
    reviewId: `career_personalization_t8_classical_ziping_negative_clash_method_scope_authority_review_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career T8 classical Zi-Ping negative clash method guard contract', () => {
  test('materializes one content-addressed five-constraint research guard', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardContract(acceptedB63());

    expect(report.materializationVersion).toBe(
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT_VERSION,
    );
    expect(report.status).toBe('RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT');
    expect(report.exactB63BoundaryAccepted).toBe(true);
    expect(report.guardContractCreatedByThisGate).toBe(true);
    expect(report.guardContract).toEqual(CAREER_T8_B64_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT);
    expect(report.guardConstraintCount).toBe(5);
    expect(report.guardContract?.authorizedConstraintIds).toEqual(CAREER_T8_B63_AUTHORIZED_NEGATIVE_METHOD_CONSTRAINT_IDS);
  });

  test('accepts a proposal that contains none of the five prohibited shortcuts', () => {
    expect(
      evaluateCareerT8ClassicalZipingNegativeClashMethodGuard({
        resolvesSemanticEffectFromClashPresenceAlone: false,
        assumesContextFreeUniformDamage: false,
        usesFixedNumericClashOffsetMultiplierOrScalar: false,
        dropsSourceRequiredContextOrAffectedTargetRole: false,
        flattensQualitativelyDivergentEffectClasses: false,
      }),
    ).toEqual({ accepted: true, violationIds: [], violationCount: 0 });
  });

  test('reports all five violations deterministically', () => {
    const result = evaluateCareerT8ClassicalZipingNegativeClashMethodGuard({
      resolvesSemanticEffectFromClashPresenceAlone: true,
      assumesContextFreeUniformDamage: true,
      usesFixedNumericClashOffsetMultiplierOrScalar: true,
      dropsSourceRequiredContextOrAffectedTargetRole: true,
      flattensQualitativelyDivergentEffectClasses: true,
    });

    expect(result.accepted).toBe(false);
    expect(result.violationCount).toBe(5);
    expect(result.violationIds).toEqual(CAREER_T8_B63_AUTHORIZED_NEGATIVE_METHOD_CONSTRAINT_IDS);
  });

  test('does not create positive semantics, methodology, rules, claims or production enforcement', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardContract(acceptedB63());

    expect(report.positiveT6InputContractEstablished).toBe(false);
    expect(report.positiveClashEffectContractEstablished).toBe(false);
    expect(report.methodologyDefinitionCreatedByThisGate).toBe(false);
    expect(report.ruleDefinitionCreatedByThisGate).toBe(false);
    expect(report.claimTypeCreatedByThisGate).toBe(false);
    expect(report.productionEnforcementEnabled).toBe(false);
    expect(report.productionImpact).toBe('NONE');
    expect(report.guardContract?.productionEnforcementEnabled).toBe(false);
  });

  test('preserves semantic, trigger, visual and historical-gap boundaries', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardContract(acceptedB63());

    expect(report.branchSourceOrMethodTriggerActivationCount).toBe(0);
    expect(report.currentCareerSemanticBridgeEstablished).toBe(false);
    expect(report.visualCorroborationHoldPreserved).toBe(true);
    expect(report.b56ChenZezhenHoldPreserved).toBe(true);
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
  });

  test('opens only a current implementation compatibility audit', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardContract(acceptedB63());

    expect(report.immediatelyExecutableCompatibilityAuditLaneCount).toBe(1);
    expect(report.immediatelyExecutableSemanticRuleLaneCount).toBe(0);
    expect(report.selectedImmediateNextLane).toBe(
      'BRANCH_CLASSICAL_ZIPING_CURRENT_CAREER_CLASH_METHOD_GUARD_COMPATIBILITY_AUDIT',
    );
    expect(report.recommendedNextGate).toBe(
      'BRANCH_CLASSICAL_ZIPING_CURRENT_CAREER_CLASH_METHOD_GUARD_COMPATIBILITY_AUDIT',
    );
  });

  test('freezes sixteen guard controls', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardContract(acceptedB63());
    expect(report.controlIds).toEqual(CAREER_T8_B64_GUARD_CONTRACT_CONTROL_IDS);
    expect(report.controlCount).toBe(16);
    expect(report.controlsFrozen).toBe(true);
  });

  test('is deterministic and fails closed on a tampered B63 content address', () => {
    const b63 = acceptedB63();
    const first = buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardContract(b63);
    const second = buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardContract(b63);
    expect(first.materializationId).toBe(second.materializationId);
    expect(first).toEqual(second);

    const failed = buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardContract({
      ...b63,
      reviewId: `${b63.reviewId}_tampered`,
    });
    expect(failed.status).toBe('UPSTREAM_B63_BOUNDARY_INVALID');
    expect(failed.guardContractCreatedByThisGate).toBe(false);
    expect(failed.guardContract).toBeNull();
    expect(failed.guardConstraintCount).toBe(0);
    expect(failed.immediatelyExecutableCompatibilityAuditLaneCount).toBe(0);
    expect(failed.selectedImmediateNextLane).toBeNull();
    expect(failed.controlCount).toBe(0);
    expect(failed.controlsFrozen).toBe(false);
  });
});
