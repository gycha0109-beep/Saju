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
import {
  buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathDiscoveryEvidence,
  type CareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathDiscoveryEvidenceReport,
} from '../src/research/career-personalization-t8-current-t5-t6-semantic-bridge-residual-authority-path-discovery-evidence.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT_REVIEW_VERSION,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_METHOD_BOUNDARY_REASSESSMENT_CONTROL_IDS,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_METHOD_BOUNDARY_RESIDUAL_CLASSES,
  buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReview,
} from '../src/research/career-personalization-t8-current-t5-t6-semantic-bridge-residual-discovery-evidence-adequacy-method-boundary-reassessment-review.js';

function acceptedP4(): CareerT6PublicClassicBoundedScopeMethodologyReviewReport {
  return {
    reviewId: 'career_t6_public_classic_scope_t8_bridge_b18_test',
    reviewVersion: CAREER_PERSONALIZATION_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW_VERSION,
    status: 'RESOLVED_CAREER_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW',
    decision:
      'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORIZED_FOR_RESEARCH_T6_RULE_AUTHORING_ONLY_QUALIFIERS_CONTEXT_ONLY_GENERAL_P3_BLOCK_PRESERVED_NO_DAMAGE_WINNER_T8_NARRATIVE_OR_PRODUCTION',
    upstreamP3Version: CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE_VERSION,
    upstreamI252ReviewId: 'i252_t8_bridge_b18_test',
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

function acceptedB17() {
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
  return buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathDiscoveryEvidence(b16);
}

describe('Career T8 current T5/T6 semantic bridge B18 residual discovery evidence adequacy and method-boundary reassessment', () => {
  test('accepts exact B17 and classifies four residual classes with two active current-method frontiers', () => {
    const report = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReview(
      acceptedB17(),
    );

    expect(report.reviewVersion).toBe(
      CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT_REVIEW_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_CAREER_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT',
    );
    expect(report.residualClassCount).toBe(4);
    expect(report.residualClasses).toEqual(CAREER_T8_CURRENT_T5_T6_BRIDGE_METHOD_BOUNDARY_RESIDUAL_CLASSES);
    expect(report.activeCurrentMethodFrontierCount).toBe(2);
    expect(report.holdCount).toBe(2);
  });

  test('allows current-method T5 direct-bridge acquisition to continue without Wang adoption', () => {
    const report = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReview(
      acceptedB17(),
    );
    const currentT5 = report.residualClasses.find(
      (item) => item.classId === 'CURRENT_METHOD_T5_DIRECT_BRIDGE_ACQUISITION',
    );

    expect(report.currentMethodT5DirectBridgeAcquisitionMayContinue).toBe(true);
    expect(report.humanMethodologyChoiceRequiredBeforeContinuingCurrentMethodDiscovery).toBe(false);
    expect(currentT5?.mayContinueWithoutHumanMethodologyChoice).toBe(true);
    expect(currentT5?.retainedCandidateIds).toEqual(['YANG_YIYUN_SHISHEN_CHANWEI']);
  });

  test('keeps Yang as a remediation target only and Shim as contextual evidence rather than a direct bridge target', () => {
    const report = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReview(
      acceptedB17(),
    );
    const currentT5 = report.residualClasses.find(
      (item) => item.classId === 'CURRENT_METHOD_T5_DIRECT_BRIDGE_ACQUISITION',
    );

    expect(report.yangSemanticUseAuthorized).toBe(false);
    expect(report.shimDirectBridgeUseAuthorized).toBe(false);
    expect(currentT5?.retainedCandidateIds).not.toContain('SHIM_GWANGSUK_2018_JOB_APTITUDE_THESIS');
    expect(currentT5?.currentEvidenceQualifiesAsAuthority).toBe(false);
  });

  test('keeps current-method T6 direct Career bridge discovery open while classics remain structural context only', () => {
    const report = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReview(
      acceptedB17(),
    );
    const currentT6 = report.residualClasses.find(
      (item) => item.classId === 'CURRENT_METHOD_T6_DIRECT_CAREER_BRIDGE_DISCOVERY',
    );

    expect(report.currentMethodT6DirectCareerBridgeDiscoveryMayContinue).toBe(true);
    expect(report.classicStatusToModernCareerTranslationAuthorized).toBe(false);
    expect(currentT6?.mayContinueWithoutHumanMethodologyChoice).toBe(true);
    expect(currentT6?.retainedCandidateIds).toEqual([
      'SANMING_TONGHUI_VOL2_LUN_CHONGJI',
      'ZIPING_ZHENQUAN_OFFICIAL_PATTERN_CLASH_CONTEXT',
    ]);
    expect(currentT6?.currentEvidenceQualifiesAsAuthority).toBe(false);
  });

  test('preserves Cheonbu as an external full-text hold separate from active current-method discovery', () => {
    const report = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReview(
      acceptedB17(),
    );
    const cheonbu = report.residualClasses.find((item) => item.classId === 'CHEONBU_EXTERNAL_FULL_TEXT_ACCESS_HOLD');

    expect(report.cheonbuExternalFullTextHoldPreserved).toBe(true);
    expect(cheonbu?.status).toBe('BLOCKED_EXTERNAL_ACCESS_HOLD');
    expect(cheonbu?.executionAuthorizedByThisGate).toBe(false);
    expect(cheonbu?.humanMethodologyChoiceRequiredBeforeSemanticUse).toBe(false);
  });

  test('isolates Wang as a competing foundational method requiring human adjudication before any semantic use', () => {
    const report = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReview(
      acceptedB17(),
    );
    const wang = report.residualClasses.find(
      (item) => item.classId === 'WANG_QING_COMPETING_FOUNDATIONAL_METHOD_HOLD',
    );

    expect(report.wangQingCompetingMethodHoldActive).toBe(true);
    expect(report.humanMethodologyChoiceRequiredBeforeWangSemanticUse).toBe(true);
    expect(report.wangSemanticUseAuthorized).toBe(false);
    expect(report.methodologyChoiceMadeByThisGate).toBe(false);
    expect(wang?.status).toBe('HUMAN_METHODOLOGY_ADJUDICATION_REQUIRED_BEFORE_USE');
    expect(wang?.retainedCandidateIds).toEqual(['WANG_QING_XUE_GEJU_SECOND_BOOK_CAREER_COMPOSITION']);
    expect(wang?.humanMethodologyChoiceRequiredBeforeSemanticUse).toBe(true);
  });

  test('does not promote B17 partial evidence, stitch sources, or close gaps', () => {
    const report = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReview(
      acceptedB17(),
    );

    expect(report.b17EvidenceAdequateForResidualClassificationOnly).toBe(true);
    expect(report.b17EvidenceAdequateForAuthorityAdmission).toBe(false);
    expect(report.b17EvidenceAdequateForGapClosure).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
  });

  test('keeps all six gaps open and creates no T8, narrative, preview, or production artifacts', () => {
    const report = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReview(
      acceptedB17(),
    );

    expect(report.allSixGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.remediationExecutionAuthorizedByThisGate).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.implementationEffects).toEqual({
      residualClassesSelected: 4,
      activeCurrentMethodFrontiersSelected: 2,
      humanMethodologyChoicesMade: 0,
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

  test('fails closed when the content-addressed B17 evidence boundary is tampered', () => {
    const b17 = acceptedB17();
    const tampered = {
      ...b17,
      competingFoundationalMethodChoiceSurfaced: false,
    } as CareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathDiscoveryEvidenceReport;
    const report = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReview(
      tampered,
    );

    expect(report.status).toBe('UPSTREAM_B17_BOUNDARY_INVALID');
    expect(report.exactB17BoundaryAccepted).toBe(false);
    expect(report.residualClasses).toEqual([]);
    expect(report.activeCurrentMethodFrontierCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
  });

  test('is deterministic, freezes controls, and routes to current-method residual acquisition readiness only', () => {
    const b17 = acceptedB17();
    const first = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReview(
      b17,
    );
    const second = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReview(
      b17,
    );

    expect(first.reviewId).toBe(second.reviewId);
    expect(deterministicContentHash(first)).toBe(deterministicContentHash(second));
    expect(first.controlIds).toEqual(CAREER_T8_CURRENT_T5_T6_BRIDGE_METHOD_BOUNDARY_REASSESSMENT_CONTROL_IDS);
    expect(first.controlCount).toBe(12);
    expect(first.controlsFrozen).toBe(true);
    expect(first.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_REVIEW',
    );
  });
});
