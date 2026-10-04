import type {
  OfficialReadingSemanticProjectionInputV1,
} from '../reading/official-reading-semantic-projection.js';
import {
  buildSpousePositionOnlyOfficialReadingSemanticProjectionV1,
} from '../reading/spouse-position-only-official-reading-semantic-projection.js';
import {
  PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY,
  isProductionSpouseOfficialReadingCandidateSectionV1,
} from './production-spouse-official-reading-candidate-authority.js';
import {
  readingSectionForIntentV1,
} from '../reading/consumer-reading-authority.js';

export const PRODUCTION_SPOUSE_OFFICIAL_READING_SEMANTIC_PROJECTION_VERSION =
  'myeonghwa-production-spouse-official-reading-semantic-projection-v1' as const;

export function buildProductionSpouseOfficialReadingSemanticProjectionV1(
  input: OfficialReadingSemanticProjectionInputV1,
) {
  const readingSection = readingSectionForIntentV1(input.intent);
  if (
    !isProductionSpouseOfficialReadingCandidateSectionV1(readingSection) ||
    PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY
      .implementationAuthorized !== true ||
    PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY
      .productionSemanticDeliveryAuthorityAuthorized !== false
  ) {
    throw new TypeError(
      'Production spouse Official Reading semantic projection requires the bounded spouse-only candidate authority.',
    );
  }

  const projection =
    buildSpousePositionOnlyOfficialReadingSemanticProjectionV1(
      input,
      {
        qualifierId:
          'production_candidate_relationship_spouse_day_branch_palace_position_only_boundary_v1',
        provenance: {
          admissionId:
            'sa5z-production-candidate-relationship-spouse-position-only-v1',
          admissionRegistryVersion:
            PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY
              .authorityVersion,
          researchId:
            'RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PRODUCTION_SURFACE_READINESS_REVIEW',
          researchVersion:
            PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY
              .sourceReviewVersion,
          authorityState:
            PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY
              .sourceDecision,
        },
      },
    );

  return Object.freeze({
    projectionVersion:
      PRODUCTION_SPOUSE_OFFICIAL_READING_SEMANTIC_PROJECTION_VERSION,
    semanticTextBindings: projection.semanticTextBindings,
    semanticQualifierBindings: projection.semanticQualifierBindings,
  });
}
