import type {
  MediaPipeFaceLandmarkerResultFR25V1,
} from './mediapipe-eye-landmark-adapter-fr25.js';
import {
  DEFAULT_MEDIAPIPE_FACE_LANDMARKER_RUNTIME_FACTORY_FR26,
  type MediaPipeFaceLandmarkerRuntimeFactoryFR26V1,
} from './mediapipe-face-landmarker-runtime-fr26.js';
import { FaceAuthorityValidationError } from './validation.js';

export type NeutralEarProviderByteConsumerFR104V1 =
  | 'florence'
  | 'face_landmarker';

export interface NeutralEarRgba8FrameFR104V1 {
  readonly bytes: Uint8Array;
  readonly width: number;
  readonly height: number;
  readonly providerRunRef: string;
}

export interface NeutralEarFlorenceHostInvocationResultFR104V1 {
  readonly schemaVersion:
    'fr104-neutral-ear-florence-host-invocation-result-v1';
  readonly authorityState:
    'provider_candidate_summary_only_no_ear_acceptance';
  readonly providerRunRef: string;
  readonly leftPromptStatus:
    | 'candidate_polygon'
    | 'unavailable'
    | 'ambiguous';
  readonly rightPromptStatus:
    | 'candidate_polygon'
    | 'unavailable'
    | 'ambiguous';
  readonly leftCandidateCount: number;
  readonly rightCandidateCount: number;
  readonly promptSideConsumedAsAnatomicalSide: false;
  readonly rawProviderResponsePersisted: false;
  readonly rawPolygonBundleReturned: false;
  readonly validatedExternalEarObservationAuthorized: false;
  readonly anatomicalLateralityAuthorized: false;
}

export type NeutralEarFlorenceHostInvokerFR104V1 = (
  input: Readonly<{
    rgbaBytes: Uint8Array;
    width: number;
    height: number;
    providerRunRef: string;
  }>,
) =>
  Promise<NeutralEarFlorenceHostInvocationResultFR104V1>
  | NeutralEarFlorenceHostInvocationResultFR104V1;

export interface NeutralEarFlorenceByteAdapterFR104V1 {
  readonly schemaVersion:
    'fr104-neutral-ear-florence-byte-adapter-v1';
  readonly authorityState:
    'exact_rgba_byte_boundary_to_external_host_port_only';
  readonly invoke: (
    input: NeutralEarRgba8FrameFR104V1,
  ) => Promise<NeutralEarFlorenceHostInvocationResultFR104V1>;
  readonly boundary: {
    readonly repositoryNativeFlorenceRuntimeImplemented: false;
    readonly externalHostInvokerRequired: true;
    readonly additionalHorizontalMirrorApplied: false;
    readonly additionalRotationApplied: false;
    readonly promptSideUsedAsAnatomicalSide: false;
  };
}

export interface NeutralEarFaceLandmarkerByteInvocationSummaryFR104V1 {
  readonly schemaVersion:
    'fr104-neutral-ear-face-landmarker-byte-invocation-summary-v1';
  readonly authorityState:
    'provider_runtime_invoked_from_exact_rgba_boundary_summary_only';
  readonly providerRunRef: string;
  readonly faceCount: number;
  readonly rawProviderLandmarksReturned: false;
  readonly rawProviderResponsePersisted: false;
  readonly additionalHorizontalMirrorApplied: false;
  readonly additionalRotationApplied: false;
  readonly anatomicalLateralityAuthorized: false;
}

export type NeutralEarRgbaImageSourceFactoryFR104V1 = (
  input: Readonly<{
    rgbaBytes: Uint8Array;
    width: number;
    height: number;
  }>,
) => unknown;

export interface NeutralEarFaceLandmarkerByteAdapterFR104V1 {
  readonly schemaVersion:
    'fr104-neutral-ear-face-landmarker-byte-adapter-v1';
  readonly authorityState:
    'exact_rgba_byte_boundary_to_mediapipe_runtime_only';
  readonly invoke: (
    input: NeutralEarRgba8FrameFR104V1,
  ) => Promise<NeutralEarFaceLandmarkerByteInvocationSummaryFR104V1>;
  readonly boundary: {
    readonly repositoryRuntimeFactoryUsed: true;
    readonly additionalHorizontalMirrorApplied: false;
    readonly additionalRotationApplied: false;
    readonly providerLabelsUsedAsAnatomicalSide: false;
  };
}

const ISSUED_FLORENCE_ADAPTERS = new WeakSet<object>();
const ISSUED_FACE_LANDMARKER_ADAPTERS = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-104 provider byte adapter ${message}`,
  );
}

function positiveInteger(value: number, label: string): number {
  if (!Number.isInteger(value) || value <= 0) {
    fail(`${label} must be a positive integer.`);
  }
  return value;
}

function validateRgbaInput(input: NeutralEarRgba8FrameFR104V1): void {
  if (typeof input !== 'object' || input === null) {
    fail('RGBA frame input must be an object.');
  }
  if (!(input.bytes instanceof Uint8Array)) {
    fail('RGBA frame bytes must be a Uint8Array.');
  }
  const width = positiveInteger(input.width, 'width');
  const height = positiveInteger(input.height, 'height');
  const expectedLength = width * height * 4;
  if (
    !Number.isSafeInteger(expectedLength)
    || input.bytes.byteLength !== expectedLength
  ) {
    fail(
      'RGBA frame byte length must equal width * height * 4 exactly.',
    );
  }
  if (
    typeof input.providerRunRef !== 'string'
    || input.providerRunRef.trim().length === 0
  ) {
    fail('providerRunRef must be non-empty.');
  }
}

function validateFlorenceResult(
  result: NeutralEarFlorenceHostInvocationResultFR104V1,
  providerRunRef: string,
): NeutralEarFlorenceHostInvocationResultFR104V1 {
  const statuses = new Set([
    'candidate_polygon',
    'unavailable',
    'ambiguous',
  ]);
  if (
    typeof result !== 'object'
    || result === null
    || result.schemaVersion
      !== 'fr104-neutral-ear-florence-host-invocation-result-v1'
    || result.authorityState
      !== 'provider_candidate_summary_only_no_ear_acceptance'
    || result.providerRunRef !== providerRunRef
    || !statuses.has(result.leftPromptStatus)
    || !statuses.has(result.rightPromptStatus)
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
    fail('Florence host result is malformed or widens authority.');
  }
  return result;
}

function defaultRgbaImageSourceFactory(
  input: Readonly<{
    rgbaBytes: Uint8Array;
    width: number;
    height: number;
  }>,
): unknown {
  const ImageDataConstructor = globalThis.ImageData;
  if (typeof ImageDataConstructor !== 'function') {
    fail(
      'ImageData is unavailable; an explicit RGBA image-source factory is required.',
    );
  }
  const pixels = new Uint8ClampedArray(input.rgbaBytes.byteLength);
  pixels.set(input.rgbaBytes);
  return new ImageDataConstructor(
    pixels,
    input.width,
    input.height,
  );
}

export function createNeutralEarFlorenceByteAdapterFR104(
  input: Readonly<{
    hostInvoker: NeutralEarFlorenceHostInvokerFR104V1;
  }>,
): NeutralEarFlorenceByteAdapterFR104V1 {
  if (
    typeof input !== 'object'
    || input === null
    || typeof input.hostInvoker !== 'function'
  ) {
    fail('Florence adapter requires an explicit external host invoker.');
  }

  const adapter: NeutralEarFlorenceByteAdapterFR104V1 =
    Object.freeze({
      schemaVersion:
        'fr104-neutral-ear-florence-byte-adapter-v1' as const,
      authorityState:
        'exact_rgba_byte_boundary_to_external_host_port_only' as const,
      async invoke(frame) {
        validateRgbaInput(frame);
        const before = new Uint8Array(frame.bytes);
        const result = await input.hostInvoker(Object.freeze({
          rgbaBytes: frame.bytes,
          width: frame.width,
          height: frame.height,
          providerRunRef: frame.providerRunRef,
        }));

        if (
          before.byteLength !== frame.bytes.byteLength
          || before.some(
            (value, index) => value !== frame.bytes[index],
          )
        ) {
          fail(
            'Florence host invoker mutated the exact RGBA consumer bytes.',
          );
        }
        before.fill(0);
        return validateFlorenceResult(
          result,
          frame.providerRunRef,
        );
      },
      boundary: Object.freeze({
        repositoryNativeFlorenceRuntimeImplemented:
          false as const,
        externalHostInvokerRequired: true as const,
        additionalHorizontalMirrorApplied: false as const,
        additionalRotationApplied: false as const,
        promptSideUsedAsAnatomicalSide: false as const,
      }),
    });

  ISSUED_FLORENCE_ADAPTERS.add(adapter);
  return adapter;
}

export function createNeutralEarFaceLandmarkerByteAdapterFR104(
  input: Readonly<{
    factory?: MediaPipeFaceLandmarkerRuntimeFactoryFR26V1;
    createImageSource?:
      NeutralEarRgbaImageSourceFactoryFR104V1;
  }> = Object.freeze({}),
): NeutralEarFaceLandmarkerByteAdapterFR104V1 {
  const factory =
    input.factory
    ?? DEFAULT_MEDIAPIPE_FACE_LANDMARKER_RUNTIME_FACTORY_FR26;
  const createImageSource =
    input.createImageSource
    ?? defaultRgbaImageSourceFactory;

  if (
    typeof factory !== 'object'
    || factory === null
    || typeof factory.create !== 'function'
    || typeof createImageSource !== 'function'
  ) {
    fail(
      'FaceLandmarker adapter requires a runtime factory and RGBA image-source factory.',
    );
  }

  const adapter: NeutralEarFaceLandmarkerByteAdapterFR104V1 =
    Object.freeze({
      schemaVersion:
        'fr104-neutral-ear-face-landmarker-byte-adapter-v1' as const,
      authorityState:
        'exact_rgba_byte_boundary_to_mediapipe_runtime_only' as const,
      async invoke(frame) {
        validateRgbaInput(frame);
        const image = createImageSource(Object.freeze({
          rgbaBytes: frame.bytes,
          width: frame.width,
          height: frame.height,
        }));
        if (image === null || image === undefined) {
          fail('RGBA image-source factory returned no image.');
        }

        const runtime = await factory.create();
        if (
          typeof runtime !== 'object'
          || runtime === null
          || typeof runtime.detect !== 'function'
          || typeof runtime.close !== 'function'
        ) {
          fail('FaceLandmarker runtime factory returned an invalid runtime.');
        }

        let result: MediaPipeFaceLandmarkerResultFR25V1;
        try {
          result = runtime.detect(image);
        } finally {
          runtime.close();
        }

        if (
          typeof result !== 'object'
          || result === null
          || !Array.isArray(result.faceLandmarks)
        ) {
          fail('FaceLandmarker runtime returned an invalid result.');
        }

        return Object.freeze({
          schemaVersion:
            'fr104-neutral-ear-face-landmarker-byte-invocation-summary-v1' as const,
          authorityState:
            'provider_runtime_invoked_from_exact_rgba_boundary_summary_only' as const,
          providerRunRef: frame.providerRunRef,
          faceCount: result.faceLandmarks.length,
          rawProviderLandmarksReturned: false as const,
          rawProviderResponsePersisted: false as const,
          additionalHorizontalMirrorApplied: false as const,
          additionalRotationApplied: false as const,
          anatomicalLateralityAuthorized: false as const,
        });
      },
      boundary: Object.freeze({
        repositoryRuntimeFactoryUsed: true as const,
        additionalHorizontalMirrorApplied: false as const,
        additionalRotationApplied: false as const,
        providerLabelsUsedAsAnatomicalSide: false as const,
      }),
    });

  ISSUED_FACE_LANDMARKER_ADAPTERS.add(adapter);
  return adapter;
}

export function assertIssuedNeutralEarFlorenceByteAdapterFR104(
  adapter: NeutralEarFlorenceByteAdapterFR104V1,
): void {
  if (
    !ISSUED_FLORENCE_ADAPTERS.has(adapter)
    || adapter.schemaVersion
      !== 'fr104-neutral-ear-florence-byte-adapter-v1'
    || adapter.authorityState
      !== 'exact_rgba_byte_boundary_to_external_host_port_only'
    || adapter.boundary.repositoryNativeFlorenceRuntimeImplemented
      !== false
    || adapter.boundary.externalHostInvokerRequired !== true
    || adapter.boundary.additionalHorizontalMirrorApplied !== false
    || adapter.boundary.additionalRotationApplied !== false
    || adapter.boundary.promptSideUsedAsAnatomicalSide !== false
  ) {
    fail('Florence byte adapter was not issued by this runtime boundary.');
  }
}

export function assertIssuedNeutralEarFaceLandmarkerByteAdapterFR104(
  adapter: NeutralEarFaceLandmarkerByteAdapterFR104V1,
): void {
  if (
    !ISSUED_FACE_LANDMARKER_ADAPTERS.has(adapter)
    || adapter.schemaVersion
      !== 'fr104-neutral-ear-face-landmarker-byte-adapter-v1'
    || adapter.authorityState
      !== 'exact_rgba_byte_boundary_to_mediapipe_runtime_only'
    || adapter.boundary.repositoryRuntimeFactoryUsed !== true
    || adapter.boundary.additionalHorizontalMirrorApplied !== false
    || adapter.boundary.additionalRotationApplied !== false
    || adapter.boundary.providerLabelsUsedAsAnatomicalSide !== false
  ) {
    fail(
      'FaceLandmarker byte adapter was not issued by this runtime boundary.',
    );
  }
}
