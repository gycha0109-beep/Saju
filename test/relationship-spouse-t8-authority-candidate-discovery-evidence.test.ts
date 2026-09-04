import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS,
  buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview,
} from '../src/research/relationship-spouse-t8-authority-acquisition-readiness-review.js';
import { buildRelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReview } from '../src/research/relationship-spouse-t8-authority-candidate-discovery-readiness-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE_VERSION,
  RELATIONSHIP_SPOUSE_T8_CANDIDATE_DISCOVERY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_DISCOVERED_AUTHORITY_CANDIDATES,
  buildRelationshipSpouseT8AuthorityCandidateDiscoveryEvidence,
} from '../src/research/relationship-spouse-t8-authority-candidate-discovery-evidence.js';

function acceptedReadiness() {
  return buildRelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReview(
    buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview(),
  );
}

describe('Relationship spouse T8 authority candidate discovery evidence', () => {
  test('records two inspected candidates but accepts no spouse authority', () => {
    const report = buildRelationshipSpouseT8AuthorityCandidateDiscoveryEvidence(
      acceptedReadiness(),
    );

    expect(report.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE',
    );
    expect(report.decision).toBe(
      'TWO_CANDIDATES_DISCOVERED_ONE_PRIMARY_BOUND_PARTIAL_ONE_LEAD_ONLY_NO_AUTHORITY_ACCEPTED_OR_GAP_CLOSED',
    );
    expect(report.inspectedCandidateCount).toBe(2);
    expect(report.potentialPartialCoverageCandidateCount).toBe(1);
    expect(report.discoveryLeadOnlyCandidateCount).toBe(1);
    expect(report.fullAdmissionCandidateCount).toBe(0);
    expect(report.registeredCandidateCount).toBe(0);
    expect(report.authorityAdmittedByThisGate).toBe(false);
  });

  test('searches all three lanes while keeping all five spouse authority gaps open', () => {
    const report = buildRelationshipSpouseT8AuthorityCandidateDiscoveryEvidence(
      acceptedReadiness(),
    );
    const expectedGapIds = RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS.map(
      (requirement) => requirement.gapId,
    );

    expect(report.laneCount).toBe(3);
    expect(report.laneResults.every((lane) => lane.searched)).toBe(true);
    expect(report.laneResults.every((lane) => !lane.fullAdmissionCandidateDiscovered)).toBe(true);
    expect(report.allFiveGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(expectedGapIds);
  });

  test('preserves the exact NLC 子平真詮 primary locator without claiming current input compatibility', () => {
    const ziping = RELATIONSHIP_SPOUSE_T8_DISCOVERED_AUTHORITY_CANDIDATES.find(
      (candidate) => candidate.sourceReference.title === '子平真詮',
    );

    expect(ziping?.discoveryStatus).toBe(
      'POTENTIAL_PARTIAL_COVERAGE_COMPETING_METHODOLOGY_INPUTS',
    );
    expect(ziping?.sourceIdentityVerified).toBe(true);
    expect(ziping?.nationalLibraryOrEquivalentWitnessIdentityVerified).toBe(true);
    expect(ziping?.exactPrimaryWitnessPassageLocatorVerified).toBe(true);
    expect(ziping?.sourceReference.locator?.section).toBe('論妻子');
    expect(ziping?.sourceReference.locator?.page).toContain('PDF p.53');
    expect(ziping?.sourceReference.locator?.page).toContain('printed p.44');
    expect(ziping?.spouseBindingObserved).toBe(true);
    expect(ziping?.spouseBindingMethodInputs).toEqual(['妻宮', '月令用神', '喜忌', '格局']);
    expect(ziping?.currentSpouseT8InputContractDirectlySupported).toBe(false);
    expect(ziping?.competingMethodologyApplicabilityReviewRequired).toBe(true);
    expect(ziping?.historicalRoleAndScopeModernizationReviewRequired).toBe(true);
  });

  test('keeps 滴天髓闡微 as a lead because the 1947 scan target page is not bound', () => {
    const ditian = RELATIONSHIP_SPOUSE_T8_DISCOVERED_AUTHORITY_CANDIDATES.find(
      (candidate) => candidate.sourceReference.title === '滴天髓闡微',
    );

    expect(ditian?.discoveryStatus).toBe('DISCOVERY_LEAD_ONLY');
    expect(ditian?.sourceIdentityVerified).toBe(true);
    expect(ditian?.exactPassageInspectedOnAtLeastOneSurface).toBe(true);
    expect(ditian?.exactPrimaryWitnessPassageLocatorVerified).toBe(false);
    expect(ditian?.independentNormativeProvenanceObserved).toBe(false);
    expect(ditian?.admissionAcceptedUnderDiscoveryReadiness).toBe(false);
  });

  test('does not count discovery observations as satisfied requirements', () => {
    expect(
      RELATIONSHIP_SPOUSE_T8_DISCOVERED_AUTHORITY_CANDIDATES.flatMap(
        (candidate) => candidate.gapObservations,
      ).every(
        (observation) =>
          observation.currentSpouseT8InputContractDirectlySupported === false &&
          observation.requirementCoverageEvaluated === false &&
          observation.countsAsRequirementSatisfied === false,
      ),
    ).toBe(true);
  });

  test('keeps historical role and partner-attribute language outside production semantics', () => {
    const report = buildRelationshipSpouseT8AuthorityCandidateDiscoveryEvidence(
      acceptedReadiness(),
    );

    expect(report.zipingExplicitSpouseBindingObserved).toBe(true);
    expect(report.zipingExactPrimaryPageBindingVerified).toBe(true);
    expect(report.zipingBindingUsesCurrentSpouseT8Inputs).toBe(false);
    expect(report.zipingCompetingMethodologyApplicabilityReviewRequired).toBe(true);
    expect(report.ditianExactPrimaryPageBindingMissing).toBe(true);
    expect(report.searchSnippetOrTranscriptionMayCountAsAuthorityEvidence).toBe(false);
    expect(report.historicalRoleLanguageMayBeUniversalizedWithoutReview).toBe(false);
    expect(report.historicalPartnerAttributeLanguageMayBeProductionSemantic).toBe(false);
    expect(report.compatibilityAuthorityAuthorized).toBe(false);
  });

  test('freezes no-shortcut controls and creates zero executable interpretation artifacts', () => {
    const report = buildRelationshipSpouseT8AuthorityCandidateDiscoveryEvidence(
      acceptedReadiness(),
    );

    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_CANDIDATE_DISCOVERY_CONTROL_IDS);
    expect(report.controlCount).toBe(13);
    expect(report.controlsFrozen).toBe(true);
    expect(report.candidateRequirementCoverageEvaluatedByThisGate).toBe(false);
    expect(report.candidateDiscoveryMeansRequirementSatisfied).toBe(false);
    expect(report.sameGapCrossCandidateCompositionPerformed).toBe(false);
    expect(report.sameGapCrossCandidateCompositionAuthorized).toBe(false);
    expect(report.spouseT8RuleAuthoringAuthorized).toBe(false);
    expect(report.spouseT8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.spouseInterpretationPackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.implementationEffects).toEqual({
      candidateEvidenceRecordsCreated: 2,
      registeredSourcesCreated: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      registrySnapshotsCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    });
  });

  test('routes only to governed requirement-coverage evaluation', () => {
    const report = buildRelationshipSpouseT8AuthorityCandidateDiscoveryEvidence(
      acceptedReadiness(),
    );

    expect(report.recommendedNextGate).toBe(
      'RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_REQUIREMENT_COVERAGE_EVALUATION',
    );
  });

  test('fails closed when discovery readiness is not the exact content-addressed boundary', () => {
    const readiness = acceptedReadiness();
    const altered = {
      ...readiness,
      reviewId: `${readiness.reviewId}_altered`,
    };
    const report = buildRelationshipSpouseT8AuthorityCandidateDiscoveryEvidence(altered);

    expect(report.exactReadinessBoundaryAccepted).toBe(false);
    expect(report.status).toBe('UPSTREAM_DISCOVERY_READINESS_BOUNDARY_INVALID');
    expect(report.discoveryPerformed).toBe(false);
    expect(report.laneResults).toEqual([]);
    expect(report.inspectedCandidates).toEqual([]);
    expect(report.controlsFrozen).toBe(false);
    expect(report.authorityAdmittedByThisGate).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE',
    );
  });

  test('evidence identity is deterministic and content-addressed', () => {
    const readiness = acceptedReadiness();
    const first = buildRelationshipSpouseT8AuthorityCandidateDiscoveryEvidence(readiness);
    const second = buildRelationshipSpouseT8AuthorityCandidateDiscoveryEvidence(readiness);

    expect(first).toEqual(second);
    const { evidenceId, ...material } = first;
    expect(evidenceId).toBe(
      `relationship_spouse_t8_authority_discovery_${deterministicContentHash(material).slice(0, 24)}`,
    );
  });
});
