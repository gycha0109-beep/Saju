import { describe, expect, it } from 'vitest';
import type { BirthInput, CanonicalSajuSnapshot, TenGod } from
  '../src/contracts/calculation.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from
  '../src/production/production-calculation-runtime.js';
import { buildCompatibilityTwoBirthResearchReading } from
  '../src/preview/compatibility-two-birth-research-runtime.js';
import { auditT102018DivorcedCoupleMethodBoundaryV1 } from
  '../src/research/compatibility-t10-2018-marital-divorce-study-boundary.js';

const CLOCK = '2026-11-11T00:00:00.000Z';
function birth(
  year: number, month: number, day: number,
  sex: 'male' | 'female' | 'unspecified' = 'unspecified',
  known = true,
): BirthInput {
  return {
    calendarType: 'solar',
    date: { year, month, day },
    time: known ? { known: true, hour: 14, minute: 30 } : { known: false },
    sexForTraditionalCalculation: sex,
  };
}
const MALE = birth(1990, 5, 15, 'male');
const FEMALE = birth(1996, 6, 5, 'female');
const snap = (b: BirthInput) =>
  calculateAuthorizedMyeonghwaProductionSnapshot(b, { now: new Date(CLOCK) }).snapshot;
const run = (a: BirthInput, b: BirthInput, enabled = true) =>
  buildCompatibilityTwoBirthResearchReading(a, b, {
    requestId: '2018-divorce-source-method-review',
    subjectPersonRef: 'human-subject',
    targetPersonRef: 'human-target',
    referenceDateTime: CLOCK,
    ...(enabled ? { candidateScope: 'traditional_marital_palace_comparison' as const } : {}),
  });

function expectVisibleStars(
  actual: NonNullable<ReturnType<typeof run>['divorceStudy2018MethodBoundary']>['subject'],
  b: BirthInput,
  expected: readonly TenGod[],
): void {
  const snapshot = snap(b);
  const observed = actual.visibleSpouseStarPositions;
  const t5 = snapshot.derivedFacts.tenGods;
  expect(actual.calculationHash).toBe(snapshot.calculationHash);
  expect(actual.visibleSlotCount).toBe(observed.length);
  for (const item of observed) {
    expect(expected).toContain(item.value);
    expect(item.factPath).toBe('derivedFacts.tenGods.' + item.pillar + '.' + item.channel);
    expect(t5.status).toBe('resolved');
    if (t5.status === 'resolved') {
      expect(t5.value[item.pillar][item.channel]).toEqual({
        status: 'resolved', value: item.value,
      });
    }
  }
}
describe('2018 marital divorce sample: palace and star method boundary', () => {
  it('observes actual independent palace and visible spouse-star positions without weak-star verdict', () => {
    const result = run(MALE, FEMALE);
    const audit = result.divorceStudy2018MethodBoundary;
    expect(audit?.source.verifiedLayer)
      .toBe('KCI_PUBLIC_ABSTRACT_AND_AUTHOR_INDEX_ONLY');
    expect(audit?.source.fullArticleMethodRead).toBe(false);
    expect(audit?.historicalSexScope).toBe('male_female_pair_in_original_marital_scope');
    expect(audit?.subject.historicalRole).toBe('husband');
    expect(audit?.target.historicalRole).toBe('wife');
    if (!audit) throw new TypeError('Expected private original-source boundary.');
    expectVisibleStars(audit.subject, MALE, ['정재', '편재']);
    expectVisibleStars(audit.target, FEMALE, ['정관', '편관']);
    expect(audit.subject.palaceState).toBe(result.maritalPalaceIntraChartResearch?.subject.state);
    expect(audit.target.palaceState).toBe(result.maritalPalaceIntraChartResearch?.target.state);
    expect(audit.subject.palaceObservedFactPaths).toEqual([
      'pillars.day.value.stem.element', 'pillars.day.value.branch.element',
    ]);
    expect(audit.subject.spouseStarStrengthVerified).toBe(false);
    expect(audit.palaceOutranksStarForThisPair).toBe(false);
    expect(audit.weakStarConditionEstablished).toBe(false);
    expect(audit.sourceQualifiedT10Conclusion).toBeNull();
    expect(audit.compatibilityScore).toBeNull();
  });

  it('preserves historical roles and original input facts on reversal', () => {
    const forward = run(MALE, FEMALE).divorceStudy2018MethodBoundary;
    const reverse = run(FEMALE, MALE).divorceStudy2018MethodBoundary;
    expect(reverse?.subject.historicalRole).toBe('wife');
    expect(reverse?.target.historicalRole).toBe('husband');
    expect(reverse?.subject.visibleSpouseStarPositions).toEqual(
      forward?.target.visibleSpouseStarPositions);
    expect(reverse?.subject.calculationHash).toBe(forward?.target.calculationHash);
  });

  it('does not assume historical role or infer weakness for unspecified/same-sex inputs', () => {
    const unknown = run(birth(1990, 5, 15), FEMALE).divorceStudy2018MethodBoundary;
    expect(unknown?.historicalSexScope).toBe('original_historical_sex_roles_not_applicable');
    expect(unknown?.subject.visibleSpouseStarKind).toBeNull();
    expect(unknown?.target.visibleSpouseStarKind).toBeNull();
    expect(unknown?.subject.visibleSpouseStarPositions).toEqual([]);
    const same = run(MALE, birth(1996, 6, 5, 'male')).divorceStudy2018MethodBoundary;
    expect(same?.subject.visibleSpouseStarKind).toBeNull();
    expect(same?.target.visibleSpouseStarPositions).toEqual([]);
    expect(same?.twoPersonOutcomeRuleEstablished).toBe(false);
  });

  it('leaves missing hour positions unresolved and does not fabricate observed facts', () => {
    const unknown = birth(1996, 6, 5, 'female', false);
    const scope = run(MALE, unknown).divorceStudy2018MethodBoundary;
    expect(scope?.target.unobservedStarFactPaths).toEqual(
      expect.arrayContaining([
        'derivedFacts.tenGods.hour.stem',
        'derivedFacts.tenGods.hour.branch',
      ]),
    );
    expect(scope?.target.visibleSpouseStarPositions.every(item =>
      item.pillar !== 'hour')).toBe(true);
    expect(scope?.target.spouseStarStrengthVerified).toBe(false);
  });

  it('rejects forged original palace evidence and wrong snapshot identity', () => {
    const result = run(MALE, FEMALE);
    const pair = result.sourceScopeHandoff;
    const palace = result.maritalPalaceIntraChartResearch;
    if (!palace) throw new TypeError('Expected palace research.');
    const a = snap(MALE);
    const b = snap(FEMALE);
    expect(() => auditT102018DivorcedCoupleMethodBoundaryV1(
      pair,
      { ...palace, subject: { ...palace.subject, state: 'unresolved_day_pillar' } },
      a, b,
    )).toThrow('does not match canonical day facts');
    expect(() => auditT102018DivorcedCoupleMethodBoundaryV1(
      pair, palace, a, { ...b, calculationHash: 'fabricated' } as CanonicalSajuSnapshot,
    )).toThrow('protected identical independent source charts');
  });

  it('does not expose study conclusions on default public output or issue/sell T10', () => {
    const ordinary = run(MALE, FEMALE, false);
    const privateResult = run(MALE, FEMALE);
    expect(ordinary.divorceStudy2018MethodBoundary).toBeUndefined();
    expect(ordinary.html).toBe(privateResult.html);
    expect(privateResult.divorceStudy2018MethodBoundary?.maySell).toBe(false);
    expect(privateResult.divorceStudy2018MethodBoundary?.mayPublish).toBe(false);
    expect(privateResult.mayMarkMenuAvailable).toBe(false);
    expect(privateResult.mayPersist).toBe(false);
  });
});
