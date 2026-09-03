import type { FiveOfficerCriterionDefinition } from './five-officers-six-fus-research-v0.js';
import { FIVE_OFFICER_CRITERIA_V0 } from './five-officers-six-fus-research-v0.js';
import {
  FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY,
  validateFiveOfficerIntakeCriterionMethodologyWitnessQualifiedRegistryAdmissionImplementationFR119,
  type FiveOfficerIntakeCriterionMethodologyWitnessQualifiedRegistryAdmissionImplementationFR119V1,
} from './five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-fr119.js';
import { FaceAuthorityValidationError, validateFaceAuthorityRegistry } from './validation.js';

const SUCCESSOR_METHODOLOGY_REF = 'method.shenxiang.five_officers.intake_criteria@0.2.0' as const;
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

const HISTORICAL_INTAKE_CRITERIA = Object.freeze(
  FIVE_OFFICER_CRITERIA_V0.filter((criterion) => criterion.officerKey === 'intake'),
) as readonly FiveOfficerCriterionDefinition[];

export const FR120_INTAKE_CRITERION_WITNESS_QUALIFIED_REBIND_CANDIDATES = Object.freeze(
  HISTORICAL_INTAKE_CRITERIA.map((criterion) => Object.freeze({
    ...criterion,
    sourceRefs: Object.freeze([WITNESS_QUALIFIED_PASSAGE_REF]),
  })),
) as readonly FiveOfficerCriterionDefinition[];

export interface FiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindReviewFR120V1 {
  readonly schemaVersion: 'fr120-five-officers-intake-criterion-definition-witness-qualified-source-rebind-review-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'intake_criterion_witness_qualified_source_rebind_admitted_implementation_not_executed';
  readonly upstream: {
    readonly fr119SchemaVersion: 'fr119-five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-v1';
    readonly fr119AuthorityState: 'witness_qualified_intake_criterion_methodology_successor_persisted_downstream_execution_still_closed';
    readonly successorMethodologyRef: typeof SUCCESSOR_METHODOLOGY_REF;
    readonly successorSourceRef: typeof WITNESS_QUALIFIED_PASSAGE_REF;
    readonly successorPersisted: true;
    readonly successorReviewStatus: 'research';
    readonly historicalCriterionDefinitionSourceRefsRetainedBefore: true;
    readonly criterionDefinitionSourceRefsRewrittenBefore: 0;
    readonly metricBindingsIssuedBefore: 0;
    readonly thresholdsIssuedBefore: 0;
    readonly criterionStatesIssuedBefore: 0;
    readonly claimsIssuedBefore: 0;
    readonly traditionalSemanticAuthorityBefore: false;
  };
  readonly sourceAuthority: {
    readonly registryValidated: true;
    readonly historicalPassageRef: typeof HISTORICAL_PASSAGE_REF;
    readonly witnessQualifiedPassageRef: typeof WITNESS_QUALIFIED_PASSAGE_REF;
    readonly historicalPassageVerificationStatus: 'unverified_ocr';
    readonly witnessQualifiedPassageVerificationStatus: 'scan_checked';
    readonly witnessQualifiedPassageWitnessId: typeof NLC_WITNESS;
    readonly originalTextExactMatch: true;
    readonly everyCriterionSourceConceptPresentInHistoricalPassage: true;
    readonly everyCriterionSourceConceptPresentInWitnessQualifiedPassage: true;
    readonly successorMethodologyUsesWitnessQualifiedPassage: true;
    readonly semanticIdentityEquivalenceAsserted: false;
  };
  readonly criterionSetBefore: {
    readonly criterionCount: 5;
    readonly criterionIds: typeof INTAKE_CRITERION_IDS;
    readonly everyCriterionUsesHistoricalPassageOnly: true;
    readonly uniqueSourceRefs: readonly [typeof HISTORICAL_PASSAGE_REF];
  };
  readonly candidateDefinitions: readonly FiveOfficerCriterionDefinition[];
  readonly rebindReview: {
    readonly candidateCriterionCount: 5;
    readonly candidateCriterionIds: typeof INTAKE_CRITERION_IDS;
    readonly everyCandidateUsesWitnessQualifiedPassageOnly: true;
    readonly uniqueCandidateSourceRefs: readonly [typeof WITNESS_QUALIFIED_PASSAGE_REF];
    readonly fieldParityExceptSourceRefs: true;
    readonly criterionOrderPreserved: true;
    readonly sourceConceptsPreserved: true;
    readonly modalitiesPreserved: true;
    readonly staticV1EligibilityPreserved: true;
    readonly requiredForTraditionalFormationPreserved: true;
    readonly operationalizationNotesPreserved: true;
    readonly criterionDefinitionSourceRebindAuthorized: true;
    readonly implementationAuthorized: true;
    readonly persisted: false;
  };
  readonly execution: {
    readonly criterionDefinitionsPersisted: 0;
    readonly criterionDefinitionSourceRefsRewritten: 0;
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
    readonly reviewMeansCriterionDefinitionsRewritten: false;
    readonly provenanceRebindMeansSemanticIdentityEquivalence: false;
    readonly provenanceRebindMeansMetricBinding: false;
    readonly provenanceRebindMeansThreshold: false;
    readonly provenanceRebindMeansCriterionState: false;
    readonly provenanceRebindMeansMethodologyExecution: false;
    readonly provenanceRebindMeansTraditionalFormation: false;
    readonly provenanceRebindMeansTraditionalSemantics: false;
    readonly criterionRebindMeansOfficerMappingDependencyRemoved: false;
  };
  readonly recommendedNextFrontier: 'intake_criterion_definition_witness_qualified_source_rebind_implementation';
  readonly remainingBlockers: readonly [
    'intake_criterion_definition_source_rebind_not_executed',
    'intake_officer_mapping_dependency_not_re_reviewed',
    'intake_metric_to_source_concept_mapping_not_authorized',
    'intake_calibration_and_thresholds_not_authorized',
    'fr64_methodology_execution_and_claim_gates_remain',
  ];
  readonly prohibitedShortcuts: readonly [
    'source_rebind_review_to_criterion_definition_rewrite',
    'provenance_rebind_to_semantic_identity_equivalence',
    'provenance_rebind_to_metric_binding',
    'provenance_rebind_to_numeric_threshold',
    'provenance_rebind_to_criterion_state',
    'provenance_rebind_to_methodology_execution',
    'provenance_rebind_to_traditional_formation',
    'provenance_rebind_to_traditional_semantics',
    'criterion_rebind_to_mapping_dependency_removal',
  ];
}

const REQUIRED_BLOCKERS = Object.freeze([
  'intake_criterion_definition_source_rebind_not_executed',
  'intake_officer_mapping_dependency_not_re_reviewed',
  'intake_metric_to_source_concept_mapping_not_authorized',
  'intake_calibration_and_thresholds_not_authorized',
  'fr64_methodology_execution_and_claim_gates_remain',
] as const);

const REQUIRED_SHORTCUTS = Object.freeze([
  'source_rebind_review_to_criterion_definition_rewrite',
  'provenance_rebind_to_semantic_identity_equivalence',
  'provenance_rebind_to_metric_binding',
  'provenance_rebind_to_numeric_threshold',
  'provenance_rebind_to_criterion_state',
  'provenance_rebind_to_methodology_execution',
  'provenance_rebind_to_traditional_formation',
  'provenance_rebind_to_traditional_semantics',
  'criterion_rebind_to_mapping_dependency_removal',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-120 ${message}`);
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

function validateUpstream(
  source: FiveOfficerIntakeCriterionMethodologyWitnessQualifiedRegistryAdmissionImplementationFR119V1,
): void {
  validateFiveOfficerIntakeCriterionMethodologyWitnessQualifiedRegistryAdmissionImplementationFR119(source);
  if (
    source.schemaVersion !== 'fr119-five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-v1' ||
    source.authorityState !== 'witness_qualified_intake_criterion_methodology_successor_persisted_downstream_execution_still_closed' ||
    source.persistedState.successorMethodologyRef !== SUCCESSOR_METHODOLOGY_REF ||
    !sameSequence(source.persistedState.successorSourceRefs, [WITNESS_QUALIFIED_PASSAGE_REF]) ||
    source.persistedState.successorReviewStatus !== 'research' ||
    source.persistedState.historicalCriterionDefinitionSourceRefsRetained !== true ||
    source.execution.methodologyRegistryEntriesPersisted !== 1 ||
    source.execution.methodologyDefinitionsPersisted !== 1 ||
    source.execution.criterionDefinitionSourceRefsRewritten !== 0 ||
    source.execution.metricBindingsIssued !== 0 ||
    source.execution.thresholdsIssued !== 0 ||
    source.execution.criterionStatesIssued !== 0 ||
    source.execution.claimsIssued !== 0 ||
    source.execution.traditionalSemanticAuthority !== false
  ) fail('FR-119 upstream authority drift.');
}

function inspectSourceAuthority(): FiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindReviewFR120V1['sourceAuthority'] {
  validateFaceAuthorityRegistry(FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY);

  const historicalPassage = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.passages.find(
    (passage) => passage.passageId === HISTORICAL_PASSAGE_REF,
  );
  const witnessQualifiedPassage = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.passages.find(
    (passage) => passage.passageId === WITNESS_QUALIFIED_PASSAGE_REF,
  );
  const successorMethodology = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologies.find(
    (methodology) => `${methodology.methodologyId}@${methodology.version}` === SUCCESSOR_METHODOLOGY_REF,
  );

  if (
    historicalPassage === undefined ||
    historicalPassage.verificationStatus !== 'unverified_ocr' ||
    witnessQualifiedPassage === undefined ||
    witnessQualifiedPassage.verificationStatus !== 'scan_checked' ||
    witnessQualifiedPassage.witnessId !== NLC_WITNESS ||
    historicalPassage.originalText !== witnessQualifiedPassage.originalText ||
    successorMethodology === undefined ||
    successorMethodology.reviewStatus !== 'research' ||
    !sameSequence(successorMethodology.sourceRefs, [WITNESS_QUALIFIED_PASSAGE_REF])
  ) fail('persisted source authority drift.');

  const everyHistorical = HISTORICAL_INTAKE_CRITERIA.every((criterion) =>
    historicalPassage.originalText.includes(criterion.sourceConcept),
  );
  const everyWitnessQualified = HISTORICAL_INTAKE_CRITERIA.every((criterion) =>
    witnessQualifiedPassage.originalText.includes(criterion.sourceConcept),
  );
  if (!everyHistorical || !everyWitnessQualified) fail('criterion source concept no longer resolves in both passage identities.');

  return Object.freeze({
    registryValidated: true as const,
    historicalPassageRef: HISTORICAL_PASSAGE_REF,
    witnessQualifiedPassageRef: WITNESS_QUALIFIED_PASSAGE_REF,
    historicalPassageVerificationStatus: 'unverified_ocr' as const,
    witnessQualifiedPassageVerificationStatus: 'scan_checked' as const,
    witnessQualifiedPassageWitnessId: NLC_WITNESS,
    originalTextExactMatch: true as const,
    everyCriterionSourceConceptPresentInHistoricalPassage: true as const,
    everyCriterionSourceConceptPresentInWitnessQualifiedPassage: true as const,
    successorMethodologyUsesWitnessQualifiedPassage: true as const,
    semanticIdentityEquivalenceAsserted: false as const,
  });
}

function inspectCriterionCandidates(): void {
  if (
    HISTORICAL_INTAKE_CRITERIA.length !== 5 ||
    !sameSequence(HISTORICAL_INTAKE_CRITERIA.map((criterion) => criterion.criterionId), INTAKE_CRITERION_IDS) ||
    HISTORICAL_INTAKE_CRITERIA.some((criterion) => !sameSequence(criterion.sourceRefs, [HISTORICAL_PASSAGE_REF])) ||
    FR120_INTAKE_CRITERION_WITNESS_QUALIFIED_REBIND_CANDIDATES.length !== 5 ||
    !sameSequence(FR120_INTAKE_CRITERION_WITNESS_QUALIFIED_REBIND_CANDIDATES.map((criterion) => criterion.criterionId), INTAKE_CRITERION_IDS) ||
    FR120_INTAKE_CRITERION_WITNESS_QUALIFIED_REBIND_CANDIDATES.some((criterion) => !sameSequence(criterion.sourceRefs, [WITNESS_QUALIFIED_PASSAGE_REF]))
  ) fail('intake criterion candidate set drift.');

  for (let index = 0; index < HISTORICAL_INTAKE_CRITERIA.length; index += 1) {
    const historical = HISTORICAL_INTAKE_CRITERIA[index];
    const candidate = FR120_INTAKE_CRITERION_WITNESS_QUALIFIED_REBIND_CANDIDATES[index];
    if (historical === undefined || candidate === undefined || !sameCriterionExceptSourceRefs(candidate, historical)) {
      fail(`criterion parity drift at index ${index}.`);
    }
  }
}

export function reviewFiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindFR120(
  source: FiveOfficerIntakeCriterionMethodologyWitnessQualifiedRegistryAdmissionImplementationFR119V1,
): FiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindReviewFR120V1 {
  validateUpstream(source);
  const sourceAuthority = inspectSourceAuthority();
  inspectCriterionCandidates();

  const artifact: FiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindReviewFR120V1 = Object.freeze({
    schemaVersion: 'fr120-five-officers-intake-criterion-definition-witness-qualified-source-rebind-review-v1',
    artifactVersion: '0.1.0',
    authorityState: 'intake_criterion_witness_qualified_source_rebind_admitted_implementation_not_executed',
    upstream: Object.freeze({
      fr119SchemaVersion: source.schemaVersion,
      fr119AuthorityState: source.authorityState,
      successorMethodologyRef: SUCCESSOR_METHODOLOGY_REF,
      successorSourceRef: WITNESS_QUALIFIED_PASSAGE_REF,
      successorPersisted: true as const,
      successorReviewStatus: 'research' as const,
      historicalCriterionDefinitionSourceRefsRetainedBefore: true as const,
      criterionDefinitionSourceRefsRewrittenBefore: 0 as const,
      metricBindingsIssuedBefore: 0 as const,
      thresholdsIssuedBefore: 0 as const,
      criterionStatesIssuedBefore: 0 as const,
      claimsIssuedBefore: 0 as const,
      traditionalSemanticAuthorityBefore: false as const,
    }),
    sourceAuthority,
    criterionSetBefore: Object.freeze({
      criterionCount: 5 as const,
      criterionIds: INTAKE_CRITERION_IDS,
      everyCriterionUsesHistoricalPassageOnly: true as const,
      uniqueSourceRefs: Object.freeze([HISTORICAL_PASSAGE_REF]) as readonly [typeof HISTORICAL_PASSAGE_REF],
    }),
    candidateDefinitions: FR120_INTAKE_CRITERION_WITNESS_QUALIFIED_REBIND_CANDIDATES,
    rebindReview: Object.freeze({
      candidateCriterionCount: 5 as const,
      candidateCriterionIds: INTAKE_CRITERION_IDS,
      everyCandidateUsesWitnessQualifiedPassageOnly: true as const,
      uniqueCandidateSourceRefs: Object.freeze([WITNESS_QUALIFIED_PASSAGE_REF]) as readonly [typeof WITNESS_QUALIFIED_PASSAGE_REF],
      fieldParityExceptSourceRefs: true as const,
      criterionOrderPreserved: true as const,
      sourceConceptsPreserved: true as const,
      modalitiesPreserved: true as const,
      staticV1EligibilityPreserved: true as const,
      requiredForTraditionalFormationPreserved: true as const,
      operationalizationNotesPreserved: true as const,
      criterionDefinitionSourceRebindAuthorized: true as const,
      implementationAuthorized: true as const,
      persisted: false as const,
    }),
    execution: Object.freeze({
      criterionDefinitionsPersisted: 0 as const,
      criterionDefinitionSourceRefsRewritten: 0 as const,
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
      reviewMeansCriterionDefinitionsRewritten: false as const,
      provenanceRebindMeansSemanticIdentityEquivalence: false as const,
      provenanceRebindMeansMetricBinding: false as const,
      provenanceRebindMeansThreshold: false as const,
      provenanceRebindMeansCriterionState: false as const,
      provenanceRebindMeansMethodologyExecution: false as const,
      provenanceRebindMeansTraditionalFormation: false as const,
      provenanceRebindMeansTraditionalSemantics: false as const,
      criterionRebindMeansOfficerMappingDependencyRemoved: false as const,
    }),
    recommendedNextFrontier: 'intake_criterion_definition_witness_qualified_source_rebind_implementation',
    remainingBlockers: REQUIRED_BLOCKERS,
    prohibitedShortcuts: REQUIRED_SHORTCUTS,
  });
  return validateFiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindReviewFR120(artifact);
}

export function validateFiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindReviewFR120(
  source: FiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindReviewFR120V1,
): FiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindReviewFR120V1 {
  if (
    source.schemaVersion !== 'fr120-five-officers-intake-criterion-definition-witness-qualified-source-rebind-review-v1' ||
    source.artifactVersion !== '0.1.0' ||
    source.authorityState !== 'intake_criterion_witness_qualified_source_rebind_admitted_implementation_not_executed'
  ) fail('schema or authority state drift.');

  if (
    source.upstream.fr119SchemaVersion !== 'fr119-five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-v1' ||
    source.upstream.fr119AuthorityState !== 'witness_qualified_intake_criterion_methodology_successor_persisted_downstream_execution_still_closed' ||
    source.upstream.successorMethodologyRef !== SUCCESSOR_METHODOLOGY_REF ||
    source.upstream.successorSourceRef !== WITNESS_QUALIFIED_PASSAGE_REF ||
    source.upstream.successorPersisted !== true ||
    source.upstream.successorReviewStatus !== 'research' ||
    source.upstream.historicalCriterionDefinitionSourceRefsRetainedBefore !== true ||
    source.upstream.criterionDefinitionSourceRefsRewrittenBefore !== 0 ||
    source.upstream.metricBindingsIssuedBefore !== 0 ||
    source.upstream.thresholdsIssuedBefore !== 0 ||
    source.upstream.criterionStatesIssuedBefore !== 0 ||
    source.upstream.claimsIssuedBefore !== 0 ||
    source.upstream.traditionalSemanticAuthorityBefore !== false
  ) fail('upstream snapshot drift.');

  if (
    source.sourceAuthority.registryValidated !== true ||
    source.sourceAuthority.historicalPassageRef !== HISTORICAL_PASSAGE_REF ||
    source.sourceAuthority.witnessQualifiedPassageRef !== WITNESS_QUALIFIED_PASSAGE_REF ||
    source.sourceAuthority.historicalPassageVerificationStatus !== 'unverified_ocr' ||
    source.sourceAuthority.witnessQualifiedPassageVerificationStatus !== 'scan_checked' ||
    source.sourceAuthority.witnessQualifiedPassageWitnessId !== NLC_WITNESS ||
    source.sourceAuthority.originalTextExactMatch !== true ||
    source.sourceAuthority.everyCriterionSourceConceptPresentInHistoricalPassage !== true ||
    source.sourceAuthority.everyCriterionSourceConceptPresentInWitnessQualifiedPassage !== true ||
    source.sourceAuthority.successorMethodologyUsesWitnessQualifiedPassage !== true ||
    source.sourceAuthority.semanticIdentityEquivalenceAsserted !== false
  ) fail('source authority snapshot drift.');

  if (
    source.criterionSetBefore.criterionCount !== 5 ||
    !sameSequence(source.criterionSetBefore.criterionIds, INTAKE_CRITERION_IDS) ||
    source.criterionSetBefore.everyCriterionUsesHistoricalPassageOnly !== true ||
    !sameSequence(source.criterionSetBefore.uniqueSourceRefs, [HISTORICAL_PASSAGE_REF]) ||
    source.candidateDefinitions.length !== 5 ||
    !sameSequence(source.candidateDefinitions.map((criterion) => criterion.criterionId), INTAKE_CRITERION_IDS)
  ) fail('criterion set snapshot drift.');

  for (let index = 0; index < source.candidateDefinitions.length; index += 1) {
    const candidate = source.candidateDefinitions[index];
    const expected = FR120_INTAKE_CRITERION_WITNESS_QUALIFIED_REBIND_CANDIDATES[index];
    if (
      candidate === undefined ||
      expected === undefined ||
      !sameSequence(candidate.sourceRefs, [WITNESS_QUALIFIED_PASSAGE_REF]) ||
      !sameCriterionExceptSourceRefs(candidate, expected)
    ) fail(`candidate definition drift at index ${index}.`);
  }

  if (
    source.rebindReview.candidateCriterionCount !== 5 ||
    !sameSequence(source.rebindReview.candidateCriterionIds, INTAKE_CRITERION_IDS) ||
    source.rebindReview.everyCandidateUsesWitnessQualifiedPassageOnly !== true ||
    !sameSequence(source.rebindReview.uniqueCandidateSourceRefs, [WITNESS_QUALIFIED_PASSAGE_REF]) ||
    source.rebindReview.fieldParityExceptSourceRefs !== true ||
    source.rebindReview.criterionOrderPreserved !== true ||
    source.rebindReview.sourceConceptsPreserved !== true ||
    source.rebindReview.modalitiesPreserved !== true ||
    source.rebindReview.staticV1EligibilityPreserved !== true ||
    source.rebindReview.requiredForTraditionalFormationPreserved !== true ||
    source.rebindReview.operationalizationNotesPreserved !== true ||
    source.rebindReview.criterionDefinitionSourceRebindAuthorized !== true ||
    source.rebindReview.implementationAuthorized !== true ||
    source.rebindReview.persisted !== false
  ) fail('rebind admission drift.');

  if (
    source.execution.criterionDefinitionsPersisted !== 0 ||
    source.execution.criterionDefinitionSourceRefsRewritten !== 0 ||
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
    source.authorityBoundary.reviewMeansCriterionDefinitionsRewritten !== false ||
    source.authorityBoundary.provenanceRebindMeansSemanticIdentityEquivalence !== false ||
    source.authorityBoundary.provenanceRebindMeansMetricBinding !== false ||
    source.authorityBoundary.provenanceRebindMeansThreshold !== false ||
    source.authorityBoundary.provenanceRebindMeansCriterionState !== false ||
    source.authorityBoundary.provenanceRebindMeansMethodologyExecution !== false ||
    source.authorityBoundary.provenanceRebindMeansTraditionalFormation !== false ||
    source.authorityBoundary.provenanceRebindMeansTraditionalSemantics !== false ||
    source.authorityBoundary.criterionRebindMeansOfficerMappingDependencyRemoved !== false
  ) fail('authority boundary drift.');

  if (
    source.recommendedNextFrontier !== 'intake_criterion_definition_witness_qualified_source_rebind_implementation' ||
    !sameSequence(source.remainingBlockers, REQUIRED_BLOCKERS) ||
    !sameSequence(source.prohibitedShortcuts, REQUIRED_SHORTCUTS)
  ) fail('frontier or blocker drift.');

  return source;
}
