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
import {
  buildCareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReview,
  type CareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReviewReport,
} from '../src/research/career-personalization-t8-current-t5-t6-semantic-bridge-active-remediation-execution-readiness-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_EVIDENCE_VERSION,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_EVIDENCE_RECORDS,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_EXECUTION_EVIDENCE_CONTROL_IDS,
  buildCareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidence,
} from '../src/research/career-personalization-t8-current-t5-t6-semantic-bridge-active-remediation-execution-evidence.js';

function acceptedP4(): CareerT6PublicClassicBoundedScopeMethodologyReviewReport {
  return {
    reviewId: 'career_t6_public_classic_scope_t8_bridge_b14_test',
    reviewVersion: CAREER_PERSONALIZATION_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW_VERSION,
    status: 'RESOLVED_CAREER_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW',
    decision:
      'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORIZED_FOR_RESEARCH_T6_RULE_AUTHORING_ONLY_QUALIFIERS_CONTEXT_ONLY_GENERAL_P3_BLOCK_PRESERVED_NO_DAMAGE_WINNER_T8_NARRATIVE_OR_PRODUCTION',
    upstreamP3Version: CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE_VERSION,
    upstreamI252ReviewId: 'i252_t8_bridge_b14_test',
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

function acceptedB13() {
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
  return buildCareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReview(b12);
}

describe('Career T8 current T5/T6 semantic bridge active remediation execution evidence', () => {
  test('materializes exactly two execution evidence records from the exact B13 boundary', () => {
    const report = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidence(
      acceptedB13(),
    );

    expect(report.evidenceVersion).toBe(
      CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_EVIDENCE_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_CAREER_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_EVIDENCE',
    );
    expect(report.executionPerformed).toBe(true);
    expect(report.taskEvidenceRecordCount).toBe(2);
    expect(report.taskEvidenceRecords).toEqual(
      CAREER_T8_CURRENT_T5_T6_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_EVIDENCE_RECORDS,
    );
  });

  test('cross-confirms Cheonbu source identity on two public retail surfaces', () => {
    const report = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidence(
      acceptedB13(),
    );
    const record = report.taskEvidenceRecords.find(
      (item) => item.taskId === 'CHEONBU_PRIMARY_SOURCE_ACCESS_EXECUTION',
    );

    expect(report.cheonbuSourceAttemptCount).toBe(2);
    expect(report.cheonbuSourceIdentityCrossConfirmed).toBe(true);
    expect(report.cheonbuRelevantCareerSectionsExistenceConfirmed).toBe(true);
    expect(record?.sourceAttempts).toHaveLength(2);
    expect(record?.sourceAttempts.every((item) => item.sourceIdentityConfirmed)).toBe(true);
    expect(record?.sourceAttempts.map((item) => item.stableUrl)).toEqual([
      'https://m.yes24.com/goods/detail/91729012',
      'https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=248651396',
    ]);
  });

  test('records Cheonbu as partial evidence with exact passage/page access blocked', () => {
    const report = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidence(
      acceptedB13(),
    );
    const record = report.taskEvidenceRecords.find(
      (item) => item.taskId === 'CHEONBU_PRIMARY_SOURCE_ACCESS_EXECUTION',
    );

    expect(report.cheonbuPrimaryDisposition).toBe('PARTIAL_EVIDENCE_ACQUIRED');
    expect(report.cheonbuAccessBlocked).toBe(true);
    expect(record?.secondaryDispositions).toEqual(['ACCESS_BLOCKED']);
    expect(report.cheonbuExactPassagePageAcquired).toBe(false);
    expect(report.cheonbuFullLocalContextAcquired).toBe(false);
    expect(record?.sourceAttempts.every((item) => item.exactTargetPassageAvailable === false)).toBe(true);
  });

  test('does not convert Cheonbu metadata/TOC access into methodology, T5 correspondence, corroboration, or authority', () => {
    const report = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidence(
      acceptedB13(),
    );

    expect(report.cheonbuMethodologyFullyClassified).toBe(false);
    expect(report.cheonbuCurrentT5SemanticCorrespondenceEstablished).toBe(false);
    expect(report.cheonbuIndependentNormativeCorroborationAcquired).toBe(false);
    expect(report.registeredCandidateCount).toBe(0);
    expect(report.authorityAcceptedCandidateCount).toBe(0);
  });

  test('performs four targeted T6 discovery attempts and finds zero qualifying candidates', () => {
    const report = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidence(
      acceptedB13(),
    );
    const record = report.taskEvidenceRecords.find(
      (item) => item.taskId === 'T6_NATAL_CAREER_MODIFIER_CANDIDATE_DISCOVERY_EXECUTION',
    );

    expect(report.t6TargetedDiscoveryPerformed).toBe(true);
    expect(report.t6SourceAttemptCount).toBe(4);
    expect(record?.sourceAttempts).toHaveLength(4);
    expect(report.t6PrimaryDisposition).toBe('NO_QUALIFYING_CANDIDATE_FOUND');
    expect(report.t6QualifyingCandidateCount).toBe(0);
    expect(record?.qualifyingCandidateCount).toBe(0);
    expect(record?.sourceAttempts.every((item) => item.qualifyingCandidate === false)).toBe(true);
  });

  test('rejects the two natal Career web leads for provenance and current-T6 correspondence insufficiency', () => {
    const report = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidence(
      acceptedB13(),
    );
    const record = report.taskEvidenceRecords.find(
      (item) => item.taskId === 'T6_NATAL_CAREER_MODIFIER_CANDIDATE_DISCOVERY_EXECUTION',
    );
    const natalLeads = record?.sourceAttempts.filter((item) => item.explicitNatalCareerSemanticObserved) ?? [];

    expect(report.t6NatalCareerLeadCount).toBe(2);
    expect(natalLeads).toHaveLength(2);
    expect(natalLeads.every((item) => item.independentNormativeProvenanceEstablished === false)).toBe(true);
    expect(natalLeads.every((item) => item.currentClaimSemanticCorrespondenceEstablished === false)).toBe(true);
    expect(report.t6IndependentNormativeAuthorityCandidateCount).toBe(0);
    expect(report.t6CurrentClaimSemanticCorrespondenceEstablishedCount).toBe(0);
  });

  test('rejects dynamic Career-change leads and preserves competing-method incompatibility', () => {
    const report = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidence(
      acceptedB13(),
    );
    const record = report.taskEvidenceRecords.find(
      (item) => item.taskId === 'T6_NATAL_CAREER_MODIFIER_CANDIDATE_DISCOVERY_EXECUTION',
    );
    const dynamicLeads = record?.sourceAttempts.filter(
      (item) => item.explicitDynamicCareerChangeSemanticObserved,
    ) ?? [];

    expect(report.t6DynamicCareerChangeLeadCount).toBe(2);
    expect(dynamicLeads).toHaveLength(2);
    expect(report.t6DynamicEventLeadsRejected).toBe(true);
    expect(report.t6CompetingMethodOrStrengthLeadRejected).toBe(true);
    expect(dynamicLeads.some((item) => item.competingMethodDependenceObserved)).toBe(true);
    expect(record?.secondaryDispositions).toContain('CANDIDATE_METHOD_INCOMPATIBLE');
    expect(record?.secondaryDispositions).toContain('CANDIDATE_SEMANTIC_MISMATCH');
  });

  test('preserves negative evidence without fallback or cross-source/cross-task stitching', () => {
    const report = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidence(
      acceptedB13(),
    );

    expect(report.negativeEvidencePreserved).toBe(true);
    expect(report.fallbackAuthoritySynthesized).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.crossTaskStitchingAuthorized).toBe(false);
    expect(report.taskEvidenceRecords.every((item) => item.fallbackAuthoritySynthesized === false)).toBe(true);
    expect(report.taskEvidenceRecords.every((item) => item.evidenceStitchedAcrossTasks === false)).toBe(true);
  });

  test('keeps all six gaps open and creates no interpretation or production artifacts', () => {
    const report = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidence(
      acceptedB13(),
    );

    expect(report.totalSourceAttemptCount).toBe(6);
    expect(report.allSixGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.authorityAcceptedCandidateCount).toBe(0);
    expect(report.authorityGapClosedCount).toBe(0);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.implementationEffects).toEqual({
      sourceAttemptsRecorded: 6,
      evidenceRecordsCreated: 2,
      registeredSourcesCreated: 0,
      registeredCandidatesCreated: 0,
      authorityCandidatesAccepted: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    });
  });

  test('fails closed on tampered B13 and is deterministic with frozen controls when valid', () => {
    const b13 = acceptedB13();
    const tampered = {
      ...b13,
      executionTaskCount: 0,
    } as unknown as CareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReviewReport;
    const blocked = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidence(
      tampered,
    );

    expect(blocked.status).toBe('UPSTREAM_B13_BOUNDARY_INVALID');
    expect(blocked.exactB13BoundaryAccepted).toBe(false);
    expect(blocked.taskEvidenceRecords).toEqual([]);
    expect(blocked.totalSourceAttemptCount).toBe(0);
    expect(blocked.controlsFrozen).toBe(false);

    const first = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidence(b13);
    const second = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidence(b13);
    expect(first.evidenceId).toBe(second.evidenceId);
    expect(deterministicContentHash(first)).toBe(deterministicContentHash(second));
    expect(first.controlIds).toEqual(CAREER_T8_CURRENT_T5_T6_BRIDGE_EXECUTION_EVIDENCE_CONTROL_IDS);
    expect(first.controlCount).toBe(12);
    expect(first.controlsFrozen).toBe(true);
    expect(first.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_REMEDIATION_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW',
    );
  });
});
