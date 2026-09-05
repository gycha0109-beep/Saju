import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_INDEPENDENT_SCHOLARLY_PROVENANCE_CANDIDATE_EVIDENCE_VERSION,
  buildRelationshipSpouseT8IndependentScholarlyProvenanceCandidateEvidence,
} from './relationship-spouse-t8-independent-scholarly-provenance-candidate-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_FULLTEXT_ACCESS_ROLE_NEUTRAL_MAPPING_CANDIDATE_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-fulltext-access-role-neutral-mapping-candidate-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_SCHOLARLY_FULLTEXT_ACCESS_ATTEMPTS = Object.freeze([
  Object.freeze({
    sourceId: 'KCI-ART003175186',
    surfaceId: 'LEE_2025_KCI',
    accessSurface:
      'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003175186',
    inspectedSurface: 'official_kci_bibliographic_metadata_and_abstract',
    originalViewControlVisible: true,
    directArticleBodySurfaced: false,
    directPdfSurfaced: false,
    exactRelevantBodyPassageInspected: false,
    accessResult:
      'KCI publicly exposes bibliographic metadata and the abstract, but the inspected public surface did not expose the article body or a directly inspectable PDF.',
  }),
  Object.freeze({
    sourceId: 'KCI-ART003175186',
    surfaceId: 'LEE_2025_NATIONAL_ASSEMBLY_LIBRARY',
    accessSurface:
      'https://dlps.nanet.go.kr/search/searchInnerList.do?searchQuery=%EB%B0%94%EB%A5%B8%EC%97%AD%EC%82%AC%ED%95%99%EC%88%A0%EC%9B%90',
    inspectedSurface: 'national_assembly_library_catalog_result',
    originalViewControlVisible: true,
    externalOriginalRedirectTarget: 'KCI',
    directArticleBodySurfaced: false,
    directPdfSurfaced: false,
    exactRelevantBodyPassageInspected: false,
    accessResult:
      'The catalog result exposes an external-original control for the electronic article, but the inspected route resolves to the external KCI surface rather than a locally inspectable article body.',
  }),
  Object.freeze({
    sourceId: 'KCI-ART003175186',
    surfaceId: 'LEE_2025_KYOBO_SCHOLAR',
    accessSurface: 'https://scholar.kyobobook.co.kr/article/detail/4010070551816',
    inspectedSurface: 'kyobo_scholar_metadata_abstract_and_table_of_contents',
    originalViewControlVisible: true,
    originalSaveControlVisible: true,
    directArticleBodySurfaced: false,
    directPdfSurfaced: false,
    exactRelevantBodyPassageInspected: false,
    accessResult:
      'The inspected public article page exposes metadata, abstract/TOC context, and original-view/save controls, but not a directly inspectable article body on the public surface.',
  }),
  Object.freeze({
    sourceId: 'KCI-ART003175186',
    surfaceId: 'LEE_2025_RESEARCHGATE',
    accessSurface:
      'https://www.researchgate.net/publication/389752735_Contemporary_Meaning_for_the_Chapter_of_Woman_Fate_in_Jeokcheonsucheonmi_Focusing_on_the_Theory_of_Husband_Star_as_the_Yongshin',
    inspectedSurface: 'researchgate_publication_metadata',
    requestFullTextOnly: true,
    directArticleBodySurfaced: false,
    directPdfSurfaced: false,
    exactRelevantBodyPassageInspected: false,
    accessResult:
      'The inspected publication surface explicitly reports no full text available and provides only a request-full-text PDF path, which is not treated as direct inspection.',
  }),
  Object.freeze({
    sourceId: 'DBPIA-T15948798',
    surfaceId: 'KWEON_2021_DBPIA',
    accessSurface: 'https://www.dbpia.co.kr/journal/detail?nodeId=T15948798',
    inspectedSurface: 'dbpia_bibliographic_metadata_abstract_and_table_of_contents',
    targetBodyLocators: Object.freeze([
      'IV.1.1 남녀의 존비 관계에서 상대적 관계로의 변화 — p.48',
      'IV.3.2 혼인관의 인식 전환 — p.78',
      'IV.3.3 혼인 형태의 변화 — p.82',
    ] as const),
    directArticleBodySurfaced: false,
    directPdfSurfaced: false,
    exactRelevantBodyPassageInspected: false,
    accessResult:
      'The inspected public thesis page exposes the abstract and exact chapter/page TOC locators, but not the thesis body passages required for surrounding-context review.',
  }),
  Object.freeze({
    sourceId: 'DBPIA-T15948798',
    surfaceId: 'KWEON_2021_DIGITAL_KNOWLEDGE',
    accessSurface: 'https://k-knowledge.kr/srch/read.jsp?id=281133169',
    inspectedSurface: 'digital_knowledge_metadata_and_description',
    directArticleBodySurfaced: false,
    directPdfSurfaced: false,
    exactRelevantBodyPassageInspected: false,
    accessResult:
      'The inspected public Digital Knowledge surface exposes bibliographic description only and did not surface the thesis body or a directly inspectable PDF.',
  }),
] as const);

export const RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_NATAL_MAPPING_CANDIDATE = Object.freeze({
  sourceId: 'MINGMAP-BAZI-LOVE-MARRIAGE',
  title: 'BaZi for Love & Marriage: When Will I Get Married?',
  publisher: 'Ming Map',
  sourceClass: 'commercial_practitioner_editorial_methodology',
  authorityClassification: Object.freeze({
    primary: false,
    secondary: true,
    normativeMethodologicalRuleCandidate: false,
    independentNormativeAuthorityEstablished: false,
  }),
  peerReviewed: false,
  institutionalNormativeStandard: false,
  accessSurface: 'https://mingmap.app/bazi-guide/bazi-for-love-and-marriage',
  inspectedSurface: 'public_article_body',
  exactWebSectionLocators: Object.freeze([
    'What does my BaZi chart say about marriage?',
    'The spouse star — the specific stem that represents your partner',
    'FAQ — Why does the tradition use gendered spouse stars?',
  ] as const),
  natalScopeExplicit: true,
  compatibilityOnly: false,
  dayBranchSpousePalaceExplicit: true,
  traditionalGenderedSpouseStarConventionExplicit: true,
  historicalBinaryGenderContextExplicit: true,
  modernReadersBothControlLinesRegardlessOfGenderExplicit: true,
  sameSexNonBinaryModernMarriageSameMachineryExplicit: true,
  actualChartDynamicsOverHistoricalBinaryTemplateExplicit: true,
  fullPublicArticleBodyDirectlyInspected: true,
  exactWebSectionLocatorEstablished: true,
  explicitRoleNeutralSpouseNatalMappingCandidateLocated: true,
  explicitRoleNeutralSpouseNatalMappingEstablishedForAuthorityAdmission: false,
  explicitNoSexualOrientationInferenceRuleEstablished: false,
  independentNormativeProvenanceAdequate: false,
  authorityAdmissionAdequate: false,
  exactSupportedClaim:
    'The inspected public natal BaZi article identifies the Day Branch as Spouse Palace, explains traditional gendered spouse-star labels as historically binary vocabulary, and explicitly says modern readers use both control lines regardless of gender while same-sex, non-binary, and modern marriages use the same chart machinery rather than a forced historical binary template.',
  unsupportedExtrapolations: Object.freeze([
    'peer-reviewed or institutional normative-standard status',
    'independent normative authority for the governed spouse method',
    'permission to infer a user or partner sexual orientation from a chart',
    'the exact current governed semantic correspondence contract',
    'the exact current Relationship T6 input contract',
    'spouse T8 producer, interpretation, preview, or production promotion',
  ] as const),
} as const);

export const RELATIONSHIP_SPOUSE_T8_FULLTEXT_ACCESS_ROLE_NEUTRAL_MAPPING_CANDIDATE_CONTROL_IDS =
  Object.freeze([
    'ORIGINAL_VIEW_BUTTON_IS_NOT_DIRECT_BODY_INSPECTION',
    'EXTERNAL_ORIGINAL_REDIRECT_IS_NOT_LOCAL_FULL_TEXT_INSPECTION',
    'REQUEST_FULL_TEXT_ONLY_IS_NOT_FULL_TEXT_INSPECTION',
    'ABSTRACT_TOC_OR_METADATA_IS_NOT_EXACT_BODY_CONTEXT',
    'TARGET_SCHOLARLY_FULLTEXT_REMAINS_UNACQUIRED_ON_INSPECTED_PUBLIC_SURFACES',
    'MINGMAP_PUBLIC_BODY_EXPLICITLY_PROVIDES_A_ROLE_NEUTRAL_NATAL_MAPPING_CANDIDATE',
    'MINGMAP_COMMERCIAL_PRACTITIONER_GUIDANCE_IS_NOT_INDEPENDENT_NORMATIVE_AUTHORITY',
    'SAME_SEX_OR_NON_BINARY_APPLICABILITY_DOES_NOT_AUTHORIZE_SEXUAL_ORIENTATION_INFERENCE',
    'NO_KWEON_MINGMAP_OR_LEE_MINGMAP_CROSS_SOURCE_STITCHING',
    'NO_COMPATIBILITY_AUTHORITY_IS_REUSED_AS_NATAL_AUTHORITY',
    'INDEPENDENT_NORMATIVE_PROVENANCE_REMAINS_OPEN',
    'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN_FOR_AUTHORITY_ADMISSION',
    'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
    'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
    'EXACTLY_ONE_OF_FIVE_AUTHORITY_GAPS_REMAINS_CLOSED',
    'NO_SPOUSE_T8_PRODUCER_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_EFFECT',
  ] as const);

export interface RelationshipSpouseT8FulltextAccessRoleNeutralMappingCandidateEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_FULLTEXT_ACCESS_ROLE_NEUTRAL_MAPPING_CANDIDATE_EVIDENCE_VERSION;
  upstreamScholarlyEvidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_INDEPENDENT_SCHOLARLY_PROVENANCE_CANDIDATE_EVIDENCE_VERSION;
  upstreamScholarlyEvidenceId: string;
  status: 'MATERIAL_FULLTEXT_ACCESS_BOUNDARY_AND_ROLE_NEUTRAL_NATAL_MAPPING_CANDIDATE_ACQUIRED';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  scholarlyFulltextAccessAttempts: typeof RELATIONSHIP_SPOUSE_T8_SCHOLARLY_FULLTEXT_ACCESS_ATTEMPTS;
  scholarlyFulltextAccessAttemptCount: 6;
  targetScholarlyDirectFullTextAcquiredCount: 0;
  targetScholarlyExactRelevantBodyPassageInspectedCount: 0;
  roleNeutralNatalMappingCandidate: typeof RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_NATAL_MAPPING_CANDIDATE;
  publicCommercialArticleBodyInspectedCount: 1;
  explicitRoleNeutralNatalMappingCandidateLocated: true;
  independentNormativeProvenanceEstablished: false;
  explicitRoleNeutralSpouseNatalMappingEstablished: false;
  currentGovernedMethodSemanticCorrespondenceEstablished: false;
  currentRelationshipT6InputPathEstablished: false;
  qualifyingPrimaryWitnessGapRemainsClosed: true;
  authorityGapsClosedCount: 1;
  authorityGapsOpenCount: 4;
  authorityAdmissionReady: false;
  crossSourceStitchingAuthorized: false;
  crossTaskStitchingAuthorized: false;
  sexualOrientationInferenceAuthorized: false;
  spouseT8ProducerReady: false;
  spouseRulePackReady: false;
  spouseClaimPackReady: false;
  spouseInterpretationPackReady: false;
  consumerNarrativeReady: false;
  previewDefaultReady: false;
  productionPromotionReady: false;
  controlIds: typeof RELATIONSHIP_SPOUSE_T8_FULLTEXT_ACCESS_ROLE_NEUTRAL_MAPPING_CANDIDATE_CONTROL_IDS;
  controlCount: 16;
  recommendedNextAction:
    'ACQUIRE_INDEPENDENT_NORMATIVE_SOURCE_OR_DIRECT_SCHOLARLY_BODY_CONTEXT_THAT_EXPLICITLY_SUPPORTS_ROLE_NEUTRAL_NATAL_MAPPING_BEFORE_ANY_GAP_CLOSURE_OR_PRODUCER_GATE';
}

export function buildRelationshipSpouseT8FulltextAccessRoleNeutralMappingCandidateEvidence(): RelationshipSpouseT8FulltextAccessRoleNeutralMappingCandidateEvidenceReport {
  const upstream = buildRelationshipSpouseT8IndependentScholarlyProvenanceCandidateEvidence();
  const material = {
    evidenceVersion:
      RELATIONSHIP_SPOUSE_T8_FULLTEXT_ACCESS_ROLE_NEUTRAL_MAPPING_CANDIDATE_EVIDENCE_VERSION,
    upstreamScholarlyEvidenceVersion:
      RELATIONSHIP_SPOUSE_T8_INDEPENDENT_SCHOLARLY_PROVENANCE_CANDIDATE_EVIDENCE_VERSION,
    upstreamScholarlyEvidenceId: upstream.evidenceId,
    status: 'MATERIAL_FULLTEXT_ACCESS_BOUNDARY_AND_ROLE_NEUTRAL_NATAL_MAPPING_CANDIDATE_ACQUIRED' as const,
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    scholarlyFulltextAccessAttempts: RELATIONSHIP_SPOUSE_T8_SCHOLARLY_FULLTEXT_ACCESS_ATTEMPTS,
    scholarlyFulltextAccessAttemptCount: 6 as const,
    targetScholarlyDirectFullTextAcquiredCount: 0 as const,
    targetScholarlyExactRelevantBodyPassageInspectedCount: 0 as const,
    roleNeutralNatalMappingCandidate: RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_NATAL_MAPPING_CANDIDATE,
    publicCommercialArticleBodyInspectedCount: 1 as const,
    explicitRoleNeutralNatalMappingCandidateLocated: true as const,
    independentNormativeProvenanceEstablished: false as const,
    explicitRoleNeutralSpouseNatalMappingEstablished: false as const,
    currentGovernedMethodSemanticCorrespondenceEstablished: false as const,
    currentRelationshipT6InputPathEstablished: false as const,
    qualifyingPrimaryWitnessGapRemainsClosed: true as const,
    authorityGapsClosedCount: 1 as const,
    authorityGapsOpenCount: 4 as const,
    authorityAdmissionReady: false as const,
    crossSourceStitchingAuthorized: false as const,
    crossTaskStitchingAuthorized: false as const,
    sexualOrientationInferenceAuthorized: false as const,
    spouseT8ProducerReady: false as const,
    spouseRulePackReady: false as const,
    spouseClaimPackReady: false as const,
    spouseInterpretationPackReady: false as const,
    consumerNarrativeReady: false as const,
    previewDefaultReady: false as const,
    productionPromotionReady: false as const,
    controlIds: RELATIONSHIP_SPOUSE_T8_FULLTEXT_ACCESS_ROLE_NEUTRAL_MAPPING_CANDIDATE_CONTROL_IDS,
    controlCount: 16 as const,
    recommendedNextAction:
      'ACQUIRE_INDEPENDENT_NORMATIVE_SOURCE_OR_DIRECT_SCHOLARLY_BODY_CONTEXT_THAT_EXPLICITLY_SUPPORTS_ROLE_NEUTRAL_NATAL_MAPPING_BEFORE_ANY_GAP_CLOSURE_OR_PRODUCER_GATE' as const,
  };

  return Object.freeze({
    evidenceId: `relationship_spouse_t8_fulltext_access_role_neutral_mapping_candidate_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  });
}
