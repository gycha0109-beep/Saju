import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from
  '../src/production/production-calculation-runtime.js';
import { buildCompatibilityTwoBirthResearchReading } from
  '../src/preview/compatibility-two-birth-research-runtime.js';
import { auditT10YongshenMethodScopeV1 } from
  '../src/research/compatibility-t10-yongshen-method-scope.js';

const AT = '2026-11-11T00:00:00.000Z';
function birth(year: number, month: number, day: number, known = true): BirthInput {
  return {
    calendarType: 'solar',
    date: { year, month, day },
    time: known ? { known: true, hour: 14, minute: 30 } : { known: false },
    sexForTraditionalCalculation: 'unspecified',
  };
}
const A = birth(1990, 5, 15);
const B = birth(1996, 6, 5);
function run(subject: BirthInput, target: BirthInput, opted = true) {
  return buildCompatibilityTwoBirthResearchReading(subject, target, {
    requestId: 'geju-versus-conditional-element-source-contract',
    subjectPersonRef: 'subject-ref',
    targetPersonRef: 'target-ref',
    referenceDateTime: AT,
    ...(opted ? { candidateScope: 'traditional_marital_palace_comparison' as const } : {}),
  });
}

describe('T10 original monthly-command yongshen vs conditional element method scope', () => {
  it('records canonical month branch and day master but selects neither yongshen definition', () => {
    const research = run(A, B).yongshenMethodScopeResearch;
    expect(research).toBeDefined();
    expect(research?.sources.monthCommandGeju.originalTextLayer)
      .toBe('ORIGINAL_CLASSICAL_TRANSCRIPTION');
    expect(research?.sources.laterGloss.originalTextLayer)
      .toBe('LATER_COMMENTARY_NOT_ORIGINAL');
    expect(research?.sources.conditionalBalance.deterministicElementNeedSelectionProvided)
      .toBe(false);
    expect(research?.independentMethodMeanings).toEqual([
      'MONTH_COMMAND_GEJU_ENTRY',
      'CONDITIONAL_ELEMENT_PREFERENCE',
      'LATER_STRENGTH_BALANCE_COMMENTARY',
    ]);
    const natal = calculateAuthorizedMyeonghwaProductionSnapshot(
      A, { now: new Date(AT) },
    ).snapshot;
    const day = natal.pillars.day;
    const month = natal.pillars.month;
    const god = natal.derivedFacts.tenGods;
    expect(research?.subject.calculationHash).toBe(natal.calculationHash);
    expect(research?.subject.dayStem.value)
      .toBe(day.status === 'resolved' ? day.value.stem.value : null);
    expect(research?.subject.monthBranch.value)
      .toBe(month.status === 'resolved' ? month.value.branch.value : null);
    expect(research?.subject.monthBranchTenGod.value).toBe(
      god.status === 'resolved' && god.value.month.branch?.status === 'resolved'
        ? god.value.month.branch.value : null,
    );
    expect(research?.subject.monthBranchTenGod.observedAsTaxonomyOnly).toBe(true);
    expect(research?.subject.individualGejuSelected).toBe(false);
    expect(research?.subject.individualUsefulElementSelected).toBe(false);
    expect(research?.pairwiseUsefulGodSelected).toBe(false);
    expect(research?.maySell).toBe(false);
  });

  it('detects the wood-day-master in yin/mao month exception without selecting its substitute', () => {
    const candidates = Array.from({ length: 16 }, (_, i) => birth(1990, 2, i + 9));
    const example = candidates.find(input => {
      const snapshot = calculateAuthorizedMyeonghwaProductionSnapshot(
        input, { now: new Date(AT) },
      ).snapshot;
      const day = snapshot.pillars.day;
      const month = snapshot.pillars.month;
      return day.status === 'resolved' && day.value.stem.element === '목' &&
        month.status === 'resolved' && month.value.branch.value === '인';
    });
    expect(example).toBeDefined();
    if (!example) throw new TypeError('Expected calendar-based wood month witness');
    const research = run(example, B).yongshenMethodScopeResearch;
    expect(research?.subject.exception.state).toBe('wood_day_master_in_yin_or_mao_month');
    expect(research?.subject.exception.alternateGejuSelected).toBe(false);
    expect(research?.subject.individualGejuSelected).toBe(false);
    expect(research?.applicableModernTwoPersonMethodSelected).toBe(false);
  });

  it('preserves identity on reversed inputs and shared birth chart data', () => {
    const forward = run(A, B).yongshenMethodScopeResearch;
    const backward = run(B, A).yongshenMethodScopeResearch;
    expect(forward?.subject.calculationHash).toBe(backward?.target.calculationHash);
    expect(forward?.target.calculationHash).toBe(backward?.subject.calculationHash);
    expect(forward?.subject.personRef).toBe('subject-ref');
    expect(backward?.target.personRef).toBe('target-ref');
    const sameBirth = run(A, A).yongshenMethodScopeResearch;
    expect(sameBirth?.subject.personRef).not.toBe(sameBirth?.target.personRef);
    expect(sameBirth?.subject.calculationHash).toBe(sameBirth?.target.calculationHash);
    expect(sameBirth?.pairwiseT10Admitted).toBe(false);
  });

  it('keeps original month/day observation independent from an unknown birth hour', () => {
    const review = run(A, birth(1996, 6, 5, false)).yongshenMethodScopeResearch;
    expect(review?.target.dayStem.value).not.toBeNull();
    expect(review?.target.monthBranch.value).not.toBeNull();
    expect(review?.target.individualGejuSelected).toBe(false);
    expect(review?.target.individualUsefulElementSelected).toBe(false);
    expect(review?.unresolvedPrerequisites)
      .toContain('SOURCE_QUALIFIED_MONTH_COMMAND_GEJU_COMPLETENESS');
  });

  it('rejects a forged calculation hash and never alters ordinary Preview', () => {
    const internal = run(A, B);
    const normal = run(A, B, false);
    expect(normal.yongshenMethodScopeResearch).toBeUndefined();
    expect(normal.html).toBe(internal.html);
    const subject = calculateAuthorizedMyeonghwaProductionSnapshot(
      A, { now: new Date(AT) },
    ).snapshot;
    const target = calculateAuthorizedMyeonghwaProductionSnapshot(
      B, { now: new Date(AT) },
    ).snapshot;
    expect(() => auditT10YongshenMethodScopeV1(
      internal.sourceScopeHandoff, subject,
      { ...target, calculationHash: 'forged' },
    )).toThrow();
    expect(internal.mayPublish).toBe(false);
    expect(internal.maySell).toBe(false);
  });
});
