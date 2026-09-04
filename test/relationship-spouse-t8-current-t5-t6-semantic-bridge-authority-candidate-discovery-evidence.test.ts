import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview } from '../src/research/relationship-spouse-t8-authority-acquisition-readiness-review.js';
import { buildRelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReview } from '../src/research/relationship-spouse-t8-authority-candidate-discovery-readiness-review.js';
import { buildRelationshipSpouseT8AuthorityCandidateDiscoveryEvidence } from '../src/research/relationship-spouse-t8-authority-candidate-discovery-evidence.js';
import { buildRelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluation } from '../src/research/relationship-spouse-t8-authority-candidate-requirement-coverage-evaluation.js';
import { buildRelationshipSpouseT8AuthorityResidualGapReassessmentReview } from '../src/research/relationship-spouse-t8-authority-residual-gap-reassessment-review.js';
import { buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview } from '../src/research/relationship-spouse-t8-current-t5-t6-semantic-bridge-authority-acquisition-readiness-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_CANDIDATE_DISCOVERY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_DISCOVERED_CANDIDATES,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence,
} from '../src/research/relationship-spouse-t8-current-t5-t6-semantic-bridge-authority-candidate-discovery-evidence.js';

function acceptedReadiness() {
  const discoveryReadiness = buildRelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReview(
    buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview(),
  );
  const discoveryEvidence =
    buildRelationshipSpouseT8AuthorityCandidateDiscoveryEvidence(discoveryReadiness);
  const coverage = buildRelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluation(
    discoveryReadiness,
    discoveryEvidence,
  );
  const residual = buildRelationshipSpouseT8AuthorityResidualGapReassessmentReview(coverage);
  return buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview(
    residual,
  );
}

describe('Relationship spouse T8 current T5/T6 semantic bridge authority candidate discovery evidence', () => {
  test('discovers four bridge leads without admitting authority', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence(
        acceptedReadiness(),
      );

    expect(report.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE',
    );
    expect(report.decision).toBe(
      'FOUR_BRIDGE_LEADS_DISCOVERED_ONE_SAME_SOURCE_WEALTH_VOCABULARY_CORRESPONDENCE_ZERO_ADMISSION_COMPATIBLE_NO_AUTHORITY_ACQUIRED_ALL_FIVE_GAPS_OPEN',
    );
    expect(report.discoveryPerformed).toBe(true);
    expect(report.inspectedCandidateCount).toBe(4);
    expect(report.inspectedCandidates).toEqual(
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_DISCOVERED_CANDIDATES,
    );
    expect(report.sameSourceCurrentT5CandidateCount).toBe(1);
    expect(report.sameSourceCurrentT5VocabularyCorrespondenceCandidateCount).toBe(1);
    expect(report.publicTranscriptionSearchLeadCount).toBe(1);
    expect(report.competingMethodologyCandidateCount).toBe(2);
    expect(report.admissionCompatibleCandidateCount).toBe(0);
  });

  test('identifies the current registered 三命通會 source as a wealth-family vocabulary bridge lead only', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence(
        acceptedReadiness(),
      );
    const candidate = report.inspectedCandidates.find(
      (item) => item.sourceReference.sourceId === 'SRC-SAMYEONG-TONGHOE-V5-FOUR-LIBRARIES-TENGOD-RELATIONS',
    );

    expect(candidate).toBeDefined();
    expect(candidate?.sourceReference.currentT5RegisteredSource).toBe(true);
    expect(candidate?.status).toBe('SAME_SOURCE_PARTIAL_VOCABULARY_BRIDGE_SCOPE_BLOCKED');
    expect(candidate?.potentialCurrentT5ClaimTypes).toEqual(['TEN_GOD_FAMILY_WEALTH_PRESENT']);
    expect(candidate?.correspondenceEstablishedCurrentT5ClaimTypes).toEqual([
      'TEN_GOD_FAMILY_WEALTH_PRESENT',
    ]);
    expect(candidate?.sourceConceptToCurrentT5FamilySemanticCorrespondenceEstablished).toBe(true);
    expect(candidate?.explicitSpouseSemanticObserved).toBe(true);
    expect(candidate?.originalPrimaryWitnessPassageInspected).toBe(false);
    expect(candidate?.independentNormativeProvenanceObserved).toBe(false);
    expect(candidate?.historicalGenderRoleConventionObserved).toBe(true);
    expect(candidate?.modernProductScopeCompatibility).toBe(
      'HISTORICAL_GENDER_ROLE_NOT_PRODUCT_COMPATIBLE',
    );
    expect(candidate?.admissionCompatibleCandidate).toBe(false);
    expect(report.strongestCurrentLeadCandidateId).toBe(candidate?.candidateId);
    expect(report.strongestCurrentLeadCurrentT5ClaimTypes).toEqual([
      'TEN_GOD_FAMILY_WEALTH_PRESENT',
    ]);
    expect(report.wealthFamilyHistoricalSpouseVocabularyCorrespondenceObserved).toBe(true);
    expect(report.primaryWitnessRequirementSatisfiedByStrongestLead).toBe(false);
    expect(report.strongestCurrentLeadRequiresModernScopeRemediation).toBe(true);
  });

  test('keeps the officer-family husband mapping as a search lead rather than established correspondence', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence(
        acceptedReadiness(),
      );
    const candidate = report.inspectedCandidates.find(
      (item) => item.status === 'PUBLIC_TRANSCRIPTION_SEARCH_LEAD_ONLY',
    );

    expect(candidate).toBeDefined();
    expect(candidate?.sourceReference.title).toBe('三命通會（四庫全書本）卷六');
    expect(candidate?.potentialCurrentT5ClaimTypes).toEqual([
      'TEN_GOD_FAMILY_OFFICER_PRESENT',
      'TEN_GOD_FAMILY_WEALTH_PRESENT',
    ]);
    expect(candidate?.correspondenceEstablishedCurrentT5ClaimTypes).toEqual([]);
    expect(candidate?.exactGapRelevantPassageLocatorObserved).toBe(false);
    expect(candidate?.originalPrimaryWitnessPassageInspected).toBe(false);
    expect(candidate?.sourceConceptToCurrentT5FamilySemanticCorrespondenceEstablished).toBe(false);
    expect(candidate?.currentInputMethodologyCompatibility).toBe(
      'NOT_EVALUABLE_SEARCH_SNIPPET_ONLY',
    );
    expect(report.officerFamilyHistoricalSpouseVocabularyLeadObserved).toBe(true);
    expect(report.officerFamilyHistoricalSpouseVocabularyCorrespondenceEstablished).toBe(false);
  });

  test('reinspects 子平真詮 and 滴天髓 without importing their competing historical inputs', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence(
        acceptedReadiness(),
      );
    const ziping = report.inspectedCandidates.find(
      (item) => item.sourceReference.title === '子平真詮',
    );
    const ditian = report.inspectedCandidates.find(
      (item) => item.sourceReference.title === '滴天髓闡微',
    );

    expect(ziping?.status).toBe('COMPETING_METHODOLOGY_NO_CURRENT_T5_BRIDGE');
    expect(ziping?.sourceConceptToCurrentT5FamilySemanticCorrespondenceEstablished).toBe(false);
    expect(ziping?.currentInputMethodologyCompatibility).toBe(
      'COMPETING_YONGSHIN_XIJI_GYEOKGUK_METHOD',
    );
    expect(ziping?.originalPrimaryWitnessPassageInspected).toBe(true);
    expect(ditian?.status).toBe('TRANSCRIPTION_LEAD_COMPETING_METHODOLOGY');
    expect(ditian?.potentialCurrentT5ClaimTypes).toEqual(['TEN_GOD_FAMILY_WEALTH_PRESENT']);
    expect(ditian?.sourceConceptToCurrentT5FamilySemanticCorrespondenceEstablished).toBe(false);
    expect(ditian?.currentInputMethodologyCompatibility).toBe(
      'COMPETING_WEALTH_XISHEN_STRENGTH_METHOD',
    );
    expect(ditian?.originalPrimaryWitnessPassageInspected).toBe(false);
  });

  test('does not invent relationship T6 semantics and leaves both discovery lanes admission-empty', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence(
        acceptedReadiness(),
      );

    expect(report.currentT6InputPathEstablished).toBe(false);
    expect(report.discoveryLaneCount).toBe(2);
    expect(report.laneResults).toHaveLength(2);
    expect(report.laneResults.every((lane) => lane.searched)).toBe(true);
    expect(report.laneResults.every((lane) => lane.admissionCompatibleCandidateCount === 0)).toBe(
      true,
    );
    expect(report.laneResults.every((lane) => !lane.laneAuthorityAcquired)).toBe(true);
    expect(report.currentClaimSemanticCorrespondenceEstablishedForAllFiveDirectT5Claims).toBe(
      false,
    );
    expect(report.modernProductScopeCompatibilityEstablishedByThisGate).toBe(false);
  });

  test('keeps all five spouse authority gaps open with zero executable artifacts', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence(
        acceptedReadiness(),
      );

    expect(report.allFiveGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toHaveLength(5);
    expect(report.registeredCandidateCount).toBe(0);
    expect(report.authorityAcceptedCandidateCount).toBe(0);
    expect(report.authorityGapClosedCount).toBe(0);
    expect(report.candidateRegisteredByThisGate).toBe(false);
    expect(report.requirementCoverageEvaluatedByThisGate).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.spouseT8RuleAuthoringAuthorized).toBe(false);
    expect(report.spouseT8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.spouseInterpretationPackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.compatibilityAuthorityAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_CANDIDATE_DISCOVERY_CONTROL_IDS,
    );
    expect(report.controlCount).toBe(12);
    expect(report.controlsFrozen).toBe(true);
    expect(report.implementationEffects).toEqual({
      candidateEvidenceRecordsCreated: 4,
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

  test('fails closed when the upstream bridge readiness identity is altered', () => {
    const readiness = acceptedReadiness();
    const alteredReadiness = {
      ...readiness,
      reviewId: `${readiness.reviewId}_altered`,
    };
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence(
        alteredReadiness,
      );

    expect(report.status).toBe('UPSTREAM_CURRENT_BRIDGE_READINESS_BOUNDARY_INVALID');
    expect(report.exactReadinessBoundaryAccepted).toBe(false);
    expect(report.discoveryPerformed).toBe(false);
    expect(report.inspectedCandidateCount).toBe(0);
    expect(report.inspectedCandidates).toEqual([]);
    expect(report.laneResults).toEqual([]);
    expect(report.controlsFrozen).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_ACQUISITION_READINESS_REVIEW',
    );
  });

  test('is deterministic and routes to targeted source-access requirements', () => {
    const readiness = acceptedReadiness();
    const first =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence(
        readiness,
      );
    const second =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence(
        readiness,
      );

    expect(first).toEqual(second);
    const { evidenceId, ...material } = first;
    expect(evidenceId).toBe(
      `relationship_spouse_t8_current_bridge_candidate_discovery_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextGate).toBe(
      'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_TARGETED_SOURCE_ACCESS_REQUIREMENTS_REVIEW',
    );
  });
});
