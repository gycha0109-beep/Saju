import { describe, expect, it } from 'vitest';

import {
  assertNeutralEarFaceLandmarkerGeometryBoundToInvocationFR104,
  consumeIssuedNeutralEarFaceLandmarkerGeometryFR104,
  createNeutralEarFaceLandmarkerGeometryCaptureFR104,
} from './neutral-ear-face-landmarker-geometry-handle-fr104.js';

function landmarks() {
  return Object.freeze(Array.from({ length: 478 }, (_, index) =>
    Object.freeze({
      x: index % 2 === 0 ? 0.2 : 0.8,
      y: index % 3 === 0 ? 0.25 : 0.75,
      z: index / 10_000,
    })));
}

function capture() {
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

describe('FR104 same-run FaceLandmarker geometry handle', () => {
  it('binds the opaque geometry handle to the exact invocation summary and clears geometry after one consumption', async () => {
    const geometryCapture = capture();
    const summary = await geometryCapture.adapter.invoke({
      bytes: new Uint8Array(16),
      width: 2,
      height: 2,
      providerRunRef: 'fr104:b3:geometry:001',
    });
    const handle = geometryCapture.takeGeometryHandle(
      'fr104:b3:geometry:001',
    );

    expect(() =>
      assertNeutralEarFaceLandmarkerGeometryBoundToInvocationFR104(
        summary,
        handle,
      ),
    ).not.toThrow();

    let retainedPoint:
      | { readonly x: number; readonly y: number; readonly z: number }
      | undefined;
    const count =
      consumeIssuedNeutralEarFaceLandmarkerGeometryFR104(
        handle,
        (geometry) => {
          expect(geometry.providerRunRef)
            .toBe('fr104:b3:geometry:001');
          expect(geometry.frameWidth).toBe(2);
          expect(geometry.frameHeight).toBe(2);
          expect(geometry.screenLandmarks).toHaveLength(468);
          retainedPoint = geometry.screenLandmarks[0];
          return geometry.screenLandmarks.length;
        },
      );

    expect(count).toBe(468);
    expect(retainedPoint).toEqual({ x: 0, y: 0, z: 0 });
    expect(() =>
      consumeIssuedNeutralEarFaceLandmarkerGeometryFR104(
        handle,
        () => undefined,
      ),
    ).toThrow(/already been consumed or cleared/i);
  });

  it('rejects a structurally copied invocation summary', async () => {
    const geometryCapture = capture();
    const summary = await geometryCapture.adapter.invoke({
      bytes: new Uint8Array(16),
      width: 2,
      height: 2,
      providerRunRef: 'fr104:b3:geometry:002',
    });
    const handle = geometryCapture.takeGeometryHandle(
      'fr104:b3:geometry:002',
    );

    expect(() =>
      assertNeutralEarFaceLandmarkerGeometryBoundToInvocationFR104(
        { ...summary },
        handle,
      ),
    ).toThrow(/exact FaceLandmarker invocation summary/i);

    geometryCapture.discardPendingGeometry(
      'fr104:b3:geometry:002',
    );
  });

  it('supports explicit pending-geometry discard before downstream composition', async () => {
    const geometryCapture = capture();
    await geometryCapture.adapter.invoke({
      bytes: new Uint8Array(16),
      width: 2,
      height: 2,
      providerRunRef: 'fr104:b3:geometry:003',
    });

    expect(
      geometryCapture.discardPendingGeometry(
        'fr104:b3:geometry:003',
      ),
    ).toBe(true);
    expect(
      geometryCapture.discardPendingGeometry(
        'fr104:b3:geometry:003',
      ),
    ).toBe(false);
    expect(() =>
      geometryCapture.takeGeometryHandle(
        'fr104:b3:geometry:003',
      ),
    ).toThrow(/no pending geometry handle/i);
  });
});
