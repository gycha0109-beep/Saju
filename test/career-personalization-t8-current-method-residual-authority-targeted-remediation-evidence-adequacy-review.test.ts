import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE_VERSION,
  CAREER_T8_B23_TARGETED_EVIDENCE_RECORDS,
  CAREER_T8_B23_TARGETED_REMEDIATION_EVIDENCE_CONTROL_IDS,
  type CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceReport,
} from '../src/research/career-personalization-t8-current-method-residual-authority-targeted-remediation-evidence.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE_ADEQUACY_REVIEW_VERSION,
  CAREER_T8_B24_GAP_ASSESSMENTS,
  CAREER_T8_B24_TARGETED_EVIDENCE_ADEQUACY_CONTROL_IDS,
  buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceAdequacyReview,
} from '../src/research/career-personalization-t8-current-method-residual-authority-targeted-remediation-evidence-adequacy-review.js';
import { I253_QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_EVIDENCE_VERSION } from '../src/research/i253-qianli-primary-witness-provenance-correction-evidence.js';
import { I254_QIANLI_SEASON_PLURALITY_PRIMARY_PAGE_BINDING_HOLD_RECORD_VERSION } from '../src/research/i254-qianli-season-plurality-primary-page-binding-hold-record.js';

function acceptedB23(): CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceReport {
  const material: Omit<
    CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceReport,
    'evidenceId'
  > = {
    evidenceVersion: CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE_VERSION,
    status: 'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE',
    decision:
      'FOUR_ACTIVE_TASKS_EVALUATED_FAMILY_RELATION_ADVANCED_TO_MATERIAL_PARTIAL_QIN_BODY_AND_TWO_T6_BRIDGES_REMAIN_UNSATISFIED_SEASON_PLURALITY_EXCLUDED_NO_AUTHORITY_ADMISSION',
    upstreamB22ReviewId: 'career_t8_b22_b24_fixture',
    exactB22BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    upstreamI253EvidenceVersion: I253_QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_EVIDENCE_VERSION,
    upstreamI254HoldVersion: I254_QIANLI_SEASON_PLURALITY_PRIMARY_PAGE_BINDING_HOLD_RECORD_VERSION,
    historicalB20QinIsbnRetainedAsAuditRecord: '9787504098774',
    canonicalQinIsbn: '9787204098774',
    historicalB20ArtifactRewritten: false,
    records: CAREER_T8_B23_TARGETED_EVIDENCE_RECORDS,
    recordCount: 4,
    evaluatedActiveTaskCount: 4,
    familyRelationCoverageAdvancedFromNone: true,
    familyRelationCoverageNow: 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE',
    familyRelationAuthorityAdmitted: false,
    qinP464BodyAcquired: false,
    qinP464BodyStillRequired: true,
    branchClashSpecificT5ModifierBridgeAcquired: false,
    positionSpecificT5ModifierBridgeAcquired: false,
    visibilityCareerBindingAcquired: false,
    pluralityCareerBindingAcquired: false,
    pluralityExplicitlyExcludedByI254: true,
    seasonalCareerDimensionConsumed: false,
    conditionalSeasonalRemediationActivated: false,
    conflictPolicyTaskActivated: false,
    crossSourceRequirementStitchingUsed: false,
    relativeForceOrAutomaticPrecedenceImported: false,
    allSixGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    methodologyChoiceMadeByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: CAREER_T8_B23_TARGETED_REMEDIATION_EVIDENCE_CONTROL_IDS,
    controlCount: 12,
    controlsFrozen: true,
    implementationEffects: {
      targetedTaskEvaluationsPerformed: 4,
      targetedEvidenceRecordsCreated: 4,
      gapsMateriallyAdvancedWithoutClosure: 1,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      methodologyChoicesMade: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate:
      'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE_ADEQUACY_REVIEW',
  };

  return {
    evidenceId: `career_t8_current_method_residual_authority_targeted_remediation_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career T8 B24 targeted remediation evidence adequacy review', () => {
  test('accepts the exact content-addressed B23 boundary and reassesses all six gaps', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceAdequacyReview(
      acceptedB23(),
    );

    expect(report.reviewVersion).toBe(
      CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE_ADEQUACY_REVIEW_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE_ADEQUACY_REVIEW',
    );
    expect(report.decision).toBe(
      'B23_FAMILY_RELATION_MATERIALLY_ADVANCED_BUT_ZERO_REQUIREMENTS_FULLY_SATISFIED_FOUR_ACTIVE_ONE_CONDITIONAL_ONE_DEFERRED_REMEDIATION_PATHS_REMAIN_NO_AUTHORITY_ADMISSION',
    );
    expect(report.gapAssessments).toEqual(CAREER_T8_B24_GAP_ASSESSMENTS);
    expect(report.gapAssessmentCount).toBe(6);
  });

  test('computes the post-B23 coverage frontier as three material-partial, five with any coverage, and zero full', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceAdequacyReview(
      acceptedB23(),
    );

    expect(report.gapsWithMaterialPartialCoverageCount).toBe(3);
    expect(report.gapsWithAnyLeadOrPartialCoverageCount).toBe(5);
    expect(report.fullySatisfiedGapCount).toBe(0);
    expect(report.gapAssessments.map((assessment) => assessment.currentCoverageClass)).toEqual([
      'PARTIAL_REQUIREMENT_COVERAGE',
      'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE',
      'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE',
      'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE',
      'NONE',
      'LEAD_ONLY',
    ]);
  });

  test('records the family relation as the only B23 material advancement and narrows its remaining work', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceAdequacyReview(
      acceptedB23(),
    );
    const family = report.gapAssessments.find(
      (assessment) => assessment.gapId === 'FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING',
    );

    expect(family?.preB23CoverageClass).toBe('NONE');
    expect(family?.b23CoverageDelta).toBe('NONE_TO_MATERIAL_PARTIAL');
    expect(family?.currentCoverageClass).toBe('MATERIAL_PARTIAL_REQUIREMENT_COVERAGE');
    expect(family?.remediationDisposition).toBe('ACTIVE_PRIMARY_NARROWED_FAMILY_FOLLOWUP_REQUIRED');
    expect(family?.remainingRequirements.join(' ')).toContain('limits or exceptions');
    expect(family?.remainingRequirements.join(' ')).toContain('governed current Career method');
    expect(family?.remainingRequirements.join(' ')).toContain('structural relation presence');
    expect(report.familyRelationCoverageMateriallyAdvanced).toBe(true);
    expect(report.familyRelationRemediationNarrowed).toBe(true);
  });

  test('keeps Qin p464 at partial coverage until the body and local context are acquired', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceAdequacyReview(
      acceptedB23(),
    );
    const qin = report.gapAssessments.find(
      (assessment) => assessment.gapId === 'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING',
    );

    expect(qin?.preB23CoverageClass).toBe('PARTIAL_REQUIREMENT_COVERAGE');
    expect(qin?.b23CoverageDelta).toBe('NONE');
    expect(qin?.currentCoverageClass).toBe('PARTIAL_REQUIREMENT_COVERAGE');
    expect(qin?.remediationDisposition).toBe('ACTIVE_PRIMARY_BODY_ACQUISITION_STILL_REQUIRED');
    expect(report.qinP464BodyAcquisitionStillRequired).toBe(true);
  });

  test('keeps branch clash materially partial and requires one source-bound specific current-T5 bridge', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceAdequacyReview(
      acceptedB23(),
    );
    const clash = report.gapAssessments.find(
      (assessment) => assessment.gapId === 'BRANCH_CLASH_TO_T5_CAREER_SEMANTIC_MODIFIER_MISSING',
    );

    expect(clash?.currentCoverageClass).toBe('MATERIAL_PARTIAL_REQUIREMENT_COVERAGE');
    expect(clash?.remediationDisposition).toBe('ACTIVE_PRIMARY_SINGLE_SOURCE_T5_BRIDGE_STILL_REQUIRED');
    expect(clash?.remainingRequirements.join(' ')).toContain('one source-bound bridge');
    expect(clash?.remainingRequirements.join(' ')).toContain('Do not stitch');
    expect(report.branchClashSingleSourceT5BridgeStillRequired).toBe(true);
    expect(report.crossSourceRequirementStitchingAuthorized).toBe(false);
  });

  test('keeps position, visibility, and plurality dimension-specific and excludes plurality under I254', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceAdequacyReview(
      acceptedB23(),
    );
    const dimensions = report.gapAssessments.find(
      (assessment) => assessment.gapId === 'VISIBILITY_POSITION_PLURALITY_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
    );

    expect(dimensions?.currentCoverageClass).toBe('MATERIAL_PARTIAL_REQUIREMENT_COVERAGE');
    expect(dimensions?.remediationDisposition).toBe(
      'ACTIVE_PRIMARY_DIMENSION_SPECIFIC_T5_BRIDGE_STILL_REQUIRED_WITH_PLURALITY_EXCLUDED',
    );
    expect(dimensions?.remainingRequirements.join(' ')).toContain('visibility-to-Career/current-T5');
    expect(dimensions?.remainingRequirements.join(' ')).toContain('plurality unconsumed under I254');
    expect(report.positionVisibilityDimensionSpecificBridgeStillRequired).toBe(true);
    expect(report.pluralityRemainsExcludedUnderI254).toBe(true);
  });

  test('leaves seasonal authority open but keeps its remediation conditional and non-executable', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceAdequacyReview(
      acceptedB23(),
    );
    const seasonal = report.gapAssessments.find(
      (assessment) => assessment.gapId === 'SEASONAL_PHASE_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
    );

    expect(seasonal?.currentCoverageClass).toBe('NONE');
    expect(seasonal?.remediationDisposition).toBe('CONDITIONAL_UNCONSUMED_DIMENSION_REMAINS_OPEN');
    expect(report.seasonalRemediationExecutableNow).toBe(false);
    expect(report.conditionalRemediationPathCount).toBe(1);
  });

  test('keeps conflict policy lead-only, pack-level deferred, and free of hidden precedence', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceAdequacyReview(
      acceptedB23(),
    );
    const conflict = report.gapAssessments.find(
      (assessment) => assessment.gapId === 'MULTI_PATTERN_CONFLICT_TENSION_COMPOSITION_POLICY_MISSING',
    );

    expect(conflict?.currentCoverageClass).toBe('LEAD_ONLY');
    expect(conflict?.remediationDisposition).toBe('PACK_LEVEL_DEFERRED_REMAINS_OPEN');
    expect(report.conflictPolicyRemediationExecutableNow).toBe(false);
    expect(report.packLevelDeferredRemediationPathCount).toBe(1);
    expect(report.relativeForceOrAutomaticPrecedenceAuthorized).toBe(false);
  });

  test('preserves four active remediation paths while allowing only narrower continuation planning', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceAdequacyReview(
      acceptedB23(),
    );

    expect(report.activePrimaryRemediationPathCount).toBe(4);
    expect(report.conditionalRemediationPathCount).toBe(1);
    expect(report.packLevelDeferredRemediationPathCount).toBe(1);
    expect(report.b23EvidenceAdequateForContinuationPlanning).toBe(true);
    expect(report.b23EvidenceAdequateForAuthorityAdmission).toBe(false);
    expect(report.b23EvidenceAdequateForGapClosure).toBe(false);
  });

  test('keeps all mandatory synthesis gaps open and creates no semantic or production artifacts', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceAdequacyReview(
      acceptedB23(),
    );

    expect(report.allSixGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.authorityAdmittedByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
    expect(report.methodologyChoiceMadeByThisGate).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
    expect(report.implementationEffects.gapsMateriallyAdvancedSinceB21).toBe(1);
    expect(report.implementationEffects.gapsFullySatisfied).toBe(0);
  });

  test('freezes the exact B24 controls and routes only to continuation readiness', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceAdequacyReview(
      acceptedB23(),
    );

    expect(report.controlIds).toEqual(CAREER_T8_B24_TARGETED_EVIDENCE_ADEQUACY_CONTROL_IDS);
    expect(report.controlCount).toBe(12);
    expect(report.controlsFrozen).toBe(true);
    expect(report.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_CONTINUATION_READINESS_REVIEW',
    );
  });

  test('is deterministic for the same exact B23 content-addressed evidence boundary', () => {
    const first = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceAdequacyReview(
      acceptedB23(),
    );
    const second = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceAdequacyReview(
      acceptedB23(),
    );

    expect(first.reviewId).toBe(second.reviewId);
    expect(first).toEqual(second);
  });

  test('fails closed when the B23 content-addressed identity is tampered', () => {
    const b23 = acceptedB23();
    const tampered: CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceReport = {
      ...b23,
      evidenceId: `${b23.evidenceId}_tampered`,
    };

    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceAdequacyReview(
      tampered,
    );

    expect(report.status).toBe('UPSTREAM_B23_BOUNDARY_INVALID');
    expect(report.decision).toBe('TARGETED_REMEDIATION_EVIDENCE_ADEQUACY_NOT_ESTABLISHED');
    expect(report.exactB23BoundaryAccepted).toBe(false);
    expect(report.gapAssessmentCount).toBe(0);
    expect(report.gapAssessments).toEqual([]);
    expect(report.gapsWithMaterialPartialCoverageCount).toBe(0);
    expect(report.gapsWithAnyLeadOrPartialCoverageCount).toBe(0);
    expect(report.familyRelationCoverageMateriallyAdvanced).toBe(false);
    expect(report.familyRelationRemediationNarrowed).toBe(false);
    expect(report.qinP464BodyAcquisitionStillRequired).toBe(false);
    expect(report.branchClashSingleSourceT5BridgeStillRequired).toBe(false);
    expect(report.positionVisibilityDimensionSpecificBridgeStillRequired).toBe(false);
    expect(report.pluralityRemainsExcludedUnderI254).toBe(false);
    expect(report.activePrimaryRemediationPathCount).toBe(0);
    expect(report.controlCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE_ADEQUACY_REVIEW',
    );
  });
});
