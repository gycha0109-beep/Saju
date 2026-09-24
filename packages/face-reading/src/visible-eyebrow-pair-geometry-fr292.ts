import {
  FR208_CONTRACT_VERSION,
  assertFaceReadingNeutralObservablePrimitivePackFR208,
  computeEyebrowVisibleCurveFR208,
  type CanonicalAlignedMetricPointXYFR208V1,
  type EyebrowVisibleCurveResultFR208V1,
} from './cross-face-neutral-observable-primitives-fr208.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR292_VISIBLE_EYEBROW_PAIR_CONTRACT_VERSION =
  'FR292-VISIBLE-EYEBROW-PAIR-GEOMETRY-v1' as const;

export const FR292_MEAN_SPAN_METRIC_REF =
  'neutral.eyebrow.visible_pair.mean_span_to_face_width_ratio@0.1.0' as const;
export const FR292_MEAN_ARCH_METRIC_REF =
  'neutral.eyebrow.visible_pair.mean_arch_amplitude_to_span_ratio@0.1.0' as const;
export const FR292_MEAN_TAIL_TILT_METRIC_REF =
  'neutral.eyebrow.visible_pair.mean_lateral_endpoint_tilt_degrees@0.1.0' as const;

const EPSILON = 1e-12;

export interface FR292VisibleEyebrowCurveInput {
  readonly medialEndpoint:
    CanonicalAlignedMetricPointXYFR208V1;
  readonly lateralEndpoint:
    CanonicalAlignedMetricPointXYFR208V1;
  readonly orderedVisibleCurve:
    readonly CanonicalAlignedMetricPointXYFR208V1[];
}

export interface FR292VisibleEyebrowPairGeometryInput {
  readonly schemaVersion:
    'fr292-visible-eyebrow-pair-input-v1';
  readonly authorityState:
    'governed_explicit_visible_eyebrow_pair_geometry_only';
  readonly coordinateFrame:
    'canonical_aligned_right_handed_metric_xy';
  readonly unorderedVisibleBrows: readonly [
    FR292VisibleEyebrowCurveInput,
    FR292VisibleEyebrowCurveInput,
  ];
  readonly visibleFaceWidthPair: readonly [
    CanonicalAlignedMetricPointXYFR208V1,
    CanonicalAlignedMetricPointXYFR208V1,
  ];
  readonly visibilityAdmitted: true;
  readonly explicitVisibleEndpointRolesProvided: true;
  readonly sameCaptureAsFR77FullFaceVerified: true;
  readonly sourceCanonicalAssetDigest: string;
  readonly sourceObservationRefs: readonly string[];
  readonly providerComponentIdentityUsed: false;
  readonly providerSpecificIndicesExposed: false;
  readonly rawLandmarksExposed: false;
  readonly anatomicalBoundaryRoleAssigned: false;
  readonly traditionalBindingApplied: false;
}

export interface FR292NeutralEyebrowPairAxis {
  readonly metricRef:
    | typeof FR292_MEAN_SPAN_METRIC_REF
    | typeof FR292_MEAN_ARCH_METRIC_REF
    | typeof FR292_MEAN_TAIL_TILT_METRIC_REF;
  readonly value: number;
  readonly unit: 'ratio' | 'degree';
  readonly coordinateFrame:
    'canonical_aligned_right_handed_metric_xy';
  readonly browPairOrderSemantic: false;
  readonly classificationApplied: false;
  readonly thresholdApplied: false;
  readonly calibrationApplied: false;
  readonly traditionalBindingApplied: false;
  readonly anatomicalInterpretationAllowed: false;
}

export type FR292VisibleEyebrowPairUnavailableReason =
  | 'visible_face_width_collapsed'
  | 'visible_brow_horizontal_span_collapsed';

export interface FR292EyebrowPairSourceReceipt {
  readonly sourceContractVersion:
    typeof FR208_CONTRACT_VERSION;
  readonly explicitVisibleSemanticCurvesConsumed: true;
  readonly providerEyebrowComponentsConsumed: false;
  readonly providerComponentRoleMappingIssued: false;
  readonly providerSpecificIndicesExposed: false;
  readonly rawLandmarksExposed: false;
  readonly anatomicalBoundaryRoleAssigned: false;
  readonly sourceObservationRefsRetainedInternally: true;
  readonly sourceObservationRefsExposed: false;
  readonly canonicalAssetDigestRetainedInternally: true;
  readonly canonicalAssetDigestExposed: false;
}

export interface FR292EyebrowPairAuthorityBoundary {
  readonly observableMorphologyOnly: true;
  readonly providerComponentSelectionIssued: false;
  readonly providerComponentMergeIssued: false;
  readonly providerComponentCorrespondenceIssued: false;
  readonly providerComponentRoleMappingIssued: false;
  readonly anatomicalBrowBoundaryIssued: false;
  readonly rawRgbDetectorClaimed: false;
  readonly traditionalBindingIssued: false;
  readonly thresholdIssued: false;
  readonly classifierIssued: false;
  readonly calibrationIssued: false;
  readonly threeDivisionsClaimIssued: false;
  readonly productionF1Issued: false;
  readonly productionF6Issued: false;
  readonly productionActivated: false;
  readonly commerceActivated: false;
}

export type FR292VisibleEyebrowPairGeometryResult =
  | Readonly<{
      schemaVersion:
        'fr292-visible-eyebrow-pair-geometry-v1';
      artifactVersion: '0.1.0';
      contractVersion:
        typeof FR292_VISIBLE_EYEBROW_PAIR_CONTRACT_VERSION;
      authorityState:
        'visible_eyebrow_pair_continuous_geometry_only';
      status: 'available';
      axes: readonly [
        FR292NeutralEyebrowPairAxis,
        FR292NeutralEyebrowPairAxis,
        FR292NeutralEyebrowPairAxis,
      ];
      sourceCurveCount: 2;
      browPairOrderSemantic: false;
      source: FR292EyebrowPairSourceReceipt;
      authorityBoundary:
        FR292EyebrowPairAuthorityBoundary;
    }>
  | Readonly<{
      schemaVersion:
        'fr292-visible-eyebrow-pair-geometry-v1';
      artifactVersion: '0.1.0';
      contractVersion:
        typeof FR292_VISIBLE_EYEBROW_PAIR_CONTRACT_VERSION;
      authorityState:
        'visible_eyebrow_pair_continuous_geometry_only';
      status: 'unavailable';
      reason:
        FR292VisibleEyebrowPairUnavailableReason;
      fallbackInvented: false;
      source: FR292EyebrowPairSourceReceipt;
      authorityBoundary:
        FR292EyebrowPairAuthorityBoundary;
    }>;

const AUTHORITY_BOUNDARY:
FR292EyebrowPairAuthorityBoundary = Object.freeze({
  observableMorphologyOnly: true as const,
  providerComponentSelectionIssued: false as const,
  providerComponentMergeIssued: false as const,
  providerComponentCorrespondenceIssued: false as const,
  providerComponentRoleMappingIssued: false as const,
  anatomicalBrowBoundaryIssued: false as const,
  rawRgbDetectorClaimed: false as const,
  traditionalBindingIssued: false as const,
  thresholdIssued: false as const,
  classifierIssued: false as const,
  calibrationIssued: false as const,
  threeDivisionsClaimIssued: false as const,
  productionF1Issued: false as const,
  productionF6Issued: false as const,
  productionActivated: false as const,
  commerceActivated: false as const,
});

const SOURCE_RECEIPT:
FR292EyebrowPairSourceReceipt = Object.freeze({
  sourceContractVersion: FR208_CONTRACT_VERSION,
  explicitVisibleSemanticCurvesConsumed: true as const,
  providerEyebrowComponentsConsumed: false as const,
  providerComponentRoleMappingIssued: false as const,
  providerSpecificIndicesExposed: false as const,
  rawLandmarksExposed: false as const,
  anatomicalBoundaryRoleAssigned: false as const,
  sourceObservationRefsRetainedInternally: true as const,
  sourceObservationRefsExposed: false as const,
  canonicalAssetDigestRetainedInternally: true as const,
  canonicalAssetDigestExposed: false as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-292 ${message}`,
  );
}

function finite(value: number, label: string): number {
  if (!Number.isFinite(value)) {
    fail(`${label} must be finite.`);
  }
  return value;
}

function assertPoint(
  point: CanonicalAlignedMetricPointXYFR208V1,
  label: string,
): void {
  if (
    !Number.isFinite(point.x) ||
    !Number.isFinite(point.y)
  ) {
    fail(`${label} must contain finite x/y coordinates.`);
  }
}

function horizontalSpan(
  a: CanonicalAlignedMetricPointXYFR208V1,
  b: CanonicalAlignedMetricPointXYFR208V1,
): number {
  return Math.abs(b.x - a.x);
}

function assertRefs(refs: readonly string[]): void {
  if (refs.length === 0) {
    fail('sourceObservationRefs must be non-empty.');
  }
  const normalized = refs.map((ref) => ref.trim());
  if (normalized.some((ref) => ref.length === 0)) {
    fail('sourceObservationRefs must not contain empty refs.');
  }
  if (new Set(normalized).size !== normalized.length) {
    fail('sourceObservationRefs must be unique.');
  }
}

function axis(
  metricRef: FR292NeutralEyebrowPairAxis['metricRef'],
  value: number,
  unit: FR292NeutralEyebrowPairAxis['unit'],
): FR292NeutralEyebrowPairAxis {
  return Object.freeze({
    metricRef,
    value: finite(value, metricRef),
    unit,
    coordinateFrame:
      'canonical_aligned_right_handed_metric_xy' as const,
    browPairOrderSemantic: false as const,
    classificationApplied: false as const,
    thresholdApplied: false as const,
    calibrationApplied: false as const,
    traditionalBindingApplied: false as const,
    anatomicalInterpretationAllowed: false as const,
  });
}

function unavailable(
  reason: FR292VisibleEyebrowPairUnavailableReason,
): FR292VisibleEyebrowPairGeometryResult {
  return Object.freeze({
    schemaVersion:
      'fr292-visible-eyebrow-pair-geometry-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion:
      FR292_VISIBLE_EYEBROW_PAIR_CONTRACT_VERSION,
    authorityState:
      'visible_eyebrow_pair_continuous_geometry_only' as const,
    status: 'unavailable' as const,
    reason,
    fallbackInvented: false as const,
    source: SOURCE_RECEIPT,
    authorityBoundary: AUTHORITY_BOUNDARY,
  });
}

function mean(
  first: number,
  second: number,
): number {
  return (first + second) / 2;
}

function assertInsideFaceEnvelope(
  point: CanonicalAlignedMetricPointXYFR208V1,
  minX: number,
  maxX: number,
  label: string,
): void {
  if (point.x < minX || point.x > maxX) {
    fail(
      `${label} must lie within the supplied visible face horizontal envelope.`,
    );
  }
}

function computeCurve(
  curve: FR292VisibleEyebrowCurveInput,
  input: FR292VisibleEyebrowPairGeometryInput,
): EyebrowVisibleCurveResultFR208V1 {
  return computeEyebrowVisibleCurveFR208({
    coordinateFrame: input.coordinateFrame,
    medialEndpoint: curve.medialEndpoint,
    lateralEndpoint: curve.lateralEndpoint,
    orderedVisibleCurve: curve.orderedVisibleCurve,
    visibleFaceLeft: input.visibleFaceWidthPair[0],
    visibleFaceRight: input.visibleFaceWidthPair[1],
    sourceObservationRefs: input.sourceObservationRefs,
  });
}

export function computeVisibleEyebrowPairGeometryFR292(
  input: FR292VisibleEyebrowPairGeometryInput,
): FR292VisibleEyebrowPairGeometryResult {
  assertFaceReadingNeutralObservablePrimitivePackFR208();

  if (
    input.schemaVersion !==
      'fr292-visible-eyebrow-pair-input-v1' ||
    input.authorityState !==
      'governed_explicit_visible_eyebrow_pair_geometry_only' ||
    input.coordinateFrame !==
      'canonical_aligned_right_handed_metric_xy' ||
    input.visibilityAdmitted !== true ||
    input.explicitVisibleEndpointRolesProvided !== true ||
    input.sameCaptureAsFR77FullFaceVerified !== true ||
    !input.sourceCanonicalAssetDigest.trim() ||
    input.providerComponentIdentityUsed !== false ||
    input.providerSpecificIndicesExposed !== false ||
    input.rawLandmarksExposed !== false ||
    input.anatomicalBoundaryRoleAssigned !== false ||
    input.traditionalBindingApplied !== false
  ) {
    fail('input authority boundary drift.');
  }

  assertRefs(input.sourceObservationRefs);
  input.visibleFaceWidthPair.forEach(
    (point, index) =>
      assertPoint(
        point,
        `visibleFaceWidthPair[${index}]`,
      ),
  );

  const faceWidth = horizontalSpan(
    input.visibleFaceWidthPair[0],
    input.visibleFaceWidthPair[1],
  );
  if (!(faceWidth > EPSILON)) {
    return unavailable('visible_face_width_collapsed');
  }

  const minX = Math.min(
    input.visibleFaceWidthPair[0].x,
    input.visibleFaceWidthPair[1].x,
  );
  const maxX = Math.max(
    input.visibleFaceWidthPair[0].x,
    input.visibleFaceWidthPair[1].x,
  );

  for (
    let index = 0;
    index < input.unorderedVisibleBrows.length;
    index += 1
  ) {
    const curve = input.unorderedVisibleBrows[index]!;
    assertPoint(
      curve.medialEndpoint,
      `unorderedVisibleBrows[${index}].medialEndpoint`,
    );
    assertPoint(
      curve.lateralEndpoint,
      `unorderedVisibleBrows[${index}].lateralEndpoint`,
    );

    const span = horizontalSpan(
      curve.medialEndpoint,
      curve.lateralEndpoint,
    );
    if (!(span > EPSILON)) {
      return unavailable(
        'visible_brow_horizontal_span_collapsed',
      );
    }

    assertInsideFaceEnvelope(
      curve.medialEndpoint,
      minX,
      maxX,
      `unorderedVisibleBrows[${index}].medialEndpoint`,
    );
    assertInsideFaceEnvelope(
      curve.lateralEndpoint,
      minX,
      maxX,
      `unorderedVisibleBrows[${index}].lateralEndpoint`,
    );
    curve.orderedVisibleCurve.forEach(
      (point, pointIndex) => {
        assertPoint(
          point,
          `unorderedVisibleBrows[${index}].orderedVisibleCurve[${pointIndex}]`,
        );
        assertInsideFaceEnvelope(
          point,
          minX,
          maxX,
          `unorderedVisibleBrows[${index}].orderedVisibleCurve[${pointIndex}]`,
        );
      },
    );
  }

  const first = computeCurve(
    input.unorderedVisibleBrows[0],
    input,
  );
  const second = computeCurve(
    input.unorderedVisibleBrows[1],
    input,
  );

  const result:
  FR292VisibleEyebrowPairGeometryResult = Object.freeze({
    schemaVersion:
      'fr292-visible-eyebrow-pair-geometry-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion:
      FR292_VISIBLE_EYEBROW_PAIR_CONTRACT_VERSION,
    authorityState:
      'visible_eyebrow_pair_continuous_geometry_only' as const,
    status: 'available' as const,
    axes: Object.freeze([
      axis(
        FR292_MEAN_SPAN_METRIC_REF,
        mean(
          first.spanToFaceWidth.value,
          second.spanToFaceWidth.value,
        ),
        'ratio',
      ),
      axis(
        FR292_MEAN_ARCH_METRIC_REF,
        mean(
          first.archAmplitudeToSpan.value,
          second.archAmplitudeToSpan.value,
        ),
        'ratio',
      ),
      axis(
        FR292_MEAN_TAIL_TILT_METRIC_REF,
        mean(
          first.lateralEndpointTilt.value,
          second.lateralEndpointTilt.value,
        ),
        'degree',
      ),
    ] as const),
    sourceCurveCount: 2 as const,
    browPairOrderSemantic: false as const,
    source: SOURCE_RECEIPT,
    authorityBoundary: AUTHORITY_BOUNDARY,
  });

  assertVisibleEyebrowPairGeometryFR292(result);
  return result;
}

export function assertVisibleEyebrowPairGeometryFR292(
  result: FR292VisibleEyebrowPairGeometryResult,
): void {
  if (
    result.schemaVersion !==
      'fr292-visible-eyebrow-pair-geometry-v1' ||
    result.artifactVersion !== '0.1.0' ||
    result.contractVersion !==
      FR292_VISIBLE_EYEBROW_PAIR_CONTRACT_VERSION ||
    result.authorityState !==
      'visible_eyebrow_pair_continuous_geometry_only' ||
    result.source.sourceContractVersion !==
      FR208_CONTRACT_VERSION ||
    result.source
      .explicitVisibleSemanticCurvesConsumed !== true ||
    result.source
      .providerEyebrowComponentsConsumed !== false ||
    result.source
      .providerComponentRoleMappingIssued !== false ||
    result.source.providerSpecificIndicesExposed !== false ||
    result.source.rawLandmarksExposed !== false ||
    result.source.anatomicalBoundaryRoleAssigned !== false ||
    result.source.sourceObservationRefsExposed !== false ||
    result.source.canonicalAssetDigestExposed !== false
  ) {
    fail('result identity/source boundary drift.');
  }

  if (
    result.authorityBoundary.observableMorphologyOnly !== true ||
    Object.entries(result.authorityBoundary)
      .filter(
        ([key]) => key !== 'observableMorphologyOnly',
      )
      .some(([, value]) => value !== false)
  ) {
    fail('authority widened beyond visible eyebrow-pair morphology.');
  }

  if (result.status === 'available') {
    if (
      result.axes.length !== 3 ||
      result.sourceCurveCount !== 2 ||
      result.browPairOrderSemantic !== false ||
      result.axes[0]?.metricRef !==
        FR292_MEAN_SPAN_METRIC_REF ||
      result.axes[1]?.metricRef !==
        FR292_MEAN_ARCH_METRIC_REF ||
      result.axes[2]?.metricRef !==
        FR292_MEAN_TAIL_TILT_METRIC_REF
    ) {
      fail('available eyebrow-pair axis identity drift.');
    }

    for (const candidate of result.axes) {
      if (
        !Number.isFinite(candidate.value) ||
        candidate.coordinateFrame !==
          'canonical_aligned_right_handed_metric_xy' ||
        candidate.browPairOrderSemantic !== false ||
        candidate.classificationApplied !== false ||
        candidate.thresholdApplied !== false ||
        candidate.calibrationApplied !== false ||
        candidate.traditionalBindingApplied !== false ||
        candidate.anatomicalInterpretationAllowed !== false
      ) {
        fail(
          `eyebrow-pair axis authority drift: ${candidate.metricRef}.`,
        );
      }
    }
  } else if (result.fallbackInvented !== false) {
    fail('unavailable eyebrow-pair geometry invented fallback.');
  }
}
