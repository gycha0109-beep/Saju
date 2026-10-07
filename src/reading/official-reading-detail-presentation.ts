import type { ReadingRequest } from '../contracts/reading.js';

export const OFFICIAL_READING_DETAIL_PRESENTATION_POLICY_VERSION =
  'myeonghwa-official-reading-detail-presentation-policy-v3' as const;

export type OfficialReadingDetailPreferenceV1 = NonNullable<
  NonNullable<ReadingRequest['outputPreferences']>['preferredDetail']
>;

export type OfficialReadingDetailResolutionStateV1 =
  | 'exact'
  | 'fallback_to_standard';

export type OfficialReadingDetailFallbackReasonV1 =
  | 'missing_text_role_authority'
  | 'missing_approved_concise_material'
  | 'missing_expansion_material'
  | 'detailed_not_activated';

export type OfficialReadingDetailedProductActivationStateV1 =
  | 'pre_activation'
  | 'enabled';

export interface OfficialReadingDetailPreferenceResolutionV1 {
  requestedDetail: OfficialReadingDetailPreferenceV1;
  resolvedDetail: 'concise' | 'standard' | 'detailed';
  resolution: OfficialReadingDetailResolutionStateV1;
  fallbackReason?: OfficialReadingDetailFallbackReasonV1;
}

export interface OfficialReadingDetailResolutionOptionsV1 {
  conciseAvailable?: boolean;
  detailedAvailable?: boolean;
  detailedProductActivation?: OfficialReadingDetailedProductActivationStateV1;
}

export const OFFICIAL_READING_DETAILED_PRODUCT_ACTIVATION_STATE_V1:
  OfficialReadingDetailedProductActivationStateV1 = 'enabled';

export const OFFICIAL_READING_DETAIL_CAPABILITY_V1 = Object.freeze({
  concise: Object.freeze({
    state: 'conditional' as const,
    fallbackReason: 'missing_approved_concise_material' as const,
  }),
  standard: Object.freeze({
    state: 'supported' as const,
  }),
  detailed: Object.freeze({
    materialState: 'conditional' as const,
    productState: OFFICIAL_READING_DETAILED_PRODUCT_ACTIVATION_STATE_V1,
    missingMaterialFallbackReason: 'missing_expansion_material' as const,
    inactiveFallbackReason: 'detailed_not_activated' as const,
  }),
});

export function resolveOfficialReadingDetailPreferenceV1(
  requestedDetail: OfficialReadingDetailPreferenceV1,
  options: OfficialReadingDetailResolutionOptionsV1 = {},
): OfficialReadingDetailPreferenceResolutionV1 {
  switch (requestedDetail) {
    case 'standard':
      return {
        requestedDetail,
        resolvedDetail: 'standard',
        resolution: 'exact',
      };
    case 'concise':
      return options.conciseAvailable === true
        ? {
            requestedDetail,
            resolvedDetail: 'concise',
            resolution: 'exact',
          }
        : {
            requestedDetail,
            resolvedDetail: 'standard',
            resolution: 'fallback_to_standard',
            fallbackReason: 'missing_approved_concise_material',
          };
    case 'detailed': {
      if (options.detailedAvailable !== true) {
        return {
          requestedDetail,
          resolvedDetail: 'standard',
          resolution: 'fallback_to_standard',
          fallbackReason: 'missing_expansion_material',
        };
      }
      if (options.detailedProductActivation !== 'enabled') {
        return {
          requestedDetail,
          resolvedDetail: 'standard',
          resolution: 'fallback_to_standard',
          fallbackReason: 'detailed_not_activated',
        };
      }
      return {
        requestedDetail,
        resolvedDetail: 'detailed',
        resolution: 'exact',
      };
    }
  }
}
