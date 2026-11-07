import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  computeFrontalMetrics,
  METHOD_VERSION,
} from '../tools/face-reading/two-view/frontal-metrics.mjs';
import { PreviewJobs } from '../tools/face-reading/two-view/jobs.mjs';
import { validateBatch } from '../tools/face-reading/two-view/server.mjs';

function fixture() {
  const landmarks = Array.from({ length: 478 }, () => ({ x: 0.5, y: 0.5 }));
  let offset = 0;
  const cycle = (points: number[][]) => {
    const indices = points.map(([x, y]) => {
      const index = offset++;
      landmarks[index] = { x: x!, y: y! };
      return index;
    });
    return indices.map((start, i) => ({ start, end: indices[(i + 1) % indices.length]! }));
  };
  const topology = {
    eyeA: cycle([
      [0.25, 0.4],
      [0.325, 0.375],
      [0.4, 0.4],
      [0.325, 0.425],
    ]),
    eyeB: cycle([
      [0.6, 0.4],
      [0.675, 0.375],
      [0.75, 0.4],
      [0.675, 0.425],
    ]),
    mouth: [
      ...cycle([
        [0.35, 0.7],
        [0.5, 0.675],
        [0.65, 0.7],
        [0.5, 0.725],
      ]),
      ...cycle([
        [0.4, 0.7],
        [0.5, 0.69],
        [0.6, 0.7],
        [0.5, 0.71],
      ]),
    ],
    oval: cycle([
      [0.5, 0.15],
      [0.75, 0.2],
      [0.9, 0.5],
      [0.75, 0.9],
      [0.5, 0.95],
      [0.25, 0.9],
      [0.1, 0.5],
      [0.25, 0.2],
    ]),
  };
  return { landmarks, topology, width: 1000, height: 1000, captureRef: 'fixture' };
}

describe('image-plane frontal preview', () => {
  it('measures the unordered model contour envelope without lip thickness or canonical authority', () => {
    const metrics = computeFrontalMetrics(fixture());
    expect(metrics).toHaveLength(8);
    expect(metrics.every((m) => m.status === 'available')).toBe(true);
    expect(metrics.find((m) => m.metricKey.endsWith('mouth_span_ratio'))?.value).toBeCloseTo(0.375);
    expect(metrics.find((m) => m.metricKey.endsWith('eye_span_difference'))?.value).toBeCloseTo(0);
    const serialized = JSON.stringify(metrics);
    expect(serialized).not.toMatch(/landmarks|sourcePath|digest|thickness|FR293/);
    expect(metrics.every((m) => m.candidateOnly === true)).toBe(true);
  });
  it('preserves ratios under translation, uniform scale, reflection, eye-pair swap and rotation within the upright view', () => {
    const baseline = fixture();
    const expected = computeFrontalMetrics(baseline).map((m) => m.value!);
    const variants = [
      { ...fixture(), width: 2000, height: 2000 },
      {
        ...fixture(),
        landmarks: baseline.landmarks.map((p) => ({
          x: 0.5 + 0.6 * (p.x - 0.5),
          y: 0.5 + 0.6 * (p.y - 0.5),
        })),
      },
      {
        ...fixture(),
        landmarks: baseline.landmarks.map((p) => ({ x: p.x + 0.01, y: p.y - 0.02 })),
      },
      { ...fixture(), landmarks: baseline.landmarks.map((p) => ({ x: 1 - p.x, y: p.y })) },
      {
        ...fixture(),
        topology: {
          ...baseline.topology,
          eyeA: baseline.topology.eyeB,
          eyeB: baseline.topology.eyeA,
        },
      },
      {
        ...fixture(),
        landmarks: baseline.landmarks.map((p) => ({
          x: 0.5 + Math.cos(0.2) * (p.x - 0.5) - Math.sin(0.2) * (p.y - 0.5),
          y: 0.5 + Math.sin(0.2) * (p.x - 0.5) + Math.cos(0.2) * (p.y - 0.5),
        })),
      },
    ];
    for (const input of variants)
      computeFrontalMetrics(input).forEach((m, i) => expect(m.value).toBeCloseTo(expected[i]!, 10));
  });
  it('uses decoded pixel aspect rather than normalized provider x/y aspect', () => {
    const original = fixture();
    const rectangular = {
      ...original,
      width: 2000,
      landmarks: original.landmarks.map((p) => ({ x: p.x / 2 + 0.25, y: p.y })),
    };
    computeFrontalMetrics(rectangular).forEach((m, i) =>
      expect(m.value).toBeCloseTo(computeFrontalMetrics(original)[i]!.value!, 10),
    );
  });
  it('isolates mouth clipping while preserving independent eye metrics', () => {
    const input = fixture();
    input.landmarks[input.topology.mouth[0]!.start]!.x = 0;
    const metrics = computeFrontalMetrics(input);
    expect(metrics.find((m) => m.region === 'mouth')?.status).toBe('unavailable');
    expect(metrics.filter((m) => m.region === 'eyes').every((m) => m.status === 'available')).toBe(
      true,
    );
  });
  it('rejects topology drift and emits no NaN values for collapsed eyes', () => {
    const input = fixture();
    input.topology.eyeA.push(input.topology.eyeA[0]!);
    expect(() => computeFrontalMetrics(input)).toThrow('TOPOLOGY_INVALID');
    const collapsed = fixture();
    for (const e of [...collapsed.topology.eyeA, ...collapsed.topology.eyeB])
      collapsed.landmarks[e.start] = { x: 0.5, y: 0.5 };
    expect(
      computeFrontalMetrics(collapsed).every(
        (m) => m.status === 'unavailable' && m.value === undefined,
      ),
    ).toBe(true);
  });
  it('does not turn a profile slot into frontal measurements', () => {
    expect(
      computeFrontalMetrics({ ...fixture(), viewRole: 'profile' }).every(
        (m) => m.reason === 'profile_method_not_implemented',
      ),
    ).toBe(true);
  });
  it('keeps safe local persistence separate from canonical receipts and source mappings', () => {
    const metrics = computeFrontalMetrics(fixture());
    const saved = validateBatch(
      { methodVersion: METHOD_VERSION, records: [{ captureRef: 'fixture', metrics }] },
      ['fixture'],
    );
    expect(saved[0]!.metrics).toHaveLength(8);
    expect(JSON.stringify(saved)).not.toMatch(/sourcePath|landmarks|digest/);
    expect(() =>
      validateBatch(
        { methodVersion: METHOD_VERSION, records: [{ captureRef: 'other', metrics }] },
        ['fixture'],
      ),
    ).toThrow('BATCH_INVALID');
    metrics[0]!.value = Number.NaN;
    expect(() =>
      validateBatch(
        { methodVersion: METHOD_VERSION, records: [{ captureRef: 'fixture', metrics }] },
        ['fixture'],
      ),
    ).toThrow('METRIC_INVALID');
  });
});

describe('mixed-role persistence', () => {
  it('stores an explicitly routed profile without converting it to frontal scalars', () => {
    const metrics = computeFrontalMetrics(fixture());
    const roles = new Map<string, 'frontal' | 'profile'>([['side', 'profile']]);
    const input = {
      methodVersion: METHOD_VERSION,
      records: [
        { captureRef: 'fixture', metrics },
        { captureRef: 'side', metrics: [] },
      ],
    };
    expect(validateBatch(input, ['fixture', 'side'], roles)[1]!.metrics).toEqual([]);
    expect(() => validateBatch(input, ['fixture', 'side'])).toThrow('BATCH_INVALID');
    expect(() =>
      validateBatch(
        { ...input, records: [input.records[0]!, { captureRef: 'side', metrics }] },
        ['fixture', 'side'],
        roles,
      ),
    ).toThrow('METRIC_INVALID');
  });
});

describe('bounded all-capture jobs', () => {
  afterEach(() => vi.useRealTimers());
  it('schedules all 18 captures and continues after one provider fails', async () => {
    const jobs = new PreviewJobs();
    const seen: string[] = [];
    const tasks = Array.from({ length: 18 }, (_, i) => ({
      captureRef: `capture-${i}`,
      viewRole: 'frontal',
    }));
    const result = await jobs.run(tasks, async (task) => {
      seen.push(task.captureRef);
      if (task.captureRef === 'capture-3') throw Error('FAILED');
      return 'ok';
    });
    expect(seen).toHaveLength(18);
    expect(result.results).toHaveLength(18);
    expect(jobs.snapshot().filter((t) => t.state === 'completed')).toHaveLength(17);
    expect(jobs.snapshot().filter((t) => t.state === 'failed')).toHaveLength(1);
  });
  it('aborts timed-out work and reaches a terminal state without blocking later captures', async () => {
    vi.useFakeTimers();
    const jobs = new PreviewJobs({ deadlineMs: 20 });
    let aborted = false;
    const result = jobs.run(
      [
        { captureRef: 'first', viewRole: 'frontal' },
        { captureRef: 'second', viewRole: 'frontal' },
      ],
      async (task, { signal }) => {
        if (task.captureRef === 'second') return 'ok';
        signal.addEventListener('abort', () => {
          aborted = true;
        });
        return new Promise<string>(() => {});
      },
    );
    await vi.advanceTimersByTimeAsync(21);
    expect((await result).results[0]!.error).toBe('TASK_TIMEOUT');
    expect(aborted).toBe(true);
    expect(jobs.snapshot()[1]!.state).toBe('completed');
  });
  it('ignores late results from a cancelled generation', async () => {
    const jobs = new PreviewJobs();
    let release: (value: string) => void = () => {};
    const old = jobs.run(
      [{ captureRef: 'old', viewRole: 'frontal' }],
      () =>
        new Promise<string>((r) => {
          release = r;
        }),
    );
    await Promise.resolve();
    const current = await jobs.run(
      [{ captureRef: 'new', viewRole: 'frontal' }],
      async () => 'new-result',
    );
    release('old-result');
    expect((await old).current).toBe(false);
    expect(current.current).toBe(true);
    expect(jobs.snapshot().map((i) => i.captureRef)).toEqual(['new']);
  });
});
