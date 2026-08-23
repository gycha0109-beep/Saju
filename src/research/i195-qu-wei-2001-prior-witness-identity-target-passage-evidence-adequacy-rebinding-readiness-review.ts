import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I194QuWei2001PriorWitnessIdentityTargetPassageAcquisitionEvidenceReport } from './i194-qu-wei-2001-prior-witness-identity-target-passage-acquisition-evidence.js';

export const I195_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_EVIDENCE_ADEQUACY_REBINDING_READINESS_REVIEW_VERSION =
  'myeonghwa-qu-wei-2001-prior-witness-identity-target-passage-evidence-adequacy-rebinding-readiness-review-v1';

export const I195_REMAINING_GAP_IDS = Object.freeze([
  'QU_WEI_2001_PUBLICATION_MEDIUM_OR_ENTITY_IDENTITY_GAP',
  'QU_WEI_2001_CANONICAL_WITNESS_NORMALIZATION_GAP',
  'QU_WEI_2001_EXACT_TARGET_PASSAGE_BINDING_GAP',
] as const);

export type I195RemainingGapId = (typeof I195_REMAINING_GAP_IDS)[number];

export const I195_REASSESSMENT_REQUIREMENT_IDS = Object.freeze([
  'EXACT_I194_EVIDENCE_BOUNDARY_REQUIRED',
  'DIRECT_2001_TARGET_SCOPE_DOCTRINAL_EVIDENCE_MUST_BE_PRESERVED_AS_ADEQUATE',
  'DOCTRINE_LEVEL_ANTECEDENT_MUST_NOT_BE_COLLAPSED_INTO_EXACT_PASSAGE_IDENTITY',
  'PUBLICATION_IDENTITY_GAP_MUST_REMAIN_OPEN_WITHOUT_INVENTED_METADATA',
  'CANONICAL_WITNESS_NORMALIZATION_GAP_MUST_REMAIN_OPEN_WHILE_VARIANTS_ARE_UNNORMALIZED',
  'EXACT_TARGET_PASSAGE_BINDING_GAP_MUST_REMAIN_OPEN_WITHOUT_VERBATIM_OR_NEAR_VERBATIM_BINDING',
  'SEARCH_SILENCE_MUST_NOT_BECOME_NEGATIVE_EVIDENCE',
  'ALL_THREE_REMAINING_GAPS_REQUIRED_BEFORE_REBINDING_READINESS',
  'SAME_AUTHOR_2001_TO_2003_DEPENDENCY_MUST_REMAIN_BOUND',
  'THREE_EXTERNAL_TARGET_LINEAGE_QUESTIONS_MUST_REMAIN_UNRESOLVED',
  'I132_INDEPENDENT_PROVENANCE_POLICY_MUST_REMAIN_UNCHANGED',
  'NO_SELECTION_REGISTRATION_MUTATION_REEVALUATION_COMPOSITION_THRESHOLD_SCORING_OR_PRODUCTION_AUTHORITY',
] as const);

export type I195ReassessmentRequirementId = (typeof I195_REASSESSMENT_REQUIREMENT_IDS)[number];

export interface I195QuWei2001PriorWitnessIdentityTargetPassageEvidenceAdequacyRebindingReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_EVIDENCE_ADEQUACY_REBINDING_READINESS_REVIEW'
    | 'I194_EVIDENCE_BOUNDARY_INVALID';
  decision:
    | 'I194_EVIDENCE_ADEQUATE_TO_ESTABLISH_DIRECT_2001_DOCTRINAL_ANTECEDENT_BUT_REBINDING_NOT_READY_THREE_GAPS_PUBLICATION_IDENTITY_CANONICAL_WITNESS_NORMALIZATION_AND_EXACT_TARGET_PASSAGE_BINDING_REMAIN_TARGETED_THREE_GAP_DISCOVERY_READINESS_MAY_PROCEED_NO_INDEPENDENCE_NO_POLICY_RELAXATION'
    | 'QU_WEI_2001_EVIDENCE_ADEQUACY_REBINDING_READINESS_NOT_ESTABLISHED';
  upstreamI194EvidenceRecordSetId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI194BoundaryAccepted: boolean;
  i194EvidenceAdequateForReassessment: boolean;
  i194Direct2001TargetScopeDoctrineAccepted: boolean;
  i194DoctrineLevelAntecedentAccepted: boolean;
  i194ExactVerbatimBindingAccepted: false;
  i194NearVerbatimBindingAccepted: false;
  directDoctrinalAntecedentEvidenceAdequate: boolean;
  directDoctrinalAntecedentMayBeDiscardedBecauseIdentityGapsRemain: false;
  doctrineLevelAntecedentEqualsExactTargetPassageIdentity: false;
  publicationMediumOrEntityIdentityComplete: false;
  canonicalWitnessNormalizationComplete: false;
  exactOrNearVerbatimTargetPassageBindingComplete: false;
  remainingGapIds: readonly I195RemainingGapId[];
  remainingGapCount: 3 | 0;
  allThreeGapsRemainOpen: boolean;
  publicationGapStatus: 'UNRESOLVED' | 'NOT_ASSESSED';
  canonicalWitnessNormalizationGapStatus: 'UNRESOLVED' | 'NOT_ASSESSED';
  exactTargetPassageBindingGapStatus: 'UNRESOLVED' | 'NOT_ASSESSED';
  searchSilenceCreatesNegativeFinding: false;
  exactPhraseNotFoundProvesPhraseAbsentFrom2001: false;
  secondaryCatalogStatusMayBackfillPublicationIdentity: false;
  unverifiedAggregatorIsbnMayBackfillPublicationIdentity: false;
  representationPageCountVarianceCreatesDistinctAuthority: false;
  allThreeRemainingGapsRequiredBeforeRebindingReadiness: boolean;
  oneGapResolutionAloneSufficientForRebinding: false;
  evidenceRebindingMethodologicallyReady: false;
  evidenceRebindingAuthorizedByThisGate: false;
  evidenceRebindingExecutedByThisGate: false;
  targetedThreeGapDiscoveryReadinessMethodologicallyJustified: boolean;
  targetedThreeGapDiscoveryReadinessReviewAuthorized: boolean;
  targetedThreeGapDiscoveryExecutedByThisGate: false;
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
  reassessmentRequirementIds: readonly I195ReassessmentRequirementId[];
  reassessmentRequirementCount: 12;
  reassessmentRequirementsFrozen: boolean;
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
  targetedDiscoveryExhaustionEstablished: false;
  corpusExhaustionEstablished: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_THREE_GAP_TARGETED_DISCOVERY_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_EVIDENCE_ADEQUACY_REBINDING_READINESS_REVIEW';
  notes: readonly string[];
}

function exactI194Accepted(
  i194: I194QuWei2001PriorWitnessIdentityTargetPassageAcquisitionEvidenceReport,
): boolean {
  return (
    i194.status === 'RESOLVED_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_ACQUISITION_EVIDENCE' &&
    i194.decision ===
      'QU_WEI_2001_BOUNDED_ACQUISITION_EXECUTED_FOUR_FUNCTIONS_SATISFIED_ONE_PARTIAL_THREE_UNRESOLVED_DOCTRINE_LEVEL_ANTECEDENT_ESTABLISHED_VERBATIM_BINDING_PUBLICATION_IDENTITY_AND_VARIANT_NORMALIZATION_UNRESOLVED_NO_REBINDING_NO_INDEPENDENCE' &&
    i194.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i194.policyVersion === 'v1-definition' &&
    i194.adoptionVersion === 'v1-adoption' &&
    i194.currentCandidateSetVersion === 'v1-candidate-set' &&
    i194.currentInputPackageVersion === 'v2-input-package' &&
    i194.exactI193BoundaryAccepted &&
    i194.targetPriorWitnessId === 'QU_WEI_SIZHU_XIANGZHEN_2001' &&
    i194.acquisitionPathCountExecuted === 4 &&
    i194.allFourFrozenAcquisitionPathsExecuted &&
    i194.evidenceRecordCount === 8 &&
    i194.satisfiedFunctionCount === 4 &&
    i194.partiallySatisfiedFunctionCount === 1 &&
    i194.unresolvedFunctionCount === 3 &&
    i194.authorTitleAnd2001AppearanceBasisEstablished &&
    i194.formal2001PublisherEstablished === false &&
    i194.formal2001IsbnEstablished === false &&
    i194.explicit2001NonformalPublicationStatusEstablished === false &&
    i194.publicationMediumOrEntityIdentityEstablished === false &&
    i194.secondaryCatalogInternalMaterialLabelTreatedAsAuthoritativePublicationStatus === false &&
    i194.unverifiedAggregatorIsbnUsedAsAuthority === false &&
    i194.reproducibleDigitalContentWitnessEstablished &&
    i194.reproducibleWitnessBoundToSingleOriginal2001EditionOrPrinting === false &&
    i194.multipleRepresentationVariantsObserved &&
    i194.editionPrintingOrRepresentationNormalizationEstablished === false &&
    i194.direct2001TargetScopeContentWitnessEstablished &&
    i194.direct2001TightVsGapStemForceDifferentiationObserved &&
    i194.direct2001GapStemForceReductionObserved &&
    i194.direct2001DistanceAndObstructionForceSemanticsObserved &&
    i194.targetPassageComparisonExecuted &&
    i194.targetPassageMatchType === 'DOCTRINE_LEVEL_ANTECEDENT_WITH_NO_VERBATIM_BINDING_ESTABLISHED' &&
    i194.doctrineLevelAntecedentEstablished &&
    i194.exact2003TargetPassageVerbatimIn2001Established === false &&
    i194.nearVerbatim2001To2003BindingEstablished === false &&
    i194.searchFailureToFindExactPhraseCreatesNegativeFinding === false &&
    i194.duplicateVariantNormalizationEstablished === false &&
    i194.pageCountFileSizeOrFilenameVarianceCreatesDistinctAuthority === false &&
    i194.derivativeDigitalCopiesCountAsIndependentAuthorities === false &&
    i194.sameAuthor2001To2003DoctrinalDependencyPreserved &&
    i194.externalTargetLineageUnresolvedQuestionCountPreserved === 3 &&
    i194.identityAndTargetPassageEvidenceCompleteForRebinding === false &&
    i194.evidenceRebindingMethodologicallyReadyByThisGate === false &&
    i194.evidenceRebindingAuthorizedByThisGate === false &&
    i194.evidenceRebindingExecutedByThisGate === false &&
    i194.provenanceIndependenceAdjudicatedByThisGate === false &&
    i194.independentNormativeProvenanceEstablishedCount === 0 &&
    i194.explicitDerivativeRelationshipCheckRequired &&
    i194.derivativeRetransmissionCountsAsIndependentAuthority === false &&
    i194.unresolvedLineageDefaultDisposition === 'REJECT_INDEPENDENCE_CLAIM' &&
    i194.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate === false &&
    i194.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i194.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i194.sourceClassAloneSufficient === false &&
    i194.sourceCountMayBecomeNumericWeight === false &&
    i194.provenanceTierMayBecomeNumericWeight === false &&
    i194.searchSilenceCreatesNegativeFinding === false &&
    i194.currentV2PackageAndCandidateSetRemainImmutable &&
    i194.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i194.candidateSetReevaluationAuthorizedByThisGate === false &&
    i194.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i194.liSameTargetPathSuspendedNotRetired &&
    i194.liSameTargetMayReopenOnMateriallyNewDirectLead &&
    i194.liPublicationMediumOrEntityGapStillOpen &&
    i194.liCanonicalDigitalWitnessNormalizationGapStillOpen &&
    i194.targetedDiscoveryExhaustionEstablished === false &&
    i194.corpusExhaustionEstablished === false &&
    i194.productionPolicyExecutionAuthorized === false &&
    i194.actualCompositionPerformedByThisGate === false &&
    i194.multiSourceCompositionAuthorized === false &&
    i194.authorityAcquiredByThisGate === false &&
    i194.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i194.thresholdRuleCreatedByThisGate === false &&
    i194.damageEvaluationAuthorized === false &&
    i194.classificationAuthorized === false &&
    i194.numericScoringAuthorized === false &&
    i194.hiddenStemInteractionEligibilityGapRemains &&
    i194.hiddenStemAuthorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i194.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_EVIDENCE_ADEQUACY_REBINDING_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<I195QuWei2001PriorWitnessIdentityTargetPassageEvidenceAdequacyRebindingReadinessReviewReport, 'reviewId'>,
): I195QuWei2001PriorWitnessIdentityTargetPassageEvidenceAdequacyRebindingReadinessReviewReport {
  return {
    reviewId: `i195_qu_wei_2001_rebinding_reassessment_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI195QuWei2001PriorWitnessIdentityTargetPassageEvidenceAdequacyRebindingReadinessReview(
  i194: I194QuWei2001PriorWitnessIdentityTargetPassageAcquisitionEvidenceReport,
): I195QuWei2001PriorWitnessIdentityTargetPassageEvidenceAdequacyRebindingReadinessReviewReport {
  const accepted = exactI194Accepted(i194);

  return finalized({
    reviewVersion: I195_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_EVIDENCE_ADEQUACY_REBINDING_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_EVIDENCE_ADEQUACY_REBINDING_READINESS_REVIEW'
      : 'I194_EVIDENCE_BOUNDARY_INVALID',
    decision: accepted
      ? 'I194_EVIDENCE_ADEQUATE_TO_ESTABLISH_DIRECT_2001_DOCTRINAL_ANTECEDENT_BUT_REBINDING_NOT_READY_THREE_GAPS_PUBLICATION_IDENTITY_CANONICAL_WITNESS_NORMALIZATION_AND_EXACT_TARGET_PASSAGE_BINDING_REMAIN_TARGETED_THREE_GAP_DISCOVERY_READINESS_MAY_PROCEED_NO_INDEPENDENCE_NO_POLICY_RELAXATION'
      : 'QU_WEI_2001_EVIDENCE_ADEQUACY_REBINDING_READINESS_NOT_ESTABLISHED',
    upstreamI194EvidenceRecordSetId: i194.evidenceRecordSetId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI194BoundaryAccepted: accepted,
    i194EvidenceAdequateForReassessment: accepted,
    i194Direct2001TargetScopeDoctrineAccepted: accepted,
    i194DoctrineLevelAntecedentAccepted: accepted,
    i194ExactVerbatimBindingAccepted: false,
    i194NearVerbatimBindingAccepted: false,
    directDoctrinalAntecedentEvidenceAdequate: accepted,
    directDoctrinalAntecedentMayBeDiscardedBecauseIdentityGapsRemain: false,
    doctrineLevelAntecedentEqualsExactTargetPassageIdentity: false,
    publicationMediumOrEntityIdentityComplete: false,
    canonicalWitnessNormalizationComplete: false,
    exactOrNearVerbatimTargetPassageBindingComplete: false,
    remainingGapIds: accepted ? I195_REMAINING_GAP_IDS : Object.freeze([]),
    remainingGapCount: accepted ? 3 : 0,
    allThreeGapsRemainOpen: accepted,
    publicationGapStatus: accepted ? 'UNRESOLVED' : 'NOT_ASSESSED',
    canonicalWitnessNormalizationGapStatus: accepted ? 'UNRESOLVED' : 'NOT_ASSESSED',
    exactTargetPassageBindingGapStatus: accepted ? 'UNRESOLVED' : 'NOT_ASSESSED',
    searchSilenceCreatesNegativeFinding: false,
    exactPhraseNotFoundProvesPhraseAbsentFrom2001: false,
    secondaryCatalogStatusMayBackfillPublicationIdentity: false,
    unverifiedAggregatorIsbnMayBackfillPublicationIdentity: false,
    representationPageCountVarianceCreatesDistinctAuthority: false,
    allThreeRemainingGapsRequiredBeforeRebindingReadiness: accepted,
    oneGapResolutionAloneSufficientForRebinding: false,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    targetedThreeGapDiscoveryReadinessMethodologicallyJustified: accepted,
    targetedThreeGapDiscoveryReadinessReviewAuthorized: accepted,
    targetedThreeGapDiscoveryExecutedByThisGate: false,
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
    reassessmentRequirementIds: I195_REASSESSMENT_REQUIREMENT_IDS,
    reassessmentRequirementCount: 12,
    reassessmentRequirementsFrozen: accepted,
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
    targetedDiscoveryExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_THREE_GAP_TARGETED_DISCOVERY_READINESS_REVIEW'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_EVIDENCE_ADEQUACY_REBINDING_READINESS_REVIEW',
    notes: Object.freeze([
      'I194 is adequate to preserve a direct 2001 target-scope doctrinal antecedent; this positive finding is not discarded merely because identity gaps remain.',
      'Rebinding remains fail-closed because publication identity, canonical witness normalization, and exact target-passage binding are separate unresolved requirements.',
      'Absence of an exact phrase in bounded search is not evidence that the phrase is absent from all 2001 witnesses.',
      'A dedicated three-gap targeted discovery readiness review may proceed without mutating the frozen v2 candidate set or relaxing I132.',
    ]),
  });
}
