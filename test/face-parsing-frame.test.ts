import { describe, it, expect } from 'vitest';
import {
  faceFrame,
  supportedAnchors,
  removeEarFragments,
  projectMask,
  FRAME_POLICY,
} from '../tools/face-reading/two-view/parsing-frame.mjs';
describe('engineering face-local parsing frame', () => {
  it('uses a padded square in decoded pixels and rejects collapsed or clipped point frames', () => {
    const points = Array.from({ length: 478 }, (_, i) => ({
      x: i % 2 ? 0.75 : 0.25,
      y: i % 2 ? 0.75 : 0.25,
    }));
    expect(faceFrame(points, 200, 100)).toEqual({ left: 20, top: -30, side: 160 });
    expect(() =>
      faceFrame(
        points.map(() => ({ x: 0.5, y: 0.5 })),
        200,
        100,
      ),
    ).toThrow();
    expect(() => faceFrame([{ x: -0.1, y: 0 }, ...points.slice(1)], 200, 100)).toThrow();
  });
  it('restores a non-square original frame with categorical nearest sampling and background outside the crop', () => {
    const mask = new Uint8Array(16).fill(7);
    const out = projectMask(mask, 4, { left: 1, top: 0, side: 2 }, 4, 2);
    expect([...out.mask]).toEqual([0, 7, 7, 0, 0, 7, 7, 0, 0, 7, 7, 0, 0, 7, 7, 0]);
    expect(out.counts[7]).toBe(8);
    expect(out.counts.reduce((a, b) => a + b)).toBe(16);
    expect(() =>
      projectMask(new Uint8Array(16).fill(19), 4, { left: 0, top: 0, side: 4 }, 4, 4),
    ).toThrow();
  });
  it('clips padding to the real original without inventing off-image pixels', () => {
    const out = projectMask(new Uint8Array(16).fill(1), 4, { left: -2, top: -2, side: 8 }, 4, 4);
    expect(out.counts[1]).toBe(16);
    expect(out.mask).toHaveLength(16);
  });
  it('removes isolated ear specks, preserves a connected component at the fixed cutoff and excludes accessories', () => {
    expect(FRAME_POLICY.earComponent).toBe(64);
    const mask = new Uint8Array(256);
    for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) mask[y * 16 + x] = 7;
    mask[255] = 8;
    mask[254] = 9;
    const out = removeEarFragments(mask, 16);
    expect([...out].filter((v) => v === 7)).toHaveLength(64);
    expect(out[255]).toBe(0);
    expect(out[254]).toBe(9);
  });
  it('requires independent matching class support near the declared topology anchors', () => {
    const mask = new Uint8Array(512 * 512),
      points = [
        { x: 0.25, y: 0.25 },
        { x: 0.75, y: 0.25 },
        { x: 0.75, y: 0.75 },
        { x: 0.25, y: 0.75 },
      ],
      edges = [
        { start: 0, end: 1 },
        { start: 2, end: 3 },
      ],
      frame = { left: 0, top: 0, side: 512 };
    expect(supportedAnchors(mask, 512, points, edges, [4, 5], frame, 512, 512)).toBe(false);
    mask[128 * 512 + 128] = 4;
    expect(supportedAnchors(mask, 512, points, edges, [4, 5], frame, 512, 512)).toBe(true);
    expect(supportedAnchors(mask, 512, points, edges, [12, 13], frame, 512, 512)).toBe(false);
  });
});
