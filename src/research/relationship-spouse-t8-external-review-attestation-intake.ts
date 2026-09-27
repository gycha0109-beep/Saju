import type { ReviewAttestation } from '../contracts/interpretation.js';
import { createRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_TYPE_DEFINITION,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_VALUE_SCHEMA,
} from './relationship-spouse-t8-runtime-admission.js';
import { RELATIONSHIP_SPOUSE_T8_RUNTIME_SOURCE_MANIFEST_SOURCES } from './relationship-spouse-t8-runtime-source-manifest.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_PACK,
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_RULES,
} from './relationship-spouse-t8-source-bound-runtime.js';

export const RELATIONSHIP_SPOUSE_T8_EXTERNAL_REVIEW_ATTESTATION_INTAKE_VERSION =
  'myeonghwa-relationship-spouse-t8-external-review-attestation-intake-v1' as const;

export function createRelationshipSpouseT8SourceBoundRegistryWithExternalReviewAttestations(
  reviewAttestations: readonly ReviewAttestation[],
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_RULES,
      methodologies: [RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_METHODOLOGY],
      sources: RELATIONSHIP_SPOUSE_T8_RUNTIME_SOURCE_MANIFEST_SOURCES,
      claimTypeDefinitions: [RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_TYPE_DEFINITION],
      claimValueSchemas: [RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_VALUE_SCHEMA],
      reviewAttestations,
    },
    RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_PACK,
    createdAt,
  );
}
