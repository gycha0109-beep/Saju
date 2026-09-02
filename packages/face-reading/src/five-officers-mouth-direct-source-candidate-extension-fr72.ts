import {
  FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0,
  validateDirectSourceVerificationRegistry,
  type DirectSourceVerificationRegistry,
  type DirectSourceWitnessCandidate,
} from './direct-source-verification.js';
import { FR70_INTAKE_CRITERION_IDS } from './five-officers-mouth-criterion-authority-gap-fr70.js';
import {
  validateFiveOfficerMouthSourceWitnessReadinessFR71,
  type FiveOfficerMouthSourceWitnessReadinessFR71V1,
} from './five-officers-mouth-source-witness-readiness-fr71.js';
import { FACE_RESEARCH_WITNESSES_V0 } from './research-pack-v0.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR72_NLC_1925_INTAKE_CANDIDATE = Object.freeze({
  candidateId: 'candidate.shenxiang_nlc_1925.intake',
  version: '0.1.0',
  workRef: 'work.shenxiang_quanbian',
  witnessId: 'witness.shenxiang_quanbian.nlc_1925',
  editionLabel: '文明書局 民國十四年本 — NLC scan',
  publicationYear: 1925,
  digitalSourceUrl: 'https://commons.wikimedia.org/wiki/File:NLC416-13jh001662-59167_神相全編.pdf',
  pageCount: 576,
  fileSizeBytes: 19_310_489,
  targetConceptRefs: Object.freeze([
    'method.shenxiang.five_officers@0.1.0',
    ...FR70_INTAKE_CRITERION_IDS,
  ]),
  targetChapterLabel: '卷二 / 五官說 / 出納官',
  state: 'witness_verified_passage_unlocated',
  mayPromoteOtherWitness: false,
} satisfies DirectSourceWitnessCandidate);

export interface FiveOfficerMouthDirectSourceCandidateExtensionFR72V1 {
  readonly schemaVersion: 'fr72-five-officers-mouth-direct-source-candidate-extension-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'verified_witness_locator_candidate_extension_only';
  readonly extensionMode: 'separate_contract_extension';
  readonly upstream: {
    readonly fr71SchemaVersion: 'fr71-five-officers-mouth-source-witness-readiness-v1';
    readonly fr71AuthorityState: 'verified_work_witness_available_passage_binding_blocked';
    readonly passageScanCheckedPromotionAuthorized: false;
    readonly criterionStatesIssued: 0;
    readonly claimsIssued: 0;
    readonly traditionalSemanticAuthority: false;
  };
  readonly baseRegistry: {
    readonly registryId: 'direct-source-verification.face.research_v0';
    readonly registryVersion: '0.1.0';
    readonly baseCandidateCount: 1;
    readonly basePageVerificationCount: 0;
    readonly baseRegistryMutated: false;
  };
  readonly candidate: typeof FR72_NLC_1925_INTAKE_CANDIDATE;
  readonly metadataEvidence: {
    readonly filePageRef: 'https://commons.wikimedia.org/wiki/File:NLC416-13jh001662-59167_神相全編.pdf';
    readonly observedPageCount: 576;
    readonly observedFileSizeBytes: 19310489;
    readonly checksumSha1: null;
    readonly evidenceState: 'single_external_metadata_observation';
  };
  readonly locatorState: {
    readonly passageId: 'passage.shenxiang.five_officers.intake';
    readonly chapter: '出納官';
    readonly exactScanPage: null;
    readonly printedPage: null;
    readonly visualEvidenceRefs: readonly [];
    readonly checkerRefs: readonly [];
    readonly pageVerificationState: null;
  };
  readonly candidateExtensionValidationPassed: true;
  readonly locatorResearchAuthorized: true;
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
    readonly candidateExtensionMeansBaseRegistryMutation: false;
    readonly exactFileMetadataMeansPassageLocated: false;
    readonly targetChapterLabelMeansScanPage: false;
    readonly verifiedWitnessMeansVisualPassageMatch: false;
    readonly candidateStateMeansPageVerification: false;
    readonly locatorResearchMeansScanChecked: false;
    readonly sourceCandidateMeansProductionMethodology: false;
    readonly sourceCandidateMeansAutomaticCriterionState: false;
    readonly sourceCandidateMeansTraditionalFormation: false;
  };
  readonly remainingBlockers: readonly [
    'intake_exact_scan_page_unlocated',
    'intake_visual_evidence_refs_absent',
    'intake_checker_refs_absent',
    'intake_page_verification_record_absent',
    'candidate_metadata_single_observation_only',
    'candidate_checksum_not_recorded',
    'base_registry_insertion_not_authorized',
    'five_officers_methodology_research_only',
    'fr70_downstream_geometry_metric_calibration_blockers_remain',
  ];
  readonly prohibitedShortcuts: readonly [
    'candidate_extension_to_base_registry_mutation',
    'file_metadata_to_passage_locator',
    'chapter_label_to_scan_page',
    'verified_witness_to_visual_passage_match',
    'witness_verified_passage_unlocated_to_scan_checked',
    'locator_research_to_page_verification',
    'source_candidate_to_production_methodology',
    'source_candidate_to_automatic_criterion_state',
    'source_candidate_to_traditional_formation',
  ];
}

const REQUIRED_BLOCKERS = Object.freeze([
  'intake_exact_scan_page_unlocated',
  'intake_visual_evidence_refs_absent',
  'intake_checker_refs_absent',
  'intake_page_verification_record_absent',
  'candidate_metadata_single_observation_only',
  'candidate_checksum_not_recorded',
  'base_registry_insertion_not_authorized',
  'five_officers_methodology_research_only',
  'fr70_downstream_geometry_metric_calibration_blockers_remain',
] as const);

const REQUIRED_SHORTCUTS = Object.freeze([
  'candidate_extension_to_base_registry_mutation',
  'file_metadata_to_passage_locator',
  'chapter_label_to_scan_page',
  'verified_witness_to_visual_passage_match',
  'witness_verified_passage_unlocated_to_scan_checked',
  'locator_research_to_page_verification',
  'source_candidate_to_production_methodology',
  'source_candidate_to_automatic_criterion_state',
  'source_candidate_to_traditional_formation',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-72 ${message}`);
}

function sameSequence<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function validateCandidate(candidate: DirectSourceWitnessCandidate): void {
  if (
    candidate.candidateId !== 'candidate.shenxiang_nlc_1925.intake' ||
    candidate.version !== '0.1.0' ||
    candidate.workRef !== 'work.shenxiang_quanbian' ||
    candidate.witnessId !== 'witness.shenxiang_quanbian.nlc_1925' ||
    candidate.editionLabel !== '文明書局 民國十四年本 — NLC scan' ||
    candidate.publicationYear !== 1925 ||
    candidate.digitalSourceUrl !== 'https://commons.wikimedia.org/wiki/File:NLC416-13jh001662-59167_神相全編.pdf' ||
    candidate.pageCount !== 576 ||
    candidate.fileSizeBytes !== 19_310_489 ||
    candidate.targetChapterLabel !== '卷二 / 五官說 / 出納官' ||
    candidate.state !== 'witness_verified_passage_unlocated' ||
    candidate.mayPromoteOtherWitness !== false
  ) {
    fail('candidate identity, file metadata, locator state, or authority drift.');
  }

  const expectedConceptRefs = [
    'method.shenxiang.five_officers@0.1.0',
    ...FR70_INTAKE_CRITERION_IDS,
  ];
  if (!sameSequence(candidate.targetConceptRefs, expectedConceptRefs)) {
    fail('candidate target concept refs drift.');
  }
  if (candidate.checksumSha1 !== undefined) {
    fail('checksum is not currently recorded; forged checksum authority is prohibited.');
  }
}

function validateCurrentInputs(): void {
  if (
    FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.registryId !== 'direct-source-verification.face.research_v0' ||
    FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.version !== '0.1.0' ||
    FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.candidates.length !== 1 ||
    FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.pageVerifications.length !== 0
  ) {
    fail('base direct-source registry drift; extension must be re-reviewed.');
  }
  if (
    FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.candidates.some(
      (candidate) => candidate.witnessId === 'witness.shenxiang_quanbian.nlc_1925',
    )
  ) {
    fail('NLC 1925 witness is now present in the base registry; separate extension must be re-reviewed.');
  }

  const witness = FACE_RESEARCH_WITNESSES_V0.find(
    (item) => item.witnessId === 'witness.shenxiang_quanbian.nlc_1925',
  );
  if (
    witness === undefined ||
    witness.workId !== 'work.shenxiang_quanbian' ||
    witness.editionLabel !== '文明書局 民國十四年本 — NLC scan' ||
    witness.publicationYear !== 1925 ||
    witness.digitalSourceUrl !== 'https://commons.wikimedia.org/wiki/File:NLC416-13jh001662-59167_神相全編.pdf' ||
    witness.witnessStatus !== 'verified'
  ) {
    fail('verified NLC witness registry authority drift.');
  }

  validateCandidate(FR72_NLC_1925_INTAKE_CANDIDATE);
  const extensionRegistry: DirectSourceVerificationRegistry = {
    registryId: 'direct-source-verification.face.fr72_extension',
    version: '0.1.0',
    candidates: [
      ...FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.candidates,
      FR72_NLC_1925_INTAKE_CANDIDATE,
    ],
    pageVerifications: FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.pageVerifications,
  };
  validateDirectSourceVerificationRegistry(extensionRegistry);
}

export function admitFiveOfficerMouthDirectSourceCandidateExtensionFR72(
  readiness: FiveOfficerMouthSourceWitnessReadinessFR71V1,
): FiveOfficerMouthDirectSourceCandidateExtensionFR72V1 {
  validateFiveOfficerMouthSourceWitnessReadinessFR71(readiness);
  validateCurrentInputs();

  return Object.freeze({
    schemaVersion: 'fr72-five-officers-mouth-direct-source-candidate-extension-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'verified_witness_locator_candidate_extension_only' as const,
    extensionMode: 'separate_contract_extension' as const,
    upstream: Object.freeze({
      fr71SchemaVersion: readiness.schemaVersion,
      fr71AuthorityState: readiness.authorityState,
      passageScanCheckedPromotionAuthorized: readiness.passageScanCheckedPromotionAuthorized,
      criterionStatesIssued: readiness.criterionStatesIssued,
      claimsIssued: readiness.claimsIssued,
      traditionalSemanticAuthority: readiness.traditionalSemanticAuthority,
    }),
    baseRegistry: Object.freeze({
      registryId: 'direct-source-verification.face.research_v0' as const,
      registryVersion: '0.1.0' as const,
      baseCandidateCount: 1 as const,
      basePageVerificationCount: 0 as const,
      baseRegistryMutated: false as const,
    }),
    candidate: FR72_NLC_1925_INTAKE_CANDIDATE,
    metadataEvidence: Object.freeze({
      filePageRef: 'https://commons.wikimedia.org/wiki/File:NLC416-13jh001662-59167_神相全編.pdf' as const,
      observedPageCount: 576 as const,
      observedFileSizeBytes: 19310489 as const,
      checksumSha1: null,
      evidenceState: 'single_external_metadata_observation' as const,
    }),
    locatorState: Object.freeze({
      passageId: 'passage.shenxiang.five_officers.intake' as const,
      chapter: '出納官' as const,
      exactScanPage: null,
      printedPage: null,
      visualEvidenceRefs: Object.freeze([]) as readonly [],
      checkerRefs: Object.freeze([]) as readonly [],
      pageVerificationState: null,
    }),
    candidateExtensionValidationPassed: true as const,
    locatorResearchAuthorized: true as const,
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
      candidateExtensionMeansBaseRegistryMutation: false as const,
      exactFileMetadataMeansPassageLocated: false as const,
      targetChapterLabelMeansScanPage: false as const,
      verifiedWitnessMeansVisualPassageMatch: false as const,
      candidateStateMeansPageVerification: false as const,
      locatorResearchMeansScanChecked: false as const,
      sourceCandidateMeansProductionMethodology: false as const,
      sourceCandidateMeansAutomaticCriterionState: false as const,
      sourceCandidateMeansTraditionalFormation: false as const,
    }),
    remainingBlockers: REQUIRED_BLOCKERS,
    prohibitedShortcuts: REQUIRED_SHORTCUTS,
  });
}

export function validateFiveOfficerMouthDirectSourceCandidateExtensionFR72(
  extension: FiveOfficerMouthDirectSourceCandidateExtensionFR72V1,
): FiveOfficerMouthDirectSourceCandidateExtensionFR72V1 {
  validateCurrentInputs();

  if (
    extension.schemaVersion !== 'fr72-five-officers-mouth-direct-source-candidate-extension-v1' ||
    extension.artifactVersion !== '0.1.0' ||
    extension.authorityState !== 'verified_witness_locator_candidate_extension_only' ||
    extension.extensionMode !== 'separate_contract_extension'
  ) {
    fail('schema, authority state, or extension mode drift.');
  }
  if (
    extension.upstream.fr71SchemaVersion !== 'fr71-five-officers-mouth-source-witness-readiness-v1' ||
    extension.upstream.fr71AuthorityState !== 'verified_work_witness_available_passage_binding_blocked' ||
    extension.upstream.passageScanCheckedPromotionAuthorized !== false ||
    extension.upstream.criterionStatesIssued !== 0 ||
    extension.upstream.claimsIssued !== 0 ||
    extension.upstream.traditionalSemanticAuthority !== false
  ) {
    fail('FR-71 upstream authority widened.');
  }
  if (
    extension.baseRegistry.registryId !== 'direct-source-verification.face.research_v0' ||
    extension.baseRegistry.registryVersion !== '0.1.0' ||
    extension.baseRegistry.baseCandidateCount !== 1 ||
    extension.baseRegistry.basePageVerificationCount !== 0 ||
    extension.baseRegistry.baseRegistryMutated !== false
  ) {
    fail('base registry authority widened or drifted.');
  }
  validateCandidate(extension.candidate);
  if (
    extension.metadataEvidence.filePageRef !== 'https://commons.wikimedia.org/wiki/File:NLC416-13jh001662-59167_神相全編.pdf' ||
    extension.metadataEvidence.observedPageCount !== 576 ||
    extension.metadataEvidence.observedFileSizeBytes !== 19310489 ||
    extension.metadataEvidence.checksumSha1 !== null ||
    extension.metadataEvidence.evidenceState !== 'single_external_metadata_observation'
  ) {
    fail('metadata evidence widened or drifted.');
  }
  if (
    extension.locatorState.passageId !== 'passage.shenxiang.five_officers.intake' ||
    extension.locatorState.chapter !== '出納官' ||
    extension.locatorState.exactScanPage !== null ||
    extension.locatorState.printedPage !== null ||
    extension.locatorState.visualEvidenceRefs.length !== 0 ||
    extension.locatorState.checkerRefs.length !== 0 ||
    extension.locatorState.pageVerificationState !== null
  ) {
    fail('passage locator or page-verification authority widened.');
  }
  if (
    extension.candidateExtensionValidationPassed !== true ||
    extension.locatorResearchAuthorized !== true ||
    extension.baseRegistryInsertionAuthorized !== false ||
    extension.pageVerificationAuthorized !== false ||
    extension.passageScanCheckedPromotionAuthorized !== false ||
    extension.methodologyProductionPromotionAuthorized !== false ||
    extension.automaticCriterionStateAuthority !== false ||
    extension.morphologyProduced !== false ||
    extension.criterionStatesIssued !== 0 ||
    extension.claimsIssued !== 0 ||
    extension.traditionalFormationAuthorized !== false ||
    extension.traditionalSemanticAuthority !== false
  ) {
    fail('candidate, page, methodology, criterion, morphology, claim, formation, or semantic authority widened.');
  }
  if (!Object.values(extension.authorityBoundary).every((value) => value === false)) {
    fail('authority boundary must remain fully fail-closed.');
  }
  if (!sameSequence(extension.remainingBlockers, REQUIRED_BLOCKERS)) {
    fail('remaining blockers drift.');
  }
  if (!sameSequence(extension.prohibitedShortcuts, REQUIRED_SHORTCUTS)) {
    fail('prohibited shortcuts drift.');
  }

  return extension;
}

export function assertMouthDirectSourcePageVerificationAuthorizedFR72(
  extension: FiveOfficerMouthDirectSourceCandidateExtensionFR72V1,
): never {
  validateFiveOfficerMouthDirectSourceCandidateExtensionFR72(extension);
  fail('page verification is not authorized until an exact scan page, visual evidence, and checker provenance are recorded.');
}
