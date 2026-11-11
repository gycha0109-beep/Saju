import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { buildCompatibilityTwoBirthResearchReading } from
  '../src/preview/compatibility-two-birth-research-runtime.js';
import { buildT10PairReadingBoundaryDraftV1 } from
  '../src/research/compatibility-t10-pair-reading-boundary-draft.js';

function birth(
  year: number, month: number, day: number,
  sex: 'male' | 'female' | 'unspecified' = 'unspecified',
  hourKnown = true,
): BirthInput {
  return {
    calendarType: 'solar',
    date: { year, month, day },
    time: hourKnown ? { known: true, hour: 14, minute: 30 } : { known: false },
    sexForTraditionalCalculation: sex,
  };
}
const A = birth(1990, 5, 15);
const COMBINATION_AND_CLASH = birth(1996, 6, 5);
const CLASH_AND_COMBINATION = birth(1996, 8, 5);
const NONMIXED = birth(1990, 5, 8);
const DAY_YEAR = birth(2017, 5, 15);
function run(a: BirthInput, b: BirthInput, research = true) {
  return buildCompatibilityTwoBirthResearchReading(a, b, {
    requestId: 'pair-reading-limited-integrated-draft',
    subjectPersonRef: 'first-human',
    targetPersonRef: 'second-human',
    referenceDateTime: '2026-11-11T00:00:00.000Z',
    ...(research ? { candidateScope: 'traditional_marital_palace_comparison' as const }
      : {}),
  });
}
function sources(o: ReturnType<typeof run>) {
  const f = o.sourceBoundObservationReading;
  const h = o.historicalDayYearObservation;
  const c = o.crossMethodContrastResearch;
  const m = o.threeMethodApplicabilityReading;
  if (!f || !h || !c || !m) throw new TypeError('Expected research-only input.');
  return [f, h, c, m] as const;
}
describe('T10 source-bounded pair reading: no unsupported relationship judgment', () => {
  it('writes different Korean descriptions for opposite actual mixed structures', () => {
    const left = run(A, COMBINATION_AND_CLASH).pairReadingBoundaryDraft;
    const right = run(A, CLASH_AND_COMBINATION).pairReadingBoundaryDraft;
    expect(left?.structuralSituation)
      .toBe('day_six_combination_with_other_clash');
    expect(right?.structuralSituation)
      .toBe('day_clash_with_other_six_combination');
    expect(left?.koreanReadingDraft).toContain(
      '일지 사이에는 육합이 있고 다른 위치에는 충');
    expect(right?.koreanReadingDraft).toContain(
      '일지 사이에는 충이 있고 다른 위치에는 육합');
    expect(left?.koreanReadingDraft).not.toBe(right?.koreanReadingDraft);
    const mixed = left?.sections.find(section => section.id === 'mixed_positions');
    expect(mixed?.sentences[0]?.observedFactPaths).toEqual(
      expect.arrayContaining([
        'subject.pillars.day.value.branch',
        'target.pillars.day.value.branch',
        'subject.pillars.year.value.branch',
        'target.pillars.year.value.branch',
      ]),
    );
    expect(mixed?.sentences[0]?.missingPrerequisites)
      .toContain('EXACT_TWO_PERSON_PRIORITIZATION_RULE');
    expect(left?.relationshipOutcome).toBeNull();
  });

  it('does not manufacture a mixed-position section when that case is absent', () => {
    const draft = run(A, NONMIXED).pairReadingBoundaryDraft;
    expect(draft?.structuralSituation)
      .toBe('no_source_qualified_mixed_day_structure');
    expect(draft?.sections.some(section => section.id === 'mixed_positions')).toBe(false);
    expect(draft?.sections.some(section => section.id === 'reading_limits')).toBe(true);
    expect(draft?.mayInterpretOverallCompatibility).toBe(false);
  });

  it('includes unpromoted day/year details only when they are actually matched', () => {
    const draft = run(A, DAY_YEAR).pairReadingBoundaryDraft;
    const section = draft?.sections.find(s => s.id === 'day_to_year_facts');
    expect(section?.sentences.some(sentence =>
      sentence.observedFactPaths[0] === 'subject.pillars.day.value.branch' &&
      sentence.observedFactPaths[1] === 'target.pillars.year.value.branch')).toBe(true);
    expect(section?.sentences[0]?.sourceUrls).toContain(
      'https://namestory.kr/bbs/board.php?bo_table=sub3_1&wr_id=418');
    expect(section?.sentences.every(sentence =>
      sentence.evidenceLayer === 'traditional_reference')).toBe(true);
    expect(draft?.eligibleForFirstComparison).toBe(false);
    expect(draft?.eligibleForRepeatComparison).toBe(false);
    expect(draft?.eligibleForNatalAndFirstBundle).toBe(false);
  });

  it('keeps legacy historical roles limited and unverified method paths separate', () => {
    const m = birth(1990, 5, 15, 'male');
    const f = birth(1996, 6, 5, 'female');
    const draft = run(m, f).pairReadingBoundaryDraft;
    const history = draft?.sections.find(s =>
      s.id === 'historical_method_disagreement')?.sentences[0];
    expect(history?.observedFactPaths.length).toBeGreaterThan(0);
    expect(history?.sourceUrls).toHaveLength(2);
    expect(history?.paragraph).toContain('상반된 궁합 결과가 입증된 것은 아닙니다');
    const methods = draft?.sections.filter(s => s.id.endsWith('_method'));
    expect(methods).toHaveLength(3);
    expect(methods?.every(section =>
      section.sentences[0]?.evidenceLayer === 'method_applicability' &&
      section.sentences[0]?.observedFactPaths.length === 0 &&
      section.sentences[0]?.consideredButUnverifiedFactPaths.length > 0)).toBe(true);
    expect(draft?.compatibilityScore).toBeNull();
    expect(draft?.maySell).toBe(false);
  });

  it('does not apply historical male/female star conclusions to unspecified roles', () => {
    const draft = run(A, COMBINATION_AND_CLASH).pairReadingBoundaryDraft;
    const history = draft?.sections.find(s =>
      s.id === 'historical_method_disagreement')?.sentences[0];
    expect(history?.observedFactPaths).toEqual([]);
    expect(history?.paragraph).toContain('해당하지 않습니다');
    expect(history?.individualRelationshipOutcomeAuthorized).toBe(false);
  });

  it('keeps missing birth hour, reversed people and identical charts distinct', () => {
    const partial = birth(1996, 6, 5, 'female', false);
    const forward = run(birth(1990, 5, 15, 'male'), partial).pairReadingBoundaryDraft;
    const reverse = run(partial, birth(1990, 5, 15, 'male')).pairReadingBoundaryDraft;
    expect(forward?.target.calculationHash).toBe(reverse?.subject.calculationHash);
    const limits = forward?.sections.find(s => s.id === 'reading_limits');
    expect(limits?.sentences.some(sentence =>
      sentence.evidenceLayer === 'missing_input' &&
      sentence.consideredButUnverifiedFactPaths.includes('target.pillars.hour'))).toBe(true);
    const identical = run(A, A).pairReadingBoundaryDraft;
    expect(identical?.subject.personRef).not.toBe(identical?.target.personRef);
    expect(identical?.subject.calculationHash).toBe(identical?.target.calculationHash);
    expect(identical?.eligibleForRepeatComparison).toBe(false);
  });

  it('rejects detached identity and fabricated precedence or foreign mixed facts', () => {
    const o = run(A, COMBINATION_AND_CLASH);
    const [f, h, c, m] = sources(o);
    expect(() => buildT10PairReadingBoundaryDraftV1(
      f, h, { ...c, target: { ...c.target, calculationHash: 'foreign' } }, m,
    )).toThrow('same unpromoted chart evidence');
    expect(() => buildT10PairReadingBoundaryDraftV1(
      f, h, { ...c, structural: c.structural.map(item => ({
        ...item, conditionalPriorityEstablished: true as never,
      })) }, m,
    )).toThrow('same unpromoted chart evidence');
    expect(() => buildT10PairReadingBoundaryDraftV1(
      f, h, {
        ...c, structural: c.structural.map(item => ({
          ...item,
          otherFactPaths: item.otherFactPaths.map(p => ({
            ...p, target: 'target.pillars.hour.value.branch',
          })),
        })),
      }, m,
    )).toThrow('original mixed-position facts');
  });

  it('does not change the existing customer page or enable official issuance', () => {
    const ordinary = run(A, COMBINATION_AND_CLASH, false);
    const scoped = run(A, COMBINATION_AND_CLASH, true);
    expect(ordinary.pairReadingBoundaryDraft).toBeUndefined();
    expect(scoped.pairReadingBoundaryDraft?.koreanReadingDraft.length)
      .toBeGreaterThan(200);
    expect(scoped.pairReadingBoundaryDraft?.sections.every(section =>
      section.sentences.every(sentence =>
        sentence.individualRelationshipOutcomeAuthorized === false &&
        sentence.paragraph.trim().length > 0))).toBe(true);
    expect(ordinary.html).toBe(scoped.html);
    expect(scoped.mayMarkMenuAvailable).toBe(false);
    expect(scoped.mayPersist).toBe(false);
    expect(scoped.maySell).toBe(false);
  });
});
