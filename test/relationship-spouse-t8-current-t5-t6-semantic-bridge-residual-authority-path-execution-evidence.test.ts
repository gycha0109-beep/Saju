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
import {
  buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReview,
  type RelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReviewReport,
} from '../src/research/relationship-spouse-t8-current-t5-t6-semantic-bridge-residual-authority-path-execution-readiness-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_EXECUTION_CANDIDATES,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_EXECUTION_EVIDENCE_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_TASK_EXECUTION_EVIDENCE,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_EVIDENCE_VERSION,
  buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionEvidence,
} from '../src/research/relationship-spouse-t8-current-t5-t6-semantic-bridge-residual-authority-path-execution-evidence.js';

function acceptedReadiness() {
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
  return buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReview(
    residualReassessment,
  );
}

describe('Relationship spouse T8 residual authority-path execution evidence', () => {
  test('accepts the exact readiness boundary and records four task outcomes from ten attempts', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionEvidence(
        acceptedReadiness(),
      );

    expect(report.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_EVIDENCE_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_EVIDENCE',
    );
    expect(report.executionPerformed).toBe(true);
    expect(report.taskEvidenceRecordCount).toBe(4);
    expect(report.taskEvidenceRecords).toEqual(
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_TASK_EXECUTION_EVIDENCE,
    );
    expect(report.totalCandidateAttemptCount).toBe(10);
    expect(report.candidateEvidence).toEqual(
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_EXECUTION_CANDIDATES,
    );
    expect(report.qualifyingCandidateCount).toBe(0);
  });

  test('locates the 0810 scan container but does not falsely claim target-page binding or image inspection', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionEvidence(
        acceptedReadiness(),
      );
    const record = report.taskEvidenceRecords.find(
      (item) => item.taskId === 'WYG_0810_DIRECT_FACSIMILE_PAGE_BINDING_EXECUTION',
    );

    expect(report.wyg0810ScanContainerLocated).toBe(true);
    expect(report.wyg0810SamyeongRangeKnown).toBe(true);
    expect(report.wyg0810FolioToScanPageBindingEstablished).toBe(false);
    expect(report.wyg0810DirectTargetPageImageInspected).toBe(false);
    expect(report.kanripoWygV5BoundedTextContextConfirmed).toBe(true);
    expect(report.kanripoWygV6BoundedTextContextConfirmed).toBe(true);
    expect(record?.primaryDisposition).toBe('PAGE_BINDING_NOT_ESTABLISHED');
    expect(record?.secondaryDispositions).toContain('PARTIAL_EVIDENCE_ACQUIRED');
    expect(
      report.candidateEvidence
        .filter((item) => item.taskId === 'WYG_0810_DIRECT_FACSIMILE_PAGE_BINDING_EXECUTION')
        .every((item) => item.directFacsimilePageImageInspected === false),
    ).toBe(true);
  });

  test('upgrades Yuanhai from a transcription lead to primary-scan candidates without claiming passage verification', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionEvidence(
        acceptedReadiness(),
      );
    const yuanhai = report.taskEvidenceRecords.find(
      (item) => item.taskId === 'YUANHAI_PRIMARY_WITNESS_CORROBORATION_UPGRADE_EXECUTION',
    );

    expect(report.yuanhaiPrimaryHistoricalScanCandidateCount).toBe(2);
    expect(report.yuanhaiPrimaryWitnessCandidateLocated).toBe(true);
    expect(report.yuanhaiExactPrimaryPassagePageLocatorEstablished).toBe(false);
    expect(report.yuanhaiDirectPrimaryPassageImageInspected).toBe(false);
    expect(report.yuanhaiBoundedOcrSpouseRoleContextConfirmed).toBe(true);
    expect(report.yuanhaiIndependentFromSamyeongAtWorkIdentityLevel).toBe(true);
    expect(report.independentNormativeProvenanceEstablished).toBe(false);
    expect(yuanhai?.primaryDisposition).toBe('PARTIAL_EVIDENCE_ACQUIRED');
    expect(yuanhai?.secondaryDispositions).toContain('PROVENANCE_INSUFFICIENT');
  });

  test('records modern gender-neutral policy leads as partial discovery evidence only', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionEvidence(
        acceptedReadiness(),
      );
    const leads = report.candidateEvidence.filter(
      (item) =>
        item.taskId === 'MODERN_GENDER_NEUTRAL_SPOUSE_APPLICABILITY_AUTHORITY_DISCOVERY_EXECUTION',
    );

    expect(report.modernApplicabilityPolicyLeadCount).toBe(2);
    expect(report.modernGenderNeutralPolicyPatternObserved).toBe(true);
    expect(report.modernNoSexInferencePolicyPatternObserved).toBe(true);
    expect(report.modernApplicabilityNormativeAuthorityAdequateCount).toBe(0);
    expect(leads.every((item) => item.genderNeutralApplicabilityPolicyExplicit)).toBe(true);
    expect(leads.every((item) => item.noSexOrOrientationInferencePolicyExplicit)).toBe(true);
    expect(leads.every((item) => item.independentNormativeProvenanceAdequate === false)).toBe(true);
    expect(leads.every((item) => item.qualifyingCandidate === false)).toBe(true);
  });

  test('records multi-layer composition leads without inventing exact current claim-class authority', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionEvidence(
        acceptedReadiness(),
      );
    const leads = report.candidateEvidence.filter(
      (item) => item.taskId === 'SPOUSE_MULTI_CLAIM_COMPOSITION_SCOPE_AUTHORITY_DISCOVERY_EXECUTION',
    );

    expect(report.compositionScopeLeadCount).toBe(2);
    expect(report.multiLayerCompositionPatternObserved).toBe(true);
    expect(report.conflictAmbiguityPatternObserved).toBe(true);
    expect(report.scopeExclusionPatternObserved).toBe(true);
    expect(report.exactCurrentClaimClassCompositionAuthorityEstablished).toBe(false);
    expect(report.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(leads.every((item) => item.multiClaimCompositionPatternExplicit)).toBe(true);
    expect(leads.every((item) => item.independentNormativeProvenanceAdequate === false)).toBe(true);
  });

  test('preserves all five gaps and creates no semantic or product authority', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionEvidence(
        acceptedReadiness(),
      );

    expect(report.negativeAndPartialEvidencePreserved).toBe(true);
    expect(report.fallbackSemanticSynthesisAuthorized).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.crossTaskStitchingAuthorized).toBe(false);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.relationshipT6ExecutionTaskCreated).toBe(false);
    expect(report.allFiveGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toHaveLength(5);
    expect(report.authorityAcceptedCandidateCount).toBe(0);
    expect(report.authorityGapClosedCount).toBe(0);
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
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_EXECUTION_EVIDENCE_CONTROL_IDS,
    );
    expect(report.controlCount).toBe(14);
    expect(report.controlsFrozen).toBe(true);
    expect(report.implementationEffects).toEqual({
      candidateAttemptsRecorded: 10,
      evidenceRecordsCreated: 4,
      registeredSourcesCreated: 0,
      registeredCandidatesCreated: 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    });
  });

  test('fails closed when the readiness content-addressed boundary is altered', () => {
    const readiness = acceptedReadiness();
    const altered = {
      ...readiness,
      executionTaskCount: 3,
    } as unknown as RelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReviewReport;
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionEvidence(altered);

    expect(report.status).toBe('UPSTREAM_RESIDUAL_EXECUTION_READINESS_BOUNDARY_INVALID');
    expect(report.exactReadinessBoundaryAccepted).toBe(false);
    expect(report.executionPerformed).toBe(false);
    expect(report.taskEvidenceRecordCount).toBe(0);
    expect(report.taskEvidenceRecords).toEqual([]);
    expect(report.totalCandidateAttemptCount).toBe(0);
    expect(report.candidateEvidence).toEqual([]);
    expect(report.controlsFrozen).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_READINESS_REVIEW',
    );
  });

  test('is deterministic and routes only to evidence adequacy / method-boundary reassessment', () => {
    const readiness = acceptedReadiness();
    const first =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionEvidence(readiness);
    const second =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionEvidence(readiness);

    expect(first).toEqual(second);
    const { evidenceId, ...material } = first;
    expect(evidenceId).toBe(
      `relationship_spouse_t8_current_bridge_residual_execution_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextGate).toBe(
      'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT_REVIEW',
    );
  });
});
