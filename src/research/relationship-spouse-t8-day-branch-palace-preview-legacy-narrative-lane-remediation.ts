import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  createApprovedPreviewE2eProductHost,
  PREVIEW_E2E_RUNTIME_VERSION,
} from '../preview/preview-product-host.js';
import {
  PREVIEW_E2E_APPROVAL,
  PREVIEW_E2E_AUTHORITY_VERSION,
} from '../preview/preview-authority.js';
import {
  resolvePreviewConsumerReadingAuthorityV1,
} from '../preview/preview-official-reading-consumer-authority.js';
import {
  requirePreviewSemanticAdmissionV1,
} from '../preview/preview-semantic-admission.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
} from './relationship-spouse-t8-day-branch-palace-claim-narrative-profile-materialization.js';
import {
  buildRelationshipSpouseT8DayBranchPalacePreviewAdmissionReview,
} from './relationship-spouse-t8-day-branch-palace-preview-admission-review.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PREVIEW_LEGACY_NARRATIVE_LANE_REMEDIATION_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-preview-legacy-narrative-lane-remediation-v1' as const;

const SPOUSE_INTENT = Object.freeze({
  domain: 'relationship',
  temporalScope: 'natal',
  relationshipScope: 'spouse',
} as const);

export async function buildRelationshipSpouseT8DayBranchPalacePreviewLegacyNarrativeLaneRemediation() {
  const upstream =
    await buildRelationshipSpouseT8DayBranchPalacePreviewAdmissionReview();
  const authority = resolvePreviewConsumerReadingAuthorityV1(SPOUSE_INTENT);
  const admission = requirePreviewSemanticAdmissionV1(
    'RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_CLAIM_NARRATIVE_PROFILE',
    'relationship:natal:spouse',
  );
  const host = createApprovedPreviewE2eProductHost();
  const response = await host.requestReading({
    birth: {
      calendarType: 'solar',
      date: '1992-10-24',
      time: '05:30',
      sex: 'unspecified',
    },
    reading: {
      text: '배우자운',
    },
  });
  const encoded = JSON.stringify(response);

  const upstreamHoldExact =
    upstream.reviewCompleted === true &&
    upstream.decision ===
      'HOLD_POSITION_ONLY_PREVIEW_ADMISSION_PENDING_LEGACY_NARRATIVE_PREVIEW_LANE' &&
    upstream.nextDisposition ===
      'RUN_SA_5T_POSITION_ONLY_LEGACY_NARRATIVE_PREVIEW_LANE_REMEDIATION' &&
    upstream.authorityBoundary.previewAdmissionAuthorized === false &&
    upstream.authorityBoundary.officialReadingAuthorityAuthorized === false &&
    upstream.authorityBoundary.productionAuthorityAuthorized === false;

  const previewAuthorityDecoupled =
    PREVIEW_E2E_AUTHORITY_VERSION === 'myeonghwa-preview-e2e-authority-v2' &&
    PREVIEW_E2E_APPROVAL.supportedReadingSections.includes(
      'relationship:natal:spouse',
    ) &&
    !PREVIEW_E2E_APPROVAL.officialReadingSections
      .map((section) => String(section))
      .includes('relationship:natal:spouse') &&
    PREVIEW_E2E_APPROVAL.productionInterpretationAuthorityGranted === false &&
    PREVIEW_E2E_APPROVAL.persistenceAuthorityGranted === false &&
    PREVIEW_E2E_APPROVAL.publicGeneralAvailabilityAuthorityGranted === false;

  const spouseAuthorityExact =
    authority.readingSection === 'relationship:natal:spouse' &&
    authority.authority === 'legacy_narrative' &&
    authority.supportedOfficialReadingSection === undefined;

  const semanticAdmissionExact =
    admission.disposition === 'claim' &&
    admission.semanticScope ===
      'traditional_spouse_palace_day_branch_position_only' &&
    admission.researchRef.observedVersion === '1.0.0-research' &&
    admission.researchRef.observedAuthorityState === 'internal_reviewed' &&
    admission.boundaries.includes('POSITION_ONLY') &&
    admission.boundaries.includes('NO_OFFICIAL_READING_PROMOTION') &&
    admission.effects.mayCreatePreviewClaim === true &&
    admission.effects.mayAffectProductionAuthority === false;

  const previewDeliveryExact =
    PREVIEW_E2E_RUNTIME_VERSION === 'myeonghwa-preview-e2e-runtime-v2' &&
    response.state === 'delivered' &&
    response.reading !== undefined &&
    !response.reading.readingId.startsWith('official_reading_') &&
    encoded.includes(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
    ) &&
    encoded.includes(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
    );

  const prohibitedExpansionAbsent =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES.every(
      (phrase) => !encoded.includes(phrase),
    );

  const officialProductionBoundaryClosed =
    !encoded.includes('"contentAuthority":"official_reading"') &&
    PREVIEW_E2E_APPROVAL.productionInterpretationAuthorityGranted === false &&
    PREVIEW_E2E_APPROVAL.persistenceAuthorityGranted === false &&
    PREVIEW_E2E_APPROVAL.publicGeneralAvailabilityAuthorityGranted === false;

  const checks = Object.freeze({
    upstreamHoldExact,
    previewAuthorityDecoupled,
    spouseAuthorityExact,
    semanticAdmissionExact,
    previewDeliveryExact,
    prohibitedExpansionAbsent,
    officialProductionBoundaryClosed,
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
    previewApprovalId: PREVIEW_E2E_APPROVAL.approvalId,
    previewAuthorityVersion: PREVIEW_E2E_AUTHORITY_VERSION,
    previewRuntimeVersion: PREVIEW_E2E_RUNTIME_VERSION,
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
    response,
    authority,
    admission,
  });
}
