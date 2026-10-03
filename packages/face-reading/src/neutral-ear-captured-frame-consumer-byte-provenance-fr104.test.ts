import { describe, expect, it } from 'vitest';

import {
  openMesh6HBrowserCamera,
  type Mesh6HBrowserEnvironmentV1,
  type Mesh6HBrowserFrameTriggerV1,
  type Mesh6HBrowserCameraHandleV1,
  type Mesh6HCameraFacingV1,
  type Mesh6HVideoElementLikeV1,
} from './mesh6h-browser-camera-frame-source.js';
import type { Mesh6GCapturedFrameV1 } from './mesh6g-prospective-operator-capture-session.js';
import {
  assertNeutralEarCapturedFrameConsumerByteEvidenceFR104,
  createNeutralEarCapturedFrameConsumerByteSessionFR104,
  NEUTRAL_EAR_MESH6H_D2B_CAPTURE_IMPLEMENTATION_FR104,
} from './neutral-ear-captured-frame-consumer-byte-provenance-fr104.js';

function video(): Mesh6HVideoElementLikeV1 {
  return {
    srcObject: null,
    videoWidth: 640,
    videoHeight: 480,
    readyState: 2,
    play: () => undefined,
    pause: () => undefined,
  };
}

function environment(expectedFacing: 'user' | 'environment') {
  let requestedFacing: string | null = null;
  const value: Mesh6HBrowserEnvironmentV1 = {
    getUserMedia: async (constraints) => {
      requestedFacing = constraints.video.facingMode;
      return {
        getTracks: () => [{ stop: () => undefined }],
      };
    },
    createImageBitmap: async () => ({
      fixtureImage: 'exact-mesh6h-image-object',
      close: () => undefined,
    }),
  };
  return {
    value,
    assertFacing() {
      expect(requestedFacing).toBe(expectedFacing);
    },
  };
}

async function* triggers(
  ref: string,
): AsyncGenerator<Mesh6HBrowserFrameTriggerV1> {
  yield {
    timestampMs: 1000,
    providerRunRef: ref,
  };
}

async function withFrame(
  cameraFacing: Mesh6HCameraFacingV1,
  callback: (
    handle: Mesh6HBrowserCameraHandleV1,
    frame: Mesh6GCapturedFrameV1,
  ) => Promise<void>,
): Promise<void> {
  const expectedFacing =
    cameraFacing === 'front' ? 'user' : 'environment';
  const env = environment(expectedFacing);
  const handle = await openMesh6HBrowserCamera(
    { video: video(), cameraFacing },
    env.value,
  );
  env.assertFacing();

  try {
    for await (
      const frame of handle.createSweepFrameSource(
        triggers(`fr104:d2b:${cameraFacing}:001`),
      )
    ) {
      await callback(handle, frame);
    }
  } finally {
    handle.close();
  }
}

describe('FR104 D2B exact captured-frame to consumer-byte provenance', () => {
  it('binds the exact issued front frame image to both consumer byte boundaries without widening authority', async () => {
    await withFrame('front', async (handle, frame) => {
      let florenceBytes: Uint8Array | null = null;
      let faceLandmarkerBytes: Uint8Array | null = null;
      const session =
        await createNeutralEarCapturedFrameConsumerByteSessionFR104({
          handle,
          frame,
          materializeFrameBytes: ({ image, width, height }) => {
            expect((image as { fixtureImage?: string }).fixtureImage)
              .toBe('exact-mesh6h-image-object');
            expect(width).toBe(640);
            expect(height).toBe(480);
            return Uint8Array.from([10, 20, 30, 40]);
          },
        });

      await session.consume('florence', (bytes) => {
        expect(Array.from(bytes)).toEqual([10, 20, 30, 40]);
        florenceBytes = bytes;
      });
      await session.consume('face_landmarker', (bytes) => {
        expect(Array.from(bytes)).toEqual([10, 20, 30, 40]);
        faceLandmarkerBytes = bytes;
      });

      expect(Array.from(florenceBytes ?? [])).toEqual([0, 0, 0, 0]);
      expect(Array.from(faceLandmarkerBytes ?? [])).toEqual([0, 0, 0, 0]);

      const evidence = session.finalize();
      expect(evidence.cameraFacing).toBe('front');
      expect(
        evidence.byteBinding
          .capturedFrameToConsumerBytesIndependentlyVerified,
      ).toBe(true);
      expect(evidence.privacy.sourceDigestReturned).toBe(false);
      expect(evidence.privacy.sourceDigestPersisted).toBe(false);
      expect(
        evidence.authority.subjectRelativeMirrorProvenanceAuthorized,
      ).toBe(false);
      expect(evidence.authority.anatomicalLateralityAuthorized)
        .toBe(false);
      expect(evidence.authority.traditionalBindingAuthorized)
        .toBe(false);
      expect(evidence.authority.productionAuthorization).toBe(false);
      expect(() =>
        assertNeutralEarCapturedFrameConsumerByteEvidenceFR104(
          evidence,
        ),
      ).not.toThrow();
    });
  });

  it('supports the same exact-frame byte mechanics for a rear-camera Mesh6H handle', async () => {
    await withFrame('rear', async (handle, frame) => {
      const session =
        await createNeutralEarCapturedFrameConsumerByteSessionFR104({
          handle,
          frame,
          materializeFrameBytes: () =>
            Uint8Array.from([7, 8, 9]),
        });
      await session.consume('florence', () => undefined);
      await session.consume('face_landmarker', () => undefined);
      const evidence = session.finalize();

      expect(evidence.cameraFacing).toBe('rear');
      expect(
        evidence.byteBinding
          .sourceBytesMaterializedFromExactIssuedFrameImageObject,
      ).toBe(true);
      expect(evidence.authority.anatomicalLateralityAuthorized)
        .toBe(false);
    });
  });

  it('fails closed when both consumer boundaries have not completed', async () => {
    await withFrame('front', async (handle, frame) => {
      const session =
        await createNeutralEarCapturedFrameConsumerByteSessionFR104({
          handle,
          frame,
          materializeFrameBytes: () =>
            Uint8Array.from([1, 2, 3]),
        });
      await session.consume('florence', () => undefined);
      expect(() => session.finalize()).toThrow(
        /both Florence and FaceLandmarker/i,
      );
    });
  });

  it('rejects a captured frame object that did not come from the supplied Mesh6H handle', async () => {
    const env = environment('user');
    const handle = await openMesh6HBrowserCamera(
      { video: video() },
      env.value,
    );
    env.assertFacing();

    try {
      await expect(
        createNeutralEarCapturedFrameConsumerByteSessionFR104({
          handle,
          frame: {
            image: {},
            timestampMs: 1000,
            frameWidth: 640,
            frameHeight: 480,
            providerRunRef: 'fr104:d2b:forged',
          },
          materializeFrameBytes: () =>
            Uint8Array.from([1, 2, 3]),
        }),
      ).rejects.toThrow(/not issued by the supplied active MESH6H handle/i);
    } finally {
      handle.close();
    }
  });

  it('pins the exact Mesh6H source identity that introduced D2B frame issuance and front/rear mechanics', () => {
    expect(
      NEUTRAL_EAR_MESH6H_D2B_CAPTURE_IMPLEMENTATION_FR104,
    ).toEqual({
      repository: 'gycha0109-beep/Saju',
      repositoryCommit:
        'aa3109356477d9621a571ac91d250f10b2241955',
      sourcePath:
        'packages/face-reading/src/mesh6h-browser-camera-frame-source.ts',
      sourceBlobSha:
        '49b7fa4277326ad571a01d5414f586128cf5758b',
    });
  });
});
