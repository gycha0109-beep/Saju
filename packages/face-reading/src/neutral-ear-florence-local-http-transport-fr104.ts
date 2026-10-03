import {
  createNeutralEarFlorenceByteAdapterFR104,
  type NeutralEarFlorenceByteAdapterFR104V1,
  type NeutralEarFlorenceHostInvocationResultFR104V1,
  type NeutralEarFlorenceHostInvokerFR104V1,
} from './neutral-ear-provider-byte-adapters-fr104.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR104_FLORENCE_LOCAL_HTTP_ENDPOINT =
  '/runtime/fr104/florence' as const;

export interface NeutralEarFlorenceLocalHttpTransportFR104V1 {
  readonly schemaVersion:
    'fr104-neutral-ear-florence-local-http-transport-v1';
  readonly authorityState:
    'repository_native_local_transport_only_no_provider_or_laterality_authority';
  readonly endpoint: string;
  readonly invoke: NeutralEarFlorenceHostInvokerFR104V1;
  readonly transportBoundary: {
    readonly requestBody: 'exact_rgba8_bytes';
    readonly filePersistenceUsed: false;
    readonly multipartEncodingUsed: false;
    readonly base64EncodingUsed: false;
    readonly responseIncludesRawProviderOutput: false;
    readonly responseIncludesRawCandidatePolygons: false;
    readonly anatomicalLateralityAuthorized: false;
    readonly productionAuthorization: false;
  };
}

export type NeutralEarFlorenceFetchFR104V1 = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;

const LOCAL_HTTP_ADAPTERS = new WeakSet<object>();

export interface NeutralEarFlorenceLocalHttpBindingFR104V1 {
  readonly schemaVersion:
    'fr104-neutral-ear-florence-local-http-binding-v1';
  readonly transport:
    NeutralEarFlorenceLocalHttpTransportFR104V1;
  readonly adapter:
    NeutralEarFlorenceByteAdapterFR104V1;
}


function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-104 Florence local HTTP transport ${message}`,
  );
}

function validateInput(input: Readonly<{
  rgbaBytes: Uint8Array;
  width: number;
  height: number;
  providerRunRef: string;
}>): void {
  if (!(input.rgbaBytes instanceof Uint8Array)) {
    fail('rgbaBytes must be a Uint8Array.');
  }
  if (
    !Number.isInteger(input.width)
    || input.width <= 0
    || !Number.isInteger(input.height)
    || input.height <= 0
  ) {
    fail('width and height must be positive integers.');
  }
  const expected = input.width * input.height * 4;
  if (
    !Number.isSafeInteger(expected)
    || input.rgbaBytes.byteLength !== expected
  ) {
    fail('rgbaBytes length must equal width * height * 4.');
  }
  if (
    typeof input.providerRunRef !== 'string'
    || !/^[A-Za-z0-9][A-Za-z0-9._:/-]{0,255}$/u.test(
      input.providerRunRef,
    )
  ) {
    fail('providerRunRef must be a bounded opaque reference.');
  }
}

function validateResult(
  value: unknown,
  providerRunRef: string,
): NeutralEarFlorenceHostInvocationResultFR104V1 {
  if (typeof value !== 'object' || value === null) {
    fail('response JSON must be an object.');
  }
  const result =
    value as NeutralEarFlorenceHostInvocationResultFR104V1;
  const allowedStatuses = new Set([
    'candidate_polygon',
    'unavailable',
    'ambiguous',
  ]);
  const exactKeys = new Set([
    'schemaVersion',
    'authorityState',
    'providerRunRef',
    'leftPromptStatus',
    'rightPromptStatus',
    'leftCandidateCount',
    'rightCandidateCount',
    'promptSideConsumedAsAnatomicalSide',
    'rawProviderResponsePersisted',
    'rawPolygonBundleReturned',
    'validatedExternalEarObservationAuthorized',
    'anatomicalLateralityAuthorized',
  ]);
  const unexpected = Object.keys(result)
    .find((key) => !exactKeys.has(key));
  if (
    unexpected !== undefined
    || result.schemaVersion
      !== 'fr104-neutral-ear-florence-host-invocation-result-v1'
    || result.authorityState
      !== 'provider_candidate_summary_only_no_ear_acceptance'
    || result.providerRunRef !== providerRunRef
    || !allowedStatuses.has(result.leftPromptStatus)
    || !allowedStatuses.has(result.rightPromptStatus)
    || !Number.isInteger(result.leftCandidateCount)
    || result.leftCandidateCount < 0
    || !Number.isInteger(result.rightCandidateCount)
    || result.rightCandidateCount < 0
    || result.promptSideConsumedAsAnatomicalSide !== false
    || result.rawProviderResponsePersisted !== false
    || result.rawPolygonBundleReturned !== false
    || result.validatedExternalEarObservationAuthorized !== false
    || result.anatomicalLateralityAuthorized !== false
  ) {
    fail('response JSON is malformed or widens authority.');
  }
  return Object.freeze({ ...result });
}

export function createNeutralEarFlorenceLocalHttpTransportFR104(
  options: Readonly<{
    endpoint?: string;
    fetchImpl?: NeutralEarFlorenceFetchFR104V1;
  }> = Object.freeze({}),
): NeutralEarFlorenceLocalHttpTransportFR104V1 {
  const endpoint =
    options.endpoint ?? FR104_FLORENCE_LOCAL_HTTP_ENDPOINT;
  const defaultFetch:
    NeutralEarFlorenceFetchFR104V1 | undefined =
    typeof globalThis.fetch === 'function'
      ? globalThis.fetch.bind(globalThis)
      : undefined;
  const fetchImpl = options.fetchImpl ?? defaultFetch;

  if (
    typeof endpoint !== 'string'
    || endpoint.trim().length === 0
    || typeof fetchImpl !== 'function'
  ) {
    fail('endpoint and fetch implementation are required.');
  }

  const invoke: NeutralEarFlorenceHostInvokerFR104V1 =
    async (input) => {
      validateInput(input);
      const requestBuffer = new ArrayBuffer(
        input.rgbaBytes.byteLength,
      );
      new Uint8Array(requestBuffer).set(input.rgbaBytes);
      const response = await fetchImpl(endpoint, {
        method: 'POST',
        headers: {
          'content-type': 'application/octet-stream',
          'x-fr104-schema-version':
            'fr104-florence-rgba-host-request-v1',
          'x-fr104-pixel-format': 'rgba8',
          'x-fr104-provider-run-ref': input.providerRunRef,
          'x-fr104-width': String(input.width),
          'x-fr104-height': String(input.height),
          'x-fr104-byte-length':
            String(input.rgbaBytes.byteLength),
        },
        body: requestBuffer,
        cache: 'no-store',
        credentials: 'same-origin',
      });

      if (!response.ok) {
        const detail = (await response.text()).slice(0, 512);
        fail(
          `local Florence endpoint returned HTTP ${response.status}`
          + (detail ? `: ${detail}` : '.'),
        );
      }

      let parsed: unknown;
      try {
        parsed = await response.json();
      } catch {
        fail('local Florence endpoint returned invalid JSON.');
      }
      return validateResult(parsed, input.providerRunRef);
    };

  return Object.freeze({
    schemaVersion:
      'fr104-neutral-ear-florence-local-http-transport-v1' as const,
    authorityState:
      'repository_native_local_transport_only_no_provider_or_laterality_authority' as const,
    endpoint,
    invoke,
    transportBoundary: Object.freeze({
      requestBody: 'exact_rgba8_bytes' as const,
      filePersistenceUsed: false as const,
      multipartEncodingUsed: false as const,
      base64EncodingUsed: false as const,
      responseIncludesRawProviderOutput: false as const,
      responseIncludesRawCandidatePolygons: false as const,
      anatomicalLateralityAuthorized: false as const,
      productionAuthorization: false as const,
    }),
  });
}

export function createNeutralEarFlorenceLocalHttpBindingFR104(
  options: Readonly<{
    endpoint?: string;
    fetchImpl?: NeutralEarFlorenceFetchFR104V1;
  }> = Object.freeze({}),
): NeutralEarFlorenceLocalHttpBindingFR104V1 {
  const transport =
    createNeutralEarFlorenceLocalHttpTransportFR104(options);
  const adapter = createNeutralEarFlorenceByteAdapterFR104({
    hostInvoker: transport.invoke,
  });
  LOCAL_HTTP_ADAPTERS.add(adapter);
  return Object.freeze({
    schemaVersion:
      'fr104-neutral-ear-florence-local-http-binding-v1' as const,
    transport,
    adapter,
  });
}

export function isNeutralEarFlorenceLocalHttpByteAdapterFR104(
  adapter: NeutralEarFlorenceByteAdapterFR104V1,
): boolean {
  return LOCAL_HTTP_ADAPTERS.has(adapter);
}
