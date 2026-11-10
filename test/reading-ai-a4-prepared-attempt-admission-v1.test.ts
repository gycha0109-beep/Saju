import { createHash, createHmac } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import {
  createSajuA4SignedPreparedAttemptAdmissionV1,
  verifySajuA4PreparedAttemptHandoffV1,
} from '../src/production/reading-ai-a4-prepared-attempt-admission-v1.js';

const ATTEMPT = '123e4567-e89b-42d3-a456-426614174002';
const NONCE = '123e4567-e89b-42d3-a456-426614174003';
const BODY = '{"birth":{"date":"1990-01-01"},"reading":{"text":"test"}}';
const KEY = new Uint8Array(32).fill(77);
const NOW = 1_793_000_000_000;
const KEY_ID = 'a4-admission-key-20261110';

const payload = {
  version: 'myeongha-a4-prepared-attempt-handoff-v1',
  issuer: 'myeongha-official-reading',
  audience: 'saju-a4-provider-capture',
  keyId: KEY_ID,
  executionAttemptId: ATTEMPT,
  requestSha256Hex: createHash('sha256').update(BODY).digest('hex'),
  nonce: NONCE,
  issuedAtMs: NOW,
  expiresAtMs: NOW + 60_000,
};
const proof = {
  payload,
  signatureHex: createHmac('sha256', KEY)
    .update('myeongha/a4/prepared-attempt-handoff/v1\0')
    .update(JSON.stringify(payload))
    .digest('hex'),
};

function verify(overrides: Record<string, unknown> = {}) {
  return verifySajuA4PreparedAttemptHandoffV1({
    proof,
    requestBody: BODY,
    keyBytes: KEY,
    trustedKeyId: KEY_ID,
    nowMs: NOW + 1000,
    ...overrides,
  });
}

describe('Saju A4 preallocated MyeongHa attempt admission (OFFLINE)', () => {
  it('accepts the exact shared MyeongHa signer wire contract and reveals no birth fields', () => {
    expect(verify()).toEqual(payload);
    expect(JSON.stringify(proof)).not.toContain('1990-01-01');
    expect(JSON.stringify(proof)).not.toContain('test');
  });

  it('rejects malformed or substituted exact request body and changed HMAC evidence', () => {
    for (const overrides of [
      { requestBody: BODY.replace('1990-01-01', '1990-01-02') },
      { requestBody: BODY + ' ' },
      { requestBody: 'not-json' },
      { keyBytes: new Uint8Array(32).fill(78) },
      { proof: { ...proof, signatureHex: '0'.repeat(64) } },
      { proof: { ...proof, payload: { ...payload, executionAttemptId: NONCE } } },
      { proof: { ...proof, payload: { ...payload, nonce: ATTEMPT } } },
      { proof: { ...proof, payload: { ...payload, issuer: 'browser' } } },
      { proof: { ...proof, payload: { ...payload, audience: 'preview' } } },
      { proof: { ...proof, payload: { ...payload, price: 0 } } },
      { proof: { ...proof, content: 'privateBirth' } },
      { trustedKeyId: 'wrong-key-id' },
    ])
      expect(verify(overrides)).toBeNull();
  });

  it('rejects expired, future, overflowed, or overlong authorization', () => {
    for (const overrides of [
      { nowMs: NOW + 60_000 },
      { nowMs: NOW - 5_001 },
      { proof: { ...proof, payload: { ...payload, expiresAtMs: NOW + 120_001 } } },
      { proof: { ...proof, payload: { ...payload, expiresAtMs: NOW } } },
      { proof: { ...proof, payload: { ...payload, issuedAtMs: Number.MAX_SAFE_INTEGER + 1 } } },
    ])
      expect(verify(overrides)).toBeNull();
  });

  it('never admits a replay and binds the original verified DB attempt exactly', async () => {
    const consumed = new Set<string>();
    const accesses: string[] = [];
    const admission = createSajuA4SignedPreparedAttemptAdmissionV1({
      proof,
      requestBody: BODY,
      keyBytes: KEY,
      trustedKeyId: KEY_ID,
      nowMs: () => NOW + 1000,
      authority: {
        async admitAndConsumeOnce(input) {
          accesses.push(input.executionAttemptId);
          if (consumed.has(input.nonce)) return false;
          consumed.add(input.nonce);
          return true;
        },
      },
    });
    expect(await admission.admitAndConsumePreparedAttempt({ executionAttemptId: NONCE })).toBe(
      false,
    );
    expect(accesses).toHaveLength(0);
    expect(await admission.admitAndConsumePreparedAttempt({ executionAttemptId: ATTEMPT })).toBe(
      true,
    );
    expect(await admission.admitAndConsumePreparedAttempt({ executionAttemptId: ATTEMPT })).toBe(
      false,
    );
    expect(accesses).toEqual([ATTEMPT, ATTEMPT]);
  });

  it('prevents unsignable, expired or invalid requests from reaching one-time authority', async () => {
    let count = 0;
    const admission = createSajuA4SignedPreparedAttemptAdmissionV1({
      proof,
      requestBody: BODY + ' ',
      keyBytes: KEY,
      trustedKeyId: KEY_ID,
      nowMs: () => NOW + 1000,
      authority: {
        async admitAndConsumeOnce() {
          count++;
          return true;
        },
      },
    });
    expect(await admission.admitAndConsumePreparedAttempt({ executionAttemptId: ATTEMPT })).toBe(
      false,
    );
    expect(count).toBe(0);
  });

  it('fails closed on unavailable single-use authority', async () => {
    const admission = createSajuA4SignedPreparedAttemptAdmissionV1({
      proof,
      requestBody: BODY,
      keyBytes: KEY,
      trustedKeyId: KEY_ID,
      nowMs: () => NOW + 1000,
      authority: {
        async admitAndConsumeOnce() {
          throw Error('DB admission unavailable');
        },
      },
    });
    await expect(
      admission.admitAndConsumePreparedAttempt({ executionAttemptId: ATTEMPT }),
    ).rejects.toThrow('DB admission unavailable');
    expect(() =>
      createSajuA4SignedPreparedAttemptAdmissionV1({
        proof,
        requestBody: BODY,
        keyBytes: KEY,
        trustedKeyId: KEY_ID,
        nowMs: () => NOW,
        authority: {} as never,
      }),
    ).toThrow();
  });
});
