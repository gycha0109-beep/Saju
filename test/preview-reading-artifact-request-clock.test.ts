import { describe, expect, it, vi } from 'vitest';
import type { InterpretationExecutionResult } from '../src/interpretation/interpretation-engine.js';
import type { ResolvedRuleRegistrySnapshot } from '../src/interpretation/rule-registry.js';
import { createMyeonghwaProductHost } from '../src/host/product-host.js';
import { createApprovedSourceProofPreviewDependenciesV1 } from '../src/preview/preview-product-host.js';

const observed = vi.hoisted(() => ({
  calls: [] as Array<{
    snapshotAt: string;
    artifactAt: string | undefined;
    narrativeAt: string | undefined;
  }>,
}));

// Capture the governed execution handoff without running a costly full
// interpretation/narrative report three times in a shared 16-shard CI worker.
vi.mock('../src/reading/product-reading-service.js', () => ({
  runProductReadingInternals: vi.fn(async (
    snapshot: { createdAt: string },
    _interpretation: unknown,
    _registry: unknown,
    _input: unknown,
    options: { artifactGeneratedAt?: Date; narrativeNow?: Date },
  ) => {
    const artifactAt = options.artifactGeneratedAt?.toISOString();
    observed.calls.push({
      snapshotAt: snapshot.createdAt,
      artifactAt,
      narrativeAt: options.narrativeNow?.toISOString(),
    });
    return {
      response: {
        state: 'delivered',
        reading: { generatedAt: artifactAt },
      },
    };
  }),
}));

const INPUT = {
  birth: {
    calendarType: 'solar',
    date: '2024-03-10',
    time: '12:00',
    sex: 'unspecified',
  },
  reading: { text: '직업운' },
};

describe('Preview reading artifact request-time provenance', () => {
  it('passes each request clock through calculation, narrative and artifact execution', async () => {
    observed.calls.length = 0;
    const start = new Date('2026-10-13T02:10:00.000Z');
    const later = new Date('2026-10-13T03:10:00.000Z');
    const times = [start, later];
    let index = 0;
    const dependencies = createApprovedSourceProofPreviewDependenciesV1(
      new Date('2026-01-01T00:00:00.000Z'),
    );
    const host = createMyeonghwaProductHost({
      ...dependencies,
      requestNowFactory: () => times[index++] ?? later,
      // Full domain interpretation is separately exercised by existing E2E
      // suites; this test probes the execution metadata wiring alone.
      interpret: () => ({
        registry: {} as ResolvedRuleRegistrySnapshot,
        interpretation: {} as InterpretationExecutionResult,
      }),
    });

    const first = await host.requestReading(INPUT);
    const second = await host.requestReading(INPUT);

    expect(first.reading?.generatedAt).toBe(start.toISOString());
    expect(second.reading?.generatedAt).toBe(later.toISOString());
    expect(observed.calls).toEqual([
      {
        snapshotAt: start.toISOString(),
        artifactAt: start.toISOString(),
        narrativeAt: start.toISOString(),
      },
      {
        snapshotAt: later.toISOString(),
        artifactAt: later.toISOString(),
        narrativeAt: later.toISOString(),
      },
    ]);
  });

  it('keeps request-local options independent of the host initialization clock', () => {
    const dependencies = createApprovedSourceProofPreviewDependenciesV1(
      new Date('2020-01-01T00:00:00.000Z'),
    );
    const context = { requestId: 'preview-provenance', requestedAt: '2026-10-13T04:00:00.000Z' };
    const scoped = dependencies.readingOptionsForRequest?.(context);
    expect(scoped?.narrativeNow?.toISOString()).toBe(context.requestedAt);
    expect(scoped?.artifactGeneratedAt?.toISOString()).toBe(context.requestedAt);
    expect(scoped?.readingVersion).toBe(dependencies.readingOptions.readingVersion);
    expect(dependencies.readingOptions.artifactGeneratedAt?.toISOString())
      .toBe('2020-01-01T00:00:00.000Z');
  });
});
