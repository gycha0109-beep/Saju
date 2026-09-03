import type { FiveOfficerCriterionDefinition } from './five-officers-six-fus-research-v0.js';
import { FIVE_OFFICER_CRITERIA_V0 } from './five-officers-six-fus-research-v0.js';
import { FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY } from './five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-fr119.js';
import {
  FR120_INTAKE_CRITERION_WITNESS_QUALIFIED_REBIND_CANDIDATES,
  validateFiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindReviewFR120,
  type FiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindReviewFR120V1,
} from './five-officers-intake-criterion-definition-witness-qualified-source-rebind-review-fr120.js';
import { FaceAuthorityValidationError, validateFaceAuthorityRegistry } from './validation.js';

const SUCCESSOR_METHODOLOGY_REF = 'method.shenxiang.five_officers.intake_criteria@0.2.0' as const;
const HISTORICAL_PASSAGE_REF = 'passage.shenxiang.five_officers.intake' as const;
const WITNESS_QUALIFIED_PASSAGE_REF = 'passage.shenxiang.five_officers.intake.nlc_1925' as const;
const NLC_WITNESS = 'witness.shenxiang_quanbian.nlc_1925' as const;
const DERIVED_DEFINITION_SET_ID = 'criteria.shenxiang.five_officers.fr121_witness_qualified' as const;
const INTAKE_CRITERION_IDS = Object.freeze([
  'criterion.intake.square_broad',
  'criterion.intake.lips_substantial',
  'criterion.intake.corners_arched',
  'criterion.intake.open_close_relation',
  'criterion.intake.red_lip_color',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-121 ${message}`);
}

function sameSequence<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function sameCriterionExceptSourceRefs(
  actual: FiveOfficerCriterionDefinition,
  expected: FiveOfficerCriterionDefinition,
): boolean {
  return actual.criterionId === expected.criterionId &&
    actual.officerKey === expected.officerKey &&
    actual.traditionalOfficerName === expected.traditionalOfficerName &&
    actual.anatomicalTarget === expected.anatomicalTarget &&
    actual.sourceConcept === expected.sourceConcept &&
    actual.modality === expected.modality &&
    actual.requiredForTraditionalFormation === expected.requiredForTraditionalFormation &&
    actual.staticV1Eligible === expected.staticV1Eligible &&
    actual.operationalizationNote === expected.operationalizationNote;
}

function buildPersistedCriterionSet(): readonly FiveOfficerCriterionDefinition[] {
  const candidatesById = new Map(
    FR120_INTAKE_CRITERION_WITNESS_QUALIFIED_REBIND_CANDIDATES.map((criterion) => [criterion.criterionId, criterion] as const),
  );
  return Object.freeze(FIVE_OFFICER_CRITERIA_V0.map((criterion) => {
    if (criterion.officerKey !== 'intake') return criterion;
    const candidate = candidatesById.get(criterion.criterionId);
    if (candidate === undefined) fail(`missing FR-120 candidate for ${criterion.criterionId}.`);
    return Object.freeze({
      ...candidate,
      sourceRefs: Object.freeze([...candidate.sourceRefs]),
    });
  }));
}

export const FIVE_OFFICER_CRITERIA_FR121_WITNESS_QUALIFIED = buildPersistedCriterionSet();

export interface FiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindImplementationFR121V1 {
  readonly schemaVersion: 'fr121-five-officers-intake-criterion-definition-witness-qualified-source-rebind-implementation-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'witness_qualified_intake_criterion_definitions_persisted_mapping_dependency_still_open';
  readonly upstream: {
    readonly fr120SchemaVersion: 'fr120-five-officers-intake-criterion-definition-witness-qualified-source-rebind-review-v1';
    readonly fr120AuthorityState: 'intake_criterion_witness_qualified_source_rebind_admitted_implementation_not_executed';
    readonly criterionCount: 5;
    readonly witnessQualifiedSourceRef: typeof WITNESS_QUALIFIED_PASSAGE_REF;
    readonly criterionDefinitionSourceRebindAuthorized: true;
    readonly implementationAuthorized: true;
    readonly persistedBefore: false;
    readonly criterionDefinitionsPersistedBefore: 0;
    readonly criterionDefinitionSourceRefsRewrittenBefore: 0;
    readonly metricBindingsIssuedBefore: 0;
    readonly thresholdsIssuedBefore: 0;
    readonly criterionStatesIssuedBefore: 0;
    readonly claimsIssuedBefore: 0;
    readonly traditionalSemanticAuthorityBefore: false;
  };
  readonly persistedState: {
    readonly definitionSetId: typeof DERIVED_DEFINITION_SET_ID;
    readonly derivedDefinitionSetPersisted: true;
    readonly historicalDefinitionSetRetained: true;
    readonly totalCriterionCountPreserved: true;
    readonly intakeCriterionCount: 5;
    readonly intakeCriterionIds: typeof INTAKE_CRITERION_IDS;
    readonly everyPersistedIntakeCriterionUsesWitnessQualifiedPassageOnly: true;
    readonly uniquePersistedIntakeSourceRefs: readonly [typeof WITNESS_QUALIFIED_PASSAGE_REF];
    readonly historicalIntakeDefinitionsRemainHistorical: true;
    readonly fieldParityExceptSourceRefs: true;
    readonly criterionOrderPreserved: true;
    readonly nonIntakeDefinitionsUnchanged: true;
    readonly sourceConceptsPreserved: true;
    readonly modalitiesPreserved: true;
    readonly staticV1EligibilityPreserved: true;
    readonly requiredForTraditionalFormationPreserved: true;
    readonly operationalizationNotesPreserved: true;
    readonly sourcePassageResolves: true;
    readonly sourcePassageVerificationStatus: 'scan_checked';
    readonly sourcePassageWitnessId: typeof NLC_WITNESS;
    readonly successorMethodologyRef: typeof SUCCESSOR_METHODOLOGY_REF;
    readonly successorMethodologyUsesSameWitnessQualifiedSource: true;
    readonly semanticIdentityEquivalenceAsserted: false;
  };
  readonly execution: {
    readonly criterionDefinitionSetsPersisted: 1;
    readonly criterionDefinitionsPersisted: 5;
    readonly criterionDefinitionSourceRefsRewritten: 5;
    readonly methodologyDefinitionsPersisted: 0;
    readonly methodologySourceRefsRewritten: 0;
    readonly methodologyPackMutations: 0;
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
    readonly derivedCriterionPersistenceMeansHistoricalMutation: false;
    readonly criterionSourceRebindMeansSemanticIdentityEquivalence: false;
    readonly criterionSourceRebindMeansFullMethodologyRewrite: false;
    readonly criterionSourceRebindMeansMethodologyPackMutation: false;
    readonly criterionSourceRebindMeansMetricBinding: false;
    readonly criterionSourceRebindMeansThreshold: false;
    readonly criterionSourceRebindMeansCriterionState: false;
    readonly criterionSourceRebindMeansMethodologyExecution: false;
    readonly criterionSourceRebindMeansTraditionalFormation: false;
    readonly criterionSourceRebindMeansTraditionalSemantics: false;
    readonly criterionSourceRebindMeansOfficerMappingDependencyRemoved: false;
  };
  readonly recommendedNextFrontier: 'intake_officer_mapping_dependency_post_rebind_review';
  readonly remainingBlockers: readonly [
    'intake_officer_mapping_dependency_not_re_reviewed',
    'intake_metric_to_source_concept_mapping_not_authorized',
    'intake_calibration_and_thresholds_not_authorized',
    'fr64_methodology_execution_and_claim_gates_remain',
  ];
  readonly prohibitedShortcuts: readonly [
    'derived_criterion_persistence_to_historical_mutation',
    'criterion_source_rebind_to_semantic_identity_equivalence',
    'criterion_source_rebind_to_full_methodology_rewrite',
    'criterion_source_rebind_to_methodology_pack_mutation',
    'criterion_source_rebind_to_metric_binding',
    'criterion_source_rebind_to_numeric_threshold',
    'criterion_source_rebind_to_criterion_state',
    'criterion_source_rebind_to_methodology_execution',
    'criterion_source_rebind_to_traditional_formation',
    'criterion_source_rebind_to_traditional_semantics',
    'criterion_source_rebind_to_mapping_dependency_removal',
  ];
}

const REQUIRED_BLOCKERS = Object.freeze([
  'intake_officer_mapping_dependency_not_re_reviewed',
  'intake_metric_to_source_concept_mapping_not_authorized',
  'intake_calibration_and_thresholds_not_authorized',
  'fr64_methodology_execution_and_claim_gates_remain',
] as const);

const REQUIRED_SHORTCUTS = Object.freeze([
  'derived_criterion_persistence_to_historical_mutation',
  'criterion_source_rebind_to_semantic_identity_equivalence',
  'criterion_source_rebind_to_full_methodology_rewrite',
  'criterion_source_rebind_to_methodology_pack_mutation',
  'criterion_source_rebind_to_metric_binding',
  'criterion_source_rebind_to_numeric_threshold',
  'criterion_source_rebind_to_criterion_state',
  'criterion_source_rebind_to_methodology_execution',
  'criterion_source_rebind_to_traditional_formation',
  'criterion_source_rebind_to_traditional_semantics',
  'criterion_source_rebind_to_mapping_dependency_removal',
] as const);

function validateUpstream(
  source: FiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindReviewFR120V1,
): void {
  validateFiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindReviewFR120(source);
  if (
    source.schemaVersion !== 'fr120-five-officers-intake-criterion-definition-witness-qualified-source-rebind-review-v1' ||
    source.authorityState !== 'intake_criterion_witness_qualified_source_rebind_admitted_implementation_not_executed' ||
    source.rebindReview.candidateCriterionCount !== 5 ||
    !sameSequence(source.rebindReview.candidateCriterionIds, INTAKE_CRITERION_IDS) ||
    !sameSequence(source.rebindReview.uniqueCandidateSourceRefs, [WITNESS_QUALIFIED_PASSAGE_REF]) ||
    source.rebindReview.fieldParityExceptSourceRefs !== true ||
    source.rebindReview.criterionDefinitionSourceRebindAuthorized !== true ||
    source.rebindReview.implementationAuthorized !== true ||
    source.rebindReview.persisted !== false ||
    source.execution.criterionDefinitionsPersisted !== 0 ||
    source.execution.criterionDefinitionSourceRefsRewritten !== 0 ||
    source.execution.metricBindingsIssued !== 0 ||
    source.execution.thresholdsIssued !== 0 ||
    source.execution.criterionStatesIssued !== 0 ||
    source.execution.claimsIssued !== 0 ||
    source.execution.traditionalSemanticAuthority !== false
  ) fail('FR-120 upstream authority drift.');
}

function inspectPersistedState(): FiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindImplementationFR121V1['persistedState'] {
  validateFaceAuthorityRegistry(FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY);

  if (FIVE_OFFICER_CRITERIA_FR121_WITNESS_QUALIFIED.length !== FIVE_OFFICER_CRITERIA_V0.length) {
    fail('derived criterion set cardinality drift.');
  }

  const historicalIntake = FIVE_OFFICER_CRITERIA_V0.filter((criterion) => criterion.officerKey === 'intake');
  const persistedIntake = FIVE_OFFICER_CRITERIA_FR121_WITNESS_QUALIFIED.filter((criterion) => criterion.officerKey === 'intake');
  const historicalNonIntake = FIVE_OFFICER_CRITERIA_V0.filter((criterion) => criterion.officerKey !== 'intake');
  const persistedNonIntake = FIVE_OFFICER_CRITERIA_FR121_WITNESS_QUALIFIED.filter((criterion) => criterion.officerKey !== 'intake');

  if (
    historicalIntake.length !== 5 ||
    persistedIntake.length !== 5 ||
    !sameSequence(historicalIntake.map((criterion) => criterion.criterionId), INTAKE_CRITERION_IDS) ||
    !sameSequence(persistedIntake.map((criterion) => criterion.criterionId), INTAKE_CRITERION_IDS) ||
    historicalIntake.some((criterion) => !sameSequence(criterion.sourceRefs, [HISTORICAL_PASSAGE_REF])) ||
    persistedIntake.some((criterion) => !sameSequence(criterion.sourceRefs, [WITNESS_QUALIFIED_PASSAGE_REF]))
  ) fail('intake criterion source rebind persistence drift.');

  for (let index = 0; index < historicalIntake.length; index += 1) {
    const historical = historicalIntake[index];
    const persisted = persistedIntake[index];
    if (historical === undefined || persisted === undefined || !sameCriterionExceptSourceRefs(persisted, historical)) {
      fail(`persisted intake criterion semantic drift at index ${index}.`);
    }
  }

  if (
    historicalNonIntake.length !== persistedNonIntake.length ||
    historicalNonIntake.some((criterion, index) => criterion !== persistedNonIntake[index])
  ) fail('non-intake criterion definitions changed during FR-121 persistence.');

  const sourcePassage = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.passages.find(
    (passage) => passage.passageId === WITNESS_QUALIFIED_PASSAGE_REF,
  );
  const successorMethodology = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologies.find(
    (methodology) => `${methodology.methodologyId}@${methodology.version}` === SUCCESSOR_METHODOLOGY_REF,
  );
  if (
    sourcePassage === undefined ||
    sourcePassage.verificationStatus !== 'scan_checked' ||
    sourcePassage.witnessId !== NLC_WITNESS ||
    successorMethodology === undefined ||
    successorMethodology.reviewStatus !== 'research' ||
    !sameSequence(successorMethodology.sourceRefs, [WITNESS_QUALIFIED_PASSAGE_REF])
  ) fail('witness-qualified methodology/source alignment drift.');

  return Object.freeze({
    definitionSetId: DERIVED_DEFINITION_SET_ID,
    derivedDefinitionSetPersisted: true as const,
    historicalDefinitionSetRetained: true as const,
    totalCriterionCountPreserved: true as const,
    intakeCriterionCount: 5 as const,
    intakeCriterionIds: INTAKE_CRITERION_IDS,
    everyPersistedIntakeCriterionUsesWitnessQualifiedPassageOnly: true as const,
    uniquePersistedIntakeSourceRefs: Object.freeze([WITNESS_QUALIFIED_PASSAGE_REF]) as readonly [typeof WITNESS_QUALIFIED_PASSAGE_REF],
    historicalIntakeDefinitionsRemainHistorical: true as const,
    fieldParityExceptSourceRefs: true as const,
    criterionOrderPreserved: true as const,
    nonIntakeDefinitionsUnchanged: true as const,
    sourceConceptsPreserved: true as const,
    modalitiesPreserved: true as const,
    staticV1EligibilityPreserved: true as const,
    requiredForTraditionalFormationPreserved: true as const,
    operationalizationNotesPreserved: true as const,
    sourcePassageResolves: true as const,
    sourcePassageVerificationStatus: 'scan_checked' as const,
    sourcePassageWitnessId: NLC_WITNESS,
    successorMethodologyRef: SUCCESSOR_METHODOLOGY_REF,
    successorMethodologyUsesSameWitnessQualifiedSource: true as const,
    semanticIdentityEquivalenceAsserted: false as const,
  });
}

export function implementFiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindFR121(
  source: FiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindReviewFR120V1,
): FiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindImplementationFR121V1 {
  validateUpstream(source);
  const persistedState = inspectPersistedState();

  const artifact: FiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindImplementationFR121V1 = Object.freeze({
    schemaVersion: 'fr121-five-officers-intake-criterion-definition-witness-qualified-source-rebind-implementation-v1',
    artifactVersion: '0.1.0',
    authorityState: 'witness_qualified_intake_criterion_definitions_persisted_mapping_dependency_still_open',
    upstream: Object.freeze({
      fr120SchemaVersion: source.schemaVersion,
      fr120AuthorityState: source.authorityState,
      criterionCount: 5 as const,
      witnessQualifiedSourceRef: WITNESS_QUALIFIED_PASSAGE_REF,
      criterionDefinitionSourceRebindAuthorized: true as const,
      implementationAuthorized: true as const,
      persistedBefore: false as const,
      criterionDefinitionsPersistedBefore: 0 as const,
      criterionDefinitionSourceRefsRewrittenBefore: 0 as const,
      metricBindingsIssuedBefore: 0 as const,
      thresholdsIssuedBefore: 0 as const,
      criterionStatesIssuedBefore: 0 as const,
      claimsIssuedBefore: 0 as const,
      traditionalSemanticAuthorityBefore: false as const,
    }),
    persistedState,
    execution: Object.freeze({
      criterionDefinitionSetsPersisted: 1 as const,
      criterionDefinitionsPersisted: 5 as const,
      criterionDefinitionSourceRefsRewritten: 5 as const,
      methodologyDefinitionsPersisted: 0 as const,
      methodologySourceRefsRewritten: 0 as const,
      methodologyPackMutations: 0 as const,
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
      derivedCriterionPersistenceMeansHistoricalMutation: false as const,
      criterionSourceRebindMeansSemanticIdentityEquivalence: false as const,
      criterionSourceRebindMeansFullMethodologyRewrite: false as const,
      criterionSourceRebindMeansMethodologyPackMutation: false as const,
      criterionSourceRebindMeansMetricBinding: false as const,
      criterionSourceRebindMeansThreshold: false as const,
      criterionSourceRebindMeansCriterionState: false as const,
      criterionSourceRebindMeansMethodologyExecution: false as const,
      criterionSourceRebindMeansTraditionalFormation: false as const,
      criterionSourceRebindMeansTraditionalSemantics: false as const,
      criterionSourceRebindMeansOfficerMappingDependencyRemoved: false as const,
    }),
    recommendedNextFrontier: 'intake_officer_mapping_dependency_post_rebind_review',
    remainingBlockers: REQUIRED_BLOCKERS,
    prohibitedShortcuts: REQUIRED_SHORTCUTS,
  });
  return validateFiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindImplementationFR121(artifact);
}

export function validateFiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindImplementationFR121(
  source: FiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindImplementationFR121V1,
): FiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindImplementationFR121V1 {
  if (
    source.schemaVersion !== 'fr121-five-officers-intake-criterion-definition-witness-qualified-source-rebind-implementation-v1' ||
    source.artifactVersion !== '0.1.0' ||
    source.authorityState !== 'witness_qualified_intake_criterion_definitions_persisted_mapping_dependency_still_open'
  ) fail('schema or authority state drift.');

  if (
    source.upstream.fr120SchemaVersion !== 'fr120-five-officers-intake-criterion-definition-witness-qualified-source-rebind-review-v1' ||
    source.upstream.fr120AuthorityState !== 'intake_criterion_witness_qualified_source_rebind_admitted_implementation_not_executed' ||
    source.upstream.criterionCount !== 5 ||
    source.upstream.witnessQualifiedSourceRef !== WITNESS_QUALIFIED_PASSAGE_REF ||
    source.upstream.criterionDefinitionSourceRebindAuthorized !== true ||
    source.upstream.implementationAuthorized !== true ||
    source.upstream.persistedBefore !== false ||
    source.upstream.criterionDefinitionsPersistedBefore !== 0 ||
    source.upstream.criterionDefinitionSourceRefsRewrittenBefore !== 0 ||
    source.upstream.metricBindingsIssuedBefore !== 0 ||
    source.upstream.thresholdsIssuedBefore !== 0 ||
    source.upstream.criterionStatesIssuedBefore !== 0 ||
    source.upstream.claimsIssuedBefore !== 0 ||
    source.upstream.traditionalSemanticAuthorityBefore !== false
  ) fail('upstream snapshot drift.');

  if (
    source.persistedState.definitionSetId !== DERIVED_DEFINITION_SET_ID ||
    source.persistedState.derivedDefinitionSetPersisted !== true ||
    source.persistedState.historicalDefinitionSetRetained !== true ||
    source.persistedState.totalCriterionCountPreserved !== true ||
    source.persistedState.intakeCriterionCount !== 5 ||
    !sameSequence(source.persistedState.intakeCriterionIds, INTAKE_CRITERION_IDS) ||
    source.persistedState.everyPersistedIntakeCriterionUsesWitnessQualifiedPassageOnly !== true ||
    !sameSequence(source.persistedState.uniquePersistedIntakeSourceRefs, [WITNESS_QUALIFIED_PASSAGE_REF]) ||
    source.persistedState.historicalIntakeDefinitionsRemainHistorical !== true ||
    source.persistedState.fieldParityExceptSourceRefs !== true ||
    source.persistedState.criterionOrderPreserved !== true ||
    source.persistedState.nonIntakeDefinitionsUnchanged !== true ||
    source.persistedState.sourceConceptsPreserved !== true ||
    source.persistedState.modalitiesPreserved !== true ||
    source.persistedState.staticV1EligibilityPreserved !== true ||
    source.persistedState.requiredForTraditionalFormationPreserved !== true ||
    source.persistedState.operationalizationNotesPreserved !== true ||
    source.persistedState.sourcePassageResolves !== true ||
    source.persistedState.sourcePassageVerificationStatus !== 'scan_checked' ||
    source.persistedState.sourcePassageWitnessId !== NLC_WITNESS ||
    source.persistedState.successorMethodologyRef !== SUCCESSOR_METHODOLOGY_REF ||
    source.persistedState.successorMethodologyUsesSameWitnessQualifiedSource !== true ||
    source.persistedState.semanticIdentityEquivalenceAsserted !== false
  ) fail('persisted state drift.');

  if (
    source.execution.criterionDefinitionSetsPersisted !== 1 ||
    source.execution.criterionDefinitionsPersisted !== 5 ||
    source.execution.criterionDefinitionSourceRefsRewritten !== 5 ||
    source.execution.methodologyDefinitionsPersisted !== 0 ||
    source.execution.methodologySourceRefsRewritten !== 0 ||
    source.execution.methodologyPackMutations !== 0 ||
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
    source.authorityBoundary.derivedCriterionPersistenceMeansHistoricalMutation !== false ||
    source.authorityBoundary.criterionSourceRebindMeansSemanticIdentityEquivalence !== false ||
    source.authorityBoundary.criterionSourceRebindMeansFullMethodologyRewrite !== false ||
    source.authorityBoundary.criterionSourceRebindMeansMethodologyPackMutation !== false ||
    source.authorityBoundary.criterionSourceRebindMeansMetricBinding !== false ||
    source.authorityBoundary.criterionSourceRebindMeansThreshold !== false ||
    source.authorityBoundary.criterionSourceRebindMeansCriterionState !== false ||
    source.authorityBoundary.criterionSourceRebindMeansMethodologyExecution !== false ||
    source.authorityBoundary.criterionSourceRebindMeansTraditionalFormation !== false ||
    source.authorityBoundary.criterionSourceRebindMeansTraditionalSemantics !== false ||
    source.authorityBoundary.criterionSourceRebindMeansOfficerMappingDependencyRemoved !== false
  ) fail('authority boundary drift.');

  if (
    source.recommendedNextFrontier !== 'intake_officer_mapping_dependency_post_rebind_review' ||
    !sameSequence(source.remainingBlockers, REQUIRED_BLOCKERS) ||
    !sameSequence(source.prohibitedShortcuts, REQUIRED_SHORTCUTS)
  ) fail('frontier or blocker drift.');

  return source;
}
