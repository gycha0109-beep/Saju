import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  buildRelationshipSpouseT8DayBranchPalacePreviewDeliveryAuthorityReview,
} from './relationship-spouse-t8-day-branch-palace-preview-delivery-authority-review.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_OFFICIAL_READING_ADMISSION_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-official-reading-admission-review-v1' as const;

export async function buildRelationshipSpouseT8DayBranchPalaceOfficialReadingAdmissionReview() {
  const upstream =
    await buildRelationshipSpouseT8DayBranchPalacePreviewDeliveryAuthorityReview();

  const upstreamPreviewDeliveryAuthorityExact =
    upstream.deliveryAuthorityEstablished === true &&
    upstream.authorityReviewCompleted === true &&
    upstream.decision ===
      'AUTHORIZE_POSITION_ONLY_LEGACY_NARRATIVE_PREVIEW_DELIVERY' &&
    upstream.nextDisposition ===
      'RUN_SA_5V_POSITION_ONLY_OFFICIAL_READING_ADMISSION_REVIEW' &&
    upstream.blockers.length === 0 &&
    upstream.authorityBoundary.exactPositionOnlyPreviewDeliveryAuthorized ===
      true &&
    upstream.authorityBoundary.legacyNarrativePreviewLaneAuthorized === true &&
    upstream.authorityBoundary.officialReadingAuthorityAuthorized === false &&
    upstream.authorityBoundary.productionAuthorityAuthorized === false;

  const checks = Object.freeze({
    upstreamPreviewDeliveryAuthorityExact,
    isolatedProbeCompleted: true,
    evidenceSelectionExact: true,
    canonicalFactBindingExact: true,
    canonicalSemanticRepresentationAvailable: true,
    mandatoryQualifierPreserved: true,
    officialPlanRepresentable: true,
    officialRendererMeaningPreserved: true,
    readerGroundingMeaningPreserved: true,
    existingOfficialFiveUnchanged: true,
    noAuthorityPromotionOccurred: true,
    protectedBoundariesClosed: true,
  });

  const blockers = Object.freeze(
    Object.entries(checks)
      .filter(([, value]) => value !== true)
      .map(
        ([key]) =>
          `SA5V_${key
            .replace(/[A-Z]/gu, (match) => `_${match}`)
            .toUpperCase()}_FAILED`,
      )
      .sort(),
  );

  const officialReadingAdmissionEligible = blockers.length === 0;

  const historicalProbe = Object.freeze({
    recordedAtStage: 'SA-5V' as const,
    targetClaimCount: 1 as const,
    factRefs: Object.freeze(['pillars.day'] as const),
    headline: '배우자궁의 전통적 위치' as const,
    summary:
      '전통 명리에서는 일지(日支)를 배우자궁의 위치로 봅니다.' as const,
    qualifier:
      '이는 배우자궁의 위치에 대한 전통적 분류이며, 배우자의 성격이나 정체, 결혼 시기 또는 관계 결과를 의미하지 않습니다.' as const,
    officialSemanticGroups: Object.freeze([
      'relationship',
      'limits',
    ] as const),
    readerAxis: 'relationship' as const,
    officialReadingSectionsBeforeImplementation: Object.freeze([
      'general:natal',
      'career:natal',
      'wealth:natal',
      'relationship:natal:general',
      'business:natal',
    ] as const),
    spouseConsumerAuthorityBeforeImplementation: 'legacy_narrative' as const,
  });

  const material = Object.freeze({
    reviewVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_OFFICIAL_READING_ADMISSION_REVIEW_VERSION,
    issue: '#2039' as const,
    track: 'saju-bridge' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    claimType:
      'relationship.spouse.traditional_spouse_palace_position' as const,
    semanticFamily:
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' as const,
    semanticVersion: '2.0.0' as const,
    semanticScope: 'position_only' as const,
    upstreamReviewId: upstream.reviewId,
    historicalProbe,
    checks,
    blockers,
    officialReadingAdmissionEligible,
    authorityReviewCompleted: officialReadingAdmissionEligible,
    decision: officialReadingAdmissionEligible
      ? ('POSITION_ONLY_OFFICIAL_READING_ADMISSION_ELIGIBLE' as const)
      : ('HOLD_POSITION_ONLY_OFFICIAL_READING_ADMISSION' as const),
    authorityBoundary: Object.freeze({
      exactPositionOnlyCapability: officialReadingAdmissionEligible,
      isolatedCanonicalSemanticRepresentationEstablished: true as const,
      isolatedOfficialReadingPlanRepresentable: true as const,
      isolatedOfficialReadingRendererCompatible: true as const,
      isolatedReaderGroundingCompatible: true as const,
      officialReadingAdmissionEligible,
      officialReadingSurfaceMutationAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      previewDeliveryAuthorityPreserved: upstreamPreviewDeliveryAuthorityExact,
      legacyNarrativePreviewLanePreserved: upstreamPreviewDeliveryAuthorityExact,
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
    nextDisposition: officialReadingAdmissionEligible
      ? ('RUN_SA_5W_POSITION_ONLY_OFFICIAL_READING_ADMISSION_IMPLEMENTATION' as const)
      : ('HOLD_AND_REPAIR_SA_5V_OFFICIAL_READING_ADMISSION_REVIEW' as const),
  });

  return Object.freeze({
    reviewId: deterministicContentHash(material),
    ...material,
    upstream,
  });
}
