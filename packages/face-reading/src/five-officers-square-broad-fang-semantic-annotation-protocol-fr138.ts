import {
  assessFiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131,
  assertIssuedFiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131,
} from './five-officers-intake-methodology-review-project-owner-governance-materialization-fr131.js';
import {
  FR136_NEXT_FRONTIER,
  assertIssuedSquareBroadIndependentSemanticAnnotationAuthorityReuseReviewFR136,
  reviewSquareBroadIndependentSemanticAnnotationAuthorityReuseFR136,
} from './five-officers-square-broad-independent-semantic-annotation-authority-reuse-review-fr136.js';
import {
  FR137_NEXT_FRONTIER,
  assessSquareBroadProductSufficiencyRuntimeClosureFR137,
  assertIssuedSquareBroadProductSufficiencyRuntimeClosureFR137,
} from './five-officers-square-broad-product-sufficiency-runtime-closure-fr137.js';
import { FaceAuthorityValidationError } from './validation.js';

const CRITERION_REF = 'criterion.intake.square_broad' as const;
const SOURCE_CONCEPT = '方大' as const;
const ACTIVE_CONSTRUCT_SCOPE = 'fang_shape_candidate_features_only' as const;
const SOURCE_PASSAGE_REF = 'passage.shenxiang.five_officers.intake.nlc_1925' as const;
const METHODOLOGY_REF = 'method.shenxiang.five_officers.intake_criteria@0.2.0' as const;
const PROTOCOL_REF = 'research.protocol.face.intake.square_broad.fang_blinded_annotation@0.1.0' as const;
const LABEL_SCHEMA_REF = 'research.label_schema.face.intake.square_broad.fang_shape_hypothesis@0.1.0' as const;

export const FR138_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr138-square-broad-fang-semantic-annotation-protocol.md' as const;
export const FR138_NEXT_FRONTIER =
  'square_broad_fang_annotation_governance_and_target_specific_methodology_decision_before_any_human_semantic_collection' as const;

export type FangShapeHypothesisLabelFR138 =
  | 'supports_fang_shape_hypothesis'
  | 'does_not_support_fang_shape_hypothesis'
  | 'unable_to_conclude';

export interface SquareBroadFangBlindedAnnotationPacketFR138V1 {
  readonly schemaVersion: 'fr138-square-broad-fang-blinded-annotation-packet-v1';
  readonly packetRef: string;
  readonly researchSubjectRef: string;
  readonly captureSeriesRef: string;
  readonly captureRef: string;
  readonly criterionRef: typeof CRITERION_REF;
  readonly activeConstructScope: typeof ACTIVE_CONSTRUCT_SCOPE;
  readonly sourcePassageRef: typeof SOURCE_PASSAGE_REF;
  readonly methodologyRef: typeof METHODOLOGY_REF;
  readonly protocolRef: typeof PROTOCOL_REF;
  readonly labelSchemaRef: typeof LABEL_SCHEMA_REF;
  readonly hiddenFields: readonly [
    'fr134_candidate_metric_values',
    'candidate_thresholds',
    'peer_labels',
    'model_or_provider_results',
    'automated_traditional_interpretation',
  ];
}

export interface SquareBroadFangSemanticAnnotationProtocolFR138V1 {
  readonly schemaVersion: 'fr138-square-broad-fang-semantic-annotation-protocol-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'square_broad_fang_research_annotation_protocol_candidate_materialized_collection_not_authorized';
  readonly target: {
    readonly criterionRef: typeof CRITERION_REF;
    readonly sourceConcept: typeof SOURCE_CONCEPT;
    readonly activeConstructScope: typeof ACTIVE_CONSTRUCT_SCOPE;
  };
  readonly predecessor: {
    readonly fr137NextFrontier: typeof FR137_NEXT_FRONTIER;
    readonly fr137DiagnosisResolution: 'unsupported_method';
    readonly fr136NextFrontier: typeof FR136_NEXT_FRONTIER;
    readonly annotationAuthorityRef: null;
    readonly priorAnnotationProtocolRef: null;
    readonly priorLabelSchemaRef: null;
    readonly humanSemanticCollectionAuthorized: false;
  };
  readonly methodologyGovernance: {
    readonly authorityRoleRef: 'role.myeongha.project_owner';
    readonly methodologyReviewAuthorityScope: 'methodology_review_promotion';
    readonly targetSpecificApprovalRequired: true;
    readonly targetSpecificReviewDecisionPresent: false;
    readonly reviewedPromotionAuthorized: false;
    readonly annotationAuthorityDerivedFromMethodologyGovernance: false;
  };
  readonly sourceGrounding: {
    readonly passageRef: typeof SOURCE_PASSAGE_REF;
    readonly passageVerificationStatus: 'scan_checked';
    readonly methodologyRef: typeof METHODOLOGY_REF;
    readonly methodologyReviewStatus: 'research';
    readonly sourceTextSegment: '口須要方大';
    readonly focalSourceTerm: '方';
    readonly interpretationStatus: 'research_hypothesis_not_traditional_equivalence';
  };
  readonly protocolCandidate: {
    readonly protocolRef: typeof PROTOCOL_REF;
    readonly status: 'research_candidate_not_collection_authorized';
    readonly reviewerInstruction: string;
    readonly scopeExclusions: readonly [
      '大_relative_size_or_broadness',
      '端厚_lip_substantiality',
      '角弓_corner_arch',
      '開大合小_open_close_relation',
      '唇紅_lip_color',
      'outer_inner_anatomical_role_assignment',
      'metric_to_traditional_term_equivalence',
    ];
    readonly blinding: {
      readonly fr134CandidateMetricValuesHidden: true;
      readonly candidateThresholdsHidden: true;
      readonly peerLabelsHiddenDuringInitialAssessment: true;
      readonly modelOrProviderResultsHidden: true;
      readonly automatedTraditionalInterpretationHidden: true;
    };
    readonly independentInitialAssessmentRequired: true;
    readonly abstentionPathRequired: true;
    readonly targetSpecificMethodologyDecisionRequiredBeforeCollection: true;
    readonly reviewerActorGovernanceRequiredBeforeCollection: true;
  };
  readonly labelSchemaCandidate: {
    readonly labelSchemaRef: typeof LABEL_SCHEMA_REF;
    readonly status: 'research_candidate_not_traditional_criterion_state';
    readonly labels: readonly [
      'supports_fang_shape_hypothesis',
      'does_not_support_fang_shape_hypothesis',
      'unable_to_conclude',
    ];
    readonly labelsMeanTraditionalCriterionState: false;
    readonly labelsMeanMetricBinding: false;
    readonly labelsMeanThreshold: false;
  };
  readonly packetContract: {
    readonly packetSchemaVersion: 'fr138-square-broad-fang-blinded-annotation-packet-v1';
    readonly requiredProvenance: readonly [
      'researchSubjectRef',
      'captureSeriesRef',
      'captureRef',
      'sourcePassageRef',
      'criterionRef',
      'protocolRef',
    ];
    readonly rawImageContentPersisted: false;
    readonly sourceImageContentPersisted: false;
    readonly faceEmbeddingPersisted: false;
    readonly identityTemplatePersisted: false;
    readonly candidateMetricValuesPresent: false;
    readonly candidateThresholdsPresent: false;
    readonly peerLabelsPresent: false;
  };
  readonly unresolvedPolicy: {
    readonly annotationAuthorityRef: null;
    readonly reviewerCount: null;
    readonly quorum: null;
    readonly consensusThreshold: null;
    readonly adjudicationRuleRef: null;
    readonly reviewerQualificationRef: null;
  };
  readonly collectionGate: {
    readonly protocolCandidateMaterialized: true;
    readonly labelSchemaCandidateMaterialized: true;
    readonly humanSemanticCollectionAuthorized: false;
    readonly empiricalSemanticEvidenceAcquisitionAuthorized: false;
  };
  readonly authorityBoundary: {
    readonly researchProtocolCandidateMeansAnnotationAuthority: false;
    readonly researchLabelSchemaCandidateMeansTraditionalSemanticAuthority: false;
    readonly projectOwnerMethodologyGovernanceMeansAnnotationAuthority: false;
    readonly scanCheckedSourceMeansMethodologyReviewed: false;
    readonly fangHypothesisLabelMeansTraditionalCriterionState: false;
    readonly humanLabelMeansMetricBinding: false;
    readonly humanLabelMeansCalibrationThreshold: false;
    readonly protocolDesignMeansCollectionAuthority: false;
    readonly llmMayIssueHumanSemanticLabel: false;
  };
  readonly execution: {
    readonly researchProtocolCandidatesMaterialized: 1;
    readonly researchLabelSchemaCandidatesMaterialized: 1;
    readonly blindedPacketTemplatesMaterialized: 1;
    readonly annotationAuthoritiesIssued: 0;
    readonly humanSemanticCollectionsStarted: 0;
    readonly empiricalSemanticLabelsIssued: 0;
    readonly traditionalMetricBindingsIssued: 0;
    readonly calibrationProtocolsIssued: 0;
    readonly thresholdsIssued: 0;
    readonly criterionStatesIssued: 0;
    readonly structuredClaimsIssued: 0;
    readonly boundedNarrativesIssued: 0;
    readonly traditionalSemanticAuthority: false;
  };
  readonly researchNoteRef: typeof FR138_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR138_NEXT_FRONTIER;
}

export interface CreateSquareBroadFangBlindedAnnotationPacketFR138Input {
  readonly packetRef: string;
  readonly researchSubjectRef: string;
  readonly captureSeriesRef: string;
  readonly captureRef: string;
}

const ALLOWED_PACKET_INPUT_KEYS = new Set([
  'packetRef',
  'researchSubjectRef',
  'captureSeriesRef',
  'captureRef',
]);

const ISSUED = new WeakSet<object>();
let CACHED: SquareBroadFangSemanticAnnotationProtocolFR138V1 | null = null;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-138 ${message}`);
}

function requireNonEmptyRef(name: string, value: string): void {
  if (typeof value !== 'string' || value.trim().length === 0) fail(`${name} must be a non-empty opaque reference.`);
}

function validatePredecessors(): void {
  const fr137 = assessSquareBroadProductSufficiencyRuntimeClosureFR137();
  assertIssuedSquareBroadProductSufficiencyRuntimeClosureFR137(fr137);
  if (
    fr137.nextFrontier !== FR137_NEXT_FRONTIER ||
    fr137.productSufficiency.diagnosisResolution !== 'unsupported_method' ||
    fr137.emission.criterionState !== null ||
    fr137.emission.structuredClaim !== null ||
    fr137.emission.boundedNarrative !== null
  ) fail('FR-137 product fail-closed boundary drift.');

  const fr136 = reviewSquareBroadIndependentSemanticAnnotationAuthorityReuseFR136();
  assertIssuedSquareBroadIndependentSemanticAnnotationAuthorityReuseReviewFR136(fr136);
  if (
    fr136.nextFrontier !== FR136_NEXT_FRONTIER ||
    fr136.target.criterionRef !== CRITERION_REF ||
    fr136.target.activeConstructScope !== ACTIVE_CONSTRUCT_SCOPE ||
    fr136.unresolvedAnnotationAuthority.annotationAuthorityRef !== null ||
    fr136.unresolvedAnnotationAuthority.annotationProtocolRef !== null ||
    fr136.unresolvedAnnotationAuthority.labelSchemaRef !== null ||
    fr136.unresolvedAnnotationAuthority.reviewerCount !== null ||
    fr136.unresolvedAnnotationAuthority.quorum !== null ||
    fr136.unresolvedAnnotationAuthority.consensusThreshold !== null ||
    fr136.collectionGate.humanSemanticCollectionAuthorized !== false ||
    fr136.collectionGate.empiricalSemanticEvidenceAcquisitionAuthorized !== false
  ) fail('FR-136 annotation authority boundary drift.');

  const fr131 = assessFiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131();
  assertIssuedFiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131(fr131);
  if (
    fr131.governanceDecision.authorityRoleRef !== 'role.myeongha.project_owner' ||
    fr131.governanceDecision.targetSpecificApprovalRequired !== true ||
    fr131.admission.targetSpecificReviewDecisionPresent !== false ||
    fr131.admission.reviewedPromotionAuthorized !== false ||
    fr131.execution.methodologyReviewDecisionRecordsIssued !== 0
  ) fail('FR-131 target-specific methodology decision boundary drift.');
}

export function materializeSquareBroadFangSemanticAnnotationProtocolFR138(): SquareBroadFangSemanticAnnotationProtocolFR138V1 {
  if (CACHED !== null) return CACHED;
  validatePredecessors();

  const result: SquareBroadFangSemanticAnnotationProtocolFR138V1 = Object.freeze({
    schemaVersion: 'fr138-square-broad-fang-semantic-annotation-protocol-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'square_broad_fang_research_annotation_protocol_candidate_materialized_collection_not_authorized' as const,
    target: Object.freeze({ criterionRef: CRITERION_REF, sourceConcept: SOURCE_CONCEPT, activeConstructScope: ACTIVE_CONSTRUCT_SCOPE }),
    predecessor: Object.freeze({
      fr137NextFrontier: FR137_NEXT_FRONTIER,
      fr137DiagnosisResolution: 'unsupported_method' as const,
      fr136NextFrontier: FR136_NEXT_FRONTIER,
      annotationAuthorityRef: null,
      priorAnnotationProtocolRef: null,
      priorLabelSchemaRef: null,
      humanSemanticCollectionAuthorized: false as const,
    }),
    methodologyGovernance: Object.freeze({
      authorityRoleRef: 'role.myeongha.project_owner' as const,
      methodologyReviewAuthorityScope: 'methodology_review_promotion' as const,
      targetSpecificApprovalRequired: true as const,
      targetSpecificReviewDecisionPresent: false as const,
      reviewedPromotionAuthorized: false as const,
      annotationAuthorityDerivedFromMethodologyGovernance: false as const,
    }),
    sourceGrounding: Object.freeze({
      passageRef: SOURCE_PASSAGE_REF,
      passageVerificationStatus: 'scan_checked' as const,
      methodologyRef: METHODOLOGY_REF,
      methodologyReviewStatus: 'research' as const,
      sourceTextSegment: '口須要方大' as const,
      focalSourceTerm: '方' as const,
      interpretationStatus: 'research_hypothesis_not_traditional_equivalence' as const,
    }),
    protocolCandidate: Object.freeze({
      protocolRef: PROTOCOL_REF,
      status: 'research_candidate_not_collection_authorized' as const,
      reviewerInstruction:
        'Assess only whether the visible mouth contour-set, as a whole, supports the research hypothesis of a predominantly square or rectilinear form for 方. Treat this as construct-validity research evidence only: do not equate aspect ratio, angularity, rectilinearity, or any candidate metric with 方, and do not judge 大 or any other intake criterion.',
      scopeExclusions: Object.freeze([
        '大_relative_size_or_broadness',
        '端厚_lip_substantiality',
        '角弓_corner_arch',
        '開大合小_open_close_relation',
        '唇紅_lip_color',
        'outer_inner_anatomical_role_assignment',
        'metric_to_traditional_term_equivalence',
      ] as const),
      blinding: Object.freeze({
        fr134CandidateMetricValuesHidden: true as const,
        candidateThresholdsHidden: true as const,
        peerLabelsHiddenDuringInitialAssessment: true as const,
        modelOrProviderResultsHidden: true as const,
        automatedTraditionalInterpretationHidden: true as const,
      }),
      independentInitialAssessmentRequired: true as const,
      abstentionPathRequired: true as const,
      targetSpecificMethodologyDecisionRequiredBeforeCollection: true as const,
      reviewerActorGovernanceRequiredBeforeCollection: true as const,
    }),
    labelSchemaCandidate: Object.freeze({
      labelSchemaRef: LABEL_SCHEMA_REF,
      status: 'research_candidate_not_traditional_criterion_state' as const,
      labels: Object.freeze([
        'supports_fang_shape_hypothesis',
        'does_not_support_fang_shape_hypothesis',
        'unable_to_conclude',
      ] as const),
      labelsMeanTraditionalCriterionState: false as const,
      labelsMeanMetricBinding: false as const,
      labelsMeanThreshold: false as const,
    }),
    packetContract: Object.freeze({
      packetSchemaVersion: 'fr138-square-broad-fang-blinded-annotation-packet-v1' as const,
      requiredProvenance: Object.freeze([
        'researchSubjectRef',
        'captureSeriesRef',
        'captureRef',
        'sourcePassageRef',
        'criterionRef',
        'protocolRef',
      ] as const),
      rawImageContentPersisted: false as const,
      sourceImageContentPersisted: false as const,
      faceEmbeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
      candidateMetricValuesPresent: false as const,
      candidateThresholdsPresent: false as const,
      peerLabelsPresent: false as const,
    }),
    unresolvedPolicy: Object.freeze({
      annotationAuthorityRef: null,
      reviewerCount: null,
      quorum: null,
      consensusThreshold: null,
      adjudicationRuleRef: null,
      reviewerQualificationRef: null,
    }),
    collectionGate: Object.freeze({
      protocolCandidateMaterialized: true as const,
      labelSchemaCandidateMaterialized: true as const,
      humanSemanticCollectionAuthorized: false as const,
      empiricalSemanticEvidenceAcquisitionAuthorized: false as const,
    }),
    authorityBoundary: Object.freeze({
      researchProtocolCandidateMeansAnnotationAuthority: false as const,
      researchLabelSchemaCandidateMeansTraditionalSemanticAuthority: false as const,
      projectOwnerMethodologyGovernanceMeansAnnotationAuthority: false as const,
      scanCheckedSourceMeansMethodologyReviewed: false as const,
      fangHypothesisLabelMeansTraditionalCriterionState: false as const,
      humanLabelMeansMetricBinding: false as const,
      humanLabelMeansCalibrationThreshold: false as const,
      protocolDesignMeansCollectionAuthority: false as const,
      llmMayIssueHumanSemanticLabel: false as const,
    }),
    execution: Object.freeze({
      researchProtocolCandidatesMaterialized: 1 as const,
      researchLabelSchemaCandidatesMaterialized: 1 as const,
      blindedPacketTemplatesMaterialized: 1 as const,
      annotationAuthoritiesIssued: 0 as const,
      humanSemanticCollectionsStarted: 0 as const,
      empiricalSemanticLabelsIssued: 0 as const,
      traditionalMetricBindingsIssued: 0 as const,
      calibrationProtocolsIssued: 0 as const,
      thresholdsIssued: 0 as const,
      criterionStatesIssued: 0 as const,
      structuredClaimsIssued: 0 as const,
      boundedNarrativesIssued: 0 as const,
      traditionalSemanticAuthority: false as const,
    }),
    researchNoteRef: FR138_RESEARCH_NOTE_REF,
    nextFrontier: FR138_NEXT_FRONTIER,
  });

  CACHED = result;
  ISSUED.add(result);
  return result;
}

export function assertIssuedSquareBroadFangSemanticAnnotationProtocolFR138(
  value: SquareBroadFangSemanticAnnotationProtocolFR138V1,
): void {
  if (!ISSUED.has(value)) fail('protocol artifact was not issued by the active FR-138 materializer.');
}

export function createSquareBroadFangBlindedAnnotationPacketFR138(
  input: CreateSquareBroadFangBlindedAnnotationPacketFR138Input,
): SquareBroadFangBlindedAnnotationPacketFR138V1 {
  materializeSquareBroadFangSemanticAnnotationProtocolFR138();
  for (const key of Object.keys(input)) {
    if (!ALLOWED_PACKET_INPUT_KEYS.has(key)) fail(`packet input contains forbidden or ungoverned field: ${key}.`);
  }
  if (Object.keys(input).length !== ALLOWED_PACKET_INPUT_KEYS.size) fail('packet input must contain exactly the four opaque provenance refs.');
  requireNonEmptyRef('packetRef', input.packetRef);
  requireNonEmptyRef('researchSubjectRef', input.researchSubjectRef);
  requireNonEmptyRef('captureSeriesRef', input.captureSeriesRef);
  requireNonEmptyRef('captureRef', input.captureRef);

  return Object.freeze({
    schemaVersion: 'fr138-square-broad-fang-blinded-annotation-packet-v1' as const,
    packetRef: input.packetRef,
    researchSubjectRef: input.researchSubjectRef,
    captureSeriesRef: input.captureSeriesRef,
    captureRef: input.captureRef,
    criterionRef: CRITERION_REF,
    activeConstructScope: ACTIVE_CONSTRUCT_SCOPE,
    sourcePassageRef: SOURCE_PASSAGE_REF,
    methodologyRef: METHODOLOGY_REF,
    protocolRef: PROTOCOL_REF,
    labelSchemaRef: LABEL_SCHEMA_REF,
    hiddenFields: Object.freeze([
      'fr134_candidate_metric_values',
      'candidate_thresholds',
      'peer_labels',
      'model_or_provider_results',
      'automated_traditional_interpretation',
    ] as const),
  });
}

export function requireSquareBroadFangHumanSemanticCollectionAuthorizationFR138(): never {
  materializeSquareBroadFangSemanticAnnotationProtocolFR138();
  return fail('human semantic collection is not authorized; target-specific methodology and reviewer governance decisions remain unresolved.');
}
