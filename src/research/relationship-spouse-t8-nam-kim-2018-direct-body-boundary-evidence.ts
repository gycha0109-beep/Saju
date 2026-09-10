import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8LeeSangcheon2017EqualityWealthWifeBoundaryEvidence } from './relationship-spouse-t8-lee-sangcheon-2017-equality-wealth-wife-boundary-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_NAM_KIM_2018_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-nam-kim-2018-direct-body-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_NAM_KIM_2018_DIRECT_BODY_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'NAM_KIDONG_KIM_MANTAE_2018_AUTHOR_HOSTED_DIRECT_FULLTEXT_PDF',
  authors: Object.freeze(['남기동', '김만태'] as const),
  publicationYear: 2018,
  title: '한국사회 이혼현상에 따른 부부궁합(夫婦宮合)의 명리학적 고찰',
  journal: '인문사회 21',
  volume: 9,
  issue: 2,
  printedPages: '105-116',
  kciArticleId: 'ART002338687',
  doi: '10.22143/HSS21.9.2.9',
  directBodyAcquisitionPr: 412,
  authorSourcePageUrl: 'https://www.namestory.kr/bbs/board.php?bo_table=sub3_1&wr_id=147',
  authorDirectDownloadUrl: 'https://www.namestory.kr/bbs/download.php?bo_table=sub3_1&wr_id=147&no=0',
  authorPageDirectDownloadContract:
    "file_download('./download.php?bo_table=sub3_1&wr_id=147&no=0', '한국사회 이혼현상에 따른 부부궁합(夫婦宮合)의 명리학적 고찰.pdf')",
  authorPageFileDownloadImplementation:
    'function file_download(link, file) { document.location.href=link; }',
  authorPageSha256: '6fccc29a93ff7b8e727e11c09c1220cbb476db5b456813c0de8d5c747e9f7fd4',
  acquisitionRunId: 34456224870,
  acquisitionArtifactId: 10143572930,
  acquisitionArtifactDigest:
    'sha256:abde4faae61127ee9517efffb1d5009fa1574dd4d9d9aacb2c90102366e3dc00',
  acquisitionExactHead: 'e1d964c827dc6387f98a7f4452600acdd18aec54',
  exactArtifactPdfReextractedAndRehashed: true as const,
  mismatchingLocalCopyExcludedFromEvidence: true as const,
  directPublicPdfObjectInspected: true as const,
  completePdfTextIndexedForLocators: true as const,
  allPdfPagesRenderedFromExactArtifactPdf: true as const,
  materialPagesVisuallyReviewedFromExactArtifactPdf: true as const,
  pdfSha256: 'adda4474baf27754ca25efed615bdffdc96f55726e0495d42b0e894395c475c0',
  pdfBytes: 557_712,
  pdfPageCount: 12,
  pdfEncrypted: false as const,
  pdfVersion: '1.4' as const,
  printedBodyPageOffset: 104,
  printedToPhysicalPageMap: Object.freeze([
    Object.freeze({
      printedPage: 105,
      physicalPdfPage: 1,
      topic:
        'Korean abstract states spouse palace is more important than spouse star while retaining husband/native-male Wealth and wife/native-female Officer spouse-star branching',
    }),
    Object.freeze({
      printedPage: 108,
      physicalPdfPage: 4,
      topic:
        'Day Branch is treated as spouse palace and compared across partners; Yukchin theory explicitly maps male-native Wealth to wife and female-native Officer to husband',
    }),
    Object.freeze({
      printedPage: 109,
      physicalPdfPage: 5,
      topic:
        'Yukchin section repeats male-Wealth and female-Officer spouse-star branching while Yongshin compatibility compares both partners for complementary needed Five-Element structure',
    }),
    Object.freeze({
      printedPage: 110,
      physicalPdfPage: 6,
      topic:
        'first divorce-counseling couple case separates husband and wife analyses and applies Wealth spouse-star logic to the husband chart and Officer spouse-star logic to the wife chart',
    }),
    Object.freeze({
      printedPage: 111,
      physicalPdfPage: 7,
      topic:
        'second divorce case again applies husband Wealth and wife Officer rules while also treating partner elemental complementarity as a dyadic factor',
    }),
    Object.freeze({
      printedPage: 114,
      physicalPdfPage: 10,
      topic:
        'author synthesis explicitly ranks spouse palace above spouse star, defines Day Branch as spouse palace, and again states husband-context spouse star Wealth versus wife-context spouse star Officer',
    }),
    Object.freeze({
      printedPage: 115,
      physicalPdfPage: 11,
      topic:
        'synthesized risk rules remain sex differentiated, including a female-specific Output/Food-God condition, and conclusion proposes counseling use without a replacement role-neutral selector',
    }),
  ] as const),
  dayBranchSpousePalaceExplicit: true as const,
  spousePalacePriorityOverSpouseStarExplicit: true as const,
  dyadicPairwiseSpousePalaceComparisonExplicit: true as const,
  dyadicYongshinComplementarityExplicit: true as const,
  empiricalDivorceAndBereavementCoupleCasesExplicit: true as const,
  maleNativeWealthAsWifeExplicit: true as const,
  femaleNativeOfficerAsHusbandExplicit: true as const,
  nativeSexConditionedSpouseStarSemanticsExplicit: true as const,
  femaleSpecificOutputFoodGodRiskRuleExplicit: true as const,
  dyadicTwoPartnerInputRequiredByMethod: true as const,
  spousePalacePriorityReplacesSexConditionedSpouseStarRule: false as const,
  nativeSexIndependentOperationalSelectorFound: false as const,
  partnerSexIndependentOperationalSelectorFound: false as const,
  singleNativeNatalOnlySelectorFound: false as const,
  pureNatalRoleNeutralSpouseSelectorFound: false as const,
  completeRoleNeutralNatalInputContractFound: false as const,
  explicitRoleNeutralNatalMappingGapClosedByThisEvidence: false as const,
  currentGovernedSemanticCorrespondenceGapClosedByThisEvidence: false as const,
  relationshipT6InputGapClosedByThisEvidence: false as const,
  exactPositiveBoundary:
    'The directly inspected article publishes a genuine spouse-specific operational positional hierarchy: Day Branch is spouse palace, spouse palace is explicitly more important than spouse star, and actual divorce/bereavement couple cases apply that hierarchy.',
  exactNegativeBoundary:
    'The same full body repeatedly preserves native-sex-conditioned spouse-star semantics: male-native Wealth is wife and female-native Officer is husband. Its Yongshin and palace analysis compares both partners, and its synthesized rules include additional female-specific conditions. Therefore the Day-Branch spouse-palace layer is not one native-sex-independent, partner-sex-independent, single-native role-neutral spouse selector.',
  noStitchingBoundary:
    'Nam/Kim 2018 Day-Branch spouse-palace priority is not combined with Kim Mantae 2025 Day-Branch priority, Lee Sangcheon 2017 equality language, Kweon Sujeong same-sex-family discussion, Lee Youngeun contextual remapping, Song Jaewoo actual-role language, Jung Su-a spouse-palace evidence, Hong Yooseon ideology critique, Noh/Kim 2019 equality reinterpretation, product partner terminology, or any other partial source to manufacture the missing role-neutral natal spouse selector.',
});

export const RELATIONSHIP_SPOUSE_T8_NAM_KIM_2018_DIRECT_BODY_BOUNDARY_CONTROL_IDS = Object.freeze([
  'NAM_KIM_2018_EXACT_TITLE_AUTHORS_YEAR_JOURNAL_KCI_AND_DOI_ARE_PINNED',
  'AUTHOR_PAGE_AUTHORED_DOWNLOAD_CONTRACT_IS_REPRODUCIBLE_WITHOUT_IDENTIFIER_GUESSING',
  'EXACT_ACQUISITION_ARTIFACT_ID_DIGEST_AND_HEAD_ARE_PINNED',
  'EXACT_ARTIFACT_PDF_IS_REEXTRACTED_REHASHED_AND_RENDERED_BEFORE_SEMANTIC_JUDGMENT',
  'NONMATCHING_LOCAL_PDF_COPY_IS_EXCLUDED_FROM_EVIDENCE',
  'FULL_TWELVE_PAGE_PDF_IS_ACQUIRED_WITHOUT_LOGIN_PAYWALL_DRM_AUTH_OR_DECRYPTION_BYPASS',
  'DAY_BRANCH_IS_PRESERVED_AS_SPOUSE_PALACE',
  'SPOUSE_PALACE_PRIORITY_OVER_SPOUSE_STAR_IS_PRESERVED_AS_OPERATIONAL_EVIDENCE',
  'EMPIRICAL_DIVORCE_AND_BEREAVEMENT_COUPLE_CASE_APPLICATION_IS_PRESERVED',
  'MALE_NATIVE_WEALTH_AS_WIFE_IS_PRESERVED',
  'FEMALE_NATIVE_OFFICER_AS_HUSBAND_IS_PRESERVED',
  'NATIVE_SEX_CONDITIONED_SPOUSE_STAR_BRANCHING_IS_NOT_NEUTRALIZED',
  'DYADIC_PAIRWISE_PALACE_AND_YONGSHIN_COMPARISON_IS_PRESERVED',
  'FEMALE_SPECIFIC_OUTPUT_FOOD_GOD_RISK_RULE_IS_PRESERVED',
  'DAY_BRANCH_LOCATION_LAYER_IS_NOT_PROMOTED_TO_COMPLETE_ROLE_NEUTRAL_SELECTOR',
  'NO_SINGLE_NATIVE_NATAL_ONLY_SELECTOR_IS_INVENTED',
  'NO_CROSS_SOURCE_STITCHING_TO_MANUFACTURE_MISSING_SELECTOR',
  'QUALIFYING_PRIMARY_WITNESS_REMAINS_CLOSED',
  'INDEPENDENT_NORMATIVE_PROVENANCE_REMAINS_CLOSED',
  'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
  'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
  'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
  'EXACTLY_TWO_OF_FIVE_AUTHORITY_GAPS_REMAIN_CLOSED_AND_PRODUCTION_REMAINS_HOLD',
] as const);

export interface RelationshipSpouseT8NamKim2018DirectBodyBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_NAM_KIM_2018_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status:
    | 'DIRECT_FULLTEXT_CONFIRMS_SPOUSE_PALACE_PRIORITY_WITH_SEX_CONDITIONED_SPOUSE_STARS_AND_DYADIC_INPUT'
    | 'UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_NAM_KIM_2018_DIRECT_BODY_BOUNDARY_CANDIDATE;
  exactUpstreamTwoOfFiveStateAccepted: boolean;
  directFulltextPdfInspected: true;
  spousePalacePriorityConfirmed: true;
  nativeSexConditionedSpouseStarSemanticsConfirmed: true;
  dyadicTwoPartnerMethodConfirmed: true;
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
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_NAM_KIM_2018_DIRECT_BODY_BOUNDARY_CONTROL_IDS)[number][];
  controlCount: number;
  recommendedNextAction:
    | 'CONTINUE_SINGLE_SOURCE_ROLE_NEUTRAL_SINGLE_NATIVE_SPOUSE_MAPPING_DISCOVERY_WITHOUT_STITCHING_DAY_BRANCH_PRIORITY'
    | 'REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE';
}

function upstreamTwoOfFiveStateAccepted(): boolean {
  const upstream = buildRelationshipSpouseT8LeeSangcheon2017EqualityWealthWifeBoundaryEvidence();
  return (
    upstream.status ===
      'DIRECT_FULLTEXT_CONFIRMS_EQUALITY_MODERNIZATION_WITH_WEALTH_WIFE_MAPPING_WITHOUT_ROLE_NEUTRAL_SPOUSE_SELECTOR' &&
    upstream.exactUpstreamTwoOfFiveStateAccepted === true &&
    upstream.explicitRoleNeutralNatalMappingEstablished === false &&
    upstream.currentGovernedMethodSemanticCorrespondenceEstablished === false &&
    upstream.currentRelationshipT6InputPathEstablished === false &&
    upstream.qualifyingPrimaryWitnessRemainsClosed === true &&
    upstream.independentNormativeProvenanceRemainsClosed === true &&
    upstream.authorityGapsClosedCount === 2 &&
    upstream.authorityGapsOpenCount === 3 &&
    upstream.authorityAdmissionReady === false &&
    upstream.productionPromotionReady === false &&
    upstream.productionState === 'HOLD'
  );
}

export function buildRelationshipSpouseT8NamKim2018DirectBodyBoundaryEvidence(): RelationshipSpouseT8NamKim2018DirectBodyBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8LeeSangcheon2017EqualityWealthWifeBoundaryEvidence();
  const accepted = upstreamTwoOfFiveStateAccepted();
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_NAM_KIM_2018_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status: accepted
      ? ('DIRECT_FULLTEXT_CONFIRMS_SPOUSE_PALACE_PRIORITY_WITH_SEX_CONDITIONED_SPOUSE_STARS_AND_DYADIC_INPUT' as const)
      : ('UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID' as const),
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_NAM_KIM_2018_DIRECT_BODY_BOUNDARY_CANDIDATE,
    exactUpstreamTwoOfFiveStateAccepted: accepted,
    directFulltextPdfInspected: true as const,
    spousePalacePriorityConfirmed: true as const,
    nativeSexConditionedSpouseStarSemanticsConfirmed: true as const,
    dyadicTwoPartnerMethodConfirmed: true as const,
    explicitRoleNeutralNatalMappingEstablished: false as const,
    currentGovernedMethodSemanticCorrespondenceEstablished: false as const,
    currentRelationshipT6InputPathEstablished: false as const,
    qualifyingPrimaryWitnessRemainsClosed: accepted,
    independentNormativeProvenanceRemainsClosed: accepted,
    authorityGapsClosedCount: accepted ? (2 as const) : (0 as const),
    authorityGapsOpenCount: accepted ? (3 as const) : (5 as const),
    authorityAdmissionReady: false as const,
    crossSourceStitchingAuthorized: false as const,
    spouseT8ProducerReady: false as const,
    productionPromotionReady: false as const,
    productionState: 'HOLD' as const,
    controlIds: accepted
      ? RELATIONSHIP_SPOUSE_T8_NAM_KIM_2018_DIRECT_BODY_BOUNDARY_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted
      ? RELATIONSHIP_SPOUSE_T8_NAM_KIM_2018_DIRECT_BODY_BOUNDARY_CONTROL_IDS.length
      : 0,
    recommendedNextAction: accepted
      ? ('CONTINUE_SINGLE_SOURCE_ROLE_NEUTRAL_SINGLE_NATIVE_SPOUSE_MAPPING_DISCOVERY_WITHOUT_STITCHING_DAY_BRANCH_PRIORITY' as const)
      : ('REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE' as const),
  };

  return {
    evidenceId: `relationship_spouse_t8_nam_kim_2018_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
