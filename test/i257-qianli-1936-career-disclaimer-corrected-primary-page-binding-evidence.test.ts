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
  buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionAdequacyReview,
  type CareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionAdequacyReviewReport,
} from '../src/research/career-personalization-t8-current-method-residual-authority-new-evidence-surface-acquisition-adequacy-review.js';
import { I253_QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_EVIDENCE_VERSION } from '../src/research/i253-qianli-primary-witness-provenance-correction-evidence.js';
import {
  I257_QIANLI_1936_CAREER_DISCLAIMER_CORRECTED_PRIMARY_PAGE_BINDING_EVIDENCE_VERSION,
  I257_QIANLI_1936_CAREER_DISCLAIMER_PRIMARY_BINDING_CONTROL_IDS,
  buildI257Qianli1936CareerDisclaimerCorrectedPrimaryPageBindingEvidence,
} from '../src/research/i257-qianli-1936-career-disclaimer-corrected-primary-page-binding-evidence.js';

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
    upstreamB27ReviewId: 'b27_i257_fixture',
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

function acceptedB29(): CareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionAdequacyReviewReport {
  return buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionAdequacyReview(
    acceptedB28(),
  );
}

describe('I257 Qianli 1936 Career disclaimer corrected-primary page binding evidence', () => {
  test('accepts exact B29 and resolves the bounded primary-binding attempt', () => {
    const report = buildI257Qianli1936CareerDisclaimerCorrectedPrimaryPageBindingEvidence(acceptedB29());
    expect(report.evidenceVersion).toBe(
      I257_QIANLI_1936_CAREER_DISCLAIMER_CORRECTED_PRIMARY_PAGE_BINDING_EVIDENCE_VERSION,
    );
    expect(report.status).toBe('RESOLVED_QIANLI_1936_CAREER_DISCLAIMER_CORRECTED_PRIMARY_PAGE_BINDING_EVIDENCE');
    expect(report.decision).toBe(
      'DERIVATIVE_CAREER_DISCLAIMER_LOCATOR_MATERIAL_BUT_CORRECTED_1936_PRIMARY_P50_P53_RENDER_UNAVAILABLE_LIMITS_REQUIREMENT_UNSATISFIED_FAIL_CLOSED_NO_AUTHORITY_ADMISSION',
    );
    expect(report.exactB29BoundaryAccepted).toBe(true);
  });

  test('keeps provenance authority on the corrected I253 1936 NLC witness', () => {
    const report = buildI257Qianli1936CareerDisclaimerCorrectedPrimaryPageBindingEvidence(acceptedB29());
    expect(report.upstreamI253EvidenceVersion).toBe(I253_QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_EVIDENCE_VERSION);
    expect(report.provenanceAuthority).toEqual({
      workTitle: '韋千里命學講義',
      author: '韋千里',
      publisher: '韋氏命苑',
      publicationYear: 1936,
      nlcIdentity: 'nlc:data_416,01jh000368,10155',
      primaryPdfPageCount: 368,
    });
  });

  test('keeps Wikimedia as access surface only', () => {
    const report = buildI257Qianli1936CareerDisclaimerCorrectedPrimaryPageBindingEvidence(acceptedB29());
    expect(report.primaryAccessSurface.kind).toBe('MECHANICAL_SCAN_MIRROR_OF_ALREADY_BOUND_NLC_WITNESS');
    expect(report.primaryAccessSurface.mayReplaceProvenanceAuthority).toBe(false);
    expect(report.primaryAccessSurface.transcriptionAuthority).toBe(false);
  });

  test('retains the Career-specific derivative disclaimer only as a locator lead', () => {
    const report = buildI257Qianli1936CareerDisclaimerCorrectedPrimaryPageBindingEvidence(acceptedB29());
    expect(report.derivativeLocatorLead.careerSectionSpecificDisclaimerLeadObserved).toBe(true);
    expect(report.derivativeLocatorLead.disclaimerSemantics).toBe(
      'CAREER_METHOD_IS_NOT_SINGLE_REASON_DETERMINISTIC_AND_REQUIRES_LIVE_CONTEXTUAL_READING',
    );
    expect(report.derivativeLocatorLead.mayServeAsPrimaryAuthority).toBe(false);
    expect(report.derivativeLocatorLead.mayCloseLimitsRequirementWithoutPrimaryBinding).toBe(false);
  });

  test('binds the target interval to printed p50-p53 and PDF zero-based 336-339', () => {
    const report = buildI257Qianli1936CareerDisclaimerCorrectedPrimaryPageBindingEvidence(acceptedB29());
    expect(report.targetInterval).toEqual({
      lowerBoundPrintedPage: 50,
      upperBoundPrintedPage: 53,
      lowerBoundPdfZeroBased: 336,
      upperBoundPdfZeroBased: 339,
      boundedByDirectlyObservedPrintedP49CareerOpening: true,
      boundedByPreviouslyObservedPrintedP54NextSectionOpening: true,
    });
  });

  test('records four direct corrected-primary render attempts as cache misses', () => {
    const report = buildI257Qianli1936CareerDisclaimerCorrectedPrimaryPageBindingEvidence(acceptedB29());
    expect(report.renderAttemptCount).toBe(4);
    expect(report.renderAttempts).toEqual([
      { printedPage: 50, pdfZeroBased: 336, outcome: 'CACHE_MISS' },
      { printedPage: 51, pdfZeroBased: 337, outcome: 'CACHE_MISS' },
      { printedPage: 52, pdfZeroBased: 338, outcome: 'CACHE_MISS' },
      { printedPage: 53, pdfZeroBased: 339, outcome: 'CACHE_MISS' },
    ]);
    expect(report.successfulPrimaryRenderCount).toBe(0);
  });

  test('fails closed rather than inferring primary binding from derivative or neighboring pages', () => {
    const report = buildI257Qianli1936CareerDisclaimerCorrectedPrimaryPageBindingEvidence(acceptedB29());
    expect(report.correctedPrimaryCareerDisclaimerBound).toBe(false);
    expect(report.derivativeTextPromotedToPrimaryAuthority).toBe(false);
    expect(report.neighboringPageInferenceUsed).toBe(false);
  });

  test('keeps both remaining family checks unresolved', () => {
    const report = buildI257Qianli1936CareerDisclaimerCorrectedPrimaryPageBindingEvidence(acceptedB29());
    expect(report.familyLimitsRequirementSatisfied).toBe(false);
    expect(report.familyCurrentMethodCompatibilitySatisfied).toBe(false);
    expect(report.familyRelationCoverageClass).toBe('MATERIAL_PARTIAL_REQUIREMENT_COVERAGE');
  });

  test('accepts zero formal coverage advancement and no authority admission', () => {
    const report = buildI257Qianli1936CareerDisclaimerCorrectedPrimaryPageBindingEvidence(acceptedB29());
    expect(report.formalAuthorityCoverageAdvancementCount).toBe(0);
    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.gapClosureReady).toBe(false);
    expect(report.authorityAdmittedByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
  });

  test('keeps all six historical gaps open and creates no T8 or production artifacts', () => {
    const report = buildI257Qianli1936CareerDisclaimerCorrectedPrimaryPageBindingEvidence(acceptedB29());
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.methodologyScopeExpandedByThisGate).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
  });

  test('freezes controls and routes to a primary-access-surface hold review', () => {
    const report = buildI257Qianli1936CareerDisclaimerCorrectedPrimaryPageBindingEvidence(acceptedB29());
    expect(report.controlIds).toEqual(I257_QIANLI_1936_CAREER_DISCLAIMER_PRIMARY_BINDING_CONTROL_IDS);
    expect(report.controlCount).toBe(12);
    expect(report.controlsFrozen).toBe(true);
    expect(report.recommendedNextGate).toBe('QIANLI_1936_CAREER_DISCLAIMER_PRIMARY_ACCESS_SURFACE_HOLD_REVIEW');
  });

  test('is deterministic for the same exact B29 boundary', () => {
    const first = buildI257Qianli1936CareerDisclaimerCorrectedPrimaryPageBindingEvidence(acceptedB29());
    const second = buildI257Qianli1936CareerDisclaimerCorrectedPrimaryPageBindingEvidence(acceptedB29());
    expect(first.evidenceId).toBe(second.evidenceId);
    expect(first).toEqual(second);
  });

  test('fails closed when B29 content-addressed identity is tampered', () => {
    const b29 = acceptedB29();
    const tampered: CareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionAdequacyReviewReport = {
      ...b29,
      reviewId: `${b29.reviewId}_tampered`,
    };
    const report = buildI257Qianli1936CareerDisclaimerCorrectedPrimaryPageBindingEvidence(tampered);
    expect(report.status).toBe('UPSTREAM_B29_BOUNDARY_INVALID');
    expect(report.decision).toBe('QIANLI_1936_CAREER_DISCLAIMER_PRIMARY_BINDING_NOT_ESTABLISHED');
    expect(report.exactB29BoundaryAccepted).toBe(false);
    expect(report.derivativeLocatorLead.careerSectionSpecificDisclaimerLeadObserved).toBe(false);
    expect(report.renderAttemptCount).toBe(0);
    expect(report.controlCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_ADEQUACY_REVIEW',
    );
  });
});
