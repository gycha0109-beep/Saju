import type { FaceAuthorityRegistry, FaceMethodologyDefinition } from './contracts.js';
import { FIVE_OFFICER_CRITERIA_V0 } from './five-officers-six-fus-research-v0.js';
import {
  FACE_AUTHORITY_FR117_WITNESS_QUALIFIED_RESEARCH_REGISTRY,
  FR117_NLC_WITNESS_QUALIFIED_PASSAGE,
  validateFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceImplementationFR117,
  type FiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceImplementationFR117V1,
} from './five-officers-intake-witness-qualified-page-verification-reissue-persistence-implementation-fr117.js';
import {
  validateFiveOfficerIntakeCriterionMethodologyRegistryAdmissionReviewFR108,
  type FiveOfficerIntakeCriterionMethodologyRegistryAdmissionReviewFR108V1,
} from './five-officers-intake-criterion-methodology-registry-admission-review-fr108.js';
import { FaceAuthorityValidationError, validateFaceAuthorityRegistry } from './validation.js';

const FULL_METHODOLOGY_REF = 'method.shenxiang.five_officers@0.1.0' as const;
const CANDIDATE_METHODOLOGY_ID = 'method.shenxiang.five_officers.intake_criteria' as const;
const PRIOR_CANDIDATE_VERSION = '0.1.0' as const;
const PRIOR_CANDIDATE_REF = `${CANDIDATE_METHODOLOGY_ID}@${PRIOR_CANDIDATE_VERSION}` as const;
const SUCCESSOR_CANDIDATE_VERSION = '0.2.0' as const;
const SUCCESSOR_CANDIDATE_REF = `${CANDIDATE_METHODOLOGY_ID}@${SUCCESSOR_CANDIDATE_VERSION}` as const;
const HISTORICAL_PASSAGE_REF = 'passage.shenxiang.five_officers.intake' as const;
const WITNESS_QUALIFIED_PASSAGE_REF = 'passage.shenxiang.five_officers.intake.nlc_1925' as const;
const NLC_WITNESS = 'witness.shenxiang_quanbian.nlc_1925' as const;
const INTAKE_CRITERION_IDS = Object.freeze([
  'criterion.intake.square_broad',
  'criterion.intake.lips_substantial',
  'criterion.intake.corners_arched',
  'criterion.intake.open_close_relation',
  'criterion.intake.red_lip_color',
] as const);
const SUCCESSOR_LIMITATIONS = Object.freeze([
  '이 successor definition은 historical full 五官 methodology 또는 기존 intake officer definition을 대체하지 않는다.',
  'witness-qualified scan_checked passage는 본문 provenance를 강화하지만 方大·端厚·角弓·開大合小·唇紅의 metric binding이나 threshold를 승인하지 않는다.',
  'intake criterion constants의 historical sourceRefs는 이 review에서 변경하지 않으며 별도 authority review가 필요하다.',
  'mapping dependency와 static-v1 execution/claim gates는 유지되며 이 definition은 아직 persistent registry에 등록되지 않았다.',
] as const);

export interface FiveOfficerIntakeCriterionMethodologySourceRebindPostPersistenceReviewFR118V1 {
  readonly schemaVersion: 'fr118-five-officers-intake-criterion-methodology-source-rebind-post-persistence-review-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'witness_qualified_intake_criterion_methodology_successor_admitted_registry_persistence_not_executed';
  readonly upstream: {
    readonly fr108SchemaVersion: 'fr108-five-officers-intake-criterion-methodology-registry-admission-review-v1';
    readonly fr108AuthorityState: 'intake_criterion_methodology_registry_admission_blocked_scan_checked_passage_authority_not_persisted';
    readonly priorCandidateMethodologyRef: typeof PRIOR_CANDIDATE_REF;
    readonly priorCandidateSourceRef: typeof HISTORICAL_PASSAGE_REF;
    readonly priorRegistryAdmissionAuthorized: false;
    readonly priorGovernedScanCheckedAuthorityPersistedInFaceRegistry: false;
    readonly priorCandidateSourceRefRewriteAuthorized: false;
    readonly fr117SchemaVersion: 'fr117-five-officers-intake-witness-qualified-page-verification-reissue-persistence-implementation-v1';
    readonly fr117AuthorityState: 'witness_qualified_reissue_relation_record_and_face_passage_persisted_downstream_authority_still_closed';
    readonly witnessQualifiedPassagePersisted: true;
    readonly derivedFaceRegistryPersisted: true;
    readonly historicalPassageRetained: true;
    readonly methodologySourceRefsChangedBefore: false;
    readonly metricBindingsIssuedBefore: 0;
    readonly thresholdsIssuedBefore: 0;
    readonly criterionStatesIssuedBefore: 0;
    readonly claimsIssuedBefore: 0;
    readonly traditionalSemanticAuthorityBefore: false;
  };
  readonly successorCandidate: FaceMethodologyDefinition & {
    readonly methodologyId: typeof CANDIDATE_METHODOLOGY_ID;
    readonly version: typeof SUCCESSOR_CANDIDATE_VERSION;
    readonly traditionalTerm: '出納官';
    readonly scope: 'static_face';
    readonly sourceRefs: readonly [typeof WITNESS_QUALIFIED_PASSAGE_REF];
    readonly reviewStatus: 'research';
  };
  readonly rebindReview: {
    readonly priorCandidateRetainedAsHistoricalReviewArtifact: true;
    readonly priorCandidateMutated: false;
    readonly successorVersionRequiredForProvenanceChange: true;
    readonly successorMethodologyRef: typeof SUCCESSOR_CANDIDATE_REF;
    readonly sourceRefChangesExactlyOne: true;
    readonly historicalSourceRefRemovedFromSuccessor: true;
    readonly witnessQualifiedSourceRefAddedToSuccessor: true;
    readonly witnessQualifiedSourceRefResolves: true;
    readonly witnessQualifiedSourceVerificationStatus: 'scan_checked';
    readonly witnessQualifiedSourceWitnessId: typeof NLC_WITNESS;
    readonly historicalPassageStillRegistered: true;
    readonly historicalPassageStillCtext: true;
    readonly fullFiveOfficersMethodologyUnchanged: true;
    readonly fullFiveOfficersMethodologyRef: typeof FULL_METHODOLOGY_REF;
    readonly intakeOfficerMappingDependencyRetained: true;
    readonly historicalCriterionDefinitionSourceRefsRetained: true;
    readonly criterionDefinitionSourceRefRewriteAuthorized: false;
    readonly successorDefinitionStructurallyValid: true;
    readonly provenancePreservingRegistryAppendProbePassed: true;
    readonly successorSourceRebindAuthorized: true;
    readonly successorDefinitionAdmitted: true;
    readonly successorRegistryAdmissionImplementationAuthorized: true;
    readonly successorPersisted: false;
  };
  readonly execution: {
    readonly methodologySourceRefsRewritten: 0;
    readonly methodologyDefinitionsPersisted: 0;
    readonly methodologyPackMutations: 0;
    readonly methodologyExecutionIssued: false;
    readonly methodologyProductionPromotionAuthorized: false;
    readonly criterionDefinitionSourceRefsRewritten: 0;
    readonly metricBindingsIssued: 0;
    readonly thresholdsIssued: 0;
    readonly morphologyProduced: false;
    readonly criterionStatesIssued: 0;
    readonly claimsIssued: 0;
    readonly traditionalFormationAuthorized: false;
    readonly traditionalSemanticAuthority: false;
  };
  readonly authorityBoundary: {
    readonly sourceRebindReviewMeansExistingCandidateMutation: false;
    readonly successorAdmissionMeansRegistryPersistenceAlreadyOccurred: false;
    readonly successorAdmissionMeansFullMethodologyReplacement: false;
    readonly successorAdmissionMeansHistoricalPassageReplacement: false;
    readonly successorAdmissionMeansCriterionDefinitionRewrite: false;
    readonly scanCheckedSourceMeansMetricBinding: false;
    readonly scanCheckedSourceMeansNumericThreshold: false;
    readonly methodologyRegistryAdmissionMeansExecution: false;
    readonly methodologyRegistryAdmissionMeansCriterionState: false;
    readonly methodologyRegistryAdmissionMeansClaim: false;
    readonly methodologyRegistryAdmissionMeansTraditionalSemantics: false;
  };
  readonly recommendedNextFrontier: 'intake_criterion_methodology_witness_qualified_registry_admission_implementation';
  readonly remainingBlockers: readonly string[];
  readonly prohibitedShortcuts: readonly string[];
}

const REQUIRED_BLOCKERS = Object.freeze([
  'witness_qualified_intake_criterion_methodology_successor_not_yet_persisted',
  'intake_criterion_definition_source_refs_still_historical',
  'intake_officer_mapping_dependency_not_re_reviewed',
  'intake_metric_to_source_concept_mapping_not_authorized',
  'intake_calibration_and_thresholds_not_authorized',
  'fr64_methodology_execution_and_claim_gates_remain',
] as const);

const REQUIRED_SHORTCUTS = Object.freeze([
  'source_rebind_review_to_existing_candidate_mutation',
  'successor_admission_to_registry_persistence_already_occurred',
  'successor_admission_to_full_methodology_replacement',
  'successor_admission_to_historical_passage_replacement',
  'successor_admission_to_criterion_definition_source_ref_rewrite',
  'scan_checked_source_to_metric_binding',
  'scan_checked_source_to_numeric_threshold',
  'methodology_registry_admission_to_execution',
  'methodology_registry_admission_to_criterion_state',
  'methodology_registry_admission_to_claim',
  'methodology_registry_admission_to_traditional_semantics',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-118 ${message}`);
}

function sameSequence<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function validateUpstream(
  persistence: FiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceImplementationFR117V1,
  priorAdmission: FiveOfficerIntakeCriterionMethodologyRegistryAdmissionReviewFR108V1,
): void {
  validateFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceImplementationFR117(persistence);
  validateFiveOfficerIntakeCriterionMethodologyRegistryAdmissionReviewFR108(priorAdmission);
  if (
    persistence.authorityState !== 'witness_qualified_reissue_relation_record_and_face_passage_persisted_downstream_authority_still_closed' ||
    persistence.persistedState.witnessQualifiedPassagePersisted !== true ||
    persistence.persistedState.derivedFaceRegistryPersisted !== true ||
    persistence.persistedState.historicalFacePassageRetained !== true ||
    persistence.persistedState.methodologySourceRefsChanged !== false ||
    persistence.execution.metricBindingsIssued !== 0 ||
    persistence.execution.thresholdsIssued !== 0 ||
    persistence.execution.criterionStatesIssued !== 0 ||
    persistence.execution.claimsIssued !== 0 ||
    persistence.execution.traditionalSemanticAuthority !== false
  ) fail('FR-117 upstream persistence authority drift.');
  if (
    priorAdmission.authorityState !== 'intake_criterion_methodology_registry_admission_blocked_scan_checked_passage_authority_not_persisted' ||
    priorAdmission.upstream.candidateMethodologyRef !== PRIOR_CANDIDATE_REF ||
    !sameSequence(priorAdmission.upstream.candidateSourceRefs, [HISTORICAL_PASSAGE_REF]) ||
    priorAdmission.admissionReview.registryAdmissionAuthorized !== false ||
    priorAdmission.admissionReview.governedScanCheckedAuthorityPersistedInFaceRegistry !== false ||
    priorAdmission.passageIdentityConstraint.candidateSourceRefRewriteAuthorized !== false ||
    priorAdmission.execution.metricBindingsIssued !== 0 ||
    priorAdmission.execution.thresholdsIssued !== 0 ||
    priorAdmission.execution.criterionStatesIssued !== 0 ||
    priorAdmission.execution.claimsIssued !== 0 ||
    priorAdmission.execution.traditionalSemanticAuthority !== false
  ) fail('FR-108 prior admission blocker snapshot drift.');
}

function inspectPersistedRegistryPrerequisites(): void {
  validateFaceAuthorityRegistry(FACE_AUTHORITY_FR117_WITNESS_QUALIFIED_RESEARCH_REGISTRY);
  const historical = FACE_AUTHORITY_FR117_WITNESS_QUALIFIED_RESEARCH_REGISTRY.passages.find(
    (passage) => passage.passageId === HISTORICAL_PASSAGE_REF,
  );
  const witnessQualified = FACE_AUTHORITY_FR117_WITNESS_QUALIFIED_RESEARCH_REGISTRY.passages.find(
    (passage) => passage.passageId === WITNESS_QUALIFIED_PASSAGE_REF,
  );
  if (
    historical === undefined || historical.witnessId !== 'witness.shenxiang_quanbian.ctext' || historical.verificationStatus !== 'unverified_ocr' ||
    witnessQualified === undefined || witnessQualified.witnessId !== NLC_WITNESS || witnessQualified.verificationStatus !== 'scan_checked' ||
    witnessQualified.originalText !== historical.originalText ||
    FR117_NLC_WITNESS_QUALIFIED_PASSAGE.passageId !== WITNESS_QUALIFIED_PASSAGE_REF
  ) fail('FR-117 persisted passage provenance prerequisite drift.');

  const fullMethodology = FACE_AUTHORITY_FR117_WITNESS_QUALIFIED_RESEARCH_REGISTRY.methodologies.find(
    (methodology) => `${methodology.methodologyId}@${methodology.version}` === FULL_METHODOLOGY_REF,
  );
  if (
    fullMethodology === undefined ||
    fullMethodology.reviewStatus !== 'research' ||
    !fullMethodology.sourceRefs.includes(HISTORICAL_PASSAGE_REF) ||
    fullMethodology.sourceRefs.includes(WITNESS_QUALIFIED_PASSAGE_REF)
  ) fail('full Five Officers methodology changed before FR-118 review.');

  const intakeCriteria = FIVE_OFFICER_CRITERIA_V0.filter((criterion) => criterion.officerKey === 'intake');
  if (
    intakeCriteria.length !== 5 ||
    !sameSequence(intakeCriteria.map((criterion) => criterion.criterionId), INTAKE_CRITERION_IDS) ||
    intakeCriteria.some((criterion) => !sameSequence(criterion.sourceRefs, [HISTORICAL_PASSAGE_REF]))
  ) fail('historical intake criterion definition sourceRefs drift.');
}

function buildSuccessorCandidate(): FiveOfficerIntakeCriterionMethodologySourceRebindPostPersistenceReviewFR118V1['successorCandidate'] {
  return Object.freeze({
    methodologyId: CANDIDATE_METHODOLOGY_ID,
    version: SUCCESSOR_CANDIDATE_VERSION,
    traditionalTerm: '出納官' as const,
    scope: 'static_face' as const,
    sourceRefs: Object.freeze([WITNESS_QUALIFIED_PASSAGE_REF]) as readonly [typeof WITNESS_QUALIFIED_PASSAGE_REF],
    description: '神相全編 出納官의 다섯 criterion을 witness-qualified NLC 1925 scan_checked passage에 명시적으로 결속한 research successor unit로 보존한다.',
    limitations: SUCCESSOR_LIMITATIONS,
    reviewStatus: 'research' as const,
  });
}

export const FR118_INTAKE_CRITERION_METHODOLOGY_WITNESS_QUALIFIED_SUCCESSOR = Object.freeze(
  buildSuccessorCandidate(),
);

function probeSuccessorRegistryAdmission(
  successor: FiveOfficerIntakeCriterionMethodologySourceRebindPostPersistenceReviewFR118V1['successorCandidate'],
): void {
  inspectPersistedRegistryPrerequisites();
  if (
    FACE_AUTHORITY_FR117_WITNESS_QUALIFIED_RESEARCH_REGISTRY.methodologies.some(
      (methodology) => `${methodology.methodologyId}@${methodology.version}` === PRIOR_CANDIDATE_REF ||
        `${methodology.methodologyId}@${methodology.version}` === SUCCESSOR_CANDIDATE_REF,
    )
  ) fail('intake criterion candidate unexpectedly already persisted.');

  const ephemeralRegistry: FaceAuthorityRegistry = Object.freeze({
    ...FACE_AUTHORITY_FR117_WITNESS_QUALIFIED_RESEARCH_REGISTRY,
    methodologies: Object.freeze([
      ...FACE_AUTHORITY_FR117_WITNESS_QUALIFIED_RESEARCH_REGISTRY.methodologies,
      successor,
    ]),
  });
  validateFaceAuthorityRegistry(ephemeralRegistry);
  const persistedProbe = ephemeralRegistry.methodologies.find(
    (methodology) => `${methodology.methodologyId}@${methodology.version}` === SUCCESSOR_CANDIDATE_REF,
  );
  if (
    persistedProbe === undefined || persistedProbe.reviewStatus !== 'research' ||
    !sameSequence(persistedProbe.sourceRefs, [WITNESS_QUALIFIED_PASSAGE_REF])
  ) fail('successor methodology registry append probe drift.');
}

export function reviewFiveOfficerIntakeCriterionMethodologySourceRebindPostPersistenceFR118(
  persistence: FiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceImplementationFR117V1,
  priorAdmission: FiveOfficerIntakeCriterionMethodologyRegistryAdmissionReviewFR108V1,
): FiveOfficerIntakeCriterionMethodologySourceRebindPostPersistenceReviewFR118V1 {
  validateUpstream(persistence, priorAdmission);
  const successor = FR118_INTAKE_CRITERION_METHODOLOGY_WITNESS_QUALIFIED_SUCCESSOR;
  probeSuccessorRegistryAdmission(successor);

  const artifact: FiveOfficerIntakeCriterionMethodologySourceRebindPostPersistenceReviewFR118V1 = Object.freeze({
    schemaVersion: 'fr118-five-officers-intake-criterion-methodology-source-rebind-post-persistence-review-v1',
    artifactVersion: '0.1.0',
    authorityState: 'witness_qualified_intake_criterion_methodology_successor_admitted_registry_persistence_not_executed',
    upstream: Object.freeze({
      fr108SchemaVersion: priorAdmission.schemaVersion,
      fr108AuthorityState: priorAdmission.authorityState,
      priorCandidateMethodologyRef: PRIOR_CANDIDATE_REF,
      priorCandidateSourceRef: HISTORICAL_PASSAGE_REF,
      priorRegistryAdmissionAuthorized: false,
      priorGovernedScanCheckedAuthorityPersistedInFaceRegistry: false,
      priorCandidateSourceRefRewriteAuthorized: false,
      fr117SchemaVersion: persistence.schemaVersion,
      fr117AuthorityState: persistence.authorityState,
      witnessQualifiedPassagePersisted: true,
      derivedFaceRegistryPersisted: true,
      historicalPassageRetained: true,
      methodologySourceRefsChangedBefore: false,
      metricBindingsIssuedBefore: 0,
      thresholdsIssuedBefore: 0,
      criterionStatesIssuedBefore: 0,
      claimsIssuedBefore: 0,
      traditionalSemanticAuthorityBefore: false,
    }),
    successorCandidate: successor,
    rebindReview: Object.freeze({
      priorCandidateRetainedAsHistoricalReviewArtifact: true as const,
      priorCandidateMutated: false as const,
      successorVersionRequiredForProvenanceChange: true as const,
      successorMethodologyRef: SUCCESSOR_CANDIDATE_REF,
      sourceRefChangesExactlyOne: true as const,
      historicalSourceRefRemovedFromSuccessor: true as const,
      witnessQualifiedSourceRefAddedToSuccessor: true as const,
      witnessQualifiedSourceRefResolves: true as const,
      witnessQualifiedSourceVerificationStatus: 'scan_checked' as const,
      witnessQualifiedSourceWitnessId: NLC_WITNESS,
      historicalPassageStillRegistered: true as const,
      historicalPassageStillCtext: true as const,
      fullFiveOfficersMethodologyUnchanged: true as const,
      fullFiveOfficersMethodologyRef: FULL_METHODOLOGY_REF,
      intakeOfficerMappingDependencyRetained: true as const,
      historicalCriterionDefinitionSourceRefsRetained: true as const,
      criterionDefinitionSourceRefRewriteAuthorized: false as const,
      successorDefinitionStructurallyValid: true as const,
      provenancePreservingRegistryAppendProbePassed: true as const,
      successorSourceRebindAuthorized: true as const,
      successorDefinitionAdmitted: true as const,
      successorRegistryAdmissionImplementationAuthorized: true as const,
      successorPersisted: false as const,
    }),
    execution: Object.freeze({
      methodologySourceRefsRewritten: 0 as const,
      methodologyDefinitionsPersisted: 0 as const,
      methodologyPackMutations: 0 as const,
      methodologyExecutionIssued: false as const,
      methodologyProductionPromotionAuthorized: false as const,
      criterionDefinitionSourceRefsRewritten: 0 as const,
      metricBindingsIssued: 0 as const,
      thresholdsIssued: 0 as const,
      morphologyProduced: false as const,
      criterionStatesIssued: 0 as const,
      claimsIssued: 0 as const,
      traditionalFormationAuthorized: false as const,
      traditionalSemanticAuthority: false as const,
    }),
    authorityBoundary: Object.freeze({
      sourceRebindReviewMeansExistingCandidateMutation: false as const,
      successorAdmissionMeansRegistryPersistenceAlreadyOccurred: false as const,
      successorAdmissionMeansFullMethodologyReplacement: false as const,
      successorAdmissionMeansHistoricalPassageReplacement: false as const,
      successorAdmissionMeansCriterionDefinitionRewrite: false as const,
      scanCheckedSourceMeansMetricBinding: false as const,
      scanCheckedSourceMeansNumericThreshold: false as const,
      methodologyRegistryAdmissionMeansExecution: false as const,
      methodologyRegistryAdmissionMeansCriterionState: false as const,
      methodologyRegistryAdmissionMeansClaim: false as const,
      methodologyRegistryAdmissionMeansTraditionalSemantics: false as const,
    }),
    recommendedNextFrontier: 'intake_criterion_methodology_witness_qualified_registry_admission_implementation',
    remainingBlockers: REQUIRED_BLOCKERS,
    prohibitedShortcuts: REQUIRED_SHORTCUTS,
  });
  return validateFiveOfficerIntakeCriterionMethodologySourceRebindPostPersistenceReviewFR118(artifact);
}

export function validateFiveOfficerIntakeCriterionMethodologySourceRebindPostPersistenceReviewFR118(
  artifact: FiveOfficerIntakeCriterionMethodologySourceRebindPostPersistenceReviewFR118V1,
): FiveOfficerIntakeCriterionMethodologySourceRebindPostPersistenceReviewFR118V1 {
  if (
    artifact.schemaVersion !== 'fr118-five-officers-intake-criterion-methodology-source-rebind-post-persistence-review-v1' ||
    artifact.artifactVersion !== '0.1.0' ||
    artifact.authorityState !== 'witness_qualified_intake_criterion_methodology_successor_admitted_registry_persistence_not_executed'
  ) fail('schema or authority state drift.');
  if (
    artifact.upstream.fr108SchemaVersion !== 'fr108-five-officers-intake-criterion-methodology-registry-admission-review-v1' ||
    artifact.upstream.fr108AuthorityState !== 'intake_criterion_methodology_registry_admission_blocked_scan_checked_passage_authority_not_persisted' ||
    artifact.upstream.priorCandidateMethodologyRef !== PRIOR_CANDIDATE_REF ||
    artifact.upstream.priorCandidateSourceRef !== HISTORICAL_PASSAGE_REF ||
    artifact.upstream.priorRegistryAdmissionAuthorized !== false ||
    artifact.upstream.priorGovernedScanCheckedAuthorityPersistedInFaceRegistry !== false ||
    artifact.upstream.priorCandidateSourceRefRewriteAuthorized !== false ||
    artifact.upstream.fr117SchemaVersion !== 'fr117-five-officers-intake-witness-qualified-page-verification-reissue-persistence-implementation-v1' ||
    artifact.upstream.fr117AuthorityState !== 'witness_qualified_reissue_relation_record_and_face_passage_persisted_downstream_authority_still_closed' ||
    artifact.upstream.witnessQualifiedPassagePersisted !== true ||
    artifact.upstream.derivedFaceRegistryPersisted !== true ||
    artifact.upstream.historicalPassageRetained !== true ||
    artifact.upstream.methodologySourceRefsChangedBefore !== false ||
    artifact.upstream.metricBindingsIssuedBefore !== 0 ||
    artifact.upstream.thresholdsIssuedBefore !== 0 ||
    artifact.upstream.criterionStatesIssuedBefore !== 0 ||
    artifact.upstream.claimsIssuedBefore !== 0 ||
    artifact.upstream.traditionalSemanticAuthorityBefore !== false
  ) fail('upstream boundary drift.');
  if (
    artifact.successorCandidate.methodologyId !== CANDIDATE_METHODOLOGY_ID ||
    artifact.successorCandidate.version !== SUCCESSOR_CANDIDATE_VERSION ||
    artifact.successorCandidate.traditionalTerm !== '出納官' ||
    artifact.successorCandidate.scope !== 'static_face' ||
    artifact.successorCandidate.reviewStatus !== 'research' ||
    !sameSequence(artifact.successorCandidate.sourceRefs, [WITNESS_QUALIFIED_PASSAGE_REF])
  ) fail('successor candidate drift.');
  if (
    artifact.rebindReview.priorCandidateRetainedAsHistoricalReviewArtifact !== true ||
    artifact.rebindReview.priorCandidateMutated !== false ||
    artifact.rebindReview.successorVersionRequiredForProvenanceChange !== true ||
    artifact.rebindReview.successorMethodologyRef !== SUCCESSOR_CANDIDATE_REF ||
    artifact.rebindReview.sourceRefChangesExactlyOne !== true ||
    artifact.rebindReview.historicalSourceRefRemovedFromSuccessor !== true ||
    artifact.rebindReview.witnessQualifiedSourceRefAddedToSuccessor !== true ||
    artifact.rebindReview.witnessQualifiedSourceRefResolves !== true ||
    artifact.rebindReview.witnessQualifiedSourceVerificationStatus !== 'scan_checked' ||
    artifact.rebindReview.witnessQualifiedSourceWitnessId !== NLC_WITNESS ||
    artifact.rebindReview.historicalPassageStillRegistered !== true ||
    artifact.rebindReview.historicalPassageStillCtext !== true ||
    artifact.rebindReview.fullFiveOfficersMethodologyUnchanged !== true ||
    artifact.rebindReview.fullFiveOfficersMethodologyRef !== FULL_METHODOLOGY_REF ||
    artifact.rebindReview.intakeOfficerMappingDependencyRetained !== true ||
    artifact.rebindReview.historicalCriterionDefinitionSourceRefsRetained !== true ||
    artifact.rebindReview.criterionDefinitionSourceRefRewriteAuthorized !== false ||
    artifact.rebindReview.successorDefinitionStructurallyValid !== true ||
    artifact.rebindReview.provenancePreservingRegistryAppendProbePassed !== true ||
    artifact.rebindReview.successorSourceRebindAuthorized !== true ||
    artifact.rebindReview.successorDefinitionAdmitted !== true ||
    artifact.rebindReview.successorRegistryAdmissionImplementationAuthorized !== true ||
    artifact.rebindReview.successorPersisted !== false
  ) fail('source rebind review drift.');
  if (
    artifact.execution.methodologySourceRefsRewritten !== 0 ||
    artifact.execution.methodologyDefinitionsPersisted !== 0 ||
    artifact.execution.methodologyPackMutations !== 0 ||
    artifact.execution.methodologyExecutionIssued !== false ||
    artifact.execution.methodologyProductionPromotionAuthorized !== false ||
    artifact.execution.criterionDefinitionSourceRefsRewritten !== 0 ||
    artifact.execution.metricBindingsIssued !== 0 ||
    artifact.execution.thresholdsIssued !== 0 ||
    artifact.execution.morphologyProduced !== false ||
    artifact.execution.criterionStatesIssued !== 0 ||
    artifact.execution.claimsIssued !== 0 ||
    artifact.execution.traditionalFormationAuthorized !== false ||
    artifact.execution.traditionalSemanticAuthority !== false
  ) fail('execution boundary drift.');
  if (
    artifact.authorityBoundary.sourceRebindReviewMeansExistingCandidateMutation !== false ||
    artifact.authorityBoundary.successorAdmissionMeansRegistryPersistenceAlreadyOccurred !== false ||
    artifact.authorityBoundary.successorAdmissionMeansFullMethodologyReplacement !== false ||
    artifact.authorityBoundary.successorAdmissionMeansHistoricalPassageReplacement !== false ||
    artifact.authorityBoundary.successorAdmissionMeansCriterionDefinitionRewrite !== false ||
    artifact.authorityBoundary.scanCheckedSourceMeansMetricBinding !== false ||
    artifact.authorityBoundary.scanCheckedSourceMeansNumericThreshold !== false ||
    artifact.authorityBoundary.methodologyRegistryAdmissionMeansExecution !== false ||
    artifact.authorityBoundary.methodologyRegistryAdmissionMeansCriterionState !== false ||
    artifact.authorityBoundary.methodologyRegistryAdmissionMeansClaim !== false ||
    artifact.authorityBoundary.methodologyRegistryAdmissionMeansTraditionalSemantics !== false
  ) fail('authority boundary drift.');
  if (
    artifact.recommendedNextFrontier !== 'intake_criterion_methodology_witness_qualified_registry_admission_implementation' ||
    !sameSequence(artifact.remainingBlockers, REQUIRED_BLOCKERS) ||
    !sameSequence(artifact.prohibitedShortcuts, REQUIRED_SHORTCUTS)
  ) fail('frontier/blocker/shortcut drift.');
  return artifact;
}
