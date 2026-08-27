import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_ADEQUACY_REVIEW_VERSION,
  CAREER_T8_B33_POSITION_ADMISSION_CANDIDATE,
  CAREER_T8_B33_POSITION_ADEQUACY_CONTROL_IDS,
  type CareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationAdequacyReviewReport,
} from './career-personalization-t8-post-i257-external-evidence-trigger-activation-adequacy-review.js';

export const CAREER_PERSONALIZATION_POSITION_CURRENT_T5_BRIDGE_BOUNDED_AUTHORITY_ADMISSION_REVIEW_VERSION =
  'myeonghwa-career-personalization-position-current-t5-bridge-bounded-authority-admission-review-v1' as const;

export const CAREER_T8_B38_ADMITTED_POSITION_AUTHORITY = Object.freeze({
  authorityClass: 'BOUNDED_POSITION_SEMANTIC_MODIFIER_AUTHORITY' as const,
  sourceIdentity:
    '陳澤眞, 八字命理900問, 白象文化, 2023-08-01, ISBN 9786263640641, 560 pages',
  sourceLocator:
    'Q151 baseline 正官 semantic; Q154 combination/context warning; Q166 星宮相配; Q167 十神定位; Q168 正官日支 position table',
  exactTenGod: '정관' as const,
  currentT5SemanticKey: 'TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY' as const,
  currentT5Facet: 'formal_responsibility' as const,
  condition: 'day_branch' as const,
  qualitativeModificationMode: 'DEEPENS_OR_EMPHASIZES' as const,
  temporalScope: 'natal' as const,
  strengthWangshuaiImported: false as const,
  yongshenImported: false as const,
  xijiImported: false as const,
  numericWeightingIntroduced: false as const,
  leadershipPromotionStatusOccupationOutcomeImported: false as const,
  t5BaseSemanticMutated: false as const,
  generalizedToOtherPillars: false as const,
  generalizedToOtherTenGodSemantics: false as const,
});

export const CAREER_T8_B38_POSITION_AUTHORITY_ADMISSION_CONTROL_IDS = Object.freeze([
  'B38_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B33_ADMISSION_READY_BOUNDARY',
  'THE_ADMITTED_SOURCE_IS_CHEN_ZEZHEN_BAZI_MINGLI_900_WEN_2023_ISBN_9786263640641_WITH_Q151_Q154_Q166_Q167_Q168_LOCATORS',
  'THE_ADMITTED_TEN_GOD_IS_EXACTLY_ZHENGGUAN_AND_THE_EXISTING_T5_SEMANTIC_IS_EXACTLY_TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY',
  'THE_ADMITTED_FACET_IS_EXACTLY_FORMAL_RESPONSIBILITY_AND_THE_POSITION_CONDITION_IS_EXACTLY_DAY_BRANCH',
  'THE_ONLY_ADMITTED_QUALITATIVE_MODIFICATION_IS_DEEPENS_OR_EMPHASIZES',
  'NO_MONTH_YEAR_HOUR_OR_ALL_PILLAR_GENERALIZATION_IS_AUTHORIZED',
  'NO_LEADERSHIP_PROMOTION_STATUS_OCCUPATION_OR_OTHER_SOURCE_OUTCOME_IS_IMPORTED',
  'NO_WANGSHUAI_YONGSHEN_XIJI_OR_NUMERIC_WEIGHTING_IS_IMPORTED',
  'THE_T5_BASE_SEMANTIC_REMAINS_IMMUTABLE_AND_POSITION_IS_A_SEPARATELY_GOVERNED_MODIFIER_COMPONENT',
  'POSITION_COMPONENT_AUTHORITY_ADMISSION_DOES_NOT_CLOSE_THE_COMPOSITE_VISIBILITY_POSITION_PLURALITY_HISTORICAL_GAP',
  'VISIBILITY_REMAINS_UNCONSUMED_AND_PLURALITY_REMAINS_UNCONSUMED_UNDER_I254_HOLD',
  'ALL_SIX_HISTORICAL_T8_SYNTHESIS_AUTHORITY_GAPS_REMAIN_FORMALLY_OPEN',
  'NO_T8_RULE_CLAIM_TYPE_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_PROMOTION_IS_AUTHORIZED',
] as const);

export interface CareerPersonalizationPositionCurrentT5BridgeBoundedAuthorityAdmissionReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_POSITION_CURRENT_T5_BRIDGE_BOUNDED_AUTHORITY_ADMISSION_REVIEW_VERSION;
  status:
    | 'RESOLVED_POSITION_CURRENT_T5_BRIDGE_BOUNDED_AUTHORITY_ADMISSION_REVIEW'
    | 'UPSTREAM_B33_BOUNDARY_INVALID';
  decision:
    | 'BOUNDED_DAY_BRANCH_ZHENGGUAN_FORMAL_RESPONSIBILITY_DEEPENS_OR_EMPHASIZES_COMPONENT_AUTHORITY_ADMITTED_COMPOSITE_GAP_REMAINS_OPEN'
    | 'BOUNDED_POSITION_AUTHORITY_ADMISSION_NOT_ESTABLISHED';
  upstreamB33ReviewId: string;
  exactB33BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  admittedAuthority: typeof CAREER_T8_B38_ADMITTED_POSITION_AUTHORITY | null;
  exactTenGod: '정관' | null;
  currentT5SemanticKey: 'TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY' | null;
  currentT5Facet: 'formal_responsibility' | null;
  positionCondition: 'day_branch' | null;
  modificationMode: 'DEEPENS_OR_EMPHASIZES' | null;
  boundedPositionAuthorityAdmitted: boolean;
  admittedBoundedAuthorityComponentCount: 1 | 0;
  authorityAdmissionState: 'AUTHORITY_ADMITTED_POSITION_ONLY_COMPONENT' | 'NOT_ADMITTED';
  generalizedToOtherPillars: false;
  generalizedToOtherTenGodSemantics: false;
  strengthWangshuaiImported: false;
  yongshenImported: false;
  xijiImported: false;
  numericWeightingIntroduced: false;
  leadershipPromotionStatusOccupationOutcomeImported: false;
  t5BaseSemanticMutated: false;
  compositePositionVisibilityPluralityGapClosureReady: false;
  visibilityConsumedByCurrentContinuation: false;
  pluralityConsumedByCurrentContinuation: false;
  pluralityHeldUnderI254: true;
  allSixHistoricalGapsRemainOpen: true;
  unresolvedGapIds: typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS;
  authorityGapClosedByThisGate: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  productionImpact: 'NONE';
  controlIds: readonly (typeof CAREER_T8_B38_POSITION_AUTHORITY_ADMISSION_CONTROL_IDS)[number][];
  controlCount: 13 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    boundedAuthorityComponentsAdmitted: 1 | 0;
    historicalAuthorityGapsClosed: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'CAREER_PERSONALIZATION_T8_RESIDUAL_AUTHORITY_FRONTIER_RECONCILIATION'
    | 'POSITION_CURRENT_T5_BRIDGE_BOUNDED_AUTHORITY_ADMISSION_REVIEW';
}

function contentAddressedB33IdentityValid(
  b33: CareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationAdequacyReviewReport,
): boolean {
  const { reviewId, ...material } = b33;
  return reviewId ===
    `career_t8_post_i257_external_evidence_trigger_activation_adequacy_${deterministicContentHash(material).slice(0, 24)}`;
}

function exactB33Accepted(
  b33: CareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationAdequacyReviewReport,
): boolean {
  return (
    contentAddressedB33IdentityValid(b33) &&
    b33.reviewVersion ===
      CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_ADEQUACY_REVIEW_VERSION &&
    b33.status === 'RESOLVED_CAREER_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_ADEQUACY_REVIEW' &&
    b33.decision ===
      'POSITION_TRIGGER_VALID_NEW_2023_SINGLE_SOURCE_ESTABLISHES_BOUNDED_POSITION_DELTA_AND_CURRENT_METHOD_COMPATIBILITY_POSITION_AUTHORITY_CANDIDATE_ADMISSION_READY_COMPOSITE_GAP_REMAINS_OPEN' &&
    b33.exactB32BoundaryAccepted &&
    b33.domain === 'career' &&
    b33.temporalScope === 'natal' &&
    b33.statusClass === 'research' &&
    b33.positionTriggerActivationAccepted &&
    b33.strongerIndependentPositionSourceObserved &&
    b33.positionCandidate !== null &&
    deterministicContentHash(b33.positionCandidate) === deterministicContentHash(CAREER_T8_B33_POSITION_ADMISSION_CANDIDATE) &&
    b33.positionSourceIdentityAdequate &&
    b33.positionIndependentPublicationProvenanceAdequate &&
    b33.positionStableLocatorAdequate &&
    b33.positionLocalContextAdequate &&
    b33.positionNatalScopeAdequate &&
    b33.positionExactTenGodSubtypePreserved &&
    b33.positionConditionObserved &&
    b33.positionCurrentT5SemanticCorrespondenceObserved &&
    b33.positionSameSourceLimitsObserved &&
    b33.positionExplicitModificationDeltaEstablished &&
    b33.positionModificationMode === 'DEEPENS_OR_EMPHASIZES' &&
    b33.positionBoundedCurrentMethodCompatibilityEstablished &&
    b33.positionCoverageClass === 'ADMISSION_READY_POSITION_ONLY_COMPONENT' &&
    b33.positionAuthorityCandidateAdmissionReady &&
    b33.positionAuthorityAdmittedByThisGate === false &&
    b33.authorityAdmissionReadyComponentCount === 1 &&
    b33.compositePositionVisibilityPluralityGapClosureReady === false &&
    b33.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b33.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b33.visibilityConsumedByCurrentContinuation === false &&
    b33.pluralityConsumedByCurrentContinuation === false &&
    b33.pluralityHeldUnderI254 &&
    b33.authorityAdmittedByThisGate === false &&
    b33.authorityGapClosedByThisGate === false &&
    b33.numericWeightingIntroduced === false &&
    b33.historicalOutcomeModernizationUsed === false &&
    b33.t5BaseSemanticMutated === false &&
    b33.controlCount === 12 &&
    b33.controlsFrozen &&
    deterministicContentHash(b33.controlIds) === deterministicContentHash(CAREER_T8_B33_POSITION_ADEQUACY_CONTROL_IDS) &&
    b33.t8RuleAuthoringAuthorized === false &&
    b33.t8ClaimTypeCreationAuthorized === false &&
    b33.personalizedT8PackCreationAuthorized === false &&
    b33.consumerNarrativeAuthorized === false &&
    b33.previewDefaultSwitchAuthorized === false &&
    b33.productionPromotionAuthorized === false &&
    b33.productionImpact === 'NONE' &&
    b33.recommendedNextGate === 'POSITION_CURRENT_T5_BRIDGE_BOUNDED_AUTHORITY_ADMISSION_REVIEW'
  );
}

function admittedAuthorityValid(): boolean {
  const authority = CAREER_T8_B38_ADMITTED_POSITION_AUTHORITY;
  return (
    authority.exactTenGod === '정관' &&
    authority.currentT5SemanticKey === 'TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY' &&
    authority.currentT5Facet === 'formal_responsibility' &&
    authority.condition === 'day_branch' &&
    authority.qualitativeModificationMode === 'DEEPENS_OR_EMPHASIZES' &&
    authority.temporalScope === 'natal' &&
    authority.strengthWangshuaiImported === false &&
    authority.yongshenImported === false &&
    authority.xijiImported === false &&
    authority.numericWeightingIntroduced === false &&
    authority.leadershipPromotionStatusOccupationOutcomeImported === false &&
    authority.t5BaseSemanticMutated === false &&
    authority.generalizedToOtherPillars === false &&
    authority.generalizedToOtherTenGodSemantics === false
  );
}

function finalized(
  material: Omit<CareerPersonalizationPositionCurrentT5BridgeBoundedAuthorityAdmissionReviewReport, 'reviewId'>,
): CareerPersonalizationPositionCurrentT5BridgeBoundedAuthorityAdmissionReviewReport {
  return {
    reviewId: `career_personalization_position_current_t5_bridge_bounded_authority_admission_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationPositionCurrentT5BridgeBoundedAuthorityAdmissionReview(
  b33: CareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationAdequacyReviewReport,
): CareerPersonalizationPositionCurrentT5BridgeBoundedAuthorityAdmissionReviewReport {
  const accepted = exactB33Accepted(b33) && admittedAuthorityValid();

  return finalized({
    reviewVersion: CAREER_PERSONALIZATION_POSITION_CURRENT_T5_BRIDGE_BOUNDED_AUTHORITY_ADMISSION_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_POSITION_CURRENT_T5_BRIDGE_BOUNDED_AUTHORITY_ADMISSION_REVIEW'
      : 'UPSTREAM_B33_BOUNDARY_INVALID',
    decision: accepted
      ? 'BOUNDED_DAY_BRANCH_ZHENGGUAN_FORMAL_RESPONSIBILITY_DEEPENS_OR_EMPHASIZES_COMPONENT_AUTHORITY_ADMITTED_COMPOSITE_GAP_REMAINS_OPEN'
      : 'BOUNDED_POSITION_AUTHORITY_ADMISSION_NOT_ESTABLISHED',
    upstreamB33ReviewId: b33.reviewId,
    exactB33BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    admittedAuthority: accepted ? CAREER_T8_B38_ADMITTED_POSITION_AUTHORITY : null,
    exactTenGod: accepted ? '정관' : null,
    currentT5SemanticKey: accepted ? 'TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY' : null,
    currentT5Facet: accepted ? 'formal_responsibility' : null,
    positionCondition: accepted ? 'day_branch' : null,
    modificationMode: accepted ? 'DEEPENS_OR_EMPHASIZES' : null,
    boundedPositionAuthorityAdmitted: accepted,
    admittedBoundedAuthorityComponentCount: accepted ? 1 : 0,
    authorityAdmissionState: accepted ? 'AUTHORITY_ADMITTED_POSITION_ONLY_COMPONENT' : 'NOT_ADMITTED',
    generalizedToOtherPillars: false,
    generalizedToOtherTenGodSemantics: false,
    strengthWangshuaiImported: false,
    yongshenImported: false,
    xijiImported: false,
    numericWeightingIntroduced: false,
    leadershipPromotionStatusOccupationOutcomeImported: false,
    t5BaseSemanticMutated: false,
    compositePositionVisibilityPluralityGapClosureReady: false,
    visibilityConsumedByCurrentContinuation: false,
    pluralityConsumedByCurrentContinuation: false,
    pluralityHeldUnderI254: true,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityGapClosedByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: accepted ? CAREER_T8_B38_POSITION_AUTHORITY_ADMISSION_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 13 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      boundedAuthorityComponentsAdmitted: accepted ? 1 : 0,
      historicalAuthorityGapsClosed: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: accepted
      ? 'CAREER_PERSONALIZATION_T8_RESIDUAL_AUTHORITY_FRONTIER_RECONCILIATION'
      : 'POSITION_CURRENT_T5_BRIDGE_BOUNDED_AUTHORITY_ADMISSION_REVIEW',
  });
}
