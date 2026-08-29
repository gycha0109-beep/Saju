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
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_METHOD_SOURCE_FAMILY_RECONCILIATION_VERSION,
  CAREER_T8_B58_CLASSICAL_METHOD_SURFACES,
  CAREER_T8_B58_RECONCILIATION_CONTROL_IDS,
  buildCareerPersonalizationT8ClassicalZipingMethodSourceFamilyReconciliation,
} from '../src/research/career-personalization-t8-classical-ziping-method-source-family-reconciliation.js';

function acceptedB47(): CareerPersonalizationT8BranchTriggerGatedPostP0RemediationReviewReport {
  const material: Omit<CareerPersonalizationT8BranchTriggerGatedPostP0RemediationReviewReport, 'reviewId'> = {
    reviewVersion: CAREER_PERSONALIZATION_T8_BRANCH_TRIGGER_GATED_POST_P0_REMEDIATION_REVIEW_VERSION,
    status: 'RESOLVED_BRANCH_TRIGGER_GATED_POST_P0_REMEDIATION_REVIEW',
    decision: 'ONE_INFRASTRUCTURE_TRIGGER_CLOSED_TWO_AUTHORITY_TRIGGERS_OPEN_ZERO_SEMANTIC_LANES',
    upstreamB46ReviewId: 'b46_fixture_for_b58',
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

function acceptedB57() {
  const b48 = buildCareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidence(acceptedB47());
  const b49 = buildCareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidence(b48);
  const b50 = buildCareerPersonalizationT8Branch2016LuExactEditionBodyCompatibilityClosureEvidence(b49);
  const b51 = buildCareerPersonalizationT8Branch2015ShishenChanweiPublicationLineageAndExactBodyAcquisitionRecheckEvidence(b50);
  const b52 = buildCareerPersonalizationT8Branch2009XuBingxinExactEditionBodyCompatibilityClosureEvidence(b51);
  const b53 = buildCareerPersonalizationT8PostB52GlobalResearchHoldReview(b52);
  const b54 = buildCareerPersonalizationT8PostB52ResearchReopenTriggerActivationEvidence(b53);
  const b55 = buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionEvidence(b54);
  const b56 = buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionHoldReview(b55);
  return buildCareerPersonalizationT8SourceFamilyCoverageAudit(b56);
}

describe('Career T8 classical Zi-Ping method source-family reconciliation', () => {
  test('accepts exact B57 and resolves only the bounded reconciliation gate', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingMethodSourceFamilyReconciliation(acceptedB57());

    expect(report.reconciliationVersion).toBe(
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_METHOD_SOURCE_FAMILY_RECONCILIATION_VERSION,
    );
    expect(report.status).toBe('RESOLVED_CLASSICAL_ZIPING_CONDITIONAL_CLASH_METHOD_SOURCE_FAMILY_RECONCILIATION');
    expect(report.decision).toBe(
      'PROVISIONAL_COMMON_CONDITIONAL_META_SHAPE_VISIBLE_PRIMARY_WITNESS_GAPS_BLOCK_COMMON_T6_METHOD_AUTHORITY_ZERO_SEMANTIC_PROMOTIONS',
    );
    expect(report.exactB57BoundaryAccepted).toBe(true);
    expect(report.methodSurfaceCount).toBe(6);
  });

  test('normalizes six classical surfaces while separating authority-grade and provenance-gap evidence', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingMethodSourceFamilyReconciliation(acceptedB57());

    expect(report.methodSurfaces).toEqual(CAREER_T8_B58_CLASSICAL_METHOD_SURFACES);
    expect(report.authorityGradeSurfaceCount).toBe(3);
    expect(report.provenanceGapSurfaceCount).toBe(3);
    expect(report.unresolvedPrimaryWitnessSurfaceIds).toEqual([
      'YUANHAI_ZIPING_ZHENGGUAN_CONTEXT',
      'SHENFENG_TONGKAO_CONDITIONAL_CLASH',
      'DITIANSHUI_CHANWEI_ROOT_STRENGTH_CLASH',
    ]);

    const provisional = report.methodSurfaces.filter(
      (surface) => surface.evidenceState === 'DIRECT_BODY_INSPECTED_PROVENANCE_GAP',
    );
    expect(provisional.every((surface) => surface.establishedInputDimensions.length === 0)).toBe(true);
    expect(provisional.every((surface) => surface.establishedEffectClasses.length === 0)).toBe(true);
  });

  test('does not universalize source-specific dependencies into a common input contract', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingMethodSourceFamilyReconciliation(acceptedB57());
    const shenfeng = report.methodSurfaces.find(
      (surface) => surface.surfaceId === 'SHENFENG_TONGKAO_CONDITIONAL_CLASH',
    );
    const ditian = report.methodSurfaces.find(
      (surface) => surface.surfaceId === 'DITIANSHUI_CHANWEI_ROOT_STRENGTH_CLASH',
    );

    expect(shenfeng?.provisionalInputDimensions).toContain('AFFECTED_TARGET_ROLE_OR_USEFULNESS');
    expect(ditian?.provisionalInputDimensions).toContain('ROOT_OR_SUPPORT_STATE');
    expect(report.commonT6MethodContractEstablished).toBe(false);
    expect(report.methodologyInputContractAuthoringAuthorized).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.sourceMandatoryDependencyDroppingAuthorized).toBe(false);
  });

  test('preserves the Mingli Yueyan effect split without pretending it isolates branch clash', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingMethodSourceFamilyReconciliation(acceptedB57());
    const mingli = report.methodSurfaces.find((surface) => surface.surfaceId === 'MINGLI_YUEYAN_KAN_ZHENGGUAN');

    expect(mingli?.evidenceState).toBe('INSTITUTIONAL_EXACT_WITNESS_DIRECT');
    expect(mingli?.interactionGranularity).toBe('CLASH_OR_BREAK_GROUPED_NOT_ISOLATED');
    expect(mingli?.establishedEffectClasses).toEqual([
      'QUALITATIVE_ATTENUATION',
      'QUALITATIVE_BREAK_OR_FAILURE',
    ]);
    expect(mingli?.flatUnaryEffectSupported).toBe(false);
    expect(mingli?.modernCareerSemanticBridgeEstablished).toBe(false);
  });

  test('records a provisional common meta-shape but authorizes neither uniform damage nor a numeric modifier', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingMethodSourceFamilyReconciliation(acceptedB57());

    expect(report.provisionalCommonMetaShapeObserved).toBe(true);
    expect(report.provisionalCommonMetaShape).toHaveLength(5);
    expect(report.flatUnaryClashModifierSupported).toBe(false);
    expect(report.uniformDamageEffectSupported).toBe(false);
    expect(report.numericScalarEffectAuthorized).toBe(false);
    expect(report.effectClassFlatteningAuthorized).toBe(false);
    expect(report.currentCareerSemanticBridgeEstablished).toBe(false);
  });

  test('opens only primary-witness verification and keeps all semantic authority closed', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingMethodSourceFamilyReconciliation(acceptedB57());

    expect(report.immediatelyExecutablePrimaryWitnessVerificationLaneCount).toBe(1);
    expect(report.selectedImmediateNextLane).toBe(
      'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_PRIMARY_WITNESS_VERIFICATION',
    );
    expect(report.immediatelyExecutableAuthorityAdmissionLaneCount).toBe(0);
    expect(report.immediatelyExecutableSemanticRuleLaneCount).toBe(0);
    expect(report.branchAuthorityTriggerActivationCount).toBe(0);
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.t5RuleAuthoringAuthorized).toBe(false);
    expect(report.t6RuleAuthoringAuthorized).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
  });

  test('freezes sixteen controls and zero production artifacts', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingMethodSourceFamilyReconciliation(acceptedB57());

    expect(report.controlIds).toEqual(CAREER_T8_B58_RECONCILIATION_CONTROL_IDS);
    expect(report.controlCount).toBe(16);
    expect(report.controlsFrozen).toBe(true);
    expect(report.implementationEffects).toEqual({
      methodSourceFamilyReconciliationsCreated: 1,
      normalizedClassicalMethodSurfacesRecorded: 6,
      authorityGradeMethodSurfacesRecorded: 3,
      provenanceGapMethodSurfacesRecorded: 3,
      commonT6MethodContractsCreated: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
      productionBehaviorsChanged: 0,
    });
  });

  test('is deterministic and fails closed when the B57 content address is tampered', () => {
    const b57 = acceptedB57();
    const first = buildCareerPersonalizationT8ClassicalZipingMethodSourceFamilyReconciliation(b57);
    const second = buildCareerPersonalizationT8ClassicalZipingMethodSourceFamilyReconciliation(b57);

    expect(first.reconciliationId).toBe(second.reconciliationId);
    expect(first).toEqual(second);

    const tampered = { ...b57, auditId: `${b57.auditId}_tampered` };
    const failed = buildCareerPersonalizationT8ClassicalZipingMethodSourceFamilyReconciliation(tampered);
    expect(failed.status).toBe('UPSTREAM_B57_BOUNDARY_INVALID');
    expect(failed.decision).toBe('CLASSICAL_METHOD_SOURCE_FAMILY_RECONCILIATION_NOT_ESTABLISHED');
    expect(failed.exactB57BoundaryAccepted).toBe(false);
    expect(failed.methodSurfaceCount).toBe(0);
    expect(failed.authorityGradeSurfaceCount).toBe(0);
    expect(failed.provenanceGapSurfaceCount).toBe(0);
    expect(failed.immediatelyExecutablePrimaryWitnessVerificationLaneCount).toBe(0);
    expect(failed.selectedImmediateNextLane).toBeNull();
    expect(failed.controlCount).toBe(0);
    expect(failed.controlsFrozen).toBe(false);
    expect(failed.recommendedNextGate).toBe(
      'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_METHOD_SOURCE_FAMILY_RECONCILIATION',
    );
  });
});
