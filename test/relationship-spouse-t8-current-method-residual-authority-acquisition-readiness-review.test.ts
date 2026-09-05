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
import {
  buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReview,
  type RelationshipSpouseT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReviewReport,
} from '../src/research/relationship-spouse-t8-current-t5-t6-semantic-bridge-residual-discovery-evidence-adequacy-method-boundary-reassessment-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION,
  RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_TASKS,
  buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionReadinessReview,
} from '../src/research/relationship-spouse-t8-current-method-residual-authority-acquisition-readiness-review.js';

function acceptedMethodBoundary() {
  const discoveryReadiness = buildRelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReview(
    buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview(),
  );
  const discoveryEvidence = buildRelationshipSpouseT8AuthorityCandidateDiscoveryEvidence(discoveryReadiness);
  const coverage = buildRelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluation(
    discoveryReadiness,
    discoveryEvidence,
  );
  const residual = buildRelationshipSpouseT8AuthorityResidualGapReassessmentReview(coverage);
  const bridgeReadiness = buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview(residual);
  const bridgeDiscovery = buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence(bridgeReadiness);
  const sourceAccess = buildRelationshipSpouseT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReview(bridgeDiscovery);
  const executionReadiness = buildRelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReview(sourceAccess);
  const executionEvidence = buildRelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidence(executionReadiness);
  const residualReassessment = buildRelationshipSpouseT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReview(executionEvidence);
  const residualExecutionReadiness = buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReview(residualReassessment);
  const residualExecutionEvidence = buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionEvidence(residualExecutionReadiness);
  return buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReview(residualExecutionEvidence);
}

describe('Relationship spouse T8 current-method residual authority acquisition readiness', () => {
  test('accepts the exact method boundary and exposes four acquisition tasks', () => {
    const report = buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionReadinessReview(acceptedMethodBoundary());

    expect(report.reviewVersion).toBe(RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION);
    expect(report.status).toBe('RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS');
    expect(report.decision).toBe('FOUR_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_TASKS_READY_NO_AUTHORITY_ACQUIRED');
    expect(report.acquisitionTaskCount).toBe(4);
    expect(report.acquisitionTasks).toEqual(RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_TASKS);
    expect(report.executableResidualClassIds).toEqual([
      'WYG_DIRECT_PRIMARY_IMAGE_VERIFICATION_FRONTIER',
      'YUANHAI_PRIMARY_PASSAGE_VERIFICATION_FRONTIER',
      'MODERN_APPLICABILITY_NORMATIVE_PROVENANCE_FRONTIER',
      'EXACT_CURRENT_CLAIM_CLASS_COMPOSITION_AUTHORITY_FRONTIER',
    ]);
  });

  test('requires direct primary-image verification for WYG and Yuanhai', () => {
    const report = buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionReadinessReview(acceptedMethodBoundary());
    const wyg = report.acquisitionTasks.find((item) => item.taskId === 'WYG_DIRECT_PRIMARY_IMAGE_AUTHORITY_ACQUISITION');
    const yuanhai = report.acquisitionTasks.find((item) => item.taskId === 'YUANHAI_PRIMARY_PASSAGE_AUTHORITY_ACQUISITION');

    expect(report.wygDirectPrimaryImageAcquisitionReady).toBe(true);
    expect(report.yuanhaiPrimaryPassageAcquisitionReady).toBe(true);
    expect(wyg?.operations).toContain('BIND_WYG_FOLIO_TO_0810_SCAN_PAGE');
    expect(wyg?.operations).toContain('INSPECT_DIRECT_PRIMARY_PAGE_IMAGE');
    expect(yuanhai?.operations).toContain('INSPECT_DIRECT_PRIMARY_PAGE_IMAGE');
    expect(yuanhai?.operations).toContain('VERIFY_YUANHAI_PASSAGE_INDEPENDENCE_FROM_SAMYEONG');
    expect(wyg?.evidenceContract.ocrOrIndexedTextMaySubstituteForRequiredPrimaryImage).toBe(false);
    expect(yuanhai?.evidenceContract.ocrOrIndexedTextMaySubstituteForRequiredPrimaryImage).toBe(false);
  });

  test('requires higher-provenance modern applicability authority without historical-role rewriting', () => {
    const report = buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionReadinessReview(acceptedMethodBoundary());
    const task = report.acquisitionTasks.find((item) => item.taskId === 'MODERN_APPLICABILITY_NORMATIVE_PROVENANCE_ACQUISITION');

    expect(report.modernApplicabilityProvenanceAcquisitionReady).toBe(true);
    expect(task?.operations).toContain('DISCOVER_HIGHER_PROVENANCE_MODERN_APPLICABILITY_AUTHORITY');
    expect(task?.operations).toContain('VERIFY_GENDER_NEUTRAL_PRODUCT_APPLICABILITY_EXPLICIT');
    expect(task?.operations).toContain('VERIFY_NO_USER_PARTNER_SEX_OR_ORIENTATION_INFERENCE');
    expect(task?.evidenceContract.historicalGenderRoleMayBeUniversalizedAutomatically).toBe(false);
  });

  test('requires exact current claim classes, conflict policy, and scope exclusions for composition', () => {
    const report = buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionReadinessReview(acceptedMethodBoundary());
    const task = report.acquisitionTasks.find((item) => item.taskId === 'EXACT_CURRENT_CLAIM_CLASS_COMPOSITION_AUTHORITY_ACQUISITION');

    expect(report.exactCurrentClaimClassCompositionAcquisitionReady).toBe(true);
    expect(task?.operations).toContain('DISCOVER_EXACT_CURRENT_CLAIM_CLASS_COMPOSITION_AUTHORITY');
    expect(task?.operations).toContain('VERIFY_ELIGIBLE_UPSTREAM_CLAIM_CLASSES_EXPLICIT');
    expect(task?.operations).toContain('VERIFY_CONFLICT_AMBIGUITY_POLICY_EXPLICIT');
    expect(task?.operations).toContain('VERIFY_POSITIVE_SCOPE_EXCLUSIONS_EXCEPTIONS_EXPLICIT');
    expect(task?.operations).toContain('VERIFY_NO_SINGLE_SYMBOL_PARTNER_OUTCOME_SHORTCUT');
  });

  test('allows evidence acquisition without using human methodology choice as substitute authority', () => {
    const report = buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionReadinessReview(acceptedMethodBoundary());

    expect(report.currentMethodEvidenceAcquisitionMayContinueWithoutHumanMethodologyChoice).toBe(true);
    expect(report.acquisitionExecutionAuthorizedForNextGate).toBe(true);
    expect(report.methodologyChoiceMadeByThisGate).toBe(false);
    for (const task of report.acquisitionTasks) {
      expect(task.evidenceContract.humanMethodologyChoiceMaySubstituteForMissingAuthority).toBe(false);
      expect(task.evidenceContract.separateSourcesMayBeModelStitchedIntoUnstatedBridge).toBe(false);
      expect(task.evidenceContract.crossSourceCompositionForSameGapAllowed).toBe(false);
      expect(task.authorityAdmissionOnCompletion).toBe(false);
      expect(task.gapClosureOnCompletion).toBe(false);
      expect(task.spouseT8AuthoringOnCompletion).toBe(false);
    }
  });

  test('keeps all five gaps open and creates no semantic or product artifacts', () => {
    const report = buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionReadinessReview(acceptedMethodBoundary());

    expect(report.acquisitionPerformedByThisGate).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.allFiveGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toHaveLength(5);
    expect(report.spouseT8RuleAuthoringAuthorized).toBe(false);
    expect(report.spouseT8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.spouseInterpretationPackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.compatibilityAuthorityAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_CONTROL_IDS);
    expect(report.controlCount).toBe(14);
    expect(report.controlsFrozen).toBe(true);
    expect(report.implementationEffects).toEqual({
      acquisitionExecutionsPerformed: 0,
      sourcesDiscovered: 0,
      candidatesRegistered: 0,
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

  test('fails closed if upstream method-boundary review is altered', () => {
    const boundary = acceptedMethodBoundary();
    const altered = { ...boundary, residualClassCount: 3 } as unknown as RelationshipSpouseT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReviewReport;
    const report = buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionReadinessReview(altered);

    expect(report.status).toBe('UPSTREAM_METHOD_BOUNDARY_REASSESSMENT_INVALID');
    expect(report.exactMethodBoundaryAccepted).toBe(false);
    expect(report.acquisitionTasks).toEqual([]);
    expect(report.acquisitionTaskCount).toBe(0);
    expect(report.executableResidualClassCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.recommendedNextGate).toBe('RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT_REVIEW');
  });

  test('is deterministic and routes only to current-method residual acquisition evidence', () => {
    const boundary = acceptedMethodBoundary();
    const first = buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionReadinessReview(boundary);
    const second = buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionReadinessReview(boundary);

    expect(first).toEqual(second);
    const { reviewId, ...material } = first;
    expect(reviewId).toBe(`relationship_spouse_t8_current_method_residual_authority_acquisition_readiness_${deterministicContentHash(material).slice(0, 24)}`);
    expect(first.recommendedNextGate).toBe('RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE');
  });
});
