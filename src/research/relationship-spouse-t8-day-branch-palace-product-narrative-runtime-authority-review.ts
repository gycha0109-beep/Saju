import type { CalculationPolicySnapshot } from '../contracts/calculation.js';
import type { NarrativePolicy } from '../contracts/narrative.js';
import { calculateCanonicalSajuSnapshot } from '../calculation/calculation-engine.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  CompiledNarrativePrompt,
  NarrativeModelAdapter,
} from '../llm/model-adapter.js';
import { SUPPORTED_NARRATIVE_OUTPUT_SCHEMA } from '../llm/prompt-compiler.js';
import {
  executeProductReading,
  LEGACY_NARRATIVE_RUNTIME_VERSION,
} from '../reading/governed-reading-execution.js';
import { buildProductReadingDelivery } from '../reading/product-reading-delivery.js';
import {
  RELATIONSHIP_NATAL_CLAIM_NARRATIVE_PROFILES,
} from './relationship-natal-narrative-profiles.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
} from './relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
} from './relationship-spouse-t8-day-branch-palace-claim-narrative-profile-materialization.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceNarrativeConsumerIntegration,
} from './relationship-spouse-t8-day-branch-palace-narrative-consumer-integration.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY,
  runRelationshipSpouseT8DayBranchPalaceNarrativeMaterializedShadowExecution,
} from './relationship-spouse-t8-day-branch-palace-project-governed-narrative-materialization.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PRODUCT_NARRATIVE_RUNTIME_AUTHORITY_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-product-narrative-runtime-authority-review-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROFILE_BYPASS_TEXT =
  '배우자의 성격은 강합니다.' as const;

const CALCULATION_POLICY = Object.freeze({
  policyId:
    'myeonghwa/relationship-spouse-t8-day-branch-palace-sa5p-runtime-review',
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

const NARRATIVE_POLICY = Object.freeze({
  policyId:
    'myeonghwa/relationship-spouse-t8-day-branch-palace-sa5p-runtime-review',
  version: '1.0.0',
  language: 'ko',
  certaintyPolicy: {
    deterministicFacts: 'direct',
    interpretationClaims: 'method_attributed',
    contestedClaims: 'explicit_difference',
    ambiguousFacts: 'explicit_uncertainty',
    futureClaims: 'non_deterministic',
  },
  tone: {
    style: 'clear',
    avoidFatalism: true,
    avoidFearInduction: true,
  },
  sensitiveDomains: {
    health: 'non_diagnostic',
    finance: 'non_advisory',
    legal: 'non_advisory',
    safety: 'no_harmful_direction',
  },
  sourceDisclosure: 'internal_only',
} as const satisfies NarrativePolicy);

class ProviderFailureAdapter implements NarrativeModelAdapter {
  readonly metadata = Object.freeze({
    provider: 'sa5p-review',
    modelId: 'forced-provider-failure',
  });

  async generateStructured(): Promise<unknown> {
    throw new Error('SA-5P forced provider failure');
  }
}

class ProfileBypassAdapter implements NarrativeModelAdapter {
  readonly metadata = Object.freeze({
    provider: 'sa5p-review',
    modelId: 'profile-bypass-probe',
  });

  async generateStructured(prompt: CompiledNarrativePrompt): Promise<unknown> {
    const claim = prompt.evidence.claims.find(
      (candidate) =>
        candidate.claimType ===
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
    );
    if (claim === undefined) {
      throw new Error('SA-5P profile bypass probe requires the spouse-palace claim.');
    }

    return {
      schemaVersion: prompt.outputSchemaVersion,
      requestId: prompt.requestId,
      sections: [
        {
          sectionId: 'sa5p-profile-bypass-probe',
          title: '배우자 특징',
          blocks: [
            {
              type: 'assertion',
              text: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROFILE_BYPASS_TEXT,
              epistemicType: 'interpretation',
              evidenceRefs: [{ sourceType: 'claim', ref: claim.claimId }],
              methodologyRefs: [claim.methodologyRef],
            },
          ],
        },
      ],
    };
  }
}

function fixtureSnapshot() {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1992, month: 10, day: 24 },
      time: { known: true, hour: 5, minute: 30 },
      sexForTraditionalCalculation: 'unspecified',
    },
    CALCULATION_POLICY,
    { now: new Date('2026-10-02T12:50:00.000Z') },
  );
}

function executionOptions(requestSuffix: string) {
  return {
    outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
    readingVersion:
      'relationship-spouse-t8-day-branch-palace-sa5p-runtime-review',
    claimNarrativeProfiles: RELATIONSHIP_NATAL_CLAIM_NARRATIVE_PROFILES,
    narrativeNow: new Date('2026-10-02T12:52:00.000Z'),
    artifactGeneratedAt: new Date('2026-10-02T12:53:00.000Z'),
    displayLabel: `SA-5P ${requestSuffix}`,
  } as const;
}

function runtime(adapter: NarrativeModelAdapter) {
  return {
    runtimeVersion: LEGACY_NARRATIVE_RUNTIME_VERSION,
    adapter,
    narrativePolicy: NARRATIVE_POLICY,
  } as const;
}

export async function buildRelationshipSpouseT8DayBranchPalaceProductNarrativeRuntimeAuthorityReview() {
  const upstream =
    await buildRelationshipSpouseT8DayBranchPalaceNarrativeConsumerIntegration();
  const snapshot = fixtureSnapshot();
  const interpretation =
    await runRelationshipSpouseT8DayBranchPalaceNarrativeMaterializedShadowExecution(
      snapshot,
      {
        requestId: 'sa5p-runtime-review-shadow',
        now: new Date('2026-10-02T12:51:00.000Z'),
      },
    );

  const claim = interpretation.claims.find(
    (candidate) =>
      candidate.claimType ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
  );

  const fallbackExecution = await executeProductReading(
    snapshot,
    interpretation,
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY,
    {
      requestId: 'sa5p-runtime-review-fallback',
      text: '배우자운',
    },
    executionOptions('fallback'),
    runtime(new ProviderFailureAdapter()),
  );

  const profileBypassExecution = await executeProductReading(
    snapshot,
    interpretation,
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY,
    {
      requestId: 'sa5p-runtime-review-profile-bypass',
      text: '배우자운',
    },
    executionOptions('profile-bypass'),
    runtime(new ProfileBypassAdapter()),
  );

  const fallbackDelivery = buildProductReadingDelivery(fallbackExecution);
  const profileBypassDelivery = buildProductReadingDelivery(
    profileBypassExecution,
  );
  const fallbackEncoded = JSON.stringify(fallbackExecution.narrative?.draft ?? {});
  const bypassEncoded = JSON.stringify(
    profileBypassExecution.narrative?.draft ?? {},
  );
  const bypassDeliveryEncoded = JSON.stringify(profileBypassDelivery);

  const upstreamConsumerIntegrationExact =
    upstream.narrativeConsumerIntegrationEstablished === true &&
    upstream.semanticScope === 'position_only' &&
    upstream.authorityBoundary.positionOnlyProfileConsumerSelectable === true &&
    upstream.authorityBoundary.governedDeterministicRenderingThroughConsumer ===
      true &&
    upstream.authorityBoundary.narrativeGenerationAuthorized === false &&
    upstream.nextDisposition ===
      'RUN_SA_5P_POSITION_ONLY_PRODUCT_NARRATIVE_RUNTIME_AUTHORITY_REVIEW' &&
    upstream.blockers.length === 0;

  const claimValue = claim?.value as
    | {
        position?: unknown;
        traditionalRole?: unknown;
        semanticScope?: unknown;
      }
    | undefined;

  const actualClaimExact =
    interpretation.integrity.valid === true &&
    claim !== undefined &&
    claim.taxonomy.tier === 'T8' &&
    claim.taxonomy.category === 'relationship' &&
    claim.taxonomy.subcategory === 'spouse' &&
    claimValue?.position === 'day_branch' &&
    claimValue.traditionalRole === 'spouse_palace' &&
    claimValue.semanticScope === 'position_only' &&
    claim.factRefs.length === 1 &&
    claim.factRefs[0] === 'pillars.day';

  const fallbackUsesBoundedProfile =
    fallbackExecution.state === 'completed_with_fallback' &&
    fallbackExecution.consumerReadingAuthority?.authority ===
      'legacy_narrative' &&
    fallbackExecution.consumerReadingAuthority.readingSection ===
      'relationship:natal:spouse' &&
    fallbackExecution.modelCalls === 1 &&
    fallbackExecution.narrative?.outcome === 'deterministic_fallback' &&
    fallbackExecution.narrative.run.validation.final === 'fallback' &&
    fallbackExecution.artifact?.status === 'narrative_fallback' &&
    fallbackEncoded.includes(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
    ) &&
    fallbackEncoded.includes(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
    ) &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES.every(
      (phrase) => !fallbackEncoded.includes(phrase),
    );

  const successfulModelPathBypassesProfileSemanticBoundary =
    profileBypassExecution.state === 'completed' &&
    profileBypassExecution.consumerReadingAuthority?.authority ===
      'legacy_narrative' &&
    profileBypassExecution.consumerReadingAuthority.readingSection ===
      'relationship:natal:spouse' &&
    profileBypassExecution.modelCalls === 1 &&
    profileBypassExecution.narrative?.outcome === 'model_first_pass' &&
    profileBypassExecution.narrative.run.validation.firstPass === 'passed' &&
    profileBypassExecution.narrative.run.validation.final === 'passed' &&
    profileBypassExecution.artifact !== undefined &&
    bypassEncoded.includes(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROFILE_BYPASS_TEXT,
    ) &&
    !bypassEncoded.includes(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
    );

  const profileBypassWouldReachConsumerDelivery =
    profileBypassDelivery.state === 'delivered' &&
    profileBypassDelivery.messageCode === 'READING_DELIVERED' &&
    profileBypassDelivery.requiredAction === 'none' &&
    profileBypassDelivery.artifact?.readingId ===
      profileBypassExecution.artifact?.readingId &&
    bypassDeliveryEncoded.includes(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROFILE_BYPASS_TEXT,
    ) &&
    !bypassDeliveryEncoded.includes(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
    );

  const officialAuthorityStillClosed =
    fallbackExecution.consumerReadingAuthority?.authority ===
      'legacy_narrative' &&
    fallbackExecution.consumerReadingAuthority.supportedOfficialReadingSection ===
      undefined &&
    profileBypassExecution.consumerReadingAuthority?.authority ===
      'legacy_narrative' &&
    profileBypassExecution.consumerReadingAuthority
      .supportedOfficialReadingSection === undefined &&
    fallbackExecution.canonicalSemantics === undefined &&
    fallbackExecution.officialReadingPlan === undefined &&
    fallbackExecution.officialReadingReport === undefined &&
    profileBypassExecution.canonicalSemantics === undefined &&
    profileBypassExecution.officialReadingPlan === undefined &&
    profileBypassExecution.officialReadingReport === undefined;

  const checks = Object.freeze({
    upstreamConsumerIntegrationExact,
    actualClaimExact,
    fallbackUsesBoundedProfile,
    successfulModelPathBypassesProfileSemanticBoundary,
    profileBypassWouldReachConsumerDelivery,
    officialAuthorityStillClosed,
  });

  const reviewBlockers = Object.freeze(
    Object.entries(checks)
      .filter(([, value]) => value !== true)
      .map(
        ([key]) =>
          `SA5P_${key
            .replace(/[A-Z]/gu, (match) => `_${match}`)
            .toUpperCase()}_FAILED`,
      )
      .sort(),
  );

  const authorityReviewCompleted = reviewBlockers.length === 0;
  const runtimeSemanticProfileEnforcementEstablished = false as const;

  const authorizationBlockers = Object.freeze(
    authorityReviewCompleted
      ? [
          'MODEL_SUCCESS_PATH_DOES_NOT_ENFORCE_CLAIM_NARRATIVE_PROFILE',
          'MANDATORY_QUALIFIER_NOT_ENFORCED_ON_MODEL_SUCCESS',
          'PROHIBITED_PHRASES_NOT_ENFORCED_ON_MODEL_SUCCESS',
          'SEMANTICALLY_UNBOUNDED_MODEL_OUTPUT_CAN_REACH_CONSUMER_DELIVERY',
        ]
      : ['SA5P_REVIEW_INCOMPLETE'],
  );

  const material = Object.freeze({
    reviewVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PRODUCT_NARRATIVE_RUNTIME_AUTHORITY_REVIEW_VERSION,
    issue: '#1992' as const,
    track: 'saju-bridge' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    semanticFamily:
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' as const,
    semanticVersion: '2.0.0' as const,
    semanticScope: 'position_only' as const,
    upstreamIntegrationId: upstream.integrationId,
    fallbackExecutionId: fallbackExecution.executionId,
    fallbackDeliveryId: fallbackDelivery.deliveryId,
    profileBypassExecutionId: profileBypassExecution.executionId,
    profileBypassDeliveryId: profileBypassDelivery.deliveryId,
    checks,
    reviewBlockers,
    authorizationBlockers,
    authorityReviewCompleted,
    runtimeSemanticProfileEnforcementEstablished,
    decision: authorityReviewCompleted
      ? ('HOLD_PRODUCT_NARRATIVE_RUNTIME_AUTHORITY_PENDING_PROFILE_ENFORCEMENT' as const)
      : ('HOLD_AND_REPAIR_SA_5P_PRODUCT_NARRATIVE_RUNTIME_AUTHORITY_REVIEW' as const),
    authorityBoundary: Object.freeze({
      narrativeConsumerIntegrationEstablished:
        upstreamConsumerIntegrationExact,
      positionOnlyProfileConsumerSelectable:
        upstreamConsumerIntegrationExact,
      deterministicFallbackProfileRenderingVerified:
        fallbackUsesBoundedProfile,
      modelSuccessProfileSemanticEnforcementVerified: false as const,
      productNarrativeRuntimeIntegrationAuthorized: false as const,
      narrativeGenerationAuthorized: false as const,
      artifactAssemblyAuthorized: false as const,
      deliveryAuthorityAuthorized: false as const,
      previewAuthorityAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      publicSemanticAuthorityAuthorized: false as const,
      productionAuthorityAuthorized: false as const,
      externalHumanDomainReviewRequired: false as const,
      reviewAttestationRequired: false as const,
      reviewerTrustContextRequired: false as const,
      reviewerTrustGrantRequired: false as const,
      production: 'HOLD' as const,
    }),
    nextDisposition: authorityReviewCompleted
      ? ('RUN_SA_5Q_CLAIM_NARRATIVE_PROFILE_MODEL_OUTPUT_ENFORCEMENT_REMEDIATION' as const)
      : ('HOLD_AND_REPAIR_SA_5P_PRODUCT_NARRATIVE_RUNTIME_AUTHORITY_REVIEW' as const),
  });

  return Object.freeze({
    reviewId: deterministicContentHash(material),
    ...material,
    fallbackExecution,
    fallbackDelivery,
    profileBypassExecution,
    profileBypassDelivery,
  });
}
