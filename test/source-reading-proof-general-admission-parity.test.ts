import { describe, expect, it } from 'vitest';
import { createMyeonghwaSourceReadingProofHost } from '../src/host/product-host.js';
import { createApprovedSourceProofPreviewDependenciesV1 } from '../src/preview/preview-product-host.js';

const BIRTH = {
  calendarType: 'solar',
  date: '2024-03-10',
  time: '12:00',
  sex: 'unspecified',
} as const;

describe('Preview Source Reading Proof domain admission parity', () => {
  it('uses bounded General Natal T8 instead of unadmitted compound synthesis in a real source-proof execution', async () => {
    const source = createMyeonghwaSourceReadingProofHost(
      createApprovedSourceProofPreviewDependenciesV1(new Date('2026-10-13T00:00:00.000Z')),
    );

    const general = await source.requestReadingWithProofReadiness({
      birth: BIRTH,
      reading: { text: '전체 사주' },
    });
    expect(general.response.state).toBe('delivered');
    expect(general.response.reading?.readingId).toMatch(/^official_reading_/u);
    const actual = JSON.stringify(general.response);
    expect(actual).toContain('월지');
    expect(actual).not.toContain(
      '여러 가지를 두루 생각하지만, 결국 직접 해보고 결과를 만들어야',
    );
    expect(general.readiness.productionInterpretationAuthority).toBe('NOT_EVALUATED');
    expect(general.readiness.releaseAuthorization).toBe('NOT_EVALUATED');
    expect(general.readiness.canPublish).toBe(false);
    expect(general.readiness.canSell).toBe(false);

    // Keep existing specialist coverage unchanged by the General admission fix.
    const career = await source.requestReadingWithProofReadiness({
      birth: BIRTH,
      reading: { text: '직업운' },
    });
    expect(career.response.state).toBe('delivered');
    expect(JSON.stringify(career.response)).toContain('일의 동력');
    expect(career.readiness.canSell).toBe(false);

    const unsupported = await source.requestReadingWithProofReadiness({
      birth: BIRTH,
      reading: { text: '올해 운세' },
    });
    expect(unsupported.response.state).not.toBe('delivered');
    expect(unsupported.readiness.state).toBe('blocked');
  });
});
