import type { FaceAuthorityRegistry } from './contracts.js';
import {
  FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0,
  materializeVerifiedSourcePassage,
  validateDirectSourceVerificationRegistry,
  type DirectSourcePageVerificationRecord,
  type DirectSourceVerificationRegistry,
} from './direct-source-verification.js';
import { FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0 } from './five-officers-six-fus-research-v0.js';
import {
  FR104_NLC_1925_INTAKE_CANDIDATE,
  FR104_NLC_INTAKE_PAGE_VERIFICATION,
} from './five-officers-mouth-direct-source-page-verification-fr104.js';
import {
  validateFiveOfficerIntakeScanCheckedPassageRegistryIdentityPersistenceReviewFR109,
  type FiveOfficerIntakeScanCheckedPassageRegistryIdentityPersistenceReviewFR109V1,
} from './five-officers-intake-scanchecked-passage-registry-identity-persistence-review-fr109.js';
import { FaceAuthorityValidationError, validateFaceAuthorityRegistry } from './validation.js';

const HISTORICAL_PASSAGE_REF = 'passage.shenxiang.five_officers.intake' as const;
const WITNESS_QUALIFIED_PASSAGE_REF = 'passage.shenxiang.five_officers.intake.nlc_1925' as const;
const NLC_WITNESS = 'witness.shenxiang_quanbian.nlc_1925' as const;
const NLC_CANDIDATE_REF = 'candidate.shenxiang_nlc_1925.intake@0.2.0' as const;
const PROPOSED_VERIFICATION_ID = 'verification.shenxiang_nlc_1925.intake.witness_qualified' as const;

export interface IntakeWitnessQualifiedPassageIdentityCandidateFR110V1 {
  readonly identityRef: typeof WITNESS_QUALIFIED_PASSAGE_REF;
  readonly identityKind: 'witness_qualified_registry_record';
  readonly historicalPassageRef: typeof HISTORICAL_PASSAGE_REF;
  readonly witnessId: typeof NLC_WITNESS;
  readonly workRef: 'work.shenxiang_quanbian';
  readonly chapter: '出納官';
  readonly scanPage: 88;
  readonly originalText: '口須要方大，唇紅端厚，角弓，開大合小，乃為出納官成。';
  readonly verificationStatus: 'scan_checked';
  readonly identityRelationship: 'exact_text_match_distinct_witness_record';
  readonly historicalPassageSemanticEquivalenceAsserted: false;
  readonly historicalPassageReplaced: false;
  readonly candidateReviewState: 'research_candidate';
}

export interface FiveOfficerIntakeWitnessQualifiedPassageIdentityDefinitionReviewFR110V1 {
  readonly schemaVersion: 'fr110-five-officers-intake-witness-qualified-passage-identity-definition-review-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'witness_qualified_passage_identity_research_candidate_defined_reissue_not_authorized';
  readonly upstream: {
    readonly fr109SchemaVersion: 'fr109-five-officers-intake-scanchecked-passage-registry-identity-persistence-review-v1';
    readonly fr109AuthorityState: 'witness_qualified_passage_identity_candidate_preferred_but_not_authorized';
    readonly preferredStrategyCandidate: 'witness_qualified_new_passage_identity';
    readonly proposedPassageRef: typeof WITNESS_QUALIFIED_PASSAGE_REF;
    readonly proposedWitnessId: typeof NLC_WITNESS;
    readonly proposedVerificationStatus: 'scan_checked';
    readonly proposedScanPage: 88;
    readonly newPassageIdentityDefinitionPreviouslyAdmitted: false;
    readonly newVerificationRecordPreviouslyAuthorized: false;
    readonly persistentRegistryMutationPreviouslyAuthorized: false;
    readonly metricBindingsIssued: 0;
    readonly thresholdsIssued: 0;
    readonly criterionStatesIssued: 0;
    readonly claimsIssued: 0;
    readonly traditionalSemanticAuthority: false;
  };
  readonly identityCandidate: IntakeWitnessQualifiedPassageIdentityCandidateFR110V1;
  readonly identityDefinitionReview: {
    readonly researchIdentityCandidatesIssued: 1;
    readonly stableIdentityKeyValid: true;
    readonly witnessAlreadyRegistered: true;
    readonly historicalPassageRetained: true;
    readonly exactTextMatchObserved: true;
    readonly witnessScopedIdentitySeparatesProvenance: true;
    readonly identityDefinitionResearchCandidateAdmitted: true;
    readonly identityDefinitionPersistenceAuthorized: false;
    readonly semanticEquivalenceToHistoricalPassageAuthorized: false;
  };
  readonly verificationReissueProbe: {
    readonly proposedVerificationId: typeof PROPOSED_VERIFICATION_ID;
    readonly proposedVerificationVersion: '0.1.0';
    readonly candidateRef: typeof NLC_CANDIDATE_REF;
    readonly proposedPassageId: typeof WITNESS_QUALIFIED_PASSAGE_REF;
    readonly originalFr104PassageIdRetained: typeof HISTORICAL_PASSAGE_REF;
    readonly originalFr104VerificationRetained: true;
    readonly sameCandidateMayCarryDistinctPassageIdsStructurally: true;
    readonly directSourceRegistryStructuralValidationPassed: true;
    readonly materializedProbePassageId: typeof WITNESS_QUALIFIED_PASSAGE_REF;
    readonly materializedProbeVerificationStatus: 'scan_checked';
    readonly faceRegistryStructuralAppendPassed: true;
    readonly verificationRecordReissueAuthorized: false;
    readonly materializedProbePersistenceAuthorized: false;
  };
  readonly execution: {
    readonly verificationRecordsPersisted: 0;
    readonly passagesPersisted: 0;
    readonly methodologySourceRefsRewritten: 0;
    readonly methodologyDefinitionsPersisted: 0;
    readonly methodologyExecutionIssued: false;
    readonly methodologyProductionPromotionAuthorized: false;
    readonly metricBindingsIssued: 0;
    readonly thresholdsIssued: 0;
    readonly morphologyProduced: false;
    readonly criterionStatesIssued: 0;
    readonly claimsIssued: 0;
    readonly traditionalFormationAuthorized: false;
    readonly traditionalSemanticAuthority: false;
  };
  readonly authorityBoundary: {
    readonly researchIdentityCandidateMeansPersistentPassage: false;
    readonly structuralVerificationReissueMeansReissueAuthority: false;
    readonly exactTextMatchMeansSemanticIdentityEquivalence: false;
    readonly witnessQualifiedIdentityMeansHistoricalPassageReplacement: false;
    readonly materializedProbeMeansPersistentSourceAuthority: false;
    readonly identityDefinitionMeansMethodologySourceRefRewrite: false;
    readonly identityDefinitionMeansMetricBinding: false;
    readonly identityDefinitionMeansThreshold: false;
    readonly identityDefinitionMeansTraditionalSemantics: false;
  };
  readonly recommendedNextFrontier: 'intake_witness_qualified_page_verification_reissue_admission_review';
  readonly remainingBlockers: readonly [
    'witness_qualified_page_verification_reissue_not_authorized',
    'witness_qualified_intake_passage_not_persisted_in_face_registry',
    'intake_criterion_methodology_source_ref_rewrite_not_authorized',
    'intake_criterion_methodology_not_registered',
    'intake_officer_mapping_dependency_not_re_reviewed',
    'intake_metric_to_source_concept_mapping_not_authorized',
    'intake_calibration_and_thresholds_not_authorized',
    'fr64_methodology_execution_and_claim_gates_remain',
  ];
  readonly prohibitedShortcuts: readonly [
    'research_identity_candidate_to_persistent_passage',
    'structural_reissue_probe_to_reissue_authority',
    'exact_text_match_to_semantic_identity_equivalence',
    'witness_qualified_identity_to_historical_passage_replacement',
    'materialized_probe_to_persistent_source_authority',
    'identity_definition_to_methodology_source_ref_rewrite',
    'identity_definition_to_metric_binding',
    'identity_definition_to_numeric_threshold',
    'identity_definition_to_traditional_semantics',
  ];
}

const REQUIRED_BLOCKERS = Object.freeze([
  'witness_qualified_page_verification_reissue_not_authorized',
  'witness_qualified_intake_passage_not_persisted_in_face_registry',
  'intake_criterion_methodology_source_ref_rewrite_not_authorized',
  'intake_criterion_methodology_not_registered',
  'intake_officer_mapping_dependency_not_re_reviewed',
  'intake_metric_to_source_concept_mapping_not_authorized',
  'intake_calibration_and_thresholds_not_authorized',
  'fr64_methodology_execution_and_claim_gates_remain',
] as const);

const REQUIRED_SHORTCUTS = Object.freeze([
  'research_identity_candidate_to_persistent_passage',
  'structural_reissue_probe_to_reissue_authority',
  'exact_text_match_to_semantic_identity_equivalence',
  'witness_qualified_identity_to_historical_passage_replacement',
  'materialized_probe_to_persistent_source_authority',
  'identity_definition_to_methodology_source_ref_rewrite',
  'identity_definition_to_metric_binding',
  'identity_definition_to_numeric_threshold',
  'identity_definition_to_traditional_semantics',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-110 ${message}`);
}

function sameSequence<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function validateUpstream(source: FiveOfficerIntakeScanCheckedPassageRegistryIdentityPersistenceReviewFR109V1): void {
  validateFiveOfficerIntakeScanCheckedPassageRegistryIdentityPersistenceReviewFR109(source);
  if (
    source.schemaVersion !== 'fr109-five-officers-intake-scanchecked-passage-registry-identity-persistence-review-v1' ||
    source.authorityState !== 'witness_qualified_passage_identity_candidate_preferred_but_not_authorized' ||
    source.decision.preferredStrategyCandidate !== 'witness_qualified_new_passage_identity' ||
    source.decision.proposedPassageRef !== WITNESS_QUALIFIED_PASSAGE_REF ||
    source.decision.proposedWitnessId !== NLC_WITNESS ||
    source.decision.proposedVerificationStatus !== 'scan_checked' ||
    source.decision.proposedScanPage !== 88 ||
    source.decision.newPassageIdentityDefinitionAdmitted !== false ||
    source.decision.newVerificationRecordAuthorized !== false ||
    source.decision.persistentRegistryMutationAuthorized !== false ||
    source.execution.metricBindingsIssued !== 0 ||
    source.execution.thresholdsIssued !== 0 ||
    source.execution.criterionStatesIssued !== 0 ||
    source.execution.claimsIssued !== 0 ||
    source.execution.traditionalSemanticAuthority !== false
  ) fail('FR-109 upstream authority drift.');
}

function buildIdentityCandidate(): IntakeWitnessQualifiedPassageIdentityCandidateFR110V1 {
  const historical = FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.passages.find(
    (passage) => passage.passageId === HISTORICAL_PASSAGE_REF,
  );
  if (
    historical === undefined ||
    historical.originalText !== FR104_NLC_INTAKE_PAGE_VERIFICATION.originalText ||
    historical.witnessId !== 'witness.shenxiang_quanbian.ctext' ||
    historical.verificationStatus !== 'unverified_ocr'
  ) fail('historical intake passage exact-text/provenance prerequisite drift.');

  const witness = FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.witnesses.find((entry) => entry.witnessId === NLC_WITNESS);
  if (witness === undefined || witness.witnessStatus !== 'verified') fail('NLC witness registry prerequisite drift.');

  if (
    FR104_NLC_1925_INTAKE_CANDIDATE.witnessId !== NLC_WITNESS ||
    FR104_NLC_1925_INTAKE_CANDIDATE.workRef !== 'work.shenxiang_quanbian' ||
    FR104_NLC_INTAKE_PAGE_VERIFICATION.candidateRef !== NLC_CANDIDATE_REF ||
    FR104_NLC_INTAKE_PAGE_VERIFICATION.passageId !== HISTORICAL_PASSAGE_REF ||
    FR104_NLC_INTAKE_PAGE_VERIFICATION.scanPage !== 88 ||
    FR104_NLC_INTAKE_PAGE_VERIFICATION.state !== 'scan_checked'
  ) fail('FR-104 NLC page-verification prerequisite drift.');

  return Object.freeze({
    identityRef: WITNESS_QUALIFIED_PASSAGE_REF,
    identityKind: 'witness_qualified_registry_record' as const,
    historicalPassageRef: HISTORICAL_PASSAGE_REF,
    witnessId: NLC_WITNESS,
    workRef: 'work.shenxiang_quanbian' as const,
    chapter: '出納官' as const,
    scanPage: 88 as const,
    originalText: '口須要方大，唇紅端厚，角弓，開大合小，乃為出納官成。' as const,
    verificationStatus: 'scan_checked' as const,
    identityRelationship: 'exact_text_match_distinct_witness_record' as const,
    historicalPassageSemanticEquivalenceAsserted: false as const,
    historicalPassageReplaced: false as const,
    candidateReviewState: 'research_candidate' as const,
  });
}

function buildProposedVerificationRecord(): DirectSourcePageVerificationRecord {
  const source = FR104_NLC_INTAKE_PAGE_VERIFICATION;
  return Object.freeze({
    verificationId: PROPOSED_VERIFICATION_ID,
    version: '0.1.0',
    candidateRef: source.candidateRef,
    witnessId: source.witnessId,
    passageId: WITNESS_QUALIFIED_PASSAGE_REF,
    chapter: source.chapter,
    scanPage: source.scanPage,
    originalText: source.originalText,
    visualEvidenceRefs: source.visualEvidenceRefs,
    checkerRefs: source.checkerRefs,
    state: source.state,
    mayPromoteOtherWitness: false,
  });
}

function probeVerificationReissue(candidate: IntakeWitnessQualifiedPassageIdentityCandidateFR110V1): FiveOfficerIntakeWitnessQualifiedPassageIdentityDefinitionReviewFR110V1['verificationReissueProbe'] {
  validateFaceAuthorityRegistry(FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0);
  validateDirectSourceVerificationRegistry(FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0);

  const proposedRecord = buildProposedVerificationRecord();
  const ephemeralRegistry: DirectSourceVerificationRegistry = {
    registryId: 'direct-source-verification.face.fr110_probe',
    version: '0.1.0',
    candidates: [...FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.candidates, FR104_NLC_1925_INTAKE_CANDIDATE],
    pageVerifications: [
      ...FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.pageVerifications,
      FR104_NLC_INTAKE_PAGE_VERIFICATION,
      proposedRecord,
    ],
  };
  validateDirectSourceVerificationRegistry(ephemeralRegistry);

  const materialized = materializeVerifiedSourcePassage(proposedRecord, ephemeralRegistry);
  if (
    materialized.passageId !== candidate.identityRef ||
    materialized.witnessId !== candidate.witnessId ||
    materialized.chapter !== candidate.chapter ||
    materialized.scanPage !== candidate.scanPage ||
    materialized.originalText !== candidate.originalText ||
    materialized.verificationStatus !== 'scan_checked'
  ) fail('witness-qualified materialized probe drift.');

  const faceProbe: FaceAuthorityRegistry = {
    ...FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0,
    passages: [...FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.passages, materialized],
  };
  validateFaceAuthorityRegistry(faceProbe);

  const originalRecord = ephemeralRegistry.pageVerifications.find(
    (record) => record.verificationId === FR104_NLC_INTAKE_PAGE_VERIFICATION.verificationId,
  );
  if (
    originalRecord === undefined ||
    originalRecord.passageId !== HISTORICAL_PASSAGE_REF ||
    originalRecord !== FR104_NLC_INTAKE_PAGE_VERIFICATION
  ) fail('FR-104 verification record was not retained unchanged in structural probe.');

  return Object.freeze({
    proposedVerificationId: PROPOSED_VERIFICATION_ID,
    proposedVerificationVersion: '0.1.0' as const,
    candidateRef: NLC_CANDIDATE_REF,
    proposedPassageId: WITNESS_QUALIFIED_PASSAGE_REF,
    originalFr104PassageIdRetained: HISTORICAL_PASSAGE_REF,
    originalFr104VerificationRetained: true as const,
    sameCandidateMayCarryDistinctPassageIdsStructurally: true as const,
    directSourceRegistryStructuralValidationPassed: true as const,
    materializedProbePassageId: WITNESS_QUALIFIED_PASSAGE_REF,
    materializedProbeVerificationStatus: 'scan_checked' as const,
    faceRegistryStructuralAppendPassed: true as const,
    verificationRecordReissueAuthorized: false as const,
    materializedProbePersistenceAuthorized: false as const,
  });
}

export function reviewFiveOfficerIntakeWitnessQualifiedPassageIdentityDefinitionFR110(
  source: FiveOfficerIntakeScanCheckedPassageRegistryIdentityPersistenceReviewFR109V1,
): FiveOfficerIntakeWitnessQualifiedPassageIdentityDefinitionReviewFR110V1 {
  validateUpstream(source);
  const identityCandidate = buildIdentityCandidate();
  const verificationReissueProbe = probeVerificationReissue(identityCandidate);

  return Object.freeze({
    schemaVersion: 'fr110-five-officers-intake-witness-qualified-passage-identity-definition-review-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'witness_qualified_passage_identity_research_candidate_defined_reissue_not_authorized' as const,
    upstream: Object.freeze({
      fr109SchemaVersion: source.schemaVersion,
      fr109AuthorityState: source.authorityState,
      preferredStrategyCandidate: source.decision.preferredStrategyCandidate,
      proposedPassageRef: source.decision.proposedPassageRef,
      proposedWitnessId: source.decision.proposedWitnessId,
      proposedVerificationStatus: source.decision.proposedVerificationStatus,
      proposedScanPage: source.decision.proposedScanPage,
      newPassageIdentityDefinitionPreviouslyAdmitted: source.decision.newPassageIdentityDefinitionAdmitted,
      newVerificationRecordPreviouslyAuthorized: source.decision.newVerificationRecordAuthorized,
      persistentRegistryMutationPreviouslyAuthorized: source.decision.persistentRegistryMutationAuthorized,
      metricBindingsIssued: source.execution.metricBindingsIssued,
      thresholdsIssued: source.execution.thresholdsIssued,
      criterionStatesIssued: source.execution.criterionStatesIssued,
      claimsIssued: source.execution.claimsIssued,
      traditionalSemanticAuthority: source.execution.traditionalSemanticAuthority,
    }),
    identityCandidate,
    identityDefinitionReview: Object.freeze({
      researchIdentityCandidatesIssued: 1 as const,
      stableIdentityKeyValid: true as const,
      witnessAlreadyRegistered: true as const,
      historicalPassageRetained: true as const,
      exactTextMatchObserved: true as const,
      witnessScopedIdentitySeparatesProvenance: true as const,
      identityDefinitionResearchCandidateAdmitted: true as const,
      identityDefinitionPersistenceAuthorized: false as const,
      semanticEquivalenceToHistoricalPassageAuthorized: false as const,
    }),
    verificationReissueProbe,
    execution: Object.freeze({
      verificationRecordsPersisted: 0 as const,
      passagesPersisted: 0 as const,
      methodologySourceRefsRewritten: 0 as const,
      methodologyDefinitionsPersisted: 0 as const,
      methodologyExecutionIssued: false as const,
      methodologyProductionPromotionAuthorized: false as const,
      metricBindingsIssued: 0 as const,
      thresholdsIssued: 0 as const,
      morphologyProduced: false as const,
      criterionStatesIssued: 0 as const,
      claimsIssued: 0 as const,
      traditionalFormationAuthorized: false as const,
      traditionalSemanticAuthority: false as const,
    }),
    authorityBoundary: Object.freeze({
      researchIdentityCandidateMeansPersistentPassage: false as const,
      structuralVerificationReissueMeansReissueAuthority: false as const,
      exactTextMatchMeansSemanticIdentityEquivalence: false as const,
      witnessQualifiedIdentityMeansHistoricalPassageReplacement: false as const,
      materializedProbeMeansPersistentSourceAuthority: false as const,
      identityDefinitionMeansMethodologySourceRefRewrite: false as const,
      identityDefinitionMeansMetricBinding: false as const,
      identityDefinitionMeansThreshold: false as const,
      identityDefinitionMeansTraditionalSemantics: false as const,
    }),
    recommendedNextFrontier: 'intake_witness_qualified_page_verification_reissue_admission_review' as const,
    remainingBlockers: REQUIRED_BLOCKERS,
    prohibitedShortcuts: REQUIRED_SHORTCUTS,
  });
}

export function validateFiveOfficerIntakeWitnessQualifiedPassageIdentityDefinitionReviewFR110(
  source: FiveOfficerIntakeWitnessQualifiedPassageIdentityDefinitionReviewFR110V1,
): FiveOfficerIntakeWitnessQualifiedPassageIdentityDefinitionReviewFR110V1 {
  if (
    source.schemaVersion !== 'fr110-five-officers-intake-witness-qualified-passage-identity-definition-review-v1' ||
    source.artifactVersion !== '0.1.0' ||
    source.authorityState !== 'witness_qualified_passage_identity_research_candidate_defined_reissue_not_authorized'
  ) fail('schema or authority state drift.');
  if (
    source.upstream.fr109SchemaVersion !== 'fr109-five-officers-intake-scanchecked-passage-registry-identity-persistence-review-v1' ||
    source.upstream.fr109AuthorityState !== 'witness_qualified_passage_identity_candidate_preferred_but_not_authorized' ||
    source.upstream.preferredStrategyCandidate !== 'witness_qualified_new_passage_identity' ||
    source.upstream.proposedPassageRef !== WITNESS_QUALIFIED_PASSAGE_REF ||
    source.upstream.proposedWitnessId !== NLC_WITNESS ||
    source.upstream.proposedVerificationStatus !== 'scan_checked' ||
    source.upstream.proposedScanPage !== 88 ||
    source.upstream.newPassageIdentityDefinitionPreviouslyAdmitted !== false ||
    source.upstream.newVerificationRecordPreviouslyAuthorized !== false ||
    source.upstream.persistentRegistryMutationPreviouslyAuthorized !== false ||
    source.upstream.metricBindingsIssued !== 0 ||
    source.upstream.thresholdsIssued !== 0 ||
    source.upstream.criterionStatesIssued !== 0 ||
    source.upstream.claimsIssued !== 0 ||
    source.upstream.traditionalSemanticAuthority !== false
  ) fail('upstream authority snapshot drift.');
  if (
    source.identityCandidate.identityRef !== WITNESS_QUALIFIED_PASSAGE_REF ||
    source.identityCandidate.identityKind !== 'witness_qualified_registry_record' ||
    source.identityCandidate.historicalPassageRef !== HISTORICAL_PASSAGE_REF ||
    source.identityCandidate.witnessId !== NLC_WITNESS ||
    source.identityCandidate.workRef !== 'work.shenxiang_quanbian' ||
    source.identityCandidate.chapter !== '出納官' ||
    source.identityCandidate.scanPage !== 88 ||
    source.identityCandidate.originalText !== '口須要方大，唇紅端厚，角弓，開大合小，乃為出納官成。' ||
    source.identityCandidate.verificationStatus !== 'scan_checked' ||
    source.identityCandidate.identityRelationship !== 'exact_text_match_distinct_witness_record' ||
    source.identityCandidate.historicalPassageSemanticEquivalenceAsserted !== false ||
    source.identityCandidate.historicalPassageReplaced !== false ||
    source.identityCandidate.candidateReviewState !== 'research_candidate'
  ) fail('identity candidate drift.');
  if (
    source.identityDefinitionReview.researchIdentityCandidatesIssued !== 1 ||
    source.identityDefinitionReview.stableIdentityKeyValid !== true ||
    source.identityDefinitionReview.witnessAlreadyRegistered !== true ||
    source.identityDefinitionReview.historicalPassageRetained !== true ||
    source.identityDefinitionReview.exactTextMatchObserved !== true ||
    source.identityDefinitionReview.witnessScopedIdentitySeparatesProvenance !== true ||
    source.identityDefinitionReview.identityDefinitionResearchCandidateAdmitted !== true ||
    source.identityDefinitionReview.identityDefinitionPersistenceAuthorized !== false ||
    source.identityDefinitionReview.semanticEquivalenceToHistoricalPassageAuthorized !== false
  ) fail('identity definition review drift.');
  if (
    source.verificationReissueProbe.proposedVerificationId !== PROPOSED_VERIFICATION_ID ||
    source.verificationReissueProbe.proposedVerificationVersion !== '0.1.0' ||
    source.verificationReissueProbe.candidateRef !== NLC_CANDIDATE_REF ||
    source.verificationReissueProbe.proposedPassageId !== WITNESS_QUALIFIED_PASSAGE_REF ||
    source.verificationReissueProbe.originalFr104PassageIdRetained !== HISTORICAL_PASSAGE_REF ||
    source.verificationReissueProbe.originalFr104VerificationRetained !== true ||
    source.verificationReissueProbe.sameCandidateMayCarryDistinctPassageIdsStructurally !== true ||
    source.verificationReissueProbe.directSourceRegistryStructuralValidationPassed !== true ||
    source.verificationReissueProbe.materializedProbePassageId !== WITNESS_QUALIFIED_PASSAGE_REF ||
    source.verificationReissueProbe.materializedProbeVerificationStatus !== 'scan_checked' ||
    source.verificationReissueProbe.faceRegistryStructuralAppendPassed !== true ||
    source.verificationReissueProbe.verificationRecordReissueAuthorized !== false ||
    source.verificationReissueProbe.materializedProbePersistenceAuthorized !== false
  ) fail('verification reissue probe drift.');
  if (
    source.execution.verificationRecordsPersisted !== 0 ||
    source.execution.passagesPersisted !== 0 ||
    source.execution.methodologySourceRefsRewritten !== 0 ||
    source.execution.methodologyDefinitionsPersisted !== 0 ||
    source.execution.methodologyExecutionIssued !== false ||
    source.execution.methodologyProductionPromotionAuthorized !== false ||
    source.execution.metricBindingsIssued !== 0 ||
    source.execution.thresholdsIssued !== 0 ||
    source.execution.morphologyProduced !== false ||
    source.execution.criterionStatesIssued !== 0 ||
    source.execution.claimsIssued !== 0 ||
    source.execution.traditionalFormationAuthorized !== false ||
    source.execution.traditionalSemanticAuthority !== false
  ) fail('execution boundary drift.');
  if (
    Object.values(source.authorityBoundary).some((value) => value !== false) ||
    source.recommendedNextFrontier !== 'intake_witness_qualified_page_verification_reissue_admission_review' ||
    !sameSequence(source.remainingBlockers, REQUIRED_BLOCKERS) ||
    !sameSequence(source.prohibitedShortcuts, REQUIRED_SHORTCUTS)
  ) fail('authority boundary, blocker, or shortcut drift.');
  return source;
}
