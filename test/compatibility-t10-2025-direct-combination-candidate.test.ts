import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { buildCompatibilityTwoBirthResearchReading } from
  '../src/preview/compatibility-two-birth-research-runtime.js';
import { observeT102025DirectCombinationCandidates } from
  '../src/research/compatibility-t10-2025-direct-combination-candidate.js';

function birth(year: number, month: number, day: number, known = true): BirthInput {
  return {
    calendarType: 'solar',
    date: { year, month, day },
    time: known ? { known: true, hour: 14, minute: 30 } : { known: false },
    sexForTraditionalCalculation: 'unspecified',
  };
}
const A = birth(1990, 5, 15);
const DAY_COMBO = birth(1996, 6, 5);
const YEAR_COMBO = birth(2017, 5, 15);
const AT = '2026-11-11T00:00:00.000Z';
function run(a: BirthInput, b: BirthInput, optIn = true) {
  return buildCompatibilityTwoBirthResearchReading(a, b, {
    requestId: 'source-limited-2025-direct-combination',
    subjectPersonRef: 'subject-person',
    targetPersonRef: 'target-person',
    referenceDateTime: AT,
    ...(optIn ? { candidateScope: 'traditional_marital_palace_comparison' as const } : {}),
  });
}

describe('2025 author-quoted direct day/year marriage candidate', () => {
  it('traces exact sourced day/day branch combination in two-person research', () => {
    const result = run(A, DAY_COMBO);
    const research = result.directCombination2025Research;
    expect(research?.source.verifiedTextLayer)
      .toBe('AUTHOR_POSTED_INDEXED_HTML_MAIN_TEXT');
    expect(research?.source.secondaryOriginalVerified).toBe(false);
    expect(research?.source.pdfFullTextVerified).toBe(false);
    expect(research?.candidates).toContainEqual(expect.objectContaining({
      orientation: 'subject_day_to_target_birth',
      anchorPersonRef: 'subject-person',
      birthPersonRef: 'target-person',
      birthPillar: 'day',
      kind: 'branch_six_combination',
      evidence: expect.objectContaining({
        subject: { factPath: 'subject.pillars.day.value.branch', value: '진' },
        target: { factPath: 'target.pillars.day.value.branch', value: '유' },
        pairwiseMeaningAuthorized: false,
        definitionContentHash: expect.stringMatching(/^[a-f0-9]{64}$/u),
      }),
      currentRelationshipOutcomeAdmitted: false,
    }));
    expect(research?.compatibilityScore).toBeNull();
    expect(research?.compatibilityVerdict).toBeNull();
    expect(research?.maySell).toBe(false);
    expect(result.mayClaimInterpersonalMeaning).toBe(false);
  });

  it('observes an actual day-to-birth-year six-combination without using unqualified other slots', () => {
    const research = run(A, YEAR_COMBO).directCombination2025Research;
    expect(research?.candidates.some(item =>
      item.orientation === 'subject_day_to_target_birth' &&
      item.birthPillar === 'year' &&
      item.kind === 'branch_six_combination' &&
      item.evidence.subject.factPath === 'subject.pillars.day.value.branch' &&
      item.evidence.target.factPath === 'target.pillars.year.value.branch' &&
      item.evidence.target.value === '유')).toBe(true);
    for (const candidate of research?.candidates ?? []) {
      expect(['day', 'year']).toContain(candidate.birthPillar);
      expect(candidate.evidence.subject.factPath).not.toContain('.hour.');
      expect(candidate.evidence.target.factPath).not.toContain('.hour.');
      expect(candidate.evidence.sourceIds.length).toBeGreaterThan(0);
      expect(candidate.currentRelationshipOutcomeAdmitted).toBe(false);
    }
  });

  it('preserves input order and protects unknown-time and no-match states', () => {
    const forward = run(A, DAY_COMBO).directCombination2025Research;
    const reverse = run(DAY_COMBO, A).directCombination2025Research;
    expect(forward?.subject.calculationHash).toBe(reverse?.target.calculationHash);
    expect(forward?.target.calculationHash).toBe(reverse?.subject.calculationHash);
    expect(forward?.sourceInterpretationStatus)
      .toBe('SECONDARY_TRADITIONAL_CLAUSE_UNVALIDATED');
    const unknown = run(A, birth(2017, 5, 15, false)).directCombination2025Research;
    expect(unknown?.candidates.every(x =>
      !x.evidence.subject.factPath.includes('.hour.') &&
      !x.evidence.target.factPath.includes('.hour.'))).toBe(true);
    expect(unknown?.pairwiseT10Admitted).toBe(false);
  });

  it('rejects forged research permission and hides new evidence from ordinary preview', () => {
    const protectedResult = run(A, DAY_COMBO, false);
    const researchResult = run(A, DAY_COMBO);
    expect(protectedResult.directCombination2025Research).toBeUndefined();
    expect(protectedResult.html).toBe(researchResult.html);
    expect(researchResult.directCombination2025Research).toBeDefined();
    const copied = { ...researchResult.sourceScopeHandoff, maySell: true as const };
    expect(() => observeT102025DirectCombinationCandidates(
      copied as typeof researchResult.sourceScopeHandoff,
    )).toThrow();
    expect(researchResult.maySell).toBe(false);
  });
});
