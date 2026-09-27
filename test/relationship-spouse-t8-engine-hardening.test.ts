import { describe, expect, test } from 'vitest';
import {
  calculateCanonicalSajuSnapshot,
  prepareProductReading,
  type BirthInput,
  type CalculationPolicySnapshot,
  type CanonicalSajuSnapshot,
} from '../src/index.js';
import {
  runRelationshipSpouseT8EngineProducer,
} from '../src/interpretation/relationship-spouse-t8-engine-producer.js';
import {
  prepareRelationshipSpouseT8EngineComposition,
} from '../src/reading/relationship-spouse-t8-engine-composition.js';
import {
  RELATIONSHIP_SPOUSE_T8_ENGINE_READY_IMPLEMENTATION_EVIDENCE,
  buildRelationshipSpouseT8EngineHardeningBinding,
  buildRelationshipSpouseT8EngineHardeningCompletionEvidence,
  runRelationshipSpouseT8EngineE2E,
} from '../src/reading/relationship-spouse-t8-engine-hardening.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY,
} from '../src/research/relationship-spouse-t8-source-bound-runtime.js';

const policy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/relationship-spouse-t8-engine-hardening-test',
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

const calculationNow = new Date('2026-09-27T20:40:00.000Z');
const interpretationNow = new Date('2026-09-27T20:41:00.000Z');

function birthInput(day: number): BirthInput {
  return {
    calendarType: 'solar',
    date: { year: 1992, month: 10, day },
    time: { known: true, hour: 5, minute: 30 },
    sexForTraditionalCalculation: 'unspecified',
  };
}

function baseSnapshot(): CanonicalSajuSnapshot {
  return calculateCanonicalSajuSnapshot(
    birthInput(24),
    policy,
    { now: calculationNow },
  );
}

function resolvedDayMasterValue() {
  const dayMaster = baseSnapshot().derivedFacts.dayMaster;
  if (dayMaster.status !== 'resolved') {
    throw new Error('fixture requires resolved Day Master');
  }
  return dayMaster.value;
}

function withDayMaster(dayMaster: unknown): CanonicalSajuSnapshot {
  const snapshot = baseSnapshot();
  return {
    ...snapshot,
    derivedFacts: {
      ...snapshot.derivedFacts,
      dayMaster,
    },
  } as CanonicalSajuSnapshot;
}

function ambiguousDayMaster(): CanonicalSajuSnapshot {
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

function unavailableDayMaster(): CanonicalSajuSnapshot {
  return withDayMaster({
    status: 'unavailable',
    reasonCode: 'spouse-t8-p2-hardening-unavailable',
  });
}

function pendingDayMaster(): CanonicalSajuSnapshot {
  return withDayMaster({ status: 'pending' });
}

function missingDayMaster(): CanonicalSajuSnapshot {
  const snapshot = baseSnapshot();
  const derivedFacts = { ...snapshot.derivedFacts } as Record<string, unknown>;
  delete derivedFacts.dayMaster;
  return {
    ...snapshot,
    derivedFacts,
  } as unknown as CanonicalSajuSnapshot;
}

function semanticProjection(
  snapshot: CanonicalSajuSnapshot,
  requestId: string,
) {
  const result = runRelationshipSpouseT8EngineProducer(snapshot, {
    requestId,
    now: interpretationNow,
  });
  return result.claims.map((claim) => ({
    taxonomy: claim.taxonomy,
    claimType: claim.claimType,
    subject: claim.subject,
    predicate: claim.predicate,
    value: claim.value,
  }));
}

describe('Relationship / Spouse T8 P2 Engine hardening', () => {
  test('binds P2 only when the exact scope-isolation and single-chart guards remain intact', () => {
    const binding = buildRelationshipSpouseT8EngineHardeningBinding();

    expect(binding.hardeningBindingReady).toBe(true);
    expect(binding.capabilityKey).toBe('relationship:natal:spouse');
    expect(binding.guardChecks).toEqual({
      p1Ready: true,
      exactSpouseProfileAuthorized: true,
      generalRelationshipExcludesSpouse: true,
      temporalScopeIsolationPreserved: true,
      compatibilityIsolationPreserved: true,
      claimNarrativeBoundaryPreserved: true,
      singleChartInputBoundaryPreserved: true,
      forbiddenExpansionBoundaryPreserved: true,
    });
    expect(binding.e2eBoundary).toEqual({
      startsFromCanonicalBirthInput: true,
      canonicalCalculationEngineUsed: true,
      engineProducerUsed: true,
      governedCompositionUsed: true,
      governedEvidenceRequiredForResolvedCase: true,
      productDeliveryRequiredForP2: false,
      narrativeExecutionRequiredForP2: false,
      secondChartInputAccepted: false,
    });
  });

  test('runs canonical birth input through calculation, Engine producer, claim graph, spouse profile and governed evidence for both polarities', () => {
    const results = [24, 25].map((day) =>
      runRelationshipSpouseT8EngineE2E({
        birthInput: birthInput(day),
        calculationPolicy: policy,
        calculationOptions: { now: calculationNow },
        requestId: `spouse-t8-p2-e2e-${day}`,
        interpretationNow,
        includeSourceSummaries: true,
      }),
    );

    const polarities = results.map((result) => {
      const dayMaster = result.snapshot.derivedFacts.dayMaster;
      if (dayMaster.status !== 'resolved') {
        throw new Error('E2E fixture requires resolved Day Master');
      }

      expect(result.composition.outcome).toBe('complete');
      expect(result.composition.interpretation.integrity).toEqual({
        valid: true,
        errors: [],
      });
      expect(result.composition.interpretation.claims).toHaveLength(1);
      expect(result.composition.interpretation.run.claimIds).toEqual(
        result.composition.interpretation.claims.map((claim) => claim.claimId),
      );
      expect(result.composition.preparation.composition?.selection.coverageState).toBe(
        'complete',
      );
      expect(result.composition.preparation.composition?.evidence).toBeDefined();
      expect(result.governedEvidenceHash).toMatch(/^[a-f0-9]{64}$/);
      expect(result.e2eId).toMatch(/^[a-f0-9]{64}$/);

      const claim = result.composition.interpretation.claims[0];
      if (dayMaster.value.yinYang === '양') {
        expect(claim?.value).toEqual({
          dayMasterPolarity: '양',
          spouseStarSemantic: 'INDIRECT_WEALTH',
          tenGodNativeLabel: '편재',
          tenGodHanjaLabel: '偏財',
        });
      } else {
        expect(claim?.value).toEqual({
          dayMasterPolarity: '음',
          spouseStarSemantic: 'INDIRECT_POWER',
          tenGodNativeLabel: '편관',
          tenGodHanjaLabel: '偏官',
        });
      }

      return dayMaster.value.yinYang;
    });

    expect(new Set(polarities)).toEqual(new Set(['양', '음']));
  });

  test('same canonical birth input and execution time rerun to identical claim identity and run hash', () => {
    const input = {
      birthInput: birthInput(24),
      calculationPolicy: policy,
      calculationOptions: { now: calculationNow },
      requestId: 'spouse-t8-p2-determinism',
      interpretationNow,
    } as const;

    const left = runRelationshipSpouseT8EngineE2E(input);
    const right = runRelationshipSpouseT8EngineE2E(input);

    expect(left.snapshot.snapshotId).toBe(right.snapshot.snapshotId);
    expect(left.snapshot.calculationHash).toBe(right.snapshot.calculationHash);
    expect(left.composition.interpretation.run.runHash).toBe(
      right.composition.interpretation.run.runHash,
    );
    expect(
      left.composition.interpretation.claims.map((claim) => claim.claimId),
    ).toEqual(
      right.composition.interpretation.claims.map((claim) => claim.claimId),
    );
    expect(left.governedEvidenceHash).toBe(right.governedEvidenceHash);
  });

  test('unrelated sex-for-traditional-calculation mutation cannot change the role-neutral spouse semantic projection', () => {
    const canonical = baseSnapshot();
    const male: CanonicalSajuSnapshot = {
      ...canonical,
      input: {
        ...canonical.input,
        sexForTraditionalCalculation: 'male',
      },
    };
    const female: CanonicalSajuSnapshot = {
      ...canonical,
      input: {
        ...canonical.input,
        sexForTraditionalCalculation: 'female',
      },
    };

    expect(semanticProjection(male, 'spouse-t8-p2-sex-neutral')).toEqual(
      semanticProjection(female, 'spouse-t8-p2-sex-neutral'),
    );
  });

  test.each([
    ['ambiguous', ambiguousDayMaster],
    ['unavailable', unavailableDayMaster],
    ['pending', pendingDayMaster],
    ['missing', missingDayMaster],
  ] as const)(
    '%s Day Master remains fail-closed through the P2 composition boundary',
    (_label, fixture) => {
      const result = prepareRelationshipSpouseT8EngineComposition(fixture(), {
        requestId: `spouse-t8-p2-${_label}`,
        now: interpretationNow,
      });

      expect(result.outcome).toBe('insufficient_evidence');
      expect(result.interpretation.claims).toEqual([]);
      expect(result.preparation.state).toBe('insufficient_evidence');
      expect(result.preparation.composition?.selection.selectedClaimIds).toEqual(
        [],
      );
      expect(result.preparation.composition?.evidence).toBeUndefined();
    },
  );

  test('relationship general intent cannot reuse the admitted spouse meaning', () => {
    const snapshot = baseSnapshot();
    const execution = runRelationshipSpouseT8EngineProducer(snapshot, {
      requestId: 'spouse-t8-p2-general-isolation',
      now: interpretationNow,
    });

    const preparation = prepareProductReading(
      snapshot,
      execution,
      RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY,
      {
        requestId: 'spouse-t8-p2-general-isolation',
        text: '연애운',
      },
    );

    expect(preparation.normalization.request?.intent).toEqual({
      domain: 'relationship',
      temporalScope: 'natal',
      relationshipScope: 'general',
    });
    expect(preparation.state).toBe('insufficient_evidence');
    expect(preparation.composition?.selection.selectedClaimIds).toEqual([]);
    expect(preparation.composition?.evidence).toBeUndefined();
  });

  test.each([
    ['올해 배우자운', '2026-09-27T20:45:00.000Z'],
    ['이번 달 배우자운', '2026-09-27T20:45:00.000Z'],
  ] as const)(
    '%s cannot auto-expand natal spouse authority into temporal spouse authority',
    (text, referenceDateTime) => {
      const snapshot = baseSnapshot();
      const execution = runRelationshipSpouseT8EngineProducer(snapshot, {
        requestId: `spouse-t8-p2-temporal-${text}`,
        now: interpretationNow,
      });

      const preparation = prepareProductReading(
        snapshot,
        execution,
        RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY,
        {
          requestId: `spouse-t8-p2-temporal-${text}`,
          text,
          referenceDateTime,
        },
      );

      expect(preparation.state).toBe('unsupported_intent');
      expect(preparation.composition?.selection.selectedClaimIds ?? []).toEqual(
        [],
      );
      expect(preparation.composition?.evidence).toBeUndefined();
    },
  );

  test('compatibility intent cannot reuse the spouse marker and requires no second-chart access in this capability', () => {
    const snapshot = baseSnapshot();
    const execution = runRelationshipSpouseT8EngineProducer(snapshot, {
      requestId: 'spouse-t8-p2-compatibility-isolation',
      now: interpretationNow,
    });

    const preparation = prepareProductReading(
      snapshot,
      execution,
      RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY,
      {
        requestId: 'spouse-t8-p2-compatibility-isolation',
        text: '궁합',
        targetPersonRef: 'opaque-other-person-ref-only',
      },
    );

    expect(preparation.normalization.request?.intent).toEqual({
      domain: 'compatibility',
      temporalScope: 'natal',
    });
    expect(preparation.state).toBe('insufficient_evidence');
    expect(preparation.composition?.selection.selectedClaimIds).toEqual([]);
    expect(preparation.composition?.evidence).toBeUndefined();

    const binding = buildRelationshipSpouseT8EngineHardeningBinding();
    expect(binding.guardChecks.singleChartInputBoundaryPreserved).toBe(true);
    expect(binding.e2eBoundary.secondChartInputAccepted).toBe(false);
  });

  test('records completed deterministic guards + Engine E2E and reaches READY without granting public or Production authority', () => {
    const completion =
      buildRelationshipSpouseT8EngineHardeningCompletionEvidence();

    expect(
      RELATIONSHIP_SPOUSE_T8_ENGINE_READY_IMPLEMENTATION_EVIDENCE,
    ).toEqual({
      producerRuntimeExists: true,
      compositionIntegrated: true,
      deterministicGuardsComplete: true,
      e2eComplete: true,
    });
    expect(completion.p2Complete).toBe(true);
    expect(completion.observedRouting).toBe('READY');
    expect(completion.nextDisposition).toBe(
      'ENGINE_IMPLEMENTATION_READY_AUTHORITY_STILL_HELD',
    );
    expect(completion.authorityBoundary).toEqual({
      engineImplementationReady: true,
      previewExpansionAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      publicSemanticAuthorityAuthorized: false,
      lifecyclePromotionAuthorized: false,
      productionAdmissionAuthorized: false,
      production: 'HOLD',
    });
  });
});
