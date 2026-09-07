import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReview } from './relationship-spouse-t8-lee-youngeun-independent-normative-provenance-adequacy-review.js';

export const RELATIONSHIP_SPOUSE_T8_LEE_MYENGJAE_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-lee-myengjae-direct-body-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_LEE_MYENGJAE_DIRECT_BODY_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'LEE_MYENGJAE_2022_KCI_DIRECT_FULLTEXT_PDF',
  author: '이명재',
  publicationYear: 2022,
  title: '자평명리학의 육친론 고찰',
  journal: '중국인문과학 제80집',
  publisher: '중국인문학회',
  kciArticleId: 'ART002833924',
  kciOrteFileId: 'KCI_FI002833924',
  doi: '10.35955/JCH.2022.04.80.273',
  kyoboArticleId: '4010047338431',
  kciBibliographicPages: '273-288',
  directPdfPrintedPages: '273-287',
  directPublicDownloadHistoryUrl:
    'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiOrteServHistIFrame.kci?sereArticleSearchBean.artiId=ART002833924&sereArticleSearchBean.orteFileId=KCI_FI002833924',
  directPublicDownloadObjectUrl:
    'https://www.kci.go.kr/kciportal/co/download/popup/poDownload.kci?storFileBean.orteFileId=KCI_FI002833924',
  directPublicPdfObjectInspected: true as const,
  pdfScreenshotReviewed: true as const,
  everyPdfPageRenderedAndReviewed: true as const,
  pdfSha256: '5c4aaee242e61476a44798c00eb068871c49527375a2226b270613d7865b3bd6',
  pdfBytes: 3_223_349,
  pdfPageCount: 15,
  pdfEncrypted: false as const,
  printedToPhysicalPageMap: Object.freeze([
    Object.freeze({ printedPage: 274, physicalPdfPage: 2, topic: 'position-family overview assigns Day Branch to spouse while other pillars map ancestors parents and children' }),
    Object.freeze({ printedPage: 275, physicalPdfPage: 3, topic: 'early position-family transmission explicitly phrases Day as self and wife' }),
    Object.freeze({ printedPage: 276, physicalPdfPage: 4, topic: 'later position-family quotation again states Day Branch as wife while discussing sibling-position controversy' }),
    Object.freeze({ printedPage: 280, physicalPdfPage: 8, topic: 'classical Ten-God family theory explicitly maps what I control Wealth to wife' }),
    Object.freeze({ printedPage: 281, physicalPdfPage: 9, topic: 'Jin So-am reform makes parents sex-neutral Seal but retains male Wealth wife and female Officer-Killings husband branching' }),
    Object.freeze({ printedPage: 282, physicalPdfPage: 10, topic: 'Shen Xiaozhan explanation preserves wife as Proper Wealth inside sex-generational logic' }),
    Object.freeze({ printedPage: 283, physicalPdfPage: 11, topic: 'wife and wife-concubine Wealth wording remains while parent-allocation contradictions are criticized' }),
    Object.freeze({ printedPage: 284, physicalPdfPage: 12, topic: 'author explicitly contrasts male-reference wife Wealth and female-reference husband Officer-Killings consequences' }),
    Object.freeze({ printedPage: 285, physicalPdfPage: 13, topic: 'conclusion restates male wife Wealth versus female husband Officer-Killings as part of the contradiction analysis' }),
    Object.freeze({ printedPage: 286, physicalPdfPage: 14, topic: 'conclusion comparison table directly preserves sex-conditioned spouse assignments' }),
  ] as const),
  dayBranchSpousePositionExplicit: true as const,
  paperExplicitlyReviewsFamilyAllocationContradictions: true as const,
  parentSexNeutralReformDiscussedExplicitly: true as const,
  parentSexNeutralReformDoesNotExtendToSpouseExplicitly: true as const,
  maleSpouseAsWealthExplicit: true as const,
  femaleSpouseAsOfficerKillingsExplicit: true as const,
  nativeSexConditionedSpouseSemanticsExplicit: true as const,
  conclusionRestatesNativeSexConditionedSpouseSemantics: true as const,
  conclusionTableSexConditionedSpouseMappingExplicit: true as const,
  authorProposesRoleNeutralSpouseReplacement: false as const,
  nativeSexIndependentOperationalSelectorFound: false as const,
  partnerSexIndependentOperationalSelectorFound: false as const,
  pureNatalRoleNeutralSpouseSelectorFound: false as const,
  completeRoleNeutralNatalInputContractFound: false as const,
  explicitRoleNeutralNatalMappingGapClosedByThisEvidence: false as const,
  currentGovernedSemanticCorrespondenceGapClosedByThisEvidence: false as const,
  relationshipT6InputGapClosedByThisEvidence: false as const,
  exactPositiveBoundary:
    'The directly inspected full article is valuable because it compares position-family and Ten-God family theories, identifies contradictions in inherited family allocation, and directly discusses a reform in which parents are treated without male/female distinction as Seal. It also preserves a spouse-relevant Day-Branch position layer.',
  exactNegativeBoundary:
    'The same article does not generalize that sex-neutral parent reform to spouse. Across the body and again in the conclusion/table, spouse semantics remain native-sex-conditioned: male-context spouse is wife or wife-concubine under Wealth, while female-context spouse is husband under Officer-Killings. The author criticizes derivative contradictions in the family system but does not publish a replacement native-sex-independent and partner-sex-independent pure-natal spouse selector.',
  noStitchingBoundary:
    'This source is not combined with Lee Youngeun, Lee Ockhwa, Jung Su-a, Kweon Sujeong, Song Jaewoo, Kim Young-jin, Kim Mantae, Hong Yooseon, or commercial/editorial material to manufacture the missing role-neutral natal spouse mapping.',
});

export const RELATIONSHIP_SPOUSE_T8_LEE_MYENGJAE_DIRECT_BODY_BOUNDARY_CONTROL_IDS = Object.freeze([
  'LEE_MYENGJAE_KCI_DIRECT_FULLTEXT_IDENTITY_IS_CONTENT_ADDRESSED',
  'LEE_MYENGJAE_PUBLIC_DOWNLOAD_HISTORY_AND_OBJECT_ROUTES_ARE_REPRODUCIBLE',
  'LEE_MYENGJAE_ALL_FIFTEEN_PDF_PAGES_WERE_RENDERED_AND_VISUALLY_REVIEWED',
  'KCI_BIBLIOGRAPHIC_PAGE_RANGE_AND_DIRECT_PDF_PRINTED_RANGE_ARE_NOT_CONFLATED',
  'DAY_BRANCH_SPOUSE_POSITION_LAYER_IS_PRESERVED_WITHOUT_ROLE_NEUTRAL_PROMOTION',
  'PARENT_SEX_NEUTRAL_REFORM_IS_PRESERVED_AS_A_REAL_FINDING',
  'PARENT_SEX_NEUTRAL_REFORM_IS_NOT_RELABELED_AS_SPOUSE_SEX_NEUTRAL_REFORM',
  'MALE_SPOUSE_AS_WEALTH_IS_PRESERVED',
  'FEMALE_SPOUSE_AS_OFFICER_KILLINGS_IS_PRESERVED',
  'CONCLUSION_SEX_CONDITIONED_SPOUSE_TABLE_IS_PRESERVED',
  'AUTHOR_CRITIQUE_OF_FAMILY_DERIVATIVE_CONTRADICTIONS_IS_PRESERVED',
  'NO_UNPUBLISHED_ROLE_NEUTRAL_SPOUSE_REPLACEMENT_IS_INFERRED_FROM_THE_CRITIQUE',
  'NO_CROSS_SOURCE_STITCHING_WITH_LEE_YOUNGEUN_LEE_OCKHWA_JUNG_KWEON_SONG_KIM_OR_COMMERCIAL_SOURCES',
  'QUALIFYING_PRIMARY_WITNESS_REMAINS_CLOSED',
  'INDEPENDENT_NORMATIVE_PROVENANCE_REMAINS_CLOSED',
  'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
  'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
  'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
  'EXACTLY_TWO_OF_FIVE_AUTHORITY_GAPS_REMAIN_CLOSED',
  'NO_SPOUSE_T8_PRODUCER_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_EFFECT',
] as const);

export interface RelationshipSpouseT8LeeMyengjaeDirectBodyBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_LEE_MYENGJAE_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION;
  upstreamReviewId: string;
  status:
    | 'DIRECT_FULLTEXT_CONFIRMS_PARENT_REFORM_AND_FAMILY_THEORY_CRITIQUE_BUT_RETAINS_NATIVE_SEX_CONDITIONED_SPOUSE_MAPPING'
    | 'UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_LEE_MYENGJAE_DIRECT_BODY_BOUNDARY_CANDIDATE;
  exactUpstreamTwoOfFiveStateAccepted: boolean;
  directFulltextPdfInspected: true;
  everyPdfPageRenderedAndReviewed: true;
  parentSexNeutralReformConfirmed: true;
  nativeSexConditionedSpouseSemanticsConfirmed: true;
  explicitRoleNeutralNatalMappingEstablished: false;
  currentGovernedMethodSemanticCorrespondenceEstablished: false;
  currentRelationshipT6InputPathEstablished: false;
  qualifyingPrimaryWitnessRemainsClosed: boolean;
  independentNormativeProvenanceRemainsClosed: boolean;
  authorityGapsClosedCount: 2 | 0;
  authorityGapsOpenCount: 3 | 5;
  authorityAdmissionReady: false;
  crossSourceStitchingAuthorized: false;
  spouseT8ProducerReady: false;
  productionPromotionReady: false;
  productionState: 'HOLD';
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_LEE_MYENGJAE_DIRECT_BODY_BOUNDARY_CONTROL_IDS)[number][];
  controlCount: 20 | 0;
  recommendedNextAction:
    | 'CONTINUE_SINGLE_SOURCE_ROLE_NEUTRAL_NATAL_SPOUSE_MAPPING_DISCOVERY_WITHOUT_STITCHING_LEE_MYENGJAE_PARENT_REFORM_OR_CRITIQUE'
    | 'REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE';
}

function upstreamTwoOfFiveStateAccepted(): boolean {
  const upstream = buildRelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReview();
  return (
    upstream.status === 'RESOLVED_LEE_YOUNGEUN_2025_INDEPENDENT_NORMATIVE_PROVENANCE_ADEQUACY_REVIEW' &&
    upstream.decision === 'LEE_YOUNGEUN_2025_SINGLE_SOURCE_ADEQUATE_FOR_INDEPENDENT_NORMATIVE_PROVENANCE_EXACTLY_TWO_OF_FIVE_GAPS_CLOSED' &&
    upstream.authorityGapStatus.QUALIFYING_PRIMARY_WITNESS === 'CLOSED' &&
    upstream.authorityGapStatus.INDEPENDENT_NORMATIVE_PROVENANCE === 'CLOSED' &&
    upstream.authorityGapStatus.EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING === 'OPEN' &&
    upstream.authorityGapStatus.CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE === 'OPEN' &&
    upstream.authorityGapStatus.RELATIONSHIP_T6_INPUT === 'OPEN' &&
    upstream.authorityGapsClosedCount === 2 &&
    upstream.authorityGapsOpenCount === 3 &&
    upstream.authorityAdmissionReady === false &&
    upstream.productionPromotionAuthorized === false &&
    upstream.productionState === 'HOLD'
  );
}

export function buildRelationshipSpouseT8LeeMyengjaeDirectBodyBoundaryEvidence(): RelationshipSpouseT8LeeMyengjaeDirectBodyBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReview();
  const accepted = upstreamTwoOfFiveStateAccepted();
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_LEE_MYENGJAE_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
    upstreamReviewId: upstream.reviewId,
    status: accepted
      ? 'DIRECT_FULLTEXT_CONFIRMS_PARENT_REFORM_AND_FAMILY_THEORY_CRITIQUE_BUT_RETAINS_NATIVE_SEX_CONDITIONED_SPOUSE_MAPPING' as const
      : 'UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID' as const,
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_LEE_MYENGJAE_DIRECT_BODY_BOUNDARY_CANDIDATE,
    exactUpstreamTwoOfFiveStateAccepted: accepted,
    directFulltextPdfInspected: true as const,
    everyPdfPageRenderedAndReviewed: true as const,
    parentSexNeutralReformConfirmed: true as const,
    nativeSexConditionedSpouseSemanticsConfirmed: true as const,
    explicitRoleNeutralNatalMappingEstablished: false as const,
    currentGovernedMethodSemanticCorrespondenceEstablished: false as const,
    currentRelationshipT6InputPathEstablished: false as const,
    qualifyingPrimaryWitnessRemainsClosed: accepted,
    independentNormativeProvenanceRemainsClosed: accepted,
    authorityGapsClosedCount: accepted ? 2 as const : 0 as const,
    authorityGapsOpenCount: accepted ? 3 as const : 5 as const,
    authorityAdmissionReady: false as const,
    crossSourceStitchingAuthorized: false as const,
    spouseT8ProducerReady: false as const,
    productionPromotionReady: false as const,
    productionState: 'HOLD' as const,
    controlIds: accepted ? RELATIONSHIP_SPOUSE_T8_LEE_MYENGJAE_DIRECT_BODY_BOUNDARY_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 20 as const : 0 as const,
    recommendedNextAction: accepted
      ? 'CONTINUE_SINGLE_SOURCE_ROLE_NEUTRAL_NATAL_SPOUSE_MAPPING_DISCOVERY_WITHOUT_STITCHING_LEE_MYENGJAE_PARENT_REFORM_OR_CRITIQUE' as const
      : 'REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE' as const,
  };
  return {
    evidenceId: `relationship_spouse_t8_lee_myengjae_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
