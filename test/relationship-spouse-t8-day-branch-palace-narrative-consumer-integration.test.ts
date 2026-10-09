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
  RELATIONSHIP_NATAL_READING_RULES,
} from '../src/research/relationship-natal-reading-candidate.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
} from '../src/research/relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_CLAIM_NARRATIVE_PROFILE,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
} from '../src/research/relationship-spouse-t8-day-branch-palace-claim-narrative-profile-materialization.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceNarrativeConsumerIntegration,
} from '../src/research/relationship-spouse-t8-day-branch-palace-narrative-consumer-integration.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY,
  runRelationshipSpouseT8DayBranchPalaceNarrativeMaterializedShadowExecution,
} from '../src/research/relationship-spouse-t8-day-branch-palace-project-governed-narrative-materialization.js';

const TEST_TIMEOUT_MS = 20_000;

const CALCULATION_POLICY = Object.freeze({
  policyId:
    'myeonghwa/relationship-spouse-t8-day-branch-palace-sa5o-consumer-test',
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
    { now: new Date('2026-10-02T12:20:00.000Z') },
  );
}

async function fixtureEvidence() {
  const snapshot = fixtureSnapshot();
  const execution =
    await runRelationshipSpouseT8DayBranchPalaceNarrativeMaterializedShadowExecution(
      snapshot,
      {
        requestId: 'sa5o-shadow',
        now: new Date('2026-10-02T12:21:00.000Z'),
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
      requestId: 'sa5o-evidence',
      purpose: 'section_reading',
      targetClaimIds: [claim.claimId],
    },
  );

  return { claim, evidence: evidence.bundle };
}

describe('Relationship / Spouse T8 Day-Branch spouse-palace SA-5O narrative consumer integration', () => {
  test('registers the position-only profile exactly once while preserving legacy Relationship natal profiles', async () => {
    const integration =
      await buildRelationshipSpouseT8DayBranchPalaceNarrativeConsumerIntegration();

    expect(integration.blockers).toEqual([]);
    expect(integration.narrativeConsumerIntegrationEstablished).toBe(true);
    expect(integration.checks).toEqual({
      upstreamProfileExact: true,
      consumerRegistrationExact: true,
      legacyProfilesPreserved: true,
      positionOnlyProfileBoundaryExact: true,
      noConsumerDuplicateClaimType: true,
    });

    const matching =
      RELATIONSHIP_NATAL_CLAIM_NARRATIVE_PROFILES.filter(
        (profile) =>
          profile.claimType ===
          RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
      );
    expect(matching).toEqual([
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_CLAIM_NARRATIVE_PROFILE,
    ]);
    expect(RELATIONSHIP_NATAL_CLAIM_NARRATIVE_PROFILES).toHaveLength(
      RELATIONSHIP_NATAL_READING_RULES.length + 1,
    );
  }, TEST_TIMEOUT_MS);

  test('selects and renders the actual SA-5M claim through the real Relationship natal consumer collection', async () => {
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

    const plan = buildClaimNarrativePlan(
      evidence,
      RELATIONSHIP_NATAL_CLAIM_NARRATIVE_PROFILES,
    );
    expect(plan.items).toHaveLength(1);
    expect(plan.items[0]).toMatchObject({
      claimType:
        'relationship.spouse.traditional_spouse_palace_position',
      profileRef: {
        id: 'PROFILE-RELATIONSHIP-SPOUSE-T8-DAY-BRANCH-PALACE-POSITION-ONLY',
        version: '1.0.0-research',
      },
      axis: 'core',
      order: 5,
      sectionTitle:
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE,
      assertionText:
        `${RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY} ${RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER}`,
      epistemicType: 'interpretation',
      requiredMethodAttribution: true,
    });

    const sections = renderClaimNarrativeProfileSections(
      evidence,
      RELATIONSHIP_NATAL_CLAIM_NARRATIVE_PROFILES,
    );
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

  test('keeps deterministic fallback fully grounded without unsupported residual prose', async () => {
    const { evidence } = await fixtureEvidence();

    const fallback = buildValidatedDeterministicFallback(
      evidence,
      RELATIONSHIP_NATAL_CLAIM_NARRATIVE_PROFILES,
    );

    expect(fallback.validation.valid).toBe(true);
    expect(fallback.validation.violations).toEqual([]);
    expect(fallback.draft.sections).toHaveLength(1);

    const encoded = JSON.stringify(fallback.draft);
    expect(encoded).toContain(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE,
    );
    expect(encoded).toContain(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
    );
    expect(encoded).toContain(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
    );
    expect(encoded).not.toContain('deterministic-evidence-summary');

    for (const phrase of RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES) {
      expect(encoded).not.toContain(phrase);
    }
  }, TEST_TIMEOUT_MS);

  test('opens consumer selection only and keeps downstream authority closed', async () => {
    const integration =
      await buildRelationshipSpouseT8DayBranchPalaceNarrativeConsumerIntegration();

    expect(integration.authorityBoundary).toEqual({
      claimNarrativeProfileCreated: true,
      narrativeProfileAuthorityEstablished: true,
      narrativeConsumerIntegrationEstablished: true,
      positionOnlyProfileConsumerSelectable: true,
      governedDeterministicRenderingThroughConsumer: true,
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
    expect(integration.nextDisposition).toBe(
      'RUN_SA_5P_POSITION_ONLY_PRODUCT_NARRATIVE_RUNTIME_AUTHORITY_REVIEW',
    );
  }, TEST_TIMEOUT_MS);
});
