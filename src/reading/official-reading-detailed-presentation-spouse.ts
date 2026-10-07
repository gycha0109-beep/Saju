import type {
  ApprovedOfficialReadingDetailedSourceProfileV1,
} from './official-reading-detailed-presentation-definition.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_CONTRACT_VERSION,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY_ID,
} from '../research/relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY_SOURCE_IDS,
} from '../research/relationship-spouse-t8-day-branch-palace-source-manifest-candidate.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
} from '../research/relationship-spouse-t8-day-branch-palace-claim-narrative-profile-materialization.js';
import {
  SPOUSE_POSITION_ONLY_OFFICIAL_READING_PROHIBITED_EXTENSIONS,
} from './spouse-position-only-official-reading-semantic-projection.js';
import {
  PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY,
} from '../production/production-spouse-official-reading-delivery-authority.js';

export const SPOUSE_NATAL_DETAILED_MATERIAL_AUTHORITY_ID =
  'SA-7C-RELATIONSHIP-NATAL-SPOUSE-POSITION-ONLY-DETAILED-MATERIAL' as const;
export const SPOUSE_NATAL_DETAILED_MATERIAL_AUTHORITY_VERSION = '1' as const;

const QUALIFIER_PROVENANCE = Object.freeze({
  admissionId: 'sa5ab-production-active-relationship-spouse-position-only-v1',
  admissionRegistryVersion:
    PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY.authorityVersion,
  researchId:
    'RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PRODUCTION_DELIVERY_ACTIVATION_AUTHORITY_REVIEW',
  researchVersion:
    PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY.sourceReviewVersion,
  authorityState:
    PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY.sourceDecision,
});

const PROHIBITED_EXTENSIONS = Object.freeze(
  [...SPOUSE_POSITION_ONLY_OFFICIAL_READING_PROHIBITED_EXTENSIONS].sort(),
);

const SEMANTIC_QUALIFIERS = Object.freeze([
  Object.freeze({
    qualifierId:
      'production_relationship_spouse_day_branch_palace_position_only_boundary_v1',
    kind: 'boundary' as const,
    semanticScope:
      'traditional_spouse_palace_day_branch_position_only_boundary',
    semanticKeys: Object.freeze([
      'relationship:spouse:traditional_spouse_palace_position:position_only',
    ]),
    canonicalText: Object.freeze({
      summary:
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
    }),
    prohibitedExtensions: PROHIBITED_EXTENSIONS,
    provenance: QUALIFIER_PROVENANCE,
  }),
]);

export const RELATIONSHIP_SPOUSE_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1 =
  Object.freeze([
    Object.freeze({
      owner: 'relationship:natal:spouse',
      profileId:
        'PROFILE-RELATIONSHIP-SPOUSE-T8-DAY-BRANCH-PALACE-POSITION-ONLY-DETAILED-V1',
      profileVersion: '1',
      claimType: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
      methodologyRef: Object.freeze({
        id: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY_ID,
        version:
          RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_CONTRACT_VERSION,
      }),
      standardText: Object.freeze({
        headline:
          RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE,
        summary:
          RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
      }),
      semanticQualifiers: SEMANTIC_QUALIFIERS,
      prohibitedExtensions: PROHIBITED_EXTENSIONS,
      supportingClaimTypes: Object.freeze([]),
      scenarioPolicy: 'none',
      contradictionPolicy: 'none',
      approvedTextByRole: Object.freeze({
        clarification:
          '여기서 배우자궁은 전통 명리에서 일지라는 자리를 배우자·혼인 주제를 살피는 위치로 부르는 명칭입니다. 이 표시는 일지의 위치 역할을 설명할 뿐, 그 자리만으로 특정 배우자 개인의 특성을 정하는 해석은 아닙니다.',
        boundary:
          '이 항목은 일지가 전통적으로 배우자궁 위치로 분류된다는 사실에만 한정됩니다. 상대 개인의 성격·정체·외모·직업, 결혼 시기나 성패, 관계의 미래 결과, 궁합·길흉·점수 또는 특정 별을 배우자 지표로 자동 지정하는 해석으로 확장하지 않습니다.',
      }),
      provenance: Object.freeze({
        authorityId: SPOUSE_NATAL_DETAILED_MATERIAL_AUTHORITY_ID,
        authorityVersion: SPOUSE_NATAL_DETAILED_MATERIAL_AUTHORITY_VERSION,
        sourceRefs: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY_SOURCE_IDS,
      }),
    } satisfies ApprovedOfficialReadingDetailedSourceProfileV1),
  ] as const);
