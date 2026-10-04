import { describe, expect, it } from 'vitest';
import {
  FR317_CURRENT_GATE,
  FR317_SYNTHETIC_NUMERIC_TOLERANCE_CM,
  executeCalibratedSyntheticHairlineRegistrationFR317,
  executeIndependentSyntheticHairlineRegistrationFR317,
  assertFR317CurrentGate,
  type FR317IndependentSyntheticFixture,
} from './hairline-synthetic-registration-execution-fr317.js';
import type {
  FR316RegistrationAssessment,
  FR316RegistrationMethod,
} from './hairline-same-capture-registration-fr316.js';

function eligibleAssessment(
  method: FR316RegistrationMethod,
): FR316RegistrationAssessment {
  return {
    schemaVersion:
      'fr316-same-capture-hairline-registration-assessment-v1',
    contractVersion:
      'FR316-SAME-CAPTURE-HAIRLINE-REGISTRATION-v1',
    authorityState:
      'registration_evidence_adjudication_only',
    artifactClass: 'synthetic_fixture',
    method,
    predecessorReady: true,
    exactSameCaptureBindingComplete: true,
    metricScaleAuthorityComplete: true,
    selectedRegistrationEvidenceComplete: true,
    hairlineSupportRegionVerified: true,
    privateEvidenceRemainedLocal: true,
    disposition:
      'eligible_for_local_hairline_metric_mapping_execution',
    eligibleForLocalHairlineMetricMappingExecution:
      true,
    truthBoundary: {
      providerLandmarksUsedAsRegistrationTruth: false,
      unrelatedAstRegistrationUsedAsAuthority: false,
      imageNormalizedCoordinateRelabeledAsMetric: false,
      unknownScaleFittingAuthorized: false,
      twoDimensionalHomographyAuthorizedAsMetricDepthTruth:
        false,
    },
    authorityBoundary: {
      hairlineMetricCoordinateIssued: false,
      imageToMetricBridgeIssued: false,
      commonFrameComplete: false,
      mixedFrameSpanAuthorized: false,
      threeDivisionsSpanExecutionReady: false,
      traditionalBindingIssued: false,
      productColumnMaterialized: false,
      productionActivated: false,
      commerceActivated: false,
    },
    nextAction:
      'fr317_local_metric_mapping_execution_review',
  };
}

function independentFixture(): FR317IndependentSyntheticFixture {
  return {
    schemaVersion:
      'fr317-independent-synthetic-fixture-v1',
    fitCorrespondences: [
      {
        source: { x: 0.2, y: 0.2 },
        target: { xCm: -3.6, yCm: -1.0 },
      },
      {
        source: { x: 0.8, y: 0.2 },
        target: { xCm: 2.4, yCm: -2.8 },
      },
      {
        source: { x: 0.5, y: 0.8 },
        target: { xCm: 0.6, yCm: 2.9 },
      },
    ],
    heldOutCorrespondences: [
      {
        source: { x: 0.5, y: 0.4 },
        target: { xCm: -0.2, yCm: -0.3 },
      },
      {
        source: { x: 0.4, y: 0.5 },
        target: { xCm: -1.0, yCm: 0.8 },
      },
    ],
    queryPoints: [
      {
        source: { x: 0.45, y: 0.35 },
        expectedTarget: { xCm: -0.8, yCm: -0.55 },
      },
      {
        source: { x: 0.55, y: 0.5 },
        expectedTarget: { xCm: 0.5, yCm: 0.35 },
      },
    ],
  };
}

describe('FR317 synthetic same-capture registration execution', () => {
  it('keeps the synthetic numeric tolerance isolated from real authority', () => {
    expect(
      FR317_SYNTHETIC_NUMERIC_TOLERANCE_CM,
    ).toBe(1e-9);
    expect(
      FR317_CURRENT_GATE.realRegistrationAuthorityIssued,
    ).toBe(false);
  });

  it('round-trips calibrated pinhole-plane synthetic points to known metric truth', () => {
    const result =
      executeCalibratedSyntheticHairlineRegistrationFR317(
        eligibleAssessment(
          'exact_calibrated_surface_registration',
        ),
        {
          schemaVersion:
            'fr317-calibrated-synthetic-fixture-v1',
          planeZCm: 10,
          intrinsics: {
            fx: 1.2,
            fy: 1.1,
            cx: 0.5,
            cy: 0.5,
          },
          exactRgbToMetricExtrinsicsIdentity: true,
          releasedImageTransformIdentity: true,
          metricTruthPoints: [
            { xCm: -2.0, yCm: 1.5 },
            { xCm: 0.0, yCm: 2.0 },
            { xCm: 2.2, yCm: 1.0 },
          ],
        },
      );

    expect(result).toEqual({
      schemaVersion:
        'fr317-synthetic-registration-execution-receipt-v1',
      contractVersion:
        'FR317-SYNTHETIC-HAIRLINE-REGISTRATION-EXECUTION-v1',
      authorityState:
        'synthetic_execution_validation_only',
      syntheticOnly: true,
      method:
        'exact_calibrated_surface_registration',
      status: 'passed',
      recoveredPointCount: 3,
      calibratedRoundTripPass: true,
      syntheticGroundTruthComparisonPass: true,
      authorityBoundary: {
        realRegistrationAuthorityIssued: false,
        realHairlineMetricCoordinateIssued: false,
        imageToMetricBridgeIssued: false,
        actualNeutralReferenceCapabilityRaisedToSeven:
          false,
        commonFrameComplete: false,
        mixedFrameSpanAuthorized: false,
        threeDivisionsSpanExecutionReady: false,
        traditionalBindingIssued: false,
        productColumnMaterialized: false,
        productionActivated: false,
        commerceActivated: false,
      },
      nextAction:
        'fr318_real_local_execution_receipt_contract',
    });
  });

  it('rejects calibrated fixtures whose projected point leaves the governed normalized image frame', () => {
    expect(() =>
      executeCalibratedSyntheticHairlineRegistrationFR317(
        eligibleAssessment(
          'exact_calibrated_surface_registration',
        ),
        {
          schemaVersion:
            'fr317-calibrated-synthetic-fixture-v1',
          planeZCm: 10,
          intrinsics: {
            fx: 2,
            fy: 2,
            cx: 0.5,
            cy: 0.5,
          },
          exactRgbToMetricExtrinsicsIdentity: true,
          releasedImageTransformIdentity: true,
          metricTruthPoints: [
            { xCm: 4.0, yCm: 0 },
            { xCm: 0, yCm: 1 },
          ],
        },
      ),
    ).toThrow(/normalized image bounds/);
  });

  it('recovers independent affine synthetic queries only after held-out validation', () => {
    const result =
      executeIndependentSyntheticHairlineRegistrationFR317(
        eligibleAssessment(
          'independent_correspondence_registration',
        ),
        independentFixture(),
      );

    expect(result).toMatchObject({
      syntheticOnly: true,
      method:
        'independent_correspondence_registration',
      status: 'passed',
      recoveredPointCount: 2,
      heldOutValidationPass: true,
      queryEnvelopePass: true,
      syntheticGroundTruthComparisonPass: true,
      nextAction:
        'fr318_real_local_execution_receipt_contract',
    });

    expect(result.authorityBoundary).toEqual({
      realRegistrationAuthorityIssued: false,
      realHairlineMetricCoordinateIssued: false,
      imageToMetricBridgeIssued: false,
      actualNeutralReferenceCapabilityRaisedToSeven:
        false,
      commonFrameComplete: false,
      mixedFrameSpanAuthorized: false,
      threeDivisionsSpanExecutionReady: false,
      traditionalBindingIssued: false,
      productColumnMaterialized: false,
      productionActivated: false,
      commerceActivated: false,
    });
  });

  it('fails independent execution when held-out truth does not agree with the fitted mapping', () => {
    const fixture = independentFixture();
    const result =
      executeIndependentSyntheticHairlineRegistrationFR317(
        eligibleAssessment(
          'independent_correspondence_registration',
        ),
        {
          ...fixture,
          heldOutCorrespondences: [
            {
              ...fixture.heldOutCorrespondences[0]!,
              target: { xCm: 99, yCm: 99 },
            },
            fixture.heldOutCorrespondences[1]!,
          ],
        },
      );

    expect(result).toMatchObject({
      status: 'failed',
      heldOutValidationPass: false,
      nextAction:
        'repair_synthetic_independent_execution_without_authority_expansion',
    });
    expect(
      result.authorityBoundary
        .realRegistrationAuthorityIssued,
    ).toBe(false);
  });

  it('fails independent execution when a hairline query falls outside the validated correspondence envelope', () => {
    const fixture = independentFixture();
    const result =
      executeIndependentSyntheticHairlineRegistrationFR317(
        eligibleAssessment(
          'independent_correspondence_registration',
        ),
        {
          ...fixture,
          queryPoints: [
            fixture.queryPoints[0]!,
            {
              source: { x: 0.95, y: 0.95 },
              expectedTarget: {
                xCm: 5.4,
                yCm: 2.75,
              },
            },
          ],
        },
      );

    expect(result).toMatchObject({
      status: 'failed',
      queryEnvelopePass: false,
      nextAction:
        'repair_synthetic_independent_execution_without_authority_expansion',
    });
  });

  it('rejects a real-local FR316 assessment from the synthetic executor', () => {
    const assessment = {
      ...eligibleAssessment(
        'exact_calibrated_surface_registration',
      ),
      artifactClass: 'real_local_capture',
    } as FR316RegistrationAssessment;

    expect(() =>
      executeCalibratedSyntheticHairlineRegistrationFR317(
        assessment,
        {
          schemaVersion:
            'fr317-calibrated-synthetic-fixture-v1',
          planeZCm: 10,
          intrinsics: {
            fx: 1,
            fy: 1,
            cx: 0.5,
            cy: 0.5,
          },
          exactRgbToMetricExtrinsicsIdentity: true,
          releasedImageTransformIdentity: true,
          metricTruthPoints: [
            { xCm: -1, yCm: 1 },
            { xCm: 1, yCm: 1 },
          ],
        },
      ),
    ).toThrow(
      /FR316 synthetic execution prerequisite not satisfied/,
    );
  });

  it('rejects a degenerate independent fit triangle', () => {
    const fixture = independentFixture();

    expect(() =>
      executeIndependentSyntheticHairlineRegistrationFR317(
        eligibleAssessment(
          'independent_correspondence_registration',
        ),
        {
          ...fixture,
          fitCorrespondences: [
            {
              source: { x: 0.2, y: 0.2 },
              target: { xCm: 0, yCm: 0 },
            },
            {
              source: { x: 0.4, y: 0.4 },
              target: { xCm: 1, yCm: 1 },
            },
            {
              source: { x: 0.6, y: 0.6 },
              target: { xCm: 2, yCm: 2 },
            },
          ],
        },
      ),
    ).toThrow(/fit source triangle is degenerate/);
  });

  it('keeps the repository current gate at actual six of seven with no real bridge', () => {
    expect(FR317_CURRENT_GATE).toMatchObject({
      parentIssue: 1521,
      syntheticExecutionImplemented: true,
      calibratedSyntheticPathImplemented: true,
      independentSyntheticPathImplemented: true,
      realRegistrationAuthorityIssued: false,
      hairlineImageToMetricBridgeIssued: false,
      commonFrameComplete: false,
      actualNeutralReferenceCapabilityCount: 6,
      actualRemainingNeutralReferenceCapabilityCount: 1,
      metricFrameReadyReferenceCapabilityCount: 6,
      remainingMetricFrameBridgeCapabilityCount: 1,
      traditionalBindingAdmittedCount: 0,
      threeDivisionsSpanExecutionReady: false,
      productMaterializedCount: 18,
      productionActivated: false,
      commerceActivated: false,
    });

    expect(() => assertFR317CurrentGate()).not.toThrow();
  });
});
