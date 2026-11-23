import { generateKeyPairSync, randomUUID, verify } from 'node:crypto';
import { once } from 'node:events';
import type { AddressInfo } from 'node:net';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { createMyeonghwaProductionCalculationProcessV1 } from '../src/production-calculation-process.js';
import { PRODUCTION_RELATIONSHIP_AUTHORITY_HASH } from '../src/production/production-relationship-official-reading-issuer.js';

const { privateKey, publicKey } = generateKeyPairSync('ed25519');
const releaseRef = 'relationship-isolated-v1';
const bearer = 'saju-t8-synthetic-bearer';
const { server } = createMyeonghwaProductionCalculationProcessV1({
  SAJU_PRODUCTION_SERVICE_BEARER: bearer,
  SAJU_T8_PRODUCTION_RELATIONSHIP_ISSUER_CONFIG: JSON.stringify({
    issuer: 'saju', audience: 'myeongha', keyId: 't8-test-key', engineVersion: 't8-engine',
    releaseRef, privateKeyPkcs8Base64: privateKey.export({ format: 'der', type: 'pkcs8' }).toString('base64'),
  }),
});

const firstBirth = { calendarType: 'solar', date: '1990-05-15', time: '14:30', sex: 'unspecified' };
const secondBirth = { ...firstBirth, date: '1988-03-20', time: '09:00' };
const request = { birth: firstBirth, reading: { text: '연애운' } };

function post(body: unknown, headers: Record<string, string> = {}, token = bearer, path = '/api/readings') {
  const { port } = server.address() as AddressInfo;
  return fetch('http://127.0.0.1:' + port + path, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: 'Bearer ' + token, ...headers },
    body: JSON.stringify(body),
  });
}

function prepared() {
  return {
    'x-myeongha-reading-execution-attempt-id': randomUUID(),
    'x-myeongha-reading-release': releaseRef,
    'x-myeongha-reader-source': 'canonical-v1',
  };
}

describe('prepared general relationship Official Reading', () => {
  beforeAll(async () => {
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');
  });
  afterAll(async () => {
    const closed = once(server, 'close');
    server.close();
    server.closeAllConnections();
    await closed;
  });

  it('signs chart-specific Korean conclusions and the same canonical Reader evidence', async () => {
    const resolved = [];
    for (const birth of [firstBirth, secondBirth]) {
      const body = { ...request, birth };
      const headers = prepared();
      const reply = await post(body, headers);
      expect(reply.status).toBe(200);
      const { readerSource, ...reading } = await reply.json();
      expect(reading.state).toBe('delivered');
      expect(JSON.stringify(reading)).toMatch(/[가-힣]/u);
      const proof = JSON.parse(Buffer.from(reply.headers.get('x-myeonghwa-production-issue-proof')!,
        'base64url').toString('utf8'));
      expect(proof.payload).toMatchObject({
        authorityHash: PRODUCTION_RELATIONSHIP_AUTHORITY_HASH,
        executionAttemptId: headers['x-myeongha-reading-execution-attempt-id'],
        externalRequestRef: reply.headers.get('x-myeongha-saju-external-request-ref'),
        requestBodyHash: deterministicContentHash(body),
        responseBodyHash: deterministicContentHash(reading),
        readerSourceHash: deterministicContentHash(readerSource),
        engineVersion: 't8-engine', releaseRef,
      });
      expect(verify(null, Buffer.from('myeongha/saju/production-reading-issue/v1\0' +
        deterministicContentHash(proof.payload)), publicKey, Buffer.from(proof.signature, 'base64url'))).toBe(true);
      const primary = readerSource.semanticSource.units.filter((unit: {role: string}) => unit.role === 'primary');
      expect(primary.length).toBeGreaterThan(0);
      for (const unit of primary) {
        expect(unit.claimType).toMatch(/^RELATIONSHIP_NATAL_CONCLUSION_/u);
        expect(unit.ruleRefs[0].ruleId).toMatch(/^RULE-RELATIONSHIP-NATAL-/u);
        expect(unit.upstreamClaimRefs.length).toBeGreaterThan(0);
        expect(unit.canonicalText.summary).toMatch(/[가-힣]/u);
      }
      resolved.push(primary.map((unit: { claimType: string }) => unit.claimType));
    }
    expect(resolved[0]).not.toEqual(resolved[1]);
  });

  it('keeps general issuance private and holds missing evidence, wrong release, and another person', async () => {
    expect((await post(request, prepared(), '')).status).toBe(401);
    expect((await post(request)).status).toBe(400);
    for (const reply of [
      await post(request, { ...prepared(), 'x-myeongha-reading-release': 'different-release' }),
      await post(request, prepared(), bearer, '/api/preview/readings'),
      await post({ ...request, birth: { ...firstBirth, time: null } }, prepared()),
      await post({ ...request, reading: { ...request.reading, targetPersonRef: randomUUID() } }, prepared()),
    ]) {
      expect(reply.status).toBe(403);
      expect(reply.headers.has('x-myeonghwa-production-issue-proof')).toBe(false);
    }
  });

  it('keeps the existing spouse response and excludes it from the general release', async () => {
    const spouse = { ...request, reading: { text: '배우자운' } };
    expect((await post(spouse, prepared())).status).toBe(403);
    const reply = await post(spouse);
    expect(reply.status).toBe(200);
    expect((await reply.json()).state).toBe('delivered');
    expect(reply.headers.has('x-myeonghwa-production-issue-proof')).toBe(false);
  }, 180_000);
});
