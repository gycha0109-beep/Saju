import {
  assertIssuedEyePairTraditionalSourceLineageDirectPassageBindingFR175,
  FR175_CURRENT_NEUTRAL_METRIC_REFS,
  FR175_DIRECT_PASSAGE,
  FR175_VERDICT,
  issueEyePairTraditionalSourceLineageDirectPassageBindingFR175,
} from './eye-pair-traditional-source-lineage-direct-passage-binding-fr175.js';
import {
  assertIssuedDarumaEyeMorphologySourceReviewFR176,
  FR176_DIRECT_SELECTED_WITNESS_CLAUSES,
  FR176_VERDICT,
  issueDarumaEyeMorphologySourceReviewFR176,
} from './daruma-eye-morphology-source-review-fr176.js';
import { getEyePairGeometricYSpanMetricDefinitionsFR178 } from './eye-pair-geometric-y-span-runtime-fr178.js';
import {
  assertIssuedEyePairXiChangOperationalizationRequirementsRereviewFR183,
  FR183_NEXT_FRONTIER,
  FR183_REMAINING_BLOCKERS,
  FR183_VERDICT,
  issueEyePairXiChangOperationalizationRequirementsRereviewFR183,
} from './eye-pair-xi-chang-operationalization-requirements-rereview-fr183.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR184_RECORD_ID =
  'research.face_reading.eye_pair.xi_chang_metric_to_concept_mapping_feasibility.fr184' as const;
export const FR184_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr184-eye-pair-xi-chang-metric-to-concept-mapping-feasibility.md' as const;
export const FR184_VERDICT =
  'SOURCE_AUTHORIZED_XI_CHANG_METRIC_TO_CONCEPT_MAPPING_NOT_FOUND_DIRECTIONALITY_AND_CALIBRATION_NOT_ADMITTED' as const;
export const FR184_NEXT_FRONTIER =
  'define_source_authorized_xi_chang_metric_to_concept_mapping_evidence_requirements_before_directionality_or_calibration' as const;

export const FR184_XI_METRIC_REF =
  'neutral.eye_pair.metric_3d.mean_cycle_y_to_x_span_ratio@0.1.0' as const;
export const FR184_CHANG_METRIC_REF =
  'neutral.eye_pair.metric_3d.mean_cycle_x_span_to_full_mesh_x_span_ratio@0.1.0' as const;

export const FR184_MAPPING_GAPS = Object.freeze({
  xi: Object.freeze([
    'direct_source_does_not_define_y_to_x_ratio_as_xi',
    'direct_source_does_not_define_metric_coordinate_axes_or_denominator',
    'direct_source_does_not_define_role_invariant_two_eye_aggregation',
    'neutral_metric_definition_explicitly_has_no_traditional_binding_ref',
  ] as const),
  chang: Object.freeze([
    'direct_source_does_not_define_full_mesh_normalized_x_span_ratio_as_chang',
    'traditional_cun_extent_has_no_governed_conversion_to_normalized_ratio',
    'direct_source_does_not_define_role_invariant_two_eye_aggregation',
    'candidate_metric_relevance_is_not_source_authorized_binding',
  ] as const),
} as const);

export interface FR184AuthorityBoundaryV1 {
  readonly mappingFeasibilityReviewCompleted: true;
  readonly xiMetricBindingAuthorized: false;
  readonly changMetricBindingAuthorized: false;
  readonly candidateMetricRelevanceMeansBindingAuthority: false;
  readonly metricDirectionalityAuthorized: false;
  readonly stableCriterionIdentityIssued: false;
  readonly thresholdIssued: false;
  readonly percentileIssued: false;
  readonly referencePopulationIssued: false;
  readonly calibrationEvidenceIssued: false;
  readonly calibrationProtocolIssued: false;
  readonly calibratedDecisionRuleIssued: false;
  readonly classifierIssued: false;
  readonly scoreIssued: false;
  readonly rankIssued: false;
  readonly traditionalCunMappingAuthorized: false;
  readonly compoundXiErChangRuleAuthorized: false;
  readonly morphologyProduced: false;
  readonly criterionStatesIssued: 0;
  readonly structuredClaimsIssued: 0;
  readonly boundedNarrativesIssued: 0;
  readonly productionRuleAuthorized: false;
  readonly traditionalSemanticAuthorityPromoted: false;
}

export interface EyePairXiChangMetricToConceptMappingFeasibilityFR184V1 {
  readonly schemaVersion: 'fr184-eye-pair-xi-chang-metric-to-concept-mapping-feasibility-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR184_RECORD_ID;
  readonly authorityState: 'source_authorized_metric_to_concept_mapping_reviewed_not_admitted';
  readonly upstreamAuthority: {
    readonly fr175Verdict: typeof FR175_VERDICT;
    readonly fr176Verdict: typeof FR176_VERDICT;
    readonly fr183Verdict: typeof FR183_VERDICT;
    readonly fr183NextFrontier: typeof FR183_NEXT_FRONTIER;
    readonly exactSourcePagesPinned: true;
    readonly provenanceClosureMeansSemanticMapping: false;
  };
  readonly sourceReview: {
    readonly fr175DirectPassage: typeof FR175_DIRECT_PASSAGE;
    readonly fr175RelevantClause: '或細長極寸';
    readonly fr176RelevantClauses: readonly ['細而長', '目長一寸'];
    readonly sourceUsesImplementationMetricIdentifiers: false;
    readonly sourceDefinesCoordinateFrame: false;
    readonly sourceDefinesRoleInvariantTwoEyeAggregation: false;
    readonly sourceDefinesNormalizedFullMeshDenominator: false;
    readonly translationUsedAsAuthority: false;
    readonly secondarySourceUsedAsAuthority: false;
  };
  readonly xiMappingReview: {
    readonly traditionalConcept: '細';
    readonly sourceClause: '細而長';
    readonly candidateMetricRef: typeof FR184_XI_METRIC_REF;
    readonly neutralMetricAvailable: true;
    readonly candidateGeometricRelevanceForFutureReview: true;
    readonly neutralMetricTraditionalBindingRef: null;
    readonly neutralMetricAllowsPhysiologicalApertureInterpretation: false;
    readonly neutralMetricAllowsEyeHeightSemanticInterpretation: false;
    readonly sourceExplicitlyDefinesCandidateFormula: false;
    readonly sourceExplicitlyDefinesCandidateDenominator: false;
    readonly sourceExplicitlyDefinesCandidateAggregation: false;
    readonly sourceAuthorizedMetricRelationFound: false;
    readonly mappingGaps: typeof FR184_MAPPING_GAPS.xi;
    readonly mappingDecision: 'not_admitted';
  };
  readonly changMappingReview: {
    readonly traditionalConcept: '長';
    readonly sourceClauses: readonly ['細而長', '目長一寸', '或細長極寸'];
    readonly candidateMetricRef: typeof FR184_CHANG_METRIC_REF;
    readonly neutralMetricAvailable: true;
    readonly candidateGeometricRelevanceForFutureReview: true;
    readonly sourceExplicitlyDefinesFullMeshNormalizedRatio: false;
    readonly sourceExplicitlyDefinesCandidateAggregation: false;
    readonly traditionalCunAppearsInDirectSource: true;
    readonly governedCunToNormalizedRatioConversionExists: false;
    readonly normalizedRatioMeansTraditionalAbsoluteLength: false;
    readonly sourceAuthorizedMetricRelationFound: false;
    readonly mappingGaps: typeof FR184_MAPPING_GAPS.chang;
    readonly mappingDecision: 'not_admitted';
  };
  readonly compoundReview: {
    readonly sourceClause: '細而長';
    readonly xiMappingAdmitted: false;
    readonly changMappingAdmitted: false;
    readonly sourceAuthorizedCompositionRuleIssued: false;
    readonly simpleBooleanAndAuthorized: false;
    readonly compoundDecision: 'not_admitted';
  };
  readonly resolvedByFR184: readonly [];
  readonly remainingBlockers: typeof FR183_REMAINING_BLOCKERS;
  readonly authorityBoundary: FR184AuthorityBoundaryV1;
  readonly privacyBoundary: {
    readonly participantDerivedMaterialAccepted: false;
    readonly participantImageAccepted: false;
    readonly rawProviderResponseAccepted: false;
    readonly rawLandmarkSetAccepted: false;
    readonly metricValuesPersisted: false;
    readonly faceEmbeddingAccepted: false;
    readonly identityTemplateAccepted: false;
    readonly biometricIdentityMatchingPerformed: false;
  };
  readonly verdict: typeof FR184_VERDICT;
  readonly researchNoteRef: typeof FR184_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR184_NEXT_FRONTIER;
}

const ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-184 ${message}`);
}

function validateUpstreamAuthority(): void {
  const fr183 = issueEyePairXiChangOperationalizationRequirementsRereviewFR183();
  assertIssuedEyePairXiChangOperationalizationRequirementsRereviewFR183(fr183);
  if (
    fr183.verdict !== FR183_VERDICT
    || fr183.nextFrontier !== FR183_NEXT_FRONTIER
    || fr183.sourcePrerequisiteReview.locatorPrerequisitesSatisfied !== true
    || fr183.xiReview.sourceAuthorizedMetricRelationCurrentlyIssued !== false
    || fr183.changReview.sourceAuthorizedMetricRelationCurrentlyIssued !== false
    || fr183.authorityBoundary.metricDirectionalityAuthorized !== false
    || fr183.authorityBoundary.productionRuleAuthorized !== false
    || fr183.authorityBoundary.traditionalSemanticAuthorityPromoted !== false
    || fr183.remainingBlockers !== FR183_REMAINING_BLOCKERS
  ) fail('FR-183 fail-closed mapping frontier drift.');

  const fr175 = issueEyePairTraditionalSourceLineageDirectPassageBindingFR175();
  assertIssuedEyePairTraditionalSourceLineageDirectPassageBindingFR175(fr175);
  if (
    fr175.source.directPassage !== FR175_DIRECT_PASSAGE
    || !FR175_DIRECT_PASSAGE.includes('或細長極寸')
    || fr175.source.translationUsedAsAuthority !== false
    || fr175.source.secondarySourceUsedAsAuthority !== false
    || fr175.decisionBoundary.traditionalSemanticAuthorityPromoted !== false
  ) fail('FR-175 direct-source authority drift.');

  const fr176 = issueDarumaEyeMorphologySourceReviewFR176();
  assertIssuedDarumaEyeMorphologySourceReviewFR176(fr176);
  if (
    fr176.source.directSelectedWitnessClauses !== FR176_DIRECT_SELECTED_WITNESS_CLAUSES
    || !FR176_DIRECT_SELECTED_WITNESS_CLAUSES.includes('細而長')
    || !FR176_DIRECT_SELECTED_WITNESS_CLAUSES.includes('目長一寸')
    || fr176.source.translationUsedAsAuthority !== false
    || fr176.source.secondarySourceUsedAsAuthority !== false
    || fr176.decisionBoundary.directBindingCandidateFound !== false
    || fr176.decisionBoundary.traditionalSemanticAuthorityPromoted !== false
  ) fail('FR-176 selected-witness authority drift.');

  const xiDefinition = getEyePairGeometricYSpanMetricDefinitionsFR178()
    .find((definition) => definition.metricRef === FR184_XI_METRIC_REF);
  if (
    xiDefinition === undefined
    || xiDefinition.traditionalCriterionBindingRef !== null
    || xiDefinition.physiologicalApertureInterpretationAllowed !== false
    || xiDefinition.eyeHeightSemanticInterpretationAllowed !== false
    || xiDefinition.componentAggregation !== 'role_invariant_over_two_closed_cycles'
    || xiDefinition.unit !== 'ratio'
  ) fail('FR-178 Xi candidate neutral metric boundary drift.');

  if (!FR175_CURRENT_NEUTRAL_METRIC_REFS.includes(FR184_CHANG_METRIC_REF)) {
    fail('Chang candidate neutral metric ref is no longer present in the governed Eye-Pair neutral surface.');
  }
}

export function assertFR184AuthorityBoundary(boundary: FR184AuthorityBoundaryV1): void {
  if (
    boundary.mappingFeasibilityReviewCompleted !== true
    || boundary.xiMetricBindingAuthorized !== false
    || boundary.changMetricBindingAuthorized !== false
    || boundary.candidateMetricRelevanceMeansBindingAuthority !== false
    || boundary.metricDirectionalityAuthorized !== false
    || boundary.stableCriterionIdentityIssued !== false
    || boundary.thresholdIssued !== false
    || boundary.percentileIssued !== false
    || boundary.referencePopulationIssued !== false
    || boundary.calibrationEvidenceIssued !== false
    || boundary.calibrationProtocolIssued !== false
    || boundary.calibratedDecisionRuleIssued !== false
    || boundary.classifierIssued !== false
    || boundary.scoreIssued !== false
    || boundary.rankIssued !== false
    || boundary.traditionalCunMappingAuthorized !== false
    || boundary.compoundXiErChangRuleAuthorized !== false
    || boundary.morphologyProduced !== false
    || boundary.criterionStatesIssued !== 0
    || boundary.structuredClaimsIssued !== 0
    || boundary.boundedNarrativesIssued !== 0
    || boundary.productionRuleAuthorized !== false
    || boundary.traditionalSemanticAuthorityPromoted !== false
  ) fail('authority widening detected.');
}

export function issueEyePairXiChangMetricToConceptMappingFeasibilityFR184(): EyePairXiChangMetricToConceptMappingFeasibilityFR184V1 {
  validateUpstreamAuthority();
  const result: EyePairXiChangMetricToConceptMappingFeasibilityFR184V1 = Object.freeze({
    schemaVersion: 'fr184-eye-pair-xi-chang-metric-to-concept-mapping-feasibility-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR184_RECORD_ID,
    authorityState: 'source_authorized_metric_to_concept_mapping_reviewed_not_admitted' as const,
    upstreamAuthority: Object.freeze({
      fr175Verdict: FR175_VERDICT,
      fr176Verdict: FR176_VERDICT,
      fr183Verdict: FR183_VERDICT,
      fr183NextFrontier: FR183_NEXT_FRONTIER,
      exactSourcePagesPinned: true as const,
      provenanceClosureMeansSemanticMapping: false as const,
    }),
    sourceReview: Object.freeze({
      fr175DirectPassage: FR175_DIRECT_PASSAGE,
      fr175RelevantClause: '或細長極寸' as const,
      fr176RelevantClauses: Object.freeze(['細而長', '目長一寸'] as const),
      sourceUsesImplementationMetricIdentifiers: false as const,
      sourceDefinesCoordinateFrame: false as const,
      sourceDefinesRoleInvariantTwoEyeAggregation: false as const,
      sourceDefinesNormalizedFullMeshDenominator: false as const,
      translationUsedAsAuthority: false as const,
      secondarySourceUsedAsAuthority: false as const,
    }),
    xiMappingReview: Object.freeze({
      traditionalConcept: '細' as const,
      sourceClause: '細而長' as const,
      candidateMetricRef: FR184_XI_METRIC_REF,
      neutralMetricAvailable: true as const,
      candidateGeometricRelevanceForFutureReview: true as const,
      neutralMetricTraditionalBindingRef: null,
      neutralMetricAllowsPhysiologicalApertureInterpretation: false as const,
      neutralMetricAllowsEyeHeightSemanticInterpretation: false as const,
      sourceExplicitlyDefinesCandidateFormula: false as const,
      sourceExplicitlyDefinesCandidateDenominator: false as const,
      sourceExplicitlyDefinesCandidateAggregation: false as const,
      sourceAuthorizedMetricRelationFound: false as const,
      mappingGaps: FR184_MAPPING_GAPS.xi,
      mappingDecision: 'not_admitted' as const,
    }),
    changMappingReview: Object.freeze({
      traditionalConcept: '長' as const,
      sourceClauses: Object.freeze(['細而長', '目長一寸', '或細長極寸'] as const),
      candidateMetricRef: FR184_CHANG_METRIC_REF,
      neutralMetricAvailable: true as const,
      candidateGeometricRelevanceForFutureReview: true as const,
      sourceExplicitlyDefinesFullMeshNormalizedRatio: false as const,
      sourceExplicitlyDefinesCandidateAggregation: false as const,
      traditionalCunAppearsInDirectSource: true as const,
      governedCunToNormalizedRatioConversionExists: false as const,
      normalizedRatioMeansTraditionalAbsoluteLength: false as const,
      sourceAuthorizedMetricRelationFound: false as const,
      mappingGaps: FR184_MAPPING_GAPS.chang,
      mappingDecision: 'not_admitted' as const,
    }),
    compoundReview: Object.freeze({
      sourceClause: '細而長' as const,
      xiMappingAdmitted: false as const,
      changMappingAdmitted: false as const,
      sourceAuthorizedCompositionRuleIssued: false as const,
      simpleBooleanAndAuthorized: false as const,
      compoundDecision: 'not_admitted' as const,
    }),
    resolvedByFR184: Object.freeze([] as const),
    remainingBlockers: FR183_REMAINING_BLOCKERS,
    authorityBoundary: Object.freeze({
      mappingFeasibilityReviewCompleted: true as const,
      xiMetricBindingAuthorized: false as const,
      changMetricBindingAuthorized: false as const,
      candidateMetricRelevanceMeansBindingAuthority: false as const,
      metricDirectionalityAuthorized: false as const,
      stableCriterionIdentityIssued: false as const,
      thresholdIssued: false as const,
      percentileIssued: false as const,
      referencePopulationIssued: false as const,
      calibrationEvidenceIssued: false as const,
      calibrationProtocolIssued: false as const,
      calibratedDecisionRuleIssued: false as const,
      classifierIssued: false as const,
      scoreIssued: false as const,
      rankIssued: false as const,
      traditionalCunMappingAuthorized: false as const,
      compoundXiErChangRuleAuthorized: false as const,
      morphologyProduced: false as const,
      criterionStatesIssued: 0 as const,
      structuredClaimsIssued: 0 as const,
      boundedNarrativesIssued: 0 as const,
      productionRuleAuthorized: false as const,
      traditionalSemanticAuthorityPromoted: false as const,
    }),
    privacyBoundary: Object.freeze({
      participantDerivedMaterialAccepted: false as const,
      participantImageAccepted: false as const,
      rawProviderResponseAccepted: false as const,
      rawLandmarkSetAccepted: false as const,
      metricValuesPersisted: false as const,
      faceEmbeddingAccepted: false as const,
      identityTemplateAccepted: false as const,
      biometricIdentityMatchingPerformed: false as const,
    }),
    verdict: FR184_VERDICT,
    researchNoteRef: FR184_RESEARCH_NOTE_REF,
    nextFrontier: FR184_NEXT_FRONTIER,
  });
  assertFR184AuthorityBoundary(result.authorityBoundary);
  ISSUED.add(result);
  return result;
}

export function assertIssuedEyePairXiChangMetricToConceptMappingFeasibilityFR184(
  result: EyePairXiChangMetricToConceptMappingFeasibilityFR184V1,
): void {
  if (!ISSUED.has(result)) fail('result was not issued by the active FR-184 boundary.');
  if (
    result.schemaVersion !== 'fr184-eye-pair-xi-chang-metric-to-concept-mapping-feasibility-v1'
    || result.artifactVersion !== '0.1.0'
    || result.recordId !== FR184_RECORD_ID
    || result.authorityState !== 'source_authorized_metric_to_concept_mapping_reviewed_not_admitted'
    || result.sourceReview.fr175DirectPassage !== FR175_DIRECT_PASSAGE
    || result.xiMappingReview.candidateMetricRef !== FR184_XI_METRIC_REF
    || result.xiMappingReview.sourceAuthorizedMetricRelationFound !== false
    || result.xiMappingReview.mappingGaps !== FR184_MAPPING_GAPS.xi
    || result.changMappingReview.candidateMetricRef !== FR184_CHANG_METRIC_REF
    || result.changMappingReview.governedCunToNormalizedRatioConversionExists !== false
    || result.changMappingReview.sourceAuthorizedMetricRelationFound !== false
    || result.changMappingReview.mappingGaps !== FR184_MAPPING_GAPS.chang
    || result.compoundReview.simpleBooleanAndAuthorized !== false
    || result.resolvedByFR184.length !== 0
    || result.remainingBlockers !== FR183_REMAINING_BLOCKERS
    || result.verdict !== FR184_VERDICT
    || result.researchNoteRef !== FR184_RESEARCH_NOTE_REF
    || result.nextFrontier !== FR184_NEXT_FRONTIER
  ) fail('issued FR-184 authority drift.');
  assertFR184AuthorityBoundary(result.authorityBoundary);
}
