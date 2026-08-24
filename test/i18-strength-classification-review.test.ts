import { describe, expect, test } from 'vitest';
import {
  I18_STRENGTH_CLASSIFICATION_REVIEW_BASIS,
  buildI14StrengthEvidenceMatrix,
  buildI18StrengthClassificationReview,
  calculateCanonicalSajuSnapshot,
  createI14StrengthEvidenceRegistry,
  runInterpretation,
  type BirthInput,
  type CalculationPolicySnapshot,
} from '../src/index.js';

const policy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/i18-review-test',
  policyVersion: '1.0.0',
  dayBoundary: 'midnight',
  trueSolarTime: {
    enabled: false,
    longitudeSource: 'not-applicable',
    applyEquationOfTime: false,
    applyHistoricalDst: false,
  },
  timeZonePolicy: { source: 'service-default', timeZone: 'Asia/Seoul' },
  unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
};

function knownInput(): BirthInput {
  return {
    calendarType: 'solar',
    date: { year: 1992, month: 10, day: 24 },
    time: { known: true, hour: 5, minute: 30 },
    sexForTraditionalCalculation: 'unspecified',
  };
}

function knownReview() {
  const snapshot = calculateCanonicalSajuSnapshot(knownInput(), policy, {
    now: new Date('2026-08-20T00:00:00.000Z'),
  });
  const execution = runInterpretation(snapshot, createI14StrengthEvidenceRegistry(), {
    now: new Date('2026-08-20T00:01:00.000Z'),
  });
  const matrix = buildI14StrengthEvidenceMatrix(snapshot, execution);
  return buildI18StrengthClassificationReview(matrix);
}

describe('I18 strength classification methodology review', () => {
  test('blocks classifier implementation on known-time evidence despite complete I14 execution', () => {
    const review = knownReview();
    const codes = new Set(review.blockers.map((blocker) => blocker.code));

    expect(review.terminalDecision).toBe('CLASSIFIER_IMPLEMENTATION_BLOCKED');
    expect(review.classificationAuthorized).toBe(false);
    expect(review.numericScoringAuthorized).toBe(false);
    expect(review.scenarios).toHaveLength(1);
    expect(review.scenarios[0]?.executionState).toBe('complete');
    expect(review.scenarios[0]?.blockerCodes).toEqual([]);

    expect(codes).toEqual(
      new Set([
        'MONTH_ORDER_CHALLENGE_SEMANTICS_MISSING',
        'HIDDEN_CHALLENGE_EVIDENCE_MISSING',
        'ROOT_EFFECT_QUALITY_MISSING',
        'RELATION_EFFECT_RESOLUTION_MISSING',
        'SPECIAL_PATTERN_ROUTING_MISSING',
      ]),
    );
    expect('classification' in review).toBe(false);
  });

  test('adds per-scenario blockers when unknown-time evidence remains partial', () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      {
        calendarType: 'solar',
        date: { year: 1992, month: 10, day: 24 },
        time: { known: false },
        sexForTraditionalCalculation: 'unspecified',
      },
      { ...policy, dayBoundary: 'jasi' },
      { now: new Date('2026-08-20T00:00:00.000Z') },
    );
    const execution = runInterpretation(snapshot, createI14StrengthEvidenceRegistry(), {
      now: new Date('2026-08-20T00:01:00.000Z'),
    });
    const review = buildI18StrengthClassificationReview(
      buildI14StrengthEvidenceMatrix(snapshot, execution),
    );

    expect(review.scenarios.length).toBeGreaterThan(1);
    for (const scenario of review.scenarios) {
      expect(scenario.basis).toBe('scenario');
      expect(scenario.executionState).toBe('partial');
      expect(scenario.blockerCodes).toContain('SCENARIO_EVIDENCE_INCOMPLETE');
    }
    expect(
      review.blockers.filter((blocker) => blocker.code === 'SCENARIO_EVIDENCE_INCOMPLETE'),
    ).toHaveLength(review.scenarios.length);
  });

  test('review identity is deterministic for the same evidence matrix', () => {
    const first = knownReview();
    const second = knownReview();

    expect(first.reviewId).toBe(second.reviewId);
    expect(first.blockers).toEqual(second.blockers);
    expect(first.requiredNextCapabilities).toEqual(second.requiredNextCapabilities);
  });

  test('review basis remains methodology-qualified and source-backed', () => {
    expect(I18_STRENGTH_CLASSIFICATION_REVIEW_BASIS).toHaveLength(2);
    expect(
      I18_STRENGTH_CLASSIFICATION_REVIEW_BASIS.every((basis) =>
        basis.sourceId.startsWith('SRC-METHOD-'),
      ),
    ).toBe(true);
  });
});
