import { createServer, type IncomingMessage, type Server, type ServerResponse } from 'node:http';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../production/production-calculation-runtime.js';
import {
  createMyeonghwaProductHost,
  parseProductHostCalculationRequest,
  ProductHostRequestError,
  PRODUCT_HOST_VERSION,
  type MyeonghwaProductHost,
  type MyeonghwaProductHostDependencies,
} from './product-host.js';
import { PRODUCT_HOST_APP_SCRIPT, PRODUCT_HOST_PAGE } from './static-page.js';

export const DEFAULT_PRODUCT_HOST_MAX_REQUEST_BYTES = 16 * 1024;

export interface MyeonghwaProductHostServerOptions {
  maxRequestBytes?: number;
}

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

function sendJson(response: ServerResponse, status: number, payload: unknown): void {
  response.writeHead(status, jsonHeaders());
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
): Server {
  const bodyLimit = maxRequestBytes(options);

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
    if (path === '/healthz' && method === 'GET') {
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
      try {
        const body = await readJsonBody(request, bodyLimit);
        const input = parseProductHostCalculationRequest(body);
        const result = calculateAuthorizedMyeonghwaProductionSnapshot(input);
        sendJson(response, 200, result);
      } catch (error) {
        if (!handleKnownError(response, error)) sendCalculationOperationalError(response);
      }
      return;
    }
    if (path === '/api/readings' && readingHost !== undefined) {
      if (method !== 'POST') {
        response.setHeader('allow', 'POST');
        sendJson(response, 405, {
          error: { code: 'HOST_METHOD_NOT_ALLOWED', message: 'POST is required.' },
        });
        return;
      }
      try {
        const body = await readJsonBody(request, bodyLimit);
        const result = await readingHost.requestReading(body);
        sendJson(response, 200, result);
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
  options: MyeonghwaProductHostServerOptions = {},
): Server {
  return createMyeonghwaHttpServer(undefined, options);
}

export function createMyeonghwaProductHostServer(
  dependencies: MyeonghwaProductHostDependencies,
  options: MyeonghwaProductHostServerOptions = {},
): Server {
  return createMyeonghwaHttpServer(createMyeonghwaProductHost(dependencies), options);
}
