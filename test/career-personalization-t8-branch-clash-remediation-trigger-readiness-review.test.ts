import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_BRANCH_CLASH_CURRENT_T5_PUBLISHED_EVIDENCE_ADEQUACY_COMPATIBILITY_REVIEW_VERSION,
  CAREER_T8_B40_BRANCH_ADEQUACY_COMPATIBILITY_CONTROL_IDS,
  CAREER_T8_B40_BRANCH_REMEDIATION_REQUIREMENT_IDS,
  type CareerPersonalizationT8BranchClashCurrentT5PublishedEvidenceAdequacyCompatibilityReviewReport,
} from '../src/research/career-personalization-t8-branch-clash-current-t5-published-evidence-adequacy-compatibility-review.js';
import {
  CAREER_PERSONALIZATION_T8_BRANCH_CLASH_REMEDIATION_TRIGGER_READINESS_REVIEW_VERSION,
  CAREER_T8_B41_BRANCH_REMEDIATION_TRIGGER_CONTRACTS,
  CAREER_T8_B41_BRANCH_REMEDIATION_TRIGGER_CONTROL_IDS,
  buildCareerPersonalizationT8BranchClashRemediationTriggerReadinessReview,
} from '../src/research/career-personalization-t8-branch-clash-remediation-trigger-readiness-review.js';

function acceptedB40(): CareerPersonalizationT8BranchClashCurrentT5PublishedEvidenceAdequacyCompatibilityReviewReport {
  const material: Omit<
    CareerPersonalizationT8BranchClashCurrentT5PublishedEvidenceAdequacyCompatibilityReviewReport,
    'reviewId'
  > = {
    reviewVersion:
      CAREER_PERSONALIZATION_T8_BRANCH_CLASH_CURRENT_T5_PUBLISHED_EVIDENCE_ADEQUACY_COMPATIBILITY_REVIEW_VERSION,
    status: 'RESOLVED_BRANCH_CLASH_CURRENT_T5_PUBLISHED_EVIDENCE_ADEQUACY_AND_COMPATIBILITY_REVIEW',
    decision:
      'BRANCH_PUBLISHED_EVIDENCE_MATERIAL_FOR_BOUNDED_MODIFIER_BUT_EXACT_EDITION_BINDING_AND_CURRENT_METHOD_COMPATIBILITY_NOT_ESTABLISHED_AUTHORITY_NOT_ADMISSION_READY',
    upstreamB39ReconciliationId: 'b39_fixture_for_b41',
    exactB39BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    exactTenGod: '정관',
    currentT5SemanticKey: 'TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY',
    currentT5Facet: 'formal_responsibility',
    branchModificationMode: 'ATTENUATES_OR_REDUCES_EXPRESSION',
    branchPublishedEvidenceAdequacyClass: 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE',
    branchPublishedEditionProvenanceAdequate: true,
    branchSameWorkFullTextLineageInspected: true,
    branchSameWorkSemanticMechanismMaterial: true,
    branchSameWorkLimitObserved: true,
    branchExactPublishedEditionPassageBindingEstablished: false,
    branchDistanceStrengthWangshuaiDependencyObserved: true,
    branchCurrentMethodCompatibilityDisposition: 'NOT_ESTABLISHED_PENDING_DEPENDENCY_SEPARABILITY_EVIDENCE',
    branchCurrentMethodCompatibilityEstablished: false,
    branchDependencyMayBeSilentlyDropped: false,
    branchAuthorityAdmissionReady: false,
    branchAuthorityAdmittedByThisGate: false,
    branchGapClosureReady: false,
    branchGapClosedByThisGate: false,
    remediationRequirementIds: CAREER_T8_B40_BRANCH_REMEDIATION_REQUIREMENT_IDS,
    remediationRequirementCount: 2,
    positionBoundedAuthorityComponentCountPreserved: 1,
    crossSourceStitchingAuthorized: false,
    numericWeightingIntroduced: false,
    t5BaseSemanticDeletedOrMutated: false,
    occupationPromotionStatusOutcomeImported: false,
    winnerPrecedenceLogicIntroduced: false,
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
    controlIds: CAREER_T8_B40_BRANCH_ADEQUACY_COMPATIBILITY_CONTROL_IDS,
    controlCount: 13,
    controlsFrozen: true,
    recommendedNextGate: 'BRANCH_CLASH_EXACT_EDITION_AND_METHOD_DEPENDENCY_REMEDIATION_TRIGGER_READINESS_REVIEW',
  };

  return {
    reviewId: `career_personalization_t8_branch_clash_current_t5_published_evidence_adequacy_compatibility_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career Branch clash remediation trigger readiness', () => {
  test('accepts the exact content-addressed B40 boundary', () => {
    const report = buildCareerPersonalizationT8BranchClashRemediationTriggerReadinessReview(acceptedB40());
    expect(report.reviewVersion).toBe(CAREER_PERSONALIZATION_T8_BRANCH_CLASH_REMEDIATION_TRIGGER_READINESS_REVIEW_VERSION);
    expect(report.status).toBe(
      'RESOLVED_BRANCH_CLASH_EXACT_EDITION_AND_METHOD_DEPENDENCY_REMEDIATION_TRIGGER_READINESS_REVIEW',
    );
    expect(report.exactB40BoundaryAccepted).toBe(true);
  });

  test('preserves the exact two B40 remediation requirements', () => {
    const report = buildCareerPersonalizationT8BranchClashRemediationTriggerReadinessReview(acceptedB40());
    expect(report.remediationRequirementIds).toEqual(CAREER_T8_B40_BRANCH_REMEDIATION_REQUIREMENT_IDS);
    expect(report.remediationRequirementCount).toBe(2);
  });

  test('freezes exactly two branch remediation trigger contracts', () => {
    const report = buildCareerPersonalizationT8BranchClashRemediationTriggerReadinessReview(acceptedB40());
    expect(report.triggerContracts).toEqual(CAREER_T8_B41_BRANCH_REMEDIATION_TRIGGER_CONTRACTS);
    expect(report.triggerContractCount).toBe(2);
  });

  test('requires the existing 2015 path to resolve exact-edition binding and same-path compatibility together', () => {
    const contract = CAREER_T8_B41_BRANCH_REMEDIATION_TRIGGER_CONTRACTS[0];
    expect(contract.triggerId).toBe('BRANCH_2015_EXACT_EDITION_COMPATIBILITY_TRIGGER');
    expect(contract.requiredConditions).toHaveLength(4);
    expect(contract.requiredConditions.join(' ')).toContain('exact 2015 printed edition');
    expect(contract.requiredConditions.join(' ')).toContain('same 2015 source path');
    expect(contract.laneReopensWhenAllConditionsSatisfied).toBe(true);
  });

  test('requires an alternate path to independently satisfy the complete Branch authority requirements', () => {
    const contract = CAREER_T8_B41_BRANCH_REMEDIATION_TRIGGER_CONTRACTS[1];
    expect(contract.triggerId).toBe('BRANCH_INDEPENDENT_COMPLETE_PATH_TRIGGER');
    expect(contract.requiredConditions).toHaveLength(4);
    expect(contract.requiredConditions.join(' ')).toContain('one source path independently');
    expect(contract.prohibitedSubstitutes.join(' ')).toContain('Cross-source stitching');
  });

  test('keeps both trigger paths currently unsatisfied and Branch execution closed', () => {
    const report = buildCareerPersonalizationT8BranchClashRemediationTriggerReadinessReview(acceptedB40());
    expect(report.currentlySatisfiedTriggerCount).toBe(0);
    expect(report.currentlyExecutableBranchLaneCount).toBe(0);
    expect(report.exact2015PathTriggerSatisfied).toBe(false);
    expect(report.independentCompletePathTriggerSatisfied).toBe(false);
  });

  test('does not confuse an exact-edition access improvement with automatic authority admission', () => {
    const report = buildCareerPersonalizationT8BranchClashRemediationTriggerReadinessReview(acceptedB40());
    expect(report.exact2015PrintedPassageBindingEstablished).toBe(false);
    expect(report.activationAutomaticallyAdmitsAuthority).toBe(false);
    expect(report.activationAutomaticallyClosesGap).toBe(false);
    expect(report.activationAlwaysRequiresAdequacyReview).toBe(true);
  });

  test('classifies mandatory unsupported dependency confirmation as current-method incompatibility rather than forcing admission', () => {
    const report = buildCareerPersonalizationT8BranchClashRemediationTriggerReadinessReview(acceptedB40());
    expect(report.currentMethodCompatibilityEstablished).toBe(false);
    expect(report.currentMethodIncompatibleIfMandatoryDependencyConfirmed).toBe(true);
    expect(report.branchAuthorityAdmissionReady).toBe(false);
  });

  test('forbids repeated unchanged-surface search and cross-source stitching', () => {
    const report = buildCareerPersonalizationT8BranchClashRemediationTriggerReadinessReview(acceptedB40());
    expect(report.broadSearchRestartAuthorized).toBe(false);
    expect(report.repeatedUnchangedSurfaceSearchAuthorized).toBe(false);
    expect(report.crossSourceRequirementStitchingAuthorized).toBe(false);
  });

  test('preserves the already admitted bounded Position component', () => {
    const report = buildCareerPersonalizationT8BranchClashRemediationTriggerReadinessReview(acceptedB40());
    expect(report.positionBoundedAuthorityComponentCountPreserved).toBe(1);
    expect(report.branchAuthorityAdmittedByThisGate).toBe(false);
    expect(report.branchGapClosureReady).toBe(false);
  });

  test('keeps all six historical gaps open and production untouched', () => {
    const report = buildCareerPersonalizationT8BranchClashRemediationTriggerReadinessReview(acceptedB40());
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.authorityGapClosedByThisGate).toBe(false);
    expect(report.numericWeightingIntroduced).toBe(false);
    expect(report.t5BaseSemanticMutated).toBe(false);
    expect(report.occupationModernizationUsed).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
  });

  test('freezes controls and routes to a post-B41 frontier hold review', () => {
    const report = buildCareerPersonalizationT8BranchClashRemediationTriggerReadinessReview(acceptedB40());
    expect(report.controlIds).toEqual(CAREER_T8_B41_BRANCH_REMEDIATION_TRIGGER_CONTROL_IDS);
    expect(report.controlCount).toBe(12);
    expect(report.controlsFrozen).toBe(true);
    expect(report.recommendedNextGate).toBe('CAREER_PERSONALIZATION_T8_POST_B41_RESEARCH_FRONTIER_HOLD_REVIEW');
  });

  test('fails closed when the B40 content-addressed identity is tampered', () => {
    const b40 = acceptedB40();
    const tampered: CareerPersonalizationT8BranchClashCurrentT5PublishedEvidenceAdequacyCompatibilityReviewReport = {
      ...b40,
      reviewId: `${b40.reviewId}_tampered`,
    };
    const report = buildCareerPersonalizationT8BranchClashRemediationTriggerReadinessReview(tampered);
    expect(report.status).toBe('UPSTREAM_B40_BOUNDARY_INVALID');
    expect(report.decision).toBe('BRANCH_REMEDIATION_TRIGGER_READINESS_NOT_ESTABLISHED');
    expect(report.exactB40BoundaryAccepted).toBe(false);
    expect(report.triggerContractCount).toBe(0);
    expect(report.positionBoundedAuthorityComponentCountPreserved).toBe(0);
    expect(report.controlCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
  });
});
