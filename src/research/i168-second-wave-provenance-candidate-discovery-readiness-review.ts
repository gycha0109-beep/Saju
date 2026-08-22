import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I167_REASSESSMENT_REQUIREMENT_IDS,
  I167_REMAINING_REVIEWABLE_REMEDIATION_PATH_IDS,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateTargetedLineageEvidenceAdequacyRemediationPathReassessmentReviewReport,
} from './i167-provenance-remediation-path-reassessment-review.js';

export const I168_SECOND_WAVE_PROVENANCE_CANDIDATE_DISCOVERY_READINESS_REVIEW_VERSION =
  'myeonghwa-source-ke-visible-stem-threshold-second-wave-provenance-candidate-discovery-readiness-review-v1';

export const I168_DISCOVERY_REQUIREMENT_IDS = Object.freeze([
  'EXACT_I167_FAIL_CLOSED_BOUNDARY_REQUIRED',
  'SECOND_WAVE_SCOPE_LIMITED_TO_NEW_PROVENANCE_CANDIDATE_DISCOVERY',
  'FIRST_WAVE_LI_AND_SUN_NOT_GRANDFATHERED_OR_RELABELED_AS_SECOND_WAVE_SUCCESS',
  'SEARCH_MUST_TARGET_VISIBLE_STEM_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY_AUTHORITY',
  'EXACT_SOURCE_WORK_EDITION_WITNESS_IDENTITY_REQUIRED',
  'NORMATIVE_PASSAGE_AND_REQUIREMENT_RELEVANCE_MUST_BE_RECORDED',
  'PROVENANCE_LINEAGE_AND_DERIVATIVE_RELATIONSHIP_EVIDENCE_MUST_BE_COLLECTED',
  'SAME_WORK_RETRANSMISSION_OR_SUMMARY_NOT_NEW_AUTHORITY',
  'CONCLUSION_NEUTRAL_DISCOVERY_REQUIRED',
  'SEARCH_SILENCE_NOT_NEGATIVE_PROVENANCE_FINDING',
  'NO_SOURCE_COUNT_VOTING_OR_PROVENANCE_TIER_WEIGHTING',
  'DISCOVERY_NOT_SELECTION_REMEDIATION_MUTATION_OR_REEVALUATION',
] as const);

export type I168DiscoveryRequirementId = (typeof I168_DISCOVERY_REQUIREMENT_IDS)[number];

export const I168_SEARCH_CHANNEL_IDS = Object.freeze([
  'BIBLIOGRAPHIC_CATALOG_AND_EDITION_METADATA',
  'DIGITIZED_PRIMARY_TEXT_OR_SCAN',
  'PUBLISHER_OR_AUTHOR_SOURCE',
  'INSTITUTIONAL_LIBRARY_OR_ARCHIVE',
  'TARGETED_DATED_ATTRIBUTED_WEB_MATERIAL',
] as const);

export type I168SearchChannelId = (typeof I168_SEARCH_CHANNEL_IDS)[number];

export const I168_QUERY_CONCEPT_IDS = Object.freeze([
  'VISIBLE_STEM_POSITIONAL_INTERACTION',
  'GEGAN_GEWEI_YAOGE_INTERACTION',
  'TIANGAN_XIANGKE_CONDITIONS',
  'YOULI_WULI_BOUNDARY',
  'BINARY_EFFECTIVE_INTERACTION_LANGUAGE',
] as const);

export type I168QueryConceptId = (typeof I168_QUERY_CONCEPT_IDS)[number];

export interface I168SecondWaveProvenanceCandidateDiscoveryReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_SECOND_WAVE_PROVENANCE_CANDIDATE_DISCOVERY_READINESS_REVIEW'
    | 'I167_REMEDIATION_PATH_REASSESSMENT_INVALID';
  decision:
    | 'SECOND_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_READY_CONCLUSION_NEUTRAL_SEARCH_SCOPE_AND_PROVENANCE_CONTROLS_FROZEN_NO_SELECTION_OR_MUTATION'
    | 'SECOND_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_NOT_READY';
  upstreamI167ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI167BoundaryAccepted: boolean;
  currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE' | 'NOT_ASSESSED';
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  firstWaveUnresolvedLineageFindingCount: 2 | 0;
  firstWaveIndependentNormativeProvenanceEstablishedCount: 0;
  liHanchenRemainsFirstWaveResearchCandidateNotRemediationReady: boolean;
  sunHaiyiRemainsFirstWaveLineageRiskCandidateNotRemediationReady: boolean;
  firstWaveCandidatesMayBeGrandfatheredAsSecondWaveSuccess: false;
  corpusExhaustionEstablished: false;
  universalNoRemediationCandidateExistsEstablished: false;
  discoveryRequirementIds: readonly I168DiscoveryRequirementId[];
  discoveryRequirementCount: 12;
  discoveryRequirementsFrozen: boolean;
  searchChannelIds: readonly I168SearchChannelId[];
  searchChannelCount: 5;
  queryConceptIds: readonly I168QueryConceptId[];
  queryConceptCount: 5;
  secondWaveCandidateMustBeNewNormativeProvenanceIdentity: boolean;
  secondWaveCandidateMustBindExactSourceWorkEditionWitnessIdentity: boolean;
  secondWaveCandidateMustRecordNormativePassageAndRequirementRelevance: boolean;
  secondWaveCandidateMustCarryLineageAndDerivativeRelationshipEvidence: boolean;
  sameWorkAlternateWitnessCreatesNewAuthority: false;
  derivativeRetransmissionOrSummaryCreatesNewAuthority: false;
  uniqueSourceIdentityAloneEstablishesIndependence: false;
  chronologyAloneEstablishesIndependence: false;
  searchSilenceCreatesNegativeDerivativeFinding: false;
  sourceCountVotingAllowed: false;
  provenanceTierWeightingAllowed: false;
  conclusionNeutralDiscoveryRequired: boolean;
  secondWaveCandidateDiscoveryAuthorized: boolean;
  actualCandidateDiscoveryExecutedByThisGate: false;
  candidateSelectedByThisGate: false;
  remediationStrategySelectedByThisGate: false;
  remediationExecutionAuthorizedByThisGate: false;
  evidenceReboundByThisGate: false;
  candidateSetMutatedByThisGate: false;
  candidateRemovedByThisGate: false;
  candidateReplacedByThisGate: false;
  newCandidateSetVersionCreatedByThisGate: false;
  newInputPackageVersionCreatedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  candidateSetReevaluationAuthorizedByThisGate: false;
  candidateSetReevaluationPerformedByThisGate: false;
  candidateSetAdmissibilityEstablishedByThisGate: false;
  productionPolicyExecutionAuthorized: false;
  actualCompositionPerformedByThisGate: false;
  multiSourceCompositionAuthorized: false;
  authorityAcquiredByThisGate: false;
  visibleStemBinaryEffectiveInteractionEligibilityResolved: false;
  thresholdRuleCreatedByThisGate: false;
  damageEvaluationAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  hiddenStemInteractionEligibilityGapRemains: true;
  hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED';
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_SECOND_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_EVIDENCE'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_TARGETED_LINEAGE_EVIDENCE_ADEQUACY_AND_REMEDIATION_PATH_REASSESSMENT_REVIEW';
  notes: readonly string[];
}

function exactArray(actual: readonly string[], expected: readonly string[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function exactI167Accepted(
  i167: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateTargetedLineageEvidenceAdequacyRemediationPathReassessmentReviewReport,
): boolean {
  return (
    i167.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_TARGETED_LINEAGE_EVIDENCE_ADEQUACY_REMEDIATION_PATH_REASSESSMENT_REVIEW' &&
    i167.decision ===
      'TARGETED_LINEAGE_EVIDENCE_ADEQUATE_FOR_TWO_UNRESOLVED_FINDINGS_CURRENT_NEW_PROVENANCE_CANDIDATES_NOT_READY_FOR_REMEDIATION_NO_POLICY_RELAXATION_ALTERNATE_REMEDIATION_DISCOVERY_MAY_PROCEED' &&
    i167.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i167.policyVersion === 'v1-definition' &&
    i167.adoptionVersion === 'v1-adoption' &&
    i167.currentCandidateSetVersion === 'v1-candidate-set' &&
    i167.currentInputPackageVersion === 'v2-input-package' &&
    i167.exactI166BoundaryAccepted &&
    i167.i166EvidenceAdequateToRecordTwoUnresolvedLineageFindings &&
    i167.i166EvidenceAdequateToEstablishIndependentNormativeProvenance === false &&
    i167.unresolvedLineageFindingCount === 2 &&
    i167.derivativeDependencyFoundCount === 0 &&
    i167.explicitNegativeDerivativeFindingCount === 0 &&
    i167.independentNormativeProvenanceEstablishedCount === 0 &&
    i167.liHanchenCurrentDisposition ===
      'RESEARCH_CANDIDATE_NOT_REMEDIATION_READY_PROVENANCE_UNRESOLVED' &&
    i167.sunHaiyiCurrentDisposition ===
      'LINEAGE_RISK_CANDIDATE_NOT_REMEDIATION_READY_SPECIFIC_DEPENDENCY_UNRESOLVED' &&
    i167.currentNewProvenanceAcquisitionAttemptDisposition === 'NOT_SUCCESSFUL_UNDER_CURRENT_EVIDENCE' &&
    i167.currentNewProvenanceAcquisitionAttemptMayBeGrandfatheredAsSuccess === false &&
    i167.liHanchenMayCountAsIndependentAuthorityFromCurrentEvidence === false &&
    i167.sunHaiyiMayCountAsIndependentAuthorityFromCurrentEvidence === false &&
    i167.unresolvedCurrentCandidatesMayEnterNewPackageWithoutFurtherGovernance === false &&
    i167.corpusExhaustionEstablishedByThisGate === false &&
    i167.universalNoRemediationCandidateExistsEstablishedByThisGate === false &&
    i167.policyRelaxationJustifiedByCurrentSearchFailure === false &&
    exactArray(i167.reassessmentRequirementIds, I167_REASSESSMENT_REQUIREMENT_IDS) &&
    i167.reassessmentRequirementCount === 10 &&
    i167.reassessmentRequirementsFrozen &&
    exactArray(
      i167.remainingReviewableRemediationPathIds,
      I167_REMAINING_REVIEWABLE_REMEDIATION_PATH_IDS,
    ) &&
    i167.remainingReviewableRemediationPathCount === 5 &&
    i167.remainingPathsAreReviewableNotSelected &&
    i167.secondWaveNewProvenanceCandidateDiscoveryReadinessReviewMethodologicallyJustified &&
    i167.secondWaveNewProvenanceCandidateDiscoveryReadinessReviewAuthorized &&
    i167.secondWaveReadinessAuthorizationIsCandidateDiscovery === false &&
    i167.secondWaveReadinessAuthorizationIsCandidateSelection === false &&
    i167.secondWaveReadinessAuthorizationIsRemediationSelection === false &&
    i167.secondWaveReadinessAuthorizationIsCandidateSetMutation === false &&
    i167.secondWaveReadinessAuthorizationIsInputPackageCreation === false &&
    i167.secondWaveReadinessAuthorizationIsReevaluationAuthorization === false &&
    i167.currentV2PackageAndCandidateSetRemainImmutable &&
    i167.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i167.remediationStrategySelectedByThisGate === false &&
    i167.remediationExecutionAuthorizedByThisGate === false &&
    i167.candidateSetMutatedByThisGate === false &&
    i167.candidateRemovedByThisGate === false &&
    i167.candidateReplacedByThisGate === false &&
    i167.evidenceReboundByThisGate === false &&
    i167.newCandidateSetVersionCreatedByThisGate === false &&
    i167.newInputPackageVersionCreatedByThisGate === false &&
    i167.provenanceIndependenceAdjudicatedByThisGate === false &&
    i167.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate === false &&
    i167.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i167.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i167.candidateSetReevaluationAuthorizedByThisGate === false &&
    i167.candidateSetReevaluationPerformedByThisGate === false &&
    i167.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i167.sourceCountVotingAllowed === false &&
    i167.provenanceTierWeightingAllowed === false &&
    i167.productionPolicyExecutionAuthorized === false &&
    i167.actualCompositionPerformedByThisGate === false &&
    i167.multiSourceCompositionAuthorized === false &&
    i167.authorityAcquiredByThisGate === false &&
    i167.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i167.thresholdRuleCreatedByThisGate === false &&
    i167.damageEvaluationAuthorized === false &&
    i167.classificationAuthorized === false &&
    i167.numericScoringAuthorized === false &&
    i167.hiddenStemInteractionEligibilityGapRemains &&
    i167.hiddenStemAuthorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i167.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_SECOND_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<I168SecondWaveProvenanceCandidateDiscoveryReadinessReviewReport, 'reviewId'>,
): I168SecondWaveProvenanceCandidateDiscoveryReadinessReviewReport {
  return {
    reviewId: `i168_second_wave_provenance_candidate_discovery_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI168SecondWaveProvenanceCandidateDiscoveryReadinessReview(
  i167: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateTargetedLineageEvidenceAdequacyRemediationPathReassessmentReviewReport,
): I168SecondWaveProvenanceCandidateDiscoveryReadinessReviewReport {
  const accepted = exactI167Accepted(i167);

  return finalized({
    reviewVersion: I168_SECOND_WAVE_PROVENANCE_CANDIDATE_DISCOVERY_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_SECOND_WAVE_PROVENANCE_CANDIDATE_DISCOVERY_READINESS_REVIEW'
      : 'I167_REMEDIATION_PATH_REASSESSMENT_INVALID',
    decision: accepted
      ? 'SECOND_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_READY_CONCLUSION_NEUTRAL_SEARCH_SCOPE_AND_PROVENANCE_CONTROLS_FROZEN_NO_SELECTION_OR_MUTATION'
      : 'SECOND_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_NOT_READY',
    upstreamI167ReviewId: i167.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI167BoundaryAccepted: accepted,
    currentV2ProvenanceDisposition: accepted ? 'BLOCKED_UNDER_CURRENT_EVIDENCE' : 'NOT_ASSESSED',
    currentV2PackageAndCandidateSetRemainImmutable: accepted,
    firstWaveUnresolvedLineageFindingCount: accepted ? 2 : 0,
    firstWaveIndependentNormativeProvenanceEstablishedCount: 0,
    liHanchenRemainsFirstWaveResearchCandidateNotRemediationReady: accepted,
    sunHaiyiRemainsFirstWaveLineageRiskCandidateNotRemediationReady: accepted,
    firstWaveCandidatesMayBeGrandfatheredAsSecondWaveSuccess: false,
    corpusExhaustionEstablished: false,
    universalNoRemediationCandidateExistsEstablished: false,
    discoveryRequirementIds: I168_DISCOVERY_REQUIREMENT_IDS,
    discoveryRequirementCount: 12,
    discoveryRequirementsFrozen: accepted,
    searchChannelIds: I168_SEARCH_CHANNEL_IDS,
    searchChannelCount: 5,
    queryConceptIds: I168_QUERY_CONCEPT_IDS,
    queryConceptCount: 5,
    secondWaveCandidateMustBeNewNormativeProvenanceIdentity: accepted,
    secondWaveCandidateMustBindExactSourceWorkEditionWitnessIdentity: accepted,
    secondWaveCandidateMustRecordNormativePassageAndRequirementRelevance: accepted,
    secondWaveCandidateMustCarryLineageAndDerivativeRelationshipEvidence: accepted,
    sameWorkAlternateWitnessCreatesNewAuthority: false,
    derivativeRetransmissionOrSummaryCreatesNewAuthority: false,
    uniqueSourceIdentityAloneEstablishesIndependence: false,
    chronologyAloneEstablishesIndependence: false,
    searchSilenceCreatesNegativeDerivativeFinding: false,
    sourceCountVotingAllowed: false,
    provenanceTierWeightingAllowed: false,
    conclusionNeutralDiscoveryRequired: accepted,
    secondWaveCandidateDiscoveryAuthorized: accepted,
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
    I132IndependentNormativeProvenanceRequirementRemainsNormative: accepted,
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
    recommendedNextGate: accepted
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_SECOND_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_EVIDENCE'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_TARGETED_LINEAGE_EVIDENCE_ADEQUACY_AND_REMEDIATION_PATH_REASSESSMENT_REVIEW',
    notes: accepted
      ? [
          'I168 authorizes only conclusion-neutral second-wave new-provenance candidate discovery.',
          'The first-wave Li Hanchen and Sun Haiyi candidates remain unresolved and cannot be grandfathered as independent authority.',
          'Any discovered candidate must carry exact bibliographic/witness identity, normative passage relevance, and lineage evidence before later adjudication.',
          'Search silence, unique source identity, chronology, source count, and provenance tier do not establish independence.',
          'Current v2 candidate set and input package remain immutable and blocked; no remediation, mutation, package creation, reevaluation, threshold, classification, or numeric authority is granted.',
        ]
      : ['I167 fail-closed remediation-path boundary was not accepted exactly; second-wave discovery remains unauthorized.'],
  });
}
