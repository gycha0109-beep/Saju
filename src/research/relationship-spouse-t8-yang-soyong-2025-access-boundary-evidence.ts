import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8LeeSeongyeop2013AccessBoundaryEvidence } from './relationship-spouse-t8-lee-seongyeop-2013-access-boundary-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_YANG_SOYONG_2025_ACCESS_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-yang-soyong-2025-access-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_YANG_SOYONG_2025_ACCESS_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'YANG_SOYONG_2025_PUBLIC_DISCOVERY_EXTERNAL_LINK_LOGIN_BOUNDARY',
  author: '양소용',
  publicationYear: 2025,
  title: '간지의 상징성과 운동성에 근거한 사주팔자 해석',
  institution: '영남대학교 대학원',
  degreeType: '학위논문(박사)',
  dbpiaNodeId: 'T17189731',
  frontierIssue: 506,
  publicDiscoverySurfaces: Object.freeze({
    dbpia: 'https://www.dbpia.co.kr/journal/detail?nodeId=T17189731',
    digitalJiphyeonjeon: 'https://k-knowledge.kr/srch/read.jsp?id=271374692',
    nationalAssemblySearch:
      'https://dl.nanet.go.kr/search/searchInnerDetail.do?searchType=INNER_SEARCH&resultType=INNER_SEARCH_DETAIL&searchMehtod=L&searchClass=S&controlNo=MONO12025000029697',
  }),
  discoverySignals: Object.freeze({
    dayStemToAllEightGanjiInterpretiveSubjectExpansionObservedInPublicAbstract: true as const,
    yukchinRelationalInterpretationChapterObservedInPublicToc: true as const,
    yukchinFixedElementSectionPrintedPage: 152,
    yukchinInstabilityAndBranchRelationSectionPrintedPage: 155,
    ganjiMobilityYukchinRelationSectionPrintedPage: 160,
    annualYukchinChangeInterpretationSectionPrintedPage: 186,
    spouseSpecificSelectorClaimObservedAtBodyLevel: false as const,
    admittedAsBodyLevelRoleNeutralMapping: false as const,
  }),
  currentAccessBoundary: Object.freeze({
    dbpiaExternalLinkObserved: true as const,
    dbpiaExternalLinkRequiresPersonalLogin: true as const,
    dbpiaPersonalLoginInvoked: false as const,
    digitalJiphyeonjeonExactRecordObserved: true as const,
    digitalJiphyeonjeonSourceButtonObserved: true as const,
    digitalJiphyeonjeonDirectCompleteBodyTargetExposedByInspectedPublicText: false as const,
    nationalAssemblyExactDoctoralHoldingObserved: true as const,
    nationalAssemblyCallNumber: 'TD 951 -25-28',
    nationalAssemblyDirectPublicElectronicBodyObserved: false as const,
    currentSiteAuthoredDirectCompleteBodyUrlObserved: false as const,
  }),
  laterCommercialMonographUsedAsBodyEvidence: false as const,
  guessedOpaqueIdentifierCount: 0 as const,
  loginBypass: false as const,
  institutionAuthBypass: false as const,
  paywallBypass: false as const,
  drmRequestExecuted: false as const,
  decryptionActionExecuted: false as const,
  tlsVerificationDisabled: false as const,
  crossSourceSemanticStitching: false as const,
  completePdfAcquired: false as const,
  renderedPageCount: 0 as const,
  directBodySemanticReviewPerformed: false as const,
  bodyLevelAdmissionDecisionMade: false as const,
  abstractOrMetadataTreatedAsBodyEvidence: false as const,
  explicitRoleNeutralNatalMappingGapClosedByThisEvidence: false as const,
  currentGovernedSemanticCorrespondenceGapClosedByThisEvidence: false as const,
  relationshipT6InputGapClosedByThisEvidence: false as const,
  exactBoundary:
    'Current public scholarly discovery surfaces identify Yang Soyong 2025 as a Yeungnam University doctoral thesis and expose an abstract-level method that expands the interpretive subject from the Day Stem to all eight Ganji plus a table of contents containing dedicated Yukchin relational reinterpretation sections. DBpia exposes an external-link control but states that external-link use requires personal login; that login path was not invoked. Digital Jiphyeonjeon exposes the exact thesis record and a source button, but the inspected public text does not expose a direct complete-body target URL. The National Assembly Library confirms the doctoral holding and call number TD 951 -25-28 but does not expose a direct public electronic body on the inspected surface. No complete PDF or rendered thesis body was acquired, so the discovery relevance cannot establish or reject a native-sex-independent, partner-sex-independent, single-native natal-facts-only executable spouse selector.',
  noStitchingBoundary:
    'Yang Soyong 2025 abstract/TOC signals are not combined with Lee Seongyeop 2013, Kim Mantae 2025, Lee Youngeun 2025, Kweon Sujeong 2021, or any other partial source. The later commercial monograph based on related material is not substituted for the dissertation body and is not stitched into a spouse-selector verdict.',
});

export const RELATIONSHIP_SPOUSE_T8_YANG_SOYONG_2025_ACCESS_BOUNDARY_CONTROL_IDS = Object.freeze([
  'YANG_SOYONG_2025_EXACT_DOCTORAL_THESIS_IDENTITY_IS_PINNED',
  'DBPIA_NODE_T17189731_IS_PINNED_AS_PUBLIC_DISCOVERY_IDENTITY',
  'PUBLIC_ABSTRACT_EXPANDS_INTERPRETIVE_SUBJECT_FROM_DAY_STEM_TO_ALL_EIGHT_GANJI',
  'PUBLIC_TOC_EXPOSES_YUKCHIN_RELATIONAL_REINTERPRETATION_SECTIONS',
  'DBPIA_EXTERNAL_LINK_PERSONAL_LOGIN_BOUNDARY_IS_OBSERVED_AND_NOT_INVOKED',
  'DIGITAL_JIPHYEONJEON_EXACT_RECORD_IS_OBSERVED_WITHOUT_GUESSED_BODY_TARGET',
  'NATIONAL_ASSEMBLY_DOCTORAL_HOLDING_IS_OBSERVED_WITHOUT_DIRECT_PUBLIC_ELECTRONIC_BODY',
  'NO_SITE_AUTHORED_DIRECT_COMPLETE_BODY_URL_IS_CLAIMED_FROM_INSPECTED_PUBLIC_SURFACES',
  'NO_LOGIN_INSTITUTION_PAYWALL_DRM_TLS_OR_DECRYPTION_BYPASS_IS_PERFORMED',
  'NO_COMPLETE_PDF_OR_RENDERED_BODY_IS_CLAIMED',
  'ABSTRACT_TOC_AND_METADATA_ARE_NOT_TREATED_AS_BODY_EVIDENCE',
  'LATER_COMMERCIAL_MONOGRAPH_IS_NOT_SUBSTITUTED_FOR_THE_DISSERTATION_BODY',
  'NO_BODY_LEVEL_ROLE_NEUTRAL_ADMISSION_OR_REJECTION_VERDICT_IS_INFERRED_WITHOUT_BODY',
  'NO_CROSS_SOURCE_STITCHING_TO_MANUFACTURE_MISSING_SELECTOR',
  'QUALIFYING_PRIMARY_WITNESS_REMAINS_CLOSED',
  'INDEPENDENT_NORMATIVE_PROVENANCE_REMAINS_CLOSED',
  'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
  'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
  'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
  'EXACTLY_TWO_OF_FIVE_AUTHORITY_GAPS_REMAIN_CLOSED_AND_PRODUCTION_REMAINS_HOLD',
] as const);

export interface RelationshipSpouseT8YangSoyong2025AccessBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_YANG_SOYONG_2025_ACCESS_BOUNDARY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status:
    | 'PUBLIC_DISCOVERY_EXTERNAL_LINK_LOGIN_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION'
    | 'UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_YANG_SOYONG_2025_ACCESS_BOUNDARY_CANDIDATE;
  exactUpstreamTwoOfFiveStateAccepted: boolean;
  exactPublicIdentityAndAccessBoundaryInspected: true;
  directFulltextPdfInspected: false;
  directBodySemanticReviewPerformed: false;
  bodyLevelAdmissionDecisionMade: false;
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
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_YANG_SOYONG_2025_ACCESS_BOUNDARY_CONTROL_IDS)[number][];
  controlCount: number;
  recommendedNextAction:
    | 'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_ACCESS_BYPASS_OR_CROSS_SOURCE_STITCHING'
    | 'REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE';
}

type UpstreamReport = ReturnType<typeof buildRelationshipSpouseT8LeeSeongyeop2013AccessBoundaryEvidence>;

function upstreamTwoOfFiveStateAccepted(upstream: UpstreamReport): boolean {
  return (
    upstream.status === 'PUBLIC_RISS_DISPATCHER_NO_PUBLIC_BODY_ROUTE_NO_BODY_LEVEL_ADMISSION_DECISION' &&
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

export function buildRelationshipSpouseT8YangSoyong2025AccessBoundaryEvidence(): RelationshipSpouseT8YangSoyong2025AccessBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8LeeSeongyeop2013AccessBoundaryEvidence();
  const accepted = upstreamTwoOfFiveStateAccepted(upstream);
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_YANG_SOYONG_2025_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status: accepted
      ? ('PUBLIC_DISCOVERY_EXTERNAL_LINK_LOGIN_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION' as const)
      : ('UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID' as const),
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_YANG_SOYONG_2025_ACCESS_BOUNDARY_CANDIDATE,
    exactUpstreamTwoOfFiveStateAccepted: accepted,
    exactPublicIdentityAndAccessBoundaryInspected: true as const,
    directFulltextPdfInspected: false as const,
    directBodySemanticReviewPerformed: false as const,
    bodyLevelAdmissionDecisionMade: false as const,
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
      ? RELATIONSHIP_SPOUSE_T8_YANG_SOYONG_2025_ACCESS_BOUNDARY_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted ? RELATIONSHIP_SPOUSE_T8_YANG_SOYONG_2025_ACCESS_BOUNDARY_CONTROL_IDS.length : 0,
    recommendedNextAction: accepted
      ? ('CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_ACCESS_BYPASS_OR_CROSS_SOURCE_STITCHING' as const)
      : ('REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE' as const),
  };
  return {
    evidenceId: `relationship_spouse_t8_yang_soyong_2025_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
