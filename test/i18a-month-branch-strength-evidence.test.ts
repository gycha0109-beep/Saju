import { describe, expect, test } from 'vitest';
import {
  I18A_MONTH_BRANCH_STRENGTH_PACK,
  I18A_MONTH_BRANCH_STRENGTH_RULES,
  calculateCanonicalSajuSnapshot,
  createI18AMonthBranchStrengthRegistry,
  runInterpretation,
  type CalculationPolicySnapshot,
  type FiveElement,
  type MonthBranchStrengthRelation,
} from '../src/index.js';

const policy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/i18a-test',
  policyVersion: '1.0.0',
  dayBoundary: 'midnight',
  trueSolarTime: {
    enabled: false,
    longitudeSource: 'not-applicable',
    applyEquationOfTime: false,
    applyHistoricalDst: false,
  },
  timeZonePolicy: { source: 'service-default', timeZone: 'Asia/Seoul' },
  unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
};

const GENERATES: Readonly<Record<FiveElement, FiveElement>> = {
  목: '화',
  화: '토',
  토: '금',
  금: '수',
  수: '목',
};

const CONTROLS: Readonly<Record<FiveElement, FiveElement>> = {
  목: '토',
  화: '금',
  토: '수',
  금: '목',
  수: '화',
};

function relationOf(day: FiveElement, month: FiveElement): MonthBranchStrengthRelation {
  if (day === month) return 'peer';
  if (GENERATES[month] === day) return 'resource';
  if (GENERATES[day] === month) return 'output';
  if (CONTROLS[day] === month) return 'wealth';
  if (CONTROLS[month] === day) return 'officer';
  throw new Error(`Unreachable five-element relation ${day}/${month}`);
}

function relationFromClaim(value: unknown): MonthBranchStrengthRelation | undefined {
  if (value === null || typeof value !== 'object') return undefined;
  if (!('relation' in value)) return undefined;
  const relation = value.relation;
  return relation === 'peer' ||
    relation === 'resource' ||
    relation === 'output' ||
    relation === 'wealth' ||
    relation === 'officer'
    ? relation
    : undefined;
}

describe('I18A month-branch strength evidence', () => {
  test('remains research-only and emits no classifier', () => {
    expect(I18A_MONTH_BRANCH_STRENGTH_PACK.status).toBe('research');
    expect(I18A_MONTH_BRANCH_STRENGTH_RULES).toHaveLength(26);
    expect(
      I18A_MONTH_BRANCH_STRENGTH_RULES.some(
        (rule) => rule.output.claimType === 'DAY_MASTER_STRENGTH_CLASSIFICATION',
      ),
    ).toBe(false);
    expect(
      I18A_MONTH_BRANCH_STRENGTH_RULES.some((rule) =>
        JSON.stringify(rule.output.value).includes('not_assigned'),
      ),
    ).toBe(true);
  });

  test('known-date matrix emits exactly one of all five month-branch relations plus one scope guard', () => {
    const registry = createI18AMonthBranchStrengthRegistry();
    const observed = new Set<MonthBranchStrengthRelation>();

    for (let month = 1; month <= 12; month += 1) {
      for (let day = 1; day <= 28; day += 3) {
        const snapshot = calculateCanonicalSajuSnapshot(
          {
            calendarType: 'solar',
            date: { year: 2024, month, day },
            time: { known: true, hour: 12, minute: 0 },
            sexForTraditionalCalculation: 'unspecified',
          },
          policy,
          { now: new Date('2026-08-20T00:00:00.000Z') },
        );
        if (snapshot.pillars.day.status !== 'resolved' || snapshot.pillars.month.status !== 'resolved') {
          throw new Error('known-date I18A matrix requires resolved day/month pillars');
        }

        const execution = runInterpretation(snapshot, registry, {
          now: new Date('2026-08-20T00:01:00.000Z'),
        });
        const evidence = execution.claims.filter(
          (claim) => claim.claimType === 'DAY_MASTER_MONTH_BRANCH_EVIDENCE',
        );
        const guards = execution.claims.filter(
          (claim) => claim.claimType === 'DAY_MASTER_MONTH_BRANCH_SCOPE_GUARD',
        );
        const expected = relationOf(
          snapshot.pillars.day.value.stem.element,
          snapshot.pillars.month.value.branch.element,
        );

        expect(execution.integrity.valid).toBe(true);
        expect(evidence).toHaveLength(1);
        expect(guards).toHaveLength(1);
        expect(relationFromClaim(evidence[0]?.value)).toBe(expected);
        expect(evidence[0]?.value).toMatchObject({
          monthContext: 'branch_element_only',
          weight: 'not_assigned',
          overallStrength: 'not_determined',
        });
        expect(guards[0]?.value).toMatchObject({
          withinMonthCommand: 'not_determined',
          overallStrength: 'not_determined',
          classificationAuthorized: false,
          numericScoringAuthorized: false,
        });
        observed.add(expected);
      }
    }

    expect(observed).toEqual(new Set(['peer', 'resource', 'output', 'wealth', 'officer']));
  });

  test('unknown-time solar-term boundary preserves one relation and guard per scenario', () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      {
        calendarType: 'solar',
        date: { year: 2024, month: 2, day: 4 },
        time: { known: false },
        sexForTraditionalCalculation: 'unspecified',
      },
      { ...policy, dayBoundary: 'jasi' },
      { now: new Date('2026-08-20T00:00:00.000Z') },
    );
    const execution = runInterpretation(snapshot, createI18AMonthBranchStrengthRegistry(), {
      now: new Date('2026-08-20T00:01:00.000Z'),
    });
    const expectedScenarioIds = snapshot.scenarios.map((scenario) => scenario.scenarioId).sort();
    const evidence = execution.claims.filter(
      (claim) => claim.claimType === 'DAY_MASTER_MONTH_BRANCH_EVIDENCE',
    );
    const guards = execution.claims.filter(
      (claim) => claim.claimType === 'DAY_MASTER_MONTH_BRANCH_SCOPE_GUARD',
    );

    expect(expectedScenarioIds.length).toBeGreaterThan(1);
    expect(evidence).toHaveLength(expectedScenarioIds.length);
    expect(guards).toHaveLength(expectedScenarioIds.length);
    expect(evidence.map((claim) => claim.scenarioRef).sort()).toEqual(expectedScenarioIds);
    expect(guards.map((claim) => claim.scenarioRef).sort()).toEqual(expectedScenarioIds);
    expect(execution.claims.some((claim) => claim.claimType === 'DAY_MASTER_STRENGTH_CLASSIFICATION')).toBe(false);
  });
});
