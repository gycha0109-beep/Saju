import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I246ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionEvidenceReport } from './i246-challenge-combination-support-channel-competing-relation-settlement-yuding-suijinlu-three-blocking-residual-canonical-witness-acquisition-evidence.js';
import { I244_AUTHORITY_BLOCKING_RESIDUAL_IDS, I244_NON_BLOCKING_UNRESOLVED_CONTEXT_IDS } from './i244-challenge-combination-support-channel-competing-relation-settlement-yuding-suijinlu-canonical-provenance-acquisition-evidence-adequacy-residual-gap-reassessment-review.js';
import { I241_REMAINING_ADMISSIBILITY_GAP_IDS } from './i241-challenge-combination-support-channel-competing-relation-settlement-three-residual-targeted-discovery-evidence-adequacy-source-relationship-admissibility-reassessment-review.js';

export const I247_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_CANONICAL_WITNESS_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-competing-relation-settlement-yuding-suijinlu-canonical-witness-acquisition-evidence-adequacy-external-access-reassessment-review-v1';

export const I247_EXTERNAL_ACCESS_REQUIREMENT_IDS = Object.freeze([
  'PALACE_MANUSCRIPT_CUSTODIAN_CATALOG_OR_SHELFMARK_RECORD',
  'PALACE_MANUSCRIPT_OR_AUTHORIZED_FACSIMILE_WITH_EXACT_TARGET_PASSAGE',
  'VERIFIED_2011_HUALING_PRINT_PAGE_WITH_EXACT_TARGET_PASSAGE_AND_EDITION_IDENTITY',
] as const);
export type I247ExternalAccessRequirementId = (typeof I247_EXTERNAL_ACCESS_REQUIREMENT_IDS)[number];

export const I247_REASSESSMENT_CONTROL_IDS = Object.freeze([
  'EXACT_I246_THREE_RESIDUAL_ZERO_QUALIFYING_CANONICAL_WITNESS_BOUNDARY_REQUIRED',
  'FOUR_LEGACY_ADMISSIBILITY_GAPS_MUST_REMAIN_FORMALLY_OPEN',
  'TWO_NON_BLOCKING_PROVENANCE_CONTEXT_ITEMS_MUST_REMAIN_UNRESOLVED_AND_NON_AUTHORITY',
  'USER_UPLOADED_OR_SHARED_SCAN_SURFACES_MUST_REMAIN_CONTEXT_ONLY',
  'SS_NUMBER_AND_SCAN_CONTAINER_PAGINATION_MUST_NOT_ESTABLISH_PALACE_SHELFMARK_OR_CUSTODY',
  'EQUIVALENT_AUTOMATED_PUBLIC_SEARCH_REPEAT_MUST_NOT_COUNT_AS_AUTHORITY_PROGRESS',
  'FURTHER_PROGRESS_REQUIRES_MATERIALLY_NEW_PRIMARY_CUSTODIAN_OR_VERIFIED_EDITION_PAGE_ACCESS',
  'CATALOG_TRIGGER_REQUIRES_SOURCE_BOUND_CUSTODIAN_IDENTITY_OR_SHELFMARK',
  'FACSIMILE_TRIGGER_REQUIRES_DOCUMENT_IDENTITY_AND_EXACT_TARGET_PASSAGE',
  'VERIFIED_2011_PAGE_TRIGGER_REQUIRES_EDITION_IDENTITY_AND_EXACT_TARGET_PASSAGE',
  'PUBLIC_ACCESS_BOUNDARY_MUST_NOT_BE_RELABELED_AS_CORPUS_EXHAUSTION_NONEXISTENCE_OR_NEGATIVE_EVIDENCE',
  'EXTERNAL_CUSTODIAN_CONTACT_REQUIRES_SEPARATE_EXPLICIT_AUTHORITY',
  'I132_I232_QU_WEI_LI1998_V2_GUARDS_MUST_REMAIN_UNCHANGED',
  'NO_COMPOSITION_THRESHOLD_DAMAGE_CLASSIFICATION_SCORING_OR_PRODUCTION_AUTHORITY',
] as const);

export interface I247ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluCanonicalWitnessAcquisitionEvidenceAdequacyExternalAccessReassessmentReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_CANONICAL_WITNESS_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW'
    | 'I246_CANONICAL_WITNESS_ACQUISITION_EVIDENCE_BOUNDARY_INVALID';
  decision:
    | 'I246_EVIDENCE_ADEQUATE_FOR_THREE_UNRESOLVED_AUTHORITY_BLOCKING_RESIDUALS_THREE_SCAN_SURFACES_ACCEPTED_AS_CONTEXT_ZERO_QUALIFYING_CANONICAL_WITNESSES_AUTOMATED_PUBLIC_ACQUISITION_BOUNDARY_REACHED_MATERIALLY_NEW_PRIMARY_CUSTODIAN_OR_VERIFIED_2011_PAGE_ACCESS_REQUIRED_NO_EXHAUSTION_NO_NEGATIVE_FINDING_NO_PROMOTION'
    | 'YUDING_SUIJINLU_CANONICAL_WITNESS_EXTERNAL_ACCESS_REASSESSMENT_NOT_READY';
  upstreamI246EvidenceId: string;
  exactI246BoundaryAccepted: boolean;
  targetScope: 'MULTIPLE_TRACKED_RELATION_TOUCHES_COMPETING_RELATION_SETTLEMENT';
  i246EvidenceAdequateForRecordedUnresolvedFindings: boolean;
  qualifyingCanonicalWitnessCountAccepted: 0;
  userUploadedOrSharedScanSurfaceCountAccepted: 3 | 0;
  scanSurfacesAcceptedAsContextOnly: boolean;
  scanSurfacesMayEstablishPrimaryCustodianAuthority: false;
  authorityBlockingResidualIds: readonly string[];
  authorityBlockingResidualCount: 3 | 0;
  residualsResolvedByReassessmentCount: 0;
  legacyFormalAdmissibilityGapIds: readonly string[];
  legacyFormalAdmissibilityGapCount: 4 | 0;
  nonBlockingUnresolvedContextIds: readonly string[];
  nonBlockingUnresolvedContextCount: 2 | 0;
  automatedPublicAcquisitionContinuationMethodologicallyJustified: false;
  automatedPublicAcquisitionBoundaryReached: boolean;
  materiallyNewPrimaryCustodianOrVerifiedEditionAccessRequired: boolean;
  externalOrManualAccessRequiredForFurtherGapResolution: boolean;
  newlyAvailablePublicPrimaryWitnessMaySatisfyTrigger: boolean;
  externalAccessRequirementIds: readonly I247ExternalAccessRequirementId[];
  externalAccessRequirementCount: 3 | 0;
  externalAccessRequirementsFrozenProspectively: boolean;
  custodianCatalogOrShelfmarkRequirementOpen: boolean;
  palaceOrAuthorizedFacsimileExactPassageRequirementOpen: boolean;
  verified2011EditionExactPageRequirementOpen: boolean;
  finalNormativeAdmissibilityRemainsDownstream: boolean;
  externalCustodianContactAuthorizedByThisGate: false;
  externalCustodianContactExecutedByThisGate: false;
  publicBoundaryCreatesNegativeFinding: false;
  officialSearchSilenceCreatesNegativeFinding: false;
  scanSurfaceAccessLimitationsCreateNegativeFinding: false;
  targetedDiscoveryExhaustionEstablished: false;
  onlineCorpusExhaustionEstablished: false;
  corpusExhaustionEstablished: false;
  universalNoFurtherEvidenceClaimEstablished: false;
  authorityGap: 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' | 'UPSTREAM_INVALID';
  authorityGapClosed: false;
  authorityPromotedByThisGate: false;
  competingRelationSettlementResolved: false;
  crossRelationPrecedenceAuthorized: false;
  multiTouchAggregationAuthorized: false;
  candidateRegisteredByThisGate: false;
  candidateSelectedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  evidenceRebindingAuthorizedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  derivativeRelationshipAdjudicatedByThisGate: false;
  hiddenStemI232HoldPreserved: boolean;
  hiddenStemTrackReopenedByThisGate: false;
  hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED';
  quWei2001HoldPreserved: boolean;
  li1998SameTargetPathSuspendedNotRetired: boolean;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE' | 'NOT_ASSESSED';
  reassessmentControlIds: readonly string[];
  reassessmentControlCount: 14 | 0;
  reassessmentControlsFrozen: boolean;
  actualCompositionPerformedByThisGate: false;
  multiSourceCompositionAuthorized: false;
  thresholdRuleCreatedByThisGate: false;
  damageEvaluationAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  productionPolicyExecutionAuthorized: false;
  recommendedNextGate:
    | 'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_EXTERNAL_CANONICAL_WITNESS_ACCESS_REQUIREMENT_HOLD_RECORD'
    | 'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_CANONICAL_WITNESS_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW';
  notes: readonly string[];
}

function exactI246Accepted(
  i246: I246ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionEvidenceReport,
): boolean {
  return (
    i246.status === 'RESOLVED_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_THREE_BLOCKING_RESIDUAL_CANONICAL_WITNESS_ACQUISITION_EVIDENCE' &&
    i246.decision === 'FOUR_CANONICAL_WITNESS_PATHS_EXECUTED_THREE_USER_UPLOADED_OR_SHARED_SCAN_SURFACES_AND_2011_PRINT_METADATA_RECONFIRMATION_OBSERVED_ZERO_QUALIFYING_PRIMARY_CUSTODIAN_CATALOG_ZERO_PALACE_FACSIMILE_ZERO_VERIFIED_2011_EXACT_TARGET_PAGE_THREE_AUTHORITY_BLOCKING_RESIDUALS_REMAIN_NO_NEGATIVE_EXHAUSTION_NO_PROMOTION' &&
    i246.exactI245BoundaryAccepted &&
    i246.acquisitionExecuted &&
    i246.acquisitionAttemptCount === 4 &&
    i246.publicEvidenceRecordCount === 4 &&
    i246.newlyObservedUserUploadedOrSharedScanSurfaceCount === 3 &&
    i246.reconfirmed2011EditionMetadataRecordCount === 1 &&
    i246.targetPassageFingerprintCount === 6 &&
    i246.targetPassageFingerprintSearchExecuted &&
    i246.officialOrInstitutionalDomainSearchExecuted &&
    i246.qualifyingPrimaryCustodianCatalogWitnessCount === 0 &&
    i246.qualifyingPalaceFacsimileWitnessCount === 0 &&
    i246.qualifyingVerified2011PrintExactTargetPageCount === 0 &&
    i246.qualifyingCanonicalWitnessCount === 0 &&
    i246.primaryCustodianSourceIdentityEstablished === false &&
    i246.palaceManuscriptShelfmarkEstablished === false &&
    i246.palaceManuscriptFacsimileAcquired === false &&
    i246.verified2011PrintExactTargetPassagePageAcquired === false &&
    i246.exactCanonicalTargetPassageBindingEstablished === false &&
    i246.finalTargetPassageNormativeAdmissibilityEstablished === false &&
    i246.authorityBlockingResidualCount === 3 &&
    i246.authorityBlockingResidualIds.length === I244_AUTHORITY_BLOCKING_RESIDUAL_IDS.length &&
    i246.authorityBlockingResidualIds.every((id, index) => id === I244_AUTHORITY_BLOCKING_RESIDUAL_IDS[index]) &&
    i246.blockingResidualsResolvedByThisGateCount === 0 &&
    i246.legacyFormalAdmissibilityGapCount === 4 &&
    i246.legacyFormalAdmissibilityGapIds.length === I241_REMAINING_ADMISSIBILITY_GAP_IDS.length &&
    i246.legacyFormalAdmissibilityGapIds.every((id, index) => id === I241_REMAINING_ADMISSIBILITY_GAP_IDS[index]) &&
    i246.legacyFormalGapsClosedByThisGateCount === 0 &&
    i246.nonBlockingUnresolvedContextCount === 2 &&
    i246.nonBlockingUnresolvedContextIds.length === I244_NON_BLOCKING_UNRESOLVED_CONTEXT_IDS.length &&
    i246.nonBlockingUnresolvedContextIds.every((id, index) => id === I244_NON_BLOCKING_UNRESOLVED_CONTEXT_IDS[index]) &&
    i246.scanSurfaceMayEstablishCustodianAuthority === false &&
    i246.scanSurfaceMayEstablishPalaceShelfmark === false &&
    i246.ssNumberMayEstablishPalaceShelfmark === false &&
    i246.booksellerPalaceBasisDescriptionMayEstablishCustodianBinding === false &&
    i246.publicMirrorDerivativeChainCompletionCountedAsAuthorityProgress === false &&
    i246.publicWitnessProvenanceIndependenceEstablished === false &&
    i246.sameTextPublicWitnessesCountedAsIndependentAuthorities === false &&
    i246.externalCustodianContactExecutedByThisGate === false &&
    i246.automatedPublicAcquisitionBoundaryAdjudicatedByThisGate === false &&
    i246.authorityGap === 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' &&
    i246.authorityGapClosed === false &&
    i246.authorityPromotedByThisGate === false &&
    i246.competingRelationSettlementResolved === false &&
    i246.hiddenStemI232HoldPreserved &&
    i246.hiddenStemTrackReopenedByThisGate === false &&
    i246.quWei2001HoldPreserved &&
    i246.li1998SameTargetPathSuspendedNotRetired &&
    i246.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i246.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i246.currentV2PackageAndCandidateSetRemainImmutable &&
    i246.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i246.evidenceRebindingAuthorizedByThisGate === false &&
    i246.provenanceIndependenceAdjudicatedByThisGate === false &&
    i246.derivativeRelationshipAdjudicatedByThisGate === false &&
    i246.actualCompositionPerformedByThisGate === false &&
    i246.multiSourceCompositionAuthorized === false &&
    i246.thresholdRuleCreatedByThisGate === false &&
    i246.damageEvaluationAuthorized === false &&
    i246.classificationAuthorized === false &&
    i246.numericScoringAuthorized === false &&
    i246.productionPolicyExecutionAuthorized === false &&
    i246.negativeFindingCreatedByThisGate === false &&
    i246.discoveryExhaustionClaimed === false &&
    i246.corpusExhaustionClaimed === false &&
    i246.recommendedNextGate === 'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_CANONICAL_WITNESS_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW'
  );
}

function finalized(
  material: Omit<I247ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluCanonicalWitnessAcquisitionEvidenceAdequacyExternalAccessReassessmentReviewReport, 'reviewId'>,
): I247ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluCanonicalWitnessAcquisitionEvidenceAdequacyExternalAccessReassessmentReviewReport {
  return {
    reviewId: `i247_yuding_suijinlu_external_access_reassessment_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI247ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluCanonicalWitnessAcquisitionEvidenceAdequacyExternalAccessReassessmentReview(
  i246: I246ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionEvidenceReport,
): I247ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluCanonicalWitnessAcquisitionEvidenceAdequacyExternalAccessReassessmentReviewReport {
  const accepted = exactI246Accepted(i246);
  return finalized({
    reviewVersion: I247_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_CANONICAL_WITNESS_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_CANONICAL_WITNESS_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW'
      : 'I246_CANONICAL_WITNESS_ACQUISITION_EVIDENCE_BOUNDARY_INVALID',
    decision: accepted
      ? 'I246_EVIDENCE_ADEQUATE_FOR_THREE_UNRESOLVED_AUTHORITY_BLOCKING_RESIDUALS_THREE_SCAN_SURFACES_ACCEPTED_AS_CONTEXT_ZERO_QUALIFYING_CANONICAL_WITNESSES_AUTOMATED_PUBLIC_ACQUISITION_BOUNDARY_REACHED_MATERIALLY_NEW_PRIMARY_CUSTODIAN_OR_VERIFIED_2011_PAGE_ACCESS_REQUIRED_NO_EXHAUSTION_NO_NEGATIVE_FINDING_NO_PROMOTION'
      : 'YUDING_SUIJINLU_CANONICAL_WITNESS_EXTERNAL_ACCESS_REASSESSMENT_NOT_READY',
    upstreamI246EvidenceId: i246.evidenceId,
    exactI246BoundaryAccepted: accepted,
    targetScope: 'MULTIPLE_TRACKED_RELATION_TOUCHES_COMPETING_RELATION_SETTLEMENT',
    i246EvidenceAdequateForRecordedUnresolvedFindings: accepted,
    qualifyingCanonicalWitnessCountAccepted: 0,
    userUploadedOrSharedScanSurfaceCountAccepted: accepted ? 3 : 0,
    scanSurfacesAcceptedAsContextOnly: accepted,
    scanSurfacesMayEstablishPrimaryCustodianAuthority: false,
    authorityBlockingResidualIds: accepted ? I244_AUTHORITY_BLOCKING_RESIDUAL_IDS : Object.freeze([]),
    authorityBlockingResidualCount: accepted ? 3 : 0,
    residualsResolvedByReassessmentCount: 0,
    legacyFormalAdmissibilityGapIds: accepted ? I241_REMAINING_ADMISSIBILITY_GAP_IDS : Object.freeze([]),
    legacyFormalAdmissibilityGapCount: accepted ? 4 : 0,
    nonBlockingUnresolvedContextIds: accepted ? I244_NON_BLOCKING_UNRESOLVED_CONTEXT_IDS : Object.freeze([]),
    nonBlockingUnresolvedContextCount: accepted ? 2 : 0,
    automatedPublicAcquisitionContinuationMethodologicallyJustified: false,
    automatedPublicAcquisitionBoundaryReached: accepted,
    materiallyNewPrimaryCustodianOrVerifiedEditionAccessRequired: accepted,
    externalOrManualAccessRequiredForFurtherGapResolution: accepted,
    newlyAvailablePublicPrimaryWitnessMaySatisfyTrigger: accepted,
    externalAccessRequirementIds: accepted ? I247_EXTERNAL_ACCESS_REQUIREMENT_IDS : Object.freeze([]),
    externalAccessRequirementCount: accepted ? 3 : 0,
    externalAccessRequirementsFrozenProspectively: accepted,
    custodianCatalogOrShelfmarkRequirementOpen: accepted,
    palaceOrAuthorizedFacsimileExactPassageRequirementOpen: accepted,
    verified2011EditionExactPageRequirementOpen: accepted,
    finalNormativeAdmissibilityRemainsDownstream: accepted,
    externalCustodianContactAuthorizedByThisGate: false,
    externalCustodianContactExecutedByThisGate: false,
    publicBoundaryCreatesNegativeFinding: false,
    officialSearchSilenceCreatesNegativeFinding: false,
    scanSurfaceAccessLimitationsCreateNegativeFinding: false,
    targetedDiscoveryExhaustionEstablished: false,
    onlineCorpusExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    universalNoFurtherEvidenceClaimEstablished: false,
    authorityGap: accepted ? 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' : 'UPSTREAM_INVALID',
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
    competingRelationSettlementResolved: false,
    crossRelationPrecedenceAuthorized: false,
    multiTouchAggregationAuthorized: false,
    candidateRegisteredByThisGate: false,
    candidateSelectedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    evidenceRebindingAuthorizedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    derivativeRelationshipAdjudicatedByThisGate: false,
    hiddenStemI232HoldPreserved: accepted,
    hiddenStemTrackReopenedByThisGate: false,
    hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    quWei2001HoldPreserved: accepted,
    li1998SameTargetPathSuspendedNotRetired: accepted,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: accepted,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: accepted,
    currentV2ProvenanceDisposition: accepted ? 'BLOCKED_UNDER_CURRENT_EVIDENCE' : 'NOT_ASSESSED',
    reassessmentControlIds: accepted ? I247_REASSESSMENT_CONTROL_IDS : Object.freeze([]),
    reassessmentControlCount: accepted ? 14 : 0,
    reassessmentControlsFrozen: accepted,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    productionPolicyExecutionAuthorized: false,
    recommendedNextGate: accepted
      ? 'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_EXTERNAL_CANONICAL_WITNESS_ACCESS_REQUIREMENT_HOLD_RECORD'
      : 'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_CANONICAL_WITNESS_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW',
    notes: accepted
      ? Object.freeze([
          'I247 treats the three newly observed scan/download surfaces as contextual access leads only; none supplies source-bound palace custody, a palace shelfmark, an authorized facsimile, or a reproducibly verified 2011 exact target page.',
          'Repeating equivalent public searches or collecting additional mirrors would not materially advance the three authority-blocking residuals. Further progress requires a materially new primary/custodian or verified-edition evidence class.',
          'A newly accessible public primary witness may satisfy a frozen trigger; the HOLD does not require that evidence be obtained by direct custodian contact.',
          'Failure to locate a qualifying witness in the current public pass is not nonexistence, negative evidence, or corpus exhaustion.',
          'Direct contact with a library, archive, publisher, editor or custodian remains outside this gate and requires separate explicit authority.',
        ])
      : Object.freeze(['I247 fails closed unless I246 executed all four canonical-witness paths, recorded three scan surfaces as context, retained zero qualifying canonical witnesses and preserved all three blocking residuals without exhaustion.']),
  });
}
