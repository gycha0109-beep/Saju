import { describe, expect, it } from 'vitest';
import type { I252PublicClassicHiddenStemInteractionEvidenceAdequacyMethodologyReviewReport } from '../src/research/i252-public-classic-hidden-stem-interaction-evidence-adequacy-methodology-review.js';
import {
  CAREER_T6_PUBLIC_CLASSIC_ALLOWED_QUALIFIER_IDS,
  CAREER_T6_PUBLIC_CLASSIC_CONTROL_IDS,
  buildCareerT6PublicClassicBoundedScopeMethodologyReview,
} from '../src/research/career-personalization-t6-public-classic-bounded-scope-methodology-review.js';

function validI252(): I252PublicClassicHiddenStemInteractionEvidenceAdequacyMethodologyReviewReport {
  return {
    reviewId: 'i252_valid',
    status: 'RESOLVED_PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_EVIDENCE_ADEQUACY_METHODOLOGY_REVIEW',
    decision:
      'QIANLI_PUBLIC_CLASSIC_EVIDENCE_ADEQUATE_FOR_BOUNDED_RESEARCH_METHODOLOGY_FRONTIER_EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_AND_QUALIFIERS_ONLY_THREE_PAGE_BOUND_SOURCE_EXPANSION_GAPS_REMAIN_NO_GENERAL_HIDDEN_STEM_AUTHORITY_NO_CAREER_RULE_YET',
    exactI251BoundaryAccepted: true,
    satisfiedRequirementCount: 8,
    unsatisfiedRequirementCount: 0,
    boundedResearchMethodologyCandidateMayProceed: true,
    boundedMethodologyScope:
      'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_WITH_VISIBILITY_POSITION_SEASON_AND_PLURALITY_QUALIFIERS',
    qianliWorkFamilyAcceptedAsSingleAuthorityFamily: true,
    qianliScanIdentityPlusTranscriptionMaySupportResearchCandidate: true,
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
    productionPromotionAuthorized: false,
  } as unknown as I252PublicClassicHiddenStemInteractionEvidenceAdequacyMethodologyReviewReport;
}

describe('Career T6 public-classic bounded-scope methodology review', () => {
  it('opens only the explicit branch-clash hidden-stem research T6 exception', () => {
    const report = buildCareerT6PublicClassicBoundedScopeMethodologyReview(validI252());
    expect(report.status).toBe('RESOLVED_CAREER_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW');
    expect(report.scopedExceptionId).toBe('EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_RESEARCH_T6');
    expect(report.structuralTriggerKind).toBe('branch_clash');
    expect(report.structuralTriggerMustBeT0Candidate).toBe(true);
    expect(report.branchClashHiddenStemInteractionEligibilityT6AuthoringAuthorized).toBe(true);
  });

  it('preserves the P3 general hidden-stem block outside the scoped exception', () => {
    const report = buildCareerT6PublicClassicBoundedScopeMethodologyReview(validI252());
    expect(report.generalHiddenStemInteractionStillBlocked).toBe(true);
    expect(report.arbitraryHiddenStemCoPresenceInteractionAuthorized).toBe(false);
    expect(report.nonClashHiddenStemInteractionAuthorized).toBe(false);
  });

  it('allows exactly four bounded qualifier classes as context only', () => {
    const report = buildCareerT6PublicClassicBoundedScopeMethodologyReview(validI252());
    expect(report.allowedQualifierIds).toEqual(CAREER_T6_PUBLIC_CLASSIC_ALLOWED_QUALIFIER_IDS);
    expect(report.allowedQualifierCount).toBe(4);
    expect(report.qualifierOnlyContextAuthorized).toBe(true);
  });

  it('does not turn visibility or position into binary activation or numeric thresholds', () => {
    const report = buildCareerT6PublicClassicBoundedScopeMethodologyReview(validI252());
    expect(report.visibilityMayCreateBinaryActivation).toBe(false);
    expect(report.positionMayCreateNumericWeight).toBe(false);
    expect(report.positionMayCreateZeroInteractionThreshold).toBe(false);
  });

  it('does not let season or plurality choose a winner or become weights', () => {
    const report = buildCareerT6PublicClassicBoundedScopeMethodologyReview(validI252());
    expect(report.seasonMayCreateNumericWeight).toBe(false);
    expect(report.seasonMayChooseWinnerAutomatically).toBe(false);
    expect(report.pluralityMayCreateNumericWeight).toBe(false);
    expect(report.pluralityMayChooseWinnerAutomatically).toBe(false);
  });

  it('keeps damage settlement precedence and aggregation blocked', () => {
    const report = buildCareerT6PublicClassicBoundedScopeMethodologyReview(validI252());
    expect(report.damageMagnitudeAuthorized).toBe(false);
    expect(report.destructionVerdictAuthorized).toBe(false);
    expect(report.postRelationSettlementAuthorized).toBe(false);
    expect(report.crossRelationPrecedenceAuthorized).toBe(false);
    expect(report.multiTouchAggregationAuthorized).toBe(false);
  });

  it('creates no Career outcome T8 narrative production or executable artifacts', () => {
    const report = buildCareerT6PublicClassicBoundedScopeMethodologyReview(validI252());
    expect(report.careerOutcomeSemanticAuthorizedByThisGate).toBe(false);
    expect(report.careerT8SynthesisAuthorizedByThisGate).toBe(false);
    expect(report.consumerNarrativeAuthorizedByThisGate).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.implementationEffects).toEqual({
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      previewRoutesChanged: 0,
    });
    expect(report.controlIds).toEqual(CAREER_T6_PUBLIC_CLASSIC_CONTROL_IDS);
    expect(report.recommendedNextGate).toBe('CAREER_PERSONALIZATION_T6_PUBLIC_CLASSIC_BOUNDED_RULE_CONTRACT');
  });

  it('fails closed if I252 is broadened into universal hidden-stem interaction authority', () => {
    const bad = {
      ...validI252(),
      universalHiddenStemInteractionAuthorized: true,
    } as unknown as I252PublicClassicHiddenStemInteractionEvidenceAdequacyMethodologyReviewReport;
    const report = buildCareerT6PublicClassicBoundedScopeMethodologyReview(bad);
    expect(report.status).toBe('UPSTREAM_BOUNDARY_INVALID');
    expect(report.branchClashHiddenStemInteractionEligibilityT6AuthoringAuthorized).toBe(false);
    expect(report.allowedQualifierCount).toBe(0);
  });
});
