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
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROFILE_BYPASS_TEXT,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SA5P_RECORDED_AUTHORIZATION_BLOCKERS,
  buildRelationshipSpouseT8DayBranchPalaceProductNarrativeRuntimeAuthorityReview,
} from './relationship-spouse-t8-day-branch-palace-product-narrative-runtime-authority-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY,
  runRelationshipSpouseT8DayBranchPalaceNarrativeMaterializedShadowExecution,
} from './relationship-spouse-t8-day-branch-palace-project-governed-narrative-materialization.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROFILE_MODEL_OUTPUT_ENFORCEMENT_REMEDIATION_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-profile-model-output-enforcement-remediation-v1' as const;

const CALCULATION_POLICY = Object.freeze({
  policyId:
    'myeonghwa/relationship-spouse-t8-day-branch-palace-sa5q-profile-enforcement',
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
    'myeonghwa/relationship-spouse-t8-day-branch-palace-sa5q-profile-enforcement',
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

class RepeatedProfileBypassAdapter implements NarrativeModelAdapter {
  readonly metadata = Object.freeze({
    provider: 'sa5q-remediation',
    modelId: 'repeated-profile-bypass-probe',
  });

  async generateStructured(prompt: CompiledNarrativePrompt): Promise<unknown> {
    const claim = prompt.evidence.claims.find(
      (candidate) =>
        candidate.claimType ===
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
    );
    if (claim === undefined) {
      throw new Error('SA-5Q bypass probe requires the spouse-palace claim.');
    }

    return {
      schemaVersion: prompt.outputSchemaVersion,
      requestId: prompt.requestId,
      sections: [
        {
          sectionId: 'sa5q-profile-bypass-probe',
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
    { now: new Date('2026-10-03T01:20:00.000Z') },
  );
}

function runtime(adapter: NarrativeModelAdapter) {
  return {
    runtimeVersion: LEGACY_NARRATIVE_RUNTIME_VERSION,
    adapter,
    narrativePolicy: NARRATIVE_POLICY,
  } as const;
}

export async function buildRelationshipSpouseT8DayBranchPalaceProfileModelOutputEnforcementRemediation() {
  const upstream =
    await buildRelationshipSpouseT8DayBranchPalaceProductNarrativeRuntimeAuthorityReview();
  const snapshot = fixtureSnapshot();
  const interpretation =
    await runRelationshipSpouseT8DayBranchPalaceNarrativeMaterializedShadowExecution(
      snapshot,
      {
        requestId: 'sa5q-profile-enforcement-shadow',
        now: new Date('2026-10-03T01:21:00.000Z'),
      },
    );

  const claim = interpretation.claims.find(
    (candidate) =>
      candidate.claimType ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
  );

  const execution = await executeProductReading(
    snapshot,
    interpretation,
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY,
    {
      requestId: 'sa5q-profile-enforcement-execution',
      text: '배우자운',
    },
    {
      outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
      readingVersion:
        'relationship-spouse-t8-day-branch-palace-sa5q-profile-enforcement',
      claimNarrativeProfiles: RELATIONSHIP_NATAL_CLAIM_NARRATIVE_PROFILES,
      narrativeNow: new Date('2026-10-03T01:22:00.000Z'),
      artifactGeneratedAt: new Date('2026-10-03T01:23:00.000Z'),
      displayLabel: 'SA-5Q profile enforcement',
    },
    runtime(new RepeatedProfileBypassAdapter()),
  );
  const delivery = buildProductReadingDelivery(execution);

  const draftEncoded = JSON.stringify(execution.narrative?.draft ?? {});
  const artifactEncoded = JSON.stringify(execution.artifact ?? {});
  const deliveryEncoded = JSON.stringify(delivery);

  const upstreamHistoricalHoldPreserved =
    upstream.authorityReviewCompleted === true &&
    upstream.decision ===
      'HOLD_PRODUCT_NARRATIVE_RUNTIME_AUTHORITY_PENDING_PROFILE_ENFORCEMENT' &&
    upstream.nextDisposition ===
      'RUN_SA_5Q_CLAIM_NARRATIVE_PROFILE_MODEL_OUTPUT_ENFORCEMENT_REMEDIATION' &&
    upstream.runtimeSemanticProfileEnforcementEstablished === false &&
    upstream.downstreamRemediationObserved === true &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SA5P_RECORDED_AUTHORIZATION_BLOCKERS.every(
      (blocker) => upstream.authorizationBlockers.includes(blocker),
    );

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

  const invalidFirstPassRejected =
    execution.narrative?.run.validation.firstPass === 'failed' &&
    execution.narrative.run.validation.violations.some(
      (violation) =>
        violation.includes('PROFILE:PROFILE_SECTION_TITLE_MISMATCH') &&
        violation.includes('ClaimNarrativeProfile'),
    ) &&
    execution.narrative.run.validation.violations.some((violation) =>
      violation.includes('PROFILE:PROFILE_ASSERTION_TEXT_MISMATCH'),
    ) &&
    execution.narrative.run.validation.violations.some((violation) =>
      violation.includes('PROFILE:PROFILE_MANDATORY_QUALIFIER_MISSING'),
    ) &&
    execution.narrative.run.validation.violations.some((violation) =>
      violation.includes('PROFILE:PROFILE_PROHIBITED_PHRASE_PRESENT'),
    );

  const invalidRepairRejected =
    execution.narrative?.run.validation.repairAttempted === true &&
    execution.narrative.run.validation.violations.some((violation) =>
      violation.includes('REPAIR:PROFILE:PROFILE_ASSERTION_TEXT_MISMATCH'),
    );

  const deterministicFallbackExact =
    execution.state === 'completed_with_fallback' &&
    execution.modelCalls === 2 &&
    execution.narrative?.outcome === 'deterministic_fallback' &&
    execution.narrative.run.validation.final === 'fallback' &&
    execution.artifact?.status === 'narrative_fallback' &&
    !draftEncoded.includes(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROFILE_BYPASS_TEXT,
    ) &&
    draftEncoded.includes(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
    ) &&
    draftEncoded.includes(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
    ) &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES.every(
      (phrase) => !draftEncoded.includes(phrase),
    );

  const unsafeArtifactBlocked =
    execution.artifact !== undefined &&
    !artifactEncoded.includes(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROFILE_BYPASS_TEXT,
    ) &&
    artifactEncoded.includes(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
    );

  const unsafeDeliveryBlocked =
    delivery.state === 'delivered_with_fallback' &&
    delivery.messageCode === 'READING_DELIVERED_WITH_GROUNDED_FALLBACK' &&
    delivery.requiredAction === 'none' &&
    !deliveryEncoded.includes(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROFILE_BYPASS_TEXT,
    ) &&
    deliveryEncoded.includes(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
    );

  const officialAuthorityStillClosed =
    execution.consumerReadingAuthority?.readingSection ===
      'relationship:natal:spouse' &&
    execution.consumerReadingAuthority.authority === 'legacy_narrative' &&
    execution.consumerReadingAuthority.supportedOfficialReadingSection ===
      undefined &&
    execution.canonicalSemantics === undefined &&
    execution.officialReadingPlan === undefined &&
    execution.officialReadingReport === undefined;

  const checks = Object.freeze({
    upstreamHistoricalHoldPreserved,
    actualClaimExact,
    invalidFirstPassRejected,
    invalidRepairRejected,
    deterministicFallbackExact,
    unsafeArtifactBlocked,
    unsafeDeliveryBlocked,
    officialAuthorityStillClosed,
  });

  const blockers = Object.freeze(
    Object.entries(checks)
      .filter(([, value]) => value !== true)
      .map(
        ([key]) =>
          `SA5Q_${key
            .replace(/[A-Z]/gu, (match) => `_${match}`)
            .toUpperCase()}_FAILED`,
      )
      .sort(),
  );

  const modelOutputProfileEnforcementEstablished = blockers.length === 0;

  const material = Object.freeze({
    remediationVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROFILE_MODEL_OUTPUT_ENFORCEMENT_REMEDIATION_VERSION,
    issue: '#1999' as const,
    track: 'saju-bridge' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    semanticFamily:
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' as const,
    semanticVersion: '2.0.0' as const,
    semanticScope: 'position_only' as const,
    upstreamReviewId: upstream.reviewId,
    executionId: execution.executionId,
    deliveryId: delivery.deliveryId,
    checks,
    blockers,
    modelOutputProfileEnforcementEstablished,
    decision: modelOutputProfileEnforcementEstablished
      ? ('PROFILE_MODEL_OUTPUT_ENFORCEMENT_REMEDIATED' as const)
      : ('HOLD_AND_REPAIR_SA_5Q_PROFILE_MODEL_OUTPUT_ENFORCEMENT' as const),
    authorityBoundary: Object.freeze({
      narrativeConsumerIntegrationEstablished: true as const,
      positionOnlyProfileConsumerSelectable: true as const,
      deterministicFallbackProfileRenderingVerified:
        deterministicFallbackExact,
      modelOutputProfileEnforcementEstablished,
      invalidModelOutputMayReachArtifact: false as const,
      invalidModelOutputMayReachDelivery: false as const,
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
    nextDisposition: modelOutputProfileEnforcementEstablished
      ? ('RUN_SA_5R_POSITION_ONLY_PRODUCT_NARRATIVE_RUNTIME_REAUTHORIZATION_REVIEW' as const)
      : ('HOLD_AND_REPAIR_SA_5Q_PROFILE_MODEL_OUTPUT_ENFORCEMENT' as const),
  });

  return Object.freeze({
    remediationId: deterministicContentHash(material),
    ...material,
    execution,
    delivery,
  });
}
