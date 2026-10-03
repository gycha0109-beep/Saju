import type { Server } from 'node:http';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  createMyeonghwaProductionCalculationProcessV1,
  PRODUCTION_CALCULATION_PROCESS_ENV_V1,
} from '../production-calculation-process.js';
import {
  PRODUCT_PREVIEW_READING_HTTP_PATH,
  PRODUCT_READING_LIFECYCLE_HEADER,
  PRODUCT_READING_PREVIEW_LIFECYCLE,
  PRODUCT_READING_RESPONSE_ADMISSION_HEADER,
} from '../production-calculation-host.js';
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
  PRODUCT_READING_RESPONSE_VERSION,
  type ProductReadingResponse,
} from '../reading/product-reading-response.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
} from './relationship-spouse-t8-day-branch-palace-claim-narrative-profile-materialization.js';
import {
  buildRelationshipSpouseT8DayBranchPalacePreviewLegacyNarrativeLaneRemediation,
} from './relationship-spouse-t8-day-branch-palace-preview-legacy-narrative-lane-remediation.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PREVIEW_DELIVERY_AUTHORITY_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-preview-delivery-authority-review-v1' as const;

const ACTIVE_BEARER = 'sa5u-spouse-preview-delivery-review-bearer';

const SPOUSE_INTENT = Object.freeze({
  domain: 'relationship',
  temporalScope: 'natal',
  relationshipScope: 'spouse',
} as const);

interface ErrorPayload {
  error?: {
    code?: unknown;
  };
}

function environment(): Record<string, string> {
  return {
    [PRODUCTION_CALCULATION_PROCESS_ENV_V1.serviceBearer]: ACTIVE_BEARER,
    [PRODUCTION_CALCULATION_PROCESS_ENV_V1.host]: '127.0.0.1',
    [PRODUCTION_CALCULATION_PROCESS_ENV_V1.port]: '3000',
  };
}

function readingRequest() {
  return {
    birth: {
      calendarType: 'solar',
      date: '1992-10-24',
      time: '05:30',
      sex: 'unspecified',
    },
    reading: {
      text: '배우자운',
    },
  } as const;
}

async function listenEphemeral(server: Server): Promise<string> {
  await new Promise<void>((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      server.off('error', reject);
      resolve();
    });
  });
  const address = server.address();
  if (address === null || typeof address === 'string') {
    throw new Error('Expected SA-5U Preview delivery TCP address.');
  }
  return `http://127.0.0.1:${address.port}`;
}

async function closeServer(server: Server): Promise<void> {
  if (!server.listening) return;
  await new Promise<void>((resolve, reject) => {
    server.close((error) => {
      if (error !== undefined) reject(error);
      else resolve();
    });
  });
}

async function observePreviewHttpDelivery() {
  const runtime = createMyeonghwaProductionCalculationProcessV1(environment());
  const origin = await listenEphemeral(runtime.server);
  const body = JSON.stringify(readingRequest());

  try {
    const unauthorizedResponse = await fetch(
      `${origin}${PRODUCT_PREVIEW_READING_HTTP_PATH}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body,
      },
    );
    const unauthorizedPayload =
      (await unauthorizedResponse.json()) as ErrorPayload;

    const previewResponse = await fetch(
      `${origin}${PRODUCT_PREVIEW_READING_HTTP_PATH}`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${ACTIVE_BEARER}`,
          'content-type': 'application/json',
        },
        body,
      },
    );
    const previewPayload =
      (await previewResponse.json()) as ProductReadingResponse;

    const productionResponse = await fetch(`${origin}/api/readings`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${ACTIVE_BEARER}`,
        'content-type': 'application/json',
      },
      body,
    });
    const productionPayload =
      (await productionResponse.json()) as ErrorPayload;

    return Object.freeze({
      unauthorizedStatus: unauthorizedResponse.status,
      unauthorizedPayload,
      previewStatus: previewResponse.status,
      previewAdmissionHeader: previewResponse.headers.get(
        PRODUCT_READING_RESPONSE_ADMISSION_HEADER,
      ),
      previewLifecycleHeader: previewResponse.headers.get(
        PRODUCT_READING_LIFECYCLE_HEADER,
      ),
      previewPayload,
      productionStatus: productionResponse.status,
      productionPayload,
    });
  } finally {
    await closeServer(runtime.server);
  }
}

export async function buildRelationshipSpouseT8DayBranchPalacePreviewDeliveryAuthorityReview() {
  const upstream =
    await buildRelationshipSpouseT8DayBranchPalacePreviewLegacyNarrativeLaneRemediation();
  const authority = resolvePreviewConsumerReadingAuthorityV1(SPOUSE_INTENT);
  const admission = requirePreviewSemanticAdmissionV1(
    'RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_CLAIM_NARRATIVE_PROFILE',
    'relationship:natal:spouse',
  );
  const http = await observePreviewHttpDelivery();
  const encoded = JSON.stringify(http.previewPayload);

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

  const serviceBearerBoundaryExact =
    http.unauthorizedStatus === 401 &&
    http.unauthorizedPayload.error?.code === 'HOST_AUTH_REQUIRED';

  const responseAdmissionAndLifecycleExact =
    http.previewStatus === 200 &&
    http.previewAdmissionHeader === PRODUCT_READING_RESPONSE_VERSION &&
    http.previewLifecycleHeader === PRODUCT_READING_PREVIEW_LIFECYCLE &&
    http.previewPayload.responseVersion === PRODUCT_READING_RESPONSE_VERSION &&
    http.previewPayload.state === 'delivered' &&
    http.previewPayload.messageCode === 'READING_DELIVERED' &&
    http.previewPayload.requiredAction === 'none';

  const exactPositionOnlyDeliveryObserved =
    http.previewPayload.reading !== undefined &&
    !http.previewPayload.reading.readingId.startsWith('official_reading_') &&
    encoded.includes(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE,
    ) &&
    encoded.includes(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
    ) &&
    encoded.includes(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
    ) &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES.every(
      (phrase) => !encoded.includes(phrase),
    );

  const legacyNarrativeAuthorityExact =
    PREVIEW_E2E_AUTHORITY_VERSION === 'myeonghwa-preview-e2e-authority-v2' &&
    PREVIEW_E2E_APPROVAL.supportedReadingSections.includes(
      'relationship:natal:spouse',
    ) &&
    !(PREVIEW_E2E_APPROVAL.officialReadingSections as readonly string[]).includes(
      'relationship:natal:spouse',
    ) &&
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
    admission.boundaries.includes('LEGACY_NARRATIVE_PREVIEW_ONLY') &&
    admission.boundaries.includes('NO_OFFICIAL_READING_PROMOTION') &&
    admission.effects.mayCreatePreviewClaim === true &&
    admission.effects.mayAffectProductionAuthority === false &&
    admission.effects.mayPromoteResearchLifecycle === false &&
    admission.effects.mayInferMissingSemantics === false;

  const productionRouteClosed =
    http.productionStatus === 404 &&
    http.productionPayload.error?.code === 'HOST_ROUTE_NOT_FOUND';

  const protectedAuthorityBoundariesClosed =
    PREVIEW_E2E_APPROVAL.lifecycle === 'preview' &&
    PREVIEW_E2E_APPROVAL.approved === true &&
    PREVIEW_E2E_APPROVAL.productionInterpretationAuthorityGranted === false &&
    PREVIEW_E2E_APPROVAL.commerceAuthorityGranted === false &&
    PREVIEW_E2E_APPROVAL.persistenceAuthorityGranted === false &&
    PREVIEW_E2E_APPROVAL.publicGeneralAvailabilityAuthorityGranted === false &&
    authority.constraints.mayPromoteProductionInterpretationAuthority ===
      false &&
    authority.constraints.mayGrantPersistenceAuthority === false &&
    authority.constraints.mayGrantPublicGeneralAvailabilityAuthority ===
      false &&
    productionRouteClosed;

  const checks = Object.freeze({
    upstreamRemediationExact,
    serviceBearerBoundaryExact,
    responseAdmissionAndLifecycleExact,
    exactPositionOnlyDeliveryObserved,
    legacyNarrativeAuthorityExact,
    semanticAdmissionExact,
    productionRouteClosed,
    protectedAuthorityBoundariesClosed,
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
    deliveryRoute: PRODUCT_PREVIEW_READING_HTTP_PATH,
    upstreamRemediationId: upstream.remediationId,
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
    authority,
    admission,
    http,
  });
}
