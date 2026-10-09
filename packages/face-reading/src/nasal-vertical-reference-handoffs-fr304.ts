import {
  FR265_RULE_REF,
  issueFullFaceNeutralCanonicalMetricXYProjectionRuleFR265,
  projectNeutralCanonicalMetricGeometryToXYFR265,
} from './full-face-neutral-canonical-metric-xy-projection-rule-fr265.js';
import {
  FR266_REFERENCE_REF,
  assertNeutralNasalApexVerticalReferenceFR266,
  type NeutralNasalApexVerticalReferenceFR266V1,
} from './provider-independent-nasal-apex-reference-fr266.js';
import {
  FR297_NASAL_BRIDGE_ROOT_REFERENCE_CONTRACT_VERSION,
  FR297_NASAL_BRIDGE_ROOT_REFERENCE_DEFINITION_REF,
  assertFR297NasalBridgeRootAuthority,
  type FR297NeutralNasalBridgeRootReference,
} from './provider-independent-neutral-nasal-bridge-root-reference-fr297.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR304_NASAL_VERTICAL_REFERENCE_HANDOFF_CONTRACT_VERSION =
  'FR304-NASAL-VERTICAL-REFERENCE-HANDOFF-v1' as const;

export const FR304_NASAL_APEX_HANDOFF_REF =
  FR266_REFERENCE_REF;

export const FR304_NASAL_BRIDGE_ROOT_VERTICAL_REFERENCE_REF =
  'neutral.face.nasal_bridge_root.vertical_coordinate@0.1.0' as const;

export interface FR304SourceReceipt {
  readonly sourceKind:
    | 'fr266_provider_independent_nasal_apex'
    | 'fr297_provider_independent_nasal_bridge_root';
  readonly sourceReferenceRef: string;
  readonly sourceAuthority:
    | 'research_reference_only'
    | 'benchmark_reference_component_only';
  readonly sourceCoordinateFrame:
    | 'canonical_aligned_right_handed_metric_xy'
    | 'canonical_aligned_right_handed_metric_3d';
  readonly sourceUnit: 'centimeter';
  readonly subjectIdExposed: false;
  readonly captureIdExposed: false;
  readonly annotatorIdExposed: false;
  readonly providerIndexExposed: false;
  readonly traditionalSemanticsExposed: false;
}

export interface FR304AuthorityBoundary {
  readonly neutralReferenceHandoffOnly: true;
  readonly automatedRgbExtractionIssued: false;
  readonly productRuntimeObservationIssued: false;
  readonly anthropometricIdentityPromotedToProduct: false;
  readonly traditionalZhuntouEquivalenceIssued: false;
  readonly traditionalShangenEquivalenceIssued: false;
  readonly traditionalBindingIssued: false;
  readonly threeDivisionsBoundaryIssued: false;
  readonly threeDivisionsSpanIssued: false;
  readonly thresholdIssued: false;
  readonly calibrationIssued: false;
  readonly classifierIssued: false;
  readonly productColumnMaterialized: false;
  readonly productionActivated: false;
  readonly commerceActivated: false;
}

export type FR304NasalApexVerticalReferenceHandoff =
  | Readonly<{
      schemaVersion:
        'fr304-nasal-apex-vertical-reference-handoff-v1';
      artifactVersion: '0.1.0';
      contractVersion:
        typeof FR304_NASAL_VERTICAL_REFERENCE_HANDOFF_CONTRACT_VERSION;
      authorityState:
        'neutral_research_reference_handoff_only';
      status: 'available';
      observationRef: typeof FR304_NASAL_APEX_HANDOFF_REF;
      value: number;
      unit: 'centimeter';
      coordinateFrame:
        'canonical_aligned_right_handed_metric_xy';
      visibilitySemantics:
        'available_only_when_a_governed_fr266_provider_independent_annotation_instance_exists';
      automatedRgbExtractionReady: false;
      failClosedWhenUnavailable: true;
      bridgeReviewState:
        'neutral_reference_ready_for_explicit_binding_review_runtime_extraction_not_issued';
      source: FR304SourceReceipt;
      authorityBoundary: FR304AuthorityBoundary;
    }>
  | Readonly<{
      schemaVersion:
        'fr304-nasal-apex-vertical-reference-handoff-v1';
      artifactVersion: '0.1.0';
      contractVersion:
        typeof FR304_NASAL_VERTICAL_REFERENCE_HANDOFF_CONTRACT_VERSION;
      authorityState:
        'neutral_research_reference_handoff_only';
      status: 'unavailable';
      reason: 'fr266_reference_instance_unavailable';
      fallbackInvented: false;
      automatedRgbExtractionReady: false;
      bridgeReviewState:
        'neutral_reference_instance_unavailable_for_binding_review';
      sourceContractRef: typeof FR266_REFERENCE_REF;
      authorityBoundary: FR304AuthorityBoundary;
    }>;

export type FR304NasalBridgeRootVerticalReferenceHandoff =
  | Readonly<{
      schemaVersion:
        'fr304-nasal-bridge-root-vertical-reference-handoff-v1';
      artifactVersion: '0.1.0';
      contractVersion:
        typeof FR304_NASAL_VERTICAL_REFERENCE_HANDOFF_CONTRACT_VERSION;
      authorityState:
        'neutral_benchmark_reference_handoff_only';
      status: 'available';
      observationRef:
        typeof FR304_NASAL_BRIDGE_ROOT_VERTICAL_REFERENCE_REF;
      value: number;
      unit: 'centimeter';
      coordinateFrame:
        'canonical_aligned_right_handed_metric_xy';
      projectionRuleRef: typeof FR265_RULE_REF;
      visibilitySemantics:
        'available_only_when_a_governed_fr297_provider_independent_annotation_instance_exists';
      automatedRgbExtractionReady: false;
      failClosedWhenUnavailable: true;
      bridgeReviewState:
        'neutral_reference_ready_for_explicit_binding_review_runtime_extraction_not_issued';
      source: FR304SourceReceipt;
      authorityBoundary: FR304AuthorityBoundary;
    }>
  | Readonly<{
      schemaVersion:
        'fr304-nasal-bridge-root-vertical-reference-handoff-v1';
      artifactVersion: '0.1.0';
      contractVersion:
        typeof FR304_NASAL_VERTICAL_REFERENCE_HANDOFF_CONTRACT_VERSION;
      authorityState:
        'neutral_benchmark_reference_handoff_only';
      status: 'unavailable';
      reason: 'fr297_reference_instance_unavailable';
      fallbackInvented: false;
      automatedRgbExtractionReady: false;
      bridgeReviewState:
        'neutral_reference_instance_unavailable_for_binding_review';
      sourceDefinitionRef:
        typeof FR297_NASAL_BRIDGE_ROOT_REFERENCE_DEFINITION_REF;
      authorityBoundary: FR304AuthorityBoundary;
    }>;

const AUTHORITY_BOUNDARY: FR304AuthorityBoundary = Object.freeze({
  neutralReferenceHandoffOnly: true as const,
  automatedRgbExtractionIssued: false as const,
  productRuntimeObservationIssued: false as const,
  anthropometricIdentityPromotedToProduct: false as const,
  traditionalZhuntouEquivalenceIssued: false as const,
  traditionalShangenEquivalenceIssued: false as const,
  traditionalBindingIssued: false as const,
  threeDivisionsBoundaryIssued: false as const,
  threeDivisionsSpanIssued: false as const,
  thresholdIssued: false as const,
  calibrationIssued: false as const,
  classifierIssued: false as const,
  productColumnMaterialized: false as const,
  productionActivated: false as const,
  commerceActivated: false as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-304 ${message}`);
}

function assertAuthorityBoundary(
  boundary: FR304AuthorityBoundary,
): void {
  if (
    boundary.neutralReferenceHandoffOnly !== true ||
    Object.entries(boundary)
      .filter(([key]) => key !== 'neutralReferenceHandoffOnly')
      .some(([, value]) => value !== false)
  ) {
    fail('authority widened beyond neutral reference handoff.');
  }
}

function assertFR297ReferenceInstance(
  source: FR297NeutralNasalBridgeRootReference,
): void {
  assertFR297NasalBridgeRootAuthority();

  if (
    source.schemaVersion !==
      'fr297-neutral-nasal-bridge-root-reference-v1' ||
    source.artifactVersion !== '0.1.0' ||
    source.referenceDefinitionRef !==
      FR297_NASAL_BRIDGE_ROOT_REFERENCE_DEFINITION_REF ||
    source.watchtowerTrack !== 'face-engine' ||
    source.authorityState !==
      'provider_independent_neutral_3d_bridge_root_reference_instance' ||
    source.coordinateFrame !==
      'canonical_aligned_right_handed_metric_3d' ||
    source.unit !== 'centimeter' ||
    !Number.isFinite(source.point.x) ||
    !Number.isFinite(source.point.y) ||
    !Number.isFinite(source.point.z) ||
    source.source.independentReferenceSurfaceVerified !== true ||
    source.source.providerBlind !== true ||
    source.source.providerIndexBlind !== true ||
    source.source.traditionalLabelBlind !== true ||
    source.source.frozenBeforeRgbCandidateScoring !== true ||
    source.authorityBoundary.benchmarkReferenceComponentOnly !== true ||
    Object.entries(source.authorityBoundary)
      .filter(([key]) => key !== 'benchmarkReferenceComponentOnly')
      .some(([, value]) => value !== false)
  ) {
    fail('FR297 bridge-root reference instance boundary drift.');
  }
}

function apexSourceReceipt():
FR304SourceReceipt {
  return Object.freeze({
    sourceKind:
      'fr266_provider_independent_nasal_apex' as const,
    sourceReferenceRef: FR266_REFERENCE_REF,
    sourceAuthority: 'research_reference_only' as const,
    sourceCoordinateFrame:
      'canonical_aligned_right_handed_metric_xy' as const,
    sourceUnit: 'centimeter' as const,
    subjectIdExposed: false as const,
    captureIdExposed: false as const,
    annotatorIdExposed: false as const,
    providerIndexExposed: false as const,
    traditionalSemanticsExposed: false as const,
  });
}

function bridgeRootSourceReceipt():
FR304SourceReceipt {
  return Object.freeze({
    sourceKind:
      'fr297_provider_independent_nasal_bridge_root' as const,
    sourceReferenceRef:
      FR297_NASAL_BRIDGE_ROOT_REFERENCE_DEFINITION_REF,
    sourceAuthority:
      'benchmark_reference_component_only' as const,
    sourceCoordinateFrame:
      'canonical_aligned_right_handed_metric_3d' as const,
    sourceUnit: 'centimeter' as const,
    subjectIdExposed: false as const,
    captureIdExposed: false as const,
    annotatorIdExposed: false as const,
    providerIndexExposed: false as const,
    traditionalSemanticsExposed: false as const,
  });
}

export function createNasalApexVerticalReferenceHandoffFR304(
  source?: NeutralNasalApexVerticalReferenceFR266V1 | null,
): FR304NasalApexVerticalReferenceHandoff {
  if (source == null) {
    const unavailable = Object.freeze({
      schemaVersion:
        'fr304-nasal-apex-vertical-reference-handoff-v1' as const,
      artifactVersion: '0.1.0' as const,
      contractVersion:
        FR304_NASAL_VERTICAL_REFERENCE_HANDOFF_CONTRACT_VERSION,
      authorityState:
        'neutral_research_reference_handoff_only' as const,
      status: 'unavailable' as const,
      reason: 'fr266_reference_instance_unavailable' as const,
      fallbackInvented: false as const,
      automatedRgbExtractionReady: false as const,
      bridgeReviewState:
        'neutral_reference_instance_unavailable_for_binding_review' as const,
      sourceContractRef: FR266_REFERENCE_REF,
      authorityBoundary: AUTHORITY_BOUNDARY,
    });
    assertNasalApexVerticalReferenceHandoffFR304(unavailable);
    return unavailable;
  }

  assertNeutralNasalApexVerticalReferenceFR266(source);

  const result = Object.freeze({
    schemaVersion:
      'fr304-nasal-apex-vertical-reference-handoff-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion:
      FR304_NASAL_VERTICAL_REFERENCE_HANDOFF_CONTRACT_VERSION,
    authorityState:
      'neutral_research_reference_handoff_only' as const,
    status: 'available' as const,
    observationRef: FR304_NASAL_APEX_HANDOFF_REF,
    value: source.value,
    unit: source.unit,
    coordinateFrame: source.coordinateFrame,
    visibilitySemantics:
      'available_only_when_a_governed_fr266_provider_independent_annotation_instance_exists' as const,
    automatedRgbExtractionReady: false as const,
    failClosedWhenUnavailable: true as const,
    bridgeReviewState:
      'neutral_reference_ready_for_explicit_binding_review_runtime_extraction_not_issued' as const,
    source: apexSourceReceipt(),
    authorityBoundary: AUTHORITY_BOUNDARY,
  });

  assertNasalApexVerticalReferenceHandoffFR304(result);
  return result;
}

export function createNasalBridgeRootVerticalReferenceHandoffFR304(
  source?: FR297NeutralNasalBridgeRootReference | null,
): FR304NasalBridgeRootVerticalReferenceHandoff {
  if (source == null) {
    const unavailable = Object.freeze({
      schemaVersion:
        'fr304-nasal-bridge-root-vertical-reference-handoff-v1' as const,
      artifactVersion: '0.1.0' as const,
      contractVersion:
        FR304_NASAL_VERTICAL_REFERENCE_HANDOFF_CONTRACT_VERSION,
      authorityState:
        'neutral_benchmark_reference_handoff_only' as const,
      status: 'unavailable' as const,
      reason: 'fr297_reference_instance_unavailable' as const,
      fallbackInvented: false as const,
      automatedRgbExtractionReady: false as const,
      bridgeReviewState:
        'neutral_reference_instance_unavailable_for_binding_review' as const,
      sourceDefinitionRef:
        FR297_NASAL_BRIDGE_ROOT_REFERENCE_DEFINITION_REF,
      authorityBoundary: AUTHORITY_BOUNDARY,
    });
    assertNasalBridgeRootVerticalReferenceHandoffFR304(
      unavailable,
    );
    return unavailable;
  }

  assertFR297ReferenceInstance(source);

  const projectionRule =
    issueFullFaceNeutralCanonicalMetricXYProjectionRuleFR265();
  const projected =
    projectNeutralCanonicalMetricGeometryToXYFR265(
      {
        sourceCoordinateFrame:
          'canonical_aligned_right_handed_metric_3d',
        sourceUnit: 'centimeter',
        canonicalInversePoseAligned: true,
        sourceGeometryRef:
          'fr304:fr297-provider-independent-nasal-bridge-root',
        points: Object.freeze([
          Object.freeze({
            x: source.point.x,
            y: source.point.y,
            z: source.point.z,
          }),
        ]),
      },
      projectionRule,
    );

  const point = projected.points[0];
  if (point === undefined || !Number.isFinite(point.y)) {
    fail('FR265 projection did not return one finite bridge-root point.');
  }

  const result = Object.freeze({
    schemaVersion:
      'fr304-nasal-bridge-root-vertical-reference-handoff-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion:
      FR304_NASAL_VERTICAL_REFERENCE_HANDOFF_CONTRACT_VERSION,
    authorityState:
      'neutral_benchmark_reference_handoff_only' as const,
    status: 'available' as const,
    observationRef:
      FR304_NASAL_BRIDGE_ROOT_VERTICAL_REFERENCE_REF,
    value: point.y,
    unit: 'centimeter' as const,
    coordinateFrame:
      'canonical_aligned_right_handed_metric_xy' as const,
    projectionRuleRef: FR265_RULE_REF,
    visibilitySemantics:
      'available_only_when_a_governed_fr297_provider_independent_annotation_instance_exists' as const,
    automatedRgbExtractionReady: false as const,
    failClosedWhenUnavailable: true as const,
    bridgeReviewState:
      'neutral_reference_ready_for_explicit_binding_review_runtime_extraction_not_issued' as const,
    source: bridgeRootSourceReceipt(),
    authorityBoundary: AUTHORITY_BOUNDARY,
  });

  assertNasalBridgeRootVerticalReferenceHandoffFR304(result);
  return result;
}

export function assertNasalApexVerticalReferenceHandoffFR304(
  result: FR304NasalApexVerticalReferenceHandoff,
): void {
  assertAuthorityBoundary(result.authorityBoundary);

  if (
    result.schemaVersion !==
      'fr304-nasal-apex-vertical-reference-handoff-v1' ||
    result.artifactVersion !== '0.1.0' ||
    result.contractVersion !==
      FR304_NASAL_VERTICAL_REFERENCE_HANDOFF_CONTRACT_VERSION ||
    result.authorityState !==
      'neutral_research_reference_handoff_only' ||
    result.automatedRgbExtractionReady !== false
  ) {
    fail('nasal-apex handoff identity boundary drift.');
  }

  if (result.status === 'available') {
    if (
      result.observationRef !== FR266_REFERENCE_REF ||
      !Number.isFinite(result.value) ||
      result.unit !== 'centimeter' ||
      result.coordinateFrame !==
        'canonical_aligned_right_handed_metric_xy' ||
      result.failClosedWhenUnavailable !== true ||
      result.source.sourceKind !==
        'fr266_provider_independent_nasal_apex' ||
      result.source.sourceAuthority !==
        'research_reference_only' ||
      result.source.subjectIdExposed !== false ||
      result.source.captureIdExposed !== false ||
      result.source.annotatorIdExposed !== false ||
      result.source.providerIndexExposed !== false ||
      result.source.traditionalSemanticsExposed !== false
    ) {
      fail('available nasal-apex handoff boundary drift.');
    }
  } else if (
    result.reason !== 'fr266_reference_instance_unavailable' ||
    result.fallbackInvented !== false ||
    result.sourceContractRef !== FR266_REFERENCE_REF
  ) {
    fail('unavailable nasal-apex handoff boundary drift.');
  }
}

export function assertNasalBridgeRootVerticalReferenceHandoffFR304(
  result: FR304NasalBridgeRootVerticalReferenceHandoff,
): void {
  assertAuthorityBoundary(result.authorityBoundary);

  if (
    result.schemaVersion !==
      'fr304-nasal-bridge-root-vertical-reference-handoff-v1' ||
    result.artifactVersion !== '0.1.0' ||
    result.contractVersion !==
      FR304_NASAL_VERTICAL_REFERENCE_HANDOFF_CONTRACT_VERSION ||
    result.authorityState !==
      'neutral_benchmark_reference_handoff_only' ||
    result.automatedRgbExtractionReady !== false
  ) {
    fail('bridge-root handoff identity boundary drift.');
  }

  if (result.status === 'available') {
    if (
      result.observationRef !==
        FR304_NASAL_BRIDGE_ROOT_VERTICAL_REFERENCE_REF ||
      !Number.isFinite(result.value) ||
      result.unit !== 'centimeter' ||
      result.coordinateFrame !==
        'canonical_aligned_right_handed_metric_xy' ||
      result.projectionRuleRef !== FR265_RULE_REF ||
      result.failClosedWhenUnavailable !== true ||
      result.source.sourceKind !==
        'fr297_provider_independent_nasal_bridge_root' ||
      result.source.sourceAuthority !==
        'benchmark_reference_component_only' ||
      result.source.subjectIdExposed !== false ||
      result.source.captureIdExposed !== false ||
      result.source.annotatorIdExposed !== false ||
      result.source.providerIndexExposed !== false ||
      result.source.traditionalSemanticsExposed !== false
    ) {
      fail('available bridge-root handoff boundary drift.');
    }
  } else if (
    result.reason !== 'fr297_reference_instance_unavailable' ||
    result.fallbackInvented !== false ||
    result.sourceDefinitionRef !==
      FR297_NASAL_BRIDGE_ROOT_REFERENCE_DEFINITION_REF
  ) {
    fail('unavailable bridge-root handoff boundary drift.');
  }
}

export const FR304_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr304-nasal-vertical-reference-handoff-gate-v1' as const,
  watchtowerTrack: 'face-engine' as const,
  parentIssue: 1521 as const,
  requiredNeutralVerticalReferenceCapabilityCount: 7 as const,
  handoffReadyNeutralReferenceCapabilityCount: 6 as const,
  remainingNeutralReferenceCapabilityCount: 1 as const,
  traditionalBindingAdmittedCount: 0 as const,
  nasalApexReferenceContractReady: true as const,
  nasalBridgeRootReferenceContractReady: true as const,
  automatedRgbNasalApexExtractionReady: false as const,
  automatedRgbNasalBridgeRootExtractionReady: false as const,
  realIndependentReferenceInstanceMaterialized: false as const,
  productMaterializedCount: 18 as const,
  threeDivisionsSpanExecutionReady: false as const,
  hairlineHardGapPreserved: true as const,
  productionActivated: false as const,
  commerceActivated: false as const,
  nextAction:
    'materialize_visible_hairline_reference_through_new_image_model_lane_without_hidden_hairline_substitution' as const,
});

export function assertFR304CurrentGate(): void {
  const gate = FR304_CURRENT_GATE;
  if (
    gate.parentIssue !== 1521 ||
    gate.requiredNeutralVerticalReferenceCapabilityCount !== 7 ||
    gate.handoffReadyNeutralReferenceCapabilityCount !== 6 ||
    gate.remainingNeutralReferenceCapabilityCount !== 1 ||
    gate.traditionalBindingAdmittedCount !== 0 ||
    gate.nasalApexReferenceContractReady !== true ||
    gate.nasalBridgeRootReferenceContractReady !== true ||
    gate.automatedRgbNasalApexExtractionReady !== false ||
    gate.automatedRgbNasalBridgeRootExtractionReady !== false ||
    gate.realIndependentReferenceInstanceMaterialized !== false ||
    gate.productMaterializedCount !== 18 ||
    gate.threeDivisionsSpanExecutionReady !== false ||
    gate.hairlineHardGapPreserved !== true ||
    gate.productionActivated !== false ||
    gate.commerceActivated !== false
  ) {
    fail('current gate drift.');
  }
}

assertFR304CurrentGate();
