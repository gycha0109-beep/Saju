import { describe, expect, it } from 'vitest';
import {
  VISIBLE_LIP_PIXEL_COLOR_VERSION,
  measureVisibleLipPixelColor,
} from '../tools/face-reading/two-view/visible-lip-pixel-color.mjs';

const size = 32;
function lipMask(): Uint8Array {
  const mask = new Uint8Array(size * size);
  for (let y = 8; y <= 12; y++) for (let x = 6; x <= 25; x++) mask[y * size + x] = 12;
  for (let y = 18; y <= 24; y++) for (let x = 7; x <= 24; x++) mask[y * size + x] = 13;
  return mask;
}
function originalPhoto() {
  const rgba = new Uint8ClampedArray(size * size * 4);
  const mask = lipMask();
  for (let i = 0; i < mask.length; i++) {
    const rgb = mask[i] === 12 ? [210, 80, 95] : mask[i] === 13 ? [170, 95, 120] : [50, 210, 180];
    rgba[i * 4] = rgb[0] ?? 0;
    rgba[i * 4 + 1] = rgb[1] ?? 0;
    rgba[i * 4 + 2] = rgb[2] ?? 0;
    rgba[i * 4 + 3] = 255;
  }
  return rgba;
}
const measure = (extra: Record<string, unknown> = {}) =>
  measureVisibleLipPixelColor({
    mask: lipMask(),
    rgba: originalPhoto(),
    size,
    viewRole: 'frontal',
    lipsScreened: true,
    ...extra,
  });

describe('same-image screened model lip classes and transient encoded RGB pixel evidence', () => {
  it('samples upper and lower class interiors separately without asserting intrinsic color', () => {
    const result = measure();
    expect(result).toMatchObject({
      methodVersion: VISIBLE_LIP_PIXEL_COLOR_VERSION,
      status: 'available',
      candidateOnly: true,
      sourceRgbResampledToParsingSize: true,
      colorCalibrated: false,
      whiteBalanceVerified: false,
      illuminationControlled: false,
      makeupExcluded: false,
      trueAnatomicalLipColorValidated: false,
      independentAccuracyValidated: false,
      canonicalF0Admitted: false,
      traditionalBindingAuthorized: false,
      productInterpretationAuthorized: false,
      modelTrainingAuthorized: false,
    });
    if (result.upper?.status !== 'available' || result.lower?.status !== 'available')
      throw Error('VISIBLE_LIP_TEST_REGION_MISSING');
    expect(result.upper.meanEncodedSrgbChannels[0]).toBeCloseTo(210 / 255);
    expect(result.upper.meanEncodedSrgbChannels[1]).toBeCloseTo(80 / 255);
    expect(result.lower.meanEncodedSrgbChannels[0]).toBeCloseTo(170 / 255);
    expect(result.lower.imagePixelsSampled).toBeGreaterThan(0);
    expect(JSON.stringify(result)).not.toMatch(
      /captureRef|sha|sourcePath|rawPixels|landmarks|maskPixels|facialCoordinates/,
    );
  });
  it('ignores all background and segmentation-border pixel colors', () => {
    const clean = measure();
    const pixels = originalPhoto(),
      mask = lipMask();
    for (let y = 0; y < size; y++)
      for (let x = 0; x < size; x++) {
        const p = y * size + x;
        const id = mask[p];
        const edge =
          id !== 0 &&
          (mask[p - 1] !== id ||
            mask[p + 1] !== id ||
            mask[p - size] !== id ||
            mask[p + size] !== id);
        if (id === 0 || edge) {
          pixels[p * 4] = 255;
          pixels[p * 4 + 1] = 0;
          pixels[p * 4 + 2] = 255;
        }
      }
    expect(measure({ rgba: pixels })).toEqual(clean);
  });
  it('treats incomplete source RGB as partial evidence without filling missing pixels', () => {
    const pixels = originalPhoto();
    pixels[(10 * size + 12) * 4 + 3] = 0;
    const result = measure({ rgba: pixels });
    expect(result.status).toBe('partial');
    expect(result.upper?.status).toBe('partial');
    expect(result.lower?.status).toBe('available');
    if (result.upper?.status !== 'partial') throw Error('EXPECTED_PARTIAL');
    expect(result.upper.imagePixelsSampled).toBeLessThan(
      result.upper.interiorClassPixelsConsidered,
    );
  });
  it('holds clipped or fragmented classes and disordered lower/upper positions', () => {
    const detached = lipMask();
    detached[2 * size + 2] = 12;
    expect(measure({ mask: detached })).toMatchObject({
      status: 'unavailable',
      reason: 'MODEL_FRAGMENTED_LIP_CLASS',
    });
    const swapped = lipMask().map((label) => (label === 12 ? 13 : label === 13 ? 12 : label));
    expect(measure({ mask: swapped })).toMatchObject({
      status: 'unavailable',
      reason: 'MODEL_LIP_CLASS_VERTICAL_ORDER_CONFLICT',
    });
  });
  it('withholds unaligned, profile, insufficient-interior, and corrupted inputs', () => {
    expect(measure({ viewRole: 'profile' })).toMatchObject({
      status: 'unavailable',
      reason: 'FRONTAL_CAPTURE_REQUIRED',
    });
    expect(measure({ lipsScreened: false })).toMatchObject({
      status: 'unavailable',
      reason: 'LIP_REGION_ALIGNMENT_UNSCREENED',
    });
    const thin = lipMask();
    for (let y = 8; y <= 12; y++)
      if (y !== 10) for (let x = 6; x <= 25; x++) thin[y * size + x] = 0;
    expect(measure({ mask: thin })).toMatchObject({
      status: 'unavailable',
      reason: 'MODEL_DEGENERATE_LIP_CLASS_REGION',
    });
    expect(() => measure({ rgba: new Uint8ClampedArray(4) })).toThrow(
      'LIP_PIXEL_COLOR_INPUT_INVALID',
    );
    const bad = lipMask();
    bad[0] = 255;
    expect(() => measure({ mask: bad })).toThrow('LIP_CLASS_MASK_INVALID');
  });
});
