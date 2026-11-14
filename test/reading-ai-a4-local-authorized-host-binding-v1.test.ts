import { describe, expect, it } from 'vitest';
import { createI14StrengthEvidenceRegistry } from '../src/research/i14-strength-evidence-registry.js';
import { ProductionCompositionBlockedError } from '../src/production/production-composition.js';
import { createUnstartedSajuA4LocalAuthorizedHostBindingV1 } from '../src/production/reading-ai-a4-local-authorized-host-binding-v1.js';
import { createSajuA4LocalSourcePoolPairV1 } from '../src/production/reading-ai-a4-local-capture-binding-v1.js';

const local = {
  claimWriterPassword: 'c'.repeat(64),
  receiptWriterPassword: 'r'.repeat(64),
  trustedCaPem: '-----BEGIN CERTIFICATE-----\ntest\n-----END CERTIFICATE-----',
  a4: {
    myeonghaPrivateOrigin: 'https://myeongha-private.example.test',
    myeonghaServiceBearer: 'offline-dedicated-proof-reader-bearer-123',
    trustedMyeonghaIssuer: 'myeongha-production',
    myeonghaProofAudience: 'saju-production-a4',
    trustedMyeonghaKeyId: 'mh-a4-prepared-v1',
    myeonghaSigningKey: new Uint8Array(32).fill(31),
    sourceIssuer: 'saju-production',
    sourceAudience: 'myeongha-admin-a4',
    sourceKeyId: 'saju-provider-1',
    sourceSigningKey: new Uint8Array(32).fill(93),
    nowMs: () => Date.parse('2026-11-14T00:00:00.000Z'),
  },
};

const host = {
  production: {},
  narrativePolicy: {} as never,
  openAI: { apiKey: 'never-send-offline-test-key' },
  host: { serviceBearer: 'never-start-private-host' },
  local,
};

describe('A4 local Docker Source => governed Production host wiring', () => {
  it('does not construct local DB pools or a host when official authority is missing', async () => {
    await expect(
      createUnstartedSajuA4LocalAuthorizedHostBindingV1({
        ...host,
        local: { ...local, trustedCaPem: '' },
      }),
    ).rejects.toThrow(ProductionCompositionBlockedError);
  });

  it('rejects research interpretation registry before any Source provisioning', async () => {
    await expect(
      createUnstartedSajuA4LocalAuthorizedHostBindingV1({
        ...host,
        production: { registry: createI14StrengthEvidenceRegistry() },
      }),
    ).rejects.toThrow(ProductionCompositionBlockedError);
  });

  it('keeps dedicated local Claim and Receipt Writer connections independent and closeable', async () => {
    const pools = createSajuA4LocalSourcePoolPairV1(local);
    expect(pools.claimPool).not.toBe(pools.sourceReceiptPool);
    expect(typeof pools.claimPool.connect).toBe('function');
    expect(typeof pools.sourceReceiptPool.connect).toBe('function');
    await pools.end();
  });

  it('rejects reuse of one Source credential for both roles', () => {
    expect(() =>
      createSajuA4LocalSourcePoolPairV1({
        ...local,
        receiptWriterPassword: local.claimWriterPassword,
      }),
    ).toThrow(/Separate local Source/);
  });
});
