import type { Server } from 'node:http';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  createMyeonghwaProductionProductHostServer,
  PRODUCT_READING_LIFECYCLE_HEADER,
  PRODUCT_READING_RESPONSE_ADMISSION_HEADER,
} from '../host/http-server.js';
import {
  createMyeonghwaProductionCalculationProcessV1,
  PRODUCTION_CALCULATION_PROCESS_ENV_V1,
} from '../production-calculation-process.js';
import {
  createBoundedProductionSpouseOfficialReadingCandidateHostV1,
  createProductionSpouseOfficialReadingCandidateExecutionOptionsV1,
} from '../production/production-spouse-official-reading-candidate-host.js';
import {
  PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY,
  PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY_VERSION,
} from '../production/production-spouse-official-reading-candidate-authority.js';
import {
  PRODUCTION_SPOUSE_OFFICIAL_READING_SEMANTIC_PROJECTION_VERSION,
} from '../production/production-spouse-official-reading-semantic-projection.js';
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
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PRODUCTION_SURFACE_READINESS_REVIEW_VERSION,
  buildRelationshipSpouseT8DayBranchPalaceProductionSurfaceReadinessReview,
} from './relationship-spouse-t8-day-branch-palace-production-surface-readiness-review.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_BOUNDED_PRODUCTION_OFFICIAL_READING_LANE_IMPLEMENTATION_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-bounded-production-official-reading-lane-implementation-v1' as const;

const ACTIVE_BEARER = 'sa5z-bounded-production-spouse-candidate';
const PRODUCTION_READING_PATH = '/api/readings' as const;
const PREVIEW_READING_PATH = '/api/preview/readings' as const;

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

const REJECTED_REQUESTS = Object.freeze([
  Object.freeze({
    key: 'relationship_general',
    body: Object.freeze({
      birth: BIRTH,
      reading: Object.freeze({ text: '관계운' }),
    }),
  }),
  Object.freeze({
    key: 'annual_spouse',
    body: Object.freeze({
      birth: BIRTH,
      reading: Object.freeze({ text: '올해 배우자운' }),
    }),
  }),
  Object.freeze({
    key: 'wealth',
    body: Object.freeze({
      birth: BIRTH,
      reading: Object.freeze({ text: '재물운' }),
    }),
  }),
  Object.freeze({
    key: 'career',
    body: Object.freeze({
      birth: BIRTH,
      reading: Object.freeze({ text: '직업운' }),
    }),
  }),
  Object.freeze({
    key: 'business',
    body: Object.freeze({
      birth: BIRTH,
      reading: Object.freeze({ text: '사업운' }),
    }),
  }),
  Object.freeze({
    key: 'general',
    body: Object.freeze({
      birth: BIRTH,
      reading: Object.freeze({ text: '사주' }),
    }),
  }),
  Object.freeze({
    key: 'compatibility',
    body: Object.freeze({
      birth: BIRTH,
      reading: Object.freeze({
        text: '궁합',
        targetPersonRef: 'person_2',
      }),
    }),
  }),
  Object.freeze({
    key: 'question',
    body: Object.freeze({
      birth: BIRTH,
      reading: Object.freeze({ text: '질문: 배우자는 어떤 사람인가요' }),
    }),
  }),
  Object.freeze({
    key: 'unknown',
    body: Object.freeze({
      birth: BIRTH,
      reading: Object.freeze({ text: '아무거나 봐줘' }),
    }),
  }),
  Object.freeze({
    key: 'spouse_with_target_person',
    body: Object.freeze({
      birth: BIRTH,
      reading: Object.freeze({
        text: '배우자운',
        targetPersonRef: 'person_2',
      }),
    }),
  }),
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
    throw new Error('SA-5Z expected an ephemeral TCP address.');
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

async function observeCandidateHttp() {
  const server = createMyeonghwaProductionProductHostServer(
    createBoundedProductionSpouseOfficialReadingCandidateHostV1(
      new Date('2026-10-04T01:30:00.000Z'),
    ),
    { serviceBearer: ACTIVE_BEARER },
  );
  const origin = await listenEphemeral(server);
  try {
    const unauthorized = await fetch(`${origin}${PRODUCTION_READING_PATH}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{not-json',
    });
    const unauthorizedPayload = await jsonPayload(unauthorized);

    const spouse = await fetch(`${origin}${PRODUCTION_READING_PATH}`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${ACTIVE_BEARER}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(SPOUSE_REQUEST),
    });
    const spousePayload = await jsonPayload(spouse);
    const spouseSerialized = JSON.stringify(spousePayload);

    const preview = await fetch(`${origin}${PREVIEW_READING_PATH}`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${ACTIVE_BEARER}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(SPOUSE_REQUEST),
    });
    const previewPayload = await jsonPayload(preview);

    const rejected = [];
    for (const sample of REJECTED_REQUESTS) {
      const response = await fetch(`${origin}${PRODUCTION_READING_PATH}`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${ACTIVE_BEARER}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify(sample.body),
      });
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
      unauthorizedStatus: unauthorized.status,
      unauthorizedCode: unauthorizedPayload.error?.code,
      spouseStatus: spouse.status,
      spouseAdmissionHeader: spouse.headers.get(
        PRODUCT_READING_RESPONSE_ADMISSION_HEADER,
      ),
      spouseLifecycleHeader: spouse.headers.get(
        PRODUCT_READING_LIFECYCLE_HEADER,
      ),
      spousePayload,
      spouseSerialized,
      previewStatus: preview.status,
      previewCode: previewPayload.error?.code,
      rejected: Object.freeze(rejected),
    });
  } finally {
    await closeServer(server);
  }
}

async function observeDeployedProcessStillPreviewOnly() {
  const runtime = createMyeonghwaProductionCalculationProcessV1({
    [PRODUCTION_CALCULATION_PROCESS_ENV_V1.serviceBearer]: ACTIVE_BEARER,
    [PRODUCTION_CALCULATION_PROCESS_ENV_V1.host]: '127.0.0.1',
    [PRODUCTION_CALCULATION_PROCESS_ENV_V1.port]: '3000',
  });
  const origin = await listenEphemeral(runtime.server);
  try {
    const response = await fetch(`${origin}${PRODUCTION_READING_PATH}`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${ACTIVE_BEARER}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(SPOUSE_REQUEST),
    });
    const payload = await jsonPayload(response);
    return Object.freeze({
      status: response.status,
      code: payload.error?.code,
    });
  } finally {
    await closeServer(runtime.server);
  }
}

async function executeCandidateDirectly() {
  const snapshot = calculateAuthorizedMyeonghwaProductionSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month: 3, day: 10 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    { now: new Date('2026-10-04T01:31:00.000Z') },
  ).snapshot;
  const interpretation =
    await runRelationshipSpouseT8DayBranchPalaceNarrativeMaterializedShadowExecution(
      snapshot,
      {
        requestId: 'sa5z-bounded-production-candidate',
        now: new Date('2026-10-04T01:32:00.000Z'),
      },
    );
  return executeProductReading(
    snapshot,
    interpretation,
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY,
    {
      requestId: 'sa5z-bounded-production-candidate',
      text: '배우자운',
    },
    createProductionSpouseOfficialReadingCandidateExecutionOptionsV1(
      new Date('2026-10-04T01:33:00.000Z'),
    ),
  );
}

export async function buildRelationshipSpouseT8DayBranchPalaceBoundedProductionOfficialReadingLaneImplementation() {
  const upstream =
    await buildRelationshipSpouseT8DayBranchPalaceProductionSurfaceReadinessReview();
  const [http, deployedProcess, execution] = await Promise.all([
    observeCandidateHttp(),
    observeDeployedProcessStillPreviewOnly(),
    executeCandidateDirectly(),
  ]);

  const upstreamSa5yExact =
    upstream.reviewVersion ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PRODUCTION_SURFACE_READINESS_REVIEW_VERSION &&
    upstream.productionSurfaceEligibilityEstablished === true &&
    upstream.decision ===
      'POSITION_ONLY_PRODUCTION_SURFACE_ELIGIBLE_FOR_BOUNDED_IMPLEMENTATION' &&
    upstream.nextDisposition ===
      'RUN_SA_5Z_POSITION_ONLY_BOUNDED_PRODUCTION_OFFICIAL_READING_LANE_IMPLEMENTATION' &&
    upstream.blockers.length === 0 &&
    upstream.authorityBoundary.productionTransportAuthorityAuthorized === false &&
    upstream.authorityBoundary.productionSemanticDeliveryAuthorityAuthorized ===
      false;

  const candidateAuthorityExact =
    PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY.authorityVersion ===
      PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY_VERSION &&
    PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY.sourceReviewVersion ===
      upstream.reviewVersion &&
    PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY.sourceDecision ===
      upstream.decision &&
    PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY.allowedReadingSections
      .length === 1 &&
    PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY.allowedReadingSections[0] ===
      'relationship:natal:spouse' &&
    PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY.production ===
      'HOLD';

  const serviceBearerBoundaryExact =
    http.unauthorizedStatus === 401 &&
    http.unauthorizedCode === 'HOST_AUTH_REQUIRED';

  const spouseHttpDeliveryExact =
    http.spouseStatus === 200 &&
    http.spouseAdmissionHeader === PRODUCT_READING_RESPONSE_VERSION &&
    http.spousePayload.responseVersion === PRODUCT_READING_RESPONSE_VERSION &&
    http.spousePayload.state === 'delivered' &&
    typeof http.spousePayload.reading?.readingId === 'string' &&
    http.spousePayload.reading.readingId.startsWith('official_reading_') &&
    http.spouseLifecycleHeader === null;

  const productionMeaningExact =
    http.spouseSerialized.includes(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
    ) &&
    http.spouseSerialized.includes(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
    ) &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES.every(
      (phrase) => !http.spouseSerialized.includes(phrase),
    );

  const nonAllowlistedRequestsFailClosed =
    http.rejected.length === REJECTED_REQUESTS.length &&
    http.rejected.every(
      (entry) =>
        entry.status === 400 &&
        entry.code === 'HOST_INVALID_READING_REQUEST',
    );

  const previewRouteClosedOnCandidate =
    http.previewStatus === 404 &&
    http.previewCode === 'HOST_ROUTE_NOT_FOUND';

  const deployedProcessUnchanged =
    deployedProcess.status === 404 &&
    deployedProcess.code === 'HOST_ROUTE_NOT_FOUND';

  const modelFreeOfficialExecutionExact =
    execution.state === 'completed' &&
    execution.consumerReadingAuthority?.authorityVersion ===
      PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY_VERSION &&
    execution.consumerReadingAuthority.authority === 'official_reading' &&
    execution.modelCalls === 0 &&
    execution.narrative === undefined &&
    execution.canonicalSemantics !== undefined &&
    execution.officialReadingPlan !== undefined &&
    execution.officialReadingReport !== undefined &&
    execution.artifact?.readingId.startsWith('official_reading_') === true;

  const candidateProjectionExact =
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
                PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY_VERSION,
          ) === true,
      ) === true;

  const broaderAuthoritiesClosed =
    PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY
      .productionTransportAuthorityAuthorized === false &&
    PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY
      .productionSemanticDeliveryAuthorityAuthorized === false &&
    PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY
      .persistenceAuthorityAuthorized === false &&
    PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY
      .publicSemanticAuthorityAuthorized === false &&
    PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY
      .publicGeneralAvailabilityAuthorityAuthorized === false &&
    PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY
      .commerceAuthorityAuthorized === false &&
    upstream.authorityBoundary.externalHumanDomainReviewRequired === false &&
    upstream.authorityBoundary.reviewAttestationRequired === false &&
    upstream.authorityBoundary.reviewerTrustContextRequired === false &&
    upstream.authorityBoundary.reviewerTrustGrantRequired === false;

  const checks = Object.freeze({
    upstreamSa5yExact,
    candidateAuthorityExact,
    serviceBearerBoundaryExact,
    spouseHttpDeliveryExact,
    productionMeaningExact,
    nonAllowlistedRequestsFailClosed,
    previewRouteClosedOnCandidate,
    deployedProcessUnchanged,
    modelFreeOfficialExecutionExact,
    candidateProjectionExact,
    broaderAuthoritiesClosed,
  });

  const blockers = Object.freeze(
    Object.entries(checks)
      .filter(([, value]) => value !== true)
      .map(
        ([key]) =>
          `SA5Z_${key
            .replace(/[A-Z]/gu, (match) => `_${match}`)
            .toUpperCase()}_FAILED`,
      )
      .sort(),
  );

  const implementationEstablished = blockers.length === 0;

  const material = Object.freeze({
    implementationVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_BOUNDED_PRODUCTION_OFFICIAL_READING_LANE_IMPLEMENTATION_VERSION,
    issue: '#2072' as const,
    track: 'saju-bridge' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    claimType:
      'relationship.spouse.traditional_spouse_palace_position' as const,
    semanticFamily:
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' as const,
    semanticVersion: '2.0.0' as const,
    semanticScope: 'position_only' as const,
    upstreamReviewId: upstream.reviewId,
    candidateAuthorityVersion:
      PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY_VERSION,
    candidateSemanticProjectionVersion:
      PRODUCTION_SPOUSE_OFFICIAL_READING_SEMANTIC_PROJECTION_VERSION,
    httpEvidence: Object.freeze({
      route: PRODUCTION_READING_PATH,
      spouseStatus: http.spouseStatus,
      spouseAdmissionHeader: http.spouseAdmissionHeader,
      spouseLifecycleHeader: http.spouseLifecycleHeader,
      rejected: http.rejected,
      previewStatus: http.previewStatus,
      previewCode: http.previewCode,
      deployedProductionStatus: deployedProcess.status,
      deployedProductionCode: deployedProcess.code,
    }),
    checks,
    blockers,
    implementationEstablished,
    decision: implementationEstablished
      ? ('POSITION_ONLY_BOUNDED_PRODUCTION_OFFICIAL_READING_LANE_IMPLEMENTED' as const)
      : ('HOLD_AND_REPAIR_SA_5Z_BOUNDED_PRODUCTION_OFFICIAL_READING_LANE' as const),
    authorityBoundary: Object.freeze({
      boundedProductionCandidateLaneImplemented: implementationEstablished,
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
    nextDisposition: implementationEstablished
      ? ('RUN_SA_5AA_POSITION_ONLY_PRODUCTION_DELIVERY_AUTHORITY_REVIEW' as const)
      : ('HOLD_AND_REPAIR_SA_5Z_BOUNDED_PRODUCTION_OFFICIAL_READING_LANE' as const),
  });

  return Object.freeze({
    implementationId: deterministicContentHash(material),
    ...material,
    upstream,
    execution,
  });
}
