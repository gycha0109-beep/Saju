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
import {
  buildRelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidence,
  type RelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidenceReport,
} from '../src/research/relationship-spouse-t8-current-t5-t6-semantic-bridge-active-remediation-execution-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_PATHS,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_REASSESSMENT_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_REMEDIATION_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW_VERSION,
  buildRelationshipSpouseT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReview,
} from '../src/research/relationship-spouse-t8-current-t5-t6-semantic-bridge-remediation-evidence-adequacy-residual-path-reassessment-review.js';

function acceptedExecutionEvidence() {
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
  return buildRelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidence(
    executionReadiness,
  );
}

describe('Relationship spouse T8 current T5/T6 remediation evidence adequacy and residual paths', () => {
  test('accepts the exact execution-evidence boundary and selects four residual paths', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReview(
        acceptedExecutionEvidence(),
      );

    expect(report.reviewVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_REMEDIATION_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_REMEDIATION_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT',
    );
    expect(report.decision).toBe(
      'EXECUTION_OUTCOMES_VALID_ZERO_AUTHORITY_FOUR_RESIDUAL_PATHS_SELECTED_ALL_FIVE_GAPS_OPEN',
    );
    expect(report.residualPathCount).toBe(4);
    expect(report.residualPaths).toEqual(RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_PATHS);
  });

  test('treats execution evidence as adequate only for research outcome, never authority or gap closure', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReview(
        acceptedExecutionEvidence(),
      );

    expect(report.executionEvidenceAdequateForResearchOutcomeOnly).toBe(true);
    expect(report.executionEvidenceAdequateForAuthorityAdmission).toBe(false);
    expect(report.executionEvidenceAdequateForGapClosure).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
  });

  test('routes the missing WYG images to the public 0810 targeted facsimile path without pretending pages were inspected', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReview(
        acceptedExecutionEvidence(),
      );
    const path = report.residualPaths.find(
      (item) => item.pathId === 'WYG_0810_DIRECT_FACSIMILE_PAGE_BINDING',
    );

    expect(report.requiredWygDirectImagesStillMissing).toBe(true);
    expect(report.requiredWygWitnessNonexistenceInferred).toBe(false);
    expect(report.wyg0810TargetedFacsimileAccessPathSelected).toBe(true);
    expect(report.wyg0810DirectTargetPagesAlreadyInspectedByThisReview).toBe(false);
    expect(report.targetedPrimaryWitnessAccessPathCount).toBe(1);
    expect(path?.status).toBe('TARGETED_PRIMARY_WITNESS_ACCESS_REQUIRED');
    expect(path?.knownAccessTargetUrl).toContain('0810');
    expect(path?.executionAuthorizedByThisReview).toBe(false);
  });

  test('preserves Yuanhai Ziping only as a transcription corroboration lead pending independent primary witness upgrade', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReview(
        acceptedExecutionEvidence(),
      );
    const path = report.residualPaths.find(
      (item) => item.pathId === 'YUANHAI_PRIMARY_WITNESS_CORROBORATION_UPGRADE',
    );

    expect(report.yuanhaiTranscriptionCorroborationLeadPreserved).toBe(true);
    expect(report.yuanhaiIndependentPrimaryWitnessStillRequired).toBe(true);
    expect(report.independentNormativeProvenanceEstablished).toBe(false);
    expect(path?.status).toBe('ACTIVE_PRIMARY_CORROBORATION_UPGRADE_REQUIRED');
    expect(path?.targetGapIds).toEqual([
      'SPOUSE_SPECIFIC_SEMANTIC_BINDING_MISSING',
      'SPOUSE_NORMATIVE_PROVENANCE_REVIEW_MISSING',
    ]);
  });

  test('keeps modern gender-neutral applicability as a separate authority-discovery path', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReview(
        acceptedExecutionEvidence(),
      );
    const path = report.residualPaths.find(
      (item) => item.pathId === 'MODERN_GENDER_NEUTRAL_SPOUSE_APPLICABILITY_AUTHORITY_DISCOVERY',
    );

    expect(report.historicalMappingGenderRoleBound).toBe(true);
    expect(report.genderNeutralSpouseApplicabilityEstablished).toBe(false);
    expect(report.modernApplicabilityAuthorityDiscoveryRequired).toBe(true);
    expect(report.rawHistoricalMappingPromotionAuthorized).toBe(false);
    expect(report.userOrPartnerSexInferenceAuthorized).toBe(false);
    expect(path?.targetGapIds).toEqual(['SPOUSE_APPLICABILITY_BOUNDARY_MISSING']);
  });

  test('keeps multi-claim composition and scope limits on their own authority path', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReview(
        acceptedExecutionEvidence(),
      );
    const path = report.residualPaths.find(
      (item) => item.pathId === 'SPOUSE_MULTI_CLAIM_COMPOSITION_SCOPE_AUTHORITY_DISCOVERY',
    );

    expect(report.compositionAuthorityStillMissing).toBe(true);
    expect(report.scopeLimitsAuthorityStillMissing).toBe(true);
    expect(path?.targetGapIds).toEqual([
      'SPOUSE_MULTI_CLAIM_COMPOSITION_METHOD_MISSING',
      'SPOUSE_SCOPE_LIMITS_AND_EXCEPTIONS_MISSING',
    ]);
    expect(report.partnerAttributeOrOutcomePromotionAuthorized).toBe(false);
    expect(report.compatibilityOrTimingPromotionAuthorized).toBe(false);
  });

  test('keeps residual paths source-bound and forbids cross-source and cross-path stitching', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReview(
        acceptedExecutionEvidence(),
      );

    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.crossPathStitchingAuthorized).toBe(false);
    for (const path of report.residualPaths) {
      expect(path.existingExecutionEvidenceMaySatisfyAuthority).toBe(false);
      expect(path.newEvidenceRequired).toBe(true);
      expect(path.sourceBoundCorrespondenceRequired).toBe(true);
      expect(path.explicitApplicabilityBoundaryRequired).toBe(true);
      expect(path.independentNormativeProvenanceRequiredForAdmission).toBe(true);
      expect(path.crossSourceStitchingForSameGapAllowed).toBe(false);
      expect(path.executionAuthorizedByThisReview).toBe(false);
    }
  });

  test('creates no relationship T6 path and keeps all five spouse authority gaps open', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReview(
        acceptedExecutionEvidence(),
      );

    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.relationshipT6ResidualPathCreated).toBe(false);
    expect(report.allFiveGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toHaveLength(5);
    expect(report.residualPathExecutionAuthorizedByThisGate).toBe(false);
    expect(report.spouseT8RuleAuthoringAuthorized).toBe(false);
    expect(report.spouseT8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.spouseInterpretationPackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.compatibilityAuthorityAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_REASSESSMENT_CONTROL_IDS,
    );
    expect(report.controlCount).toBe(14);
    expect(report.controlsFrozen).toBe(true);
    expect(report.implementationEffects).toEqual({
      directWitnessAccessesPerformed: 0,
      primaryWitnessDiscoveryExecutionsPerformed: 0,
      authorityDiscoveryExecutionsPerformed: 0,
      residualPathsSelected: 4,
      candidatesRegistered: 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    });
  });

  test('fails closed if the upstream execution evidence is tampered', () => {
    const evidence = acceptedExecutionEvidence();
    const tampered = {
      ...evidence,
      totalSourceAttemptCount: 8,
    } as unknown as RelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidenceReport;
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReview(
        tampered,
      );

    expect(report.status).toBe('UPSTREAM_EXECUTION_EVIDENCE_BOUNDARY_INVALID');
    expect(report.exactExecutionEvidenceBoundaryAccepted).toBe(false);
    expect(report.residualPathCount).toBe(0);
    expect(report.residualPaths).toEqual([]);
    expect(report.controlsFrozen).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_EVIDENCE',
    );
  });

  test('is deterministic and routes only to residual authority-path execution readiness', () => {
    const evidence = acceptedExecutionEvidence();
    const first =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReview(
        evidence,
      );
    const second =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReview(
        evidence,
      );

    expect(first).toEqual(second);
    const { reviewId, ...material } = first;
    expect(reviewId).toBe(
      `relationship_spouse_t8_current_bridge_residual_path_reassessment_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.activeAuthorityDiscoveryPathCount).toBe(3);
    expect(first.activeAuthorityDiscoveryPathIds).toEqual([
      'YUANHAI_PRIMARY_WITNESS_CORROBORATION_UPGRADE',
      'MODERN_GENDER_NEUTRAL_SPOUSE_APPLICABILITY_AUTHORITY_DISCOVERY',
      'SPOUSE_MULTI_CLAIM_COMPOSITION_SCOPE_AUTHORITY_DISCOVERY',
    ]);
    expect(first.recommendedNextGate).toBe(
      'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_READINESS_REVIEW',
    );
  });
});
