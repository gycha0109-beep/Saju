import { describe, expect, test } from 'vitest';
import {
  ExecutionPlanError,
  I7_RESEARCH_SOURCES,
  I7_SEASONAL_SUPPORT_METHODOLOGY,
  I7_SEASONAL_SUPPORT_PACK,
  I7_SEASONAL_SUPPORT_RULES,
  calculateCanonicalSajuSnapshot,
  createI7SeasonalSupportRegistry,
  createRuleRegistrySnapshot,
  runInterpretation,
  type CalculationPolicySnapshot,
  type FiveElement,
} from '../src/index.js';

const policy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/i7-research-pack-test',
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

const generatingParent: Readonly<Record<FiveElement, FiveElement>> = {
  목: '수',
  화: '목',
  토: '화',
  금: '토',
  수: '금',
};

function knownSnapshot(month: number, day: number) {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month, day },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    policy,
    { now: new Date('2026-08-19T00:00:00.000Z') },
  );
}

function supportKind(value: unknown): string | undefined {
  if (value === null || typeof value !== 'object') return undefined;
  return 'kind' in value && typeof value.kind === 'string' ? value.kind : undefined;
}

describe('I7 source-backed research pack', () => {
  test('is research-only and keeps source reuse metadata conservative', () => {
    expect(I7_SEASONAL_SUPPORT_PACK.status).toBe('research');
    expect(I7_SEASONAL_SUPPORT_METHODOLOGY.status).toBe('research');
    expect(I7_SEASONAL_SUPPORT_RULES.every((rule) => rule.status === 'research')).toBe(true);
    expect(I7_SEASONAL_SUPPORT_RULES.every((rule) => rule.taxonomy.tier === 'T2')).toBe(true);

    for (const source of Object.values(I7_RESEARCH_SOURCES)) {
      expect(source.provenanceTier).toBe('cross_reference');
      expect(source.rights?.reusePolicy).toBe('metadata_only');
    }
  });

  test('cannot be promoted to production merely by changing the pack status', () => {
    const productionPack = { ...I7_SEASONAL_SUPPORT_PACK, status: 'production' as const };
    const registry = createRuleRegistrySnapshot(
      {
        rules: I7_SEASONAL_SUPPORT_RULES,
        methodologies: [I7_SEASONAL_SUPPORT_METHODOLOGY],
        sources: Object.values(I7_RESEARCH_SOURCES),
      },
      productionPack,
    );

    expect(() => runInterpretation(knownSnapshot(3, 10), registry)).toThrow(ExecutionPlanError);
    try {
      runInterpretation(knownSnapshot(3, 10), registry);
    } catch (error) {
      expect((error as ExecutionPlanError).code).toBe('RULE_NOT_EXECUTABLE_FOR_PACK');
    }
  });

  test('known-date matrix emits only narrow seasonal signals plus the mandatory scope guard', () => {
    const registry = createI7SeasonalSupportRegistry('2026-08-19T00:00:00.000Z');
    const observedKinds = new Set<string>();

    for (let day = 10; day <= 29; day += 1) {
      const snapshot = knownSnapshot(3, day);
      if (snapshot.pillars.day.status !== 'resolved' || snapshot.pillars.month.status !== 'resolved') {
        throw new Error('known-time matrix requires resolved day/month pillars');
      }

      const dayElement = snapshot.pillars.day.value.stem.element;
      const monthElement = snapshot.pillars.month.value.branch.element;
      const expectedKind =
        dayElement === monthElement
          ? 'same_element'
          : generatingParent[dayElement] === monthElement
            ? 'generating_element'
            : undefined;

      const result = runInterpretation(snapshot, registry, {
        now: new Date('2026-08-19T03:00:00.000Z'),
      });
      const supportClaims = result.claims.filter(
        (claim) => claim.claimType === 'CLAIM-DAY-MASTER-SEASONAL-SUPPORT-SIGNAL',
      );
      const guardClaims = result.claims.filter(
        (claim) => claim.claimType === 'CLAIM-DAY-MASTER-STRENGTH-SCOPE-GUARD',
      );

      expect(result.integrity.valid).toBe(true);
      expect(guardClaims).toHaveLength(1);
      expect(guardClaims[0]?.value).toEqual({
        status: 'undetermined',
        reason: 'month_order_signal_is_partial_evidence',
      });

      if (expectedKind === undefined) {
        expect(supportClaims).toHaveLength(0);
      } else {
        expect(supportClaims).toHaveLength(1);
        expect(supportKind(supportClaims[0]?.value)).toBe(expectedKind);
        expect(supportClaims[0]?.value).toMatchObject({ overallStrength: 'not_determined' });
        observedKinds.add(expectedKind);
      }

      expect(
        result.claims.every((claim) =>
          [
            'CLAIM-DAY-MASTER-SEASONAL-SUPPORT-SIGNAL',
            'CLAIM-DAY-MASTER-STRENGTH-SCOPE-GUARD',
          ].includes(claim.claimType),
        ),
      ).toBe(true);
    }

    expect(observedKinds).toEqual(new Set(['same_element', 'generating_element']));
  });

  test('Lichun plus jasi ambiguity preserves research claims per observed scenario', () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      {
        calendarType: 'solar',
        date: { year: 2024, month: 2, day: 4 },
        time: { known: false },
        sexForTraditionalCalculation: 'unspecified',
      },
      { ...policy, dayBoundary: 'jasi' },
      { now: new Date('2026-08-19T00:00:00.000Z') },
    );
    const result = runInterpretation(snapshot, createI7SeasonalSupportRegistry());
    const guards = result.claims.filter(
      (claim) => claim.claimType === 'CLAIM-DAY-MASTER-STRENGTH-SCOPE-GUARD',
    );

    expect(snapshot.scenarios.length).toBeGreaterThan(1);
    expect(guards).toHaveLength(snapshot.scenarios.length);
    expect(new Set(guards.map((claim) => claim.scenarioRef))).toEqual(
      new Set(snapshot.scenarios.map((scenario) => scenario.scenarioId)),
    );
    expect(result.integrity.valid).toBe(true);
  });

  test('research outputs contain no user-life prediction claim types', () => {
    const forbiddenFragments = [
      'WEALTH',
      'CAREER',
      'MARRIAGE',
      'RELATIONSHIP',
      'HEALTH',
      'DEATH',
      'SUCCESS',
      'FORTUNE',
    ];

    for (const rule of I7_SEASONAL_SUPPORT_RULES) {
      for (const fragment of forbiddenFragments) {
        expect(rule.output.claimType.includes(fragment)).toBe(false);
      }
    }
  });
});
