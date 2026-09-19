import { describe, expect, it } from 'vitest';

import {
  FR200_FACE_OVAL_VERTICES,
  FR200_LEFT_EYE_VERTICES,
  FR200_LIP_VERTICES,
  FR200_RIGHT_EYE_VERTICES,
  deriveMediaPipeMidfaceEnvelopeFR200,
  type MediaPipeLandmarkFR200V1,
} from './face-reading-mediapipe-midface-envelope-fr200.js';
import { FaceAuthorityValidationError } from './validation.js';

function makeLandmarks(): MediaPipeLandmarkFR200V1[] {
  const landmarks = Array.from({ length: 478 }, () => ({ x: 0.5, y: 0.5, z: 0 }));

  for (const index of FR200_LEFT_EYE_VERTICES) landmarks[index] = { x: 0.65, y: 0.3, z: 0 };
  for (const index of FR200_RIGHT_EYE_VERTICES) landmarks[index] = { x: 0.35, y: 0.3, z: 0 };
  for (const index of FR200_LIP_VERTICES) landmarks[index] = { x: 0.5, y: 0.7, z: 0 };

  for (let ordinal = 0; ordinal < FR200_FACE_OVAL_VERTICES.length; ordinal += 1) {
    const index = FR200_FACE_OVAL_VERTICES[ordinal]!;
    landmarks[index] = { x: 0.5, y: 0.1 + (0.8 * ordinal) / (FR200_FACE_OVAL_VERTICES.length - 1), z: 0 };
  }

  landmarks[234] = { x: 0.2, y: 0.4, z: 0 };
  landmarks[454] = { x: 0.8, y: 0.4, z: 0 };
  landmarks[127] = { x: 0.15, y: 0.42, z: 0 };
  landmarks[356] = { x: 0.85, y: 0.42, z: 0 };
  landmarks[10] = { x: 0.5, y: 0.1, z: 0 };
  landmarks[152] = { x: 0.5, y: 0.9, z: 0 };

  return landmarks;
}

const IDENTITY = Object.freeze({
  rows: 4,
  columns: 4,
  data: Object.freeze([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  ]),
});

describe('FR200 MediaPipe midface envelope', () => {
  it('derives a roll-normalized band envelope without admitting anatomical zygion indices', () => {
    const receipt = deriveMediaPipeMidfaceEnvelopeFR200({
      landmarks: makeLandmarks(),
      facialTransformationMatrix: IDENTITY,
    });

    expect(receipt.schemaVersion).toBe('fr200-mediapipe-midface-envelope-v1');
    expect(receipt.geometry.bandEnvelopeProviderIndices).toEqual([127, 356]);
    expect(receipt.geometry.bandEnvelopeWidth).toBeCloseTo(0.7, 12);
    expect(receipt.geometry.fixed234454Width).toBeCloseTo(0.6, 12);
    expect(receipt.geometry.faceOvalHeight).toBeCloseTo(0.8, 12);
    expect(receipt.geometry.bandEnvelopeWidthByOvalHeight).toBeCloseTo(0.875, 12);
    expect(receipt.geometry.fixed234454WidthByOvalHeight).toBeCloseTo(0.75, 12);
    expect(receipt.faceGeometryTransform.yawDegreesXYZConvention).toBeCloseTo(0, 12);
    expect(receipt.providerIndexAdmissionAuthorized).toBe(false);
    expect(receipt.anatomicalZygionClaimAuthorized).toBe(false);
    expect(receipt.productionAuthorized).toBe(false);
    expect(receipt.commerceAuthorized).toBe(false);
  });

  it('removes in-plane eye-line roll before computing the envelope', () => {
    const landmarks = makeLandmarks();
    const angle = Math.PI / 12;
    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);
    for (let index = 0; index < landmarks.length; index += 1) {
      const original = landmarks[index]!;
      const dx = original.x - 0.5;
      const dy = original.y - 0.5;
      landmarks[index] = {
        x: 0.5 + cosine * dx - sine * dy,
        y: 0.5 + sine * dx + cosine * dy,
        z: original.z,
      };
    }

    const receipt = deriveMediaPipeMidfaceEnvelopeFR200({
      landmarks,
      facialTransformationMatrix: IDENTITY,
    });

    expect(Math.abs(receipt.geometry.eyeLineRollRadians)).toBeCloseTo(angle, 12);
    expect(receipt.geometry.bandEnvelopeWidth).toBeCloseTo(0.7, 12);
    expect(receipt.geometry.fixed234454Width).toBeCloseTo(0.6, 12);
  });

  it('accepts the MediaPipe column-major rigid-transform packing with translation in indices 12-14', () => {
    const receipt = deriveMediaPipeMidfaceEnvelopeFR200({
      landmarks: makeLandmarks(),
      facialTransformationMatrix: {
        rows: 4,
        columns: 4,
        data: [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          12, -3, 40, 1,
        ],
      },
    });

    expect(receipt.faceGeometryTransform.uniformScaleEstimate).toBeCloseTo(1, 12);
    expect(receipt.faceGeometryTransform.normalizedRotationDeterminant).toBeCloseTo(1, 12);
    expect(receipt.faceGeometryTransform.yawDegreesXYZConvention).toBeCloseTo(0, 12);
  });

  it('fails closed when the Face Geometry transform is not a finite 4x4 rigid form', () => {
    expect(() =>
      deriveMediaPipeMidfaceEnvelopeFR200({
        landmarks: makeLandmarks(),
        facialTransformationMatrix: {
          rows: 4,
          columns: 4,
          data: [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 2,
          ],
        },
      }),
    ).toThrow(FaceAuthorityValidationError);
  });

  it('fails closed when provider landmarks do not cover the required topology', () => {
    expect(() =>
      deriveMediaPipeMidfaceEnvelopeFR200({
        landmarks: makeLandmarks().slice(0, 454),
        facialTransformationMatrix: IDENTITY,
      }),
    ).toThrow(FaceAuthorityValidationError);
  });
});
