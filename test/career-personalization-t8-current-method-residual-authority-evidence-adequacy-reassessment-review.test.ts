import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION,
  CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_CONTROL_IDS,
  CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_TASKS,
  type CareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionReadinessReviewReport,
} from '../src/research/career-personalization-t8-current-method-residual-authority-acquisition-readiness-review.js';
import {
  buildCareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionEvidence,
  type CareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionEvidenceReport,
} from '../src/research/career-personalization-t8-current-method-residual-authority-acquisition-evidence.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_EVIDENCE_ADEQUACY_REASSESSMENT_REVIEW_VERSION,
  CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_EVIDENCE_ADEQUACY_CONTROL_IDS,
  buildCareerPersonalizationT8CurrentMethodResidualAuthorityEvidenceAdequacyReassessmentReview,
} from '../src/research/career-personalization-t8-current-method-residual-authority-evidence-adequacy-reassessment-review.js';

function acceptedB19(): CareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionReadinessReviewReport {
  const material: Omit<CareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionReadinessReviewReport, 'reviewId'> = {
    reviewVersion: CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION,
    status: 'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS',
    decision: 'TWO_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_TASKS_READY_HOLDS_EXCLUDED_NO_AUTHORITY_ACQUIRED',
    upstreamB18ReviewId: 'career_t8_current_t5_t6_bridge_method_boundary_reassessment_b21_fixture',
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

function acceptedB20(): CareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionEvidenceReport {
  return buildCareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionEvidence(acceptedB19());
}

describe('Career T8 B21 current-method residual authority evidence adequacy reassessment', () => {
  test('accepts exact B20 and resolves six gap assessments without closing any gap', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityEvidenceAdequacyReassessmentReview(acceptedB20());

    expect(report.reviewVersion).toBe(
      CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_EVIDENCE_ADEQUACY_REASSESSMENT_REVIEW_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_EVIDENCE_ADEQUACY_REASSESSMENT',
    );
    expect(report.decision).toBe(
      'B20_EVIDENCE_MATERIALLY_ADVANCES_T6_CLASH_AND_POSITION_COVERAGE_BUT_NO_GAP_HAS_FULL_AUTHORITY_COVERAGE_TARGETED_REMEDIATION_REQUIRED',
    );
    expect(report.gapAssessmentCount).toBe(6);
    expect(report.gapAssessments.map((item) => item.gapId)).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.gapAssessments.every((item) => !item.fullRequirementSatisfied && !item.gapClosed)).toBe(true);
  });

  test('classifies T5 multi-claim Career evidence as partial and preserves Qin p464 body acquisition requirement', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityEvidenceAdequacyReassessmentReview(acceptedB20());
    const gap = report.gapAssessments.find(
      (item) => item.gapId === 'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING',
    );

    expect(gap?.coverageClass).toBe('PARTIAL_REQUIREMENT_COVERAGE');
    expect(gap?.candidateIds).toEqual([
      'YANG_YIYUN_FULL_TEXT_REINSPECTION',
      'QIN_LUNSHI_2010_PUBLISHED_TENGOD_CAREER_CHAPTER_LEAD',
      'WANG_YUANTANG_2022_DIRECT_TENGOD_CAREER_WEB_LEAD',
    ]);
    expect(gap?.explicitCareerBindingObserved).toBe(true);
    expect(gap?.currentMethodCompatibilityEstablished).toBe(false);
    expect(report.qinP464BodyAcquisitionRemainsRequired).toBe(true);
  });

  test('keeps the family-relation Career gap at zero evidence coverage', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityEvidenceAdequacyReassessmentReview(acceptedB20());
    const gap = report.gapAssessments.find(
      (item) => item.gapId === 'FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING',
    );

    expect(gap?.coverageClass).toBe('NONE');
    expect(gap?.candidateIds).toEqual([]);
    expect(gap?.explicitCareerBindingObserved).toBe(false);
    expect(report.familyRelationAuthorityStillAbsent).toBe(true);
  });

  test('treats Xu direct branch-clash Career semantics as material partial coverage but not a T5 modifier bridge', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityEvidenceAdequacyReassessmentReview(acceptedB20());
    const gap = report.gapAssessments.find(
      (item) => item.gapId === 'BRANCH_CLASH_TO_T5_CAREER_SEMANTIC_MODIFIER_MISSING',
    );

    expect(gap?.coverageClass).toBe('MATERIAL_PARTIAL_REQUIREMENT_COVERAGE');
    expect(gap?.candidateIds).toContain('XU_BINGXIN_2009_SIX_CLASH_CAREER_POSITION');
    expect(gap?.explicitCareerBindingObserved).toBe(true);
    expect(gap?.independentNormativeProvenanceObserved).toBe(true);
    expect(gap?.exactCurrentT5ModifierBindingObserved).toBe(false);
    expect(report.xuMayAnchorDirectClashCareerAndPositionRemediation).toBe(true);
    expect(report.xuMaySatisfyExactT5ModifierBridgeByItself).toBe(false);
  });

  test('recognizes Xu position evidence only and does not infer visibility or plurality authority', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityEvidenceAdequacyReassessmentReview(acceptedB20());
    const gap = report.gapAssessments.find(
      (item) => item.gapId === 'VISIBILITY_POSITION_PLURALITY_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
    );

    expect(gap?.coverageClass).toBe('MATERIAL_PARTIAL_REQUIREMENT_COVERAGE');
    expect(gap?.explicitCareerBindingObserved).toBe(true);
    expect(gap?.exactCurrentT5ModifierBindingObserved).toBe(false);
    expect(report.visibilityPluralityAuthorityStillAbsent).toBe(true);
    expect(report.relativeForceMayFillResidualRequirement).toBe(false);
  });

  test('keeps seasonal authority absent and marks its remediation conditional on consumption', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityEvidenceAdequacyReassessmentReview(acceptedB20());
    const gap = report.gapAssessments.find((item) => item.gapId === 'SEASONAL_PHASE_TO_CAREER_SEMANTIC_MODIFIER_MISSING');
    const path = report.remediationPaths.find(
      (item) => item.pathId === 'SEASONAL_PHASE_CAREER_MODIFIER_SOURCE_DISCOVERY_IF_CONSUMED',
    );

    expect(gap?.coverageClass).toBe('NONE');
    expect(report.seasonalAuthorityStillAbsent).toBe(true);
    expect(path?.priority).toBe('CONDITIONAL_IF_DIMENSION_CONSUMED');
    expect(path?.authorityAdmissionOnCompletion).toBe(false);
  });

  test('does not use Yang or Wang strength hierarchy as a multi-pattern conflict policy', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityEvidenceAdequacyReassessmentReview(acceptedB20());
    const gap = report.gapAssessments.find(
      (item) => item.gapId === 'MULTI_PATTERN_CONFLICT_TENSION_COMPOSITION_POLICY_MISSING',
    );
    const path = report.remediationPaths.find((item) => item.pathId === 'MULTI_PATTERN_CONFLICT_POLICY_SOURCE_DISCOVERY');

    expect(gap?.coverageClass).toBe('LEAD_ONLY');
    expect(gap?.currentMethodCompatibilityEstablished).toBe(false);
    expect(report.conflictPolicyAuthorityStillAbsent).toBe(true);
    expect(report.relativeForceMayFillResidualRequirement).toBe(false);
    expect(path?.priority).toBe('PACK_LEVEL_DEFERRED');
  });

  test('freezes four active primary remediation paths plus one conditional and one pack-level deferred path', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityEvidenceAdequacyReassessmentReview(acceptedB20());

    expect(report.remediationPathCount).toBe(6);
    expect(report.activePrimaryRemediationPathCount).toBe(4);
    expect(report.conditionalRemediationPathCount).toBe(1);
    expect(report.packLevelDeferredRemediationPathCount).toBe(1);
    expect(report.b20EvidenceAdequateForTargetedRemediationSelection).toBe(true);
    expect(report.b20EvidenceAdequateForAuthorityAdmission).toBe(false);
    expect(report.b20EvidenceAdequateForGapClosure).toBe(false);
  });

  test('keeps all six gaps open, preserves holds, and creates no semantics or production artifacts', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityEvidenceAdequacyReassessmentReview(acceptedB20());

    expect(report.fullySatisfiedGapCount).toBe(0);
    expect(report.gapsWithMaterialPartialCoverageCount).toBe(2);
    expect(report.gapsWithAnyLeadOrPartialCoverageCount).toBe(4);
    expect(report.allSixGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.cheonbuHoldReclassified).toBe(false);
    expect(report.wangQingHoldReclassified).toBe(false);
    expect(report.methodologyChoiceMadeByThisGate).toBe(false);
    expect(report.newSourceAcquisitionPerformedByThisGate).toBe(false);
    expect(report.authorityAdmittedByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.controlIds).toEqual(CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_EVIDENCE_ADEQUACY_CONTROL_IDS);
    expect(report.implementationEffects).toEqual({
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

  test('fails closed on content-addressed B20 tampering and remains deterministic for exact B20', () => {
    const valid = acceptedB20();
    const tamperedMaterial = {
      ...valid,
      xuBingxinExactCurrentT5ModifierBridgeConfirmed: true,
    };
    const { evidenceId, ...withoutId } = tamperedMaterial;
    expect(evidenceId).toBeTruthy();
    const tampered: CareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionEvidenceReport = {
      ...tamperedMaterial,
      evidenceId: `career_t8_current_method_residual_authority_acquisition_evidence_${deterministicContentHash(withoutId).slice(0, 24)}`,
    };

    const rejected = buildCareerPersonalizationT8CurrentMethodResidualAuthorityEvidenceAdequacyReassessmentReview(tampered);
    const first = buildCareerPersonalizationT8CurrentMethodResidualAuthorityEvidenceAdequacyReassessmentReview(valid);
    const second = buildCareerPersonalizationT8CurrentMethodResidualAuthorityEvidenceAdequacyReassessmentReview(valid);

    expect(rejected.status).toBe('UPSTREAM_B20_BOUNDARY_INVALID');
    expect(rejected.exactB20BoundaryAccepted).toBe(false);
    expect(rejected.gapAssessmentCount).toBe(0);
    expect(rejected.remediationPathCount).toBe(0);
    expect(first.reviewId).toBe(second.reviewId);
    const { reviewId, ...material } = first;
    expect(reviewId).toBe(
      `career_t8_current_method_residual_authority_evidence_adequacy_reassessment_${deterministicContentHash(material).slice(0, 24)}`,
    );
  });
});
