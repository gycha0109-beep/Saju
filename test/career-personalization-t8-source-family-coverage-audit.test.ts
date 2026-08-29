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
import {
  CAREER_PERSONALIZATION_T8_SOURCE_FAMILY_COVERAGE_AUDIT_VERSION,
  CAREER_T8_B57_ACADEMIC_CANONICAL_BENCHMARK,
  CAREER_T8_B57_CANONICAL_COVERAGE_RECORDS,
  CAREER_T8_B57_COVERAGE_AUDIT_CONTROL_IDS,
  CAREER_T8_B57_MINGLI_YUEYAN_1935_EXACT_BODY_EVIDENCE,
  buildCareerPersonalizationT8SourceFamilyCoverageAudit,
} from '../src/research/career-personalization-t8-source-family-coverage-audit.js';

function acceptedB47(): CareerPersonalizationT8BranchTriggerGatedPostP0RemediationReviewReport {
  const material: Omit<CareerPersonalizationT8BranchTriggerGatedPostP0RemediationReviewReport, 'reviewId'> = {
    reviewVersion: CAREER_PERSONALIZATION_T8_BRANCH_TRIGGER_GATED_POST_P0_REMEDIATION_REVIEW_VERSION,
    status: 'RESOLVED_BRANCH_TRIGGER_GATED_POST_P0_REMEDIATION_REVIEW',
    decision: 'ONE_INFRASTRUCTURE_TRIGGER_CLOSED_TWO_AUTHORITY_TRIGGERS_OPEN_ZERO_SEMANTIC_LANES',
    upstreamB46ReviewId: 'b46_fixture_for_b57',
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

function acceptedB56() {
  const b48 = buildCareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidence(acceptedB47());
  const b49 = buildCareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidence(b48);
  const b50 = buildCareerPersonalizationT8Branch2016LuExactEditionBodyCompatibilityClosureEvidence(b49);
  const b51 = buildCareerPersonalizationT8Branch2015ShishenChanweiPublicationLineageAndExactBodyAcquisitionRecheckEvidence(b50);
  const b52 = buildCareerPersonalizationT8Branch2009XuBingxinExactEditionBodyCompatibilityClosureEvidence(b51);
  const b53 = buildCareerPersonalizationT8PostB52GlobalResearchHoldReview(b52);
  const b54 = buildCareerPersonalizationT8PostB52ResearchReopenTriggerActivationEvidence(b53);
  const b55 = buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionEvidence(b54);
  return buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionHoldReview(b55);
}

describe('Career T8 source-family coverage audit', () => {
  test('accepts exact B56 and rejects a field-wide sufficiency claim', () => {
    const report = buildCareerPersonalizationT8SourceFamilyCoverageAudit(acceptedB56());

    expect(report.auditVersion).toBe(CAREER_PERSONALIZATION_T8_SOURCE_FAMILY_COVERAGE_AUDIT_VERSION);
    expect(report.status).toBe('RESOLVED_CAREER_PERSONALIZATION_T8_SOURCE_FAMILY_COVERAGE_AUDIT');
    expect(report.decision).toBe(
      'RESEARCH_VOLUME_SUBSTANTIAL_FIELD_COVERAGE_INCOMPLETE_MATERIAL_CLASSICAL_METHOD_GAPS_IDENTIFIED_ONE_BOUNDED_METHOD_RECONCILIATION_LANE_OPENED_ZERO_AUTHORITY_PROMOTIONS',
    );
    expect(report.exactB56BoundaryAccepted).toBe(true);
    expect(report.researchVolumeSubstantial).toBe(true);
    expect(report.fieldWideCoverageClaimSupported).toBe(false);
  });

  test('uses the nine-work academic benchmark only as historiographic coverage structure', () => {
    const report = buildCareerPersonalizationT8SourceFamilyCoverageAudit(acceptedB56());

    expect(report.academicBenchmark).toEqual(CAREER_T8_B57_ACADEMIC_CANONICAL_BENCHMARK);
    expect(report.canonicalBenchmarkCount).toBe(9);
    expect(report.repositoryDirectCanonicalCoverageCount).toBe(2);
    expect(report.uncoveredCanonicalBenchmarkCount).toBe(7);
    expect(report.materiallyRelevantUncoveredCanonicalCount).toBe(4);
    expect(report.canonicalCoverageRecords).toEqual(CAREER_T8_B57_CANONICAL_COVERAGE_RECORDS);
  });

  test('separates low-genealogical gaps from four material classical method gaps', () => {
    const report = buildCareerPersonalizationT8SourceFamilyCoverageAudit(acceptedB56());
    const material = report.canonicalCoverageRecords.filter(
      (record) =>
        record.currentQuestionMateriality === 'HIGH_CONDITIONAL_CLASH_METHOD' ||
        record.currentQuestionMateriality === 'CRITICAL_CONDITIONAL_ZHENGGUAN_CLASH_EFFECT',
    );

    expect(material.map((record) => record.title)).toEqual([
      '淵海子平',
      '神峰通考命理正宗',
      '精選命理約言',
      '滴天髓闡微',
    ]);
    expect(report.newlyInspectedMaterialClassicalSurfaceCount).toBe(4);
    expect(report.newlyBoundExactHistoricalMaterialBodyCount).toBe(1);
    expect(report.materialClassicalMethodCoverageGapEstablished).toBe(true);
  });

  test('binds Mingli Yueyan as exact 1935 method evidence without modern Career promotion', () => {
    const report = buildCareerPersonalizationT8SourceFamilyCoverageAudit(acceptedB56());
    const mingli = report.mingliYueyan1935Evidence;

    expect(mingli).toEqual(CAREER_T8_B57_MINGLI_YUEYAN_1935_EXACT_BODY_EVIDENCE);
    expect(mingli?.exactHistoricalScanIdentityBound).toBe(true);
    expect(mingli?.targetBodyDirectlyInspected).toBe(true);
    expect(mingli?.exactTenGod).toBe('정관');
    expect(mingli?.clashOrBreakListedAsDirectAdverseCondition).toBe(true);
    expect(mingli?.strongGuanEffectClass).toBe('QUALITATIVE_ATTENUATION_REDUCES_GUIQI');
    expect(mingli?.weakGuanEffectClass).toBe('QUALITATIVE_BREAK_OR_FAILURE');
    expect(mingli?.sourceDefinesOneUniformClashEffectAcrossStrengthStates).toBe(false);
    expect(mingli?.modernCareerWorkSemanticBridgeEstablished).toBe(false);
    expect(mingli?.currentT5FormalResponsibilitySemanticBridgeEstablished).toBe(false);
  });

  test('keeps context-free flat clash promotion unauthorized while not claiming a new governed method', () => {
    const report = buildCareerPersonalizationT8SourceFamilyCoverageAudit(acceptedB56());

    expect(report.researchCoverageSufficientToPromoteFlatUnaryModifier).toBe(false);
    expect(report.evidenceSupportsKeepingFlatUnaryModifierUnauthorized).toBe(true);
    expect(report.newGovernedMethodAuthorityEstablished).toBe(false);
    expect(report.branchSourceSpecificDependencySeparabilityOrCompletePathAuthorityTriggerSatisfied).toBe(false);
    expect(report.branchMethodSpecificInputContractAndUpstreamAuthorityTriggerSatisfied).toBe(false);
    expect(report.branchAuthorityTriggerActivationCount).toBe(0);
  });

  test('opens one methodology-audit lane rather than an authority or semantic lane', () => {
    const report = buildCareerPersonalizationT8SourceFamilyCoverageAudit(acceptedB56());

    expect(report.immediatelyExecutableMethodologyAuditLaneCount).toBe(1);
    expect(report.selectedImmediateNextLane).toBe(
      'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_METHOD_SOURCE_FAMILY_RECONCILIATION',
    );
    expect(report.immediatelyExecutableAuthorityAdmissionLaneCount).toBe(0);
    expect(report.immediatelyExecutableSemanticRuleLaneCount).toBe(0);
    expect(report.recommendedNextGate).toBe(
      'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_METHOD_SOURCE_FAMILY_RECONCILIATION',
    );
  });

  test('preserves B56 Chen hold and all authority/production boundaries', () => {
    const report = buildCareerPersonalizationT8SourceFamilyCoverageAudit(acceptedB56());

    expect(report.b56ChenZezhenHoldPreserved).toBe(true);
    expect(report.broadBlindSourceSearchRestartAuthorized).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.sourceMandatoryDependencyDroppingAuthorized).toBe(false);
    expect(report.effectClassFlatteningAuthorized).toBe(false);
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.authorityAdmittedByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
    expect(report.methodologyDefinitionCreatedByThisGate).toBe(false);
    expect(report.t5RuleAuthoringAuthorized).toBe(false);
    expect(report.t6RuleAuthoringAuthorized).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
  });

  test('freezes fourteen controls and deterministic implementation effects', () => {
    const report = buildCareerPersonalizationT8SourceFamilyCoverageAudit(acceptedB56());

    expect(report.controlIds).toEqual(CAREER_T8_B57_COVERAGE_AUDIT_CONTROL_IDS);
    expect(report.controlCount).toBe(14);
    expect(report.controlsFrozen).toBe(true);
    expect(report.implementationEffects).toEqual({
      sourceFamilyCoverageAuditsCreated: 1,
      materialClassicalCoverageGapsRecorded: 4,
      exactHistoricalMethodBodiesBound: 1,
      methodologyAuditLanesOpened: 1,
      authorityTriggersActivated: 0,
      authorityComponentsAdmitted: 0,
      authorityGapsClosed: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
      productionBehaviorsChanged: 0,
    });
  });

  test('is deterministic and fails closed on a tampered B56 content address', () => {
    const b56 = acceptedB56();
    const first = buildCareerPersonalizationT8SourceFamilyCoverageAudit(b56);
    const second = buildCareerPersonalizationT8SourceFamilyCoverageAudit(b56);

    expect(first.auditId).toBe(second.auditId);
    expect(first).toEqual(second);

    const tampered = { ...b56, reviewId: `${b56.reviewId}_tampered` };
    const failed = buildCareerPersonalizationT8SourceFamilyCoverageAudit(tampered);
    expect(failed.status).toBe('UPSTREAM_B56_BOUNDARY_INVALID');
    expect(failed.decision).toBe('SOURCE_FAMILY_COVERAGE_AUDIT_NOT_ESTABLISHED');
    expect(failed.exactB56BoundaryAccepted).toBe(false);
    expect(failed.canonicalBenchmarkCount).toBe(0);
    expect(failed.materiallyRelevantUncoveredCanonicalCount).toBe(0);
    expect(failed.immediatelyExecutableMethodologyAuditLaneCount).toBe(0);
    expect(failed.selectedImmediateNextLane).toBeNull();
    expect(failed.controlCount).toBe(0);
    expect(failed.controlsFrozen).toBe(false);
    expect(failed.recommendedNextGate).toBe('CAREER_PERSONALIZATION_T8_SOURCE_FAMILY_COVERAGE_AUDIT');
  });
});
