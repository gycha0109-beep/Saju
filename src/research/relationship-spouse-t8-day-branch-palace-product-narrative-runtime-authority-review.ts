import { deterministicContentHash } from '../interpretation/rule-registry.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PRODUCT_NARRATIVE_RUNTIME_AUTHORITY_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-product-narrative-runtime-authority-review-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROFILE_BYPASS_TEXT =
  '배우자의 성격은 강합니다.' as const;

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SA5P_RECORDED_AUTHORIZATION_BLOCKERS =
  Object.freeze([
    'MODEL_SUCCESS_PATH_DOES_NOT_ENFORCE_CLAIM_NARRATIVE_PROFILE',
    'MANDATORY_QUALIFIER_NOT_ENFORCED_ON_MODEL_SUCCESS',
    'PROHIBITED_PHRASES_NOT_ENFORCED_ON_MODEL_SUCCESS',
    'SEMANTICALLY_UNBOUNDED_MODEL_OUTPUT_CAN_REACH_CONSUMER_DELIVERY',
  ] as const);

export async function buildRelationshipSpouseT8DayBranchPalaceProductNarrativeRuntimeAuthorityReview() {
  const checks = Object.freeze({
    upstreamConsumerIntegrationExact: true as const,
    actualClaimExact: true as const,
    fallbackUsesBoundedProfile: true as const,
    recordedProfileBypassNowFailsClosed: true as const,
    recordedProfileBypassNoLongerReachesUnsafeDelivery: true as const,
    officialAuthorityStillClosed: true as const,
  });
  const reviewBlockers = Object.freeze([] as const);
  const authorityReviewCompleted = true as const;
  const runtimeSemanticProfileEnforcementEstablished = false as const;
  const downstreamRemediationObserved = true as const;

  const historicalRuntime = Object.freeze({
    recordedAtStage: 'SA-5P' as const,
    consumerAuthority: 'legacy_narrative' as const,
    exactClaimFactRefs: Object.freeze(['pillars.day'] as const),
    deterministicFallback: Object.freeze({
      state: 'completed_with_fallback' as const,
      modelCalls: 1 as const,
      outcome: 'deterministic_fallback' as const,
      qualifierPreserved: true as const,
    }),
    profileBypassProbe: Object.freeze({
      modelCalls: 2 as const,
      firstPass: 'failed' as const,
      repairAttempted: true as const,
      final: 'fallback' as const,
      unsafeTextBlocked: true as const,
      groundedFallbackDelivered: true as const,
    }),
  });

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
    checks,
    reviewBlockers,
    authorityReviewCompleted,
    runtimeSemanticProfileEnforcementEstablished,
    downstreamRemediationObserved,
    decision:
      'HOLD_PRODUCT_NARRATIVE_RUNTIME_AUTHORITY_PENDING_PROFILE_ENFORCEMENT' as const,
    authorizationBlockers:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SA5P_RECORDED_AUTHORIZATION_BLOCKERS,
    authorityBoundary: Object.freeze({
      narrativeConsumerIntegrationEstablished: true as const,
      positionOnlyProfileConsumerSelectable: true as const,
      deterministicFallbackProfileRenderingVerified: true as const,
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
    historicalRuntime,
    nextDisposition:
      'RUN_SA_5Q_CLAIM_NARRATIVE_PROFILE_MODEL_OUTPUT_ENFORCEMENT_REMEDIATION' as const,
  });

  return Object.freeze({
    reviewId: deterministicContentHash(material),
    ...material,
  });
}
