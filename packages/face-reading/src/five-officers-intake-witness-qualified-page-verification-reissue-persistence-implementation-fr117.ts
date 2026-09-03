import type { FaceAuthorityRegistry, SourcePassage } from './contracts.js';
import {
  FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0,
  materializeVerifiedSourcePassage,
  validateDirectSourceVerificationRegistry,
  type DirectSourcePageVerificationRecord,
  type DirectSourceVerificationRelation,
  type DirectSourceVerificationRegistry,
} from './direct-source-verification.js';
import { FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0 } from './five-officers-six-fus-research-v0.js';
import {
  FR104_NLC_1925_INTAKE_CANDIDATE,
  FR104_NLC_INTAKE_PAGE_VERIFICATION,
} from './five-officers-mouth-direct-source-page-verification-fr104.js';
import {
  validateFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceReviewFR116,
  type FiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceReviewFR116V1,
} from './five-officers-intake-witness-qualified-page-verification-reissue-persistence-review-fr116.js';
import { FaceAuthorityValidationError, validateFaceAuthorityRegistry } from './validation.js';

const ORIGINAL_VERIFICATION_REF = 'verification.shenxiang_nlc_1925.intake@0.1.0' as const;
const CHILD_VERIFICATION_ID = 'verification.shenxiang_nlc_1925.intake.witness_qualified' as const;
const CHILD_VERIFICATION_REF = 'verification.shenxiang_nlc_1925.intake.witness_qualified@0.1.0' as const;
const HISTORICAL_PASSAGE_REF = 'passage.shenxiang.five_officers.intake' as const;
const WITNESS_QUALIFIED_PASSAGE_REF = 'passage.shenxiang.five_officers.intake.nlc_1925' as const;
const RELATION_ID = 'verification-lineage.shenxiang_nlc_1925.intake.witness_qualified' as const;
const NLC_WITNESS = 'witness.shenxiang_quanbian.nlc_1925' as const;
const DIRECT_SOURCE_REGISTRY_ID = 'direct-source-verification.face.fr117_witness_qualified_reissue' as const;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-117 ${message}`);
}

function sameSequence<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function assertPersistencePrerequisites(): void {
  validateDirectSourceVerificationRegistry(FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0);
  validateFaceAuthorityRegistry(FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0);
  if (
    FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.pageVerifications.length !== 0 ||
    FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.candidates.some((candidate) => candidate.witnessId === NLC_WITNESS) ||
    FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.verificationRelations !== undefined
  ) fail('base direct-source registry changed; FR117 persistence placement requires re-review.');

  const historical = FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.passages.filter(
    (passage) => passage.passageId === HISTORICAL_PASSAGE_REF,
  );
  if (
    historical.length !== 1 ||
    historical[0]?.witnessId !== 'witness.shenxiang_quanbian.ctext' ||
    historical[0]?.verificationStatus !== 'unverified_ocr' ||
    historical[0]?.originalText !== FR104_NLC_INTAKE_PAGE_VERIFICATION.originalText
  ) fail('historical Face intake passage prerequisite drift.');

  if (FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.passages.some((passage) => passage.passageId === WITNESS_QUALIFIED_PASSAGE_REF)) {
    fail('witness-qualified Face passage already exists and requires idempotency re-review.');
  }
  const witness = FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.witnesses.find((entry) => entry.witnessId === NLC_WITNESS);
  if (witness === undefined || witness.witnessStatus !== 'verified') fail('NLC witness prerequisite drift.');
}

assertPersistencePrerequisites();

const sourceVerification: DirectSourcePageVerificationRecord = FR104_NLC_INTAKE_PAGE_VERIFICATION;

export const FR117_NLC_WITNESS_QUALIFIED_PAGE_VERIFICATION: DirectSourcePageVerificationRecord = Object.freeze({
  verificationId: CHILD_VERIFICATION_ID,
  version: sourceVerification.version,
  candidateRef: sourceVerification.candidateRef,
  witnessId: sourceVerification.witnessId,
  passageId: WITNESS_QUALIFIED_PASSAGE_REF,
  chapter: sourceVerification.chapter,
  scanPage: sourceVerification.scanPage,
  ...(sourceVerification.printedPage === undefined ? {} : { printedPage: sourceVerification.printedPage }),
  originalText: sourceVerification.originalText,
  visualEvidenceRefs: sourceVerification.visualEvidenceRefs,
  checkerRefs: sourceVerification.checkerRefs,
  state: sourceVerification.state,
  mayPromoteOtherWitness: false,
});

export const FR117_NLC_WITNESS_QUALIFIED_REISSUE_RELATION: DirectSourceVerificationRelation = Object.freeze({
  relationId: RELATION_ID,
  version: '0.1.0',
  kind: 'non_independent_identity_reissue',
  parentVerificationRef: ORIGINAL_VERIFICATION_REF,
  childVerificationRef: CHILD_VERIFICATION_REF,
  parentRetained: true,
  evidenceReusePolicy: 'exact_evidence_reuse_required',
  checkingEventPolicy: 'same_checker_refs_same_checking_event',
  allowedRecordDifferences: Object.freeze(['verificationId', 'passageId'] as const),
  lineageDepthPolicy: 'single_hop_parent_root',
  independentVerificationDelta: 0,
  childMayCountAsIndependentVerification: false,
});

export const FACE_DIRECT_SOURCE_VERIFICATION_FR117_WITNESS_QUALIFIED_REISSUE: DirectSourceVerificationRegistry = Object.freeze({
  registryId: DIRECT_SOURCE_REGISTRY_ID,
  version: '0.1.0',
  candidates: Object.freeze([
    ...FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.candidates,
    FR104_NLC_1925_INTAKE_CANDIDATE,
  ]),
  pageVerifications: Object.freeze([
    ...FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.pageVerifications,
    FR104_NLC_INTAKE_PAGE_VERIFICATION,
    FR117_NLC_WITNESS_QUALIFIED_PAGE_VERIFICATION,
  ]),
  verificationRelations: Object.freeze([FR117_NLC_WITNESS_QUALIFIED_REISSUE_RELATION]),
});

validateDirectSourceVerificationRegistry(FACE_DIRECT_SOURCE_VERIFICATION_FR117_WITNESS_QUALIFIED_REISSUE);

export const FR117_NLC_WITNESS_QUALIFIED_PASSAGE: SourcePassage = Object.freeze(
  materializeVerifiedSourcePassage(
    FR117_NLC_WITNESS_QUALIFIED_PAGE_VERIFICATION,
    FACE_DIRECT_SOURCE_VERIFICATION_FR117_WITNESS_QUALIFIED_REISSUE,
  ),
);

export const FACE_AUTHORITY_FR117_WITNESS_QUALIFIED_RESEARCH_REGISTRY: FaceAuthorityRegistry = Object.freeze({
  ...FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0,
  passages: Object.freeze([
    ...FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.passages,
    FR117_NLC_WITNESS_QUALIFIED_PASSAGE,
  ]),
});

validateFaceAuthorityRegistry(FACE_AUTHORITY_FR117_WITNESS_QUALIFIED_RESEARCH_REGISTRY);

function validatePersistedConstants(): void {
  const parent = FACE_DIRECT_SOURCE_VERIFICATION_FR117_WITNESS_QUALIFIED_REISSUE.pageVerifications.find(
    (record) => `${record.verificationId}@${record.version}` === ORIGINAL_VERIFICATION_REF,
  );
  const child = FACE_DIRECT_SOURCE_VERIFICATION_FR117_WITNESS_QUALIFIED_REISSUE.pageVerifications.find(
    (record) => `${record.verificationId}@${record.version}` === CHILD_VERIFICATION_REF,
  );
  const relation = FACE_DIRECT_SOURCE_VERIFICATION_FR117_WITNESS_QUALIFIED_REISSUE.verificationRelations?.find(
    (entry) => `${entry.relationId}@${entry.version}` === `${RELATION_ID}@0.1.0`,
  );
  if (
    parent === undefined || child === undefined || relation === undefined ||
    parent.passageId !== HISTORICAL_PASSAGE_REF || child.passageId !== WITNESS_QUALIFIED_PASSAGE_REF ||
    parent.witnessId !== NLC_WITNESS || child.witnessId !== NLC_WITNESS ||
    parent.originalText !== child.originalText ||
    !sameSequence(parent.visualEvidenceRefs, child.visualEvidenceRefs) ||
    !sameSequence(parent.checkerRefs, child.checkerRefs) ||
    parent.state !== child.state || relation.parentRetained !== true ||
    relation.independentVerificationDelta !== 0 || relation.childMayCountAsIndependentVerification !== false
  ) fail('persisted direct-source reissue constants drift.');

  const historical = FACE_AUTHORITY_FR117_WITNESS_QUALIFIED_RESEARCH_REGISTRY.passages.find(
    (passage) => passage.passageId === HISTORICAL_PASSAGE_REF,
  );
  const witnessQualified = FACE_AUTHORITY_FR117_WITNESS_QUALIFIED_RESEARCH_REGISTRY.passages.find(
    (passage) => passage.passageId === WITNESS_QUALIFIED_PASSAGE_REF,
  );
  if (
    historical?.witnessId !== 'witness.shenxiang_quanbian.ctext' || historical.verificationStatus !== 'unverified_ocr' ||
    witnessQualified?.witnessId !== NLC_WITNESS || witnessQualified.verificationStatus !== 'scan_checked' ||
    historical.originalText !== witnessQualified.originalText
  ) fail('persisted Face passage provenance boundary drift.');

  const methodology = FACE_AUTHORITY_FR117_WITNESS_QUALIFIED_RESEARCH_REGISTRY.methodologies.find(
    (entry) => `${entry.methodologyId}@${entry.version}` === 'method.shenxiang.five_officers@0.1.0',
  );
  if (
    methodology === undefined ||
    !methodology.sourceRefs.includes(HISTORICAL_PASSAGE_REF) ||
    methodology.sourceRefs.includes(WITNESS_QUALIFIED_PASSAGE_REF)
  ) fail('methodology sourceRefs changed during FR117 persistence.');
}

validatePersistedConstants();

export interface FiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceImplementationFR117V1 {
  readonly schemaVersion: 'fr117-five-officers-intake-witness-qualified-page-verification-reissue-persistence-implementation-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'witness_qualified_reissue_relation_record_and_face_passage_persisted_downstream_authority_still_closed';
  readonly upstream: {
    readonly fr116SchemaVersion: 'fr116-five-officers-intake-witness-qualified-page-verification-reissue-persistence-review-v1';
    readonly fr116AuthorityState: 'bounded_governed_extension_and_face_append_persistence_authorized_execution_not_performed';
    readonly governedDirectSourceExtensionPersistenceAuthorized: true;
    readonly targetRelationPersistenceAuthorized: true;
    readonly targetVerificationRecordPersistenceAuthorized: true;
    readonly witnessQualifiedFacePassagePersistenceAuthorized: true;
    readonly persistenceExecutionAuthorized: true;
    readonly baseDirectSourceRegistryMutationAuthorized: false;
    readonly historicalFacePassageReplacementAuthorized: false;
    readonly persistedBefore: false;
  };
  readonly persistedState: {
    readonly governedDirectSourceRegistryId: typeof DIRECT_SOURCE_REGISTRY_ID;
    readonly originalVerificationRef: typeof ORIGINAL_VERIFICATION_REF;
    readonly childVerificationRef: typeof CHILD_VERIFICATION_REF;
    readonly relationRef: 'verification-lineage.shenxiang_nlc_1925.intake.witness_qualified@0.1.0';
    readonly historicalPassageRef: typeof HISTORICAL_PASSAGE_REF;
    readonly witnessQualifiedPassageRef: typeof WITNESS_QUALIFIED_PASSAGE_REF;
    readonly parentVerificationRetained: true;
    readonly parentVerificationPersistedByThisFrontier: false;
    readonly childVerificationPersisted: true;
    readonly relationPersisted: true;
    readonly witnessQualifiedPassagePersisted: true;
    readonly derivedFaceRegistryPersisted: true;
    readonly baseDirectSourceRegistryMutated: false;
    readonly historicalFacePassageReplaced: false;
    readonly historicalFacePassageRetained: true;
    readonly exactEvidenceReusePreserved: true;
    readonly sameCheckingEventPreserved: true;
    readonly independentVerificationDelta: 0;
    readonly semanticIdentityEquivalenceAsserted: false;
    readonly methodologySourceRefsChanged: false;
  };
  readonly execution: {
    readonly directSourceRegistriesPersisted: 1;
    readonly verificationRelationsPersisted: 1;
    readonly verificationRecordsReissued: 1;
    readonly verificationRecordsPersisted: 1;
    readonly passagesPersisted: 1;
    readonly faceRegistriesPersisted: 1;
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
    readonly persistenceMeansBaseRegistryMutation: false;
    readonly persistenceMeansHistoricalReplacement: false;
    readonly persistenceMeansNewCheckingEvent: false;
    readonly persistenceMayIncreaseIndependentVerificationCount: false;
    readonly exactTextMatchMeansSemanticIdentityEquivalence: false;
    readonly persistedPassageMeansMethodologySourceRefRebound: false;
    readonly persistenceMeansMetricBinding: false;
    readonly persistenceMeansThreshold: false;
    readonly persistenceMeansCriterionState: false;
    readonly persistenceMeansClaim: false;
    readonly persistenceMeansTraditionalSemantics: false;
  };
  readonly recommendedNextFrontier: 'intake_criterion_methodology_source_rebind_post_persistence_review';
  readonly remainingBlockers: readonly string[];
  readonly prohibitedShortcuts: readonly string[];
}

const REQUIRED_BLOCKERS = Object.freeze([
  'intake_criterion_methodology_source_ref_rewrite_not_authorized',
  'intake_criterion_methodology_not_registered',
  'intake_officer_mapping_dependency_not_re_reviewed',
  'intake_metric_to_source_concept_mapping_not_authorized',
  'intake_calibration_and_thresholds_not_authorized',
  'fr64_methodology_execution_and_claim_gates_remain',
] as const);

const REQUIRED_SHORTCUTS = Object.freeze([
  'persistence_to_base_registry_mutation',
  'persistence_to_historical_replacement',
  'persistence_to_new_checking_event',
  'persistence_to_independent_verification_increment',
  'exact_text_match_to_semantic_identity_equivalence',
  'persisted_passage_to_methodology_source_ref_rebind',
  'persistence_to_metric_binding',
  'persistence_to_numeric_threshold',
  'persistence_to_criterion_state',
  'persistence_to_claim',
  'persistence_to_traditional_semantics',
] as const);

export function implementFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceFR117(
  source: FiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceReviewFR116V1,
): FiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceImplementationFR117V1 {
  validateFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceReviewFR116(source);
  if (
    source.authorityState !== 'bounded_governed_extension_and_face_append_persistence_authorized_execution_not_performed' ||
    source.persistenceDecision.governedDirectSourceExtensionPersistenceAuthorized !== true ||
    source.persistenceDecision.targetRelationPersistenceAuthorized !== true ||
    source.persistenceDecision.targetVerificationRecordPersistenceAuthorized !== true ||
    source.persistenceDecision.witnessQualifiedFacePassagePersistenceAuthorized !== true ||
    source.persistenceDecision.persistenceExecutionAuthorized !== true ||
    source.persistenceDecision.baseDirectSourceRegistryMutationAuthorized !== false ||
    source.persistenceDecision.historicalFacePassageReplacementAuthorized !== false ||
    source.execution.directSourceRegistriesPersisted !== 0 ||
    source.execution.verificationRelationsPersisted !== 0 ||
    source.execution.verificationRecordsPersisted !== 0 ||
    source.execution.passagesPersisted !== 0 ||
    source.execution.faceRegistriesPersisted !== 0
  ) fail('FR-116 upstream persistence authority drift.');

  validatePersistedConstants();
  const artifact: FiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceImplementationFR117V1 = Object.freeze({
    schemaVersion: 'fr117-five-officers-intake-witness-qualified-page-verification-reissue-persistence-implementation-v1',
    artifactVersion: '0.1.0',
    authorityState: 'witness_qualified_reissue_relation_record_and_face_passage_persisted_downstream_authority_still_closed',
    upstream: Object.freeze({
      fr116SchemaVersion: source.schemaVersion,
      fr116AuthorityState: source.authorityState,
      governedDirectSourceExtensionPersistenceAuthorized: true,
      targetRelationPersistenceAuthorized: true,
      targetVerificationRecordPersistenceAuthorized: true,
      witnessQualifiedFacePassagePersistenceAuthorized: true,
      persistenceExecutionAuthorized: true,
      baseDirectSourceRegistryMutationAuthorized: false,
      historicalFacePassageReplacementAuthorized: false,
      persistedBefore: false,
    }),
    persistedState: Object.freeze({
      governedDirectSourceRegistryId: DIRECT_SOURCE_REGISTRY_ID,
      originalVerificationRef: ORIGINAL_VERIFICATION_REF,
      childVerificationRef: CHILD_VERIFICATION_REF,
      relationRef: 'verification-lineage.shenxiang_nlc_1925.intake.witness_qualified@0.1.0' as const,
      historicalPassageRef: HISTORICAL_PASSAGE_REF,
      witnessQualifiedPassageRef: WITNESS_QUALIFIED_PASSAGE_REF,
      parentVerificationRetained: true as const,
      parentVerificationPersistedByThisFrontier: false as const,
      childVerificationPersisted: true as const,
      relationPersisted: true as const,
      witnessQualifiedPassagePersisted: true as const,
      derivedFaceRegistryPersisted: true as const,
      baseDirectSourceRegistryMutated: false as const,
      historicalFacePassageReplaced: false as const,
      historicalFacePassageRetained: true as const,
      exactEvidenceReusePreserved: true as const,
      sameCheckingEventPreserved: true as const,
      independentVerificationDelta: 0 as const,
      semanticIdentityEquivalenceAsserted: false as const,
      methodologySourceRefsChanged: false as const,
    }),
    execution: Object.freeze({
      directSourceRegistriesPersisted: 1 as const,
      verificationRelationsPersisted: 1 as const,
      verificationRecordsReissued: 1 as const,
      verificationRecordsPersisted: 1 as const,
      passagesPersisted: 1 as const,
      faceRegistriesPersisted: 1 as const,
      methodologySourceRefsRewritten: 0 as const,
      methodologyDefinitionsPersisted: 0 as const,
      methodologyExecutionIssued: false as const,
      metricBindingsIssued: 0 as const,
      thresholdsIssued: 0 as const,
      criterionStatesIssued: 0 as const,
      claimsIssued: 0 as const,
      traditionalSemanticAuthority: false as const,
    }),
    authorityBoundary: Object.freeze({
      persistenceMeansBaseRegistryMutation: false as const,
      persistenceMeansHistoricalReplacement: false as const,
      persistenceMeansNewCheckingEvent: false as const,
      persistenceMayIncreaseIndependentVerificationCount: false as const,
      exactTextMatchMeansSemanticIdentityEquivalence: false as const,
      persistedPassageMeansMethodologySourceRefRebound: false as const,
      persistenceMeansMetricBinding: false as const,
      persistenceMeansThreshold: false as const,
      persistenceMeansCriterionState: false as const,
      persistenceMeansClaim: false as const,
      persistenceMeansTraditionalSemantics: false as const,
    }),
    recommendedNextFrontier: 'intake_criterion_methodology_source_rebind_post_persistence_review',
    remainingBlockers: REQUIRED_BLOCKERS,
    prohibitedShortcuts: REQUIRED_SHORTCUTS,
  });
  return validateFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceImplementationFR117(artifact);
}

export function validateFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceImplementationFR117(
  artifact: FiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceImplementationFR117V1,
): FiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceImplementationFR117V1 {
  if (
    artifact.schemaVersion !== 'fr117-five-officers-intake-witness-qualified-page-verification-reissue-persistence-implementation-v1' ||
    artifact.artifactVersion !== '0.1.0' ||
    artifact.authorityState !== 'witness_qualified_reissue_relation_record_and_face_passage_persisted_downstream_authority_still_closed'
  ) fail('schema or authority-state drift.');
  if (
    artifact.upstream.fr116SchemaVersion !== 'fr116-five-officers-intake-witness-qualified-page-verification-reissue-persistence-review-v1' ||
    artifact.upstream.fr116AuthorityState !== 'bounded_governed_extension_and_face_append_persistence_authorized_execution_not_performed' ||
    artifact.upstream.governedDirectSourceExtensionPersistenceAuthorized !== true ||
    artifact.upstream.targetRelationPersistenceAuthorized !== true ||
    artifact.upstream.targetVerificationRecordPersistenceAuthorized !== true ||
    artifact.upstream.witnessQualifiedFacePassagePersistenceAuthorized !== true ||
    artifact.upstream.persistenceExecutionAuthorized !== true ||
    artifact.upstream.baseDirectSourceRegistryMutationAuthorized !== false ||
    artifact.upstream.historicalFacePassageReplacementAuthorized !== false ||
    artifact.upstream.persistedBefore !== false
  ) fail('upstream boundary drift.');
  if (
    artifact.persistedState.governedDirectSourceRegistryId !== DIRECT_SOURCE_REGISTRY_ID ||
    artifact.persistedState.originalVerificationRef !== ORIGINAL_VERIFICATION_REF ||
    artifact.persistedState.childVerificationRef !== CHILD_VERIFICATION_REF ||
    artifact.persistedState.relationRef !== `${RELATION_ID}@0.1.0` ||
    artifact.persistedState.historicalPassageRef !== HISTORICAL_PASSAGE_REF ||
    artifact.persistedState.witnessQualifiedPassageRef !== WITNESS_QUALIFIED_PASSAGE_REF ||
    artifact.persistedState.parentVerificationRetained !== true ||
    artifact.persistedState.parentVerificationPersistedByThisFrontier !== false ||
    artifact.persistedState.childVerificationPersisted !== true ||
    artifact.persistedState.relationPersisted !== true ||
    artifact.persistedState.witnessQualifiedPassagePersisted !== true ||
    artifact.persistedState.derivedFaceRegistryPersisted !== true ||
    artifact.persistedState.baseDirectSourceRegistryMutated !== false ||
    artifact.persistedState.historicalFacePassageReplaced !== false ||
    artifact.persistedState.historicalFacePassageRetained !== true ||
    artifact.persistedState.exactEvidenceReusePreserved !== true ||
    artifact.persistedState.sameCheckingEventPreserved !== true ||
    artifact.persistedState.independentVerificationDelta !== 0 ||
    artifact.persistedState.semanticIdentityEquivalenceAsserted !== false ||
    artifact.persistedState.methodologySourceRefsChanged !== false
  ) fail('persisted-state drift.');
  if (
    artifact.execution.directSourceRegistriesPersisted !== 1 ||
    artifact.execution.verificationRelationsPersisted !== 1 ||
    artifact.execution.verificationRecordsReissued !== 1 ||
    artifact.execution.verificationRecordsPersisted !== 1 ||
    artifact.execution.passagesPersisted !== 1 ||
    artifact.execution.faceRegistriesPersisted !== 1 ||
    artifact.execution.methodologySourceRefsRewritten !== 0 ||
    artifact.execution.methodologyDefinitionsPersisted !== 0 ||
    artifact.execution.methodologyExecutionIssued !== false ||
    artifact.execution.metricBindingsIssued !== 0 ||
    artifact.execution.thresholdsIssued !== 0 ||
    artifact.execution.criterionStatesIssued !== 0 ||
    artifact.execution.claimsIssued !== 0 ||
    artifact.execution.traditionalSemanticAuthority !== false
  ) fail('execution-state drift.');
  if (
    artifact.authorityBoundary.persistenceMeansBaseRegistryMutation !== false ||
    artifact.authorityBoundary.persistenceMeansHistoricalReplacement !== false ||
    artifact.authorityBoundary.persistenceMeansNewCheckingEvent !== false ||
    artifact.authorityBoundary.persistenceMayIncreaseIndependentVerificationCount !== false ||
    artifact.authorityBoundary.exactTextMatchMeansSemanticIdentityEquivalence !== false ||
    artifact.authorityBoundary.persistedPassageMeansMethodologySourceRefRebound !== false ||
    artifact.authorityBoundary.persistenceMeansMetricBinding !== false ||
    artifact.authorityBoundary.persistenceMeansThreshold !== false ||
    artifact.authorityBoundary.persistenceMeansCriterionState !== false ||
    artifact.authorityBoundary.persistenceMeansClaim !== false ||
    artifact.authorityBoundary.persistenceMeansTraditionalSemantics !== false
  ) fail('authority-boundary drift.');
  if (artifact.recommendedNextFrontier !== 'intake_criterion_methodology_source_rebind_post_persistence_review') fail('next frontier drift.');
  if (!sameSequence(artifact.remainingBlockers, REQUIRED_BLOCKERS)) fail('remaining blockers drift.');
  if (!sameSequence(artifact.prohibitedShortcuts, REQUIRED_SHORTCUTS)) fail('prohibited shortcuts drift.');
  validatePersistedConstants();
  return artifact;
}
