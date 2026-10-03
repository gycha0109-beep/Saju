import {
  NEUTRAL_EAR_ANATOMICAL_SIDE_SEMANTIC_WITNESS_FR104,
} from './neutral-ear-anatomical-side-semantic-witness-fr104.js';
import {
  NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_EMPIRICAL_EVIDENCE_FR104,
} from './neutral-ear-gnm-cross-source-geometric-empirical-evidence-fr104.js';
import {
  NEUTRAL_EAR_LATERALITY_SOURCE_AUDIT_FR104,
} from './neutral-ear-laterality-source-audit-fr104.js';
import {
  NEUTRAL_EAR_PROVIDER_MIRROR_SEMANTICS_REVIEW_FR104,
} from './neutral-ear-provider-mirror-semantics-review-fr104.js';

const crossSourceGeometry =
  NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_EMPIRICAL_EVIDENCE_FR104;

export const NEUTRAL_EAR_LATERALITY_INTEGRATION_READINESS_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-neutral-ear-laterality-integration-readiness-v2' as const,
    authorityState:
      'cross_source_geometric_mapping_admitted_capture_provenance_still_closed' as const,

    providerMirrorEvidence: Object.freeze({
      boundedProviderMirrorBehaviorStatementAdmitted:
        NEUTRAL_EAR_PROVIDER_MIRROR_SEMANTICS_REVIEW_FR104
          .decision
          .boundedProviderMirrorBehaviorStatementAdmitted,
      generalUniversalProviderMirrorSemanticsAdmitted:
        NEUTRAL_EAR_PROVIDER_MIRROR_SEMANTICS_REVIEW_FR104
          .decision
          .generalUniversalProviderMirrorSemanticsAdmitted,
      successfulTestedFixtureCount:
        NEUTRAL_EAR_PROVIDER_MIRROR_SEMANTICS_REVIEW_FR104
          .evidence.successfulTestedFixtureCount,
      includesIndependentPublicSourceFixture:
        NEUTRAL_EAR_PROVIDER_MIRROR_SEMANTICS_REVIEW_FR104
          .supportedStatement.includesIndependentPublicSourceFixture,
    }),

    crossSourceGeometryEvidence: Object.freeze({
      resultSha256: crossSourceGeometry.resultSha256,
      state: crossSourceGeometry.state,
      gnmCrossSourceSemanticWitnessAudited:
        crossSourceGeometry.authority
          .gnmCrossSourceSemanticWitnessAudited,
      gnmCrossSourceFixtureDigestPinned:
        crossSourceGeometry.authority
          .gnmCrossSourceFixtureDigestPinned,
      gnmCrossSourceGeometricValidationExecuted:
        crossSourceGeometry.authority
          .gnmCrossSourceGeometricValidationExecuted,
      gnmCrossSourceGeometricMappingValidated:
        crossSourceGeometry.authority
          .gnmCrossSourceGeometricMappingValidated,
      providerPublishedSideNamesUsedAsAnatomicalAuthority:
        crossSourceGeometry.summary
          .providerPublishedSideNamesUsedAsAnatomicalAuthority,
      imageSpaceXSignUsedAsAnatomicalAuthority:
        crossSourceGeometry.summary
          .imageSpaceXSignUsedAsAnatomicalAuthority,
      gnmAxisOrderingUsedAsAnatomicalAuthority:
        crossSourceGeometry.summary
          .gnmAxisOrderingUsedAsAnatomicalAuthority,
    }),

    sourceAuditReconciliation: Object.freeze({
      literalProviderLeftRightLabelsPublished:
        NEUTRAL_EAR_LATERALITY_SOURCE_AUDIT_FR104
          .providerNamedSideSurface.literalLeftRightLabelsPublished,
      pinnedLabelFileDirectlyEstablishesMirrorBehavior:
        NEUTRAL_EAR_LATERALITY_SOURCE_AUDIT_FR104
          .providerNamedSideSurface
          .horizontalMirrorBehaviorEstablishedByPinnedLabelFile,
      exactReleaseProviderSideConflictStillExists:
        NEUTRAL_EAR_ANATOMICAL_SIDE_SEMANTIC_WITNESS_FR104
          .pinnedProviderSurface.rotationCommentConflict
          .conflictWithPublishedNamedTopologyDetected,
      directProviderLabelSemanticWitnessStillAdmitted:
        NEUTRAL_EAR_ANATOMICAL_SIDE_SEMANTIC_WITNESS_FR104
          .decision.directAnatomicalSemanticWitnessAdmitted,
      independentGnmSemanticWitnessAdmitted:
        crossSourceGeometry.authority
          .gnmCrossSourceSemanticWitnessAudited,
      independentGnmGeometryMappingValidated:
        crossSourceGeometry.authority
          .gnmCrossSourceGeometricMappingValidated,
      providerPublishedSideNamesNeedNotBecomeAnatomicalAuthority:
        true as const,
      independentCrossSourceEvidenceMaySupportConditionalMapping:
        true as const,
    }),

    implementedMechanicalGates: Object.freeze({
      frameTransformReflectionParityContract:
        true as const,
      dualConsumerEphemeralPixelFingerprint:
        true as const,
      providerEyeAxisLateralGeometry:
        true as const,
      anatomicalMappingSkeleton:
        true as const,
      independentCrossSourceSemanticWitness:
        true as const,
      independentCrossSourceGeometricValidation:
        true as const,
      controlledCaptureMirrorProvenanceBridge:
        true as const,
      controlledCaptureRuntimeFrameObjectBinding:
        true as const,
      controlledCaptureFrontRearFacingSelection:
        true as const,
      exactCapturedFrameConsumerByteBinding:
        true as const,
    }),

    controlledCaptureReadiness: Object.freeze({
      authoritySource:
        'controlled-capture-attestation-fr21b.ts' as const,
      authorityVersion: '0.1.0' as const,
      productionReady: false as const,
      controlledCaptureState: 'not_implemented' as const,
      calibrationState: 'design_only' as const,
      anatomicalLateralityState: 'blocked' as const,
      reason:
        'no_verified_controlled_capture_implementation' as const,
      runtimeImportAvoidedToPreventAuthorityModuleCycle:
        true as const,
      mirrorProvenanceBridgeState:
        'implemented_fail_closed' as const,
      exactRuntimeFrameToProfileBindingState:
        'captured_frame_object_binding_implemented' as const,
      exactRuntimeFrameToConsumerBytesBindingState:
        'implemented_fail_closed_ephemeral_bridge' as const,
      ordinaryFileUploadBridgeState:
        'explicitly_rejected' as const,
    }),

    clearedBlockers: Object.freeze([
      'provider_mirror_semantics_empirical_result_not_admitted',
      'independent_anatomical_semantic_witness_not_admitted',
      'cross_source_provider_anatomical_mapping_not_validated',
    ] as const),

    remainingBlockers: Object.freeze([
      'runtime_instance_same_pixel_bytes_must_be_independently_verified',
      'runtime_instance_transform_parity_must_be_resolved',
      'subject_relative_source_pixel_mirror_provenance_not_verified',
      'verified_controlled_capture_profile_not_available',
      'runtime_byte_bridge_not_yet_integrated_into_fr104_ear_provider_invocation',
      'fr21b_front_rear_deterministic_asymmetric_calibration_not_executed',
      'ordinary_file_upload_cannot_claim_controlled_capture_attestation',
      'runtime_anatomical_side_mapping_not_admitted',
    ] as const),

    mappingPreconditions: Object.freeze({
      boundedProviderMirrorBehaviorRequired: true as const,
      independentGnmSemanticWitnessRequired: true as const,
      independentGnmGeometricMappingValidationRequired:
        true as const,
      captureTransformReceiptRequired: true as const,
      knownExifApplicationRequired: true as const,
      sameConsumerFrameForFlorenceAndFaceLandmarkerRequired:
        true as const,
      independentPixelFingerprintMatchRequired:
        true as const,
      resolvedConsumerFrameReflectionParityRequired:
        true as const,
      subjectRelativeSourceMirrorProvenanceRequired:
        true as const,
      verifiedControlledCaptureProfileRequired:
        true as const,
      providerPublishedLeftRightNameMaySubstituteForCrossSourceEvidence:
        false as const,
      florencePromptSideMaySubstituteForAnatomicalWitness:
        false as const,
      imageSpaceHorizontalSignMaySubstituteForAnatomicalWitness:
        false as const,
      ordinaryFileUploadMaySubstituteForControlledCaptureProfile:
        false as const,
    }),

    decision: Object.freeze({
      providerMirrorRuntimeBlockerCleared:
        true as const,
      independentCrossSourceGeometricMappingBlockerCleared:
        true as const,
      exactProviderPublishedSideSemanticConflictStillExists:
        true as const,
      exactProviderPublishedSideSemanticConflictStillBlocksCrossSourceMapping:
        false as const,
      controlledCaptureProvenanceBlockerCleared:
        false as const,
      anatomicalMappingReady:
        false as const,
      anatomicalLateralityAuthorized:
        false as const,
      nextGate:
        'execute_and_review_fr21b_deterministic_asymmetric_front_and_rear_calibration_then_admit_verified_capture_profiles_and_integrate_the_exact_frame_consumer_byte_bridge_into_the_fr104_ear_provider_invocation; ordinary_file_upload_remains_fail_closed' as const,
    }),

    authority: Object.freeze({
      anatomicalReferenceAdmitted:
        false as const,
      anatomicalLateralityAuthorized:
        false as const,
      validatedExternalEarObservationAuthorized:
        false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),
  });
