import { describe, expect, test } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type { CalculationPolicySnapshot } from '../src/contracts/calculation.js';
import type { InterpretationClaim } from '../src/contracts/interpretation.js';
import { prepareProductReading } from '../src/reading/index.js';
import {
  RELATIONSHIP_SPOUSE_T8_ENGINE_COMPOSITION_IMPLEMENTATION_EVIDENCE,
  buildRelationshipSpouseT8EngineCompositionBinding,
  buildRelationshipSpouseT8EngineCompositionCompletionEvidence,
  prepareRelationshipSpouseT8EngineComposition,
} from '../src/reading/relationship-spouse-t8-engine-composition.js';
import {
  runRelationshipSpouseT8EngineProducer,
} from '../src/interpretation/relationship-spouse-t8-engine-producer.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY,
} from '../src/research/relationship-spouse-t8-source-bound-runtime.js';

const calculationPolicy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/relationship-spouse-t8-engine-composition-test',
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
    { now: new Date('2026-09-27T20:10:00.000Z') },
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
        candidateId: 'spouse-t8-p1-yang',
        value: { ...value, yinYang: '양' },
        reasonRefs: ['spouse-t8-p1-test'],
      },
      {
        candidateId: 'spouse-t8-p1-yin',
        value: { ...value, yinYang: '음' },
        reasonRefs: ['spouse-t8-p1-test'],
      },
    ],
    reasonCodes: ['spouse-t8-p1-test-ambiguous'],
  });
}

function unavailableDayMaster(): Snapshot {
  return withDayMaster({
    status: 'unavailable',
    reasonCode: 'spouse-t8-p1-test-unavailable',
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

const now = new Date('2026-09-27T20:11:00.000Z');

describe('Relationship / Spouse T8 P1 Engine composition', () => {
  test('binds the completed P0 producer to the exact existing spouse profile and authorization', () => {
    const binding = buildRelationshipSpouseT8EngineCompositionBinding();

    expect(binding.compositionBindingReady).toBe(true);
    expect(binding.capabilityKey).toBe('relationship:natal:spouse');
    expect(binding.profileRef.id).toBe(
      'myeonghwa-reading-profile-relationship-spouse-natal-v1',
    );
    expect(binding.profileAuthorizationRef?.contentHash).toMatch(/^[a-f0-9]{64}$/);
    expect(binding.bindingChecks).toEqual({
      p0ProducerReady: true,
      exactSpouseProfile: true,
      profileSelectionAuthorized: true,
      registryIdentityPreserved: true,
    });
    expect(binding.compositionBoundary).toEqual({
      existingProfileReused: true,
      existingProfileAuthorizationReused: true,
      genericProductReadingPreparationReused: true,
      newReadingProfileCreated: false,
      newSajuSemanticsAuthorized: false,
      consumerNarrativeActivated: false,
    });
  });

  test.each([
    ['양', 'INDIRECT_WEALTH', '편재', '偏財'],
    ['음', 'INDIRECT_POWER', '편관', '偏官'],
  ] as const)(
    'composes the actual %s Engine producer claim into complete governed spouse evidence',
    (yinYang, semantic, nativeLabel, hanjaLabel) => {
      const result = prepareRelationshipSpouseT8EngineComposition(
        resolvedPolarity(yinYang),
        {
          requestId: `spouse-p1-${yinYang}`,
          now,
          includeSourceSummaries: true,
        },
      );

      expect(result.outcome).toBe('complete');
      expect(result.interpretation.claims).toHaveLength(1);
      expect(result.interpretation.claims[0]?.value).toEqual({
        dayMasterPolarity: yinYang,
        spouseStarSemantic: semantic,
        tenGodNativeLabel: nativeLabel,
        tenGodHanjaLabel: hanjaLabel,
      });
      expect(result.preparation.state).toBe('ready_for_execution');
      expect(result.preparation.normalization.request?.intent).toEqual({
        domain: 'relationship',
        temporalScope: 'natal',
        relationshipScope: 'spouse',
      });
      expect(result.preparation.composition?.selection.coverageState).toBe(
        'complete',
      );
      expect(result.selectedClaimIds).toEqual(result.producerClaimIds);
      expect(result.preparation.composition?.selection.missingRequirements).toEqual([]);
      expect(result.preparation.composition?.evidence?.bundle.claims).toHaveLength(1);
      expect(
        result.preparation.composition?.evidence?.bundle.canonicalFacts.map(
          (fact) => fact.path,
        ),
      ).toContain('derivedFacts.dayMaster');
      expect(
        result.preparation.composition?.evidence?.bundle.sourceSummaries?.length,
      ).toBeGreaterThan(0);
      expect(
        result.preparation.composition?.evidence?.bundle.constraints,
      ).toEqual({
        mayRecalculate: false,
        mayInventRules: false,
        mustPreserveMethodDifferences: true,
        mustDiscloseMaterialAmbiguity: true,
      });
    },
  );

  test.each([
    ['ambiguous', ambiguousDayMaster],
    ['unavailable', unavailableDayMaster],
    ['pending', pendingDayMaster],
    ['missing', missingDayMaster],
  ] as const)(
    '%s Day Master remains insufficient evidence with no selected claim or governed bundle',
    (_label, fixture) => {
      const result = prepareRelationshipSpouseT8EngineComposition(fixture(), {
        requestId: `spouse-p1-${_label}`,
        now,
      });

      expect(result.outcome).toBe('insufficient_evidence');
      expect(result.interpretation.claims).toEqual([]);
      expect(result.preparation.state).toBe('insufficient_evidence');
      expect(result.preparation.composition?.selection.coverageState).toBe(
        'insufficient_evidence',
      );
      expect(result.preparation.composition?.selection.targetClaimIds).toEqual([]);
      expect(result.preparation.composition?.selection.selectedClaimIds).toEqual([]);
      expect(result.preparation.composition?.evidence).toBeUndefined();
      expect(result.preparation.executionEligibility.readingExecution).toBe(
        'blocked_coverage',
      );
    },
  );

  test('the existing spouse profile excludes relationship/general claims even beside the real spouse producer claim', () => {
    const snapshot = resolvedPolarity('양');
    const execution = runRelationshipSpouseT8EngineProducer(snapshot, {
      requestId: 'spouse-p1-general-exclusion',
      now,
    });
    const spouse = execution.claims[0];
    if (spouse === undefined) throw new Error('fixture requires spouse claim');

    const general: InterpretationClaim = {
      ...spouse,
      claimId: 'synthetic-general-relationship-claim',
      taxonomy: {
        tier: 'T8',
        category: 'relationship',
        subcategory: 'general',
      },
    };

    const preparation = prepareProductReading(
      snapshot,
      {
        ...execution,
        claims: [spouse, general],
      },
      RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY,
      {
        requestId: 'spouse-p1-general-exclusion',
        text: '배우자운',
      },
    );

    expect(preparation.state).toBe('ready_for_execution');
    expect(preparation.composition?.selection.selectedClaimIds).toEqual([
      spouse.claimId,
    ]);
    expect(preparation.composition?.selection.omittedClaimIds).toContain(
      general.claimId,
    );
    expect(
      preparation.composition?.evidence?.bundle.claims.map(
        (claim) => claim.claimId,
      ),
    ).toEqual([spouse.claimId]);
  });

  test('records P1 completion evidence and routes the next Engine slice to P2 hardening only', () => {
    const evidence =
      buildRelationshipSpouseT8EngineCompositionCompletionEvidence();

    expect(
      RELATIONSHIP_SPOUSE_T8_ENGINE_COMPOSITION_IMPLEMENTATION_EVIDENCE,
    ).toEqual({
      producerRuntimeExists: true,
      compositionIntegrated: true,
      deterministicGuardsComplete: false,
      e2eComplete: false,
    });
    expect(evidence.p1Complete).toBe(true);
    expect(evidence.observedNextRouting).toBe('P2_HARDENING');
    expect(evidence.nextDisposition).toBe(
      'IMPLEMENT_ENGINE_P2_SPOUSE_T8_HARDENING',
    );
  });

  test('keeps narrative, Preview, Official Reading and Production authority closed', () => {
    const binding = buildRelationshipSpouseT8EngineCompositionBinding();

    expect(binding.authorityBoundary).toEqual({
      compositionIntegrated: true,
      deterministicGuardsComplete: false,
      e2eComplete: false,
      legacyNarrativeExecutionAuthorized: false,
      previewExpansionAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      publicSemanticAuthorityAuthorized: false,
      lifecyclePromotionAuthorized: false,
      productionAdmissionAuthorized: false,
      production: 'HOLD',
    });
  });

  test('is deterministic for the same governed composition state', () => {
    const left = buildRelationshipSpouseT8EngineCompositionBinding();
    const right = buildRelationshipSpouseT8EngineCompositionBinding();
    const leftEvidence =
      buildRelationshipSpouseT8EngineCompositionCompletionEvidence();
    const rightEvidence =
      buildRelationshipSpouseT8EngineCompositionCompletionEvidence();

    expect(left.bindingId).toBe(right.bindingId);
    expect(leftEvidence.evidenceId).toBe(rightEvidence.evidenceId);
    expect(left.bindingId).toMatch(/^[a-f0-9]{64}$/);
    expect(leftEvidence.evidenceId).toMatch(/^[a-f0-9]{64}$/);
  });
});
