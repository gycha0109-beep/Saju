import { describe, expect, it } from 'vitest';
import {
  NEUTRAL_EAR_LATERALITY_INTEGRATION_READINESS_FR104,
} from './neutral-ear-laterality-integration-readiness-fr104.js';

describe('FR104 laterality integration readiness after U5B-D', () => {
  it('admits the independent GNM semantic and geometric blockers as cleared', () => {
    const readiness =
      NEUTRAL_EAR_LATERALITY_INTEGRATION_READINESS_FR104;

    expect(readiness.clearedBlockers).toEqual([
      'provider_mirror_semantics_empirical_result_not_admitted',
      'independent_anatomical_semantic_witness_not_admitted',
      'cross_source_provider_anatomical_mapping_not_validated',
    ]);
    expect(
      readiness.crossSourceGeometryEvidence.state,
    ).toBe('gnm_cross_source_geometric_mapping_supported');
    expect(
      readiness.crossSourceGeometryEvidence
        .gnmCrossSourceSemanticWitnessAudited,
    ).toBe(true);
    expect(
      readiness.crossSourceGeometryEvidence
        .gnmCrossSourceFixtureDigestPinned,
    ).toBe(true);
    expect(
      readiness.crossSourceGeometryEvidence
        .gnmCrossSourceGeometricValidationExecuted,
    ).toBe(true);
    expect(
      readiness.crossSourceGeometryEvidence
        .gnmCrossSourceGeometricMappingValidated,
    ).toBe(true);
    expect(
      readiness.decision
        .independentCrossSourceGeometricMappingBlockerCleared,
    ).toBe(true);
  });

  it('keeps provider published names non-authoritative despite the old source conflict', () => {
    const reconciliation =
      NEUTRAL_EAR_LATERALITY_INTEGRATION_READINESS_FR104
        .sourceAuditReconciliation;

    expect(
      reconciliation.literalProviderLeftRightLabelsPublished,
    ).toBe(true);
    expect(
      reconciliation
        .exactReleaseProviderSideConflictStillExists,
    ).toBe(true);
    expect(
      reconciliation.directProviderLabelSemanticWitnessStillAdmitted,
    ).toBe(false);
    expect(
      reconciliation.independentGnmSemanticWitnessAdmitted,
    ).toBe(true);
    expect(
      reconciliation.independentGnmGeometryMappingValidated,
    ).toBe(true);
    expect(
      reconciliation
        .providerPublishedSideNamesNeedNotBecomeAnatomicalAuthority,
    ).toBe(true);
    expect(
      NEUTRAL_EAR_LATERALITY_INTEGRATION_READINESS_FR104
        .crossSourceGeometryEvidence
        .providerPublishedSideNamesUsedAsAnatomicalAuthority,
    ).toBe(false);
  });

  it('moves the remaining blocker to subject-relative capture provenance', () => {
    const readiness =
      NEUTRAL_EAR_LATERALITY_INTEGRATION_READINESS_FR104;

    expect(readiness.remainingBlockers).not.toContain(
      'provider_left_right_anatomical_semantics_conflicting_or_ambiguous',
    );
    expect(readiness.remainingBlockers).toContain(
      'subject_relative_source_pixel_mirror_provenance_not_verified',
    );
    expect(readiness.remainingBlockers).toContain(
      'verified_controlled_capture_profile_not_available',
    );
    expect(readiness.remainingBlockers).toContain(
      'captured_frame_to_consumer_bytes_binding_not_independently_verified',
    );
    expect(readiness.remainingBlockers).toContain(
      'ordinary_file_upload_cannot_claim_controlled_capture_attestation',
    );
    expect(
      readiness.mappingPreconditions
        .subjectRelativeSourceMirrorProvenanceRequired,
    ).toBe(true);
    expect(
      readiness.mappingPreconditions
        .verifiedControlledCaptureProfileRequired,
    ).toBe(true);
    expect(
      readiness.mappingPreconditions
        .ordinaryFileUploadMaySubstituteForControlledCaptureProfile,
    ).toBe(false);
  });

  it('reflects the current FR21B controlled-capture boundary', () => {
    const capture =
      NEUTRAL_EAR_LATERALITY_INTEGRATION_READINESS_FR104
        .controlledCaptureReadiness;

    expect(capture.productionReady).toBe(false);
    expect(capture.controlledCaptureState)
      .toBe('not_implemented');
    expect(capture.calibrationState).toBe('design_only');
    expect(capture.anatomicalLateralityState).toBe('blocked');
    expect(capture.mirrorProvenanceBridgeState)
      .toBe('implemented_fail_closed');
    expect(capture.exactRuntimeFrameToProfileBindingState)
      .toBe(
        'captured_frame_object_binding_implemented_consumer_bytes_unverified',
      );
    expect(capture.ordinaryFileUploadBridgeState)
      .toBe('explicitly_rejected');
    expect(
      NEUTRAL_EAR_LATERALITY_INTEGRATION_READINESS_FR104
        .implementedMechanicalGates
        .controlledCaptureMirrorProvenanceBridge,
    ).toBe(true);
    expect(
      NEUTRAL_EAR_LATERALITY_INTEGRATION_READINESS_FR104
        .implementedMechanicalGates
        .controlledCaptureRuntimeFrameObjectBinding,
    ).toBe(true);
    expect(
      NEUTRAL_EAR_LATERALITY_INTEGRATION_READINESS_FR104
        .decision.controlledCaptureProvenanceBlockerCleared,
    ).toBe(false);
  });

  it('keeps anatomical and downstream authority closed', () => {
    const readiness =
      NEUTRAL_EAR_LATERALITY_INTEGRATION_READINESS_FR104;

    expect(readiness.decision.anatomicalMappingReady).toBe(false);
    expect(
      readiness.decision.anatomicalLateralityAuthorized,
    ).toBe(false);
    expect(readiness.authority.anatomicalReferenceAdmitted)
      .toBe(false);
    expect(readiness.authority.anatomicalLateralityAuthorized)
      .toBe(false);
    expect(
      readiness.authority.validatedExternalEarObservationAuthorized,
    ).toBe(false);
    expect(readiness.authority.traditionalBindingAuthorized)
      .toBe(false);
    expect(readiness.authority.productionAuthorization)
      .toBe(false);
  });
});
