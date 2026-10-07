import type {
  ApprovedOfficialReadingDetailedSourceProfileV1,
} from './official-reading-detailed-presentation-definition.js';

export const SPOUSE_NATAL_DETAILED_MATERIAL_AUTHORITY_ID =
  'SA-7C-RELATIONSHIP-NATAL-SPOUSE-POSITION-ONLY-DETAILED-MATERIAL' as const;
export const SPOUSE_NATAL_DETAILED_MATERIAL_AUTHORITY_VERSION = '1' as const;

const CLAIM_TYPE =
  'relationship.spouse.traditional_spouse_palace_position' as const;
const METHODOLOGY_ID =
  'relationship-spouse-t8-day-branch-spouse-palace-position' as const;
const METHODOLOGY_VERSION = '2.0.0' as const;

const STANDARD_HEADLINE = '배우자궁의 전통적 위치' as const;
const STANDARD_SUMMARY =
  '전통 명리에서는 일지(日支)를 배우자궁의 위치로 봅니다.' as const;
const STANDARD_BOUNDARY =
  '이는 배우자궁의 위치에 대한 전통적 분류이며, 배우자의 성격이나 정체, 결혼 시기 또는 관계 결과를 의미하지 않습니다.' as const;

const QUALIFIER_PROHIBITED_EXTENSIONS = Object.freeze([
  'NO_SPOUSE_PERSONALITY_OR_IDENTITY',
  'NO_SPOUSE_APPEARANCE_OR_OCCUPATION',
  'NO_MARRIAGE_TIMING_OR_OUTCOME',
  'NO_DIVORCE_OR_REMARRIAGE',
  'NO_FAVORABLE_UNFAVORABLE_SPOUSE_PALACE_JUDGMENT',
  'NO_YONGSHIN_JISIN_SEMANTICS',
  'NO_SPOUSE_STAR_AUTO_SELECTION',
  'NO_SECOND_CHART_COMPATIBILITY',
] as const);

const PROHIBITED_EXTENSIONS = Object.freeze(
  [...QUALIFIER_PROHIBITED_EXTENSIONS].sort(),
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
      summary: STANDARD_BOUNDARY,
    }),
    prohibitedExtensions: PROHIBITED_EXTENSIONS,
  }),
]);

export const RELATIONSHIP_SPOUSE_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1 =
  Object.freeze([
    Object.freeze({
      owner: 'relationship:natal:spouse',
      profileId:
        'PROFILE-RELATIONSHIP-SPOUSE-T8-DAY-BRANCH-PALACE-POSITION-ONLY-DETAILED-V1',
      profileVersion: '1',
      claimType: CLAIM_TYPE,
      methodologyRef: Object.freeze({
        id: METHODOLOGY_ID,
        version: METHODOLOGY_VERSION,
      }),
      standardText: Object.freeze({
        headline: STANDARD_HEADLINE,
        summary: STANDARD_SUMMARY,
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
        sourceRefs: Object.freeze([
          'SRC-RELATIONSHIP-SPOUSE-T8-JUNG-SUA-2025-DAY-BRANCH-PALACE',
          'SRC-RELATIONSHIP-SPOUSE-T8-SAJU-ATELIER-2026-DAY-BRANCH-PALACE',
        ]),
      }),
    } satisfies ApprovedOfficialReadingDetailedSourceProfileV1),
  ] as const);
