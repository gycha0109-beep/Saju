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
  validateFiveOfficerIntakeWitnessQualifiedPageVerificationReissueAdmissionReviewFR111,
  type FiveOfficerIntakeWitnessQualifiedPageVerificationReissueAdmissionReviewFR111V1,
} from './five-officers-intake-witness-qualified-page-verification-reissue-admission-review-fr111.js';
import { FaceAuthorityValidationError } from './validation.js';

const ORIGINAL_VERIFICATION_ID = 'verification.shenxiang_nlc_1925.intake' as const;
const ORIGINAL_VERIFICATION_REF = 'verification.shenxiang_nlc_1925.intake@0.1.0' as const;
const PROPOSED_VERIFICATION_ID = 'verification.shenxiang_nlc_1925.intake.witness_qualified' as const;
const PROPOSED_VERIFICATION_REF = 'verification.shenxiang_nlc_1925.intake.witness_qualified@0.1.0' as const;
const HISTORICAL_PASSAGE_REF = 'passage.shenxiang.five_officers.intake' as const;
const WITNESS_QUALIFIED_PASSAGE_REF = 'passage.shenxiang.five_officers.intake.nlc_1925' as const;
const RELATION_ID = 'verification-lineage.shenxiang_nlc_1925.intake.witness_qualified' as const;

export interface DirectSourceVerificationReissueRelationCandidateFR112V1 {
  readonly relationId: typeof RELATION_ID;
  readonly version: '0.1.0';
  readonly kind: 'non_independent_identity_reissue';
  readonly parentVerificationRef: typeof ORIGINAL_VERIFICATION_REF;
  readonly childVerificationRef: typeof PROPOSED_VERIFICATION_REF;
  readonly parentRetained: true;
  readonly evidenceReusePolicy: 'exact_evidence_reuse_required';
  readonly checkingEventPolicy: 'same_checker_refs_same_checking_event';
  readonly allowedRecordDifferences: readonly ['verificationId', 'passageId'];
  readonly independentVerificationDelta: 0;
  readonly childMayCountAsIndependentVerification: false;
}

export interface FiveOfficerIntakePageVerificationReissueLineageContractReviewFR112V1 {
  readonly schemaVersion: 'fr112-five-officers-intake-page-verification-reissue-lineage-contract-review-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'bounded_registry_level_reissue_lineage_contract_candidate_defined_core_extension_not_authorized';
  readonly upstream: {
    readonly fr111SchemaVersion: 'fr111-five-officers-intake-witness-qualified-page-verification-reissue-admission-review-v1';
    readonly fr111AuthorityState: 'witness_qualified_page_verification_reissue_blocked_missing_machine_readable_lineage_contract';
    readonly originalVerificationRef: typeof ORIGINAL_VERIFICATION_REF;
    readonly proposedVerificationRef: typeof PROPOSED_VERIFICATION_REF;
    readonly originalPassageId: typeof HISTORICAL_PASSAGE_REF;
    readonly proposedPassageId: typeof WITNESS_QUALIFIED_PASSAGE_REF;
    readonly sameOriginalText: true;
    readonly sameVisualEvidenceRefs: true;
    readonly sameCheckerRefs: true;
    readonly sameVerificationState: true;
    readonly verificationReissuePreviouslyAuthorized: false;
    readonly verificationRecordsPersistedBefore: 0;
    readonly passagesPersistedBefore: 0;
    readonly directSourceRegistrySchemaChangedBefore: false;
    readonly methodologySourceRefsRewrittenBefore: 0;
    readonly metricBindingsIssued: 0;
    readonly thresholdsIssued: 0;
    readonly criterionStatesIssued: 0;
    readonly claimsIssued: 0;
    readonly traditionalSemanticAuthority: false;
  };
  readonly currentCoreContract: {
    readonly pageVerificationRecordHasInlineReissueLineage: false;
    readonly registryHasVerificationRelationCollection: false;
    readonly currentCoreCanRepresentNonIndependentReissue: false;
  };
  readonly lineageContractCandidate: DirectSourceVerificationReissueRelationCandidateFR112V1;
  readonly contractReview: {
    readonly selectedPlacement: 'registry_level_verification_relation_collection';
    readonly inlineRecordMutationSelected: false;
    readonly originalVerificationRecordMayRemainUnchanged: true;
    readonly childVerificationRecordMayRemainBaseRecordShape: true;
    readonly relationResolvesExistingParentAndChild: true;
    readonly relationRequiresDistinctVerificationRefs: true;
    readonly relationRequiresDistinctPassageIds: true;
    readonly relationRequiresSameCandidate: true;
    readonly relationRequiresSameWitness: true;
    readonly relationRequiresSameChapterAndPage: true;
    readonly relationRequiresSameOriginalText: true;
    readonly relationRequiresSameVisualEvidenceRefs: true;
    readonly relationRequiresSameCheckerRefs: true;
    readonly relationRequiresSameVerificationState: true;
    readonly relationRequiresSamePromotionBoundary: true;
    readonly independentVerificationDeltaFixedAtZero: true;
    readonly machineReadableLineageContractSufficientForNonIndependentIdentityReissue: true;
    readonly ephemeralLineageValidationPassed: true;
    readonly coreSchemaExtensionCandidateAdmittedForReview: true;
    readonly coreSchemaExtensionAuthorized: false;
    readonly verificationReissueAdmissionAuthorized: false;
    readonly verificationRecordPersistenceAuthorized: false;
  };
  readonly execution: {
    readonly verificationRelationsPersisted: 0;
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
    readonly contractCandidateMeansCoreSchemaExtensionAuthority: false;
    readonly ephemeralLineageValidationMeansPersistenceAuthority: false;
    readonly lineageContractMeansVerificationReissueAuthority: false;
    readonly nonIndependentReissueMeansNewCheckingEvent: false;
    readonly nonIndependentReissueMayIncreaseIndependentVerificationCount: false;
    readonly lineageContractMeansPersistentPassageAuthority: false;
    readonly lineageContractMeansSemanticIdentityEquivalence: false;
    readonly lineageContractMeansMethodologySourceRefRewrite: false;
    readonly lineageContractMeansMetricBinding: false;
    readonly lineageContractMeansThreshold: false;
    readonly lineageContractMeansTraditionalSemantics: false;
  };
  readonly recommendedNextFrontier: 'direct_source_verification_reissue_lineage_contract_extension_admission_review';
  readonly remainingBlockers: readonly string[];
  readonly prohibitedShortcuts: readonly string[];
}

const REQUIRED_BLOCKERS = Object.freeze([
  'direct_source_verification_reissue_lineage_core_extension_not_admitted',
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
  'contract_candidate_to_core_schema_extension_authority',
  'ephemeral_lineage_validation_to_persistence_authority',
  'lineage_contract_to_verification_reissue_authority',
  'non_independent_reissue_to_new_checking_event',
  'non_independent_reissue_to_independent_verification_increment',
  'lineage_contract_to_persistent_passage',
  'lineage_contract_to_semantic_identity_equivalence',
  'lineage_contract_to_methodology_source_ref_rewrite',
  'lineage_contract_to_metric_binding',
  'lineage_contract_to_numeric_threshold',
  'lineage_contract_to_traditional_semantics',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-112 ${message}`);
}

function sameSequence<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function verificationRef(record: DirectSourcePageVerificationRecord): string {
  return `${record.verificationId}@${record.version}`;
}

function buildProposedReissue(): DirectSourcePageVerificationRecord {
  const source: DirectSourcePageVerificationRecord = FR104_NLC_INTAKE_PAGE_VERIFICATION;
  return Object.freeze({
    verificationId: PROPOSED_VERIFICATION_ID,
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

function buildLineageCandidate(): DirectSourceVerificationReissueRelationCandidateFR112V1 {
  return Object.freeze({
    relationId: RELATION_ID,
    version: '0.1.0' as const,
    kind: 'non_independent_identity_reissue' as const,
    parentVerificationRef: ORIGINAL_VERIFICATION_REF,
    childVerificationRef: PROPOSED_VERIFICATION_REF,
    parentRetained: true as const,
    evidenceReusePolicy: 'exact_evidence_reuse_required' as const,
    checkingEventPolicy: 'same_checker_refs_same_checking_event' as const,
    allowedRecordDifferences: Object.freeze(['verificationId', 'passageId'] as const),
    independentVerificationDelta: 0 as const,
    childMayCountAsIndependentVerification: false as const,
  });
}

export function validateDirectSourceVerificationReissueRelationCandidateFR112(
  relation: DirectSourceVerificationReissueRelationCandidateFR112V1,
  records: readonly DirectSourcePageVerificationRecord[],
): DirectSourceVerificationReissueRelationCandidateFR112V1 {
  if (
    relation.relationId !== RELATION_ID ||
    relation.version !== '0.1.0' ||
    relation.kind !== 'non_independent_identity_reissue' ||
    relation.parentVerificationRef !== ORIGINAL_VERIFICATION_REF ||
    relation.childVerificationRef !== PROPOSED_VERIFICATION_REF ||
    relation.parentRetained !== true ||
    relation.evidenceReusePolicy !== 'exact_evidence_reuse_required' ||
    relation.checkingEventPolicy !== 'same_checker_refs_same_checking_event' ||
    !sameSequence(relation.allowedRecordDifferences, ['verificationId', 'passageId'] as const) ||
    relation.independentVerificationDelta !== 0 ||
    relation.childMayCountAsIndependentVerification !== false
  ) fail('lineage relation candidate shape drift.');

  const parent = records.find((record) => verificationRef(record) === relation.parentVerificationRef);
  const child = records.find((record) => verificationRef(record) === relation.childVerificationRef);
  if (parent === undefined || child === undefined) fail('lineage relation must resolve existing parent and child verification records.');
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
  ) fail('non-independent identity reissue must preserve exact evidence and checking-event identity.');
  return relation;
}

function inspectCurrentCoreContract(): FiveOfficerIntakePageVerificationReissueLineageContractReviewFR112V1['currentCoreContract'] {
  const pagePrototype = buildProposedReissue() as DirectSourcePageVerificationRecord & Record<string, unknown>;
  const registryPrototype = FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0 as DirectSourceVerificationRegistry & Record<string, unknown>;
  if ('reissuedFromVerificationRef' in pagePrototype || 'supersedesVerificationRef' in pagePrototype) {
    fail('direct-source page verification gained inline lineage support and FR-112 must be re-reviewed.');
  }
  if ('verificationRelations' in registryPrototype || 'verificationLineage' in registryPrototype) {
    fail('direct-source registry gained verification lineage support and FR-112 must be re-reviewed.');
  }
  return Object.freeze({
    pageVerificationRecordHasInlineReissueLineage: false as const,
    registryHasVerificationRelationCollection: false as const,
    currentCoreCanRepresentNonIndependentReissue: false as const,
  });
}

function validateEphemeralContractCandidate(): DirectSourceVerificationReissueRelationCandidateFR112V1 {
  const original: DirectSourcePageVerificationRecord = FR104_NLC_INTAKE_PAGE_VERIFICATION;
  const proposed = buildProposedReissue();
  const ephemeralRegistry: DirectSourceVerificationRegistry = {
    registryId: 'direct-source-verification.face.fr112_probe',
    version: '0.1.0',
    candidates: [...FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.candidates, FR104_NLC_1925_INTAKE_CANDIDATE],
    pageVerifications: [...FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.pageVerifications, original, proposed],
  };
  validateDirectSourceVerificationRegistry(ephemeralRegistry);
  return validateDirectSourceVerificationReissueRelationCandidateFR112(buildLineageCandidate(), ephemeralRegistry.pageVerifications);
}

export function reviewFiveOfficerIntakePageVerificationReissueLineageContractFR112(
  source: FiveOfficerIntakeWitnessQualifiedPageVerificationReissueAdmissionReviewFR111V1,
): FiveOfficerIntakePageVerificationReissueLineageContractReviewFR112V1 {
  validateFiveOfficerIntakeWitnessQualifiedPageVerificationReissueAdmissionReviewFR111(source);
  if (
    source.authorityState !== 'witness_qualified_page_verification_reissue_blocked_missing_machine_readable_lineage_contract' ||
    source.originalVerification.verificationId !== ORIGINAL_VERIFICATION_ID ||
    source.originalVerification.passageId !== HISTORICAL_PASSAGE_REF ||
    source.originalVerification.retainedUnchanged !== true ||
    source.proposedReissue.verificationId !== PROPOSED_VERIFICATION_ID ||
    source.proposedReissue.passageId !== WITNESS_QUALIFIED_PASSAGE_REF ||
    source.proposedReissue.sameOriginalText !== true ||
    source.proposedReissue.sameVisualEvidenceRefs !== true ||
    source.proposedReissue.sameCheckerRefs !== true ||
    source.proposedReissue.sameVerificationState !== true ||
    source.lineageContractReview.machineReadableReissueLineageAvailable !== false ||
    source.lineageContractReview.verificationReissueAdmissionAuthorized !== false ||
    source.execution.verificationRecordsPersisted !== 0 ||
    source.execution.passagesPersisted !== 0 ||
    source.execution.directSourceRegistrySchemaChanged !== false ||
    source.execution.methodologySourceRefsRewritten !== 0 ||
    source.execution.metricBindingsIssued !== 0 ||
    source.execution.thresholdsIssued !== 0 ||
    source.execution.criterionStatesIssued !== 0 ||
    source.execution.claimsIssued !== 0 ||
    source.execution.traditionalSemanticAuthority !== false
  ) fail('FR-111 upstream authority drift.');

  const currentCoreContract = inspectCurrentCoreContract();
  const lineageContractCandidate = validateEphemeralContractCandidate();

  const result: FiveOfficerIntakePageVerificationReissueLineageContractReviewFR112V1 = Object.freeze({
    schemaVersion: 'fr112-five-officers-intake-page-verification-reissue-lineage-contract-review-v1',
    artifactVersion: '0.1.0',
    authorityState: 'bounded_registry_level_reissue_lineage_contract_candidate_defined_core_extension_not_authorized',
    upstream: Object.freeze({
      fr111SchemaVersion: source.schemaVersion,
      fr111AuthorityState: source.authorityState,
      originalVerificationRef: ORIGINAL_VERIFICATION_REF,
      proposedVerificationRef: PROPOSED_VERIFICATION_REF,
      originalPassageId: source.originalVerification.passageId,
      proposedPassageId: source.proposedReissue.passageId,
      sameOriginalText: source.proposedReissue.sameOriginalText,
      sameVisualEvidenceRefs: source.proposedReissue.sameVisualEvidenceRefs,
      sameCheckerRefs: source.proposedReissue.sameCheckerRefs,
      sameVerificationState: source.proposedReissue.sameVerificationState,
      verificationReissuePreviouslyAuthorized: source.lineageContractReview.verificationReissueAdmissionAuthorized,
      verificationRecordsPersistedBefore: source.execution.verificationRecordsPersisted,
      passagesPersistedBefore: source.execution.passagesPersisted,
      directSourceRegistrySchemaChangedBefore: source.execution.directSourceRegistrySchemaChanged,
      methodologySourceRefsRewrittenBefore: source.execution.methodologySourceRefsRewritten,
      metricBindingsIssued: source.execution.metricBindingsIssued,
      thresholdsIssued: source.execution.thresholdsIssued,
      criterionStatesIssued: source.execution.criterionStatesIssued,
      claimsIssued: source.execution.claimsIssued,
      traditionalSemanticAuthority: source.execution.traditionalSemanticAuthority,
    }),
    currentCoreContract,
    lineageContractCandidate,
    contractReview: Object.freeze({
      selectedPlacement: 'registry_level_verification_relation_collection',
      inlineRecordMutationSelected: false,
      originalVerificationRecordMayRemainUnchanged: true,
      childVerificationRecordMayRemainBaseRecordShape: true,
      relationResolvesExistingParentAndChild: true,
      relationRequiresDistinctVerificationRefs: true,
      relationRequiresDistinctPassageIds: true,
      relationRequiresSameCandidate: true,
      relationRequiresSameWitness: true,
      relationRequiresSameChapterAndPage: true,
      relationRequiresSameOriginalText: true,
      relationRequiresSameVisualEvidenceRefs: true,
      relationRequiresSameCheckerRefs: true,
      relationRequiresSameVerificationState: true,
      relationRequiresSamePromotionBoundary: true,
      independentVerificationDeltaFixedAtZero: true,
      machineReadableLineageContractSufficientForNonIndependentIdentityReissue: true,
      ephemeralLineageValidationPassed: true,
      coreSchemaExtensionCandidateAdmittedForReview: true,
      coreSchemaExtensionAuthorized: false,
      verificationReissueAdmissionAuthorized: false,
      verificationRecordPersistenceAuthorized: false,
    }),
    execution: Object.freeze({
      verificationRelationsPersisted: 0,
      verificationRecordsReissued: 0,
      verificationRecordsPersisted: 0,
      passagesPersisted: 0,
      directSourceRegistrySchemaChanged: false,
      faceRegistryChanged: false,
      methodologySourceRefsRewritten: 0,
      methodologyDefinitionsPersisted: 0,
      methodologyExecutionIssued: false,
      methodologyProductionPromotionAuthorized: false,
      metricBindingsIssued: 0,
      thresholdsIssued: 0,
      morphologyProduced: false,
      criterionStatesIssued: 0,
      claimsIssued: 0,
      traditionalFormationAuthorized: false,
      traditionalSemanticAuthority: false,
    }),
    authorityBoundary: Object.freeze({
      contractCandidateMeansCoreSchemaExtensionAuthority: false,
      ephemeralLineageValidationMeansPersistenceAuthority: false,
      lineageContractMeansVerificationReissueAuthority: false,
      nonIndependentReissueMeansNewCheckingEvent: false,
      nonIndependentReissueMayIncreaseIndependentVerificationCount: false,
      lineageContractMeansPersistentPassageAuthority: false,
      lineageContractMeansSemanticIdentityEquivalence: false,
      lineageContractMeansMethodologySourceRefRewrite: false,
      lineageContractMeansMetricBinding: false,
      lineageContractMeansThreshold: false,
      lineageContractMeansTraditionalSemantics: false,
    }),
    recommendedNextFrontier: 'direct_source_verification_reissue_lineage_contract_extension_admission_review',
    remainingBlockers: REQUIRED_BLOCKERS,
    prohibitedShortcuts: REQUIRED_SHORTCUTS,
  });
  return validateFiveOfficerIntakePageVerificationReissueLineageContractReviewFR112(result);
}

export function validateFiveOfficerIntakePageVerificationReissueLineageContractReviewFR112(
  value: FiveOfficerIntakePageVerificationReissueLineageContractReviewFR112V1,
): FiveOfficerIntakePageVerificationReissueLineageContractReviewFR112V1 {
  if (
    value.schemaVersion !== 'fr112-five-officers-intake-page-verification-reissue-lineage-contract-review-v1' ||
    value.artifactVersion !== '0.1.0' ||
    value.authorityState !== 'bounded_registry_level_reissue_lineage_contract_candidate_defined_core_extension_not_authorized'
  ) fail('schema/artifact/authority state drift.');
  if (
    value.upstream.fr111SchemaVersion !== 'fr111-five-officers-intake-witness-qualified-page-verification-reissue-admission-review-v1' ||
    value.upstream.fr111AuthorityState !== 'witness_qualified_page_verification_reissue_blocked_missing_machine_readable_lineage_contract' ||
    value.upstream.originalVerificationRef !== ORIGINAL_VERIFICATION_REF ||
    value.upstream.proposedVerificationRef !== PROPOSED_VERIFICATION_REF ||
    value.upstream.originalPassageId !== HISTORICAL_PASSAGE_REF ||
    value.upstream.proposedPassageId !== WITNESS_QUALIFIED_PASSAGE_REF ||
    value.upstream.sameOriginalText !== true ||
    value.upstream.sameVisualEvidenceRefs !== true ||
    value.upstream.sameCheckerRefs !== true ||
    value.upstream.sameVerificationState !== true ||
    value.upstream.verificationReissuePreviouslyAuthorized !== false ||
    value.upstream.verificationRecordsPersistedBefore !== 0 ||
    value.upstream.passagesPersistedBefore !== 0 ||
    value.upstream.directSourceRegistrySchemaChangedBefore !== false ||
    value.upstream.methodologySourceRefsRewrittenBefore !== 0 ||
    value.upstream.metricBindingsIssued !== 0 ||
    value.upstream.thresholdsIssued !== 0 ||
    value.upstream.criterionStatesIssued !== 0 ||
    value.upstream.claimsIssued !== 0 ||
    value.upstream.traditionalSemanticAuthority !== false
  ) fail('upstream snapshot drift.');
  if (
    value.currentCoreContract.pageVerificationRecordHasInlineReissueLineage !== false ||
    value.currentCoreContract.registryHasVerificationRelationCollection !== false ||
    value.currentCoreContract.currentCoreCanRepresentNonIndependentReissue !== false
  ) fail('current core contract snapshot drift.');
  validateDirectSourceVerificationReissueRelationCandidateFR112(value.lineageContractCandidate, [
    FR104_NLC_INTAKE_PAGE_VERIFICATION,
    buildProposedReissue(),
  ]);
  if (
    value.contractReview.selectedPlacement !== 'registry_level_verification_relation_collection' ||
    value.contractReview.inlineRecordMutationSelected !== false ||
    value.contractReview.originalVerificationRecordMayRemainUnchanged !== true ||
    value.contractReview.childVerificationRecordMayRemainBaseRecordShape !== true ||
    value.contractReview.relationResolvesExistingParentAndChild !== true ||
    value.contractReview.relationRequiresDistinctVerificationRefs !== true ||
    value.contractReview.relationRequiresDistinctPassageIds !== true ||
    value.contractReview.relationRequiresSameCandidate !== true ||
    value.contractReview.relationRequiresSameWitness !== true ||
    value.contractReview.relationRequiresSameChapterAndPage !== true ||
    value.contractReview.relationRequiresSameOriginalText !== true ||
    value.contractReview.relationRequiresSameVisualEvidenceRefs !== true ||
    value.contractReview.relationRequiresSameCheckerRefs !== true ||
    value.contractReview.relationRequiresSameVerificationState !== true ||
    value.contractReview.relationRequiresSamePromotionBoundary !== true ||
    value.contractReview.independentVerificationDeltaFixedAtZero !== true ||
    value.contractReview.machineReadableLineageContractSufficientForNonIndependentIdentityReissue !== true ||
    value.contractReview.ephemeralLineageValidationPassed !== true ||
    value.contractReview.coreSchemaExtensionCandidateAdmittedForReview !== true ||
    value.contractReview.coreSchemaExtensionAuthorized !== false ||
    value.contractReview.verificationReissueAdmissionAuthorized !== false ||
    value.contractReview.verificationRecordPersistenceAuthorized !== false
  ) fail('lineage contract review drift.');
  if (
    value.execution.verificationRelationsPersisted !== 0 ||
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
    value.authorityBoundary.contractCandidateMeansCoreSchemaExtensionAuthority !== false ||
    value.authorityBoundary.ephemeralLineageValidationMeansPersistenceAuthority !== false ||
    value.authorityBoundary.lineageContractMeansVerificationReissueAuthority !== false ||
    value.authorityBoundary.nonIndependentReissueMeansNewCheckingEvent !== false ||
    value.authorityBoundary.nonIndependentReissueMayIncreaseIndependentVerificationCount !== false ||
    value.authorityBoundary.lineageContractMeansPersistentPassageAuthority !== false ||
    value.authorityBoundary.lineageContractMeansSemanticIdentityEquivalence !== false ||
    value.authorityBoundary.lineageContractMeansMethodologySourceRefRewrite !== false ||
    value.authorityBoundary.lineageContractMeansMetricBinding !== false ||
    value.authorityBoundary.lineageContractMeansThreshold !== false ||
    value.authorityBoundary.lineageContractMeansTraditionalSemantics !== false
  ) fail('authority boundary drift.');
  if (
    value.recommendedNextFrontier !== 'direct_source_verification_reissue_lineage_contract_extension_admission_review' ||
    !sameSequence(value.remainingBlockers, REQUIRED_BLOCKERS) ||
    !sameSequence(value.prohibitedShortcuts, REQUIRED_SHORTCUTS)
  ) fail('next-frontier/blocker/shortcut contract drift.');
  return value;
}
