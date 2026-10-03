import type {
  MediaPipeFaceLandmarkerRuntimeFactoryFR26V1,
} from './mediapipe-face-landmarker-runtime-fr26.js';
import type {
  MediaPipeMetricGeometryPointFR76V1,
} from './mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import {
  createNeutralEarFaceLandmarkerByteAdapterFR104,
  type NeutralEarFaceLandmarkerByteAdapterFR104V1,
  type NeutralEarRgbaImageSourceFactoryFR104V1,
} from './neutral-ear-provider-byte-adapters-fr104.js';
import type {
  NeutralEarSameFrameScreenGeometryFR104V1,
} from './neutral-ear-same-frame-face-envelope-adapter-fr104.js';
import { FaceAuthorityValidationError } from './validation.js';

export interface NeutralEarFaceLandmarkerGeometryHandleFR104V1 {
  readonly schemaVersion:
    'fr104-neutral-ear-face-landmarker-geometry-handle-v1';
  readonly authorityState:
    'opaque_ephemeral_same_run_screen_geometry_handle_only';
  readonly providerRunRef: string;
  readonly frame: {
    readonly width: number;
    readonly height: number;
  };
  readonly landmarkCount: 468;
  readonly rawScreenLandmarksReturnedOnHandle: false;
  readonly anatomicalLateralityAuthorized: false;
}

export interface NeutralEarFaceLandmarkerGeometryCaptureFR104V1 {
  readonly schemaVersion:
    'fr104-neutral-ear-face-landmarker-geometry-capture-v1';
  readonly authorityState:
    'same_provider_run_ephemeral_geometry_capture_only';
  readonly adapter: NeutralEarFaceLandmarkerByteAdapterFR104V1;
  readonly takeGeometryHandle: (
    providerRunRef: string,
  ) => NeutralEarFaceLandmarkerGeometryHandleFR104V1;
  readonly discardPendingGeometry: (
    providerRunRef: string,
  ) => boolean;
  readonly boundary: {
    readonly secondProviderExecutionIntroduced: false;
    readonly rawScreenLandmarksReturned: false;
    readonly rawScreenLandmarksPersisted: false;
    readonly providerLabelsUsedAsAnatomicalSide: false;
    readonly anatomicalLateralityAuthorized: false;
    readonly traditionalBindingAuthorized: false;
    readonly productionAuthorization: false;
  };
}

type MutablePoint = {
  x: number;
  y: number;
  z: number;
};

type GeometryState = {
  consumed: boolean;
  providerRunRef: string;
  frameWidth: number;
  frameHeight: number;
  screenLandmarks: MutablePoint[];
};

const ISSUED_HANDLES = new WeakSet<object>();
const HANDLE_STATE = new WeakMap<object, GeometryState>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-104 FaceLandmarker geometry handle ${message}`,
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

function copyPoint(
  point: MediaPipeMetricGeometryPointFR76V1,
): MutablePoint {
  return {
    x: point.x,
    y: point.y,
    z: point.z,
  };
}

function clearState(state: GeometryState): void {
  for (const point of state.screenLandmarks) {
    point.x = 0;
    point.y = 0;
    point.z = 0;
  }
  state.screenLandmarks.length = 0;
  state.consumed = true;
}

export function createNeutralEarFaceLandmarkerGeometryCaptureFR104(
  input: Readonly<{
    factory?: MediaPipeFaceLandmarkerRuntimeFactoryFR26V1;
    createImageSource?:
      NeutralEarRgbaImageSourceFactoryFR104V1;
  }> = Object.freeze({}),
): NeutralEarFaceLandmarkerGeometryCaptureFR104V1 {
  const pendingByRunRef =
    new Map<string, NeutralEarFaceLandmarkerGeometryHandleFR104V1>();

  const adapter =
    createNeutralEarFaceLandmarkerByteAdapterFR104({
      ...(input.factory === undefined
        ? {}
        : { factory: input.factory }),
      ...(input.createImageSource === undefined
        ? {}
        : { createImageSource: input.createImageSource }),
      onEphemeralScreenGeometry: (geometry) => {
        safeRunRef(geometry.providerRunRef);
        if (pendingByRunRef.has(geometry.providerRunRef)) {
          fail(
            'providerRunRef already has unconsumed same-run geometry.',
          );
        }
        if (
          geometry.screenLandmarks.length !== 468
          || !Number.isInteger(geometry.width)
          || geometry.width <= 0
          || !Number.isInteger(geometry.height)
          || geometry.height <= 0
        ) {
          fail('ephemeral screen geometry shape is malformed.');
        }

        const state: GeometryState = {
          consumed: false,
          providerRunRef: geometry.providerRunRef,
          frameWidth: geometry.width,
          frameHeight: geometry.height,
          screenLandmarks:
            geometry.screenLandmarks.map(copyPoint),
        };
        const handle:
          NeutralEarFaceLandmarkerGeometryHandleFR104V1 =
          Object.freeze({
            schemaVersion:
              'fr104-neutral-ear-face-landmarker-geometry-handle-v1' as const,
            authorityState:
              'opaque_ephemeral_same_run_screen_geometry_handle_only' as const,
            providerRunRef: geometry.providerRunRef,
            frame: Object.freeze({
              width: geometry.width,
              height: geometry.height,
            }),
            landmarkCount: 468 as const,
            rawScreenLandmarksReturnedOnHandle: false as const,
            anatomicalLateralityAuthorized: false as const,
          });

        ISSUED_HANDLES.add(handle);
        HANDLE_STATE.set(handle, state);
        pendingByRunRef.set(geometry.providerRunRef, handle);
      },
    });

  return Object.freeze({
    schemaVersion:
      'fr104-neutral-ear-face-landmarker-geometry-capture-v1' as const,
    authorityState:
      'same_provider_run_ephemeral_geometry_capture_only' as const,
    adapter,
    takeGeometryHandle(providerRunRef: string) {
      safeRunRef(providerRunRef);
      const handle = pendingByRunRef.get(providerRunRef);
      if (handle === undefined) {
        fail('no pending geometry handle exists for providerRunRef.');
      }
      pendingByRunRef.delete(providerRunRef);
      return handle;
    },
    discardPendingGeometry(providerRunRef: string) {
      safeRunRef(providerRunRef);
      const handle = pendingByRunRef.get(providerRunRef);
      if (handle === undefined) return false;
      pendingByRunRef.delete(providerRunRef);
      const state = HANDLE_STATE.get(handle);
      if (state !== undefined && !state.consumed) {
        clearState(state);
        HANDLE_STATE.delete(handle);
      }
      return true;
    },
    boundary: Object.freeze({
      secondProviderExecutionIntroduced: false as const,
      rawScreenLandmarksReturned: false as const,
      rawScreenLandmarksPersisted: false as const,
      providerLabelsUsedAsAnatomicalSide: false as const,
      anatomicalLateralityAuthorized: false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),
  });
}

export function consumeIssuedNeutralEarFaceLandmarkerGeometryFR104<T>(
  handle: NeutralEarFaceLandmarkerGeometryHandleFR104V1,
  callback: (
    geometry: NeutralEarSameFrameScreenGeometryFR104V1,
  ) => T,
): T {
  if (
    !ISSUED_HANDLES.has(handle)
    || handle.schemaVersion
      !== 'fr104-neutral-ear-face-landmarker-geometry-handle-v1'
    || handle.authorityState
      !== 'opaque_ephemeral_same_run_screen_geometry_handle_only'
    || handle.landmarkCount !== 468
    || handle.rawScreenLandmarksReturnedOnHandle !== false
    || handle.anatomicalLateralityAuthorized !== false
  ) {
    fail('geometry handle was not issued by this capture boundary.');
  }

  const state = HANDLE_STATE.get(handle);
  if (state === undefined || state.consumed) {
    fail('geometry handle has already been consumed or cleared.');
  }
  if (typeof callback !== 'function') {
    fail('geometry consumer callback must be a function.');
  }

  try {
    return callback(Object.freeze({
      providerRunRef: state.providerRunRef,
      screenLandmarks: state.screenLandmarks,
      frameWidth: state.frameWidth,
      frameHeight: state.frameHeight,
    }));
  } finally {
    clearState(state);
    HANDLE_STATE.delete(handle);
  }
}
