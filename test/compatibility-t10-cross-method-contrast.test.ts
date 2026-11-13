import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { buildCompatibilityTwoBirthResearchReading } from
  '../src/preview/compatibility-two-birth-research-runtime.js';
import { compareT10CrossMethodEvidenceV1 } from
  '../src/research/compatibility-t10-cross-method-contrast.js';

function birth(
  year: number, month: number, day: number,
  sex: 'male' | 'female' | 'unspecified' = 'unspecified',
  known = true,
): BirthInput {
  return {
    calendarType: 'solar',
    date: { year, month, day },
    time: known ? { known: true, hour: 14, minute: 30 } : { known: false },
    sexForTraditionalCalculation: sex,
  };
}
const A = birth(1990, 5, 15);
const SUPPORT_WITH_CLASH = birth(1996, 6, 5);
const CLASH_WITH_SUPPORT = birth(1996, 8, 5);
const NO_OPPOSITION = birth(1990, 5, 8);
function run(a: BirthInput, b: BirthInput, opt = true) {
  return buildCompatibilityTwoBirthResearchReading(a, b, {
    requestId: 'source-limited-cross-method-test',
    subjectPersonRef: 'person-first',
    targetPersonRef: 'person-second',
    referenceDateTime: '2026-11-11T00:00:00.000Z',
    ...(opt ? { candidateScope: 'traditional_marital_palace_comparison' as const } : {}),
  });
}
function inputs(output: ReturnType<typeof run>) {
  const coexisting = output.coexistingEvidenceReview;
  const six = output.classicalCrossTenGodResearch;
  const useful = output.classicalUsefulElementResearch;
  const applicability = output.threeMethodApplicabilityReading;
  if (!coexisting || !six || !useful || !applicability) {
    throw new TypeError('Expected the guarded research opt-in.');
  }
  return [output.sourceScopeHandoff, coexisting, six, useful, applicability] as const;
}

describe('T10 source-bound multi-method contrasts on two original charts', () => {
  it('records day six-combination versus a separate-position clash without precedence', () => {
    const output = run(A, SUPPORT_WITH_CLASH);
    const result = output.crossMethodContrastResearch;
    expect(result?.structural).toHaveLength(1);
    expect(result?.structural[0]?.direction)
      .toBe('day_six_combination_with_other_clash');
    expect(result?.structural[0]?.dayFactPaths)
      .toEqual(['subject.pillars.day.value.branch', 'target.pillars.day.value.branch']);
    expect(result?.structural[0]?.otherFactPaths).toEqual(
      expect.arrayContaining([expect.objectContaining({
        subject: 'subject.pillars.year.value.branch',
        target: 'target.pillars.year.value.branch',
        kind: 'branch_clash',
        definitionContentHash: expect.stringMatching(/^[0-9a-f]{64}$/u),
      })]),
    );
    expect(result?.structural[0]?.paragraph).toContain('우선순위를 증명한');
    const mixed = result?.structural[0];
    expect(mixed?.dayFactValues.kind).toBe('branch_six_combination');
    expect(mixed?.paragraph).toContain('실제 일지 비교는 첫 번째 사람 ' +
      mixed?.dayFactValues.subject + '과 두 번째 사람 ' +
      mixed?.dayFactValues.target + '의 육합');
    expect(mixed?.paragraph).toContain('첫 번째 사람 연지');
    expect(mixed?.paragraph).toContain('두 번째 사람 연지');
    expect(mixed?.otherFactPaths.every(item =>
      mixed.paragraph.includes(item.subjectValue) &&
      mixed.paragraph.includes(item.targetValue))).toBe(true);
    expect(result?.structural[0]?.netRelationshipMeaning).toBeNull();
    expect(result?.interpersonalConclusion).toBeNull();
    expect(result?.maySell).toBe(false);
  });

  it('records the opposite configuration with exact cross-position source paths', () => {
    const result = run(A, CLASH_WITH_SUPPORT).crossMethodContrastResearch;
    expect(result?.structural[0]?.direction)
      .toBe('day_clash_with_other_six_combination');
    expect(result?.structural[0]?.otherFactPaths).toEqual(
      expect.arrayContaining([expect.objectContaining({
        subject: 'subject.pillars.year.value.branch',
        target: 'target.pillars.month.value.branch',
        kind: 'branch_six_combination',
      })]),
    );
    expect(result?.structural[0]?.conditionalPriorityEstablished).toBe(false);
    const mixed = result?.structural[0];
    expect(mixed?.dayFactValues.kind).toBe('branch_clash');
    expect(mixed?.paragraph).toContain('실제 일지 비교는 첫 번째 사람 ' +
      mixed?.dayFactValues.subject + '과 두 번째 사람 ' +
      mixed?.dayFactValues.target + '의 충');
    expect(mixed?.paragraph).toContain('첫 번째 사람 연지');
    expect(mixed?.paragraph).toContain('두 번째 사람 월지');
    expect(result?.compatibilityScore).toBeNull();
  });

  it('does not invent a competing palace factor when there is none', () => {
    const result = run(A, NO_OPPOSITION).crossMethodContrastResearch;
    expect(result?.structural).toEqual([]);
    expect(result?.historical.oppositeChartOutcomesEstablished).toBe(false);
    expect(result?.interpersonalConclusion).toBeNull();
  });

  it('attaches real sex-scoped T5 and conditional element inputs without classifying outcomes', () => {
    const output = run(
      birth(1990, 5, 15, 'male'), birth(1996, 6, 5, 'female'),
    );
    const result = output.crossMethodContrastResearch;
    const historical = result?.historical;
    const six = output.classicalCrossTenGodResearch;
    const useful = output.classicalUsefulElementResearch;
    expect(historical?.state).toBe('historical_male_female_scope_with_unsettled_conditions');
    expect(historical?.tenGodVisibleInputs).toHaveLength(2);
    expect(historical?.elementExampleInputs).toHaveLength(2);
    expect(historical?.tenGodVisibleInputs.find(item =>
      item.personRef === six?.male?.personRef)?.canonicalFactPaths)
      .toEqual(six?.male?.observed.map(item =>
        'subject.' + item.path));
    expect(historical?.elementExampleInputs[0]?.counterpartVisibleFactPaths)
      .toEqual((useful?.hypotheticalExamples[0]
        ?.counterpartVisibleRequiredElementPaths ?? []).concat(
        useful?.hypotheticalExamples[0]?.counterpartVisibleGeneratingElementPaths ?? [],
      ).filter((path, i, all) => all.indexOf(path) === i).map(path =>
        'target.' + path));
    expect(historical?.paragraph).toContain('상반된 궁합 결과가 입증된 것은 아닙니다');
    expect(historical?.paragraph).toContain('첫 번째 사람(고전 남성 역할 입력의 비견·겁재)');
    expect(historical?.paragraph).toContain('두 번째 사람(고전 여성 역할 입력의 식신·상관)');
    expect(historical?.paragraph).toContain(
      '보이는 항목 ' + six?.male?.countOfVisibleCanonicalTerms + '곳');
    expect(historical?.paragraph).toContain(
      '보이는 항목 ' + six?.female?.countOfVisibleCanonicalTerms + '곳');
    expect(historical?.paragraph).toContain('고전 남성 목왕·금 필요 예시');
    expect(historical?.paragraph).toContain('고전 여성 금강·화 선호 예시');
    expect(historical?.paragraph).toContain('십신 항목의 관측 개수는 원전의 중(重)·강약');
    expect(historical?.paragraph).toContain('실제 용신 선정');
    expect(historical?.sourceUrls).toEqual([
      six?.sources.traditional.url, six?.sources.challenge.url,
    ]);
    expect(historical?.oppositeChartOutcomesEstablished).toBe(false);
    expect(result?.unresolvedMethodPrerequisites)
      .toContain('TEN_GOD_STRENGTH_AND_HIDDEN_STEM_METHOD');
    expect(result?.compatibilityScore).toBeNull();
  });

  it('keeps role-limited method disagreement from becoming a modern relationship inference', () => {
    const result = run(A, SUPPORT_WITH_CLASH).crossMethodContrastResearch;
    expect(result?.historical.state).toBe('historical_role_scope_unmatched');
    expect(result?.historical.tenGodVisibleInputs).toEqual([]);
    expect(result?.historical.elementExampleInputs).toEqual([]);
    expect(result?.historical.oppositeChartOutcomesEstablished).toBe(false);
  });

  it('preserves each person and an unknown-hour gap when charts are reversed', () => {
    const first = birth(1990, 5, 15, 'male', false);
    const second = birth(1996, 6, 5, 'female');
    const forward = run(first, second).crossMethodContrastResearch;
    const reverse = run(second, first).crossMethodContrastResearch;
    expect(reverse?.subject.calculationHash).toBe(forward?.target.calculationHash);
    expect(reverse?.target.calculationHash).toBe(forward?.subject.calculationHash);
    expect(forward?.historical.tenGodVisibleInputs.find(item =>
      item.personRef === 'person-first')?.unresolvedFactPaths)
      .toContain('subject.derivedFacts.tenGods.hour.stem');
    expect(reverse?.historical.tenGodVisibleInputs.find(item =>
      item.personRef === 'person-second')?.unresolvedFactPaths)
      .toContain('target.derivedFacts.tenGods.hour.stem');
    expect(reverse?.historical.oppositeChartOutcomesEstablished).toBe(false);
    expect(forward?.historical.paragraph)
      .toContain('첫 번째 사람(고전 남성 역할 입력의 비견·겁재)');
    expect(reverse?.historical.paragraph)
      .toContain('두 번째 사람(고전 남성 역할 입력의 비견·겁재)');
    expect(forward?.historical.paragraph).toContain('미확정 위치 2곳');
    expect(reverse?.historical.paragraph).toContain('미확정 위치 2곳');
    expect(forward?.historical.paragraph).not.toContain('궁합 점수');
  });

  it('rejects foreign research identities and swapped structural paths', () => {
    const output = run(A, SUPPORT_WITH_CLASH);
    const [pair, coexisting, six, useful, axes] = inputs(output);
    expect(() => compareT10CrossMethodEvidenceV1(
      pair, {
        ...coexisting,
        target: { ...coexisting.target, calculationHash: 'wrong-hash' },
      }, six, useful, axes,
    )).toThrow('identical protected evidence');
    expect(() => compareT10CrossMethodEvidenceV1(
      pair, {
        ...coexisting,
        structural: {
          ...coexisting.structural,
          oppositeToDayFactor: coexisting.structural.oppositeToDayFactor.map(
            (item, i) => i === 0 ? {
              ...item,
              subject: { ...item.subject, value: '유' as never },
            } : item,
          ),
        },
      }, six, useful, axes,
    )).toThrow('exact original source entries');
  });

  it('does not touch original customer preview, issuance or selling flags', () => {
    const a = run(A, SUPPORT_WITH_CLASH, false);
    const b = run(A, SUPPORT_WITH_CLASH);
    expect(a.crossMethodContrastResearch).toBeUndefined();
    expect(b.crossMethodContrastResearch?.mayPublish).toBe(false);
    expect(b.crossMethodContrastResearch?.maySell).toBe(false);
    expect(a.html).toBe(b.html);
    expect(b.mayMarkMenuAvailable).toBe(false);
    expect(b.mayPersist).toBe(false);
    expect(b.maySell).toBe(false);
  });
});
