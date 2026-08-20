import { describe, expect, test } from 'vitest';
import {
  HIDDEN_STEM_MEMBERSHIP,
  I18C_ROOT_CLASS_PACK,
  I18C_ROOT_CLASS_RULES,
  calculateCanonicalSajuSnapshot,
  createI18CRootClassRegistry,
  runInterpretation,
  type CalculationPolicySnapshot,
  type EarthlyBranch,
  type FiveElement,
  type HeavenlyStem,
  type IntrinsicRootClass,
} from '../src/index.js';

const policy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/i18c-test',
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

const PILLAR_SLOTS = ['year', 'month', 'day', 'hour'] as const;
type PillarSlot = (typeof PILLAR_SLOTS)[number];

const STEMS_BY_ELEMENT: Readonly<Record<FiveElement, readonly HeavenlyStem[]>> = {
  목: ['갑', '을'],
  화: ['병', '정'],
  토: ['무', '기'],
  금: ['경', '신'],
  수: ['임', '계'],
};

const STRONG_ROOT_BRANCHES: Readonly<Partial<Record<FiveElement, readonly EarthlyBranch[]>>> = {
  목: ['해', '인', '묘'],
  화: ['인', '사', '오'],
  금: ['사', '신', '유'],
  수: ['신', '해', '자'],
};
const STORAGE_BRANCHES = new Set<EarthlyBranch>(['진', '술', '축', '미']);

interface RootClassValue {
  evidenceKind: 'intrinsic_root_class_candidate';
  position: PillarSlot;
  dayMasterElement: FiveElement;
  rootClass: IntrinsicRootClass;
  relationEffect: 'not_evaluated';
  effectiveState: 'not_determined';
  weight: 'not_assigned';
  overallStrength: 'not_determined';
}

function rootValue(value: unknown): RootClassValue | undefined {
  if (value === null || typeof value !== 'object') return undefined;
  const record = value as Record<string, unknown>;
  if (record.evidenceKind !== 'intrinsic_root_class_candidate') return undefined;
  if (!PILLAR_SLOTS.includes(record.position as PillarSlot)) return undefined;
  if (!['목', '화', '토', '금', '수'].includes(record.dayMasterElement as FiveElement)) return undefined;
  if (
    ![
      'strong_birth_lu_wang_candidate',
      'residual_storage_candidate',
      'earth_root_class_unresolved',
    ].includes(record.rootClass as IntrinsicRootClass)
  ) {
    return undefined;
  }
  return record as unknown as RootClassValue;
}

function branchForSlot(
  snapshot: ReturnType<typeof calculateCanonicalSajuSnapshot>,
  slot: PillarSlot,
): EarthlyBranch {
  const pillar = snapshot.pillars[slot];
  if (pillar.status !== 'resolved') throw new Error(`Expected resolved ${slot} pillar`);
  return pillar.value.branch.value;
}

function branchContainsElement(branch: EarthlyBranch, element: FiveElement): boolean {
  const target = STEMS_BY_ELEMENT[element];
  return HIDDEN_STEM_MEMBERSHIP[branch].some((stem) => target.includes(stem));
}

describe('I18C intrinsic root-class evidence', () => {
  test('remains research-only and leaves effective strength unresolved', () => {
    expect(I18C_ROOT_CLASS_PACK.status).toBe('research');
    expect(I18C_ROOT_CLASS_RULES).toHaveLength(37);
    expect(
      I18C_ROOT_CLASS_RULES.some(
        (rule) => rule.output.claimType === 'DAY_MASTER_STRENGTH_CLASSIFICATION',
      ),
    ).toBe(false);
    expect(
      I18C_ROOT_CLASS_RULES.some((rule) =>
        JSON.stringify(rule.output.value).includes('not_assigned'),
      ),
    ).toBe(true);
  });

  test('emitted root classes agree with hidden membership and source-bounded branch classes', () => {
    const registry = createI18CRootClassRegistry();
    const observed = new Set<IntrinsicRootClass>();
    let rootClaimCount = 0;

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
        const roots = execution.claims.filter(
          (claim) => claim.claimType === 'DAY_MASTER_ROOT_CLASS_EVIDENCE',
        );
        const guards = execution.claims.filter(
          (claim) => claim.claimType === 'DAY_MASTER_ROOT_CLASS_SCOPE_GUARD',
        );

        expect(execution.integrity.valid).toBe(true);
        expect(guards).toHaveLength(1);
        expect(guards[0]?.value).toMatchObject({
          intrinsicClassOnly: true,
          relationEffect: 'not_evaluated',
          effectiveRootStrength: 'not_determined',
          classificationAuthorized: false,
          numericScoringAuthorized: false,
        });

        for (const claim of roots) {
          const value = rootValue(claim.value);
          if (value === undefined) throw new Error('root class claim value missing');
          const branch = branchForSlot(snapshot, value.position);
          expect(branchContainsElement(branch, value.dayMasterElement)).toBe(true);

          if (value.rootClass === 'strong_birth_lu_wang_candidate') {
            expect(STRONG_ROOT_BRANCHES[value.dayMasterElement]).toContain(branch);
          } else if (value.rootClass === 'residual_storage_candidate') {
            expect(value.dayMasterElement).not.toBe('토');
            expect(STORAGE_BRANCHES.has(branch)).toBe(true);
            expect(STRONG_ROOT_BRANCHES[value.dayMasterElement] ?? []).not.toContain(branch);
          } else {
            expect(value.dayMasterElement).toBe('토');
          }

          expect(value.relationEffect).toBe('not_evaluated');
          expect(value.effectiveState).toBe('not_determined');
          expect(value.weight).toBe('not_assigned');
          observed.add(value.rootClass);
          rootClaimCount += 1;
        }
      }
    }

    expect(rootClaimCount).toBeGreaterThan(0);
    expect(observed).toEqual(
      new Set([
        'strong_birth_lu_wang_candidate',
        'residual_storage_candidate',
        'earth_root_class_unresolved',
      ]),
    );
  });

  test('unknown-time boundary preserves root classes and guard claims per scenario', () => {
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
    const execution = runInterpretation(snapshot, createI18CRootClassRegistry(), {
      now: new Date('2026-08-20T00:01:00.000Z'),
    });
    const expectedScenarioIds = snapshot.scenarios.map((scenario) => scenario.scenarioId).sort();
    const roots = execution.claims.filter(
      (claim) => claim.claimType === 'DAY_MASTER_ROOT_CLASS_EVIDENCE',
    );
    const guards = execution.claims.filter(
      (claim) => claim.claimType === 'DAY_MASTER_ROOT_CLASS_SCOPE_GUARD',
    );

    expect(expectedScenarioIds.length).toBeGreaterThan(1);
    expect(guards).toHaveLength(expectedScenarioIds.length);
    expect(guards.map((claim) => claim.scenarioRef).sort()).toEqual(expectedScenarioIds);
    for (const claim of roots) {
      expect(expectedScenarioIds).toContain(claim.scenarioRef);
    }
    expect(
      execution.claims.some((claim) => claim.claimType === 'DAY_MASTER_STRENGTH_CLASSIFICATION'),
    ).toBe(false);
  });
});
