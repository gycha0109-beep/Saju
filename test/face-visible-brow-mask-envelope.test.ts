import { describe, expect, it } from 'vitest';
import {
  eyebrowBinaryFromOverlayRGBA,
  measureVisibleBrowMaskEnvelope,
  VISIBLE_BROW_MASK_ENVELOPE_VERSION,
} from '../tools/face-reading/two-view/visible-brow-mask-envelope.mjs';

const width = 40,
  height = 22;
function mask() {
  return new Uint8Array(width * height);
}
function rectangle(m: Uint8Array, x: number, y: number, w: number, h: number) {
  for (let row = y; row < y + h; row++)
    for (let col = x; col < x + w; col++) m[row * width + col] = 1;
  return m;
}
function paired() {
  const m = mask();
  rectangle(m, 4, 7, 8, 2);
  rectangle(m, 25, 6, 8, 4);
  return m;
}

describe('visible eyebrow mask envelope candidate', () => {
  it('measures distinct visible mask bands, not hair fibre or traditional features', () => {
    const measured = measureVisibleBrowMaskEnvelope(paired(), width, height);
    expect(measured).toMatchObject({
      methodVersion: VISIBLE_BROW_MASK_ENVELOPE_VERSION,
      status: 'available',
      candidateOnly: true,
      individualHairThicknessMeasured: false,
      hairDensityMeasured: false,
      anatomicalLateralityAssigned: false,
      accuracyValidated: false,
      traditionalBindingAuthorized: false,
    });
    if (measured.status !== 'available') throw Error();
    expect(measured.brows.map((x) => x.imageSide)).toEqual(['left', 'right']);
    expect(measured.brows[0]?.apparentMaskThicknessToLongSpan).toBeCloseTo(0.25);
    expect(measured.brows[1]?.apparentMaskThicknessToLongSpan).toBeCloseTo(0.5);
  });

  it('corrects original image aspect ratio before area/axis measurement', () => {
    const square = measureVisibleBrowMaskEnvelope(paired(), width, height);
    const stretched = measureVisibleBrowMaskEnvelope(paired(), width, height, {
      imageWidth: width * 2,
      imageHeight: height,
    });
    expect(square.status).toBe('available');
    expect(stretched.status).toBe('available');
    if (square.status !== 'available' || stretched.status !== 'available') throw Error();
    expect(stretched.brows[0]?.apparentMaskThicknessToLongSpan).toBeCloseTo(
      square.brows[0]!.apparentMaskThicknessToLongSpan / 2,
    );
  });

  it('rejects one, three, joined, clipped or degenerate brow areas rather than guessing', () => {
    expect(measureVisibleBrowMaskEnvelope(mask(), width, height)).toMatchObject({
      status: 'unavailable',
      reason: 'BOTH_VISIBLE_BROWS_REQUIRED',
    });
    const third = paired();
    third[15 * width + 20] = 1;
    expect(measureVisibleBrowMaskEnvelope(third, width, height)).toMatchObject({
      status: 'unavailable',
      reason: 'FRAGMENTED_OR_MULTIPLE_COMPONENTS',
    });
    const clipped = paired();
    rectangle(clipped, 0, 7, 12, 2);
    expect(measureVisibleBrowMaskEnvelope(clipped, width, height)).toMatchObject({
      status: 'unavailable',
      reason: 'IMAGE_EDGE_CLIPPED',
    });
    const singleLine = paired();
    for (let x = 25; x < 33; x++) for (let y = 7; y < 10; y++) singleLine[y * width + x] = 0;
    expect(measureVisibleBrowMaskEnvelope(singleLine, width, height)).toMatchObject({
      status: 'unavailable',
      reason: 'INSUFFICIENT_REGION_EXTENT',
    });
    const joined = paired();
    rectangle(joined, 11, 7, 15, 1);
    expect(measureVisibleBrowMaskEnvelope(joined, width, height)).toMatchObject({
      status: 'unavailable',
      reason: 'BOTH_VISIBLE_BROWS_REQUIRED',
    });
  });

  it('accepts only the pinned transparent overlay RGB/alpha palette', () => {
    const binary = paired();
    const rgba = new Uint8ClampedArray(width * height * 4);
    for (let i = 0; i < binary.length; i++) {
      if (binary[i]) {
        rgba.set([70, 245, 130, 255], i * 4);
      }
    }
    const converted = eyebrowBinaryFromOverlayRGBA(rgba, width, height);
    expect(Array.from(converted)).toEqual(Array.from(binary));
    rgba[4 * (7 * width + 4)] = 71;
    expect(() => eyebrowBinaryFromOverlayRGBA(rgba, width, height)).toThrow('BROW_OVERLAY_INVALID');
    expect(() => eyebrowBinaryFromOverlayRGBA(new Uint8Array(7), width, height)).toThrow();
  });

  it('rejects invalid masks and dimensions instead of producing fabricated geometry', () => {
    const bad = paired();
    bad[0] = 2;
    expect(() => measureVisibleBrowMaskEnvelope(bad, width, height)).toThrow('BROW_MASK_INVALID');
    expect(() =>
      measureVisibleBrowMaskEnvelope(paired(), width, height, {
        imageWidth: 0,
        imageHeight: 100,
      }),
    ).toThrow('BROW_MASK_INVALID');
  });
});
