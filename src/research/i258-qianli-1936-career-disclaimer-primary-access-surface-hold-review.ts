import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  I257_QIANLI_1936_CAREER_DISCLAIMER_CORRECTED_PRIMARY_PAGE_BINDING_EVIDENCE_VERSION,
  I257_QIANLI_1936_CAREER_DISCLAIMER_PRIMARY_BINDING_CONTROL_IDS,
  type I257Qianli1936CareerDisclaimerCorrectedPrimaryPageBindingEvidenceReport,
} from './i257-qianli-1936-career-disclaimer-corrected-primary-page-binding-evidence.js';

export const I258_QIANLI_1936_CAREER_DISCLAIMER_PRIMARY_ACCESS_SURFACE_HOLD_REVIEW_VERSION =
  'myeonghwa-i258-qianli-1936-career-disclaimer-primary-access-surface-hold-review-v1' as const;

export const I258_QIANLI_PRIMARY_ACCESS_RESUME_CONDITIONS = Object.freeze([
  Object.freeze({
    conditionId: 'EXACT_WIKIMEDIA_CORRECTED_WITNESS_TARGET_PAGE_RENDER_RECOVERS' as const,
    acceptable: true as const,
    description:
      'The already-bound exact 1936 NLC witness on Wikimedia successfully renders at least one of PDF zero-based pages 336-339 after an observable access-state change.',
  }),
  Object.freeze({
    conditionId: 'NLC_DIRECT_EXACT_WITNESS_TARGET_PAGE_ACCESS_BECOMES_AVAILABLE' as const,
    acceptable: true as const,
    description:
      'The National Library of China surface directly exposes the exact witness target pages or an equivalent page-local image/text representation.',
  }),
  Object.freeze({
    conditionId: 'NEW_MECHANICAL_MIRROR_OF_EXACT_NLC_WITNESS_EXPOSES_TARGET_PAGES' as const,
    acceptable: true as const,
    description:
      'A new mechanical mirror demonstrably bound to nlc:data_416,01jh000368,10155 exposes printed p.50-p.53 directly.',
  }),
] as const);

export const I258_QIANLI_PRIMARY_ACCESS_NON_RESUME_CONDITIONS = Object.freeze([
  Object.freeze({
    conditionId: 'REPEAT_SAME_CACHE_MISS_WITHOUT_ACCESS_STATE_CHANGE' as const,
    acceptable: false as const,
  }),
  Object.freeze({
    conditionId: 'DERIVATIVE_TRANSCRIPTION_ONLY' as const,
    acceptable: false as const,
  }),
  Object.freeze({
    conditionId: 'DIFFERENT_1934_NLC_WITNESS_ONLY' as const,
    acceptable: false as const,
  }),
  Object.freeze({
    conditionId: 'NEIGHBORING_PAGE_OR_POSITIONAL_INFERENCE_ONLY' as const,
    acceptable: false as const,
  }),
  Object.freeze({
    conditionId: 'SEARCH_SNIPPET_OR_CATALOG_METADATA_ONLY' as const,
    acceptable: false as const,
  }),
] as const);

export const I258_QIANLI_PRIMARY_ACCESS_SURFACE_HOLD_CONTROL_IDS = Object.freeze([
  'I258_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_I257_EVIDENCE_BOUNDARY',
  'I257_PRIMARY_BINDING_FAILURE_IS_TREATED_AS_ACCESS_BLOCKAGE_NOT_TEXTUAL_ABSENCE',
  'REPEATING_THE_SAME_CACHE_MISS_WITHOUT_OBSERVABLE_ACCESS_STATE_CHANGE_IS_PROHIBITED',
  'RECOVERED_RENDER_ON_THE_EXACT_CORRECTED_WITNESS_IS_SUFFICIENT_TO_RESUME_BOUNDED_BINDING',
  'NLC_DIRECT_OR_NEW_MECHANICAL_MIRROR_ACCESS_MUST_BIND_TO_THE_EXACT_I253_WITNESS_IDENTITY',
  'DERIVATIVE_TRANSCRIPTION_REMAINS_LOCATOR_ONLY_AND_CANNOT_TRIGGER_AUTHORITY_ADMISSION',
  'THE_DIFFERENT_1934_NLC_WITNESS_CANNOT_SUBSTITUTE_FOR_THE_FROZEN_1936_WITNESS_BINDING',
  'FAMILY_LIMITS_REQUIREMENT_REMAINS_OPEN_AND_CURRENT_METHOD_COMPATIBILITY_REMAINS_SEPARATELY_OPEN',
  'NO_CROSS_SOURCE_STITCHING_OR_NEIGHBOR_PAGE_INFERENCE',
  'ALL_SIX_HISTORICAL_T8_SYNTHESIS_AUTHORITY_GAPS_REMAIN_OPEN',
  'HOLD_REVIEW_DOES_NOT_CREATE_A_NEW_AUTHORITY_CANDIDATE_OR_CLOSE_A_GAP',
  'NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_PROMOTION',
] as const);

export interface I258Qianli1936CareerDisclaimerPrimaryAccessSurfaceHoldReviewReport {
  reviewId: string;
  reviewVersion: typeof I258_QIANLI_1936_CAREER_DISCLAIMER_PRIMARY_ACCESS_SURFACE_HOLD_REVIEW_VERSION;
  status:
    | 'RESOLVED_QIANLI_1936_CAREER_DISCLAIMER_PRIMARY_ACCESS_SURFACE_HOLD_REVIEW'
    | 'UPSTREAM_I257_BOUNDARY_INVALID';
  decision:
    | 'I257_PRIMARY_BINDING_ACCESS_BLOCKED_REPEAT_WITHOUT_STATE_CHANGE_PROHIBITED_RESUME_ONLY_ON_EXACT_WITNESS_DIRECT_PAGE_ACCESS_FAMILY_GAP_REMAINS_OPEN'
    | 'QIANLI_1936_CAREER_DISCLAIMER_PRIMARY_ACCESS_HOLD_NOT_ESTABLISHED';
  upstreamI257EvidenceId: string;
  exactI257BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  holdDisposition: 'WAIT_FOR_EXACT_WITNESS_DIRECT_PAGE_ACCESS_STATE_CHANGE';
  immediateSameSurfaceRetryAuthorized: false;
  primaryTextAbsenceInferredFromAccessFailure: false;
  resumeConditions: typeof I258_QIANLI_PRIMARY_ACCESS_RESUME_CONDITIONS | readonly [];
  resumeConditionCount: 3 | 0;
  nonResumeConditions: typeof I258_QIANLI_PRIMARY_ACCESS_NON_RESUME_CONDITIONS | readonly [];
  nonResumeConditionCount: 5 | 0;
  exactCorrectedWitnessRequiredOnResume: true;
  exactCorrectedWitnessIdentity: 'nlc:data_416,01jh000368,10155';
  targetPrintedPages: readonly [50, 51, 52, 53];
  targetPdfZeroBasedPages: readonly [336, 337, 338, 339];
  derivativeLocatorLeadRetained: boolean;
  different1934WitnessMaySubstitute: false;
  familyLimitsRequirementSatisfied: false;
  familyCurrentMethodCompatibilitySatisfied: false;
  familyRelationCoverageClass: 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE';
  authorityAdmissionReady: false;
  gapClosureReady: false;
  allSixHistoricalGapsRemainOpen: true;
  unresolvedGapIds: typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS;
  crossSourceRequirementStitchingAuthorized: false;
  authorityAdmittedByThisGate: false;
  authorityGapClosedByThisGate: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  productionImpact: 'NONE';
  controlIds: readonly (typeof I258_QIANLI_PRIMARY_ACCESS_SURFACE_HOLD_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    holdPoliciesCreated: 1 | 0;
    resumeConditionsCreated: 3 | 0;
    nonResumeConditionsCreated: 5 | 0;
    sourceAcquisitionsPerformed: 0;
    authorityCandidatesAccepted: 0;
    authorityGapsClosed: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'CAREER_PERSONALIZATION_T8_POST_I257_RESIDUAL_AUTHORITY_FRONTIER_RECONCILIATION_REVIEW'
    | 'QIANLI_1936_CAREER_DISCLAIMER_PRIMARY_ACCESS_SURFACE_HOLD_REVIEW';
}

function contentAddressedI257IdentityValid(
  i257: I257Qianli1936CareerDisclaimerCorrectedPrimaryPageBindingEvidenceReport,
): boolean {
  const { evidenceId, ...material } = i257;
  return (
    evidenceId ===
    `i257_qianli_1936_career_disclaimer_corrected_primary_page_binding_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactI257Accepted(
  i257: I257Qianli1936CareerDisclaimerCorrectedPrimaryPageBindingEvidenceReport,
): boolean {
  return (
    contentAddressedI257IdentityValid(i257) &&
    i257.evidenceVersion === I257_QIANLI_1936_CAREER_DISCLAIMER_CORRECTED_PRIMARY_PAGE_BINDING_EVIDENCE_VERSION &&
    i257.status === 'RESOLVED_QIANLI_1936_CAREER_DISCLAIMER_CORRECTED_PRIMARY_PAGE_BINDING_EVIDENCE' &&
    i257.decision ===
      'DERIVATIVE_CAREER_DISCLAIMER_LOCATOR_MATERIAL_BUT_CORRECTED_1936_PRIMARY_P50_P53_RENDER_UNAVAILABLE_LIMITS_REQUIREMENT_UNSATISFIED_FAIL_CLOSED_NO_AUTHORITY_ADMISSION' &&
    i257.exactB29BoundaryAccepted &&
    i257.domain === 'career' &&
    i257.temporalScope === 'natal' &&
    i257.statusClass === 'research' &&
    i257.provenanceAuthority.nlcIdentity === 'nlc:data_416,01jh000368,10155' &&
    i257.primaryAccessSurface.fileIdentity === 'NLC416-01jh000368-10155 韋千里命學講義.pdf' &&
    i257.primaryAccessSurface.mayReplaceProvenanceAuthority === false &&
    i257.primaryAccessSurface.transcriptionAuthority === false &&
    i257.derivativeLocatorLead.careerSectionSpecificDisclaimerLeadObserved &&
    i257.derivativeLocatorLead.mayServeAsPrimaryAuthority === false &&
    i257.targetInterval.lowerBoundPrintedPage === 50 &&
    i257.targetInterval.upperBoundPrintedPage === 53 &&
    i257.targetInterval.lowerBoundPdfZeroBased === 336 &&
    i257.targetInterval.upperBoundPdfZeroBased === 339 &&
    i257.renderAttemptCount === 4 &&
    i257.renderAttempts.every((attempt) => attempt.outcome === 'CACHE_MISS') &&
    i257.successfulPrimaryRenderCount === 0 &&
    i257.correctedPrimaryCareerDisclaimerBound === false &&
    i257.derivativeTextPromotedToPrimaryAuthority === false &&
    i257.neighboringPageInferenceUsed === false &&
    i257.familyLimitsRequirementSatisfied === false &&
    i257.familyCurrentMethodCompatibilitySatisfied === false &&
    i257.familyRelationCoverageClass === 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE' &&
    i257.formalAuthorityCoverageAdvancementCount === 0 &&
    i257.authorityAdmissionReady === false &&
    i257.gapClosureReady === false &&
    i257.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(i257.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    i257.crossSourceRequirementStitchingUsed === false &&
    i257.authorityAdmittedByThisGate === false &&
    i257.authorityGapClosedByThisGate === false &&
    i257.controlCount === 12 &&
    i257.controlsFrozen &&
    deterministicContentHash(i257.controlIds) ===
      deterministicContentHash(I257_QIANLI_1936_CAREER_DISCLAIMER_PRIMARY_BINDING_CONTROL_IDS) &&
    i257.t8RuleAuthoringAuthorized === false &&
    i257.personalizedT8PackCreationAuthorized === false &&
    i257.productionPromotionAuthorized === false &&
    i257.productionImpact === 'NONE' &&
    i257.recommendedNextGate === 'QIANLI_1936_CAREER_DISCLAIMER_PRIMARY_ACCESS_SURFACE_HOLD_REVIEW'
  );
}

function finalized(
  material: Omit<I258Qianli1936CareerDisclaimerPrimaryAccessSurfaceHoldReviewReport, 'reviewId'>,
): I258Qianli1936CareerDisclaimerPrimaryAccessSurfaceHoldReviewReport {
  return {
    reviewId: `i258_qianli_1936_career_disclaimer_primary_access_surface_hold_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI258Qianli1936CareerDisclaimerPrimaryAccessSurfaceHoldReview(
  i257: I257Qianli1936CareerDisclaimerCorrectedPrimaryPageBindingEvidenceReport,
): I258Qianli1936CareerDisclaimerPrimaryAccessSurfaceHoldReviewReport {
  const accepted = exactI257Accepted(i257);

  return finalized({
    reviewVersion: I258_QIANLI_1936_CAREER_DISCLAIMER_PRIMARY_ACCESS_SURFACE_HOLD_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_QIANLI_1936_CAREER_DISCLAIMER_PRIMARY_ACCESS_SURFACE_HOLD_REVIEW'
      : 'UPSTREAM_I257_BOUNDARY_INVALID',
    decision: accepted
      ? 'I257_PRIMARY_BINDING_ACCESS_BLOCKED_REPEAT_WITHOUT_STATE_CHANGE_PROHIBITED_RESUME_ONLY_ON_EXACT_WITNESS_DIRECT_PAGE_ACCESS_FAMILY_GAP_REMAINS_OPEN'
      : 'QIANLI_1936_CAREER_DISCLAIMER_PRIMARY_ACCESS_HOLD_NOT_ESTABLISHED',
    upstreamI257EvidenceId: i257.evidenceId,
    exactI257BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    holdDisposition: 'WAIT_FOR_EXACT_WITNESS_DIRECT_PAGE_ACCESS_STATE_CHANGE',
    immediateSameSurfaceRetryAuthorized: false,
    primaryTextAbsenceInferredFromAccessFailure: false,
    resumeConditions: accepted ? I258_QIANLI_PRIMARY_ACCESS_RESUME_CONDITIONS : Object.freeze([]),
    resumeConditionCount: accepted ? 3 : 0,
    nonResumeConditions: accepted ? I258_QIANLI_PRIMARY_ACCESS_NON_RESUME_CONDITIONS : Object.freeze([]),
    nonResumeConditionCount: accepted ? 5 : 0,
    exactCorrectedWitnessRequiredOnResume: true,
    exactCorrectedWitnessIdentity: 'nlc:data_416,01jh000368,10155',
    targetPrintedPages: [50, 51, 52, 53],
    targetPdfZeroBasedPages: [336, 337, 338, 339],
    derivativeLocatorLeadRetained: accepted,
    different1934WitnessMaySubstitute: false,
    familyLimitsRequirementSatisfied: false,
    familyCurrentMethodCompatibilitySatisfied: false,
    familyRelationCoverageClass: 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE',
    authorityAdmissionReady: false,
    gapClosureReady: false,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    crossSourceRequirementStitchingAuthorized: false,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: accepted ? I258_QIANLI_PRIMARY_ACCESS_SURFACE_HOLD_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      holdPoliciesCreated: accepted ? 1 : 0,
      resumeConditionsCreated: accepted ? 3 : 0,
      nonResumeConditionsCreated: accepted ? 5 : 0,
      sourceAcquisitionsPerformed: 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: accepted
      ? 'CAREER_PERSONALIZATION_T8_POST_I257_RESIDUAL_AUTHORITY_FRONTIER_RECONCILIATION_REVIEW'
      : 'QIANLI_1936_CAREER_DISCLAIMER_PRIMARY_ACCESS_SURFACE_HOLD_REVIEW',
  });
}
