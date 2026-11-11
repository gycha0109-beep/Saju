import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { buildCompatibilityTwoBirthResearchReading } from
  '../src/preview/compatibility-two-birth-research-runtime.js';
import { buildT10ThreeMethodApplicabilityReadingV1 } from
  '../src/research/compatibility-t10-three-method-applicability-reading.js';

function birth(
  year: number, month: number, day: number,
  sex: 'male' | 'female' | 'unspecified',
  timeKnown = true,
): BirthInput {
  return {
    calendarType: 'solar',
    date: { year, month, day },
    time: timeKnown ? { known: true, hour: 14, minute: 30 } : { known: false },
    sexForTraditionalCalculation: sex,
  };
}
const MALE = birth(1990, 5, 15, 'male');
const FEMALE = birth(1996, 6, 5, 'female');
const UNKNOWN = birth(1996, 6, 5, 'unspecified');
function run(subject: BirthInput, target: BirthInput, optIn = true) {
  return buildCompatibilityTwoBirthResearchReading(subject, target, {
    requestId: 'method-applicability-research-only',
    subjectPersonRef: 'subject-source-owner',
    targetPersonRef: 'target-source-owner',
    referenceDateTime: '2026-11-11T00:00:00.000Z',
    ...(optIn ? { candidateScope: 'traditional_marital_palace_comparison' as const } : {}),
  });
}

describe('T10 three-method eligibility without pretending to have a valid compatibility rule', () => {
  it('separates three historical methods and their actual calculation inputs', () => {
    const report = run(MALE, FEMALE).threeMethodApplicabilityReading;
    expect(report?.axes.map(axis => axis.method))
      .toEqual(['palace', 'six_spirits', 'useful_god']);
    expect(report?.axes[0]?.consideredInputFactPaths).toContain(
      'subject.pillars.day.value.branch');
    expect(report?.axes[0]?.state).toBe('partial_direct_day_observations');
    expect(report?.axes[1]?.state).toBe('historical_roles_only_no_strength_rule');
    expect(report?.axes[1]?.consideredInputFactPaths).toEqual(
      expect.arrayContaining([
        'subject.derivedFacts.tenGods',
        'target.derivedFacts.tenGods',
      ]),
    );
    expect(report?.axes[2]?.state).toBe('individual_month_command_inputs_only');
    expect(report?.axes[2]?.consideredInputFactPaths)
      .toContain('target.pillars.month.value.branch');
    expect(report?.axes[2]?.unresolvedPrerequisites)
      .toContain('SOURCE_QUALIFIED_USEFUL_ELEMENT_STRENGTH_SELECTION');
    expect(report?.axes.every(axis =>
      axis.sourceQualifiedInterpersonalRule === false &&
      axis.relationshipOutcomeAuthorized === false &&
      axis.paragraph.length > 20 && axis.sourceUrls.length > 0)).toBe(true);
    expect(report?.sourceQualifiedThreeMethodPriority).toBeNull();
    expect(report?.sourceQualifiedT10ReadingComplete).toBe(false);
    expect(report?.maySell).toBe(false);
  });

  it('does not generalize a historically sexed source to unspecified roles', () => {
    const report = run(MALE, UNKNOWN).threeMethodApplicabilityReading;
    expect(report?.axes[1]?.state).toBe('historical_roles_not_matched');
    expect(report?.axes[1]?.consideredInputFactPaths).toEqual([]);
    expect(report?.axes[1]?.paragraph).toContain('해당하지 않아');
    expect(report?.relationshipVerdict).toBeNull();
  });

  it('preserves both person references and swaps role-anchored fact paths on reverse', () => {
    const forward = run(MALE, FEMALE).threeMethodApplicabilityReading;
    const reverse = run(FEMALE, MALE).threeMethodApplicabilityReading;
    expect(forward?.subject.calculationHash).toBe(reverse?.target.calculationHash);
    expect(forward?.target.calculationHash).toBe(reverse?.subject.calculationHash);
    expect(reverse?.axes[1]?.consideredInputFactPaths)
      .toContain('target.derivedFacts.tenGods');
    expect(reverse?.axes[1]?.consideredInputFactPaths)
      .toContain('subject.derivedFacts.tenGods');
  });

  it('records unknown hour only as an unresolved fact and keeps public HTML unchanged', () => {
    const partial = birth(1996, 6, 5, 'female', false);
    const ordinary = run(MALE, partial, false);
    const scoped = run(MALE, partial, true);
    expect(scoped.threeMethodApplicabilityReading?.axes[1]?.consideredInputFactPaths)
      .toContain('target.derivedFacts.tenGods.hour.stem');
    expect(scoped.threeMethodApplicabilityReading?.axes[2]?.consideredInputFactPaths)
      .toContain('target.pillars.month.value.branch');
    expect(ordinary.threeMethodApplicabilityReading).toBeUndefined();
    expect(ordinary.html).toBe(scoped.html);
    expect(scoped.mayPublish).toBe(false);
    expect(scoped.maySell).toBe(false);
  });

  it('blocks a foreign canonical calculation, not just mismatched displayed person names', () => {
    const report = run(MALE, FEMALE);
    const factual = report.sourceBoundObservationReading;
    const six = report.classicalCrossTenGodResearch;
    const useful = report.classicalUsefulElementResearch;
    const yongshen = report.yongshenMethodScopeResearch;
    if (!factual || !six || !useful || !yongshen) {
      throw new TypeError('Research method inputs unavailable.');
    }
    expect(() => buildT10ThreeMethodApplicabilityReadingV1(
      factual, six, useful, {
        ...yongshen,
        subject: { ...yongshen.subject, calculationHash: 'other-person-hash' },
      },
    )).toThrow('same protected source-bound charts');
    expect(() => buildT10ThreeMethodApplicabilityReadingV1(
      factual, {
        ...six,
        traditionalHeavyPairCondition: 'admitted' as never,
      }, useful, yongshen,
    )).toThrow('same protected source-bound charts');
  });
});
