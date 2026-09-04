import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS,
  buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview,
} from '../src/research/relationship-spouse-t8-authority-acquisition-readiness-review.js';
import { buildRelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReview } from '../src/research/relationship-spouse-t8-authority-candidate-discovery-readiness-review.js';
import { buildRelationshipSpouseT8AuthorityCandidateDiscoveryEvidence } from '../src/research/relationship-spouse-t8-authority-candidate-discovery-evidence.js';
import { buildRelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluation } from '../src/research/relationship-spouse-t8-authority-candidate-requirement-coverage-evaluation.js';
import {
  RELATIONSHIP_SPOUSE_T8_AUTHORITY_RESIDUAL_GAP_REASSESSMENT_REVIEW_VERSION,
  RELATIONSHIP_SPOUSE_T8_RESIDUAL_GAP_REASSESSMENT_CONTROL_IDS,
  buildRelationshipSpouseT8AuthorityResidualGapReassessmentReview,
} from '../src/research/relationship-spouse-t8-authority-residual-gap-reassessment-review.js';

function acceptedCoverage() {
  const readiness = buildRelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReview(
    buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview(),
  );
  const evidence = buildRelationshipSpouseT8AuthorityCandidateDiscoveryEvidence(readiness);
  return buildRelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluation(
    readiness,
    evidence,
  );
}

describe('Relationship spouse T8 authority residual-gap reassessment review', () => {
  test('confirms all five spouse authority gaps remain open after candidate coverage evaluation', () => {
    const report = buildRelationshipSpouseT8AuthorityResidualGapReassessmentReview(
      acceptedCoverage(),
    );

    expect(report.reviewVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_AUTHORITY_RESIDUAL_GAP_REASSESSMENT_REVIEW_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_AUTHORITY_RESIDUAL_GAP_REASSESSMENT',
    );
    expect(report.decision).toBe(
      'THREE_UNIVERSAL_RESIDUAL_BLOCKERS_CONFIRMED_ALL_FIVE_GAPS_OPEN_COMPETING_HISTORICAL_METHODOLOGY_TRACK_DEFERRED',
    );
    expect(report.residualGapCount).toBe(5);
    expect(report.residualGaps).toHaveLength(5);
    expect(report.residualGaps.map((item) => item.gapId)).toEqual(
      RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS.map((requirement) => requirement.gapId),
    );
    expect(report.residualGaps.every((item) => item.gapClosed === false)).toBe(true);
    expect(report.allFiveGapsRemainOpen).toBe(true);
  });

  test('identifies exactly three universal residual blockers across all ten candidate-gap evaluations', () => {
    const report = buildRelationshipSpouseT8AuthorityResidualGapReassessmentReview(
      acceptedCoverage(),
    );

    expect(report.universalResidualRequirementIds).toEqual([
      'CURRENT_SPOUSE_T5_T6_SEMANTIC_BRIDGE',
      'METHODOLOGY_INPUT_COMPATIBILITY',
      'MODERN_PRODUCT_SCOPE_COMPATIBILITY',
    ]);
    expect(report.currentSpouseT5T6SemanticBridgeIsUniversalResidual).toBe(true);
    expect(report.methodologyInputCompatibilityIsUniversalResidual).toBe(true);
    expect(report.modernProductScopeCompatibilityIsUniversalResidual).toBe(true);
    expect(report.residualGaps.every((item) => item.currentSpouseT5T6BridgeResidual)).toBe(true);
    expect(report.residualGaps.every((item) => item.methodologyInputCompatibilityResidual)).toBe(
      true,
    );
    expect(report.residualGaps.every((item) => item.modernProductScopeCompatibilityResidual)).toBe(
      true,
    );
  });

  test('classifies each spouse gap by its residual problem without erasing acquired evidence', () => {
    const report = buildRelationshipSpouseT8AuthorityResidualGapReassessmentReview(
      acceptedCoverage(),
    );
    const expected = new Map([
      [
        'SPOUSE_SPECIFIC_SEMANTIC_BINDING_MISSING',
        'SPOUSE_SEMANTIC_BINDING_AND_INPUT_BRIDGE_RESIDUAL',
      ],
      [
        'SPOUSE_APPLICABILITY_BOUNDARY_MISSING',
        'SPOUSE_APPLICABILITY_AND_METHOD_COMPATIBILITY_RESIDUAL',
      ],
      [
        'SPOUSE_MULTI_CLAIM_COMPOSITION_METHOD_MISSING',
        'SPOUSE_COMPOSITION_AND_INPUT_BRIDGE_RESIDUAL',
      ],
      ['SPOUSE_SCOPE_LIMITS_AND_EXCEPTIONS_MISSING', 'SPOUSE_SCOPE_MODERNIZATION_RESIDUAL'],
      [
        'SPOUSE_NORMATIVE_PROVENANCE_REVIEW_MISSING',
        'SPOUSE_PROVENANCE_AND_INPUT_BRIDGE_RESIDUAL',
      ],
    ]);

    for (const gap of report.residualGaps) {
      expect(gap.residualClass).toBe(expected.get(gap.gapId));
      expect(gap.evaluatedCandidateCount).toBe(2);
      expect(gap.explicitSpouseSemanticResidual).toBe(false);
      expect(gap.applicabilityBoundaryResidual).toBe(false);
      expect(gap.contextExceptionResidual).toBe(false);
      expect(gap.primaryPassageBindingResidual).toBe(true);
      expect(gap.independentProvenanceResidual).toBe(true);
      expect(gap.crossCandidateStitchingWouldBeRequiredToCloseFromCurrentEvidence).toBe(true);
      expect(gap.spouseT8SemanticRuleAuthorized).toBe(false);
    }
  });

  test('preserves 子平真詮 primary spouse evidence but keeps current-contract blockers explicit', () => {
    const report = buildRelationshipSpouseT8AuthorityResidualGapReassessmentReview(
      acceptedCoverage(),
    );

    expect(report.zipingPrimaryBoundEvidencePreserved).toBe(true);
    expect(report.zipingCurrentSpouseT5T6BridgeStillMissing).toBe(true);
    expect(report.zipingCompetingMethodologyInputs).toEqual(['妻宮', '月令用神', '喜忌', '格局']);
    expect(report.zipingModernProductScopeCompatibilityStillMissing).toBe(true);
    expect(report.noCurrentCandidateMayBePromoted).toBe(true);
  });

  test('preserves 滴天髓闡微 primary-page and provenance residuals as secondary work', () => {
    const report = buildRelationshipSpouseT8AuthorityResidualGapReassessmentReview(
      acceptedCoverage(),
    );

    expect(report.ditianPrimaryPassageBindingStillMissing).toBe(true);
    expect(report.ditianIndependentProvenanceStillMissing).toBe(true);
    const ditianTrack = report.acquisitionTracks.find(
      (track) => track.trackId === 'DITIAN_PRIMARY_PASSAGE_PROVENANCE_BINDING',
    );
    expect(ditianTrack?.priority).toBe('SECONDARY');
    expect(ditianTrack?.mayCloseGapByItself).toBe(false);
    expect(ditianTrack?.executableByThisReview).toBe(false);
  });

  test('prioritizes current spouse T5/T6 semantic bridge authority over secondary source and scope work', () => {
    const report = buildRelationshipSpouseT8AuthorityResidualGapReassessmentReview(
      acceptedCoverage(),
    );
    const allGapIds = RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS.map(
      (requirement) => requirement.gapId,
    );

    expect(report.acquisitionTrackCount).toBe(4);
    expect(report.primaryTrackId).toBe('CURRENT_SPOUSE_T5_T6_SEMANTIC_BRIDGE_AUTHORITY');
    const primary = report.acquisitionTracks.find(
      (track) => track.trackId === 'CURRENT_SPOUSE_T5_T6_SEMANTIC_BRIDGE_AUTHORITY',
    );
    expect(primary?.priority).toBe('PRIMARY');
    expect(primary?.targetsGapIds).toEqual(allGapIds);
    expect(primary?.opensCompetingMethodology).toBe(false);
    expect(primary?.userOrDomainMethodologyChoiceRequiredBeforeExecution).toBe(false);
    expect(
      report.acquisitionTracks.filter((track) => track.priority === 'SECONDARY').map((track) => track.trackId),
    ).toEqual([
      'MODERN_SPOUSE_PRODUCT_SCOPE_APPLICABILITY',
      'DITIAN_PRIMARY_PASSAGE_PROVENANCE_BINDING',
    ]);
  });

  test('defers historical competing spouse methodology behind an explicit domain choice', () => {
    const report = buildRelationshipSpouseT8AuthorityResidualGapReassessmentReview(
      acceptedCoverage(),
    );
    const competing = report.acquisitionTracks.find(
      (track) => track.trackId === 'COMPETING_HISTORICAL_SPOUSE_METHODOLOGY_APPLICABILITY',
    );

    expect(competing?.priority).toBe('DEFERRED_REQUIRES_METHODOLOGY_CHOICE');
    expect(competing?.opensCompetingMethodology).toBe(true);
    expect(competing?.userOrDomainMethodologyChoiceRequiredBeforeExecution).toBe(true);
    expect(competing?.mayCloseGapByItself).toBe(false);
    expect(competing?.executableByThisReview).toBe(false);
  });

  test('freezes no-shortcut controls and creates zero executable interpretation artifacts', () => {
    const report = buildRelationshipSpouseT8AuthorityResidualGapReassessmentReview(
      acceptedCoverage(),
    );

    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_RESIDUAL_GAP_REASSESSMENT_CONTROL_IDS);
    expect(report.controlCount).toBe(12);
    expect(report.controlsFrozen).toBe(true);
    expect(report.sameGapCrossCandidateCompositionAuthorized).toBe(false);
    expect(report.unresolvedShenfengGenderRoleLeadMayCloseGapByItself).toBe(false);
    expect(report.authorityAdmittedByThisGate).toBe(false);
    expect(report.spouseT8RuleAuthoringAuthorized).toBe(false);
    expect(report.spouseT8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.spouseInterpretationPackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.compatibilityAuthorityAuthorized).toBe(false);
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

  test('fails closed on a tampered upstream coverage evaluation', () => {
    const coverage = acceptedCoverage();
    const tampered = {
      ...coverage,
      evaluationId: `${coverage.evaluationId}_altered`,
    };
    const report = buildRelationshipSpouseT8AuthorityResidualGapReassessmentReview(tampered);

    expect(report.status).toBe('UPSTREAM_COVERAGE_EVALUATION_BOUNDARY_INVALID');
    expect(report.exactCoverageBoundaryAccepted).toBe(false);
    expect(report.residualGapCount).toBe(0);
    expect(report.residualGaps).toEqual([]);
    expect(report.acquisitionTracks).toEqual([]);
    expect(report.controlsFrozen).toBe(false);
    expect(report.authorityAdmittedByThisGate).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_REQUIREMENT_COVERAGE_EVALUATION',
    );
  });

  test('is deterministic and routes only to current spouse T5/T6 bridge acquisition readiness', () => {
    const coverage = acceptedCoverage();
    const first = buildRelationshipSpouseT8AuthorityResidualGapReassessmentReview(coverage);
    const second = buildRelationshipSpouseT8AuthorityResidualGapReassessmentReview(coverage);

    expect(first).toEqual(second);
    const { reviewId, ...material } = first;
    expect(reviewId).toBe(
      `relationship_spouse_t8_residual_gap_reassessment_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextGate).toBe(
      'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_ACQUISITION_READINESS_REVIEW',
    );
  });
});
