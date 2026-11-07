import { describe, expect, it } from 'vitest';
import {
  measureVisibleLipClassProfile,
  VISIBLE_LIP_CLASS_PROFILE_VERSION,
} from '../tools/face-reading/two-view/visible-lip-class-profile.mjs';

const size = 18;
const blank = () => new Uint8Array(size * size);
function region(mask: Uint8Array, label: number, left: number, top: number, width: number, height: number) {
  for (let y = top; y < top + height; y++)
    for (let x = left; x < left + width; x++) mask[y * size + x] = label;
}
function paired() {
  const mask = blank();
  region(mask, 12, 5, 4, 6, 2);
  region(mask, 13, 4, 7, 8, 3);
  return mask;
}

describe('upper/lower visible parser lip class research', () => {
  it('measures separate model class extent and area without anatomical or traditional authority', () => {
    const result = measureVisibleLipClassProfile(paired(), size);
    expect(result).toMatchObject({
      methodVersion: VISIBLE_LIP_CLASS_PROFILE_VERSION,
      source: 'pinned_screened_full_frame_lip_classes_12_13',
      status: 'available',
      candidateOnly: true,
      actualAnatomicalLipBorderValidated: false,
      accuracyValidated: false,
      traditionalBindingAuthorized: false,
    });
    if (result.status !== 'available') throw Error();
    expect(result.upperToLowerVisibleClassAreaRatio).toBeCloseTo(0.5);
    expect(result.upperVisibleWidthToCombinedXSpan).toBeCloseTo(6 / 8);
    expect(result.lowerVisibleWidthToCombinedXSpan).toBeCloseTo(1);
    expect(result.upperVisibleHeightToCombinedXSpan).toBeCloseTo(2 / 8);
    expect(result.lowerVisibleHeightToCombinedXSpan).toBeCloseTo(3 / 8);
    expect(result.centreYSeparationToCombinedXSpan).toBeCloseTo(3.5 / 8);
    expect(result.lowerVsUpperCentreXOffsetToCombinedXSpan).toBe(0);
    expect(JSON.stringify(result)).not.toMatch(/captureRef|landmarks|maskPixels|pixelCoordinates/);
  });

  it('adjusts vertical-to-horizontal ratios for image aspect without altering area/width', () => {
    const normal = measureVisibleLipClassProfile(paired(), size);
    const stretched = measureVisibleLipClassProfile(paired(), size, {
      imageWidth: size * 2,
      imageHeight: size,
    });
    if (normal.status !== 'available' || stretched.status !== 'available') throw Error();
    expect(stretched.upperVisibleHeightToCombinedXSpan)
      .toBeCloseTo(normal.upperVisibleHeightToCombinedXSpan / 2);
    expect(stretched.centreYSeparationToCombinedXSpan)
      .toBeCloseTo(normal.centreYSeparationToCombinedXSpan / 2);
    expect(stretched.upperToLowerVisibleClassAreaRatio)
      .toBe(normal.upperToLowerVisibleClassAreaRatio);
  });

  it('keeps signed model lateral offset separate from anatomy or labial alignment', () => {
    const mask = paired();
    for (let y = 7; y < 10; y++)
      for (let x = 4; x < 12; x++) mask[y * size + x] = 0;
    region(mask, 13, 6, 7, 8, 3);
    const result = measureVisibleLipClassProfile(mask, size);
    if (result.status !== 'available') throw Error();
    expect(result.lowerVsUpperCentreXOffsetToCombinedXSpan).toBeCloseTo(2 / 9);
  });

  it('abstains on missing, fragmented, clipped, degenerate and reversed lip classes', () => {
    const onlyUpper = blank();
    region(onlyUpper, 12, 5, 4, 6, 2);
    expect(measureVisibleLipClassProfile(onlyUpper, size))
      .toMatchObject({ status: 'unavailable', reason: 'BOTH_LIP_CLASSES_REQUIRED' });
    const fragmented = paired();
    fragmented[1 * size + 1] = 12;
    expect(measureVisibleLipClassProfile(fragmented, size))
      .toMatchObject({ status: 'unavailable', reason: 'FRAGMENTED_LIP_CLASS' });
    const clipped = paired();
    for (let y = 4; y < 6; y++) clipped[y * size + 0] = 12;
    expect(measureVisibleLipClassProfile(clipped, size)).toMatchObject({
      status: 'unavailable',
      reason: 'FRAGMENTED_LIP_CLASS',
    });
    const edge = blank();
    region(edge, 12, 0, 4, 6, 2);
    region(edge, 13, 4, 7, 8, 3);
    expect(measureVisibleLipClassProfile(edge, size))
      .toMatchObject({ status: 'unavailable', reason: 'LIP_CLASS_TOUCHES_FRAME_EDGE' });
    const tiny = blank();
    tiny[5 * size + 5] = 12;
    region(tiny, 13, 4, 7, 8, 3);
    expect(measureVisibleLipClassProfile(tiny, size))
      .toMatchObject({ status: 'unavailable', reason: 'DEGENERATE_LIP_CLASS_REGION' });
    const reversed = blank();
    region(reversed, 13, 5, 4, 6, 2);
    region(reversed, 12, 4, 7, 8, 3);
    expect(measureVisibleLipClassProfile(reversed, size))
      .toMatchObject({ status: 'unavailable', reason: 'LIP_CLASS_VERTICAL_ORDER_CONFLICT' });
  });

  it('refuses non-pinned mask labels, non-square data, and zero image dimensions', () => {
    const bad = paired();
    bad[0] = 19;
    expect(() => measureVisibleLipClassProfile(bad, size)).toThrow('LIP_CLASS_MASK_INVALID');
    expect(() => measureVisibleLipClassProfile(new Uint8Array(4), size))
      .toThrow('LIP_CLASS_MASK_INVALID');
    expect(() => measureVisibleLipClassProfile(paired(), size, { imageHeight: 0 }))
      .toThrow('LIP_CLASS_MASK_INVALID');
  });
});
