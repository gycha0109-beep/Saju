import type { FaceMethodologyDefinition } from './contracts.js';
import {
  FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0,
  FIVE_OFFICER_CRITERIA_V0,
} from './five-officers-six-fus-research-v0.js';
import {
  validateFiveOfficerIntakeCriterionSourceScopeReviewFR106,
  type FiveOfficerIntakeCriterionSourceScopeReviewFR106V1,
} from './five-officers-intake-criterion-source-scope-review-fr106.js';
import { FaceAuthorityValidationError, validateFaceAuthorityRegistry } from './validation.js';

const FULL_METHODOLOGY_REF = 'method.shenxiang.five_officers@0.1.0' as const;
const INTAKE_PASSAGE_REF = 'passage.shenxiang.five_officers.intake' as const;
const CANDIDATE_METHODOLOGY_ID = 'method.shenxiang.five_officers.intake_criteria' as const;
const CANDIDATE_METHODOLOGY_VERSION = '0.1.0' as const;
const CANDIDATE_METHODOLOGY_REF = `${CANDIDATE_METHODOLOGY_ID}@${CANDIDATE_METHODOLOGY_VERSION}` as const;
const INTAKE_CRITERION_IDS = Object.freeze([
  'criterion.intake.square_broad',
  'criterion.intake.lips_substantial',
  'criterion.intake.corners_arched',
  'criterion.intake.open_close_relation',
  'criterion.intake.red_lip_color',
] as const);
const CANDIDATE_LIMITATIONS = Object.freeze([
  '이 definition은 full Five Officers 또는 historical intake officer definition을 대체하지 않으며 기존 mapping dependency를 제거하지 않는다.',
  'scan_checked source authority는 본문 확인만 의미하며 方大·端厚·角弓·開大合小·唇紅의 machine operationalization 또는 metric binding을 승인하지 않는다.',
  'capture-sensitive 및 dynamic-appearance criterion은 static v1 자동판정에서 계속 차단한다.',
  '이 research definition은 persistent authority registry나 methodology pack에 등록되지 않았고 실행·claim·traditional formation authority가 없다.',
] as const);

export interface FiveOfficerIntakeCriterionMethodologyDefinitionReviewFR107V1 {
  readonly schemaVersion: 'fr107-five-officers-intake-criterion-methodology-definition-review-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'intake_criterion_research_methodology_definition_admitted_registry_unmodified';
  readonly upstream: {
    readonly fr106SchemaVersion: 'fr106-five-officers-intake-criterion-source-scope-review-v1';
    readonly fr106AuthorityState: 'intake_criterion_source_scope_candidate_admitted_officer_mapping_dependency_retained';
    readonly criterionCount: 5;
    readonly criterionBundleSourceScopedIndependentlyOfMapping: true;
    readonly scanCheckedCriterionSourceAvailable: true;
    readonly historicalMappingDependencyPresent: true;
    readonly mappingDependencyRemoved: false;
    readonly criterionMethodologyDefinitionsPreviouslyIssued: 0;
    readonly metricBindingsIssued: 0;
    readonly thresholdsIssued: 0;
    readonly criterionStatesIssued: 0;
    readonly claimsIssued: 0;
    readonly traditionalSemanticAuthority: false;
  };
  readonly candidateDefinition: FaceMethodologyDefinition & {
    readonly methodologyId: typeof CANDIDATE_METHODOLOGY_ID;
    readonly version: typeof CANDIDATE_METHODOLOGY_VERSION;
    readonly traditionalTerm: '出納官';
    readonly scope: 'static_face';
    readonly sourceRefs: readonly [typeof INTAKE_PASSAGE_REF];
    readonly reviewStatus: 'research';
  };
  readonly definitionReview: {
    readonly methodologyRef: typeof CANDIDATE_METHODOLOGY_REF;
    readonly criterionIds: typeof INTAKE_CRITERION_IDS;
    readonly criterionCount: 5;
    readonly staticGeometryCriterionCount: 2;
    readonly captureSensitiveCriterionCount: 2;
    readonly dynamicAppearanceCriterionCount: 1;
    readonly sourceScopeExactlyIntakePassage: true;
    readonly sourceAuthorityScanCheckedByGovernedOverlay: true;
    readonly registryContractStructurallyValidAsResearch: true;
    readonly criterionResearchMethodologyDefinitionAdmitted: true;
    readonly methodologyDefinitionsIssued: 1;
    readonly persistentRegistryDefinitionsIssued: 0;
  };
  readonly fullMethodology: {
    readonly methodologyRef: typeof FULL_METHODOLOGY_REF;
    readonly reviewStatus: 'research';
    readonly historicalMappingDependencyPresent: true;
    readonly mappingDependencyRemoved: false;
    readonly reviewPromotionAuthorized: false;
    readonly replacedByCandidate: false;
  };
  readonly registry: {
    readonly historicalRegistryMutated: false;
    readonly candidatePersisted: false;
    readonly methodologyPackMutated: false;
    readonly registryAdmissionAuthorized: false;
  };
  readonly execution: {
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
    readonly researchDefinitionMeansRegistryAdmission: false;
    readonly scanCheckedSourceMeansReviewedMethodology: false;
    readonly criterionBundleMeansFullOfficerDefinition: false;
    readonly researchDefinitionMeansMetricBinding: false;
    readonly researchDefinitionMeansThreshold: false;
    readonly researchDefinitionMeansCriterionState: false;
    readonly researchDefinitionMeansTraditionalFormation: false;
    readonly researchDefinitionMeansTraditionalSemantics: false;
  };
  readonly recommendedNextFrontier: 'intake_criterion_methodology_registry_admission_review';
  readonly remainingBlockers: readonly [
    'intake_criterion_methodology_not_registered',
    'intake_officer_mapping_dependency_not_re_reviewed',
    'intake_metric_to_source_concept_mapping_not_authorized',
    'intake_calibration_and_thresholds_not_authorized',
    'fr64_methodology_execution_and_claim_gates_remain',
  ];
  readonly prohibitedShortcuts: readonly [
    'research_definition_to_registry_admission',
    'scan_checked_source_to_reviewed_methodology',
    'criterion_bundle_to_full_officer_definition',
    'research_definition_to_metric_binding',
    'research_definition_to_numeric_threshold',
    'research_definition_to_criterion_state',
    'research_definition_to_traditional_formation',
    'research_definition_to_traditional_semantics',
  ];
}

const REQUIRED_BLOCKERS = Object.freeze([
  'intake_criterion_methodology_not_registered',
  'intake_officer_mapping_dependency_not_re_reviewed',
  'intake_metric_to_source_concept_mapping_not_authorized',
  'intake_calibration_and_thresholds_not_authorized',
  'fr64_methodology_execution_and_claim_gates_remain',
] as const);
const REQUIRED_SHORTCUTS = Object.freeze([
  'research_definition_to_registry_admission',
  'scan_checked_source_to_reviewed_methodology',
  'criterion_bundle_to_full_officer_definition',
  'research_definition_to_metric_binding',
  'research_definition_to_numeric_threshold',
  'research_definition_to_criterion_state',
  'research_definition_to_traditional_formation',
  'research_definition_to_traditional_semantics',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-107 ${message}`);
}

function sameSequence<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function validateUpstream(source: FiveOfficerIntakeCriterionSourceScopeReviewFR106V1): void {
  validateFiveOfficerIntakeCriterionSourceScopeReviewFR106(source);
  if (
    source.schemaVersion !== 'fr106-five-officers-intake-criterion-source-scope-review-v1' ||
    source.authorityState !== 'intake_criterion_source_scope_candidate_admitted_officer_mapping_dependency_retained' ||
    source.fullMethodology.methodologyRef !== FULL_METHODOLOGY_REF ||
    source.fullMethodology.reviewStatus !== 'research' ||
    source.criterionSourceScope.criterionCount !== 5 ||
    source.criterionSourceScope.scanCheckedCriterionSourceAvailable !== true ||
    source.criterionSourceScope.criterionBundleSourceScopedIndependentlyOfMapping !== true ||
    source.criterionSourceScope.intakeCriterionResearchUnitCandidateAdmitted !== true ||
    source.intakeOfficerDefinition.historicalMappingDependencyPresent !== true ||
    source.intakeOfficerDefinition.mappingDependencyRemoved !== false ||
    source.criterionMethodologyDefinitionsIssued !== 0 ||
    source.methodologyReviewPromotionAuthorized !== false ||
    source.methodologyExecutionIssued !== false ||
    source.metricBindingsIssued !== 0 ||
    source.thresholdsIssued !== 0 ||
    source.criterionStatesIssued !== 0 ||
    source.claimsIssued !== 0 ||
    source.traditionalSemanticAuthority !== false
  ) fail('FR-106 upstream authority drift.');
}

function buildCandidateDefinition(): FiveOfficerIntakeCriterionMethodologyDefinitionReviewFR107V1['candidateDefinition'] {
  return Object.freeze({
    methodologyId: CANDIDATE_METHODOLOGY_ID,
    version: CANDIDATE_METHODOLOGY_VERSION,
    traditionalTerm: '出納官' as const,
    scope: 'static_face' as const,
    sourceRefs: Object.freeze([INTAKE_PASSAGE_REF]) as readonly [typeof INTAKE_PASSAGE_REF],
    description: '神相全編 出納官 passage의 다섯 criterion을 full 五官 methodology와 분리된 mouth/intake criterion research unit로 보존한다.',
    limitations: CANDIDATE_LIMITATIONS,
    reviewStatus: 'research' as const,
  });
}

function validateCandidateAgainstResearchRegistry(
  candidate: FiveOfficerIntakeCriterionMethodologyDefinitionReviewFR107V1['candidateDefinition'],
): void {
  validateFaceAuthorityRegistry(FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0);
  const candidateRef = `${candidate.methodologyId}@${candidate.version}`;
  if (candidateRef !== CANDIDATE_METHODOLOGY_REF) fail('candidate methodology ref drift.');
  if (FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.methodologies.some(
    (methodology) => `${methodology.methodologyId}@${methodology.version}` === candidateRef,
  )) fail('candidate methodology unexpectedly already exists in the historical registry.');

  const intakePassage = FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.passages.find(
    (passage) => passage.passageId === INTAKE_PASSAGE_REF,
  );
  if (intakePassage === undefined) fail('candidate source passage does not resolve in the historical registry.');

  const ephemeralRegistry = Object.freeze({
    ...FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0,
    methodologies: Object.freeze([...FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.methodologies, candidate]),
  });
  validateFaceAuthorityRegistry(ephemeralRegistry);
}

function inspectCriterionBundle(): void {
  const criteria = FIVE_OFFICER_CRITERIA_V0.filter((criterion) => criterion.officerKey === 'intake');
  if (
    criteria.length !== 5 ||
    !sameSequence(criteria.map((criterion) => criterion.criterionId), INTAKE_CRITERION_IDS) ||
    criteria.some((criterion) => !sameSequence(criterion.sourceRefs, [INTAKE_PASSAGE_REF]))
  ) fail('historical intake criterion bundle drift.');
  const staticCount = criteria.filter((criterion) => criterion.modality === 'static_geometry').length;
  const captureCount = criteria.filter((criterion) => criterion.modality === 'capture_sensitive').length;
  const dynamicCount = criteria.filter((criterion) => criterion.modality === 'dynamic_appearance').length;
  if (staticCount !== 2 || captureCount !== 2 || dynamicCount !== 1) fail('intake criterion modality split drift.');
}

export function reviewFiveOfficerIntakeCriterionMethodologyDefinitionFR107(
  source: FiveOfficerIntakeCriterionSourceScopeReviewFR106V1,
): FiveOfficerIntakeCriterionMethodologyDefinitionReviewFR107V1 {
  validateUpstream(source);
  inspectCriterionBundle();
  const candidateDefinition = buildCandidateDefinition();
  validateCandidateAgainstResearchRegistry(candidateDefinition);

  return Object.freeze({
    schemaVersion: 'fr107-five-officers-intake-criterion-methodology-definition-review-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'intake_criterion_research_methodology_definition_admitted_registry_unmodified' as const,
    upstream: Object.freeze({
      fr106SchemaVersion: source.schemaVersion,
      fr106AuthorityState: source.authorityState,
      criterionCount: source.criterionSourceScope.criterionCount,
      criterionBundleSourceScopedIndependentlyOfMapping: source.criterionSourceScope.criterionBundleSourceScopedIndependentlyOfMapping,
      scanCheckedCriterionSourceAvailable: source.criterionSourceScope.scanCheckedCriterionSourceAvailable,
      historicalMappingDependencyPresent: source.intakeOfficerDefinition.historicalMappingDependencyPresent,
      mappingDependencyRemoved: source.intakeOfficerDefinition.mappingDependencyRemoved,
      criterionMethodologyDefinitionsPreviouslyIssued: source.criterionMethodologyDefinitionsIssued,
      metricBindingsIssued: source.metricBindingsIssued,
      thresholdsIssued: source.thresholdsIssued,
      criterionStatesIssued: source.criterionStatesIssued,
      claimsIssued: source.claimsIssued,
      traditionalSemanticAuthority: source.traditionalSemanticAuthority,
    }),
    candidateDefinition,
    definitionReview: Object.freeze({
      methodologyRef: CANDIDATE_METHODOLOGY_REF,
      criterionIds: INTAKE_CRITERION_IDS,
      criterionCount: 5 as const,
      staticGeometryCriterionCount: 2 as const,
      captureSensitiveCriterionCount: 2 as const,
      dynamicAppearanceCriterionCount: 1 as const,
      sourceScopeExactlyIntakePassage: true as const,
      sourceAuthorityScanCheckedByGovernedOverlay: true as const,
      registryContractStructurallyValidAsResearch: true as const,
      criterionResearchMethodologyDefinitionAdmitted: true as const,
      methodologyDefinitionsIssued: 1 as const,
      persistentRegistryDefinitionsIssued: 0 as const,
    }),
    fullMethodology: Object.freeze({
      methodologyRef: FULL_METHODOLOGY_REF,
      reviewStatus: 'research' as const,
      historicalMappingDependencyPresent: true as const,
      mappingDependencyRemoved: false as const,
      reviewPromotionAuthorized: false as const,
      replacedByCandidate: false as const,
    }),
    registry: Object.freeze({
      historicalRegistryMutated: false as const,
      candidatePersisted: false as const,
      methodologyPackMutated: false as const,
      registryAdmissionAuthorized: false as const,
    }),
    execution: Object.freeze({
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
      researchDefinitionMeansRegistryAdmission: false as const,
      scanCheckedSourceMeansReviewedMethodology: false as const,
      criterionBundleMeansFullOfficerDefinition: false as const,
      researchDefinitionMeansMetricBinding: false as const,
      researchDefinitionMeansThreshold: false as const,
      researchDefinitionMeansCriterionState: false as const,
      researchDefinitionMeansTraditionalFormation: false as const,
      researchDefinitionMeansTraditionalSemantics: false as const,
    }),
    recommendedNextFrontier: 'intake_criterion_methodology_registry_admission_review' as const,
    remainingBlockers: REQUIRED_BLOCKERS,
    prohibitedShortcuts: REQUIRED_SHORTCUTS,
  });
}

export function validateFiveOfficerIntakeCriterionMethodologyDefinitionReviewFR107(
  source: FiveOfficerIntakeCriterionMethodologyDefinitionReviewFR107V1,
): FiveOfficerIntakeCriterionMethodologyDefinitionReviewFR107V1 {
  if (
    source.schemaVersion !== 'fr107-five-officers-intake-criterion-methodology-definition-review-v1' ||
    source.artifactVersion !== '0.1.0' ||
    source.authorityState !== 'intake_criterion_research_methodology_definition_admitted_registry_unmodified'
  ) fail('schema or authority state drift.');
  if (
    source.upstream.fr106SchemaVersion !== 'fr106-five-officers-intake-criterion-source-scope-review-v1' ||
    source.upstream.fr106AuthorityState !== 'intake_criterion_source_scope_candidate_admitted_officer_mapping_dependency_retained' ||
    source.upstream.criterionCount !== 5 ||
    source.upstream.criterionBundleSourceScopedIndependentlyOfMapping !== true ||
    source.upstream.scanCheckedCriterionSourceAvailable !== true ||
    source.upstream.historicalMappingDependencyPresent !== true ||
    source.upstream.mappingDependencyRemoved !== false ||
    source.upstream.criterionMethodologyDefinitionsPreviouslyIssued !== 0 ||
    source.upstream.metricBindingsIssued !== 0 ||
    source.upstream.thresholdsIssued !== 0 ||
    source.upstream.criterionStatesIssued !== 0 ||
    source.upstream.claimsIssued !== 0 ||
    source.upstream.traditionalSemanticAuthority !== false
  ) fail('upstream authority snapshot drift.');
  if (
    source.candidateDefinition.methodologyId !== CANDIDATE_METHODOLOGY_ID ||
    source.candidateDefinition.version !== CANDIDATE_METHODOLOGY_VERSION ||
    source.candidateDefinition.traditionalTerm !== '出納官' ||
    source.candidateDefinition.scope !== 'static_face' ||
    !sameSequence(source.candidateDefinition.sourceRefs, [INTAKE_PASSAGE_REF]) ||
    source.candidateDefinition.reviewStatus !== 'research' ||
    !sameSequence(source.candidateDefinition.limitations, CANDIDATE_LIMITATIONS)
  ) fail('candidate methodology definition drift.');
  validateCandidateAgainstResearchRegistry(source.candidateDefinition);
  if (
    source.definitionReview.methodologyRef !== CANDIDATE_METHODOLOGY_REF ||
    !sameSequence(source.definitionReview.criterionIds, INTAKE_CRITERION_IDS) ||
    source.definitionReview.criterionCount !== 5 ||
    source.definitionReview.staticGeometryCriterionCount !== 2 ||
    source.definitionReview.captureSensitiveCriterionCount !== 2 ||
    source.definitionReview.dynamicAppearanceCriterionCount !== 1 ||
    source.definitionReview.sourceScopeExactlyIntakePassage !== true ||
    source.definitionReview.sourceAuthorityScanCheckedByGovernedOverlay !== true ||
    source.definitionReview.registryContractStructurallyValidAsResearch !== true ||
    source.definitionReview.criterionResearchMethodologyDefinitionAdmitted !== true ||
    source.definitionReview.methodologyDefinitionsIssued !== 1 ||
    source.definitionReview.persistentRegistryDefinitionsIssued !== 0
  ) fail('definition review drift.');
  if (
    source.fullMethodology.methodologyRef !== FULL_METHODOLOGY_REF ||
    source.fullMethodology.reviewStatus !== 'research' ||
    source.fullMethodology.historicalMappingDependencyPresent !== true ||
    source.fullMethodology.mappingDependencyRemoved !== false ||
    source.fullMethodology.reviewPromotionAuthorized !== false ||
    source.fullMethodology.replacedByCandidate !== false
  ) fail('full methodology boundary drift.');
  if (
    source.registry.historicalRegistryMutated !== false ||
    source.registry.candidatePersisted !== false ||
    source.registry.methodologyPackMutated !== false ||
    source.registry.registryAdmissionAuthorized !== false
  ) fail('registry boundary drift.');
  if (
    source.execution.methodologyExecutionIssued !== false ||
    source.execution.methodologyProductionPromotionAuthorized !== false ||
    source.execution.metricBindingsIssued !== 0 ||
    source.execution.thresholdsIssued !== 0 ||
    source.execution.morphologyProduced !== false ||
    source.execution.criterionStatesIssued !== 0 ||
    source.execution.claimsIssued !== 0 ||
    source.execution.traditionalFormationAuthorized !== false ||
    source.execution.traditionalSemanticAuthority !== false
  ) fail('execution authority drift.');
  if (
    Object.values(source.authorityBoundary).some((value) => value !== false) ||
    source.recommendedNextFrontier !== 'intake_criterion_methodology_registry_admission_review' ||
    !sameSequence(source.remainingBlockers, REQUIRED_BLOCKERS) ||
    !sameSequence(source.prohibitedShortcuts, REQUIRED_SHORTCUTS)
  ) fail('authority boundary or next-frontier drift.');
  return source;
}
