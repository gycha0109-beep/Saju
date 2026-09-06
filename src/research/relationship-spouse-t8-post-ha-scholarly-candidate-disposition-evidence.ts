import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8HaGeonchungLineageBodyEvidence } from './relationship-spouse-t8-ha-geonchung-lineage-body-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_POST_HA_SCHOLARLY_CANDIDATE_DISPOSITION_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-post-ha-scholarly-candidate-disposition-evidence-v1' as const;

export type PostHaCandidateDisposition =
  | 'PRIORITY_FULLTEXT_REQUIRED'
  | 'FULLTEXT_REQUIRED_NO_ROLE_NEUTRAL_MAPPING_ESTABLISHED'
  | 'EXPLICIT_GENDERED_SPOUSE_MAPPING_NOT_ROLE_NEUTRAL'
  | 'GENDER_SPLIT_METHOD_NOT_ROLE_NEUTRAL_ESTABLISHED'
  | 'EXPLICIT_MALE_SCOPE_NOT_ROLE_NEUTRAL'
  | 'MODERN_GUNGSEONG_FULLTEXT_CANDIDATE';

export interface PostHaScholarlyCandidateRecord {
  candidateId: string;
  author: string;
  publicationYear: number;
  title: string;
  institutionOrJournal: string;
  sourceLocator: string;
  inspectedPublicSurface: 'SCHOLARLY_METADATA_ABSTRACT_TOC';
  directFullTextObjectInspected: false;
  pdfScreenshotReviewed: false;
  disposition: PostHaCandidateDisposition;
  roleNeutralNatalSpouseMappingEstablished: false;
  exactBoundary: string;
  nextAction: string;
}

export const RELATIONSHIP_SPOUSE_T8_POST_HA_SCHOLARLY_CANDIDATES = Object.freeze([
  Object.freeze({
    candidateId: 'KIM_YOUNGJIN_2020_DBPIA_T15521643',
    author: '김영진',
    publicationYear: 2020,
    title: '사주명리학의 宮과 星에 관한 연구',
    institutionOrJournal: '경기대학교 행정·사회복지대학원',
    sourceLocator: 'DBpia T15521643 / target body pp.50, 55, 67, 71, 73',
    inspectedPublicSurface: 'SCHOLARLY_METADATA_ABSTRACT_TOC',
    directFullTextObjectInspected: false,
    pdfScreenshotReviewed: false,
    disposition: 'PRIORITY_FULLTEXT_REQUIRED',
    roleNeutralNatalSpouseMappingEstablished: false,
    exactBoundary:
      'The public abstract/TOC identifies the Day pillar as self-and-spouse palace, defines an ideal Yukchin/Star for each palace from Day-Stem Yin-Yang/Five-Element relations, compares actual palace stars with the ideal, and explicitly includes a social-change application chapter. The exact spouse ideal Star, its gender scope, the p.71 remapping rule, and the complete executable input contract remain unavailable without the body.',
    nextAction:
      'Acquire and directly inspect the actual body at pp.50/55/67/71/73 before any semantic inference or canonical mapping.',
  }),
  Object.freeze({
    candidateId: 'SHIN_JAEEOK_2024_DBPIA_T16939654',
    author: '신재억',
    publicationYear: 2024,
    title: '命理學 六親論 宮‧星의 변화 사례 硏究',
    institutionOrJournal: '공주대학교 일반대학원',
    sourceLocator: 'DBpia T16939654',
    inspectedPublicSurface: 'SCHOLARLY_METADATA_ABSTRACT_TOC',
    directFullTextObjectInspected: false,
    pdfScreenshotReviewed: false,
    disposition: 'FULLTEXT_REQUIRED_NO_ROLE_NEUTRAL_MAPPING_ESTABLISHED',
    roleNeutralNatalSpouseMappingEstablished: false,
    exactBoundary:
      'The abstract says Yukchin palaces are positionally designated while a corresponding Yukchin Star can be absent and may operate through another Five Element. It also says classical sources disagree on Yukchin assignments. No explicit role-neutral spouse selector or same-source spouse remapping rule is established on the inspected public surface.',
    nextAction:
      'Acquire the body sections on Yukchin palace/star understanding and change cases before treating any case transformation as a general spouse rule.',
  }),
  Object.freeze({
    candidateId: 'SONG_SANGSEOP_2022_RISS',
    author: '송상섭',
    publicationYear: 2022,
    title: '命理學의 六親論 硏究 : 滴天隨闡微를 中心으로',
    institutionOrJournal: '원광대학교 일반대학원',
    sourceLocator: 'RISS scholarly thesis public abstract/search surface',
    inspectedPublicSurface: 'SCHOLARLY_METADATA_ABSTRACT_TOC',
    directFullTextObjectInspected: false,
    pdfScreenshotReviewed: false,
    disposition: 'EXPLICIT_GENDERED_SPOUSE_MAPPING_NOT_ROLE_NEUTRAL',
    roleNeutralNatalSpouseMappingEstablished: false,
    exactBoundary:
      'The public scholarly surface describes traditional spouse assignment in sex-specific husband/wife terms, including male-chart wife allocation to Wealth and female-chart husband allocation to Officer, and discusses Ren Tieqiao lineage wife/concubine allocation through Direct/Indirect Wealth. That applicability cannot be universalized into a role-neutral spouse rule.',
    nextAction:
      'Retain as historical/gendered methodology evidence only; do not use it to close the role-neutral spouse authority gap.',
  }),
  Object.freeze({
    candidateId: 'EUM_JONGHEE_2019_DBPIA_T15047469',
    author: '음종희',
    publicationYear: 2019,
    title: '四柱命理 宮星에 관한 硏究 : 宮에 따른 十星작용을 중심으로',
    institutionOrJournal: '경기대학교 예술대학원',
    sourceLocator: 'DBpia T15047469',
    inspectedPublicSurface: 'SCHOLARLY_METADATA_ABSTRACT_TOC',
    directFullTextObjectInspected: false,
    pdfScreenshotReviewed: false,
    disposition: 'EXPLICIT_GENDERED_SPOUSE_MAPPING_NOT_ROLE_NEUTRAL',
    roleNeutralNatalSpouseMappingEstablished: false,
    exactBoundary:
      'The public abstract explicitly defines 財星 as wife and wealth, then places that function at the Day Branch or Hour Pillar and further requires Yin-Yang-specific operation plus strength, circulation, and role evaluation. The wife-specific mapping is not role-neutral and the method also exceeds currently governed neutral inputs.',
    nextAction:
      'Exclude from role-neutral spouse authority admission; retain only as a gendered Gung-Star methodology reference.',
  }),
  Object.freeze({
    candidateId: 'PARK_OESUK_2023_RISS_T16818829',
    author: '박외숙',
    publicationYear: 2023,
    title: '四柱命理學 古典에 나타난 六親의 原理와 關係에 대한 硏究',
    institutionOrJournal: '경기대학교 대학원',
    sourceLocator: 'RISS T16818829 / National Assembly KDMT12023000053361',
    inspectedPublicSurface: 'SCHOLARLY_METADATA_ABSTRACT_TOC',
    directFullTextObjectInspected: false,
    pdfScreenshotReviewed: false,
    disposition: 'GENDER_SPLIT_METHOD_NOT_ROLE_NEUTRAL_ESTABLISHED',
    roleNeutralNatalSpouseMappingEstablished: false,
    exactBoundary:
      'The abstract models marital relations through Yin-Yang union and distinguishes broad Yukchin from modern Sipsin/Sipseong, but the public table list separately exposes male- and female-chart Yukchin allocation diagrams, a male-basis relational-meaning table, a female husband example, and male-chart palace/Yukchin application. A single role-neutral spouse selector is therefore not established by the inspected public evidence.',
    nextAction:
      'Acquire the relevant body tables and surrounding argument only if evaluating this distinct Yukchin system as a complete methodology; do not collapse it into current Ten-God spouse semantics.',
  }),
  Object.freeze({
    candidateId: 'YOON_SANGHEUM_2023_KCI_ART003042567',
    author: '윤상흠',
    publicationYear: 2023,
    title: '성역할과 유전자 관점의 육친론 ― 남명 기준의 財星과 官星을 위주로 ―',
    institutionOrJournal: '동방문화와 사상 15, pp.33-55',
    sourceLocator: 'KCI ART003042567 / DOI 10.35203/EACT.2023.15.33',
    inspectedPublicSurface: 'SCHOLARLY_METADATA_ABSTRACT_TOC',
    directFullTextObjectInspected: false,
    pdfScreenshotReviewed: false,
    disposition: 'EXPLICIT_MALE_SCOPE_NOT_ROLE_NEUTRAL',
    roleNeutralNatalSpouseMappingEstablished: false,
    exactBoundary:
      'The article title and English title explicitly scope the analysis to Jaesung and Gwansung in male charts. A male-scope study cannot establish the required role-neutral natal spouse mapping without a separate explicit generalization from the same admissible source.',
    nextAction:
      'Exclude as a direct role-neutral spouse authority source while retaining it as evidence about gender-role controversy in Yukchin assignment.',
  }),
  Object.freeze({
    candidateId: 'JUNG_SUA_2025_DBPIA_T17210085',
    author: '정수아',
    publicationYear: 2025,
    title: '명리학의 궁성(宮星)에 관한 연구',
    institutionOrJournal: '대구한의대학교 일반대학원',
    sourceLocator: 'DBpia T17210085 / National Assembly TM 306.095 -25-13',
    inspectedPublicSurface: 'SCHOLARLY_METADATA_ABSTRACT_TOC',
    directFullTextObjectInspected: false,
    pdfScreenshotReviewed: false,
    disposition: 'MODERN_GUNGSEONG_FULLTEXT_CANDIDATE',
    roleNeutralNatalSpouseMappingEstablished: false,
    exactBoundary:
      'The abstract explicitly contrasts classical and modern Gungseong interpretation and recasts Ten-God families toward modern economic, social, occupational, authority, academic, and mentor meanings. It is not spouse-specific on the public surface, so modern vocabulary alone is not evidence of a role-neutral spouse mapping.',
    nextAction:
      'Acquire the body, especially the modern Gungseong theory and 財星/官星 case chapters, and search for an explicit spouse/partner mapping before promoting this candidate.',
  }),
] as const satisfies readonly PostHaScholarlyCandidateRecord[]);

export const RELATIONSHIP_SPOUSE_T8_POST_HA_SCHOLARLY_CANDIDATE_CONTROL_IDS = Object.freeze([
  'ABSTRACT_OR_TOC_IS_NOT_RELABELED_AS_DIRECT_FULLTEXT_BODY_INSPECTION',
  'KIM_2020_IDEAL_SPOUSE_STAR_IS_NOT_INFERRED_FROM_ABSTRACT_TOPOLOGY',
  'KIM_2020_SOCIAL_CHANGE_CHAPTER_IS_NOT_ASSUMED_TO_REMAP_SPOUSE_GENDER',
  'SHIN_2024_CASE_CHANGE_MECHANICS_ARE_NOT_GENERALIZED_WITHOUT_BODY_CONTEXT',
  'SONG_2022_GENDERED_SPOUSE_ASSIGNMENT_IS_NOT_UNIVERSALIZED',
  'EUM_2019_WIFE_SPECIFIC_WEALTH_MAPPING_IS_NOT_UNIVERSALIZED',
  'PARK_2023_BROAD_YUKCHIN_IS_NOT_COLLAPSED_INTO_CURRENT_TEN_GOD_SEMANTICS',
  'PARK_2023_GENDER_SPLIT_TABLES_DO_NOT_ESTABLISH_A_ROLE_NEUTRAL_SELECTOR',
  'YOON_2023_MALE_SCOPE_IS_NOT_GENERALIZED_TO_ALL_SPOUSE_ROLES',
  'JUNG_2025_MODERN_SEMANTIC_VOCABULARY_IS_NOT_ASSUMED_TO_BE_SPOUSE_NEUTRALITY',
  'NO_CROSS_SOURCE_SPOUSE_SEMANTIC_STITCHING',
  'NO_USER_OR_PARTNER_GENDER_OR_SEXUAL_ORIENTATION_INFERENCE',
  'INDEPENDENT_NORMATIVE_PROVENANCE_FOR_CURRENT_SPOUSE_METHOD_REMAINS_OPEN',
  'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
  'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
  'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
  'EXACTLY_ONE_OF_FIVE_AUTHORITY_GAPS_REMAINS_CLOSED',
  'NO_SPOUSE_T8_PRODUCER_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_EFFECT',
] as const);

export interface RelationshipSpouseT8PostHaScholarlyCandidateDispositionEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_POST_HA_SCHOLARLY_CANDIDATE_DISPOSITION_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status: 'MATERIAL_POST_HA_SCHOLARLY_CANDIDATES_TRIAGED_NO_ROLE_NEUTRAL_AUTHORITY_CLOSURE';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidates: typeof RELATIONSHIP_SPOUSE_T8_POST_HA_SCHOLARLY_CANDIDATES;
  candidateCount: 7;
  priorityFulltextCandidateCount: 1;
  modernFulltextCandidateCount: 1;
  explicitGenderScopeFailureCount: 3;
  roleNeutralNatalMappingEstablished: false;
  independentNormativeProvenanceForCurrentSpouseMethodEstablished: false;
  currentGovernedMethodSemanticCorrespondenceEstablished: false;
  currentRelationshipT6InputPathEstablished: false;
  qualifyingPrimaryWitnessGapRemainsClosed: true;
  authorityGapsClosedCount: 1;
  authorityGapsOpenCount: 4;
  authorityAdmissionReady: false;
  crossSourceStitchingAuthorized: false;
  sexualOrientationInferenceAuthorized: false;
  spouseT8ProducerReady: false;
  productionPromotionReady: false;
  controlIds: typeof RELATIONSHIP_SPOUSE_T8_POST_HA_SCHOLARLY_CANDIDATE_CONTROL_IDS;
  controlCount: 18;
  recommendedNextAction:
    'ACQUIRE_KIM_YOUNGJIN_2020_ACTUAL_BODY_FIRST_THEN_JUNG_SUA_2025_OR_OTHER_SAME_SOURCE_EXPLICIT_ROLE_NEUTRAL_SCHOLARLY_NATAL_SPOUSE_MAPPING';
}

export function buildRelationshipSpouseT8PostHaScholarlyCandidateDispositionEvidence(): RelationshipSpouseT8PostHaScholarlyCandidateDispositionEvidenceReport {
  const upstream = buildRelationshipSpouseT8HaGeonchungLineageBodyEvidence();
  const material = {
    evidenceVersion:
      RELATIONSHIP_SPOUSE_T8_POST_HA_SCHOLARLY_CANDIDATE_DISPOSITION_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status:
      'MATERIAL_POST_HA_SCHOLARLY_CANDIDATES_TRIAGED_NO_ROLE_NEUTRAL_AUTHORITY_CLOSURE' as const,
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidates: RELATIONSHIP_SPOUSE_T8_POST_HA_SCHOLARLY_CANDIDATES,
    candidateCount: 7 as const,
    priorityFulltextCandidateCount: 1 as const,
    modernFulltextCandidateCount: 1 as const,
    explicitGenderScopeFailureCount: 3 as const,
    roleNeutralNatalMappingEstablished: false as const,
    independentNormativeProvenanceForCurrentSpouseMethodEstablished: false as const,
    currentGovernedMethodSemanticCorrespondenceEstablished: false as const,
    currentRelationshipT6InputPathEstablished: false as const,
    qualifyingPrimaryWitnessGapRemainsClosed: true as const,
    authorityGapsClosedCount: 1 as const,
    authorityGapsOpenCount: 4 as const,
    authorityAdmissionReady: false as const,
    crossSourceStitchingAuthorized: false as const,
    sexualOrientationInferenceAuthorized: false as const,
    spouseT8ProducerReady: false as const,
    productionPromotionReady: false as const,
    controlIds: RELATIONSHIP_SPOUSE_T8_POST_HA_SCHOLARLY_CANDIDATE_CONTROL_IDS,
    controlCount: 18 as const,
    recommendedNextAction:
      'ACQUIRE_KIM_YOUNGJIN_2020_ACTUAL_BODY_FIRST_THEN_JUNG_SUA_2025_OR_OTHER_SAME_SOURCE_EXPLICIT_ROLE_NEUTRAL_SCHOLARLY_NATAL_SPOUSE_MAPPING' as const,
  };

  return Object.freeze({
    evidenceId: `relationship_spouse_t8_post_ha_scholarly_disposition_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  });
}
