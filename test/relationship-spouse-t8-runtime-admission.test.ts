import { describe, expect, test } from 'vitest';
import {
  calculateCanonicalSajuSnapshot,
  type CalculationPolicySnapshot,
} from '../src/index.js';
import {
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_BOUNDARY,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_TYPE,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_VALUE_SCHEMA,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_PACK,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULES,
  runRelationshipSpouseT8RuntimeAdmission,
} from '../src/research/relationship-spouse-t8-runtime-admission.js';

const calculationPolicy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/relationship-spouse-t8-runtime-admission-test',
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

type Snapshot = ReturnType<typeof calculateCanonicalSajuSnapshot>;

function baseSnapshot(): Snapshot {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1992, month: 10, day: 24 },
      time: { known: true, hour: 5, minute: 30 },
      sexForTraditionalCalculation: 'unspecified',
    },
    calculationPolicy,
    { now: new Date('2026-09-16T00:00:00.000Z') },
  );
}

function resolvedDayMasterValue() {
  const dayMaster = baseSnapshot().derivedFacts.dayMaster;
  if (dayMaster.status !== 'resolved') throw new Error('fixture requires resolved Day Master');
  return dayMaster.value;
}

function withDayMaster(dayMaster: unknown): Snapshot {
  const snapshot = baseSnapshot();
  return {
    ...snapshot,
    derivedFacts: {
      ...snapshot.derivedFacts,
      dayMaster,
    },
  } as Snapshot;
}

function resolvedPolarity(yinYang: '양' | '음'): Snapshot {
  const value = resolvedDayMasterValue();
  return withDayMaster({
    status: 'resolved',
    value: { ...value, yinYang },
  });
}

function ambiguousDayMaster(): Snapshot {
  const value = resolvedDayMasterValue();
  return withDayMaster({
    status: 'ambiguous',
    candidates: [
      {
        candidateId: 'relationship-spouse-t8-test-yang',
        value: { ...value, yinYang: '양' },
        reasonRefs: ['relationship-spouse-t8-test'],
      },
      {
        candidateId: 'relationship-spouse-t8-test-yin',
        value: { ...value, yinYang: '음' },
        reasonRefs: ['relationship-spouse-t8-test'],
      },
    ],
    reasonCodes: ['relationship-spouse-t8-test-ambiguous'],
  });
}

function unavailableDayMaster(): Snapshot {
  return withDayMaster({
    status: 'unavailable',
    reasonCode: 'relationship-spouse-t8-test-unavailable',
  });
}

function pendingDayMaster(): Snapshot {
  return withDayMaster({ status: 'pending' });
}

function missingDayMaster(): Snapshot {
  const snapshot = baseSnapshot();
  const derivedFacts = { ...snapshot.derivedFacts } as Record<string, unknown>;
  delete derivedFacts.dayMaster;
  return { ...snapshot, derivedFacts } as unknown as Snapshot;
}

function run(snapshot: Snapshot) {
  return runRelationshipSpouseT8RuntimeAdmission(snapshot, {
    requestId: 'relationship-spouse-t8-runtime-admission-test',
    now: new Date('2026-09-16T01:00:00.000Z'),
  });
}

function spouseClaims(snapshot: Snapshot) {
  return run(snapshot).claims.filter(
    (claim) => claim.claimType === RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_TYPE,
  );
}

describe('Relationship / Spouse T8 isolated runtime admission', () => {
  test('resolved Yang emits only the governed INDIRECT_WEALTH / 편재 / 偏財 marker', () => {
    const result = run(resolvedPolarity('양'));
    const claims = result.claims.filter(
      (claim) => claim.claimType === RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_TYPE,
    );

    expect(result.integrity).toEqual({ valid: true, errors: [] });
    expect(claims).toHaveLength(1);
    expect(claims[0]?.taxonomy).toEqual({
      tier: 'T8',
      category: 'relationship',
      subcategory: 'spouse',
    });
    expect(claims[0]?.value).toEqual({
      dayMasterPolarity: '양',
      spouseStarSemantic: 'INDIRECT_WEALTH',
      tenGodNativeLabel: '편재',
      tenGodHanjaLabel: '偏財',
    });
  });

  test('resolved Yin emits only the governed INDIRECT_POWER / 편관 / 偏官 marker', () => {
    const claims = spouseClaims(resolvedPolarity('음'));

    expect(claims).toHaveLength(1);
    expect(claims[0]?.value).toEqual({
      dayMasterPolarity: '음',
      spouseStarSemantic: 'INDIRECT_POWER',
      tenGodNativeLabel: '편관',
      tenGodHanjaLabel: '偏官',
    });
  });

  test.each([
    ['ambiguous', ambiguousDayMaster],
    ['unavailable', unavailableDayMaster],
    ['pending', pendingDayMaster],
    ['missing', missingDayMaster],
  ] as const)('%s Day Master fails closed with no spouse T8 claim', (_label, fixture) => {
    expect(spouseClaims(fixture())).toEqual([]);
  });

  test('runtime rules consume only the resolved canonical Day Master and project yinYang after FactState unwrapping', () => {
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULES).toHaveLength(2);

    for (const rule of RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULES) {
      expect(rule.inputs).toEqual([
        {
          key: 'relationship_spouse_role_neutral_day_master',
          source: 'derived_fact',
          pathOrClaimType: 'derivedFacts.dayMaster',
          acceptedStatuses: ['resolved'],
          required: true,
          ambiguityBehavior: 'requires_resolved',
        },
      ]);
      expect(rule.condition.op).toBe('eq');
      if (rule.condition.op !== 'eq' || rule.condition.left.kind !== 'input') {
        throw new Error('fixture requires eq input condition');
      }
      expect(rule.condition.left.path).toBe('yinYang');
      expect(rule.condition.left.path).not.toBe('value.yinYang');
    }
  });

  test('bundle remains spouse-specific, bounded, and free of forbidden reconstruction or demographic inputs', () => {
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_METHODOLOGY.inputContract).toEqual({
      factInputs: [
        {
          source: 'derived_fact',
          pathPattern: 'derivedFacts.dayMaster',
          mode: 'required',
          rationale:
            'The governed role-neutral contract consumes only resolved canonical Day Master polarity; no T5 or demographic reconstruction is permitted.',
        },
      ],
    });

    const ruleMaterial = JSON.stringify(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULES);
    for (const forbidden of [
      'interpretation_claim',
      'sexForTraditionalCalculation',
      'partnerSex',
      'partnerIdentity',
      'sexualOrientation',
      'genderIdentity',
      'secondChart',
      'compatibility',
      'fertility',
      'marriageGuarantee',
      'legality',
      'ethics',
    ]) {
      expect(ruleMaterial).not.toContain(forbidden);
    }

    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_VALUE_SCHEMA.root.kind).toBe('union');
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_PACK.status).toBe('research');
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_PACK.claimContractMode).toBe(
      'registered_required',
    );
  });

  test('isolated producer readiness does not activate any Production or consumer path', () => {
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_BOUNDARY).toEqual({
      authorityAdmissionReady: true,
      spouseT8ProducerReady: true,
      runtimeScope: 'isolated_research_only',
      consumerNarrativeActivated: false,
      compatibilityConsumerActivated: false,
      previewDefaultRouteChanged: false,
      productionBehaviorChanged: false,
      productionPromotionReady: false,
      productionState: 'HOLD',
    });
  });
});
