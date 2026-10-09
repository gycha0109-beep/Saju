import type {
  NeutralEarFlorenceHostInvokerFR104V1,
  NeutralEarFlorenceHostInvocationResultFR104V1,
} from './neutral-ear-provider-byte-adapters-fr104.js';
import { FaceAuthorityValidationError } from './validation.js';

export const NEUTRAL_EAR_FLORENCE_LIVE_MODEL_FR104 =
  Object.freeze({
    id: 'microsoft/Florence-2-base',
    revision:
      '5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac',
    task: '<REFERRING_EXPRESSION_SEGMENTATION>',
  });

export interface NeutralEarFlorenceLiveCandidatePointFR104V1 {
  readonly x: number;
  readonly y: number;
}

export interface NeutralEarFlorenceLiveCandidateFR104V1 {
  readonly candidateRef: string;
  readonly promptProvenance: 'left_prompt' | 'right_prompt';
  readonly coordinateFrame:
    'canonical_image_normalized_2d';
  readonly points:
    readonly NeutralEarFlorenceLiveCandidatePointFR104V1[];
  readonly exactStructuralDegeneracyAlreadyRejected: true;
  readonly promptSideConsumedAsAnatomicalSide: false;
}

export interface NeutralEarFlorenceCandidateSetHandleFR104V1 {
  readonly schemaVersion:
    'fr104-neutral-ear-florence-candidate-set-handle-v1';
  readonly authorityState:
    'opaque_ephemeral_provider_candidate_handle_only';
  readonly providerRunRef: string;
  readonly frame: {
    readonly width: number;
    readonly height: number;
  };
  readonly candidateCounts: {
    readonly leftPrompt: number;
    readonly rightPrompt: number;
    readonly total: number;
  };
  readonly rawCandidatePolygonsReturnedOnHandle: false;
  readonly anatomicalLateralityAuthorized: false;
}

export interface NeutralEarFlorenceLiveHostTransportFR104V1 {
  readonly schemaVersion:
    'fr104-neutral-ear-florence-live-host-transport-v1';
  readonly authorityState:
    'same_origin_ephemeral_rgba_transport_only';
  readonly hostInvoker: NeutralEarFlorenceHostInvokerFR104V1;
  readonly takeCandidateSetHandle: (
    providerRunRef: string,
  ) => NeutralEarFlorenceCandidateSetHandleFR104V1;
  readonly discardPendingCandidateSet: (
    providerRunRef: string,
  ) => boolean;
  readonly boundary: {
    readonly endpoint: string;
    readonly mediaType: 'application/octet-stream';
    readonly pixelFormat: 'rgba8';
    readonly rawRgbaPersistedByBrowserTransport: false;
    readonly rawProviderResponsePersistedByBrowserTransport: false;
    readonly providerCandidateGeometryExposedOnlyViaOpaqueHandle:
      true;
    readonly promptSideUsedAsAnatomicalSide: false;
    readonly validatedExternalEarObservationAuthorized: false;
    readonly anatomicalLateralityAuthorized: false;
    readonly traditionalBindingAuthorized: false;
    readonly productionAuthorization: false;
  };
}

export type NeutralEarFlorenceFetchFR104V1 = (
  input: string,
  init: Readonly<{
    method: 'POST';
    headers: Readonly<Record<string, string>>;
    body: Uint8Array;
  }>,
) => Promise<Readonly<{
  ok: boolean;
  status: number;
  json: () => Promise<unknown>;
}>>;

type MutableCandidate = {
  candidateRef: string;
  promptProvenance: 'left_prompt' | 'right_prompt';
  coordinateFrame: 'canonical_image_normalized_2d';
  points: Array<{ x: number; y: number }>;
  exactStructuralDegeneracyAlreadyRejected: true;
  promptSideConsumedAsAnatomicalSide: false;
};

type CandidateState = {
  consumed: boolean;
  left: MutableCandidate[];
  right: MutableCandidate[];
};

const ISSUED_HANDLES = new WeakSet<object>();
const HANDLE_STATE = new WeakMap<object, CandidateState>();
const INVOCATION_HANDLE = new WeakMap<
  object,
  NeutralEarFlorenceCandidateSetHandleFR104V1
>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-104 Florence live host transport ${message}`,
  );
}

function safeRunRef(value: string): string {
  if (
    value.length === 0
    || value.length > 256
    || /\s/u.test(value)
  ) {
    fail('providerRunRef must be a bounded non-whitespace string.');
  }
  return value;
}

function positiveInteger(value: number, label: string): number {
  if (!Number.isInteger(value) || value <= 0) {
    fail(`${label} must be a positive integer.`);
  }
  return value;
}

function unit(value: unknown, label: string): number {
  if (
    typeof value !== 'number'
    || !Number.isFinite(value)
    || value < 0
    || value > 1
  ) {
    fail(`${label} must be finite within [0,1].`);
  }
  return value;
}

function parseCandidates(
  value: unknown,
  prompt: 'left_prompt' | 'right_prompt',
  providerRunRef: string,
): MutableCandidate[] {
  if (!Array.isArray(value)) {
    fail(`${prompt} candidates must be an array.`);
  }
  return value.map((candidate, candidateIndex) => {
    if (typeof candidate !== 'object' || candidate === null) {
      fail(`${prompt} candidate must be an object.`);
    }
    const raw = candidate as {
      readonly candidateOrdinal?: unknown;
      readonly coordinateFrame?: unknown;
      readonly points?: unknown;
      readonly exactStructuralDegeneracyAlreadyRejected?: unknown;
    };
    if (
      !Number.isInteger(raw.candidateOrdinal)
      || (raw.candidateOrdinal as number) !== candidateIndex + 1
      || raw.coordinateFrame !== 'canonical_image_normalized_2d'
      || raw.exactStructuralDegeneracyAlreadyRejected !== true
      || !Array.isArray(raw.points)
      || raw.points.length < 3
    ) {
      fail(`${prompt} candidate structure is malformed.`);
    }
    const points = raw.points.map((point, pointIndex) => {
      if (typeof point !== 'object' || point === null) {
        fail(`${prompt} candidate point must be an object.`);
      }
      const candidatePoint =
        point as { readonly x?: unknown; readonly y?: unknown };
      return {
        x: unit(
          candidatePoint.x,
          `${prompt}[${candidateIndex}].points[${pointIndex}].x`,
        ),
        y: unit(
          candidatePoint.y,
          `${prompt}[${candidateIndex}].points[${pointIndex}].y`,
        ),
      };
    });
    return {
      candidateRef:
        `${providerRunRef}:florence:${prompt}:${candidateIndex + 1}`,
      promptProvenance: prompt,
      coordinateFrame:
        'canonical_image_normalized_2d' as const,
      points,
      exactStructuralDegeneracyAlreadyRejected: true as const,
      promptSideConsumedAsAnatomicalSide: false as const,
    };
  });
}

function statusFromCount(
  count: number,
): 'candidate_polygon' | 'unavailable' | 'ambiguous' {
  if (count === 0) return 'unavailable';
  if (count === 1) return 'candidate_polygon';
  return 'ambiguous';
}

function clearCandidateState(state: CandidateState): void {
  for (const candidate of [...state.left, ...state.right]) {
    for (const point of candidate.points) {
      point.x = 0;
      point.y = 0;
    }
    candidate.points.length = 0;
  }
  state.left.length = 0;
  state.right.length = 0;
  state.consumed = true;
}

function validateResponse(
  payload: unknown,
  expected: Readonly<{
    providerRunRef: string;
    width: number;
    height: number;
  }>,
): Readonly<{
  left: MutableCandidate[];
  right: MutableCandidate[];
}> {
  if (typeof payload !== 'object' || payload === null) {
    fail('HTTP response must be a JSON object.');
  }
  const response = payload as Record<string, unknown>;
  if (
    response.schemaVersion
      !== 'fr104-florence-live-worker-response-v1'
    || response.authorityState
      !== 'ephemeral_provider_candidates_only_no_ear_acceptance'
    || response.providerRunRef !== expected.providerRunRef
  ) {
    fail('HTTP response identity/schema mismatch.');
  }
  const frame = response.frame as
    | Record<string, unknown>
    | undefined;
  if (
    frame?.width !== expected.width
    || frame?.height !== expected.height
    || frame?.pixelFormat !== 'rgba8'
  ) {
    fail('HTTP response frame metadata mismatch.');
  }
  const model = response.model as
    | Record<string, unknown>
    | undefined;
  if (
    model?.id !== NEUTRAL_EAR_FLORENCE_LIVE_MODEL_FR104.id
    || model?.revision
      !== NEUTRAL_EAR_FLORENCE_LIVE_MODEL_FR104.revision
    || model?.task !== NEUTRAL_EAR_FLORENCE_LIVE_MODEL_FR104.task
  ) {
    fail('HTTP response Florence model pin mismatch.');
  }
  const prompts = response.prompts as
    | Record<string, unknown>
    | undefined;
  if (
    prompts?.sideLabelsAuthoritative !== false
    || prompts?.anatomicalLateralityAssigned !== false
  ) {
    fail('HTTP response prompt authority boundary drift.');
  }
  const privacy = response.privacy as
    | Record<string, unknown>
    | undefined;
  const authority = response.authority as
    | Record<string, unknown>
    | undefined;
  if (
    privacy?.rawRgbaPersisted !== false
    || privacy?.rawProviderResponseReturned !== false
    || privacy?.generatedTextReturned !== false
    || privacy?.sourceImageDigestComputed !== false
    || privacy?.candidateGeometryReturnedEphemeral !== true
    || authority?.validatedExternalEarObservationAuthorized !== false
    || authority?.anatomicalLateralityAuthorized !== false
    || authority?.traditionalBindingAuthorized !== false
    || authority?.productionAuthorization !== false
  ) {
    fail('HTTP response privacy/authority boundary drift.');
  }

  const parsePrompt = (
    key: 'left' | 'right',
    prompt: 'left_prompt' | 'right_prompt',
  ) => {
    const value = prompts?.[key];
    if (typeof value !== 'object' || value === null) {
      fail(`${key} prompt result is missing.`);
    }
    const result = value as Record<string, unknown>;
    const candidates = parseCandidates(
      result.candidates,
      prompt,
      expected.providerRunRef,
    );
    if (
      result.candidateCount !== candidates.length
      || result.status !== (
        candidates.length === 0
          ? 'unavailable'
          : 'candidate_polygon'
      )
      || result.exactDegeneracyGateApplied !== true
      || result.numericAcceptanceThresholdApplied !== false
    ) {
      fail(`${key} prompt candidate summary mismatch.`);
    }
    return candidates;
  };

  return Object.freeze({
    left: parsePrompt('left', 'left_prompt'),
    right: parsePrompt('right', 'right_prompt'),
  });
}

export function createNeutralEarFlorenceLiveHostTransportFR104(
  input: Readonly<{
    endpoint?: string;
    fetchImpl?: NeutralEarFlorenceFetchFR104V1;
  }> = Object.freeze({}),
): NeutralEarFlorenceLiveHostTransportFR104V1 {
  const endpoint =
    input.endpoint ?? '/runtime/fr104/florence';
  if (
    typeof endpoint !== 'string'
    || endpoint.length === 0
    || !endpoint.startsWith('/')
  ) {
    fail('endpoint must be a non-empty same-origin path.');
  }

  const fetchImpl =
    input.fetchImpl
    ?? (
      typeof globalThis.fetch === 'function'
        ? globalThis.fetch.bind(globalThis) as unknown as
          NeutralEarFlorenceFetchFR104V1
        : undefined
    );
  if (fetchImpl === undefined) {
    fail('fetch implementation is unavailable.');
  }

  const pendingByRunRef =
    new Map<string, NeutralEarFlorenceCandidateSetHandleFR104V1>();

  const hostInvoker: NeutralEarFlorenceHostInvokerFR104V1 =
    async ({ rgbaBytes, width, height, providerRunRef }) => {
      safeRunRef(providerRunRef);
      positiveInteger(width, 'width');
      positiveInteger(height, 'height');
      if (!(rgbaBytes instanceof Uint8Array)) {
        fail('rgbaBytes must be Uint8Array.');
      }
      if (rgbaBytes.byteLength !== width * height * 4) {
        fail('RGBA byte length must equal width * height * 4.');
      }
      if (pendingByRunRef.has(providerRunRef)) {
        fail('providerRunRef already has an unconsumed candidate handle.');
      }

      const response = await fetchImpl(endpoint, {
        method: 'POST',
        headers: Object.freeze({
          'content-type': 'application/octet-stream',
          'x-fr104-schema-version':
            'fr104-florence-live-http-v1',
          'x-fr104-provider-run-ref': providerRunRef,
          'x-fr104-width': String(width),
          'x-fr104-height': String(height),
        }),
        body: rgbaBytes,
      });
      if (!response.ok) {
        fail(`live host HTTP request failed with status ${response.status}.`);
      }
      const parsed = validateResponse(
        await response.json(),
        { providerRunRef, width, height },
      );

      const state: CandidateState = {
        consumed: false,
        left: parsed.left,
        right: parsed.right,
      };
      const handle:
        NeutralEarFlorenceCandidateSetHandleFR104V1 =
        Object.freeze({
          schemaVersion:
            'fr104-neutral-ear-florence-candidate-set-handle-v1' as const,
          authorityState:
            'opaque_ephemeral_provider_candidate_handle_only' as const,
          providerRunRef,
          frame: Object.freeze({ width, height }),
          candidateCounts: Object.freeze({
            leftPrompt: state.left.length,
            rightPrompt: state.right.length,
            total: state.left.length + state.right.length,
          }),
          rawCandidatePolygonsReturnedOnHandle: false as const,
          anatomicalLateralityAuthorized: false as const,
        });
      ISSUED_HANDLES.add(handle);
      HANDLE_STATE.set(handle, state);
      pendingByRunRef.set(providerRunRef, handle);

      const result:
        NeutralEarFlorenceHostInvocationResultFR104V1 =
        Object.freeze({
          schemaVersion:
            'fr104-neutral-ear-florence-host-invocation-result-v1' as const,
          authorityState:
            'provider_candidate_summary_only_no_ear_acceptance' as const,
          providerRunRef,
          leftPromptStatus: statusFromCount(state.left.length),
          rightPromptStatus: statusFromCount(state.right.length),
          leftCandidateCount: state.left.length,
          rightCandidateCount: state.right.length,
          promptSideConsumedAsAnatomicalSide: false as const,
          rawProviderResponsePersisted: false as const,
          rawPolygonBundleReturned: false as const,
          validatedExternalEarObservationAuthorized:
            false as const,
          anatomicalLateralityAuthorized: false as const,
        });
      INVOCATION_HANDLE.set(result, handle);
      return result;
    };

  return Object.freeze({
    schemaVersion:
      'fr104-neutral-ear-florence-live-host-transport-v1' as const,
    authorityState:
      'same_origin_ephemeral_rgba_transport_only' as const,
    hostInvoker,
    takeCandidateSetHandle(providerRunRef: string) {
      safeRunRef(providerRunRef);
      const handle = pendingByRunRef.get(providerRunRef);
      if (handle === undefined) {
        fail('no pending candidate handle exists for providerRunRef.');
      }
      pendingByRunRef.delete(providerRunRef);
      return handle;
    },
    discardPendingCandidateSet(providerRunRef: string) {
      safeRunRef(providerRunRef);
      const handle = pendingByRunRef.get(providerRunRef);
      if (handle === undefined) return false;
      pendingByRunRef.delete(providerRunRef);
      const state = HANDLE_STATE.get(handle);
      if (state !== undefined && !state.consumed) {
        clearCandidateState(state);
        HANDLE_STATE.delete(handle);
      }
      return true;
    },
    boundary: Object.freeze({
      endpoint,
      mediaType: 'application/octet-stream' as const,
      pixelFormat: 'rgba8' as const,
      rawRgbaPersistedByBrowserTransport: false as const,
      rawProviderResponsePersistedByBrowserTransport:
        false as const,
      providerCandidateGeometryExposedOnlyViaOpaqueHandle:
        true as const,
      promptSideUsedAsAnatomicalSide: false as const,
      validatedExternalEarObservationAuthorized:
        false as const,
      anatomicalLateralityAuthorized: false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),
  });
}

export function assertNeutralEarFlorenceCandidateSetBoundToInvocationFR104(
  summary: NeutralEarFlorenceHostInvocationResultFR104V1,
  handle: NeutralEarFlorenceCandidateSetHandleFR104V1,
): void {
  if (
    INVOCATION_HANDLE.get(summary) !== handle
    || !ISSUED_HANDLES.has(handle)
    || HANDLE_STATE.get(handle) === undefined
    || summary.providerRunRef !== handle.providerRunRef
    || summary.leftCandidateCount !== handle.candidateCounts.leftPrompt
    || summary.rightCandidateCount !== handle.candidateCounts.rightPrompt
  ) {
    fail(
      'candidate handle is not bound to the exact Florence invocation summary.',
    );
  }
}

export function consumeIssuedNeutralEarFlorenceCandidateSetFR104<T>(
  handle: NeutralEarFlorenceCandidateSetHandleFR104V1,
  callback: (
    candidates: Readonly<{
      leftPrompt:
        readonly NeutralEarFlorenceLiveCandidateFR104V1[];
      rightPrompt:
        readonly NeutralEarFlorenceLiveCandidateFR104V1[];
    }>,
  ) => T,
): T {
  if (
    !ISSUED_HANDLES.has(handle)
    || handle.schemaVersion
      !== 'fr104-neutral-ear-florence-candidate-set-handle-v1'
    || handle.authorityState
      !== 'opaque_ephemeral_provider_candidate_handle_only'
    || handle.rawCandidatePolygonsReturnedOnHandle !== false
    || handle.anatomicalLateralityAuthorized !== false
  ) {
    fail('candidate handle was not issued by the live transport.');
  }
  const state = HANDLE_STATE.get(handle);
  if (state === undefined || state.consumed) {
    fail('candidate handle has already been consumed or cleared.');
  }
  if (typeof callback !== 'function') {
    fail('candidate consumer callback must be a function.');
  }

  try {
    return callback(Object.freeze({
      leftPrompt: state.left,
      rightPrompt: state.right,
    }));
  } finally {
    clearCandidateState(state);
    HANDLE_STATE.delete(handle);
  }
}
