import {
  NEUTRAL_EAR_ANATOMICAL_SIDE_SEMANTIC_WITNESS_FR104,
} from './neutral-ear-anatomical-side-semantic-witness-fr104.js';
import {
  NEUTRAL_EAR_LATERALITY_SOURCE_AUDIT_FR104,
} from './neutral-ear-laterality-source-audit-fr104.js';
import {
  NEUTRAL_EAR_PROVIDER_MIRROR_SEMANTICS_REVIEW_FR104,
} from './neutral-ear-provider-mirror-semantics-review-fr104.js';

export const NEUTRAL_EAR_LATERALITY_INTEGRATION_READINESS_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-neutral-ear-laterality-integration-readiness-v1' as const,
    authorityState:
      'provider_mirror_behavior_admitted_anatomical_mapping_still_closed' as const,

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

    sourceAuditReconciliation: Object.freeze({
      literalProviderLeftRightLabelsPublished:
        NEUTRAL_EAR_LATERALITY_SOURCE_AUDIT_FR104
          .providerNamedSideSurface.literalLeftRightLabelsPublished,
      pinnedLabelFileDirectlyEstablishesMirrorBehavior:
        NEUTRAL_EAR_LATERALITY_SOURCE_AUDIT_FR104
          .providerNamedSideSurface
          .horizontalMirrorBehaviorEstablishedByPinnedLabelFile,
      empiricalMirrorBehaviorNowAvailable:
        true as const,
      empiricalMirrorBehaviorMayReplaceMissingAnatomicalSemanticWitness:
        false as const,
      directAnatomicalSemanticWitnessState:
        NEUTRAL_EAR_ANATOMICAL_SIDE_SEMANTIC_WITNESS_FR104
          .authorityState,
      exactReleaseSideConflictDetected:
        NEUTRAL_EAR_ANATOMICAL_SIDE_SEMANTIC_WITNESS_FR104
          .pinnedProviderSurface.rotationCommentConflict
          .conflictWithPublishedNamedTopologyDetected,
      directAnatomicalSemanticWitnessAdmitted:
        NEUTRAL_EAR_ANATOMICAL_SIDE_SEMANTIC_WITNESS_FR104
          .decision.directAnatomicalSemanticWitnessAdmitted,
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
    }),

    clearedBlockers: Object.freeze([
      'provider_mirror_semantics_empirical_result_not_admitted',
    ] as const),

    remainingBlockers: Object.freeze([
      'runtime_instance_same_pixel_bytes_must_be_independently_verified',
      'provider_left_right_anatomical_semantics_conflicting_or_ambiguous',
      'runtime_instance_transform_parity_must_be_resolved',
      'capture_transform_provenance_may_be_attested_but_not_independently_verified',
      'anatomical_side_mapping_not_admitted',
    ] as const),

    mappingPreconditions: Object.freeze({
      boundedProviderMirrorBehaviorRequired: true as const,
      captureTransformReceiptRequired: true as const,
      knownExifApplicationRequired: true as const,
      knownHorizontalMirrorStateRequired: true as const,
      sameConsumerFrameForFlorenceAndFaceLandmarkerRequired:
        true as const,
      independentPixelFingerprintMatchRequired:
        true as const,
      resolvedNetReflectionParityRequired:
        true as const,
      independentAnatomicalSideSemanticWitnessRequired:
        true as const,
      providerPromptSideMaySubstituteForAnatomicalWitness:
        false as const,
      imageSpaceHorizontalSignMaySubstituteForAnatomicalWitness:
        false as const,
    }),

    decision: Object.freeze({
      providerMirrorRuntimeBlockerCleared:
        true as const,
      anatomicalMappingReady:
        false as const,
      anatomicalLateralityAuthorized:
        false as const,
      nextGate:
        'obtain or design a governed anatomical-side reference protocol that resolves the exact-release side-semantic conflict; mechanical parity, pixel-identity, and provider-eye-axis gates are now implemented but do not authorize anatomy' as const,
    }),

    authority: Object.freeze({
      validatedExternalEarObservationAuthorized:
        false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),
  });
