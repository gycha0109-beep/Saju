import { Pool } from 'pg';
import type { SajuA4ReceiptDatabasePoolV1 } from './reading-ai-provider-receipt-postgres-v1.js';

export const SAJU_A4_LOCAL_SOURCE_ROLES = [
  'saju_a4_provider_receipt_writer_v1',
  'saju_a4_provider_receipt_reader_v1',
  'saju_a4_prepared_attempt_claim_writer_v1',
] as const;

export type SajuA4LocalSourceRoleV1 = (typeof SAJU_A4_LOCAL_SOURCE_ROLES)[number];

export interface SajuA4LocalSourcePoolConfigV1 {
  readonly role: SajuA4LocalSourceRoleV1;
  readonly password: string;
  readonly trustedCaPem: string;
  readonly port?: number;
}

export type SajuA4ClosableSourcePoolV1 = SajuA4ReceiptDatabasePoolV1 & {
  end(): Promise<void>;
};

/**
 * Explicit local Docker adapter for the existing Source database interfaces.
 * Does not start a Saju host or activate provider calls/cost collection.
 * A trusted production certificate, real Production identity and service
 * admission remain separate, independently approved requirements.
 */
export function createSajuA4LocalSourcePoolV1(
  config: SajuA4LocalSourcePoolConfigV1,
): SajuA4ClosableSourcePoolV1 {
  if (
    !config ||
    !SAJU_A4_LOCAL_SOURCE_ROLES.includes(config.role) ||
    typeof config.password !== 'string' ||
    !/^[A-Za-z0-9_-]{64}$/u.test(config.password) ||
    typeof config.trustedCaPem !== 'string' ||
    !config.trustedCaPem.includes('-----BEGIN CERTIFICATE-----') ||
    !config.trustedCaPem.includes('-----END CERTIFICATE-----') ||
    (config.port !== undefined &&
      (!Number.isInteger(config.port) || config.port < 1024 || config.port > 65535))
  ) {
    throw new TypeError(
      'Valid dedicated local Saju Source credentials and trusted TLS CA required',
    );
  }
  const pool = new Pool({
    host: '127.0.0.1',
    port: config.port ?? 55432,
    database: 'saju_a4_source',
    user: config.role,
    password: config.password,
    ssl: {
      ca: config.trustedCaPem,
      rejectUnauthorized: true,
      minVersion: 'TLSv1.3',
    },
    enableChannelBinding: true,
    application_name: 'saju-a4-local-source-verification',
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 1000,
    max: 2,
    allowExitOnIdle: true,
  });
  pool.on('error', () => {
    // Idle transport failures cannot be mistaken for successful source writes.
    // Active transactions fail on their own query/connect promise.
  });

  return Object.freeze({
    async connect() {
      const client = await pool.connect();
      return {
        async query<Row = unknown>(sql: string, values?: readonly unknown[]) {
          const result = await client.query(sql, values === undefined ? [] : [...values]);
          return { rows: result.rows as readonly Row[] };
        },
        release(discard?: unknown) {
          client.release(discard instanceof Error ? discard : undefined);
        },
      };
    },
    end() {
      return pool.end();
    },
  });
}
