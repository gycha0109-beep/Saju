import { describe, expect, it } from 'vitest';
import {
  I168_DISCOVERY_REQUIREMENT_IDS,
  I168_QUERY_CONCEPT_IDS,
  I168_SEARCH_CHANNEL_IDS,
  type I168SecondWaveProvenanceCandidateDiscoveryReadinessReviewReport,
} from '../src/research/i168-second-wave-provenance-candidate-discovery-readiness-review.js';
import {
  I169_DISCOVERY_RECORD_IDS,
  buildI169SecondWaveProvenanceCandidateDiscoveryEvidence,
} from '../src/research/i169-second-wave-provenance-candidate-discovery-evidence.js';

function validI168(): I168SecondWaveProvenanceCandidateDiscoveryReadinessReviewReport {
  return {
    reviewId: 'i168_fixture',
    status: 'RESOLVED_SECOND_WAVE_PROVENANCE_CANDIDATE_DISCOVERY_READINESS_REVIEW',
    decision:
      'SECOND_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_READY_CONCLUSION_NEUTRAL_SEARCH_SCOPE_AND_PROVENANCE_CONTROLS_FROZEN_NO_SELECTION_OR_MUTATION',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI167BoundaryAccepted: true,
    currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE',
    currentV2PackageAndCandidateSetRemainImmutable: true,
    firstWaveUnresolvedLineageFindingCount: 2,
    firstWaveIndependentNormativeProvenanceEstablishedCount: 0,
    liHanchenRemainsFirstWaveResearchCandidateNotRemediationReady: true,
    sunHaiyiRemainsFirstWaveLineageRiskCandidateNotRemediationReady: true,
    firstWaveCandidatesMayBeGrandfatheredAsSecondWaveSuccess: false,
    corpusExhaustionEstablished: false,
    universalNoRemediationCandidateExistsEstablished: false,
    discoveryRequirementIds: I168_DISCOVERY_REQUIREMENT_IDS,
    discoveryRequirementCount: 12,
    discoveryRequirementsFrozen: true,
    searchChannelIds: I168_SEARCH_CHANNEL_IDS,
    searchChannelCount: 5,
    queryConceptIds: I168_QUERY_CONCEPT_IDS,
    queryConceptCount: 5,
    secondWaveCandidateMustBeNewNormativeProvenanceIdentity: true,
    secondWaveCandidateMustBindExactSourceWorkEditionWitnessIdentity: true,
    secondWaveCandidateMustRecordNormativePassageAndRequirementRelevance: true,
    secondWaveCandidateMustCarryLineageAndDerivativeRelationshipEvidence: true,
    sameWorkAlternateWitnessCreatesNewAuthority: false,
    derivativeRetransmissionOrSummaryCreatesNewAuthority: false,
    uniqueSourceIdentityAloneEstablishesIndependence: false,
    chronologyAloneEstablishesIndependence: false,
    searchSilenceCreatesNegativeDerivativeFinding: false,
    sourceCountVotingAllowed: false,
    provenanceTierWeightingAllowed: false,
    conclusionNeutralDiscoveryRequired: true,
    secondWaveCandidateDiscoveryAuthorized: true,
    actualCandidateDiscoveryExecutedByThisGate: false,
    candidateSelectedByThisGate: false,
    remediationStrategySelectedByThisGate: false,
    remediationExecutionAuthorizedByThisGate: false,
    evidenceReboundByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateRemovedByThisGate: false,
    candidateReplacedByThisGate: false,
    newCandidateSetVersionCreatedByThisGate: false,
    newInputPackageVersionCreatedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    candidateSetReevaluationPerformedByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false,
    productionPolicyExecutionAuthorized: false,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    authorityAcquiredByThisGate: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    hiddenStemInteractionEligibilityGapRemains: true,
    hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_SECOND_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_EVIDENCE',
  } as unknown as I168SecondWaveProvenanceCandidateDiscoveryReadinessReviewReport;
}

describe('I169 second-wave provenance candidate discovery evidence', () => {
  it('accepts exact I168 and records four conclusion-neutral discovery observations', () => {
    const report = buildI169SecondWaveProvenanceCandidateDiscoveryEvidence(validI168());

    expect(report.status).toBe('RESOLVED_SECOND_WAVE_PROVENANCE_CANDIDATE_DISCOVERY_EVIDENCE');
    expect(report.decision).toBe(
      'SECOND_WAVE_DISCOVERY_EXECUTED_FOUR_NEW_PROVENANCE_OBSERVATIONS_ONE_MINIMUM_ADEQUACY_REVIEW_CANDIDATE_ZERO_INDEPENDENCE_ZERO_SELECTION_LINEAGE_AND_IDENTITY_GAPS_REMAIN',
    );
    expect(report.discoveryExecuted).toBe(true);
    expect(report.discoveryRecords.map((record) => record.recordId)).toEqual(I169_DISCOVERY_RECORD_IDS);
    expect(report.discoveryObservationCount).toBe(4);
  });

  it('qualifies only Li Shunxiang for later evidence adequacy review', () => {
    const report = buildI169SecondWaveProvenanceCandidateDiscoveryEvidence(validI168());
    const li = report.discoveryRecords[0];

    expect(report.minimumAdequacyReviewCandidateCount).toBe(1);
    expect(report.exactPrintEditionIdentityEstablishedCount).toBe(1);
    expect(report.liShunxiangQualifiesForLaterEvidenceAdequacyReview).toBe(true);
    expect(li?.recordId).toBe('LI_SHUNXIANG_SIZHU_XUANJI_2004');
    expect(li?.identityStatus).toBe('EXACT_PRINT_EDITION_IDENTITY_ESTABLISHED');
    expect(li?.targetRelevance).toBe('DIRECT_POSITIONAL_FORCE_AND_BINARY_EXCEPTION_RELEVANCE');
    expect(li?.directBinaryExceptionLanguageObserved).toBe(true);
    expect(li?.qualificationGap).toBeNull();
  });

  it('keeps Shao, Zhao, and Chen as incomplete observations with explicit gaps', () => {
    const report = buildI169SecondWaveProvenanceCandidateDiscoveryEvidence(validI168());
    const [, shao, zhao, chen] = report.discoveryRecords;

    expect(report.shaoGangQualifiesForLaterEvidenceAdequacyReview).toBe(false);
    expect(report.zhaoZhiyiQualifiesForLaterEvidenceAdequacyReview).toBe(false);
    expect(report.chenBingdiQualifiesForLaterEvidenceAdequacyReview).toBe(false);
    expect(shao?.qualificationGap).toBe('EXACT_PRINT_EDITION_DATE_PUBLISHER_WITNESS_IDENTITY_NOT_ESTABLISHED');
    expect(zhao?.qualificationGap).toBe('PUBLICATION_CHAIN_INCOMPLETE_AND_EXACT_BINARY_KE_SCOPE_BRIDGE_REQUIRED');
    expect(chen?.qualificationGap).toBe('DATED_ORIGINAL_WITNESS_PUBLICATION_IDENTITY_AND_LINEAGE_NOT_ESTABLISHED');
  });

  it('records all four lineage origins unresolved and establishes no provenance independence', () => {
    const report = buildI169SecondWaveProvenanceCandidateDiscoveryEvidence(validI168());

    expect(report.lineageUnresolvedCount).toBe(4);
    expect(report.derivativeDependencyFoundCount).toBe(0);
    expect(report.explicitNegativeDerivativeFindingCount).toBe(0);
    expect(report.independentNormativeProvenanceEstablishedCount).toBe(0);
    expect(report.discoveryRecords.every((record) => record.lineageFinding === 'UNRESOLVED_AFTER_SECOND_WAVE_DISCOVERY')).toBe(true);
    expect(report.discoveryRecords.every((record) => record.independentNormativeProvenanceEstablished === false)).toBe(true);
  });

  it('does not count same-work retransmission, chronology, source identity, or search silence as independence', () => {
    const report = buildI169SecondWaveProvenanceCandidateDiscoveryEvidence(validI168());

    expect(report.discoveryRecords.every((record) => record.sameWorkOrDownstreamRetransmissionCountsAsNewAuthority === false)).toBe(true);
    expect(report.searchSilenceUsedAsNegativeFinding).toBe(false);
    expect(report.chronologyUsedAsIndependenceFinding).toBe(false);
    expect(report.sourceIdentityUsedAsIndependenceFinding).toBe(false);
    expect(report.sourceCountVotingAllowed).toBe(false);
    expect(report.provenanceTierWeightingAllowed).toBe(false);
  });

  it('does not select remediation or mutate/rebind/package the current v2 candidate set', () => {
    const report = buildI169SecondWaveProvenanceCandidateDiscoveryEvidence(validI168());

    expect(report.candidateSelectedByThisGate).toBe(false);
    expect(report.remediationStrategySelectedByThisGate).toBe(false);
    expect(report.remediationExecutionAuthorizedByThisGate).toBe(false);
    expect(report.evidenceReboundByThisGate).toBe(false);
    expect(report.candidateSetMutatedByThisGate).toBe(false);
    expect(report.candidateRemovedByThisGate).toBe(false);
    expect(report.candidateReplacedByThisGate).toBe(false);
    expect(report.newCandidateSetVersionCreatedByThisGate).toBe(false);
    expect(report.newInputPackageVersionCreatedByThisGate).toBe(false);
    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
  });

  it('retains I132, production, threshold, numeric, and hidden-stem guards', () => {
    const report = buildI169SecondWaveProvenanceCandidateDiscoveryEvidence(validI168());

    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate).toBe(false);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetAdmissibilityEstablishedByThisGate).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.damageEvaluationAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.hiddenStemAuthorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
  });

  it('fails closed if I168 discovery authorization is removed', () => {
    const mutated = {
      ...validI168(),
      secondWaveCandidateDiscoveryAuthorized: false,
    } as unknown as I168SecondWaveProvenanceCandidateDiscoveryReadinessReviewReport;

    const report = buildI169SecondWaveProvenanceCandidateDiscoveryEvidence(mutated);

    expect(report.status).toBe('I168_DISCOVERY_READINESS_INVALID');
    expect(report.decision).toBe('SECOND_WAVE_DISCOVERY_NOT_EXECUTED');
    expect(report.exactI168BoundaryAccepted).toBe(false);
    expect(report.discoveryExecuted).toBe(false);
    expect(report.discoveryRecords).toEqual([]);
    expect(report.discoveryObservationCount).toBe(0);
    expect(report.minimumAdequacyReviewCandidateCount).toBe(0);
  });
});
