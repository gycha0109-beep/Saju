import { describe, expect, it } from 'vitest';
import {
  CURRENT_2D_PREVIEW_SWEEP_VERSION,
  sweepCurrent2dPreviewCandidates,
} from '../tools/face-reading/two-view/current-2d-preview-sweep.mjs';

describe('research-only existing photo candidate preview sweep', () => {
  it('visits every source index once and waits for async candidates to settle', async () => {
    expect(CURRENT_2D_PREVIEW_SWEEP_VERSION).toMatch(/^engineering\./);
    const visits = [];
    const polls = new Map();
    const result = await sweepCurrent2dPreviewCandidates({
      count: 3,
      visit: (index) => visits.push(index),
      settled: (index) => {
        const next = (polls.get(index) ?? 0) + 1;
        polls.set(index, next);
        return next > index + 1;
      },
      pause: async () => {},
      current: () => true,
      maxPolls: 5,
    });
    expect(visits).toEqual([0, 1, 2]);
    expect(result).toMatchObject({
      status: 'completed',
      visited: 3,
      timedOut: 0,
      modelInferenceExecuted: false,
      originalImagesPersisted: false,
      independentAccuracyValidated: false,
    });
  });

  it('marks timeout but still visits the following photo without inventing measurements', async () => {
    const visits = [];
    const result = await sweepCurrent2dPreviewCandidates({
      count: 2,
      visit: (i) => visits.push(i),
      settled: (i) => i === 1,
      pause: async () => {},
      current: () => true,
      maxPolls: 2,
    });
    expect(visits).toEqual([0, 1]);
    expect(result).toMatchObject({ status: 'partial', timedOut: 1, visited: 2 });
  });

  it('stops immediately on cancellation or source change', async () => {
    let current = true;
    const visits = [];
    const result = await sweepCurrent2dPreviewCandidates({
      count: 10,
      visit: (i) => visits.push(i),
      settled: () => false,
      pause: async () => {
        current = false;
      },
      current: () => current,
    });
    expect(result).toMatchObject({ status: 'cancelled', visited: 1, timedOut: 0 });
    expect(visits).toEqual([0]);
  });

  it('rejects invalid scheduling arguments', async () => {
    await expect(
      sweepCurrent2dPreviewCandidates({
        count: 0,
        visit: () => {},
        settled: () => true,
        pause: async () => {},
        current: () => true,
      }),
    ).rejects.toThrow('CURRENT_2D_SWEEP_INPUT_INVALID');
  });
});
