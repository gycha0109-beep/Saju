import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I174Li1998PriorWitnessIdentityAcquisitionEvidenceReport } from './i174-li-1998-prior-witness-identity-acquisition-evidence.js';

export const I175_LI_1998_IDENTITY_EVIDENCE_ADEQUACY_REBINDING_READINESS_REVIEW_VERSION =
  'myeonghwa-li-1998-identity-evidence-adequacy-rebinding-readiness-review-v1';

export const I175_ADEQUACY_REQUIREMENT_IDS = Object.freeze([
  'EXACT_I174_SIX_FUNCTION_FOUR_SATISFIED_TWO_UNRESOLVED_BOUNDARY_REQUIRED',
  'ALL_PRIOR_WITNESS_IDENTITY_REQUIREMENTS_REQUIRED_BEFORE_REBINDING',
  'PUBLICATION_MEDIUM_OR_ENTITY_IDENTITY_MUST_BE_RESOLVED_BEFORE_REBINDING',
  'CANONICAL_OR_NORMALIZED_WITNESS_IDENTITY_MUST_BE_RESOLVED_BEFORE_REBINDING',
  'LATER_2002_FORMAL_EDITION_MUST_NOT_BACKFILL_1998_METADATA',
  'AMBIGUOUS_DOWNLOAD_METADATA_MUST_NOT_ESTABLISH_1998_PUBLICATION_STATUS',
  'PUBLIC_CONTENT_WITNESS_SUFFICIENCY_DOES_NOT_EQUAL_REBINDING_SUFFICIENCY',
  'SAME_AUTHOR_DERIVATIVE_CHAIN_MUST_REMAIN_BOUND',
  'THREE_EXTERNAL_LINEAGE_QUESTIONS_REMAIN_UNRESOLVED',
  'NO_REBINDING_SELECTION_MUTATION_INDEPENDENCE_OR_REEVALUATION_AT_ADEQUACY_STAGE',
] as const);

export type I175AdequacyRequirementId = (typeof I175_ADEQUACY_REQUIREMENT_IDS)[number];

export const I175_TARGETED_GAP_IDS = Object.freeze([
  'LI_1998_PUBLICATION_MEDIUM_OR_ENTITY_IDENTITY_GAP',
  'LI_1998_CANONICAL_DIGITAL_WITNESS_NORMALIZATION_GAP',
] as const);

export type I175TargetedGapId = (typeof I175_TARGETED_GAP_IDS)[number];

export interface I175Li1998IdentityEvidenceAdequacyRebindingReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_LI_1998_IDENTITY_EVIDENCE_ADEQUACY_REBINDING_READINESS_REVIEW'
    | 'I174_IDENTITY_EVIDENCE_BOUNDARY_INVALID';
  decision:
    | 'LI_1998_IDENTITY_EVIDENCE_PARTIALLY_ADEQUATE_FOUR_OF_SIX_FUNCTIONS_SATISFIED_PUBLICATION_MEDIUM_AND_CANONICAL_WITNESS_NORMALIZATION_UNRESOLVED_REBINDING_NOT_READY_TARGETED_GAP_DISCOVERY_MAY_PROCEED_NO_INDEPENDENCE'
    | 'LI_1998_IDENTITY_EVIDENCE_ADEQUACY_REVIEW_NOT_READY';
  upstreamI174EvidenceRecordSetId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI174BoundaryAccepted: boolean;
  evaluatedIdentityFunctionCount: 6 | 0;
  satisfiedIdentityFunctionCount: 4 | 0;
  unresolvedIdentityFunctionCount: 2 | 0;
  partialIdentityEvidenceAdequacyEstablished: boolean;
  completeIdentityEvidenceAdequacyEstablished: false;
  authorTitleAppearanceBasisAdequate: boolean;
  reproducibleContentWitnessAdequate: boolean;
  targetPassageIntegrityAdequate: boolean;
  sameAuthorDerivativeMatchAdequate: boolean;
  publicationMediumOrEntityIdentityResolved: false;
  canonicalDigitalWitnessNormalizationResolved: false;
  later2002FormalEditionMayBackfill1998Metadata: false;
  ambiguousUploaderMetadataMayEstablish1998PublicationStatus: false;
  publicContentWitnessSufficiencyEqualsRebindingSufficiency: false;
  evidenceRebindingMethodologicallyReady: false;
  evidenceRebindingAuthorizedByThisGate: false;
  evidenceRebindingSelectedByThisGate: false;
  evidenceRebindingExecutedByThisGate: false;
  targetedGapIds: readonly I175TargetedGapId[];
  targetedGapCount: 2 | 0;
  targetedGapDiscoveryReadinessReviewMethodologicallyJustified: boolean;
  targetedGapDiscoveryReadinessReviewAuthorized: boolean;
  adequacyRequirementIds: readonly I175AdequacyRequirementId[];
  adequacyRequirementCount: 10;
  adequacyRequirementsFrozen: boolean;
  current2004WitnessPresumedOriginRetired: boolean;
  prior1998SameAuthorWitnessConfirmed: boolean;
  prior1998WitnessIndependentProvenanceEstablished: false;
  sameAuthor1998To2004DerivativeChainMustRemainBound: boolean;
  externalLineageUnresolvedQuestionCount: 3 | 0;
  externalLineageUnresolvedStatusPreserved: boolean;
  candidateSelectedByThisGate: false;
  remediationStrategySelectedByThisGate: false;
  remediationExecutionAuthorizedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  candidateRemovedByThisGate: false;
  candidateReplacedByThisGate: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_PUBLICATION_MEDIUM_CANONICAL_WITNESS_GAP_TARGETED_DISCOVERY_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_PRIOR_WITNESS_IDENTITY_EVIDENCE_ADEQUACY_AND_REBINDING_READINESS_REVIEW';
  notes: readonly string[];
}

function exactI174Accepted(i174: I174Li1998PriorWitnessIdentityAcquisitionEvidenceReport): boolean {
  const expectedFunctions = [
    'AUTHOR_OFFICIAL_CHRONOLOGY_OR_BIBLIOGRAPHIC_APPEARANCE_BASIS',
    'PUBLICATION_MEDIUM_OR_EXPLICIT_NONFORMAL_STATUS_METADATA',
    'REPRODUCIBLE_DIGITAL_OR_PHYSICAL_WITNESS_IDENTITY',
    'TARGET_CHAPTER_OR_PASSAGE_CONTENT_WITNESS',
    'SAME_AUTHOR_1998_TO_2004_DERIVATIVE_MATCH_EVIDENCE',
    'DUPLICATE_WITNESS_NORMALIZATION_METADATA',
  ];
  const expectedFindings = [
    'SATISFIED',
    'UNRESOLVED_AFTER_TARGETED_IDENTITY_DISCOVERY',
    'SATISFIED',
    'SATISFIED',
    'SATISFIED',
    'UNRESOLVED_AFTER_TARGETED_IDENTITY_DISCOVERY',
  ];

  return (
    i174.status === 'RESOLVED_LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_EVIDENCE' &&
    i174.decision ===
      'LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_EXECUTED_FOUR_FUNCTIONS_SATISFIED_TWO_UNRESOLVED_PUBLICATION_MEDIUM_AND_CANONICAL_WITNESS_NORMALIZATION_UNRESOLVED_NO_REBINDING_NO_INDEPENDENCE' &&
    i174.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i174.policyVersion === 'v1-definition' &&
    i174.adoptionVersion === 'v1-adoption' &&
    i174.currentCandidateSetVersion === 'v1-candidate-set' &&
    i174.currentInputPackageVersion === 'v2-input-package' &&
    i174.exactI173BoundaryAccepted &&
    i174.targetPriorWitnessId === 'LI_SHUNXIANG_SIZHU_MINGLI_ZIXIU_JIAOCHENG_PUJIBAN_1998' &&
    i174.identityEvidenceRecordCount === 6 &&
    i174.identityEvidenceRecords.length === 6 &&
    i174.identityEvidenceRecords.every((record, index) => record.functionId === expectedFunctions[index]) &&
    i174.identityEvidenceRecords.every((record, index) => record.finding === expectedFindings[index]) &&
    i174.satisfiedFunctionCount === 4 &&
    i174.unresolvedFunctionCount === 2 &&
    i174.authorTitleAnd1998AppearanceBasisEstablished &&
    i174.formal1998PublisherOrIsbnEstablished === false &&
    i174.explicitNonformal1998PublicationStatusEstablished === false &&
    i174.publicationMediumOrEntityIdentityEstablished === false &&
    i174.later2002FormalEditionObserved &&
    i174.later2002FormalEditionIsbn === '9789627943679' &&
    i174.later2002FormalEditionBackProjectedTo1998 === false &&
    i174.ambiguousUploaderFieldObserved &&
    i174.ambiguousUploaderFieldUsedAs1998PublicationStatus === false &&
    i174.publicReproducibleWitnessIdentityEstablished &&
    i174.targetChapterOrPassageWitnessIntegrityEstablished &&
    i174.targetPassageMatchTo2004WitnessEstablished &&
    i174.sameAuthor1998To2004DerivativeChainConfirmed &&
    i174.digitalWitnessVariantsObserved &&
    i174.canonicalDigitalWitnessNormalizationEstablished === false &&
    i174.digitalPageCountOrFileSizeDifferenceCreatesDistinctAuthority === false &&
    i174.derivativeDigitalCopiesCountAsIndependentAuthorities === false &&
    i174.identityEvidenceAdequateForImmediateRebindingByThisGate === false &&
    i174.evidenceRebindingSelectedByThisGate === false &&
    i174.evidenceRebindingExecutedByThisGate === false &&
    i174.candidateSelectedByThisGate === false &&
    i174.remediationStrategySelectedByThisGate === false &&
    i174.remediationExecutionAuthorizedByThisGate === false &&
    i174.candidateSetMutatedByThisGate === false &&
    i174.newCandidateSetVersionCreatedByThisGate === false &&
    i174.newInputPackageVersionCreatedByThisGate === false &&
    i174.provenanceIndependenceAdjudicatedByThisGate === false &&
    i174.independentNormativeProvenanceEstablishedCount === 0 &&
    i174.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate === false &&
    i174.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i174.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i174.chronologyAloneEstablishesIdentityOrIndependence === false &&
    i174.sameAuthorIdentityAloneEstablishesIndependence === false &&
    i174.publicationFormalityAloneEstablishesIndependence === false &&
    i174.searchSilenceCreatesNegativeFinding === false &&
    i174.sourceCountVotingAllowed === false &&
    i174.provenanceTierWeightingAllowed === false &&
    i174.externalLineageUnresolvedStatusPreserved &&
    i174.currentV2PackageAndCandidateSetRemainImmutable &&
    i174.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i174.candidateSetReevaluationAuthorizedByThisGate === false &&
    i174.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i174.productionPolicyExecutionAuthorized === false &&
    i174.actualCompositionPerformedByThisGate === false &&
    i174.multiSourceCompositionAuthorized === false &&
    i174.authorityAcquiredByThisGate === false &&
    i174.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i174.thresholdRuleCreatedByThisGate === false &&
    i174.damageEvaluationAuthorized === false &&
    i174.classificationAuthorized === false &&
    i174.numericScoringAuthorized === false &&
    i174.hiddenStemInteractionEligibilityGapRemains &&
    i174.hiddenStemAuthorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i174.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_PRIOR_WITNESS_IDENTITY_EVIDENCE_ADEQUACY_AND_REBINDING_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<I175Li1998IdentityEvidenceAdequacyRebindingReadinessReviewReport, 'reviewId'>,
): I175Li1998IdentityEvidenceAdequacyRebindingReadinessReviewReport {
  return {
    reviewId: `i175_li_1998_identity_adequacy_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI175Li1998IdentityEvidenceAdequacyRebindingReadinessReview(
  i174: I174Li1998PriorWitnessIdentityAcquisitionEvidenceReport,
): I175Li1998IdentityEvidenceAdequacyRebindingReadinessReviewReport {
  const accepted = exactI174Accepted(i174);

  return finalized({
    reviewVersion: I175_LI_1998_IDENTITY_EVIDENCE_ADEQUACY_REBINDING_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_LI_1998_IDENTITY_EVIDENCE_ADEQUACY_REBINDING_READINESS_REVIEW'
      : 'I174_IDENTITY_EVIDENCE_BOUNDARY_INVALID',
    decision: accepted
      ? 'LI_1998_IDENTITY_EVIDENCE_PARTIALLY_ADEQUATE_FOUR_OF_SIX_FUNCTIONS_SATISFIED_PUBLICATION_MEDIUM_AND_CANONICAL_WITNESS_NORMALIZATION_UNRESOLVED_REBINDING_NOT_READY_TARGETED_GAP_DISCOVERY_MAY_PROCEED_NO_INDEPENDENCE'
      : 'LI_1998_IDENTITY_EVIDENCE_ADEQUACY_REVIEW_NOT_READY',
    upstreamI174EvidenceRecordSetId: i174.evidenceRecordSetId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI174BoundaryAccepted: accepted,
    evaluatedIdentityFunctionCount: accepted ? 6 : 0,
    satisfiedIdentityFunctionCount: accepted ? 4 : 0,
    unresolvedIdentityFunctionCount: accepted ? 2 : 0,
    partialIdentityEvidenceAdequacyEstablished: accepted,
    completeIdentityEvidenceAdequacyEstablished: false,
    authorTitleAppearanceBasisAdequate: accepted,
    reproducibleContentWitnessAdequate: accepted,
    targetPassageIntegrityAdequate: accepted,
    sameAuthorDerivativeMatchAdequate: accepted,
    publicationMediumOrEntityIdentityResolved: false,
    canonicalDigitalWitnessNormalizationResolved: false,
    later2002FormalEditionMayBackfill1998Metadata: false,
    ambiguousUploaderMetadataMayEstablish1998PublicationStatus: false,
    publicContentWitnessSufficiencyEqualsRebindingSufficiency: false,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingSelectedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    targetedGapIds: accepted ? I175_TARGETED_GAP_IDS : Object.freeze([]),
    targetedGapCount: accepted ? 2 : 0,
    targetedGapDiscoveryReadinessReviewMethodologicallyJustified: accepted,
    targetedGapDiscoveryReadinessReviewAuthorized: accepted,
    adequacyRequirementIds: I175_ADEQUACY_REQUIREMENT_IDS,
    adequacyRequirementCount: 10,
    adequacyRequirementsFrozen: accepted,
    current2004WitnessPresumedOriginRetired: accepted,
    prior1998SameAuthorWitnessConfirmed: accepted,
    prior1998WitnessIndependentProvenanceEstablished: false,
    sameAuthor1998To2004DerivativeChainMustRemainBound: accepted,
    externalLineageUnresolvedQuestionCount: accepted ? 3 : 0,
    externalLineageUnresolvedStatusPreserved: accepted,
    candidateSelectedByThisGate: false,
    remediationStrategySelectedByThisGate: false,
    remediationExecutionAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateRemovedByThisGate: false,
    candidateReplacedByThisGate: false,
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_PUBLICATION_MEDIUM_CANONICAL_WITNESS_GAP_TARGETED_DISCOVERY_READINESS_REVIEW'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_PRIOR_WITNESS_IDENTITY_EVIDENCE_ADEQUACY_AND_REBINDING_READINESS_REVIEW',
    notes: accepted
      ? Object.freeze([
          'Four satisfied identity functions establish a meaningful prior-witness evidence package but do not satisfy the complete rebinding prerequisite.',
          'Publication-medium/entity identity and canonical-or-normalized digital-witness identity remain explicit blockers to rebinding readiness.',
          'The later 2002 formal edition and ambiguous uploader metadata may not be used to manufacture missing 1998 publication metadata.',
          'Only a bounded readiness review for the two unresolved identity gaps may proceed from I175.',
          'No evidence rebinding, candidate mutation, provenance-independence adjudication, threshold creation, or production authorization occurs here.',
        ])
      : Object.freeze([
          'I174 boundary mismatch prevents identity-evidence adequacy and rebinding-readiness assessment.',
        ]),
  });
}
