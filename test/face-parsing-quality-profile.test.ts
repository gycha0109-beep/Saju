import { unavailableMorphology } from '../tools/face-reading/two-view/morphology-geometry.mjs';
import { describe, it, expect } from 'vitest';
import { unavailableEyeDirection } from '../tools/face-reading/two-view/eye-direction.mjs';
import { screenRegions, screenEarOverlay } from '../tools/face-reading/two-view/region-quality.mjs';
import {
  backgroundWitness,
  mergeInstances,
} from '../tools/face-reading/two-view/instance-frame.mjs';
import {
  measureProfile,
  validateProfile,
  sourceFaceClipped,
  PROFILE_VERSION,
} from '../tools/face-reading/two-view/profile-metrics.mjs';
import {
  validateParsingSummary,
  PARSING_INSTANCE_VERSION,
  PARSING_VERSION,
} from '../tools/face-reading/two-view/parsing-contract.mjs';
describe('region screening and visible profile class ratios', () => {
  it('keeps ear-overlay ownership without baseline ear pixels manufacturing a corroborating component', () => {
    const face = new Uint8Array(144),
      ear = new Uint8Array(144);
    face[5 * 12 + 5] = 10;
    face[5 * 12 + 6] = 1;
    face[5 * 12 + 7] = 7;
    ear[0] = 8;
    const result = screenEarOverlay(face, ear, 12, { nose: [{ x: 5, y: 5 }] }, 1);
    expect(result.mask[0]).toBe(8);
    expect(result.mask[5 * 12 + 7]).toBe(0);
    expect(result.quality.status).toBe('unchecked');
  });
  it('keeps an entire uncorroborated ear or skin region unchecked instead of erasing it', () => {
    const mask = new Uint8Array(12 * 12);
    mask[5 * 12 + 5] = 10;
    mask[5 * 12 + 6] = 1;
    mask[0] = 7;
    const ear = screenRegions(mask, 12, { nose: [{ x: 5, y: 5 }] }, 1);
    expect(ear.mask[0]).toBe(7);
    expect(ear.quality.ears).toEqual({ status: 'unchecked', removedPixels: 0 });
    const skin = screenRegions(mask, 12, { face: [{ x: 11, y: 11 }] }, 1);
    expect(skin.mask[5 * 12 + 6]).toBe(1);
    expect(skin.quality.skin).toEqual({ status: 'unchecked', removedPixels: 0 });
  });
  it('keeps unchecked masks and all hair unchanged without touching input', () => {
    const mask = new Uint8Array([17, 1, 10, 0, 17, 12, 13, 0, 17]);
    const out = screenRegions(mask, 3, null, 1);
    expect([...out.mask]).toEqual([...mask]);
    expect(out.quality.nose!.status).toBe('unchecked');
  });
  it('removes detached feature fragments while retaining separately anchored people', () => {
    const mask = new Uint8Array(12 * 12);
    mask[2 * 12 + 2] = 10;
    mask[8 * 12 + 8] = 10;
    mask[1 * 12 + 10] = 10;
    mask[4 * 12 + 3] = 12;
    mask[0] = 17;
    const out = screenRegions(
      mask,
      12,
      {
        nose: [
          { x: 2, y: 2 },
          { x: 8, y: 8 },
        ],
        lips: [],
        brows: [],
      },
      1,
    );
    expect(out.mask[2 * 12 + 2]).toBe(10);
    expect(out.mask[8 * 12 + 8]).toBe(10);
    expect(out.mask[1 * 12 + 10]).toBe(0);
    expect(out.mask[4 * 12 + 3]).toBe(0);
    expect(out.mask[0]).toBe(17);
    expect(mask[4 * 12 + 3]).toBe(12);
    expect(out.quality.lips).toEqual({ status: 'suppressed', removedPixels: 1 });
  });
  it('removes detached skin and distant ear islands but keeps a face-adjacent ear candidate', () => {
    const mask = new Uint8Array(12 * 12);
    mask[5 * 12 + 5] = 10;
    mask[5 * 12 + 6] = 1;
    mask[6 * 12 + 6] = 1;
    mask[9 * 12 + 10] = 1;
    mask[5 * 12 + 8] = 7;
    mask[0] = 8;
    const out = screenRegions(mask, 12, { nose: [{ x: 5, y: 5 }] }, 2);
    expect(out.mask[9 * 12 + 10]).toBe(0);
    expect(out.mask[5 * 12 + 8]).toBe(7);
    expect(out.mask[0]).toBe(0);
    expect(out.quality.skin!.removedPixels).toBe(1);
  });
  it('requires two background witnesses inside original support and protects hair', () => {
    const size = 8,
      frame = { left: 0, top: 0, side: 8, angle: 0 },
      box = { x: 2, y: 2, w: 4, h: 4, score: 1, points: [] },
      primary = new Uint8Array(64),
      witness = new Uint8Array(64);
    const background = backgroundWitness(primary, witness, size, frame, frame, box, 8, 8);
    expect(background[0]).toBe(0);
    expect(background[3 * 8 + 3]).toBe(1);
    const base = new Uint8Array(64);
    base[3 * 8 + 3] = 17;
    base[4 * 8 + 4] = 10;
    base[1 * 8 + 1] = 1;
    const merged = mergeInstances(
      base,
      size,
      [{ box, frame, mask: primary, lipsAligned: true, background }],
      8,
      8,
    );
    expect(merged.mask[3 * 8 + 3]).toBe(17);
    expect(merged.mask[4 * 8 + 4]).toBe(0);
    expect(merged.mask[1 * 8 + 1]).toBe(1);
    expect(merged.backgroundRemoved).toBe(1);
    witness[4 * 8 + 4] = 1;
    expect(backgroundWitness(primary, witness, size, frame, frame, box, 8, 8)[4 * 8 + 4]).toBe(0);
  });
  function fixture() {
    const size = 32,
      mask = new Uint8Array(size * size);
    for (let y = 4; y < 28; y++) for (let x = 8; x < 20; x++) mask[y * size + x] = 1;
    for (let y = 12; y < 16; y++) for (let x = 18; x < 22; x++) mask[y * size + x] = 10;
    for (let y = 20; y < 22; y++) for (let x = 18; x < 20; x++) mask[y * size + x] = 12;
    for (let y = 12; y < 18; y++) for (let x = 4; x < 6; x++) mask[y * size + x] = 7;
    return { size, mask };
  }
  it('measures declared class extents with independent lip availability', () => {
    const { mask, size } = fixture(),
      all = measureProfile(mask, size, { referenceSupported: true, lipsAligned: true });
    expect(all.status).toBe('completed');
    if (all.status !== 'completed') throw Error('fixture');
    expect(all.metrics.map((m) => (m.status === 'available' ? m.value : null))).toEqual([
      24 / 14,
      4 / 24,
      2 / 24,
      6 / 24,
    ]);
    const partial = measureProfile(mask, size, { referenceSupported: true, lipsAligned: false });
    if (partial.status !== 'completed') throw Error('fixture');
    expect(partial.metrics[2]).toMatchObject({
      status: 'unavailable',
      reason: 'ANCHOR_DISAGREEMENT',
    });
    expect(partial.metrics[1]).toEqual(all.metrics[1]);
  });
  it('withholds clipped source or missing reference and rejects malformed profile summaries', () => {
    const { mask, size } = fixture();
    const clipped = measureProfile(mask, size, {
      referenceSupported: true,
      lipsAligned: true,
      sourceClipped: true,
    });
    if (clipped.status !== 'completed') throw Error('fixture');
    expect(clipped.metrics.every((m) => m.status === 'unavailable')).toBe(true);
    expect(sourceFaceClipped(mask, size, { left: 0, top: 0, side: 32, angle: 0 }, 32, 32)).toBe(
      false,
    );
    expect(sourceFaceClipped(mask, size, { left: -10, top: 0, side: 32, angle: 0 }, 32, 32)).toBe(
      true,
    );
    expect(() =>
      validateProfile({ methodVersion: PROFILE_VERSION, status: 'completed', metrics: [] }),
    ).toThrow();
  });
  it('reads instance-only history without relabelling it and binds new profile output to its role', () => {
    const old = {
      methodVersion: PARSING_INSTANCE_VERSION,
      candidateOnly: true,
      status: 'completed',
      counts: [512 * 512, ...Array<number>(18).fill(0)],
      interfacePixels: 0,
      earRefinement: { status: 'unavailable', pixels: 0, reason: 'NO_SINGLE_FACE' },
      instanceRefinement: { status: 'unavailable', reason: 'NO_FACES' },
    };
    expect(validateParsingSummary(old, { allowLegacy: true }).methodVersion).toBe(
      PARSING_INSTANCE_VERSION,
    );
    expect(() => validateParsingSummary(old)).toThrow();
    const { mask, size } = fixture(),
      current = {
        ...old,
        methodVersion: PARSING_VERSION,
        regionScreening: {
          backgroundRemoved: 0,
          regions: Object.fromEntries(
            ['skin', 'nose', 'lips', 'brows', 'ears'].map((id) => [
              id,
              { status: 'unchecked', removedPixels: 0 },
            ]),
          ),
        },
        profile: measureProfile(mask, size, { referenceSupported: true, lipsAligned: true }),
        eyeDirection: unavailableEyeDirection('PROFILE_VIEW'),
        morphology: unavailableMorphology('PROFILE_VIEW'),
        rawPoints: 'must be discarded',
      };
    expect(() => validateParsingSummary(current, { viewRole: 'frontal' })).toThrow();
    expect(JSON.stringify(validateParsingSummary(current, { viewRole: 'profile' }))).not.toContain(
      'rawPoints',
    );
    expect(() =>
      validateParsingSummary({
        ...current,
        regionScreening: { ...current.regionScreening, backgroundRemoved: -1 },
      }),
    ).toThrow();
  });
});
