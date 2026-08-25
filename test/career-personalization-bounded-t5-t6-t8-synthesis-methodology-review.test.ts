import { describe, expect, test } from 'vitest';
import {
  CAREER_NATAL_READING_CANDIDATE_VERSION,
  CAREER_NATAL_READING_RULES,
} from '../src/research/career-natal-reading-candidate.js';
import {
  CAREER_T5_FAMILY_RELATION_CLAIM_TYPE,
  CAREER_T5_SUBTYPE_CLAIM_TYPE,
} from '../src/research/career-personalized-t5-substrate.js';
import { CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE } from '../src/research/career-personalized-t6-branch-clash-hidden-stem-context.js';
import { CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_TYPE } from '../src/research/career-personalized-t6-branch-clash-qualifier-context.js';
import { CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_TYPE } from '../src/research/career-personalized-t6-branch-clash-seasonal-qualifier.js';
import {
  CAREER_PERSONALIZATION_BOUNDED_T5_T6_T8_SYNTHESIS_METHODOLOGY_REVIEW_VERSION,
  CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
  CAREER_T8_SYNTHESIS_METHODOLOGY_CONTROL_IDS,
  buildCareerPersonalizationBoundedT5T6T8SynthesisMethodologyReview,
} from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_POST_P4_AVAILABLE_CLAIM_TYPES,
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

function acceptedP4(): CareerT6PublicClassicBoundedScopeMethodologyReviewReport {
  return {
    reviewId: 'career_t6_public_classic_scope_t8_methodology_test',
    reviewVersion: CAREER_PERSONALIZATION_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW_VERSION,
    status: 'RESOLVED_CAREER_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW',
    decision:
      'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORIZED_FOR_RESEARCH_T6_RULE_AUTHORING_ONLY_QUALIFIERS_CONTEXT_ONLY_GENERAL_P3_BLOCK_PRESERVED_NO_DAMAGE_WINNER_T8_NARRATIVE_OR_PRODUCTION',
    upstreamP3Version: CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE_VERSION,
    upstreamI252ReviewId: 'i252_t8_methodology_test',
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

function readiness(p4 = acceptedP4()): CareerPersonalizationPostP4T8ReadinessReviewReport {
  return buildCareerPersonalizationPostP4T8ReadinessReview(p4);
}

describe('bounded Career T5/T6 -> T8 synthesis methodology review', () => {
  test('resolves the methodology review but keeps personalized T8 authoring blocked', () => {
    const p4 = acceptedP4();
    const report = buildCareerPersonalizationBoundedT5T6T8SynthesisMethodologyReview(
      p4,
      readiness(p4),
    );

    expect(report.reviewVersion).toBe(
      CAREER_PERSONALIZATION_BOUNDED_T5_T6_T8_SYNTHESIS_METHODOLOGY_REVIEW_VERSION,
    );
    expect(report.status).toBe('RESOLVED_BOUNDED_T5_T6_T8_SYNTHESIS_METHODOLOGY_REVIEW');
    expect(report.decision).toBe(
      'CURRENT_SOURCE_AUTHORITY_INSUFFICIENT_FOR_PERSONALIZED_CAREER_T8_SYNTHESIS_NO_T8_AUTHORING_NEXT_AUTHORITY_GAP_REVIEW',
    );
    expect(report.multiEvidenceInputShapeAvailable).toBe(true);
    expect(report.sourceBoundCrossTierCareerSynthesisAuthorityPresent).toBe(false);
    expect(report.t5OnlyPersonalizedCareerSynthesisAuthorityPresent).toBe(false);
    expect(report.t6MayModifyT5CareerSemantics).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_GAP_REQUIREMENTS_REVIEW',
    );
  });

  test('recognizes multiple registered inputs without treating multiplicity as semantic authority', () => {
    const p4 = acceptedP4();
    const report = buildCareerPersonalizationBoundedT5T6T8SynthesisMethodologyReview(
      p4,
      readiness(p4),
    );
    const multiEvidence = report.authorityDecisions.find(
      (decision) => decision.dimension === 'multi_evidence_input_shape',
    );

    expect(report.exactAvailableClaimInventoryAccepted).toBe(true);
    expect(CAREER_POST_P4_AVAILABLE_CLAIM_TYPES).toEqual([
      CAREER_T5_SUBTYPE_CLAIM_TYPE,
      CAREER_T5_FAMILY_RELATION_CLAIM_TYPE,
      CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE,
      CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_TYPE,
      CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_TYPE,
    ]);
    expect(multiEvidence).toEqual(
      expect.objectContaining({
        state: 'structurally_available_only',
        mayDefinePersonalizedCareerT8SemanticRule: false,
        numericWeightingAuthorized: false,
      }),
    );
  });

  test('records six concrete semantic authority gaps instead of inventing composition rules', () => {
    const p4 = acceptedP4();
    const report = buildCareerPersonalizationBoundedT5T6T8SynthesisMethodologyReview(
      p4,
      readiness(p4),
    );

    expect(report.authorityDecisionCount).toBe(7);
    expect(report.authorityDecisions).toHaveLength(7);
    expect(report.unresolvedAuthorityGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.unresolvedAuthorityGapCount).toBe(6);
    expect(
      report.authorityDecisions.every(
        (decision) =>
          decision.mayDefinePersonalizedCareerT8SemanticRule === false &&
          decision.numericWeightingAuthorized === false,
      ),
    ).toBe(true);
  });

  test('keeps exact subtype and broad-family authority at T5 while T6 remains context only', () => {
    const p4 = acceptedP4();
    const report = buildCareerPersonalizationBoundedT5T6T8SynthesisMethodologyReview(
      p4,
      readiness(p4),
    );
    const byDimension = new Map(
      report.authorityDecisions.map((decision) => [decision.dimension, decision]),
    );

    expect(byDimension.get('exact_subtype_semantic_composition')?.state).toBe(
      'lower_tier_authority_only',
    );
    expect(byDimension.get('family_relation_career_composition')?.state).toBe(
      'lower_tier_authority_only',
    );
    expect(byDimension.get('branch_clash_career_modifier')?.state).toBe('context_only');
    expect(byDimension.get('visibility_position_plurality_career_modifier')?.state).toBe(
      'context_only',
    );
    expect(byDimension.get('seasonal_phase_career_modifier')?.state).toBe('context_only');
    expect(byDimension.get('conflict_tension_resolution')?.state).toBe('missing_authority');
  });

  test('audits the legacy Career T8 path as raw-fact direct T8 and refuses reuse', () => {
    const p4 = acceptedP4();
    const report = buildCareerPersonalizationBoundedT5T6T8SynthesisMethodologyReview(
      p4,
      readiness(p4),
    );

    expect(CAREER_NATAL_READING_CANDIDATE_VERSION).toBe('0.4.0-research');
    expect(CAREER_NATAL_READING_RULES).toHaveLength(20);
    expect(report.legacyT8Audit).toEqual(
      expect.objectContaining({
        candidateVersion: CAREER_NATAL_READING_CANDIDATE_VERSION,
        ruleCount: 20,
        allRulesTierT8Career: true,
        allRulesReadRawDerivedTenGodFact: true,
        consumesPersonalizedT5Claims: false,
        consumesBoundedT6Claims: false,
        personalizedArchitectureCompatible: false,
        reuseAuthorized: false,
      }),
    );
    expect(report.legacyCareerT8MayBeConsumed).toBe(false);
  });

  test('freezes no-shortcut controls and creates zero executable interpretation artifacts', () => {
    const p4 = acceptedP4();
    const report = buildCareerPersonalizationBoundedT5T6T8SynthesisMethodologyReview(
      p4,
      readiness(p4),
    );

    expect(report.controlIds).toEqual(CAREER_T8_SYNTHESIS_METHODOLOGY_CONTROL_IDS);
    expect(report.controlCount).toBe(14);
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
      previewRoutesChanged: 0,
    });
  });

  test('fails closed if the readiness report is not the exact deterministic report for the supplied P4 boundary', () => {
    const p4 = acceptedP4();
    const base = readiness(p4);
    const tampered = {
      ...base,
      availableClaimTypes: base.availableClaimTypes.slice(0, 4),
    } as unknown as CareerPersonalizationPostP4T8ReadinessReviewReport;
    const report = buildCareerPersonalizationBoundedT5T6T8SynthesisMethodologyReview(p4, tampered);

    expect(report.status).toBe('UPSTREAM_BOUNDARY_INVALID');
    expect(report.decision).toBe('BOUNDED_T5_T6_T8_SYNTHESIS_METHODOLOGY_REVIEW_NOT_ESTABLISHED');
    expect(report.multiEvidenceInputShapeAvailable).toBe(false);
    expect(report.authorityDecisions).toEqual([]);
    expect(report.unresolvedAuthorityGapIds).toEqual([]);
    expect(report.controlIds).toEqual([]);
    expect(report.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_BOUNDED_T5_T6_T8_SYNTHESIS_METHODOLOGY_REVIEW',
    );
  });

  test('fails closed when the supplied P4 boundary no longer matches the accepted readiness report', () => {
    const p4 = acceptedP4();
    const acceptedReadiness = readiness(p4);
    const widenedP4 = {
      ...p4,
      careerT8SynthesisAuthorizedByThisGate: true,
    } as unknown as CareerT6PublicClassicBoundedScopeMethodologyReviewReport;
    const report = buildCareerPersonalizationBoundedT5T6T8SynthesisMethodologyReview(
      widenedP4,
      acceptedReadiness,
    );

    expect(report.status).toBe('UPSTREAM_BOUNDARY_INVALID');
    expect(report.exactReadinessBoundaryAccepted).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
  });

  test('is deterministic for the same exact P4 and readiness inputs', () => {
    const p4 = acceptedP4();
    const acceptedReadiness = readiness(p4);
    const first = buildCareerPersonalizationBoundedT5T6T8SynthesisMethodologyReview(
      p4,
      acceptedReadiness,
    );
    const second = buildCareerPersonalizationBoundedT5T6T8SynthesisMethodologyReview(
      p4,
      acceptedReadiness,
    );

    expect(first.reviewId).toBe(second.reviewId);
    expect(first).toEqual(second);
  });
});
