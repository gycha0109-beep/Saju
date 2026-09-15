import { FR175_CURRENT_NEUTRAL_METRIC_REFS } from './eye-pair-traditional-source-lineage-direct-passage-binding-fr175.js';
import {
  FR176_CLAUSE_REVIEWS,
  FR176_NEXT_FRONTIER,
  issueDarumaEyeMorphologySourceReviewFR176,
} from './daruma-eye-morphology-source-review-fr176.js';

export const FR177_EYE_PAIR_GEOMETRY_FEASIBILITY_RECORD_ID =
  'research.face_reading.eye_pair.geometric_y_span_aspect_ratio_feasibility.fr177' as const;
export const FR177_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr177-eye-pair-geometric-y-span-aspect-ratio-feasibility.md' as const;
export const FR177_VERDICT = 'NEUTRAL_GEOMETRY_METHODOLOGY_FEASIBLE_RUNTIME_NOT_ISSUED' as const;
export const FR177_NEXT_FRONTIER =
  'implement_release_pinned_eye_pair_geometric_y_span_and_y_to_x_span_ratio_runtime_with_exact_fr177_fail_closed_denominator_rules' as const;

export const FR177_CANDIDATE_METRIC_REFS = Object.freeze([
  'candidate:neutral.eye_pair.metric_3d.mean_cycle_y_span_to_full_mesh_x_span_ratio@fr177-feasibility',
  'candidate:neutral.eye_pair.metric_3d.mean_cycle_y_to_x_span_ratio@fr177-feasibility',
] as const);

export const FR177_CANDIDATE_DEFINITIONS = Object.freeze({
  cycleYSpan: 'max(y_i)-min(y_i) over the exact release-pinned 16-point closed Eye cycle',
  cycleXSpan: 'max(x_i)-min(x_i) over the exact release-pinned 16-point closed Eye cycle',
  meanCycleYSpanToFullMeshXSpanRatio:
    'mean(cycle_y_span_A, cycle_y_span_B) / full_mesh_x_span; require every operand finite and full_mesh_x_span > 0',
  meanCycleYToXSpanRatio:
    'mean(cycle_y_span_A / cycle_x_span_A, cycle_y_span_B / cycle_x_span_B); require every operand finite and each cycle_x_span > 0',
} as const);

export interface EyePairGeometricYSpanAspectRatioFeasibilityFR177V1 {
  readonly schemaVersion: 'fr177-eye-pair-geometric-y-span-aspect-ratio-feasibility-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR177_EYE_PAIR_GEOMETRY_FEASIBILITY_RECORD_ID;
  readonly authorityState: 'neutral_geometry_methodology_feasible_runtime_not_issued';
  readonly inheritedAuthority: {
    readonly providerPackage: '@mediapipe/tasks-vision';
    readonly providerVersion: '0.10.35';
    readonly providerLandmarkCount: 478;
    readonly governedMetricGeometryLandmarkCount: 468;
    readonly coordinateFrame: 'canonical_aligned_right_handed_metric_3d';
    readonly eyeCycleCount: 2;
    readonly eyeCyclePointCount: 16;
    readonly eyeCyclesClosed: true;
    readonly roleInvariantAggregationOverTwoEyeCycles: true;
    readonly anatomicalLateralityResolved: false;
    readonly currentMetricRefs: typeof FR175_CURRENT_NEUTRAL_METRIC_REFS;
  };
  readonly sourceNeed: {
    readonly fr175Clause: '或細長極寸';
    readonly fr176Clause: '細而長';
    readonly repeatedNeutralDimensionNeedConfirmed: true;
    readonly sourceSemanticsUsedToDefineGeometry: false;
    readonly traditionalUnitMappingUsed: false;
  };
  readonly geometryReview: {
    readonly candidateMetricRefs: typeof FR177_CANDIDATE_METRIC_REFS;
    readonly definitions: typeof FR177_CANDIDATE_DEFINITIONS;
    readonly yAxisBoundingSpanRequiresUpperLowerLidRoleAssignment: false;
    readonly yAxisBoundingSpanRequiresAnatomicalLaterality: false;
    readonly yAxisBoundingSpanIsPhysiologicalAperture: false;
    readonly yAxisBoundingSpanIsEyeHeightSemanticLabel: false;
    readonly yToXSpanRatioIsTraditionalThinnessSemantic: false;
    readonly denominatorRuleInventsEpsilon: false;
    readonly nonFiniteOperandFailsClosed: true;
    readonly nonPositiveFullMeshXSpanFailsClosed: true;
    readonly nonPositivePerCycleXSpanFailsClosed: true;
  };
  readonly decisionBoundary: {
    readonly methodologyCandidateAuthorized: true;
    readonly candidateMetricRegistrationAuthorized: false;
    readonly runtimeMetricIssued: false;
    readonly newObservationPrimitiveIssued: false;
    readonly anatomicalRoleAssignmentIssued: false;
    readonly individualEyeAsymmetryOutputAuthorized: false;
    readonly thresholdIssued: false;
    readonly scoreIssued: false;
    readonly rankIssued: false;
    readonly calibrationIssued: false;
    readonly categoricalClassifierIssued: false;
    readonly traditionalUnitMappingIssued: false;
    readonly traditionalSemanticBindingAuthorized: false;
    readonly structuredSemanticClaimAuthorized: false;
    readonly productionRuleAuthorized: false;
  };
  readonly persistenceBoundary: {
    readonly rawParticipantImagePersistenceChanged: false;
    readonly rawProviderResponsePersistenceChanged: false;
    readonly rawLandmarkPersistenceChanged: false;
    readonly fullFaceMetricGeometryPersistenceChanged: false;
    readonly faceEmbeddingPersistenceChanged: false;
    readonly identityTemplatePersistenceChanged: false;
  };
  readonly provenanceBoundary: {
    readonly c2paRequiredForNeutralGeometryFeasibility: false;
    readonly samePersonInferencePerformed: false;
    readonly biometricIdentityMatchingPerformed: false;
  };
  readonly verdict: typeof FR177_VERDICT;
  readonly researchNoteRef: typeof FR177_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR177_NEXT_FRONTIER;
}

const ISSUED = new WeakSet<object>();

export function issueEyePairGeometricYSpanAspectRatioFeasibilityFR177(): EyePairGeometricYSpanAspectRatioFeasibilityFR177V1 {
  const fr176 = issueDarumaEyeMorphologySourceReviewFR176();
  const fr176ThinLong = FR176_CLAUSE_REVIEWS.find((item) => item.original === '細而長');

  if (
    FR176_NEXT_FRONTIER
      !== 'review_governed_role_invariant_eye_aperture_or_aspect_ratio_neutral_metric_feasibility_from_repeated_direct_source_need_without_semantic_thresholds'
    || fr176.observationAuthority.coordinateFrame !== 'canonical_aligned_right_handed_metric_3d'
    || fr176.observationAuthority.roleInvariantAggregationOverTwoEyeCycles !== true
    || fr176.observationAuthority.eyeApertureMetricAuthorized !== false
    || fr176.observationAuthority.eyeAspectRatioMetricAuthorized !== false
    || fr176ThinLong?.blocker
      !== 'mean_x_span_does_not_supply_thinness_or_aspect_ratio_and_selective_long_only_decomposition_is_forbidden'
  ) {
    throw new Error('FR-177 inherited Eye-Pair feasibility boundary drifted.');
  }

  const result: EyePairGeometricYSpanAspectRatioFeasibilityFR177V1 = Object.freeze({
    schemaVersion: 'fr177-eye-pair-geometric-y-span-aspect-ratio-feasibility-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR177_EYE_PAIR_GEOMETRY_FEASIBILITY_RECORD_ID,
    authorityState: 'neutral_geometry_methodology_feasible_runtime_not_issued' as const,
    inheritedAuthority: Object.freeze({
      providerPackage: '@mediapipe/tasks-vision' as const,
      providerVersion: '0.10.35' as const,
      providerLandmarkCount: 478 as const,
      governedMetricGeometryLandmarkCount: 468 as const,
      coordinateFrame: 'canonical_aligned_right_handed_metric_3d' as const,
      eyeCycleCount: 2 as const,
      eyeCyclePointCount: 16 as const,
      eyeCyclesClosed: true as const,
      roleInvariantAggregationOverTwoEyeCycles: true as const,
      anatomicalLateralityResolved: false as const,
      currentMetricRefs: FR175_CURRENT_NEUTRAL_METRIC_REFS,
    }),
    sourceNeed: Object.freeze({
      fr175Clause: '或細長極寸' as const,
      fr176Clause: '細而長' as const,
      repeatedNeutralDimensionNeedConfirmed: true as const,
      sourceSemanticsUsedToDefineGeometry: false as const,
      traditionalUnitMappingUsed: false as const,
    }),
    geometryReview: Object.freeze({
      candidateMetricRefs: FR177_CANDIDATE_METRIC_REFS,
      definitions: FR177_CANDIDATE_DEFINITIONS,
      yAxisBoundingSpanRequiresUpperLowerLidRoleAssignment: false as const,
      yAxisBoundingSpanRequiresAnatomicalLaterality: false as const,
      yAxisBoundingSpanIsPhysiologicalAperture: false as const,
      yAxisBoundingSpanIsEyeHeightSemanticLabel: false as const,
      yToXSpanRatioIsTraditionalThinnessSemantic: false as const,
      denominatorRuleInventsEpsilon: false as const,
      nonFiniteOperandFailsClosed: true as const,
      nonPositiveFullMeshXSpanFailsClosed: true as const,
      nonPositivePerCycleXSpanFailsClosed: true as const,
    }),
    decisionBoundary: Object.freeze({
      methodologyCandidateAuthorized: true as const,
      candidateMetricRegistrationAuthorized: false as const,
      runtimeMetricIssued: false as const,
      newObservationPrimitiveIssued: false as const,
      anatomicalRoleAssignmentIssued: false as const,
      individualEyeAsymmetryOutputAuthorized: false as const,
      thresholdIssued: false as const,
      scoreIssued: false as const,
      rankIssued: false as const,
      calibrationIssued: false as const,
      categoricalClassifierIssued: false as const,
      traditionalUnitMappingIssued: false as const,
      traditionalSemanticBindingAuthorized: false as const,
      structuredSemanticClaimAuthorized: false as const,
      productionRuleAuthorized: false as const,
    }),
    persistenceBoundary: Object.freeze({
      rawParticipantImagePersistenceChanged: false as const,
      rawProviderResponsePersistenceChanged: false as const,
      rawLandmarkPersistenceChanged: false as const,
      fullFaceMetricGeometryPersistenceChanged: false as const,
      faceEmbeddingPersistenceChanged: false as const,
      identityTemplatePersistenceChanged: false as const,
    }),
    provenanceBoundary: Object.freeze({
      c2paRequiredForNeutralGeometryFeasibility: false as const,
      samePersonInferencePerformed: false as const,
      biometricIdentityMatchingPerformed: false as const,
    }),
    verdict: FR177_VERDICT,
    researchNoteRef: FR177_RESEARCH_NOTE_REF,
    nextFrontier: FR177_NEXT_FRONTIER,
  });

  ISSUED.add(result);
  return result;
}

export function assertIssuedEyePairGeometricYSpanAspectRatioFeasibilityFR177(
  result: EyePairGeometricYSpanAspectRatioFeasibilityFR177V1,
): void {
  if (!ISSUED.has(result)) {
    throw new Error('FR-177 Eye-Pair geometric Y-span/aspect-ratio feasibility was not issued by the active FR-177 boundary.');
  }
  if (
    result.schemaVersion !== 'fr177-eye-pair-geometric-y-span-aspect-ratio-feasibility-v1'
    || result.artifactVersion !== '0.1.0'
    || result.verdict !== FR177_VERDICT
    || result.decisionBoundary.methodologyCandidateAuthorized !== true
    || result.decisionBoundary.runtimeMetricIssued !== false
    || result.decisionBoundary.traditionalSemanticBindingAuthorized !== false
  ) {
    throw new Error('FR-177 Eye-Pair geometric Y-span/aspect-ratio feasibility boundary drifted.');
  }
}
