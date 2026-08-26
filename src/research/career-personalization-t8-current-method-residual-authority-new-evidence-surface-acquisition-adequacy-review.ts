import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import type { CareerT8SynthesisAuthorityGapId } from './career-personalization-t8-synthesis-authority-gap-requirements-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_EVIDENCE_VERSION,
  CAREER_T8_B28_NEW_SURFACE_ACQUISITION_EVIDENCE_CONTROL_IDS,
  CAREER_T8_B28_NEW_SURFACE_ACQUISITION_RECORDS,
  type CareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionEvidenceReport,
} from './career-personalization-t8-current-method-residual-authority-new-evidence-surface-acquisition-evidence.js';

export const CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_ADEQUACY_REVIEW_VERSION =
  'myeonghwa-career-personalization-t8-current-method-residual-authority-new-evidence-surface-acquisition-adequacy-review-v1' as const;

export type CareerT8B29FollowupDisposition =
  | 'WAIT_FOR_DIRECT_TARGET_BODY_ACCESS_NO_REPEAT_OF_CURRENT_SURFACE'
  | 'EXECUTE_CORRECTED_PRIMARY_PAGE_BINDING_NEXT'
  | 'WAIT_FOR_INDEPENDENT_NORMATIVE_SOURCE_NO_REPEAT_OF_WEB_LEAD'
  | 'WAIT_FOR_GENUINELY_NEW_POSITION_SURFACE';

export interface CareerT8B29LaneAdequacyAssessment {
  targetGapId: CareerT8SynthesisAuthorityGapId;
  formalCoverageAdvancedByB28: false;
  discoveryProgressMaterial: boolean;
  immediatelyActionableFollowup: boolean;
  disposition: CareerT8B29FollowupDisposition;
  nextEvidenceObjective: string;
  currentSurfaceExhaustedForFormalCoverage: boolean;
  authorityAdmissionReady: false;
  gapClosureReady: false;
}

export const CAREER_T8_B29_LANE_ADEQUACY_ASSESSMENTS = Object.freeze([
  Object.freeze({
    targetGapId: 'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING' as const,
    formalCoverageAdvancedByB28: false as const,
    discoveryProgressMaterial: true,
    immediatelyActionableFollowup: false,
    disposition: 'WAIT_FOR_DIRECT_TARGET_BODY_ACCESS_NO_REPEAT_OF_CURRENT_SURFACE' as const,
    nextEvidenceObjective:
      'Obtain a new access path that directly renders or extracts Qin Lunshi printed p.464 body and local context. Re-opening the current PDFCoffee metadata/early-body surface or repeating the inaccessible download endpoint is not a formal-coverage action.',
    currentSurfaceExhaustedForFormalCoverage: true,
    authorityAdmissionReady: false as const,
    gapClosureReady: false as const,
  }),
  Object.freeze({
    targetGapId: 'FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING' as const,
    formalCoverageAdvancedByB28: false as const,
    discoveryProgressMaterial: true,
    immediatelyActionableFollowup: true,
    disposition: 'EXECUTE_CORRECTED_PRIMARY_PAGE_BINDING_NEXT' as const,
    nextEvidenceObjective:
      'Directly inspect the corrected 1936 NLC witness continuation between printed p.49 and p.54, prioritizing printed p.50-p.53 / PDF zero-based 336-339, and determine whether the Career-specific disclaimer found in derivative transcription is present in the primary 事業 section. Do not use the derivative text as authority if primary rendering remains unavailable.',
    currentSurfaceExhaustedForFormalCoverage: false,
    authorityAdmissionReady: false as const,
    gapClosureReady: false as const,
  }),
  Object.freeze({
    targetGapId: 'BRANCH_CLASH_TO_T5_CAREER_SEMANTIC_MODIFIER_MISSING' as const,
    formalCoverageAdvancedByB28: false as const,
    discoveryProgressMaterial: true,
    immediatelyActionableFollowup: false,
    disposition: 'WAIT_FOR_INDEPENDENT_NORMATIVE_SOURCE_NO_REPEAT_OF_WEB_LEAD' as const,
    nextEvidenceObjective:
      'Retain the new clash + 印星 + work-instability passage as a semantic discovery lead only. Continue only when an independently adequate normative natal source surface appears; re-searching or re-citing the same recent web article does not advance the requirement.',
    currentSurfaceExhaustedForFormalCoverage: true,
    authorityAdmissionReady: false as const,
    gapClosureReady: false as const,
  }),
  Object.freeze({
    targetGapId: 'VISIBILITY_POSITION_PLURALITY_TO_CAREER_SEMANTIC_MODIFIER_MISSING' as const,
    formalCoverageAdvancedByB28: false as const,
    discoveryProgressMaterial: false,
    immediatelyActionableFollowup: false,
    disposition: 'WAIT_FOR_GENUINELY_NEW_POSITION_SURFACE' as const,
    nextEvidenceObjective:
      'Wait for a genuinely new independently adequate position/separation-to-specific-current-T5 Career source surface. Existing Xu position evidence and Qianli 明暗/地位 remain preserved partials and may not be recycled.',
    currentSurfaceExhaustedForFormalCoverage: true,
    authorityAdmissionReady: false as const,
    gapClosureReady: false as const,
  }),
] as const satisfies readonly CareerT8B29LaneAdequacyAssessment[]);

export const CAREER_T8_B29_NEW_SURFACE_ACQUISITION_ADEQUACY_CONTROL_IDS = Object.freeze([
  'B29_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B28_EVIDENCE_BOUNDARY',
  'B28_DISCOVERY_PROGRESS_IS_DISTINGUISHED_FROM_FORMAL_AUTHORITY_REQUIREMENT_COVERAGE',
  'ZERO_B28_LANES_ARE_AUTHORITY_ADMISSION_OR_GAP_CLOSURE_READY',
  'QIN_CURRENT_SURFACE_IS_EXHAUSTED_UNTIL_A_NEW_PATH_DIRECTLY_ACCESSES_P464_BODY',
  'QIANLI_CAREER_DISCLAIMER_LEAD_IS_THE_ONLY_IMMEDIATELY_ACTIONABLE_POST_B28_FOLLOWUP',
  'QIANLI_FOLLOWUP_IS_LIMITED_TO_CORRECTED_1936_PRIMARY_PAGE_BINDING_AND_MAY_FAIL_CLOSED',
  'BRANCH_WEB_SEMANTIC_LEAD_IS_EXHAUSTED_FOR_FORMAL_COVERAGE_UNTIL_NORMATIVE_SOURCE_APPEARS',
  'POSITION_REMAINS_WAITING_FOR_A_GENUINELY_NEW_QUALIFYING_SURFACE',
  'CURRENT_METHOD_COMPATIBILITY_REMAINS_UNRESOLVED_FOR_FAMILY_EVEN_IF_PRIMARY_DISCLAIMER_IS_LATER_BOUND',
  'VISIBILITY_PLURALITY_AND_SEASONAL_REMAIN_UNCONSUMED_AND_I254_REMAINS_CONTROLLING',
  'ALL_SIX_HISTORICAL_T8_SYNTHESIS_AUTHORITY_GAPS_REMAIN_OPEN',
  'NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_PROMOTION',
] as const);

export interface CareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionAdequacyReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_ADEQUACY_REVIEW_VERSION;
  status:
    | 'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_ADEQUACY_REVIEW'
    | 'UPSTREAM_B28_BOUNDARY_INVALID';
  decision:
    | 'B28_DISCOVERY_PROGRESS_VALID_ZERO_FORMAL_COVERAGE_ADVANCEMENTS_ONE_PRIMARY_BINDING_FOLLOWUP_ACTIONABLE_NO_AUTHORITY_ADMISSION'
    | 'NEW_EVIDENCE_SURFACE_ACQUISITION_ADEQUACY_NOT_ESTABLISHED';
  upstreamB28EvidenceId: string;
  exactB28BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  assessments: readonly CareerT8B29LaneAdequacyAssessment[];
  assessmentCount: 4 | 0;
  lanesWithMaterialDiscoveryProgressCount: 3 | 0;
  lanesWithFormalCoverageAdvancementCount: 0;
  immediatelyActionableFollowupCount: 1 | 0;
  qinImmediateRetryAuthorized: false;
  qianliCorrectedPrimaryPageBindingExecutableNext: boolean;
  branchSameWebLeadRetryAuthorized: false;
  positionImmediateRetryAuthorized: false;
  familyLimitsRequirementSatisfied: false;
  familyCurrentMethodCompatibilitySatisfied: false;
  authorityAdmissionReadyGapCount: 0;
  gapClosureReadyCount: 0;
  allSixHistoricalGapsRemainOpen: true;
  unresolvedGapIds: typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS;
  crossSourceRequirementStitchingAuthorized: false;
  repeatedExhaustedSurfaceSearchAuthorized: false;
  visibilityConsumedByThisGate: false;
  pluralityConsumedByThisGate: false;
  seasonalConsumedByThisGate: false;
  authorityAdmittedByThisGate: false;
  authorityGapClosedByThisGate: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  productionImpact: 'NONE';
  controlIds: readonly (typeof CAREER_T8_B29_NEW_SURFACE_ACQUISITION_ADEQUACY_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    adequacyAssessmentsCreated: 4 | 0;
    discoveryProgressAccepted: 3 | 0;
    formalCoverageAdvancementsAccepted: 0;
    immediatelyActionableFollowups: 1 | 0;
    authorityCandidatesAccepted: 0;
    authorityGapsClosed: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'QIANLI_1936_CAREER_DISCLAIMER_CORRECTED_PRIMARY_PAGE_BINDING_EVIDENCE'
    | 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_ADEQUACY_REVIEW';
}

function contentAddressedB28IdentityValid(
  b28: CareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionEvidenceReport,
): boolean {
  const { evidenceId, ...material } = b28;
  return (
    evidenceId ===
    `career_t8_current_method_residual_authority_new_evidence_surface_acquisition_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB28Accepted(
  b28: CareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionEvidenceReport,
): boolean {
  return (
    contentAddressedB28IdentityValid(b28) &&
    b28.evidenceVersion ===
      CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_EVIDENCE_VERSION &&
    b28.status ===
      'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_EVIDENCE' &&
    b28.decision ===
      'FOUR_BOUNDED_LANES_EXECUTED_THREE_NEW_SURFACES_DISCOVERED_ZERO_FORMAL_COVERAGE_ADVANCEMENTS_PRIMARY_AND_PROVENANCE_GAPS_PRESERVED' &&
    b28.exactB27BoundaryAccepted &&
    b28.domain === 'career' &&
    b28.temporalScope === 'natal' &&
    b28.statusClass === 'research' &&
    b28.recordCount === 4 &&
    deterministicContentHash(b28.records) === deterministicContentHash(CAREER_T8_B28_NEW_SURFACE_ACQUISITION_RECORDS) &&
    b28.acquisitionLaneExecutionCount === 4 &&
    b28.genuinelyNewSurfaceDiscoveryCount === 3 &&
    b28.targetBodyOrPassageDirectAcquisitionCount === 1 &&
    b28.formalAuthorityCoverageAdvancementCount === 0 &&
    b28.qinFullDocumentSurfaceDiscovered &&
    b28.qinP464BodyAcquired === false &&
    b28.familyCareerDisclaimerLeadDiscovered &&
    b28.familyCareerDisclaimerCorrectedPrimaryBound === false &&
    b28.familyLimitsRequirementSatisfied === false &&
    b28.familyCurrentMethodCompatibilitySatisfied === false &&
    b28.branchDirectTenGodClashCareerSemanticLeadDiscovered &&
    b28.branchIndependentNormativeProvenanceAdequate === false &&
    b28.branchCurrentMethodCompatibilitySatisfied === false &&
    b28.positionNewQualifyingSurfaceAcquired === false &&
    b28.crossSourceRequirementStitchingUsed === false &&
    b28.repeatedPriorSurfaceCountedAsProgress === false &&
    b28.visibilityConsumedByThisGate === false &&
    b28.pluralityConsumedByThisGate === false &&
    b28.seasonalConsumedByThisGate === false &&
    b28.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b28.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b28.controlCount === 12 &&
    b28.controlsFrozen &&
    deterministicContentHash(b28.controlIds) ===
      deterministicContentHash(CAREER_T8_B28_NEW_SURFACE_ACQUISITION_EVIDENCE_CONTROL_IDS) &&
    b28.t8RuleAuthoringAuthorized === false &&
    b28.personalizedT8PackCreationAuthorized === false &&
    b28.productionPromotionAuthorized === false &&
    b28.productionImpact === 'NONE' &&
    b28.recommendedNextGate ===
      'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_ADEQUACY_REVIEW'
  );
}

function assessmentsValid(): boolean {
  const ids = CAREER_T8_B29_LANE_ADEQUACY_ASSESSMENTS.map((assessment) => assessment.targetGapId);
  return (
    ids.length === 4 &&
    new Set(ids).size === 4 &&
    CAREER_T8_B29_LANE_ADEQUACY_ASSESSMENTS.filter((assessment) => assessment.discoveryProgressMaterial).length === 3 &&
    CAREER_T8_B29_LANE_ADEQUACY_ASSESSMENTS.filter((assessment) => assessment.immediatelyActionableFollowup).length === 1 &&
    CAREER_T8_B29_LANE_ADEQUACY_ASSESSMENTS.every(
      (assessment) =>
        assessment.formalCoverageAdvancedByB28 === false &&
        assessment.authorityAdmissionReady === false &&
        assessment.gapClosureReady === false,
    )
  );
}

function finalized(
  material: Omit<
    CareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionAdequacyReviewReport,
    'reviewId'
  >,
): CareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionAdequacyReviewReport {
  return {
    reviewId: `career_t8_current_method_residual_authority_new_evidence_surface_acquisition_adequacy_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionAdequacyReview(
  b28: CareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionEvidenceReport,
): CareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionAdequacyReviewReport {
  const upstreamAccepted = exactB28Accepted(b28);
  const assessmentAccepted = assessmentsValid();
  const accepted = upstreamAccepted && assessmentAccepted;

  return finalized({
    reviewVersion:
      CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_ADEQUACY_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_ADEQUACY_REVIEW'
      : 'UPSTREAM_B28_BOUNDARY_INVALID',
    decision: accepted
      ? 'B28_DISCOVERY_PROGRESS_VALID_ZERO_FORMAL_COVERAGE_ADVANCEMENTS_ONE_PRIMARY_BINDING_FOLLOWUP_ACTIONABLE_NO_AUTHORITY_ADMISSION'
      : 'NEW_EVIDENCE_SURFACE_ACQUISITION_ADEQUACY_NOT_ESTABLISHED',
    upstreamB28EvidenceId: b28.evidenceId,
    exactB28BoundaryAccepted: upstreamAccepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    assessments: accepted ? CAREER_T8_B29_LANE_ADEQUACY_ASSESSMENTS : Object.freeze([]),
    assessmentCount: accepted ? 4 : 0,
    lanesWithMaterialDiscoveryProgressCount: accepted ? 3 : 0,
    lanesWithFormalCoverageAdvancementCount: 0,
    immediatelyActionableFollowupCount: accepted ? 1 : 0,
    qinImmediateRetryAuthorized: false,
    qianliCorrectedPrimaryPageBindingExecutableNext: accepted,
    branchSameWebLeadRetryAuthorized: false,
    positionImmediateRetryAuthorized: false,
    familyLimitsRequirementSatisfied: false,
    familyCurrentMethodCompatibilitySatisfied: false,
    authorityAdmissionReadyGapCount: 0,
    gapClosureReadyCount: 0,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    crossSourceRequirementStitchingAuthorized: false,
    repeatedExhaustedSurfaceSearchAuthorized: false,
    visibilityConsumedByThisGate: false,
    pluralityConsumedByThisGate: false,
    seasonalConsumedByThisGate: false,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: accepted ? CAREER_T8_B29_NEW_SURFACE_ACQUISITION_ADEQUACY_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      adequacyAssessmentsCreated: accepted ? 4 : 0,
      discoveryProgressAccepted: accepted ? 3 : 0,
      formalCoverageAdvancementsAccepted: 0,
      immediatelyActionableFollowups: accepted ? 1 : 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: accepted
      ? 'QIANLI_1936_CAREER_DISCLAIMER_CORRECTED_PRIMARY_PAGE_BINDING_EVIDENCE'
      : 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_ADEQUACY_REVIEW',
  });
}
