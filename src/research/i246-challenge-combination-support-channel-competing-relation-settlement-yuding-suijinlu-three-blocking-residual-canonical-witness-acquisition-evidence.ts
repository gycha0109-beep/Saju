import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I245_ACQUISITION_PATH_IDS,
  type I245ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionReadinessReviewReport,
} from './i245-challenge-combination-support-channel-competing-relation-settlement-yuding-suijinlu-three-blocking-residual-canonical-witness-acquisition-readiness-review.js';
import {
  I244_AUTHORITY_BLOCKING_RESIDUAL_IDS,
  I244_NON_BLOCKING_UNRESOLVED_CONTEXT_IDS,
} from './i244-challenge-combination-support-channel-competing-relation-settlement-yuding-suijinlu-canonical-provenance-acquisition-evidence-adequacy-residual-gap-reassessment-review.js';
import { I241_REMAINING_ADMISSIBILITY_GAP_IDS } from './i241-challenge-combination-support-channel-competing-relation-settlement-three-residual-targeted-discovery-evidence-adequacy-source-relationship-admissibility-reassessment-review.js';

export const I246_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_THREE_BLOCKING_RESIDUAL_CANONICAL_WITNESS_ACQUISITION_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-support-channel-competing-relation-settlement-yuding-suijinlu-three-blocking-residual-canonical-witness-acquisition-evidence-v1';

export const I246_TARGET_PASSAGE_FINGERPRINT_IDS = Object.freeze([
  'GAN_HE_XIAN_YONG_BU_XIAN_ZHU',
  'LIANG_HE_YOU_FENG_SAN_HE',
  'JIN_SAN_BU_JIN_ER',
  'DE_JU_SHI_YUAN',
  'SHI_JU_DE_YUAN',
  'YI_BU_HE_LIANG_LIANG_BU_CHONG_YI',
] as const);
export type I246TargetPassageFingerprintId = (typeof I246_TARGET_PASSAGE_FINGERPRINT_IDS)[number];

export const I246_PUBLIC_EVIDENCE_RECORD_IDS = Object.freeze([
  'BOOKSCHINA_2011_FIRST_EDITION_METADATA_RECONFIRMATION',
  'SCRIBD_USER_UPLOADED_2011_EDITION_SCAN_SURFACE_306P',
  'SHENJIGE_USER_SHARED_2011_EDITION_SCAN_SURFACE_SS13293187',
  'GUOXUESHUGE_USER_SHARED_2011_EDITION_SCAN_SURFACE_303P',
] as const);
export type I246PublicEvidenceRecordId = (typeof I246_PUBLIC_EVIDENCE_RECORD_IDS)[number];

export interface I246PublicEvidenceRecord {
  id: I246PublicEvidenceRecordId;
  url: string;
  evidenceClass:
    | 'DIRECT_BOOKSELLER_BIBLIOGRAPHIC_CONTEXT'
    | 'USER_UPLOADED_SCAN_SURFACE'
    | 'USER_SHARED_SCAN_DOWNLOAD_SURFACE';
  directPublicContext: boolean;
  userUploadedOrShared: boolean;
  editionIdentityContextObserved: boolean;
  ssNumberObserved: string | null;
  exposedDocumentPageCount: number | null;
  primaryCustodianCatalogBindingEstablished: false;
  palaceManuscriptShelfmarkEstablished: false;
  palaceFacsimileExactTargetPassageEstablished: false;
  verified2011PrintExactTargetPassagePageEstablished: false;
  qualifyingCanonicalWitness: false;
  notes: readonly string[];
}

export interface I246AcquisitionAttemptRecord {
  pathId: (typeof I245_ACQUISITION_PATH_IDS)[number];
  executed: true;
  qualifyingWitnessCount: 0;
  contextualObservationCount: number;
  disposition:
    | 'NO_SOURCE_BOUND_CUSTODIAN_CATALOG_OR_SHELFMARK_ACQUIRED'
    | 'NO_PALACE_OR_AUTHORIZED_FACSIMILE_EXACT_TARGET_PASSAGE_ACQUIRED'
    | 'NO_VERIFIED_2011_PRINT_PAGE_WITH_EXACT_TARGET_PASSAGE_ACQUIRED'
    | 'NORMATIVE_ADMISSIBILITY_NOT_ADJUDICABLE_WITHOUT_PRIMARY_IDENTITY_AND_EXACT_PASSAGE';
  negativeFindingCreated: false;
  exhaustionClaimed: false;
}

export interface I246ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionEvidenceReport {
  evidenceId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_THREE_BLOCKING_RESIDUAL_CANONICAL_WITNESS_ACQUISITION_EVIDENCE'
    | 'I245_ACQUISITION_READINESS_BOUNDARY_INVALID';
  decision:
    | 'FOUR_CANONICAL_WITNESS_PATHS_EXECUTED_THREE_USER_UPLOADED_OR_SHARED_SCAN_SURFACES_AND_2011_PRINT_METADATA_RECONFIRMATION_OBSERVED_ZERO_QUALIFYING_PRIMARY_CUSTODIAN_CATALOG_ZERO_PALACE_FACSIMILE_ZERO_VERIFIED_2011_EXACT_TARGET_PAGE_THREE_AUTHORITY_BLOCKING_RESIDUALS_REMAIN_NO_NEGATIVE_EXHAUSTION_NO_PROMOTION'
    | 'YUDING_SUIJINLU_CANONICAL_WITNESS_ACQUISITION_NOT_EXECUTED';
  upstreamI245ReviewId: string;
  exactI245BoundaryAccepted: boolean;
  targetScope: 'MULTIPLE_TRACKED_RELATION_TOUCHES_COMPETING_RELATION_SETTLEMENT';
  acquisitionExecuted: boolean;
  acquisitionAttemptRecords: readonly I246AcquisitionAttemptRecord[];
  acquisitionAttemptCount: 4 | 0;
  publicEvidenceRecords: readonly I246PublicEvidenceRecord[];
  publicEvidenceRecordCount: 4 | 0;
  newlyObservedUserUploadedOrSharedScanSurfaceCount: 3 | 0;
  reconfirmed2011EditionMetadataRecordCount: 1 | 0;
  targetPassageFingerprintIds: readonly I246TargetPassageFingerprintId[];
  targetPassageFingerprintCount: 6 | 0;
  targetPassageFingerprintSearchExecuted: boolean;
  officialOrInstitutionalDomainSearchExecuted: boolean;
  direct2011EditionScanSurfaceObserved: boolean;
  scanSurfaceMayEstablishCustodianAuthority: false;
  scanSurfaceMayEstablishPalaceShelfmark: false;
  ssNumberMayEstablishPalaceShelfmark: false;
  booksellerPalaceBasisDescriptionMayEstablishCustodianBinding: false;
  qualifyingPrimaryCustodianCatalogWitnessCount: 0;
  qualifyingPalaceFacsimileWitnessCount: 0;
  qualifyingVerified2011PrintExactTargetPageCount: 0;
  qualifyingCanonicalWitnessCount: 0;
  primaryCustodianSourceIdentityEstablished: false;
  palaceManuscriptShelfmarkEstablished: false;
  palaceManuscriptFacsimileAcquired: false;
  verified2011PrintExactTargetPassagePageAcquired: false;
  exactCanonicalTargetPassageBindingEstablished: false;
  finalTargetPassageNormativeAdmissibilityEstablished: false;
  authorityBlockingResidualIds: readonly string[];
  authorityBlockingResidualCount: 3 | 0;
  blockingResidualsResolvedByThisGateCount: 0;
  legacyFormalAdmissibilityGapIds: readonly string[];
  legacyFormalAdmissibilityGapCount: 4 | 0;
  legacyFormalGapsClosedByThisGateCount: 0;
  nonBlockingUnresolvedContextIds: readonly string[];
  nonBlockingUnresolvedContextCount: 2 | 0;
  publicMirrorDerivativeChainCompletionCountedAsAuthorityProgress: false;
  publicWitnessProvenanceIndependenceEstablished: false;
  sameTextPublicWitnessesCountedAsIndependentAuthorities: false;
  externalCustodianContactExecutedByThisGate: false;
  automatedPublicAcquisitionBoundaryAdjudicatedByThisGate: false;
  authorityGap: 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' | 'UPSTREAM_INVALID';
  authorityGapClosed: false;
  authorityPromotedByThisGate: false;
  competingRelationSettlementResolved: false;
  crossRelationPrecedenceAuthorized: false;
  multiTouchAggregationAuthorized: false;
  supportChannelActivationVerdictAuthorized: false;
  supportChannelPersistenceVerdictAuthorized: false;
  supportChannelDestructionVerdictAuthorized: false;
  supportChannelNetEffectVerdictAuthorized: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
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
    | 'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_CANONICAL_WITNESS_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW'
    | 'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_THREE_BLOCKING_RESIDUAL_CANONICAL_WITNESS_ACQUISITION_EVIDENCE';
  notes: readonly string[];
}

function exactI245Accepted(
  i245: I245ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionReadinessReviewReport,
): boolean {
  return (
    i245.status === 'RESOLVED_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_THREE_BLOCKING_RESIDUAL_CANONICAL_WITNESS_ACQUISITION_READINESS_REVIEW' &&
    i245.decision === 'THREE_AUTHORITY_BLOCKING_RESIDUALS_FOUR_CANONICAL_WITNESS_ACQUISITION_PATHS_EIGHTEEN_CONTROLS_FROZEN_PUBLICLY_ACCESSIBLE_CATALOG_FACSIMILE_OR_VERIFIED_2011_PRINT_PAGE_ONLY_NO_EXTERNAL_CONTACT_NO_ACQUISITION_EXECUTED_NO_PROMOTION' &&
    i245.exactI244BoundaryAccepted &&
    i245.authorityBlockingResidualCount === 3 &&
    i245.authorityBlockingResidualIds.length === I244_AUTHORITY_BLOCKING_RESIDUAL_IDS.length &&
    i245.authorityBlockingResidualIds.every((id, index) => id === I244_AUTHORITY_BLOCKING_RESIDUAL_IDS[index]) &&
    i245.legacyFormalAdmissibilityGapCount === 4 &&
    i245.legacyFormalAdmissibilityGapIds.length === I241_REMAINING_ADMISSIBILITY_GAP_IDS.length &&
    i245.legacyFormalAdmissibilityGapIds.every((id, index) => id === I241_REMAINING_ADMISSIBILITY_GAP_IDS[index]) &&
    i245.nonBlockingUnresolvedContextCount === 2 &&
    i245.nonBlockingUnresolvedContextIds.length === I244_NON_BLOCKING_UNRESOLVED_CONTEXT_IDS.length &&
    i245.nonBlockingUnresolvedContextIds.every((id, index) => id === I244_NON_BLOCKING_UNRESOLVED_CONTEXT_IDS[index]) &&
    i245.precisionCorrectedI243DirectPublicEvidenceRecordCount === 7 &&
    i245.precisionCorrectedI243SearchIndexLeadRecordCount === 1 &&
    i245.acquisitionPathCount === 4 &&
    i245.acquisitionPathIds.length === I245_ACQUISITION_PATH_IDS.length &&
    i245.acquisitionPathIds.every((id, index) => id === I245_ACQUISITION_PATH_IDS[index]) &&
    i245.acquisitionControlCount === 18 &&
    i245.acquisitionContractFrozen &&
    i245.targetedPublicAcquisitionAuthorized &&
    i245.acquisitionExecutedByThisGate === false &&
    i245.externalCustodianContactAuthorizedByThisGate === false &&
    i245.generalRuleRediscoveryMayCountAsProgress === false &&
    i245.publicMirrorDerivativeChainCompletionMayCountAsCanonicalAuthorityProgress === false &&
    i245.primaryIdentityRequiresCustodianCatalogShelfmarkOrEquivalentSourceChain &&
    i245.publisherDescriptionAloneMayEstablishPalaceCustodianBinding === false &&
    i245.exactPassageRequiresPrimaryOrVerified2011EditionPage &&
    i245.searchIndexSnippetMayEstablishExactPassage === false &&
    i245.verified2011PrintPageMayInventPalaceShelfmark === false &&
    i245.palaceFacsimileRequiresDocumentIdentityAndTargetPassageBinding &&
    i245.normativeAdmissibilityRequiresPrimaryIdentityAndExactPassageBinding &&
    i245.sameTextPublicWitnessesMayCountAsIndependentAuthorities === false &&
    i245.authorityGap === 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' &&
    i245.authorityGapClosed === false &&
    i245.authorityPromotedByThisGate === false &&
    i245.competingRelationSettlementResolved === false &&
    i245.hiddenStemI232HoldPreserved &&
    i245.hiddenStemTrackReopenedByThisGate === false &&
    i245.quWei2001HoldPreserved &&
    i245.li1998SameTargetPathSuspendedNotRetired &&
    i245.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i245.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i245.currentV2PackageAndCandidateSetRemainImmutable &&
    i245.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i245.evidenceRebindingAuthorizedByThisGate === false &&
    i245.provenanceIndependenceAdjudicatedByThisGate === false &&
    i245.derivativeRelationshipAdjudicatedByThisGate === false &&
    i245.actualCompositionPerformedByThisGate === false &&
    i245.multiSourceCompositionAuthorized === false &&
    i245.thresholdRuleCreatedByThisGate === false &&
    i245.damageEvaluationAuthorized === false &&
    i245.classificationAuthorized === false &&
    i245.numericScoringAuthorized === false &&
    i245.productionPolicyExecutionAuthorized === false &&
    i245.negativeFindingCreatedByThisGate === false &&
    i245.discoveryExhaustionClaimed === false &&
    i245.corpusExhaustionClaimed === false &&
    i245.recommendedNextGate === 'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_THREE_BLOCKING_RESIDUAL_CANONICAL_WITNESS_ACQUISITION_EVIDENCE'
  );
}

function evidenceRecords(): readonly I246PublicEvidenceRecord[] {
  return Object.freeze([
    {
      id: 'BOOKSCHINA_2011_FIRST_EDITION_METADATA_RECONFIRMATION',
      url: 'https://m.bookschina.com/5175914.htm',
      evidenceClass: 'DIRECT_BOOKSELLER_BIBLIOGRAPHIC_CONTEXT',
      directPublicContext: true,
      userUploadedOrShared: false,
      editionIdentityContextObserved: true,
      ssNumberObserved: null,
      exposedDocumentPageCount: 291,
      primaryCustodianCatalogBindingEstablished: false,
      palaceManuscriptShelfmarkEstablished: false,
      palaceFacsimileExactTargetPassageEstablished: false,
      verified2011PrintExactTargetPassagePageEstablished: false,
      qualifyingCanonicalWitness: false,
      notes: Object.freeze([
        'The 2011 华龄出版社 edition, ISBN 9787801788139 and palace-manuscript-basis publication description are reconfirmed as bibliographic context only.',
        'A bookseller publication description is not a custodian catalog or manuscript shelfmark.',
      ]),
    },
    {
      id: 'SCRIBD_USER_UPLOADED_2011_EDITION_SCAN_SURFACE_306P',
      url: 'https://www.scribd.com/document/898010778/',
      evidenceClass: 'USER_UPLOADED_SCAN_SURFACE',
      directPublicContext: true,
      userUploadedOrShared: true,
      editionIdentityContextObserved: true,
      ssNumberObserved: '13293187',
      exposedDocumentPageCount: 306,
      primaryCustodianCatalogBindingEstablished: false,
      palaceManuscriptShelfmarkEstablished: false,
      palaceFacsimileExactTargetPassageEstablished: false,
      verified2011PrintExactTargetPassagePageEstablished: false,
      qualifyingCanonicalWitness: false,
      notes: Object.freeze([
        'The public document surface identifies the 2011 book and exposes general metadata, but the uploader is not a custodian and the target page is not reproducibly exposed in the retrieved public context.',
        'The 306-page document-container count does not substitute for the printed 291-page bibliographic pagination.',
      ]),
    },
    {
      id: 'SHENJIGE_USER_SHARED_2011_EDITION_SCAN_SURFACE_SS13293187',
      url: 'https://www.shenjige.cn/details/_Oihy-SHj.html',
      evidenceClass: 'USER_SHARED_SCAN_DOWNLOAD_SURFACE',
      directPublicContext: true,
      userUploadedOrShared: true,
      editionIdentityContextObserved: true,
      ssNumberObserved: '13293187',
      exposedDocumentPageCount: null,
      primaryCustodianCatalogBindingEstablished: false,
      palaceManuscriptShelfmarkEstablished: false,
      palaceFacsimileExactTargetPassageEstablished: false,
      verified2011PrintExactTargetPassagePageEstablished: false,
      qualifyingCanonicalWitness: false,
      notes: Object.freeze([
        'The page advertises a 63.5M user-shared PDF named with SS 13293187 and exposes only introductory/contents excerpts in the public context.',
        'A gated user-share surface is not a source-bound palace-manuscript catalog, authorized facsimile or verified exact printed page.',
      ]),
    },
    {
      id: 'GUOXUESHUGE_USER_SHARED_2011_EDITION_SCAN_SURFACE_303P',
      url: 'https://guoxueshuge.com/yishuguan/43912.html',
      evidenceClass: 'USER_SHARED_SCAN_DOWNLOAD_SURFACE',
      directPublicContext: true,
      userUploadedOrShared: true,
      editionIdentityContextObserved: true,
      ssNumberObserved: null,
      exposedDocumentPageCount: 303,
      primaryCustodianCatalogBindingEstablished: false,
      palaceManuscriptShelfmarkEstablished: false,
      palaceFacsimileExactTargetPassageEstablished: false,
      verified2011PrintExactTargetPassagePageEstablished: false,
      qualifyingCanonicalWitness: false,
      notes: Object.freeze([
        'The page exposes a user-shared 303-page PDF surface but not a primary custodian identity chain or reproducible exact target page.',
        'The surface is contextual discovery evidence only and must not be promoted to canonical authority.',
      ]),
    },
  ]);
}

function attemptRecords(): readonly I246AcquisitionAttemptRecord[] {
  return Object.freeze([
    {
      pathId: 'PALACE_MANUSCRIPT_CUSTODIAN_CATALOG_SHELFMARK_BINDING_TRACE',
      executed: true,
      qualifyingWitnessCount: 0,
      contextualObservationCount: 1,
      disposition: 'NO_SOURCE_BOUND_CUSTODIAN_CATALOG_OR_SHELFMARK_ACQUIRED',
      negativeFindingCreated: false,
      exhaustionClaimed: false,
    },
    {
      pathId: 'PALACE_MANUSCRIPT_OR_AUTHORIZED_FACSIMILE_EXACT_TARGET_PASSAGE_BINDING_TRACE',
      executed: true,
      qualifyingWitnessCount: 0,
      contextualObservationCount: 3,
      disposition: 'NO_PALACE_OR_AUTHORIZED_FACSIMILE_EXACT_TARGET_PASSAGE_ACQUIRED',
      negativeFindingCreated: false,
      exhaustionClaimed: false,
    },
    {
      pathId: 'VERIFIED_2011_HUALING_PRINT_EXACT_TARGET_PASSAGE_PAGE_TRACE',
      executed: true,
      qualifyingWitnessCount: 0,
      contextualObservationCount: 3,
      disposition: 'NO_VERIFIED_2011_PRINT_PAGE_WITH_EXACT_TARGET_PASSAGE_ACQUIRED',
      negativeFindingCreated: false,
      exhaustionClaimed: false,
    },
    {
      pathId: 'PRIMARY_CANONICAL_WITNESS_RULE_BEARING_CONTEXT_NORMATIVE_ADMISSIBILITY_TRACE',
      executed: true,
      qualifyingWitnessCount: 0,
      contextualObservationCount: 4,
      disposition: 'NORMATIVE_ADMISSIBILITY_NOT_ADJUDICABLE_WITHOUT_PRIMARY_IDENTITY_AND_EXACT_PASSAGE',
      negativeFindingCreated: false,
      exhaustionClaimed: false,
    },
  ]);
}

function finalized(
  material: Omit<I246ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionEvidenceReport, 'evidenceId'>,
): I246ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionEvidenceReport {
  return {
    evidenceId: `i246_yuding_suijinlu_canonical_witness_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI246ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionEvidence(
  i245: I245ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionReadinessReviewReport,
): I246ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionEvidenceReport {
  const accepted = exactI245Accepted(i245);
  const records = accepted ? evidenceRecords() : Object.freeze([]);
  const attempts = accepted ? attemptRecords() : Object.freeze([]);
  return finalized({
    evidenceVersion: I246_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_THREE_BLOCKING_RESIDUAL_CANONICAL_WITNESS_ACQUISITION_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_THREE_BLOCKING_RESIDUAL_CANONICAL_WITNESS_ACQUISITION_EVIDENCE'
      : 'I245_ACQUISITION_READINESS_BOUNDARY_INVALID',
    decision: accepted
      ? 'FOUR_CANONICAL_WITNESS_PATHS_EXECUTED_THREE_USER_UPLOADED_OR_SHARED_SCAN_SURFACES_AND_2011_PRINT_METADATA_RECONFIRMATION_OBSERVED_ZERO_QUALIFYING_PRIMARY_CUSTODIAN_CATALOG_ZERO_PALACE_FACSIMILE_ZERO_VERIFIED_2011_EXACT_TARGET_PAGE_THREE_AUTHORITY_BLOCKING_RESIDUALS_REMAIN_NO_NEGATIVE_EXHAUSTION_NO_PROMOTION'
      : 'YUDING_SUIJINLU_CANONICAL_WITNESS_ACQUISITION_NOT_EXECUTED',
    upstreamI245ReviewId: i245.reviewId,
    exactI245BoundaryAccepted: accepted,
    targetScope: 'MULTIPLE_TRACKED_RELATION_TOUCHES_COMPETING_RELATION_SETTLEMENT',
    acquisitionExecuted: accepted,
    acquisitionAttemptRecords: attempts,
    acquisitionAttemptCount: accepted ? 4 : 0,
    publicEvidenceRecords: records,
    publicEvidenceRecordCount: accepted ? 4 : 0,
    newlyObservedUserUploadedOrSharedScanSurfaceCount: accepted ? 3 : 0,
    reconfirmed2011EditionMetadataRecordCount: accepted ? 1 : 0,
    targetPassageFingerprintIds: accepted ? I246_TARGET_PASSAGE_FINGERPRINT_IDS : Object.freeze([]),
    targetPassageFingerprintCount: accepted ? 6 : 0,
    targetPassageFingerprintSearchExecuted: accepted,
    officialOrInstitutionalDomainSearchExecuted: accepted,
    direct2011EditionScanSurfaceObserved: accepted,
    scanSurfaceMayEstablishCustodianAuthority: false,
    scanSurfaceMayEstablishPalaceShelfmark: false,
    ssNumberMayEstablishPalaceShelfmark: false,
    booksellerPalaceBasisDescriptionMayEstablishCustodianBinding: false,
    qualifyingPrimaryCustodianCatalogWitnessCount: 0,
    qualifyingPalaceFacsimileWitnessCount: 0,
    qualifyingVerified2011PrintExactTargetPageCount: 0,
    qualifyingCanonicalWitnessCount: 0,
    primaryCustodianSourceIdentityEstablished: false,
    palaceManuscriptShelfmarkEstablished: false,
    palaceManuscriptFacsimileAcquired: false,
    verified2011PrintExactTargetPassagePageAcquired: false,
    exactCanonicalTargetPassageBindingEstablished: false,
    finalTargetPassageNormativeAdmissibilityEstablished: false,
    authorityBlockingResidualIds: accepted ? I244_AUTHORITY_BLOCKING_RESIDUAL_IDS : Object.freeze([]),
    authorityBlockingResidualCount: accepted ? 3 : 0,
    blockingResidualsResolvedByThisGateCount: 0,
    legacyFormalAdmissibilityGapIds: accepted ? I241_REMAINING_ADMISSIBILITY_GAP_IDS : Object.freeze([]),
    legacyFormalAdmissibilityGapCount: accepted ? 4 : 0,
    legacyFormalGapsClosedByThisGateCount: 0,
    nonBlockingUnresolvedContextIds: accepted ? I244_NON_BLOCKING_UNRESOLVED_CONTEXT_IDS : Object.freeze([]),
    nonBlockingUnresolvedContextCount: accepted ? 2 : 0,
    publicMirrorDerivativeChainCompletionCountedAsAuthorityProgress: false,
    publicWitnessProvenanceIndependenceEstablished: false,
    sameTextPublicWitnessesCountedAsIndependentAuthorities: false,
    externalCustodianContactExecutedByThisGate: false,
    automatedPublicAcquisitionBoundaryAdjudicatedByThisGate: false,
    authorityGap: accepted ? 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' : 'UPSTREAM_INVALID',
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
    competingRelationSettlementResolved: false,
    crossRelationPrecedenceAuthorized: false,
    multiTouchAggregationAuthorized: false,
    supportChannelActivationVerdictAuthorized: false,
    supportChannelPersistenceVerdictAuthorized: false,
    supportChannelDestructionVerdictAuthorized: false,
    supportChannelNetEffectVerdictAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
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
      ? 'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_CANONICAL_WITNESS_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW'
      : 'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_THREE_BLOCKING_RESIDUAL_CANONICAL_WITNESS_ACQUISITION_EVIDENCE',
    notes: accepted
      ? Object.freeze([
          'I246 executed all four I245 public acquisition paths. It found scan/download surfaces for the 2011 edition but no source-bound palace-manuscript catalog identity, authorized facsimile, or reproducibly verified exact printed target page.',
          'SS 13293187 and user-uploaded scan-container pagination are discovery context only. Neither is a palace-manuscript shelfmark or custodian authority.',
          'Exact target fingerprints continued to resolve to public repost/text mirrors rather than a primary/facsimile or verified 2011 printed page, so no exact canonical passage binding is created.',
          'Official/institutional-domain search attempts produced no qualifying public witness in this pass; this is an access result, not evidence of nonexistence and not corpus exhaustion.',
          'I246 does not decide whether further automated public acquisition is methodologically justified; that question is reserved for the next evidence-adequacy/external-access reassessment gate.',
        ])
      : Object.freeze(['I246 fails closed unless the exact I245 four-path/eighteen-control readiness boundary is accepted.']),
  });
}
