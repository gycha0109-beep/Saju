import type { ReadingIntent } from '../contracts/reading.js';
import { runInterpretation } from '../interpretation/interpretation-engine.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  PREVIEW_E2E_APPROVAL,
  type PreviewE2eSupportedReadingSection,
} from '../preview/preview-authority.js';
import {
  resolvePreviewConsumerReadingAuthorityV1,
} from '../preview/preview-official-reading-consumer-authority.js';
import {
  createPreviewSemanticAdmissionRegistryV1,
} from '../preview/preview-semantic-admission.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../production/production-calculation-runtime.js';
import { prepareProductReading } from '../reading/product-reading-integration.js';
import { createBusinessNatalReadingCandidateRegistry } from './business-natal-reading-candidate.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
} from './relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceProductNarrativeRuntimeReauthorizationReview,
} from './relationship-spouse-t8-day-branch-palace-product-narrative-runtime-reauthorization-review.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PREVIEW_ADMISSION_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-preview-admission-review-v1' as const;

const CAPABILITY_KEY = 'relationship:natal:spouse' as const;

const SPOUSE_INTENT = Object.freeze({
  domain: 'relationship',
  temporalScope: 'natal',
  relationshipScope: 'spouse',
} as const satisfies ReadingIntent);

function intentForApprovedSection(section: PreviewE2eSupportedReadingSection): ReadingIntent {
  switch (section) {
    case 'general:natal':
      return { domain: 'general', temporalScope: 'natal' };
    case 'career:natal':
      return { domain: 'career', temporalScope: 'natal' };
    case 'wealth:natal':
      return { domain: 'wealth', temporalScope: 'natal' };
    case 'relationship:natal:general':
      return {
        domain: 'relationship',
        temporalScope: 'natal',
        relationshipScope: 'general',
      };
    case 'business:natal':
      return { domain: 'business', temporalScope: 'natal' };
  }
}

function currentPreviewPreparationProbe() {
  const snapshot = calculateAuthorizedMyeonghwaProductionSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1992, month: 10, day: 24 },
      time: { known: true, hour: 5, minute: 30 },
      sexForTraditionalCalculation: 'unspecified',
    },
    { now: new Date('2026-10-03T02:20:00.000Z') },
  ).snapshot;
  const registry = createBusinessNatalReadingCandidateRegistry(
    '2026-10-03T02:21:00.000Z',
  );
  const interpretation = runInterpretation(snapshot, registry, {
    requestId: 'sa5s-current-preview-spouse-probe',
    now: new Date('2026-10-03T02:22:00.000Z'),
  });
  const preparation = prepareProductReading(
    snapshot,
    interpretation,
    registry,
    {
      requestId: 'sa5s-current-preview-spouse-request',
      text: '배우자운',
      referenceDateTime: '2026-10-03T02:23:00.000Z',
    },
  );
  return { interpretation, preparation };
}

export async function buildRelationshipSpouseT8DayBranchPalacePreviewAdmissionReview() {
  const upstream =
    await buildRelationshipSpouseT8DayBranchPalaceProductNarrativeRuntimeReauthorizationReview();
  const currentSpouseAuthority =
    resolvePreviewConsumerReadingAuthorityV1(SPOUSE_INTENT);
  const semanticAdmissionRegistry = createPreviewSemanticAdmissionRegistryV1();
  const { interpretation, preparation } = currentPreviewPreparationProbe();

  const upstreamRuntimeAuthorizationExact =
    upstream.authorityReviewCompleted === true &&
    upstream.decision ===
      'AUTHORIZE_POSITION_ONLY_PRODUCT_NARRATIVE_RUNTIME_AND_DELIVERY' &&
    upstream.nextDisposition ===
      'RUN_SA_5S_POSITION_ONLY_PREVIEW_ADMISSION_REVIEW' &&
    upstream.blockers.length === 0 &&
    upstream.authorityBoundary.exactPositionOnlyCapability === true &&
    upstream.authorityBoundary.legacyNarrativeRuntimeAuthorityEstablished === true &&
    upstream.authorityBoundary.productNarrativeRuntimeIntegrationAuthorized === true &&
    upstream.authorityBoundary.narrativeGenerationAuthorized === true &&
    upstream.authorityBoundary.artifactAssemblyAuthorized === true &&
    upstream.authorityBoundary.deliveryAuthorityAuthorized === true &&
    upstream.authorityBoundary.previewAuthorityAuthorized === false &&
    upstream.authorityBoundary.officialReadingAuthorityAuthorized === false &&
    upstream.authorityBoundary.productionAuthorityAuthorized === false;

  const previewSupportCurrentlyExcludesSpouse =
    !PREVIEW_E2E_APPROVAL.supportedReadingSections
      .map((section) => String(section))
      .includes(CAPABILITY_KEY);

  const approvedPreviewSectionsResolveOfficial = PREVIEW_E2E_APPROVAL.supportedReadingSections.every(
    (section) => {
      const resolution = resolvePreviewConsumerReadingAuthorityV1(
        intentForApprovedSection(section),
      );
      return (
        resolution.readingSection === section &&
        resolution.authority === 'official_reading' &&
        resolution.supportedOfficialReadingSection === section
      );
    },
  );

  const spouseCurrentlyRemainsLegacyNarrative =
    currentSpouseAuthority.readingSection === CAPABILITY_KEY &&
    currentSpouseAuthority.authority === 'legacy_narrative' &&
    currentSpouseAuthority.supportedOfficialReadingSection === undefined;

  const spouseSemanticAdmissionAbsent =
    semanticAdmissionRegistry.entries.every(
      (entry) =>
        !entry.targetSections.map((section) => String(section)).includes(CAPABILITY_KEY),
    );

  const currentPreviewRegistryHasNoSpousePositionClaim =
    interpretation.claims.every(
      (claim) =>
        claim.claimType !==
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
    );

  const currentPreviewRequestFailsClosed =
    preparation.normalization.state === 'resolved' &&
    preparation.normalization.request?.intent.domain === 'relationship' &&
    preparation.normalization.request.intent.temporalScope === 'natal' &&
    preparation.normalization.request.intent.relationshipScope === 'spouse' &&
    preparation.state === 'insufficient_evidence' &&
    preparation.composition?.selection.coverageState === 'insufficient_evidence' &&
    preparation.composition.selection.targetClaimIds.length === 0 &&
    preparation.composition.selection.missingRequirements.includes(
      'RELATIONSHIP_SPOUSE_DOMAIN_CLAIM_REQUIRED',
    ) &&
    preparation.executionEligibility.readingExecution === 'blocked_coverage';

  const protectedPreviewApprovalBoundaryIntact =
    PREVIEW_E2E_APPROVAL.lifecycle === 'preview' &&
    PREVIEW_E2E_APPROVAL.approved === true &&
    PREVIEW_E2E_APPROVAL.productionInterpretationAuthorityGranted === false &&
    PREVIEW_E2E_APPROVAL.commerceAuthorityGranted === false &&
    PREVIEW_E2E_APPROVAL.persistenceAuthorityGranted === false &&
    PREVIEW_E2E_APPROVAL.publicGeneralAvailabilityAuthorityGranted === false;

  const checks = Object.freeze({
    upstreamRuntimeAuthorizationExact,
    previewSupportCurrentlyExcludesSpouse,
    approvedPreviewSectionsResolveOfficial,
    spouseCurrentlyRemainsLegacyNarrative,
    spouseSemanticAdmissionAbsent,
    currentPreviewRegistryHasNoSpousePositionClaim,
    currentPreviewRequestFailsClosed,
    protectedPreviewApprovalBoundaryIntact,
  });

  const reviewErrors = Object.freeze(
    Object.entries(checks)
      .filter(([, value]) => value !== true)
      .map(
        ([key]) =>
          `SA5S_${key
            .replace(/[A-Z]/gu, (match) => `_${match}`)
            .toUpperCase()}_FAILED`,
      )
      .sort(),
  );

  const blockingGaps = Object.freeze(
    reviewErrors.length === 0
      ? [
          'PREVIEW_SUPPORTED_SECTION_IMPLIES_OFFICIAL_READING_AUTHORITY',
          'SPOUSE_POSITION_ONLY_OFFICIAL_READING_AUTHORITY_NOT_AUTHORIZED',
          'PREVIEW_HOST_REGISTRY_DOES_NOT_MATERIALIZE_SPOUSE_POSITION_CLAIM',
          'SPOUSE_PREVIEW_SEMANTIC_ADMISSION_NOT_REGISTERED',
        ].sort()
      : [],
  );

  const reviewCompleted = reviewErrors.length === 0;
  const previewAdmissionAuthorized =
    reviewCompleted && blockingGaps.length === 0;

  const material = Object.freeze({
    reviewVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PREVIEW_ADMISSION_REVIEW_VERSION,
    issue: '#2010' as const,
    track: 'saju-bridge' as const,
    capabilityKey: CAPABILITY_KEY,
    claimType: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
    semanticFamily:
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' as const,
    semanticVersion: '2.0.0' as const,
    semanticScope: 'position_only' as const,
    upstreamReviewId: upstream.reviewId,
    currentPreviewApprovalId: PREVIEW_E2E_APPROVAL.approvalId,
    currentPreviewSemanticAdmissionRegistryHash:
      semanticAdmissionRegistry.registryHash,
    checks,
    reviewErrors,
    blockingGaps,
    reviewCompleted,
    decision: !reviewCompleted
      ? ('HOLD_AND_REPAIR_SA_5S_PREVIEW_ADMISSION_REVIEW' as const)
      : previewAdmissionAuthorized
        ? ('AUTHORIZE_POSITION_ONLY_PREVIEW_ADMISSION' as const)
        : ('HOLD_POSITION_ONLY_PREVIEW_ADMISSION_PENDING_LEGACY_NARRATIVE_PREVIEW_LANE' as const),
    authorityBoundary: Object.freeze({
      exactPositionOnlyCapabilityAuthorizedUpstream:
        upstreamRuntimeAuthorizationExact,
      legacyNarrativeRuntimeAuthorityEstablished:
        upstream.authorityBoundary.legacyNarrativeRuntimeAuthorityEstablished,
      deliveryAuthorityAuthorized:
        upstream.authorityBoundary.deliveryAuthorityAuthorized,
      previewAdmissionAuthorized,
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
    requiredRemediation: previewAdmissionAuthorized
      ? Object.freeze([] as const)
      : Object.freeze([
          'DECOUPLE_PREVIEW_ADMISSION_FROM_OFFICIAL_READING_AUTHORITY',
          'ROUTE_SPOUSE_PREVIEW_TO_EXACT_SA5R_LEGACY_NARRATIVE_RUNTIME',
          'MATERIALIZE_EXACT_SPOUSE_POSITION_CLAIM_IN_PREVIEW_HOST',
          'REGISTER_POSITION_ONLY_PREVIEW_SEMANTIC_ADMISSION_WITHOUT_OFFICIAL_PROMOTION',
          'PRESERVE_FAIL_CLOSED_OFFICIAL_PUBLIC_PERSISTENCE_GA_PRODUCTION_BOUNDARIES',
        ] as const),
    nextDisposition: !reviewCompleted
      ? ('HOLD_AND_REPAIR_SA_5S_PREVIEW_ADMISSION_REVIEW' as const)
      : previewAdmissionAuthorized
        ? ('RUN_SA_5T_POSITION_ONLY_PREVIEW_ADMISSION_MATERIALIZATION' as const)
        : ('RUN_SA_5T_POSITION_ONLY_LEGACY_NARRATIVE_PREVIEW_LANE_REMEDIATION' as const),
  });

  return Object.freeze({
    reviewId: deterministicContentHash(material),
    ...material,
    currentSpouseAuthority,
    currentPreviewPreparation: preparation,
  });
}
