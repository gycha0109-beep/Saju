import { describe, expect, it } from 'vitest';
import { createUnstartedSajuA4LocalCaptureBindingV1 } from '../src/production/reading-ai-a4-local-capture-binding-v1.js';

const config = {
  claimWriterPassword: 'c'.repeat(64),
  receiptWriterPassword: 'r'.repeat(64),
  trustedCaPem: '-----BEGIN CERTIFICATE-----\ntest\n-----END CERTIFICATE-----',
  a4: {
    myeonghaPrivateOrigin: 'https://myeongha-private.example.test',
    myeonghaServiceBearer: 'local-test-dedicated-myeongha-a4-proof-bearer',
    trustedMyeonghaIssuer: 'myeongha-production',
    myeonghaProofAudience: 'saju-production-a4',
    trustedMyeonghaKeyId: 'mh-a4-prepared-v1',
    myeonghaSigningKey: new Uint8Array(32).fill(41),
    sourceIssuer: 'saju-production',
    sourceAudience: 'myeongha-admin-a4',
    sourceKeyId: 'saju-proof-source-key',
    sourceSigningKey: new Uint8Array(32).fill(67),
    nowMs: () => Date.parse('2026-11-14T00:00:00Z'),
  },
};

describe('local Docker A4 capture binding', () => {
  it('wires dedicated claim and receipt writer pools into the existing unstarted capture', async () => {
    const binding = await createUnstartedSajuA4LocalCaptureBindingV1(config);
    expect(typeof binding.capture.withPreparedAttempt).toBe('function');
    expect(typeof binding.capture.onBeforeProviderRequest).toBe('function');
    expect(typeof binding.capture.onProviderCall).toBe('function');
    await binding.end();
  });

  it('rejects credential reuse before constructing pools', async () => {
    await expect(
      createUnstartedSajuA4LocalCaptureBindingV1({
        ...config,
        receiptWriterPassword: config.claimWriterPassword,
      }),
    ).rejects.toThrow(/Separate local Source/);
  });

  it('rejects mismatched TLS or private origin without starting a host', async () => {
    await expect(
      createUnstartedSajuA4LocalCaptureBindingV1({ ...config, trustedCaPem: '' }),
    ).rejects.toThrow(/TLS CA/);
    await expect(
      createUnstartedSajuA4LocalCaptureBindingV1({
        ...config,
        a4: { ...config.a4, myeonghaPrivateOrigin: 'http://localhost:4185' },
      }),
    ).rejects.toThrow(/HTTPS/);
  });

  it('rejects identical proof and source signing keys', async () => {
    await expect(
      createUnstartedSajuA4LocalCaptureBindingV1({
        ...config,
        a4: { ...config.a4, sourceSigningKey: config.a4.myeonghaSigningKey },
      }),
    ).rejects.toThrow(/Independent/);
  });
});
