import { describe, expect, test } from 'vitest';
import {
  CAREER_PERSONALIZED_T5_FAMILY_RELATION_RULES,
  CAREER_PERSONALIZED_T5_SUBTYPE_RULES,
  CAREER_T5_FAMILY_RELATION_CLAIM_TYPE,
  CAREER_T5_SUBTYPE_CLAIM_TYPE,
} from '../src/research/career-personalized-t5-substrate.js';
import {
  CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE,
  CAREER_T6_BRANCH_CLASH_CONTEXT_RULES,
} from '../src/research/career-personalized-t6-branch-clash-hidden-stem-context.js';
import {
  CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_TYPE,
  CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_RULES,
} from '../src/research/career-personalized-t6-branch-clash-qualifier-context.js';
import {
  CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_TYPE,
  CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_RULES,
} from '../src/research/career-personalized-t6-branch-clash-seasonal-qualifier.js';
import {
  CAREER_PERSONALIZATION_POST_P4_T8_READINESS_REVIEW_VERSION,
  CAREER_POST_P4_AVAILABLE_CLAIM_TYPES,
  CAREER_POST_P4_T8_REVIEW_CONTROL_IDS,
  buildCareerPersonalizationPostP4T8ReadinessReview,
} from '../src/research/career-personalization-post-p4-t8-readiness-review.js';
import {
  CAREER_PERSONALIZATION_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW_VERSION,
  CAREER_T6_PUBLIC_CLASSIC_ALLOWED_QUALIFIER_IDS,
  CAREER_T6_PUBLIC_CLASSIC_CONTROL_IDS,
  type CareerT6PublicClassicBoundedScopeMethodologyReviewReport,
} from '../src/research/career-personalization-t6-public-classic-bounded-scope-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE,
  CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE_VERSION,
} from '../src/research/career-personalization-t6-methodology-gate.js';

function acceptedP4(): CareerT6PublicClassicBoundedScopeMethodologyReviewReport {
  return {
    reviewId: 'career_t6_public_classic_scope_test',
    reviewVersion: CAREER_PERSONALIZATION_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW_VERSION,
    status: 'RESOLVED_CAREER_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW',
    decision:
      'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORIZED_FOR_RESEARCH_T6_RULE_AUTHORING_ONLY_QUALIFIERS_CONTEXT_ONLY_GENERAL_P3_BLOCK_PRESERVED_NO_DAMAGE_WINNER_T8_NARRATIVE_OR_PRODUCTION',
    upstreamP3Version: CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE_VERSION,
    upstreamI252ReviewId: 'i252_test',
    exactP3BoundaryAccepted: true,
    exactI252BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    reviewerStatus: 'unreviewed',
    scopedExceptionId: 'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_RESEARCH_T6',
    structuralTriggerKind: 'branch_clash',
    structuralTriggerMustBeT0Candidate: true,
    allowedQualifierIds: CAREER_T6_PUBLIC_CLASSIC_ALLOWED_QUALIFIER_IDS,
    allowedQualifierCount: 4,
    branchClashHiddenStemInteractionEligibilityT6AuthoringAuthorized: true,
    branchClashParticipantScopeRequired: true,
    qualifierOnlyContextAuthorized: true,
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
    controlIds: CAREER_T6_PUBLIC_CLASSIC_CONTROL_IDS,
    controlCount: 18,
    controlsFrozen: true,
    implementationEffects: {
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: 'CAREER_PERSONALIZATION_T6_PUBLIC_CLASSIC_BOUNDED_RULE_CONTRACT',
  };
}

function invalidP4(
  patch: Record<string, unknown>,
): CareerT6PublicClassicBoundedScopeMethodologyReviewReport {
  return { ...acceptedP4(), ...patch } as unknown as CareerT6PublicClassicBoundedScopeMethodologyReviewReport;
}

describe('Career post-P4 T8 readiness review', () => {
  test('opens only a separate bounded T8 synthesis methodology review, not T8 authoring', () => {
    const report = buildCareerPersonalizationPostP4T8ReadinessReview(acceptedP4());

    expect(report.reviewVersion).toBe(CAREER_PERSONALIZATION_POST_P4_T8_READINESS_REVIEW_VERSION);
    expect(report.status).toBe('RESOLVED_POST_P4_T8_READINESS_REVIEW');
    expect(report.decision).toBe(
      'BOUNDED_T5_PLUS_SCOPED_T6_SUBSTRATE_READY_FOR_SEPARATE_CAREER_T8_SYNTHESIS_METHODOLOGY_REVIEW_ONLY_NO_T8_RULE_AUTHORING',
    );
    expect(report.t8SynthesisMethodologyReviewMayProceed).toBe(true);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_BOUNDED_T5_T6_T8_SYNTHESIS_METHODOLOGY_REVIEW',
    );
  });

  test('accepts the exact current T5 and bounded T6 contracts as the complete available substrate set', () => {
    const report = buildCareerPersonalizationPostP4T8ReadinessReview(acceptedP4());

    expect(report.t5SubstrateContractAccepted).toBe(true);
    expect(report.t6BranchClashContextContractAccepted).toBe(true);
    expect(report.t6QualifierContextContractAccepted).toBe(true);
    expect(report.t6SeasonalQualifierContractAccepted).toBe(true);
    expect(CAREER_PERSONALIZED_T5_SUBTYPE_RULES).toHaveLength(70);
    expect(CAREER_PERSONALIZED_T5_FAMILY_RELATION_RULES).toHaveLength(6);
    expect(CAREER_T6_BRANCH_CLASH_CONTEXT_RULES).toHaveLength(6);
    expect(CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_RULES).toHaveLength(6);
    expect(CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_RULES).toHaveLength(60);
    expect(report.availableClaimTypeCount).toBe(5);
    expect(report.availableClaimTypes).toEqual(CAREER_POST_P4_AVAILABLE_CLAIM_TYPES);
    expect(report.availableClaimTypes).toEqual([
      CAREER_T5_SUBTYPE_CLAIM_TYPE,
      CAREER_T5_FAMILY_RELATION_CLAIM_TYPE,
      CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE,
      CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_TYPE,
      CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_TYPE,
    ]);
  });

  test('classifies exactly five dimensions as reviewable substrate/context and keeps six authority gaps blocked', () => {
    const report = buildCareerPersonalizationPostP4T8ReadinessReview(acceptedP4());
    const reviewable = report.dimensionDecisions.filter(
      (decision) => decision.mayBeConsideredByNextMethodologyReview,
    );
    const blocked = report.dimensionDecisions.filter(
      (decision) => !decision.mayBeConsideredByNextMethodologyReview,
    );

    expect(report.dimensionCount).toBe(11);
    expect(report.dimensionDecisions).toHaveLength(11);
    expect(reviewable).toHaveLength(5);
    expect(blocked).toHaveLength(6);
    expect(reviewable.map((decision) => decision.dimension)).toEqual([
      't5_exact_subtype_semantics',
      't5_family_relation_context',
      't6_explicit_branch_clash_context',
      't6_visibility_position_plurality_context',
      't6_seasonal_phase_context',
    ]);
    expect(blocked.map((decision) => decision.dimension)).toEqual([
      'general_hidden_stem_interaction',
      'interaction_effect_settlement',
      'root_evidence',
      't1_t4_qualifiers',
      'cross_relation_precedence',
      'numeric_weighting',
    ]);
    expect(
      report.dimensionDecisions.every(
        (decision) =>
          decision.semanticEffectAlreadyAuthorized === false &&
          decision.numericWeightingAuthorized === false,
      ),
    ).toBe(true);
  });

  test('preserves the historical P3 block while acknowledging the later bounded P4 exception', () => {
    const report = buildCareerPersonalizationPostP4T8ReadinessReview(acceptedP4());

    expect(report.exactP4BoundaryAccepted).toBe(true);
    expect(report.historicalP3BlockPreserved).toBe(true);
    expect(CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE.readiness.t6InteractionAuthoring).toBe(
      'not_authorized',
    );
    expect(CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE.readiness.t8CareerSynthesis).toBe(
      'not_authorized_by_this_gate',
    );
    expect(CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE.automaticNextPathAuthorized).toBe(false);
  });

  test('freezes no-shortcut controls and creates zero executable interpretation artifacts', () => {
    const report = buildCareerPersonalizationPostP4T8ReadinessReview(acceptedP4());

    expect(report.controlIds).toEqual(CAREER_POST_P4_T8_REVIEW_CONTROL_IDS);
    expect(report.controlCount).toBe(16);
    expect(report.controlsFrozen).toBe(true);
    expect(report.blockedDimensionMayBeInferredFromAbsence).toBe(false);
    expect(report.legacyCareerT8MayBeConsumed).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.implementationEffects).toEqual({
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      registrySnapshotsCreated: 0,
      interpretationPacksCreated: 0,
      previewRoutesChanged: 0,
    });
  });

  test.each([
    ['P4 status unresolved', { status: 'UPSTREAM_BOUNDARY_INVALID' }],
    ['P4 T8 authority widened', { careerT8SynthesisAuthorizedByThisGate: true }],
    ['season becomes numeric', { seasonMayCreateNumericWeight: true }],
    ['season chooses winner', { seasonMayChooseWinnerAutomatically: true }],
    ['damage becomes authorized', { damageMagnitudeAuthorized: true }],
    ['precedence becomes authorized', { crossRelationPrecedenceAuthorized: true }],
    ['general hidden-stem block removed', { generalHiddenStemInteractionStillBlocked: false }],
    ['structural trigger widened', { structuralTriggerKind: null }],
  ])('fails closed when %s', (_label, patch) => {
    const report = buildCareerPersonalizationPostP4T8ReadinessReview(invalidP4(patch));

    expect(report.status).toBe('UPSTREAM_BOUNDARY_INVALID');
    expect(report.decision).toBe('POST_P4_CAREER_T8_METHODOLOGY_REVIEW_NOT_READY');
    expect(report.t8SynthesisMethodologyReviewMayProceed).toBe(false);
    expect(report.availableClaimTypes).toEqual([]);
    expect(report.availableClaimTypeCount).toBe(0);
    expect(report.controlIds).toEqual([]);
    expect(report.controlCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
    expect(report.recommendedNextGate).toBe('CAREER_PERSONALIZATION_POST_P4_T8_READINESS_REVIEW');
  });

  test('is deterministic for the same accepted upstream boundary', () => {
    const first = buildCareerPersonalizationPostP4T8ReadinessReview(acceptedP4());
    const second = buildCareerPersonalizationPostP4T8ReadinessReview(acceptedP4());

    expect(first.reviewId).toBe(second.reviewId);
    expect(first).toEqual(second);
  });
});
