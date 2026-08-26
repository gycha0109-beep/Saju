import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_ADEQUACY_REVIEW_VERSION,
  CAREER_T8_B29_LANE_ADEQUACY_ASSESSMENTS,
  CAREER_T8_B29_NEW_SURFACE_ACQUISITION_ADEQUACY_CONTROL_IDS,
  type CareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionAdequacyReviewReport,
} from './career-personalization-t8-current-method-residual-authority-new-evidence-surface-acquisition-adequacy-review.js';
import { I253_QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_EVIDENCE_VERSION } from './i253-qianli-primary-witness-provenance-correction-evidence.js';

export const I257_QIANLI_1936_CAREER_DISCLAIMER_CORRECTED_PRIMARY_PAGE_BINDING_EVIDENCE_VERSION =
  'myeonghwa-i257-qianli-1936-career-disclaimer-corrected-primary-page-binding-evidence-v1' as const;

export const I257_QIANLI_1936_CAREER_DISCLAIMER_PRIMARY_BINDING_CONTROL_IDS = Object.freeze([
  'I257_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B29_ADEQUACY_BOUNDARY',
  'PROVENANCE_AUTHORITY_REMAINS_THE_I253_CORRECTED_1936_NLC_WITNESS',
  'WIKIMEDIA_COMMONS_REMAINS_A_MECHANICAL_SCAN_ACCESS_SURFACE_ONLY',
  'DERIVATIVE_CAREER_DISCLAIMER_TEXT_IS_A_LOCATOR_LEAD_ONLY_AND_NEVER_PRIMARY_AUTHORITY',
  'TARGET_INTERVAL_IS_BOUNDED_TO_PRINTED_P50_P53_PDF_ZERO_BASED_336_339',
  'ALL_FOUR_TARGET_PAGE_RENDER_ATTEMPTS_ARE_RECORDED_AS_CACHE_MISS_FAILURES',
  'PRIMARY_CAREER_DISCLAIMER_BINDING_MAY_NOT_BE_INFERRED_FROM_DERIVATIVE_TEXT_OR_NEIGHBORING_BOUND_PAGES',
  'FAMILY_LIMITS_REQUIREMENT_REMAINS_UNSATISFIED_WHILE_PRIMARY_BINDING_IS_UNAVAILABLE',
  'FAMILY_CURRENT_METHOD_COMPATIBILITY_REMAINS_SEPARATELY_UNSATISFIED',
  'NO_CROSS_SOURCE_STITCHING_OR_HISTORICAL_OCCUPATION_MODERNIZATION',
  'ALL_SIX_HISTORICAL_T8_SYNTHESIS_AUTHORITY_GAPS_REMAIN_OPEN',
  'NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_PROMOTION',
] as const);

export interface I257Qianli1936CareerDisclaimerCorrectedPrimaryPageBindingEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof I257_QIANLI_1936_CAREER_DISCLAIMER_CORRECTED_PRIMARY_PAGE_BINDING_EVIDENCE_VERSION;
  status:
    | 'RESOLVED_QIANLI_1936_CAREER_DISCLAIMER_CORRECTED_PRIMARY_PAGE_BINDING_EVIDENCE'
    | 'UPSTREAM_B29_BOUNDARY_INVALID';
  decision:
    | 'DERIVATIVE_CAREER_DISCLAIMER_LOCATOR_MATERIAL_BUT_CORRECTED_1936_PRIMARY_P50_P53_RENDER_UNAVAILABLE_LIMITS_REQUIREMENT_UNSATISFIED_FAIL_CLOSED_NO_AUTHORITY_ADMISSION'
    | 'QIANLI_1936_CAREER_DISCLAIMER_PRIMARY_BINDING_NOT_ESTABLISHED';
  upstreamB29ReviewId: string;
  exactB29BoundaryAccepted: boolean;
  upstreamI253EvidenceVersion: typeof I253_QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_EVIDENCE_VERSION;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  provenanceAuthority: {
    workTitle: '韋千里命學講義';
    author: '韋千里';
    publisher: '韋氏命苑';
    publicationYear: 1936;
    nlcIdentity: 'nlc:data_416,01jh000368,10155';
    primaryPdfPageCount: 368;
  };
  primaryAccessSurface: {
    provider: 'Wikimedia Commons';
    fileIdentity: 'NLC416-01jh000368-10155 韋千里命學講義.pdf';
    kind: 'MECHANICAL_SCAN_MIRROR_OF_ALREADY_BOUND_NLC_WITNESS';
    mayReplaceProvenanceAuthority: false;
    transcriptionAuthority: false;
  };
  derivativeLocatorLead: {
    provider: 'Sanqing derivative transcription';
    workLabelOnSurface: '千里命稿';
    careerSectionSpecificDisclaimerLeadObserved: boolean;
    disclaimerSemantics: 'CAREER_METHOD_IS_NOT_SINGLE_REASON_DETERMINISTIC_AND_REQUIRES_LIVE_CONTEXTUAL_READING';
    mayServeAsPrimaryAuthority: false;
    mayCloseLimitsRequirementWithoutPrimaryBinding: false;
  };
  targetInterval: {
    lowerBoundPrintedPage: 50;
    upperBoundPrintedPage: 53;
    lowerBoundPdfZeroBased: 336;
    upperBoundPdfZeroBased: 339;
    boundedByDirectlyObservedPrintedP49CareerOpening: true;
    boundedByPreviouslyObservedPrintedP54NextSectionOpening: true;
  };
  renderAttempts: readonly [
    { printedPage: 50; pdfZeroBased: 336; outcome: 'CACHE_MISS' },
    { printedPage: 51; pdfZeroBased: 337; outcome: 'CACHE_MISS' },
    { printedPage: 52; pdfZeroBased: 338; outcome: 'CACHE_MISS' },
    { printedPage: 53; pdfZeroBased: 339; outcome: 'CACHE_MISS' },
  ];
  renderAttemptCount: 4 | 0;
  successfulPrimaryRenderCount: 0;
  correctedPrimaryCareerDisclaimerBound: false;
  derivativeTextPromotedToPrimaryAuthority: false;
  neighboringPageInferenceUsed: false;
  familyLimitsRequirementSatisfied: false;
  familyCurrentMethodCompatibilitySatisfied: false;
  familyRelationCoverageClass: 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE';
  formalAuthorityCoverageAdvancementCount: 0;
  authorityAdmissionReady: false;
  gapClosureReady: false;
  allSixHistoricalGapsRemainOpen: true;
  unresolvedGapIds: typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS;
  crossSourceRequirementStitchingUsed: false;
  historicalOccupationModernizationAuthorized: false;
  methodologyScopeExpandedByThisGate: false;
  authorityAdmittedByThisGate: false;
  authorityGapClosedByThisGate: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  productionImpact: 'NONE';
  controlIds: readonly (typeof I257_QIANLI_1936_CAREER_DISCLAIMER_PRIMARY_BINDING_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    correctedPrimaryPagesTargeted: 4 | 0;
    correctedPrimaryPagesRendered: 0;
    derivativeLocatorLeadsRetained: 1 | 0;
    formalCoverageAdvancements: 0;
    authorityCandidatesAccepted: 0;
    authorityGapsClosed: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'QIANLI_1936_CAREER_DISCLAIMER_PRIMARY_ACCESS_SURFACE_HOLD_REVIEW'
    | 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_ADEQUACY_REVIEW';
}

function contentAddressedB29IdentityValid(
  b29: CareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionAdequacyReviewReport,
): boolean {
  const { reviewId, ...material } = b29;
  return (
    reviewId ===
    `career_t8_current_method_residual_authority_new_evidence_surface_acquisition_adequacy_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB29Accepted(
  b29: CareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionAdequacyReviewReport,
): boolean {
  return (
    contentAddressedB29IdentityValid(b29) &&
    b29.reviewVersion ===
      CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_ADEQUACY_REVIEW_VERSION &&
    b29.status ===
      'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_ADEQUACY_REVIEW' &&
    b29.decision ===
      'B28_DISCOVERY_PROGRESS_VALID_ZERO_FORMAL_COVERAGE_ADVANCEMENTS_ONE_PRIMARY_BINDING_FOLLOWUP_ACTIONABLE_NO_AUTHORITY_ADMISSION' &&
    b29.exactB28BoundaryAccepted &&
    b29.domain === 'career' &&
    b29.temporalScope === 'natal' &&
    b29.statusClass === 'research' &&
    b29.assessmentCount === 4 &&
    deterministicContentHash(b29.assessments) === deterministicContentHash(CAREER_T8_B29_LANE_ADEQUACY_ASSESSMENTS) &&
    b29.lanesWithMaterialDiscoveryProgressCount === 3 &&
    b29.lanesWithFormalCoverageAdvancementCount === 0 &&
    b29.immediatelyActionableFollowupCount === 1 &&
    b29.qinImmediateRetryAuthorized === false &&
    b29.qianliCorrectedPrimaryPageBindingExecutableNext &&
    b29.branchSameWebLeadRetryAuthorized === false &&
    b29.positionImmediateRetryAuthorized === false &&
    b29.familyLimitsRequirementSatisfied === false &&
    b29.familyCurrentMethodCompatibilitySatisfied === false &&
    b29.authorityAdmissionReadyGapCount === 0 &&
    b29.gapClosureReadyCount === 0 &&
    b29.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b29.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b29.crossSourceRequirementStitchingAuthorized === false &&
    b29.repeatedExhaustedSurfaceSearchAuthorized === false &&
    b29.visibilityConsumedByThisGate === false &&
    b29.pluralityConsumedByThisGate === false &&
    b29.seasonalConsumedByThisGate === false &&
    b29.authorityAdmittedByThisGate === false &&
    b29.authorityGapClosedByThisGate === false &&
    b29.controlCount === 12 &&
    b29.controlsFrozen &&
    deterministicContentHash(b29.controlIds) ===
      deterministicContentHash(CAREER_T8_B29_NEW_SURFACE_ACQUISITION_ADEQUACY_CONTROL_IDS) &&
    b29.t8RuleAuthoringAuthorized === false &&
    b29.personalizedT8PackCreationAuthorized === false &&
    b29.productionPromotionAuthorized === false &&
    b29.productionImpact === 'NONE' &&
    b29.recommendedNextGate === 'QIANLI_1936_CAREER_DISCLAIMER_CORRECTED_PRIMARY_PAGE_BINDING_EVIDENCE'
  );
}

function finalized(
  material: Omit<I257Qianli1936CareerDisclaimerCorrectedPrimaryPageBindingEvidenceReport, 'evidenceId'>,
): I257Qianli1936CareerDisclaimerCorrectedPrimaryPageBindingEvidenceReport {
  return {
    evidenceId: `i257_qianli_1936_career_disclaimer_corrected_primary_page_binding_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI257Qianli1936CareerDisclaimerCorrectedPrimaryPageBindingEvidence(
  b29: CareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionAdequacyReviewReport,
): I257Qianli1936CareerDisclaimerCorrectedPrimaryPageBindingEvidenceReport {
  const accepted = exactB29Accepted(b29);

  return finalized({
    evidenceVersion: I257_QIANLI_1936_CAREER_DISCLAIMER_CORRECTED_PRIMARY_PAGE_BINDING_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_QIANLI_1936_CAREER_DISCLAIMER_CORRECTED_PRIMARY_PAGE_BINDING_EVIDENCE'
      : 'UPSTREAM_B29_BOUNDARY_INVALID',
    decision: accepted
      ? 'DERIVATIVE_CAREER_DISCLAIMER_LOCATOR_MATERIAL_BUT_CORRECTED_1936_PRIMARY_P50_P53_RENDER_UNAVAILABLE_LIMITS_REQUIREMENT_UNSATISFIED_FAIL_CLOSED_NO_AUTHORITY_ADMISSION'
      : 'QIANLI_1936_CAREER_DISCLAIMER_PRIMARY_BINDING_NOT_ESTABLISHED',
    upstreamB29ReviewId: b29.reviewId,
    exactB29BoundaryAccepted: accepted,
    upstreamI253EvidenceVersion: I253_QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_EVIDENCE_VERSION,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    provenanceAuthority: {
      workTitle: '韋千里命學講義',
      author: '韋千里',
      publisher: '韋氏命苑',
      publicationYear: 1936,
      nlcIdentity: 'nlc:data_416,01jh000368,10155',
      primaryPdfPageCount: 368,
    },
    primaryAccessSurface: {
      provider: 'Wikimedia Commons',
      fileIdentity: 'NLC416-01jh000368-10155 韋千里命學講義.pdf',
      kind: 'MECHANICAL_SCAN_MIRROR_OF_ALREADY_BOUND_NLC_WITNESS',
      mayReplaceProvenanceAuthority: false,
      transcriptionAuthority: false,
    },
    derivativeLocatorLead: {
      provider: 'Sanqing derivative transcription',
      workLabelOnSurface: '千里命稿',
      careerSectionSpecificDisclaimerLeadObserved: accepted,
      disclaimerSemantics: 'CAREER_METHOD_IS_NOT_SINGLE_REASON_DETERMINISTIC_AND_REQUIRES_LIVE_CONTEXTUAL_READING',
      mayServeAsPrimaryAuthority: false,
      mayCloseLimitsRequirementWithoutPrimaryBinding: false,
    },
    targetInterval: {
      lowerBoundPrintedPage: 50,
      upperBoundPrintedPage: 53,
      lowerBoundPdfZeroBased: 336,
      upperBoundPdfZeroBased: 339,
      boundedByDirectlyObservedPrintedP49CareerOpening: true,
      boundedByPreviouslyObservedPrintedP54NextSectionOpening: true,
    },
    renderAttempts: [
      { printedPage: 50, pdfZeroBased: 336, outcome: 'CACHE_MISS' },
      { printedPage: 51, pdfZeroBased: 337, outcome: 'CACHE_MISS' },
      { printedPage: 52, pdfZeroBased: 338, outcome: 'CACHE_MISS' },
      { printedPage: 53, pdfZeroBased: 339, outcome: 'CACHE_MISS' },
    ],
    renderAttemptCount: accepted ? 4 : 0,
    successfulPrimaryRenderCount: 0,
    correctedPrimaryCareerDisclaimerBound: false,
    derivativeTextPromotedToPrimaryAuthority: false,
    neighboringPageInferenceUsed: false,
    familyLimitsRequirementSatisfied: false,
    familyCurrentMethodCompatibilitySatisfied: false,
    familyRelationCoverageClass: 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE',
    formalAuthorityCoverageAdvancementCount: 0,
    authorityAdmissionReady: false,
    gapClosureReady: false,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    crossSourceRequirementStitchingUsed: false,
    historicalOccupationModernizationAuthorized: false,
    methodologyScopeExpandedByThisGate: false,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: accepted ? I257_QIANLI_1936_CAREER_DISCLAIMER_PRIMARY_BINDING_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      correctedPrimaryPagesTargeted: accepted ? 4 : 0,
      correctedPrimaryPagesRendered: 0,
      derivativeLocatorLeadsRetained: accepted ? 1 : 0,
      formalCoverageAdvancements: 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: accepted
      ? 'QIANLI_1936_CAREER_DISCLAIMER_PRIMARY_ACCESS_SURFACE_HOLD_REVIEW'
      : 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_ADEQUACY_REVIEW',
  });
}
