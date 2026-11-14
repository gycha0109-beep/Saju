import { describe, expect, it } from 'vitest';
import {
  createSajuA4LocalSourcePoolV1,
  SAJU_A4_LOCAL_SOURCE_ROLES,
} from '../src/production/reading-ai-a4-local-postgres-pool-v1.js';

const base = {
  role: SAJU_A4_LOCAL_SOURCE_ROLES[0],
  password: 'x'.repeat(64),
  trustedCaPem: '-----BEGIN CERTIFICATE-----\ntest\n-----END CERTIFICATE-----',
};

describe('A4 local Docker PostgreSQL pool construction', () => {
  it('provides an unstarted, closeable dedicated source connection', async () => {
    const pool = createSajuA4LocalSourcePoolV1(base);
    expect(typeof pool.connect).toBe('function');
    await pool.end();
  });

  it('rejects missing identity, untrusted TLS CA and undersized secrets', () => {
    expect(() =>
      createSajuA4LocalSourcePoolV1({ ...base, role: 'postgres' as typeof base.role }),
    ).toThrow(/credentials/);
    expect(() => createSajuA4LocalSourcePoolV1({ ...base, password: 'short' })).toThrow(
      /credentials/,
    );
    expect(() => createSajuA4LocalSourcePoolV1({ ...base, trustedCaPem: '' })).toThrow(/TLS CA/);
    expect(() => createSajuA4LocalSourcePoolV1({ ...base, port: 0 })).toThrow(/credentials/);
  });
});
