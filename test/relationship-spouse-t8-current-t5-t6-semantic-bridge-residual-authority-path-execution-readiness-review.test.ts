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
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_EXECUTION_READINESS_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_EXECUTION_TASKS,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_READINESS_REVIEW_VERSION,
  buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReview,
} from '../src/research/relationship-spouse-t8-current-t5-t6-semantic-bridge-residual-authority-path-execution-readiness-review.js';

function acceptedResidualReassessment() {
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
  return buildRelationshipSpouseT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReview(
    executionEvidence,
  );
}

describe('Relationship spouse T8 residual authority-path execution readiness', () => {
  test('accepts the exact residual boundary and exposes four evidence-only execution tasks', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReview(
        acceptedResidualReassessment(),
      );

    expect(report.reviewVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_READINESS_REVIEW_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_READINESS',
    );
    expect(report.decision).toBe(
      'FOUR_RESIDUAL_RESEARCH_TASKS_EXECUTION_READY_NO_AUTHORITY_ACQUIRED_ALL_FIVE_GAPS_OPEN',
    );
    expect(report.executionTaskCount).toBe(4);
    expect(report.executionTasks).toEqual(
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_EXECUTION_TASKS,
    );
    expect(report.executablePathCount).toBe(4);
    expect(report.executablePathIds).toEqual([
      'WYG_0810_DIRECT_FACSIMILE_PAGE_BINDING',
      'YUANHAI_PRIMARY_WITNESS_CORROBORATION_UPGRADE',
      'MODERN_GENDER_NEUTRAL_SPOUSE_APPLICABILITY_AUTHORITY_DISCOVERY',
      'SPOUSE_MULTI_CLAIM_COMPOSITION_SCOPE_AUTHORITY_DISCOVERY',
    ]);
  });

  test('requires exact WYG folio-to-0810 page binding and direct image inspection', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReview(
        acceptedResidualReassessment(),
      );
    const task = report.executionTasks.find(
      (item) => item.taskId === 'WYG_0810_DIRECT_FACSIMILE_PAGE_BINDING_EXECUTION',
    );

    expect(report.wyg0810DirectFacsimileExecutionReady).toBe(true);
    expect(report.wyg0810ExactPageBindingRequired).toBe(true);
    expect(report.wyg0810DirectImageInspectionRequired).toBe(true);
    expect(task?.operations).toContain('BIND_WYG_FOLIO_TO_0810_SCAN_PAGE');
    expect(task?.operations).toContain('INSPECT_DIRECT_FACSIMILE_PAGE_IMAGE');
    expect(task?.operations).toContain('COMPARE_IMAGE_WITH_TRANSCRIPTION_OR_INDEXED_TEXT');
    expect(task?.allowedDispositions).toContain('PAGE_BINDING_NOT_ESTABLISHED');
    expect(task?.allowedDispositions).toContain('DIRECT_IMAGE_ACCESS_BLOCKED');
    expect(task?.authorityAdmissionOnCompletion).toBe(false);
    expect(task?.gapClosureOnCompletion).toBe(false);
  });

  test('requires an independent Yuanhai primary or verified witness and rejects transcription-only repetition', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReview(
        acceptedResidualReassessment(),
      );
    const task = report.executionTasks.find(
      (item) => item.taskId === 'YUANHAI_PRIMARY_WITNESS_CORROBORATION_UPGRADE_EXECUTION',
    );

    expect(report.yuanhaiPrimaryWitnessUpgradeExecutionReady).toBe(true);
    expect(report.yuanhaiAdditionalTranscriptionOnlyResultMayQualify).toBe(false);
    expect(task?.operations).toContain('DISCOVER_PRIMARY_OR_VERIFIED_YUANHAI_WITNESS');
    expect(task?.operations).toContain('INSPECT_DIRECT_FACSIMILE_PAGE_IMAGE');
    expect(task?.operations).toContain('VERIFY_INDEPENDENCE_FROM_SAMYEONG');
    expect(task?.allowedDispositions).toContain('PRIMARY_WITNESS_NOT_FOUND');
    expect(task?.allowedDispositions).toContain('PROVENANCE_INSUFFICIENT');
  });

  test('keeps modern applicability discovery separate and forbids sex inference or historical-source rewriting', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReview(
        acceptedResidualReassessment(),
      );
    const task = report.executionTasks.find(
      (item) =>
        item.taskId === 'MODERN_GENDER_NEUTRAL_SPOUSE_APPLICABILITY_AUTHORITY_DISCOVERY_EXECUTION',
    );

    expect(report.modernApplicabilityAuthorityDiscoveryExecutionReady).toBe(true);
    expect(report.rawHistoricalGenderRoleUniversalizationAuthorized).toBe(false);
    expect(task?.operations).toContain('DISCOVER_GENDER_NEUTRAL_APPLICABILITY_AUTHORITY');
    expect(task?.operations).toContain('VERIFY_NO_USER_OR_PARTNER_SEX_INFERENCE');
    expect(task?.operations).toContain('VERIFY_NO_HISTORICAL_SOURCE_MEANING_REWRITE');
    expect(task?.allowedDispositions).toContain('APPLICABILITY_AUTHORITY_NOT_FOUND');
    expect(task?.allowedDispositions).toContain('HISTORICAL_ROLE_ASSUMPTION_REQUIRED');
  });

  test('requires explicit multi-claim composition, conflict handling, scope limits, and exclusions', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReview(
        acceptedResidualReassessment(),
      );
    const task = report.executionTasks.find(
      (item) => item.taskId === 'SPOUSE_MULTI_CLAIM_COMPOSITION_SCOPE_AUTHORITY_DISCOVERY_EXECUTION',
    );

    expect(report.compositionScopeAuthorityDiscoveryExecutionReady).toBe(true);
    expect(report.singleSymbolOutcomeShortcutAuthorized).toBe(false);
    expect(task?.operations).toContain('DISCOVER_MULTI_CLAIM_COMPOSITION_SCOPE_AUTHORITY');
    expect(task?.operations).toContain('VERIFY_ELIGIBLE_UPSTREAM_CLAIM_CLASSES');
    expect(task?.operations).toContain('VERIFY_CONFLICT_AMBIGUITY_COMPOSITION_METHOD');
    expect(task?.operations).toContain('VERIFY_EXPLICIT_SCOPE_LIMITS_AND_EXCLUSIONS');
    expect(task?.operations).toContain('VERIFY_NO_SINGLE_SYMBOL_PARTNER_OUTCOME_SHORTCUT');
    expect(task?.allowedDispositions).toContain('COMPOSITION_SCOPE_AUTHORITY_NOT_FOUND');
  });

  test('preserves negative outcomes as first-class results with no fallback or stitching', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReview(
        acceptedResidualReassessment(),
      );

    expect(report.negativeEvidencePreservedAsFirstClassResult).toBe(true);
    expect(report.fallbackSemanticSynthesisAuthorized).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.crossTaskStitchingAuthorized).toBe(false);
    for (const task of report.executionTasks) {
      expect(task.evidenceContract.negativeResultMustBeRecorded).toBe(true);
      expect(task.evidenceContract.executionSuccessIsNotAuthorityAdmission).toBe(true);
      expect(task.evidenceContract.executionSuccessIsNotGapClosure).toBe(true);
      expect(task.evidenceContract.fallbackSemanticSynthesisAllowed).toBe(false);
      expect(task.evidenceContract.crossSourceStitchingForSameGapAllowed).toBe(false);
      expect(task.authorityAdmissionOnCompletion).toBe(false);
      expect(task.gapClosureOnCompletion).toBe(false);
      expect(task.spouseT8AuthoringOnCompletion).toBe(false);
    }
  });

  test('creates no relationship T6 path and keeps all five spouse gaps open with zero implementation effects', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReview(
        acceptedResidualReassessment(),
      );

    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.relationshipT6ExecutionTaskCreated).toBe(false);
    expect(report.allFiveGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toHaveLength(5);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
    expect(report.residualExecutionPerformedByThisGate).toBe(false);
    expect(report.spouseT8RuleAuthoringAuthorized).toBe(false);
    expect(report.spouseT8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.spouseInterpretationPackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.compatibilityAuthorityAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_EXECUTION_READINESS_CONTROL_IDS,
    );
    expect(report.controlCount).toBe(16);
    expect(report.controlsFrozen).toBe(true);
    expect(report.implementationEffects).toEqual({
      directWitnessAccessesPerformed: 0,
      primaryWitnessDiscoveryExecutionsPerformed: 0,
      authorityDiscoveryExecutionsPerformed: 0,
      evidenceRecordsCreated: 0,
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

  test('fails closed if the upstream residual reassessment identity is altered', () => {
    const residual = acceptedResidualReassessment();
    const altered = { ...residual, reviewId: `${residual.reviewId}_altered` };
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReview(
        altered,
      );

    expect(report.status).toBe('UPSTREAM_RESIDUAL_REASSESSMENT_BOUNDARY_INVALID');
    expect(report.exactResidualBoundaryAccepted).toBe(false);
    expect(report.executionTaskCount).toBe(0);
    expect(report.executionTasks).toEqual([]);
    expect(report.executablePathCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_REMEDIATION_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW',
    );
  });

  test('is deterministic and routes only to residual authority-path execution evidence', () => {
    const residual = acceptedResidualReassessment();
    const first =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReview(
        residual,
      );
    const second =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReview(
        residual,
      );

    expect(first).toEqual(second);
    const { reviewId, ...material } = first;
    expect(reviewId).toBe(
      `relationship_spouse_t8_current_bridge_residual_execution_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextGate).toBe(
      'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_EVIDENCE',
    );
  });
});
