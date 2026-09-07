import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8KimYoungjinDirectBodyBoundaryEvidence } from './relationship-spouse-t8-kim-youngjin-direct-body-boundary-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_KWEON_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-kweon-direct-body-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_KWEON_DIRECT_BODY_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'KWEON_SUJEONG_2021_SEOKYEONG_DIRECT_PDF',
  author: '권수정',
  publicationYear: 2021,
  title: '명리 십신의 관계변화와 재해석 : 현대 가족관계와 사회관계를 중심으로',
  institution: '서경대학교 경영문화대학원 석사학위논문',
  scholarlyLocator: 'DBpia T15948798 / UCI I804:11015-200000508213',
  dcollectionItemId: '200000508213',
  institutionalOriginalRecord: 'https://skuniv.dcollection.net/common/orgView/200000508213',
  inspectedPdfAcquisitionUrl:
    'https://skuniv.dcollection.net/public_resource/pdf/200000508213_20260907174105.pdf',
  directInstitutionalPdfObjectInspected: true as const,
  pdfScreenshotReviewed: true as const,
  pdfSha256: '004a7740d416adcfb2c237f63d93dc9e63a919a3758c34cae25740bb1f7d36a0',
  pdfBytes: 1_374_595,
  pdfPageCount: 106,
  pdfEncrypted: false as const,
  printedToPhysicalPageMap: Object.freeze([
    Object.freeze({ printedPage: 48, physicalPdfPage: 60, topic: 'traditional female-chart husband/Officer framing under patriarchal hierarchy' }),
    Object.freeze({ printedPage: 77, physicalPdfPage: 89, topic: 'marriage-view reinterpretation section opening' }),
    Object.freeze({ printedPage: 78, physicalPdfPage: 90, topic: 'traditional marriage rules; Day Branch explicitly spouse palace' }),
    Object.freeze({ printedPage: 81, physicalPdfPage: 93, topic: 'marriage-form change section opening' }),
    Object.freeze({ printedPage: 82, physicalPdfPage: 94, topic: 'same-sex cohabitation family context' }),
    Object.freeze({ printedPage: 83, physicalPdfPage: 95, topic: 'same-sex marriage beyond traditional Wealth/Officer scope; Day-Branch alternative and cited gendered example' }),
    Object.freeze({ printedPage: 84, physicalPdfPage: 96, topic: 'conclusion opening and modern reinterpretation purpose' }),
    Object.freeze({ printedPage: 85, physicalPdfPage: 97, topic: 'conclusion: reinterpretability and relationship-analysis demand' }),
  ] as const),
  traditionalMarriageUsesWealthOfficerAndSpousePalaceExplicit: true as const,
  dayBranchSpousePalaceExplicit: true as const,
  sameSexCohabitationFamilyExplicit: true as const,
  sameSexMarriageOutsideTraditionalWealthOfficerScopeExplicit: true as const,
  nonTraditionalMarriageRequiresExpandedYukchinDefinitionExplicit: true as const,
  dayBranchSpousePalaceAlternativeForNonTraditionalMarriageExplicit: true as const,
  thesisAuthoredPartnerGenderIndependentOperationalSpouseSelectorFound: false as const,
  thesisAuthoredCompleteRoleNeutralNatalInputContractFound: false as const,
  citedSameSexOperationalExamplePresent: true as const,
  citedSameSexOperationalExampleGenderConditioned: true as const,
  citedSameSexOperationalExampleInfersHomosexualTendencyFromChartPattern: true as const,
  citedSameSexOperationalExampleAdmissibleForProductIdentityInference: false as const,
  modernFamilyAndMarriageReinterpretationExplicit: true as const,
  conclusionCallsForFurtherReinterpretationAndNewSolutions: true as const,
  explicitRoleNeutralNatalSpouseSelectorEstablished: false as const,
  completeRoleNeutralSingleNatalInputContractEstablished: false as const,
  canonicalLosslessFitEstablished: false as const,
  exactDirectBodyFinding:
    'The directly inspected institutional PDF confirms that the thesis treats same-sex cohabitation families as a real modern family form, states that same-sex marriage already lies outside the traditional Wealth/Officer-centered Ten-God judgment range, and explicitly proposes attention to the Day Branch as spouse palace because marriage logic can be derived from palace position as well as Ten Gods. However, the thesis does not publish one partner-gender-independent operational spouse selector or a complete role-neutral natal input contract.',
  exactOperationalBoundary:
    'The only concrete same-sex chart-reading example exposed in the reviewed passage is cited from another teaching source and remains explicitly split by male-chart versus female-chart conditions while attempting to infer homosexual tendency from Ten-God placement in the marriage palace. That example is neither a thesis-authored role-neutral selector nor an admissible product rule for inferring sexual orientation.',
  exactRoleNeutralBoundary:
    'Recognizing same-sex families, rejecting a Wealth/Officer-only scope as insufficient, and proposing Day-Branch spouse-palace attention are material modernization findings, but they do not specify how a spouse or partner is operationally selected independent of native sex or partner sex. A call to expand Yukchin definitions is not itself the missing executable mapping.',
  exactCanonicalBoundary:
    'The current governed snapshot can represent the raw Day Branch and exact Ten-God observations, but the reviewed source does not supply a complete governed role-neutral spouse input contract. Its concrete cited same-sex example also requires a male/female branch and uses chart patterns to infer sexual-orientation tendency, which is not an authorized canonical semantic or product inference. Raw fact availability therefore cannot establish current governed spouse-method correspondence.',
  nextAction:
    'Resolve the role-neutral frontier by searching for a same-source scholarly or normative method that states one explicit spouse/partner selector independent of native and partner sex, then extract its complete input contract before any T6/T8 or production promotion. Do not reuse the cited gendered orientation-inference example.',
});

export const RELATIONSHIP_SPOUSE_T8_KWEON_DIRECT_BODY_BOUNDARY_CONTROL_IDS = Object.freeze([
  'DIRECT_INSTITUTIONAL_PDF_IDENTITY_IS_CONTENT_ADDRESSED',
  'PRINTED_AND_PHYSICAL_PDF_PAGE_COORDINATES_ARE_DISTINGUISHED',
  'SAME_SEX_FAMILY_SCOPE_IS_PRESERVED_AS_SOURCE_FACT_WITHOUT_IDENTITY_INFERENCE',
  'TRADITIONAL_WEALTH_OFFICER_SCOPE_IS_RECORDED_AS_INSUFFICIENT_FOR_SAME_SEX_MARRIAGE',
  'DAY_BRANCH_SPOUSE_PALACE_ALTERNATIVE_IS_NOT_RELABELED_AS_COMPLETE_ROLE_NEUTRAL_SELECTOR',
  'CALL_FOR_EXPANDED_YUKCHIN_DEFINITION_IS_NOT_RELABELED_AS_EXECUTABLE_MAPPING',
  'CITED_SAME_SEX_EXAMPLE_REMAINS_GENDER_CONDITIONED_AND_EXTERNAL_TO_THE_THESIS_METHOD',
  'NO_SEXUAL_ORIENTATION_INFERENCE_FROM_CHART_PATTERN',
  'NO_NATIVE_OR_PARTNER_GENDER_INFERENCE_TO_SELECT_A_RULE_BRANCH',
  'NO_CROSS_SOURCE_STITCHING_WITH_KIM_YOUNGJIN_KIM_MANTAE_HONG_SONG_OR_COMMERCIAL_EDITORIAL_RULES',
  'INDEPENDENT_NORMATIVE_PROVENANCE_FOR_CURRENT_ROLE_NEUTRAL_SPOUSE_METHOD_REMAINS_OPEN',
  'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
  'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
  'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
  'EXACTLY_ONE_OF_FIVE_AUTHORITY_GAPS_REMAINS_CLOSED',
  'NO_SPOUSE_T8_PRODUCER_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_EFFECT',
] as const);

export interface RelationshipSpouseT8KweonDirectBodyBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_KWEON_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status: 'DIRECT_INSTITUTIONAL_PDF_CONFIRMS_SAME_SEX_FAMILY_AND_DAY_BRANCH_ALTERNATIVE_BUT_NO_ROLE_NEUTRAL_OPERATIONAL_SELECTOR';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_KWEON_DIRECT_BODY_BOUNDARY_CANDIDATE;
  directInstitutionalPdfCandidateCount: 1;
  directInstitutionalPdfInspected: true;
  pdfScreenshotReviewed: true;
  sameSexFamilyScopeConfirmed: true;
  dayBranchSpousePalaceAlternativeConfirmed: true;
  roleNeutralReplacementSelectorFound: false;
  citedOrientationInferenceExampleAdmissible: false;
  roleNeutralNatalMappingEstablished: false;
  pureSingleNatalInputPathEstablished: false;
  independentNormativeProvenanceForCurrentRoleNeutralSpouseMethodEstablished: false;
  currentGovernedMethodSemanticCorrespondenceEstablished: false;
  currentRelationshipT6InputPathEstablished: false;
  qualifyingPrimaryWitnessGapRemainsClosed: true;
  authorityGapsClosedCount: 1;
  authorityGapsOpenCount: 4;
  authorityAdmissionReady: false;
  crossSourceStitchingAuthorized: false;
  genderOrOrientationInferenceAuthorized: false;
  spouseT8ProducerReady: false;
  productionPromotionReady: false;
  controlIds: typeof RELATIONSHIP_SPOUSE_T8_KWEON_DIRECT_BODY_BOUNDARY_CONTROL_IDS;
  controlCount: 16;
  recommendedNextAction: 'SEARCH_SAME_SOURCE_EXPLICIT_ROLE_NEUTRAL_SPOUSE_SELECTOR_WITH_COMPLETE_INPUT_CONTRACT';
}

export function buildRelationshipSpouseT8KweonDirectBodyBoundaryEvidence(): RelationshipSpouseT8KweonDirectBodyBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8KimYoungjinDirectBodyBoundaryEvidence();
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_KWEON_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status:
      'DIRECT_INSTITUTIONAL_PDF_CONFIRMS_SAME_SEX_FAMILY_AND_DAY_BRANCH_ALTERNATIVE_BUT_NO_ROLE_NEUTRAL_OPERATIONAL_SELECTOR' as const,
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_KWEON_DIRECT_BODY_BOUNDARY_CANDIDATE,
    directInstitutionalPdfCandidateCount: 1 as const,
    directInstitutionalPdfInspected: true as const,
    pdfScreenshotReviewed: true as const,
    sameSexFamilyScopeConfirmed: true as const,
    dayBranchSpousePalaceAlternativeConfirmed: true as const,
    roleNeutralReplacementSelectorFound: false as const,
    citedOrientationInferenceExampleAdmissible: false as const,
    roleNeutralNatalMappingEstablished: false as const,
    pureSingleNatalInputPathEstablished: false as const,
    independentNormativeProvenanceForCurrentRoleNeutralSpouseMethodEstablished: false as const,
    currentGovernedMethodSemanticCorrespondenceEstablished: false as const,
    currentRelationshipT6InputPathEstablished: false as const,
    qualifyingPrimaryWitnessGapRemainsClosed: true as const,
    authorityGapsClosedCount: 1 as const,
    authorityGapsOpenCount: 4 as const,
    authorityAdmissionReady: false as const,
    crossSourceStitchingAuthorized: false as const,
    genderOrOrientationInferenceAuthorized: false as const,
    spouseT8ProducerReady: false as const,
    productionPromotionReady: false as const,
    controlIds: RELATIONSHIP_SPOUSE_T8_KWEON_DIRECT_BODY_BOUNDARY_CONTROL_IDS,
    controlCount: 16 as const,
    recommendedNextAction:
      'SEARCH_SAME_SOURCE_EXPLICIT_ROLE_NEUTRAL_SPOUSE_SELECTOR_WITH_COMPLETE_INPUT_CONTRACT' as const,
  };

  return {
    evidenceId: `relationship_spouse_t8_kweon_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
