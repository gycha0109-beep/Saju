import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I192QuWeiLineageEvidenceAdequacyOriginReassessmentReviewReport } from './i192-qu-wei-lineage-evidence-adequacy-origin-reassessment-review.js';

export const I193_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_ACQUISITION_READINESS_REVIEW_VERSION =
  'myeonghwa-qu-wei-2001-prior-witness-identity-target-passage-acquisition-readiness-review-v1';

export const I193_ACQUISITION_CONTROL_IDS = Object.freeze([
  'EXACT_I192_ORIGIN_REASSESSMENT_BOUNDARY_REQUIRED',
  'AUTHOR_TITLE_AND_2001_APPEARANCE_BASIS_MUST_BE_SEPARATELY_BOUND',
  'PUBLICATION_OR_EXPLICIT_NONFORMAL_IDENTITY_METADATA_MUST_NOT_BE_INVENTED',
  'REPRODUCIBLE_2001_WITNESS_LOCATOR_REQUIRED',
  'EDITION_PRINTING_OR_REPRESENTATION_IDENTITY_MUST_BE_RECORDED_WHERE_OBSERVABLE',
  'DIRECT_2001_TARGET_SCOPE_CONTENT_WITNESS_REQUIRED',
  'SUMMARY_PARAPHRASE_OR_THIRD_PARTY_QUOTATION_ALONE_CANNOT_ESTABLISH_TARGET_PASSAGE_BINDING',
  '2001_TO_2003_TARGET_PASSAGE_COMPARISON_REQUIRED_WITH_MATCH_TYPE_RECORDED',
  'TARGET_PASSAGE_CONTEXT_ANCHOR_REQUIRED_WHERE_OBSERVABLE',
  'DUPLICATE_AND_DERIVATIVE_DIGITAL_WITNESS_NORMALIZATION_REQUIRED',
  'PAGE_COUNT_FILE_SIZE_OR_FILENAME_VARIANCE_ALONE_MUST_NOT_CREATE_DISTINCT_EDITION_IDENTITY',
  'SAME_AUTHOR_2001_TO_2003_DOCTRINAL_DEPENDENCY_MUST_REMAIN_BOUND',
  'THREE_EXTERNAL_TARGET_LINEAGE_QUESTIONS_MUST_REMAIN_UNRESOLVED_UNLESS_DIRECT_EVIDENCE_RESOLVES_THEM',
  'NO_REBINDING_INDEPENDENCE_SELECTION_REGISTRATION_MUTATION_REEVALUATION_OR_POLICY_EXECUTION_AT_READINESS_STAGE',
] as const);

export type I193AcquisitionControlId = (typeof I193_ACQUISITION_CONTROL_IDS)[number];

export const I193_EVIDENCE_FUNCTION_IDS = Object.freeze([
  'AUTHOR_TITLE_YEAR_APPEARANCE_BASIS',
  'PUBLICATION_MEDIUM_OR_EXPLICIT_NONFORMAL_STATUS_IDENTITY',
  'REPRODUCIBLE_2001_WITNESS_IDENTITY',
  'EDITION_PRINTING_OR_REPRESENTATION_IDENTITY',
  'DIRECT_2001_TARGET_SCOPE_CONTENT_WITNESS',
  'TARGET_PASSAGE_2001_TO_2003_COMPARISON',
  'DUPLICATE_VARIANT_NORMALIZATION_METADATA',
  'SAME_AUTHOR_DEPENDENCY_PROVENANCE_PRESERVATION',
] as const);

export type I193EvidenceFunctionId = (typeof I193_EVIDENCE_FUNCTION_IDS)[number];

export const I193_ACQUISITION_PATH_IDS = Object.freeze([
  'INSTITUTIONAL_OR_LIBRARY_BIBLIOGRAPHIC_IDENTITY_PATH',
  'DIRECT_SCAN_TITLE_COPYRIGHT_IMPRINT_COLOPHON_PATH',
  'DIRECT_FULL_OR_SECTION_LEVEL_2001_WITNESS_PATH',
  '2001_TO_2003_COMPARATIVE_TARGET_PASSAGE_PATH',
] as const);

export type I193AcquisitionPathId = (typeof I193_ACQUISITION_PATH_IDS)[number];

export interface I193QuWei2001PriorWitnessIdentityTargetPassageAcquisitionReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_ACQUISITION_READINESS_REVIEW'
    | 'I192_ORIGIN_REASSESSMENT_BOUNDARY_INVALID';
  decision:
    | 'I192_BOUNDARY_SUPPORTS_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_AND_TARGET_PASSAGE_ACQUISITION_FOUR_PATHS_EIGHT_EVIDENCE_FUNCTIONS_FROZEN_NO_REBINDING_NO_INDEPENDENCE'
    | 'QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_ACQUISITION_NOT_READY';
  upstreamI192ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI192BoundaryAccepted: boolean;
  targetPriorWitnessId: 'QU_WEI_SIZHU_XIANGZHEN_2001' | null;
  targetAuthor: '曲炜' | null;
  targetTitle: '《四柱详真》' | null;
  targetAppearanceYear: 2001 | null;
  targetAppearanceBasisMustBeEvidenceBound: boolean;
  formalPublisherOrIsbnRequiredUnconditionally: false;
  formalPublicationIdentityPathPermitted: boolean;
  explicitNonformalPublicationIdentityPathPermitted: boolean;
  unknownPublicationStatusMayBePromotedToFormalPublication: false;
  chronologyAloneEstablishesPublicationMedium: false;
  chronologyAloneEstablishesIndependence: false;
  reproducible2001WitnessLocatorRequired: boolean;
  editionPrintingOrRepresentationIdentityRequiredWhereObservable: boolean;
  direct2001TargetScopeContentWitnessRequired: boolean;
  thirdPartyQuotationAloneEstablishesTargetPassageBinding: false;
  summaryOrParaphraseAloneEstablishesTargetPassageBinding: false;
  targetPassage2001To2003ComparisonRequired: boolean;
  comparisonMustRecordMatchTypeWithoutPrejudgingOutcome: boolean;
  exactVerbatimMatchPresupposedByThisGate: false;
  doctrinalAntecedentAloneAutomaticallyEqualsExactPassageIdentity: false;
  targetPassageContextAnchorRequiredWhereObservable: boolean;
  duplicateDigitalWitnessNormalizationRequired: boolean;
  pageCountFileSizeOrFilenameVarianceAloneCreatesDistinctEditionIdentity: false;
  derivativeDigitalCopiesMayBeCountedAsIndependentAuthorities: false;
  sameAuthor2001To2003DoctrinalDependencyMustRemainBound: boolean;
  externalTargetLineageUnresolvedQuestionCountMustRemainThreeAbsentDirectResolution: boolean;
  acquisitionControlIds: readonly I193AcquisitionControlId[];
  acquisitionControlCount: 14;
  acquisitionControlsFrozenProspectively: boolean;
  evidenceFunctionIds: readonly I193EvidenceFunctionId[];
  evidenceFunctionCount: 8;
  acquisitionPathIds: readonly I193AcquisitionPathId[];
  acquisitionPathCount: 4;
  acquisitionPathsFrozenProspectively: boolean;
  priorWitnessIdentityAndTargetPassageAcquisitionEvidenceMayProceed: boolean;
  authorizationIsIdentityAndTargetPassageEvidenceCollection: boolean;
  acquisitionExecutedByThisGate: false;
  evidenceAcquiredByThisGate: false;
  authorizationIsEvidenceRebinding: false;
  authorizationIsCandidateReplacement: false;
  authorizationIsCandidateSelection: false;
  authorizationIsCandidateRegistration: false;
  evidenceRebindingMethodologicallyReady: false;
  evidenceRebindingAuthorizedByThisGate: false;
  evidenceRebindingExecutedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  newCandidateSetVersionCreatedByThisGate: false;
  newInputPackageVersionCreatedByThisGate: false;
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
  searchSilenceCreatesNegativeFinding: false;
  absenceOfTargetPassageEvidenceEstablishesIndependence: false;
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE' | 'NOT_ASSESSED';
  candidateSetReevaluationAuthorizedByThisGate: false;
  candidateSetAdmissibilityEstablishedByThisGate: false;
  liSameTargetDirectPrimaryPathRemainsMethodologicallyOpen: boolean;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_ACQUISITION_EVIDENCE'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_ACQUISITION_READINESS_REVIEW';
  notes: readonly string[];
}

function exactI192Accepted(
  i192: I192QuWeiLineageEvidenceAdequacyOriginReassessmentReviewReport,
): boolean {
  return (
    i192.status === 'RESOLVED_QU_WEI_LINEAGE_EVIDENCE_ADEQUACY_ORIGIN_REASSESSMENT_REVIEW' &&
    i192.decision ===
      'I191_LINEAGE_EVIDENCE_ADEQUATE_TO_RETIRE_QU_WEI_2003_AS_PRESUMED_ORIGIN_PRIOR_2001_SIZHU_XIANGZHEN_WITNESS_IDENTITY_AND_TARGET_PASSAGE_ACQUISITION_READINESS_MAY_PROCEED_NO_REBINDING_NO_INDEPENDENCE_THREE_EXTERNAL_TARGET_LINEAGE_QUESTIONS_REMAIN_UNRESOLVED' &&
    i192.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i192.policyVersion === 'v1-definition' &&
    i192.adoptionVersion === 'v1-adoption' &&
    i192.currentCandidateSetVersion === 'v1-candidate-set' &&
    i192.currentInputPackageVersion === 'v2-input-package' &&
    i192.exactI191BoundaryAccepted &&
    i192.i191LineageEvidenceAdequateForOriginReassessment &&
    i192.priorSameAuthorDoctrinalDependencyAccepted &&
    i192.priorSameAuthorDependencyFindingCountAccepted === 1 &&
    i192.unresolvedExternalTargetLineageQuestionCount === 3 &&
    i192.quWei2003PresumedOriginRetired &&
    i192.quWei2003MayRemainPresumedOrigin === false &&
    i192.quWei2003IndependentNormativeProvenanceEstablished === false &&
    i192.prior2001WitnessIdentified &&
    i192.prior2001WitnessId === 'QU_WEI_SIZHU_XIANGZHEN_2001' &&
    i192.prior2001WitnessTitle === '《四柱详真》' &&
    i192.prior2001WitnessAuthor === '曲炜' &&
    i192.prior2001WitnessYear === 2001 &&
    i192.prior2001WitnessChronologyEstablished &&
    i192.prior2001WitnessContainsDistanceSensitiveDoctrine &&
    i192.prior2001WitnessContainsAdjacentVsGapForceDifferentiation &&
    i192.prior2001WitnessContainsCrossPillarRestriction &&
    i192.prior2001WitnessContainsGapClashNoEffectiveForceRule &&
    i192.exact2003PassageVerbatimIn2001Established === false &&
    i192.prior2001FormalPublicationIdentityComplete === false &&
    i192.prior2001ReproducibleWitnessIdentityComplete === false &&
    i192.prior2001ExactTargetPassageBindingComplete === false &&
    i192.prior2001MayBeTreatedAsIndependentBecauseEarlier === false &&
    i192.prior2001MayBeReboundByThisGate === false &&
    i192.prior2001IdentityAndTargetPassageAcquisitionReadinessReviewAuthorizedByThisGate &&
    i192.prior2001IdentityAndTargetPassageAcquisitionExecutedByThisGate === false &&
    i192.prior2001EvidenceRebindingMethodologicallyReady === false &&
    i192.prior2001EvidenceRebindingAuthorizedByThisGate === false &&
    i192.prior2001EvidenceRebindingExecutedByThisGate === false &&
    i192.liHanchenTargetDependencyStillUnresolved &&
    i192.liHongchengTargetDependencyStillUnresolved &&
    i192.otherEarlierDistinctiveSourceRelationshipStillUnresolved &&
    i192.thirdPartySuccessionClaimAloneEstablishesDerivativeEdge === false &&
    i192.generalTeacherRelationshipAloneEstablishesTargetScopeDependency === false &&
    i192.chronologyAloneEstablishesTargetScopeDependency === false &&
    i192.absenceOfDependencyEvidenceEstablishesIndependence === false &&
    i192.explicitDerivativeRelationshipCheckRequired &&
    i192.derivativeRetransmissionCountsAsIndependentAuthority === false &&
    i192.unresolvedLineageDefaultDisposition === 'REJECT_INDEPENDENCE_CLAIM' &&
    i192.provenanceIndependenceAdjudicatedByThisGate === false &&
    i192.independentNormativeProvenanceEstablishedCount === 0 &&
    i192.candidateSelectedByThisGate === false &&
    i192.candidateRegistrationAuthorizedByThisGate === false &&
    i192.candidateSetMutatedByThisGate === false &&
    i192.candidateSetReevaluationAuthorizedByThisGate === false &&
    i192.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i192.newCandidateSetVersionCreatedByThisGate === false &&
    i192.newInputPackageVersionCreatedByThisGate === false &&
    i192.currentV2PackageAndCandidateSetRemainImmutable &&
    i192.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i192.liSameTargetDirectPrimaryPathRemainsMethodologicallyOpen &&
    i192.liSameTargetPathSuspendedNotRetired &&
    i192.liSameTargetMayReopenOnMateriallyNewDirectLead &&
    i192.liPublicationMediumOrEntityGapStillOpen &&
    i192.liCanonicalDigitalWitnessNormalizationGapStillOpen &&
    i192.li1998WitnessIndependentProvenanceEstablished === false &&
    i192.targetedDiscoveryExhaustionEstablished === false &&
    i192.corpusExhaustionEstablished === false &&
    i192.searchSilenceCreatesNegativeFinding === false &&
    i192.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i192.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i192.sourceClassAloneSufficient === false &&
    i192.sourceCountMayBecomeNumericWeight === false &&
    i192.provenanceTierMayBecomeNumericWeight === false &&
    i192.evidenceRebindingMethodologicallyReady === false &&
    i192.evidenceRebindingAuthorizedByThisGate === false &&
    i192.productionPolicyExecutionAuthorized === false &&
    i192.actualCompositionPerformedByThisGate === false &&
    i192.multiSourceCompositionAuthorized === false &&
    i192.authorityAcquiredByThisGate === false &&
    i192.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i192.thresholdRuleCreatedByThisGate === false &&
    i192.damageEvaluationAuthorized === false &&
    i192.classificationAuthorized === false &&
    i192.numericScoringAuthorized === false &&
    i192.hiddenStemInteractionEligibilityGapRemains &&
    i192.hiddenStemAuthorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i192.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_ACQUISITION_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<I193QuWei2001PriorWitnessIdentityTargetPassageAcquisitionReadinessReviewReport, 'reviewId'>,
): I193QuWei2001PriorWitnessIdentityTargetPassageAcquisitionReadinessReviewReport {
  return {
    reviewId: `i193_qu_wei_2001_witness_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI193QuWei2001PriorWitnessIdentityTargetPassageAcquisitionReadinessReview(
  i192: I192QuWeiLineageEvidenceAdequacyOriginReassessmentReviewReport,
): I193QuWei2001PriorWitnessIdentityTargetPassageAcquisitionReadinessReviewReport {
  const accepted = exactI192Accepted(i192);

  return finalized({
    reviewVersion: I193_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_ACQUISITION_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_ACQUISITION_READINESS_REVIEW'
      : 'I192_ORIGIN_REASSESSMENT_BOUNDARY_INVALID',
    decision: accepted
      ? 'I192_BOUNDARY_SUPPORTS_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_AND_TARGET_PASSAGE_ACQUISITION_FOUR_PATHS_EIGHT_EVIDENCE_FUNCTIONS_FROZEN_NO_REBINDING_NO_INDEPENDENCE'
      : 'QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_ACQUISITION_NOT_READY',
    upstreamI192ReviewId: i192.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI192BoundaryAccepted: accepted,
    targetPriorWitnessId: accepted ? 'QU_WEI_SIZHU_XIANGZHEN_2001' : null,
    targetAuthor: accepted ? '曲炜' : null,
    targetTitle: accepted ? '《四柱详真》' : null,
    targetAppearanceYear: accepted ? 2001 : null,
    targetAppearanceBasisMustBeEvidenceBound: accepted,
    formalPublisherOrIsbnRequiredUnconditionally: false,
    formalPublicationIdentityPathPermitted: accepted,
    explicitNonformalPublicationIdentityPathPermitted: accepted,
    unknownPublicationStatusMayBePromotedToFormalPublication: false,
    chronologyAloneEstablishesPublicationMedium: false,
    chronologyAloneEstablishesIndependence: false,
    reproducible2001WitnessLocatorRequired: accepted,
    editionPrintingOrRepresentationIdentityRequiredWhereObservable: accepted,
    direct2001TargetScopeContentWitnessRequired: accepted,
    thirdPartyQuotationAloneEstablishesTargetPassageBinding: false,
    summaryOrParaphraseAloneEstablishesTargetPassageBinding: false,
    targetPassage2001To2003ComparisonRequired: accepted,
    comparisonMustRecordMatchTypeWithoutPrejudgingOutcome: accepted,
    exactVerbatimMatchPresupposedByThisGate: false,
    doctrinalAntecedentAloneAutomaticallyEqualsExactPassageIdentity: false,
    targetPassageContextAnchorRequiredWhereObservable: accepted,
    duplicateDigitalWitnessNormalizationRequired: accepted,
    pageCountFileSizeOrFilenameVarianceAloneCreatesDistinctEditionIdentity: false,
    derivativeDigitalCopiesMayBeCountedAsIndependentAuthorities: false,
    sameAuthor2001To2003DoctrinalDependencyMustRemainBound: accepted,
    externalTargetLineageUnresolvedQuestionCountMustRemainThreeAbsentDirectResolution: accepted,
    acquisitionControlIds: I193_ACQUISITION_CONTROL_IDS,
    acquisitionControlCount: 14,
    acquisitionControlsFrozenProspectively: accepted,
    evidenceFunctionIds: I193_EVIDENCE_FUNCTION_IDS,
    evidenceFunctionCount: 8,
    acquisitionPathIds: I193_ACQUISITION_PATH_IDS,
    acquisitionPathCount: 4,
    acquisitionPathsFrozenProspectively: accepted,
    priorWitnessIdentityAndTargetPassageAcquisitionEvidenceMayProceed: accepted,
    authorizationIsIdentityAndTargetPassageEvidenceCollection: accepted,
    acquisitionExecutedByThisGate: false,
    evidenceAcquiredByThisGate: false,
    authorizationIsEvidenceRebinding: false,
    authorizationIsCandidateReplacement: false,
    authorizationIsCandidateSelection: false,
    authorizationIsCandidateRegistration: false,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    newCandidateSetVersionCreatedByThisGate: false,
    newInputPackageVersionCreatedByThisGate: false,
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
    searchSilenceCreatesNegativeFinding: false,
    absenceOfTargetPassageEvidenceEstablishesIndependence: false,
    currentV2PackageAndCandidateSetRemainImmutable: accepted,
    currentV2ProvenanceDisposition: accepted ? 'BLOCKED_UNDER_CURRENT_EVIDENCE' : 'NOT_ASSESSED',
    candidateSetReevaluationAuthorizedByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false,
    liSameTargetDirectPrimaryPathRemainsMethodologicallyOpen: accepted,
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_ACQUISITION_EVIDENCE'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_ACQUISITION_READINESS_REVIEW',
    notes: Object.freeze([
      'This readiness gate freezes acquisition requirements only; it does not acquire or rebind evidence.',
      'A direct 2001 content witness is required before target-passage correspondence can be adjudicated.',
      'The later 2003 lecture witness remains derivative-risk context and is not independent merely because the 2001 work is earlier.',
      'Publication identity, witness identity, target-passage correspondence, and digital normalization are separate evidence functions.',
      'Match type must be observed rather than assumed: verbatim, near-verbatim, doctrine-level antecedent, mismatch, or unresolved may be recorded later.',
    ]),
  });
}
