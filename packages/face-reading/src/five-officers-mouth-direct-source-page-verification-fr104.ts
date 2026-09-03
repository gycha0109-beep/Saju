import type { SourcePassage } from './contracts.js';
import {
  FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0,
  materializeVerifiedSourcePassage,
  validateDirectSourceVerificationRegistry,
  type DirectSourcePageVerificationRecord,
  type DirectSourceVerificationRegistry,
  type DirectSourceWitnessCandidate,
} from './direct-source-verification.js';
import { FR72_NLC_1925_INTAKE_CANDIDATE } from './five-officers-mouth-direct-source-candidate-extension-fr72.js';
import {
  FR103_NLC_INTAKE_SCAN_EVIDENCE,
  validateFiveOfficerMouthScanEvidenceAcquisitionFR103,
  type FiveOfficerMouthScanEvidenceAcquisitionFR103V1,
} from './five-officers-mouth-scan-evidence-acquisition-fr103.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR104_NLC_1925_INTAKE_CANDIDATE = Object.freeze({
  ...FR72_NLC_1925_INTAKE_CANDIDATE,
  version: '0.2.0',
  state: 'scan_checked',
} satisfies DirectSourceWitnessCandidate);

export const FR104_NLC_INTAKE_PAGE_VERIFICATION = Object.freeze({
  verificationId: 'verification.shenxiang_nlc_1925.intake',
  version: '0.1.0',
  candidateRef: 'candidate.shenxiang_nlc_1925.intake@0.2.0',
  witnessId: 'witness.shenxiang_quanbian.nlc_1925',
  passageId: 'passage.shenxiang.five_officers.intake',
  chapter: '出納官',
  scanPage: 88,
  originalText: '口須要方大，唇紅端厚，角弓，開大合小，乃為出納官成。',
  visualEvidenceRefs: FR103_NLC_INTAKE_SCAN_EVIDENCE.visualEvidenceRefs,
  checkerRefs: FR103_NLC_INTAKE_SCAN_EVIDENCE.checkerRefs,
  state: 'scan_checked',
  mayPromoteOtherWitness: false,
} satisfies DirectSourcePageVerificationRecord);

export interface FiveOfficerMouthDirectSourcePageVerificationFR104V1 {
  readonly schemaVersion: 'fr104-five-officers-mouth-direct-source-page-verification-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'single_checker_scan_checked_passage_issued_in_governed_extension';
  readonly upstream: {
    readonly fr103SchemaVersion: 'fr103-five-officers-mouth-scan-evidence-acquisition-v1';
    readonly fr103AuthorityState: 'immutable_scan_evidence_complete_locator_authorized_registry_promotion_blocked';
    readonly scanImageEvidenceReady: true;
    readonly scanPageLocatorAuthorized: true;
    readonly baseRegistryInsertionAuthorized: false;
    readonly pageVerificationRecordAuthorized: false;
    readonly passageScanCheckedPromotionAuthorized: false;
    readonly criterionStatesIssued: 0;
    readonly claimsIssued: 0;
    readonly traditionalSemanticAuthority: false;
  };
  readonly registryExtension: {
    readonly registryId: 'direct-source-verification.face.fr104_extension';
    readonly registryVersion: '0.1.0';
    readonly extensionMode: 'separate_governed_registry_extension';
    readonly baseRegistryId: 'direct-source-verification.face.research_v0';
    readonly baseRegistryVersion: '0.1.0';
    readonly baseCandidateCount: 1;
    readonly basePageVerificationCount: 0;
    readonly extensionCandidateCount: 2;
    readonly extensionPageVerificationCount: 1;
    readonly candidateRef: 'candidate.shenxiang_nlc_1925.intake@0.2.0';
    readonly pageVerificationRef: 'verification.shenxiang_nlc_1925.intake@0.1.0';
    readonly baseRegistryMutated: false;
    readonly registryValidationPassed: true;
  };
  readonly candidate: typeof FR104_NLC_1925_INTAKE_CANDIDATE;
  readonly pageVerification: typeof FR104_NLC_INTAKE_PAGE_VERIFICATION;
  readonly materializedPassage: {
    readonly passageId: 'passage.shenxiang.five_officers.intake';
    readonly witnessId: 'witness.shenxiang_quanbian.nlc_1925';
    readonly chapter: '出納官';
    readonly scanPage: 88;
    readonly originalText: '口須要方大，唇紅端厚，角弓，開大合小，乃為出納官成。';
    readonly verificationStatus: 'scan_checked';
  };
  readonly extensionRegistryInsertionAuthorized: true;
  readonly baseRegistryInsertionAuthorized: false;
  readonly pageVerificationRecordAuthorized: true;
  readonly passageScanCheckedPromotionAuthorized: true;
  readonly doubleCheckedPromotionAuthorized: false;
  readonly verifiedSourcePassagesIssued: 1;
  readonly methodologyProductionPromotionAuthorized: false;
  readonly automaticCriterionStateAuthority: false;
  readonly morphologyProduced: false;
  readonly criterionStatesIssued: 0;
  readonly claimsIssued: 0;
  readonly traditionalFormationAuthorized: false;
  readonly traditionalSemanticAuthority: false;
  readonly authorityBoundary: {
    readonly governedExtensionMeansBaseRegistryMutation: false;
    readonly scanCheckedPassageMeansDoubleChecked: false;
    readonly singleCheckerMeansDoubleChecked: false;
    readonly scanCheckedPassageMeansProductionMethodology: false;
    readonly scanCheckedPassageMeansAutomaticCriterionState: false;
    readonly scanCheckedPassageMeansTraditionalFormation: false;
    readonly scanCheckedPassageMeansTraditionalSemantics: false;
    readonly pageVerificationMeansOtherWitnessPromotion: false;
  };
  readonly remainingBlockers: readonly [
    'base_registry_insertion_still_not_authorized',
    'intake_double_check_second_checker_absent',
    'five_officers_methodology_research_only',
    'fr70_downstream_geometry_metric_calibration_blockers_remain',
  ];
  readonly prohibitedShortcuts: readonly [
    'governed_extension_to_base_registry_mutation',
    'single_checker_scan_checked_to_double_checked',
    'scan_checked_source_to_production_methodology',
    'scan_checked_source_to_automatic_criterion_state',
    'scan_checked_source_to_traditional_formation',
    'scan_checked_source_to_traditional_semantics',
    'page_verification_to_other_witness_promotion',
  ];
}

const REQUIRED_BLOCKERS = Object.freeze([
  'base_registry_insertion_still_not_authorized',
  'intake_double_check_second_checker_absent',
  'five_officers_methodology_research_only',
  'fr70_downstream_geometry_metric_calibration_blockers_remain',
] as const);

const REQUIRED_SHORTCUTS = Object.freeze([
  'governed_extension_to_base_registry_mutation',
  'single_checker_scan_checked_to_double_checked',
  'scan_checked_source_to_production_methodology',
  'scan_checked_source_to_automatic_criterion_state',
  'scan_checked_source_to_traditional_formation',
  'scan_checked_source_to_traditional_semantics',
  'page_verification_to_other_witness_promotion',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-104 ${message}`);
}

function sameSequence<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function validateUpstream(source: FiveOfficerMouthScanEvidenceAcquisitionFR103V1): void {
  validateFiveOfficerMouthScanEvidenceAcquisitionFR103(source);
  if (
    source.schemaVersion !== 'fr103-five-officers-mouth-scan-evidence-acquisition-v1' ||
    source.authorityState !== 'immutable_scan_evidence_complete_locator_authorized_registry_promotion_blocked' ||
    source.scanImageEvidenceReady !== true ||
    source.scanPageLocatorAuthorized !== true ||
    source.baseRegistryInsertionAuthorized !== false ||
    source.pageVerificationRecordAuthorized !== false ||
    source.passageScanCheckedPromotionAuthorized !== false ||
    source.criterionStatesIssued !== 0 ||
    source.claimsIssued !== 0 ||
    source.traditionalSemanticAuthority !== false
  ) fail('FR-103 upstream evidence or authority drift.');
}

function validateCurrentBaseRegistry(): void {
  validateDirectSourceVerificationRegistry(FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0);
  if (
    FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.registryId !== 'direct-source-verification.face.research_v0' ||
    FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.version !== '0.1.0' ||
    FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.candidates.length !== 1 ||
    FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.pageVerifications.length !== 0 ||
    FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.candidates.some(
      (candidate) => candidate.witnessId === FR104_NLC_1925_INTAKE_CANDIDATE.witnessId,
    )
  ) fail('base direct-source registry drift; FR-104 separate extension must be re-reviewed.');
}

function validateAdmissionConstants(): void {
  const candidate = FR104_NLC_1925_INTAKE_CANDIDATE;
  const record = FR104_NLC_INTAKE_PAGE_VERIFICATION;
  if (
    candidate.candidateId !== FR103_NLC_INTAKE_SCAN_EVIDENCE.candidateId ||
    candidate.version !== '0.2.0' ||
    candidate.witnessId !== FR103_NLC_INTAKE_SCAN_EVIDENCE.witnessId ||
    candidate.digitalSourceUrl !== FR103_NLC_INTAKE_SCAN_EVIDENCE.sourceFilePageRef ||
    candidate.pageCount !== FR103_NLC_INTAKE_SCAN_EVIDENCE.sourcePdfPageCount ||
    candidate.fileSizeBytes !== FR103_NLC_INTAKE_SCAN_EVIDENCE.sourcePdfSizeBytes ||
    candidate.state !== 'scan_checked' ||
    candidate.mayPromoteOtherWitness !== false ||
    'checksumSha1' in candidate
  ) fail('NLC intake candidate transition drift.');

  if (
    record.verificationId !== 'verification.shenxiang_nlc_1925.intake' ||
    record.version !== '0.1.0' ||
    record.candidateRef !== 'candidate.shenxiang_nlc_1925.intake@0.2.0' ||
    record.witnessId !== FR103_NLC_INTAKE_SCAN_EVIDENCE.witnessId ||
    record.passageId !== FR103_NLC_INTAKE_SCAN_EVIDENCE.passageId ||
    record.chapter !== FR103_NLC_INTAKE_SCAN_EVIDENCE.chapter ||
    record.scanPage !== FR103_NLC_INTAKE_SCAN_EVIDENCE.exactScanPage ||
    record.originalText !== FR103_NLC_INTAKE_SCAN_EVIDENCE.visuallyMatchedText ||
    !sameSequence(record.visualEvidenceRefs, FR103_NLC_INTAKE_SCAN_EVIDENCE.visualEvidenceRefs) ||
    !sameSequence(record.checkerRefs, FR103_NLC_INTAKE_SCAN_EVIDENCE.checkerRefs) ||
    record.checkerRefs.length !== 1 ||
    record.state !== 'scan_checked' ||
    record.mayPromoteOtherWitness !== false ||
    'printedPage' in record
  ) fail('NLC intake page-verification record drift.');
}

function buildRegistryExtension(): DirectSourceVerificationRegistry {
  validateCurrentBaseRegistry();
  validateAdmissionConstants();
  const registry: DirectSourceVerificationRegistry = {
    registryId: 'direct-source-verification.face.fr104_extension',
    version: '0.1.0',
    candidates: [...FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.candidates, FR104_NLC_1925_INTAKE_CANDIDATE],
    pageVerifications: [...FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.pageVerifications, FR104_NLC_INTAKE_PAGE_VERIFICATION],
  };
  validateDirectSourceVerificationRegistry(registry);
  return registry;
}

function validateMaterializedPassage(passage: SourcePassage): void {
  if (
    passage.passageId !== FR103_NLC_INTAKE_SCAN_EVIDENCE.passageId ||
    passage.witnessId !== FR103_NLC_INTAKE_SCAN_EVIDENCE.witnessId ||
    passage.chapter !== FR103_NLC_INTAKE_SCAN_EVIDENCE.chapter ||
    passage.scanPage !== FR103_NLC_INTAKE_SCAN_EVIDENCE.exactScanPage ||
    passage.originalText !== FR103_NLC_INTAKE_SCAN_EVIDENCE.visuallyMatchedText ||
    passage.verificationStatus !== 'scan_checked' ||
    passage.printedPage !== undefined
  ) fail('materialized scan-checked source passage drift.');
}

export function admitFiveOfficerMouthDirectSourcePageVerificationFR104(
  source: FiveOfficerMouthScanEvidenceAcquisitionFR103V1,
): FiveOfficerMouthDirectSourcePageVerificationFR104V1 {
  validateUpstream(source);
  const registry = buildRegistryExtension();
  const materializedPassage = materializeVerifiedSourcePassage(FR104_NLC_INTAKE_PAGE_VERIFICATION, registry);
  validateMaterializedPassage(materializedPassage);

  return Object.freeze({
    schemaVersion: 'fr104-five-officers-mouth-direct-source-page-verification-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'single_checker_scan_checked_passage_issued_in_governed_extension' as const,
    upstream: Object.freeze({
      fr103SchemaVersion: source.schemaVersion,
      fr103AuthorityState: source.authorityState,
      scanImageEvidenceReady: source.scanImageEvidenceReady,
      scanPageLocatorAuthorized: source.scanPageLocatorAuthorized,
      baseRegistryInsertionAuthorized: source.baseRegistryInsertionAuthorized,
      pageVerificationRecordAuthorized: source.pageVerificationRecordAuthorized,
      passageScanCheckedPromotionAuthorized: source.passageScanCheckedPromotionAuthorized,
      criterionStatesIssued: source.criterionStatesIssued,
      claimsIssued: source.claimsIssued,
      traditionalSemanticAuthority: source.traditionalSemanticAuthority,
    }),
    registryExtension: Object.freeze({
      registryId: 'direct-source-verification.face.fr104_extension' as const,
      registryVersion: '0.1.0' as const,
      extensionMode: 'separate_governed_registry_extension' as const,
      baseRegistryId: 'direct-source-verification.face.research_v0' as const,
      baseRegistryVersion: '0.1.0' as const,
      baseCandidateCount: 1 as const,
      basePageVerificationCount: 0 as const,
      extensionCandidateCount: 2 as const,
      extensionPageVerificationCount: 1 as const,
      candidateRef: 'candidate.shenxiang_nlc_1925.intake@0.2.0' as const,
      pageVerificationRef: 'verification.shenxiang_nlc_1925.intake@0.1.0' as const,
      baseRegistryMutated: false as const,
      registryValidationPassed: true as const,
    }),
    candidate: FR104_NLC_1925_INTAKE_CANDIDATE,
    pageVerification: FR104_NLC_INTAKE_PAGE_VERIFICATION,
    materializedPassage: Object.freeze({
      passageId: 'passage.shenxiang.five_officers.intake' as const,
      witnessId: 'witness.shenxiang_quanbian.nlc_1925' as const,
      chapter: '出納官' as const,
      scanPage: 88 as const,
      originalText: '口須要方大，唇紅端厚，角弓，開大合小，乃為出納官成。' as const,
      verificationStatus: 'scan_checked' as const,
    }),
    extensionRegistryInsertionAuthorized: true as const,
    baseRegistryInsertionAuthorized: false as const,
    pageVerificationRecordAuthorized: true as const,
    passageScanCheckedPromotionAuthorized: true as const,
    doubleCheckedPromotionAuthorized: false as const,
    verifiedSourcePassagesIssued: 1 as const,
    methodologyProductionPromotionAuthorized: false as const,
    automaticCriterionStateAuthority: false as const,
    morphologyProduced: false as const,
    criterionStatesIssued: 0 as const,
    claimsIssued: 0 as const,
    traditionalFormationAuthorized: false as const,
    traditionalSemanticAuthority: false as const,
    authorityBoundary: Object.freeze({
      governedExtensionMeansBaseRegistryMutation: false as const,
      scanCheckedPassageMeansDoubleChecked: false as const,
      singleCheckerMeansDoubleChecked: false as const,
      scanCheckedPassageMeansProductionMethodology: false as const,
      scanCheckedPassageMeansAutomaticCriterionState: false as const,
      scanCheckedPassageMeansTraditionalFormation: false as const,
      scanCheckedPassageMeansTraditionalSemantics: false as const,
      pageVerificationMeansOtherWitnessPromotion: false as const,
    }),
    remainingBlockers: REQUIRED_BLOCKERS,
    prohibitedShortcuts: REQUIRED_SHORTCUTS,
  });
}

export function validateFiveOfficerMouthDirectSourcePageVerificationFR104(
  source: FiveOfficerMouthDirectSourcePageVerificationFR104V1,
): FiveOfficerMouthDirectSourcePageVerificationFR104V1 {
  const registry = buildRegistryExtension();
  validateMaterializedPassage(materializeVerifiedSourcePassage(FR104_NLC_INTAKE_PAGE_VERIFICATION, registry));

  if (
    source.schemaVersion !== 'fr104-five-officers-mouth-direct-source-page-verification-v1' ||
    source.artifactVersion !== '0.1.0' ||
    source.authorityState !== 'single_checker_scan_checked_passage_issued_in_governed_extension'
  ) fail('schema or authority state drift.');

  if (
    source.upstream.fr103SchemaVersion !== 'fr103-five-officers-mouth-scan-evidence-acquisition-v1' ||
    source.upstream.fr103AuthorityState !== 'immutable_scan_evidence_complete_locator_authorized_registry_promotion_blocked' ||
    source.upstream.scanImageEvidenceReady !== true ||
    source.upstream.scanPageLocatorAuthorized !== true ||
    source.upstream.baseRegistryInsertionAuthorized !== false ||
    source.upstream.pageVerificationRecordAuthorized !== false ||
    source.upstream.passageScanCheckedPromotionAuthorized !== false ||
    source.upstream.criterionStatesIssued !== 0 ||
    source.upstream.claimsIssued !== 0 ||
    source.upstream.traditionalSemanticAuthority !== false
  ) fail('FR-103 upstream authority drift.');

  const extension = source.registryExtension;
  if (
    extension.registryId !== 'direct-source-verification.face.fr104_extension' ||
    extension.registryVersion !== '0.1.0' ||
    extension.extensionMode !== 'separate_governed_registry_extension' ||
    extension.baseRegistryId !== 'direct-source-verification.face.research_v0' ||
    extension.baseRegistryVersion !== '0.1.0' ||
    extension.baseCandidateCount !== 1 ||
    extension.basePageVerificationCount !== 0 ||
    extension.extensionCandidateCount !== 2 ||
    extension.extensionPageVerificationCount !== 1 ||
    extension.candidateRef !== 'candidate.shenxiang_nlc_1925.intake@0.2.0' ||
    extension.pageVerificationRef !== 'verification.shenxiang_nlc_1925.intake@0.1.0' ||
    extension.baseRegistryMutated !== false ||
    extension.registryValidationPassed !== true
  ) fail('registry extension drift.');

  if (source.candidate !== FR104_NLC_1925_INTAKE_CANDIDATE || source.pageVerification !== FR104_NLC_INTAKE_PAGE_VERIFICATION) {
    fail('issued candidate or page-verification identity drift.');
  }
  validateMaterializedPassage(source.materializedPassage);

  if (
    source.extensionRegistryInsertionAuthorized !== true ||
    source.baseRegistryInsertionAuthorized !== false ||
    source.pageVerificationRecordAuthorized !== true ||
    source.passageScanCheckedPromotionAuthorized !== true ||
    source.doubleCheckedPromotionAuthorized !== false ||
    source.verifiedSourcePassagesIssued !== 1 ||
    source.methodologyProductionPromotionAuthorized !== false ||
    source.automaticCriterionStateAuthority !== false ||
    source.morphologyProduced !== false ||
    source.criterionStatesIssued !== 0 ||
    source.claimsIssued !== 0 ||
    source.traditionalFormationAuthorized !== false ||
    source.traditionalSemanticAuthority !== false
  ) fail('authority drift.');

  if (!Object.values(source.authorityBoundary).every((value) => value === false)) {
    fail('authority boundary must remain fully fail-closed.');
  }
  if (!sameSequence(source.remainingBlockers, REQUIRED_BLOCKERS)) fail('remaining blockers drift.');
  if (!sameSequence(source.prohibitedShortcuts, REQUIRED_SHORTCUTS)) fail('prohibited shortcuts drift.');
  return source;
}

export function assertIssuedMouthScanCheckedPassageFR104(
  source: FiveOfficerMouthDirectSourcePageVerificationFR104V1,
): FiveOfficerMouthDirectSourcePageVerificationFR104V1['materializedPassage'] {
  validateFiveOfficerMouthDirectSourcePageVerificationFR104(source);
  return source.materializedPassage;
}

export function assertMouthBaseRegistryInsertionAuthorizedFR104(
  source: FiveOfficerMouthDirectSourcePageVerificationFR104V1,
): never {
  validateFiveOfficerMouthDirectSourcePageVerificationFR104(source);
  throw new FaceAuthorityValidationError(
    'FR-104 base registry insertion is not authorized; the scan-checked record exists only in the separate governed FR104 extension.',
  );
}

export function assertMouthDoubleCheckedPromotionAuthorizedFR104(
  source: FiveOfficerMouthDirectSourcePageVerificationFR104V1,
): never {
  validateFiveOfficerMouthDirectSourcePageVerificationFR104(source);
  throw new FaceAuthorityValidationError(
    'FR-104 double_checked promotion is not authorized; exactly one reviewed checker ref supports scan_checked only.',
  );
}
