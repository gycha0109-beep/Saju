import { createHmac } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import type { SajuA4ReceiptDatabasePoolV1 } from '../src/production/reading-ai-provider-receipt-postgres-v1.js';
import {
  createSajuA4SignedPreparedAttemptAdmissionV1,
  SAJU_A4_PREPARED_ADMISSION_ROLE_V1,
  SAJU_A4_PREPARED_ADMISSION_VERSION_V1,
} from '../src/production/reading-ai-a4-signed-attempt-admission-v1.js';

const ATTEMPT = '123e4567-e89b-42d3-a456-426614174002';
const OTHER = '123e4567-e89b-42d3-a456-426614174009';
const READING = '123e4567-e89b-42d3-a456-426614174001';
const SUBJECT = '123e4567-e89b-42d3-a456-426614174000';
const NOW = Date.parse('2026-11-11T00:30:00.000Z');
const KEY = new Uint8Array(32).fill(31);
const DOMAIN = 'myeongha/a4/prepared-attempt-proof/v1\0';
const payload = {
  version: SAJU_A4_PREPARED_ADMISSION_VERSION_V1,
  issuer: 'myeongha-production',
  audience: 'saju-production-a4',
  keyId: 'mh-a4-prepared-v1',
  issuedAtMs: NOW - 2000,
  expiresAtMs: NOW + 90000,
  executionAttemptId: ATTEMPT,
  readingId: READING,
  subjectId: SUBJECT,
};

function canonical(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonical);
  if (!value || typeof value !== 'object') return value;
  const x = value as Record<string, unknown>;
  return Object.fromEntries(
    Object.keys(x)
      .sort()
      .map((k) => [k, canonical(x[k])]),
  );
}
function sign(x: unknown, key = KEY) {
  return {
    payload: x,
    signatureHex: createHmac('sha256', key)
      .update(DOMAIN)
      .update(JSON.stringify(canonical(x)))
      .digest('hex'),
  };
}
function fixture(
  opts: {
    proof?: unknown;
    role?: string;
    now?: number;
    dbError?: boolean;
    commitError?: boolean;
    loadError?: boolean;
  } = {},
) {
  const consumed = new Set<string>();
  const statements: string[] = [];
  let connections = 0;
  let loads = 0;
  const pool: SajuA4ReceiptDatabasePoolV1 = {
    async connect() {
      connections++;
      return {
        async query<Row>(sql: string, values: readonly unknown[] = []) {
          statements.push(sql);
          if (opts.dbError && sql.startsWith('INSERT')) throw Error('source claim DB unavailable');
          if (opts.commitError && sql === 'COMMIT') throw Error('claim COMMIT failed');
          let rows: unknown[] = [];
          if (sql.includes('current_user::text')) {
            rows = [{ currentUser: opts.role ?? SAJU_A4_PREPARED_ADMISSION_ROLE_V1 }];
          } else if (sql.startsWith('INSERT INTO saju_source_ops.a4_prepared_attempt_claims_v1')) {
            const id = String(values[0]);
            if (!consumed.has(id)) {
              consumed.add(id);
              rows = [{ executionAttemptId: id }];
            }
          }
          return { rows: rows as Row[] };
        },
        release() {},
      };
    },
  };
  const a = createSajuA4SignedPreparedAttemptAdmissionV1({
    pool,
    trustedIssuer: 'myeongha-production',
    expectedAudience: 'saju-production-a4',
    trustedKeyId: 'mh-a4-prepared-v1',
    keyBytes: KEY,
    nowMs: () => opts.now ?? NOW,
    async loadSignedProof(attempt) {
      loads++;
      expect(attempt).toBe(ATTEMPT);
      if (opts.loadError) throw Error('MyeongHa source authority unavailable');
      return opts.proof === undefined ? sign(payload) : opts.proof;
    },
  });
  return {
    a,
    statements,
    consumed,
    get loads() {
      return loads;
    },
    get connections() {
      return connections;
    },
  };
}

describe('Saju A4 signed MyeongHa DB-prepared attempt single-use gate', () => {
  it('accepts exact trusted MH proof and atomically consumes once', async () => {
    const x = fixture();
    expect(await x.a.admitAndConsumePreparedAttempt({ executionAttemptId: ATTEMPT })).toBe(true);
    expect(await x.a.admitAndConsumePreparedAttempt({ executionAttemptId: ATTEMPT })).toBe(false);
    expect(x.consumed.size).toBe(1);
    expect(x.loads).toBe(2);
    expect(x.statements.filter((s) => s === 'COMMIT')).toHaveLength(2);
    expect(x.statements.some((s) => s.startsWith('UPDATE') || s.startsWith('DELETE'))).toBe(false);
  });

  it('blocks forged signature, changed subject, changed Reading and wrong audience with no DB connection', async () => {
    const v = [
      { ...sign(payload), signatureHex: '0'.repeat(64) },
      { ...sign(payload), payload: { ...payload, subjectId: OTHER } },
      { ...sign(payload), payload: { ...payload, readingId: OTHER } },
      sign({ ...payload, audience: 'other-service' }),
      sign({ ...payload, executionAttemptId: OTHER }),
      sign({ ...payload, keyId: 'other-key' }),
      sign({ ...payload, issuer: 'other-issuer' }),
    ];
    for (const proof of v) {
      const x = fixture({ proof });
      expect(await x.a.admitAndConsumePreparedAttempt({ executionAttemptId: ATTEMPT })).toBe(false);
      expect(x.connections).toBe(0);
    }
  });

  it('rejects expired, future, zero/oversized window, malformed payload and missing proof', async () => {
    for (const proof of [
      sign({ ...payload, issuedAtMs: NOW - 120001, expiresAtMs: NOW - 1 }),
      sign({ ...payload, issuedAtMs: NOW + 10001, expiresAtMs: NOW + 90000 }),
      sign({ ...payload, expiresAtMs: payload.issuedAtMs }),
      sign({ ...payload, expiresAtMs: NOW + 120001 }),
      { ...sign(payload), payload: { ...payload, userPrompt: 'not permitted' } },
      null,
    ]) {
      const x = fixture({ proof });
      expect(await x.a.admitAndConsumePreparedAttempt({ executionAttemptId: ATTEMPT })).toBe(false);
      expect(x.connections).toBe(0);
    }
  });

  it('denies role impersonation and source claim failure without provider admission', async () => {
    for (const options of [
      { role: 'postgres' },
      { role: 'saju_a4_provider_receipt_writer_v1' },
      { dbError: true },
      { commitError: true },
      { loadError: true },
    ]) {
      const x = fixture(options);
      await expect(
        x.a.admitAndConsumePreparedAttempt({ executionAttemptId: ATTEMPT }),
      ).rejects.toThrow();
    }
  });

  it('rejects malformed attempt ID before loading proof or opening DB', async () => {
    const x = fixture();
    expect(await x.a.admitAndConsumePreparedAttempt({ executionAttemptId: 'browser-id' })).toBe(
      false,
    );
    expect(x.connections).toBe(0);
    expect(x.loads).toBe(0);
  });

  it('requires a server-held signing key and private MyeongHa source reader', () => {
    const x = fixture();
    expect(() =>
      createSajuA4SignedPreparedAttemptAdmissionV1({
        pool: {
          connect: async () => {
            throw Error('not used');
          },
        },
        trustedIssuer: 'myeongha-production',
        expectedAudience: 'saju-production-a4',
        trustedKeyId: 'mh-a4-prepared-v1',
        keyBytes: new Uint8Array(4),
        nowMs: () => NOW,
        loadSignedProof: async () => sign(payload),
      }),
    ).toThrow('Trusted MyeongHa prepared-attempt signer');
    expect(x.connections).toBe(0);
  });
});
