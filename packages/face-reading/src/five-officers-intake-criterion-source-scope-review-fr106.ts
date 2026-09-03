import {
  FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0,
  FACE_FR3_METHOD_REFS_V0,
  FIVE_OFFICER_CRITERIA_V0,
  FIVE_OFFICER_DEFINITIONS_V0,
} from './five-officers-six-fus-research-v0.js';
import {
  validateFiveOfficerMethodologySourceRebindReviewFR105,
  type FiveOfficerMethodologySourceRebindReviewFR105V1,
} from './five-officers-methodology-source-rebind-review-fr105.js';
import { FaceAuthorityValidationError, validateFaceAuthorityRegistry } from './validation.js';

const INTAKE_PASSAGE_REF = 'passage.shenxiang.five_officers.intake' as const;
const MAPPING_PASSAGE_REF = 'passage.shenxiang.five_officers.mapping' as const;
const INTAKE_CRITERION_IDS = Object.freeze([
  'criterion.intake.square_broad',
  'criterion.intake.lips_substantial',
  'criterion.intake.corners_arched',
  'criterion.intake.open_close_relation',
  'criterion.intake.red_lip_color',
] as const);

export interface FiveOfficerIntakeCriterionSourceScopeReviewFR106V1 {
  readonly schemaVersion: 'fr106-five-officers-intake-criterion-source-scope-review-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'intake_criterion_source_scope_candidate_admitted_officer_mapping_dependency_retained';
  readonly upstream: {
    readonly fr105SchemaVersion: 'fr105-five-officers-methodology-source-rebind-review-v1';
    readonly fr105AuthorityState: 'intake_source_scan_checked_rebound_methodology_research_only';
    readonly scanCheckedSourceCountAfter: 1;
    readonly unresolvedSourceSlotCountAfter: 5;
    readonly intakeSourceAuthorityRebindAuthorized: true;
    readonly methodologyReviewPromotionAuthorized: false;
    readonly metricBindingsIssued: 0;
    readonly thresholdsIssued: 0;
    readonly criterionStatesIssued: 0;
    readonly claimsIssued: 0;
    readonly traditionalSemanticAuthority: false;
  };
  readonly fullMethodology: {
    readonly methodologyRef: 'method.shenxiang.five_officers@0.1.0';
    readonly reviewStatus: 'research';
    readonly sourceSlotCount: 6;
    readonly historicalRegistryMutated: false;
  };
  readonly intakeOfficerDefinition: {
    readonly officerKey: 'intake';
    readonly traditionalOfficerName: '出納官';
    readonly anatomicalTarget: 'mouth';
    readonly historicalSourceRefs: readonly [
      'passage.shenxiang.five_officers.mapping',
      'passage.shenxiang.five_officers.intake',
    ];
    readonly criterionIds: typeof INTAKE_CRITERION_IDS;
    readonly historicalMappingDependencyPresent: true;
    readonly mappingDependencyRemoved: false;
    readonly fullOfficerDefinitionDecompositionAuthorized: false;
  };
  readonly criterionSourceScope: {
    readonly criterionCount: 5;
    readonly criterionIds: typeof INTAKE_CRITERION_IDS;
    readonly uniqueSourceRefs: readonly ['passage.shenxiang.five_officers.intake'];
    readonly everyCriterionUsesOnlyIntakePassage: true;
    readonly scanCheckedCriterionSourceAvailable: true;
    readonly criterionBundleSourceScopedIndependentlyOfMapping: true;
    readonly intakeCriterionResearchUnitCandidateAdmitted: true;
  };
  readonly directPassageSemantics: {
    readonly chapterSelfNamesOfficer: true;
    readonly textSelfNamesOfficerFormation: true;
    readonly exactTextMatchToScanCheckedOverlay: true;
    readonly selfNamingMeansMappingDependencyRemoval: false;
  };
  readonly criterionMethodologyDefinitionsIssued: 0;
  readonly methodologyRegistryMutationAuthorized: false;
  readonly methodologyReviewPromotionAuthorized: false;
  readonly methodologyExecutionIssued: false;
  readonly methodologyProductionPromotionAuthorized: false;
  readonly metricBindingsIssued: 0;
  readonly thresholdsIssued: 0;
  readonly morphologyProduced: false;
  readonly criterionStatesIssued: 0;
  readonly claimsIssued: 0;
  readonly traditionalFormationAuthorized: false;
  readonly traditionalSemanticAuthority: false;
  readonly authorityBoundary: {
    readonly criterionSourceScopeMeansFullOfficerDecomposition: false;
    readonly selfNamingPassageMeansMappingDependencyRemoval: false;
    readonly criterionResearchCandidateMeansMethodologyDefinition: false;
    readonly scanCheckedCriterionSourceMeansMetricBinding: false;
    readonly scanCheckedCriterionSourceMeansNumericThreshold: false;
    readonly criterionResearchCandidateMeansCriterionState: false;
    readonly criterionResearchCandidateMeansTraditionalFormation: false;
    readonly criterionResearchCandidateMeansTraditionalSemantics: false;
  };
  readonly recommendedNextFrontier: 'intake_criterion_methodology_definition_review';
  readonly remainingBlockers: readonly [
    'intake_criterion_methodology_definition_not_reviewed',
    'intake_officer_mapping_dependency_not_re_reviewed',
    'intake_metric_to_source_concept_mapping_not_authorized',
    'intake_calibration_and_thresholds_not_authorized',
    'fr64_methodology_execution_and_claim_gates_remain',
  ];
  readonly prohibitedShortcuts: readonly [
    'criterion_source_scope_to_full_officer_definition',
    'self_naming_passage_to_mapping_dependency_removal',
    'criterion_research_candidate_to_methodology_definition',
    'scan_checked_criterion_source_to_metric_binding',
    'scan_checked_criterion_source_to_numeric_threshold',
    'criterion_research_candidate_to_criterion_state',
    'criterion_research_candidate_to_traditional_formation',
    'criterion_research_candidate_to_traditional_semantics',
  ];
}

const REQUIRED_BLOCKERS = Object.freeze([
  'intake_criterion_methodology_definition_not_reviewed',
  'intake_officer_mapping_dependency_not_re_reviewed',
  'intake_metric_to_source_concept_mapping_not_authorized',
  'intake_calibration_and_thresholds_not_authorized',
  'fr64_methodology_execution_and_claim_gates_remain',
] as const);

const REQUIRED_SHORTCUTS = Object.freeze([
  'criterion_source_scope_to_full_officer_definition',
  'self_naming_passage_to_mapping_dependency_removal',
  'criterion_research_candidate_to_methodology_definition',
  'scan_checked_criterion_source_to_metric_binding',
  'scan_checked_criterion_source_to_numeric_threshold',
  'criterion_research_candidate_to_criterion_state',
  'criterion_research_candidate_to_traditional_formation',
  'criterion_research_candidate_to_traditional_semantics',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-106 ${message}`);
}

function sameSequence<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function validateUpstream(source: FiveOfficerMethodologySourceRebindReviewFR105V1): void {
  validateFiveOfficerMethodologySourceRebindReviewFR105(source);
  if (
    source.schemaVersion !== 'fr105-five-officers-methodology-source-rebind-review-v1' ||
    source.authorityState !== 'intake_source_scan_checked_rebound_methodology_research_only' ||
    source.targetMethodology.methodologyRef !== 'method.shenxiang.five_officers@0.1.0' ||
    source.targetMethodology.reviewStatusAfter !== 'research' ||
    source.scanCheckedSourceCountAfter !== 1 ||
    source.unresolvedSourceSlotCountAfter !== 5 ||
    source.intakeSourceAuthorityRebindAuthorized !== true ||
    source.sourceAuthorityOverlay.passageRef !== INTAKE_PASSAGE_REF ||
    source.sourceAuthorityOverlay.reboundVerificationStatus !== 'scan_checked' ||
    source.sourceAuthorityOverlay.originalTextExactMatch !== true ||
    source.methodologyReviewPromotionAuthorized !== false ||
    source.metricBindingsIssued !== 0 ||
    source.thresholdsIssued !== 0 ||
    source.criterionStatesIssued !== 0 ||
    source.claimsIssued !== 0 ||
    source.traditionalSemanticAuthority !== false
  ) {
    fail('FR-105 upstream source-rebind authority drift.');
  }
}

function inspectHistoricalIntakeScope(): void {
  validateFaceAuthorityRegistry(FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0);
  if (FACE_FR3_METHOD_REFS_V0.shenxiangFiveOfficers !== 'method.shenxiang.five_officers@0.1.0') {
    fail('Five Officers methodology ref drift.');
  }
  const methodology = FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.methodologies.find(
    (candidate) => `${candidate.methodologyId}@${candidate.version}` === FACE_FR3_METHOD_REFS_V0.shenxiangFiveOfficers,
  );
  if (
    methodology === undefined ||
    methodology.reviewStatus !== 'research' ||
    methodology.sourceRefs.length !== 6 ||
    !methodology.sourceRefs.includes(MAPPING_PASSAGE_REF) ||
    !methodology.sourceRefs.includes(INTAKE_PASSAGE_REF)
  ) {
    fail('historical Five Officers methodology scope drift.');
  }

  const officer = FIVE_OFFICER_DEFINITIONS_V0.find((candidate) => candidate.officerKey === 'intake');
  if (
    officer === undefined ||
    officer.traditionalOfficerName !== '出納官' ||
    officer.anatomicalTarget !== 'mouth' ||
    !sameSequence(officer.sourceRefs, [MAPPING_PASSAGE_REF, INTAKE_PASSAGE_REF]) ||
    !sameSequence(officer.criterionIds, INTAKE_CRITERION_IDS)
  ) {
    fail('historical intake officer definition drift.');
  }

  const criteria = FIVE_OFFICER_CRITERIA_V0.filter((criterion) => criterion.officerKey === 'intake');
  if (
    criteria.length !== 5 ||
    !sameSequence(criteria.map((criterion) => criterion.criterionId), INTAKE_CRITERION_IDS) ||
    criteria.some(
      (criterion) => criterion.traditionalOfficerName !== '出納官' ||
        criterion.anatomicalTarget !== 'mouth' ||
        !sameSequence(criterion.sourceRefs, [INTAKE_PASSAGE_REF]),
    )
  ) {
    fail('intake criterion source scope drift.');
  }

  const intakePassage = FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.passages.find(
    (passage) => passage.passageId === INTAKE_PASSAGE_REF,
  );
  if (
    intakePassage === undefined ||
    intakePassage.chapter !== '出納官' ||
    !intakePassage.originalText.includes('乃為出納官成')
  ) {
    fail('historical intake passage no longer self-identifies the officer.');
  }
}

export function reviewFiveOfficerIntakeCriterionSourceScopeFR106(
  source: FiveOfficerMethodologySourceRebindReviewFR105V1,
): FiveOfficerIntakeCriterionSourceScopeReviewFR106V1 {
  validateUpstream(source);
  inspectHistoricalIntakeScope();

  return Object.freeze({
    schemaVersion: 'fr106-five-officers-intake-criterion-source-scope-review-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'intake_criterion_source_scope_candidate_admitted_officer_mapping_dependency_retained' as const,
    upstream: Object.freeze({
      fr105SchemaVersion: source.schemaVersion,
      fr105AuthorityState: source.authorityState,
      scanCheckedSourceCountAfter: source.scanCheckedSourceCountAfter,
      unresolvedSourceSlotCountAfter: source.unresolvedSourceSlotCountAfter,
      intakeSourceAuthorityRebindAuthorized: source.intakeSourceAuthorityRebindAuthorized,
      methodologyReviewPromotionAuthorized: source.methodologyReviewPromotionAuthorized,
      metricBindingsIssued: source.metricBindingsIssued,
      thresholdsIssued: source.thresholdsIssued,
      criterionStatesIssued: source.criterionStatesIssued,
      claimsIssued: source.claimsIssued,
      traditionalSemanticAuthority: source.traditionalSemanticAuthority,
    }),
    fullMethodology: Object.freeze({
      methodologyRef: 'method.shenxiang.five_officers@0.1.0' as const,
      reviewStatus: 'research' as const,
      sourceSlotCount: 6 as const,
      historicalRegistryMutated: false as const,
    }),
    intakeOfficerDefinition: Object.freeze({
      officerKey: 'intake' as const,
      traditionalOfficerName: '出納官' as const,
      anatomicalTarget: 'mouth' as const,
      historicalSourceRefs: Object.freeze([MAPPING_PASSAGE_REF, INTAKE_PASSAGE_REF]) as readonly [
        'passage.shenxiang.five_officers.mapping',
        'passage.shenxiang.five_officers.intake',
      ],
      criterionIds: INTAKE_CRITERION_IDS,
      historicalMappingDependencyPresent: true as const,
      mappingDependencyRemoved: false as const,
      fullOfficerDefinitionDecompositionAuthorized: false as const,
    }),
    criterionSourceScope: Object.freeze({
      criterionCount: 5 as const,
      criterionIds: INTAKE_CRITERION_IDS,
      uniqueSourceRefs: Object.freeze([INTAKE_PASSAGE_REF]) as readonly ['passage.shenxiang.five_officers.intake'],
      everyCriterionUsesOnlyIntakePassage: true as const,
      scanCheckedCriterionSourceAvailable: true as const,
      criterionBundleSourceScopedIndependentlyOfMapping: true as const,
      intakeCriterionResearchUnitCandidateAdmitted: true as const,
    }),
    directPassageSemantics: Object.freeze({
      chapterSelfNamesOfficer: true as const,
      textSelfNamesOfficerFormation: true as const,
      exactTextMatchToScanCheckedOverlay: true as const,
      selfNamingMeansMappingDependencyRemoval: false as const,
    }),
    criterionMethodologyDefinitionsIssued: 0 as const,
    methodologyRegistryMutationAuthorized: false as const,
    methodologyReviewPromotionAuthorized: false as const,
    methodologyExecutionIssued: false as const,
    methodologyProductionPromotionAuthorized: false as const,
    metricBindingsIssued: 0 as const,
    thresholdsIssued: 0 as const,
    morphologyProduced: false as const,
    criterionStatesIssued: 0 as const,
    claimsIssued: 0 as const,
    traditionalFormationAuthorized: false as const,
    traditionalSemanticAuthority: false as const,
    authorityBoundary: Object.freeze({
      criterionSourceScopeMeansFullOfficerDecomposition: false as const,
      selfNamingPassageMeansMappingDependencyRemoval: false as const,
      criterionResearchCandidateMeansMethodologyDefinition: false as const,
      scanCheckedCriterionSourceMeansMetricBinding: false as const,
      scanCheckedCriterionSourceMeansNumericThreshold: false as const,
      criterionResearchCandidateMeansCriterionState: false as const,
      criterionResearchCandidateMeansTraditionalFormation: false as const,
      criterionResearchCandidateMeansTraditionalSemantics: false as const,
    }),
    recommendedNextFrontier: 'intake_criterion_methodology_definition_review' as const,
    remainingBlockers: REQUIRED_BLOCKERS,
    prohibitedShortcuts: REQUIRED_SHORTCUTS,
  });
}

export function validateFiveOfficerIntakeCriterionSourceScopeReviewFR106(
  source: FiveOfficerIntakeCriterionSourceScopeReviewFR106V1,
): FiveOfficerIntakeCriterionSourceScopeReviewFR106V1 {
  if (
    source.schemaVersion !== 'fr106-five-officers-intake-criterion-source-scope-review-v1' ||
    source.artifactVersion !== '0.1.0' ||
    source.authorityState !== 'intake_criterion_source_scope_candidate_admitted_officer_mapping_dependency_retained'
  ) fail('schema or authority state drift.');
  if (
    source.upstream.fr105SchemaVersion !== 'fr105-five-officers-methodology-source-rebind-review-v1' ||
    source.upstream.fr105AuthorityState !== 'intake_source_scan_checked_rebound_methodology_research_only' ||
    source.upstream.scanCheckedSourceCountAfter !== 1 ||
    source.upstream.unresolvedSourceSlotCountAfter !== 5 ||
    source.upstream.intakeSourceAuthorityRebindAuthorized !== true ||
    source.upstream.methodologyReviewPromotionAuthorized !== false ||
    source.upstream.metricBindingsIssued !== 0 ||
    source.upstream.thresholdsIssued !== 0 ||
    source.upstream.criterionStatesIssued !== 0 ||
    source.upstream.claimsIssued !== 0 ||
    source.upstream.traditionalSemanticAuthority !== false
  ) fail('FR-105 upstream authority widened.');
  if (
    source.fullMethodology.methodologyRef !== 'method.shenxiang.five_officers@0.1.0' ||
    source.fullMethodology.reviewStatus !== 'research' ||
    source.fullMethodology.sourceSlotCount !== 6 ||
    source.fullMethodology.historicalRegistryMutated !== false
  ) fail('full methodology authority drift.');
  if (
    source.intakeOfficerDefinition.officerKey !== 'intake' ||
    source.intakeOfficerDefinition.traditionalOfficerName !== '出納官' ||
    source.intakeOfficerDefinition.anatomicalTarget !== 'mouth' ||
    !sameSequence(source.intakeOfficerDefinition.historicalSourceRefs, [MAPPING_PASSAGE_REF, INTAKE_PASSAGE_REF]) ||
    !sameSequence(source.intakeOfficerDefinition.criterionIds, INTAKE_CRITERION_IDS) ||
    source.intakeOfficerDefinition.historicalMappingDependencyPresent !== true ||
    source.intakeOfficerDefinition.mappingDependencyRemoved !== false ||
    source.intakeOfficerDefinition.fullOfficerDefinitionDecompositionAuthorized !== false
  ) fail('intake officer definition authority drift.');
  if (
    source.criterionSourceScope.criterionCount !== 5 ||
    !sameSequence(source.criterionSourceScope.criterionIds, INTAKE_CRITERION_IDS) ||
    !sameSequence(source.criterionSourceScope.uniqueSourceRefs, [INTAKE_PASSAGE_REF]) ||
    source.criterionSourceScope.everyCriterionUsesOnlyIntakePassage !== true ||
    source.criterionSourceScope.scanCheckedCriterionSourceAvailable !== true ||
    source.criterionSourceScope.criterionBundleSourceScopedIndependentlyOfMapping !== true ||
    source.criterionSourceScope.intakeCriterionResearchUnitCandidateAdmitted !== true
  ) fail('criterion source scope drift.');
  if (
    source.directPassageSemantics.chapterSelfNamesOfficer !== true ||
    source.directPassageSemantics.textSelfNamesOfficerFormation !== true ||
    source.directPassageSemantics.exactTextMatchToScanCheckedOverlay !== true ||
    source.directPassageSemantics.selfNamingMeansMappingDependencyRemoval !== false
  ) fail('direct passage semantic boundary drift.');
  if (
    source.criterionMethodologyDefinitionsIssued !== 0 ||
    source.methodologyRegistryMutationAuthorized !== false ||
    source.methodologyReviewPromotionAuthorized !== false ||
    source.methodologyExecutionIssued !== false ||
    source.methodologyProductionPromotionAuthorized !== false ||
    source.metricBindingsIssued !== 0 ||
    source.thresholdsIssued !== 0 ||
    source.morphologyProduced !== false ||
    source.criterionStatesIssued !== 0 ||
    source.claimsIssued !== 0 ||
    source.traditionalFormationAuthorized !== false ||
    source.traditionalSemanticAuthority !== false
  ) fail('authority widened.');
  if (!Object.values(source.authorityBoundary).every((value) => value === false)) {
    fail('authority boundary must remain fully fail-closed.');
  }
  if (source.recommendedNextFrontier !== 'intake_criterion_methodology_definition_review') {
    fail('recommended frontier drift.');
  }
  if (!sameSequence(source.remainingBlockers, REQUIRED_BLOCKERS)) fail('remaining blockers drift.');
  if (!sameSequence(source.prohibitedShortcuts, REQUIRED_SHORTCUTS)) fail('prohibited shortcuts drift.');
  return source;
}
