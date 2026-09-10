import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8JeonSuhyun2016DirectBodyBoundaryEvidence } from './relationship-spouse-t8-jeon-suhyun-2016-direct-body-boundary-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_PARK_OE_SUK_2023_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-park-oe-suk-2023-direct-body-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_PARK_OE_SUK_2023_DIRECT_BODY_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'PARK_OE_SUK_2023_RISS_KYONGGI_DCOLLECTION_DIRECT_FULLTEXT_PDF',
  author: '박외숙',
  publicationYear: 2023,
  title: '四柱命理學 古典에 나타난 六親의 原理와 關係에 대한 硏究',
  institution: '경기대학교 대학원',
  department: '동양문화학과',
  degree: '박사',
  rissId: 'T16818829',
  rissControl: 'b4338a3915d9039bffe0bdc3ef48d419',
  nanetControl: 'KDMT12023000053361',
  dcollectionItemId: '000000057593',
  exactRissIdentityDirectlyObserved: true as const,
  nanetExactIdentityDirectlyObserved: true as const,
  rissPublicFulltextObserved: true as const,
  rissAuthoredDcollectionRouteFollowed: true as const,
  dcollectionPublicPdfRouteDirectlyAuthored: true as const,
  dcollectionDrm: 'N' as const,
  dcollectionAgree: 'Y' as const,
  directPublicPdfObjectInspected: true as const,
  completePdfTextExtracted: true as const,
  materialPagesVisuallyReviewed: true as const,
  pdfSha256: '94f975f3e22041886fd20507b50c73a5565aed15bdbd02a8894c427719e84d6d',
  pdfBytes: 1_823_802,
  pdfPageCount: 200,
  pdfEncrypted: false as const,
  pdfVersion: '1.4' as const,
  printedBodyPageOffset: 10,
  printedToPhysicalPageMap: Object.freeze([
    Object.freeze({
      printedPage: 84,
      physicalPdfPage: 94,
      topic: 'separate male-chart and female-chart Yukchin allocation diagrams explicitly publish sex-split kinship assignments',
    }),
    Object.freeze({
      printedPage: 144,
      physicalPdfPage: 154,
      topic:
        'author synthesis explicitly assigns Wealth as wife for men and Officer as husband for women while explaining Yin-Yang and Five-Element family construction',
    }),
    Object.freeze({
      printedPage: 146,
      physicalPdfPage: 156,
      topic:
        'cross-relative family interpretation is generalized while woman-versus-man child and spouse assignments remain sex-conditioned',
    }),
    Object.freeze({
      printedPage: 150,
      physicalPdfPage: 160,
      topic:
        'social and cross-relative semantic expansion is explicit, while a Geng-Metal woman still uses Officer as husband or man',
    }),
    Object.freeze({
      printedPage: 167,
      physicalPdfPage: 177,
      topic:
        'Day position is labeled self-and-spouse palace, but the cited classical rule directly underneath maps Day Branch to wife or concubines',
    }),
    Object.freeze({
      printedPage: 172,
      physicalPdfPage: 182,
      topic: 'wife palace is Day Branch and wife star is explicitly Wealth in the heavenly stems',
    }),
    Object.freeze({
      printedPage: 174,
      physicalPdfPage: 184,
      topic:
        'female no-exposed-Officer case is re-read by the author as hidden Xin-Metal Direct Officer husband interacting with the spouse palace',
    }),
    Object.freeze({
      printedPage: 176,
      physicalPdfPage: 186,
      topic: 'male chart reads Wealth or spouse-palace Earth as wife and Officer as child',
    }),
    Object.freeze({
      printedPage: 177,
      physicalPdfPage: 187,
      topic: 'conclusion describes family construction through Yin-Yang male-female union, marriage, and children',
    }),
    Object.freeze({
      printedPage: 178,
      physicalPdfPage: 188,
      topic: 'conclusion gives Direct Wealth as wife or wealth while separating theoretical balance from period-specific social meanings',
    }),
    Object.freeze({
      printedPage: 179,
      physicalPdfPage: 189,
      topic: 'proposal again states that Yin and Yang combine to set marital relations and derive family relations',
    }),
    Object.freeze({
      printedPage: 180,
      physicalPdfPage: 190,
      topic: 'remaining proposal discusses terminology and counseling scope without publishing a replacement spouse selector',
    }),
  ] as const),
  sexSplitYukchinAllocationExplicit: true as const,
  maleWealthAsWifeExplicit: true as const,
  femaleOfficerAsHusbandExplicit: true as const,
  crossRelativeInterpretationExplicit: true as const,
  socialAndInstitutionalMeaningExpansionExplicit: true as const,
  sexCommonSpousePalaceLocationExplicit: true as const,
  wifePalaceDayBranchAndWifeStarWealthExplicit: true as const,
  femaleCaseSpecificFunctionalSubstitutionDiscussionExplicit: true as const,
  authorReanchorsFemaleHusbandToHiddenDirectOfficer: true as const,
  maleCaseWealthWifeAndOfficerChildExplicit: true as const,
  conclusionMaleFemaleUnionFamilySystemExplicit: true as const,
  proposalYinYangCombinationSetsMaritalRelationExplicit: true as const,
  crossRelativeExpansionReplacesSpouseSelector: false as const,
  spousePalaceNeutralityReplacesSpouseStarSelector: false as const,
  caseSpecificFunctionalSubstitutionIsRoleNeutralSelector: false as const,
  spouseSpecificOperationalReplacementSelectorPublished: false as const,
  nativeSexIndependentOperationalSelectorFound: false as const,
  partnerSexIndependentOperationalSelectorFound: false as const,
  pureNatalRoleNeutralSpouseSelectorFound: false as const,
  completeRoleNeutralNatalInputContractFound: false as const,
  explicitRoleNeutralNatalMappingGapClosedByThisEvidence: false as const,
  currentGovernedSemanticCorrespondenceGapClosedByThisEvidence: false as const,
  relationshipT6InputGapClosedByThisEvidence: false as const,
  exactPositiveBoundary:
    'The directly inspected thesis publishes a sex-common self-and-spouse Day-position layer, a rich cross-relative interpretation method, social and institutional semantic expansion, and case-level interaction between spouse palace and kinship stars. These are material methodology findings.',
  exactNegativeBoundary:
    'The same source explicitly preserves sex-conditioned spouse-star semantics. Its author synthesis maps Wealth to wife for men and Officer to husband for women, its examples retain female Officer-husband and male Wealth-wife usage, and its conclusion and proposal reconstruct family and marital relations through Yin-Yang male-female union. It does not publish a native-sex-independent, partner-sex-independent operational spouse selector or a complete natal-facts-only role-neutral spouse input contract.',
  noStitchingBoundary:
    'Park Oe-suk 2023 sex-common spouse-palace location, cross-relative semantic expansion, social-role expansion, and case-specific functional substitution are not combined with other scholarly or editorial sources to manufacture the missing role-neutral spouse-star selector. Location neutrality, semantic flexibility, and case substitution are each insufficient to override the source explicit sex-conditioned spouse branching.',
});

export const RELATIONSHIP_SPOUSE_T8_PARK_OE_SUK_2023_DIRECT_BODY_BOUNDARY_CONTROL_IDS = Object.freeze([
  'PARK_OE_SUK_2023_EXACT_RISS_TITLE_AUTHOR_YEAR_INSTITUTION_IDENTITY_IS_PINNED',
  'RISS_ID_CONTROL_AND_NANET_CONTROL_ARE_PINNED',
  'RISS_SITE_AUTHORED_FULLTEXT_CHAIN_IS_FOLLOWED_WITHOUT_OPAQUE_ID_GUESSING',
  'KYONGGI_DCOLLECTION_ITEM_000000057593_IS_RISS_AUTHORED',
  'DCOLLECTION_PAGE_AUTHORS_THE_PUBLIC_PDF_TARGET',
  'DCOLLECTION_DRM_N_AND_AGREE_Y_ARE_PINNED',
  'FULL_PDF_SHA256_BYTES_PAGE_COUNT_VERSION_AND_ENCRYPTION_STATE_ARE_CONTENT_ADDRESSED',
  'PRINTED_84_PHYSICAL_94_MALE_AND_FEMALE_YUKCHIN_ALLOCATION_DIAGRAMS_ARE_DIRECTLY_REVIEWED',
  'PRINTED_144_PHYSICAL_154_MALE_WEALTH_WIFE_AND_FEMALE_OFFICER_HUSBAND_ASSIGNMENTS_ARE_EXPLICIT',
  'PRINTED_146_TO_150_PHYSICAL_156_TO_160_CROSS_RELATIVE_AND_SOCIAL_SEMANTIC_EXPANSION_IS_DIRECTLY_REVIEWED',
  'CROSS_RELATIVE_AND_SOCIAL_EXPANSION_IS_NOT_CONVERTED_TO_ROLE_NEUTRAL_SPOUSE_SELECTION',
  'PRINTED_167_PHYSICAL_177_SELF_AND_SPOUSE_PALACE_LOCATION_LAYER_IS_DIRECTLY_REVIEWED',
  'SEX_COMMON_SPOUSE_PALACE_LOCATION_IS_NOT_CONVERTED_TO_SPOUSE_STAR_NEUTRALITY',
  'PRINTED_172_PHYSICAL_182_WIFE_PALACE_DAY_BRANCH_AND_WIFE_STAR_WEALTH_RULE_IS_DIRECTLY_REVIEWED',
  'PRINTED_173_TO_174_PHYSICAL_183_TO_184_FEMALE_NO_EXPOSED_OFFICER_CASE_IS_DIRECTLY_REVIEWED',
  'CASE_SPECIFIC_FUNCTIONAL_SUBSTITUTION_IS_NOT_CONVERTED_TO_A_GENERAL_ROLE_NEUTRAL_SELECTOR',
  'AUTHOR_REANCHORS_FEMALE_HUSBAND_TO_HIDDEN_DIRECT_OFFICER',
  'PRINTED_175_TO_176_PHYSICAL_185_TO_186_MALE_WEALTH_WIFE_AND_OFFICER_CHILD_CASE_IS_DIRECTLY_REVIEWED',
  'PRINTED_177_TO_179_PHYSICAL_187_TO_189_CONCLUSION_AND_PROPOSAL_PRESERVE_YIN_YANG_MALE_FEMALE_MARITAL_CONSTRUCTION',
  'PRINTED_180_PHYSICAL_190_DOES_NOT_PUBLISH_A_REPLACEMENT_SPOUSE_SELECTOR',
  'NO_NATIVE_SEX_INDEPENDENT_SPOUSE_SELECTOR_IS_INVENTED',
  'NO_PARTNER_SEX_INDEPENDENT_SPOUSE_SELECTOR_IS_INVENTED',
  'NO_PURE_NATAL_COMPLETE_ROLE_NEUTRAL_INPUT_CONTRACT_IS_INVENTED',
  'NO_CROSS_SOURCE_STITCHING_TO_MANUFACTURE_MISSING_SELECTOR',
  'QUALIFYING_PRIMARY_WITNESS_REMAINS_CLOSED',
  'INDEPENDENT_NORMATIVE_PROVENANCE_REMAINS_CLOSED',
  'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
  'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
  'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
  'EXACTLY_TWO_OF_FIVE_AUTHORITY_GAPS_REMAIN_CLOSED_AND_PRODUCTION_REMAINS_HOLD',
] as const);

export interface RelationshipSpouseT8ParkOeSuk2023DirectBodyBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_PARK_OE_SUK_2023_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status:
    | 'DIRECT_FULLTEXT_CONFIRMS_SEX_SPLIT_SPOUSE_STAR_MAPPING_DESPITE_CROSS_RELATIVE_AND_SPOUSE_PALACE_EXPANSION'
    | 'UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_PARK_OE_SUK_2023_DIRECT_BODY_BOUNDARY_CANDIDATE;
  exactUpstreamTwoOfFiveStateAccepted: boolean;
  directFulltextPdfInspected: true;
  sexSplitSpouseStarMappingConfirmed: true;
  crossRelativeSemanticExpansionConfirmed: true;
  sexCommonSpousePalaceLocationConfirmed: true;
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
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_PARK_OE_SUK_2023_DIRECT_BODY_BOUNDARY_CONTROL_IDS)[number][];
  controlCount: number;
  recommendedNextAction:
    | 'CONTINUE_SINGLE_SOURCE_ROLE_NEUTRAL_NATAL_SPOUSE_MAPPING_DISCOVERY_WITH_EXPLICIT_NATIVE_AND_PARTNER_SEX_INDEPENDENCE_REQUIRED'
    | 'REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE';
}

function upstreamTwoOfFiveStateAccepted(): boolean {
  const upstream = buildRelationshipSpouseT8JeonSuhyun2016DirectBodyBoundaryEvidence();
  return (
    upstream.status ===
      'DIRECT_FULLTEXT_CONFIRMS_MODERN_SEX_CONDITIONED_OFFICER_SPOUSE_USAGE_WITHOUT_ROLE_NEUTRAL_REPLACEMENT_SELECTOR' &&
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

export function buildRelationshipSpouseT8ParkOeSuk2023DirectBodyBoundaryEvidence(): RelationshipSpouseT8ParkOeSuk2023DirectBodyBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8JeonSuhyun2016DirectBodyBoundaryEvidence();
  const accepted = upstreamTwoOfFiveStateAccepted();
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_PARK_OE_SUK_2023_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status: accepted
      ? ('DIRECT_FULLTEXT_CONFIRMS_SEX_SPLIT_SPOUSE_STAR_MAPPING_DESPITE_CROSS_RELATIVE_AND_SPOUSE_PALACE_EXPANSION' as const)
      : ('UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID' as const),
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_PARK_OE_SUK_2023_DIRECT_BODY_BOUNDARY_CANDIDATE,
    exactUpstreamTwoOfFiveStateAccepted: accepted,
    directFulltextPdfInspected: true as const,
    sexSplitSpouseStarMappingConfirmed: true as const,
    crossRelativeSemanticExpansionConfirmed: true as const,
    sexCommonSpousePalaceLocationConfirmed: true as const,
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
      ? RELATIONSHIP_SPOUSE_T8_PARK_OE_SUK_2023_DIRECT_BODY_BOUNDARY_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted ? RELATIONSHIP_SPOUSE_T8_PARK_OE_SUK_2023_DIRECT_BODY_BOUNDARY_CONTROL_IDS.length : 0,
    recommendedNextAction: accepted
      ? ('CONTINUE_SINGLE_SOURCE_ROLE_NEUTRAL_NATAL_SPOUSE_MAPPING_DISCOVERY_WITH_EXPLICIT_NATIVE_AND_PARTNER_SEX_INDEPENDENCE_REQUIRED' as const)
      : ('REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE' as const),
  };
  return {
    evidenceId: `relationship_spouse_t8_park_oe_suk_2023_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
