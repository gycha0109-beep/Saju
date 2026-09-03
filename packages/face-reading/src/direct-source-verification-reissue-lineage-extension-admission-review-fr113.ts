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
  validateDirectSourceVerificationReissueRelationCandidateFR112,
  validateFiveOfficerIntakePageVerificationReissueLineageContractReviewFR112,
  type DirectSourceVerificationReissueRelationCandidateFR112V1,
  type FiveOfficerIntakePageVerificationReissueLineageContractReviewFR112V1,
} from './five-officers-intake-page-verification-reissue-lineage-contract-review-fr112.js';
import { FaceAuthorityValidationError } from './validation.js';

const ORIGINAL_VERIFICATION_REF = 'verification.shenxiang_nlc_1925.intake@0.1.0' as const;
const PROPOSED_VERIFICATION_REF = 'verification.shenxiang_nlc_1925.intake.witness_qualified@0.1.0' as const;
const WITNESS_QUALIFIED_PASSAGE_REF = 'passage.shenxiang.five_officers.intake.nlc_1925' as const;

export interface DirectSourceVerificationRelationFR113Proposal {
  readonly relationId: string;
  readonly version: string;
  readonly kind: 'non_independent_identity_reissue';
  readonly parentVerificationRef: string;
  readonly childVerificationRef: string;
  readonly parentRetained: true;
  readonly evidenceReusePolicy: 'exact_evidence_reuse_required';
  readonly checkingEventPolicy: 'same_checker_refs_same_checking_event';
  readonly allowedRecordDifferences: readonly ['verificationId', 'passageId'];
  readonly lineageDepthPolicy: 'single_hop_parent_root';
  readonly independentVerificationDelta: 0;
  readonly childMayCountAsIndependentVerification: false;
}

export interface DirectSourceVerificationRegistryFR113Proposal extends DirectSourceVerificationRegistry {
  readonly verificationRelations?: readonly DirectSourceVerificationRelationFR113Proposal[];
}

export interface DirectSourceVerificationReissueLineageExtensionAdmissionReviewFR113V1 {
  readonly schemaVersion: 'fr113-direct-source-verification-reissue-lineage-extension-admission-review-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'additive_registry_relation_extension_admitted_for_implementation_core_unmodified';
  readonly upstream: {
    readonly fr112SchemaVersion: 'fr112-five-officers-intake-page-verification-reissue-lineage-contract-review-v1';
    readonly fr112AuthorityState: 'bounded_registry_level_reissue_lineage_contract_candidate_defined_core_extension_not_authorized';
    readonly selectedPlacement: 'registry_level_verification_relation_collection';
    readonly ephemeralLineageValidationPassed: true;
    readonly coreSchemaExtensionAuthorizedBefore: false;
    readonly verificationReissueAdmissionAuthorizedBefore: false;
    readonly verificationRelationsPersistedBefore: 0;
    readonly verificationRecordsPersistedBefore: 0;
    readonly passagesPersistedBefore: 0;
    readonly traditionalSemanticAuthorityBefore: false;
  };
  readonly currentCoreSnapshot: {
    readonly baseRegistryValid: true;
    readonly registryRelationCollectionPresent: false;
    readonly pageRecordInlineLineagePresent: false;
    readonly baseRegistryMutationRequiredForCompatibility: false;
  };
  readonly proposedExtension: {
    readonly fieldName: 'verificationRelations';
    readonly fieldCardinality: 'optional_readonly_collection';
    readonly relationKind: 'non_independent_identity_reissue';
    readonly lineagePlacement: 'registry_level';
    readonly pageRecordShapeMutationRequired: false;
    readonly existingRegistriesRemainValidWhenFieldAbsent: true;
    readonly parentAndChildMustResolve: true;
    readonly parentAndChildMustBeDistinct: true;
    readonly childMayHaveAtMostOneReissueParent: true;
    readonly parentMustBeRootNotAnotherReissueChild: true;
    readonly exactEvidenceReuseRequired: true;
    readonly sameCheckingEventRequired: true;
    readonly allowedRecordDifferences: readonly ['verificationId', 'passageId'];
    readonly independentVerificationDeltaFixedAtZero: true;
    readonly childMayCountAsIndependentVerification: false;
  };
  readonly admissionReview: {
    readonly backwardCompatibilityValidated: true;
    readonly targetRelationValidatedAgainstProposedExtension: true;
    readonly targetRelationStillValidUnderFR112SpecificValidator: true;
    readonly duplicateRelationIdentityRejected: true;
    readonly unresolvedParentOrChildRejected: true;
    readonly multipleParentsForSameChildRejected: true;
    readonly chainedOrCyclicReissueLineageRejectedInV1: true;
    readonly evidenceOrCheckingDriftRejected: true;
    readonly independentVerificationInflationRejected: true;
    readonly additiveCoreExtensionAuthoritySafe: true;
    readonly coreExtensionImplementationAuthorized: true;
    readonly coreSchemaChangedInThisReview: false;
    readonly verificationReissueAdmissionAuthorized: false;
    readonly verificationRecordPersistenceAuthorized: false;
  };
  readonly execution: {
    readonly directSourceRegistrySchemaChanges: 0;
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
    readonly extensionAdmissionMeansExtensionAlreadyImplemented: false;
    readonly extensionImplementationAuthorityMeansReissueAuthority: false;
    readonly relationValidationMeansPersistenceAuthority: false;
    readonly relationMeansNewCheckingEvent: false;
    readonly relationMayIncreaseIndependentVerificationCount: false;
    readonly relationMeansPassagePersistence: false;
    readonly relationMeansSemanticIdentityEquivalence: false;
    readonly relationMeansMethodologySourceRefRewrite: false;
    readonly relationMeansMetricBinding: false;
    readonly relationMeansThreshold: false;
    readonly relationMeansTraditionalSemantics: false;
  };
  readonly recommendedNextFrontier: 'direct_source_verification_reissue_lineage_contract_extension_implementation';
  readonly remainingBlockers: readonly string[];
  readonly prohibitedShortcuts: readonly string[];
}

const REQUIRED_BLOCKERS = Object.freeze([
  'direct_source_verification_reissue_lineage_core_extension_not_implemented',
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
  'extension_admission_to_extension_already_implemented',
  'extension_implementation_authority_to_reissue_authority',
  'relation_validation_to_persistence_authority',
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
  throw new FaceAuthorityValidationError(`FR-113 ${message}`);
}

function sameSequence<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function verificationRef(record: DirectSourcePageVerificationRecord): string {
  return `${record.verificationId}@${record.version}`;
}

function relationRef(relation: DirectSourceVerificationRelationFR113Proposal): string {
  return `${relation.relationId}@${relation.version}`;
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

function toFR113Relation(
  source: DirectSourceVerificationReissueRelationCandidateFR112V1,
): DirectSourceVerificationRelationFR113Proposal {
  return Object.freeze({
    relationId: source.relationId,
    version: source.version,
    kind: source.kind,
    parentVerificationRef: source.parentVerificationRef,
    childVerificationRef: source.childVerificationRef,
    parentRetained: source.parentRetained,
    evidenceReusePolicy: source.evidenceReusePolicy,
    checkingEventPolicy: source.checkingEventPolicy,
    allowedRecordDifferences: source.allowedRecordDifferences,
    lineageDepthPolicy: 'single_hop_parent_root' as const,
    independentVerificationDelta: source.independentVerificationDelta,
    childMayCountAsIndependentVerification: source.childMayCountAsIndependentVerification,
  });
}

function validateRelationShape(relation: DirectSourceVerificationRelationFR113Proposal): void {
  if (
    relation.relationId.trim().length === 0 ||
    relation.version.trim().length === 0 ||
    relation.kind !== 'non_independent_identity_reissue' ||
    relation.parentVerificationRef.trim().length === 0 ||
    relation.childVerificationRef.trim().length === 0 ||
    relation.parentVerificationRef === relation.childVerificationRef ||
    relation.parentRetained !== true ||
    relation.evidenceReusePolicy !== 'exact_evidence_reuse_required' ||
    relation.checkingEventPolicy !== 'same_checker_refs_same_checking_event' ||
    !sameSequence(relation.allowedRecordDifferences, ['verificationId', 'passageId'] as const) ||
    relation.lineageDepthPolicy !== 'single_hop_parent_root' ||
    relation.independentVerificationDelta !== 0 ||
    relation.childMayCountAsIndependentVerification !== false
  ) fail('proposed relation shape or non-independent authority drift.');
}

export function validateDirectSourceVerificationRegistryFR113Proposal(
  registry: DirectSourceVerificationRegistryFR113Proposal,
): DirectSourceVerificationRegistryFR113Proposal {
  validateDirectSourceVerificationRegistry(registry);
  const relations = registry.verificationRelations ?? [];
  const recordsByRef = new Map(registry.pageVerifications.map((record) => [verificationRef(record), record] as const));
  const relationRefs = new Set<string>();
  const childRefs = new Set<string>();

  for (const relation of relations) {
    validateRelationShape(relation);
    const key = relationRef(relation);
    if (relationRefs.has(key)) fail(`duplicate verification relation ${key}.`);
    relationRefs.add(key);
    if (childRefs.has(relation.childVerificationRef)) {
      fail(`multiple reissue parents for child ${relation.childVerificationRef}.`);
    }
    childRefs.add(relation.childVerificationRef);
  }

  for (const relation of relations) {
    const parent = recordsByRef.get(relation.parentVerificationRef);
    const child = recordsByRef.get(relation.childVerificationRef);
    if (parent === undefined || child === undefined) fail('relation parent and child must resolve to page verification records.');
    if (childRefs.has(relation.parentVerificationRef)) {
      fail('v1 reissue lineage is single-hop: a parent may not itself be a reissue child.');
    }
    if (
      parent.verificationId === child.verificationId ||
      parent.passageId === child.passageId ||
      parent.version !== child.version ||
      parent.candidateRef !== child.candidateRef ||
      parent.witnessId !== child.witnessId ||
      parent.chapter !== child.chapter ||
      parent.scanPage !== child.scanPage ||
      parent.printedPage !== child.printedPage ||
      parent.originalText !== child.originalText ||
      !sameSequence(parent.visualEvidenceRefs, child.visualEvidenceRefs) ||
      !sameSequence(parent.checkerRefs, child.checkerRefs) ||
      parent.state !== child.state ||
      parent.mayPromoteOtherWitness !== child.mayPromoteOtherWitness
    ) fail('non-independent reissue relation must preserve exact evidence and checking event.');
  }
  return registry;
}

function validateCurrentCoreSnapshot(): DirectSourceVerificationReissueLineageExtensionAdmissionReviewFR113V1['currentCoreSnapshot'] {
  validateDirectSourceVerificationRegistry(FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0);
  const registry = FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0 as DirectSourceVerificationRegistry & Record<string, unknown>;
  const page = FR104_NLC_INTAKE_PAGE_VERIFICATION as DirectSourcePageVerificationRecord & Record<string, unknown>;
  if ('verificationRelations' in registry || 'verificationLineage' in registry) {
    fail('core registry already exposes lineage collection; FR-113 admission must be re-reviewed.');
  }
  if ('reissuedFromVerificationRef' in page || 'supersedesVerificationRef' in page) {
    fail('page verification record already exposes inline lineage; FR-113 admission must be re-reviewed.');
  }
  const legacyProbe: DirectSourceVerificationRegistryFR113Proposal = FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0;
  validateDirectSourceVerificationRegistryFR113Proposal(legacyProbe);
  return Object.freeze({
    baseRegistryValid: true as const,
    registryRelationCollectionPresent: false as const,
    pageRecordInlineLineagePresent: false as const,
    baseRegistryMutationRequiredForCompatibility: false as const,
  });
}

function validateTargetExtension(
  source: FiveOfficerIntakePageVerificationReissueLineageContractReviewFR112V1,
): void {
  const original: DirectSourcePageVerificationRecord = FR104_NLC_INTAKE_PAGE_VERIFICATION;
  const child = buildProposedReissue();
  const relation = toFR113Relation(source.lineageContractCandidate);
  const registry: DirectSourceVerificationRegistryFR113Proposal = {
    registryId: 'direct-source-verification.face.fr113_extension_probe',
    version: '0.1.0',
    candidates: [...FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.candidates, FR104_NLC_1925_INTAKE_CANDIDATE],
    pageVerifications: [...FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.pageVerifications, original, child],
    verificationRelations: [relation],
  };
  validateDirectSourceVerificationRegistryFR113Proposal(registry);
  validateDirectSourceVerificationReissueRelationCandidateFR112(source.lineageContractCandidate, registry.pageVerifications);
  if (
    relation.parentVerificationRef !== ORIGINAL_VERIFICATION_REF ||
    relation.childVerificationRef !== PROPOSED_VERIFICATION_REF ||
    relation.independentVerificationDelta !== 0 ||
    relation.childMayCountAsIndependentVerification !== false
  ) fail('FR-112 target relation identity or non-independent boundary drift.');
}

function validateUpstream(source: FiveOfficerIntakePageVerificationReissueLineageContractReviewFR112V1): void {
  validateFiveOfficerIntakePageVerificationReissueLineageContractReviewFR112(source);
  if (
    source.schemaVersion !== 'fr112-five-officers-intake-page-verification-reissue-lineage-contract-review-v1' ||
    source.authorityState !== 'bounded_registry_level_reissue_lineage_contract_candidate_defined_core_extension_not_authorized' ||
    source.contractReview.selectedPlacement !== 'registry_level_verification_relation_collection' ||
    source.contractReview.ephemeralLineageValidationPassed !== true ||
    source.contractReview.coreSchemaExtensionAuthorized !== false ||
    source.contractReview.verificationReissueAdmissionAuthorized !== false ||
    source.execution.verificationRelationsPersisted !== 0 ||
    source.execution.verificationRecordsPersisted !== 0 ||
    source.execution.passagesPersisted !== 0 ||
    source.execution.traditionalSemanticAuthority !== false
  ) fail('FR-112 upstream authority drift.');
}

export function reviewDirectSourceVerificationReissueLineageExtensionAdmissionFR113(
  source: FiveOfficerIntakePageVerificationReissueLineageContractReviewFR112V1,
): DirectSourceVerificationReissueLineageExtensionAdmissionReviewFR113V1 {
  validateUpstream(source);
  const currentCoreSnapshot = validateCurrentCoreSnapshot();
  validateTargetExtension(source);

  const result: DirectSourceVerificationReissueLineageExtensionAdmissionReviewFR113V1 = Object.freeze({
    schemaVersion: 'fr113-direct-source-verification-reissue-lineage-extension-admission-review-v1',
    artifactVersion: '0.1.0',
    authorityState: 'additive_registry_relation_extension_admitted_for_implementation_core_unmodified',
    upstream: Object.freeze({
      fr112SchemaVersion: source.schemaVersion,
      fr112AuthorityState: source.authorityState,
      selectedPlacement: source.contractReview.selectedPlacement,
      ephemeralLineageValidationPassed: source.contractReview.ephemeralLineageValidationPassed,
      coreSchemaExtensionAuthorizedBefore: source.contractReview.coreSchemaExtensionAuthorized,
      verificationReissueAdmissionAuthorizedBefore: source.contractReview.verificationReissueAdmissionAuthorized,
      verificationRelationsPersistedBefore: source.execution.verificationRelationsPersisted,
      verificationRecordsPersistedBefore: source.execution.verificationRecordsPersisted,
      passagesPersistedBefore: source.execution.passagesPersisted,
      traditionalSemanticAuthorityBefore: source.execution.traditionalSemanticAuthority,
    }),
    currentCoreSnapshot,
    proposedExtension: Object.freeze({
      fieldName: 'verificationRelations',
      fieldCardinality: 'optional_readonly_collection',
      relationKind: 'non_independent_identity_reissue',
      lineagePlacement: 'registry_level',
      pageRecordShapeMutationRequired: false,
      existingRegistriesRemainValidWhenFieldAbsent: true,
      parentAndChildMustResolve: true,
      parentAndChildMustBeDistinct: true,
      childMayHaveAtMostOneReissueParent: true,
      parentMustBeRootNotAnotherReissueChild: true,
      exactEvidenceReuseRequired: true,
      sameCheckingEventRequired: true,
      allowedRecordDifferences: Object.freeze(['verificationId', 'passageId'] as const),
      independentVerificationDeltaFixedAtZero: true,
      childMayCountAsIndependentVerification: false,
    }),
    admissionReview: Object.freeze({
      backwardCompatibilityValidated: true,
      targetRelationValidatedAgainstProposedExtension: true,
      targetRelationStillValidUnderFR112SpecificValidator: true,
      duplicateRelationIdentityRejected: true,
      unresolvedParentOrChildRejected: true,
      multipleParentsForSameChildRejected: true,
      chainedOrCyclicReissueLineageRejectedInV1: true,
      evidenceOrCheckingDriftRejected: true,
      independentVerificationInflationRejected: true,
      additiveCoreExtensionAuthoritySafe: true,
      coreExtensionImplementationAuthorized: true,
      coreSchemaChangedInThisReview: false,
      verificationReissueAdmissionAuthorized: false,
      verificationRecordPersistenceAuthorized: false,
    }),
    execution: Object.freeze({
      directSourceRegistrySchemaChanges: 0,
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
      extensionAdmissionMeansExtensionAlreadyImplemented: false,
      extensionImplementationAuthorityMeansReissueAuthority: false,
      relationValidationMeansPersistenceAuthority: false,
      relationMeansNewCheckingEvent: false,
      relationMayIncreaseIndependentVerificationCount: false,
      relationMeansPassagePersistence: false,
      relationMeansSemanticIdentityEquivalence: false,
      relationMeansMethodologySourceRefRewrite: false,
      relationMeansMetricBinding: false,
      relationMeansThreshold: false,
      relationMeansTraditionalSemantics: false,
    }),
    recommendedNextFrontier: 'direct_source_verification_reissue_lineage_contract_extension_implementation',
    remainingBlockers: REQUIRED_BLOCKERS,
    prohibitedShortcuts: REQUIRED_SHORTCUTS,
  });
  return validateDirectSourceVerificationReissueLineageExtensionAdmissionReviewFR113(result);
}

export function validateDirectSourceVerificationReissueLineageExtensionAdmissionReviewFR113(
  value: DirectSourceVerificationReissueLineageExtensionAdmissionReviewFR113V1,
): DirectSourceVerificationReissueLineageExtensionAdmissionReviewFR113V1 {
  if (
    value.schemaVersion !== 'fr113-direct-source-verification-reissue-lineage-extension-admission-review-v1' ||
    value.artifactVersion !== '0.1.0' ||
    value.authorityState !== 'additive_registry_relation_extension_admitted_for_implementation_core_unmodified'
  ) fail('schema/artifact/authority state drift.');
  if (
    value.upstream.fr112SchemaVersion !== 'fr112-five-officers-intake-page-verification-reissue-lineage-contract-review-v1' ||
    value.upstream.fr112AuthorityState !== 'bounded_registry_level_reissue_lineage_contract_candidate_defined_core_extension_not_authorized' ||
    value.upstream.selectedPlacement !== 'registry_level_verification_relation_collection' ||
    value.upstream.ephemeralLineageValidationPassed !== true ||
    value.upstream.coreSchemaExtensionAuthorizedBefore !== false ||
    value.upstream.verificationReissueAdmissionAuthorizedBefore !== false ||
    value.upstream.verificationRelationsPersistedBefore !== 0 ||
    value.upstream.verificationRecordsPersistedBefore !== 0 ||
    value.upstream.passagesPersistedBefore !== 0 ||
    value.upstream.traditionalSemanticAuthorityBefore !== false
  ) fail('upstream snapshot drift.');
  if (
    value.currentCoreSnapshot.baseRegistryValid !== true ||
    value.currentCoreSnapshot.registryRelationCollectionPresent !== false ||
    value.currentCoreSnapshot.pageRecordInlineLineagePresent !== false ||
    value.currentCoreSnapshot.baseRegistryMutationRequiredForCompatibility !== false
  ) fail('current core snapshot drift.');
  if (
    value.proposedExtension.fieldName !== 'verificationRelations' ||
    value.proposedExtension.fieldCardinality !== 'optional_readonly_collection' ||
    value.proposedExtension.relationKind !== 'non_independent_identity_reissue' ||
    value.proposedExtension.lineagePlacement !== 'registry_level' ||
    value.proposedExtension.pageRecordShapeMutationRequired !== false ||
    value.proposedExtension.existingRegistriesRemainValidWhenFieldAbsent !== true ||
    value.proposedExtension.parentAndChildMustResolve !== true ||
    value.proposedExtension.parentAndChildMustBeDistinct !== true ||
    value.proposedExtension.childMayHaveAtMostOneReissueParent !== true ||
    value.proposedExtension.parentMustBeRootNotAnotherReissueChild !== true ||
    value.proposedExtension.exactEvidenceReuseRequired !== true ||
    value.proposedExtension.sameCheckingEventRequired !== true ||
    !sameSequence(value.proposedExtension.allowedRecordDifferences, ['verificationId', 'passageId'] as const) ||
    value.proposedExtension.independentVerificationDeltaFixedAtZero !== true ||
    value.proposedExtension.childMayCountAsIndependentVerification !== false
  ) fail('proposed extension contract drift.');
  if (
    value.admissionReview.backwardCompatibilityValidated !== true ||
    value.admissionReview.targetRelationValidatedAgainstProposedExtension !== true ||
    value.admissionReview.targetRelationStillValidUnderFR112SpecificValidator !== true ||
    value.admissionReview.duplicateRelationIdentityRejected !== true ||
    value.admissionReview.unresolvedParentOrChildRejected !== true ||
    value.admissionReview.multipleParentsForSameChildRejected !== true ||
    value.admissionReview.chainedOrCyclicReissueLineageRejectedInV1 !== true ||
    value.admissionReview.evidenceOrCheckingDriftRejected !== true ||
    value.admissionReview.independentVerificationInflationRejected !== true ||
    value.admissionReview.additiveCoreExtensionAuthoritySafe !== true ||
    value.admissionReview.coreExtensionImplementationAuthorized !== true ||
    value.admissionReview.coreSchemaChangedInThisReview !== false ||
    value.admissionReview.verificationReissueAdmissionAuthorized !== false ||
    value.admissionReview.verificationRecordPersistenceAuthorized !== false
  ) fail('extension admission review drift.');
  if (
    value.execution.directSourceRegistrySchemaChanges !== 0 ||
    value.execution.verificationRelationsPersisted !== 0 ||
    value.execution.verificationRecordsReissued !== 0 ||
    value.execution.verificationRecordsPersisted !== 0 ||
    value.execution.passagesPersisted !== 0 ||
    value.execution.faceRegistryChanged !== false ||
    value.execution.methodologySourceRefsRewritten !== 0 ||
    value.execution.methodologyDefinitionsPersisted !== 0 ||
    value.execution.metricBindingsIssued !== 0 ||
    value.execution.thresholdsIssued !== 0 ||
    value.execution.criterionStatesIssued !== 0 ||
    value.execution.claimsIssued !== 0 ||
    value.execution.traditionalSemanticAuthority !== false
  ) fail('execution authority drift.');
  if (
    value.authorityBoundary.extensionAdmissionMeansExtensionAlreadyImplemented !== false ||
    value.authorityBoundary.extensionImplementationAuthorityMeansReissueAuthority !== false ||
    value.authorityBoundary.relationValidationMeansPersistenceAuthority !== false ||
    value.authorityBoundary.relationMeansNewCheckingEvent !== false ||
    value.authorityBoundary.relationMayIncreaseIndependentVerificationCount !== false ||
    value.authorityBoundary.relationMeansPassagePersistence !== false ||
    value.authorityBoundary.relationMeansSemanticIdentityEquivalence !== false ||
    value.authorityBoundary.relationMeansMethodologySourceRefRewrite !== false ||
    value.authorityBoundary.relationMeansMetricBinding !== false ||
    value.authorityBoundary.relationMeansThreshold !== false ||
    value.authorityBoundary.relationMeansTraditionalSemantics !== false
  ) fail('authority boundary drift.');
  if (
    value.recommendedNextFrontier !== 'direct_source_verification_reissue_lineage_contract_extension_implementation' ||
    !sameSequence(value.remainingBlockers, REQUIRED_BLOCKERS) ||
    !sameSequence(value.prohibitedShortcuts, REQUIRED_SHORTCUTS)
  ) fail('next-frontier/blocker/shortcut contract drift.');
  return value;
}
