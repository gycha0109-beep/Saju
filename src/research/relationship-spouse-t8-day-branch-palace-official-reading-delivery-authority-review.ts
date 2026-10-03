import type { Server } from 'node:http';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  PRODUCT_PREVIEW_READING_HTTP_PATH,
  PRODUCT_READING_LIFECYCLE_HEADER,
  PRODUCT_READING_PREVIEW_LIFECYCLE,
  PRODUCT_READING_RESPONSE_ADMISSION_HEADER,
} from '../production-calculation-host.js';
import {
  createMyeonghwaProductionCalculationProcessV1,
  PRODUCTION_CALCULATION_PROCESS_ENV_V1,
} from '../production-calculation-process.js';
import { PREVIEW_E2E_APPROVAL } from '../preview/preview-authority.js';
import { PRODUCT_READING_RESPONSE_VERSION } from '../reading/product-reading-response.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
} from './relationship-spouse-t8-day-branch-palace-claim-narrative-profile-materialization.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceOfficialReadingAdmissionImplementation,
} from './relationship-spouse-t8-day-branch-palace-official-reading-admission-implementation.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_OFFICIAL_READING_DELIVERY_AUTHORITY_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-official-reading-delivery-authority-review-v1' as const;

const ACTIVE_BEARER = 'sa5x-spouse-official-reading-preview-delivery-review';

const SPOUSE_REQUEST = Object.freeze({
  birth: Object.freeze({
    calendarType: 'solar',
    date: '2024-03-10',
    time: '12:00',
    sex: 'unspecified',
  }),
  reading: Object.freeze({ text: '배우자운' }),
});

function environment(): Readonly<Record<string, string>> {
  return Object.freeze({
    [PRODUCTION_CALCULATION_PROCESS_ENV_V1.serviceBearer]: ACTIVE_BEARER,
    [PRODUCTION_CALCULATION_PROCESS_ENV_V1.host]: '127.0.0.1',
    [PRODUCTION_CALCULATION_PROCESS_ENV_V1.port]: '3000',
  });
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
    throw new Error('SA-5X expected an ephemeral TCP address.');
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

interface PreviewHttpPayload {
  responseVersion?: unknown;
  state?: unknown;
  reading?: {
    readingId?: unknown;
  };
  error?: {
    code?: unknown;
  };
}

async function jsonPayload(response: Response): Promise<PreviewHttpPayload> {
  return (await response.json()) as PreviewHttpPayload;
}

export async function buildRelationshipSpouseT8DayBranchPalaceOfficialReadingDeliveryAuthorityReview() {
  const upstream =
    await buildRelationshipSpouseT8DayBranchPalaceOfficialReadingAdmissionImplementation();

  const runtime = createMyeonghwaProductionCalculationProcessV1(environment());
  const origin = await listenEphemeral(runtime.server);

  let unauthorizedStatus = 0;
  let unauthorizedCode: unknown;
  let previewStatus = 0;
  let previewAdmissionHeader: string | null = null;
  let previewLifecycleHeader: string | null = null;
  let previewPayload: PreviewHttpPayload = {};
  let previewSerialized = '';
  let productionStatus = 0;
  let productionCode: unknown;

  try {
    const unauthorized = await fetch(`${origin}${PRODUCT_PREVIEW_READING_HTTP_PATH}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{not-json',
    });
    unauthorizedStatus = unauthorized.status;
    unauthorizedCode = (await jsonPayload(unauthorized)).error?.code;

    const preview = await fetch(`${origin}${PRODUCT_PREVIEW_READING_HTTP_PATH}`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${ACTIVE_BEARER}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(SPOUSE_REQUEST),
    });
    previewStatus = preview.status;
    previewAdmissionHeader = preview.headers.get(
      PRODUCT_READING_RESPONSE_ADMISSION_HEADER,
    );
    previewLifecycleHeader = preview.headers.get(
      PRODUCT_READING_LIFECYCLE_HEADER,
    );
    previewPayload = await jsonPayload(preview);
    previewSerialized = JSON.stringify(previewPayload);

    const production = await fetch(`${origin}/api/readings`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${ACTIVE_BEARER}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(SPOUSE_REQUEST),
    });
    productionStatus = production.status;
    productionCode = (await jsonPayload(production)).error?.code;
  } finally {
    await closeServer(runtime.server);
  }

  const upstreamImplementationExact =
    upstream.implementationEstablished === true &&
    upstream.decision ===
      'POSITION_ONLY_OFFICIAL_READING_ADMISSION_IMPLEMENTED' &&
    upstream.nextDisposition ===
      'RUN_SA_5X_POSITION_ONLY_OFFICIAL_READING_DELIVERY_AUTHORITY_REVIEW' &&
    upstream.blockers.length === 0 &&
    upstream.authorityBoundary.officialReadingPreviewAuthorityAuthorized ===
      true &&
    upstream.authorityBoundary.legacyNarrativeRuntimeRequiredForSpouse ===
      false &&
    upstream.authorityBoundary.productionAuthorityAuthorized === false;

  const serviceBearerBoundaryExact =
    unauthorizedStatus === 401 && unauthorizedCode === 'HOST_AUTH_REQUIRED';

  const responseAdmissionExact =
    previewStatus === 200 &&
    previewAdmissionHeader === PRODUCT_READING_RESPONSE_VERSION &&
    previewPayload.responseVersion === PRODUCT_READING_RESPONSE_VERSION;

  const previewLifecycleExact =
    previewLifecycleHeader === PRODUCT_READING_PREVIEW_LIFECYCLE;

  const readingId = previewPayload.reading?.readingId;
  const officialReadingHttpDeliveryExact =
    previewPayload.state === 'delivered' &&
    typeof readingId === 'string' &&
    readingId.startsWith('official_reading_') &&
    previewSerialized.includes('"title":"관계"') &&
    previewSerialized.includes('"title":"해석 범위"');

  const exactPositionOnlyMeaningPreserved =
    previewSerialized.includes(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
    ) &&
    previewSerialized.includes(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
    );

  const prohibitedExpansionAbsent =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES.every(
      (phrase) => !previewSerialized.includes(phrase),
    );

  const modelFreeOfficialExecutionExact =
    upstream.execution.state === 'completed' &&
    upstream.execution.consumerReadingAuthority?.authority ===
      'official_reading' &&
    upstream.execution.modelCalls === 0 &&
    upstream.execution.narrative === undefined &&
    upstream.execution.canonicalSemantics !== undefined &&
    upstream.execution.officialReadingPlan !== undefined &&
    upstream.execution.officialReadingReport !== undefined &&
    upstream.execution.artifact?.readingId.startsWith('official_reading_') ===
      true;

  const canonicalFactBindingExact =
    upstream.checks.canonicalFactBindingExact === true &&
    upstream.execution.canonicalSemantics?.units
      .filter((unit) =>
        upstream.execution.canonicalSemantics?.targetClaimIds.includes(
          unit.claimId,
        ),
      )
      .every(
        (unit) =>
          unit.factRefs.length === 1 && unit.factRefs[0] === 'pillars.day',
      ) === true;

  const productionRouteClosed =
    productionStatus === 404 && productionCode === 'HOST_ROUTE_NOT_FOUND';

  const protectedAuthorityBoundariesClosed =
    PREVIEW_E2E_APPROVAL.lifecycle === 'preview' &&
    PREVIEW_E2E_APPROVAL.productionInterpretationAuthorityGranted === false &&
    PREVIEW_E2E_APPROVAL.commerceAuthorityGranted === false &&
    PREVIEW_E2E_APPROVAL.persistenceAuthorityGranted === false &&
    PREVIEW_E2E_APPROVAL.publicGeneralAvailabilityAuthorityGranted === false &&
    upstream.authorityBoundary.publicSemanticAuthorityAuthorized === false &&
    upstream.authorityBoundary.commerceAuthorityAuthorized === false &&
    upstream.authorityBoundary.persistenceAuthorityAuthorized === false &&
    upstream.authorityBoundary.publicGeneralAvailabilityAuthorityAuthorized ===
      false &&
    upstream.authorityBoundary.productionAuthorityAuthorized === false;

  const checks = Object.freeze({
    upstreamImplementationExact,
    serviceBearerBoundaryExact,
    responseAdmissionExact,
    previewLifecycleExact,
    officialReadingHttpDeliveryExact,
    exactPositionOnlyMeaningPreserved,
    prohibitedExpansionAbsent,
    modelFreeOfficialExecutionExact,
    canonicalFactBindingExact,
    productionRouteClosed,
    protectedAuthorityBoundariesClosed,
  });

  const blockers = Object.freeze(
    Object.entries(checks)
      .filter(([, value]) => value !== true)
      .map(
        ([key]) =>
          `SA5X_${key
            .replace(/[A-Z]/gu, (match) => `_${match}`)
            .toUpperCase()}_FAILED`,
      )
      .sort(),
  );

  const deliveryAuthorityEstablished = blockers.length === 0;

  const httpEvidence = Object.freeze({
    deliveryRoute: PRODUCT_PREVIEW_READING_HTTP_PATH,
    unauthorizedStatus,
    unauthorizedCode,
    previewStatus,
    previewAdmissionHeader,
    previewLifecycleHeader,
    previewState: previewPayload.state,
    officialReadingIdObserved:
      typeof readingId === 'string' && readingId.startsWith('official_reading_'),
    productionStatus,
    productionCode,
  });

  const material = Object.freeze({
    reviewVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_OFFICIAL_READING_DELIVERY_AUTHORITY_REVIEW_VERSION,
    issue: '#2060' as const,
    track: 'saju-bridge' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    claimType:
      'relationship.spouse.traditional_spouse_palace_position' as const,
    semanticFamily:
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' as const,
    semanticVersion: '2.0.0' as const,
    semanticScope: 'position_only' as const,
    upstreamImplementationId: upstream.implementationId,
    httpEvidence,
    checks,
    blockers,
    deliveryAuthorityEstablished,
    authorityReviewCompleted: deliveryAuthorityEstablished,
    decision: deliveryAuthorityEstablished
      ? ('AUTHORIZE_POSITION_ONLY_OFFICIAL_READING_PREVIEW_DELIVERY' as const)
      : ('HOLD_AND_REPAIR_SA_5X_OFFICIAL_READING_PREVIEW_DELIVERY_AUTHORITY' as const),
    authorityBoundary: Object.freeze({
      exactPositionOnlyOfficialReadingPreviewDeliveryAuthorized:
        deliveryAuthorityEstablished,
      previewHttpDeliveryAuthorityAuthorized: deliveryAuthorityEstablished,
      serviceBearerProtectedPreviewDelivery: deliveryAuthorityEstablished,
      sourceOwnedResponseAdmissionRequired: deliveryAuthorityEstablished,
      officialReadingPreviewAuthorityAuthorized:
        deliveryAuthorityEstablished,
      legacyNarrativeRuntimeRequiredForSpouse: false as const,
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
      ? ('HOLD_POSITION_ONLY_BROADER_AUTHORITY_PENDING_SEPARATE_REVIEW' as const)
      : ('HOLD_AND_REPAIR_SA_5X_OFFICIAL_READING_PREVIEW_DELIVERY_AUTHORITY' as const),
  });

  return Object.freeze({
    reviewId: deterministicContentHash(material),
    ...material,
    upstream,
  });
}
