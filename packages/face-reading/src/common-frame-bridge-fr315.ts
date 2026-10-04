import {
  FR265_RULE_REF,
  issueFullFaceNeutralCanonicalMetricXYProjectionRuleFR265,
} from './full-face-neutral-canonical-metric-xy-projection-rule-fr265.js';
import {
  getPoseNormalizedLipsProjectionRuleFR79,
} from './pose-normalized-lips-geometry-fr79.js';
import {
  FR303_VISIBLE_CENTRAL_GROOVE_VERTICAL_REFERENCE_REF,
  assertVisibleCentralGrooveVerticalReferenceFR303,
  type FR303VisibleCentralGrooveVerticalReference,
} from './visible-central-groove-vertical-reference-fr303.js';
import {
  FR305_CURRENT_GATE,
  FR305_VISIBLE_HAIRLINE_VERTICAL_REFERENCE_REF,
} from './visible-hairline-vertical-reference-fr305.js';
import {
  FR314_CURRENT_GATE,
} from './visible-hairline-local-observation-materialization-fr314.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR315_COMMON_FRAME_BRIDGE_CONTRACT_VERSION =
  'FR315-COMMON-FRAME-BRIDGE-v1' as const;

export const FR315_CENTRAL_GROOVE_METRIC_REFERENCE_REF =
  'neutral.face.visible_central_groove.axis_midpoint_vertical_coordinate.canonical_metric_xy@0.1.0' as const;

export interface FR315AuthorityBoundary {
  readonly coordinateBridgeOnly: true;
  readonly sourceObservationAuthorityExpanded: false;
  readonly anatomicalIdentityIssued: false;
  readonly traditionalBindingIssued: false;
  readonly imageNormalizedHairlineMetricBridgeIssued: false;
  readonly mixedFrameSubtractionAuthorized: false;
  readonly threeDivisionsBoundaryIssued: false;
  readonly threeDivisionsSpanIssued: false;
  readonly thresholdIssued: false;
  readonly calibrationIssued: false;
  readonly classifierIssued: false;
  readonly productColumnMaterialized: false;
  readonly productionActivated: false;
  readonly commerceActivated: false;
}

export type FR315CentralGrooveMetricBridgeResult =
  | Readonly<{
      schemaVersion:
        'fr315-central-groove-metric-bridge-result-v1';
      contractVersion:
        typeof FR315_COMMON_FRAME_BRIDGE_CONTRACT_VERSION;
      authorityState:
        'neutral_vertical_coordinate_frame_bridge_only';
      status: 'available';
      observationRef:
        typeof FR315_CENTRAL_GROOVE_METRIC_REFERENCE_REF;
      sourceObservationRef:
        typeof FR303_VISIBLE_CENTRAL_GROOVE_VERTICAL_REFERENCE_REF;
      value: number;
      unit: 'centimeter';
      sourceCoordinateFrame: 'pose_normalized_face_2d';
      coordinateFrame:
        'canonical_aligned_right_handed_metric_xy';
      bridgeRule:
        'identity_y_bridge_between_fr79_pose_normalized_plane_and_fr265_canonical_metric_xy';
      formula: 'y_metric_xy=y_pose_normalized';
      valueIdentityPreserved: true;
      sourceSameCaptureAndDigestValidatedByFR291: true;
      fr79ProjectionRuleRef:
        'fr79:canonical-metric-xy-orthographic@0.1.0';
      fr265ProjectionRuleRef: typeof FR265_RULE_REF;
      sourceRecentered: false;
      sourceRescaled: false;
      perspectiveReprojectionApplied: false;
      screenCoordinateReconstructionApplied: false;
      failClosedWhenUnavailable: true;
      crossAnchorMetricFrameReady: true;
      authorityBoundary: FR315AuthorityBoundary;
    }>
  | Readonly<{
      schemaVersion:
        'fr315-central-groove-metric-bridge-result-v1';
      contractVersion:
        typeof FR315_COMMON_FRAME_BRIDGE_CONTRACT_VERSION;
      authorityState:
        'neutral_vertical_coordinate_frame_bridge_only';
      status: 'unavailable';
      reason:
        'fr303_visible_central_groove_reference_unavailable';
      fallbackInvented: false;
      crossAnchorMetricFrameReady: false;
      authorityBoundary: FR315AuthorityBoundary;
    }>;

const AUTHORITY_BOUNDARY: FR315AuthorityBoundary =
  Object.freeze({
    coordinateBridgeOnly: true as const,
    sourceObservationAuthorityExpanded: false as const,
    anatomicalIdentityIssued: false as const,
    traditionalBindingIssued: false as const,
    imageNormalizedHairlineMetricBridgeIssued:
      false as const,
    mixedFrameSubtractionAuthorized: false as const,
    threeDivisionsBoundaryIssued: false as const,
    threeDivisionsSpanIssued: false as const,
    thresholdIssued: false as const,
    calibrationIssued: false as const,
    classifierIssued: false as const,
    productColumnMaterialized: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  });

export const FR315_COMMON_FRAME_READINESS =
  Object.freeze({
    schemaVersion:
      'fr315-seven-reference-common-frame-readiness-v1' as const,
    contractVersion:
      FR315_COMMON_FRAME_BRIDGE_CONTRACT_VERSION,
    watchtowerTrack: 'face-observation-engine' as const,
    parentIssue: 1521 as const,
    selectedCommonFrame:
      'canonical_aligned_right_handed_metric_xy' as const,
    selectedCommonUnit: 'centimeter' as const,
    references: Object.freeze([
      Object.freeze({
        reference:
          'neutral.face.visible_lower_face.inferior_vertical_coordinate@0.1.0' as const,
        originalFrame:
          'canonical_aligned_right_handed_metric_xy' as const,
        originalUnit: 'centimeter' as const,
        commonFrameState:
          'already_in_selected_common_frame' as const,
      }),
      Object.freeze({
        reference:
          'neutral.face.visible_brow.arc_length_weighted_vertical_coordinate@0.1.0' as const,
        originalFrame:
          'canonical_aligned_right_handed_metric_xy' as const,
        originalUnit: 'centimeter' as const,
        commonFrameState:
          'already_in_selected_common_frame' as const,
      }),
      Object.freeze({
        reference:
          'neutral.face.visible_interbrow.midpoint_vertical_coordinate@0.1.0' as const,
        originalFrame:
          'canonical_aligned_right_handed_metric_xy' as const,
        originalUnit: 'centimeter' as const,
        commonFrameState:
          'already_in_selected_common_frame' as const,
      }),
      Object.freeze({
        reference:
          FR303_VISIBLE_CENTRAL_GROOVE_VERTICAL_REFERENCE_REF,
        originalFrame: 'pose_normalized_face_2d' as const,
        originalUnit: 'centimeter' as const,
        commonFrameState:
          'explicit_fr315_identity_bridge_available' as const,
      }),
      Object.freeze({
        reference:
          'neutral.face.nasal_apex.vertical_coordinate@0.1.0' as const,
        originalFrame:
          'canonical_aligned_right_handed_metric_xy' as const,
        originalUnit: 'centimeter' as const,
        commonFrameState:
          'already_in_selected_common_frame' as const,
      }),
      Object.freeze({
        reference:
          'neutral.face.nasal_bridge_root.vertical_coordinate@0.1.0' as const,
        originalFrame:
          'canonical_aligned_right_handed_metric_xy' as const,
        originalUnit: 'centimeter' as const,
        commonFrameState:
          'already_in_selected_common_frame' as const,
      }),
      Object.freeze({
        reference:
          FR305_VISIBLE_HAIRLINE_VERTICAL_REFERENCE_REF,
        originalFrame:
          'canonical_image_normalized_2d' as const,
        originalUnit: 'normalized_ratio' as const,
        commonFrameState:
          'blocked_exact_same_capture_image_to_metric_registration_required' as const,
      }),
    ] as const),
    metricFrameReadyReferenceCapabilityCount: 6 as const,
    remainingMetricFrameBridgeCapabilityCount: 1 as const,
    commonFrameComplete: false as const,
    hairlineBridge: Object.freeze({
      issued: false as const,
      sourceFrame:
        'canonical_image_normalized_2d' as const,
      sourceUnit: 'normalized_ratio' as const,
      targetFrame:
        'canonical_aligned_right_handed_metric_xy' as const,
      targetUnit: 'centimeter' as const,
      requiredEvidence:
        'exact_same_capture_image_normalized_to_canonical_metric_registration_and_scale_authority' as const,
      unrelatedAstRegistrationMaySubstitute: false as const,
      faceBoxScaleMaySubstitute: false as const,
      faceOvalScaleMaySubstitute: false as const,
      averageFaceSizeMaySubstitute: false as const,
      providerNormalizedLandmarksMayBeRelabeledAsMetric:
        false as const,
    }),
    mixedFrameSubtractionAuthorized: false as const,
    threeDivisionsSpanExecutionReady: false as const,
    traditionalBindingAdmittedCount: 0 as const,
    productMaterializedCount: 18 as const,
    productionActivated: false as const,
    commerceActivated: false as const,
    nextAction:
      'design_fr316_exact_same_capture_hairline_image_to_canonical_metric_registration_contract' as const,
  });

export const FR315_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr315-common-frame-bridge-gate-v1' as const,
  contractVersion:
    FR315_COMMON_FRAME_BRIDGE_CONTRACT_VERSION,
  watchtowerTrack: 'face-observation-engine' as const,
  parentIssue: 1521 as const,
  centralGrooveMetricBridgeImplemented: true as const,
  hairlineImageToMetricBridgeIssued: false as const,
  commonFrameComplete: false as const,
  actualNeutralReferenceCapabilityCount:
    FR314_CURRENT_GATE.handoffReadyNeutralReferenceCapabilityCount,
  actualRemainingNeutralReferenceCapabilityCount:
    FR314_CURRENT_GATE.remainingNeutralReferenceCapabilityCount,
  metricFrameReadyReferenceCapabilityCount: 6 as const,
  remainingMetricFrameBridgeCapabilityCount: 1 as const,
  realHairlineAdmissionAvailable:
    FR314_CURRENT_GATE.fr313AdmissionAvailable,
  realHairlineObservationMaterialized:
    FR314_CURRENT_GATE.realVisibleHairlineObservationMaterialized,
  traditionalBindingAdmittedCount: 0 as const,
  mixedCoordinateFrameSpanBlocked: true as const,
  threeDivisionsSpanExecutionReady: false as const,
  productMaterializedCount: 18 as const,
  productionActivated: false as const,
  commerceActivated: false as const,
  nextAction:
    'issue_fr316_same_capture_image_to_metric_registration_contract_without_inventing_scale' as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-315 ${message}`,
  );
}

function assertAuthorityBoundary(
  boundary: FR315AuthorityBoundary,
): void {
  if (
    boundary.coordinateBridgeOnly !== true ||
    Object.entries(boundary)
      .filter(([key]) => key !== 'coordinateBridgeOnly')
      .some(([, value]) => value !== false)
  ) {
    fail('authority widened beyond coordinate bridge.');
  }
}

function assertProjectionEquivalenceWitness(): void {
  const fr79 = getPoseNormalizedLipsProjectionRuleFR79();
  const fr265 =
    issueFullFaceNeutralCanonicalMetricXYProjectionRuleFR265();

  if (
    fr79.authorityState !==
      'reviewed_neutral_orthographic_projection_rule' ||
    fr79.sourceCoordinateFrame !==
      'canonical_aligned_right_handed_metric_3d' ||
    fr79.targetCoordinateFrame !==
      'pose_normalized_face_2d' ||
    fr79.sourceUnit !== 'centimeter' ||
    fr79.targetCoordinateUnit !== 'centimeter' ||
    fr79.formula !== 'x2d=x3d;y2d=y3d' ||
    fr79.axisConvention !==
      'retain_canonical_metric_x_right_y_up' ||
    fr79.recenteringApplied !== false ||
    fr79.rescalingApplied !== false ||
    fr79.perspectiveReprojectionApplied !== false ||
    fr79.screenCoordinateReconstructionApplied !== false ||
    fr79.poseCompensated !== true
  ) {
    fail('FR79 pose-normalized metric-plane witness drift.');
  }

  if (
    fr265.ruleRef !== FR265_RULE_REF ||
    fr265.authorityState !==
      'reviewed_full_face_neutral_coordinate_projection_rule_only' ||
    fr265.sourceCoordinateFrame !==
      'canonical_aligned_right_handed_metric_3d' ||
    fr265.targetCoordinateFrame !==
      'canonical_aligned_right_handed_metric_xy' ||
    fr265.sourceUnit !== 'centimeter' ||
    fr265.targetUnit !== 'centimeter' ||
    fr265.formula !== 'x2d=x3d;y2d=y3d' ||
    fr265.axisConvention !==
      'retain_canonical_metric_x_right_y_up' ||
    fr265.recenteringApplied !== false ||
    fr265.rescalingApplied !== false ||
    fr265.perspectiveReprojectionApplied !== false ||
    fr265.screenCoordinateReconstructionApplied !== false
  ) {
    fail('FR265 canonical metric XY witness drift.');
  }

  if (
    fr265.evidence.fr79WitnessRuleRef !==
      fr79.projectionRuleRef ||
    fr265.evidence.fr79WitnessFormula !==
      fr79.formula ||
    fr265.evidence.fr79AuthorityReusedAsGlobalAuthority !==
      false ||
    fr265.evidence
      .independentlyReviewedForGenericNeutralCoordinateUse !==
      true
  ) {
    fail('FR79/FR265 projection-equivalence evidence drift.');
  }
}

export function bridgeVisibleCentralGrooveToCanonicalMetricXYFR315(
  source: FR303VisibleCentralGrooveVerticalReference,
): FR315CentralGrooveMetricBridgeResult {
  assertProjectionEquivalenceWitness();
  assertVisibleCentralGrooveVerticalReferenceFR303(source);

  if (source.status === 'unavailable') {
    const result = Object.freeze({
      schemaVersion:
        'fr315-central-groove-metric-bridge-result-v1' as const,
      contractVersion:
        FR315_COMMON_FRAME_BRIDGE_CONTRACT_VERSION,
      authorityState:
        'neutral_vertical_coordinate_frame_bridge_only' as const,
      status: 'unavailable' as const,
      reason:
        'fr303_visible_central_groove_reference_unavailable' as const,
      fallbackInvented: false as const,
      crossAnchorMetricFrameReady: false as const,
      authorityBoundary: AUTHORITY_BOUNDARY,
    });
    assertFR315CentralGrooveMetricBridgeResult(result);
    return result;
  }

  if (
    source.coordinateFrame !==
      'pose_normalized_face_2d' ||
    source.unit !== 'centimeter' ||
    source.source.sameCaptureAndDigestValidatedByFR291 !== true
  ) {
    fail('FR303 source is not eligible for the narrow FR315 bridge.');
  }

  const result = Object.freeze({
    schemaVersion:
      'fr315-central-groove-metric-bridge-result-v1' as const,
    contractVersion:
      FR315_COMMON_FRAME_BRIDGE_CONTRACT_VERSION,
    authorityState:
      'neutral_vertical_coordinate_frame_bridge_only' as const,
    status: 'available' as const,
    observationRef:
      FR315_CENTRAL_GROOVE_METRIC_REFERENCE_REF,
    sourceObservationRef:
      FR303_VISIBLE_CENTRAL_GROOVE_VERTICAL_REFERENCE_REF,
    value: source.value,
    unit: 'centimeter' as const,
    sourceCoordinateFrame:
      'pose_normalized_face_2d' as const,
    coordinateFrame:
      'canonical_aligned_right_handed_metric_xy' as const,
    bridgeRule:
      'identity_y_bridge_between_fr79_pose_normalized_plane_and_fr265_canonical_metric_xy' as const,
    formula: 'y_metric_xy=y_pose_normalized' as const,
    valueIdentityPreserved: true as const,
    sourceSameCaptureAndDigestValidatedByFR291:
      true as const,
    fr79ProjectionRuleRef:
      'fr79:canonical-metric-xy-orthographic@0.1.0' as const,
    fr265ProjectionRuleRef: FR265_RULE_REF,
    sourceRecentered: false as const,
    sourceRescaled: false as const,
    perspectiveReprojectionApplied: false as const,
    screenCoordinateReconstructionApplied: false as const,
    failClosedWhenUnavailable: true as const,
    crossAnchorMetricFrameReady: true as const,
    authorityBoundary: AUTHORITY_BOUNDARY,
  });

  assertFR315CentralGrooveMetricBridgeResult(result);
  return result;
}

export function assertFR315CentralGrooveMetricBridgeResult(
  result: FR315CentralGrooveMetricBridgeResult,
): void {
  assertAuthorityBoundary(result.authorityBoundary);

  if (
    result.schemaVersion !==
      'fr315-central-groove-metric-bridge-result-v1' ||
    result.contractVersion !==
      FR315_COMMON_FRAME_BRIDGE_CONTRACT_VERSION ||
    result.authorityState !==
      'neutral_vertical_coordinate_frame_bridge_only'
  ) {
    fail('central-groove bridge identity drift.');
  }

  if (result.status === 'available') {
    if (
      result.observationRef !==
        FR315_CENTRAL_GROOVE_METRIC_REFERENCE_REF ||
      result.sourceObservationRef !==
        FR303_VISIBLE_CENTRAL_GROOVE_VERTICAL_REFERENCE_REF ||
      !Number.isFinite(result.value) ||
      result.unit !== 'centimeter' ||
      result.sourceCoordinateFrame !==
        'pose_normalized_face_2d' ||
      result.coordinateFrame !==
        'canonical_aligned_right_handed_metric_xy' ||
      result.bridgeRule !==
        'identity_y_bridge_between_fr79_pose_normalized_plane_and_fr265_canonical_metric_xy' ||
      result.formula !==
        'y_metric_xy=y_pose_normalized' ||
      result.valueIdentityPreserved !== true ||
      result.sourceSameCaptureAndDigestValidatedByFR291 !==
        true ||
      result.fr79ProjectionRuleRef !==
        'fr79:canonical-metric-xy-orthographic@0.1.0' ||
      result.fr265ProjectionRuleRef !== FR265_RULE_REF ||
      result.sourceRecentered !== false ||
      result.sourceRescaled !== false ||
      result.perspectiveReprojectionApplied !== false ||
      result.screenCoordinateReconstructionApplied !== false ||
      result.failClosedWhenUnavailable !== true ||
      result.crossAnchorMetricFrameReady !== true
    ) {
      fail('available central-groove bridge boundary drift.');
    }
  } else if (
    result.reason !==
      'fr303_visible_central_groove_reference_unavailable' ||
    result.fallbackInvented !== false ||
    result.crossAnchorMetricFrameReady !== false
  ) {
    fail('unavailable central-groove bridge boundary drift.');
  }
}

export function assertFR315CommonFrameReadiness(): void {
  const readiness = FR315_COMMON_FRAME_READINESS;

  if (
    readiness.parentIssue !== 1521 ||
    readiness.selectedCommonFrame !==
      'canonical_aligned_right_handed_metric_xy' ||
    readiness.selectedCommonUnit !== 'centimeter' ||
    readiness.references.length !== 7 ||
    readiness.metricFrameReadyReferenceCapabilityCount !== 6 ||
    readiness.remainingMetricFrameBridgeCapabilityCount !== 1 ||
    readiness.commonFrameComplete !== false ||
    readiness.hairlineBridge.issued !== false ||
    readiness.hairlineBridge.sourceFrame !==
      'canonical_image_normalized_2d' ||
    readiness.hairlineBridge.sourceUnit !==
      'normalized_ratio' ||
    readiness.hairlineBridge.targetFrame !==
      'canonical_aligned_right_handed_metric_xy' ||
    readiness.hairlineBridge.targetUnit !== 'centimeter' ||
    readiness.hairlineBridge
      .unrelatedAstRegistrationMaySubstitute !== false ||
    readiness.hairlineBridge.faceBoxScaleMaySubstitute !==
      false ||
    readiness.hairlineBridge.faceOvalScaleMaySubstitute !==
      false ||
    readiness.hairlineBridge.averageFaceSizeMaySubstitute !==
      false ||
    readiness.hairlineBridge
      .providerNormalizedLandmarksMayBeRelabeledAsMetric !==
      false ||
    readiness.mixedFrameSubtractionAuthorized !== false ||
    readiness.threeDivisionsSpanExecutionReady !== false ||
    readiness.traditionalBindingAdmittedCount !== 0 ||
    readiness.productMaterializedCount !== 18 ||
    readiness.productionActivated !== false ||
    readiness.commerceActivated !== false
  ) {
    fail('common-frame readiness drift.');
  }

  const states = readiness.references.map(
    (entry) => entry.commonFrameState,
  );
  if (
    states.filter(
      (state) =>
        state === 'already_in_selected_common_frame',
    ).length !== 5 ||
    states.filter(
      (state) =>
        state ===
        'explicit_fr315_identity_bridge_available',
    ).length !== 1 ||
    states.filter(
      (state) =>
        state ===
        'blocked_exact_same_capture_image_to_metric_registration_required',
    ).length !== 1
  ) {
    fail('seven-reference frame-state cardinality drift.');
  }
}

export function assertFR315CurrentGate(): void {
  const gate = FR315_CURRENT_GATE;

  if (
    FR305_CURRENT_GATE.commonCoordinateFrameBridgeIssued !==
      false ||
    FR305_CURRENT_GATE.mixedCoordinateFrameSpanBlocked !==
      true ||
    FR314_CURRENT_GATE.fr313AdmissionAvailable !== false ||
    FR314_CURRENT_GATE
      .realVisibleHairlineObservationMaterialized !== false ||
    gate.parentIssue !== 1521 ||
    gate.centralGrooveMetricBridgeImplemented !== true ||
    gate.hairlineImageToMetricBridgeIssued !== false ||
    gate.commonFrameComplete !== false ||
    gate.actualNeutralReferenceCapabilityCount !== 6 ||
    gate.actualRemainingNeutralReferenceCapabilityCount !== 1 ||
    gate.metricFrameReadyReferenceCapabilityCount !== 6 ||
    gate.remainingMetricFrameBridgeCapabilityCount !== 1 ||
    gate.realHairlineAdmissionAvailable !== false ||
    gate.realHairlineObservationMaterialized !== false ||
    gate.traditionalBindingAdmittedCount !== 0 ||
    gate.mixedCoordinateFrameSpanBlocked !== true ||
    gate.threeDivisionsSpanExecutionReady !== false ||
    gate.productMaterializedCount !== 18 ||
    gate.productionActivated !== false ||
    gate.commerceActivated !== false
  ) {
    fail('current gate drift.');
  }
}

assertProjectionEquivalenceWitness();
assertFR315CommonFrameReadiness();
assertFR315CurrentGate();
