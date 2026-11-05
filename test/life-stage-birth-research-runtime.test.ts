import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../src/production/production-calculation-runtime.js';
import { buildLifeStageDayunResearchReport } from '../src/preview/life-stage-dayun-research-report.js';
import { renderLifeStageDayunResearchHtml } from '../src/preview/life-stage-dayun-research-report.js';
import { buildLifeStageBirthResearchReading } from '../src/preview/life-stage-birth-research-runtime.js';

function escapedHtmlText(value: string): string {
  return value.replace(/[&<>"']/gu, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]!);
}

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

  it('shows existing source-bound individual natal T8 meaning without pretending that it predicts Daeyun', () => {
    const person: BirthInput = {
      ...BIRTH,
      date: { year: 2024, month: 3, day: 10 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    };
    const read = buildLifeStageBirthResearchReading(person, REFERENCE);
    expect(read.natalContext.snapshotId).toBe(read.report.snapshotId);
    expect(read.natalContext.calculationHash).toBe(read.report.calculationHash);
    expect(read.natalContext.availability).toBe('bounded_natal_t8_research');
    expect(read.natalContext.sections.length).toBeGreaterThan(0);
    expect(read.html).toContain('같은 명식의 원국 구조 해석');
    expect(read.html).toContain('현재·다음 대운의 길흉이나 특정 시기 결과를 나타내지 않습니다');
    for (const section of read.natalContext.sections) {
      expect(section.sourceIds.length).toBeGreaterThanOrEqual(2);
      expect(section.factPaths.length).toBeGreaterThanOrEqual(2);
      expect(section.paragraph).toContain('이 원국에서 확인된 근거는');
      expect(read.html).toContain(escapedHtmlText(section.paragraph));
    }
    expect(read.interpretationStatus).toBe('source_authority_not_established');
    expect(read.mayGrantOfficialAuthority).toBe(false);
    expect(read.maySell).toBe(false);
    expect(buildLifeStageBirthResearchReading(person, REFERENCE)).toEqual(read);
    expect(() => renderLifeStageDayunResearchHtml(read.report, {
      ...read.natalContext, calculationHash: 'forged-mixed-policy',
    })).toThrow('identical canonical chart');
  });

  it('keeps unavailable natal T8 separate from actual or unavailable Dayun timing', () => {
    const missing = buildLifeStageBirthResearchReading(
      { ...BIRTH, time: { known: false } }, REFERENCE,
    );
    expect(missing.natalContext.availability).toBe('insufficient_evidence');
    expect(missing.natalContext.sections).toHaveLength(0);
    expect(missing.html).toContain('출처 있는 원국 구조 해석이 부족합니다');
    expect(missing.report.periods).toHaveLength(0);
    expect(missing.interpretationStatus).toBe('source_authority_not_established');
    expect(missing.mayPublish).toBe(false);
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
