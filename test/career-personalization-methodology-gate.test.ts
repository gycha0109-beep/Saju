import { describe, expect, test } from 'vitest';
import {
  CAREER_PERSONALIZATION_METHODOLOGY_GATE,
  careerMethodologyDecision,
  careerMethodologyMayAuthorTier,
  type CareerMethodologyDimension,
} from '../src/research/career-personalization-methodology-gate.js';
import { CAREER_NATAL_READING_METHODOLOGY } from '../src/research/career-natal-reading-candidate.js';
import { GENERAL_NATAL_CONCLUSION_SOURCE } from '../src/research/general-natal-conclusion-synthesis-candidate.js';
import { GENERAL_NATAL_USEFUL_READING_SOURCE } from '../src/research/general-natal-useful-reading-candidate.js';
import { i95VerifiedChenYuanSizhuYuceCandidate } from '../src/research/i95-challenge-combination-support-channel-untouched-support-effect-single-candidate-full-coverage-authority-discovery-evidence.js';

const EXPECTED_DIMENSIONS: readonly CareerMethodologyDimension[] = [
  'exact_ten_god_subtype',
  'pillar_position',
  'stem_branch_channel',
  'hidden_stem_participation',
  'occurrence_structure',
  'month_season_context',
  'root_evidence',
  'structural_interactions',
  't1_t4_qualifiers',
  'conflict_resolution',
  'broad_family_context',
];

describe('personalized Career methodology applicability gate', () => {
  test('represents every frozen Career methodology dimension exactly once', () => {
    const dimensions = CAREER_PERSONALIZATION_METHODOLOGY_GATE.decisions.map(
      (decision) => decision.dimension,
    );

    expect(dimensions).toHaveLength(EXPECTED_DIMENSIONS.length);
    expect(new Set(dimensions).size).toBe(EXPECTED_DIMENSIONS.length);
    expect([...dimensions].sort()).toEqual([...EXPECTED_DIMENSIONS].sort());
  });

  test('only bounded Ten-God substrate is consumable and only at T5', () => {
    const consumed = CAREER_PERSONALIZATION_METHODOLOGY_GATE.decisions.filter(
      (decision) => decision.mode === 'consume',
    );

    expect(consumed.map((decision) => decision.dimension).sort()).toEqual([
      'broad_family_context',
      'exact_ten_god_subtype',
    ]);
    expect(consumed.every((decision) => decision.authorizedSemanticTiers.length === 1)).toBe(true);
    expect(consumed.every((decision) => decision.authorizedSemanticTiers[0] === 'T5')).toBe(true);
    expect(consumed.every((decision) => decision.sourceIds.length > 0)).toBe(true);
  });

  test('preserve-only and blocked dimensions cannot author T5, T6, or T8 semantics', () => {
    for (const decision of CAREER_PERSONALIZATION_METHODOLOGY_GATE.decisions) {
      if (decision.mode === 'consume') continue;
      expect(decision.authorizedSemanticTiers).toEqual([]);
      expect(careerMethodologyMayAuthorTier(decision.dimension, 'T5')).toBe(false);
      expect(careerMethodologyMayAuthorTier(decision.dimension, 'T6')).toBe(false);
      expect(careerMethodologyMayAuthorTier(decision.dimension, 'T8')).toBe(false);
    }
  });

  test('pins source IDs to the currently inspected repository source references', () => {
    const chenYuan = i95VerifiedChenYuanSizhuYuceCandidate().sourceReference;
    const sourceIds = new Set(
      CAREER_PERSONALIZATION_METHODOLOGY_GATE.sourceBasis.map((source) => source.sourceId),
    );

    expect(sourceIds).toEqual(
      new Set([
        GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId,
        GENERAL_NATAL_CONCLUSION_SOURCE.sourceId,
        chenYuan.sourceId,
      ]),
    );
  });

  test('does not turn visible-stem positional evidence into Career interaction authority', () => {
    const position = careerMethodologyDecision('pillar_position');
    const channel = careerMethodologyDecision('stem_branch_channel');
    const hidden = careerMethodologyDecision('hidden_stem_participation');
    const interaction = careerMethodologyDecision('structural_interactions');

    expect(position.mode).toBe('preserve_only');
    expect(channel.mode).toBe('preserve_only');
    expect(hidden.mode).toBe('preserve_only');
    expect(interaction.mode).toBe('preserve_only');
    expect(interaction.authorizedSemanticTiers).toEqual([]);
    expect(CAREER_PERSONALIZATION_METHODOLOGY_GATE.globalConstraints.hiddenStemMayBorrowVisibleStemSemantics).toBe(false);
    expect(CAREER_PERSONALIZATION_METHODOLOGY_GATE.globalConstraints.positionalQualitativeForceMayBecomeNumericWeight).toBe(false);
  });

  test('keeps repetition as structure rather than magnitude or score', () => {
    expect(careerMethodologyDecision('occurrence_structure').mode).toBe('preserve_only');
    expect(CAREER_PERSONALIZATION_METHODOLOGY_GATE.globalConstraints.occurrenceCountIsMagnitude).toBe(false);
    expect(CAREER_PERSONALIZATION_METHODOLOGY_GATE.globalConstraints.numericCareerScoreAuthorized).toBe(false);
  });

  test('blocks unsourced T1-T4 qualification and hidden conflict precedence', () => {
    expect(careerMethodologyDecision('t1_t4_qualifiers').mode).toBe('blocked');
    expect(careerMethodologyDecision('conflict_resolution').mode).toBe('blocked');
  });

  test('grants no direct Career T8 or deterministic career outcome authority', () => {
    for (const decision of CAREER_PERSONALIZATION_METHODOLOGY_GATE.decisions) {
      expect(decision.directCareerT8Authorized).toBe(false);
      expect(decision.numericWeightingAuthorized).toBe(false);
      expect(decision.deterministicCareerOutcomeAuthorized).toBe(false);
      expect(careerMethodologyMayAuthorTier(decision.dimension, 'T8')).toBe(false);
    }

    expect(CAREER_PERSONALIZATION_METHODOLOGY_GATE.globalConstraints.occupationAssignmentAuthorized).toBe(false);
    expect(CAREER_PERSONALIZATION_METHODOLOGY_GATE.globalConstraints.salaryPredictionAuthorized).toBe(false);
    expect(CAREER_PERSONALIZATION_METHODOLOGY_GATE.globalConstraints.promotionPredictionAuthorized).toBe(false);
    expect(CAREER_PERSONALIZATION_METHODOLOGY_GATE.globalConstraints.futureTimingAuthorized).toBe(false);
  });

  test('keeps legacy Career T8 research separate and does not declare a personalized pack ready', () => {
    expect(CAREER_NATAL_READING_METHODOLOGY.status).toBe('research');
    expect(CAREER_PERSONALIZATION_METHODOLOGY_GATE.readiness.t5SubstrateAuthoring).toBe('bounded_ready');
    expect(CAREER_PERSONALIZATION_METHODOLOGY_GATE.readiness.t6InteractionAuthoring).toBe('blocked_pending_methodology');
    expect(CAREER_PERSONALIZATION_METHODOLOGY_GATE.readiness.t8CareerSynthesisAuthoring).toBe('blocked_pending_lower_tier_and_methodology');
    expect(CAREER_PERSONALIZATION_METHODOLOGY_GATE.readiness.personalizedCareerPack).toBe('not_created');
    expect(CAREER_PERSONALIZATION_METHODOLOGY_GATE.readiness.previewDefaultSwitch).toBe('not_authorized');
    expect(CAREER_PERSONALIZATION_METHODOLOGY_GATE.readiness.productionPromotion).toBe('not_authorized');
    expect(CAREER_PERSONALIZATION_METHODOLOGY_GATE.globalConstraints.legacyCareerT8MayMixWithPersonalizedCareerT8).toBe(false);
  });
});
