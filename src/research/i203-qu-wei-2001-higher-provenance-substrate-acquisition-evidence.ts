import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I202_ACQUISITION_CONTROL_IDS,
  I202_ACQUISITION_PATH_IDS,
  I202_EVIDENCE_OBLIGATION_IDS,
  type I202AcquisitionPathId,
  type I202QuWei2001HigherProvenanceSubstrateAcquisitionReadinessReviewReport,
} from './i202-qu-wei-2001-higher-provenance-substrate-acquisition-readiness-review.js';

export const I203_QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_EVIDENCE_VERSION =
  'myeonghwa-qu-wei-2001-higher-provenance-substrate-acquisition-evidence-v1';

export const I203_RESOLVED_GAP_IDS = Object.freeze([
  'QU_WEI_2001_PUBLICATION_MEDIUM_OR_ENTITY_IDENTITY_GAP',
] as const);

export const I203_UNRESOLVED_GAP_IDS = Object.freeze([
  'QU_WEI_2001_CANONICAL_WITNESS_NORMALIZATION_GAP',
  'QU_WEI_2001_EXACT_TARGET_PASSAGE_BINDING_GAP',
] as const);

export type I203ResolvedGapId = (typeof I203_RESOLVED_GAP_IDS)[number];
export type I203UnresolvedGapId = (typeof I203_UNRESOLVED_GAP_IDS)[number];

export type I203EvidenceFinding =
  | 'QUALIFYING_FIRST_PARTY_2001_BOOK_MEDIUM_BINDING_ACQUIRED'
  | 'UNRESOLVED_AFTER_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION';

export interface I203AcquisitionPathEvidenceRecord {
  pathId: I202AcquisitionPathId;
  finding: I203EvidenceFinding;
  sourceLocators: readonly string[];
  observations: readonly string[];
  higherProvenanceEvidenceAcquired: boolean;
  qualifyingGapResolutionEvidenceAcquired: boolean;
  resolvedGapIds: readonly I203ResolvedGapId[];
}

export interface I203QuWei2001HigherProvenanceSubstrateAcquisitionEvidenceReport {
  evidenceRecordSetId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_EVIDENCE'
    | 'I202_HIGHER_PROVENANCE_ACQUISITION_READINESS_BOUNDARY_INVALID';
  decision:
    | 'QU_WEI_2001_HIGHER_PROVENANCE_ACQUISITION_EXECUTED_FOUR_PATHS_FIRST_PARTY_2001_BOOK_MEDIUM_BINDING_RESOLVES_PUBLICATION_GAP_TWO_GAPS_REMAIN_NO_CANONICAL_NORMALIZATION_NO_EXACT_PASSAGE_BINDING_NO_NEGATIVE_FINDING_NO_REBINDING_NO_INDEPENDENCE'
    | 'QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_EVIDENCE_NOT_EXECUTED';
  upstreamI202ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI202BoundaryAccepted: boolean;
  targetPriorWitnessId: 'QU_WEI_SIZHU_XIANGZHEN_2001' | null;
  acquisitionPathCountExecuted: 4 | 0;
  allFourFrozenAcquisitionPathsExecuted: boolean;
  acquisitionPathEvidenceRecords: readonly I203AcquisitionPathEvidenceRecord[];
  acquisitionPathEvidenceRecordCount: 4 | 0;
  evidenceObligationCountAccepted: 8 | 0;
  acquisitionControlCountAccepted: 18 | 0;
  higherProvenanceEvidencePathCount: 1 | 0;
  qualifyingGapResolutionEvidenceCount: 1 | 0;
  resolvedGapIds: readonly I203ResolvedGapId[];
  unresolvedGapIds: readonly I203UnresolvedGapId[];
  resolvedGapCount: 1 | 0;
  unresolvedGapCount: 2 | 0;
  explicitNegativeFindingCount: 0;
  physicalOrFirstGenerationWitnessAcquired: false;
  physicalWitnessTitleCopyrightImprintOrColophonCaptured: false;
  physicalWitnessChainOfCustodyEstablished: false;
  authorBrandedFirstPartyIssuanceRecordAcquired: boolean;
  firstPartyIssuanceRecordSourceLocator: 'https://www.zhouyiqw.com/qwjj.php' | null;
  firstPartyRecordExplicitlyBindsAuthorIdentity: boolean;
  firstPartyRecordExplicitlyBindsTitle: boolean;
  firstPartyRecordExplicitlyBinds2001: boolean;
  firstPartyRecordIdentifiesBookMedium: boolean;
  firstPartyRecordEstablishesMadeAvailableStatus: boolean;
  explicit2001NonformalPublicationStatusEstablished: boolean;
  publicationMediumIdentityEstablished: boolean;
  publicationEntityIdentityEstablished: false;
  formal2001PublisherEstablished: false;
  formal2001IsbnEstablished: false;
  secondaryAggregatorPublisherLabelUsedAsAuthority: false;
  secondaryAggregatorIsbnUsedAsAuthority: false;
  publicationMediumOrEntityIdentityEstablished: boolean;
  publicationIdentityGapResolved: boolean;
  byteStableDirectFilePairAcquired: false;
  stableCrossRepresentationHashFamilyAcquired: false;
  scanLineageOrTransformationProvenanceAcquired: false;
  directCrossRepresentationStructureNormalizationCompleted: false;
  pageCountFileSizeFilenameHostVarianceCreatesCanonicalIdentity: false;
  canonicalWitnessNormalizationGapResolved: false;
  canonicallyBound2001TargetSectionFacsimileAcquired: false;
  direct2001TargetSectionContextAnchorAcquiredByThisGate: false;
  direct2001To2003TargetSequenceComparisonCompletedByThisGate: false;
  exact2003RouteSequenceBoundIntoCanonical2001Witness: false;
  nearVerbatim2003RouteSequenceBoundIntoCanonical2001Witness: false;
  directDoctrinalAntecedentPreserved: boolean;
  doctrineLevelAntecedentMayResolveExactPassageGap: false;
  exactTargetPassageBindingGapResolved: false;
  evidenceForOneGapMayBackfillAnotherGap: false;
  inaccessibleSubstrateCreatesNegativeFinding: false;
  unavailableCustodianCreatesNegativeFinding: false;
  nonAcquisitionCreatesNegativeFinding: false;
  accessFailureCreatesNegativeFinding: false;
  failureToAcquirePhysicalWitnessCreatesNegativeFinding: false;
  failureToAcquireByteStablePairCreatesNegativeFinding: false;
  failureToAcquireCanonicalFacsimileCreatesNegativeFinding: false;
  onlineCorpusExhaustionEstablished: false;
  corpusExhaustionEstablished: false;
  allOriginalThreeGapRequirementsMustBeSatisfiedBeforeRebinding: boolean;
  twoGapsRemainBlockingRebinding: boolean;
  evidenceRebindingMethodologicallyReadyByThisGate: false;
  evidenceRebindingAuthorizedByThisGate: false;
  evidenceRebindingExecutedByThisGate: false;
  sameAuthor2001To2003DoctrinalDependencyPreserved: boolean;
  externalTargetLineageUnresolvedQuestionCountPreserved: 3 | 0;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_EVIDENCE_ADEQUACY_REBINDING_PATH_REASSESSMENT_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_EVIDENCE';
  notes: readonly string[];
}

function exactI202Accepted(i202: I202QuWei2001HigherProvenanceSubstrateAcquisitionReadinessReviewReport): boolean {
  return (
    i202.status === 'RESOLVED_QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_READINESS_REVIEW' &&
    i202.decision ===
      'I201_BOUNDARY_SUPPORTS_QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_FOUR_PATHS_EIGHT_OBLIGATIONS_EIGHTEEN_CONTROLS_FROZEN_EVIDENCE_COLLECTION_ONLY_INACCESSIBILITY_NON_NEGATIVE_NO_REBINDING_NO_INDEPENDENCE' &&
    i202.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i202.policyVersion === 'v1-definition' &&
    i202.adoptionVersion === 'v1-adoption' &&
    i202.currentCandidateSetVersion === 'v1-candidate-set' &&
    i202.currentInputPackageVersion === 'v2-input-package' &&
    i202.exactI201BoundaryAccepted &&
    i202.targetPriorWitnessId === 'QU_WEI_SIZHU_XIANGZHEN_2001' &&
    i202.targetAuthor === '曲炜' &&
    i202.targetTitle === '《四柱详真》' &&
    i202.targetAppearanceYear === 2001 &&
    i202.unresolvedGapCountAtEntry === 3 &&
    i202.publicationIdentityGapOpenAtEntry &&
    i202.canonicalWitnessNormalizationGapOpenAtEntry &&
    i202.exactTargetPassageBindingGapOpenAtEntry &&
    i202.acquisitionPathCount === 4 &&
    i202.acquisitionPathIds.length === 4 &&
    i202.acquisitionPathIds.every((id, index) => id === I202_ACQUISITION_PATH_IDS[index]) &&
    i202.acquisitionPathsFrozenProspectively &&
    i202.evidenceObligationCount === 8 &&
    i202.evidenceObligationIds.length === 8 &&
    i202.evidenceObligationIds.every((id, index) => id === I202_EVIDENCE_OBLIGATION_IDS[index]) &&
    i202.evidenceObligationsFrozenProspectively &&
    i202.acquisitionControlCount === 18 &&
    i202.acquisitionControlIds.length === 18 &&
    i202.acquisitionControlIds.every((id, index) => id === I202_ACQUISITION_CONTROL_IDS[index]) &&
    i202.acquisitionControlsFrozenProspectively &&
    i202.physicalOrFirstGenerationWitnessRequiresReproducibleIdentity &&
    i202.physicalOrFirstGenerationWitnessRequiresProvenanceContext &&
    i202.directWitnessTitleCopyrightImprintColophonCaptureRequired &&
    i202.firstPartyOrArchiveRecordRequiresExplicitAuthorTitle2001Binding &&
    i202.laterMetadataMayBackfill2001IssuanceIdentity === false &&
    i202.secondaryCatalogMayBackfill2001IssuanceIdentity === false &&
    i202.byteStableRepresentationHashesOrEquivalentIdsRequired &&
    i202.scanLineageOrTransformationProvenanceRequiredWhereAvailable &&
    i202.directStructureComparisonRequiredForNormalization &&
    i202.pageCountFileSizeFilenameHostVarianceAloneMayResolveNormalization === false &&
    i202.targetFacsimileRequiresCanonical2001Binding &&
    i202.targetFacsimileRequiresContextAnchor &&
    i202.direct2001To2003SequenceComparisonRequired &&
    i202.doctrineLevelAntecedentAloneMayResolveExactPassageBinding === false &&
    i202.evidenceForOneGapMayBackfillAnotherGap === false &&
    i202.higherProvenanceSubstrateAcquisitionMayProceed &&
    i202.authorizationIsEvidenceCollectionOnly &&
    i202.acquisitionExecutedByThisGate === false &&
    i202.evidenceAcquiredByThisGate === false &&
    i202.inaccessibleSubstrateCreatesNegativeFinding === false &&
    i202.unavailableCustodianCreatesNegativeFinding === false &&
    i202.nonAcquisitionCreatesNegativeFinding === false &&
    i202.accessFailureCreatesNegativeFinding === false &&
    i202.onlineCorpusExhaustionEstablished === false &&
    i202.corpusExhaustionEstablished === false &&
    i202.allThreeGapsRequiredBeforeRebindingReadiness &&
    i202.evidenceRebindingMethodologicallyReady === false &&
    i202.evidenceRebindingAuthorizedByThisGate === false &&
    i202.evidenceRebindingExecutedByThisGate === false &&
    i202.sameAuthor2001To2003DoctrinalDependencyPreserved &&
    i202.externalTargetLineageUnresolvedQuestionCount === 3 &&
    i202.provenanceIndependenceAdjudicatedByThisGate === false &&
    i202.independentNormativeProvenanceEstablishedCount === 0 &&
    i202.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i202.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i202.currentV2PackageAndCandidateSetRemainImmutable &&
    i202.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i202.candidateSetMutatedByThisGate === false &&
    i202.candidateSetReevaluationAuthorizedByThisGate === false &&
    i202.productionPolicyExecutionAuthorized === false &&
    i202.actualCompositionPerformedByThisGate === false &&
    i202.multiSourceCompositionAuthorized === false &&
    i202.thresholdRuleCreatedByThisGate === false &&
    i202.classificationAuthorized === false &&
    i202.numericScoringAuthorized === false &&
    i202.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_EVIDENCE'
  );
}

function evidenceRecords(): readonly I203AcquisitionPathEvidenceRecord[] {
  return Object.freeze([
    {
      pathId: 'PHYSICAL_OR_FIRST_GENERATION_2001_WITNESS_TITLE_COPYRIGHT_COLOPHON_ACQUISITION',
      finding: 'UNRESOLVED_AFTER_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION',
      sourceLocators: Object.freeze([]),
      observations: Object.freeze([
        'No physical or demonstrably first-generation 2001 witness with reproducible chain-of-custody context was acquired in this bounded pass.',
        'Absence of acquisition is not treated as evidence that such a witness does not exist.',
      ]),
      higherProvenanceEvidenceAcquired: false,
      qualifyingGapResolutionEvidenceAcquired: false,
      resolvedGapIds: Object.freeze([]),
    },
    {
      pathId: 'AUTHOR_PUBLISHER_OR_ARCHIVAL_FIRST_PARTY_2001_ISSUANCE_RECORD_ACQUISITION',
      finding: 'QUALIFYING_FIRST_PARTY_2001_BOOK_MEDIUM_BINDING_ACQUIRED',
      sourceLocators: Object.freeze(['https://www.zhouyiqw.com/qwjj.php']),
      observations: Object.freeze([
        'The author-branded 曲炜周易预测网 chronology has a 2001 entry that names 《四柱详真》 among 曲炜’s debut works and records that the works became available that year.',
        'The same 2001 chronology identifies the two named works as books, supplying first-party book-medium identity without relying on a secondary catalog label.',
        'This establishes a nonformal 2001 publication-status and book-medium binding for 《四柱详真》; it does not establish a formal publisher, ISBN, colophon, or edition/printing identity.',
      ]),
      higherProvenanceEvidenceAcquired: true,
      qualifyingGapResolutionEvidenceAcquired: true,
      resolvedGapIds: I203_RESOLVED_GAP_IDS,
    },
    {
      pathId: 'BYTE_STABLE_DIRECT_FILE_PAIR_OR_SCAN_LINEAGE_PROVENANCE_ACQUISITION',
      finding: 'UNRESOLVED_AFTER_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION',
      sourceLocators: Object.freeze([]),
      observations: Object.freeze([
        'No byte-stable direct file pair with independently reproducible hashes and scan-lineage or transformation provenance was acquired.',
        'Previously observed page-count, file-size, filename, and host variance remains representation context only and cannot normalize the canonical witness.',
      ]),
      higherProvenanceEvidenceAcquired: false,
      qualifyingGapResolutionEvidenceAcquired: false,
      resolvedGapIds: Object.freeze([]),
    },
    {
      pathId: 'PHYSICAL_OR_CANONICALLY_BOUND_2001_TARGET_SECTION_FACSIMILE_COMPARISON',
      finding: 'UNRESOLVED_AFTER_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION',
      sourceLocators: Object.freeze([]),
      observations: Object.freeze([
        'No physical or canonically bound 2001 target-section facsimile carrying the required context anchor was acquired.',
        'The direct 2001 doctrine-level antecedent remains preserved, but it is not promoted into exact or near-verbatim identity with the governed 2003 route sequence.',
      ]),
      higherProvenanceEvidenceAcquired: false,
      qualifyingGapResolutionEvidenceAcquired: false,
      resolvedGapIds: Object.freeze([]),
    },
  ]);
}

function finalized(
  material: Omit<I203QuWei2001HigherProvenanceSubstrateAcquisitionEvidenceReport, 'evidenceRecordSetId'>,
): I203QuWei2001HigherProvenanceSubstrateAcquisitionEvidenceReport {
  return {
    evidenceRecordSetId: `i203_qu_wei_2001_higher_provenance_acquisition_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI203QuWei2001HigherProvenanceSubstrateAcquisitionEvidence(
  i202: I202QuWei2001HigherProvenanceSubstrateAcquisitionReadinessReviewReport,
): I203QuWei2001HigherProvenanceSubstrateAcquisitionEvidenceReport {
  const accepted = exactI202Accepted(i202);
  const records = accepted ? evidenceRecords() : Object.freeze([] as I203AcquisitionPathEvidenceRecord[]);

  return finalized({
    evidenceVersion: I203_QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_EVIDENCE'
      : 'I202_HIGHER_PROVENANCE_ACQUISITION_READINESS_BOUNDARY_INVALID',
    decision: accepted
      ? 'QU_WEI_2001_HIGHER_PROVENANCE_ACQUISITION_EXECUTED_FOUR_PATHS_FIRST_PARTY_2001_BOOK_MEDIUM_BINDING_RESOLVES_PUBLICATION_GAP_TWO_GAPS_REMAIN_NO_CANONICAL_NORMALIZATION_NO_EXACT_PASSAGE_BINDING_NO_NEGATIVE_FINDING_NO_REBINDING_NO_INDEPENDENCE'
      : 'QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_EVIDENCE_NOT_EXECUTED',
    upstreamI202ReviewId: i202.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI202BoundaryAccepted: accepted,
    targetPriorWitnessId: accepted ? 'QU_WEI_SIZHU_XIANGZHEN_2001' : null,
    acquisitionPathCountExecuted: accepted ? 4 : 0,
    allFourFrozenAcquisitionPathsExecuted: accepted,
    acquisitionPathEvidenceRecords: records,
    acquisitionPathEvidenceRecordCount: accepted ? 4 : 0,
    evidenceObligationCountAccepted: accepted ? 8 : 0,
    acquisitionControlCountAccepted: accepted ? 18 : 0,
    higherProvenanceEvidencePathCount: accepted ? 1 : 0,
    qualifyingGapResolutionEvidenceCount: accepted ? 1 : 0,
    resolvedGapIds: accepted ? I203_RESOLVED_GAP_IDS : Object.freeze([]),
    unresolvedGapIds: accepted ? I203_UNRESOLVED_GAP_IDS : Object.freeze([]),
    resolvedGapCount: accepted ? 1 : 0,
    unresolvedGapCount: accepted ? 2 : 0,
    explicitNegativeFindingCount: 0,
    physicalOrFirstGenerationWitnessAcquired: false,
    physicalWitnessTitleCopyrightImprintOrColophonCaptured: false,
    physicalWitnessChainOfCustodyEstablished: false,
    authorBrandedFirstPartyIssuanceRecordAcquired: accepted,
    firstPartyIssuanceRecordSourceLocator: accepted ? 'https://www.zhouyiqw.com/qwjj.php' : null,
    firstPartyRecordExplicitlyBindsAuthorIdentity: accepted,
    firstPartyRecordExplicitlyBindsTitle: accepted,
    firstPartyRecordExplicitlyBinds2001: accepted,
    firstPartyRecordIdentifiesBookMedium: accepted,
    firstPartyRecordEstablishesMadeAvailableStatus: accepted,
    explicit2001NonformalPublicationStatusEstablished: accepted,
    publicationMediumIdentityEstablished: accepted,
    publicationEntityIdentityEstablished: false,
    formal2001PublisherEstablished: false,
    formal2001IsbnEstablished: false,
    secondaryAggregatorPublisherLabelUsedAsAuthority: false,
    secondaryAggregatorIsbnUsedAsAuthority: false,
    publicationMediumOrEntityIdentityEstablished: accepted,
    publicationIdentityGapResolved: accepted,
    byteStableDirectFilePairAcquired: false,
    stableCrossRepresentationHashFamilyAcquired: false,
    scanLineageOrTransformationProvenanceAcquired: false,
    directCrossRepresentationStructureNormalizationCompleted: false,
    pageCountFileSizeFilenameHostVarianceCreatesCanonicalIdentity: false,
    canonicalWitnessNormalizationGapResolved: false,
    canonicallyBound2001TargetSectionFacsimileAcquired: false,
    direct2001TargetSectionContextAnchorAcquiredByThisGate: false,
    direct2001To2003TargetSequenceComparisonCompletedByThisGate: false,
    exact2003RouteSequenceBoundIntoCanonical2001Witness: false,
    nearVerbatim2003RouteSequenceBoundIntoCanonical2001Witness: false,
    directDoctrinalAntecedentPreserved: accepted,
    doctrineLevelAntecedentMayResolveExactPassageGap: false,
    exactTargetPassageBindingGapResolved: false,
    evidenceForOneGapMayBackfillAnotherGap: false,
    inaccessibleSubstrateCreatesNegativeFinding: false,
    unavailableCustodianCreatesNegativeFinding: false,
    nonAcquisitionCreatesNegativeFinding: false,
    accessFailureCreatesNegativeFinding: false,
    failureToAcquirePhysicalWitnessCreatesNegativeFinding: false,
    failureToAcquireByteStablePairCreatesNegativeFinding: false,
    failureToAcquireCanonicalFacsimileCreatesNegativeFinding: false,
    onlineCorpusExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    allOriginalThreeGapRequirementsMustBeSatisfiedBeforeRebinding: accepted,
    twoGapsRemainBlockingRebinding: accepted,
    evidenceRebindingMethodologicallyReadyByThisGate: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    sameAuthor2001To2003DoctrinalDependencyPreserved: accepted,
    externalTargetLineageUnresolvedQuestionCountPreserved: accepted ? 3 : 0,
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_EVIDENCE_ADEQUACY_REBINDING_PATH_REASSESSMENT_REVIEW'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_EVIDENCE',
    notes: accepted
      ? Object.freeze([
          'I203 executes all four I202 higher-provenance paths and acquires one qualifying first-party 2001 issuance/book-medium binding from the author-branded 曲炜周易预测网 chronology.',
          'The first-party chronology explicitly binds 曲炜, 四柱详真, the 2001 chronology entry, and book-medium/made-available status; this resolves the publication-medium-or-entity identity gap without inventing a formal publisher or ISBN.',
          'No physical or first-generation witness, byte-stable file-pair/scan lineage, or canonically bound 2001 target-section facsimile was acquired; those non-acquisitions remain unresolved and non-negative.',
          'Canonical witness normalization and exact/near-verbatim target-passage binding therefore remain unresolved, so rebinding is still not methodologically ready.',
          'The direct 2001 doctrine-level antecedent is preserved but is not promoted into exact passage identity.',
          'No independence adjudication, I132 relaxation, candidate mutation or reevaluation, composition, threshold creation, classification, scoring, or production authority is granted.',
        ])
      : Object.freeze(['I202 boundary mismatch prevents higher-provenance acquisition evidence execution.']),
  });
}
