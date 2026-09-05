import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_ACCESS_APPLICABILITY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ACCESS_APPLICABILITY_EVIDENCE_RECORDS,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ACCESS_APPLICABILITY_EVIDENCE_VERSION,
  type RelationshipSpouseT8SourceAccessApplicabilityEvidenceReport,
} from './relationship-spouse-t8-source-access-applicability-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_SAMYEONG_WANLI_PRIMARY_TARGET_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-samyeong-wanli-primary-target-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_SAMYEONG_WANLI_PRIMARY_CONTAINER_RECORDS = Object.freeze([
  Object.freeze({
    recordId: 'NLC_WANLI_SAMYEONG_VOLUME_SEVEN_UPPER',
    sourceId: 'NLC892-411999029701-66490',
    title: '三命通會 第13冊',
    author: '〔明〕萬民英撰',
    institution: 'National Library of China',
    sourceClass: 'institutional_digitized_early_print_scan_container',
    edition: '刻本',
    publicationDate: '明萬曆[1573-1620]',
    description: '卷之七上',
    physicalLayout: '10行22字，白口，四周雙邊',
    pageCount: 54,
    fileSizeMb: 13.36,
    accessSurface:
      'https://commons.wikimedia.org/wiki/File:NLC892-411999029701-66490_三命通會_第13冊.pdf',
    scanContainerEstablished: true,
    directTargetPageImageInspected: false,
    targetChapterPageBound: false,
    notes:
      'The NLC/Wikimedia metadata establishes the upper half of 卷七 in the Ming Wanli printed edition. This record is used only to establish the bibliographic split of the volume; no spouse target page is claimed here.',
  }),
  Object.freeze({
    recordId: 'NLC_WANLI_SAMYEONG_VOLUME_SEVEN_LOWER',
    sourceId: 'NLC892-411999029701-66491',
    title: '三命通會 第14冊',
    author: '〔明〕萬民英撰',
    institution: 'National Library of China',
    sourceClass: 'institutional_digitized_early_print_scan_container',
    edition: '刻本',
    publicationDate: '明萬曆[1573-1620]',
    description: '卷之七下',
    physicalLayout: '10行22字，白口，四周雙邊',
    pageCount: 63,
    fileSizeMb: 20.36,
    accessSurface:
      'https://commons.wikimedia.org/wiki/File:NLC892-411999029701-66491_三命通會_第14冊.pdf',
    scanContainerEstablished: true,
    directTargetPageImageInspected: false,
    targetChapterPageBound: false,
    notes:
      'The NLC/Wikimedia metadata establishes the lower half of 卷七 in a Ming Wanli printed edition and therefore materially narrows the target-facsimile search. The exact 妻妾引例章 scan page has not yet been bound or visually inspected, so this remains a target-container candidate rather than a qualifying primary witness.',
  }),
] as const);

export const RELATIONSHIP_SPOUSE_T8_SAMYEONG_WANLI_TARGET_TEXT_LOCATOR = Object.freeze({
  targetChapter: '妻妾引例章',
  containingVolume: '卷七',
  orderedBoundary: Object.freeze({
    previousContext: '六親論述與古歌',
    targetChapter: '妻妾引例章',
    nextChapter: '子息引例章',
  }),
  nlcIdentifierFamilyVisibleInDigitalBookRecord: '892,411999029701',
  digitalBookRecordId: 'NGJ89241199902970167139',
  digitalTextSurface:
    'https://www.shidianguji.com/zh/book/NGJ89241199902970167139/chapter/1lvorfox7ld12',
  wygTextSurface: 'https://ctext.org/wiki.pl?chapter=548506',
  targetChapterInVolumeSevenTextuallyEstablished: true,
  targetChapterImmediatelyPrecedesZiXiChapterTextuallyEstablished: true,
  targetTextIncludesMultiFactorSpouseMethod: true,
  targetTextDimensions: Object.freeze([
    '正財與偏財區分',
    '日干健旺／日主旺衰',
    '時令與旺鄉',
    '官星',
    '印',
    '比肩',
    '死絶／墓等狀態條件',
  ]),
  exactNlcWanliVolume14PdfPageNumberEstablished: false,
  exactNlcWanliVolume14TargetImageInspected: false,
  notes:
    'The digital text establishes chapter identity, ordering and multi-factor content within 卷七. It does not itself prove which PDF page in NLC 第14冊 contains the target, and it is not treated as a substitute for direct facsimile inspection.',
} as const);

export const RELATIONSHIP_SPOUSE_T8_SAMYEONG_WANLI_PRIMARY_TARGET_CONTROL_IDS = Object.freeze([
  'WANLI_PRIMARY_TARGET_EVIDENCE_ACCEPTS_ONLY_THE_EXACT_POST_300_SOURCE_ACCESS_APPLICABILITY_BOUNDARY',
  'NLC_WANLI_VOLUME13_IS_BIBLIOGRAPHICALLY_BOUND_AS_VOLUME_SEVEN_UPPER',
  'NLC_WANLI_VOLUME14_IS_BIBLIOGRAPHICALLY_BOUND_AS_VOLUME_SEVEN_LOWER',
  'THE_WANLI_VOLUME_SEVEN_SPLIT_IS_A_STRONGER_PRIMARY_CONTAINER_BOUNDARY_THAN_THE_1926_WHOLE_BOOK_SCAN',
  'TARGET_CHAPTER_IDENTITY_AND_ORDER_ARE_TEXTUALLY_ESTABLISHED_WITHIN_VOLUME_SEVEN',
  'TEXTUAL_VOLUME_LOCATION_DOES_NOT_EQUAL_EXACT_NLC_VOLUME14_PDF_PAGE_BINDING',
  'NLC_WANLI_VOLUME14_TARGET_PAGE_NUMBER_REMAINS_UNRESOLVED',
  'NLC_WANLI_VOLUME14_TARGET_PAGE_IMAGE_REMAINS_UNINSPECTED',
  'EARLY_PRINT_SCAN_CONTAINER_DOES_NOT_EQUAL_QUALIFYING_PRIMARY_WITNESS_WITHOUT_TARGET_PAGE_BINDING',
  'PRIMARY_PROVENANCE_PROGRESS_DOES_NOT_CLOSE_THE_NORMATIVE_PROVENANCE_REQUIREMENT',
  'CURRENT_T5_INFORMATION_LOSS_SEMANTIC_MISMATCH_REMAINS_UNCHANGED',
  'CURRENT_RELATIONSHIP_T6_DIRECT_INPUT_PATH_REMAINS_ABSENT',
  'MODERN_APPLICABILITY_REMAINS_PARTIAL_EVIDENCE_NOT_ADEQUATE',
  'ZERO_OF_FIVE_AUTHORITY_GAPS_CLOSED',
  'NO_SPOUSE_T8_PRODUCER_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_EFFECT',
  'NEXT_GATE_REQUIRES_EXACT_VOLUME14_TARGET_PAGE_BINDING_AND_DIRECT_VISUAL_INSPECTION',
] as const);

export interface RelationshipSpouseT8SamyeongWanliPrimaryTargetEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_SAMYEONG_WANLI_PRIMARY_TARGET_EVIDENCE_VERSION;
  status:
    | 'RESOLVED_RELATIONSHIP_SPOUSE_T8_SAMYEONG_WANLI_PRIMARY_TARGET_EVIDENCE'
    | 'UPSTREAM_SOURCE_ACCESS_APPLICABILITY_BOUNDARY_INVALID';
  decision:
    | 'MING_WANLI_VOLUME_SEVEN_PRIMARY_CONTAINER_SPLIT_ACQUIRED_TARGET_PAGE_NOT_BOUND_OR_VISUALLY_INSPECTED_ZERO_GAP_CLOSURE'
    | 'WANLI_PRIMARY_TARGET_EVIDENCE_NOT_ESTABLISHED';
  upstreamSourceAccessApplicabilityEvidenceId: string;
  exactUpstreamSourceAccessApplicabilityBoundaryAccepted: boolean;
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  primaryContainerRecords: readonly (typeof RELATIONSHIP_SPOUSE_T8_SAMYEONG_WANLI_PRIMARY_CONTAINER_RECORDS)[number][];
  primaryContainerRecordCount: 2 | 0;
  wanliEditionEstablished: boolean;
  wanliVolumeSevenUpperContainerEstablished: boolean;
  wanliVolumeSevenLowerContainerEstablished: boolean;
  wanliVolumeSevenBibliographicSplitEstablished: boolean;
  wanliVolume14PrimaryTargetContainerCandidateEstablished: boolean;
  targetChapter: '妻妾引例章';
  targetChapterInVolumeSevenTextuallyEstablished: boolean;
  targetChapterImmediatelyPrecedesZiXiChapterTextuallyEstablished: boolean;
  targetTextMultiFactorMethodReconfirmed: boolean;
  targetTextDimensions: readonly string[];
  nlcWanliVolume14TargetChapterPageBindingEstablished: false;
  nlcWanliVolume14ExactTargetPdfPageNumberEstablished: false;
  nlcWanliVolume14DirectTargetPageImageInspected: false;
  qualifyingPrimaryWitnessEstablished: false;
  primaryEditionContainerProvenanceProgressRecognized: boolean;
  primaryEditionContainerIsStrongerThan1926WholeBookContainerForTargeting: boolean;
  primaryProvenanceProgressAdequateForAuthorityAdmission: false;
  normativeProvenanceRequirementClosedByThisEvidence: false;
  applicabilityGapStatus: 'PARTIAL_EVIDENCE_NOT_ADEQUATE';
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
  authorityAdmissionReady: false;
  semanticProducerImplementationAuthorized: false;
  spouseT8RuleAuthoringAuthorized: false;
  spouseT8ClaimTypeCreationAuthorized: false;
  spouseInterpretationPackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  compatibilityAuthorityAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_SAMYEONG_WANLI_PRIMARY_TARGET_CONTROL_IDS)[number][];
  controlCount: 16 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    earlyPrintPrimaryContainerPairsRecorded: 1 | 0;
    earlyPrintPrimarySubvolumeContainersRecorded: 2 | 0;
    targetChapterTextualLocatorsRecorded: 1 | 0;
    exactTargetPdfPagesBound: 0;
    directPrimaryTargetImagesNewlyInspected: 0;
    qualifyingPrimaryWitnessesEstablished: 0;
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
    | 'BIND_AND_VISUALLY_INSPECT_NLC_WANLI_VOLUME14_WIFE_CONCUBINE_EXAMPLE_TARGET_PAGE_BEFORE_ANY_PRIMARY_WITNESS_OR_AUTHORITY_REASSESSMENT'
    | 'REESTABLISH_RELATIONSHIP_SPOUSE_T8_SOURCE_ACCESS_APPLICABILITY_EVIDENCE';
}

function contentAddressedSourceAccessApplicabilityIdentityValid(
  evidence: RelationshipSpouseT8SourceAccessApplicabilityEvidenceReport,
): boolean {
  const { evidenceId, ...material } = evidence;
  return (
    evidenceId ===
    `relationship_spouse_t8_source_access_applicability_evidence_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactUpstreamSourceAccessApplicabilityBoundaryAccepted(
  evidence: RelationshipSpouseT8SourceAccessApplicabilityEvidenceReport,
): boolean {
  return (
    contentAddressedSourceAccessApplicabilityIdentityValid(evidence) &&
    evidence.evidenceVersion ===
      RELATIONSHIP_SPOUSE_T8_SOURCE_ACCESS_APPLICABILITY_EVIDENCE_VERSION &&
    evidence.status ===
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_SOURCE_ACCESS_APPLICABILITY_EVIDENCE' &&
    evidence.decision ===
      'HIGHER_PROVENANCE_MODERN_GENDER_ASYMMETRY_EVIDENCE_UPGRADES_APPLICABILITY_TO_PARTIAL_WHILE_DIRECT_FACSIMILE_AND_CURRENT_METHOD_AUTHORITY_REMAIN_UNRESOLVED' &&
    evidence.exactUpstreamContinuationBoundaryAccepted &&
    evidence.evidenceRecordCount === 3 &&
    deterministicContentHash(evidence.evidenceRecords) ===
      deterministicContentHash(
        RELATIONSHIP_SPOUSE_T8_SOURCE_ACCESS_APPLICABILITY_EVIDENCE_RECORDS,
      ) &&
    evidence.samyeongWygTargetFolioSpanStillBounded &&
    evidence.samyeongWygDirectTargetImageInspected === false &&
    evidence.samyeongNlcInstitutionalScanContainerEstablished &&
    evidence.samyeongNlcTargetTextSearchIndexed &&
    evidence.samyeongNlcExactTargetPdfPageNumberEstablished === false &&
    evidence.samyeongNlcDirectTargetPageImageInspected === false &&
    evidence.samyeongNlcQualifyingPrimaryWitnessEstablished === false &&
    evidence.gujinHistoricalCompilationWitnessLocated &&
    evidence.gujinHistoricalCompilationDirectPageImageInspected === false &&
    evidence.gujinWitnessQualifiesAsSamyeongPrimaryWitness === false &&
    evidence.samyeongTextualMethodCorroborationStrengthened &&
    evidence.kciGenderAsymmetryStudyLocated &&
    evidence.kciStudyKciIndexed &&
    evidence.kciStudyDirectlyAddressesMingliGenderAsymmetry &&
    evidence.kciStudySupportsRemovingHistoricalDiscriminatoryMoralStigma &&
    evidence.kciStudyExplicitGenderNeutralSpouseNatalContractEstablished === false &&
    evidence.kciStudyExplicitNoUserOrPartnerSexInferenceContractEstablished === false &&
    evidence.kciStudyExplicitNoPartnerSexualOrientationInferenceContractEstablished === false &&
    evidence.applicabilityGapPreviousStatus === 'NO_QUALIFYING_EVIDENCE' &&
    evidence.applicabilityGapCurrentStatus === 'PARTIAL_EVIDENCE_NOT_ADEQUATE' &&
    evidence.applicabilityGapProgressRecognized &&
    evidence.applicabilityGapClosedByThisEvidence === false &&
    evidence.modernApplicabilityBoundaryPartialEvidenceEstablished &&
    evidence.modernApplicabilityBoundaryAdequateForGapClosure === false &&
    evidence.independentModernGenderAsymmetryProvenanceLocated &&
    evidence.independentNormativeProvenanceForCurrentSpouseMethodEstablished === false &&
    evidence.explicitGenderNeutralSpouseNatalApplicabilityEstablished === false &&
    evidence.explicitNoUserOrPartnerSexInferenceEstablished === false &&
    evidence.explicitNoPartnerSexualOrientationInferenceEstablished === false &&
    evidence.exactCurrentClaimClassCompositionAuthorityEstablished === false &&
    evidence.currentGovernedMethodSemanticCorrespondenceEstablished === false &&
    evidence.currentRelationshipT6InputPathEstablished === false &&
    evidence.crossSourceStitchingAuthorized === false &&
    evidence.crossTaskStitchingAuthorized === false &&
    evidence.qualifyingAuthorityCandidateCount === 0 &&
    evidence.authorityAcceptedCandidateCount === 0 &&
    evidence.authorityGapsClosedCount === 0 &&
    evidence.allFiveAuthorityGapsRemainOpen &&
    evidence.partialButInadequateRequirementCount === 5 &&
    evidence.noQualifyingEvidenceRequirementCount === 0 &&
    evidence.authorityAdmissionReady === false &&
    evidence.semanticProducerImplementationAuthorized === false &&
    evidence.controlCount === 16 &&
    evidence.controlsFrozen &&
    deterministicContentHash(evidence.controlIds) ===
      deterministicContentHash(RELATIONSHIP_SPOUSE_T8_SOURCE_ACCESS_APPLICABILITY_CONTROL_IDS) &&
    evidence.recommendedNextAction ===
      'ACQUIRE_DIRECT_SAMYEONG_TARGET_FACSIMILE_AND_EXPLICIT_GENDER_NEUTRAL_SPOUSE_NATAL_APPLICABILITY_AUTHORITY_BEFORE_ANY_ADMISSION_OR_PRODUCER_GATE'
  );
}

function finalized(
  material: Omit<RelationshipSpouseT8SamyeongWanliPrimaryTargetEvidenceReport, 'evidenceId'>,
): RelationshipSpouseT8SamyeongWanliPrimaryTargetEvidenceReport {
  return {
    evidenceId: `relationship_spouse_t8_samyeong_wanli_primary_target_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildRelationshipSpouseT8SamyeongWanliPrimaryTargetEvidence(
  upstream: RelationshipSpouseT8SourceAccessApplicabilityEvidenceReport,
): RelationshipSpouseT8SamyeongWanliPrimaryTargetEvidenceReport {
  const accepted = exactUpstreamSourceAccessApplicabilityBoundaryAccepted(upstream);

  return finalized({
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_SAMYEONG_WANLI_PRIMARY_TARGET_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_RELATIONSHIP_SPOUSE_T8_SAMYEONG_WANLI_PRIMARY_TARGET_EVIDENCE'
      : 'UPSTREAM_SOURCE_ACCESS_APPLICABILITY_BOUNDARY_INVALID',
    decision: accepted
      ? 'MING_WANLI_VOLUME_SEVEN_PRIMARY_CONTAINER_SPLIT_ACQUIRED_TARGET_PAGE_NOT_BOUND_OR_VISUALLY_INSPECTED_ZERO_GAP_CLOSURE'
      : 'WANLI_PRIMARY_TARGET_EVIDENCE_NOT_ESTABLISHED',
    upstreamSourceAccessApplicabilityEvidenceId: upstream.evidenceId,
    exactUpstreamSourceAccessApplicabilityBoundaryAccepted: accepted,
    domain: 'relationship',
    subcategory: 'spouse',
    temporalScope: 'natal',
    statusClass: 'research',
    primaryContainerRecords: accepted
      ? RELATIONSHIP_SPOUSE_T8_SAMYEONG_WANLI_PRIMARY_CONTAINER_RECORDS
      : Object.freeze([]),
    primaryContainerRecordCount: accepted ? 2 : 0,
    wanliEditionEstablished: accepted,
    wanliVolumeSevenUpperContainerEstablished: accepted,
    wanliVolumeSevenLowerContainerEstablished: accepted,
    wanliVolumeSevenBibliographicSplitEstablished: accepted,
    wanliVolume14PrimaryTargetContainerCandidateEstablished: accepted,
    targetChapter: '妻妾引例章',
    targetChapterInVolumeSevenTextuallyEstablished: accepted,
    targetChapterImmediatelyPrecedesZiXiChapterTextuallyEstablished: accepted,
    targetTextMultiFactorMethodReconfirmed: accepted,
    targetTextDimensions: accepted
      ? RELATIONSHIP_SPOUSE_T8_SAMYEONG_WANLI_TARGET_TEXT_LOCATOR.targetTextDimensions
      : Object.freeze([]),
    nlcWanliVolume14TargetChapterPageBindingEstablished: false,
    nlcWanliVolume14ExactTargetPdfPageNumberEstablished: false,
    nlcWanliVolume14DirectTargetPageImageInspected: false,
    qualifyingPrimaryWitnessEstablished: false,
    primaryEditionContainerProvenanceProgressRecognized: accepted,
    primaryEditionContainerIsStrongerThan1926WholeBookContainerForTargeting: accepted,
    primaryProvenanceProgressAdequateForAuthorityAdmission: false,
    normativeProvenanceRequirementClosedByThisEvidence: false,
    applicabilityGapStatus: 'PARTIAL_EVIDENCE_NOT_ADEQUATE',
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
      ? RELATIONSHIP_SPOUSE_T8_SAMYEONG_WANLI_PRIMARY_TARGET_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted ? 16 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      earlyPrintPrimaryContainerPairsRecorded: accepted ? 1 : 0,
      earlyPrintPrimarySubvolumeContainersRecorded: accepted ? 2 : 0,
      targetChapterTextualLocatorsRecorded: accepted ? 1 : 0,
      exactTargetPdfPagesBound: 0,
      directPrimaryTargetImagesNewlyInspected: 0,
      qualifyingPrimaryWitnessesEstablished: 0,
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
      ? 'BIND_AND_VISUALLY_INSPECT_NLC_WANLI_VOLUME14_WIFE_CONCUBINE_EXAMPLE_TARGET_PAGE_BEFORE_ANY_PRIMARY_WITNESS_OR_AUTHORITY_REASSESSMENT'
      : 'REESTABLISH_RELATIONSHIP_SPOUSE_T8_SOURCE_ACCESS_APPLICABILITY_EVIDENCE',
  });
}
