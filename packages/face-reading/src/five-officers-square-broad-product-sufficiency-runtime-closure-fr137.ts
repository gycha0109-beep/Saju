import type { FaceDiagnosisResolution } from './contracts.js';
import {
  assessFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122,
  assertIssuedFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122,
} from './five-officers-intake-mouth-semantic-execution-admission-fr122.js';
import {
  assertIssuedSquareBroadIndependentSemanticAnnotationAuthorityReuseReviewFR136,
  reviewSquareBroadIndependentSemanticAnnotationAuthorityReuseFR136,
} from './five-officers-square-broad-independent-semantic-annotation-authority-reuse-review-fr136.js';
import { FaceAuthorityValidationError } from './validation.js';

const CRITERION_REF = 'criterion.intake.square_broad' as const;
const SOURCE_CONCEPT = '方大' as const;
const PRODUCT_UNAVAILABLE_SECTION = 'five_officers.intake.static_support' as const;
const DIAGNOSIS_RESOLUTION: FaceDiagnosisResolution = 'unsupported_method';

export const FR137_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr137-square-broad-product-sufficiency-runtime-closure.md' as const;
export const FR137_NEXT_FRONTIER =
  'square_broad_empirical_semantic_authority_materialization_before_any_product_semantic_emission' as const;

export type SquareBroadProductSufficiencyStateFR137 = 'blocked';

export interface SquareBroadProductSufficiencyRuntimeClosureFR137V1 {
  readonly schemaVersion: 'fr137-square-broad-product-sufficiency-runtime-closure-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'square_broad_product_semantic_emission_fail_closed_unsupported_method';
  readonly target: {
    readonly criterionRef: typeof CRITERION_REF;
    readonly sourceConcept: typeof SOURCE_CONCEPT;
    readonly activeConstructScope: 'fang_shape_candidate_features_only';
  };
  readonly predecessorAuthority: {
    readonly fr122AuthorityState: 'mouth_semantic_vertical_slice_blocked_no_authoritative_machine_criterion_state';
    readonly fr122ExecutableCriterionId: null;
    readonly fr122CriterionStateAuthorized: false;
    readonly fr136AuthorityState: 'square_broad_semantic_annotation_authority_reuse_review_completed_no_reusable_criterion_specific_authority_or_protocol';
    readonly annotationAuthorityRef: null;
    readonly annotationProtocolRef: null;
    readonly labelSchemaRef: null;
    readonly reviewerCount: null;
    readonly quorum: null;
    readonly consensusThreshold: null;
    readonly traditionalSemanticAuthority: false;
  };
  readonly productSufficiency: {
    readonly state: SquareBroadProductSufficiencyStateFR137;
    readonly diagnosisResolution: 'unsupported_method';
    readonly unavailableSections: readonly [typeof PRODUCT_UNAVAILABLE_SECTION];
    readonly reasonCodes: readonly [
      'traditional_metric_binding_not_authorized',
      'calibrated_threshold_not_authorized',
      'machine_criterion_state_not_authorized',
      'criterion_specific_semantic_annotation_authority_absent',
      'criterion_specific_annotation_protocol_absent',
      'traditional_semantic_authority_absent',
    ];
  };
  readonly emission: {
    readonly neutralMetricValuesConsumed: 0;
    readonly researchAssertionStatesConsumed: 0;
    readonly criterionState: null;
    readonly structuredClaim: null;
    readonly boundedNarrative: null;
    readonly productSemanticReading: null;
    readonly characterGrounding: null;
  };
  readonly executionBoundary: {
    readonly neutralMetricValueMayAuthorizeCriterionState: false;
    readonly researchAssertionMayAuthorizeProductCriterionState: false;
    readonly unavailableCriterionMayEmitTraditionalClaim: false;
    readonly unavailableCriterionMayEmitTraditionalNarrative: false;
    readonly researchOnlyDiagnosisRuntimeMayBePromotedByThisGate: false;
    readonly llmMayFillMissingCriterionState: false;
    readonly llmMayFillMissingClaim: false;
    readonly llmMayFillMissingNarrative: false;
  };
  readonly nextFrontier: typeof FR137_NEXT_FRONTIER;
  readonly researchNoteRef: typeof FR137_RESEARCH_NOTE_REF;
}

const ISSUED = new WeakSet<object>();
let CACHED: SquareBroadProductSufficiencyRuntimeClosureFR137V1 | null = null;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-137 ${message}`);
}

function validatePredecessorAuthority(): void {
  const fr122 = assessFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122();
  assertIssuedFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122(fr122);
  const squareBroad = fr122.criterionReadiness.find((entry) => entry.criterionId === CRITERION_REF);
  if (
    fr122.authorityState !== 'mouth_semantic_vertical_slice_blocked_no_authoritative_machine_criterion_state' ||
    fr122.executableCriterionId !== null ||
    fr122.execution.criterionStatesIssued !== 0 ||
    fr122.execution.structuredClaimsIssued !== 0 ||
    fr122.execution.boundedNarrativesIssued !== 0 ||
    fr122.execution.traditionalSemanticAuthority !== false ||
    squareBroad === undefined ||
    squareBroad.sourceConcept !== SOURCE_CONCEPT ||
    squareBroad.traditionalMetricBindingAuthorized !== false ||
    squareBroad.calibratedThresholdAuthorized !== false ||
    squareBroad.machineCriterionStateAuthorized !== false ||
    squareBroad.semanticSliceAuthorized !== false
  ) fail('FR-122 machine semantic execution boundary drift.');

  const fr136 = reviewSquareBroadIndependentSemanticAnnotationAuthorityReuseFR136();
  assertIssuedSquareBroadIndependentSemanticAnnotationAuthorityReuseReviewFR136(fr136);
  if (
    fr136.authorityState !==
      'square_broad_semantic_annotation_authority_reuse_review_completed_no_reusable_criterion_specific_authority_or_protocol' ||
    fr136.target.criterionRef !== CRITERION_REF ||
    fr136.target.sourceConcept !== SOURCE_CONCEPT ||
    fr136.target.activeConstructScope !== 'fang_shape_candidate_features_only' ||
    fr136.unresolvedAnnotationAuthority.annotationAuthorityRef !== null ||
    fr136.unresolvedAnnotationAuthority.annotationProtocolRef !== null ||
    fr136.unresolvedAnnotationAuthority.labelSchemaRef !== null ||
    fr136.unresolvedAnnotationAuthority.reviewerCount !== null ||
    fr136.unresolvedAnnotationAuthority.quorum !== null ||
    fr136.unresolvedAnnotationAuthority.consensusThreshold !== null ||
    fr136.collectionGate.humanSemanticCollectionAuthorized !== false ||
    fr136.execution.criterionStatesIssued !== 0 ||
    fr136.execution.structuredClaimsIssued !== 0 ||
    fr136.execution.boundedNarrativesIssued !== 0 ||
    fr136.execution.traditionalSemanticAuthority !== false
  ) fail('FR-136 semantic annotation authority boundary drift.');
}

export function assessSquareBroadProductSufficiencyRuntimeClosureFR137(): SquareBroadProductSufficiencyRuntimeClosureFR137V1 {
  if (CACHED !== null) return CACHED;
  validatePredecessorAuthority();

  const result: SquareBroadProductSufficiencyRuntimeClosureFR137V1 = Object.freeze({
    schemaVersion: 'fr137-square-broad-product-sufficiency-runtime-closure-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'square_broad_product_semantic_emission_fail_closed_unsupported_method' as const,
    target: Object.freeze({
      criterionRef: CRITERION_REF,
      sourceConcept: SOURCE_CONCEPT,
      activeConstructScope: 'fang_shape_candidate_features_only' as const,
    }),
    predecessorAuthority: Object.freeze({
      fr122AuthorityState: 'mouth_semantic_vertical_slice_blocked_no_authoritative_machine_criterion_state' as const,
      fr122ExecutableCriterionId: null,
      fr122CriterionStateAuthorized: false as const,
      fr136AuthorityState:
        'square_broad_semantic_annotation_authority_reuse_review_completed_no_reusable_criterion_specific_authority_or_protocol' as const,
      annotationAuthorityRef: null,
      annotationProtocolRef: null,
      labelSchemaRef: null,
      reviewerCount: null,
      quorum: null,
      consensusThreshold: null,
      traditionalSemanticAuthority: false as const,
    }),
    productSufficiency: Object.freeze({
      state: 'blocked' as const,
      diagnosisResolution: DIAGNOSIS_RESOLUTION as 'unsupported_method',
      unavailableSections: Object.freeze([PRODUCT_UNAVAILABLE_SECTION] as const),
      reasonCodes: Object.freeze([
        'traditional_metric_binding_not_authorized',
        'calibrated_threshold_not_authorized',
        'machine_criterion_state_not_authorized',
        'criterion_specific_semantic_annotation_authority_absent',
        'criterion_specific_annotation_protocol_absent',
        'traditional_semantic_authority_absent',
      ] as const),
    }),
    emission: Object.freeze({
      neutralMetricValuesConsumed: 0 as const,
      researchAssertionStatesConsumed: 0 as const,
      criterionState: null,
      structuredClaim: null,
      boundedNarrative: null,
      productSemanticReading: null,
      characterGrounding: null,
    }),
    executionBoundary: Object.freeze({
      neutralMetricValueMayAuthorizeCriterionState: false as const,
      researchAssertionMayAuthorizeProductCriterionState: false as const,
      unavailableCriterionMayEmitTraditionalClaim: false as const,
      unavailableCriterionMayEmitTraditionalNarrative: false as const,
      researchOnlyDiagnosisRuntimeMayBePromotedByThisGate: false as const,
      llmMayFillMissingCriterionState: false as const,
      llmMayFillMissingClaim: false as const,
      llmMayFillMissingNarrative: false as const,
    }),
    nextFrontier: FR137_NEXT_FRONTIER,
    researchNoteRef: FR137_RESEARCH_NOTE_REF,
  });

  CACHED = result;
  ISSUED.add(result);
  return result;
}

export function assertIssuedSquareBroadProductSufficiencyRuntimeClosureFR137(
  value: SquareBroadProductSufficiencyRuntimeClosureFR137V1,
): void {
  if (!ISSUED.has(value)) fail('product sufficiency closure was not issued by the active FR-137 runtime.');
  if (
    value.authorityState !== 'square_broad_product_semantic_emission_fail_closed_unsupported_method' ||
    value.productSufficiency.state !== 'blocked' ||
    value.productSufficiency.diagnosisResolution !== 'unsupported_method' ||
    value.productSufficiency.unavailableSections.length !== 1 ||
    value.productSufficiency.unavailableSections[0] !== PRODUCT_UNAVAILABLE_SECTION ||
    value.emission.neutralMetricValuesConsumed !== 0 ||
    value.emission.researchAssertionStatesConsumed !== 0 ||
    value.emission.criterionState !== null ||
    value.emission.structuredClaim !== null ||
    value.emission.boundedNarrative !== null ||
    value.emission.productSemanticReading !== null ||
    value.emission.characterGrounding !== null ||
    value.executionBoundary.neutralMetricValueMayAuthorizeCriterionState !== false ||
    value.executionBoundary.researchOnlyDiagnosisRuntimeMayBePromotedByThisGate !== false ||
    value.executionBoundary.llmMayFillMissingCriterionState !== false ||
    value.executionBoundary.llmMayFillMissingClaim !== false ||
    value.executionBoundary.llmMayFillMissingNarrative !== false
  ) fail('issued product sufficiency closure drift.');
}

export function requireSquareBroadProductSemanticEmissionAuthorizationFR137(
  value: SquareBroadProductSufficiencyRuntimeClosureFR137V1,
): never {
  assertIssuedSquareBroadProductSufficiencyRuntimeClosureFR137(value);
  return fail(
    'criterion.intake.square_broad product semantic emission is blocked: diagnosisResolution=unsupported_method; no authorized criterion state, structured claim, or bounded narrative exists.',
  );
}
