import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS,
  buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview,
} from '../src/research/relationship-spouse-t8-authority-acquisition-readiness-review.js';
import { buildRelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReview } from '../src/research/relationship-spouse-t8-authority-candidate-discovery-readiness-review.js';
import { buildRelationshipSpouseT8AuthorityCandidateDiscoveryEvidence } from '../src/research/relationship-spouse-t8-authority-candidate-discovery-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_REQUIREMENT_COVERAGE_EVALUATION_VERSION,
  RELATIONSHIP_SPOUSE_T8_CANDIDATE_COVERAGE_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_CANDIDATE_COVERAGE_REQUIREMENT_IDS,
  buildRelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluation,
} from '../src/research/relationship-spouse-t8-authority-candidate-requirement-coverage-evaluation.js';

function acceptedInputs() {
  const readiness = buildRelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReview(
    buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview(),
  );
  const evidence = buildRelationshipSpouseT8AuthorityCandidateDiscoveryEvidence(readiness);
  return { readiness, evidence };
}

function requirementState(
  report: ReturnType<typeof buildRelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluation>,
  sourceTitle: string,
  requirementId: (typeof RELATIONSHIP_SPOUSE_T8_CANDIDATE_COVERAGE_REQUIREMENT_IDS)[number],
) {
  const evaluation = report.evaluations.find((item) => item.sourceTitle === sourceTitle);
  return evaluation?.requirementResults.find((item) => item.requirementId === requirementId);
}

describe('Relationship spouse T8 authority candidate requirement coverage evaluation', () => {
  test('evaluates two candidates across all five spouse gaps while accepting zero authority', () => {
    const { readiness, evidence } = acceptedInputs();
    const report = buildRelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluation(
      readiness,
      evidence,
    );

    expect(report.evaluationVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_REQUIREMENT_COVERAGE_EVALUATION_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_REQUIREMENT_COVERAGE_EVALUATION',
    );
    expect(report.decision).toBe(
      'TEN_CANDIDATE_GAP_EVALUATIONS_COMPLETE_ZERO_FULL_COVERAGE_ALL_FIVE_GAPS_REMAIN_OPEN',
    );
    expect(report.candidateCount).toBe(2);
    expect(report.candidateGapEvaluationCount).toBe(10);
    expect(report.evaluatedGapCount).toBe(5);
    expect(report.fullySatisfiedCandidateGapEvaluationCount).toBe(0);
    expect(report.authorityAcceptedCandidateCount).toBe(0);
    expect(report.authorityGapClosedCount).toBe(0);
    expect(report.allFiveGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS.map((requirement) => requirement.gapId),
    );
  });

  test('applies all thirteen governed coverage requirements to every candidate-gap evaluation', () => {
    const { readiness, evidence } = acceptedInputs();
    const report = buildRelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluation(
      readiness,
      evidence,
    );

    expect(report.evaluations).toHaveLength(10);
    for (const evaluation of report.evaluations) {
      expect(evaluation.evaluatedRequirementCount).toBe(13);
      expect(evaluation.requirementResults.map((item) => item.requirementId)).toEqual(
        RELATIONSHIP_SPOUSE_T8_CANDIDATE_COVERAGE_REQUIREMENT_IDS,
      );
      expect(evaluation.allRequirementsSatisfied).toBe(false);
      expect(evaluation.candidateAcceptedForGapAuthority).toBe(false);
      expect(evaluation.gapClosedByThisEvaluation).toBe(false);
    }
  });

  test('keeps the three current-contract requirements unresolved for every evaluation', () => {
    const { readiness, evidence } = acceptedInputs();
    const report = buildRelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluation(
      readiness,
      evidence,
    );
    const commonResidual = [
      'CURRENT_SPOUSE_T5_T6_SEMANTIC_BRIDGE',
      'METHODOLOGY_INPUT_COMPATIBILITY',
      'MODERN_PRODUCT_SCOPE_COMPATIBILITY',
    ] as const;

    for (const evaluation of report.evaluations) {
      expect(evaluation.missingRequirementIds).toEqual(expect.arrayContaining([...commonResidual]));
      expect(evaluation.currentSpouseT5T6BridgeMissing).toBe(true);
      expect(evaluation.competingMethodologyInputMismatchObserved).toBe(true);
      expect(evaluation.modernProductScopeCompatibilityMissing).toBe(true);
    }
    expect(report.currentSpouseT5T6BridgeMissingForEveryEvaluation).toBe(true);
    expect(report.modernProductScopeCompatibilityMissingForEveryEvaluation).toBe(true);
    expect(report.noSingleCandidateFullySatisfiesAnyGap).toBe(true);
    expect(
      report.gapSummaries.every((summary) =>
        commonResidual.every((requirementId) =>
          summary.residualRequirementIds.includes(requirementId),
        ),
      ),
    ).toBe(true);
  });

  test('credits 子平真詮 primary witness evidence without treating it as current spouse T8 authority', () => {
    const { readiness, evidence } = acceptedInputs();
    const report = buildRelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluation(
      readiness,
      evidence,
    );

    expect(
      requirementState(report, '子平真詮', 'ORIGINAL_PRIMARY_WITNESS_EXACT_PASSAGE')?.coverageState,
    ).toBe('SATISFIED');
    expect(
      requirementState(report, '子平真詮', 'INDEPENDENT_NORMATIVE_PROVENANCE')?.coverageState,
    ).toBe('SATISFIED');
    expect(
      requirementState(report, '子平真詮', 'EXPLICIT_SPOUSE_SEMANTIC_ASSERTION')?.coverageState,
    ).toBe('SATISFIED');
    expect(
      requirementState(report, '子平真詮', 'CURRENT_SPOUSE_T5_T6_SEMANTIC_BRIDGE')?.coverageState,
    ).toBe('UNSATISFIED');
    expect(
      requirementState(report, '子平真詮', 'METHODOLOGY_INPUT_COMPATIBILITY')?.coverageState,
    ).toBe('UNSATISFIED');
    expect(
      requirementState(report, '子平真詮', 'MODERN_PRODUCT_SCOPE_COMPATIBILITY')?.coverageState,
    ).toBe('UNSATISFIED');
    expect(report.zipingPrimaryBoundSpouseEvidenceObservedButInsufficientForCurrentContract).toBe(
      true,
    );
    expect(report.zipingCompetingMethodologyInputs).toEqual(['妻宮', '月令用神', '喜忌', '格局']);
    expect(report.zipingCurrentSpouseT5T6BridgeMissing).toBe(true);
    expect(report.zipingModernProductScopeCompatibilityMissing).toBe(true);
  });

  test('keeps 滴天髓闡微 primary passage and normative provenance unsatisfied', () => {
    const { readiness, evidence } = acceptedInputs();
    const report = buildRelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluation(
      readiness,
      evidence,
    );

    expect(
      requirementState(report, '滴天髓闡微', 'ORIGINAL_PRIMARY_WITNESS_EXACT_PASSAGE')?.coverageState,
    ).toBe('UNSATISFIED');
    expect(
      requirementState(report, '滴天髓闡微', 'INDEPENDENT_NORMATIVE_PROVENANCE')?.coverageState,
    ).toBe('UNSATISFIED');
    expect(report.ditianPrimaryPassageBindingStillMissing).toBe(true);
    expect(report.ditianIndependentNormativeProvenanceStillMissing).toBe(true);
  });

  test('keeps every spouse gap open and forbids cross-candidate stitching', () => {
    const { readiness, evidence } = acceptedInputs();
    const report = buildRelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluation(
      readiness,
      evidence,
    );

    expect(report.gapSummaries).toHaveLength(5);
    expect(report.gapSummaries.every((summary) => summary.evaluatedCandidateCount === 2)).toBe(true);
    expect(report.gapSummaries.every((summary) => summary.fullySatisfyingCandidateCount === 0)).toBe(
      true,
    );
    expect(report.gapSummaries.every((summary) => !summary.gapSatisfied && !summary.gapClosed)).toBe(
      true,
    );
    expect(report.gapSummaries.every((summary) => summary.partialEvidenceCompositionBlocked)).toBe(
      true,
    );
    expect(report.sameGapCrossCandidateCompositionPerformed).toBe(false);
    expect(report.sameGapCrossCandidateCompositionAuthorized).toBe(false);
    expect(report.unresolvedShenfengGenderRoleLeadMayCloseGapByItself).toBe(false);
  });

  test('freezes fail-closed controls and creates zero executable interpretation artifacts', () => {
    const { readiness, evidence } = acceptedInputs();
    const report = buildRelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluation(
      readiness,
      evidence,
    );

    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_CANDIDATE_COVERAGE_CONTROL_IDS);
    expect(report.controlCount).toBe(13);
    expect(report.controlsFrozen).toBe(true);
    expect(report.candidateRegistrationPerformedByThisGate).toBe(false);
    expect(report.authorityAdmittedByThisGate).toBe(false);
    expect(report.spouseT8RuleAuthoringAuthorized).toBe(false);
    expect(report.spouseT8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.spouseInterpretationPackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.compatibilityAuthorityAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.implementationEffects).toEqual({
      coverageEvaluationsCreated: 10,
      sourceRegistrationsCreated: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      registrySnapshotsCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    });
    expect(report.recommendedNextGate).toBe(
      'RELATIONSHIP_SPOUSE_T8_AUTHORITY_RESIDUAL_GAP_REASSESSMENT_REVIEW',
    );
  });

  test('fails closed when discovery evidence is not the exact content-addressed boundary', () => {
    const { readiness, evidence } = acceptedInputs();
    const alteredEvidence = {
      ...evidence,
      evidenceId: `${evidence.evidenceId}_altered`,
    };
    const report = buildRelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluation(
      readiness,
      alteredEvidence,
    );

    expect(report.exactDiscoveryEvidenceBoundaryAccepted).toBe(false);
    expect(report.status).toBe('UPSTREAM_DISCOVERY_EVIDENCE_BOUNDARY_INVALID');
    expect(report.evaluations).toEqual([]);
    expect(report.gapSummaries).toEqual([]);
    expect(report.candidateCount).toBe(0);
    expect(report.candidateGapEvaluationCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
    expect(report.authorityAdmittedByThisGate).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE',
    );
  });

  test('fails closed when discovery readiness is altered even if evidence remains intact', () => {
    const { readiness, evidence } = acceptedInputs();
    const alteredReadiness = {
      ...readiness,
      reviewId: `${readiness.reviewId}_altered`,
    };
    const report = buildRelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluation(
      alteredReadiness,
      evidence,
    );

    expect(report.exactDiscoveryEvidenceBoundaryAccepted).toBe(false);
    expect(report.status).toBe('UPSTREAM_DISCOVERY_EVIDENCE_BOUNDARY_INVALID');
    expect(report.evaluations).toEqual([]);
    expect(report.controlsFrozen).toBe(false);
  });

  test('evaluation identity is deterministic and content-addressed', () => {
    const { readiness, evidence } = acceptedInputs();
    const first = buildRelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluation(
      readiness,
      evidence,
    );
    const second = buildRelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluation(
      readiness,
      evidence,
    );

    expect(first).toEqual(second);
    const { evaluationId, ...material } = first;
    expect(evaluationId).toBe(
      `relationship_spouse_t8_candidate_requirement_coverage_${deterministicContentHash(material).slice(0, 24)}`,
    );
  });
});
