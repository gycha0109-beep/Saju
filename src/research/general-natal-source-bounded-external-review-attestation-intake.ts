import type { ReviewAttestation } from '../contracts/interpretation.js';
import { createRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import { GENERAL_NATAL_USEFUL_READING_SOURCE } from './general-natal-useful-reading-candidate.js';
import { GENERAL_NATAL_CONCLUSION_SOURCE } from './general-natal-conclusion-synthesis-candidate.js';
import {
  GENERAL_NATAL_PEER_TAXONOMY_SOURCE,
  GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_RULES,
  GENERAL_NATAL_SOURCE_BOUNDED_METHODOLOGY,
  GENERAL_NATAL_SOURCE_BOUNDED_PACK,
  GENERAL_NATAL_SOURCE_BOUNDED_RELATION_RULES,
} from './general-natal-conclusion-source-bounded-candidate.js';

export const GENERAL_NATAL_EXTERNAL_REVIEW_ATTESTATION_INTAKE_VERSION =
  'myeonghwa-general-natal-external-review-attestation-intake-v1' as const;

export function createGeneralNatalSourceBoundedRegistryWithExternalReviewAttestations(
  reviewAttestations: readonly ReviewAttestation[],
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: [
        ...GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_RULES,
        ...GENERAL_NATAL_SOURCE_BOUNDED_RELATION_RULES,
      ],
      methodologies: [GENERAL_NATAL_SOURCE_BOUNDED_METHODOLOGY],
      sources: [
        GENERAL_NATAL_USEFUL_READING_SOURCE,
        GENERAL_NATAL_CONCLUSION_SOURCE,
        GENERAL_NATAL_PEER_TAXONOMY_SOURCE,
      ],
      reviewAttestations,
    },
    GENERAL_NATAL_SOURCE_BOUNDED_PACK,
    createdAt,
  );
}
