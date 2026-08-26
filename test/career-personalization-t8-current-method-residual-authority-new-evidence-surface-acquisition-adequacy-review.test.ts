import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_EVIDENCE_VERSION,
  CAREER_T8_B28_NEW_SURFACE_ACQUISITION_EVIDENCE_CONTROL_IDS,
  CAREER_T8_B28_NEW_SURFACE_ACQUISITION_RECORDS,
  type CareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionEvidenceReport,
} from '../src/research/career-personalization-t8-current-method-residual-authority-new-evidence-surface-acquisition-evidence.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_ADEQUACY_REVIEW_VERSION,
  CAREER_T8_B29_LANE_ADEQUACY_ASSESSMENTS,
  CAREER_T8_B29_NEW_SURFACE_ACQUISITION_ADEQUACY_CONTROL_IDS,
  buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionAdequacyReview,
} from '../src/research/career-personalization-t8-current-method-residual-authority-new-evidence-surface-acquisition-adequacy-review.js';

function acceptedB28(): CareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionEvidenceReport {
  const material: Omit<
    CareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionEvidenceReport,
    'evidenceId'
  > = {
    evidenceVersion:
      CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_EVIDENCE_VERSION,
    status: 'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_EVIDENCE',
    decision:
      'FOUR_BOUNDED_LANES_EXECUTED_THREE_NEW_SURFACES_DISCOVERED_ZERO_FORMAL_COVERAGE_ADVANCEMENTS_PRIMARY_AND_PROVENANCE_GAPS_PRESERVED',
    upstreamB27ReviewId: 'b27_b29_fixture',
    exactB27BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    records: CAREER_T8_B28_NEW_SURFACE_ACQUISITION_RECORDS,
    recordCount: 4,
    acquisitionLaneExecutionCount: 4,
    genuinelyNewSurfaceDiscoveryCount: 3,
    targetBodyOrPassageDirectAcquisitionCount: 1,
    formalAuthorityCoverageAdvancementCount: 0,
    qinFullDocumentSurfaceDiscovered: true,
    qinP464BodyAcquired: false,
    familyCareerDisclaimerLeadDiscovered: true,
    familyCareerDisclaimerCorrectedPrimaryBound: false,
    familyLimitsRequirementSatisfied: false,
    familyCurrentMethodCompatibilitySatisfied: false,
    branchDirectTenGodClashCareerSemanticLeadDiscovered: true,
    branchIndependentNormativeProvenanceAdequate: false,
    branchCurrentMethodCompatibilitySatisfied: false,
    positionNewQualifyingSurfaceAcquired: false,
    crossSourceRequirementStitchingUsed: false,
    repeatedPriorSurfaceCountedAsProgress: false,
    visibilityConsumedByThisGate: false,
    pluralityConsumedByThisGate: false,
    seasonalConsumedByThisGate: false,
    pluralityHoldReclassified: false,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: CAREER_T8_B28_NEW_SURFACE_ACQUISITION_EVIDENCE_CONTROL_IDS,
    controlCount: 12,
    controlsFrozen: true,
    implementationEffects: {
      acquisitionExecutionsPerformed: 4,
      genuinelyNewSurfacesDiscovered: 3,
      targetPassagesDirectlyAcquired: 1,
      formalCoverageAdvancements: 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate:
      'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_ADEQUACY_REVIEW',
  };

  return {
    evidenceId: `career_t8_current_method_residual_authority_new_evidence_surface_acquisition_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career T8 B29 new evidence surface acquisition adequacy review', () => {
  test('accepts exact B28 and resolves discovery-vs-coverage adequacy', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionAdequacyReview(
      acceptedB28(),
    );
    expect(report.reviewVersion).toBe(
      CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_ADEQUACY_REVIEW_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_ADEQUACY_REVIEW',
    );
    expect(report.decision).toBe(
      'B28_DISCOVERY_PROGRESS_VALID_ZERO_FORMAL_COVERAGE_ADVANCEMENTS_ONE_PRIMARY_BINDING_FOLLOWUP_ACTIONABLE_NO_AUTHORITY_ADMISSION',
    );
    expect(report.exactB28BoundaryAccepted).toBe(true);
  });

  test('accepts three material discovery advances but zero formal coverage advances', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionAdequacyReview(
      acceptedB28(),
    );
    expect(report.assessments).toEqual(CAREER_T8_B29_LANE_ADEQUACY_ASSESSMENTS);
    expect(report.assessmentCount).toBe(4);
    expect(report.lanesWithMaterialDiscoveryProgressCount).toBe(3);
    expect(report.lanesWithFormalCoverageAdvancementCount).toBe(0);
  });

  test('selects exactly one immediately actionable followup', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionAdequacyReview(
      acceptedB28(),
    );
    expect(report.immediatelyActionableFollowupCount).toBe(1);
    expect(report.assessments.filter((assessment) => assessment.immediatelyActionableFollowup)).toHaveLength(1);
  });

  test('does not authorize Qin retry until direct body access path changes', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionAdequacyReview(
      acceptedB28(),
    );
    const qin = report.assessments.find(
      (assessment) => assessment.targetGapId === 'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING',
    );
    expect(report.qinImmediateRetryAuthorized).toBe(false);
    expect(qin?.disposition).toBe('WAIT_FOR_DIRECT_TARGET_BODY_ACCESS_NO_REPEAT_OF_CURRENT_SURFACE');
    expect(qin?.currentSurfaceExhaustedForFormalCoverage).toBe(true);
  });

  test('selects corrected 1936 Qianli primary page binding as next executable followup', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionAdequacyReview(
      acceptedB28(),
    );
    const family = report.assessments.find(
      (assessment) => assessment.targetGapId === 'FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING',
    );
    expect(report.qianliCorrectedPrimaryPageBindingExecutableNext).toBe(true);
    expect(family?.disposition).toBe('EXECUTE_CORRECTED_PRIMARY_PAGE_BINDING_NEXT');
    expect(family?.nextEvidenceObjective).toContain('printed p.50-p.53');
    expect(family?.currentSurfaceExhaustedForFormalCoverage).toBe(false);
  });

  test('keeps family compatibility unresolved even if disclaimer binding later succeeds', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionAdequacyReview(
      acceptedB28(),
    );
    expect(report.familyLimitsRequirementSatisfied).toBe(false);
    expect(report.familyCurrentMethodCompatibilitySatisfied).toBe(false);
  });

  test('does not authorize reuse of the same branch web semantic lead', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionAdequacyReview(
      acceptedB28(),
    );
    const branch = report.assessments.find(
      (assessment) => assessment.targetGapId === 'BRANCH_CLASH_TO_T5_CAREER_SEMANTIC_MODIFIER_MISSING',
    );
    expect(report.branchSameWebLeadRetryAuthorized).toBe(false);
    expect(branch?.disposition).toBe('WAIT_FOR_INDEPENDENT_NORMATIVE_SOURCE_NO_REPEAT_OF_WEB_LEAD');
  });

  test('keeps position waiting for a genuinely new surface', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionAdequacyReview(
      acceptedB28(),
    );
    const position = report.assessments.find(
      (assessment) => assessment.targetGapId === 'VISIBILITY_POSITION_PLURALITY_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
    );
    expect(report.positionImmediateRetryAuthorized).toBe(false);
    expect(position?.disposition).toBe('WAIT_FOR_GENUINELY_NEW_POSITION_SURFACE');
    expect(position?.discoveryProgressMaterial).toBe(false);
  });

  test('has zero admission-ready or closure-ready gaps', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionAdequacyReview(
      acceptedB28(),
    );
    expect(report.authorityAdmissionReadyGapCount).toBe(0);
    expect(report.gapClosureReadyCount).toBe(0);
    expect(report.assessments.every((assessment) => assessment.authorityAdmissionReady === false)).toBe(true);
    expect(report.assessments.every((assessment) => assessment.gapClosureReady === false)).toBe(true);
  });

  test('blocks stitching and exhausted-surface search while keeping dimensions unconsumed', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionAdequacyReview(
      acceptedB28(),
    );
    expect(report.crossSourceRequirementStitchingAuthorized).toBe(false);
    expect(report.repeatedExhaustedSurfaceSearchAuthorized).toBe(false);
    expect(report.visibilityConsumedByThisGate).toBe(false);
    expect(report.pluralityConsumedByThisGate).toBe(false);
    expect(report.seasonalConsumedByThisGate).toBe(false);
  });

  test('keeps all six historical gaps open and creates no T8 or production artifacts', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionAdequacyReview(
      acceptedB28(),
    );
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.authorityAdmittedByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
  });

  test('freezes controls and routes to Qianli corrected-primary disclaimer binding', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionAdequacyReview(
      acceptedB28(),
    );
    expect(report.controlIds).toEqual(CAREER_T8_B29_NEW_SURFACE_ACQUISITION_ADEQUACY_CONTROL_IDS);
    expect(report.controlCount).toBe(12);
    expect(report.controlsFrozen).toBe(true);
    expect(report.recommendedNextGate).toBe('QIANLI_1936_CAREER_DISCLAIMER_CORRECTED_PRIMARY_PAGE_BINDING_EVIDENCE');
  });

  test('fails closed when B28 content-addressed identity is tampered', () => {
    const b28 = acceptedB28();
    const tampered: CareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionEvidenceReport = {
      ...b28,
      evidenceId: `${b28.evidenceId}_tampered`,
    };
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionAdequacyReview(
      tampered,
    );
    expect(report.status).toBe('UPSTREAM_B28_BOUNDARY_INVALID');
    expect(report.decision).toBe('NEW_EVIDENCE_SURFACE_ACQUISITION_ADEQUACY_NOT_ESTABLISHED');
    expect(report.assessments).toEqual([]);
    expect(report.assessmentCount).toBe(0);
    expect(report.lanesWithMaterialDiscoveryProgressCount).toBe(0);
    expect(report.immediatelyActionableFollowupCount).toBe(0);
    expect(report.qianliCorrectedPrimaryPageBindingExecutableNext).toBe(false);
    expect(report.controlCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
  });
});
