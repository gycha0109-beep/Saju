import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_TARGET_PASSAGE_SCAN_LOCALIZATION_VERSION,
  CAREER_T8_B60_TARGET_PASSAGE_LOCALIZATION_CONTROL_IDS,
  CAREER_T8_B60_TARGET_PASSAGE_LOCALIZATION_RECORDS,
  type CareerPersonalizationT8ClassicalZipingTargetPassageScanLocalizationReport,
} from '../src/research/career-personalization-t8-classical-ziping-target-passage-scan-localization.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_VISUAL_SCAN_CONFIRMATION_HOLD_VERSION,
  CAREER_T8_B61_VISUAL_ACCESS_ATTEMPT_RECORDS,
  CAREER_T8_B61_VISUAL_SCAN_CONFIRMATION_HOLD_CONTROL_IDS,
  CAREER_T8_B61_VISUAL_SCAN_REOPEN_TRIGGERS,
  buildCareerPersonalizationT8ClassicalZipingVisualScanConfirmationHold,
} from '../src/research/career-personalization-t8-classical-ziping-visual-scan-confirmation-hold.js';

function acceptedB60(): CareerPersonalizationT8ClassicalZipingTargetPassageScanLocalizationReport {
  const material: Omit<CareerPersonalizationT8ClassicalZipingTargetPassageScanLocalizationReport, 'localizationId'> = {
    localizationVersion: CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_TARGET_PASSAGE_SCAN_LOCALIZATION_VERSION,
    status: 'RESOLVED_CLASSICAL_ZIPING_CONDITIONAL_CLASH_TARGET_PASSAGE_SCAN_LOCALIZATION',
    decision:
      'THREE_TARGET_TEXTS_LOCALIZED_ONE_SAME_EDITION_INDEX_MATCH_TWO_INDEPENDENT_PRINTED_PAGE_ANCHORS_ZERO_VISUAL_BINDINGS_AUTHORITY_REMAINS_CLOSED',
    upstreamB59VerificationId: 'b59_fixture_for_b61',
    exactB59BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    localizationRecords: CAREER_T8_B60_TARGET_PASSAGE_LOCALIZATION_RECORDS,
    localizationRecordCount: 3,
    exactTargetTextMatchedCount: 3,
    sameEditionTargetBodyIndexedCount: 1,
    independentPrintedPageAnchorCount: 2,
    sameEditionVisualScanPageBoundCount: 0,
    scanPageVisualInspectionCompletedCount: 0,
    commonT6MethodContractEstablished: false,
    methodologyInputContractAuthoringAuthorized: false,
    currentCareerSemanticBridgeEstablished: false,
    branchAuthorityTriggerActivationCount: 0,
    immediatelyExecutableVisualScanConfirmationLaneCount: 1,
    immediatelyExecutableAuthorityAdmissionLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane: 'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_TARGET_PASSAGE_VISUAL_SCAN_CONFIRMATION',
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
    controlIds: CAREER_T8_B60_TARGET_PASSAGE_LOCALIZATION_CONTROL_IDS,
    controlCount: 16,
    controlsFrozen: true,
    recommendedNextGate: 'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_TARGET_PASSAGE_VISUAL_SCAN_CONFIRMATION',
  };

  return {
    localizationId: `career_personalization_t8_classical_ziping_target_passage_scan_localization_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career T8 classical Zi-Ping visual scan confirmation hold', () => {
  test('accepts exact B60 and holds visual corroboration while preserving text-bound reassessment', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingVisualScanConfirmationHold(acceptedB60());

    expect(report.holdVersion).toBe(CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_VISUAL_SCAN_CONFIRMATION_HOLD_VERSION);
    expect(report.status).toBe('RESOLVED_CLASSICAL_ZIPING_TARGET_PASSAGE_VISUAL_SCAN_CONFIRMATION_HOLD');
    expect(report.decision).toBe(
      'VISUAL_CORROBORATION_HELD_ZERO_EXACT_VISUAL_BINDINGS_TEXT_BOUND_METHOD_AUTHORITY_REASSESSMENT_REMAINS_OPEN',
    );
    expect(report.exactB60BoundaryAccepted).toBe(true);
    expect(report.targetPassageVisualConfirmationHoldActive).toBe(true);
    expect(report.textBoundHistoricalWitnessMethodReassessmentAuthorized).toBe(true);
  });

  test('records all three exact-witness access states without claiming a target image', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingVisualScanConfirmationHold(acceptedB60());

    expect(report.visualAccessAttemptRecords).toEqual(CAREER_T8_B61_VISUAL_ACCESS_ATTEMPT_RECORDS);
    expect(report.visualAccessAttemptRecordCount).toBe(3);
    expect(report.exactWitnessTargetPageImageAcquiredCount).toBe(0);
    expect(report.exactWitnessTargetPageVisuallyInspectedCount).toBe(0);
    expect(report.visualAccessAttemptRecords.every((record) => record.exactWitnessTargetPageImageAcquired === false)).toBe(true);
    expect(report.visualAccessAttemptRecords.every((record) => record.exactWitnessTargetPageVisuallyInspected === false)).toBe(true);
  });

  test('preserves the stronger same-edition Ditian indexed-text state without promoting it to visual evidence', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingVisualScanConfirmationHold(acceptedB60());
    const ditian = report.visualAccessAttemptRecords.find(
      (record) => record.surfaceId === 'DITIANSHUI_CHANWEI_ROOT_STRENGTH_CLASH',
    );

    expect(ditian?.exactWitnessTargetBodyIndexed).toBe(true);
    expect(ditian?.exactWitnessTargetPageOrdinalKnown).toBe(false);
    expect(ditian?.exactWitnessTargetPageVisuallyInspected).toBe(false);
  });

  test('freezes three unsatisfied material-access visual reopen triggers', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingVisualScanConfirmationHold(acceptedB60());

    expect(report.reopenTriggers).toEqual(CAREER_T8_B61_VISUAL_SCAN_REOPEN_TRIGGERS);
    expect(report.reopenTriggerCount).toBe(3);
    expect(report.satisfiedReopenTriggerCount).toBe(0);
    expect(report.sameFailedSurfaceRetryAuthorized).toBe(false);
    expect(report.broadClassicalSearchRestartAuthorized).toBe(false);
  });

  test('closes visual and semantic lanes but opens exactly one text-bound method reassessment lane', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingVisualScanConfirmationHold(acceptedB60());

    expect(report.immediatelyExecutableVisualScanConfirmationLaneCount).toBe(0);
    expect(report.immediatelyExecutableTextBoundMethodReassessmentLaneCount).toBe(1);
    expect(report.immediatelyExecutableAuthorityAdmissionLaneCount).toBe(0);
    expect(report.immediatelyExecutableSemanticRuleLaneCount).toBe(0);
    expect(report.selectedImmediateNextLane).toBe('BRANCH_CLASSICAL_ZIPING_TEXT_BOUND_METHOD_AUTHORITY_REASSESSMENT');
    expect(report.branchAuthorityTriggerActivationCount).toBe(0);
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
  });

  test('keeps all method, rule and production promotion forbidden at the visual hold gate', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingVisualScanConfirmationHold(acceptedB60());

    expect(report.commonT6MethodContractEstablished).toBe(false);
    expect(report.methodologyInputContractAuthoringAuthorized).toBe(false);
    expect(report.currentCareerSemanticBridgeEstablished).toBe(false);
    expect(report.authorityAdmittedByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
    expect(report.t5RuleAuthoringAuthorized).toBe(false);
    expect(report.t6RuleAuthoringAuthorized).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
  });

  test('freezes sixteen hold controls and selects text-bound method reassessment as the next gate', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingVisualScanConfirmationHold(acceptedB60());

    expect(report.controlIds).toEqual(CAREER_T8_B61_VISUAL_SCAN_CONFIRMATION_HOLD_CONTROL_IDS);
    expect(report.controlCount).toBe(16);
    expect(report.controlsFrozen).toBe(true);
    expect(report.recommendedNextGate).toBe('BRANCH_CLASSICAL_ZIPING_TEXT_BOUND_METHOD_AUTHORITY_REASSESSMENT');
  });

  test('is deterministic and fails closed on a tampered B60 content address', () => {
    const b60 = acceptedB60();
    const first = buildCareerPersonalizationT8ClassicalZipingVisualScanConfirmationHold(b60);
    const second = buildCareerPersonalizationT8ClassicalZipingVisualScanConfirmationHold(b60);
    expect(first.holdId).toBe(second.holdId);
    expect(first).toEqual(second);

    const failed = buildCareerPersonalizationT8ClassicalZipingVisualScanConfirmationHold({
      ...b60,
      localizationId: `${b60.localizationId}_tampered`,
    });
    expect(failed.status).toBe('UPSTREAM_B60_BOUNDARY_INVALID');
    expect(failed.decision).toBe('VISUAL_SCAN_CONFIRMATION_HOLD_NOT_ESTABLISHED');
    expect(failed.exactB60BoundaryAccepted).toBe(false);
    expect(failed.visualAccessAttemptRecordCount).toBe(0);
    expect(failed.reopenTriggerCount).toBe(0);
    expect(failed.targetPassageVisualConfirmationHoldActive).toBe(false);
    expect(failed.textBoundHistoricalWitnessMethodReassessmentAuthorized).toBe(false);
    expect(failed.immediatelyExecutableTextBoundMethodReassessmentLaneCount).toBe(0);
    expect(failed.selectedImmediateNextLane).toBeNull();
    expect(failed.controlCount).toBe(0);
    expect(failed.controlsFrozen).toBe(false);
    expect(failed.recommendedNextGate).toBe(
      'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_TARGET_PASSAGE_VISUAL_SCAN_CONFIRMATION',
    );
  });
});
