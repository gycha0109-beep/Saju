import type { AddressInfo } from 'node:net';
import { describe, expect, it } from 'vitest';
import {
  buildFamilyObservationReadingPreview,
  FAMILY_OBSERVATION_READING_PREVIEW_VERSION,
} from '../src/host/family-observation-reading-preview.js';
import {
  createMyeonghwaProductionPreviewHostServer,
  createMyeonghwaProductionProductHostServer,
  PRODUCT_PREVIEW_FAMILY_HTTP_PATH,
} from '../src/host/http-server.js';

const birth = {
  calendarType: 'solar', date: '1990-05-15', time: '14:30', sex: 'male',
};

describe('family source-bounded separate parent/child read preview', () => {
  it('reuses the original distinct parent/child Korean source text and exact calculation provenance', () => {
    const parents = buildFamilyObservationReadingPreview({ birth, scope: 'parents' });
    const children = buildFamilyObservationReadingPreview({ birth, scope: 'children' });
    expect(parents.previewVersion).toBe(FAMILY_OBSERVATION_READING_PREVIEW_VERSION);
    expect(parents.report.scope).toBe('parents');
    expect(children.report.scope).toBe('children');
    expect(parents.report.snapshotId).toBe(children.report.snapshotId);
    expect(parents.report.observations.map(o => o.pillarSlot)).toEqual(['year', 'month']);
    expect(children.report.observations.map(o => o.pillarSlot)).toEqual(['hour']);
    expect(parents.report.introduction).toContain('부모');
    expect(children.report.introduction).toContain('자녀');
    expect(parents.report.observations.every(o => o.text.includes('명식'))).toBe(true);
    expect(parents.report.interpretationCoverage).toBe('insufficient_evidence');
    expect(children.report.interpretationCoverage).toBe('insufficient_evidence');
    expect(parents.generatedInterpretationClaims).toBe(false);
    expect(children.mayPublish).toBe(false);
    expect(parents.maySell).toBe(false);
  });

  it('keeps unknown birth time from becoming an invented child observation', () => {
    const unknown = buildFamilyObservationReadingPreview({
      birth: { ...birth, time: null }, scope: 'children',
    });
    expect(unknown.report.observationCoverage).toBe('insufficient_input');
    expect(unknown.report.observations[0]?.state).not.toBe('resolved');
    expect(unknown.report.observations[0]?.text).toContain('확정되지');
    expect(unknown.report.missing.join(' ')).toContain('명식');
    expect(() => buildFamilyObservationReadingPreview({ birth, scope: 'all' }))
      .toThrow('exact parents/children');
    expect(() => buildFamilyObservationReadingPreview({
      birth, scope: 'parents', claimedFate: 'certain',
    })).toThrow('exact parents/children');
  });

  it('limits the factual family Preview route to authorized Preview servers', async () => {
    const host = { async requestReading() {
      throw new TypeError('Family observation may not upgrade product semantics');
    } };
    const preview = createMyeonghwaProductionPreviewHostServer(host, {
      serviceBearer: 'family-observations-test-token',
    });
    const production = createMyeonghwaProductionProductHostServer(host, {
      serviceBearer: 'family-observations-test-token',
    });
    await Promise.all([preview, production].map(s =>
      new Promise<void>(resolve => s.listen(0, '127.0.0.1', resolve)),
    ));
    const url = (s: typeof preview) =>
      'http://127.0.0.1:' + (s.address() as AddressInfo).port +
      PRODUCT_PREVIEW_FAMILY_HTTP_PATH;
    const post = (s: typeof preview, token?: string) => fetch(url(s), {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(token === undefined ? {} : { authorization: 'Bearer ' + token }),
      },
      body: JSON.stringify({ birth, scope: 'children' }),
    });
    try {
      expect((await post(preview)).status).toBe(401);
      expect((await post(production, 'family-observations-test-token')).status).toBe(404);
      const response = await post(preview, 'family-observations-test-token');
      expect(response.status).toBe(200);
      expect(response.headers.get('x-myeonghwa-reading-lifecycle')).toBe('preview');
      expect(response.headers.get('cache-control')).toBe('no-store');
      const report = await response.json() as ReturnType<typeof buildFamilyObservationReadingPreview>;
      expect(report.report.scope).toBe('children');
      expect(report.report.observations[0]?.pillarSlot).toBe('hour');
      expect(report.state).toBe('insufficient_evidence');
    } finally {
      await Promise.all([preview, production].map(s =>
        new Promise<void>((resolve, reject) =>
          s.close(err => err ? reject(err) : resolve()),
        ),
      ));
    }
  });
});
