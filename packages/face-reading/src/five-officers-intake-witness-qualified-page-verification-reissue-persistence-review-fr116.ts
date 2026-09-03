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
  validateFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePostLineageAdmissionReviewFR115,
  type FiveOfficerIntakeWitnessQualifiedPageVerificationReissuePostLineageAdmissionReviewFR115V1,
} from './five-officers-intake-witness-qualified-page-verification-reissue-post-lineage-admission-review-fr115.js';
import { FaceAuthorityValidationError, validateFaceAuthorityRegistry } from './validation.js';

const ORIGINAL_VERIFICATION_REF = 'verification.shenxiang_nlc_1925.intake@0.1.0' as const;
const CHILD_VERIFICATION_ID = 'verification.shenxiang_nlc_1925.intake.witness_qualified' as const;
const CHILD_VERIFICATION_REF = 'verification.shenxiang_nlc_1925.intake.witness_qualified@0.1.0' as const;
const HISTORICAL_PASSAGE_REF = 'passage.shenxiang.five_officers.intake' as const;
const WITNESS_QUALIFIED_PASSAGE_REF = 'passage.shenxiang.five_officers.intake.nlc_1925' as const;
const RELATION_ID = 'verification-lineage.shenxiang_nlc_1925.intake.witness_qualified' as const;
const NLC_WITNESS = 'witness.shenxiang_quanbian.nlc_1925' as const;

export interface FiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceReviewFR116V1 {
  readonly schemaVersion: 'fr116-five-officers-intake-witness-qualified-page-verification-reissue-persistence-review-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'bounded_governed_extension_and_face_append_persistence_authorized_execution_not_performed';
  readonly upstream: {
    readonly fr115SchemaVersion: 'fr115-five-officers-intake-witness-qualified-page-verification-reissue-post-lineage-admission-review-v1';
    readonly fr115AuthorityState: 'witness_qualified_page_verification_reissue_admitted_core_lineage_available_persistence_not_executed';
    readonly verificationReissueAdmissionAuthorized: true;
    readonly persistenceReviewAuthorized: true;
    readonly targetRelationPersistenceAuthorizedBefore: false;
    readonly targetVerificationRecordPersistenceAuthorizedBefore: false;
    readonly targetPassagePersistenceAuthorizedBefore: false;
    readonly verificationRelationsPersistedBefore: 0;
    readonly verificationRecordsPersistedBefore: 0;
    readonly passagesPersistedBefore: 0;
    readonly traditionalSemanticAuthorityBefore: false;
  };
  readonly placementReview: {
    readonly directSourcePlacement: 'separate_governed_registry_extension';
    readonly facePassagePlacement: 'witness_qualified_append_to_derived_face_registry';
    readonly baseDirectSourceRegistryMutationAuthorized: false;
    readonly historicalFacePassageReplacementAuthorized: false;
    readonly historicalFacePassageRetained: true;
    readonly nlcWitnessAlreadyRegistered: true;
    readonly directSourceExtensionProbeValidationPassed: true;
    readonly faceRegistryAppendProbeValidationPassed: true;
    readonly childMaterializationPassed: true;
    readonly childPassageId: typeof WITNESS_QUALIFIED_PASSAGE_REF;
    readonly childWitnessId: typeof NLC_WITNESS;
    readonly childVerificationStatus: 'scan_checked';
    readonly exactEvidenceReuseRequired: true;
    readonly sameCheckingEventRequired: true;
    readonly independentVerificationDelta: 0;
    readonly semanticIdentityEquivalenceAsserted: false;
  };
  readonly persistenceDecision: {
    readonly governedDirectSourceExtensionPersistenceAuthorized: true;
    readonly targetRelationPersistenceAuthorized: true;
    readonly targetVerificationRecordPersistenceAuthorized: true;
    readonly witnessQualifiedFacePassagePersistenceAuthorized: true;
    readonly persistenceExecutionAuthorized: true;
    readonly baseDirectSourceRegistryMutationAuthorized: false;
    readonly historicalFacePassageReplacementAuthorized: false;
    readonly methodologySourceRefRewriteAuthorized: false;
    readonly methodologyDefinitionPersistenceAuthorized: false;
    readonly methodologyExecutionAuthorized: false;
    readonly metricBindingAuthorized: false;
    readonly thresholdAuthorized: false;
    readonly criterionStateAuthorized: false;
    readonly claimAuthorized: false;
    readonly traditionalSemanticAuthority: false;
  };
  readonly execution: {
    readonly directSourceRegistriesPersisted: 0;
    readonly verificationRelationsPersisted: 0;
    readonly verificationRecordsReissued: 0;
    readonly verificationRecordsPersisted: 0;
    readonly passagesPersisted: 0;
    readonly faceRegistriesPersisted: 0;
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
    readonly persistenceAuthorityMeansExecutionAlreadyOccurred: false;
    readonly governedExtensionPersistenceMeansBaseRegistryMutation: false;
    readonly faceAppendPersistenceMeansHistoricalReplacement: false;
    readonly relationMeansNewCheckingEvent: false;
    readonly relationMayIncreaseIndependentVerificationCount: false;
    readonly exactTextMatchMeansSemanticIdentityEquivalence: false;
    readonly persistenceMeansMethodologySourceRefRewrite: false;
    readonly persistenceMeansMetricBinding: false;
    readonly persistenceMeansThreshold: false;
    readonly persistenceMeansTraditionalSemantics: false;
  };
  readonly recommendedNextFrontier: 'intake_witness_qualified_page_verification_reissue_persistence_implementation';
  readonly remainingBlockers: readonly string[];
  readonly prohibitedShortcuts: readonly string[];
}

const REQUIRED_BLOCKERS = Object.freeze([
  'authorized_reissue_relation_record_and_passage_not_yet_persisted',
  'intake_criterion_methodology_source_ref_rewrite_not_authorized',
  'intake_criterion_methodology_not_registered',
  'intake_officer_mapping_dependency_not_re_reviewed',
  'intake_metric_to_source_concept_mapping_not_authorized',
  'intake_calibration_and_thresholds_not_authorized',
  'fr64_methodology_execution_and_claim_gates_remain',
] as const);

const REQUIRED_SHORTCUTS = Object.freeze([
  'persistence_authority_to_execution_already_occurred',
  'governed_extension_persistence_to_base_registry_mutation',
  'face_append_persistence_to_historical_replacement',
  'relation_to_new_checking_event',
  'relation_to_independent_verification_increment',
  'exact_text_match_to_semantic_identity_equivalence',
  'persistence_to_methodology_source_ref_rewrite',
  'persistence_to_metric_binding',
  'persistence_to_numeric_threshold',
  'persistence_to_traditional_semantics',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-116 ${message}`);
}

function sameSequence<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function buildChildVerification(): DirectSourcePageVerificationRecord {
  const source: DirectSourcePageVerificationRecord = FR104_NLC_INTAKE_PAGE_VERIFICATION;
  return Object.freeze({
    verificationId: CHILD_VERIFICATION_ID,
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
    childVerificationRef: CHILD_VERIFICATION_REF,
    parentRetained: true,
    evidenceReusePolicy: 'exact_evidence_reuse_required',
    checkingEventPolicy: 'same_checker_refs_same_checking_event',
    allowedRecordDifferences: ['verificationId', 'passageId'] as const,
    lineageDepthPolicy: 'single_hop_parent_root',
    independentVerificationDelta: 0,
    childMayCountAsIndependentVerification: false,
  });
}

function probePersistencePlacement(): FiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceReviewFR116V1['placementReview'] {
  validateDirectSourceVerificationRegistry(FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0);
  validateFaceAuthorityRegistry(FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0);

  const historical = FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.passages.find(
    (passage) => passage.passageId === HISTORICAL_PASSAGE_REF,
  );
  if (
    historical === undefined ||
    historical.witnessId !== 'witness.shenxiang_quanbian.ctext' ||
    historical.verificationStatus !== 'unverified_ocr'
  ) fail('historical Face passage prerequisite drift.');

  const nlcWitness = FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.witnesses.find(
    (witness) => witness.witnessId === NLC_WITNESS,
  );
  if (nlcWitness === undefined || nlcWitness.witnessStatus !== 'verified') fail('NLC witness prerequisite drift.');

  if (
    FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.pageVerifications.length !== 0 ||
    FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.candidates.some((candidate) => candidate.witnessId === NLC_WITNESS)
  ) fail('base direct-source registry changed; governed-extension placement requires re-review.');

  const child = buildChildVerification();
  const relation = buildRelation();
  const directSourceExtension: DirectSourceVerificationRegistry = {
    registryId: 'direct-source-verification.face.fr116_persistence_probe',
    version: '0.1.0',
    candidates: [...FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.candidates, FR104_NLC_1925_INTAKE_CANDIDATE],
    pageVerifications: [
      ...FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.pageVerifications,
      FR104_NLC_INTAKE_PAGE_VERIFICATION,
      child,
    ],
    verificationRelations: [relation],
  };
  validateDirectSourceVerificationRegistry(directSourceExtension);

  const passage: SourcePassage = materializeVerifiedSourcePassage(child, directSourceExtension);
  if (
    passage.passageId !== WITNESS_QUALIFIED_PASSAGE_REF ||
    passage.witnessId !== NLC_WITNESS ||
    passage.verificationStatus !== 'scan_checked' ||
    passage.originalText !== historical.originalText
  ) fail('witness-qualified child materialization drift.');

  const faceProbe: FaceAuthorityRegistry = {
    ...FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0,
    passages: [...FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.passages, passage],
  };
  validateFaceAuthorityRegistry(faceProbe);
  const retained = faceProbe.passages.find((item) => item.passageId === HISTORICAL_PASSAGE_REF);
  const appended = faceProbe.passages.find((item) => item.passageId === WITNESS_QUALIFIED_PASSAGE_REF);
  if (
    retained?.witnessId !== 'witness.shenxiang_quanbian.ctext' ||
    appended?.witnessId !== NLC_WITNESS ||
    appended.verificationStatus !== 'scan_checked'
  ) fail('Face registry append probe failed provenance preservation.');

  return Object.freeze({
    directSourcePlacement: 'separate_governed_registry_extension' as const,
    facePassagePlacement: 'witness_qualified_append_to_derived_face_registry' as const,
    baseDirectSourceRegistryMutationAuthorized: false as const,
    historicalFacePassageReplacementAuthorized: false as const,
    historicalFacePassageRetained: true as const,
    nlcWitnessAlreadyRegistered: true as const,
    directSourceExtensionProbeValidationPassed: true as const,
    faceRegistryAppendProbeValidationPassed: true as const,
    childMaterializationPassed: true as const,
    childPassageId: WITNESS_QUALIFIED_PASSAGE_REF,
    childWitnessId: NLC_WITNESS,
    childVerificationStatus: 'scan_checked' as const,
    exactEvidenceReuseRequired: true as const,
    sameCheckingEventRequired: true as const,
    independentVerificationDelta: 0 as const,
    semanticIdentityEquivalenceAsserted: false as const,
  });
}

export function reviewFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceFR116(
  source: FiveOfficerIntakeWitnessQualifiedPageVerificationReissuePostLineageAdmissionReviewFR115V1,
): FiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceReviewFR116V1 {
  validateFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePostLineageAdmissionReviewFR115(source);
  if (
    source.authorityState !== 'witness_qualified_page_verification_reissue_admitted_core_lineage_available_persistence_not_executed' ||
    source.admissionReview.verificationReissueAdmissionAuthorized !== true ||
    source.admissionReview.persistenceReviewAuthorized !== true ||
    source.admissionReview.targetRelationPersistenceAuthorized !== false ||
    source.admissionReview.targetVerificationRecordPersistenceAuthorized !== false ||
    source.admissionReview.targetPassagePersistenceAuthorized !== false ||
    source.execution.verificationRelationsPersisted !== 0 ||
    source.execution.verificationRecordsPersisted !== 0 ||
    source.execution.passagesPersisted !== 0 ||
    source.execution.traditionalSemanticAuthority !== false
  ) fail('FR-115 upstream authority drift.');

  const artifact: FiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceReviewFR116V1 = Object.freeze({
    schemaVersion: 'fr116-five-officers-intake-witness-qualified-page-verification-reissue-persistence-review-v1',
    artifactVersion: '0.1.0',
    authorityState: 'bounded_governed_extension_and_face_append_persistence_authorized_execution_not_performed',
    upstream: Object.freeze({
      fr115SchemaVersion: source.schemaVersion,
      fr115AuthorityState: source.authorityState,
      verificationReissueAdmissionAuthorized: true,
      persistenceReviewAuthorized: true,
      targetRelationPersistenceAuthorizedBefore: false,
      targetVerificationRecordPersistenceAuthorizedBefore: false,
      targetPassagePersistenceAuthorizedBefore: false,
      verificationRelationsPersistedBefore: 0,
      verificationRecordsPersistedBefore: 0,
      passagesPersistedBefore: 0,
      traditionalSemanticAuthorityBefore: false,
    }),
    placementReview: probePersistencePlacement(),
    persistenceDecision: Object.freeze({
      governedDirectSourceExtensionPersistenceAuthorized: true as const,
      targetRelationPersistenceAuthorized: true as const,
      targetVerificationRecordPersistenceAuthorized: true as const,
      witnessQualifiedFacePassagePersistenceAuthorized: true as const,
      persistenceExecutionAuthorized: true as const,
      baseDirectSourceRegistryMutationAuthorized: false as const,
      historicalFacePassageReplacementAuthorized: false as const,
      methodologySourceRefRewriteAuthorized: false as const,
      methodologyDefinitionPersistenceAuthorized: false as const,
      methodologyExecutionAuthorized: false as const,
      metricBindingAuthorized: false as const,
      thresholdAuthorized: false as const,
      criterionStateAuthorized: false as const,
      claimAuthorized: false as const,
      traditionalSemanticAuthority: false as const,
    }),
    execution: Object.freeze({
      directSourceRegistriesPersisted: 0 as const,
      verificationRelationsPersisted: 0 as const,
      verificationRecordsReissued: 0 as const,
      verificationRecordsPersisted: 0 as const,
      passagesPersisted: 0 as const,
      faceRegistriesPersisted: 0 as const,
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
      persistenceAuthorityMeansExecutionAlreadyOccurred: false as const,
      governedExtensionPersistenceMeansBaseRegistryMutation: false as const,
      faceAppendPersistenceMeansHistoricalReplacement: false as const,
      relationMeansNewCheckingEvent: false as const,
      relationMayIncreaseIndependentVerificationCount: false as const,
      exactTextMatchMeansSemanticIdentityEquivalence: false as const,
      persistenceMeansMethodologySourceRefRewrite: false as const,
      persistenceMeansMetricBinding: false as const,
      persistenceMeansThreshold: false as const,
      persistenceMeansTraditionalSemantics: false as const,
    }),
    recommendedNextFrontier: 'intake_witness_qualified_page_verification_reissue_persistence_implementation',
    remainingBlockers: REQUIRED_BLOCKERS,
    prohibitedShortcuts: REQUIRED_SHORTCUTS,
  });
  return validateFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceReviewFR116(artifact);
}

export function validateFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceReviewFR116(
  artifact: FiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceReviewFR116V1,
): FiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceReviewFR116V1 {
  if (
    artifact.schemaVersion !== 'fr116-five-officers-intake-witness-qualified-page-verification-reissue-persistence-review-v1' ||
    artifact.artifactVersion !== '0.1.0' ||
    artifact.authorityState !== 'bounded_governed_extension_and_face_append_persistence_authorized_execution_not_performed'
  ) fail('schema or authority state drift.');
  if (
    artifact.upstream.fr115SchemaVersion !== 'fr115-five-officers-intake-witness-qualified-page-verification-reissue-post-lineage-admission-review-v1' ||
    artifact.upstream.fr115AuthorityState !== 'witness_qualified_page_verification_reissue_admitted_core_lineage_available_persistence_not_executed' ||
    artifact.upstream.verificationReissueAdmissionAuthorized !== true ||
    artifact.upstream.persistenceReviewAuthorized !== true ||
    artifact.upstream.targetRelationPersistenceAuthorizedBefore !== false ||
    artifact.upstream.targetVerificationRecordPersistenceAuthorizedBefore !== false ||
    artifact.upstream.targetPassagePersistenceAuthorizedBefore !== false ||
    artifact.upstream.verificationRelationsPersistedBefore !== 0 ||
    artifact.upstream.verificationRecordsPersistedBefore !== 0 ||
    artifact.upstream.passagesPersistedBefore !== 0 ||
    artifact.upstream.traditionalSemanticAuthorityBefore !== false
  ) fail('upstream boundary drift.');
  if (
    artifact.placementReview.directSourcePlacement !== 'separate_governed_registry_extension' ||
    artifact.placementReview.facePassagePlacement !== 'witness_qualified_append_to_derived_face_registry' ||
    artifact.placementReview.baseDirectSourceRegistryMutationAuthorized !== false ||
    artifact.placementReview.historicalFacePassageReplacementAuthorized !== false ||
    artifact.placementReview.historicalFacePassageRetained !== true ||
    artifact.placementReview.nlcWitnessAlreadyRegistered !== true ||
    artifact.placementReview.directSourceExtensionProbeValidationPassed !== true ||
    artifact.placementReview.faceRegistryAppendProbeValidationPassed !== true ||
    artifact.placementReview.childMaterializationPassed !== true ||
    artifact.placementReview.childPassageId !== WITNESS_QUALIFIED_PASSAGE_REF ||
    artifact.placementReview.childWitnessId !== NLC_WITNESS ||
    artifact.placementReview.childVerificationStatus !== 'scan_checked' ||
    artifact.placementReview.exactEvidenceReuseRequired !== true ||
    artifact.placementReview.sameCheckingEventRequired !== true ||
    artifact.placementReview.independentVerificationDelta !== 0 ||
    artifact.placementReview.semanticIdentityEquivalenceAsserted !== false
  ) fail('persistence placement review drift.');
  if (
    artifact.persistenceDecision.governedDirectSourceExtensionPersistenceAuthorized !== true ||
    artifact.persistenceDecision.targetRelationPersistenceAuthorized !== true ||
    artifact.persistenceDecision.targetVerificationRecordPersistenceAuthorized !== true ||
    artifact.persistenceDecision.witnessQualifiedFacePassagePersistenceAuthorized !== true ||
    artifact.persistenceDecision.persistenceExecutionAuthorized !== true ||
    artifact.persistenceDecision.baseDirectSourceRegistryMutationAuthorized !== false ||
    artifact.persistenceDecision.historicalFacePassageReplacementAuthorized !== false ||
    artifact.persistenceDecision.methodologySourceRefRewriteAuthorized !== false ||
    artifact.persistenceDecision.methodologyDefinitionPersistenceAuthorized !== false ||
    artifact.persistenceDecision.methodologyExecutionAuthorized !== false ||
    artifact.persistenceDecision.metricBindingAuthorized !== false ||
    artifact.persistenceDecision.thresholdAuthorized !== false ||
    artifact.persistenceDecision.criterionStateAuthorized !== false ||
    artifact.persistenceDecision.claimAuthorized !== false ||
    artifact.persistenceDecision.traditionalSemanticAuthority !== false
  ) fail('persistence decision drift.');
  if (
    artifact.execution.directSourceRegistriesPersisted !== 0 ||
    artifact.execution.verificationRelationsPersisted !== 0 ||
    artifact.execution.verificationRecordsReissued !== 0 ||
    artifact.execution.verificationRecordsPersisted !== 0 ||
    artifact.execution.passagesPersisted !== 0 ||
    artifact.execution.faceRegistriesPersisted !== 0 ||
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
    artifact.authorityBoundary.persistenceAuthorityMeansExecutionAlreadyOccurred !== false ||
    artifact.authorityBoundary.governedExtensionPersistenceMeansBaseRegistryMutation !== false ||
    artifact.authorityBoundary.faceAppendPersistenceMeansHistoricalReplacement !== false ||
    artifact.authorityBoundary.relationMeansNewCheckingEvent !== false ||
    artifact.authorityBoundary.relationMayIncreaseIndependentVerificationCount !== false ||
    artifact.authorityBoundary.exactTextMatchMeansSemanticIdentityEquivalence !== false ||
    artifact.authorityBoundary.persistenceMeansMethodologySourceRefRewrite !== false ||
    artifact.authorityBoundary.persistenceMeansMetricBinding !== false ||
    artifact.authorityBoundary.persistenceMeansThreshold !== false ||
    artifact.authorityBoundary.persistenceMeansTraditionalSemantics !== false
  ) fail('authority-boundary drift.');
  if (artifact.recommendedNextFrontier !== 'intake_witness_qualified_page_verification_reissue_persistence_implementation') fail('next frontier drift.');
  if (!sameSequence(artifact.remainingBlockers, REQUIRED_BLOCKERS)) fail('remaining blockers drift.');
  if (!sameSequence(artifact.prohibitedShortcuts, REQUIRED_SHORTCUTS)) fail('prohibited shortcuts drift.');
  return artifact;
}
