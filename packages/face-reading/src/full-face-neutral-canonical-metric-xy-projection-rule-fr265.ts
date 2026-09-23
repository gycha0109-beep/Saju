import {
  FR264_RECORD_ID,
  FR264_NEXT_FRONTIER,
  issueThreeDivisionsSuccessorCoordinateFrameAdjudicationFR264,
} from './three-divisions-successor-coordinate-frame-adjudication-fr264.js';
import {
  getPoseNormalizedLipsProjectionRuleFR79,
} from './pose-normalized-lips-geometry-fr79.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR265_RULE_REF =
  'neutral.face.canonical_metric_xy_projection@0.1.0' as const;
export const FR265_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr265-full-face-neutral-canonical-metric-xy-projection-rule.md' as const;
export const FR265_NEXT_FRONTIER =
  'audit_four_anchor_metric_xy_derivation_readiness_and_select_first_nonsemantic_anchor_frontier' as const;

export interface CanonicalMetricPoint3DFR265 {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

export interface CanonicalMetricPointXYFR265 {
  readonly x: number;
  readonly y: number;
}

export interface FullFaceNeutralCanonicalMetricXYProjectionRuleFR265 {
  readonly schemaVersion:
    'fr265-full-face-neutral-canonical-metric-xy-projection-rule-v1';
  readonly artifactVersion: '0.1.0';
  readonly ruleRef: typeof FR265_RULE_REF;
  readonly watchtowerTrack: 'face-research';
  readonly authorityState:
    'reviewed_full_face_neutral_coordinate_projection_rule_only';
  readonly predecessor: {
    readonly fr264RecordId: typeof FR264_RECORD_ID;
    readonly fr264NextFrontier: typeof FR264_NEXT_FRONTIER;
    readonly selectedTargetFrame:
      'canonical_aligned_right_handed_metric_xy';
  };
  readonly sourceCoordinateFrame:
    'canonical_aligned_right_handed_metric_3d';
  readonly targetCoordinateFrame:
    'canonical_aligned_right_handed_metric_xy';
  readonly sourceUnit: 'centimeter';
  readonly targetUnit: 'centimeter';
  readonly projectionKind: 'canonical_frontal_orthographic_xy';
  readonly formula: 'x2d=x3d;y2d=y3d';
  readonly depthTreatment:
    'drop_z_only_after_canonical_inverse_pose_alignment';
  readonly sourceAlignmentRequirement:
    'canonical_inverse_pose_alignment_already_applied';
  readonly axisConvention: 'retain_canonical_metric_x_right_y_up';
  readonly recenteringApplied: false;
  readonly rescalingApplied: false;
  readonly perspectiveReprojectionApplied: false;
  readonly screenCoordinateReconstructionApplied: false;
  readonly pointOrderPreserved: true;
  readonly ruleScope:
    'governed_neutral_face_metric_geometry_coordinates_without_provider_or_anchor_semantics';
  readonly evidence: {
    readonly fr79WitnessRuleRef:
      'fr79:canonical-metric-xy-orthographic@0.1.0';
    readonly fr79WitnessFormula: 'x2d=x3d;y2d=y3d';
    readonly fr79WitnessScope: 'lips_specific_geometry_contract';
    readonly fr79AuthorityReusedAsGlobalAuthority: false;
    readonly independentlyReviewedForGenericNeutralCoordinateUse: true;
  };
  readonly authorityBoundary: {
    readonly coordinateProjectionOnly: true;
    readonly fullFaceProviderMeshIssued: false;
    readonly providerVertexIndexIssued: false;
    readonly providerIndexSemanticBindingIssued: false;
    readonly anatomicalRoleIssued: false;
    readonly traditionalAnchorIdentityIssued: false;
    readonly traditionalNeutralEquivalenceIssued: false;
    readonly hairlineSurfaceIssued: false;
    readonly browSurfaceIssued: false;
    readonly zhuntouReferenceIssued: false;
    readonly digeReferenceIssued: false;
    readonly metricDefinitionIssued: false;
    readonly thresholdIssued: false;
    readonly calibrationIssued: false;
    readonly classifierIssued: false;
    readonly F1ClaimIssued: false;
    readonly F6ClaimIssued: false;
    readonly fortuneClaimIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly researchNoteRef: typeof FR265_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR265_NEXT_FRONTIER;
}

export interface FullFaceNeutralMetricXYProjectionRequestFR265 {
  readonly sourceCoordinateFrame:
    'canonical_aligned_right_handed_metric_3d';
  readonly sourceUnit: 'centimeter';
  readonly canonicalInversePoseAligned: true;
  readonly sourceGeometryRef: string;
  readonly points: readonly CanonicalMetricPoint3DFR265[];
}

export interface FullFaceNeutralMetricXYProjectionResultFR265 {
  readonly schemaVersion:
    'fr265-full-face-neutral-canonical-metric-xy-projection-result-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'neutral_coordinate_projection_result_only';
  readonly ruleRef: typeof FR265_RULE_REF;
  readonly coordinateFrame:
    'canonical_aligned_right_handed_metric_xy';
  readonly unit: 'centimeter';
  readonly points: readonly CanonicalMetricPointXYFR265[];
  readonly pointCount: number;
  readonly source: {
    readonly sourceCoordinateFrame:
      'canonical_aligned_right_handed_metric_3d';
    readonly sourceUnit: 'centimeter';
    readonly canonicalInversePoseAligned: true;
    readonly sourceGeometryRef: string;
    readonly sourcePointCount: number;
  };
  readonly projectionReceipt: {
    readonly formula: 'x2d=x3d;y2d=y3d';
    readonly depthDropped: true;
    readonly pointOrderPreserved: true;
    readonly recenteringApplied: false;
    readonly rescalingApplied: false;
    readonly perspectiveReprojectionApplied: false;
    readonly screenCoordinateReconstructionApplied: false;
  };
  readonly authorityBoundary: {
    readonly coordinateProjectionOnly: true;
    readonly providerVertexIndexIssued: false;
    readonly anatomicalRoleIssued: false;
    readonly traditionalAnchorIdentityIssued: false;
    readonly traditionalNeutralEquivalenceIssued: false;
    readonly metricDefinitionIssued: false;
    readonly semanticClaimIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

export const FULL_FACE_NEUTRAL_CANONICAL_METRIC_XY_PROJECTION_RULE_FR265:
FullFaceNeutralCanonicalMetricXYProjectionRuleFR265 = Object.freeze({
  schemaVersion:
    'fr265-full-face-neutral-canonical-metric-xy-projection-rule-v1' as const,
  artifactVersion: '0.1.0' as const,
  ruleRef: FR265_RULE_REF,
  watchtowerTrack: 'face-research' as const,
  authorityState:
    'reviewed_full_face_neutral_coordinate_projection_rule_only' as const,
  predecessor: Object.freeze({
    fr264RecordId: FR264_RECORD_ID,
    fr264NextFrontier: FR264_NEXT_FRONTIER,
    selectedTargetFrame:
      'canonical_aligned_right_handed_metric_xy' as const,
  }),
  sourceCoordinateFrame:
    'canonical_aligned_right_handed_metric_3d' as const,
  targetCoordinateFrame:
    'canonical_aligned_right_handed_metric_xy' as const,
  sourceUnit: 'centimeter' as const,
  targetUnit: 'centimeter' as const,
  projectionKind: 'canonical_frontal_orthographic_xy' as const,
  formula: 'x2d=x3d;y2d=y3d' as const,
  depthTreatment:
    'drop_z_only_after_canonical_inverse_pose_alignment' as const,
  sourceAlignmentRequirement:
    'canonical_inverse_pose_alignment_already_applied' as const,
  axisConvention: 'retain_canonical_metric_x_right_y_up' as const,
  recenteringApplied: false as const,
  rescalingApplied: false as const,
  perspectiveReprojectionApplied: false as const,
  screenCoordinateReconstructionApplied: false as const,
  pointOrderPreserved: true as const,
  ruleScope:
    'governed_neutral_face_metric_geometry_coordinates_without_provider_or_anchor_semantics' as const,
  evidence: Object.freeze({
    fr79WitnessRuleRef:
      'fr79:canonical-metric-xy-orthographic@0.1.0' as const,
    fr79WitnessFormula: 'x2d=x3d;y2d=y3d' as const,
    fr79WitnessScope: 'lips_specific_geometry_contract' as const,
    fr79AuthorityReusedAsGlobalAuthority: false as const,
    independentlyReviewedForGenericNeutralCoordinateUse: true as const,
  }),
  authorityBoundary: Object.freeze({
    coordinateProjectionOnly: true as const,
    fullFaceProviderMeshIssued: false as const,
    providerVertexIndexIssued: false as const,
    providerIndexSemanticBindingIssued: false as const,
    anatomicalRoleIssued: false as const,
    traditionalAnchorIdentityIssued: false as const,
    traditionalNeutralEquivalenceIssued: false as const,
    hairlineSurfaceIssued: false as const,
    browSurfaceIssued: false as const,
    zhuntouReferenceIssued: false as const,
    digeReferenceIssued: false as const,
    metricDefinitionIssued: false as const,
    thresholdIssued: false as const,
    calibrationIssued: false as const,
    classifierIssued: false as const,
    F1ClaimIssued: false as const,
    F6ClaimIssued: false as const,
    fortuneClaimIssued: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  }),
  researchNoteRef: FR265_RESEARCH_NOTE_REF,
  nextFrontier: FR265_NEXT_FRONTIER,
});

const RULE_ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-265 ${message}`);
}

function finitePoint(point: CanonicalMetricPoint3DFR265, index: number): void {
  if (
    !Number.isFinite(point.x) ||
    !Number.isFinite(point.y) ||
    !Number.isFinite(point.z)
  ) {
    fail(`points[${index}] must contain finite x/y/z coordinates.`);
  }
}

export function assertFullFaceNeutralCanonicalMetricXYProjectionRuleFR265(
  rule: FullFaceNeutralCanonicalMetricXYProjectionRuleFR265,
): void {
  const fr264 = issueThreeDivisionsSuccessorCoordinateFrameAdjudicationFR264();
  const fr79 = getPoseNormalizedLipsProjectionRuleFR79();

  if (
    rule.schemaVersion !==
      'fr265-full-face-neutral-canonical-metric-xy-projection-rule-v1' ||
    rule.artifactVersion !== '0.1.0' ||
    rule.ruleRef !== FR265_RULE_REF ||
    rule.watchtowerTrack !== 'face-research' ||
    rule.authorityState !==
      'reviewed_full_face_neutral_coordinate_projection_rule_only'
  ) fail('identity boundary drift.');

  if (
    fr264.recordId !== FR264_RECORD_ID ||
    fr264.nextFrontier !== FR264_NEXT_FRONTIER ||
    fr264.decision.selectedTargetFrame !==
      'canonical_aligned_right_handed_metric_xy' ||
    fr264.projectionGap.fullFaceMetricXYProjectionAuthorityExists !== false ||
    fr264.projectionGap.fr79MayBeSilentlyGeneralized !== false
  ) fail('FR264 predecessor boundary drift.');

  if (
    rule.predecessor.fr264RecordId !== FR264_RECORD_ID ||
    rule.predecessor.fr264NextFrontier !== FR264_NEXT_FRONTIER ||
    rule.predecessor.selectedTargetFrame !==
      'canonical_aligned_right_handed_metric_xy'
  ) fail('predecessor receipt drift.');

  if (
    rule.sourceCoordinateFrame !==
      'canonical_aligned_right_handed_metric_3d' ||
    rule.targetCoordinateFrame !==
      'canonical_aligned_right_handed_metric_xy' ||
    rule.sourceUnit !== 'centimeter' ||
    rule.targetUnit !== 'centimeter' ||
    rule.projectionKind !== 'canonical_frontal_orthographic_xy' ||
    rule.formula !== 'x2d=x3d;y2d=y3d' ||
    rule.depthTreatment !==
      'drop_z_only_after_canonical_inverse_pose_alignment' ||
    rule.sourceAlignmentRequirement !==
      'canonical_inverse_pose_alignment_already_applied' ||
    rule.axisConvention !== 'retain_canonical_metric_x_right_y_up' ||
    rule.recenteringApplied !== false ||
    rule.rescalingApplied !== false ||
    rule.perspectiveReprojectionApplied !== false ||
    rule.screenCoordinateReconstructionApplied !== false ||
    rule.pointOrderPreserved !== true
  ) fail('projection rule drift.');

  if (
    fr79.authorityState !== 'reviewed_neutral_orthographic_projection_rule' ||
    fr79.projectionRuleRef !==
      'fr79:canonical-metric-xy-orthographic@0.1.0' ||
    fr79.formula !== 'x2d=x3d;y2d=y3d' ||
    fr79.depthTreatment !==
      'drop_z_only_after_canonical_inverse_pose_alignment' ||
    fr79.axisConvention !== 'retain_canonical_metric_x_right_y_up' ||
    fr79.semanticAuthority !== false
  ) fail('FR79 mathematical witness drift.');

  if (
    rule.evidence.fr79WitnessRuleRef !== fr79.projectionRuleRef ||
    rule.evidence.fr79WitnessFormula !== fr79.formula ||
    rule.evidence.fr79WitnessScope !== 'lips_specific_geometry_contract' ||
    rule.evidence.fr79AuthorityReusedAsGlobalAuthority !== false ||
    rule.evidence.independentlyReviewedForGenericNeutralCoordinateUse !== true
  ) fail('projection evidence boundary drift.');

  if (
    rule.authorityBoundary.coordinateProjectionOnly !== true ||
    Object.entries(rule.authorityBoundary)
      .filter(([key]) => key !== 'coordinateProjectionOnly')
      .some(([, value]) => value !== false)
  ) fail('authority widened beyond coordinate projection.');

  if (
    rule.researchNoteRef !== FR265_RESEARCH_NOTE_REF ||
    rule.nextFrontier !== FR265_NEXT_FRONTIER
  ) fail('research continuation drift.');
}

export function issueFullFaceNeutralCanonicalMetricXYProjectionRuleFR265():
FullFaceNeutralCanonicalMetricXYProjectionRuleFR265 {
  assertFullFaceNeutralCanonicalMetricXYProjectionRuleFR265(
    FULL_FACE_NEUTRAL_CANONICAL_METRIC_XY_PROJECTION_RULE_FR265,
  );
  RULE_ISSUED.add(FULL_FACE_NEUTRAL_CANONICAL_METRIC_XY_PROJECTION_RULE_FR265);
  return FULL_FACE_NEUTRAL_CANONICAL_METRIC_XY_PROJECTION_RULE_FR265;
}

export function assertIssuedFullFaceNeutralCanonicalMetricXYProjectionRuleFR265(
  rule: FullFaceNeutralCanonicalMetricXYProjectionRuleFR265,
): void {
  assertFullFaceNeutralCanonicalMetricXYProjectionRuleFR265(rule);
  if (!RULE_ISSUED.has(rule)) fail('projection rule was not issued by FR265.');
}

export function projectNeutralCanonicalMetricGeometryToXYFR265(
  request: FullFaceNeutralMetricXYProjectionRequestFR265,
  rule: FullFaceNeutralCanonicalMetricXYProjectionRuleFR265,
): FullFaceNeutralMetricXYProjectionResultFR265 {
  assertIssuedFullFaceNeutralCanonicalMetricXYProjectionRuleFR265(rule);

  if (
    request.sourceCoordinateFrame !==
      'canonical_aligned_right_handed_metric_3d' ||
    request.sourceUnit !== 'centimeter' ||
    request.canonicalInversePoseAligned !== true
  ) fail('projection request source frame/alignment boundary drift.');

  const sourceGeometryRef = request.sourceGeometryRef.trim();
  if (sourceGeometryRef.length === 0) {
    fail('sourceGeometryRef must be non-empty.');
  }
  if (request.points.length === 0) {
    fail('projection request requires at least one point.');
  }
  request.points.forEach(finitePoint);

  const points = Object.freeze(
    request.points.map((point) =>
      Object.freeze({
        x: point.x,
        y: point.y,
      }),
    ),
  );

  const result: FullFaceNeutralMetricXYProjectionResultFR265 = Object.freeze({
    schemaVersion:
      'fr265-full-face-neutral-canonical-metric-xy-projection-result-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'neutral_coordinate_projection_result_only' as const,
    ruleRef: FR265_RULE_REF,
    coordinateFrame:
      'canonical_aligned_right_handed_metric_xy' as const,
    unit: 'centimeter' as const,
    points,
    pointCount: points.length,
    source: Object.freeze({
      sourceCoordinateFrame: request.sourceCoordinateFrame,
      sourceUnit: request.sourceUnit,
      canonicalInversePoseAligned: request.canonicalInversePoseAligned,
      sourceGeometryRef,
      sourcePointCount: request.points.length,
    }),
    projectionReceipt: Object.freeze({
      formula: 'x2d=x3d;y2d=y3d' as const,
      depthDropped: true as const,
      pointOrderPreserved: true as const,
      recenteringApplied: false as const,
      rescalingApplied: false as const,
      perspectiveReprojectionApplied: false as const,
      screenCoordinateReconstructionApplied: false as const,
    }),
    authorityBoundary: Object.freeze({
      coordinateProjectionOnly: true as const,
      providerVertexIndexIssued: false as const,
      anatomicalRoleIssued: false as const,
      traditionalAnchorIdentityIssued: false as const,
      traditionalNeutralEquivalenceIssued: false as const,
      metricDefinitionIssued: false as const,
      semanticClaimIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
  });

  assertFullFaceNeutralMetricXYProjectionResultFR265(result);
  return result;
}

export function assertFullFaceNeutralMetricXYProjectionResultFR265(
  result: FullFaceNeutralMetricXYProjectionResultFR265,
): void {
  if (
    result.schemaVersion !==
      'fr265-full-face-neutral-canonical-metric-xy-projection-result-v1' ||
    result.artifactVersion !== '0.1.0' ||
    result.authorityState !== 'neutral_coordinate_projection_result_only' ||
    result.ruleRef !== FR265_RULE_REF ||
    result.coordinateFrame !==
      'canonical_aligned_right_handed_metric_xy' ||
    result.unit !== 'centimeter' ||
    result.pointCount !== result.points.length ||
    result.pointCount < 1 ||
    result.source.sourceCoordinateFrame !==
      'canonical_aligned_right_handed_metric_3d' ||
    result.source.sourceUnit !== 'centimeter' ||
    result.source.canonicalInversePoseAligned !== true ||
    result.source.sourceGeometryRef.trim().length === 0 ||
    result.source.sourcePointCount !== result.pointCount
  ) fail('projection result identity/source drift.');

  result.points.forEach((point, index) => {
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) {
      fail(`projected points[${index}] must contain finite x/y.`);
    }
    if (Object.keys(point).some((key) => key !== 'x' && key !== 'y')) {
      fail(`projected points[${index}] exposes unauthorized field.`);
    }
  });

  if (
    result.projectionReceipt.formula !== 'x2d=x3d;y2d=y3d' ||
    result.projectionReceipt.depthDropped !== true ||
    result.projectionReceipt.pointOrderPreserved !== true ||
    result.projectionReceipt.recenteringApplied !== false ||
    result.projectionReceipt.rescalingApplied !== false ||
    result.projectionReceipt.perspectiveReprojectionApplied !== false ||
    result.projectionReceipt.screenCoordinateReconstructionApplied !== false
  ) fail('projection receipt drift.');

  if (
    result.authorityBoundary.coordinateProjectionOnly !== true ||
    Object.entries(result.authorityBoundary)
      .filter(([key]) => key !== 'coordinateProjectionOnly')
      .some(([, value]) => value !== false)
  ) fail('projection result authority widened.');
}
