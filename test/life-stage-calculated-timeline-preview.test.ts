import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import type { ReadingRequest } from '../src/contracts/reading.js';
import {
  buildLifeStageCalculatedTimelinePreview,
  renderLifeStageCalculatedTimelineHtml,
} from '../src/preview/life-stage-calculated-timeline-preview.js';

const NOW = new Date('2026-10-21T00:00:00.000Z');
const request: ReadingRequest = {
  requestId: 'life-stage-calculated-demo-1',
  intent: { domain: 'life_stage', temporalScope: 'life_stage' },
};

function chart(day: number, sex: 'male' | 'female' | 'unspecified' = 'male', known = true) {
  return calculateCanonicalSajuSnapshot({
    calendarType: 'solar',
    date: { year: 1996, month: 1, day },
    time: known ? { known: true, hour: 9, minute: 30 } as const
      : { known: false } as const,
    sexForTraditionalCalculation: sex,
  }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
}

describe('source-honest life-stage calculation timeline', () => {
  it('shows precisely the engine returned luck-cycle starting ages, direction and pillars, never a prediction', () => {
    for (const date of [9, 11]) {
      const snapshot = chart(date);
      expect(snapshot.luckCycle.status).toBe('resolved');
      if (snapshot.luckCycle.status !== 'resolved') throw new Error('expected calculated cycle');
      const preview = buildLifeStageCalculatedTimelinePreview(snapshot, request);
      expect(preview.status).toBe('calculated_no_semantic_reading');
      expect(preview.snapshotId).toBe(snapshot.snapshotId);
      expect(preview.calculationHash).toBe(snapshot.calculationHash);
      expect(preview.startAge).toBe(snapshot.luckCycle.value.start.age);
      expect(preview.direction).toBe(snapshot.luckCycle.value.direction);
      expect(preview.entries).toHaveLength(snapshot.luckCycle.value.pillars.length);
      for (const [index, entry] of preview.entries.entries()) {
        const fact = snapshot.luckCycle.value.pillars[index]!;
        expect(entry.startAge).toBe(fact.age);
        expect(entry.pillarHanja).toBe(fact.pillar.stem.hanja + fact.pillar.branch.hanja);
        expect(entry.ageFactPath).toBe(`luckCycle.value.pillars[${index}].age`);
        expect(entry.pillarFactPath).toBe(`luckCycle.value.pillars[${index}].pillar`);
      }
      expect(preview.missing.join(' ')).toContain('T9 life_stage');
      expect(preview.researchOnly).toBe(true);
      expect(preview.usefulComplete).toBe(false);
      expect(preview.mayPublish).toBe(false);
      expect(preview.maySell).toBe(false);
      const html = renderLifeStageCalculatedTimelineHtml(preview);
      expect(html).toContain('계산된 대운 순서');
      expect(html).toContain('운명의 사건을 예측하지 않습니다');
      expect(html).toContain('아직 설명하지 못하는 부분');
      expect(buildLifeStageCalculatedTimelinePreview(snapshot, request)).toEqual(preview);
    }
  });

  it('does not invent cycle direction when sex policy is unspecified or birth time is missing', () => {
    for (const natal of [chart(9, 'unspecified'), chart(9, 'male', false)]) {
      const preview = buildLifeStageCalculatedTimelinePreview(natal, request);
      expect(preview.status).toBe('insufficient_calculation');
      expect(preview.entries).toHaveLength(0);
      expect(preview.direction).toBeUndefined();
      expect(preview.startAge).toBeUndefined();
      expect(preview.missing.length).toBeGreaterThan(1);
      expect(renderLifeStageCalculatedTimelineHtml(preview)).toContain('대운 순서를 표시할 수 없습니다');
    }
  });

  it('keeps reversed and forward policy inputs chart-specific and requires the exact life-stage intent', () => {
    const male = chart(9, 'male');
    const female = chart(9, 'female');
    const x = buildLifeStageCalculatedTimelinePreview(male, request);
    const y = buildLifeStageCalculatedTimelinePreview(female, request);
    expect(x.calculationHash).not.toBe(y.calculationHash);
    expect(x.entries.map(e => e.pillarHanja)).toEqual(
      male.luckCycle.status === 'resolved'
        ? male.luckCycle.value.pillars.map(e => e.pillar.stem.hanja + e.pillar.branch.hanja)
        : [],
    );
    expect(y.entries.map(e => e.pillarHanja)).toEqual(
      female.luckCycle.status === 'resolved'
        ? female.luckCycle.value.pillars.map(e => e.pillar.stem.hanja + e.pillar.branch.hanja)
        : [],
    );
    expect(() => buildLifeStageCalculatedTimelinePreview(male, {
      ...request, intent: { domain: 'general', temporalScope: 'natal' },
    })).toThrow();
    expect(() => buildLifeStageCalculatedTimelinePreview(male, {
      ...request, requestId: '   ',
    })).toThrow();
  });
});
