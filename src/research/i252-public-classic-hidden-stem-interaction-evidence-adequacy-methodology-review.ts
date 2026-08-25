import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I251PublicClassicHiddenStemInteractionSourceEvidenceReport } from './i251-public-classic-hidden-stem-interaction-source-evidence.js';

export const I252_PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_EVIDENCE_ADEQUACY_METHODOLOGY_REVIEW_VERSION =
  'myeonghwa-public-classic-hidden-stem-interaction-evidence-adequacy-methodology-review-v1' as const;

export const I252_REQUIREMENT_IDS = Object.freeze([
  'PUBLICATION_IDENTITY_BOUND_TO_NLC_WORK_FAMILY',
  'DIRECT_RULE_TEXT_FOR_EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION',
  'VISIBLE_HIDDEN_DISTINCTION_DIRECTLY_STATED',
  'POSITION_OR_SEPARATION_QUALIFIER_DIRECTLY_STATED',
  'SEASON_OR_PLURALITY_QUALIFIER_DIRECTLY_STATED',
  'NO_UNIVERSAL_INTERACTION_EXPANSION',
  'SAME_WORK_SURFACES_NOT_DOUBLE_COUNTED',
  'I232_SOHU_PROVENANCE_REMAINS_SEPARATE',
] as const);

export interface I252RequirementAssessment {
  requirementId: (typeof I252_REQUIREMENT_IDS)[number];
  satisfied: boolean;
  rationale: string;
}

export interface I252PublicClassicHiddenStemInteractionEvidenceAdequacyMethodologyReviewReport {
  reviewId: string;
  reviewVersion: typeof I252_PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_EVIDENCE_ADEQUACY_METHODOLOGY_REVIEW_VERSION;
  status:
    | 'RESOLVED_PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_EVIDENCE_ADEQUACY_METHODOLOGY_REVIEW'
    | 'I251_EVIDENCE_BOUNDARY_INVALID';
  decision:
    | 'QIANLI_PUBLIC_CLASSIC_EVIDENCE_ADEQUATE_FOR_BOUNDED_RESEARCH_METHODOLOGY_FRONTIER_EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_AND_QUALIFIERS_ONLY_THREE_PAGE_BOUND_SOURCE_EXPANSION_GAPS_REMAIN_NO_GENERAL_HIDDEN_STEM_AUTHORITY_NO_CAREER_RULE_YET'
    | 'PUBLIC_CLASSIC_EVIDENCE_ADEQUACY_NOT_ESTABLISHED';
  upstreamI251EvidenceId: string;
  exactI251BoundaryAccepted: boolean;
  requirementAssessments: readonly I252RequirementAssessment[];
  satisfiedRequirementCount: 8 | 0;
  unsatisfiedRequirementCount: 0;
  boundedResearchMethodologyCandidateMayProceed: boolean;
  boundedMethodologyScope:
    | 'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_WITH_VISIBILITY_POSITION_SEASON_AND_PLURALITY_QUALIFIERS'
    | 'NOT_ESTABLISHED';
  qianliWorkFamilyAcceptedAsSingleAuthorityFamily: boolean;
  qianliScanIdentityPlusTranscriptionMaySupportResearchCandidate: boolean;
  qianliExactNlcPageBindingStillPreferredForPromotion: boolean;
  shenfengEffectExpansionGapOpen: boolean;
  jingxuanRestrictionExpansionGapOpen: boolean;
  zipingManifestationExpansionGapOpen: boolean;
  residualExpansionGapCount: 3 | 0;
  universalHiddenStemInteractionAuthorized: false;
  arbitraryHiddenStemCoPresenceInteractionAuthorized: false;
  hiddenStemInteractionOutsideExplicitRelationAuthorized: false;
  branchClashWinnerMayBeDerivedFromSeasonOrPluralityAutomatically: false;
  numericSeasonWeightAuthorized: false;
  numericPluralityWeightAuthorized: false;
  numericPositionWeightAuthorized: false;
  damageMagnitudeAuthorized: false;
  i232SohuTrackReopened: false;
  i232ProvenanceGapClosed: false;
  i248YudingTrackMutated: false;
  i211QuWeiTrackMutated: false;
  careerT6RuleAuthoringAuthorizedByThisGate: false;
  careerT8SynthesisAuthorizedByThisGate: false;
  productionPromotionAuthorized: false;
  recommendedNextGate:
    | 'CAREER_PERSONALIZATION_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW'
    | 'PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_EVIDENCE_ADEQUACY_METHODOLOGY_REVIEW';
}

function exactI251Accepted(i251: I251PublicClassicHiddenStemInteractionSourceEvidenceReport): boolean {
  return (
    i251.status === 'RESOLVED_PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_SOURCE_EVIDENCE' &&
    i251.decision ===
      'PUBLIC_CLASSIC_SOURCE_ACQUISITION_EXECUTED_QIANLI_DIRECT_TEXT_AND_NLC_IDENTITY_OBSERVED_THREE_ADDITIONAL_NLC_TARGETS_BOUND_AS_SOURCE_IDENTITIES_FOUR_DIRECT_QUESTION_CLASSES_TWO_TARGETED_GAPS_REMAIN_NO_EXISTING_HOLD_REOPENED_NO_AUTHORITY_PROMOTION' &&
    i251.exactI250BoundaryAccepted &&
    i251.acquisitionExecuted &&
    i251.sourceRecordCount === 6 &&
    i251.independentWorkFamilyCount === 4 &&
    i251.sameWorkScanAndTranscriptionDoubleCounted === false &&
    i251.directCoverageCount === 4 &&
    i251.partialCoverageCount === 0 &&
    i251.targetedNotYetBoundCount === 2 &&
    i251.qianliPublicationIdentityBound &&
    i251.qianliDirectRuleTextObserved &&
    i251.qianliExactNlcPageBound === false &&
    i251.i232SohuTrackReopened === false &&
    i251.i232ProvenanceGapClosed === false &&
    i251.universalHiddenStemInteractionEstablished === false &&
    i251.careerT6RuleAuthoringAuthorized === false &&
    i251.productionAuthorityImpact === 'NONE'
  );
}

function assessments(accepted: boolean): readonly I252RequirementAssessment[] {
  if (!accepted) return Object.freeze([]);
  return Object.freeze([
    Object.freeze({
      requirementId: 'PUBLICATION_IDENTITY_BOUND_TO_NLC_WORK_FAMILY' as const,
      satisfied: true,
      rationale: 'The 1935 Qianli work identity is bound to a National Library of China scan record.',
    }),
    Object.freeze({
      requirementId: 'DIRECT_RULE_TEXT_FOR_EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION' as const,
      satisfied: true,
      rationale: 'The public Qianli transcription directly states hidden-stem mutual overcoming inside explicit branch clashes.',
    }),
    Object.freeze({
      requirementId: 'VISIBLE_HIDDEN_DISTINCTION_DIRECTLY_STATED' as const,
      satisfied: true,
      rationale: 'The same work directly distinguishes visible/transmitted stems from branch-hidden material.',
    }),
    Object.freeze({
      requirementId: 'POSITION_OR_SEPARATION_QUALIFIER_DIRECTLY_STATED' as const,
      satisfied: true,
      rationale: 'The same work directly preserves a positional/separation qualification without numeric weighting.',
    }),
    Object.freeze({
      requirementId: 'SEASON_OR_PLURALITY_QUALIFIER_DIRECTLY_STATED' as const,
      satisfied: true,
      rationale: 'The branch-clash section explicitly instructs comparison using season and plurality alongside main qi.',
    }),
    Object.freeze({
      requirementId: 'NO_UNIVERSAL_INTERACTION_EXPANSION' as const,
      satisfied: true,
      rationale: 'The accepted finding remains scoped to an explicit branch-clash relation and does not authorize arbitrary co-presence interaction.',
    }),
    Object.freeze({
      requirementId: 'SAME_WORK_SURFACES_NOT_DOUBLE_COUNTED' as const,
      satisfied: true,
      rationale: 'The NLC scan and CText transcription are treated as one Qianli work family for authority counting.',
    }),
    Object.freeze({
      requirementId: 'I232_SOHU_PROVENANCE_REMAINS_SEPARATE' as const,
      satisfied: true,
      rationale: 'No Qianli finding authenticates, rebinds, or closes the separate 2017 Sohu provenance track.',
    }),
  ]);
}

function finalized(
  material: Omit<I252PublicClassicHiddenStemInteractionEvidenceAdequacyMethodologyReviewReport, 'reviewId'>,
): I252PublicClassicHiddenStemInteractionEvidenceAdequacyMethodologyReviewReport {
  return {
    reviewId: `i252_public_classic_adequacy_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI252PublicClassicHiddenStemInteractionEvidenceAdequacyMethodologyReview(
  i251: I251PublicClassicHiddenStemInteractionSourceEvidenceReport,
): I252PublicClassicHiddenStemInteractionEvidenceAdequacyMethodologyReviewReport {
  const accepted = exactI251Accepted(i251);
  return finalized({
    reviewVersion: I252_PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_EVIDENCE_ADEQUACY_METHODOLOGY_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_EVIDENCE_ADEQUACY_METHODOLOGY_REVIEW'
      : 'I251_EVIDENCE_BOUNDARY_INVALID',
    decision: accepted
      ? 'QIANLI_PUBLIC_CLASSIC_EVIDENCE_ADEQUATE_FOR_BOUNDED_RESEARCH_METHODOLOGY_FRONTIER_EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_AND_QUALIFIERS_ONLY_THREE_PAGE_BOUND_SOURCE_EXPANSION_GAPS_REMAIN_NO_GENERAL_HIDDEN_STEM_AUTHORITY_NO_CAREER_RULE_YET'
      : 'PUBLIC_CLASSIC_EVIDENCE_ADEQUACY_NOT_ESTABLISHED',
    upstreamI251EvidenceId: i251.evidenceId,
    exactI251BoundaryAccepted: accepted,
    requirementAssessments: assessments(accepted),
    satisfiedRequirementCount: accepted ? 8 : 0,
    unsatisfiedRequirementCount: 0,
    boundedResearchMethodologyCandidateMayProceed: accepted,
    boundedMethodologyScope: accepted
      ? 'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_WITH_VISIBILITY_POSITION_SEASON_AND_PLURALITY_QUALIFIERS'
      : 'NOT_ESTABLISHED',
    qianliWorkFamilyAcceptedAsSingleAuthorityFamily: accepted,
    qianliScanIdentityPlusTranscriptionMaySupportResearchCandidate: accepted,
    qianliExactNlcPageBindingStillPreferredForPromotion: accepted,
    shenfengEffectExpansionGapOpen: accepted,
    jingxuanRestrictionExpansionGapOpen: accepted,
    zipingManifestationExpansionGapOpen: accepted,
    residualExpansionGapCount: accepted ? 3 : 0,
    universalHiddenStemInteractionAuthorized: false,
    arbitraryHiddenStemCoPresenceInteractionAuthorized: false,
    hiddenStemInteractionOutsideExplicitRelationAuthorized: false,
    branchClashWinnerMayBeDerivedFromSeasonOrPluralityAutomatically: false,
    numericSeasonWeightAuthorized: false,
    numericPluralityWeightAuthorized: false,
    numericPositionWeightAuthorized: false,
    damageMagnitudeAuthorized: false,
    i232SohuTrackReopened: false,
    i232ProvenanceGapClosed: false,
    i248YudingTrackMutated: false,
    i211QuWeiTrackMutated: false,
    careerT6RuleAuthoringAuthorizedByThisGate: false,
    careerT8SynthesisAuthorizedByThisGate: false,
    productionPromotionAuthorized: false,
    recommendedNextGate: accepted
      ? 'CAREER_PERSONALIZATION_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW'
      : 'PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_EVIDENCE_ADEQUACY_METHODOLOGY_REVIEW',
  });
}
