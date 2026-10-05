import type { ReadingRequest } from '../contracts/reading.js';

export const OFFICIAL_READING_DETAIL_PRESENTATION_POLICY_VERSION =
  'myeonghwa-official-reading-detail-presentation-policy-v1' as const;

export type OfficialReadingDetailPreferenceV1 = NonNullable<
  NonNullable<ReadingRequest['outputPreferences']>['preferredDetail']
>;

export type OfficialReadingDetailResolutionStateV1 =
  | 'exact'
  | 'fallback_to_standard';

export type OfficialReadingDetailFallbackReasonV1 =
  | 'missing_text_role_authority'
  | 'missing_approved_concise_material'
  | 'missing_expansion_material';

export interface OfficialReadingDetailPreferenceResolutionV1 {
  requestedDetail: OfficialReadingDetailPreferenceV1;
  resolvedDetail: 'concise' | 'standard';
  resolution: OfficialReadingDetailResolutionStateV1;
  fallbackReason?: OfficialReadingDetailFallbackReasonV1;
}

export const OFFICIAL_READING_DETAIL_CAPABILITY_V1 = Object.freeze({
  concise: Object.freeze({
    state: 'conditional' as const,
    fallbackReason: 'missing_approved_concise_material' as const,
  }),
  standard: Object.freeze({
    state: 'supported' as const,
  }),
  detailed: Object.freeze({
    state: 'fallback_only' as const,
    fallbackReason: 'missing_expansion_material' as const,
  }),
});

export function resolveOfficialReadingDetailPreferenceV1(
  requestedDetail: OfficialReadingDetailPreferenceV1,
  options: { conciseAvailable?: boolean } = {},
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
    case 'detailed':
      return {
        requestedDetail,
        resolvedDetail: 'standard',
        resolution: 'fallback_to_standard',
        fallbackReason: 'missing_expansion_material',
      };
  }
}
