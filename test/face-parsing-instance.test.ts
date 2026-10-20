import { describe, expect, it } from 'vitest';
import {
  bgrTensor,
  decodeFaces,
  instanceFrame,
  instancePoint,
  projectInstance,
  instanceChecks,
  mergeInstances,
} from '../tools/face-reading/two-view/instance-frame.mjs';
import {
  PARSING_EAR_VERSION,
  PARSING_VERSION,
  validateParsingSummary,
} from '../tools/face-reading/two-view/parsing-contract.mjs';
function outputs() {
  const result: Record<string, { dims: number[]; data: Float32Array }> = {};
  for (const stride of [8, 16, 32])
    for (const [name, channels] of [
      ['cls', 1],
      ['obj', 1],
      ['bbox', 4],
      ['kps', 10],
    ] as const) {
      const n = (640 / stride) ** 2;
      result[`${name}_${stride}`] = {
        dims: [1, n, channels],
        data: new Float32Array(n * channels),
      };
    }
  return result;
}
const box = {
  x: 0,
  y: 0,
  w: 100,
  h: 100,
  score: 1,
  points: [
    { x: 30, y: 30 },
    { x: 50, y: 30 },
    { x: 40, y: 50 },
    { x: 30, y: 70 },
    { x: 50, y: 70 },
  ],
};
describe('bounded local instance routing', () => {
  it('uses raw BGR and the pinned tensor shape, rejects nonfinite provider output and padding detections', () => {
    expect([...bgrTensor([10, 20, 30, 255], 1)]).toEqual([30, 20, 10]);
    const out = outputs(),
      p = 40 * 80 + 40;
    out.cls_8!.data[p] = 1;
    out.obj_8!.data[p] = 1;
    expect(decodeFaces(out, 640, 640)).toHaveLength(1);
    expect(decodeFaces(out, 100, 50)).toHaveLength(0);
    out.bbox_8!.data[p * 4] = Infinity;
    expect(() => decodeFaces(out, 640, 640)).toThrow('INSTANCE_OUTPUT_INVALID');
    out.cls_8!.dims = [1, 1, 6400];
    expect(() => decodeFaces(out, 640, 640)).toThrow();
  });
  it('suppresses duplicate detections and preserves a sentinel for too many people', () => {
    const out = outputs();
    for (const x of [10, 20, 30, 40, 50]) {
      const p = 20 * 80 + x;
      out.cls_8!.data[p] = 1;
      out.obj_8!.data[p] = 1;
    }
    expect(decodeFaces(out, 640, 640)).toHaveLength(5);
    const p = 20 * 80 + 10,
      duplicate = p + 1;
    out.cls_8!.data[duplicate] = 1;
    out.obj_8!.data[duplicate] = 1;
    out.bbox_8!.data[duplicate * 4] = -1;
    expect(decodeFaces(out, 640, 640)).toHaveLength(5);
  });
  it('projects rotation back into source space without modifying input pixels', () => {
    const frame = { left: 0, top: 0, side: 4, angle: Math.PI / 2 },
      mask = new Uint8Array(16);
    mask[2 * 4 + 1] = 17;
    const projected = projectInstance(mask, 4, frame, 4, 4);
    expect(projected[2 * 4 + 2]).toBe(17);
    expect(mask[2 * 4 + 1]).toBe(17);
    expect(instanceFrame(box).angle).toBe(0);
  });
  it('screens nose and lips independently, preserves background and rejects unsupported lip replacements', () => {
    const frame = instanceFrame(box),
      mask = new Uint8Array(512 * 512),
      nose = instancePoint(box.points[2]!, 512, frame);
    mask[Math.floor(nose.y) * 512 + Math.floor(nose.x)] = 10;
    mask[0] = 1;
    expect(instanceChecks(mask, 512, box, frame)).toEqual({
      noseAligned: true,
      lipsAligned: false,
    });
    const smallFrame = { left: 0, top: 0, side: 2, angle: 0 },
      base = new Uint8Array([17, 1, 10, 1]),
      crop = new Uint8Array([0, 12, 1, 0]);
    const merged = mergeInstances(
      base,
      2,
      [{ box, frame: smallFrame, mask: crop, lipsAligned: false }],
      2,
      2,
    );
    expect([...merged.mask]).toEqual([17, 1, 1, 1]);
    expect([...base]).toEqual([17, 1, 10, 1]);
    expect(merged.counts.reduce((a, b) => a + b, 0)).toBe(4);
  });
  it('keeps ear-only history read-only and validates the new partial-lip status', () => {
    const baseline = {
      methodVersion: PARSING_EAR_VERSION,
      candidateOnly: true,
      status: 'completed',
      counts: [512 * 512, ...Array<number>(18).fill(0)],
      interfacePixels: 0,
      earRefinement: { status: 'unavailable', reason: 'NO_SINGLE_FACE', pixels: 0 },
    };
    expect(validateParsingSummary(baseline, { allowLegacy: true }).methodVersion).toBe(
      PARSING_EAR_VERSION,
    );
    expect(() => validateParsingSummary(baseline)).toThrow();
    const current = {
      ...baseline,
      methodVersion: PARSING_VERSION,
      instanceRefinement: {
        status: 'applied',
        faces: 1,
        lipChecksPassed: 0,
        counts: baseline.counts,
        interfacePixels: 0,
      },
    };
    expect(validateParsingSummary(current)).toMatchObject({
      instanceRefinement: { faces: 1, lipChecksPassed: 0 },
    });
    expect(() =>
      validateParsingSummary({
        ...current,
        instanceRefinement: { ...current.instanceRefinement, lipChecksPassed: 2 },
      }),
    ).toThrow();
    expect(() =>
      validateParsingSummary({ ...current, instanceRefinement: { status: 'not_requested' } }),
    ).toThrow();
  });
  it('assigns overlap to the nearest normalized instance centre without averaging people', () => {
    const base = new Uint8Array(16),
      frame = { left: 0, top: 0, side: 4, angle: 0 };
    const left = { ...box, x: 0, y: 0, w: 2, h: 4 },
      right = { ...box, x: 2, y: 0, w: 2, h: 4 };
    const merged = mergeInstances(
      base,
      4,
      [
        { box: left, frame, lipsAligned: true, mask: new Uint8Array(16).fill(1) },
        { box: right, frame, lipsAligned: true, mask: new Uint8Array(16).fill(17) },
      ],
      4,
      4,
    );
    expect([...merged.mask.slice(0, 4)]).toEqual([1, 1, 17, 17]);
  });
});
