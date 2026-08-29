import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import { buildCareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidence } from '../src/research/career-personalization-t8-branch-2004-exact-edition-body-compatibility-closure-evidence.js';
import { buildCareerPersonalizationT8Branch2009XuBingxinExactEditionBodyCompatibilityClosureEvidence } from '../src/research/career-personalization-t8-branch-2009-xu-bingxin-exact-edition-body-compatibility-closure-evidence.js';
import { buildCareerPersonalizationT8Branch2015ShishenChanweiPublicationLineageAndExactBodyAcquisitionRecheckEvidence } from '../src/research/career-personalization-t8-branch-2015-shishen-chanwei-publication-lineage-and-exact-body-acquisition-recheck-evidence.js';
import { buildCareerPersonalizationT8Branch2016LuExactEditionBodyCompatibilityClosureEvidence } from '../src/research/career-personalization-t8-branch-2016-lu-exact-edition-body-compatibility-closure-evidence.js';
import { buildCareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidence } from '../src/research/career-personalization-t8-branch-source-or-method-authority-trigger-activation-evidence.js';
import {
  CAREER_PERSONALIZATION_T8_BRANCH_TRIGGER_GATED_POST_P0_REMEDIATION_REVIEW_VERSION,
  CAREER_T8_B47_AUDITED_BASE_MAIN_COMMIT,
  CAREER_T8_B47_CONTROL_IDS,
  CAREER_T8_B47_REMEDIATION_TRIGGER_RECORDS,
  CAREER_T8_B47_TARGETED_SOURCE_RECHECK,
  type CareerPersonalizationT8BranchTriggerGatedPostP0RemediationReviewReport,
} from '../src/research/career-personalization-t8-branch-trigger-gated-post-p0-remediation-review.js';
import { buildCareerPersonalizationT8PostB52GlobalResearchHoldReview } from '../src/research/career-personalization-t8-post-b52-global-research-hold-review.js';
import { buildCareerPersonalizationT8PostB52ResearchReopenTriggerActivationEvidence } from '../src/research/career-personalization-t8-post-b52-research-reopen-trigger-activation-evidence.js';
import { buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionEvidence } from '../src/research/career-personalization-t8-branch-2023-chen-zezhen-target-clash-body-acquisition-evidence.js';
import { buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionHoldReview } from '../src/research/career-personalization-t8-branch-2023-chen-zezhen-target-clash-body-acquisition-hold-review.js';
import { buildCareerPersonalizationT8SourceFamilyCoverageAudit } from '../src/research/career-personalization-t8-source-family-coverage-audit.js';
import { buildCareerPersonalizationT8ClassicalZipingMethodSourceFamilyReconciliation } from '../src/research/career-personalization-t8-classical-ziping-method-source-family-reconciliation.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_PRIMARY_WITNESS_VERIFICATION_VERSION,
  CAREER_T8_B59_PRIMARY_WITNESS_VERIFICATION_CONTROL_IDS,
  CAREER_T8_B59_PRIMARY_WITNESS_VERIFICATION_RECORDS,
  buildCareerPersonalizationT8ClassicalZipingPrimaryWitnessVerification,
} from '../src/research/career-personalization-t8-classical-ziping-primary-witness-verification.js';

function acceptedB47(): CareerPersonalizationT8BranchTriggerGatedPostP0RemediationReviewReport {
  const material: Omit<CareerPersonalizationT8BranchTriggerGatedPostP0RemediationReviewReport, 'reviewId'> = {
    reviewVersion: CAREER_PERSONALIZATION_T8_BRANCH_TRIGGER_GATED_POST_P0_REMEDIATION_REVIEW_VERSION,
    status: 'RESOLVED_BRANCH_TRIGGER_GATED_POST_P0_REMEDIATION_REVIEW',
    decision: 'ONE_INFRASTRUCTURE_TRIGGER_CLOSED_TWO_AUTHORITY_TRIGGERS_OPEN_ZERO_SEMANTIC_LANES',
    upstreamB46ReviewId: 'b46_fixture_for_b59',
    exactB46BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    auditedBaseMainCommit: CAREER_T8_B47_AUDITED_BASE_MAIN_COMMIT,
    repositoryAuditAccepted: true,
    targetedSourceRecheckPerformed: true,
    targetedSourceRecheckDisposition: CAREER_T8_B47_TARGETED_SOURCE_RECHECK.disposition,
    remediationTriggerRecords: CAREER_T8_B47_REMEDIATION_TRIGGER_RECORDS,
    remediationTriggerCount: 3,
    satisfiedRemediationTriggerCount: 1,
    unsatisfiedRemediationTriggerCount: 2,
    sourceSpecificDependencySeparabilityOrCompletePathTriggerSatisfied: false,
    methodSpecificInputContractAndUpstreamAuthorityTriggerSatisfied: false,
    methodologyRequiredInputCoverageValidationTriggerSatisfied: true,
    exact2015PrintedTargetPassageBindingEstablished: false,
    independentSingleSourceCompletePathEstablished: false,
    sourceSpecificDependencySeparabilityEstablished: false,
    methodSpecificUpstreamAuthorityEstablished: false,
    branch2015TriggerSatisfied: false,
    branchIndependentCompletePathTriggerSatisfied: false,
    existingArchitectureCanHostMethodSpecificContracts: true,
    activeRuleSetRequiredInputCoverageValidationPresent: true,
    activeRuleSetRequiredInputCoverageValidationFailClosed: true,
    methodologyDefinitionCreatedByThisGate: false,
    methodSpecificContractAuthoringAuthorized: false,
    flatUnaryClashModifierAuthorized: false,
    crossSourceStitchingAuthorized: false,
    sourceMandatoryDependencyDroppingAuthorized: false,
    immediatelyExecutableAuthorityAdmissionLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane: null,
    broadUnchangedSurfaceSearchRestartAuthorized: false,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    t5RuleAuthoringAuthorized: false,
    t6RuleAuthoringAuthorized: false,
    t8RuleAuthoringAuthorized: false,
    claimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: CAREER_T8_B47_CONTROL_IDS,
    controlCount: 16,
    controlsFrozen: true,
    recommendedNextGate: 'BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE',
  };

  return {
    reviewId: `career_personalization_t8_branch_trigger_gated_post_p0_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function acceptedB58() {
  const b48 = buildCareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidence(acceptedB47());
  const b49 = buildCareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidence(b48);
  const b50 = buildCareerPersonalizationT8Branch2016LuExactEditionBodyCompatibilityClosureEvidence(b49);
  const b51 = buildCareerPersonalizationT8Branch2015ShishenChanweiPublicationLineageAndExactBodyAcquisitionRecheckEvidence(b50);
  const b52 = buildCareerPersonalizationT8Branch2009XuBingxinExactEditionBodyCompatibilityClosureEvidence(b51);
  const b53 = buildCareerPersonalizationT8PostB52GlobalResearchHoldReview(b52);
  const b54 = buildCareerPersonalizationT8PostB52ResearchReopenTriggerActivationEvidence(b53);
  const b55 = buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionEvidence(b54);
  const b56 = buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionHoldReview(b55);
  const b57 = buildCareerPersonalizationT8SourceFamilyCoverageAudit(b56);
  return buildCareerPersonalizationT8ClassicalZipingMethodSourceFamilyReconciliation(b57);
}

describe('Career T8 classical Zi-Ping primary witness verification', () => {
  test('accepts exact B58 and records a partial primary-witness verification result', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingPrimaryWitnessVerification(acceptedB58());

    expect(report.verificationVersion).toBe(
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_PRIMARY_WITNESS_VERIFICATION_VERSION,
    );
    expect(report.status).toBe('RESOLVED_CLASSICAL_ZIPING_CONDITIONAL_CLASH_PRIMARY_WITNESS_VERIFICATION');
    expect(report.decision).toBe(
      'THREE_EXACT_WITNESS_IDENTITIES_AND_TARGET_TEXT_COUNTERPARTS_LOCATED_ZERO_SCAN_PAGE_BINDINGS_AUTHORITY_REMAINS_CLOSED',
    );
    expect(report.exactB58BoundaryAccepted).toBe(true);
  });

  test('locates all three concrete witness identities and target-text counterparts', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingPrimaryWitnessVerification(acceptedB58());

    expect(report.verificationRecords).toEqual(CAREER_T8_B59_PRIMARY_WITNESS_VERIFICATION_RECORDS);
    expect(report.verificationRecordCount).toBe(3);
    expect(report.exactWitnessIdentityLocatedCount).toBe(3);
    expect(report.targetTextCounterpartLocatedCount).toBe(3);
    expect(report.verificationRecords.every((record) => record.mechanicalScanConfirmed)).toBe(true);
  });

  test('does not confuse witness identity with exact target-body scan-page binding', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingPrimaryWitnessVerification(acceptedB58());

    expect(report.targetPassageScanPageBoundCount).toBe(0);
    expect(report.scanPageVisualInspectionCompletedCount).toBe(0);
    expect(report.primaryWitnessVerificationComplete).toBe(false);
    expect(report.verificationRecords.every((record) => record.targetPassageScanPageBound === false)).toBe(true);
    expect(report.verificationRecords.every((record) => record.scanPageNumber === null)).toBe(true);
  });

  test('keeps every provisional classical input/effect signal non-promotable', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingPrimaryWitnessVerification(acceptedB58());

    expect(report.verificationRecords.every((record) => record.sourcePassagePromotionAuthorized === false)).toBe(true);
    expect(report.verificationRecords.every((record) => record.inputDimensionPromotionAuthorized === false)).toBe(true);
    expect(report.verificationRecords.every((record) => record.effectClassPromotionAuthorized === false)).toBe(true);
    expect(report.verificationRecords.every((record) => record.modernCareerSemanticBridgeEstablished === false)).toBe(true);
    expect(report.commonT6MethodContractEstablished).toBe(false);
    expect(report.methodologyInputContractAuthoringAuthorized).toBe(false);
    expect(report.currentCareerSemanticBridgeEstablished).toBe(false);
  });

  test('opens only exact scan-page binding and no authority or semantic lane', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingPrimaryWitnessVerification(acceptedB58());

    expect(report.immediatelyExecutableScanPageBindingLaneCount).toBe(1);
    expect(report.selectedImmediateNextLane).toBe(
      'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_TARGET_PASSAGE_SCAN_PAGE_BINDING',
    );
    expect(report.immediatelyExecutableAuthorityAdmissionLaneCount).toBe(0);
    expect(report.immediatelyExecutableSemanticRuleLaneCount).toBe(0);
    expect(report.branchAuthorityTriggerActivationCount).toBe(0);
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.productionImpact).toBe('NONE');
  });

  test('freezes sixteen controls and creates no semantic or production artifact', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingPrimaryWitnessVerification(acceptedB58());

    expect(report.controlIds).toEqual(CAREER_T8_B59_PRIMARY_WITNESS_VERIFICATION_CONTROL_IDS);
    expect(report.controlCount).toBe(16);
    expect(report.controlsFrozen).toBe(true);
    expect(report.implementationEffects).toEqual({
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
    });
    expect(report.t5RuleAuthoringAuthorized).toBe(false);
    expect(report.t6RuleAuthoringAuthorized).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
  });

  test('is deterministic and fails closed on a tampered B58 content address', () => {
    const b58 = acceptedB58();
    const first = buildCareerPersonalizationT8ClassicalZipingPrimaryWitnessVerification(b58);
    const second = buildCareerPersonalizationT8ClassicalZipingPrimaryWitnessVerification(b58);

    expect(first.verificationId).toBe(second.verificationId);
    expect(first).toEqual(second);

    const tampered = { ...b58, reconciliationId: `${b58.reconciliationId}_tampered` };
    const failed = buildCareerPersonalizationT8ClassicalZipingPrimaryWitnessVerification(tampered);
    expect(failed.status).toBe('UPSTREAM_B58_BOUNDARY_INVALID');
    expect(failed.decision).toBe('PRIMARY_WITNESS_VERIFICATION_NOT_ESTABLISHED');
    expect(failed.exactB58BoundaryAccepted).toBe(false);
    expect(failed.verificationRecordCount).toBe(0);
    expect(failed.exactWitnessIdentityLocatedCount).toBe(0);
    expect(failed.targetTextCounterpartLocatedCount).toBe(0);
    expect(failed.immediatelyExecutableScanPageBindingLaneCount).toBe(0);
    expect(failed.selectedImmediateNextLane).toBeNull();
    expect(failed.controlCount).toBe(0);
    expect(failed.controlsFrozen).toBe(false);
    expect(failed.recommendedNextGate).toBe(
      'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_PRIMARY_WITNESS_VERIFICATION',
    );
  });
});
