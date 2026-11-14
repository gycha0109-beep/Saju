import type { AddressInfo } from 'node:net';
import { generateKeyPairSync, randomUUID, verify } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import type { MyeonghwaProductHost } from '../src/host/product-host.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  createMyeonghwaProductionProductHostServer,
  createMyeonghwaProductionPreviewHostServer,
} from '../src/host/http-server.js';
import {
  T10_PRODUCTION_PAIR_ISSUE_DOMAIN_V1,
  T10_PRODUCTION_PAIR_ISSUE_PATH_V1,
  T10_PRODUCTION_PAIR_ISSUE_PROOF_HEADER_V1,
} from '../src/host/t10-production-pair-issue-proof.js';

const own = { calendarType: 'solar', date: '1990-05-15', time: '14:30', sex: 'unspecified' };
const partner = { calendarType: 'solar', date: '1996-06-05', time: '09:30', sex: 'unspecified' };
const host: MyeonghwaProductHost = {
  async requestReading() { throw new Error('Public reading not used.'); },
};

describe('T10 distinct Production pair issue', () => {
  it('binds the actual two canonical charts, approved pair scope and signed Korean material', async () => {
    const { privateKey, publicKey } = generateKeyPairSync('ed25519');
    const server = createMyeonghwaProductionProductHostServer(host, {
      serviceBearer: 'production-pair-test-secret',
      compatibilityProductionIssue: {
        issuer: 'saju', audience: 'myeongha', keyId: 'pair-issue-key',
        signingKey: privateKey, engineVersion: 'test-engine',
        releaseByOffer: { 'first-counterpart': 't10-verified-release-candidate-v1' },
      },
    });
    await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve));
    const url = 'http://127.0.0.1:' + (server.address() as AddressInfo).port +
      T10_PRODUCTION_PAIR_ISSUE_PATH_V1;
    const attemptId = randomUUID();
    const purchaseId = randomUUID();
    const readingId = randomUUID();
    const binding = {
      executionAttemptId: attemptId, readingId, purchaseIntentId: purchaseId,
      offerId: 'first-counterpart', counterpartOrder: 'first',
      targetPersonId: randomUUID(), useApprovalRef: 'consent-for-pair',
      admissionHash: 'admission-for-pair', birthRevisionId: randomUUID(),
      targetBirthRevisionId: randomUUID(),
      sourceBirthInputHash: 'sha256:v1:' + 'a'.repeat(64),
      targetBirthInputHash: 'sha256:v1:' + 'b'.repeat(64),
      sourceRequestHash: deterministicContentHash({ birth: own, partnerBirth: partner }),
      releaseRef: 't10-verified-release-candidate-v1',
    };
    try {
      const send = (body: unknown, auth = true) => fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json', ...(auth
          ? { authorization: 'Bearer production-pair-test-secret' } : {}) },
        body: JSON.stringify(body),
      });
      expect((await send({ birth: own, partnerBirth: partner, binding }, false)).status).toBe(401);
      const reply = await send({ birth: own, partnerBirth: partner, binding });
      expect(reply.status).toBe(200);
      const body = await reply.json() as Record<string, unknown>;
      expect(body).toMatchObject({
        state: 'issued', readingId, readingDomain: 'compatibility',
        policyId: 'myeongha-t10-internal-relational-explanation-v1',
      });
      const charts = body.charts as { role: string; birthRevisionId: string }[];
      expect(charts.map(chart => chart.role)).toEqual(['self', 'partner']);
      expect(charts.map(chart => chart.birthRevisionId)).toEqual([
        binding.birthRevisionId, binding.targetBirthRevisionId,
      ]);
      const proof = JSON.parse(Buffer.from(
        reply.headers.get(T10_PRODUCTION_PAIR_ISSUE_PROOF_HEADER_V1)!, 'base64url',
      ).toString('utf8')) as {payload: Record<string, unknown>; signature: string};
      expect(proof.payload).toMatchObject({
        executionAttemptId: attemptId, purchaseIntentId: purchaseId, readingId,
        targetPersonId: binding.targetPersonId, releaseRef: binding.releaseRef,
        responseBodyHash: deterministicContentHash(body),
      });
      expect(verify(null, Buffer.from(
        T10_PRODUCTION_PAIR_ISSUE_DOMAIN_V1 + deterministicContentHash(proof.payload),
      ), publicKey, Buffer.from(proof.signature, 'base64url'))).toBe(true);
      expect(deterministicContentHash({ ...body, state: 'held' }))
        .not.toBe(proof.payload.responseBodyHash);
      expect((await send({ birth: own, partnerBirth: partner, binding: {
        ...binding, targetBirthRevisionId: binding.birthRevisionId,
      } })).status).toBe(400);
      expect((await send({ birth: own, partnerBirth: partner, binding: {
        ...binding, offerId: 'additional-counterpart',
      } })).status).toBe(400);
    } finally {
      await new Promise<void>((resolve, reject) =>
        server.close(error => error ? reject(error) : resolve()));
    }

    const preview = createMyeonghwaProductionPreviewHostServer(host, {
      serviceBearer: 'production-pair-test-secret',
    });
    await new Promise<void>(resolve => preview.listen(0, '127.0.0.1', resolve));
    try {
      const port = (preview.address() as AddressInfo).port;
      const reply = await fetch('http://127.0.0.1:' + port + T10_PRODUCTION_PAIR_ISSUE_PATH_V1, {
        method: 'POST', headers: { authorization: 'Bearer production-pair-test-secret' },
      });
      expect(reply.status).toBe(404);
    } finally {
      await new Promise<void>((resolve, reject) =>
        preview.close(error => error ? reject(error) : resolve()));
    }
  });
});
