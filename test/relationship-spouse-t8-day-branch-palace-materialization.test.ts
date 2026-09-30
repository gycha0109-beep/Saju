import { describe, expect, test } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type {
  CalculationPolicySnapshot,
  EarthlyBranch,
} from '../src/contracts/calculation.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { verifyResolvedRegistryContentIntegrity } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_CONTRACT_BOUNDARY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_CONTRACT_VERSION,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_VALUE_SCHEMA,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PACK,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE,
} from '../src/research/relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceMaterialization,
} from '../src/research/relationship-spouse-t8-day-branch-palace-materialization.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_DIRECT_BASIS_SOURCE_LINKS,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_JUNG_RUNTIME_SOURCE_ID,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SAJU_ATELIER_RUNTIME_SOURCE_ID,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SOURCE_MANIFEST_CANDIDATE_SOURCES,
  buildRelationshipSpouseT8DayBranchPalaceSourceManifestCandidate,
} from '../src/research/relationship-spouse-t8-day-branch-palace-source-manifest-candidate.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_PACK,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RUNTIME_VERSION,
} from '../src/research/relationship-spouse-t8-source-adjudicated-staging-runtime.js';

const calculationPolicy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/relationship-spouse-t8-day-branch-palace-materialization-test',
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
    { now: new Date('2026-09-29T00:00:00.000Z') },
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
        candidateId: 'spouse-palace-day-a',
        value,
        reasonRefs: ['spouse-palace-test'],
      },
      {
        candidateId: 'spouse-palace-day-b',
        value: {
          ...value,
          branch: {
            ...value.branch,
            value: value.branch.value === '자' ? '축' : '자',
          },
        },
        reasonRefs: ['spouse-palace-test'],
      },
    ],
    reasonCodes: ['spouse-palace-test-ambiguous'],
  });
}

function unavailableDayPillar(): Snapshot {
  return withDayPillar({
    status: 'unavailable',
    reasonCode: 'spouse-palace-test-unavailable',
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
      requestId: 'relationship-spouse-t8-day-branch-palace-materialization-test',
      now: new Date('2026-09-29T00:30:00.000Z'),
    },
  );
}

function spousePalaceClaims(snapshot: Snapshot) {
  return run(snapshot).claims.filter(
    (claim) =>
      claim.claimType === RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
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

const sourceManifestCandidate =
  buildRelationshipSpouseT8DayBranchPalaceSourceManifestCandidate();
const materialization =
  buildRelationshipSpouseT8DayBranchPalaceMaterialization();

describe('Relationship / Spouse T8 Day-Branch spouse-palace 2.0 materialization', () => {
  test('materializes a separate registered 2.0.0 research claim contract', () => {
    expect(RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_CONTRACT_VERSION).toBe(
      '2.0.0',
    );
    expect(RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE).toBe(
      'relationship.spouse.traditional_spouse_palace_position',
    );
    expect(RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION).toMatchObject({
      scope: 'natal',
      exclusiveValue: true,
      scenarioSensitive: false,
      materialForNarrative: false,
      allowedTaxonomyTiers: ['T8'],
    });
    expect(RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_VALUE_SCHEMA.root).toEqual({
      kind: 'object',
      required: ['position', 'traditionalRole', 'semanticScope'],
      properties: {
        position: { kind: 'literal', value: 'day_branch' },
        traditionalRole: { kind: 'literal', value: 'spouse_palace' },
        semanticScope: { kind: 'literal', value: 'position_only' },
      },
      additionalProperties: false,
    });
  });

  test('uses one domain-synthesis rule over resolved pillars.day only', () => {
    expect(RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY.family).toBe(
      'domain_synthesis',
    );
    expect(RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY.requiredFactTypes).toEqual([
      'pillars.day',
    ]);
    expect(RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.inputs).toEqual([
      {
        key: 'relationship_spouse_day_pillar',
        source: 'canonical_fact',
        pathOrClaimType: 'pillars.day',
        acceptedStatuses: ['resolved'],
        required: true,
        ambiguityBehavior: 'requires_resolved',
      },
    ]);
    expect(RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.condition).toEqual({
      op: 'exists',
      value: {
        kind: 'input',
        key: 'relationship_spouse_day_pillar',
        path: 'branch.value',
      },
    });
  });

  test.each(earthlyBranches)(
    'resolved Day Branch %s emits exactly one identical position-only claim',
    (branch) => {
      const result = run(withDayBranch(branch));
      const claims = result.claims.filter(
        (claim) =>
          claim.claimType ===
          RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
      );

      expect(result.integrity).toEqual({ valid: true, errors: [] });
      expect(claims).toHaveLength(1);
      expect(claims[0]?.taxonomy).toEqual({
        tier: 'T8',
        category: 'relationship',
        subcategory: 'spouse',
      });
      expect(claims[0]?.value).toEqual({
        position: 'day_branch',
        traditionalRole: 'spouse_palace',
        semanticScope: 'position_only',
      });
      expect(claims[0]?.polarity).toBe('neutral');
      expect(claims[0]?.factRefs).toEqual(['pillars.day']);
    },
  );

  test.each([
    ['ambiguous', ambiguousDayPillar],
    ['unavailable', unavailableDayPillar],
    ['missing', missingDayPillar],
  ] as const)('%s Day Pillar fails closed with zero positional claim', (_label, fixture) => {
    expect(spousePalaceClaims(fixture())).toEqual([]);
  });

  test('position determination is invariant across traditional sex input values', () => {
    const projections = (['male', 'female', 'unspecified'] as const).map((sex) => {
      const claims = spousePalaceClaims(baseSnapshot(sex));
      expect(claims).toHaveLength(1);
      return {
        claimType: claims[0]?.claimType,
        taxonomy: claims[0]?.taxonomy,
        subject: claims[0]?.subject,
        predicate: claims[0]?.predicate,
        value: claims[0]?.value,
        polarity: claims[0]?.polarity,
      };
    });

    expect(projections[1]).toEqual(projections[0]);
    expect(projections[2]).toEqual(projections[0]);
  });

  test('registers exactly the two SA-5B counted direct-basis sources', () => {
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SOURCE_MANIFEST_CANDIDATE_SOURCES.map(
        (source) => [source.sourceId, source.provenanceTier],
      ),
    ).toEqual([
      [
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_JUNG_RUNTIME_SOURCE_ID,
        'scholarly_secondary',
      ],
      [
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SAJU_ATELIER_RUNTIME_SOURCE_ID,
        'cross_reference',
      ],
    ]);
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_DIRECT_BASIS_SOURCE_LINKS.map(
        (source) => [source.sourceId, source.supportType],
      ),
    ).toEqual([
      [
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_JUNG_RUNTIME_SOURCE_ID,
        'direct_basis',
      ],
      [
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SAJU_ATELIER_RUNTIME_SOURCE_ID,
        'direct_basis',
      ],
    ]);

    const serialized = JSON.stringify(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SOURCE_MANIFEST_CANDIDATE_SOURCES,
    );
    expect(serialized).not.toContain('LEI_');
    expect(serialized).not.toContain('OPENFATE');
    expect(serialized).not.toContain('ZIPING');
  });

  test('materializes multi-source provenance without fabricating review authority', () => {
    expect(RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.quality).toEqual({
      provenanceQuality: 'multi_source_supported',
      testCoverage: 'fixture_matrix',
      methodologyStability: 'stable_within_method',
      reviewerStatus: 'unreviewed',
    });
    expect(RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.status).toBe(
      'research',
    );
    expect(RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY.status).toBe(
      'research',
    );
    expect(RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PACK.status).toBe(
      'research',
    );
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE
        .reviewAttestations,
    ).toEqual([]);
  });

  test('candidate registry is content-valid but remains non-admitted and non-consumer-facing', () => {
    expect(
      verifyResolvedRegistryContentIntegrity(
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE,
      ),
    ).toEqual([]);
    expect(RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_CONTRACT_BOUNDARY).toMatchObject({
      runtimeScope: 'materialized_research_candidate_only',
      narrativeConsumerActivated: false,
      previewDefaultRouteChanged: false,
      bridgeAdmissionAuthorized: false,
      stagingAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      productionAuthorityAuthorized: false,
      production: 'HOLD',
    });
  });

  test('source manifest candidate binds the exact SA-5B pair without authority inflation', () => {
    expect(sourceManifestCandidate.manifestCandidateComplete).toBe(true);
    expect(sourceManifestCandidate.checks).toEqual({
      exactSurveyDirectBasisPair: true,
      exactlyTwoRuntimeSources: true,
      mappingsResolve: true,
      methodologyCoverage: true,
      directBasisCoverage: true,
      rightsHandlingExplicit: true,
      noCorroborationInflation: true,
    });
    expect(sourceManifestCandidate.authorityBoundary).toEqual({
      existingV110RuntimeManifestMutated: false,
      reviewerAuthorityCreated: false,
      lifecyclePromotionAuthorized: false,
      consumerActivationAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      productionAdmissionAuthorized: false,
      production: 'HOLD',
    });
  });

  test('preserves the closed 1.1.0 staging lineage unchanged', () => {
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

  test('materialization binds exact upstream lineage and stops at SA-5D review', () => {
    expect(materialization.candidateMaterialized).toBe(true);
    expect(materialization.bridgeReentryReadyForReview).toBe(true);
    expect(materialization.checks).toEqual({
      upstreamLineageAccepted: true,
      claimContractExact: true,
      sourceManifestExact: true,
      registryIntegrityVerified: true,
      legacyV110Preserved: true,
      registryIntegrityErrors: [],
    });
    expect(materialization.candidate).toMatchObject({
      provenanceQuality: 'multi_source_supported',
      reviewerStatus: 'unreviewed',
      lifecycle: {
        methodology: 'research',
        rule: 'research',
        pack: 'research',
      },
    });
    expect(materialization.authorityBoundary).toEqual({
      legacyV110Mutated: false,
      semanticSupersessionDeclared: false,
      bridgeAdmissionAuthorized: false,
      stagingAuthorized: false,
      reviewAttestationCount: 0,
      reviewerTrustGrantEstablished: false,
      previewAuthorityAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      productionAuthorityAuthorized: false,
      production: 'HOLD',
    });
    expect(materialization.nextDisposition).toBe(
      'RUN_SA_5D_BRIDGE_REENTRY_ADMISSION_REVIEW',
    );
  });
});
