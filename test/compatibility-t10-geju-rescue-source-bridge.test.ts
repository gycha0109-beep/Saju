import { describe, expect, it } from 'vitest';
import type { BirthInput, TenGod } from '../src/contracts/calculation.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from
  '../src/production/production-calculation-runtime.js';
import { buildCompatibilityTwoBirthResearchReading } from
  '../src/preview/compatibility-two-birth-research-runtime.js';
import { auditT10GejuRescueSourceBridgeV1 } from
  '../src/research/compatibility-t10-geju-rescue-source-bridge.js';
import {
  GENERAL_NATAL_GEJU_RESCUE_PRECEDENCE_WEIGHTING_PRIMITIVE_AUTHORITY_REVIEW,
} from '../src/research/general-natal-geju-rescue-precedence-weighting-primitive-authority-review.js';

const AT = '2026-11-11T00:00:00.000Z';
function birth(year: number, month: number, day: number, known = true): BirthInput {
  return {
    calendarType: 'solar',
    date: { year, month, day },
    time: known ? { known: true, hour: 14, minute: 30 } : { known: false },
    sexForTraditionalCalculation: 'unspecified',
  };
}
const A = birth(1990, 5, 15);
const B = birth(1996, 6, 5);
const SLOTS = ['year', 'month', 'hour'] as const;
const FAMILIES: Readonly<Record<string, readonly TenGod[]>> = {
  officer: ['정관'], hurt: ['상관'], seal: ['정인', '편인'],
  wealth: ['정재', '편재'], rob: ['겁재'], food: ['식신'],
};
function run(a: BirthInput, b: BirthInput, opted = true) {
  return buildCompatibilityTwoBirthResearchReading(a, b, {
    requestId: 'geju-rescue-intra-chart-source-gate',
    subjectPersonRef: 'person-one',
    targetPersonRef: 'person-two',
    referenceDateTime: AT,
    ...(opted ? { candidateScope: 'traditional_marital_palace_comparison' as const } : {}),
  });
}

describe('T10 reuse of existing natal geju rescue source does not allow cross-person repair', () => {
  it('observes both source clauses from the pre-existing natal research catalog', () => {
    const result = run(A, B);
    const review = result.gejuRescueSourceBridge;
    expect(review?.sourceRescueCatalogAligned).toBe(true);
    const upstream = GENERAL_NATAL_GEJU_RESCUE_PRECEDENCE_WEIGHTING_PRIMITIVE_AUTHORITY_REVIEW;
    expect(upstream.generalizedRescueEffectPredicateAuthorized).toBe(false);
    for (const person of [review?.subject, review?.target]) {
      expect(person?.clauseAudits.map(clause => [clause.adversity, clause.rescue]))
        .toEqual([['官逢傷', '透印以解之'], ['財逢劫', '透食以化之']]);
      for (const clause of person?.clauseAudits ?? []) {
        expect(upstream.rescueExamples).toContainEqual(expect.objectContaining({
          adversity: clause.adversity, rescue: clause.rescue,
        }));
        expect(clause.sourceScope).toBe('WITHIN_ONE_NATAL_CHART');
        expect(clause.sourceClauseSatisfied).toBe(false);
        expect(clause.gejuEstablished).toBe(false);
        expect(clause.rescueEffective).toBe(false);
        expect(clause.relativePrecedenceResolved).toBe(false);
      }
    }
    expect(review?.crossPersonWitnessFusionAllowed).toBe(false);
    expect(review?.crossPersonRescueRuleEstablished).toBe(false);
    expect(review?.compatibilityVerdict).toBeNull();
    expect(result.maySell).toBe(false);
  });

  it('matches source-family witnesses exactly to each independent canonical chart', () => {
    const review = run(A, B).gejuRescueSourceBridge;
    if (!review) throw new TypeError('Expected gated research');
    for (const [input, person] of [[A, review.subject], [B, review.target]] as const) {
      const snapshot = calculateAuthorizedMyeonghwaProductionSnapshot(
        input, { now: new Date(AT) },
      ).snapshot;
      expect(person.calculationHash).toBe(snapshot.calculationHash);
      const facts = snapshot.derivedFacts.tenGods;
      const expectedUnresolved = SLOTS.filter(slot => {
        const term = facts.status === 'resolved' ? facts.value[slot].stem : undefined;
        return term?.status !== 'resolved';
      }).map(slot => `derivedFacts.tenGods.${slot}.stem`);
      expect(person.unresolvedStemFactPaths).toEqual(expectedUnresolved);
      expect(person.visibleStemCoverage)
        .toBe(expectedUnresolved.length ? 'partial' : 'complete');
      for (const clause of person.clauseAudits) {
        const terms = clause.id === 'officer_hurt_seal'
          ? ['officer', 'hurt', 'seal'] : ['wealth', 'rob', 'food'];
        const expected = SLOTS.flatMap(slot => {
          const fact = facts.status === 'resolved' ? facts.value[slot].stem : undefined;
          if (fact?.status !== 'resolved') return [];
          if (!terms.some(family => FAMILIES[family]?.includes(fact.value as TenGod))) {
            return [];
          }
          return [{
            path: `derivedFacts.tenGods.${slot}.stem`,
            slot, value: fact.value, sourceChartPersonRef: person.personRef,
          }];
        });
        expect(clause.sameChartVisibleStemWitnesses).toEqual(expected);
        expect(clause.rawVisibleFamiliesCoPresent)
          .toBe(terms.every(family => expected.some(e =>
            FAMILIES[family]?.includes(e.value as TenGod))));
      }
    }
  });

  it('keeps cross-person stars separate after reversing the two people', () => {
    const a = run(A, B).gejuRescueSourceBridge;
    const b = run(B, A).gejuRescueSourceBridge;
    expect(a?.subject.calculationHash).toBe(b?.target.calculationHash);
    expect(a?.target.calculationHash).toBe(b?.subject.calculationHash);
    expect(a?.subject.personRef).toBe('person-one');
    expect(b?.target.personRef).toBe('person-two');
    for (const result of [a, b]) {
      expect(result?.crossPersonWitnessFusionAllowed).toBe(false);
      for (const person of [result?.subject, result?.target]) {
        expect(person?.clauseAudits.every(clause =>
          clause.sameChartVisibleStemWitnesses.every(witness =>
            witness.sourceChartPersonRef === person.personRef))).toBe(true);
      }
    }
  });

  it('preserves missing-hour fact paths without treating them as absent rescuers', () => {
    const review = run(A, birth(1996, 6, 5, false)).gejuRescueSourceBridge;
    expect(review).toBeDefined();
    const targetSnapshot = calculateAuthorizedMyeonghwaProductionSnapshot(
      birth(1996, 6, 5, false), { now: new Date(AT) },
    ).snapshot;
    const hourFact = targetSnapshot.derivedFacts.tenGods.status === 'resolved'
      ? targetSnapshot.derivedFacts.tenGods.value.hour.stem : undefined;
    const expected = hourFact?.status !== 'resolved';
    expect(review?.target.unresolvedStemFactPaths.includes(
      'derivedFacts.tenGods.hour.stem')).toBe(expected);
    expect(review?.target.clauseAudits.every(x => x.sourceClauseSatisfied === false))
      .toBe(true);
  });

  it('rejects forged provenance and leaves ordinary preview and selling unchanged', () => {
    const internal = run(A, B);
    const noOptIn = run(A, B, false);
    expect(noOptIn.gejuRescueSourceBridge).toBeUndefined();
    expect(noOptIn.html).toBe(internal.html);
    const prior = internal.yongshenMethodScopeResearch;
    if (!prior) throw new TypeError('Expected original method audit');
    const subject = calculateAuthorizedMyeonghwaProductionSnapshot(
      A, { now: new Date(AT) },
    ).snapshot;
    const target = calculateAuthorizedMyeonghwaProductionSnapshot(
      B, { now: new Date(AT) },
    ).snapshot;
    expect(() => auditT10GejuRescueSourceBridgeV1(
      internal.sourceScopeHandoff, prior, subject,
      { ...target, calculationHash: 'forged-chart' },
    )).toThrow();
    expect(internal.mayClaimInterpersonalMeaning).toBe(false);
    expect(internal.mayPublish).toBe(false);
    expect(internal.maySell).toBe(false);
  });
});
