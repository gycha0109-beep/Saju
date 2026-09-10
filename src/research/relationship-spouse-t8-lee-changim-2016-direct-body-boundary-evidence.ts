import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8ChoiEunkyung2013AccessBoundaryEvidence } from './relationship-spouse-t8-choi-eunkyung-2013-access-boundary-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_LEE_CHANGIM_2016_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-lee-changim-2016-direct-body-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_LEE_CHANGIM_2016_DIRECT_BODY_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'LEE_CHANGIM_2016_OPERATIONAL_DYADIC_GUNGWI_BOUNDARY',
  author: '이창임',
  publicationYear: 2016,
  title: '子平四柱를 통한 夫婦宮合 硏究 : 宮位論을 中心으로',
  school: '경기대학교 예술대학원',
  rissId: 'T14205410',
  rissControlNo: '08d9a0b65772bc3cffe0bdc3ef48d419',
  dcollectionItemId: '000000043815',
  disposableAcquisitionPr: 429,
  acquisitionPrClosedUnmerged: true as const,
  acquisitionExactHead: '0c58daaebd02c2aaac424273271e303cda369fb5',
  acquisitionRunId: 34532985241,
  acquisitionArtifactId: 10174291552,
  acquisitionArtifactDigest:
    'sha256:0b29fea70fd1dc33272d36668f02ce8efc36b9c27484cc33c5347f5e06611136',
  ciRunId: 34532985353,
  pccRunId: 34532985237,
  pieRunId: 34532986185,
  pdfSha256: '345be709969973e897dafe1269268d5b82c219bb768fa0bcdbb6ab71c652372b',
  pdfBytes: 782_960,
  pdfPages: 84,
  pdfEncrypted: false as const,
  dcollectionDrmNObserved: true as const,
  dcollectionAgreeYObserved: true as const,
  guessedOpaqueIdentifierCount: 0 as const,
  tlsVerificationDisabled: false as const,
  loginBypass: false as const,
  institutionAuthBypass: false as const,
  paywallBypass: false as const,
  drmRequestExecuted: false as const,
  decryptionActionExecuted: false as const,
  allPhysicalPagesRenderedBeforeSemanticJudgment: true as const,
  directBodySemanticReviewPerformed: true as const,
  decisivePages: Object.freeze([
    Object.freeze({ physicalPage: 20, printedPage: 11, finding: 'Inherited palace theory keeps the male Day Branch in wife-palace / wife-star framing.' }),
    Object.freeze({ physicalPage: 21, printedPage: 12, finding: 'Yukshin compatibility explicitly maps female Officer to husband star and male Wealth to wife star, then compares those spouse stars against the counterpart chart.' }),
    Object.freeze({ physicalPage: 24, printedPage: 15, finding: 'Yongshin and pairing rules explicitly compare male and female charts and preserve sex-conditioned pairing language.' }),
    Object.freeze({ physicalPage: 43, printedPage: 34, finding: 'The empirical method operationalizes Day Stem as outer compatibility and Day Branch as inner compatibility for the couple.' }),
    Object.freeze({ physicalPage: 44, printedPage: 35, finding: 'The first result class compares both partners Day Stems and Day Branches and presents separate Qian/Kun charts.' }),
    Object.freeze({ physicalPage: 72, printedPage: 63, finding: 'The conclusion classifies married couples through operational Day-Stem and Day-Branch relation combinations.' }),
    Object.freeze({ physicalPage: 73, printedPage: 64, finding: 'The conclusion continues the four couple-level Day-Stem/Day-Branch relation classes.' }),
    Object.freeze({ physicalPage: 77, printedPage: 68, finding: 'The author states Gungwi alone was selected from Gungwi/Yukshin/Yongshin and explicitly identifies the married couple as the unit of analysis.' }),
  ] as const),
  operationalDayStemCompatibilityEstablished: true as const,
  operationalDayBranchCompatibilityEstablished: true as const,
  operationalDyadicGungwiCompatibilityEstablished: true as const,
  twoPartnerNatalChartsRequired: true as const,
  femaleOfficerMeansHusbandExplicit: true as const,
  maleWealthMeansWifeExplicit: true as const,
  explicitNativeSexIndependentSpouseStarMappingPublished: false as const,
  explicitPartnerSexIndependentSpouseSelectorPublished: false as const,
  singleNativeNatalSpouseSelectorPublished: false as const,
  completeRoleNeutralSingleNativeInputContractPublished: false as const,
  bodyLevelAdmissionDecisionMade: true as const,
  explicitRoleNeutralNatalMappingGapClosedByThisEvidence: false as const,
  currentGovernedSemanticCorrespondenceGapClosedByThisEvidence: false as const,
  relationshipT6InputGapClosedByThisEvidence: false as const,
  exactBoundary:
    'Lee Changim 2016 directly publishes an operational couple-level Gungwi method that compares both partners Day Stems and Day Branches. The same thesis preserves female-Officer/husband and male-Wealth/wife spouse-star semantics and never replaces the dyadic two-chart method with a complete single-native role-neutral natal spouse selector. The operational Gungwi layer is therefore preserved as positive evidence without closing the missing selector authority.',
  noStitchingBoundary:
    'The symmetric Day-Stem/Day-Branch comparison layer is not combined with another source, product-neutral terminology, or a different spouse-star rule to manufacture a single-native role-neutral selector that Lee Changim 2016 does not publish.',
});

export const RELATIONSHIP_SPOUSE_T8_LEE_CHANGIM_2016_DIRECT_BODY_BOUNDARY_CONTROL_IDS = Object.freeze([
  'LEE_CHANGIM_2016_EXACT_SCHOLARLY_AND_PUBLIC_FULLTEXT_IDENTITY_IS_PINNED',
  'DISPOSABLE_ACQUISITION_PR_429_IS_CLOSED_UNMERGED',
  'EXACT_84_PAGE_NON_ENCRYPTED_PDF_IS_CONTENT_ADDRESSED',
  'ALL_84_PHYSICAL_PAGES_ARE_RENDERED_BEFORE_SEMANTIC_JUDGMENT',
  'DAY_STEM_IS_OPERATIONALIZED_AS_OUTER_COUPLE_COMPATIBILITY',
  'DAY_BRANCH_IS_OPERATIONALIZED_AS_INNER_COUPLE_COMPATIBILITY',
  'OPERATIONAL_GUNGWI_METHOD_REQUIRES_TWO_PARTNER_NATAL_CHARTS',
  'FEMALE_OFFICER_TO_HUSBAND_STAR_MAPPING_IS_EXPLICIT_IN_BODY',
  'MALE_WEALTH_TO_WIFE_STAR_MAPPING_IS_EXPLICIT_IN_BODY',
  'NO_SINGLE_NATIVE_NATAL_SPOUSE_SELECTOR_IS_PUBLISHED',
  'NO_EXPLICIT_NATIVE_SEX_INDEPENDENT_SPOUSE_STAR_MAPPING_IS_PUBLISHED',
  'NO_EXPLICIT_PARTNER_SEX_INDEPENDENT_SPOUSE_SELECTOR_IS_PUBLISHED',
  'NO_COMPLETE_ROLE_NEUTRAL_SINGLE_NATIVE_INPUT_CONTRACT_IS_PUBLISHED',
  'NO_CROSS_SOURCE_STITCHING_TO_MANUFACTURE_MISSING_SELECTOR',
  'QUALIFYING_PRIMARY_WITNESS_REMAINS_CLOSED',
  'INDEPENDENT_NORMATIVE_PROVENANCE_REMAINS_CLOSED',
  'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
  'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
  'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
  'EXACTLY_TWO_OF_FIVE_AUTHORITY_GAPS_REMAIN_CLOSED_AND_PRODUCTION_REMAINS_HOLD',
] as const);

export interface RelationshipSpouseT8LeeChangim2016DirectBodyBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_LEE_CHANGIM_2016_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status:
    | 'DIRECT_BODY_OPERATIONAL_DYADIC_GUNGWI_POSITIVE_SINGLE_NATIVE_ROLE_NEUTRAL_SELECTOR_NEGATIVE'
    | 'UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_LEE_CHANGIM_2016_DIRECT_BODY_BOUNDARY_CANDIDATE;
  exactUpstreamTwoOfFiveStateAccepted: boolean;
  directFulltextPdfInspected: true;
  allPhysicalPagesRenderedBeforeSemanticJudgment: true;
  directBodySemanticReviewPerformed: true;
  bodyLevelAdmissionDecisionMade: true;
  operationalDyadicGungwiCompatibilityEstablished: true;
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
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_LEE_CHANGIM_2016_DIRECT_BODY_BOUNDARY_CONTROL_IDS)[number][];
  controlCount: number;
  recommendedNextAction:
    | 'CONTINUE_SINGLE_SOURCE_DISCOVERY_FOR_COMPLETE_SINGLE_NATIVE_ROLE_NEUTRAL_NATAL_SPOUSE_SELECTOR'
    | 'REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE';
}

type UpstreamReport = ReturnType<typeof buildRelationshipSpouseT8ChoiEunkyung2013AccessBoundaryEvidence>;

function upstreamTwoOfFiveStateAccepted(upstream: UpstreamReport): boolean {
  return (
    upstream.status === 'PUBLIC_ROUTE_TLS_VERIFICATION_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION' &&
    upstream.exactUpstreamTwoOfFiveStateAccepted === true &&
    upstream.explicitRoleNeutralNatalMappingEstablished === false &&
    upstream.currentGovernedMethodSemanticCorrespondenceEstablished === false &&
    upstream.currentRelationshipT6InputPathEstablished === false &&
    upstream.qualifyingPrimaryWitnessRemainsClosed === true &&
    upstream.independentNormativeProvenanceRemainsClosed === true &&
    upstream.authorityGapsClosedCount === 2 &&
    upstream.authorityGapsOpenCount === 3 &&
    upstream.authorityAdmissionReady === false &&
    upstream.spouseT8ProducerReady === false &&
    upstream.productionPromotionReady === false &&
    upstream.productionState === 'HOLD'
  );
}

export function buildRelationshipSpouseT8LeeChangim2016DirectBodyBoundaryEvidence(): RelationshipSpouseT8LeeChangim2016DirectBodyBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8ChoiEunkyung2013AccessBoundaryEvidence();
  const accepted = upstreamTwoOfFiveStateAccepted(upstream);
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_LEE_CHANGIM_2016_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status: accepted
      ? ('DIRECT_BODY_OPERATIONAL_DYADIC_GUNGWI_POSITIVE_SINGLE_NATIVE_ROLE_NEUTRAL_SELECTOR_NEGATIVE' as const)
      : ('UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID' as const),
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_LEE_CHANGIM_2016_DIRECT_BODY_BOUNDARY_CANDIDATE,
    exactUpstreamTwoOfFiveStateAccepted: accepted,
    directFulltextPdfInspected: true as const,
    allPhysicalPagesRenderedBeforeSemanticJudgment: true as const,
    directBodySemanticReviewPerformed: true as const,
    bodyLevelAdmissionDecisionMade: true as const,
    operationalDyadicGungwiCompatibilityEstablished: true as const,
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
      ? RELATIONSHIP_SPOUSE_T8_LEE_CHANGIM_2016_DIRECT_BODY_BOUNDARY_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted
      ? RELATIONSHIP_SPOUSE_T8_LEE_CHANGIM_2016_DIRECT_BODY_BOUNDARY_CONTROL_IDS.length
      : 0,
    recommendedNextAction: accepted
      ? ('CONTINUE_SINGLE_SOURCE_DISCOVERY_FOR_COMPLETE_SINGLE_NATIVE_ROLE_NEUTRAL_NATAL_SPOUSE_SELECTOR' as const)
      : ('REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE' as const),
  };

  return {
    evidenceId: `relationship_spouse_t8_lee_changim_2016_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
