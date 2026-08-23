import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I229_HIGHER_PROVENANCE_ACQUISITION_CONTROL_IDS,
  type I229SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionReadinessReviewReport,
} from './i229-source-ke-hidden-stem-interaction-eligibility-target-origin-higher-provenance-archival-or-custodian-acquisition-readiness-review.js';
import {
  I228_HIGHER_PROVENANCE_ACQUISITION_PATH_IDS,
  I228_RESIDUAL_ADMISSIBILITY_GAP_IDS,
  type I228HigherProvenanceAcquisitionPathId,
} from './i228-source-ke-hidden-stem-interaction-eligibility-target-origin-discovery-evidence-adequacy-residual-path-reassessment-review.js';

export const I230_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ARCHIVAL_OR_CUSTODIAN_ACQUISITION_EVIDENCE_VERSION =
  'myeonghwa-source-ke-hidden-stem-interaction-eligibility-target-origin-higher-provenance-archival-or-custodian-acquisition-evidence-v1';

export type I230HigherProvenanceAcquisitionDisposition =
  | 'ARCHIVE_ACCESS_ATTEMPTED_NO_QUALIFYING_PRE_TARGET_EXACT_SNAPSHOT_ACQUIRED'
  | 'AUTHOR_CONTROLLED_FIRST_PARTY_TARGET_BINDING_NOT_ACQUIRED'
  | 'PRE_TARGET_SAME_TEXT_FAMILY_LEAD_OBSERVED_NO_CANONICAL_EXACT_PASSAGE_BINDING'
  | 'CUSTODIAN_BOUND_EXACT_TARGET_WITNESS_NOT_ACQUIRED';

export interface I230HigherProvenanceAcquisitionRecord {
  pathId: I228HigherProvenanceAcquisitionPathId;
  disposition: I230HigherProvenanceAcquisitionDisposition;
  acquisitionExecuted: true;
  qualifyingHigherProvenanceWitnessAcquired: false;
  directOrSourceBoundLocators: readonly string[];
  leadOnlyLocators: readonly string[];
  finding: string;
  establishesExactTargetOriginalAuthorship: false;
  establishesExactTargetDoctrinalLineage: false;
  establishesExactTargetPriorSourceDependency: false;
  adjudicatesDerivativeRelationship: false;
  createsNegativeOrCorpusExhaustionFinding: false;
}

export interface I230SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionEvidenceReport {
  evidenceId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ARCHIVAL_OR_CUSTODIAN_ACQUISITION_EVIDENCE'
    | 'I229_HIGHER_PROVENANCE_ACQUISITION_READINESS_BOUNDARY_INVALID';
  decision:
    | 'FOUR_HIGHER_PROVENANCE_PATHS_EXECUTED_ONE_PRE_TARGET_SAME_TEXT_FAMILY_USER_GENERATED_WITNESS_LEAD_OBSERVED_NO_QUALIFYING_PRE_TARGET_ARCHIVE_AUTHOR_CONTROLLED_CANONICAL_OR_CUSTODIAN_EXACT_TARGET_WITNESS_ACQUIRED_FOUR_ADMISSIBILITY_GAPS_REMAIN_NO_NEGATIVE_EXHAUSTION_FINDING_NO_PROMOTION'
    | 'HIGHER_PROVENANCE_ACQUISITION_EVIDENCE_NOT_EXECUTED';
  upstreamI229ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI229BoundaryAccepted: boolean;
  targetSourceTerm: '克';
  targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY';
  targetCandidateId: 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML' | null;
  sevenRequirementCoverageAcceptedAsUpstreamFinding: boolean;
  coverageReevaluationPerformedByThisGate: false;
  acquisitionExecuted: boolean;
  executedAcquisitionPathCount: 4 | 0;
  acquisitionRecords: readonly I230HigherProvenanceAcquisitionRecord[];
  acquisitionRecordCount: 4 | 0;
  I229ControlsAccepted: boolean;
  I229ControlCount: 18 | 0;
  archiveSnapshotAccessAttempted: boolean;
  qualifyingPreTargetArchiveSnapshotAcquired: false;
  archiveAccessFailureCreatesNegativeFinding: false;
  authorControlledFirstPartySearchExecuted: boolean;
  qualifyingAuthorControlledExactTargetSourceAcquired: false;
  sohuAccountNameUsedAsOriginalAuthorshipEvidence: false;
  originalBookCourseCanonicalWitnessSearchExecuted: boolean;
  preTargetSameTextFamilyLeadObserved: boolean;
  preTargetSameTextFamilyLeadLocator: 'https://zhidao.baidu.com/question/503716527.html' | null;
  preTargetSameTextFamilyLeadApproximatePublicationEra: '2012_OR_EARLIER_INDEXED_ANSWER_CONTEXT' | null;
  preTargetSameTextFamilyLeadContainsHiddenStemNineRelationsAndExternalActivationLanguage: boolean;
  preTargetSameTextFamilyLeadContainsI226RareExactTargetPassage: false;
  preTargetSameTextFamilyLeadHasCanonicalEditionIdentity: false;
  preTargetSameTextFamilyLeadHasOriginalAuthorshipBinding: false;
  preTargetSameTextFamilyLeadMayEstablishTargetPredecessor: false;
  custodianBoundWitnessSearchExecuted: boolean;
  qualifyingCustodianBoundExactTargetWitnessAcquired: false;
  qualifyingHigherProvenanceWitnessCount: 0;
  unresolvedAdmissibilityGapIds: readonly string[];
  unresolvedAdmissibilityGapCount: 4 | 0;
  exactTargetOriginalAuthorshipEstablishedByThisGate: false;
  exactTargetDoctrinalLineageEstablishedByThisGate: false;
  exactTargetPriorSourceDependencyEstablishedByThisGate: false;
  derivativeRelationshipAdjudicatedByThisGate: false;
  restrictiveDoctrineConflictAdjudicatedByThisGate: false;
  restrictiveDoctrineSchoolBoundaryEstablishedByThisGate: false;
  sourceNormativeAdmissibilityAdjudicatedByThisGate: false;
  authorityPromotionReadinessEstablishedByThisGate: false;
  accessLimitationsRecorded: boolean;
  accessLimitationsEqualCorpusExhaustion: false;
  negativeFindingCreatedFromAccessFailureOrSilence: false;
  corpusExhaustionClaimed: false;
  authorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' | 'UPSTREAM_INVALID';
  authorityGapClosed: false;
  authorityPromotedByThisGate: false;
  candidateRegisteredByThisGate: false;
  candidateSelectedByThisGate: false;
  doctrinalConflictPreserved: boolean;
  doctrinalConflictResolvedByThisGate: false;
  quWei2001HoldPreserved: boolean;
  li1998SameTargetPathSuspendedNotRetired: boolean;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  evidenceRebindingAuthorizedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  candidateSetReevaluationAuthorizedByThisGate: false;
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE' | 'NOT_ASSESSED';
  actualCompositionPerformedByThisGate: false;
  multiSourceCompositionAuthorized: false;
  thresholdRuleCreatedByThisGate: false;
  damageEvaluationAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  productionPolicyExecutionAuthorized: false;
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ARCHIVAL_OR_CUSTODIAN_ACQUISITION_EVIDENCE';
  notes: readonly string[];
}

const BAIDU_PRE_TARGET_SAME_TEXT_FAMILY = 'https://zhidao.baidu.com/question/503716527.html' as const;

const ACQUISITION_RECORDS: readonly I230HigherProvenanceAcquisitionRecord[] = Object.freeze([
  Object.freeze({
    pathId: 'DATE_VERIFIED_ARCHIVE_SNAPSHOT_OR_WEB_CAPTURE',
    disposition: 'ARCHIVE_ACCESS_ATTEMPTED_NO_QUALIFYING_PRE_TARGET_EXACT_SNAPSHOT_ACQUIRED',
    acquisitionExecuted: true,
    qualifyingHigherProvenanceWitnessAcquired: false,
    directOrSourceBoundLocators: Object.freeze([]),
    leadOnlyLocators: Object.freeze(['https://web.archive.org/']),
    finding:
      'Archive-oriented access was attempted, but no source-bound pre-2017 snapshot carrying the exact target passage with capture date and context was acquired. Access limitation is recorded without a negative or exhaustion finding.',
    establishesExactTargetOriginalAuthorship: false,
    establishesExactTargetDoctrinalLineage: false,
    establishesExactTargetPriorSourceDependency: false,
    adjudicatesDerivativeRelationship: false,
    createsNegativeOrCorpusExhaustionFinding: false,
  }),
  Object.freeze({
    pathId: 'AUTHOR_CONTROLLED_OR_FIRST_PARTY_TARGET_TEXT_SOURCE',
    disposition: 'AUTHOR_CONTROLLED_FIRST_PARTY_TARGET_BINDING_NOT_ACQUIRED',
    acquisitionExecuted: true,
    qualifyingHigherProvenanceWitnessAcquired: false,
    directOrSourceBoundLocators: Object.freeze(['https://m.sohu.com/n/479788391/?wscrid=95360_8']),
    leadOnlyLocators: Object.freeze([]),
    finding:
      'The 2017 Sohu publication object remains directly bound, but its account label is not proof of original authorship or author control over the underlying doctrine. No separate author-controlled or first-party exact-target source with explicit attribution was acquired.',
    establishesExactTargetOriginalAuthorship: false,
    establishesExactTargetDoctrinalLineage: false,
    establishesExactTargetPriorSourceDependency: false,
    adjudicatesDerivativeRelationship: false,
    createsNegativeOrCorpusExhaustionFinding: false,
  }),
  Object.freeze({
    pathId: 'ORIGINAL_BOOK_COURSE_OR_CANONICAL_WITNESS_TARGET_PASSAGE',
    disposition: 'PRE_TARGET_SAME_TEXT_FAMILY_LEAD_OBSERVED_NO_CANONICAL_EXACT_PASSAGE_BINDING',
    acquisitionExecuted: true,
    qualifyingHigherProvenanceWitnessAcquired: false,
    directOrSourceBoundLocators: Object.freeze([]),
    leadOnlyLocators: Object.freeze([
      BAIDU_PRE_TARGET_SAME_TEXT_FAMILY,
      'https://zhidao.baidu.com/question/624783810742708244.html',
    ]),
    finding:
      'Pre-target Baidu Zhidao indexed answer material contains the same broader hidden-stem nine-relations and external-activation text family, materially predating the 2017 Sohu target. The indexed material does not bind the four I226 rare target phrases, a canonical edition, original authorship, or a reproducible book/course passage locator, so it remains lead-only and cannot establish the target predecessor.',
    establishesExactTargetOriginalAuthorship: false,
    establishesExactTargetDoctrinalLineage: false,
    establishesExactTargetPriorSourceDependency: false,
    adjudicatesDerivativeRelationship: false,
    createsNegativeOrCorpusExhaustionFinding: false,
  }),
  Object.freeze({
    pathId: 'CUSTODIAN_BOUND_FACSIMILE_OR_CATALOG_WITNESS',
    disposition: 'CUSTODIAN_BOUND_EXACT_TARGET_WITNESS_NOT_ACQUIRED',
    acquisitionExecuted: true,
    qualifyingHigherProvenanceWitnessAcquired: false,
    directOrSourceBoundLocators: Object.freeze([]),
    leadOnlyLocators: Object.freeze([]),
    finding:
      'No custodian-bound facsimile, catalog-plus-passage witness, custody chain, or verified transcription binding the exact target passage was acquired in this pass. This is an acquisition result only, not a nonexistence finding.',
    establishesExactTargetOriginalAuthorship: false,
    establishesExactTargetDoctrinalLineage: false,
    establishesExactTargetPriorSourceDependency: false,
    adjudicatesDerivativeRelationship: false,
    createsNegativeOrCorpusExhaustionFinding: false,
  }),
]);

function exactI229Accepted(
  i229: I229SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionReadinessReviewReport,
): boolean {
  return (
    i229.status ===
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ARCHIVAL_OR_CUSTODIAN_ACQUISITION_READINESS_REVIEW' &&
    i229.decision ===
      'FOUR_HIGHER_PROVENANCE_PATHS_EIGHTEEN_CONTROLS_FROZEN_NO_ACQUISITION_EXECUTED_NO_ORIGIN_LINEAGE_DERIVATIVE_ADJUDICATION_NO_PROMOTION' &&
    i229.exactI228BoundaryAccepted &&
    i229.targetCandidateId === 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML' &&
    i229.sevenRequirementCoverageAcceptedAsUpstreamFinding &&
    i229.coverageReevaluationAuthorizedByThisGate === false &&
    i229.residualAdmissibilityGapCount === 4 &&
    i229.residualAdmissibilityGapIds.length === 4 &&
    i229.residualAdmissibilityGapIds.every((gapId, index) => gapId === I228_RESIDUAL_ADMISSIBILITY_GAP_IDS[index]) &&
    i229.materiallyNewEvidenceClassRequired &&
    i229.acquisitionPathCount === 4 &&
    i229.acquisitionPathIds.length === 4 &&
    i229.acquisitionPathIds.every((pathId, index) => pathId === I228_HIGHER_PROVENANCE_ACQUISITION_PATH_IDS[index]) &&
    i229.acquisitionControlCount === 18 &&
    i229.acquisitionControlIds.length === 18 &&
    i229.acquisitionControlIds.every((controlId, index) => controlId === I229_HIGHER_PROVENANCE_ACQUISITION_CONTROL_IDS[index]) &&
    i229.acquisitionControlsFrozen &&
    i229.higherProvenanceAcquisitionAuthorized &&
    i229.higherProvenanceAcquisitionExecutedByThisGate === false &&
    i229.archiveSnapshotAcquisitionRequired &&
    i229.authorControlledFirstPartyAcquisitionRequired &&
    i229.originalBookCourseCanonicalWitnessAcquisitionRequired &&
    i229.custodianBoundWitnessAcquisitionRequired &&
    i229.archiveSnapshotRequiresPreTargetDateForPredecessorFinding &&
    i229.authorControlledSourceRequiresExactTargetBinding &&
    i229.canonicalWitnessRequiresExactTargetPassageAndLocator &&
    i229.custodianWitnessRequiresSourceChainAndPassageBinding &&
    i229.searchSnippetOrCatalogMetadataMayEstablishPositiveOriginFinding === false &&
    i229.postTargetSourceMayEstablishPriorDependency === false &&
    i229.alternateLineageMayBackfillTargetLineage === false &&
    i229.accessFailureCreatesNegativeFinding === false &&
    i229.corpusExhaustionClaimed === false &&
    i229.exactTargetOriginalAuthorshipEstablishedByThisGate === false &&
    i229.exactTargetDoctrinalLineageEstablishedByThisGate === false &&
    i229.exactTargetPriorSourceDependencyEstablishedByThisGate === false &&
    i229.derivativeRelationshipAdjudicatedByThisGate === false &&
    i229.restrictiveDoctrineConflictAdjudicatedByThisGate === false &&
    i229.restrictiveConflictAdjudicationDeferredUntilTargetLineageEstablished &&
    i229.sourceNormativeAdmissibilityAdjudicatedByThisGate === false &&
    i229.authorityPromotionReadinessEstablishedByThisGate === false &&
    i229.authorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i229.authorityGapClosed === false &&
    i229.authorityPromotedByThisGate === false &&
    i229.doctrinalConflictPreserved &&
    i229.doctrinalConflictResolvedByThisGate === false &&
    i229.quWei2001HoldPreserved &&
    i229.li1998SameTargetPathSuspendedNotRetired &&
    i229.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i229.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i229.provenanceIndependenceAdjudicatedByThisGate === false &&
    i229.evidenceRebindingAuthorizedByThisGate === false &&
    i229.candidateSetMutatedByThisGate === false &&
    i229.candidateSetReevaluationAuthorizedByThisGate === false &&
    i229.currentV2PackageAndCandidateSetRemainImmutable &&
    i229.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i229.actualCompositionPerformedByThisGate === false &&
    i229.multiSourceCompositionAuthorized === false &&
    i229.thresholdRuleCreatedByThisGate === false &&
    i229.damageEvaluationAuthorized === false &&
    i229.classificationAuthorized === false &&
    i229.numericScoringAuthorized === false &&
    i229.productionPolicyExecutionAuthorized === false &&
    i229.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ARCHIVAL_OR_CUSTODIAN_ACQUISITION_EVIDENCE'
  );
}

function finalized(
  material: Omit<
    I230SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionEvidenceReport,
    'evidenceId'
  >,
): I230SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionEvidenceReport {
  return {
    evidenceId: `i230_hidden_stem_target_origin_higher_provenance_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI230SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionEvidence(
  i229: I229SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionReadinessReviewReport,
): I230SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionEvidenceReport {
  const accepted = exactI229Accepted(i229);
  return finalized({
    evidenceVersion:
      I230_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ARCHIVAL_OR_CUSTODIAN_ACQUISITION_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ARCHIVAL_OR_CUSTODIAN_ACQUISITION_EVIDENCE'
      : 'I229_HIGHER_PROVENANCE_ACQUISITION_READINESS_BOUNDARY_INVALID',
    decision: accepted
      ? 'FOUR_HIGHER_PROVENANCE_PATHS_EXECUTED_ONE_PRE_TARGET_SAME_TEXT_FAMILY_USER_GENERATED_WITNESS_LEAD_OBSERVED_NO_QUALIFYING_PRE_TARGET_ARCHIVE_AUTHOR_CONTROLLED_CANONICAL_OR_CUSTODIAN_EXACT_TARGET_WITNESS_ACQUIRED_FOUR_ADMISSIBILITY_GAPS_REMAIN_NO_NEGATIVE_EXHAUSTION_FINDING_NO_PROMOTION'
      : 'HIGHER_PROVENANCE_ACQUISITION_EVIDENCE_NOT_EXECUTED',
    upstreamI229ReviewId: i229.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI229BoundaryAccepted: accepted,
    targetSourceTerm: '克',
    targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY',
    targetCandidateId: accepted ? 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML' : null,
    sevenRequirementCoverageAcceptedAsUpstreamFinding: accepted,
    coverageReevaluationPerformedByThisGate: false,
    acquisitionExecuted: accepted,
    executedAcquisitionPathCount: accepted ? 4 : 0,
    acquisitionRecords: accepted ? ACQUISITION_RECORDS : [],
    acquisitionRecordCount: accepted ? 4 : 0,
    I229ControlsAccepted: accepted,
    I229ControlCount: accepted ? 18 : 0,
    archiveSnapshotAccessAttempted: accepted,
    qualifyingPreTargetArchiveSnapshotAcquired: false,
    archiveAccessFailureCreatesNegativeFinding: false,
    authorControlledFirstPartySearchExecuted: accepted,
    qualifyingAuthorControlledExactTargetSourceAcquired: false,
    sohuAccountNameUsedAsOriginalAuthorshipEvidence: false,
    originalBookCourseCanonicalWitnessSearchExecuted: accepted,
    preTargetSameTextFamilyLeadObserved: accepted,
    preTargetSameTextFamilyLeadLocator: accepted ? BAIDU_PRE_TARGET_SAME_TEXT_FAMILY : null,
    preTargetSameTextFamilyLeadApproximatePublicationEra: accepted ? '2012_OR_EARLIER_INDEXED_ANSWER_CONTEXT' : null,
    preTargetSameTextFamilyLeadContainsHiddenStemNineRelationsAndExternalActivationLanguage: accepted,
    preTargetSameTextFamilyLeadContainsI226RareExactTargetPassage: false,
    preTargetSameTextFamilyLeadHasCanonicalEditionIdentity: false,
    preTargetSameTextFamilyLeadHasOriginalAuthorshipBinding: false,
    preTargetSameTextFamilyLeadMayEstablishTargetPredecessor: false,
    custodianBoundWitnessSearchExecuted: accepted,
    qualifyingCustodianBoundExactTargetWitnessAcquired: false,
    qualifyingHigherProvenanceWitnessCount: 0,
    unresolvedAdmissibilityGapIds: accepted ? I228_RESIDUAL_ADMISSIBILITY_GAP_IDS : [],
    unresolvedAdmissibilityGapCount: accepted ? 4 : 0,
    exactTargetOriginalAuthorshipEstablishedByThisGate: false,
    exactTargetDoctrinalLineageEstablishedByThisGate: false,
    exactTargetPriorSourceDependencyEstablishedByThisGate: false,
    derivativeRelationshipAdjudicatedByThisGate: false,
    restrictiveDoctrineConflictAdjudicatedByThisGate: false,
    restrictiveDoctrineSchoolBoundaryEstablishedByThisGate: false,
    sourceNormativeAdmissibilityAdjudicatedByThisGate: false,
    authorityPromotionReadinessEstablishedByThisGate: false,
    accessLimitationsRecorded: accepted,
    accessLimitationsEqualCorpusExhaustion: false,
    negativeFindingCreatedFromAccessFailureOrSilence: false,
    corpusExhaustionClaimed: false,
    authorityGap: accepted
      ? 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED'
      : 'UPSTREAM_INVALID',
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
    candidateRegisteredByThisGate: false,
    candidateSelectedByThisGate: false,
    doctrinalConflictPreserved: accepted,
    doctrinalConflictResolvedByThisGate: false,
    quWei2001HoldPreserved: accepted,
    li1998SameTargetPathSuspendedNotRetired: accepted,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: accepted,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    evidenceRebindingAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: accepted,
    currentV2ProvenanceDisposition: accepted ? 'BLOCKED_UNDER_CURRENT_EVIDENCE' : 'NOT_ASSESSED',
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    productionPolicyExecutionAuthorized: false,
    recommendedNextGate: accepted
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ARCHIVAL_OR_CUSTODIAN_ACQUISITION_EVIDENCE',
    notes: accepted
      ? Object.freeze([
          'I230 executes all four I229 higher-provenance acquisition classes but acquires no qualifying exact-target higher-provenance witness.',
          'A materially interesting pre-target Baidu answer preserves the broader hidden-stem nine-relations/external-activation text family, but lacks the I226 rare exact passage, canonical edition identity, and original-authorship binding.',
          'Archive access limitation, first-party-source non-acquisition, canonical-witness non-acquisition and custodian-witness non-acquisition are current-pass results only and do not establish nonexistence or corpus exhaustion.',
          'All four admissibility gaps and every I132, Qu Wei, Li 1998, candidate-set and production guard remain unchanged.',
        ])
      : Object.freeze(['I229 higher-provenance acquisition readiness boundary was not accepted; no I230 evidence was materialized.']),
  });
}
