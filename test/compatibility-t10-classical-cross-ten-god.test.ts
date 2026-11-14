import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from
  '../src/production/production-calculation-runtime.js';
import { buildCompatibilityTwoBirthResearchReading } from
  '../src/preview/compatibility-two-birth-research-runtime.js';
import { auditT10ClassicalCrossTenGodScopeV1 } from
  '../src/research/compatibility-t10-classical-cross-ten-god.js';

const AT = '2026-11-11T00:00:00.000Z';
function birth(
  year: number, month: number, day: number,
  sex: 'male' | 'female' | 'unspecified',
  known = true,
): BirthInput {
  return {
    calendarType: 'solar',
    date: { year, month, day },
    time: known ? { known: true, hour: 14, minute: 30 } : { known: false },
    sexForTraditionalCalculation: sex,
  };
}
const M = birth(1990, 5, 15, 'male');
const F = birth(1996, 6, 5, 'female');
function run(a: BirthInput, b: BirthInput, opted = true) {
  return buildCompatibilityTwoBirthResearchReading(a, b, {
    requestId: 'classical-two-chart-ten-god-source-audit',
    subjectPersonRef: 'one-person',
    targetPersonRef: 'other-person',
    referenceDateTime: AT,
    ...(opted ? { candidateScope: 'traditional_marital_palace_comparison' as const } : {}),
  });
}

describe('T10 historical cross-chart role scope and contradictory primary sources', () => {
  it('binds only visible resolved T5 positions and never decides historical heaviness', () => {
    const result = run(M, F);
    const research = result.classicalCrossTenGodResearch;
    expect(research).toBeDefined();
    expect(research?.historicalScope).toBe('male_female_role_matched');
    expect(research?.sources.traditional.primaryPassageRead).toBe(true);
    expect(research?.sources.challenge.primaryPassageRead).toBe(true);
    expect(research?.methodConflict)
      .toBe('PRIMARY_TEXT_DISPUTES_RAW_PAIRING_AS_SUFFICIENT');
    for (const observation of [research?.male, research?.female]) {
      expect(observation?.observed.every(x =>
        x.path === `derivedFacts.tenGods.${x.slot}.${x.channel}` &&
        (x.channel !== 'stem' || x.slot !== 'day'))).toBe(true);
      expect(observation?.strengthOrHeavyCriterionEstablished).toBe(false);
      expect(observation?.interpersonalClaimAuthorized).toBe(false);
      expect(observation?.countOfVisibleCanonicalTerms)
        .toBe(observation?.observed.length);
    }
    expect(research?.male?.observed.every(p =>
      p.value === '비견' || p.value === '겁재')).toBe(true);
    expect(research?.female?.observed.every(p =>
      p.value === '상관' || p.value === '식신')).toBe(true);
    expect(research?.comparisonVerdict).toBeNull();
    expect(research?.compatibilityScore).toBeNull();
    expect(research?.maySell).toBe(false);
    expect(result.maySell).toBe(false);
  });

  it('attaches original hashes to the correct person in both orientations', () => {
    const a = run(M, F).classicalCrossTenGodResearch;
    const b = run(F, M).classicalCrossTenGodResearch;
    expect(a?.male?.personRef).toBe('one-person');
    expect(b?.male?.personRef).toBe('other-person');
    expect(a?.female?.personRef).toBe('other-person');
    expect(b?.female?.personRef).toBe('one-person');
    expect(a?.male?.calculationHash).toBe(b?.male?.calculationHash);
    expect(a?.female?.calculationHash).toBe(b?.female?.calculationHash);
    expect(a?.methodConflict).toBe(b?.methodConflict);
  });

  it('refuses historical gender inference for unspecified or same-role inputs', () => {
    for (const [a, b] of [
      [birth(1990, 5, 15, 'unspecified'), F],
      [M, birth(1996, 6, 5, 'unspecified')],
      [M, birth(1996, 6, 5, 'male')],
      [birth(1990, 5, 15, 'female'), F],
    ] as const) {
      const review = run(a, b).classicalCrossTenGodResearch;
      expect(review?.historicalScope).toBe('historical_sex_scope_not_matched');
      expect(review?.male).toBeNull();
      expect(review?.female).toBeNull();
      expect(review?.pairwiseT10Admitted).toBe(false);
    }
  });

  it('preserves unknown-hour partiality without inventing a heavy-star rule', () => {
    const review = run(M, birth(1996, 6, 5, 'female', false))
      .classicalCrossTenGodResearch;
    expect(review?.historicalScope).toBe('male_female_role_matched');
    expect(review?.female?.factCoverage).toBe('partial_visible_slots');
    expect(review?.female?.unresolvedPaths).toEqual(expect.arrayContaining([
      'derivedFacts.tenGods.hour.stem', 'derivedFacts.tenGods.hour.branch',
    ]));
    expect(review?.traditionalHeavyPairCondition)
      .toBe('not_established_no_source_qualified_threshold_or_strength');
  });

  it('rejects a forged chart hash and leaves regular customer-facing preview unchanged', () => {
    const result = run(M, F);
    const subject = calculateAuthorizedMyeonghwaProductionSnapshot(
      M, { now: new Date(AT) },
    ).snapshot;
    const target = calculateAuthorizedMyeonghwaProductionSnapshot(
      F, { now: new Date(AT) },
    ).snapshot;
    expect(() => auditT10ClassicalCrossTenGodScopeV1(
      result.sourceScopeHandoff, subject,
      { ...target, calculationHash: 'forged-by-another-person' },
    )).toThrow();
    const normal = run(M, F, false);
    expect(normal.classicalCrossTenGodResearch).toBeUndefined();
    expect(normal.html).toBe(result.html);
    expect(result.mayClaimInterpersonalMeaning).toBe(false);
    expect(result.mayPublish).toBe(false);
    expect(result.maySell).toBe(false);
  });
});
