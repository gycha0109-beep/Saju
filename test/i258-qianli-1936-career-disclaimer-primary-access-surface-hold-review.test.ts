import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_EVIDENCE_VERSION,
  CAREER_T8_B28_NEW_SURFACE_ACQUISITION_EVIDENCE_CONTROL_IDS,
  CAREER_T8_B28_NEW_SURFACE_ACQUISITION_RECORDS,
  type CareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionEvidenceReport,
} from '../src/research/career-personalization-t8-current-method-residual-authority-new-evidence-surface-acquisition-evidence.js';
import { buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionAdequacyReview } from '../src/research/career-personalization-t8-current-method-residual-authority-new-evidence-surface-acquisition-adequacy-review.js';
import {
  buildI257Qianli1936CareerDisclaimerCorrectedPrimaryPageBindingEvidence,
  type I257Qianli1936CareerDisclaimerCorrectedPrimaryPageBindingEvidenceReport,
} from '../src/research/i257-qianli-1936-career-disclaimer-corrected-primary-page-binding-evidence.js';
import {
  I258_QIANLI_1936_CAREER_DISCLAIMER_PRIMARY_ACCESS_SURFACE_HOLD_REVIEW_VERSION,
  I258_QIANLI_PRIMARY_ACCESS_NON_RESUME_CONDITIONS,
  I258_QIANLI_PRIMARY_ACCESS_RESUME_CONDITIONS,
  I258_QIANLI_PRIMARY_ACCESS_SURFACE_HOLD_CONTROL_IDS,
  buildI258Qianli1936CareerDisclaimerPrimaryAccessSurfaceHoldReview,
} from '../src/research/i258-qianli-1936-career-disclaimer-primary-access-surface-hold-review.js';

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
    upstreamB27ReviewId: 'b27_i258_fixture',
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

function acceptedI257(): I257Qianli1936CareerDisclaimerCorrectedPrimaryPageBindingEvidenceReport {
  const b29 = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionAdequacyReview(
    acceptedB28(),
  );
  return buildI257Qianli1936CareerDisclaimerCorrectedPrimaryPageBindingEvidence(b29);
}

describe('I258 Qianli 1936 Career disclaimer primary access surface hold review', () => {
  test('accepts exact I257 and resolves the access-surface hold', () => {
    const report = buildI258Qianli1936CareerDisclaimerPrimaryAccessSurfaceHoldReview(acceptedI257());
    expect(report.reviewVersion).toBe(I258_QIANLI_1936_CAREER_DISCLAIMER_PRIMARY_ACCESS_SURFACE_HOLD_REVIEW_VERSION);
    expect(report.status).toBe('RESOLVED_QIANLI_1936_CAREER_DISCLAIMER_PRIMARY_ACCESS_SURFACE_HOLD_REVIEW');
    expect(report.decision).toBe(
      'I257_PRIMARY_BINDING_ACCESS_BLOCKED_REPEAT_WITHOUT_STATE_CHANGE_PROHIBITED_RESUME_ONLY_ON_EXACT_WITNESS_DIRECT_PAGE_ACCESS_FAMILY_GAP_REMAINS_OPEN',
    );
    expect(report.exactI257BoundaryAccepted).toBe(true);
  });

  test('treats I257 as access blockage and not textual absence', () => {
    const report = buildI258Qianli1936CareerDisclaimerPrimaryAccessSurfaceHoldReview(acceptedI257());
    expect(report.holdDisposition).toBe('WAIT_FOR_EXACT_WITNESS_DIRECT_PAGE_ACCESS_STATE_CHANGE');
    expect(report.primaryTextAbsenceInferredFromAccessFailure).toBe(false);
  });

  test('blocks immediate repetition of the same cache-miss surface', () => {
    const report = buildI258Qianli1936CareerDisclaimerPrimaryAccessSurfaceHoldReview(acceptedI257());
    expect(report.immediateSameSurfaceRetryAuthorized).toBe(false);
    expect(report.nonResumeConditions).toContainEqual({
      conditionId: 'REPEAT_SAME_CACHE_MISS_WITHOUT_ACCESS_STATE_CHANGE',
      acceptable: false,
    });
  });

  test('allows bounded resumption if the exact Wikimedia witness render actually recovers', () => {
    const report = buildI258Qianli1936CareerDisclaimerPrimaryAccessSurfaceHoldReview(acceptedI257());
    expect(report.resumeConditions).toContainEqual(
      expect.objectContaining({
        conditionId: 'EXACT_WIKIMEDIA_CORRECTED_WITNESS_TARGET_PAGE_RENDER_RECOVERS',
        acceptable: true,
      }),
    );
  });

  test('allows direct NLC or a new exact-witness mechanical mirror as future access paths', () => {
    const report = buildI258Qianli1936CareerDisclaimerPrimaryAccessSurfaceHoldReview(acceptedI257());
    expect(report.resumeConditions).toEqual(I258_QIANLI_PRIMARY_ACCESS_RESUME_CONDITIONS);
    expect(report.resumeConditionCount).toBe(3);
    expect(report.exactCorrectedWitnessRequiredOnResume).toBe(true);
    expect(report.exactCorrectedWitnessIdentity).toBe('nlc:data_416,01jh000368,10155');
  });

  test('rejects derivative text, a different 1934 witness, neighbor inference and snippets as resume triggers', () => {
    const report = buildI258Qianli1936CareerDisclaimerPrimaryAccessSurfaceHoldReview(acceptedI257());
    expect(report.nonResumeConditions).toEqual(I258_QIANLI_PRIMARY_ACCESS_NON_RESUME_CONDITIONS);
    expect(report.nonResumeConditionCount).toBe(5);
    expect(report.different1934WitnessMaySubstitute).toBe(false);
  });

  test('retains the exact bounded target pages', () => {
    const report = buildI258Qianli1936CareerDisclaimerPrimaryAccessSurfaceHoldReview(acceptedI257());
    expect(report.targetPrintedPages).toEqual([50, 51, 52, 53]);
    expect(report.targetPdfZeroBasedPages).toEqual([336, 337, 338, 339]);
  });

  test('retains the derivative locator lead without satisfying either remaining family check', () => {
    const report = buildI258Qianli1936CareerDisclaimerPrimaryAccessSurfaceHoldReview(acceptedI257());
    expect(report.derivativeLocatorLeadRetained).toBe(true);
    expect(report.familyLimitsRequirementSatisfied).toBe(false);
    expect(report.familyCurrentMethodCompatibilitySatisfied).toBe(false);
    expect(report.familyRelationCoverageClass).toBe('MATERIAL_PARTIAL_REQUIREMENT_COVERAGE');
  });

  test('does not admit authority or close the family gap', () => {
    const report = buildI258Qianli1936CareerDisclaimerPrimaryAccessSurfaceHoldReview(acceptedI257());
    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.gapClosureReady).toBe(false);
    expect(report.authorityAdmittedByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
  });

  test('keeps all six gaps open and creates no T8 or production artifacts', () => {
    const report = buildI258Qianli1936CareerDisclaimerPrimaryAccessSurfaceHoldReview(acceptedI257());
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.crossSourceRequirementStitchingAuthorized).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
  });

  test('freezes hold controls and routes to frontier reconciliation', () => {
    const report = buildI258Qianli1936CareerDisclaimerPrimaryAccessSurfaceHoldReview(acceptedI257());
    expect(report.controlIds).toEqual(I258_QIANLI_PRIMARY_ACCESS_SURFACE_HOLD_CONTROL_IDS);
    expect(report.controlCount).toBe(12);
    expect(report.controlsFrozen).toBe(true);
    expect(report.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_POST_I257_RESIDUAL_AUTHORITY_FRONTIER_RECONCILIATION_REVIEW',
    );
  });

  test('is deterministic for the same exact I257 boundary', () => {
    const first = buildI258Qianli1936CareerDisclaimerPrimaryAccessSurfaceHoldReview(acceptedI257());
    const second = buildI258Qianli1936CareerDisclaimerPrimaryAccessSurfaceHoldReview(acceptedI257());
    expect(first.reviewId).toBe(second.reviewId);
    expect(first).toEqual(second);
  });

  test('fails closed when I257 content-addressed identity is tampered', () => {
    const i257 = acceptedI257();
    const tampered: I257Qianli1936CareerDisclaimerCorrectedPrimaryPageBindingEvidenceReport = {
      ...i257,
      evidenceId: `${i257.evidenceId}_tampered`,
    };
    const report = buildI258Qianli1936CareerDisclaimerPrimaryAccessSurfaceHoldReview(tampered);
    expect(report.status).toBe('UPSTREAM_I257_BOUNDARY_INVALID');
    expect(report.decision).toBe('QIANLI_1936_CAREER_DISCLAIMER_PRIMARY_ACCESS_HOLD_NOT_ESTABLISHED');
    expect(report.exactI257BoundaryAccepted).toBe(false);
    expect(report.resumeConditions).toEqual([]);
    expect(report.resumeConditionCount).toBe(0);
    expect(report.nonResumeConditions).toEqual([]);
    expect(report.nonResumeConditionCount).toBe(0);
    expect(report.derivativeLocatorLeadRetained).toBe(false);
    expect(report.controlCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
  });
});
