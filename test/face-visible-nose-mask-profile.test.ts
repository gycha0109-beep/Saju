import { describe, expect, it } from 'vitest';
import {
  noseBinaryFromOverlayRGBA,
  measureVisibleNoseMaskProfile,
  VISIBLE_NOSE_MASK_PROFILE_VERSION,
} from '../tools/face-reading/two-view/visible-nose-mask-profile.mjs';

const width = 22, height = 20;
const empty = () => new Uint8Array(width * height);
function row(mask: Uint8Array, y: number, left: number, right: number) {
  for (let x = left; x <= right; x++) mask[y * width + x] = 1;
}
function nose() {
  const mask = empty();
  [
    [4, 9, 10],
    [5, 8, 11],
    [6, 7, 12],
    [7, 7, 12],
    [8, 6, 13],
    [9, 6, 13],
    [10, 5, 14],
    [11, 5, 14],
    [12, 6, 13],
  ].forEach(([y, left, right]) => row(mask, y!, left!, right!));
  return mask;
}

describe('full-frame nose-class width profile research candidate', () => {
  it('captures 3 visible mask sections, not nostril/wing/tip anatomy', () => {
    const result = measureVisibleNoseMaskProfile(nose(), width, height);
    expect(result).toMatchObject({
      methodVersion: VISIBLE_NOSE_MASK_PROFILE_VERSION,
      status: 'available',
      candidateOnly: true,
      anatomicalNoseSubregionsObserved: false,
      accuracyValidated: false,
      traditionalBindingAuthorized: false,
    });
    if (result.status !== 'available') throw Error();
    expect(result.sections.upper.visibleMaskWidthToBoundingXSpan).toBeCloseTo(0.6);
    expect(result.sections.middle.visibleMaskWidthToBoundingXSpan).toBeCloseTo(0.8);
    expect(result.sections.lower.visibleMaskWidthToBoundingXSpan).toBeCloseTo(1);
    expect(result.lowerVsUpperImagePlaneCentreShiftToBoundingXSpan).toBe(0);
    expect(result.apparentMaskXSpanToYSpan).toBeCloseTo(10 / 9);
    expect(JSON.stringify(result)).not.toMatch(/indices|captureRef|landmarks|pixels|rawMask/);
  });

  it('respects source aspect ratio without altering horizontal section ratios', () => {
    const a = measureVisibleNoseMaskProfile(nose(), width, height);
    const b = measureVisibleNoseMaskProfile(nose(), width, height, {
      imageWidth: width * 2,
      imageHeight: height,
    });
    if (a.status !== 'available' || b.status !== 'available') throw Error();
    expect(b.apparentMaskXSpanToYSpan).toBeCloseTo(a.apparentMaskXSpanToYSpan * 2);
    expect(b.sections.upper.visibleMaskWidthToBoundingXSpan)
      .toBeCloseTo(a.sections.upper.visibleMaskWidthToBoundingXSpan);
    expect(b.lowerVsUpperImagePlaneCentreShiftToBoundingXSpan)
      .toBe(a.lowerVsUpperImagePlaneCentreShiftToBoundingXSpan);
  });

  it('tracks only signed image-plane centre drift, not nasal deviation', () => {
    const mask = empty();
    for (let y = 4; y <= 12; y++) {
      const left = 5 + Math.floor((y - 4) / 2);
      row(mask, y, left, left + 5);
    }
    const result = measureVisibleNoseMaskProfile(mask, width, height);
    if (result.status !== 'available') throw Error();
    expect(result.lowerVsUpperImagePlaneCentreShiftToBoundingXSpan).toBeCloseTo(0.2);
    expect(result.sections.middle.visibleMaskWidthToBoundingXSpan).toBeCloseTo(0.6);
  });

  it('withholds absent, disconnected, clipped, discontinuous and narrow masks', () => {
    expect(measureVisibleNoseMaskProfile(empty(), width, height))
      .toMatchObject({ status: 'unavailable', reason: 'NO_VISIBLE_NOSE_CLASS' });
    const fragmented = nose();
    fragmented[2 * width + 2] = 1;
    expect(measureVisibleNoseMaskProfile(fragmented, width, height))
      .toMatchObject({ status: 'unavailable', reason: 'DISCONNECTED_OR_FRAGMENTED_MASK' });
    const clipped = empty();
    for (let y = 4; y <= 12; y++) row(clipped, y, 0, 5);
    expect(measureVisibleNoseMaskProfile(clipped, width, height))
      .toMatchObject({ status: 'unavailable', reason: 'MASK_CLIPPED_AT_IMAGE_EDGE' });
    const hole = nose();
    hole[8 * width + 9] = 0;
    expect(measureVisibleNoseMaskProfile(hole, width, height))
      .toMatchObject({ status: 'unavailable', reason: 'ROW_MASK_DISCONTINUITY' });
    const narrow = empty();
    for (let y = 5; y <= 12; y++) row(narrow, y, 10, 10);
    expect(measureVisibleNoseMaskProfile(narrow, width, height))
      .toMatchObject({ status: 'unavailable', reason: 'INSUFFICIENT_VISIBLE_EXTENT' });
  });

  it('decodes only pinned nose class overlay and rejects ambiguous palette/alpha', () => {
    const binary = nose();
    const rgba = new Uint8ClampedArray(binary.length * 4);
    binary.forEach((value, i) => {
      if (value) rgba.set([145, 140, 255, 255], i * 4);
    });
    expect(noseBinaryFromOverlayRGBA(rgba, width, height)).toEqual(binary);
    rgba[4 * (4 * width + 9)] = 146;
    expect(() => noseBinaryFromOverlayRGBA(rgba, width, height)).toThrow('NOSE_OVERLAY_INVALID');
    expect(() => noseBinaryFromOverlayRGBA(new Uint8Array(3), width, height)).toThrow();
  });

  it('rejects wrong mask values and malformed original-frame dimensions', () => {
    const invalid = nose();
    invalid[8 * width + 8] = 2;
    expect(() => measureVisibleNoseMaskProfile(invalid, width, height))
      .toThrow('NOSE_MASK_INVALID');
    expect(() => measureVisibleNoseMaskProfile(nose(), width, height, { imageWidth: 0 }))
      .toThrow('NOSE_MASK_INVALID');
  });
});
