import { describe, expect, it } from 'vitest';
import type { FiveOfficerIntakeCriterionMethodologyDefinitionReviewFR107V1 } from './five-officers-intake-criterion-methodology-definition-review-fr107.js';
import { validateFiveOfficerIntakeCriterionMethodologyDefinitionReviewFR107 } from './five-officers-intake-criterion-methodology-definition-review-fr107.js';
import { FaceAuthorityValidationError } from './validation.js';

function baseline(): FiveOfficerIntakeCriterionMethodologyDefinitionReviewFR107V1 {
  return {
    schemaVersion: 'fr107-five-officers-intake-criterion-methodology-definition-review-v1',
    artifactVersion: '0.1.0',
    authorityState: 'intake_criterion_research_methodology_definition_admitted_registry_unmodified',
    upstream: {
      fr106SchemaVersion: 'fr106-five-officers-intake-criterion-source-scope-review-v1',
      fr106AuthorityState: 'intake_criterion_source_scope_candidate_admitted_officer_mapping_dependency_retained',
      criterionCount: 5,
      criterionBundleSourceScopedIndependentlyOfMapping: true,
      scanCheckedCriterionSourceAvailable: true,
      historicalMappingDependencyPresent: true,
      mappingDependencyRemoved: false,
      criterionMethodologyDefinitionsPreviouslyIssued: 0,
      metricBindingsIssued: 0,
      thresholdsIssued: 0,
      criterionStatesIssued: 0,
      claimsIssued: 0,
      traditionalSemanticAuthority: false,
    },
    candidateDefinition: {
      methodologyId: 'method.shenxiang.five_officers.intake_criteria',
      version: '0.1.0',
      traditionalTerm: '出納官',
      scope: 'static_face',
      sourceRefs: ['passage.shenxiang.five_officers.intake'],
      description: '神相全編 出納官 passage의 다섯 criterion을 full 五官 methodology와 분리된 mouth/intake criterion research unit로 보존한다.',
      limitations: [
        '이 definition은 full Five Officers 또는 historical intake officer definition을 대체하지 않으며 기존 mapping dependency를 제거하지 않는다.',
        'scan_checked source authority는 본문 확인만 의미하며 方大·端厚·角弓·開大合小·唇紅의 machine operationalization 또는 metric binding을 승인하지 않는다.',
        'capture-sensitive 및 dynamic-appearance criterion은 static v1 자동판정에서 계속 차단한다.',
        '이 research definition은 persistent authority registry나 methodology pack에 등록되지 않았고 실행·claim·traditional formation authority가 없다.',
      ],
      reviewStatus: 'research',
    },
    definitionReview: {
      methodologyRef: 'method.shenxiang.five_officers.intake_criteria@0.1.0',
      criterionIds: [
        'criterion.intake.square_broad',
        'criterion.intake.lips_substantial',
        'criterion.intake.corners_arched',
        'criterion.intake.open_close_relation',
        'criterion.intake.red_lip_color',
      ],
      criterionCount: 5,
      staticGeometryCriterionCount: 2,
      captureSensitiveCriterionCount: 2,
      dynamicAppearanceCriterionCount: 1,
      sourceScopeExactlyIntakePassage: true,
      sourceAuthorityScanCheckedByGovernedOverlay: true,
      registryContractStructurallyValidAsResearch: true,
      criterionResearchMethodologyDefinitionAdmitted: true,
      methodologyDefinitionsIssued: 1,
      persistentRegistryDefinitionsIssued: 0,
    },
    fullMethodology: {
      methodologyRef: 'method.shenxiang.five_officers@0.1.0',
      reviewStatus: 'research',
      historicalMappingDependencyPresent: true,
      mappingDependencyRemoved: false,
      reviewPromotionAuthorized: false,
      replacedByCandidate: false,
    },
    registry: {
      historicalRegistryMutated: false,
      candidatePersisted: false,
      methodologyPackMutated: false,
      registryAdmissionAuthorized: false,
    },
    execution: {
      methodologyExecutionIssued: false,
      methodologyProductionPromotionAuthorized: false,
      metricBindingsIssued: 0,
      thresholdsIssued: 0,
      morphologyProduced: false,
      criterionStatesIssued: 0,
      claimsIssued: 0,
      traditionalFormationAuthorized: false,
      traditionalSemanticAuthority: false,
    },
    authorityBoundary: {
      researchDefinitionMeansRegistryAdmission: false,
      scanCheckedSourceMeansReviewedMethodology: false,
      criterionBundleMeansFullOfficerDefinition: false,
      researchDefinitionMeansMetricBinding: false,
      researchDefinitionMeansThreshold: false,
      researchDefinitionMeansCriterionState: false,
      researchDefinitionMeansTraditionalFormation: false,
      researchDefinitionMeansTraditionalSemantics: false,
    },
    recommendedNextFrontier: 'intake_criterion_methodology_registry_admission_review',
    remainingBlockers: [
      'intake_criterion_methodology_not_registered',
      'intake_officer_mapping_dependency_not_re_reviewed',
      'intake_metric_to_source_concept_mapping_not_authorized',
      'intake_calibration_and_thresholds_not_authorized',
      'fr64_methodology_execution_and_claim_gates_remain',
    ],
    prohibitedShortcuts: [
      'research_definition_to_registry_admission',
      'scan_checked_source_to_reviewed_methodology',
      'criterion_bundle_to_full_officer_definition',
      'research_definition_to_metric_binding',
      'research_definition_to_numeric_threshold',
      'research_definition_to_criterion_state',
      'research_definition_to_traditional_formation',
      'research_definition_to_traditional_semantics',
    ],
  };
}

describe('FR107 methodology definition hardening', () => {
  it('rejects reviewed promotion, persistent registration, and metric/traditional authority shortcuts', () => {
    const promoted = baseline() as unknown as Record<string, any>;
    promoted.candidateDefinition.reviewStatus = 'reviewed';
    expect(() => validateFiveOfficerIntakeCriterionMethodologyDefinitionReviewFR107(promoted as unknown as FiveOfficerIntakeCriterionMethodologyDefinitionReviewFR107V1)).toThrow(FaceAuthorityValidationError);

    const registered = baseline() as unknown as Record<string, any>;
    registered.registry.candidatePersisted = true;
    registered.registry.registryAdmissionAuthorized = true;
    registered.definitionReview.persistentRegistryDefinitionsIssued = 1;
    expect(() => validateFiveOfficerIntakeCriterionMethodologyDefinitionReviewFR107(registered as unknown as FiveOfficerIntakeCriterionMethodologyDefinitionReviewFR107V1)).toThrow(FaceAuthorityValidationError);

    const bound = baseline() as unknown as Record<string, any>;
    bound.execution.metricBindingsIssued = 1;
    bound.execution.thresholdsIssued = 1;
    bound.execution.criterionStatesIssued = 1;
    bound.execution.traditionalSemanticAuthority = true;
    expect(() => validateFiveOfficerIntakeCriterionMethodologyDefinitionReviewFR107(bound as unknown as FiveOfficerIntakeCriterionMethodologyDefinitionReviewFR107V1)).toThrow(FaceAuthorityValidationError);
  });
});
