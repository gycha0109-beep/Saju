import { describe, expect, it } from 'vitest';
import { createPostgresSajuA4DispatchReceiptAuditV1 } from '../src/production/reading-ai-a4-dispatch-receipt-audit-v1.js';
import type { SajuA4ReceiptDatabasePoolV1 } from '../src/production/reading-ai-provider-receipt-postgres-v1.js';

const ATTEMPT = '123e4567-e89b-42d3-a456-426614174002';
const CALL = '123e4567-e89b-42d3-a456-426614174005';
const REF = 'saju_source_123e4567-e89b-42d3-a456-426614174004';
const intent = {
  callId: CALL,
  requestId: 'canonical-private-request',
  providerKey: 'openai',
  modelKey: 'gpt-5.6',
  preparedAt: '2026-11-12T02:00:00.000Z',
};
function proof(source: 'provider_response_usage' | 'provider_attempt_without_usage' = 'provider_response_usage') {
  return JSON.stringify({
    payload: {
      link: {
        executionAttemptId: ATTEMPT,
        externalRequestRef: REF,
        observation: {
          callId: CALL,
          requestId: intent.requestId,
          providerKey: 'openai',
          modelKey: intent.modelKey,
          source,
        },
      },
    },
  });
}
function fixture(opts: {
  intentRows?: readonly Record<string, unknown>[];
  receiptRows?: readonly Record<string, unknown>[];
  principal?: string;
  readFails?: boolean;
} = {}) {
  const queries: string[] = [];
  const intents = opts.intentRows ?? [{
    callId: CALL,
    executionAttemptId: ATTEMPT,
    externalRequestRef: REF,
    intentJson: JSON.stringify(intent),
  }];
  const receipts = opts.receiptRows ?? [{ callId: CALL, proofJson: proof() }];
  const pool: SajuA4ReceiptDatabasePoolV1 = {
    async connect() {
      return {
        async query<T>(sql: string) {
          queries.push(sql);
          let rows: unknown[] = [];
          if (sql.includes('current_user::text')) {
            rows = [{ currentUser: opts.principal ?? 'saju_a4_provider_receipt_writer_v1' }];
          } else if (sql.includes('FROM saju_source_ops.a4_provider_dispatch_intents_v1')) {
            if (opts.readFails) throw Error('source database unavailable');
            rows = [...intents];
          } else if (sql.includes('FROM saju_source_ops.a4_provider_call_signed_receipts_v1')) {
            rows = [...receipts];
          }
          return { rows: rows as T[] };
        },
        release() {},
      };
    },
  };
  return { audit: createPostgresSajuA4DispatchReceiptAuditV1(pool), queries };
}

describe('A4 offline persisted dispatch intent versus signed source receipt correlation', () => {
  it('matches the same attempt/ref/call/model/request without declaring invoice completeness', async () => {
    const x = fixture();
    await expect(x.audit.inspectAttempt(ATTEMPT)).resolves.toMatchObject({
      status: 'matched_with_provider_usage_unverified',
      intentCount: 1,
      signedReceiptCount: 1,
      providerUsageReceipts: 1,
      unknownUsageReceipts: 0,
      completeCostCoverage: false,
    });
    expect(x.queries[0]).toBe('BEGIN READ ONLY');
    expect(x.queries.at(-1)).toBe('COMMIT');
  });

  it('keeps receipt with missing usage distinct from free or zero-cost evidence', async () => {
    const x = fixture({
      receiptRows: [{ callId: CALL, proofJson: proof('provider_attempt_without_usage') }],
    });
    await expect(x.audit.inspectAttempt(ATTEMPT)).resolves.toMatchObject({
      status: 'matched_with_usage_unknown_unverified',
      unknownUsageReceipts: 1,
      completeCostCoverage: false,
    });
  });

  it.each([
    [{ intentRows: [] }, 'receipt_without_intent'],
    [{ receiptRows: [] }, 'intent_without_receipt'],
    [{ intentRows: [], receiptRows: [] }, 'no_local_evidence'],
    [{
      intentRows: [{
        callId: CALL,
        executionAttemptId: ATTEMPT,
        externalRequestRef: REF,
        intentJson: JSON.stringify({ ...intent, modelKey: 'wrong-model' }),
      }],
    }, 'call_binding_mismatch'],
    [{
      intentRows: [{
        callId: CALL,
        executionAttemptId: ATTEMPT,
        externalRequestRef: REF,
        intentJson: '{broken-json',
      }],
    }, 'invalid_source_evidence'],
  ] as const)('distinguishes missing, conflicting or invalid evidence: %s', async (options, status) => {
    const x = fixture({ ...options });
    await expect(x.audit.inspectAttempt(ATTEMPT)).resolves.toMatchObject({
      status,
      completeCostCoverage: false,
    });
  });

  it('holds truncated source census instead of assuming complete coverage', async () => {
    const x = fixture({
      intentRows: Array.from({ length: 501 }, () => ({
        callId: CALL,
        executionAttemptId: ATTEMPT,
        externalRequestRef: REF,
        intentJson: JSON.stringify(intent),
      })),
    });
    await expect(x.audit.inspectAttempt(ATTEMPT)).resolves.toMatchObject({
      status: 'census_truncated',
      intentCount: null,
      completeCostCoverage: false,
    });
  });

  it('rejects incorrect DB principal and a Source read outage', async () => {
    const wrong = fixture({ principal: 'saju_a4_provider_receipt_reader_v1' });
    await expect(wrong.audit.inspectAttempt(ATTEMPT)).rejects.toThrow('Writer required');
    expect(wrong.queries.at(-1)).toBe('ROLLBACK');
    expect(wrong.queries.some((sql) => sql.includes('FROM saju_source_ops.'))).toBe(false);
    const outage = fixture({ readFails: true });
    await expect(outage.audit.inspectAttempt(ATTEMPT)).rejects.toThrow('database unavailable');
    expect(outage.queries.at(-1)).toBe('ROLLBACK');
  });
});
