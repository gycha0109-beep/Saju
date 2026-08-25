import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
  buildCareerPersonalizationBoundedT5T6T8SynthesisMethodologyReview,
} from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import { buildCareerPersonalizationPostP4T8ReadinessReview } from '../src/research/career-personalization-post-p4-t8-readiness-review.js';
import {
  CAREER_PERSONALIZATION_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW_VERSION,
  CAREER_T6_PUBLIC_CLASSIC_ALLOWED_QUALIFIER_IDS,
  CAREER_T6_PUBLIC_CLASSIC_CONTROL_IDS,
  type CareerT6PublicClassicBoundedScopeMethodologyReviewReport,
} from '../src/research/career-personalization-t6-public-classic-bounded-scope-methodology-review.js';
import { CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE_VERSION } from '../src/research/career-personalization-t6-methodology-gate.js';
import { buildCareerPersonalizationT8SynthesisAuthorityGapRequirementsReview } from '../src/research/career-personalization-t8-synthesis-authority-gap-requirements-review.js';
import { buildCareerPersonalizationT8SynthesisAuthorityAcquisitionReadinessReview } from '../src/research/career-personalization-t8-synthesis-authority-acquisition-readiness-review.js';
import { buildCareerPersonalizationT8SynthesisAuthorityCandidateDiscoveryEvidence } from '../src/research/career-personalization-t8-synthesis-authority-candidate-discovery-evidence.js';
import { buildCareerPersonalizationT8SynthesisAuthorityCandidateRequirementCoverageEvaluation } from '../src/research/career-personalization-t8-synthesis-authority-candidate-requirement-coverage-evaluation.js';
import { buildCareerPersonalizationT8SynthesisAuthorityResidualGapReassessmentReview } from '../src/research/career-personalization-t8-synthesis-authority-residual-gap-reassessment-review.js';
import { buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview } from '../src/research/career-personalization-t8-current-t5-t6-semantic-bridge-authority-acquisition-readiness-review.js';
import { buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence } from '../src/research/career-personalization-t8-current-t5-t6-semantic-bridge-authority-candidate-discovery-evidence.js';
import { buildCareerPersonalizationT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReview } from '../src/research/career-personalization-t8-current-t5-t6-semantic-bridge-targeted-source-access-requirements-review.js';
import { buildCareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReview } from '../src/research/career-personalization-t8-current-t5-t6-semantic-bridge-active-remediation-execution-readiness-review.js';
import { buildCareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidence } from '../src/research/career-personalization-t8-current-t5-t6-semantic-bridge-active-remediation-execution-evidence.js';
import {
  buildCareerPersonalizationT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReview,
  type CareerPersonalizationT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReviewReport,
} from '../src/research/career-personalization-t8-current-t5-t6-semantic-bridge-remediation-evidence-adequacy-residual-path-reassessment-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_READINESS_REVIEW_VERSION,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_EXECUTION_READINESS_CONTROL_IDS,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_EXECUTION_TASKS,
  buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReview,
} from '../src/research/career-personalization-t8-current-t5-t6-semantic-bridge-residual-authority-path-execution-readiness-review.js';

function acceptedP4(): CareerT6PublicClassicBoundedScopeMethodologyReviewReport {
  return {
    reviewId: 'career_t6_public_classic_scope_t8_bridge_b16_test',
    reviewVersion: CAREER_PERSONALIZATION_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW_VERSION,
    status: 'RESOLVED_CAREER_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW',
    decision:
      'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORIZED_FOR_RESEARCH_T6_RULE_AUTHORING_ONLY_QUALIFIERS_CONTEXT_ONLY_GENERAL_P3_BLOCK_PRESERVED_NO_DAMAGE_WINNER_T8_NARRATIVE_OR_PRODUCTION',
    upstreamP3Version: CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE_VERSION,
    upstreamI252ReviewId: 'i252_t8_bridge_b16_test',
    exactP3BoundaryAccepted: true,
    exactI252BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    reviewerStatus: 'unreviewed',
    scopedExceptionId: 'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_RESEARCH_T6',
    structuralTriggerKind: 'branch_clash',
    structuralTriggerMustBeT0Candidate: true,
    allowedQualifierIds: CAREER_T6_PUBLIC_CLASSIC_ALLOWED_QUALIFIER_IDS,
    allowedQualifierCount: 4,
    branchClashHiddenStemInteractionEligibilityT6AuthoringAuthorized: true,
    branchClashParticipantScopeRequired: true,
    qualifierOnlyContextAuthorized: true,
    generalHiddenStemInteractionStillBlocked: true,
    arbitraryHiddenStemCoPresenceInteractionAuthorized: false,
    nonClashHiddenStemInteractionAuthorized: false,
    visibilityMayCreateBinaryActivation: false,
    positionMayCreateNumericWeight: false,
    positionMayCreateZeroInteractionThreshold: false,
    seasonMayCreateNumericWeight: false,
    seasonMayChooseWinnerAutomatically: false,
    pluralityMayCreateNumericWeight: false,
    pluralityMayChooseWinnerAutomatically: false,
    damageMagnitudeAuthorized: false,
    destructionVerdictAuthorized: false,
    postRelationSettlementAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    multiTouchAggregationAuthorized: false,
    careerOutcomeSemanticAuthorizedByThisGate: false,
    careerT8SynthesisAuthorizedByThisGate: false,
    consumerNarrativeAuthorizedByThisGate: false,
    i232SohuTrackReopened: false,
    i232ProvenanceGapClosed: false,
    i248YudingTrackMutated: false,
    i211QuWeiTrackMutated: false,
    productionPromotionAuthorized: false,
    controlIds: CAREER_T6_PUBLIC_CLASSIC_CONTROL_IDS,
    controlCount: 18,
    controlsFrozen: true,
    implementationEffects: {
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: 'CAREER_PERSONALIZATION_T6_PUBLIC_CLASSIC_BOUNDED_RULE_CONTRACT',
  };
}

function acceptedB15() {
  const p4 = acceptedP4();
  const readiness = buildCareerPersonalizationPostP4T8ReadinessReview(p4);
  const b4 = buildCareerPersonalizationBoundedT5T6T8SynthesisMethodologyReview(p4, readiness);
  const b5 = buildCareerPersonalizationT8SynthesisAuthorityGapRequirementsReview(p4, readiness, b4);
  const b6 = buildCareerPersonalizationT8SynthesisAuthorityAcquisitionReadinessReview(p4, readiness, b4, b5);
  const b7 = buildCareerPersonalizationT8SynthesisAuthorityCandidateDiscoveryEvidence(p4, readiness, b4, b5, b6);
  const b8 = buildCareerPersonalizationT8SynthesisAuthorityCandidateRequirementCoverageEvaluation(b6, b7);
  const b9 = buildCareerPersonalizationT8SynthesisAuthorityResidualGapReassessmentReview(b8);
  const b10 = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview(b9);
  const b11 = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence(b10);
  const b12 = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReview(b11);
  const b13 = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReview(b12);
  const b14 = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidence(b13);
  return buildCareerPersonalizationT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReview(
    b14,
  );
}

describe('Career T8 current T5/T6 semantic bridge B16 residual authority path execution readiness', () => {
  test('accepts the exact B15 boundary and exposes exactly two executable discovery tasks', () => {
    const report = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReview(
      acceptedB15(),
    );

    expect(report.reviewVersion).toBe(
      CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_READINESS_REVIEW_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_CAREER_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_READINESS',
    );
    expect(report.executionTaskCount).toBe(2);
    expect(report.executionTasks).toEqual(CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_EXECUTION_TASKS);
  });

  test('keeps the Cheonbu external full-text path blocked and forbids public-web retry as execution progress', () => {
    const report = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReview(
      acceptedB15(),
    );

    expect(report.cheonbuExternalFullTextHoldPreserved).toBe(true);
    expect(report.cheonbuPublicWebRetryAuthorized).toBe(false);
    expect(report.cheonbuPathExecutionAuthorized).toBe(false);
    expect(report.executablePathIds).not.toContain('CHEONBU_EXTERNAL_FULL_TEXT_ACCESS_HOLD');
  });

  test('requires exact independent normative evidence for T5 multi-claim Career composition', () => {
    const report = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReview(
      acceptedB15(),
    );
    const task = report.executionTasks.find(
      (item) => item.taskId === 'T5_MULTI_ALTERNATE_NORMATIVE_SOURCE_DISCOVERY_EXECUTION',
    );

    expect(report.t5AlternateNormativeDiscoveryExecutionReady).toBe(true);
    expect(task?.operations).toContain('DISCOVER_INDEPENDENT_NORMATIVE_SOURCE');
    expect(task?.operations).toContain('ACQUIRE_REPRODUCIBLE_PASSAGE_LOCATOR');
    expect(task?.operations).toContain('VERIFY_EXACT_SUBTYPE_FAMILY_SEMANTICS');
    expect(task?.operations).toContain('VERIFY_MULTI_CLAIM_CAREER_WORK_COMPOSITION');
  });

  test('requires an explicit conflict or tension policy before T5 discovery may claim that dimension', () => {
    const report = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReview(
      acceptedB15(),
    );
    const task = report.executionTasks.find(
      (item) => item.taskId === 'T5_MULTI_ALTERNATE_NORMATIVE_SOURCE_DISCOVERY_EXECUTION',
    );

    expect(task?.operations).toContain('VERIFY_CONFLICT_TENSION_POLICY_IF_CLAIMED');
    expect(task?.evidenceContract.sourceBoundSemanticCorrespondenceRequired).toBe(true);
    expect(task?.evidenceContract.independentNormativeProvenanceRequired).toBe(true);
  });

  test('requires higher-provenance natal Career modifier evidence for T6 and rejects dynamic-event substitution', () => {
    const report = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReview(
      acceptedB15(),
    );
    const task = report.executionTasks.find(
      (item) => item.taskId === 'T6_HIGHER_PROVENANCE_NATAL_CAREER_SOURCE_DISCOVERY_EXECUTION',
    );

    expect(report.t6HigherProvenanceNatalDiscoveryExecutionReady).toBe(true);
    expect(task?.operations).toContain('DISCOVER_HIGHER_PROVENANCE_NATAL_SOURCE');
    expect(task?.operations).toContain('VERIFY_NATAL_NOT_DYNAMIC_EVENT_SEMANTICS');
    expect(task?.operations).toContain('VERIFY_CAREER_WORK_MODIFIER_SEMANTICS');
    expect(task?.operations).toContain('VERIFY_T6_RELATION_OR_QUALIFIER_CORRESPONDENCE');
  });

  test('keeps both execution tracks non-numeric and prevents silent competing-method import', () => {
    const report = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReview(
      acceptedB15(),
    );

    for (const task of report.executionTasks) {
      expect(task.operations).toContain('VERIFY_NON_NUMERIC_METHOD_COMPATIBILITY');
      expect(task.operations).toContain('VERIFY_NO_SILENT_COMPETING_METHOD_IMPORT');
      expect(task.evidenceContract.nonNumericMethodCompatibilityRequired).toBe(true);
    }
  });

  test('preserves negative discovery as a valid result without fallback synthesis or cross-source stitching', () => {
    const report = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReview(
      acceptedB15(),
    );

    expect(report.negativeDiscoveryPreservedAsFirstClassResult).toBe(true);
    expect(report.fallbackAuthoritySynthesisAuthorized).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.executionTasks.every((task) => task.allowedDispositions.includes('NO_QUALIFYING_CANDIDATE_FOUND'))).toBe(
      true,
    );
    expect(report.executionTasks.every((task) => task.evidenceContract.fallbackSynthesisAllowed === false)).toBe(true);
  });

  test('keeps all six authority gaps open and creates no interpretation or production artifacts', () => {
    const report = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReview(
      acceptedB15(),
    );

    expect(report.allSixGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
    expect(report.discoveryPerformedByThisGate).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.implementationEffects).toEqual({
      externalAccessesPerformed: 0,
      discoveryExecutionsPerformed: 0,
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

  test('fails closed when the content-addressed B15 boundary is tampered', () => {
    const b15 = acceptedB15();
    const tampered = {
      ...b15,
      activeAlternateDiscoveryPathCount: 1,
    } as unknown as CareerPersonalizationT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReviewReport;
    const report = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReview(
      tampered,
    );

    expect(report.status).toBe('UPSTREAM_B15_BOUNDARY_INVALID');
    expect(report.exactB15BoundaryAccepted).toBe(false);
    expect(report.executionTasks).toEqual([]);
    expect(report.executionTaskCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
  });

  test('is deterministic, freezes controls, and routes only to residual discovery evidence', () => {
    const b15 = acceptedB15();
    const first = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReview(
      b15,
    );
    const second = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReview(
      b15,
    );

    expect(first.reviewId).toBe(second.reviewId);
    expect(deterministicContentHash(first)).toBe(deterministicContentHash(second));
    expect(first.executablePathCount).toBe(2);
    expect(first.controlIds).toEqual(CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_EXECUTION_READINESS_CONTROL_IDS);
    expect(first.controlCount).toBe(12);
    expect(first.controlsFrozen).toBe(true);
    expect(first.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_DISCOVERY_EVIDENCE',
    );
  });
});
