import { describe, it, expect } from 'vitest';
import {
  interfaceBinaryFromOverlayRGBA,
  measureVisibleHairSkinInterface,
} from '../tools/face-reading/two-view/visible-hair-skin-interface.mjs';

const width = 24,
  height = 18;
function pixels(coords: [number, number][] = []) {
  const mask = new Uint8Array(width * height);
  for (const [x, y] of coords) mask[y * width + x] = 1;
  return mask;
}
const strip = (start: number, end: number, y: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => [start + i, y] as [number, number]);

describe('existing hair/skin mask contact engineering preview', () => {
  it('measures the visible contact coverage and pixel range without measuring forehead height', () => {
    const result = measureVisibleHairSkinInterface(pixels(strip(5, 15, 6)), width, height);
    expect(result).toMatchObject({
      status: 'available',
      reason: null,
      visibleColumns: 11,
      candidateOnly: true,
      anatomicalHairlineAuthorized: false,
      foreheadHeightMeasured: false,
      validatedHumanAccuracy: false,
      canonicalF0Admitted: false,
      traditionalF1BindingAuthorized: false,
    });
    expect(result.coverageFractionOfImageWidth).toBeCloseTo(11 / width);
    expect(result.segments).toHaveLength(1);
    expect(result.segments[0]?.minContactYToImageHeight).toBeCloseTo(6 / height);
    expect(result.segments[0]?.maxContactYToImageHeight).toBeCloseTo(7 / height);
    expect(result.segments[0]?.meanContactYToImageHeight).toBeCloseTo(6.5 / height);
  });
  it('does not silently join gaps or extrapolate across an occluded interface', () => {
    const result = measureVisibleHairSkinInterface(
      pixels([...strip(4, 8, 6), ...strip(14, 17, 5)]),
      width,
      height,
    );
    expect(result).toMatchObject({
      status: 'partial',
      reason: 'DISCONNECTED_CONTACT_SEGMENTS',
    });
    expect(result.segments).toHaveLength(2);
  });
  it('treats several separate contact rows in one column as ambiguous', () => {
    expect(
      measureVisibleHairSkinInterface(pixels([...strip(5, 12, 6), [8, 12]]), width, height),
    ).toMatchObject({
      status: 'partial',
      reason: 'MULTIPLE_VERTICAL_CONTACTS',
    });
  });
  it('flags cropped interfaces and rejects no-contact as unavailable', () => {
    expect(measureVisibleHairSkinInterface(pixels(strip(0, 7, 0)), width, height)).toMatchObject({
      status: 'partial',
      reason: 'CONTACT_AT_IMAGE_BOUNDARY',
    });
    expect(measureVisibleHairSkinInterface(pixels([]), width, height)).toMatchObject({
      status: 'unavailable',
      reason: 'NO_HAIR_SKIN_INTERFACE_CONTACT',
    });
  });
  it('does not assign an arbitrary boundary to excessive disconnected regions', () => {
    const mask = new Uint8Array(30 * height);
    for (let x = 0; x < 13; x++) mask[5 * 30 + x * 2] = 1;
    expect(measureVisibleHairSkinInterface(mask, 30, height)).toMatchObject({
      status: 'unavailable',
      reason: 'FRAGMENTED_CONTACT_COLUMNS',
    });
  });
  it('rejects masks not produced by the expected binary contact projection', () => {
    const wrong = pixels([]);
    wrong[7] = 17;
    expect(() => measureVisibleHairSkinInterface(wrong, width, height)).toThrow(
      'HAIR_SKIN_INTERFACE_MASK_INVALID',
    );
    expect(() => measureVisibleHairSkinInterface(pixels(), width, 0)).toThrow(
      'HAIR_SKIN_INTERFACE_MASK_INVALID',
    );
  });
  it('accepts only exact pinned interface overlay pixels without silently reading other colors', () => {
    const rgba = new Uint8ClampedArray(2 * 2 * 4);
    rgba.set([255, 45, 45, 255], 0);
    expect([...interfaceBinaryFromOverlayRGBA(rgba, 2, 2)]).toEqual([1, 0, 0, 0]);
    rgba[4] = 255;
    rgba[5] = 95;
    rgba[6] = 70;
    rgba[7] = 255;
    expect(() => interfaceBinaryFromOverlayRGBA(rgba, 2, 2)).toThrow(
      'HAIR_SKIN_INTERFACE_OVERLAY_INVALID',
    );
  });
});
