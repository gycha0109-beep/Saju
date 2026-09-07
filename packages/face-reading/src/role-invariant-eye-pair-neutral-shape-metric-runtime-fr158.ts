import {
  validateFaceEyePairResearchArtifactFR24,
  type FaceEyePairResearchArtifactFR24V1,
} from './face-eye-pair-research-bridge-fr24.js';
import type { NormalizedPoint2DV1 } from './neutral-observation-schema-fr15.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR158_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr158-role-invariant-eye-pair-neutral-shape-metric-runtime.md' as const;
export const FR158_NEXT_FRONTIER =
  'eye_pair_neutral_shape_repeatability_and_capture_sensitivity_evaluation_without_identity_matching_or_semantic_promotion' as const;

const AREA_KEY = 'neutral.eye_pair.closed_cycles.unit_box_area_fill_mean' as const;
const AXIS_KEY = 'neutral.eye_pair.closed_cycles.unit_box_axis_alignment_mean' as const;
const TURN_KEY = 'neutral.eye_pair.closed_cycles.unit_box_mean_absolute_turning_angle' as const;
const METRIC_VERSION = '0.1.0' as const;
const AREA_REF = `${AREA_KEY}@${METRIC_VERSION}` as const;
const AXIS_REF = `${AXIS_KEY}@${METRIC_VERSION}` as const;
const TURN_REF = `${TURN_KEY}@${METRIC_VERSION}` as const;

export type RoleInvariantEyePairNeutralShapeMetricRefFR158V1 =
  | typeof AREA_REF
  | typeof AXIS_REF
  | typeof TURN_REF;

export interface RoleInvariantEyePairNeutralShapeMetricDefinitionFR158V1 {
  readonly metricKey: typeof AREA_KEY | typeof AXIS_KEY | typeof TURN_KEY;
  readonly metricVersion: typeof METRIC_VERSION;
  readonly metricRef: RoleInvariantEyePairNeutralShapeMetricRefFR158V1;
  readonly sourceSurface: 'fr24_two_eye_closed_cycle_research_regions';
  readonly sourceCoordinateFrame: 'canonical_image_normalized_2d';
  readonly normalization: 'per_closed_cycle_axiswise_unit_box';
  readonly unit: 'ratio' | 'radian';
  readonly formula: string;
  readonly componentAggregation: 'role_invariant_mean_over_both_closed_cycles';
  readonly providerTopologyLabelRequiredForFormula: false;
  readonly providerRegionOrderRequiredForFormula: false;
  readonly anatomicalLateralityRequired: false;
  readonly physicalAnthropometricInterpretationAllowed: false;
  readonly identityMatchingInterpretationAllowed: false;
  readonly calibrationRef: null;
  readonly traditionalCriterionBindingRef: null;
}

export interface RoleInvariantEyePairNeutralShapeMetricValueFR158V1 {
  readonly metricRef: RoleInvariantEyePairNeutralShapeMetricRefFR158V1;
  readonly value: number;
  readonly unit: 'ratio' | 'radian';
  readonly sourceCoordinateFrame: 'canonical_image_normalized_2d';
  readonly normalization: 'per_closed_cycle_axiswise_unit_box';
  readonly contributingClosedCycleCount: 2;
  readonly contributingElementCount: 2 | 32;
  readonly classificationApplied: false;
  readonly calibrationApplied: false;
  readonly thresholdApplied: false;
  readonly identityMatchingApplied: false;
  readonly traditionalBindingApplied: false;
}

export interface RoleInvariantEyePairNeutralShapeMetricRuntimeFR158V1 {
  readonly schemaVersion: 'fr158-role-invariant-eye-pair-neutral-shape-metric-runtime-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'role_invariant_eye_pair_neutral_shape_candidates_research_only';
  readonly source: {
    readonly fr24SchemaVersion: 'fr24-eye-pair-research-v1';
    readonly fr24ArtifactVersion: '0.1.0';
    readonly fr24AuthorityState: 'research_projection_only';
    readonly coordinateFrame: 'canonical_image_normalized_2d';
    readonly regionCount: 2;
    readonly regionPointCounts: readonly [16, 16];
    readonly pairConsumptionState: 'unordered_provider_labeled_pair_only';
    readonly anatomicalLateralityResolved: false;
    readonly releaseExactProviderBindingPromoted: false;
  };
  readonly normalization: {
    readonly method: 'per_closed_cycle_axiswise_unit_box';
    readonly purpose: 'remove_translation_and_independent_xy_scale_before_shape_only_metrics';
    readonly absoluteSizePreserved: false;
    readonly originalBoundingBoxAspectRatioPreserved: false;
    readonly poseCompensationPerformed: false;
  };
  readonly metricDefinitions: readonly [
    RoleInvariantEyePairNeutralShapeMetricDefinitionFR158V1,
    RoleInvariantEyePairNeutralShapeMetricDefinitionFR158V1,
    RoleInvariantEyePairNeutralShapeMetricDefinitionFR158V1,
  ];
  readonly metricValues: readonly [
    RoleInvariantEyePairNeutralShapeMetricValueFR158V1,
    RoleInvariantEyePairNeutralShapeMetricValueFR158V1,
    RoleInvariantEyePairNeutralShapeMetricValueFR158V1,
  ];
  readonly empiricalBoundary: {
    readonly captureQualityValidated: false;
    readonly empiricalRepeatabilityEstablished: false;
    readonly captureQualityMeasurementConstructValidated: false;
    readonly numericCaptureQualityThreshold: null;
    readonly numericRepeatabilityAcceptanceThreshold: null;
    readonly constructValidity: 'unresolved';
  };
  readonly authorityBoundary: {
    readonly providerTopologyLabelsUsedInFormula: false;
    readonly providerRegionOrderUsedInFormula: false;
    readonly cycleStartVertexUsedAsSemanticAnchor: false;
    readonly cycleDirectionUsedAsSemanticRole: false;
    readonly anatomicalLateralityResolved: false;
    readonly productionNeutralObservationIssued: false;
    readonly physicalAnthropometricInterpretationAllowed: false;
    readonly identityMatchingPerformed: false;
    readonly biometricTemplateIssued: false;
    readonly classificationIssued: false;
    readonly calibrationIssued: false;
    readonly thresholdsIssued: false;
    readonly criterionStatesIssued: 0;
    readonly structuredClaimsIssued: 0;
    readonly boundedNarrativesIssued: 0;
    readonly traditionalBinding: 'unresolved';
  };
  readonly privacyBoundary: {
    readonly rawImagePersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly rawLandmarkSetPersisted: false;
    readonly embeddingPersisted: false;
    readonly identityTemplatePersisted: false;
    readonly metricValuesPersistedByThisRuntime: false;
  };
  readonly traditionalSemanticAuthority: false;
  readonly researchNoteRef: typeof FR158_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR158_NEXT_FRONTIER;
}

const ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-158 ${message}`);
}

function validateSource(source: FaceEyePairResearchArtifactFR24V1): void {
  validateFaceEyePairResearchArtifactFR24(source);
  if (
    source.schemaVersion !== 'fr24-eye-pair-research-v1'
    || source.artifactVersion !== '0.1.0'
    || source.authorityState !== 'research_projection_only'
    || source.coordinateFrame !== 'canonical_image_normalized_2d'
    || source.regions.length !== 2
    || source.sideAuthority !== 'provider_label_only'
    || source.pairConsumptionState !== 'unordered_provider_labeled_pair_only'
    || source.serializationOrder !== 'provider_topology_symbol_fixed_order_not_side_authority'
    || source.consumerSlotAssignment !== null
    || source.anatomicalLateralityResolved !== false
    || source.productionNeutralObservationIssued !== false
    || source.traditionalSemanticAuthority !== false
    || source.provenance.releaseExactForInstalledPackage !== false
    || source.provenance.rawSourcePersisted !== false
    || source.provenance.rawProviderResponsePersisted !== false
    || source.provenance.biometricEmbeddingPersisted !== false
  ) fail('requires the exact FR-24 research-only eye-pair authority boundary.');
  for (const region of source.regions) {
    if (region.boundary.length !== 16) fail('each FR-24 eye region must remain a 16-point closed cycle.');
  }
}

function unitBox(points: readonly NormalizedPoint2DV1[]): readonly NormalizedPoint2DV1[] {
  if (points.length !== 16) fail('unit-box normalization requires exactly 16 points per closed cycle.');
  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const spanX = maxX - minX;
  const spanY = maxY - minY;
  if (!Number.isFinite(spanX) || spanX <= 0 || !Number.isFinite(spanY) || spanY <= 0) {
    fail('each eye closed cycle must have finite positive X/Y spans.');
  }
  return Object.freeze(points.map((point) => Object.freeze({
    x: (point.x - minX) / spanX,
    y: (point.y - minY) / spanY,
  })));
}

function areaFill(points: readonly NormalizedPoint2DV1[]): number {
  let twiceSignedArea = 0;
  for (let index = 0; index < points.length; index += 1) {
    const current = points[index]!;
    const next = points[(index + 1) % points.length]!;
    twiceSignedArea += (current.x * next.y) - (next.x * current.y);
  }
  const value = Math.abs(twiceSignedArea) / 2;
  if (!Number.isFinite(value) || value <= 0 || value > 1 + 1e-12) {
    fail(`unit-box closed-cycle area fill must be finite within (0,1]; actual=${value}.`);
  }
  return value;
}

function edgeShape(points: readonly NormalizedPoint2DV1[]): { axis: number; turn: number } {
  let axisSum = 0;
  let turnSum = 0;
  for (let index = 0; index < points.length; index += 1) {
    const previous = points[(index - 1 + points.length) % points.length]!;
    const current = points[index]!;
    const next = points[(index + 1) % points.length]!;
    const inX = current.x - previous.x;
    const inY = current.y - previous.y;
    const outX = next.x - current.x;
    const outY = next.y - current.y;
    const inLength = Math.hypot(inX, inY);
    const outLength = Math.hypot(outX, outY);
    if (!Number.isFinite(inLength) || inLength <= 0 || !Number.isFinite(outLength) || outLength <= 0) {
      fail(`unit-box closed-cycle edge length must be finite and positive at vertex ${index}.`);
    }
    axisSum += Math.max(Math.abs(outX), Math.abs(outY)) / outLength;
    const cosine = Math.max(-1, Math.min(1, ((inX * outX) + (inY * outY)) / (inLength * outLength)));
    const angle = Math.acos(cosine);
    if (!Number.isFinite(angle)) fail(`unit-box turning angle must be finite at vertex ${index}.`);
    turnSum += angle;
  }
  return { axis: axisSum / points.length, turn: turnSum / points.length };
}

function definitions(): readonly [
  RoleInvariantEyePairNeutralShapeMetricDefinitionFR158V1,
  RoleInvariantEyePairNeutralShapeMetricDefinitionFR158V1,
  RoleInvariantEyePairNeutralShapeMetricDefinitionFR158V1,
] {
  return Object.freeze([
    Object.freeze({
      metricKey: AREA_KEY,
      metricVersion: METRIC_VERSION,
      metricRef: AREA_REF,
      sourceSurface: 'fr24_two_eye_closed_cycle_research_regions' as const,
      sourceCoordinateFrame: 'canonical_image_normalized_2d' as const,
      normalization: 'per_closed_cycle_axiswise_unit_box' as const,
      unit: 'ratio' as const,
      formula: 'mean(abs(shoelace_area(unit_box(cycle)))) over the two 16-point closed cycles' as const,
      componentAggregation: 'role_invariant_mean_over_both_closed_cycles' as const,
      providerTopologyLabelRequiredForFormula: false as const,
      providerRegionOrderRequiredForFormula: false as const,
      anatomicalLateralityRequired: false as const,
      physicalAnthropometricInterpretationAllowed: false as const,
      identityMatchingInterpretationAllowed: false as const,
      calibrationRef: null,
      traditionalCriterionBindingRef: null,
    }),
    Object.freeze({
      metricKey: AXIS_KEY,
      metricVersion: METRIC_VERSION,
      metricRef: AXIS_REF,
      sourceSurface: 'fr24_two_eye_closed_cycle_research_regions' as const,
      sourceCoordinateFrame: 'canonical_image_normalized_2d' as const,
      normalization: 'per_closed_cycle_axiswise_unit_box' as const,
      unit: 'ratio' as const,
      formula: 'mean(max(abs(dx),abs(dy))/hypot(dx,dy)) over all 32 unit-box closed-cycle edges' as const,
      componentAggregation: 'role_invariant_mean_over_both_closed_cycles' as const,
      providerTopologyLabelRequiredForFormula: false as const,
      providerRegionOrderRequiredForFormula: false as const,
      anatomicalLateralityRequired: false as const,
      physicalAnthropometricInterpretationAllowed: false as const,
      identityMatchingInterpretationAllowed: false as const,
      calibrationRef: null,
      traditionalCriterionBindingRef: null,
    }),
    Object.freeze({
      metricKey: TURN_KEY,
      metricVersion: METRIC_VERSION,
      metricRef: TURN_REF,
      sourceSurface: 'fr24_two_eye_closed_cycle_research_regions' as const,
      sourceCoordinateFrame: 'canonical_image_normalized_2d' as const,
      normalization: 'per_closed_cycle_axiswise_unit_box' as const,
      unit: 'radian' as const,
      formula: 'mean(acos(clamp(dot(unit_incoming,unit_outgoing),-1,1))) over all 32 unit-box closed-cycle vertices' as const,
      componentAggregation: 'role_invariant_mean_over_both_closed_cycles' as const,
      providerTopologyLabelRequiredForFormula: false as const,
      providerRegionOrderRequiredForFormula: false as const,
      anatomicalLateralityRequired: false as const,
      physicalAnthropometricInterpretationAllowed: false as const,
      identityMatchingInterpretationAllowed: false as const,
      calibrationRef: null,
      traditionalCriterionBindingRef: null,
    }),
  ]);
}

export function getRoleInvariantEyePairNeutralShapeMetricDefinitionsFR158(): ReturnType<typeof definitions> {
  return definitions();
}

export function computeRoleInvariantEyePairNeutralShapeMetricsFR158(
  source: FaceEyePairResearchArtifactFR24V1,
): RoleInvariantEyePairNeutralShapeMetricRuntimeFR158V1 {
  validateSource(source);
  const normalized = source.regions.map((region) => unitBox(region.boundary));
  const areas = normalized.map(areaFill);
  const edgeMetrics = normalized.map(edgeShape);
  const area = (areas[0]! + areas[1]!) / 2;
  const axis = (edgeMetrics[0]!.axis + edgeMetrics[1]!.axis) / 2;
  const turn = (edgeMetrics[0]!.turn + edgeMetrics[1]!.turn) / 2;
  if (![area, axis, turn].every(Number.isFinite)) fail('computed eye-pair neutral shape metric must be finite.');
  const [areaDefinition, axisDefinition, turnDefinition] = definitions();

  const result: RoleInvariantEyePairNeutralShapeMetricRuntimeFR158V1 = Object.freeze({
    schemaVersion: 'fr158-role-invariant-eye-pair-neutral-shape-metric-runtime-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'role_invariant_eye_pair_neutral_shape_candidates_research_only' as const,
    source: Object.freeze({
      fr24SchemaVersion: source.schemaVersion,
      fr24ArtifactVersion: source.artifactVersion,
      fr24AuthorityState: source.authorityState,
      coordinateFrame: source.coordinateFrame,
      regionCount: 2 as const,
      regionPointCounts: Object.freeze([16, 16] as const),
      pairConsumptionState: source.pairConsumptionState,
      anatomicalLateralityResolved: false as const,
      releaseExactProviderBindingPromoted: false as const,
    }),
    normalization: Object.freeze({
      method: 'per_closed_cycle_axiswise_unit_box' as const,
      purpose: 'remove_translation_and_independent_xy_scale_before_shape_only_metrics' as const,
      absoluteSizePreserved: false as const,
      originalBoundingBoxAspectRatioPreserved: false as const,
      poseCompensationPerformed: false as const,
    }),
    metricDefinitions: Object.freeze([areaDefinition, axisDefinition, turnDefinition] as const),
    metricValues: Object.freeze([
      Object.freeze({
        metricRef: AREA_REF,
        value: area,
        unit: 'ratio' as const,
        sourceCoordinateFrame: 'canonical_image_normalized_2d' as const,
        normalization: 'per_closed_cycle_axiswise_unit_box' as const,
        contributingClosedCycleCount: 2 as const,
        contributingElementCount: 2 as const,
        classificationApplied: false as const,
        calibrationApplied: false as const,
        thresholdApplied: false as const,
        identityMatchingApplied: false as const,
        traditionalBindingApplied: false as const,
      }),
      Object.freeze({
        metricRef: AXIS_REF,
        value: axis,
        unit: 'ratio' as const,
        sourceCoordinateFrame: 'canonical_image_normalized_2d' as const,
        normalization: 'per_closed_cycle_axiswise_unit_box' as const,
        contributingClosedCycleCount: 2 as const,
        contributingElementCount: 32 as const,
        classificationApplied: false as const,
        calibrationApplied: false as const,
        thresholdApplied: false as const,
        identityMatchingApplied: false as const,
        traditionalBindingApplied: false as const,
      }),
      Object.freeze({
        metricRef: TURN_REF,
        value: turn,
        unit: 'radian' as const,
        sourceCoordinateFrame: 'canonical_image_normalized_2d' as const,
        normalization: 'per_closed_cycle_axiswise_unit_box' as const,
        contributingClosedCycleCount: 2 as const,
        contributingElementCount: 32 as const,
        classificationApplied: false as const,
        calibrationApplied: false as const,
        thresholdApplied: false as const,
        identityMatchingApplied: false as const,
        traditionalBindingApplied: false as const,
      }),
    ] as const),
    empiricalBoundary: Object.freeze({
      captureQualityValidated: false as const,
      empiricalRepeatabilityEstablished: false as const,
      captureQualityMeasurementConstructValidated: false as const,
      numericCaptureQualityThreshold: null,
      numericRepeatabilityAcceptanceThreshold: null,
      constructValidity: 'unresolved' as const,
    }),
    authorityBoundary: Object.freeze({
      providerTopologyLabelsUsedInFormula: false as const,
      providerRegionOrderUsedInFormula: false as const,
      cycleStartVertexUsedAsSemanticAnchor: false as const,
      cycleDirectionUsedAsSemanticRole: false as const,
      anatomicalLateralityResolved: false as const,
      productionNeutralObservationIssued: false as const,
      physicalAnthropometricInterpretationAllowed: false as const,
      identityMatchingPerformed: false as const,
      biometricTemplateIssued: false as const,
      classificationIssued: false as const,
      calibrationIssued: false as const,
      thresholdsIssued: false as const,
      criterionStatesIssued: 0 as const,
      structuredClaimsIssued: 0 as const,
      boundedNarrativesIssued: 0 as const,
      traditionalBinding: 'unresolved' as const,
    }),
    privacyBoundary: Object.freeze({
      rawImagePersisted: false as const,
      rawProviderResponsePersisted: false as const,
      rawLandmarkSetPersisted: false as const,
      embeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
      metricValuesPersistedByThisRuntime: false as const,
    }),
    traditionalSemanticAuthority: false as const,
    researchNoteRef: FR158_RESEARCH_NOTE_REF,
    nextFrontier: FR158_NEXT_FRONTIER,
  });
  ISSUED.add(result);
  return result;
}

export function assertIssuedRoleInvariantEyePairNeutralShapeMetricsFR158(
  result: RoleInvariantEyePairNeutralShapeMetricRuntimeFR158V1,
): void {
  if (!ISSUED.has(result)) fail('metric runtime was not issued by the active FR-158 boundary.');
  if (
    result.schemaVersion !== 'fr158-role-invariant-eye-pair-neutral-shape-metric-runtime-v1'
    || result.artifactVersion !== '0.1.0'
    || result.authorityState !== 'role_invariant_eye_pair_neutral_shape_candidates_research_only'
    || result.source.regionCount !== 2
    || result.source.regionPointCounts[0] !== 16
    || result.source.regionPointCounts[1] !== 16
    || result.source.anatomicalLateralityResolved !== false
    || result.source.releaseExactProviderBindingPromoted !== false
    || result.normalization.poseCompensationPerformed !== false
    || result.metricValues.length !== 3
    || result.metricValues.some((metric) => !Number.isFinite(metric.value) || metric.identityMatchingApplied !== false)
    || result.empiricalBoundary.captureQualityValidated !== false
    || result.empiricalBoundary.empiricalRepeatabilityEstablished !== false
    || result.empiricalBoundary.captureQualityMeasurementConstructValidated !== false
    || result.empiricalBoundary.numericCaptureQualityThreshold !== null
    || result.empiricalBoundary.numericRepeatabilityAcceptanceThreshold !== null
    || result.empiricalBoundary.constructValidity !== 'unresolved'
    || result.authorityBoundary.providerTopologyLabelsUsedInFormula !== false
    || result.authorityBoundary.providerRegionOrderUsedInFormula !== false
    || result.authorityBoundary.anatomicalLateralityResolved !== false
    || result.authorityBoundary.identityMatchingPerformed !== false
    || result.authorityBoundary.biometricTemplateIssued !== false
    || result.authorityBoundary.classificationIssued !== false
    || result.authorityBoundary.thresholdsIssued !== false
    || result.authorityBoundary.traditionalBinding !== 'unresolved'
    || result.traditionalSemanticAuthority !== false
  ) fail('issued metric runtime authority or empirical boundary drift.');
}
