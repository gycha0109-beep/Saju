import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_BRANCH_CLASH_PUBLISHED_TRIGGER_ACTIVATION_EVIDENCE_VERSION,
  CAREER_T8_B34_BRANCH_CLASH_CANDIDATE,
  CAREER_T8_B34_BRANCH_CLASH_CONTROL_IDS,
  type CareerPersonalizationT8BranchClashPublishedTriggerActivationEvidenceReport,
} from '../src/research/career-personalization-t8-branch-clash-published-trigger-activation-evidence.js';
import {
  CAREER_PERSONALIZATION_T8_FAMILY_ALTERNATE_PUBLISHED_SOURCE_PATH_ELIGIBILITY_REVIEW_VERSION,
  CAREER_T8_B35_FAMILY_ALTERNATE_PATH_CANDIDATES,
  CAREER_T8_B35_FAMILY_ALTERNATE_PATH_CONTROL_IDS,
  buildCareerPersonalizationT8FamilyAlternatePublishedSourcePathEligibilityReview,
} from '../src/research/career-personalization-t8-family-alternate-published-source-path-eligibility-review.js';

function acceptedB34(): CareerPersonalizationT8BranchClashPublishedTriggerActivationEvidenceReport {
  const material: Omit<CareerPersonalizationT8BranchClashPublishedTriggerActivationEvidenceReport, 'evidenceId'> = {
    evidenceVersion: CAREER_PERSONALIZATION_T8_BRANCH_CLASH_PUBLISHED_TRIGGER_ACTIVATION_EVIDENCE_VERSION,
    status: 'RESOLVED_CAREER_T8_BRANCH_CLASH_PUBLISHED_TRIGGER_ACTIVATION_EVIDENCE',
    decision:
      'BRANCH_CLASH_PUBLISHED_SINGLE_WORK_CURRENT_T5_QUALITATIVE_MODIFIER_TRIGGER_REOPENED_EXACT_EDITION_AND_CURRENT_METHOD_COMPATIBILITY_REMAIN_PENDING_NO_AUTHORITY_ADMISSION',
    upstreamB33ReviewId: 'b33_b35_fixture',
    exactB33BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    positionAdmissionReadyComponentPreserved: true,
    branchCandidate: CAREER_T8_B34_BRANCH_CLASH_CANDIDATE,
    branchPublishedProvenanceAdequateForTrigger: true,
    branchSameWorkFullTextLineageInspected: true,
    branchExactTenGodSubtypePreserved: true,
    branchCurrentT5SemanticCorrespondenceObserved: true,
    branchClashParticipantBindingObserved: true,
    branchQualitativeModificationModeEstablished: true,
    branchModificationMode: 'ATTENUATES_OR_REDUCES_EXPRESSION',
    branchSameWorkLimitObserved: true,
    branchTriggerReopened: true,
    branchExactPublishedEditionPassageBindingEstablished: false,
    branchCurrentMethodCompatibilityEstablished: false,
    branchAuthorityAdmissionReady: false,
    branchGapClosureReady: false,
    authorityAdmissionReadyComponentCount: 1,
    gapClosureReadyCount: 0,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: CAREER_T8_B34_BRANCH_CLASH_CONTROL_IDS,
    controlCount: 12,
    controlsFrozen: true,
    recommendedNextGate: 'BRANCH_CLASH_CURRENT_T5_PUBLISHED_EVIDENCE_ADEQUACY_AND_COMPATIBILITY_REVIEW',
  };
  return {
    evidenceId: `career_t8_branch_clash_published_trigger_activation_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career T8 B35 family alternate published-source path eligibility review', () => {
  test('accepts exact B34 and resolves two eligible alternate paths', () => {
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourcePathEligibilityReview(acceptedB34());
    expect(report.reviewVersion).toBe(CAREER_PERSONALIZATION_T8_FAMILY_ALTERNATE_PUBLISHED_SOURCE_PATH_ELIGIBILITY_REVIEW_VERSION);
    expect(report.status).toBe('RESOLVED_CAREER_T8_FAMILY_ALTERNATE_PUBLISHED_SOURCE_PATH_ELIGIBILITY_REVIEW');
    expect(report.alternatePathCandidateCount).toBe(2);
    expect(report.eligibleAlternatePathCount).toBe(2);
  });

  test('preserves the historical Qianli path and exact-page hold', () => {
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourcePathEligibilityReview(acceptedB34());
    expect(report.qianliHistoricalPathPreserved).toBe(true);
    expect(report.qianliExact1936PageHoldStillControlling).toBe(true);
  });

  test('freezes two independent alternate candidates', () => {
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourcePathEligibilityReview(acceptedB34());
    expect(report.alternatePathCandidates).toEqual(CAREER_T8_B35_FAMILY_ALTERNATE_PATH_CANDIDATES);
    expect(new Set(report.alternatePathCandidates.map((candidate) => candidate.pathId)).size).toBe(2);
  });

  test('marks the 2017 Career-specific published path eligible', () => {
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourcePathEligibilityReview(acceptedB34());
    const career = report.alternatePathCandidates.find((candidate) => candidate.pathId === 'CAREER_SPECIFIC_2017_RELATION_PATTERN_PATH');
    expect(report.careerSpecificPublishedPathEligible).toBe(true);
    expect(career?.sourceIdentity).toContain('9789863185468');
    expect(career?.explicitCareerContextObserved).toBe(true);
    expect(career?.namedFamilyRelationsObserved).toContain('食傷生財');
    expect(career?.namedFamilyRelationsObserved).toContain('財生官');
  });

  test('does not treat the 2017 TOC or testimonials as normative body', () => {
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourcePathEligibilityReview(acceptedB34());
    const career = report.alternatePathCandidates.find((candidate) => candidate.pathId === 'CAREER_SPECIFIC_2017_RELATION_PATTERN_PATH');
    expect(report.tocMayCountAsNormativeBody).toBe(false);
    expect(report.testimonialsMayCountAsNormativeBody).toBe(false);
    expect(career?.relationSemanticBodyDirectlyInspected).toBe(false);
    expect(career?.relationSpecificLimitsDirectlyInspected).toBe(false);
  });

  test('marks the 2015 combination-semantic path eligible independently', () => {
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourcePathEligibilityReview(acceptedB34());
    const semantic = report.alternatePathCandidates.find((candidate) => candidate.pathId === 'TEN_GOD_COMBINATION_2015_SEMANTIC_PATH');
    expect(report.combinationSemanticPublishedPathEligible).toBe(true);
    expect(semantic?.sourceIdentity).toContain('9789881412041');
    expect(semantic?.relationSemanticBodyDirectlyInspected).toBe(true);
    expect(semantic?.relationSpecificLimitsDirectlyInspected).toBe(true);
    expect(semantic?.explicitCareerContextObserved).toBe(false);
  });

  test('forbids cross-source stitching between alternate paths', () => {
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourcePathEligibilityReview(acceptedB34());
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.alternatePathCandidates.every((candidate) => candidate.mayStitchWithOtherPathForSameRequirement === false)).toBe(true);
  });

  test('forbids replacing the historical Qianli audit record', () => {
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourcePathEligibilityReview(acceptedB34());
    expect(report.alternatePathCandidates.every((candidate) => candidate.maySubstituteForQianliHistoricalRecord === false)).toBe(true);
  });

  test('does not silently drop strength or scoring dependencies', () => {
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourcePathEligibilityReview(acceptedB34());
    expect(report.strengthOrScoringDependencyMayBeIgnored).toBe(false);
    expect(report.alternatePathCandidates.every((candidate) => candidate.strengthOrScoringDependencyObserved)).toBe(true);
    expect(report.alternatePathCandidates.every((candidate) => candidate.currentMethodCompatibilityEstablished === false)).toBe(true);
  });

  test('admits no family authority and closes no gap', () => {
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourcePathEligibilityReview(acceptedB34());
    expect(report.familyAuthorityAdmissionReady).toBe(false);
    expect(report.familyGapClosureReady).toBe(false);
    expect(report.authorityAdmittedByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
  });

  test('preserves position admission-ready component and branch trigger state', () => {
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourcePathEligibilityReview(acceptedB34());
    expect(report.authorityAdmissionReadyComponentCountPreserved).toBe(1);
    expect(report.branchTriggerReopenedPreserved).toBe(true);
  });

  test('keeps all six historical gaps open and runtime untouched', () => {
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourcePathEligibilityReview(acceptedB34());
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.gapClosureReadyCount).toBe(0);
    expect(report.controlIds).toEqual(CAREER_T8_B35_FAMILY_ALTERNATE_PATH_CONTROL_IDS);
    expect(report.controlCount).toBe(12);
    expect(report.controlsFrozen).toBe(true);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
  });

  test('fails closed when B34 content-addressed identity is tampered', () => {
    const b34 = acceptedB34();
    const tampered = { ...b34, evidenceId: `${b34.evidenceId}_tampered` };
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourcePathEligibilityReview(tampered);
    expect(report.status).toBe('UPSTREAM_B34_BOUNDARY_INVALID');
    expect(report.alternatePathCandidateCount).toBe(0);
    expect(report.eligibleAlternatePathCount).toBe(0);
    expect(report.controlCount).toBe(0);
  });
});