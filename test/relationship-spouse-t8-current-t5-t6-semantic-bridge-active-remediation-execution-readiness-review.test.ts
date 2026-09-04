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
import {
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_TASKS,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_READINESS_REVIEW_VERSION,
  buildRelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReview,
} from '../src/research/relationship-spouse-t8-current-t5-t6-semantic-bridge-active-remediation-execution-readiness-review.js';

function acceptedSourceAccess() {
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
    buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview(
      residual,
    );
  const bridgeDiscovery =
    buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence(
      bridgeReadiness,
    );
  return buildRelationshipSpouseT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReview(
    bridgeDiscovery,
  );
}

describe('Relationship spouse T8 current T5/T6 active remediation execution readiness', () => {
  test('authorizes exactly three evidence-only execution tasks from active primary tracks', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReview(
        acceptedSourceAccess(),
      );

    expect(report.reviewVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_READINESS_REVIEW_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_READINESS',
    );
    expect(report.decision).toBe(
      'THREE_ACTIVE_PRIMARY_REMEDIATION_TASKS_EXECUTION_READY_EVIDENCE_ONLY_NO_AUTHORITY_ACQUIRED',
    );
    expect(report.executionTaskCount).toBe(3);
    expect(report.executionTasks).toEqual(
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_TASKS,
    );
    expect(report.executableTrackIds).toEqual([
      'SAMYEONG_V5_WYG_FACSIMILE_WITNESS_ACCESS',
      'SAMYEONG_V6_WYG_OFFICER_WEALTH_FACSIMILE_WITNESS_ACCESS',
      'MODERN_SPOUSE_PRODUCT_SCOPE_ADJUDICATION',
    ]);
    expect(report.executableTrackCount).toBe(3);
    expect(report.tasksMayRunIndependently).toBe(true);
  });

  test('requires direct WYG facsimile image inspection for volume five and preserves blocked results', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReview(
        acceptedSourceAccess(),
      );
    const task = report.executionTasks.find(
      (item) => item.taskId === 'SAMYEONG_V5_FACSIMILE_WITNESS_INSPECTION_EXECUTION',
    );

    expect(report.samyeongV5FacsimileInspectionExecutionReady).toBe(true);
    expect(report.samyeongV5DirectImageRequired).toBe(true);
    expect(report.samyeongV5AccessBlockedMayBeRecordedWithoutFallback).toBe(true);
    expect(report.samyeongV5IndependentCorroborationDiscoveryRequired).toBe(true);
    expect(report.samyeongV5ExistingWealthCorrespondenceAutoAcceptedOnImageMatch).toBe(false);
    expect(task?.operations).toContain('ACQUIRE_DIRECT_FACSIMILE_PAGE_IMAGE');
    expect(task?.operations).toContain('COMPARE_INDEXED_TRANSCRIPTION_TO_IMAGE');
    expect(task?.operations).toContain('EVALUATE_SOURCE_BOUND_CURRENT_T5_WEALTH_CORRESPONDENCE');
    expect(task?.allowedResultDispositions).toContain('ACCESS_BLOCKED');
    expect(task?.allowedResultDispositions).toContain('PARTIAL_EVIDENCE_ACQUIRED');
    expect(task?.evidenceContract.directFacsimileImageInspectionRequired).toBe(true);
    expect(task?.evidenceContract.indexedTranscriptionMaySubstituteForFacsimileInspection).toBe(false);
    expect(task?.authorityAcceptanceOnCompletion).toBe(false);
  });

  test('requires separate officer and wealth correspondence assessment for volume six', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReview(
        acceptedSourceAccess(),
      );
    const task = report.executionTasks.find(
      (item) =>
        item.taskId === 'SAMYEONG_V6_OFFICER_WEALTH_FACSIMILE_WITNESS_INSPECTION_EXECUTION',
    );

    expect(report.samyeongV6FacsimileInspectionExecutionReady).toBe(true);
    expect(report.samyeongV6DirectImageRequired).toBe(true);
    expect(report.samyeongV6AccessBlockedMayBeRecordedWithoutFallback).toBe(true);
    expect(report.samyeongV6OfficerCorrespondenceAutoAcceptedOnImageMatch).toBe(false);
    expect(report.samyeongV6WealthCorrespondenceAutoAcceptedOnImageMatch).toBe(false);
    expect(task?.operations).toContain('EVALUATE_SOURCE_BOUND_CURRENT_T5_OFFICER_CORRESPONDENCE');
    expect(task?.operations).toContain('EVALUATE_SOURCE_BOUND_CURRENT_T5_WEALTH_CORRESPONDENCE');
    expect(task?.evidenceContract.directFacsimileImageInspectionRequired).toBe(true);
    expect(task?.authorityGapClosureOnCompletion).toBe(false);
  });

  test('keeps modern product-scope adjudication separate from historical source meaning', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReview(
        acceptedSourceAccess(),
      );
    const task = report.executionTasks.find(
      (item) => item.taskId === 'MODERN_SPOUSE_PRODUCT_SCOPE_ADJUDICATION_EXECUTION',
    );

    expect(report.modernSpouseScopeAdjudicationExecutionReady).toBe(true);
    expect(report.modernScopeMayRewriteHistoricalSourceMeaning).toBe(false);
    expect(report.modernScopeMayInferUserOrPartnerSex).toBe(false);
    expect(report.modernScopeMayPromotePartnerAttributesOrOutcomes).toBe(false);
    expect(report.modernScopeMayPromoteCompatibilityOrTiming).toBe(false);
    expect(report.modernScopeIncompatibleMayBeRecordedWithoutFallback).toBe(true);
    expect(task?.evidenceContract.directFacsimileImageInspectionRequired).toBe(false);
    expect(task?.evidenceContract.historicalSourceMeaningMustRemainDistinctFromProductPolicy).toBe(true);
    expect(task?.operations).toContain(
      'DISTINGUISH_HISTORICAL_SOURCE_MEANING_FROM_MODERN_PRODUCT_APPLICABILITY',
    );
    expect(task?.operations).toContain('VERIFY_NO_SOURCE_MEANING_REWRITE');
    expect(task?.allowedResultDispositions).toContain('MODERN_SCOPE_INCOMPATIBLE');
    expect(task?.allowedResultDispositions).toContain('MODERN_SCOPE_REQUIRES_ADDITIONAL_AUTHORITY');
  });

  test('does not authorize secondary Ditian, competing methods, or a relationship T6 task', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReview(
        acceptedSourceAccess(),
      );

    expect(report.secondaryDitianClarificationExecutionAuthorized).toBe(false);
    expect(report.competingHistoricalMethodExecutionAuthorized).toBe(false);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.currentRelationshipT6ExecutionTaskCreated).toBe(false);
    expect(report.executionTasks.some((task) => task.sourceTrackId.includes('DITIAN'))).toBe(false);
    expect(report.executionTasks.some((task) => task.sourceTrackId.toLowerCase().includes('t6'))).toBe(false);
  });

  test('treats negative and blocked outcomes as first-class evidence without fallback synthesis', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReview(
        acceptedSourceAccess(),
      );

    expect(report.negativeEvidencePreservedAsFirstClassResult).toBe(true);
    expect(report.crossTaskStitchingAuthorized).toBe(false);
    for (const task of report.executionTasks) {
      expect(task.evidenceContract.negativeOrBlockedResultMustBeRecorded).toBe(true);
      expect(task.evidenceContract.accessSuccessIsNotAuthorityAcceptance).toBe(true);
      expect(task.evidenceContract.scopeAdjudicationSuccessIsNotAuthorityAcceptance).toBe(true);
      expect(task.evidenceContract.crossTaskEvidenceStitchingForSameGapAllowed).toBe(false);
      expect(task.authorityAcceptanceOnCompletion).toBe(false);
      expect(task.authorityGapClosureOnCompletion).toBe(false);
      expect(task.spouseT8AuthoringOnCompletion).toBe(false);
      expect(task.currentRelationshipT6CreationOnCompletion).toBe(false);
    }
  });

  test('keeps all five gaps open and creates no executable interpretation artifacts', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReview(
        acceptedSourceAccess(),
      );

    expect(report.allFiveGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toHaveLength(5);
    expect(report.sourceAccessPerformedByThisGate).toBe(false);
    expect(report.scopeAdjudicationPerformedByThisGate).toBe(false);
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
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_CONTROL_IDS,
    );
    expect(report.controlCount).toBe(16);
    expect(report.controlsFrozen).toBe(true);
    expect(report.implementationEffects).toEqual({
      sourceAccessesPerformed: 0,
      scopeAdjudicationsPerformed: 0,
      searchExecutionsPerformed: 0,
      evidenceRecordsCreated: 0,
      candidatesRegistered: 0,
      authorityCandidatesAccepted: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    });
  });

  test('fails closed when the upstream source-access review identity is altered', () => {
    const sourceAccess = acceptedSourceAccess();
    const altered = {
      ...sourceAccess,
      reviewId: `${sourceAccess.reviewId}_altered`,
    };
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReview(
        altered,
      );

    expect(report.status).toBe('UPSTREAM_SOURCE_ACCESS_REQUIREMENTS_BOUNDARY_INVALID');
    expect(report.exactSourceAccessBoundaryAccepted).toBe(false);
    expect(report.executionTaskCount).toBe(0);
    expect(report.executionTasks).toEqual([]);
    expect(report.executableTrackCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_TARGETED_SOURCE_ACCESS_REQUIREMENTS_REVIEW',
    );
  });

  test('is deterministic and routes only to remediation execution evidence', () => {
    const sourceAccess = acceptedSourceAccess();
    const first =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReview(
        sourceAccess,
      );
    const second =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReview(
        sourceAccess,
      );

    expect(first).toEqual(second);
    const { reviewId, ...material } = first;
    expect(reviewId).toBe(
      `relationship_spouse_t8_current_bridge_active_remediation_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextGate).toBe(
      'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_EVIDENCE',
    );
  });
});
