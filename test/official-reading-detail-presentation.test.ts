import { describe, expect, it } from 'vitest';

import {
  OFFICIAL_READING_DETAIL_CAPABILITY_V1,
  OFFICIAL_READING_DETAIL_PRESENTATION_POLICY_VERSION,
  resolveOfficialReadingDetailPreferenceV1,
} from '../src/reading/official-reading-detail-presentation.js';

describe('Official Reading detail presentation policy v1', () => {
  it('supports standard directly and concise conditionally on approved material', () => {
    expect(OFFICIAL_READING_DETAIL_PRESENTATION_POLICY_VERSION).toBe(
      'myeonghwa-official-reading-detail-presentation-policy-v1',
    );
    expect(OFFICIAL_READING_DETAIL_CAPABILITY_V1).toEqual({
      concise: {
        state: 'conditional',
        fallbackReason: 'missing_approved_concise_material',
      },
      standard: {
        state: 'supported',
      },
      detailed: {
        state: 'fallback_only',
        fallbackReason: 'missing_expansion_material',
      },
    });
  });

  it('resolves concise only when approved material is complete and keeps detailed on standard fallback', () => {
    expect(resolveOfficialReadingDetailPreferenceV1('standard')).toEqual({
      requestedDetail: 'standard',
      resolvedDetail: 'standard',
      resolution: 'exact',
    });
    expect(resolveOfficialReadingDetailPreferenceV1('concise')).toEqual({
      requestedDetail: 'concise',
      resolvedDetail: 'standard',
      resolution: 'fallback_to_standard',
      fallbackReason: 'missing_approved_concise_material',
    });
    expect(
      resolveOfficialReadingDetailPreferenceV1('concise', {
        conciseAvailable: true,
      }),
    ).toEqual({
      requestedDetail: 'concise',
      resolvedDetail: 'concise',
      resolution: 'exact',
    });
    expect(resolveOfficialReadingDetailPreferenceV1('detailed')).toEqual({
      requestedDetail: 'detailed',
      resolvedDetail: 'standard',
      resolution: 'fallback_to_standard',
      fallbackReason: 'missing_expansion_material',
    });
  });
});
