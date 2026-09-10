import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8NamKim2018DirectBodyBoundaryEvidence } from './relationship-spouse-t8-nam-kim-2018-direct-body-boundary-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_GO_JAEMIN_2016_GENDER_CONDITIONED_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-go-jaemin-2016-gender-conditioned-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_GO_JAEMIN_2016_GENDER_CONDITIONED_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'GO_JAEMIN_2016_RISS_DHU_DCOLLECTION_DIRECT_FULLTEXT_PDF',
  author: '고재민',
  publicationYear: 2016,
  title: '四柱命理의 宮星과 格局用神論 硏究',
  institution: '대구한의대학교 대학원',
  department: '동양철학과',
  degree: '박사',
  rissId: 'T14040293',
  rissControl: '01535e75dd09ae73ffe0bdc3ef48d419',
  rissDocControlNo: '14040293',
  rissDocType: 'T',
  nationalLibraryLocalBibno: 'KDM201705404',
  dcollectionItemId: '000002241914',
  directBodyAcquisitionPr: 417,
  acquisitionExactHead: '2f4f8d32184b327e0942c0efa00e2577976d42b4',
  acquisitionRunId: 34466543969,
  acquisitionArtifactId: 10147829019,
  acquisitionArtifactDigest:
    'sha256:4cbe93aba79f794f45e68a9b5dba2cd43164e62d70d6d250bf143ed34a3acdc7',
  rissReturnedPublicDownloadUri:
    'http://dhu.dcollection.net/jsp/common/SvcOrgDownLoad.jsp?item_id=000002241914',
  rissCandidatePageAuthoredPostContractsFollowed: true as const,
  rissReturnedDcollectionUriFollowedWithoutIdentifierGuessing: true as const,
  transportTlsVerificationDisabledOnlyForExactPublicUri: true as const,
  loginBypass: false as const,
  institutionAuthBypass: false as const,
  paywallBypass: false as const,
  drmRequestExecuted: false as const,
  decryptionActionExecuted: false as const,
  accessControlBypass: false as const,
  directPublicPdfObjectInspected: true as const,
  completePdfTextIndexedForLocators: true as const,
  allPdfPagesRenderedBeforeSemanticJudgment: true as const,
  materialPagesVisuallyReviewed: true as const,
  pdfSha256: 'cec0ba5dabd64087ce3ca7b0cc1f86fcac5bb0354b63f9ce3f4c45c8cb8155f7',
  pdfBytes: 2_225_865,
  pdfPageCount: 196,
  pdfEncrypted: false as const,
  physicalPdfPageMap: Object.freeze([
    Object.freeze({
      physicalPdfPage: 56,
      topic:
        'Day Branch is explicitly treated as spouse palace in a traditional family-role allocation table',
    }),
    Object.freeze({
      physicalPdfPage: 59,
      topic:
        'traditional palace layout explicitly places wife at the Day-Branch spouse position and discusses the Day position as wife palace',
    }),
    Object.freeze({
      physicalPdfPage: 72,
      topic:
        'inherited spouse rule states 我剋者爲妻妾, assigning what the male native controls to wife or concubine',
    }),
    Object.freeze({
      physicalPdfPage: 73,
      topic:
        'Ten-God spouse interpretation continues the sex-conditioned wife and husband family-role semantics',
    }),
    Object.freeze({
      physicalPdfPage: 89,
      topic:
        'the body explicitly states 財星은 乾命에 있어서는 아내를 의미하게 된다, mapping Wealth to wife in a male Qian native',
    }),
    Object.freeze({
      physicalPdfPage: 120,
      topic:
        'the female Kun-native counterpart explicitly uses Officer star as husband rather than publishing one sex-independent spouse selector',
    }),
  ] as const),
  dayBranchSpousePalaceExplicit: true as const,
  wifePalaceAtDayPositionExplicit: true as const,
  maleQianNativeWealthAsWifeExplicit: true as const,
  femaleKunNativeOfficerAsHusbandExplicit: true as const,
  woKeZheWeiQiQieWifeConcubineRuleExplicit: true as const,
  nativeSexConditionedSpouseMappingExplicit: true as const,
  sexCommonLocationLayerExists: true as const,
  sexCommonLocationLayerReplacesSexConditionedStarSelector: false as const,
  nativeSexIndependentOperationalSelectorFound: false as const,
  partnerSexIndependentOperationalSelectorFound: false as const,
  pureNatalRoleNeutralSpouseSelectorFound: false as const,
  completeRoleNeutralNatalInputContractFound: false as const,
  explicitRoleNeutralNatalMappingGapClosedByThisEvidence: false as const,
  currentGovernedSemanticCorrespondenceGapClosedByThisEvidence: false as const,
  relationshipT6InputGapClosedByThisEvidence: false as const,
  exactPositiveBoundary:
    'The directly inspected 196-page thesis contains explicit spouse-specific natal semantics: the Day Branch is treated as spouse palace and the body operationally discusses spouse stars and spouse-palace relations.',
  exactNegativeBoundary:
    'The same body directly preserves sex-conditioned spouse selection. Wealth is wife in a male/Qian native, Officer is husband in a female/Kun native, and the inherited 我剋者爲妻妾 rule is explicitly retained. The sex-common Day-Branch location layer therefore cannot be promoted into one native-sex-independent and partner-sex-independent spouse selector.',
  noStitchingBoundary:
    'Go Jaemin 2016 Day-Branch spouse-palace material is not combined with Nam/Kim 2018 spouse-palace priority, Kim Mantae 2025 positional evidence, Lee Sangcheon 2017 equality language, Noh/Kim 2019 equality reinterpretation, Song Jaewoo actual-role language, same-sex-family discussion, product partner terminology, or any other partial source to manufacture the missing role-neutral natal spouse selector.',
});

export const RELATIONSHIP_SPOUSE_T8_GO_JAEMIN_2016_GENDER_CONDITIONED_BOUNDARY_CONTROL_IDS = Object.freeze([
  'GO_JAEMIN_2016_EXACT_TITLE_AUTHOR_YEAR_INSTITUTION_AND_RISS_IDENTITY_ARE_PINNED',
  'RISS_ID_HASH_CONTROL_DOC_CONTROL_LOCAL_BIBNO_AND_DCOLLECTION_ITEM_ARE_DISTINGUISHED_AND_PINNED',
  'RISS_CANDIDATE_PAGE_AUTHORED_POST_CONTRACTS_ARE_FOLLOWED_WITHOUT_OPAQUE_ID_GUESSING',
  'EXACT_RISS_RETURNED_DCOLLECTION_URI_IS_PINNED',
  'TRANSPORT_ONLY_TLS_CERTIFICATE_VERIFICATION_WORKAROUND_IS_LIMITED_TO_THE_EXACT_ALREADY_PUBLIC_URI',
  'NO_LOGIN_INSTITUTION_PAYWALL_DRM_DECRYPTION_OR_ACCESS_CONTROL_BYPASS_OCCURRED',
  'FULL_PDF_SHA256_BYTES_PAGE_COUNT_AND_ENCRYPTION_STATE_ARE_CONTENT_ADDRESSED',
  'ALL_196_PDF_PAGES_ARE_RENDERED_BEFORE_SEMANTIC_JUDGMENT',
  'PHYSICAL_56_DAY_BRANCH_SPOUSE_PALACE_IS_DIRECTLY_REVIEWED',
  'PHYSICAL_59_WIFE_PALACE_AT_DAY_POSITION_IS_DIRECTLY_REVIEWED',
  'PHYSICAL_72_WO_KE_ZHE_WEI_QI_QIE_WIFE_CONCUBINE_RULE_IS_DIRECTLY_REVIEWED',
  'PHYSICAL_89_QIAN_NATIVE_WEALTH_AS_WIFE_IS_DIRECTLY_REVIEWED',
  'PHYSICAL_120_KUN_NATIVE_OFFICER_AS_HUSBAND_IS_DIRECTLY_REVIEWED',
  'SEX_COMMON_DAY_BRANCH_LOCATION_LAYER_IS_PRESERVED_AS_REAL_POSITIVE_EVIDENCE',
  'SEX_COMMON_LOCATION_LAYER_IS_NOT_PROMOTED_TO_COMPLETE_ROLE_NEUTRAL_STAR_SELECTOR',
  'NATIVE_SEX_CONDITIONED_WEALTH_WIFE_AND_OFFICER_HUSBAND_BRANCHING_IS_NOT_NEUTRALIZED',
  'NO_NATIVE_SEX_INDEPENDENT_SPOUSE_SELECTOR_IS_INVENTED',
  'NO_PARTNER_SEX_INDEPENDENT_SPOUSE_SELECTOR_IS_INVENTED',
  'NO_COMPLETE_ROLE_NEUTRAL_NATAL_INPUT_CONTRACT_IS_INVENTED',
  'NO_CROSS_SOURCE_STITCHING_TO_MANUFACTURE_MISSING_SELECTOR',
  'QUALIFYING_PRIMARY_WITNESS_REMAINS_CLOSED',
  'INDEPENDENT_NORMATIVE_PROVENANCE_REMAINS_CLOSED',
  'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
  'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
  'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
  'EXACTLY_TWO_OF_FIVE_AUTHORITY_GAPS_REMAIN_CLOSED_AND_PRODUCTION_REMAINS_HOLD',
] as const);

export interface RelationshipSpouseT8GoJaemin2016GenderConditionedBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_GO_JAEMIN_2016_GENDER_CONDITIONED_BOUNDARY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status:
    | 'DIRECT_FULLTEXT_CONFIRMS_GENDER_CONDITIONED_SPOUSE_MAPPING_WITHOUT_ROLE_NEUTRAL_NATAL_SELECTOR'
    | 'UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_GO_JAEMIN_2016_GENDER_CONDITIONED_BOUNDARY_CANDIDATE;
  exactUpstreamTwoOfFiveStateAccepted: boolean;
  directFulltextPdfInspected: true;
  spousePalaceLocationLayerConfirmed: true;
  nativeSexConditionedSpouseMappingConfirmed: true;
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
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_GO_JAEMIN_2016_GENDER_CONDITIONED_BOUNDARY_CONTROL_IDS)[number][];
  controlCount: number;
  recommendedNextAction:
    | 'CONTINUE_SINGLE_SOURCE_ROLE_NEUTRAL_NATAL_SPOUSE_MAPPING_DISCOVERY_WITH_NATIVE_AND_PARTNER_SEX_INDEPENDENCE_REQUIRED'
    | 'REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE';
}

function upstreamTwoOfFiveStateAccepted(): boolean {
  const upstream = buildRelationshipSpouseT8NamKim2018DirectBodyBoundaryEvidence();
  return (
    upstream.status ===
      'DIRECT_FULLTEXT_CONFIRMS_SPOUSE_PALACE_PRIORITY_WITH_SEX_CONDITIONED_SPOUSE_STARS_AND_DYADIC_INPUT' &&
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

export function buildRelationshipSpouseT8GoJaemin2016GenderConditionedBoundaryEvidence(): RelationshipSpouseT8GoJaemin2016GenderConditionedBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8NamKim2018DirectBodyBoundaryEvidence();
  const accepted = upstreamTwoOfFiveStateAccepted();
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_GO_JAEMIN_2016_GENDER_CONDITIONED_BOUNDARY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status: accepted
      ? ('DIRECT_FULLTEXT_CONFIRMS_GENDER_CONDITIONED_SPOUSE_MAPPING_WITHOUT_ROLE_NEUTRAL_NATAL_SELECTOR' as const)
      : ('UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID' as const),
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_GO_JAEMIN_2016_GENDER_CONDITIONED_BOUNDARY_CANDIDATE,
    exactUpstreamTwoOfFiveStateAccepted: accepted,
    directFulltextPdfInspected: true as const,
    spousePalaceLocationLayerConfirmed: true as const,
    nativeSexConditionedSpouseMappingConfirmed: true as const,
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
      ? RELATIONSHIP_SPOUSE_T8_GO_JAEMIN_2016_GENDER_CONDITIONED_BOUNDARY_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted
      ? RELATIONSHIP_SPOUSE_T8_GO_JAEMIN_2016_GENDER_CONDITIONED_BOUNDARY_CONTROL_IDS.length
      : 0,
    recommendedNextAction: accepted
      ? ('CONTINUE_SINGLE_SOURCE_ROLE_NEUTRAL_NATAL_SPOUSE_MAPPING_DISCOVERY_WITH_NATIVE_AND_PARTNER_SEX_INDEPENDENCE_REQUIRED' as const)
      : ('REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE' as const),
  };

  return {
    evidenceId: `relationship_spouse_t8_go_jaemin_2016_gender_conditioned_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
