import { describe, expect, it } from 'vitest';
import { FIVE_OFFICER_CRITERIA_V0 } from './five-officers-six-fus-research-v0.js';
import {
  FIVE_OFFICER_CRITERIA_FR121_WITNESS_QUALIFIED,
  validateFiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindImplementationFR121,
  type FiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindImplementationFR121V1,
} from './five-officers-intake-criterion-definition-witness-qualified-source-rebind-implementation-fr121.js';

function artifact(): FiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindImplementationFR121V1 {
  return {
    schemaVersion: 'fr121-five-officers-intake-criterion-definition-witness-qualified-source-rebind-implementation-v1',
    artifactVersion: '0.1.0',
    authorityState: 'witness_qualified_intake_criterion_definitions_persisted_mapping_dependency_still_open',
    upstream: {
      fr120SchemaVersion: 'fr120-five-officers-intake-criterion-definition-witness-qualified-source-rebind-review-v1',
      fr120AuthorityState: 'intake_criterion_witness_qualified_source_rebind_admitted_implementation_not_executed',
      criterionCount: 5,
      witnessQualifiedSourceRef: 'passage.shenxiang.five_officers.intake.nlc_1925',
      criterionDefinitionSourceRebindAuthorized: true,
      implementationAuthorized: true,
      persistedBefore: false,
      criterionDefinitionsPersistedBefore: 0,
      criterionDefinitionSourceRefsRewrittenBefore: 0,
      metricBindingsIssuedBefore: 0,
      thresholdsIssuedBefore: 0,
      criterionStatesIssuedBefore: 0,
      claimsIssuedBefore: 0,
      traditionalSemanticAuthorityBefore: false,
    },
    persistedState: {
      definitionSetId: 'criteria.shenxiang.five_officers.fr121_witness_qualified',
      derivedDefinitionSetPersisted: true,
      historicalDefinitionSetRetained: true,
      totalCriterionCountPreserved: true,
      intakeCriterionCount: 5,
      intakeCriterionIds: ['criterion.intake.square_broad','criterion.intake.lips_substantial','criterion.intake.corners_arched','criterion.intake.open_close_relation','criterion.intake.red_lip_color'],
      everyPersistedIntakeCriterionUsesWitnessQualifiedPassageOnly: true,
      uniquePersistedIntakeSourceRefs: ['passage.shenxiang.five_officers.intake.nlc_1925'],
      historicalIntakeDefinitionsRemainHistorical: true,
      fieldParityExceptSourceRefs: true,
      criterionOrderPreserved: true,
      nonIntakeDefinitionsUnchanged: true,
      sourceConceptsPreserved: true,
      modalitiesPreserved: true,
      staticV1EligibilityPreserved: true,
      requiredForTraditionalFormationPreserved: true,
      operationalizationNotesPreserved: true,
      sourcePassageResolves: true,
      sourcePassageVerificationStatus: 'scan_checked',
      sourcePassageWitnessId: 'witness.shenxiang_quanbian.nlc_1925',
      successorMethodologyRef: 'method.shenxiang.five_officers.intake_criteria@0.2.0',
      successorMethodologyUsesSameWitnessQualifiedSource: true,
      semanticIdentityEquivalenceAsserted: false,
    },
    execution: {
      criterionDefinitionSetsPersisted: 1,
      criterionDefinitionsPersisted: 5,
      criterionDefinitionSourceRefsRewritten: 5,
      methodologyDefinitionsPersisted: 0,
      methodologySourceRefsRewritten: 0,
      methodologyPackMutations: 0,
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
      derivedCriterionPersistenceMeansHistoricalMutation: false,
      criterionSourceRebindMeansSemanticIdentityEquivalence: false,
      criterionSourceRebindMeansFullMethodologyRewrite: false,
      criterionSourceRebindMeansMethodologyPackMutation: false,
      criterionSourceRebindMeansMetricBinding: false,
      criterionSourceRebindMeansThreshold: false,
      criterionSourceRebindMeansCriterionState: false,
      criterionSourceRebindMeansMethodologyExecution: false,
      criterionSourceRebindMeansTraditionalFormation: false,
      criterionSourceRebindMeansTraditionalSemantics: false,
      criterionSourceRebindMeansOfficerMappingDependencyRemoved: false,
    },
    recommendedNextFrontier: 'intake_officer_mapping_dependency_post_rebind_review',
    remainingBlockers: ['intake_officer_mapping_dependency_not_re_reviewed','intake_metric_to_source_concept_mapping_not_authorized','intake_calibration_and_thresholds_not_authorized','fr64_methodology_execution_and_claim_gates_remain'],
    prohibitedShortcuts: ['derived_criterion_persistence_to_historical_mutation','criterion_source_rebind_to_semantic_identity_equivalence','criterion_source_rebind_to_full_methodology_rewrite','criterion_source_rebind_to_methodology_pack_mutation','criterion_source_rebind_to_metric_binding','criterion_source_rebind_to_numeric_threshold','criterion_source_rebind_to_criterion_state','criterion_source_rebind_to_methodology_execution','criterion_source_rebind_to_traditional_formation','criterion_source_rebind_to_traditional_semantics','criterion_source_rebind_to_mapping_dependency_removal'],
  };
}

describe('FR121 intake criterion witness-qualified source rebind implementation', () => {
  it('persists a derived full criterion set while retaining the historical set', () => {
    expect(FIVE_OFFICER_CRITERIA_FR121_WITNESS_QUALIFIED).toHaveLength(FIVE_OFFICER_CRITERIA_V0.length);
    const historicalIntake = FIVE_OFFICER_CRITERIA_V0.filter((criterion) => criterion.officerKey === 'intake');
    const persistedIntake = FIVE_OFFICER_CRITERIA_FR121_WITNESS_QUALIFIED.filter((criterion) => criterion.officerKey === 'intake');
    expect(historicalIntake).toHaveLength(5);
    expect(persistedIntake).toHaveLength(5);
    expect(historicalIntake.every((criterion) => criterion.sourceRefs[0] === 'passage.shenxiang.five_officers.intake')).toBe(true);
    expect(persistedIntake.every((criterion) => criterion.sourceRefs[0] === 'passage.shenxiang.five_officers.intake.nlc_1925')).toBe(true);
  });

  it('records exactly five criterion definition sourceRef rewrites', () => {
    const value = artifact();
    expect(validateFiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindImplementationFR121(value)).toBe(value);
    expect(value.execution.criterionDefinitionSetsPersisted).toBe(1);
    expect(value.execution.criterionDefinitionsPersisted).toBe(5);
    expect(value.execution.criterionDefinitionSourceRefsRewritten).toBe(5);
    expect(value.persistedState.fieldParityExceptSourceRefs).toBe(true);
    expect(value.persistedState.nonIntakeDefinitionsUnchanged).toBe(true);
  });

  it('keeps mapping, metrics, thresholds, execution, and traditional semantics closed', () => {
    const value = artifact();
    expect(value.authorityBoundary.criterionSourceRebindMeansOfficerMappingDependencyRemoved).toBe(false);
    expect(value.execution.methodologyExecutionIssued).toBe(false);
    expect(value.execution.metricBindingsIssued).toBe(0);
    expect(value.execution.thresholdsIssued).toBe(0);
    expect(value.execution.criterionStatesIssued).toBe(0);
    expect(value.execution.claimsIssued).toBe(0);
    expect(value.execution.traditionalSemanticAuthority).toBe(false);
  });
});
