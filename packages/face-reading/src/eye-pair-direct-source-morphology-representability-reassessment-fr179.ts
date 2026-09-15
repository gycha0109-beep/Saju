import {
  FR175_CURRENT_NEUTRAL_METRIC_REFS,
  FR175_DIRECT_PASSAGE,
  FR175_PASSAGE_CLAUSE_REVIEWS,
  FR175_VERDICT,
} from './eye-pair-traditional-source-lineage-direct-passage-binding-fr175.js';
import {
  FR176_CLAUSE_REVIEWS,
  FR176_DIRECT_SELECTED_WITNESS_CLAUSES,
  FR176_VERDICT,
} from './daruma-eye-morphology-source-review-fr176.js';
import {
  FR178_NEXT_FRONTIER,
  getEyePairGeometricYSpanMetricDefinitionsFR178,
} from './eye-pair-geometric-y-span-runtime-fr178.js';
import { FaceAuthorityValidationError } from './validation.js';

const X_SPAN_REF = 'neutral.eye_pair.metric_3d.mean_cycle_x_span_to_full_mesh_x_span_ratio@0.1.0' as const;
const TURNING_ANGLE_REF = 'neutral.eye_pair.metric_3d.mean_closed_cycle_absolute_turning_angle@0.1.0' as const;
const Y_SPAN_REF = 'neutral.eye_pair.metric_3d.mean_cycle_y_span_to_full_mesh_x_span_ratio@0.1.0' as const;
const Y_TO_X_REF = 'neutral.eye_pair.metric_3d.mean_cycle_y_to_x_span_ratio@0.1.0' as const;

export const FR179_RECORD_ID =
  'research.face_reading.eye_pair.direct_source_morphology_representability_reassessment.fr179' as const;
export const FR179_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr179-eye-pair-direct-source-morphology-representability-reassessment.md' as const;
export const FR179_VERDICT =
  'NEUTRAL_GEOMETRY_REPRESENTABILITY_EXPANDED_TRADITIONAL_BINDING_NOT_ADMITTED' as const;
export const FR179_NEXT_FRONTIER =
  'review_source_authorized_operationalization_requirements_for_eye_pair_xi_chang_without_inventing_thresholds_or_cun_mapping' as const;

export const FR179_CLAUSE_REVIEWS = Object.freeze([
  Object.freeze({
    sourcePhase: 'FR175' as const,
    original: '或細長極寸' as const,
    semanticClass: 'compound_static_morphology_with_traditional_extent_expression' as const,
    candidateNeutralMetricRefs: Object.freeze([X_SPAN_REF, Y_SPAN_REF, Y_TO_X_REF] as const),
    geometryAvailabilityAfterFR178: 'relevant_neutral_geometry_available' as const,
    geometryGapNarrowedByFR178: true as const,
    directlyRepresentableAfterFR178: false as const,
    traditionalBindingDecision: 'not_admitted' as const,
    resolvedObservationGaps: Object.freeze(['role_invariant_y_to_x_geometric_ratio_missing'] as const),
    remainingBlockers: Object.freeze([
      'geometric_ratio_to_traditional_xi_mapping_not_authorized',
      'relative_x_span_to_traditional_chang_mapping_not_authorized',
      'traditional_ji_extent_operationalization_absent',
      'traditional_cun_mapping_absent',
      'compound_clause_binding_not_authorized',
    ] as const),
  }),
  Object.freeze({
    sourcePhase: 'FR176' as const,
    original: '細而長' as const,
    semanticClass: 'compound_thin_plus_long_static_morphology' as const,
    candidateNeutralMetricRefs: Object.freeze([X_SPAN_REF, Y_TO_X_REF] as const),
    geometryAvailabilityAfterFR178: 'relevant_neutral_geometry_available' as const,
    geometryGapNarrowedByFR178: true as const,
    directlyRepresentableAfterFR178: false as const,
    traditionalBindingDecision: 'not_admitted' as const,
    resolvedObservationGaps: Object.freeze(['role_invariant_y_to_x_geometric_ratio_missing'] as const),
    remainingBlockers: Object.freeze([
      'geometric_ratio_to_traditional_xi_mapping_not_authorized',
      'relative_x_span_to_traditional_chang_mapping_not_authorized',
      'compound_xi_er_chang_operationalization_absent',
      'source_authorized_thresholds_absent',
    ] as const),
  }),
  Object.freeze({
    sourcePhase: 'FR176' as const,
    original: '秀而正' as const,
    semanticClass: 'compound_appearance_quality_plus_form' as const,
    candidateNeutralMetricRefs: Object.freeze([] as const),
    geometryAvailabilityAfterFR178: 'no_new_applicable_neutral_geometry_for_full_clause' as const,
    geometryGapNarrowedByFR178: false as const,
    directlyRepresentableAfterFR178: false as const,
    traditionalBindingDecision: 'not_admitted' as const,
    resolvedObservationGaps: Object.freeze([] as const),
    remainingBlockers: Object.freeze([
      'xiu_appearance_quality_not_operationalized',
      'zheng_form_criterion_not_source_authorized',
      'selective_semantic_decomposition_forbidden',
    ] as const),
  }),
  Object.freeze({
    sourcePhase: 'FR176' as const,
    original: '目大而光' as const,
    semanticClass: 'compound_size_plus_radiance' as const,
    candidateNeutralMetricRefs: Object.freeze([X_SPAN_REF] as const),
    geometryAvailabilityAfterFR178: 'partial_preexisting_geometry_only' as const,
    geometryGapNarrowedByFR178: false as const,
    directlyRepresentableAfterFR178: false as const,
    traditionalBindingDecision: 'not_admitted' as const,
    resolvedObservationGaps: Object.freeze([] as const),
    remainingBlockers: Object.freeze([
      'relative_geometry_to_traditional_da_mapping_not_authorized',
      'ocular_radiance_outside_static_geometry',
      'selective_semantic_decomposition_forbidden',
    ] as const),
  }),
  Object.freeze({
    sourcePhase: 'FR176' as const,
    original: '目有三角' as const,
    semanticClass: 'categorical_eye_shape_triangle' as const,
    candidateNeutralMetricRefs: Object.freeze([TURNING_ANGLE_REF] as const),
    geometryAvailabilityAfterFR178: 'preexisting_shape_summary_not_classifier' as const,
    geometryGapNarrowedByFR178: false as const,
    directlyRepresentableAfterFR178: false as const,
    traditionalBindingDecision: 'not_admitted' as const,
    resolvedObservationGaps: Object.freeze([] as const),
    remainingBlockers: Object.freeze([
      'turning_angle_to_triangle_classifier_not_authorized',
      'categorical_triangle_shape_threshold_absent',
    ] as const),
  }),
  Object.freeze({
    sourcePhase: 'FR176' as const,
    original: '目長一寸' as const,
    semanticClass: 'static_longitudinal_extent_with_traditional_unit' as const,
    candidateNeutralMetricRefs: Object.freeze([X_SPAN_REF] as const),
    geometryAvailabilityAfterFR178: 'preexisting_horizontal_extent_observation_only' as const,
    geometryGapNarrowedByFR178: false as const,
    directlyRepresentableAfterFR178: false as const,
    traditionalBindingDecision: 'not_admitted' as const,
    resolvedObservationGaps: Object.freeze([] as const),
    remainingBlockers: Object.freeze([
      'relative_x_span_to_traditional_chang_mapping_not_authorized',
      'traditional_cun_mapping_absent',
      'full_mesh_normalized_ratio_is_not_traditional_absolute_unit',
    ] as const),
  }),
  Object.freeze({
    sourcePhase: 'FR176' as const,
    original: '目尾相垂' as const,
    semanticClass: 'eye_tail_orientation_or_droop' as const,
    candidateNeutralMetricRefs: Object.freeze([] as const),
    geometryAvailabilityAfterFR178: 'no_eye_tail_orientation_primitive' as const,
    geometryGapNarrowedByFR178: false as const,
    directlyRepresentableAfterFR178: false as const,
    traditionalBindingDecision: 'not_admitted' as const,
    resolvedObservationGaps: Object.freeze([] as const),
    remainingBlockers: Object.freeze([
      'eye_tail_endpoint_role_not_authorized',
      'eye_tail_orientation_metric_not_defined',
      'anatomical_laterality_unresolved',
    ] as const),
  }),
] as const);

export interface EyePairDirectSourceMorphologyRepresentabilityReassessmentFR179V1 {
  readonly schemaVersion: 'fr179-eye-pair-direct-source-morphology-representability-reassessment-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR179_RECORD_ID;
  readonly authorityState: 'direct_source_representability_reassessment_completed_no_traditional_binding_admitted';
  readonly sourceAuthority: {
    readonly fr175DirectPassage: typeof FR175_DIRECT_PASSAGE;
    readonly fr175Verdict: typeof FR175_VERDICT;
    readonly fr176SelectedWitnessClauses: typeof FR176_DIRECT_SELECTED_WITNESS_CLAUSES;
    readonly fr176Verdict: typeof FR176_VERDICT;
    readonly sourceIdentityResolved: true;
    readonly fr176ExactScanPageVisuallyPinned: false;
    readonly translationUsedAsAuthority: false;
    readonly secondarySourceUsedAsAuthority: false;
  };
  readonly observationAuthority: {
    readonly inheritedMetricRefs: typeof FR175_CURRENT_NEUTRAL_METRIC_REFS;
    readonly fr178MetricRefs: readonly [typeof Y_SPAN_REF, typeof Y_TO_X_REF];
    readonly coordinateFrame: 'canonical_aligned_right_handed_metric_3d';
    readonly roleInvariantAggregationOverTwoEyeCycles: true;
    readonly geometricYSpanAvailable: true;
    readonly geometricYToXSpanRatioAvailable: true;
    readonly physiologicalApertureIssued: false;
    readonly eyeHeightSemanticLabelIssued: false;
    readonly anatomicalLateralityResolved: false;
    readonly individualEyeAsymmetryOutputAuthorized: false;
    readonly categoricalEyeShapeClassifierAuthorized: false;
    readonly traditionalUnitMappingAuthorized: false;
    readonly numericTraditionalThresholdAuthorized: false;
  };
  readonly clauseReviews: typeof FR179_CLAUSE_REVIEWS;
  readonly representabilitySummary: {
    readonly reviewedClauseCount: 7;
    readonly fr178NarrowedPriorGeometryGapClauseCount: 2;
    readonly directlyRepresentableClauseCount: 0;
    readonly traditionalMetricBindingsIssued: 0;
    readonly calibrationRefsIssued: 0;
    readonly thresholdRefsIssued: 0;
    readonly morphologyProduced: false;
    readonly criterionStatesIssued: 0;
    readonly structuredClaimsIssued: 0;
    readonly productionRulesIssued: 0;
    readonly bindingDecision: 'not_admitted';
  };
  readonly resolvedBlockers: readonly [
    'role_invariant_eye_y_to_x_geometric_ratio_missing_for_fr175_fr176_reassessment',
  ];
  readonly remainingBlockers: readonly string[];
  readonly authorityBoundary: {
    readonly neutralYToXRatioMeansTraditionalXi: false;
    readonly relativeXSpanMeansTraditionalChang: false;
    readonly neutralMetricPairMeansTraditionalXiErChang: false;
    readonly geometricYSpanMeansPhysiologicalAperture: false;
    readonly neutralGeometryMeansTraditionalJi: false;
    readonly normalizedMetricRatioMeansTraditionalCun: false;
    readonly turningAngleMeansTriangleClassifier: false;
    readonly partialClauseGeometryMeansCompoundClauseBinding: false;
    readonly selectiveSemanticDecompositionAuthorized: false;
    readonly reviewCompletionMeansOperationalizedTraditionalMethodology: false;
    readonly directSourceTextMeansMachineThreshold: false;
    readonly newObservationPrimitiveIssued: false;
    readonly thresholdIssued: false;
    readonly scoreIssued: false;
    readonly rankIssued: false;
    readonly calibrationIssued: false;
    readonly productionRuleAuthorized: false;
    readonly traditionalSemanticAuthorityPromoted: false;
  };
  readonly privacyBoundary: {
    readonly participantDerivedMaterialAccepted: false;
    readonly rawParticipantImageAccepted: false;
    readonly rawProviderResponseAccepted: false;
    readonly rawLandmarkSetAccepted: false;
    readonly fullFaceMetricGeometryPersisted: false;
    readonly metricValuePersisted: false;
    readonly faceEmbeddingAccepted: false;
    readonly identityTemplateAccepted: false;
    readonly biometricIdentityMatchingPerformed: false;
  };
  readonly verdict: typeof FR179_VERDICT;
  readonly researchNoteRef: typeof FR179_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR179_NEXT_FRONTIER;
}

const RESOLVED_BLOCKERS = Object.freeze([
  'role_invariant_eye_y_to_x_geometric_ratio_missing_for_fr175_fr176_reassessment',
] as const);

const REMAINING_BLOCKERS = Object.freeze([
  'geometric_ratio_to_traditional_xi_mapping_not_authorized',
  'relative_x_span_to_traditional_chang_mapping_not_authorized',
  'compound_xi_er_chang_operationalization_absent',
  'traditional_ji_extent_operationalization_absent',
  'traditional_cun_mapping_absent',
  'source_authorized_thresholds_absent',
  'fr176_exact_scan_page_not_visually_pinned',
  'xiu_and_zheng_operationalization_absent',
  'ocular_radiance_outside_static_geometry',
  'triangle_classifier_not_authorized',
  'eye_tail_orientation_primitive_not_defined',
  'anatomical_laterality_unresolved',
] as const);

const ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-179 ${message}`);
}

function validateUpstreamAuthority(): void {
  const fr175Clause = FR175_PASSAGE_CLAUSE_REVIEWS.find((item) => item.original === '或細長極寸');
  const fr176ThinLong = FR176_CLAUSE_REVIEWS.find((item) => item.original === '細而長');
  const fr176Cun = FR176_CLAUSE_REVIEWS.find((item) => item.original === '目長一寸');
  if (
    FR175_VERDICT !== 'SOURCE_SEMANTIC_NOT_COMPATIBLE_WITH_CURRENT_OBSERVATION'
    || FR175_DIRECT_PASSAGE !== '眼須要含藏不露。黑白分明。瞳子端定。光彩射人。或細長極寸。乃為監察官成。'
    || fr175Clause === undefined
    || fr175Clause.directlyRepresentableByCurrentNeutralMetrics !== false
    || fr175Clause.blocker !== 'no_governed_eye_aperture_or_aspect_ratio_and_no_source_authorized_cun_mapping'
  ) fail('FR-175 direct-source authority drift.');

  if (
    FR176_VERDICT !== 'SOURCE_SEMANTIC_NOT_COMPATIBLE_WITH_CURRENT_OBSERVATION'
    || FR176_DIRECT_SELECTED_WITNESS_CLAUSES.length !== 6
    || !FR176_DIRECT_SELECTED_WITNESS_CLAUSES.includes('細而長')
    || !FR176_DIRECT_SELECTED_WITNESS_CLAUSES.includes('目長一寸')
    || fr176ThinLong === undefined
    || fr176ThinLong.directlyRepresentableByCurrentNeutralMetrics !== false
    || fr176ThinLong.blocker !== 'mean_x_span_does_not_supply_thinness_or_aspect_ratio_and_selective_long_only_decomposition_is_forbidden'
    || fr176Cun === undefined
    || fr176Cun.blocker !== 'no_source_authorized_mapping_from_cun_to_full_mesh_normalized_x_span_ratio'
  ) fail('FR-176 selected-witness authority drift.');

  if (FR178_NEXT_FRONTIER !== 'reassess_direct_source_eye_pair_morphology_representability_with_new_neutral_y_span_metrics_without_threshold_or_traditional_unit_binding') {
    fail('FR-178 next-frontier authority drift.');
  }
  const definitions = getEyePairGeometricYSpanMetricDefinitionsFR178();
  if (
    definitions.length !== 2
    || definitions[0].metricRef !== Y_SPAN_REF
    || definitions[1].metricRef !== Y_TO_X_REF
    || definitions.some((definition) =>
      definition.coordinateFrame !== 'canonical_aligned_right_handed_metric_3d'
      || definition.unit !== 'ratio'
      || definition.componentAggregation !== 'role_invariant_over_two_closed_cycles'
      || definition.geometricYSpanOnly !== true
      || definition.physiologicalApertureInterpretationAllowed !== false
      || definition.eyeHeightSemanticInterpretationAllowed !== false
      || definition.anatomicalLateralityRequired !== false
      || definition.individualEyeValueExposed !== false
      || definition.calibrationRef !== null
      || definition.traditionalCriterionBindingRef !== null
    )
  ) fail('FR-178 neutral geometry definition authority drift.');
}

export function issueEyePairDirectSourceMorphologyRepresentabilityReassessmentFR179(): EyePairDirectSourceMorphologyRepresentabilityReassessmentFR179V1 {
  validateUpstreamAuthority();
  if (FR175_CURRENT_NEUTRAL_METRIC_REFS[0] !== X_SPAN_REF || !FR175_CURRENT_NEUTRAL_METRIC_REFS.includes(TURNING_ANGLE_REF)) {
    fail('inherited Eye-Pair neutral metric registry drift.');
  }

  const result: EyePairDirectSourceMorphologyRepresentabilityReassessmentFR179V1 = Object.freeze({
    schemaVersion: 'fr179-eye-pair-direct-source-morphology-representability-reassessment-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR179_RECORD_ID,
    authorityState: 'direct_source_representability_reassessment_completed_no_traditional_binding_admitted' as const,
    sourceAuthority: Object.freeze({
      fr175DirectPassage: FR175_DIRECT_PASSAGE,
      fr175Verdict: FR175_VERDICT,
      fr176SelectedWitnessClauses: FR176_DIRECT_SELECTED_WITNESS_CLAUSES,
      fr176Verdict: FR176_VERDICT,
      sourceIdentityResolved: true as const,
      fr176ExactScanPageVisuallyPinned: false as const,
      translationUsedAsAuthority: false as const,
      secondarySourceUsedAsAuthority: false as const,
    }),
    observationAuthority: Object.freeze({
      inheritedMetricRefs: FR175_CURRENT_NEUTRAL_METRIC_REFS,
      fr178MetricRefs: Object.freeze([Y_SPAN_REF, Y_TO_X_REF] as const),
      coordinateFrame: 'canonical_aligned_right_handed_metric_3d' as const,
      roleInvariantAggregationOverTwoEyeCycles: true as const,
      geometricYSpanAvailable: true as const,
      geometricYToXSpanRatioAvailable: true as const,
      physiologicalApertureIssued: false as const,
      eyeHeightSemanticLabelIssued: false as const,
      anatomicalLateralityResolved: false as const,
      individualEyeAsymmetryOutputAuthorized: false as const,
      categoricalEyeShapeClassifierAuthorized: false as const,
      traditionalUnitMappingAuthorized: false as const,
      numericTraditionalThresholdAuthorized: false as const,
    }),
    clauseReviews: FR179_CLAUSE_REVIEWS,
    representabilitySummary: Object.freeze({
      reviewedClauseCount: 7 as const,
      fr178NarrowedPriorGeometryGapClauseCount: 2 as const,
      directlyRepresentableClauseCount: 0 as const,
      traditionalMetricBindingsIssued: 0 as const,
      calibrationRefsIssued: 0 as const,
      thresholdRefsIssued: 0 as const,
      morphologyProduced: false as const,
      criterionStatesIssued: 0 as const,
      structuredClaimsIssued: 0 as const,
      productionRulesIssued: 0 as const,
      bindingDecision: 'not_admitted' as const,
    }),
    resolvedBlockers: RESOLVED_BLOCKERS,
    remainingBlockers: REMAINING_BLOCKERS,
    authorityBoundary: Object.freeze({
      neutralYToXRatioMeansTraditionalXi: false as const,
      relativeXSpanMeansTraditionalChang: false as const,
      neutralMetricPairMeansTraditionalXiErChang: false as const,
      geometricYSpanMeansPhysiologicalAperture: false as const,
      neutralGeometryMeansTraditionalJi: false as const,
      normalizedMetricRatioMeansTraditionalCun: false as const,
      turningAngleMeansTriangleClassifier: false as const,
      partialClauseGeometryMeansCompoundClauseBinding: false as const,
      selectiveSemanticDecompositionAuthorized: false as const,
      reviewCompletionMeansOperationalizedTraditionalMethodology: false as const,
      directSourceTextMeansMachineThreshold: false as const,
      newObservationPrimitiveIssued: false as const,
      thresholdIssued: false as const,
      scoreIssued: false as const,
      rankIssued: false as const,
      calibrationIssued: false as const,
      productionRuleAuthorized: false as const,
      traditionalSemanticAuthorityPromoted: false as const,
    }),
    privacyBoundary: Object.freeze({
      participantDerivedMaterialAccepted: false as const,
      rawParticipantImageAccepted: false as const,
      rawProviderResponseAccepted: false as const,
      rawLandmarkSetAccepted: false as const,
      fullFaceMetricGeometryPersisted: false as const,
      metricValuePersisted: false as const,
      faceEmbeddingAccepted: false as const,
      identityTemplateAccepted: false as const,
      biometricIdentityMatchingPerformed: false as const,
    }),
    verdict: FR179_VERDICT,
    researchNoteRef: FR179_RESEARCH_NOTE_REF,
    nextFrontier: FR179_NEXT_FRONTIER,
  });
  ISSUED.add(result);
  return result;
}

export function assertIssuedEyePairDirectSourceMorphologyRepresentabilityReassessmentFR179(
  result: EyePairDirectSourceMorphologyRepresentabilityReassessmentFR179V1,
): void {
  if (!ISSUED.has(result)) fail('representability reassessment was not issued by the active FR-179 boundary.');
  if (
    result.schemaVersion !== 'fr179-eye-pair-direct-source-morphology-representability-reassessment-v1'
    || result.artifactVersion !== '0.1.0'
    || result.recordId !== FR179_RECORD_ID
    || result.authorityState !== 'direct_source_representability_reassessment_completed_no_traditional_binding_admitted'
    || result.observationAuthority.fr178MetricRefs[0] !== Y_SPAN_REF
    || result.observationAuthority.fr178MetricRefs[1] !== Y_TO_X_REF
    || result.observationAuthority.physiologicalApertureIssued !== false
    || result.observationAuthority.anatomicalLateralityResolved !== false
    || result.representabilitySummary.directlyRepresentableClauseCount !== 0
    || result.representabilitySummary.traditionalMetricBindingsIssued !== 0
    || result.representabilitySummary.thresholdRefsIssued !== 0
    || result.representabilitySummary.bindingDecision !== 'not_admitted'
    || result.clauseReviews !== FR179_CLAUSE_REVIEWS
    || result.authorityBoundary.neutralYToXRatioMeansTraditionalXi !== false
    || result.authorityBoundary.relativeXSpanMeansTraditionalChang !== false
    || result.authorityBoundary.normalizedMetricRatioMeansTraditionalCun !== false
    || result.authorityBoundary.selectiveSemanticDecompositionAuthorized !== false
    || result.authorityBoundary.thresholdIssued !== false
    || result.authorityBoundary.productionRuleAuthorized !== false
    || result.authorityBoundary.traditionalSemanticAuthorityPromoted !== false
    || result.privacyBoundary.participantDerivedMaterialAccepted !== false
    || result.privacyBoundary.biometricIdentityMatchingPerformed !== false
    || result.verdict !== FR179_VERDICT
    || result.researchNoteRef !== FR179_RESEARCH_NOTE_REF
    || result.nextFrontier !== FR179_NEXT_FRONTIER
  ) fail('FR-179 representability reassessment authority drift.');
}