import { describe, expect, it } from 'vitest';
import {
  BROW_PIXEL_TEXTURE_VERSION,
  measureVisibleBrowPixelTexture,
} from '../tools/face-reading/two-view/brow-pixel-texture.mjs';

const width = 64;
const height = 40;
function modelMask(rows: number[] = [12, 13, 14, 15, 16, 17, 18]): Uint8Array {
  const mask = new Uint8Array(width * height);
  for (const y of rows) {
    for (let x = 7; x <= 24; x++) mask[y * width + x] = 1;
    for (let x = 40; x <= 57; x++) mask[y * width + x] = 1;
  }
  return mask;
}
function image({ stripe = true }: { stripe?: boolean } = {}): Uint8ClampedArray {
  const rgba = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      const value =
        stripe && x >= 7 && x <= 24 && y >= 12 && y <= 18 ? (x % 2 === 0 ? 215 : 35) : 120;
      const p = 4 * (y * width + x);
      rgba[p] = rgba[p + 1] = rgba[p + 2] = value;
      rgba[p + 3] = 255;
    }
  return rgba;
}
const run = (extra: Record<string, unknown> = {}) =>
  measureVisibleBrowPixelTexture({
    mask: modelMask(),
    width,
    height,
    rgba: image(),
    imageWidth: width,
    imageHeight: height,
    viewRole: 'frontal',
    browsScreened: true,
    ...extra,
  });

describe('screened eyebrow-model ROI and original-image pixel texture', () => {
  it('reports separate screen sides while withholding hair fibre, density and all F0 authority', () => {
    const result = run();
    expect(result).toMatchObject({
      methodVersion: BROW_PIXEL_TEXTURE_VERSION,
      status: 'available',
      candidateOnly: true,
      screenedModelMaskOnly: true,
      individualHairFibresIdentified: false,
      individualHairWidthMeasured: false,
      hairDensityMeasured: false,
      independentAccuracyValidated: false,
      canonicalF0Admitted: false,
      traditionalBindingAuthorized: false,
      productInterpretationAuthorized: false,
      modelTrainingAuthorized: false,
    });
    if (result.imageLeft?.status !== 'available' || result.imageRight?.status !== 'available')
      throw Error('EXPECTED_SCREEN_SIDE_TEXTURE');
    expect(result.imageLeft.horizontalMeanAbsoluteSrgbBrightnessChange).toBeGreaterThan(0.6);
    expect(result.imageLeft.verticalMeanAbsoluteSrgbBrightnessChange).toBe(0);
    expect(result.imageRight.horizontalMeanAbsoluteSrgbBrightnessChange).toBe(0);
    expect(result.imageRight.verticalMeanAbsoluteSrgbBrightnessChange).toBe(0);
    expect(result.imageLeft.validImagePixelPairs).toBeGreaterThan(0);
    expect(JSON.stringify(result)).not.toMatch(
      /sourceSha256|captureRef|rawMask|rawPixels|sourcePath|landmarks|segments|imageData/,
    );
  });

  it('does not mistake textured background outside the model brow as eyebrow pixels', () => {
    const original = run();
    const rgba = image();
    const mask = modelMask();
    for (let p = 0; p < mask.length; p++) {
      if (mask[p]) continue;
      const value = p % 2 ? 0 : 255;
      rgba[p * 4] = rgba[p * 4 + 1] = rgba[p * 4 + 2] = value;
    }
    const outsideChanged = run({ rgba });
    expect(outsideChanged).toEqual(original);
  });

  it('cannot infer the existence of individual hairs even from uniform model brow regions', () => {
    const result = run({ rgba: image({ stripe: false }) });
    if (result.imageLeft?.status !== 'available') throw Error('EXPECTED_UNIFORM_BROW');
    expect(result.imageLeft.horizontalMeanAbsoluteSrgbBrightnessChange).toBe(0);
    expect(result.imageLeft.verticalMeanAbsoluteSrgbBrightnessChange).toBe(0);
    expect(result.individualHairFibresIdentified).toBe(false);
    expect(result.hairDensityMeasured).toBe(false);
  });

  it('withholds a mask that does not have two distinct coherent eyebrow regions', () => {
    const mask = modelMask();
    mask[3 * width + 3] = 1;
    expect(run({ mask })).toMatchObject({
      status: 'unavailable',
      reason: 'MODEL_FRAGMENTED_OR_MULTIPLE_COMPONENTS',
    });
    const joined = modelMask();
    for (let x = 25; x < 40; x++) joined[15 * width + x] = 1;
    expect(run({ mask: joined })).toMatchObject({
      status: 'unavailable',
      reason: 'MODEL_BOTH_VISIBLE_BROWS_REQUIRED',
    });
  });

  it('blocks unaligned segmentation and profile photos without image texture approval', () => {
    expect(run({ browsScreened: false })).toMatchObject({
      status: 'unavailable',
      reason: 'BROW_MODEL_ALIGNMENT_UNSCREENED',
    });
    expect(run({ viewRole: 'profile' })).toMatchObject({
      status: 'unavailable',
      reason: 'FRONTAL_CAPTURE_REQUIRED',
    });
  });

  it('retains usable brow side while reporting transparent pixel sampling as partial', () => {
    const rgba = image();
    rgba[(15 * width + 15) * 4 + 3] = 0;
    const result = run({ rgba });
    expect(result.status).toBe('partial');
    expect(result.imageLeft?.status).toBe('partial');
    expect(result.imageRight?.status).toBe('available');
    if (result.imageLeft?.status !== 'partial') throw Error('EXPECTED_PARTIAL_IMAGE');
    expect(result.imageLeft.validImagePixelPairs).toBeLessThan(
      result.imageLeft.interiorModelMaskPixelsConsidered,
    );
  });

  it('withholds low-resolution source photos rather than sampling outside the model-mask interior', () => {
    expect(
      run({ imageWidth: 32, imageHeight: 20, rgba: new Uint8ClampedArray(32 * 20 * 4) }),
    ).toMatchObject({
      status: 'unavailable',
      reason: 'ORIGINAL_IMAGE_RESOLUTION_BELOW_MODEL_MASK',
    });
  });

  it('rejects unsupported image buffers and refuses thin strips with no interior pixels', () => {
    expect(() => run({ rgba: new Uint8ClampedArray(4) })).toThrow('BROW_TEXTURE_INPUT_INVALID');
    expect(() => run({ width: 10 })).toThrow('BROW_TEXTURE_INPUT_INVALID');
    expect(run({ mask: modelMask([14, 15]) })).toMatchObject({
      status: 'unavailable',
      reason: 'NO_VISIBLE_BROW_TEXTURE_PIXELS',
    });
  });
});
