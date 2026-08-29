import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_VISUAL_SCAN_CONFIRMATION_HOLD_VERSION,
  CAREER_T8_B61_VISUAL_ACCESS_ATTEMPT_RECORDS,
  CAREER_T8_B61_VISUAL_SCAN_CONFIRMATION_HOLD_CONTROL_IDS,
  CAREER_T8_B61_VISUAL_SCAN_REOPEN_TRIGGERS,
  type CareerPersonalizationT8ClassicalZipingVisualScanConfirmationHoldReport,
} from '../src/research/career-personalization-t8-classical-ziping-visual-scan-confirmation-hold.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_TEXT_BOUND_METHOD_AUTHORITY_REASSESSMENT_VERSION,
  CAREER_T8_B62_NEGATIVE_METHOD_CONSTRAINT_CANDIDATE,
  CAREER_T8_B62_TEXT_BOUND_METHOD_EVIDENCE_RECORDS,
  CAREER_T8_B62_TEXT_BOUND_METHOD_REASSESSMENT_CONTROL_IDS,
  buildCareerPersonalizationT8ClassicalZipingTextBoundMethodAuthorityReassessment,
} from '../src/research/career-personalization-t8-classical-ziping-text-bound-method-authority-reassessment.js';

function acceptedB61(): CareerPersonalizationT8ClassicalZipingVisualScanConfirmationHoldReport {
  const material: Omit<CareerPersonalizationT8ClassicalZipingVisualScanConfirmationHoldReport, 'holdId'> = {
    holdVersion: CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_VISUAL_SCAN_CONFIRMATION_HOLD_VERSION,
    status: 'RESOLVED_CLASSICAL_ZIPING_TARGET_PASSAGE_VISUAL_SCAN_CONFIRMATION_HOLD',
    decision:
      'VISUAL_CORROBORATION_HELD_ZERO_EXACT_VISUAL_BINDINGS_TEXT_BOUND_METHOD_AUTHORITY_REASSESSMENT_REMAINS_OPEN',
    upstreamB60LocalizationId: 'b60_fixture_for_b62',
    exactB60BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    visualAccessAttemptRecords: CAREER_T8_B61_VISUAL_ACCESS_ATTEMPT_RECORDS,
    visualAccessAttemptRecordCount: 3,
    exactWitnessTargetPageImageAcquiredCount: 0,
    exactWitnessTargetPageVisuallyInspectedCount: 0,
    targetPassageVisualConfirmationHoldActive: true,
    reopenTriggers: CAREER_T8_B61_VISUAL_SCAN_REOPEN_TRIGGERS,
    reopenTriggerCount: 3,
    satisfiedReopenTriggerCount: 0,
    sameFailedSurfaceRetryAuthorized: false,
    broadClassicalSearchRestartAuthorized: false,
    textBoundHistoricalWitnessMethodReassessmentAuthorized: true,
    commonT6MethodContractEstablished: false,
    methodologyInputContractAuthoringAuthorized: false,
    currentCareerSemanticBridgeEstablished: false,
    branchAuthorityTriggerActivationCount: 0,
    immediatelyExecutableVisualScanConfirmationLaneCount: 0,
    immediatelyExecutableTextBoundMethodReassessmentLaneCount: 1,
    immediatelyExecutableAuthorityAdmissionLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane: 'BRANCH_CLASSICAL_ZIPING_TEXT_BOUND_METHOD_AUTHORITY_REASSESSMENT',
    b56ChenZezhenHoldPreserved: true,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    methodologyDefinitionCreatedByThisGate: false,
    t5RuleAuthoringAuthorized: false,
    t6RuleAuthoringAuthorized: false,
    t8RuleAuthoringAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: CAREER_T8_B61_VISUAL_SCAN_CONFIRMATION_HOLD_CONTROL_IDS,
    controlCount: 16,
    controlsFrozen: true,
    recommendedNextGate: 'BRANCH_CLASSICAL_ZIPING_TEXT_BOUND_METHOD_AUTHORITY_REASSESSMENT',
  };

  return {
    holdId: `career_personalization_t8_classical_ziping_visual_scan_confirmation_hold_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career T8 classical Zi-Ping text-bound method authority reassessment', () => {
  test('accepts exact B61 and resolves a bounded reassessment only', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingTextBoundMethodAuthorityReassessment(acceptedB61());

    expect(report.reassessmentVersion).toBe(
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_TEXT_BOUND_METHOD_AUTHORITY_REASSESSMENT_VERSION,
    );
    expect(report.status).toBe('RESOLVED_CLASSICAL_ZIPING_TEXT_BOUND_METHOD_AUTHORITY_REASSESSMENT');
    expect(report.decision).toBe(
      'SIX_TEXT_BOUND_SURFACES_SUPPORT_COMMON_NEGATIVE_METHOD_CONSTRAINT_CANDIDATE_POSITIVE_T6_INPUT_CONTRACT_UNRESOLVED_SEPARATE_SCOPE_AUTHORITY_REVIEW_REQUIRED',
    );
    expect(report.exactB61BoundaryAccepted).toBe(true);
  });

  test('reassesses all six normalized classical surfaces as text-bound method evidence', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingTextBoundMethodAuthorityReassessment(acceptedB61());

    expect(report.evidenceRecords).toEqual(CAREER_T8_B62_TEXT_BOUND_METHOD_EVIDENCE_RECORDS);
    expect(report.evidenceRecordCount).toBe(6);
    expect(report.textBoundMethodReassessmentEligibleCount).toBe(6);
    expect(new Set(report.evidenceRecords.map((record) => record.surfaceId)).size).toBe(6);
  });

  test('preserves source-specific context dimensions instead of inventing one positive T6 input schema', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingTextBoundMethodAuthorityReassessment(acceptedB61());
    const dimensionSignatures = new Set(
      report.evidenceRecords.map((record) => [...record.reassessedInputDimensions].sort().join('|')),
    );

    expect(dimensionSignatures.size).toBeGreaterThan(1);
    expect(report.commonPositiveT6InputContractEstablished).toBe(false);
    expect(report.commonT6MethodContractEstablished).toBe(false);
    expect(report.methodologyInputContractAuthoringAuthorized).toBe(false);
  });

  test('finds a five-part negative method-constraint candidate without admitting it as methodology authority', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingTextBoundMethodAuthorityReassessment(acceptedB61());

    expect(report.commonNegativeMethodConstraintCandidateObserved).toBe(true);
    expect(report.commonNegativeMethodConstraintEvidenceAdequateForScopeReview).toBe(true);
    expect(report.negativeMethodConstraintCandidate).toEqual(CAREER_T8_B62_NEGATIVE_METHOD_CONSTRAINT_CANDIDATE);
    expect(report.negativeMethodConstraintCandidate?.constraints).toHaveLength(5);
    expect(report.negativeMethodConstraintCandidate?.scopeAuthorityAdmittedByThisGate).toBe(false);
    expect(report.methodologyDefinitionCreatedByThisGate).toBe(false);
    expect(report.authorityAdmittedByThisGate).toBe(false);
  });

  test('rejects the flat unary, uniform damage, fixed scalar and dependency-dropping shortcuts', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingTextBoundMethodAuthorityReassessment(acceptedB61());

    expect(report.evidenceRecords.every((record) => record.interactionPresenceAloneSufficient === false)).toBe(true);
    expect(report.evidenceRecords.every((record) => record.contextFreeUniformDamageSupported === false)).toBe(true);
    expect(report.evidenceRecords.every((record) => record.fixedNumericClashScalarSupported === false)).toBe(true);
    expect(report.evidenceRecords.every((record) => record.sourceRequiredContextMayBeDropped === false)).toBe(true);
    expect(report.flatUnaryClashModifierSupported).toBe(false);
    expect(report.contextFreeUniformDamageSupported).toBe(false);
    expect(report.fixedNumericClashScalarSupported).toBe(false);
    expect(report.sourceRequiredContextDroppingAuthorized).toBe(false);
    expect(report.effectClassFlatteningAuthorized).toBe(false);
  });

  test('preserves visual hold and modern Career semantic separation', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingTextBoundMethodAuthorityReassessment(acceptedB61());

    expect(report.visualCorroborationHoldPreserved).toBe(true);
    expect(report.b56ChenZezhenHoldPreserved).toBe(true);
    expect(report.evidenceRecords.every((record) => record.modernCareerSemanticBridgeEstablished === false)).toBe(true);
    expect(report.currentCareerSemanticBridgeEstablished).toBe(false);
  });

  test('opens only a separate method-scope authority review lane under repository governance precedent', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingTextBoundMethodAuthorityReassessment(acceptedB61());

    expect(report.branchAuthorityTriggerActivationCount).toBe(0);
    expect(report.immediatelyExecutableMethodScopeAuthorityReviewLaneCount).toBe(1);
    expect(report.immediatelyExecutableMethodologyDefinitionLaneCount).toBe(0);
    expect(report.immediatelyExecutableSemanticRuleLaneCount).toBe(0);
    expect(report.selectedImmediateNextLane).toBe(
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_SCOPE_AUTHORITY_REVIEW',
    );
    expect(report.recommendedNextGate).toBe(
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_SCOPE_AUTHORITY_REVIEW',
    );
  });

  test('keeps all six historical Career T8 gaps and all executable semantic artifacts closed', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingTextBoundMethodAuthorityReassessment(acceptedB61());

    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.authorityGapClosedByThisGate).toBe(false);
    expect(report.t5RuleAuthoringAuthorized).toBe(false);
    expect(report.t6RuleAuthoringAuthorized).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.claimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
    expect(report.implementationEffects.methodologyDefinitionsCreated).toBe(0);
    expect(report.implementationEffects.ruleDefinitionsCreated).toBe(0);
    expect(report.implementationEffects.claimTypesCreated).toBe(0);
    expect(report.implementationEffects.interpretationPacksCreated).toBe(0);
  });

  test('freezes sixteen reassessment controls', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingTextBoundMethodAuthorityReassessment(acceptedB61());

    expect(report.controlIds).toEqual(CAREER_T8_B62_TEXT_BOUND_METHOD_REASSESSMENT_CONTROL_IDS);
    expect(report.controlCount).toBe(16);
    expect(report.controlsFrozen).toBe(true);
  });

  test('is deterministic and fails closed on a tampered B61 content address', () => {
    const b61 = acceptedB61();
    const first = buildCareerPersonalizationT8ClassicalZipingTextBoundMethodAuthorityReassessment(b61);
    const second = buildCareerPersonalizationT8ClassicalZipingTextBoundMethodAuthorityReassessment(b61);

    expect(first.reassessmentId).toBe(second.reassessmentId);
    expect(first).toEqual(second);

    const failed = buildCareerPersonalizationT8ClassicalZipingTextBoundMethodAuthorityReassessment({
      ...b61,
      holdId: `${b61.holdId}_tampered`,
    });
    expect(failed.status).toBe('UPSTREAM_B61_BOUNDARY_INVALID');
    expect(failed.decision).toBe('TEXT_BOUND_METHOD_AUTHORITY_REASSESSMENT_NOT_ESTABLISHED');
    expect(failed.exactB61BoundaryAccepted).toBe(false);
    expect(failed.evidenceRecordCount).toBe(0);
    expect(failed.commonNegativeMethodConstraintCandidateObserved).toBe(false);
    expect(failed.commonNegativeMethodConstraintEvidenceAdequateForScopeReview).toBe(false);
    expect(failed.negativeMethodConstraintCandidate).toBeNull();
    expect(failed.immediatelyExecutableMethodScopeAuthorityReviewLaneCount).toBe(0);
    expect(failed.selectedImmediateNextLane).toBeNull();
    expect(failed.controlCount).toBe(0);
    expect(failed.controlsFrozen).toBe(false);
  });
});
