import { describe, expect, it } from 'vitest';
import {
  validateFiveOfficerIntakeCriterionMethodologyWitnessQualifiedRegistryAdmissionImplementationFR119,
  type FiveOfficerIntakeCriterionMethodologyWitnessQualifiedRegistryAdmissionImplementationFR119V1,
} from './five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-fr119.js';
import { FaceAuthorityValidationError } from './validation.js';

function base(): FiveOfficerIntakeCriterionMethodologyWitnessQualifiedRegistryAdmissionImplementationFR119V1 {
  return {
    schemaVersion: 'fr119-five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-v1',
    artifactVersion: '0.1.0',
    authorityState: 'witness_qualified_intake_criterion_methodology_successor_persisted_downstream_execution_still_closed',
    upstream: {
      fr118SchemaVersion: 'fr118-five-officers-intake-criterion-methodology-source-rebind-post-persistence-review-v1',
      fr118AuthorityState: 'witness_qualified_intake_criterion_methodology_successor_admitted_registry_persistence_not_executed',
      successorMethodologyRef: 'method.shenxiang.five_officers.intake_criteria@0.2.0',
      successorSourceRef: 'passage.shenxiang.five_officers.intake.nlc_1925',
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
    },
    persistedState: {
      registryValidated: true,
      successorMethodologyRef: 'method.shenxiang.five_officers.intake_criteria@0.2.0',
      successorMethodologyId: 'method.shenxiang.five_officers.intake_criteria',
      successorVersion: '0.2.0',
      successorReviewStatus: 'research',
      successorSourceRefs: ['passage.shenxiang.five_officers.intake.nlc_1925'],
      successorSourceResolves: true,
      successorSourceVerificationStatus: 'scan_checked',
      successorSourceWitnessId: 'witness.shenxiang_quanbian.nlc_1925',
      priorCandidatePersisted: false,
      historicalPassageRetained: true,
      witnessQualifiedPassageRetained: true,
      fullFiveOfficersMethodologyRetained: true,
      fullFiveOfficersMethodologyUnchanged: true,
      methodologyPackUnchanged: true,
      historicalCriterionDefinitionsRetained: true,
      historicalCriterionDefinitionSourceRefsRetained: true,
    },
    execution: {
      methodologyRegistryEntriesPersisted: 1,
      methodologyDefinitionsPersisted: 1,
      methodologySourceRefsRewritten: 0,
      methodologyPackMutations: 0,
      methodologyExecutionIssued: false,
      methodologyProductionPromotionAuthorized: false,
      criterionDefinitionSourceRefsRewritten: 0,
      metricBindingsIssued: 0,
      thresholdsIssued: 0,
      morphologyProduced: false,
      criterionStatesIssued: 0,
      claimsIssued: 0,
      traditionalFormationAuthorized: false,
      traditionalSemanticAuthority: false,
    },
    authorityBoundary: {
      successorPersistenceMeansPriorCandidatePersistence: false,
      successorPersistenceMeansFullMethodologyReplacement: false,
      successorPersistenceMeansMethodologyPackMembership: false,
      successorPersistenceMeansHistoricalPassageReplacement: false,
      successorPersistenceMeansCriterionDefinitionRewrite: false,
      researchMethodologyPersistenceMeansExecution: false,
      researchMethodologyPersistenceMeansProductionPromotion: false,
      researchMethodologyPersistenceMeansMetricBinding: false,
      researchMethodologyPersistenceMeansThreshold: false,
      researchMethodologyPersistenceMeansCriterionState: false,
      researchMethodologyPersistenceMeansClaim: false,
      researchMethodologyPersistenceMeansTraditionalSemantics: false,
    },
    recommendedNextFrontier: 'intake_criterion_definition_witness_qualified_source_rebind_review',
    remainingBlockers: [
      'intake_criterion_definition_source_refs_still_historical',
      'intake_officer_mapping_dependency_not_re_reviewed',
      'intake_metric_to_source_concept_mapping_not_authorized',
      'intake_calibration_and_thresholds_not_authorized',
      'fr64_methodology_execution_and_claim_gates_remain',
    ],
    prohibitedShortcuts: [
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
    ],
  };
}

describe('FR119 methodology registry admission implementation hardening', () => {
  it('rejects persistence of the historical v0.1 review candidate', () => {
    const value = base();
    const drift = {
      ...value,
      persistedState: { ...value.persistedState, priorCandidatePersisted: true },
    } as unknown as FiveOfficerIntakeCriterionMethodologyWitnessQualifiedRegistryAdmissionImplementationFR119V1;
    expect(() => validateFiveOfficerIntakeCriterionMethodologyWitnessQualifiedRegistryAdmissionImplementationFR119(drift)).toThrow(FaceAuthorityValidationError);
  });

  it('rejects full methodology, methodology-pack, or criterion-definition mutation', () => {
    const value = base();
    const drift = {
      ...value,
      persistedState: {
        ...value.persistedState,
        fullFiveOfficersMethodologyUnchanged: false,
        methodologyPackUnchanged: false,
        historicalCriterionDefinitionSourceRefsRetained: false,
      },
      execution: {
        ...value.execution,
        methodologySourceRefsRewritten: 1,
        methodologyPackMutations: 1,
        criterionDefinitionSourceRefsRewritten: 5,
      },
    } as unknown as FiveOfficerIntakeCriterionMethodologyWitnessQualifiedRegistryAdmissionImplementationFR119V1;
    expect(() => validateFiveOfficerIntakeCriterionMethodologyWitnessQualifiedRegistryAdmissionImplementationFR119(drift)).toThrow(FaceAuthorityValidationError);
  });

  it('rejects execution, production, metric, threshold, criterion-state, claim, and semantic inflation', () => {
    const value = base();
    const drift = {
      ...value,
      execution: {
        ...value.execution,
        methodologyExecutionIssued: true,
        methodologyProductionPromotionAuthorized: true,
        metricBindingsIssued: 1,
        thresholdsIssued: 1,
        morphologyProduced: true,
        criterionStatesIssued: 1,
        claimsIssued: 1,
        traditionalFormationAuthorized: true,
        traditionalSemanticAuthority: true,
      },
    } as unknown as FiveOfficerIntakeCriterionMethodologyWitnessQualifiedRegistryAdmissionImplementationFR119V1;
    expect(() => validateFiveOfficerIntakeCriterionMethodologyWitnessQualifiedRegistryAdmissionImplementationFR119(drift)).toThrow(FaceAuthorityValidationError);
  });
});
