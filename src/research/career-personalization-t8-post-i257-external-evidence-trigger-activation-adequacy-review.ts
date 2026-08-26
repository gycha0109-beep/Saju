import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_EVIDENCE_VERSION,
  CAREER_T8_B32_TRIGGER_ACTIVATION_CONTROL_IDS,
  CAREER_T8_B32_TRIGGER_ACTIVATION_RECORDS,
  type CareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationEvidenceReport,
} from './career-personalization-t8-post-i257-external-evidence-trigger-activation-evidence.js';

export const CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_ADEQUACY_REVIEW_VERSION =
  'myeonghwa-career-personalization-t8-post-i257-external-evidence-trigger-activation-adequacy-review-v1' as const;

export const CAREER_T8_B33_POSITION_ADEQUACY_CONTROL_IDS = Object.freeze([
  'B33_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B32_TRIGGER_ACTIVATION_BOUNDARY',
  'POSITION_TRIGGER_ACTIVATION_IS_ACCEPTED_AS_A_REOPEN_EVENT_BUT_NOT_AS_AUTHORITY_ADMISSION',
  'CHEN_YUAN_1995_SOURCE_IDENTITY_PUBLICATION_PROVENANCE_AND_LOCAL_POSITION_CONTEXT_ARE_MATERIALLY_ADEQUATE',
  'MONTH_ZHENGGUAN_TO_FORMAL_RESPONSIBILITY_SEMANTIC_CORRESPONDENCE_IS_ACCEPTED_AS_TRIGGER_LEVEL_EVIDENCE',
  'THE_SOURCE_DOES_NOT_EXPLICITLY_DEFINE_A_POSITION_MODIFICATION_DELTA_AGAINST_THE_BASELINE_ZHENGGUAN_SEMANTIC',
  'THE_SOURCE_LOCAL_RULE_DEPENDS_ON_XIGUAN_SHENGUAN_BALANCE_AND_CONSTRAINT_CONDITIONS_NOT_CONSUMED_BY_CURRENT_T5',
  'STRENGTH_WANGSHUAI_XIJI_DEPENDENCIES_MAY_NOT_BE_SILENTLY_DROPPED_TO_FORCE_CURRENT_METHOD_COMPATIBILITY',
  'LI_SHUNXIANG_2004_CORROBORATION_MAY_NOT_BE_USED_TO_STITCH_A_MISSING_CHEN_YUAN_REQUIREMENT',
  'POSITION_AUTHORITY_ADMISSION_AND_GAP_CLOSURE_REMAIN_NOT_READY',
  'POSITION_GAP_REMAINS_MATERIAL_PARTIAL_AND_REQUIRES_CURRENT_METHOD_COMPATIBLE_POSITION_DELTA_EVIDENCE_OR_EXPLICIT_METHOD_CHANGE',
  'ALL_SIX_HISTORICAL_T8_SYNTHESIS_AUTHORITY_GAPS_REMAIN_OPEN',
  'NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_PROMOTION',
] as const);

export interface CareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationAdequacyReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_ADEQUACY_REVIEW_VERSION;
  status:
    | 'RESOLVED_CAREER_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_ADEQUACY_REVIEW'
    | 'UPSTREAM_B32_BOUNDARY_INVALID';
  decision:
    | 'POSITION_TRIGGER_ACTIVATION_VALID_BUT_EXPLICIT_POSITION_MODIFICATION_DELTA_AND_CURRENT_METHOD_COMPATIBILITY_NOT_ESTABLISHED_NO_AUTHORITY_ADMISSION'
    | 'EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_ADEQUACY_NOT_ESTABLISHED';
  upstreamB32EvidenceId: string;
  exactB32BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  positionTriggerActivationAccepted: boolean;
  positionSourceIdentityAdequate: boolean;
  positionIndependentPublicationProvenanceAdequate: boolean;
  positionStableLocatorAdequate: boolean;
  positionLocalContextAdequate: boolean;
  positionNatalScopeAdequate: boolean;
  positionExactTenGodSubtypePreserved: boolean;
  positionConditionObserved: boolean;
  positionCurrentT5SemanticCorrespondenceObserved: boolean;
  positionSameSourceLimitsObserved: boolean;
  positionExplicitModificationDeltaEstablished: false;
  positionStrengthXijiDependencyObserved: boolean;
  positionCurrentMethodCompatibilityEstablished: false;
  positionStrengthXijiDependencyMayBeIgnored: false;
  corroboratingPublishedSourceObserved: boolean;
  corroboratingSourceMayFillMissingRequirement: false;
  positionCoverageClass: 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE';
  positionAuthorityAdmissionReady: false;
  positionGapClosureReady: false;
  activatedTriggerCountPreserved: 1 | 0;
  authorityAdmissionReadyGapCount: 0;
  gapClosureReadyCount: 0;
  allSixHistoricalGapsRemainOpen: true;
  unresolvedGapIds: typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS;
  authorityAdmittedByThisGate: false;
  authorityGapClosedByThisGate: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  productionImpact: 'NONE';
  controlIds: readonly (typeof CAREER_T8_B33_POSITION_ADEQUACY_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    activatedPositionTriggerReviewed: 1 | 0;
    triggerActivationAccepted: 1 | 0;
    authorityCandidatesAdmitted: 0;
    authorityGapsClosed: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'POSITION_CURRENT_T5_BRIDGE_CURRENT_METHOD_COMPATIBILITY_REMEDIATION_READINESS_REVIEW'
    | 'CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_EVIDENCE';
}

function contentAddressedB32IdentityValid(
  b32: CareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationEvidenceReport,
): boolean {
  const { evidenceId, ...material } = b32;
  return evidenceId ===
    `career_t8_post_i257_external_evidence_trigger_activation_${deterministicContentHash(material).slice(0, 24)}`;
}

function exactB32Accepted(
  b32: CareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationEvidenceReport,
): boolean {
  const position = b32.records.find((record) => record.triggerId === 'POSITION_CURRENT_T5_BRIDGE_TRIGGER');
  return (
    contentAddressedB32IdentityValid(b32) &&
    b32.evidenceVersion === CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_EVIDENCE_VERSION &&
    b32.status === 'RESOLVED_CAREER_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_EVIDENCE' &&
    b32.decision ===
      'ONE_POSITION_TRIGGER_ACTIVATED_THREE_TRIGGERS_REMAIN_CLOSED_NO_AUTHORITY_ADMISSION_CURRENT_METHOD_COMPATIBILITY_REVIEW_REQUIRED' &&
    b32.exactB31BoundaryAccepted &&
    b32.domain === 'career' &&
    b32.temporalScope === 'natal' &&
    b32.statusClass === 'research' &&
    b32.recordCount === 4 &&
    deterministicContentHash(b32.records) === deterministicContentHash(CAREER_T8_B32_TRIGGER_ACTIVATION_RECORDS) &&
    b32.materialNewSurfaceCount === 4 &&
    b32.activatedTriggerCount === 1 &&
    deterministicContentHash(b32.activatedTriggerIds) === deterministicContentHash(['POSITION_CURRENT_T5_BRIDGE_TRIGGER']) &&
    b32.qinTriggerActivated === false &&
    b32.qianliTriggerActivated === false &&
    b32.branchTriggerActivated === false &&
    b32.positionTriggerActivated &&
    b32.positionCandidateExactTenGod === '정관' &&
    b32.positionCandidateCurrentT5SemanticKey === 'TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY' &&
    b32.positionCandidateFacet === 'formal_responsibility' &&
    b32.positionCandidatePillar === 'month' &&
    b32.positionCurrentMethodCompatibilityEstablished === false &&
    position?.recordId === 'POSITION_CHEN_YUAN_1995_MONTH_OFFICER_FORMAL_RESPONSIBILITY_TRIGGER_ACTIVATED' &&
    position.triggerSatisfied &&
    position.independentNormativeProvenanceAdequateForTrigger &&
    position.directOrVerifiedLocalContextAvailable &&
    position.natalScopeConfirmed &&
    position.specificCurrentT5SemanticBindingObserved &&
    position.explicitScopeOrLimitsObserved &&
    position.currentMethodCompatibilityEstablished === false &&
    b32.authorityAdmissionReadyGapCount === 0 &&
    b32.gapClosureReadyCount === 0 &&
    b32.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b32.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b32.controlCount === 12 &&
    b32.controlsFrozen &&
    deterministicContentHash(b32.controlIds) === deterministicContentHash(CAREER_T8_B32_TRIGGER_ACTIVATION_CONTROL_IDS) &&
    b32.authorityAdmittedByThisGate === false &&
    b32.authorityGapClosedByThisGate === false &&
    b32.t8RuleAuthoringAuthorized === false &&
    b32.personalizedT8PackCreationAuthorized === false &&
    b32.productionPromotionAuthorized === false &&
    b32.productionImpact === 'NONE' &&
    b32.recommendedNextGate ===
      'CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_ADEQUACY_REVIEW'
  );
}

function finalized(
  material: Omit<CareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationAdequacyReviewReport, 'reviewId'>,
): CareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationAdequacyReviewReport {
  return {
    reviewId: `career_t8_post_i257_external_evidence_trigger_activation_adequacy_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationAdequacyReview(
  b32: CareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationEvidenceReport,
): CareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationAdequacyReviewReport {
  const accepted = exactB32Accepted(b32);

  return finalized({
    reviewVersion: CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_ADEQUACY_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_ADEQUACY_REVIEW'
      : 'UPSTREAM_B32_BOUNDARY_INVALID',
    decision: accepted
      ? 'POSITION_TRIGGER_ACTIVATION_VALID_BUT_EXPLICIT_POSITION_MODIFICATION_DELTA_AND_CURRENT_METHOD_COMPATIBILITY_NOT_ESTABLISHED_NO_AUTHORITY_ADMISSION'
      : 'EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_ADEQUACY_NOT_ESTABLISHED',
    upstreamB32EvidenceId: b32.evidenceId,
    exactB32BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    positionTriggerActivationAccepted: accepted,
    positionSourceIdentityAdequate: accepted,
    positionIndependentPublicationProvenanceAdequate: accepted,
    positionStableLocatorAdequate: accepted,
    positionLocalContextAdequate: accepted,
    positionNatalScopeAdequate: accepted,
    positionExactTenGodSubtypePreserved: accepted,
    positionConditionObserved: accepted,
    positionCurrentT5SemanticCorrespondenceObserved: accepted,
    positionSameSourceLimitsObserved: accepted,
    positionExplicitModificationDeltaEstablished: false,
    positionStrengthXijiDependencyObserved: accepted,
    positionCurrentMethodCompatibilityEstablished: false,
    positionStrengthXijiDependencyMayBeIgnored: false,
    corroboratingPublishedSourceObserved: accepted,
    corroboratingSourceMayFillMissingRequirement: false,
    positionCoverageClass: 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE',
    positionAuthorityAdmissionReady: false,
    positionGapClosureReady: false,
    activatedTriggerCountPreserved: accepted ? 1 : 0,
    authorityAdmissionReadyGapCount: 0,
    gapClosureReadyCount: 0,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: accepted ? CAREER_T8_B33_POSITION_ADEQUACY_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      activatedPositionTriggerReviewed: accepted ? 1 : 0,
      triggerActivationAccepted: accepted ? 1 : 0,
      authorityCandidatesAdmitted: 0,
      authorityGapsClosed: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: accepted
      ? 'POSITION_CURRENT_T5_BRIDGE_CURRENT_METHOD_COMPATIBILITY_REMEDIATION_READINESS_REVIEW'
      : 'CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_EVIDENCE',
  });
}
