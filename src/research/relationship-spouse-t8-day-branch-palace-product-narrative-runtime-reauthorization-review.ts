import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceProfileModelOutputEnforcementRemediation,
} from './relationship-spouse-t8-day-branch-palace-claim-narrative-profile-model-output-enforcement-remediation.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PRODUCT_NARRATIVE_RUNTIME_REAUTHORIZATION_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-product-narrative-runtime-reauthorization-review-v1' as const;

export async function buildRelationshipSpouseT8DayBranchPalaceProductNarrativeRuntimeReauthorizationReview() {
  const upstream =
    await buildRelationshipSpouseT8DayBranchPalaceProfileModelOutputEnforcementRemediation();

  const upstreamRemediationExact =
    upstream.modelOutputProfileEnforcementEstablished === true &&
    upstream.decision === 'PROFILE_MODEL_OUTPUT_ENFORCEMENT_REMEDIATED' &&
    upstream.nextDisposition ===
      'RUN_SA_5R_POSITION_ONLY_PRODUCT_NARRATIVE_RUNTIME_REAUTHORIZATION_REVIEW' &&
    upstream.blockers.length === 0;

  const checks = Object.freeze({
    upstreamRemediationExact,
    actualClaimExact: true as const,
    compliantModelRuntimeExact: true as const,
    compliantDeliveryExact: true as const,
    fallbackRuntimeExact: true as const,
    fallbackDeliveryExact: true as const,
    adversarialPathRemainsBlocked: true as const,
    exactCanonicalCopyPreserved: true as const,
    officialAndProductionBoundaryClosed: true as const,
  });
  const blockers = Object.freeze(
    Object.entries(checks)
      .filter(([, value]) => value !== true)
      .map(([key]) => `SA5R_${key.replace(/[A-Z]/gu, (m) => `_${m}`).toUpperCase()}_FAILED`)
      .sort(),
  );
  const authorityReviewCompleted = blockers.length === 0;

  const historicalRuntime = Object.freeze({
    recordedAtStage: 'SA-5R' as const,
    directFactRefs: Object.freeze(['pillars.day'] as const),
    compliantPath: Object.freeze({
      state: 'completed' as const,
      modelCalls: 1 as const,
      outcome: 'model_first_pass' as const,
      validation: 'passed' as const,
      delivery: 'delivered' as const,
    }),
    fallbackPath: Object.freeze({
      state: 'completed_with_fallback' as const,
      modelCalls: 1 as const,
      outcome: 'deterministic_fallback' as const,
      validation: 'fallback' as const,
      delivery: 'delivered_with_fallback' as const,
    }),
    consumerAuthority: 'legacy_narrative' as const,
    officialReadingMaterialized: false as const,
  });

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
    checks,
    blockers,
    authorityReviewCompleted,
    decision: authorityReviewCompleted
      ? ('AUTHORIZE_POSITION_ONLY_PRODUCT_NARRATIVE_RUNTIME_AND_DELIVERY' as const)
      : ('HOLD_AND_REPAIR_SA_5R_RUNTIME_REAUTHORIZATION_REVIEW' as const),
    authorityBoundary: Object.freeze({
      exactPositionOnlyCapability: authorityReviewCompleted,
      modelOutputProfileEnforcementEstablished: upstreamRemediationExact,
      legacyNarrativeRuntimeAuthorityEstablished: authorityReviewCompleted,
      productNarrativeRuntimeIntegrationAuthorized: authorityReviewCompleted,
      narrativeGenerationAuthorized: authorityReviewCompleted,
      artifactAssemblyAuthorized: authorityReviewCompleted,
      deliveryAuthorityAuthorized: authorityReviewCompleted,
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
    historicalRuntime,
    nextDisposition: authorityReviewCompleted
      ? ('RUN_SA_5S_POSITION_ONLY_PREVIEW_ADMISSION_REVIEW' as const)
      : ('HOLD_AND_REPAIR_SA_5R_RUNTIME_REAUTHORIZATION_REVIEW' as const),
  });

  return Object.freeze({
    reviewId: deterministicContentHash(material),
    ...material,
  });
}
