import { createServer, type IncomingMessage, type Server, type ServerResponse } from 'node:http';
import {
  createMyeonghwaSourceReadingProofHost,
  ProductHostRequestError,
  type MyeonghwaProductHostDependencies,
} from './product-host.js';
import { createMyeonghwaProductionServiceBearerAuthorizer } from './production-service-bearer-auth.js';
import { issueHeldSourceReadingTransportProofV1 } from '../reading/source-reading-transport-proof.js';

export const SOURCE_READING_PROOF_HTTP_PATH_V1 =
  '/api/internal/preview/source-readings' as const;
export const SOURCE_READING_PROOF_HTTP_VERSION_V1 =
  'myeonghwa-source-reading-proof-http-v1' as const;

const MAX_BODY_BYTES = 16 * 1024;
const NONCE = /^[a-zA-Z0-9_-]{22,128}$/u;
const ID = /^[a-zA-Z0-9._:-]{3,128}$/u;
const MAX_PROOF_TTL_MS = 120_000;

export interface MyeonghwaSourceReadingProofIssuerHttpOptionsV1 {
  readonly serviceBearer: string;
  readonly previousServiceBearer?: string;
  readonly issuer: string;
  readonly audience: string;
  readonly keyId: string;
  /** Dedicated HMAC secret; never reuse the service authentication bearer. */
  readonly keyBytes: Uint8Array;
  readonly ttlMs?: number;
  readonly nowMsFactory?: () => number;
  readonly maxRequestBytes?: number;
}

class SourceProofHttpError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
  ) {
    super(code);
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function onlyKeys(record: Record<string, unknown>, keys: readonly string[]): boolean {
  return Object.keys(record).length === keys.length
    && keys.every((key) => Object.hasOwn(record, key));
}

function sendJson(response: ServerResponse, status: number, body: unknown): void {
  response.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
  });
  response.end(JSON.stringify(body));
}

function failure(response: ServerResponse, status: number, code: string): void {
  sendJson(response, status, { error: { code, message: 'Source proof request unavailable.' } });
}

async function readJson(request: IncomingMessage, maxBytes: number): Promise<unknown> {
  if (request.headers['content-type']?.split(';', 1)[0]?.trim().toLowerCase()
    !== 'application/json') {
    throw new SourceProofHttpError(415, 'SOURCE_PROOF_UNSUPPORTED_MEDIA_TYPE');
  }
  const declared = request.headers['content-length'];
  if (declared !== undefined) {
    if (!/^(0|[1-9]\d*)$/u.test(declared)) {
      throw new SourceProofHttpError(400, 'SOURCE_PROOF_INVALID_CONTENT_LENGTH');
    }
    if (Number(declared) > maxBytes) {
      throw new SourceProofHttpError(413, 'SOURCE_PROOF_REQUEST_TOO_LARGE');
    }
  }
  const buffers: Buffer[] = [];
  let size = 0;
  for await (const chunk of request) {
    const next = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += next.length;
    if (size > maxBytes) {
      throw new SourceProofHttpError(413, 'SOURCE_PROOF_REQUEST_TOO_LARGE');
    }
    buffers.push(next);
  }
  if (size === 0) throw new SourceProofHttpError(400, 'SOURCE_PROOF_INVALID_JSON');
  try {
    return JSON.parse(Buffer.concat(buffers).toString('utf8')) as unknown;
  } catch {
    throw new SourceProofHttpError(400, 'SOURCE_PROOF_INVALID_JSON');
  }
}

function parseProofRequest(body: unknown): { nonce: string; request: unknown } {
  if (!isRecord(body) || !onlyKeys(body, ['nonce', 'request'])
    || typeof body.nonce !== 'string' || !NONCE.test(body.nonce)
    || !isRecord(body.request)) {
    throw new SourceProofHttpError(400, 'SOURCE_PROOF_INVALID_REQUEST');
  }
  return { nonce: body.nonce, request: body.request };
}

/**
 * Dedicated server-to-server Preview issuer. This factory deliberately mounts
 * no public Reading, calculation, static-asset or Character route.
 *
 * A successful proof authenticates transport content only; it never grants
 * Product/Production Interpretation, publication or Commerce authority.
 */
export function createMyeonghwaSourceReadingProofIssuerHttpServerV1(
  dependencies: MyeonghwaProductHostDependencies,
  options: MyeonghwaSourceReadingProofIssuerHttpOptionsV1,
): Server {
  const authorize = createMyeonghwaProductionServiceBearerAuthorizer({
    activeBearer: options.serviceBearer,
    previousBearer: options.previousServiceBearer,
  });
  const ttlMs = options.ttlMs ?? 60_000;
  const maxBytes = options.maxRequestBytes ?? MAX_BODY_BYTES;
  if (!ID.test(options.issuer) || !ID.test(options.audience) || !ID.test(options.keyId)
    || !(options.keyBytes instanceof Uint8Array) || options.keyBytes.byteLength < 32
    || !Number.isSafeInteger(ttlMs) || ttlMs < 1 || ttlMs > MAX_PROOF_TTL_MS
    || !Number.isSafeInteger(maxBytes) || maxBytes < 1 || maxBytes > MAX_BODY_BYTES
    || (options.nowMsFactory !== undefined && typeof options.nowMsFactory !== 'function')) {
    throw new TypeError('Invalid source proof issuer configuration.');
  }

  // Copy the secret at server initialization so subsequent caller mutation
  // cannot silently change the signing identity of a live issuer.
  const keyBytes = Uint8Array.from(options.keyBytes);
  const source = createMyeonghwaSourceReadingProofHost(dependencies);
  const nowMs = options.nowMsFactory ?? Date.now;

  return createServer(async (request, response) => {
    const path = new URL(request.url ?? '/', 'http://saju.local').pathname;
    if (path !== SOURCE_READING_PROOF_HTTP_PATH_V1) {
      failure(response, 404, 'SOURCE_PROOF_ROUTE_NOT_FOUND');
      return;
    }
    if (request.method !== 'POST') {
      response.setHeader('allow', 'POST');
      failure(response, 405, 'SOURCE_PROOF_METHOD_NOT_ALLOWED');
      return;
    }
    if (!authorize(request)) {
      failure(response, 401, 'SOURCE_PROOF_AUTH_REQUIRED');
      return;
    }

    try {
      const incoming = parseProofRequest(await readJson(request, maxBytes));
      const { response: readingResponse, readiness, executedRequestBody } =
        await source.requestReadingWithProofReadiness(incoming.request);
      if (readiness.state !== 'held') {
        failure(response, 409, 'SOURCE_PROOF_NOT_READY');
        return;
      }
      const issuedAtMs = nowMs();
      if (!Number.isSafeInteger(issuedAtMs) || issuedAtMs < 0) {
        throw new SourceProofHttpError(500, 'SOURCE_PROOF_EXECUTION_FAILED');
      }
      const proof = issueHeldSourceReadingTransportProofV1({
        issuer: options.issuer,
        audience: options.audience,
        keyId: options.keyId,
        keyBytes,
        nonce: incoming.nonce,
        executedRequestBody,
        response: readingResponse,
        readiness,
        issuedAtMs,
        ttlMs,
      });
      if (proof === null) {
        failure(response, 409, 'SOURCE_PROOF_NOT_READY');
        return;
      }
      sendJson(response, 200, {
        schemaVersion: SOURCE_READING_PROOF_HTTP_VERSION_V1,
        lifecycle: 'preview',
        state: 'held',
        response: readingResponse,
        proof,
        productionInterpretationAuthority: 'NOT_EVALUATED',
        releaseAuthorization: 'NOT_EVALUATED',
        canExecute: false,
        canPublish: false,
        canSell: false,
      });
    } catch (error) {
      if (error instanceof SourceProofHttpError) {
        failure(response, error.status, error.code);
      } else if (error instanceof ProductHostRequestError) {
        failure(response, 400, 'SOURCE_PROOF_INVALID_READING_REQUEST');
      } else {
        failure(response, 500, 'SOURCE_PROOF_EXECUTION_FAILED');
      }
    }
  });
}
