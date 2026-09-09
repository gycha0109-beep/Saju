import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReview } from './relationship-spouse-t8-lee-youngeun-independent-normative-provenance-adequacy-review.js';

export const RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_2025_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-kim-mantae-2025-direct-body-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_2025_DIRECT_BODY_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'KIM_MANTAE_2025_AUTHOR_HOSTED_DIRECT_FULLTEXT_PDF',
  author: '김만태',
  publicationYear: 2025,
  title: '배우자 인연의 중시로서 궁합(宮合)에 관한 고찰',
  journal: '교방문화연구 통권 13집(5권 3호)',
  publisher: '한국교방문화학회',
  kciArticleId: 'ART003250308',
  doi: '10.58936/gcr.2025.9.5.3.143',
  printedPages: '143-168',
  authorSourcePageUrl: 'https://www.namestory.kr/bbs/board.php?bo_table=sub3_1&wr_id=418',
  authorDirectDownloadUrl: 'https://www.namestory.kr/bbs/download.php?bo_table=sub3_1&wr_id=418&no=0',
  authorPageDirectDownloadContract:
    "javascript:file_download('./download.php?bo_table=sub3_1&wr_id=418&no=0', '배우자 인연의 중시로서 궁합(宮合)에 관한 고찰(김만태).pdf')",
  authorPageFileDownloadImplementation:
    'function file_download(link, file) { document.location.href=link; }',
  authorPageSha256: '23f3d7e4dcb41b3aabe00edf4ec32208a9448cc768bdb835e94c3d0a20aaaa68',
  directPublicPdfObjectInspected: true as const,
  completePdfTextExtracted: true as const,
  allPdfPagesRendered: true as const,
  materialPagesVisuallyReviewed: true as const,
  pdfSha256: 'edadff53dc3cd5ba5510e5dfc8690c55977751caf0d24e8875d3d44dc6fa3472',
  pdfBytes: 3_067_426,
  pdfPageCount: 26,
  pdfEncrypted: false as const,
  printedToPhysicalPageMap: Object.freeze([
    Object.freeze({
      printedPage: 157,
      physicalPdfPage: 15,
      topic:
        'Saju compatibility discussion explicitly differentiates female-chart husband-star/child-star conditions from male-chart Jung-hwa and gives sex-conditioned partner-selection examples',
    }),
    Object.freeze({
      printedPage: 158,
      physicalPdfPage: 16,
      topic:
        'author summary prioritizes Day Branch spouse palace over spouse star while explicitly retaining husband-context Wealth and wife-context Officer spouse-star branching',
    }),
    Object.freeze({
      printedPage: 162,
      physicalPdfPage: 20,
      topic:
        'conclusion states that spouse-focused compatibility should compare both male and female complete birth-date-time charts',
    }),
    Object.freeze({
      printedPage: 163,
      physicalPdfPage: 21,
      topic:
        'conclusion repeats that spouse palace and spouse star are both important and Day Branch spouse palace is more important than spouse star',
    }),
    Object.freeze({
      printedPage: 166,
      physicalPdfPage: 24,
      topic:
        'Korean abstract repeats both complete-two-chart comparison and Day Branch spouse-palace priority over spouse star',
    }),
    Object.freeze({
      printedPage: 168,
      physicalPdfPage: 26,
      topic:
        'article record states receipt, review completion, and editorial publication approval dates',
    }),
  ] as const),
  dayBranchSpousePalaceExplicit: true as const,
  spousePalacePriorityOverSpouseStarExplicit: true as const,
  femaleChartHusbandAsOfficerExplicit: true as const,
  maleNativeSpouseStarAsWealthExplicit: true as const,
  femaleNativeSpouseStarAsOfficerExplicit: true as const,
  nativeSexConditionedSpouseSemanticsExplicit: true as const,
  completeMaleAndFemaleChartsComparedExplicit: true as const,
  dyadicCompatibilityInputRequired: true as const,
  modernCompatibilityUseBeyondMarriageDiscussed: true as const,
  modernizationReplacesSexConditionedSpouseRule: false as const,
  nativeSexIndependentOperationalSelectorFound: false as const,
  partnerSexIndependentOperationalSelectorFound: false as const,
  singleNativeNatalSelectorFound: false as const,
  pureNatalRoleNeutralSpouseSelectorFound: false as const,
  completeRoleNeutralNatalInputContractFound: false as const,
  explicitRoleNeutralNatalMappingGapClosedByThisEvidence: false as const,
  currentGovernedSemanticCorrespondenceGapClosedByThisEvidence: false as const,
  relationshipT6InputGapClosedByThisEvidence: false as const,
  exactPositiveBoundary:
    'The directly inspected article publishes a clear spouse-specific positional rule: Day Branch is spouse palace, and the author explicitly prioritizes that palace over spouse star. This is a real operational location layer and must be preserved as such.',
  exactNegativeBoundary:
    'The same full body does not publish one native-sex-independent and partner-sex-independent single-native spouse selector. Printed p.157 differentiates female-chart and male-chart compatibility logic; printed p.158 preserves native-role spouse-star branching (male/native husband context -> Wealth, female/native wife context -> Officer); and pp.162/166 require comparison of both complete birth-date-time charts. The neutral Day-Branch location layer therefore cannot be promoted into the missing role-neutral single-native mapping.',
  noStitchingBoundary:
    'This Day-Branch spouse-palace priority is not combined with Lee Youngeun contextual remapping, Jung Su-a spouse-palace location, Kweon Sujeong same-sex-family discussion, Song Jaewoo actual-role language, Lee Myengjae family critique, Hong Yooseon ideology critique, Kim Young-jin modernization language, Ming Map/editorial material, or any other source to manufacture the missing role-neutral natal spouse selector.',
});

export const RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_2025_DIRECT_BODY_BOUNDARY_CONTROL_IDS = Object.freeze([
  'KIM_MANTAE_2025_AUTHOR_HOSTED_PDF_IDENTITY_IS_CONTENT_ADDRESSED',
  'AUTHOR_PAGE_AUTHORED_DOWNLOAD_CONTRACT_IS_REPRODUCIBLE_WITHOUT_GUESSING',
  'FULL_TWENTY_SIX_PAGE_PDF_WAS_ACQUIRED_WITHOUT_LOGIN_PAYWALL_DRM_OR_AUTH_BYPASS',
  'ALL_PDF_PAGES_RENDERED_AND_MATERIAL_PAGES_VISUALLY_REVIEWED',
  'DAY_BRANCH_SPOUSE_PALACE_IS_PRESERVED_AS_A_REAL_POSITIONAL_RULE',
  'SPOUSE_PALACE_PRIORITY_OVER_SPOUSE_STAR_IS_PRESERVED',
  'FEMALE_CHART_HUSBAND_AS_OFFICER_IS_PRESERVED',
  'MALE_NATIVE_SPOUSE_STAR_AS_WEALTH_IS_PRESERVED',
  'FEMALE_NATIVE_SPOUSE_STAR_AS_OFFICER_IS_PRESERVED',
  'NATIVE_SEX_CONDITIONED_SPOUSE_BRANCHING_IS_NOT_NEUTRALIZED',
  'DYADIC_COMPLETE_TWO_CHART_INPUT_REQUIREMENT_IS_PRESERVED',
  'MODERN_COMPATIBILITY_SCOPE_EXPANSION_IS_NOT_RELABELED_AS_SPOUSE_SELECTOR_REPLACEMENT',
  'DAY_BRANCH_LOCATION_LAYER_IS_NOT_PROMOTED_TO_COMPLETE_ROLE_NEUTRAL_MAPPING',
  'NO_CROSS_SOURCE_STITCHING_TO_MANUFACTURE_MISSING_SELECTOR',
  'QUALIFYING_PRIMARY_WITNESS_REMAINS_CLOSED',
  'INDEPENDENT_NORMATIVE_PROVENANCE_REMAINS_CLOSED',
  'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
  'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
  'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
  'EXACTLY_TWO_OF_FIVE_AUTHORITY_GAPS_REMAIN_CLOSED_AND_PRODUCTION_REMAINS_HOLD',
] as const);

export interface RelationshipSpouseT8KimMantae2025DirectBodyBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_2025_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION;
  upstreamReviewId: string;
  status:
    | 'DIRECT_FULLTEXT_CONFIRMS_DAY_BRANCH_SPOUSE_PALACE_PRIORITY_BUT_RETAINS_NATIVE_SEX_BRANCHING_AND_DYADIC_INPUT'
    | 'UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_2025_DIRECT_BODY_BOUNDARY_CANDIDATE;
  exactUpstreamTwoOfFiveStateAccepted: boolean;
  directFulltextPdfInspected: true;
  roleNeutralSpousePalaceLocationConfirmed: true;
  nativeSexConditionedSpouseSemanticsConfirmed: true;
  dyadicCompatibilityInputConfirmed: true;
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
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_2025_DIRECT_BODY_BOUNDARY_CONTROL_IDS)[number][];
  controlCount: number;
  recommendedNextAction:
    | 'CONTINUE_SINGLE_SOURCE_ROLE_NEUTRAL_SINGLE_NATIVE_SPOUSE_MAPPING_DISCOVERY_WITHOUT_STITCHING_KIM_MANTAE_DAY_BRANCH_PRIORITY'
    | 'REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE';
}

function upstreamTwoOfFiveStateAccepted(): boolean {
  const upstream = buildRelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReview();
  return (
    upstream.status === 'RESOLVED_LEE_YOUNGEUN_2025_INDEPENDENT_NORMATIVE_PROVENANCE_ADEQUACY_REVIEW' &&
    upstream.decision ===
      'LEE_YOUNGEUN_2025_SINGLE_SOURCE_ADEQUATE_FOR_INDEPENDENT_NORMATIVE_PROVENANCE_EXACTLY_TWO_OF_FIVE_GAPS_CLOSED' &&
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

export function buildRelationshipSpouseT8KimMantae2025DirectBodyBoundaryEvidence(): RelationshipSpouseT8KimMantae2025DirectBodyBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReview();
  const accepted = upstreamTwoOfFiveStateAccepted();
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_2025_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
    upstreamReviewId: upstream.reviewId,
    status: accepted
      ? ('DIRECT_FULLTEXT_CONFIRMS_DAY_BRANCH_SPOUSE_PALACE_PRIORITY_BUT_RETAINS_NATIVE_SEX_BRANCHING_AND_DYADIC_INPUT' as const)
      : ('UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID' as const),
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_2025_DIRECT_BODY_BOUNDARY_CANDIDATE,
    exactUpstreamTwoOfFiveStateAccepted: accepted,
    directFulltextPdfInspected: true as const,
    roleNeutralSpousePalaceLocationConfirmed: true as const,
    nativeSexConditionedSpouseSemanticsConfirmed: true as const,
    dyadicCompatibilityInputConfirmed: true as const,
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
      ? RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_2025_DIRECT_BODY_BOUNDARY_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted ? RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_2025_DIRECT_BODY_BOUNDARY_CONTROL_IDS.length : 0,
    recommendedNextAction: accepted
      ? ('CONTINUE_SINGLE_SOURCE_ROLE_NEUTRAL_SINGLE_NATIVE_SPOUSE_MAPPING_DISCOVERY_WITHOUT_STITCHING_KIM_MANTAE_DAY_BRANCH_PRIORITY' as const)
      : ('REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE' as const),
  };
  return {
    evidenceId: `relationship_spouse_t8_kim_mantae_2025_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
