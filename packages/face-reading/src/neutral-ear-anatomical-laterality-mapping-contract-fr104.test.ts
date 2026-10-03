import { describe, expect, it } from 'vitest';
import {
  createNeutralEarDualConsumerPixelFingerprintSessionFR104,
} from './neutral-ear-dual-consumer-pixel-fingerprint-fr104.js';
import {
  deriveNeutralEarFrameTransformParityFR104,
} from './neutral-ear-frame-transform-parity-fr104.js';
import {
  attemptNeutralEarAnatomicalLateralityMappingFR104,
  deriveNeutralEarProviderLateralGeometryFR104,
} from './neutral-ear-anatomical-laterality-mapping-contract-fr104.js';
import {
  issueNeutralEarCaptureTransformReceiptFR104,
} from './neutral-ear-capture-transform-provenance-receipt-fr104.js';
import {
  resolveNeutralEarControlledCaptureMirrorProvenanceFR104,
} from './neutral-ear-controlled-capture-mirror-provenance-fr104.js';

function parity(
  horizontalMirrorApplied = false,
  exifApplication:
    | 'not_present'
    | 'unknown' = 'not_present',
) {
  const receipt =
    issueNeutralEarCaptureTransformReceiptFR104({
      schemaVersion:
        'fr104-neutral-ear-capture-transform-receipt-input-v1',
      decodedFrame: { width: 640, height: 480 },
      exif: {
        orientationTag: null,
        application: exifApplication,
      },
      explicitPostDecodeTransform: {
        rotationDegrees: 0,
        horizontalMirrorApplied,
      },
      consumerFrame: { width: 640, height: 480 },
    });
  return deriveNeutralEarFrameTransformParityFR104(receipt);
}

function fingerprint(equal = true) {
  const session =
    createNeutralEarDualConsumerPixelFingerprintSessionFR104();
  session.observe(
    'florence',
    Uint8Array.from([1, 2, 3]),
  );
  session.observe(
    'face_landmarker',
    Uint8Array.from(equal ? [1, 2, 3] : [1, 2, 4]),
  );
  return session.finalize();
}

function geometry(candidate: { x: number; y: number }) {
  return deriveNeutralEarProviderLateralGeometryFR104({
    schemaVersion:
      'fr104-neutral-ear-provider-lateral-geometry-input-v1',
    providerLeftEyeCentroid: { x: 0.7, y: 0.5 },
    providerRightEyeCentroid: { x: 0.3, y: 0.5 },
    candidateCentroid: candidate,
  });
}

function requestEvidence(input?: {
  readonly horizontalMirrorApplied?: boolean;
  readonly equalPixels?: boolean;
}) {
  const frameTransformParity =
    parity(input?.horizontalMirrorApplied ?? false);
  const pixelIdentityEvidence =
    fingerprint(input?.equalPixels ?? true);
  const controlledCaptureMirrorProvenance =
    resolveNeutralEarControlledCaptureMirrorProvenanceFR104({
      schemaVersion:
        'fr104-neutral-ear-controlled-capture-mirror-provenance-request-v1',
      source: { kind: 'ordinary_file_upload' },
      frameTransformParity,
      pixelIdentityEvidence,
    });

  return {
    frameTransformParity,
    pixelIdentityEvidence,
    controlledCaptureMirrorProvenance,
  };
}

describe('FR104 anatomical laterality mapping skeleton after U5B-D', () => {
  it('uses the provider eye axis rather than image center thresholds', () => {
    const left = geometry({ x: 0.95, y: 0.5 });
    const right = geometry({ x: 0.05, y: 0.5 });
    const between = geometry({ x: 0.5, y: 0.5 });

    expect(left.relation).toBe('provider_left_lateral');
    expect(right.relation).toBe('provider_right_lateral');
    expect(between.relation)
      .toBe('between_or_not_beyond_eye_envelope');
    expect(left.geometry.arbitraryNumericThresholdApplied)
      .toBe(false);
  });

  it('fails provider lateral geometry closed for a degenerate eye axis', () => {
    const result =
      deriveNeutralEarProviderLateralGeometryFR104({
        schemaVersion:
          'fr104-neutral-ear-provider-lateral-geometry-input-v1',
        providerLeftEyeCentroid: { x: 0.5, y: 0.5 },
        providerRightEyeCentroid: { x: 0.5, y: 0.5 },
        candidateCentroid: { x: 0.9, y: 0.5 },
      });

    expect(result.relation)
      .toBe('unavailable_degenerate_eye_axis');
    expect(
      result.geometry.candidateProjectionTowardProviderLeft,
    ).toBeNull();
  });

  it('clears the cross-source mapping blocker but keeps ordinary-upload capture provenance fail-closed', () => {
    const evidence = requestEvidence();
    const result =
      attemptNeutralEarAnatomicalLateralityMappingFR104({
        schemaVersion:
          'fr104-neutral-ear-anatomical-laterality-mapping-request-v1',
        runtime: {
          packageName: '@mediapipe/tasks-vision',
          packageVersion: '0.10.35',
        },
        providerLateralGeometry:
          geometry({ x: 0.95, y: 0.5 }),
        ...evidence,
        evidenceUse: {
          florencePromptSideConsumedAsAnatomicalSide: false,
          imageSpaceXSignConsumedAsAnatomicalSide: false,
        },
      });

    expect(result.anatomicalSide).toBe('unknown');
    expect(result.blockers).not.toContain(
      'cross_source_geometric_mapping_not_admitted',
    );
    expect(result.blockers).toContain(
      'subject_relative_capture_mirror_provenance_unavailable',
    );
    expect(result.blockers).toContain(
      'anatomical_mapping_not_admitted',
    );
    expect(result.blockers).not.toContain(
      'same_pixel_frame_not_independently_verified',
    );
  });

  it('keeps mirrored parity descriptive until exact controlled-capture frame provenance is verified', () => {
    const evidence = requestEvidence({
      horizontalMirrorApplied: true,
    });
    const result =
      attemptNeutralEarAnatomicalLateralityMappingFR104({
        schemaVersion:
          'fr104-neutral-ear-anatomical-laterality-mapping-request-v1',
        runtime: {
          packageName: '@mediapipe/tasks-vision',
          packageVersion: '0.10.35',
        },
        providerLateralGeometry:
          geometry({ x: 0.95, y: 0.5 }),
        ...evidence,
        evidenceUse: {
          florencePromptSideConsumedAsAnatomicalSide: false,
          imageSpaceXSignConsumedAsAnatomicalSide: false,
        },
      });

    expect(result.frameReflectionParity)
      .toBe('orientation_reversing');
    expect(result.anatomicalSide).toBe('unknown');
    expect(result.blockers).toContain(
      'subject_relative_capture_mirror_provenance_unavailable',
    );
  });

  it('retains blockers for pixel mismatch and non-lateral candidate', () => {
    const evidence = requestEvidence({ equalPixels: false });
    const result =
      attemptNeutralEarAnatomicalLateralityMappingFR104({
        schemaVersion:
          'fr104-neutral-ear-anatomical-laterality-mapping-request-v1',
        runtime: {
          packageName: '@mediapipe/tasks-vision',
          packageVersion: '0.10.35',
        },
        providerLateralGeometry:
          geometry({ x: 0.5, y: 0.5 }),
        ...evidence,
        evidenceUse: {
          florencePromptSideConsumedAsAnatomicalSide: false,
          imageSpaceXSignConsumedAsAnatomicalSide: false,
        },
      });

    expect(result.blockers).toContain(
      'same_pixel_frame_not_independently_verified',
    );
    expect(result.blockers).toContain(
      'candidate_not_outside_provider_eye_envelope',
    );
    expect(result.blockers).toContain(
      'subject_relative_capture_mirror_provenance_unavailable',
    );
  });

  it('rejects runtime drift and prohibited evidence injection', () => {
    const evidence = requestEvidence();
    const base = {
      schemaVersion:
        'fr104-neutral-ear-anatomical-laterality-mapping-request-v1' as const,
      runtime: {
        packageName: '@mediapipe/tasks-vision' as const,
        packageVersion: '0.10.36',
      },
      providerLateralGeometry:
        geometry({ x: 0.95, y: 0.5 }),
      ...evidence,
      evidenceUse: {
        florencePromptSideConsumedAsAnatomicalSide: false as const,
        imageSpaceXSignConsumedAsAnatomicalSide: false as const,
      },
    };

    const drift =
      attemptNeutralEarAnatomicalLateralityMappingFR104(base);
    expect(drift.blockers).toContain(
      'runtime_not_exactly_reviewed',
    );

    expect(() =>
      attemptNeutralEarAnatomicalLateralityMappingFR104({
        ...base,
        runtime: {
          packageName: '@mediapipe/tasks-vision',
          packageVersion: '0.10.35',
        },
        evidenceUse: {
          florencePromptSideConsumedAsAnatomicalSide:
            true,
          imageSpaceXSignConsumedAsAnatomicalSide:
            false,
        },
      } as never),
    ).toThrow(/prohibited as anatomical authority/i);
  });

  it('rejects a provenance result bound to different transform evidence', () => {
    const evidence = requestEvidence();
    expect(() =>
      attemptNeutralEarAnatomicalLateralityMappingFR104({
        schemaVersion:
          'fr104-neutral-ear-anatomical-laterality-mapping-request-v1',
        runtime: {
          packageName: '@mediapipe/tasks-vision',
          packageVersion: '0.10.35',
        },
        providerLateralGeometry:
          geometry({ x: 0.95, y: 0.5 }),
        frameTransformParity: parity(false),
        pixelIdentityEvidence: evidence.pixelIdentityEvidence,
        controlledCaptureMirrorProvenance:
          evidence.controlledCaptureMirrorProvenance,
        evidenceUse: {
          florencePromptSideConsumedAsAnatomicalSide: false,
          imageSpaceXSignConsumedAsAnatomicalSide: false,
        },
      }),
    ).toThrow(/exact frame-transform and pixel-identity evidence objects/i);
  });
});
