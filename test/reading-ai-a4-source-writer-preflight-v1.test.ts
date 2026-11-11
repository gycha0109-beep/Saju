import { describe, expect, it } from 'vitest';
import { assertSajuA4SourceWriterReadyV1 } from '../src/production/reading-ai-a4-source-writer-preflight-v1.js';
import type { SajuA4ReceiptDatabasePoolV1 } from '../src/production/reading-ai-provider-receipt-postgres-v1.js';

const READY = {
  currentUser: 'saju_a4_provider_receipt_writer_v1',
  receiptTable: 'saju_source_ops.a4_provider_call_signed_receipts_v1',
  coverageTable: 'saju_source_ops.a4_provider_call_coverage_v1',
  receiptCallInsert: true,
  receiptProofInsert: true,
  receiptCallRead: true,
  receiptProofRead: true,
  coverageAttemptInsert: true,
  coverageRefInsert: true,
  coverageProofInsert: true,
  coverageAttemptRead: true,
  coverageRefRead: true,
  coverageProofRead: true,
};

function fixture(values: Partial<typeof READY> = {}, failure?: 'connect' | 'query' | 'commit') {
  const statements: string[] = [];
  const releases: unknown[] = [];
  const pool: SajuA4ReceiptDatabasePoolV1 = {
    async connect() {
      if (failure === 'connect') throw new Error('dedicated Source DB unavailable');
      return {
        async query<Row>(sql: string) {
          statements.push(sql);
          if (failure === 'query' && sql.includes('to_regclass'))
            throw new Error('Source schema unavailable');
          if (failure === 'commit' && sql === 'COMMIT') throw new Error('COMMIT failed');
          return {
            rows: (sql.includes('to_regclass') ? [{ ...READY, ...values }] : []) as Row[],
          };
        },
        release(error?: unknown) {
          releases.push(error);
        },
      };
    },
  };
  return { pool, statements, releases };
}

describe('A4 Source receipt writer read-only dispatch preflight', () => {
  it('checks exact role, tables and column grants before admission without writing data', async () => {
    const x = fixture();
    await expect(assertSajuA4SourceWriterReadyV1(x.pool)).resolves.toBeUndefined();
    expect(x.statements[0]).toBe('BEGIN READ ONLY');
    expect(x.statements[1]).toContain('has_column_privilege');
    expect(x.statements.at(-1)).toBe('COMMIT');
    expect(x.statements.some((sql) => /^(?:INSERT|UPDATE|DELETE)\b/iu.test(sql))).toBe(false);
    expect(x.releases).toEqual([undefined]);
  });

  it.each([
    [{ currentUser: 'saju_a4_provider_receipt_reader_v1' }, 'wrong principal'],
    [{ receiptTable: null }, 'missing receipts table'],
    [{ coverageTable: null }, 'missing coverage table'],
    [{ receiptCallInsert: false }, 'receipt INSERT revoked'],
    [{ coverageProofInsert: false }, 'coverage INSERT revoked'],
    [{ receiptProofRead: false }, 'receipt read revoked'],
  ])('denies %s (%s) before provider dispatch', async (values, reason) => {
    expect(reason.length).toBeGreaterThan(0);
    const x = fixture(values as Partial<typeof READY>);
    await expect(assertSajuA4SourceWriterReadyV1(x.pool)).rejects.toThrow('not ready');
    expect(x.statements.at(-1)).toBe('ROLLBACK');
    expect(x.releases).toEqual([undefined]);
  });

  it.each(['connect', 'query', 'commit'] as const)(
    'denies unavailable Source storage at %s without a write',
    async (failure) => {
      const x = fixture({}, failure);
      await expect(assertSajuA4SourceWriterReadyV1(x.pool)).rejects.toThrow();
      expect(x.statements.some((sql) => sql.startsWith('INSERT'))).toBe(false);
      if (failure !== 'connect') {
        expect(x.statements.at(-1)).toBe('ROLLBACK');
        expect(x.releases).toEqual([undefined]);
      }
    },
  );
});
