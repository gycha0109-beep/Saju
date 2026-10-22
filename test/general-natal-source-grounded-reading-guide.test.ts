import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { createGeneralNatalMultifactorRegistry } from '../src/research/general-natal-multifactor-candidate.js';
import { buildGeneralNatalMultifactorReport } from '../src/preview/general-natal-multifactor-report.js';

const NOW = new Date('2026-10-19T00:00:00.000Z');
const registry = createGeneralNatalMultifactorRegistry();

function run(month: number, day: number, known = true) {
  const snapshot = calculateCanonicalSajuSnapshot({
    calendarType: 'solar',
    date: { year: 2024, month, day },
    time: known ? { known: true as const, hour: 12, minute: 0 } :
      { known: false as const },
    sexForTraditionalCalculation: 'unspecified',
  }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
  const execution = runInterpretation(snapshot, registry, { now: NOW });
  return { snapshot, report: buildGeneralNatalMultifactorReport(snapshot, execution, registry) };
}

describe('General natal source-qualified Korean integrated reading', () => {
  it('links the actual selected core and genuinely independent supporting positions into a user-readable General introduction', () => {
    const { snapshot, report } = run(3, 10);
    expect(report.snapshotId).toBe(snapshot.snapshotId);
    expect(report.readingGuide).toBeDefined();
    const guide = report.readingGuide!;
    expect(report.sections.length).toBeGreaterThan(0);
    expect(guide.sourceClaimType).toBe(report.sections[0]?.claimType);
    expect(guide.paragraph).toContain(report.sections[0]!.headline);
    expect(guide.paragraph).toContain(report.sections[0]!.paragraph);
    expect(report.introduction).toContain(guide.paragraph);
    expect(guide.sourceIds).toEqual([
      ...new Set(report.sections.flatMap(section => section.sourceIds)),
    ]);
    expect(guide.ruleIds).toEqual([
      ...new Set(report.sections.map(section => section.ruleId)),
    ]);
    expect(guide.supporting).toHaveLength(
      report.sections[0]?.axis === 'tension' ? 0 : report.sections.length - 1,
    );
    const actualPaths = new Set(report.sections[0]!.observedFactPaths);
    const axes = new Set([report.sections[0]!.axis]);
    for (const [index, support] of guide.supporting.entries()) {
      const original = report.sections[index + 1]!;
      expect(original.claimType).toBe(support.claimType);
      expect(original.headline).toBe(support.headline);
      expect(axes.has(original.axis)).toBe(false);
      expect(support.distinctObservedPositions.length).toBeGreaterThan(0);
      expect(support.distinctObservedPositions).toHaveLength(
        support.distinctObservedFactPaths.length,
      );
      for (const [position, path] of support.distinctObservedPositions.map(
        (position, i) => [position, support.distinctObservedFactPaths[i]!] as const,
      )) {
        expect(actualPaths.has(path)).toBe(false);
        expect(original.observedFactPaths.includes(path)).toBe(true);
        expect(original.observedPositions.includes(position)).toBe(true);
        expect(guide.paragraph).toContain(position);
        actualPaths.add(path);
      }
      axes.add(original.axis);
    }
    expect(report.researchOnly).toBe(true);
    expect(report.mayPublish).toBe(false);
    expect(report.maySell).toBe(false);
    expect(report.usefulComplete).toBe(false);
  });

  it('does not manufacture two supporting claims when only a partial core is available', () => {
    const values = [run(3, 10), run(4, 12), run(7, 23)];
    for (const { report } of values) {
      const guide = report.readingGuide;
      if (guide === undefined) {
        expect(report.sections).toHaveLength(0);
        continue;
      }
      if (report.sections[0]?.axis === 'tension') {
        expect(report.state).toBe('partial');
        expect(guide.supporting).toHaveLength(0);
        expect(guide.paragraph).toContain('원국 전체를 대표하는 중심 결론');
      } else if (guide.supporting.length < 2) {
        expect(guide.paragraph).toContain('보조 구조');
        expect(guide.paragraph).toContain('부족');
      } else {
        expect(guide.paragraph).toContain('서로 다른 계산 위치');
      }
      expect(guide.paragraph).not.toContain('반드시 성공');
      expect(guide.paragraph).not.toContain('결혼 시기 확정');
    }
  });

  it('replays exactly and varies actual Korean whole-chart focus with the observed natal structure', () => {
    const first = run(3, 10);
    expect(run(3, 10).report).toEqual(first.report);
    const candidates = [run(4, 12), run(5, 17), run(7, 23), run(2, 3)];
    const different = candidates.find(x => x.report.readingGuide !== undefined &&
      x.report.readingGuide.sourceClaimType !== first.report.readingGuide?.sourceClaimType);
    expect(different).toBeDefined();
    if (!different) return;
    expect(different.report.calculationHash).not.toBe(first.report.calculationHash);
    expect(different.report.readingGuide?.paragraph)
      .not.toBe(first.report.readingGuide?.paragraph);
    expect(different.report.readingGuide?.sourceClaimType)
      .not.toBe(first.report.readingGuide?.sourceClaimType);
    expect(different.report.introduction)
      .not.toBe(first.report.introduction);
  });

  it('refuses to claim any T8 General meaning when the birth hour is unavailable', () => {
    const a = run(3, 10, false);
    expect(a.snapshot.derivedFacts.tenGods.status).toBe('unavailable');
    expect(a.report.sections).toHaveLength(0);
    expect(a.report.readingGuide).toBeUndefined();
    expect(a.report.state).toBe('insufficient');
    expect(a.report.introduction).toContain('출생시각이 없어도 확인 가능한');
    expect(a.report.introduction).not.toContain('이번 명식의 중심 구조는');
    expect(a.report.mayPublish).toBe(false);
    expect(a.report.usefulComplete).toBe(false);
  });
});
