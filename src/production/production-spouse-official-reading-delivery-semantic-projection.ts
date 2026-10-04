import type {
  OfficialReadingSemanticProjectionInputV1,
} from '../reading/official-reading-semantic-projection.js';
import {
  buildSpousePositionOnlyOfficialReadingSemanticProjectionV1,
} from '../reading/spouse-position-only-official-reading-semantic-projection.js';
import {
  readingSectionForIntentV1,
} from '../reading/consumer-reading-authority.js';
import {
  PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY,
} from './production-spouse-official-reading-delivery-authority.js';
import {
  isProductionSpouseOfficialReadingSectionV1,
} from './production-spouse-official-reading-scope.js';

export const PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_SEMANTIC_PROJECTION_VERSION =
  'myeonghwa-production-spouse-official-reading-delivery-semantic-projection-v1' as const;

export function buildProductionSpouseOfficialReadingDeliverySemanticProjectionV1(
  input: OfficialReadingSemanticProjectionInputV1,
) {
  const readingSection = readingSectionForIntentV1(input.intent);
  if (
    !isProductionSpouseOfficialReadingSectionV1(readingSection) ||
    PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY
      .productionTransportAuthorityActive !== true ||
    PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY
      .productionSemanticDeliveryAuthorityActive !== true
  ) {
    throw new TypeError(
      'Production spouse Official Reading semantic projection requires the bounded active Production authority.',
    );
  }

  const projection =
    buildSpousePositionOnlyOfficialReadingSemanticProjectionV1(
      input,
      {
        qualifierId:
          'production_relationship_spouse_day_branch_palace_position_only_boundary_v1',
        provenance: {
          admissionId:
            'sa5ab-production-active-relationship-spouse-position-only-v1',
          admissionRegistryVersion:
            PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY
              .authorityVersion,
          researchId:
            'RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PRODUCTION_DELIVERY_ACTIVATION_AUTHORITY_REVIEW',
          researchVersion:
            PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY
              .sourceReviewVersion,
          authorityState:
            PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY
              .sourceDecision,
        },
      },
    );

  return Object.freeze({
    projectionVersion:
      PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_SEMANTIC_PROJECTION_VERSION,
    semanticTextBindings: projection.semanticTextBindings,
    semanticQualifierBindings: projection.semanticQualifierBindings,
  });
}
