import type { AddressInfo } from 'node:net';
import { describe, expect, it } from 'vitest';
import {
  buildLifeStageReadingPreview,
  LIFE_STAGE_READING_PREVIEW_VERSION,
} from '../src/host/life-stage-reading-preview.js';
import {
  createMyeonghwaProductionPreviewHostServer,
  createMyeonghwaProductionProductHostServer,
  PRODUCT_PREVIEW_LIFE_STAGE_HTTP_PATH,
} from '../src/host/http-server.js';

const known = {
  calendarType: 'solar', date: '1990-05-15', time: '14:30', sex: 'male',
};
const unknown = { ...known, time: null };
const ref = '2030-06-01T12:00:00+09:00';

describe('life-stage calculated-period Preview vertical slice', () => {
  it('connects an actual chart to the existing Korean current and next Dayun paragraphs', () => {
    const first = buildLifeStageReadingPreview({ birth: known }, ref);
    const second = buildLifeStageReadingPreview({ birth: known }, ref);
    expect(first.previewVersion).toBe(LIFE_STAGE_READING_PREVIEW_VERSION);
    expect(first.state).toBe('partial_evidence');
    expect(first.report.coverage).toBe('calculated_only');
    expect(first.report.periods.map(p => p.kind)).toEqual(['current', 'next']);
    expect(first.report.periods[0]?.text).toContain('현재 기준으로 명식에서 계산된 대운');
    expect(first.report.periods[1]?.text).toContain('다음 계산상 대운');
    expect(first.report.referenceLocalDateTime).toBe('2030-06-01T12:00');
    expect(first.report.snapshotId).toBe(second.report.snapshotId);
    expect(first.report.periods).toEqual(second.report.periods);
    expect(first.generatedInterpretationClaims).toBe(false);
    expect(first.maySell).toBe(false);
    expect(first.mayPublish).toBe(false);
    expect(first.explanation).toContain('별도 근거');
  });

  it('keeps the birth-hour uncertainty visible rather than inventing a current/next stage', () => {
    const result = buildLifeStageReadingPreview({ birth: unknown }, ref);
    expect(result.report.coverage).toBe('unavailable');
    expect(result.report.periods).toHaveLength(0);
    expect(result.report.missing.join(' ')).toContain('대운 계산');
    expect(result.explanation).toContain('확정하지 못했습니다');
    expect(result.generatedInterpretationClaims).toBe(false);
    expect(() => buildLifeStageReadingPreview({ birth: known, year: 2030 }, ref))
      .toThrow('one birth input');
    expect(() => buildLifeStageReadingPreview({ birth: { ...known, date: '1990-02-30' } }, ref))
      .toThrow(/valid solar date/u);
  });

  it('serves existing life-stage prose only through the protected Preview route', async () => {
    const host = { async requestReading() {
      throw new TypeError('Life-stage Preview must not use the production reading route');
    } };
    const preview = createMyeonghwaProductionPreviewHostServer(host, {
      serviceBearer: 'life-stage-test-bearer',
    });
    const production = createMyeonghwaProductionProductHostServer(host, {
      serviceBearer: 'life-stage-test-bearer',
    });
    await Promise.all([preview, production].map(s =>
      new Promise<void>(resolve => s.listen(0, '127.0.0.1', resolve)),
    ));
    const url = (s: typeof preview) =>
      'http://127.0.0.1:' + (s.address() as AddressInfo).port +
      PRODUCT_PREVIEW_LIFE_STAGE_HTTP_PATH;
    const post = (s: typeof preview, token?: string) => fetch(url(s), {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(token === undefined ? {} : { authorization: 'Bearer ' + token }),
      },
      body: JSON.stringify({ birth: known }),
    });
    try {
      const noAuth = await post(preview);
      expect(noAuth.status).toBe(401);
      const noProduction = await post(production, 'life-stage-test-bearer');
      expect(noProduction.status).toBe(404);
      const result = await post(preview, 'life-stage-test-bearer');
      expect(result.status).toBe(200);
      expect(result.headers.get('x-myeonghwa-reading-lifecycle')).toBe('preview');
      expect(result.headers.get('cache-control')).toBe('no-store');
      const payload = await result.json() as ReturnType<typeof buildLifeStageReadingPreview>;
      expect(payload.state).toBe('partial_evidence');
      expect(payload.report.researchOnly).toBe(true);
      expect(payload.report.interpretationStatus).toBe('source_authority_not_established');
      expect(payload.generatedInterpretationClaims).toBe(false);
    } finally {
      await Promise.all([preview, production].map(s =>
        new Promise<void>((resolve, reject) =>
          s.close(err => err ? reject(err) : resolve()),
        ),
      ));
    }
  });
});
