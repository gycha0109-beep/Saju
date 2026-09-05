import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview } from '../src/research/relationship-spouse-t8-authority-acquisition-readiness-review.js';
import { buildRelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReview } from '../src/research/relationship-spouse-t8-authority-candidate-discovery-readiness-review.js';
import { buildRelationshipSpouseT8AuthorityCandidateDiscoveryEvidence } from '../src/research/relationship-spouse-t8-authority-candidate-discovery-evidence.js';
import { buildRelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluation } from '../src/research/relationship-spouse-t8-authority-candidate-requirement-coverage-evaluation.js';
import { buildRelationshipSpouseT8AuthorityResidualGapReassessmentReview } from '../src/research/relationship-spouse-t8-authority-residual-gap-reassessment-review.js';
import { buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview } from '../src/research/relationship-spouse-t8-current-t5-t6-semantic-bridge-authority-acquisition-readiness-review.js';
import { buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence } from '../src/research/relationship-spouse-t8-current-t5-t6-semantic-bridge-authority-candidate-discovery-evidence.js';
import { buildRelationshipSpouseT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReview } from '../src/research/relationship-spouse-t8-current-t5-t6-semantic-bridge-targeted-source-access-requirements-review.js';
import { buildRelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReview } from '../src/research/relationship-spouse-t8-current-t5-t6-semantic-bridge-active-remediation-execution-readiness-review.js';
import { buildRelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidence } from '../src/research/relationship-spouse-t8-current-t5-t6-semantic-bridge-active-remediation-execution-evidence.js';
import { buildRelationshipSpouseT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReview } from '../src/research/relationship-spouse-t8-current-t5-t6-semantic-bridge-remediation-evidence-adequacy-residual-path-reassessment-review.js';
import { buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReview } from '../src/research/relationship-spouse-t8-current-t5-t6-semantic-bridge-residual-authority-path-execution-readiness-review.js';
import { buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionEvidence } from '../src/research/relationship-spouse-t8-current-t5-t6-semantic-bridge-residual-authority-path-execution-evidence.js';
import { buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReview } from '../src/research/relationship-spouse-t8-current-t5-t6-semantic-bridge-residual-discovery-evidence-adequacy-method-boundary-reassessment-review.js';
import { buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionReadinessReview } from '../src/research/relationship-spouse-t8-current-method-residual-authority-acquisition-readiness-review.js';
import { buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidence } from '../src/research/relationship-spouse-t8-current-method-residual-authority-acquisition-evidence.js';
import { buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceAdequacyReassessmentReview } from '../src/research/relationship-spouse-t8-current-method-residual-authority-acquisition-evidence-adequacy-reassessment-review.js';
import { buildRelationshipSpouseT8CurrentMethodAuthorityAcquisitionContinuationEvidence } from '../src/research/relationship-spouse-t8-current-method-authority-acquisition-continuation-evidence.js';
import { buildRelationshipSpouseT8SourceAccessApplicabilityEvidence } from '../src/research/relationship-spouse-t8-source-access-applicability-evidence.js';
import { buildRelationshipSpouseT8SamyeongWanliPrimaryTargetEvidence } from '../src/research/relationship-spouse-t8-samyeong-wanli-primary-target-evidence.js';
import { buildRelationshipSpouseT8RoleNeutralApplicabilityContractCandidateEvidence } from '../src/research/relationship-spouse-t8-role-neutral-applicability-contract-candidate-evidence.js';
import { buildRelationshipSpouseT8WanliMultiWitnessCollationEvidence } from '../src/research/relationship-spouse-t8-wanli-multi-witness-collation-evidence.js';
import { buildWanliDirectTargetPageEvidence } from '../src/research/wanli-direct-target-page-evidence.js';
import { buildRelationshipSpouseT8PostPrimaryWitnessAuthorityReassessmentReview } from '../src/research/relationship-spouse-t8-post-primary-witness-authority-reassessment-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_T6_INPUT_FEASIBILITY_REASSESSMENT_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_T6_INPUT_FEASIBILITY_REASSESSMENT_REVIEW_VERSION,
  buildRelationshipSpouseT8T6InputFeasibilityReassessmentReview,
} from '../src/research/relationship-spouse-t8-t6-input-feasibility-reassessment-review.js';

function acceptedUpstreams() {
  const discoveryReadiness = buildRelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReview(
    buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview(),
  );
  const discoveryEvidence =
    buildRelationshipSpouseT8AuthorityCandidateDiscoveryEvidence(discoveryReadiness);
  const coverage = buildRelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluation(
    discoveryReadiness,
    discoveryEvidence,
  );
  const residual = buildRelationshipSpouseT8AuthorityResidualGapReassessmentReview(coverage);
  const bridgeReadiness =
    buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview(residual);
  const bridgeDiscovery =
    buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence(
      bridgeReadiness,
    );
  const sourceAccess =
    buildRelationshipSpouseT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReview(
      bridgeDiscovery,
    );
  const executionReadiness =
    buildRelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReview(
      sourceAccess,
    );
  const executionEvidence =
    buildRelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidence(
      executionReadiness,
    );
  const residualReassessment =
    buildRelationshipSpouseT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReview(
      executionEvidence,
    );
  const residualExecutionReadiness =
    buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReview(
      residualReassessment,
    );
  const residualExecutionEvidence =
    buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionEvidence(
      residualExecutionReadiness,
    );
  const methodBoundary =
    buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReview(
      residualExecutionEvidence,
    );
  const acquisitionReadiness =
    buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionReadinessReview(methodBoundary);
  const acquisitionEvidence =
    buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidence(acquisitionReadiness);
  const adequacy =
    buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceAdequacyReassessmentReview(
      acquisitionEvidence,
    );
  const continuation =
    buildRelationshipSpouseT8CurrentMethodAuthorityAcquisitionContinuationEvidence(adequacy);
  const sourceAccessApplicability =
    buildRelationshipSpouseT8SourceAccessApplicabilityEvidence(continuation);
  const wanliPrimaryTarget = buildRelationshipSpouseT8SamyeongWanliPrimaryTargetEvidence(
    sourceAccessApplicability,
  );
  const applicabilityCandidate =
    buildRelationshipSpouseT8RoleNeutralApplicabilityContractCandidateEvidence(wanliPrimaryTarget);
  const collation = buildRelationshipSpouseT8WanliMultiWitnessCollationEvidence(
    applicabilityCandidate,
  );
  const directWitness = buildWanliDirectTargetPageEvidence(collation);
  const postPrimaryWitness =
    buildRelationshipSpouseT8PostPrimaryWitnessAuthorityReassessmentReview(
      directWitness,
      applicabilityCandidate,
    );

  return { methodBoundary, postPrimaryWitness };
}

describe('relationship spouse T8 T6 input feasibility reassessment review', () => {
  test('accepts the exact post-primary snapshot and T6 method boundary and content-addresses the review', () => {
    const { methodBoundary, postPrimaryWitness } = acceptedUpstreams();
    const report = buildRelationshipSpouseT8T6InputFeasibilityReassessmentReview(
      postPrimaryWitness,
      methodBoundary,
    );

    expect(report.reviewVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_T6_INPUT_FEASIBILITY_REASSESSMENT_REVIEW_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_T6_INPUT_FEASIBILITY_REASSESSMENT_REVIEW',
    );
    expect(report.decision).toBe(
      'RELATIONSHIP_T6_INPUT_REMAINS_OPEN_AUTHORITY_REQUIRED_BEFORE_DIRECT_T6_PATH_CREATION_EXACTLY_ONE_OF_FIVE_GAPS_CLOSED',
    );
    expect(report.exactUpstreamPostPrimaryWitnessBoundaryAccepted).toBe(true);
    expect(report.exactUpstreamT5T6ResidualMethodBoundaryAccepted).toBe(true);

    const { reviewId, ...material } = report;
    expect(reviewId).toBe(
      `relationship_spouse_t8_t6_input_feasibility_reassessment_${deterministicContentHash(material).slice(0, 24)}`,
    );
  });

  test('keeps exactly one of five authority gaps closed and leaves relationship T6 input open', () => {
    const { methodBoundary, postPrimaryWitness } = acceptedUpstreams();
    const report = buildRelationshipSpouseT8T6InputFeasibilityReassessmentReview(
      postPrimaryWitness,
      methodBoundary,
    );

    expect(report.qualifyingPrimaryWitnessEstablished).toBe(true);
    expect(report.authorityGapStatus).toEqual({
      QUALIFYING_PRIMARY_WITNESS: 'CLOSED',
      INDEPENDENT_NORMATIVE_PROVENANCE: 'OPEN',
      EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING: 'OPEN',
      CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE: 'OPEN',
      RELATIONSHIP_T6_INPUT: 'OPEN',
    });
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.authorityGapClosedByThisReview).toBe(false);
    expect(report.authorityGapsClosedCount).toBe(1);
    expect(report.authorityGapsOpenCount).toBe(4);
  });

  test('uses the older residual chain only as a T6 feasibility boundary and never as the current aggregate gap snapshot', () => {
    const { methodBoundary, postPrimaryWitness } = acceptedUpstreams();
    const report = buildRelationshipSpouseT8T6InputFeasibilityReassessmentReview(
      postPrimaryWitness,
      methodBoundary,
    );

    expect(report.currentFiveGapAuthoritySnapshotSource).toBe(
      'POST_PRIMARY_WITNESS_AUTHORITY_REASSESSMENT',
    );
    expect(report.t6FeasibilityBoundarySource).toBe(
      'T5_T6_RESIDUAL_METHOD_BOUNDARY_REASSESSMENT',
    );
    expect(report.olderResidualAggregateGapSnapshotReusedAsCurrentAuthority).toBe(false);
    expect(report.residualBoundaryUsedOnlyForT6Feasibility).toBe(true);
    expect(report.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
  });

  test('does not manufacture a T6 path, neutral substitute, or downstream T5 reconstruction', () => {
    const { methodBoundary, postPrimaryWitness } = acceptedUpstreams();
    const report = buildRelationshipSpouseT8T6InputFeasibilityReassessmentReview(
      postPrimaryWitness,
      methodBoundary,
    );

    expect(report.relationshipT6PathCreationAuthorizedByCurrentEvidence).toBe(false);
    expect(report.genericNeutralObjectWithoutGovernedT6LineageQualifiesAsT6Authority).toBe(false);
    expect(report.lostT5DistinctionsReconstructedDownstreamByThisReview).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.crossFrontierStitchingAuthorized).toBe(false);
    expect(report.crossTaskStitchingAuthorized).toBe(false);
    expect(report.implementationEffects.relationshipT6RuntimeObjectsCreated).toBe(0);
    expect(report.implementationEffects.relationshipT6InputPathsCreated).toBe(0);
    expect(report.implementationEffects.relationshipT6ExecutionTasksCreated).toBe(0);
    expect(report.implementationEffects.t5DerivedSemanticReconstructionsCreated).toBe(0);
  });

  test('preserves every semantic, identity-inference, consumer, preview, and production gate fail-closed', () => {
    const { methodBoundary, postPrimaryWitness } = acceptedUpstreams();
    const report = buildRelationshipSpouseT8T6InputFeasibilityReassessmentReview(
      postPrimaryWitness,
      methodBoundary,
    );

    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.semanticProducerImplementationAuthorized).toBe(false);
    expect(report.historicalGenderRoleUniversalizationAuthorized).toBe(false);
    expect(report.userOrPartnerSexInferenceAuthorized).toBe(false);
    expect(report.partnerSexualOrientationInferenceAuthorized).toBe(false);
    expect(report.spouseT8RuleAuthoringAuthorized).toBe(false);
    expect(report.spouseT8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.spouseInterpretationPackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.compatibilityAuthorityAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_T6_INPUT_FEASIBILITY_REASSESSMENT_CONTROL_IDS,
    );
    expect(report.controlCount).toBe(16);
    expect(report.controlsFrozen).toBe(true);
    expect(report.implementationEffects).toEqual({
      feasibilityReassessmentsPerformed: 1,
      authorityGapsClosedByThisReview: 0,
      totalAuthorityGapsClosedAfterReview: 1,
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
    });
  });

  test('fails closed to zero accepted gaps if the current post-primary authority snapshot is altered', () => {
    const { methodBoundary, postPrimaryWitness } = acceptedUpstreams();
    const alteredPostPrimaryWitness = {
      ...postPrimaryWitness,
      controlsFrozen: false,
    };
    const report = buildRelationshipSpouseT8T6InputFeasibilityReassessmentReview(
      alteredPostPrimaryWitness,
      methodBoundary,
    );

    expect(report.status).toBe('UPSTREAM_POST_PRIMARY_WITNESS_AUTHORITY_SNAPSHOT_INVALID');
    expect(report.decision).toBe(
      'RELATIONSHIP_T6_INPUT_FEASIBILITY_REASSESSMENT_NOT_ESTABLISHED',
    );
    expect(report.exactUpstreamPostPrimaryWitnessBoundaryAccepted).toBe(false);
    expect(report.qualifyingPrimaryWitnessEstablished).toBe(false);
    expect(report.authorityGapsClosedCount).toBe(0);
    expect(report.authorityGapsOpenCount).toBe(5);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.controlsFrozen).toBe(false);
  });

  test('preserves the valid primary-witness closure but refuses T6 feasibility admission if the residual T6 boundary is altered', () => {
    const { methodBoundary, postPrimaryWitness } = acceptedUpstreams();
    const alteredMethodBoundary = {
      ...methodBoundary,
      currentRelationshipT6InputPathEstablished: true,
    } as unknown as typeof methodBoundary;
    const report = buildRelationshipSpouseT8T6InputFeasibilityReassessmentReview(
      postPrimaryWitness,
      alteredMethodBoundary,
    );

    expect(report.status).toBe('UPSTREAM_T5_T6_RESIDUAL_METHOD_BOUNDARY_INVALID');
    expect(report.decision).toBe(
      'RELATIONSHIP_T6_INPUT_FEASIBILITY_REASSESSMENT_NOT_ESTABLISHED',
    );
    expect(report.exactUpstreamPostPrimaryWitnessBoundaryAccepted).toBe(true);
    expect(report.exactUpstreamT5T6ResidualMethodBoundaryAccepted).toBe(false);
    expect(report.qualifyingPrimaryWitnessEstablished).toBe(true);
    expect(report.authorityGapsClosedCount).toBe(1);
    expect(report.authorityGapsOpenCount).toBe(4);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.relationshipT6PathCreationAuthorizedByCurrentEvidence).toBe(false);
    expect(report.controlsFrozen).toBe(false);
  });
});
