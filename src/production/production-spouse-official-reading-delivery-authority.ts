import type { ReadingIntent } from '../contracts/reading.js';
import {
  readingSectionForIntentV1,
  type ConsumerReadingAuthorityResolutionV1,
} from '../reading/consumer-reading-authority.js';
import {
  PRODUCTION_SPOUSE_OFFICIAL_READING_ALLOWED_SECTIONS,
  isProductionSpouseOfficialReadingSectionV1,
} from './production-spouse-official-reading-scope.js';

export const PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY_VERSION =
  'myeonghwa-production-spouse-official-reading-delivery-authority-v1' as const;

export const PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY =
  Object.freeze({
    authorityVersion:
      PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY_VERSION,
    sourceReviewVersion:
      'myeonghwa-relationship-spouse-t8-day-branch-palace-production-delivery-activation-authority-review-v1',
    sourceDecision:
      'AUTHORIZE_POSITION_ONLY_PRODUCTION_DELIVERY_ACTIVATION_IMPLEMENTATION',
    lifecycle: 'production',
    allowedReadingSections:
      PRODUCTION_SPOUSE_OFFICIAL_READING_ALLOWED_SECTIONS,
    productionTransportAuthorityActive: true,
    productionSemanticDeliveryAuthorityActive: true,
    nonSpouseProductionSemanticAuthorityAuthorized: false,
    persistenceAuthorityAuthorized: false,
    publicSemanticAuthorityAuthorized: false,
    publicGeneralAvailabilityAuthorityAuthorized: false,
    commerceAuthorityAuthorized: false,
    legacyNarrativeRuntimeAllowedForSpouse: false,
    maximumSpouseModelCalls: 0,
    production: 'ACTIVE_BOUNDED',
  } as const);

const CONSTRAINTS = Object.freeze({
  mayPromoteProductionInterpretationAuthority: false as const,
  mayGrantPersistenceAuthority: false as const,
  mayGrantPublicGeneralAvailabilityAuthority: false as const,
  mayTreatUnsupportedSectionAsOfficialReading: false as const,
});

export function resolveProductionSpouseOfficialReadingDeliveryAuthorityV1(
  intent: ReadingIntent,
): ConsumerReadingAuthorityResolutionV1 {
  const readingSection = readingSectionForIntentV1(intent);
  const official =
    isProductionSpouseOfficialReadingSectionV1(readingSection);

  if (
    official &&
    (
      PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY
        .productionTransportAuthorityActive !== true ||
      PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY
        .productionSemanticDeliveryAuthorityActive !== true ||
      PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY
        .nonSpouseProductionSemanticAuthorityAuthorized !== false ||
      PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY
        .persistenceAuthorityAuthorized !== false ||
      PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY
        .publicGeneralAvailabilityAuthorityAuthorized !== false ||
      PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY.production !==
        'ACTIVE_BOUNDED'
    )
  ) {
    throw new TypeError(
      'Production spouse Official Reading delivery authority requires the exact bounded active state.',
    );
  }

  return {
    authorityVersion:
      PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY_VERSION,
    readingSection,
    authority: official ? 'official_reading' : 'legacy_narrative',
    ...(official ? { supportedOfficialReadingSection: readingSection } : {}),
    constraints: CONSTRAINTS,
  };
}
