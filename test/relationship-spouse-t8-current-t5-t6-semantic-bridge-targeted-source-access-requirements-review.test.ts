import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview } from '../src/research/relationship-spouse-t8-authority-acquisition-readiness-review.js';
import { buildRelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReview } from '../src/research/relationship-spouse-t8-authority-candidate-discovery-readiness-review.js';
import { buildRelationshipSpouseT8AuthorityCandidateDiscoveryEvidence } from '../src/research/relationship-spouse-t8-authority-candidate-discovery-evidence.js';
import { buildRelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluation } from '../src/research/relationship-spouse-t8-authority-candidate-requirement-coverage-evaluation.js';
import { buildRelationshipSpouseT8AuthorityResidualGapReassessmentReview } from '../src/research/relationship-spouse-t8-authority-residual-gap-reassessment-review.js';
import { buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview } from '../src/research/relationship-spouse-t8-current-t5-t6-semantic-bridge-authority-acquisition-readiness-review.js';
import { buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence } from '../src/research/relationship-spouse-t8-current-t5-t6-semantic-bridge-authority-candidate-discovery-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_REMEDIATION_TRACKS,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_SOURCE_ACCESS_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_TARGETED_SOURCE_ACCESS_REQUIREMENTS_REVIEW_VERSION,
  buildRelationshipSpouseT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReview,
} from '../src/research/relationship-spouse-t8-current-t5-t6-semantic-bridge-targeted-source-access-requirements-review.js';

function acceptedDiscovery() {
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
  const bridgeReadiness =
    buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview(
      residual,
    );
  return buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence(
    bridgeReadiness,
  );
}

describe('Relationship spouse T8 current T5/T6 bridge targeted source-access requirements review', () => {
  test('classifies five remediation tracks with exactly three active primary tracks', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReview(
        acceptedDiscovery(),
      );

    expect(report.reviewVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_TARGETED_SOURCE_ACCESS_REQUIREMENTS_REVIEW_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_TARGETED_SOURCE_ACCESS_REQUIREMENTS_REVIEW',
    );
    expect(report.decision).toBe(
      'ACCESS_AND_SCOPE_REMEDIATION_CLASSIFIED_THREE_ACTIVE_PRIMARY_TRACKS_NO_AUTHORITY_ACQUIRED_ALL_FIVE_GAPS_OPEN',
    );
    expect(report.remediationTrackCount).toBe(5);
    expect(report.remediationTracks).toEqual(
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_REMEDIATION_TRACKS,
    );
    expect(report.activePrimaryTrackCount).toBe(3);
    expect(report.activePrimaryTrackIds).toEqual([
      'SAMYEONG_V5_WYG_FACSIMILE_WITNESS_ACCESS',
      'SAMYEONG_V6_WYG_OFFICER_WEALTH_FACSIMILE_WITNESS_ACCESS',
      'MODERN_SPOUSE_PRODUCT_SCOPE_ADJUDICATION',
    ]);
    expect(report.facsimileAccessTrackCount).toBe(2);
  });

  test('freezes the Samyeong volume-five WYG facsimile target without auto-admission', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReview(
        acceptedDiscovery(),
      );
    const track = report.remediationTracks.find(
      (item) => item.trackId === 'SAMYEONG_V5_WYG_FACSIMILE_WITNESS_ACCESS',
    );

    expect(report.samyeongV5WygAccessTargetKnown).toBe(true);
    expect(report.samyeongV5WygPageLocators).toEqual(['005-2a', '005-2b', '005-3a']);
    expect(report.samyeongV5FacsimileImageInspectionRequired).toBe(true);
    expect(report.samyeongV5FullLocalContextRequired).toBe(true);
    expect(report.samyeongV5CurrentWealthCorrespondenceMustRemainBounded).toBe(true);
    expect(report.samyeongV5IndependentNormativeCorroborationStillRequired).toBe(true);
    expect(report.samyeongV5AccessSuccessWouldAutoAdmitAuthority).toBe(false);
    expect(track?.knownAccessTarget).toMatchObject({
      repository: 'Kanripo 漢籍リポジトリ',
      edition: '四庫全書・文淵閣 (WYG)',
      volume: '卷五',
      pageLocators: ['005-2a', '005-2b', '005-3a'],
      indexedTranscriptionMayGuideNavigation: true,
      facsimileImageInspectionStillRequired: true,
    });
    const requirementIds = track?.requirements.map((item) => item.requirementId) ?? [];
    expect(requirementIds).toContain('SAMYEONG_V5_WYG_FACSIMILE_PAGE_BINDING');
    expect(requirementIds).toContain('SAMYEONG_V5_DIRECT_IMAGE_INSPECTION');
    expect(requirementIds).toContain('SAMYEONG_V5_MODERN_SCOPE_ADJUDICATION');
    expect(requirementIds).toContain('SAMYEONG_V5_INDEPENDENT_NORMATIVE_CORROBORATION');
    expect(
      track?.requirements.find(
        (item) => item.requirementId === 'SAMYEONG_V5_INDEPENDENT_NORMATIVE_CORROBORATION',
      )?.sourceAccessCanResolve,
    ).toBe(false);
    expect(track?.authorityAcceptanceAuthorizedByThisTrackDefinition).toBe(false);
  });

  test('freezes the Samyeong volume-six WYG officer/wealth target but requires image-based reassessment', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReview(
        acceptedDiscovery(),
      );
    const track = report.remediationTracks.find(
      (item) => item.trackId === 'SAMYEONG_V6_WYG_OFFICER_WEALTH_FACSIMILE_WITNESS_ACCESS',
    );

    expect(report.samyeongV6WygAccessTargetKnown).toBe(true);
    expect(report.samyeongV6WygPageLocators).toEqual(['006-89b', '006-90a']);
    expect(report.samyeongV6FacsimileImageInspectionRequired).toBe(true);
    expect(report.samyeongV6IndexedOfficerHusbandWealthWifeLeadMayGuideNavigation).toBe(true);
    expect(report.samyeongV6OfficerCorrespondenceMustBeReevaluatedAfterImageInspection).toBe(true);
    expect(report.samyeongV6WealthCorrespondenceMustBeReevaluatedAfterImageInspection).toBe(true);
    expect(report.samyeongV6AccessSuccessWouldAutoEstablishCorrespondence).toBe(false);
    expect(track?.knownAccessTarget).toMatchObject({
      repository: 'Kanripo 漢籍リポジトリ',
      edition: '四庫全書・文淵閣 (WYG)',
      volume: '卷六',
      pageLocators: ['006-89b', '006-90a'],
      indexedTranscriptionMayGuideNavigation: true,
      facsimileImageInspectionStillRequired: true,
    });
    expect(track?.requirements.map((item) => item.requirementId)).toContain(
      'SAMYEONG_V6_OFFICER_WEALTH_CURRENT_T5_CORRESPONDENCE_REASSESSMENT',
    );
    expect(track?.authorityAcceptanceAuthorizedByThisTrackDefinition).toBe(false);
  });

  test('treats modern spouse scope as an independent active blocker that source access cannot solve', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReview(
        acceptedDiscovery(),
      );
    const track = report.remediationTracks.find(
      (item) => item.trackId === 'MODERN_SPOUSE_PRODUCT_SCOPE_ADJUDICATION',
    );

    expect(report.modernSpouseProductScopeAdjudicationRequired).toBe(true);
    expect(report.sourceAccessAloneCanResolveModernProductScope).toBe(false);
    expect(report.historicalSexGenderRoleMayBeUniversalized).toBe(false);
    expect(report.spouseSexInferenceAuthorized).toBe(false);
    expect(report.partnerAttributePredictionAuthorized).toBe(false);
    expect(report.marriageOutcomeAuthorized).toBe(false);
    expect(report.breakupOutcomeAuthorized).toBe(false);
    expect(report.infidelityInferenceAuthorized).toBe(false);
    expect(report.futureTimingAuthorized).toBe(false);
    expect(report.compatibilityAuthorityAuthorized).toBe(false);
    expect(track?.mode).toBe('DOMAIN_SCOPE_ADJUDICATION');
    expect(track?.executionAuthorizedAfterThisReview).toBe(true);
    expect(
      track?.requirements.every((item) => item.sourceAccessCanResolve === false),
    ).toBe(true);
  });

  test('keeps Ditian access secondary and competing historical methodologies deferred', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReview(
        acceptedDiscovery(),
      );
    const ditian = report.remediationTracks.find(
      (item) => item.trackId === 'DITIAN_PRIMARY_PAGE_CLARIFICATION',
    );
    const deferred = report.remediationTracks.find(
      (item) => item.trackId === 'COMPETING_HISTORICAL_SPOUSE_METHODS_DEFERRED',
    );

    expect(report.secondaryClarificationTrackIds).toEqual(['DITIAN_PRIMARY_PAGE_CLARIFICATION']);
    expect(report.ditianPrimaryPageClarificationMayProceed).toBe(true);
    expect(report.ditianClarificationWouldAutoRemoveCompetingMethodology).toBe(false);
    expect(ditian?.priority).toBe('SECONDARY_NON_ADMITTING');
    expect(ditian?.executionAuthorizedAfterThisReview).toBe(false);
    expect(report.deferredMethodologyTrackIds).toEqual([
      'COMPETING_HISTORICAL_SPOUSE_METHODS_DEFERRED',
    ]);
    expect(report.competingHistoricalMethodologyTrackPresent).toBe(true);
    expect(report.zipingOrDitianCompetingMethodMayEnterCurrentBridgeAcquisition).toBe(false);
    expect(deferred?.priority).toBe('DEFERRED_REQUIRES_METHODOLOGY_CHOICE');
    expect(deferred?.executionAuthorizedAfterThisReview).toBe(false);
  });

  test('does not invent a relationship T6 remediation path', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReview(
        acceptedDiscovery(),
      );

    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.relationshipT6RemediationTrackAuthorized).toBe(false);
    expect(
      report.remediationTracks.some((track) => track.trackId.toLowerCase().includes('t6')),
    ).toBe(false);
  });

  test('keeps all five spouse gaps open and creates no interpretation artifacts', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReview(
        acceptedDiscovery(),
      );

    expect(report.allFiveGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toHaveLength(5);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
    expect(report.currentClaimSemanticCorrespondenceEstablishedByThisGate).toBe(false);
    expect(report.crossCandidateCompositionAuthorized).toBe(false);
    expect(report.spouseT8RuleAuthoringAuthorized).toBe(false);
    expect(report.spouseT8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.spouseInterpretationPackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_SOURCE_ACCESS_CONTROL_IDS,
    );
    expect(report.controlCount).toBe(14);
    expect(report.controlsFrozen).toBe(true);
    expect(report.implementationEffects).toEqual({
      sourceAccessesPerformed: 0,
      scopeAdjudicationsPerformed: 0,
      newCandidatesDiscovered: 0,
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

  test('fails closed when the upstream discovery identity is altered', () => {
    const discovery = acceptedDiscovery();
    const altered = {
      ...discovery,
      evidenceId: `${discovery.evidenceId}_altered`,
    };
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReview(
        altered,
      );

    expect(report.status).toBe('UPSTREAM_CURRENT_BRIDGE_DISCOVERY_BOUNDARY_INVALID');
    expect(report.exactDiscoveryBoundaryAccepted).toBe(false);
    expect(report.remediationTrackCount).toBe(0);
    expect(report.remediationTracks).toEqual([]);
    expect(report.activePrimaryTrackCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE',
    );
  });

  test('is deterministic and routes only to active remediation execution readiness', () => {
    const discovery = acceptedDiscovery();
    const first =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReview(
        discovery,
      );
    const second =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReview(
        discovery,
      );

    expect(first).toEqual(second);
    const { reviewId, ...material } = first;
    expect(reviewId).toBe(
      `relationship_spouse_t8_current_bridge_source_access_requirements_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextGate).toBe(
      'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_READINESS_REVIEW',
    );
  });
});
