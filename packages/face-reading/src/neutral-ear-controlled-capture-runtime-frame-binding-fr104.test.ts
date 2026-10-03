import { describe, expect, it } from 'vitest';
import {
  createNeutralEarDualConsumerPixelFingerprintSessionFR104,
} from './neutral-ear-dual-consumer-pixel-fingerprint-fr104.js';
import {
  issueNeutralEarCaptureTransformReceiptFR104,
} from './neutral-ear-capture-transform-provenance-receipt-fr104.js';
import {
  deriveNeutralEarFrameTransformParityFR104,
} from './neutral-ear-frame-transform-parity-fr104.js';
import {
  openMesh6HBrowserCamera,
  type Mesh6HBrowserEnvironmentV1,
  type Mesh6HBrowserFrameTriggerV1,
  type Mesh6HVideoElementLikeV1,
} from './mesh6h-browser-camera-frame-source.js';
import {
  assertIssuedNeutralEarControlledCaptureRuntimeFrameProfileBindingFR104,
  createNeutralEarControlledCaptureRuntimeFrameBindingSessionFR104,
  NEUTRAL_EAR_MESH6H_FRONT_CAPTURE_IMPLEMENTATION_FR104,
} from './neutral-ear-controlled-capture-runtime-frame-binding-fr104.js';

function parity() {
  return deriveNeutralEarFrameTransformParityFR104(
    issueNeutralEarCaptureTransformReceiptFR104({
      schemaVersion:
        'fr104-neutral-ear-capture-transform-receipt-input-v1',
      decodedFrame: { width: 640, height: 480 },
      exif: {
        orientationTag: null,
        application: 'not_present',
      },
      explicitPostDecodeTransform: {
        rotationDegrees: 0,
        horizontalMirrorApplied: false,
      },
      consumerFrame: { width: 640, height: 480 },
    }),
  );
}

function fingerprint() {
  const session =
    createNeutralEarDualConsumerPixelFingerprintSessionFR104();
  session.observe('florence', Uint8Array.from([1, 2, 3]));
  session.observe(
    'face_landmarker',
    Uint8Array.from([1, 2, 3]),
  );
  return session.finalize();
}

async function openHandle() {
  const video: Mesh6HVideoElementLikeV1 = {
    srcObject: null,
    videoWidth: 640,
    videoHeight: 480,
    readyState: 2,
    play: () => undefined,
    pause: () => undefined,
  };

  const environment: Mesh6HBrowserEnvironmentV1 = {
    getUserMedia: async () => ({
      getTracks: () => [
        { stop: () => undefined },
      ],
    }),
    createImageBitmap: async () => ({
      close: () => undefined,
    }),
  };

  return openMesh6HBrowserCamera(
    { video },
    environment,
  );
}

async function* triggers(): AsyncGenerator<Mesh6HBrowserFrameTriggerV1> {
  yield {
    timestampMs: 1000,
    providerRunRef: 'fr104:d2a:frame:001',
  };
}

describe('FR104 D2A controlled-capture runtime frame/profile binding', () => {
  it('binds the exact Mesh6H captured frame object to a profile ref without inventing profile authority', async () => {
    const handle = await openHandle();
    const session =
      createNeutralEarControlledCaptureRuntimeFrameBindingSessionFR104({
        handle,
        profileRef: 'fr21b.profile.front.pending',
      });

    const frameTransformParity = parity();
    const pixelIdentityEvidence = fingerprint();

    for await (
      const boundFrame of session.createBoundFrameSource(triggers())
    ) {
      const binding = session.bindEvidence(
        boundFrame,
        { frameTransformParity, pixelIdentityEvidence },
      );

      expect(binding.profileSnapshot.admitted).toBe(false);
      expect(
        binding.binding
          .exactCapturedFrameObjectBoundToIssuedMesh6HHandle,
      ).toBe(true);
      expect(
        binding.binding.exactCapturedFrameObjectBoundToProfileRef,
      ).toBe(true);
      expect(
        binding.binding.exactFrameToVerifiedProfileBindingVerified,
      ).toBe(false);
      expect(
        binding.binding
          .capturedFrameToConsumerBytesIndependentlyVerified,
      ).toBe(false);
      expect(binding.blockers).toContain(
        'controlled_capture_profile_not_admitted',
      );
      expect(binding.blockers).toContain(
        'captured_frame_to_consumer_bytes_not_independently_verified',
      );
      expect(
        binding.authority.subjectRelativeMirrorProvenanceAuthorized,
      ).toBe(false);

      expect(() =>
        assertIssuedNeutralEarControlledCaptureRuntimeFrameProfileBindingFR104(
          binding,
          {
            profileRef: 'fr21b.profile.front.pending',
            frameTransformParity,
            pixelIdentityEvidence,
          },
        ),
      ).not.toThrow();
    }

    handle.close();
  });

  it('pins the existing Mesh6H front-camera source identity rather than creating another capture implementation', () => {
    expect(
      NEUTRAL_EAR_MESH6H_FRONT_CAPTURE_IMPLEMENTATION_FR104,
    ).toEqual({
      repository: 'gycha0109-beep/Saju',
      repositoryCommit:
        '0032700ae853be54e2797a7acdce9ab63db796c7',
      sourcePath:
        'packages/face-reading/src/mesh6h-browser-camera-frame-source.ts',
      sourceBlobSha:
        '0dccf5dee0b69bae24e2b79f1d4e69ca81646396',
      cameraFacing: 'front',
    });
  });

  it('rejects a binding assertion with different downstream evidence objects', async () => {
    const handle = await openHandle();
    const session =
      createNeutralEarControlledCaptureRuntimeFrameBindingSessionFR104({
        handle,
        profileRef: 'fr21b.profile.front.pending',
      });
    const frameTransformParity = parity();
    const pixelIdentityEvidence = fingerprint();

    for await (
      const boundFrame of session.createBoundFrameSource(triggers())
    ) {
      const binding = session.bindEvidence(
        boundFrame,
        { frameTransformParity, pixelIdentityEvidence },
      );

      expect(() =>
        assertIssuedNeutralEarControlledCaptureRuntimeFrameProfileBindingFR104(
          binding,
          {
            profileRef: 'fr21b.profile.front.pending',
            frameTransformParity: parity(),
            pixelIdentityEvidence,
          },
        ),
      ).toThrow(/exact profileRef, frame-transform evidence/i);
    }

    handle.close();
  });

  it('rejects structurally forged binding objects', async () => {
    const handle = await openHandle();
    const session =
      createNeutralEarControlledCaptureRuntimeFrameBindingSessionFR104({
        handle,
        profileRef: 'fr21b.profile.front.pending',
      });
    const frameTransformParity = parity();
    const pixelIdentityEvidence = fingerprint();

    for await (
      const boundFrame of session.createBoundFrameSource(triggers())
    ) {
      const binding = session.bindEvidence(
        boundFrame,
        { frameTransformParity, pixelIdentityEvidence },
      );
      const forged = {
        ...binding,
        blockers: [...binding.blockers],
      };

      expect(() =>
        assertIssuedNeutralEarControlledCaptureRuntimeFrameProfileBindingFR104(
          forged,
          {
            profileRef: 'fr21b.profile.front.pending',
            frameTransformParity,
            pixelIdentityEvidence,
          },
        ),
      ).toThrow(/not issued by the active D2A runtime/i);
    }

    handle.close();
  });
});
