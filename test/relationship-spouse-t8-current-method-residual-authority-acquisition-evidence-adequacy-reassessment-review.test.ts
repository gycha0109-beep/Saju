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
import {
  buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidence,
  type RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceReport,
} from '../src/research/relationship-spouse-t8-current-method-residual-authority-acquisition-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_ADEQUACY_REASSESSMENT_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_ADEQUACY_REASSESSMENT_REVIEW_VERSION,
  RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_REQUIREMENT_ADEQUACY_ASSESSMENTS,
  buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceAdequacyReassessmentReview,
} from '../src/research/relationship-spouse-t8-current-method-residual-authority-acquisition-evidence-adequacy-reassessment-review.js';

function acceptedAcquisitionEvidence() {
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
  return buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidence(
    acquisitionReadiness,
  );
}

describe('Relationship spouse T8 current-method acquisition evidence adequacy reassessment', () => {
  test('accepts the exact acquisition-evidence boundary and records the final not-admission-ready verdict', () => {
    const report =
      buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceAdequacyReassessmentReview(
        acceptedAcquisitionEvidence(),
      );

    expect(report.reviewVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_ADEQUACY_REASSESSMENT_REVIEW_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_ADEQUACY_REASSESSMENT',
    );
    expect(report.decision).toBe(
      'ACQUISITION_EVIDENCE_VALID_RESEARCH_PROGRESS_ZERO_OF_FIVE_REQUIREMENTS_ADEQUATE_AUTHORITY_NOT_ADMISSION_READY',
    );
    expect(report.exactAcquisitionEvidenceBoundaryAccepted).toBe(true);
    expect(report.acquisitionEvidenceAdequateForResearchOutcome).toBe(true);
    expect(report.acquisitionEvidenceAdequateForAuthorityAdmission).toBe(false);
    expect(report.acquisitionEvidenceAdequateForAnyGapClosure).toBe(false);
    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.semanticProducerImplementationAuthorized).toBe(false);
  });

  test('reassesses all five mandatory gaps independently and closes none', () => {
    const report =
      buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceAdequacyReassessmentReview(
        acceptedAcquisitionEvidence(),
      );

    expect(report.requirementAssessmentCount).toBe(5);
    expect(report.requirementAssessments).toEqual(
      RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_REQUIREMENT_ADEQUACY_ASSESSMENTS,
    );
    expect(report.mandatoryRequirementCount).toBe(5);
    expect(report.adequateMandatoryRequirementCount).toBe(0);
    expect(report.partialButInadequateRequirementCount).toBe(4);
    expect(report.noQualifyingEvidenceRequirementCount).toBe(1);
    expect(report.requirementAssessments.every((item) => !item.adequateForRequirement)).toBe(
      true,
    );
    expect(report.requirementAssessments.every((item) => !item.gapClosureAuthorized)).toBe(
      true,
    );
    expect(report.allFiveGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toHaveLength(5);
  });

  test('recognizes the Yuanhai primary-image upgrade without converting it into semantic or provenance admission', () => {
    const report =
      buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceAdequacyReassessmentReview(
        acceptedAcquisitionEvidence(),
      );

    expect(report.yuanhaiPrimaryImageProgressRecognized).toBe(true);
    expect(report.yuanhaiPrimaryImageProgressClosesSemanticBindingGap).toBe(false);
    expect(report.yuanhaiPrimaryImageProgressClosesProvenanceGap).toBe(false);
    expect(report.wygExactTargetPrimaryImageStillRequired).toBe(true);
    expect(report.independentNormativeProvenanceEstablished).toBe(false);
  });

  test('keeps applicability, exact current claim-class composition, semantic correspondence, and T6 blocked', () => {
    const report =
      buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceAdequacyReassessmentReview(
        acceptedAcquisitionEvidence(),
      );

    expect(report.explicitGenderNeutralSpouseNatalApplicabilityEstablished).toBe(false);
    expect(report.exactCurrentClaimClassCompositionAuthorityEstablished).toBe(false);
    expect(report.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.competingFoundationalMethodAdopted).toBe(false);
    expect(report.humanMethodologyChoiceMade).toBe(false);
  });

  test('forbids substitutions, unsafe role universalization, and every semantic/product implementation effect', () => {
    const report =
      buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceAdequacyReassessmentReview(
        acceptedAcquisitionEvidence(),
      );

    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.crossTaskStitchingAuthorized).toBe(false);
    expect(report.historicalGenderRoleUniversalizationAuthorized).toBe(false);
    expect(report.userOrPartnerSexInferenceAuthorized).toBe(false);
    expect(report.partnerSexualOrientationInferenceAuthorized).toBe(false);
    expect(report.partnerAttributeOrOutcomePromotionAuthorized).toBe(false);
    expect(report.compatibilityOrTimingPromotionAuthorized).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
    expect(report.spouseT8RuleAuthoringAuthorized).toBe(false);
    expect(report.spouseT8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.spouseInterpretationPackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.compatibilityAuthorityAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_ADEQUACY_REASSESSMENT_CONTROL_IDS,
    );
    expect(report.controlCount).toBe(14);
    expect(report.controlsFrozen).toBe(true);
    expect(report.implementationEffects).toEqual({
      adequacyReviewsPerformed: 1,
      authorityRequirementsSatisfied: 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      methodologyChoicesMade: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    });
  });

  test('fails closed when the content-addressed acquisition evidence is altered', () => {
    const evidence = acceptedAcquisitionEvidence();
    const altered = {
      ...evidence,
      higherProvenanceModernSourceLocated: false,
    } as unknown as RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceReport;
    const report =
      buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceAdequacyReassessmentReview(
        altered,
      );

    expect(report.status).toBe('UPSTREAM_ACQUISITION_EVIDENCE_BOUNDARY_INVALID');
    expect(report.exactAcquisitionEvidenceBoundaryAccepted).toBe(false);
    expect(report.acquisitionEvidenceAdequateForResearchOutcome).toBe(false);
    expect(report.requirementAssessmentCount).toBe(0);
    expect(report.requirementAssessments).toEqual([]);
    expect(report.controlsFrozen).toBe(false);
    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.semanticProducerImplementationAuthorized).toBe(false);
    expect(report.recommendedNextAction).toBe(
      'REESTABLISH_RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE',
    );
  });

  test('is deterministic and stops before any admission or producer gate until new qualifying evidence exists', () => {
    const evidence = acceptedAcquisitionEvidence();
    const first =
      buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceAdequacyReassessmentReview(
        evidence,
      );
    const second =
      buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceAdequacyReassessmentReview(
        evidence,
      );

    expect(first).toEqual(second);
    const { reviewId, ...material } = first;
    expect(reviewId).toBe(
      `relationship_spouse_t8_current_method_acquisition_evidence_adequacy_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextAction).toBe(
      'CONTINUE_EXTERNAL_SOURCE_ACQUISITION_UNTIL_NEW_QUALIFYING_EVIDENCE_EXISTS_BEFORE_ANY_ADMISSION_OR_PRODUCER_GATE',
    );
  });
});
