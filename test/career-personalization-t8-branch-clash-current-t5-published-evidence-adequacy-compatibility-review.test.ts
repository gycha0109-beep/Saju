import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_RESIDUAL_AUTHORITY_FRONTIER_RECONCILIATION_VERSION,
  CAREER_T8_B39_FRONTIER_RECONCILIATION_CONTROL_IDS,
  CAREER_T8_B39_RESIDUAL_FRONTIER_RECORDS,
  type CareerPersonalizationT8ResidualAuthorityFrontierReconciliationReport,
} from '../src/research/career-personalization-t8-residual-authority-frontier-reconciliation.js';
import {
  CAREER_PERSONALIZATION_T8_BRANCH_CLASH_CURRENT_T5_PUBLISHED_EVIDENCE_ADEQUACY_COMPATIBILITY_REVIEW_VERSION,
  CAREER_T8_B40_BRANCH_ADEQUACY_COMPATIBILITY_CONTROL_IDS,
  CAREER_T8_B40_BRANCH_REMEDIATION_REQUIREMENT_IDS,
  buildCareerPersonalizationT8BranchClashCurrentT5PublishedEvidenceAdequacyCompatibilityReview,
} from '../src/research/career-personalization-t8-branch-clash-current-t5-published-evidence-adequacy-compatibility-review.js';

function acceptedB39(): CareerPersonalizationT8ResidualAuthorityFrontierReconciliationReport {
  const material: Omit<CareerPersonalizationT8ResidualAuthorityFrontierReconciliationReport, 'reconciliationId'> = {
    reconciliationVersion: CAREER_PERSONALIZATION_T8_RESIDUAL_AUTHORITY_FRONTIER_RECONCILIATION_VERSION,
    status: 'RESOLVED_CAREER_PERSONALIZATION_T8_RESIDUAL_AUTHORITY_FRONTIER_RECONCILIATION',
    decision:
      'ONE_BOUNDED_POSITION_AUTHORITY_ADMITTED_ALL_HISTORICAL_GAPS_REMAIN_OPEN_BRANCH_IS_NEXT_BOUNDED_EXECUTABLE_REVIEW_LANE',
    upstreamB38ReviewId: 'b38_fixture_for_b40',
    exactB38BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    frontierRecords: CAREER_T8_B39_RESIDUAL_FRONTIER_RECORDS,
    frontierRecordCount: 9,
    admittedBoundedAuthorityComponentCount: 1,
    remainingAdmissionReadyComponentCount: 0,
    historicalGapClosureReadyCount: 0,
    positionAuthorityAdmitted: true,
    branchTriggerReopened: true,
    branchExactPublishedEditionPassageBindingEstablished: false,
    branchCurrentMethodCompatibilityEstablished: false,
    branchAuthorityAdmissionReady: false,
    familyCoverageClass: 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE',
    familyCurrentMethodCompatibleAlternatePathCount: 0,
    familyAdmissionReadyCandidateCount: 0,
    qinP464DirectBodyAcquired: false,
    qianli1936P50ToP53ExactPagesBound: false,
    visibilityConsumedByCurrentContinuation: false,
    pluralityConsumedByCurrentContinuation: false,
    pluralityHeldUnderI254: true,
    seasonalConsumedByCurrentContinuation: false,
    conflictPolicyDisposition: 'PACK_LEVEL_DEFERRED',
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityGapClosedByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: CAREER_T8_B39_FRONTIER_RECONCILIATION_CONTROL_IDS,
    controlCount: 13,
    controlsFrozen: true,
    recommendedNextGate: 'BRANCH_CLASH_CURRENT_T5_PUBLISHED_EVIDENCE_ADEQUACY_AND_COMPATIBILITY_REVIEW',
  };
  return {
    reconciliationId: `career_personalization_t8_residual_authority_frontier_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career Branch clash current-T5 published evidence adequacy and compatibility', () => {
  test('accepts the exact B39 content-addressed frontier boundary', () => {
    const report = buildCareerPersonalizationT8BranchClashCurrentT5PublishedEvidenceAdequacyCompatibilityReview(acceptedB39());
    expect(report.reviewVersion).toBe(
      CAREER_PERSONALIZATION_T8_BRANCH_CLASH_CURRENT_T5_PUBLISHED_EVIDENCE_ADEQUACY_COMPATIBILITY_REVIEW_VERSION,
    );
    expect(report.status).toBe('RESOLVED_BRANCH_CLASH_CURRENT_T5_PUBLISHED_EVIDENCE_ADEQUACY_AND_COMPATIBILITY_REVIEW');
    expect(report.exactB39BoundaryAccepted).toBe(true);
  });

  test('preserves exact Zhengguan formal-responsibility semantics', () => {
    const report = buildCareerPersonalizationT8BranchClashCurrentT5PublishedEvidenceAdequacyCompatibilityReview(acceptedB39());
    expect(report.exactTenGod).toBe('정관');
    expect(report.currentT5SemanticKey).toBe('TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY');
    expect(report.currentT5Facet).toBe('formal_responsibility');
  });

  test('preserves only qualitative ATTENUATES_OR_REDUCES_EXPRESSION', () => {
    const report = buildCareerPersonalizationT8BranchClashCurrentT5PublishedEvidenceAdequacyCompatibilityReview(acceptedB39());
    expect(report.branchModificationMode).toBe('ATTENUATES_OR_REDUCES_EXPRESSION');
    expect(report.t5BaseSemanticDeletedOrMutated).toBe(false);
  });

  test('classifies the Branch evidence as material partial rather than admission-ready', () => {
    const report = buildCareerPersonalizationT8BranchClashCurrentT5PublishedEvidenceAdequacyCompatibilityReview(acceptedB39());
    expect(report.branchPublishedEvidenceAdequacyClass).toBe('MATERIAL_PARTIAL_REQUIREMENT_COVERAGE');
    expect(report.branchPublishedEditionProvenanceAdequate).toBe(true);
    expect(report.branchSameWorkSemanticMechanismMaterial).toBe(true);
    expect(report.branchAuthorityAdmissionReady).toBe(false);
  });

  test('preserves same-work full-text and limiting evidence', () => {
    const report = buildCareerPersonalizationT8BranchClashCurrentT5PublishedEvidenceAdequacyCompatibilityReview(acceptedB39());
    expect(report.branchSameWorkFullTextLineageInspected).toBe(true);
    expect(report.branchSameWorkLimitObserved).toBe(true);
  });

  test('fails exact-edition admission requirement because the 2015 printed target passage is not bound', () => {
    const report = buildCareerPersonalizationT8BranchClashCurrentT5PublishedEvidenceAdequacyCompatibilityReview(acceptedB39());
    expect(report.branchExactPublishedEditionPassageBindingEstablished).toBe(false);
  });

  test('does not declare current-method compatibility while distance strength Wangshuai dependencies remain', () => {
    const report = buildCareerPersonalizationT8BranchClashCurrentT5PublishedEvidenceAdequacyCompatibilityReview(acceptedB39());
    expect(report.branchDistanceStrengthWangshuaiDependencyObserved).toBe(true);
    expect(report.branchCurrentMethodCompatibilityDisposition).toBe(
      'NOT_ESTABLISHED_PENDING_DEPENDENCY_SEPARABILITY_EVIDENCE',
    );
    expect(report.branchCurrentMethodCompatibilityEstablished).toBe(false);
  });

  test('forbids silently dropping source dependencies to force compatibility', () => {
    const report = buildCareerPersonalizationT8BranchClashCurrentT5PublishedEvidenceAdequacyCompatibilityReview(acceptedB39());
    expect(report.branchDependencyMayBeSilentlyDropped).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
  });

  test('freezes the two explicit remediation requirements', () => {
    const report = buildCareerPersonalizationT8BranchClashCurrentT5PublishedEvidenceAdequacyCompatibilityReview(acceptedB39());
    expect(report.remediationRequirementIds).toEqual(CAREER_T8_B40_BRANCH_REMEDIATION_REQUIREMENT_IDS);
    expect(report.remediationRequirementCount).toBe(2);
  });

  test('preserves the already admitted Position component while admitting no Branch authority', () => {
    const report = buildCareerPersonalizationT8BranchClashCurrentT5PublishedEvidenceAdequacyCompatibilityReview(acceptedB39());
    expect(report.positionBoundedAuthorityComponentCountPreserved).toBe(1);
    expect(report.branchAuthorityAdmittedByThisGate).toBe(false);
    expect(report.branchGapClosureReady).toBe(false);
    expect(report.branchGapClosedByThisGate).toBe(false);
  });

  test('introduces no weighting modernization precedence or runtime effects', () => {
    const report = buildCareerPersonalizationT8BranchClashCurrentT5PublishedEvidenceAdequacyCompatibilityReview(acceptedB39());
    expect(report.numericWeightingIntroduced).toBe(false);
    expect(report.occupationPromotionStatusOutcomeImported).toBe(false);
    expect(report.winnerPrecedenceLogicIntroduced).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
  });

  test('keeps all six historical gaps open and routes to a remediation trigger readiness gate', () => {
    const report = buildCareerPersonalizationT8BranchClashCurrentT5PublishedEvidenceAdequacyCompatibilityReview(acceptedB39());
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.authorityGapClosedByThisGate).toBe(false);
    expect(report.controlIds).toEqual(CAREER_T8_B40_BRANCH_ADEQUACY_COMPATIBILITY_CONTROL_IDS);
    expect(report.controlCount).toBe(13);
    expect(report.controlsFrozen).toBe(true);
    expect(report.recommendedNextGate).toBe(
      'BRANCH_CLASH_EXACT_EDITION_AND_METHOD_DEPENDENCY_REMEDIATION_TRIGGER_READINESS_REVIEW',
    );
  });

  test('fails closed when B39 content-addressed identity is tampered', () => {
    const b39 = acceptedB39();
    const tampered: CareerPersonalizationT8ResidualAuthorityFrontierReconciliationReport = {
      ...b39,
      reconciliationId: `${b39.reconciliationId}_tampered`,
    };
    const report = buildCareerPersonalizationT8BranchClashCurrentT5PublishedEvidenceAdequacyCompatibilityReview(tampered);
    expect(report.status).toBe('UPSTREAM_B39_BOUNDARY_INVALID');
    expect(report.decision).toBe('BRANCH_PUBLISHED_EVIDENCE_ADEQUACY_COMPATIBILITY_NOT_ESTABLISHED');
    expect(report.branchPublishedEditionProvenanceAdequate).toBe(false);
    expect(report.positionBoundedAuthorityComponentCountPreserved).toBe(0);
    expect(report.controlCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
  });
});
