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
import {
  PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY,
  PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY_VERSION,
} from '../production/production-spouse-official-reading-delivery-authority.js';
import {
  createProductionSpouseOfficialReadingDeliveryExecutionOptionsV1,
} from '../production/production-spouse-official-reading-host.js';
import {
  PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_SEMANTIC_PROJECTION_VERSION,
} from '../production/production-spouse-official-reading-delivery-semantic-projection.js';
import {
  calculateAuthorizedMyeonghwaProductionSnapshot,
} from '../production/production-calculation-runtime.js';
import {
  executeProductReading,
} from '../reading/governed-reading-execution.js';
import { PRODUCT_READING_RESPONSE_VERSION } from '../reading/product-reading-response.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
} from './relationship-spouse-t8-day-branch-palace-claim-narrative-profile-materialization.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY,
  runRelationshipSpouseT8DayBranchPalaceNarrativeMaterializedShadowExecution,
} from './relationship-spouse-t8-day-branch-palace-project-governed-narrative-materialization.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PRODUCTION_DELIVERY_ACTIVATION_AUTHORITY_REVIEW_VERSION,
  buildRelationshipSpouseT8DayBranchPalaceProductionDeliveryActivationAuthorityReview,
} from './relationship-spouse-t8-day-branch-palace-production-delivery-activation-authority-review.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PRODUCTION_DELIVERY_ACTIVATION_IMPLEMENTATION_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-production-delivery-activation-implementation-v1' as const;

const ACTIVE_BEARER = 'sa5ab-production-spouse-delivery';
const PRODUCTION_READING_PATH = '/api/readings' as const;

const BIRTH = Object.freeze({
  calendarType: 'solar',
  date: '2024-03-10',
  time: '12:00',
  sex: 'unspecified',
});

const SPOUSE_REQUEST = Object.freeze({
  birth: BIRTH,
  reading: Object.freeze({ text: '배우자운' }),
});

const REJECTED_PRODUCTION_REQUESTS = Object.freeze([
  Object.freeze({ key: 'relationship_general', text: '관계운' }),
  Object.freeze({ key: 'annual_spouse', text: '올해 배우자운' }),
  Object.freeze({ key: 'wealth', text: '재물운' }),
  Object.freeze({ key: 'career', text: '직업운' }),
  Object.freeze({ key: 'business', text: '사업운' }),
  Object.freeze({ key: 'general', text: '사주' }),
  Object.freeze({ key: 'question', text: '질문: 배우자는 어떤 사람인가요' }),
  Object.freeze({ key: 'unknown', text: '아무거나 봐줘' }),
] as const);

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
    throw new Error('SA-5AB expected an ephemeral TCP address.');
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

interface HttpPayload {
  responseVersion?: unknown;
  state?: unknown;
  reading?: { readingId?: unknown };
  error?: { code?: unknown };
}

async function jsonPayload(response: Response): Promise<HttpPayload> {
  return (await response.json()) as HttpPayload;
}

async function observeActivatedProductionProcess() {
  const runtime = createMyeonghwaProductionCalculationProcessV1({
    [PRODUCTION_CALCULATION_PROCESS_ENV_V1.serviceBearer]: ACTIVE_BEARER,
    [PRODUCTION_CALCULATION_PROCESS_ENV_V1.host]: '127.0.0.1',
    [PRODUCTION_CALCULATION_PROCESS_ENV_V1.port]: '3000',
  });
  const origin = await listenEphemeral(runtime.server);

  try {
    const unauthorizedProduction = await fetch(
      `${origin}${PRODUCTION_READING_PATH}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: '{not-json',
      },
    );
    const unauthorizedProductionPayload =
      await jsonPayload(unauthorizedProduction);

    const production = await fetch(
      `${origin}${PRODUCTION_READING_PATH}`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${ACTIVE_BEARER}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify(SPOUSE_REQUEST),
      },
    );
    const productionPayload = await jsonPayload(production);
    const productionSerialized = JSON.stringify(productionPayload);

    const preview = await fetch(
      `${origin}${PRODUCT_PREVIEW_READING_HTTP_PATH}`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${ACTIVE_BEARER}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify(SPOUSE_REQUEST),
      },
    );
    const previewPayload = await jsonPayload(preview);

    const calculation = await fetch(`${origin}/api/calculations`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${ACTIVE_BEARER}`,
        'content-type': 'application/json',
      },
      body: '{',
    });
    const calculationPayload = await jsonPayload(calculation);

    const rejected = [];
    for (const sample of REJECTED_PRODUCTION_REQUESTS) {
      const response = await fetch(
        `${origin}${PRODUCTION_READING_PATH}`,
        {
          method: 'POST',
          headers: {
            authorization: `Bearer ${ACTIVE_BEARER}`,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            birth: BIRTH,
            reading: { text: sample.text },
          }),
        },
      );
      const payload = await jsonPayload(response);
      rejected.push(
        Object.freeze({
          key: sample.key,
          status: response.status,
          code: payload.error?.code,
        }),
      );
    }

    for (const sample of [
      Object.freeze({
        key: 'spouse_with_target_person',
        text: '배우자운',
      }),
      Object.freeze({
        key: 'compatibility',
        text: '궁합',
      }),
    ]) {
      const response = await fetch(
        `${origin}${PRODUCTION_READING_PATH}`,
        {
          method: 'POST',
          headers: {
            authorization: `Bearer ${ACTIVE_BEARER}`,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            birth: BIRTH,
            reading: {
              text: sample.text,
              targetPersonRef: 'person_2',
            },
          }),
        },
      );
      const payload = await jsonPayload(response);
      rejected.push(
        Object.freeze({
          key: sample.key,
          status: response.status,
          code: payload.error?.code,
        }),
      );
    }

    return Object.freeze({
      unauthorizedProductionStatus: unauthorizedProduction.status,
      unauthorizedProductionCode:
        unauthorizedProductionPayload.error?.code,
      productionStatus: production.status,
      productionAdmissionHeader: production.headers.get(
        PRODUCT_READING_RESPONSE_ADMISSION_HEADER,
      ),
      productionLifecycleHeader: production.headers.get(
        PRODUCT_READING_LIFECYCLE_HEADER,
      ),
      productionPayload,
      productionSerialized,
      previewStatus: preview.status,
      previewAdmissionHeader: preview.headers.get(
        PRODUCT_READING_RESPONSE_ADMISSION_HEADER,
      ),
      previewLifecycleHeader: preview.headers.get(
        PRODUCT_READING_LIFECYCLE_HEADER,
      ),
      previewPayload,
      calculationStatus: calculation.status,
      calculationCode: calculationPayload.error?.code,
      rejected: Object.freeze(rejected),
    });
  } finally {
    await closeServer(runtime.server);
  }
}

async function executeActivatedProductionDirectly() {
  const snapshot = calculateAuthorizedMyeonghwaProductionSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month: 3, day: 10 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    { now: new Date('2026-10-04T03:20:00.000Z') },
  ).snapshot;

  const interpretation =
    await runRelationshipSpouseT8DayBranchPalaceNarrativeMaterializedShadowExecution(
      snapshot,
      {
        requestId: 'sa5ab-production-spouse-delivery',
        now: new Date('2026-10-04T03:21:00.000Z'),
      },
    );

  return executeProductReading(
    snapshot,
    interpretation,
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY,
    {
      requestId: 'sa5ab-production-spouse-delivery',
      text: '배우자운',
    },
    createProductionSpouseOfficialReadingDeliveryExecutionOptionsV1(
      new Date('2026-10-04T03:22:00.000Z'),
    ),
  );
}

export async function buildRelationshipSpouseT8DayBranchPalaceProductionDeliveryActivationImplementation() {
  const upstream =
    await buildRelationshipSpouseT8DayBranchPalaceProductionDeliveryActivationAuthorityReview();
  const [http, execution] = await Promise.all([
    observeActivatedProductionProcess(),
    executeActivatedProductionDirectly(),
  ]);

  const upstreamSa5aaExact =
    upstream.reviewVersion ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PRODUCTION_DELIVERY_ACTIVATION_AUTHORITY_REVIEW_VERSION &&
    upstream.authorityReviewCompleted === true &&
    upstream.productionDeliveryActivationEligibilityEstablished === true &&
    upstream.decision ===
      'AUTHORIZE_POSITION_ONLY_PRODUCTION_DELIVERY_ACTIVATION_IMPLEMENTATION' &&
    upstream.nextDisposition ===
      'RUN_SA_5AB_POSITION_ONLY_PRODUCTION_DELIVERY_ACTIVATION_IMPLEMENTATION' &&
    upstream.blockers.length === 0;

  const activeAuthorityExact =
    PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY.authorityVersion ===
      PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY_VERSION &&
    PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY.sourceReviewVersion ===
      upstream.reviewVersion &&
    PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY.sourceDecision ===
      upstream.decision &&
    PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY.allowedReadingSections
      .length === 1 &&
    PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY.allowedReadingSections[0] ===
      'relationship:natal:spouse' &&
    PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY
      .productionTransportAuthorityActive === true &&
    PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY
      .productionSemanticDeliveryAuthorityActive === true &&
    PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY.production ===
      'ACTIVE_BOUNDED';

  const serviceBearerBoundaryExact =
    http.unauthorizedProductionStatus === 401 &&
    http.unauthorizedProductionCode === 'HOST_AUTH_REQUIRED';

  const productionHttpDeliveryActive =
    http.productionStatus === 200 &&
    http.productionAdmissionHeader === PRODUCT_READING_RESPONSE_VERSION &&
    http.productionPayload.responseVersion === PRODUCT_READING_RESPONSE_VERSION &&
    http.productionPayload.state === 'delivered' &&
    typeof http.productionPayload.reading?.readingId === 'string' &&
    http.productionPayload.reading.readingId.startsWith('official_reading_') &&
    http.productionLifecycleHeader === null;

  const previewLanePreserved =
    http.previewStatus === 200 &&
    http.previewAdmissionHeader === PRODUCT_READING_RESPONSE_VERSION &&
    http.previewPayload.responseVersion === PRODUCT_READING_RESPONSE_VERSION &&
    http.previewPayload.state === 'delivered' &&
    http.previewLifecycleHeader === PRODUCT_READING_PREVIEW_LIFECYCLE;

  const calculationLanePreserved =
    http.calculationStatus === 400 &&
    http.calculationCode === 'HOST_INVALID_JSON';

  const nonAllowlistedProductionFailClosed =
    http.rejected.length === 10 &&
    http.rejected.every(
      (entry) =>
        entry.status === 400 &&
        entry.code === 'HOST_INVALID_READING_REQUEST',
    );

  const exactPositionOnlyMeaningPreserved =
    http.productionSerialized.includes(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
    ) &&
    http.productionSerialized.includes(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
    ) &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES.every(
      (phrase) => !http.productionSerialized.includes(phrase),
    );

  const modelFreeOfficialExecutionExact =
    execution.state === 'completed' &&
    execution.consumerReadingAuthority?.authorityVersion ===
      PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY_VERSION &&
    execution.consumerReadingAuthority.authority === 'official_reading' &&
    execution.modelCalls === 0 &&
    execution.narrative === undefined &&
    execution.canonicalSemantics !== undefined &&
    execution.officialReadingPlan !== undefined &&
    execution.officialReadingReport !== undefined &&
    execution.artifact?.readingId.startsWith('official_reading_') === true;

  const activeProjectionExact =
    execution.canonicalSemantics?.units
      .filter((unit) =>
        execution.canonicalSemantics?.targetClaimIds.includes(unit.claimId),
      )
      .every(
        (unit) =>
          unit.factRefs.length === 1 &&
          unit.factRefs[0] === 'pillars.day' &&
          unit.canonicalText?.summary ===
            RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY &&
          unit.semanticQualifiers?.some(
            (qualifier) =>
              qualifier.canonicalText?.summary ===
                RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER &&
              qualifier.provenance.admissionRegistryVersion ===
                PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY_VERSION,
          ) === true,
      ) === true;

  const protectedAuthoritiesRemainClosed =
    PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY
      .nonSpouseProductionSemanticAuthorityAuthorized === false &&
    PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY
      .persistenceAuthorityAuthorized === false &&
    PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY
      .publicSemanticAuthorityAuthorized === false &&
    PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY
      .publicGeneralAvailabilityAuthorityAuthorized === false &&
    PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY
      .commerceAuthorityAuthorized === false &&
    upstream.authorityBoundary.externalHumanDomainReviewRequired === false &&
    upstream.authorityBoundary.reviewAttestationRequired === false &&
    upstream.authorityBoundary.reviewerTrustContextRequired === false &&
    upstream.authorityBoundary.reviewerTrustGrantRequired === false;

  const checks = Object.freeze({
    upstreamSa5aaExact,
    activeAuthorityExact,
    serviceBearerBoundaryExact,
    productionHttpDeliveryActive,
    previewLanePreserved,
    calculationLanePreserved,
    nonAllowlistedProductionFailClosed,
    exactPositionOnlyMeaningPreserved,
    modelFreeOfficialExecutionExact,
    activeProjectionExact,
    protectedAuthoritiesRemainClosed,
  });

  const blockers = Object.freeze(
    Object.entries(checks)
      .filter(([, value]) => value !== true)
      .map(
        ([key]) =>
          `SA5AB_${key
            .replace(/[A-Z]/gu, (match) => `_${match}`)
            .toUpperCase()}_FAILED`,
      )
      .sort(),
  );

  const activationImplemented = blockers.length === 0;

  const material = Object.freeze({
    implementationVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PRODUCTION_DELIVERY_ACTIVATION_IMPLEMENTATION_VERSION,
    issue: '#2091' as const,
    track: 'saju-bridge' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    claimType:
      'relationship.spouse.traditional_spouse_palace_position' as const,
    semanticFamily:
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' as const,
    semanticVersion: '2.0.0' as const,
    semanticScope: 'position_only' as const,
    upstreamReviewId: upstream.reviewId,
    activeAuthorityVersion:
      PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY_VERSION,
    activeSemanticProjectionVersion:
      PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_SEMANTIC_PROJECTION_VERSION,
    httpEvidence: Object.freeze({
      productionRoute: PRODUCTION_READING_PATH,
      productionStatus: http.productionStatus,
      productionAdmissionHeader: http.productionAdmissionHeader,
      productionLifecycleHeader: http.productionLifecycleHeader,
      previewRoute: PRODUCT_PREVIEW_READING_HTTP_PATH,
      previewStatus: http.previewStatus,
      previewAdmissionHeader: http.previewAdmissionHeader,
      previewLifecycleHeader: http.previewLifecycleHeader,
      calculationStatus: http.calculationStatus,
      calculationCode: http.calculationCode,
      rejected: http.rejected,
    }),
    checks,
    blockers,
    activationImplemented,
    decision: activationImplemented
      ? ('POSITION_ONLY_PRODUCTION_DELIVERY_ACTIVATION_IMPLEMENTED' as const)
      : ('HOLD_AND_REPAIR_SA_5AB_PRODUCTION_DELIVERY_ACTIVATION' as const),
    authorityBoundary: Object.freeze({
      spousePositionOnlyProductionTransportAuthorityActive:
        activationImplemented,
      spousePositionOnlyProductionSemanticDeliveryAuthorityActive:
        activationImplemented,
      nonSpouseProductionSemanticAuthorityAuthorized: false as const,
      publicSemanticAuthorityAuthorized: false as const,
      persistenceAuthorityAuthorized: false as const,
      publicGeneralAvailabilityAuthorityAuthorized: false as const,
      commerceAuthorityAuthorized: false as const,
      externalHumanDomainReviewRequired: false as const,
      reviewAttestationRequired: false as const,
      reviewerTrustContextRequired: false as const,
      reviewerTrustGrantRequired: false as const,
      production: activationImplemented
        ? ('ACTIVE_BOUNDED' as const)
        : ('HOLD' as const),
    }),
    nextDisposition: activationImplemented
      ? ('CLOSE_SPOUSE_POSITION_ONLY_PRODUCTION_VERTICAL_SLICE_AND_RETURN_TO_ENGINE_COMPLETION' as const)
      : ('HOLD_AND_REPAIR_SA_5AB_PRODUCTION_DELIVERY_ACTIVATION' as const),
  });

  return Object.freeze({
    implementationId: deterministicContentHash(material),
    ...material,
    upstream,
    execution,
  });
}
