import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I201_HIGHER_PROVENANCE_REMEDIATION_PATH_IDS,
  type I201QuWei2001NewDirectEvidenceAdequacyRemediationPathReassessmentReviewReport,
} from './i201-qu-wei-2001-new-direct-evidence-adequacy-remediation-path-reassessment-review.js';

export const I202_QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_READINESS_REVIEW_VERSION =
  'myeonghwa-qu-wei-2001-higher-provenance-substrate-acquisition-readiness-review-v1';

export const I202_ACQUISITION_PATH_IDS = I201_HIGHER_PROVENANCE_REMEDIATION_PATH_IDS;
export type I202AcquisitionPathId = (typeof I202_ACQUISITION_PATH_IDS)[number];

export const I202_EVIDENCE_OBLIGATION_IDS = Object.freeze([
  'PHYSICAL_OR_FIRST_GENERATION_WITNESS_IDENTITY_AND_CHAIN_OF_CUSTODY',
  'DIRECT_2001_TITLE_COPYRIGHT_IMPRINT_COLOPHON_OR_ISSUER_CAPTURE',
  'FIRST_PARTY_OR_ARCHIVAL_2001_ISSUANCE_RECORD_IDENTITY_BINDING',
  'BYTE_STABLE_FILE_HASH_AND_SCAN_LINEAGE_BINDING',
  'CROSS_REPRESENTATION_TITLE_TOC_PAGINATION_STRUCTURE_COMPARISON',
  'CANONICALLY_BOUND_2001_TARGET_SECTION_CONTEXT_CAPTURE',
  'DIRECT_2001_TO_2003_TARGET_SEQUENCE_COMPARISON',
  'CROSS_GAP_NON_BACKFILL_AND_NON_NEGATIVE_ACCESS_AUDIT',
] as const);

export type I202EvidenceObligationId = (typeof I202_EVIDENCE_OBLIGATION_IDS)[number];

export const I202_ACQUISITION_CONTROL_IDS = Object.freeze([
  'EXACT_I201_HIGHER_PROVENANCE_REMEDIATION_BOUNDARY_REQUIRED',
  'FOUR_HIGHER_PROVENANCE_PATHS_MUST_REMAIN_FROZEN_PROSPECTIVELY',
  'PUBLIC_ONLINE_QUERY_REPETITION_MUST_NOT_BE_REINTRODUCED_AS_REMEDIATION_PROGRESS',
  'PHYSICAL_OR_FIRST_GENERATION_WITNESS_MUST_INCLUDE_REPRODUCIBLE_IDENTITY_AND_PROVENANCE_CONTEXT',
  'TITLE_COPYRIGHT_IMPRINT_COLOPHON_CAPTURE_MUST_BE_DIRECTLY_BOUND_TO_THE_ACQUIRED_WITNESS',
  'FIRST_PARTY_OR_ARCHIVAL_RECORD_MUST_EXPLICITLY_BIND_CURVE_WEI_SIZHU_XIANGZHEN_AND_2001',
  'LATER_METADATA_OR_SECONDARY_CATALOG_LABEL_MUST_NOT_BACKFILL_2001_ISSUANCE_IDENTITY',
  'BYTE_STABLE_PATH_MUST_CAPTURE_FILE_HASHES_OR_EQUIVALENT_CONTENT_IDENTIFIERS_FOR_COMPARED_REPRESENTATIONS',
  'SCAN_LINEAGE_OR_TRANSFORMATION_PROVENANCE_MUST_BE_CAPTURED_WHERE_AVAILABLE',
  'NORMALIZATION_REQUIRES_STRUCTURE_COMPARISON_AND_MUST_NOT_REST_ON_PAGE_COUNT_FILE_SIZE_FILENAME_OR_HOST_VARIANCE_ALONE',
  'TARGET_FACSIMILE_PATH_MUST_BE_CANONICALLY_BOUND_TO_A_2001_WITNESS_BEFORE_PASSAGE_PROMOTION',
  'TARGET_COMPARISON_MUST_PRESERVE_CONTEXT_AND_COMPARE_THE_GOVERNED_2003_SEQUENCE_DIRECTLY',
  'DOCTRINE_LEVEL_ANTECEDENT_MUST_NOT_BACKFILL_EXACT_OR_NEAR_VERBATIM_TARGET_PASSAGE_IDENTITY',
  'EVIDENCE_FOR_ONE_GAP_MUST_NOT_CROSS_BACKFILL_ANOTHER_GAP',
  'INACCESSIBLE_UNAVAILABLE_OR_NON_ACQUIRED_SUBSTRATE_MUST_REMAIN_UNRESOLVED_NOT_NEGATIVE',
  'NO_ONLINE_CORPUS_OR_GLOBAL_CORPUS_EXHAUSTION_MAY_BE_INFERRED_FROM_ACCESS_LIMITS',
  'ALL_THREE_GAPS_MUST_REMAIN_REQUIRED_BEFORE_REBINDING_READINESS',
  'I132_INDEPENDENCE_DERIVATIVE_FROZEN_V2_AND_PRODUCTION_GUARDS_MUST_REMAIN_UNCHANGED',
] as const);

export type I202AcquisitionControlId = (typeof I202_ACQUISITION_CONTROL_IDS)[number];

export interface I202QuWei2001HigherProvenanceSubstrateAcquisitionReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_READINESS_REVIEW'
    | 'I201_HIGHER_PROVENANCE_REMEDIATION_BOUNDARY_INVALID';
  decision:
    | 'I201_BOUNDARY_SUPPORTS_QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_FOUR_PATHS_EIGHT_OBLIGATIONS_EIGHTEEN_CONTROLS_FROZEN_EVIDENCE_COLLECTION_ONLY_INACCESSIBILITY_NON_NEGATIVE_NO_REBINDING_NO_INDEPENDENCE'
    | 'QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_NOT_READY';
  upstreamI201ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI201BoundaryAccepted: boolean;
  targetPriorWitnessId: 'QU_WEI_SIZHU_XIANGZHEN_2001' | null;
  targetAuthor: '曲炜' | null;
  targetTitle: '《四柱详真》' | null;
  targetAppearanceYear: 2001 | null;
  unresolvedGapCountAtEntry: 3 | 0;
  publicationIdentityGapOpenAtEntry: boolean;
  canonicalWitnessNormalizationGapOpenAtEntry: boolean;
  exactTargetPassageBindingGapOpenAtEntry: boolean;
  acquisitionPathIds: readonly I202AcquisitionPathId[];
  acquisitionPathCount: 4;
  acquisitionPathsFrozenProspectively: boolean;
  evidenceObligationIds: readonly I202EvidenceObligationId[];
  evidenceObligationCount: 8;
  evidenceObligationsFrozenProspectively: boolean;
  acquisitionControlIds: readonly I202AcquisitionControlId[];
  acquisitionControlCount: 18;
  acquisitionControlsFrozenProspectively: boolean;
  physicalOrFirstGenerationWitnessRequiresReproducibleIdentity: boolean;
  physicalOrFirstGenerationWitnessRequiresProvenanceContext: boolean;
  directWitnessTitleCopyrightImprintColophonCaptureRequired: boolean;
  firstPartyOrArchiveRecordRequiresExplicitAuthorTitle2001Binding: boolean;
  laterMetadataMayBackfill2001IssuanceIdentity: false;
  secondaryCatalogMayBackfill2001IssuanceIdentity: false;
  byteStableRepresentationHashesOrEquivalentIdsRequired: boolean;
  scanLineageOrTransformationProvenanceRequiredWhereAvailable: boolean;
  directStructureComparisonRequiredForNormalization: boolean;
  pageCountFileSizeFilenameHostVarianceAloneMayResolveNormalization: false;
  targetFacsimileRequiresCanonical2001Binding: boolean;
  targetFacsimileRequiresContextAnchor: boolean;
  direct2001To2003SequenceComparisonRequired: boolean;
  doctrineLevelAntecedentAloneMayResolveExactPassageBinding: false;
  evidenceForOneGapMayBackfillAnotherGap: false;
  higherProvenanceSubstrateAcquisitionMayProceed: boolean;
  authorizationIsEvidenceCollectionOnly: boolean;
  acquisitionExecutedByThisGate: false;
  evidenceAcquiredByThisGate: false;
  inaccessibleSubstrateCreatesNegativeFinding: false;
  unavailableCustodianCreatesNegativeFinding: false;
  nonAcquisitionCreatesNegativeFinding: false;
  accessFailureCreatesNegativeFinding: false;
  onlineCorpusExhaustionEstablished: false;
  corpusExhaustionEstablished: false;
  allThreeGapsRequiredBeforeRebindingReadiness: boolean;
  evidenceRebindingMethodologicallyReady: false;
  evidenceRebindingAuthorizedByThisGate: false;
  evidenceRebindingExecutedByThisGate: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_EVIDENCE'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_READINESS_REVIEW';
  notes: readonly string[];
}

function exactI201Accepted(
  i201: I201QuWei2001NewDirectEvidenceAdequacyRemediationPathReassessmentReviewReport,
): boolean {
  return (
    i201.status === 'RESOLVED_QU_WEI_2001_NEW_DIRECT_EVIDENCE_ADEQUACY_REMEDIATION_PATH_REASSESSMENT_REVIEW' &&
    i201.decision ===
      'I200_EVIDENCE_ADEQUATE_FOR_THREE_UNRESOLVED_FINDINGS_EQUIVALENT_PUBLIC_ONLINE_REPETITION_NOT_JUSTIFIED_HIGHER_PROVENANCE_SUBSTRATE_REMEDIATION_READINESS_MAY_PROCEED_NO_EXHAUSTION_NO_REBINDING_NO_INDEPENDENCE' &&
    i201.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i201.policyVersion === 'v1-definition' &&
    i201.adoptionVersion === 'v1-adoption' &&
    i201.currentCandidateSetVersion === 'v1-candidate-set' &&
    i201.currentInputPackageVersion === 'v2-input-package' &&
    i201.exactI200BoundaryAccepted &&
    i201.evidenceAdequateForBoundedNonResolution &&
    i201.contextualNewEvidencePathCountAccepted === 2 &&
    i201.qualifyingGapResolutionEvidenceCountAccepted === 0 &&
    i201.resolvedGapCountAccepted === 0 &&
    i201.unresolvedGapCountAccepted === 3 &&
    i201.explicitNegativeFindingCountAccepted === 0 &&
    i201.publicationIdentityGapRemainsUnresolved &&
    i201.canonicalWitnessNormalizationGapRemainsUnresolved &&
    i201.exactTargetPassageBindingGapRemainsUnresolved &&
    i201.newRepresentationVariancePreservedAsContextOnly &&
    i201.newTitleBearingTargetSectionPreservedAsContextOnly &&
    i201.directDoctrinalAntecedentPreserved &&
    i201.equivalentPublicOnlineSearchRepetitionCountsAsRemediationProgress === false &&
    i201.equivalentPublicOnlineSearchRepetitionImmediatelyJustified === false &&
    i201.strongerRemediationMustChangeEvidenceSubstrate &&
    i201.onlineCorpusExhaustionEstablished === false &&
    i201.corpusExhaustionEstablished === false &&
    i201.universalNoFurtherEvidenceClaimEstablished === false &&
    i201.higherProvenanceRemediationPathCount === 4 &&
    i201.higherProvenanceRemediationPathIds.length === 4 &&
    i201.higherProvenanceRemediationPathIds.every((id, index) => id === I202_ACQUISITION_PATH_IDS[index]) &&
    i201.higherProvenanceRemediationPathsFrozenForNextReadiness &&
    i201.physicalOrFirstGenerationWitnessPathStillReviewable &&
    i201.firstPartyIssuanceRecordPathStillReviewable &&
    i201.byteStableScanLineageNormalizationPathStillReviewable &&
    i201.canonicallyBoundTargetFacsimilePathStillReviewable &&
    i201.remediationPathSelectedByThisGate === false &&
    i201.higherProvenanceAcquisitionReadinessReviewMethodologicallyJustified &&
    i201.higherProvenanceAcquisitionReadinessReviewAuthorized &&
    i201.acquisitionAuthorizedByThisGate === false &&
    i201.acquisitionExecutedByThisGate === false &&
    i201.evidenceAcquiredByThisGate === false &&
    i201.evidenceForOneGapMayBackfillAnotherGap === false &&
    i201.searchSilenceCreatesNegativeFinding === false &&
    i201.accessFailureCreatesNegativeFinding === false &&
    i201.nonAcquisitionCreatesNegativeFinding === false &&
    i201.failureToLocateExactPhraseCreatesNegativeFinding === false &&
    i201.allThreeGapsRequiredBeforeRebindingReadiness &&
    i201.evidenceRebindingMethodologicallyReady === false &&
    i201.evidenceRebindingAuthorizedByThisGate === false &&
    i201.evidenceRebindingExecutedByThisGate === false &&
    i201.sameAuthor2001To2003DoctrinalDependencyPreserved &&
    i201.externalTargetLineageUnresolvedQuestionCount === 3 &&
    i201.provenanceIndependenceAdjudicatedByThisGate === false &&
    i201.independentNormativeProvenanceEstablishedCount === 0 &&
    i201.explicitDerivativeRelationshipCheckRequired &&
    i201.derivativeRetransmissionCountsAsIndependentAuthority === false &&
    i201.unresolvedLineageDefaultDisposition === 'REJECT_INDEPENDENCE_CLAIM' &&
    i201.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate === false &&
    i201.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i201.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i201.sourceClassAloneSufficient === false &&
    i201.sourceCountMayBecomeNumericWeight === false &&
    i201.provenanceTierMayBecomeNumericWeight === false &&
    i201.reassessmentControlCount === 16 &&
    i201.reassessmentControlsFrozen &&
    i201.candidateSelectedByThisGate === false &&
    i201.candidateRegistrationAuthorizedByThisGate === false &&
    i201.candidateSetMutatedByThisGate === false &&
    i201.candidateSetReevaluationAuthorizedByThisGate === false &&
    i201.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i201.newCandidateSetVersionCreatedByThisGate === false &&
    i201.newInputPackageVersionCreatedByThisGate === false &&
    i201.currentV2PackageAndCandidateSetRemainImmutable &&
    i201.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i201.liSameTargetPathSuspendedNotRetired &&
    i201.liSameTargetMayReopenOnMateriallyNewDirectLead &&
    i201.liPublicationMediumOrEntityGapStillOpen &&
    i201.liCanonicalDigitalWitnessNormalizationGapStillOpen &&
    i201.productionPolicyExecutionAuthorized === false &&
    i201.actualCompositionPerformedByThisGate === false &&
    i201.multiSourceCompositionAuthorized === false &&
    i201.authorityAcquiredByThisGate === false &&
    i201.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i201.thresholdRuleCreatedByThisGate === false &&
    i201.damageEvaluationAuthorized === false &&
    i201.classificationAuthorized === false &&
    i201.numericScoringAuthorized === false &&
    i201.hiddenStemInteractionEligibilityGapRemains &&
    i201.hiddenStemAuthorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i201.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<I202QuWei2001HigherProvenanceSubstrateAcquisitionReadinessReviewReport, 'reviewId'>,
): I202QuWei2001HigherProvenanceSubstrateAcquisitionReadinessReviewReport {
  return {
    reviewId: `i202_qu_wei_2001_higher_provenance_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI202QuWei2001HigherProvenanceSubstrateAcquisitionReadinessReview(
  i201: I201QuWei2001NewDirectEvidenceAdequacyRemediationPathReassessmentReviewReport,
): I202QuWei2001HigherProvenanceSubstrateAcquisitionReadinessReviewReport {
  const accepted = exactI201Accepted(i201);

  return finalized({
    reviewVersion: I202_QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_READINESS_REVIEW'
      : 'I201_HIGHER_PROVENANCE_REMEDIATION_BOUNDARY_INVALID',
    decision: accepted
      ? 'I201_BOUNDARY_SUPPORTS_QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_FOUR_PATHS_EIGHT_OBLIGATIONS_EIGHTEEN_CONTROLS_FROZEN_EVIDENCE_COLLECTION_ONLY_INACCESSIBILITY_NON_NEGATIVE_NO_REBINDING_NO_INDEPENDENCE'
      : 'QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_NOT_READY',
    upstreamI201ReviewId: i201.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI201BoundaryAccepted: accepted,
    targetPriorWitnessId: accepted ? 'QU_WEI_SIZHU_XIANGZHEN_2001' : null,
    targetAuthor: accepted ? '曲炜' : null,
    targetTitle: accepted ? '《四柱详真》' : null,
    targetAppearanceYear: accepted ? 2001 : null,
    unresolvedGapCountAtEntry: accepted ? 3 : 0,
    publicationIdentityGapOpenAtEntry: accepted,
    canonicalWitnessNormalizationGapOpenAtEntry: accepted,
    exactTargetPassageBindingGapOpenAtEntry: accepted,
    acquisitionPathIds: I202_ACQUISITION_PATH_IDS,
    acquisitionPathCount: 4,
    acquisitionPathsFrozenProspectively: accepted,
    evidenceObligationIds: I202_EVIDENCE_OBLIGATION_IDS,
    evidenceObligationCount: 8,
    evidenceObligationsFrozenProspectively: accepted,
    acquisitionControlIds: I202_ACQUISITION_CONTROL_IDS,
    acquisitionControlCount: 18,
    acquisitionControlsFrozenProspectively: accepted,
    physicalOrFirstGenerationWitnessRequiresReproducibleIdentity: accepted,
    physicalOrFirstGenerationWitnessRequiresProvenanceContext: accepted,
    directWitnessTitleCopyrightImprintColophonCaptureRequired: accepted,
    firstPartyOrArchiveRecordRequiresExplicitAuthorTitle2001Binding: accepted,
    laterMetadataMayBackfill2001IssuanceIdentity: false,
    secondaryCatalogMayBackfill2001IssuanceIdentity: false,
    byteStableRepresentationHashesOrEquivalentIdsRequired: accepted,
    scanLineageOrTransformationProvenanceRequiredWhereAvailable: accepted,
    directStructureComparisonRequiredForNormalization: accepted,
    pageCountFileSizeFilenameHostVarianceAloneMayResolveNormalization: false,
    targetFacsimileRequiresCanonical2001Binding: accepted,
    targetFacsimileRequiresContextAnchor: accepted,
    direct2001To2003SequenceComparisonRequired: accepted,
    doctrineLevelAntecedentAloneMayResolveExactPassageBinding: false,
    evidenceForOneGapMayBackfillAnotherGap: false,
    higherProvenanceSubstrateAcquisitionMayProceed: accepted,
    authorizationIsEvidenceCollectionOnly: accepted,
    acquisitionExecutedByThisGate: false,
    evidenceAcquiredByThisGate: false,
    inaccessibleSubstrateCreatesNegativeFinding: false,
    unavailableCustodianCreatesNegativeFinding: false,
    nonAcquisitionCreatesNegativeFinding: false,
    accessFailureCreatesNegativeFinding: false,
    onlineCorpusExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    allThreeGapsRequiredBeforeRebindingReadiness: accepted,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_EVIDENCE'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_READINESS_REVIEW',
    notes: accepted
      ? Object.freeze([
          'I202 freezes four higher-provenance acquisition paths, eight evidence obligations, and eighteen controls; it does not execute acquisition.',
          'Physical or first-generation witness evidence must carry reproducible identity and provenance context, while first-party or archival issuance evidence must explicitly bind 曲炜, 四柱详真, and 2001.',
          'Normalization requires byte-stable identifiers or equivalent content identity plus scan-lineage and direct structure comparison; representation metadata variance alone remains insufficient.',
          'Target-passage promotion requires a canonically bound 2001 facsimile/context anchor and direct comparison against the governed 2003 sequence.',
          'Inaccessibility, unavailable custodians, non-acquisition, and access failure remain unresolved outcomes rather than negative or exhaustion evidence.',
          'No rebinding, independence adjudication, I132 relaxation, candidate-set change, composition, threshold creation, classification, scoring, or production authority is granted.',
        ])
      : Object.freeze(['I201 boundary mismatch prevents higher-provenance acquisition readiness.']),
  });
}
