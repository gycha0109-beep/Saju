import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS, buildCareerPersonalizationBoundedT5T6T8SynthesisMethodologyReview } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
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
import {
  buildCareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidence,
  type CareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidenceReport,
} from '../src/research/career-personalization-t8-current-t5-t6-semantic-bridge-active-remediation-execution-evidence.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_REMEDIATION_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW_VERSION,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_PATHS,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_REASSESSMENT_CONTROL_IDS,
  buildCareerPersonalizationT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReview,
} from '../src/research/career-personalization-t8-current-t5-t6-semantic-bridge-remediation-evidence-adequacy-residual-path-reassessment-review.js';

function acceptedP4(): CareerT6PublicClassicBoundedScopeMethodologyReviewReport {
  return {
    reviewId: 'career_t6_public_classic_scope_t8_bridge_b15_test',
    reviewVersion: CAREER_PERSONALIZATION_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW_VERSION,
    status: 'RESOLVED_CAREER_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW',
    decision:
      'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORIZED_FOR_RESEARCH_T6_RULE_AUTHORING_ONLY_QUALIFIERS_CONTEXT_ONLY_GENERAL_P3_BLOCK_PRESERVED_NO_DAMAGE_WINNER_T8_NARRATIVE_OR_PRODUCTION',
    upstreamP3Version: CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE_VERSION,
    upstreamI252ReviewId: 'i252_t8_bridge_b15_test',
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

function acceptedB14() {
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
  return buildCareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidence(b13);
}

describe('Career T8 current T5/T6 semantic bridge B14 adequacy and residual-path reassessment', () => {
  test('accepts the exact B14 boundary and selects exactly three residual paths', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReview(
        acceptedB14(),
      );

    expect(report.reviewVersion).toBe(
      CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_REMEDIATION_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_CAREER_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_REMEDIATION_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT',
    );
    expect(report.residualPathCount).toBe(3);
    expect(report.residualPaths).toEqual(CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_PATHS);
  });

  test('treats B14 as adequate for execution outcome only, never authority admission or gap closure', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReview(
        acceptedB14(),
      );

    expect(report.b14EvidenceAdequateForExecutionOutcomeOnly).toBe(true);
    expect(report.b14EvidenceAdequateForAuthorityAdmission).toBe(false);
    expect(report.b14EvidenceAdequateForGapClosure).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
  });

  test('preserves Cheonbu as an external full-text access hold without inferring passage nonexistence', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReview(
        acceptedB14(),
      );
    const path = report.residualPaths.find((item) => item.pathId === 'CHEONBU_EXTERNAL_FULL_TEXT_ACCESS_HOLD');

    expect(report.cheonbuPublicWebPathBlocked).toBe(true);
    expect(report.cheonbuPassageNonexistenceInferred).toBe(false);
    expect(report.cheonbuExternalFullTextAccessRequired).toBe(true);
    expect(path?.status).toBe('BLOCKED_EXTERNAL_ACCESS_REQUIRED');
    expect(path?.executionAuthorizedByThisReview).toBe(false);
  });

  test('permits alternate T5/multi normative discovery in parallel instead of waiting exclusively on Cheonbu', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReview(
        acceptedB14(),
      );
    const path = report.residualPaths.find(
      (item) => item.pathId === 'T5_MULTI_ALTERNATE_NORMATIVE_SOURCE_DISCOVERY',
    );

    expect(report.t5MultiAlternateDiscoveryMayProceedWhileCheonbuBlocked).toBe(true);
    expect(report.activeAlternateDiscoveryPathIds).toContain(
      'T5_MULTI_ALTERNATE_NORMATIVE_SOURCE_DISCOVERY',
    );
    expect(path?.targetGapIds).toEqual([
      'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING',
      'FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING',
      'MULTI_PATTERN_CONFLICT_TENSION_COMPOSITION_POLICY_MISSING',
    ]);
  });

  test('routes T6 toward higher-provenance natal Career sources without inferring global source absence', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReview(
        acceptedB14(),
      );
    const path = report.residualPaths.find(
      (item) => item.pathId === 'T6_HIGHER_PROVENANCE_NATAL_CAREER_SOURCE_DISCOVERY',
    );

    expect(report.t6B14CandidateSetHadZeroQualifyingCandidates).toBe(true);
    expect(report.t6GlobalSourceAbsenceInferred).toBe(false);
    expect(report.t6HigherProvenanceDiscoveryRequired).toBe(true);
    expect(path?.targetGapIds).toEqual([
      'BRANCH_CLASH_TO_T5_CAREER_SEMANTIC_MODIFIER_MISSING',
      'VISIBILITY_POSITION_PLURALITY_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
      'SEASONAL_PHASE_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
    ]);
  });

  test('keeps each residual path source-bound and forbids same-gap cross-source stitching', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReview(
        acceptedB14(),
      );

    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.residualPaths.every((item) => item.sourceBoundCorrespondenceRequired)).toBe(true);
    expect(report.residualPaths.every((item) => item.independentNormativeProvenanceRequired)).toBe(true);
    expect(report.residualPaths.every((item) => item.crossSourceStitchingForSameGapAllowed === false)).toBe(true);
  });

  test('does not promote modern web leads or adapt dynamic-event and competing-method semantics', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReview(
        acceptedB14(),
      );

    expect(report.modernWebLeadPromotionAuthorized).toBe(false);
    expect(report.dynamicEventAdaptationAuthorized).toBe(false);
    expect(report.competingMethodAdaptationAuthorized).toBe(false);
  });

  test('keeps all six Career T8 gaps open and authorizes no execution or interpretation artifacts', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReview(
        acceptedB14(),
      );

    expect(report.allSixGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.residualPathExecutionAuthorizedByThisGate).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.implementationEffects).toEqual({
      externalAccessesPerformed: 0,
      discoveryExecutionsPerformed: 0,
      residualPathsSelected: 3,
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

  test('fails closed if the B14 content-addressed evidence boundary is tampered', () => {
    const b14 = acceptedB14();
    const tampered = {
      ...b14,
      totalSourceAttemptCount: 5,
    } as unknown as CareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidenceReport;
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReview(
        tampered,
      );

    expect(report.status).toBe('UPSTREAM_B14_BOUNDARY_INVALID');
    expect(report.exactB14BoundaryAccepted).toBe(false);
    expect(report.residualPaths).toEqual([]);
    expect(report.residualPathCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
  });

  test('is deterministic, freezes controls, and routes only to residual-path execution readiness', () => {
    const b14 = acceptedB14();
    const first =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReview(
        b14,
      );
    const second =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReview(
        b14,
      );

    expect(first.reviewId).toBe(second.reviewId);
    expect(deterministicContentHash(first)).toBe(deterministicContentHash(second));
    expect(first.blockedExternalPathCount).toBe(1);
    expect(first.activeAlternateDiscoveryPathCount).toBe(2);
    expect(first.controlIds).toEqual(CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_REASSESSMENT_CONTROL_IDS);
    expect(first.controlCount).toBe(12);
    expect(first.controlsFrozen).toBe(true);
    expect(first.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_READINESS_REVIEW',
    );
  });
});
