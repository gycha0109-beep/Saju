import type { SajuSignedProviderCallSourceProofV1 } from './reading-ai-provider-call-source-proof-v1.js';
import type { SajuImmutableProviderReceiptStoreV1 } from './reading-ai-signed-provider-receipt-emitter-v1.js';

export const SAJU_A4_RECEIPT_WRITER_ROLE_V1 = 'saju_a4_provider_receipt_writer_v1';
export const SAJU_A4_RECEIPT_READER_ROLE_V1 = 'saju_a4_provider_receipt_reader_v1';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u;
const HEX = /^[0-9a-f]{64}$/u;
const RECEIPT_SIZE_LIMIT = 8192;
const CHECK_ROLE = 'SELECT current_user::text AS "currentUser"';
const APPEND = `
INSERT INTO saju_source_ops.a4_provider_call_signed_receipts_v1 (call_id, proof)
VALUES ($1::uuid, $2::jsonb)
ON CONFLICT (call_id) DO NOTHING
`.trim();
const READ = `
SELECT proof::text AS "proofJson"
FROM saju_source_ops.a4_provider_call_signed_receipts_v1
WHERE call_id = $1::uuid
LIMIT 2
`.trim();

interface QueryResult<Row> {
  readonly rows: readonly Row[];
}
export interface SajuA4ReceiptDatabaseClientV1 {
  query<Row = unknown>(sql: string, values?: readonly unknown[]): Promise<QueryResult<Row>>;
  release(discard?: unknown): void;
}
export interface SajuA4ReceiptDatabasePoolV1 {
  connect(): Promise<SajuA4ReceiptDatabaseClientV1>;
}
interface RoleRow {
  currentUser: unknown;
}
interface ProofRow {
  proofJson: unknown;
}

function strictCallId(value: unknown): value is string {
  return typeof value === 'string' && UUID.test(value);
}

function exactKeys(value: unknown, names: readonly string[]): boolean {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const actual = Object.keys(value);
  return (
    actual.length === names.length &&
    names.every((name) => Object.prototype.hasOwnProperty.call(value, name))
  );
}

function safeProofJson(proof: unknown, callId: string): string {
  if (!proof || typeof proof !== 'object' || Array.isArray(proof))
    throw Error('Invalid source signed receipt envelope');
  const json = JSON.stringify(proof);
  if (!json || Buffer.byteLength(json, 'utf8') > RECEIPT_SIZE_LIMIT)
    throw Error('Signed source receipt exceeds the permitted evidence projection');
  const candidate = proof as SajuSignedProviderCallSourceProofV1;
  const payload = candidate.payload;
  const link = payload?.link;
  const observation = link?.observation;
  if (
    !exactKeys(candidate, ['payload', 'signatureHex']) ||
    !exactKeys(payload, ['version', 'issuer', 'audience', 'keyId', 'issuedAtMs', 'link']) ||
    !exactKeys(link, ['version', 'externalRequestRef', 'executionAttemptId', 'observation']) ||
    !exactKeys(observation, [
      'callId',
      'requestId',
      'providerKey',
      'modelKey',
      'source',
      'outcome',
      'observedAt',
      'usage',
    ]) ||
    !exactKeys(observation?.usage, [
      'inputTokens',
      'outputTokens',
      'cachedInputTokens',
      'reasoningTokens',
    ])
  )
    throw Error('Unexpected fields in signed source receipt projection');
  if (
    payload.version !== 'saju-provider-call-source-proof-v1' ||
    link.version !== 'saju-source-provider-call-link-v1' ||
    observation.callId !== callId ||
    typeof candidate.signatureHex !== 'string' ||
    !HEX.test(candidate.signatureHex)
  )
    throw Error('Signed source receipt does not match call ID');
  return json;
}

async function inReceiptTransaction<T>(
  pool: SajuA4ReceiptDatabasePoolV1,
  roleName: string,
  begin: string,
  operation: (client: SajuA4ReceiptDatabaseClientV1) => Promise<T>,
): Promise<T> {
  const client = await pool.connect();
  let active = false;
  let discard: unknown;
  try {
    await client.query(begin);
    active = true;
    const role = await client.query<RoleRow>(CHECK_ROLE);
    if (role.rows.length !== 1 || role.rows[0]?.currentUser !== roleName)
      throw Error('Dedicated Saju receipt role required');
    const result = await operation(client);
    await client.query('COMMIT');
    active = false;
    return result;
  } catch (error) {
    if (active) {
      try {
        await client.query('ROLLBACK');
      } catch (rollbackError) {
        discard = rollbackError;
        throw new AggregateError(
          [error, rollbackError],
          'Saju receipt transaction failed and rollback failed',
          { cause: rollbackError },
        );
      }
    }
    throw error;
  } finally {
    client.release(discard);
  }
}

function parseCommittedProof(
  result: QueryResult<ProofRow>,
): SajuSignedProviderCallSourceProofV1 | null {
  if (result.rows.length === 0) return null;
  if (result.rows.length !== 1 || typeof result.rows[0]?.proofJson !== 'string')
    throw Error('Untrusted Saju source receipt row');
  try {
    const parsed: unknown = JSON.parse(result.rows[0].proofJson);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed))
      throw Error('Invalid source receipt JSON');
    const callId = (parsed as SajuSignedProviderCallSourceProofV1).payload?.link?.observation
      ?.callId;
    if (!strictCallId(callId)) throw Error('Invalid stored receipt call ID');
    safeProofJson(parsed, callId);
    return parsed as SajuSignedProviderCallSourceProofV1;
  } catch (cause) {
    throw new Error('Untrusted Saju source receipt row', { cause });
  }
}

/**
 * PostgreSQL-backed, server-only append. The database enforces a unique callId
 * and prevents the dedicated writer from UPDATE/DELETE. An explicit second
 * statement reads the committed candidate in READ COMMITTED, including when
 * another transaction inserted the same callId concurrently. COMMIT must succeed
 * before the caller may acknowledge the receipt; the signed emitter re-verifies
 * the exact returned receipt and HMAC.
 */
export function createPostgresSajuImmutableProviderReceiptStoreV1(
  pool: SajuA4ReceiptDatabasePoolV1,
): SajuImmutableProviderReceiptStoreV1 {
  if (!pool || typeof pool.connect !== 'function')
    throw new TypeError('Dedicated Saju immutable receipt database pool required');
  return Object.freeze({
    async appendOnceAndRead({
      callId,
      proof,
    }: Parameters<SajuImmutableProviderReceiptStoreV1['appendOnceAndRead']>[0]) {
      if (!strictCallId(callId)) throw Error('Invalid Saju provider call ID');
      const json = safeProofJson(proof, callId);
      return inReceiptTransaction(
        pool,
        SAJU_A4_RECEIPT_WRITER_ROLE_V1,
        'BEGIN READ WRITE',
        async (client) => {
          await client.query('SET LOCAL synchronous_commit TO on');
          await client.query(APPEND, [callId, json]);
          const read = await client.query<ProofRow>(READ, [callId]);
          const committed = parseCommittedProof(read);
          if (!committed) throw Error('Source receipt was not persisted');
          return committed;
        },
      );
    },
  });
}

/**
 * Separate server-only least-privilege reader for a future authenticated
 * MyeongHa source-proof loader. Never expose it directly as an HTTP route.
 * Caller must independently verify the HMAC and exact observation.
 */
export function createPostgresSajuSignedProviderReceiptReaderV1(
  pool: SajuA4ReceiptDatabasePoolV1,
): Readonly<{ loadSignedCallById(callId: string): Promise<unknown> }> {
  if (!pool || typeof pool.connect !== 'function')
    throw new TypeError('Dedicated Saju source receipt reader database pool required');
  return Object.freeze({
    async loadSignedCallById(callId: string): Promise<unknown> {
      if (!strictCallId(callId)) return null;
      return inReceiptTransaction(
        pool,
        SAJU_A4_RECEIPT_READER_ROLE_V1,
        'BEGIN READ ONLY',
        async (client) => {
          const read = await client.query<ProofRow>(READ, [callId]);
          return parseCommittedProof(read);
        },
      );
    },
  });
}
