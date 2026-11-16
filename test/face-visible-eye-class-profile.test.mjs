import { describe, expect, it } from 'vitest';
import { measureVisibleEyeClassProfile } from '../tools/face-reading/two-view/visible-eye-class-profile.mjs';

const size = 18;
function pair() {
  const mask = new Uint8Array(size * size);
  for (let y = 5; y < 7; y++) for (let x = 3; x < 8; x++) mask[y * size + x] = 4;
  for (let y = 5; y < 8; y++) for (let x = 11; x < 16; x++) mask[y * size + x] = 5;
  return mask;
}
describe('pinned paired eye-class engineering profile', () => {
  it('measures two distinct parser regions without anatomical or source authority', () => {
    const r = measureVisibleEyeClassProfile(pair(), size);
    expect(r).toMatchObject({
      status: 'available',
      imageLeftHeightToWidth: 2 / 5,
      imageRightHeightToWidth: 3 / 5,
      imageLeftToRightWidthRatio: 1,
      imageLeftToRightClassAreaRatio: 2 / 3,
      centreSpacingToMeanWidth: 8 / 5,
      candidateOnly: true,
      actualEyelidValidated: false,
      traditionalBindingAuthorized: false,
    });
    expect(JSON.stringify(r)).not.toMatch(/maskPixels|captureRef|landmarks|pixelCoordinates/);
  });
  it('uses original aspect ratio for vertical measures, not width or area', () => {
    const a = measureVisibleEyeClassProfile(pair(), size);
    const b = measureVisibleEyeClassProfile(pair(), size, { imageWidth: 36, imageHeight: 18 });
    expect(b.imageLeftHeightToWidth).toBeCloseTo(a.imageLeftHeightToWidth / 2);
    expect(b.imageLeftToRightClassAreaRatio).toBe(a.imageLeftToRightClassAreaRatio);
  });
  it('rejects invalid classes, clipped and fragmented regions', () => {
    const missing = pair();
    for (let i = 0; i < missing.length; i++) if (missing[i] === 5) missing[i] = 0;
    expect(measureVisibleEyeClassProfile(missing, size)).toMatchObject({
      status: 'unavailable',
      reason: 'BOTH_EYE_CLASSES_REQUIRED',
    });
    const split = pair();
    split[1 * size + 1] = 4;
    expect(measureVisibleEyeClassProfile(split, size)).toMatchObject({
      status: 'unavailable',
      reason: 'EYE_CLASS_FRAGMENTED',
    });
    const clipped = pair();
    clipped[0 * size + 3] = 4;
    expect(measureVisibleEyeClassProfile(clipped, size)).toMatchObject({
      status: 'unavailable',
      reason: 'EYE_CLASS_FRAGMENTED',
    });
    const invalid = pair();
    invalid[0] = 42;
    expect(() => measureVisibleEyeClassProfile(invalid, size)).toThrow('EYE_CLASS_MASK_INVALID');
  });
  it('refuses touching/overlapping horizontal eye classes without inventing anatomy', () => {
    const mask = pair();
    for (let x = 6; x <= 11; x++) mask[7 * size + x] = 5;
    expect(measureVisibleEyeClassProfile(mask, size)).toMatchObject({
      status: 'unavailable',
      reason: 'EYE_CLASS_OVERLAP',
    });
  });
});
