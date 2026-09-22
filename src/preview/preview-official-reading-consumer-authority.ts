import type { ReadingIntent } from '../contracts/reading.js';
import {
  PREVIEW_E2E_APPROVAL,
  isPreviewE2eSupportedReadingSection,
  type PreviewE2eSupportedReadingSection,
} from './preview-authority.js';

export const PREVIEW_OFFICIAL_READING_CONSUMER_AUTHORITY_VERSION =
  'myeonghwa-preview-official-reading-consumer-authority-v1' as const;

export type PreviewConsumerReadingAuthorityV1 =
  | 'official_reading'
  | 'legacy_narrative';

export interface PreviewConsumerReadingAuthorityResolutionV1 {
  authorityVersion: typeof PREVIEW_OFFICIAL_READING_CONSUMER_AUTHORITY_VERSION;
  readingSection: string;
  authority: PreviewConsumerReadingAuthorityV1;
  supportedOfficialReadingSection?: PreviewE2eSupportedReadingSection;
  constraints: {
    mayPromoteProductionInterpretationAuthority: false;
    mayGrantPersistenceAuthority: false;
    mayGrantPublicGeneralAvailabilityAuthority: false;
    mayTreatUnsupportedSectionAsOfficialReading: false;
  };
}

const CONSTRAINTS = Object.freeze({
  mayPromoteProductionInterpretationAuthority: false as const,
  mayGrantPersistenceAuthority: false as const,
  mayGrantPublicGeneralAvailabilityAuthority: false as const,
  mayTreatUnsupportedSectionAsOfficialReading: false as const,
});

export function readingSectionForIntentV1(intent: ReadingIntent): string {
  return intent.relationshipScope === undefined
    ? `${intent.domain}:${intent.temporalScope}`
    : `${intent.domain}:${intent.temporalScope}:${intent.relationshipScope}`;
}

export function resolvePreviewConsumerReadingAuthorityV1(
  intent: ReadingIntent,
): PreviewConsumerReadingAuthorityResolutionV1 {
  const readingSection = readingSectionForIntentV1(intent);
  const official = isPreviewE2eSupportedReadingSection(readingSection);

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
    authorityVersion: PREVIEW_OFFICIAL_READING_CONSUMER_AUTHORITY_VERSION,
    readingSection,
    authority: official ? 'official_reading' : 'legacy_narrative',
    ...(official ? { supportedOfficialReadingSection: readingSection } : {}),
    constraints: CONSTRAINTS,
  };
}
