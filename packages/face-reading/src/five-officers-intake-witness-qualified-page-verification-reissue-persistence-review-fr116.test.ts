import { describe, expect, it } from 'vitest';
import {
  validateFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceReviewFR116,
  type FiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceReviewFR116V1,
} from './five-officers-intake-witness-qualified-page-verification-reissue-persistence-review-fr116.js';

function artifact(): FiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceReviewFR116V1 {
  return {
    schemaVersion: 'fr116-five-officers-intake-witness-qualified-page-verification-reissue-persistence-review-v1',
    artifactVersion: '0.1.0',
    authorityState: 'bounded_governed_extension_and_face_append_persistence_authorized_execution_not_performed',
    upstream: {
      fr115SchemaVersion: 'fr115-five-officers-intake-witness-qualified-page-verification-reissue-post-lineage-admission-review-v1',
      fr115AuthorityState: 'witness_qualified_page_verification_reissue_admitted_core_lineage_available_persistence_not_executed',
      verificationReissueAdmissionAuthorized: true,
      persistenceReviewAuthorized: true,
      targetRelationPersistenceAuthorizedBefore: false,
      targetVerificationRecordPersistenceAuthorizedBefore: false,
      targetPassagePersistenceAuthorizedBefore: false,
      verificationRelationsPersistedBefore: 0,
      verificationRecordsPersistedBefore: 0,
      passagesPersistedBefore: 0,
      traditionalSemanticAuthorityBefore: false,
    },
    placementReview: {
      directSourcePlacement: 'separate_governed_registry_extension',
      facePassagePlacement: 'witness_qualified_append_to_derived_face_registry',
      baseDirectSourceRegistryMutationAuthorized: false,
      historicalFacePassageReplacementAuthorized: false,
      historicalFacePassageRetained: true,
      nlcWitnessAlreadyRegistered: true,
      directSourceExtensionProbeValidationPassed: true,
      faceRegistryAppendProbeValidationPassed: true,
      childMaterializationPassed: true,
      childPassageId: 'passage.shenxiang.five_officers.intake.nlc_1925',
      childWitnessId: 'witness.shenxiang_quanbian.nlc_1925',
      childVerificationStatus: 'scan_checked',
      exactEvidenceReuseRequired: true,
      sameCheckingEventRequired: true,
      independentVerificationDelta: 0,
      semanticIdentityEquivalenceAsserted: false,
    },
    persistenceDecision: {
      governedDirectSourceExtensionPersistenceAuthorized: true,
      targetRelationPersistenceAuthorized: true,
      targetVerificationRecordPersistenceAuthorized: true,
      witnessQualifiedFacePassagePersistenceAuthorized: true,
      persistenceExecutionAuthorized: true,
      baseDirectSourceRegistryMutationAuthorized: false,
      historicalFacePassageReplacementAuthorized: false,
      methodologySourceRefRewriteAuthorized: false,
      methodologyDefinitionPersistenceAuthorized: false,
      methodologyExecutionAuthorized: false,
      metricBindingAuthorized: false,
      thresholdAuthorized: false,
      criterionStateAuthorized: false,
      claimAuthorized: false,
      traditionalSemanticAuthority: false,
    },
    execution: {
      directSourceRegistriesPersisted: 0,
      verificationRelationsPersisted: 0,
      verificationRecordsReissued: 0,
      verificationRecordsPersisted: 0,
      passagesPersisted: 0,
      faceRegistriesPersisted: 0,
      methodologySourceRefsRewritten: 0,
      methodologyDefinitionsPersisted: 0,
      methodologyExecutionIssued: false,
      metricBindingsIssued: 0,
      thresholdsIssued: 0,
      criterionStatesIssued: 0,
      claimsIssued: 0,
      traditionalSemanticAuthority: false,
    },
    authorityBoundary: {
      persistenceAuthorityMeansExecutionAlreadyOccurred: false,
      governedExtensionPersistenceMeansBaseRegistryMutation: false,
      faceAppendPersistenceMeansHistoricalReplacement: false,
      relationMeansNewCheckingEvent: false,
      relationMayIncreaseIndependentVerificationCount: false,
      exactTextMatchMeansSemanticIdentityEquivalence: false,
      persistenceMeansMethodologySourceRefRewrite: false,
      persistenceMeansMetricBinding: false,
      persistenceMeansThreshold: false,
      persistenceMeansTraditionalSemantics: false,
    },
    recommendedNextFrontier: 'intake_witness_qualified_page_verification_reissue_persistence_implementation',
    remainingBlockers: [
      'authorized_reissue_relation_record_and_passage_not_yet_persisted',
      'intake_criterion_methodology_source_ref_rewrite_not_authorized',
      'intake_criterion_methodology_not_registered',
      'intake_officer_mapping_dependency_not_re_reviewed',
      'intake_metric_to_source_concept_mapping_not_authorized',
      'intake_calibration_and_thresholds_not_authorized',
      'fr64_methodology_execution_and_claim_gates_remain',
    ],
    prohibitedShortcuts: [
      'persistence_authority_to_execution_already_occurred',
      'governed_extension_persistence_to_base_registry_mutation',
      'face_append_persistence_to_historical_replacement',
      'relation_to_new_checking_event',
      'relation_to_independent_verification_increment',
      'exact_text_match_to_semantic_identity_equivalence',
      'persistence_to_methodology_source_ref_rewrite',
      'persistence_to_metric_binding',
      'persistence_to_numeric_threshold',
      'persistence_to_traditional_semantics',
    ],
  };
}

describe('FR116 witness-qualified reissue persistence review', () => {
  it('authorizes only bounded governed-extension and Face append persistence', () => {
    const value = artifact();
    expect(validateFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceReviewFR116(value)).toBe(value);
    expect(value.persistenceDecision.governedDirectSourceExtensionPersistenceAuthorized).toBe(true);
    expect(value.persistenceDecision.targetRelationPersistenceAuthorized).toBe(true);
    expect(value.persistenceDecision.targetVerificationRecordPersistenceAuthorized).toBe(true);
    expect(value.persistenceDecision.witnessQualifiedFacePassagePersistenceAuthorized).toBe(true);
    expect(value.persistenceDecision.baseDirectSourceRegistryMutationAuthorized).toBe(false);
    expect(value.persistenceDecision.historicalFacePassageReplacementAuthorized).toBe(false);
  });

  it('keeps persistence execution and semantic promotion at zero', () => {
    const value = artifact();
    expect(value.execution.directSourceRegistriesPersisted).toBe(0);
    expect(value.execution.verificationRelationsPersisted).toBe(0);
    expect(value.execution.verificationRecordsPersisted).toBe(0);
    expect(value.execution.passagesPersisted).toBe(0);
    expect(value.execution.faceRegistriesPersisted).toBe(0);
    expect(value.execution.metricBindingsIssued).toBe(0);
    expect(value.execution.claimsIssued).toBe(0);
    expect(value.execution.traditionalSemanticAuthority).toBe(false);
  });
});
