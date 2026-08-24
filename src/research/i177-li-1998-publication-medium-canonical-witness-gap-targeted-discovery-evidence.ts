import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I176Li1998GapTargetedDiscoveryReadinessReviewReport } from './i176-li-1998-publication-medium-canonical-witness-gap-targeted-discovery-readiness-review.js';

export const I177_LI_1998_GAP_TARGETED_DISCOVERY_EVIDENCE_VERSION =
  'myeonghwa-li-1998-publication-medium-canonical-witness-gap-targeted-discovery-evidence-v1';

export type I177GapFinding = 'UNRESOLVED_AFTER_BOUNDED_TARGETED_DISCOVERY';

export interface I177GapEvidenceRecord {
  targetGapId:
    | 'LI_1998_PUBLICATION_MEDIUM_OR_ENTITY_IDENTITY_GAP'
    | 'LI_1998_CANONICAL_DIGITAL_WITNESS_NORMALIZATION_GAP';
  finding: I177GapFinding;
  sourceLocators: readonly string[];
  evidenceSummary: readonly string[];
  unresolvedReason: string;
}

export interface I177Li1998GapTargetedDiscoveryEvidenceReport {
  evidenceRecordSetId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_LI_1998_PUBLICATION_MEDIUM_CANONICAL_WITNESS_GAP_TARGETED_DISCOVERY_EVIDENCE'
    | 'I176_DISCOVERY_BOUNDARY_INVALID';
  decision:
    | 'BOUNDED_TWO_GAP_DISCOVERY_EXECUTED_PUBLICATION_MEDIUM_AND_CANONICAL_WITNESS_NORMALIZATION_BOTH_REMAIN_UNRESOLVED_NO_EXPLICIT_NEGATIVE_NO_REBINDING_NO_INDEPENDENCE'
    | 'LI_1998_TWO_GAP_TARGETED_DISCOVERY_EVIDENCE_NOT_EXECUTED';
  upstreamI176ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI176BoundaryAccepted: boolean;
  targetedGapCount: 2 | 0;
  resolvedGapCount: 0;
  unresolvedGapCount: 2 | 0;
  explicitNegativeFindingCount: 0;
  gapEvidenceRecords: readonly I177GapEvidenceRecord[];
  official1998AppearanceRecordObserved: boolean;
  official1998CompanyCreationRecordObserved: boolean;
  companyCreationAndBookAppearanceCoLocatedInChronology: boolean;
  official1998PublisherOrIssuingEntityBound: false;
  companyMayBeInferredAs1998PublisherFromChronologyCoLocation: false;
  formal1998PublisherOrIsbnEstablished: false;
  explicit1998NonformalPublicationStatusEstablished: false;
  later2002FormalEditionObserved: boolean;
  later2002FormalEditionMayBackfill1998: false;
  ambiguousUploaderFieldObserved: boolean;
  ambiguousUploaderFieldRoleDisambiguatedAsPublicationStatus: false;
  ambiguousUploaderFieldResolves1998PublicationMedium: false;
  retail314PageBookRepresentationObserved: boolean;
  retail314PageBookRepresentationBoundSpecificallyTo1998: false;
  digital314PageRepresentationObserved: boolean;
  digital413PageRepresentationObserved: boolean;
  multipleFileSizeRepresentationsObserved: boolean;
  observedRepresentationPageCounts: readonly number[];
  observedRepresentationSizesMb: readonly number[];
  titleAuthorAndTargetContentContinuityObservedAcrossPublicWitnesses: boolean;
  titleOrImprintPageComparisonCompletedAcrossVariants: false;
  editionSpecificAdditionDeletionReorderingComparisonCompleted: false;
  canonicalDigitalWitnessEstablished: false;
  normalizedWitnessFamilyEstablished: false;
  allObservedDigitalVariantRelationshipsExplicitlyResolved: false;
  pageCountDifferenceAloneCreatesDistinctEdition: false;
  fileSizeDifferenceAloneCreatesDistinctEdition: false;
  filenameDifferenceAloneCreatesDistinctEdition: false;
  searchSilenceCreatesNegativeFinding: false;
  targetedDiscoveryExhaustionEstablished: false;
  evidenceRebindingMethodologicallyReadyByThisGate: false;
  evidenceRebindingAuthorizedByThisGate: false;
  evidenceRebindingSelectedByThisGate: false;
  evidenceRebindingExecutedByThisGate: false;
  candidateSelectedByThisGate: false;
  remediationStrategySelectedByThisGate: false;
  remediationExecutionAuthorizedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  newCandidateSetVersionCreatedByThisGate: false;
  newInputPackageVersionCreatedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  independentNormativeProvenanceEstablishedCount: 0;
  I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  sourceCountVotingAllowed: false;
  provenanceTierWeightingAllowed: false;
  current2004WitnessPresumedOriginRetired: boolean;
  prior1998SameAuthorWitnessConfirmed: boolean;
  prior1998WitnessIndependentProvenanceEstablished: false;
  sameAuthor1998To2004DerivativeChainMustRemainBound: boolean;
  externalLineageUnresolvedQuestionCount: 3 | 0;
  externalLineageUnresolvedStatusPreserved: boolean;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_TWO_GAP_DISCOVERY_EXHAUSTION_AND_REBINDING_PATH_REASSESSMENT_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_PUBLICATION_MEDIUM_CANONICAL_WITNESS_GAP_TARGETED_DISCOVERY_EVIDENCE';
  notes: readonly string[];
}

function exactI176Accepted(i176: I176Li1998GapTargetedDiscoveryReadinessReviewReport): boolean {
  return (
    i176.status ===
      'RESOLVED_LI_1998_PUBLICATION_MEDIUM_CANONICAL_WITNESS_GAP_TARGETED_DISCOVERY_READINESS_REVIEW' &&
    i176.decision ===
      'TWO_LI_1998_IDENTITY_GAPS_READY_FOR_BOUNDED_TARGETED_DISCOVERY_1998_SPECIFIC_PUBLICATION_BINDING_AND_CANONICAL_WITNESS_NORMALIZATION_REQUIRED_NO_REBINDING_NO_INDEPENDENCE' &&
    i176.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i176.policyVersion === 'v1-definition' &&
    i176.adoptionVersion === 'v1-adoption' &&
    i176.currentCandidateSetVersion === 'v1-candidate-set' &&
    i176.currentInputPackageVersion === 'v2-input-package' &&
    i176.exactI175BoundaryAccepted &&
    i176.targetGapCount === 2 &&
    i176.targetGapIds.length === 2 &&
    i176.targetGapIds[0] === 'LI_1998_PUBLICATION_MEDIUM_OR_ENTITY_IDENTITY_GAP' &&
    i176.targetGapIds[1] === 'LI_1998_CANONICAL_DIGITAL_WITNESS_NORMALIZATION_GAP' &&
    i176.discoveryControlCount === 12 &&
    i176.discoveryControlsFrozenProspectively &&
    i176.publicationMediumSearchChannelCount === 5 &&
    i176.witnessNormalizationSearchChannelCount === 5 &&
    i176.publicationMediumResolutionRequires1998SpecificBinding &&
    i176.laterEditionMetadataMayBackfill1998 === false &&
    i176.ambiguousMetadataMayEstablishPublicationStatusWithoutFieldDisambiguation === false &&
    i176.canonicalWitnessNormalizationRequiresContentComparison &&
    i176.pageCountDifferenceAloneCreatesDistinctEdition === false &&
    i176.fileSizeDifferenceAloneCreatesDistinctEdition === false &&
    i176.filenameDifferenceAloneCreatesDistinctEdition === false &&
    i176.searchSilenceCreatesNegativeFinding === false &&
    i176.boundedTargetedDiscoveryMayProceed &&
    i176.authorizationIsDiscoveryEvidenceCollection &&
    i176.authorizationIsEvidenceRebinding === false &&
    i176.authorizationIsProvenanceIndependenceAdjudication === false &&
    i176.evidenceRebindingMethodologicallyReady === false &&
    i176.evidenceRebindingSelectedByThisGate === false &&
    i176.evidenceRebindingExecutedByThisGate === false &&
    i176.provenanceIndependenceAdjudicatedByThisGate === false &&
    i176.independentNormativeProvenanceEstablishedCount === 0 &&
    i176.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate === false &&
    i176.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i176.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i176.current2004WitnessPresumedOriginRetired &&
    i176.prior1998SameAuthorWitnessConfirmed &&
    i176.prior1998WitnessIndependentProvenanceEstablished === false &&
    i176.sameAuthor1998To2004DerivativeChainMustRemainBound &&
    i176.externalLineageUnresolvedQuestionCount === 3 &&
    i176.externalLineageUnresolvedStatusPreserved &&
    i176.currentV2PackageAndCandidateSetRemainImmutable &&
    i176.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i176.candidateSetReevaluationAuthorizedByThisGate === false &&
    i176.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i176.productionPolicyExecutionAuthorized === false &&
    i176.actualCompositionPerformedByThisGate === false &&
    i176.multiSourceCompositionAuthorized === false &&
    i176.authorityAcquiredByThisGate === false &&
    i176.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i176.thresholdRuleCreatedByThisGate === false &&
    i176.damageEvaluationAuthorized === false &&
    i176.classificationAuthorized === false &&
    i176.numericScoringAuthorized === false &&
    i176.hiddenStemInteractionEligibilityGapRemains &&
    i176.hiddenStemAuthorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i176.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_PUBLICATION_MEDIUM_CANONICAL_WITNESS_GAP_TARGETED_DISCOVERY_EVIDENCE'
  );
}

function records(): readonly I177GapEvidenceRecord[] {
  return Object.freeze([
    {
      targetGapId: 'LI_1998_PUBLICATION_MEDIUM_OR_ENTITY_IDENTITY_GAP',
      finding: 'UNRESOLVED_AFTER_BOUNDED_TARGETED_DISCOVERY',
      sourceLocators: Object.freeze([
        'https://www.sxw.cc/sjw/zj/',
        'https://www.sxw.cc/e/action/ShowInfo.php?classid=3&id=581',
        'https://www.zhouyi529.com/372.html',
        'https://r1689.com/m/view.php?aid=349',
      ]),
      evidenceSummary: Object.freeze([
        'The author chronology binds the work to 1998 appearance and separately records creation of 李顺祥信息咨询服务有限公司 in 1998, but does not state that the company published or issued the 1998 work.',
        'A current book catalog exposes a 32-kai 314-page physical-style representation, but the listing is not bound specifically to the 1998 appearance.',
        'The download-site field 上传者: 非正式出版 is a field-role artifact and does not establish the 1998 publication medium or issuing entity.',
        'No targeted source securely binds the 1998 witness to a publisher, ISBN, issuing company, or explicit reproducible nonformal-publication status.',
      ]),
      unresolvedReason:
        '1998-specific publication-medium or issuing-entity evidence remains absent; chronology adjacency and later/current catalog metadata cannot substitute for an explicit binding.',
    },
    {
      targetGapId: 'LI_1998_CANONICAL_DIGITAL_WITNESS_NORMALIZATION_GAP',
      finding: 'UNRESOLVED_AFTER_BOUNDED_TARGETED_DISCOVERY',
      sourceLocators: Object.freeze([
        'https://www.guoxueziyuan.com/3415.html',
        'https://www.linglonghui.com/?dir=%2F%E5%85%AB%E5%AD%97%E7%94%B5%E5%AD%90%E4%B9%A6%E5%90%88%E9%9B%86&tag=34&ts=34',
        'https://r1689.com/m/view.php?aid=349',
        'https://www.scribd.com/document/799078960/6865%E5%86%8C%E6%98%93%E5%AD%A6%E4%B9%A6%E7%B1%8D',
        'https://www.6yao.com/thread-65487-1-1.html',
      ]),
      evidenceSummary: Object.freeze([
        'Public catalogs expose at least 314-page and 413-page representations and multiple file-size variants under the same work title and author.',
        'A public excerpt preserves the target chapter and section content, supporting work-level content continuity but not scan-level canonical identity.',
        'No inspected source provides comparative title/imprint pages, transformation provenance, or edition-specific addition/deletion/reordering evidence sufficient to normalize every observed digital variant.',
        'Page count, file size, and filename variance therefore remain representation observations rather than evidence of distinct normative editions or authorities.',
      ]),
      unresolvedReason:
        'The public corpus is sufficient to establish multiple representations but insufficient to identify a canonical scan or fully normalize derivative relationships among all variants.',
    },
  ]);
}

function finalized(
  material: Omit<I177Li1998GapTargetedDiscoveryEvidenceReport, 'evidenceRecordSetId'>,
): I177Li1998GapTargetedDiscoveryEvidenceReport {
  return {
    evidenceRecordSetId: `i177_li_1998_gap_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI177Li1998GapTargetedDiscoveryEvidence(
  i176: I176Li1998GapTargetedDiscoveryReadinessReviewReport,
): I177Li1998GapTargetedDiscoveryEvidenceReport {
  const accepted = exactI176Accepted(i176);
  const gapEvidenceRecords = accepted ? records() : Object.freeze([] as I177GapEvidenceRecord[]);

  return finalized({
    evidenceVersion: I177_LI_1998_GAP_TARGETED_DISCOVERY_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_LI_1998_PUBLICATION_MEDIUM_CANONICAL_WITNESS_GAP_TARGETED_DISCOVERY_EVIDENCE'
      : 'I176_DISCOVERY_BOUNDARY_INVALID',
    decision: accepted
      ? 'BOUNDED_TWO_GAP_DISCOVERY_EXECUTED_PUBLICATION_MEDIUM_AND_CANONICAL_WITNESS_NORMALIZATION_BOTH_REMAIN_UNRESOLVED_NO_EXPLICIT_NEGATIVE_NO_REBINDING_NO_INDEPENDENCE'
      : 'LI_1998_TWO_GAP_TARGETED_DISCOVERY_EVIDENCE_NOT_EXECUTED',
    upstreamI176ReviewId: i176.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI176BoundaryAccepted: accepted,
    targetedGapCount: accepted ? 2 : 0,
    resolvedGapCount: 0,
    unresolvedGapCount: accepted ? 2 : 0,
    explicitNegativeFindingCount: 0,
    gapEvidenceRecords,
    official1998AppearanceRecordObserved: accepted,
    official1998CompanyCreationRecordObserved: accepted,
    companyCreationAndBookAppearanceCoLocatedInChronology: accepted,
    official1998PublisherOrIssuingEntityBound: false,
    companyMayBeInferredAs1998PublisherFromChronologyCoLocation: false,
    formal1998PublisherOrIsbnEstablished: false,
    explicit1998NonformalPublicationStatusEstablished: false,
    later2002FormalEditionObserved: accepted,
    later2002FormalEditionMayBackfill1998: false,
    ambiguousUploaderFieldObserved: accepted,
    ambiguousUploaderFieldRoleDisambiguatedAsPublicationStatus: false,
    ambiguousUploaderFieldResolves1998PublicationMedium: false,
    retail314PageBookRepresentationObserved: accepted,
    retail314PageBookRepresentationBoundSpecificallyTo1998: false,
    digital314PageRepresentationObserved: accepted,
    digital413PageRepresentationObserved: accepted,
    multipleFileSizeRepresentationsObserved: accepted,
    observedRepresentationPageCounts: accepted ? Object.freeze([314, 413]) : Object.freeze([]),
    observedRepresentationSizesMb: accepted
      ? Object.freeze([15.48, 47.37, 47.44, 49.6])
      : Object.freeze([]),
    titleAuthorAndTargetContentContinuityObservedAcrossPublicWitnesses: accepted,
    titleOrImprintPageComparisonCompletedAcrossVariants: false,
    editionSpecificAdditionDeletionReorderingComparisonCompleted: false,
    canonicalDigitalWitnessEstablished: false,
    normalizedWitnessFamilyEstablished: false,
    allObservedDigitalVariantRelationshipsExplicitlyResolved: false,
    pageCountDifferenceAloneCreatesDistinctEdition: false,
    fileSizeDifferenceAloneCreatesDistinctEdition: false,
    filenameDifferenceAloneCreatesDistinctEdition: false,
    searchSilenceCreatesNegativeFinding: false,
    targetedDiscoveryExhaustionEstablished: false,
    evidenceRebindingMethodologicallyReadyByThisGate: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingSelectedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    candidateSelectedByThisGate: false,
    remediationStrategySelectedByThisGate: false,
    remediationExecutionAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    newCandidateSetVersionCreatedByThisGate: false,
    newInputPackageVersionCreatedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    independentNormativeProvenanceEstablishedCount: 0,
    I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: accepted,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    sourceCountVotingAllowed: false,
    provenanceTierWeightingAllowed: false,
    current2004WitnessPresumedOriginRetired: accepted,
    prior1998SameAuthorWitnessConfirmed: accepted,
    prior1998WitnessIndependentProvenanceEstablished: false,
    sameAuthor1998To2004DerivativeChainMustRemainBound: accepted,
    externalLineageUnresolvedQuestionCount: accepted ? 3 : 0,
    externalLineageUnresolvedStatusPreserved: accepted,
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_TWO_GAP_DISCOVERY_EXHAUSTION_AND_REBINDING_PATH_REASSESSMENT_REVIEW'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_PUBLICATION_MEDIUM_CANONICAL_WITNESS_GAP_TARGETED_DISCOVERY_EVIDENCE',
    notes: accepted
      ? Object.freeze([
          'Both I176 identity gaps remain unresolved after the bounded targeted search; no explicit negative finding is created from search silence.',
          'The official chronology does not authorize inference that the company founded in 1998 was the publisher or issuing entity of the work merely because both events occur in the same chronology entry.',
          'Current 314-page retail/catalog and 314/413-page digital representations do not establish a canonical 1998 witness without comparative imprint/content-normalization evidence.',
          'No evidence rebinding, provenance-independence adjudication, candidate mutation, threshold creation, or production authorization occurs in I177.',
        ])
      : Object.freeze([
          'I176 boundary mismatch prevents execution of the two-gap targeted discovery evidence stage.',
        ]),
  });
}
