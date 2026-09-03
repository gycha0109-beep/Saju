import {
  validateFiveOfficerMouthScanImageAcquisitionReadinessFR74,
  type FiveOfficerMouthScanImageAcquisitionReadinessFR74V1,
} from './five-officers-mouth-scan-image-acquisition-readiness-fr74.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR103_NLC_INTAKE_SCAN_EVIDENCE = Object.freeze({
  provenanceSchemaVersion: 'fr103-nlc-scan-acquisition-provenance-v1',
  provenancePath: 'packages/face-reading/evidence/fr103/acquisition-provenance.json',
  witnessId: 'witness.shenxiang_quanbian.nlc_1925',
  candidateId: 'candidate.shenxiang_nlc_1925.intake',
  passageId: 'passage.shenxiang.five_officers.intake',
  chapter: '出納官',
  sourceFilePageRef: 'https://commons.wikimedia.org/wiki/File:NLC416-13jh001662-59167_神相全編.pdf',
  sourcePdfSha256: 'sha256:94167d8d19d47525535b39e18a20c6b315a3a30751c2063bc2492760f1d927af',
  sourcePdfSizeBytes: 19_310_489,
  sourcePdfPageCount: 576,
  exactScanPage: 88,
  targetPassagePrintedLeaf: null,
  immutablePageImageRef: 'packages/face-reading/evidence/fr103/nlc-1925-page-88.png#sha256:5ceedcabaa806ab2a4a55a1923681b5b7b246b01c62af42ee8ba56413d207fce',
  visualEvidenceRefs: Object.freeze([
    'packages/face-reading/evidence/fr103/nlc-1925-page-87.png#sha256:9a3cbda77616c6c359e2aaca173d8f4d3c7ef867449247d9d3887847d9882073',
    'packages/face-reading/evidence/fr103/nlc-1925-page-88.png#sha256:5ceedcabaa806ab2a4a55a1923681b5b7b246b01c62af42ee8ba56413d207fce',
  ] as const),
  checkerRefs: Object.freeze([
    'checker.fr103.interactive_visual_review.primary',
  ] as const),
  visualPassageMatchConfirmed: true,
  visuallyMatchedText: '口須要方大，唇紅端厚，角弓，開大合小，乃為出納官成。',
  evidenceAdmissionBasis: 'immutable_repository_page_image_plus_interactive_visual_review',
  ocrUsedForEvidenceAdmission: false,
  searchIndexUsedForEvidenceAdmission: false,
} as const);

export interface FiveOfficerMouthScanEvidenceAcquisitionFR103V1 {
  readonly schemaVersion: 'fr103-five-officers-mouth-scan-evidence-acquisition-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'immutable_scan_evidence_complete_locator_authorized_registry_promotion_blocked';
  readonly upstream: {
    readonly fr74SchemaVersion: 'fr74-five-officers-mouth-scan-image-acquisition-readiness-v1';
    readonly fr74AuthorityState: 'scan_image_evidence_requirements_defined_acquisition_blocked';
    readonly acquisitionResearchAuthorized: true;
    readonly scanImageEvidenceReady: false;
    readonly scanPageLocatorAuthorized: false;
    readonly pageVerificationRecordAuthorized: false;
    readonly passageScanCheckedPromotionAuthorized: false;
    readonly criterionStatesIssued: 0;
    readonly claimsIssued: 0;
    readonly traditionalSemanticAuthority: false;
  };
  readonly evidence: typeof FR103_NLC_INTAKE_SCAN_EVIDENCE;
  readonly currentAcquisition: {
    readonly immutablePageImageRef: typeof FR103_NLC_INTAKE_SCAN_EVIDENCE.immutablePageImageRef;
    readonly exactScanPage: 88;
    readonly targetPassagePrintedLeaf: null;
    readonly visualPassageMatchConfirmed: true;
    readonly visualEvidenceRefs: typeof FR103_NLC_INTAKE_SCAN_EVIDENCE.visualEvidenceRefs;
    readonly checkerRefs: typeof FR103_NLC_INTAKE_SCAN_EVIDENCE.checkerRefs;
    readonly evidenceBundleComplete: true;
    readonly state: 'immutable_page_image_acquired_and_visually_matched';
  };
  readonly acquisitionResearchAuthorized: true;
  readonly scanImageEvidenceReady: true;
  readonly scanPageLocatorAuthorized: true;
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
    readonly acquiredImageMeansBaseRegistryInsertion: false;
    readonly visualMatchMeansPageVerificationRecord: false;
    readonly exactScanPageMeansScanCheckedPassage: false;
    readonly singleCheckerMeansDoubleChecked: false;
    readonly scanEvidenceMeansProductionMethodology: false;
    readonly scanEvidenceMeansAutomaticCriterionState: false;
    readonly scanEvidenceMeansTraditionalSemantics: false;
  };
  readonly remainingBlockers: readonly [
    'intake_page_verification_record_not_reviewed',
    'base_registry_insertion_not_authorized',
    'passage_scan_checked_promotion_not_reviewed',
    'five_officers_methodology_research_only',
    'fr70_downstream_geometry_metric_calibration_blockers_remain',
  ];
  readonly prohibitedShortcuts: readonly [
    'acquired_image_to_base_registry_insertion',
    'visual_match_to_page_verification_record',
    'exact_scan_page_to_scan_checked_passage',
    'single_checker_to_double_checked',
    'scan_evidence_to_production_methodology',
    'scan_evidence_to_automatic_criterion_state',
    'scan_evidence_to_traditional_semantics',
  ];
}

const REQUIRED_BLOCKERS = Object.freeze([
  'intake_page_verification_record_not_reviewed',
  'base_registry_insertion_not_authorized',
  'passage_scan_checked_promotion_not_reviewed',
  'five_officers_methodology_research_only',
  'fr70_downstream_geometry_metric_calibration_blockers_remain',
] as const);

const REQUIRED_SHORTCUTS = Object.freeze([
  'acquired_image_to_base_registry_insertion',
  'visual_match_to_page_verification_record',
  'exact_scan_page_to_scan_checked_passage',
  'single_checker_to_double_checked',
  'scan_evidence_to_production_methodology',
  'scan_evidence_to_automatic_criterion_state',
  'scan_evidence_to_traditional_semantics',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-103 ${message}`);
}

function sameSequence<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function validateUpstream(source: FiveOfficerMouthScanImageAcquisitionReadinessFR74V1): void {
  validateFiveOfficerMouthScanImageAcquisitionReadinessFR74(source);
  if (
    source.schemaVersion !== 'fr74-five-officers-mouth-scan-image-acquisition-readiness-v1' ||
    source.authorityState !== 'scan_image_evidence_requirements_defined_acquisition_blocked' ||
    source.sourceTarget.witnessId !== FR103_NLC_INTAKE_SCAN_EVIDENCE.witnessId ||
    source.sourceTarget.candidateId !== FR103_NLC_INTAKE_SCAN_EVIDENCE.candidateId ||
    source.sourceTarget.passageId !== FR103_NLC_INTAKE_SCAN_EVIDENCE.passageId ||
    source.sourceTarget.chapter !== FR103_NLC_INTAKE_SCAN_EVIDENCE.chapter ||
    source.sourceTarget.sourceFilePageRef !== FR103_NLC_INTAKE_SCAN_EVIDENCE.sourceFilePageRef ||
    source.sourceTarget.pageCount !== FR103_NLC_INTAKE_SCAN_EVIDENCE.sourcePdfPageCount ||
    source.sourceTarget.fileSizeBytes !== FR103_NLC_INTAKE_SCAN_EVIDENCE.sourcePdfSizeBytes ||
    source.acquisitionResearchAuthorized !== true ||
    source.scanImageEvidenceReady !== false ||
    source.scanPageLocatorAuthorized !== false ||
    source.pageVerificationRecordAuthorized !== false ||
    source.passageScanCheckedPromotionAuthorized !== false ||
    source.criterionStatesIssued !== 0 ||
    source.claimsIssued !== 0 ||
    source.traditionalSemanticAuthority !== false
  ) {
    fail('FR-74 upstream source target or authority widened.');
  }
}

function validateEvidenceConstant(): void {
  const evidence = FR103_NLC_INTAKE_SCAN_EVIDENCE;
  if (
    evidence.provenanceSchemaVersion !== 'fr103-nlc-scan-acquisition-provenance-v1' ||
    evidence.provenancePath !== 'packages/face-reading/evidence/fr103/acquisition-provenance.json' ||
    evidence.sourcePdfSha256 !== 'sha256:94167d8d19d47525535b39e18a20c6b315a3a30751c2063bc2492760f1d927af' ||
    evidence.exactScanPage !== 88 ||
    evidence.targetPassagePrintedLeaf !== null ||
    evidence.visualPassageMatchConfirmed !== true ||
    evidence.visuallyMatchedText !== '口須要方大，唇紅端厚，角弓，開大合小，乃為出納官成。' ||
    evidence.evidenceAdmissionBasis !== 'immutable_repository_page_image_plus_interactive_visual_review' ||
    evidence.ocrUsedForEvidenceAdmission !== false ||
    evidence.searchIndexUsedForEvidenceAdmission !== false ||
    evidence.visualEvidenceRefs.length !== 2 ||
    evidence.checkerRefs.length !== 1
  ) {
    fail('immutable scan evidence contract drift.');
  }
}

export function admitFiveOfficerMouthScanEvidenceAcquisitionFR103(
  source: FiveOfficerMouthScanImageAcquisitionReadinessFR74V1,
): FiveOfficerMouthScanEvidenceAcquisitionFR103V1 {
  validateUpstream(source);
  validateEvidenceConstant();

  return Object.freeze({
    schemaVersion: 'fr103-five-officers-mouth-scan-evidence-acquisition-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'immutable_scan_evidence_complete_locator_authorized_registry_promotion_blocked' as const,
    upstream: Object.freeze({
      fr74SchemaVersion: source.schemaVersion,
      fr74AuthorityState: source.authorityState,
      acquisitionResearchAuthorized: source.acquisitionResearchAuthorized,
      scanImageEvidenceReady: source.scanImageEvidenceReady,
      scanPageLocatorAuthorized: source.scanPageLocatorAuthorized,
      pageVerificationRecordAuthorized: source.pageVerificationRecordAuthorized,
      passageScanCheckedPromotionAuthorized: source.passageScanCheckedPromotionAuthorized,
      criterionStatesIssued: source.criterionStatesIssued,
      claimsIssued: source.claimsIssued,
      traditionalSemanticAuthority: source.traditionalSemanticAuthority,
    }),
    evidence: FR103_NLC_INTAKE_SCAN_EVIDENCE,
    currentAcquisition: Object.freeze({
      immutablePageImageRef: FR103_NLC_INTAKE_SCAN_EVIDENCE.immutablePageImageRef,
      exactScanPage: 88 as const,
      targetPassagePrintedLeaf: null,
      visualPassageMatchConfirmed: true as const,
      visualEvidenceRefs: FR103_NLC_INTAKE_SCAN_EVIDENCE.visualEvidenceRefs,
      checkerRefs: FR103_NLC_INTAKE_SCAN_EVIDENCE.checkerRefs,
      evidenceBundleComplete: true as const,
      state: 'immutable_page_image_acquired_and_visually_matched' as const,
    }),
    acquisitionResearchAuthorized: true as const,
    scanImageEvidenceReady: true as const,
    scanPageLocatorAuthorized: true as const,
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
      acquiredImageMeansBaseRegistryInsertion: false as const,
      visualMatchMeansPageVerificationRecord: false as const,
      exactScanPageMeansScanCheckedPassage: false as const,
      singleCheckerMeansDoubleChecked: false as const,
      scanEvidenceMeansProductionMethodology: false as const,
      scanEvidenceMeansAutomaticCriterionState: false as const,
      scanEvidenceMeansTraditionalSemantics: false as const,
    }),
    remainingBlockers: REQUIRED_BLOCKERS,
    prohibitedShortcuts: REQUIRED_SHORTCUTS,
  });
}

export function validateFiveOfficerMouthScanEvidenceAcquisitionFR103(
  source: FiveOfficerMouthScanEvidenceAcquisitionFR103V1,
): FiveOfficerMouthScanEvidenceAcquisitionFR103V1 {
  validateEvidenceConstant();
  if (
    source.schemaVersion !== 'fr103-five-officers-mouth-scan-evidence-acquisition-v1' ||
    source.artifactVersion !== '0.1.0' ||
    source.authorityState !== 'immutable_scan_evidence_complete_locator_authorized_registry_promotion_blocked'
  ) {
    fail('schema or authority state drift.');
  }
  if (
    source.upstream.fr74SchemaVersion !== 'fr74-five-officers-mouth-scan-image-acquisition-readiness-v1' ||
    source.upstream.fr74AuthorityState !== 'scan_image_evidence_requirements_defined_acquisition_blocked' ||
    source.upstream.acquisitionResearchAuthorized !== true ||
    source.upstream.scanImageEvidenceReady !== false ||
    source.upstream.scanPageLocatorAuthorized !== false ||
    source.upstream.pageVerificationRecordAuthorized !== false ||
    source.upstream.passageScanCheckedPromotionAuthorized !== false ||
    source.upstream.criterionStatesIssued !== 0 ||
    source.upstream.claimsIssued !== 0 ||
    source.upstream.traditionalSemanticAuthority !== false
  ) {
    fail('FR-74 upstream authority widened.');
  }
  if (
    source.evidence !== FR103_NLC_INTAKE_SCAN_EVIDENCE ||
    source.currentAcquisition.immutablePageImageRef !== FR103_NLC_INTAKE_SCAN_EVIDENCE.immutablePageImageRef ||
    source.currentAcquisition.exactScanPage !== 88 ||
    source.currentAcquisition.targetPassagePrintedLeaf !== null ||
    source.currentAcquisition.visualPassageMatchConfirmed !== true ||
    !sameSequence(source.currentAcquisition.visualEvidenceRefs, FR103_NLC_INTAKE_SCAN_EVIDENCE.visualEvidenceRefs) ||
    !sameSequence(source.currentAcquisition.checkerRefs, FR103_NLC_INTAKE_SCAN_EVIDENCE.checkerRefs) ||
    source.currentAcquisition.evidenceBundleComplete !== true ||
    source.currentAcquisition.state !== 'immutable_page_image_acquired_and_visually_matched'
  ) {
    fail('scan acquisition evidence drift.');
  }
  if (
    source.acquisitionResearchAuthorized !== true ||
    source.scanImageEvidenceReady !== true ||
    source.scanPageLocatorAuthorized !== true ||
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

export function assertMouthPageVerificationRecordAuthorizedFR103(
  source: FiveOfficerMouthScanEvidenceAcquisitionFR103V1,
): never {
  validateFiveOfficerMouthScanEvidenceAcquisitionFR103(source);
  throw new FaceAuthorityValidationError(
    'FR-103 page-verification record is not authorized; immutable scan evidence is ready, but record admission requires a separate governance review.',
  );
}

export function assertMouthPassageScanCheckedPromotionAuthorizedFR103(
  source: FiveOfficerMouthScanEvidenceAcquisitionFR103V1,
): never {
  validateFiveOfficerMouthScanEvidenceAcquisitionFR103(source);
  throw new FaceAuthorityValidationError(
    'FR-103 scan_checked passage promotion is not authorized; evidence acquisition and locator authority do not mutate the direct-source registry.',
  );
}
