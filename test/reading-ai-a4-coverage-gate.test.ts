import { createHmac } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import type { SajuA4ReceiptDatabasePoolV1 } from '../src/production/reading-ai-provider-receipt-postgres-v1.js';
import { createSajuA4AuthenticatedCaptureCompositionV1 } from '../src/production/reading-ai-a4-authenticated-capture-composition-v1.js';

const ATTEMPT = '123e4567-e89b-42d3-a456-426614174002';
const SOURCE = 'saju_source_123e4567-e89b-42d3-a456-426614174004';
const CALL = '123e4567-e89b-42d3-a456-426614174005';
const NOW = Date.parse('2026-11-11T01:00:00.000Z');
const MH_KEY = new Uint8Array(32).fill(31);
const SOURCE_KEY = new Uint8Array(32).fill(93);
const payload = {
  version: 'myeongha-a4-prepared-attempt-proof-v1',
  issuer: 'myeongha-production',
  audience: 'saju-production-a4',
  keyId: 'mh-a4-prepared-v1',
  issuedAtMs: NOW - 1000,
  expiresAtMs: NOW + 90000,
  executionAttemptId: ATTEMPT,
  readingId: '123e4567-e89b-42d3-a456-426614174001',
  subjectId: '123e4567-e89b-42d3-a456-426614174000',
};
function canonical(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonical);
  if (value === null || typeof value !== 'object') return value;
  const r = value as Record<string, unknown>;
  return Object.fromEntries(
    Object.keys(r)
      .sort()
      .map((k) => [k, canonical(r[k])]),
  );
}
const proof = () => ({
  payload,
  signatureHex: createHmac('sha256', MH_KEY)
    .update('myeongha/a4/prepared-attempt-proof/v1\0')
    .update(JSON.stringify(canonical(payload)))
    .digest('hex'),
});

function setup(
  opts: { lostReceipt?: boolean; invalidReceipt?: boolean; missingCoverage?: boolean } = {},
) {
  const claims = new Set<string>();
  const receipts = new Map<string, string>();
  const coverage = new Map<string, string>();
  const events: string[] = [];
  const claimPool: SajuA4ReceiptDatabasePoolV1 = {
    async connect() {
      return {
        async query<Row>(sql: string, args: readonly unknown[] = []) {
          let rows: unknown[] = [];
          if (sql.includes('current_user::text'))
            rows = [{ currentUser: 'saju_a4_prepared_attempt_claim_writer_v1' }];
          else if (sql.includes('INSERT INTO saju_source_ops.a4_prepared_attempt_claims_v1')) {
            if (!claims.has(String(args[0]))) {
              claims.add(String(args[0]));
              rows = [{ executionAttemptId: String(args[0]) }];
            }
          }
          return { rows: rows as Row[] };
        },
        release() {},
      };
    },
  };
  const sourceReceiptPool: SajuA4ReceiptDatabasePoolV1 = {
    async connect() {
      return {
        async query<Row>(sql: string, args: readonly unknown[] = []) {
          let rows: unknown[] = [];
          if (sql.includes('to_regclass(')) {
            rows = [
              {
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
              },
            ];
          } else if (sql.includes('current_user::text')) {
            rows = [{ currentUser: 'saju_a4_provider_receipt_writer_v1' }];
          } else if (
            sql.startsWith('INSERT INTO saju_source_ops.a4_provider_call_signed_receipts_v1')
          ) {
            receipts.set(String(args[0]), String(args[1]));
          } else if (sql.includes('FROM saju_source_ops.a4_provider_call_signed_receipts_v1')) {
            if (sql.includes('WHERE call_id = $1::uuid')) {
              const json = receipts.get(String(args[0]));
              if (json !== undefined) rows = [{ proofJson: json }];
            } else if (sql.includes('ORDER BY call_id LIMIT 501') && !opts.lostReceipt) {
              rows = [...receipts].map(([callId, json]) => ({
                callId,
                proofJson: opts.invalidReceipt
                  ? JSON.stringify({
                      ...(JSON.parse(json) as object),
                      signatureHex: '0'.repeat(64),
                    })
                  : json,
              }));
            }
          } else if (sql.startsWith('INSERT INTO saju_source_ops.a4_provider_call_coverage_v1')) {
            coverage.set(String(args[0]), String(args[2]));
          } else if (sql.includes('FROM saju_source_ops.a4_provider_call_coverage_v1')) {
            const json = coverage.get(String(args[0]));
            if (
              json !== undefined &&
              !(opts.missingCoverage && sql.includes('external_request_ref AS'))
            ) {
              rows = sql.includes('external_request_ref AS')
                ? [{ coverageJson: json, externalRequestRef: SOURCE }]
                : [{ coverageJson: json }];
            }
          }
          return { rows: rows as Row[] };
        },
        release() {},
      };
    },
  };
  const capture = createSajuA4AuthenticatedCaptureCompositionV1({
    claimPool,
    sourceReceiptPool,
    myeonghaPrivateOrigin: 'https://myeongha-private.example.test',
    myeonghaServiceBearer: 'private-myeongha-test-bearer-for-a4-source',
    trustedMyeonghaIssuer: 'myeongha-production',
    myeonghaProofAudience: 'saju-production-a4',
    trustedMyeonghaKeyId: 'mh-a4-prepared-v1',
    myeonghaSigningKey: MH_KEY,
    sourceIssuer: 'saju-production',
    sourceAudience: 'myeongha-admin-a4',
    sourceKeyId: 'saju-proof-source-key',
    sourceSigningKey: SOURCE_KEY,
    nowMs: () => NOW,
    sourceRefFactory: () => SOURCE.slice('saju_source_'.length),
    fetchImpl: async () => Response.json(proof()),
  });
  async function invoke(callbacks: boolean): Promise<string> {
    return capture.withPreparedAttempt({ executionAttemptId: ATTEMPT }, async (ref) => {
      events.push('execute');
      expect(ref).toBe(SOURCE);
      if (callbacks) {
        await capture.onProviderCall({
          callId: CALL,
          requestId: 'saju_request_test',
          providerKey: 'openai',
          modelKey: 'gpt-5.6',
          source: 'provider_response_usage',
          outcome: 'response_received',
          observedAt: new Date(NOW - 1000).toISOString(),
          usage: {
            inputTokens: 100,
            outputTokens: 20,
            cachedInputTokens: null,
            reasoningTokens: null,
          },
        });
      }
      return 'protected output';
    });
  }
  return { invoke, events, receipts, coverage, claims };
}

describe('A4 Source callback census gate before successful Production Reading response', () => {
  it('admits a return only after genuine signed receipt and callback coverage match', async () => {
    const x = setup();
    await expect(x.invoke(true)).resolves.toBe('protected output');
    expect(x.claims.size).toBe(1);
    expect(x.receipts.size).toBe(1);
    expect(JSON.parse(x.coverage.get(ATTEMPT)!)).toMatchObject({
      observedCallbacks: 1,
      acknowledgedReceipts: 1,
      failedCallbacks: 0,
      pendingCallbacks: 0,
      completeCostCoverage: false,
    });
  });
  it('rejects a successful result with zero observed provider calls', async () => {
    const x = setup();
    await expect(x.invoke(false)).rejects.toThrow('local callback evidence incomplete');
    expect(x.receipts.size).toBe(0);
    expect(x.events).toEqual(['execute']);
  });
  it('rejects lost or altered signed Source receipts before returning Product Reading', async () => {
    for (const options of [
      { lostReceipt: true },
      { invalidReceipt: true },
      { missingCoverage: true },
    ]) {
      const x = setup(options);
      await expect(x.invoke(true)).rejects.toThrow('local callback evidence incomplete');
      expect(x.claims.size).toBe(1);
    }
  });
  it('never permits a second attempt from the same signed DB admission', async () => {
    const x = setup();
    await x.invoke(true);
    await expect(x.invoke(true)).rejects.toThrow('single-use DB attempt admission required');
    expect(x.events).toEqual(['execute']);
  });
});
