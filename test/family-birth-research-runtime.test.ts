import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../src/production/production-calculation-runtime.js';
import { buildFamilyCanonicalObservationPreview } from '../src/preview/family-parents-children-observation-preview.js';
import { buildFamilyBirthResearchReading, buildFamilyMemberBirthResearchReading } from '../src/preview/family-birth-research-runtime.js';

function escapedHtmlText(value: string): string {
  return value.replace(/[&<>"']/gu, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]!);
}

const REFERENCE = '2026-09-03T13:00:00.000Z';
const BIRTH: BirthInput = {
  calendarType: 'solar',
  date: { year: 1990, month: 5, day: 15 },
  time: { known: true, hour: 14, minute: 30 },
  sexForTraditionalCalculation: 'unspecified',
};
const read = (
  birth: BirthInput,
  scope: 'parents' | 'children',
  referenceDateTime = REFERENCE,
) => buildFamilyBirthResearchReading(birth, { scope, referenceDateTime });

describe('actual birth to bounded parent/child family observation', () => {
  it('provides the correct Canonical parent-year/month observations, with research-only rights', () => {
    const result = read(BIRTH, 'parents');
    const { snapshot } = calculateAuthorizedMyeonghwaProductionSnapshot(
      BIRTH, { now: new Date(REFERENCE) },
    );
    expect(result.report).toEqual(buildFamilyCanonicalObservationPreview(snapshot, 'parents'));
    expect(result.report.snapshotId).toBe(snapshot.snapshotId);
    expect(result.report.calculationHash).toBe(snapshot.calculationHash);
    expect(result.report.observations.map(item => item.factPath))
      .toEqual(['pillars.year', 'pillars.month']);
    expect(result.availability).toBe('partial');
    expect(result.meaning).toBe('calculation_facts_only');
    expect(result.lifecycle).toBe('internal_research_only');
    expect(result.mayClaimFamilyOutcome).toBe(false);
    expect(result.mayGrantOfficialAuthority).toBe(false);
    expect(result.mayPublish).toBe(false);
    expect(result.mayPersist).toBe(false);
    expect(result.maySell).toBe(false);
    expect(result.report.usefulComplete).toBe(false);
    expect(result.report.interpretationCoverage).toBe('insufficient_evidence');
    expect(result.html).toContain('부모와 관련된 명식 관찰');
    expect(result.html).toContain('pillars.year');
    expect(result.html).toContain('pillars.month');
    expect(result.html).toContain('T8 해석 Claim');
    expect(result.html).not.toContain('pillars.hour</p>');
  });

  it('shows only the selected child-hour observation, never the parent year/month section', () => {
    const result = read(BIRTH, 'children');
    expect(result.scope).toBe('children');
    expect(result.report.observations.map(item => item.factPath))
      .toEqual(['pillars.hour']);
    expect(result.report.historicalLayerIds).toContain('FEMALE-CHILD-RELATION');
    expect(result.html).toContain('자녀와 관련된 명식 관찰');
    expect(result.html).toContain('pillars.hour');
    expect(result.html).not.toContain('<h2>연주</h2>');
    expect(result.html).not.toContain('<h2>월주</h2>');
    expect(result.mayClaimFamilyOutcome).toBe(false);
    expect(result.report.interpretationCoverage).toBe('insufficient_evidence');
  });

  it('holds the child-scope card without an input birth hour, but keeps parents distinct', () => {
    const unknown: BirthInput = { ...BIRTH, time: { known: false } };
    const children = read(unknown, 'children');
    const parents = read(unknown, 'parents');
    expect(children.availability).toBe('unavailable');
    expect(children.meaning).toBe('none');
    expect(children.report.observationCoverage).toBe('insufficient_input');
    expect(children.report.observations[0]?.state).not.toBe('resolved');
    expect(children.report.observations[0]?.observedPillar).toBeUndefined();
    expect(children.html).toContain('간지가 확정되지 않았으므로');
    expect(parents.availability).toBe('partial');
    expect(parents.meaning).toBe('calculation_facts_only');
    expect(parents.report.observations.every(item => item.factPath !== 'pillars.hour')).toBe(true);
    expect(parents.report.snapshotId).toBe(children.report.snapshotId);
  });

  it('reflects actual different birth charts and repeats the same chart deterministically', () => {
    const first = read(BIRTH, 'parents');
    expect(read(BIRTH, 'parents')).toEqual(first);
    const next = read({
      ...BIRTH,
      date: { year: 1991, month: 5, day: 15 },
    }, 'parents');
    expect(next.report.snapshotId).not.toBe(first.report.snapshotId);
    expect(next.report.calculationHash).not.toBe(first.report.calculationHash);
    expect(next.report.observations[0]?.observedPillar)
      .not.toBe(first.report.observations[0]?.observedPillar);
  });

  it('rejects absent family scope and timestamps that could silently change the chart', () => {
    expect(() => buildFamilyBirthResearchReading(BIRTH, {
      scope: 'family' as 'parents',
      referenceDateTime: REFERENCE,
    })).toThrow('explicit parents or children');
    for (const invalid of [
      '', '2026-09-03', '2026-09-03T22:00:00',
      '2026-09-03T22:00:00+09:00', '2026-02-30T13:00:00.000Z',
      'not-a-date',
    ]) {
      expect(() => read(BIRTH, 'parents', invalid)).toThrow();
    }
  });
});

describe('two separate family members with already sourced personal natal T8', () => {
  const member: BirthInput = {
    ...BIRTH, date: { year: 2024, month: 3, day: 10 },
    time: { known: true, hour: 12, minute: 0 },
  };
  const request = {
    scope: 'parents' as const,
    referenceDateTime: REFERENCE,
    subjectPersonRef: 'self',
    memberPersonRef: 'parent',
    memberBirthUseAuthorized: true as const,
  };

  it('keeps subject family observations and family member General T8 paragraphs on two different charts', () => {
    const output = buildFamilyMemberBirthResearchReading(BIRTH, member, request);
    const realMember = calculateAuthorizedMyeonghwaProductionSnapshot(
      member, { now: new Date(REFERENCE) },
    ).snapshot;
    expect(output.subject.report.snapshotId).not.toBe(realMember.snapshotId);
    expect(output.member.snapshotId).toBe(realMember.snapshotId);
    expect(output.member.calculationHash).toBe(realMember.calculationHash);
    expect(output.subject.scope).toBe('parents');
    expect(output.subject.report.observations.map(x => x.pillarSlot))
      .toEqual(['year', 'month']);
    expect(output.member.coverage).toBe('bounded_natal_t8_research');
    expect(output.member.sections.length).toBeGreaterThan(0);
    expect(output.html).toContain('입력된 부모 본인의 원국 구조');
    expect(output.html).toContain('부모·자녀 관계의 원인');
    for (const section of output.member.sections) {
      expect(section.sourceIds.length).toBeGreaterThanOrEqual(2);
      expect(section.factPaths.length).toBeGreaterThanOrEqual(2);
      expect(section.paragraph).toContain('이 원국에서 확인된 근거는');
      expect(output.html).toContain(escapedHtmlText(section.paragraph));
    }
    expect(output.familyMeaningStatus).toBe('family_t8_source_authority_not_established');
    expect(output.mayInferFamilyDynamics).toBe(false);
    expect(output.mayPublish).toBe(false);
    expect(output.mayPersist).toBe(false);
    expect(output.maySell).toBe(false);
    expect(buildFamilyMemberBirthResearchReading(BIRTH, member, request)).toEqual(output);
  });

  it('preserves parent versus child scope and unavailable natal T8 for the member with unknown hour', () => {
    const result = buildFamilyMemberBirthResearchReading(BIRTH,
      { ...member, time: { known: false } },
      { ...request, scope: 'children' });
    expect(result.scope).toBe('children');
    expect(result.subject.report.observations.map(x => x.pillarSlot)).toEqual(['hour']);
    expect(result.member.coverage).toBe('insufficient_evidence');
    expect(result.member.sections).toHaveLength(0);
    expect(result.html).toContain('입력된 자녀 본인의 원국 구조');
    expect(result.html).toContain('이 가족 구성원의 출처 있는 원국 구조 해석은 아직 부족합니다');
    expect(result.familyMeaningStatus).toBe('family_t8_source_authority_not_established');
  });

  it('rejects a missing use-admission or confused person reference before calculating the other person', () => {
    expect(() => buildFamilyMemberBirthResearchReading(BIRTH, member, {
      ...request, memberPersonRef: 'self',
    })).toThrow('separate persons');
    expect(() => buildFamilyMemberBirthResearchReading(BIRTH, member, {
      ...request, memberBirthUseAuthorized: false as true,
    })).toThrow('verified-use admission');
    expect(() => buildFamilyMemberBirthResearchReading(BIRTH, member, {
      ...request, referenceDateTime: '2026-09-03T22:00:00',
    })).toThrow('explicit canonical UTC');
  });
});
