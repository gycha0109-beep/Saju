import { describe, expect, test } from 'vitest';
import {
  calculateCanonicalSajuSnapshot,
  type CalculationPolicySnapshot,
  type EarthlyBranch,
} from '../src/index.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE,
} from '../src/research/relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceBridgeReentryAdmissionReview,
} from '../src/research/relationship-spouse-t8-day-branch-palace-bridge-reentry-admission-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_PACK,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RUNTIME_VERSION,
} from '../src/research/relationship-spouse-t8-source-adjudicated-staging-runtime.js';

const calculationPolicy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/relationship-spouse-t8-day-branch-palace-sa5d-test',
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

function baseSnapshot(
  sexForTraditionalCalculation: 'male' | 'female' | 'unspecified' = 'unspecified',
): Snapshot {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1992, month: 10, day: 24 },
      time: { known: true, hour: 5, minute: 30 },
      sexForTraditionalCalculation,
    },
    calculationPolicy,
    { now: new Date('2026-09-29T01:00:00.000Z') },
  );
}

function resolvedDayPillarValue(snapshot = baseSnapshot()) {
  const day = snapshot.pillars.day;
  if (day.status !== 'resolved') {
    throw new Error('fixture requires resolved Day Pillar');
  }
  return day.value;
}

function withDayPillar(day: unknown, snapshot = baseSnapshot()): Snapshot {
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
        candidateId: 'sa5d-day-a',
        value,
        reasonRefs: ['sa5d'],
      },
      {
        candidateId: 'sa5d-day-b',
        value: {
          ...value,
          branch: {
            ...value.branch,
            value: value.branch.value === '자' ? '축' : '자',
          },
        },
        reasonRefs: ['sa5d'],
      },
    ],
    reasonCodes: ['sa5d-ambiguous'],
  });
}

function unavailableDayPillar(): Snapshot {
  return withDayPillar({
    status: 'unavailable',
    reasonCode: 'sa5d-unavailable',
  });
}

function missingDayPillar(): Snapshot {
  const snapshot = baseSnapshot();
  const pillars = { ...snapshot.pillars } as Record<string, unknown>;
  delete pillars.day;
  return { ...snapshot, pillars } as unknown as Snapshot;
}

function run(snapshot: Snapshot) {
  return runInterpretation(
    snapshot,
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE,
    {
      requestId: 'relationship-spouse-t8-day-branch-palace-sa5d-test',
      now: new Date('2026-09-29T01:30:00.000Z'),
    },
  );
}

function spousePalaceClaims(snapshot: Snapshot) {
  return run(snapshot).claims.filter(
    (claim) =>
      claim.claimType === RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
  );
}

const review =
  buildRelationshipSpouseT8DayBranchPalaceBridgeReentryAdmissionReview();

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

describe('Relationship / Spouse T8 Day-Branch spouse-palace SA-5D Bridge re-entry admission review', () => {
  test('admits only the exact content-addressed 2.0.0 candidate into Bridge research review lineage', () => {
    expect(review.semanticVersion).toBe('2.0.0');
    expect(review.candidateRef).toMatchObject({
      id: 'relationship-spouse-t8-day-branch-palace-bridge-reentry-candidate',
      version: '2.0.0',
    });
    expect(review.candidateRef.contentHash).toMatch(/^[a-f0-9]{64}$/u);
    expect(review.blockers).toEqual([]);
    expect(review.bridgeReentryAdmissionAuthorized).toBe(true);
    expect(review.checks).toMatchObject({
      exactUpstreamMaterialization: true,
      exactSemanticScope: true,
      exactCanonicalInput: true,
      demographicInputIsolation: true,
      exactProvenance: true,
      registryContractValid: true,
      singleNonConflictingClaimContract: true,
      legacyV110Isolated: true,
      failCloseContractComplete: true,
      reviewAuthorityPreserved: true,
      consumerIsolation: true,
      forbiddenSemanticExpansionAbsent: true,
      registryIntegrityErrors: [],
    });
  });

  test('PASS stops before execution, staging, consumers, review authority, and Production', () => {
    expect(review.authorityBoundary).toEqual({
      exactCandidateOnly: true,
      bridgeReentryAdmissionAuthorized: true,
      isolatedResearchExecutionAuthorized: false,
      sourceBoundRuntimeMutationAuthorized: false,
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
    expect(review.nextDisposition).toBe(
      'BUILD_SA_5E_ISOLATED_RESEARCH_EXECUTION',
    );
  });

  test.each(earthlyBranches)(
    'resolved Day Branch %s produces exactly one non-conflicting position-only claim',
    (branch) => {
      const result = run(withDayBranch(branch));
      expect(result.integrity).toEqual({ valid: true, errors: [] });
      expect(result.claims).toHaveLength(1);
      expect(spousePalaceClaims(withDayBranch(branch))).toHaveLength(1);
      expect(result.claims[0]?.value).toEqual({
        position: 'day_branch',
        traditionalRole: 'spouse_palace',
        semanticScope: 'position_only',
      });
    },
  );

  test.each([
    ['ambiguous', ambiguousDayPillar],
    ['unavailable', unavailableDayPillar],
    ['missing', missingDayPillar],
  ] as const)('%s Day Pillar fails closed during admission verification', (_label, fixture) => {
    expect(spousePalaceClaims(fixture())).toEqual([]);
  });

  test('same resolved chart position is invariant across traditional sex input values', () => {
    const projections = (['male', 'female', 'unspecified'] as const).map((sex) => {
      const claims = spousePalaceClaims(baseSnapshot(sex));
      expect(claims).toHaveLength(1);
      return {
        claimType: claims[0]?.claimType,
        subject: claims[0]?.subject,
        predicate: claims[0]?.predicate,
        value: claims[0]?.value,
        polarity: claims[0]?.polarity,
      };
    });

    expect(projections[1]).toEqual(projections[0]);
    expect(projections[2]).toEqual(projections[0]);
  });

  test('legacy 1.1.0 staging lineage remains semantically isolated and unchanged', () => {
    expect(RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RUNTIME_VERSION).toBe(
      '1.1.0',
    );
    expect(RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_METHODOLOGY.status).toBe(
      'reviewed',
    );
    expect(
      RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES.map((rule) => ({
        status: rule.status,
        provenanceQuality: rule.quality.provenanceQuality,
        reviewerStatus: rule.quality.reviewerStatus,
      })),
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
    expect(RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_PACK.status).toBe(
      'staging',
    );
  });
});
