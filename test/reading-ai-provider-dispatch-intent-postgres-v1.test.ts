import { describe, expect, it } from 'vitest';
import type { SajuA4ReceiptDatabasePoolV1 } from '../src/production/reading-ai-provider-receipt-postgres-v1.js';
import {
  createPostgresSajuProviderDispatchIntentRecorderV1,
  type SajuA4ProviderDispatchLinkV1,
} from '../src/production/reading-ai-provider-dispatch-intent-postgres-v1.js';

const ATTEMPT = '123e4567-e89b-42d3-a456-426614174002';
const REF = 'saju_source_123e4567-e89b-42d3-a456-426614174004';
const CALL = '123e4567-e89b-42d3-a456-426614174006';
const LINK: SajuA4ProviderDispatchLinkV1 = {
  executionAttemptId: ATTEMPT,
  externalRequestRef: REF,
  intent: {
    callId: CALL,
    requestId: 'server-source-request',
    providerKey: 'openai',
    modelKey: 'gpt-5.6',
    preparedAt: '2026-11-12T02:00:00.000Z',
  },
};

type Row = { executionAttemptId: string; externalRequestRef: string; intentJson: string };
function fixture(opts: {
  role?: string;
  missing?: boolean;
  failInsert?: boolean;
  failCommit?: boolean;
  unreadable?: boolean;
} = {}) {
  const stored = new Map<string, Row>();
  const sql: string[] = [];
  const released: unknown[] = [];
  const pool: SajuA4ReceiptDatabasePoolV1 = {
    async connect() {
      return {
        async query<T>(query: string, params: readonly unknown[] = []) {
          sql.push(query);
          let rows: unknown[] = [];
          if (query.startsWith('SELECT current_user::text')) {
            rows = [{ currentUser: opts.role ?? 'saju_a4_provider_receipt_writer_v1' }];
          } else if (query.startsWith('INSERT INTO saju_source_ops.a4_provider_dispatch_intents_v1')) {
            if (opts.failInsert) throw new Error('Intent store unavailable');
            const key = String(params[0]);
            if (!stored.has(key)) {
              stored.set(key, {
                executionAttemptId: String(params[1]),
                externalRequestRef: String(params[2]),
                intentJson: String(params[3]),
              });
            }
          } else if (query.startsWith('SELECT execution_attempt_id::text')) {
            if (!opts.missing) {
              const value = stored.get(String(params[0]));
              if (value) rows = [{ ...value, ...(opts.unreadable ? { intentJson: 'not-json' } : {}) }];
            }
          } else if (query === 'COMMIT' && opts.failCommit) {
            throw new Error('COMMIT failed');
          }
          return { rows: rows as T[] };
        },
        release(discard?: unknown) {
          released.push(discard);
        },
      };
    },
  };
  return {
    writer: createPostgresSajuProviderDispatchIntentRecorderV1(pool),
    stored, sql, released,
  };
}

describe('A4 offline immutable pre-network Source intent recorder', () => {
  it('commits one minimal intent, reads it back and acknowledges only after COMMIT', async () => {
    const x = fixture();
    await expect(x.writer.recordBeforeRequest(LINK)).resolves.toBeUndefined();
    expect(x.stored.size).toBe(1);
    expect(x.sql).toEqual([
      'BEGIN READ WRITE',
      'SELECT current_user::text AS "currentUser"',
      'SET LOCAL synchronous_commit TO on',
      expect.stringContaining('INSERT INTO saju_source_ops.a4_provider_dispatch_intents_v1'),
      expect.stringContaining('SELECT execution_attempt_id::text'),
      'COMMIT',
    ]);
    const stored = x.stored.get(CALL)!;
    expect(stored.executionAttemptId).toBe(ATTEMPT);
    expect(stored.externalRequestRef).toBe(REF);
    expect(JSON.parse(stored.intentJson)).toEqual(LINK.intent);
    expect(stored.intentJson).not.toContain('Authorization');
    expect(stored.intentJson).not.toContain('birth');
    expect(x.released).toEqual([undefined]);
  });

  it('accepts idempotent exact replay, rejects same call ID rebound to another attempt', async () => {
    const x = fixture();
    await x.writer.recordBeforeRequest(LINK);
    await expect(x.writer.recordBeforeRequest(LINK)).resolves.toBeUndefined();
    await expect(
      x.writer.recordBeforeRequest({
        ...LINK, executionAttemptId: '123e4567-e89b-42d3-a456-426614174008',
      }),
    ).rejects.toThrow('missing or conflicting');
    expect(x.stored.size).toBe(1);
    expect(x.sql.at(-1)).toBe('ROLLBACK');
  });

  it.each([
    { role: 'postgres' },
    { role: 'saju_a4_provider_receipt_reader_v1' },
  ])('rejects incorrect database identity before INSERT: %j', async (opts) => {
    const x = fixture(opts);
    await expect(x.writer.recordBeforeRequest(LINK)).rejects.toThrow('Writer required');
    expect(x.sql.some((s) => s.startsWith('INSERT'))).toBe(false);
    expect(x.sql.at(-1)).toBe('ROLLBACK');
  });

  it.each([
    [{ ...LINK, externalRequestRef: 'client-controlled' }, 'bad source ref'],
    [{ ...LINK, intent: { ...LINK.intent, callId: 'bad-id' } }, 'invalid call UUID'],
    [{ ...LINK, intent: { ...LINK.intent, providerKey: 'other' } }, 'wrong provider'],
    [{ ...LINK, intent: { ...LINK.intent, preparedAt: 'not-a-date' } }, 'bad timestamp'],
    [{ ...LINK, intent: { ...LINK.intent, Authorization: 'secret' } }, 'unexpected field'],
    [{ ...LINK, intent: { ...LINK.intent, requestId: '' } }, 'blank request ID'],
  ])('rejects malformed or oversized intent before opening DB: %s (%s)', async (link, reason) => {
    expect(reason.length).toBeGreaterThan(0);
    const x = fixture();
    await expect(x.writer.recordBeforeRequest(link as SajuA4ProviderDispatchLinkV1))
      .rejects.toThrow('Invalid A4 pre-network dispatch intent');
    expect(x.sql).toHaveLength(0);
  });

  it.each([
    [{ failInsert: true }, 'Intent store unavailable'],
    [{ missing: true }, 'missing or conflicting'],
    [{ unreadable: true }, 'Invalid persisted'],
    [{ failCommit: true }, 'COMMIT failed'],
  ])('fails closed on persistence errors: %s (%s)', async (opts, message) => {
    const x = fixture(opts);
    await expect(x.writer.recordBeforeRequest(LINK)).rejects.toThrow(message);
    expect(x.sql.at(-1)).toBe('ROLLBACK');
    expect(x.released).toEqual([undefined]);
  });
});
