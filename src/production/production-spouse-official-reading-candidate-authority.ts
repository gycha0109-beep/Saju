import type { ReadingIntent } from '../contracts/reading.js';
import {
  readingSectionForIntentV1,
  type ConsumerReadingAuthorityResolutionV1,
} from '../reading/consumer-reading-authority.js';
import {
  PRODUCTION_SPOUSE_OFFICIAL_READING_ALLOWED_SECTIONS,
  isProductionSpouseOfficialReadingSectionV1,
} from './production-spouse-official-reading-scope.js';

export const PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY_VERSION =
  'myeonghwa-production-spouse-official-reading-candidate-authority-v1' as const;

export const PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_ALLOWED_SECTIONS =
  PRODUCTION_SPOUSE_OFFICIAL_READING_ALLOWED_SECTIONS;

export const PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY =
  Object.freeze({
    authorityVersion:
      PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY_VERSION,
    sourceReviewVersion:
      'myeonghwa-relationship-spouse-t8-day-branch-palace-production-surface-readiness-review-v1',
    sourceDecision:
      'POSITION_ONLY_PRODUCTION_SURFACE_ELIGIBLE_FOR_BOUNDED_IMPLEMENTATION',
    lifecycle: 'production_candidate',
    implementationAuthorized: true,
    allowedReadingSections:
      PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_ALLOWED_SECTIONS,
    productionTransportAuthorityAuthorized: false,
    productionSemanticDeliveryAuthorityAuthorized: false,
    persistenceAuthorityAuthorized: false,
    publicSemanticAuthorityAuthorized: false,
    publicGeneralAvailabilityAuthorityAuthorized: false,
    commerceAuthorityAuthorized: false,
    legacyNarrativeRuntimeAllowedForSpouse: false,
    maximumSpouseModelCalls: 0,
    production: 'HOLD',
  } as const);

const CONSTRAINTS = Object.freeze({
  mayPromoteProductionInterpretationAuthority: false as const,
  mayGrantPersistenceAuthority: false as const,
  mayGrantPublicGeneralAvailabilityAuthority: false as const,
  mayTreatUnsupportedSectionAsOfficialReading: false as const,
});

export const isProductionSpouseOfficialReadingCandidateSectionV1 =
  isProductionSpouseOfficialReadingSectionV1;

export function resolveProductionSpouseOfficialReadingCandidateAuthorityV1(
  intent: ReadingIntent,
): ConsumerReadingAuthorityResolutionV1 {
  const readingSection = readingSectionForIntentV1(intent);
  const official =
    isProductionSpouseOfficialReadingCandidateSectionV1(readingSection);

  if (
    official &&
    (
      PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY
        .implementationAuthorized !== true ||
      PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY
        .productionTransportAuthorityAuthorized !== false ||
      PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY
        .productionSemanticDeliveryAuthorityAuthorized !== false ||
      PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY
        .persistenceAuthorityAuthorized !== false ||
      PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY
        .publicGeneralAvailabilityAuthorityAuthorized !== false ||
      PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY.production !==
        'HOLD'
    )
  ) {
    throw new TypeError(
      'Production spouse Official Reading candidate authority requires the bounded implementation-only state.',
    );
  }

  return {
    authorityVersion:
      PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY_VERSION,
    readingSection,
    authority: official ? 'official_reading' : 'legacy_narrative',
    ...(official
      ? { supportedOfficialReadingSection: readingSection }
      : {}),
    constraints: CONSTRAINTS,
  };
}
