import { describe, expect, test } from 'vitest';
import type { CalculationPolicySnapshot } from '../src/contracts/calculation.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import {
  buildClaimNarrativePlan,
  renderClaimNarrativeProfileSections,
} from '../src/narrative/claim-narrative-profile.js';
import { buildValidatedDeterministicFallback } from '../src/narrative/deterministic-fallback.js';
import { buildGovernedReadingEvidenceBundle } from '../src/narrative/evidence-selector.js';
import {
  RELATIONSHIP_NATAL_CLAIM_NARRATIVE_PROFILES,
} from '../src/research/relationship-natal-narrative-profiles.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
} from '../src/research/relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_NARRATIVE_PROFILE_VERSION,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_CLAIM_NARRATIVE_PROFILE,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
  buildRelationshipSpouseT8DayBranchPalaceClaimNarrativeProfileMaterialization,
} from '../src/research/relationship-spouse-t8-day-branch-palace-claim-narrative-profile-materialization.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY,
  runRelationshipSpouseT8DayBranchPalaceNarrativeMaterializedShadowExecution,
} from '../src/research/relationship-spouse-t8-day-branch-palace-project-governed-narrative-materialization.js';

const TEST_TIMEOUT_MS = 20_000;

const CALCULATION_POLICY = Object.freeze({
  policyId:
    'myeonghwa/relationship-spouse-t8-day-branch-palace-sa5n-profile-test',
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
  unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
} as const satisfies CalculationPolicySnapshot);

function fixtureSnapshot() {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1992, month: 10, day: 24 },
      time: { known: true, hour: 5, minute: 30 },
      sexForTraditionalCalculation: 'unspecified',
    },
    CALCULATION_POLICY,
    { now: new Date('2026-10-02T10:05:00.000Z') },
  );
}

async function fixtureEvidence() {
  const snapshot = fixtureSnapshot();
  const execution =
    await runRelationshipSpouseT8DayBranchPalaceNarrativeMaterializedShadowExecution(
      snapshot,
      {
        requestId: 'sa5n-shadow',
        now: new Date('2026-10-02T10:06:00.000Z'),
      },
    );

  expect(execution.integrity).toEqual({ valid: true, errors: [] });

  const claim = execution.claims.find(
    (candidate) =>
      candidate.claimType ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
  );
  if (claim === undefined) {
    throw new Error('Expected spouse-palace position claim.');
  }

  const evidence = buildGovernedReadingEvidenceBundle(
    snapshot,
    execution,
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY,
    {
      requestId: 'sa5n-evidence',
      purpose: 'section_reading',
      targetClaimIds: [claim.claimId],
    },
  );

  return { snapshot, execution, claim, evidence: evidence.bundle };
}

describe('Relationship / Spouse T8 Day-Branch spouse-palace SA-5N ClaimNarrativeProfile materialization', () => {
  test('materializes the exact position-only profile from established SA-5M', async () => {
    const result =
      await buildRelationshipSpouseT8DayBranchPalaceClaimNarrativeProfileMaterialization();

    expect(result.blockers).toEqual([]);
    expect(result.claimNarrativeProfileMaterialized).toBe(true);
    expect(result.semanticScope).toBe('position_only');
    expect(result.profileRef).toEqual({
      id: 'PROFILE-RELATIONSHIP-SPOUSE-T8-DAY-BRANCH-PALACE-POSITION-ONLY',
      version: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_NARRATIVE_PROFILE_VERSION,
    });
    expect(result.nextDisposition).toBe(
      'RUN_SA_5O_POSITION_ONLY_NARRATIVE_CONSUMER_INTEGRATION',
    );
  }, TEST_TIMEOUT_MS);

  test('uses interpretation-only, method-attributed deterministic copy', () => {
    const profile =
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_CLAIM_NARRATIVE_PROFILE;

    expect(profile.claimType).toBe(
      'relationship.spouse.traditional_spouse_palace_position',
    );
    expect(profile.allowedEpistemicTypes).toEqual(['interpretation']);
    expect(profile.requiredMethodAttribution).toBe(true);
    expect(profile.renderingHints).toEqual(['axis:core', 'order:5']);
    expect(profile.templates).toEqual([
      {
        templateKey: 'headline',
        language: 'ko',
        text: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE,
      },
      {
        templateKey: 'summary',
        language: 'ko',
        text: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
      },
    ]);
    expect(profile.mandatoryQualifier).toBe(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
    );
  });

  test('keeps renderable copy inside the position-only boundary', () => {
    const renderable = [
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE,
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
    ].join('\n');

    expect(RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE).toBe(
      '배우자궁의 전통적 위치',
    );
    expect(RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY).toBe(
      '전통 명리에서는 일지(日支)를 배우자궁의 위치로 봅니다.',
    );
    expect(RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER).toBe(
      '이는 배우자궁의 위치에 대한 전통적 분류이며, 배우자의 성격이나 정체, 결혼 시기 또는 관계 결과를 의미하지 않습니다.',
    );

    for (const phrase of RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES) {
      expect(renderable).not.toContain(phrase);
    }
  });

  test('renders the actual SA-5M shadow claim with exact semantics and evidence', async () => {
    const { claim, evidence } = await fixtureEvidence();

    expect(claim).toMatchObject({
      taxonomy: {
        tier: 'T8',
        category: 'relationship',
        subcategory: 'spouse',
      },
      claimType: 'relationship.spouse.traditional_spouse_palace_position',
      subject: 'native_chart',
      predicate: 'traditional_spouse_palace_position',
      value: {
        position: 'day_branch',
        traditionalRole: 'spouse_palace',
        semanticScope: 'position_only',
      },
      polarity: 'neutral',
      factRefs: ['pillars.day'],
    });

    const plan = buildClaimNarrativePlan(evidence, [
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_CLAIM_NARRATIVE_PROFILE,
    ]);

    expect(plan.items).toHaveLength(1);
    expect(plan.items[0]).toEqual({
      claimType:
        'relationship.spouse.traditional_spouse_palace_position',
      profileRef: {
        id: 'PROFILE-RELATIONSHIP-SPOUSE-T8-DAY-BRANCH-PALACE-POSITION-ONLY',
        version:
          RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_NARRATIVE_PROFILE_VERSION,
      },
      axis: 'core',
      order: 5,
      language: 'ko',
      sectionTitle:
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE,
      assertionText:
        `${RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY} ${RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER}`,
      epistemicType: 'interpretation',
      requiredMethodAttribution: true,
    });

    const sections = renderClaimNarrativeProfileSections(evidence, [
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_CLAIM_NARRATIVE_PROFILE,
    ]);
    expect(sections).toHaveLength(1);
    expect(sections[0]?.title).toBe(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE,
    );
    expect(sections[0]?.blocks).toEqual([
      {
        type: 'assertion',
        text: `${RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY} ${RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER}`,
        epistemicType: 'interpretation',
        evidenceRefs: [{ sourceType: 'claim', ref: claim.claimId }],
        methodologyRefs: [claim.methodologyRef],
      },
    ]);
  }, TEST_TIMEOUT_MS);

  test('passes deterministic fallback grounding without adding residual unsupported prose', async () => {
    const { evidence } = await fixtureEvidence();

    const fallback = buildValidatedDeterministicFallback(evidence, [
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_CLAIM_NARRATIVE_PROFILE,
    ]);

    expect(fallback.validation.valid).toBe(true);
    expect(fallback.validation.violations).toEqual([]);
    expect(fallback.draft.sections).toHaveLength(1);
    expect(fallback.draft.sections[0]?.title).toBe(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE,
    );

    const encoded = JSON.stringify(fallback.draft);
    expect(encoded).toContain(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
    );
    expect(encoded).toContain(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
    );
  }, TEST_TIMEOUT_MS);

  test('does not register the SA-5N profile into the existing relationship natal product profile set yet', () => {
    expect(
      RELATIONSHIP_NATAL_CLAIM_NARRATIVE_PROFILES.some(
        (profile) =>
          profile.claimType ===
          RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
      ),
    ).toBe(false);
  });

  test('keeps runtime, delivery, Preview, Official, public semantic, and Production authority closed', async () => {
    const result =
      await buildRelationshipSpouseT8DayBranchPalaceClaimNarrativeProfileMaterialization();

    expect(result.authorityBoundary).toEqual({
      projectGovernedNarrativeMaterializationEstablished: true,
      claimNarrativeProfileCreated: true,
      narrativeProfileAuthorityEstablished: true,
      isolatedDeterministicProfileRenderingAuthorized: true,
      productNarrativeRuntimeIntegrationAuthorized: false,
      narrativeGenerationAuthorized: false,
      artifactAssemblyAuthorized: false,
      deliveryAuthorityAuthorized: false,
      previewAuthorityAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      publicSemanticAuthorityAuthorized: false,
      productionAuthorityAuthorized: false,
      externalHumanDomainReviewRequired: false,
      reviewAttestationRequired: false,
      reviewerTrustContextRequired: false,
      reviewerTrustGrantRequired: false,
      production: 'HOLD',
    });
  }, TEST_TIMEOUT_MS);

  test('is deterministic for the same SA-5M state and profile definition', async () => {
    const first =
      await buildRelationshipSpouseT8DayBranchPalaceClaimNarrativeProfileMaterialization();
    const second =
      await buildRelationshipSpouseT8DayBranchPalaceClaimNarrativeProfileMaterialization();

    expect(first).toEqual(second);
    expect(first.materializationId).toBe(second.materializationId);
    expect(first.materializationId).toMatch(/^[a-f0-9]{64}$/u);
    expect(first.profileHash).toMatch(/^[a-f0-9]{64}$/u);
    expect(first.checks).toEqual({
      upstreamMaterializationExact: true,
      profileContractExact: true,
      copyBoundaryExact: true,
      prohibitedPhraseFree: true,
      prohibitedExtensionsFrozen: true,
    });
  }, TEST_TIMEOUT_MS);
});
