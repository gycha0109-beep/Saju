import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_PRIMARY_WITNESS_VERIFICATION_VERSION,
  CAREER_T8_B59_PRIMARY_WITNESS_VERIFICATION_CONTROL_IDS,
  CAREER_T8_B59_PRIMARY_WITNESS_VERIFICATION_RECORDS,
  type CareerPersonalizationT8ClassicalZipingPrimaryWitnessVerificationReport,
} from '../src/research/career-personalization-t8-classical-ziping-primary-witness-verification.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_TARGET_PASSAGE_SCAN_LOCALIZATION_VERSION,
  CAREER_T8_B60_TARGET_PASSAGE_LOCALIZATION_CONTROL_IDS,
  CAREER_T8_B60_TARGET_PASSAGE_LOCALIZATION_RECORDS,
  buildCareerPersonalizationT8ClassicalZipingTargetPassageScanLocalization,
} from '../src/research/career-personalization-t8-classical-ziping-target-passage-scan-localization.js';

function acceptedB59(): CareerPersonalizationT8ClassicalZipingPrimaryWitnessVerificationReport {
  const material: Omit<CareerPersonalizationT8ClassicalZipingPrimaryWitnessVerificationReport, 'verificationId'> = {
    verificationVersion: CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_PRIMARY_WITNESS_VERIFICATION_VERSION,
    status: 'RESOLVED_CLASSICAL_ZIPING_CONDITIONAL_CLASH_PRIMARY_WITNESS_VERIFICATION',
    decision:
      'THREE_EXACT_WITNESS_IDENTITIES_AND_TARGET_TEXT_COUNTERPARTS_LOCATED_ZERO_SCAN_PAGE_BINDINGS_AUTHORITY_REMAINS_CLOSED',
    upstreamB58ReconciliationId: 'b58_content_addressed_fixture_for_b60',
    exactB58BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    verificationRecords: CAREER_T8_B59_PRIMARY_WITNESS_VERIFICATION_RECORDS,
    verificationRecordCount: 3,
    exactWitnessIdentityLocatedCount: 3,
    targetTextCounterpartLocatedCount: 3,
    targetPassageScanPageBoundCount: 0,
    scanPageVisualInspectionCompletedCount: 0,
    primaryWitnessVerificationComplete: false,
    commonT6MethodContractEstablished: false,
    methodologyInputContractAuthoringAuthorized: false,
    currentCareerSemanticBridgeEstablished: false,
    branchAuthorityTriggerActivationCount: 0,
    immediatelyExecutableScanPageBindingLaneCount: 1,
    immediatelyExecutableAuthorityAdmissionLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane: 'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_TARGET_PASSAGE_SCAN_PAGE_BINDING',
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
    controlIds: CAREER_T8_B59_PRIMARY_WITNESS_VERIFICATION_CONTROL_IDS,
    controlCount: 16,
    controlsFrozen: true,
    implementationEffects: {
      primaryWitnessVerificationReportsCreated: 1,
      exactWitnessIdentitiesLocated: 3,
      targetTextCounterpartsLocated: 3,
      targetPassagesScanPageBound: 0,
      sourcePassagesPromoted: 0,
      commonT6MethodContractsCreated: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
      productionBehaviorsChanged: 0,
    },
    recommendedNextGate: 'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_TARGET_PASSAGE_SCAN_PAGE_BINDING',
  };

  return {
    verificationId: `career_personalization_t8_classical_ziping_primary_witness_verification_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career T8 classical Zi-Ping target-passage scan localization', () => {
  test('accepts the exact B59 content-addressed boundary', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingTargetPassageScanLocalization(acceptedB59());

    expect(report.localizationVersion).toBe(
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_TARGET_PASSAGE_SCAN_LOCALIZATION_VERSION,
    );
    expect(report.status).toBe('RESOLVED_CLASSICAL_ZIPING_CONDITIONAL_CLASH_TARGET_PASSAGE_SCAN_LOCALIZATION');
    expect(report.decision).toBe(
      'THREE_TARGET_TEXTS_LOCALIZED_ONE_SAME_EDITION_INDEX_MATCH_TWO_INDEPENDENT_PRINTED_PAGE_ANCHORS_ZERO_VISUAL_BINDINGS_AUTHORITY_REMAINS_CLOSED',
    );
    expect(report.exactB59BoundaryAccepted).toBe(true);
  });

  test('records three exact target-text localizations without edition substitution', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingTargetPassageScanLocalization(acceptedB59());

    expect(report.localizationRecords).toEqual(CAREER_T8_B60_TARGET_PASSAGE_LOCALIZATION_RECORDS);
    expect(report.localizationRecordCount).toBe(3);
    expect(report.exactTargetTextMatchedCount).toBe(3);
    expect(report.localizationRecords.every((record) => record.b59SameEditionPreserved)).toBe(true);
  });

  test('separates one same-edition indexed match from two independent printed-page anchors', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingTargetPassageScanLocalization(acceptedB59());
    const yuanhai = report.localizationRecords.find((record) => record.surfaceId === 'YUANHAI_ZIPING_ZHENGGUAN_CONTEXT');
    const shenfeng = report.localizationRecords.find((record) => record.surfaceId === 'SHENFENG_TONGKAO_CONDITIONAL_CLASH');
    const ditian = report.localizationRecords.find((record) => record.surfaceId === 'DITIANSHUI_CHANWEI_ROOT_STRENGTH_CLASH');

    expect(report.sameEditionTargetBodyIndexedCount).toBe(1);
    expect(report.independentPrintedPageAnchorCount).toBe(2);
    expect(yuanhai?.independentWitnessPrintedPageAnchor).toBe(15);
    expect(shenfeng?.independentWitnessPrintedPageAnchor).toBe(47);
    expect(ditian?.sameEditionTargetBodyIndexed).toBe(true);
    expect(ditian?.independentWitnessPrintedPageAnchor).toBeNull();
  });

  test('does not convert indexed text or printed-page anchors into visual scan binding', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingTargetPassageScanLocalization(acceptedB59());

    expect(report.sameEditionVisualScanPageBoundCount).toBe(0);
    expect(report.scanPageVisualInspectionCompletedCount).toBe(0);
    expect(report.localizationRecords.every((record) => record.sameEditionScanPageOrdinalKnown === false)).toBe(true);
    expect(report.localizationRecords.every((record) => record.sameEditionVisualScanInspectionCompleted === false)).toBe(true);
  });

  test('keeps all semantic and method promotions closed', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingTargetPassageScanLocalization(acceptedB59());

    expect(report.localizationRecords.every((record) => record.sourcePassagePromotionAuthorized === false)).toBe(true);
    expect(report.localizationRecords.every((record) => record.inputDimensionPromotionAuthorized === false)).toBe(true);
    expect(report.localizationRecords.every((record) => record.effectClassPromotionAuthorized === false)).toBe(true);
    expect(report.commonT6MethodContractEstablished).toBe(false);
    expect(report.methodologyInputContractAuthoringAuthorized).toBe(false);
    expect(report.currentCareerSemanticBridgeEstablished).toBe(false);
    expect(report.branchAuthorityTriggerActivationCount).toBe(0);
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.productionImpact).toBe('NONE');
  });

  test('opens only narrowed visual scan confirmation', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingTargetPassageScanLocalization(acceptedB59());

    expect(report.immediatelyExecutableVisualScanConfirmationLaneCount).toBe(1);
    expect(report.selectedImmediateNextLane).toBe(
      'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_TARGET_PASSAGE_VISUAL_SCAN_CONFIRMATION',
    );
    expect(report.immediatelyExecutableAuthorityAdmissionLaneCount).toBe(0);
    expect(report.immediatelyExecutableSemanticRuleLaneCount).toBe(0);
  });

  test('freezes sixteen localization controls', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingTargetPassageScanLocalization(acceptedB59());

    expect(report.controlIds).toEqual(CAREER_T8_B60_TARGET_PASSAGE_LOCALIZATION_CONTROL_IDS);
    expect(report.controlCount).toBe(16);
    expect(report.controlsFrozen).toBe(true);
  });

  test('is deterministic and fails closed on B59 tampering', () => {
    const b59 = acceptedB59();
    const first = buildCareerPersonalizationT8ClassicalZipingTargetPassageScanLocalization(b59);
    const second = buildCareerPersonalizationT8ClassicalZipingTargetPassageScanLocalization(b59);
    expect(first.localizationId).toBe(second.localizationId);
    expect(first).toEqual(second);

    const failed = buildCareerPersonalizationT8ClassicalZipingTargetPassageScanLocalization({
      ...b59,
      verificationId: `${b59.verificationId}_tampered`,
    });
    expect(failed.status).toBe('UPSTREAM_B59_BOUNDARY_INVALID');
    expect(failed.decision).toBe('TARGET_PASSAGE_SCAN_LOCALIZATION_NOT_ESTABLISHED');
    expect(failed.exactB59BoundaryAccepted).toBe(false);
    expect(failed.localizationRecordCount).toBe(0);
    expect(failed.immediatelyExecutableVisualScanConfirmationLaneCount).toBe(0);
    expect(failed.selectedImmediateNextLane).toBeNull();
    expect(failed.controlCount).toBe(0);
    expect(failed.controlsFrozen).toBe(false);
  });
});
