import {
  FR305_VISIBLE_HAIRLINE_VERTICAL_REFERENCE_REF,
} from './visible-hairline-vertical-reference-fr305.js';
import {
  FR316_CURRENT_GATE,
  assessSameCaptureHairlineRegistrationFR316,
  type FR316Disposition,
  type FR316RegistrationInput,
  type FR316RegistrationMethod,
} from './hairline-same-capture-registration-fr316.js';
import {
  FR317_CURRENT_GATE,
} from './hairline-synthetic-registration-execution-fr317.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR318_REAL_LOCAL_HAIRLINE_METRIC_RECEIPT_CONTRACT_VERSION =
  'FR318-REAL-LOCAL-HAIRLINE-METRIC-RECEIPT-v1' as const;

export const FR318_METRIC_HAIRLINE_VERTICAL_REFERENCE_REF =
  'neutral.face.visible_hair_skin_boundary.arc_length_weighted_vertical_coordinate.canonical_metric_xy@0.1.0' as const;

const EPSILON = 1e-12;

export interface FR318CanonicalMetricXYPoint {
  readonly xCm: number;
  readonly yCm: number;
}

export interface FR318PrivateLocalMetricExecution {
  readonly schemaVersion:
    'fr318-private-local-metric-execution-v1';
  readonly method: FR316RegistrationMethod;
  readonly coordinateFrame:
    'canonical_aligned_right_handed_metric_xy';
  readonly coordinateUnit: 'centimeter';
  readonly axisConvention: 'x_right_y_up';
  readonly transformedBoundaryPolyline:
    readonly FR318CanonicalMetricXYPoint[];
  readonly sourceBoundaryPointCount: number;
  readonly sourceBoundaryPointOrderBound: true;
  readonly executionObserved: true;
  readonly executionOutputFinite: true;
  readonly noExtrapolationBeyondValidatedHairlineSupportRegion:
    true;
  readonly hiddenCompletedPointsIntroduced: false;
  readonly providerFaceOvalUsedAsHairline: false;
  readonly providerFaceMeshTopVerticesUsedAsHairline: false;
  readonly transformedBoundaryPersistedPublicly: false;
  readonly sourceImageDigestPersistedPublicly: false;
  readonly rawRegistrationParametersPersistedPublicly: false;
  readonly rawCorrespondencesPersistedPublicly: false;
  readonly subjectMetricVerticalCoordinatePersistedPublicly:
    false;
}

export interface FR318MaterializationInput {
  readonly schemaVersion:
    'fr318-real-local-hairline-metric-materialization-input-v1';
  readonly registrationInput: FR316RegistrationInput;
  readonly localMetricExecution:
    FR318PrivateLocalMetricExecution | null;
}

export interface FR318RepoSafeReceipt {
  readonly schemaVersion:
    'fr318-repo-safe-hairline-metric-receipt-v1';
  readonly contractVersion:
    typeof FR318_REAL_LOCAL_HAIRLINE_METRIC_RECEIPT_CONTRACT_VERSION;
  readonly realLocalFR316EligibilityRevalidated: boolean;
  readonly exactSameCaptureBindingRevalidated: boolean;
  readonly metricScaleAuthorityRevalidated: boolean;
  readonly localMetricMappingExecuted: boolean;
  readonly metricNeutralReferenceAvailable: boolean;
  readonly sourceBoundaryCardinalityPreserved: boolean;
  readonly sourceBoundaryPointOrderPreserved: boolean;
  readonly hairlineSupportRegionStayedWithinValidatedEnvelope:
    boolean;
  readonly transformedBoundaryPubliclyPersisted: false;
  readonly sourceImageDigestPubliclyPersisted: false;
  readonly rawRegistrationParametersPubliclyPersisted: false;
  readonly rawCorrespondencesPubliclyPersisted: false;
  readonly subjectMetricVerticalCoordinatePubliclyPersisted:
    false;
  readonly globallyReusableImageToMetricTransformIssued: false;
  readonly hairlineMetricReferenceReadyForSevenReferenceAssembly:
    boolean;
  readonly threeDivisionsSpanExecutionReady: false;
}

export interface FR318AuthorityBoundary {
  readonly neutralObservationOnly: true;
  readonly anatomicalHairlineGroundTruthIssued: false;
  readonly traditionalHairlineBindingIssued: false;
  readonly globallyReusableImageToMetricTransformIssued: false;
  readonly arbitraryImageToMetricRelabelingIssued: false;
  readonly threeDivisionsBoundaryIssued: false;
  readonly threeDivisionsSpanIssued: false;
  readonly thresholdIssued: false;
  readonly classifierIssued: false;
  readonly productColumnMaterialized: false;
  readonly productionActivated: false;
  readonly commerceActivated: false;
}

export type FR318MaterializationResult =
  | Readonly<{
      schemaVersion:
        'fr318-real-local-hairline-metric-materialization-result-v1';
      status: 'unavailable';
      reason:
        | 'fr316_real_local_registration_not_eligible'
        | 'real_local_metric_mapping_execution_unavailable';
      predecessorDisposition: FR316Disposition;
      fallbackInvented: false;
      repoSafeReceipt: FR318RepoSafeReceipt;
      authorityBoundary: FR318AuthorityBoundary;
    }>
  | Readonly<{
      schemaVersion:
        'fr318-real-local-hairline-metric-materialization-result-v1';
      status: 'available';
      authorityState:
        'exact_capture_local_neutral_hairline_metric_reference_only';
      runtimeOnlyMetricVerticalReference: Readonly<{
        schemaVersion:
          'fr318-runtime-only-hairline-metric-reference-v1';
        observationRef:
          typeof FR318_METRIC_HAIRLINE_VERTICAL_REFERENCE_REF;
        sourceObservationRef:
          typeof FR305_VISIBLE_HAIRLINE_VERTICAL_REFERENCE_REF;
        value: number;
        unit: 'centimeter';
        coordinateFrame:
          'canonical_aligned_right_handed_metric_xy';
        axisConvention: 'x_right_y_up';
        selectionRule:
          'arc_length_weighted_y_centroid_of_transformed_visible_boundary_polyline';
        registrationMethod: FR316RegistrationMethod;
        exactCaptureLocalOnly: true;
        sourceBoundaryCardinalityPreserved: true;
        sourceBoundaryPointOrderPreserved: true;
        noExtrapolationBeyondValidatedHairlineSupportRegion:
          true;
        globallyReusableImageToMetricTransformIssued: false;
        failClosedWhenUnavailable: true;
      }>;
      repoSafeReceipt: FR318RepoSafeReceipt;
      authorityBoundary: FR318AuthorityBoundary;
      nextAction:
        'fr319_assemble_exact_capture_seven_reference_common_frame_bundle';
    }>;

export const FR318_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr318-real-local-hairline-metric-receipt-gate-v1' as const,
  contractVersion:
    FR318_REAL_LOCAL_HAIRLINE_METRIC_RECEIPT_CONTRACT_VERSION,
  watchtowerTrack: 'face-observation-engine' as const,
  parentIssue: 1521 as const,
  realLocalMetricReceiptContractImplemented: true as const,
  realFR316EligibleEvidenceAvailable: false as const,
  realFR318HairlineMetricReferenceMaterialized: false as const,
  repositoryActualNeutralReferenceCapabilityCount: 6 as const,
  repositoryRemainingNeutralReferenceCapabilityCount: 1 as const,
  hairlineMetricReferenceReadyForSevenReferenceAssembly:
    false as const,
  commonFrameBundleAssembled: false as const,
  traditionalBindingAdmittedCount: 0 as const,
  threeDivisionsSpanExecutionReady: false as const,
  productMaterializedCount: 18 as const,
  productionActivated: false as const,
  commerceActivated: false as const,
  nextAction:
    'await_real_fr313_fr314_fr316_evidence_then_execute_fr318_locally_before_fr319_bundle_assembly' as const,
});

const AUTHORITY_BOUNDARY: FR318AuthorityBoundary =
  Object.freeze({
    neutralObservationOnly: true as const,
    anatomicalHairlineGroundTruthIssued: false as const,
    traditionalHairlineBindingIssued: false as const,
    globallyReusableImageToMetricTransformIssued:
      false as const,
    arbitraryImageToMetricRelabelingIssued: false as const,
    threeDivisionsBoundaryIssued: false as const,
    threeDivisionsSpanIssued: false as const,
    thresholdIssued: false as const,
    classifierIssued: false as const,
    productColumnMaterialized: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  });

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-318 ${message}`,
  );
}

function finite(value: number, label: string): number {
  if (!Number.isFinite(value)) {
    fail(`${label} must be finite.`);
  }
  return value;
}

function repoSafeReceipt(
  values: Pick<
    FR318RepoSafeReceipt,
    | 'realLocalFR316EligibilityRevalidated'
    | 'exactSameCaptureBindingRevalidated'
    | 'metricScaleAuthorityRevalidated'
    | 'localMetricMappingExecuted'
    | 'metricNeutralReferenceAvailable'
    | 'sourceBoundaryCardinalityPreserved'
    | 'sourceBoundaryPointOrderPreserved'
    | 'hairlineSupportRegionStayedWithinValidatedEnvelope'
    | 'hairlineMetricReferenceReadyForSevenReferenceAssembly'
  >,
): FR318RepoSafeReceipt {
  return Object.freeze({
    schemaVersion:
      'fr318-repo-safe-hairline-metric-receipt-v1' as const,
    contractVersion:
      FR318_REAL_LOCAL_HAIRLINE_METRIC_RECEIPT_CONTRACT_VERSION,
    ...values,
    transformedBoundaryPubliclyPersisted: false as const,
    sourceImageDigestPubliclyPersisted: false as const,
    rawRegistrationParametersPubliclyPersisted:
      false as const,
    rawCorrespondencesPubliclyPersisted: false as const,
    subjectMetricVerticalCoordinatePubliclyPersisted:
      false as const,
    globallyReusableImageToMetricTransformIssued:
      false as const,
    threeDivisionsSpanExecutionReady: false as const,
  });
}

function assertPrivateExecutionBoundary(
  execution: FR318PrivateLocalMetricExecution,
): void {
  if (
    execution.schemaVersion !==
      'fr318-private-local-metric-execution-v1' ||
    execution.coordinateFrame !==
      'canonical_aligned_right_handed_metric_xy' ||
    execution.coordinateUnit !== 'centimeter' ||
    execution.axisConvention !== 'x_right_y_up' ||
    execution.sourceBoundaryPointOrderBound !== true ||
    execution.executionObserved !== true ||
    execution.executionOutputFinite !== true ||
    execution
      .noExtrapolationBeyondValidatedHairlineSupportRegion !==
      true ||
    execution.hiddenCompletedPointsIntroduced !== false ||
    execution.providerFaceOvalUsedAsHairline !== false ||
    execution.providerFaceMeshTopVerticesUsedAsHairline !==
      false
  ) {
    fail('private local metric execution boundary drift.');
  }

  if (
    execution.transformedBoundaryPersistedPublicly !== false ||
    execution.sourceImageDigestPersistedPublicly !== false ||
    execution.rawRegistrationParametersPersistedPublicly !==
      false ||
    execution.rawCorrespondencesPersistedPublicly !== false ||
    execution
      .subjectMetricVerticalCoordinatePersistedPublicly !==
      false
  ) {
    fail('private local metric execution persistence boundary drift.');
  }
}

function arcLengthWeightedY(
  points: readonly FR318CanonicalMetricXYPoint[],
): number {
  if (points.length < 2) {
    fail('transformed boundary requires at least two points.');
  }

  let weightedY = 0;
  let totalLength = 0;

  for (let index = 0; index < points.length; index += 1) {
    const point = points[index]!;
    finite(point.xCm, `transformedBoundaryPolyline[${index}].xCm`);
    finite(point.yCm, `transformedBoundaryPolyline[${index}].yCm`);

    if (index === 0) {
      continue;
    }

    const previous = points[index - 1]!;
    const length = Math.hypot(
      point.xCm - previous.xCm,
      point.yCm - previous.yCm,
    );
    if (!(length > EPSILON)) {
      fail('transformed boundary contains a degenerate segment.');
    }

    weightedY +=
      length * ((previous.yCm + point.yCm) / 2);
    totalLength += length;
  }

  if (!(totalLength > EPSILON)) {
    fail('transformed boundary has no measurable arc length.');
  }

  return weightedY / totalLength;
}

export function materializeRealLocalHairlineMetricReferenceFR318(
  input: FR318MaterializationInput,
): FR318MaterializationResult {
  assertFR318CurrentGate();

  if (
    input.schemaVersion !==
      'fr318-real-local-hairline-metric-materialization-input-v1'
  ) {
    fail('input schemaVersion drift.');
  }

  if (
    input.registrationInput.artifactClass !==
    'real_local_capture'
  ) {
    fail('synthetic fixtures cannot enter the FR318 real-local executor.');
  }

  const assessment =
    assessSameCaptureHairlineRegistrationFR316(
      input.registrationInput,
    );

  const eligible =
    assessment.artifactClass === 'real_local_capture' &&
    assessment.predecessorReady === true &&
    assessment.exactSameCaptureBindingComplete === true &&
    assessment.metricScaleAuthorityComplete === true &&
    assessment.selectedRegistrationEvidenceComplete === true &&
    assessment.hairlineSupportRegionVerified === true &&
    assessment.privateEvidenceRemainedLocal === true &&
    assessment.disposition ===
      'eligible_for_local_hairline_metric_mapping_execution' &&
    assessment.eligibleForLocalHairlineMetricMappingExecution ===
      true;

  if (!eligible) {
    return Object.freeze({
      schemaVersion:
        'fr318-real-local-hairline-metric-materialization-result-v1' as const,
      status: 'unavailable' as const,
      reason:
        'fr316_real_local_registration_not_eligible' as const,
      predecessorDisposition: assessment.disposition,
      fallbackInvented: false as const,
      repoSafeReceipt: repoSafeReceipt({
        realLocalFR316EligibilityRevalidated: false,
        exactSameCaptureBindingRevalidated:
          assessment.exactSameCaptureBindingComplete,
        metricScaleAuthorityRevalidated:
          assessment.metricScaleAuthorityComplete,
        localMetricMappingExecuted: false,
        metricNeutralReferenceAvailable: false,
        sourceBoundaryCardinalityPreserved: false,
        sourceBoundaryPointOrderPreserved: false,
        hairlineSupportRegionStayedWithinValidatedEnvelope:
          assessment.hairlineSupportRegionVerified,
        hairlineMetricReferenceReadyForSevenReferenceAssembly:
          false,
      }),
      authorityBoundary: AUTHORITY_BOUNDARY,
    });
  }

  const materialization =
    input.registrationInput.hairlineMaterialization;
  if (materialization.status !== 'available') {
    fail('eligible FR316 assessment lacks available FR314 materialization.');
  }

  if (input.localMetricExecution == null) {
    return Object.freeze({
      schemaVersion:
        'fr318-real-local-hairline-metric-materialization-result-v1' as const,
      status: 'unavailable' as const,
      reason:
        'real_local_metric_mapping_execution_unavailable' as const,
      predecessorDisposition: assessment.disposition,
      fallbackInvented: false as const,
      repoSafeReceipt: repoSafeReceipt({
        realLocalFR316EligibilityRevalidated: true,
        exactSameCaptureBindingRevalidated: true,
        metricScaleAuthorityRevalidated: true,
        localMetricMappingExecuted: false,
        metricNeutralReferenceAvailable: false,
        sourceBoundaryCardinalityPreserved: false,
        sourceBoundaryPointOrderPreserved: false,
        hairlineSupportRegionStayedWithinValidatedEnvelope:
          true,
        hairlineMetricReferenceReadyForSevenReferenceAssembly:
          false,
      }),
      authorityBoundary: AUTHORITY_BOUNDARY,
    });
  }

  const execution = input.localMetricExecution;
  assertPrivateExecutionBoundary(execution);

  if (execution.method !== assessment.method) {
    fail('execution method differs from the revalidated FR316 method.');
  }

  const sourcePointCount =
    materialization.runtimeOnlyObservation.boundaryPolyline.length;
  if (
    !Number.isInteger(execution.sourceBoundaryPointCount) ||
    execution.sourceBoundaryPointCount < 2 ||
    execution.sourceBoundaryPointCount !== sourcePointCount ||
    execution.transformedBoundaryPolyline.length !==
      sourcePointCount
  ) {
    fail('source/transformed boundary cardinality mismatch.');
  }

  const value = arcLengthWeightedY(
    execution.transformedBoundaryPolyline,
  );

  return Object.freeze({
    schemaVersion:
      'fr318-real-local-hairline-metric-materialization-result-v1' as const,
    status: 'available' as const,
    authorityState:
      'exact_capture_local_neutral_hairline_metric_reference_only' as const,
    runtimeOnlyMetricVerticalReference: Object.freeze({
      schemaVersion:
        'fr318-runtime-only-hairline-metric-reference-v1' as const,
      observationRef:
        FR318_METRIC_HAIRLINE_VERTICAL_REFERENCE_REF,
      sourceObservationRef:
        FR305_VISIBLE_HAIRLINE_VERTICAL_REFERENCE_REF,
      value,
      unit: 'centimeter' as const,
      coordinateFrame:
        'canonical_aligned_right_handed_metric_xy' as const,
      axisConvention: 'x_right_y_up' as const,
      selectionRule:
        'arc_length_weighted_y_centroid_of_transformed_visible_boundary_polyline' as const,
      registrationMethod: assessment.method,
      exactCaptureLocalOnly: true as const,
      sourceBoundaryCardinalityPreserved: true as const,
      sourceBoundaryPointOrderPreserved: true as const,
      noExtrapolationBeyondValidatedHairlineSupportRegion:
        true as const,
      globallyReusableImageToMetricTransformIssued:
        false as const,
      failClosedWhenUnavailable: true as const,
    }),
    repoSafeReceipt: repoSafeReceipt({
      realLocalFR316EligibilityRevalidated: true,
      exactSameCaptureBindingRevalidated: true,
      metricScaleAuthorityRevalidated: true,
      localMetricMappingExecuted: true,
      metricNeutralReferenceAvailable: true,
      sourceBoundaryCardinalityPreserved: true,
      sourceBoundaryPointOrderPreserved: true,
      hairlineSupportRegionStayedWithinValidatedEnvelope:
        true,
      hairlineMetricReferenceReadyForSevenReferenceAssembly:
        true,
    }),
    authorityBoundary: AUTHORITY_BOUNDARY,
    nextAction:
      'fr319_assemble_exact_capture_seven_reference_common_frame_bundle' as const,
  });
}

export function assertFR318CurrentGate(): void {
  if (
    FR316_CURRENT_GATE.registrationContractImplemented !== true ||
    FR316_CURRENT_GATE
      .realSameCaptureRegistrationEvidenceAvailable !== false ||
    FR316_CURRENT_GATE
      .hairlineImageToMetricBridgeIssued !== false ||
    FR317_CURRENT_GATE.syntheticExecutionImplemented !== true ||
    FR317_CURRENT_GATE.realRegistrationAuthorityIssued !== false
  ) {
    fail('FR316/FR317 predecessor gate drift.');
  }

  const gate = FR318_CURRENT_GATE;
  if (
    gate.parentIssue !== 1521 ||
    gate.realLocalMetricReceiptContractImplemented !== true ||
    gate.realFR316EligibleEvidenceAvailable !== false ||
    gate.realFR318HairlineMetricReferenceMaterialized !== false ||
    gate.repositoryActualNeutralReferenceCapabilityCount !== 6 ||
    gate.repositoryRemainingNeutralReferenceCapabilityCount !==
      1 ||
    gate
      .hairlineMetricReferenceReadyForSevenReferenceAssembly !==
      false ||
    gate.commonFrameBundleAssembled !== false ||
    gate.traditionalBindingAdmittedCount !== 0 ||
    gate.threeDivisionsSpanExecutionReady !== false ||
    gate.productMaterializedCount !== 18 ||
    gate.productionActivated !== false ||
    gate.commerceActivated !== false
  ) {
    fail('current gate drift.');
  }
}

assertFR318CurrentGate();
