import { describe, it, expect } from 'vitest';
import {
  NOSE_PREVIEW_EPOCH_VERSION,
  startNosePreview,
  invalidateNosePreview,
  isCurrentNosePreview,
} from '../tools/face-reading/two-view/nose-preview-epoch.mjs';

describe('nose preview request freshness after human review saves', () => {
  it('invalidates both old model and human comparison after save', () => {
    const result = {
      noseMaskCandidate: { status: 'available', value: 'old-model' },
      noseHumanComparison: { status: 'available', value: 'old-human' },
    };
    expect(NOSE_PREVIEW_EPOCH_VERSION).toBe('local-nose-preview-epoch@0.1.0');
    const old = startNosePreview(result);
    expect(isCurrentNosePreview(result, old)).toBe(true);
    invalidateNosePreview(result);
    expect(result.noseMaskCandidate).toBeNull();
    expect(result.noseHumanComparison).toBeUndefined();
    expect(isCurrentNosePreview(result, old)).toBe(false);
    const fresh = startNosePreview(result);
    expect(fresh).toBeGreaterThan(old);
    expect(isCurrentNosePreview(result, fresh)).toBe(true);
  });

  it('discards out-of-order completion from two same-photo analyses', async () => {
    const result = {
      noseMaskCandidate: null as null | { status: string },
      noseHumanComparison: undefined as undefined | { status: string },
    };
    const older = startNosePreview(result);
    const deferred = Promise.resolve().then(() => {
      if (isCurrentNosePreview(result, older)) result.noseMaskCandidate = { status: 'old' };
    });
    invalidateNosePreview(result);
    const current = startNosePreview(result);
    if (isCurrentNosePreview(result, current)) {
      result.noseMaskCandidate = { status: 'fresh' };
      result.noseHumanComparison = { status: 'fresh' };
    }
    await deferred;
    expect(result).toMatchObject({
      noseMaskCandidate: { status: 'fresh' },
      noseHumanComparison: { status: 'fresh' },
    });
  });

  it('discards older rejected analyses after newer review and request', () => {
    const result = { noseMaskCandidate: null as null | { status: string } };
    const rejected = startNosePreview(result);
    invalidateNosePreview(result);
    const current = startNosePreview(result);
    if (isCurrentNosePreview(result, rejected)) result.noseMaskCandidate = { status: 'failed' };
    if (isCurrentNosePreview(result, current)) result.noseMaskCandidate = { status: 'available' };
    expect(result.noseMaskCandidate).toEqual({ status: 'available' });
  });

  it('maintains independent revisions per photo object', () => {
    const left = {},
      right = {};
    const leftOld = startNosePreview(left);
    const rightCurrent = startNosePreview(right);
    invalidateNosePreview(left);
    expect(isCurrentNosePreview(left, leftOld)).toBe(false);
    expect(isCurrentNosePreview(right, rightCurrent)).toBe(true);
    const leftNew = startNosePreview(left);
    expect(isCurrentNosePreview(left, leftNew)).toBe(true);
    expect(isCurrentNosePreview(right, leftNew)).toBe(false); // newer left-side epoch does not match right-side epoch
  });

  it('rejects malformed objects and noncurrent epochs', () => {
    expect(() => startNosePreview(null as never)).toThrow('NOSE_PREVIEW_RESULT_INVALID');
    expect(() => invalidateNosePreview([] as never)).toThrow('NOSE_PREVIEW_RESULT_INVALID');
    const result = {};
    const current = startNosePreview(result);
    for (const invalid of [0, -1, NaN, Infinity, 1.5])
      expect(isCurrentNosePreview(result, invalid)).toBe(false);
    expect(isCurrentNosePreview(result, current)).toBe(true);
    expect(JSON.stringify(result)).not.toMatch(/sha|sourcePath|mask|landmark|coordinate/);
  });
});
