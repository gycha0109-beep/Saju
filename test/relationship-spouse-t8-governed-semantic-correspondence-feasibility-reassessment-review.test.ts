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
import {
  buildRelationshipSpouseT8PostPrimaryWitnessAuthorityReassessmentReview,
  type RelationshipSpouseT8PostPrimaryWitnessAuthorityReassessmentReviewReport,
} from '../src/research/relationship-spouse-t8-post-primary-witness-authority-reassessment-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_GOVERNED_SEMANTIC_CORRESPONDENCE_FEASIBILITY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_GOVERNED_SEMANTIC_CORRESPONDENCE_FEASIBILITY_REASSESSMENT_REVIEW_VERSION,
  buildRelationshipSpouseT8GovernedSemanticCorrespondenceFeasibilityReassessmentReview,
} from '../src/research/relationship-spouse-t8-governed-semantic-correspondence-feasibility-reassessment-review.js';

function acceptedPostPrimaryWitnessReview() {
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

  return buildRelationshipSpouseT8PostPrimaryWitnessAuthorityReassessmentReview(
    directWitness,
    applicabilityCandidate,
  );
}

describe('relationship spouse T8 governed semantic correspondence feasibility reassessment', () => {
  test('accepts the exact current authority snapshot and content-addresses the feasibility review', () => {
    const upstream = acceptedPostPrimaryWitnessReview();
    const report =
      buildRelationshipSpouseT8GovernedSemanticCorrespondenceFeasibilityReassessmentReview(upstream);

    expect(report.reviewVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_GOVERNED_SEMANTIC_CORRESPONDENCE_FEASIBILITY_REASSESSMENT_REVIEW_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_GOVERNED_SEMANTIC_CORRESPONDENCE_FEASIBILITY_REASSESSMENT',
    );
    expect(report.decision).toBe(
      'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN_CURRENT_T5_COLLAPSES_SOURCE_DISTINCTIONS_AND_GENERAL_RELATIONSHIP_REUSE_IS_FORBIDDEN_EXACTLY_ONE_OF_FIVE_GAPS_CLOSED',
    );
    expect(report.exactUpstreamPostPrimaryWitnessBoundaryAccepted).toBe(true);
    expect(report.exactCurrentT5ProducerBoundaryAccepted).toBe(true);
    expect(report.exactCurrentGeneralRelationshipT8BoundaryAccepted).toBe(true);
    expect(report.directWanliSemanticAnchorAccepted).toBe(true);

    const { reviewId, ...material } = report;
    expect(reviewId).toBe(
      `relationship_spouse_t8_governed_semantic_correspondence_feasibility_${deterministicContentHash(material).slice(0, 24)}`,
    );
  });

  test('proves the current T5 producer collapses subtype identity before spouse semantics could be established', () => {
    const report =
      buildRelationshipSpouseT8GovernedSemanticCorrespondenceFeasibilityReassessmentReview(
        acceptedPostPrimaryWitnessReview(),
      );

    expect(report.currentT5ClaimTypes).toEqual([
      'TEN_GOD_FAMILY_PEER_PRESENT',
      'TEN_GOD_FAMILY_RESOURCE_PRESENT',
      'TEN_GOD_FAMILY_OUTPUT_PRESENT',
      'TEN_GOD_FAMILY_WEALTH_PRESENT',
      'TEN_GOD_FAMILY_OFFICER_PRESENT',
    ]);
    expect(report.currentT5ClaimCount).toBe(5);
    expect(report.currentT5InputConditionsPreserveSubtypeIdentityBeforeEmission).toBe(true);
    expect(report.currentT5EmittedClaimPreservesTenGodSubtypeIdentity).toBe(false);
    expect(report.currentT5EmittedClaimPreservesSourceSlotIdentity).toBe(false);
    expect(report.currentT5EmittedClaimPreservesSeasonalCommand).toBe(false);
    expect(report.currentT5EmittedClaimPreservesDayMasterStrengthOrWangShuai).toBe(false);
    expect(report.currentT5DominanceScored).toBe(false);
    expect(report.directWanliTargetExcerpt).toBe('正財妻偏財妾也');
    expect(report.directWanliSpouseSemanticDistinguishesWealthSubtypes).toBe(true);
    expect(report.collapsedWealthFamilyQualifiesAsExactWanliSubtypeCorrespondence).toBe(false);
    expect(report.semanticReconstructionWouldBeRequiredToRecoverDiscardedT5Distinctions).toBe(true);
    expect(report.semanticReconstructionAuthorized).toBe(false);
  });

  test('forbids relabelling the existing general relationship T8 method as spouse authority', () => {
    const report =
      buildRelationshipSpouseT8GovernedSemanticCorrespondenceFeasibilityReassessmentReview(
        acceptedPostPrimaryWitnessReview(),
      );

    expect(report.broadRelationshipMethodExplicitlyForbidsSpouseSpecificReuse).toBe(true);
    expect(report.broadRelationshipMayBeRelabelledAsSpouseAuthority).toBe(false);
    expect(report.methodologyRelabellingAuthorized).toBe(false);
    expect(report.exactCurrentT5ToSpouseSourceBoundSemanticRuleEstablished).toBe(false);
    expect(report.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
  });

  test('keeps exactly one of five authority gaps closed and creates no producer or product effects', () => {
    const report =
      buildRelationshipSpouseT8GovernedSemanticCorrespondenceFeasibilityReassessmentReview(
        acceptedPostPrimaryWitnessReview(),
      );

    expect(report.authorityGapStatus).toEqual({
      QUALIFYING_PRIMARY_WITNESS: 'CLOSED',
      INDEPENDENT_NORMATIVE_PROVENANCE: 'OPEN',
      EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING: 'OPEN',
      CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE: 'OPEN',
      RELATIONSHIP_T6_INPUT: 'OPEN',
    });
    expect(report.authorityGapClosedByThisReview).toBe(false);
    expect(report.authorityGapsClosedCount).toBe(1);
    expect(report.authorityGapsOpenCount).toBe(4);
    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.semanticProducerImplementationAuthorized).toBe(false);
    expect(report.historicalGenderRoleUniversalizationAuthorized).toBe(false);
    expect(report.userOrPartnerSexInferenceAuthorized).toBe(false);
    expect(report.partnerSexualOrientationInferenceAuthorized).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.crossFrontierStitchingAuthorized).toBe(false);
    expect(report.crossTaskStitchingAuthorized).toBe(false);
    expect(report.spouseT8RuleAuthoringAuthorized).toBe(false);
    expect(report.spouseT8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.spouseInterpretationPackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.compatibilityAuthorityAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_GOVERNED_SEMANTIC_CORRESPONDENCE_FEASIBILITY_CONTROL_IDS,
    );
    expect(report.controlCount).toBe(18);
    expect(report.controlsFrozen).toBe(true);
    expect(report.implementationEffects).toEqual({
      feasibilityReassessmentsPerformed: 1,
      currentT5ProducerBoundariesInspected: 1,
      currentGeneralRelationshipBoundariesInspected: 1,
      directWanliSemanticAnchorsInspected: 1,
      authorityGapsClosedByThisReview: 0,
      totalAuthorityGapsClosedAfterReview: 1,
      semanticReconstructionMethodsCreated: 0,
      methodologyRelabellingsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
      productionRoutesChanged: 0,
    });
  });

  test('fails closed to zero accepted gaps when the current authority snapshot is altered', () => {
    const upstream = acceptedPostPrimaryWitnessReview();
    const alteredUpstream = {
      ...upstream,
      controlsFrozen: false,
    } as RelationshipSpouseT8PostPrimaryWitnessAuthorityReassessmentReviewReport;
    const report =
      buildRelationshipSpouseT8GovernedSemanticCorrespondenceFeasibilityReassessmentReview(
        alteredUpstream,
      );

    expect(report.status).toBe('UPSTREAM_POST_PRIMARY_WITNESS_AUTHORITY_SNAPSHOT_INVALID');
    expect(report.decision).toBe(
      'GOVERNED_SEMANTIC_CORRESPONDENCE_FEASIBILITY_REASSESSMENT_NOT_ESTABLISHED',
    );
    expect(report.exactUpstreamPostPrimaryWitnessBoundaryAccepted).toBe(false);
    expect(report.authorityGapsClosedCount).toBe(0);
    expect(report.authorityGapsOpenCount).toBe(5);
    expect(report.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(report.controlsFrozen).toBe(false);
    expect(report.implementationEffects.authorityGapsClosedByThisReview).toBe(0);
    expect(report.implementationEffects.ruleDefinitionsCreated).toBe(0);
    expect(report.implementationEffects.claimTypesCreated).toBe(0);
  });
});
