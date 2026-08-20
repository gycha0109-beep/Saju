import { describe, expect, test } from 'vitest';
import {
  HIDDEN_STEM_MEMBERSHIP,
  I18B_HIDDEN_CHALLENGE_PACK,
  I18B_HIDDEN_CHALLENGE_RULES,
  calculateCanonicalSajuSnapshot,
  createI18BHiddenChallengeRegistry,
  runInterpretation,
  type CalculationPolicySnapshot,
  type EarthlyBranch,
  type FiveElement,
  type HeavenlyStem,
  type HiddenChallengeRelation,
} from '../src/index.js';

const policy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/i18b-test',
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

const STEMS_BY_ELEMENT: Readonly<Record<FiveElement, readonly HeavenlyStem[]>> = {
  목: ['갑', '을'],
  화: ['병', '정'],
  토: ['무', '기'],
  금: ['경', '신'],
  수: ['임', '계'],
};

const PILLAR_SLOTS = ['year', 'month', 'day', 'hour'] as const;
type PillarSlot = (typeof PILLAR_SLOTS)[number];

interface HiddenChallengeValue {
  evidenceKind: 'hidden_challenge_membership';
  position: PillarSlot;
  targetElement: FiveElement;
  relation: HiddenChallengeRelation;
  direction: 'challenging';
  effect: 'not_determined';
  weight: 'not_assigned';
  overallStrength: 'not_determined';
}

function challengeValue(value: unknown): HiddenChallengeValue | undefined {
  if (value === null || typeof value !== 'object') return undefined;
  const record = value as Record<string, unknown>;
  if (record.evidenceKind !== 'hidden_challenge_membership') return undefined;
  if (!PILLAR_SLOTS.includes(record.position as PillarSlot)) return undefined;
  if (!['목', '화', '토', '금', '수'].includes(record.targetElement as FiveElement)) return undefined;
  if (!['output', 'wealth', 'officer'].includes(record.relation as HiddenChallengeRelation)) {
    return undefined;
  }
  if (
    record.direction !== 'challenging' ||
    record.effect !== 'not_determined' ||
    record.weight !== 'not_assigned' ||
    record.overallStrength !== 'not_determined'
  ) {
    return undefined;
  }
  return record as unknown as HiddenChallengeValue;
}

function branchForSlot(
  snapshot: ReturnType<typeof calculateCanonicalSajuSnapshot>,
  slot: PillarSlot,
): EarthlyBranch {
  const pillar = snapshot.pillars[slot];
  if (pillar.status !== 'resolved') {
    throw new Error(`Expected resolved ${slot} pillar`);
  }
  return pillar.value.branch.value;
}

describe('I18B hidden challenging strength evidence', () => {
  test('remains research-only and does not create effect weights or final classification', () => {
    expect(I18B_HIDDEN_CHALLENGE_PACK.status).toBe('research');
    expect(I18B_HIDDEN_CHALLENGE_RULES).toHaveLength(61);
    expect(
      I18B_HIDDEN_CHALLENGE_RULES.some(
        (rule) => rule.output.claimType === 'DAY_MASTER_STRENGTH_CLASSIFICATION',
      ),
    ).toBe(false);
    expect(
      I18B_HIDDEN_CHALLENGE_RULES.some((rule) =>
        JSON.stringify(rule.output.value).includes('not_assigned'),
      ),
    ).toBe(true);
  });

  test('emitted challenge claims correspond to actual hidden-stem membership and cover all challenge relations', () => {
    const registry = createI18BHiddenChallengeRegistry();
    const observed = new Set<HiddenChallengeRelation>();
    let claimCount = 0;

    for (let month = 1; month <= 12; month += 1) {
      for (let day = 1; day <= 28; day += 4) {
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
        const execution = runInterpretation(snapshot, registry, {
          now: new Date('2026-08-20T00:01:00.000Z'),
        });
        const claims = execution.claims.filter(
          (claim) =>
            claim.claimType === 'DAY_MASTER_STRENGTH_EVIDENCE' &&
            challengeValue(claim.value) !== undefined,
        );
        const guards = execution.claims.filter(
          (claim) => claim.claimType === 'DAY_MASTER_HIDDEN_CHALLENGE_SCOPE_GUARD',
        );

        expect(execution.integrity.valid).toBe(true);
        expect(guards).toHaveLength(1);
        expect(guards[0]?.value).toMatchObject({
          hiddenMembershipOnly: true,
          relationEffect: 'not_determined',
          overallStrength: 'not_determined',
          classificationAuthorized: false,
          numericScoringAuthorized: false,
        });

        for (const claim of claims) {
          const value = challengeValue(claim.value);
          if (value === undefined) throw new Error('challenge claim value missing');
          const branch = branchForSlot(snapshot, value.position);
          const hidden = HIDDEN_STEM_MEMBERSHIP[branch];
          const targetStems = STEMS_BY_ELEMENT[value.targetElement];

          expect(hidden.some((stem) => targetStems.includes(stem))).toBe(true);
          observed.add(value.relation);
          claimCount += 1;
        }

        expect(
          execution.claims.some(
            (claim) => claim.claimType === 'DAY_MASTER_STRENGTH_CLASSIFICATION',
          ),
        ).toBe(false);
      }
    }

    expect(claimCount).toBeGreaterThan(0);
    expect(observed).toEqual(new Set(['output', 'wealth', 'officer']));
  });

  test('unknown-time boundary keeps challenge evidence and scope guards scenario-bound', () => {
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
    const execution = runInterpretation(snapshot, createI18BHiddenChallengeRegistry(), {
      now: new Date('2026-08-20T00:01:00.000Z'),
    });
    const expectedScenarioIds = snapshot.scenarios.map((scenario) => scenario.scenarioId).sort();
    const challengeClaims = execution.claims.filter(
      (claim) => challengeValue(claim.value) !== undefined,
    );
    const guards = execution.claims.filter(
      (claim) => claim.claimType === 'DAY_MASTER_HIDDEN_CHALLENGE_SCOPE_GUARD',
    );

    expect(expectedScenarioIds.length).toBeGreaterThan(1);
    expect(guards).toHaveLength(expectedScenarioIds.length);
    expect(guards.map((claim) => claim.scenarioRef).sort()).toEqual(expectedScenarioIds);
    for (const claim of challengeClaims) {
      expect(expectedScenarioIds).toContain(claim.scenarioRef);
    }
    expect(
      execution.claims.some((claim) => claim.claimType === 'DAY_MASTER_STRENGTH_CLASSIFICATION'),
    ).toBe(false);
  });
});
