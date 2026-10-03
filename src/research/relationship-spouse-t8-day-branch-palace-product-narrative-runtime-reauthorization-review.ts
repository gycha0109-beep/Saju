import type { CalculationPolicySnapshot } from '../contracts/calculation.js';
import type { NarrativePolicy } from '../contracts/narrative.js';
import { calculateCanonicalSajuSnapshot } from '../calculation/calculation-engine.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  CompiledNarrativePrompt,
  NarrativeModelAdapter,
} from '../llm/model-adapter.js';
import { SUPPORTED_NARRATIVE_OUTPUT_SCHEMA } from '../llm/prompt-compiler.js';
import { buildDeterministicFallbackDraft } from '../narrative/deterministic-fallback.js';
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
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
} from './relationship-spouse-t8-day-branch-palace-claim-narrative-profile-materialization.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceProfileModelOutputEnforcementRemediation,
} from './relationship-spouse-t8-day-branch-palace-claim-narrative-profile-model-output-enforcement-remediation.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY,
  runRelationshipSpouseT8DayBranchPalaceNarrativeMaterializedShadowExecution,
} from './relationship-spouse-t8-day-branch-palace-project-governed-narrative-materialization.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PRODUCT_NARRATIVE_RUNTIME_REAUTHORIZATION_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-product-narrative-runtime-reauthorization-review-v1' as const;

const CALCULATION_POLICY = Object.freeze({
  policyId:
    'myeonghwa/relationship-spouse-t8-day-branch-palace-sa5r-runtime-reauthorization',
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
    'myeonghwa/relationship-spouse-t8-day-branch-palace-sa5r-runtime-reauthorization',
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

class ExactProfileModelAdapter implements NarrativeModelAdapter {
  readonly metadata = Object.freeze({
    provider: 'sa5r-review',
    modelId: 'exact-profile-model-success',
  });

  async generateStructured(prompt: CompiledNarrativePrompt): Promise<unknown> {
    return buildDeterministicFallbackDraft(
      prompt.evidence,
      RELATIONSHIP_NATAL_CLAIM_NARRATIVE_PROFILES,
    );
  }
}

class ProviderFailureAdapter implements NarrativeModelAdapter {
  readonly metadata = Object.freeze({
    provider: 'sa5r-review',
    modelId: 'forced-provider-failure',
  });

  async generateStructured(): Promise<unknown> {
    throw new Error('SA-5R forced provider failure');
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
    { now: new Date('2026-10-03T01:45:00.000Z') },
  );
}

function runtime(adapter: NarrativeModelAdapter) {
  return {
    runtimeVersion: LEGACY_NARRATIVE_RUNTIME_VERSION,
    adapter,
    narrativePolicy: NARRATIVE_POLICY,
  } as const;
}

function executionOptions(suffix: string) {
  return {
    outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
    readingVersion:
      'relationship-spouse-t8-day-branch-palace-sa5r-runtime-reauthorization',
    claimNarrativeProfiles: RELATIONSHIP_NATAL_CLAIM_NARRATIVE_PROFILES,
    narrativeNow: new Date('2026-10-03T01:47:00.000Z'),
    artifactGeneratedAt: new Date('2026-10-03T01:48:00.000Z'),
    displayLabel: `SA-5R ${suffix}`,
  } as const;
}

function encodedContainsOnlyBoundedSpousePalaceMeaning(encoded: string): boolean {
  return (
    encoded.includes(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
    ) &&
    encoded.includes(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
    ) &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES.every(
      (phrase) => !encoded.includes(phrase),
    )
  );
}

export async function buildRelationshipSpouseT8DayBranchPalaceProductNarrativeRuntimeReauthorizationReview() {
  const upstream =
    await buildRelationshipSpouseT8DayBranchPalaceProfileModelOutputEnforcementRemediation();
  const snapshot = fixtureSnapshot();
  const interpretation =
    await runRelationshipSpouseT8DayBranchPalaceNarrativeMaterializedShadowExecution(
      snapshot,
      {
        requestId: 'sa5r-runtime-reauthorization-shadow',
        now: new Date('2026-10-03T01:46:00.000Z'),
      },
    );

  const claim = interpretation.claims.find(
    (candidate) =>
      candidate.claimType ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
  );

  const compliantExecution = await executeProductReading(
    snapshot,
    interpretation,
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY,
    {
      requestId: 'sa5r-runtime-reauthorization-compliant',
      text: '배우자운',
    },
    executionOptions('compliant'),
    runtime(new ExactProfileModelAdapter()),
  );
  const compliantDelivery = buildProductReadingDelivery(compliantExecution);

  const fallbackExecution = await executeProductReading(
    snapshot,
    interpretation,
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY,
    {
      requestId: 'sa5r-runtime-reauthorization-fallback',
      text: '배우자운',
    },
    executionOptions('fallback'),
    runtime(new ProviderFailureAdapter()),
  );
  const fallbackDelivery = buildProductReadingDelivery(fallbackExecution);

  const compliantDraftEncoded = JSON.stringify(
    compliantExecution.narrative?.draft ?? {},
  );
  const compliantArtifactEncoded = JSON.stringify(
    compliantExecution.artifact ?? {},
  );
  const compliantDeliveryEncoded = JSON.stringify(compliantDelivery);
  const fallbackDraftEncoded = JSON.stringify(
    fallbackExecution.narrative?.draft ?? {},
  );
  const fallbackArtifactEncoded = JSON.stringify(
    fallbackExecution.artifact ?? {},
  );
  const fallbackDeliveryEncoded = JSON.stringify(fallbackDelivery);

  const upstreamRemediationExact =
    upstream.modelOutputProfileEnforcementEstablished === true &&
    upstream.decision === 'PROFILE_MODEL_OUTPUT_ENFORCEMENT_REMEDIATED' &&
    upstream.nextDisposition ===
      'RUN_SA_5R_POSITION_ONLY_PRODUCT_NARRATIVE_RUNTIME_REAUTHORIZATION_REVIEW' &&
    upstream.blockers.length === 0 &&
    upstream.authorityBoundary.invalidModelOutputMayReachArtifact === false &&
    upstream.authorityBoundary.invalidModelOutputMayReachDelivery === false &&
    upstream.authorityBoundary.previewAuthorityAuthorized === false &&
    upstream.authorityBoundary.officialReadingAuthorityAuthorized === false &&
    upstream.authorityBoundary.productionAuthorityAuthorized === false;

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

  const compliantModelRuntimeExact =
    compliantExecution.state === 'completed' &&
    compliantExecution.modelCalls === 1 &&
    compliantExecution.narrative?.outcome === 'model_first_pass' &&
    compliantExecution.narrative.run.validation.firstPass === 'passed' &&
    compliantExecution.narrative.run.validation.repairAttempted === false &&
    compliantExecution.narrative.run.validation.final === 'passed' &&
    compliantExecution.narrative.run.validation.violations.length === 0 &&
    snapshot.completeness.birthTimeKnown === true &&
    snapshot.completeness.fullyResolved === false &&
    snapshot.completeness.ambiguousPaths.length === 0 &&
    snapshot.completeness.unavailablePaths.length === 1 &&
    snapshot.completeness.unavailablePaths[0] === 'luckCycle' &&
    compliantExecution.artifact?.status === 'ready_with_ambiguity' &&
    compliantExecution.consumerReadingAuthority?.readingSection ===
      'relationship:natal:spouse' &&
    compliantExecution.consumerReadingAuthority.authority ===
      'legacy_narrative' &&
    compliantExecution.consumerReadingAuthority.supportedOfficialReadingSection ===
      undefined &&
    encodedContainsOnlyBoundedSpousePalaceMeaning(compliantDraftEncoded) &&
    encodedContainsOnlyBoundedSpousePalaceMeaning(compliantArtifactEncoded);

  const compliantDeliveryExact =
    compliantDelivery.state === 'delivered' &&
    compliantDelivery.messageCode === 'READING_DELIVERED' &&
    compliantDelivery.requiredAction === 'none' &&
    compliantDelivery.artifact?.readingId ===
      compliantExecution.artifact?.readingId &&
    encodedContainsOnlyBoundedSpousePalaceMeaning(compliantDeliveryEncoded);

  const fallbackRuntimeExact =
    fallbackExecution.state === 'completed_with_fallback' &&
    fallbackExecution.modelCalls === 1 &&
    fallbackExecution.narrative?.outcome === 'deterministic_fallback' &&
    fallbackExecution.narrative.run.validation.firstPass === 'failed' &&
    fallbackExecution.narrative.run.validation.repairAttempted === false &&
    fallbackExecution.narrative.run.validation.final === 'fallback' &&
    fallbackExecution.artifact?.status === 'narrative_fallback' &&
    fallbackExecution.consumerReadingAuthority?.readingSection ===
      'relationship:natal:spouse' &&
    fallbackExecution.consumerReadingAuthority.authority ===
      'legacy_narrative' &&
    fallbackExecution.consumerReadingAuthority.supportedOfficialReadingSection ===
      undefined &&
    encodedContainsOnlyBoundedSpousePalaceMeaning(fallbackDraftEncoded) &&
    encodedContainsOnlyBoundedSpousePalaceMeaning(fallbackArtifactEncoded);

  const fallbackDeliveryExact =
    fallbackDelivery.state === 'delivered_with_fallback' &&
    fallbackDelivery.messageCode ===
      'READING_DELIVERED_WITH_GROUNDED_FALLBACK' &&
    fallbackDelivery.requiredAction === 'none' &&
    fallbackDelivery.artifact?.readingId ===
      fallbackExecution.artifact?.readingId &&
    encodedContainsOnlyBoundedSpousePalaceMeaning(fallbackDeliveryEncoded);

  const adversarialPathRemainsBlocked =
    upstream.checks.invalidFirstPassRejected === true &&
    upstream.checks.invalidRepairRejected === true &&
    upstream.checks.deterministicFallbackExact === true &&
    upstream.checks.unsafeArtifactBlocked === true &&
    upstream.checks.unsafeDeliveryBlocked === true;

  const exactCanonicalCopyPreserved =
    compliantExecution.narrative?.draft.sections.length === 1 &&
    compliantExecution.narrative.draft.sections[0]?.title ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE &&
    fallbackExecution.narrative?.draft.sections.length === 1 &&
    fallbackExecution.narrative.draft.sections[0]?.title ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE;

  const officialAndProductionBoundaryClosed =
    compliantExecution.canonicalSemantics === undefined &&
    compliantExecution.officialReadingPlan === undefined &&
    compliantExecution.officialReadingReport === undefined &&
    fallbackExecution.canonicalSemantics === undefined &&
    fallbackExecution.officialReadingPlan === undefined &&
    fallbackExecution.officialReadingReport === undefined;

  const checks = Object.freeze({
    upstreamRemediationExact,
    actualClaimExact,
    compliantModelRuntimeExact,
    compliantDeliveryExact,
    fallbackRuntimeExact,
    fallbackDeliveryExact,
    adversarialPathRemainsBlocked,
    exactCanonicalCopyPreserved,
    officialAndProductionBoundaryClosed,
  });

  const blockers = Object.freeze(
    Object.entries(checks)
      .filter(([, value]) => value !== true)
      .map(
        ([key]) =>
          `SA5R_${key
            .replace(/[A-Z]/gu, (match) => `_${match}`)
            .toUpperCase()}_FAILED`,
      )
      .sort(),
  );

  const authorityReviewCompleted = blockers.length === 0;
  const productNarrativeRuntimeIntegrationAuthorized =
    authorityReviewCompleted;
  const narrativeGenerationAuthorized = authorityReviewCompleted;
  const artifactAssemblyAuthorized = authorityReviewCompleted;
  const deliveryAuthorityAuthorized = authorityReviewCompleted;

  const material = Object.freeze({
    reviewVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PRODUCT_NARRATIVE_RUNTIME_REAUTHORIZATION_REVIEW_VERSION,
    issue: '#2003' as const,
    track: 'saju-bridge' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    authorityScope:
      'project_governed_relationship_natal_spouse_position_only' as const,
    semanticFamily:
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' as const,
    semanticVersion: '2.0.0' as const,
    semanticScope: 'position_only' as const,
    upstreamRemediationId: upstream.remediationId,
    compliantExecutionId: compliantExecution.executionId,
    compliantDeliveryId: compliantDelivery.deliveryId,
    fallbackExecutionId: fallbackExecution.executionId,
    fallbackDeliveryId: fallbackDelivery.deliveryId,
    checks,
    blockers,
    authorityReviewCompleted,
    decision: authorityReviewCompleted
      ? ('AUTHORIZE_POSITION_ONLY_PRODUCT_NARRATIVE_RUNTIME_AND_DELIVERY' as const)
      : ('HOLD_AND_REPAIR_SA_5R_RUNTIME_REAUTHORIZATION_REVIEW' as const),
    authorityBoundary: Object.freeze({
      exactPositionOnlyCapability:
        authorityReviewCompleted,
      modelOutputProfileEnforcementEstablished:
        upstreamRemediationExact,
      legacyNarrativeRuntimeAuthorityEstablished:
        productNarrativeRuntimeIntegrationAuthorized,
      productNarrativeRuntimeIntegrationAuthorized,
      narrativeGenerationAuthorized,
      artifactAssemblyAuthorized,
      deliveryAuthorityAuthorized,
      previewAuthorityAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      publicSemanticAuthorityAuthorized: false as const,
      persistenceAuthorityAuthorized: false as const,
      publicGeneralAvailabilityAuthorityAuthorized: false as const,
      productionAuthorityAuthorized: false as const,
      externalHumanDomainReviewRequired: false as const,
      reviewAttestationRequired: false as const,
      reviewerTrustContextRequired: false as const,
      reviewerTrustGrantRequired: false as const,
      production: 'HOLD' as const,
    }),
    nextDisposition: authorityReviewCompleted
      ? ('RUN_SA_5S_POSITION_ONLY_PREVIEW_ADMISSION_REVIEW' as const)
      : ('HOLD_AND_REPAIR_SA_5R_RUNTIME_REAUTHORIZATION_REVIEW' as const),
  });

  return Object.freeze({
    reviewId: deterministicContentHash(material),
    ...material,
    compliantExecution,
    compliantDelivery,
    fallbackExecution,
    fallbackDelivery,
  });
}
