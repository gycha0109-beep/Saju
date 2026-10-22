import type { AddressInfo } from 'node:net';
import { describe, expect, it } from 'vitest';
import {
  buildTwoPersonCompatibilityCalculationPreview,
  COMPATIBILITY_CALCULATION_PREVIEW_VERSION,
} from '../src/host/compatibility-calculation-preview.js';
import {
  createMyeonghwaProductionPreviewHostServer,
  createMyeonghwaProductionProductHostServer,
  PRODUCT_PREVIEW_COMPATIBILITY_CALCULATION_HTTP_PATH,
} from '../src/host/http-server.js';

const ownBirth = {
  calendarType: 'solar', date: '1984-01-07', time: '12:30', sex: 'unspecified',
};
const otherBirth = {
  calendarType: 'solar', date: '1999-05-13', time: null, sex: 'unspecified',
};
const both = { birth: ownBirth, partnerBirth: otherBirth };

describe('two-chart compatibility evidence boundary', () => {
  it('calculates each subject under the same governed policy without implying a T10 relationship claim', () => {
    const result = buildTwoPersonCompatibilityCalculationPreview(both);
    expect(result.version).toBe(COMPATIBILITY_CALCULATION_PREVIEW_VERSION);
    expect(result.state).toBe('insufficient_evidence');
    expect(result.coverage).toBe('calculation_facts_only');
    expect(result.subjects.map(subject => subject.role)).toEqual(['self', 'partner']);
    expect(result.subjects[0]?.snapshotId).not.toBe(result.subjects[1]?.snapshotId);
    expect(result.subjects[0]?.calculationHash).not.toBe(result.subjects[1]?.calculationHash);
    expect(result.subjects[0]?.policyId).toBe(result.subjects[1]?.policyId);
    expect(result.subjects[0]?.birthTimeKnown).toBe(true);
    expect(result.subjects[1]?.birthTimeKnown).toBe(false);
    expect(result.subjects[0]?.pillars.year).toHaveProperty('status', 'resolved');
    expect(result.subjects[1]?.pillars.hour).not.toHaveProperty('status', 'resolved');
    expect(result.explanation).toContain('근거 부족');
    expect(result.generatedInterpretationClaims).toBe(false);
    expect(result.mayPublish).toBe(false);
    expect(result.maySell).toBe(false);
    expect(buildTwoPersonCompatibilityCalculationPreview(both).subjects).toEqual(result.subjects);
  });

  it('rejects missing, malformed and injected second-person information', () => {
    expect(() => buildTwoPersonCompatibilityCalculationPreview({
      birth: ownBirth,
    })).toThrow(/birth and partnerBirth/u);
    expect(() => buildTwoPersonCompatibilityCalculationPreview({
      ...both, approvedCompatibilityScore: 100,
    })).toThrow(/birth and partnerBirth/u);
    expect(() => buildTwoPersonCompatibilityCalculationPreview({
      ...both, partnerBirth: { ...otherBirth, date: '1999-02-30' },
    })).toThrow(/valid solar date/u);
  });

  it('makes the two-person transport accessible only on authenticated Preview servers', async () => {
    const host = { async requestReading() {
      throw new TypeError('No interpretation access from compatibility calculation preview');
    } };
    const previewServer = createMyeonghwaProductionPreviewHostServer(host, {
      serviceBearer: 'compat-preview-token',
    });
    const productionServer = createMyeonghwaProductionProductHostServer(host, {
      serviceBearer: 'compat-preview-token',
    });
    await Promise.all([previewServer, productionServer].map(server =>
      new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve)),
    ));
    const previewAddress = previewServer.address() as AddressInfo;
    const productionAddress = productionServer.address() as AddressInfo;
    const url = (port: number) =>
      `http://127.0.0.1:${port}${PRODUCT_PREVIEW_COMPATIBILITY_CALCULATION_HTTP_PATH}`;
    const call = (port: number, token?: string) => fetch(url(port), {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(token === undefined ? {} : { authorization: 'Bearer ' + token }),
      },
      body: JSON.stringify(both),
    });
    try {
      const forbidden = await call(previewAddress.port);
      expect(forbidden.status).toBe(401);
      const absent = await call(productionAddress.port, 'compat-preview-token');
      expect(absent.status).toBe(404);
      const found = await call(previewAddress.port, 'compat-preview-token');
      expect(found.status).toBe(200);
      expect(found.headers.get('x-myeonghwa-reading-lifecycle')).toBe('preview');
      expect(found.headers.get('cache-control')).toBe('no-store');
      const body = await found.json() as ReturnType<typeof buildTwoPersonCompatibilityCalculationPreview>;
      expect(body.subjects).toHaveLength(2);
      expect(body.state).toBe('insufficient_evidence');
      expect(body.generatedInterpretationClaims).toBe(false);
    } finally {
      await Promise.all([previewServer, productionServer].map(server =>
        new Promise<void>((resolve, reject) => server.close(error =>
          error ? reject(error) : resolve())),
      ));
    }
  });
});
