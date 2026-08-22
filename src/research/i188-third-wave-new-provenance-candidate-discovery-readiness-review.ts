import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I187Li1998DirectPrimaryAcquisitionEvidenceAdequacyRemediationPathReassessmentReviewReport } from './i187-li-1998-direct-primary-acquisition-evidence-adequacy-remediation-path-reassessment-review.js';

export const I188_THIRD_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_READINESS_REVIEW_VERSION =
  'myeonghwa-third-wave-new-provenance-candidate-discovery-readiness-review-v1';

export const I188_DISCOVERY_CONTROL_IDS = Object.freeze([
  'EXACT_I187_PROCEDURAL_ROUTING_BOUNDARY_REQUIRED',
  'DISCOVERY_MUST_REMAIN_CONCLUSION_NEUTRAL_BEFORE_EVIDENCE_COLLECTION',
  'CANDIDATE_MUST_BE_GENUINELY_NEW_PROVENANCE_NOT_ALIAS_REPUBLICATION_OR_RETRANSMISSION',
  'CANDIDATE_MUST_HAVE_EXACT_VISIBLE_STEM_REMOTE_KE_FORCE_APPLICABILITY_SCOPE_RELEVANCE',
  'TRACEABLE_AUTHOR_WORK_EDITION_OR_PUBLICATION_IDENTITY_REQUIRED_FOR_PROMOTION_BEYOND_OBSERVATION',
  'PRIMARY_OR_NEAR_PRIMARY_PUBLICATION_IDENTITY_PREFERRED_OVER_AGGREGATOR_SURFACES',
  'AGGREGATOR_OR_REPUBLICATION_MAY_ROUTE_DISCOVERY_BUT_CANNOT_ESTABLISH_INDEPENDENT_AUTHORITY',
  'EXPLICIT_DERIVATIVE_RELATIONSHIP_CHECK_REQUIRED_BEFORE_ANY_INDEPENDENCE_CLAIM',
  'SAME_AUTHOR_PRIOR_OR_LATER_WORK_CANNOT_COUNT_AS_INDEPENDENT_FROM_ITSELF',
  'UNRESOLVED_LINEAGE_DEFAULTS_TO_REJECT_INDEPENDENCE_CLAIM',
  'SOURCE_CLASS_ALONE_SOURCE_COUNT_AND_PROVENANCE_TIER_CANNOT_ESTABLISH_OR_WEIGHT_INDEPENDENCE',
  'LI_1998_SAME_TARGET_PATH_REMAINS_SUSPENDED_NOT_RETIRED_AND_MAY_REOPEN_ON_NEW_DIRECT_LEAD',
  'READINESS_GATE_MUST_NOT_SELECT_MUTATE_REBIND_OR_REEVALUATE_CANDIDATES',
  'NO_POLICY_RELAXATION_THRESHOLD_CLASSIFICATION_NUMERIC_SCORING_COMPOSITION_OR_PRODUCTION_AUTHORITY',
] as const);

export type I188DiscoveryControlId = (typeof I188_DISCOVERY_CONTROL_IDS)[number];

export const I188_SEARCH_CHANNEL_IDS = Object.freeze([
  'INSTITUTIONAL_AND_LIBRARY_BIBLIOGRAPHIC_TRACES_FOR_NEW_AUTHORS_AND_WORKS',
  'OLDER_PRINT_SCAN_COLOPHON_IMPRINT_AND_EDITION_TRACES',
  'AUTHOR_PUBLISHER_AND_INSTITUTION_CHRONOLOGY_FOR_ORIGIN_DATING',
  'INDEPENDENT_DOCTRINAL_TREATISES_WITH_EXPLICIT_REMOTE_KE_CONDITIONS_OR_LIMITATIONS',
  'CROSS_CITATION_QUOTATION_AND_TERMINOLOGY_LINEAGE_TRACE',
  'DERIVATIVE_REPUBLICATION_ALIAS_AND_DIGITAL_RETRANSMISSION_DISAMBIGUATION',
] as const);

export type I188SearchChannelId = (typeof I188_SEARCH_CHANNEL_IDS)[number];

export interface I188SearchChannel {
  channelId: I188SearchChannelId;
  objective: string;
  minimumRecordFields: readonly string[];
  mayCreateDiscoveryObservation: true;
  mayEstablishIndependentAuthorityByItself: false;
}

export interface I188ThirdWaveNewProvenanceCandidateDiscoveryReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_THIRD_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_READINESS_REVIEW'
    | 'I187_THIRD_WAVE_ROUTING_BOUNDARY_INVALID';
  decision:
    | 'THIRD_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_READY_CONCLUSION_NEUTRAL_NEW_ORIGIN_SEARCH_SCOPE_AND_I132_PROVENANCE_CONTROLS_FROZEN_ZERO_DISCOVERY_ZERO_SELECTION_ZERO_MUTATION'
    | 'THIRD_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_NOT_READY';
  upstreamI187ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI187BoundaryAccepted: boolean;
  conclusionNeutralDiscoveryRequired: boolean;
  discoveryReadinessEstablished: boolean;
  discoveryExecutionAuthorizedByThisGate: boolean;
  discoveryExecutedByThisGate: false;
  discoveryObservationCount: 0;
  candidateEvidenceAcquiredByThisGate: false;
  candidateSelectedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  genuinelyNewProvenanceCandidateRequired: boolean;
  existingOriginalSixAliasMayQualifyAsNewCandidate: false;
  existingRemediationCandidateAliasMayQualifyAsNewCandidate: false;
  sameAuthorRetransmissionMayQualifyAsNewIndependentCandidate: false;
  republicationWithoutOriginResolutionMayQualifyAsIndependent: false;
  exactScopeRelevanceRequired: boolean;
  exactScopeTarget: 'VISIBLE_STEM_REMOTE_KE_INTERACTION_FORCE_APPLICABILITY';
  genericKeVocabularyAloneSufficientForScope: false;
  explicitRemoteDistancePositionConditionOrLimitationPreferred: boolean;
  traceableAuthorIdentityRequiredForPromotion: boolean;
  traceableWorkIdentityRequiredForPromotion: boolean;
  traceableEditionOrPublicationIdentityRequiredForPromotion: boolean;
  primaryOrNearPrimaryPublicationIdentityPreferred: boolean;
  aggregatorMayRouteDiscovery: boolean;
  aggregatorAloneMayEstablishIndependentAuthority: false;
  searchChannelIds: readonly I188SearchChannelId[];
  searchChannelCount: 6;
  searchChannels: readonly I188SearchChannel[];
  searchChannelsFrozenProspectively: boolean;
  discoveryControlIds: readonly I188DiscoveryControlId[];
  discoveryControlCount: 14;
  discoveryControlsFrozenProspectively: boolean;
  explicitDerivativeRelationshipCheckRequired: boolean;
  derivativeRetransmissionCountsAsIndependentAuthority: false;
  sameAuthorPriorOrLaterWorkCountsAsIndependentFromItself: false;
  unresolvedLineageDefaultDisposition: 'REJECT_INDEPENDENCE_CLAIM';
  sourceClassAloneSufficient: false;
  sourceCountMayBecomeNumericWeight: false;
  provenanceTierMayBecomeNumericWeight: false;
  searchResultCountMayEstablishAuthority: false;
  semanticAgreementAloneMayEstablishIndependence: false;
  thirdPartyQuotationAloneMayEstablishOrigin: false;
  laterEditionMayBackfillEarlierOriginIdentityWithoutBinding: false;
  candidateMustReceiveLineageAdjudicationBeforeIndependence: boolean;
  candidateMustReceiveRequirementCoverageReviewBeforeSelection: boolean;
  candidateSelectionAuthorizedByThisGate: false;
  candidateRegistrationAuthorizedByThisGate: false;
  candidateRebindingAuthorizedByThisGate: false;
  candidateSetReevaluationAuthorizedByThisGate: false;
  candidateSetAdmissibilityEstablishedByThisGate: false;
  newCandidateSetVersionCreatedByThisGate: false;
  newInputPackageVersionCreatedByThisGate: false;
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE' | 'NOT_ASSESSED';
  liSameTargetDirectPrimaryPathRemainsMethodologicallyOpen: boolean;
  liSameTargetImmediateEquivalentRepeatJustified: false;
  liSameTargetPathSuspendedNotRetired: boolean;
  liSameTargetMayReopenOnMateriallyNewDirectLead: boolean;
  liPublicationMediumOrEntityGapStillOpen: boolean;
  liCanonicalDigitalWitnessNormalizationGapStillOpen: boolean;
  li1998WitnessIndependentProvenanceEstablished: false;
  liSameAuthor1998To2004DerivativeChainMustRemainBound: boolean;
  externalLiLineageUnresolvedQuestionCount: 3 | 0;
  targetedDiscoveryExhaustionEstablished: false;
  corpusExhaustionEstablished: false;
  searchSilenceCreatesNegativeFinding: false;
  noThirdWaveCandidateFoundWouldEstablishNonexistence: false;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  sourceCountVotingAllowed: false;
  provenanceTierWeightingAllowed: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  independentNormativeProvenanceEstablishedCount: 0;
  evidenceRebindingMethodologicallyReady: false;
  evidenceRebindingAuthorizedByThisGate: false;
  remediationStrategySelectedByThisGate: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_THIRD_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_EVIDENCE'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_THIRD_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_READINESS_REVIEW';
  notes: readonly string[];
}

function exactI187Accepted(
  i187: I187Li1998DirectPrimaryAcquisitionEvidenceAdequacyRemediationPathReassessmentReviewReport,
): boolean {
  return (
    i187.status === 'RESOLVED_LI_1998_DIRECT_PRIMARY_ACQUISITION_EVIDENCE_ADEQUACY_REMEDIATION_PATH_REASSESSMENT_REVIEW' &&
    i187.decision ===
      'I186_EVIDENCE_ADEQUATE_ZERO_QUALIFYING_GAIN_TWO_GAPS_UNRESOLVED_SAME_TARGET_NOT_EXHAUSTED_EQUIVALENT_REPEAT_NOT_JUSTIFIED_THIRD_WAVE_NEW_PROVENANCE_DISCOVERY_READINESS_MAY_PROCEED_NO_REBINDING_NO_POLICY_RELAXATION' &&
    i187.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i187.policyVersion === 'v1-definition' &&
    i187.adoptionVersion === 'v1-adoption' &&
    i187.currentCandidateSetVersion === 'v1-candidate-set' &&
    i187.currentInputPackageVersion === 'v2-input-package' &&
    i187.exactI186BoundaryAccepted &&
    i187.i186EvidenceAdequateForReassessment &&
    i187.i186FiveFrozenPathsExecuted &&
    i187.i186ObservationalEvidenceAccepted &&
    i187.i186QualifyingAcquisitionCount === 0 &&
    i187.publicationMediumOrEntityGapStillOpen &&
    i187.canonicalDigitalWitnessNormalizationGapStillOpen &&
    i187.sameTargetDirectPrimaryPathExhausted === false &&
    i187.targetedDiscoveryExhaustionEstablished === false &&
    i187.corpusExhaustionEstablished === false &&
    i187.explicitNegativeFindingCount === 0 &&
    i187.nonAcquisitionCreatesNegativeFinding === false &&
    i187.searchSilenceCreatesNegativeFinding === false &&
    i187.failedRegistryAccessCreatesNegativeFinding === false &&
    i187.failedWitnessAccessCreatesNegativeFinding === false &&
    i187.sameTargetDirectPrimaryPathRemainsMethodologicallyOpen &&
    i187.immediateEquivalentSameTargetRepeatJustified === false &&
    i187.materiallyNewDirectLeadRequiredBeforeEquivalentSameTargetRepeat &&
    i187.materiallyNewDirectLeadMayReturnWorkToSameTargetPath &&
    i187.currentSameTargetPathSuspendedNotRetired &&
    i187.thirdWaveNewProvenanceDiscoveryReadinessMethodologicallyJustified &&
    i187.thirdWaveNewProvenanceDiscoveryReadinessReviewAuthorized &&
    i187.thirdWaveDiscoveryExecutedByThisGate === false &&
    i187.thirdWaveCandidateAcquiredByThisGate === false &&
    i187.thirdWaveCandidateSelectedByThisGate === false &&
    i187.thirdWaveCandidateSetMutationAuthorizedByThisGate === false &&
    i187.thirdWaveDiscoveryMustBeConclusionNeutral &&
    i187.thirdWaveDiscoveryMustApplyExplicitDerivativeRelationshipCheck &&
    i187.thirdWaveDiscoverySourceClassAloneSufficient === false &&
    i187.thirdWaveDiscoverySourceCountMayBecomeNumericWeight === false &&
    i187.thirdWaveDiscoveryProvenanceTierMayBecomeNumericWeight === false &&
    i187.thirdWaveDerivativeRetransmissionCountsAsIndependentAuthority === false &&
    i187.bothIdentityFunctionsRequiredBeforeLiRebindingReadiness &&
    i187.oneIdentityFunctionResolutionSufficientForLiRebinding === false &&
    i187.evidenceRebindingMethodologicallyReady === false &&
    i187.evidenceRebindingAuthorizedByThisGate === false &&
    i187.evidenceRebindingSelectedByThisGate === false &&
    i187.evidenceRebindingExecutedByThisGate === false &&
    i187.remediationStrategySelectedByThisGate === false &&
    i187.current2004WitnessPresumedOriginRetired &&
    i187.prior1998SameAuthorWitnessConfirmed &&
    i187.prior1998WitnessIndependentProvenanceEstablished === false &&
    i187.sameAuthor1998To2004DerivativeChainMustRemainBound &&
    i187.externalLineageUnresolvedQuestionCount === 3 &&
    i187.externalLineageUnresolvedStatusPreserved &&
    i187.provenanceIndependenceAdjudicatedByThisGate === false &&
    i187.independentNormativeProvenanceEstablishedCount === 0 &&
    i187.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate === false &&
    i187.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i187.I132ExplicitDerivativeRelationshipCheckRequired &&
    i187.I132DerivativeRetransmissionCountsAsIndependentAuthority === false &&
    i187.I132SourceClassAloneSufficient === false &&
    i187.I132SourceCountMayBecomeNumericWeight === false &&
    i187.I132ProvenanceTierMayBecomeNumericWeight === false &&
    i187.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i187.currentV2PackageAndCandidateSetRemainImmutable &&
    i187.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i187.candidateSetReevaluationAuthorizedByThisGate === false &&
    i187.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i187.productionPolicyExecutionAuthorized === false &&
    i187.actualCompositionPerformedByThisGate === false &&
    i187.multiSourceCompositionAuthorized === false &&
    i187.authorityAcquiredByThisGate === false &&
    i187.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i187.thresholdRuleCreatedByThisGate === false &&
    i187.damageEvaluationAuthorized === false &&
    i187.classificationAuthorized === false &&
    i187.numericScoringAuthorized === false &&
    i187.hiddenStemInteractionEligibilityGapRemains &&
    i187.hiddenStemAuthorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i187.reassessmentRequirementCount === 12 &&
    i187.reassessmentRequirementsFrozen &&
    i187.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_THIRD_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_READINESS_REVIEW'
  );
}

function searchChannels(): readonly I188SearchChannel[] {
  return Object.freeze([
    {
      channelId: 'INSTITUTIONAL_AND_LIBRARY_BIBLIOGRAPHIC_TRACES_FOR_NEW_AUTHORS_AND_WORKS',
      objective: 'Find traceable bibliographic identities for genuinely new authors or works before evaluating doctrinal fit.',
      minimumRecordFields: Object.freeze(['author', 'work title', 'edition or publication identity', 'date or chronology anchor', 'reproducible locator']),
      mayCreateDiscoveryObservation: true,
      mayEstablishIndependentAuthorityByItself: false,
    },
    {
      channelId: 'OLDER_PRINT_SCAN_COLOPHON_IMPRINT_AND_EDITION_TRACES',
      objective: 'Locate older publication surfaces that can distinguish origin witnesses from later retransmissions.',
      minimumRecordFields: Object.freeze(['title or colophon surface', 'author', 'edition/imprint identity', 'date', 'reproducible locator']),
      mayCreateDiscoveryObservation: true,
      mayEstablishIndependentAuthorityByItself: false,
    },
    {
      channelId: 'AUTHOR_PUBLISHER_AND_INSTITUTION_CHRONOLOGY_FOR_ORIGIN_DATING',
      objective: 'Establish origin chronology without inferring publisher or independence from chronology co-location alone.',
      minimumRecordFields: Object.freeze(['named author/work', 'dated event', 'relationship asserted by source', 'source identity']),
      mayCreateDiscoveryObservation: true,
      mayEstablishIndependentAuthorityByItself: false,
    },
    {
      channelId: 'INDEPENDENT_DOCTRINAL_TREATISES_WITH_EXPLICIT_REMOTE_KE_CONDITIONS_OR_LIMITATIONS',
      objective: 'Find exact-scope material on remote/distance/position-sensitive visible-stem 克 force or applicability.',
      minimumRecordFields: Object.freeze(['exact passage scope', 'condition or limitation', 'author/work identity', 'publication trace']),
      mayCreateDiscoveryObservation: true,
      mayEstablishIndependentAuthorityByItself: false,
    },
    {
      channelId: 'CROSS_CITATION_QUOTATION_AND_TERMINOLOGY_LINEAGE_TRACE',
      objective: 'Trace quotation, terminology, examples, or citation direction before any independence claim.',
      minimumRecordFields: Object.freeze(['candidate witness', 'possible upstream/downstream witness', 'shared distinctive material', 'chronology']),
      mayCreateDiscoveryObservation: true,
      mayEstablishIndependentAuthorityByItself: false,
    },
    {
      channelId: 'DERIVATIVE_REPUBLICATION_ALIAS_AND_DIGITAL_RETRANSMISSION_DISAMBIGUATION',
      objective: 'Separate genuinely new provenance from aliases, mirrors, republications, same-author revisions, and derivative retransmissions.',
      minimumRecordFields: Object.freeze(['candidate identity', 'suspected related identity', 'relationship evidence', 'disposition or unresolved status']),
      mayCreateDiscoveryObservation: true,
      mayEstablishIndependentAuthorityByItself: false,
    },
  ]);
}

function finalized(
  material: Omit<I188ThirdWaveNewProvenanceCandidateDiscoveryReadinessReviewReport, 'reviewId'>,
): I188ThirdWaveNewProvenanceCandidateDiscoveryReadinessReviewReport {
  return {
    reviewId: `i188_third_wave_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI188ThirdWaveNewProvenanceCandidateDiscoveryReadinessReview(
  i187: I187Li1998DirectPrimaryAcquisitionEvidenceAdequacyRemediationPathReassessmentReviewReport,
): I188ThirdWaveNewProvenanceCandidateDiscoveryReadinessReviewReport {
  const accepted = exactI187Accepted(i187);

  return finalized({
    reviewVersion: I188_THIRD_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_THIRD_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_READINESS_REVIEW'
      : 'I187_THIRD_WAVE_ROUTING_BOUNDARY_INVALID',
    decision: accepted
      ? 'THIRD_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_READY_CONCLUSION_NEUTRAL_NEW_ORIGIN_SEARCH_SCOPE_AND_I132_PROVENANCE_CONTROLS_FROZEN_ZERO_DISCOVERY_ZERO_SELECTION_ZERO_MUTATION'
      : 'THIRD_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_NOT_READY',
    upstreamI187ReviewId: i187.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI187BoundaryAccepted: accepted,
    conclusionNeutralDiscoveryRequired: accepted,
    discoveryReadinessEstablished: accepted,
    discoveryExecutionAuthorizedByThisGate: accepted,
    discoveryExecutedByThisGate: false,
    discoveryObservationCount: 0,
    candidateEvidenceAcquiredByThisGate: false,
    candidateSelectedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    genuinelyNewProvenanceCandidateRequired: accepted,
    existingOriginalSixAliasMayQualifyAsNewCandidate: false,
    existingRemediationCandidateAliasMayQualifyAsNewCandidate: false,
    sameAuthorRetransmissionMayQualifyAsNewIndependentCandidate: false,
    republicationWithoutOriginResolutionMayQualifyAsIndependent: false,
    exactScopeRelevanceRequired: accepted,
    exactScopeTarget: 'VISIBLE_STEM_REMOTE_KE_INTERACTION_FORCE_APPLICABILITY',
    genericKeVocabularyAloneSufficientForScope: false,
    explicitRemoteDistancePositionConditionOrLimitationPreferred: accepted,
    traceableAuthorIdentityRequiredForPromotion: accepted,
    traceableWorkIdentityRequiredForPromotion: accepted,
    traceableEditionOrPublicationIdentityRequiredForPromotion: accepted,
    primaryOrNearPrimaryPublicationIdentityPreferred: accepted,
    aggregatorMayRouteDiscovery: accepted,
    aggregatorAloneMayEstablishIndependentAuthority: false,
    searchChannelIds: accepted ? I188_SEARCH_CHANNEL_IDS : Object.freeze([]),
    searchChannelCount: 6,
    searchChannels: accepted ? searchChannels() : Object.freeze([]),
    searchChannelsFrozenProspectively: true,
    discoveryControlIds: I188_DISCOVERY_CONTROL_IDS,
    discoveryControlCount: 14,
    discoveryControlsFrozenProspectively: true,
    explicitDerivativeRelationshipCheckRequired: accepted,
    derivativeRetransmissionCountsAsIndependentAuthority: false,
    sameAuthorPriorOrLaterWorkCountsAsIndependentFromItself: false,
    unresolvedLineageDefaultDisposition: 'REJECT_INDEPENDENCE_CLAIM',
    sourceClassAloneSufficient: false,
    sourceCountMayBecomeNumericWeight: false,
    provenanceTierMayBecomeNumericWeight: false,
    searchResultCountMayEstablishAuthority: false,
    semanticAgreementAloneMayEstablishIndependence: false,
    thirdPartyQuotationAloneMayEstablishOrigin: false,
    laterEditionMayBackfillEarlierOriginIdentityWithoutBinding: false,
    candidateMustReceiveLineageAdjudicationBeforeIndependence: accepted,
    candidateMustReceiveRequirementCoverageReviewBeforeSelection: accepted,
    candidateSelectionAuthorizedByThisGate: false,
    candidateRegistrationAuthorizedByThisGate: false,
    candidateRebindingAuthorizedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false,
    newCandidateSetVersionCreatedByThisGate: false,
    newInputPackageVersionCreatedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: accepted,
    currentV2ProvenanceDisposition: accepted ? 'BLOCKED_UNDER_CURRENT_EVIDENCE' : 'NOT_ASSESSED',
    liSameTargetDirectPrimaryPathRemainsMethodologicallyOpen: accepted,
    liSameTargetImmediateEquivalentRepeatJustified: false,
    liSameTargetPathSuspendedNotRetired: accepted,
    liSameTargetMayReopenOnMateriallyNewDirectLead: accepted,
    liPublicationMediumOrEntityGapStillOpen: accepted,
    liCanonicalDigitalWitnessNormalizationGapStillOpen: accepted,
    li1998WitnessIndependentProvenanceEstablished: false,
    liSameAuthor1998To2004DerivativeChainMustRemainBound: accepted,
    externalLiLineageUnresolvedQuestionCount: accepted ? 3 : 0,
    targetedDiscoveryExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    searchSilenceCreatesNegativeFinding: false,
    noThirdWaveCandidateFoundWouldEstablishNonexistence: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: accepted,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    sourceCountVotingAllowed: false,
    provenanceTierWeightingAllowed: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    independentNormativeProvenanceEstablishedCount: 0,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    remediationStrategySelectedByThisGate: false,
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_THIRD_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_EVIDENCE'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_THIRD_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_READINESS_REVIEW',
    notes: accepted
      ? Object.freeze([
          'I188 freezes a conclusion-neutral third-wave discovery protocol before any new candidate evidence is collected.',
          'A discovery observation must be separated from provenance independence: aliases, republications, same-author retransmissions, source-class labels, source counts, and semantic agreement do not establish independent authority.',
          'Promotion beyond observation requires exact-scope relevance plus traceable author/work/publication identity and later lineage adjudication under the unchanged I132 derivative controls.',
          'The Li 1998 same-target path remains suspended rather than retired and may reopen only when a materially new direct lead appears.',
        ])
      : Object.freeze(['I187 boundary mismatch prevents third-wave discovery readiness.']),
  });
}
