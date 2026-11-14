import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { buildCompatibilityTwoBirthResearchReading } from
  '../src/preview/compatibility-two-birth-research-runtime.js';
import { buildT10HistoricalDayYearObservation } from
  '../src/research/compatibility-t10-historical-day-year-observation.js';

function birth(year: number, month: number, day: number, known = true): BirthInput {
  return {
    calendarType: 'solar',
    date: { year, month, day },
    time: known ? { known: true, hour: 14, minute: 30 } : { known: false },
    sexForTraditionalCalculation: 'unspecified',
  };
}
const FIRST = birth(1990, 5, 15);
const YEAR_COMBINATION = birth(2017, 5, 15);
const DAY_COMBINATION = birth(1996, 6, 5);
const args = {
  requestId: 'historical-year-source-observation',
  subjectPersonRef: 'first-person',
  targetPersonRef: 'second-person',
  referenceDateTime: '2026-11-11T00:00:00.000Z',
};
function run(a: BirthInput, b: BirthInput, opted = true) {
  return buildCompatibilityTwoBirthResearchReading(a, b, {
    ...args,
    ...(opted ? { candidateScope: 'traditional_marital_palace_comparison' as const } : {}),
  });
}

describe('T10 historical day/year evidence remains a factual research-only observation', () => {
  it('connects an actual first-day to second-birth-year branch combination', () => {
    const output = run(FIRST, YEAR_COMBINATION);
    const review = output.historicalDayYearObservation;
    expect(review?.state).toBe('direct_day_to_year_fact_observed');
    const observed = review?.sentences.find(item =>
      item.observedFactPaths[0] === 'subject.pillars.day.value.branch' &&
      item.observedFactPaths[1] === 'target.pillars.year.value.branch');
    expect(observed?.paragraph).toContain('첫 번째 사람의 일지 진');
    expect(observed?.paragraph).toContain('두 번째 사람의 연지 유');
    expect(observed?.paragraph).toContain('1983년 원전');
    expect(observed?.definitionContentHash).toMatch(/^[a-f0-9]{64}$/u);
    expect(observed?.calculationSourceUrls).toHaveLength(2);
    expect(observed?.historicalClauseUrl)
      .toContain('bo_table=sub3_1&wr_id=418');
    expect(observed?.interpersonalMeaningAuthorized).toBe(false);
    expect(review?.primary1983SourceVerified).toBe(false);
    expect(review?.compatibilityVerdict).toBeNull();
    expect(review?.maySell).toBe(false);
  });

  it('does not add a separate year comparison for existing day/day evidence', () => {
    const output = run(FIRST, DAY_COMBINATION);
    const year = output.historicalDayYearObservation;
    const source = output.directCombination2025Research;
    expect(year?.sentences.length)
      .toBe(source?.candidates.filter(item => item.birthPillar === 'year').length);
    for (const sentence of year?.sentences ?? []) {
      expect(sentence.observedFactPaths.some(path => path.includes('.pillars.year.')))
        .toBe(true);
    }
    expect(output.sourceBoundObservationReading?.sentences.some(sentence =>
      sentence.kind === 'day_branch_structure')).toBe(true);
    expect(year?.relationshipOutcomeAuthorized).toBe(false);
  });

  it('keeps each person intact on role reversal and missing birth hour', () => {
    const forward = run(FIRST, YEAR_COMBINATION).historicalDayYearObservation;
    const reverse = run(YEAR_COMBINATION, FIRST).historicalDayYearObservation;
    expect(forward?.subject.calculationHash).toBe(reverse?.target.calculationHash);
    expect(forward?.target.calculationHash).toBe(reverse?.subject.calculationHash);
    expect(reverse?.state).toBe('direct_day_to_year_fact_observed');
    const unknown = run(FIRST, birth(2017, 5, 15, false))
      .historicalDayYearObservation;
    expect(unknown?.sentences.some(item =>
      item.observedFactPaths.includes('target.pillars.year.value.branch'))).toBe(true);
    expect(unknown?.sentences.every(item =>
      item.observedFactPaths.every(path => !path.includes('.pillars.hour.')))).toBe(true);
  });

  it('rejects altered source identity, structural value and unauthorized admission', () => {
    const output = run(FIRST, YEAR_COMBINATION);
    const pair = output.sourceScopeHandoff;
    const research = output.directCombination2025Research;
    if (!research) throw new TypeError('Missing historical research.');
    expect(() => buildT10HistoricalDayYearObservation(pair, {
      ...research,
      subject: { ...research.subject, calculationHash: 'fake-hash' },
    })).toThrow('protected source-bound charts');
    expect(() => buildT10HistoricalDayYearObservation(pair, {
      ...research,
      sourceInterpretationStatus: 'authorized' as never,
    })).toThrow('protected source-bound charts');
    expect(() => buildT10HistoricalDayYearObservation(pair, {
      ...research,
      candidates: research.candidates.map(item => item.birthPillar === 'year'
        ? { ...item, evidence: {
          ...item.evidence,
          target: { ...item.evidence.target, value: '자' as never },
        } } : item),
    })).toThrow('exact original charts and sources');
  });

  it('preserves ordinary preview HTML and never grants menu or sales authority', () => {
    const normal = run(FIRST, YEAR_COMBINATION, false);
    const scoped = run(FIRST, YEAR_COMBINATION, true);
    expect(normal.historicalDayYearObservation).toBeUndefined();
    expect(normal.html).toBe(scoped.html);
    expect(scoped.historicalDayYearObservation?.mayPublish).toBe(false);
    expect(scoped.mayMarkMenuAvailable).toBe(false);
    expect(scoped.mayPersist).toBe(false);
    expect(scoped.maySell).toBe(false);
  });
});
