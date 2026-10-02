import { describe, expect, it } from 'vitest';
import {
  FR300_R2G_B_ACCEPTANCE,
  FR300_R2G_B_CANONICAL_CORRESPONDENCES,
  FR300_R2G_B_CANONICAL_RECEIPT,
  FR300_R2G_B_CURRENT_GATE,
  assertFR300R2GBSyntheticIndependentRegistrationContract,
  executeFR300R2GBSyntheticIndependentRegistration,
  type FR300R2GBCorrespondence,
} from './synthetic-independent-registration-fr300-r2g-b.js';

type MutableVec3 = [number, number, number];

function cloneVec3(
  value: readonly [number, number, number],
): MutableVec3 {
  return [value[0], value[1], value[2]];
}

function cloneCorrespondences(): FR300R2GBCorrespondence[] {
  return FR300_R2G_B_CANONICAL_CORRESPONDENCES.map(
    (item) => ({
      pointRef: item.pointRef,
      role: item.role,
      rgbMetricPoint: cloneVec3(item.rgbMetricPoint),
      raw3DPoint: cloneVec3(item.raw3DPoint),
    }),
  );
}

function execute(
  correspondences = cloneCorrespondences(),
) {
  return executeFR300R2GBSyntheticIndependentRegistration({
    schemaVersion:
      'fr300-r2g-b-independent-registration-input-v1',
    correspondences,
    providerLandmarksUsedAsRegistrationTruth: false,
    providerLandmarksUsedAsFR266Truth: false,
    providerLandmarksUsedAsFR297Truth: false,
  });
}

describe('FR300-R2G-B synthetic independent registration', () => {
  it('recovers the canonical rigid transform and passes disjoint held-out validation', () => {
    const receipt = execute();

    expect(receipt.solver).toBe(
      'horn_quaternion_rigid_v1',
    );
    expect(receipt.fitCount).toBe(
      FR300_R2G_B_ACCEPTANCE.fitCount,
    );
    expect(receipt.heldOutCount).toBe(
      FR300_R2G_B_ACCEPTANCE.heldOutCount,
    );
    expect(receipt.scaleFittingPerformed).toBe(false);
    expect(receipt.heldOutValidationExecuted).toBe(true);
    expect(receipt.outputFinite).toBe(true);
    expect(receipt.fitRmseMm).toBeLessThanOrEqual(
      FR300_R2G_B_ACCEPTANCE.fitRmseMmThreshold,
    );
    expect(receipt.heldOutRmseMm).toBeLessThanOrEqual(
      FR300_R2G_B_ACCEPTANCE.heldOutRmseMmThreshold,
    );
    expect(receipt.heldOutMaxResidualMm).toBeLessThanOrEqual(
      FR300_R2G_B_ACCEPTANCE.heldOutMaxResidualMmThreshold,
    );
    expect(receipt.rotationDeterminant).toBeCloseTo(1, 12);
    expect(receipt.translation[0]).toBeCloseTo(12.5, 9);
    expect(receipt.translation[1]).toBeCloseTo(-7.25, 9);
    expect(receipt.translation[2]).toBeCloseTo(33, 9);
    expect(receipt.acceptance.thresholdSatisfied).toBe(true);
    expect(receipt.r2fDisposition).toBe(
      'registration_validated_for_materialization_review',
    );
    expect(
      receipt.r2fRegistrationValidatedForFR299Review,
    ).toBe(true);
    expect(
      receipt.syntheticIndependentRegistrationValidated,
    ).toBe(true);
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

  it('fails closed when two fit correspondences are mismatched', () => {
    const correspondences = cloneCorrespondences();
    const a = correspondences[0];
    const b = correspondences[1];
    if (!a || !b) {
      throw new Error('canonical fit fixture missing');
    }

    const temp = a.raw3DPoint;
    correspondences[0] = {
      ...a,
      raw3DPoint: b.raw3DPoint,
    };
    correspondences[1] = {
      ...b,
      raw3DPoint: temp,
    };

    const receipt = execute(correspondences);

    expect(receipt.acceptance.thresholdSatisfied).toBe(false);
    expect(
      receipt.syntheticIndependentRegistrationValidated,
    ).toBe(false);
    expect(receipt.r2fDisposition).toBe(
      'independent_registration_evidence_incomplete',
    );
  });

  it('fails closed when a held-out target is corrupted', () => {
    const correspondences = cloneCorrespondences();
    const heldOut = correspondences[8];
    if (!heldOut) {
      throw new Error('canonical held-out fixture missing');
    }

    const raw = cloneVec3(heldOut.raw3DPoint);
    raw[0] += 2;
    correspondences[8] = {
      ...heldOut,
      raw3DPoint: raw,
    };

    const receipt = execute(correspondences);

    expect(receipt.heldOutMaxResidualMm).toBeGreaterThan(1);
    expect(receipt.acceptance.thresholdSatisfied).toBe(false);
    expect(
      receipt.syntheticIndependentRegistrationValidated,
    ).toBe(false);
  });

  it('does not hide a 2 percent metric scale drift with similarity fitting', () => {
    const correspondences = cloneCorrespondences().map(
      (item) => ({
        ...item,
        rgbMetricPoint: [
          item.rgbMetricPoint[0] * 1.02,
          item.rgbMetricPoint[1] * 1.02,
          item.rgbMetricPoint[2] * 1.02,
        ] as const,
      }),
    );

    const receipt = execute(correspondences);

    expect(receipt.scaleFittingPerformed).toBe(false);
    expect(receipt.fitRmseMm).toBeGreaterThan(0.1);
    expect(receipt.acceptance.thresholdSatisfied).toBe(false);
    expect(
      receipt.syntheticIndependentRegistrationValidated,
    ).toBe(false);
  });

  it('rejects reflection as a rigid rotation solution', () => {
    const correspondences = cloneCorrespondences().map(
      (item) => ({
        ...item,
        rgbMetricPoint: [
          -item.rgbMetricPoint[0],
          item.rgbMetricPoint[1],
          item.rgbMetricPoint[2],
        ] as const,
      }),
    );

    const receipt = execute(correspondences);

    expect(receipt.rotationDeterminant).toBeCloseTo(1, 9);
    expect(receipt.acceptance.thresholdSatisfied).toBe(false);
    expect(
      receipt.syntheticIndependentRegistrationValidated,
    ).toBe(false);
  });

  it('rejects collinear fit geometry before solving', () => {
    let fitIndex = 0;
    const correspondences = cloneCorrespondences().map(
      (item) => {
        if (item.role !== 'fit') {
          return item;
        }
        const x = fitIndex * 10;
        fitIndex += 1;
        return {
          ...item,
          rgbMetricPoint: [x, 0, 500] as const,
        };
      },
    );

    expect(() => execute(correspondences)).toThrow(
      /non-collinear 3D geometry/,
    );
  });

  it('rejects fit and held-out identity overlap', () => {
    const correspondences = cloneCorrespondences();
    const heldOut = correspondences[8];
    if (!heldOut) {
      throw new Error('canonical held-out fixture missing');
    }

    correspondences[8] = {
      ...heldOut,
      pointRef: 'p0',
    };

    expect(() => execute(correspondences)).toThrow(
      /identities must be disjoint/,
    );
  });

  it('rejects non-finite correspondence geometry', () => {
    const correspondences = cloneCorrespondences();
    const first = correspondences[0];
    if (!first) {
      throw new Error('canonical fit fixture missing');
    }

    correspondences[0] = {
      ...first,
      rgbMetricPoint: [Number.NaN, 0, 500],
    };

    expect(() => execute(correspondences)).toThrow(
      /must be finite/,
    );
  });

  it('rejects provider landmarks as independent registration truth', () => {
    expect(() =>
      executeFR300R2GBSyntheticIndependentRegistration({
        schemaVersion:
          'fr300-r2g-b-independent-registration-input-v1',
        correspondences: cloneCorrespondences(),
        providerLandmarksUsedAsRegistrationTruth: true,
        providerLandmarksUsedAsFR266Truth: false,
        providerLandmarksUsedAsFR297Truth: false,
      }),
    ).toThrow(/provider landmarks may not issue/);
  });

  it('freezes the canonical receipt and provider-pending authority boundary', () => {
    expect(FR300_R2G_B_CANONICAL_RECEIPT).toMatchObject({
      artifactClass: 'synthetic_fixture',
      solver: 'horn_quaternion_rigid_v1',
      fitCount: 8,
      heldOutCount: 4,
      outputFinite: true,
      scaleFittingPerformed: false,
      heldOutValidationExecuted: true,
      acceptance: {
        preregistered: true,
        thresholdSatisfied: true,
      },
      r2fRegistrationValidatedForFR299Review: true,
      syntheticIndependentRegistrationValidated: true,
    });

    expect(FR300_R2G_B_CURRENT_GATE).toMatchObject({
      disposition:
        'synthetic_independent_registration_validated_provider_response_pending',
      providerResponseState: 'pending',
      syntheticIndependentRegistrationExecuted: true,
      syntheticHeldOutValidationPassed: true,
      scaleFittingPerformed: false,
      realParticipantArtifactUsed: false,
      realRegistrationValidatedForFR299Review: false,
      paidSpendAuthorized: false,
      fr299EligibleCandidateCount: 0,
      fr300R2EligibleCandidateCount: 0,
      productMaterialization: '18/29',
    });

    expect(() =>
      assertFR300R2GBSyntheticIndependentRegistrationContract(),
    ).not.toThrow();
  });
});
