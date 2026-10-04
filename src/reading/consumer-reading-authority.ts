import type { ReadingIntent } from '../contracts/reading.js';

export type ConsumerReadingAuthorityV1 =
  | 'official_reading'
  | 'legacy_narrative';

export interface ConsumerReadingAuthorityResolutionV1 {
  authorityVersion: string;
  readingSection: string;
  authority: ConsumerReadingAuthorityV1;
  supportedOfficialReadingSection?: string;
  constraints: {
    mayPromoteProductionInterpretationAuthority: false;
    mayGrantPersistenceAuthority: false;
    mayGrantPublicGeneralAvailabilityAuthority: false;
    mayTreatUnsupportedSectionAsOfficialReading: false;
  };
}

export type ConsumerReadingAuthorityResolverV1 = (
  intent: ReadingIntent,
) => ConsumerReadingAuthorityResolutionV1;

export function readingSectionForIntentV1(intent: ReadingIntent): string {
  return intent.relationshipScope === undefined
    ? `${intent.domain}:${intent.temporalScope}`
    : `${intent.domain}:${intent.temporalScope}:${intent.relationshipScope}`;
}
