import { describe, expect, test } from 'vitest';
import {
  calculateCanonicalSajuSnapshot,
  type CalculationPolicySnapshot,
} from '../src/index.js';
import {
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULES,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_VERSION,
  runRelationshipSpouseT8RuntimeAdmission,
} from '../src/research/relationship-spouse-t8-runtime-admission.js';
import {
  RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_RUNTIME_SOURCE_ID,
  RELATIONSHIP_SPOUSE_T8_WHISPER_RUNTIME_SOURCE_ID,
} from '../src/research/relationship-spouse-t8-runtime-source-manifest.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_BOUNDARY,
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_PACK,
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_RULES,
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_VERSION,
  runRelationshipSpouseT8SourceBoundRuntime,
} from '../src/research/relationship-spouse-t8-source-bound-runtime.js';

const calculationPolicy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/relationship-spouse-t8-source-bound-runtime-test',
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
    { now: new Date('2026-09-26T00:00:00.000Z') },
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
        candidateId: 'relationship-spouse-t8-source-bound-test-yang',
        value: { ...value, yinYang: '양' },
        reasonRefs: ['relationship-spouse-t8-source-bound-test'],
      },
      {
        candidateId: 'relationship-spouse-t8-source-bound-test-yin',
        value: { ...value, yinYang: '음' },
        reasonRefs: ['relationship-spouse-t8-source-bound-test'],
      },
    ],
    reasonCodes: ['relationship-spouse-t8-source-bound-test-ambiguous'],
  });
}

function unavailableDayMaster(): Snapshot {
  return withDayMaster({
    status: 'unavailable',
    reasonCode: 'relationship-spouse-t8-source-bound-test-unavailable',
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

const runOptions = {
  requestId: 'relationship-spouse-t8-source-bound-runtime-test',
  now: new Date('2026-09-26T01:00:00.000Z'),
};

function semanticProjection(result: ReturnType<typeof runRelationshipSpouseT8SourceBoundRuntime>) {
  return result.claims.map((claim) => ({
    claimType: claim.claimType,
    taxonomy: claim.taxonomy,
    subject: claim.subject,
    predicate: claim.predicate,
    value: claim.value,
    polarity: claim.polarity,
    emphasis: claim.emphasis,
  }));
}

describe('Relationship / Spouse T8 source-bound research runtime', () => {
  test('preserves the historical 1.0.0 runtime unchanged', () => {
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_VERSION).toBe('1.0.0');
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_METHODOLOGY.sourceIds).toEqual([]);
    expect(
      RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULES.every(
        (rule) => rule.sourceRefs.length === 0,
      ),
    ).toBe(true);

    expect(RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_VERSION).toBe('1.0.1');
  });

  test('materializes exactly the reviewed methodology and rule source bindings', () => {
    expect(RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_METHODOLOGY.sourceIds).toEqual([
      RELATIONSHIP_SPOUSE_T8_WHISPER_RUNTIME_SOURCE_ID,
      RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_RUNTIME_SOURCE_ID,
    ]);

    expect(RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_RULES).toHaveLength(2);
    for (const rule of RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_RULES) {
      expect(rule.sourceRefs).toHaveLength(1);
      expect(rule.sourceRefs[0]).toEqual(
        expect.objectContaining({
          sourceId: RELATIONSHIP_SPOUSE_T8_WHISPER_RUNTIME_SOURCE_ID,
          supportType: 'direct_basis',
        }),
      );
      expect(rule.sourceRefs.map((sourceRef) => sourceRef.sourceId)).not.toContain(
        RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_RUNTIME_SOURCE_ID,
      );
      expect(rule.quality.reviewerStatus).toBe('unreviewed');
      expect(rule.status).toBe('research');
    }
  });

  test('registers exactly Whisper and Lee with their conservative source tiers', () => {
    expect(RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY.sources).toHaveLength(2);

    const byId = new Map(
      RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY.sources.map((source) => [
        source.sourceId,
        source,
      ]),
    );

    expect(byId.get(RELATIONSHIP_SPOUSE_T8_WHISPER_RUNTIME_SOURCE_ID)?.provenanceTier).toBe(
      'cross_reference',
    );
    expect(
      byId.get(RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_RUNTIME_SOURCE_ID)?.provenanceTier,
    ).toBe('scholarly_secondary');
  });

  test.each(['양', '음'] as const)(
    'preserves the exact 1.0.0 semantic output for resolved %s Day Master',
    (yinYang) => {
      const snapshot = resolvedPolarity(yinYang);
      const historical = runRelationshipSpouseT8RuntimeAdmission(snapshot, runOptions);
      const sourceBound = runRelationshipSpouseT8SourceBoundRuntime(snapshot, runOptions);

      expect(historical.integrity).toEqual({ valid: true, errors: [] });
      expect(sourceBound.integrity).toEqual({ valid: true, errors: [] });
      expect(semanticProjection(sourceBound)).toEqual(semanticProjection(historical));
    },
  );

  test.each([
    ['ambiguous', ambiguousDayMaster],
    ['unavailable', unavailableDayMaster],
    ['pending', pendingDayMaster],
    ['missing', missingDayMaster],
  ] as const)('%s Day Master still fails closed', (_label, fixture) => {
    const result = runRelationshipSpouseT8SourceBoundRuntime(fixture(), runOptions);
    expect(result.integrity.valid).toBe(true);
    expect(result.claims).toEqual([]);
  });

  test('does not broaden inputs, reconstruct T5, or activate a second-chart/compatibility path', () => {
    expect(RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_METHODOLOGY.inputContract).toEqual(
      RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_METHODOLOGY.inputContract,
    );

    const executableRuleMaterial = JSON.stringify(
      RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_RULES.map((rule) => ({
        taxonomy: rule.taxonomy,
        inputs: rule.inputs,
        condition: rule.condition,
        output: rule.output,
      })),
    );
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
      expect(executableRuleMaterial).not.toContain(forbidden);
    }
  });

  test('keeps lifecycle, consumers, Official Reading, and Production closed', () => {
    expect(RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_PACK.status).toBe('research');
    expect(RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_BOUNDARY).toEqual({
      historicalRuntimeVersionPreserved: '1.0.0',
      sourceBoundRuntimeVersion: '1.0.1',
      sourceBindingMaterialized: true,
      registeredSourceCount: 2,
      methodologySourceCount: 2,
      ruleSourceBindingCount: 2,
      runtimeScope: 'isolated_research_only',
      reviewerStatusChanged: false,
      lifecyclePromotionAuthorized: false,
      productionSourceTierEligibility: true,
      consumerNarrativeActivated: false,
      compatibilityConsumerActivated: false,
      previewDefaultRouteChanged: false,
      officialReadingAuthorityAuthorized: false,
      productionAdmissionAuthorized: false,
      productionState: 'HOLD',
    });
  });

  test('produces a deterministic source-bound registry snapshot', () => {
    expect(
      RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY.snapshot.registrySnapshotId,
    ).toMatch(/^registry_[a-f0-9]{24}$/);
    expect(
      RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY.snapshot.sources,
    ).toHaveLength(2);
  });
});
