import { describe, expect, test } from 'vitest';
import {
  calculateCanonicalSajuSnapshot,
} from '../src/calculation/calculation-engine.js';
import type {
  CalculationPolicySnapshot,
} from '../src/contracts/calculation.js';
import {
  SOURCE_ADJUDICATION_STAGING_AUTHORIZATION_POLICY_VERSION,
} from '../src/interpretation/interpretation-engine.js';
import {
  buildSourceAdjudicationExecutionAuthorityRef,
} from '../src/interpretation/promotion-authority.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceIsolatedShadowStagingExecutionReview,
  buildRelationshipSpouseT8DayBranchPalaceShadowStagingExecutionAuthority,
  runRelationshipSpouseT8DayBranchPalaceShadowStagingExecution,
  validateRelationshipSpouseT8DayBranchPalaceShadowStagingExecutionAuthority,
  type RelationshipSpouseT8DayBranchPalaceShadowStagingExecutionAuthority,
  type RelationshipSpouseT8DayBranchPalaceShadowStagingExecutionAuthorityMaterial,
  type RelationshipSpouseT8DayBranchPalaceShadowStagingRunOptions,
} from '../src/research/relationship-spouse-t8-day-branch-palace-isolated-shadow-staging-execution.js';

const calculationPolicy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/relationship-spouse-t8-day-branch-palace-sa5i-test',
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

function baseSnapshot() {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1992, month: 10, day: 24 },
      time: { known: true, hour: 5, minute: 30 },
      sexForTraditionalCalculation: 'unspecified',
    },
    calculationPolicy,
    { now: new Date('2026-09-30T03:00:00.000Z') },
  );
}

function rehashAuthority(
  base: RelationshipSpouseT8DayBranchPalaceShadowStagingExecutionAuthority,
  material: RelationshipSpouseT8DayBranchPalaceShadowStagingExecutionAuthorityMaterial,
): RelationshipSpouseT8DayBranchPalaceShadowStagingExecutionAuthority {
  return Object.freeze({
    material,
    authorityRef: buildSourceAdjudicationExecutionAuthorityRef(
      base.authorityRef.id,
      base.authorityRef.version,
      material,
    ),
  });
}

describe('Relationship / Spouse T8 Day-Branch spouse-palace SA-5I isolated shadow staging execution', () => {
  test('binds the exact SA-5H materialization to a valid source-adjudication staging execution authority', () => {
    const authority =
      buildRelationshipSpouseT8DayBranchPalaceShadowStagingExecutionAuthority();

    expect(
      validateRelationshipSpouseT8DayBranchPalaceShadowStagingExecutionAuthority(
        authority,
      ),
    ).toEqual({
      valid: true,
      blockers: [],
    });
    expect(authority.material.capabilityKey).toBe(
      'relationship:natal:spouse',
    );
    expect(authority.material.lifecycleTarget).toBe('staging');
    expect(authority.material.sourceAdjudicationAuthorityEstablished).toBe(
      true,
    );
    expect(authority.material.productionAuthorityAuthorized).toBe(false);
    expect(authority.material.upstreamMaterializationId).toMatch(
      /^[a-f0-9]{64}$/u,
    );
    expect(authority.material.upstreamMaterializationRef.contentHash).toMatch(
      /^[a-f0-9]{64}$/u,
    );
    expect(authority.authorityRef.contentHash).toMatch(/^[a-f0-9]{64}$/u);
  });

  test('records the exact source-adjudication authorization policy on staging execution', () => {
    const authority =
      buildRelationshipSpouseT8DayBranchPalaceShadowStagingExecutionAuthority();
    const result =
      runRelationshipSpouseT8DayBranchPalaceShadowStagingExecution(
        baseSnapshot(),
        {
          requestId: 'sa5i-policy-recording',
          now: new Date('2026-09-30T03:01:00.000Z'),
        },
      );

    expect(result.integrity).toEqual({ valid: true, errors: [] });
    expect(result.run.authorizationPolicyVersion).toBe(
      SOURCE_ADJUDICATION_STAGING_AUTHORIZATION_POLICY_VERSION,
    );
    expect(result.run.sourceAdjudicationAuthorityRef).toEqual(
      authority.authorityRef,
    );
    expect(result.claims).toHaveLength(1);
    expect(result.claims[0]?.value).toEqual({
      position: 'day_branch',
      traditionalRole: 'spouse_palace',
      semanticScope: 'position_only',
    });
  });

  test('produces exact research-vs-staging parity across all 12 resolved Day Branches', () => {
    const evidence =
      buildRelationshipSpouseT8DayBranchPalaceIsolatedShadowStagingExecutionReview();

    expect(evidence.resolvedBranchCases).toHaveLength(12);
    expect(
      new Set(evidence.resolvedBranchCases.map((item) => item.branch)),
    ).toEqual(
      new Set([
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
      ]),
    );

    for (const item of evidence.resolvedBranchCases) {
      expect(item.researchClaimCount).toBe(1);
      expect(item.stagingClaimCount).toBe(1);
      expect(item.semanticParity).toBe(true);
      expect(item.authorizationRecorded).toBe(true);
      expect(item.exactPositionOnlyClaim).toBe(true);
      expect(item.casePass).toBe(true);
      expect(item.researchSemanticHash).toBe(item.stagingSemanticHash);
    }

    expect(evidence.checks.resolvedBranchCoverage).toBe(true);
    expect(evidence.checks.resolvedBranchParity).toBe(true);
    expect(evidence.checks.authorizationRecorded).toBe(true);
  });

  test('preserves ambiguous, unavailable, and missing Day Pillar fail-close parity', () => {
    const evidence =
      buildRelationshipSpouseT8DayBranchPalaceIsolatedShadowStagingExecutionReview();

    expect(evidence.failClosedCases.map((item) => item.caseId)).toEqual([
      'ambiguous-day-pillar',
      'unavailable-day-pillar',
      'missing-day-pillar',
    ]);

    for (const item of evidence.failClosedCases) {
      expect(item.researchClaimCount).toBe(0);
      expect(item.stagingClaimCount).toBe(0);
      expect(item.semanticParity).toBe(true);
      expect(item.casePass).toBe(true);
    }

    expect(evidence.checks.failClosedParity).toBe(true);
  });

  test('keeps the position-only semantic invariant across male, female, and unspecified traditional-sex inputs', () => {
    const evidence =
      buildRelationshipSpouseT8DayBranchPalaceIsolatedShadowStagingExecutionReview();
    const baseline = evidence.sexInvariantCases[0]?.stagingSemanticHash;

    expect(evidence.sexInvariantCases.map((item) => item.sex)).toEqual([
      'male',
      'female',
      'unspecified',
    ]);
    expect(baseline).toBeDefined();

    for (const item of evidence.sexInvariantCases) {
      expect(item.researchClaimCount).toBe(1);
      expect(item.stagingClaimCount).toBe(1);
      expect(item.semanticParity).toBe(true);
      expect(item.casePass).toBe(true);
      expect(item.stagingSemanticHash).toBe(baseline);
    }

    expect(evidence.checks.sexInvariant).toBe(true);
  });

  test('preserves exact two-source provenance, unreviewed reviewer state, and legacy 1.1 isolation', () => {
    const evidence =
      buildRelationshipSpouseT8DayBranchPalaceIsolatedShadowStagingExecutionReview();

    expect(evidence.checks.exactSourceBinding).toBe(true);
    expect(evidence.checks.reviewAuthorityPreserved).toBe(true);
    expect(evidence.checks.legacyV110Isolated).toBe(true);
    expect(evidence.checks.consumerAuthorityHeld).toBe(true);
  });

  test('fails closed when the exact SA-5H materialization reference drifts', () => {
    const authority =
      buildRelationshipSpouseT8DayBranchPalaceShadowStagingExecutionAuthority();
    const material = Object.freeze({
      ...authority.material,
      upstreamMaterializationRef: Object.freeze({
        ...authority.material.upstreamMaterializationRef,
        contentHash: '0'.repeat(64),
      }),
    }) as RelationshipSpouseT8DayBranchPalaceShadowStagingExecutionAuthorityMaterial;
    const drifted = rehashAuthority(authority, material);
    const validation =
      validateRelationshipSpouseT8DayBranchPalaceShadowStagingExecutionAuthority(
        drifted,
      );

    expect(validation.valid).toBe(false);
    expect(validation.blockers).toContain('SA5I_MATERIALIZATION_REF_DRIFT');
  });

  test('rejects caller-supplied promotion or reviewer-trust authority', () => {
    expect(() =>
      runRelationshipSpouseT8DayBranchPalaceShadowStagingExecution(
        baseSnapshot(),
        {
          promotionAuthorityContext: null,
        } as unknown as RelationshipSpouseT8DayBranchPalaceShadowStagingRunOptions,
      ),
    ).toThrow(/callers may not inject promotion or reviewer-trust authority/u);

    expect(() =>
      runRelationshipSpouseT8DayBranchPalaceShadowStagingExecution(
        baseSnapshot(),
        {
          reviewerTrustContext: null,
        } as unknown as RelationshipSpouseT8DayBranchPalaceShadowStagingRunOptions,
      ),
    ).toThrow(/callers may not inject promotion or reviewer-trust authority/u);
  });

  test('completes SA-5I without activating narrative, Preview, Official Reading, or Production', () => {
    const evidence =
      buildRelationshipSpouseT8DayBranchPalaceIsolatedShadowStagingExecutionReview();

    expect(evidence.blockers).toEqual([]);
    expect(evidence.isolatedShadowStagingExecutionComplete).toBe(true);
    expect(evidence.authorityBoundary).toEqual({
      sourceAdjudicationAuthorityEstablished: true,
      stagingExecutionAuthorityValid: true,
      isolatedShadowStagingExecutionComplete: true,
      humanDomainReviewEstablished: false,
      reviewAttestationCreated: false,
      reviewerTrustGrantEstablished: false,
      reviewerStatusPromotionAuthorized: false,
      provenanceQualityPromotionAuthorized: false,
      narrativeConsumerActivated: false,
      previewAuthorityAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      productionAuthorityAuthorized: false,
      production: 'HOLD',
    });
    expect(evidence.nextDisposition).toBe(
      'READY_FOR_SEPARATE_CONSUMER_ADMISSION_REVIEW',
    );
  });

  test('is deterministic for the same exact SA-5I surface', () => {
    const left =
      buildRelationshipSpouseT8DayBranchPalaceIsolatedShadowStagingExecutionReview();
    const right =
      buildRelationshipSpouseT8DayBranchPalaceIsolatedShadowStagingExecutionReview();

    expect(left.evidenceId).toMatch(/^[a-f0-9]{64}$/u);
    expect(left.evidenceId).toBe(right.evidenceId);
    expect(left.executionAuthorityRef).toEqual(right.executionAuthorityRef);
    expect(left.resolvedBranchCases).toEqual(right.resolvedBranchCases);
    expect(left.failClosedCases).toEqual(right.failClosedCases);
    expect(left.sexInvariantCases).toEqual(right.sexInvariantCases);
  });
});
