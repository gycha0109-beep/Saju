import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_METHOD_BOUNDARY_REASSESSMENT_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT_REVIEW_VERSION,
  type RelationshipSpouseT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReviewReport,
} from './relationship-spouse-t8-current-t5-t6-semantic-bridge-residual-discovery-evidence-adequacy-method-boundary-reassessment-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_POST_PRIMARY_WITNESS_AUTHORITY_REASSESSMENT_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_POST_PRIMARY_WITNESS_AUTHORITY_REASSESSMENT_REVIEW_VERSION,
  type RelationshipSpouseT8PostPrimaryWitnessAuthorityReassessmentReviewReport,
} from './relationship-spouse-t8-post-primary-witness-authority-reassessment-review.js';

export const RELATIONSHIP_SPOUSE_T8_T6_INPUT_FEASIBILITY_REASSESSMENT_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-t6-input-feasibility-reassessment-review-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_T6_INPUT_FEASIBILITY_REASSESSMENT_CONTROL_IDS =
  Object.freeze([
    'T6_FEASIBILITY_REASSESSMENT_ACCEPTS_ONLY_THE_EXACT_CONTENT_ADDRESSED_POST_PRIMARY_WITNESS_AUTHORITY_SNAPSHOT',
    'T6_FEASIBILITY_REASSESSMENT_ACCEPTS_ONLY_THE_EXACT_CONTENT_ADDRESSED_T5_T6_RESIDUAL_METHOD_BOUNDARY',
    'POST_PRIMARY_WITNESS_REASSESSMENT_IS_THE_CURRENT_FIVE_GAP_AUTHORITY_SNAPSHOT',
    'OLDER_T5_T6_RESIDUAL_ALL_FIVE_OPEN_SNAPSHOT_IS_USED_ONLY_FOR_T6_FEASIBILITY_NOT_CURRENT_AGGREGATE_GAP_COUNT',
    'CURRENT_RELATIONSHIP_T6_DIRECT_INPUT_PATH_REMAINS_NOT_ESTABLISHED',
    'RESIDUAL_METHOD_BOUNDARY_DOES_NOT_AUTHORIZE_RELATIONSHIP_T6_PATH_CREATION',
    'A_GENERIC_NEUTRAL_OBJECT_WITHOUT_GOVERNED_T6_LINEAGE_DOES_NOT_CLOSE_RELATIONSHIP_T6_INPUT',
    'LOST_T5_DISTINCTIONS_ARE_NOT_RECONSTRUCTED_DOWNSTREAM_TO_SYNTHESIZE_T6',
    'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_AN_INDEPENDENT_OPEN_GAP',
    'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
    'EXACTLY_ONE_OF_FIVE_AUTHORITY_GAPS_REMAINS_CLOSED',
    'THIS_REASSESSMENT_CLOSES_ZERO_ADDITIONAL_AUTHORITY_GAPS',
    'NO_CROSS_SOURCE_CROSS_FRONTIER_OR_CROSS_TASK_STITCHING_TO_SYNTHESIZE_MISSING_T6_AUTHORITY',
    'NO_RELATIONSHIP_T6_RUNTIME_OBJECT_PATH_TASK_OR_PRODUCER_CREATED_BY_THIS_REASSESSMENT',
    'NO_SPOUSE_T8_RULE_CLAIM_PACK_NARRATIVE_COMPATIBILITY_PREVIEW_OR_PRODUCTION_EFFECT',
    'AUTHORITY_ADMISSION_REMAINS_NOT_READY',
  ] as const);

export type RelationshipSpouseT8T6InputFeasibilityAuthorityGapStatus = Readonly<{
  QUALIFYING_PRIMARY_WITNESS: 'CLOSED' | 'OPEN';
  INDEPENDENT_NORMATIVE_PROVENANCE: 'OPEN';
  EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING: 'OPEN';
  CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE: 'OPEN';
  RELATIONSHIP_T6_INPUT: 'OPEN';
}>;

export interface RelationshipSpouseT8T6InputFeasibilityReassessmentReviewReport {
  reviewId: string;
  reviewVersion: typeof RELATIONSHIP_SPOUSE_T8_T6_INPUT_FEASIBILITY_REASSESSMENT_REVIEW_VERSION;
  status:
    | 'RESOLVED_RELATIONSHIP_SPOUSE_T8_T6_INPUT_FEASIBILITY_REASSESSMENT_REVIEW'
    | 'UPSTREAM_POST_PRIMARY_WITNESS_AUTHORITY_SNAPSHOT_INVALID'
    | 'UPSTREAM_T5_T6_RESIDUAL_METHOD_BOUNDARY_INVALID';
  decision:
    | 'RELATIONSHIP_T6_INPUT_REMAINS_OPEN_AUTHORITY_REQUIRED_BEFORE_DIRECT_T6_PATH_CREATION_EXACTLY_ONE_OF_FIVE_GAPS_CLOSED'
    | 'RELATIONSHIP_T6_INPUT_FEASIBILITY_REASSESSMENT_NOT_ESTABLISHED';
  upstreamPostPrimaryWitnessReviewId: string;
  upstreamT5T6ResidualMethodBoundaryReviewId: string;
  exactUpstreamPostPrimaryWitnessBoundaryAccepted: boolean;
  exactUpstreamT5T6ResidualMethodBoundaryAccepted: boolean;
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  currentFiveGapAuthoritySnapshotSource: 'POST_PRIMARY_WITNESS_AUTHORITY_REASSESSMENT';
  t6FeasibilityBoundarySource: 'T5_T6_RESIDUAL_METHOD_BOUNDARY_REASSESSMENT';
  olderResidualAggregateGapSnapshotReusedAsCurrentAuthority: false;
  residualBoundaryUsedOnlyForT6Feasibility: boolean;
  qualifyingPrimaryWitnessEstablished: boolean;
  authorityGapStatus: RelationshipSpouseT8T6InputFeasibilityAuthorityGapStatus;
  independentNormativeProvenanceForCurrentSpouseMethodEstablished: false;
  explicitRoleNeutralSpouseNatalMappingEstablished: false;
  currentGovernedMethodSemanticCorrespondenceEstablished: false;
  currentRelationshipT6InputPathEstablished: false;
  relationshipT6PathCreationAuthorizedByCurrentEvidence: false;
  genericNeutralObjectWithoutGovernedT6LineageQualifiesAsT6Authority: false;
  lostT5DistinctionsReconstructedDownstreamByThisReview: false;
  crossSourceStitchingAuthorized: false;
  crossFrontierStitchingAuthorized: false;
  crossTaskStitchingAuthorized: false;
  authorityGapClosedByThisReview: false;
  authorityGapsClosedCount: 1 | 0;
  authorityGapsOpenCount: 4 | 5;
  authorityAdmissionReady: false;
  semanticProducerImplementationAuthorized: false;
  historicalGenderRoleUniversalizationAuthorized: false;
  userOrPartnerSexInferenceAuthorized: false;
  partnerSexualOrientationInferenceAuthorized: false;
  spouseT8RuleAuthoringAuthorized: false;
  spouseT8ClaimTypeCreationAuthorized: false;
  spouseInterpretationPackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  compatibilityAuthorityAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_T6_INPUT_FEASIBILITY_REASSESSMENT_CONTROL_IDS)[number][];
  controlCount: 16 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    feasibilityReassessmentsPerformed: 1 | 0;
    authorityGapsClosedByThisReview: 0;
    totalAuthorityGapsClosedAfterReview: 1 | 0;
    relationshipT6RuntimeObjectsCreated: 0;
    relationshipT6InputPathsCreated: 0;
    relationshipT6ExecutionTasksCreated: 0;
    t5DerivedSemanticReconstructionsCreated: 0;
    methodologyChoicesMade: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
    productionRoutesChanged: 0;
  };
  recommendedNextAction:
    | 'ACQUIRE_AUTHORIZED_DIRECT_RELATIONSHIP_T6_INPUT_CONTRACT_OR_GOVERNED_T6_SOURCE_LINEAGE_WITHOUT_RECONSTRUCTING_T5_INFORMATION_LOSS'
    | 'REESTABLISH_EXACT_T6_FEASIBILITY_UPSTREAM_BOUNDARIES';
}

function contentAddressedPostPrimaryWitnessIdentityValid(
  review: RelationshipSpouseT8PostPrimaryWitnessAuthorityReassessmentReviewReport,
): boolean {
  const { reviewId, ...material } = review;
  return (
    reviewId ===
    `relationship_spouse_t8_post_primary_witness_authority_reassessment_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactPostPrimaryWitnessBoundaryAccepted(
  review: RelationshipSpouseT8PostPrimaryWitnessAuthorityReassessmentReviewReport,
): boolean {
  return (
    contentAddressedPostPrimaryWitnessIdentityValid(review) &&
    review.reviewVersion ===
      RELATIONSHIP_SPOUSE_T8_POST_PRIMARY_WITNESS_AUTHORITY_REASSESSMENT_REVIEW_VERSION &&
    review.status ===
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_POST_PRIMARY_WITNESS_AUTHORITY_REASSESSMENT_REVIEW' &&
    review.decision ===
      'QUALIFYING_PRIMARY_WITNESS_REMAINS_CLOSED_MODERN_EDITORIAL_CANDIDATE_REMAINS_INADEQUATE_EXACTLY_ONE_OF_FIVE_GAPS_CLOSED' &&
    review.exactUpstreamDirectWitnessBoundaryAccepted &&
    review.exactUpstreamApplicabilityCandidateBoundaryAccepted &&
    review.qualifyingPrimaryWitnessEstablished &&
    review.authorityGapStatus.QUALIFYING_PRIMARY_WITNESS === 'CLOSED' &&
    review.authorityGapStatus.INDEPENDENT_NORMATIVE_PROVENANCE === 'OPEN' &&
    review.authorityGapStatus.EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING === 'OPEN' &&
    review.authorityGapStatus.CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE === 'OPEN' &&
    review.authorityGapStatus.RELATIONSHIP_T6_INPUT === 'OPEN' &&
    review.authorityGapsClosedCount === 1 &&
    review.authorityGapsOpenCount === 4 &&
    review.independentNormativeProvenanceForCurrentSpouseMethodEstablished === false &&
    review.explicitRoleNeutralSpouseNatalMappingEstablished === false &&
    review.currentGovernedMethodSemanticCorrespondenceEstablished === false &&
    review.currentRelationshipT6InputPathEstablished === false &&
    review.authorityAdmissionReady === false &&
    review.semanticProducerImplementationAuthorized === false &&
    review.crossSourceStitchingAuthorized === false &&
    review.crossTaskStitchingAuthorized === false &&
    review.productionPromotionAuthorized === false &&
    review.controlCount === 16 &&
    review.controlsFrozen &&
    deterministicContentHash(review.controlIds) ===
      deterministicContentHash(
        RELATIONSHIP_SPOUSE_T8_POST_PRIMARY_WITNESS_AUTHORITY_REASSESSMENT_CONTROL_IDS,
      )
  );
}

function contentAddressedT5T6ResidualMethodBoundaryIdentityValid(
  review: RelationshipSpouseT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReviewReport,
): boolean {
  const { reviewId, ...material } = review;
  return (
    reviewId ===
    `relationship_spouse_t8_current_bridge_method_boundary_reassessment_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactT5T6ResidualMethodBoundaryAccepted(
  review: RelationshipSpouseT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReviewReport,
): boolean {
  return (
    contentAddressedT5T6ResidualMethodBoundaryIdentityValid(review) &&
    review.reviewVersion ===
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT_REVIEW_VERSION &&
    review.status ===
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT' &&
    review.decision ===
      'PARTIAL_EVIDENCE_VALID_FOUR_CURRENT_METHOD_AUTHORITY_FRONTIERS_REMAIN_OPEN_NO_COMPETING_METHOD_ADOPTION_NO_AUTHORITY_ACQUIRED' &&
    review.exactExecutionEvidenceBoundaryAccepted &&
    review.executionEvidenceAdequateForResidualClassificationOnly &&
    review.executionEvidenceAdequateForAuthorityAdmission === false &&
    review.executionEvidenceAdequateForGapClosure === false &&
    review.methodologyChoiceMadeByThisGate === false &&
    review.rawHistoricalGenderRoleSemanticUseAuthorized === false &&
    review.modernEditorialPolicySemanticUseAuthorized === false &&
    review.modernPractitionerCompositionSemanticUseAuthorized === false &&
    review.directPrimaryImageRequirementWaived === false &&
    review.independentNormativeProvenanceRequirementWaived === false &&
    review.currentClaimClassCompositionRequirementWaived === false &&
    review.crossSourceStitchingAuthorized === false &&
    review.crossFrontierStitchingAuthorized === false &&
    review.currentRelationshipT6InputPathEstablished === false &&
    review.authorityAcquiredByThisGate === false &&
    review.authorityGapClosedByThisGate === false &&
    review.remediationExecutionAuthorizedByThisGate === false &&
    review.spouseT8RuleAuthoringAuthorized === false &&
    review.spouseT8ClaimTypeCreationAuthorized === false &&
    review.spouseInterpretationPackCreationAuthorized === false &&
    review.consumerNarrativeAuthorized === false &&
    review.compatibilityAuthorityAuthorized === false &&
    review.previewDefaultSwitchAuthorized === false &&
    review.productionPromotionAuthorized === false &&
    review.controlCount === 14 &&
    review.controlsFrozen &&
    deterministicContentHash(review.controlIds) ===
      deterministicContentHash(
        RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_METHOD_BOUNDARY_REASSESSMENT_CONTROL_IDS,
      ) &&
    review.implementationEffects.authorityGapsClosed === 0 &&
    review.implementationEffects.ruleDefinitionsCreated === 0 &&
    review.implementationEffects.claimTypesCreated === 0 &&
    review.implementationEffects.interpretationPacksCreated === 0 &&
    review.implementationEffects.narrativePlansCreated === 0 &&
    review.implementationEffects.previewRoutesChanged === 0
  );
}

function finalized(
  material: Omit<RelationshipSpouseT8T6InputFeasibilityReassessmentReviewReport, 'reviewId'>,
): RelationshipSpouseT8T6InputFeasibilityReassessmentReviewReport {
  return {
    reviewId: `relationship_spouse_t8_t6_input_feasibility_reassessment_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildRelationshipSpouseT8T6InputFeasibilityReassessmentReview(
  postPrimaryWitnessReview: RelationshipSpouseT8PostPrimaryWitnessAuthorityReassessmentReviewReport,
  t5T6ResidualMethodBoundaryReview: RelationshipSpouseT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReviewReport,
): RelationshipSpouseT8T6InputFeasibilityReassessmentReviewReport {
  const postPrimaryAccepted = exactPostPrimaryWitnessBoundaryAccepted(postPrimaryWitnessReview);
  const t6BoundaryAccepted = exactT5T6ResidualMethodBoundaryAccepted(
    t5T6ResidualMethodBoundaryReview,
  );
  const accepted = postPrimaryAccepted && t6BoundaryAccepted;

  return finalized({
    reviewVersion: RELATIONSHIP_SPOUSE_T8_T6_INPUT_FEASIBILITY_REASSESSMENT_REVIEW_VERSION,
    status: !postPrimaryAccepted
      ? 'UPSTREAM_POST_PRIMARY_WITNESS_AUTHORITY_SNAPSHOT_INVALID'
      : !t6BoundaryAccepted
        ? 'UPSTREAM_T5_T6_RESIDUAL_METHOD_BOUNDARY_INVALID'
        : 'RESOLVED_RELATIONSHIP_SPOUSE_T8_T6_INPUT_FEASIBILITY_REASSESSMENT_REVIEW',
    decision: accepted
      ? 'RELATIONSHIP_T6_INPUT_REMAINS_OPEN_AUTHORITY_REQUIRED_BEFORE_DIRECT_T6_PATH_CREATION_EXACTLY_ONE_OF_FIVE_GAPS_CLOSED'
      : 'RELATIONSHIP_T6_INPUT_FEASIBILITY_REASSESSMENT_NOT_ESTABLISHED',
    upstreamPostPrimaryWitnessReviewId: postPrimaryWitnessReview.reviewId,
    upstreamT5T6ResidualMethodBoundaryReviewId: t5T6ResidualMethodBoundaryReview.reviewId,
    exactUpstreamPostPrimaryWitnessBoundaryAccepted: postPrimaryAccepted,
    exactUpstreamT5T6ResidualMethodBoundaryAccepted: t6BoundaryAccepted,
    domain: 'relationship',
    subcategory: 'spouse',
    temporalScope: 'natal',
    statusClass: 'research',
    currentFiveGapAuthoritySnapshotSource: 'POST_PRIMARY_WITNESS_AUTHORITY_REASSESSMENT',
    t6FeasibilityBoundarySource: 'T5_T6_RESIDUAL_METHOD_BOUNDARY_REASSESSMENT',
    olderResidualAggregateGapSnapshotReusedAsCurrentAuthority: false,
    residualBoundaryUsedOnlyForT6Feasibility: accepted,
    qualifyingPrimaryWitnessEstablished: postPrimaryAccepted,
    authorityGapStatus: Object.freeze({
      QUALIFYING_PRIMARY_WITNESS: postPrimaryAccepted ? 'CLOSED' : 'OPEN',
      INDEPENDENT_NORMATIVE_PROVENANCE: 'OPEN',
      EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING: 'OPEN',
      CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE: 'OPEN',
      RELATIONSHIP_T6_INPUT: 'OPEN',
    }),
    independentNormativeProvenanceForCurrentSpouseMethodEstablished: false,
    explicitRoleNeutralSpouseNatalMappingEstablished: false,
    currentGovernedMethodSemanticCorrespondenceEstablished: false,
    currentRelationshipT6InputPathEstablished: false,
    relationshipT6PathCreationAuthorizedByCurrentEvidence: false,
    genericNeutralObjectWithoutGovernedT6LineageQualifiesAsT6Authority: false,
    lostT5DistinctionsReconstructedDownstreamByThisReview: false,
    crossSourceStitchingAuthorized: false,
    crossFrontierStitchingAuthorized: false,
    crossTaskStitchingAuthorized: false,
    authorityGapClosedByThisReview: false,
    authorityGapsClosedCount: postPrimaryAccepted ? 1 : 0,
    authorityGapsOpenCount: postPrimaryAccepted ? 4 : 5,
    authorityAdmissionReady: false,
    semanticProducerImplementationAuthorized: false,
    historicalGenderRoleUniversalizationAuthorized: false,
    userOrPartnerSexInferenceAuthorized: false,
    partnerSexualOrientationInferenceAuthorized: false,
    spouseT8RuleAuthoringAuthorized: false,
    spouseT8ClaimTypeCreationAuthorized: false,
    spouseInterpretationPackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    compatibilityAuthorityAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted
      ? RELATIONSHIP_SPOUSE_T8_T6_INPUT_FEASIBILITY_REASSESSMENT_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted ? 16 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      feasibilityReassessmentsPerformed: accepted ? 1 : 0,
      authorityGapsClosedByThisReview: 0,
      totalAuthorityGapsClosedAfterReview: postPrimaryAccepted ? 1 : 0,
      relationshipT6RuntimeObjectsCreated: 0,
      relationshipT6InputPathsCreated: 0,
      relationshipT6ExecutionTasksCreated: 0,
      t5DerivedSemanticReconstructionsCreated: 0,
      methodologyChoicesMade: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
      productionRoutesChanged: 0,
    },
    recommendedNextAction: accepted
      ? 'ACQUIRE_AUTHORIZED_DIRECT_RELATIONSHIP_T6_INPUT_CONTRACT_OR_GOVERNED_T6_SOURCE_LINEAGE_WITHOUT_RECONSTRUCTING_T5_INFORMATION_LOSS'
      : 'REESTABLISH_EXACT_T6_FEASIBILITY_UPSTREAM_BOUNDARIES',
  });
}
