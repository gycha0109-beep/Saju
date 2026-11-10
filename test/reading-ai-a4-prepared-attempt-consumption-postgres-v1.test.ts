import { describe, expect, it } from 'vitest';
import { createPostgresSajuA4OneTimePreparedAttemptAuthorityV1 } from '../src/production/reading-ai-a4-prepared-attempt-consumption-postgres-v1.js';
import {
  SAJU_A4_RECEIPT_WRITER_ROLE_V1,
  type SajuA4ReceiptDatabaseClientV1,
  type SajuA4ReceiptDatabasePoolV1,
} from '../src/production/reading-ai-provider-receipt-postgres-v1.js';

const ATTEMPT = '123e4567-e89b-42d3-a456-426614174002';
const NONCE = '123e4567-e89b-42d3-a456-426614174003';
const HASH = 'a'.repeat(64);
const NOW = 1_793_000_000_000;
const request = {
  executionAttemptId: ATTEMPT,
  nonce: NONCE,
  requestSha256Hex: HASH,
  expiresAtMs: NOW + 60_000,
};

function fixture(
  options: {
    principal?: string;
    failCommit?: boolean;
    failInsert?: boolean;
    now?: number;
    unexpectedReceipt?: boolean;
  } = {},
) {
  const consumed = new Map<string, string>();
  const usedNonces = new Set<string>();
  const statements: string[] = [];
  let rollbacks = 0;
  let releases = 0;
  const pool: SajuA4ReceiptDatabasePoolV1 = {
    async connect(): Promise<SajuA4ReceiptDatabaseClientV1> {
      return {
        async query<Row>(sql: string, values: readonly unknown[] = []) {
          statements.push(sql);
          let rows: unknown[] = [];
          if (sql.includes('current_user::text')) {
            rows = [{ currentUser: options.principal ?? SAJU_A4_RECEIPT_WRITER_ROLE_V1 }];
          } else if (sql.startsWith('INSERT INTO')) {
            if (options.failInsert) throw Error('source DB insert unavailable');
            const id = String(values[0]);
            const nonce = String(values[1]);
            if (!consumed.has(id) && !usedNonces.has(nonce)) {
              consumed.set(id, nonce);
              usedNonces.add(nonce);
              rows = [{ executionAttemptId: options.unexpectedReceipt ? NONCE : id }];
            }
          } else if (sql === 'ROLLBACK') rollbacks++;
          else if (sql === 'COMMIT' && options.failCommit) throw Error('commit failed');
          return { rows: rows as Row[] };
        },
        release() {
          releases++;
        },
      };
    },
  };
  return {
    store: createPostgresSajuA4OneTimePreparedAttemptAuthorityV1({
      pool,
      nowMs: () => options.now ?? NOW,
    }),
    statements,
    consumed,
    usedNonces,
    get rollbacks() {
      return rollbacks;
    },
    get releases() {
      return releases;
    },
  };
}

describe('A4 source DB single-use attempt and nonce consumption', () => {
  it('atomically consumes a prepared ID exactly once; id and nonce are both unique', async () => {
    const x = fixture();
    expect(await x.store.admitAndConsumeOnce(request)).toBe(true);
    expect(await x.store.admitAndConsumeOnce(request)).toBe(false);
    expect(
      await x.store.admitAndConsumeOnce({
        ...request,
        nonce: '123e4567-e89b-42d3-a456-426614174004',
      }),
    ).toBe(false);
    expect(
      await x.store.admitAndConsumeOnce({
        ...request,
        executionAttemptId: '123e4567-e89b-42d3-a456-426614174005',
      }),
    ).toBe(false);
    expect(x.consumed.size).toBe(1);
    expect(x.statements.filter((sql) => sql === 'COMMIT')).toHaveLength(4);
    expect(x.statements.some((sql) => sql.includes('ON CONFLICT DO NOTHING'))).toBe(true);
    expect(x.releases).toBe(4);
  });

  it('rejects wrong Saju DB principal before any insert', async () => {
    for (const principal of ['postgres', 'service_role', 'saju_a4_provider_receipt_reader_v1']) {
      const x = fixture({ principal });
      await expect(x.store.admitAndConsumeOnce(request)).rejects.toThrow(
        'Dedicated Saju prepared-attempt writer role required',
      );
      expect(x.statements.some((sql) => sql.startsWith('INSERT INTO'))).toBe(false);
      expect(x.rollbacks).toBe(1);
    }
  });

  it('rejects malformed, expired or far-future admission without opening DB', async () => {
    const x = fixture();
    for (const invalid of [
      { ...request, executionAttemptId: 'invalid' },
      { ...request, nonce: 'invalid' },
      { ...request, requestSha256Hex: 'invalid' },
      { ...request, expiresAtMs: NOW },
      { ...request, expiresAtMs: NOW + 130_000 },
      { ...request, expiresAtMs: Number.NaN },
    ]) {
      expect(await x.store.admitAndConsumeOnce(invalid)).toBe(false);
    }
    expect(x.statements).toHaveLength(0);
    expect(x.releases).toBe(0);
  });

  it('fails closed on uncommitted insert, forged RETURNING and unknown COMMIT status', async () => {
    for (const options of [
      { failInsert: true },
      { failCommit: true },
      { unexpectedReceipt: true },
    ]) {
      const x = fixture(options);
      await expect(x.store.admitAndConsumeOnce(request)).rejects.toThrow();
      expect(x.rollbacks).toBe(1);
      expect(x.releases).toBe(1);
    }
  });
});
