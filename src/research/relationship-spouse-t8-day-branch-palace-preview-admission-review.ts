import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
} from './relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PREVIEW_ADMISSION_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-preview-admission-review-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SA5S_RECORDED_DECISION =
  'HOLD_POSITION_ONLY_PREVIEW_ADMISSION_PENDING_LEGACY_NARRATIVE_PREVIEW_LANE' as const;

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SA5S_RECORDED_BLOCKING_GAPS =
  Object.freeze([
    'PREVIEW_HOST_REGISTRY_DOES_NOT_MATERIALIZE_SPOUSE_POSITION_CLAIM',
    'PREVIEW_SUPPORTED_SECTION_IMPLIES_OFFICIAL_READING_AUTHORITY',
    'SPOUSE_POSITION_ONLY_OFFICIAL_READING_AUTHORITY_NOT_AUTHORIZED',
    'SPOUSE_PREVIEW_SEMANTIC_ADMISSION_NOT_REGISTERED',
  ] as const);

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SA5S_RECORDED_REQUIRED_REMEDIATION =
  Object.freeze([
    'DECOUPLE_PREVIEW_ADMISSION_FROM_OFFICIAL_READING_AUTHORITY',
    'ROUTE_SPOUSE_PREVIEW_TO_EXACT_SA5R_LEGACY_NARRATIVE_RUNTIME',
    'MATERIALIZE_EXACT_SPOUSE_POSITION_CLAIM_IN_PREVIEW_HOST',
    'REGISTER_POSITION_ONLY_PREVIEW_SEMANTIC_ADMISSION_WITHOUT_OFFICIAL_PROMOTION',
    'PRESERVE_FAIL_CLOSED_OFFICIAL_PUBLIC_PERSISTENCE_GA_PRODUCTION_BOUNDARIES',
  ] as const);

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SA5S_RECORDED_NEXT_DISPOSITION =
  'RUN_SA_5T_POSITION_ONLY_LEGACY_NARRATIVE_PREVIEW_LANE_REMEDIATION' as const;

const HISTORICAL_CHECKS = Object.freeze({
  upstreamRuntimeAuthorizationExact: true as const,
  previewSupportCurrentlyExcludesSpouse: true as const,
  approvedPreviewSectionsResolveOfficial: true as const,
  spouseCurrentlyRemainsLegacyNarrative: true as const,
  spouseSemanticAdmissionAbsent: true as const,
  currentPreviewRegistryHasNoSpousePositionClaim: true as const,
  currentPreviewRequestFailsClosed: true as const,
  protectedPreviewApprovalBoundaryIntact: true as const,
});

const HISTORICAL_SPOUSE_AUTHORITY = Object.freeze({
  authorityVersion:
    'myeonghwa-preview-official-reading-consumer-authority-v1' as const,
  readingSection: 'relationship:natal:spouse' as const,
  authority: 'legacy_narrative' as const,
  supportedOfficialReadingSection: undefined,
  constraints: Object.freeze({
    mayPromoteProductionInterpretationAuthority: false as const,
    mayGrantPersistenceAuthority: false as const,
    mayGrantPublicGeneralAvailabilityAuthority: false as const,
    mayTreatUnsupportedSectionAsOfficialReading: false as const,
  }),
});

const HISTORICAL_PREVIEW_PREPARATION = Object.freeze({
  state: 'insufficient_evidence' as const,
  normalization: Object.freeze({
    state: 'resolved' as const,
    request: Object.freeze({
      intent: Object.freeze({
        domain: 'relationship' as const,
        temporalScope: 'natal' as const,
        relationshipScope: 'spouse' as const,
      }),
    }),
  }),
  composition: Object.freeze({
    selection: Object.freeze({
      coverageState: 'insufficient_evidence' as const,
      targetClaimIds: Object.freeze([] as const),
      missingRequirements: Object.freeze([
        'RELATIONSHIP_SPOUSE_DOMAIN_CLAIM_REQUIRED',
      ] as const),
    }),
  }),
  executionEligibility: Object.freeze({
    readingExecution: 'blocked_coverage' as const,
  }),
});

export async function buildRelationshipSpouseT8DayBranchPalacePreviewAdmissionReview() {
  const checks = HISTORICAL_CHECKS;
  const reviewErrors = Object.freeze([] as const);
  const reviewCompleted = true as const;

  const material = Object.freeze({
    reviewVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PREVIEW_ADMISSION_REVIEW_VERSION,
    issue: '#2010' as const,
    track: 'saju-bridge' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    claimType: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
    semanticFamily:
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' as const,
    semanticVersion: '2.0.0' as const,
    semanticScope: 'position_only' as const,
    upstreamReviewId:
      'sa5s-recorded-sa5r-position-only-runtime-authorization' as const,
    historicalSnapshot: 'pre-sa5t-preview-state' as const,
    historicalPreviewApprovalId:
      'owner-provisional-preview-2026-09-19' as const,
    historicalPreviewSemanticAdmissionRegistryVersion:
      'myeonghwa-preview-semantic-admission-registry-2026-09-23-v4' as const,
    checks,
    reviewErrors,
    blockingGaps:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SA5S_RECORDED_BLOCKING_GAPS,
    reviewCompleted,
    decision:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SA5S_RECORDED_DECISION,
    authorityBoundary: Object.freeze({
      exactPositionOnlyCapabilityAuthorizedUpstream: true as const,
      legacyNarrativeRuntimeAuthorityEstablished: true as const,
      deliveryAuthorityAuthorized: true as const,
      previewAdmissionAuthorized: false as const,
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
    requiredRemediation:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SA5S_RECORDED_REQUIRED_REMEDIATION,
    nextDisposition:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SA5S_RECORDED_NEXT_DISPOSITION,
  });

  return Object.freeze({
    reviewId: deterministicContentHash(material),
    ...material,
    currentSpouseAuthority: HISTORICAL_SPOUSE_AUTHORITY,
    currentPreviewPreparation: HISTORICAL_PREVIEW_PREPARATION,
  });
}
