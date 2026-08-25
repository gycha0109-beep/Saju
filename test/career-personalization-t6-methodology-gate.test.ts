import { describe, expect, test } from 'vitest';
import {
  CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE,
  CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE_VERSION,
  careerT6Decision,
  careerT6MayAuthor,
  type CareerT6Dimension,
} from '../src/research/career-personalization-t6-methodology-gate.js';
import { CAREER_PERSONALIZATION_METHODOLOGY_GATE_VERSION } from '../src/research/career-personalization-methodology-gate.js';
import { I113_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_INTERACTION_ELIGIBILITY_METHODOLOGY_REVIEW_VERSION } from '../src/research/i113-challenge-combination-support-channel-untouched-support-effect-source-ke-interaction-eligibility-methodology-review.js';
import { I116_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_POSITIONAL_APPLICABILITY_PROMOTION_READINESS_REVIEW_VERSION } from '../src/research/i116-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-positional-applicability-promotion-readiness-review.js';
import { I117_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY_METHODOLOGY_REVIEW_VERSION } from '../src/research/i117-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-effective-interaction-eligibility-methodology-review.js';

const DIMENSIONS: readonly CareerT6Dimension[] = [
  't5_exact_subtype_upstream',
  't5_family_relation_upstream',
  'visible_stem_directional_relation',
  'visible_stem_positional_qualitative_context',
  'visible_stem_effective_interaction',
  'hidden_stem_interaction_eligibility',
  'activation_persistence_effective_support',
  'damage_magnitude_settlement',
  'cross_relation_precedence',
  'numeric_interaction_weighting',
  'career_t6_semantic_effect',
];

describe('Career personalization P3 T6 methodology gate', () => {
  test('is a research-only readiness gate and creates no executable interpretation authority', () => {
    const gate = CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE;
    expect(gate.version).toBe(CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE_VERSION);
    expect(gate.domain).toBe('career');
    expect(gate.temporalScope).toBe('natal');
    expect(gate.status).toBe('research');
    expect(gate.reviewerStatus).toBe('unreviewed');
    expect(gate.authorityScope).toBe('t6_interaction_methodology_readiness_only');
    expect(gate.implementationEffects).toEqual({
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      registrySnapshotsCreated: 0,
      interpretationPacksCreated: 0,
      previewRoutesChanged: 0,
    });
  });

  test('pins the exact P1, I113, I116, and I117 audit contracts used by the gate', () => {
    expect(CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE.auditContracts).toEqual([
      expect.objectContaining({ auditId: 'P1', version: CAREER_PERSONALIZATION_METHODOLOGY_GATE_VERSION }),
      expect.objectContaining({
        auditId: 'I113',
        version:
          I113_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_INTERACTION_ELIGIBILITY_METHODOLOGY_REVIEW_VERSION,
      }),
      expect.objectContaining({
        auditId: 'I116',
        version:
          I116_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_POSITIONAL_APPLICABILITY_PROMOTION_READINESS_REVIEW_VERSION,
      }),
      expect.objectContaining({
        auditId: 'I117',
        version:
          I117_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY_METHODOLOGY_REVIEW_VERSION,
      }),
    ]);
  });

  test('covers every frozen T6-readiness dimension exactly once and authorizes none for T6', () => {
    const decisions = CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE.decisions;
    expect(decisions).toHaveLength(DIMENSIONS.length);
    expect(new Set(decisions.map((item) => item.dimension))).toEqual(new Set(DIMENSIONS));
    expect(decisions.every((item) => item.t6AuthoringAuthorized === false)).toBe(true);
    expect(decisions.every((item) => item.careerOutcomeAuthorized === false)).toBe(true);
    expect(decisions.every((item) => item.numericWeightingAuthorized === false)).toBe(true);
    expect(DIMENSIONS.every((dimension) => careerT6MayAuthor(dimension) === false)).toBe(true);
  });

  test('recognizes P2 T5 claims only as available upstream research substrate', () => {
    expect(careerT6Decision('t5_exact_subtype_upstream').mode).toBe('available_upstream');
    expect(careerT6Decision('t5_family_relation_upstream').mode).toBe('available_upstream');
    expect(CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE.readiness.t5Substrate).toBe(
      'available_research_only',
    );
    expect(CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE.readiness.t6InteractionAuthoring).toBe(
      'not_authorized',
    );
  });

  test('preserves visible-stem direction and positional vocabulary without promoting it to effect', () => {
    expect(careerT6Decision('visible_stem_directional_relation').mode).toBe('preserve_only');
    expect(careerT6Decision('visible_stem_positional_qualitative_context').mode).toBe(
      'preserve_only',
    );
    expect(careerT6Decision('visible_stem_effective_interaction').mode).toBe(
      'blocked_authority_gap',
    );
    const constraints = CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE.globalConstraints;
    expect(constraints.positionalEvidenceIsInteractionEffect).toBe(false);
    expect(constraints.qualitativeForceIsBinaryEligibility).toBe(false);
    expect(constraints.farStemNoForceMeansNoInteraction).toBe(false);
  });

  test('keeps hidden-stem interaction eligibility blocked and forbids borrowing visible-stem rules', () => {
    expect(careerT6Decision('hidden_stem_interaction_eligibility').mode).toBe(
      'blocked_authority_gap',
    );
    expect(CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE.readiness.hiddenStemInteraction).toBe(
      'blocked_authority_gap',
    );
    expect(
      CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE.globalConstraints.hiddenStemMayBorrowVisibleStemRule,
    ).toBe(false);
  });

  test('blocks activation, damage, settlement, precedence, and numeric weighting as T6 shortcuts', () => {
    expect(careerT6Decision('activation_persistence_effective_support').mode).toBe(
      'blocked_authority_gap',
    );
    expect(careerT6Decision('damage_magnitude_settlement').mode).toBe('blocked_authority_gap');
    expect(careerT6Decision('cross_relation_precedence').mode).toBe('blocked');
    expect(careerT6Decision('numeric_interaction_weighting').mode).toBe('blocked');

    const constraints = CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE.globalConstraints;
    expect(constraints.directionEstablishesDamageOutcome).toBe(false);
    expect(constraints.damageMayProceedWithoutEligibility).toBe(false);
    expect(constraints.numericInteractionScoreAuthorized).toBe(false);
    expect(constraints.conflictWinnerAuthorized).toBe(false);
    expect(constraints.crossRelationPrecedenceAuthorized).toBe(false);
  });

  test('keeps Career T6 semantics and Career T8 synthesis unauthorized by this gate', () => {
    expect(careerT6Decision('career_t6_semantic_effect').mode).toBe('blocked_authority_gap');
    expect(CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE.readiness.t6InteractionAuthoring).toBe(
      'not_authorized',
    );
    expect(CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE.readiness.t8CareerSynthesis).toBe(
      'not_authorized_by_this_gate',
    );
    expect(
      CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE.globalConstraints
        .interactionMayBecomeCareerMeaningWithoutT6Rule,
    ).toBe(false);
    expect(
      CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE.globalConstraints.legacyCareerT8MaySubstituteForT6,
    ).toBe(false);
  });

  test('preserves both post-gate methodology choices and authorizes neither automatically', () => {
    expect(CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE.nextDecisionOptions).toEqual([
      'NEW_EXTERNAL_INTERACTION_AUTHORITY',
      'SEPARATE_T5_ONLY_T8_SYNTHESIS_METHODOLOGY_REVIEW',
    ]);
    expect(CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE.automaticNextPathAuthorized).toBe(false);
  });

  test('does not authorize Preview or production simply because the T5 research pack exists', () => {
    expect(CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE.readiness.personalizedCareerPack).toBe(
      't5_only_research_pack_exists',
    );
    expect(CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE.readiness.previewDefaultSwitch).toBe(
      'not_authorized',
    );
    expect(CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE.readiness.productionPromotion).toBe(
      'not_authorized',
    );
  });
});
