import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import {
  buildAnnualBirthResearchReading,
} from '../src/preview/annual-birth-research-runtime.js';

const BIRTH: BirthInput = {
  calendarType: 'solar',
  date: { year: 1996, month: 1, day: 9 },
  time: { known: true, hour: 9, minute: 30 },
  sexForTraditionalCalculation: 'unspecified',
};
const REFERENCE = '2026-10-24T00:00:00.000Z';

function read(
  birth: BirthInput = BIRTH,
  targetYear = 2026,
  referenceDateTime = REFERENCE,
) {
  return buildAnnualBirthResearchReading(birth, {
    requestId: 'annual-real-birth-' + targetYear,
    targetYear,
    referenceDateTime,
  });
}

describe('real birth → independently requested annual Korean research report', () => {
  it('renders the original source-owned annual Korean profile without requiring any monthly input', () => {
    const result = read();
    expect(result.lifecycle).toBe('internal_research_only');
    expect(result.researchOnly).toBe(true);
    expect(result.mayGrantOfficialAuthority).toBe(false);
    expect(result.mayPublish).toBe(false);
    expect(result.mayPersist).toBe(false);
    expect(result.maySell).toBe(false);
    expect(result.snapshotId).toBeTruthy();
    expect(result.calculationHash).toBeTruthy();
    expect(result.report.targetYear).toBe(2026);
    expect(result.report.timeZone).toBe('Asia/Seoul');
    expect(result.report.calendarPolicy).toBe('civil_year_only');
    expect(result.report.permissions.mayClaimOfficialAuthority).toBe(false);
    expect(result.reference.state).toBe('in_target_civil_year');
    expect(result.report.sections.some(section => section.kind === 'core')).toBe(true);
    expect(result.html).toContain('id="annual-reading"');
    expect(result.html).toContain('id="annual-civil-year-reference"');
    expect(result.html).toContain('올해의 연구 풀이 후보');
    expect(result.html).toContain('독립 고전 근거 아님');
    for (const section of result.report.sections) {
      expect(result.html).toContain(section.title);
      expect(result.html).toContain(section.text);
      expect(result.html).toContain(section.researchProfileId);
      expect(result.html).toContain(section.candidateClaimType);
      expect(result.html).toContain(section.methodologyId);
      expect(result.html).toContain(section.policySourceId);
      for (const path of section.calculationFactPaths) {
        expect(result.html).toContain(path);
      }
      expect(section.interpretationStatus).toBe('internal_research');
      expect(section.evidenceStatus).toBe(
        'research_profile_projection_not_an_executed_official_claim');
    }
    expect(result.html).toContain('공개·저장·판매 또는 공식 서비스 권한이 없습니다.');
    expect(read()).toEqual(result);
  });

  it('keeps the same annual source meaning while the reference is outside that year', () => {
    const inYear = read();
    const past = read(BIRTH, 2025);
    const future = read(BIRTH, 2027);
    expect(inYear.reference.civilYearAtReference).toBe(2026);
    expect(past.reference.state).toBe('outside_target_civil_year');
    expect(future.reference.state).toBe('outside_target_civil_year');
    expect(past.html).toContain('2025년의 문단은 현재 적용되는 올해 풀이가 아니라');
    expect(future.html).toContain('2027년의 문단은 현재 적용되는 올해 풀이가 아니라');
    expect(past.report.sections[0]?.text).toBeTruthy();
    expect(future.report.sections[0]?.text).toBeTruthy();
    expect(inYear.report.referenceDateTime).toBe(past.report.referenceDateTime);
    expect(inYear.report.referenceDateTime).toBe(future.report.referenceDateTime);
    expect(past.report.permissions.mayAutoPromoteResearch).toBe(false);
  });

  it('uses exact Seoul civil midnight, never UTC or Ipchun year, to label applicability', () => {
    const lastInstant = read(BIRTH, 2026, '2026-12-31T14:59:59.999Z');
    const firstInstant = read(BIRTH, 2026, '2026-12-31T15:00:00.000Z');
    expect(lastInstant.reference).toEqual({
      referenceDateTime: '2026-12-31T14:59:59.999Z',
      civilYearAtReference: 2026,
      state: 'in_target_civil_year',
    });
    expect(firstInstant.reference).toEqual({
      referenceDateTime: '2026-12-31T15:00:00.000Z',
      civilYearAtReference: 2027,
      state: 'outside_target_civil_year',
    });
    expect(lastInstant.report.sections).toEqual(firstInstant.report.sections);
    expect(firstInstant.html).toContain('서울 달력 2027년입니다');
    expect(firstInstant.html).toContain('현재 적용되는 올해 풀이가 아니라');
  });

  it('keeps person-specific calculation facts distinct and unknown-hour relations suppressed', () => {
    const first = read();
    const second = read({
      ...BIRTH, date: { year: 1996, month: 2, day: 12 },
    });
    expect(first.snapshotId).not.toBe(second.snapshotId);
    expect(first.calculationHash).not.toBe(second.calculationHash);
    if (first.report.annualStemTenGod !== second.report.annualStemTenGod) {
      expect(first.report.sections[0]?.text).not.toBe(second.report.sections[0]?.text);
    }
    const unknown = read({ ...BIRTH, time: { known: false } });
    expect(unknown.report.unavailablePillars).toContain('hour');
    expect(unknown.report.sections.some(section => section.relatedPillar === 'hour')).toBe(false);
    expect(unknown.report.sections.some(section => section.kind === 'core')).toBe(true);
    expect(unknown.report.permissions.maySell).toBe(false);
  });

  it('rejects invalid request, year, and ambiguous or nonexistent timestamps', () => {
    const target = {
      requestId: 'annual-valid-request',
      targetYear: 2026,
      referenceDateTime: REFERENCE,
    };
    for (const invalidYear of [1799, 2301, 2026.1, NaN]) {
      expect(() => buildAnnualBirthResearchReading(BIRTH, {
        ...target, targetYear: invalidYear,
      })).toThrow();
    }
    for (const invalidId of ['', ' ', 'x'.repeat(201)]) {
      expect(() => buildAnnualBirthResearchReading(BIRTH, {
        ...target, requestId: invalidId,
      })).toThrow();
    }
    for (const invalidTimestamp of [
      '2026-10-24', '2026-10-24T09:00:00+09:00',
      '2026-10-24T00:00:00Z', '2026-02-30T00:00:00.000Z',
      'not-a-date',
    ]) {
      expect(() => buildAnnualBirthResearchReading(BIRTH, {
        ...target, referenceDateTime: invalidTimestamp,
      })).toThrow();
    }
  });
});
