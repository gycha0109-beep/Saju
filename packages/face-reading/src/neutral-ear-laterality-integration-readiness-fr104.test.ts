import { describe, expect, it } from 'vitest';
import {
  NEUTRAL_EAR_LATERALITY_INTEGRATION_READINESS_FR104,
} from './neutral-ear-laterality-integration-readiness-fr104.js';

describe('FR104 laterality integration readiness', () => {
  it('clears only the empirical provider-mirror blocker', () => {
    const readiness =
      NEUTRAL_EAR_LATERALITY_INTEGRATION_READINESS_FR104;

    expect(readiness.clearedBlockers).toEqual([
      'provider_mirror_semantics_empirical_result_not_admitted',
    ]);
    expect(
      readiness.decision.providerMirrorRuntimeBlockerCleared,
    ).toBe(true);
    expect(
      readiness.providerMirrorEvidence
        .boundedProviderMirrorBehaviorStatementAdmitted,
    ).toBe(true);
    expect(
      readiness.providerMirrorEvidence
        .generalUniversalProviderMirrorSemanticsAdmitted,
    ).toBe(false);
  });

  it('preserves the source-audit distinction between labels and anatomy', () => {
    const reconciliation =
      NEUTRAL_EAR_LATERALITY_INTEGRATION_READINESS_FR104
        .sourceAuditReconciliation;

    expect(
      reconciliation.literalProviderLeftRightLabelsPublished,
    ).toBe(true);
    expect(
      reconciliation
        .pinnedLabelFileDirectlyEstablishesMirrorBehavior,
    ).toBe(false);
    expect(
      reconciliation.empiricalMirrorBehaviorNowAvailable,
    ).toBe(true);
    expect(
      reconciliation
        .empiricalMirrorBehaviorMayReplaceMissingAnatomicalSemanticWitness,
    ).toBe(false);
    expect(
      reconciliation.directAnatomicalSemanticWitnessState,
    ).toBe('conflicting_or_ambiguous');
    expect(
      reconciliation.exactReleaseSideConflictDetected,
    ).toBe(true);
    expect(
      reconciliation.directAnatomicalSemanticWitnessAdmitted,
    ).toBe(false);
  });

  it('keeps anatomical mapping closed until separate preconditions exist', () => {
    const readiness =
      NEUTRAL_EAR_LATERALITY_INTEGRATION_READINESS_FR104;

    expect(readiness.remainingBlockers).toContain(
      'provider_left_right_anatomical_semantics_conflicting_or_ambiguous',
    );
    expect(readiness.remainingBlockers).toContain(
      'runtime_instance_same_pixel_bytes_must_be_independently_verified',
    );
    expect(readiness.remainingBlockers).toContain(
      'runtime_instance_transform_parity_must_be_resolved',
    );
    expect(
      readiness.mappingPreconditions
        .independentPixelFingerprintMatchRequired,
    ).toBe(true);
    expect(
      readiness.mappingPreconditions
        .resolvedNetReflectionParityRequired,
    ).toBe(true);
    expect(
      readiness.mappingPreconditions
        .independentAnatomicalSideSemanticWitnessRequired,
    ).toBe(true);
    expect(
      readiness.mappingPreconditions
        .providerPromptSideMaySubstituteForAnatomicalWitness,
    ).toBe(false);
    expect(
      readiness.decision.anatomicalMappingReady,
    ).toBe(false);
    expect(
      readiness.decision.anatomicalLateralityAuthorized,
    ).toBe(false);
  });

  it('records the mechanical gates implemented without widening anatomical authority', () => {
    const implemented =
      NEUTRAL_EAR_LATERALITY_INTEGRATION_READINESS_FR104
        .implementedMechanicalGates;

    expect(implemented).toEqual({
      frameTransformReflectionParityContract: true,
      dualConsumerEphemeralPixelFingerprint: true,
      providerEyeAxisLateralGeometry: true,
      anatomicalMappingSkeleton: true,
    });
  });

  it('keeps downstream authority closed', () => {
    const authority =
      NEUTRAL_EAR_LATERALITY_INTEGRATION_READINESS_FR104
        .authority;

    expect(authority.validatedExternalEarObservationAuthorized)
      .toBe(false);
    expect(authority.traditionalBindingAuthorized)
      .toBe(false);
    expect(authority.productionAuthorization)
      .toBe(false);
  });
});
