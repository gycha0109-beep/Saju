import { createServer, type IncomingMessage, type Server, type ServerResponse } from 'node:http';
import { sign, type KeyObject } from 'node:crypto';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../production/production-calculation-runtime.js';
import type {
  FaceGovernedHandoffRuntimeHostV1,
} from '../face-topic/governed-handoff-runtime.js';
import { admitProductReadingResponse } from '../reading/product-reading-response-admission.js';
import { PRODUCT_READING_RESPONSE_VERSION } from '../reading/product-reading-response.js';
import {
  createMyeonghwaProductHost,
  parseProductHostCalculationRequest,
  ProductHostRequestError,
  PRODUCT_HOST_VERSION,
  type MyeonghwaProductHost,
  type MyeonghwaProductHostDependencies,
} from './product-host.js';
import { serializeAuthorizedProductionCalculationHttpResponseV1 } from './production-calculation-http-contract.js';
import { buildCompatibilityTwoBirthResearchReading } from '../preview/compatibility-two-birth-research-runtime.js';
import { buildT10PairSourceReadingMaterialV1 } from '../reading/t10-pair-source-reading-material.js';
import {
  createT10ProductionPairIssueProofV1,
  T10_PRODUCTION_PAIR_ISSUE_PATH_V1,
  T10_PRODUCTION_PAIR_ISSUE_PROOF_HEADER_V1,
  type T10ProductionPairIssueBindingV1,
  type T10ProductionPairIssueProofOptionsV1,
} from './t10-production-pair-issue-proof.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { createMyeonghwaProductionServiceBearerAuthorizer } from './production-service-bearer-auth.js';
import {
  CHARACTER_GROUNDING_ADMISSION_HEADER,
  CHARACTER_GROUNDING_ADMISSION_VERSION,
  CHARACTER_GROUNDING_HTTP_PATH,
  CharacterGroundingHttpRequestError,
  projectCharacterGroundingHttpRequestV1,
} from './character-grounding-http.js';
import {
  FACE_GOVERNED_HANDOFF_HTTP_ADMISSION_HEADER,
  FACE_GOVERNED_HANDOFF_HTTP_ADMISSION_VERSION,
  FACE_GOVERNED_HANDOFF_HTTP_PATH,
  faceGovernedHandoffHttpStatusV1,
} from './face-governed-handoff-http.js';
import { PRODUCT_HOST_APP_SCRIPT, PRODUCT_HOST_PAGE } from './static-page.js';

export const DEFAULT_PRODUCT_HOST_MAX_REQUEST_BYTES = 16 * 1024;
export const DEFAULT_CHARACTER_GROUNDING_MAX_REQUEST_BYTES = 512 * 1024;
export const PRODUCT_READING_RESPONSE_ADMISSION_HEADER =
  'x-myeonghwa-product-reading-response-admitted' as const;
export const PRODUCT_READING_LIFECYCLE_HEADER =
  'x-myeonghwa-reading-lifecycle' as const;
export const SAJU_A4_PREPARED_ATTEMPT_HEADER_V1 = 'x-myeongha-reading-execution-attempt-id' as const;
export const SAJU_A4_SOURCE_REF_HEADER_V1 = 'x-myeongha-saju-external-request-ref' as const;
const SAJU_A4_UUID_V1 = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;
const SAJU_A4_REF_V1 = /^saju_source_[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u;

export interface SajuA4ServerOnlyCapturePortV1 {
  withPreparedAttempt<T>(
    attempt: Readonly<{ executionAttemptId: string }>,
    execute: (externalRequestRef: string) => Promise<T>,
  ): Promise<T>;
}
export const PRODUCT_PREVIEW_READING_HTTP_PATH =
  '/api/preview/readings' as const;
export const PRODUCT_PREVIEW_NATAL_FIVE_DOMAIN_HTTP_PATH =
  '/api/preview/natal-five-domains' as const;
export const PRODUCT_PREVIEW_COMPATIBILITY_CHARTS_HTTP_PATH =
  '/api/preview/compatibility-charts' as const;
export const PRODUCT_PREVIEW_COMPATIBILITY_EVIDENCE_HTTP_PATH =
  '/api/preview/compatibility-evidence' as const;
const PAIR_REVIEW_PROOF_HEADER = 'x-myeonghwa-pair-review-proof';
const PAIR_REVIEW_NONCE_HEADER = 'x-myeongha-pair-review-nonce';
const PAIR_REVIEW_VERSION = 'myeonghwa-held-pair-review-v1';
export const PRODUCT_READING_PREVIEW_LIFECYCLE = 'preview' as const;

export interface MyeonghwaProductHostServerOptions {
  maxRequestBytes?: number;
  characterGroundingMaxRequestBytes?: number;
  /** Internal Preview host option for structured cross-chart facts. */
  compatibilityEvidencePreviewEnabled?: boolean;
  compatibilityEvidenceProof?: Readonly<{ keyId: string; signingKey: KeyObject }>;
  /** Explicitly configured Production-only issuer; independent of Preview proof. */
  compatibilityProductionIssue?: T10ProductionPairIssueProofOptionsV1;
}

export interface MyeonghwaProductionCalculationHostServerOptions
  extends MyeonghwaProductHostServerOptions {
  serviceBearer?: string;
  previousServiceBearer?: string;
}

export interface MyeonghwaProductionProductHostServerOptions
  extends MyeonghwaProductHostServerOptions {
  serviceBearer?: string;
  previousServiceBearer?: string;
  /** Explicit server-only installation, never sourced from an HTTP request. */
  a4SourceCapture?: SajuA4ServerOnlyCapturePortV1;
}

interface MyeonghwaReadingHttpRoute {
  readonly path: '/api/readings' | typeof PRODUCT_PREVIEW_READING_HTTP_PATH;
  readonly lifecycle?: typeof PRODUCT_READING_PREVIEW_LIFECYCLE;
}

const PRODUCT_READING_ROUTE: MyeonghwaReadingHttpRoute = Object.freeze({
  path: '/api/readings',
});

const PREVIEW_READING_ROUTE: MyeonghwaReadingHttpRoute = Object.freeze({
  path: PRODUCT_PREVIEW_READING_HTTP_PATH,
  lifecycle: PRODUCT_READING_PREVIEW_LIFECYCLE,
});

interface HostHttpErrorShape {
  status: number;
  code: string;
}

class HostHttpError extends Error implements HostHttpErrorShape {
  readonly status: number;
  readonly code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = 'HostHttpError';
    this.status = status;
    this.code = code;
  }
}

function jsonHeaders(): Record<string, string> {
  return {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
  };
}

function sendJson(
  response: ServerResponse,
  status: number,
  payload: unknown,
  extraHeaders: Record<string, string> = {},
): void {
  response.writeHead(status, { ...jsonHeaders(), ...extraHeaders });
  response.end(JSON.stringify(payload));
}

function sendText(
  response: ServerResponse,
  status: number,
  contentType: string,
  body: string,
  extraHeaders: Record<string, string> = {},
): void {
  response.writeHead(status, {
    'content-type': contentType,
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
    ...extraHeaders,
  });
  response.end(body);
}

function contentType(request: IncomingMessage): string {
  return request.headers['content-type']?.split(';', 1)[0]?.trim().toLowerCase() ?? '';
}

async function readJsonBody(request: IncomingMessage, maxRequestBytes: number): Promise<unknown> {
  if (contentType(request) !== 'application/json') {
    throw new HostHttpError(415, 'HOST_UNSUPPORTED_MEDIA_TYPE', 'application/json is required.');
  }
  const contentLengthHeader = request.headers['content-length'];
  if (contentLengthHeader !== undefined) {
    const contentLength = Number(contentLengthHeader);
    if (!Number.isFinite(contentLength) || contentLength < 0) {
      throw new HostHttpError(400, 'HOST_INVALID_CONTENT_LENGTH', 'Invalid Content-Length header.');
    }
    if (contentLength > maxRequestBytes) {
      throw new HostHttpError(413, 'HOST_REQUEST_TOO_LARGE', 'Request body exceeds the configured limit.');
    }
  }

  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += buffer.byteLength;
    if (size > maxRequestBytes) {
      throw new HostHttpError(413, 'HOST_REQUEST_TOO_LARGE', 'Request body exceeds the configured limit.');
    }
    chunks.push(buffer);
  }

  if (size === 0) {
    throw new HostHttpError(400, 'HOST_INVALID_JSON', 'Request body is required.');
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8')) as unknown;
  } catch {
    throw new HostHttpError(400, 'HOST_INVALID_JSON', 'Request body must contain valid JSON.');
  }
}

function maxRequestBytes(options: MyeonghwaProductHostServerOptions): number {
  const value = options.maxRequestBytes ?? DEFAULT_PRODUCT_HOST_MAX_REQUEST_BYTES;
  if (!Number.isInteger(value) || value < 1) {
    throw new TypeError('maxRequestBytes must be a positive integer.');
  }
  return value;
}

function characterGroundingMaxRequestBytes(
  options: MyeonghwaProductHostServerOptions,
): number {
  const value =
    options.characterGroundingMaxRequestBytes ??
    DEFAULT_CHARACTER_GROUNDING_MAX_REQUEST_BYTES;
  if (!Number.isInteger(value) || value < 1) {
    throw new TypeError(
      'characterGroundingMaxRequestBytes must be a positive integer.',
    );
  }
  return value;
}

function sendReadingOperationalError(response: ServerResponse): void {
  sendJson(response, 500, {
    error: {
      code: 'HOST_READING_EXECUTION_FAILED',
      message: 'The reading service could not complete this request.',
    },
  });
}

function sendCalculationOperationalError(response: ServerResponse): void {
  sendJson(response, 500, {
    error: {
      code: 'HOST_CALCULATION_EXECUTION_FAILED',
      message: 'The calculation service could not complete this request.',
    },
  });
}

function sendAuthRequired(response: ServerResponse): void {
  sendJson(response, 401, {
    error: {
      code: 'HOST_AUTH_REQUIRED',
      message: 'Authentication required.',
    },
  });
}

function handleKnownError(response: ServerResponse, error: unknown): boolean {
  if (error instanceof HostHttpError) {
    sendJson(response, error.status, { error: { code: error.code, message: error.message } });
    return true;
  }
  if (error instanceof ProductHostRequestError) {
    sendJson(response, 400, {
      error: {
        code: `HOST_${error.code}`,
        message: 'The request payload is invalid.',
      },
    });
    return true;
  }
  if (error instanceof CharacterGroundingHttpRequestError) {
    sendJson(response, 400, {
      error: {
        code: 'HOST_CHARACTER_GROUNDING_INVALID_REQUEST',
        message: 'The Character grounding projection request is invalid.',
      },
    });
    return true;
  }
  return false;
}

const PAGE_CSP = [
  "default-src 'none'",
  "script-src 'self'",
  "style-src 'unsafe-inline'",
  "connect-src 'self'",
  "img-src 'self'",
  "base-uri 'none'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

function createMyeonghwaHttpServer(
  readingHost: MyeonghwaProductHost | undefined,
  options: MyeonghwaProductHostServerOptions,
  authorizeCalculationRequest?: (request: IncomingMessage) => boolean,
  authorizeReadingRequest?: (request: IncomingMessage) => boolean,
  readingRoute: MyeonghwaReadingHttpRoute = PRODUCT_READING_ROUTE,
  secondaryReadingHost?: MyeonghwaProductHost,
  secondaryReadingRoute?: MyeonghwaReadingHttpRoute,
  faceGovernedHandoffHost?: FaceGovernedHandoffRuntimeHostV1,
  a4SourceCapture?: SajuA4ServerOnlyCapturePortV1,
): Server {
  const bodyLimit = maxRequestBytes(options);
  const groundingBodyLimit = characterGroundingMaxRequestBytes(options);
  const pairReviewProof = options.compatibilityEvidenceProof;
  if (options.compatibilityProductionIssue !== undefined &&
      (authorizeReadingRequest === undefined || readingRoute.path !== '/api/readings'))
    throw new TypeError('Pair Production issue requires an authenticated Production reading host.');
  const pairIssuer = options.compatibilityProductionIssue === undefined ? undefined :
    createT10ProductionPairIssueProofV1(options.compatibilityProductionIssue);
  if (pairReviewProof !== undefined && (
    options.compatibilityEvidencePreviewEnabled !== true || authorizeReadingRequest === undefined ||
    !/^[a-zA-Z0-9._:-]{3,128}$/u.test(pairReviewProof.keyId) ||
    pairReviewProof.signingKey.type !== 'private' || pairReviewProof.signingKey.asymmetricKeyType !== 'ed25519'
  )) throw new TypeError('Protected comparison review signing requires an explicit preview key.');

  return createServer(async (request, response) => {
    const method = request.method ?? 'GET';
    const path = new URL(request.url ?? '/', 'http://myeonghwa.local').pathname;

    if (path === '/' && method === 'GET') {
      sendText(response, 200, 'text/html; charset=utf-8', PRODUCT_HOST_PAGE, {
        'content-security-policy': PAGE_CSP,
        'referrer-policy': 'no-referrer',
        'x-frame-options': 'DENY',
      });
      return;
    }
    if (path === '/app.js' && method === 'GET') {
      sendText(response, 200, 'text/javascript; charset=utf-8', PRODUCT_HOST_APP_SCRIPT);
      return;
    }
    if ((path === '/health' || path === '/healthz') && method === 'GET') {
      sendJson(response, 200, { status: 'ok', hostVersion: PRODUCT_HOST_VERSION });
      return;
    }
    if (path === '/api/calculations') {
      if (method !== 'POST') {
        response.setHeader('allow', 'POST');
        sendJson(response, 405, {
          error: { code: 'HOST_METHOD_NOT_ALLOWED', message: 'POST is required.' },
        });
        return;
      }
      if (authorizeCalculationRequest !== undefined && !authorizeCalculationRequest(request)) {
        sendAuthRequired(response);
        return;
      }
      try {
        const body = await readJsonBody(request, bodyLimit);
        const input = parseProductHostCalculationRequest(body);
        const result = calculateAuthorizedMyeonghwaProductionSnapshot(input);
        sendJson(response, 200, serializeAuthorizedProductionCalculationHttpResponseV1(result));
      } catch (error) {
        if (!handleKnownError(response, error)) sendCalculationOperationalError(response);
      }
      return;
    }
    if (
      path === FACE_GOVERNED_HANDOFF_HTTP_PATH &&
      faceGovernedHandoffHost !== undefined &&
      authorizeReadingRequest !== undefined
    ) {
      if (method !== 'POST') {
        response.setHeader('allow', 'POST');
        sendJson(response, 405, {
          error: { code: 'HOST_METHOD_NOT_ALLOWED', message: 'POST is required.' },
        });
        return;
      }
      if (!authorizeReadingRequest(request)) {
        sendAuthRequired(response);
        return;
      }
      try {
        const body = await readJsonBody(request, bodyLimit);
        const result =
          await faceGovernedHandoffHost.execute(body);
        sendJson(
          response,
          faceGovernedHandoffHttpStatusV1(result),
          result,
          {
            [FACE_GOVERNED_HANDOFF_HTTP_ADMISSION_HEADER]:
              FACE_GOVERNED_HANDOFF_HTTP_ADMISSION_VERSION,
          },
        );
      } catch (error) {
        if (!handleKnownError(response, error)) {
          sendReadingOperationalError(response);
        }
      }
      return;
    }

    if (
      path === CHARACTER_GROUNDING_HTTP_PATH &&
      authorizeReadingRequest !== undefined
    ) {
      if (method !== 'POST') {
        response.setHeader('allow', 'POST');
        sendJson(response, 405, {
          error: { code: 'HOST_METHOD_NOT_ALLOWED', message: 'POST is required.' },
        });
        return;
      }
      if (!authorizeReadingRequest(request)) {
        sendAuthRequired(response);
        return;
      }
      try {
        const body = await readJsonBody(request, groundingBodyLimit);
        const grounding = projectCharacterGroundingHttpRequestV1(body);
        sendJson(response, 200, grounding, {
          [CHARACTER_GROUNDING_ADMISSION_HEADER]:
            CHARACTER_GROUNDING_ADMISSION_VERSION,
        });
      } catch (error) {
        if (!handleKnownError(response, error)) sendReadingOperationalError(response);
      }
      return;
    }
    // Distinct server-to-server T10 Production issuance. No browser/Preview gate
    // can cause an unissued research candidate to be treated as a paid receipt.
    if (path === T10_PRODUCTION_PAIR_ISSUE_PATH_V1) {
      if (pairIssuer === undefined) {
        sendJson(response, 404, { error: { code: 'HOST_ROUTE_NOT_FOUND', message: 'Route not found.' } });
        return;
      }
      if (method !== 'POST') {
        response.setHeader('allow', 'POST');
        sendJson(response, 405, { error: { code: 'HOST_METHOD_NOT_ALLOWED', message: 'POST is required.' } });
        return;
      }
      if (authorizeReadingRequest === undefined || !authorizeReadingRequest(request)) {
        sendAuthRequired(response);
        return;
      }
      try {
        const data = await readJsonBody(request, bodyLimit);
        if (data === null || typeof data !== 'object' || Array.isArray(data)) {
          throw new HostHttpError(400, 'HOST_INVALID_PAIR_ISSUE_REQUEST', 'Invalid pair issue request.');
        }
        const input = data as Record<string, unknown>;
        if (Object.keys(input).length !== 3 || !Object.hasOwn(input, 'birth') ||
            !Object.hasOwn(input, 'partnerBirth') || !Object.hasOwn(input, 'binding') ||
            input.binding === null || typeof input.binding !== 'object' ||
            Array.isArray(input.binding)) {
          throw new HostHttpError(400, 'HOST_INVALID_PAIR_ISSUE_REQUEST', 'Invalid pair issue request.');
        }
        const own = parseProductHostCalculationRequest({ birth: input.birth });
        const partner = parseProductHostCalculationRequest({ birth: input.partnerBirth });
        const binding = input.binding as T10ProductionPairIssueBindingV1;
        const calculation = buildCompatibilityTwoBirthResearchReading(own, partner, {
          requestId: binding.executionAttemptId,
          subjectPersonRef: 'self', targetPersonRef: 'partner',
          referenceDateTime: new Date().toISOString(),
          candidateScope: 'traditional_marital_palace_comparison',
        });
        const draft = calculation.internalServiceInterpretationDraft;
        if (draft === undefined) throw new HostHttpError(409, 'HOST_PAIR_ISSUE_INCOMPLETE',
          'Pair interpretation could not be constructed.');
        const material = buildT10PairSourceReadingMaterialV1(calculation.sourceScopeHandoff, draft);
        const display = (person: typeof calculation.report.subject) => ({
          year: person.pillars.find(pillar => pillar.slot === 'year'),
          month: person.pillars.find(pillar => pillar.slot === 'month'),
          day: person.pillars.find(pillar => pillar.slot === 'day'),
          hour: person.pillars.find(pillar => pillar.slot === 'hour'),
        });
        const pillarDisplay = (person: typeof calculation.report.subject) => {
          const pillars = display(person);
          const project = (pillar: (typeof pillars)['year']) =>
            pillar?.status === 'resolved'
              ? { status: 'resolved' as const, value: pillar.stemHanja! + pillar.branchHanja! }
              : { status: 'unavailable' as const };
          return { year: project(pillars.year), month: project(pillars.month),
            day: project(pillars.day), hour: project(pillars.hour) };
        };
        const issue = pairIssuer(binding, { birth: input.birth, partnerBirth: input.partnerBirth },
          material, [
            { role: 'self', pillars: pillarDisplay(calculation.report.subject) },
            { role: 'partner', pillars: pillarDisplay(calculation.report.target) },
          ]);
        sendJson(response, 200, issue.body, {
          [T10_PRODUCTION_PAIR_ISSUE_PROOF_HEADER_V1]:
            Buffer.from(JSON.stringify(issue.proof)).toString('base64url'),
          [PRODUCT_READING_LIFECYCLE_HEADER]: 'production-pair-issued',
        });
      } catch (error) {
        if (error instanceof TypeError) {
          sendJson(response, 400, { error: { code: 'HOST_INVALID_PAIR_ISSUE_REQUEST',
            message: 'Invalid pair issue request.' } });
        } else if (!handleKnownError(response, error)) {
          sendReadingOperationalError(response);
        }
      }
      return;
    }
    // Existing 12-menu browser path, served only by an authenticated Preview host.
    // The body is deliberately limited to birth facts. It does NOT accept
    // or infer any interpersonal T10 interpretation or client-supplied score.
    if (path === PRODUCT_PREVIEW_COMPATIBILITY_CHARTS_HTTP_PATH ||
        path === PRODUCT_PREVIEW_COMPATIBILITY_EVIDENCE_HTTP_PATH) {
      const withEvidence = path === PRODUCT_PREVIEW_COMPATIBILITY_EVIDENCE_HTTP_PATH;
      const previewAvailable =
        readingRoute.lifecycle === PRODUCT_READING_PREVIEW_LIFECYCLE ||
        secondaryReadingRoute?.lifecycle === PRODUCT_READING_PREVIEW_LIFECYCLE;
      if (!previewAvailable || readingHost === undefined ||
          authorizeReadingRequest === undefined ||
          (withEvidence && options.compatibilityEvidencePreviewEnabled !== true)) {
        sendJson(response, 404, {
          error: { code: 'HOST_ROUTE_NOT_FOUND', message: 'Route not found.' },
        });
        return;
      }
      if (method !== 'POST') {
        response.setHeader('allow', 'POST');
        sendJson(response, 405, {
          error: { code: 'HOST_METHOD_NOT_ALLOWED', message: 'POST is required.' },
        });
        return;
      }
      if (!authorizeReadingRequest(request)) {
        sendAuthRequired(response);
        return;
      }
      try {
        const data = await readJsonBody(request, bodyLimit);
        if (data === null || typeof data !== 'object' || Array.isArray(data)) {
          throw new HostHttpError(400, 'HOST_INVALID_PREVIEW_REQUEST', 'Two birth inputs are required.');
        }
        const body = data as Record<string, unknown>;
        const candidateScope = withEvidence && body.candidateScope === 'traditional_marital_palace_comparison'
          ? body.candidateScope : undefined;
        if (Object.keys(body).length !== (candidateScope === undefined ? 2 : 3) ||
            !Object.hasOwn(body, 'birth') || !Object.hasOwn(body, 'partnerBirth')) {
          throw new HostHttpError(400, 'HOST_INVALID_PREVIEW_REQUEST', 'Two birth inputs are required.');
        }
        const nonce = request.headers[PAIR_REVIEW_NONCE_HEADER];
        if (nonce !== undefined && (!withEvidence || candidateScope === undefined ||
          pairReviewProof === undefined || typeof nonce !== 'string' || !/^[a-zA-Z0-9_-]{43}$/u.test(nonce))) {
          throw new HostHttpError(400, 'HOST_INVALID_PAIR_REVIEW_PROOF_REQUEST', 'Comparison review proof is unavailable.');
        }
        // The existing strict host parser forbids unknown calculation fields.
        const subjectBirth = parseProductHostCalculationRequest({ birth: body.birth });
        const targetBirth = parseProductHostCalculationRequest({ birth: body.partnerBirth });
        const result = buildCompatibilityTwoBirthResearchReading(
          subjectBirth, targetBirth, {
            requestId: 'internal-two-person-chart-preview',
            subjectPersonRef: 'self',
            targetPersonRef: 'partner',
            referenceDateTime: new Date().toISOString(),
            ...(candidateScope === undefined ? {} : { candidateScope }),
          },
        );
        const pillars = (person: typeof result.report.subject) =>
          Object.fromEntries(person.pillars.map(pillar => [pillar.slot, {
            status: pillar.status === 'resolved' ? 'resolved' : 'unavailable',
            ...(pillar.status !== 'resolved'
              ? {}
              : { value: pillar.stemHanja! + pillar.branchHanja! }),
          }]));
        const candidate = result.maritalDayBranchCandidate;
        const draft = result.pairReadingBoundaryDraft;
        const review = result.productReadingQualityReview;
        const internalDraft = result.internalServiceInterpretationDraft;
        const pairSourceMaterial = internalDraft === undefined ? undefined :
          buildT10PairSourceReadingMaterialV1(result.sourceScopeHandoff, internalDraft);
        const evidence = withEvidence ? {
          version: 'myeonghwa-cross-chart-structural-evidence-v1',
          matches: result.sourceScopeHandoff.crossChartStructuralMatches.map(match => {
            const projectFact = (role: 'subject' | 'target') => {
              const { factPath } = match[role];
              const pillar = result.report[role].pillars.find(
                item => factPath === `${role}.pillars.${item.slot}.value.${match.component}`,
              );
              const value = match.component === 'stem' ? pillar?.stemHanja : pillar?.branchHanja;
              if (pillar?.status !== 'resolved' || value === undefined) {
                throw new TypeError('Cross-chart match is outside the calculated chart.');
              }
              return { factPath, value };
            };
            return { ...match, subject: projectFact('subject'), target: projectFact('target') };
          }),
          ...(candidate === undefined ? {} : {
            maritalDayBranchCandidate: {
              scope: candidate.scope, state: candidate.state, source: candidate.source,
              review: candidate.review, pairwiseT10Admitted: candidate.pairwiseT10Admitted,
              ...(candidate.state === 'candidate_factor' ? {
                kind: candidate.evidence.kind, sourceInterpretation: candidate.sourceInterpretation,
              } : {}),
            },
          }),
          ...(pairSourceMaterial === undefined ? {} : {
            sourceReadingMaterial: pairSourceMaterial,
          }),
          ...(internalDraft === undefined || draft === undefined || review === undefined ? {} : {
            internalServiceInterpretation: {
              version: internalDraft.version,
              lifecycle: internalDraft.lifecycle,
              policyId: internalDraft.policy.policyId,
              policyVersion: internalDraft.policy.policyVersion,
              adoption: internalDraft.policy.adoption,
              academicThirdPartyApprovalRequired: internalDraft.policy.academicThirdPartyApprovalRequired,
              ruleCoverage: internalDraft.ruleCoverage,
              charts: [internalDraft.subject, internalDraft.target].map(chart => ({
                role: chart.personRef, calculationHash: chart.calculationHash,
              })),
              sentences: internalDraft.sentences,
              readyForOfficialIssue: internalDraft.readyForOfficialIssue,
              mayPublish: internalDraft.mayPublish,
              maySell: internalDraft.maySell,
            },
          }),
          ...(draft === undefined || review === undefined ? {} : {
            readingReview: {
              version: review.version,
              state: 'held',
              structuralSituation: draft.structuralSituation,
              charts: [draft.subject, draft.target].map(chart => ({
                role: chart.personRef, calculationHash: chart.calculationHash,
              })),
              sections: draft.sections.map(section => ({
                id: section.id, title: section.title, sentences: section.sentences,
              })),
              actualCompatibilityReadingReady: review.actualCompatibilityReadingReady,
              productEligibility: review.productEligibility,
              mayGrantOfficialAuthority: review.mayGrantOfficialAuthority,
            },
          }),
        } : undefined;
        const reviewBody = {
          lifecycle: 'internal_preview_only',
          coverage: 'calculation_facts_only',
          generatedInterpretationClaims: false,
          mayPublish: false,
          mayPersist: false,
          maySell: false,
          subjects: [
            { role: 'self', pillars: pillars(result.report.subject) },
            { role: 'partner', pillars: pillars(result.report.target) },
          ],
          ...(evidence === undefined ? {} : { evidence }),
          explanation: '두 명식은 각각 실제 출생정보로 계산했습니다. ' +
            '두 사람 사이의 T10 궁합 해석과 결혼·갈등·점수 판단은 승인되지 않았습니다.',
          limitations: result.report.limitations,
        };
        const extraHeaders: Record<string, string> = {
          [PRODUCT_READING_LIFECYCLE_HEADER]: PRODUCT_READING_PREVIEW_LIFECYCLE,
        };
        if (nonce !== undefined && pairReviewProof !== undefined) {
          if (draft === undefined || review === undefined) {
            throw new HostHttpError(409, 'HOST_PAIR_REVIEW_INCOMPLETE', 'Comparison review is incomplete.');
          }
          const payload = {
            version: PAIR_REVIEW_VERSION, keyId: pairReviewProof.keyId, nonce, state: 'held',
            requestBodyHash: deterministicContentHash(body),
            responseBodyHash: deterministicContentHash(JSON.parse(JSON.stringify(reviewBody))),
          };
          const signature = sign(null, Buffer.from(PAIR_REVIEW_VERSION + '\0' + deterministicContentHash(payload)),
            pairReviewProof.signingKey).toString('base64url');
          extraHeaders[PAIR_REVIEW_PROOF_HEADER] = Buffer.from(JSON.stringify({ payload, signature })).toString('base64url');
        }
        sendJson(response, 200, reviewBody, extraHeaders);
      } catch (error) {
        if (!handleKnownError(response, error)) sendReadingOperationalError(response);
      }
      return;
    }
    // A Preview-only transport; not available on production /api/readings
    // unless a distinct Preview host was explicitly supplied.
    if (path === PRODUCT_PREVIEW_NATAL_FIVE_DOMAIN_HTTP_PATH) {
      const previewHost = readingRoute.lifecycle === PRODUCT_READING_PREVIEW_LIFECYCLE
        ? readingHost
        : secondaryReadingRoute?.lifecycle === PRODUCT_READING_PREVIEW_LIFECYCLE
          ? secondaryReadingHost
          : undefined;
      if (previewHost?.requestNatalFiveDomains === undefined) {
        sendJson(response, 404, {
          error: { code: 'HOST_ROUTE_NOT_FOUND', message: 'Route not found.' },
        });
        return;
      }
      if (method !== 'POST') {
        response.setHeader('allow', 'POST');
        sendJson(response, 405, {
          error: { code: 'HOST_METHOD_NOT_ALLOWED', message: 'POST is required.' },
        });
        return;
      }
      if (authorizeReadingRequest !== undefined && !authorizeReadingRequest(request)) {
        sendAuthRequired(response);
        return;
      }
      try {
        const body = await readJsonBody(request, bodyLimit);
        const bundle = await previewHost.requestNatalFiveDomains(body);
        // Preserve each independently admitted domain response. The batch
        // does not authorize new combined meanings or Official delivery.
        const admitted = {
          ...bundle,
          domains: bundle.domains.map(item => ({
            ...item, response: admitProductReadingResponse(item.response),
          })),
        };
        sendJson(response, 200, admitted, {
          [PRODUCT_READING_LIFECYCLE_HEADER]: PRODUCT_READING_PREVIEW_LIFECYCLE,
        });
      } catch (error) {
        if (!handleKnownError(response, error)) sendReadingOperationalError(response);
      }
      return;
    }
    const matchedReading =
      path === readingRoute.path && readingHost !== undefined
        ? { host: readingHost, route: readingRoute }
        : secondaryReadingHost !== undefined &&
            secondaryReadingRoute !== undefined &&
            path === secondaryReadingRoute.path
          ? { host: secondaryReadingHost, route: secondaryReadingRoute }
          : undefined;
    if (matchedReading !== undefined) {
      if (method !== 'POST') {
        response.setHeader('allow', 'POST');
        sendJson(response, 405, {
          error: { code: 'HOST_METHOD_NOT_ALLOWED', message: 'POST is required.' },
        });
        return;
      }
      if (authorizeReadingRequest !== undefined && !authorizeReadingRequest(request)) {
        sendAuthRequired(response);
        return;
      }
      try {
        const body = await readJsonBody(request, bodyLimit);
        const preparedAttemptId = request.headers[SAJU_A4_PREPARED_ATTEMPT_HEADER_V1];
        let sourceRef: string | undefined;
        const execute = () => matchedReading.host.requestReading(body);
        let result: Awaited<ReturnType<MyeonghwaProductHost['requestReading']>>;

        if (preparedAttemptId !== undefined ||
            (a4SourceCapture !== undefined && matchedReading.route.path === '/api/readings')) {
          if (matchedReading.route.path !== '/api/readings' ||
              a4SourceCapture === undefined ||
              typeof preparedAttemptId !== 'string' ||
              !SAJU_A4_UUID_V1.test(preparedAttemptId)) {
            throw new HostHttpError(
              409, 'HOST_A4_SOURCE_ADMISSION_REQUIRED',
              'A4 official provider capture requires a verified server attempt.',
            );
          }
          result = await a4SourceCapture.withPreparedAttempt(
            { executionAttemptId: preparedAttemptId },
            async (issuedRef) => {
              if (!SAJU_A4_REF_V1.test(issuedRef)) {
                throw new HostHttpError(
                  409, 'HOST_A4_SOURCE_REF_INVALID',
                  'Saju source issued an invalid external request reference.',
                );
              }
              sourceRef = issuedRef;
              return execute();
            },
          );
        } else {
          result = await execute();
        }
        const admitted = admitProductReadingResponse(result);
        sendJson(response, 200, admitted, {
          [PRODUCT_READING_RESPONSE_ADMISSION_HEADER]: PRODUCT_READING_RESPONSE_VERSION,
          ...(sourceRef === undefined
            ? {}
            : { [SAJU_A4_SOURCE_REF_HEADER_V1]: sourceRef }),
          ...(matchedReading.route.lifecycle === undefined
            ? {}
            : {
                [PRODUCT_READING_LIFECYCLE_HEADER]:
                  matchedReading.route.lifecycle,
              }),
        });
      } catch (error) {
        if (!handleKnownError(response, error)) sendReadingOperationalError(response);
      }
      return;
    }

    sendJson(response, 404, {
      error: { code: 'HOST_ROUTE_NOT_FOUND', message: 'Route not found.' },
    });
  });
}

export function createMyeonghwaProductionCalculationHostServer(
  options: MyeonghwaProductionCalculationHostServerOptions = {},
): Server {
  const { serviceBearer, previousServiceBearer, ...serverOptions } = options;
  const authorizeCalculationRequest = createMyeonghwaProductionServiceBearerAuthorizer({
    activeBearer: serviceBearer,
    previousBearer: previousServiceBearer,
  });
  return createMyeonghwaHttpServer(undefined, serverOptions, authorizeCalculationRequest);
}


export function createMyeonghwaProductionProductHostServer(
  readingHost: MyeonghwaProductHost,
  options: MyeonghwaProductionProductHostServerOptions = {},
  faceGovernedHandoffHost?: FaceGovernedHandoffRuntimeHostV1,
): Server {
  const { serviceBearer, previousServiceBearer, a4SourceCapture, ...serverOptions } = options;
  const authorizeRequest = createMyeonghwaProductionServiceBearerAuthorizer({
    activeBearer: serviceBearer,
    previousBearer: previousServiceBearer,
  });
  return createMyeonghwaHttpServer(
    readingHost,
    serverOptions,
    authorizeRequest,
    authorizeRequest,
    PRODUCT_READING_ROUTE,
    undefined,
    undefined,
    faceGovernedHandoffHost,
    a4SourceCapture,
  );
}

export function createMyeonghwaProductionPreviewHostServer(
  readingHost: MyeonghwaProductHost,
  options: MyeonghwaProductionProductHostServerOptions = {},
  faceGovernedHandoffHost?: FaceGovernedHandoffRuntimeHostV1,
): Server {
  const { serviceBearer, previousServiceBearer, a4SourceCapture, ...serverOptions } = options;
  if (a4SourceCapture !== undefined) throw new TypeError('A4 source capture cannot be installed on Preview');
  const authorizeRequest = createMyeonghwaProductionServiceBearerAuthorizer({
    activeBearer: serviceBearer,
    previousBearer: previousServiceBearer,
  });
  return createMyeonghwaHttpServer(
    readingHost,
    serverOptions,
    authorizeRequest,
    authorizeRequest,
    PREVIEW_READING_ROUTE,
    undefined,
    undefined,
    faceGovernedHandoffHost,
  );
}

export function createMyeonghwaProductionReadingHostServer(
  productionReadingHost: MyeonghwaProductHost,
  previewReadingHost: MyeonghwaProductHost,
  options: MyeonghwaProductionProductHostServerOptions = {},
  faceGovernedHandoffHost?: FaceGovernedHandoffRuntimeHostV1,
): Server {
  const { serviceBearer, previousServiceBearer, a4SourceCapture, ...serverOptions } = options;
  const authorizeRequest = createMyeonghwaProductionServiceBearerAuthorizer({
    activeBearer: serviceBearer,
    previousBearer: previousServiceBearer,
  });
  return createMyeonghwaHttpServer(
    productionReadingHost,
    serverOptions,
    authorizeRequest,
    authorizeRequest,
    PRODUCT_READING_ROUTE,
    previewReadingHost,
    PREVIEW_READING_ROUTE,
    faceGovernedHandoffHost,
    a4SourceCapture,
  );
}

export function createMyeonghwaProductHostServer(
  dependencies: MyeonghwaProductHostDependencies,
  options: MyeonghwaProductHostServerOptions = {},
): Server {
  return createMyeonghwaHttpServer(createMyeonghwaProductHost(dependencies), options);
}
