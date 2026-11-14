import { generateKeyPairSync, randomUUID } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { createProductionReadingIssueProof } from
  '../src/host/production-reading-issue-proof.js';
import type { ProductReadingResponse } from '../src/reading/product-reading-response.js';

const response = {
  responseVersion: 'myeonghwa-product-reading-response-v2',
  state: 'delivered',
  reading: { readingId: 'isolated-temporal-proof-reading' },
} as unknown as ProductReadingResponse;

describe('Production issuer never signs a missing annual or monthly Reader period', () => {
  it.each([
    ['올해', 'year-release', '2026-11-07T09:52:00.000Z'],
    ['이번 달', 'month-release', '2026-11-07T09:52:00.000Z'],
  ] as const)('%s requires same-execution canonical temporal source before signing', (text, release, time) => {
    const { privateKey } = generateKeyPairSync('ed25519');
    const proof = createProductionReadingIssueProof({ authority: 'internal-test' }, {
      issuer: 'isolated-saju', audience: 'isolated-myeongha',
      keyId: 'isolated-key', signingKey: privateKey,
      engineVersion: 'isolated-engine',
      releaseByReadingText: { [text]: release },
    });
    const signer = proof(randomUUID(), release, {
      reading: { text, periodReferenceDateTime: time },
    });
    expect(signer).toBeDefined();
    expect(signer!('saju-source-isolated', response)).toBeUndefined();
  });

  it('preserves separate non-temporal issuer behavior', () => {
    const { privateKey } = generateKeyPairSync('ed25519');
    const proof = createProductionReadingIssueProof({ authority: 'internal-test' }, {
      issuer: 'isolated-saju', audience: 'isolated-myeongha',
      keyId: 'isolated-key', signingKey: privateKey,
      engineVersion: 'isolated-engine',
      releaseByReadingText: { 직업운: 'career-release' },
    });
    const signer = proof(randomUUID(), 'career-release', { reading: { text: '직업운' } });
    expect(signer).toBeDefined();
    const signed = signer!('saju-source-isolated', response);
    expect(typeof signed).toBe('string');
    expect(JSON.parse(Buffer.from(signed!, 'base64url').toString('utf8')).payload)
      .not.toHaveProperty('readerSourceHash');
  });
});
