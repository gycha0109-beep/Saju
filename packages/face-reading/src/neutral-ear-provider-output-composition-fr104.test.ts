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
  createNeutralEarFaceLandmarkerGeometryCaptureFR104,
  consumeIssuedNeutralEarFaceLandmarkerGeometryFR104,
} from './neutral-ear-face-landmarker-geometry-handle-fr104.js';
import {
  consumeIssuedNeutralEarFlorenceCandidateSetFR104,
  createNeutralEarFlorenceLiveHostTransportFR104,
} from './neutral-ear-florence-live-host-transport-fr104.js';
import {
  runNeutralEarLiveProviderByteRuntimeFR104,
} from './neutral-ear-live-provider-byte-runtime-fr104.js';
import {
  createNeutralEarFlorenceByteAdapterFR104,
} from './neutral-ear-provider-byte-adapters-fr104.js';
import {
  assertIssuedNeutralEarProviderOutputCompositionFR104,
  composeNeutralEarLiveProviderOutputsFR104,
} from './neutral-ear-provider-output-composition-fr104.js';

const RUN_REF = 'fr104:b3:compose:001';

function video(): Mesh6HVideoElementLikeV1 {
  return {
    srcObject: null,
    videoWidth: 4,
    videoHeight: 4,
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
      fixtureImage: 'fr104-b3-exact-frame',
      close: () => undefined,
    }),
  };
}

async function* triggers(): AsyncGenerator<Mesh6HBrowserFrameTriggerV1> {
  yield {
    timestampMs: 2000,
    providerRunRef: RUN_REF,
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
  return Uint8Array.from(
    Array.from({ length: 64 }, (_, index) =>
      index % 4 === 3 ? 255 : index % 251),
  );
}

function landmarks() {
  return Object.freeze(Array.from({ length: 478 }, (_, index) =>
    Object.freeze({
      x: index % 2 === 0 ? 0.15 : 0.85,
      y: index % 3 === 0 ? 0.2 : 0.8,
      z: index / 10_000,
    })));
}

function florenceResponse() {
  const candidate = (
    ordinal: number,
    points: readonly { x: number; y: number }[],
  ) => ({
    candidateOrdinal: ordinal,
    coordinateFrame: 'canonical_image_normalized_2d',
    points,
    exactStructuralDegeneracyAlreadyRejected: true,
  });

  return {
    schemaVersion: 'fr104-florence-live-worker-response-v1',
    authorityState:
      'ephemeral_provider_candidates_only_no_ear_acceptance',
    providerRunRef: RUN_REF,
    frame: {
      width: 4,
      height: 4,
      pixelFormat: 'rgba8',
    },
    model: {
      id: 'microsoft/Florence-2-base',
      revision:
        '5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac',
      task: '<REFERRING_EXPRESSION_SEGMENTATION>',
    },
    prompts: {
      left: {
        status: 'candidate_polygon',
        candidateCount: 2,
        candidates: [
          candidate(1, [
            { x: 0.05, y: 0.25 },
            { x: 0.12, y: 0.25 },
            { x: 0.12, y: 0.45 },
            { x: 0.05, y: 0.45 },
          ]),
          candidate(2, [
            { x: 0.08, y: 0.5 },
            { x: 0.16, y: 0.5 },
            { x: 0.16, y: 0.7 },
            { x: 0.08, y: 0.7 },
          ]),
        ],
        rejectedDegenerateCount: 0,
        rejectionReasons: [],
        exactDegeneracyGateApplied: true,
        numericAcceptanceThresholdApplied: false,
      },
      right: {
        status: 'candidate_polygon',
        candidateCount: 1,
        candidates: [
          candidate(1, [
            { x: 0.84, y: 0.3 },
            { x: 0.93, y: 0.3 },
            { x: 0.93, y: 0.55 },
            { x: 0.84, y: 0.55 },
          ]),
        ],
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

function geometryCapture() {
  return createNeutralEarFaceLandmarkerGeometryCaptureFR104({
    factory: {
      async create() {
        return {
          detect() {
            return {
              faceLandmarks: [landmarks()],
              faceBlendshapes: [],
              facialTransformationMatrixes: [],
            };
          },
          close() {
            return undefined;
          },
        };
      },
    },
    createImageSource: ({ rgbaBytes, width, height }) => ({
      rgbaBytes,
      width,
      height,
    }),
  });
}

describe('FR104 D2B-B3 provider-output composition', () => {
  it('composes every same-runtime Florence candidate with the exact FaceLandmarker screen geometry without selection', async () => {
    await withFrame(async (handle, frame) => {
      const transport =
        createNeutralEarFlorenceLiveHostTransportFR104({
          fetchImpl: async () => ({
            ok: true,
            status: 200,
            json: async () => florenceResponse(),
          }),
        });
      const florenceAdapter =
        createNeutralEarFlorenceByteAdapterFR104({
          hostInvoker: transport.hostInvoker,
        });
      const faceGeometry = geometryCapture();

      const runtimeResult =
        await runNeutralEarLiveProviderByteRuntimeFR104({
          handle,
          frame,
          profileRef: 'fr21b.profile.front.pending',
          materializeRgbaBytes: ({ image, width, height }) => {
            expect(
              (image as { fixtureImage?: string }).fixtureImage,
            ).toBe('fr104-b3-exact-frame');
            expect(width).toBe(4);
            expect(height).toBe(4);
            return rgbaFixture();
          },
          florenceAdapter,
          faceLandmarkerAdapter: faceGeometry.adapter,
        });

      const florenceHandle =
        transport.takeCandidateSetHandle(RUN_REF);
      const geometryHandle =
        faceGeometry.takeGeometryHandle(RUN_REF);

      const result =
        composeNeutralEarLiveProviderOutputsFR104({
          runtimeResult,
          handle,
          frame,
          florenceAdapter,
          faceLandmarkerAdapter: faceGeometry.adapter,
          florenceHandle,
          geometryHandle,
        });

      expect(result.candidateSummary).toEqual({
        leftPromptCount: 2,
        rightPromptCount: 1,
        totalCount: 3,
        allCandidatesPreservedWithoutSelection: true,
        candidateSelectionThresholdApplied: false,
      });
      expect(result.candidateBundles).toHaveLength(3);
      expect(
        result.candidateBundles.map(
          (candidate) => candidate.promptProvenance,
        ),
      ).toEqual([
        'left_prompt',
        'left_prompt',
        'right_prompt',
      ]);
      for (const candidate of result.candidateBundles) {
        expect(candidate.promptSideConsumedAsAnatomicalSide)
          .toBe(false);
        expect(candidate.descriptiveEvidence.provenance
          .sharedDecodedPixelFrame.independentlyVerified)
          .toBe(true);
        expect(candidate.descriptiveEvidence.laterality
          .anatomicalSide).toBe('unknown');
        expect(candidate.descriptiveEvidence.laterality.blockers)
          .not.toContain(
            'same_pixel_frame_not_independently_verified',
          );
        expect(candidate.descriptiveEvidence.laterality.blockers)
          .not.toContain(
            'exif_orientation_provenance_unresolved',
          );
        expect(candidate.descriptiveEvidence.laterality.blockers)
          .toContain(
            'front_camera_mirror_provenance_unresolved',
          );
        expect(candidate.descriptiveEvidence.authority
          .plausibilityClassificationIssued).toBe(false);
        expect(candidate.descriptiveEvidence.authority
          .validatedExternalEarObservation).toBe(false);
        expect(candidate.descriptiveEvidence.authority
          .anatomicalLateralityAuthorized).toBe(false);
      }

      expect(result.bindingEvidence
        .sameMaterializedRgbaOriginVerifiedForBothProviders)
        .toBe(true);
      expect(result.bindingEvidence
        .secondFaceLandmarkerExecutionIntroduced)
        .toBe(false);
      expect(result.provenance.exifOrientation.state)
        .toBe('absent_or_not_required');
      expect(result.provenance.frontCameraMirror.state)
        .toBe('unknown');
      expect(result.authority
        .descriptiveProviderOutputCompositionCompleted)
        .toBe(true);
      expect(result.authority
        .validatedExternalEarObservationAuthorized)
        .toBe(false);
      expect(result.authority.anatomicalLateralityAuthorized)
        .toBe(false);
      expect(result.authority.traditionalBindingAuthorized)
        .toBe(false);
      expect(result.authority.productionAuthorization)
        .toBe(false);

      expect(() =>
        assertIssuedNeutralEarProviderOutputCompositionFR104(
          result,
          runtimeResult,
        ),
      ).not.toThrow();

      expect(() =>
        consumeIssuedNeutralEarFlorenceCandidateSetFR104(
          florenceHandle,
          () => undefined,
        ),
      ).toThrow(/already been consumed or cleared/i);
      expect(() =>
        consumeIssuedNeutralEarFaceLandmarkerGeometryFR104(
          geometryHandle,
          () => undefined,
        ),
      ).toThrow(/already been consumed or cleared/i);
    });
  });

  it('rejects a structurally copied B1 runtime result before consuming provider handles', async () => {
    await withFrame(async (handle, frame) => {
      const transport =
        createNeutralEarFlorenceLiveHostTransportFR104({
          fetchImpl: async () => ({
            ok: true,
            status: 200,
            json: async () => florenceResponse(),
          }),
        });
      const florenceAdapter =
        createNeutralEarFlorenceByteAdapterFR104({
          hostInvoker: transport.hostInvoker,
        });
      const faceGeometry = geometryCapture();

      const runtimeResult =
        await runNeutralEarLiveProviderByteRuntimeFR104({
          handle,
          frame,
          profileRef: 'fr21b.profile.front.pending',
          materializeRgbaBytes: () => rgbaFixture(),
          florenceAdapter,
          faceLandmarkerAdapter: faceGeometry.adapter,
        });
      const florenceHandle =
        transport.takeCandidateSetHandle(RUN_REF);
      const geometryHandle =
        faceGeometry.takeGeometryHandle(RUN_REF);

      expect(() =>
        composeNeutralEarLiveProviderOutputsFR104({
          runtimeResult: { ...runtimeResult },
          handle,
          frame,
          florenceAdapter,
          faceLandmarkerAdapter: faceGeometry.adapter,
          florenceHandle,
          geometryHandle,
        }),
      ).toThrow(/not issued by the active B1 runtime/i);

      consumeIssuedNeutralEarFlorenceCandidateSetFR104(
        florenceHandle,
        () => undefined,
      );
      consumeIssuedNeutralEarFaceLandmarkerGeometryFR104(
        geometryHandle,
        () => undefined,
      );
    });
  });
});
