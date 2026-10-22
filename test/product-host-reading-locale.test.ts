import type { AddressInfo } from 'node:net';
import { describe, expect, it } from 'vitest';
import type { CanonicalSajuSnapshot } from '../src/contracts/calculation.js';
import { normalizeConsumerReadingRequest } from '../src/reading/consumer-reading-request-adapter.js';
import {
  createMyeonghwaPreviewNatalFiveDomainHost,
  createMyeonghwaProductHost,
  parseProductHostReadingRequest,
  type MyeonghwaProductHostDependencies,
} from '../src/host/product-host.js';
import { createMyeonghwaProductHostServer } from '../src/host/http-server.js';
import { PRODUCT_HOST_APP_SCRIPT, PRODUCT_HOST_PAGE } from '../src/host/static-page.js';

const birth = {
  calendarType: 'solar',
  date: '2024-03-10',
  time: '12:00',
  sex: 'unspecified',
} as const;

function noCalculationDependencies(calls: { calculate: number }): MyeonghwaProductHostDependencies {
  return {
    calculate: () => {
      calls.calculate += 1;
      throw new Error('Calculation must not run for unsupported reading locale.');
    },
    interpret: () => {
      throw new Error('Interpretation must not run for unsupported reading locale.');
    },
    readingOptions: { outputSchemaVersion: 'test', readingVersion: 'test' },
  };
}

describe('Reading locale separation in existing product host', () => {
  it('keeps legacy Korean requests byte-compatible and accepts explicit Korean reading locale', () => {
    const legacy = parseProductHostReadingRequest({ birth, reading: { text: '재물운' } });
    expect(legacy.reading).toEqual({ text: '재물운' });
    expect(legacy).not.toHaveProperty('uiLocale');

    const explicit = parseProductHostReadingRequest({
      birth,
      uiLocale: 'en-US',
      reading: { text: '재물운', readingLocale: 'ko-KR' },
    });
    expect(explicit.uiLocale).toBe('en-US');
    expect(explicit.reading).toEqual({ text: '재물운', readingLocale: 'ko-KR' });
    expect(explicit.birth).toEqual(legacy.birth);
  });

  it('does not silently use Korean output for an unavailable foreign reading locale', () => {
    for (const locale of ['en-US', 'ja-JP', 'zh-CN', 'zh-TW', 'vi-VN', 'ms-MY', 'id-ID']) {
      expect(() => parseProductHostReadingRequest({
        birth, uiLocale: 'ko-KR', reading: { text: '사주', readingLocale: locale },
      })).toThrow(/not available yet/u);
    }
    expect(() => parseProductHostReadingRequest({
      birth, uiLocale: 'en-US', reading: { text: '사주' },
    })).toThrow(/not available yet/u);
    expect(() => parseProductHostReadingRequest({
      birth, uiLocale: 'en-US', reading: { text: '사주', readingLocale: 'ko-KR' },
    })).not.toThrow();
  });

  it('rejects malformed or unregistered locale identifiers without fallback', () => {
    for (const badLocale of ['ko', 'en-GB', 'fr-FR', '', 7, null]) {
      expect(() => parseProductHostReadingRequest({
        birth, uiLocale: badLocale, reading: { text: '사주', readingLocale: 'ko-KR' },
      })).toThrow();
    }
    expect(() => parseProductHostReadingRequest({
      birth, uiLocale: 'fr-FR', reading: { text: '사주', readingLocale: 'ko-KR' },
    })).toThrow();
    expect(() => parseProductHostReadingRequest({
      birth, reading: { text: '사주', readingLocale: 'ko' },
    })).toThrow();
    expect(() => parseProductHostReadingRequest({
      birth, reading: { text: '사주', readingLocale: null },
    })).toThrow();
  });

  it('rejects foreign reading language before any calculation in single and five-domain host', async () => {
    const calls = { calculate: 0 };
    const dependencies = noCalculationDependencies(calls);
    const host = createMyeonghwaProductHost(dependencies);
    const fiveDomainHost = createMyeonghwaPreviewNatalFiveDomainHost(dependencies);

    await expect(host.requestReading({
      birth, uiLocale: 'ko-KR', reading: { text: '재물운', readingLocale: 'ja-JP' },
    })).rejects.toMatchObject({ code: 'INVALID_READING_REQUEST' });
    await expect(fiveDomainHost.requestNatalFiveDomains({
      birth, uiLocale: 'ko-KR', readingLocale: 'en-US',
    })).rejects.toMatchObject({ code: 'INVALID_READING_REQUEST' });
    await expect(fiveDomainHost.requestNatalFiveDomains({
      birth, uiLocale: 'en-US',
    })).rejects.toMatchObject({ code: 'INVALID_READING_REQUEST' });
    expect(calls.calculate).toBe(0);
  });

  it('passes the explicitly selected Korean reading locale through normalized ReadingRequest', async () => {
    const normalized = normalizeConsumerReadingRequest({
      requestId: 'reading-locale-normalized',
      text: '재물운',
      readingLocale: 'ko-KR',
    });
    expect(normalized.state).toBe('resolved');
    expect(normalized.request?.readingLocale).toBe('ko-KR');
    expect(normalized.request?.intent).toEqual({ domain: 'wealth', temporalScope: 'natal' });

    const observed: string[] = [];
    const host = createMyeonghwaProductHost({
      calculate: () => ({} as CanonicalSajuSnapshot),
      interpret: (_snapshot, _context, _temporal, readingRequest) => {
        observed.push(readingRequest?.readingLocale ?? 'missing');
        throw new Error('STOP_AFTER_NORMALIZATION');
      },
      readingOptions: { outputSchemaVersion: 'test', readingVersion: 'test' },
    });
    await expect(host.requestReading({
      birth,
      uiLocale: 'en-US',
      reading: { text: '재물운', readingLocale: 'ko-KR' },
    })).rejects.toThrow('STOP_AFTER_NORMALIZATION');
    expect(observed).toEqual(['ko-KR']);

    const implicit = normalizeConsumerReadingRequest({
      requestId: 'reading-locale-implicit',
      text: '재물운',
    });
    expect(implicit.request).not.toHaveProperty('readingLocale');
    expect(implicit.request?.intent).toEqual(normalized.request?.intent);

    const foreign = normalizeConsumerReadingRequest({
      requestId: 'direct-reading-service-foreign-locale',
      text: '재물운',
      readingLocale: 'ja-JP',
    });
    expect(foreign.state).toBe('invalid');
    expect(foreign.request).toBeUndefined();
    expect(foreign.reasonCodes).toContain('READING_LOCALE_NOT_AVAILABLE');
  });

  it('returns an explicit 400 response for unsupported reading language over the existing HTTP route', async () => {
    const calls = { calculate: 0 };
    const server = createMyeonghwaProductHostServer(noCalculationDependencies(calls));
    await new Promise<void>((resolve, reject) => {
      server.once('error', reject);
      server.listen(0, '127.0.0.1', () => resolve());
    });
    const address = server.address() as AddressInfo;
    try {
      const response = await fetch('http://127.0.0.1:' + address.port + '/api/readings', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          birth,
          uiLocale: 'ko-KR',
          reading: { text: '재물운', readingLocale: 'id-ID' },
        }),
      });
      expect(response.status).toBe(400);
      const payload = await response.json() as { error: { code: string } };
      expect(payload.error.code).toBe('HOST_INVALID_READING_REQUEST');
      expect(calls.calculate).toBe(0);
    } finally {
      await new Promise<void>((resolve, reject) => {
        server.close((error) => error === undefined ? resolve() : reject(error));
      });
    }
  });

  it('presents separate screen/reading language fields and transmits both without enabling unsupported languages', () => {
    expect(PRODUCT_HOST_PAGE).toContain('id="ui-locale"');
    expect(PRODUCT_HOST_PAGE).toContain('id="reading-locale"');
    expect(PRODUCT_HOST_PAGE).toContain('value="vi-VN" disabled');
    expect(PRODUCT_HOST_PAGE).toContain('value="en-US" disabled');
    expect(PRODUCT_HOST_PAGE).toContain('value="ko-KR"');
    expect(PRODUCT_HOST_APP_SCRIPT).toContain("const uiLocale = document.getElementById('ui-locale')");
    expect(PRODUCT_HOST_APP_SCRIPT).toContain("const readingLocale = document.getElementById('reading-locale')");
    expect(PRODUCT_HOST_APP_SCRIPT).toContain('function currentLocales()');
    expect(PRODUCT_HOST_APP_SCRIPT).toContain('readingLocale: currentLocales().readingLocale');
    expect(PRODUCT_HOST_APP_SCRIPT).toContain('uiLocale: currentLocales().uiLocale');
    expect(PRODUCT_HOST_APP_SCRIPT).toContain('...currentLocales()');
  });
});
