import { describe, expect, it } from 'vitest';
import {
  FOREHEAD_SKIN_BAND_VERSION,
  measureVisibleForeheadSkinBand,
} from '../tools/face-reading/two-view/visible-forehead-skin-band.mjs';

const size = 100;
const topology = {
  browA: [{ start: 1, end: 2 }],
  browB: [{ start: 3, end: 4 }],
  oval: [{ start: 5, end: 6 }],
};
function landmarks() {
  const points = Array.from({ length: 478 }, () => ({ x: 0.5, y: 0.5 }));
  points[1] = { x: 0.2, y: 0.75 };
  points[2] = { x: 0.32, y: 0.75 };
  points[3] = { x: 0.68, y: 0.75 };
  points[4] = { x: 0.8, y: 0.75 };
  points[5] = { x: 0.3, y: 0.15 };
  points[6] = { x: 0.7, y: 0.15 };
  return points;
}
function mask() {
  const result = new Uint8Array(size * size);
  for (let x = 20; x <= 80; x++) {
    for (let y = 16; y <= 30; y++) result[y * size + x] = 17;
    for (let y = 31; y <= 74; y++) result[y * size + x] = 1;
  }
  return result;
}
function measure(overrides: Record<string, unknown> = {}) {
  return measureVisibleForeheadSkinBand({
    mask: mask(),
    size,
    landmarks: landmarks(),
    topology,
    frame: { left: 0, top: 0, side: size },
    imageWidth: size,
    imageHeight: size,
    viewRole: 'frontal',
    browsAligned: true,
    ...overrides,
  });
}
describe('pinned crop visible skin above the model brows', () => {
  it('samples only original-image normalized hair/skin contacts and model sector fractions', () => {
    const output = measure();
    expect(output).toMatchObject({
      methodVersion: FOREHEAD_SKIN_BAND_VERSION,
      status: 'available',
      candidateOnly: true,
      anatomicalForeheadBoundaryValidated: false,
      anatomicalHairlineAuthorized: false,
      hiddenForeheadCompleted: false,
      independentAccuracyValidated: false,
      canonicalF0Admitted: false,
      traditionalBindingAuthorized: false,
      productInterpretationAuthorized: false,
      modelTrainingAuthorized: false,
    });
    if (output.status !== 'available') throw Error('SYNTHETIC_SKIN_STRIP_UNAVAILABLE');
    expect(output.sampledHorizontalFractions).toEqual([0.25, 0.5, 0.75]);
    expect(output.sectors).toHaveLength(3);
    expect(output.sectors.every((s) => s.modelSkinPresent && s.modelHairFraction > 0)).toBe(true);
    expect(output.modelContacts).toHaveLength(3);
    for (const c of output.modelContacts) {
      if (c.status !== 'available') throw Error('EXPECTED_MODEL_CONTACT');
      expect(c.visibleSkinContactYToOriginalImageHeight).toBeCloseTo(0.315);
    }
    expect(JSON.stringify(output)).not.toMatch(
      /sourceSha|captureRef|landmarks|rawMask|photoPath|identity/,
    );
  });
  it('withholds just the covered central sample when hair replaces skin directly above the brow', () => {
    const changed = mask();
    changed[74 * size + 50] = 17;
    const output = measure({ mask: changed });
    expect(output.status).toBe('partial');
    if (output.status === 'unavailable') throw Error('EXPECTED_PARTIAL');
    expect(output.modelContacts.map((s) => s.status)).toEqual([
      'available',
      'unavailable',
      'available',
    ]);
    expect(output.modelContacts[1]).toMatchObject({
      status: 'unavailable',
      reason: 'SKIN_NOT_VISIBLE_ABOVE_BROW',
    });
  });
  it('never interprets an interruption by a non-hair class as a hairline', () => {
    const changed = mask();
    changed[30 * size + 50] = 0;
    const output = measure({ mask: changed });
    expect(output.status).toBe('partial');
    if (output.status === 'unavailable') throw Error('EXPECTED_PARTIAL');
    expect(output.modelContacts[1]).toMatchObject({
      status: 'partial',
      reason: 'UPPER_SKIN_INTERRUPTED_BY_OTHER_CLASS',
    });
  });
  it('does not extrapolate a hairline beyond the top of the model face oval', () => {
    const changed = mask();
    for (let y = 16; y <= 30; y++) changed[y * size + 50] = 1;
    const output = measure({ mask: changed });
    expect(output.status).toBe('partial');
    if (output.status === 'unavailable') throw Error('EXPECTED_PARTIAL');
    expect(output.modelContacts[1]).toMatchObject({
      status: 'partial',
      reason: 'UPPER_MODEL_OVAL_LIMIT_REACHED',
    });
  });
  it('rejects absent skin, mismatched brow model, nonfrontal and corrupt parser mask', () => {
    expect(measure({ mask: new Uint8Array(size * size) })).toMatchObject({
      status: 'unavailable',
      reason: 'NO_MODEL_SKIN_IN_FOREHEAD_STRIP',
    });
    expect(measure({ browsAligned: false })).toMatchObject({
      status: 'unavailable',
      reason: 'BROW_CLASS_ALIGNMENT_UNAVAILABLE',
    });
    expect(measure({ viewRole: 'profile' })).toMatchObject({
      status: 'unavailable',
      reason: 'FRONTAL_CAPTURE_REQUIRED',
    });
    const invalid = mask();
    invalid[0] = 255;
    expect(() => measure({ mask: invalid })).toThrow('FOREHEAD_SKIN_MASK_INVALID');
  });
  it('rejects out-of-crop model strips and impossible topology without false contact positions', () => {
    expect(measure({ frame: { left: 40, top: 0, side: size } })).toMatchObject({
      status: 'unavailable',
      reason: 'MODEL_STRIP_OUTSIDE_CROP',
    });
    expect(measure({ topology: { ...topology, browA: [{ start: 500, end: 501 }] } })).toMatchObject(
      {
        status: 'unavailable',
        reason: 'MODEL_TOPOLOGY_UNAVAILABLE',
      },
    );
    const moved = landmarks();
    moved[5] = { x: 0.3, y: 0.85 };
    moved[6] = { x: 0.7, y: 0.85 };
    expect(measure({ landmarks: moved })).toMatchObject({
      status: 'unavailable',
      reason: 'MODEL_FOREHEAD_STRIP_DEGENERATE',
    });
  });
  it('keeps pixel-to-original frame projection explicit and separate from anatomy', () => {
    const output = measure({ frame: { left: 0, top: 0, side: size }, imageHeight: 100 });
    if (output.status !== 'available') throw Error('EXPECTED_PROJECTION');
    const c = output.modelContacts[0];
    if (!c || c.status !== 'available') throw Error('EXPECTED_CONTACT');
    expect(c.visibleSkinContactYToOriginalImageHeight).toBeCloseTo(0.315);
  });
});
