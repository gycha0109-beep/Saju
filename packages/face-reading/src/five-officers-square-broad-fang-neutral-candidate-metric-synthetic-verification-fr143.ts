import {
  FR142_NEXT_FRONTIER,
  computeSquareBroadFangNeutralCandidateKernelFR142,
  getSquareBroadFangNeutralCandidateMetricDefinitionsFR142,
  type NeutralClosedCyclePointFR142V1,
  type SquareBroadFangNeutralCandidateKernelFR142V1,
} from './five-officers-square-broad-fang-neutral-candidate-metric-runtime-fr142.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR143_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr143-square-broad-fang-neutral-candidate-metric-synthetic-verification.md' as const;
export const FR143_NEXT_FRONTIER =
  'square_broad_fang_real_capture_neutral_metric_repeatability_acquisition_extension_without_semantic_labels' as const;

const CORRESPONDENCE_REF =
  'neutral.mouth.contour_set.horizontal_reflection_nearest_set_residual_ratio@0.1.0' as const;
const ORTHOGONALITY_REF =
  'neutral.mouth.contour_set.orthogonal_edge_orientation_concentration@0.1.0' as const;
const TURN_CONCENTRATION_REF =
  'neutral.mouth.contour_set.turning_angle_concentration_index@0.1.0' as const;

export type FR143SyntheticFixtureRef =
  | 'synthetic.face.mouth.circle_regular_20'
  | 'synthetic.face.mouth.ellipse_horizontal_20'
  | 'synthetic.face.mouth.rectangle_piecewise_20'
  | 'synthetic.face.mouth.asymmetric_ellipse_20';

export interface SquareBroadFangSyntheticFixtureMeasurementFR143V1 {
  readonly fixtureRef: FR143SyntheticFixtureRef;
  readonly fixturePurpose:
    | 'smooth_isotropic_reference'
    | 'smooth_horizontal_anisotropy_reference'
    | 'piecewise_rectilinear_reference'
    | 'controlled_horizontal_reflection_asymmetry_reference';
  readonly sourceClass: 'synthetic_geometry_only';
  readonly traditionalLabel: null;
  readonly humanSemanticLabel: null;
  readonly empiricalCapture: false;
  readonly metricValues: SquareBroadFangNeutralCandidateKernelFR142V1;
}

export interface SquareBroadFangSyntheticVerificationFR143V1 {
  readonly schemaVersion: 'fr143-square-broad-fang-neutral-candidate-metric-synthetic-verification-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'square_broad_fang_neutral_candidate_metrics_synthetically_verified_for_numeric_behavior_no_construct_validity';
  readonly predecessor: {
    readonly fr142NextFrontier: typeof FR142_NEXT_FRONTIER;
    readonly metricRefs: readonly [
      typeof CORRESPONDENCE_REF,
      typeof ORTHOGONALITY_REF,
      typeof TURN_CONCENTRATION_REF,
    ];
    readonly metricDefinitionsRemainTraditionallyUnbound: true;
    readonly metricDefinitionsRemainUncalibrated: true;
    readonly metricDefinitionsRemainWithoutClassificationThreshold: true;
  };
  readonly fixtures: readonly [
    SquareBroadFangSyntheticFixtureMeasurementFR143V1,
    SquareBroadFangSyntheticFixtureMeasurementFR143V1,
    SquareBroadFangSyntheticFixtureMeasurementFR143V1,
    SquareBroadFangSyntheticFixtureMeasurementFR143V1,
  ];
  readonly syntheticRelations: {
    readonly deterministicRepeatabilityObserved: true;
    readonly rectangleOrthogonalOrientationConcentrationGreaterThanCircle: true;
    readonly rectangleTurningAngleConcentrationGreaterThanCircle: true;
    readonly asymmetricReflectionResidualGreaterThanSymmetricEllipse: true;
    readonly fixturePanelContainsDistinctMetricSignatures: true;
  };
  readonly transformationVerificationPolicy: {
    readonly translationInvarianceExpected: true;
    readonly uniformPositiveScaleInvarianceExpected: true;
    readonly cycleStartInvarianceInheritedFromFR142: true;
    readonly cycleDirectionInvarianceInheritedFromFR142: true;
    readonly componentOrderInvarianceInheritedFromFR142: true;
    readonly orthogonalOrientationConcentrationGlobalRotationInvariant: true;
    readonly turningAngleConcentrationGlobalRotationInvariant: true;
    readonly horizontalReflectionResidualGlobalRotationInvariant: false;
    readonly horizontalReflectionResidualUsesCanonicalHorizontalAxis: true;
    readonly numericAcceptanceTolerancePersisted: null;
  };
  readonly evidenceBoundary: {
    readonly syntheticFixtureMeansTraditionalClass: false;
    readonly syntheticDiscriminationMeansConstructValidity: false;
    readonly syntheticRepeatabilityMeansEmpiricalCaptureRepeatability: false;
    readonly metricSeparationMeansTraditionalCriterionBinding: false;
    readonly syntheticFixtureMayBeUsedAsGroundTruthHumanLabel: false;
    readonly syntheticFixtureMayBeUsedForCalibration: false;
  };
  readonly execution: {
    readonly syntheticFixturesIssued: 4;
    readonly syntheticMetricMeasurementsIssued: 12;
    readonly empiricalCaptureRecordsIssued: 0;
    readonly humanSemanticLabelsIssued: 0;
    readonly traditionalMetricBindingsIssued: 0;
    readonly calibrationProtocolsIssued: 0;
    readonly numericClassificationThresholdsIssued: 0;
    readonly criterionStatesIssued: 0;
    readonly structuredClaimsIssued: 0;
    readonly boundedNarrativesIssued: 0;
    readonly traditionalSemanticAuthority: false;
  };
  readonly researchNoteRef: typeof FR143_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR143_NEXT_FRONTIER;
}

const ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-143 ${message}`);
}

function freezeCycle(points: readonly NeutralClosedCyclePointFR142V1[]): readonly NeutralClosedCyclePointFR142V1[] {
  return Object.freeze(points.map((point) => Object.freeze({ x: point.x, y: point.y })));
}

function circle(scale: number): readonly NeutralClosedCyclePointFR142V1[] {
  return freezeCycle(Array.from({ length: 20 }, (_, index) => {
    const theta = (2 * Math.PI * index) / 20;
    return { x: scale * Math.cos(theta), y: scale * Math.sin(theta) };
  }));
}

function ellipse(scaleX: number, scaleY: number): readonly NeutralClosedCyclePointFR142V1[] {
  return freezeCycle(Array.from({ length: 20 }, (_, index) => {
    const theta = (2 * Math.PI * index) / 20;
    return { x: scaleX * Math.cos(theta), y: scaleY * Math.sin(theta) };
  }));
}

function rectangle(scale: number): readonly NeutralClosedCyclePointFR142V1[] {
  const corners = [
    [-2 * scale, -scale],
    [2 * scale, -scale],
    [2 * scale, scale],
    [-2 * scale, scale],
  ] as const;
  const points: NeutralClosedCyclePointFR142V1[] = [];
  for (let side = 0; side < 4; side += 1) {
    const start = corners[side]!;
    const end = corners[(side + 1) % 4]!;
    for (let step = 0; step < 5; step += 1) {
      const t = step / 5;
      points.push({
        x: start[0] + ((end[0] - start[0]) * t),
        y: start[1] + ((end[1] - start[1]) * t),
      });
    }
  }
  return freezeCycle(points);
}

function asymmetricEllipse(scaleX: number, scaleY: number): readonly NeutralClosedCyclePointFR142V1[] {
  const points = ellipse(scaleX, scaleY).map((point) => ({ x: point.x, y: point.y }));
  const third = points[3]!;
  points[3] = { x: third.x + (0.11 * scaleX), y: third.y + (0.31 * scaleY) };
  const fourth = points[4]!;
  points[4] = { x: fourth.x + (0.07 * scaleX), y: fourth.y + (0.17 * scaleY) };
  return freezeCycle(points);
}

function pair(
  outer: readonly NeutralClosedCyclePointFR142V1[],
  inner: readonly NeutralClosedCyclePointFR142V1[],
): readonly [readonly NeutralClosedCyclePointFR142V1[], readonly NeutralClosedCyclePointFR142V1[]] {
  return Object.freeze([outer, inner] as const);
}

export function getSquareBroadFangSyntheticFixtureCyclesFR143(
  fixtureRef: FR143SyntheticFixtureRef,
): readonly [readonly NeutralClosedCyclePointFR142V1[], readonly NeutralClosedCyclePointFR142V1[]] {
  switch (fixtureRef) {
    case 'synthetic.face.mouth.circle_regular_20':
      return pair(circle(2), circle(1.35));
    case 'synthetic.face.mouth.ellipse_horizontal_20':
      return pair(ellipse(2.4, 0.8), ellipse(1.65, 0.55));
    case 'synthetic.face.mouth.rectangle_piecewise_20':
      return pair(rectangle(1), rectangle(0.7));
    case 'synthetic.face.mouth.asymmetric_ellipse_20':
      return pair(asymmetricEllipse(2.4, 0.8), asymmetricEllipse(1.65, 0.55));
  }
}

function measureFixture(
  fixtureRef: FR143SyntheticFixtureRef,
  fixturePurpose: SquareBroadFangSyntheticFixtureMeasurementFR143V1['fixturePurpose'],
): SquareBroadFangSyntheticFixtureMeasurementFR143V1 {
  return Object.freeze({
    fixtureRef,
    fixturePurpose,
    sourceClass: 'synthetic_geometry_only' as const,
    traditionalLabel: null,
    humanSemanticLabel: null,
    empiricalCapture: false as const,
    metricValues: computeSquareBroadFangNeutralCandidateKernelFR142(
      getSquareBroadFangSyntheticFixtureCyclesFR143(fixtureRef),
    ),
  });
}

function sameKernel(
  left: SquareBroadFangNeutralCandidateKernelFR142V1,
  right: SquareBroadFangNeutralCandidateKernelFR142V1,
): boolean {
  return left.horizontalReflectionNearestSetResidualRatio === right.horizontalReflectionNearestSetResidualRatio
    && left.orthogonalEdgeOrientationConcentration === right.orthogonalEdgeOrientationConcentration
    && left.turningAngleConcentrationIndex === right.turningAngleConcentrationIndex;
}

function distinctSignatureCount(
  fixtures: readonly SquareBroadFangSyntheticFixtureMeasurementFR143V1[],
): number {
  return new Set(fixtures.map((fixture) => {
    const value = fixture.metricValues;
    return [
      value.horizontalReflectionNearestSetResidualRatio,
      value.orthogonalEdgeOrientationConcentration,
      value.turningAngleConcentrationIndex,
    ].join('|');
  })).size;
}

function validateFR142Definitions(): readonly [typeof CORRESPONDENCE_REF, typeof ORTHOGONALITY_REF, typeof TURN_CONCENTRATION_REF] {
  const definitions = getSquareBroadFangNeutralCandidateMetricDefinitionsFR142();
  const refs = definitions.map((definition) => definition.metricRef);
  if (
    refs[0] !== CORRESPONDENCE_REF
    || refs[1] !== ORTHOGONALITY_REF
    || refs[2] !== TURN_CONCENTRATION_REF
  ) fail('FR-142 metric definition order or refs drifted.');
  for (const definition of definitions) {
    if (
      definition.traditionalCriterionBindingRef !== null
      || definition.calibrationRef !== null
      || definition.numericClassificationThreshold !== null
      || definition.outerInnerAnatomicalRoleRequired !== false
      || definition.providerVertexIdentityRequired !== false
      || definition.namedMouthCornerRequired !== false
    ) fail('FR-142 neutral metric authority boundary widened.');
  }
  return Object.freeze([CORRESPONDENCE_REF, ORTHOGONALITY_REF, TURN_CONCENTRATION_REF] as const);
}

export function assessSquareBroadFangNeutralCandidateMetricSyntheticVerificationFR143(): SquareBroadFangSyntheticVerificationFR143V1 {
  const metricRefs = validateFR142Definitions();
  const circleFixture = measureFixture(
    'synthetic.face.mouth.circle_regular_20',
    'smooth_isotropic_reference',
  );
  const ellipseFixture = measureFixture(
    'synthetic.face.mouth.ellipse_horizontal_20',
    'smooth_horizontal_anisotropy_reference',
  );
  const rectangleFixture = measureFixture(
    'synthetic.face.mouth.rectangle_piecewise_20',
    'piecewise_rectilinear_reference',
  );
  const asymmetricFixture = measureFixture(
    'synthetic.face.mouth.asymmetric_ellipse_20',
    'controlled_horizontal_reflection_asymmetry_reference',
  );
  const fixtures = Object.freeze([
    circleFixture,
    ellipseFixture,
    rectangleFixture,
    asymmetricFixture,
  ] as const);

  const repeatedRectangle = computeSquareBroadFangNeutralCandidateKernelFR142(
    getSquareBroadFangSyntheticFixtureCyclesFR143('synthetic.face.mouth.rectangle_piecewise_20'),
  );
  if (!sameKernel(rectangleFixture.metricValues, repeatedRectangle)) {
    fail('deterministic repeatability failed for the exact same synthetic rectangle fixture.');
  }
  if (!(
    rectangleFixture.metricValues.orthogonalEdgeOrientationConcentration
    > circleFixture.metricValues.orthogonalEdgeOrientationConcentration
  )) fail('rectangle synthetic fixture must have greater orthogonal orientation concentration than circle fixture.');
  if (!(
    rectangleFixture.metricValues.turningAngleConcentrationIndex
    > circleFixture.metricValues.turningAngleConcentrationIndex
  )) fail('rectangle synthetic fixture must have greater turning-angle concentration than circle fixture.');
  if (!(
    asymmetricFixture.metricValues.horizontalReflectionNearestSetResidualRatio
    > ellipseFixture.metricValues.horizontalReflectionNearestSetResidualRatio
  )) fail('controlled asymmetric fixture must have greater horizontal-reflection residual than symmetric ellipse fixture.');
  if (distinctSignatureCount(fixtures) < 3) {
    fail('synthetic fixture panel must expose multiple distinct three-metric signatures.');
  }

  const result: SquareBroadFangSyntheticVerificationFR143V1 = Object.freeze({
    schemaVersion: 'fr143-square-broad-fang-neutral-candidate-metric-synthetic-verification-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'square_broad_fang_neutral_candidate_metrics_synthetically_verified_for_numeric_behavior_no_construct_validity' as const,
    predecessor: Object.freeze({
      fr142NextFrontier: FR142_NEXT_FRONTIER,
      metricRefs,
      metricDefinitionsRemainTraditionallyUnbound: true as const,
      metricDefinitionsRemainUncalibrated: true as const,
      metricDefinitionsRemainWithoutClassificationThreshold: true as const,
    }),
    fixtures,
    syntheticRelations: Object.freeze({
      deterministicRepeatabilityObserved: true as const,
      rectangleOrthogonalOrientationConcentrationGreaterThanCircle: true as const,
      rectangleTurningAngleConcentrationGreaterThanCircle: true as const,
      asymmetricReflectionResidualGreaterThanSymmetricEllipse: true as const,
      fixturePanelContainsDistinctMetricSignatures: true as const,
    }),
    transformationVerificationPolicy: Object.freeze({
      translationInvarianceExpected: true as const,
      uniformPositiveScaleInvarianceExpected: true as const,
      cycleStartInvarianceInheritedFromFR142: true as const,
      cycleDirectionInvarianceInheritedFromFR142: true as const,
      componentOrderInvarianceInheritedFromFR142: true as const,
      orthogonalOrientationConcentrationGlobalRotationInvariant: true as const,
      turningAngleConcentrationGlobalRotationInvariant: true as const,
      horizontalReflectionResidualGlobalRotationInvariant: false as const,
      horizontalReflectionResidualUsesCanonicalHorizontalAxis: true as const,
      numericAcceptanceTolerancePersisted: null,
    }),
    evidenceBoundary: Object.freeze({
      syntheticFixtureMeansTraditionalClass: false as const,
      syntheticDiscriminationMeansConstructValidity: false as const,
      syntheticRepeatabilityMeansEmpiricalCaptureRepeatability: false as const,
      metricSeparationMeansTraditionalCriterionBinding: false as const,
      syntheticFixtureMayBeUsedAsGroundTruthHumanLabel: false as const,
      syntheticFixtureMayBeUsedForCalibration: false as const,
    }),
    execution: Object.freeze({
      syntheticFixturesIssued: 4 as const,
      syntheticMetricMeasurementsIssued: 12 as const,
      empiricalCaptureRecordsIssued: 0 as const,
      humanSemanticLabelsIssued: 0 as const,
      traditionalMetricBindingsIssued: 0 as const,
      calibrationProtocolsIssued: 0 as const,
      numericClassificationThresholdsIssued: 0 as const,
      criterionStatesIssued: 0 as const,
      structuredClaimsIssued: 0 as const,
      boundedNarrativesIssued: 0 as const,
      traditionalSemanticAuthority: false as const,
    }),
    researchNoteRef: FR143_RESEARCH_NOTE_REF,
    nextFrontier: FR143_NEXT_FRONTIER,
  });
  ISSUED.add(result);
  return result;
}

export function assertIssuedSquareBroadFangNeutralCandidateMetricSyntheticVerificationFR143(
  value: SquareBroadFangSyntheticVerificationFR143V1,
): void {
  if (!ISSUED.has(value)) fail('artifact was not issued by the active FR-143 synthetic verification boundary.');
}
