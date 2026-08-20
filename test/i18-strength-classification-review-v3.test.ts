import { describe, expect, test } from 'vitest';
import {
  buildI14StrengthEvidenceMatrix,
  buildI18StrengthClassificationReviewV3,
  calculateCanonicalSajuSnapshot,
  createI14StrengthEvidenceRegistry,
  runInterpretation,
  type CalculationPolicySnapshot,
} from '../src/index.js';

const policy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/i18-review-v3-test',
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
  return buildI18StrengthClassificationReviewV3(
    buildI14StrengthEvidenceMatrix(snapshot, execution),
  );
}

describe('I18 strength classification review v3', () => {
  test('records intrinsic root class capability but preserves earth/relation/special blockers', () => {
    const review = knownReview();
    const capabilities = review.satisfiedCapabilities.map((item) => item.capabilityId);
    const blockers = review.remainingBlockers.map((item) => item.code);

    expect(review.terminalDecision).toBe('CLASSIFIER_IMPLEMENTATION_BLOCKED');
    expect(review.classificationAuthorized).toBe(false);
    expect(review.numericScoringAuthorized).toBe(false);
    expect(capabilities).toEqual([
      'MONTH_BRANCH_RELATION_EVIDENCE',
      'HIDDEN_CHALLENGE_MEMBERSHIP_EVIDENCE',
      'INTRINSIC_ROOT_CLASS_EVIDENCE',
    ]);
    expect(blockers).toEqual([
      'EARTH_ROOT_CLASS_UNRESOLVED',
      'RELATION_EFFECT_RESOLUTION_MISSING',
      'SPECIAL_PATTERN_ROUTING_MISSING',
    ]);
    expect(blockers).not.toContain('ROOT_EFFECT_QUALITY_MISSING');
  });

  test('unknown-time partial scenarios remain explicit blockers', () => {
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
    const review = buildI18StrengthClassificationReviewV3(
      buildI14StrengthEvidenceMatrix(snapshot, execution),
    );

    expect(
      review.remainingBlockers.filter((blocker) => blocker.code === 'SCENARIO_EVIDENCE_INCOMPLETE'),
    ).toHaveLength(snapshot.scenarios.length);
    expect(review.terminalDecision).toBe('CLASSIFIER_IMPLEMENTATION_BLOCKED');
  });

  test('review v3 identity is deterministic', () => {
    expect(knownReview().reviewId).toBe(knownReview().reviewId);
  });
});
