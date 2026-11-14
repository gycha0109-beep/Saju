import { describe, expect, it } from 'vitest';
import { createPostgresSajuProviderCoverageRecorderV1 } from '../src/production/reading-ai-provider-coverage-postgres-v1.js';
import {
  SAJU_A4_RECEIPT_WRITER_ROLE_V1,
  type SajuA4ReceiptDatabaseClientV1,
  type SajuA4ReceiptDatabasePoolV1,
} from '../src/production/reading-ai-provider-receipt-postgres-v1.js';
import {
  createSajuSourceProviderCallCorrelationV1,
  type SajuProviderCallObserverCoverageV1,
} from '../src/production/reading-ai-source-call-correlation-v1.js';

const ATTEMPT = '123e4567-e89b-42d3-a456-426614174002';
const REF = '123e4567-e89b-42d3-a456-426614174004';
const CALL = '123e4567-e89b-42d3-a456-426614174003';
const REPORT: SajuProviderCallObserverCoverageV1 = {
  version: 'saju-provider-call-observer-coverage-v1',
  executionAttemptId: ATTEMPT,
  externalRequestRef: 'saju_source_' + REF,
  observedCallbacks: 1,
  acknowledgedReceipts: 1,
  failedCallbacks: 0,
  pendingCallbacks: 0,
  execution: 'returned',
  completeCostCoverage: false,
};
const OBS = {
  callId: CALL,
  requestId: 'server_private_saju_request',
  providerKey: 'openai' as const,
  modelKey: 'gpt-5.6',
  source: 'provider_response_usage' as const,
  outcome: 'response_received' as const,
  observedAt: '2026-11-09T10:00:00.000Z',
  usage: { inputTokens: 120, outputTokens: 40, cachedInputTokens: null, reasoningTokens: null },
};

function fixture(
  options: {
    principal?: string;
    failInsert?: boolean;
    failRead?: boolean;
    failCommit?: boolean;
    reportJson?: string;
  } = {},
) {
  const rows = new Map<string, string>();
  const queries: Array<{ sql: string; values: readonly unknown[] }> = [];
  const releases: unknown[] = [];
  let rolledBack = 0;
  const pool: SajuA4ReceiptDatabasePoolV1 = {
    async connect(): Promise<SajuA4ReceiptDatabaseClientV1> {
      return {
        async query<Row>(sql: string, values: readonly unknown[] = []) {
          queries.push({ sql, values });
          let results: unknown[] = [];
          if (sql.includes('current_user::text')) {
            results = [{ currentUser: options.principal ?? SAJU_A4_RECEIPT_WRITER_ROLE_V1 }];
          } else if (sql.startsWith('INSERT INTO')) {
            if (options.failInsert) throw Error('durable coverage write unavailable');
            if (!rows.has(String(values[0]))) rows.set(String(values[0]), String(values[2]));
          } else if (sql.startsWith('SELECT coverage::text')) {
            if (options.failRead) throw Error('durable coverage read unavailable');
            const value = options.reportJson ?? rows.get(String(values[0]));
            if (value !== undefined) results = [{ coverageJson: value }];
          } else if (sql === 'COMMIT' && options.failCommit) {
            throw Error('coverage commit uncertain');
          } else if (sql === 'ROLLBACK') {
            rolledBack++;
          }
          return { rows: results as Row[] };
        },
        release(error?: unknown) {
          releases.push(error);
        },
      };
    },
  };
  return {
    recorder: createPostgresSajuProviderCoverageRecorderV1({ pool }),
    rows,
    queries,
    releases,
    get rolledBack() {
      return rolledBack;
    },
  };
}

describe('Admin A4 immutable per-attempt source callback coverage', () => {
  it('durably reports observed callback counters without ever claiming complete costs', async () => {
    const x = fixture();
    await x.recorder.reportCoverage(REPORT);
    expect(JSON.parse(x.rows.get(ATTEMPT)!)).toEqual(REPORT);
    expect(x.queries.map((q) => q.sql)).toEqual([
      'BEGIN READ WRITE',
      'SELECT current_user::text AS "currentUser"',
      'SET LOCAL synchronous_commit TO on',
      expect.stringContaining('ON CONFLICT (execution_attempt_id) DO NOTHING'),
      expect.stringContaining('SELECT coverage::text'),
      'COMMIT',
    ]);
    expect(x.queries.at(-2)?.values).toEqual([ATTEMPT]);
    expect(x.releases).toHaveLength(1);
    await x.recorder.reportCoverage(REPORT);
    expect(x.rows.size).toBe(1);
    expect(x.releases).toHaveLength(2);
  });

  it('detects retry conflicts with changed counters or attempt execution status', async () => {
    const x = fixture();
    await x.recorder.reportCoverage(REPORT);
    await expect(
      x.recorder.reportCoverage({
        ...REPORT,
        observedCallbacks: 1,
        acknowledgedReceipts: 0,
        failedCallbacks: 1,
      }),
    ).rejects.toThrow('not immutably acknowledged');
    await expect(
      x.recorder.reportCoverage({
        ...REPORT,
        execution: 'threw',
      }),
    ).rejects.toThrow('not immutably acknowledged');
    expect(x.rows.size).toBe(1);
    expect(x.rolledBack).toBe(2);
  });

  it('rejects malformed or falsely complete coverage before any database connection', async () => {
    const x = fixture();
    for (const bad of [
      { ...REPORT, completeCostCoverage: true },
      { ...REPORT, executionAttemptId: 'browser-value' },
      { ...REPORT, externalRequestRef: 'saju_source_wrong' },
      { ...REPORT, pendingCallbacks: -1 },
      { ...REPORT, observedCallbacks: 2 },
      { ...REPORT, failedCallbacks: 1 },
      { ...REPORT, acknowledgedReceipts: Number.NaN },
      { ...REPORT, extra: 'birth-private' },
    ]) {
      await expect(
        x.recorder.reportCoverage(bad as SajuProviderCallObserverCoverageV1),
      ).rejects.toThrow('Valid incomplete');
    }
    expect(x.queries).toHaveLength(0);
  });

  it('rejects wrong DB principal and rolls back without inserting evidence', async () => {
    for (const principal of [
      'postgres',
      'saju_a4_provider_receipt_reader_v1',
      'myeongha_reading_ai_cost_writer_v1',
    ]) {
      const x = fixture({ principal });
      await expect(x.recorder.reportCoverage(REPORT)).rejects.toThrow(
        'Dedicated Saju source coverage writer role required',
      );
      expect(x.queries.map((q) => q.sql)).toEqual([
        'BEGIN READ WRITE',
        'SELECT current_user::text AS "currentUser"',
        'ROLLBACK',
      ]);
      expect(x.rows.size).toBe(0);
    }
  });

  it('keeps failures, missing readback and uncertain COMMIT as unacknowledged', async () => {
    for (const options of [
      { failInsert: true },
      { failRead: true },
      { failCommit: true },
      { reportJson: '{}' },
    ]) {
      const x = fixture(options);
      await expect(x.recorder.reportCoverage(REPORT)).rejects.toThrow();
      expect(x.rolledBack).toBe(1);
      expect(x.releases).toHaveLength(1);
    }
  });

  it('persists exact callbacks from the authorized scope on success and failure', async () => {
    const x = fixture();
    const source = createSajuSourceProviderCallCorrelationV1({
      sourceRefFactory: () => REF,
      emit: async () => undefined,
    });
    await source.onProviderCall(OBS);
    expect(x.rows.size).toBe(0);
    await source.withAuthorizedReadingAttemptAndCoverage(
      { executionAttemptId: ATTEMPT },
      async (ref) => {
        expect(ref).toBe(REPORT.externalRequestRef);
        await source.onProviderCall(OBS);
        return 'reading';
      },
      x.recorder.reportCoverage,
    );
    expect(JSON.parse(x.rows.get(ATTEMPT)!)).toEqual(REPORT);

    const failed = fixture();
    const errorSource = createSajuSourceProviderCallCorrelationV1({
      sourceRefFactory: () => REF,
      emit: async () => {
        throw Error('signed receipt store unavailable');
      },
    });
    await expect(
      errorSource.withAuthorizedReadingAttemptAndCoverage(
        { executionAttemptId: ATTEMPT },
        async () => {
          try {
            await errorSource.onProviderCall(OBS);
          } catch {
            /* adapter isolates errors */
          }
          return 'still delivered';
        },
        failed.recorder.reportCoverage,
      ),
    ).resolves.toBe('still delivered');
    expect(JSON.parse(failed.rows.get(ATTEMPT)!)).toMatchObject({
      observedCallbacks: 1,
      acknowledgedReceipts: 0,
      failedCallbacks: 1,
      completeCostCoverage: false,
    });
  });

  it('fails closed when authoritative durable coverage report cannot be persisted', async () => {
    const failed = fixture({ failInsert: true });
    const source = createSajuSourceProviderCallCorrelationV1({
      sourceRefFactory: () => REF,
      emit: () => undefined,
    });
    await expect(
      source.withAuthorizedReadingAttemptAndCoverage(
        { executionAttemptId: ATTEMPT },
        async () => 'narrative',
        failed.recorder.reportCoverage,
      ),
    ).rejects.toThrow('durable coverage write unavailable');
  });
});
