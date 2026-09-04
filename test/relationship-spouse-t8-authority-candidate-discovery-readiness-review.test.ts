import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview } from '../src/research/relationship-spouse-t8-authority-acquisition-readiness-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_READINESS_REVIEW_VERSION,
  RELATIONSHIP_SPOUSE_T8_AUTHORITY_DISCOVERY_LANES,
  buildRelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReview,
} from '../src/research/relationship-spouse-t8-authority-candidate-discovery-readiness-review.js';

describe('Relationship spouse T8 authority candidate discovery readiness', () => {
  test('accepts only the exact upstream spouse authority-acquisition boundary', () => {
    const upstream = buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview();
    const report = buildRelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReview(upstream);

    expect(report.reviewVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_READINESS_REVIEW_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_READINESS_REVIEW',
    );
    expect(report.decision).toBe(
      'GAP_SCOPED_SPOUSE_AUTHORITY_CANDIDATE_DISCOVERY_CONTRACT_FROZEN_NO_AUTHORITY_ACQUIRED',
    );
    expect(report.exactUpstreamBoundaryAccepted).toBe(true);
    expect(report.upstreamReviewId).toBe(upstream.reviewId);
    expect(report.acquisitionMode).toBe('GAP_SCOPED_CANDIDATE_DISCOVERY');
  });

  test('assigns all five frozen authority gaps exactly once across three discovery lanes', () => {
    const report = buildRelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReview(
      buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview(),
    );

    expect(report.discoveryLanes).toEqual(RELATIONSHIP_SPOUSE_T8_AUTHORITY_DISCOVERY_LANES);
    expect(report.discoveryLaneCount).toBe(3);
    expect(report.admissionContractCount).toBe(5);
    expect(report.allFiveGapsCoveredExactlyOnceByAdmissionContract).toBe(true);
    expect(report.allFiveGapsAssignedExactlyOnceToDiscoveryLane).toBe(true);

    const laneGapIds = report.discoveryLanes.flatMap((lane) => lane.targetGapIds);
    expect(laneGapIds).toHaveLength(5);
    expect(new Set(laneGapIds).size).toBe(5);
  });

  test('requires exact reproducible evidence and explicit spouse applicability per targeted gap', () => {
    const report = buildRelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReview(
      buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview(),
    );

    expect(report.oneNormalizedSourceReferencePerCandidateRequired).toBe(true);
    expect(report.exactSourceIdentityRequired).toBe(true);
    expect(report.stableRevisionOrEquivalentReproducibleLocatorRequired).toBe(true);
    expect(report.exactLocatorPerTargetedGapRequired).toBe(true);
    expect(report.originalSourceInspectionRequired).toBe(true);

    for (const contract of report.admissionContracts) {
      expect(contract.exactEvidenceForGapRequired).toBe(true);
      expect(contract.exactSourceIdentityRequired).toBe(true);
      expect(contract.exactLocatorForGapRequired).toBe(true);
      expect(contract.originalSourceInspectionRequired).toBe(true);
      expect(contract.originalOrVerifiedSourceContextRequired).toBe(true);
      expect(contract.explicitSpouseSemanticAssertionRequired).toBe(true);
      expect(contract.explicitApplicabilityBoundaryRequired).toBe(true);
      expect(contract.explicitContextOrExceptionTreatmentRequired).toBe(true);
      expect(contract.independentNormativeProvenanceRequired).toBe(true);
    }
  });

  test('permits discovery leads without treating them as authority evidence', () => {
    const report = buildRelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReview(
      buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview(),
    );

    expect(report.searchSnippetMayBeDiscoveryLead).toBe(true);
    expect(report.searchSnippetMayCountAsAuthorityEvidence).toBe(false);
    expect(report.existingRepositorySourceMayBeReconsidered).toBe(true);
    expect(report.existingRepositorySourceAutomaticallyAccepted).toBe(false);
    expect(report.candidateMayBeHistoricalPrimarySource).toBe(true);
    expect(report.candidateMayBeScholarlyOrInstitutionalReference).toBe(true);
    expect(report.candidateMayBePractitionerSecondarySource).toBe(true);

    for (const contract of report.admissionContracts) {
      expect(contract.sourceClassAloneSufficient).toBe(false);
      expect(contract.spouseVocabularyMentionAloneSufficient).toBe(false);
      expect(contract.dayBranchSpouseConventionAloneSufficient).toBe(false);
      expect(contract.tenGodSpouseRoleConventionAloneSufficient).toBe(false);
      expect(contract.broadRelationshipClaimReuseAllowed).toBe(false);
      expect(contract.searchSnippetSubstitutionAllowed).toBe(false);
      expect(contract.generalKnowledgeSubstitutionAllowed).toBe(false);
      expect(contract.modelSynthesisSubstitutionAllowed).toBe(false);
      expect(contract.compatibilityAuthoritySubstitutionAllowed).toBe(false);
      expect(contract.crossCandidateCompositionForSameGapAllowed).toBe(false);
    }
  });

  test('allows gap-scoped candidate sourcing without silently composing partial candidates for one gap', () => {
    const report = buildRelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReview(
      buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview(),
    );

    expect(report.oneCandidateMayTargetMultipleGaps).toBe(true);
    expect(report.oneCandidateMustCoverAllFiveGaps).toBe(false);
    expect(report.differentGapsMayUseDifferentAcceptedSources).toBe(true);
    expect(report.crossCandidateCompositionForSameGapAuthorized).toBe(false);
    expect(report.multiSourceCompositionPolicyForSameGapResolved).toBe(false);
    expect(report.requirementCoverageEvaluationRequiredAfterDiscovery).toBe(true);
  });

  test('authorizes no candidate admission spouse semantics or production effect', () => {
    const report = buildRelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReview(
      buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview(),
    );

    expect(report.candidateDiscoveryPerformedByThisGate).toBe(false);
    expect(report.candidateRegisteredByThisGate).toBe(false);
    expect(report.requirementCoverageEvaluatedByThisGate).toBe(false);
    expect(report.authorityAdmittedByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
    expect(report.sourceRegistrationAloneMayCloseGap).toBe(false);
    expect(report.candidateDiscoveryAloneMayCloseGap).toBe(false);
    expect(report.spouseT8RuleAuthoringAuthorized).toBe(false);
    expect(report.spouseT8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.spouseInterpretationPackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.implementationEffects).toEqual({
      sourceCandidatesDiscovered: 0,
      sourceCandidatesRegistered: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      registrySnapshotsCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    });
  });

  test('freezes controls and routes only to candidate discovery evidence', () => {
    const report = buildRelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReview(
      buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview(),
    );

    expect(report.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_CONTROL_IDS,
    );
    expect(report.controlCount).toBe(15);
    expect(report.controlsFrozen).toBe(true);
    expect(report.recommendedNextGate).toBe(
      'RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE',
    );
  });

  test('fails closed when the upstream report is not the exact content-addressed boundary', () => {
    const upstream = buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview();
    const altered = {
      ...upstream,
      reviewId: `${upstream.reviewId}_altered`,
    };
    const report = buildRelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReview(altered);

    expect(report.exactUpstreamBoundaryAccepted).toBe(false);
    expect(report.status).toBe('UPSTREAM_AUTHORITY_ACQUISITION_BOUNDARY_INVALID');
    expect(report.acquisitionMode).toBe('NONE');
    expect(report.discoveryLanes).toEqual([]);
    expect(report.admissionContracts).toEqual([]);
    expect(report.controlsFrozen).toBe(false);
    expect(report.authorityAdmittedByThisGate).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'RELATIONSHIP_SPOUSE_T8_AUTHORITY_ACQUISITION_READINESS_REVIEW',
    );
  });

  test('review identity is deterministic and content-addressed', () => {
    const upstream = buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview();
    const first = buildRelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReview(upstream);
    const second = buildRelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReview(upstream);

    expect(first).toEqual(second);
    const { reviewId, ...material } = first;
    expect(reviewId).toBe(
      `relationship_spouse_t8_candidate_discovery_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    );
  });
});
