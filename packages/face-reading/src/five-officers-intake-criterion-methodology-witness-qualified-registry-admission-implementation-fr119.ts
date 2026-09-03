import type { FaceAuthorityRegistry } from './contracts.js';
import { FIVE_OFFICER_CRITERIA_V0 } from './five-officers-six-fus-research-v0.js';
import { FACE_AUTHORITY_FR117_WITNESS_QUALIFIED_RESEARCH_REGISTRY } from './five-officers-intake-witness-qualified-page-verification-reissue-persistence-implementation-fr117.js';
import {
  FR118_INTAKE_CRITERION_METHODOLOGY_WITNESS_QUALIFIED_SUCCESSOR,
  validateFiveOfficerIntakeCriterionMethodologySourceRebindPostPersistenceReviewFR118,
  type FiveOfficerIntakeCriterionMethodologySourceRebindPostPersistenceReviewFR118V1,
} from './five-officers-intake-criterion-methodology-source-rebind-post-persistence-review-fr118.js';
import { FaceAuthorityValidationError, validateFaceAuthorityRegistry } from './validation.js';

const FULL_METHODOLOGY_REF = 'method.shenxiang.five_officers@0.1.0' as const;
const PRIOR_CANDIDATE_REF = 'method.shenxiang.five_officers.intake_criteria@0.1.0' as const;
const SUCCESSOR_REF = 'method.shenxiang.five_officers.intake_criteria@0.2.0' as const;
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

export const FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY: FaceAuthorityRegistry = Object.freeze({
  ...FACE_AUTHORITY_FR117_WITNESS_QUALIFIED_RESEARCH_REGISTRY,
  methodologies: Object.freeze([
    ...FACE_AUTHORITY_FR117_WITNESS_QUALIFIED_RESEARCH_REGISTRY.methodologies,
    FR118_INTAKE_CRITERION_METHODOLOGY_WITNESS_QUALIFIED_SUCCESSOR,
  ]),
});

export interface FiveOfficerIntakeCriterionMethodologyWitnessQualifiedRegistryAdmissionImplementationFR119V1 {
  readonly schemaVersion: 'fr119-five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'witness_qualified_intake_criterion_methodology_successor_persisted_downstream_execution_still_closed';
  readonly upstream: {
    readonly fr118SchemaVersion: 'fr118-five-officers-intake-criterion-methodology-source-rebind-post-persistence-review-v1';
    readonly fr118AuthorityState: 'witness_qualified_intake_criterion_methodology_successor_admitted_registry_persistence_not_executed';
    readonly successorMethodologyRef: typeof SUCCESSOR_REF;
    readonly successorSourceRef: typeof WITNESS_QUALIFIED_PASSAGE_REF;
    readonly successorSourceRebindAuthorized: true;
    readonly successorDefinitionAdmitted: true;
    readonly successorRegistryAdmissionImplementationAuthorized: true;
    readonly successorPersistedBefore: false;
    readonly methodologyDefinitionsPersistedBefore: 0;
    readonly methodologyPackMutationsBefore: 0;
    readonly criterionDefinitionSourceRefsRewrittenBefore: 0;
    readonly metricBindingsIssuedBefore: 0;
    readonly thresholdsIssuedBefore: 0;
    readonly criterionStatesIssuedBefore: 0;
    readonly claimsIssuedBefore: 0;
    readonly traditionalSemanticAuthorityBefore: false;
  };
  readonly persistedState: {
    readonly registryValidated: true;
    readonly successorMethodologyRef: typeof SUCCESSOR_REF;
    readonly successorMethodologyId: 'method.shenxiang.five_officers.intake_criteria';
    readonly successorVersion: '0.2.0';
    readonly successorReviewStatus: 'research';
    readonly successorSourceRefs: readonly [typeof WITNESS_QUALIFIED_PASSAGE_REF];
    readonly successorSourceResolves: true;
    readonly successorSourceVerificationStatus: 'scan_checked';
    readonly successorSourceWitnessId: typeof NLC_WITNESS;
    readonly priorCandidatePersisted: false;
    readonly historicalPassageRetained: true;
    readonly witnessQualifiedPassageRetained: true;
    readonly fullFiveOfficersMethodologyRetained: true;
    readonly fullFiveOfficersMethodologyUnchanged: true;
    readonly methodologyPackUnchanged: true;
    readonly historicalCriterionDefinitionsRetained: true;
    readonly historicalCriterionDefinitionSourceRefsRetained: true;
  };
  readonly execution: {
    readonly methodologyRegistryEntriesPersisted: 1;
    readonly methodologyDefinitionsPersisted: 1;
    readonly methodologySourceRefsRewritten: 0;
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
    readonly successorPersistenceMeansPriorCandidatePersistence: false;
    readonly successorPersistenceMeansFullMethodologyReplacement: false;
    readonly successorPersistenceMeansMethodologyPackMembership: false;
    readonly successorPersistenceMeansHistoricalPassageReplacement: false;
    readonly successorPersistenceMeansCriterionDefinitionRewrite: false;
    readonly researchMethodologyPersistenceMeansExecution: false;
    readonly researchMethodologyPersistenceMeansProductionPromotion: false;
    readonly researchMethodologyPersistenceMeansMetricBinding: false;
    readonly researchMethodologyPersistenceMeansThreshold: false;
    readonly researchMethodologyPersistenceMeansCriterionState: false;
    readonly researchMethodologyPersistenceMeansClaim: false;
    readonly researchMethodologyPersistenceMeansTraditionalSemantics: false;
  };
  readonly recommendedNextFrontier: 'intake_criterion_definition_witness_qualified_source_rebind_review';
  readonly remainingBlockers: readonly string[];
  readonly prohibitedShortcuts: readonly string[];
}

const REQUIRED_BLOCKERS = Object.freeze([
  'intake_criterion_definition_source_refs_still_historical',
  'intake_officer_mapping_dependency_not_re_reviewed',
  'intake_metric_to_source_concept_mapping_not_authorized',
  'intake_calibration_and_thresholds_not_authorized',
  'fr64_methodology_execution_and_claim_gates_remain',
] as const);

const REQUIRED_SHORTCUTS = Object.freeze([
  'successor_persistence_to_prior_candidate_persistence',
  'successor_persistence_to_full_methodology_replacement',
  'successor_persistence_to_methodology_pack_membership',
  'successor_persistence_to_historical_passage_replacement',
  'successor_persistence_to_criterion_definition_source_ref_rewrite',
  'research_methodology_persistence_to_execution',
  'research_methodology_persistence_to_production_promotion',
  'research_methodology_persistence_to_metric_binding',
  'research_methodology_persistence_to_numeric_threshold',
  'research_methodology_persistence_to_criterion_state',
  'research_methodology_persistence_to_claim',
  'research_methodology_persistence_to_traditional_semantics',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-119 ${message}`);
}

function sameSequence<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function validateUpstream(source: FiveOfficerIntakeCriterionMethodologySourceRebindPostPersistenceReviewFR118V1): void {
  validateFiveOfficerIntakeCriterionMethodologySourceRebindPostPersistenceReviewFR118(source);
  if (
    source.authorityState !== 'witness_qualified_intake_criterion_methodology_successor_admitted_registry_persistence_not_executed' ||
    source.rebindReview.successorMethodologyRef !== SUCCESSOR_REF ||
    !sameSequence(source.successorCandidate.sourceRefs, [WITNESS_QUALIFIED_PASSAGE_REF]) ||
    source.rebindReview.successorSourceRebindAuthorized !== true ||
    source.rebindReview.successorDefinitionAdmitted !== true ||
    source.rebindReview.successorRegistryAdmissionImplementationAuthorized !== true ||
    source.rebindReview.successorPersisted !== false ||
    source.execution.methodologyDefinitionsPersisted !== 0 ||
    source.execution.methodologyPackMutations !== 0 ||
    source.execution.criterionDefinitionSourceRefsRewritten !== 0 ||
    source.execution.metricBindingsIssued !== 0 ||
    source.execution.thresholdsIssued !== 0 ||
    source.execution.criterionStatesIssued !== 0 ||
    source.execution.claimsIssued !== 0 ||
    source.execution.traditionalSemanticAuthority !== false
  ) fail('FR-118 upstream authority drift.');
}

function inspectPersistedRegistry(): FiveOfficerIntakeCriterionMethodologyWitnessQualifiedRegistryAdmissionImplementationFR119V1['persistedState'] {
  validateFaceAuthorityRegistry(FACE_AUTHORITY_FR117_WITNESS_QUALIFIED_RESEARCH_REGISTRY);
  validateFaceAuthorityRegistry(FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY);

  if (FACE_AUTHORITY_FR117_WITNESS_QUALIFIED_RESEARCH_REGISTRY.methodologies.some(
    (methodology) => `${methodology.methodologyId}@${methodology.version}` === SUCCESSOR_REF,
  )) fail('FR-117 registry unexpectedly already contains FR-119 successor.');

  const successorEntries = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologies.filter(
    (methodology) => `${methodology.methodologyId}@${methodology.version}` === SUCCESSOR_REF,
  );
  if (
    successorEntries.length !== 1 ||
    successorEntries[0]?.methodologyId !== 'method.shenxiang.five_officers.intake_criteria' ||
    successorEntries[0]?.version !== '0.2.0' ||
    successorEntries[0]?.reviewStatus !== 'research' ||
    !sameSequence(successorEntries[0]?.sourceRefs ?? [], [WITNESS_QUALIFIED_PASSAGE_REF])
  ) fail('persisted successor methodology drift.');

  if (FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologies.some(
    (methodology) => `${methodology.methodologyId}@${methodology.version}` === PRIOR_CANDIDATE_REF,
  )) fail('historical FR-107 candidate must remain a review artifact and not be persisted by FR-119.');

  const sourcePassage = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.passages.find(
    (passage) => passage.passageId === WITNESS_QUALIFIED_PASSAGE_REF,
  );
  const historicalPassage = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.passages.find(
    (passage) => passage.passageId === HISTORICAL_PASSAGE_REF,
  );
  if (
    sourcePassage === undefined || sourcePassage.witnessId !== NLC_WITNESS || sourcePassage.verificationStatus !== 'scan_checked' ||
    historicalPassage === undefined || historicalPassage.witnessId !== 'witness.shenxiang_quanbian.ctext' || historicalPassage.verificationStatus !== 'unverified_ocr'
  ) fail('passage provenance drift during methodology persistence.');

  const fullBefore = FACE_AUTHORITY_FR117_WITNESS_QUALIFIED_RESEARCH_REGISTRY.methodologies.find(
    (methodology) => `${methodology.methodologyId}@${methodology.version}` === FULL_METHODOLOGY_REF,
  );
  const fullAfter = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologies.find(
    (methodology) => `${methodology.methodologyId}@${methodology.version}` === FULL_METHODOLOGY_REF,
  );
  if (
    fullBefore === undefined || fullAfter === undefined ||
    JSON.stringify(fullBefore) !== JSON.stringify(fullAfter) ||
    !fullAfter.sourceRefs.includes(HISTORICAL_PASSAGE_REF) || fullAfter.sourceRefs.includes(WITNESS_QUALIFIED_PASSAGE_REF)
  ) fail('full Five Officers methodology changed during FR-119 persistence.');

  if (
    JSON.stringify(FACE_AUTHORITY_FR117_WITNESS_QUALIFIED_RESEARCH_REGISTRY.methodologyPacks) !==
      JSON.stringify(FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologyPacks)
  ) fail('methodology pack changed during FR-119 persistence.');

  const intakeCriteria = FIVE_OFFICER_CRITERIA_V0.filter((criterion) => criterion.officerKey === 'intake');
  if (
    intakeCriteria.length !== 5 ||
    !sameSequence(intakeCriteria.map((criterion) => criterion.criterionId), INTAKE_CRITERION_IDS) ||
    intakeCriteria.some((criterion) => !sameSequence(criterion.sourceRefs, [HISTORICAL_PASSAGE_REF]))
  ) fail('historical intake criterion definitions changed during methodology persistence.');

  return Object.freeze({
    registryValidated: true as const,
    successorMethodologyRef: SUCCESSOR_REF,
    successorMethodologyId: 'method.shenxiang.five_officers.intake_criteria' as const,
    successorVersion: '0.2.0' as const,
    successorReviewStatus: 'research' as const,
    successorSourceRefs: Object.freeze([WITNESS_QUALIFIED_PASSAGE_REF]) as readonly [typeof WITNESS_QUALIFIED_PASSAGE_REF],
    successorSourceResolves: true as const,
    successorSourceVerificationStatus: 'scan_checked' as const,
    successorSourceWitnessId: NLC_WITNESS,
    priorCandidatePersisted: false as const,
    historicalPassageRetained: true as const,
    witnessQualifiedPassageRetained: true as const,
    fullFiveOfficersMethodologyRetained: true as const,
    fullFiveOfficersMethodologyUnchanged: true as const,
    methodologyPackUnchanged: true as const,
    historicalCriterionDefinitionsRetained: true as const,
    historicalCriterionDefinitionSourceRefsRetained: true as const,
  });
}

export function implementFiveOfficerIntakeCriterionMethodologyWitnessQualifiedRegistryAdmissionFR119(
  source: FiveOfficerIntakeCriterionMethodologySourceRebindPostPersistenceReviewFR118V1,
): FiveOfficerIntakeCriterionMethodologyWitnessQualifiedRegistryAdmissionImplementationFR119V1 {
  validateUpstream(source);
  const persistedState = inspectPersistedRegistry();
  const artifact: FiveOfficerIntakeCriterionMethodologyWitnessQualifiedRegistryAdmissionImplementationFR119V1 = Object.freeze({
    schemaVersion: 'fr119-five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-v1',
    artifactVersion: '0.1.0',
    authorityState: 'witness_qualified_intake_criterion_methodology_successor_persisted_downstream_execution_still_closed',
    upstream: Object.freeze({
      fr118SchemaVersion: source.schemaVersion,
      fr118AuthorityState: source.authorityState,
      successorMethodologyRef: SUCCESSOR_REF,
      successorSourceRef: WITNESS_QUALIFIED_PASSAGE_REF,
      successorSourceRebindAuthorized: true,
      successorDefinitionAdmitted: true,
      successorRegistryAdmissionImplementationAuthorized: true,
      successorPersistedBefore: false,
      methodologyDefinitionsPersistedBefore: 0,
      methodologyPackMutationsBefore: 0,
      criterionDefinitionSourceRefsRewrittenBefore: 0,
      metricBindingsIssuedBefore: 0,
      thresholdsIssuedBefore: 0,
      criterionStatesIssuedBefore: 0,
      claimsIssuedBefore: 0,
      traditionalSemanticAuthorityBefore: false,
    }),
    persistedState,
    execution: Object.freeze({
      methodologyRegistryEntriesPersisted: 1 as const,
      methodologyDefinitionsPersisted: 1 as const,
      methodologySourceRefsRewritten: 0 as const,
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
      successorPersistenceMeansPriorCandidatePersistence: false as const,
      successorPersistenceMeansFullMethodologyReplacement: false as const,
      successorPersistenceMeansMethodologyPackMembership: false as const,
      successorPersistenceMeansHistoricalPassageReplacement: false as const,
      successorPersistenceMeansCriterionDefinitionRewrite: false as const,
      researchMethodologyPersistenceMeansExecution: false as const,
      researchMethodologyPersistenceMeansProductionPromotion: false as const,
      researchMethodologyPersistenceMeansMetricBinding: false as const,
      researchMethodologyPersistenceMeansThreshold: false as const,
      researchMethodologyPersistenceMeansCriterionState: false as const,
      researchMethodologyPersistenceMeansClaim: false as const,
      researchMethodologyPersistenceMeansTraditionalSemantics: false as const,
    }),
    recommendedNextFrontier: 'intake_criterion_definition_witness_qualified_source_rebind_review',
    remainingBlockers: REQUIRED_BLOCKERS,
    prohibitedShortcuts: REQUIRED_SHORTCUTS,
  });
  return validateFiveOfficerIntakeCriterionMethodologyWitnessQualifiedRegistryAdmissionImplementationFR119(artifact);
}

export function validateFiveOfficerIntakeCriterionMethodologyWitnessQualifiedRegistryAdmissionImplementationFR119(
  artifact: FiveOfficerIntakeCriterionMethodologyWitnessQualifiedRegistryAdmissionImplementationFR119V1,
): FiveOfficerIntakeCriterionMethodologyWitnessQualifiedRegistryAdmissionImplementationFR119V1 {
  if (
    artifact.schemaVersion !== 'fr119-five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-v1' ||
    artifact.artifactVersion !== '0.1.0' ||
    artifact.authorityState !== 'witness_qualified_intake_criterion_methodology_successor_persisted_downstream_execution_still_closed'
  ) fail('schema or authority state drift.');
  if (
    artifact.upstream.fr118SchemaVersion !== 'fr118-five-officers-intake-criterion-methodology-source-rebind-post-persistence-review-v1' ||
    artifact.upstream.fr118AuthorityState !== 'witness_qualified_intake_criterion_methodology_successor_admitted_registry_persistence_not_executed' ||
    artifact.upstream.successorMethodologyRef !== SUCCESSOR_REF ||
    artifact.upstream.successorSourceRef !== WITNESS_QUALIFIED_PASSAGE_REF ||
    artifact.upstream.successorSourceRebindAuthorized !== true ||
    artifact.upstream.successorDefinitionAdmitted !== true ||
    artifact.upstream.successorRegistryAdmissionImplementationAuthorized !== true ||
    artifact.upstream.successorPersistedBefore !== false ||
    artifact.upstream.methodologyDefinitionsPersistedBefore !== 0 ||
    artifact.upstream.methodologyPackMutationsBefore !== 0 ||
    artifact.upstream.criterionDefinitionSourceRefsRewrittenBefore !== 0 ||
    artifact.upstream.metricBindingsIssuedBefore !== 0 ||
    artifact.upstream.thresholdsIssuedBefore !== 0 ||
    artifact.upstream.criterionStatesIssuedBefore !== 0 ||
    artifact.upstream.claimsIssuedBefore !== 0 ||
    artifact.upstream.traditionalSemanticAuthorityBefore !== false
  ) fail('upstream boundary drift.');
  if (
    artifact.persistedState.registryValidated !== true ||
    artifact.persistedState.successorMethodologyRef !== SUCCESSOR_REF ||
    artifact.persistedState.successorMethodologyId !== 'method.shenxiang.five_officers.intake_criteria' ||
    artifact.persistedState.successorVersion !== '0.2.0' ||
    artifact.persistedState.successorReviewStatus !== 'research' ||
    !sameSequence(artifact.persistedState.successorSourceRefs, [WITNESS_QUALIFIED_PASSAGE_REF]) ||
    artifact.persistedState.successorSourceResolves !== true ||
    artifact.persistedState.successorSourceVerificationStatus !== 'scan_checked' ||
    artifact.persistedState.successorSourceWitnessId !== NLC_WITNESS ||
    artifact.persistedState.priorCandidatePersisted !== false ||
    artifact.persistedState.historicalPassageRetained !== true ||
    artifact.persistedState.witnessQualifiedPassageRetained !== true ||
    artifact.persistedState.fullFiveOfficersMethodologyRetained !== true ||
    artifact.persistedState.fullFiveOfficersMethodologyUnchanged !== true ||
    artifact.persistedState.methodologyPackUnchanged !== true ||
    artifact.persistedState.historicalCriterionDefinitionsRetained !== true ||
    artifact.persistedState.historicalCriterionDefinitionSourceRefsRetained !== true
  ) fail('persisted state drift.');
  if (
    artifact.execution.methodologyRegistryEntriesPersisted !== 1 ||
    artifact.execution.methodologyDefinitionsPersisted !== 1 ||
    artifact.execution.methodologySourceRefsRewritten !== 0 ||
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
    artifact.authorityBoundary.successorPersistenceMeansPriorCandidatePersistence !== false ||
    artifact.authorityBoundary.successorPersistenceMeansFullMethodologyReplacement !== false ||
    artifact.authorityBoundary.successorPersistenceMeansMethodologyPackMembership !== false ||
    artifact.authorityBoundary.successorPersistenceMeansHistoricalPassageReplacement !== false ||
    artifact.authorityBoundary.successorPersistenceMeansCriterionDefinitionRewrite !== false ||
    artifact.authorityBoundary.researchMethodologyPersistenceMeansExecution !== false ||
    artifact.authorityBoundary.researchMethodologyPersistenceMeansProductionPromotion !== false ||
    artifact.authorityBoundary.researchMethodologyPersistenceMeansMetricBinding !== false ||
    artifact.authorityBoundary.researchMethodologyPersistenceMeansThreshold !== false ||
    artifact.authorityBoundary.researchMethodologyPersistenceMeansCriterionState !== false ||
    artifact.authorityBoundary.researchMethodologyPersistenceMeansClaim !== false ||
    artifact.authorityBoundary.researchMethodologyPersistenceMeansTraditionalSemantics !== false
  ) fail('authority boundary drift.');
  if (
    artifact.recommendedNextFrontier !== 'intake_criterion_definition_witness_qualified_source_rebind_review' ||
    !sameSequence(artifact.remainingBlockers, REQUIRED_BLOCKERS) ||
    !sameSequence(artifact.prohibitedShortcuts, REQUIRED_SHORTCUTS)
  ) fail('frontier/blocker/shortcut drift.');
  return artifact;
}
