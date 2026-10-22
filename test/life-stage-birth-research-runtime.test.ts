import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../src/production/production-calculation-runtime.js';
import { buildLifeStageDayunResearchReport } from '../src/preview/life-stage-dayun-research-report.js';
import { buildLifeStageBirthResearchReading } from '../src/preview/life-stage-birth-research-runtime.js';

const REFERENCE = '2030-06-01T03:00:00.000Z';
const BIRTH: BirthInput = {
  calendarType: 'solar',
  date: { year: 1990, month: 5, day: 15 },
  time: { known: true, hour: 14, minute: 30 },
  sexForTraditionalCalculation: 'male',
};

describe('actual birth → exact current/next Dayun timeline without unsupported meaning', () => {
  it('matches the existing Canonical fact report and produces user-readable Korean periods', () => {
    const result = buildLifeStageBirthResearchReading(BIRTH, REFERENCE);
    const { snapshot } = calculateAuthorizedMyeonghwaProductionSnapshot(
      BIRTH, { now: new Date(REFERENCE) },
    );
    const original = buildLifeStageDayunResearchReport(snapshot, REFERENCE);
    expect(result.report).toEqual(original);
    expect(result.lifecycle).toBe('internal_research_only');
    expect(result.interpretationStatus).toBe('source_authority_not_established');
    expect(result.mayGrantOfficialAuthority).toBe(false);
    expect(result.mayPublish).toBe(false);
    expect(result.maySell).toBe(false);
    expect(result.report.coverage).toBe('calculated_only');
    expect(result.report.periods.map(x => x.kind)).toEqual(['current', 'next']);
    expect(result.html).toContain('지금의 계산 구간');
    expect(result.html).toContain('다음 계산 구간');
    expect(result.html).toContain(result.report.periods[0]!.pillar);
    expect(result.html).toContain(result.report.policyHash);
    expect(result.html).toContain('공식 공개·저장·판매');
  });

  it('follows the exact half-open Dayun boundary when the caller selects another instant', () => {
    const reference = buildLifeStageBirthResearchReading(BIRTH, REFERENCE);
    const current = reference.report.periods[0]!;
    const next = reference.report.periods[1]!;
    const localBoundary = current.endsAtExclusive + '+09:00';
    const boundaryInstant = new Date(localBoundary).toISOString();
    const minuteBefore = new Date(new Date(localBoundary).getTime() - 60000).toISOString();
    const before = buildLifeStageBirthResearchReading(BIRTH, minuteBefore);
    const after = buildLifeStageBirthResearchReading(BIRTH, boundaryInstant);
    expect(before.report.periods[0]?.cycleIndex).toBe(current.cycleIndex);
    expect(after.report.periods[0]?.cycleIndex).toBe(next.cycleIndex);
    expect(after.report.periods[0]?.startsAt).toBe(next.startsAt);
    expect(after.report.periods[0]?.text).toContain('계산');
    expect(after.report.interpretationStatus).toBe('source_authority_not_established');
  });

  it('reflects different actual birth charts and replays the same user inputs', () => {
    const first = buildLifeStageBirthResearchReading(BIRTH, REFERENCE);
    const again = buildLifeStageBirthResearchReading(BIRTH, REFERENCE);
    const another = buildLifeStageBirthResearchReading({
      ...BIRTH, date: { year: 1991, month: 5, day: 15 },
    }, REFERENCE);
    expect(again).toEqual(first);
    expect(another.report.snapshotId).not.toBe(first.report.snapshotId);
    expect(another.report.periods[0]?.startsAt)
      .not.toBe(first.report.periods[0]?.startsAt);
  });

  it('does not invent the next life stage when birth clock or Daeyun direction is unavailable', () => {
    const unknown = buildLifeStageBirthResearchReading(
      { ...BIRTH, time: { known: false } },
      REFERENCE,
    );
    expect(unknown.report.coverage).toBe('unavailable');
    expect(unknown.report.periods).toHaveLength(0);
    expect(unknown.report.missing.join(' ')).toContain('대운 계산');
    expect(unknown.html).not.toContain('다음 계산 구간</h2>');
    expect(unknown.report.usefulComplete).toBe(false);
    expect(unknown.report.maySell).toBe(false);
  });

  it('rejects a guessed or invalid reference clock before calculating an authorized chart', () => {
    for (const invalid of [
      '2030-06-01T12:00:00', '2030-06-01T12:00:00+09:00',
      '2030-02-30T03:00:00.000Z', 'not-a-date', '',
    ]) {
      expect(() => buildLifeStageBirthResearchReading(BIRTH, invalid)).toThrow();
    }
  });
});
