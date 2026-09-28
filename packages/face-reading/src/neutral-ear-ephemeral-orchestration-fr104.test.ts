import { describe, expect, it } from 'vitest';
import type {
  FR257EphemeralGeometryObservation,
} from './observable-morphology-capture-geometry-attribution-fr257.js';
import {
  orchestrateNeutralEarCandidateFR104,
  type NeutralEarOrientationMirrorProvenanceFR104V1,
} from './neutral-ear-ephemeral-orchestration-fr104.js';

function geometry(): FR257EphemeralGeometryObservation {
  const screenLandmarks = Array.from({ length: 468 }, (_, index) => {
    const phase = index % 4;
    if (phase === 0) return Object.freeze({ x: 0.25, y: 0.15, z: 0 });
    if (phase === 1) return Object.freeze({ x: 0.75, y: 0.15, z: 0 });
    if (phase === 2) return Object.freeze({ x: 0.75, y: 0.85, z: 0 });
    return Object.freeze({ x: 0.25, y: 0.85, z: 0 });
  });

  return Object.freeze({
    providerRunRef: 'fixture:fr104-orchestration-provider-run',
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
      unit: 'degree',
      value: 0,
    }),
  });
}

const candidate = Object.freeze({
  schemaVersion: 'fr104-neutral-ear-candidate-shape-input-v1' as const,
  candidateRef: 'fixture:fr104-candidate',
  coordinateFrame: 'canonical_image_normalized_2d' as const,
  exactStructuralDegeneracyAlreadyRejected: true as const,
  points: Object.freeze([
    Object.freeze({ x: 0.78, y: 0.35 }),
    Object.freeze({ x: 0.86, y: 0.36 }),
    Object.freeze({ x: 0.87, y: 0.55 }),
    Object.freeze({ x: 0.79, y: 0.56 }),
  ]),
});

const unknownProvenance: NeutralEarOrientationMirrorProvenanceFR104V1 =
  Object.freeze({
    schemaVersion:
      'fr104-neutral-ear-orientation-mirror-provenance-v1',
    sharedDecodedPixelFrame: Object.freeze({
      candidateAndGeometrySamePixelOrientationAttested: true,
      independentlyVerified: false,
    }),
    exifOrientation: Object.freeze({
      state: 'unknown',
      source: 'unknown',
      independentlyVerified: false,
    }),
    frontCameraMirror: Object.freeze({
      state: 'unknown',
      source: 'unknown',
      independentlyVerified: false,
    }),
  });

const declaredProvenance: NeutralEarOrientationMirrorProvenanceFR104V1 =
  Object.freeze({
    schemaVersion:
      'fr104-neutral-ear-orientation-mirror-provenance-v1',
    sharedDecodedPixelFrame: Object.freeze({
      candidateAndGeometrySamePixelOrientationAttested: true,
      independentlyVerified: false,
    }),
    exifOrientation: Object.freeze({
      state: 'absent_or_not_required',
      source: 'capture_pipeline_attestation',
      independentlyVerified: false,
    }),
    frontCameraMirror: Object.freeze({
      state: 'not_mirrored',
      source: 'operator_declaration',
      independentlyVerified: false,
    }),
  });

function request(
  provenance: NeutralEarOrientationMirrorProvenanceFR104V1,
) {
  return {
    schemaVersion:
      'fr104-neutral-ear-ephemeral-orchestration-request-v1' as const,
    candidate,
    candidateFrame: Object.freeze({
      width: 1200,
      height: 1600,
    }),
    sameFrameAttested: true as const,
    geometry: geometry(),
    orientationMirrorProvenance: provenance,
  };
}

describe('FR104 ephemeral ear candidate orchestration', () => {
  it('binds one candidate and one governed face envelope into bounded descriptive evidence', () => {
    const result = orchestrateNeutralEarCandidateFR104(
      request(unknownProvenance),
    );

    expect(result.candidateRef).toBe('fixture:fr104-candidate');
    expect(result.providerRunRef).toBe(
      'fixture:fr104-orchestration-provider-run',
    );
    expect(result.shapeEvidence.pointCount).toBe(4);
    expect(
      result.faceRelativeEvidence
        .candidateCentroidAbsoluteOffsetFromFaceCenterXInFaceWidths,
    ).toBeGreaterThan(0);
    expect(
      result.faceRelativeEvidence.imageSpaceHorizontalSign,
    ).toBe('positive');
  });

  it('fails anatomical laterality closed when EXIF and mirror provenance are unresolved', () => {
    const result = orchestrateNeutralEarCandidateFR104(
      request(unknownProvenance),
    );

    expect(result.laterality.anatomicalSide).toBe('unknown');
    expect(result.laterality.blockers).toContain(
      'exif_orientation_provenance_unresolved',
    );
    expect(result.laterality.blockers).toContain(
      'front_camera_mirror_provenance_unresolved',
    );
    expect(result.laterality.blockers).toContain(
      'same_pixel_frame_not_independently_verified',
    );
    expect(result.laterality.blockers).toContain(
      'anatomical_mapping_not_implemented',
    );
  });

  it('still keeps laterality unknown when orientation and mirror values are merely declared', () => {
    const result = orchestrateNeutralEarCandidateFR104(
      request(declaredProvenance),
    );

    expect(result.provenance.exifOrientation.state)
      .toBe('absent_or_not_required');
    expect(result.provenance.frontCameraMirror.state)
      .toBe('not_mirrored');
    expect(result.laterality.anatomicalSide).toBe('unknown');
    expect(result.laterality.blockers).not.toContain(
      'exif_orientation_provenance_unresolved',
    );
    expect(result.laterality.blockers).not.toContain(
      'front_camera_mirror_provenance_unresolved',
    );
    expect(result.laterality.blockers).toContain(
      'same_pixel_frame_not_independently_verified',
    );
    expect(result.laterality.blockers).toContain(
      'anatomical_mapping_not_implemented',
    );
  });

  it('does not treat image-space sign, prompt side, pair agreement, or shape descriptors as acceptance', () => {
    const result = orchestrateNeutralEarCandidateFR104(
      request(declaredProvenance),
    );

    expect(
      result.laterality.imageSpaceHorizontalSignConsumedAsAnatomicalSide,
    ).toBe(false);
    expect(result.laterality.promptSideConsumedAsAnatomicalSide)
      .toBe(false);
    expect(result.authority.pairAgreementUsedAsAcceptance).toBe(false);
    expect(result.authority.shapeThresholdApplied).toBe(false);
    expect(result.authority.lateralZoneThresholdApplied).toBe(false);
    expect(result.authority.plausibilityClassificationIssued).toBe(false);
    expect(result.authority.validatedExternalEarObservation).toBe(false);
  });

  it('rejects a known EXIF state whose evidence source is unknown', () => {
    const forged = {
      ...declaredProvenance,
      exifOrientation: {
        ...declaredProvenance.exifOrientation,
        source: 'unknown',
      },
    } as NeutralEarOrientationMirrorProvenanceFR104V1;

    expect(() => orchestrateNeutralEarCandidateFR104(
      request(forged),
    )).toThrow(/EXIF orientation state\/source/i);
  });

  it('returns no raw candidate polygon, landmarks, pose matrix, source image, or image digest', () => {
    const result = orchestrateNeutralEarCandidateFR104(
      request(unknownProvenance),
    );

    expect(result.privacy).toEqual({
      sourceImagePersisted: false,
      sourceImageDigestPersisted: false,
      rawCandidatePolygonReturned: false,
      rawScreenLandmarksReturned: false,
      rawMetricLandmarksReturned: false,
      poseTransformMatrixReturned: false,
    });
    expect('points' in result.shapeEvidence).toBe(false);
    expect('screenLandmarks' in result).toBe(false);
    expect('metricLandmarks' in result).toBe(false);
  });

  it('keeps traditional and Production authority closed', () => {
    const result = orchestrateNeutralEarCandidateFR104(
      request(declaredProvenance),
    );

    expect(result.authority.anatomicalLateralityAuthorized).toBe(false);
    expect(result.authority.traditionalBindingAuthorized).toBe(false);
    expect(result.authority.productionAuthorization).toBe(false);
  });
});
