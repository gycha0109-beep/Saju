import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION,
  CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_CONTROL_IDS,
  CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_TASKS,
  type CareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionReadinessReviewReport,
} from '../src/research/career-personalization-t8-current-method-residual-authority-acquisition-readiness-review.js';
import { buildCareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionEvidence } from '../src/research/career-personalization-t8-current-method-residual-authority-acquisition-evidence.js';
import {
  buildCareerPersonalizationT8CurrentMethodResidualAuthorityEvidenceAdequacyReassessmentReview,
  type CareerPersonalizationT8CurrentMethodResidualAuthorityEvidenceAdequacyReassessmentReviewReport,
} from '../src/research/career-personalization-t8-current-method-residual-authority-evidence-adequacy-reassessment-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_READINESS_REVIEW_VERSION,
  CAREER_T8_CURRENT_METHOD_TARGETED_REMEDIATION_READINESS_CONTROL_IDS,
  CAREER_T8_CURRENT_METHOD_TARGETED_REMEDIATION_TASKS,
  buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationReadinessReview,
} from '../src/research/career-personalization-t8-current-method-residual-authority-targeted-remediation-readiness-review.js';

function acceptedB19(): CareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionReadinessReviewReport {
  const material: Omit<CareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionReadinessReviewReport, 'reviewId'> = {
    reviewVersion: CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION,
    status: 'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS',
    decision: 'TWO_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_TASKS_READY_HOLDS_EXCLUDED_NO_AUTHORITY_ACQUIRED',
    upstreamB18ReviewId: 'career_t8_current_t5_t6_bridge_method_boundary_reassessment_b22_fixture',
    exactB18BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    acquisitionTasks: CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_TASKS,
    acquisitionTaskCount: 2,
    executableResidualClassIds: [
      'CURRENT_METHOD_T5_DIRECT_BRIDGE_ACQUISITION',
      'CURRENT_METHOD_T6_DIRECT_CAREER_BRIDGE_DISCOVERY',
    ],
    executableResidualClassCount: 2,
    t5CurrentMethodAcquisitionReady: true,
    t6CurrentMethodAcquisitionReady: true,
    currentMethodDiscoveryMayContinueWithoutHumanMethodologyChoice: true,
    cheonbuHoldExcludedFromExecution: true,
    wangQingHoldExcludedFromExecution: true,
    wangQingHumanAdjudicationStillRequiredBeforeSemanticUse: true,
    acquisitionExecutionAuthorizedForNextGate: true,
    acquisitionPerformedByThisGate: false,
    authorityAcquiredByThisGate: false,
    authorityGapClosedByThisGate: false,
    crossSourceStitchingAuthorized: false,
    allSixGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    methodologyChoiceMadeByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_CONTROL_IDS,
    controlCount: 12,
    controlsFrozen: true,
    implementationEffects: {
      acquisitionExecutionsPerformed: 0,
      sourcesDiscovered: 0,
      candidatesRegistered: 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      methodologyChoicesMade: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE',
  };

  return {
    reviewId: `career_t8_current_method_residual_authority_acquisition_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function acceptedB21(): CareerPersonalizationT8CurrentMethodResidualAuthorityEvidenceAdequacyReassessmentReviewReport {
  const b20 = buildCareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionEvidence(acceptedB19());
  return buildCareerPersonalizationT8CurrentMethodResidualAuthorityEvidenceAdequacyReassessmentReview(b20);
}

describe('Career T8 B22 current-method residual authority targeted remediation readiness', () => {
  test('accepts exact B21 and freezes six targeted tasks with 4 executable, 1 conditional, and 1 deferred', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationReadinessReview(acceptedB21());

    expect(report.reviewVersion).toBe(
      CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_READINESS_REVIEW_VERSION,
    );
    expect(report.status).toBe('RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_READINESS');
    expect(report.decision).toBe(
      'FOUR_TARGETED_REMEDIATION_TASKS_EXECUTABLE_ONE_CONDITIONAL_ONE_PACK_DEFERRED_NO_ACQUISITION_OR_AUTHORITY_ADMISSION',
    );
    expect(report.tasks).toEqual(CAREER_T8_CURRENT_METHOD_TARGETED_REMEDIATION_TASKS);
    expect(report.taskCount).toBe(6);
    expect(report.executableTaskCount).toBe(4);
    expect(report.conditionalTaskCount).toBe(1);
    expect(report.deferredTaskCount).toBe(1);
    expect(report.allB21RemediationPathsRepresentedExactlyOnce).toBe(true);
  });

  test('freezes Qin to the exact 2010 ISBN and printed p464 body rather than accepting the TOC lead', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationReadinessReview(acceptedB21());
    const task = report.tasks.find((item) => item.taskId === 'QIN_LUNSHI_P464_BODY_ACQUISITION');

    expect(task?.status).toBe('EXECUTABLE_NEXT_GATE');
    expect(task?.allowedAnchorCandidateIds).toEqual(['QIN_LUNSHI_2010_PUBLISHED_TENGOD_CAREER_CHAPTER_LEAD']);
    expect(task?.exactEvidenceObjective).toContain('9787204098774');
    expect(task?.exactEvidenceObjective).toContain('p.464');
    expect(task?.exactEvidenceObjective).toContain('按十神組合選職業');
    expect(task?.evidenceChecks).toContain('EXACT_TEN_GOD_SUBTYPE_ROLE_PRESERVATION');
    expect(task?.evidenceChecks).toContain('DIRECT_MULTI_CLAIM_CAREER_COMPOSITION');
    expect(task?.evidenceChecks).toContain('DEPENDENCY_ON_WANGSHUAI_GEJU_YONGSHEN_XIJI_INVENTORY');
    expect(report.qinP464TargetFrozen).toBe(true);
    expect(report.qinTableOfContentsMaySatisfyPassageRequirement).toBe(false);
  });

  test('requires direct named family-relation to Career semantics and does not accept broad Ten-God occupation lists', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationReadinessReview(acceptedB21());
    const task = report.tasks.find((item) => item.taskId === 'T5_FAMILY_RELATION_DIRECT_CAREER_SOURCE_DISCOVERY');

    expect(task?.status).toBe('EXECUTABLE_NEXT_GATE');
    expect(task?.allowedAnchorCandidateIds).toEqual([]);
    expect(task?.evidenceChecks).toContain('NAMED_TEN_GOD_FAMILY_RELATION_BINDING');
    expect(task?.evidenceChecks).toContain('STRUCTURE_VERSUS_SEMANTIC_EFFECT_DISTINCTION');
    expect(task?.evidenceContract.explicitCareerOrWorkSemanticBindingRequired).toBe(true);
    expect(task?.existingPartialEvidenceAloneSufficient).toBe(false);
  });

  test('bounds Xu to a clash-to-Career anchor and requires an explicit specific current-T5 modifier bridge', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationReadinessReview(acceptedB21());
    const task = report.tasks.find((item) => item.taskId === 'T6_BRANCH_CLASH_TO_T5_SEMANTIC_BINDING_SOURCE_DISCOVERY');

    expect(task?.status).toBe('EXECUTABLE_NEXT_GATE');
    expect(task?.allowedAnchorCandidateIds).toEqual(['XU_BINGXIN_2009_SIX_CLASH_CAREER_POSITION']);
    expect(task?.evidenceChecks).toContain('RELATION_LOCAL_BRANCH_CLASH_PARTICIPANT_BINDING');
    expect(task?.evidenceChecks).toContain('SPECIFIC_CURRENT_T5_CAREER_SEMANTIC_MODIFIER_BINDING');
    expect(task?.evidenceChecks).toContain('QUALITATIVE_MODIFICATION_MODE_SOURCE_EXPLICIT');
    expect(task?.evidenceChecks).toContain('NO_RELATIVE_FORCE_WEIGHTING_OR_PRECEDENCE_IMPORT');
    expect(report.xuAnchorUseBoundedToExistingPartialEvidence).toBe(true);
  });

  test('allows position, visibility, and plurality to receive separate source-bound evidence without substitution', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationReadinessReview(acceptedB21());
    const task = report.tasks.find(
      (item) => item.taskId === 'T6_POSITION_VISIBILITY_PLURALITY_CURRENT_METHOD_SOURCE_DISCOVERY',
    );

    expect(task?.status).toBe('EXECUTABLE_NEXT_GATE');
    expect(task?.allowedAnchorCandidateIds).toEqual(['XU_BINGXIN_2009_SIX_CLASH_CAREER_POSITION']);
    expect(task?.evidenceChecks).toContain('POSITION_CAREER_BINDING');
    expect(task?.evidenceChecks).toContain('VISIBILITY_CAREER_BINDING_IF_CONSUMED');
    expect(task?.evidenceChecks).toContain('PLURALITY_CAREER_BINDING_IF_CONSUMED');
    expect(task?.evidenceChecks).toContain('SPECIFIC_CURRENT_T5_CAREER_SEMANTIC_MODIFIER_BINDING');
    expect(report.positionVisibilityPluralityMayUseSeparateSourceBoundEvidence).toBe(true);
  });

  test('keeps seasonal remediation non-executable until seasonal consumption is explicitly selected', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationReadinessReview(acceptedB21());
    const task = report.tasks.find(
      (item) => item.taskId === 'SEASONAL_PHASE_CAREER_MODIFIER_SOURCE_DISCOVERY_IF_CONSUMED',
    );

    expect(task?.status).toBe('CONDITIONAL_NOT_EXECUTABLE_UNLESS_DIMENSION_CONSUMPTION_SELECTED');
    expect(task?.executionAuthorizedForNextGate).toBe(false);
    expect(task?.evidenceChecks).toContain('CATEGORICAL_SEASONAL_PHASE_CAREER_BINDING_IF_CONSUMED');
    expect(report.seasonalTaskExecutableNow).toBe(false);
  });

  test('keeps conflict-policy remediation pack-level deferred and blocks strength hierarchy substitution', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationReadinessReview(acceptedB21());
    const task = report.tasks.find((item) => item.taskId === 'MULTI_PATTERN_CONFLICT_POLICY_SOURCE_DISCOVERY');

    expect(task?.status).toBe('PACK_LEVEL_DEFERRED_NOT_EXECUTABLE');
    expect(task?.executionAuthorizedForNextGate).toBe(false);
    expect(task?.evidenceChecks).toContain('MULTI_PATTERN_COEXISTENCE_REINFORCEMENT_CONSTRAINT_OR_TENSION_POLICY');
    expect(task?.evidenceContract.strengthHierarchyMaySubstituteForSemanticComposition).toBe(false);
    expect(report.conflictPolicyTaskExecutableNow).toBe(false);
  });

  test('authorizes only targeted next-gate acquisition and forbids broad discovery, stitching, and automatic promotion', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationReadinessReview(acceptedB21());

    expect(report.targetedEvidenceAcquisitionAuthorizedForNextGate).toBe(true);
    expect(report.broadDiscoveryLoopAuthorized).toBe(false);
    expect(report.broadCurrentMethodSearchRestartAuthorized).toBe(false);
    expect(report.crossSourceRequirementStitchingAuthorized).toBe(false);
    expect(report.successfulAcquisitionRequiresLaterAdequacyReview).toBe(true);
    expect(report.successfulAcquisitionRequiresLaterAuthorityAdmissionReview).toBe(true);
    for (const task of report.tasks) {
      expect(task.broadSearchFallbackAuthorized).toBe(false);
      expect(task.evidenceContract.crossSourceStitchingForSameRequirementAllowed).toBe(false);
      expect(task.evidenceContract.successfulAcquisitionAutomaticallyAdmitsAuthority).toBe(false);
      expect(task.evidenceContract.successfulAcquisitionAutomaticallyClosesGap).toBe(false);
      expect(task.evidenceContract.successfulAcquisitionAutomaticallyAuthorsT8).toBe(false);
      expect(task.evidenceContract.negativeOutcomeMustBePreserved).toBe(true);
    }
  });

  test('keeps all gaps and holds unchanged and creates no semantic or production artifacts', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationReadinessReview(acceptedB21());

    expect(report.allSixGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.cheonbuHoldReclassified).toBe(false);
    expect(report.wangQingHoldReclassified).toBe(false);
    expect(report.methodologyChoiceMadeByThisGate).toBe(false);
    expect(report.newAcquisitionPerformedByThisGate).toBe(false);
    expect(report.authorityAdmittedByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.controlIds).toEqual(CAREER_T8_CURRENT_METHOD_TARGETED_REMEDIATION_READINESS_CONTROL_IDS);
    expect(report.implementationEffects).toEqual({
      targetedAcquisitionExecutionsPerformed: 0,
      newSourcesAcquired: 0,
      candidateEvidenceRecordsCreated: 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      methodologyChoicesMade: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    });
  });

  test('fails closed on content-addressed B21 tampering and remains deterministic for exact B21', () => {
    const valid = acceptedB21();
    const tamperedMaterial = {
      ...valid,
      b20EvidenceAdequateForTargetedRemediationSelection: false,
    };
    const { reviewId: previousReviewId, ...withoutId } = tamperedMaterial;
    expect(previousReviewId).toBeTruthy();
    const tampered = {
      ...tamperedMaterial,
      reviewId: `career_t8_current_method_residual_authority_evidence_adequacy_reassessment_${deterministicContentHash(withoutId).slice(0, 24)}`,
    } as CareerPersonalizationT8CurrentMethodResidualAuthorityEvidenceAdequacyReassessmentReviewReport;

    const rejected = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationReadinessReview(tampered);
    const first = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationReadinessReview(valid);
    const second = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationReadinessReview(valid);

    expect(rejected.status).toBe('UPSTREAM_B21_BOUNDARY_INVALID');
    expect(rejected.exactB21BoundaryAccepted).toBe(false);
    expect(rejected.taskCount).toBe(0);
    expect(rejected.targetedEvidenceAcquisitionAuthorizedForNextGate).toBe(false);
    expect(first.reviewId).toBe(second.reviewId);
    const { reviewId, ...material } = first;
    expect(reviewId).toBe(
      `career_t8_current_method_residual_authority_targeted_remediation_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    );
  });
});
