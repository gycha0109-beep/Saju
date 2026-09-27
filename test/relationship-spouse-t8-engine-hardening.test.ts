import { describe, expect, test } from 'vitest';
import {
  calculateCanonicalSajuSnapshot,
  type CalculationPolicySnapshot,
} from '../src/index.js';
import {
  runRelationshipSpouseT8EngineProducer,
} from '../src/interpretation/relationship-spouse-t8-engine-producer.js';
import {
  buildRelationshipSpouseT8EngineHardeningBinding,
  compareRelationshipSpouseT8SemanticProjection,
  RELATIONSHIP_SPOUSE_T8_ENGINE_HARDENING_IMPLEMENTATION_EVIDENCE,
  verifyRelationshipSpouseT8DeterministicRerun,
  verifyRelationshipSpouseT8EngineE2E,
  verifyRelationshipSpouseT8IntentIsolation,
} from '../src/verification/relationship-spouse-t8-engine-hardening.js';

const policy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/relationship-spouse-t8-p2-hardening-test',
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

function canonicalSnapshot(
  sexForTraditionalCalculation: 'male' | 'female' | 'unspecified' = 'unspecified',
): Snapshot {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1992, month: 10, day: 24 },
      time: { known: true, hour: 5, minute: 30 },
      sexForTraditionalCalculation,
    },
    policy,
    { now: new Date('2026-09-27T20:52:00.000Z') },
  );
}

function resolvedDayMasterValue() {
  const dayMaster = canonicalSnapshot().derivedFacts.dayMaster;
  if (dayMaster.status !== 'resolved') {
    throw new Error('fixture requires resolved Day Master');
  }
  return dayMaster.value;
}

function withDayMaster(dayMaster: unknown): Snapshot {
  const snapshot = canonicalSnapshot();
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
        candidateId: 'spouse-t8-p2-yang',
        value: { ...value, yinYang: '양' },
        reasonRefs: ['spouse-t8-p2-hardening'],
      },
      {
        candidateId: 'spouse-t8-p2-yin',
        value: { ...value, yinYang: '음' },
        reasonRefs: ['spouse-t8-p2-hardening'],
      },
    ],
    reasonCodes: ['spouse-t8-p2-hardening-ambiguous'],
  });
}

function unavailableDayMaster(): Snapshot {
  return withDayMaster({
    status: 'unavailable',
    reasonCode: 'spouse-t8-p2-hardening-unavailable',
  });
}

function pendingDayMaster(): Snapshot {
  return withDayMaster({ status: 'pending' });
}

function missingDayMaster(): Snapshot {
  const snapshot = canonicalSnapshot();
  const derivedFacts = { ...snapshot.derivedFacts } as Record<string, unknown>;
  delete derivedFacts.dayMaster;
  return { ...snapshot, derivedFacts } as unknown as Snapshot;
}

const now = new Date('2026-09-27T20:53:00.000Z');

describe('Relationship / Spouse T8 P2 Engine hardening', () => {
  test.each([
    ['양', 'INDIRECT_WEALTH', '편재', '偏財'],
    ['음', 'INDIRECT_POWER', '편관', '偏官'],
  ] as const)(
    'resolved %s emits exactly one admitted role-neutral marker',
    (yinYang, semantic, nativeLabel, hanjaLabel) => {
      const result = runRelationshipSpouseT8EngineProducer(
        resolvedPolarity(yinYang),
        { requestId: `spouse-t8-p2-${yinYang}`, now },
      );

      expect(result.integrity).toEqual({ valid: true, errors: [] });
      expect(result.claims).toHaveLength(1);
      expect(result.claims[0]).toEqual(
        expect.objectContaining({
          subject: 'native_chart',
          predicate: 'role_neutral_spouse_star_marker',
          taxonomy: {
            tier: 'T8',
            category: 'relationship',
            subcategory: 'spouse',
          },
          value: {
            dayMasterPolarity: yinYang,
            spouseStarSemantic: semantic,
            tenGodNativeLabel: nativeLabel,
            tenGodHanjaLabel: hanjaLabel,
          },
        }),
      );
    },
  );

  test.each([
    ['missing', missingDayMaster],
    ['ambiguous', ambiguousDayMaster],
    ['unavailable', unavailableDayMaster],
    ['pending', pendingDayMaster],
  ] as const)('%s Day Master emits zero claims', (_label, fixture) => {
    const result = runRelationshipSpouseT8EngineProducer(fixture(), {
      requestId: `spouse-t8-p2-${_label}`,
      now,
    });

    expect(result.integrity.valid).toBe(true);
    expect(result.claims).toEqual([]);
  });

  test('same snapshot rerun preserves claim identity, claim content hash, and run hash', () => {
    const verification = verifyRelationshipSpouseT8DeterministicRerun(
      resolvedPolarity('양'),
      'spouse-t8-p2-determinism',
      now,
    );

    expect(verification.sameClaimIds).toBe(true);
    expect(verification.sameClaimContentHash).toBe(true);
    expect(verification.sameRunHash).toBe(true);
  });

  test('an unrelated traditional-calculation sex input mutation does not change the bounded spouse semantic projection', () => {
    const unspecified = canonicalSnapshot('unspecified');
    const male = canonicalSnapshot('male');
    expect(unspecified.calculationHash).not.toBe(male.calculationHash);

    const comparison = compareRelationshipSpouseT8SemanticProjection(
      unspecified,
      male,
      now,
    );

    expect(comparison.sameSemanticProjection).toBe(true);
    expect(comparison.leftProjection).toEqual(comparison.rightProjection);
  });

  test('isolates spouse meaning from relationship-general, temporal, and compatibility intents', () => {
    const isolation = verifyRelationshipSpouseT8IntentIsolation(
      resolvedPolarity('양'),
      now,
    );

    expect(isolation.spouse.coverageState).toBe('complete');
    expect(isolation.spouse.selectedClaimIds).toHaveLength(1);
    expect(isolation.spouse.evidencePresent).toBe(true);

    for (const candidate of [
      isolation.relationshipGeneral,
      isolation.relationshipAnnual,
      isolation.relationshipMonthly,
      isolation.compatibility,
    ]) {
      expect(candidate.selectedClaimIds).toEqual([]);
      expect(candidate.targetClaimIds).toEqual([]);
      expect(candidate.evidencePresent).toBe(false);
      expect(candidate.coverageState).toBe('insufficient_evidence');
    }
  });

  test('keeps the rule input boundary to resolved derivedFacts.dayMaster with no second-chart access', () => {
    const binding = buildRelationshipSpouseT8EngineHardeningBinding();

    expect(binding.bindingChecks.exactRuleInputBoundary).toBe(true);
    expect(binding.bindingChecks.noForbiddenOrSecondChartInput).toBe(true);
    expect(binding.bindingChecks.spouseProfileExact).toBe(true);
    expect(binding.bindingChecks.relationshipGeneralProfileIsolated).toBe(true);
  });

  test('proves canonical input through Engine claim graph and governed Reading evidence', () => {
    const snapshot = canonicalSnapshot();
    const e2e = verifyRelationshipSpouseT8EngineE2E(
      snapshot,
      'spouse-t8-p2-e2e',
      now,
    );

    expect(e2e.complete).toBe(true);
    expect(e2e.snapshotId).toBe(snapshot.snapshotId);
    expect(e2e.calculationHash).toBe(snapshot.calculationHash);
    expect(e2e.claimIds).toHaveLength(1);
    expect(e2e.interpretationRunHash).toMatch(/^[a-f0-9]{64}$/);
    expect(e2e.selectionId).toMatch(/^reading_selection_[a-f0-9]{24}$/);
    expect(e2e.evidenceBundleHash).toMatch(/^[a-f0-9]{64}$/);
    expect(e2e.e2eId).toMatch(/^[a-f0-9]{64}$/);
  });

  test('marks P2 complete and routes G2A to Engine READY without implementation work remaining', () => {
    const binding = buildRelationshipSpouseT8EngineHardeningBinding();

    expect(
      RELATIONSHIP_SPOUSE_T8_ENGINE_HARDENING_IMPLEMENTATION_EVIDENCE,
    ).toEqual({
      producerRuntimeExists: true,
      compositionIntegrated: true,
      deterministicGuardsComplete: true,
      e2eComplete: true,
    });
    expect(binding.guardDefinitionCount).toBe(16);
    expect(binding.hardeningContractReady).toBe(true);
    expect(binding.readyRoutingValid).toBe(true);
    expect(binding.observedRouting).toBe('READY');
    expect(binding.p2Complete).toBe(true);
    expect(binding.nextDisposition).toBe(
      'ENGINE_READY_BOUNDED_SEMANTIC_CAPABILITY',
    );
  });

  test('keeps READY separate from public and Production authority', () => {
    const binding = buildRelationshipSpouseT8EngineHardeningBinding();

    expect(binding.authorityBoundary).toEqual({
      engineReadyIsProductionAdmission: false,
      previewExpansionAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      publicSemanticAuthorityAuthorized: false,
      lifecyclePromotionAuthorized: false,
      productionAdmissionAuthorized: false,
      production: 'HOLD',
    });
  });

  test('hardening evidence identity is deterministic', () => {
    const left = buildRelationshipSpouseT8EngineHardeningBinding();
    const right = buildRelationshipSpouseT8EngineHardeningBinding();

    expect(left.hardeningId).toBe(right.hardeningId);
    expect(left.hardeningId).toMatch(/^[a-f0-9]{64}$/);
  });
});
