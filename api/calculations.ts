import { ProductHostRequestError, parseProductHostCalculationRequest } from '../src/host/product-host.js';
import {
  PRODUCTION_CALCULATION_HTTP_RESPONSE_SCHEMA_VERSION,
  serializeAuthorizedProductionCalculationHttpResponseV1,
} from '../src/host/production-calculation-http-contract.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../src/production/production-calculation-runtime.js';

const POST_METHOD = 'POST' as const;
const MAX_REQUEST_BYTES = 16 * 1024;

function json(status: number, payload: unknown, headers: Record<string, string> = {}): Response {
  return Response.json(payload, {
    status,
    headers: {
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
      ...headers,
    },
  });
}

function contentType(request: Request): string {
  return request.headers.get('content-type')?.split(';', 1)[0]?.trim().toLowerCase() ?? '';
}

function contentLength(request: Request): number | undefined {
  const value = request.headers.get('content-length');
  if (value === null) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : Number.NaN;
}

async function readJsonBody(request: Request): Promise<unknown> {
  if (contentType(request) !== 'application/json') {
    throw new HttpRequestError(415, 'HOST_UNSUPPORTED_MEDIA_TYPE', 'application/json is required.');
  }

  const declaredLength = contentLength(request);
  if (declaredLength !== undefined && (!Number.isFinite(declaredLength) || declaredLength > MAX_REQUEST_BYTES)) {
    throw new HttpRequestError(
      declaredLength > MAX_REQUEST_BYTES ? 413 : 400,
      declaredLength > MAX_REQUEST_BYTES ? 'HOST_REQUEST_TOO_LARGE' : 'HOST_INVALID_CONTENT_LENGTH',
      declaredLength > MAX_REQUEST_BYTES
        ? 'Request body exceeds the configured limit.'
        : 'Invalid Content-Length header.',
    );
  }

  const bytes = new Uint8Array(await request.arrayBuffer());
  if (bytes.byteLength > MAX_REQUEST_BYTES) {
    throw new HttpRequestError(413, 'HOST_REQUEST_TOO_LARGE', 'Request body exceeds the configured limit.');
  }
  if (bytes.byteLength === 0) {
    throw new HttpRequestError(400, 'HOST_INVALID_JSON', 'Request body is required.');
  }

  try {
    return JSON.parse(new TextDecoder().decode(bytes)) as unknown;
  } catch {
    throw new HttpRequestError(400, 'HOST_INVALID_JSON', 'Request body must contain valid JSON.');
  }
}

class HttpRequestError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = 'HttpRequestError';
    this.status = status;
    this.code = code;
  }
}

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== POST_METHOD) {
      return json(
        405,
        { error: { code: 'HOST_METHOD_NOT_ALLOWED', message: 'POST is required.' } },
        { Allow: POST_METHOD },
      );
    }

    try {
      const body = await readJsonBody(request);
      const input = parseProductHostCalculationRequest(body);
      const result = calculateAuthorizedMyeonghwaProductionSnapshot(input);
      const response = serializeAuthorizedProductionCalculationHttpResponseV1(result);
      if (response.responseSchemaVersion !== PRODUCTION_CALCULATION_HTTP_RESPONSE_SCHEMA_VERSION) {
        throw new Error('Production calculation response schema drifted.');
      }
      return json(200, response);
    } catch (error) {
      if (error instanceof HttpRequestError) {
        return json(error.status, { error: { code: error.code, message: error.message } });
      }
      if (error instanceof ProductHostRequestError) {
        return json(400, {
          error: {
            code: `HOST_${error.code}`,
            message: 'The request payload is invalid.',
          },
        });
      }
      return json(500, {
        error: {
          code: 'HOST_CALCULATION_EXECUTION_FAILED',
          message: 'The calculation service could not complete this request.',
        },
      });
    }
  },
};
