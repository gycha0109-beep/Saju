import {
  FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0,
  validateDirectSourceVerificationRegistry,
  type DirectSourcePageVerificationRecord,
  type DirectSourceVerificationRegistry,
} from './direct-source-verification.js';
import {
  FR104_NLC_1925_INTAKE_CANDIDATE,
  FR104_NLC_INTAKE_PAGE_VERIFICATION,
} from './five-officers-mouth-direct-source-page-verification-fr104.js';
import {
  validateFiveOfficerIntakeWitnessQualifiedPassageIdentityDefinitionReviewFR110,
  type FiveOfficerIntakeWitnessQualifiedPassageIdentityDefinitionReviewFR110V1,
} from './five-officers-intake-witness-qualified-passage-identity-definition-review-fr110.js';
import { FaceAuthorityValidationError } from './validation.js';

const HISTORICAL_PASSAGE_REF = 'passage.shenxiang.five_officers.intake' as const;
const WITNESS_QUALIFIED_PASSAGE_REF = 'passage.shenxiang.five_officers.intake.nlc_1925' as const;
const NLC_WITNESS = 'witness.shenxiang_quanbian.nlc_1925' as const;
const NLC_CANDIDATE_REF = 'candidate.shenxiang_nlc_1925.intake@0.2.0' as const;
const ORIGINAL_VERIFICATION_ID = 'verification.shenxiang_nlc_1925.intake' as const;
const PROPOSED_VERIFICATION_ID = 'verification.shenxiang_nlc_1925.intake.witness_qualified' as const;

export interface FiveOfficerIntakeWitnessQualifiedPageVerificationReissueAdmissionReviewFR111V1 {
  readonly schemaVersion: 'fr111-five-officers-intake-witness-qualified-page-verification-reissue-admission-review-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'witness_qualified_page_verification_reissue_blocked_missing_machine_readable_lineage_contract';
  readonly upstream: {
    readonly fr110SchemaVersion: 'fr110-five-officers-intake-witness-qualified-passage-identity-definition-review-v1';
    readonly fr110AuthorityState: 'witness_qualified_passage_identity_research_candidate_defined_reissue_not_authorized';
    readonly identityRef: typeof WITNESS_QUALIFIED_PASSAGE_REF;
    readonly witnessId: typeof NLC_WITNESS;
    readonly scanPage: 88;
    readonly identityDefinitionResearchCandidateAdmitted: true;
    readonly identityDefinitionPersistenceAuthorized: false;
    readonly structuralReissueValidationPassed: true;
    readonly faceRegistryStructuralAppendPassed: true;
    readonly verificationRecordReissuePreviouslyAuthorized: false;
    readonly verificationRecordsPersistedBefore: 0;
    readonly passagesPersistedBefore: 0;
    readonly methodologySourceRefsRewrittenBefore: 0;
    readonly metricBindingsIssued: 0;
    readonly thresholdsIssued: 0;
    readonly criterionStatesIssued: 0;
    readonly claimsIssued: 0;
    readonly traditionalSemanticAuthority: false;
  };
  readonly originalVerification: {
    readonly verificationId: typeof ORIGINAL_VERIFICATION_ID;
    readonly version: '0.1.0';
    readonly candidateRef: typeof NLC_CANDIDATE_REF;
    readonly witnessId: typeof NLC_WITNESS;
    readonly passageId: typeof HISTORICAL_PASSAGE_REF;
    readonly scanPage: 88;
    readonly state: 'scan_checked';
    readonly retainedUnchanged: true;
  };
  readonly proposedReissue: {
    readonly verificationId: typeof PROPOSED_VERIFICATION_ID;
    readonly version: '0.1.0';
    readonly candidateRef: typeof NLC_CANDIDATE_REF;
    readonly witnessId: typeof NLC_WITNESS;
    readonly passageId: typeof WITNESS_QUALIFIED_PASSAGE_REF;
    readonly scanPage: 88;
    readonly state: 'scan_checked';
    readonly differsFromOriginalOnlyByVerificationAndPassageIdentity: true;
    readonly sameOriginalText: true;
    readonly sameVisualEvidenceRefs: true;
    readonly sameCheckerRefs: true;
    readonly sameVerificationState: true;
    readonly additionalVisualEvidenceRefsIssued: 0;
    readonly additionalCheckerRefsIssued: 0;
    readonly structuralRegistryValidationPassed: true;
  };
  readonly lineageContractReview: {
    readonly directSourcePageVerificationRecordHasReissueLineageField: false;
    readonly directSourceRegistryHasVerificationRelationCollection: false;
    readonly proposedRecordCanNameOriginalVerificationAsParent: false;
    readonly machineReadableReissueLineageAvailable: false;
    readonly duplicateEvidenceCouldAppearAsIndependentVerificationRecord: true;
    readonly independentVerificationCountMayIncreaseFromReissue: false;
    readonly verificationReissueAdmissionAuthorized: false;
    readonly verificationRecordPersistenceAuthorized: false;
    readonly requiredContractAction: 'define_bounded_verification_reissue_lineage_before_admission';
  };
  readonly execution: {
    readonly verificationRecordsReissued: 0;
    readonly verificationRecordsPersisted: 0;
    readonly passagesPersisted: 0;
    readonly directSourceRegistrySchemaChanged: false;
    readonly faceRegistryChanged: false;
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
    readonly structuralRegistryValidityMeansReissueAuthority: false;
    readonly sameEvidenceMeansIndependentSecondVerification: false;
    readonly newVerificationIdMeansNewCheckingEvent: false;
    readonly exactTextMatchMeansSemanticIdentityEquivalence: false;
    readonly reissueReviewMeansRegistrySchemaChangeAuthority: false;
    readonly reissueReviewMeansPersistentPassageAuthority: false;
    readonly reissueReviewMeansMethodologySourceRefRewrite: false;
    readonly reissueReviewMeansMetricBinding: false;
    readonly reissueReviewMeansThreshold: false;
    readonly reissueReviewMeansTraditionalSemantics: false;
  };
  readonly recommendedNextFrontier: 'intake_page_verification_reissue_lineage_contract_review';
  readonly remainingBlockers: readonly [
    'verification_reissue_lineage_contract_not_defined',
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
    'structural_registry_validation_to_verification_reissue_authority',
    'duplicate_same_evidence_record_to_independent_verification_count',
    'new_verification_id_to_new_checking_event',
    'exact_text_match_to_semantic_identity_equivalence',
    'reissue_review_to_registry_schema_change',
    'reissue_review_to_persistent_passage',
    'reissue_review_to_methodology_source_ref_rewrite',
    'reissue_review_to_metric_binding',
    'reissue_review_to_numeric_threshold',
    'reissue_review_to_traditional_semantics',
  ];
}

const REQUIRED_BLOCKERS = Object.freeze([
  'verification_reissue_lineage_contract_not_defined',
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
  'structural_registry_validation_to_verification_reissue_authority',
  'duplicate_same_evidence_record_to_independent_verification_count',
  'new_verification_id_to_new_checking_event',
  'exact_text_match_to_semantic_identity_equivalence',
  'reissue_review_to_registry_schema_change',
  'reissue_review_to_persistent_passage',
  'reissue_review_to_methodology_source_ref_rewrite',
  'reissue_review_to_metric_binding',
  'reissue_review_to_numeric_threshold',
  'reissue_review_to_traditional_semantics',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-111 ${message}`);
}

function sameSequence<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function validateUpstream(source: FiveOfficerIntakeWitnessQualifiedPassageIdentityDefinitionReviewFR110V1): void {
  validateFiveOfficerIntakeWitnessQualifiedPassageIdentityDefinitionReviewFR110(source);
  if (
    source.schemaVersion !== 'fr110-five-officers-intake-witness-qualified-passage-identity-definition-review-v1' ||
    source.authorityState !== 'witness_qualified_passage_identity_research_candidate_defined_reissue_not_authorized' ||
    source.identityCandidate.identityRef !== WITNESS_QUALIFIED_PASSAGE_REF ||
    source.identityCandidate.witnessId !== NLC_WITNESS ||
    source.identityCandidate.scanPage !== 88 ||
    source.identityDefinitionReview.identityDefinitionResearchCandidateAdmitted !== true ||
    source.identityDefinitionReview.identityDefinitionPersistenceAuthorized !== false ||
    source.verificationReissueProbe.directSourceRegistryStructuralValidationPassed !== true ||
    source.verificationReissueProbe.faceRegistryStructuralAppendPassed !== true ||
    source.verificationReissueProbe.verificationRecordReissueAuthorized !== false ||
    source.execution.verificationRecordsPersisted !== 0 ||
    source.execution.passagesPersisted !== 0 ||
    source.execution.methodologySourceRefsRewritten !== 0 ||
    source.execution.metricBindingsIssued !== 0 ||
    source.execution.thresholdsIssued !== 0 ||
    source.execution.criterionStatesIssued !== 0 ||
    source.execution.claimsIssued !== 0 ||
    source.execution.traditionalSemanticAuthority !== false
  ) fail('FR-110 upstream authority drift.');
}

function buildProposedReissue(): DirectSourcePageVerificationRecord {
  const source = FR104_NLC_INTAKE_PAGE_VERIFICATION;
  return Object.freeze({
    verificationId: PROPOSED_VERIFICATION_ID,
    version: source.version,
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

function inspectReissueLineageContract(): FiveOfficerIntakeWitnessQualifiedPageVerificationReissueAdmissionReviewFR111V1['lineageContractReview'] {
  const pageRecordPrototype = buildProposedReissue() as DirectSourcePageVerificationRecord & Record<string, unknown>;
  const registryPrototype = FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0 as DirectSourceVerificationRegistry & Record<string, unknown>;
  if ('reissuedFromVerificationRef' in pageRecordPrototype || 'supersedesVerificationRef' in pageRecordPrototype) {
    fail('direct-source page verification gained a lineage field and FR-111 must be re-reviewed.');
  }
  if ('verificationRelations' in registryPrototype || 'verificationLineage' in registryPrototype) {
    fail('direct-source registry gained verification lineage support and FR-111 must be re-reviewed.');
  }
  return Object.freeze({
    directSourcePageVerificationRecordHasReissueLineageField: false as const,
    directSourceRegistryHasVerificationRelationCollection: false as const,
    proposedRecordCanNameOriginalVerificationAsParent: false as const,
    machineReadableReissueLineageAvailable: false as const,
    duplicateEvidenceCouldAppearAsIndependentVerificationRecord: true as const,
    independentVerificationCountMayIncreaseFromReissue: false as const,
    verificationReissueAdmissionAuthorized: false as const,
    verificationRecordPersistenceAuthorized: false as const,
    requiredContractAction: 'define_bounded_verification_reissue_lineage_before_admission' as const,
  });
}

function inspectProposedReissue(): FiveOfficerIntakeWitnessQualifiedPageVerificationReissueAdmissionReviewFR111V1['proposedReissue'] {
  validateDirectSourceVerificationRegistry(FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0);
  const original = FR104_NLC_INTAKE_PAGE_VERIFICATION;
  const proposed = buildProposedReissue();
  if (
    original.verificationId !== ORIGINAL_VERIFICATION_ID ||
    original.version !== '0.1.0' ||
    original.candidateRef !== NLC_CANDIDATE_REF ||
    original.witnessId !== NLC_WITNESS ||
    original.passageId !== HISTORICAL_PASSAGE_REF ||
    original.scanPage !== 88 ||
    original.state !== 'scan_checked'
  ) fail('FR-104 original page-verification prerequisite drift.');

  const ephemeralRegistry: DirectSourceVerificationRegistry = {
    registryId: 'direct-source-verification.face.fr111_probe',
    version: '0.1.0',
    candidates: [...FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.candidates, FR104_NLC_1925_INTAKE_CANDIDATE],
    pageVerifications: [
      ...FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.pageVerifications,
      original,
      proposed,
    ],
  };
  validateDirectSourceVerificationRegistry(ephemeralRegistry);

  if (
    proposed.verificationId === original.verificationId ||
    proposed.passageId === original.passageId ||
    proposed.candidateRef !== original.candidateRef ||
    proposed.witnessId !== original.witnessId ||
    proposed.chapter !== original.chapter ||
    proposed.scanPage !== original.scanPage ||
    proposed.originalText !== original.originalText ||
    proposed.state !== original.state ||
    proposed.mayPromoteOtherWitness !== original.mayPromoteOtherWitness ||
    !sameSequence(proposed.visualEvidenceRefs, original.visualEvidenceRefs) ||
    !sameSequence(proposed.checkerRefs, original.checkerRefs)
  ) fail('proposed witness-qualified reissue is not an exact evidence-preserving identity derivative.');

  return Object.freeze({
    verificationId: PROPOSED_VERIFICATION_ID,
    version: '0.1.0' as const,
    candidateRef: NLC_CANDIDATE_REF,
    witnessId: NLC_WITNESS,
    passageId: WITNESS_QUALIFIED_PASSAGE_REF,
    scanPage: 88 as const,
    state: 'scan_checked' as const,
    differsFromOriginalOnlyByVerificationAndPassageIdentity: true as const,
    sameOriginalText: true as const,
    sameVisualEvidenceRefs: true as const,
    sameCheckerRefs: true as const,
    sameVerificationState: true as const,
    additionalVisualEvidenceRefsIssued: 0 as const,
    additionalCheckerRefsIssued: 0 as const,
    structuralRegistryValidationPassed: true as const,
  });
}

export function reviewFiveOfficerIntakeWitnessQualifiedPageVerificationReissueAdmissionFR111(
  source: FiveOfficerIntakeWitnessQualifiedPassageIdentityDefinitionReviewFR110V1,
): FiveOfficerIntakeWitnessQualifiedPageVerificationReissueAdmissionReviewFR111V1 {
  validateUpstream(source);
  const proposedReissue = inspectProposedReissue();
  const lineageContractReview = inspectReissueLineageContract();

  return Object.freeze({
    schemaVersion: 'fr111-five-officers-intake-witness-qualified-page-verification-reissue-admission-review-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'witness_qualified_page_verification_reissue_blocked_missing_machine_readable_lineage_contract' as const,
    upstream: Object.freeze({
      fr110SchemaVersion: source.schemaVersion,
      fr110AuthorityState: source.authorityState,
      identityRef: source.identityCandidate.identityRef,
      witnessId: source.identityCandidate.witnessId,
      scanPage: source.identityCandidate.scanPage,
      identityDefinitionResearchCandidateAdmitted: source.identityDefinitionReview.identityDefinitionResearchCandidateAdmitted,
      identityDefinitionPersistenceAuthorized: source.identityDefinitionReview.identityDefinitionPersistenceAuthorized,
      structuralReissueValidationPassed: source.verificationReissueProbe.directSourceRegistryStructuralValidationPassed,
      faceRegistryStructuralAppendPassed: source.verificationReissueProbe.faceRegistryStructuralAppendPassed,
      verificationRecordReissuePreviouslyAuthorized: source.verificationReissueProbe.verificationRecordReissueAuthorized,
      verificationRecordsPersistedBefore: source.execution.verificationRecordsPersisted,
      passagesPersistedBefore: source.execution.passagesPersisted,
      methodologySourceRefsRewrittenBefore: source.execution.methodologySourceRefsRewritten,
      metricBindingsIssued: source.execution.metricBindingsIssued,
      thresholdsIssued: source.execution.thresholdsIssued,
      criterionStatesIssued: source.execution.criterionStatesIssued,
      claimsIssued: source.execution.claimsIssued,
      traditionalSemanticAuthority: source.execution.traditionalSemanticAuthority,
    }),
    originalVerification: Object.freeze({
      verificationId: ORIGINAL_VERIFICATION_ID,
      version: '0.1.0' as const,
      candidateRef: NLC_CANDIDATE_REF,
      witnessId: NLC_WITNESS,
      passageId: HISTORICAL_PASSAGE_REF,
      scanPage: 88 as const,
      state: 'scan_checked' as const,
      retainedUnchanged: true as const,
    }),
    proposedReissue,
    lineageContractReview,
    execution: Object.freeze({
      verificationRecordsReissued: 0 as const,
      verificationRecordsPersisted: 0 as const,
      passagesPersisted: 0 as const,
      directSourceRegistrySchemaChanged: false as const,
      faceRegistryChanged: false as const,
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
      structuralRegistryValidityMeansReissueAuthority: false as const,
      sameEvidenceMeansIndependentSecondVerification: false as const,
      newVerificationIdMeansNewCheckingEvent: false as const,
      exactTextMatchMeansSemanticIdentityEquivalence: false as const,
      reissueReviewMeansRegistrySchemaChangeAuthority: false as const,
      reissueReviewMeansPersistentPassageAuthority: false as const,
      reissueReviewMeansMethodologySourceRefRewrite: false as const,
      reissueReviewMeansMetricBinding: false as const,
      reissueReviewMeansThreshold: false as const,
      reissueReviewMeansTraditionalSemantics: false as const,
    }),
    recommendedNextFrontier: 'intake_page_verification_reissue_lineage_contract_review' as const,
    remainingBlockers: REQUIRED_BLOCKERS,
    prohibitedShortcuts: REQUIRED_SHORTCUTS,
  });
}

export function validateFiveOfficerIntakeWitnessQualifiedPageVerificationReissueAdmissionReviewFR111(
  value: FiveOfficerIntakeWitnessQualifiedPageVerificationReissueAdmissionReviewFR111V1,
): FiveOfficerIntakeWitnessQualifiedPageVerificationReissueAdmissionReviewFR111V1 {
  if (
    value.schemaVersion !== 'fr111-five-officers-intake-witness-qualified-page-verification-reissue-admission-review-v1' ||
    value.artifactVersion !== '0.1.0' ||
    value.authorityState !== 'witness_qualified_page_verification_reissue_blocked_missing_machine_readable_lineage_contract'
  ) fail('schema/artifact/authority state drift.');
  if (
    value.upstream.fr110SchemaVersion !== 'fr110-five-officers-intake-witness-qualified-passage-identity-definition-review-v1' ||
    value.upstream.fr110AuthorityState !== 'witness_qualified_passage_identity_research_candidate_defined_reissue_not_authorized' ||
    value.upstream.identityRef !== WITNESS_QUALIFIED_PASSAGE_REF ||
    value.upstream.witnessId !== NLC_WITNESS ||
    value.upstream.scanPage !== 88 ||
    value.upstream.identityDefinitionResearchCandidateAdmitted !== true ||
    value.upstream.identityDefinitionPersistenceAuthorized !== false ||
    value.upstream.structuralReissueValidationPassed !== true ||
    value.upstream.faceRegistryStructuralAppendPassed !== true ||
    value.upstream.verificationRecordReissuePreviouslyAuthorized !== false ||
    value.upstream.verificationRecordsPersistedBefore !== 0 ||
    value.upstream.passagesPersistedBefore !== 0 ||
    value.upstream.methodologySourceRefsRewrittenBefore !== 0 ||
    value.upstream.metricBindingsIssued !== 0 ||
    value.upstream.thresholdsIssued !== 0 ||
    value.upstream.criterionStatesIssued !== 0 ||
    value.upstream.claimsIssued !== 0 ||
    value.upstream.traditionalSemanticAuthority !== false
  ) fail('upstream snapshot drift.');
  if (
    value.originalVerification.verificationId !== ORIGINAL_VERIFICATION_ID ||
    value.originalVerification.version !== '0.1.0' ||
    value.originalVerification.candidateRef !== NLC_CANDIDATE_REF ||
    value.originalVerification.witnessId !== NLC_WITNESS ||
    value.originalVerification.passageId !== HISTORICAL_PASSAGE_REF ||
    value.originalVerification.scanPage !== 88 ||
    value.originalVerification.state !== 'scan_checked' ||
    value.originalVerification.retainedUnchanged !== true
  ) fail('original FR-104 verification preservation drift.');
  if (
    value.proposedReissue.verificationId !== PROPOSED_VERIFICATION_ID ||
    value.proposedReissue.version !== '0.1.0' ||
    value.proposedReissue.candidateRef !== NLC_CANDIDATE_REF ||
    value.proposedReissue.witnessId !== NLC_WITNESS ||
    value.proposedReissue.passageId !== WITNESS_QUALIFIED_PASSAGE_REF ||
    value.proposedReissue.scanPage !== 88 ||
    value.proposedReissue.state !== 'scan_checked' ||
    value.proposedReissue.differsFromOriginalOnlyByVerificationAndPassageIdentity !== true ||
    value.proposedReissue.sameOriginalText !== true ||
    value.proposedReissue.sameVisualEvidenceRefs !== true ||
    value.proposedReissue.sameCheckerRefs !== true ||
    value.proposedReissue.sameVerificationState !== true ||
    value.proposedReissue.additionalVisualEvidenceRefsIssued !== 0 ||
    value.proposedReissue.additionalCheckerRefsIssued !== 0 ||
    value.proposedReissue.structuralRegistryValidationPassed !== true
  ) fail('proposed reissue identity/evidence snapshot drift.');
  if (
    value.lineageContractReview.directSourcePageVerificationRecordHasReissueLineageField !== false ||
    value.lineageContractReview.directSourceRegistryHasVerificationRelationCollection !== false ||
    value.lineageContractReview.proposedRecordCanNameOriginalVerificationAsParent !== false ||
    value.lineageContractReview.machineReadableReissueLineageAvailable !== false ||
    value.lineageContractReview.duplicateEvidenceCouldAppearAsIndependentVerificationRecord !== true ||
    value.lineageContractReview.independentVerificationCountMayIncreaseFromReissue !== false ||
    value.lineageContractReview.verificationReissueAdmissionAuthorized !== false ||
    value.lineageContractReview.verificationRecordPersistenceAuthorized !== false ||
    value.lineageContractReview.requiredContractAction !== 'define_bounded_verification_reissue_lineage_before_admission'
  ) fail('reissue lineage/admission boundary drift.');
  if (
    value.execution.verificationRecordsReissued !== 0 ||
    value.execution.verificationRecordsPersisted !== 0 ||
    value.execution.passagesPersisted !== 0 ||
    value.execution.directSourceRegistrySchemaChanged !== false ||
    value.execution.faceRegistryChanged !== false ||
    value.execution.methodologySourceRefsRewritten !== 0 ||
    value.execution.methodologyDefinitionsPersisted !== 0 ||
    value.execution.methodologyExecutionIssued !== false ||
    value.execution.methodologyProductionPromotionAuthorized !== false ||
    value.execution.metricBindingsIssued !== 0 ||
    value.execution.thresholdsIssued !== 0 ||
    value.execution.morphologyProduced !== false ||
    value.execution.criterionStatesIssued !== 0 ||
    value.execution.claimsIssued !== 0 ||
    value.execution.traditionalFormationAuthorized !== false ||
    value.execution.traditionalSemanticAuthority !== false
  ) fail('execution authority drift.');
  if (
    value.authorityBoundary.structuralRegistryValidityMeansReissueAuthority !== false ||
    value.authorityBoundary.sameEvidenceMeansIndependentSecondVerification !== false ||
    value.authorityBoundary.newVerificationIdMeansNewCheckingEvent !== false ||
    value.authorityBoundary.exactTextMatchMeansSemanticIdentityEquivalence !== false ||
    value.authorityBoundary.reissueReviewMeansRegistrySchemaChangeAuthority !== false ||
    value.authorityBoundary.reissueReviewMeansPersistentPassageAuthority !== false ||
    value.authorityBoundary.reissueReviewMeansMethodologySourceRefRewrite !== false ||
    value.authorityBoundary.reissueReviewMeansMetricBinding !== false ||
    value.authorityBoundary.reissueReviewMeansThreshold !== false ||
    value.authorityBoundary.reissueReviewMeansTraditionalSemantics !== false
  ) fail('authority boundary drift.');
  if (
    value.recommendedNextFrontier !== 'intake_page_verification_reissue_lineage_contract_review' ||
    !sameSequence(value.remainingBlockers, REQUIRED_BLOCKERS) ||
    !sameSequence(value.prohibitedShortcuts, REQUIRED_SHORTCUTS)
  ) fail('next-frontier/blocker/shortcut contract drift.');
  return value;
}
