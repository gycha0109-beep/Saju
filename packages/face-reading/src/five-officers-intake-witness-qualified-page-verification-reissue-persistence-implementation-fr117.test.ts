import { describe, expect, it } from 'vitest';
import { FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0, validateDirectSourceVerificationRegistry } from './direct-source-verification.js';
import { FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0 } from './five-officers-six-fus-research-v0.js';
import {
  FACE_AUTHORITY_FR117_WITNESS_QUALIFIED_RESEARCH_REGISTRY,
  FACE_DIRECT_SOURCE_VERIFICATION_FR117_WITNESS_QUALIFIED_REISSUE,
  FR117_NLC_WITNESS_QUALIFIED_PAGE_VERIFICATION,
  FR117_NLC_WITNESS_QUALIFIED_PASSAGE,
  FR117_NLC_WITNESS_QUALIFIED_REISSUE_RELATION,
  validateFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceImplementationFR117,
  type FiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceImplementationFR117V1,
} from './five-officers-intake-witness-qualified-page-verification-reissue-persistence-implementation-fr117.js';
import { validateFaceAuthorityRegistry } from './validation.js';

function artifact(): FiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceImplementationFR117V1 {
  return {
    schemaVersion: 'fr117-five-officers-intake-witness-qualified-page-verification-reissue-persistence-implementation-v1',
    artifactVersion: '0.1.0',
    authorityState: 'witness_qualified_reissue_relation_record_and_face_passage_persisted_downstream_authority_still_closed',
    upstream: {
      fr116SchemaVersion: 'fr116-five-officers-intake-witness-qualified-page-verification-reissue-persistence-review-v1',
      fr116AuthorityState: 'bounded_governed_extension_and_face_append_persistence_authorized_execution_not_performed',
      governedDirectSourceExtensionPersistenceAuthorized: true,
      targetRelationPersistenceAuthorized: true,
      targetVerificationRecordPersistenceAuthorized: true,
      witnessQualifiedFacePassagePersistenceAuthorized: true,
      persistenceExecutionAuthorized: true,
      baseDirectSourceRegistryMutationAuthorized: false,
      historicalFacePassageReplacementAuthorized: false,
      persistedBefore: false,
    },
    persistedState: {
      governedDirectSourceRegistryId: 'direct-source-verification.face.fr117_witness_qualified_reissue',
      originalVerificationRef: 'verification.shenxiang_nlc_1925.intake@0.1.0',
      childVerificationRef: 'verification.shenxiang_nlc_1925.intake.witness_qualified@0.1.0',
      relationRef: 'verification-lineage.shenxiang_nlc_1925.intake.witness_qualified@0.1.0',
      historicalPassageRef: 'passage.shenxiang.five_officers.intake',
      witnessQualifiedPassageRef: 'passage.shenxiang.five_officers.intake.nlc_1925',
      parentVerificationRetained: true,
      parentVerificationPersistedByThisFrontier: false,
      childVerificationPersisted: true,
      relationPersisted: true,
      witnessQualifiedPassagePersisted: true,
      derivedFaceRegistryPersisted: true,
      baseDirectSourceRegistryMutated: false,
      historicalFacePassageReplaced: false,
      historicalFacePassageRetained: true,
      exactEvidenceReusePreserved: true,
      sameCheckingEventPreserved: true,
      independentVerificationDelta: 0,
      semanticIdentityEquivalenceAsserted: false,
      methodologySourceRefsChanged: false,
    },
    execution: {
      directSourceRegistriesPersisted: 1,
      verificationRelationsPersisted: 1,
      verificationRecordsReissued: 1,
      verificationRecordsPersisted: 1,
      passagesPersisted: 1,
      faceRegistriesPersisted: 1,
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
      persistenceMeansBaseRegistryMutation: false,
      persistenceMeansHistoricalReplacement: false,
      persistenceMeansNewCheckingEvent: false,
      persistenceMayIncreaseIndependentVerificationCount: false,
      exactTextMatchMeansSemanticIdentityEquivalence: false,
      persistedPassageMeansMethodologySourceRefRebound: false,
      persistenceMeansMetricBinding: false,
      persistenceMeansThreshold: false,
      persistenceMeansCriterionState: false,
      persistenceMeansClaim: false,
      persistenceMeansTraditionalSemantics: false,
    },
    recommendedNextFrontier: 'intake_criterion_methodology_source_rebind_post_persistence_review',
    remainingBlockers: [
      'intake_criterion_methodology_source_ref_rewrite_not_authorized',
      'intake_criterion_methodology_not_registered',
      'intake_officer_mapping_dependency_not_re_reviewed',
      'intake_metric_to_source_concept_mapping_not_authorized',
      'intake_calibration_and_thresholds_not_authorized',
      'fr64_methodology_execution_and_claim_gates_remain',
    ],
    prohibitedShortcuts: [
      'persistence_to_base_registry_mutation',
      'persistence_to_historical_replacement',
      'persistence_to_new_checking_event',
      'persistence_to_independent_verification_increment',
      'exact_text_match_to_semantic_identity_equivalence',
      'persisted_passage_to_methodology_source_ref_rebind',
      'persistence_to_metric_binding',
      'persistence_to_numeric_threshold',
      'persistence_to_criterion_state',
      'persistence_to_claim',
      'persistence_to_traditional_semantics',
    ],
  };
}

describe('FR117 witness-qualified reissue persistence implementation', () => {
  it('persists the governed direct-source reissue without mutating the base registry', () => {
    validateDirectSourceVerificationRegistry(FACE_DIRECT_SOURCE_VERIFICATION_FR117_WITNESS_QUALIFIED_REISSUE);
    expect(FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.pageVerifications).toHaveLength(0);
    expect(Object.prototype.hasOwnProperty.call(FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0, 'verificationRelations')).toBe(false);
    expect(FR117_NLC_WITNESS_QUALIFIED_PAGE_VERIFICATION.passageId).toBe('passage.shenxiang.five_officers.intake.nlc_1925');
    expect(FR117_NLC_WITNESS_QUALIFIED_REISSUE_RELATION.independentVerificationDelta).toBe(0);
    expect(FR117_NLC_WITNESS_QUALIFIED_REISSUE_RELATION.childMayCountAsIndependentVerification).toBe(false);
  });

  it('persists the witness-qualified Face passage while retaining the historical passage and sourceRefs', () => {
    validateFaceAuthorityRegistry(FACE_AUTHORITY_FR117_WITNESS_QUALIFIED_RESEARCH_REGISTRY);
    expect(FR117_NLC_WITNESS_QUALIFIED_PASSAGE.witnessId).toBe('witness.shenxiang_quanbian.nlc_1925');
    expect(FR117_NLC_WITNESS_QUALIFIED_PASSAGE.verificationStatus).toBe('scan_checked');
    const historical = FACE_AUTHORITY_FR117_WITNESS_QUALIFIED_RESEARCH_REGISTRY.passages.find((passage) => passage.passageId === 'passage.shenxiang.five_officers.intake');
    expect(historical?.witnessId).toBe('witness.shenxiang_quanbian.ctext');
    expect(FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.passages.some((passage) => passage.passageId === 'passage.shenxiang.five_officers.intake.nlc_1925')).toBe(false);
    const methodology = FACE_AUTHORITY_FR117_WITNESS_QUALIFIED_RESEARCH_REGISTRY.methodologies.find((entry) => `${entry.methodologyId}@${entry.version}` === 'method.shenxiang.five_officers@0.1.0');
    expect(methodology?.sourceRefs).toContain('passage.shenxiang.five_officers.intake');
    expect(methodology?.sourceRefs).not.toContain('passage.shenxiang.five_officers.intake.nlc_1925');
  });

  it('records exactly one child/relation/passage persistence without downstream semantic authority', () => {
    const value = artifact();
    expect(validateFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceImplementationFR117(value)).toBe(value);
    expect(value.execution.verificationRelationsPersisted).toBe(1);
    expect(value.execution.verificationRecordsPersisted).toBe(1);
    expect(value.execution.passagesPersisted).toBe(1);
    expect(value.execution.methodologySourceRefsRewritten).toBe(0);
    expect(value.execution.traditionalSemanticAuthority).toBe(false);
  });
});
