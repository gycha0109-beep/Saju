import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_TEXT_BOUND_METHOD_AUTHORITY_REASSESSMENT_VERSION,
  CAREER_T8_B62_NEGATIVE_METHOD_CONSTRAINT_CANDIDATE,
  CAREER_T8_B62_TEXT_BOUND_METHOD_EVIDENCE_RECORDS,
  CAREER_T8_B62_TEXT_BOUND_METHOD_REASSESSMENT_CONTROL_IDS,
  type CareerPersonalizationT8ClassicalZipingTextBoundMethodAuthorityReassessmentReport,
} from '../src/research/career-personalization-t8-classical-ziping-text-bound-method-authority-reassessment.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_SCOPE_AUTHORITY_REVIEW_VERSION,
  CAREER_T8_B63_AUTHORIZED_NEGATIVE_METHOD_CONSTRAINT_IDS,
  CAREER_T8_B63_SCOPE_CONTROL_IDS,
  buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodScopeAuthorityReview,
} from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-scope-authority-review.js';

function acceptedB62(): CareerPersonalizationT8ClassicalZipingTextBoundMethodAuthorityReassessmentReport {
  const material: Omit<CareerPersonalizationT8ClassicalZipingTextBoundMethodAuthorityReassessmentReport, 'reassessmentId'> = {
    reassessmentVersion: CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_TEXT_BOUND_METHOD_AUTHORITY_REASSESSMENT_VERSION,
    status: 'RESOLVED_CLASSICAL_ZIPING_TEXT_BOUND_METHOD_AUTHORITY_REASSESSMENT',
    decision:
      'SIX_TEXT_BOUND_SURFACES_SUPPORT_COMMON_NEGATIVE_METHOD_CONSTRAINT_CANDIDATE_POSITIVE_T6_INPUT_CONTRACT_UNRESOLVED_SEPARATE_SCOPE_AUTHORITY_REVIEW_REQUIRED',
    upstreamB61HoldId: 'b61_fixture_for_b63',
    exactB61BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    b58ReconciliationVersion: 'myeonghwa-career-personalization-t8-classical-ziping-method-source-family-reconciliation-v1',
    evidenceRecords: CAREER_T8_B62_TEXT_BOUND_METHOD_EVIDENCE_RECORDS,
    evidenceRecordCount: 6,
    textBoundMethodReassessmentEligibleCount: 6,
    commonPositiveT6InputContractEstablished: false,
    commonNegativeMethodConstraintCandidateObserved: true,
    commonNegativeMethodConstraintEvidenceAdequateForScopeReview: true,
    negativeMethodConstraintCandidate: CAREER_T8_B62_NEGATIVE_METHOD_CONSTRAINT_CANDIDATE,
    flatUnaryClashModifierSupported: false,
    contextFreeUniformDamageSupported: false,
    fixedNumericClashScalarSupported: false,
    sourceRequiredContextDroppingAuthorized: false,
    effectClassFlatteningAuthorized: false,
    commonT6MethodContractEstablished: false,
    methodologyInputContractAuthoringAuthorized: false,
    currentCareerSemanticBridgeEstablished: false,
    branchAuthorityTriggerActivationCount: 0,
    immediatelyExecutableMethodScopeAuthorityReviewLaneCount: 1,
    immediatelyExecutableMethodologyDefinitionLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane: 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_SCOPE_AUTHORITY_REVIEW',
    visualCorroborationHoldPreserved: true,
    b56ChenZezhenHoldPreserved: true,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    methodologyDefinitionCreatedByThisGate: false,
    t5RuleAuthoringAuthorized: false,
    t6RuleAuthoringAuthorized: false,
    t8RuleAuthoringAuthorized: false,
    claimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: CAREER_T8_B62_TEXT_BOUND_METHOD_REASSESSMENT_CONTROL_IDS,
    controlCount: 16,
    controlsFrozen: true,
    implementationEffects: Object.freeze({
      reassessmentReportsCreated: 1,
      textBoundMethodEvidenceRecordsCreated: 6,
      negativeMethodConstraintCandidatesCreated: 1,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
      productionBehaviorsChanged: 0,
    }),
    recommendedNextGate: 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_SCOPE_AUTHORITY_REVIEW',
  };

  return {
    reassessmentId: `career_personalization_t8_classical_ziping_text_bound_method_authority_reassessment_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career T8 classical Zi-Ping negative clash method scope authority review', () => {
  test('authorizes exactly the bounded five-part negative research method scope', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodScopeAuthorityReview(acceptedB62());

    expect(report.reviewVersion).toBe(
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_SCOPE_AUTHORITY_REVIEW_VERSION,
    );
    expect(report.status).toBe('RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_SCOPE_AUTHORITY_REVIEW');
    expect(report.decision).toBe(
      'FIVE_NEGATIVE_CLASH_METHOD_CONSTRAINTS_AUTHORIZED_AS_BOUNDED_RESEARCH_SCOPE_NO_POSITIVE_EFFECT_INPUT_CONTRACT_SEMANTIC_RULE_OR_PRODUCTION_AUTHORITY',
    );
    expect(report.exactB62BoundaryAccepted).toBe(true);
    expect(report.boundedNegativeMethodScopeAuthorityEstablished).toBe(true);
    expect(report.boundedMethodScopeAuthorityChangeCount).toBe(1);
    expect(report.authorizedNegativeConstraintIds).toEqual(CAREER_T8_B63_AUTHORIZED_NEGATIVE_METHOD_CONSTRAINT_IDS);
    expect(report.authorizedNegativeConstraintCount).toBe(5);
  });

  test('authorizes a follow-up guard contract but no positive clash effect contract', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodScopeAuthorityReview(acceptedB62());

    expect(report.negativeMethodGuardContractAuthoringAuthorized).toBe(true);
    expect(report.positiveT6InputContractEstablished).toBe(false);
    expect(report.positiveClashEffectContractEstablished).toBe(false);
    expect(report.positiveClashEffectAuthoringAuthorized).toBe(false);
    expect(report.commonT6MethodContractEstablished).toBe(false);
  });

  test('makes flat unary damage, numeric scalar, dependency dropping and effect flattening explicitly unauthorized', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodScopeAuthorityReview(acceptedB62());

    expect(report.flatUnaryClashModifierAuthoringAuthorized).toBe(false);
    expect(report.contextFreeUniformDamageAuthoringAuthorized).toBe(false);
    expect(report.fixedNumericClashScalarAuthoringAuthorized).toBe(false);
    expect(report.sourceRequiredContextDroppingAuthorized).toBe(false);
    expect(report.effectClassFlatteningAuthorized).toBe(false);
  });

  test('does not misclassify the bounded scope change as the B48-style method trigger', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodScopeAuthorityReview(acceptedB62());

    expect(report.boundedMethodScopeAuthorityChangeCount).toBe(1);
    expect(report.branchSourceOrMethodTriggerActivationCount).toBe(0);
    expect(report.methodologyDefinitionCreatedByThisGate).toBe(false);
    expect(report.ruleDefinitionCreatedByThisGate).toBe(false);
    expect(report.claimTypeCreatedByThisGate).toBe(false);
  });

  test('keeps modern Career semantic authority and all six T8 semantic gaps separate', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodScopeAuthorityReview(acceptedB62());

    expect(report.currentCareerSemanticBridgeEstablished).toBe(false);
    expect(report.careerT8SemanticAuthorityAdmittedByThisGate).toBe(false);
    expect(report.careerT8AuthorityGapClosedByThisGate).toBe(false);
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
  });

  test('preserves both visual corroboration and Chen Zezhen holds', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodScopeAuthorityReview(acceptedB62());

    expect(report.visualCorroborationHoldPreserved).toBe(true);
    expect(report.b56ChenZezhenHoldPreserved).toBe(true);
  });

  test('opens only the negative method guard contract lane', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodScopeAuthorityReview(acceptedB62());

    expect(report.immediatelyExecutableNegativeMethodGuardContractLaneCount).toBe(1);
    expect(report.immediatelyExecutablePositiveMethodContractLaneCount).toBe(0);
    expect(report.immediatelyExecutableSemanticRuleLaneCount).toBe(0);
    expect(report.selectedImmediateNextLane).toBe('BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT');
    expect(report.recommendedNextGate).toBe('BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT');
  });

  test('creates no runtime semantic artifact and has no production impact', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodScopeAuthorityReview(acceptedB62());

    expect(report.t5RuleAuthoringAuthorized).toBe(false);
    expect(report.t6PositiveEffectRuleAuthoringAuthorized).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
    expect(report.implementationEffects.negativeMethodGuardContractsCreated).toBe(0);
    expect(report.implementationEffects.methodologyDefinitionsCreated).toBe(0);
    expect(report.implementationEffects.ruleDefinitionsCreated).toBe(0);
    expect(report.implementationEffects.productionBehaviorsChanged).toBe(0);
  });

  test('freezes sixteen scope controls', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodScopeAuthorityReview(acceptedB62());

    expect(report.controlIds).toEqual(CAREER_T8_B63_SCOPE_CONTROL_IDS);
    expect(report.controlCount).toBe(16);
    expect(report.controlsFrozen).toBe(true);
  });

  test('is deterministic and fails closed on a tampered B62 content address', () => {
    const b62 = acceptedB62();
    const first = buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodScopeAuthorityReview(b62);
    const second = buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodScopeAuthorityReview(b62);

    expect(first.reviewId).toBe(second.reviewId);
    expect(first).toEqual(second);

    const failed = buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodScopeAuthorityReview({
      ...b62,
      reassessmentId: `${b62.reassessmentId}_tampered`,
    });
    expect(failed.status).toBe('UPSTREAM_B62_BOUNDARY_INVALID');
    expect(failed.decision).toBe('NEGATIVE_CLASH_METHOD_SCOPE_AUTHORITY_NOT_ESTABLISHED');
    expect(failed.exactB62BoundaryAccepted).toBe(false);
    expect(failed.boundedNegativeMethodScopeAuthorityEstablished).toBe(false);
    expect(failed.boundedMethodScopeAuthorityChangeCount).toBe(0);
    expect(failed.authorizedNegativeConstraintCount).toBe(0);
    expect(failed.negativeMethodGuardContractAuthoringAuthorized).toBe(false);
    expect(failed.immediatelyExecutableNegativeMethodGuardContractLaneCount).toBe(0);
    expect(failed.selectedImmediateNextLane).toBeNull();
    expect(failed.controlCount).toBe(0);
    expect(failed.controlsFrozen).toBe(false);
  });
});
