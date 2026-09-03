import { describe, expect, it } from 'vitest';
import {
  validateFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePostLineageAdmissionReviewFR115,
  type FiveOfficerIntakeWitnessQualifiedPageVerificationReissuePostLineageAdmissionReviewFR115V1,
} from './five-officers-intake-witness-qualified-page-verification-reissue-post-lineage-admission-review-fr115.js';

function artifact(): FiveOfficerIntakeWitnessQualifiedPageVerificationReissuePostLineageAdmissionReviewFR115V1 {
  return {
    schemaVersion: 'fr115-five-officers-intake-witness-qualified-page-verification-reissue-post-lineage-admission-review-v1',
    artifactVersion: '0.1.0',
    authorityState: 'witness_qualified_page_verification_reissue_admitted_core_lineage_available_persistence_not_executed',
    upstream: {
      fr114SchemaVersion: 'fr114-direct-source-verification-reissue-lineage-extension-implementation-v1',
      fr114AuthorityState: 'core_registry_relation_extension_implemented_reissue_still_not_authorized',
      coreRelationExtensionImplemented: true,
      coreRelationValidatorImplemented: true,
      targetRelationPersistedBefore: false,
      targetReissueRecordPersistedBefore: false,
      verificationRelationsPersistedBefore: 0,
      verificationRecordsPersistedBefore: 0,
      passagesPersistedBefore: 0,
      traditionalSemanticAuthorityBefore: false,
    },
    target: {
      originalVerificationRef: 'verification.shenxiang_nlc_1925.intake@0.1.0',
      proposedVerificationRef: 'verification.shenxiang_nlc_1925.intake.witness_qualified@0.1.0',
      originalPassageId: 'passage.shenxiang.five_officers.intake',
      proposedPassageId: 'passage.shenxiang.five_officers.intake.nlc_1925',
      relationId: 'verification-lineage.shenxiang_nlc_1925.intake.witness_qualified',
      relationKind: 'non_independent_identity_reissue',
    },
    admissionReview: {
      priorMissingLineageBlockerResolved: true,
      machineReadableCoreRelationAvailable: true,
      targetEphemeralRegistryValidationPassed: true,
      originalVerificationRetained: true,
      proposedVerificationDistinct: true,
      proposedPassageDistinct: true,
      sameCandidate: true,
      sameWitness: true,
      sameChapterAndPage: true,
      sameOriginalText: true,
      sameVisualEvidenceRefs: true,
      sameCheckerRefs: true,
      sameVerificationState: true,
      exactEvidenceReuseEnforced: true,
      sameCheckingEventEnforced: true,
      independentVerificationDelta: 0,
      childMayCountAsIndependentVerification: false,
      semanticIdentityEquivalenceAsserted: false,
      verificationReissueAdmissionAuthorized: true,
      persistenceReviewAuthorized: true,
      targetRelationPersistenceAuthorized: false,
      targetVerificationRecordPersistenceAuthorized: false,
      targetPassagePersistenceAuthorized: false,
    },
    execution: {
      verificationRelationsPersisted: 0,
      verificationRecordsReissued: 0,
      verificationRecordsPersisted: 0,
      passagesPersisted: 0,
      faceRegistryChanged: false,
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
      reissueAdmissionMeansPersistenceAuthority: false,
      persistenceReviewAuthorityMeansPersistenceExecution: false,
      relationMeansNewCheckingEvent: false,
      relationMayIncreaseIndependentVerificationCount: false,
      reissueMeansSemanticIdentityEquivalence: false,
      reissueAdmissionMeansMethodologySourceRefRewrite: false,
      reissueAdmissionMeansMetricBinding: false,
      reissueAdmissionMeansThreshold: false,
      reissueAdmissionMeansTraditionalSemantics: false,
    },
    recommendedNextFrontier: 'intake_witness_qualified_page_verification_reissue_persistence_review',
    remainingBlockers: [
      'witness_qualified_page_verification_reissue_not_persisted',
      'witness_qualified_intake_passage_not_persisted_in_face_registry',
      'intake_criterion_methodology_source_ref_rewrite_not_authorized',
      'intake_criterion_methodology_not_registered',
      'intake_officer_mapping_dependency_not_re_reviewed',
      'intake_metric_to_source_concept_mapping_not_authorized',
      'intake_calibration_and_thresholds_not_authorized',
      'fr64_methodology_execution_and_claim_gates_remain',
    ],
    prohibitedShortcuts: [
      'reissue_admission_to_persistence_authority',
      'persistence_review_authority_to_persistence_execution',
      'relation_to_new_checking_event',
      'relation_to_independent_verification_increment',
      'reissue_to_semantic_identity_equivalence',
      'reissue_admission_to_methodology_source_ref_rewrite',
      'reissue_admission_to_metric_binding',
      'reissue_admission_to_numeric_threshold',
      'reissue_admission_to_traditional_semantics',
    ],
  };
}

describe('FR115 post-lineage reissue admission review', () => {
  it('admits reissue only after machine-readable core lineage is available', () => {
    const value = artifact();
    expect(validateFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePostLineageAdmissionReviewFR115(value)).toBe(value);
    expect(value.admissionReview.priorMissingLineageBlockerResolved).toBe(true);
    expect(value.admissionReview.targetEphemeralRegistryValidationPassed).toBe(true);
    expect(value.admissionReview.verificationReissueAdmissionAuthorized).toBe(true);
    expect(value.admissionReview.independentVerificationDelta).toBe(0);
  });

  it('does not execute persistence or semantic promotion', () => {
    const value = artifact();
    expect(value.admissionReview.targetRelationPersistenceAuthorized).toBe(false);
    expect(value.admissionReview.targetVerificationRecordPersistenceAuthorized).toBe(false);
    expect(value.execution.verificationRelationsPersisted).toBe(0);
    expect(value.execution.verificationRecordsPersisted).toBe(0);
    expect(value.execution.passagesPersisted).toBe(0);
    expect(value.execution.traditionalSemanticAuthority).toBe(false);
  });
});
