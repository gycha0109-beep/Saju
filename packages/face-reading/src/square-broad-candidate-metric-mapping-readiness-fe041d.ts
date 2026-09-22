import {
  FE035B_PRODUCT_NEUTRAL_OBSERVATION_CONTRACT,
  assertProductNeutralObservationContractFE035B,
} from './product-neutral-observation-contract-fe035b.js';
import {
  assessSquareBroadFangSourceLineageConstructRefinementFR141,
  assertIssuedSquareBroadFangSourceLineageConstructRefinementFR141,
} from './five-officers-square-broad-fang-source-lineage-construct-refinement-fr141.js';
import { getSquareBroadFangNeutralCandidateMetricDefinitionsFR142 } from './five-officers-square-broad-fang-neutral-candidate-metric-runtime-fr142.js';
import {
  assessSquareBroadFangNeutralCandidateMetricSyntheticVerificationFR143,
  assertIssuedSquareBroadFangNeutralCandidateMetricSyntheticVerificationFR143,
} from './five-officers-square-broad-fang-neutral-candidate-metric-synthetic-verification-fr143.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FE041D_SQUARE_BROAD_CANDIDATE_METRIC_MAPPING_READINESS_VERSION =
  'FE041D-SQUARE-BROAD-CANDIDATE-METRIC-MAPPING-READINESS-v1' as const;
export const FE041D_RESEARCH_SNAPSHOT = Object.freeze({
  repository: 'gycha0109-beep/Saju' as const,
  commit: '8b49d4e03e35ef5447f0f2873ff2b8737bd36110' as const,
  fe035bSourceBlob: 'c9ed7dfb347144759694056e89d571c433d4dfc8' as const,
  fr141SourceBlob: 'a2a621bb2088f9002480caf6a89bbc0a40e50538' as const,
  fr142SourceBlob: '004a2cdb21bc6f247e48cae52429afaf54f6804d' as const,
  fr143SourceBlob: '293e29e65239894a5ec21befbd7152c339250759' as const,
});
const EXPECTED_CANDIDATE_REFS = Object.freeze([
  'neutral.mouth.contour_set.horizontal_reflection_nearest_set_residual_ratio@0.1.0',
  'neutral.mouth.contour_set.orthogonal_edge_orientation_concentration@0.1.0',
  'neutral.mouth.contour_set.turning_angle_concentration_index@0.1.0',
] as const);
export interface SquareBroadCandidateMetricMappingReadinessFE041DV1 {
  readonly schemaVersion: 'fe041d-square-broad-candidate-metric-mapping-readiness-v1';
  readonly contractVersion: typeof FE041D_SQUARE_BROAD_CANDIDATE_METRIC_MAPPING_READINESS_VERSION;
  readonly authorityState: 'source_grounded_neutral_candidate_metrics_exist_but_none_are_canonical_product_metrics_or_traditional_bindings';
  readonly researchSnapshot: typeof FE041D_RESEARCH_SNAPSHOT;
  readonly target: Readonly<{
    criterionRef: 'criterion.intake.square_broad';
    sourceConcept: '方大';
    activeConstructScope: 'fang_shape_candidate_features_only';
    sourceLineageConflictPreserved: true;
  }>;
  readonly candidateMetricRefs: typeof EXPECTED_CANDIDATE_REFS;
  readonly canonicalRegistryMetricCount: 13;
  readonly canonicalRegistryIntersection: readonly [];
  readonly candidateEvidence: Readonly<{
    sourceGroundedCandidateFamilyImplemented: true;
    syntheticNumericBehaviorVerified: true;
    empiricalCaptureRepeatabilityEstablished: false;
    humanSemanticLabelsIssued: 0;
    constructValidityEstablished: false;
  }>;
  readonly mappingDecision: Readonly<{
    canonicalMetricBindingAuthorized: false;
    traditionalFangBindingAuthorized: false;
    candidateCanonicalizationAuthorized: false;
  }>;
  readonly authorityBoundary: Readonly<{
    candidateMetricDefinitionMeansTraditionalConstruct: false;
    syntheticDiscriminationMeansConstructValidity: false;
    empiricalSemanticEvidenceAdmitted: false;
    calibrationAuthorityIssued: false;
    numericThresholdAuthorityIssued: false;
    classificationBandsIssued: false;
    deterministicCriterionStateIssued: false;
    ruleAuthorityIssued: false;
    structuredClaimIssued: false;
    narrativeAuthorityIssued: false;
    productionSemanticExecutionAuthorized: false;
  }>;
  readonly nextFrontier: 'governed_candidate_metric_canonicalization_and_independent_semantic_mapping_evidence_before_calibration';
}
const ISSUED = new WeakSet<object>();
function fail(message: string): never {
  throw new FaceAuthorityValidationError('FE041D ' + message);
}
export function issueSquareBroadCandidateMetricMappingReadinessFE041D():
SquareBroadCandidateMetricMappingReadinessFE041DV1 {
  assertProductNeutralObservationContractFE035B(FE035B_PRODUCT_NEUTRAL_OBSERVATION_CONTRACT);
  if (FE035B_PRODUCT_NEUTRAL_OBSERVATION_CONTRACT.metrics.length !== 13) fail('FE035B registry drift.');

  const fr141 = assessSquareBroadFangSourceLineageConstructRefinementFR141();
  assertIssuedSquareBroadFangSourceLineageConstructRefinementFR141(fr141);
  if (
    fr141.target.criterionRef !== 'criterion.intake.square_broad' ||
    fr141.target.sourceConcept !== '方大' ||
    fr141.sourceLineageFindings.taxonomyConflictPresent !== true ||
    fr141.execution.traditionalMetricBindingsIssued !== 0 ||
    fr141.execution.calibrationProtocolsIssued !== 0 ||
    fr141.execution.thresholdsIssued !== 0 ||
    fr141.execution.criterionStatesIssued !== 0
  ) fail('FR141 authority boundary drift.');

  const definitions = getSquareBroadFangNeutralCandidateMetricDefinitionsFR142();
  const refs = definitions.map((definition) => definition.metricRef);
  if (
    JSON.stringify(refs) !== JSON.stringify(EXPECTED_CANDIDATE_REFS) ||
    definitions.some((definition) =>
      definition.traditionalCriterionBindingRef !== null ||
      definition.calibrationRef !== null ||
      definition.numericClassificationThreshold !== null)
  ) fail('FR142 candidate metric boundary drift.');

  const fr143 = assessSquareBroadFangNeutralCandidateMetricSyntheticVerificationFR143();
  assertIssuedSquareBroadFangNeutralCandidateMetricSyntheticVerificationFR143(fr143);
  if (
    fr143.syntheticRelations.deterministicRepeatabilityObserved !== true ||
    fr143.evidenceBoundary.syntheticDiscriminationMeansConstructValidity !== false ||
    fr143.evidenceBoundary.syntheticRepeatabilityMeansEmpiricalCaptureRepeatability !== false ||
    fr143.evidenceBoundary.metricSeparationMeansTraditionalCriterionBinding !== false ||
    fr143.execution.empiricalCaptureRecordsIssued !== 0 ||
    fr143.execution.humanSemanticLabelsIssued !== 0 ||
    fr143.execution.traditionalMetricBindingsIssued !== 0 ||
    fr143.execution.calibrationProtocolsIssued !== 0 ||
    fr143.execution.numericClassificationThresholdsIssued !== 0
  ) fail('FR143 synthetic evidence boundary drift.');

  const canonicalRefs = new Set(
    FE035B_PRODUCT_NEUTRAL_OBSERVATION_CONTRACT.metrics.map((metric) => metric.metricRef),
  );
  const intersection = refs.filter((metricRef) => canonicalRefs.has(metricRef));
  if (intersection.length !== 0) fail('candidate metric unexpectedly overlaps FE035B.');

  const result: SquareBroadCandidateMetricMappingReadinessFE041DV1 = Object.freeze({
    schemaVersion: 'fe041d-square-broad-candidate-metric-mapping-readiness-v1' as const,
    contractVersion: FE041D_SQUARE_BROAD_CANDIDATE_METRIC_MAPPING_READINESS_VERSION,
    authorityState: 'source_grounded_neutral_candidate_metrics_exist_but_none_are_canonical_product_metrics_or_traditional_bindings' as const,
    researchSnapshot: FE041D_RESEARCH_SNAPSHOT,
    target: Object.freeze({
      criterionRef: 'criterion.intake.square_broad' as const,
      sourceConcept: '方大' as const,
      activeConstructScope: 'fang_shape_candidate_features_only' as const,
      sourceLineageConflictPreserved: true as const,
    }),
    candidateMetricRefs: EXPECTED_CANDIDATE_REFS,
    canonicalRegistryMetricCount: 13 as const,
    canonicalRegistryIntersection: Object.freeze([]) as readonly [],
    candidateEvidence: Object.freeze({
      sourceGroundedCandidateFamilyImplemented: true as const,
      syntheticNumericBehaviorVerified: true as const,
      empiricalCaptureRepeatabilityEstablished: false as const,
      humanSemanticLabelsIssued: 0 as const,
      constructValidityEstablished: false as const,
    }),
    mappingDecision: Object.freeze({
      canonicalMetricBindingAuthorized: false as const,
      traditionalFangBindingAuthorized: false as const,
      candidateCanonicalizationAuthorized: false as const,
    }),
    authorityBoundary: Object.freeze({
      candidateMetricDefinitionMeansTraditionalConstruct: false as const,
      syntheticDiscriminationMeansConstructValidity: false as const,
      empiricalSemanticEvidenceAdmitted: false as const,
      calibrationAuthorityIssued: false as const,
      numericThresholdAuthorityIssued: false as const,
      classificationBandsIssued: false as const,
      deterministicCriterionStateIssued: false as const,
      ruleAuthorityIssued: false as const,
      structuredClaimIssued: false as const,
      narrativeAuthorityIssued: false as const,
      productionSemanticExecutionAuthorized: false as const,
    }),
    nextFrontier: 'governed_candidate_metric_canonicalization_and_independent_semantic_mapping_evidence_before_calibration' as const,
  });
  ISSUED.add(result);
  return result;
}
export function assertIssuedSquareBroadCandidateMetricMappingReadinessFE041D(
  value: SquareBroadCandidateMetricMappingReadinessFE041DV1,
): void {
  if (!ISSUED.has(value)) fail('artifact was not issued by FE041D.');
}
