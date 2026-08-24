import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I180Li1998DirectWitnessAcquisitionEvidenceReport } from './i180-li-1998-direct-witness-acquisition-evidence.js';

export const I181_LI_1998_DIRECT_WITNESS_EVIDENCE_ADEQUACY_REBINDING_READINESS_REVIEW_VERSION =
  'myeonghwa-li-1998-direct-witness-acquisition-evidence-adequacy-rebinding-readiness-review-v1';

export const I181_ADEQUACY_REQUIREMENT_IDS = Object.freeze([
  'EXACT_I180_ONE_DIRECT_SURFACE_ZERO_BINDING_ZERO_NORMALIZATION_BOUNDARY_REQUIRED',
  'NEW_DIRECT_WITNESS_SURFACE_IS_VALID_EVIDENCE_PROGRESS_WITHOUT_AUTOMATIC_GAP_RESOLUTION',
  'ZERO_1998_SPECIFIC_PUBLICATION_BINDINGS_MUST_PRESERVE_PUBLICATION_IDENTITY_GAP',
  'ZERO_COMPLETE_VARIANT_NORMALIZATIONS_MUST_PRESERVE_CANONICAL_WITNESS_GAP',
  '202_314_413_REPRESENTATION_VARIANCE_MUST_NOT_CREATE_EDITION_OR_CANONICAL_AUTHORITY',
  'BOTH_IDENTITY_FUNCTIONS_REMAIN_REQUIRED_BEFORE_REBINDING_READINESS',
  'FAILED_QUALIFYING_ACQUISITION_MUST_NOT_CREATE_EXHAUSTION_OR_NEGATIVE_FINDING',
  'FURTHER_SAME_TARGET_WORK_REQUIRES_QUALIFYING_PRIMARY_BINDING_OR_DIRECT_VARIANT_COMPARISON_EVIDENCE',
  'SAME_AUTHOR_DERIVATIVE_CHAIN_AND_THREE_EXTERNAL_LINEAGE_UNRESOLVED_FINDINGS_MUST_REMAIN_BOUND',
  'NO_REBINDING_SELECTION_MUTATION_INDEPENDENCE_REEVALUATION_POLICY_RELAXATION_OR_PRODUCTION_AUTHORITY',
] as const);

export type I181AdequacyRequirementId = (typeof I181_ADEQUACY_REQUIREMENT_IDS)[number];

export const I181_QUALIFYING_FURTHER_EVIDENCE_PATH_IDS = Object.freeze([
  'DIRECT_1998_TITLE_PAGE_COPYRIGHT_PAGE_COLOPHON_OR_IMPRINT_BINDING',
  'EXPLICIT_1998_LIBRARY_ARCHIVE_OR_PRIMARY_BIBLIOGRAPHIC_BINDING',
  'EXPLICIT_1998_PUBLISHER_ISSUER_DISTRIBUTOR_OR_NONFORMAL_STATUS_BINDING',
  'DIRECT_COMPARABLE_VARIANT_TITLE_IMPRINT_TOC_PAGINATION_TARGET_PASSAGE_STRUCTURE_COMPARISON',
  'STABLE_FILE_IDENTITY_OR_HASH_PROVENANCE_FOR_COMPARABLE_VARIANTS',
] as const);

export type I181QualifyingFurtherEvidencePathId =
  (typeof I181_QUALIFYING_FURTHER_EVIDENCE_PATH_IDS)[number];

export interface I181Li1998DirectWitnessEvidenceAdequacyRebindingReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_LI_1998_DIRECT_WITNESS_EVIDENCE_ADEQUACY_REBINDING_READINESS_REVIEW'
    | 'I180_DIRECT_WITNESS_EVIDENCE_BOUNDARY_INVALID';
  decision:
    | 'I180_DIRECT_WITNESS_EVIDENCE_ADEQUATE_TO_RECORD_NONRESOLVING_PROGRESS_TWO_IDENTITY_GAPS_REMAIN_UNRESOLVED_REBINDING_NOT_READY_FURTHER_ACQUISITION_REQUIRES_QUALIFYING_PRIMARY_BINDING_OR_DIRECT_VARIANT_COMPARISON_NO_INDEPENDENCE'
    | 'LI_1998_DIRECT_WITNESS_EVIDENCE_ADEQUACY_REVIEW_NOT_READY';
  upstreamI180EvidenceRecordSetId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI180BoundaryAccepted: boolean;
  evidenceAcquisitionExecutionAccepted: boolean;
  evidenceObservationCount: 6 | 0;
  newDirectWitnessSurfaceCount: 1 | 0;
  validNonresolvingEvidenceProgressEstablished: boolean;
  qualifying1998PublicationIdentityBindingCount: 0;
  completeVariantNormalizationCount: 0;
  publicationMediumOrEntityGapResolved: false;
  canonicalDigitalWitnessNormalizationGapResolved: false;
  completePriorWitnessIdentityAdequacyEstablished: false;
  observedRepresentationPageCounts: readonly [202, 314, 413] | readonly [];
  representationVarianceCreatesEditionAuthority: false;
  representationVarianceCreatesCanonicalWitnessAuthority: false;
  directCoverSeriesMarkerAddsWorkIdentityContext: boolean;
  directCoverSeriesMarkerResolves1998Issuer: false;
  bothIdentityFunctionsRequiredBeforeRebindingReadiness: boolean;
  oneLaneResolutionSufficientForRebinding: false;
  evidenceRebindingMethodologicallyReady: false;
  evidenceRebindingAuthorizedByThisGate: false;
  evidenceRebindingSelectedByThisGate: false;
  evidenceRebindingExecutedByThisGate: false;
  targetedDiscoveryExhaustionEstablished: false;
  corpusExhaustionEstablished: false;
  universalNoFurtherEvidenceClaimEstablished: false;
  explicitNegativeFindingCount: 0;
  searchSilenceCreatesNegativeFinding: false;
  failedQualifyingAcquisitionCreatesNegativeFinding: false;
  qualifyingFurtherEvidencePathIds: readonly I181QualifyingFurtherEvidencePathId[];
  qualifyingFurtherEvidencePathCount: 5 | 0;
  furtherSameTargetAcquisitionMethodologicallyJustified: boolean;
  furtherSameTargetAcquisitionAuthorizedByThisGate: boolean;
  furtherSameTargetAcquisitionRequiresNewQualifyingEvidence: boolean;
  repetitiveGenericSearchAloneCountsAsProgress: false;
  adequacyRequirementIds: readonly I181AdequacyRequirementId[];
  adequacyRequirementCount: 10;
  adequacyRequirementsFrozen: boolean;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_QUALIFYING_WITNESS_ACQUISITION_PATH_REASSESSMENT_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_DIRECT_WITNESS_ACQUISITION_EVIDENCE_ADEQUACY_REBINDING_READINESS_REVIEW';
  notes: readonly string[];
}

function exactI180Accepted(i180: I180Li1998DirectWitnessAcquisitionEvidenceReport): boolean {
  return (
    i180.status === 'RESOLVED_LI_1998_DIRECT_PRIMARY_WITNESS_VARIANT_NORMALIZATION_EVIDENCE_ACQUISITION_RECORD' &&
    i180.decision ===
      'DIRECT_WITNESS_ACQUISITION_EXECUTED_ONE_STABLE_COVER_SURFACE_OBSERVED_ZERO_1998_SPECIFIC_PUBLICATION_BINDINGS_ZERO_COMPLETE_VARIANT_NORMALIZATIONS_TWO_GAPS_REMAIN_UNRESOLVED_NO_REBINDING_NO_INDEPENDENCE' &&
    i180.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i180.policyVersion === 'v1-definition' &&
    i180.adoptionVersion === 'v1-adoption' &&
    i180.currentCandidateSetVersion === 'v1-candidate-set' &&
    i180.currentInputPackageVersion === 'v2-input-package' &&
    i180.exactI179BoundaryAccepted &&
    i180.evidenceAcquisitionExecuted &&
    i180.publicationIdentityLaneExecuted &&
    i180.variantNormalizationLaneExecuted &&
    i180.evidenceObservationCount === 6 &&
    i180.newDirectWitnessSurfaceAcquiredCount === 1 &&
    i180.qualifying1998PublicationIdentityBindingCount === 0 &&
    i180.completeVariantNormalizationCount === 0 &&
    i180.directStableCoverSurfaceObserved &&
    i180.scribdDocumentId === '744317976' &&
    i180.scribdReportedDocumentPageCount === 202 &&
    i180.directCoverTitleObserved &&
    i180.directCoverAuthorObserved &&
    i180.directCoverSeriesMarkerObserved &&
    i180.directCoverSeriesMarker === '预测研究系列丛书' &&
    i180.directCover1998DateObserved === false &&
    i180.directCoverPublisherObserved === false &&
    i180.directCoverIssuingEntityObserved === false &&
    i180.directCoverIsbnObserved === false &&
    i180.directCoverEstablishes1998PublicationIdentity === false &&
    i180.publicationMediumOrEntityGapResolved === false &&
    i180.observedRepresentationPageCounts.length === 3 &&
    i180.observedRepresentationPageCounts[0] === 202 &&
    i180.observedRepresentationPageCounts[1] === 314 &&
    i180.observedRepresentationPageCounts[2] === 413 &&
    i180.direct202FullWitnessAccessObtained === false &&
    i180.direct314FullWitnessAccessObtained === false &&
    i180.direct413FullWitnessAccessObtained === false &&
    i180.direct314And413ComparableWitnessSetObtained === false &&
    i180.crossVariantTitleImprintCopyrightComparisonCompleted === false &&
    i180.crossVariantPaginationTocTargetPassageComparisonCompleted === false &&
    i180.crossVariantAdditionDeletionReorderingComparisonCompleted === false &&
    i180.crossVariantScanArtifactComparisonCompleted === false &&
    i180.cryptographicHashOrStableFileIdentityAcquiredCount === 0 &&
    i180.canonicalDigitalWitnessEstablished === false &&
    i180.normalizedWitnessFamilyEstablished === false &&
    i180.canonicalDigitalWitnessNormalizationGapResolved === false &&
    i180.oneLaneResolutionSufficientForRebinding === false &&
    i180.bothIdentityFunctionsRequiredBeforeRebindingReadiness &&
    i180.evidenceRebindingMethodologicallyReady === false &&
    i180.evidenceRebindingAuthorizedByThisGate === false &&
    i180.evidenceRebindingSelectedByThisGate === false &&
    i180.evidenceRebindingExecutedByThisGate === false &&
    i180.explicitNegativeFindingCount === 0 &&
    i180.targetedDiscoveryExhaustionEstablished === false &&
    i180.corpusExhaustionEstablished === false &&
    i180.searchSilenceCreatesNegativeFinding === false &&
    i180.current2004WitnessPresumedOriginRetired &&
    i180.prior1998SameAuthorWitnessConfirmed &&
    i180.prior1998WitnessIndependentProvenanceEstablished === false &&
    i180.sameAuthor1998To2004DerivativeChainMustRemainBound &&
    i180.externalLineageUnresolvedQuestionCount === 3 &&
    i180.externalLineageUnresolvedStatusPreserved &&
    i180.provenanceIndependenceAdjudicatedByThisGate === false &&
    i180.independentNormativeProvenanceEstablishedCount === 0 &&
    i180.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate === false &&
    i180.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i180.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i180.sourceCountVotingAllowed === false &&
    i180.provenanceTierWeightingAllowed === false &&
    i180.currentV2PackageAndCandidateSetRemainImmutable &&
    i180.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i180.candidateSetReevaluationAuthorizedByThisGate === false &&
    i180.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i180.productionPolicyExecutionAuthorized === false &&
    i180.actualCompositionPerformedByThisGate === false &&
    i180.multiSourceCompositionAuthorized === false &&
    i180.authorityAcquiredByThisGate === false &&
    i180.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i180.thresholdRuleCreatedByThisGate === false &&
    i180.damageEvaluationAuthorized === false &&
    i180.classificationAuthorized === false &&
    i180.numericScoringAuthorized === false &&
    i180.hiddenStemInteractionEligibilityGapRemains &&
    i180.hiddenStemAuthorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i180.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_DIRECT_WITNESS_ACQUISITION_EVIDENCE_ADEQUACY_REBINDING_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<I181Li1998DirectWitnessEvidenceAdequacyRebindingReadinessReviewReport, 'reviewId'>,
): I181Li1998DirectWitnessEvidenceAdequacyRebindingReadinessReviewReport {
  return {
    reviewId: `i181_li_1998_direct_witness_adequacy_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI181Li1998DirectWitnessEvidenceAdequacyRebindingReadinessReview(
  i180: I180Li1998DirectWitnessAcquisitionEvidenceReport,
): I181Li1998DirectWitnessEvidenceAdequacyRebindingReadinessReviewReport {
  const accepted = exactI180Accepted(i180);

  return finalized({
    reviewVersion: I181_LI_1998_DIRECT_WITNESS_EVIDENCE_ADEQUACY_REBINDING_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_LI_1998_DIRECT_WITNESS_EVIDENCE_ADEQUACY_REBINDING_READINESS_REVIEW'
      : 'I180_DIRECT_WITNESS_EVIDENCE_BOUNDARY_INVALID',
    decision: accepted
      ? 'I180_DIRECT_WITNESS_EVIDENCE_ADEQUATE_TO_RECORD_NONRESOLVING_PROGRESS_TWO_IDENTITY_GAPS_REMAIN_UNRESOLVED_REBINDING_NOT_READY_FURTHER_ACQUISITION_REQUIRES_QUALIFYING_PRIMARY_BINDING_OR_DIRECT_VARIANT_COMPARISON_NO_INDEPENDENCE'
      : 'LI_1998_DIRECT_WITNESS_EVIDENCE_ADEQUACY_REVIEW_NOT_READY',
    upstreamI180EvidenceRecordSetId: i180.evidenceRecordSetId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI180BoundaryAccepted: accepted,
    evidenceAcquisitionExecutionAccepted: accepted,
    evidenceObservationCount: accepted ? 6 : 0,
    newDirectWitnessSurfaceCount: accepted ? 1 : 0,
    validNonresolvingEvidenceProgressEstablished: accepted,
    qualifying1998PublicationIdentityBindingCount: 0,
    completeVariantNormalizationCount: 0,
    publicationMediumOrEntityGapResolved: false,
    canonicalDigitalWitnessNormalizationGapResolved: false,
    completePriorWitnessIdentityAdequacyEstablished: false,
    observedRepresentationPageCounts: accepted ? Object.freeze([202, 314, 413] as const) : Object.freeze([]),
    representationVarianceCreatesEditionAuthority: false,
    representationVarianceCreatesCanonicalWitnessAuthority: false,
    directCoverSeriesMarkerAddsWorkIdentityContext: accepted,
    directCoverSeriesMarkerResolves1998Issuer: false,
    bothIdentityFunctionsRequiredBeforeRebindingReadiness: accepted,
    oneLaneResolutionSufficientForRebinding: false,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingSelectedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    targetedDiscoveryExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    universalNoFurtherEvidenceClaimEstablished: false,
    explicitNegativeFindingCount: 0,
    searchSilenceCreatesNegativeFinding: false,
    failedQualifyingAcquisitionCreatesNegativeFinding: false,
    qualifyingFurtherEvidencePathIds: accepted ? I181_QUALIFYING_FURTHER_EVIDENCE_PATH_IDS : Object.freeze([]),
    qualifyingFurtherEvidencePathCount: accepted ? 5 : 0,
    furtherSameTargetAcquisitionMethodologicallyJustified: accepted,
    furtherSameTargetAcquisitionAuthorizedByThisGate: accepted,
    furtherSameTargetAcquisitionRequiresNewQualifyingEvidence: accepted,
    repetitiveGenericSearchAloneCountsAsProgress: false,
    adequacyRequirementIds: I181_ADEQUACY_REQUIREMENT_IDS,
    adequacyRequirementCount: 10,
    adequacyRequirementsFrozen: true,
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_QUALIFYING_WITNESS_ACQUISITION_PATH_REASSESSMENT_READINESS_REVIEW'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_DIRECT_WITNESS_ACQUISITION_EVIDENCE_ADEQUACY_REBINDING_READINESS_REVIEW',
    notes: accepted
      ? Object.freeze([
          'The I180 Scribd cover surface is genuine new direct witness evidence and therefore valid nonresolving progress, but it lacks a 1998 date, publisher, issuer, distributor, ISBN, or explicit nonformal-distribution binding.',
          'The 202/314/413 representation set expands the observed witness family but does not establish edition identity or a canonical witness without direct comparable structural evidence.',
          'Rebinding remains not ready because both publication identity and canonical witness normalization functions remain unresolved.',
          'Further same-target work is authorized only when it seeks qualifying primary/bibliographic publication binding or direct comparable variant evidence rather than repeating generic web search.',
          'No provenance independence, package mutation, threshold semantics, classification, numeric scoring, or production authorization is created by I181.',
        ])
      : Object.freeze([
          'I180 evidence boundary mismatch prevents adequacy and rebinding-readiness adjudication.',
        ]),
  });
}
