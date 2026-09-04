import { describe, expect, it } from 'vitest';
import {
  FR143_NEXT_FRONTIER,
  assessSquareBroadFangNeutralCandidateMetricSyntheticVerificationFR143,
  assertIssuedSquareBroadFangNeutralCandidateMetricSyntheticVerificationFR143,
  getSquareBroadFangSyntheticFixtureCyclesFR143,
} from './five-officers-square-broad-fang-neutral-candidate-metric-synthetic-verification-fr143.js';
import {
  computeSquareBroadFangNeutralCandidateKernelFR142,
  type NeutralClosedCyclePointFR142V1,
} from './five-officers-square-broad-fang-neutral-candidate-metric-runtime-fr142.js';

function transform(
  contours: readonly (readonly NeutralClosedCyclePointFR142V1[])[],
  fn: (point: NeutralClosedCyclePointFR142V1) => NeutralClosedCyclePointFR142V1,
): readonly (readonly NeutralClosedCyclePointFR142V1[])[] {
  return Object.freeze(contours.map((contour) => Object.freeze(contour.map((point) => Object.freeze(fn(point))))));
}

function expectKernelClose(
  left: ReturnType<typeof computeSquareBroadFangNeutralCandidateKernelFR142>,
  right: ReturnType<typeof computeSquareBroadFangNeutralCandidateKernelFR142>,
): void {
  expect(left.horizontalReflectionNearestSetResidualRatio)
    .toBeCloseTo(right.horizontalReflectionNearestSetResidualRatio, 12);
  expect(left.orthogonalEdgeOrientationConcentration)
    .toBeCloseTo(right.orthogonalEdgeOrientationConcentration, 12);
  expect(left.turningAngleConcentrationIndex)
    .toBeCloseTo(right.turningAngleConcentrationIndex, 12);
}

describe('FR143 square-broad 方 neutral candidate synthetic verification', () => {
  it('issues a synthetic-only verification artifact with no construct-validity or traditional promotion', () => {
    const result = assessSquareBroadFangNeutralCandidateMetricSyntheticVerificationFR143();
    assertIssuedSquareBroadFangNeutralCandidateMetricSyntheticVerificationFR143(result);

    expect(result.authorityState).toBe(
      'square_broad_fang_neutral_candidate_metrics_synthetically_verified_for_numeric_behavior_no_construct_validity',
    );
    expect(result.fixtures).toHaveLength(4);
    expect(result.fixtures.every((fixture) => fixture.sourceClass === 'synthetic_geometry_only')).toBe(true);
    expect(result.fixtures.every((fixture) => fixture.traditionalLabel === null)).toBe(true);
    expect(result.fixtures.every((fixture) => fixture.humanSemanticLabel === null)).toBe(true);
    expect(result.fixtures.every((fixture) => fixture.empiricalCapture === false)).toBe(true);
    expect(result.evidenceBoundary.syntheticDiscriminationMeansConstructValidity).toBe(false);
    expect(result.evidenceBoundary.syntheticFixtureMeansTraditionalClass).toBe(false);
    expect(result.execution.traditionalSemanticAuthority).toBe(false);
    expect(result.nextFrontier).toBe(FR143_NEXT_FRONTIER);
  });

  it('records deterministic, threshold-free qualitative relations across the synthetic fixture panel', () => {
    const result = assessSquareBroadFangNeutralCandidateMetricSyntheticVerificationFR143();
    const circle = result.fixtures.find((fixture) => fixture.fixtureRef === 'synthetic.face.mouth.circle_regular_20')!;
    const rectangle = result.fixtures.find((fixture) => fixture.fixtureRef === 'synthetic.face.mouth.rectangle_piecewise_20')!;
    const ellipse = result.fixtures.find((fixture) => fixture.fixtureRef === 'synthetic.face.mouth.ellipse_horizontal_20')!;
    const asymmetric = result.fixtures.find((fixture) => fixture.fixtureRef === 'synthetic.face.mouth.asymmetric_ellipse_20')!;

    expect(result.syntheticRelations.deterministicRepeatabilityObserved).toBe(true);
    expect(rectangle.metricValues.orthogonalEdgeOrientationConcentration)
      .toBeGreaterThan(circle.metricValues.orthogonalEdgeOrientationConcentration);
    expect(rectangle.metricValues.turningAngleConcentrationIndex)
      .toBeGreaterThan(circle.metricValues.turningAngleConcentrationIndex);
    expect(asymmetric.metricValues.horizontalReflectionNearestSetResidualRatio)
      .toBeGreaterThan(ellipse.metricValues.horizontalReflectionNearestSetResidualRatio);
    expect(result.transformationVerificationPolicy.numericAcceptanceTolerancePersisted).toBeNull();
    expect(result.execution.numericClassificationThresholdsIssued).toBe(0);
  });

  it('is repeatable for exact identical geometry', () => {
    const cycles = getSquareBroadFangSyntheticFixtureCyclesFR143('synthetic.face.mouth.ellipse_horizontal_20');
    const first = computeSquareBroadFangNeutralCandidateKernelFR142(cycles);
    const second = computeSquareBroadFangNeutralCandidateKernelFR142(cycles);
    expect(second).toEqual(first);
  });

  it('preserves all three metric values under translation and uniform positive scale', () => {
    const cycles = getSquareBroadFangSyntheticFixtureCyclesFR143('synthetic.face.mouth.asymmetric_ellipse_20');
    const baseline = computeSquareBroadFangNeutralCandidateKernelFR142(cycles);
    const translated = computeSquareBroadFangNeutralCandidateKernelFR142(transform(
      cycles,
      (point) => ({ x: point.x + 7.25, y: point.y - 3.5 }),
    ));
    const scaled = computeSquareBroadFangNeutralCandidateKernelFR142(transform(
      cycles,
      (point) => ({ x: point.x * 4, y: point.y * 4 }),
    ));

    expectKernelClose(baseline, translated);
    expectKernelClose(baseline, scaled);
  });

  it('keeps orientation and turning concentration rotation-invariant while documenting horizontal-axis dependence', () => {
    const cycles = getSquareBroadFangSyntheticFixtureCyclesFR143('synthetic.face.mouth.asymmetric_ellipse_20');
    const baseline = computeSquareBroadFangNeutralCandidateKernelFR142(cycles);
    const angle = 0.37;
    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);
    const rotated = computeSquareBroadFangNeutralCandidateKernelFR142(transform(
      cycles,
      (point) => ({
        x: (point.x * cosine) - (point.y * sine),
        y: (point.x * sine) + (point.y * cosine),
      }),
    ));
    const result = assessSquareBroadFangNeutralCandidateMetricSyntheticVerificationFR143();

    expect(rotated.orthogonalEdgeOrientationConcentration)
      .toBeCloseTo(baseline.orthogonalEdgeOrientationConcentration, 12);
    expect(rotated.turningAngleConcentrationIndex)
      .toBeCloseTo(baseline.turningAngleConcentrationIndex, 12);
    expect(result.transformationVerificationPolicy.orthogonalOrientationConcentrationGlobalRotationInvariant).toBe(true);
    expect(result.transformationVerificationPolicy.turningAngleConcentrationGlobalRotationInvariant).toBe(true);
    expect(result.transformationVerificationPolicy.horizontalReflectionResidualGlobalRotationInvariant).toBe(false);
    expect(result.transformationVerificationPolicy.horizontalReflectionResidualUsesCanonicalHorizontalAxis).toBe(true);
  });

  it('does not emit empirical, semantic, calibration, threshold, state, claim, or narrative authority', () => {
    const result = assessSquareBroadFangNeutralCandidateMetricSyntheticVerificationFR143();
    expect(result.execution.empiricalCaptureRecordsIssued).toBe(0);
    expect(result.execution.humanSemanticLabelsIssued).toBe(0);
    expect(result.execution.traditionalMetricBindingsIssued).toBe(0);
    expect(result.execution.calibrationProtocolsIssued).toBe(0);
    expect(result.execution.numericClassificationThresholdsIssued).toBe(0);
    expect(result.execution.criterionStatesIssued).toBe(0);
    expect(result.execution.structuredClaimsIssued).toBe(0);
    expect(result.execution.boundedNarrativesIssued).toBe(0);
    expect(result.evidenceBoundary.syntheticFixtureMayBeUsedAsGroundTruthHumanLabel).toBe(false);
    expect(result.evidenceBoundary.syntheticFixtureMayBeUsedForCalibration).toBe(false);
  });
});
