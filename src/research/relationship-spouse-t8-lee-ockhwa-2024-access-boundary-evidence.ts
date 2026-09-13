import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8YoonSangheum2023AccessBoundaryEvidence } from './relationship-spouse-t8-yoon-sangheum-2023-access-boundary-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_LEE_OCKHWA_2024_ACCESS_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-lee-ockhwa-2024-access-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_LEE_OCKHWA_2024_ACCESS_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'LEE_OCKHWA_2024_YUKCHIN_VARIABILITY_ACCESS_BOUNDARY',
  author: '이옥화',
  authorEnglish: 'Lee, Ockhwa',
  publicationYear: 2024,
  title: '명리사상에 나타난 육친가변성',
  titleEnglish: 'The Variability of the Six Relationships in Myungri Philosophy',
  journal: '역사와 융합',
  journalEnglish: 'The Journal of Korean History & Convergence',
  volume: 8,
  issue: 6,
  serialIssue: 23,
  printedPages: '177-208',
  physicalPageCountExpected: 32,
  doi: '10.55793/jkhc.2024.23.177',
  kciArticleId: 'ART003150783',
  publisher: '바른역사학술원',
  authorAffiliation: '동방문화대학원대학교',
  frontierIssue: 528,
  publicIdentitySurfaces: Object.freeze({
    kci: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003150783',
    researchGate:
      'https://www.researchgate.net/publication/389286338_The_Variability_of_the_Six_Relationships_in_Myungri_Philosophy',
    kyoboScholar: 'https://scholar.kyobobook.co.kr/article/detail/4010070433587',
    nationalAssemblyLibrary: 'https://dl.nanet.go.kr/detail/KINX2025002957',
    digitalJiphyeonjeon: 'https://k-knowledge.kr/srch/read.jsp?id=270790527',
  }),
  candidateDiscoverySignal: Object.freeze({
    yukchinVariabilityExplicitlyStudied: true as const,
    positionFunctionAndActionVariabilityObservedInAbstract: true as const,
    englishAbstractContainsSelfAndSpouseIlmyeongSignal: true as const,
    paperStatedFocusParentsAndChildren: true as const,
    titleAbstractKeywordsOrMetadataTreatedAsBodyEvidence: false as const,
    spouseSelectorAdmissionOrRejectionInferredFromDiscoveryMetadata: false as const,
  }),
  providerEvidence: Object.freeze({
    kciExactArticleIdentityObserved: true as const,
    kciBibliographyAndAbstractObserved: true as const,
    kciCompletePublicBodyObserved: false as const,
    researchGateExactArticleIdentityObserved: true as const,
    researchGateNoFullTextAvailableObserved: true as const,
    researchGateRequestFullTextPdfObserved: true as const,
    kyoboScholarExactArticleIdentityObserved: true as const,
    kyoboScholarPaidPdfOrSubscriptionObserved: true as const,
    rissExactTitleSearchResultObserved: true as const,
    rissPaidFulltextLabelObserved: true as const,
    rissConcreteArticleControlNumberObserved: false as const,
    nationalAssemblyLibraryExactHoldingObserved: true as const,
    nationalAssemblyLibraryRemotePublicCompleteBodyObserved: false as const,
    digitalJiphyeonjeonMetadataSummaryObserved: true as const,
    digitalJiphyeonjeonCompletePublicBodyObserved: false as const,
  }),
  currentAccessBoundary: Object.freeze({
    publicSearchRecoveredCompletePdf: false as const,
    publicSearchRecoveredCompleteHtmlBody: false as const,
    currentDirectCompleteBodyAcquired: false as const,
    commercialPreviewOrProductPageTreatedAsCompleteBody: false as const,
  }),
  guessedOpaqueIdentifierCount: 0 as const,
  loginBypass: false as const,
  sessionBypass: false as const,
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
  semanticDisposition: 'PUBLIC_ACCESS_BOUNDARY_ONLY_NO_DIRECT_BODY_DECISION' as const,
  explicitRoleNeutralNatalMappingGapClosedByThisEvidence: false as const,
  currentGovernedSemanticCorrespondenceGapClosedByThisEvidence: false as const,
  relationshipT6InputGapClosedByThisEvidence: false as const,
  exactBoundary:
    'Lee Ockhwa 2024 is exactly identified by KCI, ResearchGate, Kyobo Scholar, the National Assembly Library, and Digital Jiphyeonjeon. KCI exposes bibliographic metadata and abstract but no complete public body was recovered. ResearchGate explicitly reports no full text and offers a request-full-text path. Kyobo Scholar exposes the 32-page PDF behind purchase or subscription, while the RISS public search surface labels the article as paid full text. National Assembly Library and Digital Jiphyeonjeon surfaces provide holding or metadata/summary evidence rather than a remote complete public body. The abstract-level Yukchin-variability and self/spouse signals are discovery evidence only. No complete body was acquired, so neither admission nor rejection of a native-sex-independent / partner-sex-independent spouse selector is inferred.',
  noStitchingBoundary:
    'Lee Ockhwa 2024 metadata is not combined with Yoon Sangheum 2023, Jeon Jeonghun, Jung Su-a, Nam/Kim 2018, Go Jaemin, Kim Mantae, Lee Namyeon/Kim Kiseung, or any other source to manufacture or reject the missing complete role-neutral spouse selector.',
});

export const RELATIONSHIP_SPOUSE_T8_LEE_OCKHWA_2024_ACCESS_BOUNDARY_CONTROL_IDS = Object.freeze([
  'LEE_OCKHWA_2024_EXACT_ARTICLE_IDENTITY_IS_PINNED',
  'KCI_ART003150783_AND_DOI_ARE_PINNED',
  'YUKCHIN_VARIABILITY_SCOPE_IS_DISCOVERY_SIGNAL_ONLY_NOT_BODY_EVIDENCE',
  'ABSTRACT_SELF_AND_SPOUSE_ILMYEONG_SIGNAL_IS_NOT_BODY_LEVEL_SELECTOR_EVIDENCE',
  'PARENTS_AND_CHILDREN_STATED_FOCUS_IS_PRESERVED',
  'KCI_METADATA_AND_ABSTRACT_ARE_NOT_TREATED_AS_COMPLETE_BODY',
  'RESEARCHGATE_NO_FULL_TEXT_BOUNDARY_IS_PRESERVED',
  'KYOBO_PAID_PDF_OR_SUBSCRIPTION_BOUNDARY_IS_PRESERVED',
  'RISS_PAID_FULLTEXT_BOUNDARY_IS_PRESERVED_WITHOUT_GUESSING_CONTROL_NUMBER',
  'NATIONAL_ASSEMBLY_LIBRARY_HOLDING_IS_NOT_TREATED_AS_REMOTE_PUBLIC_BODY',
  'DIGITAL_JIPHYEONJEON_SUMMARY_IS_NOT_TREATED_AS_COMPLETE_BODY',
  'COMMERCIAL_PREVIEW_OR_PRODUCT_PAGE_IS_NOT_TREATED_AS_COMPLETE_BODY',
  'NO_LOGIN_SESSION_INSTITUTION_PAYWALL_DRM_TLS_OR_DECRYPTION_BYPASS_IS_PERFORMED',
  'NO_COMPLETE_PDF_OR_RENDERED_BODY_IS_CLAIMED',
  'NO_BODY_LEVEL_ROLE_NEUTRAL_ADMISSION_OR_REJECTION_VERDICT_IS_INFERRED_WITHOUT_BODY',
  'NO_CROSS_SOURCE_STITCHING_TO_MANUFACTURE_OR_REJECT_MISSING_SELECTOR',
  'QUALIFYING_PRIMARY_WITNESS_REMAINS_CLOSED',
  'INDEPENDENT_NORMATIVE_PROVENANCE_REMAINS_CLOSED',
  'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
  'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
  'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
  'EXACTLY_TWO_OF_FIVE_AUTHORITY_GAPS_REMAIN_CLOSED_AND_PRODUCTION_REMAINS_HOLD',
] as const);

export interface RelationshipSpouseT8LeeOckhwa2024AccessBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_LEE_OCKHWA_2024_ACCESS_BOUNDARY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status:
    | 'PUBLIC_ACCESS_BOUNDARY_ONLY_NO_DIRECT_BODY_DECISION'
    | 'UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_LEE_OCKHWA_2024_ACCESS_BOUNDARY_CANDIDATE;
  exactUpstreamTwoOfFiveStateAccepted: boolean;
  exactPublicIdentityAndProviderBoundaryInspected: true;
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
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_LEE_OCKHWA_2024_ACCESS_BOUNDARY_CONTROL_IDS)[number][];
  controlCount: number;
  recommendedNextAction:
    | 'CONTINUE_SINGLE_SOURCE_COMPLETE_ROLE_NEUTRAL_SPOUSE_SELECTOR_DISCOVERY_WITH_PUBLIC_DIRECT_BODY_PRIORITY'
    | 'REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE';
}

type UpstreamReport = ReturnType<typeof buildRelationshipSpouseT8YoonSangheum2023AccessBoundaryEvidence>;

function upstreamTwoOfFiveStateAccepted(upstream: UpstreamReport): boolean {
  return (
    upstream.status === 'PUBLIC_ACCESS_BOUNDARY_ONLY_NO_DIRECT_BODY_DECISION' &&
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

export function buildRelationshipSpouseT8LeeOckhwa2024AccessBoundaryEvidence(): RelationshipSpouseT8LeeOckhwa2024AccessBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8YoonSangheum2023AccessBoundaryEvidence();
  const accepted = upstreamTwoOfFiveStateAccepted(upstream);
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_LEE_OCKHWA_2024_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status: accepted
      ? ('PUBLIC_ACCESS_BOUNDARY_ONLY_NO_DIRECT_BODY_DECISION' as const)
      : ('UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID' as const),
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_LEE_OCKHWA_2024_ACCESS_BOUNDARY_CANDIDATE,
    exactUpstreamTwoOfFiveStateAccepted: accepted,
    exactPublicIdentityAndProviderBoundaryInspected: true as const,
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
      ? RELATIONSHIP_SPOUSE_T8_LEE_OCKHWA_2024_ACCESS_BOUNDARY_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted
      ? RELATIONSHIP_SPOUSE_T8_LEE_OCKHWA_2024_ACCESS_BOUNDARY_CONTROL_IDS.length
      : 0,
    recommendedNextAction: accepted
      ? ('CONTINUE_SINGLE_SOURCE_COMPLETE_ROLE_NEUTRAL_SPOUSE_SELECTOR_DISCOVERY_WITH_PUBLIC_DIRECT_BODY_PRIORITY' as const)
      : ('REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE' as const),
  };

  return {
    evidenceId: `relationship_spouse_t8_lee_ockhwa_2024_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
