import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I195QuWei2001PriorWitnessIdentityTargetPassageEvidenceAdequacyRebindingReadinessReviewReport } from './i195-qu-wei-2001-prior-witness-identity-target-passage-evidence-adequacy-rebinding-readiness-review.js';

export const I196_QU_WEI_2001_THREE_GAP_TARGETED_DISCOVERY_READINESS_REVIEW_VERSION =
  'myeonghwa-qu-wei-2001-three-gap-targeted-discovery-readiness-review-v1';

export const I196_TARGET_GAP_IDS = Object.freeze([
  'QU_WEI_2001_PUBLICATION_MEDIUM_OR_ENTITY_IDENTITY_GAP',
  'QU_WEI_2001_CANONICAL_WITNESS_NORMALIZATION_GAP',
  'QU_WEI_2001_EXACT_TARGET_PASSAGE_BINDING_GAP',
] as const);
export type I196TargetGapId = (typeof I196_TARGET_GAP_IDS)[number];

export const I196_DISCOVERY_CHANNEL_IDS = Object.freeze([
  'PUBLICATION_INSTITUTIONAL_LIBRARY_BIBLIOGRAPHIC_RECORD',
  'PUBLICATION_DIRECT_TITLE_COPYRIGHT_IMPRINT_COLOPHON',
  'PUBLICATION_AUTHOR_OR_ISSUER_CONTEMPORARY_RECORD',
  'NORMALIZATION_DIRECT_FULL_WITNESS_ACQUISITION',
  'NORMALIZATION_TITLE_IMPRINT_TOC_PAGINATION_COMPARISON',
  'NORMALIZATION_FILE_HASH_SCAN_TRANSFORMATION_PROVENANCE',
  'PASSAGE_DIRECT_2001_TARGET_SECTION_INSPECTION',
  'PASSAGE_2001_2003_SEQUENCE_AND_CONTEXT_COMPARISON',
  'PASSAGE_ALTERNATE_2001_REPRESENTATION_CROSS_CHECK',
] as const);
export type I196DiscoveryChannelId = (typeof I196_DISCOVERY_CHANNEL_IDS)[number];

export const I196_DISCOVERY_CONTROL_IDS = Object.freeze([
  'EXACT_I195_THREE_GAP_BOUNDARY_REQUIRED',
  'DISCOVERY_SCOPE_LIMITED_TO_THE_THREE_FROZEN_GAPS',
  'PUBLICATION_IDENTITY_REQUIRES_2001_SPECIFIC_BINDING',
  'LATER_EDITION_METADATA_CANNOT_BACKFILL_2001_PUBLICATION_IDENTITY',
  'SECONDARY_CATALOG_OR_UNVERIFIED_ISBN_CANNOT_ESTABLISH_PUBLICATION_IDENTITY_ALONE',
  'CANONICAL_NORMALIZATION_REQUIRES_DIRECT_REPRESENTATION_COMPARISON_OR_TRANSFORMATION_PROVENANCE',
  'PAGE_COUNT_FILE_SIZE_FILENAME_VARIANCE_ALONE_CANNOT_RESOLVE_NORMALIZATION',
  'EXACT_PASSAGE_BINDING_REQUIRES_DIRECT_2001_TEXTUAL_WITNESS',
  'DOCTRINE_LEVEL_SIMILARITY_ALONE_CANNOT_RESOLVE_EXACT_PASSAGE_BINDING',
  'SEARCH_FAILURE_FOR_EXACT_PHRASE_CANNOT_ESTABLISH_ABSENCE',
  'EACH_GAP_MUST_BE_RECORDED_INDEPENDENTLY_WITHOUT_CROSS_BACKFILL',
  'ALL_THREE_GAPS_REQUIRED_BEFORE_REBINDING_READINESS',
  'SAME_AUTHOR_2001_TO_2003_DEPENDENCY_AND_THREE_EXTERNAL_LINEAGE_GAPS_MUST_BE_PRESERVED',
  'I132_PROVENANCE_CONTROLS_AND_FROZEN_V2_PACKAGE_MUST_REMAIN_UNCHANGED',
  'NO_REBINDING_SELECTION_REGISTRATION_MUTATION_REEVALUATION_COMPOSITION_THRESHOLD_SCORING_OR_PRODUCTION_AUTHORITY',
] as const);
export type I196DiscoveryControlId = (typeof I196_DISCOVERY_CONTROL_IDS)[number];

export interface I196GapAcquisitionPlan {
  gapId: I196TargetGapId;
  channelIds: readonly I196DiscoveryChannelId[];
  qualifyingEvidence: readonly string[];
  nonQualifyingSignals: readonly string[];
  mayResolveGapAtReadinessStage: false;
}

export interface I196QuWei2001ThreeGapTargetedDiscoveryReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status: 'RESOLVED_QU_WEI_2001_THREE_GAP_TARGETED_DISCOVERY_READINESS_REVIEW' | 'I195_THREE_GAP_BOUNDARY_INVALID';
  decision:
    | 'QU_WEI_2001_THREE_GAP_TARGETED_DISCOVERY_READY_THREE_GAPS_NINE_CHANNELS_FIFTEEN_CONTROLS_FROZEN_DISCOVERY_ONLY_NO_REBINDING_NO_INDEPENDENCE'
    | 'QU_WEI_2001_THREE_GAP_TARGETED_DISCOVERY_NOT_READY';
  upstreamI195ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI195BoundaryAccepted: boolean;
  targetGapIds: readonly I196TargetGapId[];
  targetGapCount: 3 | 0;
  allThreeTargetGapsOpenAtEntry: boolean;
  discoveryChannelIds: readonly I196DiscoveryChannelId[];
  discoveryChannelCount: 9;
  discoveryChannelsFrozenProspectively: boolean;
  discoveryControlIds: readonly I196DiscoveryControlId[];
  discoveryControlCount: 15;
  discoveryControlsFrozenProspectively: boolean;
  gapAcquisitionPlans: readonly I196GapAcquisitionPlan[];
  gapAcquisitionPlanCount: 3 | 0;
  publicationIdentityRequires2001SpecificBinding: boolean;
  laterEditionMayBackfill2001PublicationIdentity: false;
  secondaryCatalogAloneMayResolvePublicationIdentity: false;
  unverifiedAggregatorIsbnAloneMayResolvePublicationIdentity: false;
  canonicalNormalizationRequiresDirectComparisonOrTransformationProvenance: boolean;
  pageCountFileSizeOrFilenameVarianceAloneMayResolveNormalization: false;
  exactPassageBindingRequiresDirect2001TextWitness: boolean;
  doctrineLevelSimilarityAloneMayResolveExactPassageBinding: false;
  searchFailureForExactPhraseMayResolveGapAsAbsent: false;
  gapCrossBackfillAllowed: false;
  allThreeGapsRequiredBeforeRebindingReadiness: boolean;
  oneGapResolutionAloneSufficientForRebinding: false;
  targetedDiscoveryEvidenceMayProceed: boolean;
  discoveryExecutedByThisGate: false;
  evidenceAcquiredByThisGate: false;
  gapResolvedByThisGateCount: 0;
  evidenceRebindingMethodologicallyReady: false;
  evidenceRebindingAuthorizedByThisGate: false;
  evidenceRebindingExecutedByThisGate: false;
  sameAuthor2001To2003DoctrinalDependencyPreserved: boolean;
  direct2001DoctrinalAntecedentPreserved: boolean;
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
  candidateSelectedByThisGate: false;
  candidateRegistrationAuthorizedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  candidateSetReevaluationAuthorizedByThisGate: false;
  candidateSetAdmissibilityEstablishedByThisGate: false;
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE' | 'NOT_ASSESSED';
  liSameTargetPathSuspendedNotRetired: boolean;
  liSameTargetMayReopenOnMateriallyNewDirectLead: boolean;
  liPublicationMediumOrEntityGapStillOpen: boolean;
  liCanonicalDigitalWitnessNormalizationGapStillOpen: boolean;
  targetedDiscoveryExhaustionEstablished: false;
  corpusExhaustionEstablished: false;
  searchSilenceCreatesNegativeFinding: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_THREE_GAP_TARGETED_DISCOVERY_EVIDENCE'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_THREE_GAP_TARGETED_DISCOVERY_READINESS_REVIEW';
  notes: readonly string[];
}

function exactI195Accepted(i195: I195QuWei2001PriorWitnessIdentityTargetPassageEvidenceAdequacyRebindingReadinessReviewReport): boolean {
  return (
    i195.status === 'RESOLVED_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_EVIDENCE_ADEQUACY_REBINDING_READINESS_REVIEW' &&
    i195.decision === 'I194_EVIDENCE_ADEQUATE_TO_ESTABLISH_DIRECT_2001_DOCTRINAL_ANTECEDENT_BUT_REBINDING_NOT_READY_THREE_GAPS_PUBLICATION_IDENTITY_CANONICAL_WITNESS_NORMALIZATION_AND_EXACT_TARGET_PASSAGE_BINDING_REMAIN_TARGETED_THREE_GAP_DISCOVERY_READINESS_MAY_PROCEED_NO_INDEPENDENCE_NO_POLICY_RELAXATION' &&
    i195.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i195.policyVersion === 'v1-definition' && i195.adoptionVersion === 'v1-adoption' &&
    i195.currentCandidateSetVersion === 'v1-candidate-set' && i195.currentInputPackageVersion === 'v2-input-package' &&
    i195.exactI194BoundaryAccepted && i195.i194EvidenceAdequateForReassessment &&
    i195.directDoctrinalAntecedentEvidenceAdequate && i195.doctrineLevelAntecedentEqualsExactTargetPassageIdentity === false &&
    i195.remainingGapCount === 3 && i195.allThreeGapsRemainOpen &&
    i195.publicationGapStatus === 'UNRESOLVED' && i195.canonicalWitnessNormalizationGapStatus === 'UNRESOLVED' && i195.exactTargetPassageBindingGapStatus === 'UNRESOLVED' &&
    i195.searchSilenceCreatesNegativeFinding === false && i195.exactPhraseNotFoundProvesPhraseAbsentFrom2001 === false &&
    i195.secondaryCatalogStatusMayBackfillPublicationIdentity === false && i195.unverifiedAggregatorIsbnMayBackfillPublicationIdentity === false &&
    i195.representationPageCountVarianceCreatesDistinctAuthority === false && i195.allThreeRemainingGapsRequiredBeforeRebindingReadiness &&
    i195.oneGapResolutionAloneSufficientForRebinding === false && i195.evidenceRebindingMethodologicallyReady === false &&
    i195.evidenceRebindingAuthorizedByThisGate === false && i195.targetedThreeGapDiscoveryReadinessReviewAuthorized &&
    i195.sameAuthor2001To2003DoctrinalDependencyPreserved && i195.externalTargetLineageUnresolvedQuestionCount === 3 &&
    i195.provenanceIndependenceAdjudicatedByThisGate === false && i195.independentNormativeProvenanceEstablishedCount === 0 &&
    i195.explicitDerivativeRelationshipCheckRequired && i195.derivativeRetransmissionCountsAsIndependentAuthority === false &&
    i195.unresolvedLineageDefaultDisposition === 'REJECT_INDEPENDENCE_CLAIM' && i195.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i195.I132PolicyRelaxationAuthorizedByThisGate === false && i195.sourceClassAloneSufficient === false &&
    i195.sourceCountMayBecomeNumericWeight === false && i195.provenanceTierMayBecomeNumericWeight === false &&
    i195.currentV2PackageAndCandidateSetRemainImmutable && i195.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i195.candidateSetReevaluationAuthorizedByThisGate === false && i195.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i195.liSameTargetPathSuspendedNotRetired && i195.liPublicationMediumOrEntityGapStillOpen && i195.liCanonicalDigitalWitnessNormalizationGapStillOpen &&
    i195.targetedDiscoveryExhaustionEstablished === false && i195.corpusExhaustionEstablished === false &&
    i195.productionPolicyExecutionAuthorized === false && i195.actualCompositionPerformedByThisGate === false &&
    i195.multiSourceCompositionAuthorized === false && i195.authorityAcquiredByThisGate === false &&
    i195.visibleStemBinaryEffectiveInteractionEligibilityResolved === false && i195.thresholdRuleCreatedByThisGate === false &&
    i195.damageEvaluationAuthorized === false && i195.classificationAuthorized === false && i195.numericScoringAuthorized === false &&
    i195.hiddenStemInteractionEligibilityGapRemains && i195.hiddenStemAuthorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i195.recommendedNextGate === 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_THREE_GAP_TARGETED_DISCOVERY_READINESS_REVIEW'
  );
}

function plans(): readonly I196GapAcquisitionPlan[] {
  return Object.freeze([
    {
      gapId: 'QU_WEI_2001_PUBLICATION_MEDIUM_OR_ENTITY_IDENTITY_GAP',
      channelIds: Object.freeze(I196_DISCOVERY_CHANNEL_IDS.slice(0, 3)),
      qualifyingEvidence: Object.freeze(['2001-specific library or institutional bibliographic record binding title+author+issuer/status', 'direct 2001 title/copyright/imprint/colophon surface', 'contemporary author/issuer record explicitly identifying publication or nonformal issue status']),
      nonQualifyingSignals: Object.freeze(['later-edition metadata without 2001 binding', 'secondary catalog label alone', 'unverified aggregator ISBN alone']),
      mayResolveGapAtReadinessStage: false,
    },
    {
      gapId: 'QU_WEI_2001_CANONICAL_WITNESS_NORMALIZATION_GAP',
      channelIds: Object.freeze(I196_DISCOVERY_CHANNEL_IDS.slice(3, 6)),
      qualifyingEvidence: Object.freeze(['direct full witness representations suitable for comparison', 'title/imprint/TOC/pagination/content-anchor comparison sufficient to group or distinguish variants', 'stable file-hash or scan/transformation provenance linking digital representations']),
      nonQualifyingSignals: Object.freeze(['page-count variance alone', 'file-size variance alone', 'filename or host-name variance alone']),
      mayResolveGapAtReadinessStage: false,
    },
    {
      gapId: 'QU_WEI_2001_EXACT_TARGET_PASSAGE_BINDING_GAP',
      channelIds: Object.freeze(I196_DISCOVERY_CHANNEL_IDS.slice(6, 9)),
      qualifyingEvidence: Object.freeze(['direct 2001 text containing the specific route semantics under comparison', 'sequence/context comparison showing exact or near-verbatim correspondence to the 2003 target claim', 'alternate 2001 representation confirming the same passage and context']),
      nonQualifyingSignals: Object.freeze(['generic doctrine similarity alone', 'third-party quotation alone', 'failure to find the exact phrase in one representation']),
      mayResolveGapAtReadinessStage: false,
    },
  ]);
}

function finalized(material: Omit<I196QuWei2001ThreeGapTargetedDiscoveryReadinessReviewReport, 'reviewId'>): I196QuWei2001ThreeGapTargetedDiscoveryReadinessReviewReport {
  return { reviewId: `i196_qu_wei_2001_three_gap_readiness_${deterministicContentHash(material).slice(0, 24)}`, ...material };
}

export function buildI196QuWei2001ThreeGapTargetedDiscoveryReadinessReview(i195: I195QuWei2001PriorWitnessIdentityTargetPassageEvidenceAdequacyRebindingReadinessReviewReport): I196QuWei2001ThreeGapTargetedDiscoveryReadinessReviewReport {
  const accepted = exactI195Accepted(i195);
  return finalized({
    reviewVersion: I196_QU_WEI_2001_THREE_GAP_TARGETED_DISCOVERY_READINESS_REVIEW_VERSION,
    status: accepted ? 'RESOLVED_QU_WEI_2001_THREE_GAP_TARGETED_DISCOVERY_READINESS_REVIEW' : 'I195_THREE_GAP_BOUNDARY_INVALID',
    decision: accepted ? 'QU_WEI_2001_THREE_GAP_TARGETED_DISCOVERY_READY_THREE_GAPS_NINE_CHANNELS_FIFTEEN_CONTROLS_FROZEN_DISCOVERY_ONLY_NO_REBINDING_NO_INDEPENDENCE' : 'QU_WEI_2001_THREE_GAP_TARGETED_DISCOVERY_NOT_READY',
    upstreamI195ReviewId: i195.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy', policyVersion: 'v1-definition', adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set', currentInputPackageVersion: 'v2-input-package', exactI195BoundaryAccepted: accepted,
    targetGapIds: accepted ? I196_TARGET_GAP_IDS : Object.freeze([]), targetGapCount: accepted ? 3 : 0, allThreeTargetGapsOpenAtEntry: accepted,
    discoveryChannelIds: I196_DISCOVERY_CHANNEL_IDS, discoveryChannelCount: 9, discoveryChannelsFrozenProspectively: accepted,
    discoveryControlIds: I196_DISCOVERY_CONTROL_IDS, discoveryControlCount: 15, discoveryControlsFrozenProspectively: accepted,
    gapAcquisitionPlans: accepted ? plans() : Object.freeze([]), gapAcquisitionPlanCount: accepted ? 3 : 0,
    publicationIdentityRequires2001SpecificBinding: accepted, laterEditionMayBackfill2001PublicationIdentity: false,
    secondaryCatalogAloneMayResolvePublicationIdentity: false, unverifiedAggregatorIsbnAloneMayResolvePublicationIdentity: false,
    canonicalNormalizationRequiresDirectComparisonOrTransformationProvenance: accepted, pageCountFileSizeOrFilenameVarianceAloneMayResolveNormalization: false,
    exactPassageBindingRequiresDirect2001TextWitness: accepted, doctrineLevelSimilarityAloneMayResolveExactPassageBinding: false,
    searchFailureForExactPhraseMayResolveGapAsAbsent: false, gapCrossBackfillAllowed: false,
    allThreeGapsRequiredBeforeRebindingReadiness: accepted, oneGapResolutionAloneSufficientForRebinding: false,
    targetedDiscoveryEvidenceMayProceed: accepted, discoveryExecutedByThisGate: false, evidenceAcquiredByThisGate: false, gapResolvedByThisGateCount: 0,
    evidenceRebindingMethodologicallyReady: false, evidenceRebindingAuthorizedByThisGate: false, evidenceRebindingExecutedByThisGate: false,
    sameAuthor2001To2003DoctrinalDependencyPreserved: accepted, direct2001DoctrinalAntecedentPreserved: accepted,
    externalTargetLineageUnresolvedQuestionCount: accepted ? 3 : 0, provenanceIndependenceAdjudicatedByThisGate: false,
    independentNormativeProvenanceEstablishedCount: 0, explicitDerivativeRelationshipCheckRequired: accepted,
    derivativeRetransmissionCountsAsIndependentAuthority: false, unresolvedLineageDefaultDisposition: 'REJECT_INDEPENDENCE_CLAIM',
    I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false, I132IndependentNormativeProvenanceRequirementRemainsNormative: accepted,
    I132PolicyRelaxationAuthorizedByThisGate: false, sourceClassAloneSufficient: false, sourceCountMayBecomeNumericWeight: false, provenanceTierMayBecomeNumericWeight: false,
    candidateSelectedByThisGate: false, candidateRegistrationAuthorizedByThisGate: false, candidateSetMutatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false, candidateSetAdmissibilityEstablishedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: accepted, currentV2ProvenanceDisposition: accepted ? 'BLOCKED_UNDER_CURRENT_EVIDENCE' : 'NOT_ASSESSED',
    liSameTargetPathSuspendedNotRetired: accepted, liSameTargetMayReopenOnMateriallyNewDirectLead: accepted,
    liPublicationMediumOrEntityGapStillOpen: accepted, liCanonicalDigitalWitnessNormalizationGapStillOpen: accepted,
    targetedDiscoveryExhaustionEstablished: false, corpusExhaustionEstablished: false, searchSilenceCreatesNegativeFinding: false,
    productionPolicyExecutionAuthorized: false, actualCompositionPerformedByThisGate: false, multiSourceCompositionAuthorized: false,
    authorityAcquiredByThisGate: false, visibleStemBinaryEffectiveInteractionEligibilityResolved: false, thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false, classificationAuthorized: false, numericScoringAuthorized: false,
    hiddenStemInteractionEligibilityGapRemains: true, hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    recommendedNextGate: accepted ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_THREE_GAP_TARGETED_DISCOVERY_EVIDENCE' : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_THREE_GAP_TARGETED_DISCOVERY_READINESS_REVIEW',
    notes: Object.freeze(['I196 freezes qualifying evidence requirements before new three-gap evidence collection.', 'The three gaps are independent obligations and cannot backfill each other.', 'Direct doctrinal antecedence remains preserved while rebinding stays fail-closed.', 'No search silence or access failure becomes negative provenance evidence.']),
  });
}
