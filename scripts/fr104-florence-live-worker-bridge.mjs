import { Buffer } from 'node:buffer';
import { spawn } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

export const FR104_FLORENCE_LIVE_REQUEST_SCHEMA =
  'fr104-florence-live-worker-request-v1';
export const FR104_FLORENCE_LIVE_RESPONSE_SCHEMA =
  'fr104-florence-live-worker-response-v1';

const MAX_RGBA_BYTES = 32 * 1024 * 1024;
const MAX_HEADER_BYTES = 16 * 1024;
const MAX_RESPONSE_BYTES = 8 * 1024 * 1024;
const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, '..');
const defaultWorkerPath = resolve(
  repoRoot,
  'tools/face-reading/ear/run_florence2_ear_live_worker.py',
);

function fail(message) {
  throw new Error('FR104 Florence worker bridge ' + message);
}

function safeRunRef(value) {
  return (
    typeof value === 'string'
    && value.length > 0
    && value.length <= 256
    && !/\s/u.test(value)
  );
}

export function validateFr104FlorenceRgbaRequest(input) {
  if (typeof input !== 'object' || input === null) {
    fail('request must be an object.');
  }
  if (!safeRunRef(input.providerRunRef)) {
    fail('providerRunRef must be a bounded non-whitespace string.');
  }
  if (
    !Number.isInteger(input.width)
    || input.width <= 0
    || !Number.isInteger(input.height)
    || input.height <= 0
  ) {
    fail('width and height must be positive integers.');
  }
  if (!(input.rgbaBytes instanceof Uint8Array)) {
    fail('rgbaBytes must be a Uint8Array.');
  }
  const expected = input.width * input.height * 4;
  if (
    !Number.isSafeInteger(expected)
    || expected <= 0
    || expected > MAX_RGBA_BYTES
    || input.rgbaBytes.byteLength !== expected
  ) {
    fail(
      'RGBA byte length must equal width * height * 4 within the 32 MiB bound.',
    );
  }
}

export function encodeFr104FlorenceWorkerRequest(input) {
  validateFr104FlorenceRgbaRequest(input);
  const header = Buffer.from(JSON.stringify({
    schemaVersion: FR104_FLORENCE_LIVE_REQUEST_SCHEMA,
    providerRunRef: input.providerRunRef,
    width: input.width,
    height: input.height,
    pixelFormat: 'rgba8',
    byteLength: input.rgbaBytes.byteLength,
  }), 'utf8');
  if (header.byteLength <= 0 || header.byteLength > MAX_HEADER_BYTES) {
    fail('encoded request header is outside the governed bound.');
  }
  const prefix = Buffer.allocUnsafe(4);
  prefix.writeUInt32BE(header.byteLength, 0);
  return Buffer.concat([
    prefix,
    header,
    Buffer.from(
      input.rgbaBytes.buffer,
      input.rgbaBytes.byteOffset,
      input.rgbaBytes.byteLength,
    ),
  ]);
}

function validateResponse(response) {
  if (
    typeof response !== 'object'
    || response === null
    || response.schemaVersion !== FR104_FLORENCE_LIVE_RESPONSE_SCHEMA
  ) {
    fail('worker response schema mismatch.');
  }
  if (response.authorityState === 'transport_error_no_provider_authority') {
    const detail =
      typeof response.error?.message === 'string'
        ? response.error.message
        : 'unknown worker error';
    fail('worker rejected request: ' + detail);
  }
  if (
    response.authorityState
      !== 'ephemeral_provider_candidates_only_no_ear_acceptance'
    || response.authority?.validatedExternalEarObservationAuthorized
      !== false
    || response.authority?.anatomicalLateralityAuthorized !== false
    || response.authority?.traditionalBindingAuthorized !== false
    || response.authority?.productionAuthorization !== false
    || response.privacy?.rawRgbaPersisted !== false
    || response.privacy?.rawProviderResponseReturned !== false
    || response.privacy?.generatedTextReturned !== false
    || response.privacy?.sourceImageDigestComputed !== false
    || response.privacy?.candidateGeometryReturnedEphemeral !== true
  ) {
    fail('worker response authority/privacy boundary drift.');
  }
  return response;
}

export function decodeFr104FlorenceWorkerResponseFrame(frame) {
  const bytes = Buffer.from(frame);
  if (bytes.byteLength < 4) {
    fail('worker response frame is truncated.');
  }
  const length = bytes.readUInt32BE(0);
  if (
    length <= 0
    || length > MAX_RESPONSE_BYTES
    || bytes.byteLength !== length + 4
  ) {
    fail('worker response frame length is invalid.');
  }
  let parsed;
  try {
    parsed = JSON.parse(bytes.subarray(4).toString('utf8'));
  } catch (error) {
    fail(
      'worker response is not valid JSON: '
        + (error instanceof Error ? error.message : String(error)),
    );
  }
  return validateResponse(parsed);
}

export class Fr104FlorenceLiveWorkerBridge {
  #child = null;
  #stdoutBuffer = Buffer.alloc(0);
  #pending = [];
  #closed = false;
  #options;

  constructor(options = {}) {
    this.#options = Object.freeze({
      python: options.python?.trim()
        || process.env.PYTHON?.trim()
        || 'python',
      workerPath: options.workerPath || defaultWorkerPath,
      device: options.device?.trim()
        || process.env.FR104_FLORENCE_DEVICE?.trim()
        || 'auto',
      cwd: options.cwd || repoRoot,
    });
  }

  #ensureChild() {
    if (this.#closed) {
      fail('bridge is closed.');
    }
    if (this.#child !== null) return this.#child;

    const child = spawn(
      this.#options.python,
      [
        this.#options.workerPath,
        '--device',
        this.#options.device,
      ],
      {
        cwd: this.#options.cwd,
        stdio: ['pipe', 'pipe', 'pipe'],
      },
    );
    this.#child = child;
    this.#stdoutBuffer = Buffer.alloc(0);

    child.stdout.on('data', (chunk) => {
      this.#stdoutBuffer = Buffer.concat([
        this.#stdoutBuffer,
        Buffer.from(chunk),
      ]);
      this.#drainResponses();
    });

    let stderr = '';
    child.stderr.on('data', (chunk) => {
      stderr += Buffer.from(chunk).toString('utf8');
      if (stderr.length > 16_384) {
        stderr = stderr.slice(-16_384);
      }
    });

    child.once('error', (error) => {
      this.#failAll(
        new Error(
          'FR104 Florence worker bridge process error: '
            + error.message,
        ),
      );
    });

    child.once('exit', (code, signal) => {
      const detail =
        'worker exited'
        + ' code=' + String(code)
        + ' signal=' + String(signal)
        + (stderr ? ' stderr=' + stderr.trim() : '');
      this.#child = null;
      this.#failAll(new Error('FR104 Florence worker bridge ' + detail));
    });

    return child;
  }

  #failAll(error) {
    const pending = this.#pending.splice(0);
    this.#stdoutBuffer = Buffer.alloc(0);
    for (const item of pending) item.reject(error);
  }

  #drainResponses() {
    for (;;) {
      if (this.#stdoutBuffer.byteLength < 4) return;
      const length = this.#stdoutBuffer.readUInt32BE(0);
      if (length <= 0 || length > MAX_RESPONSE_BYTES) {
        const error = new Error(
          'FR104 Florence worker bridge response length is invalid.',
        );
        this.#failAll(error);
        this.#child?.kill();
        return;
      }
      if (this.#stdoutBuffer.byteLength < length + 4) return;

      const frame = this.#stdoutBuffer.subarray(0, length + 4);
      this.#stdoutBuffer =
        this.#stdoutBuffer.subarray(length + 4);
      const pending = this.#pending.shift();
      if (pending === undefined) {
        const error = new Error(
          'FR104 Florence worker bridge received an unsolicited response.',
        );
        this.#failAll(error);
        this.#child?.kill();
        return;
      }
      try {
        pending.resolve(
          decodeFr104FlorenceWorkerResponseFrame(frame),
        );
      } catch (error) {
        pending.reject(error);
      }
    }
  }

  invoke(input) {
    validateFr104FlorenceRgbaRequest(input);
    const child = this.#ensureChild();
    const frame = encodeFr104FlorenceWorkerRequest(input);
    return new Promise((resolvePromise, rejectPromise) => {
      this.#pending.push({
        resolve: resolvePromise,
        reject: rejectPromise,
      });
      child.stdin.write(frame, (error) => {
        if (error) {
          const index = this.#pending.findIndex(
            (item) => item.resolve === resolvePromise,
          );
          if (index >= 0) this.#pending.splice(index, 1);
          rejectPromise(
            new Error(
              'FR104 Florence worker bridge request write failed: '
                + error.message,
            ),
          );
        }
      });
    });
  }

  close() {
    this.#closed = true;
    const error = new Error(
      'FR104 Florence worker bridge closed before pending requests completed.',
    );
    this.#failAll(error);
    if (this.#child !== null) {
      this.#child.stdin.end();
      this.#child.kill();
      this.#child = null;
    }
  }
}

function selfTestResponse() {
  return {
    schemaVersion: FR104_FLORENCE_LIVE_RESPONSE_SCHEMA,
    authorityState:
      'ephemeral_provider_candidates_only_no_ear_acceptance',
    providerRunRef: 'fr104:bridge:self-test',
    frame: { width: 2, height: 1, pixelFormat: 'rgba8' },
    model: {
      id: 'microsoft/Florence-2-base',
      revision: 'fixture',
      task: '<REFERRING_EXPRESSION_SEGMENTATION>',
    },
    prompts: {
      left: {
        status: 'candidate_polygon',
        candidateCount: 1,
        candidates: [],
        rejectedDegenerateCount: 0,
        rejectionReasons: [],
        exactDegeneracyGateApplied: true,
        numericAcceptanceThresholdApplied: false,
      },
      right: {
        status: 'unavailable',
        candidateCount: 0,
        candidates: [],
        rejectedDegenerateCount: 0,
        rejectionReasons: [],
        exactDegeneracyGateApplied: true,
        numericAcceptanceThresholdApplied: false,
      },
      sideLabelsAuthoritative: false,
      anatomicalLateralityAssigned: false,
    },
    privacy: {
      rawRgbaPersisted: false,
      rawProviderResponseReturned: false,
      generatedTextReturned: false,
      sourceImageDigestComputed: false,
      candidateGeometryReturnedEphemeral: true,
    },
    authority: {
      validatedExternalEarObservationAuthorized: false,
      anatomicalLateralityAuthorized: false,
      traditionalBindingAuthorized: false,
      productionAuthorization: false,
    },
  };
}

function selfTest() {
  const request = {
    providerRunRef: 'fr104:bridge:self-test',
    width: 2,
    height: 1,
    rgbaBytes: Uint8Array.from([
      1, 2, 3, 255,
      4, 5, 6, 255,
    ]),
  };
  const encoded = encodeFr104FlorenceWorkerRequest(request);
  const headerLength = encoded.readUInt32BE(0);
  const header = JSON.parse(
    encoded.subarray(4, 4 + headerLength).toString('utf8'),
  );
  if (
    header.schemaVersion !== FR104_FLORENCE_LIVE_REQUEST_SCHEMA
    || header.byteLength !== 8
    || encoded.byteLength !== 4 + headerLength + 8
  ) {
    fail('request framing self-test failed.');
  }

  const payload = Buffer.from(
    JSON.stringify(selfTestResponse()),
    'utf8',
  );
  const prefix = Buffer.allocUnsafe(4);
  prefix.writeUInt32BE(payload.byteLength, 0);
  const decoded = decodeFr104FlorenceWorkerResponseFrame(
    Buffer.concat([prefix, payload]),
  );
  if (
    decoded.providerRunRef !== 'fr104:bridge:self-test'
    || decoded.authority.anatomicalLateralityAuthorized !== false
  ) {
    fail('response framing self-test failed.');
  }

  let rejected = false;
  try {
    validateFr104FlorenceRgbaRequest({
      ...request,
      rgbaBytes: Uint8Array.from([1, 2, 3]),
    });
  } catch {
    rejected = true;
  }
  if (!rejected) {
    fail('invalid RGBA length self-test was not rejected.');
  }
  process.stdout.write(
    'FR104 Florence live worker bridge self-test: PASS\n',
  );
}

if (process.argv.includes('--self-test')) {
  selfTest();
}
