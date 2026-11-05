import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../src/production/production-calculation-runtime.js';
import { RELATIONSHIP_SPOUSE_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1 } from '../src/reading/official-reading-detailed-presentation-spouse.js';
import { buildSpousePositionBirthResearchReading } from '../src/preview/spouse-position-birth-research-runtime.js';

const REFERENCE = '2026-09-03T13:00:00.000Z';
const BIRTH: BirthInput = {
  calendarType: 'solar',
  date: { year: 1990, month: 5, day: 15 },
  time: { known: true, hour: 14, minute: 30 },
  sexForTraditionalCalculation: 'unspecified',
};

describe('real birth spouse day-branch preview stays position-only', () => {
  it('uses the exact source-approved spouse position text and actually calculated day branch', () => {
    const reading = buildSpousePositionBirthResearchReading(BIRTH, REFERENCE);
    const { snapshot } = calculateAuthorizedMyeonghwaProductionSnapshot(
      BIRTH, { now: new Date(REFERENCE) },
    );
    const profile = RELATIONSHIP_SPOUSE_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1[0]!;
    expect(snapshot.pillars.day.status).toBe('resolved');
    if (snapshot.pillars.day.status !== 'resolved') return;
    expect(reading.availability).toBe('partial');
    expect(reading.report.snapshotId).toBe(snapshot.snapshotId);
    expect(reading.report.calculationHash).toBe(snapshot.calculationHash);
    expect(reading.report.dayPillarFactPath).toBe('pillars.day');
    expect(reading.report.dayBranchHanja).toBe(snapshot.pillars.day.value.branch.hanja);
    expect(reading.report.observation).toContain(snapshot.pillars.day.value.branch.hanja);
    expect(reading.report.headline).toBe(profile.standardText.headline);
    expect(reading.report.summary).toBe(profile.standardText.summary);
    expect(reading.report.clarification).toBe(profile.approvedTextByRole.clarification);
    expect(reading.report.boundary).toBe(profile.approvedTextByRole.boundary);
    expect(reading.report.provenance.sourceProfileId).toBe(profile.profileId);
    expect(reading.report.provenance.sourceRefs).toEqual(profile.provenance.sourceRefs);
    expect(reading.report.scope).toBe('relationship:natal:spouse');
    expect(reading.report.meaning).toBe('traditional_spouse_palace_position_only');
    expect(reading.report.researchOnly).toBe(true);
    expect(reading.report.mayInferPartnerTraits).toBe(false);
    expect(reading.report.mayPredictMarriage).toBe(false);
    expect(reading.report.mayGrantOfficialAuthority).toBe(false);
    expect(reading.report.mayPublish).toBe(false);
    expect(reading.report.mayPersist).toBe(false);
    expect(reading.report.maySell).toBe(false);
    expect(reading.html).toContain(reading.report.summary);
    expect(reading.html).toContain('공식 풀이·공개·저장·판매 권한을 부여하지 않습니다');
    expect(reading.html).toContain('pillars.day');
  });

  it('reflects different actual natal days, but never predicts a different spouse', () => {
    const first = buildSpousePositionBirthResearchReading(BIRTH, REFERENCE);
    const second = buildSpousePositionBirthResearchReading({
      ...BIRTH, date: { year: 1990, month: 5, day: 16 },
    }, REFERENCE);
    expect(first.report.snapshotId).not.toBe(second.report.snapshotId);
    expect(first.report.dayBranchHanja).not.toBe(second.report.dayBranchHanja);
    expect(first.report.summary).toBe(second.report.summary);
    expect(first.report.boundary).toBe(second.report.boundary);
    expect(second.report.mayInferPartnerTraits).toBe(false);
    expect(second.report.mayPredictMarriage).toBe(false);
    expect(buildSpousePositionBirthResearchReading(BIRTH, REFERENCE)).toEqual(first);
  });

  it('preserves uncertainty when clock is unknown, without guessing a day or spouse role', () => {
    const unknown: BirthInput = { ...BIRTH, time: { known: false } };
    const reading = buildSpousePositionBirthResearchReading(unknown, REFERENCE);
    const snapshot = calculateAuthorizedMyeonghwaProductionSnapshot(
      unknown, { now: new Date(REFERENCE) },
    ).snapshot;
    expect(reading.report.snapshotId).toBe(snapshot.snapshotId);
    expect(reading.report.dayPillarFactPath).toBe('pillars.day');
    if (snapshot.pillars.day.status === 'resolved') {
      expect(reading.availability).toBe('partial');
      expect(reading.report.dayBranchHanja).toBe(snapshot.pillars.day.value.branch.hanja);
    } else {
      expect(reading.availability).toBe('unavailable');
      expect(reading.report.dayBranchHanja).toBeUndefined();
      expect(reading.html).toContain('일지(日支)가 확정되지 않아');
    }
    expect(reading.report.mayInferPartnerTraits).toBe(false);
    expect(reading.report.mayPredictMarriage).toBe(false);
    expect(reading.report.maySell).toBe(false);
  });

  it('does not classify different traditional calculation sexes as different spouse outcomes', () => {
    const male = buildSpousePositionBirthResearchReading({
      ...BIRTH, sexForTraditionalCalculation: 'male',
    }, REFERENCE);
    const female = buildSpousePositionBirthResearchReading({
      ...BIRTH, sexForTraditionalCalculation: 'female',
    }, REFERENCE);
    expect(male.report.observation).toBe(female.report.observation);
    expect(male.report.summary).toBe(female.report.summary);
    expect(male.report.boundary).toBe(female.report.boundary);
    expect(male.report.meaning).toBe('traditional_spouse_palace_position_only');
    expect(female.report.mayPredictMarriage).toBe(false);
  });

  it('rejects time zone ambiguity and invalid dates rather than inferring a clock', () => {
    for (const value of [
      '', '2026-09-03', '2026-09-03T13:00:00',
      '2026-09-03T22:00:00+09:00',
      '2026-02-30T13:00:00.000Z', 'invalid',
    ]) {
      expect(() => buildSpousePositionBirthResearchReading(BIRTH, value)).toThrow();
    }
  });
});
