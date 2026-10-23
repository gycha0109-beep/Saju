import type { AddressInfo } from 'node:net';
import { describe, expect, it } from 'vitest';
import type { MyeonghwaProductHost } from '../src/host/product-host.js';
import {
  createMyeonghwaProductionPreviewHostServer,
  createMyeonghwaProductionProductHostServer,
  PRODUCT_PREVIEW_COMPATIBILITY_CHARTS_HTTP_PATH,
} from '../src/host/http-server.js';

const host: MyeonghwaProductHost = {
  async requestReading() {
    throw new Error('No public reading route is required for a protected calculation-only preview.');
  },
};
const ownBirth = {
  calendarType: 'solar', date: '1990-05-15', time: '14:30', sex: 'unspecified',
};
const partnerBirth = {
  calendarType: 'solar', date: '1996-01-09', time: '09:30', sex: 'unspecified',
};
type Person = {
  role: string;
  pillars: Record<'year' | 'month' | 'day' | 'hour', { status: string; value?: string }>;
};
type Result = {
  lifecycle: string;
  coverage: string;
  generatedInterpretationClaims: boolean;
  mayPublish: boolean;
  mayPersist: boolean;
  maySell: boolean;
  subjects: Person[];
  explanation: string;
  limitations: string[];
};

async function withHost(
  kind: 'preview' | 'production',
  test: (url: string, bearer: string) => Promise<void>,
) {
  const bearer = 'test-preview-only-secret';
  const server = kind === 'preview'
    ? createMyeonghwaProductionPreviewHostServer(host, { serviceBearer: bearer })
    : createMyeonghwaProductionProductHostServer(host, { serviceBearer: bearer });
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = 'http://127.0.0.1:' + (server.address() as AddressInfo).port +
    PRODUCT_PREVIEW_COMPATIBILITY_CHARTS_HTTP_PATH;
  try {
    await test(url, bearer);
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close(err => err ? reject(err) : resolve()));
  }
}

describe('existing compatibility browser route stays protected and research-only', () => {
  it('returns two real separate calculated charts but never a T10 interpretation', async () => {
    await withHost('preview', async (url, bearer) => {
      const unauthed = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ birth: ownBirth, partnerBirth }),
      });
      expect(unauthed.status).toBe(401);
      const result = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json',
          authorization: 'Bearer ' + bearer },
        body: JSON.stringify({ birth: ownBirth, partnerBirth }),
      });
      expect(result.status).toBe(200);
      expect(result.headers.get('x-myeonghwa-reading-lifecycle')).toBe('preview');
      expect(result.headers.get('cache-control')).toBe('no-store');
      const body = await result.json() as Result;
      expect(body.lifecycle).toBe('internal_preview_only');
      expect(body.coverage).toBe('calculation_facts_only');
      expect(body.generatedInterpretationClaims).toBe(false);
      expect(body.mayPublish).toBe(false);
      expect(body.mayPersist).toBe(false);
      expect(body.maySell).toBe(false);
      expect(body.subjects.map(person => person.role)).toEqual(['self','partner']);
      expect(body.subjects[0]!.pillars.year.status).toBe('resolved');
      expect(body.subjects[1]!.pillars.year.status).toBe('resolved');
      expect(body.subjects[0]!.pillars.year.value)
        .not.toEqual(body.subjects[1]!.pillars.year.value);
      expect(Object.keys(body.subjects[0]!.pillars)).toEqual([
        'year', 'month', 'day', 'hour',
      ]);
      expect(body.explanation).toContain('T10 궁합 해석');
      expect(body.limitations.length).toBeGreaterThan(0);
      const serialized = JSON.stringify(body);
      expect(serialized).not.toContain('personalRelationship');
      // Research handoffs must not widen the existing authenticated Preview
      // transport or become source-certified T10 compatibility assertions.
      expect(Object.keys(body).sort()).toEqual([
        'coverage', 'explanation', 'generatedInterpretationClaims', 'lifecycle',
        'limitations', 'mayPersist', 'mayPublish', 'maySell', 'subjects',
      ]);
      expect(serialized).not.toContain('sourceScopeHandoff');
      expect(serialized).not.toContain('comparedSourceSurfaces');
      expect(serialized).not.toContain('eligiblePairwiseClaim');
      expect(serialized).not.toContain('pairwiseT10Admitted');
      expect(serialized).not.toContain('R068_R069');
    });
  });

  it('holds an unknown partner birth hour without borrowing the first person\'s hour', async () => {
    await withHost('preview', async (url, bearer) => {
      const result = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json',
          authorization: 'Bearer ' + bearer },
        body: JSON.stringify({
          birth: ownBirth, partnerBirth: { ...partnerBirth, time: null },
        }),
      });
      expect(result.status).toBe(200);
      const body = await result.json() as Result;
      expect(body.subjects[0]!.pillars.hour.status).toBe('resolved');
      expect(body.subjects[1]!.pillars.hour.status).toBe('unavailable');
      expect(body.subjects[1]!.pillars.hour.value).toBeUndefined();
      expect(body.generatedInterpretationClaims).toBe(false);
    });
  });

  it('rejects forged extra fields, missing other person and unsupported verbs', async () => {
    await withHost('preview', async (url, bearer) => {
      const headers = { 'content-type': 'application/json',
        authorization: 'Bearer ' + bearer };
      for (const payload of [
        { birth: ownBirth },
        { birth: ownBirth, partnerBirth, compatibilityScore: 99 },
        { birth: ownBirth, partnerBirth: { ...partnerBirth, forged: true } },
      ]) {
        const result = await fetch(url, { method: 'POST',
          headers, body: JSON.stringify(payload) });
        expect(result.status).toBe(400);
      }
      const method = await fetch(url, { headers: {
        authorization: 'Bearer ' + bearer,
      } });
      expect(method.status).toBe(405);
    });
  });

  it('does not expose the preview route from a production reading host', async () => {
    await withHost('production', async (url, bearer) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json',
          authorization: 'Bearer ' + bearer },
        body: JSON.stringify({ birth: ownBirth, partnerBirth }),
      });
      expect(response.status).toBe(404);
    });
  });
});
