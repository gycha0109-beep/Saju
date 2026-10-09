import { describe, expect, it } from 'vitest';

import {
  createNeutralEarCapturedFrameConsumerByteSessionFR104,
} from './neutral-ear-captured-frame-consumer-byte-provenance-fr104.js';
import {
  openMesh6HBrowserCamera,
  type Mesh6HBrowserCameraHandleV1,
  type Mesh6HBrowserEnvironmentV1,
  type Mesh6HBrowserFrameTriggerV1,
  type Mesh6HCameraFacingV1,
  type Mesh6HVideoElementLikeV1,
} from './mesh6h-browser-camera-frame-source.js';
import type {
  Mesh6GCapturedFrameV1,
} from './mesh6g-prospective-operator-capture-session.js';
import {
  assertIssuedNeutralEarControlledCaptureRuntimeByteBindingFR104,
  bindNeutralEarControlledCaptureRuntimeByteEvidenceFR104,
} from './neutral-ear-controlled-capture-runtime-byte-binding-fr104.js';

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

function environment(): Mesh6HBrowserEnvironmentV1 {
  return {
    getUserMedia: async () => ({
      getTracks: () => [{ stop: () => undefined }],
    }),
    createImageBitmap: async () => ({
      source: 'mesh6h-exact-frame',
      close: () => undefined,
    }),
  };
}

async function* triggers(
  cameraFacing: Mesh6HCameraFacingV1,
): AsyncGenerator<Mesh6HBrowserFrameTriggerV1> {
  yield {
    timestampMs: 2000,
    providerRunRef: `fr104:d2b:profile:${cameraFacing}:001`,
  };
}

async function captureOne(
  cameraFacing: Mesh6HCameraFacingV1,
): Promise<Readonly<{
  handle: Mesh6HBrowserCameraHandleV1;
  frame: Mesh6GCapturedFrameV1;
}>> {
  const handle = await openMesh6HBrowserCamera(
    { video: video(), cameraFacing },
    environment(),
  );
  const iterator =
    handle.createSweepFrameSource(
      triggers(cameraFacing),
    )[Symbol.asyncIterator]();
  const next = await iterator.next();
  if (next.done) throw new Error('fixture did not yield a frame.');
  return Object.freeze({ handle, frame: next.value });
}

async function byteEvidence(
  handle: Mesh6HBrowserCameraHandleV1,
  frame: Mesh6GCapturedFrameV1,
) {
  const session =
    await createNeutralEarCapturedFrameConsumerByteSessionFR104({
      handle,
      frame,
      materializeFrameBytes: () =>
        Uint8Array.from([1, 3, 5, 7]),
    });
  await session.consume('florence', () => undefined);
  await session.consume('face_landmarker', () => undefined);
  return session.finalize();
}

describe('FR104 D2B controlled-capture runtime byte/profile binding', () => {
  it('clears the exact frame-to-consumer-byte mechanical gap while keeping unverified profile and mirror authority blocked', async () => {
    const { handle, frame } = await captureOne('front');
    try {
      const evidence = await byteEvidence(handle, frame);
      const binding =
        bindNeutralEarControlledCaptureRuntimeByteEvidenceFR104({
          handle,
          frame,
          profileRef: 'fr21b.profile.front.pending',
          byteEvidence: evidence,
        });

      expect(
        binding.binding
          .capturedFrameToConsumerBytesIndependentlyVerified,
      ).toBe(true);
      expect(binding.profileSnapshot.admitted).toBe(false);
      expect(binding.blockers).toContain(
        'controlled_capture_profile_not_admitted',
      );
      expect(binding.blockers).toContain(
        'subject_relative_mirror_calibration_not_reviewed',
      );
      expect(
        binding.authority.subjectRelativeMirrorProvenanceAuthorized,
      ).toBe(false);
      expect(binding.authority.anatomicalLateralityAuthorized)
        .toBe(false);
      expect(binding.authority.traditionalBindingAuthorized)
        .toBe(false);
      expect(binding.authority.productionAuthorization).toBe(false);

      expect(() =>
        assertIssuedNeutralEarControlledCaptureRuntimeByteBindingFR104(
          binding,
          {
            handle,
            frame,
            byteEvidence: evidence,
            profileRef: 'fr21b.profile.front.pending',
          },
        ),
      ).not.toThrow();
    } finally {
      handle.close();
    }
  });

  it('uses the same binding gate for the rear camera without inferring mirror semantics from facing mode', async () => {
    const { handle, frame } = await captureOne('rear');
    try {
      const evidence = await byteEvidence(handle, frame);
      const binding =
        bindNeutralEarControlledCaptureRuntimeByteEvidenceFR104({
          handle,
          frame,
          profileRef: 'fr21b.profile.rear.pending',
          byteEvidence: evidence,
        });

      expect(binding.cameraFacing).toBe('rear');
      expect(
        binding.binding
          .capturedFrameToConsumerBytesIndependentlyVerified,
      ).toBe(true);
      expect(
        binding.binding.reviewedSubjectRelativeMirrorCalibrationConsumed,
      ).toBe(false);
      expect(
        binding.authority.subjectRelativeMirrorProvenanceAuthorized,
      ).toBe(false);
    } finally {
      handle.close();
    }
  });

  it('rejects byte evidence issued for a different exact captured frame object', async () => {
    const first = await captureOne('front');
    const second = await captureOne('front');
    try {
      const evidence = await byteEvidence(first.handle, first.frame);
      expect(() =>
        bindNeutralEarControlledCaptureRuntimeByteEvidenceFR104({
          handle: second.handle,
          frame: second.frame,
          profileRef: 'fr21b.profile.front.pending',
          byteEvidence: evidence,
        }),
      ).toThrow(/expected exact Mesh6H handle and frame objects/i);
    } finally {
      first.handle.close();
      second.handle.close();
    }
  });
});
