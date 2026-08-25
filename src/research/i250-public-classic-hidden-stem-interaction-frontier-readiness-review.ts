import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I249MultiTrackTerminalEvidenceAccessBoundaryReconciliationActiveFrontierSelectionReviewReport } from './i249-multi-track-terminal-evidence-access-boundary-reconciliation-active-frontier-selection-review.js';

export const I250_PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_FRONTIER_READINESS_REVIEW_VERSION =
  'myeonghwa-public-classic-hidden-stem-interaction-frontier-readiness-review-v1' as const;

export const I250_SOURCE_TARGET_IDS = Object.freeze([
  'WEI_QIANLI_QIANLI_MINGGAO_1935_NLC',
  'SHENFENG_TONGKAO_1926_NLC',
  'JINGXUAN_MINGLI_YUEYAN_1935_NLC',
  'ZIPING_ZHENQUAN_1926_NLC',
] as const);

export const I250_RESEARCH_QUESTION_IDS = Object.freeze([
  'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION',
  'VISIBLE_HIDDEN_MANIFESTATION_DISTINCTION',
  'POSITION_OR_SEPARATION_QUALIFIER',
  'SEASON_OR_PLURALITY_QUALIFIER',
  'REMOTE_HIDDEN_RELATION_CHAIN_RESTRICTION',
  'EXTERNAL_STEM_TO_HIDDEN_STEM_EFFECT_BOUNDARY',
] as const);

export const I250_FRONTIER_CONTROL_IDS = Object.freeze([
  'EXACT_I249_TERMINAL_BOUNDARY_REQUIRED',
  'FRONTIER_MUST_BE_GENUINELY_NEW_AND_NON_EQUIVALENT',
  'NLC_CLASSIC_FRONTIER_MUST_NOT_REOPEN_I232_SOHU_LINEAGE',
  'NLC_CLASSIC_FRONTIER_MUST_NOT_MUTATE_I248_YUDING_TRACK',
  'NLC_CLASSIC_FRONTIER_MUST_NOT_MUTATE_I211_QU_WEI_TRACK',
  'PUBLIC_SCAN_IDENTITY_AND_RULE_TEXT_BINDING_MUST_BE_RECORDED_SEPARATELY',
  'SAME_WORK_TRANSCRIPTION_AND_SCAN_MUST_NOT_COUNT_AS_TWO_INDEPENDENT_AUTHORITIES',
  'DIRECT_RULE_TEXT_REQUIRED_FOR_POSITIVE_RULE_COVERAGE',
  'BIBLIOGRAPHIC_IDENTITY_ALONE_MUST_NOT_CREATE_RULE_AUTHORITY',
  'NO_UNIVERSAL_HIDDEN_STEM_INTERACTION_FROM_ONE_RELATION_CLASS',
  'NO_NUMERIC_WEIGHT_FROM_QUALITATIVE_FORCE_LANGUAGE',
  'NO_DAMAGE_OR_WINNER_VERDICT_WITHOUT_DIRECT_SCOPE_AUTHORITY',
  'NO_CAREER_T6_OR_T8_SEMANTIC_RULE_CREATED_BY_READINESS',
  'NO_PRODUCTION_PROMOTION',
] as const);

export interface I250PublicClassicHiddenStemInteractionFrontierReadinessReviewReport {
  reviewId: string;
  reviewVersion: typeof I250_PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_FRONTIER_READINESS_REVIEW_VERSION;
  status:
    | 'RESOLVED_PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_FRONTIER_READINESS_REVIEW'
    | 'I249_TERMINAL_BOUNDARY_INVALID';
  decision:
    | 'NEW_NON_EQUIVALENT_PUBLIC_CLASSIC_FRONTIER_READY_FOUR_NLC_SOURCE_TARGETS_SIX_RESEARCH_QUESTIONS_FROZEN_NO_EXISTING_HOLD_REOPENED_NO_RULE_AUTHORITY_PROMOTED'
    | 'PUBLIC_CLASSIC_FRONTIER_NOT_READY';
  upstreamI249ReviewId: string;
  exactI249BoundaryAccepted: boolean;
  frontierId: 'PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_NLC_FRONTIER' | null;
  frontierClass: 'GENUINELY_NEW_NON_EQUIVALENT_METHODOLOGICAL_FRONTIER' | 'NOT_ESTABLISHED';
  sourceTargetIds: readonly (typeof I250_SOURCE_TARGET_IDS)[number][];
  sourceTargetCount: 4 | 0;
  researchQuestionIds: readonly (typeof I250_RESEARCH_QUESTION_IDS)[number][];
  researchQuestionCount: 6 | 0;
  sourceAcquisitionMayProceed: boolean;
  sourceAcquisitionExecutedByThisGate: false;
  i232SohuTrackReopened: false;
  i232ProvenanceGapClosed: false;
  i248YudingTrackMutated: false;
  i211QuWeiTrackMutated: false;
  existingCandidateSetMutated: false;
  sameWorkScanAndTranscriptionMayCountAsIndependentAuthorities: false;
  bibliographicIdentityMayCreateRuleAuthority: false;
  universalHiddenStemInteractionAuthorized: false;
  numericWeightingAuthorized: false;
  damageEvaluationAuthorized: false;
  careerT6RuleAuthoringAuthorized: false;
  careerT8SynthesisAuthorized: false;
  productionAuthorityImpact: 'NONE';
  frontierControlIds: readonly (typeof I250_FRONTIER_CONTROL_IDS)[number][];
  frontierControlCount: 14 | 0;
  frontierControlsFrozen: boolean;
  recommendedNextGate:
    | 'PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_SOURCE_EVIDENCE_ACQUISITION'
    | 'PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_FRONTIER_READINESS_REVIEW';
}

function exactI249Accepted(
  i249: I249MultiTrackTerminalEvidenceAccessBoundaryReconciliationActiveFrontierSelectionReviewReport,
): boolean {
  return (
    i249.status ===
      'RESOLVED_MULTI_TRACK_TERMINAL_EVIDENCE_ACCESS_BOUNDARY_RECONCILIATION_ACTIVE_FRONTIER_SELECTION_REVIEW' &&
    i249.decision ===
      'NO_CURRENTLY_ACTIONABLE_EQUIVALENT_PUBLIC_OR_REPOSITORY_ONLY_AUTHORITY_REMEDIATION_FRONTIER_FOUR_TRACKS_TRIGGER_GATED_ONE_SUSPENDED_THREE_HOLD_NO_EXHAUSTION_NO_NEGATIVE_FINDING_NO_AUTHORITY_PROMOTION' &&
    i249.allTerminalTrackBoundariesAccepted &&
    i249.actionableEquivalentPublicRemediationFrontierCount === 0 &&
    i249.actionableRepositoryOnlyAuthorityFrontierCount === 0 &&
    i249.authorityProgressViaEquivalentRepeatAvailable === false &&
    i249.authorityProgressViaRepositoryOnlyRepackagingAvailable === false &&
    i249.crossTrackEvidencePoolingAuthorized === false &&
    i249.crossTrackAuthorityLaunderingAuthorized === false &&
    i249.newStageCreationRequiresMateriallyNewEvidenceOrGenuinelyNewNonEquivalentMethodologicalFrontier &&
    i249.genuinelyNewNonEquivalentMethodologicalFrontierMayProceedUnderSeparateGate &&
    i249.hiddenStemI232HoldPreserved &&
    i249.hiddenStemTrackReopenedByThisGate === false &&
    i249.yudingSuijinluI248HoldPreserved &&
    i249.quWei2001HoldPreserved &&
    i249.candidateSetMutatedByThisGate === false &&
    i249.authorityAcquiredByThisGate === false &&
    i249.productionPolicyExecutionAuthorized === false
  );
}

function finalized(
  material: Omit<I250PublicClassicHiddenStemInteractionFrontierReadinessReviewReport, 'reviewId'>,
): I250PublicClassicHiddenStemInteractionFrontierReadinessReviewReport {
  return {
    reviewId: `i250_public_classic_frontier_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI250PublicClassicHiddenStemInteractionFrontierReadinessReview(
  i249: I249MultiTrackTerminalEvidenceAccessBoundaryReconciliationActiveFrontierSelectionReviewReport,
): I250PublicClassicHiddenStemInteractionFrontierReadinessReviewReport {
  const accepted = exactI249Accepted(i249);
  return finalized({
    reviewVersion: I250_PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_FRONTIER_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_FRONTIER_READINESS_REVIEW'
      : 'I249_TERMINAL_BOUNDARY_INVALID',
    decision: accepted
      ? 'NEW_NON_EQUIVALENT_PUBLIC_CLASSIC_FRONTIER_READY_FOUR_NLC_SOURCE_TARGETS_SIX_RESEARCH_QUESTIONS_FROZEN_NO_EXISTING_HOLD_REOPENED_NO_RULE_AUTHORITY_PROMOTED'
      : 'PUBLIC_CLASSIC_FRONTIER_NOT_READY',
    upstreamI249ReviewId: i249.reviewId,
    exactI249BoundaryAccepted: accepted,
    frontierId: accepted ? 'PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_NLC_FRONTIER' : null,
    frontierClass: accepted
      ? 'GENUINELY_NEW_NON_EQUIVALENT_METHODOLOGICAL_FRONTIER'
      : 'NOT_ESTABLISHED',
    sourceTargetIds: accepted ? I250_SOURCE_TARGET_IDS : Object.freeze([]),
    sourceTargetCount: accepted ? 4 : 0,
    researchQuestionIds: accepted ? I250_RESEARCH_QUESTION_IDS : Object.freeze([]),
    researchQuestionCount: accepted ? 6 : 0,
    sourceAcquisitionMayProceed: accepted,
    sourceAcquisitionExecutedByThisGate: false,
    i232SohuTrackReopened: false,
    i232ProvenanceGapClosed: false,
    i248YudingTrackMutated: false,
    i211QuWeiTrackMutated: false,
    existingCandidateSetMutated: false,
    sameWorkScanAndTranscriptionMayCountAsIndependentAuthorities: false,
    bibliographicIdentityMayCreateRuleAuthority: false,
    universalHiddenStemInteractionAuthorized: false,
    numericWeightingAuthorized: false,
    damageEvaluationAuthorized: false,
    careerT6RuleAuthoringAuthorized: false,
    careerT8SynthesisAuthorized: false,
    productionAuthorityImpact: 'NONE',
    frontierControlIds: accepted ? I250_FRONTIER_CONTROL_IDS : Object.freeze([]),
    frontierControlCount: accepted ? 14 : 0,
    frontierControlsFrozen: accepted,
    recommendedNextGate: accepted
      ? 'PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_SOURCE_EVIDENCE_ACQUISITION'
      : 'PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_FRONTIER_READINESS_REVIEW',
  });
}
