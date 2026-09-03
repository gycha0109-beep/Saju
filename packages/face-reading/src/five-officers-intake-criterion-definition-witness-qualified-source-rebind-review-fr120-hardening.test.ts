import { describe, expect, it } from 'vitest';
import {
  FR120_INTAKE_CRITERION_WITNESS_QUALIFIED_REBIND_CANDIDATES,
  validateFiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindReviewFR120,
  type FiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindReviewFR120V1,
} from './five-officers-intake-criterion-definition-witness-qualified-source-rebind-review-fr120.js';
import { FaceAuthorityValidationError } from './validation.js';

function base(): FiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindReviewFR120V1 {
  return {
    schemaVersion: 'fr120-five-officers-intake-criterion-definition-witness-qualified-source-rebind-review-v1', artifactVersion: '0.1.0', authorityState: 'intake_criterion_witness_qualified_source_rebind_admitted_implementation_not_executed',
    upstream: { fr119SchemaVersion: 'fr119-five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-v1', fr119AuthorityState: 'witness_qualified_intake_criterion_methodology_successor_persisted_downstream_execution_still_closed', successorMethodologyRef: 'method.shenxiang.five_officers.intake_criteria@0.2.0', successorSourceRef: 'passage.shenxiang.five_officers.intake.nlc_1925', successorPersisted: true, successorReviewStatus: 'research', historicalCriterionDefinitionSourceRefsRetainedBefore: true, criterionDefinitionSourceRefsRewrittenBefore: 0, metricBindingsIssuedBefore: 0, thresholdsIssuedBefore: 0, criterionStatesIssuedBefore: 0, claimsIssuedBefore: 0, traditionalSemanticAuthorityBefore: false },
    sourceAuthority: { registryValidated: true, historicalPassageRef: 'passage.shenxiang.five_officers.intake', witnessQualifiedPassageRef: 'passage.shenxiang.five_officers.intake.nlc_1925', historicalPassageVerificationStatus: 'unverified_ocr', witnessQualifiedPassageVerificationStatus: 'scan_checked', witnessQualifiedPassageWitnessId: 'witness.shenxiang_quanbian.nlc_1925', originalTextExactMatch: true, everyCriterionSourceConceptPresentInHistoricalPassage: true, everyCriterionSourceConceptPresentInWitnessQualifiedPassage: true, successorMethodologyUsesWitnessQualifiedPassage: true, semanticIdentityEquivalenceAsserted: false },
    criterionSetBefore: { criterionCount: 5, criterionIds: ['criterion.intake.square_broad','criterion.intake.lips_substantial','criterion.intake.corners_arched','criterion.intake.open_close_relation','criterion.intake.red_lip_color'], everyCriterionUsesHistoricalPassageOnly: true, uniqueSourceRefs: ['passage.shenxiang.five_officers.intake'] },
    candidateDefinitions: FR120_INTAKE_CRITERION_WITNESS_QUALIFIED_REBIND_CANDIDATES,
    rebindReview: { candidateCriterionCount: 5, candidateCriterionIds: ['criterion.intake.square_broad','criterion.intake.lips_substantial','criterion.intake.corners_arched','criterion.intake.open_close_relation','criterion.intake.red_lip_color'], everyCandidateUsesWitnessQualifiedPassageOnly: true, uniqueCandidateSourceRefs: ['passage.shenxiang.five_officers.intake.nlc_1925'], fieldParityExceptSourceRefs: true, criterionOrderPreserved: true, sourceConceptsPreserved: true, modalitiesPreserved: true, staticV1EligibilityPreserved: true, requiredForTraditionalFormationPreserved: true, operationalizationNotesPreserved: true, criterionDefinitionSourceRebindAuthorized: true, implementationAuthorized: true, persisted: false },
    execution: { criterionDefinitionsPersisted: 0, criterionDefinitionSourceRefsRewritten: 0, methodologyDefinitionsPersisted: 0, methodologySourceRefsRewritten: 0, methodologyPackMutations: 0, methodologyExecutionIssued: false, methodologyProductionPromotionAuthorized: false, metricBindingsIssued: 0, thresholdsIssued: 0, morphologyProduced: false, criterionStatesIssued: 0, claimsIssued: 0, traditionalFormationAuthorized: false, traditionalSemanticAuthority: false },
    authorityBoundary: { reviewMeansCriterionDefinitionsRewritten: false, provenanceRebindMeansSemanticIdentityEquivalence: false, provenanceRebindMeansMetricBinding: false, provenanceRebindMeansThreshold: false, provenanceRebindMeansCriterionState: false, provenanceRebindMeansMethodologyExecution: false, provenanceRebindMeansTraditionalFormation: false, provenanceRebindMeansTraditionalSemantics: false, criterionRebindMeansOfficerMappingDependencyRemoved: false },
    recommendedNextFrontier: 'intake_criterion_definition_witness_qualified_source_rebind_implementation',
    remainingBlockers: ['intake_criterion_definition_source_rebind_not_executed','intake_officer_mapping_dependency_not_re_reviewed','intake_metric_to_source_concept_mapping_not_authorized','intake_calibration_and_thresholds_not_authorized','fr64_methodology_execution_and_claim_gates_remain'],
    prohibitedShortcuts: ['source_rebind_review_to_criterion_definition_rewrite','provenance_rebind_to_semantic_identity_equivalence','provenance_rebind_to_metric_binding','provenance_rebind_to_numeric_threshold','provenance_rebind_to_criterion_state','provenance_rebind_to_methodology_execution','provenance_rebind_to_traditional_formation','provenance_rebind_to_traditional_semantics','criterion_rebind_to_mapping_dependency_removal'],
  };
}

describe('FR120 criterion source rebind hardening', () => {
  it('rejects candidate semantic drift disguised as a source rebind', () => {
    const value = base();
    const first = value.candidateDefinitions[0];
    if (first === undefined) throw new Error('missing FR120 candidate');
    const drift = {
      ...value,
      candidateDefinitions: [{ ...first, sourceConcept: '大' }, ...value.candidateDefinitions.slice(1)],
    } as unknown as FiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindReviewFR120V1;
    expect(() => validateFiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindReviewFR120(drift)).toThrow(FaceAuthorityValidationError);
  });

  it('rejects rewrite execution smuggled into the review frontier', () => {
    const value = base();
    const drift = {
      ...value,
      rebindReview: { ...value.rebindReview, persisted: true },
      execution: { ...value.execution, criterionDefinitionsPersisted: 5, criterionDefinitionSourceRefsRewritten: 5 },
    } as unknown as FiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindReviewFR120V1;
    expect(() => validateFiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindReviewFR120(drift)).toThrow(FaceAuthorityValidationError);
  });

  it('rejects provenance rebind inflation into semantic, metric, threshold, or claim authority', () => {
    const value = base();
    const drift = {
      ...value,
      sourceAuthority: { ...value.sourceAuthority, semanticIdentityEquivalenceAsserted: true },
      execution: { ...value.execution, methodologyExecutionIssued: true, metricBindingsIssued: 1, thresholdsIssued: 1, criterionStatesIssued: 1, claimsIssued: 1, traditionalSemanticAuthority: true },
    } as unknown as FiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindReviewFR120V1;
    expect(() => validateFiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindReviewFR120(drift)).toThrow(FaceAuthorityValidationError);
  });

  it('rejects removal of the historical officer mapping dependency', () => {
    const value = base();
    const drift = {
      ...value,
      authorityBoundary: { ...value.authorityBoundary, criterionRebindMeansOfficerMappingDependencyRemoved: true },
    } as unknown as FiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindReviewFR120V1;
    expect(() => validateFiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindReviewFR120(drift)).toThrow(FaceAuthorityValidationError);
  });
});
