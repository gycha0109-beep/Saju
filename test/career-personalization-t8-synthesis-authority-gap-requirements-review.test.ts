import { describe, expect, test } from 'vitest';
import {
  CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
  buildCareerPersonalizationBoundedT5T6T8SynthesisMethodologyReview,
  type CareerPersonalizationBoundedT5T6T8SynthesisMethodologyReviewReport,
} from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  buildCareerPersonalizationPostP4T8ReadinessReview,
  type CareerPersonalizationPostP4T8ReadinessReviewReport,
} from '../src/research/career-personalization-post-p4-t8-readiness-review.js';
import {
  CAREER_PERSONALIZATION_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW_VERSION,
  CAREER_T6_PUBLIC_CLASSIC_ALLOWED_QUALIFIER_IDS,
  CAREER_T6_PUBLIC_CLASSIC_CONTROL_IDS,
  type CareerT6PublicClassicBoundedScopeMethodologyReviewReport,
} from '../src/research/career-personalization-t6-public-classic-bounded-scope-methodology-review.js';
import { CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE_VERSION } from '../src/research/career-personalization-t6-methodology-gate.js';
import {
  CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_GAP_REQUIREMENTS_REVIEW_VERSION,
  CAREER_T8_SYNTHESIS_AUTHORITY_REQUIREMENTS,
  CAREER_T8_SYNTHESIS_AUTHORITY_REQUIREMENT_CONTROL_IDS,
  buildCareerPersonalizationT8SynthesisAuthorityGapRequirementsReview,
} from '../src/research/career-personalization-t8-synthesis-authority-gap-requirements-review.js';

function acceptedP4(): CareerT6PublicClassicBoundedScopeMethodologyReviewReport {
  return {
    reviewId: 'career_t6_public_classic_scope_t8_requirements_test',
    reviewVersion: CAREER_PERSONALIZATION_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW_VERSION,
    status: 'RESOLVED_CAREER_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW',
    decision:
      'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORIZED_FOR_RESEARCH_T6_RULE_AUTHORING_ONLY_QUALIFIERS_CONTEXT_ONLY_GENERAL_P3_BLOCK_PRESERVED_NO_DAMAGE_WINNER_T8_NARRATIVE_OR_PRODUCTION',
    upstreamP3Version: CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE_VERSION,
    upstreamI252ReviewId: 'i252_t8_requirements_test',
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

function readiness(p4: CareerT6PublicClassicBoundedScopeMethodologyReviewReport) {
  return buildCareerPersonalizationPostP4T8ReadinessReview(p4);
}

function b4(
  p4: CareerT6PublicClassicBoundedScopeMethodologyReviewReport,
  acceptedReadiness: CareerPersonalizationPostP4T8ReadinessReviewReport,
) {
  return buildCareerPersonalizationBoundedT5T6T8SynthesisMethodologyReview(p4, acceptedReadiness);
}

function acceptedInputs() {
  const p4 = acceptedP4();
  const acceptedReadiness = readiness(p4);
  const acceptedB4 = b4(p4, acceptedReadiness);
  return { p4, acceptedReadiness, acceptedB4 };
}

describe('Career T8 synthesis authority-gap requirements review', () => {
  test('freezes six mandatory authority requirements without authorizing T8 semantics', () => {
    const { p4, acceptedReadiness, acceptedB4 } = acceptedInputs();
    const report = buildCareerPersonalizationT8SynthesisAuthorityGapRequirementsReview(
      p4,
      acceptedReadiness,
      acceptedB4,
    );

    expect(report.reviewVersion).toBe(
      CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_GAP_REQUIREMENTS_REVIEW_VERSION,
    );
    expect(report.status).toBe('RESOLVED_CAREER_T8_SYNTHESIS_AUTHORITY_GAP_REQUIREMENTS_REVIEW');
    expect(report.decision).toBe(
      'SIX_PERSONALIZED_CAREER_T8_SYNTHESIS_AUTHORITY_REQUIREMENTS_FROZEN_NO_T8_SEMANTICS_AUTHORIZED',
    );
    expect(report.authorityGapConfirmed).toBe(true);
    expect(report.authorityGapClosed).toBe(false);
    expect(report.additionalAuthorityRequired).toBe(true);
    expect(report.requirementCount).toBe(6);
    expect(report.requirements).toHaveLength(6);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
  });

  test('covers every B4 synthesis gap exactly once', () => {
    const { p4, acceptedReadiness, acceptedB4 } = acceptedInputs();
    const report = buildCareerPersonalizationT8SynthesisAuthorityGapRequirementsReview(
      p4,
      acceptedReadiness,
      acceptedB4,
    );
    const requirementIds = report.requirements.map((item) => item.gapId);

    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.unresolvedGapCount).toBe(6);
    expect(requirementIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(new Set(requirementIds).size).toBe(6);
    expect(report.everyB4GapCoveredExactlyOnce).toBe(true);
  });

  test('requires explicit Career/work semantic binding and exact provenance for all six gaps', () => {
    expect(CAREER_T8_SYNTHESIS_AUTHORITY_REQUIREMENTS).toHaveLength(6);
    expect(
      CAREER_T8_SYNTHESIS_AUTHORITY_REQUIREMENTS.every(
        (item) =>
          item.mandatory &&
          item.domainScopeRequired === 'career_or_work_expression' &&
          item.temporalScopeRequired === 'natal' &&
          item.exactSourceIdentityRequired &&
          item.exactLocatorRequired &&
          item.originalOrVerifiedSourceContextRequired &&
          item.explicitSemanticBindingRequired &&
          item.explicitContextOrExceptionTreatmentRequired &&
          item.independentNormativeProvenanceRequired &&
          item.requiredAuthorityAssertions.length >= 3,
      ),
    ).toBe(true);
  });

  test('forbids shortcut closure through snippets, model synthesis, calibration, numbers, or legacy T8', () => {
    const { p4, acceptedReadiness, acceptedB4 } = acceptedInputs();
    const report = buildCareerPersonalizationT8SynthesisAuthorityGapRequirementsReview(
      p4,
      acceptedReadiness,
      acceptedB4,
    );

    expect(
      report.requirements.every(
        (item) =>
          !item.mayBeSatisfiedByExistingLowerTierClaimPresenceAlone &&
          !item.mayBeSatisfiedByGeneralKnowledge &&
          !item.mayBeSatisfiedBySearchSnippet &&
          !item.mayBeSatisfiedByModelSynthesis &&
          !item.mayBeSatisfiedByEmpiricalCalibrationAlone &&
          !item.mayBeSatisfiedByNumericWeighting &&
          !item.mayBeSatisfiedByLegacyCareerT8Reuse,
      ),
    ).toBe(true);
    expect(report.sourceRegistrationAloneClosesGap).toBe(false);
    expect(report.requirementCoverageEvaluationRequiredAfterAcquisition).toBe(true);
    expect(report.multiSourceCompositionPolicyRequiredBeforeCombining).toBe(true);
  });

  test('keeps seasonal and clash requirements qualitative and bounded', () => {
    const seasonal = CAREER_T8_SYNTHESIS_AUTHORITY_REQUIREMENTS.find(
      (item) => item.gapId === 'SEASONAL_PHASE_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
    );
    const clash = CAREER_T8_SYNTHESIS_AUTHORITY_REQUIREMENTS.find(
      (item) => item.gapId === 'BRANCH_CLASH_TO_T5_CAREER_SEMANTIC_MODIFIER_MISSING',
    );

    expect(seasonal?.requiredAuthorityAssertions.join(' ')).toContain('旺/相/休/囚/死');
    expect(seasonal?.requiredAuthorityAssertions.join(' ')).toContain('numeric');
    expect(seasonal?.requiredAuthorityAssertions.join(' ')).toContain('winner');
    expect(clash?.requiredAuthorityAssertions.join(' ')).toContain('relation-local');
    expect(clash?.requiredAuthorityAssertions.join(' ')).toContain('arbitrary hidden-stem coexistence');
  });

  test('freezes controls and creates zero executable interpretation artifacts', () => {
    const { p4, acceptedReadiness, acceptedB4 } = acceptedInputs();
    const report = buildCareerPersonalizationT8SynthesisAuthorityGapRequirementsReview(
      p4,
      acceptedReadiness,
      acceptedB4,
    );

    expect(report.controlIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_REQUIREMENT_CONTROL_IDS);
    expect(report.controlCount).toBe(15);
    expect(report.controlsFrozen).toBe(true);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.implementationEffects).toEqual({
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      registrySnapshotsCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    });
    expect(report.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_ACQUISITION_READINESS_REVIEW',
    );
  });

  test('fails closed when B4 is not the exact deterministic report for the supplied upstream inputs', () => {
    const { p4, acceptedReadiness, acceptedB4 } = acceptedInputs();
    const tampered = {
      ...acceptedB4,
      unresolvedAuthorityGapIds: acceptedB4.unresolvedAuthorityGapIds.slice(0, 5),
    } as unknown as CareerPersonalizationBoundedT5T6T8SynthesisMethodologyReviewReport;
    const report = buildCareerPersonalizationT8SynthesisAuthorityGapRequirementsReview(
      p4,
      acceptedReadiness,
      tampered,
    );

    expect(report.status).toBe('UPSTREAM_B4_BOUNDARY_INVALID');
    expect(report.decision).toBe('CAREER_T8_SYNTHESIS_AUTHORITY_REQUIREMENTS_NOT_FROZEN');
    expect(report.exactB4BoundaryAccepted).toBe(false);
    expect(report.authorityGapConfirmed).toBe(false);
    expect(report.requirements).toEqual([]);
    expect(report.controlIds).toEqual([]);
    expect(report.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_GAP_REQUIREMENTS_REVIEW',
    );
  });

  test('fails closed if the supplied P4 boundary changes underneath the accepted B4 report', () => {
    const { p4, acceptedReadiness, acceptedB4 } = acceptedInputs();
    const widenedP4 = {
      ...p4,
      careerT8SynthesisAuthorizedByThisGate: true,
    } as unknown as CareerT6PublicClassicBoundedScopeMethodologyReviewReport;
    const report = buildCareerPersonalizationT8SynthesisAuthorityGapRequirementsReview(
      widenedP4,
      acceptedReadiness,
      acceptedB4,
    );

    expect(report.status).toBe('UPSTREAM_B4_BOUNDARY_INVALID');
    expect(report.exactB4BoundaryAccepted).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
  });

  test('is deterministic for the same exact upstream inputs', () => {
    const { p4, acceptedReadiness, acceptedB4 } = acceptedInputs();
    const first = buildCareerPersonalizationT8SynthesisAuthorityGapRequirementsReview(
      p4,
      acceptedReadiness,
      acceptedB4,
    );
    const second = buildCareerPersonalizationT8SynthesisAuthorityGapRequirementsReview(
      p4,
      acceptedReadiness,
      acceptedB4,
    );

    expect(first.reviewId).toBe(second.reviewId);
    expect(first).toEqual(second);
  });
});
