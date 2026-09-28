import { describe, expect, it } from 'vitest';
import type {
  FR257EphemeralGeometryObservation,
} from './observable-morphology-capture-geometry-attribution-fr257.js';
import { deriveNeutralEarSameFrameFaceEnvelopeFR104 } from './neutral-ear-same-frame-face-envelope-adapter-fr104.js';

function syntheticGeometry(): FR257EphemeralGeometryObservation {
  const screenLandmarks = Array.from({ length: 468 }, (_, index) => {
    const phase = index % 4;
    if (phase === 0) return Object.freeze({ x: 0.2, y: 0.15, z: 0 });
    if (phase === 1) return Object.freeze({ x: 0.8, y: 0.15, z: 0 });
    if (phase === 2) return Object.freeze({ x: 0.8, y: 0.85, z: 0 });
    return Object.freeze({ x: 0.2, y: 0.85, z: 0 });
  });

  return Object.freeze({
    providerRunRef: 'fixture:fr257-provider-run',
    screenLandmarks: Object.freeze(screenLandmarks),
    metricLandmarks: Object.freeze(
      Array.from({ length: 468 }, () => Object.freeze({ x: 0, y: 0, z: 0 })),
    ),
    poseTransformMatrixPackedColumnMajor: Object.freeze([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ]),
    frameWidth: 1200,
    frameHeight: 1600,
    primaryMetric: Object.freeze({
      metricRef: 'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0',
      value: 0,
      unit: 'degree',
    }),
  } as FR257EphemeralGeometryObservation);
}

describe('FR104 ephemeral same-frame face-envelope adapter', () => {
  it('derives only a bounded normalized envelope from ephemeral governed screen geometry', () => {
    const result = deriveNeutralEarSameFrameFaceEnvelopeFR104({
      schemaVersion: 'fr104-neutral-ear-same-frame-envelope-request-v1',
      candidateFrame: Object.freeze({ width: 1200, height: 1600 }),
      sameFrameAttested: true,
      geometry: syntheticGeometry(),
    });

    expect(result.faceEnvelope).toEqual({
      schemaVersion: 'fr104-neutral-ear-face-envelope-input-v1',
      coordinateFrame: 'canonical_image_normalized_2d',
      sourceAuthority: 'governed_same_frame_face_geometry_adapter_required',
      sameFrameBinding: 'caller_attested_ephemeral_not_independently_verified',
      minX: 0.2,
      minY: 0.15,
      maxX: 0.8,
      maxY: 0.85,
    });
    expect(result.providerRunRef).toBe('fixture:fr257-provider-run');
    expect(result.bindingEvidence.candidateAndGeometryFrameDimensionsMatch).toBe(true);
    expect(
      result.bindingEvidence.sameFrameAttestationAcceptedButNotIndependentlyVerified,
    ).toBe(true);
  });

  it('does not promote the face envelope into an ear zone or plausibility decision', () => {
    const result = deriveNeutralEarSameFrameFaceEnvelopeFR104({
      schemaVersion: 'fr104-neutral-ear-same-frame-envelope-request-v1',
      candidateFrame: Object.freeze({ width: 1200, height: 1600 }),
      sameFrameAttested: true,
      geometry: syntheticGeometry(),
    });

    expect(result.authority.faceEnvelopeMayBeCalledEarZone).toBe(false);
    expect(result.authority.faceRelativeEvidenceMayBeCalledEarPlausibility)
      .toBe(false);
    expect(result.authority.numericThresholdAuthorized).toBe(false);
    expect(result.authority.anatomicalLateralityAuthorized).toBe(false);
    expect(result.authority.validatedExternalEarObservation).toBe(false);
    expect(result.authority.traditionalBindingAuthorized).toBe(false);
    expect(result.authority.productionAuthorization).toBe(false);
  });

  it('keeps orientation mirror and anatomical laterality unresolved', () => {
    const result = deriveNeutralEarSameFrameFaceEnvelopeFR104({
      schemaVersion: 'fr104-neutral-ear-same-frame-envelope-request-v1',
      candidateFrame: Object.freeze({ width: 1200, height: 1600 }),
      sameFrameAttested: true,
      geometry: syntheticGeometry(),
    });

    expect(result.provenanceResolution.exifOrientationResolved).toBe(false);
    expect(result.provenanceResolution.decodedPixelOrientationResolved).toBe(false);
    expect(result.provenanceResolution.frontCameraMirrorResolved).toBe(false);
    expect(result.provenanceResolution.anatomicalLateralityResolved).toBe(false);
  });

  it('fails closed when the candidate and governed geometry dimensions differ', () => {
    expect(() => deriveNeutralEarSameFrameFaceEnvelopeFR104({
      schemaVersion: 'fr104-neutral-ear-same-frame-envelope-request-v1',
      candidateFrame: Object.freeze({ width: 1600, height: 1200 }),
      sameFrameAttested: true,
      geometry: syntheticGeometry(),
    })).toThrow(/dimensions must exactly match/i);
  });

  it('fails closed on collapsed or malformed screen geometry', () => {
    const collapsed = Object.freeze({
      ...syntheticGeometry(),
      screenLandmarks: Object.freeze(
        Array.from({ length: 468 }, () => Object.freeze({ x: 0.5, y: 0.5, z: 0 })),
      ),
    }) as FR257EphemeralGeometryObservation;

    expect(() => deriveNeutralEarSameFrameFaceEnvelopeFR104({
      schemaVersion: 'fr104-neutral-ear-same-frame-envelope-request-v1',
      candidateFrame: Object.freeze({ width: 1200, height: 1600 }),
      sameFrameAttested: true,
      geometry: collapsed,
    })).toThrow(/positive face envelope/i);
  });

  it('returns no raw-landmark or image-digest persistence authority', () => {
    const result = deriveNeutralEarSameFrameFaceEnvelopeFR104({
      schemaVersion: 'fr104-neutral-ear-same-frame-envelope-request-v1',
      candidateFrame: Object.freeze({ width: 1200, height: 1600 }),
      sameFrameAttested: true,
      geometry: syntheticGeometry(),
    });

    expect(result.privacy).toEqual({
      rawScreenLandmarksPersisted: false,
      rawMetricLandmarksPersisted: false,
      poseTransformMatrixPersisted: false,
      rawCandidatePolygonPersisted: false,
      imageDigestPersisted: false,
    });
  });
});
