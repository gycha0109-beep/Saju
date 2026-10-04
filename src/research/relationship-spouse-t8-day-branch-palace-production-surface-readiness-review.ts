import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  createMyeonghwaProductionProductHostServer,
} from '../host/http-server.js';
import {
  PRODUCT_PREVIEW_READING_HTTP_PATH,
} from '../production-calculation-host.js';
import {
  PREVIEW_E2E_APPROVAL,
} from '../preview/preview-authority.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
} from './relationship-spouse-t8-day-branch-palace-claim-narrative-profile-materialization.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceOfficialReadingDeliveryAuthorityReview,
} from './relationship-spouse-t8-day-branch-palace-official-reading-delivery-authority-review.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PRODUCTION_SURFACE_READINESS_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-production-surface-readiness-review-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CANDIDATE_PRODUCTION_READING_SECTIONS =
  Object.freeze(['relationship:natal:spouse'] as const);

const SPOUSE_SECTION = 'relationship:natal:spouse' as const;
const PRODUCTION_READING_ROUTE = '/api/readings' as const;

function exactStrings(
  left: readonly string[],
  right: readonly string[],
): boolean {
  return (
    left.length === right.length &&
    left.every((value, index) => value === right[index])
  );
}

export function isRelationshipSpouseT8DayBranchPalaceCandidateProductionReadingSection(
  section: string,
): boolean {
  return (
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CANDIDATE_PRODUCTION_READING_SECTIONS as readonly string[]
  ).includes(section);
}

export async function buildRelationshipSpouseT8DayBranchPalaceProductionSurfaceReadinessReview() {
  const upstream =
    await buildRelationshipSpouseT8DayBranchPalaceOfficialReadingDeliveryAuthorityReview();

  const upstreamSa5xExact =
    upstream.authorityReviewCompleted === true &&
    upstream.deliveryAuthorityEstablished === true &&
    upstream.decision ===
      'AUTHORIZE_POSITION_ONLY_OFFICIAL_READING_PREVIEW_DELIVERY' &&
    upstream.nextDisposition ===
      'HOLD_POSITION_ONLY_BROADER_AUTHORITY_PENDING_SEPARATE_REVIEW' &&
    upstream.blockers.length === 0;

  const exactPositionOnlySemanticPreserved =
    upstream.capabilityKey === SPOUSE_SECTION &&
    upstream.claimType ===
      'relationship.spouse.traditional_spouse_palace_position' &&
    upstream.semanticFamily ===
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' &&
    upstream.semanticVersion === '2.0.0' &&
    upstream.semanticScope === 'position_only' &&
    upstream.checks.canonicalFactBindingExact === true &&
    upstream.checks.exactPositionOnlyMeaningPreserved === true &&
    upstream.checks.prohibitedExpansionAbsent === true;

  const canonicalNarrativeContractPresent =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY.length > 0 &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER.length > 0 &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES.length >
      0;

  const modelFreeOfficialReadingPathPreserved =
    upstream.checks.modelFreeOfficialExecutionExact === true &&
    upstream.authorityBoundary.legacyNarrativeRuntimeRequiredForSpouse === false &&
    upstream.upstream.execution.modelCalls === 0 &&
    upstream.upstream.execution.narrative === undefined &&
    upstream.upstream.execution.consumerReadingAuthority?.authority ===
      'official_reading';

  const productionTransportPrimitiveAvailable =
    typeof createMyeonghwaProductionProductHostServer === 'function';

  const deployedProcessStillPreviewOnly =
    upstream.httpEvidence.deliveryRoute === PRODUCT_PREVIEW_READING_HTTP_PATH &&
    upstream.httpEvidence.previewStatus === 200 &&
    upstream.httpEvidence.productionStatus === 404 &&
    upstream.httpEvidence.productionCode === 'HOST_ROUTE_NOT_FOUND' &&
    upstream.authorityBoundary.productionAuthorityAuthorized === false &&
    upstream.authorityBoundary.production === 'HOLD';

  const previewOfficialSections = Object.freeze([
    ...PREVIEW_E2E_APPROVAL.officialReadingSections,
  ]);
  const previewHostContainsBroaderOfficialScope =
    previewOfficialSections.includes(SPOUSE_SECTION) &&
    previewOfficialSections.length > 1;

  const candidateProductionAllowlistExact = exactStrings(
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CANDIDATE_PRODUCTION_READING_SECTIONS,
    [SPOUSE_SECTION],
  );

  const nonAuthorizedPreviewSections = Object.freeze(
    previewOfficialSections.filter((section) => section !== SPOUSE_SECTION),
  );
  const failClosedSectionBoundaryRepresentable =
    nonAuthorizedPreviewSections.length > 0 &&
    nonAuthorizedPreviewSections.every(
      (section) =>
        !isRelationshipSpouseT8DayBranchPalaceCandidateProductionReadingSection(
          section,
        ),
    ) &&
    !isRelationshipSpouseT8DayBranchPalaceCandidateProductionReadingSection(
      'relationship:natal:general',
    ) &&
    !isRelationshipSpouseT8DayBranchPalaceCandidateProductionReadingSection(
      'relationship:annual:spouse',
    ) &&
    !isRelationshipSpouseT8DayBranchPalaceCandidateProductionReadingSection(
      'unknown:unknown',
    );

  const previewHostWholesaleReuseRejected =
    previewHostContainsBroaderOfficialScope &&
    candidateProductionAllowlistExact &&
    nonAuthorizedPreviewSections.length === previewOfficialSections.length - 1;

  const productOwnedAuthoritiesRemainSeparated =
    upstream.authorityBoundary.publicSemanticAuthorityAuthorized === false &&
    upstream.authorityBoundary.commerceAuthorityAuthorized === false &&
    upstream.authorityBoundary.persistenceAuthorityAuthorized === false &&
    upstream.authorityBoundary.publicGeneralAvailabilityAuthorityAuthorized ===
      false;

  const removedReviewerRequirementsRemainRemoved =
    upstream.authorityBoundary.externalHumanDomainReviewRequired === false &&
    upstream.authorityBoundary.reviewAttestationRequired === false &&
    upstream.authorityBoundary.reviewerTrustContextRequired === false &&
    upstream.authorityBoundary.reviewerTrustGrantRequired === false;

  const boundedProductionSurfaceRepresentable =
    productionTransportPrimitiveAvailable &&
    deployedProcessStillPreviewOnly &&
    previewHostWholesaleReuseRejected &&
    candidateProductionAllowlistExact &&
    failClosedSectionBoundaryRepresentable &&
    modelFreeOfficialReadingPathPreserved &&
    productOwnedAuthoritiesRemainSeparated;

  const checks = Object.freeze({
    upstreamSa5xExact,
    exactPositionOnlySemanticPreserved,
    canonicalNarrativeContractPresent,
    modelFreeOfficialReadingPathPreserved,
    productionTransportPrimitiveAvailable,
    deployedProcessStillPreviewOnly,
    previewHostContainsBroaderOfficialScope,
    candidateProductionAllowlistExact,
    failClosedSectionBoundaryRepresentable,
    previewHostWholesaleReuseRejected,
    productOwnedAuthoritiesRemainSeparated,
    removedReviewerRequirementsRemainRemoved,
    boundedProductionSurfaceRepresentable,
  });

  const blockers = Object.freeze(
    Object.entries(checks)
      .filter(([, value]) => value !== true)
      .map(
        ([key]) =>
          `SA5Y_${key
            .replace(/[A-Z]/gu, (match) => `_${match}`)
            .toUpperCase()}_FAILED`,
      )
      .sort(),
  );

  const productionSurfaceEligibilityEstablished = blockers.length === 0;

  const semanticContract = Object.freeze({
    summary:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
    qualifier:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
    prohibitedPhrases:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES,
  });

  const candidateProductionSurface = Object.freeze({
    route: PRODUCTION_READING_ROUTE,
    hostFactory: 'createMyeonghwaProductionProductHostServer' as const,
    allowedReadingSections:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CANDIDATE_PRODUCTION_READING_SECTIONS,
    authorizationMode: 'explicit_section_allowlist' as const,
    failClosedForNonAllowlistedSections: true as const,
    reusePreviewHostWholesale: false as const,
    requiresDedicatedRuntimeWiring: true as const,
    legacyNarrativeRuntimeAllowedForSpouse: false as const,
    maximumSpouseModelCalls: 0 as const,
    persistenceAuthorityIncluded: false as const,
    publicShareAuthorityIncluded: false as const,
    publicGeneralAvailabilityAuthorityIncluded: false as const,
    commerceAuthorityIncluded: false as const,
  });

  const material = Object.freeze({
    reviewVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PRODUCTION_SURFACE_READINESS_REVIEW_VERSION,
    issue: '#2065' as const,
    track: 'saju-bridge' as const,
    capabilityKey: SPOUSE_SECTION,
    claimType:
      'relationship.spouse.traditional_spouse_palace_position' as const,
    semanticFamily:
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' as const,
    semanticVersion: '2.0.0' as const,
    semanticScope: 'position_only' as const,
    upstreamSa5xReviewId: upstream.reviewId,
    semanticContract,
    previewOfficialReadingSections: previewOfficialSections,
    nonAuthorizedPreviewSections,
    candidateProductionSurface,
    checks,
    blockers,
    authorityReviewCompleted: productionSurfaceEligibilityEstablished,
    productionSurfaceEligibilityEstablished,
    decision: productionSurfaceEligibilityEstablished
      ? ('POSITION_ONLY_PRODUCTION_SURFACE_ELIGIBLE_FOR_BOUNDED_IMPLEMENTATION' as const)
      : ('HOLD_POSITION_ONLY_PRODUCTION_SURFACE_PENDING_BOUNDARY_REMEDIATION' as const),
    authorityBoundary: Object.freeze({
      exactPositionOnlySemanticAuthorityPreserved:
        exactPositionOnlySemanticPreserved,
      previewOfficialReadingAuthorityPreserved:
        upstream.authorityBoundary.officialReadingPreviewAuthorityAuthorized,
      productionSurfaceEligibilityEstablished,
      boundedProductionLaneImplementationAuthorized:
        productionSurfaceEligibilityEstablished,
      productionTransportAuthorityAuthorized: false as const,
      productionSemanticDeliveryAuthorityAuthorized: false as const,
      publicSemanticAuthorityAuthorized: false as const,
      persistenceAuthorityAuthorized: false as const,
      publicGeneralAvailabilityAuthorityAuthorized: false as const,
      commerceAuthorityAuthorized: false as const,
      externalHumanDomainReviewRequired: false as const,
      reviewAttestationRequired: false as const,
      reviewerTrustContextRequired: false as const,
      reviewerTrustGrantRequired: false as const,
      production: 'HOLD' as const,
    }),
    nextDisposition: productionSurfaceEligibilityEstablished
      ? ('RUN_SA_5Z_POSITION_ONLY_BOUNDED_PRODUCTION_OFFICIAL_READING_LANE_IMPLEMENTATION' as const)
      : ('HOLD_POSITION_ONLY_PRODUCTION_SURFACE_PENDING_BOUNDARY_REMEDIATION' as const),
  });

  return Object.freeze({
    reviewId: deterministicContentHash(material),
    ...material,
    upstream,
  });
}
