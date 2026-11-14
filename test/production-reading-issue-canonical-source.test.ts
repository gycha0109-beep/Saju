import { generateKeyPairSync, randomUUID, verify } from 'node:crypto';
import type { AddressInfo } from 'node:net';
import { expect, it } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  createMyeonghwaProductionProductHostServer,
  SAJU_A4_PREPARED_ATTEMPT_HEADER_V1,
} from '../src/host/http-server.js';
import {
  createMyeonghwaProductionReadingIssueHost,
  type ProductionReadingReaderSource,
} from '../src/host/product-host.js';
import type { ProductReadingResponse } from '../src/reading/product-reading-response.js';
import {
  createProductionReadingIssueProof,
  PRODUCTION_READER_SOURCE_HEADER,
  PRODUCTION_READER_SOURCE_VERSION,
  PRODUCTION_READING_ISSUE_PROOF_HEADER,
  PRODUCTION_READING_RELEASE_HEADER,
} from '../src/host/production-reading-issue-proof.js';
import { createApprovedSourceProofPreviewDependenciesV1 } from '../src/preview/preview-product-host.js';

it('signs the canonical judgments of the same calculated Reading only for the private issuer', async () => {
  const { privateKey, publicKey } = generateKeyPairSync('ed25519');
  const bearer = 'isolated-canonical-source-host';
  const release = 'isolated-career-v1';
  const host = createMyeonghwaProductionReadingIssueHost(createApprovedSourceProofPreviewDependenciesV1());
  let suppressReaderSource = false;
  const server = createMyeonghwaProductionProductHostServer(
    {
      requestReading: host.requestReading,
      async requestReadingForIssue(body, engineVersion) {
        const issued = await host.requestReadingForIssue(body, engineVersion);
        return suppressReaderSource ? { response: issued.response } : issued;
      },
    },
    {
      serviceBearer: bearer,
      a4SourceCapture: {
        async withPreparedAttempt() {
          throw new Error('Unexpected paid provider call');
        },
        async withPreparedDeterministicAttempt(_attempt, execute) {
          return execute('saju_source_' + randomUUID());
        },
      },
    },
    undefined,
    createProductionReadingIssueProof(
      { fixture: true },
      {
        issuer: 'isolated-saju',
        audience: 'isolated-myeongha',
        keyId: 'isolated-canonical-v1',
        signingKey: privateKey,
        engineVersion: 'isolated-engine-v1',
        releaseByReadingText: { 직업운: release },
      },
    ),
  );
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const url = 'http://127.0.0.1:' + (server.address() as AddressInfo).port + '/api/readings';
  const send = (headers: Record<string, string>) =>
    fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...headers },
      body: JSON.stringify({
        birth: { calendarType: 'solar', date: '1990-05-20', time: '10:15', sex: 'female' },
        reading: { text: '직업운' },
      }),
    });
  const auth = { authorization: 'Bearer ' + bearer };
  const issue = {
    ...auth,
    [PRODUCTION_READING_RELEASE_HEADER]: release,
    [SAJU_A4_PREPARED_ATTEMPT_HEADER_V1]: randomUUID(),
  };
  const canonical = { [PRODUCTION_READER_SOURCE_HEADER]: PRODUCTION_READER_SOURCE_VERSION };
  try {
    expect((await send(canonical)).status).toBe(401);
    expect((await send({ ...auth, ...canonical })).status).toBe(403);
    const legacy = await send(issue);
    expect(legacy.status).toBe(200);
    expect(await legacy.json()).not.toHaveProperty('readerSource');

    const requested = await send({
      ...issue,
      [SAJU_A4_PREPARED_ATTEMPT_HEADER_V1]: randomUUID(),
      ...canonical,
    });
    expect(requested.status).toBe(200);
    const { readerSource, ...reading } = (await requested.json()) as ProductReadingResponse & {
      readerSource: ProductionReadingReaderSource;
    };
    const { payload, signature } = JSON.parse(
      Buffer.from(
        requested.headers.get(PRODUCTION_READING_ISSUE_PROOF_HEADER)!,
        'base64url',
      ).toString('utf8'),
    );
    expect(payload.responseBodyHash).toBe(deterministicContentHash(reading));
    expect(payload.readerSourceHash).toBe(deterministicContentHash(readerSource));
    expect(readerSource.grounding.readingRef).toBe(reading.reading?.readingId);
    expect(readerSource.grounding.sourceSemanticHash).toBe(
      readerSource.semanticSource.semanticHash,
    );
    expect(readerSource.grounding.units).toEqual(
      expect.arrayContaining([expect.objectContaining({ axis: 'work', narrativeRole: 'primary' })]),
    );
    expect(
      verify(
        null,
        Buffer.from(
          'myeongha/saju/production-reading-issue/v1\0' + deterministicContentHash(payload),
        ),
        publicKey,
        Buffer.from(signature, 'base64url'),
      ),
    ).toBe(true);
    suppressReaderSource = true;
    const unavailable = await send({
      ...issue,
      [SAJU_A4_PREPARED_ATTEMPT_HEADER_V1]: randomUUID(),
      ...canonical,
    });
    expect(unavailable.status).toBe(409);
    expect(unavailable.headers.get(PRODUCTION_READING_ISSUE_PROOF_HEADER)).toBeNull();
  } finally {
    await new Promise<void>((resolve) => {
      server.close(() => resolve());
      server.closeAllConnections();
    });
  }
});
