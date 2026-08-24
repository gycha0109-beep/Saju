import { describe, expect, test } from 'vitest';
import {
  buildI14StrengthEvidenceMatrix,
  buildI18StrengthClassificationReviewV2,
  calculateCanonicalSajuSnapshot,
  createI14StrengthEvidenceRegistry,
  runInterpretation,
  type CalculationPolicySnapshot,
} from '../src/index.js';

const policy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/i18-review-v2-test',
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

function knownReview() {
  const snapshot = calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1992, month: 10, day: 24 },
      time: { known: true, hour: 5, minute: 30 },
      sexForTraditionalCalculation: 'unspecified',
    },
    policy,
    { now: new Date('2026-08-20T00:00:00.000Z') },
  );
  const execution = runInterpretation(snapshot, createI14StrengthEvidenceRegistry(), {
    now: new Date('2026-08-20T00:01:00.000Z'),
  });
  return buildI18StrengthClassificationReviewV2(
    buildI14StrengthEvidenceMatrix(snapshot, execution),
  );
}

describe('I18 strength classification review v2', () => {
  test('records I18A/I18B as satisfied research capabilities but keeps classifier blocked', () => {
    const review = knownReview();
    const capabilityIds = review.satisfiedCapabilities.map((capability) => capability.capabilityId);
    const blockerCodes = review.remainingBlockers.map((blocker) => blocker.code);

    expect(review.terminalDecision).toBe('CLASSIFIER_IMPLEMENTATION_BLOCKED');
    expect(review.classificationAuthorized).toBe(false);
    expect(review.numericScoringAuthorized).toBe(false);
    expect(capabilityIds).toEqual([
      'MONTH_BRANCH_RELATION_EVIDENCE',
      'HIDDEN_CHALLENGE_MEMBERSHIP_EVIDENCE',
    ]);
    expect(review.satisfiedCapabilities.every((capability) => capability.status === 'implemented_research_only')).toBe(true);
    expect(review.satisfiedCapabilities.every((capability) => capability.classificationAuthorized === false)).toBe(true);
    expect(blockerCodes).toEqual([
      'ROOT_EFFECT_QUALITY_MISSING',
      'RELATION_EFFECT_RESOLUTION_MISSING',
      'SPECIAL_PATTERN_ROUTING_MISSING',
    ]);
    expect(blockerCodes).not.toContain('MONTH_ORDER_CHALLENGE_SEMANTICS_MISSING');
    expect(blockerCodes).not.toContain('HIDDEN_CHALLENGE_EVIDENCE_MISSING');
  });

  test('unknown-time partial I14 scenarios remain blockers even after I18A/I18B capability completion', () => {
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
    const review = buildI18StrengthClassificationReviewV2(
      buildI14StrengthEvidenceMatrix(snapshot, execution),
    );

    expect(snapshot.scenarios.length).toBeGreaterThan(1);
    expect(
      review.remainingBlockers.filter((blocker) => blocker.code === 'SCENARIO_EVIDENCE_INCOMPLETE'),
    ).toHaveLength(snapshot.scenarios.length);
    expect(review.terminalDecision).toBe('CLASSIFIER_IMPLEMENTATION_BLOCKED');
  });

  test('review v2 identity is deterministic', () => {
    expect(knownReview().reviewId).toBe(knownReview().reviewId);
  });
});
