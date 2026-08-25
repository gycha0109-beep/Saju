import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildCareerPersonalizationBoundedT5T6T8SynthesisMethodologyReview } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
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
import {
  buildCareerPersonalizationT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReview,
  type CareerPersonalizationT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReviewReport,
} from '../src/research/career-personalization-t8-current-t5-t6-semantic-bridge-targeted-source-access-requirements-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_READINESS_REVIEW_VERSION,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_CONTROL_IDS,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_TASKS,
  buildCareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReview,
} from '../src/research/career-personalization-t8-current-t5-t6-semantic-bridge-active-remediation-execution-readiness-review.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';

function acceptedP4(): CareerT6PublicClassicBoundedScopeMethodologyReviewReport {
  return {
    reviewId: 'career_t6_public_classic_scope_t8_bridge_b13_test',
    reviewVersion: CAREER_PERSONALIZATION_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW_VERSION,
    status: 'RESOLVED_CAREER_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW',
    decision:
      'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORIZED_FOR_RESEARCH_T6_RULE_AUTHORING_ONLY_QUALIFIERS_CONTEXT_ONLY_GENERAL_P3_BLOCK_PRESERVED_NO_DAMAGE_WINNER_T8_NARRATIVE_OR_PRODUCTION',
    upstreamP3Version: CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE_VERSION,
    upstreamI252ReviewId: 'i252_t8_bridge_b13_test',
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

function acceptedB12() {
  const p4 = acceptedP4();
  const readiness = buildCareerPersonalizationPostP4T8ReadinessReview(p4);
  const b4 = buildCareerPersonalizationBoundedT5T6T8SynthesisMethodologyReview(p4, readiness);
  const b5 = buildCareerPersonalizationT8SynthesisAuthorityGapRequirementsReview(p4, readiness, b4);
  const b6 = buildCareerPersonalizationT8SynthesisAuthorityAcquisitionReadinessReview(p4, readiness, b4, b5);
  const b7 = buildCareerPersonalizationT8SynthesisAuthorityCandidateDiscoveryEvidence(
    p4,
    readiness,
    b4,
    b5,
    b6,
  );
  const b8 = buildCareerPersonalizationT8SynthesisAuthorityCandidateRequirementCoverageEvaluation(b6, b7);
  const b9 = buildCareerPersonalizationT8SynthesisAuthorityResidualGapReassessmentReview(b8);
  const b10 = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview(b9);
  const b11 = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence(b10);
  return buildCareerPersonalizationT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReview(b11);
}

describe('Career T8 current T5/T6 semantic bridge active remediation execution readiness', () => {
  test('turns exactly the two B12 active-primary tracks into two evidence-only execution tasks', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReview(
        acceptedB12(),
      );

    expect(report.reviewVersion).toBe(
      CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_READINESS_REVIEW_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_CAREER_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_READINESS',
    );
    expect(report.executionTaskCount).toBe(2);
    expect(report.executionTasks).toEqual(CAREER_T8_CURRENT_T5_T6_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_TASKS);
    expect(report.executableTrackIds).toEqual([
      'CHEONBU_EXACT_PASSAGE_ACCESS',
      'T6_NATAL_CAREER_MODIFIER_NEW_CANDIDATE_DISCOVERY',
    ]);
  });

  test('Cheonbu execution requires identity, exact page, local context, method classification, correspondence, and corroboration', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReview(
        acceptedB12(),
      );
    const task = report.executionTasks.find(
      (item) => item.taskId === 'CHEONBU_PRIMARY_SOURCE_ACCESS_EXECUTION',
    );

    expect(task?.operations).toEqual([
      'CONFIRM_SOURCE_IDENTITY',
      'ACQUIRE_EXACT_SECTION_PAGE_LOCATOR',
      'INSPECT_BOUNDED_FULL_LOCAL_CONTEXT',
      'CLASSIFY_METHOD_INGREDIENTS',
      'EVALUATE_SOURCE_BOUND_CURRENT_CLAIM_CORRESPONDENCE',
      'DISCOVER_INDEPENDENT_NORMATIVE_CORROBORATION',
    ]);
    expect(report.cheonbuSourceAccessExecutionReady).toBe(true);
    expect(report.cheonbuIndependentCorroborationDiscoveryRequired).toBe(true);
    expect(task?.authorityAcceptanceOnCompletion).toBe(false);
    expect(task?.authorityGapClosureOnCompletion).toBe(false);
  });

  test('records blocked Cheonbu access as a valid research result without fallback authority', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReview(
        acceptedB12(),
      );
    const task = report.executionTasks.find(
      (item) => item.taskId === 'CHEONBU_PRIMARY_SOURCE_ACCESS_EXECUTION',
    );

    expect(task?.allowedResultDispositions).toContain('ACCESS_BLOCKED');
    expect(task?.evidenceContract.negativeOrBlockedResultMustBeRecorded).toBe(true);
    expect(task?.evidenceContract.accessSuccessIsNotAuthorityAcceptance).toBe(true);
    expect(report.cheonbuAccessBlockedMayBeRecordedWithoutFallback).toBe(true);
    expect(report.authorityAcquiredByThisGate).toBe(false);
  });

  test('T6 execution requires a genuinely new natal Career-modifier candidate and rejects dynamic-event reuse', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReview(
        acceptedB12(),
      );
    const task = report.executionTasks.find(
      (item) => item.taskId === 'T6_NATAL_CAREER_MODIFIER_CANDIDATE_DISCOVERY_EXECUTION',
    );

    expect(task?.operations).toContain('DISCOVER_NEW_NATAL_CAREER_MODIFIER_CANDIDATE');
    expect(task?.operations).toContain('VERIFY_NATAL_NOT_DYNAMIC_EVENT_SEMANTICS');
    expect(report.t6NewCandidateDiscoveryExecutionReady).toBe(true);
    expect(report.t6DynamicEventCandidateReuseAuthorized).toBe(false);
    expect(task?.allowedResultDispositions).toContain('NO_QUALIFYING_CANDIDATE_FOUND');
    expect(report.t6NoQualifyingCandidateMayBeRecordedWithoutFallback).toBe(true);
  });

  test('T6 execution remains nonnumeric and cannot silently import a competing foundational method', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReview(
        acceptedB12(),
      );
    const task = report.executionTasks.find(
      (item) => item.taskId === 'T6_NATAL_CAREER_MODIFIER_CANDIDATE_DISCOVERY_EXECUTION',
    );

    expect(task?.operations).toContain('VERIFY_NON_NUMERIC_METHOD_COMPATIBILITY');
    expect(task?.operations).toContain('VERIFY_NO_SILENT_COMPETING_METHOD_IMPORT');
    expect(report.numericMethodAdaptationAuthorized).toBe(false);
    expect(report.competingMethodSilentImportAuthorized).toBe(false);
  });

  test('makes negative and mismatch dispositions first-class evidence outcomes', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReview(
        acceptedB12(),
      );

    expect(report.negativeEvidencePreservedAsFirstClassResult).toBe(true);
    expect(
      report.executionTasks.every((task) =>
        task.allowedResultDispositions.includes('CANDIDATE_METHOD_INCOMPATIBLE'),
      ),
    ).toBe(true);
    expect(
      report.executionTasks.every((task) =>
        task.allowedResultDispositions.includes('CANDIDATE_SEMANTIC_MISMATCH'),
      ),
    ).toBe(true);
  });

  test('permits independent execution but forbids cross-task stitching to simulate authority', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReview(
        acceptedB12(),
      );

    expect(report.tasksMayRunIndependently).toBe(true);
    expect(report.crossTaskStitchingAuthorized).toBe(false);
    expect(
      report.executionTasks.every(
        (task) => task.evidenceContract.crossTaskEvidenceStitchingForSameGapAllowed === false,
      ),
    ).toBe(true);
  });

  test('keeps all six gaps open and creates no executable interpretation artifacts', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReview(
        acceptedB12(),
      );

    expect(report.allSixGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.sourceAccessPerformedByThisGate).toBe(false);
    expect(report.candidateDiscoveryPerformedByThisGate).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.implementationEffects).toEqual({
      sourceAccessesPerformed: 0,
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

  test('fails closed when the B12 content-addressed boundary is tampered', () => {
    const b12 = acceptedB12();
    const tampered = {
      ...b12,
      activePrimaryTrackCount: 0,
    } as unknown as CareerPersonalizationT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReviewReport;
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReview(
        tampered,
      );

    expect(report.status).toBe('UPSTREAM_B12_BOUNDARY_INVALID');
    expect(report.exactB12BoundaryAccepted).toBe(false);
    expect(report.executionTasks).toEqual([]);
    expect(report.executionTaskCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_TARGETED_SOURCE_ACCESS_REQUIREMENTS_REVIEW',
    );
  });

  test('is deterministic, freezes controls, and routes only to execution evidence', () => {
    const b12 = acceptedB12();
    const first =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReview(b12);
    const second =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReview(b12);

    expect(first.reviewId).toBe(second.reviewId);
    expect(deterministicContentHash(first)).toBe(deterministicContentHash(second));
    expect(first.controlIds).toEqual(CAREER_T8_CURRENT_T5_T6_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_CONTROL_IDS);
    expect(first.controlCount).toBe(12);
    expect(first.controlsFrozen).toBe(true);
    expect(first.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_EVIDENCE',
    );
  });
});
