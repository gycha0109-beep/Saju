import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type { CanonicalSajuSnapshot } from '../src/contracts/calculation.js';
import type { ReadingRequest } from '../src/contracts/reading.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { deriveAnnualStemTenGod } from '../src/reading/annual-interpretation-facts.js';
import { buildMonthlyInterpretationFacts } from '../src/reading/monthly-interpretation-facts.js';
import {
  buildTemporalReadingContext,
  type TemporalReadingContext,
} from '../src/reading/temporal-reading-context.js';

const NOW = new Date('2026-09-03T13:00:00.000Z');

function snapshot(day = 9, timeKnown = true): CanonicalSajuSnapshot {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1996, month: 1, day },
      time: timeKnown ? { known: true, hour: 9, minute: 30 } : { known: false },
      sexForTraditionalCalculation: 'unspecified',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: NOW },
  );
}

function monthlyContext(month: number, year = 2026): Extract<TemporalReadingContext, { scope: 'monthly' }> {
  const request: ReadingRequest = {
    requestId: `monthly-facts-${year}-${month}`,
    intent: { domain: 'general', temporalScope: 'monthly' },
    targetPeriod: {
      scope: 'monthly',
      year,
      month,
      timeZone: 'Asia/Seoul',
      referenceDateTime: NOW.toISOString(),
      resolution: 'relative_current',
    },
  };
  const context = buildTemporalReadingContext(request);
  if (context === undefined || context.scope !== 'monthly') {
    throw new Error('fixture requires a monthly temporal context');
  }
  return context;
}

describe('MyeongHa monthly interpretation facts', () => {
  it('preserves the civil September target month as two solar-term-aware month-pillar segments', () => {
    const natal = snapshot();
    const facts = buildMonthlyInterpretationFacts(natal, monthlyContext(9));

    expect(facts).toMatchObject({
      schemaVersion: 'myeongha-monthly-interpretation-facts-v1',
      policyId: 'myeongha-monthly-interpretation-policy-v1',
      scope: 'monthly',
      targetYear: 2026,
      targetMonth: 9,
      timeZone: 'Asia/Seoul',
      referenceDateTime: NOW.toISOString(),
      segmentSemantics: 'half_open_start_inclusive_end_exclusive',
      civilMonth: {
        startsAt: '2026-08-31T15:00:00.000Z',
        endsAt: '2026-09-30T15:00:00.000Z',
      },
      jeolBoundary: { index: 16, name: '백로', hanja: '白露' },
    });
    expect(facts.segments).toHaveLength(2);
    expect(facts.segments[0]).toMatchObject({
      segmentId: 'before_jeol',
      startsAt: facts.civilMonth.startsAt,
      endsAt: facts.jeolBoundary.at,
      monthlyPillar: { stem: '병', branch: '신' },
    });
    expect(facts.segments[1]).toMatchObject({
      segmentId: 'after_jeol',
      startsAt: facts.jeolBoundary.at,
      endsAt: facts.civilMonth.endsAt,
      monthlyPillar: { stem: '정', branch: '유' },
    });

    if (natal.derivedFacts.dayMaster.status !== 'resolved') {
      throw new Error('fixture requires a resolved day master');
    }
    expect(facts.segments[0].monthlyStemTenGod).toBe(
      deriveAnnualStemTenGod(natal.derivedFacts.dayMaster.value, '병'),
    );
    expect(facts.segments[1].monthlyStemTenGod).toBe(
      deriveAnnualStemTenGod(natal.derivedFacts.dayMaster.value, '정'),
    );
  });

  it('is deterministic and changes its segmented pillar facts for an adjacent civil month', () => {
    const natal = snapshot();
    const septemberA = buildMonthlyInterpretationFacts(natal, monthlyContext(9));
    const septemberB = buildMonthlyInterpretationFacts(natal, monthlyContext(9));
    const october = buildMonthlyInterpretationFacts(natal, monthlyContext(10));

    expect(septemberB).toEqual(septemberA);
    expect(october.targetMonth).toBe(10);
    expect(october.jeolBoundary.name).toBe('한로');
    expect(october.segments.map((segment) => segment.monthlyPillar)).not.toEqual(
      septemberA.segments.map((segment) => segment.monthlyPillar),
    );
  });

  it('personalizes the same monthly segments through the natal day master', () => {
    const left = snapshot(9);
    const right = snapshot(10);
    if (
      left.derivedFacts.dayMaster.status !== 'resolved' ||
      right.derivedFacts.dayMaster.status !== 'resolved'
    ) {
      throw new Error('fixtures require resolved day masters');
    }
    expect(right.derivedFacts.dayMaster.value.value).not.toBe(left.derivedFacts.dayMaster.value.value);

    const leftFacts = buildMonthlyInterpretationFacts(left, monthlyContext(9));
    const rightFacts = buildMonthlyInterpretationFacts(right, monthlyContext(9));
    expect(rightFacts.segments.map((segment) => segment.monthlyPillar)).toEqual(
      leftFacts.segments.map((segment) => segment.monthlyPillar),
    );
    expect(rightFacts.segments.map((segment) => segment.monthlyStemTenGod)).not.toEqual(
      leftFacts.segments.map((segment) => segment.monthlyStemTenGod),
    );
  });

  it('keeps the useful monthly core when birth time is unknown and suppresses only hour relations', () => {
    const facts = buildMonthlyInterpretationFacts(snapshot(9, false), monthlyContext(9));

    for (const segment of facts.segments) {
      expect(segment.monthlyStemTenGod).toBeDefined();
      expect(segment.monthlyBranchRelations.year.status).toBe('resolved');
      expect(segment.monthlyBranchRelations.month.status).toBe('resolved');
      expect(segment.monthlyBranchRelations.day.status).toBe('resolved');
      expect(segment.monthlyBranchRelations.hour.status).toBe('unavailable');
    }
  });

  it('reuses structural clash semantics for a resolved natal pillar against either monthly segment', () => {
    let foundClash = false;
    for (let day = 1; day <= 12; day += 1) {
      const facts = buildMonthlyInterpretationFacts(snapshot(day), monthlyContext(9));
      for (const segment of facts.segments) {
        const relation = segment.monthlyBranchRelations.day;
        if (relation.status === 'resolved' && relation.value.relation === 'clash') {
          expect(
            (relation.value.natalBranch === '인' && relation.value.monthlyBranch === '신') ||
              (relation.value.natalBranch === '묘' && relation.value.monthlyBranch === '유'),
          ).toBe(true);
          foundClash = true;
        }
      }
    }
    expect(foundClash).toBe(true);
  });

  it('does not mutate the natal snapshot while deriving request-scoped monthly facts', () => {
    const natal = snapshot();
    const before = JSON.stringify(natal);
    buildMonthlyInterpretationFacts(natal, monthlyContext(9));
    expect(JSON.stringify(natal)).toBe(before);
  });

  it('rejects annual contexts and monthly targets outside the precise engine range', () => {
    const annualRequest: ReadingRequest = {
      requestId: 'annual-context-rejection',
      intent: { domain: 'general', temporalScope: 'annual' },
      targetPeriod: {
        scope: 'annual',
        year: 2026,
        timeZone: 'Asia/Seoul',
        referenceDateTime: NOW.toISOString(),
        resolution: 'relative_current',
      },
    };
    const annualContext = buildTemporalReadingContext(annualRequest);
    if (annualContext === undefined) throw new Error('fixture requires annual context');

    expect(() => buildMonthlyInterpretationFacts(snapshot(), annualContext)).toThrow(RangeError);
    expect(() => buildMonthlyInterpretationFacts(snapshot(), monthlyContext(9, 2301))).toThrow(
      /1800-2300/u,
    );
  });
});
