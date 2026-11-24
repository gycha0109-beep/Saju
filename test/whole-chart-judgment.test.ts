import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type { BirthInput } from '../src/contracts/calculation.js';
import { judgeWholeChart } from '../src/interpretation/whole-chart-judgment.js';
import {
  requireWholeChartJudgment,
  runInterpretation,
} from '../src/interpretation/interpretation-engine.js';
import { createCareerMultifactorResearchRegistry } from '../src/research/career-natal-multifactor-candidate.js';
import { buildThreeTemporalMenusBirthReading } from '../src/preview/three-temporal-menus-birth-reading.js';
import { runNatalS6QualityRegression } from '../src/preview/natal-five-domain-quality-regression.js';
import {
  buildWholeChartNatalReading,
  currentWholeChartWindow,
} from '../src/preview/whole-chart-reading.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { judgeWholeChartPeriods } from '../src/reading/whole-chart-periods.js';

const NOW = '2026-06-15T00:00:00.000Z';

function birth(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  sex: 'male' | 'female' = 'female',
): BirthInput {
  return {
    calendarType: 'solar',
    date: { year, month, day },
    time: { known: true, hour, minute },
    sexForTraditionalCalculation: sex,
  };
}

function snapshot(input: BirthInput) {
  return calculateCanonicalSajuSnapshot(input, PRODUCTION_DEFAULT_CALCULATION_POLICY, {
    now: new Date(NOW),
  });
}

function observed(input: BirthInput) {
  const judgment = judgeWholeChart(snapshot(input));
  if (judgment.state !== 'observed') throw new Error('Expected a resolved month and day master.');
  return judgment;
}

describe('whole-chart interpretation by structural context', () => {
  it('binds the common judgment to the same verified interpretation run and calculation', () => {
    const first = snapshot(birth(1992, 6, 25, 22, 40, 'male'));
    const second = snapshot(birth(1969, 10, 1, 3, 5));
    const registry = createCareerMultifactorResearchRegistry();
    const execution = runInterpretation(first, registry, { now: new Date(NOW) });
    expect(requireWholeChartJudgment(first, execution)).toEqual(judgeWholeChart(first));
    expect(() => requireWholeChartJudgment(second, execution)).toThrow(
      /same successful interpretation run/u,
    );
    expect(runInterpretation(first, registry, { now: new Date(NOW) }).run.runHash).toBe(
      execution.run.runHash,
    );
  });
  it('changes the underlying interpretation when the visible Ten-God sequence is identical', () => {
    const first = birth(1992, 6, 25, 22, 40, 'male');
    const second = birth(1969, 10, 1, 3, 5);
    const a = observed(first);
    const b = observed(second);
    const visible = (chart: typeof a) =>
      chart.positions.filter((pos) => pos.location === 'visible').map((pos) => pos.god);
    expect(visible(a)).toEqual(['비견', '편재', '정인']);
    expect(visible(a)).toEqual(visible(b));
    expect(a.month.branch).not.toBe(b.month.branch);
    expect(a.pattern.state).toBe('competing_month_signals');
    expect(b.pattern.state).toBe('challenged');
    expect(a.strength.state).toBe('contested_roots');
    expect(b.strength.state).toBe('roots_offset_season');
    const profile = (input: BirthInput) =>
      buildWholeChartNatalReading(snapshot(input), 'wealth', NOW).semanticKey;
    expect(profile(first)).not.toEqual(profile(second));
  });

  it('distinguishes two charts with the same Hurting Officer anchor using counterevidence', () => {
    const compatible = birth(2004, 8, 10, 7, 55);
    const contested = birth(1984, 9, 11, 1, 24);
    const good = observed(compatible);
    const other = observed(contested);
    expect(good.pattern.anchor?.god).toBe('상관');
    expect(other.pattern.anchor?.god).toBe('상관');
    expect(good.pattern.state).toBe('supported');
    expect(other.pattern.state).toBe('challenged');
    expect(good.roles.xi.length).toBeGreaterThan(0);
    expect(other.roles.xi).toEqual([]);
    expect(good.pattern.evidence.paths).toContain(good.pattern.anchor?.path);
    expect(other.pattern.disrupting.length + other.pattern.challenges.length).toBeGreaterThan(0);
    for (const domain of ['career', 'business', 'wealth', 'relationship'] as const) {
      const reading = buildWholeChartNatalReading(snapshot(compatible), domain, NOW);
      expect(reading.judgmentId).toBe(good.judgmentId);
      expect(reading.semanticKey).not.toEqual(
        buildWholeChartNatalReading(snapshot(contested), domain, NOW).semanticKey,
      );
      expect(reading.paragraphs.join(' ')).toContain('뒷받침합니다');
    }
  });

  it('keeps a remedy candidate and the opposition visible without resolving contested roles', () => {
    const input = birth(1990, 12, 7, 12, 45, 'male');
    const chart = observed(input);
    expect(chart.pattern.state).toBe('repair_under_review');
    expect(chart.pattern.challenges.length).toBeGreaterThan(0);
    expect(chart.pattern.remedies.length).toBeGreaterThan(0);
    expect(chart.roles.xi).toEqual([]);
    expect(observed(input)).toEqual(chart);
  });

  it('preserves verified positions without inferring an unknown hour or a spouse star from missing input', () => {
    const input = {
      ...birth(1998, 3, 28, 22, 19),
      time: { known: false as const },
      sexForTraditionalCalculation: 'unspecified' as const,
    };
    const chart = observed(input);
    expect(chart.allResolved).toBe(false);
    expect(chart.pattern.state).toBe('unresolved');
    expect(chart.positions.every((item) => item.slot !== 'hour')).toBe(true);
    expect(chart.themes.relationship.spouseWitnesses).toEqual([]);
    expect(
      judgeWholeChartPeriods(snapshot(input), chart, 2026).windows.every(
        (item) => item.direction === 'held',
      ),
    ).toBe(true);
  });

  it('uses both the Ipchun boundary and the exact June Dayun transition in annual and monthly results', () => {
    const input = birth(1996, 4, 5, 10, 36);
    const result = buildThreeTemporalMenusBirthReading(input, {
      requestId: 'whole-chart-boundaries',
      targetYear: 2026,
      targetMonth: 6,
      referenceDateTime: NOW,
    });
    const { annualChartReading, monthlyChartReading } = result.annualMonthly.report;
    expect(annualChartReading.map((item) => [item.effectiveYear, item.dayunIndex])).toEqual([
      [2025, 2],
      [2026, 2],
      [2026, 3],
    ]);
    const lastWindow = annualChartReading.at(-1)!;
    expect(lastWindow.startsAt).toBe('2026-06-13T01:36:00.000Z');
    expect(monthlyChartReading.map((item) => [item.monthSegment, item.dayunIndex])).toEqual([
      ['before_jeol', 2],
      ['after_jeol', 2],
      ['after_jeol', 3],
    ]);
    expect(monthlyChartReading.at(-1)?.startsAt).toBe(lastWindow.startsAt);
    expect(monthlyChartReading.at(-2)?.endsAt).toBe(lastWindow.startsAt);
    expect(monthlyChartReading.at(-1)?.text).toContain('이 구간의 월운');
    expect(result.html).toContain(lastWindow.text);
    expect(
      result.annualMonthly.monthlyMenu.referenceFocus?.currentSection?.chartWindows,
    ).toHaveLength(2);
    expect(result.annualMonthly.monthlyMenu.referenceFocus?.currentChartWindow?.dayunIndex).toBe(3);
    expect(
      currentWholeChartWindow(monthlyChartReading, '2026-06-13T01:35:59.999Z')?.dayunIndex,
    ).toBe(2);
    expect(
      currentWholeChartWindow(monthlyChartReading, '2026-06-13T01:36:00.000Z')?.dayunIndex,
    ).toBe(3);
    expect(result.mayGrantOfficialAuthority).toBe(false);
  });

  it('renders integrated conclusions in the four existing natal articles', () => {
    const example = runNatalS6QualityRegression().cases[0]!.html;
    for (const domain of ['career', 'business', 'wealth', 'relationship']) {
      const article = example
        .split(`aria-labelledby="domain-${domain}"`)[1]
        ?.split('</article>')[0];
      expect(article).toContain('명식 전체에서 읽는 결론');
      expect(article).toContain('판단 근거');
    }
  });
});
