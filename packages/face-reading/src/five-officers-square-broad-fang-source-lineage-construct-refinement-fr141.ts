import {
  getSquareBroadNeutralShapeMetricDefinitionsFR134,
} from './five-officers-square-broad-neutral-shape-metric-runtime-fr134.js';
import {
  FR140_NEXT_FRONTIER,
  assertIssuedSquareBroadFangApprovedGovernanceFR140,
  materializeSquareBroadFangApprovedGovernanceFR140,
} from './five-officers-square-broad-fang-approved-governance-materialization-fr140.js';
import { FaceAuthorityValidationError } from './validation.js';

const CRITERION_REF = 'criterion.intake.square_broad' as const;
const SOURCE_CONCEPT = '方大' as const;
const ACTIVE_CONSTRUCT_SCOPE = 'fang_shape_candidate_features_only' as const;
const TARGET_SOURCE_REF = 'passage.shenxiang.five_officers.intake.nlc_1925' as const;
const AXIS_METRIC_REF = 'neutral.mouth.contour_set.closed_cycle_axis_alignment_mean@0.1.0' as const;
const TURN_METRIC_REF = 'neutral.mouth.contour_set.closed_cycle_mean_absolute_turning_angle@0.1.0' as const;
const FR80_REF = 'neutral.mouth.contour_set.bounding_box_aspect_ratio@0.1.0' as const;
const FR82_REF = 'neutral.mouth.contour_set.horizontal_span_to_full_mesh_horizontal_span_ratio@0.1.0' as const;

export const FR141_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr141-square-broad-fang-source-lineage-construct-refinement.md' as const;
export const FR141_NEXT_FRONTIER =
  'square_broad_fang_source_grounded_neutral_candidate_metric_design_and_runtime_without_traditional_binding' as const;

export interface SquareBroadFangSourceLineageConstructRefinementFR141V1 {
  readonly schemaVersion: 'fr141-square-broad-fang-source-lineage-construct-refinement-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'square_broad_fang_source_lineage_conflict_recorded_construct_hypotheses_refined_existing_metrics_reclassified_no_traditional_binding';
  readonly target: {
    readonly criterionRef: typeof CRITERION_REF;
    readonly sourceConcept: typeof SOURCE_CONCEPT;
    readonly activeConstructScope: typeof ACTIVE_CONSTRUCT_SCOPE;
    readonly authoritativeSourceRef: typeof TARGET_SOURCE_REF;
  };
  readonly predecessor: {
    readonly fr140NextFrontier: typeof FR140_NEXT_FRONTIER;
    readonly reviewedMethodologyPresent: true;
    readonly humanSemanticCollectionAuthorized: false;
    readonly concreteReviewerActorAssignmentSatisfied: false;
  };
  readonly evidenceBoundary: {
    readonly authoritativeTargetPassageUnchanged: true;
    readonly externalResearchSourcesAreAuthorityRegistryEntries: false;
    readonly externalResearchSourcesAutomaticallyAmendReviewedMethodology: false;
    readonly modernInternetIllustrationsAreGroundTruthLabels: false;
    readonly laterCommentaryMayOverridePrimaryTargetPassage: false;
  };
  readonly sourceLineageFindings: {
    readonly targetPassageContainsFangDaCompound: true;
    readonly shenxiangNamedMouthTaxonomySeparatesSiziKouAndFangKou: true;
    readonly gujinCompilationPreservesSeparateSiziKouAndFangKouEntries: true;
    readonly gongduLaterCommentaryEquatesFangKouWithAncientSiziKou: true;
    readonly gongduLaterCommentaryDescribesUpperAndLowerFourCornersWithFangLeng: true;
    readonly gongduLaterCommentaryListsKuoDaSeparatelyAfterFangKou: true;
    readonly taxonomyConflictPresent: true;
    readonly fangEqualsSiziKouEstablished: false;
    readonly fourCornerFangLengIsPrimaryTargetDefinition: false;
    readonly fangMeansLiteralSquareBoundingBoxEstablished: false;
  };
  readonly constructRefinement: {
    readonly fangAndDaRemainAnalyticallySeparatedForResearch: true;
    readonly primaryCandidateFamilies: readonly [
      'structural_regularity_and_alignment',
      'rectilinear_segment_persistence',
      'localized_corner_distinctness_supporting_later_commentary',
    ];
    readonly daBreadthResearchTrackSeparated: true;
    readonly upperLowerContourCorrespondenceCandidateRecommended: true;
    readonly localizedCornerGeometryCandidateRecommended: true;
    readonly rectilinearSegmentPersistenceCandidateRecommended: true;
    readonly directAspectRatioProxyForFangAuthorized: false;
    readonly directMouthWidthProxyForFangAuthorized: false;
  };
  readonly existingMetricReclassification: readonly [
    {
      readonly metricRef: typeof FR80_REF;
      readonly role: 'deprioritized_for_fang_possible_size_or_shape_context_only';
      readonly directTraditionalFangBindingAuthorized: false;
    },
    {
      readonly metricRef: typeof AXIS_METRIC_REF;
      readonly role: 'supporting_neutral_shape_candidate_not_direct_fang_proxy';
      readonly directTraditionalFangBindingAuthorized: false;
    },
    {
      readonly metricRef: typeof TURN_METRIC_REF;
      readonly role: 'supporting_neutral_local_direction_change_candidate_not_named_corner_metric';
      readonly directTraditionalFangBindingAuthorized: false;
    },
    {
      readonly metricRef: typeof FR82_REF;
      readonly role: 'route_toward_da_breadth_research_not_direct_fang_proxy';
      readonly directTraditionalFangBindingAuthorized: false;
    },
  ];
  readonly implementationGap: {
    readonly upperLowerContourCorrespondenceMetricImplemented: false;
    readonly localizedCornerDistinctnessMetricImplemented: false;
    readonly rectilinearSegmentPersistenceMetricImplemented: false;
    readonly sourceGroundedCandidateMetricFamilyImplemented: false;
  };
  readonly humanReviewTrack: {
    readonly concreteReviewerUnavailableAtCurrentProjectState: true;
    readonly reviewerActorAssignmentDeferred: true;
    readonly reviewerDeferralMeansFangConstructAbandoned: false;
    readonly collectionAuthorizationPresent: false;
    readonly humanSemanticCollectionAuthorized: false;
    readonly empiricalSemanticEvidenceAcquisitionAuthorized: false;
  };
  readonly execution: {
    readonly sourceLineageConflictRecordsIssued: 1;
    readonly constructHypothesisRefinementsIssued: 1;
    readonly newNeutralMetricDefinitionsIssued: 0;
    readonly traditionalMetricBindingsIssued: 0;
    readonly calibrationProtocolsIssued: 0;
    readonly thresholdsIssued: 0;
    readonly criterionStatesIssued: 0;
    readonly structuredClaimsIssued: 0;
    readonly boundedNarrativesIssued: 0;
    readonly traditionalSemanticAuthority: false;
  };
  readonly researchNoteRef: typeof FR141_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR141_NEXT_FRONTIER;
}

const ISSUED = new WeakSet<object>();
let CACHED: SquareBroadFangSourceLineageConstructRefinementFR141V1 | null = null;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-141 ${message}`);
}

function validatePredecessors(): void {
  const fr140 = materializeSquareBroadFangApprovedGovernanceFR140();
  assertIssuedSquareBroadFangApprovedGovernanceFR140(fr140);
  if (
    fr140.nextFrontier !== FR140_NEXT_FRONTIER ||
    fr140.methodologyDecision.reviewedSuccessorPersisted !== true ||
    fr140.annotationGovernance.concreteReviewerActorAssignmentSatisfied !== false ||
    fr140.collectionGate.humanSemanticCollectionAuthorized !== false ||
    fr140.execution.traditionalMetricBindingsIssued !== 0 ||
    fr140.execution.thresholdsIssued !== 0 ||
    fr140.execution.criterionStatesIssued !== 0
  ) fail('FR-140 predecessor or authority boundary drift.');

  const metricDefinitions = getSquareBroadNeutralShapeMetricDefinitionsFR134();
  const refs = metricDefinitions.map((definition) => definition.metricRef);
  if (
    refs.length !== 2 ||
    refs[0] !== AXIS_METRIC_REF ||
    refs[1] !== TURN_METRIC_REF ||
    metricDefinitions.some((definition) => definition.traditionalCriterionBindingRef !== null || definition.calibrationRef !== null)
  ) fail('FR-134 neutral metric predecessor drift.');
}

export function assessSquareBroadFangSourceLineageConstructRefinementFR141(): SquareBroadFangSourceLineageConstructRefinementFR141V1 {
  if (CACHED !== null) return CACHED;
  validatePredecessors();

  const result: SquareBroadFangSourceLineageConstructRefinementFR141V1 = Object.freeze({
    schemaVersion: 'fr141-square-broad-fang-source-lineage-construct-refinement-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'square_broad_fang_source_lineage_conflict_recorded_construct_hypotheses_refined_existing_metrics_reclassified_no_traditional_binding' as const,
    target: Object.freeze({
      criterionRef: CRITERION_REF,
      sourceConcept: SOURCE_CONCEPT,
      activeConstructScope: ACTIVE_CONSTRUCT_SCOPE,
      authoritativeSourceRef: TARGET_SOURCE_REF,
    }),
    predecessor: Object.freeze({
      fr140NextFrontier: FR140_NEXT_FRONTIER,
      reviewedMethodologyPresent: true as const,
      humanSemanticCollectionAuthorized: false as const,
      concreteReviewerActorAssignmentSatisfied: false as const,
    }),
    evidenceBoundary: Object.freeze({
      authoritativeTargetPassageUnchanged: true as const,
      externalResearchSourcesAreAuthorityRegistryEntries: false as const,
      externalResearchSourcesAutomaticallyAmendReviewedMethodology: false as const,
      modernInternetIllustrationsAreGroundTruthLabels: false as const,
      laterCommentaryMayOverridePrimaryTargetPassage: false as const,
    }),
    sourceLineageFindings: Object.freeze({
      targetPassageContainsFangDaCompound: true as const,
      shenxiangNamedMouthTaxonomySeparatesSiziKouAndFangKou: true as const,
      gujinCompilationPreservesSeparateSiziKouAndFangKouEntries: true as const,
      gongduLaterCommentaryEquatesFangKouWithAncientSiziKou: true as const,
      gongduLaterCommentaryDescribesUpperAndLowerFourCornersWithFangLeng: true as const,
      gongduLaterCommentaryListsKuoDaSeparatelyAfterFangKou: true as const,
      taxonomyConflictPresent: true as const,
      fangEqualsSiziKouEstablished: false as const,
      fourCornerFangLengIsPrimaryTargetDefinition: false as const,
      fangMeansLiteralSquareBoundingBoxEstablished: false as const,
    }),
    constructRefinement: Object.freeze({
      fangAndDaRemainAnalyticallySeparatedForResearch: true as const,
      primaryCandidateFamilies: Object.freeze([
        'structural_regularity_and_alignment',
        'rectilinear_segment_persistence',
        'localized_corner_distinctness_supporting_later_commentary',
      ] as const),
      daBreadthResearchTrackSeparated: true as const,
      upperLowerContourCorrespondenceCandidateRecommended: true as const,
      localizedCornerGeometryCandidateRecommended: true as const,
      rectilinearSegmentPersistenceCandidateRecommended: true as const,
      directAspectRatioProxyForFangAuthorized: false as const,
      directMouthWidthProxyForFangAuthorized: false as const,
    }),
    existingMetricReclassification: Object.freeze([
      Object.freeze({
        metricRef: FR80_REF,
        role: 'deprioritized_for_fang_possible_size_or_shape_context_only' as const,
        directTraditionalFangBindingAuthorized: false as const,
      }),
      Object.freeze({
        metricRef: AXIS_METRIC_REF,
        role: 'supporting_neutral_shape_candidate_not_direct_fang_proxy' as const,
        directTraditionalFangBindingAuthorized: false as const,
      }),
      Object.freeze({
        metricRef: TURN_METRIC_REF,
        role: 'supporting_neutral_local_direction_change_candidate_not_named_corner_metric' as const,
        directTraditionalFangBindingAuthorized: false as const,
      }),
      Object.freeze({
        metricRef: FR82_REF,
        role: 'route_toward_da_breadth_research_not_direct_fang_proxy' as const,
        directTraditionalFangBindingAuthorized: false as const,
      }),
    ] as const),
    implementationGap: Object.freeze({
      upperLowerContourCorrespondenceMetricImplemented: false as const,
      localizedCornerDistinctnessMetricImplemented: false as const,
      rectilinearSegmentPersistenceMetricImplemented: false as const,
      sourceGroundedCandidateMetricFamilyImplemented: false as const,
    }),
    humanReviewTrack: Object.freeze({
      concreteReviewerUnavailableAtCurrentProjectState: true as const,
      reviewerActorAssignmentDeferred: true as const,
      reviewerDeferralMeansFangConstructAbandoned: false as const,
      collectionAuthorizationPresent: false as const,
      humanSemanticCollectionAuthorized: false as const,
      empiricalSemanticEvidenceAcquisitionAuthorized: false as const,
    }),
    execution: Object.freeze({
      sourceLineageConflictRecordsIssued: 1 as const,
      constructHypothesisRefinementsIssued: 1 as const,
      newNeutralMetricDefinitionsIssued: 0 as const,
      traditionalMetricBindingsIssued: 0 as const,
      calibrationProtocolsIssued: 0 as const,
      thresholdsIssued: 0 as const,
      criterionStatesIssued: 0 as const,
      structuredClaimsIssued: 0 as const,
      boundedNarrativesIssued: 0 as const,
      traditionalSemanticAuthority: false as const,
    }),
    researchNoteRef: FR141_RESEARCH_NOTE_REF,
    nextFrontier: FR141_NEXT_FRONTIER,
  });

  ISSUED.add(result);
  CACHED = result;
  return result;
}

export function assertIssuedSquareBroadFangSourceLineageConstructRefinementFR141(
  value: SquareBroadFangSourceLineageConstructRefinementFR141V1,
): void {
  if (!ISSUED.has(value)) fail('artifact was not issued by FR-141 runtime.');
}
