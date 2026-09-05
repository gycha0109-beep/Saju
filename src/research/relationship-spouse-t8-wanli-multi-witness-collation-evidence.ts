import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_EVIDENCE_VERSION,
  RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_RECORD,
  type RelationshipSpouseT8RoleNeutralApplicabilityContractCandidateEvidenceReport,
} from './relationship-spouse-t8-role-neutral-applicability-contract-candidate-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_WANLI_MULTI_WITNESS_COLLATION_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-wanli-multi-witness-collation-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_WANLI_MULTI_WITNESS_COLLATION_RECORDS = Object.freeze([
  Object.freeze({
    recordId: 'NCL_TAIWAN_06589_WANLI_1578_INSTITUTIONAL_BIBLIOGRAPHY',
    sourceId: 'NCL-06589',
    title: '三命通會十二卷',
    author: '(明)萬民英撰',
    institution: 'National Central Library, Taiwan',
    sourceClass: 'institutional_rare_book_bibliography',
    edition: '明萬曆戊寅(六年, 1578)刊本',
    publicationYear: 1578,
    volumeCount: 12,
    binding: '線裝',
    physicalFrame: '匡21.4 x 14.7公分',
    bookNumber: '06589',
    accessSurface:
      'https://rbook.ncl.edu.tw/NCLSearch/Search/SearchDetail?HasImage=&SourceID=1&item=26447d6c7bce4f449022760431185858fDU3MDkwMg2.stq2HEhfWJC_eUYaQeBiD_PNb2MtZqMpJAZgsDYhhYk_&page=&sourceWhereString=&whereString=IChDcmVhdGVyX05hbWUgbGlrZSAnJeiQrOawkeiLsSUnIG9yIERvY3VtZW50X1dyaXRlciBsaWtlICcl6JCs5rCR6IuxJScgb3IgSm91cm5hbF9Xcml0ZXIgbGlrZSAnJeiQrOawkeiLsSUnICkg0.kCozK1ger_VDKjWLmYeI3_nb0xMenmNBgvJUAAV7WaE_',
    officialInstitutionalFirstPrintIdentityEstablished: true,
    targetChapterPageBound: false,
    targetChapterImageInspected: false,
    notes:
      'The official Taiwan National Central Library rare-book catalogue independently establishes a twelve-book Wanli 6 (1578) printed witness. This is bibliographic provenance only: no 妻妾引例章 target folio/page is claimed from the catalogue record.',
  }),
  Object.freeze({
    recordId: 'NCL_TAIWAN_06589_COMMONS_FACSIMILE_CONTAINER_MIRROR',
    sourceId: 'NCL-06589-COMMONS',
    title: 'NCL-06589 三命通會 facsimile containers',
    institution: 'National Central Library, Taiwan / Wikimedia Commons mirror',
    sourceClass: 'public_domain_institutional_facsimile_container_mirror',
    edition: '明萬曆戊寅(六年, 1578)刊本',
    firstContainerPageCount: 1000,
    secondContainerPageCount: 187,
    firstContainerSurface:
      'https://commons.wikimedia.org/wiki/File:NCL-06589_1_三命通會.pdf',
    secondContainerSurface:
      'https://commons.wikimedia.org/wiki/File:NCL-06589_2_三命通會.pdf',
    firstPrintFacsimileContainerEstablished: true,
    exactTargetContainerWithinThisTwoFileMirrorEstablished: false,
    targetChapterPageBound: false,
    targetChapterImageInspected: false,
    notes:
      'The Commons mirror exposes the NCL 06589 Wanli 1578 facsimile as 1000-page and 187-page PDF containers. Container availability does not establish which scan page contains 妻妾引例章 and is not treated as direct target-page inspection.',
  }),
  Object.freeze({
    recordId: 'XINYI_REVISED_WANLI_FIRST_PRINT_CRITICAL_COLLATION_STATEMENT',
    sourceId: 'XINYI-9310-WANLI-CRITICAL-COLLATION',
    title: '增訂萬曆初刻三命通會辛丑版',
    publisher: '星易圖書有限公司',
    sourceClass: 'modern_critical_edition_editorial_collation_statement',
    accessSurface: 'https://www.xinyi.hk/goods-9310.html',
    firstPrintEditionIdentifiedAs: '明萬曆六年西元一五七八年戊寅初刻本',
    comparedFirstPrintWitnesses: Object.freeze([
      '臺灣央圖藏本',
      '大陸國圖藏本',
      '浙江省圖書館藏本',
    ]),
    comparedFirstPrintWitnessCount: 3,
    witnessesReportedBasicallyConcordant: true,
    taiwanWitnessReportedWithMinorModificationsAndMarginalia: true,
    criticalEditionUsesWanliWitnessesAsPrimaryCollationBase: true,
    targetVolume: '卷七',
    targetContextPrintedPage: '654',
    targetContext: '論六親',
    targetChapter: '妻妾引例章',
    targetChapterPrintedPage: '658',
    nextChapter: '子息引例章',
    nextChapterPrintedPage: '658',
    criticalEditionPaginationIsNotFacsimileScanPagination: true,
    targetChapterPageBoundInFirstPrintFacsimile: false,
    targetChapterImageInspectedInFirstPrintFacsimile: false,
    notes:
      'The modern critical edition records a three-witness Wanli-1578 collation basis and places 論六親, 妻妾引例章, and 子息引例章 in 卷七. Its printed pagination is editorial pagination and must not be substituted for first-print facsimile scan-page binding.',
  }),
] as const);

export const RELATIONSHIP_SPOUSE_T8_WANLI_MULTI_WITNESS_COLLATION_CONTROL_IDS = Object.freeze([
  'MULTI_WITNESS_COLLATION_EVIDENCE_ACCEPTS_ONLY_THE_EXACT_POST_303_APPLICABILITY_BOUNDARY',
  'TAIWAN_NCL_OFFICIAL_CATALOG_ESTABLISHES_A_WANLI_SIX_1578_TWELVE_BOOK_PRINTED_WITNESS',
  'TAIWAN_NCL_COMMONS_MIRROR_ESTABLISHES_PUBLIC_FIRST_PRINT_FACSIMILE_CONTAINERS_NOT_TARGET_PAGE_BINDING',
  'MODERN_CRITICAL_EDITION_REPORTS_THREE_WANLI_1578_FIRST_PRINT_WITNESSES_AS_PRIMARY_COLLATION_BASE',
  'CRITICAL_EDITION_REPORTS_THE_THREE_FIRST_PRINT_WITNESSES_AS_BASICALLY_CONCORDANT_WITH_TAIWAN_VARIANTS_NOTED',
  'CRITICAL_EDITION_BINDS_LUN_LIUQIN_WIFE_CONCUBINE_EXAMPLE_AND_ZIXI_EXAMPLE_TO_VOLUME_SEVEN',
  'CRITICAL_EDITION_PRINTED_PAGE_658_IS_NOT_A_FIRST_PRINT_SCAN_PAGE',
  'MULTI_WITNESS_COLLATION_PROVENANCE_STRENGTHENS_EDITION_AND_CHAPTER_FAMILY_BINDING_ONLY',
  'DIRECT_WANLI_TARGET_FACSIMILE_PAGE_REMAINS_UNBOUND_AND_UNINSPECTED',
  'QUALIFYING_PRIMARY_WITNESS_REMAINS_NOT_ESTABLISHED_WITHOUT_DIRECT_TARGET_PAGE_BINDING',
  'INDEPENDENT_NORMATIVE_PROVENANCE_FOR_CURRENT_SPOUSE_METHOD_REMAINS_NOT_ESTABLISHED',
  'EXPLICIT_ROLE_NEUTRAL_SPOUSE_NATAL_MAPPING_REMAINS_NOT_ESTABLISHED',
  'CURRENT_T5_INFORMATION_LOSS_SEMANTIC_MISMATCH_REMAINS_UNCHANGED',
  'CURRENT_RELATIONSHIP_T6_DIRECT_INPUT_PATH_REMAINS_ABSENT',
  'ZERO_OF_FIVE_AUTHORITY_GAPS_CLOSED',
  'NO_SPOUSE_T8_PRODUCER_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_EFFECT',
  'NEXT_GATE_REQUIRES_EXACT_FIRST_PRINT_TARGET_SCAN_PAGE_BINDING_AND_DIRECT_VISUAL_INSPECTION_OR_INDEPENDENT_NORMATIVE_APPLICABILITY_AUTHORITY',
] as const);

export interface RelationshipSpouseT8WanliMultiWitnessCollationEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_WANLI_MULTI_WITNESS_COLLATION_EVIDENCE_VERSION;
  status:
    | 'RESOLVED_RELATIONSHIP_SPOUSE_T8_WANLI_MULTI_WITNESS_COLLATION_EVIDENCE'
    | 'UPSTREAM_ROLE_NEUTRAL_APPLICABILITY_BOUNDARY_INVALID';
  decision:
    | 'WANLI_1578_FIRST_PRINT_IDENTITY_AND_THREE_WITNESS_COLLATION_PROVENANCE_FROZEN_TARGET_PAGE_STILL_UNBOUND_ZERO_GAP_CLOSURE'
    | 'WANLI_MULTI_WITNESS_COLLATION_EVIDENCE_NOT_ESTABLISHED';
  upstreamApplicabilityEvidenceId: string;
  exactUpstreamApplicabilityBoundaryAccepted: boolean;
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  records: readonly (typeof RELATIONSHIP_SPOUSE_T8_WANLI_MULTI_WITNESS_COLLATION_RECORDS)[number][];
  recordCount: 3 | 0;
  wanli1578FirstPrintIdentityEstablished: boolean;
  taiwanNclOfficialFirstPrintBibliographyEstablished: boolean;
  taiwanNclTwelveBookPhysicalSetEstablished: boolean;
  taiwanNclPublicFacsimileContainerMirrorEstablished: boolean;
  criticalEditionThreeFirstPrintWitnessCollationClaimEstablished: boolean;
  criticalEditionThreeWitnessesBasicallyConcordantClaimEstablished: boolean;
  criticalEditionTaiwanVariantNotePreserved: boolean;
  wifeConcubineExampleChapterVolumeSevenBindingStrengthened: boolean;
  criticalEditionTargetPrintedPageReference: '658' | null;
  criticalEditionPrintedPageTreatedAsFacsimileScanPage: false;
  exactFirstPrintTargetScanPageEstablished: false;
  directFirstPrintTargetPageImageInspected: false;
  qualifyingPrimaryWitnessEstablished: false;
  provenanceProgressClass:
    | 'STRONGER_MULTI_WITNESS_FIRST_PRINT_PROVENANCE_NOT_AUTHORITY_QUALIFYING'
    | 'NOT_ESTABLISHED';
  applicabilityGapStatus: 'PARTIAL_EVIDENCE_NOT_ADEQUATE';
  explicitRoleNeutralSpouseNatalMappingEstablished: false;
  independentNormativeProvenanceForCurrentSpouseMethodEstablished: false;
  currentGovernedMethodSemanticCorrespondenceEstablished: false;
  currentRelationshipT6InputPathEstablished: false;
  crossSourceStitchingAuthorized: false;
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
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_WANLI_MULTI_WITNESS_COLLATION_CONTROL_IDS)[number][];
  controlCount: 17 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    officialWanliFirstPrintBibliographiesRecorded: 1 | 0;
    publicWanliFirstPrintFacsimileMirrorsRecorded: 1 | 0;
    threeWitnessCriticalCollationStatementsRecorded: 1 | 0;
    exactTargetScanPagesBound: 0;
    directTargetImagesInspected: 0;
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
    | 'BIND_AND_VISUALLY_INSPECT_EXACT_WANLI_FIRST_PRINT_WIFE_CONCUBINE_EXAMPLE_TARGET_SCAN_PAGE_OR_ACQUIRE_INDEPENDENT_NORMATIVE_ROLE_NEUTRAL_NATAL_APPLICABILITY_AUTHORITY_BEFORE_ANY_PRODUCER_GATE'
    | 'REESTABLISH_RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_EVIDENCE';
}

function contentAddressedApplicabilityIdentityValid(
  evidence: RelationshipSpouseT8RoleNeutralApplicabilityContractCandidateEvidenceReport,
): boolean {
  const { evidenceId, ...material } = evidence;
  return (
    evidenceId ===
    `relationship_spouse_t8_role_neutral_applicability_contract_candidate_evidence_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactUpstreamApplicabilityBoundaryAccepted(
  evidence: RelationshipSpouseT8RoleNeutralApplicabilityContractCandidateEvidenceReport,
): boolean {
  return (
    contentAddressedApplicabilityIdentityValid(evidence) &&
    evidence.evidenceVersion ===
      RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_EVIDENCE_VERSION &&
    evidence.status ===
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_EVIDENCE' &&
    evidence.decision ===
      'EXPLICIT_NO_IDENTITY_INFERENCE_AND_PARTNER_NEUTRAL_EDITORIAL_BOUNDARY_ACQUIRED_BUT_ROLE_NEUTRAL_NATAL_CONVENTION_AND_NORMATIVE_PROVENANCE_REMAIN_UNRESOLVED_ZERO_GAP_CLOSURE' &&
    evidence.exactUpstreamWanliPrimaryTargetBoundaryAccepted &&
    evidence.candidateRecordCount === 1 &&
    deterministicContentHash(evidence.candidateRecord) ===
      deterministicContentHash(
        RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_RECORD,
      ) &&
    evidence.applicabilityGapStatus === 'PARTIAL_EVIDENCE_NOT_ADEQUATE' &&
    evidence.independentNormativeProvenanceForCurrentSpouseMethodEstablished === false &&
    evidence.qualifyingPrimaryWitnessEstablished === false &&
    evidence.nlcWanliVolume14TargetChapterPageBindingEstablished === false &&
    evidence.nlcWanliVolume14DirectTargetPageImageInspected === false &&
    evidence.explicitGenderNeutralSpouseNatalApplicabilityEstablished === false &&
    evidence.currentGovernedMethodSemanticCorrespondenceEstablished === false &&
    evidence.currentRelationshipT6InputPathEstablished === false &&
    evidence.authorityGapsClosedCount === 0 &&
    evidence.allFiveAuthorityGapsRemainOpen &&
    evidence.semanticProducerImplementationAuthorized === false &&
    evidence.controlCount === 17 &&
    evidence.controlsFrozen &&
    deterministicContentHash(evidence.controlIds) ===
      deterministicContentHash(
        RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_CONTROL_IDS,
      )
  );
}

function finalized(
  material: Omit<RelationshipSpouseT8WanliMultiWitnessCollationEvidenceReport, 'evidenceId'>,
): RelationshipSpouseT8WanliMultiWitnessCollationEvidenceReport {
  return {
    evidenceId: `relationship_spouse_t8_wanli_multi_witness_collation_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildRelationshipSpouseT8WanliMultiWitnessCollationEvidence(
  upstream: RelationshipSpouseT8RoleNeutralApplicabilityContractCandidateEvidenceReport,
): RelationshipSpouseT8WanliMultiWitnessCollationEvidenceReport {
  const accepted = exactUpstreamApplicabilityBoundaryAccepted(upstream);

  return finalized({
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_WANLI_MULTI_WITNESS_COLLATION_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_RELATIONSHIP_SPOUSE_T8_WANLI_MULTI_WITNESS_COLLATION_EVIDENCE'
      : 'UPSTREAM_ROLE_NEUTRAL_APPLICABILITY_BOUNDARY_INVALID',
    decision: accepted
      ? 'WANLI_1578_FIRST_PRINT_IDENTITY_AND_THREE_WITNESS_COLLATION_PROVENANCE_FROZEN_TARGET_PAGE_STILL_UNBOUND_ZERO_GAP_CLOSURE'
      : 'WANLI_MULTI_WITNESS_COLLATION_EVIDENCE_NOT_ESTABLISHED',
    upstreamApplicabilityEvidenceId: upstream.evidenceId,
    exactUpstreamApplicabilityBoundaryAccepted: accepted,
    domain: 'relationship',
    subcategory: 'spouse',
    temporalScope: 'natal',
    statusClass: 'research',
    records: accepted ? RELATIONSHIP_SPOUSE_T8_WANLI_MULTI_WITNESS_COLLATION_RECORDS : Object.freeze([]),
    recordCount: accepted ? 3 : 0,
    wanli1578FirstPrintIdentityEstablished: accepted,
    taiwanNclOfficialFirstPrintBibliographyEstablished: accepted,
    taiwanNclTwelveBookPhysicalSetEstablished: accepted,
    taiwanNclPublicFacsimileContainerMirrorEstablished: accepted,
    criticalEditionThreeFirstPrintWitnessCollationClaimEstablished: accepted,
    criticalEditionThreeWitnessesBasicallyConcordantClaimEstablished: accepted,
    criticalEditionTaiwanVariantNotePreserved: accepted,
    wifeConcubineExampleChapterVolumeSevenBindingStrengthened: accepted,
    criticalEditionTargetPrintedPageReference: accepted ? '658' : null,
    criticalEditionPrintedPageTreatedAsFacsimileScanPage: false,
    exactFirstPrintTargetScanPageEstablished: false,
    directFirstPrintTargetPageImageInspected: false,
    qualifyingPrimaryWitnessEstablished: false,
    provenanceProgressClass: accepted
      ? 'STRONGER_MULTI_WITNESS_FIRST_PRINT_PROVENANCE_NOT_AUTHORITY_QUALIFYING'
      : 'NOT_ESTABLISHED',
    applicabilityGapStatus: 'PARTIAL_EVIDENCE_NOT_ADEQUATE',
    explicitRoleNeutralSpouseNatalMappingEstablished: false,
    independentNormativeProvenanceForCurrentSpouseMethodEstablished: false,
    currentGovernedMethodSemanticCorrespondenceEstablished: false,
    currentRelationshipT6InputPathEstablished: false,
    crossSourceStitchingAuthorized: false,
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
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted
      ? RELATIONSHIP_SPOUSE_T8_WANLI_MULTI_WITNESS_COLLATION_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted ? 17 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      officialWanliFirstPrintBibliographiesRecorded: accepted ? 1 : 0,
      publicWanliFirstPrintFacsimileMirrorsRecorded: accepted ? 1 : 0,
      threeWitnessCriticalCollationStatementsRecorded: accepted ? 1 : 0,
      exactTargetScanPagesBound: 0,
      directTargetImagesInspected: 0,
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
      ? 'BIND_AND_VISUALLY_INSPECT_EXACT_WANLI_FIRST_PRINT_WIFE_CONCUBINE_EXAMPLE_TARGET_SCAN_PAGE_OR_ACQUIRE_INDEPENDENT_NORMATIVE_ROLE_NEUTRAL_NATAL_APPLICABILITY_AUTHORITY_BEFORE_ANY_PRODUCER_GATE'
      : 'REESTABLISH_RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_EVIDENCE',
  });
}
