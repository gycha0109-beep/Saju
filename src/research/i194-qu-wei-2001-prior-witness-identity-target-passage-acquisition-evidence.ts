import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I193QuWei2001PriorWitnessIdentityTargetPassageAcquisitionReadinessReviewReport } from './i193-qu-wei-2001-prior-witness-identity-target-passage-acquisition-readiness-review.js';

export const I194_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_ACQUISITION_EVIDENCE_VERSION =
  'myeonghwa-qu-wei-2001-prior-witness-identity-target-passage-acquisition-evidence-v1';

export type I194EvidenceFinding =
  | 'SATISFIED'
  | 'PARTIALLY_SATISFIED'
  | 'UNRESOLVED_AFTER_BOUNDED_ACQUISITION';

export type I194EvidenceFunctionId =
  | 'AUTHOR_TITLE_YEAR_APPEARANCE_BASIS'
  | 'PUBLICATION_MEDIUM_OR_EXPLICIT_NONFORMAL_STATUS_IDENTITY'
  | 'REPRODUCIBLE_2001_WITNESS_IDENTITY'
  | 'EDITION_PRINTING_OR_REPRESENTATION_IDENTITY'
  | 'DIRECT_2001_TARGET_SCOPE_CONTENT_WITNESS'
  | 'TARGET_PASSAGE_2001_TO_2003_COMPARISON'
  | 'DUPLICATE_VARIANT_NORMALIZATION_METADATA'
  | 'SAME_AUTHOR_DEPENDENCY_PROVENANCE_PRESERVATION';

export type I194TargetPassageMatchType =
  | 'DOCTRINE_LEVEL_ANTECEDENT_WITH_NO_VERBATIM_BINDING_ESTABLISHED'
  | 'UNRESOLVED';

export interface I194EvidenceRecord {
  functionId: I194EvidenceFunctionId;
  finding: I194EvidenceFinding;
  sourceLocators: readonly string[];
  evidenceSummary: readonly string[];
}

export interface I194QuWei2001PriorWitnessIdentityTargetPassageAcquisitionEvidenceReport {
  evidenceRecordSetId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_ACQUISITION_EVIDENCE'
    | 'I193_ACQUISITION_READINESS_BOUNDARY_INVALID';
  decision:
    | 'QU_WEI_2001_BOUNDED_ACQUISITION_EXECUTED_FOUR_FUNCTIONS_SATISFIED_ONE_PARTIAL_THREE_UNRESOLVED_DOCTRINE_LEVEL_ANTECEDENT_ESTABLISHED_VERBATIM_BINDING_PUBLICATION_IDENTITY_AND_VARIANT_NORMALIZATION_UNRESOLVED_NO_REBINDING_NO_INDEPENDENCE'
    | 'QU_WEI_2001_PRIOR_WITNESS_ACQUISITION_EVIDENCE_NOT_EXECUTED';
  upstreamI193ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI193BoundaryAccepted: boolean;
  targetPriorWitnessId: 'QU_WEI_SIZHU_XIANGZHEN_2001' | null;
  acquisitionPathCountExecuted: 4 | 0;
  allFourFrozenAcquisitionPathsExecuted: boolean;
  evidenceRecords: readonly I194EvidenceRecord[];
  evidenceRecordCount: 8 | 0;
  satisfiedFunctionCount: 4 | 0;
  partiallySatisfiedFunctionCount: 1 | 0;
  unresolvedFunctionCount: 3 | 0;
  authorTitleAnd2001AppearanceBasisEstablished: boolean;
  authorChronologyLocator: 'https://www.zhouyiqw.com/qwjj.php' | null;
  officialChronologyStates2001Appearance: boolean;
  inspectedContemporaryPrefaceChronologyConsistentWith2001Appearance: boolean;
  formal2001PublisherEstablished: false;
  formal2001IsbnEstablished: false;
  explicit2001NonformalPublicationStatusEstablished: false;
  publicationMediumOrEntityIdentityEstablished: false;
  secondaryCatalogInternalMaterialLabelObserved: boolean;
  secondaryCatalogInternalMaterialLabelTreatedAsAuthoritativePublicationStatus: false;
  unverifiedAggregatorIsbnObserved: boolean;
  unverifiedAggregatorIsbnUsedAsAuthority: false;
  reproducibleDigitalContentWitnessEstablished: boolean;
  reproducibleWitnessBoundToSingleOriginal2001EditionOrPrinting: false;
  reproducible2001WitnessIdentityFinding: 'PARTIALLY_SATISFIED' | 'UNRESOLVED';
  observedRepresentationDescriptors: readonly string[];
  multipleRepresentationVariantsObserved: boolean;
  editionPrintingOrRepresentationNormalizationEstablished: false;
  direct2001TargetScopeContentWitnessEstablished: boolean;
  direct2001TightVsGapStemForceDifferentiationObserved: boolean;
  direct2001GapStemForceReductionObserved: boolean;
  direct2001DistanceAndObstructionForceSemanticsObserved: boolean;
  targetPassageComparisonExecuted: boolean;
  targetPassageMatchType: I194TargetPassageMatchType;
  doctrineLevelAntecedentEstablished: boolean;
  exact2003TargetPassageVerbatimIn2001Established: false;
  nearVerbatim2001To2003BindingEstablished: false;
  searchFailureToFindExactPhraseCreatesNegativeFinding: false;
  duplicateVariantNormalizationEstablished: false;
  pageCountFileSizeOrFilenameVarianceCreatesDistinctAuthority: false;
  derivativeDigitalCopiesCountAsIndependentAuthorities: false;
  sameAuthor2001To2003DoctrinalDependencyPreserved: boolean;
  externalTargetLineageUnresolvedQuestionCountPreserved: 3 | 0;
  identityAndTargetPassageEvidenceCompleteForRebinding: false;
  evidenceRebindingMethodologicallyReadyByThisGate: false;
  evidenceRebindingAuthorizedByThisGate: false;
  evidenceRebindingExecutedByThisGate: false;
  candidateSelectedByThisGate: false;
  candidateRegistrationAuthorizedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  candidateSetReevaluationAuthorizedByThisGate: false;
  candidateSetAdmissibilityEstablishedByThisGate: false;
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
  chronologyAloneEstablishesIndependence: false;
  sameAuthorEarlierWitnessAloneEstablishesIndependence: false;
  doctrinalSimilarityAloneEstablishesIndependence: false;
  searchSilenceCreatesNegativeFinding: false;
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE' | 'NOT_ASSESSED';
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_EVIDENCE_ADEQUACY_REBINDING_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_ACQUISITION_EVIDENCE';
  notes: readonly string[];
}

function exactI193Accepted(
  i193: I193QuWei2001PriorWitnessIdentityTargetPassageAcquisitionReadinessReviewReport,
): boolean {
  return (
    i193.status === 'RESOLVED_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_ACQUISITION_READINESS_REVIEW' &&
    i193.decision ===
      'I192_BOUNDARY_SUPPORTS_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_AND_TARGET_PASSAGE_ACQUISITION_FOUR_PATHS_EIGHT_EVIDENCE_FUNCTIONS_FROZEN_NO_REBINDING_NO_INDEPENDENCE' &&
    i193.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i193.policyVersion === 'v1-definition' &&
    i193.adoptionVersion === 'v1-adoption' &&
    i193.currentCandidateSetVersion === 'v1-candidate-set' &&
    i193.currentInputPackageVersion === 'v2-input-package' &&
    i193.exactI192BoundaryAccepted &&
    i193.targetPriorWitnessId === 'QU_WEI_SIZHU_XIANGZHEN_2001' &&
    i193.targetAuthor === '曲炜' &&
    i193.targetTitle === '《四柱详真》' &&
    i193.targetAppearanceYear === 2001 &&
    i193.targetAppearanceBasisMustBeEvidenceBound &&
    i193.formalPublisherOrIsbnRequiredUnconditionally === false &&
    i193.unknownPublicationStatusMayBePromotedToFormalPublication === false &&
    i193.reproducible2001WitnessLocatorRequired &&
    i193.editionPrintingOrRepresentationIdentityRequiredWhereObservable &&
    i193.direct2001TargetScopeContentWitnessRequired &&
    i193.thirdPartyQuotationAloneEstablishesTargetPassageBinding === false &&
    i193.summaryOrParaphraseAloneEstablishesTargetPassageBinding === false &&
    i193.targetPassage2001To2003ComparisonRequired &&
    i193.comparisonMustRecordMatchTypeWithoutPrejudgingOutcome &&
    i193.exactVerbatimMatchPresupposedByThisGate === false &&
    i193.doctrinalAntecedentAloneAutomaticallyEqualsExactPassageIdentity === false &&
    i193.duplicateDigitalWitnessNormalizationRequired &&
    i193.pageCountFileSizeOrFilenameVarianceAloneCreatesDistinctEditionIdentity === false &&
    i193.derivativeDigitalCopiesMayBeCountedAsIndependentAuthorities === false &&
    i193.sameAuthor2001To2003DoctrinalDependencyMustRemainBound &&
    i193.externalTargetLineageUnresolvedQuestionCountMustRemainThreeAbsentDirectResolution &&
    i193.acquisitionControlCount === 14 &&
    i193.acquisitionControlsFrozenProspectively &&
    i193.evidenceFunctionCount === 8 &&
    i193.acquisitionPathCount === 4 &&
    i193.acquisitionPathsFrozenProspectively &&
    i193.priorWitnessIdentityAndTargetPassageAcquisitionEvidenceMayProceed &&
    i193.authorizationIsIdentityAndTargetPassageEvidenceCollection &&
    i193.acquisitionExecutedByThisGate === false &&
    i193.evidenceAcquiredByThisGate === false &&
    i193.authorizationIsEvidenceRebinding === false &&
    i193.authorizationIsCandidateSelection === false &&
    i193.authorizationIsCandidateRegistration === false &&
    i193.evidenceRebindingMethodologicallyReady === false &&
    i193.evidenceRebindingAuthorizedByThisGate === false &&
    i193.evidenceRebindingExecutedByThisGate === false &&
    i193.provenanceIndependenceAdjudicatedByThisGate === false &&
    i193.independentNormativeProvenanceEstablishedCount === 0 &&
    i193.explicitDerivativeRelationshipCheckRequired &&
    i193.derivativeRetransmissionCountsAsIndependentAuthority === false &&
    i193.unresolvedLineageDefaultDisposition === 'REJECT_INDEPENDENCE_CLAIM' &&
    i193.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate === false &&
    i193.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i193.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i193.sourceClassAloneSufficient === false &&
    i193.sourceCountMayBecomeNumericWeight === false &&
    i193.provenanceTierMayBecomeNumericWeight === false &&
    i193.searchSilenceCreatesNegativeFinding === false &&
    i193.currentV2PackageAndCandidateSetRemainImmutable &&
    i193.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i193.candidateSetReevaluationAuthorizedByThisGate === false &&
    i193.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i193.liSameTargetPathSuspendedNotRetired &&
    i193.liSameTargetMayReopenOnMateriallyNewDirectLead &&
    i193.liPublicationMediumOrEntityGapStillOpen &&
    i193.liCanonicalDigitalWitnessNormalizationGapStillOpen &&
    i193.targetedDiscoveryExhaustionEstablished === false &&
    i193.corpusExhaustionEstablished === false &&
    i193.productionPolicyExecutionAuthorized === false &&
    i193.actualCompositionPerformedByThisGate === false &&
    i193.multiSourceCompositionAuthorized === false &&
    i193.authorityAcquiredByThisGate === false &&
    i193.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i193.thresholdRuleCreatedByThisGate === false &&
    i193.damageEvaluationAuthorized === false &&
    i193.classificationAuthorized === false &&
    i193.numericScoringAuthorized === false &&
    i193.hiddenStemInteractionEligibilityGapRemains &&
    i193.hiddenStemAuthorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i193.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_ACQUISITION_EVIDENCE'
  );
}

function evidenceRecords(): readonly I194EvidenceRecord[] {
  return Object.freeze([
    {
      functionId: 'AUTHOR_TITLE_YEAR_APPEARANCE_BASIS',
      finding: 'SATISFIED',
      sourceLocators: Object.freeze([
        'https://www.zhouyiqw.com/qwjj.php',
        'https://www.scribd.com/document/802151334/Z23',
      ]),
      evidenceSummary: Object.freeze([
        'The author chronology states that 曲炜 first works 四柱详真 and 六爻详真 appeared in 2001.',
        'Contemporary-preface material inside public digital witnesses is chronologically consistent with a 2001 appearance, but chronology alone does not establish publication medium or independence.',
      ]),
    },
    {
      functionId: 'PUBLICATION_MEDIUM_OR_EXPLICIT_NONFORMAL_STATUS_IDENTITY',
      finding: 'UNRESOLVED_AFTER_BOUNDED_ACQUISITION',
      sourceLocators: Object.freeze([
        'https://www.zhouyiqw.com/qwjj.php',
        'https://book.douban.com/tag/%E5%91%BD%E7%90%86?start=60&type=S',
        'https://www.scribd.com/document/802151334/Z23',
      ]),
      evidenceSummary: Object.freeze([
        'The author site records 2001 appearance and later lists the title among published works, but the inspected material does not expose a 2001 publisher, ISBN, colophon, or issuing entity.',
        'A secondary Douban catalog labels the work 内部资料 and dates it 2001-1-2, but that secondary label is not promoted to authoritative 2001 publication-status evidence.',
        'An unverified aggregator ISBN observed during discovery is not used because no authoritative bibliographic binding was located.',
      ]),
    },
    {
      functionId: 'REPRODUCIBLE_2001_WITNESS_IDENTITY',
      finding: 'PARTIALLY_SATISFIED',
      sourceLocators: Object.freeze([
        'https://de.scribd.com/document/398602563/%E6%9B%B2%E7%82%9C-%E5%9B%9B%E6%9F%B1%E8%AF%A6%E7%9C%9F',
        'https://pdfcoffee.com/-3194-pdf-free.html',
        'https://www.scribd.com/document/981013403/%E5%9B%9B%E6%9F%B1%E8%AF%A6%E7%9C%9F',
      ]),
      evidenceSummary: Object.freeze([
        'Multiple stable public digital surfaces identify 曲炜 四柱详真 and expose directly inspectable work content.',
        'The content witness is reproducible enough for doctrinal inspection, but none of the inspected surfaces securely binds its digital representation to one canonical original 2001 edition or printing.',
      ]),
    },
    {
      functionId: 'EDITION_PRINTING_OR_REPRESENTATION_IDENTITY',
      finding: 'UNRESOLVED_AFTER_BOUNDED_ACQUISITION',
      sourceLocators: Object.freeze([
        'https://de.scribd.com/document/398602563/%E6%9B%B2%E7%82%9C-%E5%9B%9B%E6%9F%B1%E8%AF%A6%E7%9C%9F',
        'https://www.scribd.com/document/536660441/%E6%9B%B2%E7%82%9C-%E5%9B%9B%E6%9F%B1%E8%AF%A6%E7%9C%9F-PDF-by-%E6%9B%B2%E7%82%9C-%E5%9B%9B%E6%9F%B1%E8%AF%A6%E7%9C%9F-PDF-Z-lib-org',
        'https://nayona.cn/1595229.html',
        'https://pdfcoffee.com/-3194-pdf-free.html',
      ]),
      evidenceSummary: Object.freeze([
        'Public surfaces expose materially different renderings, including a 94-page Scribd presentation, a 184-page Scribd presentation, a 140-double-page scan listing, and a text rendering whose internal pagination reaches 118 pages.',
        'No transformation provenance, canonical scan identity, or edition-specific comparison was located that normalizes these representations.',
        'Page-count, file-size, and filename variance are not treated as proof of distinct editions or authorities.',
      ]),
    },
    {
      functionId: 'DIRECT_2001_TARGET_SCOPE_CONTENT_WITNESS',
      finding: 'SATISFIED',
      sourceLocators: Object.freeze([
        'https://de.scribd.com/document/398602563/%E6%9B%B2%E7%82%9C-%E5%9B%9B%E6%9F%B1%E8%AF%A6%E7%9C%9F',
        'https://pdfcoffee.com/-3194-pdf-free.html',
      ]),
      evidenceSummary: Object.freeze([
        'The direct 四柱详真 text differentiates stem force by position: adjacent stems receive materially larger support than 隔柱 stems.',
        'The same witness treats combination/obstruction and actual distance as determinants of whether force can be materially expressed.',
        'This is direct target-scope doctrinal content, not merely a third-party summary or quotation.',
      ]),
    },
    {
      functionId: 'TARGET_PASSAGE_2001_TO_2003_COMPARISON',
      finding: 'SATISFIED',
      sourceLocators: Object.freeze([
        'https://de.scribd.com/document/398602563/%E6%9B%B2%E7%82%9C-%E5%9B%9B%E6%9F%B1%E8%AF%A6%E7%9C%9F',
        'https://pdfcoffee.com/-3194-pdf-free.html',
        'https://www.scribd.com/document/749054906/%E5%9B%9B%E6%9F%B1%E7%89%B9%E8%AE%AD%E7%8F%AD%E8%AE%B2%E4%B9%89-%E6%9B%B2%E7%82%9C',
      ]),
      evidenceSummary: Object.freeze([
        'The 2001 witness already encodes the same governing direction: adjacency materially increases stem interaction force while intervening pillar distance reduces it.',
        'The 2003 作用论 makes the doctrine more explicit as a route rule, distinguishing adjacent direct action, one-stem-gap weak action, and more remote action that may be negligible or non-operative in concrete routes.',
        'The comparison therefore establishes a doctrine-level antecedent, but the inspected evidence does not establish verbatim or near-verbatim identity of the exact 2003 target passage in the 2001 witness.',
      ]),
    },
    {
      functionId: 'DUPLICATE_VARIANT_NORMALIZATION_METADATA',
      finding: 'UNRESOLVED_AFTER_BOUNDED_ACQUISITION',
      sourceLocators: Object.freeze([
        'https://de.scribd.com/document/398602563/%E6%9B%B2%E7%82%9C-%E5%9B%9B%E6%9F%B1%E8%AF%A6%E7%9C%9F',
        'https://www.scribd.com/document/536660441/%E6%9B%B2%E7%82%9C-%E5%9B%9B%E6%9F%B1%E8%AF%A6%E7%9C%9F-PDF-by-%E6%9B%B2%E7%82%9C-%E5%9B%9B%E6%9F%B1%E8%AF%A6%E7%9C%9F-PDF-Z-lib-org',
        'https://nayona.cn/1595229.html',
      ]),
      evidenceSummary: Object.freeze([
        'Multiple digital representations are observable but no stable file-hash family, scan lineage, transformation history, or canonical witness has been established.',
        'The variants therefore remain unnormalized; their multiplicity cannot increase provenance count or independence.',
      ]),
    },
    {
      functionId: 'SAME_AUTHOR_DEPENDENCY_PROVENANCE_PRESERVATION',
      finding: 'SATISFIED',
      sourceLocators: Object.freeze([
        'https://www.scribd.com/document/749054906/%E5%9B%9B%E6%9F%B1%E7%89%B9%E8%AE%AD%E7%8F%AD%E8%AE%B2%E4%B9%89-%E6%9B%B2%E7%82%9C',
        'https://www.zhouyiqw.com/qwjj.php',
      ]),
      evidenceSummary: Object.freeze([
        'The 2003 lecture preface explicitly states that it uses 四柱详真 and 四柱信息取象 as its outline and adds material beyond the books.',
        'The prior 2001 same-author doctrinal dependency remains binding; earlier chronology is not converted into independent provenance.',
      ]),
    },
  ]);
}

function finalized(
  material: Omit<I194QuWei2001PriorWitnessIdentityTargetPassageAcquisitionEvidenceReport, 'evidenceRecordSetId'>,
): I194QuWei2001PriorWitnessIdentityTargetPassageAcquisitionEvidenceReport {
  return {
    evidenceRecordSetId: `i194_qu_wei_2001_acquisition_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI194QuWei2001PriorWitnessIdentityTargetPassageAcquisitionEvidence(
  i193: I193QuWei2001PriorWitnessIdentityTargetPassageAcquisitionReadinessReviewReport,
): I194QuWei2001PriorWitnessIdentityTargetPassageAcquisitionEvidenceReport {
  const accepted = exactI193Accepted(i193);
  const records = accepted ? evidenceRecords() : Object.freeze([]);

  return finalized({
    evidenceVersion: I194_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_ACQUISITION_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_ACQUISITION_EVIDENCE'
      : 'I193_ACQUISITION_READINESS_BOUNDARY_INVALID',
    decision: accepted
      ? 'QU_WEI_2001_BOUNDED_ACQUISITION_EXECUTED_FOUR_FUNCTIONS_SATISFIED_ONE_PARTIAL_THREE_UNRESOLVED_DOCTRINE_LEVEL_ANTECEDENT_ESTABLISHED_VERBATIM_BINDING_PUBLICATION_IDENTITY_AND_VARIANT_NORMALIZATION_UNRESOLVED_NO_REBINDING_NO_INDEPENDENCE'
      : 'QU_WEI_2001_PRIOR_WITNESS_ACQUISITION_EVIDENCE_NOT_EXECUTED',
    upstreamI193ReviewId: i193.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI193BoundaryAccepted: accepted,
    targetPriorWitnessId: accepted ? 'QU_WEI_SIZHU_XIANGZHEN_2001' : null,
    acquisitionPathCountExecuted: accepted ? 4 : 0,
    allFourFrozenAcquisitionPathsExecuted: accepted,
    evidenceRecords: records,
    evidenceRecordCount: accepted ? 8 : 0,
    satisfiedFunctionCount: accepted ? 4 : 0,
    partiallySatisfiedFunctionCount: accepted ? 1 : 0,
    unresolvedFunctionCount: accepted ? 3 : 0,
    authorTitleAnd2001AppearanceBasisEstablished: accepted,
    authorChronologyLocator: accepted ? 'https://www.zhouyiqw.com/qwjj.php' : null,
    officialChronologyStates2001Appearance: accepted,
    inspectedContemporaryPrefaceChronologyConsistentWith2001Appearance: accepted,
    formal2001PublisherEstablished: false,
    formal2001IsbnEstablished: false,
    explicit2001NonformalPublicationStatusEstablished: false,
    publicationMediumOrEntityIdentityEstablished: false,
    secondaryCatalogInternalMaterialLabelObserved: accepted,
    secondaryCatalogInternalMaterialLabelTreatedAsAuthoritativePublicationStatus: false,
    unverifiedAggregatorIsbnObserved: accepted,
    unverifiedAggregatorIsbnUsedAsAuthority: false,
    reproducibleDigitalContentWitnessEstablished: accepted,
    reproducibleWitnessBoundToSingleOriginal2001EditionOrPrinting: false,
    reproducible2001WitnessIdentityFinding: accepted ? 'PARTIALLY_SATISFIED' : 'UNRESOLVED',
    observedRepresentationDescriptors: accepted
      ? Object.freeze([
          'Scribd presentation metadata: 94 pages',
          'Scribd Z-lib-derived presentation metadata: 184 pages',
          'scan listing: 140 double-pages',
          'PDFCoffee text rendering: internal pagination reaches 118 pages',
        ])
      : Object.freeze([]),
    multipleRepresentationVariantsObserved: accepted,
    editionPrintingOrRepresentationNormalizationEstablished: false,
    direct2001TargetScopeContentWitnessEstablished: accepted,
    direct2001TightVsGapStemForceDifferentiationObserved: accepted,
    direct2001GapStemForceReductionObserved: accepted,
    direct2001DistanceAndObstructionForceSemanticsObserved: accepted,
    targetPassageComparisonExecuted: accepted,
    targetPassageMatchType: accepted
      ? 'DOCTRINE_LEVEL_ANTECEDENT_WITH_NO_VERBATIM_BINDING_ESTABLISHED'
      : 'UNRESOLVED',
    doctrineLevelAntecedentEstablished: accepted,
    exact2003TargetPassageVerbatimIn2001Established: false,
    nearVerbatim2001To2003BindingEstablished: false,
    searchFailureToFindExactPhraseCreatesNegativeFinding: false,
    duplicateVariantNormalizationEstablished: false,
    pageCountFileSizeOrFilenameVarianceCreatesDistinctAuthority: false,
    derivativeDigitalCopiesCountAsIndependentAuthorities: false,
    sameAuthor2001To2003DoctrinalDependencyPreserved: accepted,
    externalTargetLineageUnresolvedQuestionCountPreserved: accepted ? 3 : 0,
    identityAndTargetPassageEvidenceCompleteForRebinding: false,
    evidenceRebindingMethodologicallyReadyByThisGate: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    candidateSelectedByThisGate: false,
    candidateRegistrationAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false,
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
    chronologyAloneEstablishesIndependence: false,
    sameAuthorEarlierWitnessAloneEstablishesIndependence: false,
    doctrinalSimilarityAloneEstablishesIndependence: false,
    searchSilenceCreatesNegativeFinding: false,
    currentV2PackageAndCandidateSetRemainImmutable: accepted,
    currentV2ProvenanceDisposition: accepted ? 'BLOCKED_UNDER_CURRENT_EVIDENCE' : 'NOT_ASSESSED',
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_EVIDENCE_ADEQUACY_REBINDING_READINESS_REVIEW'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_ACQUISITION_EVIDENCE',
    notes: Object.freeze([
      'The 2001 work is directly inspectable and contains target-scope distance/position force doctrine, but publication identity and representation normalization remain unresolved.',
      'The 2001-to-2003 comparison establishes a doctrine-level antecedent only; exact or near-verbatim target-passage identity has not been established.',
      'No observed ISBN from an unverified aggregator is used as authority without an independently bound bibliographic record.',
      'Digital copy multiplicity does not create additional independent provenance.',
      'I194 records evidence only and does not execute rebinding, candidate mutation, provenance independence adjudication, or threshold policy.',
    ]),
  });
}
