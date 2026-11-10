import { describe, expect, it } from 'vitest';
import { issueSajuProviderCallSourceProofV1 } from '../src/production/reading-ai-provider-call-source-proof-v1.js';
import {
  createPostgresSajuImmutableProviderReceiptStoreV1,
  createPostgresSajuSignedProviderReceiptReaderV1,
  SAJU_A4_RECEIPT_READER_ROLE_V1,
  SAJU_A4_RECEIPT_WRITER_ROLE_V1,
  type SajuA4ReceiptDatabaseClientV1,
  type SajuA4ReceiptDatabasePoolV1,
} from '../src/production/reading-ai-provider-receipt-postgres-v1.js';
import { createSajuSignedProviderReceiptEmitterV1 } from '../src/production/reading-ai-signed-provider-receipt-emitter-v1.js';
import { createSajuSourceProviderCallCorrelationV1 } from '../src/production/reading-ai-source-call-correlation-v1.js';
import type { SajuSourceProviderCallLinkV1 } from '../src/production/reading-ai-source-call-correlation-v1.js';

const ATTEMPT = '123e4567-e89b-42d3-a456-426614174002';
const REF = '123e4567-e89b-42d3-a456-426614174004';
const CALL = '123e4567-e89b-42d3-a456-426614174003';
const KEY = new Uint8Array(32).fill(64);
const link: SajuSourceProviderCallLinkV1 = {
  version: 'saju-source-provider-call-link-v1',
  executionAttemptId: ATTEMPT,
  externalRequestRef: 'saju_source_' + REF,
  observation: {
    callId: CALL,
    requestId: 'server_generated_saju_request',
    providerKey: 'openai',
    modelKey: 'gpt-5.6',
    source: 'provider_response_usage',
    outcome: 'response_received',
    observedAt: '2026-11-09T10:00:00.000Z',
    usage: { inputTokens: 120, outputTokens: 40, cachedInputTokens: null, reasoningTokens: null },
  },
};
const signing = {
  issuer: 'saju-production',
  audience: 'myeongha-admin-a4',
  keyId: 'key-20261109',
  keyBytes: KEY,
  nowMs: () => Date.parse('2026-11-09T10:00:01.000Z'),
};
const proof = issueSajuProviderCallSourceProofV1({ ...signing, link, issuedAtMs: signing.nowMs() });

function dbFixture(
  role: string,
  options: { failInsert?: boolean; failCommit?: boolean; failRead?: boolean } = {},
  shared = new Map<string, string>(),
) {
  const executed: Array<{ sql: string; values: readonly unknown[] }> = [];
  let released = 0;
  let rolledBack = 0;
  const pool: SajuA4ReceiptDatabasePoolV1 = {
    async connect(): Promise<SajuA4ReceiptDatabaseClientV1> {
      return {
        async query<Row>(sql: string, values: readonly unknown[] = []) {
          executed.push({ sql, values });
          let rows: unknown[] = [];
          if (sql.includes('current_user::text')) rows = [{ currentUser: role }];
          else if (sql.startsWith('INSERT INTO')) {
            if (options.failInsert) throw Error('source DB unavailable');
            if (!shared.has(String(values[0]))) shared.set(String(values[0]), String(values[1]));
          } else if (sql.startsWith('SELECT proof::text')) {
            if (options.failRead) throw Error('signed receipt lookup unavailable');
            const json = shared.get(String(values[0]));
            if (json !== undefined) rows = [{ proofJson: json }];
          } else if (sql === 'COMMIT' && options.failCommit) throw Error('commit uncertain');
          else if (sql === 'ROLLBACK') rolledBack++;
          return { rows: rows as Row[] };
        },
        release() {
          released++;
        },
      };
    },
  };
  return {
    pool,
    executed,
    shared,
    get released() {
      return released;
    },
    get rolledBack() {
      return rolledBack;
    },
  };
}

describe('A4 source-owned PostgreSQL signed receipt connection', () => {
  it('appends through its exclusive Writer transaction and reads from separate dedicated Reader', async () => {
    const records = new Map<string, string>();
    const write = dbFixture(SAJU_A4_RECEIPT_WRITER_ROLE_V1, {}, records);
    const read = dbFixture(SAJU_A4_RECEIPT_READER_ROLE_V1, {}, records);
    const writer = createPostgresSajuImmutableProviderReceiptStoreV1(write.pool);
    const reader = createPostgresSajuSignedProviderReceiptReaderV1(read.pool);
    expect(await reader.loadSignedCallById(CALL)).toBeNull();
    expect(await writer.appendOnceAndRead({ callId: CALL, proof })).toEqual(proof);
    expect(await reader.loadSignedCallById(CALL)).toEqual(proof);
    expect(write.executed.map(({ sql }) => sql)).toEqual(
      expect.arrayContaining(['BEGIN READ WRITE', 'SET LOCAL synchronous_commit TO on', 'COMMIT']),
    );
    expect(write.executed.some(({ sql }) => sql.includes('ON CONFLICT (call_id) DO NOTHING'))).toBe(
      true,
    );
    expect(read.executed.some(({ sql }) => sql === 'BEGIN READ ONLY')).toBe(true);
    expect(read.executed.some(({ sql }) => sql.startsWith('INSERT INTO'))).toBe(false);
    expect(write.released).toBe(1);
    expect(read.released).toBe(2);
  });

  it('acknowledges only the exact immutable stored receipt across retries', async () => {
    const write = dbFixture(SAJU_A4_RECEIPT_WRITER_ROLE_V1);
    const emitter = createSajuSignedProviderReceiptEmitterV1({
      ...signing,
      store: createPostgresSajuImmutableProviderReceiptStoreV1(write.pool),
    });
    await emitter.emit(link);
    await emitter.emit(link);
    expect(write.shared.size).toBe(1);
    await expect(
      emitter.emit({
        ...link,
        observation: {
          ...link.observation,
          usage: { ...link.observation.usage, inputTokens: 121 },
        },
      }),
    ).rejects.toThrow('not immutably acknowledged');
    expect(write.shared.size).toBe(1);
  });

  it('cannot use anonymous or reader authority to append and cannot use writer authority to read', async () => {
    const wrongWriter = dbFixture('postgres');
    const store = createPostgresSajuImmutableProviderReceiptStoreV1(wrongWriter.pool);
    await expect(store.appendOnceAndRead({ callId: CALL, proof })).rejects.toThrow(
      'Dedicated Saju receipt role required',
    );
    expect(wrongWriter.executed.some(({ sql }) => sql.startsWith('INSERT INTO'))).toBe(false);
    expect(wrongWriter.rolledBack).toBe(1);
    const wrongReader = dbFixture(SAJU_A4_RECEIPT_WRITER_ROLE_V1);
    const reader = createPostgresSajuSignedProviderReceiptReaderV1(wrongReader.pool);
    await expect(reader.loadSignedCallById(CALL)).rejects.toThrow(
      'Dedicated Saju receipt role required',
    );
    expect(wrongReader.rolledBack).toBe(1);
  });

  it('rejects malformed caller identities and unsigned or oversized evidence before touching the DB', async () => {
    const write = dbFixture(SAJU_A4_RECEIPT_WRITER_ROLE_V1);
    const store = createPostgresSajuImmutableProviderReceiptStoreV1(write.pool);
    await expect(store.appendOnceAndRead({ callId: 'browser-value', proof })).rejects.toThrow(
      'Invalid Saju provider call ID',
    );
    await expect(
      store.appendOnceAndRead({
        callId: CALL,
        proof: { ...proof, signatureHex: 'invalid' },
      }),
    ).rejects.toThrow('Signed source receipt does not match');
    await expect(
      store.appendOnceAndRead({
        callId: CALL,
        proof: { ...proof, extraField: 'not allowed' } as typeof proof,
      }),
    ).rejects.toThrow('Unexpected fields in signed source receipt projection');
    await expect(
      store.appendOnceAndRead({
        callId: CALL,
        proof: {
          ...proof,
          extraUntrustedPayload: 'x'.repeat(9000),
        } as typeof proof,
      }),
    ).rejects.toThrow('exceeds the permitted evidence projection');
    expect(write.executed).toHaveLength(0);
  });

  it('fails closed and rolls back on storage, readback and ambiguous commit errors', async () => {
    for (const options of [{ failInsert: true }, { failRead: true }, { failCommit: true }]) {
      const write = dbFixture(SAJU_A4_RECEIPT_WRITER_ROLE_V1, options);
      const store = createPostgresSajuImmutableProviderReceiptStoreV1(write.pool);
      await expect(store.appendOnceAndRead({ callId: CALL, proof })).rejects.toThrow();
      expect(write.rolledBack).toBe(1);
      expect(write.released).toBe(1);
    }
  });

  it('keeps out-of-scope OpenAI calls unrecorded and routes admitted calls into PostgreSQL', async () => {
    const write = dbFixture(SAJU_A4_RECEIPT_WRITER_ROLE_V1);
    const emitter = createSajuSignedProviderReceiptEmitterV1({
      ...signing,
      store: createPostgresSajuImmutableProviderReceiptStoreV1(write.pool),
    });
    const correlation = createSajuSourceProviderCallCorrelationV1({
      emit: emitter.emit,
      sourceRefFactory: () => REF,
    });
    await correlation.onProviderCall(link.observation);
    expect(write.shared.size).toBe(0);
    await correlation.withAuthorizedReadingAttemptAndCoverage(
      { executionAttemptId: ATTEMPT },
      async () => {
        await correlation.onProviderCall(link.observation);
      },
      async (report) => {
        expect(report.acknowledgedReceipts).toBe(1);
        expect(report.failedCallbacks).toBe(0);
        expect(report.completeCostCoverage).toBe(false);
      },
    );
    expect(write.shared.size).toBe(1);
  });

  it('never turns malformed or unavailable source lookup into fabricated evidence', async () => {
    const reader = dbFixture(SAJU_A4_RECEIPT_READER_ROLE_V1, { failRead: true });
    await expect(
      createPostgresSajuSignedProviderReceiptReaderV1(reader.pool).loadSignedCallById(CALL),
    ).rejects.toThrow('lookup unavailable');
    expect(reader.rolledBack).toBe(1);
    expect(
      await createPostgresSajuSignedProviderReceiptReaderV1(reader.pool).loadSignedCallById(
        'not-a-uuid',
      ),
    ).toBeNull();
  });
});
