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
import {
  buildRelationshipSpouseT8RoleNeutralApplicabilityContractCandidateEvidence,
  type RelationshipSpouseT8RoleNeutralApplicabilityContractCandidateEvidenceReport,
} from '../src/research/relationship-spouse-t8-role-neutral-applicability-contract-candidate-evidence.js';
import { buildRelationshipSpouseT8WanliMultiWitnessCollationEvidence } from '../src/research/relationship-spouse-t8-wanli-multi-witness-collation-evidence.js';
import {
  buildWanliDirectTargetPageEvidence,
  type WanliDirectTargetPageEvidenceReport,
} from '../src/research/wanli-direct-target-page-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_POST_PRIMARY_WITNESS_AUTHORITY_REASSESSMENT_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_POST_PRIMARY_WITNESS_AUTHORITY_REASSESSMENT_REVIEW_VERSION,
  buildRelationshipSpouseT8PostPrimaryWitnessAuthorityReassessmentReview,
} from '../src/research/relationship-spouse-t8-post-primary-witness-authority-reassessment-review.js';

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

  return { directWitness, applicabilityCandidate };
}

describe('relationship spouse T8 post-primary-witness authority reassessment review', () => {
  test('accepts both exact content-addressed evidence boundaries and content-addresses the review', () => {
    const { directWitness, applicabilityCandidate } = acceptedUpstreams();
    const report = buildRelationshipSpouseT8PostPrimaryWitnessAuthorityReassessmentReview(
      directWitness,
      applicabilityCandidate,
    );

    expect(report.reviewVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_POST_PRIMARY_WITNESS_AUTHORITY_REASSESSMENT_REVIEW_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_POST_PRIMARY_WITNESS_AUTHORITY_REASSESSMENT_REVIEW',
    );
    expect(report.decision).toBe(
      'QUALIFYING_PRIMARY_WITNESS_REMAINS_CLOSED_MODERN_EDITORIAL_CANDIDATE_REMAINS_INADEQUATE_EXACTLY_ONE_OF_FIVE_GAPS_CLOSED',
    );
    expect(report.exactUpstreamDirectWitnessBoundaryAccepted).toBe(true);
    expect(report.exactUpstreamApplicabilityCandidateBoundaryAccepted).toBe(true);

    const { reviewId, ...material } = report;
    expect(reviewId).toBe(
      `relationship_spouse_t8_post_primary_witness_authority_reassessment_${deterministicContentHash(material).slice(0, 24)}`,
    );
  });

  test('preserves the primary-witness closure while leaving the other four gaps open', () => {
    const { directWitness, applicabilityCandidate } = acceptedUpstreams();
    const report = buildRelationshipSpouseT8PostPrimaryWitnessAuthorityReassessmentReview(
      directWitness,
      applicabilityCandidate,
    );

    expect(report.directPrimaryWitnessProgressAccepted).toBe(true);
    expect(report.qualifyingPrimaryWitnessEstablished).toBe(true);
    expect(report.authorityGapStatus).toEqual({
      QUALIFYING_PRIMARY_WITNESS: 'CLOSED',
      INDEPENDENT_NORMATIVE_PROVENANCE: 'OPEN',
      EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING: 'OPEN',
      CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE: 'OPEN',
      RELATIONSHIP_T6_INPUT: 'OPEN',
    });
    expect(report.authorityGapsClosedCount).toBe(1);
    expect(report.authorityGapsOpenCount).toBe(4);
    expect(report.authorityGapClosedByThisReview).toBe(false);
    expect(report.independentNormativeProvenanceForCurrentSpouseMethodEstablished).toBe(false);
    expect(report.explicitRoleNeutralSpouseNatalMappingEstablished).toBe(false);
    expect(report.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
  });

  test('keeps the modern editorial candidate as partial research evidence rather than normative or role-neutral natal authority', () => {
    const { directWitness, applicabilityCandidate } = acceptedUpstreams();
    const report = buildRelationshipSpouseT8PostPrimaryWitnessAuthorityReassessmentReview(
      directWitness,
      applicabilityCandidate,
    );

    expect(report.boundedExistingEvidenceAdequacyReassessmentPerformed).toBe(true);
    expect(report.modernEditorialApplicabilityCandidateAcceptedAsResearchEvidence).toBe(true);
    expect(report.modernEditorialPartnerNeutralLanguageCandidateLocated).toBe(true);
    expect(report.modernEditorialNoPartnerIdentityInferenceBoundaryCandidateLocated).toBe(true);
    expect(report.modernEditorialCandidateProvidesExplicitRoleNeutralNatalMapping).toBe(false);
    expect(report.modernEditorialCandidatePeerReviewed).toBe(false);
    expect(report.modernEditorialCandidateInstitutionalNormativeStandard).toBe(false);
    expect(report.modernEditorialCandidateIndependentNormativeAuthority).toBe(false);
    expect(report.compatibilityScopedRoleNeutralConventionReusedForNatalAuthority).toBe(false);
    expect(report.historicalPrimaryAndModernEditorialEvidenceStitchedToCreateMissingAuthority).toBe(false);
    expect(report.applicabilityGapStatus).toBe('PARTIAL_EVIDENCE_NOT_ADEQUATE');
    expect(report.qualifyingAuthorityCandidateCount).toBe(0);
    expect(report.authorityAcceptedCandidateCount).toBe(0);
  });

  test('preserves every producer, inference, consumer, preview, and production gate fail-closed', () => {
    const { directWitness, applicabilityCandidate } = acceptedUpstreams();
    const report = buildRelationshipSpouseT8PostPrimaryWitnessAuthorityReassessmentReview(
      directWitness,
      applicabilityCandidate,
    );

    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.semanticProducerImplementationAuthorized).toBe(false);
    expect(report.historicalGenderRoleUniversalizationAuthorized).toBe(false);
    expect(report.userOrPartnerSexInferenceAuthorized).toBe(false);
    expect(report.partnerSexualOrientationInferenceAuthorized).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.crossTaskStitchingAuthorized).toBe(false);
    expect(report.spouseT8RuleAuthoringAuthorized).toBe(false);
    expect(report.spouseT8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.spouseInterpretationPackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.compatibilityAuthorityAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_POST_PRIMARY_WITNESS_AUTHORITY_REASSESSMENT_CONTROL_IDS,
    );
    expect(report.controlCount).toBe(16);
    expect(report.controlsFrozen).toBe(true);
    expect(report.implementationEffects).toEqual({
      adequacyReassessmentsPerformed: 1,
      authorityGapsClosedByThisReview: 0,
      totalAuthorityGapsClosedAfterReview: 1,
      independentNormativeAuthoritiesEstablished: 0,
      explicitRoleNeutralNatalMappingsEstablished: 0,
      methodologyChoicesMade: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
      productionRoutesChanged: 0,
    });
  });

  test('fails closed to zero accepted gaps if the direct-witness boundary is altered', () => {
    const { directWitness, applicabilityCandidate } = acceptedUpstreams();
    const alteredDirect = {
      ...directWitness,
      controlsFrozen: false,
    } as WanliDirectTargetPageEvidenceReport;
    const report = buildRelationshipSpouseT8PostPrimaryWitnessAuthorityReassessmentReview(
      alteredDirect,
      applicabilityCandidate,
    );

    expect(report.status).toBe('UPSTREAM_DIRECT_WANLI_TARGET_PAGE_EVIDENCE_INVALID');
    expect(report.decision).toBe('POST_PRIMARY_WITNESS_AUTHORITY_REASSESSMENT_NOT_ESTABLISHED');
    expect(report.exactUpstreamDirectWitnessBoundaryAccepted).toBe(false);
    expect(report.qualifyingPrimaryWitnessEstablished).toBe(false);
    expect(report.authorityGapsClosedCount).toBe(0);
    expect(report.authorityGapsOpenCount).toBe(5);
    expect(report.controlsFrozen).toBe(false);
    expect(report.authorityAdmissionReady).toBe(false);
  });

  test('does not erase the valid primary-witness closure when only the modern candidate boundary is altered', () => {
    const { directWitness, applicabilityCandidate } = acceptedUpstreams();
    const alteredCandidate = {
      ...applicabilityCandidate,
      controlsFrozen: false,
    } as RelationshipSpouseT8RoleNeutralApplicabilityContractCandidateEvidenceReport;
    const report = buildRelationshipSpouseT8PostPrimaryWitnessAuthorityReassessmentReview(
      directWitness,
      alteredCandidate,
    );

    expect(report.status).toBe(
      'UPSTREAM_ROLE_NEUTRAL_APPLICABILITY_CANDIDATE_EVIDENCE_INVALID',
    );
    expect(report.decision).toBe('POST_PRIMARY_WITNESS_AUTHORITY_REASSESSMENT_NOT_ESTABLISHED');
    expect(report.exactUpstreamDirectWitnessBoundaryAccepted).toBe(true);
    expect(report.exactUpstreamApplicabilityCandidateBoundaryAccepted).toBe(false);
    expect(report.qualifyingPrimaryWitnessEstablished).toBe(true);
    expect(report.authorityGapsClosedCount).toBe(1);
    expect(report.authorityGapsOpenCount).toBe(4);
    expect(report.boundedExistingEvidenceAdequacyReassessmentPerformed).toBe(false);
    expect(report.controlsFrozen).toBe(false);
    expect(report.authorityAdmissionReady).toBe(false);
  });
});
