import { once } from 'node:events';
import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { afterEach, describe, expect, it } from 'vitest';

import {
  CHARACTER_GROUNDING_ADMISSION_HEADER,
  CHARACTER_GROUNDING_ADMISSION_VERSION,
  CHARACTER_GROUNDING_HTTP_PATH,
  CharacterGroundingHttpRequestError,
  projectCharacterGroundingHttpRequestV1,
} from '../src/host/character-grounding-http.js';
import {
  createMyeonghwaProductionCalculationHostServer,
  createMyeonghwaProductionPreviewHostServer,
} from '../src/host/http-server.js';
import type { MyeonghwaProductHost } from '../src/host/product-host.js';

function deliveredResponse() {
  return {
    responseId: 'reading_response_0123456789abcdef01234567',
    responseVersion: 'myeonghwa-product-reading-response-v2',
    state: 'delivered',
    messageCode: 'READING_DELIVERED',
    requiredAction: 'none',
    reading: {
      readingId: 'official-reading-http-1',
      brand: {
        brandId: 'myeonghwa',
        displayName: '명화',
      },
      subject: {
        displayLabel: '테스트 사용자',
        birthInputDisplay: {
          calendarType: 'solar',
          date: '1996-01-09',
          time: '09:30',
          timeKnown: true,
          birthplaceLabel: '서울',
        },
        calculationState: 'resolved',
      },
      calculationSummary: {
        pillars: {
          year: { label: '년주', value: '갑자', status: 'resolved' },
          month: { label: '월주', value: '을축', status: 'resolved' },
          day: { label: '일주', value: '병인', status: 'resolved' },
          hour: { label: '시주', value: '정묘', status: 'resolved' },
        },
      },
      sections: [
        {
          sectionType: 'overview',
          title: '핵심',
          blocks: [
            {
              type: 'paragraph',
              text: '공식 Reading의 확인된 의미입니다.',
            },
          ],
          state: 'complete',
        },
      ],
      disclosures: [],
      generatedAt: '2026-09-21T00:00:00.000Z',
    },
  };
}

function projectionRequest() {
  return {
    response: deliveredResponse(),
    engineVersion: 'saju-engine-http-v1',
    readingDomain: 'general',
  };
}

describe('Character grounding HTTP projection contract', () => {
  it('projects a delivered ProductReadingResponse through the Saju-owned builder', () => {
    const bundle = projectCharacterGroundingHttpRequestV1(projectionRequest());

    expect(bundle.readingRef).toBe('official-reading-http-1');
    expect(bundle.productResponseVersion).toBe(
      'myeonghwa-product-reading-response-v2',
    );
    expect(bundle.engineVersion).toBe('saju-engine-http-v1');
    expect(bundle.readingDomain).toBe('general');
    expect(bundle.units[0]?.canonicalMeaning).toBe(
      '공식 Reading의 확인된 의미입니다.',
    );
    expect(bundle.sourceResponseHash).toMatch(/^[0-9a-f]{64}$/u);
    expect(bundle.groundingHash).toMatch(/^[0-9a-f]{64}$/u);
  });

  it.each([
    ['readerCharacterId', 'baekheon'],
    ['subjectId', 'subject-1'],
    ['entitlementId', 'entitlement-1'],
    ['grantId', 'grant-1'],
    ['characterPerspective', { attentionAxes: ['timing'] }],
  ])('rejects extra authority-bearing request field %s', (field, value) => {
    expect(() =>
      projectCharacterGroundingHttpRequestV1({
        ...projectionRequest(),
        [field]: value,
      }),
    ).toThrow(CharacterGroundingHttpRequestError);
  });

  it('rejects an unsupported Reading domain through the source-owned builder', () => {
    expect(() =>
      projectCharacterGroundingHttpRequestV1({
        ...projectionRequest(),
        readingDomain: 'caller_defined_domain',
      }),
    ).toThrow(CharacterGroundingHttpRequestError);
  });

  it('rejects a non-delivered ProductReadingResponse', () => {
    expect(() =>
      projectCharacterGroundingHttpRequestV1({
        ...projectionRequest(),
        response: {
          ...deliveredResponse(),
          state: 'temporarily_unavailable',
          messageCode: 'READING_TEMPORARILY_UNAVAILABLE',
          requiredAction: 'try_again_later',
          reading: undefined,
        },
      }),
    ).toThrow(CharacterGroundingHttpRequestError);
  });
});

describe('Character grounding authenticated host route', () => {
  const openServers: Server[] = [];

  afterEach(async () => {
    await Promise.all(
      openServers.splice(0).map(
        (server) =>
          new Promise<void>((resolve) => {
            server.close(() => resolve());
          }),
      ),
    );
  });

  async function startServer() {
    const readingHost: MyeonghwaProductHost = {
      async requestReading() {
        throw new Error('Reading route is not used by this test.');
      },
    };
    const server = createMyeonghwaProductionPreviewHostServer(readingHost, {
      serviceBearer: 'grounding-secret',
    });
    openServers.push(server);
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');
    const address = server.address() as AddressInfo;
    return `http://127.0.0.1:${String(address.port)}`;
  }

  it('requires the service bearer before projecting grounding', async () => {
    const origin = await startServer();

    const response = await fetch(`${origin}${CHARACTER_GROUNDING_HTTP_PATH}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(projectionRequest()),
    });

    expect(response.status).toBe(401);
  });

  it('does not expose the grounding route on the calculation-only production host', async () => {
    const server = createMyeonghwaProductionCalculationHostServer({
      serviceBearer: 'calculation-secret',
    });
    openServers.push(server);
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');
    const address = server.address() as AddressInfo;
    const origin = `http://127.0.0.1:${String(address.port)}`;

    const response = await fetch(`${origin}${CHARACTER_GROUNDING_HTTP_PATH}`, {
      method: 'POST',
      headers: {
        authorization: 'Bearer calculation-secret',
        'content-type': 'application/json',
      },
      body: JSON.stringify(projectionRequest()),
    });

    expect(response.status).toBe(404);
    expect(response.headers.get(CHARACTER_GROUNDING_ADMISSION_HEADER)).toBeNull();
  });

  it('returns an attested CharacterGroundingBundleV1 for an authenticated request', async () => {
    const origin = await startServer();

    const response = await fetch(`${origin}${CHARACTER_GROUNDING_HTTP_PATH}`, {
      method: 'POST',
      headers: {
        authorization: 'Bearer grounding-secret',
        'content-type': 'application/json',
      },
      body: JSON.stringify(projectionRequest()),
    });

    expect(response.status).toBe(200);
    expect(response.headers.get(CHARACTER_GROUNDING_ADMISSION_HEADER)).toBe(
      CHARACTER_GROUNDING_ADMISSION_VERSION,
    );
    const body = (await response.json()) as {
      readingRef?: unknown;
      groundingHash?: unknown;
    };
    expect(body.readingRef).toBe('official-reading-http-1');
    expect(body.groundingHash).toMatch(/^[0-9a-f]{64}$/u);
  });
});
