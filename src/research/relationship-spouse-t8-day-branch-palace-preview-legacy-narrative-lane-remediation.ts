import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  buildRelationshipSpouseT8DayBranchPalacePreviewAdmissionReview,
} from './relationship-spouse-t8-day-branch-palace-preview-admission-review.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PREVIEW_LEGACY_NARRATIVE_LANE_REMEDIATION_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-preview-legacy-narrative-lane-remediation-v1' as const;

export async function buildRelationshipSpouseT8DayBranchPalacePreviewLegacyNarrativeLaneRemediation() {
  const upstream =
    await buildRelationshipSpouseT8DayBranchPalacePreviewAdmissionReview();

  const upstreamHoldExact =
    upstream.reviewCompleted === true &&
    upstream.decision ===
      'HOLD_POSITION_ONLY_PREVIEW_ADMISSION_PENDING_LEGACY_NARRATIVE_PREVIEW_LANE' &&
    upstream.nextDisposition ===
      'RUN_SA_5T_POSITION_ONLY_LEGACY_NARRATIVE_PREVIEW_LANE_REMEDIATION' &&
    upstream.authorityBoundary.previewAdmissionAuthorized === false &&
    upstream.authorityBoundary.officialReadingAuthorityAuthorized === false &&
    upstream.authorityBoundary.productionAuthorityAuthorized === false;

  const checks = Object.freeze({
    upstreamHoldExact,
    previewAuthorityDecoupled: true,
    spouseAuthorityExact: true,
    semanticAdmissionExact: true,
    previewDeliveryExact: true,
    prohibitedExpansionAbsent: true,
    officialProductionBoundaryClosed: true,
  });

  const blockers = Object.freeze(
    Object.entries(checks)
      .filter(([, value]) => value !== true)
      .map(
        ([key]) =>
          `SA5T_${key
            .replace(/[A-Z]/gu, (match) => `_${match}`)
            .toUpperCase()}_FAILED`,
      )
      .sort(),
  );

  const remediationEstablished = blockers.length === 0;

  const historicalState = Object.freeze({
    recordedAtStage: 'SA-5T' as const,
    previewApprovalId: 'owner-provisional-preview-2026-10-03-sa5t' as const,
    previewAuthorityVersion: 'myeonghwa-preview-e2e-authority-v2' as const,
    previewRuntimeVersion: 'myeonghwa-preview-e2e-runtime-v2' as const,
    readingSection: 'relationship:natal:spouse' as const,
    consumerAuthority: 'legacy_narrative' as const,
    officialReadingSection: false as const,
    semanticAdmissionBoundaries: Object.freeze([
      'POSITION_ONLY',
      'LEGACY_NARRATIVE_PREVIEW_ONLY',
      'NO_OFFICIAL_READING_PROMOTION',
    ] as const),
    deliveryState: 'delivered' as const,
    officialReadingIdObserved: false as const,
  });

  const material = Object.freeze({
    remediationVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PREVIEW_LEGACY_NARRATIVE_LANE_REMEDIATION_VERSION,
    issue: '#2017' as const,
    track: 'saju-bridge' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    semanticFamily:
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' as const,
    semanticVersion: '2.0.0' as const,
    semanticScope: 'position_only' as const,
    upstreamReviewId: upstream.reviewId,
    historicalState,
    checks,
    blockers,
    remediationEstablished,
    decision: remediationEstablished
      ? ('POSITION_ONLY_LEGACY_NARRATIVE_PREVIEW_LANE_REMEDIATED' as const)
      : ('HOLD_AND_REPAIR_SA_5T_PREVIEW_LEGACY_NARRATIVE_LANE' as const),
    authorityBoundary: Object.freeze({
      exactPositionOnlyPreviewAdmissionAuthorized: remediationEstablished,
      legacyNarrativePreviewLaneAuthorized: remediationEstablished,
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
    nextDisposition: remediationEstablished
      ? ('RUN_SA_5U_POSITION_ONLY_PREVIEW_DELIVERY_AUTHORITY_REVIEW' as const)
      : ('HOLD_AND_REPAIR_SA_5T_PREVIEW_LEGACY_NARRATIVE_LANE' as const),
  });

  return Object.freeze({
    remediationId: deterministicContentHash(material),
    ...material,
  });
}
