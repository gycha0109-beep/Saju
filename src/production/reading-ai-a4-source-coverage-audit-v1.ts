import { createHmac, timingSafeEqual } from 'node:crypto';
import {
  SAJU_A4_RECEIPT_WRITER_ROLE_V1,
  type SajuA4ReceiptDatabasePoolV1,
} from './reading-ai-provider-receipt-postgres-v1.js';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u;
const SOURCE_REF =
  /^saju_source_[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u;
const COVERAGE_FIELDS = [
  'version',
  'executionAttemptId',
  'externalRequestRef',
  'observedCallbacks',
  'acknowledgedReceipts',
  'failedCallbacks',
  'pendingCallbacks',
  'execution',
  'completeCostCoverage',
];
const READ_COVERAGE = [
  'SELECT external_request_ref AS "externalRequestRef",',
  'coverage::text AS "coverageJson"',
  'FROM saju_source_ops.a4_provider_call_coverage_v1',
  'WHERE execution_attempt_id = $1::uuid LIMIT 2',
].join('\n');
const READ_PROOFS = [
  'SELECT call_id::text AS "callId", proof::text AS "proofJson"',
  'FROM saju_source_ops.a4_provider_call_signed_receipts_v1',
  "WHERE proof #>> '{payload,link,executionAttemptId}' = $1::text",
  'ORDER BY call_id LIMIT 501',
].join('\n');
const DOMAIN = 'myeongha/a4/saju-provider-call-proof/v1\0';

type AuditStatus =
  | 'coverage_missing'
  | 'evidence_invalid'
  | 'receipt_census_truncated'
  | 'stored_receipt_gap'
  | 'observed_callback_gap'
  | 'observed_storage_consistent_unverified';

export interface SajuA4SourceCoverageAuditResultV1 {
  readonly version: 'saju-a4-source-coverage-audit-v1';
  readonly executionAttemptId: string;
  readonly status: AuditStatus;
  readonly storedSignedReceipts: number | null;
  readonly acknowledgedReceipts: number | null;
  readonly failedCallbacks: number | null;
  readonly pendingCallbacks: number | null;
  /** Local Saju receipts do not establish the full upstream API call census. */
  readonly completeCostCoverage: false;
}

function record(raw: unknown): Record<string, unknown> | null {
  return raw !== null && typeof raw === 'object' && !Array.isArray(raw)
    ? (raw as Record<string, unknown>)
    : null;
}
function exact(raw: Record<string, unknown> | null, fields: readonly string[]): boolean {
  return (
    raw !== null &&
    Object.keys(raw).length === fields.length &&
    fields.every((key) => Object.hasOwn(raw, key))
  );
}
function counter(raw: unknown): raw is number {
  return typeof raw === 'number' && Number.isSafeInteger(raw) && raw >= 0;
}
function canonical(raw: unknown): unknown {
  if (Array.isArray(raw)) return raw.map(canonical);
  const item = record(raw);
  if (!item) return raw;
  return Object.fromEntries(
    Object.keys(item)
      .sort()
      .map((key) => [key, canonical(item[key])]),
  );
}
function parseCoverage(
  raw: string,
  executionAttemptId: string,
  sourceRef: string,
): Readonly<{
  acknowledgedReceipts: number;
  failedCallbacks: number;
  pendingCallbacks: number;
}> | null {
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }
  const c = record(value);
  if (
    !exact(c, COVERAGE_FIELDS) ||
    c!.version !== 'saju-provider-call-observer-coverage-v1' ||
    c!.executionAttemptId !== executionAttemptId ||
    c!.externalRequestRef !== sourceRef ||
    !SOURCE_REF.test(sourceRef) ||
    (c!.execution !== 'returned' && c!.execution !== 'threw') ||
    c!.completeCostCoverage !== false ||
    !counter(c!.observedCallbacks) ||
    !counter(c!.acknowledgedReceipts) ||
    !counter(c!.failedCallbacks) ||
    !counter(c!.pendingCallbacks) ||
    c!.observedCallbacks !== c!.acknowledgedReceipts + c!.failedCallbacks + c!.pendingCallbacks
  )
    return null;
  return {
    acknowledgedReceipts: c!.acknowledgedReceipts,
    failedCallbacks: c!.failedCallbacks,
    pendingCallbacks: c!.pendingCallbacks,
  };
}
function validProof(
  raw: unknown,
  callId: string,
  attempt: string,
  ref: string,
  input: Readonly<{ issuer: string; audience: string; keyId: string; keyBytes: Uint8Array }>,
): boolean {
  const envelope = record(raw);
  if (!exact(envelope, ['payload', 'signatureHex'])) return false;
  const payload = record(envelope!.payload);
  const link = record(payload?.link);
  const obs = record(link?.observation);
  const usage = record(obs?.usage);
  if (
    !exact(payload, ['version', 'issuer', 'audience', 'keyId', 'issuedAtMs', 'link']) ||
    !exact(link, ['version', 'externalRequestRef', 'executionAttemptId', 'observation']) ||
    !exact(obs, [
      'callId',
      'requestId',
      'providerKey',
      'modelKey',
      'source',
      'outcome',
      'observedAt',
      'usage',
    ]) ||
    !exact(usage, ['inputTokens', 'outputTokens', 'cachedInputTokens', 'reasoningTokens']) ||
    payload!.version !== 'saju-provider-call-source-proof-v1' ||
    payload!.issuer !== input.issuer ||
    payload!.audience !== input.audience ||
    payload!.keyId !== input.keyId ||
    link!.version !== 'saju-source-provider-call-link-v1' ||
    link!.executionAttemptId !== attempt ||
    link!.externalRequestRef !== ref ||
    obs!.callId !== callId ||
    !UUID.test(callId) ||
    typeof envelope!.signatureHex !== 'string' ||
    !/^[a-f0-9]{64}$/u.test(envelope!.signatureHex)
  )
    return false;
  // The canonical source signer uses exactly this domain and sorted-key payload.
  const expected = createHmac('sha256', input.keyBytes)
    .update(DOMAIN)
    .update(JSON.stringify(canonical(payload)))
    .digest();
  return timingSafeEqual(expected, Buffer.from(envelope!.signatureHex, 'hex'));
}

/**
 * A4 offline, per-attempt immutable storage reconciliation. This compares
 * retained signed Source receipts against the independently stored callback
 * acknowledgement report. It can identify missing/extra/corrupt source rows,
 * but MUST NOT certify provider-wide usage, invoices, KRW totals or budgets.
 *
 * Uses the already-defined dedicated Saju Source Writer SELECT grants only.
 * There is no administrative, public HTTP, client, billing or DB mutation path.
 */
export function createPostgresSajuA4SourceCoverageAuditV1(
  input: Readonly<{
    pool: SajuA4ReceiptDatabasePoolV1;
    issuer: string;
    audience: string;
    keyId: string;
    keyBytes: Uint8Array;
  }>,
): Readonly<{ inspectAttempt(attemptId: string): Promise<SajuA4SourceCoverageAuditResultV1> }> {
  if (
    !input ||
    typeof input.pool?.connect !== 'function' ||
    !(input.keyBytes instanceof Uint8Array) ||
    input.keyBytes.byteLength < 32 ||
    ![input.issuer, input.audience, input.keyId].every(
      (v) => typeof v === 'string' && /^[a-zA-Z0-9._:-]{3,128}$/u.test(v),
    )
  )
    throw new TypeError('Dedicated A4 source writer and trusted signer configuration required');

  return Object.freeze({
    async inspectAttempt(attemptId: string) {
      if (typeof attemptId !== 'string' || !UUID.test(attemptId))
        throw new TypeError('Exact server-selected A4 execution attempt UUID required');
      const client = await input.pool.connect();
      let begun = false;
      let discard: unknown;
      try {
        await client.query('BEGIN READ ONLY');
        begun = true;
        const role = await client.query<{ currentUser: unknown }>(
          'SELECT current_user::text AS "currentUser"',
        );
        if (role.rows.length !== 1 || role.rows[0]?.currentUser !== SAJU_A4_RECEIPT_WRITER_ROLE_V1)
          throw new Error('Dedicated Saju source coverage writer principal required');

        const coverage = await client.query<{ coverageJson: unknown; externalRequestRef: unknown }>(
          READ_COVERAGE,
          [attemptId],
        );
        const receipts = await client.query<{ callId: unknown; proofJson: unknown }>(READ_PROOFS, [
          attemptId,
        ]);
        let status: AuditStatus = 'coverage_missing';
        const storedSignedReceipts: number | null =
          receipts.rows.length > 500 ? null : receipts.rows.length;
        let acknowledgedReceipts: number | null = null;
        let failedCallbacks: number | null = null;
        let pendingCallbacks: number | null = null;

        if (coverage.rows.length > 1) {
          status = 'evidence_invalid';
        } else if (coverage.rows.length === 1) {
          const row = coverage.rows[0]!;
          const expected =
            typeof row.externalRequestRef === 'string' && typeof row.coverageJson === 'string'
              ? parseCoverage(row.coverageJson, attemptId, row.externalRequestRef)
              : null;
          if (!expected) {
            status = 'evidence_invalid';
          } else {
            acknowledgedReceipts = expected.acknowledgedReceipts;
            failedCallbacks = expected.failedCallbacks;
            pendingCallbacks = expected.pendingCallbacks;
            if (storedSignedReceipts === null) {
              status = 'receipt_census_truncated';
            } else {
              let proofsValid = true;
              for (const receipt of receipts.rows) {
                if (typeof receipt.callId !== 'string' || typeof receipt.proofJson !== 'string') {
                  proofsValid = false;
                  break;
                }
                try {
                  const proof: unknown = JSON.parse(receipt.proofJson);
                  if (
                    !validProof(
                      proof,
                      receipt.callId,
                      attemptId,
                      row.externalRequestRef as string,
                      input,
                    )
                  ) {
                    proofsValid = false;
                    break;
                  }
                } catch {
                  proofsValid = false;
                  break;
                }
              }
              status = !proofsValid
                ? 'evidence_invalid'
                : storedSignedReceipts !== acknowledgedReceipts
                  ? 'stored_receipt_gap'
                  : failedCallbacks > 0 || pendingCallbacks > 0
                    ? 'observed_callback_gap'
                    : 'observed_storage_consistent_unverified';
            }
          }
        }
        const result: SajuA4SourceCoverageAuditResultV1 = Object.freeze({
          version: 'saju-a4-source-coverage-audit-v1',
          executionAttemptId: attemptId,
          status,
          storedSignedReceipts,
          acknowledgedReceipts,
          failedCallbacks,
          pendingCallbacks,
          completeCostCoverage: false,
        });
        await client.query('COMMIT');
        begun = false;
        return result;
      } catch (error) {
        if (begun) {
          try {
            await client.query('ROLLBACK');
          } catch (rollbackError) {
            discard = rollbackError;
            throw new AggregateError(
              [error, rollbackError],
              'A4 source coverage audit failed and rollback failed',
              { cause: rollbackError },
            );
          }
        }
        throw error;
      } finally {
        client.release(discard);
      }
    },
  });
}
