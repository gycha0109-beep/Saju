import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_AUTHORITY_ACQUISITION_CONTINUATION_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_AUTHORITY_ACQUISITION_CONTINUATION_EVIDENCE_VERSION,
  RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_AUTHORITY_ACQUISITION_CONTINUATION_SOURCE_LEAD,
  type RelationshipSpouseT8CurrentMethodAuthorityAcquisitionContinuationEvidenceReport,
} from './relationship-spouse-t8-current-method-authority-acquisition-continuation-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_SOURCE_ACCESS_APPLICABILITY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-source-access-applicability-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_SOURCE_ACCESS_APPLICABILITY_EVIDENCE_RECORDS = Object.freeze([
  Object.freeze({
    recordId: 'SAMYEONG_NLC_1926_INSTITUTIONAL_SCAN_ACCESS',
    sourceId: 'NLC416-13jh000156-94145',
    title: '三命通會',
    sourceClass: 'institutional_digitized_scan',
    institution: 'National Library of China',
    publicationYear: 1926,
    bibliographicNote: '文明書局發行；秦慎安校勘',
    accessSurface:
      'https://commons.wikimedia.org/wiki/File:NLC416-13jh000156-94145_三命通會.pdf',
    directPdfSurface:
      'https://upload.wikimedia.org/wikipedia/commons/2/23/NLC416-13jh000156-94145_三命通會.pdf',
    pageCount: 455,
    targetChapter: '妻妾引例章',
    scanContainerEstablished: true,
    searchIndexedTargetTextObservedOnDirectPdfUrl: true,
    exactTargetPdfPageNumberEstablished: false,
    directTargetPageImageInspected: false,
    qualifyingPrimaryWitnessEstablished: false,
    outcome: 'PARTIAL_TEXTUAL_ACCESS_NO_DIRECT_TARGET_PAGE_VISUAL',
    notes:
      'The institutional scan container and a search-indexed target passage on the direct PDF URL are reproducible. The 455-page PDF could not be opened through the current bounded fetch surface because of size, so neither an exact PDF page number nor direct target-page visual inspection is claimed.',
  }),
  Object.freeze({
    recordId: 'GUJIN_TUSHU_JICHENG_V471_PAGE79_HISTORICAL_CORROBORATION',
    sourceId: 'GUJIN-TUSHU-JICHENG-V471-P79',
    title: '古今圖書集成 Volume 471',
    sourceClass: 'later_historical_compilation_witness',
    locator: 'Page:Gujin Tushu Jicheng, Volume 471 (1700-1725).djvu/79',
    accessSurface:
      'https://zh.wikisource.org/wiki/Page:Gujin_Tushu_Jicheng,_Volume_471_(1700-1725).djvu/79',
    targetHeading: '妻妾',
    exactTargetTextLocatorEstablished: true,
    targetTextSubstantivelyCorroboratesSamyeongPassage: true,
    directTargetPageImageInspected: false,
    qualifiesAsSamyeongPrimaryWitness: false,
    historicalCorroborationOnly: true,
    outcome: 'INDEPENDENT_HISTORICAL_TEXTUAL_CORROBORATION_NOT_PRIMARY_AUTHORITY',
    notes:
      'The page reproduces the spouse passage including 正財/偏財, 日干 strength, seasonal/旺 context, 官星, 印 and 比肩 conditions. It is a later compilation witness, not the target 三命通會 edition, and the scan image itself was not directly inspected in this execution.',
  }),
  Object.freeze({
    recordId: 'KCI_ART003370620_MINGLI_GENDER_ASYMMETRY',
    sourceId: 'KCI-ART003370620',
    title:
      '명리 고전 여명론(女命論)의 성별 비대칭과 역사적 맥락 ― 국역본 일곱 종에 수록된 명식의 성별과 여명의 평가 기준 분석 ―',
    sourceClass: 'kci_indexed_scholarly_article',
    author: '김상한',
    journal: '역사와 융합',
    year: 2026,
    volume: '10',
    issue: '4',
    pages: '631-665',
    kciArticleId: 'ART003370620',
    accessSurface:
      'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003370620',
    directlyStudiesMingliGenderAsymmetry: true,
    historicalMaleDefaultAndFemaleSpecificEvaluationDocumented: true,
    historicalFamilyChastityContextDocumented: true,
    contemporaryRemovalOfDiscriminatoryMoralStigmaRecommended: true,
    explicitGenderNeutralSpouseNatalContractEstablished: false,
    explicitNoUserOrPartnerSexInferenceContractEstablished: false,
    explicitNoPartnerSexualOrientationInferenceContractEstablished: false,
    outcome: 'HIGHER_PROVENANCE_APPLICABILITY_PARTIAL_EVIDENCE_NOT_COMPLETE_CONTRACT',
    notes:
      'This is directly relevant modern scholarship because it treats gender asymmetry in Mingli classics as historically situated and calls for contemporary interpretation not to repeat discriminatory moral stigmas. It does not define a gender-neutral spouse-natal semantic mapping or explicit sex/orientation no-inference contract.',
  }),
] as const);

export const RELATIONSHIP_SPOUSE_T8_SOURCE_ACCESS_APPLICABILITY_CONTROL_IDS = Object.freeze([
  'SOURCE_ACCESS_EVIDENCE_ACCEPTS_ONLY_THE_EXACT_POST_299_CONTINUATION_BOUNDARY',
  'SEARCH_INDEXED_TEXT_ON_AN_INSTITUTIONAL_SCAN_URL_DOES_NOT_EQUAL_DIRECT_TARGET_PAGE_IMAGE_INSPECTION',
  'NLC_1926_SCAN_CONTAINER_IS_REAL_BUT_EXACT_TARGET_PDF_PAGE_AND_VISUAL_REMAIN_UNRESOLVED',
  'GUJIN_TUSHU_JICHENG_PAGE79_IS_HISTORICAL_TEXTUAL_CORROBORATION_ONLY',
  'LATER_HISTORICAL_COMPILATION_CANNOT_SUBSTITUTE_FOR_TARGET_SAMYEONG_PRIMARY_WITNESS',
  'KCI_ART003370620_DIRECTLY_DOCUMENTS_MINGLI_GENDER_ASYMMETRY_AND_HISTORICAL_CONTEXT',
  'KCI_ART003370620_SUPPORTS_REMOVING_HISTORICAL_DISCRIMINATORY_MORAL_STIGMA_IN_CONTEMPORARY_INTERPRETATION',
  'KCI_ART003370620_DOES_NOT_ESTABLISH_A_GENDER_NEUTRAL_SPOUSE_NATAL_SEMANTIC_CONTRACT',
  'KCI_ART003370620_DOES_NOT_ESTABLISH_EXPLICIT_USER_PARTNER_SEX_OR_ORIENTATION_NO_INFERENCE_RULES',
  'APPLICABILITY_GAP_PROGRESS_IS_PARTIAL_EVIDENCE_NOT_GAP_CLOSURE',
  'NO_CROSS_SOURCE_STITCHING_TO_SYNTHESIZE_A_MISSING_APPLICABILITY_CONTRACT',
  'CURRENT_T5_INFORMATION_LOSS_SEMANTIC_MISMATCH_REMAINS_UNCHANGED',
  'CURRENT_RELATIONSHIP_T6_DIRECT_INPUT_PATH_REMAINS_ABSENT',
  'ZERO_OF_FIVE_AUTHORITY_GAPS_CLOSED',
  'NO_SPOUSE_T8_PRODUCER_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_EFFECT',
  'NEXT_ACQUISITION_MUST_TARGET_DIRECT_FACSIMILE_AND_EXPLICIT_MODERN_SPOUSE_NATAL_APPLICABILITY_AUTHORITY',
] as const);

export interface RelationshipSpouseT8SourceAccessApplicabilityEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_SOURCE_ACCESS_APPLICABILITY_EVIDENCE_VERSION;
  status:
    | 'RESOLVED_RELATIONSHIP_SPOUSE_T8_SOURCE_ACCESS_APPLICABILITY_EVIDENCE'
    | 'UPSTREAM_CONTINUATION_EVIDENCE_BOUNDARY_INVALID';
  decision:
    | 'HIGHER_PROVENANCE_MODERN_GENDER_ASYMMETRY_EVIDENCE_UPGRADES_APPLICABILITY_TO_PARTIAL_WHILE_DIRECT_FACSIMILE_AND_CURRENT_METHOD_AUTHORITY_REMAIN_UNRESOLVED'
    | 'SOURCE_ACCESS_APPLICABILITY_EVIDENCE_NOT_ESTABLISHED';
  upstreamContinuationEvidenceId: string;
  exactUpstreamContinuationBoundaryAccepted: boolean;
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  evidenceRecords: readonly (typeof RELATIONSHIP_SPOUSE_T8_SOURCE_ACCESS_APPLICABILITY_EVIDENCE_RECORDS)[number][];
  evidenceRecordCount: 3 | 0;
  samyeongWygTargetFolioSpanStillBounded: boolean;
  samyeongWygDirectTargetImageInspected: false;
  samyeongNlcInstitutionalScanContainerEstablished: boolean;
  samyeongNlcTargetTextSearchIndexed: boolean;
  samyeongNlcExactTargetPdfPageNumberEstablished: false;
  samyeongNlcDirectTargetPageImageInspected: false;
  samyeongNlcQualifyingPrimaryWitnessEstablished: false;
  gujinHistoricalCompilationWitnessLocated: boolean;
  gujinHistoricalCompilationDirectPageImageInspected: false;
  gujinWitnessQualifiesAsSamyeongPrimaryWitness: false;
  samyeongTextualMethodCorroborationStrengthened: boolean;
  kciGenderAsymmetryStudyLocated: boolean;
  kciStudyKciIndexed: boolean;
  kciStudyDirectlyAddressesMingliGenderAsymmetry: boolean;
  kciStudySupportsRemovingHistoricalDiscriminatoryMoralStigma: boolean;
  kciStudyExplicitGenderNeutralSpouseNatalContractEstablished: false;
  kciStudyExplicitNoUserOrPartnerSexInferenceContractEstablished: false;
  kciStudyExplicitNoPartnerSexualOrientationInferenceContractEstablished: false;
  applicabilityGapPreviousStatus: 'NO_QUALIFYING_EVIDENCE';
  applicabilityGapCurrentStatus:
    | 'PARTIAL_EVIDENCE_NOT_ADEQUATE'
    | 'NOT_REASSESSED_DUE_TO_INVALID_UPSTREAM';
  applicabilityGapProgressRecognized: boolean;
  applicabilityGapClosedByThisEvidence: false;
  modernApplicabilityBoundaryPartialEvidenceEstablished: boolean;
  modernApplicabilityBoundaryAdequateForGapClosure: false;
  independentModernGenderAsymmetryProvenanceLocated: boolean;
  independentNormativeProvenanceForCurrentSpouseMethodEstablished: false;
  explicitGenderNeutralSpouseNatalApplicabilityEstablished: false;
  explicitNoUserOrPartnerSexInferenceEstablished: false;
  explicitNoPartnerSexualOrientationInferenceEstablished: false;
  exactCurrentClaimClassCompositionAuthorityEstablished: false;
  currentGovernedMethodSemanticCorrespondenceEstablished: false;
  currentRelationshipT6InputPathEstablished: false;
  historicalGenderRoleUniversalizationAuthorized: false;
  userOrPartnerSexInferenceAuthorized: false;
  partnerSexualOrientationInferenceAuthorized: false;
  crossSourceStitchingAuthorized: false;
  crossTaskStitchingAuthorized: false;
  qualifyingAuthorityCandidateCount: 0;
  authorityAcceptedCandidateCount: 0;
  authorityGapsClosedCount: 0;
  allFiveAuthorityGapsRemainOpen: true;
  partialButInadequateRequirementCount: 5 | 0;
  noQualifyingEvidenceRequirementCount: 0 | 1;
  authorityAdmissionReady: false;
  semanticProducerImplementationAuthorized: false;
  spouseT8RuleAuthoringAuthorized: false;
  spouseT8ClaimTypeCreationAuthorized: false;
  spouseInterpretationPackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  compatibilityAuthorityAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_SOURCE_ACCESS_APPLICABILITY_CONTROL_IDS)[number][];
  controlCount: 16 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    sourceAccessEvidenceRecordsRecorded: 3 | 0;
    institutionalScanContainersNewlyRecorded: 1 | 0;
    historicalCorroborationWitnessesNewlyRecorded: 1 | 0;
    higherProvenanceModernApplicabilitySourcesNewlyRecorded: 1 | 0;
    directPrimaryTargetImagesNewlyInspected: 0;
    applicabilityRequirementsUpgradedFromNoEvidenceToPartial: 1 | 0;
    authorityRequirementsSatisfied: 0;
    authorityCandidatesAccepted: 0;
    authorityGapsClosed: 0;
    methodologyChoicesMade: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextAction:
    | 'ACQUIRE_DIRECT_SAMYEONG_TARGET_FACSIMILE_AND_EXPLICIT_GENDER_NEUTRAL_SPOUSE_NATAL_APPLICABILITY_AUTHORITY_BEFORE_ANY_ADMISSION_OR_PRODUCER_GATE'
    | 'REESTABLISH_RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_AUTHORITY_ACQUISITION_CONTINUATION_EVIDENCE';
}

function contentAddressedContinuationEvidenceIdentityValid(
  evidence: RelationshipSpouseT8CurrentMethodAuthorityAcquisitionContinuationEvidenceReport,
): boolean {
  const { evidenceId, ...material } = evidence;
  return (
    evidenceId ===
    `relationship_spouse_t8_current_method_authority_acquisition_continuation_evidence_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactUpstreamContinuationBoundaryAccepted(
  evidence: RelationshipSpouseT8CurrentMethodAuthorityAcquisitionContinuationEvidenceReport,
): boolean {
  return (
    contentAddressedContinuationEvidenceIdentityValid(evidence) &&
    evidence.evidenceVersion ===
      RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_AUTHORITY_ACQUISITION_CONTINUATION_EVIDENCE_VERSION &&
    evidence.status ===
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_AUTHORITY_ACQUISITION_CONTINUATION_EVIDENCE' &&
    evidence.decision ===
      'NEW_MULTI_FACTOR_SPOUSE_METHOD_LEAD_ACQUIRED_BUT_CURRENT_T5_INFORMATION_LOSS_SEMANTIC_MISMATCH_CONFIRMED_ZERO_GAP_CLOSURE' &&
    evidence.exactUpstreamAdequacyBoundaryAccepted &&
    evidence.exactCurrentT5ProducerBoundaryAccepted &&
    evidence.sourceLeadId ===
      RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_AUTHORITY_ACQUISITION_CONTINUATION_SOURCE_LEAD.sourceId &&
    deterministicContentHash(evidence.sourceLeadTargetFolioSpan) ===
      deterministicContentHash(
        RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_AUTHORITY_ACQUISITION_CONTINUATION_SOURCE_LEAD.targetFolioSpan,
      ) &&
    evidence.sourceLeadDirectPrimaryImageInspected === false &&
    evidence.sourceLeadQualifyingPrimaryWitnessEstablished === false &&
    evidence.currentT5InformationLossSemanticMismatchConfirmed &&
    evidence.semanticReconstructionWouldBeRequired &&
    evidence.semanticReconstructionAuthorized === false &&
    evidence.exactCurrentClaimClassCompositionAuthorityEstablished === false &&
    evidence.currentGovernedMethodSemanticCorrespondenceEstablished === false &&
    evidence.currentRelationshipT6InputPathEstablished === false &&
    evidence.qualifyingAuthorityCandidateCount === 0 &&
    evidence.authorityAcceptedCandidateCount === 0 &&
    evidence.authorityGapsClosedCount === 0 &&
    evidence.allFiveAuthorityGapsRemainOpen &&
    evidence.authorityAdmissionReady === false &&
    evidence.semanticProducerImplementationAuthorized === false &&
    evidence.crossSourceStitchingAuthorized === false &&
    evidence.crossTaskStitchingAuthorized === false &&
    evidence.controlCount === 15 &&
    evidence.controlsFrozen &&
    deterministicContentHash(evidence.controlIds) ===
      deterministicContentHash(
        RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_AUTHORITY_ACQUISITION_CONTINUATION_CONTROL_IDS,
      ) &&
    evidence.recommendedNextAction ===
      'CONTINUE_EXTERNAL_SOURCE_ACQUISITION_UNTIL_NEW_QUALIFYING_EVIDENCE_EXISTS_BEFORE_ANY_ADMISSION_OR_PRODUCER_GATE'
  );
}

function finalized(
  material: Omit<RelationshipSpouseT8SourceAccessApplicabilityEvidenceReport, 'evidenceId'>,
): RelationshipSpouseT8SourceAccessApplicabilityEvidenceReport {
  return {
    evidenceId: `relationship_spouse_t8_source_access_applicability_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildRelationshipSpouseT8SourceAccessApplicabilityEvidence(
  upstream: RelationshipSpouseT8CurrentMethodAuthorityAcquisitionContinuationEvidenceReport,
): RelationshipSpouseT8SourceAccessApplicabilityEvidenceReport {
  const accepted = exactUpstreamContinuationBoundaryAccepted(upstream);

  return finalized({
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_SOURCE_ACCESS_APPLICABILITY_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_RELATIONSHIP_SPOUSE_T8_SOURCE_ACCESS_APPLICABILITY_EVIDENCE'
      : 'UPSTREAM_CONTINUATION_EVIDENCE_BOUNDARY_INVALID',
    decision: accepted
      ? 'HIGHER_PROVENANCE_MODERN_GENDER_ASYMMETRY_EVIDENCE_UPGRADES_APPLICABILITY_TO_PARTIAL_WHILE_DIRECT_FACSIMILE_AND_CURRENT_METHOD_AUTHORITY_REMAIN_UNRESOLVED'
      : 'SOURCE_ACCESS_APPLICABILITY_EVIDENCE_NOT_ESTABLISHED',
    upstreamContinuationEvidenceId: upstream.evidenceId,
    exactUpstreamContinuationBoundaryAccepted: accepted,
    domain: 'relationship',
    subcategory: 'spouse',
    temporalScope: 'natal',
    statusClass: 'research',
    evidenceRecords: accepted
      ? RELATIONSHIP_SPOUSE_T8_SOURCE_ACCESS_APPLICABILITY_EVIDENCE_RECORDS
      : Object.freeze([]),
    evidenceRecordCount: accepted ? 3 : 0,
    samyeongWygTargetFolioSpanStillBounded:
      accepted && upstream.sourceLeadTargetFolioSpan.length === 2,
    samyeongWygDirectTargetImageInspected: false,
    samyeongNlcInstitutionalScanContainerEstablished: accepted,
    samyeongNlcTargetTextSearchIndexed: accepted,
    samyeongNlcExactTargetPdfPageNumberEstablished: false,
    samyeongNlcDirectTargetPageImageInspected: false,
    samyeongNlcQualifyingPrimaryWitnessEstablished: false,
    gujinHistoricalCompilationWitnessLocated: accepted,
    gujinHistoricalCompilationDirectPageImageInspected: false,
    gujinWitnessQualifiesAsSamyeongPrimaryWitness: false,
    samyeongTextualMethodCorroborationStrengthened: accepted,
    kciGenderAsymmetryStudyLocated: accepted,
    kciStudyKciIndexed: accepted,
    kciStudyDirectlyAddressesMingliGenderAsymmetry: accepted,
    kciStudySupportsRemovingHistoricalDiscriminatoryMoralStigma: accepted,
    kciStudyExplicitGenderNeutralSpouseNatalContractEstablished: false,
    kciStudyExplicitNoUserOrPartnerSexInferenceContractEstablished: false,
    kciStudyExplicitNoPartnerSexualOrientationInferenceContractEstablished: false,
    applicabilityGapPreviousStatus: 'NO_QUALIFYING_EVIDENCE',
    applicabilityGapCurrentStatus: accepted
      ? 'PARTIAL_EVIDENCE_NOT_ADEQUATE'
      : 'NOT_REASSESSED_DUE_TO_INVALID_UPSTREAM',
    applicabilityGapProgressRecognized: accepted,
    applicabilityGapClosedByThisEvidence: false,
    modernApplicabilityBoundaryPartialEvidenceEstablished: accepted,
    modernApplicabilityBoundaryAdequateForGapClosure: false,
    independentModernGenderAsymmetryProvenanceLocated: accepted,
    independentNormativeProvenanceForCurrentSpouseMethodEstablished: false,
    explicitGenderNeutralSpouseNatalApplicabilityEstablished: false,
    explicitNoUserOrPartnerSexInferenceEstablished: false,
    explicitNoPartnerSexualOrientationInferenceEstablished: false,
    exactCurrentClaimClassCompositionAuthorityEstablished: false,
    currentGovernedMethodSemanticCorrespondenceEstablished: false,
    currentRelationshipT6InputPathEstablished: false,
    historicalGenderRoleUniversalizationAuthorized: false,
    userOrPartnerSexInferenceAuthorized: false,
    partnerSexualOrientationInferenceAuthorized: false,
    crossSourceStitchingAuthorized: false,
    crossTaskStitchingAuthorized: false,
    qualifyingAuthorityCandidateCount: 0,
    authorityAcceptedCandidateCount: 0,
    authorityGapsClosedCount: 0,
    allFiveAuthorityGapsRemainOpen: true,
    partialButInadequateRequirementCount: accepted ? 5 : 0,
    noQualifyingEvidenceRequirementCount: accepted ? 0 : 1,
    authorityAdmissionReady: false,
    semanticProducerImplementationAuthorized: false,
    spouseT8RuleAuthoringAuthorized: false,
    spouseT8ClaimTypeCreationAuthorized: false,
    spouseInterpretationPackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    compatibilityAuthorityAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted
      ? RELATIONSHIP_SPOUSE_T8_SOURCE_ACCESS_APPLICABILITY_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted ? 16 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      sourceAccessEvidenceRecordsRecorded: accepted ? 3 : 0,
      institutionalScanContainersNewlyRecorded: accepted ? 1 : 0,
      historicalCorroborationWitnessesNewlyRecorded: accepted ? 1 : 0,
      higherProvenanceModernApplicabilitySourcesNewlyRecorded: accepted ? 1 : 0,
      directPrimaryTargetImagesNewlyInspected: 0,
      applicabilityRequirementsUpgradedFromNoEvidenceToPartial: accepted ? 1 : 0,
      authorityRequirementsSatisfied: 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      methodologyChoicesMade: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextAction: accepted
      ? 'ACQUIRE_DIRECT_SAMYEONG_TARGET_FACSIMILE_AND_EXPLICIT_GENDER_NEUTRAL_SPOUSE_NATAL_APPLICABILITY_AUTHORITY_BEFORE_ANY_ADMISSION_OR_PRODUCER_GATE'
      : 'REESTABLISH_RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_AUTHORITY_ACQUISITION_CONTINUATION_EVIDENCE',
  });
}
