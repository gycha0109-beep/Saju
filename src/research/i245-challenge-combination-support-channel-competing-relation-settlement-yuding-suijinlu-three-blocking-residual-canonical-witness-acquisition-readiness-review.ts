import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I244_AUTHORITY_BLOCKING_RESIDUAL_IDS,
  I244_NON_BLOCKING_UNRESOLVED_CONTEXT_IDS,
  type I244ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluCanonicalProvenanceAcquisitionEvidenceAdequacyResidualGapReassessmentReviewReport,
} from './i244-challenge-combination-support-channel-competing-relation-settlement-yuding-suijinlu-canonical-provenance-acquisition-evidence-adequacy-residual-gap-reassessment-review.js';
import { I241_REMAINING_ADMISSIBILITY_GAP_IDS } from './i241-challenge-combination-support-channel-competing-relation-settlement-three-residual-targeted-discovery-evidence-adequacy-source-relationship-admissibility-reassessment-review.js';

export const I245_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_THREE_BLOCKING_RESIDUAL_CANONICAL_WITNESS_ACQUISITION_READINESS_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-competing-relation-settlement-yuding-suijinlu-three-blocking-residual-canonical-witness-acquisition-readiness-review-v1';

export const I245_ACQUISITION_PATH_IDS = Object.freeze([
  'PALACE_MANUSCRIPT_CUSTODIAN_CATALOG_SHELFMARK_BINDING_TRACE',
  'PALACE_MANUSCRIPT_OR_AUTHORIZED_FACSIMILE_EXACT_TARGET_PASSAGE_BINDING_TRACE',
  'VERIFIED_2011_HUALING_PRINT_EXACT_TARGET_PASSAGE_PAGE_TRACE',
  'PRIMARY_CANONICAL_WITNESS_RULE_BEARING_CONTEXT_NORMATIVE_ADMISSIBILITY_TRACE',
] as const);
export type I245AcquisitionPathId = (typeof I245_ACQUISITION_PATH_IDS)[number];

export const I245_ACQUISITION_CONTROL_IDS = Object.freeze([
  'EXACT_I244_THREE_BLOCKING_RESIDUAL_BOUNDARY_REQUIRED',
  'FOUR_LEGACY_GAPS_MUST_REMAIN_FORMALLY_OPEN',
  'TWO_NON_BLOCKING_CONTEXT_ITEMS_MUST_REMAIN_UNRESOLVED_AND_NON_AUTHORITY',
  'PRECISION_CORRECTED_I243_SEVEN_DIRECT_ONE_LEAD_BOUNDARY_MUST_REMAIN',
  'GENERAL_RULE_REDISCOVERY_MUST_NOT_COUNT_AS_PROGRESS',
  'PUBLIC_MIRROR_DERIVATIVE_CHAIN_COMPLETION_MUST_NOT_COUNT_AS_CANONICAL_AUTHORITY_PROGRESS',
  'PRIMARY_IDENTITY_PROGRESS_REQUIRES_CUSTODIAN_CATALOG_SHELFMARK_OR_EQUIVALENT_SOURCE_CHAIN',
  'PUBLISHER_DESCRIPTION_ALONE_MUST_NOT_ESTABLISH_PALACE_MANUSCRIPT_CUSTODIAN_BINDING',
  'EXACT_PASSAGE_PROGRESS_REQUIRES_PRIMARY_OR_VERIFIED_2011_EDITION_PAGE_WITH_TARGET_TEXT',
  'SEARCH_INDEX_SNIPPET_MUST_NOT_ESTABLISH_EXACT_PASSAGE',
  'VERIFIED_2011_PRINT_PAGE_MAY_BIND_EDITION_PASSAGE_BUT_MUST_NOT_INVENT_PALACE_SHELFMARK',
  'PALACE_FACSIMILE_MUST_BIND_DOCUMENT_IDENTITY_AND_TARGET_PASSAGE',
  'NORMATIVE_ADMISSIBILITY_REQUIRES_PRIMARY_IDENTITY_AND_EXACT_PASSAGE_BINDING',
  'SAME_TEXT_PUBLIC_WITNESSES_MUST_NOT_COUNT_AS_INDEPENDENT_AUTHORITIES',
  'EXTERNAL_CUSTODIAN_CONTACT_NOT_AUTHORIZED_BY_READINESS',
  'NO_REBINDING_PROVENANCE_INDEPENDENCE_OR_BROADER_DERIVATIVE_ADJUDICATION',
  'I132_I232_QU_WEI_LI1998_V2_GUARDS_MUST_REMAIN_UNCHANGED',
  'NO_COMPOSITION_THRESHOLD_DAMAGE_CLASSIFICATION_SCORING_OR_PRODUCTION_AUTHORITY',
] as const);
export type I245AcquisitionControlId = (typeof I245_ACQUISITION_CONTROL_IDS)[number];

export interface I245ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_THREE_BLOCKING_RESIDUAL_CANONICAL_WITNESS_ACQUISITION_READINESS_REVIEW'
    | 'I244_RESIDUAL_GAP_REASSESSMENT_BOUNDARY_INVALID';
  decision:
    | 'THREE_AUTHORITY_BLOCKING_RESIDUALS_FOUR_CANONICAL_WITNESS_ACQUISITION_PATHS_EIGHTEEN_CONTROLS_FROZEN_PUBLICLY_ACCESSIBLE_CATALOG_FACSIMILE_OR_VERIFIED_2011_PRINT_PAGE_ONLY_NO_EXTERNAL_CONTACT_NO_ACQUISITION_EXECUTED_NO_PROMOTION'
    | 'YUDING_SUIJINLU_THREE_BLOCKING_RESIDUAL_CANONICAL_WITNESS_ACQUISITION_NOT_READY';
  upstreamI244ReviewId: string;
  exactI244BoundaryAccepted: boolean;
  targetScope: 'MULTIPLE_TRACKED_RELATION_TOUCHES_COMPETING_RELATION_SETTLEMENT';
  authorityBlockingResidualIds: readonly string[];
  authorityBlockingResidualCount: 3 | 0;
  legacyFormalAdmissibilityGapIds: readonly string[];
  legacyFormalAdmissibilityGapCount: 4 | 0;
  nonBlockingUnresolvedContextIds: readonly string[];
  nonBlockingUnresolvedContextCount: 2 | 0;
  precisionCorrectedI243DirectPublicEvidenceRecordCount: 7 | 0;
  precisionCorrectedI243SearchIndexLeadRecordCount: 1 | 0;
  acquisitionPathIds: readonly I245AcquisitionPathId[];
  acquisitionPathCount: 4 | 0;
  acquisitionControlIds: readonly I245AcquisitionControlId[];
  acquisitionControlCount: 18 | 0;
  acquisitionContractFrozen: boolean;
  targetedPublicAcquisitionAuthorized: boolean;
  acquisitionExecutedByThisGate: false;
  externalCustodianContactAuthorizedByThisGate: false;
  generalRuleRediscoveryMayCountAsProgress: false;
  publicMirrorDerivativeChainCompletionMayCountAsCanonicalAuthorityProgress: false;
  primaryIdentityRequiresCustodianCatalogShelfmarkOrEquivalentSourceChain: boolean;
  publisherDescriptionAloneMayEstablishPalaceCustodianBinding: false;
  exactPassageRequiresPrimaryOrVerified2011EditionPage: boolean;
  searchIndexSnippetMayEstablishExactPassage: false;
  verified2011PrintPageMayInventPalaceShelfmark: false;
  palaceFacsimileRequiresDocumentIdentityAndTargetPassageBinding: boolean;
  normativeAdmissibilityRequiresPrimaryIdentityAndExactPassageBinding: boolean;
  sameTextPublicWitnessesMayCountAsIndependentAuthorities: false;
  authorityGap: 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' | 'UPSTREAM_INVALID';
  authorityGapClosed: false;
  authorityPromotedByThisGate: false;
  competingRelationSettlementResolved: false;
  crossRelationPrecedenceAuthorized: false;
  multiTouchAggregationAuthorized: false;
  hiddenStemI232HoldPreserved: boolean;
  hiddenStemTrackReopenedByThisGate: false;
  hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED';
  quWei2001HoldPreserved: boolean;
  li1998SameTargetPathSuspendedNotRetired: boolean;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE' | 'NOT_ASSESSED';
  candidateRegisteredByThisGate: false;
  candidateSelectedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  evidenceRebindingAuthorizedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  derivativeRelationshipAdjudicatedByThisGate: false;
  actualCompositionPerformedByThisGate: false;
  multiSourceCompositionAuthorized: false;
  thresholdRuleCreatedByThisGate: false;
  damageEvaluationAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  productionPolicyExecutionAuthorized: false;
  negativeFindingCreatedByThisGate: false;
  discoveryExhaustionClaimed: false;
  corpusExhaustionClaimed: false;
  recommendedNextGate:
    | 'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_THREE_BLOCKING_RESIDUAL_CANONICAL_WITNESS_ACQUISITION_EVIDENCE'
    | 'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_THREE_BLOCKING_RESIDUAL_CANONICAL_WITNESS_ACQUISITION_READINESS_REVIEW';
  notes: readonly string[];
}

function exactI244Accepted(
  i244: I244ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluCanonicalProvenanceAcquisitionEvidenceAdequacyResidualGapReassessmentReviewReport,
): boolean {
  return (
    i244.status === 'RESOLVED_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_CANONICAL_PROVENANCE_ACQUISITION_EVIDENCE_ADEQUACY_RESIDUAL_GAP_REASSESSMENT_REVIEW' &&
    i244.decision === 'I243_EVIDENCE_ADEQUATE_FOR_MODERN_EDITION_IDENTITY_AND_EXPLICIT_2012_DERIVATIVE_LINK_FOUR_LEGACY_ADMISSIBILITY_GAPS_REMAIN_FORMALLY_OPEN_THREE_AUTHORITY_BLOCKING_RESIDUALS_IDENTIFIED_HEYIX_CHAIN_AND_PUBLIC_WITNESS_INDEPENDENCE_PRESERVED_AS_NON_BLOCKING_UNRESOLVED_CONTEXT_PRIMARY_OR_CUSTODIAN_EXACT_PASSAGE_ACQUISITION_REQUIRED_NO_PROMOTION' &&
    i244.exactI243BoundaryAccepted &&
    i244.i243EvidenceAdequateForResidualReassessment &&
    i244.i243EvidenceRecordCountAccepted === 8 &&
    i244.i243DirectPublicEvidenceRecordCountAccepted === 7 &&
    i244.i243SearchIndexLeadRecordCountAccepted === 1 &&
    i244.searchIndexLeadAcceptedAsDirectEvidence === false &&
    i244.legacyFormalAdmissibilityGapCount === 4 &&
    i244.legacyFormalAdmissibilityGapIds.length === I241_REMAINING_ADMISSIBILITY_GAP_IDS.length &&
    i244.legacyFormalAdmissibilityGapIds.every((id, index) => id === I241_REMAINING_ADMISSIBILITY_GAP_IDS[index]) &&
    i244.legacyFormalGapsClosedByI244Count === 0 &&
    i244.authorityBlockingResidualCount === 3 &&
    i244.authorityBlockingResidualIds.length === I244_AUTHORITY_BLOCKING_RESIDUAL_IDS.length &&
    i244.authorityBlockingResidualIds.every((id, index) => id === I244_AUTHORITY_BLOCKING_RESIDUAL_IDS[index]) &&
    i244.nonBlockingUnresolvedContextCount === 2 &&
    i244.nonBlockingUnresolvedContextIds.length === I244_NON_BLOCKING_UNRESOLVED_CONTEXT_IDS.length &&
    i244.nonBlockingUnresolvedContextIds.every((id, index) => id === I244_NON_BLOCKING_UNRESOLVED_CONTEXT_IDS[index]) &&
    i244.witnessDerivativeRelationshipLegacyGapRemainsFormallyUnresolved &&
    i244.witnessDerivativeRelationshipLegacyGapAuthorityBlockingForNextCanonicalAcquisition === false &&
    i244.nonBlockingContextMayBeUsedAsIndependentNormativeAuthority === false &&
    i244.canonicalProgressRequiresPrimaryOrCustodianSourceIdentityBinding &&
    i244.canonicalProgressRequiresExactTargetPassageFacsimileOrPrimaryPage &&
    i244.normativeAdmissibilityMayBeAdjudicatedBeforePrimaryAndPassageBinding === false &&
    i244.generalRuleRediscoveryJustified === false &&
    i244.equivalentMirrorChainSearchMayCountAsAuthorityProgress === false &&
    i244.targetedThreeResidualAcquisitionReadinessJustified &&
    i244.acquisitionExecutedByThisGate === false &&
    i244.authorityGap === 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' &&
    i244.authorityGapClosed === false &&
    i244.authorityPromotedByThisGate === false &&
    i244.competingRelationSettlementResolved === false &&
    i244.hiddenStemI232HoldPreserved &&
    i244.hiddenStemTrackReopenedByThisGate === false &&
    i244.quWei2001HoldPreserved &&
    i244.li1998SameTargetPathSuspendedNotRetired &&
    i244.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i244.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i244.currentV2PackageAndCandidateSetRemainImmutable &&
    i244.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i244.evidenceRebindingAuthorizedByThisGate === false &&
    i244.provenanceIndependenceAdjudicatedByThisGate === false &&
    i244.derivativeRelationshipAdjudicatedByThisGate === false &&
    i244.actualCompositionPerformedByThisGate === false &&
    i244.multiSourceCompositionAuthorized === false &&
    i244.thresholdRuleCreatedByThisGate === false &&
    i244.damageEvaluationAuthorized === false &&
    i244.classificationAuthorized === false &&
    i244.numericScoringAuthorized === false &&
    i244.productionPolicyExecutionAuthorized === false &&
    i244.negativeFindingCreatedByThisGate === false &&
    i244.discoveryExhaustionClaimed === false &&
    i244.corpusExhaustionClaimed === false &&
    i244.recommendedNextGate === 'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_THREE_BLOCKING_RESIDUAL_CANONICAL_WITNESS_ACQUISITION_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<I245ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionReadinessReviewReport, 'reviewId'>,
): I245ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionReadinessReviewReport {
  return {
    reviewId: `i245_yuding_suijinlu_canonical_witness_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI245ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionReadinessReview(
  i244: I244ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluCanonicalProvenanceAcquisitionEvidenceAdequacyResidualGapReassessmentReviewReport,
): I245ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionReadinessReviewReport {
  const accepted = exactI244Accepted(i244);
  return finalized({
    reviewVersion: I245_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_THREE_BLOCKING_RESIDUAL_CANONICAL_WITNESS_ACQUISITION_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_THREE_BLOCKING_RESIDUAL_CANONICAL_WITNESS_ACQUISITION_READINESS_REVIEW'
      : 'I244_RESIDUAL_GAP_REASSESSMENT_BOUNDARY_INVALID',
    decision: accepted
      ? 'THREE_AUTHORITY_BLOCKING_RESIDUALS_FOUR_CANONICAL_WITNESS_ACQUISITION_PATHS_EIGHTEEN_CONTROLS_FROZEN_PUBLICLY_ACCESSIBLE_CATALOG_FACSIMILE_OR_VERIFIED_2011_PRINT_PAGE_ONLY_NO_EXTERNAL_CONTACT_NO_ACQUISITION_EXECUTED_NO_PROMOTION'
      : 'YUDING_SUIJINLU_THREE_BLOCKING_RESIDUAL_CANONICAL_WITNESS_ACQUISITION_NOT_READY',
    upstreamI244ReviewId: i244.reviewId,
    exactI244BoundaryAccepted: accepted,
    targetScope: 'MULTIPLE_TRACKED_RELATION_TOUCHES_COMPETING_RELATION_SETTLEMENT',
    authorityBlockingResidualIds: accepted ? I244_AUTHORITY_BLOCKING_RESIDUAL_IDS : Object.freeze([]),
    authorityBlockingResidualCount: accepted ? 3 : 0,
    legacyFormalAdmissibilityGapIds: accepted ? I241_REMAINING_ADMISSIBILITY_GAP_IDS : Object.freeze([]),
    legacyFormalAdmissibilityGapCount: accepted ? 4 : 0,
    nonBlockingUnresolvedContextIds: accepted ? I244_NON_BLOCKING_UNRESOLVED_CONTEXT_IDS : Object.freeze([]),
    nonBlockingUnresolvedContextCount: accepted ? 2 : 0,
    precisionCorrectedI243DirectPublicEvidenceRecordCount: accepted ? 7 : 0,
    precisionCorrectedI243SearchIndexLeadRecordCount: accepted ? 1 : 0,
    acquisitionPathIds: accepted ? I245_ACQUISITION_PATH_IDS : Object.freeze([]),
    acquisitionPathCount: accepted ? 4 : 0,
    acquisitionControlIds: accepted ? I245_ACQUISITION_CONTROL_IDS : Object.freeze([]),
    acquisitionControlCount: accepted ? 18 : 0,
    acquisitionContractFrozen: accepted,
    targetedPublicAcquisitionAuthorized: accepted,
    acquisitionExecutedByThisGate: false,
    externalCustodianContactAuthorizedByThisGate: false,
    generalRuleRediscoveryMayCountAsProgress: false,
    publicMirrorDerivativeChainCompletionMayCountAsCanonicalAuthorityProgress: false,
    primaryIdentityRequiresCustodianCatalogShelfmarkOrEquivalentSourceChain: accepted,
    publisherDescriptionAloneMayEstablishPalaceCustodianBinding: false,
    exactPassageRequiresPrimaryOrVerified2011EditionPage: accepted,
    searchIndexSnippetMayEstablishExactPassage: false,
    verified2011PrintPageMayInventPalaceShelfmark: false,
    palaceFacsimileRequiresDocumentIdentityAndTargetPassageBinding: accepted,
    normativeAdmissibilityRequiresPrimaryIdentityAndExactPassageBinding: accepted,
    sameTextPublicWitnessesMayCountAsIndependentAuthorities: false,
    authorityGap: accepted ? 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' : 'UPSTREAM_INVALID',
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
    competingRelationSettlementResolved: false,
    crossRelationPrecedenceAuthorized: false,
    multiTouchAggregationAuthorized: false,
    hiddenStemI232HoldPreserved: accepted,
    hiddenStemTrackReopenedByThisGate: false,
    hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    quWei2001HoldPreserved: accepted,
    li1998SameTargetPathSuspendedNotRetired: accepted,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: accepted,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: accepted,
    currentV2ProvenanceDisposition: accepted ? 'BLOCKED_UNDER_CURRENT_EVIDENCE' : 'NOT_ASSESSED',
    candidateRegisteredByThisGate: false,
    candidateSelectedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    evidenceRebindingAuthorizedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    derivativeRelationshipAdjudicatedByThisGate: false,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    productionPolicyExecutionAuthorized: false,
    negativeFindingCreatedByThisGate: false,
    discoveryExhaustionClaimed: false,
    corpusExhaustionClaimed: false,
    recommendedNextGate: accepted
      ? 'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_THREE_BLOCKING_RESIDUAL_CANONICAL_WITNESS_ACQUISITION_EVIDENCE'
      : 'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_THREE_BLOCKING_RESIDUAL_CANONICAL_WITNESS_ACQUISITION_READINESS_REVIEW',
    notes: accepted
      ? Object.freeze([
          'I245 freezes public canonical-witness acquisition only. It does not authorize contacting a library, publisher, archive, editor or other custodian.',
          'A library/catalog identity or shelfmark must be source-bound; publisher marketing text alone cannot establish palace-manuscript custody or identity.',
          'A verified 2011 华龄出版社 page may bind the target passage to that edition but cannot by itself invent a palace-manuscript shelfmark or direct manuscript custody.',
          'Mirror chronology, Heyix derivative completion and same-text repetition do not count as canonical authority progress and cannot create provenance independence.',
          'Normative admissibility is sequenced after source identity and exact-passage binding and remains fail-closed until those prerequisites are materially satisfied.',
        ])
      : Object.freeze(['I245 fails closed unless I244 preserves four legacy gaps, identifies exactly three authority-blocking residuals, keeps two provenance questions non-blocking and carries the precision-corrected seven-direct/one-lead boundary.']),
  });
}
