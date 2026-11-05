import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import type { ReadingRequest } from '../src/contracts/reading.js';
import {
  buildCompatibilityTwoChartIntakePreview,
  renderCompatibilityTwoChartIntakeHtml,
} from '../src/preview/compatibility-two-chart-intake-preview.js';

const now = new Date('2026-10-19T00:00:00.000Z');
function chart(day: number, birthTimeKnown = true) {
  return calculateCanonicalSajuSnapshot({
    calendarType: 'solar',
    date: { year: 1996, month: 1, day },
    time: birthTimeKnown ? { known: true, hour: 9, minute: 30 } as const
      : { known: false } as const,
    sexForTraditionalCalculation: 'unspecified',
  }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now });
}

const request: ReadingRequest = {
  requestId: 'compatibility-intake-1',
  intent: { domain: 'compatibility', temporalScope: 'natal' },
  targetPersonRef: 'target-1',
};

describe('source-bounded two-person compatibility calculation intake', () => {
  it('keeps the exact identities and calculated four pillars of TWO independent births, without T10 predictions', () => {
    const first = chart(9);
    const second = chart(11);
    const x = buildCompatibilityTwoChartIntakePreview(
      request, { personRef: 'subject-1', snapshot: first },
      { personRef: 'target-1', snapshot: second });
    expect(x.requestId).toBe(request.requestId);
    expect(x.subject.snapshotId).toBe(first.snapshotId);
    expect(x.target.snapshotId).toBe(second.snapshotId);
    expect(x.subject.calculationHash).toBe(first.calculationHash);
    expect(x.target.calculationHash).toBe(second.calculationHash);
    expect(x.subject.calculationHash).not.toBe(x.target.calculationHash);
    expect(x.subject.pillars).toHaveLength(4);
    expect(x.target.pillars).toHaveLength(4);
    expect(x.subject.pillars.map(p => p.slot)).toEqual(['year','month','day','hour']);
    for (const [observed, snapshot] of [[x.subject, first], [x.target, second]] as const) {
      for (const pillar of observed.pillars) {
        const fact = snapshot.pillars[pillar.slot];
        expect(fact.status).toBe('resolved');
        if (fact.status === 'resolved') {
          expect(pillar.stemHanja).toBe(fact.value.stem.hanja);
          expect(pillar.branchHanja).toBe(fact.value.branch.hanja);
          expect(pillar.factPath).toBe(`pillars.${pillar.slot}.value`);
        }
      }
    }
    expect(x.mode).toBe('two_person_calculation_only');
    expect(x.readingStatus).toBe('insufficient_interpersonal_meaning_authority');
    expect(x.missing.join(' ')).toContain('T10');
    expect(x.researchOnly).toBe(true);
    expect(x.usefulComplete).toBe(false);
    expect(x.mayPublish).toBe(false);
    expect(x.maySell).toBe(false);
    const html = renderCompatibilityTwoChartIntakeHtml(x);
    expect(html).toContain('두 사람의 명식 확인');
    expect(html).toContain('궁합 해석은 아직 제공할 수 없습니다');
    expect(html).toContain('첫 번째 명식');
    expect(html).toContain('두 번째 명식');
    expect(html).not.toContain('궁합 점수:');
    expect(buildCompatibilityTwoChartIntakePreview(
      request, { personRef: 'subject-1', snapshot: first },
      { personRef: 'target-1', snapshot: second },
    )).toEqual(x);
  });

  it('renders each exact calculated overlap and difference as facts, not relational predictions', () => {
    const first = chart(9);
    const second = chart(11);
    const result = buildCompatibilityTwoChartIntakePreview(
      request, { personRef: 'subject-1', snapshot: first },
      { personRef: 'target-1', snapshot: second });
    expect(result.comparisons.map(item => item.slot)).toEqual([
      'year', 'month', 'day', 'hour',
    ]);
    for (const [index, comparison] of result.comparisons.entries()) {
      const left = result.subject.pillars[index]!;
      const right = result.target.pillars[index]!;
      expect(comparison.subjectFactPath).toBe(left.factPath);
      expect(comparison.targetFactPath).toBe(right.factPath);
      expect(comparison.subjectObserved).toBe(left.stemHanja! + left.branchHanja!);
      expect(comparison.targetObserved).toBe(right.stemHanja! + right.branchHanja!);
      expect(comparison.observation).toBe(
        comparison.subjectObserved === comparison.targetObserved
          ? 'same_calculated_pillar' : 'different_calculated_pillar',
      );
      expect(comparison.explanation).toContain('궁합의 좋고 나쁨을 뜻하지 않습니다');
    }
    expect(result.comparisons.some(x => x.observation === 'different_calculated_pillar'))
      .toBe(true);
    const html = renderCompatibilityTwoChartIntakeHtml(result);
    expect(html).toContain('두 명식에서 계산된 차이');
    expect(html).toContain('궁합 점수·관계 결과는 아닙니다');
    for (const item of result.comparisons) expect(html).toContain(item.explanation);
    expect(result.readingStatus).toBe('insufficient_interpersonal_meaning_authority');
    expect(result.maySell).toBe(false);
  });

  it('keeps equal actual charts equal, and never compares an unknown hour', () => {
    const first = chart(9);
    const identical = buildCompatibilityTwoChartIntakePreview(
      request, { personRef: 'subject-1', snapshot: first },
      { personRef: 'target-1', snapshot: first });
    expect(identical.comparisons.every(x =>
      x.observation === 'same_calculated_pillar')).toBe(true);
    expect(identical.comparisons).toHaveLength(4);
    const unknown = buildCompatibilityTwoChartIntakePreview(
      request, { personRef: 'subject-1', snapshot: first },
      { personRef: 'target-1', snapshot: chart(11, false) });
    expect(unknown.comparisons[3]!.observation).toBe('insufficient_input');
    expect(unknown.comparisons[3]!.targetObserved).toBeUndefined();
    expect(unknown.comparisons[3]!.explanation).toContain('비교하지 않습니다');
    expect(renderCompatibilityTwoChartIntakeHtml(unknown))
      .toContain(unknown.comparisons[3]!.explanation);
    expect(() => renderCompatibilityTwoChartIntakeHtml({
      ...unknown,
      comparisons: unknown.comparisons.map((x, index) =>
        index === 3 ? { ...x, observation: 'same_calculated_pillar' } : x),
    })).toThrow('comparison must repeat exact two-person');
    expect(buildCompatibilityTwoChartIntakePreview(
      request, { personRef: 'subject-1', snapshot: first },
      { personRef: 'target-1', snapshot: chart(11, false) }))
      .toEqual(unknown);
  });

  it('shows the second person\'s missing hour as unavailable without copying the first person\'s hour', () => {
    const x = buildCompatibilityTwoChartIntakePreview(
      request, { personRef: 'subject-1', snapshot: chart(9) },
      { personRef: 'target-1', snapshot: chart(11, false) });
    expect(x.subject.pillars[3]?.status).toBe('resolved');
    expect(x.target.pillars[3]?.status).toBe('unavailable');
    expect(x.target.pillars[3]?.stemHanja).toBeUndefined();
    expect(x.missing.join(' ')).toContain('두 번째 사람의 출생시각 미상');
  });

  it('rejects self pairing and wrong target, but allows distinct people who happen to have identical charts', () => {
    const same = chart(9);
    expect(() => buildCompatibilityTwoChartIntakePreview(
      request, { personRef: 'target-1', snapshot: same },
      { personRef: 'target-1', snapshot: same },
    )).toThrow();
    expect(() => buildCompatibilityTwoChartIntakePreview(
      request, { personRef: 'subject-1', snapshot: same },
      { personRef: 'some-other-person', snapshot: chart(11) },
    )).toThrow();
    const valid = buildCompatibilityTwoChartIntakePreview(
      request, { personRef: 'subject-1', snapshot: same },
      { personRef: 'target-1', snapshot: same },
    );
    expect(valid.subject.calculationHash).toBe(valid.target.calculationHash);
    expect(valid.readingStatus).toBe('insufficient_interpersonal_meaning_authority');
    expect(() => buildCompatibilityTwoChartIntakePreview(
      { ...request, intent: { domain: 'general', temporalScope: 'natal' } },
      { personRef: 'subject-1', snapshot: same },
      { personRef: 'target-1', snapshot: chart(11) },
    )).toThrow();
  });
});
