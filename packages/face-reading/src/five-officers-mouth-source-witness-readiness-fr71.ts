import {
  FACE_FR3_METHOD_REFS_V0,
  FACE_FR3_METHODOLOGIES_V0,
  FACE_FR3_PASSAGES_V0,
} from './five-officers-six-fus-research-v0.js';
import {
  FACE_RESEARCH_WITNESSES_V0,
} from './research-pack-v0.js';
import {
  FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0,
  validateDirectSourceVerificationRegistry,
} from './direct-source-verification.js';
import { FACE_SOURCE_CORROBORATION_RESEARCH_V0 } from './source-corroboration.js';
import {
  validateFiveOfficerMouthCriterionAuthorityGapFR70,
  type FiveOfficerMouthCriterionAuthorityGapFR70V1,
} from './five-officers-mouth-criterion-authority-gap-fr70.js';
import { FaceAuthorityValidationError } from './validation.js';

export interface FiveOfficerMouthSourceWitnessReadinessFR71V1 {
  readonly schemaVersion: 'fr71-five-officers-mouth-source-witness-readiness-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'verified_work_witness_available_passage_binding_blocked';
  readonly upstream: {
    readonly fr70SchemaVersion: 'fr70-five-officers-mouth-criterion-authority-gap-v1';
    readonly fr70AuthorityState: 'research_source_and_static_candidate_authority_only';
    readonly criterionStatesIssued: 0;
    readonly claimsIssued: 0;
    readonly traditionalFormationAuthorized: false;
    readonly traditionalSemanticAuthority: false;
  };
  readonly electronicPassage: {
    readonly passageId: 'passage.shenxiang.five_officers.intake';
    readonly workId: 'work.shenxiang_quanbian';
    readonly witnessId: 'witness.shenxiang_quanbian.ctext';
    readonly witnessStatus: 'candidate';
    readonly chapter: '出納官';
    readonly originalText: '口須要方大，唇紅端厚，角弓，開大合小，乃為出納官成。';
    readonly verificationStatus: 'unverified_ocr';
  };
  readonly verifiedScanWitness: {
    readonly witnessId: 'witness.shenxiang_quanbian.nlc_1925';
    readonly workId: 'work.shenxiang_quanbian';
    readonly editionLabel: '文明書局 民國十四年本 — NLC scan';
    readonly publicationYear: 1925;
    readonly holdingInstitution: 'National Library of China';
    readonly digitalSourceUrl: 'https://commons.wikimedia.org/wiki/File:NLC416-13jh001662-59167_神相全編.pdf';
    readonly witnessStatus: 'verified';
  };
  readonly directVerification: {
    readonly registryId: 'direct-source-verification.face.research_v0';
    readonly registryVersion: '0.1.0';
    readonly intakeTargetCandidateCount: 0;
    readonly intakePageVerificationCount: 0;
    readonly verifiedNlcWitnessRegisteredAsIntakeCandidate: false;
    readonly scanPage: null;
    readonly visualEvidenceRefs: readonly [];
    readonly checkerRefs: readonly [];
    readonly pageVerificationState: null;
  };
  readonly corroboration: {
    readonly intakeEntryCount: 0;
    readonly mayPromoteDirectSource: false;
  };
  readonly methodology: {
    readonly methodologyRef: 'method.shenxiang.five_officers@0.1.0';
    readonly reviewStatus: 'research';
    readonly productionPromotionAuthorized: false;
  };
  readonly passageScanCheckedPromotionAuthorized: false;
  readonly automaticCriterionStateAuthority: false;
  readonly morphologyProduced: false;
  readonly criterionStatesIssued: 0;
  readonly claimsIssued: 0;
  readonly traditionalFormationAuthorized: false;
  readonly traditionalSemanticAuthority: false;
  readonly authorityBoundary: {
    readonly verifiedWorkWitnessMeansPassageScanChecked: false;
    readonly scanUrlMeansPassageLocated: false;
    readonly chapterLabelMeansScanPage: false;
    readonly ctextTranscriptionMeansVisualVerification: false;
    readonly verifiedWitnessAvailabilityMeansDirectBinding: false;
    readonly corroborationMeansDirectVerification: false;
    readonly sourceVerificationMeansProductionMethodology: false;
    readonly sourceVerificationMeansAutomaticCriterionState: false;
    readonly staticV1EligibleMeansSourceAuthority: false;
  };
  readonly remainingBlockers: readonly [
    'intake_passage_bound_to_candidate_ctext',
    'verified_nlc_work_witness_not_bound_to_intake_passage',
    'intake_direct_source_candidate_absent',
    'intake_direct_page_verification_absent',
    'intake_scan_page_not_recorded',
    'intake_visual_evidence_refs_absent',
    'intake_checker_refs_absent',
    'five_officers_methodology_research_only',
    'fr70_downstream_authority_remains_blocked',
  ];
  readonly prohibitedShortcuts: readonly [
    'verified_work_witness_to_scan_checked_passage',
    'scan_url_to_passage_verification',
    'chapter_title_to_scan_locator',
    'ctext_transcription_to_visual_scan_check',
    'verified_witness_to_direct_source_binding',
    'corroboration_to_direct_source_verification',
    'source_verification_to_production_methodology',
    'source_verification_to_automatic_criterion_state',
    'static_v1_eligible_to_source_authority',
  ];
}

const REQUIRED_BLOCKERS = Object.freeze([
  'intake_passage_bound_to_candidate_ctext',
  'verified_nlc_work_witness_not_bound_to_intake_passage',
  'intake_direct_source_candidate_absent',
  'intake_direct_page_verification_absent',
  'intake_scan_page_not_recorded',
  'intake_visual_evidence_refs_absent',
  'intake_checker_refs_absent',
  'five_officers_methodology_research_only',
  'fr70_downstream_authority_remains_blocked',
] as const);

const REQUIRED_SHORTCUTS = Object.freeze([
  'verified_work_witness_to_scan_checked_passage',
  'scan_url_to_passage_verification',
  'chapter_title_to_scan_locator',
  'ctext_transcription_to_visual_scan_check',
  'verified_witness_to_direct_source_binding',
  'corroboration_to_direct_source_verification',
  'source_verification_to_production_methodology',
  'source_verification_to_automatic_criterion_state',
  'static_v1_eligible_to_source_authority',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-71 ${message}`);
}

function sameSequence<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function isIntakeTargetCandidate(candidate: (typeof FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.candidates)[number]): boolean {
  return candidate.targetChapterLabel.includes('出納官') ||
    candidate.targetConceptRefs.some((ref) => ref.startsWith('criterion.intake.'));
}

function validateCurrentSourceAuthorityInputs(): void {
  const intakePassage = FACE_FR3_PASSAGES_V0.find(
    (item) => item.passageId === 'passage.shenxiang.five_officers.intake',
  );
  if (
    intakePassage === undefined ||
    intakePassage.witnessId !== 'witness.shenxiang_quanbian.ctext' ||
    intakePassage.chapter !== '出納官' ||
    intakePassage.originalText !== '口須要方大，唇紅端厚，角弓，開大合小，乃為出納官成。' ||
    intakePassage.verificationStatus !== 'unverified_ocr' ||
    'scanPage' in intakePassage ||
    'printedPage' in intakePassage
  ) {
    fail('intake electronic passage authority drift; passage-level source verification must be re-reviewed.');
  }

  const ctextWitness = FACE_RESEARCH_WITNESSES_V0.find(
    (item) => item.witnessId === 'witness.shenxiang_quanbian.ctext',
  );
  if (
    ctextWitness === undefined ||
    ctextWitness.workId !== 'work.shenxiang_quanbian' ||
    ctextWitness.witnessStatus !== 'candidate'
  ) {
    fail('ctext witness authority drift.');
  }

  const nlcWitness = FACE_RESEARCH_WITNESSES_V0.find(
    (item) => item.witnessId === 'witness.shenxiang_quanbian.nlc_1925',
  );
  if (
    nlcWitness === undefined ||
    nlcWitness.workId !== 'work.shenxiang_quanbian' ||
    nlcWitness.editionLabel !== '文明書局 民國十四年本 — NLC scan' ||
    nlcWitness.publicationYear !== 1925 ||
    nlcWitness.holdingInstitution !== 'National Library of China' ||
    nlcWitness.digitalSourceUrl !== 'https://commons.wikimedia.org/wiki/File:NLC416-13jh001662-59167_神相全編.pdf' ||
    nlcWitness.witnessStatus !== 'verified'
  ) {
    fail('verified NLC witness authority drift.');
  }

  const methodology = FACE_FR3_METHODOLOGIES_V0.find(
    (item) => `${item.methodologyId}@${item.version}` === FACE_FR3_METHOD_REFS_V0.shenxiangFiveOfficers,
  );
  if (
    methodology === undefined ||
    methodology.reviewStatus !== 'research' ||
    !methodology.sourceRefs.some((sourceRef) => sourceRef === 'passage.shenxiang.five_officers.intake')
  ) {
    fail('Five Officers methodology authority drift.');
  }

  validateDirectSourceVerificationRegistry(FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0);
  if (
    FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.registryId !== 'direct-source-verification.face.research_v0' ||
    FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.version !== '0.1.0'
  ) {
    fail('direct-source verification registry identity drift.');
  }

  const intakeCandidates = FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.candidates.filter(isIntakeTargetCandidate);
  const intakePageVerifications = FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.pageVerifications.filter(
    (record) => record.passageId === 'passage.shenxiang.five_officers.intake',
  );
  if (intakeCandidates.length !== 0 || intakePageVerifications.length !== 0) {
    fail('passage-specific direct-source evidence now exists; FR-71 readiness gap must be re-reviewed.');
  }

  const nlcDirectCandidates = FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.candidates.filter(
    (candidate) => candidate.witnessId === 'witness.shenxiang_quanbian.nlc_1925',
  );
  if (nlcDirectCandidates.length !== 0) {
    fail('verified NLC witness is now registered in direct-source verification; FR-71 must be re-reviewed.');
  }

  const intakeCorroborations = FACE_SOURCE_CORROBORATION_RESEARCH_V0.entries.filter(
    (entry) => entry.targetPassageRef === 'passage.shenxiang.five_officers.intake',
  );
  if (intakeCorroborations.length !== 0) {
    fail('intake corroboration inventory changed; FR-71 must be re-reviewed.');
  }
}

function validateUpstream(gap: FiveOfficerMouthCriterionAuthorityGapFR70V1): void {
  validateFiveOfficerMouthCriterionAuthorityGapFR70(gap);
  if (
    gap.traditionalSource.passageId !== 'passage.shenxiang.five_officers.intake' ||
    gap.traditionalSource.verificationStatus !== 'unverified_ocr' ||
    gap.traditionalSource.methodologyRef !== 'method.shenxiang.five_officers@0.1.0' ||
    gap.traditionalSource.methodologyReviewStatus !== 'research' ||
    gap.criterionStatesIssued !== 0 ||
    gap.claimsIssued !== 0 ||
    gap.traditionalFormationAuthorized !== false ||
    gap.traditionalSemanticAuthority !== false
  ) {
    fail('cannot consume widened FR-70 source, criterion, claim, formation, or semantic authority.');
  }
}

export function admitFiveOfficerMouthSourceWitnessReadinessFR71(
  gap: FiveOfficerMouthCriterionAuthorityGapFR70V1,
): FiveOfficerMouthSourceWitnessReadinessFR71V1 {
  validateUpstream(gap);
  validateCurrentSourceAuthorityInputs();

  return Object.freeze({
    schemaVersion: 'fr71-five-officers-mouth-source-witness-readiness-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'verified_work_witness_available_passage_binding_blocked' as const,
    upstream: Object.freeze({
      fr70SchemaVersion: gap.schemaVersion,
      fr70AuthorityState: gap.authorityState,
      criterionStatesIssued: gap.criterionStatesIssued,
      claimsIssued: gap.claimsIssued,
      traditionalFormationAuthorized: gap.traditionalFormationAuthorized,
      traditionalSemanticAuthority: gap.traditionalSemanticAuthority,
    }),
    electronicPassage: Object.freeze({
      passageId: 'passage.shenxiang.five_officers.intake' as const,
      workId: 'work.shenxiang_quanbian' as const,
      witnessId: 'witness.shenxiang_quanbian.ctext' as const,
      witnessStatus: 'candidate' as const,
      chapter: '出納官' as const,
      originalText: '口須要方大，唇紅端厚，角弓，開大合小，乃為出納官成。' as const,
      verificationStatus: 'unverified_ocr' as const,
    }),
    verifiedScanWitness: Object.freeze({
      witnessId: 'witness.shenxiang_quanbian.nlc_1925' as const,
      workId: 'work.shenxiang_quanbian' as const,
      editionLabel: '文明書局 民國十四年本 — NLC scan' as const,
      publicationYear: 1925 as const,
      holdingInstitution: 'National Library of China' as const,
      digitalSourceUrl: 'https://commons.wikimedia.org/wiki/File:NLC416-13jh001662-59167_神相全編.pdf' as const,
      witnessStatus: 'verified' as const,
    }),
    directVerification: Object.freeze({
      registryId: 'direct-source-verification.face.research_v0' as const,
      registryVersion: '0.1.0' as const,
      intakeTargetCandidateCount: 0 as const,
      intakePageVerificationCount: 0 as const,
      verifiedNlcWitnessRegisteredAsIntakeCandidate: false as const,
      scanPage: null,
      visualEvidenceRefs: Object.freeze([]) as readonly [],
      checkerRefs: Object.freeze([]) as readonly [],
      pageVerificationState: null,
    }),
    corroboration: Object.freeze({
      intakeEntryCount: 0 as const,
      mayPromoteDirectSource: false as const,
    }),
    methodology: Object.freeze({
      methodologyRef: FACE_FR3_METHOD_REFS_V0.shenxiangFiveOfficers,
      reviewStatus: 'research' as const,
      productionPromotionAuthorized: false as const,
    }),
    passageScanCheckedPromotionAuthorized: false as const,
    automaticCriterionStateAuthority: false as const,
    morphologyProduced: false as const,
    criterionStatesIssued: 0 as const,
    claimsIssued: 0 as const,
    traditionalFormationAuthorized: false as const,
    traditionalSemanticAuthority: false as const,
    authorityBoundary: Object.freeze({
      verifiedWorkWitnessMeansPassageScanChecked: false as const,
      scanUrlMeansPassageLocated: false as const,
      chapterLabelMeansScanPage: false as const,
      ctextTranscriptionMeansVisualVerification: false as const,
      verifiedWitnessAvailabilityMeansDirectBinding: false as const,
      corroborationMeansDirectVerification: false as const,
      sourceVerificationMeansProductionMethodology: false as const,
      sourceVerificationMeansAutomaticCriterionState: false as const,
      staticV1EligibleMeansSourceAuthority: false as const,
    }),
    remainingBlockers: REQUIRED_BLOCKERS,
    prohibitedShortcuts: REQUIRED_SHORTCUTS,
  });
}

export function validateFiveOfficerMouthSourceWitnessReadinessFR71(
  readiness: FiveOfficerMouthSourceWitnessReadinessFR71V1,
): FiveOfficerMouthSourceWitnessReadinessFR71V1 {
  validateCurrentSourceAuthorityInputs();

  if (
    readiness.schemaVersion !== 'fr71-five-officers-mouth-source-witness-readiness-v1' ||
    readiness.artifactVersion !== '0.1.0' ||
    readiness.authorityState !== 'verified_work_witness_available_passage_binding_blocked'
  ) {
    fail('schema or authority-state drift.');
  }

  if (
    readiness.upstream.fr70SchemaVersion !== 'fr70-five-officers-mouth-criterion-authority-gap-v1' ||
    readiness.upstream.fr70AuthorityState !== 'research_source_and_static_candidate_authority_only' ||
    readiness.upstream.criterionStatesIssued !== 0 ||
    readiness.upstream.claimsIssued !== 0 ||
    readiness.upstream.traditionalFormationAuthorized !== false ||
    readiness.upstream.traditionalSemanticAuthority !== false
  ) {
    fail('FR-70 upstream authority widened.');
  }

  if (
    readiness.electronicPassage.passageId !== 'passage.shenxiang.five_officers.intake' ||
    readiness.electronicPassage.workId !== 'work.shenxiang_quanbian' ||
    readiness.electronicPassage.witnessId !== 'witness.shenxiang_quanbian.ctext' ||
    readiness.electronicPassage.witnessStatus !== 'candidate' ||
    readiness.electronicPassage.chapter !== '出納官' ||
    readiness.electronicPassage.originalText !== '口須要方大，唇紅端厚，角弓，開大合小，乃為出納官成。' ||
    readiness.electronicPassage.verificationStatus !== 'unverified_ocr'
  ) {
    fail('electronic passage authority widened or drifted.');
  }

  if (
    readiness.verifiedScanWitness.witnessId !== 'witness.shenxiang_quanbian.nlc_1925' ||
    readiness.verifiedScanWitness.workId !== 'work.shenxiang_quanbian' ||
    readiness.verifiedScanWitness.editionLabel !== '文明書局 民國十四年本 — NLC scan' ||
    readiness.verifiedScanWitness.publicationYear !== 1925 ||
    readiness.verifiedScanWitness.holdingInstitution !== 'National Library of China' ||
    readiness.verifiedScanWitness.digitalSourceUrl !== 'https://commons.wikimedia.org/wiki/File:NLC416-13jh001662-59167_神相全編.pdf' ||
    readiness.verifiedScanWitness.witnessStatus !== 'verified'
  ) {
    fail('verified scan witness identity drift.');
  }

  if (
    readiness.directVerification.registryId !== 'direct-source-verification.face.research_v0' ||
    readiness.directVerification.registryVersion !== '0.1.0' ||
    readiness.directVerification.intakeTargetCandidateCount !== 0 ||
    readiness.directVerification.intakePageVerificationCount !== 0 ||
    readiness.directVerification.verifiedNlcWitnessRegisteredAsIntakeCandidate !== false ||
    readiness.directVerification.scanPage !== null ||
    readiness.directVerification.visualEvidenceRefs.length !== 0 ||
    readiness.directVerification.checkerRefs.length !== 0 ||
    readiness.directVerification.pageVerificationState !== null
  ) {
    fail('direct passage verification authority widened.');
  }

  if (readiness.corroboration.intakeEntryCount !== 0 || readiness.corroboration.mayPromoteDirectSource !== false) {
    fail('corroboration authority widened.');
  }

  if (
    readiness.methodology.methodologyRef !== 'method.shenxiang.five_officers@0.1.0' ||
    readiness.methodology.reviewStatus !== 'research' ||
    readiness.methodology.productionPromotionAuthorized !== false
  ) {
    fail('methodology authority widened.');
  }

  if (
    readiness.passageScanCheckedPromotionAuthorized !== false ||
    readiness.automaticCriterionStateAuthority !== false ||
    readiness.morphologyProduced !== false ||
    readiness.criterionStatesIssued !== 0 ||
    readiness.claimsIssued !== 0 ||
    readiness.traditionalFormationAuthorized !== false ||
    readiness.traditionalSemanticAuthority !== false
  ) {
    fail('source, methodology, criterion, morphology, claim, formation, or semantic authority widened.');
  }

  if (!Object.values(readiness.authorityBoundary).every((value) => value === false)) {
    fail('authority boundary must remain fully fail-closed.');
  }
  if (!sameSequence(readiness.remainingBlockers, REQUIRED_BLOCKERS)) {
    fail('remaining blockers drift.');
  }
  if (!sameSequence(readiness.prohibitedShortcuts, REQUIRED_SHORTCUTS)) {
    fail('prohibited shortcuts drift.');
  }

  return readiness;
}

export function assertMouthPassageScanCheckedAuthorizedFR71(
  readiness: FiveOfficerMouthSourceWitnessReadinessFR71V1,
): never {
  validateFiveOfficerMouthSourceWitnessReadinessFR71(readiness);
  fail('scan_checked promotion is not authorized without a passage-specific direct-source page verification record.');
}
