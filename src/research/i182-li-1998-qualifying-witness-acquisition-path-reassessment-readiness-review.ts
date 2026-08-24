import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I181Li1998DirectWitnessEvidenceAdequacyRebindingReadinessReviewReport } from './i181-li-1998-direct-witness-acquisition-evidence-adequacy-rebinding-readiness-review.js';

export const I182_LI_1998_QUALIFYING_WITNESS_ACQUISITION_PATH_REASSESSMENT_READINESS_REVIEW_VERSION =
  'myeonghwa-li-1998-qualifying-witness-acquisition-path-reassessment-readiness-review-v1';

export const I182_ACQUISITION_PATH_REQUIREMENT_IDS = Object.freeze([
  'EXACT_I181_NONRESOLVING_PROGRESS_TWO_GAPS_UNRESOLVED_BOUNDARY_REQUIRED',
  'ONLY_GENUINELY_QUALIFYING_NEW_EVIDENCE_CLASSES_MAY_COUNT_AS_NEXT_ACQUISITION_PROGRESS',
  'PUBLICATION_IDENTITY_PATH_REQUIRES_EXPLICIT_1998_SPECIFIC_BINDING',
  'FORMAL_AND_EXPLICIT_NONFORMAL_1998_PUBLICATION_PATHS_BOTH_REMAIN_ADMISSIBLE',
  'INSTITUTIONAL_PRIMARY_AUTHOR_PUBLISHER_OR_ARCHIVAL_SURFACES_PRIORITIZED_OVER_AGGREGATOR_LISTINGS',
  'AGGREGATOR_LISTINGS_MAY_ROUTE_DISCOVERY_BUT_MUST_NOT_RESOLVE_PUBLICATION_IDENTITY_BY_THEMSELVES',
  'VARIANT_NORMALIZATION_PATH_REQUIRES_DIRECT_COMPARABLE_WITNESS_ACCESS',
  'VARIANT_COMPARISON_REQUIRES_TITLE_IMPRINT_TOC_PAGINATION_TARGET_PASSAGE_AND_STRUCTURE_EVIDENCE',
  'STABLE_FILE_IDENTITY_OR_HASH_PROVENANCE_MUST_BE_RECORDED_WHEN_COMPARABLE_FILES_ARE_OBTAINED',
  'ACQUISITION_PATH_READINESS_MUST_REMAIN_DISTINCT_FROM_EVIDENCE_ACQUISITION_EXECUTION',
  'ONE_PATH_OR_ONE_IDENTITY_FUNCTION_SUCCESS_MUST_NOT_AUTHORIZE_REBINDING',
  'NO_EXHAUSTION_NEGATIVE_FINDING_REBINDING_INDEPENDENCE_MUTATION_REEVALUATION_POLICY_RELAXATION_OR_PRODUCTION_AUTHORITY',
] as const);

export type I182AcquisitionPathRequirementId = (typeof I182_ACQUISITION_PATH_REQUIREMENT_IDS)[number];

export const I182_ESCALATION_PATH_IDS = Object.freeze([
  'INSTITUTIONAL_OR_PRIMARY_1998_BIBLIOGRAPHIC_BINDING_ESCALATION',
  'DIRECT_1998_COLOPHON_IMPRINT_OR_DISTRIBUTION_WITNESS_ESCALATION',
  'DIRECT_COMPARABLE_202_314_413_WITNESS_ACCESS_AND_STRUCTURE_COMPARISON_ESCALATION',
  'COMPARABLE_VARIANT_STABLE_FILE_IDENTITY_AND_HASH_PROVENANCE_ESCALATION',
] as const);

export type I182EscalationPathId = (typeof I182_ESCALATION_PATH_IDS)[number];

export interface I182Li1998QualifyingWitnessAcquisitionPathReassessmentReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_LI_1998_QUALIFYING_WITNESS_ACQUISITION_PATH_REASSESSMENT_READINESS_REVIEW'
    | 'I181_ADEQUACY_BOUNDARY_INVALID';
  decision:
    | 'QUALIFYING_WITNESS_ACQUISITION_ESCALATION_PATHS_FROZEN_PUBLICATION_BINDING_AND_DIRECT_VARIANT_COMPARISON_REMAIN_OPEN_NO_EVIDENCE_ACQUIRED_NO_REBINDING_NO_INDEPENDENCE'
    | 'LI_1998_QUALIFYING_WITNESS_ACQUISITION_PATH_REASSESSMENT_NOT_READY';
  upstreamI181ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI181BoundaryAccepted: boolean;
  priorNonresolvingProgressAccepted: boolean;
  publicationMediumOrEntityGapStillOpen: boolean;
  canonicalDigitalWitnessNormalizationGapStillOpen: boolean;
  escalationPathIds: readonly I182EscalationPathId[];
  escalationPathCount: 4 | 0;
  escalationPathsFrozenProspectively: boolean;
  publicationIdentityEscalationReady: boolean;
  directColophonImprintEscalationReady: boolean;
  directComparableVariantEscalationReady: boolean;
  stableFileIdentityEscalationReady: boolean;
  explicit1998SpecificBindingRequired: boolean;
  formal1998PublicationBindingAdmissible: boolean;
  explicitNonformal1998DistributionBindingAdmissible: boolean;
  institutionalOrPrimarySurfacePriorityRequired: boolean;
  aggregatorListingMayRouteDiscovery: boolean;
  aggregatorListingAloneMayResolvePublicationIdentity: false;
  later2002MetadataMayBackfill1998Identity: false;
  chronologyCompanyCoLocationMayEstablishPublisherIdentity: false;
  directComparableWitnessAccessRequired: boolean;
  comparisonMustIncludeTitleImprintTocPaginationTargetPassageAndStructure: boolean;
  stableFileIdentityOrHashRequiredWhenFilesObtained: boolean;
  pageCountAloneMayResolveVariantRelationship: false;
  fileSizeAloneMayResolveVariantRelationship: false;
  filenameAloneMayResolveVariantRelationship: false;
  coverSurfaceAloneMayResolveCanonicalWitness: false;
  acquisitionPathReadinessEstablished: boolean;
  acquisitionExecutionAuthorized: boolean;
  evidenceAcquiredByThisGate: false;
  publicationIdentityBindingAcquiredByThisGate: false;
  variantNormalizationCompletedByThisGate: false;
  stableFileIdentityAcquiredByThisGate: false;
  onePathSuccessSufficientForRebinding: false;
  bothIdentityFunctionsRequiredBeforeRebindingReadiness: boolean;
  evidenceRebindingMethodologicallyReady: false;
  evidenceRebindingAuthorizedByThisGate: false;
  evidenceRebindingSelectedByThisGate: false;
  evidenceRebindingExecutedByThisGate: false;
  targetedDiscoveryExhaustionEstablished: false;
  corpusExhaustionEstablished: false;
  explicitNegativeFindingCount: 0;
  searchSilenceCreatesNegativeFinding: false;
  failedAccessCreatesNegativeFinding: false;
  repetitiveGenericSearchAloneCountsAsProgress: false;
  acquisitionPathRequirementIds: readonly I182AcquisitionPathRequirementId[];
  acquisitionPathRequirementCount: 12;
  acquisitionPathRequirementsFrozen: boolean;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_QUALIFYING_WITNESS_ESCALATED_ACQUISITION_EVIDENCE'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_QUALIFYING_WITNESS_ACQUISITION_PATH_REASSESSMENT_READINESS_REVIEW';
  notes: readonly string[];
}

function exactI181Accepted(
  i181: I181Li1998DirectWitnessEvidenceAdequacyRebindingReadinessReviewReport,
): boolean {
  return (
    i181.status === 'RESOLVED_LI_1998_DIRECT_WITNESS_EVIDENCE_ADEQUACY_REBINDING_READINESS_REVIEW' &&
    i181.decision ===
      'I180_DIRECT_WITNESS_EVIDENCE_ADEQUATE_TO_RECORD_NONRESOLVING_PROGRESS_TWO_IDENTITY_GAPS_REMAIN_UNRESOLVED_REBINDING_NOT_READY_FURTHER_ACQUISITION_REQUIRES_QUALIFYING_PRIMARY_BINDING_OR_DIRECT_VARIANT_COMPARISON_NO_INDEPENDENCE' &&
    i181.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i181.policyVersion === 'v1-definition' &&
    i181.adoptionVersion === 'v1-adoption' &&
    i181.currentCandidateSetVersion === 'v1-candidate-set' &&
    i181.currentInputPackageVersion === 'v2-input-package' &&
    i181.exactI180BoundaryAccepted &&
    i181.evidenceAcquisitionExecutionAccepted &&
    i181.evidenceObservationCount === 6 &&
    i181.newDirectWitnessSurfaceCount === 1 &&
    i181.validNonresolvingEvidenceProgressEstablished &&
    i181.qualifying1998PublicationIdentityBindingCount === 0 &&
    i181.completeVariantNormalizationCount === 0 &&
    i181.publicationMediumOrEntityGapResolved === false &&
    i181.canonicalDigitalWitnessNormalizationGapResolved === false &&
    i181.completePriorWitnessIdentityAdequacyEstablished === false &&
    i181.observedRepresentationPageCounts.length === 3 &&
    i181.observedRepresentationPageCounts[0] === 202 &&
    i181.observedRepresentationPageCounts[1] === 314 &&
    i181.observedRepresentationPageCounts[2] === 413 &&
    i181.representationVarianceCreatesEditionAuthority === false &&
    i181.representationVarianceCreatesCanonicalWitnessAuthority === false &&
    i181.directCoverSeriesMarkerAddsWorkIdentityContext &&
    i181.directCoverSeriesMarkerResolves1998Issuer === false &&
    i181.bothIdentityFunctionsRequiredBeforeRebindingReadiness &&
    i181.oneLaneResolutionSufficientForRebinding === false &&
    i181.evidenceRebindingMethodologicallyReady === false &&
    i181.evidenceRebindingAuthorizedByThisGate === false &&
    i181.evidenceRebindingSelectedByThisGate === false &&
    i181.evidenceRebindingExecutedByThisGate === false &&
    i181.targetedDiscoveryExhaustionEstablished === false &&
    i181.corpusExhaustionEstablished === false &&
    i181.universalNoFurtherEvidenceClaimEstablished === false &&
    i181.explicitNegativeFindingCount === 0 &&
    i181.searchSilenceCreatesNegativeFinding === false &&
    i181.failedQualifyingAcquisitionCreatesNegativeFinding === false &&
    i181.qualifyingFurtherEvidencePathCount === 5 &&
    i181.furtherSameTargetAcquisitionMethodologicallyJustified &&
    i181.furtherSameTargetAcquisitionAuthorizedByThisGate &&
    i181.furtherSameTargetAcquisitionRequiresNewQualifyingEvidence &&
    i181.repetitiveGenericSearchAloneCountsAsProgress === false &&
    i181.adequacyRequirementCount === 10 &&
    i181.adequacyRequirementsFrozen &&
    i181.current2004WitnessPresumedOriginRetired &&
    i181.prior1998SameAuthorWitnessConfirmed &&
    i181.prior1998WitnessIndependentProvenanceEstablished === false &&
    i181.sameAuthor1998To2004DerivativeChainMustRemainBound &&
    i181.externalLineageUnresolvedQuestionCount === 3 &&
    i181.externalLineageUnresolvedStatusPreserved &&
    i181.provenanceIndependenceAdjudicatedByThisGate === false &&
    i181.independentNormativeProvenanceEstablishedCount === 0 &&
    i181.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate === false &&
    i181.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i181.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i181.sourceCountVotingAllowed === false &&
    i181.provenanceTierWeightingAllowed === false &&
    i181.currentV2PackageAndCandidateSetRemainImmutable &&
    i181.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i181.candidateSetReevaluationAuthorizedByThisGate === false &&
    i181.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i181.productionPolicyExecutionAuthorized === false &&
    i181.actualCompositionPerformedByThisGate === false &&
    i181.multiSourceCompositionAuthorized === false &&
    i181.authorityAcquiredByThisGate === false &&
    i181.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i181.thresholdRuleCreatedByThisGate === false &&
    i181.damageEvaluationAuthorized === false &&
    i181.classificationAuthorized === false &&
    i181.numericScoringAuthorized === false &&
    i181.hiddenStemInteractionEligibilityGapRemains &&
    i181.hiddenStemAuthorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i181.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_QUALIFYING_WITNESS_ACQUISITION_PATH_REASSESSMENT_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<I182Li1998QualifyingWitnessAcquisitionPathReassessmentReadinessReviewReport, 'reviewId'>,
): I182Li1998QualifyingWitnessAcquisitionPathReassessmentReadinessReviewReport {
  return {
    reviewId: `i182_li_1998_qualifying_path_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI182Li1998QualifyingWitnessAcquisitionPathReassessmentReadinessReview(
  i181: I181Li1998DirectWitnessEvidenceAdequacyRebindingReadinessReviewReport,
): I182Li1998QualifyingWitnessAcquisitionPathReassessmentReadinessReviewReport {
  const accepted = exactI181Accepted(i181);

  return finalized({
    reviewVersion: I182_LI_1998_QUALIFYING_WITNESS_ACQUISITION_PATH_REASSESSMENT_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_LI_1998_QUALIFYING_WITNESS_ACQUISITION_PATH_REASSESSMENT_READINESS_REVIEW'
      : 'I181_ADEQUACY_BOUNDARY_INVALID',
    decision: accepted
      ? 'QUALIFYING_WITNESS_ACQUISITION_ESCALATION_PATHS_FROZEN_PUBLICATION_BINDING_AND_DIRECT_VARIANT_COMPARISON_REMAIN_OPEN_NO_EVIDENCE_ACQUIRED_NO_REBINDING_NO_INDEPENDENCE'
      : 'LI_1998_QUALIFYING_WITNESS_ACQUISITION_PATH_REASSESSMENT_NOT_READY',
    upstreamI181ReviewId: i181.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI181BoundaryAccepted: accepted,
    priorNonresolvingProgressAccepted: accepted,
    publicationMediumOrEntityGapStillOpen: accepted,
    canonicalDigitalWitnessNormalizationGapStillOpen: accepted,
    escalationPathIds: accepted ? I182_ESCALATION_PATH_IDS : Object.freeze([]),
    escalationPathCount: accepted ? 4 : 0,
    escalationPathsFrozenProspectively: true,
    publicationIdentityEscalationReady: accepted,
    directColophonImprintEscalationReady: accepted,
    directComparableVariantEscalationReady: accepted,
    stableFileIdentityEscalationReady: accepted,
    explicit1998SpecificBindingRequired: accepted,
    formal1998PublicationBindingAdmissible: accepted,
    explicitNonformal1998DistributionBindingAdmissible: accepted,
    institutionalOrPrimarySurfacePriorityRequired: accepted,
    aggregatorListingMayRouteDiscovery: accepted,
    aggregatorListingAloneMayResolvePublicationIdentity: false,
    later2002MetadataMayBackfill1998Identity: false,
    chronologyCompanyCoLocationMayEstablishPublisherIdentity: false,
    directComparableWitnessAccessRequired: accepted,
    comparisonMustIncludeTitleImprintTocPaginationTargetPassageAndStructure: accepted,
    stableFileIdentityOrHashRequiredWhenFilesObtained: accepted,
    pageCountAloneMayResolveVariantRelationship: false,
    fileSizeAloneMayResolveVariantRelationship: false,
    filenameAloneMayResolveVariantRelationship: false,
    coverSurfaceAloneMayResolveCanonicalWitness: false,
    acquisitionPathReadinessEstablished: accepted,
    acquisitionExecutionAuthorized: accepted,
    evidenceAcquiredByThisGate: false,
    publicationIdentityBindingAcquiredByThisGate: false,
    variantNormalizationCompletedByThisGate: false,
    stableFileIdentityAcquiredByThisGate: false,
    onePathSuccessSufficientForRebinding: false,
    bothIdentityFunctionsRequiredBeforeRebindingReadiness: accepted,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingSelectedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    targetedDiscoveryExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    explicitNegativeFindingCount: 0,
    searchSilenceCreatesNegativeFinding: false,
    failedAccessCreatesNegativeFinding: false,
    repetitiveGenericSearchAloneCountsAsProgress: false,
    acquisitionPathRequirementIds: I182_ACQUISITION_PATH_REQUIREMENT_IDS,
    acquisitionPathRequirementCount: 12,
    acquisitionPathRequirementsFrozen: true,
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_QUALIFYING_WITNESS_ESCALATED_ACQUISITION_EVIDENCE'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_QUALIFYING_WITNESS_ACQUISITION_PATH_REASSESSMENT_READINESS_REVIEW',
    notes: accepted
      ? Object.freeze([
          'I182 freezes escalation paths only; it does not acquire any new witness or bibliographic evidence.',
          '1998 publication identity remains open and requires an explicit 1998-specific formal or nonformal binding from a qualifying surface.',
          'Canonical witness normalization remains open and requires direct comparable witness access plus structural comparison; page-count, file-size, filename, or cover variance is insufficient.',
          'Aggregator listings may identify where to look next but cannot by themselves resolve publication identity or canonical-witness relationships.',
          'Even successful acquisition on one path does not authorize rebinding unless both required identity functions are satisfied in a later governed review.',
        ])
      : Object.freeze([
          'I181 adequacy boundary mismatch prevents freezing the qualifying acquisition escalation paths.',
        ]),
  });
}
