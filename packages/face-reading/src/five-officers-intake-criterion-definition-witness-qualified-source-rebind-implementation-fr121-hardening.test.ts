import { describe, expect, it } from 'vitest';
import {
  validateFiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindImplementationFR121,
  type FiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindImplementationFR121V1,
} from './five-officers-intake-criterion-definition-witness-qualified-source-rebind-implementation-fr121.js';
import { FaceAuthorityValidationError } from './validation.js';

function base(): FiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindImplementationFR121V1 {
  return {
    schemaVersion: 'fr121-five-officers-intake-criterion-definition-witness-qualified-source-rebind-implementation-v1', artifactVersion: '0.1.0', authorityState: 'witness_qualified_intake_criterion_definitions_persisted_mapping_dependency_still_open',
    upstream: { fr120SchemaVersion: 'fr120-five-officers-intake-criterion-definition-witness-qualified-source-rebind-review-v1', fr120AuthorityState: 'intake_criterion_witness_qualified_source_rebind_admitted_implementation_not_executed', criterionCount: 5, witnessQualifiedSourceRef: 'passage.shenxiang.five_officers.intake.nlc_1925', criterionDefinitionSourceRebindAuthorized: true, implementationAuthorized: true, persistedBefore: false, criterionDefinitionsPersistedBefore: 0, criterionDefinitionSourceRefsRewrittenBefore: 0, metricBindingsIssuedBefore: 0, thresholdsIssuedBefore: 0, criterionStatesIssuedBefore: 0, claimsIssuedBefore: 0, traditionalSemanticAuthorityBefore: false },
    persistedState: { definitionSetId: 'criteria.shenxiang.five_officers.fr121_witness_qualified', derivedDefinitionSetPersisted: true, historicalDefinitionSetRetained: true, totalCriterionCountPreserved: true, intakeCriterionCount: 5, intakeCriterionIds: ['criterion.intake.square_broad','criterion.intake.lips_substantial','criterion.intake.corners_arched','criterion.intake.open_close_relation','criterion.intake.red_lip_color'], everyPersistedIntakeCriterionUsesWitnessQualifiedPassageOnly: true, uniquePersistedIntakeSourceRefs: ['passage.shenxiang.five_officers.intake.nlc_1925'], historicalIntakeDefinitionsRemainHistorical: true, fieldParityExceptSourceRefs: true, criterionOrderPreserved: true, nonIntakeDefinitionsUnchanged: true, sourceConceptsPreserved: true, modalitiesPreserved: true, staticV1EligibilityPreserved: true, requiredForTraditionalFormationPreserved: true, operationalizationNotesPreserved: true, sourcePassageResolves: true, sourcePassageVerificationStatus: 'scan_checked', sourcePassageWitnessId: 'witness.shenxiang_quanbian.nlc_1925', successorMethodologyRef: 'method.shenxiang.five_officers.intake_criteria@0.2.0', successorMethodologyUsesSameWitnessQualifiedSource: true, semanticIdentityEquivalenceAsserted: false },
    execution: { criterionDefinitionSetsPersisted: 1, criterionDefinitionsPersisted: 5, criterionDefinitionSourceRefsRewritten: 5, methodologyDefinitionsPersisted: 0, methodologySourceRefsRewritten: 0, methodologyPackMutations: 0, methodologyExecutionIssued: false, methodologyProductionPromotionAuthorized: false, metricBindingsIssued: 0, thresholdsIssued: 0, morphologyProduced: false, criterionStatesIssued: 0, claimsIssued: 0, traditionalFormationAuthorized: false, traditionalSemanticAuthority: false },
    authorityBoundary: { derivedCriterionPersistenceMeansHistoricalMutation: false, criterionSourceRebindMeansSemanticIdentityEquivalence: false, criterionSourceRebindMeansFullMethodologyRewrite: false, criterionSourceRebindMeansMethodologyPackMutation: false, criterionSourceRebindMeansMetricBinding: false, criterionSourceRebindMeansThreshold: false, criterionSourceRebindMeansCriterionState: false, criterionSourceRebindMeansMethodologyExecution: false, criterionSourceRebindMeansTraditionalFormation: false, criterionSourceRebindMeansTraditionalSemantics: false, criterionSourceRebindMeansOfficerMappingDependencyRemoved: false },
    recommendedNextFrontier: 'intake_officer_mapping_dependency_post_rebind_review',
    remainingBlockers: ['intake_officer_mapping_dependency_not_re_reviewed','intake_metric_to_source_concept_mapping_not_authorized','intake_calibration_and_thresholds_not_authorized','fr64_methodology_execution_and_claim_gates_remain'],
    prohibitedShortcuts: ['derived_criterion_persistence_to_historical_mutation','criterion_source_rebind_to_semantic_identity_equivalence','criterion_source_rebind_to_full_methodology_rewrite','criterion_source_rebind_to_methodology_pack_mutation','criterion_source_rebind_to_metric_binding','criterion_source_rebind_to_numeric_threshold','criterion_source_rebind_to_criterion_state','criterion_source_rebind_to_methodology_execution','criterion_source_rebind_to_traditional_formation','criterion_source_rebind_to_traditional_semantics','criterion_source_rebind_to_mapping_dependency_removal'],
  };
}

describe('FR121 criterion source rebind implementation hardening', () => {
  it('rejects historical mutation or fake persistence cardinality', () => {
    const value = base();
    const drift = {
      ...value,
      persistedState: { ...value.persistedState, historicalDefinitionSetRetained: false, historicalIntakeDefinitionsRemainHistorical: false },
      execution: { ...value.execution, criterionDefinitionsPersisted: 4, criterionDefinitionSourceRefsRewritten: 4 },
    } as unknown as FiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindImplementationFR121V1;
    expect(() => validateFiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindImplementationFR121(drift)).toThrow(FaceAuthorityValidationError);
  });

  it('rejects semantic or non-intake drift hidden behind persistence', () => {
    const value = base();
    const drift = {
      ...value,
      persistedState: { ...value.persistedState, fieldParityExceptSourceRefs: false, nonIntakeDefinitionsUnchanged: false, semanticIdentityEquivalenceAsserted: true },
    } as unknown as FiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindImplementationFR121V1;
    expect(() => validateFiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindImplementationFR121(drift)).toThrow(FaceAuthorityValidationError);
  });

  it('rejects metric, threshold, execution, claim, or traditional-semantic promotion', () => {
    const value = base();
    const drift = {
      ...value,
      execution: { ...value.execution, methodologyExecutionIssued: true, metricBindingsIssued: 1, thresholdsIssued: 1, criterionStatesIssued: 1, claimsIssued: 1, traditionalSemanticAuthority: true },
    } as unknown as FiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindImplementationFR121V1;
    expect(() => validateFiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindImplementationFR121(drift)).toThrow(FaceAuthorityValidationError);
  });

  it('rejects treating the criterion rebind as mapping-dependency resolution', () => {
    const value = base();
    const drift = {
      ...value,
      authorityBoundary: { ...value.authorityBoundary, criterionSourceRebindMeansOfficerMappingDependencyRemoved: true },
    } as unknown as FiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindImplementationFR121V1;
    expect(() => validateFiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindImplementationFR121(drift)).toThrow(FaceAuthorityValidationError);
  });
});
