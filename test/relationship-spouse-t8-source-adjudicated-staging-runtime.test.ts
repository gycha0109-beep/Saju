import { describe, expect, test } from 'vitest';
import { SOURCE_ADJUDICATION_STAGING_AUTHORIZATION_POLICY_VERSION } from '../src/interpretation/interpretation-engine.js';
import {
  buildSourceAdjudicationExecutionAuthorityRef,
  type SourceAdjudicationExecutionAuthority,
  type SourceAdjudicationExecutionAuthorityMaterial,
} from '../src/interpretation/promotion-authority.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type { CalculationPolicySnapshot } from '../src/contracts/calculation.js';
import {
  runRelationshipSpouseT8EngineProducer,
} from '../src/interpretation/relationship-spouse-t8-engine-producer.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_PACK,
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_RULES,
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_VERSION,
  runRelationshipSpouseT8SourceBoundRuntime,
} from '../src/research/relationship-spouse-t8-source-bound-runtime.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_BOUNDARY,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_PACK,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RUNTIME_VERSION,
  buildRelationshipSpouseT8SourceAdjudicatedStagingExecutionAuthority,
  buildRelationshipSpouseT8SourceAdjudicatedStagingLineage,
  runRelationshipSpouseT8SourceAdjudicatedStagingRuntime,
  validateRelationshipSpouseT8SourceAdjudicatedStagingAuthority,
} from '../src/research/relationship-spouse-t8-source-adjudicated-staging-runtime.js';

const calculationPolicy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/relationship-spouse-t8-source-adjudicated-staging-test',
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
    { now: new Date('2026-09-28T00:00:00.000Z') },
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
        candidateId: 'relationship-spouse-t8-staging-test-yang',
        value: { ...value, yinYang: '양' },
        reasonRefs: ['relationship-spouse-t8-staging-test'],
      },
      {
        candidateId: 'relationship-spouse-t8-staging-test-yin',
        value: { ...value, yinYang: '음' },
        reasonRefs: ['relationship-spouse-t8-staging-test'],
      },
    ],
    reasonCodes: ['relationship-spouse-t8-staging-test-ambiguous'],
  });
}

function unavailableDayMaster(): Snapshot {
  return withDayMaster({
    status: 'unavailable',
    reasonCode: 'relationship-spouse-t8-staging-test-unavailable',
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
  requestId: 'relationship-spouse-t8-source-adjudicated-staging-test',
  now: new Date('2026-09-28T01:00:00.000Z'),
};

function semanticProjection(
  result: ReturnType<typeof runRelationshipSpouseT8SourceBoundRuntime>,
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

function rehashAuthority(
  base: SourceAdjudicationExecutionAuthority,
  material: SourceAdjudicationExecutionAuthorityMaterial,
): SourceAdjudicationExecutionAuthority {
  return {
    material,
    authorityRef: buildSourceAdjudicationExecutionAuthorityRef(
      base.authorityRef.id,
      base.authorityRef.version,
      material,
    ),
  };
}

describe('Relationship / Spouse T8 source-adjudicated staging runtime', () => {
  test('preserves research 1.0.1 immutably and materializes a separate 1.1.0 staging lifecycle', () => {
    expect(RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_VERSION).toBe('1.0.1');
    expect(RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_METHODOLOGY.status).toBe(
      'research',
    );
    expect(
      RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_RULES.every(
        (rule) => rule.status === 'research',
      ),
    ).toBe(true);
    expect(RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_PACK.status).toBe(
      'research',
    );

    expect(
      RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RUNTIME_VERSION,
    ).toBe('1.1.0');
    expect(
      RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_METHODOLOGY.status,
    ).toBe('reviewed');
    expect(
      RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES.every(
        (rule) => rule.status === 'reviewed',
      ),
    ).toBe(true);
    expect(
      RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_PACK.status,
    ).toBe('staging');
  });

  test('keeps factual quality metadata unchanged while lifecycle status advances', () => {
    for (const [index, stagingRule] of
      RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES.entries()) {
      const researchRule = RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_RULES[index];
      expect(stagingRule.quality).toEqual(researchRule?.quality);
      expect(stagingRule.quality.reviewerStatus).toBe('unreviewed');
      expect(stagingRule.quality.provenanceQuality).toBe('unknown');
      expect(stagingRule.quality.provenanceQuality).not.toBe('primary_supported');
      expect(stagingRule.quality.provenanceQuality).not.toBe(
        'multi_source_supported',
      );
      expect(stagingRule.quality.reviewerStatus).not.toBe('domain_reviewed');
    }
  });

  test('binds exact source research, candidate, policy, decision, staging registry, pack, and execution authority lineage', () => {
    const lineage =
      buildRelationshipSpouseT8SourceAdjudicatedStagingLineage();
    const authority =
      buildRelationshipSpouseT8SourceAdjudicatedStagingExecutionAuthority();

    expect(lineage.sourceResearchRuntimeRef.version).toBe('1.0.1');
    expect(lineage.sourceResearchRegistrySnapshotId).toBe(
      RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY.snapshot
        .registrySnapshotId,
    );
    expect(lineage.stagingRegistrySnapshotId).toBe(
      RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_REGISTRY.snapshot
        .registrySnapshotId,
    );
    expect(lineage.stagingPackRef).toEqual(
      RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_REGISTRY.snapshot
        .packRef,
    );
    expect(lineage.sourceAdjudicationExecutionAuthorityRef).toEqual(
      authority.authorityRef,
    );
    expect(lineage.policyRef.contentHash).toMatch(/^[a-f0-9]{64}$/);
    expect(lineage.candidateRef.contentHash).toMatch(/^[a-f0-9]{64}$/);
    expect(lineage.governanceDecisionRef.contentHash).toMatch(/^[a-f0-9]{64}$/);
  });

  test('exact capability authority permits staging execution and records source-adjudication identity', () => {
    const authority =
      buildRelationshipSpouseT8SourceAdjudicatedStagingExecutionAuthority();
    expect(
      validateRelationshipSpouseT8SourceAdjudicatedStagingAuthority(authority),
    ).toEqual({ valid: true, blockers: [] });

    const result = runRelationshipSpouseT8SourceAdjudicatedStagingRuntime(
      resolvedPolarity('양'),
      runOptions,
    );

    expect(result.integrity).toEqual({ valid: true, errors: [] });
    expect(result.run.authorizationPolicyVersion).toBe(
      SOURCE_ADJUDICATION_STAGING_AUTHORIZATION_POLICY_VERSION,
    );
    expect(result.run.sourceAdjudicationAuthorityRef).toEqual(
      authority.authorityRef,
    );
  });

  test.each([
    ['policy', 'SPOUSE_T8_SOURCE_ADJUDICATION_POLICY_REF_DRIFT'],
    ['candidate', 'SPOUSE_T8_SOURCE_ADJUDICATION_CANDIDATE_REF_DRIFT'],
    ['decision', 'SPOUSE_T8_SOURCE_ADJUDICATION_DECISION_REF_DRIFT'],
  ] as const)('fails closed on exact %s ref drift', (field, blocker) => {
    const base =
      buildRelationshipSpouseT8SourceAdjudicatedStagingExecutionAuthority();
    const refField =
      field === 'policy'
        ? 'policyRef'
        : field === 'candidate'
          ? 'candidateRef'
          : 'decisionRef';
    const material = {
      ...base.material,
      [refField]: {
        ...base.material[refField],
        contentHash: '0'.repeat(64),
      },
    } as SourceAdjudicationExecutionAuthorityMaterial;
    const drifted = rehashAuthority(base, material);
    const validation =
      validateRelationshipSpouseT8SourceAdjudicatedStagingAuthority(drifted);

    expect(validation.valid).toBe(false);
    expect(validation.blockers).toContain(blocker);
  });

  test('fails closed on registry, pack, lifecycle-target, and authority-hash drift', () => {
    const base =
      buildRelationshipSpouseT8SourceAdjudicatedStagingExecutionAuthority();

    const registryDrift = rehashAuthority(base, {
      ...base.material,
      authorizedRegistrySnapshotId: 'registry_drifted',
    });
    expect(
      validateRelationshipSpouseT8SourceAdjudicatedStagingAuthority(
        registryDrift,
      ).blockers,
    ).toContain('SOURCE_ADJUDICATION_REGISTRY_SNAPSHOT_MISMATCH');

    const packDrift = rehashAuthority(base, {
      ...base.material,
      authorizedPackRef: {
        ...base.material.authorizedPackRef,
        contentHash: '0'.repeat(64),
      },
    });
    expect(
      validateRelationshipSpouseT8SourceAdjudicatedStagingAuthority(packDrift)
        .blockers,
    ).toContain('SOURCE_ADJUDICATION_PACK_REF_MISMATCH');

    const productionTargetMaterial = {
      ...base.material,
      lifecycleTarget: 'production',
    } as unknown as SourceAdjudicationExecutionAuthorityMaterial;
    const productionTarget = rehashAuthority(base, productionTargetMaterial);
    expect(
      validateRelationshipSpouseT8SourceAdjudicatedStagingAuthority(
        productionTarget,
      ).blockers,
    ).toContain('SOURCE_ADJUDICATION_LIFECYCLE_TARGET_MISMATCH');

    const authorityHashDrift = {
      ...base,
      authorityRef: {
        ...base.authorityRef,
        contentHash: '0'.repeat(64),
      },
    };
    expect(
      validateRelationshipSpouseT8SourceAdjudicatedStagingAuthority(
        authorityHashDrift,
      ).blockers,
    ).toContain('SOURCE_ADJUDICATION_AUTHORITY_HASH_MISMATCH');
  });

  test.each(['양', '음'] as const)(
    'preserves Research / Engine / Staging bounded semantic parity for resolved %s Day Master',
    (yinYang) => {
      const snapshot = resolvedPolarity(yinYang);
      const research = runRelationshipSpouseT8SourceBoundRuntime(
        snapshot,
        runOptions,
      );
      const engine = runRelationshipSpouseT8EngineProducer(
        snapshot,
        runOptions,
      );
      const staging = runRelationshipSpouseT8SourceAdjudicatedStagingRuntime(
        snapshot,
        runOptions,
      );

      expect(research.integrity.valid).toBe(true);
      expect(engine.integrity.valid).toBe(true);
      expect(staging.integrity.valid).toBe(true);
      expect(semanticProjection(staging)).toEqual(semanticProjection(research));
      expect(semanticProjection(staging)).toEqual(semanticProjection(engine));
      expect(staging.claims).toHaveLength(1);

      expect(staging.claims[0]?.value).toEqual(
        yinYang === '양'
          ? {
              dayMasterPolarity: '양',
              spouseStarSemantic: 'INDIRECT_WEALTH',
              tenGodNativeLabel: '편재',
              tenGodHanjaLabel: '偏財',
            }
          : {
              dayMasterPolarity: '음',
              spouseStarSemantic: 'INDIRECT_POWER',
              tenGodNativeLabel: '편관',
              tenGodHanjaLabel: '偏官',
            },
      );
    },
  );

  test.each([
    ['ambiguous', ambiguousDayMaster],
    ['unavailable', unavailableDayMaster],
    ['pending', pendingDayMaster],
    ['missing', missingDayMaster],
  ] as const)('%s Day Master still emits zero spouse claims', (_label, fixture) => {
    const result = runRelationshipSpouseT8SourceAdjudicatedStagingRuntime(
      fixture(),
      runOptions,
    );
    expect(result.integrity.valid).toBe(true);
    expect(result.claims).toEqual([]);
  });

  test('does not broaden exact input or leak general relationship, time-dynamic, compatibility, or second-chart scope', () => {
    expect(
      RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_METHODOLOGY
        .inputContract,
    ).toEqual(
      RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_METHODOLOGY.inputContract,
    );

    const executableMaterial = JSON.stringify(
      RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES.map((rule) => ({
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
      'marriageGuarantee',
      'marriageTiming',
      'fertility',
      'annual',
      'monthly',
      'compatibility',
      'secondChart',
      'relationship_general',
    ]) {
      expect(executableMaterial).not.toContain(forbidden);
    }
  });

  test('owns promotion authority internally and rejects caller authority injection', () => {
    expect(() =>
      runRelationshipSpouseT8SourceAdjudicatedStagingRuntime(
        resolvedPolarity('양'),
        {
          ...runOptions,
          promotionAuthorityContext: {
            mode: 'source_adjudication',
            sourceAdjudicationAuthority:
              buildRelationshipSpouseT8SourceAdjudicatedStagingExecutionAuthority(),
          },
        } as never,
      ),
    ).toThrow(/callers may not inject/);
  });

  test('keeps consumer, narrative, Preview, Official Reading, Production, and Gate 14 closed', () => {
    expect(
      RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_BOUNDARY,
    ).toEqual({
      sourceAdjudicationAuthorityEstablished: true,
      researchRuntimePreserved: true,
      stagingRegistryMaterialized: true,
      stagingLifecycleMutationApplied: true,
      sourceAdjudicatedStagingExecutionAuthorized: true,
      shadowExecutionAuthorized: true,
      runtimeScope: 'source_adjudicated_staging_shadow_only',
      humanDomainReviewEstablished: false,
      reviewerTrustGrantEstablished: false,
      productConsumerActivated: false,
      narrativeActivated: false,
      previewActivated: false,
      officialReadingActivated: false,
      productionAdmissionAuthorized: false,
      production: 'HOLD',
      gate14ShadowStagingEvidenceComplete: false,
      nextDisposition: 'RUN_SOURCE_ADJUDICATED_SHADOW_STAGING_EVIDENCE',
    });
  });
});
