import { describe, expect, test } from 'vitest';
import {
  calculateCanonicalSajuSnapshot,
  type CalculationPolicySnapshot,
  type EarthlyBranch,
} from '../src/index.js';
import {
  runInterpretation,
  type InterpretationExecutionResult,
} from '../src/interpretation/interpretation-engine.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE,
} from '../src/research/relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceIsolatedResearchExecution,
  buildRelationshipSpouseT8DayBranchPalaceIsolatedResearchExecutionAuthority,
  runRelationshipSpouseT8DayBranchPalaceIsolatedResearchExecution,
  validateRelationshipSpouseT8DayBranchPalaceIsolatedResearchExecutionAuthority,
  type RelationshipSpouseT8DayBranchPalaceIsolatedResearchExecutionAuthority,
  type RelationshipSpouseT8DayBranchPalaceIsolatedResearchRunOptions,
} from '../src/research/relationship-spouse-t8-day-branch-palace-isolated-research-execution.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_JUNG_RUNTIME_SOURCE_ID,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SAJU_ATELIER_RUNTIME_SOURCE_ID,
} from '../src/research/relationship-spouse-t8-day-branch-palace-source-manifest-candidate.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_PACK,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RUNTIME_VERSION,
} from '../src/research/relationship-spouse-t8-source-adjudicated-staging-runtime.js';

const calculationPolicy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/relationship-spouse-t8-day-branch-palace-sa5e-test',
  policyVersion: '1.0.0',
  dayBoundary: 'midnight',
  trueSolarTime: {
    enabled: false,
    longitudeSource: 'not-applicable',
    applyEquationOfTime: false,
    applyHistoricalDst: false,
  },
  timeZonePolicy: {
    source: 'service-default',
    timeZone: 'Asia/Seoul',
  },
  unknownBirthTimePolicy:
    'preserve-unknown-and-enumerate-boundaries',
};

type Snapshot = ReturnType<typeof calculateCanonicalSajuSnapshot>;

function baseSnapshot(
  sexForTraditionalCalculation:
    | 'male'
    | 'female'
    | 'unspecified' = 'unspecified',
): Snapshot {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1992, month: 10, day: 24 },
      time: { known: true, hour: 5, minute: 30 },
      sexForTraditionalCalculation,
    },
    calculationPolicy,
    { now: new Date('2026-09-29T02:00:00.000Z') },
  );
}

function resolvedDayPillarValue(snapshot = baseSnapshot()) {
  const day = snapshot.pillars.day;
  if (day.status !== 'resolved') {
    throw new Error('fixture requires resolved Day Pillar');
  }
  return day.value;
}

function withDayPillar(
  day: unknown,
  snapshot = baseSnapshot(),
): Snapshot {
  return {
    ...snapshot,
    pillars: {
      ...snapshot.pillars,
      day,
    },
  } as Snapshot;
}

function withDayBranch(branch: EarthlyBranch): Snapshot {
  const value = resolvedDayPillarValue();
  return withDayPillar({
    status: 'resolved',
    value: {
      ...value,
      branch: {
        ...value.branch,
        value: branch,
      },
    },
  });
}

function ambiguousDayPillar(): Snapshot {
  const value = resolvedDayPillarValue();
  return withDayPillar({
    status: 'ambiguous',
    candidates: [
      {
        candidateId: 'sa5e-day-a',
        value,
        reasonRefs: ['sa5e'],
      },
      {
        candidateId: 'sa5e-day-b',
        value: {
          ...value,
          branch: {
            ...value.branch,
            value: value.branch.value === '자' ? '축' : '자',
          },
        },
        reasonRefs: ['sa5e'],
      },
    ],
    reasonCodes: ['sa5e-ambiguous'],
  });
}

function unavailableDayPillar(): Snapshot {
  return withDayPillar({
    status: 'unavailable',
    reasonCode: 'sa5e-unavailable',
  });
}

function missingDayPillar(): Snapshot {
  const snapshot = baseSnapshot();
  const pillars = { ...snapshot.pillars } as Record<string, unknown>;
  delete pillars.day;
  return { ...snapshot, pillars } as unknown as Snapshot;
}

function directRun(snapshot: Snapshot): InterpretationExecutionResult {
  return runInterpretation(
    snapshot,
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE,
    {
      requestId: 'sa5e-direct-registry',
      now: new Date('2026-09-29T02:30:00.000Z'),
    },
  );
}

function isolatedRun(snapshot: Snapshot): InterpretationExecutionResult {
  return runRelationshipSpouseT8DayBranchPalaceIsolatedResearchExecution(
    snapshot,
    {
      requestId: 'sa5e-isolated-wrapper',
      now: new Date('2026-09-29T02:30:00.000Z'),
    },
  );
}

function semanticProjection(result: InterpretationExecutionResult) {
  return result.claims.map((claim) => ({
    claimType: claim.claimType,
    taxonomy: claim.taxonomy,
    subject: claim.subject,
    predicate: claim.predicate,
    value: claim.value,
    polarity: claim.polarity,
    factRefs: claim.factRefs,
  }));
}

function spousePalaceClaims(snapshot: Snapshot) {
  return isolatedRun(snapshot).claims.filter(
    (claim) =>
      claim.claimType ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
  );
}

const earthlyBranches: readonly EarthlyBranch[] = [
  '자',
  '축',
  '인',
  '묘',
  '진',
  '사',
  '오',
  '미',
  '신',
  '유',
  '술',
  '해',
];

const execution =
  buildRelationshipSpouseT8DayBranchPalaceIsolatedResearchExecution();
const authority =
  buildRelationshipSpouseT8DayBranchPalaceIsolatedResearchExecutionAuthority();

describe('Relationship / Spouse T8 Day-Branch spouse-palace SA-5E isolated research execution', () => {
  test('authorizes only the exact SA-5D-admitted 2.0.0 candidate for isolated research execution', () => {
    expect(execution.semanticVersion).toBe('2.0.0');
    expect(execution.blockers).toEqual([]);
    expect(execution.isolatedResearchExecutionAuthorized).toBe(true);
    expect(execution.executionId).toMatch(/^[a-f0-9]{64}$/u);
    expect(execution.executionAuthority.authorityRef.contentHash).toMatch(
      /^[a-f0-9]{64}$/u,
    );
    expect(execution.checks).toMatchObject({
      exactBridgeAdmission: true,
      exactCandidateBinding: true,
      exactRegistryBinding: true,
      exactPackBinding: true,
      registryIntegrityVerified: true,
      exactSourceBinding: true,
      noCorroborationInflation: true,
      exactClaimSurface: true,
      reviewAuthorityPreserved: true,
      legacyV110Isolated: true,
      authorityInjectionBlocked: true,
      authorityValidationValid: true,
      registryIntegrityErrors: [],
      authorityValidationBlockers: [],
    });
  });

  test('execution authority validates exact review/candidate/registry/pack binding and fails on candidate drift', () => {
    expect(
      validateRelationshipSpouseT8DayBranchPalaceIsolatedResearchExecutionAuthority(
        authority,
      ),
    ).toEqual({
      valid: true,
      blockers: [],
    });

    const tampered:
      RelationshipSpouseT8DayBranchPalaceIsolatedResearchExecutionAuthority =
      Object.freeze({
        authorityRef: authority.authorityRef,
        material: Object.freeze({
          ...authority.material,
          candidateRef: Object.freeze({
            ...authority.material.candidateRef,
            contentHash: '0'.repeat(64),
          }),
        }),
      });

    const validation =
      validateRelationshipSpouseT8DayBranchPalaceIsolatedResearchExecutionAuthority(
        tampered,
      );
    expect(validation.valid).toBe(false);
    expect(validation.blockers).toContain('SA5E_CANDIDATE_REF_DRIFT');
    expect(validation.blockers).toContain('SA5E_AUTHORITY_REF_DRIFT');
  });

  test('reuses the exact source-bound candidate without creating a new lifecycle surface', () => {
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE.sources.map(
        (source) => source.sourceId,
      ),
    ).toEqual([
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_JUNG_RUNTIME_SOURCE_ID,
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SAJU_ATELIER_RUNTIME_SOURCE_ID,
    ]);

    expect(execution.authorityBoundary).toEqual({
      bridgeReentryAdmissionAuthorized: true,
      isolatedResearchExecutionAuthorized: true,
      sourceBoundCandidateReusedWithoutMutation: true,
      newRegistryCreated: false,
      legacyV110Mutated: false,
      reviewAttestationCreated: false,
      reviewerTrustGrantEstablished: false,
      reviewerStatusPromotionAuthorized: false,
      lifecycleMutationAuthorized: false,
      stagingAuthorized: false,
      shadowExecutionAuthorized: false,
      narrativeConsumerActivated: false,
      previewAuthorityAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      productionAuthorityAuthorized: false,
      production: 'HOLD',
    });
    expect(execution.nextDisposition).toBe(
      'RUN_SA_5F_STAGING_LIFECYCLE_ELIGIBILITY_REVIEW',
    );
  });

  test.each(earthlyBranches)(
    'resolved Day Branch %s has direct-registry / isolated-wrapper parity with exactly one position-only claim',
    (branch) => {
      const snapshot = withDayBranch(branch);
      const direct = directRun(snapshot);
      const isolated = isolatedRun(snapshot);

      expect(direct.integrity).toEqual({ valid: true, errors: [] });
      expect(isolated.integrity).toEqual({ valid: true, errors: [] });
      expect(semanticProjection(isolated)).toEqual(
        semanticProjection(direct),
      );
      expect(isolated.claims).toHaveLength(1);
      expect(isolated.claims[0]?.claimType).toBe(
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
      );
      expect(isolated.claims[0]?.value).toEqual({
        position: 'day_branch',
        traditionalRole: 'spouse_palace',
        semanticScope: 'position_only',
      });
      expect(isolated.claims[0]?.polarity).toBe('neutral');
      expect(isolated.claims[0]?.factRefs).toEqual(['pillars.day']);

      const serializedValue = JSON.stringify(
        isolated.claims[0]?.value,
      );
      expect(serializedValue).not.toContain(branch);
    },
  );

  test.each([
    ['ambiguous', ambiguousDayPillar],
    ['unavailable', unavailableDayPillar],
    ['missing', missingDayPillar],
  ] as const)(
    '%s Day Pillar fails closed identically through the isolated wrapper',
    (_label, fixture) => {
      const snapshot = fixture();
      expect(semanticProjection(isolatedRun(snapshot))).toEqual(
        semanticProjection(directRun(snapshot)),
      );
      expect(spousePalaceClaims(snapshot)).toEqual([]);
    },
  );

  test('same resolved chart position remains invariant across male/female/unspecified traditional sex inputs', () => {
    const projections = (
      ['male', 'female', 'unspecified'] as const
    ).map((sex) => {
      const result = isolatedRun(baseSnapshot(sex));
      expect(result.claims).toHaveLength(1);
      return semanticProjection(result);
    });

    expect(projections[1]).toEqual(projections[0]);
    expect(projections[2]).toEqual(projections[0]);
  });

  test('caller cannot inject promotion or reviewer-trust authority into isolated execution', () => {
    expect(() =>
      runRelationshipSpouseT8DayBranchPalaceIsolatedResearchExecution(
        baseSnapshot(),
        {
          promotionAuthorityContext: null,
        } as unknown as RelationshipSpouseT8DayBranchPalaceIsolatedResearchRunOptions,
      ),
    ).toThrow(/does not accept caller-supplied promotion or reviewer-trust authority/u);

    expect(() =>
      runRelationshipSpouseT8DayBranchPalaceIsolatedResearchExecution(
        baseSnapshot(),
        {
          reviewerTrustContext: null,
        } as unknown as RelationshipSpouseT8DayBranchPalaceIsolatedResearchRunOptions,
      ),
    ).toThrow(/does not accept caller-supplied promotion or reviewer-trust authority/u);
  });

  test('legacy 1.1.0 staging spouse-star lineage remains isolated and unchanged', () => {
    expect(
      RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RUNTIME_VERSION,
    ).toBe('1.1.0');
    expect(
      RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_METHODOLOGY.status,
    ).toBe('reviewed');
    expect(
      RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES.map(
        (rule) => ({
          status: rule.status,
          provenanceQuality: rule.quality.provenanceQuality,
          reviewerStatus: rule.quality.reviewerStatus,
        }),
      ),
    ).toEqual([
      {
        status: 'reviewed',
        provenanceQuality: 'unknown',
        reviewerStatus: 'unreviewed',
      },
      {
        status: 'reviewed',
        provenanceQuality: 'unknown',
        reviewerStatus: 'unreviewed',
      },
    ]);
    expect(
      RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_PACK.status,
    ).toBe('staging');

    const result = isolatedRun(baseSnapshot());
    expect(result.claims).toHaveLength(1);
    expect(
      result.claims.some(
        (claim) =>
          claim.claimType ===
          'relationship.spouse.role_neutral_spouse_star_marker',
      ),
    ).toBe(false);
  });
});
