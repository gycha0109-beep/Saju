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
import {
  buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReview,
  type CareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReviewReport,
} from '../src/research/career-personalization-t8-current-t5-t6-semantic-bridge-residual-authority-path-execution-readiness-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_DISCOVERY_EVIDENCE_VERSION,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_DISCOVERY_CANDIDATES,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_DISCOVERY_CONTROL_IDS,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_DISCOVERY_TASK_EVIDENCE,
  buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathDiscoveryEvidence,
} from '../src/research/career-personalization-t8-current-t5-t6-semantic-bridge-residual-authority-path-discovery-evidence.js';

function acceptedP4(): CareerT6PublicClassicBoundedScopeMethodologyReviewReport {
  return {
    reviewId: 'career_t6_public_classic_scope_t8_bridge_b17_test',
    reviewVersion: CAREER_PERSONALIZATION_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW_VERSION,
    status: 'RESOLVED_CAREER_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW',
    decision:
      'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORIZED_FOR_RESEARCH_T6_RULE_AUTHORING_ONLY_QUALIFIERS_CONTEXT_ONLY_GENERAL_P3_BLOCK_PRESERVED_NO_DAMAGE_WINNER_T8_NARRATIVE_OR_PRODUCTION',
    upstreamP3Version: CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE_VERSION,
    upstreamI252ReviewId: 'i252_t8_bridge_b17_test',
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

function acceptedB16() {
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
  return buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReview(b15);
}

describe('Career T8 current T5/T6 semantic bridge B17 residual authority path discovery evidence', () => {
  test('accepts the exact B16 boundary and records exactly two discovery executions with five candidates', () => {
    const report = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathDiscoveryEvidence(
      acceptedB16(),
    );

    expect(report.evidenceVersion).toBe(
      CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_DISCOVERY_EVIDENCE_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_CAREER_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_DISCOVERY_EVIDENCE',
    );
    expect(report.discoveryPerformed).toBe(true);
    expect(report.taskEvidenceCount).toBe(2);
    expect(report.taskEvidence).toEqual(CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_DISCOVERY_TASK_EVIDENCE);
    expect(report.candidateAttemptCount).toBe(5);
    expect(report.candidateEvidence).toEqual(CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_DISCOVERY_CANDIDATES);
  });

  test('records three T5 candidates but admits zero current-method authority candidates', () => {
    const report = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathDiscoveryEvidence(
      acceptedB16(),
    );

    expect(report.t5CandidateAttemptCount).toBe(3);
    expect(report.t5PrimaryDisposition).toBe('PARTIAL_CANDIDATE_DISCOVERED');
    expect(report.t5AcademicCompositeCareerMethodEvidenceFound).toBe(true);
    expect(report.t5TenGodCombinationMethodTextFound).toBe(true);
    expect(report.t5DirectMultiClaimCareerCompositionLeadFound).toBe(true);
    expect(report.t5CurrentMethodQualifyingCandidateCount).toBe(0);
  });

  test('keeps the academic thesis as composite-method context rather than exact T5 bridge authority', () => {
    const candidate = CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_DISCOVERY_CANDIDATES.find(
      (item) => item.candidateId === 'SHIM_GWANGSUK_2018_JOB_APTITUDE_THESIS',
    );

    expect(candidate?.independentNormativeProvenanceAdequate).toBe(true);
    expect(candidate?.careerWorkSemanticsExplicit).toBe(true);
    expect(candidate?.directMultiClaimCareerCompositionExplicit).toBe(false);
    expect(candidate?.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(candidate?.qualifyingCandidate).toBe(false);
  });

  test('does not stitch Yang Ten-God combination theory and its Career chapter into an unstated direct bridge', () => {
    const candidate = CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_DISCOVERY_CANDIDATES.find(
      (item) => item.candidateId === 'YANG_YIYUN_SHISHEN_CHANWEI',
    );

    expect(candidate?.tenGodCombinationSemanticsExplicit).toBe(true);
    expect(candidate?.careerWorkSemanticsExplicit).toBe(true);
    expect(candidate?.directMultiClaimCareerCompositionExplicit).toBe(false);
    expect(candidate?.independentNormativeProvenanceAdequate).toBe(false);
    expect(candidate?.qualifyingCandidate).toBe(false);
  });

  test('records Wang as the strongest explicit multi-claim Career lead but rejects silent competing-method import', () => {
    const candidate = CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_DISCOVERY_CANDIDATES.find(
      (item) => item.candidateId === 'WANG_QING_XUE_GEJU_SECOND_BOOK_CAREER_COMPOSITION',
    );

    expect(candidate?.careerWorkSemanticsExplicit).toBe(true);
    expect(candidate?.tenGodCombinationSemanticsExplicit).toBe(true);
    expect(candidate?.directMultiClaimCareerCompositionExplicit).toBe(true);
    expect(candidate?.competingFoundationalMethodDependencyDetected).toBe(true);
    expect(candidate?.disposition).toBe('CANDIDATE_METHOD_INCOMPATIBLE');
    expect(candidate?.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(candidate?.qualifyingCandidate).toBe(false);
  });

  test('records two higher-provenance T6 classic candidates but no direct current-method Career modifier', () => {
    const report = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathDiscoveryEvidence(
      acceptedB16(),
    );
    const t6Candidates = report.candidateEvidence.filter(
      (item) => item.taskId === 'T6_HIGHER_PROVENANCE_NATAL_CAREER_SOURCE_DISCOVERY_EXECUTION',
    );

    expect(report.t6CandidateAttemptCount).toBe(2);
    expect(report.t6PrimaryDisposition).toBe('PARTIAL_CANDIDATE_DISCOVERED');
    expect(report.t6HighProvenanceClassicClashContextFound).toBe(true);
    expect(report.t6DirectCurrentMethodCareerModifierFound).toBe(false);
    expect(report.t6CurrentMethodQualifyingCandidateCount).toBe(0);
    expect(t6Candidates.every((item) => item.branchClashStructuralEffectExplicit)).toBe(true);
    expect(t6Candidates.every((item) => item.directCurrentT6CareerModifierExplicit === false)).toBe(true);
  });

  test('prevents classic official-status semantics from being translated into generic modern Career authority', () => {
    const sanming = CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_DISCOVERY_CANDIDATES.find(
      (item) => item.candidateId === 'SANMING_TONGHUI_VOL2_LUN_CHONGJI',
    );
    const ziping = CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_DISCOVERY_CANDIDATES.find(
      (item) => item.candidateId === 'ZIPING_ZHENQUAN_OFFICIAL_PATTERN_CLASH_CONTEXT',
    );

    expect(sanming?.independentNormativeProvenanceAdequate).toBe(true);
    expect(sanming?.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(ziping?.independentNormativeProvenanceAdequate).toBe(true);
    expect(ziping?.competingFoundationalMethodDependencyDetected).toBe(true);
    expect(ziping?.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
  });

  test('surfaces but does not decide the competing foundational methodology choice and preserves the Cheonbu hold', () => {
    const report = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathDiscoveryEvidence(
      acceptedB16(),
    );

    expect(report.competingFoundationalMethodChoiceSurfaced).toBe(true);
    expect(report.competingFoundationalMethodChoiceMadeByThisGate).toBe(false);
    expect(report.cheonbuExternalFullTextHoldPreserved).toBe(true);
    expect(report.cheonbuRetriedByThisGate).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
  });

  test('keeps all six gaps open and creates no authority, T8, narrative, preview, or production artifacts', () => {
    const report = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathDiscoveryEvidence(
      acceptedB16(),
    );

    expect(report.allSixGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.authorityCandidateAcceptedByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.implementationEffects).toEqual({
      discoveryExecutionsPerformed: 2,
      candidateEvidenceRecordsCreated: 5,
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

  test('fails closed on tampered B16 and is deterministic on the exact B16 input', () => {
    const b16 = acceptedB16();
    const tampered = {
      ...b16,
      t6HigherProvenanceNatalDiscoveryExecutionReady: false,
    } as CareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReviewReport;
    const rejected = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathDiscoveryEvidence(
      tampered,
    );
    const first = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathDiscoveryEvidence(b16);
    const second = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathDiscoveryEvidence(b16);

    expect(rejected.status).toBe('UPSTREAM_B16_BOUNDARY_INVALID');
    expect(rejected.discoveryPerformed).toBe(false);
    expect(rejected.candidateEvidence).toEqual([]);
    expect(rejected.taskEvidence).toEqual([]);
    expect(rejected.controlsFrozen).toBe(false);
    expect(first.evidenceId).toBe(second.evidenceId);
    expect(deterministicContentHash(first)).toBe(deterministicContentHash(second));
    expect(first.controlIds).toEqual(CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_DISCOVERY_CONTROL_IDS);
    expect(first.controlCount).toBe(12);
    expect(first.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT_REVIEW',
    );
  });
});
