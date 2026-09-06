import {
  FR150_NEXT_FRONTIER,
  assertIssuedSquareBroadFangControlledPerturbationExecutionFR150,
  getSquareBroadFangControlledPerturbationExecutionContractFR150,
  type SquareBroadFangControlledPerturbationExecutionFR150V1,
  type SquareBroadFangPrimaryTrendObservationFR150V1,
} from './five-officers-square-broad-fang-capture-quality-controlled-perturbation-execution-fr150.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR151_RECORD_ID =
  'research.face_reading.shenxiang.five_officers.square_broad_fang_capture_quality_perturbation_evidence_review.fr151' as const;
export const FR151_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr151-square-broad-fang-capture-quality-perturbation-evidence-review.md' as const;
export const FR151_NEXT_FRONTIER =
  'square_broad_fang_capture_quality_independent_multi_session_evidence_acquisition_and_candidate_construct_validation_decision_before_thresholds_or_repeatability' as const;

const REQUEST_KEYS = new Set(['schemaVersion', 'execution']);
const ISSUED = new WeakSet<object>();

type FamilyExecutionFR150 = SquareBroadFangControlledPerturbationExecutionFR150V1['familyExecutions'][number];

export interface SquareBroadFangCaptureQualityPerturbationEvidenceReviewRequestFR151V1 {
  readonly schemaVersion: 'fr151-square-broad-fang-capture-quality-perturbation-evidence-review-request-v1';
  readonly execution: SquareBroadFangControlledPerturbationExecutionFR150V1;
}

export type SquareBroadFangPerturbationExpectationStatusFR151V1 =
  | 'pre_registered_expectation_observed'
  | 'pre_registered_expectation_not_observed'
  | 'no_directional_acceptance_rule';

export type SquareBroadFangPerturbationEvidenceUseFR151V1 =
  | 'candidate_feature_response_only'
  | 'negative_control_response_only';

export interface SquareBroadFangPerturbationFamilyEvidenceReviewFR151V1 {
  readonly sourceRasterRef: string;
  readonly perturbationRef: FamilyExecutionFR150['perturbationRef'];
  readonly primaryFeatureRef: FamilyExecutionFR150['primaryFeatureRef'];
  readonly primaryExpectedTrend: FamilyExecutionFR150['primaryExpectedTrend'];
  readonly primaryTrendObservation: SquareBroadFangPrimaryTrendObservationFR150V1;
  readonly expectationStatus: SquareBroadFangPerturbationExpectationStatusFR151V1;
  readonly evidenceUse: SquareBroadFangPerturbationEvidenceUseFR151V1;
  readonly numericAcceptanceThreshold: null;
  readonly constructValidationDecision: 'deferred';
}

export interface SquareBroadFangCaptureQualityPerturbationEvidenceReviewFR151V1 {
  readonly schemaVersion: 'fr151-square-broad-fang-capture-quality-perturbation-evidence-review-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR151_RECORD_ID;
  readonly authorityState: 'perturbation_evidence_review_materialized_categorical_feature_response_only';
  readonly predecessor: {
    readonly fr150NextFrontier: typeof FR150_NEXT_FRONTIER;
    readonly fr150ExecutionIssuedInProcess: true;
    readonly fr150EmpiricalPerturbationExecutionPerformed: true;
    readonly fr150EmpiricalPerturbationValidationPerformed: false;
  };
  readonly reviewedSourceRasterCount: number;
  readonly reviewedFamilyExecutionCount: number;
  readonly directionalExpectationExecutionCount: number;
  readonly magnitudeChangeExpectationExecutionCount: number;
  readonly noDirectionalRuleExecutionCount: number;
  readonly preRegisteredExpectationObservedCount: number;
  readonly preRegisteredExpectationNotObservedCount: number;
  readonly allPreRegisteredExpectationsObservedAcrossReviewedExecutions: boolean;
  readonly reviewState:
    | 'pre_registered_feature_response_observations_consistent_on_reviewed_sources'
    | 'mixed_or_nonconforming_feature_response_observations';
  readonly familyReviews: readonly SquareBroadFangPerturbationFamilyEvidenceReviewFR151V1[];
  readonly evidenceBoundary: {
    readonly predecessorExecutionIssuedInProcess: true;
    readonly sourceBackingIndependentlyVerifiedByThisArtifact: false;
    readonly sourceRasterReconsumedByThisArtifact: false;
    readonly candidateFeatureNumericValuesReconsumedByThisArtifact: false;
    readonly categoricalTrendObservationsOnly: true;
    readonly postHocNumericCutoffIntroduced: false;
    readonly empiricalPerturbationEvidenceReviewPerformed: true;
    readonly empiricalPerturbationValidationPerformed: false;
    readonly candidateConstructAdvanceDecision: 'deferred_pending_independent_multi_session_and_construct_validity_evidence';
    readonly captureQualityMeasurementConstructValidated: false;
    readonly exposureMetricValidated: false;
    readonly sharpnessMetricValidated: false;
    readonly lightingMetricValidated: false;
    readonly occlusionValidityVerified: false;
    readonly captureQualityThresholdsDefined: false;
    readonly captureQualityValidated: false;
    readonly independentMultiSessionEvidenceAdmitted: false;
    readonly multiSessionIndependenceVerified: false;
    readonly repeatabilityInterpretationAllowed: false;
    readonly empiricalRepeatabilityEstablished: false;
    readonly numericCaptureQualityThreshold: null;
    readonly numericRepeatabilityAcceptanceThreshold: null;
  };
  readonly privacyBoundary: {
    readonly rawImageConsumed: false;
    readonly rawImagePersisted: false;
    readonly rawImageReturned: false;
    readonly rawPixelRasterConsumed: false;
    readonly rawPixelRasterPersisted: false;
    readonly rawPixelRasterReturned: false;
    readonly rawAggregateConsumed: false;
    readonly rawAggregatePersisted: false;
    readonly rawAggregateReturned: false;
    readonly candidateFeatureNumericValuesPersisted: false;
    readonly candidateFeatureNumericValuesReturned: false;
    readonly sourceDigestComputed: false;
    readonly sourceDigestPersisted: false;
    readonly sourceDigestReturned: false;
    readonly providerPayloadPersisted: false;
    readonly embeddingPersisted: false;
    readonly identityTemplatePersisted: false;
  };
  readonly semanticAuthority: {
    readonly constructValidity: 'unresolved';
    readonly traditionalBinding: 'unresolved';
    readonly criterionState: null;
    readonly structuredClaim: null;
    readonly boundedNarrative: null;
  };
  readonly traditionalSemanticAuthority: false;
  readonly researchNoteRef: typeof FR151_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR151_NEXT_FRONTIER;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-151 ${message}`);
}

function exactKeys(value: object, allowed: ReadonlySet<string>, label: string): void {
  const unexpected = Object.keys(value).find((key) => !allowed.has(key));
  if (unexpected !== undefined) fail(`${label} contains unauthorized field: ${unexpected}.`);
}

function expectationStatus(family: FamilyExecutionFR150): SquareBroadFangPerturbationExpectationStatusFR151V1 {
  const expected = family.primaryExpectedTrend;
  const observed = family.primaryTrendObservation;
  if (expected === null || expected === 'no_directional_acceptance_rule') {
    if (observed !== 'no_directional_acceptance_rule') fail(`family ${family.perturbationRef} has impossible no-rule observation drift.`);
    return 'no_directional_acceptance_rule';
  }
  if (expected === 'magnitude_change_expected_direction_not_fixed') {
    if (observed === 'magnitude_change_observed') return 'pre_registered_expectation_observed';
    if (observed === 'no_magnitude_change_observed') return 'pre_registered_expectation_not_observed';
    fail(`family ${family.perturbationRef} has impossible magnitude-change observation drift.`);
  }
  if (observed === 'directional_order_observed') return 'pre_registered_expectation_observed';
  if (observed === 'directional_order_not_observed') return 'pre_registered_expectation_not_observed';
  fail(`family ${family.perturbationRef} has impossible directional observation drift.`);
}

function validateExecution(execution: SquareBroadFangControlledPerturbationExecutionFR150V1): void {
  assertIssuedSquareBroadFangControlledPerturbationExecutionFR150(execution);
  const contract = getSquareBroadFangControlledPerturbationExecutionContractFR150();
  if (
    contract.nextFrontier !== FR150_NEXT_FRONTIER
    || execution.nextFrontier !== FR150_NEXT_FRONTIER
    || execution.authorityState !== 'controlled_perturbation_execution_materialized_feature_response_observation_only'
    || execution.schedules.length !== 5
    || execution.observedSourceRasterCount <= 0
    || execution.observedFamilyExecutionCount !== execution.observedSourceRasterCount * 5
    || execution.observedVariantCount !== execution.observedFamilyExecutionCount * 3
    || execution.familyExecutions.length !== execution.observedFamilyExecutionCount
    || execution.executionBoundary.empiricalPerturbationExecutionPerformed !== true
    || execution.executionBoundary.featureResponseTrendObservationMaterialized !== true
    || execution.executionBoundary.empiricalPerturbationValidationPerformed !== false
    || execution.executionBoundary.captureQualityMeasurementConstructValidated !== false
    || execution.executionBoundary.captureQualityThresholdsDefined !== false
    || execution.executionBoundary.captureQualityValidated !== false
    || execution.executionBoundary.independentMultiSessionEvidenceAdmitted !== false
    || execution.executionBoundary.repeatabilityInterpretationAllowed !== false
    || execution.executionBoundary.empiricalRepeatabilityEstablished !== false
    || execution.executionBoundary.numericCaptureQualityThreshold !== null
    || execution.executionBoundary.numericRepeatabilityAcceptanceThreshold !== null
    || execution.traditionalSemanticAuthority !== false
  ) fail('FR-150 predecessor execution or authority boundary drift.');

  const expectedRefs = execution.schedules.map((schedule) => schedule.perturbationRef);
  const bySource = new Map<string, FamilyExecutionFR150[]>();
  for (const family of execution.familyExecutions) {
    const entries = bySource.get(family.sourceRasterRef) ?? [];
    entries.push(family);
    bySource.set(family.sourceRasterRef, entries);
  }
  if (bySource.size !== execution.observedSourceRasterCount) fail('source-count drift in FR-150 predecessor execution.');
  for (const [sourceRef, entries] of bySource) {
    if (entries.length !== 5) fail(`source ${sourceRef} must contain exactly five family executions.`);
    const refs = entries.map((entry) => entry.perturbationRef);
    if (refs.some((ref, index) => ref !== expectedRefs[index])) fail(`source ${sourceRef} family order drift.`);
    for (const entry of entries) {
      if (entry.variants.length !== 3 || entry.numericAcceptanceThreshold !== null || entry.constructValidationDecision !== 'deferred') {
        fail(`source ${sourceRef} family ${entry.perturbationRef} execution boundary drift.`);
      }
    }
  }
}

function validateRequest(request: SquareBroadFangCaptureQualityPerturbationEvidenceReviewRequestFR151V1): void {
  if (typeof request !== 'object' || request === null) fail('request must be an object.');
  exactKeys(request, REQUEST_KEYS, 'request');
  if (request.schemaVersion !== 'fr151-square-broad-fang-capture-quality-perturbation-evidence-review-request-v1') {
    fail('request schemaVersion is unsupported.');
  }
  validateExecution(request.execution);
}

export function getSquareBroadFangCaptureQualityPerturbationEvidenceReviewContractFR151() {
  const predecessor = getSquareBroadFangControlledPerturbationExecutionContractFR150();
  if (
    predecessor.nextFrontier !== FR150_NEXT_FRONTIER
    || predecessor.executionBoundary.constructValidationPerformedByThisArtifact !== false
    || predecessor.executionBoundary.captureQualityThresholdsDefined !== false
    || predecessor.executionBoundary.repeatabilityThresholdsDefined !== false
    || predecessor.executionBoundary.independentMultiSessionEvidenceAdmitted !== false
    || predecessor.executionBoundary.traditionalSemanticAuthority !== false
  ) fail('FR-150 predecessor contract drift.');

  return Object.freeze({
    schemaVersion: 'fr151-square-broad-fang-capture-quality-perturbation-evidence-review-contract-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR151_RECORD_ID,
    predecessor: Object.freeze({ fr150NextFrontier: FR150_NEXT_FRONTIER }),
    reviewBoundary: Object.freeze({
      issuedFR150ExecutionRequired: true as const,
      numericFeatureValuesRequiredForReview: false as const,
      categoricalTrendObservationOnly: true as const,
      postHocNumericCutoffAllowed: false as const,
      constructValidationPerformedByThisArtifact: false as const,
      captureQualityThresholdsDefined: false as const,
      repeatabilityThresholdsDefined: false as const,
      independentMultiSessionEvidenceAdmitted: false as const,
      traditionalSemanticAuthority: false as const,
    }),
    nextFrontier: FR151_NEXT_FRONTIER,
  });
}

export function materializeSquareBroadFangCaptureQualityPerturbationEvidenceReviewFR151(
  request: SquareBroadFangCaptureQualityPerturbationEvidenceReviewRequestFR151V1,
): SquareBroadFangCaptureQualityPerturbationEvidenceReviewFR151V1 {
  validateRequest(request);
  const contract = getSquareBroadFangCaptureQualityPerturbationEvidenceReviewContractFR151();
  if (contract.nextFrontier !== FR151_NEXT_FRONTIER) fail('FR-151 contract drift at review time.');

  const familyReviews = request.execution.familyExecutions.map((family) => {
    const status = expectationStatus(family);
    return Object.freeze({
      sourceRasterRef: family.sourceRasterRef,
      perturbationRef: family.perturbationRef,
      primaryFeatureRef: family.primaryFeatureRef,
      primaryExpectedTrend: family.primaryExpectedTrend,
      primaryTrendObservation: family.primaryTrendObservation,
      expectationStatus: status,
      evidenceUse: status === 'no_directional_acceptance_rule'
        ? 'negative_control_response_only' as const
        : 'candidate_feature_response_only' as const,
      numericAcceptanceThreshold: null,
      constructValidationDecision: 'deferred' as const,
    });
  });

  let directionalExpectationExecutionCount = 0;
  let magnitudeChangeExpectationExecutionCount = 0;
  let noDirectionalRuleExecutionCount = 0;
  let preRegisteredExpectationObservedCount = 0;
  let preRegisteredExpectationNotObservedCount = 0;
  for (const review of familyReviews) {
    if (review.expectationStatus === 'no_directional_acceptance_rule') {
      noDirectionalRuleExecutionCount += 1;
    } else if (review.primaryExpectedTrend === 'magnitude_change_expected_direction_not_fixed') {
      magnitudeChangeExpectationExecutionCount += 1;
    } else {
      directionalExpectationExecutionCount += 1;
    }
    if (review.expectationStatus === 'pre_registered_expectation_observed') preRegisteredExpectationObservedCount += 1;
    if (review.expectationStatus === 'pre_registered_expectation_not_observed') preRegisteredExpectationNotObservedCount += 1;
  }

  const allObserved = preRegisteredExpectationNotObservedCount === 0;
  const output: SquareBroadFangCaptureQualityPerturbationEvidenceReviewFR151V1 = Object.freeze({
    schemaVersion: 'fr151-square-broad-fang-capture-quality-perturbation-evidence-review-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR151_RECORD_ID,
    authorityState: 'perturbation_evidence_review_materialized_categorical_feature_response_only' as const,
    predecessor: Object.freeze({
      fr150NextFrontier: FR150_NEXT_FRONTIER,
      fr150ExecutionIssuedInProcess: true as const,
      fr150EmpiricalPerturbationExecutionPerformed: true as const,
      fr150EmpiricalPerturbationValidationPerformed: false as const,
    }),
    reviewedSourceRasterCount: request.execution.observedSourceRasterCount,
    reviewedFamilyExecutionCount: familyReviews.length,
    directionalExpectationExecutionCount,
    magnitudeChangeExpectationExecutionCount,
    noDirectionalRuleExecutionCount,
    preRegisteredExpectationObservedCount,
    preRegisteredExpectationNotObservedCount,
    allPreRegisteredExpectationsObservedAcrossReviewedExecutions: allObserved,
    reviewState: allObserved
      ? 'pre_registered_feature_response_observations_consistent_on_reviewed_sources' as const
      : 'mixed_or_nonconforming_feature_response_observations' as const,
    familyReviews: Object.freeze(familyReviews),
    evidenceBoundary: Object.freeze({
      predecessorExecutionIssuedInProcess: true as const,
      sourceBackingIndependentlyVerifiedByThisArtifact: false as const,
      sourceRasterReconsumedByThisArtifact: false as const,
      candidateFeatureNumericValuesReconsumedByThisArtifact: false as const,
      categoricalTrendObservationsOnly: true as const,
      postHocNumericCutoffIntroduced: false as const,
      empiricalPerturbationEvidenceReviewPerformed: true as const,
      empiricalPerturbationValidationPerformed: false as const,
      candidateConstructAdvanceDecision: 'deferred_pending_independent_multi_session_and_construct_validity_evidence' as const,
      captureQualityMeasurementConstructValidated: false as const,
      exposureMetricValidated: false as const,
      sharpnessMetricValidated: false as const,
      lightingMetricValidated: false as const,
      occlusionValidityVerified: false as const,
      captureQualityThresholdsDefined: false as const,
      captureQualityValidated: false as const,
      independentMultiSessionEvidenceAdmitted: false as const,
      multiSessionIndependenceVerified: false as const,
      repeatabilityInterpretationAllowed: false as const,
      empiricalRepeatabilityEstablished: false as const,
      numericCaptureQualityThreshold: null,
      numericRepeatabilityAcceptanceThreshold: null,
    }),
    privacyBoundary: Object.freeze({
      rawImageConsumed: false as const,
      rawImagePersisted: false as const,
      rawImageReturned: false as const,
      rawPixelRasterConsumed: false as const,
      rawPixelRasterPersisted: false as const,
      rawPixelRasterReturned: false as const,
      rawAggregateConsumed: false as const,
      rawAggregatePersisted: false as const,
      rawAggregateReturned: false as const,
      candidateFeatureNumericValuesPersisted: false as const,
      candidateFeatureNumericValuesReturned: false as const,
      sourceDigestComputed: false as const,
      sourceDigestPersisted: false as const,
      sourceDigestReturned: false as const,
      providerPayloadPersisted: false as const,
      embeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
    }),
    semanticAuthority: Object.freeze({
      constructValidity: 'unresolved' as const,
      traditionalBinding: 'unresolved' as const,
      criterionState: null,
      structuredClaim: null,
      boundedNarrative: null,
    }),
    traditionalSemanticAuthority: false as const,
    researchNoteRef: FR151_RESEARCH_NOTE_REF,
    nextFrontier: FR151_NEXT_FRONTIER,
  });
  ISSUED.add(output);
  return output;
}

export function assertIssuedSquareBroadFangCaptureQualityPerturbationEvidenceReviewFR151(
  value: SquareBroadFangCaptureQualityPerturbationEvidenceReviewFR151V1,
): void {
  if (!ISSUED.has(value)) fail('perturbation evidence review was not issued by the active FR-151 boundary.');
}
