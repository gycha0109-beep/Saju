import { describe, expect, it } from 'vitest';

import {
  OFFICIAL_READING_DETAILED_PRODUCT_ACTIVATION_STATE_V1,
  OFFICIAL_READING_DETAIL_CAPABILITY_V1,
  OFFICIAL_READING_DETAIL_PRESENTATION_POLICY_VERSION,
  resolveOfficialReadingDetailPreferenceV1,
} from '../src/reading/official-reading-detail-presentation.js';

describe('Official Reading detail presentation policy v2', () => {
  it('supports standard directly, concise conditionally, and keeps detailed product activation closed', () => {
    expect(OFFICIAL_READING_DETAIL_PRESENTATION_POLICY_VERSION).toBe(
      'myeonghwa-official-reading-detail-presentation-policy-v2',
    );
    expect(OFFICIAL_READING_DETAILED_PRODUCT_ACTIVATION_STATE_V1).toBe(
      'pre_activation',
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
        materialState: 'conditional',
        productState: 'pre_activation',
        missingMaterialFallbackReason: 'missing_expansion_material',
        inactiveFallbackReason: 'detailed_not_activated',
      },
    });
  });

  it('separates missing detailed material from the closed product activation gate', () => {
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
    expect(
      resolveOfficialReadingDetailPreferenceV1('detailed', {
        detailedAvailable: true,
      }),
    ).toEqual({
      requestedDetail: 'detailed',
      resolvedDetail: 'standard',
      resolution: 'fallback_to_standard',
      fallbackReason: 'detailed_not_activated',
    });
    expect(
      resolveOfficialReadingDetailPreferenceV1('detailed', {
        detailedAvailable: true,
        detailedProductActivation: 'enabled',
      }),
    ).toEqual({
      requestedDetail: 'detailed',
      resolvedDetail: 'detailed',
      resolution: 'exact',
    });
  });
});
