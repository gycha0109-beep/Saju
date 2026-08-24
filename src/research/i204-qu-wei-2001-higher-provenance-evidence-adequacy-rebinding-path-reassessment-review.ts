import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I203_RESOLVED_GAP_IDS,
  I203_UNRESOLVED_GAP_IDS,
  type I203QuWei2001HigherProvenanceSubstrateAcquisitionEvidenceReport,
} from './i203-qu-wei-2001-higher-provenance-substrate-acquisition-evidence.js';

export const I204_QU_WEI_2001_HIGHER_PROVENANCE_EVIDENCE_ADEQUACY_REBINDING_PATH_REASSESSMENT_REVIEW_VERSION =
  'myeonghwa-qu-wei-2001-higher-provenance-evidence-adequacy-rebinding-path-reassessment-review-v1';

export const I204_REMAINING_REMEDIATION_PATH_IDS = Object.freeze([
  'BYTE_STABLE_DIRECT_FILE_PAIR_SCAN_LINEAGE_AND_STRUCTURE_NORMALIZATION_ACQUISITION',
  'CANONICALLY_BOUND_2001_TARGET_SECTION_FACSIMILE_AND_2001_2003_SEQUENCE_COMPARISON_ACQUISITION',
] as const);

export type I204RemainingRemediationPathId = (typeof I204_REMAINING_REMEDIATION_PATH_IDS)[number];

export const I204_REASSESSMENT_CONTROL_IDS = Object.freeze([
  'EXACT_I203_ONE_RESOLVED_TWO_UNRESOLVED_BOUNDARY_REQUIRED',
  'FIRST_PARTY_2001_BOOK_MEDIUM_PUBLICATION_RESOLUTION_MUST_BE_PRESERVED',
  'FORMAL_PUBLISHER_ISBN_OR_ENTITY_MUST_NOT_BE_INVENTED_AFTER_MEDIUM_RESOLUTION',
  'RESOLVED_PUBLICATION_GAP_MUST_NOT_BE_REOPENED_WITHOUT_CONTRADICTORY_PRIMARY_EVIDENCE',
  'PUBLICATION_EVIDENCE_MUST_NOT_BACKFILL_CANONICAL_WITNESS_NORMALIZATION',
  'PUBLICATION_EVIDENCE_MUST_NOT_BACKFILL_EXACT_TARGET_PASSAGE_BINDING',
  'NORMALIZATION_REQUIRES_BYTE_STABLE_IDENTITY_SCAN_LINEAGE_AND_STRUCTURE_COMPARISON',
  'EXACT_PASSAGE_BINDING_REQUIRES_CANONICALLY_BOUND_2001_CONTEXT_AND_DIRECT_2001_2003_SEQUENCE_COMPARISON',
  'DOCTRINE_LEVEL_ANTECEDENT_MUST_REMAIN_DISTINCT_FROM_EXACT_OR_NEAR_VERBATIM_BINDING',
  'NON_ACQUISITION_ACCESS_FAILURE_AND_SEARCH_SILENCE_MUST_REMAIN_NON_NEGATIVE',
  'NO_EXHAUSTION_REBINDING_OR_INDEPENDENCE_ADJUDICATION_AT_REASSESSMENT',
  'I132_FROZEN_V2_CANDIDATE_AND_PRODUCTION_GUARDS_MUST_REMAIN_UNCHANGED',
] as const);

export type I204ReassessmentControlId = (typeof I204_REASSESSMENT_CONTROL_IDS)[number];

export interface I204QuWei2001HigherProvenanceEvidenceAdequacyRebindingPathReassessmentReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_QU_WEI_2001_HIGHER_PROVENANCE_EVIDENCE_ADEQUACY_REBINDING_PATH_REASSESSMENT_REVIEW'
    | 'I203_HIGHER_PROVENANCE_EVIDENCE_BOUNDARY_INVALID';
  decision:
    | 'I203_EVIDENCE_ADEQUATE_PUBLICATION_GAP_RESOLUTION_ACCEPTED_TWO_GAPS_REMAIN_REBINDING_NOT_READY_TWO_PATH_REMEDIATION_READINESS_MAY_PROCEED_NO_EXHAUSTION_NO_INDEPENDENCE_NO_POLICY_RELAXATION'
    | 'QU_WEI_2001_HIGHER_PROVENANCE_EVIDENCE_REASSESSMENT_NOT_READY';
  upstreamI203EvidenceRecordSetId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI203BoundaryAccepted: boolean;
  i203EvidenceAdequateForReassessment: boolean;
  assessedOriginalGapCount: 3 | 0;
  resolvedOriginalGapCount: 1 | 0;
  remainingGapCount: 2 | 0;
  explicitNegativeFindingCountAccepted: 0;
  resolvedGapIdsAccepted: readonly (typeof I203_RESOLVED_GAP_IDS)[number][];
  remainingGapIdsAccepted: readonly (typeof I203_UNRESOLVED_GAP_IDS)[number][];
  firstParty2001BookMediumBindingAccepted: boolean;
  explicit2001NonformalPublicationStatusAccepted: boolean;
  publicationMediumIdentityAccepted: boolean;
  publicationEntityIdentityRequiredAfterMediumResolution: false;
  formal2001PublisherEstablished: false;
  formal2001IsbnEstablished: false;
  secondaryAggregatorMetadataAcceptedAsAuthority: false;
  publicationIdentityGapResolved: boolean;
  publicationGapReopenedByThisGate: false;
  contradictoryPrimaryPublicationEvidenceObserved: false;
  canonicalWitnessNormalizationGapResolved: false;
  exactTargetPassageBindingGapResolved: false;
  publicationResolutionMayBackfillNormalization: false;
  publicationResolutionMayBackfillExactPassage: false;
  directDoctrinalAntecedentPreserved: boolean;
  doctrineLevelAntecedentEqualsExactOrNearVerbatimBinding: false;
  remainingRemediationPathIds: readonly I204RemainingRemediationPathId[];
  remainingRemediationPathCount: 2 | 0;
  remainingRemediationPathsFrozenProspectively: boolean;
  byteStableNormalizationPathStillReviewable: boolean;
  canonicalTargetFacsimileSequencePathStillReviewable: boolean;
  remainingPathSelectedByThisGate: false;
  twoGapCompletionReadinessReviewMethodologicallyJustified: boolean;
  twoGapCompletionReadinessReviewAuthorized: boolean;
  acquisitionExecutedByThisGate: false;
  evidenceAcquiredByThisGate: false;
  twoRemainingGapsRequiredBeforeRebindingReadiness: boolean;
  oneRemainingGapResolutionAloneSufficientForRebinding: false;
  evidenceRebindingMethodologicallyReady: false;
  evidenceRebindingAuthorizedByThisGate: false;
  evidenceRebindingExecutedByThisGate: false;
  nonAcquisitionCreatesNegativeFinding: false;
  accessFailureCreatesNegativeFinding: false;
  searchSilenceCreatesNegativeFinding: false;
  failureToAcquireByteStablePairCreatesNegativeFinding: false;
  failureToAcquireCanonicalFacsimileCreatesNegativeFinding: false;
  targetedDiscoveryExhaustionEstablished: false;
  onlineCorpusExhaustionEstablished: false;
  corpusExhaustionEstablished: false;
  universalNoFurtherEvidenceClaimEstablished: false;
  sameAuthor2001To2003DoctrinalDependencyPreserved: boolean;
  externalTargetLineageUnresolvedQuestionCount: 3 | 0;
  provenanceIndependenceAdjudicatedByThisGate: false;
  independentNormativeProvenanceEstablishedCount: 0;
  explicitDerivativeRelationshipCheckRequired: boolean;
  derivativeRetransmissionCountsAsIndependentAuthority: false;
  unresolvedLineageDefaultDisposition: 'REJECT_INDEPENDENCE_CLAIM';
  I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  sourceClassAloneSufficient: false;
  sourceCountMayBecomeNumericWeight: false;
  provenanceTierMayBecomeNumericWeight: false;
  reassessmentControlIds: readonly I204ReassessmentControlId[];
  reassessmentControlCount: 12;
  reassessmentControlsFrozen: boolean;
  candidateSelectedByThisGate: false;
  candidateRegistrationAuthorizedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  candidateSetReevaluationAuthorizedByThisGate: false;
  candidateSetAdmissibilityEstablishedByThisGate: false;
  newCandidateSetVersionCreatedByThisGate: false;
  newInputPackageVersionCreatedByThisGate: false;
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE' | 'NOT_ASSESSED';
  liSameTargetPathSuspendedNotRetired: boolean;
  liSameTargetMayReopenOnMateriallyNewDirectLead: boolean;
  liPublicationMediumOrEntityGapStillOpen: boolean;
  liCanonicalDigitalWitnessNormalizationGapStillOpen: boolean;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_TWO_REMAINING_GAP_COMPLETION_ACQUISITION_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_EVIDENCE_ADEQUACY_REBINDING_PATH_REASSESSMENT_REVIEW';
  notes: readonly string[];
}

function exactI203Accepted(i203: I203QuWei2001HigherProvenanceSubstrateAcquisitionEvidenceReport): boolean {
  return (
    i203.status === 'RESOLVED_QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_EVIDENCE' &&
    i203.decision ===
      'QU_WEI_2001_HIGHER_PROVENANCE_ACQUISITION_EXECUTED_FOUR_PATHS_FIRST_PARTY_2001_BOOK_MEDIUM_BINDING_RESOLVES_PUBLICATION_GAP_TWO_GAPS_REMAIN_NO_CANONICAL_NORMALIZATION_NO_EXACT_PASSAGE_BINDING_NO_NEGATIVE_FINDING_NO_REBINDING_NO_INDEPENDENCE' &&
    i203.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i203.policyVersion === 'v1-definition' &&
    i203.adoptionVersion === 'v1-adoption' &&
    i203.currentCandidateSetVersion === 'v1-candidate-set' &&
    i203.currentInputPackageVersion === 'v2-input-package' &&
    i203.exactI202BoundaryAccepted &&
    i203.targetPriorWitnessId === 'QU_WEI_SIZHU_XIANGZHEN_2001' &&
    i203.acquisitionPathCountExecuted === 4 &&
    i203.allFourFrozenAcquisitionPathsExecuted &&
    i203.acquisitionPathEvidenceRecordCount === 4 &&
    i203.evidenceObligationCountAccepted === 8 &&
    i203.acquisitionControlCountAccepted === 18 &&
    i203.higherProvenanceEvidencePathCount === 1 &&
    i203.qualifyingGapResolutionEvidenceCount === 1 &&
    i203.resolvedGapCount === 1 &&
    i203.unresolvedGapCount === 2 &&
    i203.explicitNegativeFindingCount === 0 &&
    i203.resolvedGapIds.length === 1 &&
    i203.resolvedGapIds[0] === I203_RESOLVED_GAP_IDS[0] &&
    i203.unresolvedGapIds.length === 2 &&
    i203.unresolvedGapIds[0] === I203_UNRESOLVED_GAP_IDS[0] &&
    i203.unresolvedGapIds[1] === I203_UNRESOLVED_GAP_IDS[1] &&
    i203.authorBrandedFirstPartyIssuanceRecordAcquired &&
    i203.firstPartyIssuanceRecordSourceLocator === 'https://www.zhouyiqw.com/qwjj.php' &&
    i203.firstPartyRecordExplicitlyBindsAuthorIdentity &&
    i203.firstPartyRecordExplicitlyBindsTitle &&
    i203.firstPartyRecordExplicitlyBinds2001 &&
    i203.firstPartyRecordIdentifiesBookMedium &&
    i203.firstPartyRecordEstablishesMadeAvailableStatus &&
    i203.explicit2001NonformalPublicationStatusEstablished &&
    i203.publicationMediumIdentityEstablished &&
    i203.publicationEntityIdentityEstablished === false &&
    i203.formal2001PublisherEstablished === false &&
    i203.formal2001IsbnEstablished === false &&
    i203.secondaryAggregatorPublisherLabelUsedAsAuthority === false &&
    i203.secondaryAggregatorIsbnUsedAsAuthority === false &&
    i203.publicationMediumOrEntityIdentityEstablished &&
    i203.publicationIdentityGapResolved &&
    i203.byteStableDirectFilePairAcquired === false &&
    i203.stableCrossRepresentationHashFamilyAcquired === false &&
    i203.scanLineageOrTransformationProvenanceAcquired === false &&
    i203.directCrossRepresentationStructureNormalizationCompleted === false &&
    i203.pageCountFileSizeFilenameHostVarianceCreatesCanonicalIdentity === false &&
    i203.canonicalWitnessNormalizationGapResolved === false &&
    i203.canonicallyBound2001TargetSectionFacsimileAcquired === false &&
    i203.direct2001TargetSectionContextAnchorAcquiredByThisGate === false &&
    i203.direct2001To2003TargetSequenceComparisonCompletedByThisGate === false &&
    i203.exact2003RouteSequenceBoundIntoCanonical2001Witness === false &&
    i203.nearVerbatim2003RouteSequenceBoundIntoCanonical2001Witness === false &&
    i203.directDoctrinalAntecedentPreserved &&
    i203.doctrineLevelAntecedentMayResolveExactPassageGap === false &&
    i203.exactTargetPassageBindingGapResolved === false &&
    i203.evidenceForOneGapMayBackfillAnotherGap === false &&
    i203.inaccessibleSubstrateCreatesNegativeFinding === false &&
    i203.unavailableCustodianCreatesNegativeFinding === false &&
    i203.nonAcquisitionCreatesNegativeFinding === false &&
    i203.accessFailureCreatesNegativeFinding === false &&
    i203.failureToAcquirePhysicalWitnessCreatesNegativeFinding === false &&
    i203.failureToAcquireByteStablePairCreatesNegativeFinding === false &&
    i203.failureToAcquireCanonicalFacsimileCreatesNegativeFinding === false &&
    i203.onlineCorpusExhaustionEstablished === false &&
    i203.corpusExhaustionEstablished === false &&
    i203.allOriginalThreeGapRequirementsMustBeSatisfiedBeforeRebinding &&
    i203.twoGapsRemainBlockingRebinding &&
    i203.evidenceRebindingMethodologicallyReadyByThisGate === false &&
    i203.evidenceRebindingAuthorizedByThisGate === false &&
    i203.evidenceRebindingExecutedByThisGate === false &&
    i203.sameAuthor2001To2003DoctrinalDependencyPreserved &&
    i203.externalTargetLineageUnresolvedQuestionCountPreserved === 3 &&
    i203.provenanceIndependenceAdjudicatedByThisGate === false &&
    i203.independentNormativeProvenanceEstablishedCount === 0 &&
    i203.explicitDerivativeRelationshipCheckRequired &&
    i203.derivativeRetransmissionCountsAsIndependentAuthority === false &&
    i203.unresolvedLineageDefaultDisposition === 'REJECT_INDEPENDENCE_CLAIM' &&
    i203.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate === false &&
    i203.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i203.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i203.currentV2PackageAndCandidateSetRemainImmutable &&
    i203.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i203.candidateSetMutatedByThisGate === false &&
    i203.candidateSetReevaluationAuthorizedByThisGate === false &&
    i203.productionPolicyExecutionAuthorized === false &&
    i203.actualCompositionPerformedByThisGate === false &&
    i203.multiSourceCompositionAuthorized === false &&
    i203.thresholdRuleCreatedByThisGate === false &&
    i203.classificationAuthorized === false &&
    i203.numericScoringAuthorized === false &&
    i203.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_EVIDENCE_ADEQUACY_REBINDING_PATH_REASSESSMENT_REVIEW'
  );
}

function finalized(
  material: Omit<I204QuWei2001HigherProvenanceEvidenceAdequacyRebindingPathReassessmentReviewReport, 'reviewId'>,
): I204QuWei2001HigherProvenanceEvidenceAdequacyRebindingPathReassessmentReviewReport {
  return {
    reviewId: `i204_qu_wei_2001_two_gap_reassessment_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI204QuWei2001HigherProvenanceEvidenceAdequacyRebindingPathReassessmentReview(
  i203: I203QuWei2001HigherProvenanceSubstrateAcquisitionEvidenceReport,
): I204QuWei2001HigherProvenanceEvidenceAdequacyRebindingPathReassessmentReviewReport {
  const accepted = exactI203Accepted(i203);

  return finalized({
    reviewVersion: I204_QU_WEI_2001_HIGHER_PROVENANCE_EVIDENCE_ADEQUACY_REBINDING_PATH_REASSESSMENT_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_QU_WEI_2001_HIGHER_PROVENANCE_EVIDENCE_ADEQUACY_REBINDING_PATH_REASSESSMENT_REVIEW'
      : 'I203_HIGHER_PROVENANCE_EVIDENCE_BOUNDARY_INVALID',
    decision: accepted
      ? 'I203_EVIDENCE_ADEQUATE_PUBLICATION_GAP_RESOLUTION_ACCEPTED_TWO_GAPS_REMAIN_REBINDING_NOT_READY_TWO_PATH_REMEDIATION_READINESS_MAY_PROCEED_NO_EXHAUSTION_NO_INDEPENDENCE_NO_POLICY_RELAXATION'
      : 'QU_WEI_2001_HIGHER_PROVENANCE_EVIDENCE_REASSESSMENT_NOT_READY',
    upstreamI203EvidenceRecordSetId: i203.evidenceRecordSetId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI203BoundaryAccepted: accepted,
    i203EvidenceAdequateForReassessment: accepted,
    assessedOriginalGapCount: accepted ? 3 : 0,
    resolvedOriginalGapCount: accepted ? 1 : 0,
    remainingGapCount: accepted ? 2 : 0,
    explicitNegativeFindingCountAccepted: 0,
    resolvedGapIdsAccepted: accepted ? I203_RESOLVED_GAP_IDS : Object.freeze([]),
    remainingGapIdsAccepted: accepted ? I203_UNRESOLVED_GAP_IDS : Object.freeze([]),
    firstParty2001BookMediumBindingAccepted: accepted,
    explicit2001NonformalPublicationStatusAccepted: accepted,
    publicationMediumIdentityAccepted: accepted,
    publicationEntityIdentityRequiredAfterMediumResolution: false,
    formal2001PublisherEstablished: false,
    formal2001IsbnEstablished: false,
    secondaryAggregatorMetadataAcceptedAsAuthority: false,
    publicationIdentityGapResolved: accepted,
    publicationGapReopenedByThisGate: false,
    contradictoryPrimaryPublicationEvidenceObserved: false,
    canonicalWitnessNormalizationGapResolved: false,
    exactTargetPassageBindingGapResolved: false,
    publicationResolutionMayBackfillNormalization: false,
    publicationResolutionMayBackfillExactPassage: false,
    directDoctrinalAntecedentPreserved: accepted,
    doctrineLevelAntecedentEqualsExactOrNearVerbatimBinding: false,
    remainingRemediationPathIds: I204_REMAINING_REMEDIATION_PATH_IDS,
    remainingRemediationPathCount: accepted ? 2 : 0,
    remainingRemediationPathsFrozenProspectively: accepted,
    byteStableNormalizationPathStillReviewable: accepted,
    canonicalTargetFacsimileSequencePathStillReviewable: accepted,
    remainingPathSelectedByThisGate: false,
    twoGapCompletionReadinessReviewMethodologicallyJustified: accepted,
    twoGapCompletionReadinessReviewAuthorized: accepted,
    acquisitionExecutedByThisGate: false,
    evidenceAcquiredByThisGate: false,
    twoRemainingGapsRequiredBeforeRebindingReadiness: accepted,
    oneRemainingGapResolutionAloneSufficientForRebinding: false,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    nonAcquisitionCreatesNegativeFinding: false,
    accessFailureCreatesNegativeFinding: false,
    searchSilenceCreatesNegativeFinding: false,
    failureToAcquireByteStablePairCreatesNegativeFinding: false,
    failureToAcquireCanonicalFacsimileCreatesNegativeFinding: false,
    targetedDiscoveryExhaustionEstablished: false,
    onlineCorpusExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    universalNoFurtherEvidenceClaimEstablished: false,
    sameAuthor2001To2003DoctrinalDependencyPreserved: accepted,
    externalTargetLineageUnresolvedQuestionCount: accepted ? 3 : 0,
    provenanceIndependenceAdjudicatedByThisGate: false,
    independentNormativeProvenanceEstablishedCount: 0,
    explicitDerivativeRelationshipCheckRequired: accepted,
    derivativeRetransmissionCountsAsIndependentAuthority: false,
    unresolvedLineageDefaultDisposition: 'REJECT_INDEPENDENCE_CLAIM',
    I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: accepted,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    sourceClassAloneSufficient: false,
    sourceCountMayBecomeNumericWeight: false,
    provenanceTierMayBecomeNumericWeight: false,
    reassessmentControlIds: I204_REASSESSMENT_CONTROL_IDS,
    reassessmentControlCount: 12,
    reassessmentControlsFrozen: accepted,
    candidateSelectedByThisGate: false,
    candidateRegistrationAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false,
    newCandidateSetVersionCreatedByThisGate: false,
    newInputPackageVersionCreatedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: accepted,
    currentV2ProvenanceDisposition: accepted ? 'BLOCKED_UNDER_CURRENT_EVIDENCE' : 'NOT_ASSESSED',
    liSameTargetPathSuspendedNotRetired: accepted,
    liSameTargetMayReopenOnMateriallyNewDirectLead: accepted,
    liPublicationMediumOrEntityGapStillOpen: accepted,
    liCanonicalDigitalWitnessNormalizationGapStillOpen: accepted,
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_TWO_REMAINING_GAP_COMPLETION_ACQUISITION_READINESS_REVIEW'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_EVIDENCE_ADEQUACY_REBINDING_PATH_REASSESSMENT_REVIEW',
    notes: accepted
      ? Object.freeze([
          'I204 accepts I203 as adequate to resolve only the Qu Wei 2001 publication-medium identity gap through first-party 2001 book-medium/made-available evidence.',
          'Formal publisher, ISBN, and publishing-entity identity remain unestablished but are not required to reopen a gap whose explicit contract was publication medium OR entity identity.',
          'The resolved publication gap is frozen and may not backfill either canonical witness normalization or exact target-passage binding.',
          'Exactly two remaining remediation paths are retained: byte-stable scan-lineage/structure normalization and canonically bound 2001 target-section facsimile plus direct 2001-to-2003 sequence comparison.',
          'Rebinding remains not ready until both remaining gaps are resolved; non-acquisition remains non-negative and no exhaustion is inferred.',
          'No independence adjudication, I132 relaxation, candidate change, composition, threshold creation, classification, scoring, or production authority is granted.',
        ])
      : Object.freeze(['I203 boundary mismatch prevents one-resolved/two-unresolved evidence reassessment.']),
  });
}
