import type { AddressInfo } from 'node:net';
import { describe, expect, it } from 'vitest';
import {
  createMyeonghwaProductionPreviewHostServer,
  createMyeonghwaProductionProductHostServer,
  PRODUCT_PREVIEW_NATAL_RESEARCH_HTML_HTTP_PATH,
} from '../src/host/http-server.js';
import { createApprovedPreviewE2eProductHost } from '../src/preview/preview-product-host.js';

const BIRTH = {
  birth: {
    calendarType: 'solar',
    date: '2024-03-10',
    time: '12:00',
    sex: 'unspecified',
  },
};
const AUTH = 'Bearer internal-natal-research-smoke';
const HEADERS = { authorization: AUTH, 'content-type': 'application/json' };

async function listen(server: ReturnType<typeof createMyeonghwaProductionPreviewHostServer>) {
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve));
  const port = (server.address() as AddressInfo).port;
  return {
    url: 'http://127.0.0.1:' + port + PRODUCT_PREVIEW_NATAL_RESEARCH_HTML_HTTP_PATH,
    close: () => new Promise<void>((resolve, reject) =>
      server.close(error => error ? reject(error) : resolve())),
  };
}

describe('actual-birth five-domain source-owned research HTML Preview route', () => {
  it('serves five original Korean research domains only with Preview auth and restrictive HTML policy', async () => {
    const host = createApprovedPreviewE2eProductHost();
    const server = createMyeonghwaProductionPreviewHostServer(host, {
      serviceBearer: AUTH.slice('Bearer '.length),
    });
    const site = await listen(server);
    try {
      const unauthorized = await fetch(site.url, {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify(BIRTH),
      });
      expect(unauthorized.status).toBe(401);
      const method = await fetch(site.url, { headers: { authorization: AUTH } });
      expect(method.status).toBe(405);
      const response = await fetch(site.url, {
        method: 'POST', headers: HEADERS, body: JSON.stringify(BIRTH),
      });
      expect(response.status).toBe(200);
      expect(response.headers.get('x-myeonghwa-reading-lifecycle')).toBe('preview');
      expect(response.headers.get('cache-control')).toBe('no-store');
      expect(response.headers.get('content-security-policy')).toContain("default-src 'none'");
      const html = await response.text();
      expect(html).toContain('나의 원국을 다섯 관점에서 읽기');
      for (const name of ['총운', '직업운', '재물운', '사업운', '관계운']) {
        expect(html).toContain(name);
      }
      expect(html).toContain('내부 연구용 미리보기');
      expect(html).toContain('출판 및 판매 불가');
    } finally {
      await site.close();
    }
  });

  it('refuses invalid birth payloads and never serves research HTML from Production-only host', async () => {
    const host = createApprovedPreviewE2eProductHost();
    const preview = createMyeonghwaProductionPreviewHostServer(host, {
      serviceBearer: AUTH.slice('Bearer '.length),
    });
    const site = await listen(preview);
    try {
      const invalid = await fetch(site.url, {
        method: 'POST', headers: HEADERS,
        body: JSON.stringify({ ...BIRTH, interpretationAuthority: 'official' }),
      });
      expect(invalid.status).toBe(400);
      const invalidBody = await invalid.json() as { error: { code: string } };
      expect(invalidBody.error.code).toBe('HOST_INVALID_REQUEST_BODY');

      const invalidDate = await fetch(site.url, {
        method: 'POST', headers: HEADERS,
        body: JSON.stringify({ birth: { ...BIRTH.birth, date: '2024-02-30' } }),
      });
      expect(invalidDate.status).toBe(400);
    } finally {
      await site.close();
    }
    const production = createMyeonghwaProductionProductHostServer(host, {
      serviceBearer: AUTH.slice('Bearer '.length),
    });
    const prodSite = await listen(production);
    try {
      const denied = await fetch(prodSite.url, {
        method: 'POST', headers: HEADERS, body: JSON.stringify(BIRTH),
      });
      expect(denied.status).toBe(404);
    } finally {
      await prodSite.close();
    }
  });
});
