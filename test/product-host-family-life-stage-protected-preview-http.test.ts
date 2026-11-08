import type { AddressInfo } from 'node:net';
import { describe, expect, it } from 'vitest';
import type { MyeonghwaProductHost } from '../src/host/product-host.js';
import {
  createMyeonghwaProductionPreviewHostServer,
  createMyeonghwaProductionProductHostServer,
  PRODUCT_PREVIEW_FAMILY_OBSERVATIONS_HTTP_PATH,
  PRODUCT_PREVIEW_LIFE_STAGE_HTTP_PATH,
} from '../src/host/http-server.js';

const host: MyeonghwaProductHost = {
  async requestReading() {
    throw new Error('This test uses protected research-only paths.');
  },
};
const birth = {
  calendarType: 'solar', date: '1990-05-15', time: '14:30', sex: 'male',
};
const headers = {
  'content-type': 'application/json',
  authorization: 'Bearer protected-preview-test-token',
};
async function withServer(
  kind: 'preview' | 'production',
  execute: (baseUrl: string) => Promise<void>,
) {
  const options = { serviceBearer: 'protected-preview-test-token' };
  const server = kind === 'preview'
    ? createMyeonghwaProductionPreviewHostServer(host, options)
    : createMyeonghwaProductionProductHostServer(host, options);
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve));
  try {
    await execute('http://127.0.0.1:' + (server.address() as AddressInfo).port);
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close(error => error ? reject(error) : resolve()));
  }
}
function post(_path: string, data: unknown, authenticated = true) {
  return {
    method: 'POST',
    headers: authenticated ? headers : { 'content-type': 'application/json' },
    body: JSON.stringify(data),
  };
}

describe('family and life-stage protected menu Preview transports', () => {
  it('serves independent parent and child calculated facts without family T8 authority', async () => {
    await withServer('preview', async base => {
      const url = base + PRODUCT_PREVIEW_FAMILY_OBSERVATIONS_HTTP_PATH;
      for (const scope of ['parents', 'children'] as const) {
        const response = await fetch(url, post(url, { birth, scope }));
        expect(response.status).toBe(200);
        expect(response.headers.get('cache-control')).toBe('no-store');
        expect(response.headers.get('x-myeonghwa-reading-lifecycle')).toBe('preview');
        const data = await response.json() as {
          lifecycle: string;
          scope: string;
          mayClaimFamilyOutcome: boolean;
          mayPublish: boolean;
          mayPersist: boolean;
          maySell: boolean;
          report: {
            scope: string; observationSummary: string;
            interpretationCoverage: string; researchOnly: boolean;
            observations: Array<{ pillarSlot: string; text: string }>;
          };
        };
        expect(data.lifecycle).toBe('internal_research_only');
        expect(data.scope).toBe(scope);
        expect(data.report.scope).toBe(scope);
        expect(data.report.researchOnly).toBe(true);
        expect(data.report.interpretationCoverage).toBe('insufficient_evidence');
        expect(data.mayClaimFamilyOutcome).toBe(false);
        expect(data.mayPublish).toBe(false);
        expect(data.mayPersist).toBe(false);
        expect(data.maySell).toBe(false);
        expect(data.report.observations.map(x => x.pillarSlot))
          .toEqual(scope === 'parents' ? ['year', 'month'] : ['hour']);
        expect(data.report.observationSummary).toContain('본인 명식');
      }
    });
  });

  it('returns exact Dayun period and same-person source-bound natal context, never time outcomes', async () => {
    await withServer('preview', async base => {
      const url = base + PRODUCT_PREVIEW_LIFE_STAGE_HTTP_PATH;
      const response = await fetch(url, post(url, { birth }));
      expect(response.status).toBe(200);
      const data = await response.json() as {
        lifecycle: string; researchOnly: boolean;
        interpretationStatus: string;
        mayPublish: boolean; mayPersist: boolean; maySell: boolean;
        mayGrantOfficialAuthority: boolean;
        report: {
          snapshotId: string; calculationHash: string; researchOnly: boolean;
          interpretationStatus: string;
          periods: Array<{ kind: string; pillar: string; text: string }>;
          missing: string[];
        };
        natalContext: {
          snapshotId: string; calculationHash: string;
          availability: string;
          sections: Array<{ paragraph: string; sourceIds: string[]; factPaths: string[] }>;
        };
      };
      expect(data.lifecycle).toBe('internal_research_only');
      expect(data.researchOnly).toBe(true);
      expect(data.mayPublish).toBe(false);
      expect(data.mayPersist).toBe(false);
      expect(data.maySell).toBe(false);
      expect(data.mayGrantOfficialAuthority).toBe(false);
      expect(data.interpretationStatus).toBe('source_authority_not_established');
      expect(data.report.interpretationStatus).toBe('source_authority_not_established');
      expect(data.natalContext.snapshotId).toBe(data.report.snapshotId);
      expect(data.natalContext.calculationHash).toBe(data.report.calculationHash);
      expect(data.report.periods.every(x => ['current', 'next'].includes(x.kind))).toBe(true);
      expect(data.natalContext.sections.every(x =>
        x.sourceIds.length >= 2 && x.factPaths.length >= 2)).toBe(true);
    });
  });

  it('preserves unknown birth hour and rejects unauthorized, malformed or extra input', async () => {
    await withServer('preview', async base => {
      const familyUrl = base + PRODUCT_PREVIEW_FAMILY_OBSERVATIONS_HTTP_PATH;
      const stageUrl = base + PRODUCT_PREVIEW_LIFE_STAGE_HTTP_PATH;
      const unauth = await fetch(familyUrl, post(familyUrl, {
        birth, scope: 'parents',
      }, false));
      expect(unauth.status).toBe(401);
      const wrongMethod = await fetch(stageUrl, {
        headers: { authorization: headers.authorization },
      });
      expect(wrongMethod.status).toBe(405);
      for (const invalid of [
        { birth, scope: 'all' },
        { birth, scope: 'children', isProduction: true },
        { birth: { ...birth, forged: true }, scope: 'parents' },
        { birth },
      ]) {
        const response = await fetch(familyUrl, post(familyUrl, invalid));
        expect(response.status).toBe(400);
      }
      const extra = await fetch(stageUrl, post(stageUrl, {
        birth, authorizeT8: true,
      }));
      expect(extra.status).toBe(400);
      const unknown = await fetch(familyUrl, post(familyUrl, {
        birth: { ...birth, time: null }, scope: 'children',
      }));
      expect(unknown.status).toBe(200);
      const data = await unknown.json() as {
        report: { observations: Array<{ state: string; observedPillar?: string }> };
      };
      expect(data.report.observations[0]?.state).toBe('unavailable');
      expect(data.report.observations[0]?.observedPillar).toBeUndefined();
    });
  });

  it('keeps both research transports absent on the production reading host', async () => {
    await withServer('production', async base => {
      for (const path of [
        PRODUCT_PREVIEW_FAMILY_OBSERVATIONS_HTTP_PATH,
        PRODUCT_PREVIEW_LIFE_STAGE_HTTP_PATH,
      ]) {
        const response = await fetch(base + path, post(path, { birth, scope: 'parents' }));
        expect(response.status).toBe(404);
      }
    });
  });
});
