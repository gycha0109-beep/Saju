import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I172LiLineageEvidenceRemediationReassessmentReviewReport } from './i172-li-lineage-evidence-remediation-reassessment-review.js';

export const I173_LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_READINESS_REVIEW_VERSION =
  'myeonghwa-li-1998-prior-witness-identity-acquisition-readiness-review-v1';

export const I173_IDENTITY_ACQUISITION_CONTROL_IDS = Object.freeze([
  'EXACT_I172_REASSESSMENT_BOUNDARY_REQUIRED',
  'AUTHOR_TITLE_AND_1998_APPEARANCE_BASIS_MUST_BE_SEPARATELY_BOUND',
  'FORMAL_PUBLICATION_METADATA_MUST_NOT_BE_INVENTED_WHEN_ABSENT',
  'EXPLICIT_NONFORMAL_PUBLICATION_STATUS_MAY_BE_RECORDED_AS_IDENTITY_METADATA',
  'REPRODUCIBLE_PUBLIC_WITNESS_LOCATOR_REQUIRED',
  'TARGET_CHAPTER_OR_PASSAGE_WITNESS_INTEGRITY_REQUIRED',
  'TARGET_PASSAGE_MATCH_TO_2004_WITNESS_REQUIRED',
  'DUPLICATE_AND_DERIVATIVE_DIGITAL_WITNESS_NORMALIZATION_REQUIRED',
  'DIGITAL_PAGE_COUNT_MISMATCH_MUST_NOT_ALONE_CREATE_DISTINCT_WORK_IDENTITY',
  'SAME_AUTHOR_DERIVATIVE_CHAIN_BINDING_MUST_BE_PRESERVED',
  'EXTERNAL_LINEAGE_UNRESOLVED_STATUS_MUST_BE_PRESERVED',
  'NO_INDEPENDENCE_REBINDING_SELECTION_MUTATION_OR_REEVALUATION_AT_IDENTITY_ACQUISITION_STAGE',
] as const);

export type I173IdentityAcquisitionControlId =
  (typeof I173_IDENTITY_ACQUISITION_CONTROL_IDS)[number];

export const I173_IDENTITY_EVIDENCE_FUNCTION_IDS = Object.freeze([
  'AUTHOR_OFFICIAL_CHRONOLOGY_OR_BIBLIOGRAPHIC_APPEARANCE_BASIS',
  'PUBLICATION_MEDIUM_OR_EXPLICIT_NONFORMAL_STATUS_METADATA',
  'REPRODUCIBLE_DIGITAL_OR_PHYSICAL_WITNESS_IDENTITY',
  'TARGET_CHAPTER_OR_PASSAGE_CONTENT_WITNESS',
  'SAME_AUTHOR_1998_TO_2004_DERIVATIVE_MATCH_EVIDENCE',
  'DUPLICATE_WITNESS_NORMALIZATION_METADATA',
] as const);

export type I173IdentityEvidenceFunctionId =
  (typeof I173_IDENTITY_EVIDENCE_FUNCTION_IDS)[number];

export const I173_PUBLICATION_IDENTITY_PATH_IDS = Object.freeze([
  'FORMAL_PUBLICATION_IDENTITY_PATH',
  'EXPLICIT_NONFORMAL_PUBLICATION_IDENTITY_PATH',
] as const);

export type I173PublicationIdentityPathId =
  (typeof I173_PUBLICATION_IDENTITY_PATH_IDS)[number];

export interface I173Li1998PriorWitnessIdentityAcquisitionReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_READINESS_REVIEW'
    | 'I172_REASSESSMENT_BOUNDARY_INVALID';
  decision:
    | 'I172_BOUNDARY_SUPPORTS_LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_WITH_FORMAL_OR_EXPLICIT_NONFORMAL_PUBLICATION_PATHS_DUPLICATE_WITNESS_NORMALIZATION_REQUIRED_NO_REBINDING_NO_INDEPENDENCE'
    | 'LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_NOT_READY';
  upstreamI172ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI172BoundaryAccepted: boolean;
  targetPriorWitnessId: 'LI_SHUNXIANG_SIZHU_MINGLI_ZIXIU_JIAOCHENG_PUJIBAN_1998' | null;
  targetAuthor: '李顺祥' | null;
  targetTitle: '四柱命理学自修教程（普及班）' | null;
  targetAppearanceYear: 1998 | null;
  targetAppearanceBasisMustBeEvidenceBound: boolean;
  formalPublisherOrIsbnRequiredUnconditionally: false;
  formalPublicationIdentityPathPermitted: boolean;
  explicitNonformalPublicationIdentityPathPermitted: boolean;
  explicitNonformalStatusMaySubstituteForInventedPublisherMetadata: boolean;
  unknownPublicationStatusMayBePromotedToFormalPublication: false;
  authorOfficialChronologyMaySupportAppearanceBasis: boolean;
  authorOfficialChronologyAloneEstablishesPublicationMedium: false;
  authorOfficialChronologyAloneEstablishesIndependence: false;
  reproduciblePublicWitnessLocatorRequired: boolean;
  targetChapterOrPassageWitnessIntegrityRequired: boolean;
  targetPassageMatchTo2004WitnessRequired: boolean;
  duplicateDigitalWitnessNormalizationRequired: boolean;
  digitalPageCountMismatchAloneCreatesDistinctWorkIdentity: false;
  derivativeDigitalCopiesMayBeCountedAsIndependentAuthorities: false;
  sameAuthor1998To2004DerivativeChainMustRemainBound: boolean;
  externalLineageUnresolvedStatusMustRemainPreserved: boolean;
  identityAcquisitionControlIds: readonly I173IdentityAcquisitionControlId[];
  identityAcquisitionControlCount: 12;
  identityAcquisitionControlsFrozenProspectively: boolean;
  identityEvidenceFunctionIds: readonly I173IdentityEvidenceFunctionId[];
  identityEvidenceFunctionCount: 6;
  publicationIdentityPathIds: readonly I173PublicationIdentityPathId[];
  publicationIdentityPathCount: 2;
  priorWitnessIdentityAcquisitionEvidenceMayProceed: boolean;
  authorizationIsIdentityEvidenceCollection: boolean;
  authorizationIsEvidenceRebinding: false;
  authorizationIsCandidateReplacement: false;
  authorizationIsCandidateSelection: false;
  authorizationIsRemediationExecution: false;
  evidenceRebindingSelectedByThisGate: false;
  evidenceRebindingExecutedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  newCandidateSetVersionCreatedByThisGate: false;
  newInputPackageVersionCreatedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  independentNormativeProvenanceEstablishedCount: 0;
  I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  chronologyAloneEstablishesIdentityOrIndependence: false;
  sameAuthorIdentityAloneEstablishesIndependence: false;
  publicationFormalityAloneEstablishesIndependence: false;
  searchSilenceCreatesNegativeFinding: false;
  sourceCountVotingAllowed: false;
  provenanceTierWeightingAllowed: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_EVIDENCE'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_READINESS_REVIEW';
  notes: readonly string[];
}

function exactI172Accepted(i172: I172LiLineageEvidenceRemediationReassessmentReviewReport): boolean {
  return (
    i172.status === 'RESOLVED_LI_LINEAGE_EVIDENCE_REMEDIATION_REASSESSMENT_REVIEW' &&
    i172.decision ===
      'I171_LINEAGE_EVIDENCE_ADEQUATE_TO_RETIRE_2004_AS_PRESUMED_ORIGIN_PRIOR_1998_WITNESS_IDENTITY_ACQUISITION_READINESS_MAY_PROCEED_NO_REBINDING_NO_INDEPENDENCE_THREE_EXTERNAL_LINEAGE_QUESTIONS_REMAIN_UNRESOLVED' &&
    i172.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i172.policyVersion === 'v1-definition' &&
    i172.adoptionVersion === 'v1-adoption' &&
    i172.currentCandidateSetVersion === 'v1-candidate-set' &&
    i172.currentInputPackageVersion === 'v2-input-package' &&
    i172.exactI171BoundaryAccepted &&
    i172.I171EvidenceAdequateToRecordPriorSameAuthorDependency &&
    i172.I171EvidenceAdequateToEstablishIndependentNormativeProvenance === false &&
    i172.derivativeDependencyFoundCount === 1 &&
    i172.unresolvedExternalLineageQuestionCount === 3 &&
    i172.explicitNegativeDerivativeFindingCount === 0 &&
    i172.independentNormativeProvenanceEstablishedCount === 0 &&
    i172.current2004WitnessRecordId === 'LI_SHUNXIANG_SIZHU_XUANJI_2004' &&
    i172.current2004WitnessPresumedNormativeOriginStatus ===
      'RETIRED_AS_PRESUMED_ORIGIN_PRIOR_SAME_AUTHOR_WITNESS_LOCATED' &&
    i172.current2004WitnessMayRemainNewProvenanceCandidateWithoutReassessment === false &&
    i172.prior1998WitnessId === 'LI_SHUNXIANG_SIZHU_MINGLI_ZIXIU_JIAOCHENG_PUJIBAN_1998' &&
    i172.prior1998WitnessStatus ===
      'PRIOR_SAME_AUTHOR_WITNESS_IDENTITY_ACQUISITION_REQUIRED_BEFORE_REBINDING' &&
    i172.prior1998WitnessIsNewIndependentProvenanceIdentity === false &&
    i172.prior1998WitnessIndependenceFromChenShaoLineageEstablished === false &&
    i172.ChenYuanSelectedSetDependencyRemainsUnresolved &&
    i172.ShaoResearchCenterSpecificDependencyRemainsUnresolved &&
    i172.ZhangZhichunTargetRuleAuthorshipRemainsUnresolved &&
    i172.reassessmentRequirementCount === 10 &&
    i172.reassessmentRequirementsFrozen &&
    i172.priorWitnessIdentityRequirementCount === 8 &&
    i172.priorWitnessIdentityRequirementsFrozenProspectively &&
    i172.priorWitnessIdentityAcquisitionReadinessReviewMethodologicallyJustified &&
    i172.priorWitnessIdentityAcquisitionReadinessReviewAuthorized &&
    i172.authorizationIsIdentityAcquisition === false &&
    i172.authorizationIsEvidenceRebinding === false &&
    i172.authorizationIsCandidateReplacement === false &&
    i172.authorizationIsCandidateSelection === false &&
    i172.authorizationIsRemediationExecution === false &&
    i172.currentNewProvenanceAcquisitionVia2004WitnessDisposition ===
      'NOT_SUCCESSFUL_AS_NEW_ORIGIN_PRIOR_SAME_AUTHOR_WITNESS_LOCATED' &&
    i172.evidenceRebindingPathNowMethodologicallyRelevant &&
    i172.evidenceRebindingSelectedByThisGate === false &&
    i172.evidenceRebindingExecutedByThisGate === false &&
    i172.candidateSetMutatedByThisGate === false &&
    i172.newCandidateSetVersionCreatedByThisGate === false &&
    i172.newInputPackageVersionCreatedByThisGate === false &&
    i172.provenanceIndependenceAdjudicatedByThisGate === false &&
    i172.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate === false &&
    i172.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i172.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i172.chronologyAloneEstablishesPriorWitnessIdentityOrIndependence === false &&
    i172.sameAuthorIdentityAloneEstablishesIndependence === false &&
    i172.searchSilenceCreatesNegativeFinding === false &&
    i172.sourceCountVotingAllowed === false &&
    i172.provenanceTierWeightingAllowed === false &&
    i172.currentV2PackageAndCandidateSetRemainImmutable &&
    i172.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i172.candidateSetReevaluationAuthorizedByThisGate === false &&
    i172.candidateSetReevaluationPerformedByThisGate === false &&
    i172.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i172.productionPolicyExecutionAuthorized === false &&
    i172.actualCompositionPerformedByThisGate === false &&
    i172.multiSourceCompositionAuthorized === false &&
    i172.authorityAcquiredByThisGate === false &&
    i172.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i172.thresholdRuleCreatedByThisGate === false &&
    i172.damageEvaluationAuthorized === false &&
    i172.classificationAuthorized === false &&
    i172.numericScoringAuthorized === false &&
    i172.hiddenStemInteractionEligibilityGapRemains &&
    i172.hiddenStemAuthorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i172.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<I173Li1998PriorWitnessIdentityAcquisitionReadinessReviewReport, 'reviewId'>,
): I173Li1998PriorWitnessIdentityAcquisitionReadinessReviewReport {
  return {
    reviewId: `i173_li_1998_prior_witness_identity_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI173Li1998PriorWitnessIdentityAcquisitionReadinessReview(
  i172: I172LiLineageEvidenceRemediationReassessmentReviewReport,
): I173Li1998PriorWitnessIdentityAcquisitionReadinessReviewReport {
  const accepted = exactI172Accepted(i172);

  return finalized({
    reviewVersion: I173_LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_READINESS_REVIEW'
      : 'I172_REASSESSMENT_BOUNDARY_INVALID',
    decision: accepted
      ? 'I172_BOUNDARY_SUPPORTS_LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_WITH_FORMAL_OR_EXPLICIT_NONFORMAL_PUBLICATION_PATHS_DUPLICATE_WITNESS_NORMALIZATION_REQUIRED_NO_REBINDING_NO_INDEPENDENCE'
      : 'LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_NOT_READY',
    upstreamI172ReviewId: i172.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI172BoundaryAccepted: accepted,
    targetPriorWitnessId: accepted ? 'LI_SHUNXIANG_SIZHU_MINGLI_ZIXIU_JIAOCHENG_PUJIBAN_1998' : null,
    targetAuthor: accepted ? '李顺祥' : null,
    targetTitle: accepted ? '四柱命理学自修教程（普及班）' : null,
    targetAppearanceYear: accepted ? 1998 : null,
    targetAppearanceBasisMustBeEvidenceBound: accepted,
    formalPublisherOrIsbnRequiredUnconditionally: false,
    formalPublicationIdentityPathPermitted: accepted,
    explicitNonformalPublicationIdentityPathPermitted: accepted,
    explicitNonformalStatusMaySubstituteForInventedPublisherMetadata: accepted,
    unknownPublicationStatusMayBePromotedToFormalPublication: false,
    authorOfficialChronologyMaySupportAppearanceBasis: accepted,
    authorOfficialChronologyAloneEstablishesPublicationMedium: false,
    authorOfficialChronologyAloneEstablishesIndependence: false,
    reproduciblePublicWitnessLocatorRequired: accepted,
    targetChapterOrPassageWitnessIntegrityRequired: accepted,
    targetPassageMatchTo2004WitnessRequired: accepted,
    duplicateDigitalWitnessNormalizationRequired: accepted,
    digitalPageCountMismatchAloneCreatesDistinctWorkIdentity: false,
    derivativeDigitalCopiesMayBeCountedAsIndependentAuthorities: false,
    sameAuthor1998To2004DerivativeChainMustRemainBound: accepted,
    externalLineageUnresolvedStatusMustRemainPreserved: accepted,
    identityAcquisitionControlIds: I173_IDENTITY_ACQUISITION_CONTROL_IDS,
    identityAcquisitionControlCount: 12,
    identityAcquisitionControlsFrozenProspectively: accepted,
    identityEvidenceFunctionIds: I173_IDENTITY_EVIDENCE_FUNCTION_IDS,
    identityEvidenceFunctionCount: 6,
    publicationIdentityPathIds: I173_PUBLICATION_IDENTITY_PATH_IDS,
    publicationIdentityPathCount: 2,
    priorWitnessIdentityAcquisitionEvidenceMayProceed: accepted,
    authorizationIsIdentityEvidenceCollection: accepted,
    authorizationIsEvidenceRebinding: false,
    authorizationIsCandidateReplacement: false,
    authorizationIsCandidateSelection: false,
    authorizationIsRemediationExecution: false,
    evidenceRebindingSelectedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    newCandidateSetVersionCreatedByThisGate: false,
    newInputPackageVersionCreatedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    independentNormativeProvenanceEstablishedCount: 0,
    I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: accepted,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    chronologyAloneEstablishesIdentityOrIndependence: false,
    sameAuthorIdentityAloneEstablishesIndependence: false,
    publicationFormalityAloneEstablishesIndependence: false,
    searchSilenceCreatesNegativeFinding: false,
    sourceCountVotingAllowed: false,
    provenanceTierWeightingAllowed: false,
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_EVIDENCE'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_READINESS_REVIEW',
    notes: accepted
      ? Object.freeze([
          'The 1998 prior same-author work may be investigated as a reproducible witness identity, but earlier chronology is not independence.',
          'Formal publisher/ISBN metadata is one possible identity path, not an unconditional requirement when the work may have circulated as a nonformal/internal publication.',
          'If formal metadata is absent, explicit nonformal-publication status must be recorded rather than replaced with invented publisher metadata.',
          'Public digital copies with divergent page counts must be normalized as possible derivative witnesses before any work-level identity distinction is made.',
          'Identity acquisition evidence collection is authorized only for the bounded I173 functions; evidence rebinding and candidate mutation remain forbidden.',
        ])
      : Object.freeze([
          'I172 boundary mismatch prevents prior-witness identity acquisition evidence collection.',
        ]),
  });
}
