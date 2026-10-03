import { describe, expect, it } from 'vitest';

import {
  createNeutralEarFlorenceLocalHttpTransportFR104,
  FR104_FLORENCE_LOCAL_HTTP_ENDPOINT,
} from './neutral-ear-florence-local-http-transport-fr104.js';

function responseBody(providerRunRef: string) {
  return {
    schemaVersion:
      'fr104-neutral-ear-florence-host-invocation-result-v1',
    authorityState:
      'provider_candidate_summary_only_no_ear_acceptance',
    providerRunRef,
    leftPromptStatus: 'candidate_polygon',
    rightPromptStatus: 'ambiguous',
    leftCandidateCount: 1,
    rightCandidateCount: 2,
    promptSideConsumedAsAnatomicalSide: false,
    rawProviderResponsePersisted: false,
    rawPolygonBundleReturned: false,
    validatedExternalEarObservationAuthorized: false,
    anatomicalLateralityAuthorized: false,
  };
}

describe('FR104 Florence local HTTP transport', () => {
  it('posts exact RGBA8 bytes without multipart/base64/file persistence semantics', async () => {
    let observedUrl: RequestInfo | URL | null = null;
    let observedInit: RequestInit | undefined;

    const transport =
      createNeutralEarFlorenceLocalHttpTransportFR104({
        fetchImpl: async (url, init) => {
          observedUrl = url;
          observedInit = init;
          return new Response(
            JSON.stringify(responseBody('fr104:transport:001')),
            {
              status: 200,
              headers: { 'content-type': 'application/json' },
            },
          );
        },
      });

    const bytes = Uint8Array.from([
      1, 2, 3, 255,
      4, 5, 6, 255,
    ]);
    const result = await transport.invoke({
      rgbaBytes: bytes,
      width: 2,
      height: 1,
      providerRunRef: 'fr104:transport:001',
    });

    expect(observedUrl).toBe(FR104_FLORENCE_LOCAL_HTTP_ENDPOINT);
    expect(observedInit?.method).toBe('POST');
    expect(observedInit?.body).toBeInstanceOf(ArrayBuffer);
    expect(
      Array.from(
        new Uint8Array(observedInit?.body as ArrayBuffer),
      ),
    ).toEqual(Array.from(bytes));
    expect(observedInit?.cache).toBe('no-store');
    expect(observedInit?.credentials).toBe('same-origin');

    const headers = new Headers(observedInit?.headers);
    expect(headers.get('content-type'))
      .toBe('application/octet-stream');
    expect(headers.get('x-fr104-schema-version'))
      .toBe('fr104-florence-rgba-host-request-v1');
    expect(headers.get('x-fr104-pixel-format')).toBe('rgba8');
    expect(headers.get('x-fr104-width')).toBe('2');
    expect(headers.get('x-fr104-height')).toBe('1');
    expect(headers.get('x-fr104-byte-length')).toBe('8');

    expect(result.leftCandidateCount).toBe(1);
    expect(result.rightCandidateCount).toBe(2);
    expect(result.promptSideConsumedAsAnatomicalSide)
      .toBe(false);
    expect(transport.transportBoundary).toEqual({
      requestBody: 'exact_rgba8_bytes',
      filePersistenceUsed: false,
      multipartEncodingUsed: false,
      base64EncodingUsed: false,
      responseIncludesRawProviderOutput: false,
      responseIncludesRawCandidatePolygons: false,
      anatomicalLateralityAuthorized: false,
      productionAuthorization: false,
    });
  });

  it('fails closed on byte-length drift before fetch', async () => {
    let calls = 0;
    const transport =
      createNeutralEarFlorenceLocalHttpTransportFR104({
        fetchImpl: async () => {
          calls += 1;
          return new Response('{}', { status: 200 });
        },
      });

    await expect(
      transport.invoke({
        rgbaBytes: Uint8Array.from([1, 2, 3]),
        width: 2,
        height: 1,
        providerRunRef: 'fr104:transport:bad',
      }),
    ).rejects.toThrow(/width \* height \* 4/i);
    expect(calls).toBe(0);
  });

  it('rejects host responses that widen laterality authority', async () => {
    const transport =
      createNeutralEarFlorenceLocalHttpTransportFR104({
        fetchImpl: async () => {
          return new Response(
            JSON.stringify({
              ...responseBody('fr104:transport:forged'),
              anatomicalLateralityAuthorized: true,
            }),
            { status: 200 },
          );
        },
      });

    await expect(
      transport.invoke({
        rgbaBytes: Uint8Array.from([
          1, 2, 3, 255,
          4, 5, 6, 255,
        ]),
        width: 2,
        height: 1,
        providerRunRef: 'fr104:transport:forged',
      }),
    ).rejects.toThrow(/widens authority/i);
  });

  it('rejects non-success HTTP responses without returning provider data', async () => {
    const transport =
      createNeutralEarFlorenceLocalHttpTransportFR104({
        fetchImpl: async () =>
          new Response('model unavailable', { status: 503 }),
      });

    await expect(
      transport.invoke({
        rgbaBytes: Uint8Array.from([
          1, 2, 3, 255,
          4, 5, 6, 255,
        ]),
        width: 2,
        height: 1,
        providerRunRef: 'fr104:transport:503',
      }),
    ).rejects.toThrow(/HTTP 503/i);
  });
});
