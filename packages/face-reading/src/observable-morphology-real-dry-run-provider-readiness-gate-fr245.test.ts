import { describe, expect, it } from 'vitest';
import {
  FR245_NEXT_FRONTIER,
  assertRealDryRunProviderReadinessBlockedFR245,
  assessRealDryRunProviderReadinessFR245,
} from './observable-morphology-real-dry-run-provider-readiness-gate-fr245.js';

describe('FR245 real dry-run provider readiness gate', () => {
  it('recognizes merged FR244 transport while keeping real FR243 execution blocked', () => {
    const readiness = assessRealDryRunProviderReadinessFR245();

    expect(readiness.transport.browserLiveCameraToEphemeralJpegReady).toBe(true);
    expect(readiness.transport.explicitOperatorTriggerRequired).toBe(true);
    expect(readiness.transport.sourceJpegZeroizedAfterFR243).toBe(true);
    expect(readiness.transport.cameraOwnershipRetainedByCaller).toBe(true);
    expect(readiness.executionGate.realFR243ExecutionReady).toBe(false);
    expect(readiness.executionGate.failClosed).toBe(true);
    expect(() => assertRealDryRunProviderReadinessBlockedFR245(readiness)).not.toThrow();
  });

  it('keeps all six preregistered quality checks explicit without inventing acceptance rules', () => {
    const readiness = assessRealDryRunProviderReadinessFR245();

    expect(readiness.quality.requiredCheckCount).toBe(6);
    expect(readiness.quality.checks.map((entry) => entry.check)).toEqual([
      'single_face',
      'frontal_pose',
      'sharpness',
      'bilateral_eye_region_visibility',
      'bilateral_eye_landmark_coverage',
      'major_eye_region_occlusion_absent',
    ]);
    expect(readiness.quality.checks.every(
      (entry) => entry.governedAcceptanceRuleIssued === false,
    )).toBe(true);
    expect(readiness.quality.syntheticPassAllCallbackAllowedForRealExecution).toBe(false);
    expect(readiness.quality.automaticQualityGateCurrentlyAuthorized).toBe(false);
    expect(readiness.quality.numericCaptureQualityThresholdIssued).toBe(false);
  });

  it('distinguishes mechanically observable checks from unresolved operationalizations', () => {
    const readiness = assessRealDryRunProviderReadinessFR245();
    const byCheck = Object.fromEntries(
      readiness.quality.checks.map((entry) => [entry.check, entry.state]),
    );

    expect(byCheck.single_face).toBe(
      'mechanically_observable_not_quality_validated',
    );
    expect(byCheck.bilateral_eye_landmark_coverage).toBe(
      'mechanically_observable_not_quality_validated',
    );
    expect(byCheck.frontal_pose).toBe('unresolved_operationalization');
    expect(byCheck.sharpness).toBe('unresolved_operationalization');
    expect(byCheck.bilateral_eye_region_visibility).toBe(
      'unresolved_operationalization',
    );
    expect(byCheck.major_eye_region_occlusion_absent).toBe(
      'unresolved_operationalization',
    );
  });

  it('freezes the primary-metric provider/privacy mismatch instead of bypassing it', () => {
    const readiness = assessRealDryRunProviderReadinessFR245();

    expect(readiness.primaryMetric.metricRef)
      .toBe('neutral.eye.outer_corner_tilt.mean_degrees@0.1.0');
    expect(readiness.primaryMetric.formulaSurfaceAvailableThroughFR208FR209).toBe(true);
    expect(
      readiness.primaryMetric.existingFR77ProviderGeometryRequiresCanonicalAssetDigest,
    ).toBe(true);
    expect(
      readiness.primaryMetric.fr242CurrentResultContractRequiresRawImageDigestComputedFalse,
    ).toBe(true);
    expect(
      readiness.primaryMetric.directFR77ReuseInsideCurrentFR242BoundaryAuthorized,
    ).toBe(false);
    expect(
      readiness.primaryMetric.privacyCompatibleSameFrameProviderBindingIssued,
    ).toBe(false);
    expect(
      readiness.primaryMetric.executableSameFrameProviderMetricBindingReady,
    ).toBe(false);
  });

  it('retains non-empirical and non-product authority', () => {
    const readiness = assessRealDryRunProviderReadinessFR245();

    expect(readiness.authorityBoundary.captureQualityValidated).toBe(false);
    expect(readiness.authorityBoundary.empiricalRepeatabilityEstablished).toBe(false);
    expect(readiness.authorityBoundary.interpretationValidityEstablished).toBe(false);
    expect(readiness.authorityBoundary.traditionalBindingIssued).toBe(false);
    expect(readiness.authorityBoundary.productionActivated).toBe(false);
    expect(readiness.authorityBoundary.commerceActivated).toBe(false);
    expect(readiness.nextFrontier).toBe(FR245_NEXT_FRONTIER);
  });
});
