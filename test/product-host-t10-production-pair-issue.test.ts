import type { AddressInfo } from 'node:net';
import { generateKeyPairSync, randomUUID, verify } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  createMyeonghwaProductionCalculationProcessV1,
  createMyeonghwaProductionPreviewOnlyCalculationProcessV1,
  PRODUCTION_CALCULATION_PROCESS_ENV_V1,
} from '../src/production-calculation-process.js';
import {
  T10_PRODUCTION_PAIR_ISSUE_DOMAIN_V1,
  T10_PRODUCTION_PAIR_ISSUE_PATH_V1,
  T10_PRODUCTION_PAIR_ISSUE_PROOF_HEADER_V1,
} from '../src/host/t10-production-pair-issue-proof.js';

const own = { calendarType: 'solar', date: '1990-05-15', time: '14:30', sex: 'unspecified' };
const partner = { calendarType: 'solar', date: '1996-06-05', time: '09:30', sex: 'unspecified' };
const offers = ['first-counterpart', 'additional-counterpart', 'relationship-plus-first'] as const;
const bearer = 'production-pair-test-secret';
const environment = { [PRODUCTION_CALCULATION_PROCESS_ENV_V1.serviceBearer]: bearer };
const configName = PRODUCTION_CALCULATION_PROCESS_ENV_V1.pairIssuerConfig;

describe('T10 distinct Production pair issue', () => {
  it.each(offers)('binds the actual two canonical charts and signed Korean material for %s', async (offerId) => {
    const { privateKey, publicKey } = generateKeyPairSync('ed25519');
    const releaseRef = `t10-verified-release-candidate-${offerId}`;
    const configuredEnvironment = {
      ...environment,
      [configName]: JSON.stringify({
        issuer: 'saju', audience: 'myeongha', keyId: 'pair-issue-key', engineVersion: 'test-engine',
        privateKeyPkcs8Base64: privateKey.export({ format: 'der', type: 'pkcs8' }).toString('base64'),
        releaseByOffer: { [offerId]: releaseRef },
      }),
    };
    const { server } = createMyeonghwaProductionCalculationProcessV1(configuredEnvironment);
    await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve));
    const url = 'http://127.0.0.1:' + (server.address() as AddressInfo).port +
      T10_PRODUCTION_PAIR_ISSUE_PATH_V1;
    const attemptId = randomUUID();
    const purchaseId = randomUUID();
    const readingId = randomUUID();
    const binding = {
      executionAttemptId: attemptId, readingId, purchaseIntentId: purchaseId,
      offerId, counterpartOrder: offerId === 'additional-counterpart' ? 'additional' : 'first',
      targetPersonId: randomUUID(), useApprovalRef: 'consent-for-pair',
      admissionHash: 'admission-for-pair', birthRevisionId: randomUUID(),
      targetBirthRevisionId: randomUUID(),
      sourceBirthInputHash: 'sha256:v1:' + 'a'.repeat(64),
      targetBirthInputHash: 'sha256:v1:' + 'b'.repeat(64),
      sourceRequestHash: deterministicContentHash({ birth: own, partnerBirth: partner }),
      releaseRef,
    };
    try {
      const send = (body: unknown, auth = true) => fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json', ...(auth
          ? { authorization: 'Bearer ' + bearer } : {}) },
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
        targetPersonId: binding.targetPersonId, releaseRef, offerId, counterpartOrder: binding.counterpartOrder,
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
        ...binding, releaseRef: 't10-unconfigured-release',
      } })).status).toBe(400);
    } finally {
      await new Promise<void>((resolve, reject) =>
        server.close(error => error ? reject(error) : resolve()));
    }

    const { server: preview } = createMyeonghwaProductionPreviewOnlyCalculationProcessV1(configuredEnvironment);
    await new Promise<void>(resolve => preview.listen(0, '127.0.0.1', resolve));
    try {
      const port = (preview.address() as AddressInfo).port;
      const reply = await fetch('http://127.0.0.1:' + port + T10_PRODUCTION_PAIR_ISSUE_PATH_V1, {
        method: 'POST', headers: { authorization: 'Bearer ' + bearer },
      });
      expect(reply.status).toBe(404);
    } finally {
      await new Promise<void>((resolve, reject) =>
        preview.close(error => error ? reject(error) : resolve()));
    }
  });

  it('keeps the ordinary process closed without a pair issuer configuration', async () => {
    const { server } = createMyeonghwaProductionCalculationProcessV1(environment);
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
    try {
      const port = (server.address() as AddressInfo).port;
      const reply = await fetch('http://127.0.0.1:' + port + T10_PRODUCTION_PAIR_ISSUE_PATH_V1, {
        method: 'POST', headers: { authorization: 'Bearer ' + bearer },
      });
      expect(reply.status).toBe(404);
    } finally {
      await new Promise<void>((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve())));
    }
  });

  it('rejects malformed pair issuer configuration without reflecting its value', () => {
    const raw = '{"privateKeyPkcs8Base64":"test-private-value"}';
    expect(() => createMyeonghwaProductionCalculationProcessV1({ ...environment, [configName]: raw }))
      .toThrow(`Invalid environment variable ${configName}.`);
  });
});
