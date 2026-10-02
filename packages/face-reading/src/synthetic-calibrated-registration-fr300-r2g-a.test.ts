import { describe, expect, it } from 'vitest';
import {
  FR300_R2G_A_ACCEPTANCE,
  FR300_R2G_A_CANONICAL_EXTRINSICS,
  FR300_R2G_A_CANONICAL_INTRINSICS,
  FR300_R2G_A_CANONICAL_RECEIPT,
  FR300_R2G_A_CANONICAL_RELEASE_TRANSFORM,
  FR300_R2G_A_CURRENT_GATE,
  executeFR300R2GASyntheticCalibratedRegistration,
  assertFR300R2GASyntheticCalibratedRegistrationContract,
} from './synthetic-calibrated-registration-fr300-r2g-a.js';

function canonicalInput() {
  return {
    schemaVersion:
      'fr300-r2g-a-projection-execution-input-v1' as const,
    intrinsics: FR300_R2G_A_CANONICAL_INTRINSICS,
    extrinsics: FR300_R2G_A_CANONICAL_EXTRINSICS,
    releasedImageTransform:
      FR300_R2G_A_CANONICAL_RELEASE_TRANSFORM,
  };
}

describe('FR300-R2G-A synthetic calibrated registration', () => {
  it('executes the frozen calibrated fixture with near-zero pixel residual', () => {
    const receipt =
      executeFR300R2GASyntheticCalibratedRegistration(
        canonicalInput(),
      );

    expect(receipt.pointCount).toBe(
      FR300_R2G_A_ACCEPTANCE.pointCount,
    );
    expect(receipt.outputFinite).toBe(true);
    expect(receipt.rmsePx).toBeLessThanOrEqual(
      FR300_R2G_A_ACCEPTANCE.rmsePxThreshold,
    );
    expect(receipt.maxResidualPx).toBeLessThanOrEqual(
      FR300_R2G_A_ACCEPTANCE.maxResidualPxThreshold,
    );
    expect(receipt.acceptance.thresholdSatisfied).toBe(true);
    expect(receipt.r2fDisposition).toBe(
      'registration_validated_for_materialization_review',
    );
    expect(
      receipt.r2fRegistrationValidatedForFR299Review,
    ).toBe(true);
    expect(receipt.syntheticRegistrationValidated).toBe(true);
    expect(receipt.authorityBoundary).toMatchObject({
      syntheticFixtureOnly: true,
      realParticipantArtifactUsed: false,
      realRegistrationAuthorityIssued: false,
      fr299ReferenceMaterialized: false,
      fr300R2Authorized: false,
      productColumnMaterialized: false,
      productionActivated: false,
      commerceActivated: false,
    });
  });

  it('fails closed when the 3D-to-camera translation is perturbed', () => {
    const input = canonicalInput();
    const receipt =
      executeFR300R2GASyntheticCalibratedRegistration({
        ...input,
        extrinsics: {
          ...input.extrinsics,
          translation: [7, -3, 20] as const,
        },
      });

    expect(receipt.maxResidualPx).toBeGreaterThan(1);
    expect(receipt.acceptance.thresholdSatisfied).toBe(false);
    expect(
      receipt.binding.exactRgbTo3DExtrinsicsBound,
    ).toBe(false);
    expect(receipt.syntheticRegistrationValidated).toBe(false);
    expect(receipt.r2fDisposition).toBe(
      'calibrated_projection_evidence_incomplete',
    );
  });

  it('fails closed when the released-image transform is perturbed', () => {
    const input = canonicalInput();
    const receipt =
      executeFR300R2GASyntheticCalibratedRegistration({
        ...input,
        releasedImageTransform: {
          ...input.releasedImageTransform,
          offsetX: input.releasedImageTransform.offsetX + 1,
        },
      });

    expect(receipt.maxResidualPx).toBeGreaterThanOrEqual(1);
    expect(receipt.acceptance.thresholdSatisfied).toBe(false);
    expect(
      receipt.binding.exactReleasedImageTransformChainBound,
    ).toBe(false);
    expect(receipt.syntheticRegistrationValidated).toBe(false);
  });

  it('fails closed when camera intrinsics drift', () => {
    const input = canonicalInput();
    const receipt =
      executeFR300R2GASyntheticCalibratedRegistration({
        ...input,
        intrinsics: {
          ...input.intrinsics,
          fx: input.intrinsics.fx + 10,
        },
      });

    expect(receipt.acceptance.thresholdSatisfied).toBe(false);
    expect(
      receipt.binding.exactRgbCameraIntrinsicsBound,
    ).toBe(false);
    expect(receipt.syntheticRegistrationValidated).toBe(false);
  });

  it('rejects projection geometry that moves the fixture behind the camera', () => {
    const input = canonicalInput();

    expect(() =>
      executeFR300R2GASyntheticCalibratedRegistration({
        ...input,
        extrinsics: {
          ...input.extrinsics,
          translation: [5, -3, -1000] as const,
        },
      }),
    ).toThrow(/z > 0/);
  });

  it('freezes the canonical receipt and provider-pending authority boundary', () => {
    expect(FR300_R2G_A_CANONICAL_RECEIPT).toMatchObject({
      artifactClass: 'synthetic_fixture',
      outputFinite: true,
      acceptance: {
        preregistered: true,
        thresholdSatisfied: true,
      },
      r2fRegistrationValidatedForFR299Review: true,
      syntheticRegistrationValidated: true,
    });

    expect(FR300_R2G_A_CURRENT_GATE).toMatchObject({
      disposition:
        'synthetic_calibrated_registration_validated_provider_response_pending',
      providerResponseState: 'pending',
      syntheticProjectionExecutionPerformed: true,
      syntheticProjectionValidated: true,
      realParticipantArtifactUsed: false,
      realRegistrationValidatedForFR299Review: false,
      paidSpendAuthorized: false,
      fr299EligibleCandidateCount: 0,
      fr300R2EligibleCandidateCount: 0,
      productMaterialization: '18/29',
    });

    expect(() =>
      assertFR300R2GASyntheticCalibratedRegistrationContract(),
    ).not.toThrow();
  });
});
