import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I183Li1998QualifyingWitnessEscalatedAcquisitionEvidenceReport } from './i183-li-1998-qualifying-witness-escalated-acquisition-evidence.js';

export const I184_LI_1998_ESCALATED_EVIDENCE_ADEQUACY_REMAINING_PATH_REASSESSMENT_REVIEW_VERSION =
  'myeonghwa-li-1998-escalated-acquisition-evidence-adequacy-remaining-path-reassessment-review-v1';

export const I184_REASSESSMENT_REQUIREMENT_IDS = Object.freeze([
  'EXACT_I183_THREE_PATH_RELEVANT_OBSERVATIONS_ZERO_BINDING_ZERO_NORMALIZATION_BOUNDARY_REQUIRED',
  'I183_PATH_RELEVANT_OBSERVATIONS_MAY_COUNT_AS_PROGRESS_WITHOUT_GAP_RESOLUTION',
  'AUTHOR_REPORTED_2018_COPYRIGHT_REGISTRATION_CONTEXT_MUST_NOT_COUNT_AS_DIRECT_TARGET_REGISTRY_EVIDENCE',
  'DIRECT_TARGET_TITLE_REGISTRATION_CERTIFICATE_OR_REGISTRATION_NUMBER_REMAINS_AN_OPEN_QUALIFYING_PATH',
  'LATER_2002_FORMAL_EDITION_METADATA_AND_TOC_CONTINUITY_MUST_NOT_BACKFILL_1998_PUBLICATION_IDENTITY',
  '314_PHYSICAL_STYLE_LISTING_MUST_NOT_COUNT_AS_1998_SPECIFIC_PUBLICATION_BINDING',
  '202_314_413_422_REPRESENTATION_VARIANCE_MUST_NOT_CREATE_EDITION_OR_CANONICAL_AUTHORITY',
  'DIRECT_FULL_COMPARABLE_WITNESSES_AND_STABLE_FILE_PROVENANCE_REMAIN_REQUIRED_FOR_NORMALIZATION',
  'FAILED_REGISTRY_OR_DIRECT_WITNESS_ACCESS_MUST_NOT_CREATE_EXHAUSTION_OR_NEGATIVE_FINDINGS',
  'REPEATED_EQUIVALENT_AGGREGATOR_SURFACES_MUST_NOT_COUNT_AS_NEW_REMEDIATION_PROGRESS',
  'BOTH_IDENTITY_FUNCTIONS_MUST_BE_RESOLVED_BEFORE_REBINDING_READINESS',
  'NO_REBINDING_INDEPENDENCE_MUTATION_REEVALUATION_POLICY_RELAXATION_THRESHOLD_CLASSIFICATION_NUMERIC_OR_PRODUCTION_AUTHORITY',
] as const);

export type I184ReassessmentRequirementId = (typeof I184_REASSESSMENT_REQUIREMENT_IDS)[number];

export const I184_REMAINING_PATH_IDS = Object.freeze([
  'DIRECT_TARGET_TITLE_COPYRIGHT_REGISTRY_CERTIFICATE_OR_REGISTRATION_NUMBER',
  'DIRECT_1998_PRIMARY_COLOPHON_IMPRINT_OR_DISTRIBUTION_RECORD',
  'DIRECT_FULL_314_OR_413_WITNESS_ACQUISITION',
  'DIRECT_FULL_202_OR_422_REFERENCE_WITNESS_FOR_STRUCTURAL_COMPARISON',
  'STABLE_FILE_HASH_OR_TRANSFORMATION_PROVENANCE_FOR_COMPARABLE_VARIANTS',
] as const);

export type I184RemainingPathId = (typeof I184_REMAINING_PATH_IDS)[number];

export interface I184Li1998EscalatedEvidenceAdequacyRemainingPathReassessmentReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_LI_1998_ESCALATED_EVIDENCE_ADEQUACY_REMAINING_PATH_REASSESSMENT_REVIEW'
    | 'I183_ESCALATED_EVIDENCE_BOUNDARY_INVALID';
  decision:
    | 'I183_ESCALATED_ACQUISITION_EVIDENCE_ADEQUATE_TO_RECORD_PATH_LEVEL_PROGRESS_ZERO_1998_BINDING_ZERO_VARIANT_NORMALIZATION_TWO_GAPS_REMAIN_UNRESOLVED_REBINDING_NOT_READY_REMAINING_PRIMARY_AND_DIRECT_WITNESS_PATHS_MAY_CONTINUE_NO_INDEPENDENCE'
    | 'LI_1998_ESCALATED_EVIDENCE_ADEQUACY_REASSESSMENT_NOT_READY';
  upstreamI183EvidenceRecordSetId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI183BoundaryAccepted: boolean;
  escalatedAcquisitionExecutionAccepted: boolean;
  escalatedEvidenceRecordCount: 4 | 0;
  newPathRelevantObservationCount: 3 | 0;
  pathLevelProgressAdequate: boolean;
  publicationIdentityResolutionEvidenceAdequate: false;
  canonicalWitnessNormalizationEvidenceAdequate: false;
  qualifying1998PublicationIdentityBindingCount: 0;
  completeVariantNormalizationCount: 0;
  stableFileIdentityOrHashAcquiredCount: 0;
  publicationMediumOrEntityGapResolved: false;
  canonicalDigitalWitnessNormalizationGapResolved: false;
  authorReported2018RegistrationContextAcceptedAsPathEvidence: boolean;
  authorReported2018RegistrationCountsAsDirectRegistryEvidence: false;
  directTargetRegistryRecordStillRequired: boolean;
  later2002FormalEditionMetadataAcceptedAsLaterEditionContext: boolean;
  later2002FormalEditionMayBackfill1998PublicationIdentity: false;
  later2002TocContinuityMayResolve1998PublicationIdentity: false;
  physical314PageListingAcceptedAsRepresentationEvidence: boolean;
  physical314PageListingMayResolve1998PublicationIdentity: false;
  observedRepresentationPageCounts: readonly [202, 314, 413, 422] | readonly [];
  representationVarianceCreatesDistinctNormativeEdition: false;
  representationVarianceCreatesCanonicalWitness: false;
  directFullComparableWitnessesStillRequired: boolean;
  stableFileIdentityOrTransformationProvenanceStillRequired: boolean;
  remainingPathIds: readonly I184RemainingPathId[];
  remainingPathCount: 5 | 0;
  remainingPathsMethodologicallyOpen: boolean;
  furtherAcquisitionExecutionAuthorizedByThisGate: boolean;
  evidenceAcquiredByThisGate: false;
  directRegistryEvidenceAcquiredByThisGate: false;
  direct1998PublicationBindingAcquiredByThisGate: false;
  directComparableWitnessAcquiredByThisGate: false;
  stableFileIdentityAcquiredByThisGate: false;
  targetedDiscoveryExhaustionEstablished: false;
  corpusExhaustionEstablished: false;
  explicitNegativeFindingCount: 0;
  failedRegistryAccessCreatesNegativeFinding: false;
  failedWitnessAccessCreatesNegativeFinding: false;
  searchSilenceCreatesNegativeFinding: false;
  equivalentAggregatorSurfaceCountsAsNewProgress: false;
  bothIdentityFunctionsRequiredBeforeRebindingReadiness: boolean;
  oneIdentityFunctionResolutionSufficientForRebinding: false;
  evidenceRebindingMethodologicallyReady: false;
  evidenceRebindingAuthorizedByThisGate: false;
  evidenceRebindingSelectedByThisGate: false;
  evidenceRebindingExecutedByThisGate: false;
  reassessmentRequirementIds: readonly I184ReassessmentRequirementId[];
  reassessmentRequirementCount: 12;
  reassessmentRequirementsFrozen: boolean;
  current2004WitnessPresumedOriginRetired: boolean;
  prior1998SameAuthorWitnessConfirmed: boolean;
  prior1998WitnessIndependentProvenanceEstablished: false;
  sameAuthor1998To2004DerivativeChainMustRemainBound: boolean;
  externalLineageUnresolvedQuestionCount: 3 | 0;
  externalLineageUnresolvedStatusPreserved: boolean;
  provenanceIndependenceAdjudicatedByThisGate: false;
  independentNormativeProvenanceEstablishedCount: 0;
  I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  sourceCountVotingAllowed: false;
  provenanceTierWeightingAllowed: false;
  candidateSelectedByThisGate: false;
  remediationStrategySelectedByThisGate: false;
  remediationExecutionAuthorizedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  candidateRemovedByThisGate: false;
  candidateReplacedByThisGate: false;
  newCandidateSetVersionCreatedByThisGate: false;
  newInputPackageVersionCreatedByThisGate: false;
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE' | 'NOT_ASSESSED';
  candidateSetReevaluationAuthorizedByThisGate: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_ESCALATED_ACQUISITION_EVIDENCE_ADEQUACY_AND_REMAINING_PATH_REASSESSMENT_REVIEW';
  notes: readonly string[];
}

function exactI183Accepted(i183: I183Li1998QualifyingWitnessEscalatedAcquisitionEvidenceReport): boolean {
  return (
    i183.status === 'RESOLVED_LI_1998_QUALIFYING_WITNESS_ESCALATED_ACQUISITION_EVIDENCE' &&
    i183.decision ===
      'ESCALATED_QUALIFYING_PATH_ACQUISITION_EXECUTED_THREE_NEW_PATH_RELEVANT_OBSERVATIONS_ZERO_1998_SPECIFIC_PUBLICATION_BINDINGS_ZERO_DIRECT_COMPARABLE_NORMALIZATIONS_ZERO_STABLE_FILE_IDENTITIES_TWO_GAPS_REMAIN_UNRESOLVED_NO_REBINDING_NO_INDEPENDENCE' &&
    i183.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i183.policyVersion === 'v1-definition' &&
    i183.adoptionVersion === 'v1-adoption' &&
    i183.currentCandidateSetVersion === 'v1-candidate-set' &&
    i183.currentInputPackageVersion === 'v2-input-package' &&
    i183.exactI182BoundaryAccepted &&
    i183.escalatedAcquisitionExecuted &&
    i183.executedEscalationPathCount === 4 &&
    i183.escalatedEvidenceRecordCount === 4 &&
    i183.newPathRelevantObservationCount === 3 &&
    i183.qualifying1998PublicationIdentityBindingCount === 0 &&
    i183.direct1998InstitutionalBibliographicRecordAcquiredCount === 0 &&
    i183.direct1998CopyrightRegistrationCertificateAcquiredCount === 0 &&
    i183.direct1998ColophonOrImprintWitnessAcquiredCount === 0 &&
    i183.direct1998PublisherIssuerDistributorBindingCount === 0 &&
    i183.explicit1998NonformalDistributionBindingCount === 0 &&
    i183.authorReported2018CopyrightProtectionCenterRegistrationObserved &&
    i183.authorReportedRegistrationCoversWorksSince1997 &&
    i183.authorReportedRegistrationIncludesTargetWorkFamily &&
    i183.authorReportedRegistrationIsDirectRegistryRecord === false &&
    i183.authorReportedRegistrationEstablishes1998PublicationMedium === false &&
    i183.later2002FormalEditionObserved &&
    i183.later2002FormalEditionIsbn === '9789627943679' &&
    i183.later2002FormalEditionPageCount === 422 &&
    i183.later2002FormalEditionTocObserved &&
    i183.later2002FormalEditionContainsTargetChapterStructure &&
    i183.later2002FormalEditionMayBackfill1998PublicationIdentity === false &&
    i183.physical314PageListingObserved &&
    i183.physical314PageListingFormat === '32开' &&
    i183.physical314PageListingBoundSpecificallyTo1998 === false &&
    i183.observedRepresentationPageCountCount === 4 &&
    i183.observedRepresentationPageCounts.length === 4 &&
    i183.observedRepresentationPageCounts[0] === 202 &&
    i183.observedRepresentationPageCounts[1] === 314 &&
    i183.observedRepresentationPageCounts[2] === 413 &&
    i183.observedRepresentationPageCounts[3] === 422 &&
    i183.directComparableFullWitnessSetAcquired === false &&
    i183.crossVariantTitleImprintCopyrightComparisonCompleted === false &&
    i183.crossVariantTocPaginationTargetPassageStructureComparisonCompleted === false &&
    i183.crossVariantAdditionDeletionReorderingComparisonCompleted === false &&
    i183.canonicalDigitalWitnessEstablished === false &&
    i183.normalizedWitnessFamilyEstablished === false &&
    i183.completeVariantNormalizationCount === 0 &&
    i183.stableFileIdentityOrHashAcquiredCount === 0 &&
    i183.pageCountDifferenceAloneCreatesDistinctEdition === false &&
    i183.physicalFormatListingAloneCreates1998Binding === false &&
    i183.laterFormalEditionTocContinuityCreates1998Binding === false &&
    i183.publicationMediumOrEntityGapResolved === false &&
    i183.canonicalDigitalWitnessNormalizationGapResolved === false &&
    i183.bothIdentityFunctionsRequiredBeforeRebindingReadiness &&
    i183.onePathSuccessSufficientForRebinding === false &&
    i183.evidenceRebindingMethodologicallyReady === false &&
    i183.evidenceRebindingAuthorizedByThisGate === false &&
    i183.evidenceRebindingSelectedByThisGate === false &&
    i183.evidenceRebindingExecutedByThisGate === false &&
    i183.targetedDiscoveryExhaustionEstablished === false &&
    i183.corpusExhaustionEstablished === false &&
    i183.explicitNegativeFindingCount === 0 &&
    i183.searchSilenceCreatesNegativeFinding === false &&
    i183.failedRegistrySearchCreatesNegativeFinding === false &&
    i183.failedDirectWitnessAccessCreatesNegativeFinding === false &&
    i183.repetitiveGenericSearchAloneCountsAsProgress === false &&
    i183.current2004WitnessPresumedOriginRetired &&
    i183.prior1998SameAuthorWitnessConfirmed &&
    i183.prior1998WitnessIndependentProvenanceEstablished === false &&
    i183.sameAuthor1998To2004DerivativeChainMustRemainBound &&
    i183.externalLineageUnresolvedQuestionCount === 3 &&
    i183.externalLineageUnresolvedStatusPreserved &&
    i183.provenanceIndependenceAdjudicatedByThisGate === false &&
    i183.independentNormativeProvenanceEstablishedCount === 0 &&
    i183.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate === false &&
    i183.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i183.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i183.sourceCountVotingAllowed === false &&
    i183.provenanceTierWeightingAllowed === false &&
    i183.currentV2PackageAndCandidateSetRemainImmutable &&
    i183.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i183.candidateSetReevaluationAuthorizedByThisGate === false &&
    i183.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i183.productionPolicyExecutionAuthorized === false &&
    i183.actualCompositionPerformedByThisGate === false &&
    i183.multiSourceCompositionAuthorized === false &&
    i183.authorityAcquiredByThisGate === false &&
    i183.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i183.thresholdRuleCreatedByThisGate === false &&
    i183.damageEvaluationAuthorized === false &&
    i183.classificationAuthorized === false &&
    i183.numericScoringAuthorized === false &&
    i183.hiddenStemInteractionEligibilityGapRemains &&
    i183.hiddenStemAuthorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i183.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_ESCALATED_ACQUISITION_EVIDENCE_ADEQUACY_AND_REMAINING_PATH_REASSESSMENT_REVIEW'
  );
}

function finalized(
  material: Omit<I184Li1998EscalatedEvidenceAdequacyRemainingPathReassessmentReviewReport, 'reviewId'>,
): I184Li1998EscalatedEvidenceAdequacyRemainingPathReassessmentReviewReport {
  return {
    reviewId: `i184_li_1998_escalated_adequacy_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI184Li1998EscalatedEvidenceAdequacyRemainingPathReassessmentReview(
  i183: I183Li1998QualifyingWitnessEscalatedAcquisitionEvidenceReport,
): I184Li1998EscalatedEvidenceAdequacyRemainingPathReassessmentReviewReport {
  const accepted = exactI183Accepted(i183);

  return finalized({
    reviewVersion: I184_LI_1998_ESCALATED_EVIDENCE_ADEQUACY_REMAINING_PATH_REASSESSMENT_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_LI_1998_ESCALATED_EVIDENCE_ADEQUACY_REMAINING_PATH_REASSESSMENT_REVIEW'
      : 'I183_ESCALATED_EVIDENCE_BOUNDARY_INVALID',
    decision: accepted
      ? 'I183_ESCALATED_ACQUISITION_EVIDENCE_ADEQUATE_TO_RECORD_PATH_LEVEL_PROGRESS_ZERO_1998_BINDING_ZERO_VARIANT_NORMALIZATION_TWO_GAPS_REMAIN_UNRESOLVED_REBINDING_NOT_READY_REMAINING_PRIMARY_AND_DIRECT_WITNESS_PATHS_MAY_CONTINUE_NO_INDEPENDENCE'
      : 'LI_1998_ESCALATED_EVIDENCE_ADEQUACY_REASSESSMENT_NOT_READY',
    upstreamI183EvidenceRecordSetId: i183.evidenceRecordSetId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI183BoundaryAccepted: accepted,
    escalatedAcquisitionExecutionAccepted: accepted,
    escalatedEvidenceRecordCount: accepted ? 4 : 0,
    newPathRelevantObservationCount: accepted ? 3 : 0,
    pathLevelProgressAdequate: accepted,
    publicationIdentityResolutionEvidenceAdequate: false,
    canonicalWitnessNormalizationEvidenceAdequate: false,
    qualifying1998PublicationIdentityBindingCount: 0,
    completeVariantNormalizationCount: 0,
    stableFileIdentityOrHashAcquiredCount: 0,
    publicationMediumOrEntityGapResolved: false,
    canonicalDigitalWitnessNormalizationGapResolved: false,
    authorReported2018RegistrationContextAcceptedAsPathEvidence: accepted,
    authorReported2018RegistrationCountsAsDirectRegistryEvidence: false,
    directTargetRegistryRecordStillRequired: accepted,
    later2002FormalEditionMetadataAcceptedAsLaterEditionContext: accepted,
    later2002FormalEditionMayBackfill1998PublicationIdentity: false,
    later2002TocContinuityMayResolve1998PublicationIdentity: false,
    physical314PageListingAcceptedAsRepresentationEvidence: accepted,
    physical314PageListingMayResolve1998PublicationIdentity: false,
    observedRepresentationPageCounts: accepted ? Object.freeze([202, 314, 413, 422] as const) : Object.freeze([]),
    representationVarianceCreatesDistinctNormativeEdition: false,
    representationVarianceCreatesCanonicalWitness: false,
    directFullComparableWitnessesStillRequired: accepted,
    stableFileIdentityOrTransformationProvenanceStillRequired: accepted,
    remainingPathIds: accepted ? I184_REMAINING_PATH_IDS : Object.freeze([]),
    remainingPathCount: accepted ? 5 : 0,
    remainingPathsMethodologicallyOpen: accepted,
    furtherAcquisitionExecutionAuthorizedByThisGate: accepted,
    evidenceAcquiredByThisGate: false,
    directRegistryEvidenceAcquiredByThisGate: false,
    direct1998PublicationBindingAcquiredByThisGate: false,
    directComparableWitnessAcquiredByThisGate: false,
    stableFileIdentityAcquiredByThisGate: false,
    targetedDiscoveryExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    explicitNegativeFindingCount: 0,
    failedRegistryAccessCreatesNegativeFinding: false,
    failedWitnessAccessCreatesNegativeFinding: false,
    searchSilenceCreatesNegativeFinding: false,
    equivalentAggregatorSurfaceCountsAsNewProgress: false,
    bothIdentityFunctionsRequiredBeforeRebindingReadiness: accepted,
    oneIdentityFunctionResolutionSufficientForRebinding: false,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingSelectedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    reassessmentRequirementIds: I184_REASSESSMENT_REQUIREMENT_IDS,
    reassessmentRequirementCount: 12,
    reassessmentRequirementsFrozen: true,
    current2004WitnessPresumedOriginRetired: accepted,
    prior1998SameAuthorWitnessConfirmed: accepted,
    prior1998WitnessIndependentProvenanceEstablished: false,
    sameAuthor1998To2004DerivativeChainMustRemainBound: accepted,
    externalLineageUnresolvedQuestionCount: accepted ? 3 : 0,
    externalLineageUnresolvedStatusPreserved: accepted,
    provenanceIndependenceAdjudicatedByThisGate: false,
    independentNormativeProvenanceEstablishedCount: 0,
    I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: accepted,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    sourceCountVotingAllowed: false,
    provenanceTierWeightingAllowed: false,
    candidateSelectedByThisGate: false,
    remediationStrategySelectedByThisGate: false,
    remediationExecutionAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateRemovedByThisGate: false,
    candidateReplacedByThisGate: false,
    newCandidateSetVersionCreatedByThisGate: false,
    newInputPackageVersionCreatedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: accepted,
    currentV2ProvenanceDisposition: accepted ? 'BLOCKED_UNDER_CURRENT_EVIDENCE' : 'NOT_ASSESSED',
    candidateSetReevaluationAuthorizedByThisGate: false,
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_READINESS_REVIEW'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_ESCALATED_ACQUISITION_EVIDENCE_ADEQUACY_AND_REMAINING_PATH_REASSESSMENT_REVIEW',
    notes: accepted
      ? Object.freeze([
          'I183 is adequate to record path-level progress because it added copyright-registration context, a later formal-edition record, and a physical-style 314-page representation, but none satisfies a 1998-specific publication binding or direct variant-normalization requirement.',
          'The author-reported 2018 registration event remains a routing clue only until a direct target-title registration certificate, registration number, or authoritative registry record is acquired.',
          'The 2002 ISBN/422-page edition and its chapter continuity remain later-edition context and cannot backfill the 1998 publication medium.',
          'The 202/314/413/422 representation family remains unresolved without direct full comparable witnesses plus stable file identity or transformation provenance.',
          'Further same-target acquisition remains methodologically open only through the five frozen direct/primary evidence paths; equivalent aggregator surfaces do not count as new progress.',
        ])
      : Object.freeze([
          'I183 boundary mismatch prevents adequacy and remaining-path reassessment.',
        ]),
  });
}
