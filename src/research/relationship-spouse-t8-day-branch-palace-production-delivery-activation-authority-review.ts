import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY,
  PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY_VERSION,
} from '../production/production-spouse-official-reading-candidate-authority.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
} from './relationship-spouse-t8-day-branch-palace-claim-narrative-profile-materialization.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_BOUNDED_PRODUCTION_OFFICIAL_READING_LANE_IMPLEMENTATION_VERSION,
  buildRelationshipSpouseT8DayBranchPalaceBoundedProductionOfficialReadingLaneImplementation,
} from './relationship-spouse-t8-day-branch-palace-bounded-production-official-reading-lane-implementation.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PRODUCTION_DELIVERY_ACTIVATION_AUTHORITY_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-production-delivery-activation-authority-review-v1' as const;

export async function buildRelationshipSpouseT8DayBranchPalaceProductionDeliveryActivationAuthorityReview() {
  const upstream =
    await buildRelationshipSpouseT8DayBranchPalaceBoundedProductionOfficialReadingLaneImplementation();

  const upstreamSa5zExact =
    upstream.implementationVersion ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_BOUNDED_PRODUCTION_OFFICIAL_READING_LANE_IMPLEMENTATION_VERSION &&
    upstream.implementationEstablished === true &&
    upstream.decision ===
      'POSITION_ONLY_BOUNDED_PRODUCTION_OFFICIAL_READING_LANE_IMPLEMENTED' &&
    upstream.nextDisposition ===
      'RUN_SA_5AA_POSITION_ONLY_PRODUCTION_DELIVERY_AUTHORITY_REVIEW' &&
    upstream.blockers.length === 0;

  const candidateAuthorityStillBounded =
    upstream.checks.candidateAuthorityExact === true &&
    PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY.authorityVersion ===
      PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY_VERSION &&
    PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY.allowedReadingSections
      .length === 1 &&
    PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY.allowedReadingSections[0] ===
      'relationship:natal:spouse' &&
    PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY
      .legacyNarrativeRuntimeAllowedForSpouse === false &&
    PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY
      .maximumSpouseModelCalls === 0;

  const failClosedBoundaryProven =
    upstream.checks.nonAllowlistedRequestsFailClosed === true &&
    upstream.httpEvidence.rejected.length >= 10 &&
    upstream.httpEvidence.rejected.every(
      (entry) =>
        entry.status === 400 &&
        entry.code === 'HOST_INVALID_READING_REQUEST',
    );

  const authenticatedProductionTransportProven =
    upstream.checks.serviceBearerBoundaryExact === true &&
    upstream.checks.spouseHttpDeliveryExact === true &&
    upstream.httpEvidence.route === '/api/readings' &&
    upstream.httpEvidence.spouseStatus === 200 &&
    upstream.httpEvidence.spouseLifecycleHeader === null &&
    upstream.httpEvidence.previewStatus === 404;

  const exactPositionOnlySemanticDeliveryProven =
    upstream.checks.productionMeaningExact === true &&
    upstream.checks.candidateProjectionExact === true &&
    upstream.execution.canonicalSemantics !== undefined &&
    upstream.execution.canonicalSemantics.targetClaimIds.length === 1 &&
    upstream.execution.canonicalSemantics.units
      .filter((unit) =>
        upstream.execution.canonicalSemantics?.targetClaimIds.includes(
          unit.claimId,
        ),
      )
      .every(
        (unit) =>
          unit.claimType ===
            'relationship.spouse.traditional_spouse_palace_position' &&
          unit.factRefs.length === 1 &&
          unit.factRefs[0] === 'pillars.day' &&
          unit.canonicalText?.summary ===
            RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY &&
          unit.semanticQualifiers?.some(
            (qualifier) =>
              qualifier.canonicalText?.summary ===
                RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
          ) === true,
      ) &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES.length >
      0;

  const modelFreeOfficialReadingProven =
    upstream.checks.modelFreeOfficialExecutionExact === true &&
    upstream.execution.state === 'completed' &&
    upstream.execution.consumerReadingAuthority?.authority ===
      'official_reading' &&
    upstream.execution.modelCalls === 0 &&
    upstream.execution.narrative === undefined &&
    upstream.execution.officialReadingPlan !== undefined &&
    upstream.execution.officialReadingReport !== undefined &&
    upstream.execution.artifact?.readingId.startsWith('official_reading_') ===
      true;

  const deployedProcessStillInactive =
    upstream.checks.deployedProcessUnchanged === true &&
    upstream.httpEvidence.deployedProductionStatus === 404 &&
    upstream.httpEvidence.deployedProductionCode === 'HOST_ROUTE_NOT_FOUND';

  const previewAndProductionSurfacesRemainSeparated =
    upstream.checks.previewRouteClosedOnCandidate === true &&
    upstream.httpEvidence.previewStatus === 404 &&
    upstream.httpEvidence.previewCode === 'HOST_ROUTE_NOT_FOUND' &&
    upstream.httpEvidence.spouseLifecycleHeader === null;

  const protectedProductAuthoritiesRemainClosed =
    upstream.checks.broaderAuthoritiesClosed === true &&
    PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY
      .persistenceAuthorityAuthorized === false &&
    PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY
      .publicSemanticAuthorityAuthorized === false &&
    PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY
      .publicGeneralAvailabilityAuthorityAuthorized === false &&
    PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY
      .commerceAuthorityAuthorized === false;

  const activeProductionAuthorityStillClosedBeforeActivation =
    PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY
      .productionTransportAuthorityAuthorized === false &&
    PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY
      .productionSemanticDeliveryAuthorityAuthorized === false &&
    PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY.production ===
      'HOLD';

  const removedReviewerRequirementsRemainRemoved =
    upstream.authorityBoundary.externalHumanDomainReviewRequired === false &&
    upstream.authorityBoundary.reviewAttestationRequired === false &&
    upstream.authorityBoundary.reviewerTrustContextRequired === false &&
    upstream.authorityBoundary.reviewerTrustGrantRequired === false;

  const checks = Object.freeze({
    upstreamSa5zExact,
    candidateAuthorityStillBounded,
    failClosedBoundaryProven,
    authenticatedProductionTransportProven,
    exactPositionOnlySemanticDeliveryProven,
    modelFreeOfficialReadingProven,
    deployedProcessStillInactive,
    previewAndProductionSurfacesRemainSeparated,
    protectedProductAuthoritiesRemainClosed,
    activeProductionAuthorityStillClosedBeforeActivation,
    removedReviewerRequirementsRemainRemoved,
  });

  const blockers = Object.freeze(
    Object.entries(checks)
      .filter(([, value]) => value !== true)
      .map(
        ([key]) =>
          `SA5AA_${key
            .replace(/[A-Z]/gu, (match) => `_${match}`)
            .toUpperCase()}_FAILED`,
      )
      .sort(),
  );

  const activationImplementationAuthorized = blockers.length === 0;

  const material = Object.freeze({
    reviewVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PRODUCTION_DELIVERY_ACTIVATION_AUTHORITY_REVIEW_VERSION,
    issue: '#2082' as const,
    track: 'saju-bridge' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    claimType:
      'relationship.spouse.traditional_spouse_palace_position' as const,
    semanticFamily:
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' as const,
    semanticVersion: '2.0.0' as const,
    semanticScope: 'position_only' as const,
    upstreamImplementationId: upstream.implementationId,
    checks,
    blockers,
    authorityReviewCompleted: activationImplementationAuthorized,
    productionDeliveryActivationEligibilityEstablished:
      activationImplementationAuthorized,
    decision: activationImplementationAuthorized
      ? ('AUTHORIZE_POSITION_ONLY_PRODUCTION_DELIVERY_ACTIVATION_IMPLEMENTATION' as const)
      : ('HOLD_POSITION_ONLY_PRODUCTION_DELIVERY_ACTIVATION_PENDING_REMEDIATION' as const),
    authorityBoundary: Object.freeze({
      exactPositionOnlyProductionDeliveryCandidateValidated:
        activationImplementationAuthorized,
      productionTransportActivationImplementationAuthorized:
        activationImplementationAuthorized,
      productionSemanticDeliveryActivationImplementationAuthorized:
        activationImplementationAuthorized,
      productionTransportAuthorityActive: false as const,
      productionSemanticDeliveryAuthorityActive: false as const,
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
    activationConstraints: Object.freeze({
      allowedReadingSections: Object.freeze([
        'relationship:natal:spouse',
      ] as const),
      directFactRefs: Object.freeze(['pillars.day'] as const),
      maximumModelCalls: 0 as const,
      legacyNarrativeRuntimeAllowed: false as const,
      targetPersonRefAllowed: false as const,
      nonAllowlistedSectionsFailClosed: true as const,
      persistenceIncluded: false as const,
      publicShareIncluded: false as const,
      publicGeneralAvailabilityIncluded: false as const,
      commerceIncluded: false as const,
    }),
    nextDisposition: activationImplementationAuthorized
      ? ('RUN_SA_5AB_POSITION_ONLY_PRODUCTION_DELIVERY_ACTIVATION_IMPLEMENTATION' as const)
      : ('HOLD_POSITION_ONLY_PRODUCTION_DELIVERY_ACTIVATION_PENDING_REMEDIATION' as const),
  });

  return Object.freeze({
    reviewId: deterministicContentHash(material),
    ...material,
    upstream,
  });
}
