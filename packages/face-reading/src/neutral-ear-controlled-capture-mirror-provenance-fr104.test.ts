import { describe, expect, it } from 'vitest';
import {
  createNeutralEarDualConsumerPixelFingerprintSessionFR104,
} from './neutral-ear-dual-consumer-pixel-fingerprint-fr104.js';
import {
  deriveNeutralEarFrameTransformParityFR104,
} from './neutral-ear-frame-transform-parity-fr104.js';
import {
  issueNeutralEarCaptureTransformReceiptFR104,
} from './neutral-ear-capture-transform-provenance-receipt-fr104.js';
import {
  assertIssuedNeutralEarControlledCaptureMirrorProvenanceFR104,
  resolveNeutralEarControlledCaptureMirrorProvenanceFR104,
} from './neutral-ear-controlled-capture-mirror-provenance-fr104.js';
import {
  createNeutralEarControlledCaptureRuntimeFrameBindingSessionFR104,
} from './neutral-ear-controlled-capture-runtime-frame-binding-fr104.js';
import {
  openMesh6HBrowserCamera,
  type Mesh6HBrowserEnvironmentV1,
  type Mesh6HBrowserFrameTriggerV1,
  type Mesh6HVideoElementLikeV1,
} from './mesh6h-browser-camera-frame-source.js';

function parity(horizontalMirrorApplied = false) {
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
        horizontalMirrorApplied,
      },
      consumerFrame: { width: 640, height: 480 },
    }),
  );
}

function fingerprint(equal = true) {
  const session =
    createNeutralEarDualConsumerPixelFingerprintSessionFR104();
  session.observe('florence', Uint8Array.from([1, 2, 3]));
  session.observe(
    'face_landmarker',
    Uint8Array.from(equal ? [1, 2, 3] : [1, 2, 4]),
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
      getTracks: () => [{ stop: () => undefined }],
    }),
    createImageBitmap: async () => ({
      close: () => undefined,
    }),
  };
  return openMesh6HBrowserCamera({ video }, environment);
}

async function* triggers(): AsyncGenerator<Mesh6HBrowserFrameTriggerV1> {
  yield {
    timestampMs: 1000,
    providerRunRef: 'fr104:d2a:provenance:001',
  };
}

describe('FR104 controlled-capture mirror provenance bridge', () => {
  it('keeps ordinary file upload fail-closed even with resolved transform parity and identical consumer pixels', () => {
    const frameTransformParity = parity(false);
    const pixelIdentityEvidence = fingerprint(true);
    const result =
      resolveNeutralEarControlledCaptureMirrorProvenanceFR104({
        schemaVersion:
          'fr104-neutral-ear-controlled-capture-mirror-provenance-request-v1',
        source: { kind: 'ordinary_file_upload' },
        frameTransformParity,
        pixelIdentityEvidence,
      });

    expect(result.subjectRelativeMirrorProvenanceVerified)
      .toBe(false);
    expect(result.subjectRelativeSourcePixelMirrorPolicy)
      .toBe('unknown');
    expect(result.blockers).toContain(
      'ordinary_file_upload_is_not_controlled_capture',
    );
    expect(result.exactRuntimeBinding.bindingMechanismState)
      .toBe('not_applicable_ordinary_file_upload');
    expect(result.authority.ordinaryFileUploadPromotedToControlledCapture)
      .toBe(false);
    expect(result.authority.anatomicalLateralityAuthorized)
      .toBe(false);

    expect(() =>
      assertIssuedNeutralEarControlledCaptureMirrorProvenanceFR104(
        result,
        { frameTransformParity, pixelIdentityEvidence },
      ),
    ).not.toThrow();
  });

  it('fails closed for an unadmitted controlled-capture profile ref', () => {
    const frameTransformParity = parity(false);
    const pixelIdentityEvidence = fingerprint(true);
    const result =
      resolveNeutralEarControlledCaptureMirrorProvenanceFR104({
        schemaVersion:
          'fr104-neutral-ear-controlled-capture-mirror-provenance-request-v1',
        source: {
          kind: 'controlled_capture_profile',
          profileRef: 'fr21b.profile.front.unadmitted',
        },
        frameTransformParity,
        pixelIdentityEvidence,
      });

    expect(result.staticProfileEvidence.admittedProfileFound)
      .toBe(false);
    expect(result.blockers).toContain(
      'controlled_capture_profile_not_admitted',
    );
    expect(result.blockers).toContain(
      'runtime_frame_profile_binding_missing',
    );
    expect(result.subjectRelativeMirrorProvenanceVerified)
      .toBe(false);
  });

  it('consumes an issued D2A frame/profile binding but keeps consumer-byte provenance fail-closed', async () => {
    const handle = await openHandle();
    const bindingSession =
      createNeutralEarControlledCaptureRuntimeFrameBindingSessionFR104({
        handle,
        profileRef: 'fr21b.profile.front.pending',
      });
    const frameTransformParity = parity(false);
    const pixelIdentityEvidence = fingerprint(true);

    for await (
      const boundFrame of bindingSession.createBoundFrameSource(triggers())
    ) {
      const runtimeFrameProfileBinding =
        bindingSession.bindEvidence(
          boundFrame,
          { frameTransformParity, pixelIdentityEvidence },
        );

      const result =
        resolveNeutralEarControlledCaptureMirrorProvenanceFR104({
          schemaVersion:
            'fr104-neutral-ear-controlled-capture-mirror-provenance-request-v1',
          source: {
            kind: 'controlled_capture_profile',
            profileRef: 'fr21b.profile.front.pending',
            runtimeFrameProfileBinding,
          },
          frameTransformParity,
          pixelIdentityEvidence,
        });

      expect(result.exactRuntimeBinding.bindingMechanismState)
        .toBe(
          'mesh6h_front_captured_frame_object_binding_implemented_consumer_bytes_unverified',
        );
      expect(
        result.exactRuntimeBinding
          .capturedFrameObjectBoundToVerifiedProfileImplementation,
      ).toBe(false);
      expect(result.blockers).toContain(
        'runtime_frame_to_verified_profile_binding_not_verified',
      );
      expect(result.blockers).toContain(
        'captured_frame_to_consumer_bytes_not_independently_verified',
      );
      expect(result.blockers).toContain(
        'controlled_capture_profile_not_admitted',
      );
      expect(result.subjectRelativeMirrorProvenanceVerified)
        .toBe(false);
      expect(result.subjectRelativeSourcePixelMirrorPolicy)
        .toBe('unknown');
    }

    handle.close();
  });

  it('preserves transform/pixel blockers independently from capture-profile authority', () => {
    const frameTransformParity =
      deriveNeutralEarFrameTransformParityFR104(
        issueNeutralEarCaptureTransformReceiptFR104({
          schemaVersion:
            'fr104-neutral-ear-capture-transform-receipt-input-v1',
          decodedFrame: { width: 640, height: 480 },
          exif: {
            orientationTag: null,
            application: 'unknown',
          },
          explicitPostDecodeTransform: {
            rotationDegrees: 0,
            horizontalMirrorApplied: false,
          },
          consumerFrame: { width: 640, height: 480 },
        }),
      );
    const pixelIdentityEvidence = fingerprint(false);

    const result =
      resolveNeutralEarControlledCaptureMirrorProvenanceFR104({
        schemaVersion:
          'fr104-neutral-ear-controlled-capture-mirror-provenance-request-v1',
        source: { kind: 'ordinary_file_upload' },
        frameTransformParity,
        pixelIdentityEvidence,
      });

    expect(result.blockers).toContain(
      'consumer_frame_reflection_parity_unresolved',
    );
    expect(result.blockers).toContain(
      'same_pixel_frame_not_independently_verified',
    );
  });

  it('binds an issued provenance result to the exact evidence object identities', () => {
    const frameTransformParity = parity(false);
    const pixelIdentityEvidence = fingerprint(true);
    const result =
      resolveNeutralEarControlledCaptureMirrorProvenanceFR104({
        schemaVersion:
          'fr104-neutral-ear-controlled-capture-mirror-provenance-request-v1',
        source: { kind: 'ordinary_file_upload' },
        frameTransformParity,
        pixelIdentityEvidence,
      });

    expect(() =>
      assertIssuedNeutralEarControlledCaptureMirrorProvenanceFR104(
        result,
        {
          frameTransformParity: parity(false),
          pixelIdentityEvidence,
        },
      ),
    ).toThrow(/exact frame-transform and pixel-identity evidence objects/i);
  });

  it('rejects a structurally forged provenance object', () => {
    const frameTransformParity = parity(false);
    const pixelIdentityEvidence = fingerprint(true);
    const issued =
      resolveNeutralEarControlledCaptureMirrorProvenanceFR104({
        schemaVersion:
          'fr104-neutral-ear-controlled-capture-mirror-provenance-request-v1',
        source: { kind: 'ordinary_file_upload' },
        frameTransformParity,
        pixelIdentityEvidence,
      });
    const forged = {
      ...issued,
      blockers: [...issued.blockers],
    };

    expect(() =>
      assertIssuedNeutralEarControlledCaptureMirrorProvenanceFR104(
        forged,
        { frameTransformParity, pixelIdentityEvidence },
      ),
    ).toThrow(/not issued by the active FR104 bridge/i);
  });
});
