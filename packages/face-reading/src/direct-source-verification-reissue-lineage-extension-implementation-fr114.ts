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
  reviewDirectSourceVerificationReissueLineageExtensionAdmissionFR113,
  validateDirectSourceVerificationReissueLineageExtensionAdmissionReviewFR113,
  type DirectSourceVerificationReissueLineageExtensionAdmissionReviewFR113V1,
} from './direct-source-verification-reissue-lineage-extension-admission-review-fr113.js';
import { FaceAuthorityValidationError } from './validation.js';

const ORIGINAL_VERIFICATION_REF = 'verification.shenxiang_nlc_1925.intake@0.1.0' as const;
const PROPOSED_VERIFICATION_REF = 'verification.shenxiang_nlc_1925.intake.witness_qualified@0.1.0' as const;
const WITNESS_QUALIFIED_PASSAGE_REF = 'passage.shenxiang.five_officers.intake.nlc_1925' as const;

export interface DirectSourceVerificationReissueLineageExtensionImplementationFR114V1 {
  readonly schemaVersion: 'fr114-direct-source-verification-reissue-lineage-extension-implementation-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'core_registry_relation_extension_implemented_reissue_still_not_authorized';
  readonly upstream: {
    readonly fr113SchemaVersion: 'fr113-direct-source-verification-reissue-lineage-extension-admission-review-v1';
    readonly fr113AuthorityState: 'additive_registry_relation_extension_admitted_for_implementation_core_unmodified';
    readonly coreExtensionImplementationAuthorized: true;
    readonly verificationReissueAdmissionAuthorizedBefore: false;
    readonly verificationRelationsPersistedBefore: 0;
    readonly verificationRecordsPersistedBefore: 0;
    readonly passagesPersistedBefore: 0;
    readonly traditionalSemanticAuthorityBefore: false;
  };
  readonly implementation: {
    readonly registryRelationFieldName: 'verificationRelations';
    readonly registryRelationFieldOptional: true;
    readonly pageRecordInlineLineageAdded: false;
    readonly legacyRegistryObjectShapePreserved: true;
    readonly legacyRegistryValidationPassed: true;
    readonly boundedCoreRelationValidationPassed: true;
    readonly parentAndChildResolutionEnforced: true;
    readonly singleParentPerChildEnforced: true;
    readonly singleHopParentRootEnforced: true;
    readonly exactEvidenceReuseEnforced: true;
    readonly sameCheckingEventEnforced: true;
    readonly independentVerificationDeltaFixedAtZero: true;
    readonly childMayCountAsIndependentVerification: false;
    readonly coreExtensionImplemented: true;
    readonly targetRelationPersisted: false;
    readonly targetReissueRecordPersisted: false;
  };
  readonly execution: {
    readonly directSourceRegistrySchemaChanges: 1;
    readonly coreRelationValidatorImplemented: true;
    readonly verificationRelationsPersisted: 0;
    readonly verificationRecordsReissued: 0;
    readonly verificationRecordsPersisted: 0;
    readonly passagesPersisted: 0;
    readonly faceRegistryChanged: false;
    readonly methodologySourceRefsRewritten: 0;
    readonly methodologyDefinitionsPersisted: 0;
    readonly metricBindingsIssued: 0;
    readonly thresholdsIssued: 0;
    readonly criterionStatesIssued: 0;
    readonly claimsIssued: 0;
    readonly traditionalSemanticAuthority: false;
  };
  readonly authorityBoundary: {
    readonly coreExtensionImplementationMeansReissueAuthority: false;
    readonly ephemeralTargetValidationMeansPersistenceAuthority: false;
    readonly relationMeansNewCheckingEvent: false;
    readonly relationMayIncreaseIndependentVerificationCount: false;
    readonly relationMeansPassagePersistence: false;
    readonly relationMeansSemanticIdentityEquivalence: false;
    readonly relationMeansMethodologySourceRefRewrite: false;
    readonly relationMeansMetricBinding: false;
    readonly relationMeansThreshold: false;
    readonly relationMeansTraditionalSemantics: false;
  };
  readonly recommendedNextFrontier: 'intake_witness_qualified_page_verification_reissue_post_lineage_admission_review';
  readonly remainingBlockers: readonly string[];
  readonly prohibitedShortcuts: readonly string[];
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
  'core_extension_implementation_to_reissue_authority',
  'ephemeral_target_validation_to_persistence_authority',
  'relation_to_new_checking_event',
  'relation_to_independent_verification_increment',
  'relation_to_persistent_passage',
  'relation_to_semantic_identity_equivalence',
  'relation_to_methodology_source_ref_rewrite',
  'relation_to_metric_binding',
  'relation_to_numeric_threshold',
  'relation_to_traditional_semantics',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-114 ${message}`);
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

function buildTargetRelation(): DirectSourceVerificationRelation {
  return Object.freeze({
    relationId: 'verification-lineage.shenxiang_nlc_1925.intake.witness_qualified',
    version: '0.1.0',
    kind: 'non_independent_identity_reissue',
    parentVerificationRef: ORIGINAL_VERIFICATION_REF,
    childVerificationRef: PROPOSED_VERIFICATION_REF,
    parentRetained: true,
    evidenceReusePolicy: 'exact_evidence_reuse_required',
    checkingEventPolicy: 'same_checker_refs_same_checking_event',
    allowedRecordDifferences: ['verificationId', 'passageId'],
    lineageDepthPolicy: 'single_hop_parent_root',
    independentVerificationDelta: 0,
    childMayCountAsIndependentVerification: false,
  });
}

function validateCoreImplementation(): void {
  validateDirectSourceVerificationRegistry(FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0);
  const legacyRegistry = FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0 as DirectSourceVerificationRegistry & Record<string, unknown>;
  const page = FR104_NLC_INTAKE_PAGE_VERIFICATION as DirectSourcePageVerificationRecord & Record<string, unknown>;
  if (Object.prototype.hasOwnProperty.call(legacyRegistry, 'verificationRelations')) {
    fail('legacy registry object shape must remain unchanged by optional relation extension.');
  }
  if ('reissuedFromVerificationRef' in page || 'supersedesVerificationRef' in page) {
    fail('page verification record must not gain inline reissue lineage.');
  }

  const child = buildProposedReissue();
  const relation = buildTargetRelation();
  const probe: DirectSourceVerificationRegistry = {
    registryId: 'direct-source-verification.face.fr114_core_implementation_probe',
    version: '0.1.0',
    candidates: [...FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.candidates, FR104_NLC_1925_INTAKE_CANDIDATE],
    pageVerifications: [
      ...FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.pageVerifications,
      FR104_NLC_INTAKE_PAGE_VERIFICATION,
      child,
    ],
    verificationRelations: [relation],
  };
  validateDirectSourceVerificationRegistry(probe);
}

function validateUpstream(source: DirectSourceVerificationReissueLineageExtensionAdmissionReviewFR113V1): void {
  validateDirectSourceVerificationReissueLineageExtensionAdmissionReviewFR113(source);
  if (
    source.schemaVersion !== 'fr113-direct-source-verification-reissue-lineage-extension-admission-review-v1' ||
    source.authorityState !== 'additive_registry_relation_extension_admitted_for_implementation_core_unmodified' ||
    source.admissionReview.coreExtensionImplementationAuthorized !== true ||
    source.admissionReview.verificationReissueAdmissionAuthorized !== false ||
    source.execution.verificationRelationsPersisted !== 0 ||
    source.execution.verificationRecordsPersisted !== 0 ||
    source.execution.passagesPersisted !== 0 ||
    source.execution.traditionalSemanticAuthority !== false
  ) fail('FR-113 upstream authority drift.');
}

export function implementDirectSourceVerificationReissueLineageExtensionFR114(
  source: DirectSourceVerificationReissueLineageExtensionAdmissionReviewFR113V1,
): DirectSourceVerificationReissueLineageExtensionImplementationFR114V1 {
  validateUpstream(source);
  validateCoreImplementation();

  const artifact: DirectSourceVerificationReissueLineageExtensionImplementationFR114V1 = Object.freeze({
    schemaVersion: 'fr114-direct-source-verification-reissue-lineage-extension-implementation-v1',
    artifactVersion: '0.1.0',
    authorityState: 'core_registry_relation_extension_implemented_reissue_still_not_authorized',
    upstream: Object.freeze({
      fr113SchemaVersion: source.schemaVersion,
      fr113AuthorityState: source.authorityState,
      coreExtensionImplementationAuthorized: true,
      verificationReissueAdmissionAuthorizedBefore: false,
      verificationRelationsPersistedBefore: 0,
      verificationRecordsPersistedBefore: 0,
      passagesPersistedBefore: 0,
      traditionalSemanticAuthorityBefore: false,
    }),
    implementation: Object.freeze({
      registryRelationFieldName: 'verificationRelations',
      registryRelationFieldOptional: true,
      pageRecordInlineLineageAdded: false,
      legacyRegistryObjectShapePreserved: true,
      legacyRegistryValidationPassed: true,
      boundedCoreRelationValidationPassed: true,
      parentAndChildResolutionEnforced: true,
      singleParentPerChildEnforced: true,
      singleHopParentRootEnforced: true,
      exactEvidenceReuseEnforced: true,
      sameCheckingEventEnforced: true,
      independentVerificationDeltaFixedAtZero: true,
      childMayCountAsIndependentVerification: false,
      coreExtensionImplemented: true,
      targetRelationPersisted: false,
      targetReissueRecordPersisted: false,
    }),
    execution: Object.freeze({
      directSourceRegistrySchemaChanges: 1,
      coreRelationValidatorImplemented: true,
      verificationRelationsPersisted: 0,
      verificationRecordsReissued: 0,
      verificationRecordsPersisted: 0,
      passagesPersisted: 0,
      faceRegistryChanged: false,
      methodologySourceRefsRewritten: 0,
      methodologyDefinitionsPersisted: 0,
      metricBindingsIssued: 0,
      thresholdsIssued: 0,
      criterionStatesIssued: 0,
      claimsIssued: 0,
      traditionalSemanticAuthority: false,
    }),
    authorityBoundary: Object.freeze({
      coreExtensionImplementationMeansReissueAuthority: false,
      ephemeralTargetValidationMeansPersistenceAuthority: false,
      relationMeansNewCheckingEvent: false,
      relationMayIncreaseIndependentVerificationCount: false,
      relationMeansPassagePersistence: false,
      relationMeansSemanticIdentityEquivalence: false,
      relationMeansMethodologySourceRefRewrite: false,
      relationMeansMetricBinding: false,
      relationMeansThreshold: false,
      relationMeansTraditionalSemantics: false,
    }),
    recommendedNextFrontier: 'intake_witness_qualified_page_verification_reissue_post_lineage_admission_review',
    remainingBlockers: REQUIRED_BLOCKERS,
    prohibitedShortcuts: REQUIRED_SHORTCUTS,
  });
  return validateDirectSourceVerificationReissueLineageExtensionImplementationFR114(artifact);
}

export function validateDirectSourceVerificationReissueLineageExtensionImplementationFR114(
  artifact: DirectSourceVerificationReissueLineageExtensionImplementationFR114V1,
): DirectSourceVerificationReissueLineageExtensionImplementationFR114V1 {
  if (
    artifact.schemaVersion !== 'fr114-direct-source-verification-reissue-lineage-extension-implementation-v1' ||
    artifact.artifactVersion !== '0.1.0' ||
    artifact.authorityState !== 'core_registry_relation_extension_implemented_reissue_still_not_authorized'
  ) fail('schema or authority state drift.');
  if (
    artifact.upstream.fr113SchemaVersion !== 'fr113-direct-source-verification-reissue-lineage-extension-admission-review-v1' ||
    artifact.upstream.fr113AuthorityState !== 'additive_registry_relation_extension_admitted_for_implementation_core_unmodified' ||
    artifact.upstream.coreExtensionImplementationAuthorized !== true ||
    artifact.upstream.verificationReissueAdmissionAuthorizedBefore !== false ||
    artifact.upstream.verificationRelationsPersistedBefore !== 0 ||
    artifact.upstream.verificationRecordsPersistedBefore !== 0 ||
    artifact.upstream.passagesPersistedBefore !== 0 ||
    artifact.upstream.traditionalSemanticAuthorityBefore !== false
  ) fail('upstream boundary drift.');
  if (
    artifact.implementation.registryRelationFieldName !== 'verificationRelations' ||
    artifact.implementation.registryRelationFieldOptional !== true ||
    artifact.implementation.pageRecordInlineLineageAdded !== false ||
    artifact.implementation.legacyRegistryObjectShapePreserved !== true ||
    artifact.implementation.legacyRegistryValidationPassed !== true ||
    artifact.implementation.boundedCoreRelationValidationPassed !== true ||
    artifact.implementation.parentAndChildResolutionEnforced !== true ||
    artifact.implementation.singleParentPerChildEnforced !== true ||
    artifact.implementation.singleHopParentRootEnforced !== true ||
    artifact.implementation.exactEvidenceReuseEnforced !== true ||
    artifact.implementation.sameCheckingEventEnforced !== true ||
    artifact.implementation.independentVerificationDeltaFixedAtZero !== true ||
    artifact.implementation.childMayCountAsIndependentVerification !== false ||
    artifact.implementation.coreExtensionImplemented !== true ||
    artifact.implementation.targetRelationPersisted !== false ||
    artifact.implementation.targetReissueRecordPersisted !== false
  ) fail('implementation boundary drift.');
  if (
    artifact.execution.directSourceRegistrySchemaChanges !== 1 ||
    artifact.execution.coreRelationValidatorImplemented !== true ||
    artifact.execution.verificationRelationsPersisted !== 0 ||
    artifact.execution.verificationRecordsReissued !== 0 ||
    artifact.execution.verificationRecordsPersisted !== 0 ||
    artifact.execution.passagesPersisted !== 0 ||
    artifact.execution.faceRegistryChanged !== false ||
    artifact.execution.methodologySourceRefsRewritten !== 0 ||
    artifact.execution.methodologyDefinitionsPersisted !== 0 ||
    artifact.execution.metricBindingsIssued !== 0 ||
    artifact.execution.thresholdsIssued !== 0 ||
    artifact.execution.criterionStatesIssued !== 0 ||
    artifact.execution.claimsIssued !== 0 ||
    artifact.execution.traditionalSemanticAuthority !== false
  ) fail('execution boundary drift.');
  if (
    Object.values(artifact.authorityBoundary).some((value) => value !== false) ||
    artifact.recommendedNextFrontier !== 'intake_witness_qualified_page_verification_reissue_post_lineage_admission_review' ||
    !sameSequence(artifact.remainingBlockers, REQUIRED_BLOCKERS) ||
    !sameSequence(artifact.prohibitedShortcuts, REQUIRED_SHORTCUTS)
  ) fail('authority boundary, blocker, shortcut, or next-frontier drift.');
  validateCoreImplementation();
  return artifact;
}

export function replayFR113ForFR114(
  source: Parameters<typeof reviewDirectSourceVerificationReissueLineageExtensionAdmissionFR113>[0],
): DirectSourceVerificationReissueLineageExtensionAdmissionReviewFR113V1 {
  return reviewDirectSourceVerificationReissueLineageExtensionAdmissionFR113(source);
}
