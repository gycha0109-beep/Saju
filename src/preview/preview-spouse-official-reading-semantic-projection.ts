import type {
  OfficialReadingSemanticProjectionInputV1,
} from '../reading/official-reading-semantic-projection.js';
import {
  buildSpousePositionOnlyOfficialReadingSemanticProjectionV1,
} from '../reading/spouse-position-only-official-reading-semantic-projection.js';
import {
  PREVIEW_SEMANTIC_ADMISSION_REGISTRY_VERSION,
  requirePreviewSemanticAdmissionV1,
} from './preview-semantic-admission.js';

export const PREVIEW_SPOUSE_OFFICIAL_READING_SEMANTIC_PROJECTION_VERSION =
  'myeonghwa-preview-spouse-official-reading-semantic-projection-v1' as const;

export function buildPreviewSpouseOfficialReadingSemanticProjectionV1(
  input: OfficialReadingSemanticProjectionInputV1,
) {
  const admission = requirePreviewSemanticAdmissionV1(
    'RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_CLAIM_NARRATIVE_PROFILE',
    'relationship:natal:spouse',
  );
  if (
    admission.disposition !== 'claim' ||
    admission.semanticScope !==
      'traditional_spouse_palace_day_branch_position_only' ||
    !admission.boundaries.includes('POSITION_ONLY') ||
    !admission.boundaries.includes('OFFICIAL_READING_PREVIEW_ALLOWED') ||
    admission.effects.mayAffectProductionAuthority !== false
  ) {
    throw new TypeError(
      'Spouse Official Reading semantic projection requires the exact bounded Preview admission.',
    );
  }

  const projection =
    buildSpousePositionOnlyOfficialReadingSemanticProjectionV1(
      input,
      {
        qualifierId:
          'preview_relationship_spouse_day_branch_palace_position_only_boundary_v1',
        provenance: {
          admissionId: admission.admissionId,
          admissionRegistryVersion:
            PREVIEW_SEMANTIC_ADMISSION_REGISTRY_VERSION,
          researchId: admission.researchRef.researchId,
          researchVersion: admission.researchRef.observedVersion,
          authorityState: admission.researchRef.observedAuthorityState,
        },
      },
    );

  return Object.freeze({
    projectionVersion:
      PREVIEW_SPOUSE_OFFICIAL_READING_SEMANTIC_PROJECTION_VERSION,
    semanticTextBindings: projection.semanticTextBindings,
    semanticQualifierBindings: projection.semanticQualifierBindings,
  });
}
