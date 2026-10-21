import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  buildFamilyCanonicalObservationPreview,
  renderFamilyCanonicalObservationHtml,
} from '../src/preview/family-parents-children-observation-preview.js';

const NOW = new Date('2026-09-03T13:00:00.000Z');
function natal(year = 1990, hour: number | undefined = 14) {
  return calculateCanonicalSajuSnapshot({
    calendarType: 'solar', date: { year, month: 5, day: 15 },
    time: hour === undefined
      ? { known: false as const }
      : { known: true as const, hour, minute: 30 },
    sexForTraditionalCalculation: 'unspecified',
  }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
}

describe('bounded parent/child family observation consumer preview', () => {
  it('shows the two different parent historical chart observations without upgrading them to family meaning', () => {
    const chart = natal();
    const report = buildFamilyCanonicalObservationPreview(chart, 'parents');
    expect(report.scope).toBe('parents');
    expect(report.snapshotId).toBe(chart.snapshotId);
    expect(report.calculationHash).toBe(chart.calculationHash);
    expect(report.observations.map(x => x.factPath)).toEqual(['pillars.year', 'pillars.month']);
    expect(report.observations.map(x => x.observedPillar)).toEqual([
      chart.pillars.year.status === 'resolved'
        ? chart.pillars.year.value.stem.value + chart.pillars.year.value.branch.value : undefined,
      chart.pillars.month.status === 'resolved'
        ? chart.pillars.month.value.stem.value + chart.pillars.month.value.branch.value : undefined,
    ]);
    expect(report.observationCoverage).toBe('calculated_fact_only');
    expect(report.interpretationCoverage).toBe('insufficient_evidence');
    expect(report.introduction).toContain('부모');
    expect(report.introduction).toContain('연·월주');
    expect(report.historicalLayerIds).toContain('PILLAR-DOMAIN-MALE-ALTERNATE');
    expect(report.historicalLayerIds).not.toContain('FEMALE-CHILD-RELATION');
    const html = renderFamilyCanonicalObservationHtml(report);
    expect(html).toContain(report.headline);
    expect(html).toContain('pillars.year');
    expect(html).toContain('pillars.month');
    expect(html).toContain('아직 해석할 수 없는 부분');
    expect(html).toContain('공개·저장·판매 권한이 없습니다');
  });

  it('shows the child-specific hour pillar instead of reusing generic parent text', () => {
    const chart = natal();
    const parents = buildFamilyCanonicalObservationPreview(chart, 'parents');
    const children = buildFamilyCanonicalObservationPreview(chart, 'children');
    expect(children.scope).toBe('children');
    expect(children.observations.map(x => x.factPath)).toEqual(['pillars.hour']);
    expect(children.observations[0]?.observedPillar).toBe(
      chart.pillars.hour.status === 'resolved'
        ? chart.pillars.hour.value.stem.value + chart.pillars.hour.value.branch.value : undefined,
    );
    expect(children.introduction).toContain('자녀');
    expect(children.historicalLayerIds).toContain('FEMALE-CHILD-RELATION');
    expect(children.historicalLayerIds).not.toContain('PILLAR-DOMAIN-MALE-ALTERNATE');
    expect(children.observations[0]?.text).not.toEqual(parents.observations[0]?.text);
    expect(children.usefulComplete).toBe(false);
    expect(children.researchOnly).toBe(true);
    expect(children.mayPublish).toBe(false);
    expect(children.maySell).toBe(false);
  });

  it('changes observed facts only where the actual Canonical chart changes and replays identically', () => {
    const originalChart = natal();
    const original = buildFamilyCanonicalObservationPreview(originalChart, 'parents');
    const replay = buildFamilyCanonicalObservationPreview(originalChart, 'parents');
    const another = buildFamilyCanonicalObservationPreview(natal(1991), 'parents');
    expect(replay).toEqual(original);
    expect(another.snapshotId).not.toEqual(original.snapshotId);
    expect(another.observations[0]?.observedPillar)
      .not.toEqual(original.observations[0]?.observedPillar);

    const morning = buildFamilyCanonicalObservationPreview(natal(1990, 9), 'children');
    const afternoon = buildFamilyCanonicalObservationPreview(natal(1990, 14), 'children');
    expect(morning.observations[0]?.observedPillar)
      .not.toEqual(afternoon.observations[0]?.observedPillar);
  });

  it('does not invent a child birth-hour fact when the original birth hour is missing', () => {
    const chart = natal(1990, undefined);
    const child = buildFamilyCanonicalObservationPreview(chart, 'children');
    expect(child.observationCoverage).toBe('insufficient_input');
    expect(child.observations[0]?.observedPillar).toBeUndefined();
    expect(child.observations[0]?.state).not.toBe('resolved');
    expect(child.interpretationCoverage).toBe('insufficient_evidence');
    expect(child.missing).toEqual(expect.arrayContaining([
      expect.stringContaining('확정되지 않았습니다'),
    ]));
    expect(child.status).toBe('not_official_reading');
    expect(child.mayPublish).toBe(false);
    expect(child.maySell).toBe(false);

    const parent = buildFamilyCanonicalObservationPreview(chart, 'parents');
    expect(parent.observations.some(x => x.state === 'resolved')).toBe(true);
    expect(parent.interpretationCoverage).toBe('insufficient_evidence');
  });

  it('rejects unspecified family scope and makes no T8 interpretation claim', () => {
    const chart = natal();
    expect(() => buildFamilyCanonicalObservationPreview(
      chart, 'general' as 'parents',
    )).toThrow('explicitly select parents or children');
    for (const scope of ['parents', 'children'] as const) {
      const report = buildFamilyCanonicalObservationPreview(chart, scope);
      expect(report.missing.join(' ')).toContain('T8 해석 Claim');
      expect(report.limitations.join(' ')).toContain('판정 규칙이 아닙니다');
      expect(report).not.toHaveProperty('claimId');
    }
  });
});
