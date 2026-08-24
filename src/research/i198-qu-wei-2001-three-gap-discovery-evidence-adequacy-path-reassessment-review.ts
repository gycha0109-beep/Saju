import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I197QuWei2001ThreeGapTargetedDiscoveryEvidenceReport } from './i197-qu-wei-2001-three-gap-targeted-discovery-evidence.js';

export const I198_QU_WEI_2001_THREE_GAP_DISCOVERY_EVIDENCE_ADEQUACY_PATH_REASSESSMENT_REVIEW_VERSION =
  'myeonghwa-qu-wei-2001-three-gap-discovery-evidence-adequacy-path-reassessment-review-v1';

export const I198_REASSESSMENT_REQUIREMENT_IDS = Object.freeze([
  'EXACT_I197_THREE_UNRESOLVED_GAP_EVIDENCE_BOUNDARY_REQUIRED',
  'I197_EVIDENCE_MAY_BE_ADEQUATE_FOR_UNRESOLVED_FINDINGS_WITHOUT_RESOLVING_GAPS',
  'PRINT_PRODUCTION_CONTEXT_MUST_NOT_BACKFILL_2001_ISSUER_OR_COLOPHON_IDENTITY',
  'REPRESENTATION_VARIANCE_MUST_NOT_BACKFILL_CANONICAL_WITNESS_NORMALIZATION',
  'DOCTRINE_LEVEL_ANTECEDENT_MUST_NOT_BACKFILL_EXACT_TARGET_PASSAGE_IDENTITY',
  'NON_ACQUISITION_SEARCH_SILENCE_OR_CHANNEL_FAILURE_MUST_NOT_BECOME_NEGATIVE_OR_EXHAUSTION_EVIDENCE',
  'ALL_THREE_GAPS_MUST_REMAIN_REQUIRED_BEFORE_REBINDING_READINESS',
  'EQUIVALENT_NINE_CHANNEL_REPEAT_REQUIRES_MATERIALLY_NEW_DIRECT_LEAD_OR_EVIDENCE_CLASS',
  'SAME_AUTHOR_2001_TO_2003_DEPENDENCY_AND_EXTERNAL_LINEAGE_GAPS_MUST_REMAIN_BOUND',
  'I132_INDEPENDENCE_AND_DERIVATIVE_CONTROLS_MUST_REMAIN_UNCHANGED',
  'NO_REBINDING_SELECTION_REGISTRATION_MUTATION_REEVALUATION_OR_PROVENANCE_ADJUDICATION',
  'NO_COMPOSITION_THRESHOLD_DAMAGE_CLASSIFICATION_SCORING_OR_PRODUCTION_AUTHORITY',
] as const);

export type I198ReassessmentRequirementId = (typeof I198_REASSESSMENT_REQUIREMENT_IDS)[number];

export const I198_REVIEWABLE_PATH_IDS = Object.freeze([
  'DIRECT_2001_TITLE_COPYRIGHT_IMPRINT_COLOPHON_OR_ISSUER_BINDING_ACQUISITION',
  'EXPLICIT_2001_LIBRARY_ARCHIVE_OR_PRIMARY_BIBLIOGRAPHIC_RECORD_ACQUISITION',
  'DIRECT_CROSS_REPRESENTATION_HASH_TRANSFORMATION_PROVENANCE_AND_STRUCTURE_NORMALIZATION',
  'DIRECT_ALTERNATE_2001_TARGET_SECTION_AND_2001_2003_SEQUENCE_COMPARISON',
] as const);

export type I198ReviewablePathId = (typeof I198_REVIEWABLE_PATH_IDS)[number];

export interface I198QuWei2001ThreeGapDiscoveryEvidenceAdequacyPathReassessmentReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_QU_WEI_2001_THREE_GAP_DISCOVERY_EVIDENCE_ADEQUACY_PATH_REASSESSMENT_REVIEW'
    | 'I197_THREE_GAP_DISCOVERY_EVIDENCE_BOUNDARY_INVALID';
  decision:
    | 'I197_EVIDENCE_ADEQUATE_FOR_THREE_UNRESOLVED_FINDINGS_REBINDING_NOT_READY_NO_EXHAUSTION_EQUIVALENT_REPEAT_NOT_JUSTIFIED_GENUINELY_NEW_DIRECT_EVIDENCE_ACQUISITION_READINESS_MAY_PROCEED_NO_INDEPENDENCE_NO_POLICY_RELAXATION'
    | 'QU_WEI_2001_THREE_GAP_EVIDENCE_ADEQUACY_PATH_REASSESSMENT_NOT_READY';
  upstreamI197EvidenceRecordSetId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI197BoundaryAccepted: boolean;
  assessedGapCount: 3 | 0;
  unresolvedFindingCount: 3 | 0;
  explicitNegativeFindingCount: 0;
  evidenceAdequateForRecordedUnresolvedFindings: boolean;
  printProductionContextAcceptedAsHistoricalContext: boolean;
  publicationMediumOrEntityGapResolved: false;
  canonicalWitnessNormalizationGapResolved: false;
  exactTargetPassageBindingGapResolved: false;
  completePriorWitnessIdentityAndPassageAdequacyEstablished: false;
  directDoctrinalAntecedentEvidencePreserved: boolean;
  doctrineLevelAntecedentEqualsExactTargetPassageIdentity: false;
  evidenceRebindingMethodologicallyReady: false;
  evidenceRebindingAuthorizedByThisGate: false;
  evidenceRebindingExecutedByThisGate: false;
  targetedDiscoveryExhaustionEstablished: false;
  corpusExhaustionEstablished: false;
  universalNoFurtherEvidenceClaimEstablished: false;
  identicalNineChannelSurfaceRepeatCountsAsRemediationProgress: false;
  immediateEquivalentNineChannelRepeatJustified: false;
  materiallyNewDirectLeadOrEvidenceClassRequiredBeforeEquivalentRepeat: boolean;
  direct2001TitleColophonIssuerBindingStillReviewable: boolean;
  explicit2001PrimaryBibliographicBindingStillReviewable: boolean;
  directCrossRepresentationNormalizationStillReviewable: boolean;
  directAlternate2001TargetPassageComparisonStillReviewable: boolean;
  reviewablePathIds: readonly I198ReviewablePathId[];
  reviewablePathCount: 4 | 0;
  reviewablePathSelectedByThisGate: false;
  materiallyNewDirectEvidenceAcquisitionReadinessReviewMethodologicallyJustified: boolean;
  materiallyNewDirectEvidenceAcquisitionReadinessReviewAuthorized: boolean;
  acquisitionExecutedByThisGate: false;
  qualifyingEvidenceAcquiredByThisGate: false;
  printProductionContextMayResolvePublicationIdentity: false;
  laterPublishedWorkClassificationMayBackfill2001Identity: false;
  secondaryCatalogMayResolvePublicationIdentity: false;
  pageCountFileSizeFilenameVarianceMayResolveNormalization: false;
  doctrineLevelSimilarityMayResolveExactPassageBinding: false;
  searchSilenceCreatesNegativeFinding: false;
  channelAccessFailureCreatesNegativeFinding: false;
  failureToLocateExactPhraseCreatesNegativeFinding: false;
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
  reassessmentRequirementIds: readonly I198ReassessmentRequirementId[];
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_GENUINELY_NEW_DIRECT_EVIDENCE_ACQUISITION_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_THREE_GAP_DISCOVERY_EVIDENCE_ADEQUACY_AND_PATH_REASSESSMENT_REVIEW';
  notes: readonly string[];
}

function exactI197Accepted(i197: I197QuWei2001ThreeGapTargetedDiscoveryEvidenceReport): boolean {
  return (
    i197.status === 'RESOLVED_QU_WEI_2001_THREE_GAP_TARGETED_DISCOVERY_EVIDENCE' &&
    i197.decision ===
      'QU_WEI_2001_THREE_GAP_TARGETED_DISCOVERY_EXECUTED_NINE_CHANNELS_ZERO_GAPS_RESOLVED_THREE_REMAIN_UNRESOLVED_PRINT_PRODUCTION_CONTEXT_STRENGTHENED_VARIANT_PROVENANCE_AND_EXACT_PASSAGE_BINDING_UNRESOLVED_NO_REBINDING_NO_INDEPENDENCE' &&
    i197.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i197.policyVersion === 'v1-definition' &&
    i197.adoptionVersion === 'v1-adoption' &&
    i197.currentCandidateSetVersion === 'v1-candidate-set' &&
    i197.currentInputPackageVersion === 'v2-input-package' &&
    i197.exactI196BoundaryAccepted &&
    i197.discoveryChannelCountExecuted === 9 &&
    i197.allNineFrozenChannelsExecuted &&
    i197.gapEvidenceRecordCount === 3 &&
    i197.gapEvidenceRecords.length === 3 &&
    i197.gapEvidenceRecords[0]?.gapId === 'QU_WEI_2001_PUBLICATION_MEDIUM_OR_ENTITY_IDENTITY_GAP' &&
    i197.gapEvidenceRecords[0]?.finding === 'UNRESOLVED_AFTER_BOUNDED_TARGETED_DISCOVERY' &&
    i197.gapEvidenceRecords[0]?.qualifyingResolutionEvidenceAcquired === false &&
    i197.gapEvidenceRecords[1]?.gapId === 'QU_WEI_2001_CANONICAL_WITNESS_NORMALIZATION_GAP' &&
    i197.gapEvidenceRecords[1]?.finding === 'UNRESOLVED_AFTER_BOUNDED_TARGETED_DISCOVERY' &&
    i197.gapEvidenceRecords[1]?.qualifyingResolutionEvidenceAcquired === false &&
    i197.gapEvidenceRecords[2]?.gapId === 'QU_WEI_2001_EXACT_TARGET_PASSAGE_BINDING_GAP' &&
    i197.gapEvidenceRecords[2]?.finding === 'UNRESOLVED_AFTER_BOUNDED_TARGETED_DISCOVERY' &&
    i197.gapEvidenceRecords[2]?.qualifyingResolutionEvidenceAcquired === false &&
    i197.resolvedGapCount === 0 &&
    i197.unresolvedGapCount === 3 &&
    i197.explicitNegativeFindingCount === 0 &&
    i197.publicationGapFinding === 'UNRESOLVED_AFTER_BOUNDED_TARGETED_DISCOVERY' &&
    i197.contemporaryPrintProductionContextObserved &&
    i197.sharedFrontMatterStatesTypesettingAndPrintingUnderway &&
    i197.sharedFrontMatterUsesPublicationOccasionLanguage &&
    i197.sharedFrontMatterStatesPrintingNotYetComplete &&
    i197.printProductionContextStrengthened &&
    i197.printProductionContextQualifiesAs2001SpecificIssuerBinding === false &&
    i197.printProductionContextQualifiesAsDirect2001ColophonBinding === false &&
    i197.formal2001PublisherEstablished === false &&
    i197.formal2001IsbnEstablished === false &&
    i197.explicit2001IssuingEntityEstablished === false &&
    i197.explicit2001NonformalPublicationStatusEstablished === false &&
    i197.publicationGapResolved === false &&
    i197.normalizationGapFinding === 'UNRESOLVED_AFTER_BOUNDED_TARGETED_DISCOVERY' &&
    i197.directDigitalRepresentationsObserved &&
    i197.observedRepresentationDescriptors.length === 4 &&
    i197.representationPageCountVarianceObserved &&
    i197.representationFileSizeVarianceObserved &&
    i197.stableCrossRepresentationFileHashFamilyEstablished === false &&
    i197.scanTransformationProvenanceEstablished === false &&
    i197.titleImprintTocPaginationComparisonComplete === false &&
    i197.canonicalWitnessFamilyEstablished === false &&
    i197.representationVarianceCreatesDistinctAuthority === false &&
    i197.normalizationGapResolved === false &&
    i197.exactPassageGapFinding === 'UNRESOLVED_AFTER_BOUNDED_TARGETED_DISCOVERY' &&
    i197.direct2001TargetScopeTextReinspected &&
    i197.direct2001PositionSensitiveForceDoctrineReconfirmed &&
    i197.direct2001TightVsGapForceDoctrineReconfirmed &&
    i197.direct2001SeparatedClashNoForceLanguageObserved &&
    i197.alternate2001RepresentationCrossCheckAttempted &&
    i197.exact2003RoutePhraseLocatedIn2001 === false &&
    i197.nearVerbatim2003RouteSequenceLocatedIn2001 === false &&
    i197.doctrineLevelAntecedentStillEstablished &&
    i197.doctrineLevelAntecedentMayResolveExactPassageGap === false &&
    i197.failureToLocateExactPhraseCreatesNegativeFinding === false &&
    i197.exactPassageGapResolved === false &&
    i197.allThreeGapsRequiredBeforeRebindingReadiness &&
    i197.evidenceRebindingMethodologicallyReadyByThisGate === false &&
    i197.evidenceRebindingAuthorizedByThisGate === false &&
    i197.evidenceRebindingExecutedByThisGate === false &&
    i197.sameAuthor2001To2003DoctrinalDependencyPreserved &&
    i197.externalTargetLineageUnresolvedQuestionCountPreserved === 3 &&
    i197.provenanceIndependenceAdjudicatedByThisGate === false &&
    i197.independentNormativeProvenanceEstablishedCount === 0 &&
    i197.explicitDerivativeRelationshipCheckRequired &&
    i197.derivativeRetransmissionCountsAsIndependentAuthority === false &&
    i197.unresolvedLineageDefaultDisposition === 'REJECT_INDEPENDENCE_CLAIM' &&
    i197.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate === false &&
    i197.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i197.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i197.sourceClassAloneSufficient === false &&
    i197.sourceCountMayBecomeNumericWeight === false &&
    i197.provenanceTierMayBecomeNumericWeight === false &&
    i197.searchSilenceCreatesNegativeFinding === false &&
    i197.channelAccessFailureCreatesNegativeFinding === false &&
    i197.currentV2PackageAndCandidateSetRemainImmutable &&
    i197.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i197.candidateSelectedByThisGate === false &&
    i197.candidateRegistrationAuthorizedByThisGate === false &&
    i197.candidateSetMutatedByThisGate === false &&
    i197.candidateSetReevaluationAuthorizedByThisGate === false &&
    i197.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i197.liSameTargetPathSuspendedNotRetired &&
    i197.liSameTargetMayReopenOnMateriallyNewDirectLead &&
    i197.liPublicationMediumOrEntityGapStillOpen &&
    i197.liCanonicalDigitalWitnessNormalizationGapStillOpen &&
    i197.targetedDiscoveryExhaustionEstablished === false &&
    i197.corpusExhaustionEstablished === false &&
    i197.productionPolicyExecutionAuthorized === false &&
    i197.actualCompositionPerformedByThisGate === false &&
    i197.multiSourceCompositionAuthorized === false &&
    i197.authorityAcquiredByThisGate === false &&
    i197.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i197.thresholdRuleCreatedByThisGate === false &&
    i197.damageEvaluationAuthorized === false &&
    i197.classificationAuthorized === false &&
    i197.numericScoringAuthorized === false &&
    i197.hiddenStemInteractionEligibilityGapRemains &&
    i197.hiddenStemAuthorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i197.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_THREE_GAP_DISCOVERY_EVIDENCE_ADEQUACY_AND_PATH_REASSESSMENT_REVIEW'
  );
}

function finalized(
  material: Omit<I198QuWei2001ThreeGapDiscoveryEvidenceAdequacyPathReassessmentReviewReport, 'reviewId'>,
): I198QuWei2001ThreeGapDiscoveryEvidenceAdequacyPathReassessmentReviewReport {
  return {
    reviewId: `i198_qu_wei_2001_three_gap_path_reassessment_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI198QuWei2001ThreeGapDiscoveryEvidenceAdequacyPathReassessmentReview(
  i197: I197QuWei2001ThreeGapTargetedDiscoveryEvidenceReport,
): I198QuWei2001ThreeGapDiscoveryEvidenceAdequacyPathReassessmentReviewReport {
  const accepted = exactI197Accepted(i197);

  return finalized({
    reviewVersion: I198_QU_WEI_2001_THREE_GAP_DISCOVERY_EVIDENCE_ADEQUACY_PATH_REASSESSMENT_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_QU_WEI_2001_THREE_GAP_DISCOVERY_EVIDENCE_ADEQUACY_PATH_REASSESSMENT_REVIEW'
      : 'I197_THREE_GAP_DISCOVERY_EVIDENCE_BOUNDARY_INVALID',
    decision: accepted
      ? 'I197_EVIDENCE_ADEQUATE_FOR_THREE_UNRESOLVED_FINDINGS_REBINDING_NOT_READY_NO_EXHAUSTION_EQUIVALENT_REPEAT_NOT_JUSTIFIED_GENUINELY_NEW_DIRECT_EVIDENCE_ACQUISITION_READINESS_MAY_PROCEED_NO_INDEPENDENCE_NO_POLICY_RELAXATION'
      : 'QU_WEI_2001_THREE_GAP_EVIDENCE_ADEQUACY_PATH_REASSESSMENT_NOT_READY',
    upstreamI197EvidenceRecordSetId: i197.evidenceRecordSetId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI197BoundaryAccepted: accepted,
    assessedGapCount: accepted ? 3 : 0,
    unresolvedFindingCount: accepted ? 3 : 0,
    explicitNegativeFindingCount: 0,
    evidenceAdequateForRecordedUnresolvedFindings: accepted,
    printProductionContextAcceptedAsHistoricalContext: accepted,
    publicationMediumOrEntityGapResolved: false,
    canonicalWitnessNormalizationGapResolved: false,
    exactTargetPassageBindingGapResolved: false,
    completePriorWitnessIdentityAndPassageAdequacyEstablished: false,
    directDoctrinalAntecedentEvidencePreserved: accepted,
    doctrineLevelAntecedentEqualsExactTargetPassageIdentity: false,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    targetedDiscoveryExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    universalNoFurtherEvidenceClaimEstablished: false,
    identicalNineChannelSurfaceRepeatCountsAsRemediationProgress: false,
    immediateEquivalentNineChannelRepeatJustified: false,
    materiallyNewDirectLeadOrEvidenceClassRequiredBeforeEquivalentRepeat: accepted,
    direct2001TitleColophonIssuerBindingStillReviewable: accepted,
    explicit2001PrimaryBibliographicBindingStillReviewable: accepted,
    directCrossRepresentationNormalizationStillReviewable: accepted,
    directAlternate2001TargetPassageComparisonStillReviewable: accepted,
    reviewablePathIds: accepted ? I198_REVIEWABLE_PATH_IDS : Object.freeze([]),
    reviewablePathCount: accepted ? 4 : 0,
    reviewablePathSelectedByThisGate: false,
    materiallyNewDirectEvidenceAcquisitionReadinessReviewMethodologicallyJustified: accepted,
    materiallyNewDirectEvidenceAcquisitionReadinessReviewAuthorized: accepted,
    acquisitionExecutedByThisGate: false,
    qualifyingEvidenceAcquiredByThisGate: false,
    printProductionContextMayResolvePublicationIdentity: false,
    laterPublishedWorkClassificationMayBackfill2001Identity: false,
    secondaryCatalogMayResolvePublicationIdentity: false,
    pageCountFileSizeFilenameVarianceMayResolveNormalization: false,
    doctrineLevelSimilarityMayResolveExactPassageBinding: false,
    searchSilenceCreatesNegativeFinding: false,
    channelAccessFailureCreatesNegativeFinding: false,
    failureToLocateExactPhraseCreatesNegativeFinding: false,
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
    reassessmentRequirementIds: I198_REASSESSMENT_REQUIREMENT_IDS,
    reassessmentRequirementCount: 12,
    reassessmentRequirementsFrozen: true,
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_GENUINELY_NEW_DIRECT_EVIDENCE_ACQUISITION_READINESS_REVIEW'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_THREE_GAP_DISCOVERY_EVIDENCE_ADEQUACY_AND_PATH_REASSESSMENT_REVIEW',
    notes: accepted
      ? Object.freeze([
          'I197 is adequate to establish three unresolved findings; adequacy for unresolved findings does not resolve any of the three underlying evidence obligations.',
          'The strengthened 2001 print-production context remains historical context only and cannot substitute for a 2001-specific issuer, colophon, or primary bibliographic binding.',
          'The observed representation variance remains non-normalized, and the direct 2001 doctrine-level antecedent remains preserved without being promoted into exact target-passage identity.',
          'Equivalent repetition of the same nine-channel surface is not remediation progress; a materially new direct lead or evidence class is required before an equivalent repeat, while four genuinely new direct-evidence paths remain reviewable.',
          'No exhaustion, rebinding, independence adjudication, candidate-set mutation or reevaluation, composition, threshold creation, classification, numeric scoring, or production authority is established by I198.',
        ])
      : Object.freeze(['I197 boundary mismatch prevents three-gap evidence adequacy and path reassessment.']),
  });
}
