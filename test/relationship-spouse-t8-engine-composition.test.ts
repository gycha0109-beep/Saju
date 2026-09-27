import { describe, expect, test } from 'vitest';
import {
  calculateCanonicalSajuSnapshot,
  type CalculationPolicySnapshot,
} from '../src/index.js';
import {
  buildRelationshipSpouseT8EngineCompositionBinding,
  buildRelationshipSpouseT8EngineCompositionCompletionEvidence,
  composeRelationshipSpouseT8EngineReadingEvidence,
  RELATIONSHIP_SPOUSE_T8_ENGINE_COMPOSITION_IMPLEMENTATION_EVIDENCE,
} from '../src/reading/relationship-spouse-t8-engine-composition.js';

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
    { now: new Date('2026-09-27T20:16:00.000Z') },
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
        candidateId: 'spouse-t8-engine-composition-yang',
        value: { ...value, yinYang: '양' },
        reasonRefs: ['spouse-t8-engine-composition-test'],
      },
      {
        candidateId: 'spouse-t8-engine-composition-yin',
        value: { ...value, yinYang: '음' },
        reasonRefs: ['spouse-t8-engine-composition-test'],
      },
    ],
    reasonCodes: ['spouse-t8-engine-composition-test-ambiguous'],
  });
}

function unavailableDayMaster(): Snapshot {
  return withDayMaster({
    status: 'unavailable',
    reasonCode: 'spouse-t8-engine-composition-test-unavailable',
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
  requestId: 'relationship-spouse-t8-engine-composition-test',
  now: new Date('2026-09-27T20:17:00.000Z'),
};

describe('Relationship / Spouse T8 P1 Engine composition', () => {
  test('reuses the existing authorized spouse profile and existing composition path', () => {
    const binding = buildRelationshipSpouseT8EngineCompositionBinding();

    expect(binding.p0Ready).toBe(true);
    expect(binding.exactSpouseProfile).toBe(true);
    expect(binding.profileSelectionAuthorized).toBe(true);
    expect(binding.registryIdentityReady).toBe(true);
    expect(binding.compositionPathReady).toBe(true);
    expect(binding.profileRef?.id).toBe(
      'myeonghwa-reading-profile-relationship-spouse-natal-v1',
    );
    expect(binding.compositionPath).toEqual({
      engineProducerFeedsExistingReadingComposition: true,
      existingDomainReadingProfileReused: true,
      existingProfileSelectionAuthorizationReused: true,
      existingEvidenceSelectorReused: true,
      newReadingProfileCreated: false,
      newCompositionFrameworkCreated: false,
      readingSelectionMayGenerateClaims: false,
      readingSelectionMayAuthorizeDomainSemantics: false,
    });
  });

  test.each(['양', '음'] as const)(
    'selects exactly the admitted spouse claim with complete governed evidence for resolved %s Day Master',
    (yinYang) => {
      const result = composeRelationshipSpouseT8EngineReadingEvidence(
        resolvedPolarity(yinYang),
        runOptions,
      );
      const claimIds = result.execution.claims.map((claim) => claim.claimId);

      expect(result.execution.claims).toHaveLength(1);
      expect(result.composition.selection.coverageState).toBe('complete');
      expect(result.composition.selection.targetClaimIds).toEqual(claimIds);
      expect(result.composition.selection.selectedClaimIds).toEqual(claimIds);
      expect(result.composition.selection.missingRequirements).toEqual([]);
      expect(result.composition.selection.profileAuthorization.state).toBe(
        'authorized',
      );
      expect(result.composition.selection.profileRef?.id).toBe(
        'myeonghwa-reading-profile-relationship-spouse-natal-v1',
      );
      expect(result.composition.evidence).toBeDefined();
      expect(
        result.composition.evidence?.bundle.claims.map((claim) => claim.claimId),
      ).toEqual(claimIds);
      expect(result.composition.evidence?.bundle.constraints).toEqual({
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
    '%s Day Master remains fail-closed through Reading composition',
    (_label, fixture) => {
      const result = composeRelationshipSpouseT8EngineReadingEvidence(
        fixture(),
        runOptions,
      );

      expect(result.execution.claims).toEqual([]);
      expect(result.composition.selection.coverageState).toBe(
        'insufficient_evidence',
      );
      expect(result.composition.selection.targetClaimIds).toEqual([]);
      expect(result.composition.selection.selectedClaimIds).toEqual([]);
      expect(result.composition.selection.missingRequirements).toEqual([
        'RELATIONSHIP_SPOUSE_DOMAIN_CLAIM_REQUIRED',
      ]);
      expect(result.composition.evidence).toBeUndefined();
    },
  );

  test('keeps selection authorization separate from semantic authority', () => {
    const result = composeRelationshipSpouseT8EngineReadingEvidence(
      resolvedPolarity('양'),
      runOptions,
    );

    expect(result.composition.profileAuthorization?.scope).toBe(
      'reading_evidence_selection_only',
    );
    expect(result.composition.profileAuthorization?.constraints).toEqual({
      mayAuthorizeInterpretationRules: false,
      mayAuthorizeClaimGeneration: false,
      mayAuthorizeDomainSemantics: false,
      mayPromoteResearchAuthority: false,
      mayOverrideInterpretationAuthorization: false,
    });
    expect(result.composition.selection.constraints).toEqual({
      mayGenerateClaims: false,
      mayResolveConflicts: false,
      mayCollapseScenarios: false,
      mayPromoteResearchAuthority: false,
    });
  });

  test('records P1 completion evidence and routes the next slice to P2 only', () => {
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

  test('keeps public and Production authority closed', () => {
    const binding = buildRelationshipSpouseT8EngineCompositionBinding();

    expect(binding.authorityBoundary).toEqual({
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

  test('is deterministic for the same snapshot, execution time and admitted state', () => {
    const snapshot = resolvedPolarity('양');
    const left = composeRelationshipSpouseT8EngineReadingEvidence(
      snapshot,
      runOptions,
    );
    const right = composeRelationshipSpouseT8EngineReadingEvidence(
      snapshot,
      runOptions,
    );
    const leftEvidence =
      buildRelationshipSpouseT8EngineCompositionCompletionEvidence();
    const rightEvidence =
      buildRelationshipSpouseT8EngineCompositionCompletionEvidence();

    expect(left.binding.bindingId).toBe(right.binding.bindingId);
    expect(left.execution.run.runHash).toBe(right.execution.run.runHash);
    expect(left.composition.selection.selectionId).toBe(
      right.composition.selection.selectionId,
    );
    expect(left.composition.evidence?.evidenceBundleHash).toBe(
      right.composition.evidence?.evidenceBundleHash,
    );
    expect(leftEvidence.evidenceId).toBe(rightEvidence.evidenceId);
  });
});
