import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { buildCompatibilityTwoBirthResearchReading } from
  '../src/preview/compatibility-two-birth-research-runtime.js';
import {
  buildT10RelationshipContextBoundaryV1,
  type T10DeclaredRelationshipContext,
} from '../src/research/compatibility-t10-relationship-context-boundary.js';

const person = (
  year: number, month: number, day: number,
  known = true,
  sex: 'male' | 'female' | 'unspecified' = 'unspecified',
): BirthInput => ({
  calendarType: 'solar',
  date: { year, month, day },
  time: known ? { known: true, hour: 14, minute: 30 } : { known: false },
  sexForTraditionalCalculation: sex,
});
const A = person(1990, 5, 15);
const MATCHED = person(1996, 6, 5);
const OPPOSITE = person(1996, 8, 5);

function run(
  first: BirthInput, second: BirthInput,
  relationshipContext?: T10DeclaredRelationshipContext,
  optIn = true,
) {
  return buildCompatibilityTwoBirthResearchReading(first, second, {
    requestId: 'scope-check-for-direct-pairwise-t10-method',
    subjectPersonRef: 'person-1',
    targetPersonRef: 'person-2',
    referenceDateTime: '2026-11-11T00:00:00.000Z',
    ...(optIn ? { candidateScope: 'traditional_marital_palace_comparison' as const } : {}),
    ...(relationshipContext ? { relationshipContext } : {}),
  });
}
describe('T10 relationship context: research population scope never becomes a verdict', () => {
  it('retains source-limited marriage methods but no spouse outcome even for a couple', () => {
    const reading = run(person(1990, 5, 15, true, 'male'),
      person(1996, 6, 5, true, 'female'), 'married_couple');
    const scope = reading.relationshipContextBoundary;
    expect(scope?.contextSourceApplicability)
      .toBe('marital_population_overlap_not_prediction');
    expect(scope?.withheldMaritalMethodSectionIds).toEqual([]);
    expect(scope?.includedSectionIds).toContain('historical_method_disagreement');
    expect(scope?.includedSectionIds).toContain('traditional_day_factor_scope');
    expect(scope?.contextBoundedKoreanDraft).toContain(
      '서로의 차이를 인정하고 역할에 합의한 경우');
    expect(scope?.contextBoundedKoreanDraft).toContain('두 사람이 그러한 행동을 했거나');
    expect(scope?.includedSectionIds).toContain('useful_god_method');
    expect(scope?.sourcePopulations).toHaveLength(4);
    expect(scope?.sourcePopulations.every(source =>
      source.declaredContextOverlapsStudyPopulation &&
      source.relationshipVerdictSupported === false)).toBe(true);
    expect(scope?.scopeParagraph).toContain('이혼 가능성을');
    expect(scope?.relationshipVerdict).toBeNull();
    expect(scope?.productInterpretationReady).toBe(false);
  });

  it.each(['romantic_partner', 'friend', 'family', 'colleague'] as const)(
    'withholds marriage-method conclusions for relationship context %s',
    relation => {
      const reading = run(A, MATCHED, relation);
      const scope = reading.relationshipContextBoundary;
      expect(scope?.contextSourceApplicability)
        .toBe('outside_verifiable_marital_population');
      expect(scope?.includedSectionIds).toContain('direct_day_facts');
      expect(scope?.includedSectionIds).toContain('mixed_positions');
      expect(scope?.includedSectionIds).toContain('reading_limits');
      expect(scope?.withheldMaritalMethodSectionIds)
        .toContain('traditional_day_factor_scope');
      expect(scope?.contextBoundedKoreanDraft)
        .not.toContain('서로의 차이를 인정하고 역할에 합의한 경우');
      expect(scope?.withheldMaritalMethodSectionIds)
        .toEqual(expect.arrayContaining([
          'historical_method_disagreement',
          'palace_method', 'six_spirits_method', 'useful_god_method',
        ]));
      expect(scope?.contextBoundedKoreanDraft).not.toContain('고전 방법의 적용 한계');
      expect(scope?.contextBoundedKoreanDraft).not.toContain('용신론 검증 범위');
      expect(scope?.contextBoundedKoreanDraft).toContain('구조');
      expect(scope?.sourcePopulations.every(source =>
        !source.declaredContextOverlapsStudyPopulation)).toBe(true);
      expect(scope?.mayPublish).toBe(false);
      expect(scope?.maySell).toBe(false);
    },
  );

  it('does not infer a spouse relationship for unspecified study context', () => {
    const scope = run(A, MATCHED).relationshipContextBoundary;
    expect(scope?.contextDeclaredByResearchCaller).toBe('unspecified');
    expect(scope?.contextSourceApplicability)
      .toBe('no_relationship_context_supplied');
    expect(scope?.withheldMaritalMethodSectionIds).toContain('palace_method');
    expect(scope?.contextBoundedKoreanDraft).toContain('관계 유형이 정해지지 않았습니다');
  });

  it('preserves both structural directions without invented modern meanings', () => {
    const first = run(A, MATCHED, 'friend').relationshipContextBoundary;
    const opposite = run(A, OPPOSITE, 'friend').relationshipContextBoundary;
    expect(first?.contextBoundedKoreanDraft)
      .toContain('일지 사이에는 육합이 있고 다른 위치에는 충');
    expect(opposite?.contextBoundedKoreanDraft)
      .toContain('일지 사이에는 충이 있고 다른 위치에는 육합');
    expect(first?.compatibilityScore).toBeNull();
    expect(opposite?.modernInterpersonalEffectEstablished).toBe(false);
  });

  it('keeps identity and unknown birth hour distinct even on reversal', () => {
    const unknown = person(1996, 6, 5, false);
    const forward = run(A, unknown, 'friend').relationshipContextBoundary;
    const reverse = run(unknown, A, 'friend').relationshipContextBoundary;
    expect(forward?.target.calculationHash).toBe(reverse?.subject.calculationHash);
    expect(forward?.contextBoundedKoreanDraft).toContain('시각');
    expect(reverse?.contextBoundedKoreanDraft).toContain('시각');
    const same = run(A, A, 'friend').relationshipContextBoundary;
    expect(same?.subject.personRef).not.toEqual(same?.target.personRef);
    expect(same?.subject.calculationHash).toBe(same?.target.calculationHash);
  });

  it('rejects fake study types and cross-person research before filtering', () => {
    const output = run(A, MATCHED, 'married_couple');
    const draft = output.pairReadingBoundaryDraft;
    const quality = output.productReadingQualityReview;
    if (!draft || !quality) throw new TypeError('Missing guarded T10 research.');
    expect(() => buildT10RelationshipContextBoundaryV1(
      draft, quality, 'secret_fabricated_relationship' as T10DeclaredRelationshipContext,
    )).toThrow('verified unpromoted');
    expect(() => buildT10RelationshipContextBoundaryV1(
      draft, { ...quality, subject: { ...quality.subject, personRef: 'foreign' } },
      'married_couple',
    )).toThrow('verified unpromoted');
    expect(() => run(A, MATCHED, 'friend', false))
      .toThrow('explicit private source opt-in');
  });

  it('does not alter customer HTML, entitlements or official T10', () => {
    const regular = run(A, MATCHED, undefined, false);
    const a = run(A, MATCHED, 'married_couple');
    const b = run(A, MATCHED, 'friend');
    expect(regular.relationshipContextBoundary).toBeUndefined();
    expect(regular.html).toBe(a.html);
    expect(a.html).toBe(b.html);
    expect(a.mayMarkMenuAvailable).toBe(false);
    expect(b.mayPersist).toBe(false);
    expect(b.productReadingQualityReview?.actualCompatibilityReadingReady)
      .toBe(false);
    expect(a.relationshipContextBoundary?.mayGrantOfficialAuthority).toBe(false);
  });
});
