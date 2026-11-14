import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { buildCompatibilityTwoBirthResearchReading } from
  '../src/preview/compatibility-two-birth-research-runtime.js';
import { buildT10SourceBoundObservationReadingV1 } from
  '../src/research/compatibility-t10-source-bound-observation-reading.js';

function birth(year: number, month: number, day: number): BirthInput {
  return {
    calendarType: 'solar',
    date: { year, month, day },
    time: { known: true, hour: 14, minute: 30 },
    sexForTraditionalCalculation: 'unspecified',
  };
}
const FIRST = birth(1990, 5, 15);
const DAY_SIX_COMBINE_YEAR_CLASH = birth(1996, 6, 5);
const DAY_CLASH_OTHER_COMBINE = birth(1996, 8, 5);
const DAY_COMBINE = birth(1990, 5, 8);
const HARMONIC_STEM_CONFLICT = birth(1990, 5, 20);
const request = {
  requestId: 't10-source-bound-korean-factual-readings',
  subjectPersonRef: 'subject-distinct',
  targetPersonRef: 'target-distinct',
  referenceDateTime: '2026-11-11T00:00:00.000Z',
};
function run(a: BirthInput, b: BirthInput, optIn = true) {
  return buildCompatibilityTwoBirthResearchReading(a, b, {
    ...request,
    ...(optIn ? { candidateScope: 'traditional_marital_palace_comparison' as const } : {}),
  });
}

describe('T10 protected source-grounded Korean observations', () => {
  it('renders a supported day/day six-combination and a different-position clash separately', () => {
    const result = run(FIRST, DAY_SIX_COMBINE_YEAR_CLASH);
    const reading = result.sourceBoundObservationReading;
    expect(reading?.lifecycle).toBe('internal_research_only');
    const structural = reading?.sentences.find(item => item.kind === 'day_branch_structure');
    const opposite = reading?.sentences.find(item => item.kind === 'cross_position_opposite');
    expect(structural?.paragraph).toContain('지지육합 구조가 관측됩니다');
    expect(opposite?.paragraph).toContain('다른 위치의 지지충');
    expect(opposite?.paragraph).toContain('우선순위는 검증되지 않았습니다');
    expect(opposite?.observedFactPaths).toEqual(expect.arrayContaining([
      'subject.pillars.day.value.branch',
      'target.pillars.day.value.branch',
      'subject.pillars.year.value.branch',
      'target.pillars.year.value.branch',
    ]));
    expect(opposite?.definitionContentHashes).toEqual(
      expect.arrayContaining([expect.stringMatching(/^[a-f0-9]{64}$/u)]),
    );
    expect(opposite?.sourceIds.length).toBeGreaterThan(0);
    expect(structural?.sourceUrls).toEqual([
      'https://zh.wikisource.org/zh-hant/%E4%B9%99%E5%B7%B3%E5%8D%A0/10',
      'https://zh.wikisource.org/zh-hant/%E9%81%B8%E6%93%87%E8%A6%81%E7%95%A5/%E4%B8%8A',
    ]);
    expect(opposite?.sourceUrls).toEqual(structural?.sourceUrls);
    expect(structural?.sourceUrls).not.toContain(
      'https://www.dbpia.co.kr/journal/detail?nodeId=T14205410');
    expect(reading?.sentences.find(item => item.kind === 'source_limit')
      ?.sourceUrls).toContain(
      'https://www.dbpia.co.kr/journal/detail?nodeId=T14205410');
    expect(reading?.compatibilityScore).toBeNull();
    expect(reading?.sourceQualifiedFourCase).toBeNull();
    expect(reading?.maySell).toBe(false);
    expect(result.mayPublish).toBe(false);
  });

  it('keeps a challenging day/day clash alongside a different-position six-combination', () => {
    const reading = run(FIRST, DAY_CLASH_OTHER_COMBINE).sourceBoundObservationReading;
    const opposite = reading?.sentences.find(item => item.kind === 'cross_position_opposite');
    expect(opposite?.paragraph).toContain('일지끼리의 지지충');
    expect(opposite?.paragraph).toContain('다른 위치의 지지육합');
    expect(opposite?.observedFactPaths).toContain('target.pillars.month.value.branch');
    expect(opposite?.interpersonalMeaningAuthorized).toBe(false);
    expect(reading?.compositeCompatibilityMeaning).toBeNull();
  });

  it('keeps a classical six-harm pair source-bound even without a clash/combination', () => {
    const reading = run(birth(1990, 5, 14),
      birth(1990, 5, 15)).sourceBoundObservationReading;
    const harm = reading?.sentences.find(item => item.kind === 'day_branch_harm');
    expect(harm?.paragraph).toContain('묘와 두 번째 사람의 일지 진');
    expect(harm?.sourceIds).toEqual(['SRC-T10-SANMINGTONGHUI-VOL2-SIX-HARMS']);
    expect(harm?.sourceUrls).toContain(
      'https://zh.wikisource.org/zh-hant/三命通會/卷二');
    expect(harm?.interpersonalMeaningAuthorized).toBe(false);
    expect(reading?.maySell).toBe(false);
  });

  it('preserves the original direction and evidence paths of a classical punishment fragment', () => {
    const result = run(birth(1990, 5, 16), birth(1990, 5, 13));
    const found = result.sourceBoundObservationReading?.sentences.find(s =>
      s.kind === 'day_branch_punishment_direction');
    expect(found?.paragraph).toContain('인→사');
    expect(found?.observedFactPaths).toEqual([
      'subject.pillars.day.value.branch',
      'target.pillars.day.value.branch',
    ]);
    expect(found?.sourceIds).toEqual([
      'SRC-T10-SANMINGTONGHUI-VOL2-THREE-PUNISHMENTS',
    ]);
    expect(found?.interpersonalMeaningAuthorized).toBe(false);
    expect(result.productReadingQualityReview?.actualCompatibilityReadingReady)
      .toBe(false);
  });

  it('keeps the break-method dispute within source limits and exact day paths', () => {
    const output = run(birth(1990, 5, 11), birth(1990, 5, 20));
    const item = output.sourceBoundObservationReading?.sentences.find(s =>
      s.kind === 'foreign_break_method_dispute');
    expect(item?.paragraph).toContain('육임대전');
    expect(item?.paragraph).toContain('명리약언');
    expect(item?.evidenceScope).toBe('source_method_limit');
    expect(item?.observedFactPaths).toEqual([
      'subject.pillars.day.value.branch',
      'target.pillars.day.value.branch',
    ]);
    expect(item?.sourceIds).toHaveLength(2);
    expect(item?.interpersonalMeaningAuthorized).toBe(false);
    expect(output.maySell).toBe(false);
  });

  it('traces exact two day stems and the original clash source without forecasting a couple', () => {
    const forward = run(birth(1990, 5, 11), birth(1990, 5, 17));
    const reverse = run(birth(1990, 5, 17), birth(1990, 5, 11));
    const source = forward.sourceBoundObservationReading?.sentences.find(item =>
      item.kind === 'day_stem_clash_pair');
    const reversed = reverse.sourceBoundObservationReading?.sentences.find(item =>
      item.kind === 'day_stem_clash_pair');
    expect(source?.paragraph).toContain('일간 병과 두 번째 사람의 일간 임');
    expect(reversed?.paragraph).toContain('일간 임과 두 번째 사람의 일간 병');
    expect(source?.observedFactPaths).toEqual([
      'subject.pillars.day.value.stem', 'target.pillars.day.value.stem',
    ]);
    expect(source?.sourceIds).toEqual(['SRC-T10-MINGLIYUEYAN-VOL3-STEM-CLASH']);
    expect(source?.interpersonalMeaningAuthorized).toBe(false);
    expect(reverse.sourceBoundObservationReading?.compatibilityScore).toBeNull();
    expect(reverse.maySell).toBe(false);
  });

  it('records same-position competing factors without claiming they cancel', () => {
    const reading = run(FIRST, HARMONIC_STEM_CONFLICT).sourceBoundObservationReading;
    expect(reading?.sentences.some(item =>
      item.kind === 'same_slot_competing_factors' &&
      item.paragraph.includes('일간에서 서로 다른 계산 요소'))).toBe(true);
    expect(reading?.sentences.find(item => item.kind === 'day_stem_elements')
      ?.paragraph).toContain('사람의 오행이');
    expect(reading?.sentences.find(item => item.kind === 'day_stem_elements')
      ?.observedFactPaths).toEqual([
      'subject.pillars.day.value.stem.element',
      'target.pillars.day.value.stem.element',
    ]);
    expect(reading?.sentences.every(item => item.interpersonalMeaningAuthorized === false))
      .toBe(true);
  });

  it('does not invent a cross-position conflict when only combination is present', () => {
    const reading = run(FIRST, DAY_COMBINE).sourceBoundObservationReading;
    expect(reading?.sentences.some(item => item.kind === 'cross_position_opposite'))
      .toBe(false);
    expect(reading?.sentences.some(item => item.kind === 'source_limit')).toBe(true);
    expect(reading?.sourceQualifiedFourCase).toBeNull();
  });

  it('preserves exact people and distinct source observations when order reverses', () => {
    const forward = run(FIRST, DAY_SIX_COMBINE_YEAR_CLASH).sourceBoundObservationReading;
    const reverse = run(DAY_SIX_COMBINE_YEAR_CLASH, FIRST).sourceBoundObservationReading;
    expect(reverse?.subject.calculationHash).toBe(forward?.target.calculationHash);
    expect(reverse?.target.calculationHash).toBe(forward?.subject.calculationHash);
    expect(reverse?.sentences.some(item => item.kind === 'cross_position_opposite'))
      .toBe(true);
    expect(reverse?.mayPublish).toBe(false);
  });

  it('keeps unknown hour unresolved and leaves the ordinary HTML untouched', () => {
    const unknown = { ...DAY_SIX_COMBINE_YEAR_CLASH,
      time: { known: false } } as BirthInput;
    const regular = run(FIRST, unknown, false);
    const researched = run(FIRST, unknown, true);
    const sentence = researched.sourceBoundObservationReading?.sentences.find(
      item => item.kind === 'unknown_hour');
    expect(sentence?.observedFactPaths).toEqual(['target.pillars.hour']);
    expect(researched.sourceBoundObservationReading?.sentences
      .some(item => item.kind === 'day_branch_structure')).toBe(true);
    expect(regular.sourceBoundObservationReading).toBeUndefined();
    expect(researched.html).toBe(regular.html);
    expect(researched.maySell).toBe(false);
  });

  it('accepts distinct people with the same birth information without merging identities', () => {
    const reading = run(FIRST, FIRST).sourceBoundObservationReading;
    expect(reading?.subject.personRef).not.toBe(reading?.target.personRef);
    expect(reading?.subject.calculationHash).toBe(reading?.target.calculationHash);
    expect(reading?.sourceQualifiedFourCase).toBeNull();
  });

  it('rejects forged or detached person evidence before writing Korean sentences', () => {
    const output = run(FIRST, DAY_SIX_COMBINE_YEAR_CLASH);
    const direct = output.directDayComparisonResearch;
    const coexisting = output.coexistingEvidenceReview;
    if (!direct || !coexisting) throw new TypeError('Missing guarded audit.');
    expect(() => buildT10SourceBoundObservationReadingV1({
      ...direct,
      subject: { ...direct.subject, calculationHash: 'wrong-calculation' },
    }, coexisting)).toThrow('protected matching research');
    expect(() => buildT10SourceBoundObservationReadingV1({
      ...direct,
      dayBranch: {
        ...direct.dayBranch,
        verifiedStructuralMatch: direct.dayBranch.verifiedStructuralMatch && {
          ...direct.dayBranch.verifiedStructuralMatch,
          definitionContentHash: '0'.repeat(64),
        },
      },
    }, coexisting)).toThrow('exact chart and source evidence');
    expect(() => buildT10SourceBoundObservationReadingV1({
      ...direct,
      dayBranch: {
        ...direct.dayBranch,
        verifiedStructuralMatch: direct.dayBranch.verifiedStructuralMatch && {
          ...direct.dayBranch.verifiedStructuralMatch,
          sourceIds: ['SRC-NOT-AN-ORIGINAL-TABLE'],
        },
      },
    }, coexisting)).toThrow('exact chart and source evidence');
    expect(() => buildT10SourceBoundObservationReadingV1({
      ...direct,
      sourceFactorAudit: {
        ...direct.sourceFactorAudit,
        sourceQualifiedFourCaseCell: 'STEM_POSITIVE_BRANCH_POSITIVE' as never,
      },
    }, coexisting)).toThrow('protected matching research');
  });
});
