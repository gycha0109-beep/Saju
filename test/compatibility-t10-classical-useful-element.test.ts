import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from
  '../src/production/production-calculation-runtime.js';
import { buildCompatibilityTwoBirthResearchReading } from
  '../src/preview/compatibility-two-birth-research-runtime.js';
import { auditT10ClassicalUsefulElementExamplesV1 } from
  '../src/research/compatibility-t10-classical-useful-element.js';

const AT = '2026-11-11T00:00:00.000Z';
function birth(
  year: number, month: number, day: number,
  sex: 'male' | 'female' | 'unspecified', known = true,
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
function run(a: BirthInput, b: BirthInput, opt = true) {
  return buildCompatibilityTwoBirthResearchReading(a, b, {
    requestId: 'source-conditional-useful-element-examples',
    subjectPersonRef: 'one-person',
    targetPersonRef: 'other-person',
    referenceDateTime: AT,
    ...(opt ? { candidateScope: 'traditional_marital_palace_comparison' as const } : {}),
  });
}

describe('T10 classical useful-element conditions stay research-only and unselected', () => {
  it('tracks 8 canonical visible element positions without claiming yongshin or balance', () => {
    const review = run(M, F).classicalUsefulElementResearch;
    const maleSnapshot = calculateAuthorizedMyeonghwaProductionSnapshot(
      M, { now: new Date(AT) },
    ).snapshot;
    expect(review?.historicalScope).toBe('male_female_role_matched');
    expect(review?.male?.calculationHash).toBe(maleSnapshot.calculationHash);
    expect(review?.male?.completeness).toBe('all_eight_visible');
    expect(review?.male?.observed).toHaveLength(8);
    expect(review?.male?.observed.find(x => x.path === 'pillars.day.value.stem.element')
      ?.element).toBe(maleSnapshot.pillars.day.status === 'resolved'
      ? maleSnapshot.pillars.day.value.stem.element : null);
    expect(review?.male?.actualUsefulGodSelected).toBe(false);
    expect(review?.male?.elementStrengthDetermined).toBe(false);
    expect(review?.observedElementsCannotEstablishBalance).toBe(true);
    expect(review?.usefulGodComparisonAuthorized).toBe(false);
    expect(review?.compatibilityVerdict).toBeNull();
  });

  it('limits proposed element candidates to exact source examples and observed chart paths', () => {
    const review = run(M, F).classicalUsefulElementResearch;
    expect(review?.source.examplePrerequisites)
      .toEqual(['MALE_WOOD_STRONG_AND_METAL_REQUIRED', 'FEMALE_METAL_STRONG_AND_FIRE_PREFERRED']);
    const examples = review?.hypotheticalExamples;
    expect(examples).toHaveLength(2);
    const maleExample = examples?.find(x => x.id === 'male_wood_strong_needs_metal');
    const femaleExample = examples?.find(x => x.id === 'female_metal_strong_prefers_fire');
    expect(maleExample?.requiresUsefulElement).toBe('금');
    expect(femaleExample?.requiresUsefulElement).toBe('화');
    expect(maleExample?.counterpartVisibleRequiredElementPaths)
      .toEqual(review?.female?.observed.filter(x => x.element === '금').map(x => x.path));
    expect(maleExample?.counterpartVisibleGeneratingElementPaths)
      .toEqual(review?.female?.observed.filter(x => x.element === '토').map(x => x.path));
    expect(femaleExample?.counterpartVisibleRequiredElementPaths)
      .toEqual(review?.male?.observed.filter(x => x.element === '화').map(x => x.path));
    expect(femaleExample?.counterpartVisibleGeneratingElementPaths)
      .toEqual(review?.male?.observed.filter(x => x.element === '목').map(x => x.path));
    for (const x of examples ?? []) {
      expect(x.prerequisiteEstablished).toBe(false);
      expect(x.usefulElementSelectionVerified).toBe(false);
      expect(x.otherChartElementStrengthVerified).toBe(false);
      expect(x.elementComplementVerdict).toBeNull();
    }
  });

  it('preserves the historical person and counterpart identities after input reversal', () => {
    const a = run(M, F).classicalUsefulElementResearch;
    const b = run(F, M).classicalUsefulElementResearch;
    expect(a?.male?.personRef).toBe('one-person');
    expect(b?.male?.personRef).toBe('other-person');
    expect(a?.male?.calculationHash).toBe(b?.male?.calculationHash);
    expect(a?.female?.calculationHash).toBe(b?.female?.calculationHash);
    expect(a?.hypotheticalExamples[0]?.anchorPersonRef).toBe('one-person');
    expect(b?.hypotheticalExamples[0]?.anchorPersonRef).toBe('other-person');
  });

  it('leaves missing birth-hour symbols unresolved, never a missing beneficial element', () => {
    const review = run(M, birth(1996, 6, 5, 'female', false))
      .classicalUsefulElementResearch;
    expect(review?.female?.completeness).toBe('partly_unresolved');
    expect(review?.female?.unresolvedPaths).toEqual(expect.arrayContaining([
      'pillars.hour.value.stem.element', 'pillars.hour.value.branch.element',
    ]));
    expect(review?.female?.observed.every(x => x.pillar !== 'hour')).toBe(true);
    expect(review?.hypotheticalExamples[0]?.prerequisiteEstablished).toBe(false);
  });

  it('does not infer historical roles for other scopes and cannot change customer output', () => {
    const notMatched = run(birth(1990, 5, 15, 'unspecified'), F)
      .classicalUsefulElementResearch;
    expect(notMatched?.historicalScope).toBe('historical_sex_scope_not_matched');
    expect(notMatched?.male).toBeNull();
    expect(notMatched?.female).toBeNull();
    expect(notMatched?.hypotheticalExamples).toHaveLength(0);
    const ordinary = run(M, F, false);
    const internal = run(M, F);
    expect(ordinary.classicalUsefulElementResearch).toBeUndefined();
    expect(ordinary.html).toBe(internal.html);
    expect(internal.mayClaimInterpersonalMeaning).toBe(false);
    expect(internal.maySell).toBe(false);
  });

  it('rejects forged independent chart identity rather than comparing another person', () => {
    const result = run(M, F);
    const prior = result.classicalCrossTenGodResearch;
    if (!prior) throw new TypeError('Expected internal source-gated prior audit.');
    const subject = calculateAuthorizedMyeonghwaProductionSnapshot(
      M, { now: new Date(AT) },
    ).snapshot;
    const target = calculateAuthorizedMyeonghwaProductionSnapshot(
      F, { now: new Date(AT) },
    ).snapshot;
    expect(() => auditT10ClassicalUsefulElementExamplesV1(
      result.sourceScopeHandoff, prior, subject,
      { ...target, calculationHash: 'forged' },
    )).toThrow();
  });
});
