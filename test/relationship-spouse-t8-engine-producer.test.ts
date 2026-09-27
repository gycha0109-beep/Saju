import { describe, expect, test } from 'vitest';
import {
  calculateCanonicalSajuSnapshot,
  type CalculationPolicySnapshot,
} from '../src/index.js';
import {
  buildRelationshipSpouseT8EngineProducerBinding,
  buildRelationshipSpouseT8EngineProducerCompletionEvidence,
  RELATIONSHIP_SPOUSE_T8_ENGINE_PRODUCER_IMPLEMENTATION_EVIDENCE,
  runRelationshipSpouseT8EngineProducer,
} from '../src/interpretation/relationship-spouse-t8-engine-producer.js';
import {
  runRelationshipSpouseT8SourceBoundRuntime,
} from '../src/research/relationship-spouse-t8-source-bound-runtime.js';

const calculationPolicy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/relationship-spouse-t8-engine-producer-test',
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
    { now: new Date('2026-09-27T19:16:00.000Z') },
  );
}

function resolvedDayMasterValue() {
  const dayMaster = baseSnapshot().derivedFacts.dayMaster;
  if (dayMaster.status !== 'resolved') {
    throw new Error('fixture requires resolved Day Master');
  }
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
        candidateId: 'spouse-t8-engine-producer-yang',
        value: { ...value, yinYang: '양' },
        reasonRefs: ['spouse-t8-engine-producer-test'],
      },
      {
        candidateId: 'spouse-t8-engine-producer-yin',
        value: { ...value, yinYang: '음' },
        reasonRefs: ['spouse-t8-engine-producer-test'],
      },
    ],
    reasonCodes: ['spouse-t8-engine-producer-test-ambiguous'],
  });
}

function unavailableDayMaster(): Snapshot {
  return withDayMaster({
    status: 'unavailable',
    reasonCode: 'spouse-t8-engine-producer-test-unavailable',
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
  requestId: 'relationship-spouse-t8-engine-producer-test',
  now: new Date('2026-09-27T19:17:00.000Z'),
};

function semanticProjection(
  result: ReturnType<typeof runRelationshipSpouseT8EngineProducer>,
) {
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

describe('Relationship / Spouse T8 P0 Engine producer', () => {
  test('binds only to the exact admitted G2A P0 contract and registry snapshot', () => {
    const binding = buildRelationshipSpouseT8EngineProducerBinding();

    expect(binding.engineProducerReady).toBe(true);
    expect(binding.capabilityKey).toBe('relationship:natal:spouse');
    expect(binding.bindingChecks).toEqual({
      boundedAdmissionValid: true,
      g2aP0GateValid: true,
      admittedAuthorityRefMatches: true,
      admittedMethodologyRefMatches: true,
      admittedRuleClaimContractRefMatches: true,
      registrySnapshotMatchesAdmission: true,
      exactRegistryShape: true,
    });
    expect(binding.executionBoundary).toEqual({
      engineOwnedExecutionSurface: true,
      genericInterpretationEngineUsed: true,
      researchRuntimeWrapperDelegatedTo: false,
      admittedRegistrySemanticMaterialReused: true,
      rulesReauthoredInEngine: false,
      newSajuSemanticsAuthorized: false,
    });
  });

  test.each(['양', '음'] as const)(
    'is semantically equivalent to the admitted Research reference for resolved %s Day Master',
    (yinYang) => {
      const snapshot = resolvedPolarity(yinYang);
      const engine = runRelationshipSpouseT8EngineProducer(snapshot, runOptions);
      const reference = runRelationshipSpouseT8SourceBoundRuntime(
        snapshot,
        runOptions,
      );

      expect(engine.integrity).toEqual({ valid: true, errors: [] });
      expect(reference.integrity).toEqual({ valid: true, errors: [] });
      expect(semanticProjection(engine)).toEqual(semanticProjection(reference));
      expect(engine.claims).toHaveLength(1);
    },
  );

  test('emits exactly the admitted Yang and Yin marker values', () => {
    const yang = runRelationshipSpouseT8EngineProducer(
      resolvedPolarity('양'),
      runOptions,
    );
    const yin = runRelationshipSpouseT8EngineProducer(
      resolvedPolarity('음'),
      runOptions,
    );

    expect(yang.claims[0]?.value).toEqual({
      dayMasterPolarity: '양',
      spouseStarSemantic: 'INDIRECT_WEALTH',
      tenGodNativeLabel: '편재',
      tenGodHanjaLabel: '偏財',
    });
    expect(yin.claims[0]?.value).toEqual({
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
  ] as const)('%s Day Master fails closed with zero claims', (_label, fixture) => {
    const result = runRelationshipSpouseT8EngineProducer(
      fixture(),
      runOptions,
    );

    expect(result.integrity.valid).toBe(true);
    expect(result.claims).toEqual([]);
  });

  test('records P0 completion evidence and routes the next slice to P1 only', () => {
    const evidence =
      buildRelationshipSpouseT8EngineProducerCompletionEvidence();

    expect(RELATIONSHIP_SPOUSE_T8_ENGINE_PRODUCER_IMPLEMENTATION_EVIDENCE).toEqual({
      producerRuntimeExists: true,
      compositionIntegrated: false,
      deterministicGuardsComplete: false,
      e2eComplete: false,
    });
    expect(evidence.p0Complete).toBe(true);
    expect(evidence.observedNextRouting).toBe('P1_COMPOSITION');
    expect(evidence.nextDisposition).toBe(
      'IMPLEMENT_ENGINE_P1_SPOUSE_T8_COMPOSITION',
    );
  });

  test('keeps every public and Production authority surface closed', () => {
    const binding = buildRelationshipSpouseT8EngineProducerBinding();

    expect(binding.authorityBoundary).toEqual({
      compositionIntegrated: false,
      deterministicGuardsComplete: false,
      e2eComplete: false,
      previewExpansionAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      publicSemanticAuthorityAuthorized: false,
      lifecyclePromotionAuthorized: false,
      productionAdmissionAuthorized: false,
      production: 'HOLD',
    });
  });

  test('is deterministic for the same admitted state', () => {
    const left = buildRelationshipSpouseT8EngineProducerBinding();
    const right = buildRelationshipSpouseT8EngineProducerBinding();
    const leftEvidence =
      buildRelationshipSpouseT8EngineProducerCompletionEvidence();
    const rightEvidence =
      buildRelationshipSpouseT8EngineProducerCompletionEvidence();

    expect(left.bindingId).toBe(right.bindingId);
    expect(leftEvidence.evidenceId).toBe(rightEvidence.evidenceId);
    expect(left.bindingId).toMatch(/^[a-f0-9]{64}$/);
    expect(leftEvidence.evidenceId).toMatch(/^[a-f0-9]{64}$/);
  });
});
