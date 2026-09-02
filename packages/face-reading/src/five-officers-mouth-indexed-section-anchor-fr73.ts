import {
  validateFiveOfficerMouthDirectSourceCandidateExtensionFR72,
  type FiveOfficerMouthDirectSourceCandidateExtensionFR72V1,
} from './five-officers-mouth-direct-source-candidate-extension-fr72.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR73_INDEXED_SECTION_ANCHOR = Object.freeze({
  sourceFileUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/22/NLC416-13jh001662-59167_神相全編.pdf',
  indexedHeading: '神相全編卷二一',
  indexedSectionSequence: Object.freeze(['五官總論', '五官說'] as const),
  anchorInterpretation: 'volume2_leaf1_section_start_only',
  targetPassageId: 'passage.shenxiang.five_officers.intake',
  targetChapter: '出納官',
  targetPassagePrintedLeaf: null,
  exactScanPage: null,
  visualEvidenceRefs: Object.freeze([]) as readonly [],
  checkerRefs: Object.freeze([]) as readonly [],
  evidenceState: 'search_index_text_anchor_not_visual_verification',
} as const);

export interface FiveOfficerMouthIndexedSectionAnchorFR73V1 {
  readonly schemaVersion: 'fr73-five-officers-mouth-indexed-section-anchor-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'indexed_volume2_leaf1_section_start_anchor_only';
  readonly upstream: {
    readonly fr72SchemaVersion: 'fr72-five-officers-mouth-direct-source-candidate-extension-v1';
    readonly fr72AuthorityState: 'verified_witness_locator_candidate_extension_only';
    readonly candidateState: 'witness_verified_passage_unlocated';
    readonly baseRegistryMutated: false;
    readonly pageVerificationAuthorized: false;
    readonly passageScanCheckedPromotionAuthorized: false;
    readonly criterionStatesIssued: 0;
    readonly claimsIssued: 0;
    readonly traditionalSemanticAuthority: false;
  };
  readonly indexedSectionAnchor: typeof FR73_INDEXED_SECTION_ANCHOR;
  readonly locatorState: {
    readonly sectionStartPrintedLeafAnchor: '卷二一';
    readonly targetPassagePrintedLeaf: null;
    readonly exactScanPage: null;
    readonly visualEvidenceRefs: readonly [];
    readonly checkerRefs: readonly [];
    readonly pageVerificationState: null;
  };
  readonly searchIndexResearchAuthorized: true;
  readonly targetPassagePrintedLeafAuthorized: false;
  readonly scanPageLocatorAuthorized: false;
  readonly baseRegistryInsertionAuthorized: false;
  readonly pageVerificationAuthorized: false;
  readonly passageScanCheckedPromotionAuthorized: false;
  readonly methodologyProductionPromotionAuthorized: false;
  readonly automaticCriterionStateAuthority: false;
  readonly morphologyProduced: false;
  readonly criterionStatesIssued: 0;
  readonly claimsIssued: 0;
  readonly traditionalFormationAuthorized: false;
  readonly traditionalSemanticAuthority: false;
  readonly authorityBoundary: {
    readonly searchIndexHitMeansVisualEvidence: false;
    readonly sectionStartAnchorMeansTargetPassagePrintedLeaf: false;
    readonly printedLeafAnchorMeansScanPage: false;
    readonly sameSectionMeansSamePrintedLeaf: false;
    readonly indexedTextMeansPageVerification: false;
    readonly externalCorroborationMeansScanChecked: false;
    readonly candidateExtensionMeansBaseRegistryInsertion: false;
    readonly sourceLocatorResearchMeansProductionMethodology: false;
    readonly sourceLocatorResearchMeansAutomaticCriterionState: false;
    readonly sourceLocatorResearchMeansTraditionalSemantics: false;
  };
  readonly remainingBlockers: readonly [
    'intake_target_passage_printed_leaf_unconfirmed',
    'intake_exact_scan_page_unlocated',
    'intake_visual_scan_evidence_absent',
    'intake_checker_refs_absent',
    'intake_page_verification_record_absent',
    'search_index_anchor_is_not_visual_scan_evidence',
    'candidate_checksum_not_recorded',
    'base_registry_insertion_not_authorized',
    'five_officers_methodology_research_only',
    'fr70_downstream_geometry_metric_calibration_blockers_remain',
  ];
  readonly prohibitedShortcuts: readonly [
    'search_index_hit_to_visual_evidence',
    'section_start_anchor_to_target_passage_printed_leaf',
    'printed_leaf_anchor_to_scan_page',
    'same_section_to_same_printed_leaf',
    'indexed_text_to_page_verification',
    'external_text_corroboration_to_scan_checked',
    'candidate_extension_to_base_registry_insertion',
    'locator_research_to_production_methodology',
    'locator_research_to_automatic_criterion_state',
    'locator_research_to_traditional_semantics',
  ];
}

const REQUIRED_BLOCKERS = Object.freeze([
  'intake_target_passage_printed_leaf_unconfirmed',
  'intake_exact_scan_page_unlocated',
  'intake_visual_scan_evidence_absent',
  'intake_checker_refs_absent',
  'intake_page_verification_record_absent',
  'search_index_anchor_is_not_visual_scan_evidence',
  'candidate_checksum_not_recorded',
  'base_registry_insertion_not_authorized',
  'five_officers_methodology_research_only',
  'fr70_downstream_geometry_metric_calibration_blockers_remain',
] as const);

const REQUIRED_SHORTCUTS = Object.freeze([
  'search_index_hit_to_visual_evidence',
  'section_start_anchor_to_target_passage_printed_leaf',
  'printed_leaf_anchor_to_scan_page',
  'same_section_to_same_printed_leaf',
  'indexed_text_to_page_verification',
  'external_text_corroboration_to_scan_checked',
  'candidate_extension_to_base_registry_insertion',
  'locator_research_to_production_methodology',
  'locator_research_to_automatic_criterion_state',
  'locator_research_to_traditional_semantics',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-73 ${message}`);
}

function sameSequence<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function validateIndexedAnchor(): void {
  if (
    FR73_INDEXED_SECTION_ANCHOR.sourceFileUrl !== 'https://upload.wikimedia.org/wikipedia/commons/2/22/NLC416-13jh001662-59167_神相全編.pdf' ||
    FR73_INDEXED_SECTION_ANCHOR.indexedHeading !== '神相全編卷二一' ||
    !sameSequence(FR73_INDEXED_SECTION_ANCHOR.indexedSectionSequence, ['五官總論', '五官說'] as const) ||
    FR73_INDEXED_SECTION_ANCHOR.anchorInterpretation !== 'volume2_leaf1_section_start_only' ||
    FR73_INDEXED_SECTION_ANCHOR.targetPassageId !== 'passage.shenxiang.five_officers.intake' ||
    FR73_INDEXED_SECTION_ANCHOR.targetChapter !== '出納官' ||
    FR73_INDEXED_SECTION_ANCHOR.targetPassagePrintedLeaf !== null ||
    FR73_INDEXED_SECTION_ANCHOR.exactScanPage !== null ||
    FR73_INDEXED_SECTION_ANCHOR.visualEvidenceRefs.length !== 0 ||
    FR73_INDEXED_SECTION_ANCHOR.checkerRefs.length !== 0 ||
    FR73_INDEXED_SECTION_ANCHOR.evidenceState !== 'search_index_text_anchor_not_visual_verification'
  ) {
    fail('indexed section anchor evidence drift.');
  }
}

function validateUpstream(source: FiveOfficerMouthDirectSourceCandidateExtensionFR72V1): void {
  validateFiveOfficerMouthDirectSourceCandidateExtensionFR72(source);
  if (
    source.schemaVersion !== 'fr72-five-officers-mouth-direct-source-candidate-extension-v1' ||
    source.authorityState !== 'verified_witness_locator_candidate_extension_only' ||
    source.candidate.state !== 'witness_verified_passage_unlocated' ||
    source.baseRegistry.baseRegistryMutated !== false ||
    source.locatorState.exactScanPage !== null ||
    source.locatorState.printedPage !== null ||
    source.locatorState.visualEvidenceRefs.length !== 0 ||
    source.locatorState.checkerRefs.length !== 0 ||
    source.pageVerificationAuthorized !== false ||
    source.passageScanCheckedPromotionAuthorized !== false ||
    source.criterionStatesIssued !== 0 ||
    source.claimsIssued !== 0 ||
    source.traditionalSemanticAuthority !== false
  ) {
    fail('FR-72 upstream locator or authority widened.');
  }
}

export function admitFiveOfficerMouthIndexedSectionAnchorFR73(
  source: FiveOfficerMouthDirectSourceCandidateExtensionFR72V1,
): FiveOfficerMouthIndexedSectionAnchorFR73V1 {
  validateUpstream(source);
  validateIndexedAnchor();

  return Object.freeze({
    schemaVersion: 'fr73-five-officers-mouth-indexed-section-anchor-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'indexed_volume2_leaf1_section_start_anchor_only' as const,
    upstream: Object.freeze({
      fr72SchemaVersion: source.schemaVersion,
      fr72AuthorityState: source.authorityState,
      candidateState: source.candidate.state,
      baseRegistryMutated: source.baseRegistry.baseRegistryMutated,
      pageVerificationAuthorized: source.pageVerificationAuthorized,
      passageScanCheckedPromotionAuthorized: source.passageScanCheckedPromotionAuthorized,
      criterionStatesIssued: source.criterionStatesIssued,
      claimsIssued: source.claimsIssued,
      traditionalSemanticAuthority: source.traditionalSemanticAuthority,
    }),
    indexedSectionAnchor: FR73_INDEXED_SECTION_ANCHOR,
    locatorState: Object.freeze({
      sectionStartPrintedLeafAnchor: '卷二一' as const,
      targetPassagePrintedLeaf: null,
      exactScanPage: null,
      visualEvidenceRefs: Object.freeze([]) as readonly [],
      checkerRefs: Object.freeze([]) as readonly [],
      pageVerificationState: null,
    }),
    searchIndexResearchAuthorized: true as const,
    targetPassagePrintedLeafAuthorized: false as const,
    scanPageLocatorAuthorized: false as const,
    baseRegistryInsertionAuthorized: false as const,
    pageVerificationAuthorized: false as const,
    passageScanCheckedPromotionAuthorized: false as const,
    methodologyProductionPromotionAuthorized: false as const,
    automaticCriterionStateAuthority: false as const,
    morphologyProduced: false as const,
    criterionStatesIssued: 0 as const,
    claimsIssued: 0 as const,
    traditionalFormationAuthorized: false as const,
    traditionalSemanticAuthority: false as const,
    authorityBoundary: Object.freeze({
      searchIndexHitMeansVisualEvidence: false as const,
      sectionStartAnchorMeansTargetPassagePrintedLeaf: false as const,
      printedLeafAnchorMeansScanPage: false as const,
      sameSectionMeansSamePrintedLeaf: false as const,
      indexedTextMeansPageVerification: false as const,
      externalCorroborationMeansScanChecked: false as const,
      candidateExtensionMeansBaseRegistryInsertion: false as const,
      sourceLocatorResearchMeansProductionMethodology: false as const,
      sourceLocatorResearchMeansAutomaticCriterionState: false as const,
      sourceLocatorResearchMeansTraditionalSemantics: false as const,
    }),
    remainingBlockers: REQUIRED_BLOCKERS,
    prohibitedShortcuts: REQUIRED_SHORTCUTS,
  });
}

export function validateFiveOfficerMouthIndexedSectionAnchorFR73(
  source: FiveOfficerMouthIndexedSectionAnchorFR73V1,
): FiveOfficerMouthIndexedSectionAnchorFR73V1 {
  validateIndexedAnchor();
  if (
    source.schemaVersion !== 'fr73-five-officers-mouth-indexed-section-anchor-v1' ||
    source.artifactVersion !== '0.1.0' ||
    source.authorityState !== 'indexed_volume2_leaf1_section_start_anchor_only'
  ) {
    fail('schema or authority state drift.');
  }
  if (
    source.upstream.fr72SchemaVersion !== 'fr72-five-officers-mouth-direct-source-candidate-extension-v1' ||
    source.upstream.fr72AuthorityState !== 'verified_witness_locator_candidate_extension_only' ||
    source.upstream.candidateState !== 'witness_verified_passage_unlocated' ||
    source.upstream.baseRegistryMutated !== false ||
    source.upstream.pageVerificationAuthorized !== false ||
    source.upstream.passageScanCheckedPromotionAuthorized !== false ||
    source.upstream.criterionStatesIssued !== 0 ||
    source.upstream.claimsIssued !== 0 ||
    source.upstream.traditionalSemanticAuthority !== false
  ) {
    fail('FR-72 upstream authority widened.');
  }
  if (
    source.indexedSectionAnchor !== FR73_INDEXED_SECTION_ANCHOR ||
    source.locatorState.sectionStartPrintedLeafAnchor !== '卷二一' ||
    source.locatorState.targetPassagePrintedLeaf !== null ||
    source.locatorState.exactScanPage !== null ||
    source.locatorState.visualEvidenceRefs.length !== 0 ||
    source.locatorState.checkerRefs.length !== 0 ||
    source.locatorState.pageVerificationState !== null
  ) {
    fail('locator evidence or passage-location authority widened.');
  }
  if (
    source.searchIndexResearchAuthorized !== true ||
    source.targetPassagePrintedLeafAuthorized !== false ||
    source.scanPageLocatorAuthorized !== false ||
    source.baseRegistryInsertionAuthorized !== false ||
    source.pageVerificationAuthorized !== false ||
    source.passageScanCheckedPromotionAuthorized !== false ||
    source.methodologyProductionPromotionAuthorized !== false ||
    source.automaticCriterionStateAuthority !== false ||
    source.morphologyProduced !== false ||
    source.criterionStatesIssued !== 0 ||
    source.claimsIssued !== 0 ||
    source.traditionalFormationAuthorized !== false ||
    source.traditionalSemanticAuthority !== false
  ) {
    fail('authority widened.');
  }
  if (!Object.values(source.authorityBoundary).every((value) => value === false)) {
    fail('authority boundary must remain fully fail-closed.');
  }
  if (!sameSequence(source.remainingBlockers, REQUIRED_BLOCKERS)) {
    fail('remaining blockers drift.');
  }
  if (!sameSequence(source.prohibitedShortcuts, REQUIRED_SHORTCUTS)) {
    fail('prohibited shortcuts drift.');
  }
  return source;
}

export function assertMouthTargetPassagePrintedLeafAuthorizedFR73(
  source: FiveOfficerMouthIndexedSectionAnchorFR73V1,
): never {
  validateFiveOfficerMouthIndexedSectionAnchorFR73(source);
  throw new FaceAuthorityValidationError(
    'FR-73 target passage printed leaf is not authorized; indexed section-start evidence is not a visual passage locator.',
  );
}

export function assertMouthScanPageLocatorAuthorizedFR73(
  source: FiveOfficerMouthIndexedSectionAnchorFR73V1,
): never {
  validateFiveOfficerMouthIndexedSectionAnchorFR73(source);
  throw new FaceAuthorityValidationError(
    'FR-73 scan page locator is not authorized; exact scan image evidence and checker provenance are still absent.',
  );
}
