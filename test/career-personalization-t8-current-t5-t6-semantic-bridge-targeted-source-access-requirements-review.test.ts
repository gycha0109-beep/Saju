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
import {
  buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence,
  type CareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidenceReport,
} from '../src/research/career-personalization-t8-current-t5-t6-semantic-bridge-authority-candidate-discovery-evidence.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_TARGETED_SOURCE_ACCESS_REQUIREMENTS_REVIEW_VERSION,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_REMEDIATION_TRACKS,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_SOURCE_ACCESS_CONTROL_IDS,
  buildCareerPersonalizationT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReview,
} from '../src/research/career-personalization-t8-current-t5-t6-semantic-bridge-targeted-source-access-requirements-review.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';

function acceptedP4(): CareerT6PublicClassicBoundedScopeMethodologyReviewReport {
  return {
    reviewId: 'career_t6_public_classic_scope_t8_bridge_source_access_test',
    reviewVersion: CAREER_PERSONALIZATION_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW_VERSION,
    status: 'RESOLVED_CAREER_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW',
    decision:
      'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORIZED_FOR_RESEARCH_T6_RULE_AUTHORING_ONLY_QUALIFIERS_CONTEXT_ONLY_GENERAL_P3_BLOCK_PRESERVED_NO_DAMAGE_WINNER_T8_NARRATIVE_OR_PRODUCTION',
    upstreamP3Version: CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE_VERSION,
    upstreamI252ReviewId: 'i252_t8_bridge_source_access_test',
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

function acceptedB11() {
  const p4 = acceptedP4();
  const readiness = buildCareerPersonalizationPostP4T8ReadinessReview(p4);
  const b4 = buildCareerPersonalizationBoundedT5T6T8SynthesisMethodologyReview(p4, readiness);
  const b5 = buildCareerPersonalizationT8SynthesisAuthorityGapRequirementsReview(p4, readiness, b4);
  const b6 = buildCareerPersonalizationT8SynthesisAuthorityAcquisitionReadinessReview(
    p4,
    readiness,
    b4,
    b5,
  );
  const b7 = buildCareerPersonalizationT8SynthesisAuthorityCandidateDiscoveryEvidence(
    p4,
    readiness,
    b4,
    b5,
    b6,
  );
  const b8 = buildCareerPersonalizationT8SynthesisAuthorityCandidateRequirementCoverageEvaluation(
    b6,
    b7,
  );
  const b9 = buildCareerPersonalizationT8SynthesisAuthorityResidualGapReassessmentReview(b8);
  const b10 = buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview(b9);
  return buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence(b10);
}

describe('Career T8 current T5/T6 semantic bridge targeted source-access requirements review', () => {
  test('classifies five remediation tracks with exactly two active primary tracks', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReview(
        acceptedB11(),
      );

    expect(report.reviewVersion).toBe(
      CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_TARGETED_SOURCE_ACCESS_REQUIREMENTS_REVIEW_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_CAREER_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_TARGETED_SOURCE_ACCESS_REQUIREMENTS_REVIEW',
    );
    expect(report.remediationTrackCount).toBe(5);
    expect(report.remediationTracks).toEqual(CAREER_T8_CURRENT_T5_T6_BRIDGE_REMEDIATION_TRACKS);
    expect(report.activePrimaryTrackCount).toBe(2);
    expect(report.activePrimaryTrackIds).toEqual([
      'CHEONBU_EXACT_PASSAGE_ACCESS',
      'T6_NATAL_CAREER_MODIFIER_NEW_CANDIDATE_DISCOVERY',
    ]);
  });

  test('treats Cheonbu as access-remediable but never auto-admitted by successful access', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReview(
        acceptedB11(),
      );
    const track = report.remediationTracks.find(
      (item) => item.trackId === 'CHEONBU_EXACT_PASSAGE_ACCESS',
    );

    expect(report.accessRemediableCandidateIds).toEqual(['cheonbu_myeongri_tongbyeonron_2020']);
    expect(report.cheonbuExactPassageAccessRequired).toBe(true);
    expect(report.cheonbuExactPassagePageBindingRequired).toBe(true);
    expect(report.cheonbuFullLocalContextRequired).toBe(true);
    expect(report.cheonbuMethodologyCompatibilityMustBeReevaluatedAfterAccess).toBe(true);
    expect(report.cheonbuCurrentT5SemanticCorrespondenceMustBeEstablishedAfterAccess).toBe(true);
    expect(report.cheonbuIndependentNormativeCorroborationStillRequired).toBe(true);
    expect(report.cheonbuAccessSuccessWouldAutoAdmitAuthority).toBe(false);
    expect(track?.authorityAcceptanceAuthorizedByThisTrackDefinition).toBe(false);
    expect(track?.gapClosureAuthorizedByThisTrackDefinition).toBe(false);
  });

  test('requires exact passage, methodology classification, current-T5 correspondence, and independent corroboration for Cheonbu', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReview(
        acceptedB11(),
      );
    const track = report.remediationTracks.find(
      (item) => item.trackId === 'CHEONBU_EXACT_PASSAGE_ACCESS',
    );
    const ids = track?.requirements.map((item) => item.requirementId) ?? [];

    expect(ids).toContain('CHEONBU_EXACT_SECTION_PAGE_BINDING');
    expect(ids).toContain('CHEONBU_FULL_PASSAGE_AND_LOCAL_CONTEXT');
    expect(ids).toContain('CHEONBU_METHOD_INGREDIENTS_CLASSIFICATION');
    expect(ids).toContain('CHEONBU_CURRENT_T5_SEMANTIC_CORRESPONDENCE');
    expect(ids).toContain('CHEONBU_NON_NUMERIC_MULTI_PATTERN_COMPOSITION');
    expect(ids).toContain('CHEONBU_INDEPENDENT_NORMATIVE_CORROBORATION');
    expect(
      track?.requirements.find(
        (item) => item.requirementId === 'CHEONBU_INDEPENDENT_NORMATIVE_CORROBORATION',
      )?.accessCanResolve,
    ).toBe(false);
  });

  test('routes T6 to genuinely new natal Career-modifier discovery instead of reusing dynamic profession-change text', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReview(
        acceptedB11(),
      );
    const track = report.remediationTracks.find(
      (item) => item.trackId === 'T6_NATAL_CAREER_MODIFIER_NEW_CANDIDATE_DISCOVERY',
    );

    expect(report.newCandidateDiscoveryRequiredLaneIds).toEqual([
      'T6_STRUCTURAL_QUALIFIER_TO_CAREER_MODIFIER_BRIDGE',
    ]);
    expect(report.t6ExistingChenCandidateRemediationByAccessRejected).toBe(true);
    expect(report.t6NewNatalSpecificCandidateDiscoveryRequired).toBe(true);
    expect(report.t6CandidateMustExpressCareerModifierNotEventPrediction).toBe(true);
    expect(report.t6CandidateMustRemainNonNumeric).toBe(true);
    expect(report.noAccessRemediationCandidateIds).toContain(
      'chenyuan_sizhu_yuce_rumen_branch_clash_profession_change_transcription',
    );
    expect(track?.mode).toBe('NEW_CANDIDATE_DISCOVERY');
    expect(track?.executionAuthorizedAfterThisReview).toBe(true);
  });

  test('closes the numeric-strength candidate under current policy rather than spending more source-access effort', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReview(
        acceptedB11(),
      );
    const track = report.remediationTracks.find(
      (item) => item.trackId === 'NUMERIC_STRENGTH_CANDIDATE_CLOSED_CURRENT_TRACK',
    );

    expect(report.choiNumericCandidateClosedUnderCurrentPolicy).toBe(true);
    expect(report.choiMoreAccessWouldResolvePolicyConflict).toBe(false);
    expect(report.noAccessRemediationCandidateIds).toContain(
      'choi_eunhee_2020_prosperous_ten_stars_aptitude',
    );
    expect(track?.priority).toBe('NO_ACCESS_REMEDIATION');
    expect(track?.mode).toBe('CLOSED_UNDER_CURRENT_POLICY');
    expect(track?.executionAuthorizedAfterThisReview).toBe(false);
  });

  test('keeps mixed scholarly full text secondary and non-admitting', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReview(
        acceptedB11(),
      );
    const track = report.remediationTracks.find(
      (item) => item.trackId === 'MIXED_SCHOLARLY_FULL_TEXT_CLARIFICATION',
    );

    expect(report.mixedScholarlyCandidatesMayBeClarifiedByFullText).toBe(true);
    expect(report.mixedScholarlyFullTextWouldAutoRemoveCompetingMethodology).toBe(false);
    expect(report.secondaryClarificationCandidateIds).toEqual([
      'kim_woojung_2025_sizhu_jingshuo_occupational_aptitude',
      'kim_taesoo_2022_financial_sales_profession',
    ]);
    expect(track?.priority).toBe('SECONDARY_NON_ADMITTING');
    expect(track?.authorityAcceptanceAuthorizedByThisTrackDefinition).toBe(false);
  });

  test('keeps competing Yongshin/Xiji methodology deferred rather than silently activating it', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReview(
        acceptedB11(),
      );
    const track = report.remediationTracks.find(
      (item) => item.trackId === 'COMPETING_YONGSHIN_XIJI_METHOD_DEFERRED',
    );

    expect(report.deferredCompetingMethodologyTrackPresent).toBe(true);
    expect(report.qianliOrOtherYongshinXijiTrackMayEnterActiveAcquisition).toBe(false);
    expect(track?.priority).toBe('DEFERRED_REQUIRES_METHODOLOGY_CHOICE');
    expect(track?.mode).toBe('DEFERRED_METHODOLOGY_DECISION');
    expect(track?.executionAuthorizedAfterThisReview).toBe(false);
  });

  test('keeps all six authority gaps open and creates no interpretation artifacts', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReview(
        acceptedB11(),
      );

    expect(report.allSixGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
    expect(report.currentClaimSemanticCorrespondenceEstablishedByThisGate).toBe(false);
    expect(report.crossCandidateCompositionAuthorized).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.implementationEffects).toEqual({
      sourceAccessesPerformed: 0,
      newCandidatesDiscovered: 0,
      registeredSourcesCreated: 0,
      methodologyDefinitionsCreated: 0,
      methodologyChoicesAdopted: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      registrySnapshotsCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    });
  });

  test('fails closed when the B11 content-addressed boundary is tampered', () => {
    const b11 = acceptedB11();
    const tampered = {
      ...b11,
      admissionCompatibleCandidateCount: 1,
    } as unknown as CareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidenceReport;
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReview(
        tampered,
      );

    expect(report.status).toBe('UPSTREAM_B11_BOUNDARY_INVALID');
    expect(report.exactB11BoundaryAccepted).toBe(false);
    expect(report.remediationTracks).toEqual([]);
    expect(report.activePrimaryTrackIds).toEqual([]);
    expect(report.controlsFrozen).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE',
    );
  });

  test('is deterministic, freezes controls, and routes only to active-remediation execution readiness', () => {
    const b11 = acceptedB11();
    const first =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReview(b11);
    const second =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReview(b11);

    expect(first.reviewId).toBe(second.reviewId);
    expect(deterministicContentHash(first)).toBe(deterministicContentHash(second));
    expect(first.controlIds).toEqual(CAREER_T8_CURRENT_T5_T6_BRIDGE_SOURCE_ACCESS_CONTROL_IDS);
    expect(first.controlCount).toBe(12);
    expect(first.controlsFrozen).toBe(true);
    expect(first.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_READINESS_REVIEW',
    );
  });
});
