import { describe, expect, it, vi } from 'vitest';
import {
  SOURCE_CURRENTNESS_GATE_VERSION,
  createSourceCurrentnessGate,
} from '../tools/face-reading/two-view/source-currentness-gate.mjs';

describe('open local face review source currentness', () => {
  it('keeps the review available only after an affirmative current response', async () => {
    const blocked = vi.fn();
    const gate = createSourceCurrentnessGate({
      probe: async () => 'current' as const,
      onBlocked: blocked,
    });
    expect(SOURCE_CURRENTNESS_GATE_VERSION).toBe('local-face-source-currentness-gate@0.1.0');
    expect(await gate.check()).toBe(true);
    expect(gate.blocked).toBe(false);
    expect(blocked).not.toHaveBeenCalled();
  });

  it('permanently blocks a replaced source instead of reviving cached observations', async () => {
    const blocked = vi.fn();
    const probe = vi.fn()
      .mockResolvedValueOnce('current')
      .mockResolvedValueOnce('source_changed')
      .mockResolvedValueOnce('current');
    const gate = createSourceCurrentnessGate({ probe, onBlocked: blocked });
    expect(await gate.check()).toBe(true);
    expect(await gate.check()).toBe(false);
    expect(await gate.check()).toBe(false);
    expect(gate.blocked).toBe(true);
    expect(probe).toHaveBeenCalledTimes(2);
    expect(blocked).toHaveBeenCalledExactlyOnceWith('source_changed');
  });

  it('fails closed on an unavailable or malformed verification result', async () => {
    for (const probe of [
      async () => { throw Error('private path must not escape'); },
      async () => 'unexpected',
      async () => null,
    ]) {
      const blocked = vi.fn();
      const gate = createSourceCurrentnessGate({ probe, onBlocked: blocked });
      expect(await gate.check()).toBe(false);
      expect(gate.blocked).toBe(true);
      expect(blocked).toHaveBeenCalledExactlyOnceWith('check_failed');
    }
  });

  it('deduplicates overlapping probes, including late completion', async () => {
    let finish!: (status: string) => void;
    const delayed = new Promise<string>((resolve) => { finish = resolve; });
    const probe = vi.fn(() => delayed);
    const blocked = vi.fn();
    const gate = createSourceCurrentnessGate({ probe, onBlocked: blocked });
    const a = gate.check(), b = gate.check();
    expect(probe).toHaveBeenCalledTimes(1);
    finish('source_changed');
    expect(await Promise.all([a, b])).toEqual([false, false]);
    expect(blocked).toHaveBeenCalledExactlyOnceWith('source_changed');
    expect(await gate.check()).toBe(false);
    expect(probe).toHaveBeenCalledTimes(1);
  });
});
