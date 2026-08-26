import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_ADEQUACY_REVIEW_VERSION,
  CAREER_T8_B33_POSITION_ADMISSION_CANDIDATE,
  CAREER_T8_B33_POSITION_ADEQUACY_CONTROL_IDS,
  type CareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationAdequacyReviewReport,
} from './career-personalization-t8-post-i257-external-evidence-trigger-activation-adequacy-review.js';

export const CAREER_PERSONALIZATION_T8_BRANCH_CLASH_PUBLISHED_TRIGGER_ACTIVATION_EVIDENCE_VERSION =
  'myeonghwa-career-personalization-t8-branch-clash-published-trigger-activation-evidence-v1' as const;

export const CAREER_T8_B34_BRANCH_CLASH_CANDIDATE = Object.freeze({
  sourceIdentity:
    '李修梵整理, 十神闡微, 香港星易圖書有限公司, 2015 first edition, 108 pages, ISBN 9789881412041; same-work manuscript/full-text lineage commonly attributed to 楊逸雲',
  publishedEditionBodyDirectlyInspected: false as const,
  sameWorkFullTextLineageInspected: true as const,
  exactTenGod: '정관' as const,
  currentT5SemanticKey: 'TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY' as const,
  currentT5Facet: 'formal_responsibility' as const,
  baselineSemanticEvidence: Object.freeze([
    '正官精神性含義 includes 自制力 and 責任感.',
    '正官非精神性/closely-related meanings include 工作任務.',
  ] as const),
  interactionEvidence: Object.freeze([
    '十神與日主親密度 section states 相刑相沖的較疏遠.',
    'The same section states more intimate Ten-God relations manifest their semantic traits more clearly, while lower intimacy makes those traits less evident rather than necessarily erased.',
  ] as const),
  qualitativeModificationMode: 'ATTENUATES_OR_REDUCES_EXPRESSION' as const,
  natalScopeConfirmed: true as const,
  singleWorkSemanticBridgeObserved: true as const,
  explicitQualitativeModeObserved: true as const,
  sameWorkLimitObserved: true as const,
  independentPublishedEditionProvenanceAdequateForTrigger: true as const,
  exactPublishedEditionPassageBindingEstablished: false as const,
  distanceStrengthWangshuaiDependencyPresentInMethodSection: true as const,
  boundedCurrentMethodCompatibilityEstablished: false as const,
  numericWeightingIntroduced: false as const,
  clashDeletesBaseSemantic: false as const,
  authorityAdmissionReady: false as const,
});

export const CAREER_T8_B34_BRANCH_CLASH_CONTROL_IDS = Object.freeze([
  'B34_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B33_ADEQUACY_BOUNDARY',
  'B33_POSITION_ADMISSION_READY_COMPONENT_IS_PRESERVED_AND_NOT_MUTATED_BY_BRANCH_RESEARCH',
  'TEN_SHEN_CHAN_WEI_2015_PUBLISHED_EDITION_PROVENANCE_IS_ESTABLISHED_SEPARATELY_FROM_WEB_FULL_TEXT_SURFACES',
  'SAME_WORK_FULL_TEXT_BINDS_ZHENGGUAN_RESPONSIBILITY_SELF_CONTROL_AND_WORK_TASK_SEMANTICS_TO_THE_GOVERNED_FORMAL_RESPONSIBILITY_FACET',
  'SAME_WORK_INTIMACY_METHOD_STATES_XING_CHONG_IS_MORE_DISTANT_AND_LOWER_INTIMACY_MAKES_TEN_GOD_TRAITS_LESS_EVIDENT',
  'THE_BRANCH_MODIFIER_IS_QUALITATIVE_ATTENUATES_OR_REDUCES_EXPRESSION_AND_NEVER_DELETES_THE_T5_BASE_SEMANTIC',
  'THE_BRANCH_TRIGGER_IS_REOPENED_AT_EVIDENCE_LEVEL_BUT_EXACT_2015_EDITION_PASSAGE_BINDING_REMAINS_UNRESOLVED',
  'DISTANCE_STRENGTH_WANGSHUAI_DEPENDENCIES_IN_THE_METHOD_SECTION_PREVENT_CURRENT_METHOD_COMPATIBILITY_FROM_BEING_ASSUMED',
  'NO_NUMERIC_WEIGHTING_RELATIVE_FORCE_SCORE_OCCUPATION_PROMOTION_OR_HISTORICAL_RANK_OUTCOME_IS_IMPORTED',
  'BRANCH_AUTHORITY_ADMISSION_AND_GAP_CLOSURE_REMAIN_NOT_READY_PENDING_EXACT_EDITION_AND_COMPATIBILITY_REVIEW',
  'ALL_SIX_HISTORICAL_T8_SYNTHESIS_AUTHORITY_GAPS_REMAIN_FORMALLY_OPEN',
  'NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_PROMOTION',
] as const);

export interface CareerPersonalizationT8BranchClashPublishedTriggerActivationEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof CAREER_PERSONALIZATION_T8_BRANCH_CLASH_PUBLISHED_TRIGGER_ACTIVATION_EVIDENCE_VERSION;
  status:
    | 'RESOLVED_CAREER_T8_BRANCH_CLASH_PUBLISHED_TRIGGER_ACTIVATION_EVIDENCE'
    | 'UPSTREAM_B33_BOUNDARY_INVALID';
  decision:
    | 'BRANCH_CLASH_PUBLISHED_SINGLE_WORK_CURRENT_T5_QUALITATIVE_MODIFIER_TRIGGER_REOPENED_EXACT_EDITION_AND_CURRENT_METHOD_COMPATIBILITY_REMAIN_PENDING_NO_AUTHORITY_ADMISSION'
    | 'BRANCH_CLASH_PUBLISHED_TRIGGER_ACTIVATION_NOT_ESTABLISHED';
  upstreamB33ReviewId: string;
  exactB33BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  positionAdmissionReadyComponentPreserved: boolean;
  branchCandidate: typeof CAREER_T8_B34_BRANCH_CLASH_CANDIDATE | null;
  branchPublishedProvenanceAdequateForTrigger: boolean;
  branchSameWorkFullTextLineageInspected: boolean;
  branchExactTenGodSubtypePreserved: boolean;
  branchCurrentT5SemanticCorrespondenceObserved: boolean;
  branchClashParticipantBindingObserved: boolean;
  branchQualitativeModificationModeEstablished: boolean;
  branchModificationMode: 'ATTENUATES_OR_REDUCES_EXPRESSION' | null;
  branchSameWorkLimitObserved: boolean;
  branchTriggerReopened: boolean;
  branchExactPublishedEditionPassageBindingEstablished: false;
  branchCurrentMethodCompatibilityEstablished: false;
  branchAuthorityAdmissionReady: false;
  branchGapClosureReady: false;
  authorityAdmissionReadyComponentCount: 1 | 0;
  gapClosureReadyCount: 0;
  allSixHistoricalGapsRemainOpen: true;
  unresolvedGapIds: typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS;
  authorityAdmittedByThisGate: false;
  authorityGapClosedByThisGate: false;
  t8RuleAuthoringAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  productionPromotionAuthorized: false;
  productionImpact: 'NONE';
  controlIds: readonly (typeof CAREER_T8_B34_BRANCH_CLASH_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  recommendedNextGate:
    | 'BRANCH_CLASH_CURRENT_T5_PUBLISHED_EVIDENCE_ADEQUACY_AND_COMPATIBILITY_REVIEW'
    | 'CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_ADEQUACY_REVIEW';
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
    b33.reviewVersion === CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_ADEQUACY_REVIEW_VERSION &&
    b33.status === 'RESOLVED_CAREER_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_ADEQUACY_REVIEW' &&
    b33.decision ===
      'POSITION_TRIGGER_VALID_NEW_2023_SINGLE_SOURCE_ESTABLISHES_BOUNDED_POSITION_DELTA_AND_CURRENT_METHOD_COMPATIBILITY_POSITION_AUTHORITY_CANDIDATE_ADMISSION_READY_COMPOSITE_GAP_REMAINS_OPEN' &&
    b33.exactB32BoundaryAccepted &&
    b33.domain === 'career' &&
    b33.temporalScope === 'natal' &&
    b33.positionAuthorityCandidateAdmissionReady &&
    deterministicContentHash(b33.positionCandidate) === deterministicContentHash(CAREER_T8_B33_POSITION_ADMISSION_CANDIDATE) &&
    b33.positionBoundedCurrentMethodCompatibilityEstablished &&
    b33.positionAuthorityAdmittedByThisGate === false &&
    b33.compositePositionVisibilityPluralityGapClosureReady === false &&
    b33.authorityAdmissionReadyComponentCount === 1 &&
    b33.gapClosureReadyCount === 0 &&
    b33.allSixHistoricalGapsRemainOpen &&
    b33.controlCount === 12 &&
    b33.controlsFrozen &&
    deterministicContentHash(b33.controlIds) === deterministicContentHash(CAREER_T8_B33_POSITION_ADEQUACY_CONTROL_IDS) &&
    b33.authorityAdmittedByThisGate === false &&
    b33.authorityGapClosedByThisGate === false &&
    b33.productionImpact === 'NONE' &&
    b33.recommendedNextGate === 'POSITION_CURRENT_T5_BRIDGE_BOUNDED_AUTHORITY_ADMISSION_REVIEW'
  );
}

function branchCandidateValid(): boolean {
  const c = CAREER_T8_B34_BRANCH_CLASH_CANDIDATE;
  return (
    c.exactTenGod === '정관' &&
    c.currentT5SemanticKey === 'TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY' &&
    c.currentT5Facet === 'formal_responsibility' &&
    c.qualitativeModificationMode === 'ATTENUATES_OR_REDUCES_EXPRESSION' &&
    c.natalScopeConfirmed &&
    c.singleWorkSemanticBridgeObserved &&
    c.explicitQualitativeModeObserved &&
    c.sameWorkLimitObserved &&
    c.independentPublishedEditionProvenanceAdequateForTrigger &&
    c.sameWorkFullTextLineageInspected &&
    c.exactPublishedEditionPassageBindingEstablished === false &&
    c.distanceStrengthWangshuaiDependencyPresentInMethodSection &&
    c.boundedCurrentMethodCompatibilityEstablished === false &&
    c.numericWeightingIntroduced === false &&
    c.clashDeletesBaseSemantic === false &&
    c.authorityAdmissionReady === false
  );
}

function finalized(
  material: Omit<CareerPersonalizationT8BranchClashPublishedTriggerActivationEvidenceReport, 'evidenceId'>,
): CareerPersonalizationT8BranchClashPublishedTriggerActivationEvidenceReport {
  return {
    evidenceId: `career_t8_branch_clash_published_trigger_activation_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8BranchClashPublishedTriggerActivationEvidence(
  b33: CareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationAdequacyReviewReport,
): CareerPersonalizationT8BranchClashPublishedTriggerActivationEvidenceReport {
  const accepted = exactB33Accepted(b33) && branchCandidateValid();

  return finalized({
    evidenceVersion: CAREER_PERSONALIZATION_T8_BRANCH_CLASH_PUBLISHED_TRIGGER_ACTIVATION_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_T8_BRANCH_CLASH_PUBLISHED_TRIGGER_ACTIVATION_EVIDENCE'
      : 'UPSTREAM_B33_BOUNDARY_INVALID',
    decision: accepted
      ? 'BRANCH_CLASH_PUBLISHED_SINGLE_WORK_CURRENT_T5_QUALITATIVE_MODIFIER_TRIGGER_REOPENED_EXACT_EDITION_AND_CURRENT_METHOD_COMPATIBILITY_REMAIN_PENDING_NO_AUTHORITY_ADMISSION'
      : 'BRANCH_CLASH_PUBLISHED_TRIGGER_ACTIVATION_NOT_ESTABLISHED',
    upstreamB33ReviewId: b33.reviewId,
    exactB33BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    positionAdmissionReadyComponentPreserved: accepted,
    branchCandidate: accepted ? CAREER_T8_B34_BRANCH_CLASH_CANDIDATE : null,
    branchPublishedProvenanceAdequateForTrigger: accepted,
    branchSameWorkFullTextLineageInspected: accepted,
    branchExactTenGodSubtypePreserved: accepted,
    branchCurrentT5SemanticCorrespondenceObserved: accepted,
    branchClashParticipantBindingObserved: accepted,
    branchQualitativeModificationModeEstablished: accepted,
    branchModificationMode: accepted ? 'ATTENUATES_OR_REDUCES_EXPRESSION' : null,
    branchSameWorkLimitObserved: accepted,
    branchTriggerReopened: accepted,
    branchExactPublishedEditionPassageBindingEstablished: false,
    branchCurrentMethodCompatibilityEstablished: false,
    branchAuthorityAdmissionReady: false,
    branchGapClosureReady: false,
    authorityAdmissionReadyComponentCount: accepted ? 1 : 0,
    gapClosureReadyCount: 0,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: accepted ? CAREER_T8_B34_BRANCH_CLASH_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    recommendedNextGate: accepted
      ? 'BRANCH_CLASH_CURRENT_T5_PUBLISHED_EVIDENCE_ADEQUACY_AND_COMPATIBILITY_REVIEW'
      : 'CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_ADEQUACY_REVIEW',
  });
}
