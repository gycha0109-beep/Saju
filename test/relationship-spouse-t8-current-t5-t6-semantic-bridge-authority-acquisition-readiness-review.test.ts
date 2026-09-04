import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview } from '../src/research/relationship-spouse-t8-authority-acquisition-readiness-review.js';
import { buildRelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReview } from '../src/research/relationship-spouse-t8-authority-candidate-discovery-readiness-review.js';
import { buildRelationshipSpouseT8AuthorityCandidateDiscoveryEvidence } from '../src/research/relationship-spouse-t8-authority-candidate-discovery-evidence.js';
import { buildRelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluation } from '../src/research/relationship-spouse-t8-authority-candidate-requirement-coverage-evaluation.js';
import { buildRelationshipSpouseT8AuthorityResidualGapReassessmentReview } from '../src/research/relationship-spouse-t8-authority-residual-gap-reassessment-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_BRIDGE_INPUT_CLAIM_TYPES,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_AUTHORITY_ACQUISITION_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_DISCOVERY_LANES,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_UPSTREAM_CHANNEL_CLAIM_TYPES,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T6_BRIDGE_INPUT_CLAIM_TYPES,
  buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview,
} from '../src/research/relationship-spouse-t8-current-t5-t6-semantic-bridge-authority-acquisition-readiness-review.js';

function acceptedResidual() {
  const discoveryReadiness = buildRelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReview(
    buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview(),
  );
  const discoveryEvidence =
    buildRelationshipSpouseT8AuthorityCandidateDiscoveryEvidence(discoveryReadiness);
  const coverage = buildRelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluation(
    discoveryReadiness,
    discoveryEvidence,
  );
  return buildRelationshipSpouseT8AuthorityResidualGapReassessmentReview(coverage);
}

describe('Relationship spouse T8 current T5/T6 semantic bridge authority acquisition readiness', () => {
  test('freezes the exact five T5 family-presence claims directly consumed by current relationship T8', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview(
        acceptedResidual(),
      );

    expect(report.reviewVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_ACQUISITION_READINESS',
    );
    expect(report.decision).toBe(
      'CURRENT_T5_FAMILY_SUBSTRATE_FROZEN_NO_CURRENT_RELATIONSHIP_T6_INPUT_PATH_SOURCE_DISCOVERY_AUTHORIZED_ONLY_NO_AUTHORITY_ACQUIRED',
    );
    expect(RELATIONSHIP_SPOUSE_T8_CURRENT_T5_BRIDGE_INPUT_CLAIM_TYPES).toEqual([
      'TEN_GOD_FAMILY_PEER_PRESENT',
      'TEN_GOD_FAMILY_RESOURCE_PRESENT',
      'TEN_GOD_FAMILY_OUTPUT_PRESENT',
      'TEN_GOD_FAMILY_WEALTH_PRESENT',
      'TEN_GOD_FAMILY_OFFICER_PRESENT',
    ]);
    expect(report.currentDirectT5InputClaimTypes).toEqual(
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_BRIDGE_INPUT_CLAIM_TYPES,
    );
    expect(report.currentDirectT5InputClaimTypeCount).toBe(5);
    expect(report.currentRelationshipT8RuleCount).toBe(11);
    expect(report.everyCurrentRelationshipT8RuleUsesOnlyT5FamilyPresenceInputs).toBe(true);
  });

  test('records ten channel-level T5 claims as upstream provenance substrate rather than direct spouse bridge inputs', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview(
        acceptedResidual(),
      );

    expect(RELATIONSHIP_SPOUSE_T8_CURRENT_T5_UPSTREAM_CHANNEL_CLAIM_TYPES).toEqual([
      'TEN_GOD_PEER_VISIBLE_STEMS_THEME',
      'TEN_GOD_PEER_BRANCHES_THEME',
      'TEN_GOD_RESOURCE_VISIBLE_STEMS_THEME',
      'TEN_GOD_RESOURCE_BRANCHES_THEME',
      'TEN_GOD_OUTPUT_VISIBLE_STEMS_THEME',
      'TEN_GOD_OUTPUT_BRANCHES_THEME',
      'TEN_GOD_WEALTH_VISIBLE_STEMS_THEME',
      'TEN_GOD_WEALTH_BRANCHES_THEME',
      'TEN_GOD_OFFICER_VISIBLE_STEMS_THEME',
      'TEN_GOD_OFFICER_BRANCHES_THEME',
    ]);
    expect(report.upstreamChannelT5ClaimTypes).toEqual(
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_UPSTREAM_CHANNEL_CLAIM_TYPES,
    );
    expect(report.upstreamChannelT5ClaimTypeCount).toBe(10);
    expect(
      report.upstreamChannelT5ClaimTypes.some((claimType) =>
        report.currentDirectT5InputClaimTypes.includes(claimType),
      ),
    ).toBe(false);
  });

  test('does not invent a current relationship T6 input path', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview(
        acceptedResidual(),
      );

    expect(RELATIONSHIP_SPOUSE_T8_CURRENT_T6_BRIDGE_INPUT_CLAIM_TYPES).toEqual([]);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.currentDirectT6InputClaimTypes).toEqual([]);
    expect(report.currentDirectT6InputClaimTypeCount).toBe(0);
    expect(report.t6BridgeDiscoveryLaneAuthorized).toBe(false);
    expect(report.t6InputPathMayBeInventedByThisGate).toBe(false);
    expect(report.discoveryLanes.every((lane) => lane.allowedCurrentT6InputClaimTypes.length === 0)).toBe(
      true,
    );
    expect(report.discoveryLanes.every((lane) => !lane.currentT6InputPathMayBeInventedByThisLane)).toBe(
      true,
    );
  });

  test('preserves the current generic relationship source and methodology boundary without treating it as spouse authority', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview(
        acceptedResidual(),
      );

    expect(report.currentRelationshipConsumerPackId).toBe(
      'PACK-RELATIONSHIP-NATAL-CONSUMER-READING-CANDIDATE',
    );
    expect(report.currentRelationshipConsumerMethodologyId).toBe(
      'M-RELATIONSHIP-NATAL-READING-TEN-GOD-SYNTHESIS-V1',
    );
    expect(report.currentT5FamilyPresenceMethodologyId).toBe(
      'M-GENERAL-NATAL-CONCLUSION-SYNTHESIS-SAMYEONG-V1',
    );
    expect(report.currentT5FamilyPresenceSourceIds).toEqual([
      'SRC-GENERAL-NATAL-YUANHAI-SEMANTICS-WIKISOURCE',
      'SRC-SAMYEONG-TONGHOE-V5-FOUR-LIBRARIES-TENGOD-RELATIONS',
    ]);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
  });

  test('assigns every spouse gap exactly once to a discovery lane and an admission contract', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview(
        acceptedResidual(),
      );

    expect(report.discoveryLanes).toEqual(RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_DISCOVERY_LANES);
    expect(report.discoveryLaneCount).toBe(2);
    expect(report.admissionContractCount).toBe(5);
    expect(report.admissionContracts).toHaveLength(5);
    expect(report.allFiveGapsCoveredExactlyOnceByAdmissionContract).toBe(true);
    expect(report.allFiveGapsAssignedExactlyOnceToDiscoveryLane).toBe(true);
    expect(
      report.admissionContracts.every(
        (contract) =>
          contract.allowedCurrentT5InputClaimTypes.length === 5 &&
          contract.allowedCurrentT6InputClaimTypes.length === 0 &&
          contract.sourceConceptToCurrentClaimSemanticCorrespondenceRequired &&
          contract.explicitSpouseSemanticAssertionRequired &&
          contract.currentInputMethodologyCompatibilityRequired &&
          contract.modernProductScopeCompatibilityRequired &&
          !contract.currentT6InputMayBeSynthesizedFromAbsence &&
          !contract.crossCandidateCompositionForSameGapAllowed,
      ),
    ).toBe(true);
  });

  test('keeps historical spouse methodologies as discovery leads only and blocks silent import', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview(
        acceptedResidual(),
      );

    expect(report.zipingMayBeReinspectedAsDiscoveryLead).toBe(true);
    expect(report.zipingHistoricalInputsAutomaticallyAccepted).toBe(false);
    expect(report.ditianMayBeReinspectedAsDiscoveryLead).toBe(true);
    expect(report.ditianHistoricalRoleConventionsAutomaticallyMappedToCurrentT5).toBe(false);
    expect(report.competingHistoricalMethodologyIncludedInThisAcquisition).toBe(false);
    expect(report.competingMethodologyMayBeSilentlyAdopted).toBe(false);
    expect(report.competingMethodologyChoiceRequiredBeforeUse).toBe(true);
    expect(report.historicalGenderRoleMayBeUniversalized).toBe(false);
    expect(report.partnerAttributeOrOutcomePredictionAuthorized).toBe(false);
    expect(report.compatibilityAuthorityMaySubstitute).toBe(false);
  });

  test('freezes evidence requirements while creating zero executable interpretation artifacts', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview(
        acceptedResidual(),
      );

    expect(report.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_AUTHORITY_ACQUISITION_CONTROL_IDS,
    );
    expect(report.controlCount).toBe(16);
    expect(report.controlsFrozen).toBe(true);
    expect(report.candidateDiscoveryPerformedByThisGate).toBe(false);
    expect(report.candidateRegisteredByThisGate).toBe(false);
    expect(report.requirementCoverageEvaluatedByThisGate).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
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
      methodologyChoicesAdopted: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      registrySnapshotsCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    });
  });

  test('fails closed when the residual review is not the exact governed boundary', () => {
    const residual = acceptedResidual();
    const alteredResidual = {
      ...residual,
      reviewId: `${residual.reviewId}_altered`,
    };
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview(
        alteredResidual,
      );

    expect(report.status).toBe('UPSTREAM_RESIDUAL_GAP_REASSESSMENT_BOUNDARY_INVALID');
    expect(report.exactResidualBoundaryAccepted).toBe(false);
    expect(report.acquisitionTrackId).toBe('NONE');
    expect(report.currentDirectT5InputClaimTypes).toEqual([]);
    expect(report.discoveryLanes).toEqual([]);
    expect(report.admissionContracts).toEqual([]);
    expect(report.controlsFrozen).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'RELATIONSHIP_SPOUSE_T8_AUTHORITY_RESIDUAL_GAP_REASSESSMENT_REVIEW',
    );
  });

  test('is deterministic and routes only to governed bridge candidate discovery evidence', () => {
    const residual = acceptedResidual();
    const first =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview(residual);
    const second =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview(residual);

    expect(first).toEqual(second);
    const { reviewId, ...material } = first;
    expect(reviewId).toBe(
      `relationship_spouse_t8_current_t5_t6_bridge_acquisition_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextGate).toBe(
      'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE',
    );
  });
});
