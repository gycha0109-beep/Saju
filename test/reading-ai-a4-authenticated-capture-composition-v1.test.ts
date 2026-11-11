import { createHmac } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import type { SajuA4ReceiptDatabasePoolV1 } from '../src/production/reading-ai-provider-receipt-postgres-v1.js';
import { createSajuA4AuthenticatedCaptureCompositionV1 } from '../src/production/reading-ai-a4-authenticated-capture-composition-v1.js';

const ATTEMPT = '123e4567-e89b-42d3-a456-426614174002';
const REF_UUID = '123e4567-e89b-42d3-a456-426614174004';
const NOW = Date.parse('2026-11-11T01:00:00.000Z');
const MH_KEY = new Uint8Array(32).fill(31);
const SOURCE_KEY = new Uint8Array(32).fill(93);
const PROOF_PAYLOAD = {
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
function canonical(raw: unknown): unknown {
  if (Array.isArray(raw)) return raw.map(canonical);
  if (!raw || typeof raw !== 'object') return raw;
  const x = raw as Record<string, unknown>;
  return Object.fromEntries(
    Object.keys(x)
      .sort()
      .map((k) => [k, canonical(x[k])]),
  );
}
function proof() {
  return {
    payload: PROOF_PAYLOAD,
    signatureHex: createHmac('sha256', MH_KEY)
      .update('myeongha/a4/prepared-attempt-proof/v1\0')
      .update(JSON.stringify(canonical(PROOF_PAYLOAD)))
      .digest('hex'),
  };
}

function fixture(
  options: { badSignature?: boolean; missingProof?: boolean; httpFailure?: boolean } = {},
) {
  const claims = new Set<string>();
  const coverages = new Map<string, string>();
  const events: string[] = [];
  const claimPool: SajuA4ReceiptDatabasePoolV1 = {
    async connect() {
      events.push('claim db connect');
      return {
        async query<R>(sql: string, args: readonly unknown[] = []) {
          let rows: unknown[] = [];
          if (sql.includes('current_user::text'))
            rows = [{ currentUser: 'saju_a4_prepared_attempt_claim_writer_v1' }];
          else if (sql.startsWith('INSERT INTO saju_source_ops.a4_prepared_attempt_claims_v1')) {
            const id = String(args[0]);
            if (!claims.has(id)) {
              claims.add(id);
              rows = [{ executionAttemptId: id }];
              events.push('source single-use admitted');
            }
          }
          return { rows: rows as R[] };
        },
        release() {},
      };
    },
  };
  const receiptPool: SajuA4ReceiptDatabasePoolV1 = {
    async connect() {
      events.push('source receipt db connect');
      return {
        async query<R>(sql: string, args: readonly unknown[] = []) {
          let rows: unknown[] = [];
          if (sql.includes('current_user::text'))
            rows = [{ currentUser: 'saju_a4_provider_receipt_writer_v1' }];
          else if (sql.startsWith('INSERT INTO saju_source_ops.a4_provider_call_coverage_v1'))
            coverages.set(String(args[0]), String(args[2]));
          else if (sql.startsWith('SELECT coverage::text')) {
            const json = coverages.get(String(args[0]));
            if (json) rows = [{ coverageJson: json }];
          }
          return { rows: rows as R[] };
        },
        release() {},
      };
    },
  };
  const composition = createSajuA4AuthenticatedCaptureCompositionV1({
    claimPool,
    sourceReceiptPool: receiptPool,
    myeonghaPrivateOrigin: 'https://myeongha-private.example.test',
    myeonghaServiceBearer: 'dedicated-test-myeongha-a4-proof-service-bearer',
    trustedMyeonghaIssuer: 'myeongha-production',
    myeonghaProofAudience: 'saju-production-a4',
    trustedMyeonghaKeyId: 'mh-a4-prepared-v1',
    myeonghaSigningKey: MH_KEY,
    sourceIssuer: 'saju-production',
    sourceAudience: 'myeongha-admin-a4',
    sourceKeyId: 'saju-proof-source-key',
    sourceSigningKey: SOURCE_KEY,
    nowMs: () => NOW,
    sourceRefFactory: () => REF_UUID,
    fetchImpl: async () => {
      events.push('authenticated MyeongHa proof fetch');
      if (options.httpFailure) return new Response(null, { status: 503 });
      if (options.missingProof) return new Response(null, { status: 404 });
      const signed = proof();
      return Response.json(
        options.badSignature ? { ...signed, signatureHex: '0'.repeat(64) } : signed,
      );
    },
  });
  return { composition, events, claims, coverages };
}

describe('A4 source private HTTPS proof => HMAC => one-use claim => provider capture', () => {
  it('admits a single exact signed DB-prepared attempt before creating signed source coverage', async () => {
    const x = fixture();
    const results: string[] = [];
    const output = await x.composition.withPreparedAttempt(
      { executionAttemptId: ATTEMPT },
      async (ref) => {
        results.push(ref);
        return 'protected output';
      },
    );
    expect(output).toBe('protected output');
    expect(results).toEqual(['saju_source_' + REF_UUID]);
    expect(x.events).toEqual([
      'authenticated MyeongHa proof fetch',
      'claim db connect',
      'source single-use admitted',
      'source receipt db connect',
    ]);
    expect(JSON.parse(x.coverages.get(ATTEMPT)!)).toMatchObject({
      observedCallbacks: 0,
      acknowledgedReceipts: 0,
      completeCostCoverage: false,
      execution: 'returned',
    });
  });

  it('blocks replay before source callback or any second provider execution', async () => {
    const x = fixture();
    let executions = 0;
    const exec = async () => {
      executions++;
      return 'done';
    };
    await x.composition.withPreparedAttempt({ executionAttemptId: ATTEMPT }, exec);
    await expect(
      x.composition.withPreparedAttempt({ executionAttemptId: ATTEMPT }, exec),
    ).rejects.toThrow('single-use DB attempt admission required');
    expect(executions).toBe(1);
    expect(x.coverages.size).toBe(1);
  });

  it('blocks tampered HMAC, missing signed proof and private service errors before DB claim', async () => {
    for (const option of [{ badSignature: true }, { missingProof: true }, { httpFailure: true }]) {
      const x = fixture(option);
      await expect(
        x.composition.withPreparedAttempt(
          { executionAttemptId: ATTEMPT },
          async () => 'must not reach',
        ),
      ).rejects.toThrow();
      expect(x.claims.size).toBe(0);
      expect(x.coverages.size).toBe(0);
    }
  });

  it('rejects shared claim/receipt pools and reused signer secrets', () => {
    const x = fixture();
    expect(x.composition).toBeDefined();
    const samePool: SajuA4ReceiptDatabasePoolV1 = {
      connect: async () => {
        throw Error('must never connect');
      },
    };
    const shared = {
      claimPool: samePool,
      sourceReceiptPool: samePool,
      myeonghaPrivateOrigin: 'https://private.example.test',
      myeonghaServiceBearer: 'dedicated-test-myeongha-a4-proof-service-bearer',
      trustedMyeonghaIssuer: 'myeongha-production',
      myeonghaProofAudience: 'saju-production-a4',
      trustedMyeonghaKeyId: 'mh-a4-prepared-v1',
      myeonghaSigningKey: MH_KEY,
      sourceIssuer: 'saju-production',
      sourceAudience: 'myeongha-admin-a4',
      sourceKeyId: 'saju-proof-source-key',
      sourceSigningKey: SOURCE_KEY,
      nowMs: () => NOW,
    };
    expect(() => createSajuA4AuthenticatedCaptureCompositionV1(shared)).toThrow(
      'Independent Saju claim/receipt',
    );
    expect(() =>
      createSajuA4AuthenticatedCaptureCompositionV1({
        ...shared,
        sourceReceiptPool: { ...samePool },
        sourceSigningKey: MH_KEY,
      }),
    ).toThrow('Independent Saju claim/receipt');
  });
});
