import { describe, expect, it } from 'vitest';
import {
  FR118_INTAKE_CRITERION_METHODOLOGY_WITNESS_QUALIFIED_SUCCESSOR,
  validateFiveOfficerIntakeCriterionMethodologySourceRebindPostPersistenceReviewFR118,
  type FiveOfficerIntakeCriterionMethodologySourceRebindPostPersistenceReviewFR118V1,
} from './five-officers-intake-criterion-methodology-source-rebind-post-persistence-review-fr118.js';

function artifact(): FiveOfficerIntakeCriterionMethodologySourceRebindPostPersistenceReviewFR118V1 {
  return {
    schemaVersion: 'fr118-five-officers-intake-criterion-methodology-source-rebind-post-persistence-review-v1',
    artifactVersion: '0.1.0',
    authorityState: 'witness_qualified_intake_criterion_methodology_successor_admitted_registry_persistence_not_executed',
    upstream: {
      fr108SchemaVersion: 'fr108-five-officers-intake-criterion-methodology-registry-admission-review-v1',
      fr108AuthorityState: 'intake_criterion_methodology_registry_admission_blocked_scan_checked_passage_authority_not_persisted',
      priorCandidateMethodologyRef: 'method.shenxiang.five_officers.intake_criteria@0.1.0',
      priorCandidateSourceRef: 'passage.shenxiang.five_officers.intake',
      priorRegistryAdmissionAuthorized: false,
      priorGovernedScanCheckedAuthorityPersistedInFaceRegistry: false,
      priorCandidateSourceRefRewriteAuthorized: false,
      fr117SchemaVersion: 'fr117-five-officers-intake-witness-qualified-page-verification-reissue-persistence-implementation-v1',
      fr117AuthorityState: 'witness_qualified_reissue_relation_record_and_face_passage_persisted_downstream_authority_still_closed',
      witnessQualifiedPassagePersisted: true,
      derivedFaceRegistryPersisted: true,
      historicalPassageRetained: true,
      methodologySourceRefsChangedBefore: false,
      metricBindingsIssuedBefore: 0,
      thresholdsIssuedBefore: 0,
      criterionStatesIssuedBefore: 0,
      claimsIssuedBefore: 0,
      traditionalSemanticAuthorityBefore: false,
    },
    successorCandidate: FR118_INTAKE_CRITERION_METHODOLOGY_WITNESS_QUALIFIED_SUCCESSOR,
    rebindReview: {
      priorCandidateRetainedAsHistoricalReviewArtifact: true,
      priorCandidateMutated: false,
      successorVersionRequiredForProvenanceChange: true,
      successorMethodologyRef: 'method.shenxiang.five_officers.intake_criteria@0.2.0',
      sourceRefChangesExactlyOne: true,
      historicalSourceRefRemovedFromSuccessor: true,
      witnessQualifiedSourceRefAddedToSuccessor: true,
      witnessQualifiedSourceRefResolves: true,
      witnessQualifiedSourceVerificationStatus: 'scan_checked',
      witnessQualifiedSourceWitnessId: 'witness.shenxiang_quanbian.nlc_1925',
      historicalPassageStillRegistered: true,
      historicalPassageStillCtext: true,
      fullFiveOfficersMethodologyUnchanged: true,
      fullFiveOfficersMethodologyRef: 'method.shenxiang.five_officers@0.1.0',
      intakeOfficerMappingDependencyRetained: true,
      historicalCriterionDefinitionSourceRefsRetained: true,
      criterionDefinitionSourceRefRewriteAuthorized: false,
      successorDefinitionStructurallyValid: true,
      provenancePreservingRegistryAppendProbePassed: true,
      successorSourceRebindAuthorized: true,
      successorDefinitionAdmitted: true,
      successorRegistryAdmissionImplementationAuthorized: true,
      successorPersisted: false,
    },
    execution: {
      methodologySourceRefsRewritten: 0,
      methodologyDefinitionsPersisted: 0,
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
      sourceRebindReviewMeansExistingCandidateMutation: false,
      successorAdmissionMeansRegistryPersistenceAlreadyOccurred: false,
      successorAdmissionMeansFullMethodologyReplacement: false,
      successorAdmissionMeansHistoricalPassageReplacement: false,
      successorAdmissionMeansCriterionDefinitionRewrite: false,
      scanCheckedSourceMeansMetricBinding: false,
      scanCheckedSourceMeansNumericThreshold: false,
      methodologyRegistryAdmissionMeansExecution: false,
      methodologyRegistryAdmissionMeansCriterionState: false,
      methodologyRegistryAdmissionMeansClaim: false,
      methodologyRegistryAdmissionMeansTraditionalSemantics: false,
    },
    recommendedNextFrontier: 'intake_criterion_methodology_witness_qualified_registry_admission_implementation',
    remainingBlockers: [
      'witness_qualified_intake_criterion_methodology_successor_not_yet_persisted',
      'intake_criterion_definition_source_refs_still_historical',
      'intake_officer_mapping_dependency_not_re_reviewed',
      'intake_metric_to_source_concept_mapping_not_authorized',
      'intake_calibration_and_thresholds_not_authorized',
      'fr64_methodology_execution_and_claim_gates_remain',
    ],
    prohibitedShortcuts: [
      'source_rebind_review_to_existing_candidate_mutation',
      'successor_admission_to_registry_persistence_already_occurred',
      'successor_admission_to_full_methodology_replacement',
      'successor_admission_to_historical_passage_replacement',
      'successor_admission_to_criterion_definition_source_ref_rewrite',
      'scan_checked_source_to_metric_binding',
      'scan_checked_source_to_numeric_threshold',
      'methodology_registry_admission_to_execution',
      'methodology_registry_admission_to_criterion_state',
      'methodology_registry_admission_to_claim',
      'methodology_registry_admission_to_traditional_semantics',
    ],
  };
}

describe('FR118 post-persistence intake criterion methodology source rebind review', () => {
  it('defines a versioned successor bound only to the persisted witness-qualified passage', () => {
    expect(FR118_INTAKE_CRITERION_METHODOLOGY_WITNESS_QUALIFIED_SUCCESSOR.methodologyId).toBe('method.shenxiang.five_officers.intake_criteria');
    expect(FR118_INTAKE_CRITERION_METHODOLOGY_WITNESS_QUALIFIED_SUCCESSOR.version).toBe('0.2.0');
    expect(FR118_INTAKE_CRITERION_METHODOLOGY_WITNESS_QUALIFIED_SUCCESSOR.sourceRefs).toEqual([
      'passage.shenxiang.five_officers.intake.nlc_1925',
    ]);
    expect(FR118_INTAKE_CRITERION_METHODOLOGY_WITNESS_QUALIFIED_SUCCESSOR.reviewStatus).toBe('research');
  });

  it('authorizes only the successor registry-admission implementation frontier', () => {
    const value = artifact();
    expect(validateFiveOfficerIntakeCriterionMethodologySourceRebindPostPersistenceReviewFR118(value)).toBe(value);
    expect(value.rebindReview.successorSourceRebindAuthorized).toBe(true);
    expect(value.rebindReview.successorRegistryAdmissionImplementationAuthorized).toBe(true);
    expect(value.rebindReview.successorPersisted).toBe(false);
    expect(value.execution.methodologyDefinitionsPersisted).toBe(0);
    expect(value.execution.methodologySourceRefsRewritten).toBe(0);
  });

  it('keeps criterion definitions and all downstream semantic authority closed', () => {
    const value = artifact();
    expect(value.rebindReview.historicalCriterionDefinitionSourceRefsRetained).toBe(true);
    expect(value.rebindReview.criterionDefinitionSourceRefRewriteAuthorized).toBe(false);
    expect(value.execution.criterionDefinitionSourceRefsRewritten).toBe(0);
    expect(value.execution.metricBindingsIssued).toBe(0);
    expect(value.execution.thresholdsIssued).toBe(0);
    expect(value.execution.criterionStatesIssued).toBe(0);
    expect(value.execution.claimsIssued).toBe(0);
    expect(value.execution.traditionalSemanticAuthority).toBe(false);
  });
});
