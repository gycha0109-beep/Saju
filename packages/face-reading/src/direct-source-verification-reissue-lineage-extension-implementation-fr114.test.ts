import { describe, expect, it } from 'vitest';
import {
  validateDirectSourceVerificationReissueLineageExtensionImplementationFR114,
  type DirectSourceVerificationReissueLineageExtensionImplementationFR114V1,
} from './direct-source-verification-reissue-lineage-extension-implementation-fr114.js';

function validArtifact(): DirectSourceVerificationReissueLineageExtensionImplementationFR114V1 {
  return {
    schemaVersion: 'fr114-direct-source-verification-reissue-lineage-extension-implementation-v1',
    artifactVersion: '0.1.0',
    authorityState: 'core_registry_relation_extension_implemented_reissue_still_not_authorized',
    upstream: {
      fr113SchemaVersion: 'fr113-direct-source-verification-reissue-lineage-extension-admission-review-v1',
      fr113AuthorityState: 'additive_registry_relation_extension_admitted_for_implementation_core_unmodified',
      coreExtensionImplementationAuthorized: true,
      verificationReissueAdmissionAuthorizedBefore: false,
      verificationRelationsPersistedBefore: 0,
      verificationRecordsPersistedBefore: 0,
      passagesPersistedBefore: 0,
      traditionalSemanticAuthorityBefore: false,
    },
    implementation: {
      registryRelationFieldName: 'verificationRelations',
      registryRelationFieldOptional: true,
      pageRecordInlineLineageAdded: false,
      legacyRegistryObjectShapePreserved: true,
      legacyRegistryValidationPassed: true,
      boundedCoreRelationValidationPassed: true,
      parentAndChildResolutionEnforced: true,
      singleParentPerChildEnforced: true,
      singleHopParentRootEnforced: true,
      exactEvidenceReuseEnforced: true,
      sameCheckingEventEnforced: true,
      independentVerificationDeltaFixedAtZero: true,
      childMayCountAsIndependentVerification: false,
      coreExtensionImplemented: true,
      targetRelationPersisted: false,
      targetReissueRecordPersisted: false,
    },
    execution: {
      directSourceRegistrySchemaChanges: 1,
      coreRelationValidatorImplemented: true,
      verificationRelationsPersisted: 0,
      verificationRecordsReissued: 0,
      verificationRecordsPersisted: 0,
      passagesPersisted: 0,
      faceRegistryChanged: false,
      methodologySourceRefsRewritten: 0,
      methodologyDefinitionsPersisted: 0,
      metricBindingsIssued: 0,
      thresholdsIssued: 0,
      criterionStatesIssued: 0,
      claimsIssued: 0,
      traditionalSemanticAuthority: false,
    },
    authorityBoundary: {
      coreExtensionImplementationMeansReissueAuthority: false,
      ephemeralTargetValidationMeansPersistenceAuthority: false,
      relationMeansNewCheckingEvent: false,
      relationMayIncreaseIndependentVerificationCount: false,
      relationMeansPassagePersistence: false,
      relationMeansSemanticIdentityEquivalence: false,
      relationMeansMethodologySourceRefRewrite: false,
      relationMeansMetricBinding: false,
      relationMeansThreshold: false,
      relationMeansTraditionalSemantics: false,
    },
    recommendedNextFrontier: 'intake_witness_qualified_page_verification_reissue_post_lineage_admission_review',
    remainingBlockers: [
      'witness_qualified_page_verification_reissue_not_authorized',
      'witness_qualified_intake_passage_not_persisted_in_face_registry',
      'intake_criterion_methodology_source_ref_rewrite_not_authorized',
      'intake_criterion_methodology_not_registered',
      'intake_officer_mapping_dependency_not_re_reviewed',
      'intake_metric_to_source_concept_mapping_not_authorized',
      'intake_calibration_and_thresholds_not_authorized',
      'fr64_methodology_execution_and_claim_gates_remain',
    ],
    prohibitedShortcuts: [
      'core_extension_implementation_to_reissue_authority',
      'ephemeral_target_validation_to_persistence_authority',
      'relation_to_new_checking_event',
      'relation_to_independent_verification_increment',
      'relation_to_persistent_passage',
      'relation_to_semantic_identity_equivalence',
      'relation_to_methodology_source_ref_rewrite',
      'relation_to_metric_binding',
      'relation_to_numeric_threshold',
      'relation_to_traditional_semantics',
    ],
  };
}

describe('FR114 direct-source verification reissue lineage extension implementation', () => {
  it('accepts only the bounded core implementation state', () => {
    const artifact = validArtifact();
    expect(validateDirectSourceVerificationReissueLineageExtensionImplementationFR114(artifact)).toBe(artifact);
    expect(artifact.execution.directSourceRegistrySchemaChanges).toBe(1);
    expect(artifact.execution.verificationRelationsPersisted).toBe(0);
    expect(artifact.execution.verificationRecordsPersisted).toBe(0);
    expect(artifact.execution.passagesPersisted).toBe(0);
  });

  it('keeps reissue, passage persistence, methodology, and semantic authority closed', () => {
    const artifact = validArtifact();
    expect(artifact.implementation.targetRelationPersisted).toBe(false);
    expect(artifact.implementation.targetReissueRecordPersisted).toBe(false);
    expect(artifact.execution.methodologySourceRefsRewritten).toBe(0);
    expect(artifact.execution.metricBindingsIssued).toBe(0);
    expect(artifact.execution.thresholdsIssued).toBe(0);
    expect(artifact.execution.traditionalSemanticAuthority).toBe(false);
  });
});
