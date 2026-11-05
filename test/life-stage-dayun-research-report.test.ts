import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { resolveDayunTemporalContext } from '../src/reading/dayun-temporal-context.js';
import {
  buildLifeStageDayunResearchReport,
  renderLifeStageDayunResearchHtml,
} from '../src/preview/life-stage-dayun-research-report.js';

const NOW = new Date('2026-09-03T13:00:00.000Z');
function natal(year = 1990, timeKnown = true, sex = 'male' as const) {
  return calculateCanonicalSajuSnapshot({
    calendarType: 'solar', date: { year, month: 5, day: 15 },
    time: timeKnown ? { known: true as const, hour: 14, minute: 30 }
      : { known: false as const },
    sexForTraditionalCalculation: sex,
  }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
}

describe('life stage bounded Canonical Dayun fact reader', () => {
  it('turns real calculated Dayun period boundaries into a readable but non-semantic Korean preview', () => {
    const snapshot = natal();
    const report = buildLifeStageDayunResearchReport(snapshot, '2030-06-01T12:00:00+09:00');
    expect(report.snapshotId).toBe(snapshot.snapshotId);
    expect(report.calculationHash).toBe(snapshot.calculationHash);
    expect(report.coverage).toBe('calculated_only');
    expect(report.interpretationStatus).toBe('source_authority_not_established');
    const source = resolveDayunTemporalContext(snapshot, 2030);
    expect(source.status).toBe('resolved');
    if (source.status !== 'resolved') return;
    const segment = source.segments.find(x =>
      x.startLocalDateTime <= report.referenceLocalDateTime &&
      report.referenceLocalDateTime < x.endExclusiveLocalDateTime);
    expect(segment).toBeDefined();
    expect(report.periods[0]).toMatchObject({
      kind: 'current', cycleIndex: segment?.index,
      startsAt: segment?.startLocalDateTime,
      endsAtExclusive: segment?.endExclusiveLocalDateTime,
    });
    expect(report.periods[0]?.text).toContain('명식');
    expect(report.periods[0]?.text).toContain('계산');
    expect(report.periods.some(p => p.kind === 'next')).toBe(true);
    const current = report.periods.find(p => p.kind === 'current')!;
    const next = report.periods.find(p => p.kind === 'next')!;
    expect(next.startsAt).toBe(current.endsAtExclusive);
    expect(next.cycleIndex).toBe(current.cycleIndex + 1);
    expect(report.transitionSummary).toContain(current.pillar);
    expect(report.transitionSummary).toContain(next.pillar);
    expect(report.transitionSummary).toContain(current.endsAtExclusive);
    expect(report.transitionSummary).toContain('계산 사실');
    expect(report.transitionSummary).toContain('삶의 변화·길흉·사건 발생을 뜻하지 않습니다');
    const html = renderLifeStageDayunResearchHtml(report);
    expect(html).toContain('aria-label="현재와 다음 대운의 계산 전환"');
    expect(html).toContain(report.transitionSummary!);
    expect(html).toContain('지금의 계산 구간');
    expect(html).toContain('다음 계산 구간');
    expect(html).toContain(report.periods[0]!.pillar);
    expect(html).toContain(report.policyId);
    expect(html).toContain('공식 공개·저장·판매');
  });

  it('selects the next Canonical period precisely at the half-open local boundary', () => {
    const snapshot = natal();
    const base = buildLifeStageDayunResearchReport(snapshot, '2030-06-01T12:00:00+09:00');
    const current = base.periods[0];
    const next = base.periods.find(x => x.kind === 'next');
    expect(current).toBeDefined();
    expect(next).toBeDefined();
    if (!current || !next) return;
    const boundary = current.endsAtExclusive + '+09:00';
    const minuteBefore = new Date(new Date(boundary).getTime() - 60000).toISOString();
    const before = buildLifeStageDayunResearchReport(snapshot, minuteBefore);
    const after = buildLifeStageDayunResearchReport(snapshot, boundary);
    expect(before.periods[0]?.cycleIndex).toBe(current.cycleIndex);
    expect(after.periods[0]?.cycleIndex).toBe(next.cycleIndex);
    expect(after.periods[0]?.startsAt).toBe(next.startsAt);
    expect(after.periods[0]?.text).not.toEqual(before.periods[0]?.text);
  });

  it('changes chart-specific calculated interval and preserves same-chart determinism', () => {
    const source = natal();
    const original = buildLifeStageDayunResearchReport(source, '2030-06-01T12:00+09:00');
    const replay = buildLifeStageDayunResearchReport(source, '2030-06-01T03:00:00Z');
    const changed = buildLifeStageDayunResearchReport(natal(1991), '2030-06-01T12:00+09:00');
    expect(replay).toEqual(original);
    expect(changed.snapshotId).not.toBe(original.snapshotId);
    expect(changed.periods[0]?.startsAt).not.toBe(original.periods[0]?.startsAt);
  });

  it('does not invent a life-stage reading if time or canonical Dayun is unavailable', () => {
    const unknown = buildLifeStageDayunResearchReport(
      natal(1990, false), '2030-06-01T12:00+09:00',
    );
    expect(unknown.coverage).toBe('unavailable');
    expect(unknown.periods).toHaveLength(0);
    expect(unknown.transitionSummary).toBeUndefined();
    expect(renderLifeStageDayunResearchHtml(unknown))
      .not.toContain('현재와 다음 대운의 계산 전환');
    expect(unknown.missing.join(' ')).toContain('대운 계산');
    expect(unknown.researchOnly).toBe(true);
    expect(unknown.usefulComplete).toBe(false);
    expect(unknown.mayPublish).toBe(false);
    expect(unknown.maySell).toBe(false);
    expect(unknown.status).toBe('not_official_reading');
    expect(unknown.interpretationStatus).toBe('source_authority_not_established');
  });

  it('requires an exact offset-bearing reference date rather than guessing a time zone', () => {
    const source = natal();
    expect(() => buildLifeStageDayunResearchReport(source, '2030-06-01T12:00'))
      .toThrow('explicit UTC offset');
    expect(() => buildLifeStageDayunResearchReport(source, 'not-a-date'))
      .toThrow();
  });
});
