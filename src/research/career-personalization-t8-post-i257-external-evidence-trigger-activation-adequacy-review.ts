import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_EVIDENCE_VERSION,
  CAREER_T8_B32_TRIGGER_ACTIVATION_CONTROL_IDS,
  CAREER_T8_B32_TRIGGER_ACTIVATION_RECORDS,
  type CareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationEvidenceReport,
} from './career-personalization-t8-post-i257-external-evidence-trigger-activation-evidence.js';

export const CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_ADEQUACY_REVIEW_VERSION =
  'myeonghwa-career-personalization-t8-post-i257-external-evidence-trigger-activation-adequacy-review-v2' as const;

export const CAREER_T8_B33_POSITION_ADMISSION_CANDIDATE = Object.freeze({
  sourceIdentity:
    '陳澤眞, 八字命理900問, 白象文化, 2023-08-01, ISBN 9786263640641, 560 pages',
  sourceLocator:
    'Q151 baseline 正官 semantic; Q154 combination/context warning; Q166 星宮相配; Q167 十神定位; Q168 正官日支 position table',
  exactTenGod: '정관' as const,
  currentT5SemanticKey: 'TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY' as const,
  currentT5Facet: 'formal_responsibility' as const,
  position: 'day_branch' as const,
  qualitativeModificationMode: 'DEEPENS_OR_EMPHASIZES' as const,
  baselineSemanticObservedInSameSource: true as const,
  positionMethodDefinedSeparatelyInSameSource: true as const,
  positionSpecificResponsibilityDeepeningObserved: true as const,
  sameSourceContextLimitObserved: true as const,
  independentPublicationProvenanceAdequate: true as const,
  natalScopeConfirmed: true as const,
  strengthWangshuaiXijiRequiredForThisBoundedPositionRule: false as const,
  strengthWangshuaiXijiImported: false as const,
  numericWeightingIntroduced: false as const,
  leadershipPromotionStatusOccupationOutcomeImported: false as const,
  t5BaseSemanticMutated: false as const,
  boundedCurrentMethodCompatibilityEstablished: true as const,
});

export const CAREER_T8_B33_POSITION_ADEQUACY_CONTROL_IDS = Object.freeze([
  'B33_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B32_TRIGGER_ACTIVATION_BOUNDARY',
  'B32_CHEN_YUAN_1995_TRIGGER_ACTIVATION_IS_PRESERVED_AS_HISTORY_BUT_NOT_USED_TO_FORCE_AUTHORITY_ADMISSION',
  'A_NEW_INDEPENDENT_2023_PUBLISHED_SOURCE_DEFINES_TEN_GOD_POSITION_AS_A_SEPARATE_METHOD_AND_SUPPLIES_BASELINE_POSITION_DELTA_AND_CONTEXT_LIMIT_IN_ONE_SOURCE',
  'Q151_BASELINE_ZHENGGUAN_SEMANTICS_AND_Q168_DAY_BRANCH_ZHENGGUAN_RESPONSIBILITY_DEEPENING_SUPPORT_A_QUALITATIVE_DEEPENS_OR_EMPHASIZES_MODIFIER',
  'Q154_CONTEXT_WARNING_LIMITS_MECHANICAL_GENERALIZATION_WITHOUT_IMPORTING_NUMERIC_OR_STRENGTH_WEIGHTING',
  'THE_BOUNDED_POSITION_CANDIDATE_CONSUMES_ONLY_DAY_BRANCH_POSITION_PLUS_EXACT_ZHENGGUAN_AND_DOES_NOT_IMPORT_WANGSHUAI_YONGSHEN_XIJI',
  'LEADERSHIP_PROMOTION_STATUS_OCCUPATION_AND_OTHER_Q168_OUTCOMES_ARE_EXCLUDED_FROM_THE_CANDIDATE',
  'THE_POSITION_MODIFIER_DOES_NOT_MUTATE_THE_T5_BASE_CLAIM_AND_REQUIRES_A_HIGHER_LAYER_GOVERNED_MODIFIER_AUTHORITY',
  'THE_POSITION_ONLY_AUTHORITY_CANDIDATE_IS_ADMISSION_READY_BUT_THIS_ADEQUACY_GATE_DOES_NOT_ADMIT_IT',
  'THE_COMPOSITE_VISIBILITY_POSITION_PLURALITY_HISTORICAL_GAP_CANNOT_CLOSE_WHILE_VISIBILITY_AND_PLURALITY_REMAIN_UNCONSUMED_AND_I254_CONTROLS_PLURALITY',
  'ALL_SIX_HISTORICAL_T8_SYNTHESIS_AUTHORITY_GAPS_REMAIN_OPEN_PENDING_SEPARATE_ADMISSION_AND_LATER_COMPOSITION_REVIEW',
  'NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_PROMOTION',
] as const);

export interface CareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationAdequacyReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_ADEQUACY_REVIEW_VERSION;
  status:
    | 'RESOLVED_CAREER_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_ADEQUACY_REVIEW'
    | 'UPSTREAM_B32_BOUNDARY_INVALID';
  decision:
    | 'POSITION_TRIGGER_VALID_NEW_2023_SINGLE_SOURCE_ESTABLISHES_BOUNDED_POSITION_DELTA_AND_CURRENT_METHOD_COMPATIBILITY_POSITION_AUTHORITY_CANDIDATE_ADMISSION_READY_COMPOSITE_GAP_REMAINS_OPEN'
    | 'EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_ADEQUACY_NOT_ESTABLISHED';
  upstreamB32EvidenceId: string;
  exactB32BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  positionTriggerActivationAccepted: boolean;
  b32ChenYuanTriggerEvidencePreserved: boolean;
  strongerIndependentPositionSourceObserved: boolean;
  positionCandidate: typeof CAREER_T8_B33_POSITION_ADMISSION_CANDIDATE | null;
  positionSourceIdentityAdequate: boolean;
  positionIndependentPublicationProvenanceAdequate: boolean;
  positionStableLocatorAdequate: boolean;
  positionLocalContextAdequate: boolean;
  positionNatalScopeAdequate: boolean;
  positionExactTenGodSubtypePreserved: boolean;
  positionConditionObserved: boolean;
  positionCurrentT5SemanticCorrespondenceObserved: boolean;
  positionSameSourceLimitsObserved: boolean;
  positionExplicitModificationDeltaEstablished: boolean;
  positionModificationMode: 'DEEPENS_OR_EMPHASIZES' | null;
  positionStrengthXijiDependencyObservedInCandidateRule: false;
  positionBoundedCurrentMethodCompatibilityEstablished: boolean;
  positionStrengthXijiDependencyMayBeImported: false;
  numericWeightingIntroduced: false;
  historicalOutcomeModernizationUsed: false;
  t5BaseSemanticMutated: false;
  positionCoverageClass: 'ADMISSION_READY_POSITION_ONLY_COMPONENT';
  positionAuthorityCandidateAdmissionReady: boolean;
  positionAuthorityAdmittedByThisGate: false;
  compositePositionVisibilityPluralityGapClosureReady: false;
  authorityAdmissionReadyComponentCount: 1 | 0;
  gapClosureReadyCount: 0;
  allSixHistoricalGapsRemainOpen: true;
  unresolvedGapIds: typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS;
  visibilityConsumedByCurrentContinuation: false;
  pluralityConsumedByCurrentContinuation: false;
  pluralityHeldUnderI254: true;
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
    strongerIndependentPositionSourcesReviewed: 1 | 0;
    admissionReadyAuthorityComponents: 1 | 0;
    authorityCandidatesAdmitted: 0;
    authorityGapsClosed: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'POSITION_CURRENT_T5_BRIDGE_BOUNDED_AUTHORITY_ADMISSION_REVIEW'
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

function candidateValid(): boolean {
  const candidate = CAREER_T8_B33_POSITION_ADMISSION_CANDIDATE;
  return (
    candidate.exactTenGod === '정관' &&
    candidate.currentT5SemanticKey === 'TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY' &&
    candidate.currentT5Facet === 'formal_responsibility' &&
    candidate.position === 'day_branch' &&
    candidate.qualitativeModificationMode === 'DEEPENS_OR_EMPHASIZES' &&
    candidate.baselineSemanticObservedInSameSource &&
    candidate.positionMethodDefinedSeparatelyInSameSource &&
    candidate.positionSpecificResponsibilityDeepeningObserved &&
    candidate.sameSourceContextLimitObserved &&
    candidate.independentPublicationProvenanceAdequate &&
    candidate.natalScopeConfirmed &&
    candidate.strengthWangshuaiXijiRequiredForThisBoundedPositionRule === false &&
    candidate.strengthWangshuaiXijiImported === false &&
    candidate.numericWeightingIntroduced === false &&
    candidate.leadershipPromotionStatusOccupationOutcomeImported === false &&
    candidate.t5BaseSemanticMutated === false &&
    candidate.boundedCurrentMethodCompatibilityEstablished
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
  const accepted = exactB32Accepted(b32) && candidateValid();

  return finalized({
    reviewVersion: CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_ADEQUACY_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_ADEQUACY_REVIEW'
      : 'UPSTREAM_B32_BOUNDARY_INVALID',
    decision: accepted
      ? 'POSITION_TRIGGER_VALID_NEW_2023_SINGLE_SOURCE_ESTABLISHES_BOUNDED_POSITION_DELTA_AND_CURRENT_METHOD_COMPATIBILITY_POSITION_AUTHORITY_CANDIDATE_ADMISSION_READY_COMPOSITE_GAP_REMAINS_OPEN'
      : 'EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_ADEQUACY_NOT_ESTABLISHED',
    upstreamB32EvidenceId: b32.evidenceId,
    exactB32BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    positionTriggerActivationAccepted: accepted,
    b32ChenYuanTriggerEvidencePreserved: accepted,
    strongerIndependentPositionSourceObserved: accepted,
    positionCandidate: accepted ? CAREER_T8_B33_POSITION_ADMISSION_CANDIDATE : null,
    positionSourceIdentityAdequate: accepted,
    positionIndependentPublicationProvenanceAdequate: accepted,
    positionStableLocatorAdequate: accepted,
    positionLocalContextAdequate: accepted,
    positionNatalScopeAdequate: accepted,
    positionExactTenGodSubtypePreserved: accepted,
    positionConditionObserved: accepted,
    positionCurrentT5SemanticCorrespondenceObserved: accepted,
    positionSameSourceLimitsObserved: accepted,
    positionExplicitModificationDeltaEstablished: accepted,
    positionModificationMode: accepted ? 'DEEPENS_OR_EMPHASIZES' : null,
    positionStrengthXijiDependencyObservedInCandidateRule: false,
    positionBoundedCurrentMethodCompatibilityEstablished: accepted,
    positionStrengthXijiDependencyMayBeImported: false,
    numericWeightingIntroduced: false,
    historicalOutcomeModernizationUsed: false,
    t5BaseSemanticMutated: false,
    positionCoverageClass: 'ADMISSION_READY_POSITION_ONLY_COMPONENT',
    positionAuthorityCandidateAdmissionReady: accepted,
    positionAuthorityAdmittedByThisGate: false,
    compositePositionVisibilityPluralityGapClosureReady: false,
    authorityAdmissionReadyComponentCount: accepted ? 1 : 0,
    gapClosureReadyCount: 0,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    visibilityConsumedByCurrentContinuation: false,
    pluralityConsumedByCurrentContinuation: false,
    pluralityHeldUnderI254: true,
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
      strongerIndependentPositionSourcesReviewed: accepted ? 1 : 0,
      admissionReadyAuthorityComponents: accepted ? 1 : 0,
      authorityCandidatesAdmitted: 0,
      authorityGapsClosed: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: accepted
      ? 'POSITION_CURRENT_T5_BRIDGE_BOUNDED_AUTHORITY_ADMISSION_REVIEW'
      : 'CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_EVIDENCE',
  });
}
