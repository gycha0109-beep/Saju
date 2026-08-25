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
import {
  CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_RESIDUAL_GAP_REASSESSMENT_REVIEW_VERSION,
  CAREER_T8_RESIDUAL_GAP_REASSESSMENT_CONTROL_IDS,
  buildCareerPersonalizationT8SynthesisAuthorityResidualGapReassessmentReview,
} from '../src/research/career-personalization-t8-synthesis-authority-residual-gap-reassessment-review.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';

function acceptedP4(): CareerT6PublicClassicBoundedScopeMethodologyReviewReport {
  return {
    reviewId: 'career_t6_public_classic_scope_t8_residual_reassessment_test',
    reviewVersion: CAREER_PERSONALIZATION_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW_VERSION,
    status: 'RESOLVED_CAREER_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW',
    decision:
      'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORIZED_FOR_RESEARCH_T6_RULE_AUTHORING_ONLY_QUALIFIERS_CONTEXT_ONLY_GENERAL_P3_BLOCK_PRESERVED_NO_DAMAGE_WINNER_T8_NARRATIVE_OR_PRODUCTION',
    upstreamP3Version: CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE_VERSION,
    upstreamI252ReviewId: 'i252_t8_residual_reassessment_test',
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

function acceptedB8() {
  const p4 = acceptedP4();
  const readiness = buildCareerPersonalizationPostP4T8ReadinessReview(p4);
  const b4 = buildCareerPersonalizationBoundedT5T6T8SynthesisMethodologyReview(p4, readiness);
  const b5 = buildCareerPersonalizationT8SynthesisAuthorityGapRequirementsReview(
    p4,
    readiness,
    b4,
  );
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
  return buildCareerPersonalizationT8SynthesisAuthorityCandidateRequirementCoverageEvaluation(
    b6,
    b7,
  );
}

describe('Career T8 synthesis authority residual-gap reassessment review', () => {
  test('confirms all six gaps remain open after B8 coverage evaluation', () => {
    const report = buildCareerPersonalizationT8SynthesisAuthorityResidualGapReassessmentReview(
      acceptedB8(),
    );

    expect(report.reviewVersion).toBe(
      CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_RESIDUAL_GAP_REASSESSMENT_REVIEW_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_CAREER_T8_SYNTHESIS_AUTHORITY_RESIDUAL_GAP_REASSESSMENT',
    );
    expect(report.residualGapCount).toBe(6);
    expect(report.residualGaps).toHaveLength(6);
    expect(report.residualGaps.map((item) => item.gapId)).toEqual(
      CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    );
    expect(report.residualGaps.every((item) => item.gapClosed === false)).toBe(true);
    expect(report.allSixGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
  });

  test('identifies the current T5/T6 to Career semantic bridge as the universal blocker', () => {
    const report = buildCareerPersonalizationT8SynthesisAuthorityResidualGapReassessmentReview(
      acceptedB8(),
    );

    expect(report.currentT5T6SemanticBridgeIsUniversalResidual).toBe(true);
    expect(report.universalResidualRequirementIds).toEqual([
      'CURRENT_PERSONALIZED_T5_T6_SEMANTIC_BRIDGE',
    ]);
    expect(report.residualGaps.every((item) => item.currentT5T6BridgeResidual)).toBe(true);
  });

  test('classifies subtype and family gaps as Ten-God-to-Career bridge residuals', () => {
    const report = buildCareerPersonalizationT8SynthesisAuthorityResidualGapReassessmentReview(
      acceptedB8(),
    );
    const subtype = report.residualGaps.find(
      (item) => item.gapId === 'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING',
    );
    const family = report.residualGaps.find(
      (item) => item.gapId === 'FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING',
    );

    expect(subtype?.residualClass).toBe('TEN_GOD_TO_CAREER_BRIDGE_RESIDUAL');
    expect(family?.residualClass).toBe('TEN_GOD_TO_CAREER_BRIDGE_RESIDUAL');
    expect(subtype?.explicitCareerSemanticResidual).toBe(true);
    expect(family?.explicitCareerSemanticResidual).toBe(true);
  });

  test('classifies the three structural modifier gaps with primary-page and Career bridge residuals', () => {
    const report = buildCareerPersonalizationT8SynthesisAuthorityResidualGapReassessmentReview(
      acceptedB8(),
    );

    for (const gapId of [
      'BRANCH_CLASH_TO_T5_CAREER_SEMANTIC_MODIFIER_MISSING',
      'VISIBILITY_POSITION_PLURALITY_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
      'SEASONAL_PHASE_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
    ]) {
      const gap = report.residualGaps.find((item) => item.gapId === gapId);
      expect(gap?.residualClass).toBe(
        'STRUCTURAL_MODIFIER_TO_CAREER_BRIDGE_AND_PROVENANCE_RESIDUAL',
      );
      expect(gap?.primaryPassageBindingResidual).toBe(true);
      expect(gap?.explicitCareerSemanticResidual).toBe(true);
      expect(gap?.competingMethodologyCompatibilityResidual).toBe(true);
    }
  });

  test('preserves the unique Qianli Career evidence without treating it as current-contract authority', () => {
    const report = buildCareerPersonalizationT8SynthesisAuthorityResidualGapReassessmentReview(
      acceptedB8(),
    );

    expect(report.qianliExplicitCareerBindingPreserved).toBe(true);
    expect(report.qianliCurrentT5T6BridgeStillMissing).toBe(true);
    expect(report.qianliPrimaryPageBindingStillMissing).toBe(true);
    expect(report.qianliCompetingMethodologyInputs).toEqual(['用神', '喜忌']);
    expect(report.noCurrentCandidateMayBePromoted).toBe(true);
  });

  test('prioritizes current T5/T6 bridge authority and keeps page/provenance work secondary', () => {
    const report = buildCareerPersonalizationT8SynthesisAuthorityResidualGapReassessmentReview(
      acceptedB8(),
    );

    expect(report.acquisitionTrackCount).toBe(4);
    expect(report.primaryTrackId).toBe('CURRENT_T5_T6_TO_CAREER_SEMANTIC_BRIDGE_AUTHORITY');
    const primary = report.acquisitionTracks.find(
      (track) => track.trackId === 'CURRENT_T5_T6_TO_CAREER_SEMANTIC_BRIDGE_AUTHORITY',
    );
    expect(primary?.priority).toBe('PRIMARY');
    expect(primary?.targetsGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(
      report.acquisitionTracks.filter((track) => track.priority === 'SECONDARY').map((track) => track.trackId),
    ).toEqual([
      'QIANLI_PRIMARY_PASSAGE_PAGE_BINDING',
      'SHENFENG_PRIMARY_PASSAGE_PROVENANCE_BINDING',
    ]);
  });

  test('defers the Qianli Yongshin/Xiji path because it is a competing methodology choice', () => {
    const report = buildCareerPersonalizationT8SynthesisAuthorityResidualGapReassessmentReview(
      acceptedB8(),
    );
    const competing = report.acquisitionTracks.find(
      (track) => track.trackId === 'QIANLI_YONGSHIN_XIJI_COMPETING_METHODOLOGY_APPLICABILITY',
    );

    expect(report.qianliCompetingMethodologyTrackDeferred).toBe(true);
    expect(report.qianliCompetingMethodologyMayBeAdoptedByThisReview).toBe(false);
    expect(competing?.priority).toBe('DEFERRED_REQUIRES_METHODOLOGY_CHOICE');
    expect(competing?.opensCompetingMethodology).toBe(true);
    expect(competing?.userOrDomainMethodologyChoiceRequiredBeforeExecution).toBe(true);
    expect(competing?.executableByThisReview).toBe(false);
  });

  test('keeps no-shortcut controls and creates zero executable interpretation artifacts', () => {
    const report = buildCareerPersonalizationT8SynthesisAuthorityResidualGapReassessmentReview(
      acceptedB8(),
    );

    expect(report.controlIds).toEqual(CAREER_T8_RESIDUAL_GAP_REASSESSMENT_CONTROL_IDS);
    expect(report.controlCount).toBe(12);
    expect(report.controlsFrozen).toBe(true);
    expect(report.sameGapCrossCandidateCompositionAuthorized).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.implementationEffects).toEqual({
      sourceCandidatesDiscovered: 0,
      sourceRegistrationsCreated: 0,
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

  test('fails closed on a tampered B8 coverage evaluation', () => {
    const b8 = acceptedB8();
    const tampered = { ...b8, authorityGapClosedCount: 1 } as unknown as typeof b8;
    const report = buildCareerPersonalizationT8SynthesisAuthorityResidualGapReassessmentReview(
      tampered,
    );

    expect(report.status).toBe('UPSTREAM_B8_BOUNDARY_INVALID');
    expect(report.exactB8BoundaryAccepted).toBe(false);
    expect(report.residualGapCount).toBe(0);
    expect(report.residualGaps).toEqual([]);
    expect(report.acquisitionTracks).toEqual([]);
    expect(report.controlsFrozen).toBe(false);
  });

  test('is deterministic and routes to current T5/T6 bridge acquisition readiness only', () => {
    const b8 = acceptedB8();
    const first = buildCareerPersonalizationT8SynthesisAuthorityResidualGapReassessmentReview(b8);
    const second = buildCareerPersonalizationT8SynthesisAuthorityResidualGapReassessmentReview(b8);

    expect(first.reviewId).toBe(second.reviewId);
    expect(deterministicContentHash(first)).toBe(deterministicContentHash(second));
    expect(first.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_ACQUISITION_READINESS_REVIEW',
    );
  });
});
