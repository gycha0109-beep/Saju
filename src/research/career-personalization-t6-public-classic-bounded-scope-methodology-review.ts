import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE,
  CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE_VERSION,
  careerT6Decision,
} from './career-personalization-t6-methodology-gate.js';
import type { I252PublicClassicHiddenStemInteractionEvidenceAdequacyMethodologyReviewReport } from './i252-public-classic-hidden-stem-interaction-evidence-adequacy-methodology-review.js';

export const CAREER_PERSONALIZATION_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW_VERSION =
  'myeonghwa-career-personalization-t6-public-classic-bounded-scope-methodology-review-v1' as const;

export const CAREER_T6_PUBLIC_CLASSIC_ALLOWED_QUALIFIER_IDS = Object.freeze([
  'VISIBLE_HIDDEN_DISTINCTION_CONTEXT',
  'POSITION_OR_SEPARATION_QUALITATIVE_CONTEXT',
  'SEASON_QUALITATIVE_CONTEXT',
  'PLURALITY_QUALITATIVE_CONTEXT',
] as const);

export const CAREER_T6_PUBLIC_CLASSIC_CONTROL_IDS = Object.freeze([
  'P3_GENERAL_HIDDEN_STEM_BLOCK_REMAINS_IN_FORCE_OUTSIDE_SCOPED_EXCEPTION',
  'EXACT_I252_BOUNDED_PUBLIC_CLASSIC_ADEQUACY_REQUIRED',
  'STRUCTURAL_TRIGGER_MUST_BE_AN_EXPLICIT_T0_BRANCH_CLASH_CANDIDATE',
  'HIDDEN_STEM_INTERACTION_MAY_BE_EMITTED_ONLY_FOR_BRANCHES_PARTICIPATING_IN_THAT_CLASH',
  'QUALIFIERS_MAY_DESCRIBE_CONTEXT_BUT_MUST_NOT_CREATE_ELIGIBILITY_BY_THEMSELVES',
  'VISIBLE_HIDDEN_DISTINCTION_MUST_NOT_BECOME_ACTIVE_INACTIVE_BINARY_STATE',
  'POSITION_OR_SEPARATION_MUST_NOT_BECOME_NUMERIC_WEIGHT_OR_ZERO_INTERACTION_THRESHOLD',
  'SEASON_MUST_NOT_BECOME_NUMERIC_WEIGHT_OR_AUTOMATIC_WINNER',
  'PLURALITY_MUST_NOT_BECOME_NUMERIC_WEIGHT_OR_AUTOMATIC_WINNER',
  'NO_HIDDEN_STEM_INTERACTION_OUTSIDE_EXPLICIT_BRANCH_CLASH',
  'NO_DAMAGE_MAGNITUDE_DESTRUCTION_OR_POST_RELATION_SETTLEMENT',
  'NO_CROSS_RELATION_PRECEDENCE_OR_MULTI_TOUCH_AGGREGATION',
  'NO_CAREER_OUTCOME_SEMANTIC_FROM_T6_BY_THIS_GATE',
  'NO_T8_SYNTHESIS_BY_THIS_GATE',
  'NO_CONSUMER_NARRATIVE_BY_THIS_GATE',
  'NO_PRODUCTION_PROMOTION',
  'I232_SOHU_TRACK_REMAINS_SEPARATE_AND_UNRESOLVED',
  'I248_YUDING_AND_I211_QU_WEI_TRACKS_REMAIN_UNMUTATED',
] as const);

export interface CareerT6PublicClassicBoundedScopeMethodologyReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW_VERSION;
  status:
    | 'RESOLVED_CAREER_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW'
    | 'UPSTREAM_BOUNDARY_INVALID';
  decision:
    | 'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORIZED_FOR_RESEARCH_T6_RULE_AUTHORING_ONLY_QUALIFIERS_CONTEXT_ONLY_GENERAL_P3_BLOCK_PRESERVED_NO_DAMAGE_WINNER_T8_NARRATIVE_OR_PRODUCTION'
    | 'CAREER_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_NOT_ESTABLISHED';
  upstreamP3Version: typeof CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE_VERSION;
  upstreamI252ReviewId: string;
  exactP3BoundaryAccepted: boolean;
  exactI252BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  reviewerStatus: 'unreviewed';
  scopedExceptionId: 'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_RESEARCH_T6' | null;
  structuralTriggerKind: 'branch_clash' | null;
  structuralTriggerMustBeT0Candidate: boolean;
  allowedQualifierIds: readonly (typeof CAREER_T6_PUBLIC_CLASSIC_ALLOWED_QUALIFIER_IDS)[number][];
  allowedQualifierCount: 4 | 0;
  branchClashHiddenStemInteractionEligibilityT6AuthoringAuthorized: boolean;
  branchClashParticipantScopeRequired: boolean;
  qualifierOnlyContextAuthorized: boolean;
  generalHiddenStemInteractionStillBlocked: boolean;
  arbitraryHiddenStemCoPresenceInteractionAuthorized: false;
  nonClashHiddenStemInteractionAuthorized: false;
  visibilityMayCreateBinaryActivation: false;
  positionMayCreateNumericWeight: false;
  positionMayCreateZeroInteractionThreshold: false;
  seasonMayCreateNumericWeight: false;
  seasonMayChooseWinnerAutomatically: false;
  pluralityMayCreateNumericWeight: false;
  pluralityMayChooseWinnerAutomatically: false;
  damageMagnitudeAuthorized: false;
  destructionVerdictAuthorized: false;
  postRelationSettlementAuthorized: false;
  crossRelationPrecedenceAuthorized: false;
  multiTouchAggregationAuthorized: false;
  careerOutcomeSemanticAuthorizedByThisGate: false;
  careerT8SynthesisAuthorizedByThisGate: false;
  consumerNarrativeAuthorizedByThisGate: false;
  i232SohuTrackReopened: false;
  i232ProvenanceGapClosed: false;
  i248YudingTrackMutated: false;
  i211QuWeiTrackMutated: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof CAREER_T6_PUBLIC_CLASSIC_CONTROL_IDS)[number][];
  controlCount: 18 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    methodologyDefinitionsCreated: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'CAREER_PERSONALIZATION_T6_PUBLIC_CLASSIC_BOUNDED_RULE_CONTRACT'
    | 'CAREER_PERSONALIZATION_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW';
}

function exactP3Accepted(): boolean {
  const hidden = careerT6Decision('hidden_stem_interaction_eligibility');
  const damage = careerT6Decision('damage_magnitude_settlement');
  const precedence = careerT6Decision('cross_relation_precedence');
  return (
    CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE.gateId === 'CAREER-PERSONALIZATION-T6-METHODOLOGY-P3' &&
    CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE.version === CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE_VERSION &&
    CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE.status === 'research' &&
    CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE.readiness.hiddenStemInteraction === 'blocked_authority_gap' &&
    CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE.readiness.t6InteractionAuthoring === 'not_authorized' &&
    hidden.mode === 'blocked_authority_gap' &&
    hidden.t6AuthoringAuthorized === false &&
    damage.mode === 'blocked_authority_gap' &&
    damage.t6AuthoringAuthorized === false &&
    precedence.mode === 'blocked' &&
    precedence.t6AuthoringAuthorized === false &&
    CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE.globalConstraints.hiddenStemMayBorrowVisibleStemRule === false &&
    CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE.globalConstraints.numericInteractionScoreAuthorized === false
  );
}

function exactI252Accepted(
  i252: I252PublicClassicHiddenStemInteractionEvidenceAdequacyMethodologyReviewReport,
): boolean {
  return (
    i252.status === 'RESOLVED_PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_EVIDENCE_ADEQUACY_METHODOLOGY_REVIEW' &&
    i252.decision ===
      'QIANLI_PUBLIC_CLASSIC_EVIDENCE_ADEQUATE_FOR_BOUNDED_RESEARCH_METHODOLOGY_FRONTIER_EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_AND_QUALIFIERS_ONLY_THREE_PAGE_BOUND_SOURCE_EXPANSION_GAPS_REMAIN_NO_GENERAL_HIDDEN_STEM_AUTHORITY_NO_CAREER_RULE_YET' &&
    i252.exactI251BoundaryAccepted &&
    i252.satisfiedRequirementCount === 8 &&
    i252.unsatisfiedRequirementCount === 0 &&
    i252.boundedResearchMethodologyCandidateMayProceed &&
    i252.boundedMethodologyScope ===
      'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_WITH_VISIBILITY_POSITION_SEASON_AND_PLURALITY_QUALIFIERS' &&
    i252.qianliWorkFamilyAcceptedAsSingleAuthorityFamily &&
    i252.qianliScanIdentityPlusTranscriptionMaySupportResearchCandidate &&
    i252.universalHiddenStemInteractionAuthorized === false &&
    i252.arbitraryHiddenStemCoPresenceInteractionAuthorized === false &&
    i252.hiddenStemInteractionOutsideExplicitRelationAuthorized === false &&
    i252.branchClashWinnerMayBeDerivedFromSeasonOrPluralityAutomatically === false &&
    i252.numericSeasonWeightAuthorized === false &&
    i252.numericPluralityWeightAuthorized === false &&
    i252.numericPositionWeightAuthorized === false &&
    i252.damageMagnitudeAuthorized === false &&
    i252.i232SohuTrackReopened === false &&
    i252.i232ProvenanceGapClosed === false &&
    i252.i248YudingTrackMutated === false &&
    i252.i211QuWeiTrackMutated === false &&
    i252.careerT6RuleAuthoringAuthorizedByThisGate === false &&
    i252.productionPromotionAuthorized === false
  );
}

function finalized(
  material: Omit<CareerT6PublicClassicBoundedScopeMethodologyReviewReport, 'reviewId'>,
): CareerT6PublicClassicBoundedScopeMethodologyReviewReport {
  return {
    reviewId: `career_t6_public_classic_scope_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerT6PublicClassicBoundedScopeMethodologyReview(
  i252: I252PublicClassicHiddenStemInteractionEvidenceAdequacyMethodologyReviewReport,
): CareerT6PublicClassicBoundedScopeMethodologyReviewReport {
  const p3Accepted = exactP3Accepted();
  const i252Accepted = exactI252Accepted(i252);
  const accepted = p3Accepted && i252Accepted;

  return finalized({
    reviewVersion: CAREER_PERSONALIZATION_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW'
      : 'UPSTREAM_BOUNDARY_INVALID',
    decision: accepted
      ? 'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORIZED_FOR_RESEARCH_T6_RULE_AUTHORING_ONLY_QUALIFIERS_CONTEXT_ONLY_GENERAL_P3_BLOCK_PRESERVED_NO_DAMAGE_WINNER_T8_NARRATIVE_OR_PRODUCTION'
      : 'CAREER_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_NOT_ESTABLISHED',
    upstreamP3Version: CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE_VERSION,
    upstreamI252ReviewId: i252.reviewId,
    exactP3BoundaryAccepted: p3Accepted,
    exactI252BoundaryAccepted: i252Accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    reviewerStatus: 'unreviewed',
    scopedExceptionId: accepted ? 'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_RESEARCH_T6' : null,
    structuralTriggerKind: accepted ? 'branch_clash' : null,
    structuralTriggerMustBeT0Candidate: accepted,
    allowedQualifierIds: accepted ? CAREER_T6_PUBLIC_CLASSIC_ALLOWED_QUALIFIER_IDS : Object.freeze([]),
    allowedQualifierCount: accepted ? 4 : 0,
    branchClashHiddenStemInteractionEligibilityT6AuthoringAuthorized: accepted,
    branchClashParticipantScopeRequired: accepted,
    qualifierOnlyContextAuthorized: accepted,
    generalHiddenStemInteractionStillBlocked: true,
    arbitraryHiddenStemCoPresenceInteractionAuthorized: false,
    nonClashHiddenStemInteractionAuthorized: false,
    visibilityMayCreateBinaryActivation: false,
    positionMayCreateNumericWeight: false,
    positionMayCreateZeroInteractionThreshold: false,
    seasonMayCreateNumericWeight: false,
    seasonMayChooseWinnerAutomatically: false,
    pluralityMayCreateNumericWeight: false,
    pluralityMayChooseWinnerAutomatically: false,
    damageMagnitudeAuthorized: false,
    destructionVerdictAuthorized: false,
    postRelationSettlementAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    multiTouchAggregationAuthorized: false,
    careerOutcomeSemanticAuthorizedByThisGate: false,
    careerT8SynthesisAuthorizedByThisGate: false,
    consumerNarrativeAuthorizedByThisGate: false,
    i232SohuTrackReopened: false,
    i232ProvenanceGapClosed: false,
    i248YudingTrackMutated: false,
    i211QuWeiTrackMutated: false,
    productionPromotionAuthorized: false,
    controlIds: accepted ? CAREER_T6_PUBLIC_CLASSIC_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 18 : 0,
    controlsFrozen: accepted,
    implementationEffects: Object.freeze({
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      previewRoutesChanged: 0,
    }),
    recommendedNextGate: accepted
      ? 'CAREER_PERSONALIZATION_T6_PUBLIC_CLASSIC_BOUNDED_RULE_CONTRACT'
      : 'CAREER_PERSONALIZATION_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW',
  });
}
