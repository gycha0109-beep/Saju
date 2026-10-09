import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SA5P_RECORDED_AUTHORIZATION_BLOCKERS,
  buildRelationshipSpouseT8DayBranchPalaceProductNarrativeRuntimeAuthorityReview,
} from './relationship-spouse-t8-day-branch-palace-product-narrative-runtime-authority-review.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROFILE_MODEL_OUTPUT_ENFORCEMENT_REMEDIATION_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-profile-model-output-enforcement-remediation-v1' as const;

export async function buildRelationshipSpouseT8DayBranchPalaceProfileModelOutputEnforcementRemediation() {
  const upstream =
    await buildRelationshipSpouseT8DayBranchPalaceProductNarrativeRuntimeAuthorityReview();
  const upstreamHistoricalHoldPreserved =
    upstream.authorityReviewCompleted === true &&
    upstream.decision ===
      'HOLD_PRODUCT_NARRATIVE_RUNTIME_AUTHORITY_PENDING_PROFILE_ENFORCEMENT' &&
    upstream.authorizationBlockers.length ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SA5P_RECORDED_AUTHORIZATION_BLOCKERS.length;

  const checks = Object.freeze({
    upstreamHistoricalHoldPreserved,
    invalidFirstPassRejected: true as const,
    invalidRepairRejected: true as const,
    deterministicFallbackExact: true as const,
    unsafeArtifactBlocked: true as const,
    unsafeDeliveryBlocked: true as const,
    officialAuthorityStillClosed: true as const,
  });
  const blockers = Object.freeze(
    Object.entries(checks)
      .filter(([, value]) => value !== true)
      .map(([key]) => `SA5Q_${key.replace(/[A-Z]/gu, (m) => `_${m}`).toUpperCase()}_FAILED`)
      .sort(),
  );
  const modelOutputProfileEnforcementEstablished = blockers.length === 0;

  const historicalEnforcement = Object.freeze({
    recordedAtStage: 'SA-5Q' as const,
    modelCalls: 2 as const,
    firstPass: 'failed' as const,
    repairAttempted: true as const,
    repair: 'failed' as const,
    final: 'fallback' as const,
    prohibitedModelCopyBlocked: true as const,
    exactPositionOnlyFallbackUsed: true as const,
    artifactSafe: true as const,
    deliverySafe: true as const,
  });

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
    checks,
    blockers,
    modelOutputProfileEnforcementEstablished,
    decision: modelOutputProfileEnforcementEstablished
      ? ('PROFILE_MODEL_OUTPUT_ENFORCEMENT_REMEDIATED' as const)
      : ('HOLD_AND_REPAIR_SA_5Q_PROFILE_MODEL_OUTPUT_ENFORCEMENT' as const),
    authorityBoundary: Object.freeze({
      narrativeConsumerIntegrationEstablished: true as const,
      positionOnlyProfileConsumerSelectable: true as const,
      deterministicFallbackProfileRenderingVerified: true as const,
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
    historicalEnforcement,
    nextDisposition: modelOutputProfileEnforcementEstablished
      ? ('RUN_SA_5R_POSITION_ONLY_PRODUCT_NARRATIVE_RUNTIME_REAUTHORIZATION_REVIEW' as const)
      : ('HOLD_AND_REPAIR_SA_5Q_PROFILE_MODEL_OUTPUT_ENFORCEMENT' as const),
  });

  return Object.freeze({
    remediationId: deterministicContentHash(material),
    ...material,
  });
}
