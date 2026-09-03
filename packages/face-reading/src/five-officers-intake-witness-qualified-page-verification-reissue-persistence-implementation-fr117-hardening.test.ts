import { describe, expect, it } from 'vitest';
import {
  validateFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceImplementationFR117,
  type FiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceImplementationFR117V1,
} from './five-officers-intake-witness-qualified-page-verification-reissue-persistence-implementation-fr117.js';
import { FaceAuthorityValidationError } from './validation.js';

function base(): FiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceImplementationFR117V1 {
  return {
    schemaVersion: 'fr117-five-officers-intake-witness-qualified-page-verification-reissue-persistence-implementation-v1', artifactVersion: '0.1.0', authorityState: 'witness_qualified_reissue_relation_record_and_face_passage_persisted_downstream_authority_still_closed',
    upstream: { fr116SchemaVersion: 'fr116-five-officers-intake-witness-qualified-page-verification-reissue-persistence-review-v1', fr116AuthorityState: 'bounded_governed_extension_and_face_append_persistence_authorized_execution_not_performed', governedDirectSourceExtensionPersistenceAuthorized: true, targetRelationPersistenceAuthorized: true, targetVerificationRecordPersistenceAuthorized: true, witnessQualifiedFacePassagePersistenceAuthorized: true, persistenceExecutionAuthorized: true, baseDirectSourceRegistryMutationAuthorized: false, historicalFacePassageReplacementAuthorized: false, persistedBefore: false },
    persistedState: { governedDirectSourceRegistryId: 'direct-source-verification.face.fr117_witness_qualified_reissue', originalVerificationRef: 'verification.shenxiang_nlc_1925.intake@0.1.0', childVerificationRef: 'verification.shenxiang_nlc_1925.intake.witness_qualified@0.1.0', relationRef: 'verification-lineage.shenxiang_nlc_1925.intake.witness_qualified@0.1.0', historicalPassageRef: 'passage.shenxiang.five_officers.intake', witnessQualifiedPassageRef: 'passage.shenxiang.five_officers.intake.nlc_1925', parentVerificationRetained: true, parentVerificationPersistedByThisFrontier: false, childVerificationPersisted: true, relationPersisted: true, witnessQualifiedPassagePersisted: true, derivedFaceRegistryPersisted: true, baseDirectSourceRegistryMutated: false, historicalFacePassageReplaced: false, historicalFacePassageRetained: true, exactEvidenceReusePreserved: true, sameCheckingEventPreserved: true, independentVerificationDelta: 0, semanticIdentityEquivalenceAsserted: false, methodologySourceRefsChanged: false },
    execution: { directSourceRegistriesPersisted: 1, verificationRelationsPersisted: 1, verificationRecordsReissued: 1, verificationRecordsPersisted: 1, passagesPersisted: 1, faceRegistriesPersisted: 1, methodologySourceRefsRewritten: 0, methodologyDefinitionsPersisted: 0, methodologyExecutionIssued: false, metricBindingsIssued: 0, thresholdsIssued: 0, criterionStatesIssued: 0, claimsIssued: 0, traditionalSemanticAuthority: false },
    authorityBoundary: { persistenceMeansBaseRegistryMutation: false, persistenceMeansHistoricalReplacement: false, persistenceMeansNewCheckingEvent: false, persistenceMayIncreaseIndependentVerificationCount: false, exactTextMatchMeansSemanticIdentityEquivalence: false, persistedPassageMeansMethodologySourceRefRebound: false, persistenceMeansMetricBinding: false, persistenceMeansThreshold: false, persistenceMeansCriterionState: false, persistenceMeansClaim: false, persistenceMeansTraditionalSemantics: false },
    recommendedNextFrontier: 'intake_criterion_methodology_source_rebind_post_persistence_review',
    remainingBlockers: ['intake_criterion_methodology_source_ref_rewrite_not_authorized','intake_criterion_methodology_not_registered','intake_officer_mapping_dependency_not_re_reviewed','intake_metric_to_source_concept_mapping_not_authorized','intake_calibration_and_thresholds_not_authorized','fr64_methodology_execution_and_claim_gates_remain'],
    prohibitedShortcuts: ['persistence_to_base_registry_mutation','persistence_to_historical_replacement','persistence_to_new_checking_event','persistence_to_independent_verification_increment','exact_text_match_to_semantic_identity_equivalence','persisted_passage_to_methodology_source_ref_rebind','persistence_to_metric_binding','persistence_to_numeric_threshold','persistence_to_criterion_state','persistence_to_claim','persistence_to_traditional_semantics'],
  };
}

describe('FR117 persistence implementation hardening', () => {
  it('rejects base-registry mutation, historical replacement, or independent-verification inflation', () => {
    const value = base();
    const drift = { ...value, persistedState: { ...value.persistedState, baseDirectSourceRegistryMutated: true, historicalFacePassageReplaced: true, independentVerificationDelta: 1 } } as unknown as FiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceImplementationFR117V1;
    expect(() => validateFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceImplementationFR117(drift)).toThrow(FaceAuthorityValidationError);
  });

  it('rejects fake persistence cardinality', () => {
    const value = base();
    const drift = { ...value, execution: { ...value.execution, directSourceRegistriesPersisted: 2, verificationRelationsPersisted: 2, verificationRecordsPersisted: 2, passagesPersisted: 2, faceRegistriesPersisted: 2 } } as unknown as FiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceImplementationFR117V1;
    expect(() => validateFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceImplementationFR117(drift)).toThrow(FaceAuthorityValidationError);
  });

  it('rejects methodology, metric, threshold, criterion, claim, or traditional-semantic promotion', () => {
    const value = base();
    const drift = { ...value, persistedState: { ...value.persistedState, semanticIdentityEquivalenceAsserted: true, methodologySourceRefsChanged: true }, execution: { ...value.execution, methodologySourceRefsRewritten: 1, methodologyDefinitionsPersisted: 1, methodologyExecutionIssued: true, metricBindingsIssued: 1, thresholdsIssued: 1, criterionStatesIssued: 1, claimsIssued: 1, traditionalSemanticAuthority: true } } as unknown as FiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceImplementationFR117V1;
    expect(() => validateFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceImplementationFR117(drift)).toThrow(FaceAuthorityValidationError);
  });
});
