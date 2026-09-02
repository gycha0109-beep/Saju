import {
  validateFiveOfficerMouthIndexedSectionAnchorFR73,
  type FiveOfficerMouthIndexedSectionAnchorFR73V1,
} from './five-officers-mouth-indexed-section-anchor-fr73.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR74_SCAN_IMAGE_EVIDENCE_REQUIREMENTS = Object.freeze([
  'immutable_nlc_1925_page_image_ref',
  'exact_scan_page_within_1_576',
  'visual_match_of_intake_heading_or_passage_text',
  'nonempty_visual_evidence_refs',
  'nonempty_checker_refs',
] as const);

export interface FiveOfficerMouthScanImageAcquisitionReadinessFR74V1 {
  readonly schemaVersion: 'fr74-five-officers-mouth-scan-image-acquisition-readiness-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'scan_image_evidence_requirements_defined_acquisition_blocked';
  readonly upstream: {
    readonly fr73SchemaVersion: 'fr73-five-officers-mouth-indexed-section-anchor-v1';
    readonly fr73AuthorityState: 'indexed_volume2_leaf1_section_start_anchor_only';
    readonly sectionStartPrintedLeafAnchor: '卷二一';
    readonly targetPassagePrintedLeaf: null;
    readonly exactScanPage: null;
    readonly scanPageLocatorAuthorized: false;
    readonly pageVerificationAuthorized: false;
    readonly passageScanCheckedPromotionAuthorized: false;
    readonly criterionStatesIssued: 0;
    readonly claimsIssued: 0;
    readonly traditionalSemanticAuthority: false;
  };
  readonly sourceTarget: {
    readonly witnessId: 'witness.shenxiang_quanbian.nlc_1925';
    readonly candidateId: 'candidate.shenxiang_nlc_1925.intake';
    readonly passageId: 'passage.shenxiang.five_officers.intake';
    readonly chapter: '出納官';
    readonly sourceFilePageRef: 'https://commons.wikimedia.org/wiki/File:NLC416-13jh001662-59167_神相全編.pdf';
    readonly pageCount: 576;
    readonly fileSizeBytes: 19310489;
  };
  readonly requiredEvidence: typeof FR74_SCAN_IMAGE_EVIDENCE_REQUIREMENTS;
  readonly currentAcquisition: {
    readonly immutablePageImageRef: null;
    readonly exactScanPage: null;
    readonly targetPassagePrintedLeaf: null;
    readonly visualPassageMatchConfirmed: false;
    readonly visualEvidenceRefs: readonly [];
    readonly checkerRefs: readonly [];
    readonly evidenceBundleComplete: false;
    readonly state: 'page_image_not_acquired';
  };
  readonly acquisitionResearchAuthorized: true;
  readonly guessedPageOffsetAuthorized: false;
  readonly otherEditionPageMappingAuthorized: false;
  readonly ocrOnlyLocatorAuthorized: false;
  readonly searchIndexLocatorAuthorized: false;
  readonly pageUrlExistenceMeansVisualVerification: false;
  readonly scanImageEvidenceReady: false;
  readonly scanPageLocatorAuthorized: false;
  readonly baseRegistryInsertionAuthorized: false;
  readonly pageVerificationRecordAuthorized: false;
  readonly passageScanCheckedPromotionAuthorized: false;
  readonly methodologyProductionPromotionAuthorized: false;
  readonly automaticCriterionStateAuthority: false;
  readonly morphologyProduced: false;
  readonly criterionStatesIssued: 0;
  readonly claimsIssued: 0;
  readonly traditionalFormationAuthorized: false;
  readonly traditionalSemanticAuthority: false;
  readonly authorityBoundary: {
    readonly sectionAnchorMeansScanPage: false;
    readonly guessedPdfOffsetMeansScanPage: false;
    readonly otherEditionPageMeansNlcScanPage: false;
    readonly ocrStringMatchMeansVisualMatch: false;
    readonly searchIndexTextMeansPageImage: false;
    readonly pageUrlExistenceMeansVisualEvidence: false;
    readonly callerSuppliedLocatorMeansSourceAuthority: false;
    readonly incompleteEvidenceBundleMeansPageVerification: false;
    readonly pageImageAcquisitionMeansScanChecked: false;
    readonly sourceAcquisitionResearchMeansTraditionalSemantics: false;
  };
  readonly remainingBlockers: readonly [
    'intake_immutable_page_image_ref_absent',
    'intake_exact_scan_page_unlocated',
    'intake_target_passage_printed_leaf_unconfirmed',
    'intake_visual_passage_match_unconfirmed',
    'intake_visual_evidence_refs_absent',
    'intake_checker_refs_absent',
    'intake_page_verification_record_absent',
    'candidate_checksum_not_recorded',
    'base_registry_insertion_not_authorized',
    'five_officers_methodology_research_only',
    'fr70_downstream_geometry_metric_calibration_blockers_remain',
  ];
  readonly prohibitedShortcuts: readonly [
    'section_anchor_to_scan_page',
    'guessed_pdf_offset_to_scan_page',
    'other_edition_page_to_nlc_scan_page',
    'ocr_string_match_to_visual_match',
    'search_index_text_to_page_image',
    'page_url_existence_to_visual_evidence',
    'caller_supplied_locator_to_source_authority',
    'incomplete_evidence_bundle_to_page_verification',
    'page_image_acquisition_to_scan_checked',
    'source_acquisition_research_to_traditional_semantics',
  ];
}

const REQUIRED_BLOCKERS = Object.freeze([
  'intake_immutable_page_image_ref_absent',
  'intake_exact_scan_page_unlocated',
  'intake_target_passage_printed_leaf_unconfirmed',
  'intake_visual_passage_match_unconfirmed',
  'intake_visual_evidence_refs_absent',
  'intake_checker_refs_absent',
  'intake_page_verification_record_absent',
  'candidate_checksum_not_recorded',
  'base_registry_insertion_not_authorized',
  'five_officers_methodology_research_only',
  'fr70_downstream_geometry_metric_calibration_blockers_remain',
] as const);

const REQUIRED_SHORTCUTS = Object.freeze([
  'section_anchor_to_scan_page',
  'guessed_pdf_offset_to_scan_page',
  'other_edition_page_to_nlc_scan_page',
  'ocr_string_match_to_visual_match',
  'search_index_text_to_page_image',
  'page_url_existence_to_visual_evidence',
  'caller_supplied_locator_to_source_authority',
  'incomplete_evidence_bundle_to_page_verification',
  'page_image_acquisition_to_scan_checked',
  'source_acquisition_research_to_traditional_semantics',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-74 ${message}`);
}

function sameSequence<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function validateUpstream(source: FiveOfficerMouthIndexedSectionAnchorFR73V1): void {
  validateFiveOfficerMouthIndexedSectionAnchorFR73(source);
  if (
    source.schemaVersion !== 'fr73-five-officers-mouth-indexed-section-anchor-v1' ||
    source.authorityState !== 'indexed_volume2_leaf1_section_start_anchor_only' ||
    source.locatorState.sectionStartPrintedLeafAnchor !== '卷二一' ||
    source.locatorState.targetPassagePrintedLeaf !== null ||
    source.locatorState.exactScanPage !== null ||
    source.scanPageLocatorAuthorized !== false ||
    source.pageVerificationAuthorized !== false ||
    source.passageScanCheckedPromotionAuthorized !== false ||
    source.criterionStatesIssued !== 0 ||
    source.claimsIssued !== 0 ||
    source.traditionalSemanticAuthority !== false
  ) {
    fail('FR-73 upstream locator or authority widened.');
  }
}

export function assessFiveOfficerMouthScanImageAcquisitionReadinessFR74(
  source: FiveOfficerMouthIndexedSectionAnchorFR73V1,
): FiveOfficerMouthScanImageAcquisitionReadinessFR74V1 {
  validateUpstream(source);

  return Object.freeze({
    schemaVersion: 'fr74-five-officers-mouth-scan-image-acquisition-readiness-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'scan_image_evidence_requirements_defined_acquisition_blocked' as const,
    upstream: Object.freeze({
      fr73SchemaVersion: source.schemaVersion,
      fr73AuthorityState: source.authorityState,
      sectionStartPrintedLeafAnchor: source.locatorState.sectionStartPrintedLeafAnchor,
      targetPassagePrintedLeaf: source.locatorState.targetPassagePrintedLeaf,
      exactScanPage: source.locatorState.exactScanPage,
      scanPageLocatorAuthorized: source.scanPageLocatorAuthorized,
      pageVerificationAuthorized: source.pageVerificationAuthorized,
      passageScanCheckedPromotionAuthorized: source.passageScanCheckedPromotionAuthorized,
      criterionStatesIssued: source.criterionStatesIssued,
      claimsIssued: source.claimsIssued,
      traditionalSemanticAuthority: source.traditionalSemanticAuthority,
    }),
    sourceTarget: Object.freeze({
      witnessId: 'witness.shenxiang_quanbian.nlc_1925' as const,
      candidateId: 'candidate.shenxiang_nlc_1925.intake' as const,
      passageId: 'passage.shenxiang.five_officers.intake' as const,
      chapter: '出納官' as const,
      sourceFilePageRef: 'https://commons.wikimedia.org/wiki/File:NLC416-13jh001662-59167_神相全編.pdf' as const,
      pageCount: 576 as const,
      fileSizeBytes: 19310489 as const,
    }),
    requiredEvidence: FR74_SCAN_IMAGE_EVIDENCE_REQUIREMENTS,
    currentAcquisition: Object.freeze({
      immutablePageImageRef: null,
      exactScanPage: null,
      targetPassagePrintedLeaf: null,
      visualPassageMatchConfirmed: false as const,
      visualEvidenceRefs: Object.freeze([]) as readonly [],
      checkerRefs: Object.freeze([]) as readonly [],
      evidenceBundleComplete: false as const,
      state: 'page_image_not_acquired' as const,
    }),
    acquisitionResearchAuthorized: true as const,
    guessedPageOffsetAuthorized: false as const,
    otherEditionPageMappingAuthorized: false as const,
    ocrOnlyLocatorAuthorized: false as const,
    searchIndexLocatorAuthorized: false as const,
    pageUrlExistenceMeansVisualVerification: false as const,
    scanImageEvidenceReady: false as const,
    scanPageLocatorAuthorized: false as const,
    baseRegistryInsertionAuthorized: false as const,
    pageVerificationRecordAuthorized: false as const,
    passageScanCheckedPromotionAuthorized: false as const,
    methodologyProductionPromotionAuthorized: false as const,
    automaticCriterionStateAuthority: false as const,
    morphologyProduced: false as const,
    criterionStatesIssued: 0 as const,
    claimsIssued: 0 as const,
    traditionalFormationAuthorized: false as const,
    traditionalSemanticAuthority: false as const,
    authorityBoundary: Object.freeze({
      sectionAnchorMeansScanPage: false as const,
      guessedPdfOffsetMeansScanPage: false as const,
      otherEditionPageMeansNlcScanPage: false as const,
      ocrStringMatchMeansVisualMatch: false as const,
      searchIndexTextMeansPageImage: false as const,
      pageUrlExistenceMeansVisualEvidence: false as const,
      callerSuppliedLocatorMeansSourceAuthority: false as const,
      incompleteEvidenceBundleMeansPageVerification: false as const,
      pageImageAcquisitionMeansScanChecked: false as const,
      sourceAcquisitionResearchMeansTraditionalSemantics: false as const,
    }),
    remainingBlockers: REQUIRED_BLOCKERS,
    prohibitedShortcuts: REQUIRED_SHORTCUTS,
  });
}

export function validateFiveOfficerMouthScanImageAcquisitionReadinessFR74(
  source: FiveOfficerMouthScanImageAcquisitionReadinessFR74V1,
): FiveOfficerMouthScanImageAcquisitionReadinessFR74V1 {
  if (
    source.schemaVersion !== 'fr74-five-officers-mouth-scan-image-acquisition-readiness-v1' ||
    source.artifactVersion !== '0.1.0' ||
    source.authorityState !== 'scan_image_evidence_requirements_defined_acquisition_blocked'
  ) {
    fail('schema or authority state drift.');
  }
  if (
    source.upstream.fr73SchemaVersion !== 'fr73-five-officers-mouth-indexed-section-anchor-v1' ||
    source.upstream.fr73AuthorityState !== 'indexed_volume2_leaf1_section_start_anchor_only' ||
    source.upstream.sectionStartPrintedLeafAnchor !== '卷二一' ||
    source.upstream.targetPassagePrintedLeaf !== null ||
    source.upstream.exactScanPage !== null ||
    source.upstream.scanPageLocatorAuthorized !== false ||
    source.upstream.pageVerificationAuthorized !== false ||
    source.upstream.passageScanCheckedPromotionAuthorized !== false ||
    source.upstream.criterionStatesIssued !== 0 ||
    source.upstream.claimsIssued !== 0 ||
    source.upstream.traditionalSemanticAuthority !== false
  ) {
    fail('FR-73 upstream authority widened.');
  }
  if (
    source.sourceTarget.witnessId !== 'witness.shenxiang_quanbian.nlc_1925' ||
    source.sourceTarget.candidateId !== 'candidate.shenxiang_nlc_1925.intake' ||
    source.sourceTarget.passageId !== 'passage.shenxiang.five_officers.intake' ||
    source.sourceTarget.chapter !== '出納官' ||
    source.sourceTarget.sourceFilePageRef !== 'https://commons.wikimedia.org/wiki/File:NLC416-13jh001662-59167_神相全編.pdf' ||
    source.sourceTarget.pageCount !== 576 ||
    source.sourceTarget.fileSizeBytes !== 19310489
  ) {
    fail('source target drift.');
  }
  if (!sameSequence(source.requiredEvidence, FR74_SCAN_IMAGE_EVIDENCE_REQUIREMENTS)) {
    fail('required scan-image evidence contract drift.');
  }
  if (
    source.currentAcquisition.immutablePageImageRef !== null ||
    source.currentAcquisition.exactScanPage !== null ||
    source.currentAcquisition.targetPassagePrintedLeaf !== null ||
    source.currentAcquisition.visualPassageMatchConfirmed !== false ||
    source.currentAcquisition.visualEvidenceRefs.length !== 0 ||
    source.currentAcquisition.checkerRefs.length !== 0 ||
    source.currentAcquisition.evidenceBundleComplete !== false ||
    source.currentAcquisition.state !== 'page_image_not_acquired'
  ) {
    fail('scan-image acquisition evidence was widened without reviewed evidence.');
  }
  if (
    source.acquisitionResearchAuthorized !== true ||
    source.guessedPageOffsetAuthorized !== false ||
    source.otherEditionPageMappingAuthorized !== false ||
    source.ocrOnlyLocatorAuthorized !== false ||
    source.searchIndexLocatorAuthorized !== false ||
    source.pageUrlExistenceMeansVisualVerification !== false ||
    source.scanImageEvidenceReady !== false ||
    source.scanPageLocatorAuthorized !== false ||
    source.baseRegistryInsertionAuthorized !== false ||
    source.pageVerificationRecordAuthorized !== false ||
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

export function assertMouthScanImageEvidenceReadyFR74(
  source: FiveOfficerMouthScanImageAcquisitionReadinessFR74V1,
): never {
  validateFiveOfficerMouthScanImageAcquisitionReadinessFR74(source);
  throw new FaceAuthorityValidationError(
    'FR-74 scan-image evidence is not ready; an immutable NLC page image, exact scan page, visual passage match, evidence refs, and checker refs are required.',
  );
}

export function assertMouthPageVerificationRecordAuthorizedFR74(
  source: FiveOfficerMouthScanImageAcquisitionReadinessFR74V1,
): never {
  validateFiveOfficerMouthScanImageAcquisitionReadinessFR74(source);
  throw new FaceAuthorityValidationError(
    'FR-74 page-verification record is not authorized; scan-image evidence acquisition remains incomplete.',
  );
}
