import {
  FR135_NEXT_FRONTIER,
  getSquareBroadConstructValidityAcquisitionContractFR135,
} from './five-officers-square-broad-construct-validity-dataset-acquisition-fr135.js';
import {
  assessFiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132,
  assertIssuedFiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132,
} from './five-officers-intake-criterion-semantic-operationalization-research-fr132.js';
import { INDEPENDENT_FACE_GROUND_TRUTH_AUTHORITY_FRDATA07 } from './independent-face-ground-truth-frdata07.js';
import { INDEPENDENT_FACE_ANNOTATION_PACKET_AUTHORITY_FRDATA07C } from './independent-face-annotation-packet-frdata07c.js';
import { INDEPENDENT_FACE_ADJUDICATION_AUTHORITY_FRDATA10 } from './independent-face-adjudication-frdata10.js';
import { HUMAN_FACE_CONSTRUCT_REFERENCE_ADMISSION_AUTHORITY_FRDATA14 } from './human-face-construct-reference-admission-frdata14.js';
import { EXTERNAL_HUMAN_REFERENCE_REVIEW_ATTESTATION_AUTHORITY_FRDATA15 } from './external-human-reference-review-attestation-frdata15.js';
import {
  assertIssuedLipsSubstantialRoleFreeSeparationConstructValidityRequirementsReviewFR100,
  reviewLipsSubstantialRoleFreeSeparationConstructValidityRequirementsFR100,
} from './lips-substantial-role-free-separation-construct-validity-requirements-review-fr100.js';
import {
  assertIssuedLipsSubstantialRoleFreeSeparationConstructValidityProtocolReviewFR101,
  reviewLipsSubstantialRoleFreeSeparationConstructValidityProtocolFR101,
} from './lips-substantial-role-free-separation-construct-validity-protocol-review-fr101.js';
import {
  assertIssuedLipsSubstantialConstructValidityCollectionAuthorizationGateReviewFR102,
  reviewLipsSubstantialConstructValidityCollectionAuthorizationGatesFR102,
} from './lips-substantial-construct-validity-collection-authorization-gate-review-fr102.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR136_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr136-square-broad-independent-semantic-annotation-authority-reuse-review.md' as const;
export const FR136_NEXT_FRONTIER =
  'square_broad_criterion_specific_independent_annotation_authority_and_protocol_definition_review_without_empirical_collection' as const;

export interface SquareBroadIndependentSemanticAnnotationAuthorityReuseReviewFR136V1 {
  readonly schemaVersion: 'fr136-square-broad-independent-semantic-annotation-authority-reuse-review-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'square_broad_semantic_annotation_authority_reuse_review_completed_no_reusable_criterion_specific_authority_or_protocol';
  readonly target: {
    readonly criterionRef: 'criterion.intake.square_broad';
    readonly sourceConcept: '方大';
    readonly activeConstructScope: 'fang_shape_candidate_features_only';
  };
  readonly predecessor: {
    readonly fr135NextFrontier: typeof FR135_NEXT_FRONTIER;
    readonly independentSemanticAnnotationRequired: true;
    readonly annotationEvidenceMustBeIndependentOfCandidateMetricValues: true;
    readonly annotationAuthorityRef: null;
    readonly annotationProtocolRef: null;
    readonly labelSchemaRef: null;
    readonly reviewerCount: null;
    readonly quorum: null;
    readonly consensusThreshold: null;
    readonly traditionalSemanticAuthority: false;
  };
  readonly currentSourceAndMethodologyAuthority: {
    readonly passageRef: 'passage.shenxiang.five_officers.intake.nlc_1925';
    readonly passageVerificationStatus: 'scan_checked';
    readonly methodologyRef: 'method.shenxiang.five_officers.intake_criteria@0.2.0';
    readonly methodologyReviewStatus: 'research';
    readonly targetSpecificApprovalDeferred: true;
    readonly methodologyReviewDecisionRecordsIssued: 0;
    readonly traditionalSemanticAuthority: false;
  };
  readonly reviewedPrecedents: readonly [
    {
      readonly authorityRef: 'authority.face.independent_face_ground_truth_protocol.frdata07';
      readonly targetConstruct: 'categorical_human_face_count_state';
      readonly reusablePattern: 'provider_blind_independent_human_annotation';
      readonly patternReuseCandidate: true;
      readonly squareBroadSemanticAuthorityReusable: false;
      readonly squareBroadLabelVocabularyReusable: false;
    },
    {
      readonly authorityRef: 'authority.face.independent_face_annotation_packet.frdata07c';
      readonly targetConstruct: 'categorical_human_face_count_state';
      readonly reusablePattern: 'opaque_provider_blind_annotation_packet';
      readonly patternReuseCandidate: true;
      readonly squareBroadSemanticAuthorityReusable: false;
      readonly squareBroadLabelVocabularyReusable: false;
    },
    {
      readonly authorityRef: 'authority.face.independent_face_count_adjudication.frdata10';
      readonly targetConstruct: 'categorical_human_face_count_state';
      readonly reusablePattern: 'independent_provider_blind_human_adjudication';
      readonly patternReuseCandidate: true;
      readonly squareBroadSemanticAuthorityReusable: false;
      readonly squareBroadLabelVocabularyReusable: false;
    },
    {
      readonly authorityRef: 'authority.face.human_construct_reference_candidate_admission.frdata14';
      readonly targetConstruct: 'categorical_human_face_count_state';
      readonly reusablePattern: 'construct_specific_reference_candidate_admission';
      readonly patternReuseCandidate: true;
      readonly squareBroadSemanticAuthorityReusable: false;
      readonly squareBroadLabelVocabularyReusable: false;
    },
    {
      readonly authorityRef: 'authority.face.external_human_reference_review_attestation.frdata15';
      readonly targetConstruct: 'categorical_human_face_count_state';
      readonly reusablePattern: 'external_review_package_and_attestation_binding';
      readonly patternReuseCandidate: true;
      readonly squareBroadSemanticAuthorityReusable: false;
      readonly squareBroadLabelVocabularyReusable: false;
    },
    {
      readonly authorityRef: 'fr100-fr102-lips-substantial-construct-validity-chain';
      readonly targetConstruct: 'criterion.intake.lips_substantial';
      readonly reusablePattern: 'criterion_specific_blinded_construct_validity_research_design';
      readonly patternReuseCandidate: true;
      readonly squareBroadSemanticAuthorityReusable: false;
      readonly squareBroadLabelVocabularyReusable: false;
    },
  ];
  readonly precedentSpecificNonTransferableParameters: {
    readonly sourcePrecedent: 'fr101-lips-substantial-role-free-separation-construct-validity-protocol-review-v1';
    readonly sourceCriterionRef: 'criterion.intake.lips_substantial';
    readonly reviewersPerItemObservedInPrecedent: 3;
    readonly minAgreementFractionObservedInPrecedent: number;
    readonly minNonAbstainLabelsObservedInPrecedent: 2;
    readonly parametersTransferAuthorized: false;
    readonly parameterValuesAppliedToSquareBroad: false;
  };
  readonly reuseDecision: {
    readonly reusableIndependentSemanticAnnotationAuthorityFound: false;
    readonly reusableCriterionSpecificAnnotationProtocolFound: false;
    readonly reusableLabelSchemaFound: false;
    readonly reusableReviewerPolicyFound: false;
    readonly reusableConsensusPolicyFound: false;
    readonly reason: 'available_human_annotation_authorities_are_construct_specific_and_none_authorizes_square_broad_traditional_semantics';
  };
  readonly unresolvedAnnotationAuthority: {
    readonly annotationAuthorityRef: null;
    readonly annotationProtocolRef: null;
    readonly labelSchemaRef: null;
    readonly reviewerCount: null;
    readonly quorum: null;
    readonly consensusThreshold: null;
    readonly adjudicationRuleRef: null;
    readonly reviewerQualificationRef: null;
  };
  readonly collectionGate: {
    readonly criterionSpecificSourceGroundedInstructionsRequired: true;
    readonly independentInitialSemanticLabelsRequired: true;
    readonly metricValuesHiddenDuringSemanticAnnotationRequired: true;
    readonly candidateThresholdHiddenDuringSemanticAnnotationRequired: true;
    readonly peerLabelsHiddenDuringInitialAnnotationRequired: true;
    readonly abstentionOrUnableToConcludePathRequired: true;
    readonly reviewerActorGovernanceRequired: true;
    readonly targetSpecificMethodologyDecisionRequired: true;
    readonly humanSemanticCollectionAuthorized: false;
    readonly empiricalSemanticEvidenceAcquisitionAuthorized: false;
  };
  readonly authorityBoundary: {
    readonly genericBlindingMechanicsMeanSquareBroadSemanticAuthority: false;
    readonly faceCountHumanLabelAuthorityMeansSquareBroadSemanticAuthority: false;
    readonly faceCountAdjudicationAuthorityMeansSquareBroadAdjudicationAuthority: false;
    readonly fr101ResearchDesignParametersTransferToSquareBroad: false;
    readonly scanCheckedSourceMeansMethodologyReviewed: false;
    readonly projectOwnerGovernanceMeansAnnotationAuthority: false;
    readonly sourceConceptPresenceMeansConstructValidityLabelAuthority: false;
    readonly annotationRequirementsMeanProtocolMaterialized: false;
    readonly protocolDesignMeansCollectionAuthority: false;
    readonly humanLabelsMeanTraditionalMetricBinding: false;
    readonly humanLabelsMeanCalibrationThreshold: false;
    readonly constructValidityEvidenceMeansCriterionState: false;
  };
  readonly execution: {
    readonly annotationAuthoritiesIssued: 0;
    readonly annotationProtocolsIssued: 0;
    readonly labelSchemasIssued: 0;
    readonly empiricalSemanticLabelsIssued: 0;
    readonly traditionalMetricBindingsIssued: 0;
    readonly calibrationProtocolsIssued: 0;
    readonly thresholdsIssued: 0;
    readonly criterionStatesIssued: 0;
    readonly structuredClaimsIssued: 0;
    readonly boundedNarrativesIssued: 0;
    readonly traditionalSemanticAuthority: false;
  };
  readonly researchNoteRef: typeof FR136_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR136_NEXT_FRONTIER;
}

const ISSUED = new WeakSet<object>();
let CACHED: SquareBroadIndependentSemanticAnnotationAuthorityReuseReviewFR136V1 | null = null;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-136 ${message}`);
}

function validatePredecessor(): void {
  const fr135 = getSquareBroadConstructValidityAcquisitionContractFR135();
  if (
    fr135.nextFrontier !== FR135_NEXT_FRONTIER ||
    fr135.annotationGovernance.independentSemanticAnnotationRequired !== true ||
    fr135.annotationGovernance.annotationEvidenceMustBeIndependentOfCandidateMetricValues !== true ||
    fr135.annotationGovernance.annotationAuthorityRef !== null ||
    fr135.annotationGovernance.annotationProtocolRef !== null ||
    fr135.annotationGovernance.labelSchemaRef !== null ||
    fr135.annotationGovernance.reviewerCount !== null ||
    fr135.annotationGovernance.quorum !== null ||
    fr135.annotationGovernance.consensusThreshold !== null ||
    fr135.execution.traditionalSemanticAuthority !== false
  ) fail('FR-135 annotation-authority frontier drift.');
}

function validateCurrentSourceAndMethodology(): ReturnType<
  typeof assessFiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132
> {
  const fr132 = assessFiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132();
  assertIssuedFiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132(fr132);
  const squareBroad = fr132.criterionResearch.find(
    (record) => record.criterionId === 'criterion.intake.square_broad',
  );
  if (
    fr132.governedSource.passageRef !== 'passage.shenxiang.five_officers.intake.nlc_1925' ||
    fr132.governedSource.verificationStatus !== 'scan_checked' ||
    fr132.governedSource.methodologyRef !== 'method.shenxiang.five_officers.intake_criteria@0.2.0' ||
    fr132.governedSource.methodologyReviewStatus !== 'research' ||
    fr132.promotionStatus.targetSpecificApprovalExplicitlyDeferred !== true ||
    fr132.promotionStatus.methodologyReviewDecisionRecordsIssued !== 0 ||
    fr132.execution.traditionalSemanticAuthority !== false ||
    squareBroad === undefined ||
    squareBroad.sourceConcept !== '方大' ||
    squareBroad.constructValidityStatus !== 'not_established' ||
    squareBroad.traditionalMetricBindingAuthorized !== false ||
    squareBroad.calibrationAuthorized !== false ||
    squareBroad.thresholdAuthorized !== false
  ) fail('current FR-132 source/methodology or square-broad semantic boundary drift.');
  return fr132;
}

function validateIndependentHumanAnnotationPrecedents(): void {
  if (
    INDEPENDENT_FACE_GROUND_TRUTH_AUTHORITY_FRDATA07.authorityRef !==
      'authority.face.independent_face_ground_truth_protocol.frdata07' ||
    INDEPENDENT_FACE_GROUND_TRUTH_AUTHORITY_FRDATA07.authorityState !==
      'protocol_defined_no_reviewed_validation_dataset' ||
    INDEPENDENT_FACE_GROUND_TRUTH_AUTHORITY_FRDATA07.authorityBoundary
      .traditionalSemanticAuthorityValidated !== false ||
    INDEPENDENT_FACE_GROUND_TRUTH_AUTHORITY_FRDATA07.protocol.minimumIndependentAnnotatorsPerCapture !== null ||
    INDEPENDENT_FACE_GROUND_TRUTH_AUTHORITY_FRDATA07.protocol.interAnnotatorAgreementThreshold !== null
  ) fail('FR-DATA-07 authority boundary drift.');

  if (
    INDEPENDENT_FACE_ANNOTATION_PACKET_AUTHORITY_FRDATA07C.authorityRef !==
      'authority.face.independent_face_annotation_packet.frdata07c' ||
    INDEPENDENT_FACE_ANNOTATION_PACKET_AUTHORITY_FRDATA07C.downstreamHumanAnnotationSchemaRef !==
      'fr-data07-independent-face-ground-truth-v1' ||
    INDEPENDENT_FACE_ANNOTATION_PACKET_AUTHORITY_FRDATA07C.protocol.minimumIndependentAnnotatorsPerCapture !== null ||
    INDEPENDENT_FACE_ANNOTATION_PACKET_AUTHORITY_FRDATA07C.protocol.humanAnnotationAcceptanceCriterion !== null
  ) fail('FR-DATA-07C annotation packet boundary drift.');

  if (
    INDEPENDENT_FACE_ADJUDICATION_AUTHORITY_FRDATA10.authorityRef !==
      'authority.face.independent_face_count_adjudication.frdata10' ||
    INDEPENDENT_FACE_ADJUDICATION_AUTHORITY_FRDATA10.authorityBoundary
      .traditionalSemanticAuthorityValidated !== false ||
    INDEPENDENT_FACE_ADJUDICATION_AUTHORITY_FRDATA10.protocol.minimumIndependentAnnotatorsPerCapture !== null ||
    INDEPENDENT_FACE_ADJUDICATION_AUTHORITY_FRDATA10.protocol.minimumAdjudicatorsPerCapture !== null ||
    INDEPENDENT_FACE_ADJUDICATION_AUTHORITY_FRDATA10.protocol.interAnnotatorAgreementThreshold !== null ||
    INDEPENDENT_FACE_ADJUDICATION_AUTHORITY_FRDATA10.protocol.adjudicationDecisionThreshold !== null
  ) fail('FR-DATA-10 adjudication authority boundary drift.');

  if (
    HUMAN_FACE_CONSTRUCT_REFERENCE_ADMISSION_AUTHORITY_FRDATA14.definition.targetConstruct !==
      'categorical_human_face_count_state' ||
    HUMAN_FACE_CONSTRUCT_REFERENCE_ADMISSION_AUTHORITY_FRDATA14.authorityBoundary
      .traditionalSemanticAuthorityValidated !== false ||
    HUMAN_FACE_CONSTRUCT_REFERENCE_ADMISSION_AUTHORITY_FRDATA14.protocol.minimumIndependentAnnotators !== null ||
    HUMAN_FACE_CONSTRUCT_REFERENCE_ADMISSION_AUTHORITY_FRDATA14.protocol.interAnnotatorAgreementThreshold !== null
  ) fail('FR-DATA-14 construct-reference boundary drift.');

  if (
    EXTERNAL_HUMAN_REFERENCE_REVIEW_ATTESTATION_AUTHORITY_FRDATA15.authorityState !==
      'external_review_attestation_contract_defined_no_authenticated_external_review' ||
    EXTERNAL_HUMAN_REFERENCE_REVIEW_ATTESTATION_AUTHORITY_FRDATA15.authorityBoundary
      .traditionalSemanticAuthorityValidated !== false ||
    EXTERNAL_HUMAN_REFERENCE_REVIEW_ATTESTATION_AUTHORITY_FRDATA15.protocol.minimumExternalReviewers !== null ||
    EXTERNAL_HUMAN_REFERENCE_REVIEW_ATTESTATION_AUTHORITY_FRDATA15.protocol.externalReviewAcceptanceThreshold !== null
  ) fail('FR-DATA-15 external review authority boundary drift.');
}

function validateCriterionSpecificConstructValidityPrecedent(): {
  reviewersPerItem: 3;
  minAgreementFraction: number;
  minNonAbstainLabels: 2;
} {
  const fr100 = reviewLipsSubstantialRoleFreeSeparationConstructValidityRequirementsFR100();
  assertIssuedLipsSubstantialRoleFreeSeparationConstructValidityRequirementsReviewFR100(fr100);
  const fr101 = reviewLipsSubstantialRoleFreeSeparationConstructValidityProtocolFR101();
  assertIssuedLipsSubstantialRoleFreeSeparationConstructValidityProtocolReviewFR101(fr101);
  const fr102 = reviewLipsSubstantialConstructValidityCollectionAuthorizationGatesFR102();
  assertIssuedLipsSubstantialConstructValidityCollectionAuthorizationGateReviewFR102(fr102);
  const labeling = fr101.issuedProtocolRegistry.labelingProtocols[0];
  if (
    fr100.targetConstruct.criterionId !== 'criterion.intake.lips_substantial' ||
    fr100.targetConstruct.sourceConcept !== '端厚' ||
    fr100.traditionalSemanticAuthority !== false ||
    labeling === undefined ||
    labeling.criterionId !== 'criterion.intake.lips_substantial' ||
    labeling.reviewerPlan.reviewersPerItem !== 3 ||
    labeling.reviewerPlan.agreementRule.minAgreementFraction !== 2 / 3 ||
    labeling.reviewerPlan.agreementRule.minNonAbstainLabels !== 2 ||
    fr101.humanDataCollectionAuthorized !== false ||
    fr101.traditionalSemanticAuthority !== false ||
    fr102.humanDataCollectionAuthorized !== false ||
    fr102.traditionalSemanticAuthority !== false
  ) fail('FR-100/101/102 construct-validity precedent boundary drift.');
  return {
    reviewersPerItem: 3,
    minAgreementFraction: 2 / 3,
    minNonAbstainLabels: 2,
  };
}

export function reviewSquareBroadIndependentSemanticAnnotationAuthorityReuseFR136(): SquareBroadIndependentSemanticAnnotationAuthorityReuseReviewFR136V1 {
  if (CACHED !== null) return CACHED;
  validatePredecessor();
  const fr132 = validateCurrentSourceAndMethodology();
  validateIndependentHumanAnnotationPrecedents();
  const precedentParameters = validateCriterionSpecificConstructValidityPrecedent();

  const result: SquareBroadIndependentSemanticAnnotationAuthorityReuseReviewFR136V1 = Object.freeze({
    schemaVersion: 'fr136-square-broad-independent-semantic-annotation-authority-reuse-review-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState:
      'square_broad_semantic_annotation_authority_reuse_review_completed_no_reusable_criterion_specific_authority_or_protocol' as const,
    target: Object.freeze({
      criterionRef: 'criterion.intake.square_broad' as const,
      sourceConcept: '方大' as const,
      activeConstructScope: 'fang_shape_candidate_features_only' as const,
    }),
    predecessor: Object.freeze({
      fr135NextFrontier: FR135_NEXT_FRONTIER,
      independentSemanticAnnotationRequired: true as const,
      annotationEvidenceMustBeIndependentOfCandidateMetricValues: true as const,
      annotationAuthorityRef: null,
      annotationProtocolRef: null,
      labelSchemaRef: null,
      reviewerCount: null,
      quorum: null,
      consensusThreshold: null,
      traditionalSemanticAuthority: false as const,
    }),
    currentSourceAndMethodologyAuthority: Object.freeze({
      passageRef: 'passage.shenxiang.five_officers.intake.nlc_1925' as const,
      passageVerificationStatus: fr132.governedSource.verificationStatus,
      methodologyRef: 'method.shenxiang.five_officers.intake_criteria@0.2.0' as const,
      methodologyReviewStatus: fr132.governedSource.methodologyReviewStatus,
      targetSpecificApprovalDeferred: true as const,
      methodologyReviewDecisionRecordsIssued: 0 as const,
      traditionalSemanticAuthority: false as const,
    }),
    reviewedPrecedents: Object.freeze([
      Object.freeze({
        authorityRef: 'authority.face.independent_face_ground_truth_protocol.frdata07' as const,
        targetConstruct: 'categorical_human_face_count_state' as const,
        reusablePattern: 'provider_blind_independent_human_annotation' as const,
        patternReuseCandidate: true as const,
        squareBroadSemanticAuthorityReusable: false as const,
        squareBroadLabelVocabularyReusable: false as const,
      }),
      Object.freeze({
        authorityRef: 'authority.face.independent_face_annotation_packet.frdata07c' as const,
        targetConstruct: 'categorical_human_face_count_state' as const,
        reusablePattern: 'opaque_provider_blind_annotation_packet' as const,
        patternReuseCandidate: true as const,
        squareBroadSemanticAuthorityReusable: false as const,
        squareBroadLabelVocabularyReusable: false as const,
      }),
      Object.freeze({
        authorityRef: 'authority.face.independent_face_count_adjudication.frdata10' as const,
        targetConstruct: 'categorical_human_face_count_state' as const,
        reusablePattern: 'independent_provider_blind_human_adjudication' as const,
        patternReuseCandidate: true as const,
        squareBroadSemanticAuthorityReusable: false as const,
        squareBroadLabelVocabularyReusable: false as const,
      }),
      Object.freeze({
        authorityRef: 'authority.face.human_construct_reference_candidate_admission.frdata14' as const,
        targetConstruct: 'categorical_human_face_count_state' as const,
        reusablePattern: 'construct_specific_reference_candidate_admission' as const,
        patternReuseCandidate: true as const,
        squareBroadSemanticAuthorityReusable: false as const,
        squareBroadLabelVocabularyReusable: false as const,
      }),
      Object.freeze({
        authorityRef: 'authority.face.external_human_reference_review_attestation.frdata15' as const,
        targetConstruct: 'categorical_human_face_count_state' as const,
        reusablePattern: 'external_review_package_and_attestation_binding' as const,
        patternReuseCandidate: true as const,
        squareBroadSemanticAuthorityReusable: false as const,
        squareBroadLabelVocabularyReusable: false as const,
      }),
      Object.freeze({
        authorityRef: 'fr100-fr102-lips-substantial-construct-validity-chain' as const,
        targetConstruct: 'criterion.intake.lips_substantial' as const,
        reusablePattern: 'criterion_specific_blinded_construct_validity_research_design' as const,
        patternReuseCandidate: true as const,
        squareBroadSemanticAuthorityReusable: false as const,
        squareBroadLabelVocabularyReusable: false as const,
      }),
    ] as const),
    precedentSpecificNonTransferableParameters: Object.freeze({
      sourcePrecedent: 'fr101-lips-substantial-role-free-separation-construct-validity-protocol-review-v1' as const,
      sourceCriterionRef: 'criterion.intake.lips_substantial' as const,
      reviewersPerItemObservedInPrecedent: precedentParameters.reviewersPerItem,
      minAgreementFractionObservedInPrecedent: precedentParameters.minAgreementFraction,
      minNonAbstainLabelsObservedInPrecedent: precedentParameters.minNonAbstainLabels,
      parametersTransferAuthorized: false as const,
      parameterValuesAppliedToSquareBroad: false as const,
    }),
    reuseDecision: Object.freeze({
      reusableIndependentSemanticAnnotationAuthorityFound: false as const,
      reusableCriterionSpecificAnnotationProtocolFound: false as const,
      reusableLabelSchemaFound: false as const,
      reusableReviewerPolicyFound: false as const,
      reusableConsensusPolicyFound: false as const,
      reason:
        'available_human_annotation_authorities_are_construct_specific_and_none_authorizes_square_broad_traditional_semantics' as const,
    }),
    unresolvedAnnotationAuthority: Object.freeze({
      annotationAuthorityRef: null,
      annotationProtocolRef: null,
      labelSchemaRef: null,
      reviewerCount: null,
      quorum: null,
      consensusThreshold: null,
      adjudicationRuleRef: null,
      reviewerQualificationRef: null,
    }),
    collectionGate: Object.freeze({
      criterionSpecificSourceGroundedInstructionsRequired: true as const,
      independentInitialSemanticLabelsRequired: true as const,
      metricValuesHiddenDuringSemanticAnnotationRequired: true as const,
      candidateThresholdHiddenDuringSemanticAnnotationRequired: true as const,
      peerLabelsHiddenDuringInitialAnnotationRequired: true as const,
      abstentionOrUnableToConcludePathRequired: true as const,
      reviewerActorGovernanceRequired: true as const,
      targetSpecificMethodologyDecisionRequired: true as const,
      humanSemanticCollectionAuthorized: false as const,
      empiricalSemanticEvidenceAcquisitionAuthorized: false as const,
    }),
    authorityBoundary: Object.freeze({
      genericBlindingMechanicsMeanSquareBroadSemanticAuthority: false as const,
      faceCountHumanLabelAuthorityMeansSquareBroadSemanticAuthority: false as const,
      faceCountAdjudicationAuthorityMeansSquareBroadAdjudicationAuthority: false as const,
      fr101ResearchDesignParametersTransferToSquareBroad: false as const,
      scanCheckedSourceMeansMethodologyReviewed: false as const,
      projectOwnerGovernanceMeansAnnotationAuthority: false as const,
      sourceConceptPresenceMeansConstructValidityLabelAuthority: false as const,
      annotationRequirementsMeanProtocolMaterialized: false as const,
      protocolDesignMeansCollectionAuthority: false as const,
      humanLabelsMeanTraditionalMetricBinding: false as const,
      humanLabelsMeanCalibrationThreshold: false as const,
      constructValidityEvidenceMeansCriterionState: false as const,
    }),
    execution: Object.freeze({
      annotationAuthoritiesIssued: 0 as const,
      annotationProtocolsIssued: 0 as const,
      labelSchemasIssued: 0 as const,
      empiricalSemanticLabelsIssued: 0 as const,
      traditionalMetricBindingsIssued: 0 as const,
      calibrationProtocolsIssued: 0 as const,
      thresholdsIssued: 0 as const,
      criterionStatesIssued: 0 as const,
      structuredClaimsIssued: 0 as const,
      boundedNarrativesIssued: 0 as const,
      traditionalSemanticAuthority: false as const,
    }),
    researchNoteRef: FR136_RESEARCH_NOTE_REF,
    nextFrontier: FR136_NEXT_FRONTIER,
  });
  CACHED = result;
  ISSUED.add(result);
  return result;
}

export function assertIssuedSquareBroadIndependentSemanticAnnotationAuthorityReuseReviewFR136(
  value: SquareBroadIndependentSemanticAnnotationAuthorityReuseReviewFR136V1,
): void {
  if (!ISSUED.has(value)) fail('reuse review was not issued by the active FR-136 boundary.');
  if (
    value.reuseDecision.reusableIndependentSemanticAnnotationAuthorityFound !== false ||
    value.reuseDecision.reusableCriterionSpecificAnnotationProtocolFound !== false ||
    value.unresolvedAnnotationAuthority.annotationAuthorityRef !== null ||
    value.unresolvedAnnotationAuthority.annotationProtocolRef !== null ||
    value.unresolvedAnnotationAuthority.labelSchemaRef !== null ||
    value.collectionGate.humanSemanticCollectionAuthorized !== false ||
    value.execution.traditionalMetricBindingsIssued !== 0 ||
    value.execution.thresholdsIssued !== 0 ||
    value.execution.criterionStatesIssued !== 0 ||
    value.execution.traditionalSemanticAuthority !== false
  ) fail('issued reuse-review authority boundary drift.');
}
