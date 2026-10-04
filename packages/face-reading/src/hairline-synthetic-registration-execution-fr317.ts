import {
  FR316_CURRENT_GATE,
  FR316_SAME_CAPTURE_HAIRLINE_REGISTRATION_CONTRACT_VERSION,
  type FR316RegistrationAssessment,
  type FR316RegistrationMethod,
} from './hairline-same-capture-registration-fr316.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR317_SYNTHETIC_HAIRLINE_REGISTRATION_EXECUTION_CONTRACT_VERSION =
  'FR317-SYNTHETIC-HAIRLINE-REGISTRATION-EXECUTION-v1' as const;

export const FR317_SYNTHETIC_NUMERIC_TOLERANCE_CM =
  1e-9 as const;

export interface FR317NormalizedPoint {
  readonly x: number;
  readonly y: number;
}

export interface FR317MetricPoint {
  readonly xCm: number;
  readonly yCm: number;
}

export interface FR317CalibratedSyntheticFixture {
  readonly schemaVersion:
    'fr317-calibrated-synthetic-fixture-v1';
  readonly planeZCm: number;
  readonly intrinsics: {
    readonly fx: number;
    readonly fy: number;
    readonly cx: number;
    readonly cy: number;
  };
  readonly exactRgbToMetricExtrinsicsIdentity: true;
  readonly releasedImageTransformIdentity: true;
  readonly metricTruthPoints:
    readonly FR317MetricPoint[];
}

export interface FR317IndependentCorrespondence {
  readonly source: FR317NormalizedPoint;
  readonly target: FR317MetricPoint;
}

export interface FR317IndependentQuery {
  readonly source: FR317NormalizedPoint;
  readonly expectedTarget: FR317MetricPoint;
}

export interface FR317IndependentSyntheticFixture {
  readonly schemaVersion:
    'fr317-independent-synthetic-fixture-v1';
  readonly fitCorrespondences:
    readonly [
      FR317IndependentCorrespondence,
      FR317IndependentCorrespondence,
      FR317IndependentCorrespondence,
    ];
  readonly heldOutCorrespondences:
    readonly FR317IndependentCorrespondence[];
  readonly queryPoints:
    readonly FR317IndependentQuery[];
}

interface FR317AuthorityBoundary {
  readonly realRegistrationAuthorityIssued: false;
  readonly realHairlineMetricCoordinateIssued: false;
  readonly imageToMetricBridgeIssued: false;
  readonly actualNeutralReferenceCapabilityRaisedToSeven: false;
  readonly commonFrameComplete: false;
  readonly mixedFrameSpanAuthorized: false;
  readonly threeDivisionsSpanExecutionReady: false;
  readonly traditionalBindingIssued: false;
  readonly productColumnMaterialized: false;
  readonly productionActivated: false;
  readonly commerceActivated: false;
}

export type FR317SyntheticExecutionReceipt =
  | Readonly<{
      schemaVersion:
        'fr317-synthetic-registration-execution-receipt-v1';
      contractVersion:
        typeof FR317_SYNTHETIC_HAIRLINE_REGISTRATION_EXECUTION_CONTRACT_VERSION;
      authorityState:
        'synthetic_execution_validation_only';
      syntheticOnly: true;
      method:
        'exact_calibrated_surface_registration';
      status: 'passed' | 'failed';
      recoveredPointCount: number;
      calibratedRoundTripPass: boolean;
      syntheticGroundTruthComparisonPass: boolean;
      authorityBoundary: FR317AuthorityBoundary;
      nextAction:
        | 'fr318_real_local_execution_receipt_contract'
        | 'repair_synthetic_calibrated_execution_without_authority_expansion';
    }>
  | Readonly<{
      schemaVersion:
        'fr317-synthetic-registration-execution-receipt-v1';
      contractVersion:
        typeof FR317_SYNTHETIC_HAIRLINE_REGISTRATION_EXECUTION_CONTRACT_VERSION;
      authorityState:
        'synthetic_execution_validation_only';
      syntheticOnly: true;
      method:
        'independent_correspondence_registration';
      status: 'passed' | 'failed';
      recoveredPointCount: number;
      heldOutValidationPass: boolean;
      queryEnvelopePass: boolean;
      syntheticGroundTruthComparisonPass: boolean;
      authorityBoundary: FR317AuthorityBoundary;
      nextAction:
        | 'fr318_real_local_execution_receipt_contract'
        | 'repair_synthetic_independent_execution_without_authority_expansion';
    }>;

export const FR317_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr317-synthetic-hairline-registration-execution-gate-v1' as const,
  contractVersion:
    FR317_SYNTHETIC_HAIRLINE_REGISTRATION_EXECUTION_CONTRACT_VERSION,
  watchtowerTrack: 'face-observation-engine' as const,
  parentIssue: 1521 as const,
  syntheticExecutionImplemented: true as const,
  calibratedSyntheticPathImplemented: true as const,
  independentSyntheticPathImplemented: true as const,
  realRegistrationAuthorityIssued: false as const,
  hairlineImageToMetricBridgeIssued: false as const,
  commonFrameComplete: false as const,
  actualNeutralReferenceCapabilityCount: 6 as const,
  actualRemainingNeutralReferenceCapabilityCount: 1 as const,
  metricFrameReadyReferenceCapabilityCount: 6 as const,
  remainingMetricFrameBridgeCapabilityCount: 1 as const,
  traditionalBindingAdmittedCount: 0 as const,
  threeDivisionsSpanExecutionReady: false as const,
  productMaterializedCount: 18 as const,
  productionActivated: false as const,
  commerceActivated: false as const,
  nextAction:
    'validate_both_fr317_synthetic_execution_paths_before_designing_fr318_real_local_execution_receipt' as const,
});

const AUTHORITY_BOUNDARY: FR317AuthorityBoundary =
  Object.freeze({
    realRegistrationAuthorityIssued: false as const,
    realHairlineMetricCoordinateIssued: false as const,
    imageToMetricBridgeIssued: false as const,
    actualNeutralReferenceCapabilityRaisedToSeven:
      false as const,
    commonFrameComplete: false as const,
    mixedFrameSpanAuthorized: false as const,
    threeDivisionsSpanExecutionReady: false as const,
    traditionalBindingIssued: false as const,
    productColumnMaterialized: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  });

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-317 ${message}`,
  );
}

function finite(value: number, label: string): number {
  if (!Number.isFinite(value)) {
    fail(`${label} must be finite.`);
  }
  return value;
}

function positive(value: number, label: string): number {
  finite(value, label);
  if (!(value > 0)) {
    fail(`${label} must be > 0.`);
  }
  return value;
}

function assertNormalizedPoint(
  point: FR317NormalizedPoint,
  label: string,
): void {
  finite(point.x, `${label}.x`);
  finite(point.y, `${label}.y`);
  if (
    point.x < 0 ||
    point.x > 1 ||
    point.y < 0 ||
    point.y > 1
  ) {
    fail(`${label} must lie within normalized image bounds.`);
  }
}

function assertMetricPoint(
  point: FR317MetricPoint,
  label: string,
): void {
  finite(point.xCm, `${label}.xCm`);
  finite(point.yCm, `${label}.yCm`);
}

function metricErrorCm(
  actual: FR317MetricPoint,
  expected: FR317MetricPoint,
): number {
  return Math.hypot(
    actual.xCm - expected.xCm,
    actual.yCm - expected.yCm,
  );
}

function assertSyntheticFR316Eligibility(
  assessment: FR316RegistrationAssessment,
  expectedMethod: FR316RegistrationMethod,
): void {
  if (
    assessment.schemaVersion !==
      'fr316-same-capture-hairline-registration-assessment-v1' ||
    assessment.contractVersion !==
      FR316_SAME_CAPTURE_HAIRLINE_REGISTRATION_CONTRACT_VERSION ||
    assessment.authorityState !==
      'registration_evidence_adjudication_only' ||
    assessment.artifactClass !== 'synthetic_fixture' ||
    assessment.method !== expectedMethod ||
    assessment.predecessorReady !== true ||
    assessment.exactSameCaptureBindingComplete !== true ||
    assessment.metricScaleAuthorityComplete !== true ||
    assessment.selectedRegistrationEvidenceComplete !== true ||
    assessment.hairlineSupportRegionVerified !== true ||
    assessment.privateEvidenceRemainedLocal !== true ||
    assessment.disposition !==
      'eligible_for_local_hairline_metric_mapping_execution' ||
    assessment.eligibleForLocalHairlineMetricMappingExecution !==
      true ||
    assessment.truthBoundary
      .providerLandmarksUsedAsRegistrationTruth !== false ||
    assessment.truthBoundary
      .unrelatedAstRegistrationUsedAsAuthority !== false ||
    assessment.truthBoundary
      .imageNormalizedCoordinateRelabeledAsMetric !== false ||
    assessment.truthBoundary
      .unknownScaleFittingAuthorized !== false ||
    assessment.truthBoundary
      .twoDimensionalHomographyAuthorizedAsMetricDepthTruth !==
      false ||
    Object.values(assessment.authorityBoundary).some(
      (value) => value !== false,
    ) ||
    assessment.nextAction !==
      'fr317_local_metric_mapping_execution_review'
  ) {
    fail('FR316 synthetic execution prerequisite not satisfied.');
  }
}

function projectMetricPlaneToNormalizedImage(
  point: FR317MetricPoint,
  fixture: FR317CalibratedSyntheticFixture,
): FR317NormalizedPoint {
  const { fx, fy, cx, cy } = fixture.intrinsics;
  const z = fixture.planeZCm;
  return Object.freeze({
    x: cx + (fx * point.xCm) / z,
    y: cy - (fy * point.yCm) / z,
  });
}

function recoverMetricPlaneFromNormalizedImage(
  point: FR317NormalizedPoint,
  fixture: FR317CalibratedSyntheticFixture,
): FR317MetricPoint {
  const { fx, fy, cx, cy } = fixture.intrinsics;
  const z = fixture.planeZCm;
  return Object.freeze({
    xCm: ((point.x - cx) * z) / fx,
    yCm: ((cy - point.y) * z) / fy,
  });
}

export function executeCalibratedSyntheticHairlineRegistrationFR317(
  assessment: FR316RegistrationAssessment,
  fixture: FR317CalibratedSyntheticFixture,
): FR317SyntheticExecutionReceipt {
  assertFR317CurrentGate();
  assertSyntheticFR316Eligibility(
    assessment,
    'exact_calibrated_surface_registration',
  );

  if (
    fixture.schemaVersion !==
      'fr317-calibrated-synthetic-fixture-v1' ||
    fixture.exactRgbToMetricExtrinsicsIdentity !== true ||
    fixture.releasedImageTransformIdentity !== true
  ) {
    fail('calibrated synthetic fixture identity drift.');
  }

  positive(fixture.planeZCm, 'planeZCm');
  positive(fixture.intrinsics.fx, 'intrinsics.fx');
  positive(fixture.intrinsics.fy, 'intrinsics.fy');
  finite(fixture.intrinsics.cx, 'intrinsics.cx');
  finite(fixture.intrinsics.cy, 'intrinsics.cy');

  if (fixture.metricTruthPoints.length < 2) {
    fail('calibrated fixture requires at least two metric truth points.');
  }

  let pass = true;
  for (
    let index = 0;
    index < fixture.metricTruthPoints.length;
    index += 1
  ) {
    const truth = fixture.metricTruthPoints[index]!;
    assertMetricPoint(truth, `metricTruthPoints[${index}]`);
    const image =
      projectMetricPlaneToNormalizedImage(truth, fixture);
    assertNormalizedPoint(
      image,
      `projectedNormalizedPoints[${index}]`,
    );
    const recovered =
      recoverMetricPlaneFromNormalizedImage(
        image,
        fixture,
      );
    if (
      metricErrorCm(recovered, truth) >
      FR317_SYNTHETIC_NUMERIC_TOLERANCE_CM
    ) {
      pass = false;
    }
  }

  return Object.freeze({
    schemaVersion:
      'fr317-synthetic-registration-execution-receipt-v1' as const,
    contractVersion:
      FR317_SYNTHETIC_HAIRLINE_REGISTRATION_EXECUTION_CONTRACT_VERSION,
    authorityState:
      'synthetic_execution_validation_only' as const,
    syntheticOnly: true as const,
    method:
      'exact_calibrated_surface_registration' as const,
    status: pass ? 'passed' as const : 'failed' as const,
    recoveredPointCount:
      fixture.metricTruthPoints.length,
    calibratedRoundTripPass: pass,
    syntheticGroundTruthComparisonPass: pass,
    authorityBoundary: AUTHORITY_BOUNDARY,
    nextAction: pass
      ? 'fr318_real_local_execution_receipt_contract' as const
      : 'repair_synthetic_calibrated_execution_without_authority_expansion' as const,
  });
}

interface Barycentric {
  readonly a: number;
  readonly b: number;
  readonly c: number;
}

function barycentric(
  point: FR317NormalizedPoint,
  p0: FR317NormalizedPoint,
  p1: FR317NormalizedPoint,
  p2: FR317NormalizedPoint,
): Barycentric {
  const denominator =
    (p1.y - p2.y) * (p0.x - p2.x) +
    (p2.x - p1.x) * (p0.y - p2.y);

  if (Math.abs(denominator) <= Number.EPSILON) {
    fail('independent fit source triangle is degenerate.');
  }

  const a =
    ((p1.y - p2.y) * (point.x - p2.x) +
      (p2.x - p1.x) * (point.y - p2.y)) /
    denominator;
  const b =
    ((p2.y - p0.y) * (point.x - p2.x) +
      (p0.x - p2.x) * (point.y - p2.y)) /
    denominator;
  const c = 1 - a - b;
  return Object.freeze({ a, b, c });
}

function insideFitTriangle(weights: Barycentric): boolean {
  const epsilon = 1e-12;
  return (
    weights.a >= -epsilon &&
    weights.b >= -epsilon &&
    weights.c >= -epsilon &&
    weights.a <= 1 + epsilon &&
    weights.b <= 1 + epsilon &&
    weights.c <= 1 + epsilon
  );
}

function mapByFitTriangle(
  source: FR317NormalizedPoint,
  fit: FR317IndependentSyntheticFixture['fitCorrespondences'],
): {
  readonly target: FR317MetricPoint;
  readonly insideEnvelope: boolean;
} {
  const weights = barycentric(
    source,
    fit[0].source,
    fit[1].source,
    fit[2].source,
  );

  return Object.freeze({
    target: Object.freeze({
      xCm:
        weights.a * fit[0].target.xCm +
        weights.b * fit[1].target.xCm +
        weights.c * fit[2].target.xCm,
      yCm:
        weights.a * fit[0].target.yCm +
        weights.b * fit[1].target.yCm +
        weights.c * fit[2].target.yCm,
    }),
    insideEnvelope: insideFitTriangle(weights),
  });
}

export function executeIndependentSyntheticHairlineRegistrationFR317(
  assessment: FR316RegistrationAssessment,
  fixture: FR317IndependentSyntheticFixture,
): FR317SyntheticExecutionReceipt {
  assertFR317CurrentGate();
  assertSyntheticFR316Eligibility(
    assessment,
    'independent_correspondence_registration',
  );

  if (
    fixture.schemaVersion !==
      'fr317-independent-synthetic-fixture-v1'
  ) {
    fail('independent synthetic fixture schemaVersion drift.');
  }

  fixture.fitCorrespondences.forEach(
    (correspondence, index) => {
      assertNormalizedPoint(
        correspondence.source,
        `fitCorrespondences[${index}].source`,
      );
      assertMetricPoint(
        correspondence.target,
        `fitCorrespondences[${index}].target`,
      );
    },
  );

  if (fixture.heldOutCorrespondences.length < 2) {
    fail('independent fixture requires at least two held-out correspondences.');
  }
  if (fixture.queryPoints.length < 2) {
    fail('independent fixture requires at least two query points.');
  }

  let heldOutValidationPass = true;
  for (
    let index = 0;
    index < fixture.heldOutCorrespondences.length;
    index += 1
  ) {
    const correspondence =
      fixture.heldOutCorrespondences[index]!;
    assertNormalizedPoint(
      correspondence.source,
      `heldOutCorrespondences[${index}].source`,
    );
    assertMetricPoint(
      correspondence.target,
      `heldOutCorrespondences[${index}].target`,
    );

    const mapped = mapByFitTriangle(
      correspondence.source,
      fixture.fitCorrespondences,
    );
    if (
      !mapped.insideEnvelope ||
      metricErrorCm(
        mapped.target,
        correspondence.target,
      ) > FR317_SYNTHETIC_NUMERIC_TOLERANCE_CM
    ) {
      heldOutValidationPass = false;
    }
  }

  let queryEnvelopePass = true;
  let syntheticGroundTruthComparisonPass = true;

  for (
    let index = 0;
    index < fixture.queryPoints.length;
    index += 1
  ) {
    const query = fixture.queryPoints[index]!;
    assertNormalizedPoint(
      query.source,
      `queryPoints[${index}].source`,
    );
    assertMetricPoint(
      query.expectedTarget,
      `queryPoints[${index}].expectedTarget`,
    );

    const mapped = mapByFitTriangle(
      query.source,
      fixture.fitCorrespondences,
    );
    if (!mapped.insideEnvelope) {
      queryEnvelopePass = false;
    }
    if (
      metricErrorCm(
        mapped.target,
        query.expectedTarget,
      ) > FR317_SYNTHETIC_NUMERIC_TOLERANCE_CM
    ) {
      syntheticGroundTruthComparisonPass = false;
    }
  }

  const pass =
    heldOutValidationPass &&
    queryEnvelopePass &&
    syntheticGroundTruthComparisonPass;

  return Object.freeze({
    schemaVersion:
      'fr317-synthetic-registration-execution-receipt-v1' as const,
    contractVersion:
      FR317_SYNTHETIC_HAIRLINE_REGISTRATION_EXECUTION_CONTRACT_VERSION,
    authorityState:
      'synthetic_execution_validation_only' as const,
    syntheticOnly: true as const,
    method:
      'independent_correspondence_registration' as const,
    status: pass ? 'passed' as const : 'failed' as const,
    recoveredPointCount: fixture.queryPoints.length,
    heldOutValidationPass,
    queryEnvelopePass,
    syntheticGroundTruthComparisonPass,
    authorityBoundary: AUTHORITY_BOUNDARY,
    nextAction: pass
      ? 'fr318_real_local_execution_receipt_contract' as const
      : 'repair_synthetic_independent_execution_without_authority_expansion' as const,
  });
}

export function assertFR317CurrentGate(): void {
  if (
    FR316_CURRENT_GATE.registrationContractImplemented !== true ||
    FR316_CURRENT_GATE
      .realSameCaptureRegistrationEvidenceAvailable !== false ||
    FR316_CURRENT_GATE
      .hairlineImageToMetricBridgeIssued !== false ||
    FR316_CURRENT_GATE.commonFrameComplete !== false ||
    FR316_CURRENT_GATE
      .actualNeutralReferenceCapabilityCount !== 6 ||
    FR316_CURRENT_GATE
      .actualRemainingNeutralReferenceCapabilityCount !== 1
  ) {
    fail('FR316 predecessor gate drift.');
  }

  const gate = FR317_CURRENT_GATE;
  if (
    gate.parentIssue !== 1521 ||
    gate.syntheticExecutionImplemented !== true ||
    gate.calibratedSyntheticPathImplemented !== true ||
    gate.independentSyntheticPathImplemented !== true ||
    gate.realRegistrationAuthorityIssued !== false ||
    gate.hairlineImageToMetricBridgeIssued !== false ||
    gate.commonFrameComplete !== false ||
    gate.actualNeutralReferenceCapabilityCount !== 6 ||
    gate.actualRemainingNeutralReferenceCapabilityCount !== 1 ||
    gate.metricFrameReadyReferenceCapabilityCount !== 6 ||
    gate.remainingMetricFrameBridgeCapabilityCount !== 1 ||
    gate.traditionalBindingAdmittedCount !== 0 ||
    gate.threeDivisionsSpanExecutionReady !== false ||
    gate.productMaterializedCount !== 18 ||
    gate.productionActivated !== false ||
    gate.commerceActivated !== false
  ) {
    fail('current gate drift.');
  }
}

assertFR317CurrentGate();
