import {
  FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0,
  validateDirectSourceVerificationRegistry,
  type DirectSourcePageVerificationRecord,
  type DirectSourceVerificationRelation,
  type DirectSourceVerificationRegistry,
} from './direct-source-verification.js';
import {
  FR104_NLC_1925_INTAKE_CANDIDATE,
  FR104_NLC_INTAKE_PAGE_VERIFICATION,
} from './five-officers-mouth-direct-source-page-verification-fr104.js';
import {
  validateDirectSourceVerificationReissueLineageExtensionImplementationFR114,
  type DirectSourceVerificationReissueLineageExtensionImplementationFR114V1,
} from './direct-source-verification-reissue-lineage-extension-implementation-fr114.js';
import { FaceAuthorityValidationError } from './validation.js';

const ORIGINAL_VERIFICATION_REF = 'verification.shenxiang_nlc_1925.intake@0.1.0' as const;
const PROPOSED_VERIFICATION_REF = 'verification.shenxiang_nlc_1925.intake.witness_qualified@0.1.0' as const;
const HISTORICAL_PASSAGE_REF = 'passage.shenxiang.five_officers.intake' as const;
const WITNESS_QUALIFIED_PASSAGE_REF = 'passage.shenxiang.five_officers.intake.nlc_1925' as const;
const RELATION_ID = 'verification-lineage.shenxiang_nlc_1925.intake.witness_qualified' as const;

export interface FiveOfficerIntakeWitnessQualifiedPageVerificationReissuePostLineageAdmissionReviewFR115V1 {
  readonly schemaVersion: 'fr115-five-officers-intake-witness-qualified-page-verification-reissue-post-lineage-admission-review-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'witness_qualified_page_verification_reissue_admitted_core_lineage_available_persistence_not_executed';
  readonly upstream: {
    readonly fr114SchemaVersion: 'fr114-direct-source-verification-reissue-lineage-extension-implementation-v1';
    readonly fr114AuthorityState: 'core_registry_relation_extension_implemented_reissue_still_not_authorized';
    readonly coreRelationExtensionImplemented: true;
    readonly coreRelationValidatorImplemented: true;
    readonly targetRelationPersistedBefore: false;
    readonly targetReissueRecordPersistedBefore: false;
    readonly verificationRelationsPersistedBefore: 0;
    readonly verificationRecordsPersistedBefore: 0;
    readonly passagesPersistedBefore: 0;
    readonly traditionalSemanticAuthorityBefore: false;
  };
  readonly target: {
    readonly originalVerificationRef: typeof ORIGINAL_VERIFICATION_REF;
    readonly proposedVerificationRef: typeof PROPOSED_VERIFICATION_REF;
    readonly originalPassageId: typeof HISTORICAL_PASSAGE_REF;
    readonly proposedPassageId: typeof WITNESS_QUALIFIED_PASSAGE_REF;
    readonly relationId: typeof RELATION_ID;
    readonly relationKind: 'non_independent_identity_reissue';
  };
  readonly admissionReview: {
    readonly priorMissingLineageBlockerResolved: true;
    readonly machineReadableCoreRelationAvailable: true;
    readonly targetEphemeralRegistryValidationPassed: true;
    readonly originalVerificationRetained: true;
    readonly proposedVerificationDistinct: true;
    readonly proposedPassageDistinct: true;
    readonly sameCandidate: true;
    readonly sameWitness: true;
    readonly sameChapterAndPage: true;
    readonly sameOriginalText: true;
    readonly sameVisualEvidenceRefs: true;
    readonly sameCheckerRefs: true;
    readonly sameVerificationState: true;
    readonly exactEvidenceReuseEnforced: true;
    readonly sameCheckingEventEnforced: true;
    readonly independentVerificationDelta: 0;
    readonly childMayCountAsIndependentVerification: false;
    readonly semanticIdentityEquivalenceAsserted: false;
    readonly verificationReissueAdmissionAuthorized: true;
    readonly persistenceReviewAuthorized: true;
    readonly targetRelationPersistenceAuthorized: false;
    readonly targetVerificationRecordPersistenceAuthorized: false;
    readonly targetPassagePersistenceAuthorized: false;
  };
  readonly execution: {
    readonly verificationRelationsPersisted: 0;
    readonly verificationRecordsReissued: 0;
    readonly verificationRecordsPersisted: 0;
    readonly passagesPersisted: 0;
    readonly faceRegistryChanged: false;
    readonly methodologySourceRefsRewritten: 0;
    readonly methodologyDefinitionsPersisted: 0;
    readonly methodologyExecutionIssued: false;
    readonly metricBindingsIssued: 0;
    readonly thresholdsIssued: 0;
    readonly criterionStatesIssued: 0;
    readonly claimsIssued: 0;
    readonly traditionalSemanticAuthority: false;
  };
  readonly authorityBoundary: {
    readonly reissueAdmissionMeansPersistenceAuthority: false;
    readonly persistenceReviewAuthorityMeansPersistenceExecution: false;
    readonly relationMeansNewCheckingEvent: false;
    readonly relationMayIncreaseIndependentVerificationCount: false;
    readonly reissueMeansSemanticIdentityEquivalence: false;
    readonly reissueAdmissionMeansMethodologySourceRefRewrite: false;
    readonly reissueAdmissionMeansMetricBinding: false;
    readonly reissueAdmissionMeansThreshold: false;
    readonly reissueAdmissionMeansTraditionalSemantics: false;
  };
  readonly recommendedNextFrontier: 'intake_witness_qualified_page_verification_reissue_persistence_review';
  readonly remainingBlockers: readonly string[];
  readonly prohibitedShortcuts: readonly string[];
}

const REQUIRED_BLOCKERS = Object.freeze([
  'witness_qualified_page_verification_reissue_not_persisted',
  'witness_qualified_intake_passage_not_persisted_in_face_registry',
  'intake_criterion_methodology_source_ref_rewrite_not_authorized',
  'intake_criterion_methodology_not_registered',
  'intake_officer_mapping_dependency_not_re_reviewed',
  'intake_metric_to_source_concept_mapping_not_authorized',
  'intake_calibration_and_thresholds_not_authorized',
  'fr64_methodology_execution_and_claim_gates_remain',
] as const);

const REQUIRED_SHORTCUTS = Object.freeze([
  'reissue_admission_to_persistence_authority',
  'persistence_review_authority_to_persistence_execution',
  'relation_to_new_checking_event',
  'relation_to_independent_verification_increment',
  'reissue_to_semantic_identity_equivalence',
  'reissue_admission_to_methodology_source_ref_rewrite',
  'reissue_admission_to_metric_binding',
  'reissue_admission_to_numeric_threshold',
  'reissue_admission_to_traditional_semantics',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-115 ${message}`);
}

function sameSequence<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function buildProposedReissue(): DirectSourcePageVerificationRecord {
  const source: DirectSourcePageVerificationRecord = FR104_NLC_INTAKE_PAGE_VERIFICATION;
  return Object.freeze({
    verificationId: 'verification.shenxiang_nlc_1925.intake.witness_qualified',
    version: source.version,
    candidateRef: source.candidateRef,
    witnessId: source.witnessId,
    passageId: WITNESS_QUALIFIED_PASSAGE_REF,
    chapter: source.chapter,
    scanPage: source.scanPage,
    ...(source.printedPage === undefined ? {} : { printedPage: source.printedPage }),
    originalText: source.originalText,
    visualEvidenceRefs: source.visualEvidenceRefs,
    checkerRefs: source.checkerRefs,
    state: source.state,
    mayPromoteOtherWitness: false,
  });
}

function buildRelation(): DirectSourceVerificationRelation {
  return Object.freeze({
    relationId: RELATION_ID,
    version: '0.1.0',
    kind: 'non_independent_identity_reissue',
    parentVerificationRef: ORIGINAL_VERIFICATION_REF,
    childVerificationRef: PROPOSED_VERIFICATION_REF,
    parentRetained: true,
    evidenceReusePolicy: 'exact_evidence_reuse_required',
    checkingEventPolicy: 'same_checker_refs_same_checking_event',
    allowedRecordDifferences: ['verificationId', 'passageId'] as const,
    lineageDepthPolicy: 'single_hop_parent_root',
    independentVerificationDelta: 0,
    childMayCountAsIndependentVerification: false,
  });
}

function validateTargetEphemeralRegistry(): void {
  const child = buildProposedReissue();
  const relation = buildRelation();
  const registry: DirectSourceVerificationRegistry = {
    registryId: 'direct-source-verification.face.fr115_reissue_admission_probe',
    version: '0.1.0',
    candidates: [...FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.candidates, FR104_NLC_1925_INTAKE_CANDIDATE],
    pageVerifications: [
      ...FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.pageVerifications,
      FR104_NLC_INTAKE_PAGE_VERIFICATION,
      child,
    ],
    verificationRelations: [relation],
  };
  validateDirectSourceVerificationRegistry(registry);
}

export function reviewFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePostLineageAdmissionFR115(
  source: DirectSourceVerificationReissueLineageExtensionImplementationFR114V1,
): FiveOfficerIntakeWitnessQualifiedPageVerificationReissuePostLineageAdmissionReviewFR115V1 {
  validateDirectSourceVerificationReissueLineageExtensionImplementationFR114(source);
  if (
    source.authorityState !== 'core_registry_relation_extension_implemented_reissue_still_not_authorized' ||
    source.implementation.coreExtensionImplemented !== true ||
    source.execution.coreRelationValidatorImplemented !== true ||
    source.implementation.targetRelationPersisted !== false ||
    source.implementation.targetReissueRecordPersisted !== false ||
    source.execution.verificationRelationsPersisted !== 0 ||
    source.execution.verificationRecordsPersisted !== 0 ||
    source.execution.passagesPersisted !== 0 ||
    source.execution.traditionalSemanticAuthority !== false
  ) fail('FR-114 upstream authority drift.');

  validateTargetEphemeralRegistry();

  const artifact: FiveOfficerIntakeWitnessQualifiedPageVerificationReissuePostLineageAdmissionReviewFR115V1 = Object.freeze({
    schemaVersion: 'fr115-five-officers-intake-witness-qualified-page-verification-reissue-post-lineage-admission-review-v1',
    artifactVersion: '0.1.0',
    authorityState: 'witness_qualified_page_verification_reissue_admitted_core_lineage_available_persistence_not_executed',
    upstream: Object.freeze({
      fr114SchemaVersion: source.schemaVersion,
      fr114AuthorityState: source.authorityState,
      coreRelationExtensionImplemented: true,
      coreRelationValidatorImplemented: true,
      targetRelationPersistedBefore: false,
      targetReissueRecordPersistedBefore: false,
      verificationRelationsPersistedBefore: 0,
      verificationRecordsPersistedBefore: 0,
      passagesPersistedBefore: 0,
      traditionalSemanticAuthorityBefore: false,
    }),
    target: Object.freeze({
      originalVerificationRef: ORIGINAL_VERIFICATION_REF,
      proposedVerificationRef: PROPOSED_VERIFICATION_REF,
      originalPassageId: HISTORICAL_PASSAGE_REF,
      proposedPassageId: WITNESS_QUALIFIED_PASSAGE_REF,
      relationId: RELATION_ID,
      relationKind: 'non_independent_identity_reissue',
    }),
    admissionReview: Object.freeze({
      priorMissingLineageBlockerResolved: true,
      machineReadableCoreRelationAvailable: true,
      targetEphemeralRegistryValidationPassed: true,
      originalVerificationRetained: true,
      proposedVerificationDistinct: true,
      proposedPassageDistinct: true,
      sameCandidate: true,
      sameWitness: true,
      sameChapterAndPage: true,
      sameOriginalText: true,
      sameVisualEvidenceRefs: true,
      sameCheckerRefs: true,
      sameVerificationState: true,
      exactEvidenceReuseEnforced: true,
      sameCheckingEventEnforced: true,
      independentVerificationDelta: 0,
      childMayCountAsIndependentVerification: false,
      semanticIdentityEquivalenceAsserted: false,
      verificationReissueAdmissionAuthorized: true,
      persistenceReviewAuthorized: true,
      targetRelationPersistenceAuthorized: false,
      targetVerificationRecordPersistenceAuthorized: false,
      targetPassagePersistenceAuthorized: false,
    }),
    execution: Object.freeze({
      verificationRelationsPersisted: 0,
      verificationRecordsReissued: 0,
      verificationRecordsPersisted: 0,
      passagesPersisted: 0,
      faceRegistryChanged: false,
      methodologySourceRefsRewritten: 0,
      methodologyDefinitionsPersisted: 0,
      methodologyExecutionIssued: false,
      metricBindingsIssued: 0,
      thresholdsIssued: 0,
      criterionStatesIssued: 0,
      claimsIssued: 0,
      traditionalSemanticAuthority: false,
    }),
    authorityBoundary: Object.freeze({
      reissueAdmissionMeansPersistenceAuthority: false,
      persistenceReviewAuthorityMeansPersistenceExecution: false,
      relationMeansNewCheckingEvent: false,
      relationMayIncreaseIndependentVerificationCount: false,
      reissueMeansSemanticIdentityEquivalence: false,
      reissueAdmissionMeansMethodologySourceRefRewrite: false,
      reissueAdmissionMeansMetricBinding: false,
      reissueAdmissionMeansThreshold: false,
      reissueAdmissionMeansTraditionalSemantics: false,
    }),
    recommendedNextFrontier: 'intake_witness_qualified_page_verification_reissue_persistence_review',
    remainingBlockers: REQUIRED_BLOCKERS,
    prohibitedShortcuts: REQUIRED_SHORTCUTS,
  });

  return validateFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePostLineageAdmissionReviewFR115(artifact);
}

export function validateFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePostLineageAdmissionReviewFR115(
  artifact: FiveOfficerIntakeWitnessQualifiedPageVerificationReissuePostLineageAdmissionReviewFR115V1,
): FiveOfficerIntakeWitnessQualifiedPageVerificationReissuePostLineageAdmissionReviewFR115V1 {
  if (
    artifact.schemaVersion !== 'fr115-five-officers-intake-witness-qualified-page-verification-reissue-post-lineage-admission-review-v1' ||
    artifact.artifactVersion !== '0.1.0' ||
    artifact.authorityState !== 'witness_qualified_page_verification_reissue_admitted_core_lineage_available_persistence_not_executed'
  ) fail('schema or authority state drift.');
  if (
    artifact.upstream.fr114SchemaVersion !== 'fr114-direct-source-verification-reissue-lineage-extension-implementation-v1' ||
    artifact.upstream.fr114AuthorityState !== 'core_registry_relation_extension_implemented_reissue_still_not_authorized' ||
    artifact.upstream.coreRelationExtensionImplemented !== true ||
    artifact.upstream.coreRelationValidatorImplemented !== true ||
    artifact.upstream.targetRelationPersistedBefore !== false ||
    artifact.upstream.targetReissueRecordPersistedBefore !== false ||
    artifact.upstream.verificationRelationsPersistedBefore !== 0 ||
    artifact.upstream.verificationRecordsPersistedBefore !== 0 ||
    artifact.upstream.passagesPersistedBefore !== 0 ||
    artifact.upstream.traditionalSemanticAuthorityBefore !== false
  ) fail('upstream boundary drift.');
  if (
    artifact.target.originalVerificationRef !== ORIGINAL_VERIFICATION_REF ||
    artifact.target.proposedVerificationRef !== PROPOSED_VERIFICATION_REF ||
    artifact.target.originalPassageId !== HISTORICAL_PASSAGE_REF ||
    artifact.target.proposedPassageId !== WITNESS_QUALIFIED_PASSAGE_REF ||
    artifact.target.relationId !== RELATION_ID ||
    artifact.target.relationKind !== 'non_independent_identity_reissue'
  ) fail('target identity drift.');
  if (
    artifact.admissionReview.priorMissingLineageBlockerResolved !== true ||
    artifact.admissionReview.machineReadableCoreRelationAvailable !== true ||
    artifact.admissionReview.targetEphemeralRegistryValidationPassed !== true ||
    artifact.admissionReview.originalVerificationRetained !== true ||
    artifact.admissionReview.proposedVerificationDistinct !== true ||
    artifact.admissionReview.proposedPassageDistinct !== true ||
    artifact.admissionReview.sameCandidate !== true ||
    artifact.admissionReview.sameWitness !== true ||
    artifact.admissionReview.sameChapterAndPage !== true ||
    artifact.admissionReview.sameOriginalText !== true ||
    artifact.admissionReview.sameVisualEvidenceRefs !== true ||
    artifact.admissionReview.sameCheckerRefs !== true ||
    artifact.admissionReview.sameVerificationState !== true ||
    artifact.admissionReview.exactEvidenceReuseEnforced !== true ||
    artifact.admissionReview.sameCheckingEventEnforced !== true ||
    artifact.admissionReview.independentVerificationDelta !== 0 ||
    artifact.admissionReview.childMayCountAsIndependentVerification !== false ||
    artifact.admissionReview.semanticIdentityEquivalenceAsserted !== false ||
    artifact.admissionReview.verificationReissueAdmissionAuthorized !== true ||
    artifact.admissionReview.persistenceReviewAuthorized !== true ||
    artifact.admissionReview.targetRelationPersistenceAuthorized !== false ||
    artifact.admissionReview.targetVerificationRecordPersistenceAuthorized !== false ||
    artifact.admissionReview.targetPassagePersistenceAuthorized !== false
  ) fail('admission boundary drift.');
  if (
    artifact.execution.verificationRelationsPersisted !== 0 ||
    artifact.execution.verificationRecordsReissued !== 0 ||
    artifact.execution.verificationRecordsPersisted !== 0 ||
    artifact.execution.passagesPersisted !== 0 ||
    artifact.execution.faceRegistryChanged !== false ||
    artifact.execution.methodologySourceRefsRewritten !== 0 ||
    artifact.execution.methodologyDefinitionsPersisted !== 0 ||
    artifact.execution.methodologyExecutionIssued !== false ||
    artifact.execution.metricBindingsIssued !== 0 ||
    artifact.execution.thresholdsIssued !== 0 ||
    artifact.execution.criterionStatesIssued !== 0 ||
    artifact.execution.claimsIssued !== 0 ||
    artifact.execution.traditionalSemanticAuthority !== false
  ) fail('execution boundary drift.');
  if (
    Object.values(artifact.authorityBoundary).some((value) => value !== false) ||
    artifact.recommendedNextFrontier !== 'intake_witness_qualified_page_verification_reissue_persistence_review' ||
    !sameSequence(artifact.remainingBlockers, REQUIRED_BLOCKERS) ||
    !sameSequence(artifact.prohibitedShortcuts, REQUIRED_SHORTCUTS)
  ) fail('authority boundary, blocker, shortcut, or next-frontier drift.');
  validateTargetEphemeralRegistry();
  return artifact;
}
