import { describe, expect, it } from 'vitest';
import { createMyeonghwaSourceReadingProofHost } from '../src/host/product-host.js';
import { createApprovedSourceProofPreviewDependenciesV1 } from '../src/preview/preview-product-host.js';

import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
} from '../src/research/relationship-spouse-t8-day-branch-palace-claim-narrative-profile-materialization.js';
import { createApprovedPreviewE2eProductHost } from '../src/preview/preview-product-host.js';

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
  it('keeps spouse Source Proof aligned with the bounded Preview-only day-branch interpretation', async () => {
    const now = new Date('2026-10-13T00:00:00.000Z');
    const source = createMyeonghwaSourceReadingProofHost(
      createApprovedSourceProofPreviewDependenciesV1(now),
    );
    const body = { birth: BIRTH, reading: { text: '배우자운' } };
    const [sourceResult, previewResult] = await Promise.all([
      source.requestReadingWithProofReadiness(body),
      createApprovedPreviewE2eProductHost().requestReading(body),
    ]);
    expect(previewResult.state).toBe('delivered');
    expect(sourceResult.response.state).toBe('delivered');
    for (const response of [sourceResult.response, previewResult]) {
      const serialized = JSON.stringify(response);
      expect(serialized).toContain(
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
      );
      expect(serialized).toContain(
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
      );
      for (const phrase of RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES) {
        expect(serialized).not.toContain(phrase);
      }
    }
    expect(sourceResult.readiness.productionInterpretationAuthority).toBe('NOT_EVALUATED');
    expect(sourceResult.readiness.releaseAuthorization).toBe('NOT_EVALUATED');
    expect(sourceResult.readiness.canExecute).toBe(false);
    expect(sourceResult.readiness.canPublish).toBe(false);
    expect(sourceResult.readiness.canSell).toBe(false);
  });
});
