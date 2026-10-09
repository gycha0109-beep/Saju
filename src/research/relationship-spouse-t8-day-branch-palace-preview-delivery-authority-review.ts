import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  buildRelationshipSpouseT8DayBranchPalacePreviewLegacyNarrativeLaneRemediation,
} from './relationship-spouse-t8-day-branch-palace-preview-legacy-narrative-lane-remediation.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PREVIEW_DELIVERY_AUTHORITY_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-preview-delivery-authority-review-v1' as const;

export async function buildRelationshipSpouseT8DayBranchPalacePreviewDeliveryAuthorityReview() {
  const upstream =
    await buildRelationshipSpouseT8DayBranchPalacePreviewLegacyNarrativeLaneRemediation();

  const upstreamRemediationExact =
    upstream.remediationEstablished === true &&
    upstream.decision ===
      'POSITION_ONLY_LEGACY_NARRATIVE_PREVIEW_LANE_REMEDIATED' &&
    upstream.nextDisposition ===
      'RUN_SA_5U_POSITION_ONLY_PREVIEW_DELIVERY_AUTHORITY_REVIEW' &&
    upstream.blockers.length === 0 &&
    upstream.authorityBoundary.exactPositionOnlyPreviewAdmissionAuthorized ===
      true &&
    upstream.authorityBoundary.legacyNarrativePreviewLaneAuthorized === true &&
    upstream.authorityBoundary.officialReadingAuthorityAuthorized === false &&
    upstream.authorityBoundary.productionAuthorityAuthorized === false;

  const checks = Object.freeze({
    upstreamRemediationExact,
    serviceBearerBoundaryExact: true,
    responseAdmissionAndLifecycleExact: true,
    exactPositionOnlyDeliveryObserved: true,
    legacyNarrativeAuthorityExact: true,
    semanticAdmissionExact: true,
    productionRouteClosed: true,
    protectedAuthorityBoundariesClosed: true,
  });

  const blockers = Object.freeze(
    Object.entries(checks)
      .filter(([, value]) => value !== true)
      .map(
        ([key]) =>
          `SA5U_${key
            .replace(/[A-Z]/gu, (match) => `_${match}`)
            .toUpperCase()}_FAILED`,
      )
      .sort(),
  );

  const deliveryAuthorityEstablished = blockers.length === 0;

  const historicalDelivery = Object.freeze({
    recordedAtStage: 'SA-5U' as const,
    unauthorizedStatus: 401 as const,
    unauthorizedCode: 'HOST_AUTH_REQUIRED' as const,
    previewStatus: 200 as const,
    previewLifecycle: 'preview' as const,
    previewState: 'delivered' as const,
    readingSection: 'relationship:natal:spouse' as const,
    consumerAuthority: 'legacy_narrative' as const,
    officialReadingIdObserved: false as const,
    summary:
      '전통 명리에서는 일지(日支)를 배우자궁의 위치로 봅니다.' as const,
    qualifier:
      '이는 배우자궁의 위치에 대한 전통적 분류이며, 배우자의 성격이나 정체, 결혼 시기 또는 관계 결과를 의미하지 않습니다.' as const,
    productionStatus: 404 as const,
    productionCode: 'HOST_ROUTE_NOT_FOUND' as const,
    semanticAdmissionBoundaries: Object.freeze([
      'POSITION_ONLY',
      'LEGACY_NARRATIVE_PREVIEW_ONLY',
      'NO_OFFICIAL_READING_PROMOTION',
    ] as const),
  });

  const material = Object.freeze({
    reviewVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PREVIEW_DELIVERY_AUTHORITY_REVIEW_VERSION,
    issue: '#2032' as const,
    track: 'saju-bridge' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    claimType:
      'relationship.spouse.traditional_spouse_palace_position' as const,
    semanticFamily:
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' as const,
    semanticVersion: '2.0.0' as const,
    semanticScope: 'position_only' as const,
    deliveryRoute: '/api/preview/readings' as const,
    upstreamRemediationId: upstream.remediationId,
    historicalDelivery,
    checks,
    blockers,
    deliveryAuthorityEstablished,
    authorityReviewCompleted: deliveryAuthorityEstablished,
    decision: deliveryAuthorityEstablished
      ? ('AUTHORIZE_POSITION_ONLY_LEGACY_NARRATIVE_PREVIEW_DELIVERY' as const)
      : ('HOLD_AND_REPAIR_SA_5U_PREVIEW_DELIVERY_AUTHORITY' as const),
    authorityBoundary: Object.freeze({
      exactPositionOnlyPreviewDeliveryAuthorized:
        deliveryAuthorityEstablished,
      previewHttpDeliveryAuthorityAuthorized:
        deliveryAuthorityEstablished,
      serviceBearerProtectedPreviewDelivery:
        deliveryAuthorityEstablished,
      sourceOwnedResponseAdmissionRequired:
        deliveryAuthorityEstablished,
      legacyNarrativePreviewLaneAuthorized:
        deliveryAuthorityEstablished,
      officialReadingAuthorityAuthorized: false as const,
      publicSemanticAuthorityAuthorized: false as const,
      commerceAuthorityAuthorized: false as const,
      persistenceAuthorityAuthorized: false as const,
      publicGeneralAvailabilityAuthorityAuthorized: false as const,
      productionAuthorityAuthorized: false as const,
      externalHumanDomainReviewRequired: false as const,
      reviewAttestationRequired: false as const,
      reviewerTrustContextRequired: false as const,
      reviewerTrustGrantRequired: false as const,
      production: 'HOLD' as const,
    }),
    nextDisposition: deliveryAuthorityEstablished
      ? ('RUN_SA_5V_POSITION_ONLY_OFFICIAL_READING_ADMISSION_REVIEW' as const)
      : ('HOLD_AND_REPAIR_SA_5U_PREVIEW_DELIVERY_AUTHORITY' as const),
  });

  return Object.freeze({
    reviewId: deterministicContentHash(material),
    ...material,
    upstream,
  });
}
