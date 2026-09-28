import { describe, expect, it } from 'vitest';
import {
  deriveNeutralEarCandidateShapeEvidenceFR104,
  deriveNeutralEarFaceRelativeEvidenceFR104,
} from './neutral-ear-plausibility-evidence-fr104.js';

const square = Object.freeze({
  schemaVersion: 'fr104-neutral-ear-candidate-shape-input-v1' as const,
  candidateRef: 'fixture:square',
  coordinateFrame: 'canonical_image_normalized_2d' as const,
  exactStructuralDegeneracyAlreadyRejected: true as const,
  points: Object.freeze([
    Object.freeze({ x: 0.1, y: 0.1 }),
    Object.freeze({ x: 0.3, y: 0.1 }),
    Object.freeze({ x: 0.3, y: 0.3 }),
    Object.freeze({ x: 0.1, y: 0.3 }),
  ]),
});

const thinStrip = Object.freeze({
  schemaVersion: 'fr104-neutral-ear-candidate-shape-input-v1' as const,
  candidateRef: 'fixture:thin-strip',
  coordinateFrame: 'canonical_image_normalized_2d' as const,
  exactStructuralDegeneracyAlreadyRejected: true as const,
  points: Object.freeze([
    Object.freeze({ x: 0.1, y: 0.4 }),
    Object.freeze({ x: 0.7, y: 0.4 }),
    Object.freeze({ x: 0.7, y: 0.406 }),
    Object.freeze({ x: 0.1, y: 0.406 }),
  ]),
});

const faceEnvelope = Object.freeze({
  schemaVersion: 'fr104-neutral-ear-face-envelope-input-v1' as const,
  coordinateFrame: 'canonical_image_normalized_2d' as const,
  sourceAuthority: 'governed_same_frame_face_geometry_adapter_required' as const,
  sameFrameBinding: 'caller_attested_ephemeral_not_independently_verified' as const,
  minX: 0.25,
  minY: 0.1,
  maxX: 0.75,
  maxY: 0.9,
});

describe('FR104 role-free ear plausibility evidence', () => {
  it('records continuous shape evidence without classifying or accepting the candidate', () => {
    const evidence = deriveNeutralEarCandidateShapeEvidenceFR104(square);

    expect(evidence.bbox.width).toBeCloseTo(0.2);
    expect(evidence.bbox.height).toBeCloseTo(0.2);
    expect(evidence.shapeEvidence.bboxShortToLongRatio).toBeCloseTo(1);
    expect(evidence.shapeEvidence.polygonAreaToBBoxAreaRatio).toBeCloseTo(1);
    expect(evidence.shapeEvidence.fourPiAreaToPerimeterSquared).toBeGreaterThan(0);

    expect(evidence.classification).toBeNull();
    expect(evidence.automaticAcceptanceThresholdApplied).toBe(false);
    expect(evidence.numericAcceptanceThresholdAuthorized).toBe(false);
    expect(evidence.anatomicalLateralityAssigned).toBe(false);
    expect(evidence.validatedExternalEarObservation).toBe(false);
  });

  it('makes a near-line non-zero fixture descriptively distinguishable without rejecting it', () => {
    const evidence = deriveNeutralEarCandidateShapeEvidenceFR104(thinStrip);

    expect(evidence.shapeEvidence.bboxShortToLongRatio).toBeCloseTo(0.01);
    expect(evidence.polygonArea).toBeGreaterThan(0);
    expect(evidence.classification).toBeNull();
    expect(evidence.automaticAcceptanceThresholdApplied).toBe(false);
    expect(evidence.validatedExternalEarObservation).toBe(false);
  });

  it('derives face-relative continuous evidence without inventing a lateral-zone cutoff', () => {
    const candidate = deriveNeutralEarCandidateShapeEvidenceFR104(square);
    const evidence = deriveNeutralEarFaceRelativeEvidenceFR104(
      candidate,
      faceEnvelope,
    );

    expect(evidence.candidateCentroidOffsetFromFaceCenterXInFaceWidths)
      .toBeCloseTo(-0.6);
    expect(evidence.candidateCentroidAbsoluteOffsetFromFaceCenterXInFaceWidths)
      .toBeCloseTo(0.6);
    expect(evidence.imageSpaceHorizontalSign).toBe('negative');
    expect(evidence.imageSpaceHorizontalSignMayBeCalledAnatomicalLaterality)
      .toBe(false);
    expect(evidence.plausibilityClassification).toBeNull();
    expect(evidence.lateralZoneThresholdApplied).toBe(false);
    expect(evidence.anatomicalLateralityAssigned).toBe(false);
  });

  it('keeps image-space sign separate from anatomical laterality', () => {
    const mirroredFixture = Object.freeze({
      ...square,
      candidateRef: 'fixture:positive-side',
      points: Object.freeze([
        Object.freeze({ x: 0.7, y: 0.1 }),
        Object.freeze({ x: 0.9, y: 0.1 }),
        Object.freeze({ x: 0.9, y: 0.3 }),
        Object.freeze({ x: 0.7, y: 0.3 }),
      ]),
    });
    const candidate = deriveNeutralEarCandidateShapeEvidenceFR104(mirroredFixture);
    const evidence = deriveNeutralEarFaceRelativeEvidenceFR104(
      candidate,
      faceEnvelope,
    );

    expect(evidence.imageSpaceHorizontalSign).toBe('positive');
    expect(evidence.imageSpaceHorizontalSignMayBeCalledAnatomicalLaterality)
      .toBe(false);
    expect(evidence.anatomicalLateralityAssigned).toBe(false);
  });

  it('fails closed on exact-degenerate geometry even when a caller falsely marks it as prechecked', () => {
    const line = Object.freeze({
      ...thinStrip,
      candidateRef: 'fixture:exact-line',
      points: Object.freeze([
        Object.freeze({ x: 0.1, y: 0.4 }),
        Object.freeze({ x: 0.4, y: 0.4 }),
        Object.freeze({ x: 0.7, y: 0.4 }),
      ]),
    });

    expect(() => deriveNeutralEarCandidateShapeEvidenceFR104(line))
      .toThrow(/exact structural degeneracy/i);
  });

  it('fails closed when face-envelope provenance is widened', () => {
    const candidate = deriveNeutralEarCandidateShapeEvidenceFR104(square);
    const forged = {
      ...faceEnvelope,
      sourceAuthority: 'caller_supplied_face_box',
    } as never;

    expect(() => deriveNeutralEarFaceRelativeEvidenceFR104(candidate, forged))
      .toThrow(/governed same-frame adapter boundary/i);
  });
});
