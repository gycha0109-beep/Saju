import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { buildThreeRelationshipMenusBirthReading } from
  '../src/preview/three-relationship-menus-birth-reading.js';

const SELF: BirthInput = {
  calendarType: 'solar', date: { year: 1996, month: 1, day: 9 },
  time: { known: true, hour: 9, minute: 30 },
  sexForTraditionalCalculation: 'unspecified',
};
const OTHER: BirthInput = {
  ...SELF, date: { year: 1997, month: 3, day: 18 },
  time: { known: true, hour: 14, minute: 0 },
};
const request = {
  requestId: 'real-three-relation-menus',
  subjectPersonRef: 'self',
  targetPersonRef: 'other',
  referenceDateTime: '2026-09-03T13:00:00.000Z',
  targetBirthUseAuthorized: true as const,
};

describe('one self chart and one authorized other chart → three separate relationship scopes', () => {
  it('shows real parent/child facts, spouse palace and separately grounded personal T8 without inventing T10', () => {
    const result = buildThreeRelationshipMenusBirthReading(SELF, OTHER, request);
    expect(result.lifecycle).toBe('internal_research_only');
    expect(result.researchOnly).toBe(true);
    expect(result.mayPublish).toBe(false);
    expect(result.mayPersist).toBe(false);
    expect(result.maySell).toBe(false);
    expect(result.mayClaimFamilyOutcome).toBe(false);
    expect(result.mayInferPartnerTraits).toBe(false);
    expect(result.mayClaimInterpersonalMeaning).toBe(false);
    expect(result.mayMarkMenuAvailable).toBe(false);
    expect(result.snapshotId).toBe(result.family.parents.report.snapshotId);
    expect(result.snapshotId).toBe(result.family.children.report.snapshotId);
    expect(result.snapshotId).toBe(result.spouse.report.snapshotId);
    expect(result.snapshotId).toBe(result.compatibility.report.subject.snapshotId);
    expect(result.compatibility.report.subject.personRef).toBe('self');
    expect(result.compatibility.report.target.personRef).toBe('other');
    expect(result.compatibility.mayClaimInterpersonalMeaning).toBe(false);
    expect(result.html).toContain('id="family"');
    expect(result.html).toContain('id="spouse"');
    expect(result.html).toContain('id="compatibility"');
    for (const item of [
      ...result.family.parents.report.observations,
      ...result.family.children.report.observations,
    ]) expect(result.html).toContain(item.text);
    expect(result.html).toContain(result.spouse.report.observation);
    expect(result.spouse.report.clarification.trim().length).toBeGreaterThan(0);
    expect(result.html).toContain(result.spouse.report.clarification);
    expect(result.html).toContain(result.spouse.report.boundary);
    expect(result.html).toContain(result.spouse.report.provenance.sourceProfileId);
    for (const item of result.compatibility.report.comparisons) {
      expect(result.html).toContain(item.explanation);
    }
    for (const reading of [
      result.compatibility.personalRelationship.subject,
      result.compatibility.personalRelationship.target,
    ]) {
      for (const section of reading.sections) {
        expect(reading.coverage).toBe('bounded_natal_t8_research');
        expect(section.sourceIds.length).toBeGreaterThan(1);
        expect(result.html).toContain(section.paragraph.replace(/[&<>"']/gu, char => ({
          '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
        })[char]!));
        expect(result.html).toContain(section.sourceIds[0]!);
      }
    }
    expect(result.html).toContain('상호 궁합 점수·결혼 결과');
    expect(buildThreeRelationshipMenusBirthReading(SELF, OTHER, request)).toEqual(result);
  });

  it('connects a declared parent or child person only with a separate family-purpose attestation', () => {
    const original = buildThreeRelationshipMenusBirthReading(SELF, OTHER, request);
    expect(original.familyMember).toBeUndefined();
    expect(original.html).not.toContain('id="family-selected-member"');
    for (const scope of ['parents', 'children'] as const) {
      const output = buildThreeRelationshipMenusBirthReading(SELF, OTHER, {
        ...request, familyMemberScope: scope,
        familyMemberBirthUseAuthorized: true,
      });
      const actual = output.familyMember;
      expect(actual).toBeDefined();
      expect(actual?.scope).toBe(scope);
      expect(actual?.subjectNatal.personRef).toBe('self');
      expect(actual?.member.personRef).toBe('other');
      expect(actual?.subjectNatal.snapshotId).toBe(output.family.parents.report.snapshotId);
      expect(actual?.member.snapshotId).toBe(output.compatibility.report.target.snapshotId);
      expect(actual?.subjectNatal.calculationHash).toBe(output.calculationHash);
      expect(actual?.member.calculationHash)
        .toBe(output.compatibility.report.target.calculationHash);
      expect(actual?.familyMeaningStatus)
        .toBe('family_t8_source_authority_not_established');
      expect(actual?.mayInferFamilyDynamics).toBe(false);
      expect(output.html).toContain('id="family-selected-member"');
      expect(output.html).toContain(scope === 'parents'
        ? '직접 선택한 부모 구성원' : '직접 선택한 자녀 구성원');
      expect(output.html).toContain('두 사람 사이의 가족 역학이나 실제 관계 결과가 아닙니다');
      expect(output.html).toContain('부모·자녀 관계 자체를 설명하는 T8 근거가 승인된 것은 아닙니다');
      for (const person of [actual!.subjectNatal, actual!.member]) {
        for (const section of person.sections) {
          expect(section.sourceIds.length).toBeGreaterThanOrEqual(2);
          expect(section.factPaths.length).toBeGreaterThanOrEqual(2);
          expect(output.html).toContain(section.paragraph.replace(/[&<>"']/gu, char => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
          })[char]!));
        }
      }
      expect(output.mayClaimFamilyOutcome).toBe(false);
      expect(output.mayClaimInterpersonalMeaning).toBe(false);
      expect(output.maySell).toBe(false);
    }
  });

  it('rejects inferred family role and unconsented reuse of the compatibility target birth', () => {
    expect(() => buildThreeRelationshipMenusBirthReading(SELF, OTHER, {
      ...request, familyMemberScope: 'parents',
    })).toThrow('separate use admission');
    expect(() => buildThreeRelationshipMenusBirthReading(SELF, OTHER, {
      ...request, familyMemberBirthUseAuthorized: true,
    })).toThrow('explicit family scope');
    expect(() => buildThreeRelationshipMenusBirthReading(SELF, OTHER, {
      ...request, familyMemberScope: 'partner' as 'parents',
      familyMemberBirthUseAuthorized: true,
    })).toThrow('exact parents/children scope');
  });

  it('keeps family child scope unavailable with unknown time, not a guessed relation', () => {
    const result = buildThreeRelationshipMenusBirthReading(
      { ...SELF, time: { known: false } }, OTHER, request);
    expect(result.family.parents.availability).toBe('unavailable');
    expect(result.family.children.availability).toBe('unavailable');
    expect(result.family.children.report.observations[0]?.observedPillar).toBeUndefined();
    expect(result.html).toContain('간지가 확정되지 않았으므로');
    expect(result.compatibility.mayMarkMenuAvailable).toBe(false);
    expect(result.spouse.report.mayPredictMarriage).toBe(false);
  });

  it('rejects missing second-person use attestation and non-distinct person refs', () => {
    expect(() => buildThreeRelationshipMenusBirthReading(SELF, OTHER, {
      ...request, targetBirthUseAuthorized: false as true,
    })).toThrow('attestation');
    expect(() => buildThreeRelationshipMenusBirthReading(SELF, OTHER, {
      ...request, targetPersonRef: 'self',
    })).toThrow('distinct');
    expect(() => buildThreeRelationshipMenusBirthReading(SELF, OTHER, {
      ...request, referenceDateTime: '2026-09-03T22:00:00+09:00',
    })).toThrow();
  });
});
