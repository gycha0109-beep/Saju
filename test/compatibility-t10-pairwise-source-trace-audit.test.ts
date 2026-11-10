import { describe, expect, it } from 'vitest';
import type { BirthInput, CanonicalSajuSnapshot, PillarSlot } from '../src/contracts/calculation.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from
  '../src/production/production-calculation-runtime.js';
import { buildCompatibilityTwoBirthResearchReading } from
  '../src/preview/compatibility-two-birth-research-runtime.js';

const AT = '2026-11-11T00:00:00.000Z';
function birth(year: number, month: number, day: number, known = true): BirthInput {
  return {
    calendarType: 'solar',
    date: { year, month, day },
    time: known ? { known: true, hour: 14, minute: 30 } : { known: false },
    sexForTraditionalCalculation: 'unspecified',
  };
}

const INPUTS = [
  birth(1990, 5, 15),
  birth(1990, 5, 8),
  birth(1990, 5, 9),
  birth(1996, 6, 5),
  birth(1996, 8, 5),
  birth(1996, 6, 5, false),
] as const satisfies readonly BirthInput[];
const PAIRS: readonly (readonly [number, number])[] = [
  [0, 1], [0, 2], [0, 3], [3, 0], [0, 4], [4, 0], [0, 5], [0, 0],
];

function run(first: BirthInput, second: BirthInput) {
  return buildCompatibilityTwoBirthResearchReading(first, second, {
    requestId: 'synthetic-t10-trace-audit',
    subjectPersonRef: 'subject',
    targetPersonRef: 'target',
    referenceDateTime: AT,
    candidateScope: 'traditional_marital_palace_comparison',
  });
}
const PILLAR = /^(subject|target)\.pillars\.(year|month|day|hour)\.value\.(stem|branch)$/u;

function exactFact(
  path: string,
  value: string,
  subject: CanonicalSajuSnapshot,
  target: CanonicalSajuSnapshot,
): void {
  const matched = PILLAR.exec(path);
  if (!matched) throw new TypeError('Unrecognized structural fact path: ' + path);
  const owner = matched[1] === 'subject' ? subject : target;
  const slot = matched[2] as PillarSlot;
  const component = matched[3] as 'stem' | 'branch';
  const pillar = owner.pillars[slot];
  expect(pillar.status).toBe('resolved');
  if (pillar.status !== 'resolved') return;
  expect(value).toBe(pillar.value[component].value);
}

describe('T10 source-trace quality review on fixed synthetic chart pairs', () => {
  it.each(PAIRS)('checks each structural source against independently calculated charts for pair %i/%i', (firstIndex, secondIndex) => {
    const first = INPUTS[firstIndex];
    const second = INPUTS[secondIndex];
    if (!first || !second) throw new TypeError('Missing synthetic fixture');
    const result = run(first, second);
    const subject = calculateAuthorizedMyeonghwaProductionSnapshot(
      first, { now: new Date(AT) },
    ).snapshot;
    const target = calculateAuthorizedMyeonghwaProductionSnapshot(
      second, { now: new Date(AT) },
    ).snapshot;
    const handoff = result.sourceScopeHandoff;
    const review = result.coexistingEvidenceReview;
    if (!review || !result.methodCoverage) throw new TypeError('Private scope audit missing');
    expect(handoff.subject.snapshotId).toBe(subject.snapshotId);
    expect(handoff.target.snapshotId).toBe(target.snapshotId);
    expect(handoff.subject.calculationHash).toBe(subject.calculationHash);
    expect(handoff.target.calculationHash).toBe(target.calculationHash);
    expect(review.subject.calculationHash).toBe(subject.calculationHash);
    expect(review.target.calculationHash).toBe(target.calculationHash);

    for (const match of handoff.crossChartStructuralMatches) {
      exactFact(match.subject.factPath, match.subject.value, subject, target);
      exactFact(match.target.factPath, match.target.value, subject, target);
      expect(match.sourceIds.length).toBeGreaterThan(0);
      expect(match.sourceIds.every(id => id.startsWith('SRC-T0-'))).toBe(true);
      expect(match.definitionContentHash).toMatch(/^[0-9a-f]{64}$/u);
      expect(match.pairwiseMeaningAuthorized).toBe(false);
    }
    for (const factor of [
      ...review.structural.dayToDayMatches,
      ...review.structural.otherSlotSixCombinations,
      ...review.structural.otherSlotClashes,
    ]) {
      expect(handoff.crossChartStructuralMatches).toContainEqual(factor);
    }
    expect(review.individualPalace.subject.calculationHash)
      .toBe(subject.calculationHash);
    expect(review.individualPalace.target.calculationHash)
      .toBe(target.calculationHash);
    expect(review.synthesis.state)
      .toBe('unresolved_no_source_qualified_pairwise_precedence');
    expect(review.synthesis.compatibilityScore).toBeNull();
    expect(review.synthesis.inferredOutcome).toBeNull();
    expect(result.sourceScopeHandoff.pairwiseT10Admitted).toBe(false);
    expect(result.mayClaimInterpersonalMeaning).toBe(false);
    expect(result.mayGrantOfficialAuthority).toBe(false);
    expect(result.mayPersist).toBe(false);
    expect(result.mayPublish).toBe(false);
    expect(result.maySell).toBe(false);
  });

  it('proves missing hour does not create a hidden input or an absent-match assertion', () => {
    const subject = INPUTS[0];
    const second = INPUTS[5];
    if (!subject || !second) throw new TypeError('Missing fixtures');
    const output = run(subject, second);
    expect(output.sourceScopeHandoff.target.birthTimeKnown).toBe(false);
    expect(output.sourceScopeHandoff.crossChartStructuralMatches.every(m =>
      !m.target.factPath.startsWith('target.pillars.hour.'),
    )).toBe(true);
    expect(output.coexistingEvidenceReview?.synthesis.inferredOutcome).toBeNull();
  });

  it('rejects a fabricated result even when both individuals share one calculated chart', () => {
    const first = INPUTS[0];
    if (!first) throw new TypeError('Missing chart');
    const result = run(first, first);
    expect(result.report.subject.personRef).not.toBe(result.report.target.personRef);
    expect(result.report.subject.calculationHash).toBe(result.report.target.calculationHash);
    expect(result.coexistingEvidenceReview?.synthesis.compatibilityScore).toBeNull();
    expect(result.coexistingEvidenceReview?.pairwiseT10Admitted).toBe(false);
    expect(result.sourceScopeHandoff.mayMarkMenuAvailable).toBe(false);
  });
});
