import { afterEach, describe, expect, it, vi } from 'vitest';
import { createBoundedProductionSpouseOfficialReadingHostV1 } from '../src/production/production-spouse-official-reading-host.js';
import { resolveProductionSpouseOfficialReadingDeliveryAuthorityV1 } from '../src/production/production-spouse-official-reading-delivery-authority.js';

const observed = vi.hoisted(() => ({
  runs: [] as Array<{
    snapshotId: string;
    calculationAt: string;
    artifactAt: string | undefined;
    narrativeAt: string | undefined;
    consumerAuthority: unknown;
    projectionResolver: unknown;
  }>,
}));

// Exercise the real Production host and governed calculation boundary without
// repeating the expensive official interpretation/report corpus in every shard.
vi.mock('../src/research/relationship-spouse-t8-day-branch-palace-project-governed-narrative-materialization.js', () => ({
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY: {},
  runRelationshipSpouseT8DayBranchPalaceNarrativeMaterializedShadowExecution: async () => ({}),
}));

vi.mock('../src/reading/product-reading-service.js', () => ({
  runProductReadingInternals: vi.fn(async (
    snapshot: { snapshotId: string; createdAt: string },
    _interpretation: unknown,
    _registry: unknown,
    _input: unknown,
    options: {
      artifactGeneratedAt?: Date;
      narrativeNow?: Date;
      consumerReadingAuthorityResolver?: unknown;
      officialReadingSemanticProjectionResolver?: unknown;
    },
  ) => {
    const artifactAt = options.artifactGeneratedAt?.toISOString();
    observed.runs.push({
      snapshotId: snapshot.snapshotId,
      calculationAt: snapshot.createdAt,
      artifactAt,
      narrativeAt: options.narrativeNow?.toISOString(),
      consumerAuthority: options.consumerReadingAuthorityResolver,
      projectionResolver: options.officialReadingSemanticProjectionResolver,
    });
    return {
      response: {
        state: 'delivered',
        reading: { generatedAt: artifactAt },
      },
    };
  }),
}));

const REQUEST = {
  birth: {
    calendarType: 'solar',
    date: '2024-03-10',
    time: '12:00',
    sex: 'unspecified',
  },
  reading: { text: '배우자운' },
};

afterEach(() => {
  vi.useRealTimers();
  observed.runs.length = 0;
});

describe('Production spouse official reading request-time provenance', () => {
  it('uses each request clock for calculation and official delivery without losing authority resolvers', async () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    const start = '2026-10-13T02:00:00.000Z';
    const later = '2026-10-14T02:00:00.000Z';
    const host = createBoundedProductionSpouseOfficialReadingHostV1(
      new Date('2020-01-01T00:00:00.000Z'),
    );

    vi.setSystemTime(new Date(start));
    const first = await host.requestReading(REQUEST);
    vi.setSystemTime(new Date(later));
    const second = await host.requestReading(REQUEST);

    expect(first.reading?.generatedAt).toBe(start);
    expect(second.reading?.generatedAt).toBe(later);
    expect(observed.runs).toHaveLength(2);
    expect(observed.runs[0]?.snapshotId).toBe(observed.runs[1]?.snapshotId);
    for (const [index, timestamp] of [start, later].entries()) {
      const run = observed.runs[index];
      expect(run?.calculationAt).toBe(timestamp);
      expect(run?.artifactAt).toBe(timestamp);
      expect(run?.narrativeAt).toBe(timestamp);
      expect(run?.consumerAuthority)
        .toBe(resolveProductionSpouseOfficialReadingDeliveryAuthorityV1);
      expect(typeof run?.projectionResolver).toBe('function');
    }
  });

  it('preserves the Production spouse-only scope gate', async () => {
    const host = createBoundedProductionSpouseOfficialReadingHostV1();
    await expect(host.requestReading({ ...REQUEST, reading: { text: '재물운' } }))
      .rejects.toMatchObject({ code: 'INVALID_READING_REQUEST' });
  });
});
