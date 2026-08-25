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
import { buildCareerPersonalizationT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReview } from '../src/research/career-personalization-t8-current-t5-t6-semantic-bridge-remediation-evidence-adequacy-residual-path-reassessment-review.js';
import { buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReview } from '../src/research/career-personalization-t8-current-t5-t6-semantic-bridge-residual-authority-path-execution-readiness-review.js';
import { buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathDiscoveryEvidence } from '../src/research/career-personalization-t8-current-t5-t6-semantic-bridge-residual-authority-path-discovery-evidence.js';
import {
  buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReview,
  type CareerPersonalizationT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReviewReport,
} from '../src/research/career-personalization-t8-current-t5-t6-semantic-bridge-residual-discovery-evidence-adequacy-method-boundary-reassessment-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION,
  CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_CONTROL_IDS,
  CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_TASKS,
  buildCareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionReadinessReview,
} from '../src/research/career-personalization-t8-current-method-residual-authority-acquisition-readiness-review.js';

function acceptedP4(): CareerT6PublicClassicBoundedScopeMethodologyReviewReport {
  return {
    reviewId: 'career_t6_public_classic_scope_t8_bridge_b19_test',
    reviewVersion: CAREER_PERSONALIZATION_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW_VERSION,
    status: 'RESOLVED_CAREER_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW',
    decision:
      'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORIZED_FOR_RESEARCH_T6_RULE_AUTHORING_ONLY_QUALIFIERS_CONTEXT_ONLY_GENERAL_P3_BLOCK_PRESERVED_NO_DAMAGE_WINNER_T8_NARRATIVE_OR_PRODUCTION',
    upstreamP3Version: CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE_VERSION,
    upstreamI252ReviewId: 'i252_t8_bridge_b19_test',
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

function acceptedB18() {
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
  const b15 = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReview(
    b14,
  );
  const b16 = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReview(b15);
  const b17 = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathDiscoveryEvidence(b16);
  return buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReview(
    b17,
  );
}

describe('Career T8 B19 current-method residual authority acquisition readiness', () => {
  test('accepts exact B18 and exposes exactly two acquisition-ready current-method tasks', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionReadinessReview(acceptedB18());

    expect(report.reviewVersion).toBe(
      CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION,
    );
    expect(report.status).toBe('RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS');
    expect(report.decision).toBe(
      'TWO_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_TASKS_READY_HOLDS_EXCLUDED_NO_AUTHORITY_ACQUIRED',
    );
    expect(report.acquisitionTaskCount).toBe(2);
    expect(report.acquisitionTasks).toEqual(CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_TASKS);
    expect(report.executableResidualClassCount).toBe(2);
  });

  test('makes T5 acquisition ready around Yang plus independent current-method sources without stitching', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionReadinessReview(acceptedB18());
    const task = report.acquisitionTasks.find((item) => item.taskId === 'T5_CURRENT_METHOD_DIRECT_BRIDGE_AUTHORITY_ACQUISITION');

    expect(report.t5CurrentMethodAcquisitionReady).toBe(true);
    expect(task?.retainedCandidateIds).toEqual(['YANG_YIYUN_SHISHEN_CHANWEI']);
    expect(task?.mayDiscoverAdditionalCurrentMethodCandidates).toBe(true);
    expect(task?.operations).toContain('VERIFY_DIRECT_MULTI_CLAIM_CAREER_WORK_COMPOSITION');
    expect(task?.operations).toContain('VERIFY_CONFLICT_TENSION_POLICY_IF_CONSUMED');
    expect(task?.evidenceContract.separatePassagesMayBeModelStitchedIntoUnstatedBridge).toBe(false);
  });

  test('makes T6 direct Career bridge acquisition ready while keeping classics as context until direct semantics exist', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionReadinessReview(acceptedB18());
    const task = report.acquisitionTasks.find((item) => item.taskId === 'T6_CURRENT_METHOD_DIRECT_CAREER_BRIDGE_AUTHORITY_ACQUISITION');

    expect(report.t6CurrentMethodAcquisitionReady).toBe(true);
    expect(task?.retainedCandidateIds).toEqual([
      'SANMING_TONGHUI_VOL2_LUN_CHONGJI',
      'ZIPING_ZHENQUAN_OFFICIAL_PATTERN_CLASH_CONTEXT',
    ]);
    expect(task?.operations).toContain('VERIFY_DIRECT_T6_CAREER_WORK_MODIFIER_SEMANTICS');
    expect(task?.operations).toContain('VERIFY_NO_HISTORICAL_STATUS_TO_MODERN_CAREER_TRANSLATION');
    expect(task?.evidenceContract.historicalStatusLanguageMayBeModernizedAutomatically).toBe(false);
  });

  test('excludes both Cheonbu and Wang holds from B19 execution scope', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionReadinessReview(acceptedB18());

    expect(report.cheonbuHoldExcludedFromExecution).toBe(true);
    expect(report.wangQingHoldExcludedFromExecution).toBe(true);
    expect(report.executableResidualClassIds).not.toContain('CHEONBU_EXTERNAL_FULL_TEXT_ACCESS_HOLD');
    expect(report.executableResidualClassIds).not.toContain('WANG_QING_COMPETING_FOUNDATIONAL_METHOD_HOLD');
    expect(report.acquisitionTasks.every((task) => !task.cheonbuHoldMayBeExecuted && !task.wangQingHoldMayBeExecuted)).toBe(
      true,
    );
  });

  test('preserves Wang human adjudication while current-method acquisition can continue without that choice', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionReadinessReview(acceptedB18());

    expect(report.currentMethodDiscoveryMayContinueWithoutHumanMethodologyChoice).toBe(true);
    expect(report.wangQingHumanAdjudicationStillRequiredBeforeSemanticUse).toBe(true);
    expect(report.methodologyChoiceMadeByThisGate).toBe(false);
  });

  test('requires source-bound provenance and blocks snippets, competing methods, numeric imports, and same-gap stitching', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionReadinessReview(acceptedB18());

    for (const task of report.acquisitionTasks) {
      expect(task.evidenceContract.exactSourceIdentityRequired).toBe(true);
      expect(task.evidenceContract.independentNormativeProvenanceRequired).toBe(true);
      expect(task.evidenceContract.stableReproducibleLocatorRequired).toBe(true);
      expect(task.evidenceContract.searchSnippetMayCountAsAuthorityEvidence).toBe(false);
      expect(task.evidenceContract.competingFoundationalMethodMayBeSilentlyImported).toBe(false);
      expect(task.evidenceContract.numericWeightingMayBeIntroduced).toBe(false);
      expect(task.evidenceContract.crossSourceCompositionForSameGapAllowed).toBe(false);
    }
  });

  test('authorizes acquisition execution for the next evidence gate but not authority admission or gap closure', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionReadinessReview(acceptedB18());

    expect(report.acquisitionExecutionAuthorizedForNextGate).toBe(true);
    expect(report.acquisitionPerformedByThisGate).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
    expect(report.acquisitionTasks.every((task) => !task.authorityAdmissionOnCompletion && !task.gapClosureOnCompletion)).toBe(
      true,
    );
  });

  test('keeps all six gaps open and creates no T8, narrative, preview, or production artifacts', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionReadinessReview(acceptedB18());

    expect(report.allSixGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
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
    expect(report.controlIds).toEqual(CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_CONTROL_IDS);
  });

  test('fails closed when B18 is tampered even if its visible resolved status is retained', () => {
    const valid = acceptedB18();
    const tamperedMaterial = {
      ...valid,
      currentMethodT5DirectBridgeAcquisitionMayContinue: false,
    };
    const { reviewId: _ignored, ...withoutId } = tamperedMaterial;
    const tampered = {
      ...tamperedMaterial,
      reviewId: `career_t8_current_t5_t6_bridge_method_boundary_reassessment_${deterministicContentHash(withoutId).slice(0, 24)}`,
    } as CareerPersonalizationT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReviewReport;

    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionReadinessReview(tampered);

    expect(report.status).toBe('UPSTREAM_B18_BOUNDARY_INVALID');
    expect(report.acquisitionTaskCount).toBe(0);
    expect(report.acquisitionExecutionAuthorizedForNextGate).toBe(false);
    expect(report.controlsFrozen).toBe(false);
  });

  test('is deterministic and content-addressed', () => {
    const first = buildCareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionReadinessReview(acceptedB18());
    const second = buildCareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionReadinessReview(acceptedB18());
    const { reviewId, ...material } = first;

    expect(second).toEqual(first);
    expect(reviewId).toBe(
      `career_t8_current_method_residual_authority_acquisition_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE',
    );
  });
});
