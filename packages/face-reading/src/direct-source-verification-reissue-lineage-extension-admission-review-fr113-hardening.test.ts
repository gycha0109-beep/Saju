import { describe, expect, it } from 'vitest';
import {
  FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0,
  type DirectSourcePageVerificationRecord,
} from './direct-source-verification.js';
import {
  FR104_NLC_1925_INTAKE_CANDIDATE,
  FR104_NLC_INTAKE_PAGE_VERIFICATION,
} from './five-officers-mouth-direct-source-page-verification-fr104.js';
import {
  validateDirectSourceVerificationRegistryFR113Proposal,
  validateDirectSourceVerificationReissueLineageExtensionAdmissionReviewFR113,
  type DirectSourceVerificationRelationFR113Proposal,
  type DirectSourceVerificationRegistryFR113Proposal,
  type DirectSourceVerificationReissueLineageExtensionAdmissionReviewFR113V1,
} from './direct-source-verification-reissue-lineage-extension-admission-review-fr113.js';
import { FaceAuthorityValidationError } from './validation.js';

const PARENT_REF = 'verification.shenxiang_nlc_1925.intake@0.1.0';
const CHILD_REF = 'verification.shenxiang_nlc_1925.intake.witness_qualified@0.1.0';

function childRecord(overrides: Partial<DirectSourcePageVerificationRecord> = {}): DirectSourcePageVerificationRecord {
  const source: DirectSourcePageVerificationRecord = FR104_NLC_INTAKE_PAGE_VERIFICATION;
  return {
    verificationId: 'verification.shenxiang_nlc_1925.intake.witness_qualified',
    version: source.version,
    candidateRef: source.candidateRef,
    witnessId: source.witnessId,
    passageId: 'passage.shenxiang.five_officers.intake.nlc_1925',
    chapter: source.chapter,
    scanPage: source.scanPage,
    ...(source.printedPage === undefined ? {} : { printedPage: source.printedPage }),
    originalText: source.originalText,
    visualEvidenceRefs: source.visualEvidenceRefs,
    checkerRefs: source.checkerRefs,
    state: source.state,
    mayPromoteOtherWitness: false,
    ...overrides,
  };
}

function relation(overrides: Partial<DirectSourceVerificationRelationFR113Proposal> = {}): DirectSourceVerificationRelationFR113Proposal {
  return {
    relationId: 'verification-lineage.shenxiang_nlc_1925.intake.witness_qualified',
    version: '0.1.0',
    kind: 'non_independent_identity_reissue',
    parentVerificationRef: PARENT_REF,
    childVerificationRef: CHILD_REF,
    parentRetained: true,
    evidenceReusePolicy: 'exact_evidence_reuse_required',
    checkingEventPolicy: 'same_checker_refs_same_checking_event',
    allowedRecordDifferences: ['verificationId', 'passageId'],
    lineageDepthPolicy: 'single_hop_parent_root',
    independentVerificationDelta: 0,
    childMayCountAsIndependentVerification: false,
    ...overrides,
  };
}

function registry(
  relations: readonly DirectSourceVerificationRelationFR113Proposal[] = [relation()],
  child: DirectSourcePageVerificationRecord = childRecord(),
): DirectSourceVerificationRegistryFR113Proposal {
  return {
    registryId: 'direct-source-verification.face.fr113_hardening_probe',
    version: '0.1.0',
    candidates: [...FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.candidates, FR104_NLC_1925_INTAKE_CANDIDATE],
    pageVerifications: [
      ...FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.pageVerifications,
      FR104_NLC_INTAKE_PAGE_VERIFICATION,
      child,
    ],
    verificationRelations: relations,
  };
}

describe('FR113 direct-source verification reissue lineage extension hardening', () => {
  it('keeps legacy registries valid when verificationRelations is absent', () => {
    expect(validateDirectSourceVerificationRegistryFR113Proposal(FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0))
      .toBe(FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0);
  });

  it('rejects independent-verification inflation', () => {
    const inflated = relation({
      independentVerificationDelta: 1,
      childMayCountAsIndependentVerification: true,
    } as unknown as Partial<DirectSourceVerificationRelationFR113Proposal>);
    expect(() => validateDirectSourceVerificationRegistryFR113Proposal(registry([inflated])))
      .toThrow(FaceAuthorityValidationError);
  });

  it('rejects duplicate relation identity and multiple parent claims for the same child', () => {
    expect(() => validateDirectSourceVerificationRegistryFR113Proposal(registry([relation(), relation()])))
      .toThrow(FaceAuthorityValidationError);
    expect(() => validateDirectSourceVerificationRegistryFR113Proposal(registry([
      relation(),
      relation({ relationId: 'verification-lineage.second-parent-claim' }),
    ])))
      .toThrow(FaceAuthorityValidationError);
  });

  it('rejects unresolved and chained or cyclic lineage', () => {
    expect(() => validateDirectSourceVerificationRegistryFR113Proposal(registry([
      relation({ parentVerificationRef: 'verification.missing@0.1.0' }),
    ]))).toThrow(FaceAuthorityValidationError);

    const reverse = relation({
      relationId: 'verification-lineage.reverse-cycle',
      parentVerificationRef: CHILD_REF,
      childVerificationRef: PARENT_REF,
    });
    expect(() => validateDirectSourceVerificationRegistryFR113Proposal(registry([relation(), reverse])))
      .toThrow(FaceAuthorityValidationError);
  });

  it('rejects evidence or checking-event drift in the child record', () => {
    expect(() => validateDirectSourceVerificationRegistryFR113Proposal(registry(
      [relation()],
      childRecord({ originalText: `${FR104_NLC_INTAKE_PAGE_VERIFICATION.originalText} drift` }),
    ))).toThrow(FaceAuthorityValidationError);
    expect(() => validateDirectSourceVerificationRegistryFR113Proposal(registry(
      [relation()],
      childRecord({ checkerRefs: ['checker:invented'] }),
    ))).toThrow(FaceAuthorityValidationError);
  });

  it('rejects promoting admission-review output into implementation, reissue, or persistence execution', () => {
    const base = {
      schemaVersion: 'fr113-direct-source-verification-reissue-lineage-extension-admission-review-v1',
      artifactVersion: '0.1.0',
      authorityState: 'additive_registry_relation_extension_admitted_for_implementation_core_unmodified',
      upstream: {
        fr112SchemaVersion: 'fr112-five-officers-intake-page-verification-reissue-lineage-contract-review-v1',
        fr112AuthorityState: 'bounded_registry_level_reissue_lineage_contract_candidate_defined_core_extension_not_authorized',
        selectedPlacement: 'registry_level_verification_relation_collection',
        ephemeralLineageValidationPassed: true,
        coreSchemaExtensionAuthorizedBefore: false,
        verificationReissueAdmissionAuthorizedBefore: false,
        verificationRelationsPersistedBefore: 0,
        verificationRecordsPersistedBefore: 0,
        passagesPersistedBefore: 0,
        traditionalSemanticAuthorityBefore: false,
      },
      currentCoreSnapshot: {
        baseRegistryValid: true,
        registryRelationCollectionPresent: false,
        pageRecordInlineLineagePresent: false,
        baseRegistryMutationRequiredForCompatibility: false,
      },
      proposedExtension: {
        fieldName: 'verificationRelations',
        fieldCardinality: 'optional_readonly_collection',
        relationKind: 'non_independent_identity_reissue',
        lineagePlacement: 'registry_level',
        pageRecordShapeMutationRequired: false,
        existingRegistriesRemainValidWhenFieldAbsent: true,
        parentAndChildMustResolve: true,
        parentAndChildMustBeDistinct: true,
        childMayHaveAtMostOneReissueParent: true,
        parentMustBeRootNotAnotherReissueChild: true,
        exactEvidenceReuseRequired: true,
        sameCheckingEventRequired: true,
        allowedRecordDifferences: ['verificationId', 'passageId'],
        independentVerificationDeltaFixedAtZero: true,
        childMayCountAsIndependentVerification: false,
      },
      admissionReview: {
        backwardCompatibilityValidated: true,
        targetRelationValidatedAgainstProposedExtension: true,
        targetRelationStillValidUnderFR112SpecificValidator: true,
        duplicateRelationIdentityRejected: true,
        unresolvedParentOrChildRejected: true,
        multipleParentsForSameChildRejected: true,
        chainedOrCyclicReissueLineageRejectedInV1: true,
        evidenceOrCheckingDriftRejected: true,
        independentVerificationInflationRejected: true,
        additiveCoreExtensionAuthoritySafe: true,
        coreExtensionImplementationAuthorized: true,
        coreSchemaChangedInThisReview: true,
        verificationReissueAdmissionAuthorized: true,
        verificationRecordPersistenceAuthorized: true,
      },
      execution: {
        directSourceRegistrySchemaChanges: 1,
        verificationRelationsPersisted: 1,
        verificationRecordsReissued: 1,
        verificationRecordsPersisted: 1,
        passagesPersisted: 1,
        faceRegistryChanged: true,
        methodologySourceRefsRewritten: 1,
        methodologyDefinitionsPersisted: 1,
        metricBindingsIssued: 1,
        thresholdsIssued: 1,
        criterionStatesIssued: 1,
        claimsIssued: 1,
        traditionalSemanticAuthority: true,
      },
      authorityBoundary: {
        extensionAdmissionMeansExtensionAlreadyImplemented: false,
        extensionImplementationAuthorityMeansReissueAuthority: false,
        relationValidationMeansPersistenceAuthority: false,
        relationMeansNewCheckingEvent: false,
        relationMayIncreaseIndependentVerificationCount: false,
        relationMeansPassagePersistence: false,
        relationMeansSemanticIdentityEquivalence: false,
        relationMeansMethodologySourceRefRewrite: false,
        relationMeansMetricBinding: false,
        relationMeansThreshold: false,
        relationMeansTraditionalSemantics: false,
      },
      recommendedNextFrontier: 'direct_source_verification_reissue_lineage_contract_extension_implementation',
      remainingBlockers: [
        'direct_source_verification_reissue_lineage_core_extension_not_implemented',
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
        'extension_admission_to_extension_already_implemented',
        'extension_implementation_authority_to_reissue_authority',
        'relation_validation_to_persistence_authority',
        'relation_to_new_checking_event',
        'relation_to_independent_verification_increment',
        'relation_to_persistent_passage',
        'relation_to_semantic_identity_equivalence',
        'relation_to_methodology_source_ref_rewrite',
        'relation_to_metric_binding',
        'relation_to_numeric_threshold',
        'relation_to_traditional_semantics',
      ],
    } as unknown as DirectSourceVerificationReissueLineageExtensionAdmissionReviewFR113V1;
    expect(() => validateDirectSourceVerificationReissueLineageExtensionAdmissionReviewFR113(base))
      .toThrow(FaceAuthorityValidationError);
  });
});
