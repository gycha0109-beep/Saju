import { describe, expect, it } from 'vitest';
import type { BirthInput, CanonicalSajuSnapshot } from '../src/contracts/calculation.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../src/production/production-calculation-runtime.js';
import { buildMaritalPalaceIntraChartResearchV1 } from '../src/research/compatibility-marital-palace-intra-chart-research.js';
import { buildCompatibilityT10MethodCoverageV1 } from '../src/research/compatibility-t10-method-coverage.js';
import { buildCompatibilityTwoBirthResearchReading } from '../src/preview/compatibility-two-birth-research-runtime.js';

const CLOCK = new Date('2026-11-11T00:00:00.000Z');
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
const SNAPSHOT = (birth: BirthInput) =>
  calculateAuthorizedMyeonghwaProductionSnapshot(birth, { now: CLOCK }).snapshot;

function expectExactDayObservation(
  actual: ReturnType<typeof buildMaritalPalaceIntraChartResearchV1>['subject'],
  snapshot: CanonicalSajuSnapshot,
  personRef: string,
): void {
  expect(actual.personRef).toBe(personRef);
  expect(actual.snapshotId).toBe(snapshot.snapshotId);
  expect(actual.calculationHash).toBe(snapshot.calculationHash);
  const day = snapshot.pillars.day;
  if (day.status !== 'resolved') {
    expect(actual.state).toBe('unresolved_day_pillar');
    expect(actual.evidence).toBeUndefined();
    return;
  }
  expect(actual.state).toBe(
    day.value.stem.element === day.value.branch.element ? 'same_element' : 'different_element',
  );
  expect(actual.evidence).toEqual({
    stemFactPath: 'pillars.day.value.stem.element',
    branchFactPath: 'pillars.day.value.branch.element',
    stemElement: day.value.stem.element,
    branchElement: day.value.branch.element,
  });
}

describe('source-bounded single-chart marital palace research', () => {
  it('preserves two independent real calculated day-stem/branch element observations', () => {
    const a = SNAPSHOT(FIRST);
    const b = SNAPSHOT(SECOND);
    const result = buildMaritalPalaceIntraChartResearchV1(
      { personRef: 'self', snapshot: a },
      { personRef: 'other', snapshot: b },
    );
    expectExactDayObservation(result.subject, a, 'self');
    expectExactDayObservation(result.target, b, 'other');
    expect(result.source).toMatchObject({
      doi: '10.22143/HSS21.9.2.9',
      verifiedTextLayer: 'KCI_ABSTRACT_ONLY',
    });
    expect(result.scope).toBe('two_independent_natal_observations');
    expect(result.sourceInterpretation).toBe('historical_marital_case_study_only');
    expect(result.pairwiseT10Admitted).toBe(false);
    expect(result.mayClaimRelationshipOutcome).toBe(false);
    expect(result.mayPublish).toBe(false);
    expect(result.maySell).toBe(false);
  });

  it('leaves the ordinary preview unchanged and returns observations only on private research opt-in', () => {
    const request = {
      requestId: 'marital-palace-review',
      subjectPersonRef: 'self',
      targetPersonRef: 'other',
      referenceDateTime: CLOCK.toISOString(),
    };
    const ordinary = buildCompatibilityTwoBirthResearchReading(FIRST, SECOND, request);
    const scoped = buildCompatibilityTwoBirthResearchReading(
      FIRST, SECOND,
      { ...request, candidateScope: 'traditional_marital_palace_comparison' },
    );
    expect(ordinary.maritalPalaceIntraChartResearch).toBeUndefined();
    expect(scoped.maritalPalaceIntraChartResearch).toBeDefined();
    expect(scoped.maritalPalaceIntraChartResearch?.subject.snapshotId)
      .toBe(scoped.report.subject.snapshotId);
    expect(scoped.maritalPalaceIntraChartResearch?.target.snapshotId)
      .toBe(scoped.report.target.snapshotId);
    expect(scoped.maritalPalaceIntraChartResearch?.pairwiseT10Admitted).toBe(false);
    expect(scoped.html).toBe(ordinary.html);
    expect(scoped.mayClaimInterpersonalMeaning).toBe(false);
    expect(scoped.maySell).toBe(false);
  });

  it('does not manufacture an hour fact or a relationship prediction when birth hour is unknown', () => {
    const uncertain = { ...SECOND, time: { known: false } } as BirthInput;
    const a = SNAPSHOT(FIRST);
    const b = SNAPSHOT(uncertain);
    const result = buildMaritalPalaceIntraChartResearchV1(
      { personRef: 'self', snapshot: a },
      { personRef: 'other', snapshot: b },
    );
    expectExactDayObservation(result.target, b, 'other');
    expect(b.completeness.birthTimeKnown).toBe(false);
    expect(result.pairwiseT10Admitted).toBe(false);
    expect(result.mayClaimRelationshipOutcome).toBe(false);
  });

  it('rejects mapping one person to both sides of the same research pair', () => {
    const a = SNAPSHOT(FIRST);
    expect(() => buildMaritalPalaceIntraChartResearchV1(
      { personRef: 'same', snapshot: a },
      { personRef: 'same', snapshot: a },
    )).toThrow('distinct nonblank persons');
  });
});

describe('three-method source coverage is evidence, not a T10 claim', () => {
  const request = {
    requestId: 'three-method-research',
    subjectPersonRef: 'self',
    targetPersonRef: 'other',
    referenceDateTime: CLOCK.toISOString(),
    candidateScope: 'traditional_marital_palace_comparison' as const,
  };

  it('retains palace facts and historical R069 spouse-star sources, but holds useful-god inference', () => {
    const ordinary = buildCompatibilityTwoBirthResearchReading(FIRST, SECOND, {
      ...request, candidateScope: undefined,
    });
    const scoped = buildCompatibilityTwoBirthResearchReading(FIRST, SECOND, request);
    const coverage = scoped.methodCoverage;
    expect(ordinary.methodCoverage).toBeUndefined();
    expect(coverage).toBeDefined();
    expect(coverage?.palace.status).toBe('bounded_factual_observations');
    expect(coverage?.palace.crossChartDayBranch).toEqual(scoped.maritalDayBranchCandidate);
    expect(coverage?.palace.personalDayPalace).toEqual(scoped.maritalPalaceIntraChartResearch);
    expect(coverage?.sixSpirits.status).toBe('historical_single_chart_only');
    expect(coverage?.sixSpirits.sourceCorpus).toBe('R069');
    expect(coverage?.sixSpirits.originalSourceSurfaces.length).toBeGreaterThan(0);
    expect(coverage?.sixSpirits.originalSourceSurfaces.every(
      source => source.eligiblePairwiseClaim === false && source.missingPrerequisites.length > 0,
    )).toBe(true);
    expect(coverage?.sixSpirits.crossChartMethodEstablished).toBe(false);
    expect(coverage?.usefulGod.status).toBe('pairwise_rule_not_established_in_reviewed_sources');
    expect(coverage?.usefulGod.researchMethodSource.originalTextLayer).toBe('RISS_ABSTRACT');
    expect(coverage?.unresolvedMethodConflicts).toContain('NO_VERIFIED_THREE_METHOD_PRECEDENCE');
    expect(coverage?.pairwiseT10Admitted).toBe(false);
    expect(coverage?.mayClaimRelationshipOutcome).toBe(false);
    expect(coverage?.mayGrantOfficialAuthority).toBe(false);
    expect(coverage?.mayPublish).toBe(false);
    expect(coverage?.maySell).toBe(false);
    expect(scoped.html).toBe(ordinary.html);
  });

  it('binds the audit to the exact two person/chart identities under role reversal', () => {
    const forward = buildCompatibilityTwoBirthResearchReading(FIRST, SECOND, request);
    const reverse = buildCompatibilityTwoBirthResearchReading(SECOND, FIRST, request);
    const f = forward.methodCoverage;
    const b = reverse.methodCoverage;
    expect(f?.palace.personalDayPalace.subject.snapshotId)
      .toBe(forward.report.subject.snapshotId);
    expect(f?.palace.personalDayPalace.target.snapshotId)
      .toBe(forward.report.target.snapshotId);
    expect(b?.palace.personalDayPalace.subject.snapshotId)
      .toBe(reverse.report.subject.snapshotId);
    expect(b?.palace.personalDayPalace.target.snapshotId)
      .toBe(reverse.report.target.snapshotId);
    expect(b?.palace.personalDayPalace.subject.calculationHash)
      .toBe(f?.palace.personalDayPalace.target.calculationHash);
    expect(reverse.methodCoverage?.pairwiseT10Admitted).toBe(false);
  });

  it('rejects altered chart identity before classifying any source coverage', () => {
    const scoped = buildCompatibilityTwoBirthResearchReading(FIRST, SECOND, request);
    const candidate = scoped.maritalDayBranchCandidate;
    const palace = scoped.maritalPalaceIntraChartResearch;
    if (!candidate || !palace) throw new TypeError('Expected opt-in research');
    const inconsistent = {
      ...palace,
      target: { ...palace.target, calculationHash: 'altered' },
    };
    expect(() => buildCompatibilityT10MethodCoverageV1(
      scoped.sourceScopeHandoff, candidate, inconsistent,
    )).toThrow('exact people and HOLD authority');
  });

  it('keeps unknown birth hour unresolved without making a pairwise conclusion', () => {
    const unknown = { ...SECOND, time: { known: false } } as BirthInput;
    const out = buildCompatibilityTwoBirthResearchReading(FIRST, unknown, request);
    expect(out.methodCoverage?.palace.personalDayPalace.target.calculationHash)
      .toBe(out.report.target.calculationHash);
    expect(out.methodCoverage?.pairwiseT10Admitted).toBe(false);
    expect(out.methodCoverage?.usefulGod.status)
      .toBe('pairwise_rule_not_established_in_reviewed_sources');
    expect(out.maySell).toBe(false);
  });
});
