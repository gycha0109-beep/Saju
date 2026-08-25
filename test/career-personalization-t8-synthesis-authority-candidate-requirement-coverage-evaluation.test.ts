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
import {
  CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_CANDIDATE_REQUIREMENT_COVERAGE_EVALUATION_VERSION,
  CAREER_T8_CANDIDATE_COVERAGE_CONTROL_IDS,
  CAREER_T8_CANDIDATE_COVERAGE_REQUIREMENT_IDS,
  buildCareerPersonalizationT8SynthesisAuthorityCandidateRequirementCoverageEvaluation,
} from '../src/research/career-personalization-t8-synthesis-authority-candidate-requirement-coverage-evaluation.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';

function acceptedP4(): CareerT6PublicClassicBoundedScopeMethodologyReviewReport {
  return {
    reviewId: 'career_t6_public_classic_scope_t8_candidate_coverage_test',
    reviewVersion: CAREER_PERSONALIZATION_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW_VERSION,
    status: 'RESOLVED_CAREER_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW',
    decision:
      'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORIZED_FOR_RESEARCH_T6_RULE_AUTHORING_ONLY_QUALIFIERS_CONTEXT_ONLY_GENERAL_P3_BLOCK_PRESERVED_NO_DAMAGE_WINNER_T8_NARRATIVE_OR_PRODUCTION',
    upstreamP3Version: CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE_VERSION,
    upstreamI252ReviewId: 'i252_t8_candidate_coverage_test',
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

function acceptedInputs() {
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
  return { b6, b7 };
}

function coverageState(
  report: ReturnType<
    typeof buildCareerPersonalizationT8SynthesisAuthorityCandidateRequirementCoverageEvaluation
  >,
  sourceTitle: string,
  gapId: string,
  requirementId: string,
) {
  return report.evaluations
    .find((evaluation) => evaluation.sourceTitle === sourceTitle && evaluation.gapId === gapId)
    ?.requirementResults.find((requirement) => requirement.requirementId === requirementId)
    ?.coverageState;
}

describe('Career T8 synthesis authority candidate requirement coverage evaluation', () => {
  test('evaluates eleven candidate-gap pairs and accepts zero authority', () => {
    const { b6, b7 } = acceptedInputs();
    const report =
      buildCareerPersonalizationT8SynthesisAuthorityCandidateRequirementCoverageEvaluation(b6, b7);

    expect(report.evaluationVersion).toBe(
      CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_CANDIDATE_REQUIREMENT_COVERAGE_EVALUATION_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_CAREER_T8_SYNTHESIS_AUTHORITY_CANDIDATE_REQUIREMENT_COVERAGE_EVALUATION',
    );
    expect(report.candidateCount).toBe(4);
    expect(report.candidateGapEvaluationCount).toBe(11);
    expect(report.evaluations).toHaveLength(11);
    expect(report.fullySatisfiedCandidateGapEvaluationCount).toBe(0);
    expect(report.authorityAcceptedCandidateCount).toBe(0);
    expect(report.authorityGapClosedCount).toBe(0);
  });

  test('keeps all six gaps open with no fully satisfying candidate', () => {
    const { b6, b7 } = acceptedInputs();
    const report =
      buildCareerPersonalizationT8SynthesisAuthorityCandidateRequirementCoverageEvaluation(b6, b7);

    expect(report.evaluatedGapCount).toBe(6);
    expect(report.gapSummaries).toHaveLength(6);
    expect(report.gapSummaries.map((item) => item.gapId)).toEqual(
      CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    );
    expect(report.gapSummaries.every((item) => item.fullySatisfyingCandidateCount === 0)).toBe(
      true,
    );
    expect(report.gapSummaries.every((item) => !item.gapClosed)).toBe(true);
    expect(report.gapSummaries.every((item) => item.partialEvidenceCompositionBlocked)).toBe(true);
    expect(report.allSixGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
  });

  test('requires the current personalized T5/T6 semantic bridge for every candidate-gap evaluation', () => {
    const { b6, b7 } = acceptedInputs();
    const report =
      buildCareerPersonalizationT8SynthesisAuthorityCandidateRequirementCoverageEvaluation(b6, b7);

    expect(report.currentPersonalizedT5T6BridgeMissingForEveryEvaluation).toBe(true);
    expect(report.evaluations.every((item) => item.currentT5T6BridgeMissing)).toBe(true);
    expect(
      report.evaluations.every((item) =>
        item.missingRequirementIds.includes('CURRENT_PERSONALIZED_T5_T6_SEMANTIC_BRIDGE'),
      ),
    ).toBe(true);
  });

  test('keeps 千里命稿 Career wording insufficient because primary page, current bridge, and methodology compatibility are missing', () => {
    const { b6, b7 } = acceptedInputs();
    const report =
      buildCareerPersonalizationT8SynthesisAuthorityCandidateRequirementCoverageEvaluation(b6, b7);
    const gapId = 'MULTI_PATTERN_CONFLICT_TENSION_COMPOSITION_POLICY_MISSING';
    const qianli = report.evaluations.find(
      (evaluation) => evaluation.sourceTitle === '千里命稿' && evaluation.gapId === gapId,
    );

    expect(qianli).toBeDefined();
    expect(
      coverageState(report, '千里命稿', gapId, 'EXPLICIT_CAREER_OR_WORK_SEMANTIC_ASSERTION'),
    ).toBe('SATISFIED');
    expect(coverageState(report, '千里命稿', gapId, 'ORIGINAL_PRIMARY_WITNESS_EXACT_PASSAGE')).toBe(
      'UNSATISFIED',
    );
    expect(coverageState(report, '千里命稿', gapId, 'CURRENT_PERSONALIZED_T5_T6_SEMANTIC_BRIDGE')).toBe(
      'UNSATISFIED',
    );
    expect(coverageState(report, '千里命稿', gapId, 'METHODOLOGY_INPUT_COMPATIBILITY')).toBe(
      'UNSATISFIED',
    );
    expect(qianli?.competingMethodologyInputMismatchObserved).toBe(true);
    expect(report.qianliCompetingMethodologyInputs).toEqual(['用神', '喜忌']);
    expect(report.qianliPrimaryPassageBindingStillMissing).toBe(true);
  });

  test('does not let 千里命稿 structural qualifiers inherit its separate 事業 statement', () => {
    const { b6, b7 } = acceptedInputs();
    const report =
      buildCareerPersonalizationT8SynthesisAuthorityCandidateRequirementCoverageEvaluation(b6, b7);

    for (const gapId of [
      'BRANCH_CLASH_TO_T5_CAREER_SEMANTIC_MODIFIER_MISSING',
      'VISIBILITY_POSITION_PLURALITY_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
      'SEASONAL_PHASE_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
    ]) {
      expect(
        coverageState(report, '千里命稿', gapId, 'EXPLICIT_CAREER_OR_WORK_SEMANTIC_ASSERTION'),
      ).toBe('UNSATISFIED');
    }
  });

  test('preserves primary passage strength for 精選命理約言 and 子平真詮 without inventing Career semantics', () => {
    const { b6, b7 } = acceptedInputs();
    const report =
      buildCareerPersonalizationT8SynthesisAuthorityCandidateRequirementCoverageEvaluation(b6, b7);

    const jingxuanGap = 'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING';
    expect(
      coverageState(report, '精選命理約言', jingxuanGap, 'ORIGINAL_PRIMARY_WITNESS_EXACT_PASSAGE'),
    ).toBe('SATISFIED');
    expect(
      coverageState(report, '精選命理約言', jingxuanGap, 'EXPLICIT_CAREER_OR_WORK_SEMANTIC_ASSERTION'),
    ).toBe('UNSATISFIED');

    const zipingGap = 'MULTI_PATTERN_CONFLICT_TENSION_COMPOSITION_POLICY_MISSING';
    expect(
      coverageState(report, '子平真詮', zipingGap, 'ORIGINAL_PRIMARY_WITNESS_EXACT_PASSAGE'),
    ).toBe('SATISFIED');
    expect(
      coverageState(report, '子平真詮', zipingGap, 'EXPLICIT_CAREER_OR_WORK_SEMANTIC_ASSERTION'),
    ).toBe('UNSATISFIED');
  });

  test('keeps 神峰通考 deficient on primary passage provenance and Career bridge', () => {
    const { b6, b7 } = acceptedInputs();
    const report =
      buildCareerPersonalizationT8SynthesisAuthorityCandidateRequirementCoverageEvaluation(b6, b7);
    const gapId = 'FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING';

    expect(coverageState(report, '神峰通考', gapId, 'ORIGINAL_PRIMARY_WITNESS_EXACT_PASSAGE')).toBe(
      'UNSATISFIED',
    );
    expect(coverageState(report, '神峰通考', gapId, 'INDEPENDENT_NORMATIVE_PROVENANCE')).toBe(
      'UNSATISFIED',
    );
    expect(
      coverageState(report, '神峰通考', gapId, 'EXPLICIT_CAREER_OR_WORK_SEMANTIC_ASSERTION'),
    ).toBe('UNSATISFIED');
    expect(coverageState(report, '神峰通考', gapId, 'CURRENT_PERSONALIZED_T5_T6_SEMANTIC_BRIDGE')).toBe(
      'UNSATISFIED',
    );
  });

  test('freezes all eleven requirement dimensions and all no-shortcut controls without executable artifacts', () => {
    const { b6, b7 } = acceptedInputs();
    const report =
      buildCareerPersonalizationT8SynthesisAuthorityCandidateRequirementCoverageEvaluation(b6, b7);

    expect(CAREER_T8_CANDIDATE_COVERAGE_REQUIREMENT_IDS).toHaveLength(11);
    expect(report.evaluations.every((item) => item.evaluatedRequirementCount === 11)).toBe(true);
    expect(report.controlIds).toEqual(CAREER_T8_CANDIDATE_COVERAGE_CONTROL_IDS);
    expect(report.controlCount).toBe(12);
    expect(report.controlsFrozen).toBe(true);
    expect(report.sameGapCrossCandidateCompositionPerformed).toBe(false);
    expect(report.sameGapCrossCandidateCompositionAuthorized).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.implementationEffects).toEqual({
      coverageEvaluationsCreated: 11,
      sourceRegistrationsCreated: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      registrySnapshotsCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    });
  });

  test('fails closed when B7 evidence is tampered', () => {
    const { b6, b7 } = acceptedInputs();
    const tampered = {
      ...b7,
      inspectedCandidateCount: 3,
    } as unknown as typeof b7;
    const report =
      buildCareerPersonalizationT8SynthesisAuthorityCandidateRequirementCoverageEvaluation(
        b6,
        tampered,
      );

    expect(report.status).toBe('UPSTREAM_B7_BOUNDARY_INVALID');
    expect(report.exactB7BoundaryAccepted).toBe(false);
    expect(report.candidateCount).toBe(0);
    expect(report.candidateGapEvaluationCount).toBe(0);
    expect(report.evaluations).toEqual([]);
    expect(report.gapSummaries).toEqual([]);
    expect(report.controlsFrozen).toBe(false);
  });

  test('is deterministic and routes only to residual-gap reassessment', () => {
    const { b6, b7 } = acceptedInputs();
    const first =
      buildCareerPersonalizationT8SynthesisAuthorityCandidateRequirementCoverageEvaluation(b6, b7);
    const second =
      buildCareerPersonalizationT8SynthesisAuthorityCandidateRequirementCoverageEvaluation(b6, b7);

    expect(first.evaluationId).toBe(second.evaluationId);
    expect(deterministicContentHash(first)).toBe(deterministicContentHash(second));
    expect(first.noSingleCandidateFullySatisfiesAnyGap).toBe(true);
    expect(first.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_RESIDUAL_GAP_REASSESSMENT_REVIEW',
    );
  });
});
