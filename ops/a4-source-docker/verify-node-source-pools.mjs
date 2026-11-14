import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import process from 'node:process';
import console from 'node:console';
import {
  createSajuA4LocalSourcePoolV1,
  SAJU_A4_LOCAL_SOURCE_ROLES,
} from '../../dist/production/reading-ai-a4-local-postgres-pool-v1.js';
import { createPostgresSajuSignedProviderReceiptReaderV1 } from '../../dist/production/reading-ai-provider-receipt-postgres-v1.js';
import { assertSajuA4SourceWriterReadyV1 } from '../../dist/production/reading-ai-a4-source-writer-preflight-v1.js';

const base = dirname(fileURLToPath(import.meta.url));
const secrets = process.env.SAJU_A4_LOCAL_SECRETS_DIR
  ? resolve(process.env.SAJU_A4_LOCAL_SECRETS_DIR)
  : resolve(base, 'secrets');
const trustedCaPem = await readFile(resolve(secrets, 'local_tls_server.crt'), 'utf8');

for (const role of SAJU_A4_LOCAL_SOURCE_ROLES) {
  const contents = await readFile(resolve(secrets, role + '.pgpass'), 'utf8');
  const prefix = '127.0.0.1:5432:saju_a4_source:' + role + ':';
  if (!contents.trim().startsWith(prefix)) throw new Error('Invalid local credential source');
  const password = contents.trim().slice(prefix.length);
  const pool = createSajuA4LocalSourcePoolV1({ role, password, trustedCaPem });
  try {
    const client = await pool.connect();
    try {
      const who = await client.query(
        'SELECT current_user AS "currentUser", ' +
          '(SELECT ssl FROM pg_stat_ssl WHERE pid=pg_backend_pid()) AS "sslOn", ' +
          '(SELECT version FROM pg_stat_ssl WHERE pid=pg_backend_pid()) AS "tlsVersion", ' +
          "has_table_privilege(current_user, 'saju_source_ops.a4_provider_call_signed_receipts_v1', 'DELETE') AS \"canDelete\"",
      );
      const row = who.rows[0];
      if (
        row?.currentUser !== role ||
        row.sslOn !== true ||
        row.tlsVersion !== 'TLSv1.3' ||
        row.canDelete !== false
      ) {
        throw new Error('Source role or verified TLS boundary mismatch');
      }
    } finally {
      client.release();
    }
    if (role === 'saju_a4_provider_receipt_writer_v1') {
      await assertSajuA4SourceWriterReadyV1(pool);
      console.log('LOCAL_SOURCE_RECEIPT_WRITER_PREFLIGHT_OK');
    }
    if (role === 'saju_a4_prepared_attempt_claim_writer_v1') {
      const claimClient = await pool.connect();
      try {
        await claimClient.query('BEGIN READ ONLY');
        const result = await claimClient.query(`
          SELECT current_user::text AS "currentUser",
            to_regclass('saju_source_ops.a4_prepared_attempt_claims_v1')::text AS "claimTable",
            has_column_privilege(current_user, 'saju_source_ops.a4_prepared_attempt_claims_v1', 'execution_attempt_id', 'INSERT') AS "idInsert",
            has_column_privilege(current_user, 'saju_source_ops.a4_prepared_attempt_claims_v1', 'proof_digest_sha256', 'INSERT') AS "digestInsert",
            has_column_privilege(current_user, 'saju_source_ops.a4_prepared_attempt_claims_v1', 'execution_attempt_id', 'SELECT') AS "idSelect",
            has_column_privilege(current_user, 'saju_source_ops.a4_prepared_attempt_claims_v1', 'proof_digest_sha256', 'SELECT') AS "digestSelect",
            has_table_privilege(current_user, 'saju_source_ops.a4_prepared_attempt_claims_v1', 'UPDATE') AS "canUpdate",
            has_table_privilege(current_user, 'saju_source_ops.a4_prepared_attempt_claims_v1', 'DELETE') AS "canDelete",
            has_table_privilege(current_user, 'saju_source_ops.a4_prepared_attempt_claims_v1', 'TRUNCATE') AS "canTruncate"
        `);
        const row = result.rows[0];
        if (
          result.rows.length !== 1 ||
          row?.currentUser !== role ||
          row.claimTable !== 'saju_source_ops.a4_prepared_attempt_claims_v1' ||
          row.idInsert !== true ||
          row.digestInsert !== true ||
          row.idSelect !== true ||
          row.digestSelect !== false ||
          row.canUpdate !== false ||
          row.canDelete !== false ||
          row.canTruncate !== false
        ) {
          throw new Error('Local A4 single-use Claim Writer privileges mismatch');
        }
        await claimClient.query('COMMIT');
        console.log('LOCAL_SOURCE_CLAIM_WRITER_PREFLIGHT_OK');
      } catch (error) {
        try {
          await claimClient.query('ROLLBACK');
        } catch {
          // The original failed readiness check remains authoritative.
        }
        throw error;
      } finally {
        claimClient.release();
      }
    }
    if (role === 'saju_a4_provider_receipt_reader_v1') {
      const reader = createPostgresSajuSignedProviderReceiptReaderV1(pool);
      const missing = await reader.loadSignedCallById(randomUUID());
      if (missing !== null) throw new Error('Unexpected receipt in read-only local source DB');
    }
    console.log('LOCAL_SOURCE_NODE_POOL_OK: ' + role);
  } finally {
    await pool.end();
  }
}
console.log('LOCAL_SOURCE_NODE_POOLS_VERIFIED_NO_PROVIDER_CALLS');
