import type { ReadingIntent } from '../contracts/reading.js';
import {
  readingSectionForIntentV1,
  type ConsumerReadingAuthorityResolutionV1,
  type ConsumerReadingAuthorityV1,
} from '../reading/consumer-reading-authority.js';
import {
  PREVIEW_E2E_APPROVAL,
  isPreviewOfficialReadingSection,
  type PreviewOfficialReadingSection,
} from './preview-authority.js';

export const PREVIEW_OFFICIAL_READING_CONSUMER_AUTHORITY_VERSION =
  'myeonghwa-preview-official-reading-consumer-authority-v3' as const;

export type PreviewConsumerReadingAuthorityV1 =
  ConsumerReadingAuthorityV1;

export interface PreviewConsumerReadingAuthorityResolutionV1
  extends ConsumerReadingAuthorityResolutionV1 {
  authorityVersion:
    typeof PREVIEW_OFFICIAL_READING_CONSUMER_AUTHORITY_VERSION;
  supportedOfficialReadingSection?: PreviewOfficialReadingSection;
}

export { readingSectionForIntentV1 };

const CONSTRAINTS = Object.freeze({
  mayPromoteProductionInterpretationAuthority: false as const,
  mayGrantPersistenceAuthority: false as const,
  mayGrantPublicGeneralAvailabilityAuthority: false as const,
  mayTreatUnsupportedSectionAsOfficialReading: false as const,
});

export function resolvePreviewConsumerReadingAuthorityV1(
  intent: ReadingIntent,
): PreviewConsumerReadingAuthorityResolutionV1 {
  const readingSection = readingSectionForIntentV1(intent);
  const official = isPreviewOfficialReadingSection(readingSection);

  if (
    official &&
    (
      PREVIEW_E2E_APPROVAL.lifecycle !== 'preview' ||
      PREVIEW_E2E_APPROVAL.approved !== true ||
      PREVIEW_E2E_APPROVAL.productionInterpretationAuthorityGranted !== false ||
      PREVIEW_E2E_APPROVAL.persistenceAuthorityGranted !== false ||
      PREVIEW_E2E_APPROVAL.publicGeneralAvailabilityAuthorityGranted !== false
    )
  ) {
    throw new TypeError(
      'Preview Official Reading consumer authority requires the bounded Preview approval state.',
    );
  }

  return {
    authorityVersion:
      PREVIEW_OFFICIAL_READING_CONSUMER_AUTHORITY_VERSION,
    readingSection,
    authority: official ? 'official_reading' : 'legacy_narrative',
    ...(official ? { supportedOfficialReadingSection: readingSection } : {}),
    constraints: CONSTRAINTS,
  };
}
