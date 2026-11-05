import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../src/production/production-calculation-runtime.js';
import { buildCompatibilityTwoBirthResearchReading } from '../src/preview/compatibility-two-birth-research-runtime.js';
import { evaluatePairwiseSourceScopeV1 } from '../src/research/family-pair-source-scope-handoff.js';
import { renderCompatibilityTwoChartIntakeHtml } from '../src/preview/compatibility-two-chart-intake-preview.js';

function escapedHtmlText(value: string): string {
  return value.replace(/[&<>"']/gu, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]!);
}

const REFERENCE = '2026-09-03T13:00:00.000Z';
const FIRST: BirthInput = {
  calendarType: 'solar',
  date: { year: 1990, month: 5, day: 15 },
  time: { known: true, hour: 14, minute: 30 },
  sexForTraditionalCalculation: 'unspecified',
};
const SECOND: BirthInput = {
  calendarType: 'solar',
  date: { year: 1996, month: 1, day: 9 },
  time: { known: true, hour: 9, minute: 30 },
  sexForTraditionalCalculation: 'unspecified',
};
const QUERY = {
  requestId: 'real-pair-chart-preview',
  subjectPersonRef: 'person-self',
  targetPersonRef: 'person-other',
  referenceDateTime: REFERENCE,
};
const read = (
  first: BirthInput = FIRST,
  second: BirthInput = SECOND,
) => buildCompatibilityTwoBirthResearchReading(first, second, QUERY);

describe('real two-birth compatibility intake remains facts only', () => {
  it('binds two independently calculated Canonical snapshots to their exact person refs', () => {
    const result = read();
    const first = calculateAuthorizedMyeonghwaProductionSnapshot(
      FIRST, { now: new Date(REFERENCE) },
    ).snapshot;
    const second = calculateAuthorizedMyeonghwaProductionSnapshot(
      SECOND, { now: new Date(REFERENCE) },
    ).snapshot;
    expect(result.report.subject.personRef).toBe(QUERY.subjectPersonRef);
    expect(result.report.target.personRef).toBe(QUERY.targetPersonRef);
    expect(result.report.subject.snapshotId).toBe(first.snapshotId);
    expect(result.report.target.snapshotId).toBe(second.snapshotId);
    expect(result.report.subject.calculationHash).toBe(first.calculationHash);
    expect(result.report.target.calculationHash).toBe(second.calculationHash);
    expect(result.report.subject.snapshotId).not.toBe(result.report.target.snapshotId);
    expect(result.report.subject.pillars.map(x => x.factPath)).toEqual([
      'pillars.year.value', 'pillars.month.value',
      'pillars.day.value', 'pillars.hour.value',
    ]);
    expect(result.availability).toBe('partial');
    expect(result.meaning).toBe('two_person_calculation_only');
    expect(result.lifecycle).toBe('internal_research_only');
    expect(result.mayClaimInterpersonalMeaning).toBe(false);
    expect(result.mayGrantOfficialAuthority).toBe(false);
    expect(result.mayMarkMenuAvailable).toBe(false);
    expect(result.mayPublish).toBe(false);
    expect(result.mayPersist).toBe(false);
    expect(result.maySell).toBe(false);
    expect(result.report.readingStatus).toBe('insufficient_interpersonal_meaning_authority');
    expect(result.html).toContain('두 사람의 명식 확인');
    expect(result.html).toContain('궁합 해석은 아직 제공할 수 없습니다');
    expect(result.html).toContain('첫 번째 명식');
    expect(result.html).toContain('두 번째 명식');
    expect(result.html).toContain('source-qualified T10 Claim');
  });

  it('connects exact R068/R069 pairwise source HOLDS without changing the existing preview or personal readings', () => {
    const cases: readonly (readonly [BirthInput, BirthInput])[] = [
      [FIRST, SECOND],
      [SECOND, FIRST],
      [FIRST, FIRST],
      [FIRST, { ...SECOND, time: { known: false } }],
      [{ ...FIRST, time: { known: false } }, SECOND],
    ];
    for (const [firstBirth, secondBirth] of cases) {
      const output = read(firstBirth, secondBirth);
      const firstSnapshot = calculateAuthorizedMyeonghwaProductionSnapshot(
        firstBirth, { now: new Date(REFERENCE) },
      ).snapshot;
      const secondSnapshot = calculateAuthorizedMyeonghwaProductionSnapshot(
        secondBirth, { now: new Date(REFERENCE) },
      ).snapshot;
      const expected = evaluatePairwiseSourceScopeV1(
        { personRef: QUERY.subjectPersonRef, snapshot: firstSnapshot },
        { personRef: QUERY.targetPersonRef, snapshot: secondSnapshot },
      );
      expect(output.sourceScopeHandoff).toEqual(expected);
      expect(output.sourceScopeHandoff.owner).toBe('R068_R069');
      expect(output.sourceScopeHandoff.subject.snapshotId)
        .toBe(output.report.subject.snapshotId);
      expect(output.sourceScopeHandoff.target.snapshotId)
        .toBe(output.report.target.snapshotId);
      expect(output.sourceScopeHandoff.subject.calculationHash)
        .toBe(output.report.subject.calculationHash);
      expect(output.sourceScopeHandoff.target.calculationHash)
        .toBe(output.report.target.calculationHash);
      expect(output.sourceScopeHandoff.subject.birthTimeKnown)
        .toBe(output.report.subject.birthTimeKnown);
      expect(output.sourceScopeHandoff.target.birthTimeKnown)
        .toBe(output.report.target.birthTimeKnown);
      expect(output.sourceScopeHandoff.pairwiseDisposition).toBe('INCONCLUSIVE');
      expect(output.sourceScopeHandoff.pairwiseT10Admitted).toBe(false);
      expect(output.sourceScopeHandoff.researchOnly).toBe(true);
      expect(output.sourceScopeHandoff.mayMarkMenuAvailable).toBe(false);
      expect(output.sourceScopeHandoff.mayGrantOfficialAuthority).toBe(false);
      expect(output.sourceScopeHandoff.mayPersist).toBe(false);
      expect(output.sourceScopeHandoff.mayPublish).toBe(false);
      expect(output.sourceScopeHandoff.maySell).toBe(false);
      expect(output.sourceScopeHandoff.comparedSourceSurfaces.every(item =>
        item.eligiblePairwiseClaim === false)).toBe(true);
      expect(output.sourceScopeHandoff.factualPairObservations.every(item =>
        item.pairwiseMeaningAuthorized === false)).toBe(true);
      expect(output.sourceScopeHandoff.factualPairObservations.map(item =>
        item.pillarSlot)).toEqual(['year', 'month', 'day', 'hour']);
      for (const [i, observation] of output.sourceScopeHandoff.factualPairObservations.entries()) {
        const oldObservation = output.report.comparisons[i];
        if (!oldObservation) throw new TypeError('Expected bounded old comparison slot.');
        expect(oldObservation.slot).toBe(observation.pillarSlot);
        expect(oldObservation.observation === 'insufficient_input')
          .toBe(observation.status === 'incomplete');
        if (observation.status === 'both_resolved') {
          expect(oldObservation.observation === 'same_calculated_pillar')
            .toBe(observation.exactPillarIdentity === 'same');
        }
      }
      // Existing consumer HTML remains a bounded calculation-only preview.
      expect(output.html).toBe(renderCompatibilityTwoChartIntakeHtml(
        output.report, output.personalRelationship,
      ));
      expect(output.availability).toBe('partial');
      expect(output.mayClaimInterpersonalMeaning).toBe(false);
      expect(read(firstBirth, secondBirth)).toEqual(output);
    }
  });

  it('includes existing chart-specific T8 Korean narratives separately for each person', () => {
    const first: BirthInput = {
      ...FIRST, date: { year: 2024, month: 3, day: 10 },
      time: { known: true, hour: 12, minute: 0 },
    };
    const second: BirthInput = {
      ...FIRST, date: { year: 2024, month: 4, day: 12 },
      time: { known: true, hour: 12, minute: 0 },
    };
    const result = read(first, second);
    const self = result.personalRelationship.subject;
    const partner = result.personalRelationship.target;
    expect(self.personRef).toBe(QUERY.subjectPersonRef);
    expect(partner.personRef).toBe(QUERY.targetPersonRef);
    expect(self.snapshotId).toBe(result.report.subject.snapshotId);
    expect(partner.snapshotId).toBe(result.report.target.snapshotId);
    expect(self.calculationHash).toBe(result.report.subject.calculationHash);
    expect(partner.calculationHash).toBe(result.report.target.calculationHash);
    expect(self.coverage).toBe('bounded_natal_t8_research');
    expect(self.sections.length).toBeGreaterThan(0);
    expect(result.html).toContain('두 사람 각각의 관계 풀이 · 내부 연구');
    expect(result.html).toContain('궁합·갈등·결혼 결과를 나타내지는 않습니다');
    for (const section of self.sections) {
      expect(section.sourceIds.length).toBeGreaterThanOrEqual(2);
      expect(section.observedFactPaths.length).toBeGreaterThanOrEqual(2);
      expect(section.paragraph).toContain('이 원국에서 확인된 근거는');
      expect(result.html).toContain(escapedHtmlText(section.paragraph));
    }
    for (const section of partner.sections) {
      expect(section.sourceIds.length).toBeGreaterThanOrEqual(2);
      expect(section.observedFactPaths.length).toBeGreaterThanOrEqual(2);
      expect(result.html).toContain(escapedHtmlText(section.paragraph));
    }
    expect(result.meaning).toBe('two_person_calculation_only');
    expect(result.mayClaimInterpersonalMeaning).toBe(false);
    expect(result.maySell).toBe(false);
    expect(result.mayPublish).toBe(false);
    expect(read(first, second)).toEqual(result);
    expect(() => renderCompatibilityTwoChartIntakeHtml(result.report, {
      subject: result.personalRelationship.target,
      target: result.personalRelationship.subject,
    })).toThrow('each personal T8 interpretation must retain');
  });

  it('keeps each research T8 coverage independent with an unknown partner birth hour', () => {
    const known: BirthInput = {
      ...FIRST, date: { year: 2024, month: 3, day: 10 },
      time: { known: true, hour: 12, minute: 0 },
    };
    const unknown = read(known, { ...SECOND, time: { known: false } });
    expect(unknown.personalRelationship.subject.coverage)
      .toBe('bounded_natal_t8_research');
    expect(unknown.personalRelationship.target.coverage).toBe('insufficient_evidence');
    expect(unknown.personalRelationship.target.sections).toHaveLength(0);
    expect(unknown.html).toContain('이 사람의 명식에서는 출처를 갖춘 원국 관계 풀이가 부족합니다');
    expect(unknown.html).toContain(escapedHtmlText(unknown.personalRelationship.subject.sections[0]!.paragraph));
    expect(unknown.report.target.pillars[3]?.status).toBe('unavailable');
    expect(unknown.mayClaimInterpersonalMeaning).toBe(false);
  });

  it('preserves missing hour independently without inventing interpersonal meaning', () => {
    const unknown: BirthInput = { ...SECOND, time: { known: false } };
    const result = read(FIRST, unknown);
    expect(result.report.subject.birthTimeKnown).toBe(true);
    expect(result.report.target.birthTimeKnown).toBe(false);
    expect(result.report.subject.pillars[3]?.status).toBe('resolved');
    expect(result.report.target.pillars[3]?.status).toBe('unavailable');
    expect(result.report.missing.join(' ')).toContain('두 번째 사람의 출생시각 미상');
    expect(result.availability).toBe('partial');
    expect(result.mayClaimInterpersonalMeaning).toBe(false);
    expect(result.html).toContain('확인 불가');
  });

  it('accepts equal Canonical hashes for two distinct people with coincident birth inputs', () => {
    const result = read(FIRST, FIRST);
    expect(result.report.subject.snapshotId).toBe(result.report.target.snapshotId);
    expect(result.report.subject.calculationHash).toBe(result.report.target.calculationHash);
    expect(result.report.subject.personRef).not.toBe(result.report.target.personRef);
    expect(result.meaning).toBe('two_person_calculation_only');
    expect(result.report.usefulComplete).toBe(false);
    expect(result.report.maySell).toBe(false);
  });

  it("is replayable and changes only the specified person's chart when birth input changes", () => {
    const initial = read();
    expect(read()).toEqual(initial);
    const adjusted = read(FIRST, {
      ...SECOND,
      date: { year: 1997, month: 1, day: 9 },
    });
    expect(adjusted.report.subject).toEqual(initial.report.subject);
    expect(adjusted.report.target.snapshotId).not.toBe(initial.report.target.snapshotId);
    expect(adjusted.report.target.pillars[0]?.branchHanja)
      .not.toBe(initial.report.target.pillars[0]?.branchHanja);
    expect(adjusted.mayPublish).toBe(false);
    expect(adjusted.maySell).toBe(false);
  });

  it('rejects missing references, identical person IDs and ambiguous time without guessing scope', () => {
    for (const overrides of [
      { requestId: '' },
      { subjectPersonRef: '' },
      { targetPersonRef: 'person-self' },
      { targetPersonRef: ' ' },
    ]) {
      expect(() => buildCompatibilityTwoBirthResearchReading(
        FIRST, SECOND, { ...QUERY, ...overrides },
      )).toThrow();
    }
    for (const invalid of [
      '2026-09-03', '2026-09-03T13:00:00',
      '2026-09-03T22:00:00+09:00',
      '2026-02-30T13:00:00.000Z', '',
    ]) {
      expect(() => buildCompatibilityTwoBirthResearchReading(
        FIRST, SECOND, { ...QUERY, referenceDateTime: invalid },
      )).toThrow();
    }
  });
});
