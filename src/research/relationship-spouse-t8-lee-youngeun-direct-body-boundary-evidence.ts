import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8JungSuaDirectBodyBoundaryEvidence } from './relationship-spouse-t8-jung-sua-direct-body-boundary-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-lee-youngeun-direct-body-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'LEE_YOUNGEUN_2025_KCI_KYOBO_DIRECT_PDF',
  author: '이영은',
  publicationYear: 2025,
  title: '『적천수천미』 ｢여명장｣의 현대적 고찰 - 부성용신론(夫星用神論)을 중심으로',
  journal: '역사와 융합 제24호 / 제9권 1호',
  publisher: '바른역사학술원',
  pages: '305-338',
  doi: '10.55793/jkhc.2025.24.305',
  kciArticleId: 'ART003175186',
  kyoboArticleId: '4010070551816',
  kyoboArtId: '16465452',
  kciListedArticle: true as const,
  individualPeerReviewRecordInspected: false as const,
  directPublicPdfObjectInspected: true as const,
  pdfScreenshotReviewed: true as const,
  publicPdfAcquisitionUrl:
    'https://scholar.kyobobook.co.kr/builderDownload?artId=16465452&barcode=4010070551816&kyoboKey=YnVpbGRlcjIwMjAhQCMk&gb=view',
  pdfSha256: '06114b29775f024520ae5683cc359a97d54bf2d6b2e0d5feb8557586d0768e61',
  pdfBytes: 2_674_702,
  pdfPageCount: 34,
  pdfEncrypted: false as const,
  printedToPhysicalPageMap: Object.freeze([
    Object.freeze({ printedPage: 313, physicalPdfPage: 9, topic: 'historical husband-star substitution table and Yongshin framing' }),
    Object.freeze({ printedPage: 324, physicalPdfPage: 20, topic: 'historical method synthesis and modern reinterpretation opening' }),
    Object.freeze({ printedPage: 325, physicalPdfPage: 21, topic: 'modern social-role critique and modern-review section opening' }),
    Object.freeze({ printedPage: 326, physicalPdfPage: 22, topic: 'role-based spouse Ten-God examples: Wealth and Peer' }),
    Object.freeze({ printedPage: 327, physicalPdfPage: 23, topic: 'modern worked cases begin; work and marriage context separated' }),
    Object.freeze({ printedPage: 331, physicalPdfPage: 27, topic: 'worked-case synthesis and limits of classical husband-star expectations' }),
    Object.freeze({ printedPage: 332, physicalPdfPage: 28, topic: 'spouse interpretation not limited to Officer; conclusion opening' }),
    Object.freeze({ printedPage: 333, physicalPdfPage: 29, topic: 'explicit modern spouse remapping and male-chart extension' }),
    Object.freeze({ printedPage: 334, physicalPdfPage: 30, topic: 'social-change scope and need for continuing spouse reinterpretation' }),
  ] as const),
  exactModernSpouseSemanticAssertionFound: true as const,
  husbandNeedNotBeLimitedToOfficerExplicit: true as const,
  otherTenGodsMayRepresentSpouseExplicit: true as const,
  peerMayRepresentEqualPartnerExplicit: true as const,
  outputOrWealthMayRepresentHusbandInWomanBreadwinnerHouseholdExplicit: true as const,
  sourceSaysSameLogicMayApplyToMaleChartsExplicit: true as const,
  sourceCitesMaleAndFemaleSameUsageViewExplicit: true as const,
  maleSpouseMayBeYongsinOrHeesinExtensionExplicit: true as const,
  classicalHusbandOfficerConventionStillOperativeInSomeCasesExplicit: true as const,
  modernApplicabilityBoundaryExplicit: true as const,
  modernApplicabilityDependsOnRelationshipRoleExplicit: true as const,
  modernApplicabilityDependsOnHouseholdEconomicRoleExplicit: true as const,
  modernApplicabilityDependsOnSubjectIntentExplicit: true as const,
  yongsinHeesinSemanticsMaterialToProposal: true as const,
  sourceTreatsSpouseInterpretationAsChangingWithSocialContextExplicit: true as const,
  nativeSexNeutralExtensionCandidateFound: true as const,
  partnerSexIndependentOperationalSelectorFound: false as const,
  pureNatalOperationalSelectorFound: false as const,
  completeRoleNeutralNatalInputContractFound: false as const,
  canonicalLosslessFitEstablished: false as const,
  independentNormativeProvenanceCandidateQualifiedForAdequacyReview: true as const,
  independentNormativeProvenanceGapClosedByThisEvidence: false as const,
  explicitRoleNeutralNatalMappingGapClosedByThisEvidence: false as const,
  exactDirectBodyFinding:
    'The directly inspected KCI-listed 2025 article goes materially beyond a gender-role critique: it explicitly proposes that modern spouses need not be represented only by Officer, gives Peer as a possible equal-partner relation, gives Output or Wealth as possible husband representations when a woman is the economic center of the household, states that the same logic can apply to male charts, and concludes that men likewise may treat spouse and children as Yongsin/Heesin. This is a real source-authored modern spouse-remapping proposal.',
  exactNatalBoundary:
    'The proposal is not a pure-natal spouse selector. The source selects or motivates spouse Ten-God semantics using desired or lived partnership equality, household economic role, changing relationship roles, the subject’s intentional use of chart symbols, and Yongsin/Heesin. Those inputs are not derivable solely from the natal snapshot without additional semantic authority and external context.',
  exactRoleNeutralBoundary:
    'The source explicitly extends its logic to male charts and uses general spouse language in the conclusion, but it does not publish one partner-sex-independent deterministic selector that maps natal facts alone to exactly one spouse Ten-God. Native-sex-neutral applicability at the interpretive layer therefore does not establish the missing explicit role-neutral natal mapping contract.',
  exactCanonicalBoundary:
    'Current CanonicalSajuSnapshot facts can expose raw Ten-God placements, but the reviewed method materially uses Yongsin/Heesin plus lived or desired relationship roles and subject intention. Current governed semantics do not losslessly represent those source inputs, so current governed semantic correspondence and a relationship T6 input path remain unestablished.',
  exactProvenanceBoundary:
    'The article is independently traceable through KCI article ART003175186, DOI 10.55793/jkhc.2025.24.305, and a reproducible full public Kyobo Scholar PDF. It contains exact spouse semantics, explicit applicability/context treatment, worked cases, and a source-authored modern normative proposal. That materially qualifies it for the repository’s separate gap-scoped normative-provenance adequacy reassessment, but this evidence record itself does not close that gap.',
  nextAction:
    'Run a separate gap-scoped adequacy/provenance reassessment for INDEPENDENT_NORMATIVE_PROVENANCE. Keep EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING open unless a source supplies a complete partner-sex-independent pure-natal selector and input contract. Do not combine Lee’s role-based remapping with Jung Su-a’s neutral Day-Branch spouse-palace location.',
});

export const RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_CONTROL_IDS = Object.freeze([
  'LEE_DIRECT_PUBLIC_PDF_IDENTITY_IS_CONTENT_ADDRESSED',
  'PRINTED_AND_PHYSICAL_PAGE_COORDINATES_ARE_DISTINGUISHED',
  'KCI_LISTING_IS_RECORDED_WITHOUT_INVENTING_AN_ARTICLE_SPECIFIC_PEER_REVIEW_RECORD',
  'MODERN_HUSBAND_NOT_LIMITED_TO_OFFICER_ASSERTION_IS_PRESERVED',
  'SOURCE_AUTHORED_PEER_WEALTH_OUTPUT_SPOUSE_ROLE_EXAMPLES_ARE_PRESERVED',
  'SOURCE_AUTHORED_MALE_CHART_EXTENSION_IS_PRESERVED',
  'NATIVE_SEX_NEUTRAL_EXTENSION_IS_NOT_RELABELED_AS_PARTNER_SEX_INDEPENDENT_NATAL_SELECTOR',
  'RELATIONSHIP_ROLE_AND_HOUSEHOLD_ROLE_INPUTS_ARE_NOT_INFERRED_FROM_CHART_FACTS',
  'SUBJECT_INTENT_IS_NOT_INFERRED_FROM_CHART_FACTS',
  'YONGSIN_HEESIN_SEMANTICS_ARE_NOT_INVENTED_OR_IMPORTED',
  'NO_CROSS_SOURCE_STITCHING_WITH_JUNG_KWEON_SONG_KIM_OR_COMMERCIAL_EDITORIAL_RULES',
  'NORMATIVE_PROVENANCE_CANDIDATE_REQUIRES_SEPARATE_ADEQUACY_REASSESSMENT',
  'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
  'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
  'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
  'EXACTLY_ONE_OF_FIVE_AUTHORITY_GAPS_REMAINS_CLOSED_BY_THIS_EVIDENCE_RECORD',
  'NO_SPOUSE_T8_PRODUCER_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_EFFECT',
] as const);

export interface RelationshipSpouseT8LeeYoungeunDirectBodyBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status: 'DIRECT_KCI_LISTED_PDF_CONFIRMS_MODERN_SEX_NEUTRAL_EXTENSION_AND_ROLE_BASED_SPOUSE_REMAPPING_BUT_NO_PURE_NATAL_SELECTOR';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_CANDIDATE;
  directPdfInspected: true;
  pdfScreenshotReviewed: true;
  modernSpouseRemappingProposalConfirmed: true;
  nativeSexNeutralExtensionCandidateConfirmed: true;
  partnerSexIndependentPureNatalSelectorConfirmed: false;
  independentNormativeProvenanceCandidateReadyForAdequacyReview: true;
  independentNormativeProvenanceEstablishedByThisEvidence: false;
  explicitRoleNeutralNatalMappingEstablished: false;
  currentGovernedMethodSemanticCorrespondenceEstablished: false;
  currentRelationshipT6InputPathEstablished: false;
  qualifyingPrimaryWitnessGapRemainsClosed: true;
  authorityGapsClosedCount: 1;
  authorityGapsOpenCount: 4;
  authorityAdmissionReady: false;
  crossSourceStitchingAuthorized: false;
  userOrPartnerSexInferenceAuthorized: false;
  partnerSexualOrientationInferenceAuthorized: false;
  spouseT8ProducerReady: false;
  productionPromotionReady: false;
  controlIds: typeof RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_CONTROL_IDS;
  controlCount: 17;
  recommendedNextAction: 'RUN_GAP_SCOPED_INDEPENDENT_NORMATIVE_PROVENANCE_ADEQUACY_REASSESSMENT';
}

export function buildRelationshipSpouseT8LeeYoungeunDirectBodyBoundaryEvidence(): RelationshipSpouseT8LeeYoungeunDirectBodyBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8JungSuaDirectBodyBoundaryEvidence();
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status:
      'DIRECT_KCI_LISTED_PDF_CONFIRMS_MODERN_SEX_NEUTRAL_EXTENSION_AND_ROLE_BASED_SPOUSE_REMAPPING_BUT_NO_PURE_NATAL_SELECTOR' as const,
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_CANDIDATE,
    directPdfInspected: true as const,
    pdfScreenshotReviewed: true as const,
    modernSpouseRemappingProposalConfirmed: true as const,
    nativeSexNeutralExtensionCandidateConfirmed: true as const,
    partnerSexIndependentPureNatalSelectorConfirmed: false as const,
    independentNormativeProvenanceCandidateReadyForAdequacyReview: true as const,
    independentNormativeProvenanceEstablishedByThisEvidence: false as const,
    explicitRoleNeutralNatalMappingEstablished: false as const,
    currentGovernedMethodSemanticCorrespondenceEstablished: false as const,
    currentRelationshipT6InputPathEstablished: false as const,
    qualifyingPrimaryWitnessGapRemainsClosed: true as const,
    authorityGapsClosedCount: 1 as const,
    authorityGapsOpenCount: 4 as const,
    authorityAdmissionReady: false as const,
    crossSourceStitchingAuthorized: false as const,
    userOrPartnerSexInferenceAuthorized: false as const,
    partnerSexualOrientationInferenceAuthorized: false as const,
    spouseT8ProducerReady: false as const,
    productionPromotionReady: false as const,
    controlIds: RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_CONTROL_IDS,
    controlCount: 17 as const,
    recommendedNextAction:
      'RUN_GAP_SCOPED_INDEPENDENT_NORMATIVE_PROVENANCE_ADEQUACY_REASSESSMENT' as const,
  };

  return {
    evidenceId: `relationship_spouse_t8_lee_youngeun_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
