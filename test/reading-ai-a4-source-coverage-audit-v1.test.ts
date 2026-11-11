import { describe, expect, it } from 'vitest';
import { issueSajuProviderCallSourceProofV1 } from '../src/production/reading-ai-provider-call-source-proof-v1.js';
import { createPostgresSajuA4SourceCoverageAuditV1 } from '../src/production/reading-ai-a4-source-coverage-audit-v1.js';
import {
  SAJU_A4_RECEIPT_WRITER_ROLE_V1,
  type SajuA4ReceiptDatabasePoolV1,
  type SajuA4ReceiptDatabaseClientV1,
} from '../src/production/reading-ai-provider-receipt-postgres-v1.js';

const ATTEMPT = '123e4567-e89b-42d3-a456-426614174002';
const REF = 'saju_source_123e4567-e89b-42d3-a456-426614174004';
const CALL1 = '123e4567-e89b-42d3-a456-426614174003';
const CALL2 = '123e4567-e89b-42d3-a456-426614174005';
const KEY = new Uint8Array(32).fill(77);
const SIGNER = {
  issuer: 'saju-production',
  audience: 'myeongha-admin-a4',
  keyId: 'source-a4-key-1',
  keyBytes: KEY,
};
const TIME = '2026-11-10T04:00:00.000Z';
const report = (ack: number, fail = 0, pending = 0) => ({
  version: 'saju-provider-call-observer-coverage-v1',
  executionAttemptId: ATTEMPT,
  externalRequestRef: REF,
  observedCallbacks: ack + fail + pending,
  acknowledgedReceipts: ack,
  failedCallbacks: fail,
  pendingCallbacks: pending,
  execution: 'returned',
  completeCostCoverage: false,
});

function receipt(id: string) {
  return issueSajuProviderCallSourceProofV1({
    ...SIGNER,
    issuedAtMs: Date.parse(TIME) + 1000,
    link: {
      version: 'saju-source-provider-call-link-v1',
      executionAttemptId: ATTEMPT,
      externalRequestRef: REF,
      observation: {
        callId: id,
        requestId: 'saju-generated-request',
        providerKey: 'openai',
        modelKey: 'gpt-5.6',
        source: 'provider_response_usage',
        outcome: 'response_received',
        observedAt: TIME,
        usage: {
          inputTokens: 75,
          outputTokens: 15,
          cachedInputTokens: null,
          reasoningTokens: null,
        },
      },
    },
  });
}

function fixture(
  options: {
    coverage?: unknown;
    proofs?: readonly unknown[];
    role?: string;
    readError?: boolean;
    commitError?: boolean;
  } = {},
) {
  const statements: string[] = [];
  const releases: unknown[] = [];
  let connections = 0;
  const pool: SajuA4ReceiptDatabasePoolV1 = {
    async connect(): Promise<SajuA4ReceiptDatabaseClientV1> {
      connections++;
      return {
        async query<Row>(sql: string) {
          statements.push(sql);
          let rows: unknown[] = [];
          if (sql.includes('current_user::text')) {
            rows = [{ currentUser: options.role ?? SAJU_A4_RECEIPT_WRITER_ROLE_V1 }];
          } else if (sql.includes('FROM saju_source_ops.a4_provider_call_coverage_v1')) {
            if (options.readError) throw Error('Source DB unavailable');
            const value = options.coverage === undefined ? report(1) : options.coverage;
            if (value !== null)
              rows = [{ externalRequestRef: REF, coverageJson: JSON.stringify(value) }];
          } else if (sql.includes('FROM saju_source_ops.a4_provider_call_signed_receipts_v1')) {
            for (const [index, proof] of (options.proofs ?? [receipt(CALL1)]).entries()) {
              rows.push({
                callId: index === 0 ? CALL1 : index === 1 ? CALL2 : CALL1,
                proofJson: JSON.stringify(proof),
              });
            }
          } else if (sql === 'COMMIT' && options.commitError) {
            throw Error('Uncertain read transaction completion');
          }
          return { rows: rows as Row[] };
        },
        release(error?: unknown) {
          releases.push(error);
        },
      };
    },
  };
  const audit = createPostgresSajuA4SourceCoverageAuditV1({ pool, ...SIGNER });
  return {
    audit,
    statements,
    releases,
    get connections() {
      return connections;
    },
  };
}

describe('Offline A4 Source signed receipt and callback audit', () => {
  it('confirms only local acknowledged receipt storage, never provider-wide cost coverage', async () => {
    const x = fixture();
    const result = await x.audit.inspectAttempt(ATTEMPT);
    expect(result).toEqual({
      version: 'saju-a4-source-coverage-audit-v1',
      executionAttemptId: ATTEMPT,
      status: 'observed_storage_consistent_unverified',
      storedSignedReceipts: 1,
      acknowledgedReceipts: 1,
      failedCallbacks: 0,
      pendingCallbacks: 0,
      completeCostCoverage: false,
    });
    expect(x.statements[0]).toBe('BEGIN READ ONLY');
    expect(x.statements.at(-1)).toBe('COMMIT');
    expect(x.statements.every((s) => !s.includes('INSERT INTO') && !s.includes('UPDATE '))).toBe(
      true,
    );
    expect(x.releases).toHaveLength(1);
  });

  it('detects both missing signed receipts and extra unacknowledged receipts', async () => {
    const missing = fixture({ proofs: [], coverage: report(1) });
    expect(await missing.audit.inspectAttempt(ATTEMPT)).toMatchObject({
      status: 'stored_receipt_gap',
      storedSignedReceipts: 0,
      acknowledgedReceipts: 1,
      completeCostCoverage: false,
    });
    const extra = fixture({ proofs: [receipt(CALL1), receipt(CALL2)] });
    expect(await extra.audit.inspectAttempt(ATTEMPT)).toMatchObject({
      status: 'stored_receipt_gap',
      storedSignedReceipts: 2,
      acknowledgedReceipts: 1,
      completeCostCoverage: false,
    });
  });

  it('preserves a recorded callback failure instead of treating successful storage as complete', async () => {
    const x = fixture({ coverage: report(1, 1) });
    expect(await x.audit.inspectAttempt(ATTEMPT)).toMatchObject({
      status: 'observed_callback_gap',
      storedSignedReceipts: 1,
      acknowledgedReceipts: 1,
      failedCallbacks: 1,
      completeCostCoverage: false,
    });
  });

  it('does not infer zero cost from a missing report even if a signed receipt exists', async () => {
    const x = fixture({ coverage: null });
    expect(await x.audit.inspectAttempt(ATTEMPT)).toMatchObject({
      status: 'coverage_missing',
      storedSignedReceipts: 1,
      acknowledgedReceipts: null,
      completeCostCoverage: false,
    });
  });

  it('rejects signed receipt tampering and malformed callback reports', async () => {
    const clean = receipt(CALL1);
    const bad = {
      ...clean,
      payload: {
        ...clean.payload,
        link: {
          ...clean.payload.link,
          observation: {
            ...clean.payload.link.observation,
            usage: { ...clean.payload.link.observation.usage, inputTokens: 600 },
          },
        },
      },
    };
    for (const opts of [
      { proofs: [bad] },
      { proofs: [{ ...clean, signatureHex: '0'.repeat(64) }] },
      { coverage: { ...report(1), completeCostCoverage: true } },
      { coverage: { ...report(1), pendingCallbacks: -1 } },
      { coverage: { ...report(1), externalRequestRef: 'fake-source-ref' } },
    ]) {
      const x = fixture(opts);
      expect(await x.audit.inspectAttempt(ATTEMPT)).toMatchObject({
        status: 'evidence_invalid',
        completeCostCoverage: false,
      });
    }
  });

  it('refuses oversized source-census scans rather than declaring apparent completeness', async () => {
    const proofs = Array.from({ length: 501 }, () => receipt(CALL1));
    const x = fixture({ proofs });
    expect(await x.audit.inspectAttempt(ATTEMPT)).toMatchObject({
      status: 'receipt_census_truncated',
      storedSignedReceipts: null,
      completeCostCoverage: false,
    });
  });

  it('blocks wrong writer role, DB read errors and uncertain COMMIT', async () => {
    for (const opts of [
      { role: 'saju_a4_provider_receipt_reader_v1' },
      { role: 'postgres' },
      { readError: true },
      { commitError: true },
    ]) {
      const x = fixture(opts);
      await expect(x.audit.inspectAttempt(ATTEMPT)).rejects.toThrow();
      expect(x.statements).toContain('ROLLBACK');
      expect(x.releases).toHaveLength(1);
    }
  });

  it('rejects caller-chosen malformed attempt IDs before opening Source DB', async () => {
    const x = fixture();
    for (const id of ['user-value', ATTEMPT + ';', '', 'a'.repeat(800)]) {
      await expect(x.audit.inspectAttempt(id)).rejects.toThrow('Exact server-selected');
    }
    expect(x.connections).toBe(0);
  });
});
