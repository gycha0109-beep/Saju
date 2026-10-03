import { describe, expect, it } from 'vitest';

import {
  openMesh6HBrowserCamera,
  type Mesh6HBrowserEnvironmentV1,
  type Mesh6HBrowserFrameTriggerV1,
  type Mesh6HVideoElementLikeV1,
} from './mesh6h-browser-camera-frame-source.js';
import type {
  Mesh6GCapturedFrameV1,
} from './mesh6g-prospective-operator-capture-session.js';
import {
  createNeutralEarFaceLandmarkerByteAdapterFR104,
  createNeutralEarFlorenceByteAdapterFR104,
} from './neutral-ear-provider-byte-adapters-fr104.js';
import {
  assertIssuedNeutralEarLiveProviderByteRuntimeResultFR104,
  runNeutralEarLiveProviderByteRuntimeFR104,
} from './neutral-ear-live-provider-byte-runtime-fr104.js';

function video(): Mesh6HVideoElementLikeV1 {
  return {
    srcObject: null,
    videoWidth: 2,
    videoHeight: 1,
    readyState: 2,
    play: () => undefined,
    pause: () => undefined,
  };
}

function environment(): Mesh6HBrowserEnvironmentV1 {
  return {
    getUserMedia: async () => ({
      getTracks: () => [{ stop: () => undefined }],
    }),
    createImageBitmap: async () => ({
      fixtureImage: 'fr104-b1-exact-frame',
      close: () => undefined,
    }),
  };
}

async function* triggers(): AsyncGenerator<Mesh6HBrowserFrameTriggerV1> {
  yield {
    timestampMs: 1000,
    providerRunRef: 'fr104:b1:frame:001',
  };
}

async function withFrame(
  callback: (
    handle: Awaited<ReturnType<typeof openMesh6HBrowserCamera>>,
    frame: Mesh6GCapturedFrameV1,
  ) => Promise<void>,
): Promise<void> {
  const handle = await openMesh6HBrowserCamera(
    { video: video(), cameraFacing: 'front' },
    environment(),
  );
  try {
    for await (
      const frame of handle.createSweepFrameSource(triggers())
    ) {
      await callback(handle, frame);
    }
  } finally {
    handle.close();
  }
}

function rgbaFixture() {
  return Uint8Array.from([
    1, 2, 3, 255,
    4, 5, 6, 255,
  ]);
}

describe('FR104 D2B-B1 live provider byte runtime', () => {
  it('forces the exact materialized RGBA origin through both issued provider adapters', async () => {
    await withFrame(async (handle, frame) => {
      let florenceObserved: Uint8Array | null = null;
      let faceLandmarkerObserved: Uint8Array | null = null;
      let runtimeClosed = 0;

      const florenceAdapter =
        createNeutralEarFlorenceByteAdapterFR104({
          hostInvoker: (input) => {
            florenceObserved = input.rgbaBytes;
            expect(Array.from(input.rgbaBytes)).toEqual(
              Array.from(rgbaFixture()),
            );
            expect(input.width).toBe(2);
            expect(input.height).toBe(1);
            return Object.freeze({
              schemaVersion:
                'fr104-neutral-ear-florence-host-invocation-result-v1' as const,
              authorityState:
                'provider_candidate_summary_only_no_ear_acceptance' as const,
              providerRunRef: input.providerRunRef,
              leftPromptStatus: 'candidate_polygon' as const,
              rightPromptStatus: 'unavailable' as const,
              leftCandidateCount: 1,
              rightCandidateCount: 0,
              promptSideConsumedAsAnatomicalSide: false as const,
              rawProviderResponsePersisted: false as const,
              rawPolygonBundleReturned: false as const,
              validatedExternalEarObservationAuthorized:
                false as const,
              anatomicalLateralityAuthorized: false as const,
            });
          },
        });

      const faceLandmarkerAdapter =
        createNeutralEarFaceLandmarkerByteAdapterFR104({
          factory: Object.freeze({
            async create() {
              return Object.freeze({
                detect() {
                  return Object.freeze({
                    faceLandmarks: Object.freeze([
                      Object.freeze([
                        Object.freeze({ x: 0.5, y: 0.5, z: 0 }),
                      ]),
                    ]),
                    faceBlendshapes: Object.freeze([]),
                    facialTransformationMatrixes: Object.freeze([]),
                  });
                },
                close() {
                  runtimeClosed += 1;
                },
              });
            },
          }),
          createImageSource: ({ rgbaBytes, width, height }) => {
            faceLandmarkerObserved = rgbaBytes;
            expect(Array.from(rgbaBytes)).toEqual(
              Array.from(rgbaFixture()),
            );
            return Object.freeze({ rgbaBytes, width, height });
          },
        });

      const result = await runNeutralEarLiveProviderByteRuntimeFR104({
        handle,
        frame,
        profileRef: 'fr21b.profile.front.pending',
        materializeRgbaBytes: ({ image, width, height }) => {
          expect(
            (image as { fixtureImage?: string }).fixtureImage,
          ).toBe('fr104-b1-exact-frame');
          expect(width).toBe(2);
          expect(height).toBe(1);
          return rgbaFixture();
        },
        florenceAdapter,
        faceLandmarkerAdapter,
      });

      expect(runtimeClosed).toBe(1);
      expect(result.providerInvocations
        .florenceHostPortInvokedFromExactRgbaBoundary).toBe(true);
      expect(result.providerInvocations
        .faceLandmarkerRuntimeInvokedFromExactRgbaBoundary).toBe(true);
      expect(result.providerInvocations
        .sameMaterializedRgbaOriginVerifiedForBothProviders).toBe(true);
      expect(result.byteEvidence.byteBinding
        .capturedFrameToConsumerBytesIndependentlyVerified).toBe(true);
      expect(result.controlledCaptureBinding.binding
        .capturedFrameToConsumerBytesIndependentlyVerified).toBe(true);
      expect(result.blockers).toContain(
        'controlled_capture_profile_not_admitted',
      );
      expect(result.blockers).toContain(
        'florence_repository_native_live_host_transport_not_implemented',
      );
      expect(result.blockers).toContain(
        'provider_outputs_not_yet_composed_into_fr104_candidate_orchestration',
      );
      expect(result.authority.providerInvocationByteOriginBound)
        .toBe(true);
      expect(result.authority
        .providerOutputCandidateCompositionAuthorized).toBe(false);
      expect(result.authority.anatomicalLateralityAuthorized)
        .toBe(false);
      expect(result.authority.traditionalBindingAuthorized)
        .toBe(false);
      expect(result.authority.productionAuthorization)
        .toBe(false);

      expect(Array.from(florenceObserved ?? []))
        .toEqual(new Array(8).fill(0));
      expect(Array.from(faceLandmarkerObserved ?? []))
        .toEqual(new Array(8).fill(0));

      expect(() =>
        assertIssuedNeutralEarLiveProviderByteRuntimeResultFR104(
          result,
          {
            handle,
            frame,
            florenceAdapter,
            faceLandmarkerAdapter,
          },
        ),
      ).not.toThrow();
    });
  });

  it('rejects non-RGBA byte lengths before provider authority can be widened', async () => {
    await withFrame(async (handle, frame) => {
      let hostCalls = 0;
      const florenceAdapter =
        createNeutralEarFlorenceByteAdapterFR104({
          hostInvoker: (input) => {
            hostCalls += 1;
            return {
              schemaVersion:
                'fr104-neutral-ear-florence-host-invocation-result-v1',
              authorityState:
                'provider_candidate_summary_only_no_ear_acceptance',
              providerRunRef: input.providerRunRef,
              leftPromptStatus: 'unavailable',
              rightPromptStatus: 'unavailable',
              leftCandidateCount: 0,
              rightCandidateCount: 0,
              promptSideConsumedAsAnatomicalSide: false,
              rawProviderResponsePersisted: false,
              rawPolygonBundleReturned: false,
              validatedExternalEarObservationAuthorized: false,
              anatomicalLateralityAuthorized: false,
            };
          },
        });
      const faceLandmarkerAdapter =
        createNeutralEarFaceLandmarkerByteAdapterFR104({
          factory: {
            create: async () => ({
              detect: () => ({
                faceLandmarks: [],
                faceBlendshapes: [],
                facialTransformationMatrixes: [],
              }),
              close: () => undefined,
            }),
          },
          createImageSource: () => ({}),
        });

      await expect(
        runNeutralEarLiveProviderByteRuntimeFR104({
          handle,
          frame,
          profileRef: 'fr21b.profile.front.pending',
          materializeRgbaBytes: () =>
            Uint8Array.from([1, 2, 3]),
          florenceAdapter,
          faceLandmarkerAdapter,
        }),
      ).rejects.toThrow(/width \* height \* 4/i);
      expect(hostCalls).toBe(0);
    });
  });

  it('rejects structurally copied provider adapters', async () => {
    await withFrame(async (handle, frame) => {
      const florenceAdapter =
        createNeutralEarFlorenceByteAdapterFR104({
          hostInvoker: (input) => ({
            schemaVersion:
              'fr104-neutral-ear-florence-host-invocation-result-v1',
            authorityState:
              'provider_candidate_summary_only_no_ear_acceptance',
            providerRunRef: input.providerRunRef,
            leftPromptStatus: 'unavailable',
            rightPromptStatus: 'unavailable',
            leftCandidateCount: 0,
            rightCandidateCount: 0,
            promptSideConsumedAsAnatomicalSide: false,
            rawProviderResponsePersisted: false,
            rawPolygonBundleReturned: false,
            validatedExternalEarObservationAuthorized: false,
            anatomicalLateralityAuthorized: false,
          }),
        });
      const forgedFlorence = {
        ...florenceAdapter,
      };
      const faceLandmarkerAdapter =
        createNeutralEarFaceLandmarkerByteAdapterFR104({
          factory: {
            create: async () => ({
              detect: () => ({
                faceLandmarks: [],
                faceBlendshapes: [],
                facialTransformationMatrixes: [],
              }),
              close: () => undefined,
            }),
          },
          createImageSource: () => ({}),
        });

      await expect(
        runNeutralEarLiveProviderByteRuntimeFR104({
          handle,
          frame,
          profileRef: 'fr21b.profile.front.pending',
          materializeRgbaBytes: () => rgbaFixture(),
          florenceAdapter: forgedFlorence,
          faceLandmarkerAdapter,
        }),
      ).rejects.toThrow(/not issued/i);
    });
  });

  it('zeroes provider-owned consumer copies when the second provider fails', async () => {
    await withFrame(async (handle, frame) => {
      let florenceObserved: Uint8Array | null = null;
      let faceObserved: Uint8Array | null = null;

      const florenceAdapter =
        createNeutralEarFlorenceByteAdapterFR104({
          hostInvoker: (input) => {
            florenceObserved = input.rgbaBytes;
            return {
              schemaVersion:
                'fr104-neutral-ear-florence-host-invocation-result-v1',
              authorityState:
                'provider_candidate_summary_only_no_ear_acceptance',
              providerRunRef: input.providerRunRef,
              leftPromptStatus: 'unavailable',
              rightPromptStatus: 'unavailable',
              leftCandidateCount: 0,
              rightCandidateCount: 0,
              promptSideConsumedAsAnatomicalSide: false,
              rawProviderResponsePersisted: false,
              rawPolygonBundleReturned: false,
              validatedExternalEarObservationAuthorized: false,
              anatomicalLateralityAuthorized: false,
            };
          },
        });
      const faceLandmarkerAdapter =
        createNeutralEarFaceLandmarkerByteAdapterFR104({
          factory: {
            async create() {
              throw new Error('fixture runtime failure');
            },
          },
          createImageSource: ({ rgbaBytes }) => {
            faceObserved = rgbaBytes;
            return {};
          },
        });

      await expect(
        runNeutralEarLiveProviderByteRuntimeFR104({
          handle,
          frame,
          profileRef: 'fr21b.profile.front.pending',
          materializeRgbaBytes: () => rgbaFixture(),
          florenceAdapter,
          faceLandmarkerAdapter,
        }),
      ).rejects.toThrow(/fixture runtime failure/i);

      expect(Array.from(florenceObserved ?? []))
        .toEqual(new Array(8).fill(0));
      expect(Array.from(faceObserved ?? []))
        .toEqual(new Array(8).fill(0));
    });
  });
});
